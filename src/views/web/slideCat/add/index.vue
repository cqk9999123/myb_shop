<template>
  <section class="add">
    <back />
    <el-form class="form_box" :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="图片:" prop="pic">
        <pic :num="1" :images="picArr" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="分类标题" prop="cat_title">
        <el-input v-model="form.cat_title" placeholder="请输入分类标题"></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="uuid">
        <el-input v-model="form.uuid" placeholder="请输入标识"></el-input>
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
    back, pic
  },
  data() {
    return {
      btnloading: false,
      options: [], //上级分类
      selectOptions: [], //选中的选项
      form: {
        cat_title: "",
        pic: "",
        uuid:'',
      },
      picArr: [],
      rules: {
        cat_title: {
          required: true,
          message: "请输入分类标题",
          trigger: "blur"
        }
      }
    };
  },
  mounted() {
  },
  methods: {
    //提交
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.btnloading = true;
          try{
            let data = this.form;
            if (this.selectOptions != 0) {
              data.parent_id = this.selectOptions.pop();
            }
            let param = {
              data:data,
              url:"/Api/Admin/SlideCat/add"
            };
            let res = await this.request(param);
            this.utils.success("操作成功!", -1);
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
      this.picArr = [];
      this.form.pic = '';
      this.$refs.form.resetFields();
    },
    // 图片上传
    getPic(imgs) {
      imgs.length > 0 ? this.form.pic = imgs[0].path : this.form.pic = ''
    }
  }
};
</script>
