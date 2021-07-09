<template>
  <el-col :span="16" :offset="4">
    <!-- {{successStatus}} -->
    <el-row class="header">
      <el-col :span="20"><h1>Member</h1></el-col>
      <el-col :span="4"><el-button type="success" @click="$router.push({ name: 'member-Add' })">Add</el-button></el-col>
    </el-row>
    <no-ssr>
      <!-- TODO : Add no ssr for not render in Server  -->
       <!-- <data-tables :data="users" :total="10" @sort-change="sortChange">
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
      </data-tables> -->
      <el-table :data="displayData" style="width: 100%">
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
      <el-divider></el-divider>
      <div style="text-align: center">
        <el-pagination background layout="total, sizes, prev, pager, next, jumper"
          :total="this.users.length" 
      @current-change="setPage"
      @size-change="SizeChange">>
        </el-pagination>
      </div>
    </no-ssr>
    <el-dialog title="Notification" :visible.sync="success" width="30%" center>
      <span>Data has been delete</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="success = false">Confirm</el-button>
      </span>
    </el-dialog>
  </el-col>
</template>
<script>
export default {
  data() {
    return {
      success: false,
       users:[],
       filtered: [],
       search: '',
       page: 1,
       pageSize: 10,
       total: 0
    }
},
  computed: {
    successStatus(){
      return this.success
    },
    displayData() {
        if(this.search == null) return this.users;
        this.filtered = this.users.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
        this.total = this.filtered.length;
        return this.filtered.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
    }
},
mounted() {

},
created() {
  this.asyncData()
},
  methods: {
    notiSuccess() {
        this.$notify({
          title: 'Success',
          message: 'This is a success message',
          type: 'success'
        });
    },
    logEvent(row){
      console.log(row);
      this.$router.push({
        name: 'member-edit-id',
        params:{
          id: row.username
        }
      })
    },
    editUser(data){
      console.log(data);
      this.$router.push({
        name: 'member-edit-id',
        params:{
          id: data.username
        }
      })
    },
    setPage (val) {
      this.page = val
    },
    SizeChange(val){
      this.pageSize = val
      this.displayData
    },
    async deleteUser(data){
      console.log(data.username);
      const res = await this.$axios.delete('/api/users/'+ data.username)
      console.log(res.status);
      this.asyncData()
      if(res.status){
        this.success = true
      }
    },
    async asyncData() {
      const userRequst = await this.$axios.get('/api/users')
      this.users = userRequst.data.data
    },
    handleCurrentChange(val) {
        this.page = val;
    },
  }
};
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>