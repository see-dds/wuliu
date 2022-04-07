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
        <el-radio-group size="small">
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
        >
          <el-button size="small" type="primary">选取封面</el-button>
        </el-upload>
      </el-form-item>
      <el-button type="primary" @click="sendClick">发送</el-button>
    </el-form>
    <!-- 接受分类弹窗 -->
    <el-dialog
        title="分类内容"
        :visible.sync="site"
        width="950px">
        <span slot="footer" class="dialog-footer">
            <el-button @click="site= false">取 消</el-button>
            <el-button type="primary" @click="rejectSite = false">确 定</el-button>
        </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import { getAllNoticle, getTitle } from '@/apis/article'
export default {
  name: 'sendNotice',
  data () {
    return {
      page: 1,
      limit: 20,
      tableDate: [],
      total: 0,
      form: {
        title: '',
        cate: '',
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
      const res = await getTitle(this.form)
      const { success } = res
      if (!success) return this.$notify.warning('添加失败')
      this.$notify.success('添加成功')
      this.getList()
      this.$message({
        showClose: true,
        message: '请输入公告内容',
        type: 'warning'
      })
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
