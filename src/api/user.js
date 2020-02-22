import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/system/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/system/logout',
    method: 'get'
  })
}

export function checkSession () {
  return request({
    url: '/system/session',
    method: 'get'
  })
}

export function allOrgs () {
  return request({
    url: '/dropdown/getAllOrganizeDrop',
    method: 'get'
  })
}

export function updateUserInfo (data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'put',
    data
  })
}

export function getMenu () {
  return request({
    url: '/menu/getUserMenu',
    method: 'get'
  })
}
