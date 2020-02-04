<!-- 筛选 -->
<template>
  <div class='searchBtn flex-items'>
    <div class="marginr16">
      <el-button size="small" type="primary" @click="search">筛选</el-button>
    </div>
    <div class="marginr16">
      <el-button size="small" @click="clear">清空筛选</el-button>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'searchBtn',
  data () {
    return {
    };
  },
  methods: {
    search () {
      this.$emit('search');
    },
    clear () {
      this.$emit('clear');
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.searchBtn {
  flex-wrap wrap
}
</style>
