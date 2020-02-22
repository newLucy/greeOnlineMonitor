<template>
  <div class="personalCenter">
    <info-panel :title="title">
      <el-form :model="form" :rules="rules" ref="personalCenter-form" class="myForm">
        <el-form-item label="Your Account">
          <el-input v-model="form.account" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Your Name" prop="name">
          <el-input v-model="form.name" @keyup.enter.native="handleSave" clearable :disabled="!editFlag"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone">
          <el-input v-model="form.phone" @keyup.enter.native="handleSave" clearable :disabled="!editFlag"></el-input>
        </el-form-item>
        <el-form-item label="Your Password" prop="password">
          <el-input v-model="form.password" @keyup.enter.native="handleSave" type="password" clearable :disabled="!editFlag"></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" @keyup.enter.native="handleSave" type="password" clearable :disabled="!editFlag"></el-input>
        </el-form-item>
<!--        <el-form-item label="Service Start">-->
<!--          <el-input v-model="form.start" clearable></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Service Expire">-->
<!--          <el-input v-model="form.expire" clearable></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <div class="btnWrap">
        <round-btn v-show="!editFlag" @click.native="editFlag = true" class="resetBtn">
          {{$t('m.commonBtn.reset')}}
        </round-btn>
        <round-btn v-show="editFlag" @click.native="handleSave">
          {{$t('m.commonBtn.save')}}
        </round-btn>
      </div>
    </info-panel>
  </div>
</template>

<script>
import InfoPanel from '@/components/InfoPanel/panel'
import RoundBtn from '@/components/FormElement/RoundBtn'
import aes from '@/utils/aes'
import { updateUserInfo, logout } from '@/api/user'
export default {
  components: {
    InfoPanel,
    RoundBtn
  },
  data () {
    var validateName = (rule, value, callback) => {
      if (!value || value.length > 30) {
        return callback(new Error(' '))
      }
      return callback()
    };
    var validatePassword = (rule, value, callback) => {
      if (!value || value.length < 6 || value.length > 30) {
        return callback(new Error(' '))
      }
      return callback()
    };
    return {
      title: '',
      form: {
        account: '',
        name: '',
        phone: '',
        password: '********',
        confirmPassword: ''
      },
      editFlag: false,
      userInfo: null,
      rules: {
        name: [{ validator: validateName, message: ' ', trigger: 'blur' }],
        phone: [{ validator: validateName, message: ' ', trigger: 'blur' }],
        password: [{ validator: validatePassword, message: ' ', trigger: 'blur' }],
        confirmPassword: [{ validator: validatePassword, message: ' ', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (this.userInfo) {
      this.initForm()
    }
  },
  methods: {
    initForm () {
      this.form.name = this.userInfo.userName
      this.form.account = this.userInfo.account
      this.form.phone = this.userInfo.phone
      this.title = `${this.userInfo.organizeName}: ${this.form.name || 'Null'}`
    },
    handleSave () {
      this.$refs['personalCenter-form'].validate((valid) => {
        if (valid) {
          let form = this.form
          let params = {
            account: form.account,
            confirmPassword: aes.encrypt(form.confirmPassword.trim()),
            phone: form.phone.trim(),
            userName: form.name.trim()
          }
          if (form.password !== '********') {
            params.password = aes.encrypt(form.password.trim())
          }
          updateUserInfo(params).then(res => {
            if (res) {
              this.$message.closeAll()
              this.$message({
                message: window.$vueI18n.t('m.commonMsg.loginAgain'),
                type: 'success'
              })
              setTimeout(() => {
                logout().then(res => {
                  this.$router.push('/login')
                })
              }, 1000)
              this.editFlag = false
            }
          })
        } else {
          // 错误信息提示
          let msg = ''
          if (!this.form.name) {
            msg = window.$vueI18n.t('m.personal.requiredWarning', {inputName: 'Your Name'})
          } else if (this.form.name.length > 30) {
            msg = window.$vueI18n.t('m.personal.lengthError', {inputName: 'Your Name'})
          } else if (!this.form.phone) {
            msg = window.$vueI18n.t('m.personal.requiredWarning', {inputName: 'Phone Number'})
          } else if (this.form.phone.length > 30) {
            msg = window.$vueI18n.t('m.personal.lengthError', {inputName: 'Phone Number'})
          } else if (!this.form.password) {
            msg = window.$vueI18n.t('m.personal.requiredWarning', {inputName: 'Your Password'})
          } else if (this.form.password.length < 6 || this.form.password.length > 30) {
            msg = window.$vueI18n.t('m.personal.passwordLengthError')
          } else if (!this.form.confirmPassword) {
            msg = window.$vueI18n.t('m.personal.requiredWarning', {inputName: 'Confirm Password'})
          } else if (this.form.confirmPassword.length < 6 || this.form.confirmPassword.length > 30) {
            msg = window.$vueI18n.t('m.personal.passwordLengthError')
          }
          this.$message({
            message: msg,
            type: 'error',
            customClass: 'myMessage'
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl";
  @import '~styles/form.styl';
  .personalCenter {
    width: 25.6rem;
    max-width: 80%;
    display inline-block
    margin: 1.2rem auto;
    .myForm {
      text-align: center;
      width: 10rem;
      max-width: 90%;
      margin: 0 auto;
    }
    >>> .panel .title span {
      font-weight: bold;
      font-size: .48rem;
    }
    >>> .el-form-item {
      text-align: left;
      label {
        width: 2.8rem;
        min-width: 120px;
        font-size: .32rem;
        font-weight: bold;
        padding-right: 0;
      }
      .el-input {
        width: 5rem;
      }
    }
    .btnWrap {
       margin-top: .5rem;
       >>> button {
         margin: 0 auto;
         padding: 0 1rem;
       }
      .resetBtn {
        background-color: $resetBtnBgColor;
      }
     .resetBtn:hover, .resetBtn:focus  {
        background-color: $resetBtnBgColor-active;
      }
     }
  }

  @media screen and (max-width: 624px) {
    >>> label {
      text-align: left;
    }
    .personalCenter >>> .el-form-item .el-input {
      width: 100%;
    }
    >>> .el-form-item__content {
      height: 100%;
    }
  }
  @media screen and (max-width: 480px) {
    .personalCenter {
      margin: .5rem auto;
    }
  }
</style>
