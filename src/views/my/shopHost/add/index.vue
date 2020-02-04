<template>
  <section class="add">
    <back />
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="form_box"
    >
      <el-form-item label="网站域名:" prop="host">
        <el-input v-model="form.host" placeholder="请输入网站域名"></el-input>
      </el-form-item>
      <el-form-item label="首页指向:" prop="type">
        <el-radio v-model="form.type" label="0">电脑官网</el-radio>
        <el-radio v-model="form.type" label="1">手机商城</el-radio>
        <el-radio v-model="form.type" label="2">电脑商城</el-radio>
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即添加</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </section>
</template>

<script type='text/ecmascript-6'>
import back from "components/back";
export default {
  name: "add",
  components: {
    back
  },
  data() {
    return {
      btnloading: false,
      rules: {
        host: [
          {
            required: true,
            message: "请输入网站域名",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择首页指向",
            trigger: "blur"
          }
        ]
      },
      form: {
        shop_id: 0,
        host: "",
        type: ""
      }
    };
  },
  mounted() {
    this.form.shop_id = this.$route.query.shop_id;
  },
  methods: {
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            let param = {
              data: this.form,
              url: "/Api/Admin/ShopHost/add"
            };
            let res = await this.request(param);
            this.utils.success("添加成功", -1);
          } finally {
            this.btnloading = false;
          }
        } else {
          return false;
        }
      });
    },
    //重置
    reset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
