import request from '../utils/request.js';

export function getArticleDetail(data) {
	return request({
		path: '/article/details',
		data
	});
}

export function getArticleCommentList(data) {
	return request({
		path: '/article/comment/list',
		data
	});
}