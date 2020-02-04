<!-- 浏览图 -->
<template>
  <el-dialog
    append-to-body
    :visible.sync="visible"
    :before-close="close">
    <img :src="img_url + img" alt="">
  </el-dialog>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    visible: {
      type: Boolean,
      default () {
        return false;
      }
    },
    img: {
      type: String,
      default () {
        return '';
      }
    }
  },
  data () {
    return {
      img_url: window.my.img_url
    };
  },
  methods: {
    // 关闭
    close () {
      this.$emit('close');
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
>>> {
  .el-dialog {
    width 900px
    display flex
    justify-content center
    img {
      width 100%
      display block
    }
  }
}
</style>
