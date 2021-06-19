<template>
  <el-col :span="16" :offset="4">
    <el-row class="header">
      <el-col :span="20"><h1>Member</h1></el-col>
      <el-col :span="4"
        ><el-button type="success" @click="$router.push({ name: 'member-Add' })"
          >Add</el-button
        ></el-col
      >
    </el-row>
    <no-ssr>
      <data-tables :data="users" :total="10">
        <div slot="empty" style="color: red">Users is empty</div>
        <el-table-column prop="username" label="Username" width="200" sortable>
        </el-table-column>
        <el-table-column prop="name" label="Name" width="400" sortable>
        </el-table-column>
        <el-table-column prop="email" label="Email" width="200" sortable>
        </el-table-column>
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row)">Edit</el-button>
            <el-button type="text" size="small">Delete</el-button>
          </template>
        </el-table-column>
      </data-tables>
    </no-ssr>
  </el-col>
</template>

<script>
export default {
  methods: {
    editUser (data) {
      this.$router.push({
        name: 'member-edit-id',
        params: {
          id: data.username
        }
      })
    }
  },
  async asyncData({ $axios }) {
    const requestUser = await $axios.get("/api/users");
    return { users: requestUser.data.data };
  },
};
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
