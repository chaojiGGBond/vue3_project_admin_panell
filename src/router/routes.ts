export const constantRoutes = [
  {
    path: '/login',
    //懒加载
    component: () => import('../views/login/index.vue'),
    name: 'Login',
    meta: { title: 'Login', hidden: true , icon: ''},
  },
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    name: 'Layout',
    meta: { title: '', hidden: true ,icon: ''},
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/home/index.vue'),
        name: 'Home',
        meta: { title: 'Home', hidden: false , icon: 'HomeFilled'},
      },
    ]
  },
  {
    path: '/screen',
    component: () => import('../views/screen/index.vue'),
    name: 'Screen',
    meta: { title: 'Screen', hidden: false , icon: 'Platform' },
  },
  {
    path: '/acl',
    component: () => import('../layout/index.vue'),
    name: 'Acl',
    meta: { title: 'Acl', hidden: false , icon: 'Lock'},
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('../views/acl/user/index.vue'),
        name: 'User',
        meta: { title: 'User', hidden: false , icon: 'User' },
      },
      {
        path: '/acl/role',
        component: () => import('../views/acl/role/index.vue'),
        name: 'Role',
        meta: { title: 'Role', hidden: false , icon: 'UserFilled'},
      },
      {
        path: '/acl/permission',
        component: () => import('../views/acl/permission/index.vue'),
        name: 'Permission',
        meta: { title: 'Permission', hidden: false , icon: 'Monitor' },
      },
    ]
  },
  {
    path: '/product',
    component: () => import('../layout/index.vue'),
    name: 'Product',
    meta: { title: 'Product', hidden: false , icon: 'Goods' },
    redirect: '/product/attr',
    children: [
      {
        path: '/product/attr',
        component: () => import('../views/product/attr/index.vue'),
        name: 'Attr',
        meta: { title: 'Attr', hidden: false , icon: 'ShoppingCartFull' },
      },
      {
        path: '/product/sku',
        component: () => import('../views/product/sku/index.vue'),
        name: 'Sku',
        meta: { title: 'Sku', hidden: false, icon: 'Opportunity'}
      },
      {
        path: '/product/spu',
        component: () => import('../views/product/spu/index.vue'),
        name: 'Spu',
        meta: { title: 'Spu', hidden: false, icon: 'SwitchFilled'}
      },
      {
        path: '/product/trademark',
        component: () => import('../views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: { title: 'Trademark', hidden: false, icon: 'WindPower'}
      }
    ]
  },
  {
    path: '/404',
    component: () => import('../views/404/index.vue'),
    name: '404',
    meta: { title: '404', hidden: true, icon: ''},
  },
  {
    //匹配不是上面三个路径的其他路径，重定向到404页面
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: 'Any',
      hidden: true,
    },

  },
]
