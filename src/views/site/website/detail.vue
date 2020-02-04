<template>
  <section>
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="150px">
      <el-form-item label="编辑模板内容" prop="content">
      <el-input
        type="textarea"
        :rows="200"
        placeholder="请输入内容"
        v-model="form.content">
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即修改</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </section>
</template>

<script type='text/ecmascript-6'>
import back from "components/back";
export default {
  components: {
    back,
  },
  data() {
    return {
      btnloading: false,
      form: {
        title: "",
        content: "",
      },
    };
  },
  mounted() {
    this.form.title = this.$route.query.title;
    this.getInfo();
  },
  methods: {
    async getInfo(){
      let param = {
        data:{
          title: this.form.title
        },
        url: "/Api/Admin/Website/getTpl"
      };
      let res = await this.request(param);
      this.form = res.result;
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            let param = {
              data:this.form,
              url: "/Api/Admin/Website/updateTpl"
            }
            let res = await this.request(param);
            this.utils.success("修改成功", -1);
          } finally {
            this.btnloading = false;
          }
        } else {
          return false;
        }
      });
    },
  }
};
</script>
