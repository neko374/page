<template>
  <div>
    <!-- <page-header></page-header> -->
    <div class="list_block" style="background-color: #eef1f6">
      <div class="list_title"><img src="img/list_title.png" />队伍信息导入</div>
      <div class="list_content">
        <br />
        <br />

        <table width="40%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td colspan="2" class="td_title">队伍信息导入</td>
          </tr>
          <tr>
            <td colspan="2">
              <div class="tab_input">
                导入队伍信息？（EXCEL格式）<br /><br />

                <!-- <input
                  name="查询"
                  type="button"
                  class="but"
                  value="确　认"
                  style="width: 100px"
                /> -->
                <el-upload
                  class="upload-demo"
                  action="http://192.168.69.246:2333/imgs/upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
                </el-upload>
                <br />
                <br />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import MainLeft from "../components/MainLeft.vue";
// @ is an alias to /src
import PageHeader from "../components/PageHeader.vue";
export default {
  components: {
    PageHeader,
    // MainLeft,
  },
  //
  data() {
    return {
      fileList: [
        { name: "dwxx.xls", url: "http://neko37.picp.net/imgs/upload" },
      ],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style>
</style>