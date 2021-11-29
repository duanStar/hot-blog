import request from '../utils/request.js';

export function login(data) {
	return request({
		path: '/sys/login',
		data,
		method: 'POST'
	});
}

export function useFollow(data) {
	return request({
		path: '/user/follow',
		data
	});
}

export function userArticleComment(data) {
	return request({
		path: '/user/article/comment',
		data,
		method: 'POST'
	});
}

export function userPraise(data) {
	return request({
		path: '/user/praise',
		data
	});
}

export function userCollect(data) {
	return request({
		path: '/user/collect',
		data
	});
}
