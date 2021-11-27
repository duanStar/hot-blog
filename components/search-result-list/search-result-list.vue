<template>
	<view class="search-result-list-container">
		<empty-data v-if="isEmpty"></empty-data>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" v-else>
			<block v-for="(item, index) in resultList" :key="index">
				<view class="search-result-item-box">
					<search-result-item-theme-1 :data="item" v-if="!item.pic_list || item.pic_list.length === 0"></search-result-item-theme-1>
					<search-result-item-theme-2 :data="item" v-else-if="item.pic_list.length === 1"></search-result-item-theme-2>
					<search-result-item-theme-3 :data="item" v-else></search-result-item-theme-3>
				</view>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
	import { getSearchResult } from '../../api/search.js'
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	export default {
		name:"search-result-list",
		mixins: [MescrollMixin],
		props: {
			queryStr: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				page: 1,
				resultList: [],
				isInit: true,
				mescroll: null,
				pageSize: 0,
				isEmpty: false
			};
		},
		methods: {
			async loadSearchResult() {
				const res = await getSearchResult({
					q: this.queryStr,
					p: this.page
				});
				this.pageSize = res.list.length;
				res.list.forEach(item => {
					item.title = item.title.replace(/<em>/g, '<em style="color: #f94d2a; margin: 0 2px;">');
					item.description = item.description.replace(/<em>/g, '<em style="color: #f94d2a; margin: 0 2px;">');
				});
				if (this.page === 1) {
					this.resultList = res.list;
				} else {
					this.resultList = [...this.resultList, ...res.list];
				}
				if (this.resultList.length === 0) {
					this.isEmpty = true;
				}
			},
			async mescrollInit() {
				await this.loadSearchResult();
				this.isInit = false;
				this.mescroll.endSuccess(this.pageSize, true); // 关闭动画
			},
			async downCallback() {
				if(this.isInit) return;
				this.page = 1;
				await this.loadSearchResult();
				this.mescroll.endSuccess(this.pageSize, true); // 关闭动画
			},
			async upCallback() {
				if(this.isInit) return;
				this.page += 1;
				await this.loadSearchResult();
				this.mescroll.endSuccess(this.pageSize, true); // 关闭动画
			}
		},
		mounted() {
			this.mescroll = this.$refs.mescrollRef.mescroll;
			console.log(this.mescroll)
		}
	}
</script>

<style lang="scss" scoped>
	.search-result-list-container {
		padding: $uni-spacing-col-lg $uni-spacing-row-lg;
		.search-result-item-box {
			margin-bottom: $uni-spacing-col-xl;
		}
	}
</style>
