<template>
  <el-table
    :data="tableArray.tableData"
    v-loading="loading"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    :empty-text="$t('m.commonMsg.noRecord')"
  >
    <slot name="startColumn"></slot>
    <el-table-column
      v-for="item in tableArray.tableHeader"
      :key="item.key"
      :label="item.label"
      :prop="item.key"
      :min-width="item.width ? item.width : null"
      align="center"
      :sortable="item.sortable"
    >
      <template slot-scope="scope">
        <slot v-if="item.editFlag && scope.row.editFlag" :name="item.key" :row="scope.row"></slot>
        <span v-else>{{scope.row[item.key]}}</span>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  name: 'index',
  props: ['tableArray', 'loading'],
  data () {
    return {
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'color-row'
      }
      return ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl"
  >>> .color-row {
    background: #ddebff;
  }

  >>> .success-row {
    background: #f0f9eb;
  }
  >>> .el-table__header-wrapper tr th {
    color $darkTextColor
    background-color #e4e4e4
    border-right: 2px solid white
    border-bottom: 1px solid white
  }
  >>> .has-gutter tr th:last-child {
    border-right: none
  }
  >>> td {
    border-color: white;
    border-right: 2px solid white
  }
  >>> td:none {
    border-right: none
  }
</style>
