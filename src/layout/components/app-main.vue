<!-- 主体 -->
<template>
  <section class="appMain">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive exclude="shopList"> -->
        <router-view
          :key="key"
          class="margint16 marginb16 marginl16 marginr16 bgfff"
          :class="{'padding24': this.$store.state.isPadding}"
        />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'appMain',
  computed: {
    key () {
      return this.$route.fullPath;
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.padding24 {
  padding 24px
}
</style>
