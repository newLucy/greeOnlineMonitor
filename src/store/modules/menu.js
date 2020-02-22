import { getMenu } from "@/api/user"
const state = {
  menuList: [],
  manageMenu: [],
  permissionRoute: []
}

const mutations = {
  SET_MENULIST: (state, val) => {
    state.menuList = val
  },
  SET_MANAGEMENU: (state, val) => {
    state.manageMenu = val
  },
  SET_PERMISSIONROUTE: (state, val) => {
    state.permissionRoute = val
  },
  CLEAR_MENUINFO: (state, val) => {
    state.menuList = []
    state.manageMenu = []
    state.permissionRoute = []
  }
}

const actions = {
  getMenuInfo ({commit}, val) {
    return new Promise((resolve, reject) => {
      getMenu().then(res => {
        let menuList = res.data
        commit('SET_MENULIST', menuList)
        // 存储有权限的路由，ps：只支持一级菜单
        let permissionRoute = menuList.map(item => {
          return item.path
        })
        // /search 与 /home 同在
        if (permissionRoute.indexOf('/home') > -1) {
          permissionRoute.push('/search')
        }
        commit('SET_PERMISSIONROUTE', permissionRoute)
        // 存储菜单
        let manageMenu = []
        menuList.some(item => {
          if (item.name === 'User Management') {
            manageMenu = item.children.map(subItem => {
              return subItem.id
            })
            return true
          }
          return false
        })
        commit('SET_MANAGEMENU', manageMenu)
        resolve(permissionRoute)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
console.log('store')
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
