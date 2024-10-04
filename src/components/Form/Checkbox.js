export default {
  name: 'Checkbox',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isIndeterminate: false,
      checkAll: false,
      value: []
    }
  },
  computed: {
    valueList() {
      const { options } = this.config
      if (!options || !options.length) return []
      return options.map(opt => {
        return opt.value
      })
    }
  },
  methods: {
    change(value) {
      this.value = value
      this.$emit('input', value)
      const checkedCount = value.length
      this.checkAll = checkedCount === this.valueList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.valueList.length
    },
    handleCheckAll(val) {
      this.checkAll = val
      this.isIndeterminate = false
      this.value = val ? this.valueList : []
      this.$emit('input', this.value)
    }
  },
  render(h) {
    const { options, indeterminate, opts } = this.config
    const indeterminateVN = h('el-checkbox',
      {
        props: { indeterminate: this.isIndeterminate, value: this.checkAll },
        on: { input: this.handleCheckAll }
      }
    )
    return h('div', [
      indeterminate ? indeterminateVN : undefined,
      h('el-checkbox-group',
        {
          props: { ...opts, value: this.value },
          on: { input: this.change }
        },
        options.map(opt => {
          const props = { key: opt.value, label: opt.value, name: opt.label, disabled: opt.disabled }
          return h('el-checkbox', { props })
        })
      )
    ])
  }
}
