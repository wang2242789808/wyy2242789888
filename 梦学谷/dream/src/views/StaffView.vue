
<template>
  <div>
    <el-input style="width: 180px" placeholder="账号" v-model="username"></el-input>
    <el-input style="width: 180px" placeholder="姓名" v-model="name"></el-input>
    <el-button type="primary" @click="search">查询</el-button>
    <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
    <el-button @click="reset">重置</el-button>

    <el-table
      :data="tableData.slice((page - 1) * pageSize, page * pageSize)"
      border
      style="width: 100%"
      height="400"
    >
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="salary" label="薪酬"> </el-table-column>
      <el-table-column prop="entryDate" label="入职时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      :title="isEdit ? '员工编辑' : '员工添加'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="年龄">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="薪酬">
          <el-input v-model="ruleForm.salary"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker
            v-model="ruleForm.entryDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import http from "../utils/http";
export default {
  name: "",
  components: {},

  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 5,
      total: 0,
      username:"",
      name:"",
      queryInfo: {
        username: "",
        name: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      ruleForm: {
        username: "",
        name: "",
        mobile: "",
        age: "",
        salary: "",
        id: null,
        entryDate: "",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
      isEdit: false,
      id: "",
      value1: "",
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      http.post("/staff/list/search/1/10", this.queryInfo).then((res) => {
        console.log(res);
        this.tableData = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 查询
    search(){
      http.post('/staff/list/search/1/10',this.queryInfo).then(res =>{
        console.log(res);
        if(res.code==2000){
          this.$message.success('查询成功')
          this.getData()
        }
      })
    },
    // 重置
    reset(){
      this.username=""
      this.name=""
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.isEdit = true;
      this.dialogFormVisible = true;
      this.id = row.id;
      this.ruleForm.username = row.username;
      this.ruleForm.name = row.name;
      this.ruleForm.age = row.age;
      this.ruleForm.mobile = row.mobile;
      this.ruleForm.salary = row.salary;
      this.ruleForm.entryDate = row.entryDate;
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          http.delete(`/staff/${row.id}`).then((res) => {
            console.log(res);
            this.getData();
          });
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
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    // 提交 
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isEdit) {
            // 添加
            http.post("/staff", this.ruleForm).then((res) => {
              console.log(res);
              if (res.code == 2000) {
                this.$message.success("添加成功");
                this.getData();
                this.dialogFormVisible = false;
              }
            });
          } else {
            // 编辑提交
            http.put(`/staff/${this.id}`, this.ruleForm).then((res) => {
              console.log(res);
              if (res.code == 2000) {
                this.$message.success("修改成功");
                this.getData();
                this.dialogFormVisible = false;
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped lang='scss'>
</style>
