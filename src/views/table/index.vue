<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="普通表格" name="normal">
        <NormalTable />
      </el-tab-pane>
      <el-tab-pane label="树形表格" name="tree">
        <TreeTable />
      </el-tab-pane>
      <el-tab-pane label="多级表头" name="third">
        <TreeHeadTable />
      </el-tab-pane>
      <el-tab-pane label="合并表格" name="4">
        <SpanTable />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NormalTable from './components/Normal'
import TreeTable from './components/TreeTable'
import TreeHeadTable from './components/TreeHeadTable.vue'
import SpanTable from './components/SpanTable.vue'

export default {
  components: {
    NormalTable,
    TreeTable,
    TreeHeadTable,
    SpanTable
  },
  data() {
    return {
      activeName: 'normal'
    }
  }
}
</script>
