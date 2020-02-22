<template>
  <div class="panel">
    <div class="title">
      <span>{{title}}</span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  name: 'panel'
}
</script>

<style lang="stylus" scoped>
@import '~styles/variable.styl';
.panel {
  text-align left
  margin: 0 auto;
  box-shadow: $shadow
  .title {
    padding: .3rem 1rem;
    font-size: .4rem;
    color: white;
    background-color $bgColor
    text-align left
    vertical-align middle
    border-radius: $borderRadius $borderRadius 0 0;
  }
  .content {
    padding: .8rem 1rem;
    background-color white
  }
}
</style>
