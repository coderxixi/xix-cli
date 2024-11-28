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
import { ES_DIR } from "../shared/constant.mjs";
import { transformAsync } from "@babel/core";
import { pascalCase } from "@varlet/shared";
import { getVersion, isDir, isJsx, isTsx, replaceExt } from "../shared/fsUtils.mjs";
import { extractStyleDependencies, IMPORT_CSS_RE, IMPORT_LESS_RE, IMPORT_SCSS_RE } from "./compileStyle.mjs";
import { resolve, relative, extname, dirname } from "path";
import { getXixiConfig } from "../confing/xixi.config.mjs";
import jsx from "@vue/babel-plugin-jsx";
import fse from "fs-extra";
import esbuild from "esbuild";
const { writeFileSync, readdirSync, readFileSync, removeSync, writeFile, pathExistsSync } = fse;
const IMPORT_FROM_DEPENDENCE_RE = /import\s+?[\w\s{},$*]+\s+from\s+?(".*?"|'.*?')/g;
const EXPORT_FROM_DEPENDENCE_RE = /export\s+?[\w\s{},$*]+\s+from\s+?(".*?"|'.*?')/g;
const IMPORT_DEPENDENCE_RE = /import\s+(".*?"|'.*?')/g;
const scriptExtNames = [".vue", ".ts", ".tsx", ".mjs", ".js", ".jsx"];
const styleExtNames = [".less", ".scss", ".css"];
const scriptIndexes = ["index.mjs", "index.vue", "index.ts", "index.tsx", "index.js", "index.jsx"];
const styleIndexes = ["index.less", "index.scss", "index.css"];
const tryMatchExtname = (file, extname2) => {
  for (const ext of extname2) {
    const matched = `${file}${ext}`;
    if (pathExistsSync(matched)) {
      return ext;
    }
  }
};
const resolveAlias = (dependence, file, alias = {}) => {
  let matchedAliasKey = Object.keys(alias).find((key) => dependence === key);
  if (!matchedAliasKey) {
    matchedAliasKey = Object.keys(alias).find((key) => dependence.startsWith(`${key}/`));
  }
  if (!matchedAliasKey) {
    return dependence;
  }
  const matchedAliasValue = alias[matchedAliasKey];
  const isRelative = matchedAliasValue.startsWith(".");
  const replacedValue = isRelative ? relative(dirname(file), resolve(ES_DIR, matchedAliasValue)) : matchedAliasValue;
  return dependence.replace(matchedAliasKey, replacedValue);
};
const resolveDependence = (file, script, alias = {}) => {
  const replacer = (source, dependence) => {
    dependence = dependence.slice(1, dependence.length - 1);
    const done = (targetDependence) => source.replace(dependence, targetDependence);
    const resolvedDependence = resolveAlias(dependence, file, alias);
    const isNodeModule = !resolvedDependence.startsWith(".");
    if (isNodeModule) {
      return done(resolvedDependence);
    }
    const ext = extname(resolvedDependence);
    const scriptExtname = getScriptExtname();
    if (ext) {
      if (scriptExtNames.includes(ext)) {
        return done(dependence.replace(ext, scriptExtname));
      }
      if (styleExtNames.includes(ext)) {
        return source;
      }
    }
    const targetDependenceFile = resolve(dirname(file), resolvedDependence);
    if (!ext) {
      const matchedScript = tryMatchExtname(targetDependenceFile, scriptExtNames);
      if (matchedScript) {
        return done(`${resolvedDependence}${scriptExtname}`);
      }
      const matchedStyle = tryMatchExtname(targetDependenceFile, styleExtNames);
      if (matchedStyle) {
        return done(`${resolvedDependence}${matchedStyle}`);
      }
    }
    if (!ext && isDir(targetDependenceFile)) {
      const files = readdirSync(targetDependenceFile);
      const hasScriptIndex = files.some((file2) => scriptIndexes.some((name) => file2.endsWith(name)));
      if (hasScriptIndex) {
        return done(`${resolvedDependence}/index${scriptExtname}`);
      }
      const hasStyleIndex = files.some((file2) => styleIndexes.some((name) => file2.endsWith(name)));
      if (hasStyleIndex) {
        return done(`${resolvedDependence}/index.css`);
      }
    }
    return "";
  };
  return script.replace(IMPORT_FROM_DEPENDENCE_RE, replacer).replace(EXPORT_FROM_DEPENDENCE_RE, replacer).replace(IMPORT_DEPENDENCE_RE, replacer);
};
function compileScriptByBabel(script, file) {
  return __async(this, null, function* () {
    const { code } = yield transformAsync(script, {
      filename: file,
      babelrc: false,
      presets: ["@babel/preset-typescript"],
      plugins: [
        [
          jsx,
          {
            enableObjectSlots: false
          }
        ]
      ]
    });
    return code;
  });
}
function compileScriptByEsbuild(script) {
  return __async(this, null, function* () {
    var _a;
    const varletConfig = yield getXixiConfig();
    const { code } = yield esbuild.transform(script, {
      loader: "ts",
      target: (_a = varletConfig == null ? void 0 : varletConfig.esbuild) == null ? void 0 : _a.target,
      format: "esm"
    });
    return code;
  });
}
function compileScript(script, file) {
  return __async(this, null, function* () {
    let code = isJsx(file) || isTsx(file) ? yield compileScriptByBabel(script, file) : script;
    code = yield compileScriptByEsbuild(code);
    const { alias } = yield getXixiConfig();
    if (code) {
      code = resolveDependence(file, code, alias);
      code = extractStyleDependencies(file, code, IMPORT_CSS_RE);
      code = extractStyleDependencies(file, code, IMPORT_LESS_RE);
      code = extractStyleDependencies(file, code, IMPORT_SCSS_RE);
    }
    removeSync(file);
    writeFileSync(replaceExt(file, getScriptExtname()), code, "utf8");
  });
}
function compileScriptFile(file) {
  return __async(this, null, function* () {
    const sources = readFileSync(file, "utf-8");
    yield compileScript(sources, file);
  });
}
function getScriptExtname() {
  return ".mjs";
}
function generateEsEntryTemplate(options) {
  const { publicDirs, scriptExtname = getScriptExtname(), root = "./" } = options;
  const imports = [];
  const plugins = [];
  const exports = [];
  const cssImports = [];
  const publicComponents = [];
  publicDirs.forEach((dirname2) => {
    const publicComponent = pascalCase(dirname2);
    const module = `'${root}${dirname2}/index${scriptExtname}'`;
    publicComponents.push(publicComponent);
    imports.push(`import ${publicComponent} from ${module}`);
    exports.push(`export * from ${module}`);
    plugins.push(`${publicComponent}.install && app.use(${publicComponent})`);
    cssImports.push(`import '${root}${dirname2}/style/index${scriptExtname}'`);
  });
  const install = `
function install(app) {
  ${plugins.join("\n  ")}
}
`;
  const version = `const version = '${getVersion()}'`;
  const indexTemplate = `${imports.join("\n")}

${exports.join("\n")}

${version}
${install}
export {
  version,
  install,
  ${publicComponents.join(",\n  ")}
}

export default {
  version,
  install,
  ${publicComponents.join(",\n  ")}
}
`;
  const styleTemplate = `${cssImports.join("\n")}
`;
  const bundleTemplate = `${imports.join("\n")}

${exports.join("\n")}

${cssImports.join("\n")}

${version}
${install}
export {
  version,
  install,
  ${publicComponents.join(",\n  ")}
}

export default {
  version,
  install,
  ${publicComponents.join(",\n  ")}
}
`;
  return {
    indexTemplate,
    styleTemplate,
    bundleTemplate
  };
}
function compileESEntry(dir, publicDirs) {
  return __async(this, null, function* () {
    const { indexTemplate, bundleTemplate, styleTemplate } = generateEsEntryTemplate({ publicDirs });
    yield Promise.all([
      writeFile(resolve(dir, "index.mjs"), indexTemplate, "utf-8"),
      writeFile(resolve(dir, "index.bundle.mjs"), bundleTemplate, "utf-8"),
      writeFile(resolve(dir, "style.mjs"), styleTemplate, "utf-8")
    ]);
  });
}
export {
  EXPORT_FROM_DEPENDENCE_RE,
  IMPORT_DEPENDENCE_RE,
  IMPORT_FROM_DEPENDENCE_RE,
  compileESEntry,
  compileScript,
  compileScriptByBabel,
  compileScriptByEsbuild,
  compileScriptFile,
  generateEsEntryTemplate,
  getScriptExtname,
  resolveAlias,
  resolveDependence,
  scriptExtNames,
  scriptIndexes,
  styleExtNames,
  styleIndexes,
  tryMatchExtname
};
