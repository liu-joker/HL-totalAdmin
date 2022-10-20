<template>
  <div>
    <div class="header"
         style='margin-bottom:20px;'>

      <!-- <el-form :model="form"
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
      </el-form> -->
      <el-row>

        <el-col :sm="2"
                :offset="22">
          <el-button class=""
                     type="primary"
                     size="small"
                     icon="el-icon-search"
                     @click='addRule'> 添加规则 </el-button>
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

          <el-table-column prop="rule"
                           label="规则"
                           align="center">
          </el-table-column>

          <el-table-column prop="status"
                           label="状态"
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

          <el-table-column prop="createTime"
                           label='创建时间'
                           align="center">
          </el-table-column>

          <el-table-column prop=""
                           label='操作'
                           width='200'
                           align="center">
            <template slot-scope="scope">
              <el-button size='mini'
                         type="warning"
                         @click='updateRules(scope.row)'>更新规则</el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>

    </div>
    <template>
      <el-dialog title="添加规则"
                 :visible.sync="dialogVisible"
                 width="30%">
        <template>
          <el-form ref='form3'
                   :model='addRuleForm'>
            <el-form-item label="交易卡开头数字">
              <el-input v-model="addRuleForm.rule"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        :maxLength="50"
                        placeholder="当前已用额度"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="状态："
                          label-width='10%'>
              <el-switch v-model="addRuleForm.status"
                         @change="getStatus"
                         active-text="可用"
                         inactive-text="不可用"
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
                     @click="updateRule">确 定</el-button>
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
        name: '',
        rule: {}
      },
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
      addRuleForm: {
        rule: '',
        id: '',
        status: ''
      },
      pagingData: {
        currentPage4: 1, // 当前页数，支持 .sync 修饰符
        pageSize: 20, // 每页显示条目个数，支持 .sync 修饰符
        pageSizes: [10, 20, 50, 100], // 每页显示个数选择器的选项设置
        total: 400 // 总条目数
      },
      dialogVisible: false,
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const status = this.form.status
      const rule = this.form.rule

      this.$itemApi.blackRule(rule, status).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list.map(v => {
            v.rule = JSON.parse(v.rule).cardNo
            return v
          })

          this.pagingData.total = res.data.total
        }
      })
    },
    addRule () {
      this.dialogVisible = true
      this.addRuleForm = { id: '', rule: '', status: '' }
    },
    updateRules (v) {
      this.addRuleForm = JSON.parse(JSON.stringify(v))
      this.addRuleForm.status = v.status == 0 ? false : true
      this.dialogVisible = true
    },
    updateRule () {

      const status = this.addRuleForm.status ? 1 : 0
      const rule = this.addRuleForm.rule
      const id = this.addRuleForm.id
      const rules = JSON.stringify({ cardNo: rule })
      console.log("status", status, rules)
      let that = this
      this.$itemApi.updblackRule(id, rules, status).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogVisible = false
          setTimeout(() => {
            that.getData()
          }, 2000);
        } else {
          this.$message({
            message: res.message,
            type: 'errer'
          })
        }
      })
    },
    getStatus (e) {
      this.$forceUpdate()
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

<style>
</style>