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
import logger from "../shared/logger.mjs";
import fse from "fs-extra";
import { input, confirm, select } from "@inquirer/prompts";
import { resolve } from "path";
import { CLI_PACKAGE_JSON, CWD, GENERATORS_DIR } from "../shared/constant.mjs";
const { copy, pathExistsSync, readFileSync, writeFileSync, rename } = fse;
function syncVersion(name) {
  const file = resolve(CWD, name, "package.json");
  const pkg = JSON.parse(readFileSync(file, "utf-8"));
  const cliPkg = JSON.parse(readFileSync(CLI_PACKAGE_JSON, "utf-8"));
  Object.keys(pkg.devDependencies).forEach((key) => {
    if (key.startsWith("@varlet")) {
      pkg.devDependencies[key] = `^${cliPkg.version}`;
    }
  });
  pkg.files = ["es", "lib", "umd", "highlight", "types"];
  writeFileSync(file, JSON.stringify(pkg, null, 2));
}
function gen(options) {
  return __async(this, null, function* () {
    logger.title("\n\u{1F4E6}\u{1F4E6} Generate cli application ! \n");
    const name = options.name ? options.name : yield input({
      message: "Name of the generate application: ",
      default: "varlet-cli-app"
    });
    const dest = resolve(CWD, name);
    if (pathExistsSync(dest)) {
      logger.error(`${name} already exists and cannot be recreated...`);
      return;
    }
    let codeStyle;
    if (options.sfc || options.tsx) {
      codeStyle = options.sfc ? "sfc" : "tsx";
    } else {
      const style = yield select({
        message: "Please select your component library programming format",
        choices: [
          { name: "sfc", value: "sfc" },
          { name: "tsx", value: "tsx" }
        ]
      });
      codeStyle = style;
    }
    const i18n = options.i18n ? options.i18n : yield confirm({
      message: "Whether to use i18n?",
      default: false
    });
    const dirName = i18n ? "i18n" : "default";
    const base = resolve(GENERATORS_DIR, "base");
    const configBase = resolve(GENERATORS_DIR, "config", dirName, "base");
    const code = resolve(GENERATORS_DIR, "config", dirName, codeStyle);
    console.log("code", GENERATORS_DIR);
    yield copy(base, dest);
    yield copy(configBase, dest);
    yield copy(code, dest);
    yield rename(resolve(dest, "_gitignore"), resolve(dest, ".gitignore"));
    syncVersion(name);
    logger.success("\u2728 Application generated successfully!");
    logger.info(`  cd ${name}
  git init (Generating .git folder to init git hooks)
  pnpm install
  pnpm dev`);
    logger.success(`=======================
  Good luck have fun
=======================      `);
  });
}
export {
  gen
};
