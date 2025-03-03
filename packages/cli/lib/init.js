const pc = require('picocolors')
const prompts = require('prompts')
// 是否按照一定意愿来初始化

const init = async (name, options) => {
  console.log(pc.green(`初始化项目${name}...`))

  // 询问用户是否要使用默认配置
  const res = await prompts([
    {
      type: 'text',
      name: 'name',
      message: '请输入项目名称',
      initial: __dirname.split('/').pop(),
    },
    {
      type: 'text',
      name: 'folder',
      message: '请输入项目文件夹',
      initial: './',
    },
    {
      type: 'select',
      name: 'template',
      message: '请选择模板',
      choices: [
        { title: 'vue3', value: 'vue3' },
        { title: 'react', value: 'react' },
        { title: 'react-ts', value: 'react-ts' },
      ],
    },
  ])

  console.log(res)
}

module.exports = init
