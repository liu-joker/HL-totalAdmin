<template>
  <div class="order">
    <div class="header"
         style='margin-bottom:20px;'>
      <el-row type="flex"
              class="row-bg"
              justify="space-between">
        <el-form :model="form"
                 ref="form">
          <el-col :sm="6"
                  class="select_inp">
            <el-input v-model="orderNo"
                      :maxLength="50"
                      clearable
                      size="small"
                      placeholder="商户订单号"></el-input>
          </el-col>
          <el-col :sm="6"
                  :offset="1"
                  class="select_inp">

            <el-input v-model="account"
                      :maxLength="50"
                      clearable
                      size="small"
                      placeholder="商户号"></el-input>

          </el-col>

          <el-col :sm="6"
                  :offset="1"
                  class="select_inp">
            <el-select v-model="status"
                       clearable
                       placeholder="退款状态"
                       size="small">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>

          <!-- <el-col :sm="6"
                  class="select_inp">
            <el-form-item label=""
                          :label-width="formLabelWidth"
                          prop=""
                          size="small">
              <el-date-picker v-model="startTime"
                              type="datetime"
                              @change="getTime($event,1)"
                              placeholder="选择开始日期">
              </el-date-picker>
            </el-form-item>

          </el-col>
          <el-col :sm="6"
                  class="select_inp"
                  :offset="1">
            <el-form-item label=""
                          :label-width="formLabelWidth"
                          prop=""
                          size="small">
              <el-date-picker v-model="endTime"
                              type="datetime"
                              @change="getTime($event,2)"
                              placeholder="选择结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
        </el-form>

        <el-col :sm="3"
                :offset="1"
                style="display:flex;">
          <el-button class=""
                     type="primary"
                     size="small"
                     icon="el-icon-search"
                     @click="grabble">搜索</el-button>
          <el-button style="margin-left:20px;"
                     type="warning"
                     size="small"
                     icon="el-icon-download"
                     @click="exportExcel">导出</el-button>
        </el-col>

      </el-row>
      <el-row type="flex"
              class="row-bg"
              justify="space-between"
              style="margin-top:20px;">
        <el-col :sm='6'>
          <el-date-picker v-model="period"
                          type="daterange"
                          size='small'
                          @change="getPeriod($event)"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-row>
    </div>

    <div class="CM_content_center">
      <template>
        <el-table :data="tableData"
                  border
                  stripe
                  style="width: 100%"
                  id="TQ_table">

          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="50">
          </el-table-column>
          <el-table-column prop="name"
                           label="商户名称"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="account"
                           label="商户号"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="orderNo"
                           label="商户订单号"
                           width=""
                           align="center">
          </el-table-column>

          <el-table-column prop="orderNum"
                           label="平台订单号"
                           width=""
                           align="center">
          </el-table-column>

          <el-table-column prop="amount"
                           label="金额"
                           width=""
                           align="center">
          </el-table-column>
          <!-- <el-table-column prop="rate"
                           label="成本费率"
                           width="150"
                           align="center">
          </el-table-column> -->
          <!--0未支付,1支付成功,2支付失败,3支付中,-->
          <el-table-column prop="status"
                           label="处理状态"
                           width="120"
                           align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status=='0'"
                      type="info">未处理</el-tag>
              <el-tag v-else-if="scope.row.status =='1'"
                      type="success">退款成功</el-tag>
              <el-tag v-else-if="scope.row.status =='2'"
                      type="warning">退款失败</el-tag>

            </template>
          </el-table-column>
          <el-table-column prop="createTime"
                           label="创建时间"
                           align="center"
                           width="150">
          </el-table-column>

          <el-table-column prop="remark"
                           label="备注"
                           align="center"
                           width="150">
          </el-table-column>

          <el-table-column label="操作"
                           align="center"
                           width='150'>
            <template slot-scope="scope">
              <el-button type="primary"
                         size="mini"
                         @click="refund(scope.row)"
                         v-if="scope.row.status == 0">
                确认退款
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </div>

    <div class="CM_content_foot">
      <div class="block">
        <paging :pagingData="pagingData"
                v-on:pagingData="pagingFun"></paging>
      </div>
    </div>
  </div>
</template>

<script>
import { formatMoney } from '@/filters'
import paging from '@/components/paging'
import cookies from '../../utils/auth'
export default {
  components: {
    paging
  },
  data () {
    return {
      account: '',
      orderNo: '',
      startTime: '',
      endTime: '',
      status: '',
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      period: '',
      formLabelWidth: '30%',
      options: [
        {
          label: '未处理',
          value: '0'
        },
        {
          label: '退款成功',
          value: '1'
        },
        {
          label: '退款失败',
          value: '2'
        },

      ],
      form: {
        orderNo: '',
        startTime: '',
        endTime: '',
        status: ''
      },
      pagingData: {
        currentPage4: 1, // 当前页数，支持 .sync 修饰符
        pageSize: 20, // 每页显示条目个数，支持 .sync 修饰符
        pageSizes: [10, 20, 50, 100], // 每页显示个数选择器的选项设置
        total: 400 // 总条目数
      }
    }
  },
  created () {
    this.getData()

  },
  methods: {

    getData () {
      const orderNo = this.orderNo
      const account = this.account
      const startTime = this.startTime
      const endTime = this.endTime
      const status = this.status
      const pageNum = this.pagingData.currentPage4
      const pageSize = this.pagingData.pageSize
      this.$itemApi.refundOrderList(status, account, orderNo, startTime, endTime, pageNum, pageSize).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list.map(v => {
            v.amount = formatMoney(v.amount)
            return v
          })
          this.pagingData.total = res.data.total
        } else {
          this.$message({
            message: res.message,
            type: 'error'

          })
        }
      })
    },
    refund (v) {
      let that = this
      let { id, orderNo, agentId } = v

      this.$confirm('确定退款？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        that.$itemApi.refundOrder(id, orderNo, agentId,).then(res => {
          if (res.code == 200) {
            that.$message({
              message: res.message,
              type: 'success'
            })
            setTimeout(() => {
              that.getData()
              that.dialogVisible = false
            }, 2000);
          } else {
            that.$message({
              message: res.message,
              type: 'errer'
            })
          }
        })
      }).catch(() => {

      });
    },
    getPeriod (e) {
      if (!e) {
        this.startTime = ''
        this.endTime = ''
        return
      }
      let startDate = new Date(e[0])
      let endDate = new Date(e[1])
      let startYear = startDate.getFullYear()
      let startMonth = startDate.getMonth() + 1
      let startDay = startDate.getDate()
      startMonth = startMonth < 10 ? '0' + startMonth : startMonth
      startDay = startDay < 10 ? '0' + startDay : startDay
      let startTime = startYear + '-' + startMonth + '-' + startDay + ' ' + '00:00:00'

      let endYear = endDate.getFullYear()
      let endMonth = endDate.getMonth() + 1
      let endDay = endDate.getDate()
      endMonth = endMonth < 10 ? '0' + endMonth : endMonth
      endDay = endDay < 10 ? '0' + endDay : endDay
      let endTime = endYear + '-' + endMonth + '-' + endDay + ' ' + '59:59:59'
      this.startTime = startTime
      this.endTime = endTime

    },
    exportExcel () {
      const account = this.account
      const orderNo = this.orderNo
      const startTime = this.startTime
      const orderNum = ''
      const endTime = this.endTime
      const status = this.status

      if (!startTime || !endTime) {
        this.$message({
          message: '请选择导出时间段',
          type: 'error'
        })
        return
      }
      let start_date = new Date(startTime)
      let timestamp1 = start_date.getTime()
      let end_date = new Date(endTime)
      let timestamp2 = end_date.getTime()
      if (timestamp2 - timestamp1 > (60000 * 60 * 24 * 31)) {
        this.$message({
          message: '导出时间段最长为31天',
          type: 'error'
        })
        return
      }


      let token = cookies.getToken()
      let url = 'https://www.tzgkczp.com/admin/admin/exportOrder?token=' + token + '&type=' + '2' + '&account=' + account + '&orderNo=' + orderNo + '&orderNum=' + orderNum + '&startTime=' + startTime + '&endTime=' + endTime + '&status=' + status
      window.location.href = url
    },
    getTime (e, type) {
      var date = new Date(e)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()

      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      // var nowTime = date.toLocaleTimeString()

      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      const newTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      // console.log(month,newTime,'eee')
      if (type == 1) {
        this.startTime = newTime
      } else if (type == 2) {
        this.endTime = newTime
      } else if (type == 3) {
      }
    },
    grabble () {
      console.log('this.', this.status)
      this.getData()
    },
    pagingFun (data) {
      // 分页事件
      this.pagingData = data
      this.getData()
    }
  }

}
</script>

<style lang='scss' scoped>
</style>