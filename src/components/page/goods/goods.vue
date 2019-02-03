<template>
  <el-card>
    <MyBread firstnav="商品管理" lastnav="商品列表"/>
    <el-row class="search">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">&nbsp;&nbsp;
        <el-button type="success" plain @click="add">添加商品</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="dataList" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="upd_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button plain size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dataList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      loading: true
    };
  },
  methods: {
    async getDataList() {
      var res = await this.$http.get(
        `/goods?query=${this.search}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      var { data, meta } = res.data;
      if (meta.status === 200) {
        this.dataList = data.goods;
        this.total = data.total;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } else {
        this.$message.error(meta.msg);
      }
    },
    add() {
      this.$router.push("/goods/add");
    }
  },
  mounted() {
    this.getDataList();
  }
};
</script>

<style>
</style>
