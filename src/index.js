import sha1 from 'sha1';
import Component from './Component.vue';

export const install = (Vue, opts) => {
	/*
		Give developers the chance to use our own component instead of
		adding the logic to theirs if they prefer it.
	*/
	Vue.component(Component.name, Component);

	/*
		Start the process of checking the API.
	*/
	Vue.prototype.$isPasswordSafe = async password => {
		/*
			If the password doesn't meet the pre-requisites let's just stop
		*/
		if (!password || password.length < opts.minLength || password.length > opts.maxLength) return;

		/*
			Hash the password and send the first 5 characters to the API.
		*/
		const hashedPassword = sha1(password).toUpperCase();
		const url = `https://api.pwnedpasswords.com/range/${hashedPassword.slice(0, 5)}`;

		try {
			const response = await fetch(url, {
				headers: { Accept: 'application/vnd.haveibeenpwned.v2+json' }
			});
			const list = await response.text();
			/*
				Now that we have the list we should check if our password hash is somewhere
				in there and if so, let the user know the password is unsafe to use.
			*/
			if (list.includes(hashedPassword.slice(5))) return false;
			return true;
		} catch (error) {
			console.error(error);
			return 'error';
		}
	};
};

export default install;
