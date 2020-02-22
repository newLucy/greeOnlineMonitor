<template>
  <div class="userManage">
    <my-tabs v-model="active">
      <!--
        value是数据库中的菜单ID
        manageMenu存的也是数据库中菜单的ID，Array
      -->
      <my-pane v-if="manageMenu.indexOf(6) > -1" :title="$t('m.menu[6]')" :value="6">
        <org-management></org-management>
      </my-pane>
      <my-pane v-if="manageMenu.indexOf(7) > -1" :title="$t('m.menu[7]')" :value="7">
        <user-management></user-management>
      </my-pane>
      <my-pane v-if="manageMenu.indexOf(8) > -1" :title="$t('m.menu[8]')" :value="8">
        <user-logs></user-logs>
      </my-pane>
      <my-pane v-if="manageMenu.indexOf(9) > -1" :title="$t('m.menu[9]')" :value="9">
        <feedback></feedback>
      </my-pane>
      <org-btn v-show="isSuperAdmin && showOrg" class="countryBtn" slot="tabsRight"></org-btn>
    </my-tabs>
  </div>
</template>

<script>
import MyTabs from '@/components/Tabs/Tab'
import MyPane from '@/components/Tabs/Pane'
import OrgManagement from './components/OrgManagement/index'
import UserManagement from './components/UserManagement/index'
import UserLogs from './components/UserLogs/index'
import Feedback from './components/Feedback/index'
import OrgBtn from './components/OrgBtn'
export default {
  components: {
    MyTabs,
    MyPane,
    OrgManagement,
    UserManagement,
    UserLogs,
    Feedback,
    OrgBtn
  },
  data () {
    return {
      active: 6,
      isSuperAdmin: false,
      showOrg: false,
      menuID: []
    }
  },
  mounted () {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo && userInfo.groupName === 'Super Admin') {
      this.isSuperAdmin = true
    }
  },
  watch: {
    active (val) {
      this.showOrg = val !== 6
    },
    manageMenu: {
      handler (val) {
        if (val) {
          this.active = val[0]
        }
      },
      immediate: true
    }
  },
  computed: {
    manageMenu () {
      return this.$store.getters.manageMenu
    }
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl"
  .userManage {
    width 28rem
    max-width 90%
    margin .9rem auto
    display inline-block
    >>> .el-tabs__nav-scroll {
      background-color $bgColor
      .el-tabs__item {
        color #3173fb
      }
      .is-active, .el-tabs__item:hover {
        color white
      }
      .el-tabs__active-bar {
        background-color white
        bottom 0
        height .06rem
      }
      .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        padding-left 20px
      }
    }
    >>> .el-tabs__nav-wrap::after {
      height 0
    }
    .countryBtn {
      margin 0 .4rem
    }
  }
</style>
