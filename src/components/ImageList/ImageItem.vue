<template>
  <el-card
    class="image_card"
    :body-style="{ padding: 0, height: '100%', background: 'rgba(135, 135, 135, 8%)' }"
  >
    <el-image :src="src" fit="contain" style="width: 100%; height: 100%" />

    <el-checkbox v-model="checked" :class="['checkbox', 'large']" @change="onSelect" />

    <slot name="mark" />
  </el-card>
</template>

<script>

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    src: {
      type: String,
      default: ''
    },
    select: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: false
    }
  },
  watch: {
    select(val) {
      this.checked = val
    }
  },
  methods: {
    onSelect(val) {
      this.$emit('onSelect', val, this.id)
    }
  }
}
</script>

<style lang="scss" scoped>

.image_card {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  .checkbox {
    position: absolute;
    margin: 6px;
    left: 0;
    top: 0;
    display: none;
    &.is-checked {
      display: block;
    }
  }
  &:hover {
    .checkbox {
      display: block;
      z-index: 11;
    }
  }
}
</style>
