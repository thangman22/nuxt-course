
<template>
  <el-form label-width="100px" :model="formData" :label-position="'left'" @submit.native.prevent="formSubmit">
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
    <el-button type="success" native-type="submit">Save</el-button>
  </el-form>
</template>

<script>
export default {
  name: "MemberForm",
  props: {
    error: {
      type: Boolean
    },
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
  methods: {
    formSubmit () {
      this.$emit('submit-form', this.formData)
    }
  },
  mounted() {
    console.log(this.formData);
  },
};
</script>

<style>
</style>
