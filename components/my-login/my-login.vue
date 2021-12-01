<template>
	<view class="login-container">
		<block v-if="!token">
			<image src="../../static/images/default-avatar.png" class="avatar avatar-img"></image>
			<view class="login-desc">
				登陆后可同步数据
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<button type="primary" class="login-btn" @click="getUserInfo">微信用户一键登录</button>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<button type="primary" class="login-btn" @click="onAutoLogin">一键登录</button>
			<!-- #endif -->
		</block>
		<block v-else>
			<image :src="userInfo.avatarUrl" class="avatar avatar-img"></image>
			<view class="login-desc">
				{{userInfo.nickName}}
			</view>
			<button type="default" class="login-btn" @click="onLogoutClick">退出登录</button>
		</block>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			...mapActions('user', ['login', 'logout']),
			getUserInfo() {
				uni.showLoading({
					title: '加载中'
				});
				uni.getUserProfile({
					desc: '登陆后可同步数据',
					success: async (res) => {
						await this.login(res);
						this.$emit('onLoginSuccess');
					},
					fail: () => {
						uni.showToast({
							title: '授权已取消',
							icon: 'error',
							mask: true
						});
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
			onLogoutClick() {
				uni.showModal({
					title: '提示',
					content: '退出登录将无法同步数据哦~~',
					success: ({
						confirm,
						cancel
					}) => {
						if (confirm) {
							this.logout();
						}
					}
				});
			},
			async onAutoLogin() {
				uni.showLoading({
					title: '加载中'
				});
				await this.login({
					encryptedData: 'BmGEMqpGI5w',
					errMsg: 'getUserProfile:ok',
					iv: 'c+NbINO4CuEWCBYGG2FxWw==',
					rawData: '{"nickName":"小慕同学","gender":1,"language":"zh_CN","city":"","province":"","country":"China","avatarUrl":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"}',
					signature: '449a10f11998daf680fe546a5176e6e2973516ce',
					userInfo: {
						nickName: '小慕同学',
						gender: 1,
						language: 'zh_CN',
						city: '',
						province: '',
						avatarUrl:"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
					}
				});
				this.$emit('onLoginSuccess');
				uni.hideLoading();
			}
		},
		computed: {
			...mapState('user', ['userInfo', 'token'])
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 25%;

		.avatar-img {
			width: 78px;
			height: 78px;
		}

		.login-desc {
			color: $uni-text-color-grey;
			font-size: $uni-font-size-base;
			margin-top: $uni-spacing-col-xll;
		}

		.login-btn {
			margin-top: $uni-spacing-col-xll;
			width: 85%;
		}
	}
</style>
