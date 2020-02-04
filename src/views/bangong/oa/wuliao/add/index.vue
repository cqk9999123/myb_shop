<template>
  <section class="add">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form_box">
      <el-form-item label="物料图片:" prop="pics">
        <pic :images="images" @getPic="getPics" />
      </el-form-item>
      <el-form-item label="物料名称:" prop="title">
        <el-input v-model="form.title" placeholder="请输入物料名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="规格:" prop="spec">
        <el-input v-model="form.spec" placeholder="请输入规格" clearable></el-input>
      </el-form-item>
      <el-form-item label="条码:" prop="barcode">
        <el-input v-model="form.barcode" placeholder="请输入条码" clearable></el-input>
      </el-form-item>
      <el-form-item label="单位:" prop="unit">
        <el-input v-model="form.unit" placeholder="请输入单位，例如件" clearable></el-input>
      </el-form-item>
      <el-form-item label="进货渠道:" prop="source">
        <el-select v-model="form.source" clearable placeholder="请选择">
          <el-option
            v-for="(item, index) in byUuidOptions"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库存警报:" prop="stock_alarm">
        <el-select v-model="form.stock_alarm" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报警数量:" prop="alarm_num">
        <el-input
          type="number"
          v-model="form.alarm_num"
          min="0"
          placeholder="请输入低于多少开始警报"
          clearable
        ></el-input>
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
      rules: {
        title: [
          {
            required: true,
            message: "请输入物料名称",
            trigger: "blur"
          }
        ],
        stock: [
          {
            required: true,
            message: "请输入物料数量",
            trigger: "blur"
          }
        ],
        source: [
          {
            required: true,
            message: "请选择进货渠道",
          }
        ],
        stock_alarm: [
          {
            required: true,
            message: "请选择库存预警",
          }
        ]
      },
      byUuidOptions: [],
      options: [
        {
          value: "0",
          label: "开启"
        },
        {
          value: "1",
          label: "关闭"
        }
      ],
      form: {
        pics: "", // 物料图片
        title: "", // 物料名称
        spec: "", // 规格
        barcode: "", // 条码
        unit: "", // 单位
        source: "", // 进货渠道
        stock_alarm: "", // 库存警报
        alarm_num: "" // 低于多少开始警报
      },
      images: []
    };
  },
  mounted() {
    this.getInfoByUuid();
  },
  methods: {
    // 获取进货渠道数据
    async getInfoByUuid() {
      let data = {
        uuid: "stock_channel",
        url: "/Api/Admin/SysOption/getInfoByUuid",
      };
      let res = await this.request(data);
      let result = res.result;
      this.byUuidOptions = result.content_name;
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try{
            let data = this.form;
            if (!data.alarm_num) data.alarm_num = 0
            data.url = '/Api/Admin/Wuliao/add';
            let res = await this.request(data);
            this.utils.success("添加成功", -1);
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
      this.images = [];
      this.form.pics = "";
      this.$refs.form.resetFields();
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


<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var';

>>> {
  .item .el-input {
    width: 300px;

    .el-input__inner {
      padding-right: 0;
    }
  }
}
</style>
