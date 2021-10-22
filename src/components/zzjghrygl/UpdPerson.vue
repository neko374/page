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
      <el-form-item label="个人序号" prop="staffid">
        <el-input
          type="text"
          v-model="ruleForm.staffid"
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
      <el-form-item label="性别" prop="gender">
        <el-input
          type="text"
          v-model="ruleForm.gender"
          autocomplete="off"
          id="inp"
        ></el-input>
      </el-form-item>
      <el-form-item label="籍贯" prop="nativeplace">
        <el-input
          type="text"
          v-model="ruleForm.nativeplace"
          autocomplete="off"
          id="inp"
        ></el-input>
      </el-form-item>
      <el-form-item label="队伍编号" prop="areaid">
        <el-input
          type="text"
          v-model="ruleForm.areaid"
          autocomplete="off"
          id="inp"
        ></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input
          type="text"
          v-model="ruleForm.icon"
          autocomplete="off"
          id="inp"
        ></el-input>
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
          staffid: [
            { required: true, message: "请输入个人编号",trigger: 'blur' }
          ],
          name: [
            { required: true, message: "请输入姓名",trigger: 'blur' }
          ],
          gender: [
            { required: true, message: "请输入性别",trigger: 'blur' }
          ],
          nativeplace: [
            { required: true, message: "请输入籍贯",trigger: 'blur' }
          ],
          areaid: [
            { required: true, message: "请输入队伍编号",trigger: 'blur' }
          ],
          icon: [
            { required: true, message: "请输入图标地址",trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
              const result = await this.$http.put("http://neko37.picp.net/armystaff/upd",this.ruleForm)
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
}
</script>

<style>

</style>