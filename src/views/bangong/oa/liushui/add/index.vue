<template>
  <section class="add">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form_box">
      <el-form-item label="图片:" prop="pics">
        <pic :images="images" @getPic="getPics" />
      </el-form-item>
      <el-form-item label="科目:" prop="cat_id">
        <el-cascader
          v-model="cat_id"
          :options="subjectOptions"
          :props="{ expandTrigger: 'hover' }"
          @change="subjectChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="金额:" prop="money" class="number">
        <el-input-number :precision="2" :min="0" controls-position="right" v-model="form.money"></el-input-number>
      </el-form-item>

      <el-form-item label="账期时间:" prop="liushui_time">
        <el-date-picker
          v-model="form.liushui_time"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          placeholder="选择账期时间"
          default-time="12:00:00"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="备注:" prop="note">
        <el-input type="textarea" :rows="4" v-model="form.note" placeholder="请输入备注" clearable></el-input>
      </el-form-item>
      <el-divider content-position="left">扩展</el-divider>

      <el-form-item label="客户:" prop="note">
        <extUser ref="extUser" @getExtUser="getExtUser" />
        <el-button size="mini" v-on:click="selectExtUser" type="primary" plain>选择客户</el-button>
        <el-button
          size="mini"
          v-if="user_info"
          class="paddingl10"
          v-on:click="clearExtUser"
          type="text"
        >清除客户</el-button>
        <el-input placeholder="请选择客户" v-model="user_info" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="合同:" prop="note">
        <extMendianOrder ref="extMendianOrder" @getExtMendianOrder="getExtMendianOrder" />
        <el-button size="mini" v-on:click="selectExtMendianOrder" type="primary" plain>选择合同</el-button>
        <el-button
          size="mini"
          v-if="mendian_order_info"
          class="paddingl10"
          v-on:click="clearExtMendianOrder"
          type="text"
        >清除合同</el-button>
        <el-input placeholder="请选择合同" v-model="mendian_order_info" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="合同计划:" prop="note">
        <extMendianOrderList
          ref="extMendianOrderList"
          @getExtMendianOrderList="getExtMendianOrderList"
        />
        <el-button size="mini" v-on:click="selectExtMendianOrderList" type="primary" plain>选择合同计划</el-button>
        <el-button
          size="mini"
          v-if="mendian_order_list_info"
          class="paddingl10"
          v-on:click="clearExtMendianOrderList"
          type="text"
        >清除合同计划</el-button>
        <el-input placeholder="请选择合同计划" v-model="mendian_order_list_info" :disabled="true"></el-input>
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
import extUser from "./extUser";
import extMendianOrder from "./extMendianOrder";
import extMendianOrderList from "./extMendianOrderList";
export default {
  name: "add",
  components: {
    back,
    pic,
    extUser,
    extMendianOrder,
    extMendianOrderList
  },
  data() {
    return {
      btnloading: false,
      user_info: "", //客户信息
      mendian_order_info: "", //订单信息
      mendian_order_list_info: "", //订单计划信息
      subjectOptions: [
        {
          value: 0,
          label: "收入",
          children: []
        },
        {
          value: 1,
          label: "支出",
          children: []
        }
      ],
      rules: {
        cat_id: [
          {
            required: true,
            message: "请输入科目",
            trigger: "blur"
          }
        ],
        money: [
          {
            required: true,
            message: "请输入金额",
            trigger: "blur"
          }
        ],
        liushui_time: [
          {
            required: true,
            message: "日期时间",
            trigger: "blur"
          }
        ]
      },
      cat_id: "",
      form: {
        pics: "",
        cat_id: "",
        money: "",
        note: "",
        liushui_time: "",
        ext: "",
        user_id: 0,
        mendian_order_id: 0,
        mendian_order_list_id: 0
      },
      images: []
    };
  },
  mounted() {
    this.getList();
    if (this.$route.query.user_id) {
      this.getUserInfo(this.$route.query.user_id);
    }
  },
  methods: {
    //获取用户信息
    async getUserInfo(user_id) {
      this.loading = true;
      try {
        let data = {
          url: "/Api/Admin/Mduser/getInfo",
          id: user_id
        };
        let res = await this.request(data);
        this.form.user_id = res.result.info.id;
        this.user_info = res.result.info.name;
      } finally {
        this.loading = false;
      }
    },
    //选择客户
    selectExtUser() {
      this.$refs.extUser.reset();
    },
    //获取选择的客户
    getExtUser(item) {
      this.user_info = item.name;
      this.form.user_id = item.id;
      this.clearExtMendianOrder();
      this.clearExtMendianOrderList();
    },
    //清空客户
    clearExtUser() {
      this.user_info = "";
      this.form.user_id = 0;
      this.clearExtMendianOrder();
      this.clearExtMendianOrderList();
    },
    //选择合同
    selectExtMendianOrder() {
      if (!this.form.user_id) {
        return this.$message({
          message: "请先选择用户",
          type: "warning"
        });
      }
      this.$refs.extMendianOrder.reset(this.form.user_id);
    },
    //获取选择的合同
    getExtMendianOrder(item) {
      this.mendian_order_info =
        item.project_cat_title + " " + item.user_address;
      this.form.mendian_order_id = item.id;
      this.clearExtMendianOrderList();
    },
    //清空合同
    clearExtMendianOrder() {
      this.mendian_order_info = "";
      this.form.mendian_order_id = 0;
      this.clearExtMendianOrderList();
    },
    //选择合同计划
    selectExtMendianOrderList() {
      if (!this.form.mendian_order_id) {
        return this.$message({
          message: "请先选择合同",
          type: "warning"
        });
      }
      this.$refs.extMendianOrderList.reset(this.form.mendian_order_id);
    },
    //获取选择的合同计划
    getExtMendianOrderList(item) {
      this.mendian_order_list_info = item.day;
      this.form.mendian_order_list_id = item.id;
    },
    //清空合同计划
    clearExtMendianOrderList() {
      this.mendian_order_list_info = "";
      this.form.mendian_order_list_id = 0;
    },
    // 选择科目
    subjectChange(value) {
      this.form.cat_id = value[1];
    },
    // 选择科目 —— 获取数据
    async getList() {
      let data = {
        url: "/Api/Admin/LiushuiCat/getList",
        page: 1,
        page_size: 1000,
        field: "cat_title",
        keyword: "",
        type: "",
        is_sys: ""
      };
      let res = await this.request(data, "get");
      if (code === 200) {
        let result = res.result.list;
        result = this.utils.changeJsonKey(result, "cat_title", "label");
        result = this.utils.changeJsonKey(result, "id", "value");
        this.subjectOptions[1].children = result;
        let zhichu = [];
        let shuru = [];
        result.forEach((item, index) => {
          if (parseInt(item.type) === 0) {
            shuru.push(item);
          } else {
            zhichu.push(item);
          }
        });
        this.subjectOptions[1].children = zhichu;
        this.subjectOptions[0].children = shuru;
      }
    },
    //提交
    async submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let data = this.form;
          this.btnloading = true;
          try {
            data.url = "/Api/Admin/Liushui/add";
            await this.request(data);
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
      this.form.pics = "";
      this.form.user_id = 0;
      this.form.mendian_order_id = 0;
      this.form.mendian_order_list_id = 0;
      this.user_info = "";
      this.mendian_order_info = "";
      this.mendian_order_list_info = "";
      this.$refs.form.resetFields();
    },
    // 图片上传
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
  .number .el-input__inner {
    padding-right: 0;
  }
}
</style>
