import Vue from 'vue';
import VueIsYourPasswordSafe from '../src';
import App from './App.vue';

Vue.use(VueIsYourPasswordSafe, {
	minLength: 8,
	maxLength: 64
});
new Vue({
	el: '#app',
	render: h => h(App)
});
