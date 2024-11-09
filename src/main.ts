import { createApp } from 'vue'
import App from './App.vue'
//引入插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//svg需要的配置代码
import 'virtual:svg-icons-register'
//引入实现自动全局组件的自定义插件
import globalComponent from './components/index.ts'
//导入全局样式
import './styles/index.scss'
//获取实例对象
const app = createApp(App)
//安装element-plus
//国际化配置
app.use(ElementPlus, {
  locale: zhCn,
})
//使用自定义插件
app.use(globalComponent)
//将实例挂载到挂载点
app.mount('#app')
