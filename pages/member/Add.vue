<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header">Add new member</h1>
      <!-- TODO : Set event listener for save  -->
      <MemberForm :formData="form" @submit-form="saveMember" :error="memberAddingError"></MemberForm>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Add',
  methods: {

  },
  data () {
    return {}
  }
}
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
