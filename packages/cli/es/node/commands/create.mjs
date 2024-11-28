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
import ejs from "ejs";
import fse from "fs-extra";
import logger from "../shared/logger.mjs";
import { pascalCase, camelize, kebabCase } from "@varlet/shared";
import { input, confirm, select } from "@inquirer/prompts";
import { resolve } from "path";
import { glob } from "../shared/fsUtils.mjs";
import { getXixiConfig } from "../confing/xixi.config.mjs";
import { SRC_DIR, dirname } from "../shared/constant.mjs";
const { removeSync, readFileSync, copySync, pathExistsSync, writeFileSync, renameSync } = fse;
function renderTemplates(componentFolder, componentFolderName, renderData) {
  return __async(this, null, function* () {
    const templates = yield glob(`${componentFolder}/**/*.ejs`);
    templates.forEach((template) => {
      const templateCode = readFileSync(template, { encoding: "utf-8" });
      const code = ejs.render(templateCode, renderData);
      const file = template.replace("[componentName]", camelize(componentFolderName)).replace("[ComponentName]", pascalCase(componentFolderName)).replace(".ejs", "");
      writeFileSync(file, code);
      removeSync(template);
    });
  });
}
function create(options) {
  return __async(this, null, function* () {
    logger.title("\n\u{1F4E6}\u{1F4E6} \u521B\u5EFA\u7EC4\u4EF6\u76EE\u5F55\u7684\u540D\u79F0 ! \n");
    const { namespace } = yield getXixiConfig();
    const renderData = {
      namespace,
      bigCamelizeNamespace: pascalCase(namespace),
      kebabCaseName: "component-name",
      bigCamelizeName: "ComponentName",
      camelizeName: "componentName",
      style: "vue"
    };
    const name = options.name ? options.name : yield input({
      message: "Name of the component created: ",
      default: renderData.kebabCaseName
    });
    renderData.kebabCaseName = kebabCase(name);
    renderData.camelizeName = camelize(name);
    renderData.bigCamelizeName = pascalCase(name);
    const componentFolder = resolve(SRC_DIR, renderData.kebabCaseName);
    const componentFolderName = renderData.kebabCaseName;
    if (pathExistsSync(componentFolder)) {
      logger.warning(`${componentFolderName} already exist and cannot be recreated...`);
      return;
    }
    const locale = options.locale ? options.locale : yield confirm({
      message: "Whether to use i18n?",
      default: false
    });
    renderData.locale = locale;
    if (options.sfc || options.tsx) {
      renderData.style = options.sfc ? "vue" : "tsx";
    } else {
      const style = yield select({
        message: "\u4F60\u60F3\u8981\u521B\u5EFA\u4EC0\u4E48\u98CE\u683C\u7684\u7EC4\u4EF6\u6A21\u7248 ?",
        choices: [
          { name: "sfc", value: "vue" },
          { name: "tsx", value: "tsx" }
        ],
        default: "vue"
      });
      renderData.style = style;
    }
    copySync(resolve(dirname, "../../template/create"), componentFolder);
    yield renderTemplates(componentFolder, componentFolderName, renderData);
    if (options.internal) {
      removeSync(resolve(componentFolder, "./example/locale/index.ts"));
      renameSync(
        resolve(componentFolder, "./example/locale/_index.ts"),
        resolve(componentFolder, "./example/locale/index.ts")
      );
    } else {
      removeSync(resolve(componentFolder, "./example/locale/_index.ts"));
    }
    if (!renderData.locale) {
      removeSync(resolve(componentFolder, "/example/locale"));
    }
    if (renderData.style !== "vue") {
      removeSync(resolve(componentFolder, `${renderData.bigCamelizeName}.vue`));
    }
    if (renderData.style !== "tsx") {
      removeSync(resolve(componentFolder, `${renderData.bigCamelizeName}.tsx`));
    }
    logger.success(`\u521B\u5EFA ${componentFolderName} \u7EC4\u4EF6\u6210\u529F!`);
  });
}
export {
  create
};
