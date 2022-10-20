<template>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="templateData.currentPage4"
      :page-sizes="templateData.pageSizes"
      :page-size="templateData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="templateData.total">
    </el-pagination>
</template>

<script>
  export default {
    name:'paging',
    data(){
      return{
        templateData:{}
      }
    },
    props:['pagingData'],
    created(){
      this.templateData = this.pagingData
    },
    methods:{
      handleSizeChange(val) {
        //分页大小
        this.templateData.pageSize=val
        this.$emit("pagingData",this.templateData)
      },
      handleCurrentChange(val) {
        //分页
        this.templateData.currentPage4=val
        this.$emit("pagingData",this.templateData)
      }
    },
    watch: {
      pagingData(curVal,oldVal){
        if(curVal){
          this.templateData=curVal;
        }
      },
      templateData: {
        handler:function(newVal,oldVal) {
          //this.templateData = newVal
          //this.$emit("pagingData",this.templateData)
        },
        deep: true
      }
    }
  }
</script>

<style>

</style>
