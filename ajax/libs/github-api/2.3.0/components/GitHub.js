(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', './Gist', './User', './Issue', './Search', './RateLimit', './Repository', './Organization', './Team', './Markdown'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('./Gist'), require('./User'), require('./Issue'), require('./Search'), require('./RateLimit'), require('./Repository'), require('./Organization'), require('./Team'), require('./Markdown'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.Gist, global.User, global.Issue, global.Search, global.RateLimit, global.Repository, global.Organization, global.Team, global.Markdown);
    global.GitHub = mod.exports;
  }
})(this, function (module, _Gist, _User, _Issue, _Search, _RateLimit, _Repository, _Organization, _Team, _Markdown) {
  'use strict';

  var _Gist2 = _interopRequireDefault(_Gist);

  var _User2 = _interopRequireDefault(_User);

  var _Issue2 = _interopRequireDefault(_Issue);

  var _Search2 = _interopRequireDefault(_Search);

  var _RateLimit2 = _interopRequireDefault(_RateLimit);

  var _Repository2 = _interopRequireDefault(_Repository);

  var _Organization2 = _interopRequireDefault(_Organization);

  var _Team2 = _interopRequireDefault(_Team);

  var _Markdown2 = _interopRequireDefault(_Markdown);

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

  var GitHub = function () {
    /**
     * Create a new GitHub.
     * @param {Requestable.auth} [auth] - the credentials to authenticate to Github. If auth is
     *                                  not provided requests will be made unauthenticated
     * @param {string} [apiBase=https://api.github.com] - the base Github API URL
     */

    function GitHub(auth) {
      var apiBase = arguments.length <= 1 || arguments[1] === undefined ? 'https://api.github.com' : arguments[1];

      _classCallCheck(this, GitHub);

      this.__apiBase = apiBase;
      this.__auth = auth || {};
    }

    /**
     * Create a new Gist wrapper
     * @param {number} [id] - the id for the gist, leave undefined when creating a new gist
     * @return {Gist}
     */


    _createClass(GitHub, [{
      key: 'getGist',
      value: function getGist(id) {
        return new _Gist2.default(id, this.__auth, this.__apiBase);
      }
    }, {
      key: 'getUser',
      value: function getUser(user) {
        return new _User2.default(user, this.__auth, this.__apiBase);
      }
    }, {
      key: 'getOrganization',
      value: function getOrganization(organization) {
        return new _Organization2.default(organization, this.__auth, this.__apiBase);
      }
    }, {
      key: 'getTeam',
      value: function getTeam(teamId) {
        return new _Team2.default(teamId, this.__auth, this.__apiBase);
      }
    }, {
      key: 'getRepo',
      value: function getRepo(user, repo) {
        return new _Repository2.default(this._getFullName(user, repo), this.__auth, this.__apiBase);
      }
    }, {
      key: 'getIssues',
      value: function getIssues(user, repo) {
        return new _Issue2.default(this._getFullName(user, repo), this.__auth, this.__apiBase);
      }
    }, {
      key: 'search',
      value: function search(query) {
        return new _Search2.default(query, this.__auth, this.__apiBase);
      }
    }, {
      key: 'getRateLimit',
      value: function getRateLimit() {
        return new _RateLimit2.default(this.__auth, this.__apiBase);
      }
    }, {
      key: 'getMarkdown',
      value: function getMarkdown() {
        return new _Markdown2.default(this.__auth, this.__apiBase);
      }
    }, {
      key: '_getFullName',
      value: function _getFullName(user, repo) {
        var fullname = user;

        if (repo) {
          fullname = user + '/' + repo;
        }

        return fullname;
      }
    }]);

    return GitHub;
  }();

  module.exports = GitHub;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdpdEh1Yi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFxQk0sTTs7Ozs7Ozs7QUFPSCxvQkFBWSxJQUFaLEVBQXNEO0FBQUEsVUFBcEMsT0FBb0MseURBQTFCLHdCQUEwQjs7QUFBQTs7QUFDbkQsV0FBSyxTQUFMLEdBQWlCLE9BQWpCO0FBQ0EsV0FBSyxNQUFMLEdBQWMsUUFBUSxFQUF0QjtBQUNGOzs7Ozs7Ozs7Ozs4QkFPTyxFLEVBQUk7QUFDVCxlQUFPLG1CQUFTLEVBQVQsRUFBYSxLQUFLLE1BQWxCLEVBQTBCLEtBQUssU0FBL0IsQ0FBUDtBQUNGOzs7OEJBUU8sSSxFQUFNO0FBQ1gsZUFBTyxtQkFBUyxJQUFULEVBQWUsS0FBSyxNQUFwQixFQUE0QixLQUFLLFNBQWpDLENBQVA7QUFDRjs7O3NDQU9lLFksRUFBYztBQUMzQixlQUFPLDJCQUFpQixZQUFqQixFQUErQixLQUFLLE1BQXBDLEVBQTRDLEtBQUssU0FBakQsQ0FBUDtBQUNGOzs7OEJBT08sTSxFQUFRO0FBQ2IsZUFBTyxtQkFBUyxNQUFULEVBQWlCLEtBQUssTUFBdEIsRUFBOEIsS0FBSyxTQUFuQyxDQUFQO0FBQ0Y7Ozs4QkFRTyxJLEVBQU0sSSxFQUFNO0FBQ2pCLGVBQU8seUJBQWUsS0FBSyxZQUFMLENBQWtCLElBQWxCLEVBQXdCLElBQXhCLENBQWYsRUFBOEMsS0FBSyxNQUFuRCxFQUEyRCxLQUFLLFNBQWhFLENBQVA7QUFDRjs7O2dDQVFTLEksRUFBTSxJLEVBQU07QUFDbkIsZUFBTyxvQkFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsQ0FBVixFQUF5QyxLQUFLLE1BQTlDLEVBQXNELEtBQUssU0FBM0QsQ0FBUDtBQUNGOzs7NkJBT00sSyxFQUFPO0FBQ1gsZUFBTyxxQkFBVyxLQUFYLEVBQWtCLEtBQUssTUFBdkIsRUFBK0IsS0FBSyxTQUFwQyxDQUFQO0FBQ0Y7OztxQ0FNYztBQUNaLGVBQU8sd0JBQWMsS0FBSyxNQUFuQixFQUEyQixLQUFLLFNBQWhDLENBQVA7QUFDRjs7O29DQU1hO0FBQ1gsZUFBTyx1QkFBYSxLQUFLLE1BQWxCLEVBQTBCLEtBQUssU0FBL0IsQ0FBUDtBQUNGOzs7bUNBUVksSSxFQUFNLEksRUFBTTtBQUN0QixZQUFJLFdBQVcsSUFBZjs7QUFFQSxZQUFJLElBQUosRUFBVTtBQUNQLHFCQUFjLElBQWQsU0FBc0IsSUFBdEI7QUFDRjs7QUFFRCxlQUFPLFFBQVA7QUFDRjs7Ozs7O0FBR0osU0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6IkdpdEh1Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cbi8qIGVzbGludCB2YWxpZC1qc2RvYzogW1wiZXJyb3JcIiwge1wicmVxdWlyZVJldHVybkRlc2NyaXB0aW9uXCI6IGZhbHNlfV0gKi9cblxuaW1wb3J0IEdpc3QgZnJvbSAnLi9HaXN0JztcbmltcG9ydCBVc2VyIGZyb20gJy4vVXNlcic7XG5pbXBvcnQgSXNzdWUgZnJvbSAnLi9Jc3N1ZSc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJy4vU2VhcmNoJztcbmltcG9ydCBSYXRlTGltaXQgZnJvbSAnLi9SYXRlTGltaXQnO1xuaW1wb3J0IFJlcG9zaXRvcnkgZnJvbSAnLi9SZXBvc2l0b3J5JztcbmltcG9ydCBPcmdhbml6YXRpb24gZnJvbSAnLi9Pcmdhbml6YXRpb24nO1xuaW1wb3J0IFRlYW0gZnJvbSAnLi9UZWFtJztcbmltcG9ydCBNYXJrZG93biBmcm9tICcuL01hcmtkb3duJztcblxuLyoqXG4gKiBHaXRIdWIgZW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IHRvIGNyZWF0ZSB2YXJpb3VzIEFQSSB3cmFwcGVyIG9iamVjdHMuXG4gKi9cbmNsYXNzIEdpdEh1YiB7XG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBHaXRIdWIuXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IFthdXRoXSAtIHRoZSBjcmVkZW50aWFscyB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViLiBJZiBhdXRoIGlzXG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3QgcHJvdmlkZWQgcmVxdWVzdHMgd2lsbCBiZSBtYWRlIHVuYXV0aGVudGljYXRlZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IoYXV0aCwgYXBpQmFzZSA9ICdodHRwczovL2FwaS5naXRodWIuY29tJykge1xuICAgICAgdGhpcy5fX2FwaUJhc2UgPSBhcGlCYXNlO1xuICAgICAgdGhpcy5fX2F1dGggPSBhdXRoIHx8IHt9O1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBHaXN0IHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaWRdIC0gdGhlIGlkIGZvciB0aGUgZ2lzdCwgbGVhdmUgdW5kZWZpbmVkIHdoZW4gY3JlYXRpbmcgYSBuZXcgZ2lzdFxuICAgICogQHJldHVybiB7R2lzdH1cbiAgICAqL1xuICAgZ2V0R2lzdChpZCkge1xuICAgICAgcmV0dXJuIG5ldyBHaXN0KGlkLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBVc2VyIHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdXNlcl0gLSB0aGUgbmFtZSBvZiB0aGUgdXNlciB0byBnZXQgaW5mb3JtYXRpb24gYWJvdXRcbiAgICAqICAgICAgICAgICAgICAgICAgICAgICAgbGVhdmUgdW5kZWZpbmVkIGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyXG4gICAgKiBAcmV0dXJuIHtVc2VyfVxuICAgICovXG4gICBnZXRVc2VyKHVzZXIpIHtcbiAgICAgIHJldHVybiBuZXcgVXNlcih1c2VyLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBPcmdhbml6YXRpb24gd3JhcHBlclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG9yZ2FuaXphdGlvbiAtIHRoZSBuYW1lIG9mIHRoZSBvcmdhbml6YXRpb25cbiAgICAqIEByZXR1cm4ge09yZ2FuaXphdGlvbn1cbiAgICAqL1xuICAgZ2V0T3JnYW5pemF0aW9uKG9yZ2FuaXphdGlvbikge1xuICAgICAgcmV0dXJuIG5ldyBPcmdhbml6YXRpb24ob3JnYW5pemF0aW9uLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIGNyZWF0ZSBhIG5ldyBUZWFtIHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZWFtSWQgLSB0aGUgbmFtZSBvZiB0aGUgdGVhbVxuICAgICogQHJldHVybiB7dGVhbX1cbiAgICAqL1xuICAgZ2V0VGVhbSh0ZWFtSWQpIHtcbiAgICAgIHJldHVybiBuZXcgVGVhbSh0ZWFtSWQsIHRoaXMuX19hdXRoLCB0aGlzLl9fYXBpQmFzZSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IFJlcG9zaXRvcnkgd3JhcHBlclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXIgLSB0aGUgdXNlciB3aG8gb3ducyB0aGUgcmVzcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvIC0gdGhlIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEByZXR1cm4ge1JlcG9zaXRvcnl9XG4gICAgKi9cbiAgIGdldFJlcG8odXNlciwgcmVwbykge1xuICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHRoaXMuX2dldEZ1bGxOYW1lKHVzZXIsIHJlcG8pLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBJc3N1ZSB3cmFwcGVyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlciAtIHRoZSB1c2VyIHdobyBvd25zIHRoZSByZXNwb3NpdG9yeVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSB0aGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeVxuICAgICogQHJldHVybiB7SXNzdWV9XG4gICAgKi9cbiAgIGdldElzc3Vlcyh1c2VyLCByZXBvKSB7XG4gICAgICByZXR1cm4gbmV3IElzc3VlKHRoaXMuX2dldEZ1bGxOYW1lKHVzZXIsIHJlcG8pLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBTZWFyY2ggd3JhcHBlclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IC0gdGhlIHF1ZXJ5IHRvIHNlYXJjaCBmb3JcbiAgICAqIEByZXR1cm4ge1NlYXJjaH1cbiAgICAqL1xuICAgc2VhcmNoKHF1ZXJ5KSB7XG4gICAgICByZXR1cm4gbmV3IFNlYXJjaChxdWVyeSwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgUmF0ZUxpbWl0IHdyYXBwZXJcbiAgICAqIEByZXR1cm4ge1JhdGVMaW1pdH1cbiAgICAqL1xuICAgZ2V0UmF0ZUxpbWl0KCkge1xuICAgICAgcmV0dXJuIG5ldyBSYXRlTGltaXQodGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgTWFya2Rvd24gd3JhcHBlclxuICAgICogQHJldHVybiB7TWFya2Rvd259XG4gICAgKi9cbiAgIGdldE1hcmtkb3duKCkge1xuICAgICAgcmV0dXJuIG5ldyBNYXJrZG93bih0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENvbXB1dGVzIHRoZSBmdWxsIHJlcG9zaXRvcnkgbmFtZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXIgLSB0aGUgdXNlcm5hbWUgKG9yIHRoZSBmdWxsIG5hbWUpXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwbyAtIHRoZSByZXBvc2l0b3J5IG5hbWUsIG11c3Qgbm90IGJlIHBhc3NlZCBpZiBgdXNlcmAgaXMgdGhlIGZ1bGwgbmFtZVxuICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgcmVwb3NpdG9yeSdzIGZ1bGwgbmFtZVxuICAgICovXG4gICBfZ2V0RnVsbE5hbWUodXNlciwgcmVwbykge1xuICAgICAgbGV0IGZ1bGxuYW1lID0gdXNlcjtcblxuICAgICAgaWYgKHJlcG8pIHtcbiAgICAgICAgIGZ1bGxuYW1lID0gYCR7dXNlcn0vJHtyZXBvfWA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmdWxsbmFtZTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHaXRIdWI7XG4iXX0=
//# sourceMappingURL=GitHub.js.map
