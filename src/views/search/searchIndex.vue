<template>
  <div class="searchPage">
    <search-form v-model="form" class="searchForm" @handleSearch="handleSearch" @handleDownload="handleDownload"></search-form>

    <div v-if="showBarcode">
      <info-panel title="Basic Parameter" class="panel">
        <div v-if="!basicParamEmpty">
          <basic-parameter :basicInfo="basicInfo"></basic-parameter>
        </div>
        <div v-else>
          {{ $t('m.commonMsg.noRecord')}}
        </div>
      </info-panel>
    </div>

    <div v-if="showMac">
      <info-panel title="Error Code" class="panel">
        <error-code :errorCodeInfo="errorCodeInfo" @changeTab="changeTab" style="text-align: left;"></error-code>
      </info-panel>
      <info-panel title="Detail Parameter" class="panel">
        <div v-if="tableArray1.tableData.length > 0">
          <!--<my-table :tableArray="tableArray1"></my-table>-->
          <search-table :tableArray="tableArray1"></search-table>
          <search-table :tableArray="tableArray2" style="margin: .6rem 0;"></search-table>
          <search-table :tableArray="tableArray3"></search-table>
          <!--<my-table :tableArray="tableArray2" style="margin: .6rem 0;"></my-table>
          <my-table :tableArray="tableArray3"></my-table>-->
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
import MyTable from '@/components/Table'
import InfoPanel from '@/components/InfoPanel/panel'
import showLoading from "@/utils/loading"
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
      malInfo: ''}
},
activated() {
		let query = this.$route.query
		this.form = {
			mac: query.mac,
			barcode: query.barcode
		}
		this.handleSearch(this.form)
	},
	methods: {
		handleSearch(form) {
			let loading = showLoading()
			this.showBarcode = false
			this.showMac = false
			this.clearMacInfo()
			search(form).then(res => {
				loading.close()
				if(res) {
					let data = res.data
					if(form.mac) {
						this.showMac = true
						this.faultInfos = data.faultInfos
						// 如果查询结果mac数据不为空
						if (this.faultInfos && this.faultInfos.length > 0) {
							// Error Code
							this.errorCodeInfo = this.faultInfos.map(item => {
								let obj = {
									code: item.errorCode,
									name: item.malfuncationName,
									signal: item.malfuncationSignal
								}
								return obj
							})
							this.setMacInfo(this.faultInfos[0])
						}
					}
					if(form.barcode) {
						this.showBarcode = true
						this.basicParamEmpty = true
						this.basicInfo = data.machSizeInfo
						if(this.basicInfo) {
							for(let [key, val] of Object.entries(this.basicInfo)) {
								if(val) {
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
		handleDownload(form) {
			location.href = `${this.$url}/download/pdfDownload?mac=${form.mac}&barcode=${form.barcode}`
    },
    changeTab (index) {
      this.setMacInfo(this.faultInfos[index])
    },
    // 设置 查MAC的时候出来error code模块外的所有数据
    setMacInfo (info) {
      // Detail Parameter
      let errorDataVo = info.errorDataVo
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
      // trouble Charts
      this.chartsURLs = []
      let flowChart = info.flowChart
      let table = info.table
      if (flowChart) {
        this.chartsURLs.push(this.$url + flowChart)
      }
      if (table) {
        this.chartsURLs.push(this.$url + table)
      }
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
  }
}
</style>
