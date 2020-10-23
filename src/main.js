import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import Antd from 'ant-design-vue';

// import axios from './http/interceptors';

import 'ant-design-vue/dist/antd.css';
import './style/reset.css';
import './style/index.scss';
import './style/index.css';

import { Button } from 'ant-design-vue';

// Vue.use(Antd);

Vue.use(Button);

Vue.config.productionTip = false;
// Vue.prototype.$http = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
