<div align="center">
	<img src="https://lolisafe.moe/1mwg444C.png" />
</div>

[![NPM version](https://img.shields.io/npm/v/vue-isyourpasswordsafe.svg?style=flat-square)](https://npmjs.com/package/vue-isyourpasswordsafe)
[![NPM downloads](https://img.shields.io/npm/dm/vue-isyourpasswordsafe.svg?style=flat-square)](https://npmjs.com/package/vue-isyourpasswordsafe)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/Pitu/vue-isyourpasswordsafe/master/LICENSE)
[![Chat / Support](https://img.shields.io/badge/Chat%20%2F%20Support-discord-7289DA.svg?style=flat-square)](https://discord.gg/5g6vgwn)
[![Support me](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2Fpitu&style=flat-square)](https://www.patreon.com/pitu)
[![Support me](https://img.shields.io/badge/Support-Buy%20me%20a%20coffee-yellow.svg?style=flat-square)](https://www.buymeacoffee.com/kana)

### Introduction
Troy Hunt has repeatedly made a wonderful job keeping up with good security measures regarding personal data, more specificaly making the site [Have I Been Pwned](https://haveibeenpwned.com). On his latest [blog post](https://www.troyhunt.com/pwned-passwords-in-practice-real-world-examples-of-blocking-the-worst-passwords/) he explains a new technique to search through the database of leaked passwords in a smart and fast way giving developers a tool to ensure that a user is not signing up their projects with compromised passwords.

Developers should start making sure that their users don't use compromised passwords, and by using this directive on your inputs you can take the first step into achieving that.

### Installation
```bash
yarn add vue-isyourpasswordsafe
# or
npm i vue-isyourpasswordsafe
```

### Breaking changes in v2.0.0
Before v2.0.0 this plugin offered a custom component that has now been deprecated in favor of a directive.

### Usage
All you need to do is initialize the plugin to be able to use the directive or the custom method explained below.
```js
import VueIsYourPasswordSafe from 'vue-isyourpasswordsafe'
Vue.use(VueIsYourPasswordSafe);
```

Make sure to check [the example](https://pitu.github.io/vue-isyourpasswordsafe/), but once loaded you can use it in your own component and react to the emitted `@safe` event to check for the boolean result:
```html
<input v-model="password" v-ispasswordsafe @safe="isPasswordSafe"
```

You can also manually check for a password with the Vue.prototype method programatically:
```js
const isSafe = await this.$isPasswordSafe('test');
```

## Notable sites/projects using Vue-IsYourPasswordSafe
- [**chibisafe**](https://github.com/WeebDev/chibisafe) - Blazing fast file uploader and awesome bunker written in node! 🚀
- Feel free to add yours here!

## Contributing

1. Fork it
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Author

**vue-isyourpasswordsafe** © [Pitu](https://github.com/Pitu), Released under the [MIT](https://github.com/Pitu/vue-isyourpasswordsafe/blob/master/LICENSE) License.<br>
Authored and maintained by Pitu.

> GitHub [@Pitu](https://github.com/Pitu) · Twitter [@Pitu](https://twitter.com/its_pitu)
