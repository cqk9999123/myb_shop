<template>
  <section class="add">
    <el-form class="form_box" label-width="130px">
      <el-form-item label="微信商户ID" prop="wx_mch_id">
        <el-input v-model="wx_mch_id" placeholder="请输入微信商户ID"></el-input>
      </el-form-item>
      <el-form-item label="小程序APP id" prop="wx_mini_app_id">
        <el-input v-model="wx_mini_app_id" placeholder="请输入小程序APP id"></el-input>
      </el-form-item>
      <el-form-item label="小程序App Secret" prop="wx_mini_app_secret">
        <el-input v-model="wx_mini_app_secret" placeholder="请输入小程序App Secret"></el-input>
      </el-form-item>
      <el-form-item label="微信App Id" prop="wx_app_id">
        <el-input v-model="wx_app_id" placeholder="请输入微信App Id"></el-input>
      </el-form-item>
      <el-form-item label="微信App Secret" prop="wx_app_secret">
        <el-input v-model="wx_app_secret" placeholder="请输入微信App Secret"></el-input>
      </el-form-item>
      <el-form-item label="回调域名" prop="wx_callback_domain">
        <el-input v-model="wx_callback_domain" placeholder="请输入回调域名"></el-input>
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
import pic from "components/pic";
export default {
  name: "add",
  components: {
    back,
    pic
  },
  data() {
    return {
      btnloading: false,
      wx_mch_id: "",
      wx_mini_app_id: "",
      wx_mini_app_secret: "",
      wx_app_id: "",
      wx_app_secret: "",
      wx_callback_domain: "",
      ids: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    //提交
    submit() {
      this.btnloading = true;
      let arr = [];
      arr['wx_mch_id'] = this.wx_mch_id;
      arr['wx_mini_app_id'] = this.wx_mini_app_id;
      arr['wx_mini_app_secret'] = this.wx_mini_app_secret;
      arr['wx_app_id'] = this.wx_app_id;
      arr['wx_app_secret'] = this.wx_app_secret;
      arr['wx_callback_domain'] = this.wx_callback_domain;
      let data = {
        ids:this.ids,
        data:arr
      }
      console.log(data);
      
      this.request({
        url: "/Api/Admin/ShopConfig/editVal",
        method: "post",
        data
      })
        .then(res => {
          this.utils.success("操作成功!");
          this.btnloading = false;
        })
        .catch(err => {
          this.btnloading = false;
        });
    },
    getInfo() {
      this.request({
        url: "/Api/Admin/ShopConfig/getInfo",
        method: "post"
      })
        .then(res => {
          let d = res.result;
          this.ids = [d.id]
          this.wx_mch_id = d.wx_mch_id,
          this.wx_mini_app_id = d.wx_mini_app_id,
          this.wx_mini_app_secret = d.wx_mini_app_secret,
          this.wx_app_id = d.wx_app_id,
          this.wx_app_secret = d.wx_app_secret,
          this.wx_callback_domain = d.wx_callback_domain;
        })
        .catch(err => {});
    },
    //重置
    reset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
