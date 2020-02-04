<!--  -->
<template>
  <div>
    <aside class="tabs bgfff w100">
      <router-link
        class="el-tabs__header el-tabs__item"
        :class="{'on': item.path==mypath}"
        v-for="item in routes"
        :key="item.path"
        :to="item.path"
      >
        <span v-if="item.meta.title">{{item.meta.title}}</span>
      </router-link>
    </aside>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'navbar',
  props: {
    routes: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    mypath () {
      return this.$route.path
    }
  }
}
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
.tabs {
  border-bottom 1px solid $ceee
  .on {
    border-bottom 2px solid $active
    color $active
  }
}
</style>
