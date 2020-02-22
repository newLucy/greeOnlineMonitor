<template>
  <div class="userName" @click.stop="handleClick">
    <div class="imgWrap">
      <img :src="require('@/assets/icons/user.svg')" alt="">
    </div>
    <!--<p>{{userName}}</p>-->
    <div class="btn">
      <div class="arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: ''
    }
  },
  mounted () {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) {
      this.userName = userInfo.userName
    }
  },
  methods: {
    handleClick () {
      this.$emit('handleClick')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl"
  .userName {
    /*width: 1.8rem;*/
    height: 1rem;
    border-radius: $borderRadius;
    color: #CDCDCD;
    background-color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    .imgWrap {
      margin: 0 .24rem;
      width: .5rem;
      flex-shrink 0
      img {
        width: 100%;
      }
    }
    p {
      flex-grow: 1;
      text-align left
      font-size: .4rem;
      white-space: nowrap;
      overflow: hidden;
    }
    .btn {
      flex-shrink 0
      margin: 0 .24rem 0 0;
      .arrow {
        width: 0;
        height: 0;
        border-top: .2rem solid #CDCDCD;
        border-right: .18rem solid transparent;
        border-bottom: 0 solid transparent;
        border-left: .18rem solid transparent;
      }
    }
  }
</style>
