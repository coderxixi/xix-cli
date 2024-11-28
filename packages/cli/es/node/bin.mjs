#!/usr/bin/env node
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
import { Command } from "commander";
var require_stdin = __commonJS({
  "<stdin>"(exports) {
    const program = new Command();
    program.command("create").description("\u521B\u5EFA\u7EC4\u4EF6\u76EE\u5F55").option("-i, --internal", "varlet internal mode").option("-n, --name <componentName>", "Component name").option("-s, --sfc", "Generate files in sfc format").option("-t, --tsx", "Generate files in tsx format").option("-l, --locale", "Generator internationalized files").action((options) => __async(exports, null, function* () {
      const { create } = yield import("./commands/create.js");
      console.log("create", create);
      return create(options);
      console.log("options", options);
    }));
    program.command("build").description("Build varlet site for production").action(() => __async(exports, null, function* () {
      const { build } = yield import("./commands/build.js");
      return build();
    }));
    program.command("gen").description("Generate cli application").option("-n, --name <applicationName>", "Application name").option("-s, --sfc", "Generate files in sfc format").option("-t, --tsx", "Generate files in tsx format").option("-l, --locale", "Generator internationalized files").action((options) => __async(exports, null, function* () {
      const { gen } = yield import("./commands/gen.js");
      return gen(options);
    }));
    program.command("compile").description("Compile varlet components library code").action(() => __async(exports, null, function* () {
      const { compile } = yield import("./commands/compile.js");
      return compile();
    }));
    program.parse();
  }
});
var stdin_default = require_stdin();
export {
  stdin_default as default
};
