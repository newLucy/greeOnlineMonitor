<template>
  <el-form :model="form" :rules="rules" ref="searchForm" @submit.native.prevent="handleSearch" inline style="overflow: hidden; text-align: left">
    <el-form-item label="MAC Address" prop="mac">
      <el-input v-model="form.mac" clearable placeholder="12-digit,Letters/Numbers"></el-input>
    </el-form-item>
    <el-form-item label="Serial Number" prop="barcode">
      <el-input v-model="form.barcode" clearable placeholder="13-digit,Numbers"></el-input>
    </el-form-item>
    <el-form-item class="btns">
      <search-btn>
        <i slot="icon" class="el-icon-search icon"></i>
        {{ $t('m.commonBtn.search') }}
      </search-btn>
    </el-form-item>
    <el-form-item class="downloadBtn btns">
      <download-btn @click.native.prevent="handleDownload">
<!--        <i class="el-icon-search"></i>-->

        <img  src="~@/./assets/icons/download.svg" alt="">
        {{ $t('m.search.downloadBtn') }}
      </download-btn>
    </el-form-item>
  </el-form>
</template>

<script>
import SearchBtn from '@/components/FormElement/SearchBtn/index'
import DownloadBtn from '@/components/FormElement/RoundWhiteBtn/index'
export default {
  name: 'searchForm',
  props: ['value'],
  components: {
    SearchBtn,
    DownloadBtn
  },
  data () {
    let macValidator = (rule, value, callback) => {
      let val = value.trim()
      if (val && !/^[0-9A-Za-z]{12}$/.test(val)) {
        return callback(new Error(window.$vueI18n.t('m.home.macWarning')))
      } else {
        callback()
      }
    }
    let barcodeValidator = (rule, value, callback) => {
      let val = value.trim()
      if (val && !/^[0-9]{13}$/.test(val)) {
        return callback(new Error(window.$vueI18n.t('m.home.serialWarning')))
      } else {
        callback()
      }
    }
    return {
      form: this.value,
      rules: {
        mac: [
          {validator: macValidator, trigger: 'blur'}
        ],
        barcode: [
          {validator: barcodeValidator, trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    value (val) {
      this.form = val
    },
    form (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleSearch () {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          if (this.form.mac || this.form.barcode) {
            let form = {
              mac: this.form.mac.trim(),
              barcode: this.form.barcode.trim()
            }
            this.$emit('handleSearch', form)
          } else {
            this.$message({
              message: window.$vueI18n.t('m.home.conditionMsg'),
              type: 'warning'
            })
          }
        } else {
          return false
        }
      })
    },
    handleDownload () {
      this.$emit('handleDownload', this.form)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/form.styl';
  .downloadBtn {
    float: right;
    margin-right: 0;
  }
  >>> .el-form-item {
    margin-bottom: .8rem;
  }
  .btns {
    margin-bottom: .2rem;
  }
</style>
