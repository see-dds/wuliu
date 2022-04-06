<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="公告名称">
            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: 'notice.vue'
}
</script>
