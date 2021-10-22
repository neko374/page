<template>
  <div>
     <!-- <page-header></page-header> -->
   <left-menu-2></left-menu-2>
      <div class="list_tabs">
      
      <div class="list_tabs_input">
        <input
          name=""
          type="button"
          class="but"
          value="新增装备"
          @click="addinfo"
        />
      </div>
    </div>
    <el-card class="box-card">
      <div class="list_search">
        <div slot="header" class="clearfix">
          名称:<el-input v-model="searchuname" style="width: 280px"></el-input>
        
          <input name="查询" type="button" class="but_search" value="查询" />
        </div>
      </div>
      <div>
        <el-table
          :data="tableData.slice((currentPage - 1) * pagesize,currentPage * pagesize)"
          style="width: 100%"
          :header-cell-style="{ background: '#5193D5', color: '#fff' }"
        >
          <el-table-column prop="id" label="序号" width="80"> </el-table-column>
          <el-table-column prop="uname" label="名称" width="120">
          </el-table-column>
          <el-table-column prop="model" label="型号" width="120">
          </el-table-column>
          <el-table-column prop="factory" label="生产厂家" width="180">
          </el-table-column>
          <el-table-column prop="time" label="购置时间" width="200">
          </el-table-column>
          <el-table-column prop="number" label="设备编号" width="150">
          </el-table-column>
          <el-table-column prop="state" label="维保状态" width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="openupd(scope.row)"
                >编辑</el-button
              >
           
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 4, 5]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </el-card>
    <add-editor :upd="upd" :ruleForm="one" @upd="getData"></add-editor>
    <add-info :addData="isShow2" @cls="closeInfo" @upd="getData"></add-info>
  </div>
</template>

<script>
import axios from "axios";
import AddEditor from "../components/AddEditor.vue";
import AddInfo from "../components/AddInfo.vue";
import LeftMenu2 from '../components/LeftMenu2.vue';
// @ is an alias to /src
import PageHeader from "../components/PageHeader.vue";
export default {
  components: { AddEditor, AddInfo,LeftMenu2,PageHeader},
  data() {
    return {
      searchuname: "",
      searchmodel: "",
      searchfactory: "",
      tableData: [],
      filterData: [],
      pagesize: 4,
      isShow2 :false,
      currentPage: 1,
      upd: {
        show: false,
      },
      //存储某一条记录
      one: {},
      // isShow2: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    openupd(item) {
      //item是拿到的一条记录
      this.upd.show = true;
      //深拷贝：当点击取消时，字段值不发生变化
      this.one = JSON.parse(JSON.stringify(item));
    },
    // closeEditor() {
    //   this.isShow = false;
    // },
    addinfo() {
      this.isShow2 = true;
    },
    closeInfo() {
      this.isShow2 = false;
    },
    async getData() {
      // alert("111");
      const result = await axios.get("http://neko37.picp.net/zbxxgl/list");
      console.log("result", result);
      this.tableData = result.data;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    
  },
  watch: {
    searchuname(val) {
      this.filterData = [];
      let flag = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (
          this.tableData[i].uname.includes(val) ||
          this.tableData[i].model.includes(val) ||
          this.tableData[i].factory.includes(val)
        ) {
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

<style scoped>
.list_block .el-table th.el-table__cell > .cell {
  color: white;
  font-size: 16px;
  text-align: center;
}
.box-card{
  width: 80%;
  float:right;
}
input[type="text"]{
  width: 100px;
}
.el-pagination .el-select .el-input{
  width: 150px;
}
</style>