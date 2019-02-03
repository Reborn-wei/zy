<template>
    <div class="home">
        <el-container>
            <el-header>
                <Top />
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <SideBar />
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
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    height: 100%;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
}
</style>
