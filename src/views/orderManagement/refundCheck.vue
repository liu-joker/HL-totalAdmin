<template>
  <div>
     <div class="header" style='margin-bottom:20px;'>
        <el-row type="flex" class="row-bg">
        <el-col :sm="2">
          <!-- <div>文件</div> -->
        </el-col>  
        <el-col :sm="8">
          <uploadTxt></uploadTxt>
          <!-- <el-button type="primary">选取文件</el-button> -->
          <el-row><br><br>上传注意事项:</el-row>
          <el-row><br>1.上传文件为txt类型，字符编码utf8</el-row>
          <el-row><br>2，文件内容：交易流水号，银行交易金额</el-row>
          <el-row><br>3.分别用英文逗号隔开</el-row>
          <el-row><br>4.一行内容为一条订单</el-row>
          <el-row><br>例如:</el-row>
          <el-row><br>JC202008032019350051,21</el-row>
        </el-col>  
          
       </el-row>
     </div>
      
  </div>
</template>

<script>
import uploadTxt from '../../components/uploadTxt'
export default {
  components:{
    uploadTxt
  }
}
</script>

<style>

</style>