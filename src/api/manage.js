import request from '@/utils/request'

// 组织管理
export function getGroup (data) {
  return request({
    url: '/organize/getAllOrganize',
    method: 'get',
    params: data
  })
}

export function addGroup (data) {
  return request({
    url: '/organize/addOrganize',
    method: 'post',
    data
  })
}

export function getAdministrator (data) {
  return request({
    url: '/dropdown/getOrganizeAllDropUser',
    method: 'get',
    params: data
  })
}

export function updateOrganizeInfo (data) {
  return request({
    url: '/organize/updateOrganizeInfo',
    method: 'put',
    data
  })
}

export function adminDeleteGroup (data) {
  return request({
    url: '/organize/deleteOrganize',
    method: 'delete',
    params: data
  })
}

// 用户管理
export function getOrgUserByNameOrPhone (data) {
  return request({
    url: '/user/getOrganizeUserByNameOrPhone',
    method: 'get',
    params: data
  })
}

export function getStatus () {
  return request({
    url: '/dropdown/getStatus',
    method: 'get'
  })
}

export function updateOrgUserInfo (data) {
  return request({
    url: '/user/updateOrgUserInfo',
    method: 'put',
    data
  })
}

export function addUser (data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

export function adminDeleteUser (data) {
  return request({
    url: '/user/adminDeleteUser',
    method: 'delete',
    params: data
  })
}

export function resetPassword (data) {
  return request({
    url: '/user/resetPassword',
    method: 'put',
    params: data
  })
}

export function pdfDownload () {
  return request({
    url: '/download/pdfDownload',
    method: 'get'
  })
}

export function checkAddUser (data) {
  return request({
    url: '/user/checkAddUser',
    method: 'post',
    data
  })
}

export function batchAddUser (data) {
  return request({
    url: '/user/batchAddUser',
    method: 'post',
    data
  })
}

// 日志管理
export function getLog (data) {
  return request({
    url: '/log/getLog',
    method: 'get',
    params: data
  })
}

// 反馈管理
export function getFeedbackInfo (data) {
  return request({
    url: '/feedback/getFeedbackInfoByUserInfo',
    method: 'get',
    params: data
  })
}
