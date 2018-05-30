'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sha1 = _interopDefault(require('sha1'));

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
