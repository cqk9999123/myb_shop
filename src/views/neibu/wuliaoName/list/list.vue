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
      <el-table-column prop="title" label="编码">
         <template slot-scope="item">
           <span>{{item.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150"  label="物料名称">
         <template slot-scope="item">
           <span>{{item.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" label="英文名称">
        <template slot-scope="item">
          <span>{{item.row.english_title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="物料属性名">
        <template slot-scope="item">
           <span>{{item.row.attrs}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="备注">
         <template slot-scope="item">
           <span>{{item.row.note}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="状态">
         <template slot-scope="item">
           <span v-if="item.row.status==0">未审核</span>
           <span v-if="item.row.status==1">可用</span>
           <span v-if="item.row.status==2">禁用</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="日期">
        <template slot-scope="item">
            <span>{{item.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="item">
          <div v-if="item.row.status==0">
          <router-link :to="'/neibu/wuliaoName/edit?id='+item.row.id">编辑</router-link>
          <!-- <span class="active marginl20 pointer" @click="Review(item.row,2,'确认该物料名称可用')">可用</span> -->
          <span class="active marginl20 pointer" @click="Review(item.row,1,'确认审核该物料名称')">审核</span>
          <span class="active marginl20 pointer" @click="del(item.row)">删除</span>
          </div>
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
      expandKeys: []
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
          url: "/Api/Admin/OaWuliaoName/del"
        };
        let res = await this.request(param);
        this.utils.success("删除成功!");
        await this.$parent.getList();
      });
    },
    Review(row,i,text){
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let param = {
          data: {
            id: row.id,
            status:i
          },
          url: "/Api/Admin/OaWuliaoName/regVal"
        };
        let res = await this.request(param);
        this.utils.success("审核成功!");
        await this.$parent.getList();
      });
    }
  }
};
</script>
