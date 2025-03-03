import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const program = require('commander')

// 定义命令行工具
program.name('mcgdg').description('SunnyYie的CLI工具').version(require('../package.json').version)

program
  .command('init')
  .description('初始化项目')
  .action(name => {})

// 解析参数
program.parse(process.argv)
