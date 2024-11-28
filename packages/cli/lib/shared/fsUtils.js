/*
 * @Author: liuss7 976344695@qq.com
 * @Date: 2024-11-26 10:12:36
 * @LastEditors: liuss7 976344695@qq.com
 * @LastEditTime: 2024-11-27 11:03:46
 * @FilePath: /xix-cli/packages/cli/src/node/shared/fsUtils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import globSync from 'glob';
import fse from 'fs-extra';
import { extname, resolve } from 'path';
import { CLI_PACKAGE_JSON, SCRIPTS_EXTENSIONS, SRC_DIR, PUBLIC_DIR_INDEXES, UI_PACKAGE_JSON } from './constant.js';
import { fileURLToPath } from 'url';
const { readJSONSync, ensureFileSync, readFileSync, outputFileSync, pathExistsSync, readdir, lstatSync, appendFileSync } = fse;
//获取cli 版本号
export function getCliVersion() {
    return readJSONSync(CLI_PACKAGE_JSON).version;
}
//获取目录名称
export function getDirname(url) {
    return fileURLToPath(new URL('.', url));
}
export function outputFileSyncOnChange(path, code) {
    ensureFileSync(path);
    const content = readFileSync(path, 'utf-8');
    if (content !== code) {
        outputFileSync(path, code);
    }
}
export function glob(pattern) {
    return new Promise((resolve, reject) => {
        globSync(pattern, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    });
}
export const isMD = (file) => pathExistsSync(file) && extname(file) === '.md';
export const isDir = (file) => pathExistsSync(file) && lstatSync(file).isDirectory();
export const isSFC = (file) => pathExistsSync(file) && extname(file) === '.vue';
export const isDTS = (file) => pathExistsSync(file) && file.endsWith('.d.ts');
export const isJsx = (file) => pathExistsSync(file) && file.endsWith('.jsx');
export const isTsx = (file) => pathExistsSync(file) && file.endsWith('.tsx');
export const isScript = (file) => pathExistsSync(file) && SCRIPTS_EXTENSIONS.includes(extname(file));
export const isLess = (file) => pathExistsSync(file) && extname(file) === '.less';
export const isScss = (file) => pathExistsSync(file) && extname(file) === '.scss';
export const isPublicDir = (dir) => PUBLIC_DIR_INDEXES.some((index) => pathExistsSync(resolve(dir, index)));
export async function getPublicDirs() {
    const srcDir = await readdir(SRC_DIR);
    return srcDir.filter((filename) => isPublicDir(resolve(SRC_DIR, filename)));
}
export function getVersion() {
    return readJSONSync(UI_PACKAGE_JSON).version;
}
export const replaceExt = (file, ext) => file.replace(extname(file), ext);
export function smartAppendFileSync(file, code) {
    if (pathExistsSync(file)) {
        const content = readFileSync(file, 'utf-8');
        if (!content.includes(code)) {
            appendFileSync(file, code);
        }
    }
}
