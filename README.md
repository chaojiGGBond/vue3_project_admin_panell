# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

.stylelintrc.json的注释
{
// 扩展基本的 Stylelint 配置
"extends": [
"stylelint-config-standard", // 基础 CSS 检查规则
"stylelint-config-html/vue", // Vue 中 template 样式格式化
"stylelint-config-standard-scss", // SCSS 的标准配置
"stylelint-config-recommended-vue/scss", // Vue 中 SCSS 样式格式化
"stylelint-config-recess-order", // CSS 属性书写顺序插件
"stylelint-config-prettier" // 确保与 Prettier 的兼容性
],
// 针对特定文件的覆盖配置
"overrides": [
{
// 针对 SCSS、CSS、Vue 和 HTML 文件
"files": ["**/*.(scss|css|vue|html)"],
"customSyntax": "postcss-scss" // 使用 postcss-scss 解析器
},
{
// 针对 HTML 和 Vue 文件
"files": ["**/*.(html|vue)"],
"customSyntax": "postcss-html" // 使用 postcss-html 解析器
}
],
// 指定要忽略的文件
"ignoreFiles": [
"**/*.js", // 忽略 JavaScript 文件
"**/*.jsx", // 忽略 JSX 文件
"**/*.tsx", // 忽略 TSX 文件
"**/*.ts", // 忽略 TypeScript 文件
"**/*.json", // 忽略 JSON 文件
"**/*.md", // 忽略 Markdown 文件
"**/*.yaml" // 忽略 YAML 文件
],
// 自定义规则
"rules": {
"value-keyword-case": null, // 允许在 CSS 中使用 v-bind，不报错
"no-descending-specificity": null, // 禁止在高优先级选择器后出现低优先级选择器
"function-url-quotes": "always", // 要求 URL 使用引号
"no-empty-source": null, // 允许空源码
"selector-class-pattern": null, // 不强制选择器类名格式
"property-no-unknown": null, // 允许使用未知的属性
"block-opening-brace-space-before": "always", // 大括号前必须有空格
"value-no-vendor-prefix": null, // 允许属性值前缀
"property-no-vendor-prefix": null, // 允许属性前缀
"selector-pseudo-class-no-unknown": [
true, // 不允许未知的选择器
{
"ignorePseudoClasses": ["global", "v-deep", "deep"] // 忽略一些特定的伪类
}
]
}
}
