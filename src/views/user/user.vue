<template>
  <d2-container>
    <div slot="header" style="display: flex">
      <el-button @click="showAddBox=true" type="primary">
        <i class="el-icon-plus"></i>添加
      </el-button>
      <el-input placeholder="请输入用户名称" style="width:200px"/>
      <el-button>搜索</el-button>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column label="序号" align="center" width="50" type="index"/>
      <el-table-column prop='phone' align="center" label="登录账号" width="150"/>
      <!--      <el-table-column prop='pwd' label="密码" width="120"/>-->
      <el-table-column prop='name' align="center" label="姓名" width="120"/>
      <el-table-column prop='phone' align="center" label="电话" width="140"/>
      <el-table-column prop='pwd' align="center" label="密码" width="140"/>
      <el-table-column label="角色" align="center" width="140">
        <template slot-scope="scope">
          {{ scope.row.groupID | typeTxt }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="150">
        {{ createdAt|format('YYYY-MM-DD') }}
      </el-table-column>
      <el-table-column style="{display: flex}" label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="left">
            <el-button type="primary" icon="el-icon-edit" circle size='small'
                       @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size='small'
                       @click="handleDel(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="right">
            <el-button type="success" icon="el-icon-check" circle size='small'
                       @click="handleRoleChange(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--  添加表单的弹窗  -->
    <el-dialog
      title="添加用户"
      :visible.sync="showAddBox"
      width="800px"
      center>
      <el-form :model="adminInfo" size="mini" label-width="120px">
        <el-form-item label="用户名称">
          <el-input v-model="adminInfo.name" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input v-model="adminInfo.phone" placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="adminInfo.pwd" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showAddBox = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!--  添加表单的弹窗 end -->

    <!--  编辑弹窗开始  -->
    <el-dialog
      title="编辑用户"
      :visible.sync="showEditBox"
      width="800px"
      center>
      <el-form :model="adminInfo" size="mini" label-width="120px">
        <el-form-item label="用户名称">
          <el-input v-model="adminInfo.name" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input v-model="adminInfo.phone" placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="adminInfo.pwd" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showEditBox = false">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!--  编辑弹窗结束  -->

    <!--  修改角色的弹窗  -->
    <el-dialog
      title="修改角色"
      :visible.sync="showRoleBox"
      width="800px"
      center>
      <el-form :model="adminInfo" size="mini" label-width="120px">
        <el-form-item label="角色">
          <el-radio-group v-model="adminInfo.groupID" size="small">
            <el-radio-button :label="1">超级管理员</el-radio-button>
            <el-radio-button :label="2">主管</el-radio-button>
            <el-radio-button :label="3">普通用户</el-radio-button>
            <el-radio-button :label="4">财务</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showAddBox = false">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!--  修改角色的弹窗 end -->
  </d2-container>
</template>
<script>
export default {
  name: 'user.vue',
  data () {
    return {
      page: 1,
      limit: 10,
      tableData: [],
      total: 0,
      showAddBox: false,
      showEditBox: false,
      showRoleBox: false,
      adminInfo: {
        name: '',
        phone: '',
        pwd: '',
        groupID: 1
      }
    }
  },
  created () {
    this.getList()
  },
  watch: {
    page () {
      this.getList()
    }
  },
  methods: {
    async getList () {
      const {
        page,
        limit
      } = this
      const res = await this.api.post('/admin/getAdmin', {
        page,
        limit
      })
      this.tableData = res.data.admins
      this.total = res.data.count
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
    },
    async handleAdd () {
      const res = await this.api.post('/admin/addAdmin', this.adminInfo)
      const { success } = res
      if (!success) return this.$notify.warning(`${res.info}`)
      this.$notify.success('添加成功')
      this.getList()
      this.showAddBox = false
      this.resetFields()
    },
    handleEdit (row) {
      this.adminInfo = row
      this.showEditBox = true
    },
    async confirmEdit () {
      const {
        _id,
        ...updateData
      } = this.adminInfo
      const res = await this.api.post('/admin/updateAdmin', { id: _id, ...updateData })
      const { success } = res
      if (!success) return this.$notify.warning(`${res.info}`)
      this.$notify.success('修改成功')
      this.getList()
      this.showEditBox = false
      this.showRoleBox = false
    },
    handleDel (row) {
      console.log('row', row)
      this.$confirm('此操作将永久删除该用户 , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.api.post('/admin/delete', { id: row._id })
        if (!res.success) return this.$notify.warning('删除失败')
        this.$notify.success('删除成功')
        this.getList()
      })
    },
    handleRoleChange (row) {
      this.adminInfo = row
      this.showRoleBox = true
    }
  },
  filters: {
    typeTxt (val) {
      if (val === 1) return '超级管理员'
      if (val === 2) return '主管'
      if (val === 3) return '普通用户'
      if (val === 4) return '财务'
    }
  }
}
</script>

<style scoped>

</style>
