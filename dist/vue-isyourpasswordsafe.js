(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vueisyourpasswordsafe = {})));
}(this, (function (exports) { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var crypt = createCommonjsModule(function (module) {
	(function() {
	  var base64map
	      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

	  crypt = {
	    // Bit-wise rotation left
	    rotl: function(n, b) {
	      return (n << b) | (n >>> (32 - b));
	    },

	    // Bit-wise rotation right
	    rotr: function(n, b) {
	      return (n << (32 - b)) | (n >>> b);
	    },

	    // Swap big-endian to little-endian and vice versa
	    endian: function(n) {
	      // If number given, swap endian
	      if (n.constructor == Number) {
	        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
	      }

	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++)
	        n[i] = crypt.endian(n[i]);
	      return n;
	    },

	    // Generate an array of any length of random bytes
	    randomBytes: function(n) {
	      for (var bytes = []; n > 0; n--)
	        bytes.push(Math.floor(Math.random() * 256));
	      return bytes;
	    },

	    // Convert a byte array to big-endian 32-bit words
	    bytesToWords: function(bytes) {
	      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
	        words[b >>> 5] |= bytes[i] << (24 - b % 32);
	      return words;
	    },

	    // Convert big-endian 32-bit words to a byte array
	    wordsToBytes: function(words) {
	      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
	        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a hex string
	    bytesToHex: function(bytes) {
	      for (var hex = [], i = 0; i < bytes.length; i++) {
	        hex.push((bytes[i] >>> 4).toString(16));
	        hex.push((bytes[i] & 0xF).toString(16));
	      }
	      return hex.join('');
	    },

	    // Convert a hex string to a byte array
	    hexToBytes: function(hex) {
	      for (var bytes = [], c = 0; c < hex.length; c += 2)
	        bytes.push(parseInt(hex.substr(c, 2), 16));
	      return bytes;
	    },

	    // Convert a byte array to a base-64 string
	    bytesToBase64: function(bytes) {
	      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
	        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
	        for (var j = 0; j < 4; j++)
	          if (i * 8 + j * 6 <= bytes.length * 8)
	            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
	          else
	            base64.push('=');
	      }
	      return base64.join('');
	    },

	    // Convert a base-64 string to a byte array
	    base64ToBytes: function(base64) {
	      // Remove non-base-64 characters
	      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

	      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
	          imod4 = ++i % 4) {
	        if (imod4 == 0) continue;
	        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
	            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
	            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
	      }
	      return bytes;
	    }
	  };

	  module.exports = crypt;
	})();
	});

	var charenc = {
	  // UTF-8 encoding
	  utf8: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
	    }
	  },

	  // Binary encoding
	  bin: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      for (var bytes = [], i = 0; i < str.length; i++)
	        bytes.push(str.charCodeAt(i) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      for (var str = [], i = 0; i < bytes.length; i++)
	        str.push(String.fromCharCode(bytes[i]));
	      return str.join('');
	    }
	  }
	};

	var charenc_1 = charenc;

	var sha1 = createCommonjsModule(function (module) {
	(function() {
	  var crypt$$1 = crypt,
	      utf8 = charenc_1.utf8,
	      bin = charenc_1.bin,

	  // The core
	  sha1 = function (message) {
	    // Convert to byte array
	    if (message.constructor == String)
	      message = utf8.stringToBytes(message);
	    else if (typeof Buffer !== 'undefined' && typeof Buffer.isBuffer == 'function' && Buffer.isBuffer(message))
	      message = Array.prototype.slice.call(message, 0);
	    else if (!Array.isArray(message))
	      message = message.toString();

	    // otherwise assume byte array

	    var m  = crypt$$1.bytesToWords(message),
	        l  = message.length * 8,
	        w  = [],
	        H0 =  1732584193,
	        H1 = -271733879,
	        H2 = -1732584194,
	        H3 =  271733878,
	        H4 = -1009589776;

	    // Padding
	    m[l >> 5] |= 0x80 << (24 - l % 32);
	    m[((l + 64 >>> 9) << 4) + 15] = l;

	    for (var i = 0; i < m.length; i += 16) {
	      var a = H0,
	          b = H1,
	          c = H2,
	          d = H3,
	          e = H4;

	      for (var j = 0; j < 80; j++) {

	        if (j < 16)
	          w[j] = m[i + j];
	        else {
	          var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
	          w[j] = (n << 1) | (n >>> 31);
	        }

	        var t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (
	                j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
	                j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
	                j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
	                         (H1 ^ H2 ^ H3) - 899497514);

	        H4 = H3;
	        H3 = H2;
	        H2 = (H1 << 30) | (H1 >>> 2);
	        H1 = H0;
	        H0 = t;
	      }

	      H0 += a;
	      H1 += b;
	      H2 += c;
	      H3 += d;
	      H4 += e;
	    }

	    return [H0, H1, H2, H3, H4];
	  },

	  // Public API
	  api = function (message, options) {
	    var digestbytes = crypt$$1.wordsToBytes(sha1(message));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt$$1.bytesToHex(digestbytes);
	  };

	  api._blocksize = 16;
	  api._digestsize = 20;

	  module.exports = api;
	})();
	});

	/* eslint-disable quote-props */
	var Component = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('input', {
	      ref: "passwordInput",
	      attrs: {
	        "type": "password"
	      },
	      on: {
	        "input": _vm.startCheck
	      }
	    });
	  },
	  staticRenderFns: [],
	  name: 'vue-isyourpasswordsafe',
	  props: {
	    value: {
	      type: String,
	      default: null
	    }
	  },
	  data: function data() {
	    return {
	      idleTimeout: null
	    };
	  },
	  methods: {
	    /*
	    	Let's make sure the user has stopped typing before checking to
	    	avoid useless calls to the API.
	    */
	    startCheck: function startCheck() {
	      this.$emit('input', this.$refs.passwordInput.value);
	      if (!this.value) return;
	      clearTimeout(this.idleTimeout);
	      this.idleTimeout = setTimeout(this.checkPassword, 500);
	    },

	    /*
	    	Let's actually start the process of identifying a leaked password.
	    */
	    checkPassword: function checkPassword() {
	      return new Promise(function ($return, $error) {
	        var isSafe;
	        return Promise.resolve(this.$isPasswordSafe(this.value)).then(function ($await_1) {
	          try {
	            isSafe = $await_1;
	            return $return(this.$emit('onFinishedChecking', isSafe));
	          } catch ($boundEx) {
	            return $error($boundEx);
	          }
	        }.bind(this), $error);
	      }.bind(this));
	    }
	  }
	};

	var install = function install(Vue, opts) {
	  /*
	  	Give developers the chance to use our own component instead of
	  	adding the logic to theirs if they prefer it.
	  */
	  Vue.component(Component.name, Component);
	  /*
	  	Start the process of checking the API.
	  */

	  Vue.prototype.$isPasswordSafe = function (password) {
	    return new Promise(function ($return, $error) {
	      var hashedPassword, url, response, list;

	      /*
	      	If the password doesn't meet the pre-requisites let's just stop
	      */
	      if (!password || password.length < opts.minLenght || password.length > opts.maxLength) return $return();
	      /*
	      	Hash the password and send the first 5 characters to the API.
	      */

	      hashedPassword = sha1(password).toUpperCase();
	      url = "https://api.pwnedpasswords.com/range/".concat(hashedPassword.slice(0, 5));

	      var $Try_1_Catch = function (error) {
	        try {
	          console.error(error);
	          return $return('error');
	        } catch ($boundEx) {
	          return $error($boundEx);
	        }
	      };

	      try {
	        return Promise.resolve(fetch(url, {
	          headers: {
	            Accept: 'application/vnd.haveibeenpwned.v2+json'
	          }
	        })).then(function ($await_2) {
	          try {
	            response = $await_2;
	            return Promise.resolve(response.text()).then(function ($await_3) {
	              try {
	                list = $await_3;

	                /*
	                	Now that we have the list we should check if our password hash is somewhere
	                	in there and if so, let the user know the password is unsafe to use.
	                */
	                if (list.includes(hashedPassword.slice(5))) return $return(false);
	                return $return(true);
	              } catch ($boundEx) {
	                return $Try_1_Catch($boundEx);
	              }
	            }, $Try_1_Catch);
	          } catch ($boundEx) {
	            return $Try_1_Catch($boundEx);
	          }
	        }, $Try_1_Catch);
	      } catch (error) {
	        $Try_1_Catch(error);
	      }
	    });
	  };
	};

	exports.install = install;
	exports.default = install;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
