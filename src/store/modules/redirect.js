import router from '@/router'
const state = {}

const actions = {
  toLogin: (state, val) => {
    router.push('/login')
  }
}

export default {
  namespaced: true,
  state,
  actions
}
