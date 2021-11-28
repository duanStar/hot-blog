<template>
	<view class="praise-box">
		<image src="../../static/images/un-praise.png" class="img"></image>
		<text class="txt">点赞</text>
	</view>
</template>

<script>
	export default {
		name:"article-praise",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.praise-box {
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
