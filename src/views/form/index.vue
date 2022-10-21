<template>
  <div class="app-container">
    <From :inputs="inputs" :buttons="buttons" @onClick="onClick" @onChange="onChange" />
  </div>
</template>

<script>
import From from '@/components/Form'
import from from '@/components/Form/config'

export default {
  components: {
    From
  },
  data() {
    return {}
  },
  computed: {
    inputs() {
      return [
        from.builder.input({ name: 'name', label: '姓名' }),
        from.builder.select({ name: 'sex', label: '性别', options: [{ label: '男', value: '1' }, { label: '女', value: '2' }] })
      ]
    },
    buttons() {
      return [from.BUTTONS.reset, from.BUTTONS.query, from.BUTTONS.delete]
    }
  },
  methods: {
    onClick(name, value) {
      console.log(name, value)
    },
    onChange(value) {
      console.log('onChange', value)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

