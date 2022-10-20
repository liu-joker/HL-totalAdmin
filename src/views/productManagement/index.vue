<template>
  <div class="managrment">
    <div class="header"
         style='margin-bottom:20px;'>

      <el-form :model="form"
               ref="form">
        <el-row type="flex"
                class="row-bg">
          <el-col :sm="6">
            <el-form-item label="通道名称:"
                          prop="name">
              <el-input v-model="form.name"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        :maxLength="50"
                        placeholder="通道名称"
                        size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="通道状态:"
                          prop="status">
              <el-select v-model="form.status"
                         clearable
                         placeholder="订单状态"
                         size="small"
                         style="width: 200px">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="2"
                  :offset="8">
            <el-button class=""
                       type="primary"
                       size="small"
                       icon="el-icon-search"
                       @click='getData'> 查询 </el-button>
          </el-col>
        </el-row>

      </el-form>

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

          <el-table-column prop="channelName"
                           label="通道名称"
                           align="center">
          </el-table-column>

          <el-table-column prop="channelTag"
                           label='通道标识'
                           align="center">
          </el-table-column>

          <el-table-column prop="channelRate"
                           label='通道费率'
                           align="center">
          </el-table-column>

          <el-table-column prop="channelFee"
                           label='额外费用'
                           align="center">
          </el-table-column>

          <el-table-column prop="status"
                           label="通道状态"
                           width="120"
                           align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status=='0'"
                      type="info">不可用</el-tag>
              <el-tag v-else-if="scope.row.status =='1'"
                      type="success">可用</el-tag>
              <!-- <el-tag v-else-if="scope.row.status =='2'" type="warning">未通过</el-tag> -->

            </template>
          </el-table-column>

          <el-table-column prop="key1"
                           label='key'
                           align="center">
          </el-table-column>
          <el-table-column prop="currentLimit"
                           label='当前已用额度(元)'
                           align="center">
          </el-table-column>
          <el-table-column prop="dayLimit"
                           label='每日限额(元)'
                           align="center">
          </el-table-column>
          <el-table-column prop="channelPriority"
                           label='通道优先级（数字越大，级别越高）'
                           align="center">
          </el-table-column>
          <el-table-column prop=""
                           label='操作'
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         size="mini"
                         @click="channelDetail(scope.row)">
                通道详情及修改
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </div>
    <!-- 通道详情 -->
    <template>
      <el-dialog title="通道详情及修改"
                 :visible.sync="dialogVisible"
                 width="70%">
        <template>
          <el-form ref='form2'
                   style="display:flex;flex-wrap:wrap;"
                   :model='form2'>
            <el-form-item label="通道名称："
                          style="width:50%;">
              <el-input v-model="form2.channelName"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="通道标识："
                          style="width:50%;">
              <el-input v-model="form2.channelTag"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>

            <el-form-item label="通道费率："
                          style="width:50%;">
              <el-input v-model="form2.channelRate"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="通道代付费(元)："
                          style="width:50%;">
              <el-input v-model="form2.channelFee"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="交易处理费(元）："
                          style="width:50%;">
              <el-input v-model="form2.tradeFee"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>

            </el-form-item>
            <el-form-item label="风控处理费(元)："
                          style="width:50%;">
              <el-input v-model="form2.riskFee"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="保证金费率(%)："
                          style="width:50%;">
              <el-input v-model="form2.marginRate"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="拒付罚金(元)："
                          style="width:50%;">
              <el-input v-model="form2.refuseFee"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="退款处理费(元)："
                          style="width:50%;">
              <el-input v-model="form2.refundFee"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="3d处理费(元)："
                          style="width:50%;">
              <el-input v-model="form2.thirdFee"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>

            <el-form-item label="通知地址："
                          style="width:50%;">
              <el-input v-model="form2.notifyUrl"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="返回地址："
                          style="width:50%;">
              <el-input v-model="form2.returnUrl"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="额外字段1："
                          style="width:50%;">
              <el-input v-model="form2.key1"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="额外字段2："
                          style="width:50%;">
              <el-input v-model="form2.key2"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="额外字段3："
                          style="width:50%;">
              <el-input v-model="form2.key3"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="额外字段4："
                          style="width:50%;">
              <el-input v-model="form2.key4"
                        auto-complete="off"
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="是否可用："
                          style="width:50%;">
              <el-switch v-model="form2.status"
                         style="margin:0 60px;"
                         active-text="可用"
                         inactive-text="不可用"
                         :active-value='1'
                         :inactive-value="0"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-form>

        </template>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="updateChannel">确 定</el-button>
        </span>
      </el-dialog>
    </template>
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
import paging from '../../components/paging'
export default {
  components: {
    paging,
  },
  data () {
    return {
      form: {
        status: '',
        name: ''
      },
      form2: {
        status: '',
        name: ''
      },
      dialogVisible: false,
      status: '',
      options: [
        {
          value: 0,
          label: '不可用'
        },
        {
          value: 1,
          label: '可用'
        }

      ],
      tableData: [],
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
    channelDetail (item) {
      let id = item.id
      this.$itemApi.channelDetail(id).then(res => {
        if (res.code === 200) {
          if (!res.data) {
            this.$message({
              message: '暂无数据',
              type: 'errer'
            })
            return
          }
          console.log('res', res.data)
          this.form2 = res.data
          this.form2.tradeFee = formatMoney(res.data.tradeFee)
          this.form2.channelFee = formatMoney(res.data.channelFee)
          this.form2.thirdFee = formatMoney(res.data.thirdFee)
          this.form2.refuseFee = formatMoney(res.data.refuseFee)
          this.form2.refundFee = formatMoney(res.data.refundFee)
          this.form2.riskFee = formatMoney(res.data.riskFee)
          this.dialogVisible = true
        } else {
          this.$message({
            message: res.message,
            type: 'errer'
          })
        }
      })
    },
    updateChannel () {
      let form2 = JSON.parse(JSON.stringify(this.form2))

      form2.tradeFee = (this.form2.tradeFee * 100).toFixed(0)
      form2.channelFee = (this.form2.channelFee * 100).toFixed(0)
      form2.thirdFee = (this.form2.thirdFee * 100).toFixed(0)
      form2.refuseFee = (this.form2.refuseFee * 100).toFixed(0)
      form2.refundFee = (this.form2.refundFee * 100).toFixed(0)
      form2.riskFee = (this.form2.riskFee * 100).toFixed(0)
      console.log('form2', form2)
      let { id, channelDay, channelFee, channelName, channelRate, channelTag, key1, key2, key3, key4, marginRate, notifyUrl, refundFee, refuseFee, returnUrl, riskFee, status, thirdFee, tradeFee, } = form2
      this.$itemApi.updateChannel(id, channelDay, channelFee, channelName, channelRate, channelTag, key1, key2, key3, key4, marginRate, notifyUrl, refundFee, refuseFee, returnUrl, riskFee, status, thirdFee, tradeFee,).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogVisible = false
        } else {
          this.$message({
            message: res.message,
            type: 'errer'
          })
        }
      })
    },
    getData () {
      const status = this.form.status
      const name = this.form.name
      const pageNum = this.pagingData.currentPage4
      const pageSize = this.pagingData.pageSize
      this.$itemApi.channelList(status, name, pageNum, pageSize).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list.map(v => {
            v.dayLimit = formatMoney(v.dayLimit)
            v.currentLimit = formatMoney(v.currentLimit)
            return v
          })
          this.pagingData.total = res.data.total
        }
      })
    },

    getTime (e, type) {
      var date = new Date(e)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()

      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      //   var nowTime = date.toLocaleTimeString()

      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      const newTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      console.log(month, newTime, 'eee')
      if (type === 1) {
        this.form.startDate = newTime
      } else if (type === 2) {
        this.form.endDate = newTime
      } else if (type === 3) {
        this.form.signDate = newTime
      }
    },
    pagingFun (data) {
      // 分页事件
      this.pagingData = data
      this.getData()
    }
  }
}
</script>

<style  lang='scss'>
.managrment {
  .el-form-item__label {
    min-width: 220px !important;
  }
}
</style>