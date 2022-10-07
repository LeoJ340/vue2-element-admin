<template>
  <div class="tool_btns">
    <el-button
      v-for="button in buttons"
      :key="button.name"
      :size="button.size"
      :type="button.type"
      :icon="button.icon"
      @click="onClick(button.name)"
    >
      {{ button.text }}
    </el-button>
  </div>
</template>

<script>
import { BUTTONS } from '../config/constant'

export default {
  inject: ['globalSize'],
  props: {
    configs: {
      type: Array,
      default: () => [],
      // 按钮组配置必须要配置name、text，否则按钮无意义
      validator: buttons => {
        buttons.forEach(button => {
          if (!button.name) throw Error('button config need name')
          if (!button.text) throw Error('button config need text')
        })
        return true
      }
    }
  },
  computed: {
    buttons() {
      return this.configs.filter(button => button.name).map(button => {
        button.type = button.type || (BUTTONS[button.name] ? BUTTONS[button.name].type : 'default')
        button.icon = button.icon || (BUTTONS[button.name] ? BUTTONS[button.name].icon : '')
        button.size = button.size || this.globalSize
        return button
      })
    }
  },
  methods: {
    onClick(name) {
      this.$emit('onClick', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.tool_btns{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  button {
    margin: 5px;
  }
}
</style>
