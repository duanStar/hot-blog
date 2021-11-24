const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api';

function request({ path, data, method }) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + path,
			method,
			data,
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
			}
		});
	});
}

export default request;