<template>
  <div>
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view :key="key"></router-view>
        </keep-alive>
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="stylus" scoped>
  .app-main {
    margin: .3rem auto .3rem;
    min-height: calc(100vh - 3rem);
  }
</style>
<style lang="stylus">
</style>
