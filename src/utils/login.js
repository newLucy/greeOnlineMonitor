import Aes from './aes.js'
import { login } from '@/api/user'
export default {
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('required!'))
      } else {
        if (this.ruleForm.name !== '') {
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('required!'))
      } else {
        if (this.ruleForm.password !== '') {
        }
        callback()
      }
    }
    return {
      checked: false,
      ruleForm: {
        org: '',
        account: '',
        password: ''
      },
      rules: {
        account: [{ required: true, message: window.$vueI18n.t('m.login.accountWarning'), trigger: 'blur' }],
        password: [{ required: true, message: window.$vueI18n.t('m.login.passwordWarning'), trigger: 'blur' }]
      }
    }
  },
  created () {
    let info = JSON.parse(localStorage.getItem('latestUserAndGroup'))
    if (info) {
      this.ruleForm.account = info.account
      this.ruleForm.org = info.orgId
      this.setOrgPass()
    }
  },
  computed: {
    organizations () {
      let orgs = this.$store.getters.orgs
      return orgs
    },
    menuList () {
      return this.$store.getters.menuList
    },
   	isIphone () {
     	return this.$store.getters.isIphone
   	}
  },
  watch: {
    organizations: {
      handler () {
        if (this.organizations && !this.ruleForm.org) {
          this.ruleForm.org = this.organizations[0].key
        }
      },
      immediate: true
    }
  },
  methods: {
    handleBlur () {
    	if (this.isIphone) {
      	this.$refs.loginOrg.blur()
     	}
    },
    setOrgPass () {
      let account = this.ruleForm.account
      let info = JSON.parse(localStorage.getItem(account))
      if (info) {
        this.ruleForm.org = info.org
        this.ruleForm.password = info.password
        this.checked = true
      } else {
//    	this.ruleForm.org = this.organizations[0].key
        this.ruleForm.password = ''
        this.checked = false
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let orgId = this.ruleForm.org
          let account = this.ruleForm.account.trim()
          let pass = this.ruleForm.password.trim()
          let password = Aes.encrypt(pass)
          let params = {
            account,
            password,
            orgId
          }
          login(params).then(res => {
            if (res) {
              this.$router.push('/')
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              let userAndGroup = {
              	account,
            		orgId
              }
              localStorage.setItem('latestUserAndGroup', JSON.stringify(userAndGroup))
              if (this.checked) {
                let info = {
                  org: orgId,
                  password: pass
                }
                localStorage.setItem(account, JSON.stringify(info))
              } else {
                let storageAccount = localStorage.getItem(account)
                if (storageAccount) {
                  localStorage.removeItem(account)
                }
              }
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
