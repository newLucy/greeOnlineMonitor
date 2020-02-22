<template>
  <div class="top">
    <div class="logoWrap">
      <img :src="require('@/assets/icons/lianyun.png')" alt="logo">
    </div>
    <h1>GREE ONLINE MONITORING</h1>
    <div class="userNameComp">
      <right-top-btn id="userName" @handleClick="handleClick"></right-top-btn>
    </div>
    <transition name="fade-transform" mode="out-in">
      <my-menu v-show="showFlag" id="menuComp"></my-menu>
    </transition>
  </div>
</template>

<script>
import MyMenu from './Menu.vue'
import RightTopBtn from './RightTopBtn.vue'
export default {
  components: {
    MyMenu,
    RightTopBtn
  },
  data () {
    return {
      showFlag: false
    }
  },
  mounted () {
    window.addEventListener('click', (event) => {
    	let target = event.target
      let id = target.id
      let className = target.className
      if (id !== 'userName' && className !== 'menu-userName') {
        this.showFlag = false
      }
    })
  },
  methods: {
    handleClick () {
      this.showFlag = !this.showFlag
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variable.styl'
  /*position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;*/
  .top {
    height: 1.8rem;
    background-color: $bgColor;
    box-shadow: 0 .1rem .3rem rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    .logoWrap {
      margin-left: 1rem;
      width: 2.6rem;
      flex-shrink: 0;
      img {
        width: 100%;
      }
    }
    h1 {
      font-size: .4rem;
      font-weight: 700;
      color: white;
      margin-left: .4rem;
    }
    .userNameComp {
      flex-grow: 1;
      > div {
        float: right;
        margin-right: 1rem;
      }
    }
    #menuComp {
      position: absolute;
      right: .3rem;
      top: 2rem;
      z-index: 2;
    }
  }

  @media screen and (max-width: 700px) {
    .top .logoWrap {
      margin-left: .3rem;
    }
    .top .userNameComp > div {
      margin-right: .3rem;
    }
  }
</style>
