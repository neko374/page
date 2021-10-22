<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="closeWin"
    >
      <el-form ref="form" :model="form" label-width="150px" :rules="rules">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="form.name" id="inp1" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="sex">
          <el-input v-model="form.sex" id="inp1" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="附件上传:">
          <el-upload
            class="upload-demo"
            action="http://neko37.picp.net/imgs/upload"
            :on-preview="handlePreview"
            multiple
            :limit="3"
            accept=".pdf"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过1MB
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeWin"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {
        name: "",
        sex: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        sex: [
          { required: true, message: "请输入数量", trigger: "blur" }     
        ],
      },
    };
  },
  methods: {
     closeWin() {
      this.$emit("addclose");
    },
    handlePreview(file) {
      console.log("file:", file);
      window.open(file.response.url);
    },
     submitForm(formName) {
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
             const flag = await this.$http.post("http://neko37.picp.net/userszu/add",this.form);
             if(flag.data==="addok"){
                 this.$message.success("添加成功")
                 this.$emit("upd");
                 this.$emit("addclose");
                 this.$refs[formName].resetFields();
                 this.submitForm();
             }else{
                 this.$message.error("添加失败")
             }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
#inp1{
  width: 200px;
}
.el-dialog__headerbtn .el-dialog__close {
  color: white;
  font-size: 20px;
}
.el-dialog__header{
  background: #5193d5;
}
</style>