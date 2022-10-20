<template>
  <div>
    <div class="header" style='margin-bottom:20px;'>


      <el-form :model="form" ref="form">
        <el-row type="flex" class="row-bg">
          <el-col :sm="6">
            <el-form-item label="商户号:" prop="name">
              <el-input v-model="form.name" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="流水号:" prop="name">
              <el-input v-model="form.serial" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="账户类型:" prop="name">
              <el-select v-model="accountType" clearable placeholder="账户类型" size="small" style="width: 200px">
                <el-option v-for="item in options1" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :sm="6">
            <el-form-item label="事件类型:" prop="name">
              <el-select v-model="eventType" clearable placeholder="事件类型" size="small" style="width: 200px">
                <el-option v-for="item in options2" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="事件步骤:" prop="name">
              <el-select v-model="eventStep" clearable placeholder="事件步骤" size="small" style="width: 200px">
                <el-option v-for="item in options3" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
             </el-select>
            </el-form-item>
          </el-col> -->


        </el-row>
        <el-row>
          <el-form-item label="开始时间:" prop="showAmount">
            <el-date-picker v-model="form.startDate" type="datetime" @change="getTime($event,1)" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:" prop="showAmount">
            <el-date-picker v-model="form.endDate" type="datetime" @change="getTime($event,2)" placeholder="选择日期">
            </el-date-picker>

          </el-form-item>
          <el-col :sm="4">
            <!-- <el-button-group>
              <el-button type="" size="mini" >查看详情</el-button>
              <el-button type="info" size="mini"  disabled>初审</el-button>
              <el-button type="info" size="mini"  disabled>终审</el-button>
              <el-button type="" size="mini" icon="el-icon-download">导出</el-button>
            </el-button-group> -->

          </el-col>
          <el-col :sm="2" :offset="16">
            <el-button class="" type="info" size="small" icon="el-icon-refresh">重置</el-button>
          </el-col>
          <el-col :sm="2">
            <el-button class="" type="primary" size="small" icon="el-icon-search"> 查询 </el-button>
          </el-col>
        </el-row>

      </el-form>


    </div>
    <div class="CM_content_center">
      <template>
        <el-table :data="tableData" border stripe style="width: 100%" id="TQ_table">

          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>

          <el-table-column prop="webName" label="商户号" align="center">
          </el-table-column>

          <el-table-column prop="webName" label="交易订单号" align="center">
          </el-table-column>

          <el-table-column prop="webName" label="账户类型" align="center">
          </el-table-column>

          <el-table-column prop="webName" label="说明" align="center">
          </el-table-column>

          <el-table-column prop="webName" label="变动金额" align="center">
          </el-table-column>

          <el-table-column prop="webName" label="币种" align="center">
          </el-table-column>

          <el-table-column prop="webName" label="出入账时间" align="center">
          </el-table-column>

          <!-- <el-table-column prop="webName" label="申请" align="center">
            <el-table-column prop="webName" label="申请备注" align="center">
             </el-table-column>
             <el-table-column prop="webName" label="申请时间" align="center">
             </el-table-column>
             <el-table-column prop="webName" label="申请人" align="center">
            </el-table-column>
          </el-table-column>

          <el-table-column prop="webName" label="初审" align="center">
            <el-table-column prop="webName" label="初审时间" align="center">
             </el-table-column>
             <el-table-column prop="webName" label="初审人" align="center">
             </el-table-column>
            
          </el-table-column>

          <el-table-column prop="webName" label="复核" align="center">
            <el-table-column prop="webName" label="复核意见" align="center">
             </el-table-column>
             <el-table-column prop="webName" label="复核时间" align="center">
             </el-table-column>
             <el-table-column prop="webName" label="复核人" align="center">
            </el-table-column>
          </el-table-column> -->





          <!-- <el-table-column prop="status" label="补单状态" width="120" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status=='0'" type="info">未审核</el-tag>
                <el-tag v-else-if="scope.row.status =='1'" type="success">通过</el-tag>
                <el-tag v-else-if="scope.row.status =='2'" type="warning">未通过</el-tag>
               
              </template>
            </el-table-column> -->

          <el-table-column prop="remark" label="操作"  align="center">
            </el-table-column>
            

            <!-- <el-table-column prop="createTime" label="创建人" align="center" >
            </el-table-column> -->
          


        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
        status: '',
        eventType:'',
        accountType:'',
        eventStep:'',
        options1: [{
            value: 0,
            label: '可用账户'
          },
          {
            value: 1,
            label: '冻结账户'
          },
        
        ],
         options2: [{
            value: 0,
            label: '冻结'
          },
          {
            value: 1,
            label: '扣款'
          },
          {
            value: 2,
            label: '充值'
          },
          {
            value: 3,
            label: '解冻'
          },
        
        ],
        options3: [{
            value: 0,
            label: '初审待审'
          },
          {
            value: 1,
            label: '初审通过'
          },
          {
            value: 2,
            label: '初审驳回'
          },
          {
            value: 3,
            label: '复审通过'
          },
          {
            value: 4,
            label: '复审驳回'
          },
        
        ],
        tableData: [],
      }
    },
    methods: {
      getTime(e, type) {
        var date = new Date(e);
        var year = date.getFullYear();
        var month = date.getMonth() + 1
        var day = date.getDate()

        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var nowTime = date.toLocaleTimeString()

        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        let newTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
        console.log(month, newTime, 'eee')
        if (type == 1) {
          this.form.startDate = newTime
        } else if (type == 2) {
          this.form.endDate = newTime
        } else if (type == 3) {
          this.form.signDate = newTime
        }
      },
    }
  }

</script>

<style>

</style>
