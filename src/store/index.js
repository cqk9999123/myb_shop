import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  modules: modules
});

export default store;
