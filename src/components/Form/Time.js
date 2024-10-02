/**
 * 日期时间选择组件配置
 */
const tagConfig = {
  time: {
    tagName: 'el-time-select',
    defaultOpts: {
      'value-format': 'hh-mm-ss'
    }
  },
  timeRange: {
    tagName: 'el-time-picker',
    defaultOpts: {
      'is-range': true,
      'value-format': 'hh:mm:ss'
    }
  },
  date: {
    tagName: 'el-date-picker',
    defaultOpts: {
      format: 'yyyy-MM-dd',
      'value-format': 'yyyy-MM-dd'
    }
  }
}
export default {
  name: 'Time',
  props: {
    config: {
      type: Object,
      required: true
    },
    value: {
      type: String | Date,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {},
  render(h) {
    const { tagName, opts } = this.config
    const curTag = tagConfig[tagName] // 当前组件基本配置
    return h(curTag.tagName, {
      props: { ...curTag.defaultOpts, ...opts, value: this.value },
      on: {
        input: value => {
          this.$emit('input', value)
        }
      }
    })
  }
}
