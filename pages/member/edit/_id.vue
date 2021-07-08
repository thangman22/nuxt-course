<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header">Edit new member</h1>
      <!-- TODO : Set event listener for save  -->
      <MemberForm
        :formData="form"
        mode="edit"
        @submit-form="saveMember"
      ></MemberForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        name: "",
        email: "",
      },
    };
  },
  name: "Edit",
  async asyncData({ $axios, params }) {
    const formRequest = await $axios.get("/api/users/" + params.id);
    return { form: formRequest.data.data };
  },
  mounted() {},
  methods: {
    async saveMember(form, params) {
      try {
        await this.$axios.put("/api/users", {
          username: form.username,
          name: form.name,
          email: form.email,
        });
      } catch (err) {
        console.log(err);
      }
      this.$router.push("/member");
    },
  },
};
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
