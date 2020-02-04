<template>
  <section>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="联系邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入联系邮箱"></el-input>
      </el-form-item>
      <el-form-item label="联系QQ" prop="qq">
        <el-input v-model="form.qq" placeholder="请输入联系QQ"></el-input>
      </el-form-item>
      <el-form-item label="微信号码" prop="wx">
        <el-input v-model="form.wx" placeholder="请输入联系微信号码"></el-input>
      </el-form-item>
      <el-form-item label="微信二维码" prop="wx_pic">
        <pic :num="1" :images="picArr" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="联系电话" prop="company_phone">
        <el-input v-model="form.company_phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="联系地址" prop="company_address">
        <el-input v-model="form.company_address" placeholder="请输入联系地址"></el-input>
      </el-form-item>
      <el-form-item label="营业时间" prop="business_time">
        <el-input v-model="form.business_time" placeholder="请输入营业时间"></el-input>
      </el-form-item>
      <el-form-item label="官网版权" prop="copy_right">
        <el-input v-model="form.copy_right" placeholder="请输入官网版权"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即提交</el-button>
        </div>
      </el-form-item>
    </el-form>
  </section>
</template>

<script type='text/ecmascript-6'>
import pic from "components/pic";
export default {
  components: {
    pic
  },
  data() {
    return {
      btnloading: false,
      picArr: [],
      rules: {
      },
      form: {
        id:0,
        qq: "",
        email: "",
        company_phone: "",
        company_address: "",
        business_time: "",
        wx: "",
        wx_pic: "",
        copy_right: "",
      },
    };
  },
  mounted() {
    let shop = this.utils.session.get("shop");
    this.getInfo(shop.id);
  },
  methods: {
    //提交
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
            this.btnloading = true;
            try{
              let param = {
                data:this.form,
                url:"/Api/Admin/Shop/edit",
              };
              let res = await this.request(param);
                  this.utils.success("操作成功!");
            }finally{
              this.btnloading = false;
            }
        } else {
          console.log('error submit');
          return false;
        }
      });
    },
    async getInfo(id) {
      let param = {
        data:{id: id,},
        url:"/Api/Admin/Shop/getInfo"
      };
      let res = await this.request(param);
      let d = res.result;
      this.form = {
        id:id,
        qq: d.qq,
        email: d.email,
        company_phone: d.company_phone,
        company_address: d.company_address,
        business_time: d.business_time,
        wx: d.wx,
        wx_pic: d.wx_pic,
        copy_right: d.copy_right,
      };
      if (d.wx_pic){
        this.picArr.push({ path: d.wx_pic });
      }
    },
    // 图片上传
    getPic(imgs) {
      imgs.length > 0
        ? (this.form.wx_pic = imgs[0].path)
        : (this.form.wx_pic = "");
    }
  }
};
</script>
