<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="普通表格" name="normal">
        <NormalTable />
      </el-tab-pane>
      <el-tab-pane label="树形表格" name="tree">
        <TreeTable />
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NormalTable from './components/Normal'
import TreeTable from './components/TreeTable'

export default {
  components: {
    NormalTable,
    TreeTable
  },
  data() {
    return {
      activeName: 'normal'
    }
  }
}
</script>
