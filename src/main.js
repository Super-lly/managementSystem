import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {
  Container, Aside, Header, Main, Menu, MenuItem, MenuItemGroup, Submenu, Button, Dropdown, DropdownMenu,
  DropdownItem, Row, Col, Card, Table, TableColumn
} from 'element-ui';

Vue.config.productionTip = false

Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);


if(process.env.NODE_ENV === 'development') require('@/network/mock')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
