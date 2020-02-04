<!-- sidebar -->
<template>
  <nav class="sidebar">
    <div v-if="shop.base_info.pic" class="logo paddingt10 paddingb10 flex-center">
      <img :src="img_url + shop.base_info.pic" alt="logo">
    </div>
    <div v-else class="logo paddingl26 paddingt26 paddingb30">{{shop.base_info.title}}</div>
    <el-scrollbar wrap-class="scrollbar-wrapper paddingb100">
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <nav-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div class="nav_foot flex-between">
      <i v-on:click="loginout" class="el-icon-switch-button f18"></i>
      <router-link style="width:auto" to="/shopUser/editPassword"><i class="el-icon-edit-outline f18"></i></router-link>
    </div>
  </nav>
</template>

<script type='text/ecmascript-6'>
import navItem from './nav-item';
export default {
  name: 'sidebar',
  components: {
    navItem
  },
  data() {
    return {
      shop: {base_info:{pic:'',title:""}},
      img_url: window.my.img_url
    };
  },
  computed: {
    // 当前激活菜单的 index
    activeMenu () {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    // 路由数组
    routes () {
      return this.$router.options.routes[0].children;
    }
  },
  mounted () {
    this.shop = this.utils.session.get('shop');
  },
  methods: {
    loginout () {
      this.$confirm('是否确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        let param ={
          url: '/Api/Admin/publics/logout'
        };
        let res = await this.request(param);
        this.utils.session.remove('shop');
        this.utils.session.remove('token');
        this.utils.success('退出成功!', '/login', 1);
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
.sidebar {
  .logo {
    width 100%
    font-size 20px
    color #E6E6E6
    letter-spacing 1px
    font-weight 500
    img {
      width 50%
      display block
    }
  }
  >>> {
    .el-scrollbar {
      height calc(100vh - 76px)
    }
    .el-menu {
      background-color $c000
      border-right none
      .iconfont {
        color $c999
        font-size 20px
        margin-right 8px
      }
    }
    .el-menu-item, .el-submenu__title {
      height 40px
      line-height 40px
      margin-bottom 8px
      font-size 16px
    }
    .el-menu-item, .el-submenu__title, .el-submenu .el-menu-item {
      color $c999
      &:hover {
        background-color $c000 !important
      }
      &:hover,
      &:hover i {
        color $cfff
      }
    }
    .el-submenu {
      .el-menu {
        background $subBg
        box-shadow inset 0 2px 8px rgba(0, 0, 0, 0.45)
      }
      .el-menu-item {
        font-size 15px
        &:hover {
          background-color $subBg !important
        }
      }
    }
    .el-menu-item.is-active, .el-submenu .el-menu-item.is-active {
      color $cfff
      background-color $active !important
    }
    .el-menu-item.is-active, .el-submenu .el-menu-item.is-active, .el-submenu.is-active {
      i {
        color $cfff
      }
    }
  }
}
.nav_foot {
  color #b2b2b2
  position absolute
  bottom 0
  left 0
  z-index 10
  background-color rgba(0, 0, 0, .5)
  width 100%
  padding 16px 46px 26px
}
.nav_foot i:hover {
  color $cfff
  cursor pointer
}
</style>
