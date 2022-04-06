<template>
  <d2-container>
    <template slot="header">订单调度</template>
    <avue-form :option="option" v-model="form" @submit="handleSubmit" @tab-click="handleTabClick">
  <template slot="group1Header" slot-scope="{column}">
    <i :class="column.icon"></i><el-tag>{{column.label}}</el-tag>
  </template>
   <template slot="text3" slot-scope="{}">
    <el-input placeholder="自定义" v-model="form.text3"></el-input>
  </template>
</avue-form>

  </d2-container>
</template>

<script>
export default {
  name: 'page3'
}
</script>
<script>
export default {
  data(){
    return {
       form:{
          text:'文本',
          text1:'文本1',
          text2:'文本2',
          text3:'文本3',
       },
       option:{
          column:[{
                label: '内容',
                prop: 'text',
          }],
          group:[
            {
              icon:'el-icon-info',
              label: '分组1',
              collapse:false,
              prop: 'group1',
              column: [{
                label: '内容1',
                prop: 'text1',
              }]
            },{
              icon:'el-icon-info',
              label: '分组2',
              arrow:false,
              prop: 'group2',
              column: [{
                label: '选项卡2',
                prop: 'text2',
              }, {
                label: '选项卡3',
                prop: 'text3',
              }]
            }
          ]
       }
    }
  },
  methods:{
    handleSubmit(form){
       this.$message.success(JSON.stringify(this.form))
    },
    handleTabClick(event){
      this.$message.success(event);
    }
  }
}
</script>
