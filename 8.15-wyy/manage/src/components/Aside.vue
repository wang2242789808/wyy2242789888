
<template>
<div>
    <el-menu
      default-active="/student"
      class="el-menu-vertical-demo"
      router
    >
      <el-menu-item index="/student">
        <span slot="title">学员管理</span>
      </el-menu-item>
      <el-menu-item index="/teacther">
        <span slot="title">讲师管理</span>
      </el-menu-item>
      <el-menu-item index="/assistant">
        <span slot="title">助教管理</span>
      </el-menu-item>
    </el-menu>
</div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
    }
  },
  created () { },
  mounted () { },
  methods: {}
}
</script>
<style scoped lang='scss'>

</style>
