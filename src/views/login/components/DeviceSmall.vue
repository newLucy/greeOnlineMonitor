<template>
  <div class="bg">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      	<div><img src="@/assets/icons/lianyun-logo-shadow.png" alt="" style="width:2.88rem; margin-top: -4rem;"/></div>
        <p class="logotitle">GREE ONLINE MONITORING</p>
        <el-form-item>
          <el-select v-model="ruleForm.org" ref="loginOrg" @blur="handleBlur" style="width: 100%;" clearable :placeholder="$t('m.login.groupSelect')" :popper-append-to-body="false">
<!--            <template v-for="item in organizations">-->
<!--              <el-tooltip :key="item.key" class="item" effect="dark" :content="item.text" placement="top" :open-delay="500" :hide-after="1">-->
<!--                <el-option :label="item.text" :value="item.key">-->
<!--                </el-option>-->
<!--              </el-tooltip>-->
<!--            </template>-->

            <el-option v-for="item in organizations" :key="item.key" :label="item.text" :value="item.key" :title="item.text">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="account">
          <el-input type="name" v-model="ruleForm.account" @input="setOrgPass" :placeholder="$t('m.login.account')" ref="accountPhone" autocomplete="off" class="myinput">
            <img slot="prefix" src="~@/./assets/icons/user.svg">
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input type="password" v-model="ruleForm.password" :placeholder="$t('m.login.password')" ref="passPhone" class="myinput" show-password @keypress.enter.native="submitForm('ruleForm')">
            <img slot="prefix" src="~@/./assets/icons/password.svg">
          </el-input>
        </el-form-item>
        <div>
          <div class="remember">
            <el-checkbox v-model="checked" @click.native.prevent="handleRememberMe">{{ $t('m.login.remember') }}</el-checkbox>
          </div>
          <el-button round type="primary" @click="submitForm('ruleForm')" class="loginbt">{{ $t('m.login.login') }}</el-button>
        </div>
      </el-form>
  </div>
</template>
<script>
import loginJS from '@/utils/login.js'
export default ({
  name: 'phoneLogin',
  mixins: [loginJS],
  mounted () {
    if (this.ruleForm.account === '') {
      this.$refs.accountPhone.focus()
    } else if (this.ruleForm.password === '') {
      this.$refs.passPhone.focus()
    }
  },
  methods: {
    handleRememberMe (val) {
    	this.checked = !this.checked
    }
  }
})
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  /*@import "~styles/form.styl"*/
  .bg {
    position: fixed;
    height: 100%;
    width: 100%;
    color: #545454;
    background-size: 100% 100%;
    background:url("~@/assets/images/bg.png") center;
    .demo-ruleForm {
      padding: .8rem 1.2rem 1rem;
      width: calc(100% - 2.4rem);
      float: left;
      background-color: white;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .logotitle {
        font-size: .56rem;
        line-height: .7rem;
        color: #4367f5;
        margin: .2px auto .4px;
      }
      >>> .el-form-item {
        margin-top: .8rem;
      }
      >>> .el-select .el-input__inner {
        font-weight: bold;
      }
      .remember {
        text-align: right;
      }
      >>> .loginbt {
        width: 100%;
        margin-top: 1rem;
      }
    }
  }
  >>> .el-select-dropdown {
    position: absolute !important;
    top: 1rem !important;
    left: 0 !important;
    text-align: left;
    width:100%;
  }
</style>
