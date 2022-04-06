<template>
  <d2-container>
    <div slot="header" class="driverH">
      <el-button>添加</el-button>
      <el-input placeholder="请输入搜索内容" style="width:200px" />
      <el-button type="primary">搜索</el-button>
    </div>
    <el-table :data="tableData" :show-header="true" border style="width: 100%">
      <el-table-column prop="date" label="序号" width="80"> </el-table-column>
      <el-table-column prop="date" label="登记时间" width="100">
      </el-table-column>
      <el-table-column prop="name" label="车辆类型" width="100">
      </el-table-column>
      <el-table-column prop="province" label="车牌" width="80">
      </el-table-column>
      <el-table-column prop="city" label="车型大小" width="100">
      </el-table-column>
      <el-table-column prop="" label="车型证件" width="80"> </el-table-column>
      <el-table-column prop="" label="车辆状态" width="80"> </el-table-column>
      <el-table-column prop="" label="负责司机" width="80"> </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="seeFrom = true">
            查看
          </el-button>
          <el-button type="text" size="small" @click="editFrom = true">
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
    <el-dialog :visible.sync="seeFrom">
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
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出车总量">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="seeFrom = false">取 消</el-button>
        <el-button type="primary" @click="seeFrom = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查看弹窗 -->

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑信息" :visible.sync="editFrom">
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
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出车总量">
            <el-input style="width:220px" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFrom = false">取 消</el-button>
        <el-button type="primary" @click="editFrom = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
  </d2-container>
</template>

<script>
import { getAllCar } from '@/apis/car'

export default {
  name: 'driverCar',
  methods: {
    async getList () {
      const res = await getAllCar()
      console.log(res)
    }
  },

  created () {
    this.getList()
  },

  data () {
    return {
      select: '',
      seeFrom: false,
      editFrom: false,
      form: {
        name: '呜呜',
        region: '',
        date1: '',
        date2: '',
        type: [],
        resource: '',
        desc: ''
      },

      tableData: []
    }
  }
}
</script>
<style scoped>
.cl {
  background: #ccc;
}
</style>
