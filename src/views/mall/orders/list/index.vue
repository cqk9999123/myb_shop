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
      <div class="marginb10 marginr16">
        <el-date-picker
          size="small"
          v-model="day"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable>
        </el-date-picker>
      </div>
      <div class="marginb10">
        <search-btn @search="search" @clear="clear" />
      </div>
    </section>

    <section class="flex-items marginb20">
      <aside class="flex-items marginl16">
        <el-switch v-model="isExpand"></el-switch>
        <span class="f15 active paddingl6" v-if="isExpand">展开</span>
        <span class="f15 c333 paddingl6" v-else>折叠</span>
      </aside>
    </section>
    <!-- 列表 -->
    <section v-loading="loading">
      <list :list="list" ref="list" :isExpand="isExpand" />
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
  name: "shopList",
  components: {
    page,
    searchBtn,
    list
  },
  data() {
    return {
      loading: false,
      isExpand: false, // 展开、折叠状态
      selectOptions: [
        {
          value: "order_no",
          label: "订单编号"
        },
        {
          value: "sh_phone",
          label: "收货电话"
        },
        {
          value: "sh_name",
          label: "收货姓名"
        }
      ],
      form: {
        page: 1,
        page_size: 10,
        field: "order_no",
        keyword: "",
        user_id:1,
        start_time:'',
        end_time:''
      },
      day:[],
      list: [],
      total: 0,
      catOptions:[]
    };
  },
  mounted() {
    this.resetForm();
    this.getList();
  },
  methods: {
    // 搜索数据
    async getList() {
      this.loading = true;
      try{
        let param = {
          data:this.form,
          url : "/Api/Admin/Orders/getList",
          type:"get",
        }
        let res = await this.request(param);
        let list = res.result.list;
        let total = res.result.total;
        this.list = list;
        this.total = total;
        this.loading = false;
        this.$refs.list.handleSwitch(this.isExpand);
      }finally{
        this.loading = false;
      }
    },
    // 搜索按钮
    search() {
      this.form.start_time = this.day[0];
      this.form.end_time = this.day[1];
      this.form.page = 1;
      this.resetRoute();
    },
    // 重置搜索
    clear() {
      this.form = {
        page: 1,
        page_size: 10,
        field: "order_no",
        keyword: "",
        user_id:1,
        start_time:'',
        end_time:''
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
