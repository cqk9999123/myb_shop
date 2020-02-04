<template>
  <section>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="网站LOGO" prop="pic">
        <pic :num="1" :images="picArr" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="网站名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入网站名称"></el-input>
      </el-form-item>
      <el-form-item label="网站关键词" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入网站关键词"></el-input>
      </el-form-item>
      <el-form-item label="网站描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入网站描述"></el-input>
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
          title: {
            required: true,
            message: '请输入网站名称',
            trigger: 'blur'
          }
      },
      form: {
        id:0,
        pic: "",
        title: "",
        keyword: "",
        description: "",
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
        pic: "",
        title: d.title,
        keyword: d.keyword,
        description: d.description,
      };
      if (d.pic){
        this.picArr.push({ path: d.pic });
      }
    },
    // 图片上传
    getPic(imgs) {
      imgs.length > 0
        ? (this.form.pic = imgs[0].path)
        : (this.form.pic = "");
    }
  }
};
</script>
