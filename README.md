# 🌈 vs-cli 🎉

## 环境依赖

项目开发环境依赖 Node v16.15.1 以上版本，yarn v1.22.19 以上版本；

如果需要更改 Node 版本，建议使用 NVM 变更：

- 绿色版：https://blog.csdn.net/sunshine543123/article/details/118100787
- 安装版：https://github.com/nvm-sh/nvm#installing-and-updating

## Recommended IDE

- [Visual Studio Code](https://code.visualstudio.com/) + [Vue Language Features](https://marketplace.visualstudio.com/items?itemName=vue.volar);
- [Jetbrains Webstorm](https://www.jetbrains.com/zh-cn/webstorm/);

## 项目依赖

- 开发、构建：Vite@5.0.11；
- 技术栈：Vue@3.4.X；
- 代码语言：Typescript@5.3；
- 组件库：Element-plus@2.5.1；
- 工具库：Lodash@4.17；
- 状态管理：Pinia@2.1.7；
- 国际化工具：Vue-i18n@9.9；
- 路由：Vue-router@4.2.5；
- 时间序列化工具：Moment@2.30;
- CSS 样式原子库：Tailwindcss@3.4.1;

## Git 分支

- master：主分支，用于生产环境部署；
- dev：开发主分支，用于新功能的测试环境；
- release/\*：生产预发布分支，每次上线前需要基于 master 分支创建 release 分支，并将 feature 分支 merge 到 release 分支；
- feature/\*：功能分支；
- bugfix/\*：bug 修复分支（可选）；
- hotfix/\*：热修复分支；

以上 Git 分支管理遵循 Git Flow 流程。

## 主要执行的命令

- `npm run dev`：启动开发服务器；
- `npm run build:dev`：构建开发环境的成果物；
- `npm run build:qa`：构建 QA 环境的成果物；
- `npm run build:prod`：构建 PROD 环境的成果物；
- `npm run release:qa`：更新 QA 环境的版本；
- `npm run release:qa-auto`：更新 QA 环境的版本，用于 devCenter 自动更新测试版本；
- `npm run release:prod`：更新 PROD 环境的版本；

## 环境变量的解释说明

目前，项目配备了 4 中环境变量文件（.env）：

- `.env`：基础配置，不论什么环境构建，此配置文件都会被读取；
- `.env.development`：开发配置，仅在 MODE 为 development 或启动开发服务时生效；
- `.env.qa`：QA 环境配置；
- `.env.prod`：生产环境配置；

在代码中，我们通过 `import.meta.env.[xxx]` 来读取，其中比较典型的环境变量：

- `MODE` 判断当前环境：development/qa/prod；
- `VITE_PORT` 开发端口；
- `VITE_APP_NAME` 当前工程的名字，也是项目隔离的根据；
- `VITE_APP_TITLE` 页面 tab 上的名称，index.html 中的 <title> 标签；
- `VITE_PUBLIC_PATH` 公共资源存放位置；
- `VITE_API_BASE_URL` 接口前缀（需要后端确定后修改）；

## 关于 Auto Import

项目中基于 `unplugin-auto-import` 以及 `unplugin-vue-components` 对三方组件和本地 `components` 文件夹内的所有组件自动引入，允许在项目开发过程中不需要手动 import 相关组件。

自动导入的范围：

- `src/components/**`;
- `vue/vue-router/vue-i18n/pinia`;

同时会自动生成 `auto-import.d.ts` TS 类型声明文件以及 `.eslintrc-auto-import.json` Eslint 配置文件。

## Tailwindcss

请自行查看官方文档，获取如何使用 Tailwindcss。

同时，丰富了基础的规则的尺寸和字体。

#### 首先，使用任意值

如果需要 tailwindcss 预设外的样式类，无需在 tailwind.config.js 中配置具体样式，使用变体的特性（`xxx-[size]`）随意使用任何值：

```html
<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
  <!-- ... -->
</div>
```

#### 其次，开启了 Important 配置

> 来自官网的一段话：important 选项允许您控制是否将 Tailwind 的功能类标记为 `!important`。 当您将 Tailwind 与已存在的具有非常特殊的选择器的 CSS 一起使用时，这可能会非常有用。
> 这是因为大多数情况下，我们希望覆盖原有的组件库的样式，产出符合设计风格的页面和组件。

当然，如果这个配置给您带来了困扰，您也可以关闭它，只需要把 `important` 改为 `false` 或者删掉它！

❗️❗️❗️**针对这个项目，请不要将其置为 `false` 或删除掉**

```js
module.exports = {
  // ...

  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  plugins: [],
  important: true, // => 置为 false 即可
  corePlugins: {
    container: false,
  },
}
```

当然你可以在 `.vue` 文件中的 `<style lang="scss">` scss 语法样式块中手动添加 `!important`:

```scss
.beautiful-title {
  @apply mt-1 #{!important};
}
```

#### 然后，预设了一些额外的尺寸和字体

比如 Tailwind 预设的宽度最多是 w-96，而且尺寸间隔是 16px；

针对这种情况，我们进行了扩展，首先宽度的最大值为 w-200，同时尺寸间隔是 4px，也就是 0.25rem，与此同理的还有高度、最大/小宽度和最大/小高度。

我们提供了备选字体，方便我们在 HTML 中直接使用字体 class：

- `font-CS`: MS CorporateS;
- `font-CS-Demi`: MS CorporateS-Demi;
- `font-CSS-Bold`: MS Corps S Cond Bold;
- `font-CSS-Regular`: MS Corps S Cond Regular;
- `font-CSA-Bold`: MS Corps A Cond Bold;
- `font-CSA-Regular`: MS Corps S Cond Regular;

## Git 提交规范：

借助 CommitLint 和 husky，我们对 Git 提交信息做了限制，具体格式如下：

```bash
git commit -m "[type]: [JIRA Number] [commit message]"
```

其中，type 是必填的，JIRA Number 是可选的，commit message 是必填的；

|   Type   |             含义             |                      备注                      |
| :------: | :--------------------------: | :--------------------------------------------: |
|  build   |        编译相关的修改        |     例如发布版本、对项目构建或者依赖的改动     |
|  chore   |   构建过程或辅助工具的变动   | 如果不确定修改是哪类的，可以用 chore 这个 type |
|    ci    |         持续集成修改         |                                                |
|  config  |           配置修改           |                                                |
|   docs   |        文档修改类提交        |
|   feat   |          新功能提交          |      feat: [TIPS-1234] message for demo.       |
|   fix    |         bug 修复提交         |   fix: [TIPS-1234] fix bug message for demo.   |
|   perf   | 优化相关，比如提升性能、体验 |    pref: [TIPS-1234] optimized performance.    |
| refactor |             重构             |                                                |
|  revert  |           代码回滚           |                                                |
|  style   |         代码格式修改         |            注意不是 css 样式的修改             |
|   test   |         测试用例修改         |                                                |

_commit message 的最大长度在 72 个 letters 左右；_

## 命名规则

我们约定：

- 如果是组件（.vue 文件）命名，请【大写首字母，驼峰】命名；
- 如果是新建文件夹，请以【全部小写字母，单词之间用 “-” 链接】命名（XSF 和 TIPS 比较特殊，因此全大写）；
- 如果是其他文件（如 locale / typing / static / router 等等，非 SFC 文件），均以【首字母小写，驼峰】命名；
- Store 的命名方式请以 use 开头驼峰命名；
- Hooks 的命名方式请以 use 开头，以 `-` 字符链接的全小写，例如 use-confirm.ts；
