<template>
  <TableList
    ref="tableList"
    v-loading="listLoading"
    :table-opts="tableOpts"
    :table-col="tableCol"
    :table-data="list"
    :has-handler="false"
    :total="total"
    @pageChange="fetchData"
  >
    <template v-slot:status="{ row }">
      <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
    </template>
  </TableList>
</template>

<script>
import TableList from '@/components/TableList'
import { getTreeList } from '@/api/table'
export default {
  name: 'TreeTable',
  components: { TableList },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableCol: [
        { label: '标题', prop: 'title' },
        { label: '作者', prop: 'author', width: '100' },
        { label: '浏览量', prop: 'pageviews', width: '100' },
        { label: '状态', prop: 'status', slotName: 'status', width: '100', align: 'center' },
        { label: '时间', prop: 'display_time', width: '180' }
      ],
      list: [],
      total: 500,
      listLoading: true
    }
  },
  computed: {
    tree() {
      if (!this.list || !this.list.length) return false
      return this.list.every(({ children }) => children && Array.isArray(children))
    },
    tableOpts() {
      return {
        rowKey: 'id',
        defaultExpandAll: this.tree,
        treeProps: {
          children: 'children'
        }
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const { pageSize } = this.$refs.tableList.pageParams
      this.listLoading = true
      getTreeList({ size: pageSize }).then(({ data: { list }}) => {
        this.list = list
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
