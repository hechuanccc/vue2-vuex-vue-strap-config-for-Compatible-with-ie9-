import 'es6-promise/dist/es6-promise.auto.js'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueProgressbar from 'vue-progressbar'
import { sync } from 'vuex-router-sync'

import App from './views/app'
import store from './vuex/index/store'
import router from './router/index'

Vue.use(VueProgressbar)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.prototype.$Api = (url) => {
    return window.location.origin + '/readapi?uri=' + url
}

Vue.config.debug = process.env.NODE_ENV === 'dev'

sync(store, router)
new Vue({
    router,
    store,
    ...App
}).$mount('#app')
