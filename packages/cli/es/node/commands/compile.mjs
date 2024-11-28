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
import logger from "../shared/logger.mjs";
import fse from "fs-extra";
import { createSpinner } from "nanospinner";
import { ES_DIR, HL_DIR, LIB_DIR, UMD_DIR } from "../shared/constant.mjs";
import { compileBundle, compileModule } from "../compiler/compileModule.mjs";
import { compileTemplateHighlight } from "../compiler/compileTemplateHighlight.mjs";
import { compileTypes } from "../compiler/compileTypes.mjs";
const { remove } = fse;
function removeDir() {
  return Promise.all([remove(ES_DIR), remove(LIB_DIR), remove(HL_DIR), remove(UMD_DIR)]);
}
function runTask(taskName, task) {
  return __async(this, null, function* () {
    const s = createSpinner().start({ text: `Compiling ${taskName}` });
    try {
      const start = performance.now();
      yield task();
      s.success({ text: `Compilation ${taskName} completed! (${Math.ceil(performance.now() - start)}ms)` });
    } catch (e) {
      s.error({ text: `Compilation ${taskName} failed!` });
      logger.error(e.toString());
    }
  });
}
function compile() {
  return __async(this, null, function* () {
    process.env.NODE_ENV = "compile";
    yield Promise.all([runTask("types", compileTypes), runTask("template highlight", compileTemplateHighlight)]);
    process.env.BABEL_MODULE = "module";
    yield runTask("module", compileModule);
    process.env.BABEL_MODULE = "";
    yield runTask("bundle", compileBundle);
  });
}
export {
  compile,
  removeDir,
  runTask
};
