<!-- 商品分类【备用】 -->
<template>
  <div class='classify'>
    <div class="el-input el-input--small el-input--suffix pointer">
      <ul class="el-input__inner flex-items vals">
        <li v-for="(item, index) in valList" :key="item.id">
          {{item.label}}
          <i class="el-tag__close el-icon-close pointer f12 c999" @click="del(index)"></i>
        </li>
      </ul>
    </div>
    <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      @check="handleCheck"
      current-node-key
      highlight-current
      :props="defaultProps">
    </el-tree>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'classify',
  data () {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        },
        {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        },
        {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      valList: []
    };
  },
  mounted () {
    // this.getInfo();
  },
  methods: {
    // 搜索数据
    getInfo () {
      this.request({
        url: '/Api/Admin/GoodsCat/allList',
        method: 'post',
        data: {
          type: 'all',
          id: 0
        }
      })
      .then(res => {
        const code = parseInt(res.code);
        if (code === 200) {
          let result = res.result;
          console.log(result)
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    // 获取节点
    handleCheck () {
      this.valList = this.$refs.tree.getCheckedNodes();
    },
    // 删除
    del (index) {
      this.valList.splice(index, 1);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
.vals {
  width 100%
  height auto 
  min-height 32px
  padding-left 6px
  padding-right 6px
  flex-wrap wrap
  padding-top 2px
  padding-bottom 2px
  li {
    position relative
    max-width 99%
    height 26px
    line-height 26px
    margin-right 4px
    margin 2px 4px 2px 2px
    padding 0 20px 0 10px
    overflow hidden
    background-color $tableThead
    border 1px solid $ceee
    border-radius 2px
  }
  i {
    position absolute
    top 7px
    right 4px
    z-index 1
    font-weight 700
    transition color $ms
    &:hover {
      color $c333
    }
  }
}
>>> {
  .el-tree-node__label {
    padding-left 8px
  }
}
</style>
