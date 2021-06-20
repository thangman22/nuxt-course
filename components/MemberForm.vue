
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
    <el-form-item label="Password" prop="password" v-if="mode === 'create'">
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
    mode: {
      tyep: String,
      default: "create",
    },
    error: {
      type: Boolean,
    },
    formData: {
      type: Object,
      default: () => {
        return {
          username: "",
          password: "",
          name: "",
          email: "",
        };
      },
    },
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "Name is required",
            trigger: "blur",
          }
        ],
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur",
          }
        ],
        email: [
          {
            validator: (rule, value, callback) => {
              const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

              if(!value) {
                callback(new Error('Email is required'))
              }

              if(!re.test(String(value).toLowerCase())) {
                callback(new Error('Email is not valid'))
              } else {
                callback()
              }
            },
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    formSubmit() {
      this.$refs['member-form'].validate((valid) => {
        if(valid) {
          this.$emit("submit-form", this.formData);
        } else {
          return false;
        }
      })

    },
  },
  mounted() {
    console.log(this.formData);
  },
};
</script>

<style>
</style>
