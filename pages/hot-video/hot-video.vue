<template>
	<view class="hot-video-container">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" @down="downCallback">
			<block v-for="(item, index) in videoList" :key="index">
				<hot-video-item :data="item" @click="onItemClick"></hot-video-item>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
	import { getHotVideoList } from '../../api/video.js'
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				page: 1,
				size: 10,
				videoList: [],
				isInit: true,
				mescroll: null
			};
		},
		mixins: [MescrollMixin],
		methods: {
			...mapMutations('video', ['setVideoData']),
			async loadHotVideoList() {
				const res = await getHotVideoList({
					page: this.page,
					size: this.size
				});
				if (this.page === 1) {
					this.videoList = res.list;
				} else {
					this.videoList = [...this.videoList, ...res.list];
				}
			},
			async mescrollInit() {
				await this.loadHotVideoList();
				this.isInit = false;
				this.mescroll.endSuccess();
			},
			async upCallback() {
				if (this.isInit) return;
				this.page += 1;
				await this.loadHotVideoList();
				this.mescroll.endSuccess();
			},
			async downCallback() {
				if (this.isInit) return;
				this.page = 1;
				await this.loadHotVideoList();
				this.mescroll.endSuccess();
			},
			onItemClick(data) {
				this.setVideoData(data);
				uni.navigateTo({
					url: '/subpkg/pages/video-detail/video-detail'
				});
			}
		},
		mounted() {
			this.mescroll = this.$refs.mescrollRef.mescroll;
		}
	}
</script>

<style lang="scss" scoped>
	.hot-video-container {
	  background-color: $uni-bg-color-grey;
	}
</style>
