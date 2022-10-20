<template>
  <div>
    <div class="header"
         style='margin-bottom:20px;'>

      <el-form :model="form"
               ref="form">
        <el-row type="flex"
                class="row-bg">
          <el-col :sm="6">
            <el-form-item label="代理商名称:"
                          prop="name">
              <el-input v-model="form.name"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        :maxLength="50"
                        placeholder="代理商名称"
                        size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8">
            <el-form-item label="状态:"
                          prop="status">
              <el-select v-model="form.status"
                         clearable
                         placeholder="是否可用"
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
                  :offset="5">
            <el-button class=""
                       type="primary"
                       size="small"
                       icon="el-icon-search"
                       @click='getData'> 查询 </el-button>
          </el-col>
          <el-col :sm="2"
                  :offset="1">
            <el-button class=""
                       type="warning"
                       size="small"
                       icon="el-icon-plus"
                       @click='addAgent'>新增商户</el-button>
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
          <el-table-column prop="name"
                           label="代理商名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="account"
                           label='商户号'
                           align="center">
          </el-table-column>
          <el-table-column prop="md5Str"
                           label='密钥'
                           align="center">
          </el-table-column>
          <el-table-column prop="status"
                           label="是否可用"
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
          <el-table-column label='操作'
                           align="center">
            <template slot-scope="scope">
              <el-button size='mini'
                         type="primary"
                         @click='check(scope.row)'>通道详情</el-button>
              <el-button size='mini'
                         type="danger"
                         @click='checkStatus(scope.row)'>更改状态</el-button>
              <el-button size='mini'
                         type="warning"
                         @click='checkAgentLimit(scope.row)'>限额</el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </div>
    <template>
      <el-dialog title="通道详情"
                 :visible.sync="dialogVisible"
                 width="70%">
        <template>
          <el-table :data="agentDetails"
                    border
                    stripe
                    style="width: 100%"
                    id="TQ_table">
            <el-table-column prop="channelName"
                             label="通道名称"
                             align="center">
            </el-table-column>
            <el-table-column prop="key1"
                             label='key'
                             width='150'
                             align="center">
            </el-table-column>
            <el-table-column prop="channelRate"
                             label='通道费率'
                             width='80'
                             align="center">
            </el-table-column>
            <el-table-column prop="channelFee"
                             label='额外费用(分)'
                             align="center">
            </el-table-column>
            <el-table-column prop="extraRate"
                             label='额外费率'
                             align="center">
            </el-table-column>
            <el-table-column prop="rate"
                             label='代理商费率'
                             align="center">
            </el-table-column>
            <el-table-column prop="fee"
                             label='代理商代付费'
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

              </template>
            </el-table-column>
            <el-table-column prop="createTime"
                             label='创建时间'
                             width="150"
                             align="center">
            </el-table-column>
            <el-table-column prop=""
                             label='操作'
                             width="100"
                             align="center">
              <template slot-scope="scope">
                <el-button size='mini'
                           type="primary"
                           @click='updateChannel(scope.row)'>修改通道</el-button>
              </template>
            </el-table-column>
          </el-table>

        </template>
        <template>
          <el-collapse v-model="activeName"
                       accordion>
            <el-collapse-item name="1">
              <template slot="title">
                <el-button class=""
                           type="succes"
                           size="mini"
                           icon="el-icon-search"> 通道查询 </el-button>
              </template>
              <el-form ref='form4'
                       :model='addChannelForm'>
                <el-form-item label="通道key值查询：">
                  <el-input v-model="addChannelForm.key"
                            auto-complete="off"
                            clearable
                            class="input_440"
                            :maxLength="50"
                            placeholder="请输入通道key值"
                            size="small">
                    <el-button slot="append"
                               icon="el-icon-search"
                               @click='getKey'></el-button>
                  </el-input>
                </el-form-item>

              </el-form>
              <el-table :data="channelTable"
                        border
                        stripe
                        v-if='addChannelForm.key?true:false'
                        v-loading='channelTable_loading'
                        style="width: 100%"
                        id="TQ_table">

                <el-table-column prop='channelName'
                                 label="通道名称"
                                 align="center">
                </el-table-column>
                <el-table-column prop='key1'
                                 label="key"
                                 align="center">
                </el-table-column>
                <el-table-column prop='channelRate'
                                 label="通道费率"
                                 align="center">
                </el-table-column>
                <el-table-column prop='dayLimit'
                                 label="每日限额"
                                 align="center">
                </el-table-column>

              </el-table>
            </el-collapse-item>
            <el-collapse-item name="2"
                              class="collapse">
              <template slot="title">
                <el-button class=""
                           type="succes"
                           size="mini"
                           icon="el-icon-plus"> 通道配置</el-button>
              </template>
              <el-form ref='form4'
                       style="display:flex;flex-wrap:wrap;"
                       :model='addChannelForm'>
                <el-form-item label="oem成本费率："
                              label-width=''>
                  <el-input-number v-model="addChannelForm.rate"
                                   :min="0"
                                   :max="1"
                                   :precision="4"
                                   :step="0.0001"
                                   size='mini'
                                   label="oem成本费率%"></el-input-number>
                </el-form-item>
                <el-form-item label="支付额外费用（元）：">
                  <el-input-number v-model="addChannelForm.extraFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="支付额外费用(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="额外费率：">
                  <el-input-number v-model="addChannelForm.extraRate"
                                   :min="0"
                                   :max="1"
                                   :precision="4"
                                   :step="0.0001"
                                   size='mini'
                                   label="额外费率"></el-input-number>
                </el-form-item>
                <el-form-item label="oem成本代付费（元）：">
                  <el-input-number v-model="addChannelForm.fee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="oem成本代付费(元)"></el-input-number>
                </el-form-item>
                <el-form-item label=" 风控处理费（元）：">
                  <el-input-number v-model="addChannelForm.riskFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="风控处理费(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="保证金费率：">
                  <el-input-number v-model="addChannelForm.marginRate"
                                   :min="0"
                                   :max="1"
                                   size='mini'
                                   :precision="4"
                                   :step="0.0001"
                                   label="保证金费率"></el-input-number>
                </el-form-item>
                <el-form-item label="拒付罚金（元）：">
                  <el-input-number v-model="addChannelForm.refuseFee"
                                   :min="0"
                                   :max="99999999999"
                                   :precision="2"
                                   :step="0.01"
                                   size='mini'
                                   label="拒付罚金(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="退款处理费（元）：">
                  <el-input-number v-model="addChannelForm.refundFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="3d处理费（元）：">
                  <el-input-number v-model="addChannelForm.thirdFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="3d处理费(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="交易处理费（元）：">
                  <el-input-number v-model="addChannelForm.tradeFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   size='mini'
                                   label="交易处理费(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="通道类型：">
                  <el-select v-model="addChannelForm.cardType"
                             clearable
                             placeholder="通道类型"
                             size="small"
                             style="width: 200px">
                    <el-option v-for="item in options2"
                               :key="item.value"
                               :label="item.label"
                               :value="item.label"></el-option>
                  </el-select>
                </el-form-item>

                <el-button type="success"
                           style='margin-left:250px;'
                           @click='addChannel'> 添加通道</el-button>
              </el-form>

            </el-collapse-item>
            <el-collapse-item name="3"
                              :disabled='updateChannelTag'
                              class="collapse">
              <template slot="title">
                <el-button class=""
                           type="succes"
                           size="mini"
                           icon="el-icon-edit-outline"> 通道修改</el-button>
              </template>
              <h1>通道名称：{{updateChannelForm.channelName}}</h1>
              <el-form ref='form5'
                       style="display:flex;flex-wrap:wrap;"
                       :model='updateChannelForm'>
                <el-form-item label="oem成本费率："
                              label-width=''>
                  <el-input-number v-model="updateChannelForm.rate"
                                   :min="0"
                                   :max="1"
                                   :precision="4"
                                   :step="0.0001"
                                   size='mini'
                                   label="oem成本费率%"></el-input-number>
                </el-form-item>
                <el-form-item label="支付额外费用（元）：">
                  <el-input-number v-model="updateChannelForm.extraFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="支付额外费用(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="额外费率：">
                  <el-input-number v-model="updateChannelForm.extraRate"
                                   :min="0"
                                   :max="1"
                                   :precision="4"
                                   :step="0.0001"
                                   size='mini'
                                   label="额外费率"></el-input-number>
                </el-form-item>
                <el-form-item label="oem成本代付费（元）：">
                  <el-input-number v-model="updateChannelForm.fee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="oem成本代付费(元)"></el-input-number>
                </el-form-item>
                <el-form-item label=" 风控处理费（元）：">
                  <el-input-number v-model="updateChannelForm.riskFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="风控处理费(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="保证金费率：">
                  <el-input-number v-model="updateChannelForm.marginRate"
                                   :min="0"
                                   :max="1"
                                   size='mini'
                                   :precision="4"
                                   :step="0.0001"
                                   label="保证金费率"></el-input-number>
                </el-form-item>
                <el-form-item label="拒付罚金（元）：">
                  <el-input-number v-model="updateChannelForm.refuseFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="拒付罚金(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="退款处理费（元）：">
                  <el-input-number v-model="updateChannelForm.refundFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="3d处理费（元）：">
                  <el-input-number v-model="updateChannelForm.thirdFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="3d处理费(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="交易处理费（元）：">
                  <el-input-number v-model="updateChannelForm.tradeFee"
                                   :min="0"
                                   :max="99999999999"
                                   :step="0.01"
                                   :precision="2"
                                   size='mini'
                                   label="交易处理费(元)"></el-input-number>
                </el-form-item>
                <el-form-item label="通道类型：">
                  <el-select v-model="updateChannelForm.cardType"
                             clearable
                             placeholder="通道类型"
                             size="small"
                             style="width: 200px">
                    <el-option v-for="item in options3"
                               :key="item.value"
                               :label="item.label"
                               :value="item.label"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="通道状态：">
                  <el-switch v-model="updateChannelForm.channelStatus"
                             @change="getChannelStatus"
                             inactive-text="不可用"
                             active-text="可用"
                             active-color="#13ce66"
                             inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
                <el-button type="success"
                           style='margin-left:250px;'
                           @click='updateChannelSubmit'> 修改通道</el-button>
              </el-form>

            </el-collapse-item>
          </el-collapse>

        </template>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </template>
    <template>
      <el-dialog title="代理商状态变更"
                 :visible.sync="dialogVisible2"
                 width="30%">
        <template>
          <el-form ref='form3'
                   :model='agentStatusForm'>
            <el-form-item label="状态："
                          label-width='10%'>
              <el-switch v-model="agentStatusForm.agentStatus"
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
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary"
                     @click="updateAgent">确 定</el-button>
        </span>
      </el-dialog>
    </template>
    <template>
      <el-dialog title="代理商状态变更"
                 :visible.sync="dialogVisible4"
                 width="30%">
        <template>
          <el-form ref='form4'
                   :model='agentLimitForm'>
            <el-form-item label="每日限额(分)">
              <el-input v-model="agentLimitForm.dayLimit"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        :maxLength="50"
                        placeholder="每日限额"
                        size="small"></el-input>
              <el-tag>-1 表示无限额度</el-tag>
            </el-form-item>
            <el-form-item label="单笔限额(分)">
              <el-input v-model="agentLimitForm.singleLimit"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        :maxLength="50"
                        placeholder="单笔限额"
                        size="small"></el-input>
              <el-tag>-1 表示无限额度</el-tag>
            </el-form-item>

            <el-form-item label="当前已用额度(分)">
              <el-input v-model="agentLimitForm.currentLimit"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        disabled
                        :maxLength="50"
                        placeholder="当前已用额度"
                        size="small"></el-input>
            </el-form-item>
          </el-form>

        </template>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible4 = false">取 消</el-button>
          <el-button type="primary"
                     @click="updAgentLimit">确 定</el-button>
        </span>
      </el-dialog>
    </template>
    <template>
      <el-dialog title="添加商户"
                 :visible.sync="dialogVisible3"
                 width="40%">
        <template>
          <el-form ref='form5'
                   :model='addAgentFrom'>
            <el-form-item label="商户名称"
                          label-width='10%'>
              <el-input v-model="addAgentFrom.name"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        :maxLength="50"
                        placeholder="商户名称"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="商户号"
                          label-width='10%'>
              <el-input v-model="addAgentFrom.account"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        :maxLength="50"
                        placeholder="商户号"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="商户密码"
                          label-width='10%'>
              <el-input v-model="addAgentFrom.password"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        :maxLength="50"
                        placeholder="商户密码"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="商户密钥"
                          label-width='10%'>
              <el-input v-model="addAgentFrom.md5Str"
                        auto-complete="off"
                        clearable
                        class="input_440"
                        :maxLength="50"
                        placeholder="商户密钥"
                        size="small"></el-input>
            </el-form-item>
          </el-form>

        </template>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary"
                     @click="addAgentSubmit">确 定</el-button>
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
      options2: [
        {
          value: 0,
          label: 'ALL'
        },
        {
          value: 1,
          label: 'VISA'
        },
        {
          value: 2,
          label: 'MASTERCARD'
        },
        {
          value: 3,
          label: 'JCB'
        }

      ],
      options3: [
        {
          value: 0,
          label: 'ALL'
        },
        {
          value: 1,
          label: 'VISA'
        },
        {
          value: 2,
          label: 'MASTERCARD'
        },
        {
          value: 3,
          label: 'JCB'
        }

      ],
      tableData: [],
      pagingData: {
        currentPage4: 1, // 当前页数，支持 .sync 修饰符
        pageSize: 20, // 每页显示条目个数，支持 .sync 修饰符
        pageSizes: [10, 20, 50, 100], // 每页显示个数选择器的选项设置
        total: 400 // 总条目数
      },
      agentDetails: [],
      dialogVisible: false,
      dialogVisible2: false,
      agentStatusForm: {
        agentStatus: '',

      },
      activeName: '',
      addChannelForm: {
        key: '',
        rate: 0.00,
        extraFee: 0,
        extraRate: 0,
        fee: 0,
        cardType: '',
        tradeFee: 0,
        thirdFee: 0,
        refundFee: 0,
        refuseFee: 0,
        marginRate: 0,
        riskFee: 0,
      },
      updateChannelForm: {
        key: '',
        rate: 0.00,
        extraFee: 0,
        extraRate: 0,
        fee: 0,
        cardType: '',
        status: '',
        channelStatus: '',
        tradeFee: 0,
        thirdFee: 0,
        refundFee: 0,
        refuseFee: 0,
        marginRate: 0,
        riskFee: 0,
      },
      addAgentFrom: {
        name: '',
        account: '',
        password: '',
        md5Str: ''

      },
      agentLimitForm: {},
      channelTable_loading: false,
      dialog_channelTable: false,
      channelTable: [],
      updateChannelTag: true,
      dialogVisible3: false,
      dialogVisible4: false,




    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const status = this.form.status
      const name = this.form.name
      const pageNum = this.pagingData.currentPage4
      const pageSize = this.pagingData.pageSize
      this.$itemApi.agentList(status, name, pageNum, pageSize).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list.map(v => {
            return v
          })
          this.pagingData.total = res.data.total
        } else {
          this.$message({
            message: res.message,
            type: 'errer'
          })
        }
      })
    },
    addAgent () {
      this.dialogVisible3 = true
    },
    addAgentSubmit () {
      let that = this
      let { name, account, password, md5Str } = this.addAgentFrom
      if (!name || !account || !password || !md5Str) {
        that.$message({
          message: '请填写完整内容！',
          type: 'error'
        })
        return
      }

      this.$itemApi.addAgent(name, account, password, md5Str).then(res => {
        if (res.code == 200) {
          that.$message({
            message: res.message,
            type: 'success'
          })
          setTimeout(() => {
            that.getData()
            that.dialogVisible3 = false
          }, 2000);
        } else {
          that.$message({
            message: res.message,
            type: 'errer'
          })
        }
      })
    },
    getKey (e) {
      let key = this.addChannelForm.key.trim()
      let channelTable = []
      this.channelTable_loading = true
      this.$itemApi.channelByKey(key).then(res => {
        res.data.dayLimit = formatMoney(res.data.dayLimit)
        channelTable.push(res.data)
        this.addChannelForm.channelId = res.data.id
        this.channelTable = channelTable
        this.channelTable_loading = false
      })
    },
    // 添加通道
    addChannel () {
      let { agentId, channelId, extraFee, extraRate, fee, rate, cardType, tradeFee, thirdFee, refundFee, refuseFee, marginRate, riskFee } = this.addChannelForm
      extraFee = (Number(extraFee) * 100).toFixed(0)
      fee = (Number(fee) * 100).toFixed(0)
      riskFee = (Number(riskFee) * 100).toFixed(0)
      refuseFee = (Number(refuseFee) * 100).toFixed(0)
      refundFee = (Number(refundFee) * 100).toFixed(0)
      thirdFee = (Number(thirdFee) * 100).toFixed(0)
      tradeFee = (Number(tradeFee) * 100).toFixed(0)
      let id = ''
      let that = this
      console.log('addChannelForm', this.addChannelForm)

      if (!cardType) {
        that.$message({
          message: '请选择通道类型',
          type: 'error'
        })
        return
      }

      this.$confirm('确定添加此通道？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        that.$itemApi.addAgentChannel(agentId, channelId, id, rate, extraFee, extraRate, fee, 1, cardType, tradeFee, thirdFee, refundFee, refuseFee, marginRate, riskFee).then(res => {
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
    // 修改通道按钮
    updateChannel (e) {
      this.updateChannelTag = false
      this.activeName = '3'
      this.updateChannelForm = e
      this.updateChannelForm.channelStatus = this.updateChannelForm.status == 1 ? true : false
      // console.log('updateChannelTag', this.updateChannelForm)
      this.updateChannelForm.extraFee = (Number(e.extraFee) / 100).toFixed(2)
      this.updateChannelForm.fee = (Number(e.fee) / 100).toFixed(2)
      this.updateChannelForm.riskFee = (Number(e.riskFee) / 100).toFixed(2)
      this.updateChannelForm.refuseFee = (Number(e.refuseFee) / 100).toFixed(2)
      this.updateChannelForm.refundFee = (Number(e.refundFee) / 100).toFixed(2)
      this.updateChannelForm.thirdFee = (Number(e.thirdFee) / 100).toFixed(2)
      this.updateChannelForm.tradeFee = (Number(e.tradeFee) / 100).toFixed(2)

    },
    // 修改通道上传
    updateChannelSubmit () {
      let { agentId } = this.addChannelForm
      let channelId = ''
      let { id, extraFee, extraRate, fee, rate, cardType, tradeFee, thirdFee, refundFee, refuseFee, marginRate, riskFee } = this.updateChannelForm
      let status = this.updateChannelForm.channelStatus == true ? 1 : 0
      console.log('this.updateChannelForm', this.updateChannelForm.channelStatus, status)
      let that = this
      if (!cardType) {
        that.$message({
          message: '请选择通道类型',
          type: 'error'
        })
        return
      }
      console.log('extraFee', extraFee)
      extraFee = (Number(extraFee) * 100).toFixed(0)
      fee = (Number(fee) * 100).toFixed(0)
      riskFee = (Number(riskFee) * 100).toFixed(0)
      refuseFee = (Number(refuseFee) * 100).toFixed(0)
      refundFee = (Number(refundFee) * 100).toFixed(0)
      thirdFee = (Number(thirdFee) * 100).toFixed(0)
      tradeFee = (Number(tradeFee) * 100).toFixed(0)
      this.$confirm('确定修改此通道？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {

        that.$itemApi.addAgentChannel(agentId, channelId, id, rate, extraFee, extraRate, fee, status, cardType, tradeFee, thirdFee, refundFee, refuseFee, marginRate, riskFee).then(res => {
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
    // 通道详情
    check (v) {
      this.activeName = ''
      this.addChannelForm = {
        key: '',
        rate: 0.00,
        extraFee: 0,
        extraRate: 0,
        fee: 0,
        tradeFee: 0,
        thirdFee: 0,
        refundFee: 0,
        refuseFee: 0,
        marginRate: 0,
        riskFee: 0,
      }
      this.updateChannelForm = {
        key: '',
        rate: 0.00,
        extraFee: 0,
        extraRate: 0,
        fee: 0,
        cardType: '',
        status: '',
        channelStatus: '',
        tradeFee: 0,
        thirdFee: 0,
        refundFee: 0,
        refuseFee: 0,
        marginRate: 0,
        riskFee: 0,
      },
        this.dialogChannel = ''
      let agentId = v.id
      this.addChannelForm.agentId = v.id
      this.dialogVisible = true
      this.$loading()
      this.$itemApi.agentChannelDetail(agentId).then(res => {
        this.$loading().close()
        if (res.code == 200) {
          this.agentDetails = res.data
          // this.dialogVisible = true
          console.log('resssss', this.agentDetails)
        } else {
          this.$message({
            message: res.message,
            type: 'errer'
          })
        }
      }).catch(err => {
        this.$message({
          message: res.message,
          type: 'errer'
        })
      })


    },
    checkStatus (v) {

      this.agentStatusForm = v
      this.agentStatusForm.agentStatus = v.status == 0 ? false : true
      this.dialogVisible2 = true
    },
    checkAgentLimit (v) {
      console.log('checkAgentLimit', v)
      let agentId = v.id
      this.getAgentLimit(agentId)

    },
    getAgentLimit (agentId,) {
      this.$loading()
      let that = this

      this.$itemApi.agentLimit(agentId,).then(res => {
        this.$loading().close()

        if (res.code == 200) {
          console.log('agentLimit', res.data)

          if (!res.data) {
            this.$message({
              message: "该商户暂未开始交易",
              type: 'warning'
            })
            return
          }
          that.dialogVisible4 = true
          this.agentLimitForm = res.data
        } else {
          this.$message({
            message: res.message,
            type: 'errer'
          })
        }
      }).catch(err => {
        this.$message({
          message: err.message,
          type: 'errer'
        })
      })

    },
    updAgentLimit () {
      let { agentId, dayLimit, singleLimit } = this.agentLimitForm
      this.$loading()
      let that = this
      this.$itemApi.updAgentLimit(agentId, dayLimit, singleLimit).then(res => {
        this.$loading().close()
        that.dialogVisible4 = false
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })

          setTimeout(() => {
            that.getData()

          }, 2000);
        } else {
          this.$message({
            message: res.message,
            type: 'errer'
          })
        }
      }).catch(err => {
        this.$message({
          message: err.message,
          type: 'errer'
        })
      })
    },
    getStatus (e) {
      this.$forceUpdate()
    },
    getChannelStatus () {
      this.$forceUpdate()
    },
    updateAgent () {
      let status = this.agentStatusForm.agentStatus ? 1 : 0
      let account = this.agentStatusForm.account
      console.log('status', status, account)
      this.$loading()
      let that = this
      this.$itemApi.updateAgent(status, account).then(res => {
        this.$loading().close()
        that.dialogVisible2 = false
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })

          setTimeout(() => {
            that.getData()

          }, 2000);
        } else {
          this.$message({
            message: res.message,
            type: 'errer'
          })
        }
      }).catch(err => {
        this.$message({
          message: err.message,
          type: 'errer'
        })
      })
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
.collapse {
  /deep/ .el-form-item__label {
    width: 220px;
    text-align: right;
  }
}
</style>