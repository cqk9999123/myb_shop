<!-- 树形结构 -->
<template>
  <div class='filesTree'>
    <el-input
      placeholder="搜索文件"
      size="small"
      clearable
      v-model="filterText">
    </el-input>
    <div class="fold margint10 flex-items pointer">
      <i class="el-icon-caret-bottom c999 f16" :class="{'el-icon-caret-right': !isShow}" @click="toggle"></i>
      <div class="f14 c666 paddingl6 w100" @click="load">
        <span class="paddingl6 paddingr6 text" :class="{'on': isOn}">{{title}}</span>
      </div>
    </div>
    <transition name="fade">
      <el-tree
        v-show="isShow"
        class="w100 paddingl16"
        :data="tree"
        :props="defaultProps"
        :default-expand-all="expandAll"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        @node-click="nodeClick"
        current-node-key
        highlight-current
        ref="tree"></el-tree>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'filesTree',
  props: {
    tree: {
      type: Array,
      default () {
        return [];
      }
    },
    expandAll: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  data () {
    return {
      title: '全部图片',
      isShow: true,
      isOn: false, // 控制“全部图片”选择类
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 搜索（筛选数据）
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 获取节点
    nodeClick (data) {
      this.isOn = false;
      this.$emit('node', data);
    },
    // icon
    toggle () {
      this.isShow = !this.isShow;
    },
    // 全部图片
    load () {
      this.isOn = true;
      let id = 0;
      this.$emit('load', id);
    }
  },
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
.fold {
  height 40px
  line-height 40px
  .text {
    line-height 20px
  }
  .on {
    color $active
    background-color $tableHover
  }
}

>>> {
  .el-tree-node__expand-icon {
    font-size 16px
  }
  .el-tree--highlight-current .el-tree-node>.el-tree-node__content {
    .el-tree-node__label { 
      padding 0 6px
      line-height 20px
    }
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color $cfff
    .el-tree-node__label {
      color $active
      background-color $tableHover
    }
  }
}
</style>
