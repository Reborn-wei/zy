<template>
  <div id="box"></div>
</template>

<script>
export default {
  mounted() {
    var map = new BMap.Map("box");
    // 创建地图实例
    var point = new BMap.Point(116.404, 39.915);
    // 创建点坐标
    map.centerAndZoom(point, 15);
    // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.NavigationControl());
  }
};
</script>

<style>
#box {
  height: 100%;
}
</style>
