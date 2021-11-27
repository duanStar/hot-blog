<template>
	<view class="empty-data-container">
		<image src="../../static/images/empty-data.png" class="img"></image>
		<text class="txt">暂无数据</text>
	</view>
</template>

<script>
	export default {
		name:"empty-data",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.empty-data-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 35%;
		.img {
			width: 64px;
			height: 64px;
		}
			
		.txt {
			margin-top: $uni-spacing-col-sm;
			color: $uni-text-color-grey;
			font-size: uni-font-size-base;
		}
	}
</style>
