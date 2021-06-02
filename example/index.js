import Vue from 'vue';
import VueIsYourPasswordSafe from '../src';
import App from './App.vue';

Vue.use(VueIsYourPasswordSafe);
new Vue({
	el: '#app',
	render: h => h(App)
});
