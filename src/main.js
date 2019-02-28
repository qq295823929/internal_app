// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js';
// import Axios from 'axios';
// import VueAxios from "vue-axios"
import $ from 'jquery'
// import Qs from 'qs'
import "./assets/rem"
import "./assets/common.css"
import iView from 'iview';
import 'iview/dist/styles/iview.css';


import Mui from 'vue-awesome-mui';

Vue.use(iView);

Vue.use(Mui);
import { Circle } from 'iview'
// import { Select } from 'iview'
Vue.component('i-circle', Circle)
// Vue.component('i-select', Select)




// Vue.prototype.axios = Axios;
// Vue.prototype.qs = Qs;
// Vue.config.productionTip = false
// Vue.use(VueAxios,Axios)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>'
})
