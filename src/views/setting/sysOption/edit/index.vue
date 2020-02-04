<template>
  <section class="add">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form_box">
      <el-form-item label="名称" prop="title">
        <el-input v-model="form.title" v-if="is_sys" disabled placeholder="请输入名称"></el-input>
        <el-input v-model="form.title" v-else placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="uuid">
        <el-input v-model="form.uuid" v-if="is_sys" disabled placeholder="请输入标识"></el-input>
        <el-input v-model="form.uuid" v-else placeholder="请输入标识"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="form.note" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="选项" prop="content">
        <el-input type="textarea" :rows="5" v-model="form.content" placeholder="一行表示一个选项"></el-input>
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
export default {
  name: "add",
  components: {
    back,
    pic
  },
  data() {
    return {
      btnloading: false,
      is_sys:1,
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        uuid: [
          {
            required: true,
            message: "请输入标识",
            trigger: "blur"
          }
        ]
      },
      form: {
        title: "",
        uuid: "",
        note: "",
        content: "",
        id:0
      }
    };
  },
  mounted() {
    this.getInfo(this.$route.query.id);
  },
  methods: {
    getInfo(id) {
      let data= {
        id:id
      }
      this.request({
        url:'/Api/Admin/SysOption/getInfo',
        method:'post',
        data
      }).then(res=>{
        let d = res.result
        this.is_sys = d.is_sys;
        this.form = {
          title:d.title,
          uuid:d.uuid,
          note:d.note,
          content:d.content,
          id:id
        }
      }).catch(err=>{})
    },
    //提交
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = this.form;
          this.btnloading = true;
          this.request({
            url: "/Api/Admin/SysOption/edit",
            method: "post",
            data
          })
            .then(res => {
              const code = parseInt(res.code);
              if (code === 200) {
                this.utils.success("添加成功", -1);
              }
              this.btnloading = false;
            })
            .catch(err => {
              this.btnloading = false;
            });
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
    }
  }
};
</script>


