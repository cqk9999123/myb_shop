export default {
  path: '/mall',
  name: 'mall',
  component: () => import('@/views/view'),
  meta: { title: '商城' },
  children:[
    {
      path: '/mall/goods',
      name: 'mallGoods',
      redirect:'/mall/goods/list',
      component: () => import('@/views/view'),
      meta: { title: '商品',activeMenu: '/mall/goods', istop:true},
      children:[
        {
          path: '/mall/goods/list',
          name: 'mallGoodsList',
          component: () => import('@/views/mall/goods/list/index.vue'),
          meta: { title: '商品', activeMenu: '/mall/goods' },
        },
        {
          path: '/mall/goodsCat/list',
          name: 'mallGoodsCatList',
          component: () => import('@/views/mall/goodsCat/list/index.vue'),
          meta: { title: '商品分类', activeMenu: '/mall/goods' },
        },
        {
          path: '/mall/goodsRec/list',
          name: 'mallGoodsRecList',
          component: () => import('@/views/mall/goodsRec/list/index.vue'),
          meta: { title: '推荐位', activeMenu: '/mall/goods' },
        },
        {
          path: '/mall/goodsRec/add',
          name: 'mallGoodsRecAdd',
          component: () => import('@/views/mall/goodsRec/add/index.vue'),
          meta: { title: '添加推荐位',activeMenu: '/mall/goods' },
          hidden:true,
        },
        {
          path: '/mall/goodsRec/edit',
          name: 'mallGoodsRecEdit',
          component: () => import('@/views/mall/goodsRec/edit/index.vue'),
          meta: { title: '修改推荐位',activeMenu: '/mall/goods' },
          hidden:true,
        },
        {
          path: '/mall/goodsBrand/list',
          name: 'mallGoodsBrandList',
          component: () => import('@/views/mall/goodsBrand/list/index.vue'),
          meta: { title: '品牌', activeMenu: '/mall/goods' },
        },
        {
          path: '/mall/goods/add',
          name: 'mallGoodsAdd',
          component: () => import('@/views/mall/goods/add/index.vue'),
          meta: { title: '添加商品',activeMenu: '/mall/goods' },
          hidden:true,
        },
        {
          path: '/mall/goods/edit',
          name: 'mallGoodsEdit',
          component: () => import('@/views/mall/goods/edit/index.vue'),
          meta: { title: '修改商品',activeMenu: '/mall/goods' },
          hidden:true,
        },
        {
          path: '/mall/goodsCat/add',
          name: 'mallGoodsCatAdd',
          component: () => import('@/views/mall/goodsCat/add/index.vue'),
          meta: { title: '添加分类',activeMenu: '/mall/goods' },
          hidden:true,
        },
        {
          path: '/mall/goodsCat/edit',
          name: 'mallGoodsCatEdit',
          component: () => import('@/views/mall/goodsCat/edit/index.vue'),
          meta: { title: '修改分类',activeMenu: '/mall/goods' },
          hidden:true,
        },
        {
          path: '/mall/goodsBrand/add',
          name: 'mallGoodsBrandAdd',
          component: () => import('@/views/mall/goodsBrand/add/index.vue'),
          meta: { title: '添加品牌',activeMenu: '/mall/goods' },
          hidden:true,
        },
        {
          path: '/mall/goodsBrand/edit',
          name: 'mallGoodsBrandEdit',
          component: () => import('@/views/mall/goodsBrand/edit/index.vue'),
          meta: { title: '修改品牌',activeMenu: '/mall/goods' },
          hidden:true,
        },
      ]
    },
    {
      path: '/mall/user',
      name: 'mallUser',
      redirect:'/mall/user/list',
      component: () => import('@/views/view'),
      meta: { title: '客户', activeMenu: '/mall/user',istop:true},
      children:[
        {
          path: '/mall/user/list',
          name: 'mallUserList',
          component: () => import('@/views/mall/user/list/index.vue'),
          meta: { title: '客户列表', activeMenu: '/mall/user' },
        },
        {
          path: '/mall/user/edit',
          name: 'mallUserEdit',
          component: () => import('@/views/mall/user/edit/index.vue'),
          meta: { title: '编辑客户', activeMenu: '/mall/user' },
          hidden:true
        },
        {
          path: '/mall/user/add',
          name: 'mallUserAdd',
          component: () => import('@/views/mall/user/add/index.vue'),
          meta: { title: '编辑客户', activeMenu: '/mall/user' },
          hidden:true
        },
        {
          path: '/mall/user/detail',
          name: 'mallUserDetail',
          component: () => import('@/views/mall/user/detail/index.vue'),
          meta: { title: '客户详情', activeMenu: '/mall/user' },
          hidden:true
        }
      ]
    },
    {
      path: '/mall/orders',
      name: 'mallOrders',
      component: () => import('@/views/view'),
      redirect:'/mall/orders/list',
      meta: { title: '订单', activeMenu: '/mall/orders', istop:true},
      children:[
        {
          path: '/mall/orders/list',
          name: 'mallOrdersList',
          component: () => import('@/views/mall/orders/list/index.vue'),
          meta: { title: '订单管理', activeMenu: '/mall/orders' },
        },
        {
          path: '/mall/orders/detail',
          name: 'mallOrdersDetail',
          component: () => import('@/views/mall/orders/detail/index.vue'),
          meta: { title: '订单详情', activeMenu: '/mall/orders' },
          hidden:true
        },
        {
          path: '/mall/ordersAfter/list',
          name: 'mallOrdersAfterList',
          component: () => import('@/views/mall/ordersAfter/list/index.vue'),
          meta: { title: '售后管理', activeMenu: '/mall/orders' },
        },
        {
          path: '/mall/goodsEvaluate/list',
          name: 'mallGoodsEvaluate',
          component: () => import('@/views/mall/goodsEvaluate/list/index.vue'),
          meta: { title: '评价管理', activeMenu: '/mall/orders' },
        }
      ]
    },

      {
        path: '/mall/nav',
        name: 'mallNav',
        component: () => import('@/views/view'),
        redirect: '/mall/nav/list',
        meta: { title: '导航', activeMenu: '/mall/nav', istop: true },
        children: [
          {
            path: '/mall/nav/list',
            name: 'mallNavList',
            component: () => import('@/views/mall/nav/list/index.vue'),
            meta: { title: '导航列表', activeMenu: '/mall/nav' },
          },
          {
            path: '/mall/nav/edit',
            name: 'mallNavEdit',
            component: () => import('@/views/mall/nav/edit/index.vue'),
            meta: { title: '编辑导航', activeMenu: '/mall/nav' },
            hidden: true
          },
          {
            path: '/mall/nav/add',
            name: 'mallNavAdd',
            component: () => import('@/views/mall/nav/add/index.vue'),
            meta: { title: '添加导航', activeMenu: '/mall/nav' },
            hidden: true
          },
          {
            path: '/mall/navCat/list',
            name: 'mallNavCatList',
            component: () => import('@/views/mall/navCat/list/index.vue'),
            meta: { title: '导航分类', activeMenu: '/mall/nav' },
          },
          {
            path: '/mall/navCat/add',
            name: 'mallNavCatAdd',
            component: () => import('@/views/mall/navCat/add/index.vue'),
            meta: { title: '添加导航分类', activeMenu: '/mall/nav' },
            hidden: true
          },
          {
            path: '/mall/navCat/edit',
            name: 'mallNavCatEdit',
            component: () => import('@/views/mall/navCat/edit/index.vue'),
            meta: { title: '编辑导航分类', activeMenu: '/mall/nav' },
            hidden: true
          }
        ]
      },

      {
        path: '/mall/slide',
        name: 'mallSlide',
        component: () => import('@/views/view'),
        redirect: '/mall/slide/list',
        meta: { title: '幻灯', activeMenu: '/mall/slide', istop: true },
        children: [
          {
            path: '/mall/slide/list',
            name: 'mallSlideList',
            component: () => import('@/views/mall/slide/list/index.vue'),
            meta: { title: '幻灯列表', activeMenu: '/mall/slide' },
          },
          {
            path: '/mall/slide/edit',
            name: 'mallSlideEdit',
            component: () => import('@/views/mall/slide/edit/index.vue'),
            meta: { title: '编辑幻灯', activeMenu: '/mall/slide' },
            hidden: true
          },
          {
            path: '/mall/slide/add',
            name: 'mallSlideAdd',
            component: () => import('@/views/mall/slide/add/index.vue'),
            meta: { title: '添加幻灯', activeMenu: '/mall/slide' },
            hidden: true
          },
          {
            path: '/mall/slideCat/list',
            name: 'mallSlideCatList',
            component: () => import('@/views/mall/slideCat/list/index.vue'),
            meta: { title: '幻灯分类', activeMenu: '/mall/slide' },
          },
          {
            path: '/mall/slideCat/add',
            name: 'mallSlideCatAdd',
            component: () => import('@/views/mall/slideCat/add/index.vue'),
            meta: { title: '添加幻灯分类', activeMenu: '/mall/slide' },
            hidden: true
          },
          {
            path: '/mall/slideCat/edit',
            name: 'mallSlideCatEdit',
            component: () => import('@/views/mall/slideCat/edit/index.vue'),
            meta: { title: '编辑幻灯分类', activeMenu: '/mall/slide' },
            hidden: true
          }
        ]
      },
      {
        path: '/mall/pages',
        name: 'mallPages',
        redirect: '/mall/pages/list',
        component: () => import('@/views/view'),
        meta: { title: '单页', activeMenu: '/mall/pages',istop: true },
        children: [
          {
            path: '/mall/pages/list',
            name: 'mallPagesList',
            component: () => import('@/views/mall/pages/list/index.vue'),
            meta: { title: '单页列表', activeMenu: '/mall/pages' },
          },
          {
            path: '/mall/pages/edit',
            name: 'mallPagesEdit',
            component: () => import('@/views/mall/pages/edit/index.vue'),
            meta: { title: '编辑单页', activeMenu: '/mall/pages' },
            hidden: true
          },
          {
            path: '/mall/pages/add',
            name: 'mallPagesAdd',
            component: () => import('@/views/mall/pages/add/index.vue'),
            meta: { title: '添加单页', activeMenu: '/mall/pages' },
            hidden: true
          }
        ]
      },
    {
      path: '/mall/goodsSpecCat',
      name: 'mallGoodsSpecCat',
      redirect:'/mall/goodsSpecCat/list',
      component: () => import('@/views/view'),
      meta: { title: '商城设置',activeMenu: '/mall/goodsSpecCat', istop:true},
      children:[
        {
          path: '/mall/goodsSpecCat/list',
          name: 'mallGoodsList',
          component: () => import('@/views/mall/goodsSpecCat/list/index.vue'),
          meta: { title: '属性设置', activeMenu: '/mall/goodsSpecCat' },
        },
        {
          path: '/mall/goodsSpecCat/add',
          name: 'mallGoodsSpecCatAdd',
          component: () => import('@/views/mall/goodsSpecCat/add/index.vue'),
          meta: { title: '添加属性类别',activeMenu: '/mall/goodsSpecCat' },
          hidden:true,
        },
        {
          path: '/mall/goodsSpecCat/edit',
          name: 'mallGoodsSpecCatEdit',
          component: () => import('@/views/mall/goodsSpecCat/edit/index.vue'),
          meta: { title: '编辑属性类别',activeMenu: '/mall/goodsSpecCat' },
          hidden:true,
        },
        {
          path: '/mall/express',
          name: 'mallExpressList',
          component: () => import('@/views/mall/express/list/index.vue'),
          meta: { title: '物流公司',activeMenu: '/mall/goodsSpecCat' },
        },
        {
          path: '/mall/express/add',
          name: 'mallExpressAdd',
          component: () => import('@/views/mall/express/add/index.vue'),
          meta: { title: '添加物流公司',activeMenu: '/mall/goodsSpecCat' },
          hidden:true,
        },
        {
          path: '/mall/express/edit',
          name: 'mallExpressEdit',
          component: () => import('@/views/mall/express/edit/index.vue'),
          meta: { title: '编辑物流公司',activeMenu: '/mall/goodsSpecCat' },
          hidden:true,
        }
      ]
    },
  ]
}
