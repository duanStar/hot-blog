<template>
	<view class="comment-container" :style="{
		bottom: bottom + 'px'
	}">
		<uni-easyinput v-model="value" type="textarea" placeholder="说点什么..." :maxlength="1000" :inputBorder="false"></uni-easyinput>
		<button size="mini" type="primary" class="commit" :disabled="!value" @click="onBtnClick">发送</button>
	</view>
</template>

<script>
	import { userArticleComment } from '../../api/user.js'
	export default {
		name:"article-comment-commit",
		props: {
			articleId: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				value: '',
				bottom: 0
			};
		},
		methods: {
			async onBtnClick() {
				uni.showLoading({
					title: '加载中'
				});
				const res = await userArticleComment({
					articleId: this.articleId,
					content: this.value
				});
				uni.showToast({
					title: '发表成功',
					icon: 'success',
					mask: true
				});
				this.$emit('success', res);
			}
		},
		created() {
			uni.onKeyboardHeightChange(function({height}){
				this.bottom = height;
			});
		}
	}
</script>

<style lang="scss" scoped>
	.comment-container {
		display: flex;
		flex-direction: column;
		background-color: $uni-white;
		text-align: right;
		padding: $uni-spacing-col-lg;
		position: relative;
		.commit {
			margin-left: 0;
			margin-right: 0;
			// width: 25%;
			align-self: flex-end;
		}
	}
</style>
