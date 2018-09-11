<template>
    <el-cascader
        style="200px"
        clearable
        :options="options"
        expand-trigger="hover"
        @change="change"
        :props="props"
        change-on-select>
    </el-cascader>
</template>

<script>
import area from './area.js'
export default {
  data() {
    return {
      options: area,
      props: {
        value: 'name',//抛出的字段 原来是code
        label: 'name',
        children: 'data'
      }
    }
  },
  methods: {
    change(e) {
      this.$emit('areaChange', e)
    }
  }
}
</script>

<style>

</style>
