export default {
	namespaced: true,
	state: () => {
		return {
			videoData: {}
		}
	},
	mutations: {
		setVideoData(state, videoData) {
			state.videoData = videoData;
		}
	}
}
