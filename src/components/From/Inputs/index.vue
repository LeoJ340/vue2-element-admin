<template>
  <div class="tool_inputs">
    <InputItem
      v-for="item in inputs"
      :key="item.label"
      :default-value="value"
      :input-item="item"
      @change="onChange"
      @onEnter="onEnter"
    />
  </div>
</template>

<script>
import InputItem from './input'
export default {
  components: {
    InputItem
  },
  props: {
    configs: {
      type: Array,
      default: () => []
    },
    defaultValue: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      inputs: this.configs,
      value: this.defaultValue || {}
    }
  },
  watch: {
    configs(newVal) {
      this.inputs = newVal
    },
    defaultValue(newVal) {
      this.value = newVal
    }
  },
  methods: {
    onChange(name, value) {
      this.$emit('change', name, value)
    },
    onEnter(name) {
      this.$emit('onEnter', name)
    }
  }
}
</script>

<style lang="scss">
.tool_inputs {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
