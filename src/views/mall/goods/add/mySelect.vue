<template>
  <el-dialog title="选择属性组" top="100px" append-to-body :visible.sync="visible" :before-close="close">
    <el-radio-group v-model="radio">
      <el-radio :label="item.cat_id" v-for="item in radioList" :key="item.cat_id">{{item.cat_name}}</el-radio>
    </el-radio-group>
    <div slot="footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script type='text/ecmascript-6'>
export default {
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      radioList: [],
      radio: 0
    };
  },
  mounted () {
    this.getInfo();
  },
  methods: {
    async getInfo () {
      let param = {
        url:"/Api/Admin/GoodsSpecCat/getGoodsSpecCat",
      };
      let res = await this.request(param);
      let danpin = {
        cat_id:0,
        cat_name:'单品',
        spec:[
          {
            id:1,
            text:'单品',
            values:[
              {
                id:1,
                text:'单品',
              }
            ]
          }
        ],
      };
      this.radioList.push(danpin);
      if (res.result.length > 0){
        res.result.forEach((e,i)=>{
            this.radioList.push(e);
        });
      }
    },
    // 关闭
    close() {
      this.$emit("close");
    },
    // 确定
    ok() {
      let obj = {};
      if (this.radioList.length > 0) {
        this.radioList.forEach(item => {
          if (this.radio === item.cat_id) {
            obj = item;
          }
        });
        this.$emit("ok", obj);
      } else {
        this.$message({
          message: '请添加属性设置',
          type: 'warning'
        });
      }
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var';
>>> {
  .el-radio-group {
    min-height 100px
  }
}
</style>
