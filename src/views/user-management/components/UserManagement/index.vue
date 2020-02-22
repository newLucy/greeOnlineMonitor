<template>
  <div>
    <el-form v-model="form" inline style="text-align: left;">
      <el-form-item>
        <el-input @input="handleInput(form, 'condition')" v-model="form.condition" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <search-btn @click.native.prevent="handleSearch">
          <i slot="icon" class="el-icon-search icon"></i>{{ $t('m.commonBtn.search') }}
        </search-btn>
      </el-form-item>
      <el-form-item v-if="isPC && !isSuperManager" :class="{right: true, uploadItem: true, marginRight0: isPC}">
        <upload-btn @click.native.prevent="handleUpload">
          <template slot="icon">
            <img src="~@/./assets/icons/upload.svg" alt="">
          </template>
          {{ $t('m.manage.user.uploadBtn') }}
        </upload-btn>
        <a class="template" :href="`${this.$url}/download/batchUserDownload`">{{ $t('m.manage.user.templateBtn') }}</a>
      </el-form-item>
      <el-form-item :class="{right: true, marginRight0: !isPC}">
        <add-btn @click.native.prevent="handleAddOne">
          <template slot="icon">
            <img src="~@/./assets/icons/add.svg" alt="">
          </template>
          {{ $t('m.manage.user.addBtn') }}</add-btn>
      </el-form-item>
      <div class="clear"></div>
    </el-form>

    <add-dialog v-model="visible" :title="$t('m.manage.user.addDialog.title')" @reloadData="getTableDataByNameOrPhone"></add-dialog>
    <upload-dialog v-model="uploadVisible" :title="$t('m.manage.user.uploadDialog.title')" @reloadData="getTableDataByNameOrPhone"></upload-dialog>

    <my-table v-if="showTable" :tableArray="tableArray" style="margin-top: .2rem;">
      <!--        <input slot="date" type="text" value="test"/>-->
      <el-table-column slot="startColumn" label="ID" type="index" align="center" width="50"></el-table-column>
      <div slot="userName" slot-scope="scope">
        <el-input size="mini" type="text" v-model="scope.row.userName" @input="handleInput(scope.row, 'userName')" @blur="checkNameValue(scope.row.userName)" :class="{warningBorder: nameWarning}"/>
      </div>
      <div slot="phone" slot-scope="scope">
        <el-input size="mini" type="text" v-model="scope.row.phone" @input="handleInputPhone(scope.row, 'phone')" @blur="checkPhoneValue(scope.row.phone)" :class="{warningBorder: phoneWarning}"/>
      </div>
      <div slot="status" slot-scope="scope">
        <el-select size="mini" type="text" v-model="scope.row.status">
          <el-option v-for="item in statusOption" :key="item.key" :value="item.text" :label="item.text"></el-option>
        </el-select>
      </div>
      <div slot="password" slot-scope="scope">
        <edit-btn bg-color="#f69f57" color="white" @click.native="handleResetPsd(scope.row)">{{ $t('m.commonBtn.reset') }}</edit-btn>
      </div>
      <el-table-column label="Operation" width="250px" align="center">
        <template slot-scope="scope">
          <edit-btn v-show="!scope.row.editFlag" bg-color="#7457de" color="white" @click.native="handleEdit(scope.row)" style="margin-right:5px;">{{ $t('m.commonBtn.edit') }}</edit-btn>
          <edit-btn v-show="!scope.row.editFlag" bg-color="#f69f57" color="white" @click.native="handleDelete(scope.row)">{{ $t('m.commonBtn.delete') }}</edit-btn>
          <edit-btn v-show="scope.row.editFlag" bg-color="#2f8ad0" color="white" @click.native="handleSave(scope.row)" style="margin-right:5px;">{{ $t('m.commonBtn.save') }}</edit-btn>
          <edit-btn v-show="scope.row.editFlag" bg-color="#ccc" color="#1e1e1e" @click.native="handleCancel(scope.row)">{{ $t('m.commonBtn.cancel') }}</edit-btn>
        </template>
      </el-table-column>
    </my-table>
    <!-- 分页 -->
    <div v-if="showTable" class="paginationPart">
      <my-pagination :pageData="pageData" @handlePageChange="handlePageChange"></my-pagination>
    </div>
  </div>
</template>

<script>
import SearchBtn from '@/components/FormElement/SearchBtn'
import UploadBtn from '@/components/FormElement/RoundWhiteBtn'
import AddBtn from '@/components/FormElement/RoundBtn'
import MyTable from '@/components/Table'
import MyPagination from '@/components/Pagination'
import EditBtn from '../Btn'
import AddDialog from './AddDialog'
import UploadDialog from './UploadDialog'
import showLoading from '@/utils/loading'
import { getStatus, updateOrgUserInfo, resetPassword, adminDeleteUser, getOrgUserByNameOrPhone } from '@/api/manage'
export default {
  name: 'user-management',
  components: {
    SearchBtn,
    UploadBtn,
    AddBtn,
    MyTable,
    EditBtn,
    AddDialog,
    UploadDialog,
    MyPagination
  },
  data () {
    return {
      visible: false,
      uploadVisible: false,
      editFlag: false,
      isSuperManager: false,
      statusOption: [],
      form: {
        condition: ''
      },
      tableArray: {
        tableData: [],
        tableHeader: []
      },
      showTable: true,
      pageData: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      lineData_copy: {},
      nameWarning: false,
      phoneWarning: false
    }
  },
  created () {
    getStatus().then(res => {
      this.statusOption = res.data
    })
  },
  mounted () {
    this.tableArray.tableHeader = window.$vueI18n.t('m.manage.user.tableHeader')
    this.getTableDataByNameOrPhone()
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo && userInfo.groupName === 'Super Admin') {
      this.isSuperManager = true
    }
  },
  computed: {
    isPC () {
      return this.$store.getters.isPC
    },
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
    checkNameValue (val) {
      if (!val) {
        this.nameWarning = true
        return true
      } else {
        this.nameWarning = false
        return false
      }
    },
    checkPhoneValue (val) {
      if (!val) {
        this.phoneWarning = true
        return true
      } else {
        this.phoneWarning = false
        return false
      }
    },
    handleEdit (row) {
      this.nameWarning = false
      this.phoneWarning = false
      let exit = this.tableArray.tableData.some(item => item.editFlag)
      if (exit) {
        this.$message({
          type: 'warning',
          message: window.$vueI18n.t('m.manage.user.unsavedWarning'),
          customClass: 'myMessage'
        })
        // this.$message.warning(window.$vueI18n.t('m.manage.user.unsavedWarning'))
      } else {
        this.lineData_copy = JSON.parse(JSON.stringify(row))
        row.editFlag = true
      }
    },
    handleDelete (row) {
      this.$confirm(window.$vueI18n.t('m.manage.user.deleteConfirmMsg', {userName: row.userName}), window.$vueI18n.t('m.commonMsg.deleteDialog.title'), {
        confirmButtonText: window.$vueI18n.t('m.commonBtn.yes'),
        cancelButtonText: window.$vueI18n.t('m.commonBtn.no'),
        type: 'warning',
        customClass: 'my-message-box'
      }).then(() => {
        adminDeleteUser({account: row.account}).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: window.$vueI18n.t('m.commonMsg.deleteSuccess'),
              customClass: 'myMessage'
            })
            this.pageData.currentPage = 1
            this.getTableDataByNameOrPhone()
          }
        })
      }).catch(err => {})
    },
    handleSave (row) {
      // 验证输入是否有值
      let name = row.userName.trim()
      let phone = row.phone.trim()
      let checkName = this.checkNameValue(name)
      let checkPhone = this.checkPhoneValue(phone)
      if (checkName || checkPhone) {
        return
      }

      let status = row.status
      let statusKey = ''
      this.statusOption.some(item => {
        if (item.text === status) {
          statusKey = item.key
          return true
        }
        return false
      })
      let params = {
        account: row.account,
        phone: row.phone.trim(),
        status: statusKey,
        userName: row.userName.trim()
      }
      updateOrgUserInfo(params).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: window.$vueI18n.t('m.commonMsg.updateSuccess'),
            customClass: 'myMessage'
          })
          row.editFlag = false
          this.getTableDataByNameOrPhone()
        }
      })
    },
    handleCancel (row) {
      row.userName = this.lineData_copy.userName
      row.phone = this.lineData_copy.phone
      row.status = this.lineData_copy.status
      row.editFlag = false
    },
    handleSearch () {
      this.pageData.currentPage = 1
      this.pageData.total = 0
      this.getTableDataByNameOrPhone()
    },
    getTableDataByNameOrPhone () {
      this.showTable = false
      let loading = showLoading()
      this.tableArray.tableData = []
      let params = {
        nameORphone: this.form.condition.trim(),
        orgId: this.org,
        page: this.pageData.currentPage,
        row: this.pageData.pageSize
      }
      getOrgUserByNameOrPhone(params).then(res => {
        this.showTable = true
        loading.close()
        let data = res.data
        this.pageData.total = data.total
        this.tableArray.tableData = data.list.map(item => {
          item.editFlag = false
          return item
        })
      }).catch(err => {
        loading.close()
      })
    },
    handleAddOne () {
      this.visible = true
    },
    handleUpload () {
      this.uploadVisible = true
    },
    handleResetPsd (row) {
      resetPassword({account: row.account}).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: window.$vueI18n.t('m.commonMsg.resetSuccess'),
            customClass: 'myMessage'
          })
        }
      })
    },
    handlePageChange (val) {
      this.pageData.currentPage = val
      this.getTableDataByNameOrPhone()
    },
    // 禁止输入特殊字符
    handleInput (row, param) {
      row[param] = row[param].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '')
    },
    // 禁止输入除数字外的字符
    handleInputPhone (row, param) {
      row[param] = row[param].replace(/[^0-9]/g, '')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/form.styl"
@import "~styles/variable.styl"
  .uploadItem {
    position relative
    .template {
      position absolute
      top -0.35rem
      right 0
      line-height .32rem
      color $btnBgColor
      text-decoration underline
      cursor pointer
    }
  }
  .marginRight0 {
    margin-right 0
  }
  .paginationPart {
    overflow-y: hidden;
  }
.warningBorder >>> input {
  border-color: red;
}
</style>
