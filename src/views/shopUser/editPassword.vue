<template>
  <section class="edit">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
      <el-form-item label="当前密码" prop="old_password">
        <el-input type="password" placeholder="请输入" v-model="form.old_password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input type="password" v-model="form.new_password" placeholder="请输入"></el-input>
        <p class="cccc">当前密码和新密码不能相同,密码至少6位</p>
      </el-form-item>
      <el-form-item>
        <el-button :loading="btnloading" type="primary" @click="submitForm">立即修改</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import back from "./../components/back";
export default {
  name: "edit",
  components: {
    back
  },
  data() {
    return {
      form: {
        old_password: "",
        new_password: ""
      },
      btnloading: false,
      rules: {
        old_password: {
          required: true,
          message: '请输入当前密码',
          trigger: 'blur'
        },
        new_password: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          { min: 6, message: "密码长度至少6位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try{
            let param = {
              data:this.form,
              url : "/Api/Admin/ShopUser/editPwd"
            }
            let res = await this.request(param);
          }finally{
            this.btnloading = true;
          }
        } else {
          console.log('error submit');
          return false;
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'></style>
