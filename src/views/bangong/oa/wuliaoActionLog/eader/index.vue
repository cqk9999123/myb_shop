<!-- 按领用人统计 -->
<template>
  <div>
    <!--搜索-->
    <section class="flex-items margint16 marginb10 marginr16 search">
      <div class="flex-items marginb10 marginr20">
        <span class="f14 c333 txt">日期时间:</span>
        <el-date-picker
          v-model="form.monthValue"
          type="month"
          size="small"
          :editable="false"
          :clearable="false"
          placeholder="选择月份"
          value-format="yyyy-MM"
          @change="monthChange"
        ></el-date-picker>
      </div>
      <div class="marginb10">
        <search-btn @search="search" @clear="clear" />
      </div>
    </section>
    <!-- 列表 -->
    <section v-loading="loading">
      <list :list="list" ref="list" />
      <aside class="paddingt20">
        <page
          :total="total"
          :pages="form.page"
          :page_size="form.page_size"
          @pageSize="pageSize"
          @page="page"
        />
      </aside>
    </section>
  </div>
</template>

<script type='text/ecmascript-6'>
import page from "components/page";
import searchBtn from "components/searchBtn";
import list from "./list";
export default {
  components: {
    page,
    searchBtn,
    list
  },
  data() {
    return {
      loading: false,
      form: {
        monthValue: '', // 选择年月
        ym: '',
        type: 0
      },
      list: [],
      total: 0
    };
  },
  methods: {
    init () {
      //this.getNowDate();
      this.resetForm();
      this.getList();
    },
    // 获取当前时间
    getNowDate () {
      let now = new Date();
      let year = now.getFullYear(); // 年
      let month = now.getMonth(); // 月
      month = month + 1;
      month = month.toString().padStart(2, "0");
      this.form.monthValue = `${year}-${month}`;
      this.form.ym = `${year}${month}`;
    },
    // 选择时间
    monthChange (event) {
      let tmpArr = event.split('-');
      this.chartYear = tmpArr[0];
      this.chartMonth = tmpArr[1];
      this.form.ym = this.chartYear + this.chartMonth;
    },
    // 获取数据
    async getList() {
      this.loading = true;
      try{
        let data = this.form;
        data.url = "/Api/Admin/WuliaoActionLog/getCount";
        let res = await this.request(data,'get');
        let result = res.result;

        let list = result.list;
        let total = result.total;
        list.forEach(item => {
          item.record_time = this.utils.parseTime(item.record_time,'{y}-{m}-{d}');
          if (typeof item.worker_pic === "string") {
            let temp = item.worker_pic.split(",");
            item.first_pic = temp[0];
          } else {
            item.first_pic = "";
          }
        });
        this.list = list;
        this.total = total;
      }finally{
        this.loading = false;
      }
    },

    // 搜索按钮
    search() {
      this.form.page = 1;
      this.resetRoute();
    },
    // 重置搜索
    clear() {
      this.form = {
        ym: '',
        type: 0
      };
      this.resetRoute();
    },
    // 分页条数
    pageSize(size) {
      this.form.page_size = size;
      this.resetRoute();
    },
    // 分页页数
    page(page) {
      this.form.page = page;
      this.resetRoute();
    },
    // 重置路由
    resetRoute() {
      this.getList();
    },
    // 重置参数
    resetForm() {
      let query = this.$route.query;
      for (let key in query) {
        if (this.form[key] !== undefined) {
          switch (key) {
            case "page_size":
            case "page":
              this.form[key] = parseInt(query[key]);
              break;
            default:
              this.form[key] = query[key];
          }
        }
      }
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.goods-status {
  >>> {
    .el-select {
      width: 100px;
    }
  }
}
</style>
