/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 邮编校验
 * @param postalCode
 * @returns {boolean}
 */
function post(postalCode) {
  return /^\d{6}$/.test(postalCode)
}

/**
 * 邮箱地址校验
 * @param email
 * @returns {boolean}
 */
function email(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

/**
 * 电话校验
 * @param str
 * @returns {boolean}
 */
function phoneNumber(str) {
  const mobileRegex = /^1[3-9]\d{9}$/
  const landlineRegex = /^\d{1,3}[- ]?\d{7,8}$/
  return mobileRegex.test(str) || landlineRegex.test(str)
}

/**
 * 中文校验
 * @param str
 * @returns {boolean}
 */
function Chinese(str) {
  return /[\u4e00-\u9fa5]/.test(str)
}

export const validator = {
  install(Vue) {
    Vue.prototype.$validator = {
      post,
      email,
      phoneNumber,
      Chinese
    }
  }
}
