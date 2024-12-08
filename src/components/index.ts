import SvgIcon from './Svgicon/index.vue'
const allGlobalComponents = { SvgIcon }
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
  //当在main.ts里使用app.use(globalComponent)时，会自动调用对应ts代码里的install方法
  install(app) {
    //Object.keys({})可以获取所有对象的键，并通过循环将所有组件注册为全局组件
    Object.keys(allGlobalComponents).forEach((componentName) => {
      app.component(componentName, allGlobalComponents[componentName])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
