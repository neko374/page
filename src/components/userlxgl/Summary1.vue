<template>
  <el-dialog title="修改信息" :visible.sync="showSumm.show" width="30%">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="序号" prop="id">
        <el-input
          type="text"
          v-model="ruleForm.id"
          autocomplete="off"
          id="inp"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          type="text"
          v-model="ruleForm.name"
          autocomplete="off"
          id="inp"
        ></el-input>
      </el-form-item>
      <el-form-item label="时间" prop="data">
        <el-input
          type="text"
          v-model="ruleForm.data"
          autocomplete="off"
          id="inp"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-input v-model="ruleForm.state" id="inp"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showSumm: {
      type: Object,
      require: true,
    },
    ruleForm:{
            type:Object,
            required:true
        }
  },

  data() {
      return {
        rules: {
          name: [
            { required: true, message: "请输入名称",trigger: 'blur' }
          ],
          data: [
            { required: true, message: "请输入时间",trigger: 'blur' }
          ],
          state: [
            { required: true, message: "请输入状态",trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
              const result = await this.$http.put("http://neko37.picp.net/xlgl/upd",this.ruleForm)
              if(result.data==="updok"){
                  this.$message.success("修改成功")
                  this.showSumm.show=false;
                  this.$emit("upd")
              }else if(result.data==="updfail"){
                  this.$message.error("修改失败")
              }else{
                  this.$message.info(result.data)
                  this.upd.show=false
              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style>
#inp{
  width: 80%;
}
</style>