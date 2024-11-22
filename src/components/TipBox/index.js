import Vue from 'vue'
import MsgBox from './index.vue'

let instance
/**
 * @param options
 * @param {Function} callback
 * @constructor
 */
const TipBox = function(options = {}, callback) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  // const { message } = options
  const MsgBoxConstructor = Vue.extend(MsgBox)
  instance = new MsgBoxConstructor({
    propsData: options
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.show()
}

/**
 * @param message {string}
 * @param title {string}
 * @param options {object}
 */
TipBox.alert = (message, title, options) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  }
  options = Object.assign(options, {
    title, message
  })
  return TipBox(options)
}

export default {
  install(Vue) {
    Vue.prototype.$tip = TipBox
  }
}
