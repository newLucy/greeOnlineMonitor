<template>
  <div class="searchPanel">
    <el-form :model="form" :rules="rules" ref="searchPanelForm" @submit.native.prevent="handleSearch">
      <el-form-item :label="$t('m.home.mac')" prop="mac">
          <el-input id="mac" v-model="form.mac" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('m.home.serial')" prop="barcode">
          <el-input id="barcode" v-model="form.barcode" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <button class="searchBtn">{{ $t('m.commonBtn.search') }}</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
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
      form: {
        mac: '',
        barcode: ''
      },
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
  methods: {
    handleSearch () {
      this.$refs.searchPanelForm.validate(valid => {
        if (valid) {
          let mac = this.form.mac.trim()
          let barcode = this.form.barcode.trim()
          if (mac || barcode) {
            this.$router.push({
              path: `/search`,
              query: {
                mac: mac,
                barcode: barcode
              }
            })
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/variable.styl";
/*@import "~styles/form.styl";*/
.searchPanel {
  width: 16.8rem;
  max-width: calc(100% - 3.6rem - 40px);
  display inline-block
  padding: 1.6rem 1.8rem;
  background-color: white;
  border-radius: $borderRadius;
  box-shadow: $shadow;
}
>>> label {
  font-size: .36rem;
  color: $darkTextColor;
}
>>> .el-input {
  box-shadow: $shadow;
}
>>> .el-input,>>> .el-input__inner, >>> .el-input__icon {
    height: .8rem;
    line-height: 100%;
}
>>> .el-form-item__label {
   height: .8rem;
 }
  >>> .el-form-item__error {
    text-align: left;
  }
.searchBtn {
  color: white;
  width: 100%;
  height: 1rem;
  margin-top: 0.8rem;
  border-radius: 25px;
  background-color #2174fe
  font-size: .36rem;
  cursor: pointer;
}

@media screen and (max-width: 366px) {
  .searchPart {
    margin: 1rem auto;
  }
  .searchPanel {
    padding: 1rem 1.8rem;
  }
  >>> .el-form-item {
    margin-bottom: 1rem;
  }
  .searchBtn {
    margin-top: 0.5rem;
  }
}
</style>
