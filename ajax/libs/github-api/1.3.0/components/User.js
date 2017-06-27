(function (global, factory) {
   if (typeof define === "function" && define.amd) {
      define(['module', './Requestable', 'debug'], factory);
   } else if (typeof exports !== "undefined") {
      factory(module, require('./Requestable'), require('debug'));
   } else {
      var mod = {
         exports: {}
      };
      factory(mod, global.Requestable, global.debug);
      global.User = mod.exports;
   }
})(this, function (module, _Requestable2, _debug) {
   'use strict';

   var _Requestable3 = _interopRequireDefault(_Requestable2);

   var _debug2 = _interopRequireDefault(_debug);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var _createClass = function () {
      function defineProperties(target, props) {
         for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
         }
      }

      return function (Constructor, protoProps, staticProps) {
         if (protoProps) defineProperties(Constructor.prototype, protoProps);
         if (staticProps) defineProperties(Constructor, staticProps);
         return Constructor;
      };
   }();

   function _possibleConstructorReturn(self, call) {
      if (!self) {
         throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
   }

   function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
         throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
         constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
         }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
   }

   var log = (0, _debug2.default)('github:user');

   /**
    * A User allows scoping of API requests to a particular Github user.
    */

   var User = function (_Requestable) {
      _inherits(User, _Requestable);

      /**
       * Create a User.
       * @param {string} [username] - the user to use for user-scoped queries
       * @param {Requestable.auth} [auth] - information required to authenticate to Github
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */

      function User(username, auth, apiBase) {
         _classCallCheck(this, User);

         var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(User).call(this, auth, apiBase));

         _this.__user = username;
         return _this;
      }

      /**
       * Get the url for the request. (dependent on if we're requesting for the authenticated user or not)
       * @private
       * @param {string} endpoint - the endpoint being requested
       * @return {string} - the resolved endpoint
       */


      _createClass(User, [{
         key: '__getScopedUrl',
         value: function __getScopedUrl(endpoint) {
            if (this.__user) {
               return endpoint ? '/users/' + this.__user + '/' + endpoint : '/users/' + this.__user;
            } else {
               switch (endpoint) {
                  case '':
                     return '/user';

                  case 'notifications':
                  case 'gists':
                     return '/' + endpoint;

                  default:
                     return '/user/' + endpoint;
               }
            }
         }
      }, {
         key: 'getRepos',
         value: function getRepos(options, cb) {
            if (typeof options === 'function') {
               cb = options;
               options = {};
            }

            options = this._getOptionsWithDefaults(options);

            log('Fetching repositories with options: ' + JSON.stringify(options));
            return this._requestAllPages(this.__getScopedUrl('repos'), options, cb);
         }
      }, {
         key: 'getOrgs',
         value: function getOrgs(cb) {
            return this._request('GET', this.__getScopedUrl('orgs'), null, cb);
         }
      }, {
         key: 'getGists',
         value: function getGists(cb) {
            return this._request('GET', this.__getScopedUrl('gists'), null, cb);
         }
      }, {
         key: 'getNotifications',
         value: function getNotifications(options, cb) {
            options = options || {};
            if (typeof options === 'function') {
               cb = options;
               options = {};
            }

            options.since = this._dateToISO(options.since);
            options.before = this._dateToISO(options.before);

            return this._request('GET', this.__getScopedUrl('notifications'), options, cb);
         }
      }, {
         key: 'getProfile',
         value: function getProfile(cb) {
            return this._request('GET', this.__getScopedUrl(''), null, cb);
         }
      }, {
         key: 'getStarredRepos',
         value: function getStarredRepos(cb) {
            var requestOptions = this._getOptionsWithDefaults();
            return this._requestAllPages(this.__getScopedUrl('starred'), requestOptions, cb);
         }
      }, {
         key: 'follow',
         value: function follow(username, cb) {
            return this._request('PUT', '/user/following/' + this.__user, null, cb);
         }
      }, {
         key: 'unfollow',
         value: function unfollow(username, cb) {
            return this._request('DELETE', '/user/following/' + this.__user, null, cb);
         }
      }, {
         key: 'createRepo',
         value: function createRepo(options, cb) {
            return this._request('POST', '/user/repos', options, cb);
         }
      }]);

      return User;
   }(_Requestable3.default);

   module.exports = User;
});
//# sourceMappingURL=data:application/json;base64,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QWMsUUFBZCx1QkFBMkMsS0FBSyxNQUFoRCxFQUEwRCxJQUExRCxFQUFnRSxFQUFoRSxDQUFQO0FBQ0Y7OztvQ0FTVSxPLEVBQVMsRSxFQUFJO0FBQ3JCLG1CQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsRUFBc0IsYUFBdEIsRUFBcUMsT0FBckMsRUFBOEMsRUFBOUMsQ0FBUDtBQUNGOzs7Ozs7QUFHSixVQUFPLE9BQVAsR0FBaUIsSUFBakIiLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6dXNlcicpO1xuXG4vKipcbiAqIEEgVXNlciBhbGxvd3Mgc2NvcGluZyBvZiBBUEkgcmVxdWVzdHMgdG8gYSBwYXJ0aWN1bGFyIEdpdGh1YiB1c2VyLlxuICovXG5jbGFzcyBVc2VyIGV4dGVuZHMgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBVc2VyLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFt1c2VybmFtZV0gLSB0aGUgdXNlciB0byB1c2UgZm9yIHVzZXItc2NvcGVkIHF1ZXJpZXNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IodXNlcm5hbWUsIGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgICAgdGhpcy5fX3VzZXIgPSB1c2VybmFtZTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgdGhlIHVybCBmb3IgdGhlIHJlcXVlc3QuIChkZXBlbmRlbnQgb24gaWYgd2UncmUgcmVxdWVzdGluZyBmb3IgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBvciBub3QpXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGVuZHBvaW50IC0gdGhlIGVuZHBvaW50IGJlaW5nIHJlcXVlc3RlZFxuICAgICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSByZXNvbHZlZCBlbmRwb2ludFxuICAgICovXG4gICBfX2dldFNjb3BlZFVybChlbmRwb2ludCkge1xuICAgICAgaWYgKHRoaXMuX191c2VyKSB7XG4gICAgICAgICByZXR1cm4gZW5kcG9pbnQgP1xuICAgICAgICAgICAgYC91c2Vycy8ke3RoaXMuX191c2VyfS8ke2VuZHBvaW50fWBcbiAgICAgICAgICAgIDogYC91c2Vycy8ke3RoaXMuX191c2VyfWBcbiAgICAgICAgICAgIDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBzd2l0Y2ggKGVuZHBvaW50KSB7XG4gICAgICAgICAgICBjYXNlICcnOlxuICAgICAgICAgICAgICAgcmV0dXJuICcvdXNlcic7XG5cbiAgICAgICAgICAgIGNhc2UgJ25vdGlmaWNhdGlvbnMnOlxuICAgICAgICAgICAgY2FzZSAnZ2lzdHMnOlxuICAgICAgICAgICAgICAgcmV0dXJuIGAvJHtlbmRwb2ludH1gO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgcmV0dXJuIGAvdXNlci8ke2VuZHBvaW50fWA7XG4gICAgICAgICB9XG4gICAgICB9XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgdXNlcidzIHJlcG9zaXRvcmllc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNsaXN0LXVzZXItcmVwb3NpdG9yaWVzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gYW55IG9wdGlvbnMgdG8gcmVmaW5lIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFJlcG9zKG9wdGlvbnMsIGNiKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgIGNiID0gb3B0aW9ucztcbiAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0aW9ucyk7XG5cbiAgICAgIGxvZyhgRmV0Y2hpbmcgcmVwb3NpdG9yaWVzIHdpdGggb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gKTtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXModGhpcy5fX2dldFNjb3BlZFVybCgncmVwb3MnKSwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIG9yZ3MgdGhhdCB0aGUgdXNlciBiZWxvbmdzIHRvXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy8jbGlzdC11c2VyLW9yZ2FuaXphdGlvbnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2Ygb3JnYW5pemF0aW9uc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRPcmdzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgdGhpcy5fX2dldFNjb3BlZFVybCgnb3JncycpLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgdXNlcidzIGdpc3RzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2lzdHMvI2xpc3QtYS11c2Vycy1naXN0c1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBnaXN0c1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRHaXN0cyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIHRoaXMuX19nZXRTY29wZWRVcmwoJ2dpc3RzJyksIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSB1c2VyJ3Mgbm90aWZpY2F0aW9uc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2FjdGl2aXR5L25vdGlmaWNhdGlvbnMvI2xpc3QteW91ci1ub3RpZmljYXRpb25zXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gYW55IG9wdGlvbnMgdG8gcmVmaW5lIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldE5vdGlmaWNhdGlvbnMob3B0aW9ucywgY2IpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICBjYiA9IG9wdGlvbnM7XG4gICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMuc2luY2UgPSB0aGlzLl9kYXRlVG9JU08ob3B0aW9ucy5zaW5jZSk7XG4gICAgICBvcHRpb25zLmJlZm9yZSA9IHRoaXMuX2RhdGVUb0lTTyhvcHRpb25zLmJlZm9yZSk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCB0aGlzLl9fZ2V0U2NvcGVkVXJsKCdub3RpZmljYXRpb25zJyksIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBTaG93IHRoZSB1c2VyJ3MgcHJvZmlsZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3VzZXJzLyNnZXQtYS1zaW5nbGUtdXNlclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgdXNlcidzIGluZm9ybWF0aW9uXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFByb2ZpbGUoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCB0aGlzLl9fZ2V0U2NvcGVkVXJsKCcnKSwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldHMgdGhlIGxpc3Qgb2Ygc3RhcnJlZCByZXBvc2l0b3JpZXMgZm9yIHRoZSB1c2VyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvc3RhcnJpbmcvI2xpc3QtcmVwb3NpdG9yaWVzLWJlaW5nLXN0YXJyZWRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2Ygc3RhcnJlZCByZXBvc2l0b3JpZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0U3RhcnJlZFJlcG9zKGNiKSB7XG4gICAgICBsZXQgcmVxdWVzdE9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zV2l0aERlZmF1bHRzKCk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKHRoaXMuX19nZXRTY29wZWRVcmwoJ3N0YXJyZWQnKSwgcmVxdWVzdE9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBIYXZlIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgZm9sbG93IHRoaXMgdXNlclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3VzZXJzL2ZvbGxvd2Vycy8jZm9sbG93LWEtdXNlclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIC0gdGhlIHVzZXIgdG8gZm9sbG93XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3Qgc3VjY2VlZHNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZm9sbG93KHVzZXJuYW1lLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvdXNlci9mb2xsb3dpbmcvJHt0aGlzLl9fdXNlcn1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogSGF2ZSB0aGUgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgdXNlciB1bmZvbGxvdyB0aGlzIHVzZXJcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My91c2Vycy9mb2xsb3dlcnMvI2ZvbGxvdy1hLXVzZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSAtIHRoZSB1c2VyIHRvIHVuZm9sbG93XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gcmVjZWl2ZXMgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBzdWNjZWVkc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1bmZvbGxvdyh1c2VybmFtZSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3VzZXIvZm9sbG93aW5nLyR7dGhpcy5fX3VzZXJ9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyByZXBvc2l0b3J5IGZvciB0aGUgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgdXNlclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNjcmVhdGVcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gdGhlIHJlcG9zaXRvcnkgZGVmaW5pdGlvblxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgQVBJIHJlc3BvbnNlXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZVJlcG8ob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgJy91c2VyL3JlcG9zJywgb3B0aW9ucywgY2IpO1xuICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXI7XG4iXX0=
//# sourceMappingURL=User.js.map
