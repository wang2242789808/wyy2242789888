
<template>
  <div>
    <el-input style="width: 180px" placeholder="供应商名称"></el-input>
    <el-input style="width: 180px" placeholder="联系人"></el-input>
    <el-input style="width: 180px" placeholder="联系电话"></el-input>
    <el-button type="primary">查询</el-button>
    <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
    <el-button>重置</el-button>

    <el-table
      :data="tableData.slice((page - 1) * pageSize, page * pageSize)"
      border
      style="width: 100%"
      height="300"
    >
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="code" label="商品编码"> </el-table-column>
      <el-table-column prop="spec" label="商品规格"> </el-table-column>
      <el-table-column prop="retailPrice" label="零售价"> </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"> </el-table-column>
      <el-table-column prop="storageNum" label="库存数量"> </el-table-column>
      <el-table-column prop="supplierName" label="供应商"> </el-table-column>

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
      :title="isEdit ? '编辑商品' : '添加商品'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-input v-model="ruleForm.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="ruleForm.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价">
          <el-input v-model="ruleForm.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="ruleForm.storageNum"></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input
            v-model="ruleForm.supplierName"
            placeholder="选择供应商"
          ></el-input>
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
      queryInfo: {
        name: "",
        code: "",
        supplierName: "",
        supplierId: "",
      },
      total: 0,
      pageSize: 5,
      page: 1,
      ruleForm: {
        code: "",
        spec: "",
        name: "",
        retailPrice: 0,
        purchasePrice: 0,
        storageNum: 0,
        supplierName: "",
        id: null,
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        code: [
          { required: true, message: "商品编码不能为空", trigger: "blur" },
        ],
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        retailPrice: [
          { required: true, message: "零售价不能为空", trigger: "blur" },
        ],
      },
      isEdit: false,
      id: "",
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      http.post("/goods/list/search/1/10", this.queryInfo).then((res) => {
        console.log(res);
        this.tableData = res.data.rows;
        this.total = res.data.total;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.isEdit = true;
      this.dialogFormVisible = true;
      this.id = row.id;
      http.get(`/goods/${row.id}`).then((res) => {
        console.log(res);
        this.ruleForm.code = res.data.code;
        this.ruleForm.spec = res.data.spec;
        this.ruleForm.name = res.data.name;
        this.ruleForm.retailPrice = res.data.retailPrice;
        this.ruleForm.purchasePrice = res.data.purchasePrice;
        this.ruleForm.storageNum = res.data.storageNum;
        this.ruleForm.supplierName = res.data.supplierName;
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isEdit) {
            http.post("/goods", this.ruleForm).then((res) => {
              console.log(res);
              if (res.code == 2000) {
                this.$message.success("添加成功");
                this.getList();
              }
            });
          }else{
            
          }
          this.dialogFormVisible=false
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
