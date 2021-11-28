<template>
	<view class="comment-item-container">
		<view class="avatar-box">
			<image :src="data.avatar" class="avatar"></image>
		</view>
		<view class="info-box">
			<text class="comment-user">{{data.nickName || data.useName}}</text>
			<text class="comment-info">{{data.content}}</text>
			<text class="comment-time">{{data.postTime|relativeTime}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"article-comment-item",
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.comment-item-container {
		display: flex;
		padding: $uni-spacing-col-lg 0;
		.info-box {
			display: flex;
			flex-direction: column;
			margin-left: $uni-spacing-row-sm;
			.comment-user {
				font-size: $uni-font-size-base;
				font-weight: bold;
				color: $uni-text-color;
			}
			.comment-info {
				margin-top: $uni-spacing-col-sm;
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
			}
			.comment-time {
				margin-top: $uni-spacing-col-sm;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}
		}
	}
</style>
