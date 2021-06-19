<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header"> Edit new member</h1>
      <MemberForm :formData="form" mode="edit"></MemberForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  },
  name: 'Edit',
  async asyncData ({ $axios, params }) {
    const requestUser = await $axios.get('/api/users/' + params.id)
    return { user: requestUser.data.data }
  },
  mounted () {
    this.form = this.user
  }
}
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
