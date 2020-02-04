<!-- 物料详情 -->
<template>
  <div class='wuliaoDetail' v-loading="loading">
    <back />
    <h6 class="font18 bold paddingt16 paddingb20">物料信息</h6>
    <el-row class="marginb10">
      <el-col :span="8">
        <p class="c666 f14 paddingb16 paddingt10">物料名称：{{obj.title}}</p>
      </el-col>
      <el-col :span="8">
        <p class="c666 f14 paddingb16 paddingt10">库存：{{obj.stock}}  {{obj.unit}}</p>
      </el-col>
      <el-col :span="8">
        <p class="c666 f14 paddingb16 paddingt10">损耗：{{obj.loss_num}}  {{obj.unit}}</p>
      </el-col>
      <el-col :span="8">
        <p class="c666 f14 paddingb16 paddingt10">领用：{{obj.chuku_num}}  {{obj.unit}}</p>
      </el-col>
      <el-col :span="8">
        <p class="c666 f14 paddingb16 paddingt10">规格：{{obj.spec}}</p>
      </el-col>
      <el-col :span="8">
        <p class="c666 f14 paddingb16 paddingt10">进货渠道：{{obj.source}}</p>
      </el-col>
    </el-row>
    <el-tabs v-model="form.active" @tab-click="handleClick">
      <el-tab-pane label="操作记录" name="operation">
        <operation ref="operation"/>
      </el-tab-pane>
      <el-tab-pane label="领用统计" name="collar">
        <collar ref="collar"/>
      </el-tab-pane>
      <el-tab-pane label="损耗统计" name="lossSta">
        <loss-sta ref="lossSta"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type='text/ecmascript-6'>
import back from "components/back";
import operation from '../operation';
import collar from '../collar';
import lossSta from '../lossSta';
export default {
  name: 'wuliaoDetail',
  components: {
    back, operation, collar, lossSta
  },
  data () {
    return {
      loading: false,
      id: 0,
      obj: {},
      form: {
        active: 'operation'
      },
    };
  },
  mounted () {
    this.id = this.$route.query.id;
    this.getInfo();
    this.$refs.operation.init(this.id);
  },
  methods: {
    //获取详情
    async getInfo() {
      this.loading = true;
      try{
        let data = {
          id: this.id,
          url: "/Api/Admin/Wuliao/getInfo",
        };
        let res = await this.request(data);
        this.obj = res.result;
      }finally{
        this.loading = false;
      }
    },
    // tab 切换
    handleClick (tab, event) {
      tab.$children[0].init(this.id);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
>>> {
  .el-tabs__nav-wrap::after {
    height 1px
  }
}
</style>
