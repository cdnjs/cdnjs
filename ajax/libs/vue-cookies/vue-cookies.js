/**
 * Vue Cookies v1.8.4
 * https://github.com/cmp-cc/vue-cookies
 *
 * Copyright 2016, cmp-cc
 * Released under the MIT license
 */

 (function () {

  var defaultConfig = {
    expires: '1d',
    path: '; path=/',
    domain: '',
    secure: '',
    sameSite: '; SameSite=Lax',
    partitioned : ''
  };

  var VueCookies = {
    // install of Vue
    install: function (Vue, options) {
      if (options) this.config(options.expires, options.path, options.domain, options.secure, options.sameSite, options.partitioned);
      if (Vue.prototype) Vue.prototype.$cookies = this;
      if (Vue.config && Vue.config.globalProperties) {
        Vue.config.globalProperties.$cookies = this;
        Vue.provide('$cookies', this);
      }
      Vue.$cookies = this;
    },
    config: function (expires, path, domain, secure, sameSite, partitioned) {
      defaultConfig.expires = expires ? expires : '1d';
      defaultConfig.path = path ? '; path=' + path : '; path=/';
      defaultConfig.domain = domain ? '; domain=' + domain : '';
      defaultConfig.secure = secure ? '; Secure' : '';
      defaultConfig.sameSite = sameSite ? '; SameSite=' + sameSite : '; SameSite=Lax';
      defaultConfig.partitioned = partitioned ? '; Partitioned' : '';
    },
    get: function (key) {
      var value = decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;

      if (value && ((value.substring(0, 1) === '{' && value.substring(value.length - 1, value.length) === '}') || (value.substring(0, 1) === '[' && value.substring(value.length - 1, value.length) === ']'))) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
      return value;
    },
    set: function (key, value, expires, path, domain, secure, sameSite, partitioned) {
      if (!key) {
        throw new Error('Cookie name is not found in the first argument.');
      } else if (/^(?:expires|max\-age|path|domain|secure|SameSite)$/i.test(key)) {
        throw new Error('Cookie name illegality. Cannot be set to ["expires","max-age","path","domain","secure","SameSite"]\t current key name: ' + key);
      }
      // support json object
      if (value && typeof value === 'object') {
        value = JSON.stringify(value);
      }
      var _expires = '';
      expires = expires === undefined ? defaultConfig.expires : expires;
      if (expires && expires !== 0) {
        switch (expires.constructor) {
          case Number:
            if (expires === Infinity || expires === -1) _expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
            else _expires = '; max-age=' + expires;
            break;
          case String:
            if (/^(?:\d+(y|m|d|h|min|s))$/i.test(expires)) {
              // get capture number group
              var _expireTime = expires.replace(/^(\d+)(?:y|m|d|h|min|s)$/i, '$1');
              // get capture type group , to lower case
              switch (expires.replace(/^(?:\d+)(y|m|d|h|min|s)$/i, '$1').toLowerCase()) {
                  // Frequency sorting
                case 'm':
                  _expires = '; max-age=' + +_expireTime * 2592000;
                  break; // 60 * 60 * 24 * 30
                case 'd':
                  _expires = '; max-age=' + +_expireTime * 86400;
                  break; // 60 * 60 * 24
                case 'h':
                  _expires = '; max-age=' + +_expireTime * 3600;
                  break; // 60 * 60
                case 'min':
                  _expires = '; max-age=' + +_expireTime * 60;
                  break; // 60
                case 's':
                  _expires = '; max-age=' + _expireTime;
                  break;
                case 'y':
                  _expires = '; max-age=' + +_expireTime * 31104000;
                  break; // 60 * 60 * 24 * 30 * 12
                default:
                  new Error('unknown exception of "set operation"');
              }
            } else {
              _expires = '; expires=' + expires;
            }
            break;
          case Date:
            _expires = '; expires=' + expires.toUTCString();
            break;
        }
      }
      document.cookie =
          encodeURIComponent(key) + '=' + encodeURIComponent(value) +
          _expires +
          (domain ? '; domain=' + domain : defaultConfig.domain) +
          (path ? '; path=' + path : defaultConfig.path) +
          (secure === undefined ? defaultConfig.secure : secure ? '; Secure' : '') +
          (sameSite === undefined ? defaultConfig.sameSite : (sameSite ? '; SameSite=' + sameSite : '')) +
          (partitioned === undefined ? defaultConfig.partitioned : partitioned ? '; Partitioned' : '');
      return this;
    },
    remove: function (key, path, domain) {
      if (!key || !this.isKey(key)) {
        return false;
      }
      document.cookie = encodeURIComponent(key) +
          '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
          (domain ? '; domain=' + domain : defaultConfig.domain) +
          (path ? '; path=' + path : defaultConfig.path) +
          '; SameSite=Lax';
      return true;
    },
    isKey: function (key) {
      return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    },
    keys: function () {
      if (!document.cookie) return [];
      var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
      for (var _index = 0; _index < _keys.length; _index++) {
        _keys[_index] = decodeURIComponent(_keys[_index]);
      }
      return _keys;
    }
  };

  if (typeof exports == 'object') {
    module.exports = VueCookies;
  } else if (typeof define == 'function' && define.amd) {
    define([], function () {
      return VueCookies;
    });
  } else if (window.Vue && window.Vue.use) {
    Vue.use(VueCookies);
  }
  // vue-cookies can exist independently,no dependencies library
  if (typeof window !== 'undefined') {
    window.$cookies = VueCookies;
  }

})();
