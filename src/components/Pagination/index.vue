<template>
  <el-pagination
    class="myPagination"
    background
    layout="prev, pager, next"
    :page-size="pageData.pageSize"
    :current-page="pageData.currentPage"
    :total="pageData.total"
    @current-change="handlePageChange"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'pagination',
  props: ['pageData'],
  methods: {
    handlePageChange (val) {
      this.$emit('handlePageChange', val)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .myPagination {
    margin-top: .8rem;
  }
  >>> .btn-next, >>> .btn-prev, >>> .el-pager li {
    border: 1px solid #ddd !important;
    background-color: transparent !important;
    border-radius: 5px !important;
    font-weight: normal;
  }
  >>> .el-pager li:not(.disabled).active {
    background-color: #409EFF !important;
    border: none !important;
    color: #FFF;
  }
</style>
