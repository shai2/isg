<template>
    <el-cascader
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
        value: 'code',
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
