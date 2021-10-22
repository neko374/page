<template>
  <el-dialog title="修改装备信息" :visible.sync="upd.show">
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item label="编号" prop="id">
        <el-input
          type="text"
          v-model="ruleForm.id"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="维保状态" prop="state">
        <el-input
          type="text"
          v-model="ruleForm.state"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="upd.show = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import myhttp from "../utils/myhttp";
export default {
  //props里的值不可以更改，只有为对象时可以修改
  props: {
    upd: {
      type: Object,
      requtred: true,
    },
    ruleForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    var validateState = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入维保状态"));
      } else {
        const val = /^[0-9]*$/;
        if (!val.test(value)) {
          callback(new Error("请输入数字"));
        }
        callback();
      }
    };
    return {
      rules: {
        state: [{ validator: validateState, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await myhttp.put("/zbxxgl/upd",this.ruleForm);
          console.log("result",result);
          console.log(result.data);
          if (result.data =="updoK") {
            
            this.$message.success("修改成功");
            console.log(123);
             this.upd.show = false;
            this.$emit("upd");
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
</style>