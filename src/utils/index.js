/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      obj[name] = v.substring(index + 1, v.length)
    }
  })
  return obj
}

/**
 * @desc 字符串脱敏的操作： 对身份证号和手机号，账号进行脱敏操作
 * @param value 注意: 需要脱敏的值,要求传入的是未格式化的原值
 * @param symbol 用来脱敏的特殊字符
 * @return {string} 返回脱敏后的值 先脱敏后再进行格式化
 * @param type 区分手机号：M，账号 A，身份证号 C, 默认是账号
 */

export function mask(value = '', type = 'A', symbol = '*') {
  if (value) {
    // 判断如果已经进行了脱敏则不再进行脱敏
    if (value.toString().includes('*') || value.toString().includes('#')) {
      return value
    }
    // 替换掉所有的空格
    value = value.replace(/\s/g, '')

    // 手机号脱敏
    if (type === 'M') {
      // 默认11位
      if (value.length >= 7) {
        return value
          .toString()
          .replace(/(\d{3})\d*(\d{4})/, '$1 **** $2')
          .replace(/\*/g, symbol)
      }
      return value
    }

    // 账号脱敏 前4位数字，后4位数字，中间都是8位脱敏符号：如**** ****    示例：  6270 **** **** 2375
    if (type === 'A') {
      if (value.length >= 8) {
        return value
          .toString()
          .replace(/(\d{4})\d*(\d{4})/, '$1 **** **** $2')
          .replace(/\*/g, symbol)
      }
      return value
    }

    //  6270 **** 2375
    if (type === 'A1') {
      if (value.length >= 8) {
        return value
          .toString()
          .replace(/(\d{4})\d*(\d{4})/, '$1 **** $2')
          .replace(/\*/g, symbol)
      }
      return value
    }

    // 身份证号脱敏
    if (type === 'C') {
      if (value.length >= 7) {
        return value
          .toString()
          .replace(/(\d{4})\d*(\d{3})/, '$1***********$2')
          .replace(/\*/g, symbol)
      }
      return value
    }
  }
  return value
}
