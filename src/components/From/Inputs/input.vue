<template>
  <div>
    <div v-if="inputItem.type==='input'" class="toolbar_input_item">
      <label>{{ inputItem.label }}</label>
      <el-input
        v-model="value"
        :size="size"
        clearable
        style="width:200px"
        :placeholder="inputItem.placeholder"
        :disabled="inputItem.disabled"
        @change="onChange"
        @keyup.enter.native="onEnter(inputItem.enterButton)"
      />
    </div>
    <div v-if="inputItem.type==='select'" class="toolbar_input_item">
      <label>{{ inputItem.label }}</label>
      <el-select
        v-model="value"
        :size="size"
        clearable
        filterable
        :placeholder="inputItem.placeholder"
        :disabled="inputItem.disabled"
        @change="onChange"
      >
        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
    </div>
    <div v-if="inputItem.type==='cascader'" class="toolbar_input_item">
      <label>{{ inputItem.label }}</label>
      <el-cascader
        v-model="value"
        :props="{ expandTrigger: 'hover', checkStrictly: true }"
        :size="size"
        clearable
        filterable
        :options="options"
        :disabled="inputItem.disabled"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
import { convertOptions } from '../util'

export default {
  inject: ['globalSize'],
  props: {
    inputItem: {
      required: true,
      type: Object
    },
    defaultValue: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      value: ''
    }
  },
  computed: {
    size() {
      return this.inputItem.size || this.globalSize
    },
    options() {
      return typeof this.inputItem.options === 'function' ? [] : this.inputItem.options
    }
  },
  watch: {
    defaultValue(newVal) {
      Object.keys(newVal).forEach(item => {
        if (item === this.inputItem.name && !this.inputItem.disabled) {
          this.value = newVal[item]
        }
      })
    },
    inputItem() {
      this.createInput()
    }
  },
  created() {
    this.createInput()
  },
  methods: {
    // 动态选项需要请求后端
    async createInput() {
      const options = this.inputItem.options
      if (options instanceof Function) {
        this.options = await convertOptions(options)
      }
      Object.keys(this.defaultValue).forEach(item => {
        if (item === this.inputItem.name) {
          this.value = this.defaultValue[item]
        }
      })
    },
    onChange(value) {
      this.$emit('change', this.inputItem.name, value)
    },
    onEnter(name) {
      if (name) this.$emit('onEnter', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar_input_item{
    margin: 14px;
    label {
        margin-right: 10px;
    }
}
</style>
