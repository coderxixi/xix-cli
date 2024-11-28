/*
 * @Author: liuss7 976344695@qq.com
 * @Date: 2024-11-27 10:49:45
 * @LastEditors: liuss7 976344695@qq.com
 * @LastEditTime: 2024-11-28 13:53:38
 * @FilePath: /xix-cli/packages/cli/src/node/commands/compile.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import logger from '../shared/logger.js';
import fse from 'fs-extra';
import { createSpinner } from 'nanospinner';
import { ES_DIR, HL_DIR, LIB_DIR, UMD_DIR } from '../shared/constant.js';
import { compileBundle, compileModule } from '../compiler/compileModule.js';
import { compileTemplateHighlight } from '../compiler/compileTemplateHighlight.js';
import { compileTypes } from '../compiler/compileTypes.js';
const { remove } = fse;
export function removeDir() {
    return Promise.all([remove(ES_DIR), remove(LIB_DIR), remove(HL_DIR), remove(UMD_DIR)]);
}
export async function runTask(taskName, task) {
    const s = createSpinner().start({ text: `Compiling ${taskName}` });
    try {
        const start = performance.now();
        await task();
        s.success({ text: `Compilation ${taskName} completed! (${Math.ceil(performance.now() - start)}ms)` });
    }
    catch (e) {
        s.error({ text: `Compilation ${taskName} failed!` });
        logger.error(e.toString());
    }
}
export async function compile() {
    process.env.NODE_ENV = 'compile';
    // await removeDir()
    // return
    await Promise.all([runTask('types', compileTypes), runTask('template highlight', compileTemplateHighlight)]);
    process.env.BABEL_MODULE = 'module';
    await runTask('module', compileModule);
    process.env.BABEL_MODULE = '';
    await runTask('bundle', compileBundle);
}
