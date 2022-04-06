<template>
  <d2-container>
    <div slot="header" class="driverH">
      条件搜索:
      <el-input
        style="width:400px"
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-select
          style="width:100px"
          v-model="select"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append">搜索</el-button>
      </el-input>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="序号" width="100">
      </el-table-column>
      <el-table-column prop="date" label="注册时间" width="100">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="province" label="身份证号" width="120">
      </el-table-column>
      <el-table-column prop="city" label="电话" width="100"> </el-table-column>
      <el-table-column prop="" label="性别" width="80"> </el-table-column>
      <el-table-column prop="" label="年龄" width="80"> </el-table-column>

      <el-table-column prop="" label="管理车辆" width="100"> </el-table-column>
      <el-table-column prop="" label="驾龄" width="80"> </el-table-column>
      <el-table-column prop="" label="交易次数" width="80"> </el-table-column>
      <el-table-column prop="" label="出车总量" width="80"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogFormVisible = true">
            查看
          </el-button>
          <el-button type="text" size="small">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>

    <!-- 查看弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="管理车辆">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="司机驾龄">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="交易次数">
            <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出车总量">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 查看弹窗 -->

    <!-- 编辑弹窗 -->
    <el-dialog  :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="管理车辆">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="司机驾龄">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="交易次数">
            <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出车总量">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
  </d2-container>
</template>
<!-- name: 'driverUser' -->
<script>
export default {
  name: 'driverUser',
  methods: {
    handleClick (row) {
      console.log(row)
    }
  },

  data () {
    return {
      select: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        type: [],
        resource: '',
        desc: ''
      },

      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ]
    }
  }
}
</script>

<style scoped></style>
