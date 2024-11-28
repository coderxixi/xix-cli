const import_meta = {};
import { resolve } from "path";
import { getDirname } from "./fsUtils.mjs";
const dirname = getDirname(import_meta.url);
const CWD = process.cwd();
const VARLET_CONFIG = resolve(CWD, "xixi.config.mjs");
const VITEST_CONFIG = resolve(dirname, "../config/vitest.config.js");
const SRC = "src";
const SRC_DIR = resolve(CWD, SRC);
const ES_DIR = resolve(CWD, "es");
const LIB_DIR = resolve(CWD, "lib");
const UMD_DIR = resolve(CWD, "umd");
const TYPES_DIR = resolve(CWD, "types");
const ROOT_DOCS_DIR = resolve(CWD, "docs");
const ROOT_PAGES_DIR = resolve(CWD, "pages");
const ESLINT_EXTENSIONS = [".vue", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".cjs"];
const VITE_RESOLVE_EXTENSIONS = [".vue", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".cjs", ".less", ".scss", ".css"];
const SCRIPTS_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".mjs", ".cjs"];
const PUBLIC_DIR_INDEXES = ["index.vue", "index.tsx", "index.ts", "index.jsx", "index.js"];
const STYLE_DIR_NAME = "style";
const EXAMPLE_DIR_NAME = "example";
const LOCALE_DIR_NAME = "locale";
const DOCS_DIR_NAME = "docs";
const TESTS_DIR_NAME = "__tests__";
const GENERATORS_DIR = resolve(dirname, "../../template/generators");
const UI_PACKAGE_JSON = resolve(CWD, "package.json");
const CLI_PACKAGE_JSON = resolve(dirname, "../../package.json");
const CHECKLIST_FILE = resolve(CWD, "CHECKLIST.md");
const SITE = resolve(dirname, "../../site");
const SITE_OUTPUT_PATH = resolve(CWD, "site");
const SITE_PUBLIC_PATH = resolve(CWD, "public");
const SITE_DIR = resolve(CWD, ".xixi/site");
const SITE_PC_DIR = resolve(CWD, ".xixi/site/pc");
const SITE_PC_ROUTES = resolve(CWD, ".xixi/pc.routes.ts");
const SITE_MOBILE_ROUTES = resolve(CWD, ".xixi/mobile.routes.ts");
const SITE_CONFIG = resolve(CWD, ".xixi/site.config.json");
const HL_DIR = resolve(CWD, "highlight");
const HL_COMPONENT_NAME_RE = /.*(\/|\\)(.+)(\/|\\)docs(\/|\\)/;
const HL_API_RE = /##\s*API(?:\r\n|\n)+/;
const HL_EN_TITLE_ATTRIBUTES_RE = /###\s*Props(?:\r\n|\n)+/;
const HL_EN_TITLE_EVENTS_RE = /###\s*Events(?:\r\n|\n)+/;
const HL_EN_TITLE_SLOTS_RE = /###\s*Slots(?:\r\n|\n)+/;
const HL_EN_MD = "en-US.md";
const HL_EN_WEB_TYPES_JSON = resolve(HL_DIR, "web-types.en-US.json");
const HL_ZH_TITLE_ATTRIBUTES_RE = /###\s*属性(?:\r\n|\n)+/;
const HL_ZH_TITLE_EVENTS_RE = /###\s*事件(?:\r\n|\n)+/;
const HL_ZH_TITLE_SLOTS_RE = /###\s*插槽(?:\r\n|\n)+/;
const HL_ZH_MD = "zh-CN.md";
const HL_ZH_WEB_TYPES_JSON = resolve(HL_DIR, "web-types.zh-CN.json");
const ICONS_PNG_DIR_NAME = "png";
const EXTENSION_ENTRY = resolve(CWD, "src/extension.ts");
export {
  CHECKLIST_FILE,
  CLI_PACKAGE_JSON,
  CWD,
  DOCS_DIR_NAME,
  ESLINT_EXTENSIONS,
  ES_DIR,
  EXAMPLE_DIR_NAME,
  EXTENSION_ENTRY,
  GENERATORS_DIR,
  HL_API_RE,
  HL_COMPONENT_NAME_RE,
  HL_DIR,
  HL_EN_MD,
  HL_EN_TITLE_ATTRIBUTES_RE,
  HL_EN_TITLE_EVENTS_RE,
  HL_EN_TITLE_SLOTS_RE,
  HL_EN_WEB_TYPES_JSON,
  HL_ZH_MD,
  HL_ZH_TITLE_ATTRIBUTES_RE,
  HL_ZH_TITLE_EVENTS_RE,
  HL_ZH_TITLE_SLOTS_RE,
  HL_ZH_WEB_TYPES_JSON,
  ICONS_PNG_DIR_NAME,
  LIB_DIR,
  LOCALE_DIR_NAME,
  PUBLIC_DIR_INDEXES,
  ROOT_DOCS_DIR,
  ROOT_PAGES_DIR,
  SCRIPTS_EXTENSIONS,
  SITE,
  SITE_CONFIG,
  SITE_DIR,
  SITE_MOBILE_ROUTES,
  SITE_OUTPUT_PATH,
  SITE_PC_DIR,
  SITE_PC_ROUTES,
  SITE_PUBLIC_PATH,
  SRC,
  SRC_DIR,
  STYLE_DIR_NAME,
  TESTS_DIR_NAME,
  TYPES_DIR,
  UI_PACKAGE_JSON,
  UMD_DIR,
  VARLET_CONFIG,
  VITEST_CONFIG,
  VITE_RESOLVE_EXTENSIONS,
  dirname
};
