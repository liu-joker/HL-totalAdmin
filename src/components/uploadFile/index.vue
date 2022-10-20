<!--上传图片-->
<template>

  <div class="uploadImg">
    <el-upload
      :action="uData.upUrl"
      list-type="picture-card"
      :auto-upload="uData.autoUpload"
      :multiple="uData.multiple"
      :disabled="uData.disabled"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      ref="upload"
      :data="uData.dataObj"
      :file-list="fileListRead"
      :limit="uData.maxList"
      :on-exceed="exceed"
      :on-preview="handlePictureCardPreview"
      :on-success="uploadSuccess"
      :on-remove="handleRemove"
      :on-error="handleError"
      :before-remove="beforeRemove"
    >
      <i slot="default" v-if="!uData.disabled" class="el-icon-plus"></i>

      <!--<div slot="file" slot-scope="{file}" v-model="fileList">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url" alt="">
        <span class="el-upload-list__item-actions">
          <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
          <span
            v-if="!uData.disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove"
          >
          <i class="el-icon-delete"></i>
        </span>
        </span>
      </div>-->
    </el-upload>


   <!-- <el-image
      ref="elImg"
      :src="dialogImageUrl"
      :showImg="dialogVisible"
      :preview-src-list="[dialogImageUrl]">
    </el-image>-->

    <el-dialog :visible.sync="dialogVisible" :modal="false" :close-on-click-modal="false" style="width: 50%;max-height: 100vh;overflow: hidden" v-drag>
      <!--<img width="100%" :src="dialogImageUrl" alt="">-->
      <el-image
        ref="elImg"
        :src="dialogImageUrl"
        :preview-src-list="[dialogImageUrl]">
      </el-image>
    </el-dialog>



    <el-button @click="uploadBannerImg" type="primary" size="small" v-if="!uData.disabled" style="margin-top: 15px">
      确认上传
    </el-button>
  </div>

</template>

<script>
  export default {
    name: 'uploadImg',
    components: {},
    data() {
      return {
        uData: {
          upUrl: 'https://upload-z2.qiniup.com',
          autoUpload: false,//自动上传
          multiple: true,//是否多选
          disabled: false,//是否多选
          dataObj: {
            token: '',
            key: ''
          },//上传参数
          maxList: 20,//最大上传个数
        },
        dataObj: {token: '', key: ''},
        fileList: [],
        imgFileList: [],
        maxList: 20,
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    props: ['dataInfo', 'fileListRead'],
   /* watch:{
      fileListRead(){
        this.$emit("getFileList", this.fileListRead)
      }
    },*/
    created() {
      this.uData = this.dataInfo
    },
    methods: {

      handleError(err, file, fileList) {
        //上传失败
        this.$message({
          type: 'warning',
          message: err
        })
      },
      uploadSuccess() {
        //上传成功
        this.$emit("getFileList", this.fileList)
      },
      beforeUpload(file) {
        //上传之前重命名
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
          return
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return
        }

        let oldName = file.name
        let index = oldName.lastIndexOf(".");
        let ext = oldName.substr(index + 1);
        this.uData.dataObj.key = file.lastModified + String(file.size) + "." + ext
        return this.uData.dataObj
      },
      uploadBannerImg() {
        //上传商品轮播图
        console.log(this.fileList, 'imgList')

        this.$axiosApi.getAuth().then(res => {
          if (res.code == 200) {
            this.uData.dataObj.token = res.data
            this.$refs.upload.submit();
          }
        })

      },
      handleChange(file, fileList) {
        //选择文件事件
        //  this.fileList = fileList.slice(-3);
        let oldName = file.name
        let index = oldName.lastIndexOf(".");
        let ext = oldName.substr(index + 1);
        file.name = file.raw.lastModified + String(file.size) + "." + ext
        this.fileList = fileList;
        this.$emit("getFileList", this.fileList)
      },
      exceed() {
        this.$message({
          type: 'warning',
          message: '不得超过' + this.uData.maxList + '张'
        })
      },
      handleRemove(file, fileList) {
        //删除事件

//        this.fileList.splice(this.fileList.indexOf(file),1);
        this.$emit("getFileList", fileList)
      },
      beforeRemove(){
        if(this.uData.disabled) return false
      },
      handlePictureCardPreview(file) {
        //查看大图
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
       /* this.$nextTick(()=>{
          this.$refs.elImg.$emit('click')
        })*/
      },
      handleDownload(file) {
        //下载图片
        console.log(file);
      },
    }
  }
</script>

<style>

  .elimg{
    width: 10rem;
    height: auto;
  }
</style>
