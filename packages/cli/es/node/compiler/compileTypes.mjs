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
import { TYPES_DIR, UI_PACKAGE_JSON } from "../shared/constant.mjs";
import { pascalCase } from "@varlet/shared";
import { resolve, relative } from "path";
import { getXixiConfig } from "../confing/xixi.config.mjs";
import { compileStyleVars } from "./compileStyleVars.mjs";
const { ensureDir, writeFileSync, readdir, writeFile, readJSONSync } = fse;
function generateReference(moduleDir) {
  writeFileSync(
    resolve(moduleDir, "index.d.ts"),
    `export * from '${relative(moduleDir, TYPES_DIR)}'
`
  );
}
function compileTypes() {
  return __async(this, null, function* () {
    yield ensureDir(TYPES_DIR);
    compileStyleVars();
    const { namespace = "", directives = "" } = yield getXixiConfig();
    const { name: libraryName } = readJSONSync(UI_PACKAGE_JSON);
    const filenames = yield readdir(TYPES_DIR);
    const includeFilenames = filenames.filter((filename) => !["index.d.ts", "global.d.ts"].includes(filename));
    const exports = [];
    const componentDeclares = [];
    const directiveDeclares = [];
    includeFilenames.forEach((filename) => {
      const folder = filename.replace(".d.ts", "");
      const name = pascalCase(folder);
      exports.push(``);
      if (filename.startsWith(namespace)) {
        return;
      }
      if (directives.includes(folder)) {
        directiveDeclares.push(`v${name}: typeof import('${libraryName}')['_${name}Component']`);
      } else {
        componentDeclares.push(`${pascalCase(namespace)}${name}: typeof import('${libraryName}')['_${name}Component']`);
      }
    });
    const vueDeclares = `declare module 'vue' {
  export interface GlobalComponents {
    ${componentDeclares.join("\n    ")}
  }

  export interface ComponentCustomProperties {
    ${directiveDeclares.join("\n    ")}
  }
}`;
    const template = `import type { App } from 'vue'

export const version: string
export const install: (app: App) => void

${exports.join("\n")}

${vueDeclares}
`;
    yield writeFile(resolve(TYPES_DIR, "index.d.ts"), template);
  });
}
export {
  compileTypes,
  generateReference
};
