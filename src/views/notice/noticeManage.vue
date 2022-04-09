<template>
  <d2-container>
    <el-table border :data="tableData">
      <el-table-column prop="title" label="标题" width="160"> </el-table-column>
      <el-table-column prop="cate" label="分类" width="250"> </el-table-column>
      <el-table-column prop="content" label="内容" width="520">
      </el-table-column>
      <el-table-column prop="cover" label="封面" width="320"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showEditBox = true">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <!-- 编辑表单的弹窗 start-->
    <el-dialog
      title="编辑公告"
      :visible.sync="showEditBox"
      width="800px"
      :before-close="beforeAddClose"
    >
      <el-form :model="songInfo" label-width="120px" size="mini">
        <el-row>
          <el-col>
            <el-form-item label="公告主题">
              <el-input v-model="noticleInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="公告分类">
              <el-radio-group v-model="noticleInfo.cate" size="small">
                <el-radio-button :label="1">寄件</el-radio-button>
                <el-radio-button :label="2">收件</el-radio-button>
                <el-radio-button :label="3">费用</el-radio-button>
                <el-radio-button :label="4">招聘</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="公告内容">
              <el-input v-model="noticleInfo.content"></el-input>
            </el-form-item>
            <el-from-item>
              <el-input v-model="noticleInfo.cover"></el-input>
              <!-- <el-upload
                :limit="1"
                class="upload-demo"
                :action="uploadUrl"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-success="uploadOk"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload> -->
            </el-from-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditBox = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!--  编辑表单的弹窗 end -->
  </d2-container>
</template>
<script>
import { getAllNoticle, deleteNoticle, updateNoticle } from '@/apis/article'
export default {
  name: 'noticeManage.vue',
  data () {
    return {
      page: 1,
      limit: 20,
      tableData: [],
      total: 0,
      showEditBox: false,
      noticleInfo: {
        title: '', // 标题
        cate: '', // 分类
        content: '', // 内容
        cover: '' // 封面
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const { page, limit } = this
      const res = await getAllNoticle ({ page, limit })
      this.tableData = res.data.rows
      this.total = res.data.count
      console.log(this.tableData)
    },
    handleDel (row) {
      console.log(row.id)
      this.$confirm('此操作将永久删除该公告', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteNoticle({ id: row._id })
        if (!res.success) return this.$notify.warning('删除失败')
        this.$notify.success('删除成功')
        this.getList()
      })
    },
    handleEdit (row) {
      this.noticleInfo = {
        ...row,
        title: row.noticleInfo.title
      }
      this.showEditBox = true
    },
    async confirmEdit () {
      const { _id, ...updateData } = this.noticleInfo
      const res = await updateNoticle({ id: _id, ...updateData })
      const { success } = res
      if (!success) return this.$notify.warning('编辑失败')
      this.$notify.success('编辑成功')
      this.getList()
      this.showEditBox = false
    }
  }
}
</script>
