<template>
	<view class="my-search-container">
		<uni-search-bar v-if="isShowInput" class="my-search-bar" :radius="100" :bgColor="config.backgroundColor"
			:placeholder="placeholderText"
			clearButton="auto"
			:value="value"
			@confirm="onSearch"
			@focus="onFocus"
			@blur="onBlur"
			@clear="onClear"
			@cancel="onCancel"
			@input="onInput"
		>
			<uni-icons slot="clearIcon" type="clear" color="#999"></uni-icons>
		</uni-search-bar>
		<view class="my-search-box" v-else
			:style="{
			  height: config.height + 'px',
			  backgroundColor: config.backgroundColor,
			  border: config.border
			}"
		>
			<image class="icon" :src="config.icon" mode="aspectFit"></image>
			<text class="placeholder">{{placeholderText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			placeholderText: {
				type: String,
				default: '搜索'
			},
			isShowInput: {
				type: Boolean,
				default: false
			},
			config: {
				type: Object,
				default () {
					return {
						height: 36,
						backgroundColor: "#fff",
						icon: '/static/images/search.png',
						textColor: '#454545',
						border: '1px solid #c9c9c9'
					}
				}
			},
			value: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onSearch(val) {
				this.$emit('search', val.value);
			},
			onFocus(val) {
				this.$emit('focus', val);
			},
			onBlur(val) {
				this.$emit('blur', val);
			},
			onClear(val) {
				this.$emit('clear', val);
			},
			onCancel(val) {
				this.$emit('cancel', val);
			},
			onInput(val) {
				this.$emit('input', val);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-search-container {
		display: flex;
		align-items: center;
		.my-search-bar {
			width: 100%;
		}
		.my-search-box {
			display: flex;
			align-items: center;
			width: 100%;
			height: 36px;
			padding: 0 10px;
			background-color: $uni-white;
			border: 1px solid $uni-base-color;
			border-radius: 15px;

			.icon {
				width: 20px;
				height: 20px;
			}

			.placeholder {
				font-size: 12px;
				margin-left: 5px;
				color: $uni-secondary-color;
			}
		}
	}
</style>
