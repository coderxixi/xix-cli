import fse from 'fs-extra';
import { TYPES_DIR, UI_PACKAGE_JSON } from '../shared/constant.js';
import { pascalCase } from '@varlet/shared';
import { resolve, relative } from 'path';
import { getXixiConfig } from '../confing/xixi.config.js';
import { compileStyleVars } from './compileStyleVars.js';
const { ensureDir, writeFileSync, readdir, writeFile, readJSONSync } = fse;
export function generateReference(moduleDir) {
    writeFileSync(resolve(moduleDir, 'index.d.ts'), `\
export * from '${relative(moduleDir, TYPES_DIR)}'
`);
}
export async function compileTypes() {
    await ensureDir(TYPES_DIR);
    compileStyleVars();
    const { namespace = '', directives = '' } = await getXixiConfig();
    const { name: libraryName } = readJSONSync(UI_PACKAGE_JSON);
    const filenames = await readdir(TYPES_DIR);
    const includeFilenames = filenames.filter((filename) => !['index.d.ts', 'global.d.ts'].includes(filename));
    const exports = [];
    const componentDeclares = [];
    const directiveDeclares = [];
    includeFilenames.forEach((filename) => {
        const folder = filename.replace('.d.ts', '');
        const name = pascalCase(folder);
        exports.push(`export * from './${folder}'`);
        if (filename.startsWith(namespace)) {
            // ignore prefix with namespace e.g. varComponent
            return;
        }
        if (directives.includes(folder)) {
            directiveDeclares.push(`v${name}: typeof import('${libraryName}')['_${name}Component']`);
        }
        else {
            componentDeclares.push(`${pascalCase(namespace)}${name}: typeof import('${libraryName}')['_${name}Component']`);
        }
    });
    const vueDeclares = `\
declare module 'vue' {
  export interface GlobalComponents {
    ${componentDeclares.join('\n    ')}
  }

  export interface ComponentCustomProperties {
    ${directiveDeclares.join('\n    ')}
  }
}`;
    const template = `\
import type { App } from 'vue'

export const version: string
export const install: (app: App) => void

${exports.join('\n')}

${vueDeclares}
`;
    await writeFile(resolve(TYPES_DIR, 'index.d.ts'), template);
}
