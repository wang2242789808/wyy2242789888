
<template>
  <div>
    <el-container>
      <el-header>
        <p><img src="/top.png" alt="" /><span>梦学谷会员管理系统</span></p>
        <el-popover placement="top-start" width="80" trigger="hover">
          <el-button type="text" slot="reference"
            >{{ name }} <i class="el-icon-arrow-down"></i
          ></el-button>
          <p><i class="el-icon-edit"></i>修改密码</p>
          <p><i class="el-icon-s-operation"></i>退出登录</p>
        </el-popover>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/homePage">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/member">
              <i class="el-icon-s-custom"></i>
              <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="/supplier">
              <i class="el-icon-s-finance"></i>
              <span slot="title">供应商管理</span>
            </el-menu-item>
            <el-menu-item index="/goods">
              <i class="el-icon-s-claim"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/staff">
              <i class="el-icon-s-check"></i>
              <span slot="title">员工管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        
        <el-main>
         <el-card>
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in $route.meta.title" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
         </el-card>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.name = sessionStorage.getItem("token");
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.el-popover {
  p {
    margin: 10px 0;
    color: gray;
  }
}
.el-header {
  background-color: #2d3a4b;
  color: #fff;
  line-height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    display: flex;
    align-items: center;
  }
}

.el-aside {
  background-color: #545c64;
  color: #fff;
  text-align: center;
  min-height: 100vh;
}

.el-main {
  background-color: #ffffff;
  color: #333;
}
</style>

