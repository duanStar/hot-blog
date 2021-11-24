<template>
	<view class="hot-container">
		<image class="logo" src="@/static/images/logo.png" mode="aspectFit"></image>
		<view class="search-box">
			<my-search placeholderText="uni-app 入门"></my-search>
		</view>
		<view class="tab-box">
			<my-tabs :tabData="tabData" :defaultIndex="currentIndex" @tabclick="onTabClick"></my-tabs>
		</view>
		<swiper class="swiper" :current="currentIndex" @change="onSwiperChange" @animationfinish="onSwiperEnd" :style="{
			height: currentSwiperHeight + 'px'
		}">
			<swiper-item v-for="(tabItem, tabIndex) in tabData" :key="tabIndex">
				<view class="list-box">
					<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
					<block v-else>
						<hot-list-item :class="'hot-list-item-' + tabIndex" v-for="(item, index) in listData[tabIndex]" :key="index" :data="item" :ranking="index + 1"></hot-list-item>
					</block>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { getHotTabs, getHotListFromTabType } from '../../api/hot.js';
	export default {
		data() {
			return {
				tabData: [],
				currentIndex: 0,
				listData: {},
				isLoading: true,
				currentSwiperHeight: 0,
				swiperHeightData: {},
				currentPageSCrollTop: 0
			};
		},
		methods: {
			/*获取文章类型*/
			async loadHotTabs() {
				const res = await getHotTabs();
				this.tabData = res.list;
				this.loadHotListFromTab();
			},
			onTabClick(index) {
				this.currentIndex = index;
			},
			/**/
			async loadHotListFromTab() {
				this.isLoading = true;
				const id = this.tabData[this.currentIndex].id;
				const res = await getHotListFromTabType(id);
				this.listData[this.currentIndex] = res.list;
				this.isLoading = false;
				setTimeout(async () => {
					this.currentSwiperHeight = await this.getCurrentSwiperHeight();
					this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
				}, 0);
			},
			/*计算当前swiper高度*/
			getCurrentSwiperHeight() {
				return new Promise((resolve) => {
					const query = uni.createSelectorQuery();
					let sum = 0;
					query.selectAll(`.hot-list-item-${this.currentIndex}`).boundingClientRect(res => {
						res.forEach(item => {
							sum += item.height;
						});
						resolve(sum);
					}).exec();
				});
			},
			onSwiperChange(e) {
				if (this.currentPageSCrollTop > 160) {
					uni.pageScrollTo({
						scrollTop: 160
					});
				}
				if (e.detail.source === 'touch') {
					this.currentIndex = e.detail.current;
				}
			},
			onSwiperEnd() {
				if (!this.listData[this.currentIndex]) {
					this.loadHotListFromTab();
					return;
				}
				this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
			}
		},
		created() {
			this.loadHotTabs();
		},
		onPageScroll(e) {
			this.currentPageSCrollTop = e.scrollTop;
		}
	}
</script>

<style lang="scss" scoped>
	.hot-container {
		background-color: $uni-white;
		.logo {
			width: 100%;
			height: 100px;
		}
		.search-box {
			padding: 0 16px;
			margin-bottom: $uni-spacing-sm;
		}
		.tab-box {
			position: sticky;
			top: -1px;
			z-index: 99;
			padding-bottom: 5px;
		}
	}
</style>
