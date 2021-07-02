<template>
  <el-container class="custom-container">
    <el-main>
      <h1 class="header">Add new member</h1>
      <!-- TODO : Set event listener for save  -->
      <member-form :formData="formData" @form-submit="formSubmit" />
    </el-main>
  </el-container>
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
          console.log(result);
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

.custom-container {
  max-width: 80vh;
  margin: auto;
}
</style>
