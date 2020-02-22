<template>
	<div>
		<!--处理ios移动端下拉框失去焦点异常问题-->
		<!--除ios外的设备-->
		<el-select v-if="!isIphone" v-model="org" ref="manageOrg" placeholder="" :popper-append-to-body="true">
			<el-option v-for="item in options" :key="item.key" :label="item.text" :value="item.key">
			</el-option>
		</el-select>
		<!--ios-->
		<select v-else class="orgWrap" v-model="org">
			<option v-for="item in options" :key="item.key" :value="item.key" class="orgOption">
				{{item.text}}
			</option>
		</select>
	</div>
</template>

<script>
export default {
  name: 'CountryBtn',
  data () {
    return {
      org: ''
    }
  },
  watch: {
    org (val) {
      this.$store.commit('dropdown/SET_SELECTEDORG', val)
    },
    options: {
      handler (val) {
        if (val) {
          this.org = val[0] ? val[0].key : ''
        }
      },
      immediate: true
    }
  },
  computed: {
    options () {
      return this.$store.getters.orgs
    },
   	isIphone () {
     	return this.$store.getters.isIphone
   	}
  },
  methods: {
    handleBlur () {
      this.$refs.manageOrg.blur()
    }
  }
}
</script>

<style lang="stylus" scoped>
>>> .el-input {
  .el-input__inner {
    width 3.3rem
    height .8rem
    line-height .8rem
    font-size .4rem
    font-weight bold
    text-align center
    background-color transparent
    border 2px solid white
    border-radius .2rem
    color white
  }
  .el-input__inner:hover, .el-input__inner:visited, .el-input__inner:focus {
    border 2px solid rgba(255, 255, 255, .7)
  }
  .el-select__caret {
    color white
    height .8rem
    line-height .8rem
  }
}
>>> .el-select .el-input.is-focus .el-input__inner {
  border-color: white;
}

/*iphone端*/
.orgWrap {
  	/*width 3rem*/
    height .8rem
    line-height .8rem
    font-size .4rem
    font-weight bold
    text-align center
    background-color transparent
    border 2px solid white
    /*border-radius .2rem*/
    color white
    padding 0 .2rem;
  }
  .orgWrap:hover, .orgWrap:visited, .orgWrap:focus {
    border 2px solid rgba(255, 255, 255, .7)
  }
  .orgOption {
  	color: #666;
  }
</style>
<style lang="stylus">
  body > .el-select-dropdown {
    width: 300px;
  }
</style>