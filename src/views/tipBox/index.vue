<template>
  <div class="app-container">
    <h3>ElementUI-消息提醒</h3>
    <el-button type="info" plain @click="elMsg('info')">消息</el-button>
    <el-button type="success" plain @click="elMsg('success')">成功</el-button>
    <el-button type="warning" plain @click="elMsg('warning')">警告</el-button>
    <el-button type="danger" plain @click="elMsg('error')">错误</el-button>
    <el-button type="primary" plain @click="elMsgCenter">居中消息</el-button>
    <h3>ElementUI-弹窗</h3>
    <el-button type="info" plain @click="elMsgBox">消息提示</el-button>
    <el-button type="info" plain @click="elMsgBoxConfirm">确认消息</el-button>
    <el-button type="info" plain @click="elMsgBoxPrompt">提交内容</el-button>
    <h3>自定义弹窗</h3>
    <el-button type="info" plain @click="tip">自定义弹窗</el-button>
    <h3>拖拽弹窗</h3>
    <el-button type="info" plain @click="() => dialogVisible = true">拖拽弹窗</el-button>
    <el-dialog
      v-drag
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>可拖拽对话框</span>
    </el-dialog>
  </div>
</template>

<script>
import drag from '@/directive/drag'
export default {
  name: 'MsgBox',
  directives: { drag },

  data() {
    return {
      dialogVisible: false
    }
  },

  methods: {
    elMsg(type = '') {
      this.$message({
        showClose: true,
        message: '这是一条消息提示',
        type
      })
    },
    elMsgCenter() {
      this.$message({
        showClose: true,
        message: '这是一条居中消息提示',
        center: true
      })
    },
    // 消息提示
    elMsgBox() {
      this.$alert('这是一段内容', '标题', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message.info(action)
        }
      })
    },
    // 确认消息
    elMsgBoxConfirm() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功!')
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    // 提交内容
    elMsgBoxPrompt() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message.success(`你的邮箱是: ${value}`)
      }).catch(() => {
        this.$message.info('取消输入')
      })
    },
    tip() {
      this.$tip({
        title: '标题',
        message: '提示消息',
        callback() {
          this.$message.info('已关闭')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
