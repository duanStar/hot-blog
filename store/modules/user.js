import { login } from '../../api/user.js';
import { TOKEN_KEY, USER_INFO_KEY } from '../../utils/constant.js';

export default {
	namespaced: true,
	state() {
		return {
			token: uni.getStorageSync(TOKEN_KEY) || '',
			userInfo: uni.getStorageSync(USER_INFO_KEY) || {}
		}
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
			this.commit('user/saveToToken');
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			this.commit('user/saveToUserInfo');
		},
		saveToToken(state) {
			uni.setStorage({
				key: TOKEN_KEY,
				data: state.token
			});
		},
		saveToUserInfo(state) {
			uni.setStorage({
				key: USER_INFO_KEY,
				data: state.userInfo
			});
		},
		removeToken(state) {
			state.token = '';
			this.commit('user/saveToToken');
		},
		removeUserInfo(state) {
			state.userInfo = {};
			this.commit('user/saveToUserInfo');
		}
	},
	actions: {
		async login(context, userProfile) {
			const userInfo = userProfile.userInfo;
			const res = await login({
				signature: userProfile.signature,
				iv: userProfile.iv,
				nickName: userInfo.nickName,
				city: userInfo.city,
				province: userInfo.province,
				avatarUrl: userInfo.avatarUrl
			});
			context.commit('setToken', res.token);
			context.commit('setUserInfo', userInfo);
		},
		logout(context) {
			context.commit('removeToken');
			context.commit('removeUserInfo');
		},
		async isLogin(context) {
			if (context.state.token) {
				return true;
			} else {
				const [err, res] = await uni.showModal({
					title: '登陆之后才可以进行后续操作',
					content: '立即跳转到登录页面？(登录后自动返回当前页面哦~~)'
				});
				const {cancel, confirm} = res;
				if (confirm) {
					uni.navigateTo({
						url: '/subpkg/pages/login-page/login-page'
					});
				}
				return false;
			}
		}
	}
}