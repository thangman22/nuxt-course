<template>
  <el-row>
    <!-- <el-col :span="6" :offset="9">
      <h1 class="header"> Edit new member</h1> -->
      <!-- TODO : Set event listener for save  -->
      <!-- <MemberForm :formData="form" mode="edit" @submit-form="saveMember" :error="memberEditingError"></MemberForm> -->
    <!-- </el-col> -->
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

  },
  mounted () {

  },
  methods: {
  }
}
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
