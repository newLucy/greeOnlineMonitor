import { Loading } from 'element-ui'

export default function showLoading () {
  return Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  })
}
