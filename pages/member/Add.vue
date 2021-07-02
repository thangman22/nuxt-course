<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header">Add new member</h1>
      <!-- TODO : Set event listener for save  -->
      <member-form :formData="formData" @form-submit="formSubmit" />
    </el-col>
  </el-row>
</template>

<script>
import MemberForm from "../../components/MemberForm.vue";
export default {
  components: { MemberForm },
  name: "Add",
  methods: {
    formSubmit(dataFromEdit) {
      if (dataFromEdit) this.formData = dataFromEdit;
      console.log(this.formData);
      this.$axios
        .post("api/users/", {
          username: this.formData.username,
          name: this.formData.name,
          email: this.formData.email,
          password: this.formData.password,
        })
        .then((result) => {
          this.$message({
            message: "Created user.",
            type: "success",
          });
          this.$router.push({
            name: "member",
          });
        })
        .catch((err) => {
          this.$message({
            message: `Error can not create user. ${err.respond.data}`,
            type: "error",
          });
        });
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
      mode: "",
      rules: [],
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
