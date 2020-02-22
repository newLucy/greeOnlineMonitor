<template>
  <div class="wrap">
    <h1>401</h1>
    <h2>{{$t('m.error401.h1')}}</h2>
    <h3>{{$t('m.error401.h3')}}</h3>
    <p>{{$t('m.error401.p')}}</p>
    <router-link to="/home" class="backLink">{{$t('m.error401.toHome')}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'noPermission'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variable.styl';
  .wrap {
    width: 300px;
    max-width: 80%;
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%, 0);
    /*text-align: left;*/
    h1 {
      font-size: 1rem;
    }
    h2 {
      font-size: .62rem;
      font-weight: bold;
      color: $btnBgColor;
      margin-bottom: .8rem;
    }
    h3 {
      color: #222;
      font-size: .4rem;
      font-weight: bold;
      line-height: .5rem;
      margin-bottom: .3rem;
    }
    p {
      font-size: .24rem;
      line-height: .4rem;
      color: gray;
      margin-bottom: .5rem;
    }
    .backLink {
      font-size: .3rem;

    }
  }
</style>
