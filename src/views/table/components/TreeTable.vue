<template>
  <TableList
    ref="tableList"
    v-loading="listLoading"
    :selection="true"
    :table-opts="tableOpts"
    :table-col="tableCol"
    :table-data="list"
    :has-handler="false"
    :total="total"
    @pageChange="fetchData"
    @select="handleSelect"
    @select-all="handleSelectAll"
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
      listLoading: true,
      selectedData: []
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
    },
    // 获取所有子节点（递归）
    getAllChildren(row) {
      let children = []
      if (row.children && row.children.length) {
        row.children.forEach(child => {
          children.push(child)
          // 递归获取所有后代节点
          children = children.concat(this.getAllChildren(child))
        })
      }
      return children
    },

    // 处理单选
    handleSelect(selection, row) {
      // 记录当前选中状态
      const isSelected = selection.includes(row)
      // 获取所有子节点
      const allChildren = this.getAllChildren(row)
      // 处理子节点
      allChildren.forEach(child => {
        // 根据父节点状态设置子节点
        this.$refs.tableList.toggleRowSelection(child, isSelected)

        // 更新选择集合
        const index = selection.indexOf(child)
        if (isSelected && index === -1) {
          selection.push(child)
        }
        if (!isSelected && index !== -1) {
          selection.splice(index, 1)
        }
      })
      // 处理父节点
      this.handleParentSelection(row, isSelected, selection)
      // 更新选中数据
      this.selectedData = [...selection]
    },

    // 处理父节点选择
    handleParentSelection(row, isSelected, selection) {
      // 查找父节点
      const parent = this.findParent(this.list, row)
      if (!parent) return

      // 如果是选中操作，检查兄弟节点是否全被选中
      if (isSelected) {
        const allChildrenSelected = this.checkAllChildrenSelected(parent, selection)
        if (allChildrenSelected && !selection.includes(parent)) {
          selection.push(parent)
          this.$refs.tableList.toggleRowSelection(parent, true)
          this.handleParentSelection(parent, true, selection)
        }
      } else {
        // 如果是取消选择，父节点也取消选择
        const parentIndex = selection.indexOf(parent)
        if (parentIndex !== -1) {
          selection.splice(parentIndex, 1)
          this.$refs.tableList.toggleRowSelection(parent, false)
          this.handleParentSelection(parent, false, selection)
        }
      }
    },

    // 查找父节点
    findParent(data, row) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (!item.children || !item.children.length) continue
        if (item.children.some(child => child.id === row.id)) return item
        return this.findParent(item.children, row)
      }
      return null
    },

    // 检查所有子节点是否都被选中
    checkAllChildrenSelected(parent, selection) {
      if (!parent.children || !parent.children.length) return true
      return parent.children.every(child => selection.includes(child) && this.checkAllChildrenSelected((child), selection))
    },

    // 处理全选
    handleSelectAll(selection) {
      const isSelected = Boolean(selection.filter(e => !this.selectedData.includes(e)).length)
      this.selectedData = []
      this.list.forEach(row => {
        this.$refs.tableList.toggleRowSelection(row, isSelected)
        if (isSelected) this.selectedData.push(row)
        const allChildren = this.getAllChildren(row)
        allChildren.forEach(child => {
          this.$refs.tableList.toggleRowSelection(child, isSelected)
          if (isSelected) this.selectedData.push(child)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
