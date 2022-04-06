<template>
  <d2-container>
    <!--  添加角色   -->
    <div slot="header">
      <el-button @click="addRole" type="primary">
        <i class="el-icon-plus"></i>
        添加角色
      </el-button>
    </div>
    <el-table
      :data="roles"
      @selection-change="handleSelectionChange"
      ref="multipleTable"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="角色描述"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
        align="center"
      >
        <el-button
          size="mini"
          type="text"
          @click="editRole(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          size="mini"
          type="text"
          @click="deleteRole(scope.row)"
        >
          删除
        </el-button>
      </el-table-column>
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
  </d2-container>
</template>

<script>
export default {
  name: 'role'
}
</script>

<style scoped>

</style>
