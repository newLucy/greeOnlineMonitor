const getters = {
  isPC: state => state.device.isPC,
  isIphone: state => state.device.isIphone,
  orgs: state => state.dropdown.orgs,
  selectedOrg: state => state.dropdown.selectedOrg,
  menuList: state => state.menu.menuList,
  manageMenu: state => state.menu.manageMenu,
  permissionRoute: state => state.menu.permissionRoute
}

export default getters
