<template>
  <d2-container>
    <div style="margin-bottom:30px" >
     营业额: <i style="font-size:43px;font-weight:500;color:red;"><avue-count-up :callback="allPrice" :end="allP"></avue-count-up></i>
    </div>
    <avue-crud
      :data="data"
      :option="option"
      :page.sync="page"
      @search-change="searchChange"
      @search-reset="resetChange"
      :summary-method="summaryMethod"
      @selection-change="selectionChange"
    >
    </avue-crud>
  </d2-container>
</template>

<script>
export default {
  name: 'detailed',
  data () {
    return {
      allP: 0,
      selectList: [],
      page: {
        total: 100,
        currentPage: 1
      },
      data: [
        {
          order: '33344444',
          price: 34,
          name: '正三',
          state: '完成'
        },
        {
          order: '33377774444',
          price: 556,
          name: '正uuu三',
          state: '完成'
        },
        {
          order: '33349999444',
          price: 354,
          name: '正iii三',
          state: '完成'
        },
        {
          order: '3330002224444',
          price: 634,
          name: '正ooo三',
          state: '运送中'
        }
      ],
      menuType: 'text',
      showCard: true,
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showPage: true
    }
  },
  methods: {
    resetChange (item) {
      this.$message.success('清空回调')
      console.log(item)
    },
    searchChange (params, done) {
      //   this.$message.success('2s后关闭锁定')
      console.log(params)
      done()
    },
    selectionChange (list) {
      this.selectList = list
    },
    summaryMethod ({ columns, data }) {
      const sums = []
      if (columns.length > 0) {
        columns.forEach((column, index) => {
          if ([0].includes(index)) {
            sums[index] = '金额统计'
          } else if (['order', 'name', 'state'].includes(column.property)) {
            // 过滤某些字段不参与计算
            sums[index] = '-'
          } else {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
            }
          }
        })
      }
      this.allP = sums[2]
      return sums
    },
    allPrice () {
    }
  },
  computed: {
    option () {
      return {
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
        showSummary: true,
        column: [
          {
            label: '日期',
            search: true,
            type: 'datetime',
            prop: 'date',
            searchSpan: 7,
            searchRules: [
              {
                required: true,
                message: '请输入日期',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '订单号',
            prop: 'order',
            search: true,
            searchRules: [
              {
                required: true,
                message: '请输入订单号',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '金额',
            prop: 'price',
            search: true,
            searchRules: [
              {
                required: true,
                message: '请输入金额',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '操作人',
            prop: 'name',
            search: true,
            searchRules: [
              {
                required: true,
                message: '请输入操作人',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '状态',
            prop: 'state',
            search: true,
            searchRules: [
              {
                required: true,
                message: '请输入订单状态',
                trigger: 'blur'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped></style>
