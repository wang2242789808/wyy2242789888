
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="`未读消息(${tabLists.length})`"
        name="1"
        @tab-click="changeTab"
      >
        <el-table
          :data="
            tabLists.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          style="width: 100%"
        >
          <el-table-column prop="title"> </el-table-column>
          <el-table-column prop="create_time"> </el-table-column>
          <el-table-column prop="flag">
            <template slot-scope="scope">
              <el-button @click="changeFlag(scope.$index, scope.row)"
                >标为已读</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="tabLists.length"
        >
        </el-pagination>
        <el-button type="primary" @click="changeDone">全部标为已读</el-button>
      </el-tab-pane>

      <el-tab-pane :label="`已读消息(${list.length})`" name="2">
        <el-table
          :data="
            list.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          style="width: 100%"
        >
          <el-table-column prop="title"> </el-table-column>
          <el-table-column prop="create_time"> </el-table-column>
          <el-table-column prop="flag">
            <template slot-scope="scope">
              <el-button @click="changeDel(scope.row)" type="danger"
                >删除</el-button
              >
              <el-button type="info" @click="restore(scope.row)"
                >还原未读</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="list.length"
        >
        </el-pagination>
        <el-button type="danger" @click="delAll">删除全部</el-button>
      </el-tab-pane>

      <el-tab-pane :label="`回收站(${delList.length})`" name="3">
        <el-table
          :data="
            delList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          style="width: 100%"
        >
          <el-table-column prop="title"> </el-table-column>
          <el-table-column prop="create_time"> </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button @click="restoreDone(scope.$index, scope.row)"
                >还原</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="delList.length"
        >
        </el-pagination>
        <el-button type="danger" @click="del">清空回收站</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    return {
      activeName: "1",
      currentPage: 1,
      pageSize: 5,
    };
  },
  created() {
    this.getTabList();
  },

  computed: {
    ...mapState("tabList", {
      tabLists: (state) => state.tabLists,
      list: (state) => state.list,
      delList: (state) => state.delList,
    }),
  },
  methods: {
    ...mapMutations("tabList", [
      "changeDo",
      "delAl",
      "delLast",
      "restoreDo",
      "changeFl",
      "restor",
      "delOne",
    ]),
    // 全部标为已读
    changeDone() {
      this.changeDo();
    },
    // 还原未读
    restore(val) {
      this.restor(val);
    },
    // 删除全部
    delAll() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delAl();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 清空回收站
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delLast();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 还原已读
    restoreDone(i, val) {
      this.restoreDo({ i, val });
    },
    // 标为已读
    changeFlag(i, val) {
      this.changeFl({ i, val });
    },

    // 获取数据
    getTabList() {
      axios.get("/text.json").then((res) => {
        console.log(res);
        this.tabLists = res.data;
        console.log(this.tabLists);
      });
    },
    changeTab(val) {
      console.log(val);
    },
    // 删除
    changeDel(val) {
      console.log(val);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delOne(val);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style scoped lang='scss'>
</style>
