<template>
  <div>
    <div class="list_block" style="background-color: #fff">
      <div class="list_title">
        <img src="../../assets/img/list_title.png" />训练管理
      </div>
      <div class="list_tabs_l">
        <div class="receive_tree_o">
          <div class="receive_tree">
            <img
              src="../../assets/img/system/menu/base1.png"
              class="tree_img"
            /><span class="css_m">人员树状目录</span>
            <div id="systree">
              <el-tree
                :data="treedata"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :default-expand-all="true"
                :show-checkbox="true"
                ref="tree"
                @check="selectItem"
                node-key="id"
              ></el-tree>
            </div>
          </div>
        </div>
      </div>
      <div class="list_tabs_r">
        <div
          class="list_tabs"
          style="
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: #ddd;
          "
        >
          <div class="list_tabs_input2" style="width: 100%">
            <span class="css_m"
              >&nbsp;&nbsp;<img
                src="../../assets/img/icon_dw.png"
                width="22"
                height="16"
              />当前队伍名称：<span class="css_cyan"
                >南通天泽微型消防站</span
              ></span
            ><input
              name=""
              type="button"
              class="but"
              value="新增人员"
              @click="changeAdd"
              style="margin-right: 10px"
            />
          </div>
        </div>
        <div
          class="list_search"
          style="
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: #ddd;
          "
        >
          姓名：
          <input type="text" v-model="searchname" value="请选择" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input
            name="查询"
            type="button"
            class="but_search"
            value="查询"
          />
        </div>
        <div class="list_tab">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            :header-cell-style="{ background: '#5193D5', color: '#fff' }"
          >
            <el-table-column prop="staffid" label="序号"> </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="gender" label="性别"> </el-table-column>
            <el-table-column prop="nativeplace" label="籍贯"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <a @click="openSumm(scope.row)">
                  <img src="../../assets/img/list_ck.png" />编辑</a
                >&nbsp;&nbsp;<a @click="delPerson(scope.row.staffid)">
                  <img src="../../assets/img/list_sc.png" />删除</a
                >
              </template>
            </el-table-column>
          </el-table>

          <div class="list_page1">
            <el-row>
        <el-button type="primary" @click="firstPage">首页</el-button>
        <el-button @click="prePage">上一页</el-button>
        <el-button @click="nextPage">下一页</el-button>
        <el-button type="primary" @click="lastPage">尾页</el-button>
      </el-row>
          </div>
        </div>
      </div>
    </div>
    <add-person
      :addPerson="addPerson"
      @addclose="closeAdd"
      @upd="getTableData"
    ></add-person>
    <upd-person
      :showSumm="isSumm"
      :ruleForm="one"
      @upd="getTableData"
    ></upd-person>
  </div>
</template>

<script>
import AddPerson from "./AddPerson.vue";
import UpdPerson from "./UpdPerson.vue";
// let dataRecieve = this.$refs.tree.getCheckedNodes();
export default {
  components: { AddPerson, UpdPerson },
  data() {
    return {
      filterData: [],
      addPerson: {
        show: false,
      },
      one: {},
      isSumm: {
        sumId: 0,
        show: false,
      },
      pagenum: 1,
      totalPage: 0,
      pagesize: 10,
      searchname: "",
      personsData: [],
      tableData: [],
      treedata: [],
      newData: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  created() {
    this.getTreeData();
    this.getAllData()
  },
  methods: {
    //模态框控制部分
    changeAdd() {
      this.addPerson.show = true;
    },
    handleNodeClick(data) {
      console.log(data);
      console.log(this.$refs.tree.getCheckedKeys());
    },
    selectItem() {
      console.log(this.$refs.tree.getCheckedKeys());
      this.getTableData(this.$refs.tree.getCheckedKeys());
    },
    closeAdd() {
      this.addPerson.show = false;
    },
    openSumm(item) {
      this.isSumm.show = true;
      this.one = JSON.parse(JSON.stringify(item));
    },
    //获取全部队伍信息
    async getAllData() {
      const result = await this.$http.get(
        "http://neko37.picp.net/armystaff/list"
      );
      this.tableData = result.data.datas;
      this.tableData.sort((a, b) => a.staffid - b.staffid);
      this.totalPage = Math.ceil(this.tableData.length / this.pagesize);
      this.updateData()
    },
     updateData(){
      const start = (this.pagenum-1)*this.pagesize
      const stop = this.pagenum*this.pagesize
      const showData = this.tableData.slice(start,stop)
      this.tableData=showData
    },
    //右边表中数据
    async getTableData(res) {
      console.log("1234567", res);
      const result = await this.$http.get(
        `http://neko37.picp.net/armystaff/listbyareaid?ids=${res.join(",")}`
      );
      console.log("result", result.data.datas);
      this.tableData = result.data.datas;
    },
    //分页器
    firstPage(){
      this.pagenum = 1
      this.getAllData()
    },
    prePage(){
      this.pagenum-=1
      this.pagenum=this.pagenum<1?1:this.pagenum
      this.getAllData()
    },
    nextPage(){
      this.pagenum++
      this.pagenum=this.pagenum>this.totalPage?this.totalPage:this.pagenum
      this.getAllData()
    },
    lastPage(){
      this.pagenum=this.totalPage
      this.getAllData()
    },
    //删除
    delPerson(id) {
      this.$confirm("此操作将删除改人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await this.$http.delete(
            `http://neko37.picp.net/armystaff/del?staffid=${id}`
          );
          console.log(result.data.state);
          if (result.data === "delok") {
            this.$message.success("删除成功");
            this.getTableData();
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
    //树状图
    async getTreeData() {
      const result = await this.$http.get(
        "http://neko37.picp.net/armytree/list"
      );
      this.treedata = result.data.datas;
    },
  },

  //监听，搜索框
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
        this.getTableData();
      }
    },
  },
};
</script>

<style>
</style>