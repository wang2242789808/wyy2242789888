
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
          <div class="box">
            <!-- tag标签区域 -->
            <div>
              <el-tag
                v-for="(item, index) in tagList"
                :key="index"
                @click="$router.push(item.path)"
                @close="closeTag(index, item)"
                closable
              >
                {{ item.title }}
              </el-tag>
            </div>
            <!-- 按钮 -->
            <el-popover placement="bottom" width="30" trigger="hover">
              <div class="txt">
                <p @click="closeAll">关闭所有</p>
                <p @click="closeOther">关闭其他</p>
              </div>
              <el-button slot="reference" type="primary"
                >标签选项 <i class="el-icon-arrow-down"></i
              ></el-button>
            </el-popover>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue"
export default {
  name: "",
  components: { Header,Aside },
  data() {
    return {
      isCollapse: false,
      tabList: [
        {
          title: "图书管理",
          icon: "el-icon-s-shop",
          path: "/book",
        },
        {
          title: "后台系统",
          icon: "el-icon-s-data",
          path: "/back",
        },
        {
          title: "国际化",
          icon: "el-icon-s-flag",
          path: "/inta",
        },
        {
          title: "基础表格",
          icon: "el-icon-menu",
          path: "/table",
        },
        {
          title: "tab选项卡",
          icon: "el-icon-setting",
          path: "/tab",
        },
      ],
      tagList: [],
      tag: [],
    };
  },
  created() {},
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
      console.log(i, val);
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
      console.log(val);
      const arr = [];
      arr.push(val);
      this.tagList = arr;
      this.tag = arr;
      console.log(val, this.tagList);
    },
  },
};
</script>
<style scoped lang='scss'>
.txt {
  width: 100%;
  text-align: center;
  p {
    margin: 10px 0;
    cursor: pointer;
  }
}
.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
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
