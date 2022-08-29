
<template>
  <div class="home-box">
    <Header></Header>
    <div class="box">
      <div class="pic">
        <img src="http://101.132.181.9/img/logo.c8999c02.png" alt="" />
        <el-menu
          router
          class="el-menu-demo"
          mode="horizontal"
          :default-active="activeIndex"
        >
          <el-menu-item index="/hom">首页</el-menu-item>
          <el-menu-item index="/goods">全部商品</el-menu-item>
          <el-menu-item index="/us">关于我们</el-menu-item>
        </el-menu>
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
          style="width: 300px"
          v-model="searchVal"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchGoods"
          ></el-button>
        </el-input>
      </div>

      <router-view></router-view>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import bottom from "../components/bottom.vue";
import axios from "axios";
export default {
  name: "",
  components: { Header, bottom },
  data() {
    return {
      activeName: "first",
      queryInfo: {
        userName: "",
        password: "",
      },

      currentPage: 1,
      pageSize: 15,

      activeIndex: "/hom",
      searchVal: "",
    };
  },
  created() {},
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(val) {
        // console.log(val);
        this.activeIndex = val.path;
      },
    },
  },
  mounted() {},
  methods: {
    //  handleSelect(key, keyPath) {
    //     console.log(key, keyPath);
    //   },

    searchGoods() {
      console.log(1);
      this.$router.push({ name: "goods", query: { search: this.searchVal } });
    },
  },
};
</script>
<style scoped lang='scss'>
// .home-box {
//   background-color: #f5f5f5;
// }
.box {
  width: 1400px;
  margin: 0 auto;
  .pic {
    width: 100%;
    background-color: white !important;
    height: 60px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    position: relative;
    img {
      margin-right: 10%;
    }
    .input-with-select {
      position: absolute;
      right: 17%;
    }
  }
}
</style>
