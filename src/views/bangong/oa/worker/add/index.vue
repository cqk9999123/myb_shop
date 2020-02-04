<template>
  <section class="add">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input type="number" v-model="form.age" placeholder="请输入年龄 只能输入数字"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-input v-model="form.birthday" placeholder="请输入生日"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <pic :num="1" :images="images" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="类型">
        <el-radio v-for="item in myConfig.type.oa_worker_type" :label="item.value" v-model="form.type">{{item.label}}</el-radio>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-for="item in myConfig.type.oa_worker_sex" :label="item.value" v-model="form.sex">{{item.label}}</el-radio>
      </el-form-item>
      <el-form-item label="入职时间" prop="entry_time">
        <el-date-picker
          v-model="form.entry_time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="介绍" prop="content">
        <ue ref="ue" @getContent="getContent" />
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即添加</el-button>
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
      options: [],
      selectOptions: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
      },
      form: {
        pic: "",
        name: "",
        phone: "",
        type:0,
        sex:0,
        age:0,
        birthday:"",
        entry_time:"",
        content: "",
      },
      images: [],
      picsArr: []
    };
  },
  mounted() {
    var date = new Date();
    this.form.entry_time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());

  },
  methods: {
    //获取编辑器内容
    getContent(data) {
      this.form.content = data;
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            let param = {
              data:this.form,
              url : "/Api/Admin/OaWorker/add"
            }
            let res = await this.request(param);
            this.utils.success("添加成功", -1);
          } finally {
            this.btnloading = false;
          }
        } else {
          return false;
        }
      });
    },
    //重置
    reset() {
      this.images = [];
      this.form.pic = "";
      this.$refs.form.resetFields();
      this.$refs.ue.setContent("");
    },
    // 图片上传
    getPic(imgs) {
      imgs.length > 0 ? (this.form.pic = imgs[0].path) : (this.form.pic = "");
    },
    getPics(imgs) {
      let arr = imgs.map(item => item.path);
      this.form.pics = arr.join(",");
    }
  }
};
</script>
