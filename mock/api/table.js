const { mock } = require('mockjs')

const itemTemplate = {
  id: '@id',
  title: '@sentence(5, 10)',
  'status|1': ['published', 'draft', 'deleted'],
  author: '@first',
  display_time: '@datetime',
  pageviews: '@integer(300, 5000)'
}

const listTemplate = [itemTemplate]

module.exports = [
  {
    url: '/api/table/list',
    type: 'get',
    response: config => {
      const { query: { size }} = config
      const rule = `list|${size}`
      const { list } = mock({
        [rule]: listTemplate
      })
      return {
        code: 20000,
        data: {
          total: list.length,
          list
        }
      }
    }
  },
  {
    url: '/api/table/treeList',
    type: 'get',
    response: config => {
      const { query: { size }} = config
      const rule = `list|${size}`
      const { list } = mock({
        [rule]: [{
          ...itemTemplate,
          'children|3-8': [itemTemplate]
        }]
      })
      return {
        code: 20000,
        data: {
          total: list.length,
          list
        }
      }
    }
  },
  {
    url: '/api/table/userList',
    type: 'get',
    response: config => {
      const { query: { size }} = config
      const userInfo = {
        id: '@id',
        name: '@first',
        // 地址信息
        province: '@province',
        city: '@city',
        county: '@county',
        zip: '@zip'
      }
      const rule = `list|${size}`
      const { list } = mock({
        [rule]: [userInfo]
      })
      return {
        code: 20000,
        data: {
          total: list.length,
          list
        }
      }
    }
  }
]
