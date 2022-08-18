
<template>
  <div>
    
    <!-- 搜索区域 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="学员状态">
        <el-select v-model="value" placeholder="请选择" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学生姓名">
        <el-input
          v-model="userName"
          placeholder="请输入学生关键字"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="tel"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" @click="searchAll">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-edit" @click="close">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary">新增学员</el-button>
    <el-button type="primary">批量导入</el-button>
    <el-button type="primary">批量导出</el-button>
    <el-button type="primary">查看报表</el-button>
    <!-- 表格区域 -->
    <el-table
      :data="tableData.slice((page - 1) * pageSize, page * pageSize)"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      border
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="学生名称">
        <template slot-scope="scope">
          <p class="pic-box">
            <img class="pic" :src="scope.row.avatar" alt="" />
            {{ scope.row.nickname }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column label="状态" width="95">
        <template slot-scope="scope">
          {{ scope.row.status == 0 ? "禁用" : "启用" }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.created_at | time }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">详情-</el-button>
          <el-button type="text">编辑-</el-button>
          <el-button type="text">
            {{ scope.row.status == 0 ? "启用-" : "禁用-" }}
          </el-button>
          <el-button type="text">删除-</el-button>
          <el-button type="text">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="bottom">
      <el-button type="text">导出所选</el-button>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      options: [
        {
          value: "1",
          label: "启用",
        },
        {
          value: "0",
          label: "禁用",
        },
      ],
      value: "",
      userName: "",
      tel: "",
      tableData: [],
      catchData: [],
      pageSize: 5,
      page: 1,
    };
  },
  filters: {
    time(value) {
      return new Date(value * 1000).toLocaleString();
    },
  },
  created() {
    axios.get("/list.json").then((res) => {
      console.log(res);
      this.tableData = res.data;
      this.catchData = res.data;
    });
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    // 搜索
    searchAll() {
      if (this.value) {
        this.tableData = this.catchData.filter(
          (item) => item.status == this.value
        );
      }
      if (this.userName) {
        this.tableData = this.catchData.filter((item) =>
          item.nickname.includes(this.userName)
        );
      }
      if (this.tel) {
        this.tableData = this.catchData.filter((item) =>
          item.mobile.includes(this.tel)
        );
      }
      if (this.value && this.userName && this.tel) {
        this.tableData = this.catchData.filter(
          (item) =>
            item.status == this.value &&
            item.nickname.includes(this.userName) &&
            item.mobile.includes(this.tel)
        );
      }
    },
    // 重置
    close() {
      this.tableData = this.catchData;
      this.value = "";
      this.userName = "";
      this.tel = "";
    },
  },
};
</script>
<style scoped lang='scss'>
.bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h3 {
  color: #333;
  display: block;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}
.el-table {
  margin: 15px 0;
  
}

.el-form{
  margin-top: 10px;
}
.pic-box {
  display: flex;
  align-items: center;
}
.pic {
  width: 20%;
  margin-right: 15px;
}
</style>
