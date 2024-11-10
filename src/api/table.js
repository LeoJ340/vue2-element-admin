import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/table/list',
    method: 'get',
    params
  })
}

export function getTreeList(params) {
  return request({
    url: '/api/table/treeList',
    method: 'get',
    params
  })
}

export function getUserList(params) {
  return request({
    url: '/api/table/userList',
    method: 'get',
    params
  })
}
