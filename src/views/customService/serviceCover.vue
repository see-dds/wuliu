<template>
  <d2-container>
    <el-row :span="24">
        <el-col :span="6">
        值:{{form}}<br/>
        <avue-input-map :params="params" placeholder="请选择地图" v-model="form" ></avue-input-map>
        </el-col>
    </el-row>
  </d2-container>
</template>
<script>
export default {
  data () {
    return {
      params: { // 高德初始化参数
        zoom: 10,
        zoomEnable: false,
        dragEnable: false
      },
      form: [113.10235504165291, 41.03624227495205, '内蒙古自治区乌兰察布市集宁区新体路街道顺达源广告传媒']
    }
  }
}
</script>
