const pc = require('picocolors')
const prompts = require('prompts')
// 是否按照一定意愿来初始化

const init = async (name, options) => {
  console.log(pc.green(`初始化项目...`))

  // 询问用户是否要使用默认配置
  const res = await prompts([
    {
      type: 'select',
      name: 'tech',
      message: '请选择你希望使用的技术栈',
      choices: [
        { title: 'React', value: 'React' },
        { title: 'React-TS', value: 'React-TS' },
      ],
    },
    {
      type: 'select',
      name: 'template',
      message: '请选择所要创建项目的类型',
      choices: [
        { title: '简易版', value: 'simple' },
        { title: '完整版', value: 'full' },
      ],
    },
  ])

  // 下载模板
  const { tech, template } = res

  // 展示下载进度
  console.log(pc.green(`正在下载模板...`))

  // 下载完成
  console.log(pc.green(`下载完成`))

  console.log(res)
}

module.exports = init
