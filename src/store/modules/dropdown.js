import { allOrgs } from '@/api/user'
const state = {
  orgs: [],
  selectedOrg: ''
}

const mutations = {
  SET_ORGS: (state, val) => {
    state.orgs = val
  },
  SET_SELECTEDORG: (state, val) => {
    state.selectedOrg = val
  }
}

const actions = {
  getOrgs: ({commit}) => {
    allOrgs().then(res => {
      let orgs = res.data
      commit('SET_ORGS', orgs)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
