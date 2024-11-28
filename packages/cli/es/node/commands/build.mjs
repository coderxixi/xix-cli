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
import { SRC_DIR } from "../shared/constant.mjs";
import { build as buildVite } from "vite";
import { getBuildConfig } from "../confing/vite.config.mjs";
import { getXixiConfig } from "../confing/xixi.config.mjs";
const { ensureDirSync } = fse;
function build() {
  return __async(this, null, function* () {
    process.env.NODE_ENV = "production";
    ensureDirSync(SRC_DIR);
    const varletConfig = yield getXixiConfig();
    const buildConfig = getBuildConfig(varletConfig);
    yield buildVite(buildConfig);
  });
}
export {
  build
};
