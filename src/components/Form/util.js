/**
 * 递归转化返回数据
 * @param {object} data
 * @returns
 */
function changeOption(data) {
  if (!Array.isArray(data)) return
  // TODO：字段可能不同
  data.forEach(item => {
    item['value'] = item.id
    item['label'] = item.name
    changeOption(item.children)
  })
}

/**
 * 根据不同类型转化数据
 * @param {Function} func 调用的数据接口
 * @returns
 */
export async function convertOptions(func) {
  const result = await func()
  const { code, data } = result
  if (code === 200) {
    changeOption(data)
    return data
  }
  return []
}

