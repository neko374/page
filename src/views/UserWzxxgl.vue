<template>
  <div>
    <!-- 头部 -->
    <!-- 装备信息管理 -->
    <div class="list_block">
      <div class="list_title">
        <img src="../assets/img/list_title.png" />装备信息管理
      </div>
      <div class="list_tabs">
        <div class="list_tabs_input1">
          <div>
            <input
              name="查询"
              type="button"
              class="but"
              value="新增物资"
              @click="openAdd"
            />
          </div>
        </div>
      </div>
      <div class="list_search">
        名称：
        <input type="text" v-model="searchname" value="请选择" />
        &nbsp;&nbsp;&nbsp;&nbsp;
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
          <el-table-column prop="id" label="序号"> </el-table-column>
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="sex" label="数量"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                icon="el-icon-edit"
                @click="opendiabj(scope.row)"
              >
                编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 跳转 -->
      <div class="m-page">
        <el-pagination
          class="u-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentpage"
          :page-sizes="[3, 4, 5]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 添加 -->
    <wzxxgl-edit
      :dialogVisible="dialogVisible"
      @addclose="closeAdd"
    ></wzxxgl-edit>
    <!--编辑  -->
    <wzxxgl-bianji
      :diabj="diabj"
      :ruleForm="one"
      @diabj="getData"
    ></wzxxgl-bianji>
  </div>
</template>

<script>
import WzxxglBianji from "../components/WzxxglBianji.vue";
import WzxxglEdit from "../components/WzxxglEdit.vue";
export default {
  components: { WzxxglEdit, WzxxglBianji },
  data() {
    return {
      currentpage: 1,
      pagesize: 5,
      searchname: "",
      filterData: [],
      tableData: [],
      dialogVisible: false,
      diabj: {
        show: false,
      },
      one: {},
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
    opendiabj(item) {
      console.log("item:", item);
      this.diabj.show = true;
      this.one = item;
    },
    closebj() {
      this.diabj = false;
    },
    async getData() {
      const result = await this.$http.get(
        "http://neko37.picp.net/userszu/list"
      );
      this.tableData = result.data;
      console.log(this.tableData);
    },
  },
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
.cell {
  color: black;
}
.list_tabs_input1 {
  display: inline-block;
}
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