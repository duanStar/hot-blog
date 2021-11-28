<template>
	<page-meta root-font-size="52px">
		<view class="detail-container">
			<block v-if="articleData != null">
				<view class="title">
					{{articleData.articleTitle}}
				</view>
				<view class="detail-info">
					<view class="detail-left">
						<view class="avatar-box">
							<image class="avatar" :src="articleData.avatar" mode=""></image>
						</view>
						<view class="author-box">
							<text class="autor">{{articleData.nickName}}</text>
							<text class="release-time">{{articleData.date}}</text>
						</view>
					</view>
					<view class="detail-right">
						<button class="follow" size="mini">关注</button>
					</view>
				</view>
				<mp-html class="markdown_views" :content="addClassFormHtml(articleData.content)" scroll-table></mp-html>
				<view class="comment-box">
					<article-comment-list ref="mescrollItem" :articleId="articleId"></article-comment-list>
				</view>
				<article-operate></article-operate>
			</block>
		</view>
	</page-meta>
</template>

<script>
	import { getArticleDetail } from '../../../api/article.js'
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
	export default {
		data() {
			return {
				author: '',
				articleId: '',
				articleData: null
			};
		},
		mixins: [MescrollCompMixin],
		onLoad(options) {
			this.author = options.author;
			this.articleId = options.articleId;
		},
		methods: {
			async loadArticleDetail() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				const res = await getArticleDetail({
					author: this.author,
					articleId: this.articleId
				});
				this.articleData = res.data;
			},
			addClassFormHtml(info) {
				return info.replace(/<(blockquote|p|h1|a|h2|h3|h4|h5|h6|ul|li|ol|td|th|tr|dl|dd|hr|pre|strong|input|table|details|code|kbd|summary|image|img)>/gi, function(matchStr, $1) {
					return `<${$1} class="${$1}-cls">`;
				});
			}
		},
		mounted() {
			this.loadArticleDetail();
		}
	}
</script>

<style lang="scss">
	@import '~@/styles/article-detail.scss';
	.detail-container {
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		padding-bottom: 88px;
		.title {
			font-size: $uni-font-size-xl;
			color: $uni-text-color-title;
			font-weight: bold;
		}
		.detail-info {
			display: flex;
			padding: $uni-spacing-col-base 0;
			.detail-left {
				display: flex;
				margin-right: auto;
				.author-box {
					margin-left: $uni-spacing-row-base;
					display: flex;
					flex-direction: column;
					.author {
						font-size: $uni-spacing-row-base;
						color: $uni-text-color-title;
						font-weight: bold;
					}
					.release-time {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}
				}
			}
			.detail-right {
				display: flex;
				align-items: center;
			}
		}
	}
</style>
