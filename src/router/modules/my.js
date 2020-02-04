export default {
  path: '/my',
  name: 'my',
  component: () => import('@/views/view'),
  meta: { title: '后台管理' },
  children: [
    {
      path: '/my/shop',
      name: 'myShop',
      component: () => import('@/views/view'),
      redirect: '/my/shop/list',
      meta: { title: '网站', activeMenu: '/my/shop', istop: true },
      children: [
        {
          path: '/my/shop/list',
          name: 'myShopList',
          component: () => import('@/views/my/shop/list/index.vue'),
          meta: { title: '网站', activeMenu: '/my/shop' },
        },
        {
          path: '/my/shop/add',
          name: 'myShopListAdd',
          component: () => import('@/views/my/shop/add/index.vue'),
          meta: { title: '添加', activeMenu: '/my/shop'},
          hidden: true
        },
        {
          path: '/my/shopHost/add',
          name: 'myShopHostAdd',
          component: () => import('@/views/my/shopHost/add/index.vue'),
          meta: { title: '添加域名', activeMenu: '/my/shop'},
          hidden: true
        },
        {
          path: '/my/shop/detail',
          name: 'myShopListDetail',
          component: () => import('@/views/my/shop/detail/index.vue'),
          meta: { title: '详情', activeMenu: '/my/shop'},
          hidden: true
        },
      ]
    },
  ]
}
