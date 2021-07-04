<template>
  <el-col :span="16" :offset="4">
    <el-row class="header">
      <el-col :span="20"><h1>Member</h1></el-col>
      <el-col :span="4">
        <el-button type="success" @click="$router.push({ name: 'member-add' })">Add</el-button></el-col>
    </el-row>
    <no-ssr>

      <data-tables
      :data="users"
      @size-change="handleSizeChange" 
    
        >
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
  
      </data-tables>

    </no-ssr>
  </el-col>
</template>

<script>

export default {
  name : 'add',
  data(){
    return{
      defaultMax:20,
      max:0,
      users:[]

    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    editUser(row){
      this.$router.push({
        name : 'member-edit-id',
        params:{
          id: row.username
        }
      })
    },
      deleteUser(row){
      this.$router.push({
        name : 'member-delete-id',
        params:{
          id: row.username
        }
      })
    },
      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.$store.commit('add',val);
        console.log(this.$store.state.max)
        this.getData();
  
      },
     async getData(){
      const userRequest = await this.$axios.get('/api/users')
    let qMax = this.$store.state.max
    if(qMax == 0){
      qMax =  this.$store.state.defaultMax
    }
     console.log("test " + userRequest.data.data.length )
     this.users  = userRequest.data.data.splice(0,qMax)
    console.log(this.users )

    },
  },
  

  // async asyncData({ $axios,store }) {
  
    
  // },
  
};
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
