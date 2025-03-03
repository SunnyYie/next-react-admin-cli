const program = require('commander')

// 定义命令行工具
program.name('mcgdg').description('SunnyYie的CLI工具').version(require('./package.json').version)

program
  .command('init')
  .description('初始化项目')
  .arguments('<name>', '项目名称')
  .option('-t, --template <template>', '使用什么模板来创建')
  .action((name, options) => {
    require('./lib/init')(name, options)
  })

// 解析参数
program.parse(process.argv)
