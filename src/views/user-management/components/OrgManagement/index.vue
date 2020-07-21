<template>
  <div>
    <round-btn @click.native="visible = true">
      <template slot="icon">
        <img src="~@/./assets/icons/add.svg" alt="">
      </template>
      {{ $t('m.manage.group.addBtn') }}
    </round-btn>
    <my-dialog v-model="visible" @reloadData="getTableData" title="New Group"></my-dialog>
    <div class="myTable">
      <my-table v-if="showTable" :tableArray="tableArray">
        <el-table-column slot="startColumn" label="ID" type="index" align="center" width="50"></el-table-column>
        <div slot="administrator" slot-scope="scope">
          <el-select size="mini" type="text" v-model="scope.row.administrator"
                     :placeholder="$t('m.commonMsg.chooseOne')"
                     :no-data-text="$t('m.commonMsg.noRecord')"
                     :class="{warningBorder: adminWarning}"
                     @blur="checkAdminValue(scope.row.administrator)"
          >
            <el-option
              v-for="item in adminOption"
              :key="item.key"
              :value="item.text"
              :label="item.text"
            ></el-option>
          </el-select>
        </div>
        <div slot="mailBox" slot-scope="scope">
          <el-input size="mini" type="text" v-model="scope.row.mailBox" @input="handleInput(scope.row, 'mailBox')" @blur="checkMailboxValue(scope.row.mailBox)" :class="{warningBorder: mailboxWarning}"/>
        </div>
        <el-table-column label="Operation" align="center" width="250px">
          <template slot-scope="scope">
            <edit-btn v-show="!scope.row.editFlag" bg-color="#7457de" color="white" @click.native="handleEdit(scope.row)">{{ $t('m.commonBtn.edit') }}</edit-btn>
            <edit-btn v-show="!scope.row.editFlag" bg-color="#f69f57" color="white" @click.native="handleDelete(scope.row)">{{ $t('m.commonBtn.delete') }}</edit-btn>
            <edit-btn v-show="scope.row.editFlag" bg-color="#2f8ad0" color="white" @click.native="handleSave(scope.row)">{{ $t('m.commonBtn.save') }}</edit-btn>
            <edit-btn v-show="scope.row.editFlag" bg-color="#ccc" color="#1e1e1e" @click.native="handleCancel(scope.row)">{{ $t('m.commonBtn.cancel') }}</edit-btn>
          </template>
        </el-table-column>
      </my-table>
      <!-- 分页 -->
      <div v-if="showTable" class="paginationPart">
        <my-pagination :pageData="pageData" @handlePageChange="handlePageChange"></my-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import RoundBtn from '@/components/FormElement/RoundBtn'
import MyDialog from './MyDialog'
import MyTable from '@/components/Table/index'
import MyPagination from '@/components/Pagination'
import EditBtn from '../Btn'
import showLoading from '@/utils/loading'
import { getGroup, getAdministrator, updateOrganizeInfo, adminDeleteGroup } from '@/api/manage'
export default {
  components: {
    RoundBtn,
    MyDialog,
    MyTable,
    EditBtn,
    MyPagination
  },
  name: 'index',
  data () {
    return {
      visible: false,
      editFlag: false,
      adminOption: [],
      tableArray: {
        tableData: [],
        tableHeader: []
      },
      pageData: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      lineData_copy: null,
      showTable: true,
      mailboxWarning: false,
      adminWarning: false
    }
  },
  mounted () {
    this.tableArray.tableHeader = window.$vueI18n.t('m.manage.group.tableHeader')
    this.getTableData()
  },
  methods: {
    checkMailboxValue (val) {
      let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
      let b = !val || !reg.test(val)
      this.mailboxWarning = b
      return b
    },
    checkAdminValue (val) {
      let b = !val
      this.adminWarning = b
      return b
    },
    handleEdit (row) {
      this.mailboxWarning = false
      this.adminWarning = false
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
        //  获取某组织下的所有管理员
        getAdministrator({orgId: row.id}).then(res => {
          this.adminOption = res.data
        }).catch(err => console.log(err))
      }
    },
    handleSave (row) {
      // 验证输入是否有值
      let mailbox = row.mailBox.trim()
      let admin = row.administrator
      let checkMailbox = this.checkMailboxValue(mailbox)
      let checkAdmin = this.checkAdminValue(admin)
      if (checkMailbox || checkAdmin) {
        return
      }

      let account = ''
      this.adminOption.some(item => {
        if (item.text === admin) {
          account = item.key
          return true
        }
        return false
      })
      let params = {
        account: account,
        emailBox: mailbox,
        organizeName: row.organizeName,
        status: 0
      }
      updateOrganizeInfo(params).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: window.$vueI18n.t('m.commonMsg.updateSuccess'),
            customClass: 'myMessage'
          })
          this.getTableData()
          row.editFlag = false
        }
      })
    },
    handleCancel (row) {
      row.administrator = this.lineData_copy.administrator
      row.mailBox = this.lineData_copy.mailBox
      row.editFlag = false
    },
    getTableData () {
      let loading = showLoading()
      this.showTable = false
      this.pageData.total = 0
      let params = {
        page: this.pageData.currentPage,
        row: this.pageData.pageSize
      }
      getGroup(params).then(res => {
        loading.close()
        this.showTable = true
        let data = res.data
        this.tableArray.tableData = data.list.map(item =>{
          item.editFlag = false
          return item
        })
        this.pageData.total = data.total
        this.showTable = true
      }).catch(err => {})
    },
    handlePageChange (val) {
      this.pageData.currentPage = val
      this.getTableData()
    },
    handleDelete (row) {
      let orgName = row.organizeName
      this.$confirm(window.$vueI18n.t('m.manage.group.deleteConfirmMsg', {groupName: orgName}), window.$vueI18n.t('m.commonMsg.deleteDialog.title'), {
        confirmButtonText: window.$vueI18n.t('m.commonBtn.yes'),
        cancelButtonText: window.$vueI18n.t('m.commonBtn.no'),
        type: 'warning',
        customClass: 'my-message-box'
      }).then(() => {
        adminDeleteGroup({organizeName: orgName}).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: window.$vueI18n.t('m.commonMsg.deleteSuccess'),
              customClass: 'myMessage'
            })
            this.pageData.currentPage = 1
            this.getTableData()
          }
        })
      }).catch(err => {})
    },
    handleInput (row, param) {
      row[param] = row[param].replace(/[^a-zA-Z0-9\u4E00-\u9FA5@_.,]/g, '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.myTable {
  margin-top: .5rem;
}
  .warningBorder >>> input {
    border-color: red;
  }
</style>
