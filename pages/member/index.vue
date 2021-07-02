<template>
  <el-col :span="16" :offset="4">
    <el-row class="header">
      <el-col :span="20"><h1>Member</h1></el-col>
      <el-col :span="4"
        ><el-button type="success" @click="$router.push({ name: 'member-add' })">Add</el-button
        ></el-col
      >
    </el-row>
    <no-ssr>
      <!-- <data-tables :data="users" :total="10" @sort-change="sort" @current-page="currentPage" @size-change="sizeChange"> -->
      <data-tables :data="users" :total="users.length" @size-change="sizeChange" @sort-change="sort">
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
import axios from 'axios'
export default {
  methods: {
    sort(){
      console.log('size')
    },
    currentPage(){
      console.log('cuurentPage')
    },
    async sizeChange(size){
      const userRequest = await axios.get('/api/users' , {params:{size: size}})
      console.log(userRequest)
      this.users = userRequest.data.data
      // return { users: userRequest.data.data}
    },
    editUser(row){
      console.log(row)
      this.$router.push({
        name: 'member-edit-id',
        params:{
          id: row.username
        }
      })
    }
  },
  async asyncData({ $axios }) {
    const userRequest = await $axios.get('/api/users')
    console.log(userRequest)
    return { users: userRequest.data.data}


  },
};
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
