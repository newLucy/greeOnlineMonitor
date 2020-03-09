<template>
  <div class="bg">
  	<div style="width: 2.5rem; margin: 1rem 0 0 1rem;"><img src="@/assets/icons/lianyun-logo.png" alt="" style="width:100%;"/></div>
    <div class="loginbox">
      <div class="logintop">
        <div class="title">Hello,</div>
        <p>Welcome to the system.</p>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <p class="logotitle">{{ $t('m.login.h1') }}</p>
        <el-form-item>
          <el-select v-model="ruleForm.org" style="width: 100%;" clearable :placeholder="$t('m.login.groupSelect')" :popper-append-to-body="false">
<!--            <template v-for="item in organizations">-->
<!--              <el-tooltip :key="item.key" class="item" effect="dark" :content="item.text" placement="top" :open-delay="500">-->
<!--                <el-option :label="item.text" :value="item.key">-->
<!--                </el-option>-->
<!--              </el-tooltip>-->
<!--            </template>-->
<!--            <el-tooltip class="item" effect="dark" :content="item.text" placement="top">-->
              <el-option v-for="item in organizations" :key="item.key" :label="item.text" :value="item.key" :title="item.text">
              </el-option>
<!--            </el-tooltip>-->
          </el-select>
        </el-form-item>
        <el-form-item  prop="account">
          <el-input type="name" v-model="ruleForm.account" @input="setOrgPass" :placeholder="$t('m.login.account')" ref="accountPC" autocomplete="off" class="myinput">
            <img slot="prefix" src="~@/./assets/icons/user.svg">
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input type="password" v-model="ruleForm.password" :placeholder="$t('m.login.password')" ref="passPC" class="myinput" show-password @keypress.enter.native="submitForm('ruleForm')">
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
  </div>
</template>
<script>
import loginJS from '@/utils/login.js'
export default ({
  name: 'pcLogin',
  mixins: [loginJS],
  mounted () {
    if (this.ruleForm.name === '') {
      this.$refs.accountPC.focus()
    } else if (this.ruleForm.pass === '') {
      this.$refs.passPC.focus()
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
    .loginbox {
      width: 698px;
      height: 405px;
      box-shadow: 7px 7px 5px 0px rgba(34, 102, 170, 0.5);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #c4c4c4;
      border-radius: 28px;
      background-size: 50% 50%;
      background:url("~@/assets/images/back2.png") center no-repeat;
      .logintop {
        width: 198px;
        height: 345px;
        float: left;
        padding: 30px;
        color: #fff;
        .title {
          font-size: 24px;
          text-align: left;
          margin-bottom: 10px;
        }
        p {
          text-align: left;
          font-size: 14px;
          line-height: 25px;
        }
      }
      .demo-ruleForm {
        padding:25px 60px;
        width: 320px;
        height: 355px;
        float: left;
        .logotitle {
          font-size: 22px;
          line-height: 30px;
          color: #4367f5;
          margin: 10px auto 20px;
        }
        >>> .el-form-item {
          margin: 25px 0 20px;
        }
        >>> .el-select .el-input__inner {
          font-weight: bold;
        }
        .remember {
          text-align: right;
        }
        >>> .loginbt {
          width: 100%;
          margin-top: 25px;
        }
      }
    }
  }
  >>> .el-select-dropdown {
    position: absolute !important;
    top: 1rem !important;
    left: 0 !important;
    text-align: left;
    width:300px;
  }
</style>
