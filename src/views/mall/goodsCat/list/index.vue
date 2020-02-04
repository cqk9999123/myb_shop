<!-- 列表 -->
<template>
  <div id="projectCatList">
    <section class="flex-items marginb20">
      <router-link :to="'/mall/goodsCat/add'">
        <el-button size="small" type="primary">添加分类</el-button>
      </router-link>
    </section>
    <!-- 列表 -->
    <section v-loading="loading">
      <list :list="list" ref="list" />
    </section>
  </div>
</template>

<script type='text/ecmascript-6'>
import list from "./list";

export default {
  name: "projectCatList",
  components: {
    list
  },
  data() {
    return {
      loading: false,
      list: []
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
          data: {
            type: "tree",
            id: 0
          },
          url: "/Api/Admin/GoodsCat/allList"
        };
        let res = await this.request(param);
        this.list = res.result;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'></style>
