export default {
  path: '/web',
  name: 'web',
  component: () => import('@/views/view'),
  meta: { title: '官网' },
  children: [
    {
      path: '/web/article',
      name: 'webArticle',
      component: () => import('@/views/view'),
      redirect: '/web/article/list',
      meta: { title: '文章', activeMenu: '/web/article', istop: true },
      children: [
        {
          path: '/web/article/list',
          name: 'webArticleList',
          component: () => import('@/views/web/article/list/index.vue'),
          meta: { title: '文章列表', activeMenu: '/web/article' },
        },
        {
          path: '/web/article/add',
          name: 'webArticleAdd',
          component: () => import('@/views/web/article/add/index.vue'),
          meta: { title: '添加文章', activeMenu: '/web/article' },
          hidden: true
        },
        {
          path: '/web/article/edit',
          name: 'webArticleEdit',
          component: () => import('@/views/web/article/edit/index.vue'),
          meta: { title: '编辑文章', activeMenu: '/web/article' },
          hidden: true
        },
        {
          path: '/web/articleCat/list',
          name: 'webArticleCat',
          component: () => import('@/views/web/articleCat/list/index.vue'),
          meta: { title: '文章分类', activeMenu: '/web/article' },
        },
        {
          path: '/web/articleCat/add',
          name: 'webArticleCatAdd',
          component: () => import('@/views/web/articleCat/add/index.vue'),
          meta: { title: '添加文章分类', activeMenu: '/web/article' },
          hidden: true
        },
        {
          path: '/web/articleCat/edit',
          name: 'webArticleCatEdit',
          component: () => import('@/views/web/articleCat/edit/index.vue'),
          meta: { title: '修改文章分类', activeMenu: '/web/article' },
          hidden: true
        },
        {
          path: '/web/articleRec/list',
          name: 'webArticleRecList',
          component: () => import('@/views/web/articleRec/list/index.vue'),
          meta: { title: '推荐位', activeMenu: '/web/article' },
        },
        {
          path: '/web/articleRec/add',
          name: 'webArticleRecAdd',
          component: () => import('@/views/web/articleRec/add/index.vue'),
          meta: { title: '添加推荐位',activeMenu: '/web/article' },
          hidden:true,
        },
        {
          path: '/web/articleRec/edit',
          name: 'webArticleRecEdit',
          component: () => import('@/views/web/articleRec/edit/index.vue'),
          meta: { title: '修改推荐位',activeMenu: '/web/article' },
          hidden:true,
        },
      ]
    },
    {
      path: '/web/product',
      name: 'webProduct',
      component: () => import('@/views/view'),
      redirect: '/web/product/list',
      meta: { title: '产品', activeMenu: '/web/product', istop: true },
      children: [
        {
          path: '/web/product/list',
          name: 'webProductList',
          component: () => import('@/views/web/product/list/index.vue'),
          meta: { title: '产品列表', activeMenu: '/web/product' },
        },
        {
          path: '/web/product/add',
          name: 'webProductAdd',
          component: () => import('@/views/web/product/add/index.vue'),
          meta: { title: '添加产品', activeMenu: '/web/product' },
          hidden: true
        },
        {
          path: '/web/product/edit',
          name: 'webProductEdit',
          component: () => import('@/views/web/product/edit/index.vue'),
          meta: { title: '编辑产品', activeMenu: '/web/product' },
          hidden: true
        },
        {
          path: '/web/productCat/list',
          name: 'webProductCat',
          component: () => import('@/views/web/productCat/list/index.vue'),
          meta: { title: '产品分类', activeMenu: '/web/product' },
        },
        {
          path: '/web/productCat/add',
          name: 'webProductCatAdd',
          component: () => import('@/views/web/productCat/add/index.vue'),
          meta: { title: '添加产品分类', activeMenu: '/web/product' },
          hidden: true
        },
        {
          path: '/web/productCat/edit',
          name: 'webProductCatEdit',
          component: () => import('@/views/web/productCat/edit/index.vue'),
          meta: { title: '修改产品分类', activeMenu: '/web/product' },
          hidden: true
        },
        {
          path: '/web/productRec/list',
          name: 'webProductRecList',
          component: () => import('@/views/web/productRec/list/index.vue'),
          meta: { title: '推荐位', activeMenu: '/web/product' },
        },
        {
          path: '/web/productRec/add',
          name: 'webProductRecAdd',
          component: () => import('@/views/web/productRec/add/index.vue'),
          meta: { title: '添加推荐位',activeMenu: '/web/product' },
          hidden:true,
        },
        {
          path: '/web/productRec/edit',
          name: 'webProductRecEdit',
          component: () => import('@/views/web/productRec/edit/index.vue'),
          meta: { title: '修改推荐位',activeMenu: '/web/product' },
          hidden:true,
        },
      ]
    },
    {
      path: '/web/nav',
      name: 'webNav',
      component: () => import('@/views/view'),
      redirect: '/web/nav/list',
      meta: { title: '导航', activeMenu: '/web/nav', istop: true },
      children: [
        {
          path: '/web/nav/list',
          name: 'webNavList',
          component: () => import('@/views/web/nav/list/index.vue'),
          meta: { title: '导航列表', activeMenu: '/web/nav' },
        },
        {
          path: '/web/nav/edit',
          name: 'webNavEdit',
          component: () => import('@/views/web/nav/edit/index.vue'),
          meta: { title: '编辑导航', activeMenu: '/web/nav' },
          hidden: true
        },
        {
          path: '/web/nav/add',
          name: 'webNavAdd',
          component: () => import('@/views/web/nav/add/index.vue'),
          meta: { title: '添加导航', activeMenu: '/web/nav' },
          hidden: true
        },
        {
          path: '/web/navCat/list',
          name: 'webNavCatList',
          component: () => import('@/views/web/navCat/list/index.vue'),
          meta: { title: '导航分类', activeMenu: '/web/nav' },
        },
        {
          path: '/web/navCat/add',
          name: 'webNavCatAdd',
          component: () => import('@/views/web/navCat/add/index.vue'),
          meta: { title: '添加导航分类', activeMenu: '/web/nav' },
          hidden: true
        },
        {
          path: '/web/navCat/edit',
          name: 'webNavCatEdit',
          component: () => import('@/views/web/navCat/edit/index.vue'),
          meta: { title: '编辑导航分类', activeMenu: '/web/nav' },
          hidden: true
        }
      ]
    },

    {
      path: '/web/slide',
      name: 'webSlide',
      component: () => import('@/views/view'),
      redirect: '/web/slide/list',
      meta: { title: '幻灯', activeMenu: '/web/slide', istop: true },
      children: [
        {
          path: '/web/slide/list',
          name: 'webSlideList',
          component: () => import('@/views/web/slide/list/index.vue'),
          meta: { title: '幻灯列表', activeMenu: '/web/slide' },
        },
        {
          path: '/web/slide/edit',
          name: 'webSlideEdit',
          component: () => import('@/views/web/slide/edit/index.vue'),
          meta: { title: '编辑幻灯', activeMenu: '/web/slide' },
          hidden: true
        },
        {
          path: '/web/slide/add',
          name: 'webSlideAdd',
          component: () => import('@/views/web/slide/add/index.vue'),
          meta: { title: '添加幻灯', activeMenu: '/web/slide' },
          hidden: true
        },
        {
          path: '/web/slideCat/list',
          name: 'webSlideCatList',
          component: () => import('@/views/web/slideCat/list/index.vue'),
          meta: { title: '幻灯分类', activeMenu: '/web/slide' },
        },
        {
          path: '/web/slideCat/add',
          name: 'webSlideCatAdd',
          component: () => import('@/views/web/slideCat/add/index.vue'),
          meta: { title: '添加幻灯分类', activeMenu: '/web/slide' },
          hidden: true
        },
        {
          path: '/web/slideCat/edit',
          name: 'webSlideCatEdit',
          component: () => import('@/views/web/slideCat/edit/index.vue'),
          meta: { title: '编辑幻灯分类', activeMenu: '/web/slide' },
          hidden: true
        }
      ]
    },
    {
      path: '/web/pages',
      name: 'webPages',
      redirect: '/web/pages/list',
      component: () => import('@/views/view'),
      meta: { title: '单页', activeMenu: '/web/pages',istop: true },
      children: [
        {
          path: '/web/pages/list',
          name: 'webPagesList',
          component: () => import('@/views/web/pages/list/index.vue'),
          meta: { title: '单页列表', activeMenu: '/web/pages' },
        },
        {
          path: '/web/pages/edit',
          name: 'webPagesEdit',
          component: () => import('@/views/web/pages/edit/index.vue'),
          meta: { title: '编辑单页', activeMenu: '/web/pages' },
          hidden: true
        },
        {
          path: '/web/pages/add',
          name: 'webPagesAdd',
          component: () => import('@/views/web/pages/add/index.vue'),
          meta: { title: '添加单页', activeMenu: '/web/pages' },
          hidden: true
        }
      ]
    },
    {
      path: '/web/patch',
      name: 'webPatch',
      redirect: '/web/patch/list',
      component: () => import('@/views/view'),
      meta: { title: '碎片', activeMenu: '/web/patch',istop: true },
      children: [
        {
          path: '/web/patch/list',
          name: 'webPatchList',
          component: () => import('@/views/web/patch/list/index.vue'),
          meta: { title: '碎片列表', activeMenu: '/web/patch' },
        },
        {
          path: '/web/patch/edit',
          name: 'webPatchEdit',
          component: () => import('@/views/web/patch/edit/index.vue'),
          meta: { title: '编辑碎片', activeMenu: '/web/patch' },
          hidden: true
        },
        {
          path: '/web/patch/add',
          name: 'webPatchAdd',
          component: () => import('@/views/web/patch/add/index.vue'),
          meta: { title: '添加碎片', activeMenu: '/web/patch' },
          hidden: true
        }
      ]
    },
    {
      path: '/web/message',
      name: 'webMessage',
      redirect: '/web/message/list',
      component: () => import('@/views/view'),
      meta: { title: '留言', activeMenu: '/web/message',istop: true },
      children: [
        {
          path: '/web/message/list',
          name: 'webMessageList',
          component: () => import('@/views/web/message/list/index.vue'),
          meta: { title: '留言列表', activeMenu: '/web/message' },
        },
        {
          path: '/web/message/edit',
          name: 'webMessageEdit',
          component: () => import('@/views/web/message/edit/index.vue'),
          meta: { title: '编辑留言', activeMenu: '/web/message' },
          hidden: true
        },
        {
          path: '/web/message/add',
          name: 'webMessageAdd',
          component: () => import('@/views/web/message/add/index.vue'),
          meta: { title: '添加留言', activeMenu: '/web/message' },
          hidden: true
        }
      ]
    },
    {
      path: '/web/setting',
      name: 'webSetting',
      redirect: '/web/setting/base',
      component: () => import('@/views/view'),
      meta: { title: '网站设置', activeMenu: '/web/setting',istop: true },
      children: [
        {
          path: '/web/setting/base',
          name: 'webSettingBase',
          component: () => import('@/views/web/setting/base.vue'),
          meta: { title: '基本设置', activeMenu: '/web/setting' },
        },
        {
          path: '/web/setting/contact',
          name: 'webSettingContact',
          component: () => import('@/views/web/setting/contact.vue'),
          meta: { title: '联系方式', activeMenu: '/web/setting' },
        },
      ]
    }
  ]
}
