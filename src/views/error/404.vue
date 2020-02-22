<template>
  <div class="wrap">
    <h1>{{$t('m.error404.h1')}}</h1>
    <h3>{{$t('m.error404.h3')}}</h3>
    <p>{{$t('m.error404.p')}}</p>
    <router-link to="/home"><round-btn style="margin: 0 auto;">{{$t('m.error404.backBtn')}}</round-btn></router-link>
  </div>
</template>

<script>
import RoundBtn from '@/components/FormElement/RoundBtn'
export default {
  name: 'notExist',
  components: {
    RoundBtn
  }
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
    margin-bottom: .5rem;
  }
  p {
    font-size: .24rem;
    line-height: .4rem;
    color: gray;
    margin-bottom: 1rem;
  }
}
</style>
