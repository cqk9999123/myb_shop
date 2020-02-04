<!-- 上传图片显示 —— 单张或多张 -->
<template>
  <div class='pic'>
    <div class="flex-items wrap">
      <div class="pic-box img radius4 marginr20 marginb10" v-for="(item, index) in imgs" :key="item.id">
        <imgs :img="item.path" :width="86" :height="86"/>
        <div class="pre radius4 flex-center">
          <i class="el-icon-view f16 cfff pointer marginr16" @click="handlePreview(item.path)"></i>
          <i class="el-icon-delete f16 cfff pointer" @click="handleDel(index)"></i>
        </div>
      </div>
      <div class="pic-box flex-center column radius4 pointer marginb10" @click="handleUpload">
        <i class="el-icon-plus c999 f16 bold"></i>
        <span class="c666 f13">上传</span>
      </div>
    </div>
    <upload
      v-if="uploadVisible"
      :num="num"
      :visible="uploadVisible"
      @close="uploadClose"
      @submit="uploadSubmit"
    />
    <preview
      v-if="previewVisible"
      :visible="previewVisible"
      :img="img"
      @close="previewClose"
    />
  </div>
</template>

<script type='text/ecmascript-6'>
import imgs from "components/imgs";
import upload from 'components/upload'
import preview from "components/preview";
export default {
  name: 'pic',
  components: {
    imgs, upload, preview,
  },
  props: {
    num: {
      type: Number,
      default () {
        return 0;
      }
    },
    images: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      imgs: [],
      img: '',
      uploadVisible: false, // 上传
      previewVisible: false // 浏览
    };
  },
  watch: {
    images () {
      this.imgs = this.images;
    }
  },
  methods: {
    // 上传
    handleUpload () {
      this.uploadVisible = true;
    },
    // 上传图片 —— close
    uploadClose () {
      this.uploadVisible = false;
    },
    // 上传图片 —— submit
    uploadSubmit (imgs) {
      if (this.num === 1) {
        this.imgs = imgs;
        this.$emit('getPic', imgs);
      } else {
        let temp = this.imgs;
        imgs.forEach((e,i)=>{
          let index = -1;
          this.imgs.forEach((e2,i2)=>{
            if(e.id===e2.id){
              index = i2;
            }
          });
          if(index != -1){
            temp[index]['path'] = temp[index]['path'];
          }else{
            temp.push(e);
          }
        });
        this.imgs = temp;
        this.$emit('getPic', this.imgs);
      }
      this.uploadVisible = false;
    },
    // 浏览图片
    handlePreview (img) {
      this.img = img;
      this.previewVisible = true;
    },
    // 浏览图 —— close
    previewClose (index) {
      this.previewVisible = false;
    },
    // 删除
    handleDel (index) {
      this.$confirm('确定删除该图片吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.imgs.splice(index, 1);
        this.uploadSubmit(this.imgs);
      }).catch(() => {
      });
    },


  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
.pic-box {
  width 100px
  height 100px
  border 1px dashed $cccc
  background-color $tableThead
  span {
    line-height 20px
  }
  &.img {
    background-color $cfff
    border-style solid
    position relative
    padding 6px
    transition all $ms
    &:hover {
      .pre {
        display flex
      }
    }
  }
  .pre {
    display none
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index 1
    background-color rgba(0,0,0,.5)
  }
}
.wrap {
  flex-wrap wrap
}
</style>
