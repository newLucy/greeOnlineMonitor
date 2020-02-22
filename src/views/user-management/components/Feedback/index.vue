<template>
  <div>
    <el-form v-model="form" inline style="text-align: left;">
      <el-form-item>
        <el-input v-model="form.condition" @input="handleInput(form, 'condition')" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <search-btn @click.native.prevent="handleSearch">
          <i slot="icon" class="el-icon-search icon"></i>{{ $t('m.commonBtn.search') }}
        </search-btn>
      </el-form-item>
      <el-form-item class="right uploadItem marginRight0">
        <download-btn @click.native.prevent="handleDownload">
          <template slot="icon">
            <img src="~@/./assets/icons/download.svg" alt="">
          </template>
          {{ $t('m.commonBtn.export') }}
        </download-btn>
      </el-form-item>
      <div class="clear"></div>
    </el-form>
    <my-table v-if="showTable" :tableArray="tableArray" style="margin-top: .2rem;">
      <el-table-column slot="startColumn" label="ID" type="index" align="center" width="50"></el-table-column>
    </my-table>
    <!-- 分页 -->
    <div v-if="showTable" class="paginationPart">
      <my-pagination :pageData="pageData" @handlePageChange="handlePageChange"></my-pagination>
    </div>
  </div>
</template>

<script>
import SearchBtn from '@/components/FormElement/SearchBtn'
import DownloadBtn from '@/components/FormElement/RoundWhiteBtn'
import MyTable from '@/components/Table'
import MyPagination from '@/components/Pagination'
import showLoading from '@/utils/loading'
import { getFeedbackInfo } from '@/api/manage'
export default {
  name: 'userManagement-userLogs',
  components: {
    SearchBtn,
    DownloadBtn,
    MyTable,
    MyPagination
  },
  data () {
    return {
      form: {
        condition: ''
      },
      tableArray: {
        tableData: [],
        tableHeader: []
      },
      pageData: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      showTable: true
    }
  },
  mounted () {
    this.tableArray.tableHeader = window.$vueI18n.t('m.manage.feedback.tableHeader')
    this.handleSearch()
  },
  computed: {
    org () {
      return this.$store.getters.selectedOrg
    }
  },
  watch: {
    org () {
      this.handleSearch()
    }
  },
  methods: {
    handleSearch () {
      this.pageData.currentPage = 1
      this.pageData.total = 0
      this.getTableData()
    },
    getTableData () {
      this.showTable = false
      let loading = showLoading()
      this.tableArray.tableData = []
      let params = {
        userInfo: this.form.condition.trim(),
        orgId: this.org,
        page: this.pageData.currentPage,
        row: this.pageData.pageSize
      }
      getFeedbackInfo(params).then(res => {
        this.showTable = true
        loading.close()
        if (res) {
          let data = res.data
          this.tableArray.tableData = data.list
          this.pageData.total = data.total
        }
      }).catch(err => {})
    },
    handleDownload () {
      location.href = `${this.$url}/feedback/export?userInfo=${this.form.condition.trim()}&orgId=${this.org}`
    },
    handlePageChange (val) {
      this.pageData.currentPage = val
      this.getTableData()
    },
    handleInput (form, param) {
      form[param] = form[param].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/form.styl"
  /*@import "~styles/variable.styl"*/
  .marginRight0 {
    margin-right: 0;
  }
</style>
