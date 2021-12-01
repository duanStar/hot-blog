<template>
	<view class="praise-box" @click="onPraiseClick">
		<image :src="isPraise ? '/static/images/praise.png' : '/static/images/un-praise.png'" class="img"></image>
		<text class="txt">点赞</text>
	</view>
</template>

<script>
	import { userPraise } from '../../api/user.js'
	import { mapActions } from 'vuex'
	export default {
		name:"article-praise",
		props: {
			articleId: {
				type: String,
				required: true
			},
			isPraise: {
				type:Boolean,
				required: true
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			...mapActions('user', ['isLogin']),
			async onPraiseClick() {
				const isLogin = await this.isLogin();
				if (!isLogin) {
					return;
				}
				uni.showLoading({
					title: '加载中'
				});
				const res = await userPraise({
					articleId: this.articleId,
					isPraise: !this.isPraise
				});
				this.$emit('changePraise', !this.isPraise);
			}
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
