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
      <el-form-item label="科目类型:" prop="type">
        <el-select v-model="form.type" clearable placeholder="请选择" >
          <el-option
            v-for="item in goodsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="科目名称:" prop="cat_title">
        <el-input v-model="form.cat_title" placeholder="请输入科目名称" clearable></el-input>
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
        cat_title: [
          {
            required: true,
            message: '请输入科目名称',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请输入科目名称',
            trigger: 'blur'
          }
        ]
      },
      goodsOptions: [
        {
          value: "0",
          label: '收入'
        },
        {
          value: "1",
          label: '支出'
        }
      ],
      form: {
        cat_title: '',
        type: ''
      }
    }
  },
  methods: {
    //提交
    submit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let data = this.form;
          this.btnloading = true;
          try {
            data.url = '/Api/Admin/LiushuiCat/add';
            let res = await this.request(data);
            this.utils.success('添加成功', -1);
          } finally {
            this.btnloading = false;
          }
        } else {
          return false
        }
      })
    },
    //重置
    reset () {
      this.$refs.form.resetFields();
    }
  }
}
</script>