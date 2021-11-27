<template>
	<view class="search-hot-list-container">
		<view class="search-hot-title">
			博客热搜-全网技术 一网打尽
		</view>
		<block v-for="(item, index) in hotList" :key="index">
			<view class="search-hot-item" @click="onItemClick(item)">
				<hot-ranking :ranking="index + 1"></hot-ranking>
				<text class="title line-clamp">{{item.label}}</text>
				<image class="search-hot-icon" src="../../static/images/hot-icon.png" v-if="index < 3"></image>
			</view>
		</block>
	</view>
</template>

<script>
	import { getSearchHotList } from '../../api/search.js'
	export default {
		name:"search-hot-list",
		data() {
			return {
				hotList: []
			};
		},
		methods: {
			async loadSearchHotList() {
				const res = await getSearchHotList();
				this.hotList = res.list;
			},
			onItemClick(item) {
				this.$emit('onSearch', item.label);
			}
		},
		created() {
			this.loadSearchHotList();
		}
	}
</script>

<style lang="scss" scoped>
	.search-hot-list-container {
		.search-hot-title {
			padding: $uni-spacing-col-lg;
			margin: -12px -12px $uni-spacing-col-lg -12px;
			font-size: $uni-font-size-base;
			font-weight: bold;
			color: $uni-text-color-hot;
			box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
		}
		.search-hot-item {
			display: flex;
			align-items: center;
			padding: $uni-spacing-col-lg;
			.title {
				color: $uni-text-color;
				font-size: $uni-font-size-base;
				margin: 0 $uni-spacing-row-base;
			}
			.search-hot-icon {
				width: 14px;
				height: 14px;
			}
		}
	}
</style>
