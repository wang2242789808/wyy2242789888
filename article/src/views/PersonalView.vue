
<template>
  <div>
    <div class="content-box">
      <div class="left">
        <el-card>
            <div class="left-box">
                <div class="top">
                    <p class="ftxt">介绍(已升级 element-plus 正式版)</p>
                    <p>
                        <img src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" alt="">
                    </p>
                    <p class="name">{{name}}</p>
                    <p class="ltxt">超级管理员</p>
                </div>
                <h3> <i class="el-icon-tickets"></i> 项目介绍</h3>
                <p class="text">《vue3改写vue-element-admin,实现后台前端综合解决方案》项目演示</p>
                <h3><i class="el-icon-receiving"></i>项目功能</h3>
            </div>
        </el-card>
      </div>
      <div class="right">
        <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="功能" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="章节" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="作者" name="third">角色管理</el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../utils/http'
export default {
  name: "",
  components: {},
  data() {
    return {
      activeName: "first",
      name:sessionStorage.getItem('token')
    };
  },
  created() {
      this.getFunction()
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 获取项目功能
    getFunction(){
        http.get('/user/feature').then(res =>{
            console.log(res);
        })
    }
  },
};
</script>
<style scoped lang='scss'>
.text{
    color: gray;
    margin: 10px 0 20px 0;
}
.top{
    text-align: center;
    .ftxt{
        display: inline-block;
        width: 100%;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #eee;
    }
    .name{
        font-weight: 700;
        margin: 10px 0;
    }
    .ltxt{
        color: gray;
    }
    img{
        border-radius: 50%;
        margin-top: 40px;
    }
}
h3{
    font-weight: 600;
    color: rgb(106, 103, 103);
    width: 100%;
    display: inline-block;
    border-bottom: 1px solid rgb(231, 230, 230);
    padding: 10px 0;
}
.content-box {
  width: 100%;
  display: flex;
  margin-top: 15px;
  .left {
    width: 30%;
  }
  .right {
    width: 68%;
    margin-left: 2%;
  }
}
</style>
