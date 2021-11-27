<template>
	<view class="search-blog-container">
		<view class="search-bar-box">
			<my-search :isShowInput="true" :placeholderText="defaultText" v-model="searchVal" 
				:config="{
					backgroundColor: '#f1f0f3'
				}" 
				@search="onSearchConfirm"
				@focus="onSearchFocus"
				@blur="onSearchBlur"
				@clear="onSearchClear"
				@cancel="onSearchCancel"
			></my-search>
		</view>
		<view class="search-hot-list-box card" v-if="showType === SEARCH_LIST">
			<search-hot-list @onSearch="onSearchConfirm"></search-hot-list>
		</view>
		<view class="search-hot-history-box" v-else-if="showType === SEARCH_HISTORY">
			<search-history @onSearch="onSearchConfirm"></search-history>
		</view>
		<view class="search-result-list--box" v-else>
			<search-result-list :queryStr="searchVal" ref="mescrollItem"></search-result-list>
		</view>
	</view>
</template>

<script>
	import { getDefaultText } from '../../../api/search.js'
	import { SEARCH_LIST, SEARCH_HISTORY, SEARCH_RESULT } from '../../../utils/constant.js'
	import { mapMutations } from 'vuex'
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
	export default {
		mixins: [MescrollCompMixin],
		data() {
			return {
				defaultText: '',
				searchVal: '',
				SEARCH_LIST,
				SEARCH_HISTORY,
				SEARCH_RESULT,
				showType: SEARCH_LIST
			};
		},
		methods: {
			onSearchConfirm(val) {
				this.searchVal = val ? val.trim() : this.defaultText.trim();
				if (this.searchVal.length > 0) {
					this.showType = SEARCH_RESULT;
					this.addSearchData(this.searchVal);
				} else {
					uni.showToast({
						title: '输入内容不能为空',
						icon: 'none',
						mask: true,
						duration: 1000
					});
				}
			},
			onSearchFocus(val) {
				this.showType = SEARCH_HISTORY;
			},
			onSearchBlur(val) {
			},
			onSearchClear(val) {
				this.showType = SEARCH_HISTORY;
			},
			onSearchCancel(val) {
				this.showType = SEARCH_LIST;
			},
			async loadDefaultText() {
				const res = await getDefaultText();
				this.defaultText = res.defaultText;
			},
			...mapMutations('search', ['addSearchData'])
		},
		created() {
			this.loadDefaultText();
		}
	}
</script>

<style lang="scss" scoped>
	.search-blog-container {
		.search-bar-box {
			background-color: $uni-white;
			padding: $uni-spacing-row-sm;
			position: sticky;
			top: 0;
			z-index: 99;
		}
	}
</style>
