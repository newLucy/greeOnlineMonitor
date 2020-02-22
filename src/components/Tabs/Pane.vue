<template>
  <transition name="tab-fade-transform" mode="out-in">
    <div v-if="show">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Pane',
  props: {
    title: {
      type: [String, Number],
      required: true
    },
    value: {
      type: [String, Number]
    }
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.updateNav()
  },
  watch: {
    title () {
      this.updateNav()
    }
  },
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  }
}
</script>

<style scoped>

</style>
