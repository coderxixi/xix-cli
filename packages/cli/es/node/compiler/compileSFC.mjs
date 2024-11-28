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
import hash from "hash-sum";
import { parse, resolve } from "path";
import {
  parse as parseSFC,
  compileTemplate,
  compileStyle,
  compileScript as compileScriptSFC,
  registerTS
} from "@vue/compiler-sfc";
import { replaceExt, smartAppendFileSync } from "../shared/fsUtils.mjs";
import { SRC_DIR, ES_DIR } from "../shared/constant.mjs";
import { compileScript, getScriptExtname } from "./compileScript.mjs";
import ts from "typescript";
import {
  compressCss,
  compileLess,
  compileScss,
  extractStyleDependencies,
  normalizeStyleDependency,
  STYLE_IMPORT_RE
} from "./compileStyle.mjs";
const { readFile, existsSync, readFileSync, writeFileSync } = fse;
registerTS(() => ts);
const EXPORT = "export default";
const SFC = "__sfc__";
const SFC_DECLARE = `const ${SFC} = `;
const RENDER = "__render__";
function declareEmptySFC() {
  return `${SFC_DECLARE}{}
`;
}
function replaceExportToDeclare(script) {
  return script.replace(EXPORT, SFC_DECLARE);
}
function injectExport(script) {
  script += `
${EXPORT} ${SFC}`;
  return script;
}
function injectScopeId(script, scopeId) {
  script += `
${SFC}.__scopeId = '${scopeId}'`;
  return script;
}
function injectRender(script, render) {
  script = script.trim();
  render = render.replace("export function render", `function ${RENDER}`);
  script = script.replace(SFC_DECLARE, `${render}
${SFC_DECLARE}`);
  script += `
${SFC}.render = ${RENDER}`;
  return script;
}
function compileSFC(sfc) {
  return __async(this, null, function* () {
    var _a;
    const sources = yield readFile(sfc, "utf-8");
    const id = hash(sources);
    const { descriptor } = parseSFC(sources, { filename: sfc, sourceMap: false });
    const { script, scriptSetup, template, styles } = descriptor;
    let scriptContent;
    let bindingMetadata;
    if (script || scriptSetup) {
      if (scriptSetup) {
        const { content, bindings } = compileScriptSFC(descriptor, {
          id,
          // issue https://github.com/varletjs/varlet/issues/1458
          fs: {
            fileExists: (file) => existsSync(file.replace(ES_DIR, SRC_DIR)),
            readFile: (file) => readFileSync(file.replace(ES_DIR, SRC_DIR), "utf-8")
          }
        });
        scriptContent = content;
        bindingMetadata = bindings;
      } else {
        scriptContent = script.content;
      }
      scriptContent = replaceExportToDeclare(scriptContent);
    }
    if (!scriptContent) {
      scriptContent = declareEmptySFC();
    }
    const hasScope = styles.some((style) => style.scoped);
    const scopeId = hasScope ? `data-v-${id}` : "";
    if (template) {
      const render = compileTemplate({
        id,
        source: template.content,
        filename: sfc,
        compilerOptions: {
          expressionPlugins: ((_a = descriptor.script) == null ? void 0 : _a.lang) === "ts" ? ["typescript"] : void 0,
          scopeId,
          bindingMetadata
        }
      }).code;
      scriptContent = injectRender(scriptContent, render);
    }
    if (scopeId) {
      scriptContent = injectScopeId(scriptContent, scopeId);
    }
    scriptContent = injectExport(scriptContent);
    yield compileScript(scriptContent, sfc);
    for (let index = 0; index < styles.length; index++) {
      const style = styles[index];
      const file = replaceExt(sfc, `Sfc${index || ""}.${style.lang || "css"}`);
      const { base, dir } = parse(file);
      const dependencyPath = normalizeStyleDependency(base, STYLE_IMPORT_RE);
      const cssFile = resolve(dir, `./style/index${getScriptExtname()}`);
      let { code } = compileStyle({
        source: style.content,
        filename: file,
        id: scopeId,
        scoped: style.scoped
      });
      code = extractStyleDependencies(file, code, STYLE_IMPORT_RE);
      writeFileSync(file, compressCss(code), "utf-8");
      smartAppendFileSync(cssFile, `import '${dependencyPath}.css'
`);
      if (style.lang === "less") {
        yield compileLess(file);
      }
      if (style.lang === "scss") {
        compileScss(file);
      }
    }
  });
}
export {
  compileSFC,
  declareEmptySFC,
  injectExport,
  injectRender,
  injectScopeId,
  replaceExportToDeclare
};
