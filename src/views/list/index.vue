<template>
  <div class="app-container">
    <el-row>
      <input ref="upload" type="file" multiple accept="image/*" style="display: none;" @change="upload">
      <el-button size="small" type="primary" @click="$refs.upload.click()">点击上传</el-button>
      <el-button type="danger" size="small">删除</el-button>
    </el-row>
    <ImageList v-loading="loading" :images="list" />
  </div>
</template>

<script>
import ImageList from '@/components/ImageList'

export default {
  components: { ImageList },
  data() {
    return {
      loading: false,
      list: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.$oss.getList().then(res => {
        this.list = res.objects.map((item, index) => {
          return {
            id: `${index}`,
            ...item,
            select: false,
            tags: ['test', 'hhh']
          }
        })
      }).finally(_ => {
        this.loading = false
      })
    },
    async upload(e) {
      const files = Array.from(e.target.files)
      files.forEach(file => {
        file.uid = Date.now()
      })
      if (files.map(file => file.type.includes('image')).length !== files.length) {
        this.$message.warning('仅支持图片格式')
        return
      }
      await this.$oss.uploadList(files)
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
