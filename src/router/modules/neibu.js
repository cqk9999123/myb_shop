export default {
  path: '/neibu',
  name: 'neibu',
  component: () => import('@/views/view'),
  meta: { title: '内部系统' },
  children: [
    {
      path: '/neibu/wuliao',
      name: 'neibuWuliao',
      component: () => import('@/views/view'),
      redirect: '/neibu/wuliao/list',
      meta: { title: '物料', activeMenu: '/neibu/wuliao', istop: true },
      children: [
        {
          path: '/neibu/wuliao/list',
          name: 'neibuWuliaoList',
          component: () => import('@/views/neibu/wuliao/list/index.vue'),
          meta: { title: '物料列表', activeMenu: '/neibu/wuliao' },
        },
        {
          path: '/neibu/wuliao/add',
          name: 'neibuWuliaoList',
          component: () => import('@/views/neibu/wuliao/add/index.vue'),
          meta: { title: '添加物料', activeMenu: '/neibu/wuliao' },
          hidden:true,
        },
        {
          path: '/neibu/wuliao/edit',
          name: 'neibuWuliaoList',
          component: () => import('@/views/neibu/wuliao/edit/index.vue'),
          meta: { title: '编辑物料', activeMenu: '/neibu/wuliao' },
          hidden:true,
        },
        {
          path: '/neibu/wuliaoName/list',
          name: 'neibuWuliaoNameList',
          component: () => import('@/views/neibu/wuliaoName/list/index.vue'),
          meta: { title: '物料名称', activeMenu: '/neibu/wuliao' },
        },
        {
          path: '/neibu/wuliaoName/add',
          name: 'neibuWuliaoNameList',
          component: () => import('@/views/neibu/wuliaoName/add/index.vue'),
          meta: { title: '添加物料', activeMenu: '/neibu/wuliao' },
          hidden:true,
        },
        {
          path: '/neibu/wuliaoName/edit',
          name: 'neibuWuliaoNameList',
          component: () => import('@/views/neibu/wuliaoName/edit/index.vue'),
          meta: { title: '编辑物料', activeMenu: '/neibu/wuliao' },
          hidden:true,
        },
        {
          path: '/neibu/wuliaoTree/list',
          name: 'neibuWuliaoTreeList',
          component: () => import('@/views/neibu/wuliaoTree/list/index.vue'),
          meta: { title: '物料名称(层级查询)', activeMenu: '/neibu/wuliao' },
        },
      ]
    }
  ]
}
