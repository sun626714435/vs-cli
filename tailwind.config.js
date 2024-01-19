/** @type {import('tailwindcss').Config} */

const sizes = Array(30)
  .fill(0)
  .reduce((acc, _, index) => ({ ...acc, [(index + 1) * 4]: `${index + 1}rem` }), {})

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        // 主色
        'primary-black': '#303133',
        'primary-red': '#E61E00',
        'primary-green': '#3F8B35',
        'primary-blue': '#3182CE',
        'active-blue': '#60B0F9',
        'dark-blue': '#007ABF',

        // 浅色
        'back-light-red': '#FFDAD5',
        'back-light-green': '#E5F5E4',
        'back-light-blue': '#ECF5FF',

        // 不可操作
        'disable-gray': '#F0F0F0',
        'disable-dark-gray': '#AFAFAF',
        'disable-blue': '#79C2EB',

        // 提示语
        'tip-gray': '#999999',

        // 未选中
        'unchecked-gray': '#AFAFAF',

        // 描边
        'stroke-gray': '#BFBFBF',
        'stroke-light-gray': '#F0F0F0',

        // 分页
        'pagination-gray': '#F0F2F5',
        'pagination-light-gray': '#F5F7FA',
        'pagination-black': '#606266',
      },
      boxShadow: {
        panel: '0px 2px 4px 0px #53535340',
        stroke: '0 0 0 1px #BFBFBF inset',
      },
      width: {
        ...sizes,
      },
      height: {
        ...sizes,
      },
      fontFamily: {
        CS: [
          'CorporateS',
          'Corps S Cond Regular',
          'Corps S Cond Bold',
          '-apple-system',
          'Microsoft YaHei',
          '微软雅黑',
          'Arial',
          'sans-serif',
        ],
        'CS-Demi': [
          'CorporateS-Demi',
          'CorporateS',
          'Corps S Cond Regular',
          'Corps S Cond Bold',
          '-apple-system',
          'Microsoft YaHei',
          '微软雅黑',
          'Arial',
          'sans-serif',
        ],
        'CSS-Bold': [
          'Corps S Cond Bold',
          'CorporateS',
          '-apple-system',
          'Microsoft YaHei',
          '微软雅黑',
          'Arial',
          'sans-serif',
        ],
        'CSS-Regular': [
          'Corps S Cond Regular',
          'CorporateS',
          '-apple-system',
          'Microsoft YaHei',
          '微软雅黑',
          'Arial',
          'sans-serif',
        ],
        'CSA-Bold': [
          'Corps A Cond Bold',
          'CorporateS',
          '-apple-system',
          'Microsoft YaHei',
          '微软雅黑',
          'Arial',
          'sans-serif',
        ],
        'CSA-Regular': [
          'Corps A Cond Regular',
          'CorporateS',
          '-apple-system',
          'Microsoft YaHei',
          '微软雅黑',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: sizes,
      minWidth: sizes,
      maxHeight: sizes,
      minHeight: sizes,
    },
  },
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  plugins: [],
  important: true,
  corePlugins: {
    container: false,
  },
}
