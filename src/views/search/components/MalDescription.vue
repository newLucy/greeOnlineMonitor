<template>
  <div>
    <div v-show="malInfo" class="info">
      {{malInfo}}
    </div>
    <div v-show="!malInfo" class="tips">{{ $t('m.commonMsg.noRecord') }}</div>
  </div>
</template>

<script>
export default {
  name: 'MalDescription',
  props: ['malInfo']
}
</script>

<style scoped>
.info {
  text-align: left;
}
.tips {
  text-align: center;
}
</style>
