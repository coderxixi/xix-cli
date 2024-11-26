
import globSync from 'glob'
import fse from 'fs-extra'
import { extname, resolve } from 'path'
import { CLI_PACKAGE_JSON } from './constant.js';
import { fileURLToPath } from 'url'
const {
  readJSONSync,
  ensureFileSync,
  readFileSync, 
  outputFileSync
} = fse
//获取cli 版本号
export function getCliVersion() {
  return readJSONSync(CLI_PACKAGE_JSON).version
}


//获取目录名称
export function getDirname(url: string) {
  return fileURLToPath(new URL('.', url))
}




export function outputFileSyncOnChange(path: string, code: string) {
  ensureFileSync(path)
  const content = readFileSync(path, 'utf-8')
  if (content !== code) {
    outputFileSync(path, code)
  }
}



export function glob(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    globSync(pattern, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}