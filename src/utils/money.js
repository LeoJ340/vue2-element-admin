/**
 * @author dcit
 * @description 金额格式化工具
 * @desc 需要引入bigDecimal
 */

/**
 * 金额数字格式化
 * @param value 需要格式化的值
 * @param precision 精度位 默认2
 * @returns {*}
 */
// export function money(value, precision = 2) {
//   // eslint-disable-next-line
//   if ([0, 0.0, 0.00, '0', '0.0', '0.00'].indexOf(value) > -1) return '0.00'
//   if (!value) return value
//   if (value.toString().match(/-{0,1}[\d.]/g)) {
//     value = bigDecimal
//       .round(value, +precision)
//       .replace(/^0+(?!\.)/, '')
//       .replace(/(\-)0+(?!\.)/, '-');
//     value = value.split('.')[0].replace(/\B(?=([\d]{3})+\b)/g, ',') + '.' + (value.split('.')[1] || '00')
//     return value
//   }
//   return value
// }

/**
 * 金额转换大写
 * @param {*} money 金额数字 最多显示小数位后四位，小于四位的按原位展示
 * @param symbol 用来显示当值为空时的占位符
 */
// export function moneyChinese(money, symbol = '') {
//   // 汉字的数字
//   const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
//   // 基本单位
//   const cnIntRadice = ['', '拾', '佰', '仟']
//   // 对应整数部分扩展单位
//   const cnIntUnits = ['', '万', '亿', '兆']
//   // 对应小数部分单位
//   const cnDecUnits = ['角', '分', '毫', '厘']
//   // 整数金额时后面跟的字符
//   const cnInteger = '整'
//   // 整型完以后的单位
//   const cnIntLast = '元'
//   // 金额整数部分
//   let integerNum
//   // 金额小数部分
//   let decimalNum
//   // 输出的中文金额字符串
//   let chineseStr = ''
//   // eslint-disable-next-line
//   if ([0, 0.0, 0.00, 0.000, 0.0000, '0', '0.0', '0.00', '0.000', '0.0000'].indexOf(money) > -1) {
//     chineseStr = cnNums[0] + cnIntLast + cnInteger
//     return symbol || chineseStr
//   }
//   if (!money) return symbol || money
//   if (money.toString().match(/-{0,1}[\d.]/g)) {
//     // 满足数字格式
//     const head = money.toString().match(/^-/) ? '欠' : ''
//     head && (money = money.toString().substring(1, money.toString().length))
//     money = money
//       .toString()
//       .replace(/^0+(?!\.)/, '')
//       .replace(/(\-)0+(?!\.)/, '-')
//     if (money.indexOf('.') === -1) {
//       integerNum = money
//       decimalNum = ''
//     } else {
//       integerNum = money.split('.')[0]
//       decimalNum = money.split('.')[1].substr(0, 4)
//     }
//     if (bigDecimal.subtract(integerNum, '9999999999999999.9999') >= 0) {
//       return ''
//     }
//     // 获取整型部分转换
//     if (bigDecimal.subtract(integerNum, 0) > 0) {
//       let zeroCount = 0
//       const IntLen = integerNum.length
//       for (let i = 0; i < IntLen; i++) {
//         const n = integerNum.substr(i, 1)
//         const p = IntLen - i - 1
//         const q = p / 4
//         const m = p % 4
//         if (n === '0') {
//           zeroCount++
//         } else {
//           if (zeroCount > 0) {
//             chineseStr += cnNums[0]
//           }
//           // 归零
//           zeroCount = 0
//           chineseStr += cnNums[+n] + cnIntRadice[m]
//         }
//         if (m === 0 && zeroCount < 4) {
//           chineseStr += cnIntUnits[q]
//         }
//       }
//       chineseStr += cnIntLast
//     }
//     // 小数部分的处理
//     let decimalNumStr = ''
//     if (decimalNum) {
//       for (let i = 0; i < decimalNum.length; i++) {
//         const n = decimalNum.substr(i, 1)
//         if (n !== '0') {
//           chineseStr += cnNums[+n] + cnDecUnits[i]
//           decimalNumStr += cnNums[+n] + cnDecUnits[i]
//         } else {
//           if (decimalNum.substr(i + 1, 1) !== '0' && i <= decimalNum.length - 2) {
//             chineseStr += cnNums[0]
//             decimalNumStr += cnNums[0]
//           }
//         }
//       }
//     }
//     // 大写字符的判断
//     if (!chineseStr) {
//       chineseStr += cnNums[0] + cnIntLast + cnInteger
//     } else if (chineseStr && !decimalNumStr) {
//       chineseStr += cnInteger
//     }
//     return head + chineseStr
//   } // 非数字格式
//   return money
// }

/**
 *  将金额转换成以万为单位
 * @param val 需要转换的值
 * @param unit 有的是万，有的是万元，有的是万元整
 * @returns {*}
 */
// export function changeMoney(val, unit = '') {
//   if (!val) return val;
//   if (val.toString().match(/-{0,1}[\d.]/g) && bigDecimal.subtract(val, 10000) > 0) {
//     val = bigDecimal.divide(val, 10000, 2);
//     return val + '万' + unit;
//   }
//   return money(val);
// }
