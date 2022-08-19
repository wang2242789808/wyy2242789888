
<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <ul>
            <li
              v-for="(item, index) in tabList"
              :key="index"
              @click="changeIndex(index,item)"
              :class="{ active: currentIndex == index }"
            >
              {{ item.title }}
              <i :class="item.icon"></i>
            </li>
          </ul>

          <router-view></router-view
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
export default {
  name: "",
  components: { Aside, Header },
  data() {
    return {
      tabList: [
        {
          icon: "el-icon-info",
          title: "个人中心",
          path:"/per"
        },
        {
          icon: "el-icon-circle-close",
          title: "数据可视化",
          path:'/number'
        },
        {
          icon: "el-icon-circle-close",
          title: "员工管理",
          path:'/user'
        },
        {
          icon: "el-icon-circle-close",
          title: "文章排名",
          path:'/article'
        },
      ],
      currentIndex: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeIndex(index,val) {
      this.currentIndex = index;
      console.log(val);
      this.$router.push(`${val.path}`)
    },
  },
};
</script>
<style scoped lang='scss'>
.active {
  background-color: #304156;
  color: white;
  cursor: pointer;
}
ul {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background-color: white;
  display: flex;
  justify-content: flex-start;
  li {
    list-style: none;
    text-align: center;
    width: 120px;
    border: 1px solid rgba(128, 128, 128, 0.233);
    margin: 0 5px;
  }
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #304156;
  color: #fff;
  text-align: center;
  min-height: 100vh;
}

.el-main {
  background-color: #fdfdfd;
  color: #333;
}
</style>

