import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getTreeList(params) {
  return request({
    url: '/vue-admin-template/table/treeList',
    method: 'get',
    params
  })
}
