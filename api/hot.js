import request from '../utils/request.js';

export function getHotTabs() {
	return request({
		path: '/hot/tabs'
	});
}

export function getHotListFromTabType(type) {
	return request({
		path: '/hot/list',
		data: {
			type
		}
	});
}