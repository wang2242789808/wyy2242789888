
<template>
  <div>
  <div class="top">
      <h2>
      <i
        :class="!isCollapse ? 'el-icon-s-fold': 'el-icon-s-unfold'"
        @click="changeColl"
      ></i>
      后台管理系统
    </h2>
    <p><i class="el-icon-rank" @click="toggleScreen"></i><span>admin</span></p>
  </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  props:['isCollapse'],
  name: "",
  components: {},
  data() {
    return {
     isFullscreen: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeColl(){
      this.$emit('changeColl')
    },
    // 切换全屏
    toggleScreen(){
      screenfull.toggle()
    }
  },
};
</script>

<style scoped lang='scss'>
.top{
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  p{
    i{
      font-size: 30px;
      margin-right: 10px;
    }
  span{
    font-size: 30px;
  }
  }
}
</style>
