<template>
  <div>
    <el-checkbox
      v-model="allCheck"
      :indeterminate="isIndeterminate"
      style="margin-left: 10px;"
    >
      全选
    </el-checkbox>
    <span style="font-weight: 500; font-size: 14px;"> 已选 <b>{{ selected.length }}</b> 张</span>

    <div class="image_list">
      <ImageItem
        v-for="image in list"
        :id="image.id"
        :key="image.id"
        class="img_box"
        :src="image.url"
        :select="image.select"
        @onSelect="onSelect"
      >
        <template v-slot:mark>
          <div class="image_mask" @click="openViewer(image.id)">
            <div class="mark_wrapper">
              <span v-for="(tag, i) in image.tags" :key="i">#{{ tag }}</span>
            </div>
          </div>
        </template>
      </ImageItem>
    </div>
    <ElImageViewer
      v-show="showViewer"
      :url-list="images.map(image => image.url)"
      :initial-index="previewIndex"
      :on-close="closeViewer"
    />
  </div>
</template>

<script>
import ImageItem from './ImageItem'

export default {
  name: 'ImageList',
  components: {
    ImageItem,
    ElImageViewer: () => import('./ImageViewer')
  },
  props: {
    images: {
      type: Array,
      default: _ => []
    }
  },
  data() {
    return {
      list: [],
      showViewer: false,
      previewIndex: 0
    }
  },
  computed: {
    allCheck: {
      get() {
        return this.list.length && this.selected.length === this.list.length
      },
      set(val) {
        this.list.forEach(image => {
          image.select = val
        })
      }
    },
    isIndeterminate() {
      return this.selected.length > 0 && this.selected.length < this.list.length
    },
    selected() {
      return this.list.filter(image => image.select)
    }
  },
  watch: {
    images(val) {
      this.list = val
    }
  },
  methods: {
    onSelect(val, id) {
      this.list.forEach(image => {
        if (image.id === id) {
          image.select = val
        }
      })
    },
    openViewer(id) {
      this.previewIndex = this.images.findIndex(image => image.id === id)
      this.showViewer = true
      document.body.style.overflow = 'hidden'
    },
    closeViewer() {
      this.showViewer = false
      document.body.style.overflow = 'auto'
    }
  }
}
</script>

<style lang="scss">
.image_list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  & > .img_box {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 10px;
    &:hover {
      .image_mask {
        display: block;
      }
    }
  }
}
.image_mask{
  display: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0,0,0,.5);
  z-index: 5;
  .mark_wrapper{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    padding: 5px;
    span {
      border: 1px solid rgba(0,0,0,.5);
      border-radius: 4px;
      padding: 2px;
      font-size: 12px;
      background-color: rgba(255,255,255,.7);
      color: #000;
      margin:3px 3px 3px 0 ;
    }
  }
}
</style>
