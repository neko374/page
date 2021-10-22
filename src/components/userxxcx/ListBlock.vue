<template>
  <div class="list_block">
    <div class="list_title">
      <img src="../../assets/img/list_title.png" />信息查询
    </div>
    <div class="list_tabs">
      <div class="list_tabs_input1">
        <input name="查询" type="button" class="but" value="导出数据" />
      </div>
    </div>
    <div class="list_search">
      队伍名称：
      <input type="text" v-model="searchname" value="请选择" />
      <input name="查询" type="button" class="but_search" value="查询" />
    </div>
    <div class="list_tab">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        :header-cell-style="{ background: '#5193D5', color: '#fff' }"
      >
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="teamname" label="队伍名称"> </el-table-column>
        <el-table-column prop="sos" label="说明"> </el-table-column>
        <el-table-column prop="place" label="地点"> </el-table-column>
        <el-table-column prop="bigequip" label="装备"> </el-table-column>
        <el-table-column prop="ability" label="能力"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a @click="openDetail(scope.row.id)"
              ><img src="../../assets/img/list_ck.png" />详情</a
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="list_page" id="page">
      <el-row>
        <el-button type="primary" @click="firstPage">首页</el-button>
        <el-button @click="prePage">上一页</el-button>
        <el-button @click="nextPage">下一页</el-button>
        <el-button type="primary" @click="lastPage">尾页</el-button>
      </el-row>
    </div>
    <xxcx-detail
      :showDetail="isDetail"
      @detailClose="closeDetail"
    ></xxcx-detail>
  </div>
</template>

<script>
import XxcxDetail from "./xxcxDetail.vue";
export default {
  components: {
    XxcxDetail,
  },
  data() {
    return {
      filterData: [],
      searchname: "",
      pagenum: 1,
      totalPage: 0,
      pagesize: 3,
      isDetail: {
        show: false,
        showId: 1,
        detailMsg: [],
      },
      tableData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取表格数据
    async getData() {
      const result = await this.$http.get("http://neko37.picp.net/xxcx/list");
      console.log(result.data);
      this.tableData = result.data;
      this.tableData.sort((a, b) => a.id - b.id);
      this.totalPage = Math.ceil(this.tableData.length / this.pagesize);
      this.updateData()
    },

    //详情部分
    async openDetail(id) {
      this.isDetail.show = true;
      this.isDetail.showId = id;
      const result = await this.$http.get(
        `http://neko37.picp.net/xxcx/one?id=${this.isDetail.showId}`
      );
      this.isDetail.detailMsg = result.data.datas;
    },

    //分页器部分
    updateData(){
      const start = (this.pagenum-1)*this.pagesize
      const stop = this.pagenum*this.pagesize
      const showData = this.tableData.slice(start,stop)
      this.tableData=showData
    },
    firstPage(){
      this.pagenum = 1
      this.getData()
    },
    prePage(){
      this.pagenum-=1
      this.pagenum=this.pagenum<1?1:this.pagenum
      this.getData()
    },
    nextPage(){
      this.pagenum++
      this.pagenum=this.pagenum>this.totalPage?this.totalPage:this.pagenum
      this.getData()
    },
    lastPage(){
      this.pagenum=this.totalPage
      this.getData()
    },
    //关闭模态框
    closeDetail() {
      this.isDetail.show = false;
    },
  },

  //搜索框监听
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