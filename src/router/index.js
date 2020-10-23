import Vue from 'vue';
import VueRouter from 'vue-router';
import TabRoutes from './module/tab';

Vue.use(VueRouter);

export default new VueRouter({
  mode: '',
  routes: TabRoutes,
});
