<template>
  <div class="order">
    <div class="header">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-form :model="form" ref="form">
        <el-col :sm="4"  class="select_inp">

          <el-input v-model="orderNo" :maxLength="50" size="small" placeholder="上游订单号"></el-input>

        </el-col>
        
        <el-col :sm="4" :offset="1" class="select_inp">
           <el-input v-model="currency"  size="small" placeholder="币种"></el-input>
           <!-- <el-select v-model="currency" clearable placeholder="币种" size="small" style="width: 200px">
            <el-option v-for="item in options" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select> -->
        </el-col>
        
         <el-col :sm="6" class="select_inp" :offset="1">
          <el-form-item label="" :label-width="formLabelWidth" prop="" size="small">
            <el-date-picker
            v-model="startTime"
            type="datetime"
            @change="getTime($event,1)"
            placeholder="选择开始日期">
            </el-date-picker>
          </el-form-item>
          
        </el-col>
        <el-col :sm="6" class="select_inp" :offset="1" >
         
          <el-form-item label="" :label-width="formLabelWidth" prop="" size="small">
              <el-date-picker
              v-model="endTime"
              type="datetime"
              @change="getTime($event,2)"
              placeholder="选择结束日期">
              </el-date-picker>
          </el-form-item>
        </el-col>
        </el-form>
        <el-col :sm="2" :offset="1">
           <el-button class="" type="primary" size="small" icon="el-icon-search" @click="grabble">搜索</el-button>
        </el-col>

      </el-row>
    </div>

     <div class="CM_content_center">
        <template>
          <el-table :data="tableData" border stripe style="width: 100%" id="TQ_table">

            <el-table-column type="index" label="序号" align="center" width="50">
            </el-table-column>

            <el-table-column prop="orderNo" label="商户订单号" align="center">
            </el-table-column>

             <el-table-column prop="orderNum" label="平台订单号"  align="center">
            </el-table-column>

            <el-table-column prop="currency" label="币种"  align="center" >
              
            </el-table-column>

            <el-table-column prop="amount" label="金额"  align="center">
            </el-table-column>
            <!-- <el-table-column prop="rate" label="成本费率" width="150" align="center">
            </el-table-column> -->
             <!--0未支付,1支付成功,2支付失败,3支付中,-->
            <!-- <el-table-column prop="status" label="订单状态" width="120" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status=='0'" type="info">未成功</el-tag>
                <el-tag v-else-if="scope.row.status =='1'" type="success">支付成功</el-tag>
                <el-tag v-else-if="scope.row.status =='2'" type="warning">支付失败</el-tag>
                <el-tag v-else-if="scope.row.status =='3'" type="danger">支付中</el-tag>
              </template>
            </el-table-column> -->

            

            <el-table-column prop="createTime" label="创建时间" align="center" >
            </el-table-column>
            

            

       
            


        
            

           

         

            

            <!-- <el-table-column  label="操作" align="center">
              <template slot-scope="scope"  >
             
                
                <el-button type="primary" size="mini" @click="updateVote(scope.row)" style="margin-bottom:10px;">
                    
                  </el-button>
              
              </template>
             
            </el-table-column> -->
           
          </el-table>
        </template>
      </div>

       <div class="CM_content_foot">
        <div class="block">
          <paging :pagingData="pagingData" v-on:pagingData="pagingFun"></paging>
        </div>
      </div>
  </div>
</template>

<script>
import {formatMoney} from "@/filters"
import paging from "@/components/paging"
export default {
  components:{
    paging
  },
 data(){
   return{
    
     orderNo:'',
     startTime:'',
     endTime:'',
     currency:'',
     pageNum:1,
     pageSize:10,
     tableData:[],
     formLabelWidth:'30%',
     options:[
       {
         label:'美元',
         value:'USD',
       },
       {
         label:'人民币',
         value:'CNY',
       },
       
     ],
     form:{
        orderNo:'',
        startTime:'',
        endTime:'',
        status:'',
     },
      pagingData: {
          currentPage4: 1,//当前页数，支持 .sync 修饰符
          pageSize: 20,//每页显示条目个数，支持 .sync 修饰符
          pageSizes: [10, 20, 50, 100],//每页显示个数选择器的选项设置
          total: 400,//总条目数
        },
   }


 },
 created(){
   this.getData()
 },
 methods:{
   getData(){
     let orderNo = this.orderNo
     let startTime = this.startTime
     let endTime = this.endTime
     let currency = this.currency
     let pageNum = this.pagingData.currentPage4;
     let pageSize = this.pagingData.pageSize
     this.$itemApi.getRecord(orderNo,startTime,endTime,currency,pageNum,pageSize).then(res=>{
       if(res.code==200){
         this.tableData = res.data.list.map(v=>{
           v.amount = formatMoney(v.amount)
           return v
         })
         this.pagingData.total = res.data.total
       }else{
         this.$message({
            message: res.messages,
            type: 'error',
            
        })
       }
     })
   },
    getTime(e,type){
        var date = new Date(e);
        var year = date.getFullYear();
        var month = date.getMonth()+1
        var day = date.getDate()
        
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var nowTime =date.toLocaleTimeString()

      month=  month<10?'0'+month:month
      day=  day<10?'0'+day:day
       hours= hours<10?'0'+hours:hours
       minutes= minutes<10?'0'+minutes:minutes
       seconds= seconds<10?'0'+seconds:seconds

        let newTime = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds
        // console.log(month,newTime,'eee')
        if(type == 1){
            this.startTime = newTime
        }else if(type == 2){
            this.endTime = newTime
        }else if(type == 3){
           
        }
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
 },

}
</script>

<style lang='scss' scoped>

</style>