(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', './Gist', './User', './Issue', './Search', './RateLimit', './Repository', './Organization', './Markdown'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('./Gist'), require('./User'), require('./Issue'), require('./Search'), require('./RateLimit'), require('./Repository'), require('./Organization'), require('./Markdown'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.Gist, global.User, global.Issue, global.Search, global.RateLimit, global.Repository, global.Organization, global.Markdown);
    global.GitHub = mod.exports;
  }
})(this, function (module, _Gist, _User, _Issue, _Search, _RateLimit, _Repository, _Organization, _Markdown) {
  'use strict';

  var _Gist2 = _interopRequireDefault(_Gist);

  var _User2 = _interopRequireDefault(_User);

  var _Issue2 = _interopRequireDefault(_Issue);

  var _Search2 = _interopRequireDefault(_Search);

  var _RateLimit2 = _interopRequireDefault(_RateLimit);

  var _Repository2 = _interopRequireDefault(_Repository);

  var _Organization2 = _interopRequireDefault(_Organization);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdpdEh1Yi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BbUJNLE07Ozs7Ozs7O0FBT0gsb0JBQVksSUFBWixFQUFzRDtBQUFBLFVBQXBDLE9BQW9DLHlEQUExQix3QkFBMEI7O0FBQUE7O0FBQ25ELFdBQUssU0FBTCxHQUFpQixPQUFqQjtBQUNBLFdBQUssTUFBTCxHQUFjLFFBQVEsRUFBdEI7QUFDRjs7Ozs7Ozs7Ozs7OEJBT08sRSxFQUFJO0FBQ1QsZUFBTyxtQkFBUyxFQUFULEVBQWEsS0FBSyxNQUFsQixFQUEwQixLQUFLLFNBQS9CLENBQVA7QUFDRjs7OzhCQVFPLEksRUFBTTtBQUNYLGVBQU8sbUJBQVMsSUFBVCxFQUFlLEtBQUssTUFBcEIsRUFBNEIsS0FBSyxTQUFqQyxDQUFQO0FBQ0Y7OztzQ0FPZSxZLEVBQWM7QUFDM0IsZUFBTywyQkFBaUIsWUFBakIsRUFBK0IsS0FBSyxNQUFwQyxFQUE0QyxLQUFLLFNBQWpELENBQVA7QUFDRjs7OzhCQVFPLEksRUFBTSxJLEVBQU07QUFDakIsZUFBTyx5QkFBZSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsQ0FBZixFQUE4QyxLQUFLLE1BQW5ELEVBQTJELEtBQUssU0FBaEUsQ0FBUDtBQUNGOzs7Z0NBUVMsSSxFQUFNLEksRUFBTTtBQUNuQixlQUFPLG9CQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFWLEVBQXlDLEtBQUssTUFBOUMsRUFBc0QsS0FBSyxTQUEzRCxDQUFQO0FBQ0Y7Ozs2QkFPTSxLLEVBQU87QUFDWCxlQUFPLHFCQUFXLEtBQVgsRUFBa0IsS0FBSyxNQUF2QixFQUErQixLQUFLLFNBQXBDLENBQVA7QUFDRjs7O3FDQU1jO0FBQ1osZUFBTyx3QkFBYyxLQUFLLE1BQW5CLEVBQTJCLEtBQUssU0FBaEMsQ0FBUDtBQUNGOzs7b0NBTWE7QUFDVixlQUFPLHVCQUFhLEtBQUssTUFBbEIsRUFBMEIsS0FBSyxTQUEvQixDQUFQO0FBQ0g7OzttQ0FFWSxJLEVBQU0sSSxFQUFNO0FBQ3RCLFlBQUksV0FBVyxJQUFmOztBQUVBLFlBQUksSUFBSixFQUFVO0FBQ1AscUJBQWMsSUFBZCxTQUFzQixJQUF0QjtBQUNGOztBQUVELGVBQU8sUUFBUDtBQUNGOzs7Ozs7QUFHSixTQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiR2l0SHViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuXG5pbXBvcnQgR2lzdCBmcm9tICcuL0dpc3QnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJztcbmltcG9ydCBJc3N1ZSBmcm9tICcuL0lzc3VlJztcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi9TZWFyY2gnO1xuaW1wb3J0IFJhdGVMaW1pdCBmcm9tICcuL1JhdGVMaW1pdCc7XG5pbXBvcnQgUmVwb3NpdG9yeSBmcm9tICcuL1JlcG9zaXRvcnknO1xuaW1wb3J0IE9yZ2FuaXphdGlvbiBmcm9tICcuL09yZ2FuaXphdGlvbic7XG5pbXBvcnQgTWFya2Rvd24gZnJvbSAnLi9NYXJrZG93bic7XG5cbi8qKlxuICogR2l0SHViIGVuY2Fwc3VsYXRlcyB0aGUgZnVuY3Rpb25hbGl0eSB0byBjcmVhdGUgdmFyaW91cyBBUEkgd3JhcHBlciBvYmplY3RzLlxuICovXG5jbGFzcyBHaXRIdWIge1xuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgR2l0SHViLlxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSB0aGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1Yi4gSWYgYXV0aCBpc1xuICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90IHByb3ZpZGVkIHJlcXVlc3RzIHdpbGwgYmUgbWFkZSB1bmF1dGhlbnRpY2F0ZWRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYXBpQmFzZT1odHRwczovL2FwaS5naXRodWIuY29tXSAtIHRoZSBiYXNlIEdpdGh1YiBBUEkgVVJMXG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKGF1dGgsIGFwaUJhc2UgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbScpIHtcbiAgICAgIHRoaXMuX19hcGlCYXNlID0gYXBpQmFzZTtcbiAgICAgIHRoaXMuX19hdXRoID0gYXV0aCB8fCB7fTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgR2lzdCB3cmFwcGVyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gW2lkXSAtIHRoZSBpZCBmb3IgdGhlIGdpc3QsIGxlYXZlIHVuZGVmaW5lZCB3aGVuIGNyZWF0aW5nIGEgbmV3IGdpc3RcbiAgICAqIEByZXR1cm4ge0dpc3R9XG4gICAgKi9cbiAgIGdldEdpc3QoaWQpIHtcbiAgICAgIHJldHVybiBuZXcgR2lzdChpZCwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgVXNlciB3cmFwcGVyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW3VzZXJdIC0gdGhlIG5hbWUgb2YgdGhlIHVzZXIgdG8gZ2V0IGluZm9ybWF0aW9uIGFib3V0XG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgIGxlYXZlIHVuZGVmaW5lZCBmb3IgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlclxuICAgICogQHJldHVybiB7VXNlcn1cbiAgICAqL1xuICAgZ2V0VXNlcih1c2VyKSB7XG4gICAgICByZXR1cm4gbmV3IFVzZXIodXNlciwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgT3JnYW5pemF0aW9uIHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmdhbml6YXRpb24gLSB0aGUgbmFtZSBvZiB0aGUgb3JnYW5pemF0aW9uXG4gICAgKiBAcmV0dXJuIHtPcmdhbml6YXRpb259XG4gICAgKi9cbiAgIGdldE9yZ2FuaXphdGlvbihvcmdhbml6YXRpb24pIHtcbiAgICAgIHJldHVybiBuZXcgT3JnYW5pemF0aW9uKG9yZ2FuaXphdGlvbiwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgUmVwb3NpdG9yeSB3cmFwcGVyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlciAtIHRoZSB1c2VyIHdobyBvd25zIHRoZSByZXNwb3NpdG9yeVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSB0aGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeVxuICAgICogQHJldHVybiB7UmVwb3NpdG9yeX1cbiAgICAqL1xuICAgZ2V0UmVwbyh1c2VyLCByZXBvKSB7XG4gICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkodGhpcy5fZ2V0RnVsbE5hbWUodXNlciwgcmVwbyksIHRoaXMuX19hdXRoLCB0aGlzLl9fYXBpQmFzZSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IElzc3VlIHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyIC0gdGhlIHVzZXIgd2hvIG93bnMgdGhlIHJlc3Bvc2l0b3J5XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwbyAtIHRoZSBuYW1lIG9mIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcmV0dXJuIHtJc3N1ZX1cbiAgICAqL1xuICAgZ2V0SXNzdWVzKHVzZXIsIHJlcG8pIHtcbiAgICAgIHJldHVybiBuZXcgSXNzdWUodGhpcy5fZ2V0RnVsbE5hbWUodXNlciwgcmVwbyksIHRoaXMuX19hdXRoLCB0aGlzLl9fYXBpQmFzZSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IFNlYXJjaCB3cmFwcGVyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgLSB0aGUgcXVlcnkgdG8gc2VhcmNoIGZvclxuICAgICogQHJldHVybiB7U2VhcmNofVxuICAgICovXG4gICBzZWFyY2gocXVlcnkpIHtcbiAgICAgIHJldHVybiBuZXcgU2VhcmNoKHF1ZXJ5LCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBSYXRlTGltaXQgd3JhcHBlclxuICAgICogQHJldHVybiB7UmF0ZUxpbWl0fVxuICAgICovXG4gICBnZXRSYXRlTGltaXQoKSB7XG4gICAgICByZXR1cm4gbmV3IFJhdGVMaW1pdCh0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBNYXJrZG93biB3cmFwcGVyXG4gICAgKiBAcmV0dXJuIHtNYXJrZG93bn1cbiAgICAqL1xuICAgZ2V0TWFya2Rvd24oKSB7XG4gICAgICAgcmV0dXJuIG5ldyBNYXJrZG93bih0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICBfZ2V0RnVsbE5hbWUodXNlciwgcmVwbykge1xuICAgICAgbGV0IGZ1bGxuYW1lID0gdXNlcjtcblxuICAgICAgaWYgKHJlcG8pIHtcbiAgICAgICAgIGZ1bGxuYW1lID0gYCR7dXNlcn0vJHtyZXBvfWA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmdWxsbmFtZTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHaXRIdWI7XG4iXX0=
//# sourceMappingURL=GitHub.js.map
