<template>
	<view class="comment-limt-container" v-if="!isShowAllComment">
		<view class="comment-title">
			精简评论
		</view>
		<block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
			<article-comment-item :data="item.info"></article-comment-item>
		</block>
		<view class="show-more" @click="onMore">
			查看更多评论
		</view>
	</view>
	<view class="comment-all-container" v-else>
		<view class="comment-title">
			全部评论
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="{use: false}" @up="upCallback" :up="{
			textNoMore: '-- 我也是有底线的！ --'
		}">
			<block v-for="(item, index) in commentList" :key="index">
				<article-comment-item :data="item.info"></article-comment-item>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
	import { getArticleCommentList } from '../../api/article.js'
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	export default {
		name:"article-comment-list",
		mixins: [MescrollMixin],
		props: {
			articleId: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				page: 1,
				pageSize: 5,
				commentList: [],
				isShowAllComment: false,
				mescroll: null,
				isInit: true,
				commentListTotal: 0
			};
		},
		created() {
			this.loadArticleCommentList();
		},
		methods: {
			async loadArticleCommentList() {
				const res = await getArticleCommentList({
					articleId: this.articleId,
					page: this.page,
					size: this.pageSize
				});
				this.commentListTotal = res.count;
				this.commentList = [...this.commentList, ...res.list];
			},
			onMore() {
				this.isShowAllComment = true;
			},
			async mescrollInit() {
				await this.loadArticleCommentList();
				this.isInit = false;
				this.getMescroll();
				this.mescroll.endBySize(this.commentList.length, this.commentListTotal);
			},
			async upCallback() {
				if (this.isInit) return;
				this.page += 1;
				await this.loadArticleCommentList();
				this.mescroll.endBySize(this.commentList.length, this.commentListTotal);
			},
			getMescroll() {
				if (this.isShowAllComment && !this.mescroll) {
					this.mescroll = this.$refs.mescrollRef.mescroll;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-title {
		font-weight: bold;
		color: $uni-text-color;
		font-size: $uni-font-size-lg;
		margin: $uni-spacing-col-lg 0;
	}
	.comment-limt-container {
		.show-more {
			color: $uni-text-color-more;
			font-size: $uni-font-size-base;
			margin: $uni-spacing-col-lg;
			text-align: center;
		}
	}
</style>
