
<template>
  <el-form
    label-width="100px"
    :model="form"
    :label-position="'left'"
    @submit.native.prevent="formSubmit"
    :rules="rules"
    ref="member-form"
  >
    <el-form-item label="Username" prop="username">
      <el-input
        placeholder="Username"
        v-model="form.username"
        :disabled="mode === 'edit'"
      ></el-input>
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <el-input placeholder="Name" v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input placeholder="Email" v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password" v-if="mode !== 'edit'">
      <el-input
        placeholder="Password"
        v-model="form.password"
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
    formData: {
      type: Object,
      default: () => {},
    },
    mode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      form: {},
      rules: {
        name: [
          { required: true, message: "Please input name", trigger: "blur" },
        ],
        email: [
          { required: true, message: "Please input email", trigger: "blur" },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              if (!re.test(String(value).toLowerCase())) {
                callback(new Error("Email is not valid"))
              } else {
                callback()
              }
            },
          },
        ],
        password: [
          { required: true, message: "Please input password", trigger: "blur" },
        ],
        username: [
          { required: true, message: "Please input username", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "Length should be 3 to 20",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.form = this.formData;
  },
  methods: {
    formSubmit() {
      this.$refs["member-form"].validate((valid) => {
        if (valid) {
          this.$emit("form-submit", this.form);
        }
      });
    },
  },
};
</script>

<style>
</style>
