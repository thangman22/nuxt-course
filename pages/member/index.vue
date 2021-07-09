<template>
  <el-col :span="16" :offset="4">
    <el-row class="header">
      <el-col :span="20"><h1>Member</h1></el-col>
      <el-col :span="4"
        ><el-button type="success" @click="$router.push({ name: 'member-add' })"
          >Add</el-button
        ></el-col
      >
    </el-row>
    <no-ssr>
      <el-table :data="displayData" style="width: 100%">
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
            <el-button type="text" size="small" @click="deleteUser(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
        </el-table>
        <el-pagination 
          layout=" sizes, prev, pager, next, jumper , total" 
          :total="this.users.length" 
          @current-change="setPageNumber"
          @size-change="changeLimitPerPage">
        </el-pagination>
    </no-ssr>
  </el-col>
</template>

<script>
export default {
  data(){
    return{
      users : [],
        page : 1,
        pageSize: 10,
        items:'',
        filtered :[],
        search:'',
    }
  },
  computed:{
    displayData() {
       if(this.search == null) return this.categories;
        this.filtered = this.users.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
        return this.filtered.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
    }
  },
  methods: {
    // logEvent(d){
    //   console.log(d)
    //   const userRequest = await $axios.get('/api/users')
    //   this.users = userRequest.data.data
    // }
    editUser(userInfo){
      console.log(userInfo);
      this.$router.push({name: 'member-edit-id', 
      params:{
          id: userInfo.username
      }})
    },
    setPageNumber (val) {
      this.page = val
    },
    changeLimitPerPage(val){
      this.pageSize = val
      this.displayData
    },
    async deleteUser(userInfo){
      const statusCode = await this.$axios.delete(`/api/users/${userInfo.username}`)
      
    }
  },
  async asyncData({ $axios }) {
    const userRequest = await $axios.get('/api/users')
    return {users: userRequest.data.data}
  },
  mounted(){
    console.log(this.users)
  }
};
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
