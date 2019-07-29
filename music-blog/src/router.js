import Vue from 'vue';
import VueRouter from 'vue-router';
import LiveReport from './components/LiveReport/LiveReport.vue';
import Chronics from './components/Chronics/Chronics.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/chronics', name: 'chronics', component: Chronics },
  // { path: '/news', component: News }
  { path: '/live-report', name: 'live-report', component: LiveReport }
  // { path: '/misc', component: Misc }
];

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});

export default router;
