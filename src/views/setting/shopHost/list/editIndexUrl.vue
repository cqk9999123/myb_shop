<!-- 列表 -->
<template>
  <div>
    <el-dialog title="首页指向" :visible.sync="dialogFormVisible">
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="100px"
          class="form_box"
        >
        <el-form-item label="网站域名:" prop="host">
          <el-input disabled v-model="form.host" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="首页指向:" prop="type">
          <el-radio v-model="form.type" label='0'>电脑官网</el-radio>
          <el-radio v-model="form.type" label='1'>手机商城</el-radio>
          <el-radio v-model="form.type" label='2'>电脑商城</el-radio>
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
      btnloading: false,
      dialogFormVisible:false,
      type:{
        0:'电脑官网',
        1:'手机商城',
        2:'电脑商城',
      },
      form:{
        id:0,
        host:"",
        type:""
      },
      rules: {
        type: [
          {
            required: true,
            message: '请选择首页指向',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  mounted() {
  },
  methods: {
    //初始化
    init(id,type,host){
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
        this.form = {
          id:id,
          type:String(type),
          host:host
        }
        this.$refs.form.resetFields()
      });
    },
    //提交
    submit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          let param = {
            data:this.form,
            url : "/Api/Admin/ShopHost/editIndexUrl",
          };
          try{
            let res = await this.request(param);
                this.utils.success('修改成功');
                this.dialogFormVisible = false;
                await this.$parent.getList();
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
