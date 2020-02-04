<template>
  <section class="edit">
    <back />
    <el-form class="form_box" :model="form" :rules="rules" ref="form" label-width="110px" >
      <el-form-item label="登陆账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入登陆账号"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
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
        username: "",
        phone: "",
        password: ''
      },
      rules: {
        username: {
          required: true,
          message: "请输入登陆账号",
          trigger: "blur"
        },
        phone: {
          required: true,
          message: "请输入手机号码",
          trigger: "blur"
        }
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
        data:{id: id,},
        url:"/Api/Admin/ShopUser/getInfo",
      };
      let res = await this.request(param);
      let d = res.result;
      this.form = {
        id:d.id,
        username: d.username,
        phone: d.phone,
        password: ''
      };
      this.$nextTick(() => {
        this.$refs['form'].clearValidate();
      })
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let param = {
              url:"/Api/Admin/ShopUser/edit",
              data:this.form
              }
          this.btnloading = true;
          try{
            let rew = await this.request(param);
            this.utils.success("修改成功!",-1);
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
