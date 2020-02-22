<template>
  <div>
    <search-panel class="searchPart"></search-panel>
  </div>
</template>

<script>
import SearchPanel from './components/SearchPanel'
export default {
  components: {
    SearchPanel
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
.searchPart {
  margin: 2.2rem auto;
}
</style>
