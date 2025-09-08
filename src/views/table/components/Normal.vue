<template>
  <TableList
    ref="tableList"
    v-loading="listLoading"
    :index="true"
    :table-col="tableCol"
    :table-data="list"
    :has-handler="false"
    :total="total"
    @pageChange="fetchData"
  >
    <!-- 自定义内容插槽，文本超出 -->
    <template v-slot:content="{ row }">
      <el-tooltip
        :content="row.content"
        :disabled="!isOverflowed(row.content)"
        placement="top"
      >
        <div ref="contentRef" class="text-ellipsis">
          {{ row.content }}
        </div>
      </el-tooltip>
    </template>
    <!-- 自定义状态插槽 -->
    <template v-slot:status="{ row: { status } }">
      <el-tag :type="status | statusFilter">{{ status }}</el-tag>
    </template>
  </TableList>
</template>

<script>
import TableList from '@/components/TableList'
import { getList } from '@/api/table'
export default {
  name: 'NormalTable',
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
      observer: null, // 用于监听容器宽度变化
      contentCellWidth: 200, // 假设列宽为200px
      contentCellHeight: 36, // 假设行高为36px
      tableCol: [
        { label: '标题', prop: 'title', 'show-overflow-tooltip': true }, // element自带的单行文本溢出
        { label: '内容', prop: 'content', slotName: 'content' }, // 通用文本溢出提示方案
        { label: '作者', prop: 'author', width: '100' },
        { label: '浏览量', prop: 'pageviews', width: '70' },
        { label: '状态', prop: 'status', slotName: 'status', width: '100', align: 'center' },
        { label: '时间', prop: 'display_time', width: '155' }
      ],
      list: [],
      total: 500,
      listLoading: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const { pageSize } = this.$refs.tableList.pageParams
      this.listLoading = true
      getList({ size: pageSize }).then(({ data: { list }}) => {
        this.list = list
        this.listLoading = false
        this.initCellWidth()
      })
    },
    // 计算需要控制溢出的列宽
    initCellWidth() {
      this.$nextTick(() => {
        const cell = this.$refs.contentRef?.parentElement
        if (cell) {
          this.contentCellWidth = cell.offsetWidth
          this.contentCellHeight = cell.offsetHeight
          // 监听容器宽度变化（使用 ResizeObserver）
          this.observer = new ResizeObserver(entries => {
            this.contentCellWidth = entries[0].contentRect.width
            this.contentCellHeight = entries[0].contentRect.height
          })
          this.observer.observe(cell)
        }
      })
    },
    // 检查文本是否溢出
    isOverflowed(content) {
      // 单行文本溢出
      // const span = document.createElement('span')
      // span.style.visibility = 'hidden'
      // span.style.position = 'absolute'
      // span.style.whiteSpace = 'nowrap'
      //
      // span.style.font = getComputedStyle(document.body).font // 继承字体样式
      // span.textContent = content
      // document.body.appendChild(span)
      // const textWidth = span.offsetWidth
      // document.body.removeChild(span)
      // return textWidth > this.contentCellWidth

      // 创建临时元素测量文本实际高度（多行文本溢出）
      const div = document.createElement('div')
      div.style.width = `${this.contentCellWidth}px`
      div.innerText = content
      document.body.appendChild(div)
      const textHeight = div.offsetHeight
      document.body.removeChild(div)
      return textHeight > this.contentCellHeight * 1.5 // 允许1.5倍行高误差
    }
  }
}
</script>

<style scoped lang="scss">
.text-ellipsis {
  //white-space: nowrap;
  //overflow: hidden;
  //text-overflow: ellipsis;
  //width: 100%;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
