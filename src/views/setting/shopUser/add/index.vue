<template>
  <section class="add">
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
      form: {
        username: "",
        phone: "",
        password: '123456'
      },
      rules: {
        username: {
          required: true,
          message: "请输入登陆账号",
          trigger: "blur"
        },
        phone: {
          required: true,
          message: "请输入电话号码",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          let param = {
                data:this.form,
                url:"/Api/Admin/ShopUser/add"
              };
          try{
            let res = await this.request(param);
            this.utils.success("操作成功!",-1);
          }finally{
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
    },
  }
};
</script>
