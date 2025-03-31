<template>
  <div class="container">
    <div class="left">
      <div class="txt">
        <p>回到主页</p>
        <p>请登录</p>
        <button @click="backHome">我要回主页！</button>
      </div>
    </div>

    <div class="right">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="75px"
        class="demo-ruleForm"
      >
        <p class="title">游戏资料分享平台</p>
        <el-form-item prop="username" class="form" label-width="24px">
          <span>用户名</span>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form" label-width="38px">
          <span>密码</span>
          <!-- 回车自动登录 -->
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>

        <p class="check">
          <input type="checkbox" id="check-pwd" v-model="ruleForm.rem" />
          <span>记住密码</span>
          <span @click="Password" style="cursor: pointer;">找回密码</span>
        </p>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="primary" @click="Register()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var UsernameValue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        rem: false
      },
      rules: {
        username: { required: true, trigger: "blur", validator: UsernameValue },
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6 - 16个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.ruleForm.rem = this.$store.state.rememberPwd;
    if (this.$store.state.token) {
      console.log("走了token");
      this.ruleForm.username = this.$store.state.token.loginName;
      this.ruleForm.password = this.$store.state.token.pwd;
    } else {
      console.log("走了cookie");
      this.getCookie();
    }
  },
  methods: {
    backHome() {
      this.$router.push("/");
    },
    // 游戏库跳转
    toGameCenter() {
      this.$router.push("/GameCenter");
    },
    // 排行榜跳转
    toRankingList() {
      this.$router.push("/RankingList");
    },
    // 提交建议跳转
    toSuggest() {
      this.$router.push("/Suggest");
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.rem === true) {
            this.$store.state.rememberPwd = true;
            this.setCookie(
              this.ruleForm.username,
              this.ruleForm.password,
              this.ruleForm.rem,
              7
            );
          } else {
            console.log("未保存密码");
            this.$store.state.rememberPwd = false;
            this.clearCookie();
          }

          this.$api.login
  .login({
    username: this.ruleForm.username,
    password: this.ruleForm.password
  })
  .then(res => {
    if (res && res.success) { // 修改判断逻辑
      const obj = {
        loginName: this.ruleForm.username,
        pwd: this.ruleForm.password
      };
      this.$store.commit("getToken", obj);
      this.$message({
        message: "登录成功",
        type: "success"
      });
      if (this.$store.state.newRouter) {
        this.$router.push(`${this.$store.state.newRouter}`);
      } else {
        this.$router.push("/").catch(err => console.log(err));
      }
    } else {
      this.$message.error("该用户不存在或密码错误");
    }
  })
  .catch(error => {
    console.error("登录请求出错:", error);
    this.$message.error("登录请求出错，请稍后重试");
  });
        }
      });
    },
    getCookie() {
      var arr = document.cookie.split("; ");
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] === "username") {
          this.ruleForm.username = arr2[1];
        } else if (arr2[0] === "password") {
          this.ruleForm.password = arr2[1];
        } else if (arr2[0] === "userPwdStatus") {
          if (arr2[1] === "true") {
            this.ruleForm.rem = true;
          } else {
            this.ruleForm.rem = false;
          }
        }
      }
    },
    // 清除 cookie
    clearCookie() {
      this.setCookie("", "", -1);
    },
    Register() {
      this.$router.push("/Register");
    },
    Password() {
      this.$router.push("/Login/SafetyCenter");
    },
    setCookie(c_name, c_pwd, c_status, exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      window.document.cookie =
        "username=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwdStatus=" + c_status + ";path=/;expires=" + exdate.toGMTString();
    }
  },
  created() {}
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login/bg.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .left {
    background: rgba(255, 255, 255, 0.6);
    width: 380px;
    height: 520px;
    // background-color: white;
    border-right: solid 0.2px #d1d1d1;
    // margin-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .txt {
      width: 300px;
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p:first-of-type {
        color: #c8a080;
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 60px;
      }
      p:last-of-type {
        color: rgb(221, 179, 144);
        font-size: 16px;
        // margin-top: 60px;
        margin-bottom: 60px;
        text-align: center;
      }

      button {
        width: 200px;
        height: 38px;
        border-radius: 25px;
        border: none;
        background-color: rgb(240, 191, 150);
        color: white;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          background-color: rgba(240, 191, 150, 0.9);
        }
      }
    }
  }
  .right {
    .el-form {
      width: 380px;
      height: 520px;
      padding: 20px 20px 20px 0;
      background: rgba(255, 255, 255, 0.6);
      // background-color: #fff;

      //文字：createyourgames
      p:first-of-type {
        width: 100%;
        margin-top: 30px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 28px;
        color: black;
        font-weight: bold;
        margin-left: 10px;
      }

      //input的设置:账号距离上面的距离
      .el-form-item:first-of-type {
        margin-top: 42px;
      }
      //   .el-form-item__error {
      //     margin-left: 125px !important;
      //   }

      //input的设置:账号、密码
      .form {
        span {
          margin-right: 25px;
        }
        .el-input {
          width: 240px;
          height: 30px;
        }
      }

      //文字：记住密码，找回密码的设置
      p.check {
        margin-top: 35px;
        width: 100%;
        height: 42px;
        line-height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          margin-left: 15px;
          margin-right: 5px;
          width: 16px;
          height: 16px;
        }
        span:first-of-type {
          margin-right: 60px;
        }
        span {
          line-height: 42px;
          font-size: 14px;
          color: black;
        }
      }

      //button按钮的设置,signin register
      .el-form-item:last-of-type {
        margin-top: 35px;
        margin-left: -20px;
      }
      .el-button {
        width: 120px;
        margin-right: 20px;
      }
    }
  }
}
</style>