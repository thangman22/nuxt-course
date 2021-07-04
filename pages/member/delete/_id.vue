<template>
  <el-row>
     <el-col :span="6" :offset="9">
      <h1 class="header"> DELETING member. . .</h1>
      <!-- TODO : Set event listener for save  -->
      <!-- <MemberForm :formData="form" mode="edit" @form-submit="saveMember" :error="memberEditingError"></MemberForm>  -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  name: 'Delete',
  async asyncData ({ $axios, params }) {
    const formRequest = await $axios.get('/api/users/' + params.id)
    return {form: formRequest.data.data }
  },
  mounted () {
    console.log(this.$route.params)
    this.deleteMember()
  },
  methods: {
    async deleteMember () {
      let res = await this.$axios.delete(`/api/users/${this.$route.params.id}`)
                  this.$router.push({
                name : 'member'
              })

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
