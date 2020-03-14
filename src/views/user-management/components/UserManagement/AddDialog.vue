<template>
  <my-dialog :visible="visible" :title="title" @beforeClose="handleBeforeClose" @handleOpen="handleOpen">
    <template slot="content">
      <el-form ref="dialogForm-user" :model="form" :rules="rules" label-position="right" inline>
        <el-form-item :label="$t('m.manage.user.addDialog.phone')" prop="phone">
          <el-input @input="handleInput('phone')" @keyup.enter.native="handleOK" v-model="form.phone" clearable @blur="handlePhoneBlur"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.manage.user.addDialog.name')" prop="name">
          <el-input @input="handleInput('name')" @keyup.enter.native="handleOK" v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.manage.user.addDialog.account')" prop="account">
          <el-input @input="handleInput('account')" @keyup.enter.native="handleOK" v-model="form.account" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.manage.user.addDialog.password')">
          <el-input v-model="form.password" @keyup.enter.native="handleOK" clearable disabled></el-input>
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
import { addUser } from '@/api/manage'
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
  	var checkPhone = (rule, value, callback) => {
	  	let val = value.trim()
	    if (val.length === 0) {
	      callback(new Error(window.$vueI18n.t('m.manage.user.addDialog.phoneWarning')));
	    } else if (val.length > 30) {
	      callback(new Error(window.$vueI18n.t('m.commonMsg.length30')));
	    } else {
	      callback();
	    }
    };
  	var checkName = (rule, value, callback) => {
	  	let val = value.trim()
	    if (val.length === 0) {
	      callback(new Error(window.$vueI18n.t('m.manage.user.addDialog.nameWarning')));
	    } else if (val.length > 30) {
	      callback(new Error(window.$vueI18n.t('m.commonMsg.length30')));
	    } else {
	      callback();
	    }
    };
  	var checkAccount = (rule, value, callback) => {
	  	let val = value.trim()
	    if (val.length === 0) {
	      callback(new Error(window.$vueI18n.t('m.manage.user.addDialog.accountWarning')));
	    } else if (val.length > 30) {
	      callback(new Error(window.$vueI18n.t('m.commonMsg.length30')));
	    } else {
	      callback();
	    }
    };
    return {
      visible: this.value,
      form: {
        phone: '',
        name: '',
        account: '',
        password: '123456'
      },
      rules: {
        phone: [{validator: checkPhone, trigger: 'blur'}],
        name: [{validator: checkName, trigger: 'blur'}],
        account: [{validator: checkAccount, trigger: 'blur'}]
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
  computed: {
    org () {
      return this.$store.getters.selectedOrg
    }
  },
  methods: {
    handleOK () {
      this.form.account = this.form.account.trim()
      this.form.phone = this.form.phone.trim()
      this.form.name = this.form.name.trim()
      this.$refs['dialogForm-user'].validate((valid) => {
        if (valid) {
          let params = {
            account: this.form.account,
            organizeId: this.org,
            phone: this.form.phone,
            userName: this.form.name
          }
          addUser(params).then(res => {
            if (res) {
              this.handleBeforeClose()
              this.$message({
                type: 'success',
                message: window.$vueI18n.t('m.commonMsg.addSuccess'),
                customClass: 'myMessage'
              })
              this.$emit('reloadData')
            }
          })
        } else {
          return false
        }
      })
    },
    handleBeforeClose () {
      this.visible = false
    },
    handleOpen () {
    	if (this.$refs['dialogForm-user']) {
    		this.$refs['dialogForm-user'].resetFields()
    	}
    },
    handlePhoneBlur () {
      let phone = this.form.phone.trim()
      if (!this.form.account && phone && phone.length <= 30) {
        this.form.account = this.form.phone
      }
    },
    // 禁止输入特殊字符
    handleInput (param) {
      this.form[param] = this.form[param].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '')
    }
  }
}
</script>

<style lang="stylus" scoped>
  >>> .el-dialog {
    max-width: 90%;
  }
</style>
