<!-- 列表图片 -->
<template>
  <div class='listImg'>
    <div v-if="img" class="img-box border" :style="{'width': width + 'px', 'height': height + 'px'}">
      <img :src="img_url + img" class="wh100">
    </div>
    <div v-else class="img-box border f12 c999 flex-center" :style="{'width': width + 'px', 'height': height + 'px'}">暂无图片</div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'listImg',
  props: {
    img: {
      type: String,
      default () {
        return '';
      }
    },
    width: {
      type: Number,
      default () {
        return 0;
      }
    },
    height: {
      type: Number,
      default () {
        return 0;
      }
    }
  },
  data() {
    return {
      img_url: window.my.img_url
    }
  },
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
.img-box {
  background-color $tableThead
  img {
    display block
  }
}
</style>
