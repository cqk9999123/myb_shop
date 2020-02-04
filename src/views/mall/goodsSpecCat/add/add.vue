<!-- 列表 -->
<template>
  <div>
    <el-dialog title="添加属性" :visible.sync="dialogFormVisible">
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="100px"
          class="form_box"
        >
        <el-form-item label="属性名称:" prop="title">
          <el-input v-model="form.title" placeholder="请输入属性名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="属性值" prop="content">
          <el-input type="textarea" :rows="5" v-model="form.content" placeholder="一行表示一个属性值"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submit" :loading="btnloading">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      btnloading:false,
      dialogFormVisible:false,
      rules: {
        title: [
          {
            required: true,
            message: "请输入属性名称",
            trigger: "blur"
          }
        ]
      },
      form: {
        title: "",
        content: ""
      }
    };
  },
  mounted() {
  },
  methods: {
    //初始化
    init(){
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
        this.$refs.form.resetFields()
      });
    },
    //提交
    submit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try{
            let data = this.form;
            if (data.content.indexOf("\n") > -1) {
              let arr = data.content.split(/[(\r\n)\r\n]+/);
                  arr = this.utils.uniqueArr(arr);
                  data.content = arr;
            }
            this.dialogFormVisible = false;
            this.$parent.choose(this.utils.deepClone(data));
          }finally{
            this.btnloading = false;
          }
        } else {
          return false
        }
      })
    },
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'></style>
