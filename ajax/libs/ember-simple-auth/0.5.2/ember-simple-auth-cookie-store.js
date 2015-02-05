(function(global) {

var define, requireModule;

(function() {
  var registry = {}, seen = {};

  define = function(name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requireModule = function(name) {
    if (seen.hasOwnProperty(name)) { return seen[name]; }
    seen[name] = {};

    if (!registry[name]) {
      throw new Error("Could not find module " + name);
    }

    var mod = registry[name],
        deps = mod.deps,
        callback = mod.callback,
        reified = [],
        exports;

    for (var i=0, l=deps.length; i<l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(resolve(deps[i])));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;

    function resolve(child) {
      if (child.charAt(0) !== '.') { return child; }
      var parts = child.split("/");
      var parentBase = name.split("/").slice(0, -1);

      for (var i=0, l=parts.length; i<l; i++) {
        var part = parts[i];

        if (part === '..') { parentBase.pop(); }
        else if (part === '.') { continue; }
        else { parentBase.push(part); }
      }

      return parentBase.join("/");
    }
  };

  requireModule.registry = registry;
})();

define("ember-simple-auth-cookie-store", 
  ["./ember-simple-auth-cookie-store/stores/cookie","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Cookie = __dependency1__.Cookie;

    __exports__["default"] = Cookie;
  });
define("ember-simple-auth-cookie-store/stores/cookie", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    /**
      Store that saves its data in session cookies.

      __In order to keep multiple tabs/windows of an application in sync, this
      store has to periodically (every 500ms) check the cookies__ for changes as
      there are no events that notify of changes in cookies. The recommended
      alternative is `Ember.SimpleAuth.Stores.LocalStorage` that also persistently
      stores data but instead of cookies relies on the `localStorage` API and does
      not need to poll for external changes.

      _The factory for this store is registered as
      `'ember-simple-auth-session-store:cookie'` in Ember's container._

      @class Cookie
      @namespace Stores
      @extends Stores.Base
    */
    var Cookie = Ember.SimpleAuth.Stores.Base.extend({
      /**
        The prefix to use for the store's cookie names so they can be distinguished
        from other cookies.

        @property cookieNamePrefix
        @type String
        @default 'ember_simple_auth:'
      */
      cookieNamePrefix: 'ember_simple_auth:',

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
        this.syncData();
      },

      /**
        Persists the `data` in session cookies.

        @method persist
        @param {Object} data The data to persist
      */
      persist: function(data) {
        for (var property in data) {
          this.write(property, data[property], null);
        }
        this._lastData = this.restore();
      },

      /**
        Restores all data currently saved in the session cookies identified by the
        `cookieNamePrefix` (see
        [Ember.SimpleAuth.Stores.Cookie#cookieNamePrefix](Ember-SimpleAuth-Stores-Cookie-cookieNamePrefix))
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
        [Ember.SimpleAuth.Stores.Cookie#cookieNamePrefix](Ember-SimpleAuth-Stores-Cookie-cookieNamePrefix)).

        @method clear
      */
      clear: function() {
        var _this = this;
        this.knownCookies().forEach(function(cookie) {
          _this.write(cookie, null, (new Date(0)).toGMTString());
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
        var expires = Ember.isEmpty(expiration) ? '' : '; expires=' + expiration;
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
        if (!Ember.SimpleAuth.Utils.flatObjectsAreEqual(data, this._lastData)) {
          this._lastData = data;
          this.trigger('sessionDataUpdated', data);
        }
        if (!Ember.testing) {
          Ember.run.cancel(this._syncDataTimeout);
          this._syncDataTimeout = Ember.run.later(this, this.syncData, 500);
        }
      }
    });

    __exports__.Cookie = Cookie;
  });
global.Ember.SimpleAuth.Stores.Cookie = requireModule('ember-simple-auth-cookie-store').default;

global.Ember.SimpleAuth.initializeExtension(function(container, application, options) {
  container.register('ember-simple-auth-session-store:cookie', global.Ember.SimpleAuth.Stores.Cookie);
});
})((typeof global !== 'undefined') ? global : window);
