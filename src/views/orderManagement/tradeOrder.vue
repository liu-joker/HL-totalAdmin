<template>
  <div class="order">
    <div class="header">
      <el-row type="flex"
              class="row-bg"
              justify="space-between">
        <el-form :model="form"
                 ref="form">
          <el-col :sm="5"
                  class="select_inp">
            <el-input v-model="account"
                      :maxLength="50"
                      size="small"
                      placeholder="商户号"></el-input>
          </el-col>
          <el-col :sm="5"
                  :offset="1"
                  class="select_inp">
            <el-input v-model="orderNo"
                      :maxLength="50"
                      size="small"
                      placeholder="商户订单号"></el-input>
          </el-col>
          <el-col :sm="5"
                  :offset="1"
                  class="select_inp">
            <el-input v-model="orderNum"
                      :maxLength="50"
                      size="small"
                      placeholder="平台订单号"></el-input>
          </el-col>

          <el-col :sm="5"
                  :offset="1"
                  class="select_inp">
            <el-select v-model="status"
                       clearable
                       placeholder="订单状态"
                       size="small">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>

          <el-col :sm="10"
                  style='margin-top:20px;'
                  class="select_inp">
            <!-- <el-form-item label=""
                          prop=""
                          size="small">
              <el-date-picker v-model="startTime"
                              type="datetime"
                              @change="getTime($event,1)"
                              placeholder="选择开始日期">
              </el-date-picker>
            </el-form-item> -->
            <el-date-picker v-model="period"
                            type="daterange"
                            @change="getPeriod($event)"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>

          </el-col>
          <!-- <el-col :sm="5"
                  style='margin-top:20px;'
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

      </el-row>
      <el-row style="margin:20px 0;">
        <el-col :sm="2">
          <el-button class=""
                     type="primary"
                     size="small"
                     icon="el-icon-search"
                     @click="grabble">搜索</el-button>

        </el-col>
        <el-col :sm="1"
                :offset='1'>
          <el-button class=""
                     type="info"
                     size="small"
                     icon="el-icon-download"
                     @click="exportExcel(1)">旧版导出</el-button>
        </el-col>
        <el-col :sm="1"
                :offset='2'>
          <el-button class=""
                     type="warning"
                     size="small"
                     icon="el-icon-download"
                     @click="exportExcel(2)">新版导出</el-button>
        </el-col>

        <el-col :sm="4"
                :offset='2'>
          <!-- <el-button class=""
                     type="success"
                     size="small"
                     icon="el-icon-upload2"
                     @click="dialogVisible=true">上传拒付订单</el-button> -->
          <el-upload class="upload-demo"
                     action="https://www.tzgkczp.com/admin/order/uploadRefuseOrder"
                     multiple
                     :limit="1"
                     :on-success="up_success"
                     :file-list="fileList"
                     :on-change="handleChange"
                     accept=".txt,.TXT">
            <el-button size="small"
                       type="primary">点击上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传txt文件</div>
          </el-upload>

        </el-col>

      </el-row>
    </div>

    <div style="margin:20px">
      <el-collapse v-model="activeNames"
                   class="collapse_row">
        <el-collapse-item title="隐藏单元格"
                          class="collapse_item"
                          name="1">
          <template slot="title">
            <el-button class=""
                       style="margin:20px"
                       type="success"
                       size="small"
                       icon="el-icon-s-operation">隐藏单元格</el-button>
          </template>
          <div style="padding:10px 20px;"
               class="draw_table">
            <span>
              商户名称：<el-switch v-model="nameFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              商户号：<el-switch v-model="accountFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              商户订单号：<el-switch v-model="orderNoFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              平台订单号：<el-switch v-model="orderNumFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              币种：<el-switch v-model="currencyFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              金额：<el-switch v-model="amountFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              本地金额：<el-switch v-model="localAmountFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              成本费率：<el-switch v-model="rateFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              额外费用：<el-switch v-model="extraFeeFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              卡号：<el-switch v-model="cardNoFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              状态<el-switch v-model="statusFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
            <span>
              备注<el-switch v-model="remarkFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>

            <span>
              创建时间<el-switch v-model="createTimeFlag"
                         style="margin:0 20px;"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </span>
          </div>

        </el-collapse-item>

      </el-collapse>
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
                           v-if="nameFlag"
                           label="商户名称"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="account"
                           v-if="accountFlag"
                           label="商户号"
                           width=""
                           align="center">
          </el-table-column>

          <el-table-column prop="orderNo"
                           v-if="orderNoFlag"
                           label="商户订单号"
                           width=""
                           align="center">
          </el-table-column>

          <el-table-column prop="orderNum"
                           v-if="orderNumFlag"
                           label="平台订单号"
                           width=""
                           align="center">
          </el-table-column>

          <el-table-column prop="currency"
                           v-if="currencyFlag"
                           label="币种"
                           width=""
                           align="center">

          </el-table-column>

          <el-table-column prop="amount"
                           v-if="amountFlag"
                           label="金额"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="localAmount"
                           v-if="localAmountFlag"
                           label="本地金额（CNY）"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="rate"
                           v-if="rateFlag"
                           label="成本费率"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="extraFee"
                           v-if="extraFeeFlag"
                           label="额外费用"
                           width=""
                           align="center">
          </el-table-column>
          <el-table-column prop="cardNo"
                           v-if="cardNoFlag"
                           label="卡号"
                           width=""
                           align="center">
          </el-table-column>
          <!--0未支付,1支付成功,2支付失败,3支付中,-->
          <el-table-column prop="status"
                           v-if="statusFlag"
                           label="订单状态"
                           width=""
                           align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status=='0'"
                      type="info">未成功</el-tag>
              <el-tag v-else-if="scope.row.status =='1'"
                      type="success">支付成功</el-tag>
              <el-tag v-else-if="scope.row.status =='2'"
                      type="warning">支付失败</el-tag>
              <el-tag v-else-if="scope.row.status =='3'"
                      type="danger">支付中</el-tag>
              <el-tag v-else-if="scope.row.status =='4'"
                      type="success">退款成功</el-tag>
              <el-tag v-else-if="scope.row.status =='5'"
                      type="danger">退款处理中</el-tag>
              <el-tag v-else-if="scope.row.status =='6'"
                      type="success">拒付</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="remark"
                           v-if="remarkFlag"
                           label="备注"
                           align="center"
                           width="">

          </el-table-column>

          <el-table-column prop="createTime"
                           v-if="createTimeFlag"
                           label="创建时间"
                           align="center"
                           width="">
          </el-table-column>

          <!-- <el-table-column label="操作"
                           align="center"
                           width='150'>
            <template slot-scope="scope">
            <el-button type="primary"
                         size="mini"
                         @click="refund(scope.row)"
                         v-if="scope.row.status == 1">
                退款
              </el-button>           
            </template>
          </el-table-column> -->

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
      fileList: [],
      file: '',
      nameFlag: true,
      accountFlag: true,
      orderNoFlag: true,
      orderNumFlag: true,
      currencyFlag: true,
      amountFlag: true,
      rateFlag: true,
      extraFeeFlag: true,
      localAmountFlag: true,
      extraFeeFlag: true,
      cardNoFlag: true,
      statusFlag: true,
      remarkFlag: true,
      createTimeFlag: true,
      activeNames: 1,
      account: '',
      orderNo: '',
      orderNum: '',
      startTime: '',
      endTime: '',
      status: '',
      period: '',
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      formLabelWidth: '30%',
      options: [
        {
          label: '未支付',
          value: '0'
        },
        {
          label: '支付成功',
          value: '1'
        },
        {
          label: '支付失败',
          value: '2'
        },
        {
          label: '支付中',
          value: '3'
        },
        {
          label: '退款成功',
          value: '4'
        },
        {
          label: '退款处理中',
          value: '5'
        },
        {
          label: '支付并退款成功',
          value: '6'
        }
      ],
      form: {
        orderNo: '',
        startTime: '',
        endTime: '',
        status: '',
        account: ''
      },
      pagingData: {
        currentPage4: 1, // 当前页数，支持 .sync 修饰符
        pageSize: 20, // 每页显示条目个数，支持 .sync 修饰符
        pageSizes: [10, 20, 50, 100], // 每页显示个数选择器的选项设置
        total: 400 // 总条目数
      },
      dialogVisible: false
    }
  },
  created () {

    this.getData()
  },
  methods: {
    refund (item) {
      const orderNo = item.orderNo
      this.$loading()
      this.$itemApi.agtRefund(orderNo).then(res => {
        this.$loading().close()
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      }).catch(e => {
        this.$loading().close()
      })
    },
    handleChange (file, fileList) {



    },
    up_success (res, file) {


      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: 'success'
        })

      } else {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      }

    },
    submitUpload () {
      let file = this.file
      this.$itemApi.uploadRefuseOrder(file).then(res => {
        if (res.code == 200) {


        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    getData () {
      const account = this.account
      const orderNo = this.orderNo
      const orderNum = this.orderNum
      const startTime = this.startTime
      const endTime = this.endTime
      const status = this.status
      const pageNum = this.pagingData.currentPage4
      const pageSize = this.pagingData.pageSize
      this.$itemApi.getOrderList(account, orderNo, orderNum, startTime, endTime, status, pageNum, pageSize).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list.map(v => {
            v.amount = formatMoney(v.amount)
            v.extraFee = formatMoney(v.extraFee)
            v.localAmount = formatMoney(v.localAmount)
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
      let endTime = endYear + '-' + endMonth + '-' + endDay + ' ' + '23:59:59'
      this.startTime = startTime
      this.endTime = endTime

    },
    exportExcel (type) {
      const account = this.account
      const orderNo = this.orderNo
      const startTime = this.startTime
      const orderNum = this.orderNum
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
      if (type == 1) {
        let url = 'https://www.tzgkczp.com/admin/admin/exportOrder?token=' + token + '&account=' + account + '&orderNo=' + orderNo + '&orderNum=' + orderNum + '&startTime=' + startTime + '&endTime=' + endTime + '&status=' + status
        window.location.href = url
      } else if (type == 2) {
        let url = 'https://www.tzgkczp.com/admin/order/exportOrder?token=' + token + '&account=' + account + '&orderNo=' + orderNo + '&orderNum=' + orderNum + '&startTime=' + startTime + '&endTime=' + endTime + '&status=' + status
        window.location.href = url
      }

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
      if (type == 1) {
        this.startTime = newTime
      } else if (type == 2) {
        this.endTime = newTime
      } else if (type == 3) {
      }
    },
    grabble () {
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
.draw_table {
  > span {
    display: inline-block;
    height: 50px;
    width: 180px;
  }
}
.collapse_row {
  width: 1000px;
  /deep/ .el-icon-arrow-right {
    &:before {
      content: "";
    }
  }
  .collapse_item {
    /deep/ .el-collapse-item__header {
      background: #eff1f4 !important;
    }
  }
}
</style>