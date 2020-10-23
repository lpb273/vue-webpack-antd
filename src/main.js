import Vue from 'vue';
import App from './App.vue';
import router from './router';

// import axios from './http/interceptors';

import './style/reset.css';
import './style/index.scss';
import './style/index.css';

import add from '@/utils/index';

add();

Vue.config.productionTip = false;
// Vue.prototype.$http = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
