import { STORAGE_KEY, HISTORY_MAX } from '../../utils/constant.js';

export default {
	namespaced: true,
	state: () => {
		return {
			searchData: uni.getStorageSync(STORAGE_KEY) || []
		}
	},
	mutations: {
		/*持久存储*/
		saveToStorage(state) {
			uni.setStorage({
				key: STORAGE_KEY,
				data: state.searchData
			});
		},
		/*添加数据*/
		addSearchData(state, val) {
			if (!val) return;
			const index = state.searchData.indexOf(val);
			if ( state.searchData.indexOf(val) !== -1) {
				state.searchData.splice(index, 1);
			}
			state.searchData.unshift(val);
			/*设置最大缓存数*/
			if (state.searchData.length > HISTORY_MAX) {
				state.searchData.splice(HISTORY_MAX, state.searchData.length - HISTORY_MAX);
			}
			this.commit('search/saveToStorage');
		},
		/*删除指定数据*/
		removeSearchData(state, index) {
			state.searchData.splice(index, 1);
			this.commit('search/saveToStorage');
		},
		/*删除所有数据*/
		removeAllSearchData(state) {
			if (state.searchData.length === 0) return;
			state.searchData = [];
			this.commit('search/saveToStorage');
		}
	},
	actions: {}
}