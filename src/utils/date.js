/**
 * Created by LeoJ on 25/04/27.
 */

/**
 * @desc 获取日期所在周的开始和结束日期
 * @param date
 * @returns {string[]}
 */
export function getWeekRange(date) {
  const day = date.getDay()
  const startOffset = day === 0 ? -6 : 1 - day
  const startDate = new Date(date)
  startDate.setDate(startDate.getDate() + startOffset)
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)
  endDate.setHours(23, 59, 59, 999)
  return [formatDate(startDate), formatDate(endDate)]
}

/**
 * @desc 获取指定年份的所有周
 * @param {Number} year
 * @returns {*[]}
 */
export function getWeeksInYear(year) {
  const weeks = []
  const firstDay = new Date(year, 0, 1) // 1月1日
  const currentDate = new Date(firstDay)
  // 找到第一个周四
  while (currentDate.getDay() !== 4) {
    currentDate.setDate(currentDate.getDate() + 1)
  }
  const monday = new Date(currentDate)
  monday.setDate(currentDate.getDate() - 4) // 找到第一个周一
  monday.setHours(0, 0, 0, 0)
  // 继续计算剩余的周
  while (currentDate.getFullYear() === year && monday < new Date()) {
    weeks.push(getWeekRange(currentDate))
    currentDate.setDate(currentDate.getDate() + 7)
    monday.setDate(monday.getDate() + 7)
  }
  // 返回所有周的日期范围
  return weeks
}

/**
 * @desc 获取指定日期的ISO年份
 * @param {Date} date
 * @returns {number}
 */
export function getISOYear(date) {
  // 创建一个新的日期对象，避免修改原始日期
  const targetDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  // 将日期调整到最近的星期四（ISO周数计算中，周四决定周数）
  targetDate.setUTCDate(targetDate.getUTCDate() + 4 - (targetDate.getUTCDay() || 7))
  return targetDate.getUTCFullYear()
}

/**
 * @desc 获取指定日期的ISO周数
 * @param date
 * @returns {number}
 */
export function getWeekOfYear(date) {
  // 创建一个新的日期对象，避免修改原始日期
  const targetDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  // 将日期调整到最近的星期四（ISO周数计算中，周四决定周数）
  targetDate.setUTCDate(targetDate.getUTCDate() + 4 - (targetDate.getUTCDay() || 7))
  // Create a new date object for January 4th of the given year
  const jan4 = new Date(targetDate.getFullYear(), 0, 4)
  // Calculate the day of the week for January 4th (0 = Sunday, 1 = Monday, etc.)
  const jan4DayOfWeek = (jan4.getDay() + 6) % 7 // Adjust to make Monday = 0
  // Find the start of the first ISO week (Monday of the week containing January 4th)
  const startOfFirstWeek = new Date(jan4)
  startOfFirstWeek.setDate(jan4.getDate() - jan4DayOfWeek)
  // Calculate the difference in days between the given date and the start of the first ISO week
  const diffInDays = Math.floor((targetDate - startOfFirstWeek) / (1000 * 60 * 60 * 24))
  // Calculate the week number
  return Math.ceil((diffInDays + 1) / 7)
}

/**
 * @desc 格式化日期为YYYY-MM-DD
 * @param date
 * @returns {string}
 */
export function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

