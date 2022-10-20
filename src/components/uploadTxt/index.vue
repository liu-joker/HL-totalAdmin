<template>

  <div class="uploadTxt">
    <el-upload
      class="upload-demo"
      action=""
      :on-change="handleChange"
      :on-remove="handleRemove"
      :limit="2"
      :auto-upload="false"
      accept="text/plain"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
  </div>

</template>

<script>
  export default {
    name: 'uploadTxt',
    data() {
      return {
        fileList: [],
        fileObj:{}
      }
    },
    props:['fileData'],
    created() {

    },
    methods: {
      submitUpload() {
        //上传


        console.log(this.fileList[0], "submit")


      },
      onBeforeUpload(file) {
        const isIMAGE = file.type === 'text/plain';
        const isLt1M = file.size / 1024 / 1024 < 0.1;
        console.log(file.type,'type')
        if (!isIMAGE) {
          this.$message.error('上传文件只能是txt格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 100KB!');
        }
        return isIMAGE && isLt1M;
      },
      handleChange(file, fileList) {


        this.fileList = fileList.slice(-1);
        this.fileObj = file
        this.$emit("fileData",this.fileObj)
        console.log(file, fileList);
      },
      handleRemove(file, fileList) {
        this.fileObj = {}
        this.$emit("fileData",this.fileObj)
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        //return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">


</style>
