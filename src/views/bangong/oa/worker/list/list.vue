<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id"></el-table-column>
      <el-table-column width="120" label="图片">
        <template slot-scope="item">
           <imgs :img="item.row.pic" :width="60" :height="60"/>
        </template>
      </el-table-column>
      <el-table-column  label="员工姓名">
         <template slot-scope="item">
           <span>{{item.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150"  label="电话">
         <template slot-scope="item">
           <span>{{item.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150"  label="年龄">
         <template slot-scope="item">
           <span>{{item.row.age}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="生日">
        <template slot-scope="item">
           <span>{{item.row.birthday}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="入职时间">
         <template slot-scope="item">
           <span>{{item.row.entry_time}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="排序">
        <template slot-scope="item">
          <input class="table_input" type="text" v-model="item.row.sort" @change="sortChange(item.row)" />
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="在职状态">
        <template slot-scope="item">
          <el-switch
            @change="statusChange(item.row)"
            v-model="item.row.status"
            :active-value="0"
            :inactive-value="1"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="item">
          <router-link :to="'/bangong/oa/worker/edit?id='+item.row.id">编辑</router-link>
          <span class="active marginl20 pointer" @click="del(item.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>
import imgs from "components/imgs";
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
   components: {
    imgs
  },
  data() {
    return {
      visible:false,
      expandKeys: [],
      form:{
          title:'',
          code:'',
          attrs_value:'',
          unit:'',
          note:'',
          reg_status:'',
          id:'',
          content:'',
      },
      rules:{
          content:[
          {
            required: true,
            message: "请选择员工名称",
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    //删除
    del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let param = {
          data: {
            id: row.id
          },
          url: "/Api/Admin/OaWorker/del"
        };
        let res = await this.request(param);
        this.utils.success("删除成功!");
        await this.$parent.getList();
      });
    },
    // 状态修改
    async statusChange(row) {
      let ids = [];
      ids.push(row.id);
      let param = {
        data: {
          ids: ids,
          data: { status: row.status }
        },
        url: "/Api/Admin/OaWorker/editVal"
      };
      let res = await this.request(param);
    },
    //修改排序
    async sortChange(row) {
      let ids = [];
      ids.push(row.id);
      let param = {
        data: {
          ids: ids,
          data: { sort: row.sort }
        },
        url: "/Api/Admin/OaWorker/editVal"
      };
      let res = await this.request(param);
      await this.$parent.getList();
    }
  }
};
</script>
