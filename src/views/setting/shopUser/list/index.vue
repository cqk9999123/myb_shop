<!-- 列表 -->
<template>
  <div id="shopUserList">
    <section class="flex-items marginb20">
      <router-link :to="'/setting/shopUser/add'">
        <el-button size="small" type="primary">添加管理员</el-button>
      </router-link>
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
  name: "shopUserList",
  components: {
    page,
    searchBtn,
    list
  },
  data() {
    return {
      loading: false,
      selectOptions: [
        {
          value: "username",
          label: "登陆账号"
        },
        {
          value: "phone",
          label: "手机号"
        }
      ],
      form: {
        page: 1,
        page_size: 10,
        field: "username",
        keyword: ""
      },
      list: [],
      total: 0
    };
  },
  mounted() {
    this.resetForm();
    this.getList();
  },
  methods: {
    // 搜索数据
    async getList() {
      let param = {
        data: this.form,
        url: "/Api/Admin/ShopUser/getList",
        type: "get"
      };
      this.loading = true;
      try {
        let res = await this.request(param);
        let list = res.result.list;
        let total = res.result.total;
        list.forEach(item => {
          item.create_time = this.utils.parseTime(item.create_time);
        });
        this.list = list;
        this.total = total;
      } finally {
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
        field: "username",
        keyword: ""
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
      let query = this.form;
      query.t = Date.now();
      this.$router.push({ query: query });
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

<style lang='stylus' scoped rel='stylesheet/stylus'></style>
