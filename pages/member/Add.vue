<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header">Add new member</h1>
      <!-- TODO : Set event listener for save  -->
        <MemberForm :formData="formData" @form-submit="formSubmit"></MemberForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Add',
  methods: {
    async formSubmit(formData) {
       let respons = await this.$axios.post('/api/users/', {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      if(respons.status == 200){
        this.open('Success','เพิ่มข้อมูลสำเร็จ','success')
        this.$router.push({
          name: "member",
        });
      }
    },
    open(title,message,type) {
      this.$notify({
        title,
        message,
        type,
      });
    },
    
  },
  data () {
    return {
      formData: {
        username: '',
        name: '',
        email: '',
        password: ''
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
