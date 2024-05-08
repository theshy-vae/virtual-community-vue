import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from "buefy";
import 'buefy/dist/buefy.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/app.css'
import './permission'
import relativeTime from 'dayjs/plugin/relativeTime'
//国际化
import 'dayjs/locale/zh-cn'
const dayjs=require('dayjs')
//裁剪图片
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

import format from 'date-fns/format'

Vue.filter('date',(date)=>{
  return format(new Date(date),'yyyy-MM-dd')
})

//相对时间插件
dayjs.extend(relativeTime)
dayjs().locale('zh-cn').format()

Vue.prototype.dayjs=dayjs //全局使用dayjs

Vue.use(Buefy)
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.bus = new Vue()
new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
