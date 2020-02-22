// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Velocity from 'velocity-animate' // 动画
import store from './store'
import VueI18n from 'vue-i18n'
import 'styles/border.css'
import 'styles/reset.css'
import 'styles/resetElementUI.styl'
import FastClick from 'fastclick'
// import Vconsole from 'vconsole'

FastClick.attach(document.body)
Vue.use(ElementUI)
Vue.use(VueI18n)
// Vue.use(new Vconsole())
Vue.prototype.$velocity = Velocity

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'en-US', // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./lang/zh'), // 中文语言包
    'en-US': require('./lang/en') // 英文语言包
  }
})
// Vue.prototype.$vueI18n = i18n
window.$vueI18n = i18n
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
