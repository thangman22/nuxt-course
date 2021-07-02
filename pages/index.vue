<template>
  <el-container class="custom-container">
    <el-main>
      <h1 class="centered header">Login</h1>
      <el-alert title="Login Error" type="error" v-if="loginError"> </el-alert>
      <el-form
        label-width="100px"
        :model="form"
        :label-position="'top'"
        @submit.native.prevent="login"
      >
        <el-form-item label="Username" prop="username">
          <el-input placeholder="Username" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            placeholder="Password"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <div class="centered">
          <el-button native-type="submit" type="success">Login</el-button>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      loginError: false,
    };
  },
  mounted() {},
  methods: {
    async login() {
      this.loginError = false;
      try {
        await this.$axios.post("/api/auth", {
          username: this.form.username,
          password: this.form.password,
        });
        this.$router.push({
          name: "member",
        });
      } catch (error) {
        this.loginError = true;
      }
    },
  },
};
</script>
<style scoped>
.centered {
  text-align: center;
}
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
.custom-container {
  max-width: 80vh;
  margin: auto;
}
</style>
