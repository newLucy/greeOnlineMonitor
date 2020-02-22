<template>
  <my-dialog :visible="visible" :title="$t('m.manage.user.uploadDialog.title')" @beforeClose="handleBeforeClose">
    <template slot="content">
      <el-form inline @submit.native.prevent="handleClickUploadBtn">
        <el-form-item>
          <el-input v-model="form.fileName" readonly></el-input>
        </el-form-item>
        <el-form-item>
          <button class="fileBtn">{{ $t('m.commonBtn.file') }}</button>
          <input ref="userManagement_upload" type="file" @change="handleUpload" style="display: none;" accept=".xlsx">
        </el-form-item>
      </el-form>
<!--      读取成功的数据-->
      <div v-show="total > 0" class="success">
        <p class="successInfo">{{ $t('m.manage.user.uploadDialog.totalInfo', {total: total}) }}</p>
        <el-table :data="tableData" size="mini" border>
          <el-table-column
            v-for="item in $t('m.manage.user.uploadTableHeader')"
            :key="item.key"
            :label="item.label"
            :prop="item.key"
            :min-width="item.width ? item.width : null"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
<!--      错误提示信息-->
      <div v-show="errorInfo" class="errorInfo">
        <p class="warningInfo">{{ $t('m.manage.user.uploadDialog.errorInfo', {errorInfo: errorInfo}) }}</p>
      </div>
    </template>
    <template slot="footer">
      <round-btn v-show="total > 0" @click.native.prevent="handleSave">
        {{ $t('m.commonBtn.save') }}
      </round-btn>
    </template>
  </my-dialog>
</template>

<script>
import MyDialog from '@/components/Dialog'
import RoundBtn from '@/components/FormElement/RoundBtn'
import { checkAddUser, batchAddUser } from '@/api/manage'
import showLoading from '@/utils/loading'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: () => {
        return 'Prompt'
      }
    }
  },
  name: 'user-management-dialog',
  components: {
    MyDialog,
    RoundBtn
  },
  data () {
    return {
      visible: this.value,
      success: true,
      failed: false,
      form: {
        fileName: ''
      },
      tableData: [],
      errorInfo: '',
      file: null
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    total () {
      return this.tableData.length
    }
  },
  methods: {
    handleSave () {
      let formData = new FormData()
      formData.append('file', this.file)
      let loading = showLoading()
      batchAddUser(formData).then(res => {
        loading.close()
        if (res) {
          this.handleBeforeClose()
          this.$emit('reloadData')
          this.$message({
            message: window.$vueI18n.t('m.commonMsg.uploadSuccess'),
            type: 'success',
            customClass: 'myMessage'
          })
        }
      }).catch(err => {
        loading.close()
      })
    },
    handleBeforeClose () {
      this.form.fileName = ''
      this.errorInfo = ''
      this.tableData = []
      this.visible = false
    },
    clearInfo () {
      // 清空上次上传的信息
      this.tableData = []
      this.errorInfo = ''
    },
    handleClickUploadBtn () {
      this.$refs.userManagement_upload.click()
    },
    handleUpload (e) {
      this.clearInfo()
      let target = e.target
      let files = target.files
      if (files.length === 0) {
        this.form.fileName = ''
        return
      }
      let formData = new FormData()
      this.file = files[0]
      formData.append('file', this.file)
      let loading = showLoading()
      checkAddUser(formData).then(res => {
        loading.close()
        let data = res.data
        if (data.error) {
          this.tableData = []
          this.errorInfo = data.error
        } else {
          this.tableData = data.info
          this.errorInfo = ''
        }
        this.form.fileName = target.value.match(/\\([^\\]+)$/)[1]

        target.value = null
      }).catch(err => {
        loading.close()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl"
  .fileBtn {
    height: .8rem;
    min-height: 30px;
    line-height: 100%;
    padding: 0 .4rem;
    border-radius: 4px;
    color: $btnBgColor;
    background-color transparent;
    border: 1px solid $btnBgColor;
    cursor: pointer;
  }
  .fileBtn:focus, .fileBtn:hover {
    background-color rgba(99,155,255,.2)
  }
  .warningInfo, .successInfo {
    font-size: .28rem;
    margin: .2rem auto;
  }
  .warningInfo {
    color: red;
  }
</style>
