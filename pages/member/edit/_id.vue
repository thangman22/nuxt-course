<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header"> Edit new member</h1>
      <!-- TODO : Set event listener for save  -->
      <!-- <MemberForm :formData="form" mode="edit" @submit-form="saveMember" :error="memberEditingError"></MemberForm> -->
      <MemberForm :formData="form" mode="edit" @submit-form="saveMember" ></MemberForm>
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
    return {form: formRequest.data.data}
  },
  mounted () {
    console.log(this.form)
  },
  methods: {
    async saveMember(data) {
      let res = await this.$axios.put('/api/users', {
        username: this.$route.params.id,
        name: data.name,
        email: data.email,
      })
      console.log(res)
      if (res.status === 200) {
        this.$router.push({
          name: 'member',
          params: {
            id: data.username
          }
        })
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
