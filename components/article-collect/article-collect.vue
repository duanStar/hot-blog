<template>
	<view class="collect-box" @click="onCollectClick">
		<image :src="isCollect ? '../../static/images/collect.png' : '../../static/images/un-collect.png'" class="img"></image>
		<text class="txt">收藏</text>
	</view>
</template>

<script>
	import { userCollect } from '../../api/user.js'
	import { mapActions } from 'vuex'
	export default {
		name:"article-collect",
		props: {
			articleId: {
				type: String,
				required: true
			},
			isCollect: {
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
			async onCollectClick() {
				const isLogin = await this.isLogin();
				if (!isLogin) {
					return;
				}
				uni.showLoading({
					title: '加载中'
				});
				const res = await userCollect({
					articleId: this.articleId,
					isCollect: !this.isCollect
				});
				this.$emit('changeCollect', !this.isCollect);
			}
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
