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
  @import '~styles/variable.styl'
  button {
    height: .8rem;
    min-height: 30px;
    background-color $btnBgColor
    color: white;
    font-size: .32rem;
    display: flex;
    align-items center
    padding: 0 .4rem 0 .4rem;
    border-radius 20px
    cursor: pointer;
    .icon {
      /*font-size: .4rem;*/
      padding-right: .2rem;
    }
  }
  button:focus, button:hover {
    background-color $btnBgColor-active
  }
  img {
     margin-right: .1rem;
      width: 22px;
   }
</style>
