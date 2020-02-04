<!-- 详情 -> 操作记录 -->
<template>
  <div class='operation'>
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

<<script type='text/ecmascript-6'>
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
        page: 1,
        page_size: 10,
        field: 'title',
        keyword: '',
        wuliao_id: 0,
      },
      list: [],
      total: 0,
      id: ''
    };
  },
  methods: {
    init (id) {
      this.id = id;
      this.form.wuliao_id = id;
      this.resetForm();
      this.getList();
    },
    // 获取数据
    async getList() {
      this.loading = true;
      try{
        let data = this.form;
        data.url = "/Api/Admin/WuliaoActionLog/getList";
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
        page: 1,
        page_size: 10,
        field: 'title',
        keyword: '',
        wuliao_id: this.id,
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
      // let query = this.form;
      // query.t = Date.now();
      // this.$router.push({ query: query });
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
</style>
