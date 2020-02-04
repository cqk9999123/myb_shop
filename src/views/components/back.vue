<!-- 返回上一级 -->
<template>
  <div class='back'>
    <el-page-header class="marginb20" @back="goBack"></el-page-header>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'back',
  methods: {
    goBack () {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
.back {
  >>>{
    .el-page-header {
      // position absolute
      // top -24px
      // left -24px
      // z-index 10
      line-height 30px
      background-color $cfff
      // box-shadow 0 2px 5px rgba(0, 0, 0, .08)
      cursor pointer
      padding-left 4px
      &:hover {
        .el-page-header__title,
        .el-icon-back {
          color $active
        }
      }
      .el-page-header__title,
      .el-icon-back {
        color $c888
        &:hover {
          color $active
        }
      }
      .el-page-header__title {
        font-size 13px
        font-weight bold
      }
      &::after {
          background-color $cccc
      }
    }
  }
}
</style>
