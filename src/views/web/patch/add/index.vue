<template>
  <section class="add">
    <back />
    <el-form class="form_box" :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="碎片标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入碎片标题"></el-input>
      </el-form-item>
      <el-form-item label="碎片标识" prop="uuid">
        <el-input v-model="form.uuid" placeholder="请输入碎片标识"></el-input>
      </el-form-item>
      <el-form-item label="图文一">
        <el-row>
          <el-col :span="12">
            <el-input type="textarea" placeholder="请输入文字一" rows="4" v-model="form.text1"></el-input>
          </el-col>
          <el-col class="paddingl10" :span="12">
            <pic :images="picArr1" :num="1" @getPic="getPic1" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="图文二">
        <el-row>
          <el-col :span="12">
            <el-input type="textarea" placeholder="请输入文字二" rows="4" v-model="form.text2"></el-input>
          </el-col>
          <el-col class="paddingl10"  :span="12">
            <pic :images="picArr2" :num="1" @getPic="getPic2" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="图文三">
        <el-row>
          <el-col :span="12">
            <el-input type="textarea" placeholder="请输入文字三" rows="4" v-model="form.text3"></el-input>
          </el-col>
          <el-col class="paddingl10"  :span="12">
            <pic :images="picArr3" :num="1" @getPic="getPic3" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="图文四">
        <el-row>
          <el-col :span="12">
            <el-input type="textarea" placeholder="请输入文字四" rows="4" v-model="form.text4"></el-input>
          </el-col>
          <el-col class="paddingl10"  :span="12">
            <pic :images="picArr4" :num="1" @getPic="getPic4" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="图册:" prop="pics">
        <pic :images="picsArr" @getPic="getPics" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <ue ref="ue" @getContent="getContent" />
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
import ue from "components/ue";
export default {
  name: "add",
  components: {
    back,
    pic,
    ue
  },
  data() {
    return {
      btnloading: false,
      options: [], //上级分类
      selectOptions: [], //选中的选项
      form: {
        title: "",
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: "",
        pics: "",
        text1: "",
        text2: "",
        text3: "",
        text4: "",
        uuid: "",
        content: ""
      },
      picArr1: [],
      picArr2: [],
      picArr3: [],
      picArr4: [],
      picsArr: [],
      rules: {
        title: {
          required: true,
          message: "请输入碎片标题",
          trigger: "blur"
        },
        uuid: {
          required: true,
          message: "请输入碎片标识",
          trigger: "blur"
        }
      }
    };
  },
  mounted() {},
  methods: {
    //获取编辑器内容
    getContent(data) {
      this.form.content = data;
    },
    //提交
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.btnloading = true;
          try{
            let param = {
              data:this.form,
              url:"/Api/Admin/Patch/add",
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
      (this.picArr1 = []),
        (this.picArr2 = []),
        (this.picArr3 = []),
        (this.picArr4 = []),
        (this.picsArr = []),
        this.$refs.form.resetFields();
    },
    // 图片上传
    getPic1(imgs) {
      imgs.length > 0 ? (this.form.pic1 = imgs[0].path) : (this.form.pic1 = "");
    },
    getPic2(imgs) {
      imgs.length > 0 ? (this.form.pic2 = imgs[0].path) : (this.form.pic2 = "");
    },
    getPic3(imgs) {
      imgs.length > 0 ? (this.form.pic3 = imgs[0].path) : (this.form.pic3 = "");
    },
    getPic4(imgs) {
      imgs.length > 0 ? (this.form.pic4 = imgs[0].path) : (this.form.pic4 = "");
    },
    getPics(imgs) {
      let arr = imgs.map(item => item.path);
      this.form.pics = arr.join(",");
    }
  }
};
</script>
