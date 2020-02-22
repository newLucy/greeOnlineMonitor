<template>
<!--
  不可在此组件中改变visible，只能在父组件中改变
-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="12rem"
    :before-close="handleBeforeClose"
    @open="handleOpen"
  >
    <div class="body">
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: () => {
        return 'Prompt'
      }
    }
  },
  name: 'MyDialog',
  data () {
    return {}
  },
  methods: {
    handleBeforeClose () {
      this.$emit('beforeClose')
    },
    handleOpen () {
    	this.$emit('handleOpen')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl"
  @import "~styles/form.styl"
  @import "~styles/dialog.styl"
</style>
