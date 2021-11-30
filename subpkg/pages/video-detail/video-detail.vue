<template>
	<view class="video-detail-container">
		<view class="video-box">
			<view class="video-title">
				{{videoData.title}}
			</view>
			<video id="myVideo" class="video" :src="videoData.play_url" enable-danmu danmu-btn
				:danmu-list="danmuList"></video>
		</view>
		<hot-video-info :data="videoData"></hot-video-info>
		<view class="danmu-box">
			<uni-load-more status="loading" v-if="isLoadingComment"></uni-load-more>
			<empty-data v-else-if="commentList.length === 0"></empty-data>
			<view class="comment-container" v-else>
				<view class="all-comment-title">全部弹幕</view>
				<view class="list">
					<block v-for="(item, index) in commentList" :key="index">
						<article-comment-item :data="item"></article-comment-item>
					</block>
				</view>
			</view>
		</view>
		<article-operate @commentClick="onComment" :placeholder="'发个弹幕，开心一下...'" :articleId="videoData.id" :isPraise="!!videoData.isPraise" :isCollect="!!videoData.isCollect" @changePraise="onChangePraise" @changeCollect="onChangeCollect"></article-operate>
		<uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
			<article-comment-commit v-if="isShowCommit" :articleId="videoData.id" @success="onSendSuccess"></article-comment-commit>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		getVideoDanmuList
	} from '../../../api/video.js'
	import { getRandomColor } from '../../../utils/index.js'
	export default {
		data() {
			return {
				danmuList: [],
				commentList: [],
				isShowCommit: true,
				videoContext: null,
				isLoadingComment: true
			};
		},
		computed: {
			...mapState('video', ['videoData'])
		},
		onReady: function(res) {
		  this.videoContext = uni.createVideoContext('myVideo')
	  },
		methods: {
			...mapMutations('video', ['setVideoData']),
			async loadVideoDanmuList() {
				const res = await getVideoDanmuList({
					videoId: this.videoData.id
				});
				res.list.forEach(item => {
					item.color = getRandomColor();
				});
				this.danmuList = [...res.list];
				this.commentList = [...res.list];
				this.isLoadingComment = false;
			},
			onComment() {
				this.$refs.popup.open();
			},
			onCommitPopupChange(e) {
				if (e.show) {
					this.isShowCommit = e.show;
				} else {
					setTimeout(() => {
						this.isShowCommit = e.show;
					}, 200);
				}
			},
			sendDanmu(data) {
				this.videoContext.sendDanmu({
						text: data.info.content,
						color: getRandomColor()
				});
				this.commentList.unshift(data.info);
				this.$refs.popup.close();
				this.isShowCommit = false;
			},
			onSendSuccess(data) {
				this.sendDanmu(data);
			},
			onChangePraise(val) {
				this.setVideoData({...this.videoData, isPraise: val});
			},
			onChangeCollect(val) {
				this.setVideoData({...this.videoData, isCollect: val});
			}
		},
		created() {
			this.loadVideoDanmuList();
		}
	}
</script>

<style lang="scss" scoped>
	.video-detail-container {
		.video-title {
			position: absolute;
			top: $uni-spacing-col-xl;
			left: $uni-spacing-row-lg;
			color: $uni-text-color-inverse;
			font-size: $uni-font-size-lg;
			z-index: 100;
		}

		.video-box {
			background-color: $uni-white;
			position: sticky;
			top: 0;
			z-index: 99;

			.video {
				width: 100%;
				height: 230px;
			}
		}

		.danmu-box {
			border-top: $uni-spacing-col-sm solid $uni-bg-color-grey;
			margin-bottom: 36px;

			.comment-container {
				padding: $uni-spacing-col-lg $uni-spacing-row-lg;

				.all-comment-title {
					font-size: $uni-font-size-lg;
					font-weight: bold;
				}
			}
		}
	}
</style>
