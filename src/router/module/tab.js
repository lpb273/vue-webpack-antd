export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'tab1' */ '../../components/business/tab1.vue'),
  },
  {
    path: '/tab1',
    name: 'tab1',
    component: () => import(/* webpackChunkName: 'tab1' */ '../../components/business/tab1.vue'),
  },
  {
    path: '/tab2',
    name: 'tab2',
    component: () => import(/* webpackChunkName: 'tab2' */ '../../components/business/tab2.vue'),
  },
];
