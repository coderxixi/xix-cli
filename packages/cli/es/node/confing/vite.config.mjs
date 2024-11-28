var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import {
  SRC_DIR,
  ES_DIR,
  SITE_CONFIG,
  SITE_DIR,
  SITE_MOBILE_ROUTES,
  SITE_OUTPUT_PATH,
  SITE_PC_ROUTES,
  SITE_PUBLIC_PATH,
  VITE_RESOLVE_EXTENSIONS,
  EXTENSION_ENTRY
} from "../shared/constant.mjs";
import { markdown, html, inlineCss, copy } from "@varlet/vite-plugins";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
function getHtmlInject(inject) {
  const getContent = (injectKey, position) => {
    var _a, _b;
    return (_b = (_a = inject[injectKey]) == null ? void 0 : _a.filter((point) => point.position === position).map((point) => point.content)) != null ? _b : [];
  };
  return {
    head: {
      start: getContent("head", "start"),
      end: getContent("head", "end"),
      scriptStart: getContent("head", "script-start")
    },
    body: {
      start: getContent("body", "start"),
      end: getContent("body", "end"),
      scriptStart: getContent("body", "script-start")
    }
  };
}
function getDevConfig(varletConfig) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const { alias = {}, host } = varletConfig;
  const resolveAlias = Object.entries(alias).reduce((resolveAlias2, [key, value]) => {
    const isRelative = value.startsWith(".");
    resolveAlias2[key] = isRelative ? resolve(SRC_DIR, value) : value;
    return resolveAlias2;
  }, {});
  return {
    root: SITE_DIR,
    resolve: {
      extensions: VITE_RESOLVE_EXTENSIONS,
      alias: __spreadProps(__spreadValues({}, resolveAlias), {
        "@config": SITE_CONFIG,
        "@pc-routes": SITE_PC_ROUTES,
        "@mobile-routes": SITE_MOBILE_ROUTES
      })
    },
    server: {
      port: varletConfig == null ? void 0 : varletConfig.port,
      host: host === "localhost" ? "0.0.0.0" : host,
      proxy: (varletConfig == null ? void 0 : varletConfig.proxy) || {}
    },
    publicDir: SITE_PUBLIC_PATH,
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/]
      }),
      jsx(),
      markdown({ style: (_a = varletConfig == null ? void 0 : varletConfig.highlight) == null ? void 0 : _a.style }),
      copy({ paths: (varletConfig == null ? void 0 : varletConfig.copy) || [] }),
      html({
        data: {
          logo: varletConfig == null ? void 0 : varletConfig.logo,
          baidu: (_b = varletConfig == null ? void 0 : varletConfig.analysis) == null ? void 0 : _b.baidu,
          pcTitle: (_d = (_c = varletConfig == null ? void 0 : varletConfig.seo) == null ? void 0 : _c.title) != null ? _d : "",
          pcDescription: (_f = (_e = varletConfig == null ? void 0 : varletConfig.seo) == null ? void 0 : _e.description) != null ? _f : "",
          pcKeywords: (_h = (_g = varletConfig == null ? void 0 : varletConfig.seo) == null ? void 0 : _g.keywords) != null ? _h : "",
          pcHtmlInject: getHtmlInject(((_i = varletConfig == null ? void 0 : varletConfig.pc) == null ? void 0 : _i.htmlInject) || {}),
          mobileTitle: (_k = (_j = varletConfig == null ? void 0 : varletConfig.seo) == null ? void 0 : _j.title) != null ? _k : "",
          mobileDescription: (_m = (_l = varletConfig == null ? void 0 : varletConfig.seo) == null ? void 0 : _l.description) != null ? _m : "",
          mobileKeywords: (_o = (_n = varletConfig == null ? void 0 : varletConfig.seo) == null ? void 0 : _n.keywords) != null ? _o : "",
          mobileHtmlInject: getHtmlInject(((_p = varletConfig == null ? void 0 : varletConfig.mobile) == null ? void 0 : _p.htmlInject) || {})
        }
      })
    ]
  };
}
function getBuildConfig(varletConfig) {
  const devConfig = getDevConfig(varletConfig);
  return __spreadProps(__spreadValues({}, devConfig), {
    base: "./",
    build: {
      outDir: SITE_OUTPUT_PATH,
      reportCompressedSize: false,
      emptyOutDir: true,
      cssTarget: "chrome61",
      rollupOptions: {
        external: ["lodash-es", "@varlet/touch-emulator", "@varlet/cli/client", "@varlet/touch-emulator", "less"]
        // input: {
        //   main: resolve(SITE_DIR, 'index.html'),
        //   mobile: resolve(SITE_DIR, 'mobile.html'),
        // },
      }
    }
  });
}
function getBundleConfig(varletConfig, buildOptions) {
  const plugins = [];
  const name = varletConfig == null ? void 0 : varletConfig.name;
  const { external = [], globals = {} } = (varletConfig == null ? void 0 : varletConfig.bundle) || {};
  const { fileName, output, format, emptyOutDir, removeEnv } = buildOptions;
  console.log("external", external);
  if (format === "umd") {
    plugins.push(
      inlineCss({
        jsFile: resolve(output, fileName),
        cssFile: resolve(output, "style.css")
      })
    );
  }
  return {
    logLevel: "silent",
    define: removeEnv ? {
      "process.env.NODE_ENV": JSON.stringify("production")
    } : void 0,
    plugins,
    build: {
      minify: format === "cjs" ? false : "esbuild",
      emptyOutDir,
      copyPublicDir: false,
      lib: {
        name,
        formats: [format],
        fileName: () => fileName,
        entry: resolve(ES_DIR, "index.bundle.mjs")
      },
      rollupOptions: {
        external: ["vue", ...external],
        output: {
          dir: output,
          exports: "named",
          globals: __spreadValues({
            vue: "Vue"
          }, globals)
        }
      }
    }
  };
}
function getExtensionConfig(mode) {
  return {
    build: {
      sourcemap: mode === "dev" ? "inline" : false,
      watch: mode === "dev" ? {} : null,
      lib: {
        entry: EXTENSION_ENTRY,
        fileName: "extension",
        formats: ["cjs"]
      },
      rollupOptions: {
        external: ["vscode"]
      }
    }
  };
}
export {
  getBuildConfig,
  getBundleConfig,
  getDevConfig,
  getExtensionConfig,
  getHtmlInject
};
