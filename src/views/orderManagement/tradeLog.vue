<template>
  <div>
      <div class="header" style='margin-bottom:20px;'>
      <el-row type="flex" class="row-bg">
        <el-col :sm ='2' style='font-size:14px;line-height:33px;'>补单状态</el-col>
        <el-form :model="form" ref="form">
     
        <el-col :sm="4"  class="select_inp">
            
         <el-select v-model="status" clearable placeholder="审核状态" size="small" style="width: 200px">
            <el-option v-for="item in options" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>

        </el-col>
        
      
        </el-form>
        <el-col :sm="2" :offset="6">
           <el-button class="" type="info" size="small" icon="el-icon-refresh" >重置</el-button>
        </el-col>
        <el-col :sm="2" :offset="1">
           <el-button class="" type="primary" size="small" icon="el-icon-search" > 查询 </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="CM_content_center">
        <template>
          <el-table :data="tableData" border stripe style="width: 100%" id="TQ_table">

            <el-table-column type="index" label="序号" align="center" width="50">
            </el-table-column>

            <el-table-column prop="webName" label="批次号" align="center">
            </el-table-column>

             <el-table-column prop="webUrl" label="文件名"  align="center">
            </el-table-column>

         
           
            <el-table-column prop="status" label="补单状态" width="120" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status=='0'" type="info">未审核</el-tag>
                <el-tag v-else-if="scope.row.status =='1'" type="success">通过</el-tag>
                <el-tag v-else-if="scope.row.status =='2'" type="warning">未通过</el-tag>
               
              </template>
            </el-table-column>

            <el-table-column prop="remark" label="上传人"  align="center">
            </el-table-column>
            

            <el-table-column prop="createTime" label="创建时间" align="center" >
            </el-table-column>

            <el-table-column  label="操作" align="center">
            </el-table-column>
           
          </el-table>
        </template>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            from:{},
            status:'',
            options:[
                 {
                    value:0,
                    label:'初审待审'
                },
                {
                    value:1,
                    label:'初审通过'
                },
                {
                    value:2,
                    label:'初审驳回'
                },
                {
                    value:3,
                    label:'复审通过'
                },
                {
                    value:4,
                    label:'复审驳回'
                }
            ],
            tableData:[],
        }
    }
}
</script>

<style>

</style>