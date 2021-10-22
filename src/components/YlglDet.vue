<template>
  <div>
    <el-dialog title="计划详情" :visible.sync="disdet.show" width="40%">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="100px"
      >
        <el-form-item label="训练时间:" prop="data">
          <el-input
            id="inp1"
            v-model="ruleForm.data"
          ></el-input>
        </el-form-item>
        <el-form-item label="参与人员:" prop="name">
          <el-input type="textarea" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="训练状态:" prop="state">
          <el-input v-model="ruleForm.state"></el-input>
        </el-form-item>
         <!-- <el-form-item label="训练图片:">
           <template slot-scope="scope">
             <img :src="scope.row.img_url">
           </template>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="disdet.show=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    ruleForm: {
      type: Object,
      required: true,
    },
    disdet: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
#inp1 {
  width: 200px;
}
.el-dialog__headerbtn .el-dialog__close {
  color: white;
  font-size: 20px;
}
.el-dialog__header {
  background: #5193d5;
}
.u-icon {
  width: 80px;
  height: 80px;
}
</style>