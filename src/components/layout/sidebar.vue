<template>
  <el-menu
    :router="true"
    :unique-opened="true"
    :default-active="path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu v-for="item1 in rightList" :key="item1.id" :index="item1.path">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item1.authName}}</span>
      </template>
      <el-menu-item v-for="item2 in item1.children" :key="item2.id" :index="'/'+item2.path">
        <i class="el-icon-star-on"></i>
        {{item2.authName}}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      rightList: []
    };
  },
  computed: {
    path: function() {
      return this.$route.path;
    }
  },
  methods: {
    async getUserRight() {
      var res = await this.$http.request({
        url: "/menus",
        method: "get"
      });
      var { data, meta } = res.data;
      if (meta.status === 200) {
        this.rightList = data;
        console.log(this.rightList);
      } else {
        this.$message.error(meta.msg);
      }
    }
  },
  mounted() {
    this.getUserRight();
  }
};
</script>

<style>
.el-menu-vertical-demo {
  height: 100%;
}
</style>
