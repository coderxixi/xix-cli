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
import { SRC_DIR, TYPES_DIR } from "../shared/constant.mjs";
import { resolve } from "path";
import { isDir, isMD } from "../shared/fsUtils.mjs";
import { getXixiConfig } from "../confing/xixi.config.mjs";
const { ensureDirSync, readdirSync, readFileSync, writeFileSync } = fse;
function compileMD(path, keys) {
  var _a;
  const content = readFileSync(path, "utf-8");
  const result = (_a = content.match(/`--[\w-]+`/g)) != null ? _a : [];
  result.forEach((key) => {
    keys.add(key.replace(/`/g, ""));
  });
}
function compileDir(path, keys, defaultLanguage) {
  const dir = readdirSync(path);
  dir.forEach((filename) => {
    const filePath = resolve(path, filename);
    isDir(filePath) && compileDir(filePath, keys, defaultLanguage);
    if (isMD(filePath) && filename.includes(defaultLanguage)) {
      compileMD(filePath, keys);
    }
  });
}
function compileStyleVars() {
  return __async(this, null, function* () {
    ensureDirSync(TYPES_DIR);
    const { defaultLanguage } = yield getXixiConfig();
    const keys = /* @__PURE__ */ new Set();
    compileDir(SRC_DIR, keys, defaultLanguage);
    const assistanceType = `type RemoveTwoDashes<T extends string> = T extends \`--\${infer Rest}\` ? Rest : T

type CamelCase<S extends string> =
  S extends \`\${infer P1}-\${infer P2}\`
    ? \`\${P1}\${CamelCase<Capitalize<P2>>}\`
    : S

type FormatStyleVars<T> = {
  [K in keyof T as  CamelCase<RemoveTwoDashes<K & string>>]?: T[K];
} & T`;
    let baseStyleVars = [...keys].reduce((template, key) => {
      template += `  '${key}'?: string
`;
      return template;
    }, "\n\ninterface BaseStyleVars {\n");
    baseStyleVars += "  [key: PropertyKey]: string\n}\n";
    writeFileSync(
      resolve(TYPES_DIR, "styleVars.d.ts"),
      `${assistanceType}${baseStyleVars}
export interface StyleVars extends FormatStyleVars<BaseStyleVars> {}`
    );
  });
}
export {
  compileDir,
  compileMD,
  compileStyleVars
};
