<template>
	<view class="my-search-container">
		<view class="my-search-box">
			<image class="icon" src="@/static/images/search.png" mode="aspectFit"></image>
			<text class="placeholder">{{placeholderText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
			placeholderText: {
				type: String,
				default: '搜索'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.my-search-container {
		display: flex;
		align-items: center;
		.my-search-box {
			display: flex;
			align-items: center;
			width: 100%;
			height: 36px;
			padding: 0 10px;
			background-color: $uni-white;
			border: 1px solid $uni-base-color;
			border-radius: 15px;
			.icon {
				width: 20px;
				height: 20px;
			}
			.placeholder {
				font-size: 12px;
				margin-left: 5px;
				color: $uni-secondary-color;
			}
		}
	}
</style>
