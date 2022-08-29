
<template>
  <div>
    <div class="box">
      <div class="login-box">
        <h2>用户登录</h2>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item  prop="username">
            <el-input clear="ipt1" v-model="ruleForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input v-model="ruleForm.password" prefix-icon="el-icon-s-goods" suffix-icon=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
<div class="bottom">
  
        <p>测试权限账号：</p>
<p>提供三种权限账号：</p>
<p>1. 超级管理员账号： super-admin</p>
<p>2. 管理员账号：admin</p>
<p>3. 测试可配置账号：test</p>
<p>密码统一为：123456</p>
<p>导入用户账号：</p>
<p>可使用导入的用户名登录</p>
<p>密码统一为：123456</p>
<p>注意：导入用户区分中英文库！！！！</p>
</div>
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
      ruleForm: {
        username: "",
        password:""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.ruleForm.username=="admin"&&this.ruleForm.password=="123456"){
              sessionStorage.setItem('token',this.ruleForm.username)
              this.$message.success('登录成功')
          }
          this.$router.push('/about')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  
  },
};
</script>
<style scoped lang='scss'>
.bottom{
  margin-left: 100px;
}
.login-btn{
    width: 100%;
}
.ipt1{
    position: relative;
}

.box {
  width: 100%;
  min-height: 100vh;
  background-color: #313848;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 500px;
    height: 300px;
    color: white;
    h2 {
      font-weight: 400;
      margin: 10px 0 25px 250px;
    }
  }
}
</style>
