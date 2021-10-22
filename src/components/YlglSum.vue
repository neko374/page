<template>
  <div>
    <el-dialog title="训练总结" :visible.sync="dissum.show" width="40%">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="100px"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="训练时间:" prop="data">
          <!-- <el-input
            id="inp1"
            v-model="ruleForm.data"
            placeholder="请输入"
          ></el-input> -->
              <el-date-picker
          v-model="ruleForm.data"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        </el-form-item>
        <el-form-item label="参与人员:" prop="name">
          <el-input type="textarea" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="训练状态:" prop="state">
          <el-input v-model="ruleForm.state"></el-input>
        </el-form-item>
        <el-form-item label="其他附件:">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >修改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var valiname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入数量"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        data: [{ required: true, message: "请输入时间", trigger: "blur" }],
        name: [{ validator: valiname, trigger: "blur" }],
        state: [{ required: true, message: "请输入时间", trigger: "blur" }],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  props: {
    ruleForm: {
      type: Object,
      required: true,
    },
    dissum: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await this.$http.put(
            "http://neko37.picp.net/xlgl/upd",
            this.ruleForm
          );
          if (result.data === "updok") {
            this.$message.success("修改成功");
            this.dissum.show = false;
            this.$emit("upd");
          } else if (result.data === "upfail") {
            this.$message.success("修改失败");
          } else {
            this.$message.info(result.data);
            this.dissum.show = false;
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
    handlePreview(file) {
      console.log("file:", file);
      window.open(file.response.url);
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
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