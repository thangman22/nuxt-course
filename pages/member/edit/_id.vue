<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header"> Edit new member</h1>
      <!-- TODO : Set event listener for save  -->
      <MemberForm :formData="form" mode="edit" @submit-form="saveMember" :error="memberEditingError"></MemberForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      memberEditingError: false,
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
  },
  methods: {
    async saveMember (data) {
      this.memberEditingError = false
      try {
        await this.$axios.put('/api/users', data)
      } catch (e) {
        this.memberEditingError = true
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
