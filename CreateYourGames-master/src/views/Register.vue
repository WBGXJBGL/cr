<template>
  <div class="container">
    <!-- 轮播图 -->
    <div class="block">
      <el-carousel trigger="click" height="500px">
        <el-carousel-item v-for="item in pictureList" :key="item.id">
          <img :src="item.img" alt />
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <p>欢迎注册</p>
      <el-form-item prop="username" label-width="0">
        <span>用户名</span>
        <el-input @blur="goRUN" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="pass" label-width="0" style="margin-top:-15px;">
        <span>密码</span>
        <el-input type="password" name="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label-width="0" style="margin-top:-10px;">
        <span>确认密码</span>
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" @keyup.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="goLogin()">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 新增：验证确认密码的函数
    var CheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    // 新增：验证用户名的函数
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空！"));
      }
      // 可以根据实际需求添加更多用户名验证规则
      callback();
    };

    return {
      btnText: "获取验证码",
      Judge: true,
      pictureList: [
        { id: 1, img: require("../assets/images/home/newGame04.jpg") },
        { id: 2, img: require("../assets/images/home/newGame03.jpg") },
        { id: 3, img: require("../assets/images/home/newGame02.jpg") }
      ],
      ruleForm: {
        username: "",
        pass: "",
        password: ""
      },
      rules: {
        // 修改：将 validator 替换为 validateUsername 函数
        username: { validator: validateUsername, required: true, trigger: "blur" },
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6 - 16个字符", trigger: "blur" }
        ],
        // 修改：将 validator 替换为 CheckPass 函数
        password: {
          required: true,
          validator: CheckPass,
          message: "",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    submitForm(formName) {
      if (this.Judge === true) {
        this.$notify({
          title: '注册成功',
          message: '前往完善个人信息',
          type: 'success'
        });

        this.$api.register.register({
          username: this.ruleForm.username,
          password: this.ruleForm.pass
        });
        var obj = {
          username: this.ruleForm.username,
          password: this.ruleForm.pass
        };
        this.$store.commit("getToken", obj);
        this.$refs[formName].validate(valid => {
          if (valid) {//注释掉跳转到RegisterPerfect.vue 的代码
            // this.$router
            //   .push("/RegisterPerfect")
            //   .catch(err => console.log(err));
             // 跳转到登录界面,将完善个人资料先略过
             this.$router.push("/login").catch(err => console.log(err));
          } else {
            return false;
          }
        });
      } else {
        this.$confirm("该用户已被注册", "提示", {
          confirmButtonText: "重新注册",
          cancelButtonText: "返回登录",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "重新注册"
            });
            this.$router.push("/Register");
          })
          .catch(() => {
            this.$message({
              type: "success",
              message: "返回登录"
            });
            this.$router.push("/Login");
          });
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
    sendMessage() {
      if (this.btnDisabled) {
        return;
      }
      this.getSecond(60);
    },
    getSecond(wait) {
      let _this = this;
      let _wait = wait;
      if (wait == 0) {
        this.btnDisabled = false;
        this.btnText = "获取验证码";
        wait = _wait;
      } else {
        this.btnDisabled = true;
        this.btnText = "验证码(" + wait + "s)";
        wait--;
        setTimeout(function() {
          _this.getSecond(wait);
        }, 1000);
      }
    },
    // 修改：将 this.ruleForm.userPhone 替换为 this.ruleForm.username
    goRUN() {
      return this.$api.register
        .registerJudge(this.ruleForm.username)
        .then(res => {
          if (res == false) {
            this.Judge = false;
          }
          return res;
        });
    }
  }
};
</script>


<style lang="scss" scoped>
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

  .block {
    width: 400px;
    margin-right: 30px;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      //   line-height: 600px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }

  .el-form {
    width: 500px;
    padding: 20px 70px;
    border-radius: 10px;

    .el-form-item {
      span {
        color: white;
      }
    }
    .el-form-item:first-of-type {
      margin-top: 15px;
    }

    .el-form-item:last-of-type{
      width: 500px;
      display: flex;
      flex-direction: row;
      margin-left: -75px;
    }

    p {
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 24px;
      color: white;
      font-weight: bold;
    }

    .el-button {
      width: 150px;
      margin-right: 35px;
      border-radius: 50px;
      margin-top: 30px;
    }
  }
  

  // 手机验证、邮箱验证-内容
  .Verification-info {
    width: 400px;
    // 验证码样式的设置 start
    .buttonItem {
      border-radius: 5px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      border: 1px solid #ddd;
      width: 360px;
      input {
        width: 210px;
        height: 40px;
        font-size: 1rem;
        // padding-left: 10px;
        border: 0;
        outline: none;
      }
      .sendCode {
        width: 80px;
        border: 0;
        outline: none;
        background-color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>