import Vue from 'vue';
import config from './utils/config';
Vue.prototype.myConfig = config;

import App from './App.vue';
import './plugins/element.js';
import 'stylus/app.styl';
import router from './router/index';
import store from './store';
import * as utils from './utils/index';
import { Base } from './utils/base.js';
import {Request} from './utils/request.js';
let base = new Base();
let rq = new Request();
Vue.prototype.base = base;
Vue.prototype.utils = utils;
Vue.prototype.request = rq.request;
Vue.prototype.utils = utils;
Vue.config.productionTip = false

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

// console.log(router);
// 全局守卫
router.beforeEach((to, from, next) => {
  let token = utils.session.get('token');
  if (!token && to.path!='/login') {
    return next("/login");
  }
  return next();
});




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
