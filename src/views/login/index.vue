<template>
  <div class="lgoin_bg wh100">
    <div class="from_box">
      <h3>管理后台</h3>
      <p v-if="isShow" style="color:#999; margin-bottom:20px;">账号:demo   密码:123456</p>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-s-custom" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="submitForm"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="btnloading"
            type="primary"
            @click="submitForm"
            style="width:100%;height:40px;"
          >立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import router,{ resetRouter } from '@/router'
export default {
  data() {
    return {
      btnloading: false,
      isShow:false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      }
    };
  },
  mounted() {
    if(this.myConfig.host=='demo.mayibang.co'){
      this.isShow = true;
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try{
            let param = {
              url:"/Api/Admin/publics/login",
              data:this.form,
            };
            let res = await this.request(param);
            var token = res.result.token;
            this.utils.session.set('token',token);

            //获取店铺信息
            let param1 = {
              url:"/Api/Admin/publics/getShopInfo"
            };
            let res1 = await this.request(param1);
            this.utils.session.set('shop',res1.result);
            resetRouter();
            this.utils.success('登录成功!', '/home');

          }finally{
            this.btnloading = false;
          };
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var';

.lgoin_bg {
  background: $loginBg;
}

.from_box {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 30vh 35px 0;
  overflow: hidden;
  margin: 0 auto;

  h3 {
    font-size: 28px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: 700;
    letter-spacing: 10px;
  }

  >>> {
    .el-input input {
      display: inline-block;
      height: 54px;
      background-color: $loginInput;
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      color: $cfff;
      padding-left: 50px;
    }

    .el-input__icon {
      font-size: 19px;
      color: $c999;
      margin: 2px 10px 0;
    }
  }
}
</style>
