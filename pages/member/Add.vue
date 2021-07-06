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
    formSubmit(formData) {
      console.log('formData', formData)
      // ไม่ต้องใส่ async await ก็ได้ เพราะไม่ได้ไปไหน
      this.$axios.post('api/users/', {
        username: this.formData.username,
        name: this.formData.name,
        email: this.formData.email,
        password: this.formData.password
      })
      this.$router.push({
        name: "member"
      });
    }
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
