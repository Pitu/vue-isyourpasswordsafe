import sha1 from 'sha1';
import type { VNode } from 'vue';

export const install = (Vue: any) => {
	let timeout: ReturnType<typeof setTimeout>;

	/*
		Create a directive that can be used in any input as long as it has a v-model attached to it
	*/
	Vue.directive('ispasswordsafe', {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		componentUpdated(el: HTMLInputElement, _: any, node: VNode) {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => {
				void checkPwnedPassword(el.value, node);
			}, 350);
		}
	});

	/*
		Also create a function that can be used programatically if you don't want to bind it to an input
	*/
	Vue.prototype.$isPasswordSafe = async (password: string) => checkPwnedPassword(password);

	/*
		Check if the password has been pwned
	*/

	const checkPwnedPassword = async (password: string, node: VNode|null = null) => {
		/*
			If the password doesn't meet the pre-requisites let's just stop
		*/
		if (!password || !password.length) {
			if (node) emit(node, 'safe', false);
			return;
		}

		/*
			Hash the password and send the first 5 characters to the API.
		*/
		const hashedPassword = sha1(password).toUpperCase();
		const url = `https://api.pwnedpasswords.com/range/${hashedPassword.slice(0, 5) as string}`;

		try {
			const response = await fetch(url, {
				headers: { Accept: 'application/vnd.haveibeenpwned.v2+json' }
			});
			const list = await response.text();
			/*
				Now that we have the list we should check if our password hash is somewhere
				in there and if so, let the user know the password is unsafe to use.
			*/
			if (list.includes(hashedPassword.slice(5))) {
				if (node) emit(node, 'safe', false);
				return false;
			}
			if (node) emit(node, 'safe', true);
			return true;
		} catch (error) {
			console.error(error);
			if (node) emit(node, 'safe', false);
			return 'error';
		}
	};

	const emit = (vnode: VNode, name: string, data: boolean) => {
		const handlers = (vnode.data?.on ?? vnode.componentOptions?.listeners) as any;
		if (handlers?.[name]) {
			handlers[name].fns(data);
		}
	};
};

export default install;
