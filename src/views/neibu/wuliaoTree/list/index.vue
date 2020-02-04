<!-- 列表 -->
<template>
  <div>
    <!--搜索-->
    <section class="flex-items marginb20 marginr16 search">
      <el-input size="small" placeholder="请输入关键词" v-model="form.keyword" clearable>
        <el-select v-model="field" slot="prepend" placeholder="请选择" size="small">
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
      <router-link :to="'/neibu/wuliaoName/add'">
        <el-button size="small" type="primary">添加物料</el-button>
      </router-link>
    </section>
    <!-- 列表 -->
    <section v-loading="loading">
      <list :list="list" ref="list" />
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
          value: "keyword",
          label: "编码"
        },
      ],
      form: {
        keyword: "",
      },
      list: [],
      field: "keyword",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 搜索数据
    async getList() {
      this.loading = true;
      try {
        let param = {
          data: this.form,
         url: "/Api/Admin/OaWuliaoName/getTreeList",
          type: "get"
        };
        let res = await this.request(param);
        let list = res.result;
        this.list = list;
      } finally {
        this.loading = false;
      }
    },
    // 搜索按钮
    search() {
      this.getList();
    },
    // 重置搜索
    clear() {
      this.form = {
        keyword: "",
      };
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
