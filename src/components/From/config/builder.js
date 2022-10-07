
function input(opts) {
  const { name, label, size, placeholder = '请输入', disabled, enterButton } = opts
  return {
    type: 'input',
    name,
    label,
    size,
    placeholder,
    disabled,
    enterButton // 回车触发指定按钮事件
  }
}

function select(opts) {
  const { name, label, size, options, type = 'select', placeholder = '请选择', disabled } = opts
  return {
    type,
    name,
    label,
    size,
    options,
    placeholder,
    disabled
  }
}

function button(opts) {
  const { name, type, text, icon, size = 'small' } = opts
  return {
    name,
    type,
    text,
    icon,
    size
  }
}

export default { input, select, button }
