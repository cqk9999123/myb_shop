<!-- 新建文件夹 -->
<template>
  <el-dialog
    title="新建文件夹"
    top="100px"
    append-to-body
    :visible.sync="visible"
    :before-close="close">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="110px"
    >
      <el-form-item label="上级文件夹:" prop="name">
        <div class="w100" @click="select">
          <el-input
            size="medium"
            v-model="name"
            placeholder="请输入文件夹名称"
            suffix-icon="el-icon-arrow-down"
            readonly
            clearable
          ></el-input>
        </div>
        <tree
          class="tree"
          v-show="isTree"
          :tree="tree"
          :expandAll="true"
          @node="node"
          @load="load"
        />
      </el-form-item>
      <el-form-item label="分组名称:" prop="title">
        <el-input size="medium"
          v-model="form.title"
          placeholder="请输入分组名称，长度不超过10个字"
          :maxlength="10"
          @keyup.enter.native="submit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script type='text/ecmascript-6'>
import tree from './tree'
export default {
  components: {
    tree
  },
  props: {
    visible: {
      type: Boolean,
      default () {
        return false;
      }
    },
    tree: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      btnloading: false,
      isTree: false, // 是否展示树形
      name: '全部图片',
      rules: {
        name: [
          {
            required: false,
            message: '请输入文件夹名称',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入分组名称',
            trigger: 'blur'
          },
          {
            max: 10,
            message: '长度不超过10个字',
            trigger: 'blur'
          }
        ]
      },
      form: {
        parent_id: 0,
        title: ''
      }
    };
  },
  methods: {
    // 关闭
    close () {
      this.$emit('close');
    },
    select () {
      this.isTree = true;
    },
    // 提交
    submit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.btnloading = true;
          try{
            let param = {
                  data:this.form,
                  url:"/Api/Admin/Files/addFolder",
                }
            let res = await this.request(param);
              this.$emit('close');
              this.$message({ message: res.msg, type: 'success'});
          }finally{
            this.btnloading = false;
          }
        } else {
          return false
        }
      })
    },
    // 获取节点数据
    node (data) {
      this.form.parent_id = data.id;
      this.name = data.label;
      this.isTree = false;
    },
    // 全部图片
    load (id) {
      this.form.parent_id = id;
      this.name = '全部图片';
      this.isTree = false;
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
>>> {
  .el-dialog {
    width 760px
  }
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color $cfff
  }
  .el-dropdown-menu {
    left 0 !important
  }
}
$w6 = 6px
.tree {
  position absolute
  top 40px
  left 0
  right 0
  z-index 10
  background-color $cfff
  box-shadow 0 2px 8px rgba(0,0,0,.15)
  max-height 400px
  overflow auto
  >>> {
    .fold {
      padding $w6
    }
    .el-input {
      position -webkit-sticky
      position sticky
      top 0
      z-index 1
      display block
      padding 4px
      background #fff
      padding $w6
    }
    .el-tree {
      margin-top 10px
      padding-left 26px
      padding-bottom 26px
      overflow-y visible !important
      height auto !important
    }
  }
}
</style>
