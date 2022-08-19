
<template>
  <div>
    <p>
      <img
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
      />
      <span>imooc-admin</span>
    </p>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/per">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="/number">
        <i class="el-icon-s-data"></i>
        <span slot="title">数据可视化</span>
      </el-menu-item>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户</span>
        </template>
          <el-menu-item index="/user">
            <i class="el-icon-user-solid"></i>
            <span>员工管理</span>
          </el-menu-item>
          <el-menu-item index="/roles">
            <i class="el-icon-s-shop"></i>
            <span>角色列表</span>
          </el-menu-item>
          <el-menu-item index="/right">
            <i class="el-icon-s-opportunity"></i>
            <span>权限列表</span>
          </el-menu-item>
      </el-submenu>

      <el-submenu>
        <template slot="title">
          <i class="el-icon-s-comment"></i>
          <span>文章</span>
        </template>
       
          <el-menu-item index="/article"
            ><i class="el-icon-s-operation"></i>
            <span>文章排名</span></el-menu-item
          >
          <el-menu-item index="1-2">
              <i class="el-icon-s-order"></i>
              <span>创建文章</span>
          </el-menu-item>
        
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      tabs:[
        {
          title:"个人中心",
          icon:"el-icon-user-solid",
          path:"/per"
        },
        {
          title:"个人中心",
          icon:"el-icon-user-solid",
          path:"/per"
        },
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
p {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  span {
    font-size: 15px;
    font-weight: 600;
  }
  img {
    width: 25%;
  }
}
</style>
