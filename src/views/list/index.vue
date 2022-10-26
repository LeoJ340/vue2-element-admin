<template>
  <div class="app-container">
    <ImageList :images="list" />
  </div>
</template>

<script>
import ImageList from '@/components/ImageList'

export default {
  components: { ImageList },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$oss.getList().then(res => {
        this.list = res.objects.map((item, index) => {
          return {
            id: `${index}`,
            ...item,
            select: false,
            tags: ['test', 'hhh']
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
