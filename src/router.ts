import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/index.vue')
    },
    {
      name: 'detail',
      path: '/movie/:id',
      component: () => import('@/views/detail.vue')
    }
  ]
});