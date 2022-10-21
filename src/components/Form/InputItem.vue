<script>
export default {
  inject: ['globalSize'],
  props: {
    inputItem: {
      required: true,
      type: Object
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  computed: {
    size() {
      return this.inputItem.size || this.globalSize
    }
  },
  watch: {
    value(newVal) {
      Object.keys(newVal).forEach(name => {
        if (this.inputItem.name === name) {
          this.inputValue = newVal[name]
        }
      })
    }
  },
  render(createElement) {
    const _this = this
    // el-select选择列表
    let selectOptions = []
    if (_this.inputItem.type === 'select') {
      selectOptions = Array.isArray(Array.from(_this.inputItem.options)) ? _this.inputItem.options.map(option => {
        return createElement('el-option', {
          props: {
            label: option.label,
            value: option.value
          }
        })
      }) : []
    }
    return createElement(
      'div',
      { class: 'input-item' },
      [
        createElement('label', _this.inputItem.label),
        createElement(`el-${_this.inputItem.type}`, {
          style: {
            width: 'auto'
          },
          props: {
            value: _this.inputValue,
            size: _this.size,
            clearable: true,
            filterable: true,
            disabled: _this.inputItem.disabled
          },
          attrs: {
            placeholder: _this.inputItem.placeholder
          },
          on: {
            input(newValue) {
              _this.inputValue = newValue
              _this.$emit('change', _this.inputItem.name, newValue)
            }
          },
          nativeOn: {
            // 输入框按下回车事件
            keyup(event) {
              if (event.keyCode === 13) {
                _this.$emit('enter', _this.inputItem.name)
              }
            }
          }
        }, selectOptions.length ? selectOptions : undefined)
      ]
    )
  }
}
</script>

<style lang="scss" scoped>
.input-item{
  margin: 14px;
  label {
    margin-right: 10px;
  }
}
</style>
