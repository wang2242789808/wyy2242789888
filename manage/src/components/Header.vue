
<template>
  <div>
    <h2>
      <i
        :class="!isCollapse ? 'el-icon-s-fold': 'el-icon-s-unfold'"
        @click="changeColl"
      ></i>
      后台管理系统
    </h2>
  </div>
</template>

<script>
export default {
  props:['isCollapse'],
  name: "",
  components: {},
  data() {
    return {
     
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeColl(){
      this.$emit('changeColl')
    }
  },
};
</script>
<style scoped lang='scss'>
</style>
