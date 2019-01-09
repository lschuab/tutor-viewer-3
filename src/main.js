import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource';
import Vuebar from 'vuebar';
import VeeValidate from 'vee-validate'
Vue.use(Vuebar);
Vue.use(VueResource)
Vue.use(VeeValidate);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
