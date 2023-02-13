import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载Vant核心组件
import Vant from 'vant'
// 加载Vant全局样式
import 'vant/lib/index.css'
// 注册使用Vant组件库
Vue.use(Vant)
// 用于设置 rem 基准值，根据情况动态设置html得font-size
import 'amfe-flexible'
// 引入格式化时间 加载初始化
import './utils/dayjs'

// 自定义全局样式 ：放在Vant的样式下面，否则会导致自己的样式被Vant所覆盖 
import './styles/index.less'


// 自定义指令 自动获取焦点
// Vue.directive('focus', {
//   inserted: function (el) {
//     // 获取元素的焦点
//     el.focus()
//   }
// })
 

Vue.config.productionTip = false
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
