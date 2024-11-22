<template>
  <div v-if="visible" class="tip-box__wrapper">
    <div class="tip-box">
      <header class="tip-header">
        {{ title }}
        <el-link v-if="showClose" :underline="false" class="tip-box__close" @click="close">
          <i class="el-icon-close" />
        </el-link>
      </header>
      <main class="content">
        {{ message }}
      </main>
      <footer class="footer">
        <el-button size="small" @click="close">关闭</el-button>
      </footer>
    </div>
  </div>
</template>

<script>
// 点击遮罩层关闭
export default {
  name: 'TipBox',
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      required: true
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    close() {
      this.visible = false
      this.callback()
    }
  }
}
</script>

<style scoped lang="scss">
.tip-box__wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: #0c0c0c9c;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .tip-box {
    width: 400px;
    background: #fff;
    border-radius: 5px;
    position: relative;
    .tip-header {
      padding: 15px 15px 10px;
      .tip-box__close {
        position: absolute;
        right: 15px;
      }
    }
    .content {
      padding: 10px 15px;
      font-size: 14px;
      color: #656565;
    }
    .footer {
      padding: 5px 15px 10px;
      text-align: right;
    }
  }
}
</style>
