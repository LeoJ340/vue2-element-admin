<template>
  <el-table :data="tableData" :span-method="spanMethod">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="logUserName" label="填报人" width="120" />
    <el-table-column prop="orgName" label="部门" width="120" />
    <el-table-column prop="groupName" label="组别" width="120" />
    <el-table-column prop="projName" label="项目名称" />
    <el-table-column prop="rate" label="完成率" />
  </el-table>
</template>

<script>
export default {
  name: 'SpanTable',
  data() {
    return {
      tableData: [
        { weekId: 1, logUserName: '张三', orgName: '科技管理部', groupName: 'A组', projName: 'AAA系统', rate: '20%' },
        { weekId: 1, logUserName: '张三', orgName: '科技管理部', groupName: 'A组', projName: 'AAA系统', rate: '20%' },
        { weekId: 1, logUserName: '张三', orgName: '科技管理部', groupName: 'A组', projName: 'BBB系统', rate: '20%' },
        { weekId: 1, logUserName: '张三', orgName: '科技管理部', groupName: 'B组', projName: 'XXX系统', rate: '30%' },
        { weekId: 2, logUserName: '张三', orgName: '科技管理部', groupName: 'A组', projName: 'AAA系统', rate: '25%' },
        { weekId: 2, logUserName: '张三', orgName: '科技管理部', groupName: 'A组', projName: 'BBB系统', rate: '25%' },
        { weekId: 2, logUserName: '张三', orgName: '科技管理部', groupName: 'B组', projName: 'CCC系统', rate: '25%' }
      ],
      spanMap: new Map() // 存储合并信息
    }
  },
  created() {
    this.calculateSpanMaps()
  },
  methods: {
    // 预处理合并信息
    calculateSpanMaps() {
      const data = JSON.parse(JSON.stringify(this.tableData))
      const calculateSpan = (keys) => {
        const spanMap = []
        data.forEach((row, index) => {
          if (
            index === 0 ||
            keys.some((key) => row[key] !== data[index - 1][key])
          ) {
            const count = data.slice(index).findIndex((item) =>
              keys.some((key) => item[key] !== row[key])
            )
            spanMap[index] = count === -1 ? data.length - index : count
          } else {
            spanMap[index] = 0
          }
        })
        return spanMap
      }
      // this.spanMap.set('weekId', calculateSpan(['weekId'])) // 最大合并基准
      // this.spanMap.set('groupName', calculateSpan(['weekId', 'groupName']))
      // this.spanMap.set('projName', calculateSpan(['weekId', 'groupName', 'projName']))
      // 优化代码优化合并列逻辑
      const spanColumns = ['weekId', 'groupName', 'projName']
      spanColumns.forEach((key, index) => {
        this.spanMap.set(key, calculateSpan(spanColumns.slice(0, index + 1)))
      })
    },

    // 合并方法
    spanMethod({ column, rowIndex, columnIndex }) {
      // 以最大合并基准合并列
      const weekSpanColumns = ['logUserName', 'orgName']
      if (columnIndex === 0 || weekSpanColumns.includes(column.property)) {
        const span = this.spanMap.get('weekId')[rowIndex]
        if (span > 0) {
          return { rowspan: span, colspan: 1 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }
      // 以组别合并列
      if (this.spanMap.has(column.property)) {
        const span = this.spanMap.get(column.property)[rowIndex]
        if (span > 0) {
          return { rowspan: span, colspan: 1 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }
      return { rowspan: 1, colspan: 1 }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
