<template>
  <div>
    <Top></Top>
    <app-main></app-main>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Top from './components/Top/Top'
import AppMain from './components/AppMain'
import Bottom from './components/Bottom/Bottom'
export default {
  components: {
    Top,
    AppMain,
    Bottom
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
</style>
