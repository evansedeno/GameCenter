import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);

window.api = axios.create({
	baseURL: "http://gamecenter.leiven.fr:3001/",
});

Vue.prototype.$bus = new Vue();

Vue.use(SuiVue);
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
