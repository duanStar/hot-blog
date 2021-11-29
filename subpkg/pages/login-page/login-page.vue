<template>
	<my-login @onLoginSuccess="onLoginSuccess"></my-login>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			onLoginSuccess() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
