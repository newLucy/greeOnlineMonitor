import request from '@/utils/request'

export function search (data) {
  return request({
    url: '/fault/getFaultInfoByBarcodeOrMac',
    method: 'get',
    params: data
  })
}
