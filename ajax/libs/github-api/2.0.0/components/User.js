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
               // eslint-disable-line
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
         key: 'listRepos',
         value: function listRepos(options, cb) {
            if (typeof options === 'function') {
               cb = options;
               options = {};
            }

            options = this._getOptionsWithDefaults(options);

            log('Fetching repositories with options: ' + JSON.stringify(options));
            return this._requestAllPages(this.__getScopedUrl('repos'), options, cb);
         }
      }, {
         key: 'listOrgs',
         value: function listOrgs(cb) {
            return this._request('GET', this.__getScopedUrl('orgs'), null, cb);
         }
      }, {
         key: 'listGists',
         value: function listGists(cb) {
            return this._request('GET', this.__getScopedUrl('gists'), null, cb);
         }
      }, {
         key: 'listNotifications',
         value: function listNotifications(options, cb) {
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
         key: 'listStarredRepos',
         value: function listStarredRepos(cb) {
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
//# sourceMappingURL=data:application/json;base64,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Q0FBYyxRQUFkLHVCQUEyQyxLQUFLLE1BQWhELEVBQTBELElBQTFELEVBQWdFLEVBQWhFLENBQVA7QUFDRjs7O29DQVNVLE8sRUFBUyxFLEVBQUk7QUFDckIsbUJBQU8sS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFzQixhQUF0QixFQUFxQyxPQUFyQyxFQUE4QyxFQUE5QyxDQUFQO0FBQ0Y7Ozs7OztBQUdKLFVBQU8sT0FBUCxHQUFpQixJQUFqQiIsImZpbGUiOiJVc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuY29uc3QgbG9nID0gZGVidWcoJ2dpdGh1Yjp1c2VyJyk7XG5cbi8qKlxuICogQSBVc2VyIGFsbG93cyBzY29waW5nIG9mIEFQSSByZXF1ZXN0cyB0byBhIHBhcnRpY3VsYXIgR2l0aHViIHVzZXIuXG4gKi9cbmNsYXNzIFVzZXIgZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XG4gICAvKipcbiAgICAqIENyZWF0ZSBhIFVzZXIuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW3VzZXJuYW1lXSAtIHRoZSB1c2VyIHRvIHVzZSBmb3IgdXNlci1zY29wZWQgcXVlcmllc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSBpbmZvcm1hdGlvbiByZXF1aXJlZCB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxuICAgICovXG4gICBjb25zdHJ1Y3Rvcih1c2VybmFtZSwgYXV0aCwgYXBpQmFzZSkge1xuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XG4gICAgICB0aGlzLl9fdXNlciA9IHVzZXJuYW1lO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCB0aGUgdXJsIGZvciB0aGUgcmVxdWVzdC4gKGRlcGVuZGVudCBvbiBpZiB3ZSdyZSByZXF1ZXN0aW5nIGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyIG9yIG5vdClcbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gZW5kcG9pbnQgLSB0aGUgZW5kcG9pbnQgYmVpbmcgcmVxdWVzdGVkXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHJlc29sdmVkIGVuZHBvaW50XG4gICAgKi9cbiAgIF9fZ2V0U2NvcGVkVXJsKGVuZHBvaW50KSB7XG4gICAgICBpZiAodGhpcy5fX3VzZXIpIHtcbiAgICAgICAgIHJldHVybiBlbmRwb2ludCA/XG4gICAgICAgICAgICBgL3VzZXJzLyR7dGhpcy5fX3VzZXJ9LyR7ZW5kcG9pbnR9YCA6XG4gICAgICAgICAgICBgL3VzZXJzLyR7dGhpcy5fX3VzZXJ9YFxuICAgICAgICAgICAgO1xuXG4gICAgICB9IGVsc2UgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICBzd2l0Y2ggKGVuZHBvaW50KSB7XG4gICAgICAgICAgICBjYXNlICcnOlxuICAgICAgICAgICAgICAgcmV0dXJuICcvdXNlcic7XG5cbiAgICAgICAgICAgIGNhc2UgJ25vdGlmaWNhdGlvbnMnOlxuICAgICAgICAgICAgY2FzZSAnZ2lzdHMnOlxuICAgICAgICAgICAgICAgcmV0dXJuIGAvJHtlbmRwb2ludH1gO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgcmV0dXJuIGAvdXNlci8ke2VuZHBvaW50fWA7XG4gICAgICAgICB9XG4gICAgICB9XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgdXNlcidzIHJlcG9zaXRvcmllc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNsaXN0LXVzZXItcmVwb3NpdG9yaWVzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gYW55IG9wdGlvbnMgdG8gcmVmaW5lIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RSZXBvcyhvcHRpb25zLCBjYikge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICBjYiA9IG9wdGlvbnM7XG4gICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zV2l0aERlZmF1bHRzKG9wdGlvbnMpO1xuXG4gICAgICBsb2coYEZldGNoaW5nIHJlcG9zaXRvcmllcyB3aXRoIG9wdGlvbnM6ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YCk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKHRoaXMuX19nZXRTY29wZWRVcmwoJ3JlcG9zJyksIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBvcmdzIHRoYXQgdGhlIHVzZXIgYmVsb25ncyB0b1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvI2xpc3QtdXNlci1vcmdhbml6YXRpb25zXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIG9yZ2FuaXphdGlvbnNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdE9yZ3MoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCB0aGlzLl9fZ2V0U2NvcGVkVXJsKCdvcmdzJyksIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSB1c2VyJ3MgZ2lzdHNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXN0cy8jbGlzdC1hLXVzZXJzLWdpc3RzXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGdpc3RzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RHaXN0cyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIHRoaXMuX19nZXRTY29wZWRVcmwoJ2dpc3RzJyksIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSB1c2VyJ3Mgbm90aWZpY2F0aW9uc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2FjdGl2aXR5L25vdGlmaWNhdGlvbnMvI2xpc3QteW91ci1ub3RpZmljYXRpb25zXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gYW55IG9wdGlvbnMgdG8gcmVmaW5lIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3ROb3RpZmljYXRpb25zKG9wdGlvbnMsIGNiKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgY2IgPSBvcHRpb25zO1xuICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zLnNpbmNlID0gdGhpcy5fZGF0ZVRvSVNPKG9wdGlvbnMuc2luY2UpO1xuICAgICAgb3B0aW9ucy5iZWZvcmUgPSB0aGlzLl9kYXRlVG9JU08ob3B0aW9ucy5iZWZvcmUpO1xuXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgdGhpcy5fX2dldFNjb3BlZFVybCgnbm90aWZpY2F0aW9ucycpLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU2hvdyB0aGUgdXNlcidzIHByb2ZpbGVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My91c2Vycy8jZ2V0LWEtc2luZ2xlLXVzZXJcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHVzZXIncyBpbmZvcm1hdGlvblxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRQcm9maWxlKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgdGhpcy5fX2dldFNjb3BlZFVybCgnJyksIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXRzIHRoZSBsaXN0IG9mIHN0YXJyZWQgcmVwb3NpdG9yaWVzIGZvciB0aGUgdXNlclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2FjdGl2aXR5L3N0YXJyaW5nLyNsaXN0LXJlcG9zaXRvcmllcy1iZWluZy1zdGFycmVkXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHN0YXJyZWQgcmVwb3NpdG9yaWVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RTdGFycmVkUmVwb3MoY2IpIHtcbiAgICAgIGxldCByZXF1ZXN0T3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnNXaXRoRGVmYXVsdHMoKTtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXModGhpcy5fX2dldFNjb3BlZFVybCgnc3RhcnJlZCcpLCByZXF1ZXN0T3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEhhdmUgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBmb2xsb3cgdGhpcyB1c2VyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvdXNlcnMvZm9sbG93ZXJzLyNmb2xsb3ctYS11c2VyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWUgLSB0aGUgdXNlciB0byBmb2xsb3dcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBzdWNjZWVkc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBmb2xsb3codXNlcm5hbWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC91c2VyL2ZvbGxvd2luZy8ke3RoaXMuX191c2VyfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBIYXZlIHRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyIHVuZm9sbG93IHRoaXMgdXNlclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3VzZXJzL2ZvbGxvd2Vycy8jZm9sbG93LWEtdXNlclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIC0gdGhlIHVzZXIgdG8gdW5mb2xsb3dcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSByZWNlaXZlcyB0cnVlIGlmIHRoZSByZXF1ZXN0IHN1Y2NlZWRzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVuZm9sbG93KHVzZXJuYW1lLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvdXNlci9mb2xsb3dpbmcvJHt0aGlzLl9fdXNlcn1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IHJlcG9zaXRvcnkgZm9yIHRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2NyZWF0ZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSB0aGUgcmVwb3NpdG9yeSBkZWZpbml0aW9uXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBBUEkgcmVzcG9uc2VcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlUmVwbyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCAnL3VzZXIvcmVwb3MnLCBvcHRpb25zLCBjYik7XG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcbiJdfQ==
//# sourceMappingURL=User.js.map
