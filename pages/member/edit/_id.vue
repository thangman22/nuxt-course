<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header">Edit new member</h1>
      <!-- TODO : Set event listener for save  -->
      <MemberForm
        :formData="form"
        mode="edit"
        @submit-form="saveMember"
        :error="memberEditingError"
      ></MemberForm>
    </el-col>
  </el-row>
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
      return await $axios
        .put(`api/users/${params.id}`, formData)
        .then((result) => {
          $router.push({ name: "member" })
        })
        .catch((err) => {});
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
