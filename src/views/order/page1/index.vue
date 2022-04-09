<template>
  <d2-container>
    <template slot="header">订单列表</template>
    <el-row style="margin-bottom:20px;font-size:15px">
      <el-col :span="4"
        >等待加载框: <el-switch size="small" v-model="showLoading"> </el-switch>
      </el-col>
      <el-col :span="4"
        >显示边框: <el-switch size="small" v-model="showBorder"> </el-switch>
      </el-col>
      <el-col :span="4"
        >显示斑马纹: <el-switch size="small" v-model="showStripe"> </el-switch>
      </el-col>
      <el-col :span="4"
        >显示索引: <el-switch size="small" v-model="showIndex"> </el-switch>
      </el-col>
      <el-col :span="4"
        >显示多选框:
        <el-switch size="small" v-model="showCheckbox"> </el-switch>
      </el-col>
      <el-col :span="4"
        >显示表头: <el-switch size="small" v-model="showHeader"> </el-switch>
      </el-col>
      <el-col :span="4"
        >显示分页: <el-switch size="small" v-model="showPage"> </el-switch>
      </el-col>
      <el-col :span="4"
        >卡片模式: <el-switch size="small" v-model="showCard"> </el-switch>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:20px">
      类型：<el-radio-group v-model="menuType" size="small">
        <el-radio-button label="text">默认</el-radio-button>
        <el-radio-button label="icon">菜单按钮</el-radio-button>
        <el-radio-button label="text">文本按钮</el-radio-button>
        <el-radio-button label="menu">合并菜单</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row style="margin-bottom:20px">
      大小：<el-radio-group v-model="sizeValue" size="small">
        <el-radio-button label="small">默认</el-radio-button>
        <el-radio-button label="medium">medium</el-radio-button>
        <el-radio-button label="small">small</el-radio-button>
        <el-radio-button label="mini">mini</el-radio-button>
      </el-radio-group>
    </el-row>
    <avue-crud ref="crud"
               :data="data.data"
               :option="option"
               :table-loading="showLoading"
               :page.sync="page"
               @size-change="sizeChange"
               @current-change="currentChange"
               @refresh-change="refreshChange"
               @row-save="rowSave"
               @row-update="rowUpdate"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="resetChange">
      <!-- <template slot-scope="scope"
                slot="menuBtn">
        <el-dropdown-item divided>自定义按钮</el-dropdown-item>
      </template> -->
      <template slot-scope="{ type, size }" slot="menu">
        <el-button :type="type" :size="size">自定义按钮</el-button>
      </template>
    </avue-crud>
  </d2-container>
</template>

<script>
import { getAllOrder, updataOrder, deletOrder, findOrderByState, findOrderOne, findUserID, findDriverID } from '@/apis/order'
export default {
  name: 'page1',
  data () {
    return {
      page: {
        total: 100, // total总条数，
        currentPage: 1, // currentPage当前页码，
        pageSize: 10, // pageSize每页多少条数据
        pagerCount: 11 // 设置最大页码按钮数
      },
      data: [],
      menuType: 'text',
      showLoading: false,
      showCard: false,
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: false,
      showPage: true,
      sizeValue: 'small'
    }
  },
  // mounted () {
  //   setTimeout(() => {
  //     this.$nextTick(() => {
  //       this.showLoading = true
  //       // 这里是重点～～～
  //       this.$refs.crud.init()
  //     })
  //   }, 200)
  //   setTimeout(() => {
  //     this.$nextTick(() => {
  //       this.showLoading = false
  //       // 这里是重点～～～
  //       this.$refs.crud.init()
  //     })
  //   }, 200)
  // },
  computed: {
    option () {
      return {
        title: '订单查询',
        titleSize: 'h3',
        titleStyle: {
          color: 'red'
        },
        card: this.showCard, // 显示卡片模式
        border: this.showBorder,
        stripe: this.showStripe,
        showHeader: this.showHeader,
        index: this.showIndex, // 显示索引
        size: this.sizeValue,
        selection: this.showCheckbox, // 显示多选框
        page: this.showPage,
        loading: this.showLoading, // 等待加载
        align: 'center',
        menuAlign: 'center',
        menuType: this.menuType,
        menuBtnTitle: '自定义名称',
        column: [
          {
            label: '订单号',
            prop: 'orderID',
            search: true
          },
          {
            label: '订单状态',
            prop: 'orderState',
            search: true
          },
          {
            label: '用户ID',
            prop: 'userID',
            search: true
          },
          {
            label: '司机ID',
            prop: 'driverID',
            search: true
          },
          {
            label: '预约时间',
            prop: 'orderDate',
            search: true
          },
          {
            label: '车辆类型',
            prop: 'carName',
            search: true
          },
          {
            label: '价格',
            prop: 'price',
            search: true
          }
        ]
      }
    }
  },
  created () {
    this.getList(this.page.currentPage, this.page.pageSize)
  },

  methods: {
    // 查询所有数据
    async getList (page, limit) {
      const res = await getAllOrder({ page, limit })
      console.log(res.data)
      this.data.data = res.data.one
      this.page.total = res.data.total
      this.loaDing()
    },
    // 修改行数
    sizeChange (val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.getList(this.page.currentPage, this.page.pageSize)
      this.$message.success('行数' + val)
    },
    // 切换页码
    currentChange  (val) {
      this.page.currentPage = val
      this.getList(this.page.currentPage, this.page.pageSize)
      this.$message.success('页码' + val)
    },
    // 刷新表单
    refreshChange () {
      this.$message.success('刷新回调')
      this.getList(this.page.currentPage, this.page.pageSize)
    },
    // 新增数据
    rowSave (form, done, loading) {
      form.id = new Date().getTime()
      this.$message.success('模拟网络请求')
      setTimeout(() => {
        this.$message.success('关闭按钮等待')
        loading()
      }, 1000)
      setTimeout(() => {
        this.$message.success('新增数据' + JSON.stringify(form))
        done(form)
      }, 2000)
    },
    // 删除数据
    rowDel (form, index, done) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        done(form)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        deletOrder({ orderID: form.orderID, userID: form.userID }) // 删除数据请求
      }).catch(() => { })
    },
    // 编辑数据
    rowUpdate (form, index, done, loading) {
      this.$message.success('模拟网络请求')
      setTimeout(() => {
        this.$message.success('关闭按钮等待')
        loading()
      }, 1000)
      setTimeout(() => {
        this.$message.success('编辑数据' + JSON.stringify(form) + '数据序号' + index)
        updataOrder({ orderID: form.orderID, userID: form.userID, orderDate: form.orderDate, driverID: form.driverID, orderState: +form.orderState, carName: form.carName }) // 编辑数据请求
        done(form)
      }, 2000)
    },
    resetChange (item) {
      this.$message.success('清空回调')
    },
    searchChange (params, done) {
      this.$message.success('1s后关闭锁定')
      setTimeout(() => {
        done()
        this.$message.success(JSON.stringify(params))
        if (params.orderID) { // 通过订单号查询
          findOrderOne({ orderID: params.orderID }).then(res => {
            this.data.data = res.data
            console.log(this.data.data)
            this.loaDing()
          })
        }
        if (params.orderState) { // 通过订单状态查询
          findOrderByState({ orderState: params.orderState }).then(res => {
            console.log(res.data)
            this.data.data = res.data
            this.loaDing()
          })
        }
        if (params.userID) { // 根据客户ID查询
          findUserID({ userID: params.userID }).then(res => {
            console.log(res.data)
            this.data.data = res.data
            this.loaDing()
          })
        }
        if (params.driverID) { // 根据司机ID查询
          findDriverID({ driverID: params.driverID }).then(res => {
            console.log(res.data)
            this.data.data = res.data
            this.loaDing()
          })
        }
      }, 1000)
    },
    loaDing () {
      setTimeout(() => {
        this.$nextTick(() => {
          this.showLoading = true
          // 这里是重点～～～
          // this.$refs.crud.init()
        })
      }, 200)
      setTimeout(() => {
        this.$nextTick(() => {
          this.showLoading = false
          // 这里是重点～～～
          this.$refs.crud.init()
        })
      }, 200)
    }
  }
}
</script>
