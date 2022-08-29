
<template>
  <div>
    <el-container>
      <el-header>
        <Header :isCollapse="isCollapse" @changeColl="changeColl"></Header>
      </el-header>

      <el-container>
        <el-aside :width="isCollapse ? '68px' : '200px'">
          <Aside :tabList="tabList" :isCollapse="isCollapse" @changeTab="changeTab"></Aside>
        </el-aside>

        <el-main>
          <Main :tagList="tagList"></Main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue"
import Main from '../components/Main.vue'
import axios from 'axios'
export default {
  name: "",
  components: { Header,Aside ,Main},
  data() {
    return {
      isCollapse: false,
      tabList: [],
      tagList: [],
      tag: [],
    };
  },
  created() {
    axios.get('/api/list').then(res =>{
      console.log(res);
      this.tabList=res.data.data
    })
  },
  mounted() {},
  methods: {
    changeColl() {
      this.isCollapse = !this.isCollapse;
    },
    changePath(index, path) {
      console.log(index, path);
    },
    // 关闭标签卡
    closeTag(index, val) {
      console.log(index, val);
      this.tagList.splice(index, 1);
      this.tag.splice(index, 1);
      if (this.tagList.length == 0) {
        this.$router.push("/book");
      }
    },
    // 切换tab添加到tag标签
    changeTab(i, val) {
      this.tag.unshift(val);
      this.tagList = [...new Set(this.tag)];
    },
    // 关闭所有标签
    closeAll() {
      this.tagList = [];
      this.tag = [];
      this.$router.push("/book");
    },
    // 关闭其他标签
    closeOther() {
      const val = this.tagList[0];
      const arr = [];
      arr.push(val);
      this.tagList = arr;
      this.tag = arr;
    },
  },
};
</script>
<style scoped lang='scss'>

.el-header {
  background-color: #242e44;
  color: white;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  min-height: 100vh;
}
.el-menu {
  border-right: 0;
}
.el-main {
  background-color: #fff;
  color: #333;
}
</style>
