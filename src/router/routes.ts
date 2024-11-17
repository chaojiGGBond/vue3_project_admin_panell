export const constantRoutes = [
  {
    path: '/login',
    //懒加载
    component: ()=>import('../views/login/index.vue'),
    name: 'login',

  },
  {
    path: '/',
    component: ()=>import('../views/home/index.vue'),
    name: 'home',
  },
  {
    path: '/404',
    component: ()=>import('../views/404/index.vue'),
    name: '404',
  },
  {
    //匹配不是上面三个路径的其他路径，重定向到404页面
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any'
  }
]
