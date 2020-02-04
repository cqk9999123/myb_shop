export default {
  path: '/setting',
  name: 'setting',
  component: () => import('@/views/view'),
  meta: { title: '权限设置' },
  children:[
    {
      path: '/setting/shopHost',
      name: 'settingShopHost',
      redirect:'/setting/shopHost/list',
      component: () => import('@/views/view'),
      meta: { title: '域名设置', activeMenu: '/setting/shopHost',istop:true},
      children:[
        {
          path: '/setting/shopHost/list',
          name: 'settingShopHostList',
          component: () => import('@/views/setting/shopHost/list/index.vue'),
          meta: { title: '域名设置',activeMenu: '/setting/shopHost' },
        },
      ]
    },
    {
      path: '/setting/shopUser',
      name: 'settingShopUser',
      redirect:'/setting/shopUser/list',
      component: () => import('@/views/view'),
      meta: { title: '管理员', activeMenu: '/setting/shopUser',istop:true},
      children:[
        {
          path: '/setting/shopUser/list',
          name: 'settingShopUserList',
          component: () => import('@/views/setting/shopUser/list/index.vue'),
          meta: { title: '管理员', activeMenu: '/setting/shopUser'},
        },
        {
          path: '/setting/shopUser/add',
          name: 'settingShopUserAdd',
          component: () => import('@/views/setting/shopUser/add/index.vue'),
          meta: { title: '添加管理员', activeMenu: '/setting/shopUser'},
          hidden:true,
        },
        {
          path: '/setting/shopUser/edit',
          name: 'settingShopUserEdit',
          component: () => import('@/views/setting/shopUser/edit/index.vue'),
          meta: { title: '编辑管理员', activeMenu: '/setting/shopUser'},
          hidden:true,
        },
      ]
    },
    {
      path: '/setting/log',
      name: 'settingLog',
      redirect:'/setting/log/shopUserLoginlog/list',
      component: () => import('@/views/view'),
      meta: { title: '查看日志', activeMenu: '/setting/log',istop:true},
      children:[
        {
          path: '/setting/log/shopUserLoginlog/list',
          name: 'settingLogShopUserLoginlogList',
          component: () => import('@/views/setting/log/shopUserLoginlog/list/index.vue'),
          meta: { title: '登陆日志',activeMenu: '/setting/log' },
        },
        // {
        //   path: '/setting/log/shopUserActionlog/list',
        //   name: 'settingLogShopUserActionlogList',
        //   component: () => import('@/views/setting/log/shopUserActionlog/list/index.vue'),
        //   meta: { title: '操作日志',activeMenu: '/setting/log' },
        // },
        // {
        //   path: '/setting/log/smsHistory/list',
        //   name: 'settingLogSmsHistoryList',
        //   component: () => import('@/views/setting/log/smsHistory/list/index.vue'),
        //   meta: { title: '短信日志',activeMenu: '/setting/log' },
        // },
      ]
    },

  ]
}
