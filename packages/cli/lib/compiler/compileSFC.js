import fse from 'fs-extra';
import hash from 'hash-sum';
import { parse, resolve } from 'path';
import { parse as parseSFC, compileTemplate, compileStyle, compileScript as compileScriptSFC, registerTS, } from '@vue/compiler-sfc';
import { replaceExt, smartAppendFileSync } from '../shared/fsUtils.js';
import { SRC_DIR, ES_DIR } from '../shared/constant.js';
import { compileScript, getScriptExtname } from './compileScript.js';
import ts from 'typescript';
import { compressCss, compileLess, compileScss, extractStyleDependencies, normalizeStyleDependency, STYLE_IMPORT_RE, } from './compileStyle.js';
const { readFile, existsSync, readFileSync, writeFileSync } = fse;
registerTS(() => ts);
const EXPORT = 'export default';
const SFC = '__sfc__';
const SFC_DECLARE = `const ${SFC} = `;
const RENDER = '__render__';
export function declareEmptySFC() {
    return `${SFC_DECLARE}{}\n`;
}
export function replaceExportToDeclare(script) {
    return script.replace(EXPORT, SFC_DECLARE);
}
export function injectExport(script) {
    script += `\n${EXPORT} ${SFC}`;
    return script;
}
export function injectScopeId(script, scopeId) {
    script += `\n${SFC}.__scopeId = '${scopeId}'`;
    return script;
}
export function injectRender(script, render) {
    script = script.trim();
    render = render.replace('export function render', `function ${RENDER}`);
    script = script.replace(SFC_DECLARE, `${render}\n${SFC_DECLARE}`);
    script += `\n${SFC}.render = ${RENDER}`;
    return script;
}
export async function compileSFC(sfc) {
    const sources = await readFile(sfc, 'utf-8');
    const id = hash(sources);
    const { descriptor } = parseSFC(sources, { filename: sfc, sourceMap: false });
    const { script, scriptSetup, template, styles } = descriptor;
    let scriptContent;
    let bindingMetadata;
    if (script || scriptSetup) {
        if (scriptSetup) {
            const { content, bindings } = compileScriptSFC(descriptor, {
                id,
                // issue https://github.com/varletjs/varlet/issues/1458
                fs: {
                    fileExists: (file) => existsSync(file.replace(ES_DIR, SRC_DIR)),
                    readFile: (file) => readFileSync(file.replace(ES_DIR, SRC_DIR), 'utf-8'),
                },
            });
            scriptContent = content;
            bindingMetadata = bindings;
        }
        else {
            // script only
            scriptContent = script.content;
        }
        scriptContent = replaceExportToDeclare(scriptContent);
    }
    if (!scriptContent) {
        scriptContent = declareEmptySFC();
    }
    // scoped
    const hasScope = styles.some((style) => style.scoped);
    const scopeId = hasScope ? `data-v-${id}` : '';
    if (template) {
        const render = compileTemplate({
            id,
            source: template.content,
            filename: sfc,
            compilerOptions: {
                expressionPlugins: descriptor.script?.lang === 'ts' ? ['typescript'] : undefined,
                scopeId,
                bindingMetadata,
            },
        }).code;
        scriptContent = injectRender(scriptContent, render);
    }
    if (scopeId) {
        scriptContent = injectScopeId(scriptContent, scopeId);
    }
    scriptContent = injectExport(scriptContent);
    await compileScript(scriptContent, sfc);
    // style
    for (let index = 0; index < styles.length; index++) {
        const style = styles[index];
        const file = replaceExt(sfc, `Sfc${index || ''}.${style.lang || 'css'}`);
        const { base, dir } = parse(file);
        const dependencyPath = normalizeStyleDependency(base, STYLE_IMPORT_RE);
        const cssFile = resolve(dir, `./style/index${getScriptExtname()}`);
        let { code } = compileStyle({
            source: style.content,
            filename: file,
            id: scopeId,
            scoped: style.scoped,
        });
        code = extractStyleDependencies(file, code, STYLE_IMPORT_RE);
        writeFileSync(file, compressCss(code), 'utf-8');
        smartAppendFileSync(cssFile, `import '${dependencyPath}.css'\n`);
        if (style.lang === 'less') {
            await compileLess(file);
        }
        if (style.lang === 'scss') {
            compileScss(file);
        }
    }
}
