<template>
  <el-dialog
  title="队伍详情"
  :visible.sync="showDetail.show"
  width="30%"
  >
  <el-form :model="tableData" status-icon  ref="tableData" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名称" prop="teamname" label-width="160px">
    <el-input v-model="tableData.teamname" ></el-input>
  </el-form-item>
  <el-form-item label="组织结构和人员信息" prop="sos"  label-width="160px">
    <el-input v-model="tableData.sos"></el-input>
  </el-form-item>
  <el-form-item label="地点" prop="place" label-width="160px">
    <el-input v-model.number="tableData.place"></el-input>
  </el-form-item>
  <el-form-item label="单位装备" prop="bigequip" label-width="160px">
    <el-input v-model="tableData.bigequip"></el-input>
  </el-form-item>
  <el-form-item label="个人装备" prop="smallequip" label-width="160px">
    <el-input v-model="tableData.smallequip" ></el-input>
  </el-form-item>
  <el-form-item label="能力" prop="ability" label-width="160px">
    <el-input v-model="tableData.ability" style="border:0 none"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="close" id="sure">确定</el-button>
    
  </el-form-item>
</el-form>
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
        
      };
    },
    computed:{
    tableData(){
        return this.showDetail.detailMsg
    },
    
    
  },
  methods:{
      close(){
        this.$emit("detailClose")
    }
  }
}
</script>

<style>
    el-input{
        border:0 none;
        margin-left: 50px;
    }
    #sure{
        text-align: center;
    }
</style>