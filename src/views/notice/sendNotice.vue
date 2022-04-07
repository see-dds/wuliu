<template>
  <d2-container>
    <el-form ref="form"
    :model="form"
    label-position="left"
    label-width="100px">
      <el-form-item label="公告主题">
        <el-input v-model="form.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="接受网点">
        <div @click="site=true">
            <el-input v-model="form.name" placeholder="请选择"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="接收员工">
        <div @click="staff=true">
            <el-input v-model="form.name" placeholder="请选择"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="封面：">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">选取图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否必读">
        <el-radio v-model="radio" label="1">是</el-radio>
        <el-radio v-model="radio" label="2">否</el-radio>
      </el-form-item>
      <el-button type="primary" @click="sendClick">发送</el-button>
    </el-form>
    <!-- 接受网点弹窗 -->
    <el-dialog
        title="选择接受网点"
        :visible.sync="site"
        width="950px"
        :before-close="handleClose">
        <el-input class="keyWord" v-model="form.name" placeholder="输入关键字进行过滤"></el-input>
        <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox>
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="site= false">取 消</el-button>
            <el-button type="primary" @click="rejectSite = false">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 接受员工弹窗 -->
    <el-dialog
        title="选择接受员工"
        :visible.sync="staff"
        width="950px"
        :before-close="handleClose">
        <el-input class="keyWord" v-model="form.name" placeholder="输入关键字进行过滤"></el-input>
        <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox>
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="staff= false">取 消</el-button>
            <el-button type="primary" @click="rejectSite = false">确 定</el-button>
        </span>
    </el-dialog>
  </d2-container>
</template>
<script>
// import { page } from '@vue/composition-api'
export default {
  name: 'sendNotice',
  data () {
    return {
      page: 1,
      limit: 20,
      tableDate: [],
      total: 0,
      form: {},
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      site: false,
      staff: false
    }
  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    staff () {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: ' action: $ { action } '
          })
        }
      })
    },
    sendClick () {
      this.$message({
        showClose: true,
        message: '请输入公告内容',
        type: 'warning'
      })
    },
    rejectSite () {

    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '全部' }])
      }
      if (node.level > 1) return resolve([])

      setTimeout(() => {
        const data = [{
          name: '广州千锋网点',
          leaf: true
        }, {
          name: '学三文化网点'
        }, {
          name: '学三文化网点'
        }, {
          name: '学三文化网点'
        }, {
          name: '学三文化网点'
        }]

        resolve(data)
      }, 500)
    }
  }
}
</script>
<style scoped lang="scss" >
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
