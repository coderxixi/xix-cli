var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import fse from "fs-extra";
import { build } from "vite";
import { resolve } from "path";
import {
  EXAMPLE_DIR_NAME,
  TESTS_DIR_NAME,
  DOCS_DIR_NAME,
  SRC_DIR,
  ES_DIR,
  STYLE_DIR_NAME,
  LIB_DIR,
  UMD_DIR
} from "../shared/constant.mjs";
import { getPublicDirs, isDir, isDTS, isLess, isScript, isScss, isSFC } from "../shared/fsUtils.mjs";
import { compileSFC } from "./compileSFC.mjs";
import { compileESEntry, compileScriptFile, getScriptExtname } from "./compileScript.mjs";
import { clearLessFiles, clearScssFiles, compileLess, compileScss } from "./compileStyle.mjs";
import { getBundleConfig } from "../confing/vite.config.mjs";
import { getXixiConfig } from "../confing/xixi.config.mjs";
import { generateReference } from "./compileTypes.mjs";
import { kebabCase } from "@varlet/shared";
const { copy, ensureFileSync, readdir, removeSync } = fse;
function compileBundle() {
  return __async(this, null, function* () {
    const varletConfig = yield getXixiConfig();
    const name = kebabCase((varletConfig == null ? void 0 : varletConfig.name) || "");
    const buildOptions = [
      {
        format: "es",
        fileName: `${name}.esm.js`,
        output: ES_DIR,
        emptyOutDir: false,
        removeEnv: true
      },
      {
        format: "cjs",
        fileName: `${name}.cjs.js`,
        output: LIB_DIR,
        emptyOutDir: false,
        removeEnv: false
      },
      {
        format: "umd",
        fileName: `${name}.js`,
        output: UMD_DIR,
        emptyOutDir: true,
        removeEnv: true
      }
    ];
    const tasks = buildOptions.map((options) => build(getBundleConfig(varletConfig, options)));
    yield Promise.all(tasks);
  });
}
function compileDir(dir) {
  return __async(this, null, function* () {
    const dirs = yield readdir(dir);
    yield Promise.all(
      dirs.map((filename) => {
        const file = resolve(dir, filename);
        [TESTS_DIR_NAME, EXAMPLE_DIR_NAME, DOCS_DIR_NAME].includes(filename) && removeSync(file);
        if (isDTS(file) || filename === STYLE_DIR_NAME) {
          return Promise.resolve();
        }
        return compileFile(file);
      })
    );
  });
}
function compileFile(file) {
  return __async(this, null, function* () {
    isSFC(file) && (yield compileSFC(file));
    isScript(file) && (yield compileScriptFile(file));
    isLess(file) && (yield compileLess(file));
    isScss(file) && compileScss(file);
    isDir(file) && (yield compileDir(file));
  });
}
function compileModule() {
  return __async(this, null, function* () {
    const dest = ES_DIR;
    yield copy(SRC_DIR, dest);
    const moduleDir = yield readdir(dest);
    yield Promise.all(
      moduleDir.map((filename) => {
        const file = resolve(dest, filename);
        isDir(file) && ensureFileSync(resolve(file, `./style/index${getScriptExtname()}`));
        return isDir(file) ? compileDir(file) : null;
      })
    );
    const publicDirs = yield getPublicDirs();
    yield compileESEntry(dest, publicDirs);
    clearLessFiles(dest);
    clearScssFiles(dest);
    generateReference(dest);
  });
}
export {
  compileBundle,
  compileDir,
  compileFile,
  compileModule
};
