<template>
  <el-col :span="16" :offset="4">
    <el-row class="header">
      <el-col :span="20">
        <h1>Member {{ count }}</h1>
      </el-col>
      <el-col :span="4"
        ><el-button
          type="success"
          @click="$router.push({ name: 'member-add' })"
        >
          Add
        </el-button>
      </el-col>
    </el-row>
    <no-ssr>
      <!-- TODO : Add no ssr for not render in Server  -->
      <data-tables
        v-loading="isLoading"
        :data="users"
        :total="count"
        :page-size.sync="pageSize"
        :current-page.sync="page"
        @current-page="(p) => (page = p)"
        @size-change="(ps) => (pageSize = ps)"
      >
        <div slot="empty" style="color: red">Users is empty</div>
        <el-table-column prop="username" label="Username" width="100">
        </el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column fixed="right" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row)">
              Edit
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteUser(scope.row.username)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </data-tables>
    </no-ssr>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      page: 1,
      pageSize: 20,
      count: 0,
      isLoading: false,
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    logEvent(d) {
      console.log(d);
    },
    editUser(row) {
      console.log(row);
      this.$router.push({
        name: "member-edit-id",
        params: {
          id: row._id,
        },
      });
    },
    async getUserList() {
      this.isLoading = true;
      await this.$axios
        .get("api/users", {
          params: {
            page_size: this.pageSize,
            page: this.page,
          },
        })
        .then((respond) => {
          console.log(respond.data);
          this.users = respond.data.results;
          this.count = respond.data.count;
        })
        .catch((err) => {
          this.$message({
            message: "Error get user list",
            type: "error",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async deleteUser(username) {
      this.isLoading = true;
      await this.$axios
        .delete(`api/users/${username}`)
        .then(async (result) => {
          this.$message({
            message: "Deleted user.",
            type: "success",
          });
          await this.getUserList();
        })
        .catch((err) => {
          this.$message({
            message: "Can not delete user.",
            type: "error",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  watch: {
    async page(p) {
      console.log(p);
      await this.getUserList();
    },
    async pageSize(ps) {
      console.log(ps);
      await this.getUserList();
    },
  },
};
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
