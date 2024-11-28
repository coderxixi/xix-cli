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
import less from "less";
import * as sass from "sass";
import glob from "glob";
import { replaceExt, smartAppendFileSync } from "../shared/fsUtils.mjs";
import { parse, resolve } from "path";
import { getScriptExtname } from "./compileScript.mjs";
import { CWD } from "../shared/constant.mjs";
const { render: renderLess } = less;
const { readFileSync, writeFileSync, unlinkSync } = fse;
const EMPTY_SPACE_RE = /[\s]+/g;
const EMPTY_LINE_RE = /[\n\r]*/g;
const IMPORT_CSS_RE = new RegExp(`(?<!['"\`])import\\s+['"](\\.{1,2}\\/.+\\.css)['"]\\s*;?(?!\\s*['"\`])`, "g");
const IMPORT_LESS_RE = new RegExp(`(?<!['"\`])import\\s+['"](\\.{1,2}\\/.+\\.less)['"]\\s*;?(?!\\s*['"\`])`, "g");
const IMPORT_SCSS_RE = new RegExp(`(?<!['"\`])import\\s+['"](\\.{1,2}\\/.+\\.scss)['"]\\s*;?(?!\\s*['"\`])`, "g");
const STYLE_EXTNAME_RE = /(\.less)|(\.scss)|(\.css)/;
const STYLE_IMPORT_RE = /@import\s+['"](.+)['"]\s*;/g;
const compressCss = (s) => s.replace(EMPTY_LINE_RE, "").replace(EMPTY_SPACE_RE, " ");
function normalizeStyleDependency(styleImport, reg) {
  let relativePath = styleImport.replace(reg, "$1");
  relativePath = relativePath.replace(STYLE_EXTNAME_RE, "");
  if (relativePath.startsWith("./")) {
    return "." + relativePath;
  }
  return "../" + relativePath;
}
function extractStyleDependencies(file, code, styleReg) {
  var _a;
  const styleImports = (_a = code.match(styleReg)) != null ? _a : [];
  const cssFile = resolve(parse(file).dir, `./style/index${getScriptExtname()}`);
  styleImports.forEach((styleImport) => {
    const normalizedPath = normalizeStyleDependency(styleImport, styleReg);
    smartAppendFileSync(cssFile, `import '${normalizedPath}.css'
`);
  });
  return code.replace(styleReg, "");
}
function compileLess(file) {
  return __async(this, null, function* () {
    const source = readFileSync(file, "utf-8");
    const { css } = yield renderLess(source, {
      filename: file,
      paths: [resolve(CWD, "node_modules")]
    });
    writeFileSync(replaceExt(file, ".css"), compressCss(css), "utf-8");
  });
}
function compileScss(file) {
  const { css } = sass.compile(file, {
    loadPaths: [resolve(CWD, "node_modules")]
  });
  writeFileSync(replaceExt(file, ".css"), compressCss(css), "utf-8");
}
function clearLessFiles(dir) {
  glob.sync(`${dir}/**/*.less`).forEach(unlinkSync);
}
function clearScssFiles(dir) {
  glob.sync(`${dir}/**/*.scss`).forEach(unlinkSync);
}
export {
  EMPTY_LINE_RE,
  EMPTY_SPACE_RE,
  IMPORT_CSS_RE,
  IMPORT_LESS_RE,
  IMPORT_SCSS_RE,
  STYLE_EXTNAME_RE,
  STYLE_IMPORT_RE,
  clearLessFiles,
  clearScssFiles,
  compileLess,
  compileScss,
  compressCss,
  extractStyleDependencies,
  normalizeStyleDependency
};
