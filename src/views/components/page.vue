<!-- 分页 -->
<template>
  <div class="pag" v-if="total > 0">
    <el-pagination
      @size-change="pageSize"
      @current-change="page"
      :page-sizes="[5, 10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="page_size"
      :current-page="pages"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    total: { // 总数
      type: Number,
      default () {
        return 0;
      }
    },
    pages: { // 页数
      type: Number,
      default () {
        return 1;
      }
    },
    page_size: { // 条数
      type: Number,
      default () {
        return 10;
      }
    }
  },
  methods: {
    pageSize (size) {
      this.$emit('pageSize', size);
    },
    page (page) {
      this.$emit('page', page);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.pag >>> .el-pagination {
  text-align right
}
</style>
