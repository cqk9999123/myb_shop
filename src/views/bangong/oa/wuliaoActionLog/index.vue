<!-- 物料概况 -->
<template>
  <div class="WuliaoActionLog">
    <ul class="paddingb16 flex order-number">
      <li class="paddingl26 item">
        <p class="c999 f14 name">物料数</p>
        <p class="c333 f24 num">{{result.cat_num}}</p>
      </li>
      <li class="paddingl26 item">
        <p class="c999 f14 name">库存</p>
        <p class="c333 f24 num">{{result.stock}}</p>
      </li>
      <li class="paddingl26 item">
        <p class="c999 f14 name">库存预警</p>
        <p class="c333 f24 num">{{result.alarm}}</p>
      </li>
    </ul>
    <el-tabs v-model="tab" @tab-click="handleClick">
      <el-tab-pane label="按领用人统计" name="eader">
        <eader ref="eader" />
      </el-tab-pane>
      <el-tab-pane label="按物料统计" name="materiel">
        <materiel ref="materiel" />
      </el-tab-pane>
      <el-tab-pane label="按损耗统计" name="loss">
        <loss ref="loss" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type='text/ecmascript-6'>
import eader from "./eader/index";
import materiel from "./materiel/index";
import loss from "./loss/index";
export default {
  name: "WuliaoActionLog",
  components: {
    eader,
    materiel,
    loss
  },
  data() {
    return {
      tab:'eader', //切换
      result: {} //统计数据
    };
  },
  mounted() {
    this.getCount();
    if(this.$route.query.tab){
        this.tab = this.$route.query.tab;
    }
    switch (this.tab) {
      case "eader":
        this.$refs.eader.init();
        break;
      case "materiel":
        this.$refs.materiel.init();
        break;
      case "loss":
        this.$refs.loss.init();
        break;
      default:
        this.$refs.eader.init();
        break;
    }
  },
  methods: {
    // 获取信息
    async getCount() {
      let data = {
        url: "/Api/Admin/Wuliao/getCount",
      };
      let res = await this.request(data);
      this.result = res.result;
    },
    // tab 切换
    handleClick(tab, event) {
      this.tab = tab.name;
      let query = {tab:this.tab};
      query.t = Date.now();
      this.$router.push({ query: query });
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var';

.order-number {
  .item {
    flex: 1 1;
    border-right: 1px solid $ceee;

    &:last-child {
      border-right: none;
    }
  }

  .name {
    line-height: 22px;
  }

  &.dashed {
    border-bottom: 1px dashed $ceee;
  }

  .num {
    line-height: 38px;
  }
}
</style>
