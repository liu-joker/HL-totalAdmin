<template>
  <div>
    <div class="header"
         style='margin-bottom:20px;'>

      <!-- <el-form :model="form"
               ref="form">
        <el-row type="flex"
                class="row-bg">
          <el-col :sm="8">
            <el-form-item label="货币名称:"
                          prop="name">
              <el-input v-model="form.name"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        :maxLength="50"
                        size="small"></el-input>
            </el-form-item>
          </el-col>
    

        </el-row>
        <el-row>

      
          <el-col :sm="2"
                  :offset="16">
            <el-button class=""
                       type="info"
                       size="small"
                       icon="el-icon-refresh">重置</el-button>
          </el-col>
          <el-col :sm="2">
            <el-button class=""
                       type="primary"
                       size="small"
                       icon="el-icon-search"> 查询 </el-button>
          </el-col>
        </el-row>

      </el-form> -->

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

          <el-table-column prop="currency"
                           label="货币名称"
                           align="center">
          </el-table-column>

          <el-table-column prop="rate"
                           label='汇率'
                           align="center">
          </el-table-column>

          <el-table-column prop="createTime"
                           label="同步时间"
                           align="center">
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
import paging from '@/components/paging'
export default {
  components: {
    paging
  },
  data () {
    return {
      form: {},
      status: '',
      options: [
        {
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
      pagingData: {
        currentPage4: 1, // 当前页数，支持 .sync 修饰符
        pageSize: 20, // 每页显示条目个数，支持 .sync 修饰符
        pageSizes: [10, 20, 50, 100], // 每页显示个数选择器的选项设置
        total: 400 // 总条目数
      }
    }
  },
  methods: {
    getTime (e, type) {
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
    getData () {

      const pageNum = this.pagingData.currentPage4
      const pageSize = this.pagingData.pageSize
      this.$itemApi.exchangeList(pageNum, pageSize).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list.map(v => {
            // v.amount = formatMoney(v.amount)
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
    pagingFun (data) {
      // 分页事件
      this.pagingData = data
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style>
</style>