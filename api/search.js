import request from '../utils/request.js';

export function getDefaultText() {
	return request({
		path: '/search/default-text'
	});
}

export function getSearchHotList() {
	return request({
		path: '/search/hot-list'
	});
}

export function getSearchResult(data) {
  return request({
    path: '/search',
    data
  });
}
