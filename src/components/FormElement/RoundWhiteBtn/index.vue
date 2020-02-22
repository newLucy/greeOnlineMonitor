<template>
  <button>
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="stylus" scoped>
@import "~styles/variable.styl"
button {
  height: .8rem;
  min-height: 30px;
  padding: 0 .4rem;
  font-size: .32rem;
  color: $btnBgColor;
  background-color transparent;
  border-radius: 20px;
  border: 1px solid $btnBgColor;
  cursor: pointer;
}
button:focus, button:hover {
  background-color rgba(99,155,255,.2)
}
img {
  margin-right: .1rem;
}
</style>
