export default {
  path: '/gzh',
  name: 'gzh',
  component: () => import('@/views/view'),
  meta: { title: '微信公众号' },
  children: [
    {
      path: '/gzh/keyword',
      name: 'gzhKeyword',
      component: () => import('@/views/view'),
      redirect: '/gzh/goods/list',
      meta: { title: '关键词回复', activeMenu: '/gzh/keyword', istop: true },
      children: [
        {
          path: '/gzh/goods/list',
          name: 'gzhGoodsList',
          component: () => import('@/views/gzh/goods/list/index.vue'),
          meta: { title: '产品回复', activeMenu: '/gzh/keyword' },
        },
        {
          path: '/gzh/text/add',
          name: 'gzhTextList',
          component: () => import('@/views/gzh/text/list/index.vue'),
          meta: { title: '文本回复', activeMenu: '/gzh/keyword' },
        },
      ]
    },
    {
      path: '/gzh/menue',
      name: 'gzhMenue',
      component: () => import('@/views/view'),
      redirect: '/gzh/menue/list',
      meta: { title: '菜单管理', activeMenu: '/gzh/menue', istop: true },
      children: [
        {
          path: '/gzh/menue/list',
          name: 'gzhGoodsList',
          component: () => import('@/views/gzh/menue/list/index.vue'),
          meta: { title: '菜单管理', activeMenu: '/gzh/menue' },
        },
      ]
    },
  ]
}
