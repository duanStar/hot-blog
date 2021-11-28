<template>
	<view class="collect-box">
		<image src="../../static/images/un-collect.png" class="img"></image>
		<text class="txt">收藏</text>
	</view>
</template>

<script>
	export default {
		name:"article-collect",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.collect-box {
		display: flex;
		align-items: center;
		flex-direction: column;
		.img {
			width: $uni-img-size-base;
			height: $uni-img-size-base;
			color: $uni-text-color;
		}
		.txt {
			font-size: $uni-font-size-sm;
			color: $uni-text-color;
		}
	}
</style>
