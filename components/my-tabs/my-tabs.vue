<template>
	<view class="my-tabs-container">
		<view class="tab-box">
			<scroll-view class="scroll-view" scroll-x scroll-with-animation :scroll-left="scrollLeft">
				<view class="scroll-content">
					<view class="tab-item-box">
						<block v-for="(item, index) in tabData" :key="item.id">
							<view :id="'_tab_' + index" :class="['tab-item', activeIndex === index ? 'tab-item-active' : '']"
								@click="onTabClick(index)" :style="{
									color: activeIndex === index ? defaultConfig.activeTextColor : defaultConfig.textColor
								}">
								{{ item.label || item }}
							</view>
						</block>
					</view>
					<view class="underLine" :style="{
						transform: `translateX(${silder.left}px)`,
						width: defaultConfig.underLineWidth,
						height: defaultConfig.underLineHeight,
						background: defaultConfig.underLineColor
					}">
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-tabs",
		props: {
			config: {
				type: Object,
				default: () => {
					return {};
				}
			},
			tabData: {
				type: Array,
				default: () => {
					return [];
				}
			},
			defaultIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabList: [],
				activeIndex: -1,
				silder: {
					left: 17.5
				},
				defaultConfig: {
					textColor: '#333',
					activeTextColor: '#f94d2a',
					underLineWidth: 24,
					underLineHeight: 2,
					underLineColor: '#f94d2a'
				},
				scrollLeft: 0
			};
		},
		methods: {
			onTabClick(index) {
				this.activeIndex = index;
				this.$emit('tabclick', index);
				this.tabToIndex()
			},
			/*计算滑块滚动位置*/
			tabToIndex() {
				if (this.tabList.length === 0) return;
				const index = this.activeIndex;
				this.silder.left = this.tabList[this.activeIndex]._slider.left;
				this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth;
			},
			/*计算tabitem宽度*/
			updateTabWidth() {
				const data = this.tabList;
				if (data.length === 0) return;
				const query = uni.createSelectorQuery().in(this);
				data.forEach((item, index) => {
					query.select(`#_tab_${index}`).boundingClientRect(res => {
						item._slider = {
							left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
						}
						if (data.length - 1 === index) {
							this.tabToIndex();
						}
					}).exec();
				});
			}
		},
		watch: {
			defaultIndex: {
				handler(val) {
					this.activeIndex = val;
					this.tabToIndex();
				},
				immediate: true
			},
			tabData: {
				handler(val) {
					this.tabList = val;
					setTimeout(() => {
						this.updateTabWidth();
					}, 0);
				},
				immediate: true
			},
			config: {
				handler(val) {
					this.defaultConfig = {
						...this.defaultConfig,
						...val
					}
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-tabs-container {
		width: 100%;
		font-size: 14px;
		height: 45px;
		line-height: 45px;
		background-color: $uni-white;

		.tab-box {
			width: 100%;
			height: 45px;
			display: flex;
			position: relative;

			.scroll-view {
				white-space: nowrap;
				width: 100%;
				height: 100%;
				box-sizing: border-box;

				.scroll-content {
					width: 100%;
					height: 100%;
					position: relative;

					.tab-item-box {
						display: flex;
						height: 100%;

						.tab-item {
							height: 100%;
							text-align: center;
							padding: 0 15px;
							position: relative;
							color: $uni-main-color;

							&.tab-item-active {
								color: $uni-text-color-hot;
							}
						}
					}
					.underLine {
						height: 2px;
						width: 24px;
						background-color: $uni-text-color-hot;
						border-radius: 3px;
						transition: all .5s;
						position: absolute;
						bottom: 0;
					}
				}
			}
		}
	}
	// #ifdef H5
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none;
	}
	/deep/.uni-scroll-view {
		scrollbar-width: none;
	}
	// #endif
</style>
