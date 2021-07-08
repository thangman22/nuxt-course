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
              <el-popconfirm
                title="Are you sure to delete this?"
                icon="el-icon-info"
                icon-color="red"
                confirmButtonText="Delete"
                cancelButtonText="Cancel"
                @confirm="deleteUser(scope.row)">
                <el-button slot="reference" type="text" size="small">Delete</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
    </el-table>
    <el-pagination 
      layout="total, sizes, prev, pager, next, jumper" 
      :total="this.users.length" 
      @current-change="setPage"
      @size-change="SizeChange">
    </el-pagination>
    </no-ssr>  
  </el-col>
</template>

<script>
export default ({
  data() {
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
  created(){
    this.asyncData()
  },
  computed: {
    displayData() {
      console.log('hi')
       if(this.search == null) return this.categories;
        this.filtered = this.users.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
        return this.filtered.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
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
    editUser(data) {
      this.$router.push({
        name: "member-edit-id",
        params: {
          id: data.username,
        },
      });
    },
    async deleteUser(data){
      let response = await this.$axios.delete(`/api/users/${data.username}`)
      if(response.status == 200){
        this.open('Success','ลบสำเร็จ','success')
        this.$router.go(0)
      }
      // console.log(response)
    },
    open(title,message,type) {
      this.$notify({
        title,
        message,
        type,
      });
    },
    
  },
  
  
})
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
