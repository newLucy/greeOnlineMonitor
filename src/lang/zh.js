export const m = {
  login: {
    h1: '空调在线量监控系统'
  },
  code: {
    5000: '系统异常',
    4000: '失败',
    2000: '成功',
    2001: 'session过期',
    2002: '您已被禁止查询',
    2003: '权限不足',
    2004: '没有用户组',
    2005: '找不到文件',
    2006: '没有用户反馈信息',
    2007: '所查询用户与你不属于同一组织，无权访问',
    2008: '参数不能为空',
    2009: '账号或密码错误',
    2010: '没有数据',
    2011: '没有此用户',
    2012: '账号不能为空',
    2013: '账号已存在',
    2014: '组织已存在',
    2015: '组织不一致',
    2016: '邮箱一致，无需更换',
    2017: '请填写组织和用户组',
    2018: '密码不一致',
    2019: '请输入密码',
    2020: '请选择文件',
    2021: '请使用正确的模板',
    2022: '访问过快，请稍后继续'
  },
  manage: {
    group: {
      tableHeader: [
        {
          key: 'organizeName',
          label: 'Group'
        }, {
          key: 'administrator',
          label: 'Administrator',
          editFlag: true
        }, {
          key: 'mailBox',
          label: 'Service Mailbox',
          editFlag: true
        }, {
          key: 'totalMember',
          label: 'Total Members'
        }, {
          key: 'searchTime',
          label: 'Search times'
        }
      ]
    }
  }
}
