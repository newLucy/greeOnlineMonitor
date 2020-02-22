<template>
  <div>
    <div v-if="urls.length > 0">
      <el-image
        v-for="item in urls"
        :key="item"
        :src="item"
        :preview-src-list="urls">
      </el-image>
    </div>
    <div v-else>{{ $t('m.commonMsg.noRecord') }}</div>
  </div>
</template>

<script>
export default {
  name: 'TroubleChart',
  props: ['urls']
}
</script>

<style lang="stylus" scoped>
  >>> .el-image {
    width: 80%;
  }
  >>> .el-image-viewer__mask {
    background-color: white;
    opacity: 1;
  }
</style>
