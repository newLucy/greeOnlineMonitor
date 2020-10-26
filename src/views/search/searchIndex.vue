<template>
  <div class="searchPage">
    <search-form v-model="form" class="searchForm" @handleSearch="handleSearch" @handleDownload="handleDownload"></search-form>

    <div v-show="showBarcode">
      <info-panel title="Basic Parameter" class="panel">
        <div v-if="!basicParamEmpty">
          <basic-parameter :basicInfo="basicInfo"></basic-parameter>
        </div>
        <div v-else>
          {{ $t('m.commonMsg.noRecord')}}
        </div>
      </info-panel>
    </div>

    <div v-show="showMac">
      <info-panel title="Error Code" class="panel">
        <error-code :errorCodeInfo="errorCodeInfo" @changeTab="changeTab" style="text-align: left;"></error-code>
      </info-panel>
      <info-panel title="Detail Parameter" class="panel line-chart-panel">
        <!-- 图标一 -->
        <div v-if="showType === 'line'">
          <h3>{{$t('m.search.lineChartHead')}}: {{lineChartErrorDate}}</h3>
          <div class="legend-selector-wrap1">
            <el-select v-model="legend1" size="mini" multiple collapse-tags :popper-append-to-body="false"
                       @change="handleLegend1Change" :multiple-limit="6" :placeholder="$t('m.search.lineChartPlaceholder')"
                       ref="legendSelect1" @blur="handleSelectBlur1"
            >
              <el-option v-for="item in legendOptions1" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </div>
          <line-chart :initData="initData1" :updateData="updateData1" :resizeFlag="resizeFlag"></line-chart>
          <!-- 图标一 -->
          <div class="legend-selector-wrap2">
            <el-select v-model="legend2" size="mini" multiple collapse-tags :popper-append-to-body="isIphone"
                       @change="handleLegend2Change" :multiple-limit="6" :placeholder="$t('m.search.lineChartPlaceholder')"
                       ref="legendSelect2" @blur="handleSelectBlur2"
            >
              <el-option v-for="item in legendOptions2" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </div>
          <line-chart :initData="initData2" :updateData="updateData2" :resizeFlag="resizeFlag">></line-chart>
        </div>
        <div v-else-if="showType === 'table'">
          <my-table :tableArray="tableArray1"></my-table>
          <search-table :tableArray="tableArray1"></search-table>
          <search-table :tableArray="tableArray2" style="margin: .6rem 0;"></search-table>
          <search-table :tableArray="tableArray3"></search-table>
          <my-table :tableArray="tableArray2" style="margin: .6rem 0;"></my-table>
          <my-table :tableArray="tableArray3"></my-table>
        </div>
        <div v-else>{{ $t('m.commonMsg.noRecord')}}</div>
      </info-panel>
      <info-panel title="Malfunction Description" class="panel">
        <Mal-Description :malInfo="malInfo"></Mal-Description>
      </info-panel>
      <info-panel title="Troubleshooting Chart" class="panel">
        <trouble-chart :urls="chartsURLs"></trouble-chart>
      </info-panel>
    </div>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm'
import ErrorCode from './components/ErrorCode'
import TroubleChart from './components/TroubleChart'
import MalDescription from './components/MalDescription'
import BasicParameter from './components/BasicParameter'
import SearchTable from './components/table'
import LineChart from './components/LineChart'
import MyTable from '@/components/Table'
import InfoPanel from '@/components/InfoPanel/panel'
import showLoading from '@/utils/loading'
import { search } from '@/api/search'
export default {
  name: 'search-index',
  components: {
    SearchForm,
    TroubleChart,
    ErrorCode,
    MalDescription,
    BasicParameter,
    InfoPanel,
    LineChart,
    MyTable,
    SearchTable
  },
  data () {
    return {
      form: {
        mac: '',
        barcode: ''
      },
      showMac: true,
      showBarcode: true,
      // 输入mac的情况
      faultInfos: [],

      // Basic Parameter
      basicInfo: {},
      basicParamEmpty: true,

      // Error Code
      showErrorCode: true,
      errorCodeInfo: [{
        code: '',
        name: '',
        signal: ''
      }],

      // Detail Parameter
      showType: '', // line（显示折线图）\table（显示表格）\other（显示无数据）
      // lineChart
      lineChartErrorDate: '',
      legend1: [],
      legendOptions1: [],
      legend2: [],
      legendOptions2: [],
      initData1: {
        xAxisName: 'time',
        yAxisName: 'value'
      },
      updateData1: {},
      initData2: {
        xAxisName: 'time',
        yAxisName: 'value'
      },
      updateData2: {},
      tableArray1: {
        tableData: [],
        tableHeader: []
      },
      tableArray2: {
        tableData: [],
        tableHeader: []
      },
      tableArray3: {
        tableData: [],
        tableHeader: []
      },

      // Troubleshooting Chart
      chartsURLs: [],

      // Malfunction Description
      malInfo: '',

      resizeFlag: 1
    }
  },
  computed: {
    isIphone () {
      return this.$store.getters.isIphone
    }
  },
  activated () {
    let query = this.$route.query
    this.form = {
      mac: query.mac,
      barcode: query.barcode
    }
    this.handleSearch(this.form)
    window.onresize = this.handleResize()
  },
  deactivated () {
    window.onresize = null
  },
  methods: {
    handleSelectBlur1 () {
      if (this.isIphone) {
        this.$refs.legendSelect1.blur()
      }
    },
    handleSelectBlur2 () {
      if (this.isIphone) {
        this.$refs.legendSelect2.blur()
      }
    },
    handleResize () {
      let t = null
      return () => {
        if (!t) {
          t = setTimeout(() => {
            this.resizeFlag = this.resizeFlag + 1
            t = null
          }, 100)
        }
      }
    },
    handleLegend1Change (val) {
      this.updateData1.dataset.dimensions = ['time'].concat(val)
    },
    handleLegend2Change (val) {
      this.updateData2.dataset.dimensions = ['time'].concat(val)
    },
    setErrorCodeData (faultInfos) {
      this.errorCodeInfo = faultInfos.map(item => {
        let obj = {
          code: item.errorCode,
          name: item.malfuncationName,
          signal: item.malfuncationSignal
        }
        return obj
      })
    },
    setDetailLineData (data) {
      this.showType = 'line'
      let dataset1 = {
        dimensions: [],
        source: []
      }
      let dataset2 = {
        dimensions: [],
        source: []
      }
      let errorTime = ''
      data.RuntimeInfos.forEach(item => {
        if (dataset1.dimensions.length === 0) {
          this.legendOptions1 = Object.keys(item.continuousData)
          this.legend1 = this.legendOptions1.slice(0, 6)
          dataset1.dimensions = ['time'].concat(this.legend1)
          this.lineChartErrorDate = item.errorTime
          errorTime = item.errorTime.substring(11)
        }
        if (dataset2.dimensions.length === 0) {
          this.legendOptions2 = Object.keys(item.statusData)
          this.legend2 = this.legendOptions2.slice(0, 6)
          dataset2.dimensions = ['time'].concat(this.legend2)
        }
        item.continuousData.time = item.time
        item.statusData.time = item.time
        dataset1.source.push(item.continuousData)
        dataset2.source.push(item.statusData)
      })
      this.updateData1 = {
        dataset: dataset1,
        errorTime: errorTime
      }
      this.updateData2 = {
        dataset: dataset2,
        errorTime: errorTime
      }
    },
    setDetailParameterData (info) {
      // 展示表格
      let errorDataVo = info.errorDataVo
      if (errorDataVo) {
        let tableHeader = []
        for (let [key, val] of Object.entries(errorDataVo)) {
          tableHeader.push({
            label: key,
            key: key,
            sortable: false
          })
        }
        this.tableArray1.tableHeader = tableHeader.slice(0, 10)
        this.tableArray2.tableHeader = tableHeader.slice(10, 20)
        this.tableArray3.tableHeader = tableHeader.slice(20, 30)
        this.tableArray1.tableData = this.tableArray2.tableData = this.tableArray3.tableData = [errorDataVo]
      }
    },
    setTroubleChart (info) {
      this.chartsURLs = []
      let flowChart = info.flowChart
      let table = info.table
      if (flowChart) {
        this.chartsURLs.push(this.$url + flowChart)
      }
      if (table) {
        this.chartsURLs.push(this.$url + table)
      }
    },
    handleSearch (form) {
      let loading = showLoading()
      this.showBarcode = false
      this.showMac = false
      this.clearMacInfo()
      search(form).then(res => {
        loading.close()
        this.showType = ''
        if (res) {
          let data = res.data
          if (form.mac) {
            this.showMac = true
            this.faultInfos = data.faultInfos
            // 如果查询结果mac数据不为空
            if (this.faultInfos && this.faultInfos.length > 0) {
              // Error Code
              this.setErrorCodeData(this.faultInfos)
              // DetailParameter 折线图
              if (data.RuntimeInfos && data.RuntimeInfos.length > 0) {
                this.setDetailLineData(data)
              }

              if (this.faultInfos && this.faultInfos.length > 0) {
                this.showType = this.showType || 'table'
                this.setMacInfo(this.faultInfos[0])
              } else {
                this.showType = this.showType || 'other'
              }
            }
          }
          if (form.barcode) {
            this.showBarcode = true
            this.basicParamEmpty = true
            this.basicInfo = data.machSizeInfo
            if (this.basicInfo) {
              for (let [key, val] of Object.entries(this.basicInfo)) {
                if (val) {
                  this.basicParamEmpty = false
                  return
                }
              }
            }
          } else {
            this.showBarcode = false
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleDownload (form) {
      location.href = `${this.$url}/download/pdfDownload?mac=${form.mac}&barcode=${form.barcode}`
    },
    changeTab (index) {
      this.setMacInfo(this.faultInfos[index])
    },
    // 设置 查MAC的时候出来error code模块外的所有数据
    setMacInfo (info) {
      // Detail Parameter
      this.setDetailParameterData(info)

      // trouble Charts
      this.setTroubleChart(info)
      // Malfunction Description
      this.malInfo = info.malfuncationDescripion
    },
    clearMacInfo () {
      // Error Code
      this.errorCodeInfo = []
      // Detail Parameter
      this.tableArray1.tableData = this.tableArray2.tableData = this.tableArray3.tableData = []
      // trouble Charts
      this.chartsURLs = []
      this.basicParamEmpty = true
      this.errorCodeInfo = {}
      this.malInfo = ''
    }
  }
}
</script>

<style lang="stylus" scoped>

  @media screen and (max-width: 800px) {
    .panel .legend-selector-wrap1, .panel .legend-selector-wrap2 {
      .el-select__tags-text {
        max-width: 1rem !important;
      }
    }
  }
.searchPage {
  width: 24rem;
  max-width: 90%;
  margin: 0 auto;
  display inline-block
  .searchForm {
    margin: .8rem 0 0
  }
  .panel {
    margin-bottom: .9rem;
    text-align: center;
    h3 {
      font-size: .4rem;
      margin: 0 0 .3rem .5rem;
      text-align: left;
      font-weight bold
    }

    >>> .legend-selector-wrap1 {
      padding-bottom: 0.5rem;
    }

    >>> .legend-selector-wrap2 {
      padding: 0.5rem 0 0.5rem;
    }
    >>> .legend-selector-wrap1, >>> .legend-selector-wrap2 {
      text-align: right;
      .el-select__tags-text {
         display: inline-block;
         max-width: 1.8rem !important;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
       }
      .el-tag--info {
        display flex
        align-items center
      }
      .el-select-dropdown {
        text-align left
      }
    }
  }
  >>> .line-chart-panel .content {
    padding: 0.8rem 0.2rem !important;
  }
}
</style>
