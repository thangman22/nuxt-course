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
    <client-only>
      <!-- TODO : Add no ssr for not render in Server  -->
      <el-table :data="displayData" style="width: 100%"  >
      <el-table-column prop="username" label="Username" width="200" sortable>
          </el-table-column>
          <el-table-column prop="name" label="Name" width="400" sortable>
          </el-table-column>
          <el-table-column prop="email" label="Email" width="200" sortable>
          </el-table-column>
          <el-table-column fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editUser(scope.row)">Edit</el-button>
                <el-button slot="reference" type="text" size="small" @click="deleteUser(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
    </el-table>
    <el-pagination background
      layout="total, sizes, prev, pager, next, jumper" 
      :total="this.users.length" 
      @current-change="setPage"
      @size-change="SizeChange">
    </el-pagination>
    </client-only>
  </el-col>
</template>
<script>
export default {
  created(){
    this.asyncData()
  },
  computed: {
    displayData() {
       if(this.search == null) return this.categories;
        this.filtered = this.users.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
        return this.filtered.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
    }
  },
  data(){
    return {
      lengthData : 0,
      users : [],
      page : 1,
      pageSize: 10,
      search:'',
      filtered :[],
      items:''
    }
  },
  methods: {
    async asyncData() {
    const userRequest = await this.$axios.get('/api/users')
    this.users=userRequest.data.data
    },
    setPage (val) {
      this.page = val
    },
    SizeChange(val){
      this.pageSize = val
      this.displayData
    },
    editUser(rowData){
      console.log(rowData)
      this.$router.push({
        name : 'member-edit-id',
        params:{
          id:rowData.username,
          dataform:rowData
        }       
      })
    },
    async deleteUser(rowData){
      console.log('/api/users/'+rowData.username)
      const resp = await this.$axios.get('/api/users/'+rowData.username)
      if(resp.status == 200){
        this.$router.go(0)
      }
    }
  },
};
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-pagination{
  display: flex;
  justify-content: space-between;
}
</style>