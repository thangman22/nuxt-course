<template>
  <el-row>
    <el-col :span="6" :offset="9">
      {{form}}
      <h1 class="header"> Edit new member</h1>
      <!-- TODO : Set event listener for save  -->
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
      const userRequest = await $axios.get('/api/users/'+params.id)
      return { form: userRequest.data.data}
  },
  mounted () {

  },
  methods: {
    async saveMember(form){
      console.log(form);
      console.log(this.$route.params.id);
      const statusCode = await this.$axios.put('/api/users',{
        email: this.form.email,
        name: this.form.name,
        username: this.$route.params.id
      })
      if(statusCode.status == 200){
        
      }
    }
  },
}
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
