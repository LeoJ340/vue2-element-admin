<template>
  <div class="app-container">
    <el-row>
      <input ref="upload" type="file" multiple accept="image/*" style="display: none;" @change="upload">
      <el-button size="small" type="primary" @click="$refs.upload.click()">点击上传</el-button>
      <el-button type="danger" size="small" @click="remove">删除</el-button>
    </el-row>
    <ImageList ref="imageList" v-loading="loading" :images="list" />
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
      if (files.map(file => file.type.includes('image')).length !== files.length) {
        this.$message.warning('仅支持图片格式')
        return
      }
      let tempIndex = 0
      files.forEach(file => {
        file.uid = `${Date.now()}${tempIndex++}`
      })
      const res = await this.$oss.uploadList(files)
      if (res.length === files.length) {
        this.$message.success('上传成功')
        this.getData()
      }
    },
    remove() {
      const names = this.$refs.imageList.selected.map(image => image.name)
      this.$confirm('此操作将永久删除文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$oss.removeList(names).then(res => {
          if (res.res.statusCode === 200) {
            this.$message.success('删除成功')
            this.getData()
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
