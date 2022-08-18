
<template>
<div>
    <el-input style="width: 180px" placeholder="供应商名称" v-model="name"></el-input>
    <el-input style="width: 180px" placeholder="联系人" v-model="linkman"></el-input>
    <el-input style="width: 180px" placeholder="联系电话" v-model="mobile"></el-input>
    <el-button type="primary" @click="search">查询</el-button>
    <el-button type="primary" @click="dialogFormVisible=true">新增</el-button>
    <el-button @click="reset">重置</el-button>


 <el-table
      :data="tableData.slice((page-1)*pageSize,page*pageSize)"
      border
      style="width: 100%"
      height="300"
    >
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column prop="name" label="供应商名称"> </el-table-column>
      <el-table-column prop="linkman" label="联系人"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
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
      :title="isEdit ? '供应商编辑' : '供应商添加'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="供应商名称" prop="linkman">
          <el-input v-model="ruleForm.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
       
        <el-form-item label="联系电话">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
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
import http from '../utils/http'
export default {
  name: '',
  components: {},
  data () {
    return {
      tableData:[],
      linkman:"",
        mobile:"",
        name:"",
      queryInfo:{
        linkman:"",
        mobile:"",
        name:""
      },
      pageSize:5,
      page:1,
      total:0,
       ruleForm: {
        linkman:"",
        mobile:"",
        name:"",
        remark:"",
        id:null
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        linkman: [{ required: true, message: "联系人不能为空", trigger: "blur" }],
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
      },
      isEdit: false,
      id:""
    }
  },
  created () { 
    this.getList()
  },
  mounted () { },
  methods: {
    getList(){
      http.post('/supplier/list/search/1/20',this.queryInfo).then(res =>{
        console.log(res);
        this.tableData=res.data.rows
        this.total=res.data.total
      })
    },
    // 查询
    search(){
      http.post('/supplier/list/search/1/10',this.queryInfo).then(res =>{
        console.log(res);
        if(res.code==2000){
          this.$message.success('查询成功')
          this.getList()
        }
      })
    },
    // 重置
    reset(){
     this.linkman=""
     this.name=""
     this.mobile=""
    },
    handleSizeChange(val) {
        this.pageSize=val
      },
      handleCurrentChange(val) {
        this.page=val
      },
      // 编辑
       handleEdit(index, row) {
        console.log(index, row);
        this.isEdit=true
        this.dialogFormVisible=true
        this.id=row.id
        http.get(`/supplier/${row.id}`).then(res =>{
          console.log(res);
          this.ruleForm.linkman=res.data.linkman
          this.ruleForm.mobile=res.data.mobile
          this.ruleForm.name=res.data.name
          this.ruleForm.remark=res.data.remark
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
         this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          http.delete(`/supplier/${row.id}`).then((res) => {
            console.log(res);
            if (res.code == 2000) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList();
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           if(!this.isEdit){
             http.post('/supplier',this.ruleForm).then(res =>{
              //  console.log(res);
               if(res.code==2000){
                 this.$message.success('新增成功')
                 this.getList()
               }
             })
           }else{
             http.put(`/supplier/${this.id}`,this.ruleForm).then(res =>{
               console.log(res);
               if(res.code==2000){
                 this.$message.success('修改成功')
                 this.getList()
               }
             })
           }
           this.dialogFormVisible=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>
<style scoped lang='scss'>
.el-input{
  margin: 10px;
}
</style>
