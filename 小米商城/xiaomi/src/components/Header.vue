
<template>
  <div>
    <div class="top">
      <ul>
        <li v-if="user.userName == ''">
          <span @click="login">登录</span>|
          <span @click="register">注册</span>
        </li>
        <li v-else>
          <span>欢迎 </span>
          <el-popover placement="top" width="260" v-model="visible">
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false"
                >取消</el-button
              >
              <el-button type="primary" size="mini" @click="outLogin"
                >确定</el-button
              >
            </div>
            <span slot="reference" class="user">{{ user.userName }}</span>
          </el-popover>
        </li>
        <li @click="myOrder" class="user">我的订单</li>
        <li @click="myCollect" class="user">我的收藏</li>
        <li
          :class="$store.getters.totalNum.number > 0 ? 'active' : 'car'"
          @click="myCar"
        >
          <i class="el-icon-shopping-cart-full"></i>
          <span class="user"
            >购物车({{ `${$store.getters.totalNum.number}` }})</span
          >
        </li>
      </ul>
    </div>

    <el-dialog
      :title="$store.state.isRegister ? '注册' : '登录'"
      center
      :visible.sync="$store.state.LoginDialog"
      width="300px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="ruleForm.userName"
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            status-icon
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            status-icon
          ></el-input>
        </el-form-item>
        <el-form-item prop="password1" v-if="$store.state.isRegister">
          <el-input
            v-model="ruleForm.password1"
            placeholder="请再次输入密码"
            prefix-icon="el-icon-lock"
            status-icon
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="width: 100%"
            >{{ $store.state.isRegister ? "注册" : "登录" }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "",
  components: {},
  data() {
    // 自定义校验规则
    var validateuserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.userName !== "") {
          let Regname = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
          if (Regname.test(value) == false) {
            callback(new Error("字母开头,允许5-16字节,允许字母数字下划线"));
          }
        }
        callback();
      }
    };
    // 自定义校验规则
    var validateuserPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password !== "") {
          let RegPass = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/;
          if (RegPass.test(value) == false) {
            callback(new Error("字母开头,允许6-18字节,允许字母数字下划线"));
          }
        }
        callback();
      }
    };
    var validateuserPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else {
        if (value !== this.ruleForm.password) {
          callback(new Error("两次输入密码不一致!"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        // 登录表单
        userName: "",
        password: "",
        password1: "",
      },
      visible: false,
      rules: {
        // 登录表单校验
        userName: [{ validator: validateuserName, trigger: "blur" }],
        password: [{ validator: validateuserPass, trigger: "blur" }],
        password1: [{ validator: validateuserPass, trigger: "blur" }],
      },
      user: {},
    };
  },
  created() {
    this.getUser();
  },
  computed: {
    ...mapGetters("carList", ["totalNum"]),
  },
  mounted() {},
  methods: {
    // 退出登录
    outLogin() {
      this.visible = false;
      localStorage.clear();
      this.getUser();
    },
    // 获取用户
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : { userName: "", user_id: "" };
    },
    // 登录
    login() {
      this.$store.state.LoginDialog = true;
      this.$store.state.isRegister = false;
    },
    // 注册
    register() {
      this.$store.state.LoginDialog = true;
      this.$store.state.isRegister = true;
    },
    // 我的订单
    myOrder() {
      if (this.user.userName == "") {
        this.$store.state.LoginDialog = true;
      } else {
        this.$router.push("/order");
      }
    },
    // 我的收藏
    myCollect() {
      if (this.user.userName == "") {
        this.$store.state.LoginDialog = true;
      } else {
        this.$router.push("/collect");
      }
    },
    // 购物车
    myCar() {
      if (this.user.userName == "") {
        this.$store.state.LoginDialog = true;
      } else {
        this.$router.push("/car");
      }
    },
    // 登录注册提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登录
          if (!this.$store.state.isRegister) {
            axios
              .post("users/login", {
                userName: this.ruleForm.userName,
                password: this.ruleForm.password,
              })
              .then((res) => {
                console.log(res);
                if (res.data.code == "001") {
                  localStorage.setItem("user", JSON.stringify(res.data.user));
                  this.$message.success("登录成功");
                  this.$store.state.LoginDialog = false;
                  this.getUser();
                } else {
                  this.$message.error(res.data.msg);
                }
              });
          } else {
            // 注册
            axios
              .post("users/register", {
                userName: this.ruleForm.userName,
                password: this.ruleForm.password,
              })
              .then((res) => {
                if (res.data.code == "001") {
                  this.$message.success("注册成功");
                  this.$store.state.LoginDialog = false;
                } else {
                  this.$message.error(res.data.msg);
                }
              });
          }
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
.active {
  background-color: #ff6700;
  color: white;
  padding: 0 10px;
}
.user:hover {
  color: white;
}
.el-button {
  width: 100%;
}

.top {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #3d3d3d;
  color: rgba(255, 255, 255, 0.762);
  position: relative;
  ul {
    position: absolute;
    right: 6%;
    top: 0;
    display: flex;
    li {
      list-style: none;
      margin: 0 15px;
    }
    .car {
      background-color: #424242;
      padding: 0 20px;
    }
  }
}
</style>
