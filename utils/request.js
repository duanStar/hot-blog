const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api';
import store from '../store';

function request({ path, data, method }) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + path,
			method,
			data,
			header: {
				Authorization: store.state.user.token
			},
			success({ data, statusCode, header }) {
				if (data.success) {
					resolve(data.data);
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none',
						mask: true,
						duration: 3000
					});
					reject(data.message);
				}
			},
			fail(err) {
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
}

export default request;