<template>
  <div class="menu">
  	<div class="menu-userName">Hi,{{userName}}!</div>
    <router-link v-for="menu in menuList" :key="menu.path" :to="menu.path" tag="div" :class="{active: active === menu.path}">
      {{$t(`m.menu[${menu.id}]`)}}
    </router-link>
    <div @click="handleClick" :class="{active: active === 'Exit'}">{{ $t('m.logout') }}</div>
  </div>
</template>

<script>
import { logout } from "@/api/user"

export default {
  data () {
    return {
      active: '',
      userName: '',
      // menuList: []
    }
  },
  mounted () {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) {
      this.userName = userInfo.userName
    }
  },
  computed: {
    menuList () {
      return this.$store.getters.menuList
    }
  },
  watch: {
    $route: {
      handler (route) {
        let path = route.path
        this.active = path
      },
      immediate: true
    }
  },
  methods: {
    handleClick () {
      logout().then(res => {
        if (res) {
          this.$store.commit('menu/CLEAR_MENUINFO')
          this.$router.push('/login')
        } else {
          this.$message({
            message: 'Failed!',
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
  @import '~styles/variable.styl'
  .menu {
    width: 5rem;
    /*height: 5.4rem;*/
    background-color #fff;
    box-shadow: .1rem .1rem .3rem rgba(0, 0, 0, 0.35);
    display flex;
    flex-wrap: wrap;
    border-radius $borderRadius
    font-size: .32rem;
    user-select: none;
    :first-child {
    	color: #ccc;	
    }
    > div {
      margin: 0 .5rem
      vertical-align middle
      width: 100%;
      height: 1.3rem;
      line-height 1.3rem
      border-bottom: 0.02rem solid #ccc;
	    overflow: hidden;
	    text-overflow: ellipsis;
    }
    > div:not(:first-child) {
    	cursor: pointer;
    }
    > div:not(:first-child):hover, .active {
      color: #2174fe;
    }
    > :last-child {
      border-bottom: none;
    }
  }
</style>
