<template>
  <d2-container>
    <template slot="header">订单列表</template>
    <el-row style="margin-bottom:20px;font-size:15px">
      <el-col :span="4">等待加载框: <el-switch size="small"
                   v-model="showLoading"> </el-switch>
      </el-col>
      <el-col :span="4">显示边框: <el-switch size="small"
                   v-model="showBorder"> </el-switch>
      </el-col>
      <el-col :span="4">显示斑马纹: <el-switch size="small"
                   v-model="showStripe"> </el-switch>
      </el-col>
      <el-col :span="4">显示索引: <el-switch size="small"
                   v-model="showIndex"> </el-switch>
      </el-col>
      <el-col :span="4">显示多选框: <el-switch size="small"
                   v-model="showCheckbox"> </el-switch>
      </el-col>
      <el-col :span="4">显示表头: <el-switch size="small"
                   v-model="showHeader"> </el-switch>
      </el-col>
      <el-col :span="4">显示分页: <el-switch size="small"
                   v-model="showPage"> </el-switch>
      </el-col>
      <el-col :span="4">卡片模式: <el-switch size="small"
                   v-model="showCard"> </el-switch>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:20px">
      类型：<el-radio-group v-model="menuType"
                      size="small">
        <el-radio-button label="text">默认</el-radio-button>
        <el-radio-button label="icon">菜单按钮</el-radio-button>
        <el-radio-button label="text">文本按钮</el-radio-button>
        <el-radio-button label="menu">合并菜单</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row style="margin-bottom:20px">
      大小：<el-radio-group v-model="sizeValue"
                      size="small">
        <el-radio-button label="small">默认</el-radio-button>
        <el-radio-button label="medium">medium</el-radio-button>
        <el-radio-button label="small">small</el-radio-button>
        <el-radio-button label="mini">mini</el-radio-button>
      </el-radio-group>
    </el-row>
    <avue-crud :data="data.data"
               :option="option"
               :table-loading="showLoading"
               :page.sync="page">
      <!-- <template slot-scope="scope"
                slot="menuBtn">
        <el-dropdown-item divided>自定义按钮</el-dropdown-item>
      </template> -->
      <template slot-scope="{type,size}"
                slot="menu">
        <el-button :type="type"
                   :size="size">自定义按钮</el-button>
      </template>
    </avue-crud>
  </d2-container>
</template>

<script>
import { getAllOrder } from '@/apis/order'
export default {
  name: 'page1',
  data () {
    this.created()
    return {
      page: {
        total: 100,
        currentPage: 1,
        pageSize: 10, // currentPage当前页码，total总条数，pageSize每页多少条数据
        pagerCount: 11 // 设置最大页码按钮数
      },
      limit: 10,
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

  computed: {
    option () {
      return {
        title: '订单查询',
        titleSize: 'h3',
        titleStyle: {
          color: 'red'
        },
        card: this.showCard,
        border: this.showBorder,
        stripe: this.showStripe,
        showHeader: this.showHeader,
        index: this.showIndex,
        size: this.sizeValue,
        selection: this.showCheckbox,
        page: this.showPage,
        align: 'center',
        menuAlign: 'center',
        menuType: this.menuType,
        menuBtnTitle: '自定义名称',
        column: [{
          label: '订单号',
          prop: 'orderID',
          search: true
        }, {
          label: '订单状态',
          prop: 'orderState',
          search: true
        }, {
          label: '用户ID',
          prop: 'userID',
          search: true
        }, {
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
  watch: {
    page () {
      this.created()
    }
  },
  methods: {
    async created () {
      const { page, limit } = this
      const res = await getAllOrder({ page, limit })
      this.data.data = res.data
      this.page.total = Math.ceil(res.data.length / 10)
      console.log(this.data.data, this.page.total)
    }

  }
}
</script>
