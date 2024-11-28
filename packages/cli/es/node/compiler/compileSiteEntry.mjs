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
import { slash } from "@varlet/shared";
import {
  DOCS_DIR_NAME,
  EXAMPLE_DIR_NAME,
  LOCALE_DIR_NAME,
  ROOT_DOCS_DIR,
  ROOT_PAGES_DIR,
  SITE,
  SITE_DIR,
  SITE_MOBILE_ROUTES,
  SITE_PC_DIR,
  SITE_PC_ROUTES,
  SRC_DIR
} from "../shared/constant.mjs";
import { glob, isDir, outputFileSyncOnChange } from "../shared/fsUtils.mjs";
import { getXixiConfig } from "../confing/xixi.config.mjs";
const { copy } = fse;
const ROOT_DOCS_RE = /\/docs\/([-\w]+)\.([-\w]+)(?:.draft)?\.md/;
const PAGE_LOCALE_RE = /\/pages\/([-\w]+)\/locale\/([-\w]+)\.ts/;
const EXAMPLE_INDEX_RE = /\/([-\w]+)\/example\/index(?:.draft)?\.vue/;
const COMPONENT_DOCS_RE = /\/([-\w]+)\/docs\/([-\w]+)(?:.draft)?\.md/;
function getExampleRoutePath(examplePath) {
  var _a;
  return "/" + ((_a = examplePath.match(EXAMPLE_INDEX_RE)) == null ? void 0 : _a[1]);
}
function getComponentDocRoutePath(componentDocsPath) {
  var _a;
  const [, routePath, language] = (_a = componentDocsPath.match(COMPONENT_DOCS_RE)) != null ? _a : [];
  return `/${language}/${routePath}`;
}
function getRootDocRoutePath(rootDocsPath) {
  var _a;
  const [, routePath, language] = (_a = rootDocsPath.match(ROOT_DOCS_RE)) != null ? _a : [];
  return `/${language}/${routePath}`;
}
function getPageRoutePath(rootLocalePath) {
  var _a;
  const [, routePath, language] = (_a = rootLocalePath.match(PAGE_LOCALE_RE)) != null ? _a : [];
  return `/${language}/${routePath}`;
}
function getPageFilePath(rootLocalePath) {
  return rootLocalePath.replace(/locale\/.+/, "index.vue");
}
function isDraftExample(example) {
  return example.endsWith("index.draft.vue");
}
function hasDraftExample(examples, example) {
  return examples.includes(example.replace("index.vue", "index.draft.vue"));
}
function isDraftDoc(doc) {
  return doc.endsWith(".draft.md");
}
function hasDraftDoc(docs, doc) {
  return docs.includes(doc.replace(".md", ".draft.md"));
}
function findExamples(draftMode) {
  return __async(this, null, function* () {
    const [examples, draftExamples] = yield Promise.all([
      glob(`${SRC_DIR}/**/${EXAMPLE_DIR_NAME}/index.vue`),
      glob(`${SRC_DIR}/**/${EXAMPLE_DIR_NAME}/index.draft.vue`)
    ]);
    const mergedExamples = [...examples, ...draftExamples];
    return mergedExamples.filter(
      (example) => draftMode ? isDraftExample(example) || !hasDraftExample(mergedExamples, example) : !isDraftExample(example)
    );
  });
}
function filterDraftDocs(docs, draftMode) {
  return docs.filter((doc) => draftMode ? isDraftDoc(doc) || !hasDraftDoc(docs, doc) : !isDraftDoc(doc));
}
function findComponentDocs(draftMode) {
  return __async(this, null, function* () {
    const componentDocs = yield glob(`${SRC_DIR}/**/${DOCS_DIR_NAME}/*.md`);
    return filterDraftDocs(componentDocs, draftMode);
  });
}
function findRootDocs(draftMode) {
  return __async(this, null, function* () {
    const rootDocs = yield glob(`${ROOT_DOCS_DIR}/*.md`);
    return filterDraftDocs(rootDocs, draftMode);
  });
}
function findPageLocales() {
  return __async(this, null, function* () {
    const { defaultLanguage } = yield getXixiConfig();
    const userPages = yield glob(`${ROOT_PAGES_DIR}/*`);
    const baseLocales = yield glob(`${SITE}/pc/pages/**/${LOCALE_DIR_NAME}/*.ts`);
    const userLocales = yield userPages.reduce(
      (userLocales2, page) => __async(this, null, function* () {
        if (isDir(page)) {
          const locales = yield glob(`${page}/${LOCALE_DIR_NAME}/*.ts`);
          if (!locales.length) locales.push(`${page}/${LOCALE_DIR_NAME}/${defaultLanguage}.ts`);
          (yield userLocales2).push(...locales);
        }
        return userLocales2;
      }),
      Promise.resolve([])
    );
    const filterMap = /* @__PURE__ */ new Map();
    baseLocales.forEach((locale) => {
      var _a;
      const [, routePath, language] = (_a = locale.match(PAGE_LOCALE_RE)) != null ? _a : [];
      filterMap.set(routePath + language, slash(`${SITE_PC_DIR}/pages/${routePath}/locale/${language}.ts`));
    });
    userLocales.forEach((locale) => {
      var _a;
      const [, routePath, language] = (_a = locale.match(PAGE_LOCALE_RE)) != null ? _a : [];
      filterMap.set(routePath + language, locale);
    });
    return Promise.resolve(Array.from(filterMap.values()));
  });
}
function buildMobileSiteRoutes(draftMode) {
  return __async(this, null, function* () {
    const examples = yield findExamples(draftMode);
    const routes = examples.map(
      (example) => `
  {
    path: '${getExampleRoutePath(example)}',
    // @ts-ignore
    component: () => import('${example}')
  }`
    );
    const source = `export default [    ${routes.join(",")}
]`;
    yield outputFileSyncOnChange(SITE_MOBILE_ROUTES, source);
  });
}
function buildPcSiteRoutes(draftMode) {
  return __async(this, null, function* () {
    const [componentDocs, rootDocs, rootLocales] = yield Promise.all([
      findComponentDocs(draftMode),
      findRootDocs(draftMode),
      findPageLocales()
    ]);
    const pageRoutes = rootLocales.map(
      (locale) => `
  {
    path: '${getPageRoutePath(locale)}',
    // @ts-ignore
    component: () => import('${getPageFilePath(locale)}')
  }`
    );
    const componentDocsRoutes = componentDocs.map(
      (componentDoc) => `
      {
        path: '${getComponentDocRoutePath(componentDoc)}',
        // @ts-ignore
        component: () => import('${componentDoc}')
      }`
    );
    const rootDocsRoutes = rootDocs.map(
      (rootDoc) => `
      {
        path: '${getRootDocRoutePath(rootDoc)}',
        // @ts-ignore
        component: () => import('${rootDoc}')
      }`
    );
    const layoutRoutes = `{
    path: '/layout',
    // @ts-ignore
    component:()=> import('${slash(SITE_PC_DIR)}/Layout.vue'),
    children: [
      ${[...componentDocsRoutes, rootDocsRoutes].join(",")},
    ]
  }`;
    const source = `export default [  ${pageRoutes.join(",")},
  ${layoutRoutes}
]`;
    outputFileSyncOnChange(SITE_PC_ROUTES, source);
  });
}
function buildSiteSource() {
  return __async(this, null, function* () {
    return copy(SITE, SITE_DIR);
  });
}
function buildSiteEntry(draftMode) {
  return __async(this, null, function* () {
    yield getXixiConfig(true);
    yield Promise.all([buildMobileSiteRoutes(draftMode), buildPcSiteRoutes(draftMode), buildSiteSource()]);
  });
}
export {
  buildMobileSiteRoutes,
  buildPcSiteRoutes,
  buildSiteEntry,
  buildSiteSource,
  filterDraftDocs,
  findComponentDocs,
  findExamples,
  findPageLocales,
  findRootDocs,
  getComponentDocRoutePath,
  getExampleRoutePath,
  getPageFilePath,
  getPageRoutePath,
  getRootDocRoutePath,
  hasDraftDoc,
  hasDraftExample,
  isDraftDoc,
  isDraftExample
};
