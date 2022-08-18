
<template>
  <div class="top">
   <img class="pic1" src="/1.png" alt="">
  <ul>
    <li :class="item.icon" v-for="item,index in tabList" :key="index" @click="changeIndex(index)">{{item.name}}</li>
  </ul>
  <img class="pic2" src="/2.png" alt="">
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
       tabList:[
        {
          icon:"el-icon-s-custom",
          name:"用户"
        },
        {
          icon:"el-icon-s-shop",
          name:"教学"
        },
        {
          icon:"el-icon-s-shop",
          name:"题库"
        },
        {
          icon:"el-icon-s-flag",
          name:"运营"
        },
        {
          icon:"el-icon-menu",
          name:"营销"
        },
        {
          icon:"el-icon-s-home",
          name:"商品"
        },
        {
          icon:"el-icon-s-open",
          name:"财务"
        },
        {
          icon:"el-icon-s-data",
          name:"统计"
        },
        {
          icon:"el-icon-s-custom",
          name:"系统"
        },
      ],
      curIndex:0
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeIndex(index){
      this.curIndex=index
    }
  },
};
</script>
<style scoped lang='scss'>
img{
  width: 50px;
  height: 50px;
}
.top {
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #2b4ac7, #3e9bfb);
  color: white;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .pic1 {
    position: absolute;
    left: 5%;
  }
  .pic2 {
    position: absolute;
    width: 80px;
    right: 5%;
  }
  .active{
    border-bottom: 4px solid greenyellow;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      list-style: none;
      line-height: 56px;
      height: 56px;
      margin: 0 20px;
      color: rgba(255, 255, 255, 0.634);
    }
   
  }
}
</style>
