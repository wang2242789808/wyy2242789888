
<template>
  <div>
    <el-input style="width: 180px" placeholder="会员卡号" v-model="cardNum"></el-input>
    <el-input style="width: 180px" placeholder="会员名字" v-model="name"></el-input>
    <el-select v-model="payType" placeholder="支付类型" @change="changeSel">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-date-picker v-model="birthday" type="date" placeholder="选择日期">
    </el-date-picker>
    <el-button type="primary" @click="search">查询</el-button>
    <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
    <el-button @click="reset">重置</el-button>

    <el-table
      :data="tableData.slice((page - 1) * pageSize, page * pageSize)"
      height="300"
      border
      style="width: 100%"
    >
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span v-show="scope.row.payType == 1">现金</span>
          <span v-show="scope.row.payType == 2">微信</span>
          <span v-show="scope.row.payType == 3">支付宝</span>
          <span v-show="scope.row.payType == 4">银行卡</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"> </el-table-column>
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
      :title="isEdit ? '会员编辑' : '会员添加'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="ruleForm.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日">
          <el-date-picker
            v-model="ruleForm.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额">
          <el-input v-model="ruleForm.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分">
          <el-input v-model="ruleForm.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select
            v-model="ruleForm.payType"
            placeholder="支付类型"
            @change="changeSel"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="ruleForm.address"></el-input>
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
      cardNum: "",
      name: "",
      payType: "",
      birthday: "",
      options: [
        {
          value: "1",
          label: "现金",
        },
        {
          value: "2",
          label: "微信",
        },
        {
          value: "3",
          label: "支付宝",
        },
        {
          value: "4",
          label: "银行卡",
        },
      ],
      
      value2: "",
      tableData: [],
      queryInfo: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      pageSize: 5,
      page: 1,
      total: 0,

      dialogFormVisible: false,
      ruleForm: {
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: 0,
        integral: 0,
        payType: "",
        address: "",
        id: null,
      },
      formLabelWidth: "120px",
      rules: {
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "会员名不能为空", trigger: "blur" }],
        payType: [
          { required: true, message: "请选择支付类型", trigger: "blur" },
        ],
      },
      isEdit: false,
      id: "",
    };
  },
  created() {
    this.getTableList();
  },
  mounted() {},
  methods: {
    getTableList() {
      http.post("/member/list/search/1/20", this.queryInfo).then((res) => {
        // console.log(res);
        this.tableData = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 查询
    search(){
      http.post('/member/list/search/1/20',this.queryInfo).then(res =>{
        console.log(res);
        if(res.code==2000){
          this.$message.success('查询成功')
          this.getTableList()
        }
      })
    },
    // 重置
    reset(){
      this.cardNum=""
      this.name=""
      this.payType=""
      this.birthday=""
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.isEdit = true;
      this.dialogFormVisible = true;
      this.id = row.id;
      // console.log(this.id);
      http.get(`/member/${row.id}`).then((res) => {
        console.log(res);
        this.ruleForm.cardNum = res.data.cardNum;
        this.ruleForm.name = res.data.name;
        this.ruleForm.phone = res.data.phone;
        this.ruleForm.payType = res.data.payType;
        this.ruleForm.birthday = res.data.birthday;
        this.ruleForm.integral = res.data.integral;
        this.ruleForm.money = res.data.money;
        this.ruleForm.address = res.data.address;
      });
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
          http.delete(`/member/${row.id}`).then((res) => {
            console.log(res);
            if (res.code == 2000) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getTableList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    changeSel(val) {
      console.log(val);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isEdit) {
            http.post("/member", this.ruleForm).then((res) => {
              console.log(res);
              if (res.code == 2000) {
                this.$message.success("添加成功");
                this.getTableList();
              }
            });
          } else {
            http.put(`/member/${this.id}`, this.ruleForm).then((res) => {
              console.log(res);
              if (res.code == 2000) {
                this.$message.success("更新成功");
                this.getTableList();
              }
            });
          }
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style scoped lang='scss'>
.el-input {
  margin: 10px;
}
</style>
