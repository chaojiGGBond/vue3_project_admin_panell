import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
import pinia from './store'
import useUserStore from './store/modules/user.ts'
import setting from './setting.ts'

let userStore = useUserStore(pinia)

router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title} -> ${to.meta.title}`
  nprogress.start()
  let token = userStore.token
  let username = userStore.username
  if (token) {
    // 如果已经登录并且尝试访问登录页，跳转到主页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next() // 允许访问其他页面
      } else {
        try {
          await userStore.userInfo()
          next()
        } catch (e) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 如果没有 token 且尝试访问非登录页，重定向到登录页
    if (to.path !== '/login') {
      next({ path: '/login', query: { redirect: to.path } })
    } else {
      next() // 如果已经在登录页面，则继续
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})
