import Vue from 'vue';
import VueRouter from 'vue-router';
import LiveReport from './components/LiveReport/LiveReport.vue';
import Chronics from './components/Chronics/Chronics.vue';
import ChronicDetails from './components/Chronics/ChronicDetails';

Vue.use(VueRouter);

const routes = [
  { path: '/chronics', name: 'chronics', component: Chronics },
  { path: '/chronics/:chronicId', name: 'chronicDetails', component: ChronicDetails },

  // { path: '/news', component: News }
  { path: '/live-report', name: 'live-report', component: LiveReport }
  // { path: '/misc', component: Misc }
];

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});

export default router;
