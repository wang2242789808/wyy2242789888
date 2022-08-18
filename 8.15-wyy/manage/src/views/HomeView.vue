
<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <h3 v-for="item in $route.meta.title">{{item}}</h3>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";
export default {
  name: "",
  components: { Header, Aside },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.el-header {
  background: linear-gradient(to right, #2b4ac7, #3e9bfb);
  color: white;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  min-height: 100vh;
  border-right: 1px solid #eee;
}

.el-main {
  background-color: #fff;
  color: #333;
}
</style>

