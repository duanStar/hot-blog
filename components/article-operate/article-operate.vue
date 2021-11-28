<template>
	<view class="operate-container">
		<view class="comment-box">
			<my-search :placeholderText="'评论一句,前排打call...'" :config="{
				icon: '/static/images/input-icon.png',
				height: 28,
				backgroundColor: '#eeedf4',
				textColor: '#a6a5ab',
				border: 'none'
			}"></my-search>
		</view>
		<view class="options-box">
			<article-praise></article-praise>
		</view>
		<view class="options-box">
			<article-collect></article-collect>
		</view>
	</view>
</template>

<script>
	export default {
		name:"article-operate",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.operate-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		background-color: $uni-white;
		padding: 4px 6px 15px 6px;
		border-top: 1px solid $uni-text-color-grey;
		.comment-box {
			flex-grow: 2;
		}
		.options-box {
			flex-grow: 1;
		}
	}
</style>
