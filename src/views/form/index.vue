<template>
  <div class="app-container">
    <h3 class="title">内联表单</h3>
    <SearchForm
      :inputs="searchInputs"
      :buttons="searchButtons"
      button-position="form-end"
      :rules="searchRules"
      @click="clickForm"
    />
    <el-divider />
    <h3 class="title">纵向表单</h3>
    <SearchForm
      :inline="false"
      :inputs="searchInputs"
      :buttons="searchButtons"
      button-position="right"
      :rules="searchRules"
      style="width: 300px"
      @click="clickForm"
    />
  </div>
</template>

<script>
import SearchForm from '@/components/Form/index.vue'
import form from '@/components/Form/index.js'

export default {
  components: {
    SearchForm
  },
  data() {
    const emailValid = (rule, value, callback) => {
      if (!value) callback()
      if (!this.$validator.email(value)) {
        callback(new Error('邮箱格式有误'))
      }
    }
    return {
      checkList: [],
      searchRules: {
        email: [{ validator: emailValid, trigger: 'change' }]
      }
    }
  },
  computed: {
    searchInputs() {
      return [
        form.input('名称', 'name', { clearable: true }),
        form.radio('性别', 'gender', [
          { label: '男', value: '1' },
          { label: '女', value: '0' }
        ]),
        form.select('工作', 'job', ['前端工程师', 'Java工程师', '产品经理', '技术总监'].map(i => {
          return { label: i, value: i }
        })),
        form.time('date', '生日', 'date'),
        form.input('邮箱', 'email', { clearable: true })
      ]
    },
    searchButtons() {
      return [
        form.BUTTONS.reset,
        form.BUTTONS.query
      ]
    }
  },
  methods: {
    clickForm(name, formData) {
      console.log(name, formData)
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: 500;
}
</style>

