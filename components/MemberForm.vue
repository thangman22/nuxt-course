
<template>
  <el-form label-width="100px" :model="formData" :label-position="'left'">
    <el-form-item label="Username" prop="username">
      <el-input placeholder="Username" v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <el-input placeholder="Name" v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input placeholder="Email" v-model="formData.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        placeholder="Password"
        v-model="formData.password"
        show-password
      ></el-input>
    </el-form-item>
    <el-button type="success">Save</el-button>
  </el-form>
</template>

<script>
export default {
  name: "MemberForm",
  props: {
    formData: {
      type: Object,
      default: () => {
        return {
          username: "",
          password: "",
          name: "",
          email: "",
        };
      },
    },
  },
  mounted() {
    console.log(this.formData);
  },
};
</script>

<style>
</style>
