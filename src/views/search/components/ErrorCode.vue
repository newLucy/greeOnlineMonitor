<template>
  <div>
    <el-tabs v-show="showTab" v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in errorCodeInfo" :key="item.code" :label="item.code" :name="item.code">
        <div class="errorInfoWrap">
          <p class="errorCode">{{item.code}}</p>
          <div class="errorInfo">
            <p>Malfunction name: <span>{{item.name || 'null'}}</span></p>
            <p>Origin of malfunction signal: <span>{{item.signal || 'null'}}</span></p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div v-show="!showTab" style="text-align: center;">{{ $t('m.commonMsg.noRecord')}}</div>
  </div>
</template>

<script>
export default {
  name: 'ErrorCode',
  props: ['errorCodeInfo'],
  data () {
    return {
      active: '',
      showTab: false
    }
  },
  watch: {
    errorCodeInfo: {
      handler (val) {
        if (val.length > 0) {
          this.showTab = true
          this.active = val[0].code
        } else {
          this.showTab = false
          this.active = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    handleClick (tab) {
      this.$emit('changeTab', tab.index)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variable.styl'
  .errorInfoWrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .errorCode {
      font-size: 1rem;
      color: black;
    }
    .errorInfo {
      padding-left: .5rem;
      flex-grow: 1;
      p {
        min-height: .5rem;
        line-height: .5rem;
        span {
          color: $bgColor;
        }
      }
    }
  }

  // 重写tabs样式
  .el-tabs--card >>> .el-tabs__header {
    border: 0 !important;
  }
  >>> .el-tabs__nav {
    border: 0 !important;
  }
  >>> .el-tabs__item {
    border: 1px solid $bgColor !important;
    margin-right: .8rem;
    height: .6rem;
    line-height: .6rem;
    border-radius: .1rem;
    padding: 0 .3rem;
    color: $bgColor;
  }
  >>> .el-tabs__nav-prev, >>> .el-tabs__nav-next {
    height: .6rem;
    line-height: .6rem;
  }
  >>> .el-tabs__nav:last-child {
    margin-right: 0;
  }
  >>> .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:last-child {
    padding: 0 .3rem;
  }
  >>> .el-tabs__item.is-active {
    background-color: $bgColor;
    color: white;
  }
</style>
