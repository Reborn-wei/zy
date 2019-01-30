<template>
  <div class="box">
    <div class="content">
      <h2>用户登录</h2>
      <el-form
        label-position="top"
        :rules="rules"
        :model="loginObj"
        status-icon
        ref="loginRule"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="mybtn" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginObj: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginRule.validate(async valid => {
        if (valid) {
          var res = await this.$http.post("/login", this.loginObj);
          var { meta, data } = res.data;
          if (meta.status === 200) {
            this.$message({
              message: meta.msg,
              type: "success"
            });
            // 保存登录信息可以使用 localstorage
            // 保存 token
            window.localStorage.setItem("token", data.token);
            // 跳转到首页
            this.$router.push("/home");
          } else {
            this.$message.error(meta.msg);
          }
        } else {
          this.$message.error("参数不合法");
        }
      });
    }
  }
};
</script>

<style>
</style>
