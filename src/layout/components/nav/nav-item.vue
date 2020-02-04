<!-- 子导航 -->
<template>
  <div v-if="!item.hidden" class='sidebarItem menu-wrapper'>
    <template v-if="!item.children || item.meta.istop">
      <app-link :to="item.path">
        <el-menu-item :index="item.path">
          <item :icon="item.meta&&item.meta.icon" :title="item.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script type='text/ecmascript-6'>
import path from 'path'
import { isExternal } from './external'
import item from './item'
import appLink from './link'

export default {
  name: 'sidebarItem',
  components: {
    item, appLink
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>
