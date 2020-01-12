import Vue from "vue";
import App from "./App";
import "./registerServiceWorker";
import store from "./store";
import router from "./router";
import "./hooks"; // Vue.use(VueCompositionApi)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
