<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header">Add new member</h1>
      <MemberForm :formData="form" @submit-form="saveMember" :error="memberAddingError"></MemberForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Add',
  methods: {
    async saveMember (data) {
      this.memberAddingError = false
      try {
        await this.$axios.post('/api/users', data)
        this.$router.push({
          name: 'member'
        })
      } catch (e) {
        this.memberAddingError = true
      }
    }
  },
  data () {
    return {
      memberAddingError: false,
      form: {
        username: '',
        password: '',
        name: '',
        email: ''
      }
    }
  }
}
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
