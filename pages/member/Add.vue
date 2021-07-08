<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header">Add new member</h1>
      <MemberForm :formData="formData" @form-submit="formSubmit"></MemberForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Add",
  methods: {
    async formSubmit(formData) {
      console.log(formData);
      await this.$axios.post("/api/users/", {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      this.$router.push("/member");
    },
  },
  data() {
    return {
      formData: {
        username: "",
        name: "",
        email: "",
        password: "",
      },
    };
  },
};
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
