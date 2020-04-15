import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { MessageBox, Message } from 'element-ui'
// import store from '../store'
var url = process.env.NODE_ENV === 'production' ? '/aircondition' : 'http://172.28.171.64:9090/aircondition' // 172.28.171.64:9090http://47.112.177.59:8306/aircondition
Vue.prototype.$url = url

const service = axios.create({
  baseURL: url,
  withCredentials: true,
  timeout: 120000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
var t = null
service.interceptors.response.use(
  response => {
    let res = response.data
    let status = res.status
    if (status === 2000) {
      return res
    } else if (status === 2001) {
      t = setTimeout(() => {
        if (t) {
          clearTimeout(t)
          console.log(t)
        }
        // let path = router.path
        // console.log(path)
        // if (path !== '/login') {
        //   router.push('/login')
        // }
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning',
          customClass: 'my-message-box'
        }).then(() => {
          router.push('/login')
        }).catch(err => {})
        // return console.log(new Error(res.message || 'Error'))
      }, 10)
    } else if (status === 1050) {
      Message({
        showClose: true,
        message: res.data,
        type: 'error',
        customClass: 'myMessage'
      })
    } else {
      Message({
        showClose: true,
        message: res.data || window.$vueI18n.t(`m.code.${status}`),
        type: 'error',
        customClass: 'myMessage'
      })
    }
  },
  error => {
    Message({
      showClose: true,
      message: '网络错误，请稍后重试！',
      type: 'error',
      customClass: 'myMessage'
    })
    return Promise.reject(error);
  }
)
export default service
