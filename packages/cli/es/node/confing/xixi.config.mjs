var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
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
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import fse from "fs-extra";
import { VARLET_CONFIG, SITE_CONFIG } from "../shared/constant.mjs";
import { outputFileSyncOnChange } from "../shared/fsUtils.mjs";
import { isArray, mergeWith } from "@varlet/shared";
import { pathToFileURL } from "url";
const { pathExistsSync, statSync } = fse;
function defineConfig(config) {
  return config;
}
function mergeStrategy(_, srcValue, key) {
  const keys = ["features", "members", "versions", "themes", "_cf"];
  if (keys.includes(key) && isArray(srcValue)) {
    return srcValue;
  }
}
function getXixiConfig(emit = false) {
  return __async(this, null, function* () {
    const defaultConfig = (yield import("./xixi.default.config.js")).default;
    const config = pathExistsSync(VARLET_CONFIG) ? (yield import(`${pathToFileURL(VARLET_CONFIG).href}?_t=${statSync(VARLET_CONFIG).mtimeMs}`)).default : {};
    const mergedConfig = mergeWith(defaultConfig, config, mergeStrategy);
    if (emit) {
      const source = JSON.stringify(mergedConfig, null, 2);
      outputFileSyncOnChange(SITE_CONFIG, source);
    }
    return mergedConfig;
  });
}
export {
  defineConfig,
  getXixiConfig,
  mergeStrategy
};
