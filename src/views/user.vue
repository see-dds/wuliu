<template>
<d2-container>
  <div slot="header" style="display: flex">
      <el-button @click="showAddBox=true" >添加</el-button>
      <el-input placeholder="请输入歌手名称" v-model="collectionName" style="width:200px" />
      <el-button @click="page=1;tableData=[];getList()">搜索</el-button>
  </div>
  <el-table :data="tableData">
    <el-table-column label="序号" width="50" type="index"/>
    <el-table-column prop='phone' label="登录账号" width="180"/>
    <el-table-column prop='pwd' label="密码" width="180"/>
    <el-table-column prop='name' label="姓名" width="200"/>
    <el-table-column prop='phone' label="电话" width="220"/>
    <el-table-column prop='type' label="角色名" width="150"/>
    <el-table-column prop='createdAt' label="创建时间" width="280"/>
    <el-table-column>
      <template slot-scope="scope">
         <el-button type="primary" size='small' @click="handleDel(scope.row)">分配角色</el-button>
         <el-button type="warning" size='small' @click="handleEdit(scope.row)">修改密码</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <div slot="footer">
    <el-pagination
      :total="total"
      :page-size="limit"
      :current-page="page"
      @current-change="handlePageChange"
    />
  </div> -->

<!--  添加表单的弹窗 start-->

  <!-- <el-dialog
    title="添加歌单"
    :visible.sync="showAddBox"
    width="800px"
    :before-close="beforeAddClose">
     <el-form  label-width="120px" size="mini" ref="addForm">
            <el-form-item label="专辑名">
             <el-input v-model="colletionInfo.name"></el-input>
           </el-form-item>
            <el-upload
             :limit="1"
             class="upload-demo"
             :action="uploadUrl"
             :on-remove="handleRemove"
             :file-list="fileList"
             :on-success="uploadOk"
             list-type="picture">
             <el-button size="small" type="primary">点击上传</el-button>
             <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
           </el-upload>
            <el-form-item label="歌单描述">
              <VueEditor v-model="colletionInfo.desc"></VueEditor>
            </el-form-item>
            <el-form-item :label="'歌曲'+(index+1)" v-for="(item,index) in colletionInfo.songs" :key="item.key">
            <div style="display: flex">
              <el-autocomplete
                class="inline-input"
                v-model="item.songid"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="(res)=>handleSelect(res,index)"
              ></el-autocomplete>
              <span @click="colletionInfo.songs.splice(index,1);temsong.splice(index,1)"> 删</span>
            </div>
            </el-form-item>
            <el-button @click="colletionInfo.songs.push({key:Date.now(),songid:''})"> 添加歌曲 </el-button>

     </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showAddBox = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
  </el-dialog> -->
  <!--  添加表单的弹窗 end -->

  <!--  编辑表单的弹窗 start-->
  <!-- <el-dialog
    title="编辑歌曲"
    :visible.sync="showEditBox"
    width="800px"
    :before-close="beforeAddClose">
    <el-form  label-width="120px" size="mini">
        <el-form-item label="专辑名">
          <el-input v-model="colletionInfo.name"></el-input>
        </el-form-item>
        <el-upload
          :limit="1"
          class="upload-demo"
          :action="uploadUrl"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-success="uploadOk"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-form-item label="歌单描述">
          <VueEditor v-model="colletionInfo.desc"></VueEditor>
        </el-form-item>
        <el-form-item :label="'歌曲'+(index+1)" v-for="(item,index) in colletionInfo.songs" :key="item.key">
          <div style="display: flex">
            <el-autocomplete
              class="inline-input"
              v-model="item.songid"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="(res)=>handleSelect(res,index)"
            ></el-autocomplete>
            <span @click="colletionInfo.songs.splice(index,1);temsong.splice(index,1)"> 删</span>
          </div>
        </el-form-item>
        <el-button @click="colletionInfo.songs.push({key:Date.now(),songid:''})"> 添加歌曲 </el-button>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button @click="showEditBox = false">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
  </el-dialog> -->
  <!--  编辑表单的弹窗 end -->

</d2-container>
</template>
<script>
// import { VueEditor } from 'vue2-editor'

export default {
  name: 'song.vue',
  components: {
    // VueEditor
  },
  data () {
    return {
      fileList: [], // 用来存放上传文件列表
      page: 1,
      collectionName: '',
      limit: 20,
      tableData: [],
      total: 0,
      showAddBox: false,
      showEditBox: false,
      colletionInfo: {
        name: '',
        songs: [], // 外部关联歌手的id
        cover: '', // 封面
        type: '', // 你懂的
        desc: ''
      },
      temsong: [],
      singer: null
    }
  },
  created () {
    this.getList()
  },
  watch: {
    page () {
      this.getList()
    },
    colletionInfo: {
      deep: true,
      handler (nv, ov) {
        console.log('nv', nv)
        console.log('ov', ov)
      }
    }
  },
  methods: {
    uploadOk (response, file, fileList) {
      this.colletionInfo.cover = response
      this.fileList = fileList
    },
    handleRemove (file, fileList) { // 处理删除图片的业务
      console.log(file, fileList)
    },
    // 远程获取输入建议
    async querySearch (val, cb) {
      console.log('val', val)
      const res = await this.api.post('/song/getAll', { name: val })
      console.log('resrser', res)
      const rows = res.data.rows
      const result = rows.map(item => ({
        value: item.name,
        songid: item._id
      }))
      cb(result)
    },
    handleSelect (res, index) {
      console.log('当前选中的自动补全建议的值', res, index)
      this.temsong[index] = res
    },
    handleDel (row) {
      console.log('row', row)
      this.$confirm('此操作将永久删除该专辑, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.api.post('/collection/del', { id: row._id })
        if (!res.success) return this.$notify.warning('删除失败')
        this.$notify.success('删除成功')
        this.getList()
      })
    },
    handleEdit (row) {
      console.log('rrrrrr', row)
      this.colletionInfo = { ...row }
      this.fileList = [
        {
          name: row.cover.split('/').pop(),
          url: row.cover
        }
      ]
      this.temsong = this.colletionInfo.songs
      this.colletionInfo.songs = row.songs.map(item => ({
        songid: item.value
      }))
      this.showEditBox = true
    },
    handlePageChange (curPage) {
      this.page = curPage
    },
    async getList () {
      const { page, limit } = this
      const postData = {
        page,
        limit
      }
      if (this.collectionName) postData.name = this.collectionName
      const res = await this.api.post('/admin/getAdmin', postData)
      // 获得数据
      this.tableData = res.data
    //   this.total = res.data.count
    },
    beforeAddClose () { // 在添加弹窗关闭前执行
      console.log('在关闭之前执行')
      // this.$refs.addForm.resetFields(); resetFields 需要 绑定有 model
      this.colletionInfo = {
        name: '',
        songs: [], // 外部关联歌手的id
        cover: '', // 封面
        type: '', // 你懂的
        desc: ''
      }
      this.temsong = []
      this.showAddBox = false
    },
    async  handleAdd () {
      // return console.log(this.colletionInfo, this.temsong)
      const res = await this.api.post('/collection/add', {
        ...this.colletionInfo,
        songs: this.temsong
      })
      const { success } = res
      if (!success) return this.$notify.warning('添加失败')
      this.$notify.success('添加成功')
      this.getList()
      this.showAddBox = false
    },
    async confirmEdit () {
      const { _id, ...updateData } = this.colletionInfo
      updateData.cover = this.fileList[0].response ? this.fileList[0].response : this.fileList[0].url
      updateData.songs = this.temsong
      const res = await this.api.post('/collection/update', { id: _id, ...updateData })
      const { success } = res
      if (!success) return this.$notify.warning('编辑失败')
      this.$notify.success('编辑成功')
      this.getList()
      this.showEditBox = false
    }

  },
  filters: {
    typeTxt (val) {
      if (val === 1) return '大陆'
      if (val === 2) return '港澳'
      if (val === 3) return '台湾'
      if (val === 4) return '海外'
    }
  }
}
</script>

<style scoped>

</style>
