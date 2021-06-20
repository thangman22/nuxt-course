<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="centered header">Login</h1>
        <el-alert
          title="Login Error"
          type="error" v-if="loginError">
        </el-alert>
      <el-form label-width="100px" :model="form" :label-position="'top'" @submit.native.prevent="login">
        <el-form-item label="Username" prop="username">
          <el-input placeholder="Username" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input placeholder="Password" v-model="form.password" show-password></el-input>
        </el-form-item>
        <div class="centered"><el-button native-type="submit" type="success">Login</el-button></div>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped>
.centered {
  text-align: center;
}
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
