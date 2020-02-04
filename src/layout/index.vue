<!-- loyout 布局 -->
<template>
  <section class='app-wrapper'>
    <app-nav class="sidebar-container" />
    <main class="main-container">
      <navbar v-if="routes.length > 0" :routes="routes" class="fixed-header"/>
      <app-main class="app-main" :class="{'on': routes.length > 0}"/>
    </main>
  </section>
</template>

<script type='text/ecmascript-6'>
import appNav from './components/nav/index'
import appMain from './components/app-main'
import navbar from './components/navbar'
export default {
  name: 'layout',
  components: {
    appNav, appMain, navbar
  },
  computed: {
    routes () {
      // 横向子目录
      let children = []
      // 父级目录得path
      let activeMenu = this.$route.meta.activeMenu
      // 路由层级
      let matched = this.$route.matched

      // 全部路由
      let all = this.$router.options.routes[0].children
      let cur = this.utils.deepClone(all)
      for (let i = 1; i < matched.length; i++) {
        let rs = cur.find((e) => (e.path === matched[i].path))
        if (rs.children) {
          if (rs.path === activeMenu) {
            children = rs.children
            break
          } else {
            cur = this.utils.deepClone(rs.children)
          }
        } else {
          children = []
          break
        }
      }
      //去掉隐藏的子目录
      let temp = [];
      children.forEach(element => {
          if(!element.hidden){
            temp.push(element);
          }
      });
      return temp;
    }
  }
}
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
.app-main {
  min-height: calc(100vh - 44px);
  width: 100%;
  top: 0;
  position: relative;
  overflow: hidden;
}
.app-main.on {
  top: 44px;
}
.fixed-header {
  position: fixed;
  top: 0;
  left: $menuWidth;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
}
</style>
