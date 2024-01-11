module.exports = {
  semi: false, //句末使用分号
  useTabs: false, //使用空格代替tab缩进
  tabWidth: 2, //缩进长度
  printWidth: 100, //单行长度
  singleQuote: true, //使用单引号
  plugins: [require('prettier-plugin-tailwindcss')],
}
