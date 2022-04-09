<template>
  <d2-container>
    <div slot="header">
      <el-input placeholder="请输入内容" v-model="userName" clearable></el-input>
      <el-button slot="append" type="primary" @click="getList()">搜索</el-button>
      <el-select v-model="select" class="state" slot="prepend" placeholder="订单状态">
        <el-option label="未开始" value="1"></el-option>
        <el-option label="进行中" value="2"></el-option>
        <el-option label="已完成" value="3"></el-option>
      </el-select>
      <el-button class="allOrder" type="primary">全部订单</el-button>
    </div>
    <el-table :data="tableData" height="750" border style="width: 100%">
      <el-table-column prop="orderID" label="订单号" width="180">
      </el-table-column>
      <el-table-column prop="userID" label="客户ID" width="180">
      </el-table-column>
      <el-table-column prop="driverID" label="司机ID" width="180">
      </el-table-column>
      <el-table-column prop="startAddr" label="起点" width="180">
      </el-table-column>
      <el-table-column prop="endAddr" label="终点" width="180">
      </el-table-column>
      <el-table-column prop="orderDate" label="预约时间" width="180">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="130">
      </el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="130">
      </el-table-column>
      <el-table-column prop="carName" label="车辆类型" width="130">
      </el-table-column>
      <el-table-column prop="cut" label="平台抽成" width="130">
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-pagination
        :total="total"
        :page-size="limit"
        :current-page="page"
        @current-change="handlePageChange"
      />
    </div>
  </d2-container>
</template>
<script>
import { findOrderAll, findOrderOne } from '@/apis/order'
export default {
  data () {
    return {
      page: 1,
      limit: 20,
      userName: '',
      tableData: [],
      total: 0,
      input: '',
      input1: '',
      input2: '',
      input3: '',
      select: '',
      orderInfo: {
        orderID: '',
        userID: '',
        driverID: '',
        startAddr: '',
        endAddr: '',
        orderDate: '',
        price: '',
        orderState: '',
        carName: '',
        cut: ''
      }
    }
  },
  created () {
    // this.getList()
    this.getListAll()
  },
  watch: {
    select () {
      this.getList()
    },
    queryID () {
      this.getList()
    }
  },
  methods: {
    async search () {
      const { orderID } = this.orderInfo
      const res = await findOrderOne({ id: orderID })
      const { success } = res
      if (!success) return this.$notify.warning('查询失败')
      this.$notify.success('查询成功')
      this.getList()
    },
    // 获取列表数据
    async getListAll () {
      const res = await findOrderAll()
      this.tableData = res.data
      this.total = res.info.data.count
      console.log(res)
    },
    // 模糊搜索
    async getList () {
      console.log(1)
      const { page, limit } = this
      const postData = {
        page,
        limit
      }
      // if (this.select == 2) postData.id = this.userName
      // if (this.select == 3) postData.orderState = this.userName
      if (this.userName) postData.userID = this.userName
      const res = await findOrderAll({ userID: this.userName })
      this.tableData = res.data
      this.total = res.info.data.count
      console.log(this.tableData)
    }
  }
}
</script>
<style scoped>
.state {
  width: 120px;
  margin-left: 100px;
}
.allOrder {
  width: 120px;
  margin-left: 210px;
}
</style>
