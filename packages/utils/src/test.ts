/*
 * @Author: liuss7 976344695@qq.com
 * @Date: 2024-11-25 14:11:10
 * @LastEditors: liuss7 976344695@qq.com
 * @LastEditTime: 2024-11-25 14:11:46
 * @FilePath: /xix-cli/packages/utils/src/test.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getNpmInfo } from './versionUtils.js';

const info = getNpmInfo('create-vite');

console.log(info);