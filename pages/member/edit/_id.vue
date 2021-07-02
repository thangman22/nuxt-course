<template>
  <el-container>
    <el-main class="custom-container">
      <h1 class="header">Edit new member</h1>
      <!-- TODO : Set event listener for save  -->
      <MemberForm
        :formData="form"
        mode="edit"
        @form-submit="saveMember"
        :error="memberEditingError"
      ></MemberForm>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      memberEditingError: false,
    };
  },
  name: "Edit",
  head() {
    return {
      title: `Edit: ${this.form.name}`,
    };
  },
  async asyncData({ $axios, params }) {
    const formRes = await $axios.get(`api/users/${params.id}`);
    return { form: formRes.data.data };
  },
  mounted() {},
  methods: {
    async saveMember(formData) {
      return await this.$axios
        .put(`api/users/${this.$route.params.id}`, formData)
        .then((result) => {
          this.$message({
            message: "Updated user.",
            type: "success",
          });
          this.$router.push({ name: "member" });
        })
        .catch((err) => {
          this.$message({
            message: "Can not update user.",
            type: "error",
          });
        });
    },
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
