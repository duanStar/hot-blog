<template>
	<view class="item-container" @click="$emit('click')">
		<view class="item-box">
			<view class="item-box-left">
				<hot-ranking :ranking="ranking"></hot-ranking>
			</view>
			<view class="item-box-right">
				<view class="item-title line-clamp-2">
					{{data.title}}
				</view>
				<view class="item-desc line-clamp-2">
					{{data.desc}}
				</view>
				<view class="item-bottom-box">
					<view class="item-autor">
						{{data.nickname}}
					</view>
					<view class="hot-box">
						<image class="hot-icon" src="@/static/images/hot-icon.png" mode="aspectFit"></image>
						<text class="hot-text">{{data.views|hotNumber}} 热度</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"hot-list-item",
		props: {
			data: {
				type: Object,
				required: true,
			},
			ranking: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss" scoped>
	.item-container {
		padding-bottom: $uni-font-size-sm;
		.item-box {
			display: flex;
			margin: 0 $uni-spacing-row-base;
			padding: $uni-font-size-sm $uni-spacing-row-base;
			background-color: $uni-white;
			border-radius: 6px;
			box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
			.item-box-left {
				margin-right: $uni-spacing-row-sm;
			}
			.item-box-right {
				.item-title {
					font-size: $uni-font-size-lg;
					font-weight: bold;
					color: $uni-text-color-title;
				}
				.item-desc {
					padding-top: $uni-spacing-col-sm;
					font-size: 14px;
					color: $uni-text-color;
				}
				.item-bottom-box {
					display: flex;
					margin-top: $uni-spacing-row-sm;
					align-items: center;
					.item-autor {
						margin-right: auto;
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}
					.hot-box {
						display: flex;
						align-items: center;
						.hot-icon {
							width: $uni-img-size-sm;
							height: $uni-img-size-sm;
						}
						.hot-text {
							margin-left: $uni-spacing-row-sm;
							font-size: $uni-font-size-sm;
							color: $uni-text-color-hot;
						}
					}
				}
			}
		}
	}
</style>
