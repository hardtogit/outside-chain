// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/default.css' 
import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';

Locale.use('en-US', enUS);
Vue.config.productionTip = false
// Vue.use(Vant);
  
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
