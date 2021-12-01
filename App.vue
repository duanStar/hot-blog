<script>
	export default {
		onLaunch: function() {
			// #ifdef MP-WEIXIN
			console.log('微信小程序');
			// #endif
			// #ifdef H5
			console.log('H5');
			// #endif
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss';
	// 设置整个项目的背景色
	page {
		background-color: $uni-white;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
