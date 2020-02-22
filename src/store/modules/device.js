const state = {
  isPC: true,
  isIphone: false
}

const mutations = {
  SET_ISPC: (state, val) => {
    state.isPC = val
  },
  SET_ISIPHONE: (state, val) => {
  	state.isIphone = val
  }
}

const actions = {
  setIsPC ({commit}, val) {
    let userAgentInfo = navigator.userAgent
    const Agents = ['Android', 'iPhone',
      'SymbianOS', 'Windows Phone',
      'iPad', 'iPod']
    let isPhone = true
    let isIphone = true
    for (let v = 0, len = Agents.length; v < len; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        isPhone = false
        break
      }
    }
    isIphone = userAgentInfo.indexOf('iPhone') > 0
    commit('SET_ISPC', isPhone)
    commit('SET_ISIPHONE', isIphone)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
