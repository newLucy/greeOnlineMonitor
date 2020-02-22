<template>
  <button :style="{backgroundColor: bgColor, color: color}">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Btn',
  props: ['bgColor', 'color'],
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
button {
  padding: 2px 0;
  width: 100px;
  text-align center
  color: white;
  cursor pointer
  white-space nowrap
}
button:hover, button:focus {
  opacity: .8;
}
</style>
