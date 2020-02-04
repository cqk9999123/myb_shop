<!-- 上传图片 -->
<template>
  <el-dialog
    title="上传图片"
    top="100px"
    append-to-body
    :visible.sync="visible"
    :before-close="close">
    <div class="flex flex-end">
      <el-checkbox v-model="is_del" class="marginb10">保留原文件</el-checkbox>
      <el-checkbox v-model="is_original" class="marginb10">上传原图</el-checkbox>
    </div>
    <el-upload
      class="w100"
      :action="uploadUrl"
      :headers="headers"
      :before-upload="beforeUpload"
      :on-success="(response, file, fileList) => uploadSuccess(response, file, fileList)"
      :on-error="error"
      :on-remove="remove"
      :file-list="fileList"
      list-type="picture"
      :show-file-list="showFile"
      :data="uploadData"
      multiple
      drag>
      <div class="upload paddingt16 paddingb16 w100">
        <i class="el-icon-box f46 active"></i>
        <p class="f16 c666 margint20">将图片拖放到此处上传，或点击上传。</p>
        <p class="f14 c999">为了保证图片的正常使用，仅支持 500kb 以内jpg、png格式图片上传。</p>
        <p class="f14 c999">支持选择多张图片上传。</p>
      </div>
    </el-upload>
  </el-dialog>
</template>

<script type='text/ecmascript-6'>
import { delImg } from '../file'
export default {
  props: {
    visible: {
      type: Boolean,
      default () {
        return false;
      }
    },
    id: {
      type: Number,
      default () {
        return 0;
      }
    }
  },
  data () {
    return {
      headers: {
        't-host': window.my.host,
        't-token': this.utils.session.get('token')
      },
      is_del: false, // 是否删除本地图片
      is_original:false, //是否原图
      uploadUrl: window.my.api_url + '/Api/Admin/Files/upImg',
      fileList: [], // 存储上传数据
      uploadData: null,
      showFile: false // 验证上传成功
    };
  },
  methods: {
    // 关闭
    close () {
      this.$emit('close');
    },
    // 上传前
    beforeUpload () {
      // is_del: 是否删除本地图片 0|删除 1|不删除；默认为0
      let n = this.is_del ? 1 : 0
      // type: 0|压缩 1|原图；默认为0
      let type = this.is_original ? 1 : 0
      this.uploadData = { parent_id: this.id, type: type, is_del: n, width: 0, height: 0};
      let promise = new Promise((resolve) => {
        this.$nextTick(function () {
            resolve(true);
        });
      });
      return promise;
    },
    // 上传成功
    uploadSuccess (response, file, fileList) {
      if (file.status === 'success') {
        this.showFile = true;
        this.fileList = fileList;
      }
    },
    // 上传失败
    error () {
      console.log('上传失败');
    },
    // 删除
    remove(file, fileList) {
      const id = file.response.result.id;
      delImg(this, id, () => {}, 1);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
.upload {
  p {
    line-height 26px
  }
}
>>> {
  .el-dialog {
    width 760px
  }
  .el-upload,
  .el-upload-dragger {
    width 100%
    background-color $tableThead
  }
  .el-upload-list--picture .el-upload-list__item {
    border-color $ceee
  }
  .el-upload-list {
    overflow-y auto
    max-height 50vh
  }
}
</style>
