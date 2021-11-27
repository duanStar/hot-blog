<template>
	<view>
		<view class="search-result-item-box">
			<rich-text :nodes="data.title" class="item-title line-clamp-2"></rich-text>
			<rich-text :nodes="data.description" class="item-desc line-clamp-2"></rich-text>
			<view class="item-desc-bottom">
				<view class="item-autor">
					{{data.author}}
				</view>
				<view class="item-update-time">
					<uni-icons type="compose" color="#999" class="item-update-time-icon"></uni-icons>
					<text>{{data.updateTime|relativeTime}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search-result-item-theme-1",
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.search-result-item-box {
		margin-bottom: $uni-spacing-col-xl;
		.item-title {
			font-size: $uni-font-size-base;
			font-weight: bold;
			color: $uni-text-color-title;
		}
		.item-desc {
			margin-top: $uni-spacing-col-base;
			font-size: $uni-font-size-base;
			color: $uni-color-subtitle;
		}
		.item-desc-bottom {
			margin-top: $uni-spacing-col-base;
			display: flex;
			align-items: center;
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
			.item-autor {
				margin-right: $uni-spacing-col-lg;
			}
			.item-update-time {
				.item-update-time-icon {
					color: $uni-text-color-grey;
					margin-right: $uni-spacing-row-sm;
				}
			}
		}
	}
</style>
