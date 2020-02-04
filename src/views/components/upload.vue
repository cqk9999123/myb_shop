<!-- 上传图片 -->
<template>
  <el-dialog
    title="上传图片"
    top="60px"
    append-to-body
    :visible.sync="visible"
    :before-close="close">
    <files @files="files"/>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取 消</el-button>
      <el-button size="small" type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script type='text/ecmascript-6'>
import files from 'views/files'
export default {
  components: {
    files
  },
  props: {
    visible: {
      type: Boolean,
      default () {
        return false;
      }
    },
    num: { // 1 表示只能上传一张图片，否则可多张
      type: Number,
      default () {
        return 0;
      }
    }
  },
  data () {
    return {
      imgs: [],
      folder: []
    };
  },
  methods: {
    // 关闭
    close () {
      this.$emit('close');
    },
    // 获取选中的图片
    files (imgs, folder) {
      this.imgs = imgs;
      this.folder = folder;
    },
    // 提交
    submit () {
      let imgs = this.imgs;
      if (imgs.length > 0) {
        if(this.num === 1 && imgs.length!=1 ){
          this.$message({ message: '只能选择一张图片！！！', type: 'error'});
          return false;
        }
      } else {
        this.$message({ message: '请选择图片！', type: 'error'});
        return false;
      }
      this.$emit('submit', imgs);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
>>> {
  .el-dialog {
    width 980px
  }
  .el-tree {
    height calc(100vh - 420px) !important
  }
  .el-checkbox-group {
    overflow-y auto
    max-height calc(100vh - 460px)
  }
}
</style>
