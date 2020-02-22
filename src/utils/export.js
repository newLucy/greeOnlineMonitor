import request from './request'

export function exportExcel (url, data) {
  request({
    url: url,
    methods: 'get',
    params: data
  }).then(res => {
    console.log(res)
  })
}
