
<template>
  <el-form
    label-width="100px"
    :model="formData"
    :label-position="'left'"
    @submit.native.prevent="formSubmit"
    :rules="rules"
    ref="member-form"
  >
    <el-form-item label="Username" prop="username">
      <el-input
        placeholder="Username"
        v-model="formData.username"
        :disabled="mode === 'edit'"
      ></el-input>
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <el-input placeholder="Name" v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input placeholder="Email" v-model="formData.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password" v-if="mode !== 'edit'">
      <el-input
        placeholder="Password"
        v-model="formData.password"
        show-password
      ></el-input>
    </el-form-item>
    <el-button type="success" native-type="submit">Save</el-button>
  </el-form>
</template>

<script>
export default {
  name: "MemberForm",
  props: {
    formData :{
      type : Object,
      default:() =>{}
    },
    mode :{
      type : String,
      default :''
    }
  },
  data() {
    return {
      checkpass:false,
      checkemail:false,
      form : {},
       rules: {
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rul, value, callback) => {
              const rule = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

              if(!rule.test(String(value).toLowerCase())) {
                callback(new Error('Email is not valid'))
              } else {
                this.checkemail = true
                callback()
              }
            }
          }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
              {
            trigger: 'blur',
            validator: (rul, value, callback) => {
              const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
              if(!strongRegex.test(value)) {
                callback(new Error('Password is not strong'))
              } else {
                this.checkpass = true
                callback()
              }
            }
          }
        ],
        username: [
          { required: true, message: 'Please input username', trigger: 'blur' },
          { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
    this.form = this.formData
    //ค่าเริ่มต้น
  },

  methods: {
    formSubmit(){
      console.log(this.checkpass,this.checkemail)
      if(this.mode === 'edit'){
         this.$emit('form-submit',this.form)
            this.$router.push({
              name : 'member'
            })

      }else{
              if(this.checkpass == true && this.checkemail == true){
          this.$notify({
          title: 'เพิ่มข้อมูลสำเร็จ',
          type: 'success'
        });
          this.$emit('form-submit',this.form)
            this.$router.push({
              name : 'member'
            })
      }else{
          this.$notify.error({
          title: 'ไม่สามารถเพิ่มได้',
          message: 'กรุณาตรวจสอบข้อมูลของท่าน'
        });
      }

      }
    }
  },
};
</script>

<style>
</style>
