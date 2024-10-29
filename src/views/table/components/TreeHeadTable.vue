<template>
  <TableList
    ref="tableList"
    v-loading="listLoading"
    :table-col="[]"
    :table-data="tableData"
    :has-handler="false"
    :total="total"
    @pageChange="fetchData"
  >
    <TableCol v-for="({ children, ...rest }, index) in tableCol" :key="index" :option="rest" :children="children" />
  </TableList>
</template>

<script>
import TableList from '@/components/TableList'
import { getUserList } from '@/api/table'

/**
 * @name recursionTableColum
 * @description 递归列组件
 */
const TableCol = {
  name: 'TableCol',
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    children: {
      type: Array,
      default: () => []
    }
  },
  render(h) {
    return h('el-table-column',
      { props: this.option },
      // 递归调用组件
      this.children.map(({ children, ...rest }) => {
        return h('TableCol', { props: { option: rest, children }})
      })
    )
  }
}
/**
 * @description 多级表头表格示例
 */
export default {
  name: 'TreeHeadTable',
  components: { TableList, TableCol },
  data() {
    return {
      listLoading: false,
      tableCol: [
        { label: '姓名', prop: 'name' },
        {
          label: '地址信息',
          children: [
            { label: '省', prop: 'province' },
            { label: '区', prop: 'city' },
            { label: '地址', prop: 'county' },
            { label: '邮编', prop: 'zip' }
          ]
        }
      ],
      tableData: [],
      total: 200
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const { pageSize } = this.$refs.tableList.pageParams
      this.listLoading = true
      getUserList({ size: pageSize }).then(({ data: { list }}) => {
        this.tableData = list
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
