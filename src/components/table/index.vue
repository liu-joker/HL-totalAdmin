<template>
  <el-table :data="tableDefault.tableData" :border="borderFun()" @selection-change="select"
            style="width: 100%">
    <template v-for="(x,index) in tableDefault.headData">
    <div v-if="x.show" :key='index'>
      <el-table-column type="selection"  :width="x.width" :align="x.align" v-if="x.type=='selection'">
      </el-table-column>

      <el-table-column type="index" :label="x.label" :width="x.width" :align="x.align" v-else-if="x.type=='index'">
      </el-table-column>

      <el-table-column :prop="x.props" :label="x.label" :width="x.width" :align="x.align" v-else-if="x.type=='string'">
      </el-table-column>

      <el-table-column :prop="x.props" :label="x.label" :width="x.width" :align="x.align" v-else-if="x.type=='html'">
        <template slot-scope="scope">
          <div v-html="scope.row[x.props]" :class="x.className"></div>
        </template>
      </el-table-column>

      <el-table-column :prop="x.props" :label="x.label" :width="x.width" :align="x.align" v-else-if="x.type=='img'">
        <template slot-scope="scope">
          <!--<img :src="scope.row[x.props]" :style="x.style?x.style:imgDefaultStyle" alt="">-->
          <el-image
            ref="elImg"
            :src="scope.row[x.props]"
            :preview-src-list="[scope.row[x.props]]"
            :style="x.style?x.style:imgDefaultStyle">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column :prop="x.props" :label="x.label" :width="x.width" :align="x.align" v-else-if="x.type=='remark'"
                       show-overflow-tooltip>
      </el-table-column>

      <el-table-column :prop="x.props" :label="x.label" :width="x.width" :align="x.align" v-else-if="x.type=='tag'">
        <template slot-scope="scope">
          <el-tag :type="Object(typeFun(scope.row, x)).type">{{Object(typeFun(scope.row, x)).label}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :prop="x.props" :label="x.label" :width="x.width" :align="x.align" v-else-if="x.type=='tagText'">
        <template slot-scope="scope">
          <span>{{Object(typeFun(scope.row, x)).label}}</span>
        </template>
      </el-table-column>
    </div>
    </template>
    <el-table-column :width="tableDefault.tableBut.width" label="??????" align="center" v-if="tableDefault.tableBut.show" >
      <template slot-scope="scope">
        <div class="ButF">
          <div v-for="(y,index) in tableDefault.tableBut.data" :key='index'><!--Object(typeFun(scope.row, x)).show-->
            <el-button @click="butFun(y.id,scope.row)" :type="y.type" :plain="y.plain"
                       v-if="y.jurisdiction && (y.condition?(Object(typeFun(scope.row, funData(y.condition))).show):true)"
                       :size="y.size">{{y.text}}
            </el-button>
          </div>
        </div>
      </template>

    </el-table-column>
  </el-table>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {ElButton},
    name: 'tableCustom',
    data() {
      return {
        response: {},
        tableData: [],
        dialogFormVisible: false,
        from: {
          info: ''
        },
        imgDefaultStyle: "width:5rem;height:5rem;border-radius: 5px;",
      }
    },
    props: ['tableDefault'],


/*    //??????
    tableDefault1: {
      tableStyle: {
        border: true//????????????
      },
      headData: [
        {
          props: "",
          type: "index",
          label: "??????",
          width: "50",
          align: "center",
          show: "true"
        },
        {
          props: "orderNum",//?????????????????????
          type: "string",//   string  img  tag  tagText remark html  ???????????????  ??????  ????????????  ??????????????????????????? ????????? html??????
          label: "?????????",//??????
          width: "",//??????
          align: "center",//??????????????????
          show: "true"//????????????
        },
        {
          props: "itemPhotoUrl",
          type: "img",//??????
          label: "????????????",
          width: "120",
          style: "width:5rem;height:auto;border-radius: 5px;",
          align: "center",
          show: "true"
        },
        {
          props: "butShow",
          type: "tag",
          label: "????????????",
          tagList: [{value: 0,show:false}, {value: 1,show:true}],
          width: "0",
          align: "center",
          show: false
        },
          {
              props: "expressStatus",
              type: "tag",
              label: "????????????",
              tagList: [{value: 0, label: '?????????', type: 'info'}, {value: 1, label: '?????????', type: 'success'}, {
                value: 2,
                label: '?????????',
                type: 'warning',
                show:true //??????????????????
              }],
              width: "80",
              align: "center",
              show: "true"
            },
        {
          props: "status",
          type: "tag",
          label: "????????????",
          tagList: [{value: 1, label: '?????????', type: 'success'}, {value: 2, label: '?????????', type: 'info'}, {
            value: 3,
            label: '?????????',
            type: 'warning',
            show:true
          }],
          width: "80",
          align: "center",
          show: "true"
        },
        {
          props: "addressInfo",
          type: "html",
          label: "???????????????",
          className:'addressInfoP',
          width: "160",
          align: "left",
          show: "true"
        },
      ],
      tableBut: {
        width: 'auto',
        //show: true,
        show: this.$store.getters.roleObj.R2, //????????????
        data: [{
          id: 0, //??????id  ????????????????????????????????????
          text: '????????????', // ????????????
          type: 'primary',//????????????
          plain: false, //??????????????????
          size: 'mini',//????????????
          jurisdiction: true,//??????????????????
          condition: 'butShow'//????????????
        },{
          id: 1,
          text: '????????????',
          type: 'success',
          plain: false,
          size: 'mini',
          jurisdiction: true,
          condition: 'expressStatus'
        },{
          id: 2,
          text: '????????????',
          type: 'danger',
          plain: false,
          size: 'mini',
          jurisdiction: true,
          condition: 'status'
        }]
      },
      tableData: [],
    },*/





    created() {
    },
    methods: {
      borderFun(){
        if(this.tableDefault.tableStyle !=undefined){
          if(this.tableDefault.tableStyle.border !=undefined){
            return this.tableDefault.tableStyle.border
          }
        }
        return true
      },
      funData(x) {
        let headData = this.tableDefault.headData;
        let t = headData.find(v => {
          return v.props == x
        })
        return t
      },
      typeFun(item, x) {
        // console.log('scope.row,x.tagList',item,x.tagList,item[x.props])
        let t = x.tagList.find(v => {
         
          return v.value == item[x.props]
       
        })
        return t
      },
      //????????????
      butFun(type, row) {
       
        this.$emit("tableFun", type, row)

      },
      //????????????
      select(row) {
        this.$emit("selectionChange", row)

      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ButF {
    display: flex;
    justify-content: flex-start;
    > div {
      margin-right: 10px;
    }
  }
</style>
