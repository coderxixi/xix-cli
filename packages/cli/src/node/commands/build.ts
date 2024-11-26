import fse from 'fs-extra'
import { SRC_DIR } from '../shared/constant.js'
import { build as buildVite } from 'vite'
import { getBuildConfig } from '../confing/vite.config.js'
import { getXixiConfig } from '../confing/xixi.config.js'
// import { buildSiteEntry } from '../compiler/compileSiteEntry.js'

const { ensureDirSync } = fse

export async function build() {
  process.env.NODE_ENV = 'production'
  ensureDirSync(SRC_DIR)
  const varletConfig = await getXixiConfig();
  const buildConfig = getBuildConfig(varletConfig);
  await buildVite(buildConfig)
}
