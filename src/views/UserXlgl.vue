<template>
  <div>
    <div class="list_block">
      <div class="list_title">
        <img src="../assets/img/list_title.png" />训练管理
      </div>
      <div class="list_tabs">
        <div class="list_tabs_input1">
          <input
            name="查询"
            type="button"
            class="but"
            @click="openAdd"
            value="新增计划"
          />
        </div>
      </div>
      <div class="list_search">
        查询：
        <input type="text" v-model="searchname" value="请选择" />
      </div>
      <div>
        <el-table
          :data="
            tableData.slice(
              (currentpage - 1) * pagesize,
              currentpage * pagesize
            )
          "
          style="width: 100%"
          :header-cell-style="{ background: '#5193d5', color: 'white' }"
          stripe
        >
          <el-table-column prop="id" label="序号" >
          </el-table-column>
          <el-table-column prop="data" label="时间" >
          </el-table-column>
          <el-table-column prop="name" label="名称" >
          </el-table-column>
          <el-table-column prop="state" label="状态" >
          </el-table-column>
          <el-table-column label="操作" class="box">
            <template slot-scope="scope">
              <el-button
                size="small"
                class="el-icon-view"
                @click="detAdd(scope.row)"
                >详情</el-button
              >
              <el-button
                size="small"
                class="el-icon-delete"
                @click="del(scope.row.id)"
                >删除</el-button
              >
              <el-button
                size="small"
                class="el-icon-upload2"
                @click="sumadd(scope.row)"
                >提交</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="m-page">
        <el-pagination
          class="u-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentpage"
          :page-sizes="[5, 6, 7]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </div>
    <div class="win_bg"></div>

    <xlgl-add :dialogVisible="dialogVisible" @addclose="closeAdd"></xlgl-add>
    <xlgl-det :disdet="disdet" :ruleForm="one1" @disdet="getData"></xlgl-det>
    <xlgl-sum :dissum="dissum" :ruleForm="one" @dissum="getData"></xlgl-sum>
  </div>
</template>

<script>
import XlglAdd from "../components/XlglAdd.vue";
import XlglDet from "../components/XlglDet.vue";
import XlglSum from "../components/XlglSum.vue";
export default {
  components: { XlglAdd, XlglDet, XlglSum },
  data() {
    return {
      currentpage: 1,
      pagesize: 5,
      searchname: "",
      filterData: [],
      tableData: [],
      dialogVisible: false,
      disdet: {
        show: false,
      },
      dissum: {
        show: false,
      },
      one: {},
      one1: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentpage = val;
    },
    openAdd() {
      this.dialogVisible = true;
    },
    closeAdd() {
      this.dialogVisible = false;
    },
    detAdd(item) {
      console.log("item:", item);
      this.disdet.show = true;
      this.one1 = item;
    },
    detcloswAdd() {
      this.disdet = false;
    },
    sumadd(item) {
      console.log("item:", item);
      this.dissum.show = true;
      this.one = item;
    },
    sumclosAdd() {
      this.dissum = false;
    },
    async getData() {
      const result = await this.$http.get(
        "http://neko37.picp.net/xlgl/list"
      );
      this.tableData = result.data;
      console.log(this.tableData);
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async (res) => {
          const result = await this.$http.delete(
            `http://neko37.picp.net/xlgl/del?id=${id}`
          );
          if (result.data === "delok") {
            this.$message.success("删除成功");
          } else if (result.data === "delfail") {
            this.$message.error("删除失败");
          } else {
            this.$message.info(result.data);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  // 查询
  watch: {
    searchname(val) {
      this.filterData = [];
      let flag = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].name.includes(val)) {
          this.filterData.push(this.tableData[i]);
          flag = true;
        }
      }
      if (flag) {
        this.tableData = this.filterData;
      } else {
        this.tableData = [];
      }
      if (val === "") {
        this.getData();
      }
    },
  },
};
</script>

<style scrped>
.el-pagination .el-select .el-input{
  width: 150px;
}
.m-page{
  text-align: center;
}
input[type="text"]{
  width: 150px;
}
</style>