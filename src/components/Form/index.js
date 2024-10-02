/**
 * el-input 配置项
 * @param {string} label
 * @param {string} prop
 * @param {object} opts 组件原生配置
 */
function input(label, prop, opts) {
  return {
    type: 'input',
    label,
    prop,
    opts
  }
}

/**
 * el-select 配置项
 * @param {string} label
 * @param {string} prop
 * @param {array} options 下拉选项
 * @param {object} opts 组件原生配置
 */
function select(label, prop, options, opts = {}) {
  const { placeholder, clearable } = opts
  return {
    type: 'select',
    label,
    prop,
    options,
    opts: Object.assign(opts, {
      filterable: true,
      clearable: clearable === undefined ? true : clearable,
      placeholder: placeholder || `请选择${label}`
    })
  }
}

/**
 * el-radio 配置项
 * @param {string} label
 * @param {string} prop
 * @param {array} options 选择项列表
 * @param {object} opts 组件原生配置
 */
function radio(label, prop, options, opts = {}) {
  const { disabled } = opts
  return {
    type: 'radio',
    label,
    prop,
    options,
    opts: Object.assign(opts, {
      disabled: disabled !== undefined
    })
  }
}

/**
 * el-cascader 配置项
 * @param {string} label
 * @param {string} prop
 * @param {object} opts 组件原生配置
 * @param {array} opts.options 选择项列表
 */
function cascader(label, prop, opts = {}) {
  return {
    type: 'cascader',
    label,
    prop,
    opts: Object.assign(opts, {
      filterable: true
    })
  }
}

/**
 * 时间/日期 配置项
 * @param tagName [time, timeRange, date]
 * @param label
 * @param prop
 * @param opts
 * @returns {{opts: {}, prop, label, type: string, tagName}}
 */
function time(tagName, label, prop, opts = {}) {
  return {
    type: 'time',
    tagName,
    label,
    prop,
    opts
  }
}

function button(opts) {
  const { name, type, text, icon } = opts
  return {
    name,
    text,
    type,
    icon
  }
}

// 预定义按钮
const BUTTONS = {
  reset: {
    name: 'reset',
    icon: 'el-icon-refresh-left',
    text: '重置'
  },
  query: {
    name: 'query',
    type: 'primary',
    icon: 'el-icon-search',
    text: '查询'
  },
  download: {
    name: 'download',
    type: 'primary',
    icon: 'el-icon-download',
    text: '下载'
  },
  delete: {
    name: 'delete',
    type: 'danger',
    icon: 'el-icon-delete',
    text: '删除'
  },
  submit: {
    name: 'submit',
    type: 'success',
    text: '提交'
  }
}

export default { input, select, radio, cascader, time, button, BUTTONS }
