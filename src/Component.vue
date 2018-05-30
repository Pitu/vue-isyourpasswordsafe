<template>
	<input
		ref="passwordInput"
		type="password"
		@input="startCheck">
</template>
<script>
/* eslint-disable quote-props */
export default {
	name: 'vue-isyourpasswordsafe',
	props: {
		value: {
			type: String,
			default: null
		}
	},
	data() {
		return { idleTimeout: null };
	},
	methods: {
		/*
			Let's make sure the user has stopped typing before checking to
			avoid useless calls to the API.
		*/
		startCheck() {
			this.$emit('input', this.$refs.passwordInput.value);
			if (!this.value) return;
			clearTimeout(this.idleTimeout);
			this.idleTimeout = setTimeout(this.checkPassword, 500);
		},

		/*
			Let's actually start the process of identifying a leaked password.
		*/
		async checkPassword() {
			const isSafe = await this.$isPasswordSafe(this.value);
			return this.$emit('onFinishedChecking', isSafe);
		}
	}
};
</script>
