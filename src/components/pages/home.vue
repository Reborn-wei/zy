<template>
  <div class="home">
    <el-container>
      <el-header>
        <!-- 头部区域 -->
        <Top/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <SideBar/>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Top from '@/layout/top.vue'
import SideBar from '@/layout/sidebar.vue'
export default {
  components: {
    Top,
    SideBar
  },
  beforeCreate () {
    var token = window.localStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
      this.$message.error('您还没有登录，请先登录')
    }
  }
}
</script>

<style>
.home,
.el-container {
  height: 100%;
}

.el-header {
  padding: 0;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
</style>
