import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
  plugins: [
    vue(),
    // 配置 SVG 图标插件
    createSvgIconsPlugin({
      // 指定 SVG 图标的存放目录（你可以根据项目结构修改路径）
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 给每个图标定义一个标识符，默认情况下图标的 ID 为 'icon-[name]'
      symbolId: 'icon-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
})
