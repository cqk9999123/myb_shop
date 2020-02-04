<template>
  <section class="add">
    <back />
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="form_box"
    >
      <el-form-item label="网站名称:" prop="title">
        <el-input v-model="form.title" placeholder="请输入网站名称"></el-input>
      </el-form-item>
      <el-form-item label="网站域名:" prop="host">
        <el-input v-model="form.host" placeholder="请输入网站域名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="note">
        <el-input type="textarea" :rows="4" v-model="form.note" placeholder="请输入备注"></el-input>
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
import back from 'components/back'
export default {
  name: 'add',
  components: {
    back
  },
  data () {
    return {
      btnloading: false,
      rules: {
        host: [
          {
            required: true,
            message: '请输入网站域名',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入网站名称',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          },
          {
            validator: function(rule, value, callback) {
              if (/^1[356789]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      form: {
        host: '',
        title: '',
        phone: '',
        note: '',
      }
    }
  },
  methods: {
    //提交
    submit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try{
            let param = {
              data:this.form,
              url: "/Api/Admin/Shop/add"
            }
            let res = await this.request(param);
                this.utils.success('添加成功', -1);
          }finally{
            this.btnloading = false;
          }
        } else {
          return false
        }
      })
    },
    //重置
    reset () {
      this.$refs.form.resetFields()
    },
  }
}
</script>
