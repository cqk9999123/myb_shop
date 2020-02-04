import Vue from 'vue'
import Router from 'vue-router'
import {deepClone} from '../utils/index';


import {session} from '@/utils'
import Layout from '@/layout'
import home from './modules/home'
import files from './modules/files'
import editPassword from './modules/editPassword'
import site from './modules/site'
import web from './modules/web'
import mall from './modules/mall'
import gzh from './modules/gzh'
import bangong from './modules/bangong'
//import neibu from './modules/neibu'
import my from './modules/my'
import setting from './modules/setting'

Vue.use(Router)


//供应商后台
const shop = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      site,
      home,
      files,
      web,
      editPassword,
      mall,
      gzh,
      bangong,
      //neibu,
      setting,
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/home',
    hidden: true
  }
]
//管理后台
const admin = deepClone(shop);
admin[0]['children'].push(my)
function getAuth(){
  let reset = [];
  let roles = 'shop';
  let shopInfo = session.get('shop');
  if(shopInfo && shopInfo.base_info.id==1){
    roles = 'admin';
  }
  console.log(roles);
  switch(roles){
    case 'admin':
        reset = admin;
        break;
    default:
        reset = shop;
  }
  return reset
}
const createRouter = () => new Router({
  //mode: 'history',
  mode: 'hash',
  base: '/a',
  scrollBehavior: () => ({ y: 0 }),
  routes: getAuth()
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  router.options.routes[0].children = getAuth()[0].children
}
export default router
