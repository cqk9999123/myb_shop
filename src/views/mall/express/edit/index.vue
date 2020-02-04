<template>
  <section class="edit">
    <back />
    <el-form class="form_box" :model="form" :rules="rules" ref="form" label-width="110px" >
      <el-form-item label="公司名称" prop="company_name">
        <el-input v-model="form.company_name" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="快递100" prop="kuaidi100_code">
        <el-input v-model="form.kuaidi100_code" placeholder="请输入快递100编码"></el-input>
      </el-form-item>
      <el-form-item label="淘宝" prop="taobao_code">
        <el-input v-model="form.taobao_code" placeholder="请输入淘宝编码"></el-input>
      </el-form-item>
      <el-form-item label="是否常用" prop="is_default">
          <el-switch v-model="form.is_default"></el-switch>
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即提交</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import back from "components/back";
export default {
  name: "edit",
  components: {
    back
  },
  data() {
    return {
      btnloading: false,
      form: {
        id:0,
        company_name: "",
        kuaidi100_code: "",
        taobao_code: '',
        is_default: false
      },
      rules: {
        company_name: {
          required: true,
          message: "请输入公司名称",
          trigger: "blur"
        },
      }
    };
  },
  mounted() {
    this.getInfo(this.$route.query.id);
  },
  methods: {
    //获取数据
    async getInfo(id) {
      let param = {
        data:{id: id},
        url: "/Api/Admin/express/getInfo",
      };
      let res = await this.request(param);
      let d = res.result;
      this.form = {
        id:d.id,
        company_name: d.company_name,
        kuaidi100_code: d.kuaidi100_code,
        taobao_code: d.taobao_code,
        is_default: d.is_default==1?true:false
      };
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      })
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try{
            let data = this.utils.deepClone(this.form);
              data.is_default=data.is_default===true?1:0;
              let param = {
                data:data,
                url:"/Api/Admin/express/edit"
              };
            let res = await this.request(param);
             if (res.code == 200) {
                this.utils.success("修改成功!",-1);
              }
          }finally{
            this.btnloading = false;
          }
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    //重置
    reset() {
      this.getInfo(this.$route.query.id);
    },
  }
};
</script>
