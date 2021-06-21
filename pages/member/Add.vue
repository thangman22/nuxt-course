<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <h1 class="header">Add new member</h1>
      <!-- TODO : Set event listener for save  -->
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
