<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header"> Edit new member</h1>
      <MemberForm :formData="form" mode="edit" @submit-form="saveMember" :error="memberEditingError"></MemberForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      form:{
        email:this.$route.params.dataform.email,
        name:this.$route.params.dataform.name,
        username:this.$route.params.dataform.username,
      },
      memberEditingError:'Edit Error'
    }
  },
  name: 'Edit',
  async asyncData ({ $axios, params }) {

  },
  created(){
    console.log(this.$route.params.dataform)
  },
  mounted () {
    
  },
  methods: {
    async saveMember(formData){
      console.log(formData)
      const resp = await this.$axios.put('/api/users/', {
        username: formData.username,
        name: formData.name,
        email: formData.email
      })
      if(resp.status == 200){
        this.$router.go(-1)
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
