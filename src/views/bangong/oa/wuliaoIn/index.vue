<template>
  <section class="wuliaoIn">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="form_box"
    >
      <back />
      <el-form-item label="物料名称:" prop="wuliao">
        <span class="active pointer" @click="add">添加入库</span>
        <el-table :data="list" v-if="list.length > 0" border>
          <el-table-column width="120" label="物料图片" align="center">
            <template slot-scope="item">
              <imgs :img="item.row.first_pic" :width="60" :height="60" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="物料名称"></el-table-column>
          <el-table-column width="130" prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column width="130" prop="num" label="入库件数" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="130">
            <template slot-scope="item">
              <span class="a paddingl10" @click="del(item.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="入库日期:" prop="record_time" class="time">
        <el-date-picker
          v-model="form.record_time"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="渠道:" prop="source">
        <el-select v-model="form.source" clearable placeholder="请选择" >
          <el-option
            v-for="(item, index) in byUuidOptions"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单据号:" prop="order_no">
        <el-input v-model="form.order_no" placeholder="请输入单据号" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="note">
        <el-input type="textarea" :rows="4" v-model="form.note" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">添加入库</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
    <add
      v-if="visible"
      :visible="visible"
      @close="close"
      @submit="handleSubmit"
    />
  </section>
</template>

<script type='text/ecmascript-6'>
import add from './add';
import back from "components/back";
import imgs from "components/imgs";
export default {
  name: 'wuliaoIn',
  components: {
    add, imgs,back
  },
  data () {
    return {
      btnloading: false,
      rules: {
        wuliao: [
          {
            required: true,
            message: '请添加物料',
            trigger: 'blur'
          }
        ],
        source: [
          {
            required: true,
            message: '请选择渠道',
            trigger: 'blur'
          }
        ],
        order_no: [
          {
            required: true,
            message: '请填写单据号',
            trigger: 'blur'
          }
        ],
        record_time: [
          {
            required: true,
            message: '请填写日期',
            trigger: 'blur'
          }
        ]
      },
      byUuidOptions: [], // 渠道
      form: {
        wuliao: '', // 物料,[id=>num]
        source: '', // 来源
        order_no: '', // 单据号
        note: '', // 备注
        record_time: '', // 入库时间
      },
      visible: false, // 添加物料
      list: []
    }
  },
  mounted () {
    this.getInfoByUuid();
  },
  methods: {
    // 获取进货渠道数据
    async getInfoByUuid () {
      let data = {
        url: '/Api/Admin/SysOption/getInfoByUuid',
      };
      let res = await this.request(data);
      let result = res.result;
      this.byUuidOptions = result.content_name;
    },
    // 添加物料
    add () {
      this.visible = true;
    },
    // 添加物料 —— close
    close () {
      this.visible = false;
    },
    // 添加物料 —— value
    handleSubmit (data) {
      let temp = this.utils.deepClone(this.list);
      //是否存在
      data.forEach((e,i)=>{
          let index = -1;//有的索引
          this.list.forEach((e2,i2)=>{
            if(e.id===e2.id){
                index = i2;
            }
          });
          //判断
          if(index!=-1){
            temp[index]['num'] = parseInt(temp[index]['num']) + parseInt(e.num);
          }else{
            temp.push(e);
          }
      });
      this.list = temp;
      this.close();
    },
    // 添加物料 —— 删除
    del (row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.list.forEach((item, index) => {
          if (parseInt(item.id) === parseInt(row.id)) {
            this.list.splice(index, 1);
          }
        });
        this.utils.success("删除成功!");
      })
      .catch(err => {
        console.log(err)
      });
    },
    //提交
    submit () {
      let arr = this.list;
      let obj = {};
      for(let i = 0; i < arr.length; i ++) {
        obj[arr[i].id] = arr[i].num
      }
      this.form.wuliao = obj;

      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try{
            let data = this.form;
            data.url = "/Api/Admin/Wuliao/ruku";
            let res = await this.request(data);
            this.utils.success('入库物料成功', '/manage/wuliao/list');
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
      this.list = [];
      this.$refs.form.resetFields();
    }
  }
}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
>>> {
  .form_box {
    width 900px
  }
  .el-textarea,
  .el-input{
    width 500px
    .el-input__inner {
      padding-right 0
    }
  }
  .time .el-input{
    width 240px
  }
}
</style>
