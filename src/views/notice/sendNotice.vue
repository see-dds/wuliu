<template>
  <d2-container>
    <el-form ref='form'
    :model="form"
    label-position="left"
    label-width="100px">
      <el-form-item label="公告主题">
        <el-input v-model="form.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-radio-group v-model="form.cate" size="small">
          <el-radio-button :label="1">寄件</el-radio-button>
          <el-radio-button :label="2">收件</el-radio-button>
          <el-radio-button :label="3">费用</el-radio-button>
          <el-radio-button :label="4">招聘</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <div @click="staff=true">
            <el-input v-model="form.content" placeholder="请输入"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="封面：">
        <el-upload
          class="upload-demo"
          action="uploadUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">选取封面</el-button>
        </el-upload>
      </el-form-item>
      <el-button type="primary" @click="sendClick">发送</el-button>
    </el-form>
  </d2-container>
</template>
<script>
import { getAllNoticle, addNoticle } from '@/apis/article'
export default {
  name: 'sendNotice',
  data () {
    return {
      fileList: [],
      page: 1,
      limit: 20,
      tableDate: [],
      total: 0,
      form: {
        title: '',
        cate: '', // 1寄件 2.收件 3.费用 4.招聘
        content: '',
        cover: ''
      },
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      site: false,
      staff: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getlist () {
      const { page, limit } = this
      const res = await getAllNoticle({ page, limit })
      this.tableData = res.data.rows
      console.log(res.data)
      this.total = res.data.count
    },
    async sendClick () {
      console.log(this.form)
      const res = await addNoticle(this.form)
      const { success } = res
      if (!success) return this.$notify.warning('发送失败')
      this.$notify.success('发送成功')
      this.getList()
      // this.$message({
      //   showClose: true,
      //   message: '请输入公告内容',
      //   type: 'warning'
      // })
    },
    rejectSite () {

    },
    staff () {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action:${action}`
          })
        }
      })
    }
  },
  filters: {
    typeTxt (val) {
      if (val === 1) return '寄件'
      if (val === 2) return '收件'
      if (val === 3) return '费用'
      if (val === 4) return '招聘'
    }
  }
}
</script>
<style scoped>
    .el-input {
        width: 800px;
    }
    .el-dialog__header {
        background: #f8f8f8;
    }
    .keyWord {
        width: 300px;
        margin-bottom: 30px;
    }
</style>
