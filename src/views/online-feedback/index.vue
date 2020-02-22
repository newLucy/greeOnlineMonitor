<template>
  <div class="feedback">
    <my-tabs v-model="active">
      <my-pane :title="$t('m.onlineFeedback.title')" value="1">
        <el-input
          ref="textareaInput"
          type="textarea"
          :placeholder="$t('m.onlineFeedback.placeholder')"
          v-model="text"
          maxlength="2000"
          show-word-limit
        >
        </el-input>
        <div class="btnWrap">
          <round-btn @click.native="handleSubmit">
            {{ $t('m.commonBtn.submit') }}
          </round-btn>
        </div>
      </my-pane>
    </my-tabs>
  </div>
</template>

<script>
import MyTabs from '@/components/Tabs/Tab'
import MyPane from '@/components/Tabs/Pane'
import RoundBtn from '@/components/FormElement/RoundBtn'
import { addFeedbackInfo } from '@/api/onlineFeedback'
export default {
  components: {
    RoundBtn,
    MyTabs,
    MyPane
  },
  data () {
    return {
      active: '1',
      text: ''
    }
  },
  methods: {
    handleSubmit () {
      addFeedbackInfo({feedback: this.text.trim()}).then(res => {
        if (res) {
          this.$message({
            message: 'Thank you for your feedback',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('/home')
          }, 1000)
          this.text = ''
        }
      }).catch()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl"
  .feedback {
    width 28rem
    max-width 90%
    margin .9rem auto
    display inline-block
    >>> textarea {
      height: 6rem;
    }
    .btnWrap {
      margin-top: .5rem;
      >>> button {
        margin: 0 auto;
        padding: 0 1rem;
      }
    }
  }
</style>
