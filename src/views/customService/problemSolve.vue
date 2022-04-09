<template>
  <d2-container>
    <div slot="header">
      <el-form
      ref="form"
      label-width="80px"
      :inline="true"
      :model="formInline">
      <el-form-item label="运单编号">
          <el-input placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="登记人">
          <el-input placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="问题类型">
          <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="日期范围">
        <div class="block">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="—"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
          <el-button type="primary">查询</el-button>
      </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" height="750" border>
      <el-table-column prop="date" label="订单编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="问题类型" width="120"> </el-table-column>
      <el-table-column prop="address" label="问题描述" width="300"> </el-table-column>
      <el-table-column prop="address" label="登记时间" width="180"> </el-table-column>
      <el-table-column prop="address" label="责任方" width="120"> </el-table-column>
      <el-table-column prop="address" label="登记人" width="120"> </el-table-column>
      <el-table-column prop="address" label="操作" width="100"> </el-table-column>
    </el-table>
    <div slot="footer">
      <el-pagination
      :total="total"
      :page-size="limit"
      :current-page="page"
      @current-change="handlePageChange"/>
    </div>
  </d2-container>
</template>
<script>
export default {
  data  () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: '',
      value2: ''
    }
  }
}
</script>
<style>
.el-input {
  width:300px
}
.el-col {
  width: 150px
}
.line {
    width: 15px;
    margin-left: 7px
}
</style>
