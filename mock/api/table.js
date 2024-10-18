const { mock } = require('mockjs')

const listTemplate = [{
  id: '@id',
  title: '@sentence(10, 20)',
  'status|1': ['published', 'draft', 'deleted'],
  author: '@first',
  display_time: '@datetime',
  pageviews: '@integer(300, 5000)'
}]

module.exports = [
  {
    url: '/vue-admin-template/table/list',
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
          items: list
        }
      }
    }
  }
]
