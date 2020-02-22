<template>
  <my-dialog :visible="visible" :title="$t('m.manage.group.dialog.title')" @beforeClose="handleBeforeClose" @handleOpen="handleOpen">
    <template slot="content">
      <el-form ref="dialogForm-group" :model="form" :rules="rules" inline>
        <el-form-item :label="$t('m.manage.group.dialog.group')" required prop="group">
          <el-input v-model="form.group" @input="handleInput(form, 'group')" @keyup.enter.native.prevent="handleOK" class="input" clearable></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template slot="footer">
      <round-btn @click.native="handleOK">
        {{ $t('m.commonBtn.ok') }}
      </round-btn>
    </template>
  </my-dialog>
</template>

<script>
import MyDialog from '@/components/Dialog'
import RoundBtn from '@/components/FormElement/RoundBtn'
import { addGroup } from '@/api/manage'
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
  name: 'group-management-dialog',
  components: {
    MyDialog,
    RoundBtn
  },
  data () {
    var validateGroup = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(window.$vueI18n.t('m.manage.group.dialog.groupWarning')))
      } else if (value.length > 30) {
        return callback(new Error(window.$vueI18n.t('m.manage.group.dialog.lengthError')))
      }
      return callback()
    }
    return {
      visible: this.value,
      form: {
        group: ''
      },
      rules: {
        group: [{ validator: validateGroup, trigger: 'blur' }]
      }
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
  methods: {
    handleOK () {
      this.form.group = this.form.group.trim()
      this.$refs['dialogForm-group'].validate((valid) => {
        if (valid) {
          let params = {
            organizeName: this.form.group
          }
          addGroup(params).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: window.$vueI18n.t('m.commonMsg.addSuccess'),
                customClass: 'myMessage'
              })
              this.$store.dispatch('dropdown/getOrgs')
              this.$emit('reloadData')
              this.handleBeforeClose()
            }
          }).catch(err => console.log(err))
        } else {}
      })
    },
    handleBeforeClose () {
      this.visible = false
    },
    handleOpen () {
    	if (this.$refs['dialogForm-group']) {
    		this.$refs['dialogForm-group'].resetFields()
    	}
    },
    handleInput (form, param) {
      form[param] = form[param].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '')
    }
  }
}
</script>

<style lang="stylus" scoped>
  >>> .el-dialog {
    max-width: 90%;
  }
  >>> .el-form-item__label {
    width: auto !important;
  }
</style>
