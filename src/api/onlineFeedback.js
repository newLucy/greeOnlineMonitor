import request from '@/utils/request'

// 组织管理
export function addFeedbackInfo (data) {
  return request({
    url: '/feedback/addFeedbackInfo',
    method: 'post',
    data
  })
}
