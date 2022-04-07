<template>
  <d2-container>
    <div slot="header" class="driverH">
      <el-button>添加</el-button>
      <el-input
        placeholder="请输入搜索内容"
        v-model="input"
        style="width:200px"
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
    <el-table :data="tableData" :show-header="true" border style="width: 100%">
      <el-table-column label="序号" width="50" type="index"> </el-table-column>
      <el-table-column prop="" label="登记时间" width="100">
        <!-- {{ createdAt | format('YYYY-MM-DD') }} -->
      </el-table-column>
      <el-table-column prop="carType" label="车辆类型" width="80">
      </el-table-column>
      <el-table-column prop="carNumber" label="车牌" width="80">
      </el-table-column>
      <el-table-column prop="carSize" label="车型大小" width="80">
      </el-table-column>
      <el-table-column prop="carProof" label="车型证件" width="80">
      </el-table-column>
      <el-table-column prop="carState" label="车辆状态" width="80">
      </el-table-column>
      <el-table-column prop="userId" label="负责司机" width="80">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleSee(scope.row)">
            查看
          </el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button @click="handleDel(scope.row)" type="text" size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>

    <!-- 查看弹窗 -->
    <el-dialog :visible.sync="seeFrom">
      <el-form>
        <el-col :span="12">
          <el-form-item label="负责人">
            <el-input
              disabled
              v-model="carInfo.userId"
              style="width:200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input
              disabled
              v-model="carInfo.carType"
              style="width:220px"
            ></el-input>
          </el-form-item>
          <el-form-item label="车牌">
            <el-input
              disabled
              v-model="carInfo.carNumber"
              style="width:220px"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆状态">
            <el-input
              disabled
              v-model="carInfo.carState"
              style="width:220px"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="车型大小">
            <el-input
              disabled
              v-model="carInfo.carSize"
              style="width:220px"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="车型证件">
            <el-input
              disabled
              v-model="carInfo.carProof"
              style="width:220px"
              autocomplete="off"
            ></el-input>
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
      <el-form>
        <el-form-item label="车辆状态">
          <el-input
            v-model="editInfo.carState"
            style="width:220px"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFrom = false">取 消</el-button>
        <el-button type="primary" @click="handleUp">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
  </d2-container>
</template>

<script>
import { getAllCar, upOneCar, remOneCar, searchCar } from '@/apis/car'

export default {
  name: 'driverCar',
  data () {
    return {
      select: '',
      seeFrom: false,
      editFrom: false,
      tableData: [],
      carInfo: {},
      editInfo: {},
      input: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await getAllCar()
      this.tableData = res.data
      this.tableData.map(item => {
        item.driverInfo.map(imte => {
          if (imte._id === item.userId) {
            item.userId = imte.driverRealName
          }
        })
      })
    },
    async getSearch () {
      const res = await searchCar({ carType: this.input })
      this.tableData = res.data
      this.tableData.map(item => {
        item.driverInfo.map(imte => {
          if (imte._id === item.userId) {
            item.userId = imte.driverRealName
          }
        })
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleSee (row) {
      this.carInfo = row
      this.seeFrom = true
    },
    handleEdit (row) {
      this.editInfo = row
      this.editFrom = true
    },
    async handleUp () {
      // 修改车辆状态操作
      const res = await upOneCar({
        id: this.editInfo._id,
        carState: this.editInfo.carState
      })
      console.log(res)
      this.editFrom = false
    },
    handleDel (row) {
      // 移出车辆操作
      this.$confirm('此操作将永久移除该车辆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await remOneCar({ id: row._id })
        if (!res.success) return this.$notify.warning('删除失败')
        this.$notify.success('删除成功')
        this.getList()
      })
    },
    handleSearch () {
      this.getSearch()
    }
  }
}
</script>
<style scoped></style>
