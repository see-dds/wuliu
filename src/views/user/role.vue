<template>
  <d2-container>
    <!--  添加角色   -->
    <div slot="header">
      <el-button @click="showAddRoleBox=true" type="primary">
        <i class="el-icon-plus"></i>
        添加角色
      </el-button>
    </div>
    <el-table
      :data="roleList"
      @selection-change="handleSelectionChange"
      ref="multipleTable"
      stripe
    >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column prop="name" label="角色名称" width="100" align="center"/>
      <el-table-column prop="des" label="角色描述" width="100" align="center"/>
      <el-table-column width="200" label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="left">
            <el-button type="primary" icon="el-icon-edit" circle size='small'
                       @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size='small'
                       @click="handleDel(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配权限" placement="right">
            <el-button type="success" icon="el-icon-check" circle size='small'
                       @click="handlePermission(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column width="300" label=" "/>
    </el-table>
    <div slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 添加角色对话框 -->
    <el-dialog @close="close" title="添加角色" :visible.sync="showAddRoleBox">
      <el-form class="dome-ruleForm" :rules="roleAddRules" ref="roleRule" :model="roleInfo">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="des">
          <el-input v-model="roleInfo.des" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddRoleBox = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog @close="close" title="编辑角色" :visible.sync="showEditRoleBox">
      <el-form class="dome-ruleForm" :rules="roleAddRules" ref="roleRule" :model="roleInfo">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="des">
          <el-input v-model="roleInfo.des" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditRoleBox = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="showPermissionBox"
      width="30%">
      <el-tree
        :data="permissionList"
        show-checkbox
        node-key="id"
        ref="roleTree"
        default-expand-all
        :default-checked-keys="defaultRights"
        :props="permissionInfo">
      </el-tree>
      <span slot="footer" class="dialog-footer">
      <el-button @click="showPermissionBox = false">取 消</el-button>
      <el-button type="primary" @click="confirmPermission">确 定</el-button>
    </span>
    </el-dialog>
  </d2-container>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      page: 1,
      limit: 10,
      roleList: [],
      permissionList: [],
      total: 0,
      showAddRoleBox: false,
      showEditRoleBox: false,
      showChangeRoleBox: false,
      showPermissionBox: false,
      roleInfo: {
        name: '',
        des: '',
        roles: []
      },
      permissionInfo: {
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'isLeaf'
        }
      },
      roleAddRules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        des: [
          {
            required: true,
            message: '请输入角色描述',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getRoles()
    this.getPermissions()
  },
  watch: {
    page () {
      this.getRoles()
    }
  },
  methods: {
    async getPermissions () {
      const res = await this.api.post('/admin/getPermissions')
      this.permissionList = res.data
      console.log(this.permissionList)
    },
    async getRoles () {
      const {
        page,
        limit
      } = this
      const res = await this.api.post('/admin/getRoles', {
        page,
        limit
      })
      this.roleList = res.data.rolelist
      this.total = res.data.count
    },
    handleSizeChange (val) {
      this.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.page = val
    },
    async handleAdd () {
      const res = await this.api.post('/admin/addRole', this.roleInfo)
      const { success } = res
      if (!success) return this.$notify.warning(`${res.info}`)
      this.$notify.success('添加成功')
      this.getRoles()
      this.showAddRoleBox = false
      // this.resetFields()
      this.roleInfo = {
        name: '',
        des: '',
        roles: []
      }
    },
    handleEdit (row) {
      this.roleInfo = row
      this.showEditRoleBox = true
    },
    async confirmEdit () {
      const {
        _id,
        ...updateData
      } = this.roleInfo
      const res = await this.api.post('/admin/updateRole', { id: _id, ...updateData })
      const { success } = res
      if (!success) return this.$notify.warning(`${res.info}`)
      this.$notify.success('修改成功')
      this.getRoles()
      this.showEditRoleBox = false
    },
    handleDel (row) {
      this.$confirm('此操作将永久删除该角色 , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.api.post('/admin/roleDelete', { id: row._id })
        if (!res.success) return this.$notify.warning('删除失败')
        this.$notify.success('删除成功')
        this.getRoles()
      })
    },
    handlePermission (row) {
      this.permissionInfo = row
      this.showPermissionBox = true
    },
    async confirmPermission () {
      const {
        _id,
        ...updateData
      } = this.roleInfo
      const res = await this.api.post('/admin/updateRole', { id: _id, ...updateData })
      const { success } = res
      if (!success) return this.$notify.warning(`${res.info}`)
      this.$notify.success('修改成功')
      this.getRoles()
      this.showEditRoleBox = false
    }
  }
}

</script>

<style scoped>

</style>
