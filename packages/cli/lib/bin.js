#!/usr/bin/env node
import { Command } from "commander";
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
    const { create } = await import('./commands/create.js');
    console.log('create', create);
    return create(options);
    console.log('options', options);
});
program.on('command:*', async ([cmd]) => {
    // const { default: logger } = await import('./shared/logger.js')
    // program.outputHelp()
    // logger.error(`\nUnknown command ${cmd}.\n`)
    // process.exitCode = 1
});
//解析模版命令
program.parse();
