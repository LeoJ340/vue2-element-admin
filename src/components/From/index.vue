<template>
  <div :class="['tool_bar', inline ? 'inline': '']">
    <div class="tool_bar_inputs">
      <ToolbarInputs :default-value="value" :configs="inputs" @change="onChange" @onEnter="onClick" />
    </div>
    <div class="tool_bar_options">
      <ToolbarBtns :configs="buttons" @onClick="onClick" />
    </div>
  </div>
</template>

<script>
import ToolbarBtns from './Buttons'
import ToolbarInputs from './Inputs'

export default {
  components: {
    ToolbarBtns,
    ToolbarInputs
  },
  provide() {
    return {
      globalSize: this.size
    }
  },
  props: {
    size: {
      type: String,
      default: 'small'
    },
    inline: {
      type: Boolean,
      default: false
    },
    // 输入框配置
    inputs: {
      type: Array,
      default: () => []
    },
    // 按钮组配置
    buttons: {
      type: Array,
      default: () => []
    },
    initValue: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      value: this.initValue || {}
    }
  },
  watch: {
    initValue(value) {
      this.value = value
    }
  },
  methods: {
    onChange(name, value) {
      this.value[name] = value
      this.$emit('onChange', this.value)
    },
    onClick(name) {
      if (name === 'reset') {
        this.reset()
        this.$emit('onChange', this.value)
        return
      }
      this.$emit('onClick', name, this.value)
    },
    // 封装重置方法
    reset() {
      const inputs = this.inputs
      const ret = {}
      inputs.map(item => {
        ret[item.name] = ''
      })
      this.value = ret
    }
  }
}
</script>

<style lang="scss" scoped>
.tool_bar {
  &.inline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>
