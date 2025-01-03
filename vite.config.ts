import { defineConfig, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  //添加环境变量，根据不同环境切换
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      // 配置 SVG 图标插件
      createSvgIconsPlugin({
        // 指定 SVG 图标的存放目录（你可以根据项目结构修改路径）
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 给每个图标定义一个标识符，默认情况下图标的 ID 为 'icon-[name]'
        symbolId: 'icon-[name]',
      }),
      // 配置 Mock 插件
      viteMockServe({
        localEnabled: command === 'serve', // 只在开发模式下启用 Mock
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 相对路径别名配置，使用 @ 代替 src
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
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //目标地址
          target: 'http://sph-api.atguigu.cn',
          //是否开启跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
