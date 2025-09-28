<template>
  <div>
    <el-button type="primary" @click="addItem('list', 'date', 'name', 'address')">添加一行</el-button>
    <el-form ref="formRef" :model="form" :rules="rules" :validate-on-rule-change="false">
      <el-form-item label="列表" prop="list">
        <el-table :data="form.list" border size="small">
          <el-table-column prop="date" label="日期" width="180">
            <template v-slot="{ row, $index }">
              <el-form-item :prop="`list.${$index}.date`">
                <el-input v-model="row.date" size="small" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
            <template v-slot="{ row, $index }">
              <el-form-item :prop="`list.${$index}.name`">
                <el-input v-model="row.name" size="small" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址">
            <template v-slot="{ row, $index }">
              <el-form-item :prop="`list.${$index}.address`">
                <el-input v-model="row.address" size="small" placeholder="请输入内容" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template v-slot="{ row }">
              <el-button type="text" size="small" @click="removeItem(form.list, row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-top: 20px" @click="submit">提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'TableForm',
  data() {
    return {
      form: {
        list: []
      }
    }
  },
  computed: {
    rules() {
      const { list } = this.form
      // const listRules = (list || []).map((e, i) => Object.keys(e).map(k => {
      //   const prop = `list.${i}.${k}`
      //   return { [prop]: [{ required: true, message: '字段不能为空', trigger: 'blur' }] }
      // })).flat()
      const listRules = (list || []).map((_, index) => {
        return {
          [`list.${index}.date`]: [
            { required: true, message: '请输入日期', trigger: 'blur' }
          ],
          [`list.${index}.name`]: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          [`list.${index}.address`]: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ]
        }
      })
      return Object.assign({}, ...listRules)
    }
  },
  methods: {
    addItem(listKey, ...key) {
      if (!this.form[listKey] || !Array.isArray(this.form[listKey])) {
        this.$set(this.form, listKey, [])
      }
      const newItem = {}
      key.forEach(k => {
        newItem[k] = ''
      })
      this.form[listKey].push(newItem)
    },
    removeItem(list, row) {
      const index = list.indexOf(row)
      if (index !== -1) {
        list.splice(index, 1)
      }
    },
    submit() {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          this.$message.error('表单验证失败')
          return false
        }
        this.$message.success('验证通过')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
</style>
