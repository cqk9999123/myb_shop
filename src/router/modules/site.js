export default {
  path: '/site',
  name: 'site',
  component: () => import('@/views/view'),
  redirect: '/site/introduce',
  meta: { title: '客户端',activeMenu: '/site', istop: true },
  children: [
    {
      path: '/site/introduce',
      name: 'siteIntroduce',
      component: () => import('@/views/site/introduce/index.vue'),
      meta: { title: '介绍', activeMenu: '/site', istop: true },
    },
    {
      path: '/site/website',
      name: 'siteWebsite',
      component: () => import('@/views/site/website/index.vue'),
      meta: { title: '电脑官网', activeMenu: '/site', istop: true },
    },
    {
      path: '/site/website/detail',
      name: 'siteWebsiteDetail',
      component: () => import('@/views/site/website/detail.vue'),
      meta: { title: '编辑模板', activeMenu: '/site' },
      hidden: true
    },
    {
      path: '/site/pcShop',
      name: 'sitePcShop',
      component: () => import('@/views/site/pcShop/index.vue'),
      meta: { title: '电脑商城', activeMenu: '/site', istop: true },
    },
    {
      path: '/site/mShop',
      name: 'siteMShop',
      component: () => import('@/views/site/mShop/index.vue'),
      meta: { title: '手机商城(公众号商城)', activeMenu: '/site', istop: true },
    },
    {
      path: '/site/xcx',
      name: 'siteXcx',
      component: () => import('@/views/site/xcx/index.vue'),
      meta: { title: '小程序商城', activeMenu: '/site', istop: true },
    },
  ]
}
