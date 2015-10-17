define("simple-auth-cookie-store/ember", 
  ["./initializer"],
  function(__dependency1__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    var initializer = __dependency1__["default"];

    Ember.onLoad('Ember.Application', function(Application) {
      Application.initializer(initializer);
    });
  });
define("simple-auth-cookie-store/initializer", 
  ["simple-auth-cookie-store/stores/cookie","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    var Store = __dependency1__["default"];

    __exports__["default"] = {
      name:       'simple-auth-cookie-store',
      before:     'simple-auth',
      initialize: function(container, application) {
        container.register('simple-auth-session-store:cookie', Store);
      }
    };
  });
define("simple-auth-cookie-store/stores/cookie", 
  ["simple-auth/stores/base","simple-auth/utils/flat-objects-are-equal","simple-auth/utils/get-global-config","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Base = __dependency1__["default"];
    var flatObjectsAreEqual = __dependency2__["default"];
    var getGlobalConfig = __dependency3__["default"];

    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    /**
      Store that saves its data in cookies.

      __In order to keep multiple tabs/windows of an application in sync, this
      store has to periodically (every 500ms) check the cookies__ for changes as
      there are no events that notify of changes in cookies. The recommended
      alternative is `Stores.LocalStorage` that also persistently stores data but
      instead of cookies relies on the `localStorage` API and does not need to poll
      for external changes.

      By default the cookie store will use session cookies that expire and are
      deleted when the browser is closed. The cookie expiration period can be
      configured via setting
      [`Stores.Cooke#cookieExpirationTime`](#SimpleAuth-Stores-Cookie-cookieExpirationTime)
      though. This can also be used to implement "remember me" functionality that
      will either store the session persistently or in a session cookie depending
      whether the user opted in or not:

      ```js
      // app/controllers/login.js
      import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

      export default Ember.Controller.extend(LoginControllerMixin, {
        rememberMe: false,

        rememberMeChanged: function() {
          this.get('session.store').cookieExpirationTime = this.get('rememberMe') ? (14 * 24 * 60 * 60) : null;
        }.observes('rememberMe')
      });
      ```

      _The factory for this store is registered as
      `'simple-auth-session-store:cookie'` in Ember's container._

      @class Cookie
      @namespace SimpleAuth.Stores
      @module simple-auth-cookie-store/stores/cookie
      @extends Stores.Base
    */
    __exports__["default"] = Base.extend({
      /**
        The prefix to use for the store's cookie names so they can be distinguished
        from other cookies.

        This value can be configured via the global environment object:

        ```js
        window.ENV = window.ENV || {};
        window.ENV['simple-auth-cookie-store'] = {
          cookieNamePrefix: 'my_app_auth_'
        }
        ```

        @property cookieNamePrefix
        @type String
        @default 'ember_simple_auth:'
      */
      cookieNamePrefix: 'ember_simple_auth:',

      /**
        The expiration time in seconds to use for the cookies. A value of `null`
        will make the cookies session cookies that expire when the browser is
        closed.

        This value can be configured via the global environment object:

        ```js
        window.ENV = window.ENV || {};
        window.ENV['simple-auth-cookie-store'] = {
          cookieExpirationTime: 24 * 60 * 60
        }
        ```

        @property cookieExpirationTime
        @type Integer
        @default null
      */
      cookieExpirationTime: null,

      /**
        @property _secureCookies
        @private
      */
      _secureCookies: window.location.protocol === 'https:',

      /**
        @property _syncDataTimeout
        @private
      */
      _syncDataTimeout: null,

      /**
        @method init
        @private
      */
      init: function() {
        var globalConfig          = getGlobalConfig('simple-auth-cookie-store');
        this.cookieNamePrefix     = globalConfig.cookieNamePrefix || this.cookieNamePrefix;
        this.cookieExpirationTime = globalConfig.cookieExpirationTime || this.cookieExpirationTime;
        this.syncData();
      },

      /**
        Persists the `data` in session cookies.

        @method persist
        @param {Object} data The data to persist
      */
      persist: function(data) {
        for (var property in data) {
          this.write(property, data[property], !!this.cookieExpirationTime ? new Date().getTime() + this.cookieExpirationTime * 1000 : null);
        }
        this._lastData = this.restore();
      },

      /**
        Restores all data currently saved in the session cookies identified by the
        `cookieNamePrefix` (see
        [`Stores.Cookie#cookieNamePrefix`](#SimpleAuth-Stores-Cookie-cookieNamePrefix))
        as a plain object.

        @method restore
        @return {Object} All data currently persisted in the session cookies
      */
      restore: function() {
        var _this = this;
        var data  = {};
        this.knownCookies().forEach(function(cookie) {
          data[cookie] = _this.read(cookie);
        });
        return data;
      },

      /**
        Clears the store by deleting all session cookies prefixed with the
        `cookieNamePrefix` (see
        [`SimpleAuth.Stores.Cookie#cookieNamePrefix`](#SimpleAuth-Stores-Cookie-cookieNamePrefix)).

        @method clear
      */
      clear: function() {
        var _this = this;
        this.knownCookies().forEach(function(cookie) {
          _this.write(cookie, null, 0);
        });
        this._lastData = null;
      },

      /**
        @method read
        @private
      */
      read: function(name) {
        var value = document.cookie.match(new RegExp(this.cookieNamePrefix + name + '=([^;]+)')) || [];
        return decodeURIComponent(value[1] || '');
      },

      /**
        @method write
        @private
      */
      write: function(name, value, expiration) {
        var expires = Ember.isEmpty(expiration) ? '' : '; expires=' + new Date(expiration).toUTCString();
        var secure  = !!this._secureCookies ? ';secure' : '';
        document.cookie = this.cookieNamePrefix + name + '=' + encodeURIComponent(value) + expires + secure;
      },

      /**
        @method knownCookies
        @private
      */
      knownCookies: function() {
        var _this = this;
        return Ember.A(document.cookie.split(/[=;\s]+/)).filter(function(element) {
          return new RegExp('^' + _this.cookieNamePrefix).test(element);
        }).map(function(cookie) {
          return cookie.replace(_this.cookieNamePrefix, '');
        });
      },

      /**
        @method syncData
        @private
      */
      syncData: function() {
        var data = this.restore();
        if (!flatObjectsAreEqual(data, this._lastData)) {
          this._lastData = data;
          this.trigger('sessionDataUpdated', data);
        }
        if (!Ember.testing) {
          Ember.run.cancel(this._syncDataTimeout);
          this._syncDataTimeout = Ember.run.later(this, this.syncData, 500);
        }
      }
    });
  });