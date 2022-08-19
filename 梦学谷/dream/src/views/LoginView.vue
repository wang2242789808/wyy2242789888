
<template>
  <div>
    <div class="box">
      <div class="login-box">
        <h2>梦学谷会员管理系统</h2>
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
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
  </el-form-item>
        </el-form>
       
      </div>
    </div>
  </div>
</template>

<script>
import http from "../utils/http";
export default {
  name: "",
  components: {},
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
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
             http
        .post("/user/login", this.ruleForm)
        .then((res) => {
          console.log(res);
          if(res.code==2000){
              this.$message({
                  message:"登录成功",
                  type:'success'
              })
              sessionStorage.setItem('token',res.data.token)
              this.$router.push('/about')
          }else{
              this.$message.error(res.message)
          }
        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>
<style scoped lang='scss'>
.box {
  width: 100%;
  height: 100vh;
  background: url('/public/11.png');
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 500px;
    height: 350px;
    padding: 20px;
    text-align: center;
    background-color: #d0d1dadf;
    border-radius: 15px;
    .el-form {
      margin-top: 20px;
    }
  }
}
</style>
