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
import globSync from "glob";
import fse from "fs-extra";
import { extname, resolve } from "path";
import { CLI_PACKAGE_JSON, SCRIPTS_EXTENSIONS, SRC_DIR, PUBLIC_DIR_INDEXES, UI_PACKAGE_JSON } from "./constant.mjs";
import { fileURLToPath } from "url";
const {
  readJSONSync,
  ensureFileSync,
  readFileSync,
  outputFileSync,
  pathExistsSync,
  readdir,
  lstatSync,
  appendFileSync
} = fse;
function getCliVersion() {
  return readJSONSync(CLI_PACKAGE_JSON).version;
}
function getDirname(url) {
  return fileURLToPath(new URL(".", url));
}
function outputFileSyncOnChange(path, code) {
  ensureFileSync(path);
  const content = readFileSync(path, "utf-8");
  if (content !== code) {
    outputFileSync(path, code);
  }
}
function glob(pattern) {
  return new Promise((resolve2, reject) => {
    globSync(pattern, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve2(files);
      }
    });
  });
}
const isMD = (file) => pathExistsSync(file) && extname(file) === ".md";
const isDir = (file) => pathExistsSync(file) && lstatSync(file).isDirectory();
const isSFC = (file) => pathExistsSync(file) && extname(file) === ".vue";
const isDTS = (file) => pathExistsSync(file) && file.endsWith(".d.ts");
const isJsx = (file) => pathExistsSync(file) && file.endsWith(".jsx");
const isTsx = (file) => pathExistsSync(file) && file.endsWith(".tsx");
const isScript = (file) => pathExistsSync(file) && SCRIPTS_EXTENSIONS.includes(extname(file));
const isLess = (file) => pathExistsSync(file) && extname(file) === ".less";
const isScss = (file) => pathExistsSync(file) && extname(file) === ".scss";
const isPublicDir = (dir) => PUBLIC_DIR_INDEXES.some((index) => pathExistsSync(resolve(dir, index)));
function getPublicDirs() {
  return __async(this, null, function* () {
    const srcDir = yield readdir(SRC_DIR);
    return srcDir.filter((filename) => isPublicDir(resolve(SRC_DIR, filename)));
  });
}
function getVersion() {
  return readJSONSync(UI_PACKAGE_JSON).version;
}
const replaceExt = (file, ext) => file.replace(extname(file), ext);
function smartAppendFileSync(file, code) {
  if (pathExistsSync(file)) {
    const content = readFileSync(file, "utf-8");
    if (!content.includes(code)) {
      appendFileSync(file, code);
    }
  }
}
export {
  getCliVersion,
  getDirname,
  getPublicDirs,
  getVersion,
  glob,
  isDTS,
  isDir,
  isJsx,
  isLess,
  isMD,
  isPublicDir,
  isSFC,
  isScript,
  isScss,
  isTsx,
  outputFileSyncOnChange,
  replaceExt,
  smartAppendFileSync
};
