<template>
  <el-card shadow="hover" :class="{ 'no-card': !cardType }">
    <el-table
      :data="tableData"
      border
      fit
      v-bind="tableOpts"
    >
      <!-- 筛选列 -->
      <el-table-column
        v-if="selection"
        type="selection"
        :width="selectionWidth"
      />
      <!-- 序号列 -->
      <el-table-column
        v-if="index"
        type="index"
        label="序号"
        :width="indexWidth"
      />
      <!-- 数据字段列 -->
      <el-table-column
        v-for="(col, i) in tableCol"
        :key="i"
        v-bind="col"
      >
        <!-- 如果列配置中有指定插槽名称，则使用插槽 -->
        <template v-if="col.slotName" v-slot="{ row }">
          <slot :name="col.slotName" :row="row" />
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column
        v-if="hasHandler"
        align="center"
        :label="handlerLabel"
        :width="handlerWidth"
      >
        <template v-slot="{ row }">
          <!-- 预设操作按钮 -->
          <el-button
            v-if="handlerBtns.includes('detail')"
            type="warning"
            size="small"
            icon="el-icon-tickets"
            title="详情"
            plain
            @click.stop="() => $emit('onDetail', row)"
          />
          <el-button
            v-if="handlerBtns.includes('edit')"
            type="primary"
            size="small"
            icon="el-icon-edit"
            title="编辑"
            plain
            @click.stop="() => $emit('onEdit', row)"
          />
          <el-button
            v-if="handlerBtns.includes('delete')"
            type="danger"
            size="small"
            icon="el-icon-delete"
            title="删除"
            plain
            @click.stop="() => $emit('onDel', row)"
          />
          <!-- 操作列插槽 -->
          <slot name="handler" :row="row" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="pageIndex"
      :page-sizes="[10, 20, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script>
export default {
  name: 'TableList',
  props: {
    cardType: {
      type: Boolean,
      default: true
    },
    // el-table 配置
    tableOpts: {
      type: Object,
      default: () => {}
    },
    tableCol: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    // 勾选列
    selection: {
      type: Boolean,
      default: false
    },
    selectionWidth: {
      type: [String, Number],
      default: 50
    },
    // 序号列
    index: {
      type: Boolean,
      default: false
    },
    indexWidth: {
      type: [String, Number],
      default: 50
    },
    // 操作列
    hasHandler: {
      type: Boolean,
      default: true
    },
    handlerLabel: {
      type: String,
      default: '操作'
    },
    handlerWidth: {
      type: [String, Number],
      default: 180
    },
    // 预设操作按钮
    handlerBtns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 10
    }
  },
  computed: {
    pageParams() {
      return {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
    }
  },
  methods: {
    handlePageChange(page) {
      this.pageIndex = page
      this.$emit('pageChange', this.pageParams)
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.$emit('pageChange', this.pageParams)
    },
    resetPage() {
      this.pageIndex = 1
      this.pageSize = 10
    }
  }
}
</script>

<style lang="scss" scoped>
.no-card {
  ::v-deep .el-card__body {
    padding: 0;
  }
  ::v-deep .el-table--border {
    border: none;
  }
}
.el-pagination {
  padding-top: 10px;
  text-align: right;
}
</style>
