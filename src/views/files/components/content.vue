<!-- 上传图片 -->
<template>
  <div class='filesUpdaload w100'>
    <aside class="f14 c999" :class="{'active': nodeData.label}">
      全部图片
      <span class="c999" v-if="nodeData.label">
        <b class="paddinglr">/</b>
        {{nodeData.label}}
      </span>
    </aside>
    <div class="flex-items paddingt16 paddingb16">
      <el-button size="small" @click="upload">上传</el-button>
      <el-button size="small" @click="folder">新建文件夹</el-button>
    </div>
    <div class="paddingb10 flex-items all">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="allChange">全选</el-checkbox>
      <div class="flex-items move marginl10 radius4 f0" v-show="isMove">
        <span class="f14 c666 textc bl" @click="moreDel">删除</span>
        <span class="f14 c666 textc br" @click="move">移动到</span>
      </div>
    </div>
    <div v-if="foldeArr.length > 0 || images.length > 0" class="all-box paddingt10" v-loading="loading">
      <el-checkbox-group v-model="checkedFolder" @change="folderChange">
        <el-checkbox v-for="item in foldeArr" :label="item.id" :key="item.id">
          <i class="el-icon-folder-opened f50 flex-center"></i>
          <div class="el-input textc text-overflow" @click.stop.prevent="edit(item.id, true)">{{item.title}}</div>
          <div v-if="item.flag">
            <el-input
              v-model="item.title"
              :value="item.title"
              @keyup.enter.native="editSuccess(item.id, item.title, false)"
              clearable
              autofocus
            ></el-input>
          </div>
        </el-checkbox>
        <el-checkbox v-for="(item, index) in images" :label="item.id" :key="item.id">
          <div class="img-box">
            <imgs :img="item.path" :width="130" :height="130"/>
            <div class="bottom paddingr10 textr">
              <i class="el-icon-delete-solid f16 cfff" @click.stop="del(item.id, index)"></i>
            </div>
          </div>
          <div class="el-input textc text-overflow">{{item.title}}</div>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div v-else class="no-data textc w100 paddingt80" v-loading="loading">
      <i class="el-icon-files c999 f70"></i>
      <p class="c999 f14 paddingt10">暂无数据</p>
    </div>
    <upload
      v-if="uploadVisible"
      :visible="uploadVisible"
      :id="id"
      @close="uploadClose"
    />
    <folder
      v-if="folderVisible"
      :visible="folderVisible"
      @close="folderClose"
      :tree="tree"
    />
    <move
      v-if="moveVisible"
      :visible="moveVisible"
      @close="moveClose"
      :tree="tree"
      :checkIds="checkIds"
    />
  </div>
</template>

<script type='text/ecmascript-6'>
import imgs from 'components/imgs'
import upload from './upload'
import folder from './folder'
import move from './move'
import { delImg } from '../file'

export default {
  name: 'filesUpdaload',
  components: {
    imgs, upload, folder, move
  },
  props: {
    loading: {
      type: Boolean,
      default () {
        return false;
      }
    },
    foldes: {
      type: Array,
      default () {
        return [];
      }
    },
    tree: {
      type: Array,
      default () {
        return [];
      }
    },
    imgs: {
      type: Array,
      default () {
        return [];
      }
    },
    id: {
      type: Number,
      default () {
        return 0;
      }
    },
    nodeData: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      isMove: false, // 是否展示移动选择
      checkAll: false, // 全选
      checkedFolder: [],
      isIndeterminate: false,
      uploadVisible: false, // 上传图片
      folderVisible: false, // 新建文件夹
      moveVisible: false, // 移动文件
      images: [],
      foldeArr: [],
      checkIds: [], // 用于存储 checkbox 选中值(id)
      tempImgsArr: [] // + 用于存储上传图片
    };
  },
  watch: {
    imgs () {
      this.images = this.imgs;
    },
    foldes () {
      this.foldeArr = this.foldes;
    }
  },
  methods: {
    // 全选
    allChange(flag) {
      let folde_arr = this.foldeArr;
      let imgs_arr = this.images;
      if (flag) {
        this.isMove = true;
        folde_arr.forEach(item => {
          this.checkedFolder.push(item.id);
        });
        imgs_arr.forEach(item => {
          this.checkedFolder.push(item.id);
        });

        // + 获取选中的图片
        this.$emit('files', imgs_arr, folde_arr);
      } else {
        this.isMove = false;
        this.checkedFolder = [];
      }
      this.checkIds = this.checkedFolder;
      this.isIndeterminate = false;
    },
    // 单选
    folderChange(value) {
      this.checkIds = value;
      let checkedCount = value.length;
      let foldeLen = this.foldeArr.length;
      let imgsLen = this.images.length;
      const contLen = foldeLen + imgsLen;
      this.checkAll = checkedCount === contLen;
      this.isIndeterminate = checkedCount > 0 && checkedCount < contLen;
      checkedCount > 0 ? this.isMove = true : this.isMove = false

      // + 获取选中的图片
      let imgs = this.images;
      this.tempImgsArr = [];
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < imgs.length; j++) {
          if (imgs[j].id === value[i]) {
            this.tempImgsArr.push(imgs[j]);
          }
        }
      }
      this.$emit('files', this.tempImgsArr, this.foldeArr);
    },
    // 修改
    edit (id, flag) {
      let foldeArr = this.foldeArr;
      foldeArr.forEach((item, index) => {
        if (item.id === id) {
          if (flag) {
            this.foldeArr[index].flag = true;
          } else {
            this.foldeArr[index].flag = false;
          }
        }
      });
    },
    // 修改成功
    async editSuccess (id, title, flag) {
      let ids = [];
      ids.push(id);
      let data = {
        data:{
          title:title,
          ids:ids,
        },
        url:"/Api/Admin/Files/editVal",
      };
      let res = await this.request(param);
      this.edit(id, flag);
      this.$emit('folderRefresh');
    },
    // 上传图片
    upload () {
      this.uploadVisible = true;
    },
    // 上传图片 —— close
    uploadClose () {
      this.$emit('uploadRefresh');
      this.uploadVisible = false;
    },
    // 新建文件夹
    folder () {
      this.folderVisible = true;
    },
    // 新建文件夹 —— close
    folderClose () {
      this.$emit('folderRefresh');
      this.$emit('uploadRefresh');
      this.folderVisible = false;
    },
    // 移动文件
    move () {
      this.moveVisible = true;
    },
    // 移动文件 —— close
    moveClose () {
      this.$emit('folderRefresh');
      this.$emit('uploadRefresh');
      this.moveVisible = false;
    },
    // 删除图片
    del (id, index) {
      this.confirm('确定删除该图片吗？', () => {
        delImg(this, id, () => {
          this.images.splice(index, 1);
        }, 1);
      });
    },
    // 删除多个（图片或文件夹）
    moreDel () {
      let id = this.checkIds;
      this.confirm('确定删除已选择的文件吗？', () => {
        delImg(this, id, () => {
          let imgLen = this.images;
          for (let j = 0; j < id.length; j++) {
            for (let i = 0; i < imgLen.length; i++) {
              if (parseInt(imgLen[i].id) === id[j]) {
                this.images.splice(i, 1);
              }
            }
          }
          let foldeLen = this.foldeArr;
          for (let j = 0; j < id.length; j++) {
            for (let i = 0; i < foldeLen.length; i++) {
              if (parseInt(foldeLen[i].id) === id[j]) {
                this.foldeArr.splice(i, 1);
              }
            }
          }
          // 清除 —— 全选和移动选择
          this.isMove = false;
          this.checkAll = false;

          this.$emit('folderRefresh');
        });
      });
    },
    confirm (title, callback) {
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callback && callback()
      }).catch(() => {
      });
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
$ra = 4px
$h24 = 24px
$h32 = 32px
$w130 = 130px
.all {
  height $h24
  line-height $h24
  >>> {
    .el-checkbox {
      height $h24
      line-height $h24
      min-width 52px
    }
    .el-checkbox__label {
      line-height $h24
    }
  }
}
.move {
  height $h24
  line-height $h24
  span {
    border 1px solid $cccc
    width 55px
    height $h24
    line-height $h24
    display inline-block
    cursor pointer
    transition all $ms
    &:hover {
      color $active
      border-color $active
    }
    &.bl:hover {
      z-index 2
    }
  }
  .bl {
    border-top-left-radius $ra
    border-bottom-left-radius $ra
    position relative
  }
  .br {
    position relative
    left -1px
    z-index 1
    border-top-right-radius $ra
    border-bottom-right-radius $ra
  }
}
.all-box {
  width 100%
  display flex
  flex-wrap wrap
  >>> {
    .el-checkbox-group {
      display flex
      flex-wrap wrap
    }
    .el-checkbox {
      width $w130
      height $w130
      margin-right 10px
      margin-bottom 50px
      position relative
      transition all $ms
      &:hover,
      &.is-checked {
        .img-box .bottom,
        .el-checkbox__inner {
          display block
        }
      }
      &.is-checked {
        .img-box,
        i.flex-center {
          border-color $active
        }
      }
      .el-checkbox__inner {
        display none
      }
    }
    .el-checkbox__input {
      position absolute
      left 10px
      top 10px
      z-index 1
    }
    .el-checkbox__label {
      padding-left 0
    }
    i.flex-center {
      color $active
      opacity 0.7
      width $w130
      height $w130
      border 1px solid $ceee
      position relative
      transition all $ms
      &:hover {
        box-shadow 0 2px 8px rgba(0,0,0,.5)
      }
    }
    .el-input {
      position absolute
      bottom -38px
      left 0
      z-index 2
      cursor pointer
    }
    .el-input,
    .el-input__inner,
    .el-input__icon {
      height $h32
      line-height $h32
    }
    .text-overflow {
      color $c666
    }
  }
  .img-box {
    width $w130
    height $w130
    position relative
    .bottom {
      display none
      position absolute
      bottom 0
      left 0
      right 0
      z-index 1
      height 30px
      line-height 30px
      background-color rgba(0, 0, 0, .58)
    }
  }
}

.paddinglr {
  padding 0 2px
}
</style>
