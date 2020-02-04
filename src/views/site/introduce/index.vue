<template>
  <section>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="saas系统介绍" name="1">
        <div>是的,诚如您所看到. 我们将为您的业务展现在尽量多的客户端. 让您的用户全方位无死角的了解您,联系您.</div>
        <div>您不必为使用系统发愁, 我们有专门的微信群,为您提供使用指导。</div>
        <div>进服务群,请先加微信: xxxielisen。</div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      activeNames: ['1']
    };
  },
  mounted() {
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>
