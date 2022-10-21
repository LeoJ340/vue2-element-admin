<template>
  <div :class="['v-from', inline ? 'inline': '']">
    <div class="input-items">
      <InputItem
        v-for="inputItem in inputs"
        :key="inputItem.label"
        :input-item="inputItem"
        :value="value"
        @change="onChange"
      />
    </div>
    <BtnGroup :configs="buttons" @onClick="onClick" />
  </div>
</template>

<script>
import BtnGroup from './BtnGroup'
import InputItem from './InputItem'

export default {
  name: 'From',
  components: {
    BtnGroup,
    InputItem
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
    // 输入框组配置
    inputs: {
      type: Array,
      default: () => []
    },
    // 按钮组配置
    buttons: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      value: {}
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
.v-from {
  &.inline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .input-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
