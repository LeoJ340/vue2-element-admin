<template>
  <div class="search-form" :class="{ 'flex-between': btnPosition === 'right' }">
    <el-form ref="form" :inline="inline" :model="formData" :rules="rules" :label-width="labelWidth">
      <el-form-item
        v-for="input in inputs"
        :key="input.label"
        :label="input.label"
        :prop="input.prop"
      >
        <!-- 输入框 -->
        <el-input v-if="input.type === 'input'" v-model="formData[input.prop]" v-bind="input.opts" />
        <!-- 下拉选择 -->
        <el-select v-if="input.type === 'select'" v-model="formData[input.prop]" v-bind="input.opts">
          <el-option
            v-for="opt in input.options"
            :key="opt.value"
            v-bind="opt"
          />
        </el-select>
        <el-cascader v-if="input.type === 'cascader'" v-model="formData[input.prop]" v-bind="input.opts" />
        <el-radio-group v-if="input.type === 'radio'" v-model="formData[input.prop]" v-bind="input.opts">
          <el-radio
            v-for="opt in input.options"
            :key="opt.value"
            :label="opt.value"
          >
            {{ opt.label }}
          </el-radio>
        </el-radio-group>
        <!-- 日期|时间选择器 -->
        <Time v-if="input.type === 'time'" v-model="formData[input.prop]" :config="input" />
        <Checkbox v-if="input.type === 'checkbox'" v-model="formData[input.prop]" :config="input" />
        <slot v-if="input.slot" :name="input.slot" :form-data="formData" />
      </el-form-item>
      <!-- 位于form内的按钮组 -->
      <el-form-item v-if="btnPosition === 'form-end'">
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
      </el-form-item>
    </el-form>
    <!-- form外的按钮组 -->
    <div v-if="btnPosition !== 'form-end'">
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
  </div>
</template>

<script>
// 需要options属性的项
const needOptions = ['select', 'radio']
// options校验
function optionsValid(options) {
  return options.every(opt => opt.label && opt.value)
}

function btnPositionValidator(position) {
  return ['right', 'bottom', 'form-end'].includes(position)
}

import Time from './Time'
import Checkbox from './Checkbox'
export default {
  name: 'Form',
  components: { Time, Checkbox },

  props: {
    inline: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    // 输入框组配置
    inputs: {
      type: Array,
      default: () => [],
      validator: inputs => {
        for (const input of inputs) {
          // needOptions配置校验
          const { type, options, opts } = input
          if (needOptions.includes(type) && !optionsValid(options)) {
            throw new Error(`${type} input options need label and value`)
          }
          // cascader 配置校验
          if (type === 'cascader' && (!opts.options || !opts.options.length)) {
            throw new Error(`cascader input need native options opts`)
          }
        }
        return true
      }
    },
    rules: {
      type: Object,
      default: () => {}
    },
    // 按钮组配置
    buttons: {
      type: Array,
      default: () => []
    },
    buttonPosition: {
      type: String,
      default: 'form-end',
      validator: value => {
        return btnPositionValidator(value)
      }
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  computed: {
    btnPosition() {
      if (!this.inline || !btnPositionValidator(this.buttonPosition)) {
        return 'form-end'
      }
      return this.buttonPosition
    }
  },
  methods: {
    onChange(name, value) {
      this.formData[name] = value
      this.$emit('change', this.formData)
    },
    onClick(name) {
      if (name === 'reset') {
        this.reset()
        this.$emit('change', this.formData)
        return
      }
      this.$emit('click', name, this.formData)
    },
    // 封装重置方法
    reset() {
      const inputs = this.inputs
      const ret = {}
      inputs.map(item => {
        ret[item.prop] = ''
      })
      this.formData = ret
    },
    async validate() {
      return this.$refs.form.validate()
    },
    clearValidate() {
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
}
</style>
