<template>
  <el-row>
     <el-col :span="6" :offset="9">
      <h1 class="header"> Edit new member</h1> -->
      <!-- TODO : Set event listener for save  -->
      <MemberForm :formData="form" mode="edit" @form-submit="saveMember" :error="memberEditingError"></MemberForm> 
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
    return {form: formRequest.data.data }
  },
  mounted () {
    console.log(this.$route.params)
  },
  methods: {
    async saveMember (user) {
      console.log("tessss " + this.$route.params.id)
      let res = await this.$axios.put(`/api/users`,{
          username : this.$route.params.id,
          name: user.name,
          email: user.email,
        })
        console.log(res)
        if(!res.status == 200){
           console.log("can not edit")

        }else{
             console.log("success")
              this.$notify({
                  title: 'แก้ไขข้อมูลสำเร็จ',
                  type: 'success'
               });
              this.$emit('form-submit',this.form)
              this.$router.push({
                name : 'member'
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
