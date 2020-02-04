export default {
  path: '/bangong',
  name: 'bangong',
  component: () => import('@/views/view'),
  meta: { title: '办公系统' },
  children: [
    {
      path: '/bangong/oa',
      name: 'bangongOa',
      component: () => import('@/views/view'),
      redirect: '/bangong/oa/worker/list',
      meta: { title: 'OA办公系统', activeMenu: '/bangong/oa', istop: true},
      children: [
        {
          path: '/bangong/oa/worker/list',
          name: 'bangongOaWorkerList',
          component: () => import('@/views/bangong/oa/worker/list/index.vue'),
          meta: { title: '员工管理', activeMenu: '/bangong/oa'  },
        },
        {
          path: '/bangong/oa/worker/add',
          name: 'bangongOaWorkerAdd',
          component: () => import('@/views/bangong/oa/worker/add/index.vue'),
          meta: { title: '添加员工', activeMenu: '/bangong/oa' },
          hidden:true,
        },
        {
          path: '/bangong/oa/worker/edit',
          name: 'bangongOaWorkerEdit',
          component: () => import('@/views/bangong/oa/worker/edit/index.vue'),
          meta: { title: '编辑员工', activeMenu: '/bangong/oa' },
          hidden:true,
        },
        {
          path: '/bangong/oa',
          name: 'bangonOaLiushui',
          component: () => import('@/views/view'),
          redirect: '/bangong/oa/liushui/list',
          meta: { title: '流水账', activeMenu: '/bangong/oa', istop: true },
          children: [
            {
              path: '/bangong/oa/liushui/list',
              name: 'bangonOaLiushuiList',
              component: () => import('@/views/bangong/oa/liushui/list/index.vue'),
              meta: { title: '流水账列表', activeMenu: '/bangong/oa' },
            },
            {
              path: '/bangong/oa/liushui/add',
              name: 'bangonOaLiushuiAdd',
              component: () => import('@/views/bangong/oa/liushui/add/index.vue'),
              meta: { title: '添加流水账', activeMenu: '/bangong/oa' },
              hidden: true,
            },
            {
              path: '/bangong/oa/liushui/edit',
              name: 'bangonOaLiushuiEdit',
              component: () => import('@/views/bangong/oa/liushui/edit/index.vue'),
              meta: { title: '修改流水账', activeMenu: '/bangong/oa' },
              hidden: true,
            },
            {
              path: '/bangong/oa/liushuiCat/list',
              name: 'bangonOaLiushuiCatList',
              component: () => import('@/views/bangong/oa/liushuiCat/list/index.vue'),
              meta: { title: '设置科目', activeMenu: '/bangong/oa' },
            },
            {
              path: '/bangong/oa/liushuiCat/add',
              name: 'bangonOaLiushuiCatAdd',
              component: () => import('@/views/bangong/oa/liushuiCat/add/index.vue'),
              meta: { title: '添加科目', activeMenu: '/bangong/oa' },
              hidden: true,
            },
            {
              path: '/bangong/oa/liushuiCat/edit',
              name: 'bangonOaLiushuiCatEdit',
              component: () => import('@/views/bangong/oa/liushuiCat/edit/index.vue'),
              meta: { title: '修改科目', activeMenu: '/bangong/oa' },
              hidden: true,
            },
          ]
        },
        {
          path: '/bangong/oa/wuliao',
          name: 'bangonOaWuliao',
          component: () => import('@/views/view'),
          redirect: '/bangong/oa/wuliaoActionLog',
          meta: { title: '物料', activeMenu: '/bangong/oa/wuliao', istop: true },
          children: [
            {
              path: '/bangong/oa/wuliaoActionLog',
              name: 'bangonOaWuliaoActionLog',
              component: () => import('@/views/bangong/oa/wuliaoActionLog/index.vue'),
              meta: { title: '概况', activeMenu: '/bangong/oa/wuliao' },
            },
            {
              path: '/bangong/oa/wuliao/list',
              name: 'bangonOaWuliaoList',
              component: () => import('@/views/bangong/oa/wuliao/list/index.vue'),
              meta: { title: '物料库', activeMenu: '/bangong/oa/wuliao' },
            },
            {
              path: '/bangong/oa/wuliao/add',
              name: 'bangonOaWuliaoAdd',
              component: () => import('@/views/bangong/oa/wuliao/add/index.vue'),
              meta: { title: '添加物料', activeMenu: '/bangong/oa/wuliao' },
              hidden: true,
            },
            {
              path: '/bangong/oa/wuliao/edit',
              name: 'bangonOaWuliaoEdit',
              component: () => import('@/views/bangong/oa/wuliao/edit/index.vue'),
              meta: { title: '修改物料', activeMenu: '/bangong/oa/wuliao' },
              hidden: true,
            },
            {
              path: '/bangong/oa/wuliaoIn',
              name: 'bangonOaWuliaoIn',
              component: () => import('@/views/bangong/oa/wuliaoIn/index.vue'),
              meta: { title: '入库', activeMenu: '/bangong/oa/wuliao' },
              hidden: true,
            },
            {
              path: '/bangong/oa/wuliaoOut',
              name: 'bangonOaWuliaoOut',
              component: () => import('@/views/bangong/oa/wuliaoOut/index.vue'),
              meta: { title: '领用', activeMenu: '/bangong/oa/wuliao' },
              hidden: true,
            },
            {
              path: '/bangong/oa/wuliaoLoss',
              name: 'bangonOaWuliaoLoss',
              component: () => import('@/views/bangong/oa/wuliaoLoss/index.vue'),
              meta: { title: '损耗', activeMenu: '/bangong/oa/wuliao' },
              hidden: true,
            },
            {
              path: '/bangong/oa/wuliao/detail',
              name: 'bangonOaWuliaoDetail',
              component: () => import('@/views/bangong/oa/wuliao/detail/index.vue'),
              meta: { title: '物料详情', activeMenu: '/bangong/oa/wuliao' },
              hidden: true
            }
          ]
        },
      ]
    }
  ]
}
