<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header"> Edit Member data</h1>
      <!-- TODO : Set event listener for save  -->
      <MemberForm :formData="form" mode="edit" @form-submit="saveMember"></MemberForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  name: 'Edit',
  async asyncData ({ $axios, params }) {
    const formRequest = await $axios.get('/api/users/' + params.id)
    return { form: formRequest.data.data }
  },
  mounted () {
    console.log(this.form)
  },
  methods: {
    async saveMember (data) {
      await this.$axios.patch(`api/user/${this.$route.params.id}`, data)
      this.$router.push({ name: "member" });
    },
  }
}
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
