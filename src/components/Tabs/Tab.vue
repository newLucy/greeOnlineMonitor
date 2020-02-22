<template>
  <div class="tabsWrap">
    <div class="header">
      <!--左移动-->
      <div class="nav-prev" v-show="scroll" @click="handleClickLeft">
        <span>&lt;</span>
      </div>
      <!--  头部    -->
      <div class="tabs" ref="tabs">
        <div class="tabsInner">
          <span v-for="item in navList" :key="item.value" @click="doClick(item.value)" :class="{tab: true, active: active === item.value}">{{item.title}}</span>
        </div>
      </div>
      <!--右移动-->
      <div class="nav-right" v-show="scroll" @click="handleClickRight">
        <span>&gt;</span>
      </div>
      <!--右移动右边添加部分-->
      <slot name="tabsRight"></slot>
    </div>
    <!--内容部分-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: ['value'],
  data () {
    return {
      navList: [],
      active: this.value,
      scroll: false,
      tabsEle: null,
      tabsInner: null,
      allTabWidth: 0, // 所有tab宽度和
      t: null
    }
  },
  mounted () {
    this.tabsInner = document.getElementsByClassName('tabsInner')[0]
    this.tabsEle = this.$refs.tabs
    let t = setInterval(() => {
      if (this.getPane().length > 0) {
        clearInterval(t)
        this.doClick(this.active || this.navList[0].value)
        this.setScroll()
      }
    }, 10)
  },
  activated () {
    // 进入页面挂载
    window.onresize = () => {
      // 降低浏览器负荷
      if (this.t) {
        clearTimeout(this.t)
      }
      this.t = setTimeout(() => {
      	console.log('resize')
        this.myAnimate()
      }, 200)
    }
  },
  deactivated () {
    // 离开页面解挂
    window.onresize = null
  },
  watch: {
    value (val) {
      this.active = val
      this.doClick(val)
    },
    active (val) {
      this.$emit('input', val)
    }
  },
  computed: {
  },
  methods: {
    setScroll () {
      // 获取tabs父元素的宽度
      let tabsWidth = this.tabsEle.offsetWidth
      // 获取所有tab的宽度总和
      this.allTabWidth = this.tabsInner.offsetWidth
      // 所有tab宽度总和大于父元素宽度时，显示滚动按钮
      this.scroll = tabsWidth - this.allTabWidth < 0
      // 重新设置滚动位置为0
//    this.tabsInner.style.left = 0
    },
    handleClickLeft () {
      let tabsWidth = this.tabsEle.offsetWidth
      let nowLeft = this.tabsInner.style.left
      let nowIntLeft = parseInt(nowLeft) || 0
      let val = nowIntLeft + tabsWidth
      let lf = val >= 0 ? '0px' : `${val}px`
      this.setAnimate(lf)
    },
    handleClickRight () {
      let tabsWidth = this.tabsEle.offsetWidth
      let nowLeft = this.tabsInner.style.left
      let nowIntLeft = parseInt(nowLeft) || 0
      let val = nowIntLeft - tabsWidth
      let lf = val - tabsWidth > parseInt(`-${this.tabsInner.offsetWidth}`) ? val : -(this.tabsInner.offsetWidth - tabsWidth)
      this.setAnimate(lf)
    },
    setAnimate (lf) {
      this.$velocity(this.tabsInner, {
        left: lf
      }, {
        duration: 200
      })
    },
    getPane () {
      return this.$children.filter(item => {
        return item.$options._componentTag === 'my-pane'
      })
    },
    getList () {
      let list = []
      this.getPane().forEach(item => {
        let value = item.value
        let title = item.title
        list.push({
          value: value || title,
          title: title
        })
      })
      return list
    },
    updateNav () {
      this.navList = this.getList()
    },
    doClick (targetValue) {
      this.getPane().forEach(item => {
        if (item.value === targetValue || item.title === targetValue) {
          item.show = true
          this.active = item.value || item.title
        } else {
          item.show = false
        }
      })
      this.$nextTick(() => {
//      let shortLeft = 0// shortLeft距离父元素左边距离
//      let longLeft = 0 // longLeft本元素右边距离父元素左边距离
//      let left = parseInt(this.tabsInner.style.left) || 0
//      let tabsWidth = this.tabsEle.offsetWidth
//      for (let i = 0, len = this.tabsInner.children.length; i < len; i++) {
//        let ele = this.tabsInner.children[i]
//        let computedStyle = document.defaultView.getComputedStyle(ele, null)
//        let width = ele.offsetWidth
//        if (ele.className.indexOf('active') > -1) {
//          longLeft = shortLeft + width + parseInt(computedStyle.marginLeft) * 2
//          break
//        }
//        shortLeft = shortLeft + width + parseInt(computedStyle.marginLeft) * 2
//      }
//      if (-left > shortLeft) { // 往左移动情况
//        this.setAnimate(-shortLeft + 'px')
//      }else if (longLeft > -left + tabsWidth) {
//        this.setAnimate(-longLeft + tabsWidth + 'px')
//      }
				this.myAnimate()
      })
      this.$emit('changeTab', targetValue)
   },
   myAnimate () {
   	// 先将左右滚动键显示出来，因为左右滚动的动画需要计算出左右滚动键显示出来后的tabsEle的宽度
      	this.setScroll()
      	this.$nextTick(() => {
      		let shortLeft = 0// shortLeft距离父元素左边距离
	        let left = parseInt(this.tabsInner.style.left) || 0
	        let tabsInnerWidth = this.tabsInner.offsetWidth
	        let tabsWidth = this.tabsEle.offsetWidth
	        for (let i = 0, len = this.tabsInner.children.length; i < len; i++) {
	          let ele = this.tabsInner.children[i]
	          let computedStyle = document.defaultView.getComputedStyle(ele, null)
	          let width = ele.offsetWidth
	          if (ele.className.indexOf('active') > -1) {
	            break
	          }
	          shortLeft = shortLeft + width + parseInt(computedStyle.marginLeft) * 2
	        }
	        if (tabsInnerWidth - tabsWidth > 0) {
						if (shortLeft <= tabsInnerWidth - tabsWidth) {
							this.setAnimate(-shortLeft + 'px')
						} else {
							this.setAnimate(- tabsInnerWidth + tabsWidth + 'px')
						}
					} else {
						this.setAnimate('0px')
					}
      	})
   }
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/variable.styl"
.tabsWrap {
  user-select none
  .header {
    font-size: .4rem;
    text-align left
    height 1.6rem
    color: $btnBgColor
    background-color $bgColor
    border-radius $borderRadius $borderRadius 0 0
    display: flex;
    align-items center
    overflow hidden
    .nav-prev, .nav-right {
      width: 1rem;
      height: 100%;
      display flex
      align-items center
      justify-content center
    }
    .nav-prev, .nav-right {
      cursor: pointer;
    }
    .nav-prev {
      float:left;
    }
    .nav-right {
      float: right;
    }
    .tabs {
      overflow hidden
      position relative
      height 100%
      width: 100%;
      .tabsInner {
        white-space nowrap
        position: absolute;
        span {
          display inline-block
          padding .6rem .4rem
          margin 0 .4rem
          cursor: pointer;
          position relative
        }
        .active {
          color: white;
        }
        .active:after {
          content: '';
          position: absolute;
          left 0
          bottom 0
          height: .1rem;
          width: 100%;
          background-color white
        }
      }
    }
  }
  .content {
    background-color white
    padding .8rem .6rem
  }
}
</style>
