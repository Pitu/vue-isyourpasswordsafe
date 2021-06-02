<template>
	<div id="app">
		<GitHubLogo />
		<h2>Create an account demo</h2>
		<input type="text" placeholder="Your username">
		<input
			v-model="password"
			v-ispasswordsafe
			@safe="isPasswordSafe"
			type="password"
			placeholder="Your password">

		<h4 v-if="isSafe">Your password should be good to go :)</h4>
		<h4 v-if="isSafe === false"
			class="error">Your password has been leaked and you <b>shouldn't</b> use it!</h4>

		<h3>Implementation in this example:</h3>
		<pre>
			{{ code }}
		</pre>
	</div>
</template>
<script>
import GitHubLogo from './GithubLogo.vue';
export default {
	components: {
		GitHubLogo
	},
	data() {
		return {
			isSafe: null,
			password: null,
			code: `
<input
	v-model="password"
	v-ispasswordsafe
	@safe="isPasswordSafe"
	type="password"
	placeholder="Your password">`
		};
	},
	async mounted() {
		const isSafe = await this.$isPasswordSafe('test');
		console.log(isSafe); // Spoiler alert: it isn't.
	},
	methods: {
		isPasswordSafe(val) {
			this.isSafe = val;
		}
	}
};
</script>
<style>
	@import url('https://fonts.googleapis.com/css?family=Nunito');
	* {
		font-family: 'Nunito', sans-serif;
		font-weight: 300;
	}
	body {
		margin: 0px;
	}
	div#app {
		background: #f5f6f8;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	div#app input {
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		display: -webkit-inline-box;
		display: -ms-inline-flexbox;
		display: inline-flex;
		font-size: 1rem;
		height: 2.5em;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;
		line-height: 1.5;
		padding-left: .75em;
		padding-right: .75em;
		background-color: #fff;
		border: 1px solid #dbdbdb;
		color: #363636;
		width: 350px;
		border-left: 0px;
		border-top: 0px;
		border-right: 0px;
		border-radius: 0px;
		box-shadow: 0 0 0;
		text-align: center;
		margin-bottom: 10px;
	}

	div#app b {
		font-weight: bold;
		text-decoration: underline;
	}

	h3 {
		font-size: 16px;
    	margin-top: 2rem;
	}

	h4 {
		color: green;
	}

	div#app .error {
		color: #ce0505;
	}

	.github-corner:hover .octo-arm {
		animation: octocat-wave 560ms ease-in-out
	}
	@keyframes octocat-wave {
		0%,100% {
			transform: rotate(0)
		}
		20%,60% {
			transform: rotate(-25deg)
		}
		40%,80% {
			transform: rotate(10deg)
		}
	}
	@media (max-width:500px) {
		.github-corner:hover .octo-arm {
			animation: none
		}
		.github-corner .octo-arm {
			animation: octocat-wave 560ms ease-in-out
		}
	}
	pre {
		margin: 0;
		width: 306px;
		padding: 0 2rem;
		background: #f4f4f4;
		border: 1px solid #dbdbdb;
		border-left: 2px solid black;
		color: #666;
		page-break-inside: avoid;
		font-family: monospace;
		font-size: 14px;
		line-height: 1.6;
		max-width: 100%;
		overflow: auto;
		display: block;
		word-wrap: break-word;
	}
</style>
