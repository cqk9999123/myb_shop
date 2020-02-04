<!-- 列表 -->
<template>
  <div>
    <el-drawer
      title="选择合同计划"
      size="40%"
      ref="dailog"
      @open="handleOpen"
      :visible.sync="drawer"
      :direction="direction"
    >
      <div class="demo-drawer__content">
        <el-row>
          <el-col :span="22" :offset="1">
            <el-table :data="list" v-loading="loading" border>
              <el-table-column width="80" label="ID" prop="id"></el-table-column>
              <el-table-column prop="day" label="日期"></el-table-column>
              <el-table-column prop="week" label="星期"></el-table-column>
              <el-table-column width="100" fixed="right" label="操作" align="center">
                <template slot-scope="item">
                  <span class="active pointer" @click="choose(item.row)">选择</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="22" :offset="1">
            <aside class="paddingt20">
              <page
                :total="total"
                :pages="this.form.page"
                :page_size="this.form.page_size"
                @pageSize="pageSize"
                @page="pageAction"
              />
            </aside>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script type='text/ecmascript-6'>
import page from "components/page";
export default {
  components: {
    page
  },
  data() {
    return {
      btnloading: false,
      loading: false,
      drawer: false,
      direction: "rtl",
      total: 0,
      list: [], // 地址列表
      form: {
        page: 1,
        page_size: 10,
        mendian_order_id: 0
      }
    };
  },
  methods: {
    //打开
    handleOpen() {
      //console.log('open');
    },
    //获取列表
    async getList() {
      this.loading = true;
      try {
        let data = this.form;
        data.url = "/Api/Admin/MendianOrderList/getList";
        var list = [];
        var weekDay = [
          "星期天",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ];
        let res = await this.requset(data, "get");
        res.result.list.forEach((e, i) => {
          var myDate = new Date(e.destine_time);
          var week = weekDay[myDate.getDay()];
          var day = this.utils.parseTime(e.destine_time, "{y}-{m}-{d}");
          let obj = {
            id: e.id,
            day: day,
            week,
            week
          };
          list.push(obj);
        });
        this.list = list;
        this.total = res.result.total;
      } finally {
        this.loading = false;
      }
    },
    //选择地址
    choose(item) {
      this.$emit("getExtMendianOrderList", item);
      this.drawer = false;
    },
    // 分页条数
    pageSize(size) {
      this.form.page_size = size;
      this.resetRoute();
    },
    // 分页页数
    pageAction(page) {
      this.form.page = page;
      this.resetRoute();
    },
    // 重置路由
    resetRoute() {
      this.form.t = Date.now();
      this.getList();
    },
    //重置
    reset(mendian_order_id) {
      this.drawer = true;
      this.form = {
        page: 1,
        page_size: 10,
        mendian_order_id: mendian_order_id
      };
      this.getList();
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.el-drawer {
  height: auto !important;
  overflow: auto !important;
}

>>> {
  .el-form-item {
    margin-bottom: 20px;
  }

  .el-drawer__body {
    overflow-y: auto;
  }
}
</style>
