<!-- 列表 -->
<template>
  <div>
    <!--搜索-->
    <section class="flex-items marginb20 marginr16 search">
      <el-input size="small" placeholder="请输入关键词" v-model="form.keyword" clearable>
        <el-select v-model="form.field" slot="prepend" placeholder="请选择" size="small">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-input>
      <div class="marginb10">
        <search-btn @search="search" @clear="clear" />
      </div>
    </section>

    <section class="flex-items marginb20">
      <router-link :to="'/manage/wuliao/add'">
        <el-button size="small" type="primary">添加物料</el-button>
      </router-link>
      <router-link class="marginl20" :to="'/manage/wuliaoIn'">
        <el-button size="small">入库</el-button>
      </router-link>
      <router-link class="marginl20" :to="'/manage/wuliaoOut'">
        <el-button size="small">领取</el-button>
      </router-link>
      <router-link class="marginl20" :to="'/manage/wuliaoLoss'">
        <el-button size="small">损耗</el-button>
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
          value: "title",
          label: "物料名称"
        },
        {
          value: "barcode",
          label: "物料条码"
        }
      ],
      form: {
        page: 1,
        page_size: 10,
        field: "title",
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
    async getList() {
      this.loading = true;
      try{
        let data = this.form;
        data.url = "/Api/Admin/Wuliao/getList";
        let res = await this.request(data,'get');
        let result = res.result;

        let list = result.list;
        let total = result.total;
        list.forEach(item => {
          item.create_time = this.utils.parseTime(item.create_time);
          if (typeof item.pics === "string") {
            let temp = item.pics.split(",");
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
        field: "title",
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

<style lang='stylus' scoped rel='stylesheet/stylus'>
.goods-status {
  >>> {
    .el-select {
      width: 100px;
    }
  }
}
</style>
