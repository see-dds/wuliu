<template>
  <d2-container>
    <el-table :data="tableData">
      <el-table-column prop="serial" label="序号" width="70"> </el-table-column>
      <el-table-column prop="title" label="标题" width="320"> </el-table-column>
      <el-table-column prop="sendSite" label="发件网点" width="320">
      </el-table-column>
      <el-table-column prop="sendSite" label="发件人" width="430">
      </el-table-column>
      <el-table-column prop="sendSite" label="是否阅读" width="210">
      </el-table-column>
      <el-table-column prop="sendSite" label="发件时间" width="290">
      </el-table-column>
      <el-table-column prop="sendSite" label="操作"> </el-table-column>
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
  </d2-container>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'
export default {
  name: "noticeManage.vue",
  data() {
      return {
      page: 1,
      limit: 20,
      tableDate: [],
      total: 0,
      noticleInfo: {
          title: '', // 标题
          cate: '', // 分类
          content: '', // 内容
          cover: '' // 封面
      },
    }
  },
  methods: {
      async getList () {
      const { page, limit } = this
      const res = await getAllNoticle({ page, limit })
      this.tableData = res.data.rows
      console.log(res.data);
      this.total = res.data.count
    },
  }
};
</script>