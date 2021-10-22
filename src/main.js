import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
{}
import "./assets/css/css.css";
import "./assets/css/top.css";
import "./assets/css/left_menu.css";
import "./assets/css/list.css";
import "./assets/css/home.css";
import "./assets/css/login.css";
import "./assets/css/dtree.css";
import ElementUI from 'element-ui';
import axios from "axios";//cnpm i axios –S
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment";//时间 npm i moment -S
import * as echarts from "echarts"//npm i echarts -S  导入echarts图表
import ZKTable from "vue-table-with-tree-grid"// npm i vue-table-with-tree-grid -S 树状表格
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;//挂入原型 echarts
Vue.prototype.$http=axios;//用原型的方式导入 axios
Vue.use(ElementUI);
Vue.component("tree-table", ZKTable)//全局组件
Vue.filter("dateformat",(datastr,pattern="YYYY-MM-DD HH:mm:ss")=>{
  return moment(datastr).format(pattern);
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
