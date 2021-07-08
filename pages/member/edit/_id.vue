<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header"> Edit new member</h1> 
      <!-- TODO : Set event listener for save  -->
      <!-- <MemberForm  mode="edit" @submit-form="saveMember"></MemberForm> -->
            <MemberForm :formData="form" mode="edit" @form-submit="saveMember" :error="memberEditingError"></MemberForm>

    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Edit',
  async asyncData ({ $axios, params }) {
    const formRequest = await $axios.get('/api/users/' + params.id)
    return {form: formRequest.data.data }
  },
  mounted () {
    console.log(this.$route.params.id)

  },
  data () {
    return {
      formData: {
        name: '',
        email: ''
      },
      form:{}
    }
  },
  methods: {
    async saveMember(formData){
      console.log(this.$route.params.id)
      let response = await this.$axios.put(`/api/users` , {
        username : this.$route.params.id,
        name: formData.name,
        email: formData.email,
      })
      if(response.status == 200){
        this.open('Success','อัปเดตสำเร็จ','success')
        this.$router.push({
          name: "member",
        });
      }
    },
    memberEditingError(){
      this.open('Error','อัปเดตไม่สำเร็จ','error')
    },
    open(title,message,type) {
        this.$notify({
          title,
          message,
          type,
        });
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
