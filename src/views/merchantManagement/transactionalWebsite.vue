<template>
  <div>
    <div class="header" style='margin-bottom:20px;'>
      <el-row type="flex" class="row-bg">
        <el-form :model="form" ref="form">
        <el-col :sm="4"  class="select_inp">

         <el-select v-model="status" clearable placeholder="审核状态" size="small" style="width: 200px">
            <el-option v-for="item in options" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>

        </el-col>
        
      
        </el-form>
        <el-col :sm="2" :offset="1">
           <el-button class="" type="primary" size="small" icon="el-icon-search" @click="grabble">搜索</el-button>
        </el-col>
        <el-col :sm="2" :offset="1">
           <el-button class="" type="primary" size="small" icon="el-icon-search" @click="addWeb"> 添加网站 </el-button>
        </el-col>
      </el-row>
    </div>
     <div class="CM_content_center">
        <template>
          <el-table :data="tableData" border stripe style="width: 100%" id="TQ_table">

            <el-table-column type="index" label="序号" align="center" width="50">
            </el-table-column>

            <el-table-column prop="webName" label="网站名称" align="center">
            </el-table-column>

             <el-table-column prop="webUrl" label="网站地址"  align="center">
            </el-table-column>

         
           
            <el-table-column prop="status" label="审核状态" width="120" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status=='0'" type="info">未审核</el-tag>
                <el-tag v-else-if="scope.row.status =='1'" type="success">通过</el-tag>
                <el-tag v-else-if="scope.row.status =='2'" type="warning">未通过</el-tag>
               
              </template>
            </el-table-column>

            <el-table-column prop="remark" label="备注"  align="center">
            </el-table-column>
            

            <el-table-column prop="createTime" label="创建时间" align="center" >
            </el-table-column>

            <!-- <el-table-column  label="操作" align="center">
              <template slot-scope="scope"  >

                  <el-button type="primary" size="mini" @click="addWeb(scope.row)" style="margin-bottom:10px;"></el-button>
                    
                  
              
              </template>
             
            </el-table-column> -->
           
          </el-table>
        </template>
      </div>
      <template>
        <el-dialog
          title="添加网站"
          :visible.sync="dialogVisible"
          width="40%"
           >
           <el-form :model="form2" ref="form2">
            <el-form-item label="网站名称" label-width="30%">
                <template>
                 <el-input placeholder="请输入网站名称" size="small" clearable style="max-width: 150px" 
                    v-model="form2.webName"></el-input>
                </template>
            </el-form-item>

            <el-form-item label="网站地址" label-width="30%">
                <template>
                 <el-input placeholder="请输入网站地址" size="small" clearable style="max-width: 150px" 
                    v-model="form2.webUrl"></el-input>
                </template>
            </el-form-item>
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="btnAddWeb">确 定</el-button>
          </span>
        </el-dialog>
      </template>
       <div class="CM_content_foot">
        <div class="block">
          <paging :pagingData="pagingData" v-on:pagingData="pagingFun"></paging>
        </div>
      </div>
  </div>
</template>

<script>
import paging from "@/components/paging"
export default {
   components:{
    paging
  },
  data(){
    return{
      tableData:[],
      status:'',
      form:{},
      form2:{
        webName:'',
        webUrl:'',
      },
      dialogVisible:false,
      pagingData: {
          currentPage4: 1,//当前页数，支持 .sync 修饰符
          pageSize: 20,//每页显示条目个数，支持 .sync 修饰符
          pageSizes: [10, 20, 50, 100],//每页显示个数选择器的选项设置
          total: 0,//总条目数
      },
      options:[
        {
          value:0,
          label:'未审核'
        },
        {
          value:1,
          label:'通过'
        },
        {
          value:2,
          label:'未通过'
        }
      ]
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
   
     
     let status =this.status
     let pageNum = this.pagingData.currentPage4;
     let pageSize = this.pagingData.pageSize
     this.$itemApi.webList(status,pageNum,pageSize).then(res=>{
       if(res.code==200){
         this.tableData = res.data.list
         this.pagingData.total = res.data.total
       }
       else{
         this.$message({
            message: res.messages,
            type: 'error',
            
        })
       }
     })
   },
   grabble(){
    console.log('this.',this.status)
    this.getData()
  },
  pagingFun(data) {
      //分页事件
      this.pagingData = data
      this.getData()
  },
  addWeb(){
    this.dialogVisible = true
    // this.btnAddWeb()
  },
  btnAddWeb(){
    let webName = this.form2.webName
    let webUrl = this.form2.webUrl
    if(!webName || !webUrl){
       this.$message({
            message: '请先填写完整的信息',
            type: 'error',
      })
        return
    }
    let that = this
    this.$itemApi.addWeb(webName,webUrl).then(res=>{
       if(res.code==200){
         this.$message({
            message: '添加成功',
            type: 'success',
            
        })
        that.dialogVisible = false
        
        setTimeout(() => {
          that.getData()
        },2000);
        
       }
       else{
         this.$message({
            message: res.messages,
            type: 'error',
            
        })
       }
     })
  }
  }
}
</script>

<style>

</style>