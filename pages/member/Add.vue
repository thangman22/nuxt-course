<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1> Add new member</h1>
      <MemberForm :formData="form"></MemberForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Add',
  data () {
    return {
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
