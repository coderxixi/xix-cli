#!/usr/bin/env node
import {Command} from "commander";
import { getCliVersion } from './shared/fsUtils.js'
const program = new Command();
// program.version(`xixi-cli ${getCliVersion()}`).usage('<command> [options]');
//创建组件命令

program
     .command('create')
     .description('创建组件目录')
     .option('-i, --internal', 'varlet internal mode')
     .option('-n, --name <componentName>', 'Component name')
     .option('-s, --sfc', 'Generate files in sfc format')
     .option('-t, --tsx', 'Generate files in tsx format')
     .option('-l, --locale', 'Generator internationalized files')
     .action(async (options) => {
       const { create } = await import('./commands/create.js')
       console.log('create', create);

       return create(options)
       console.log('options', options);
      
  })



program
  .command('build')
  .description('Build varlet site for production')
  .action(async () => {
    const { build } = await import('./commands/build.js')
    return build()
  })




program
  .command('gen')
  .description('Generate cli application')
  .option('-n, --name <applicationName>', 'Application name')
  .option('-s, --sfc', 'Generate files in sfc format')
  .option('-t, --tsx', 'Generate files in tsx format')
  .option('-l, --locale', 'Generator internationalized files')
  .action(async (options) => {
    const { gen } = await import('./commands/gen.js')

    return gen(options)
  })

//解析模版命令
program.parse()