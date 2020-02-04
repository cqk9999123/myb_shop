export default {
  path: '/business',
  name: 'business',
  component: () => import('@/views/view'),
  meta: { title: '服务商' },
  children:[
    {
      path: '/business/localProjectPrice',
      name: 'businessLocalProjectPrice',
      component: () => import('@/views/view'),
      redirect: '/business/localProjectPrice/list',
      meta: { title: '服务商', activeMenu: '/business/localProjectPrice', istop: true },
      children: [
        {
          path: '/business/localProjectPrice/list',
          name: 'businessLocalProjectPriceList',
          component: () => import('@/views/business/localProjectPrice/list/index.vue'),
          meta: { title: '服务商', activeMenu: '/business/localProjectPrice' },
        },
        {
          path: '/business/myLocalCollect/list',
          name: 'businessMyLocalCollectList',
          component: () => import('@/views/business/myLocalCollect/list/index.vue'),
          meta: { title: '我的收藏', activeMenu: '/business/localProjectPrice' },
        },
      ]
    },
    {
      path: '/business/myProjectPrice',
      name: 'businessMy',
      component: () => import('@/views/view'),
      redirect: '/business/myProjectPrice/list',
      meta: { title: '我的服务', activeMenu: '/business/myProjectPrice', istop: true },
      children: [
        {
          path: '/business/myProjectPrice/list',
          name: 'businessMyList',
          component: () => import('@/views/business/myProjectPrice/list/index.vue'),
          meta: { title: '我的服务', activeMenu: '/business/myProjectPrice' },
        },
        {
          path: '/business/myProjectPrice/add',
          name: 'businessMyProjectPriceAdd',
          component: () => import('@/views/business/myProjectPrice/add/index.vue'),
          meta: { title: '添加服务', activeMenu: '/business/myProjectPrice' },
          hidden:true
        },
        {
          path: '/business/myProjectPrice/edit',
          name: 'businessMyProjectPriceEdit',
          component: () => import('@/views/business/myProjectPrice/edit/index.vue'),
          meta: { title: '添加服务', activeMenu: '/business/myProjectPrice' },
          hidden:true
        },
        {
          path: '/business/myProjectPrice/set',
          name: 'businessMySet',
          component: () => import('@/views/business/myProjectPrice/set/index.vue'),
          meta: { title: '设置接单', activeMenu: '/business/myProjectPrice' },
        }
      ]
    }
  ]
}
