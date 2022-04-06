<template>
  <d2-container>
    <template slot="header">新增订单</template>
    <el-row style="margin-bottom:20px">
      <el-radio-group v-model="sizeValue">
        <el-radio label="small">默认</el-radio>
        <el-radio label="medium">medium</el-radio>
        <el-radio label="small">small</el-radio>
        <el-radio label="mini">mini</el-radio>
      </el-radio-group>
    </el-row>
    <avue-form ref="form"
               v-model="obj"
               :option="option"
               @reset-change="emptytChange"
               @submit="handleSubmit">
    </avue-form>
  </d2-container>
</template>
<script>
import Axios from 'axios'
// import addOrder from '@/apis/song'
var DIC = {
  VAILD: [{
    label: '微型货车',
    value: '1'
  }, {
    label: '轻型货车',
    value: '2'
  },
  {
    label: '中型货车',
    value: '3'
  }, {
    label: '重型货车',
    value: '4'
  }]
}
export default {
  name: 'page2',
  data () {
    return {
      obj: {},
      sizeValue: 'small'
    }
  },
  computed: {
    option () {
      return {
        size: this.sizeValue,
        // mockBtn: true,
        excelBtn: true,
        submitText: '完成',
        printBtn: true,
        column: [{
          label: '客户id',
          prop: 'username',
          tip: '这是信息提示',
          span: 8,
          maxlength: 8,
          suffixIcon: 'el-icon-tickets',
          prefixIcon: 'el-icon-tickets',
          minlength: 2,
          rules: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          click: ({ value, column }) => {
            this.$message.success('click')
          }
        },
        {
          label: '司机id',
          prop: 'name',
          span: 8
        },
        {
          label: '订单号',
          prop: 'string',
          span: 7
        },
        {
          label: '车辆类型',
          prop: 'car',
          type: 'select',
          dicData: DIC.VAILD,
          span: 6
        },
        {
          label: '订单状态',
          prop: 'State',
          type: 'number',
          span: 5,
          minRows: 0,
          maxRows: 1,
          row: true
        },
        {
          label: '发货时间',
          prop: 'datetime',
          type: 'datetime',
          span: 8,
          format: 'yyyy-MM-dd hh:mm:ss',
          valueFormat: 'yyyy-MM-dd hh:mm:ss'
        },
        {
          label: '装货地址',
          span: 20,
          prop: 'address1'
        },
        {
          label: '卸货地址',
          span: 20,
          prop: 'address2'
        },
        {
          label: '备注',
          span: 20,
          prop: 'adit'
        },
        {
          label: '价格',
          prop: 'price',
          type: 'number',
          span: 6,
          precision: 2,
          mock: {
            type: 'number',
            max: 1,
            min: 2,
            precision: 2
          },
          row: true
        },
        {
          label: '平台抽成',
          span: 4,
          prop: 'percentage'
          // disabled: true
        }]
      }
    }
  },
  mounted () {
    this.obj = {
      username: '',
      switch: 0,
      percentage: '10%'
    }
  },
  methods: {
    async upload () {
      const { username, name, string, datetime, car, State, price, address1, address2 } = this.obj
      // await addOrder({ driverID: name, userID: username, orderID: string, orderDate: datetime, carName: car, orderState: State, price: price, startAddr: address1, endAddr: address2 })
      Axios.post('/order/addOrder', { driverID: name, userID: username, orderID: string, orderDate: datetime, carName: car, orderState: State, price: price, startAddr: address1, endAddr: address2 }, {
        baseURL: 'http://127.0.0.1:3001/api/v1'
      }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error.data)
      })
    },
    emptytChange () {
      this.$message.success('清空数据')
    },
    // submit () {
    //   this.$message.success('当前数据' + JSON.stringify(this.obj))
    // },
    handleSubmit (form, done) {
      this.$message.success('3s后关闭')
      setTimeout(() => {
        this.upload()
        done()
      }, 3000)
    }
  }
}

</script>
