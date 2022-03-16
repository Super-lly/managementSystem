import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {
  Container, Aside, Header, Main, Menu, MenuItem, MenuItemGroup, Submenu, Button, Dropdown, DropdownMenu,
  DropdownItem, Row, Col, Card, Table, TableColumn, Input, MessageBox, Message, Drawer, Form, FormItem, Select,
  Option, Loading, Pagination, Upload, Dialog
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
Vue.use(Input);
Vue.use(Drawer);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Loading.directive);
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Dialog)

Vue.component(MessageBox.name, MessageBox)
Vue.component(Message.name, Message)

// 在Vue实例上挂载$message和$confirm
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

if (process.env.NODE_ENV === 'development') require('@/network/mock')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
