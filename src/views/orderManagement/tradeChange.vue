<template>
  <div>
    <div class="header" style='margin-bottom:20px;'>
      <el-form :model="form" ref="form">
        <el-row type="flex" class="row-bg">
          <el-col :sm="8">
            <el-form-item label="商户号:" prop="name" >
              <el-input v-model="form.name" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="平台订单号:" prop="name">
              <el-input v-model="form.orderNum" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="退款状态:" prop="name">
              <el-input v-model="form.orderWebSite" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :sm="8">
            <el-form-item label="冻结状态:" prop="name">
              <el-input v-model="form.name" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="解冻状态:" prop="name" >
              <el-input v-model="form.orderNum" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="拒付状态:" prop="name" >
              <el-input v-model="form.orderWebSite" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :sm="8">
            <el-form-item label="通道:" prop="name" >
              <el-input v-model="form.name" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="邮箱:" prop="name" >
              <el-input v-model="form.orderNum" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="IP:" prop="name" >
              <el-input v-model="form.orderWebSite" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :sm="8">
            <el-form-item label="电话:" prop="name" >
              <el-input v-model="form.name" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="form.orderNum" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="交易网站:" prop="name">
              <el-input v-model="form.orderWebSite" auto-complete="off" clearable class="input_440" :maxLength="50"
                size="small"></el-input>
            </el-form-item>
          </el-col>
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
          <el-col :sm="2" :offset="20">
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

          <!-- <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column> -->

          <el-table-column prop="webName" label="平台订单号" align="center" fiexd width="150">
          </el-table-column>

          <el-table-column prop="webUrl" label='商户号' align="center" width="150">
          </el-table-column>



          <!-- <el-table-column prop="status" label="补单状态" width="120" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status=='0'" type="info">未审核</el-tag>
                <el-tag v-else-if="scope.row.status =='1'" type="success">通过</el-tag>
                <el-tag v-else-if="scope.row.status =='2'" type="warning">未通过</el-tag>
               
              </template>
            </el-table-column> -->

          <el-table-column prop="remark" label="交易金额" align="center" width="150" >
          </el-table-column>


          <el-table-column prop="createTime" label="剩余金额" align="center" width="150">
          </el-table-column>
          <el-table-column prop="createTime" label="退款状态" align="center" width="150">
          </el-table-column>
          <el-table-column prop="createTime" label="拒付状态" align="center" width="150">
          </el-table-column>
          <el-table-column prop="createTime" label="冻结状态" align="center" width="150">
          </el-table-column>
          <el-table-column prop="createTime" label="解冻状态" align="center" width="150">
          </el-table-column>
          <el-table-column prop="createTime" label="拒付金额" align="center" width="150">
          </el-table-column>
          <el-table-column prop="createTime" label="冻结金额" align="center" width="150">
          </el-table-column>
          <el-table-column prop="createTime" label="解冻金额" align="center" width="150">
          </el-table-column>
          <el-table-column prop="createTime" label="IP" align="center" width="150">
          </el-table-column>
          <el-table-column prop="createTime" label="交易通道" align="center" width="150">
          </el-table-column>

          <el-table-column label="操作"  fiexd='right' width="150">
          </el-table-column>

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
        options: [{
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
          }
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
