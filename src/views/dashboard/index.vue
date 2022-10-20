<template>
  <div class="dashboard-container app-container"
       v-loading="loading">

    <div class="panel">
      <el-row type="flex"
              class="panel_group"
              :gutter="40"
              justify="center">
        <el-col :xs="12"
                :sm="12"
                :lg="6">
          <div class="card_panel"
               :class="(BindClass==1)?'active':''"
               @click="tabType()">
            <div class="card_panel_icon card_panel_icon1">
              <svg-icon iconClass="form"></svg-icon>
            </div>
            <div class="card_panel_text">
              <label>总单量</label>
              <span>
                <count-to class="card-panel-num"
                          :startVal="0"
                          :endVal="headNum.count"
                          :duration="3200"></count-to>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :xs="12"
                :sm="12"
                :lg="6">
          <div class="card_panel"
               :class="(BindClass==2)?'active':''"
               @click="tabType()">
            <div class="card_panel_icon card_panel_icon2">
              <svg-icon iconClass="shouru"></svg-icon>
            </div>
            <div class="card_panel_text">
              <label>总金额</label>
              <span>
                <count-to class="card-panel-num"
                          :startVal="0"
                          :decimals="2"
                          :endVal="response.amount"
                          :duration="3200"></count-to>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :xs="12"
                :sm="12"
                :lg="6">
          <div class="card_panel"
               :class="(BindClass==3)?'active':''">
            <div class="card_panel_icon card_panel_icon3">
              <svg-icon iconClass="fenrun"></svg-icon>
            </div>
            <div class="card_panel_text">
              <label>额外费用</label>
              <span>
                <count-to class="card-panel-num"
                          :startVal="0"
                          :decimals="2"
                          :endVal="response.extraFee"
                          :duration="3200"></count-to>
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <div class="time-select">
        <el-row type="flex"
                class="row-bg"
                justify="start">

          <el-col :sm="18"
                  :md="15"
                  :lg="14"
                  :xl="12"
                  class="select_inp">
            <el-select v-model="brandIdSeletValue"
                       placeholder="OEM名称"
                       size="small"
                       style="width: 140px"
                       clearable
                       v-if="$store.getters.roleObj.R1">
              <el-option v-for="item in $store.getters.OEMlist"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>

            <el-radio-group v-model="dateRadio"
                            size="small"
                            @change="cleardateRadio(2)">
              <!-- <el-radio-button label=1>今天</el-radio-button> -->
              <el-radio-button label=1>近三十天</el-radio-button>
            </el-radio-group>
            <!-- <el-date-picker style="width: 120px"
                            v-model="startTime"
                            size="small"
                            format="yyyy-MM"
                            value-format="yyyy-MM"
                            type="month"
                            placeholder="开始月份"
                            :picker-options="pickerOptions0"
                            @change="cleardateRadio(3)"></el-date-picker>
            <el-date-picker style="width: 120px"
                            v-model="endTime"
                            size="small"
                            format="yyyy-MM"
                            value-format="yyyy-MM"
                            type="month"
                            placeholder="结束月份"
                            :picker-options="pickerOptions1"
                            @change="cleardateRadio(3)"></el-date-picker>
            <el-button class=""
                       type="primary"
                       size="small"
                       @click="grabble">搜索</el-button> -->
          </el-col>
        </el-row>
      </div>
      <div id="myChart"
           :style="{width: '100%', height: '500px'}"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dashboardApi from '@/api/dashboard'

import SvgIcon from "@/components/SvgIcon/index.vue";
import { formatMoney } from "@/filters"

// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')

require('echarts/lib/component/title')
import countTo from 'vue-count-to';

export default {
  components: { SvgIcon, countTo },
  //    name: 'Dashboard',
  data () {
    return {
      loading: false,
      dataType: 1,
      dateRadio: 1,
      BindClass: 1,
      startTime: '',
      endTime: '',
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < 1538323200000 || time.getTime() > Date.now() + 2592000000 - 8.64e6
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() + 2592000000 - 8.64e6 || time.getTime() < 1538323200000
        }
      },

      value6: '',
      brandIdSeletValue: '',
      engvalue: 99999,
      list: [{ title: '数据1', number: 2500 }, { title: '数据1', number: 2500 }],
      titlelist: "注册客户量：2500，实名客户量：2500，升级客户量：2500",
      type: 1,
      TimeList: [
        { value: 1, label: '时间/时' },
        { value: 2, label: '时间/日' },
        { value: 3, label: '时间/月' },
      ],
      DataList: [
        {
          value: 1,
          labelList: {
            userCount: '用户人数',
            realCount: '实名人数',
            upCount: '升级人数',
            userNum: '总人数',
            realNum: '总实名人数',
            upNum: '总升级人数'
          }
        },
        {
          value: 2,
          labelList: {
            txCount: '收款',
            planCount: '代还',
            upCount: '升级订单',
            txNum: '收款总额',
            planNum: '计划总额',
            upNum: '升级订单总额'
          }
        },
        { value: 3, labelList: {} },
      ],
      legendData: ["1", "2", "3"],
      hourlist: ['0', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      TimeTitle: '',
      Xdata: ['0', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      setiesList: [
        {
          name: '访问量',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          //smooth: true,
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          data: [],
          animationDuration: 1800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '实名客户量',
          //smooth: true,
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: [220, 182, 191, 234, 290, 330, 310],
          animationDuration: 1800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '升级客户量',
          //smooth: true,
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              color: '#E6A23C',
              lineStyle: {
                color: '#E6A23C',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: [120, 162, 181, 234, 260, 290, 250],
          animationDuration: 1800,
          animationEasing: 'quadraticOut'
        }],
      response: "",
      headNum: {
        userNum: 0,
        txCount: 0,
      },
      userNum: 0,
      txCount: 0,
      chartTitle: '用户统计图',
      xData: [],
      xData_r: [],
      xData_n: [],
      xData_t: [],
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),

  },
  created () {
    this.getData()
  },
  methods: {
    DataMap (timeList, value, dataType) {
      var NewDataList = timeList.map(x => {
        let t = value.find(v => {
          return v.time == x
        });
        var item = {
          count: 0,
          time: x
        }

        let data = t ? t.count : item.count
        if (dataType && dataType != 1) {
          data = formatMoney(data)
        }
        return data
      })
      return NewDataList
    },

    getData () {
      //获取数据

      // let timeType = this.dateRadio;
      // let dataType = this.dataType;
      // let startTime;
      // let endTime;
      // if (timeType == 3) {
      //   startTime = this.startTime;
      //   endTime = this.endTime;
      //   let startTime2 = startTime.replace(/-/g, '')
      //   let endTime2 = endTime.replace(/-/g, '')
      //   if (startTime2 > endTime2) {
      //     this.$message({
      //       type: 'warning',
      //       message: '起止时间不能大于结束时间！'
      //     })
      //     return
      //   }
      // }

      this.loading = true
      dashboardApi.getIndex().then(response => {
        this.response = response.data
        this.response.amount = ((this.response.amount / 100))
        this.response.extraFee = ((this.response.extraFee / 100))
        let lineChart = response.data.lineChart
        let xData = []
        let xData_t = []
        let xData_n = []
        let xData_r = []
        let xData_length = 0
        lineChart.map((v, index) => {
          if (v.status == 0) { return }
          let cur_time = (v.createTime.split('-'))[1] + '/' + (v.createTime.split('-'))[2]
          if (xData.length == 0 || xData[xData.length - 1] != cur_time) {
            xData.push(cur_time)
            xData_length = xData.length
            xData_t.push(0)
            xData_r.push(0)
            xData_n.push(0)
          }
          if (v.status == 1) {
            xData_t[xData_t.length - 1] = v.count
          } else if (v.status == 2) {
            xData_n[xData_n.length - 1] = v.count
          } else if (v.status == 4) {
            xData_r[xData_r.length - 1] = v.count
          }
        }),

          this.xData = xData
        this.xData_t = xData_t
        this.xData_n = xData_n
        this.xData_r = xData_r
        console.log('xData_t', this.xData_t, this.xData_n, this.xData_r, this.xData)
        this.drawLine()
        this.loading = false
      })
    },
    cleardateRadio (e) {
      //选择清除时间类型
      if (e == 3) {
        this.dateRadio = 3
        if (this.startTime == null && this.endTime == null) {
          this.dateRadio = 1
        }
      } else {
        this.startTime = ""
        this.endTime = ""
      }
    },

    grabble () {
      //搜索
      //  let endTime = this.endTime.replace(/-/g, '/')
      // this.getData()
    },
    drawLine () {
      //  console.log("画图开始")
      //  console.log(this.setiesList)
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        // title: { text: this.chartTitle, subtext: this.titlelist },
        tooltip: {
          trigger: 'axis',
          // showContent: false
          // axisPointer: {
          //   type: 'cross',
          //   label: {
          //     backgroundColor: '#6a7985'
          //   }
          // }
        },
        legend: {},
        dataset: {
          source: [
            ['product', ...this.xData],
            ['退款成功数', ...this.xData_r],
            ['失败数', ...this.xData_n],
            ['成功数', ...this.xData_t],

          ]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '0%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
          }
        ],
        yAxis: [
          {
            gridIndex: 0
          }
        ],
        series: [
          {
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
            type: 'line',
          },
          {
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
            type: 'line',
          },
          {
            type: 'line',
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },

        ],



      });


    }

  },
  mounted () {
    // this.getData()
    // this.drawLine()
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/variables.scss";

.dashboard {
  &-container {
    .panel {
      padding: 2rem 0;
      .panel_group {
        .card_panel {
          background: #fff;
          border-color: rgba(0, 0, 0, 0.05);
          box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
          color: #666;
          cursor: pointer;
          font-size: 12px;
          height: 108px;
          overflow: hidden;
          position: relative;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 26px 0 16px;
          &:hover .card_panel_icon1,
          &.active .card_panel_icon1 {
            background: $green;
            color: #ffffff;
          }
          &:hover .card_panel_icon2,
          &.active .card_panel_icon2 {
            background: $light-blue;
            color: #ffffff;
          }
          &:hover .card_panel_icon3,
          &.active .card_panel_icon3 {
            background: $red;
            color: #ffffff;
          }
          &_icon1 {
            color: $green;
          }
          &_icon2 {
            color: $light-blue;
          }
          &_icon3 {
            color: $red;
          }
          &_icon {
            font-size: 48px;
            padding: 16px;
            border-radius: 6px;
            padding: 16px;
            transition: all 0.38s ease-out;
          }
          &_text {
            display: flex;

            flex-direction: column;
            justify-content: center;
            label {
              font-size: 16px;
              color: rgba(0, 0, 0, 0.45);
            }
            span {
              font-weight: 600;
              line-height: 40px;
              color: #666666;
              font-size: 20px;
            }
          }
        }
      }
    }

    .content {
      background-color: #ffffff;
      padding: 1rem;
      .time-select {
        padding: 1.35rem 0;
        .row-bg {
          .select_inp {
            display: flex;
            align-items: center;
            > div {
              margin-right: 0.5rem;
            }
          }
        }
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
