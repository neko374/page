<template>
  <el-dialog title="计划详情" :visible.sync="showDetail.show" width="50%">
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :header-cell-style="{ background: '#5193D5', color: '#fff' }"
    >
      <el-table-column prop="data" label="时间" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="state" label="状态"> </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDetail: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      newtable:[]
    };
  },
  computed:{
    tableData(){
      var arr = []
      arr.push(this.showDetail.detailMsg)
      return arr
    }
    
  }
};
</script>

<style>
</style>