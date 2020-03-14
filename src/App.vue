<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // 因为ie11不执行header中的js代码，所以移动到此处
  beforeCreate () {
  		var agent = navigator.userAgent.toLowerCase()
			console.log(agent)
			let isOpera = agent.indexOf("Opera") > -1
			let res = false
			// 判断ie10及以下版本
			if(agent.indexOf("compatible") > -1 && agent.indexOf("msie") > -1 && !isOpera) {
				res = true
			}
			// 判断ie11 或edge
			else if((agent.indexOf('trident') > -1 && agent.indexOf("rv:11.0") > -1) || agent.indexOf("edge") > -1) {
					res = true
					console.log('ie11/edge')
			}
			// 判断火狐浏览器版本
			else if(agent.indexOf('firefox') > -1) {
				let str = agent.substring(agent.indexOf('firefox'))
				let version = str.match(/\d+/)
				console.log('version', version[0])
				if(version[0] <= 51) {
					res = true
				}
			}
			// 判断谷歌浏览器版本
			else if(agent.indexOf('chrome') > 0) {
				let str = agent.substring(agent.indexOf('chrome'))
				let version = str.match(/\d+/)
				console.log('version', version[0])
				if(version[0] <= 44) {
					res = true
				}
			}
			// 浏览器不兼容
			if(res) {
				let div = `<div style='position:fixed;top:0;left:0;right:0;bottom:0;z-index:100;width:100%;height:100%;background-color:#fff;'>
												<div style="margin-top:100px;padding:50px 0;background-color:#eeefa1;text-align:center;vertical-align:middle;">
													<span style='font-size:18px;line-height:20px;'>It is recommended to update your browers or use another one. </span>
													<img style="width: 50px;vertical-align:middle;margin-left:20px;" src="static/chrome.png"/>
													<img style="width: 50px;vertical-align:middle;margin-left:10px;" src="static/firefox.png"/>
													<img style="width: 50px;vertical-align:middle;margin-left:10px;" src="static/safari.png"/>
												</div>
												<div style="margin-top:50px;color:#ef7e0a;font-weight:bold;text-align:center;font-size:28px;">Your brower has been detected as not able to view HTML5 and CSS3.</div>
										</div>`
				document.write(div)
				// 停止加载
				if(!!(window.attachEvent && !window.opera)) {
					document.execCommand("stop");
				} else {
					window.stop();
				}
			}
  },
  mounted () {
    this.$store.dispatch('device/setIsPC')
    this.$store.dispatch('dropdown/getOrgs')
  }
}
</script>

<style lang="stylus">
@import '~styles/variable.styl'
#app {
  font-family: Arial, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $darkTextColor;
}
.fade-transform-enter-active, .fade-transform-leave-active {
  transition: opacity .5s;
}
.fade-transform-enter, .fade-transform-leave-to {
  opacity: 0;
}
.tab-fade-transform-enter-active, .tab-fade-transform-leave-active {
  transition: opacity .1s;
}
.tab-fade-transform-enter, .tab-fade-transform-leave-to {
  opacity: 0;
}
</style>
