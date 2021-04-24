import Vue from 'vue'
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { router } from "@/router";
import { http } from "./http";

Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  methods: {
    formatDate(date) {
      const utcDate = new Date(date);

      return utcDate.toLocaleString('en-GB', { timeZone: 'UTC' })
    }
  },
  render: h => h(App),
}).$mount('#app')
