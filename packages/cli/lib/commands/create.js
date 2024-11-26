import ejs from 'ejs';
import fse from 'fs-extra';
import logger from '../shared/logger.js';
import { pascalCase, camelize, kebabCase } from '@varlet/shared';
import { input, confirm, select } from '@inquirer/prompts';
import { resolve } from 'path';
import { glob } from '../shared/fsUtils.js';
import { getXixiConfig } from '../confing/xixi.config.js';
import { SRC_DIR, dirname } from '../shared/constant.js';
const { removeSync, readFileSync, copySync, pathExistsSync, writeFileSync, renameSync } = fse;
async function renderTemplates(componentFolder, componentFolderName, renderData) {
    const templates = await glob(`${componentFolder}/**/*.ejs`);
    templates.forEach((template) => {
        const templateCode = readFileSync(template, { encoding: 'utf-8' });
        const code = ejs.render(templateCode, renderData);
        const file = template
            .replace('[componentName]', camelize(componentFolderName))
            .replace('[ComponentName]', pascalCase(componentFolderName))
            .replace('.ejs', '');
        writeFileSync(file, code);
        removeSync(template);
    });
}
export async function create(options) {
    logger.title('\n📦📦 创建组件目录的名称 ! \n');
    const { namespace } = await getXixiConfig();
    const renderData = {
        namespace,
        bigCamelizeNamespace: pascalCase(namespace),
        kebabCaseName: 'component-name',
        bigCamelizeName: 'ComponentName',
        camelizeName: 'componentName',
        style: 'vue',
    };
    const name = options.name
        ? options.name
        : await input({
            message: 'Name of the component created: ',
            default: renderData.kebabCaseName,
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
    const locale = options.locale
        ? options.locale
        : await confirm({
            message: 'Whether to use i18n?',
            default: false,
        });
    renderData.locale = locale;
    // Determine whether the parameter carries a component style
    if (options.sfc || options.tsx) {
        renderData.style = options.sfc ? 'vue' : 'tsx';
    }
    else {
        const style = await select({
            message: '你想要创建什么风格的组件模版 ?',
            choices: [
                { name: 'sfc', value: 'vue' },
                { name: 'tsx', value: 'tsx' },
            ],
            default: 'vue',
        });
        renderData.style = style;
    }
    copySync(resolve(dirname, '../../template/create'), componentFolder);
    await renderTemplates(componentFolder, componentFolderName, renderData);
    if (options.internal) {
        removeSync(resolve(componentFolder, './example/locale/index.ts'));
        renameSync(resolve(componentFolder, './example/locale/_index.ts'), resolve(componentFolder, './example/locale/index.ts'));
    }
    else {
        removeSync(resolve(componentFolder, './example/locale/_index.ts'));
    }
    if (!renderData.locale) {
        removeSync(resolve(componentFolder, '/example/locale'));
    }
    if (renderData.style !== 'vue') {
        removeSync(resolve(componentFolder, `${renderData.bigCamelizeName}.vue`));
    }
    if (renderData.style !== 'tsx') {
        removeSync(resolve(componentFolder, `${renderData.bigCamelizeName}.tsx`));
    }
    logger.success(`创建 ${componentFolderName} 组件成功!`);
}
