/*
 * @Author: liuss7 976344695@qq.com
 * @Date: 2024-11-26 13:09:02
 * @LastEditors: liuss7 976344695@qq.com
 * @LastEditTime: 2024-11-28 13:49:25
 * @FilePath: /xix-cli/packages/cli/src/node/commands/build.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import fse from 'fs-extra'
import { SRC_DIR } from '../shared/constant.js'
import { build as buildVite } from 'vite'
import { getBuildConfig } from '../confing/vite.config.js'
import { getXixiConfig } from '../confing/xixi.config.js'
// import { buildSiteEntry } from '../compiler/compileSiteEntry.js'

const { ensureDirSync } = fse

export async function build() {
  process.env.NODE_ENV = 'production'
  ensureDirSync(SRC_DIR);
  const varletConfig = await getXixiConfig();
  const buildConfig = getBuildConfig(varletConfig);
  await buildVite(buildConfig)
}
