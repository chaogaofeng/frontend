import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./utils/http";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import "./assets/css/iconfont.css";
import "./assets/css/init.css";
import "./assets/css/index.scss";
import VueClipboard from "vue-clipboard2";

library.add(faCommentDots, faCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueClipboard);
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
