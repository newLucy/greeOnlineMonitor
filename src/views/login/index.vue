<template>
  <div>
    <!--
		    宽度<700:DeviceSmall.vue
		    宽度>700:DeviceBig.vue
    -->
    <device-big v-if="showBig"></device-big>
    <device-small v-else></device-small>
  </div>
</template>

<script>
import DeviceBig from './components/DeviceBig'
import DeviceSmall from './components/DeviceSmall'
export default {
  name: 'login',
  components: {
    DeviceBig,
    DeviceSmall
  },
  data () {
    return {
      showBig: true
    }
  },
  created () {
    this.setLoginPage()
    window.onresize = () => {
      this.setLoginPage()
    }
  },
  activated () {
    this.setLoginPage()
  },
  deactivated () {
    window.onresize = null
  },
  methods: {
    setLoginPage () {
      let width = window.innerWidth
      if (width <= 700) {
        this.showBig = false
      } else {
        this.showBig = true
      }
    }
  }
}
</script>

<style scoped>

</style>
