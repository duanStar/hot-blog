import request from '../utils/request.js';

export function getHotVideoList(data) {
	return request({
		path: '/video/list',
		data
	});
}

export function getVideoDanmuList(data) {
	return request({
		path: '/video/danmu',
		data
	});
}
