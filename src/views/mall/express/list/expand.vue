<!-- 列表详情 -->
<template>
  <div class='expand'>
    <el-form label-position="left" inline class="flex-around paddingl16 paddingt10 paddingb10">
      <el-form-item>
        <span class="bold paddingl10">微店数据</span>
        <p>项目数：{{props.worker}}</p>
        <p>项目订单数：{{props.contract_order}}</p>
        <p>中介工人数：{{props.zhongjie_worker}}</p>
        <p>中介订单数：{{props.zhongjie_order}}</p>
      </el-form-item>
      <el-form-item>
        <span class="bold paddingl10">门店数据</span>
        <p>合同数：{{props.contract}}</p>
        <p>员工数：{{props.worker}}</p>
        <p>客户数：{{props.user}}</p>
      </el-form-item>
      <el-form-item>
        <span class="bold paddingl10">服务商数据</span>
        <p>可承接项目数：{{props.project}}</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'expand',
  props: {
    props: {
      type: Object,
      default () {
        return {};
      }
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.expand {
  >>> {
    .el-form {
      flex-wrap wrap
      justify-content flex-start
      align-items flex-start
    }
    .el-form-item {
      width 33.33%
      margin 0
    }
  }
  p {
    line-height 32px
  }
}
</style>
