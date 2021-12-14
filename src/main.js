import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Container,Aside,Header,Main,Menu,MenuItem,MenuItemGroup,Submenu } from 'element-ui';

Vue.config.productionTip = false

Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
