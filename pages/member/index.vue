<template>
  <el-col :span="16" :offset="4">
    <h1>Member</h1>
    <data-tables :data="tableData" :total='10' @size-change="logEvent">
      <div slot="empty" style='color: red'>emptyyyyyyyyyyyyyy</div>
      <el-table-column prop="username" label="Username" width="200"> </el-table-column>
      <el-table-column prop="email" label="Email" width="200"> </el-table-column>
      <el-table-column prop="address" label="Address" width="400"> </el-table-column>
      <el-table-column fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small">Edit</el-button>
          <el-button type="text" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </data-tables>
  </el-col>
</template>

<script>
export default {
  methods: {
    logEvent(e) {
      console.log(e)
    }
  },
  data() {
    return {
      tableData: [{
        username: 'Thangman22',
        email: 'warat.w@wisesight.com'
      }]
    };
  },
};
</script>
