import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes.ts'

let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  //当用户导航到新页面时，滚动条会自动回到页面的顶部（top: 0）和最左边（left: 0）
  scrollBehavior: () => {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
