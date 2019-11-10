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
    global.Search = mod.exports;
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

  var log = (0, _debug2.default)('github:search');

  /**
   * Wrap the Search API
   */

  var Search = function (_Requestable) {
    _inherits(Search, _Requestable);

    /**
     * Create a Search
     * @param {Object} defaults - defaults for the search
     * @param {Requestable.auth} [auth] - information required to authenticate to Github
     * @param {string} [apiBase=https://api.github.com] - the base Github API URL
     */

    function Search(defaults, auth, apiBase) {
      _classCallCheck(this, Search);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Search).call(this, auth, apiBase));

      _this.__defaults = _this._getOptionsWithDefaults(defaults);
      return _this;
    }

    /**
     * Perform a search on the GitHub API
     * @private
     * @param {string} path - the scope of the search
     * @param {Object} [withOptions] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */


    _createClass(Search, [{
      key: '_search',
      value: function _search(path) {
        var _this2 = this;

        var withOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var cb = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

        var requestOptions = {};
        Object.keys(this.__defaults).forEach(function (prop) {
          return requestOptions[prop] = _this2.__defaults[prop];
        });
        Object.keys(withOptions).forEach(function (prop) {
          return requestOptions[prop] = withOptions[prop];
        });

        log('searching ' + path + ' with options:', requestOptions);
        return this._request('GET', '/search/' + path, requestOptions, cb);
      }
    }, {
      key: 'forRepositories',
      value: function forRepositories(options, cb) {
        return this._search('repositories', options, cb);
      }
    }, {
      key: 'forCode',
      value: function forCode(options, cb) {
        return this._search('code', options, cb);
      }
    }, {
      key: 'forIssues',
      value: function forIssues(options, cb) {
        return this._search('issues', options, cb);
      }
    }, {
      key: 'forUsers',
      value: function forUsers(options, cb) {
        return this._search('users', options, cb);
      }
    }]);

    return Search;
  }(_Requestable3.default);

  module.exports = Search;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsTUFBTSxNQUFNLHFCQUFNLGVBQU4sQ0FBWjs7Ozs7O01BS00sTTs7Ozs7Ozs7OztBQU9ILG9CQUFZLFFBQVosRUFBc0IsSUFBdEIsRUFBNEIsT0FBNUIsRUFBcUM7QUFBQTs7QUFBQSw0RkFDNUIsSUFENEIsRUFDdEIsT0FEc0I7O0FBRWxDLFlBQUssVUFBTCxHQUFrQixNQUFLLHVCQUFMLENBQTZCLFFBQTdCLENBQWxCO0FBRmtDO0FBR3BDOzs7Ozs7Ozs7Ozs7Ozs4QkFVTyxJLEVBQXdDO0FBQUE7O0FBQUEsWUFBbEMsV0FBa0MseURBQXBCLEVBQW9CO0FBQUEsWUFBaEIsRUFBZ0IseURBQVgsU0FBVzs7QUFDN0MsWUFBSSxpQkFBaUIsRUFBckI7QUFDQSxlQUFPLElBQVAsQ0FBWSxLQUFLLFVBQWpCLEVBQTZCLE9BQTdCLENBQXFDLFVBQUMsSUFBRDtBQUFBLGlCQUFVLGVBQWUsSUFBZixJQUF1QixPQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBakM7QUFBQSxTQUFyQztBQUNBLGVBQU8sSUFBUCxDQUFZLFdBQVosRUFBeUIsT0FBekIsQ0FBaUMsVUFBQyxJQUFEO0FBQUEsaUJBQVUsZUFBZSxJQUFmLElBQXVCLFlBQVksSUFBWixDQUFqQztBQUFBLFNBQWpDOztBQUVBLDJCQUFpQixJQUFqQixxQkFBdUMsY0FBdkM7QUFDQSxlQUFPLEtBQUssUUFBTCxDQUFjLEtBQWQsZUFBZ0MsSUFBaEMsRUFBd0MsY0FBeEMsRUFBd0QsRUFBeEQsQ0FBUDtBQUNGOzs7c0NBU2UsTyxFQUFTLEUsRUFBSTtBQUMxQixlQUFPLEtBQUssT0FBTCxDQUFhLGNBQWIsRUFBNkIsT0FBN0IsRUFBc0MsRUFBdEMsQ0FBUDtBQUNGOzs7OEJBU08sTyxFQUFTLEUsRUFBSTtBQUNsQixlQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBcUIsT0FBckIsRUFBOEIsRUFBOUIsQ0FBUDtBQUNGOzs7Z0NBU1MsTyxFQUFTLEUsRUFBSTtBQUNwQixlQUFPLEtBQUssT0FBTCxDQUFhLFFBQWIsRUFBdUIsT0FBdkIsRUFBZ0MsRUFBaEMsQ0FBUDtBQUNGOzs7K0JBU1EsTyxFQUFTLEUsRUFBSTtBQUNuQixlQUFPLEtBQUssT0FBTCxDQUFhLE9BQWIsRUFBc0IsT0FBdEIsRUFBK0IsRUFBL0IsQ0FBUDtBQUNGOzs7Ozs7QUFHSixTQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuY29uc3QgbG9nID0gZGVidWcoJ2dpdGh1YjpzZWFyY2gnKTtcblxuLyoqXG4gKiBXcmFwIHRoZSBTZWFyY2ggQVBJXG4gKi9cbmNsYXNzIFNlYXJjaCBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgU2VhcmNoXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdHMgLSBkZWZhdWx0cyBmb3IgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSBpbmZvcm1hdGlvbiByZXF1aXJlZCB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxuICAgICovXG4gICBjb25zdHJ1Y3RvcihkZWZhdWx0cywgYXV0aCwgYXBpQmFzZSkge1xuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XG4gICAgICB0aGlzLl9fZGVmYXVsdHMgPSB0aGlzLl9nZXRPcHRpb25zV2l0aERlZmF1bHRzKGRlZmF1bHRzKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBQZXJmb3JtIGEgc2VhcmNoIG9uIHRoZSBHaXRIdWIgQVBJXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgc2NvcGUgb2YgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtPYmplY3R9IFt3aXRoT3B0aW9uc10gLSBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlc3VsdHMgb2YgdGhlIHNlYXJjaFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBfc2VhcmNoKHBhdGgsIHdpdGhPcHRpb25zID0ge30sIGNiID0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgcmVxdWVzdE9wdGlvbnMgPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX19kZWZhdWx0cykuZm9yRWFjaCgocHJvcCkgPT4gcmVxdWVzdE9wdGlvbnNbcHJvcF0gPSB0aGlzLl9fZGVmYXVsdHNbcHJvcF0pO1xuICAgICAgT2JqZWN0LmtleXMod2l0aE9wdGlvbnMpLmZvckVhY2goKHByb3ApID0+IHJlcXVlc3RPcHRpb25zW3Byb3BdID0gd2l0aE9wdGlvbnNbcHJvcF0pO1xuXG4gICAgICBsb2coYHNlYXJjaGluZyAke3BhdGh9IHdpdGggb3B0aW9uczpgLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9zZWFyY2gvJHtwYXRofWAsIHJlcXVlc3RPcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU2VhcmNoIGZvciByZXBvc2l0b3JpZXNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3NlYXJjaC1yZXBvc2l0b3JpZXNcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlc3VsdHMgb2YgdGhlIHNlYXJjaFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBmb3JSZXBvc2l0b3JpZXMob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWFyY2goJ3JlcG9zaXRvcmllcycsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBTZWFyY2ggZm9yIGNvZGVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3NlYXJjaC1jb2RlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgc2VhcmNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZXN1bHRzIG9mIHRoZSBzZWFyY2hcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZm9yQ29kZShvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCgnY29kZScsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBTZWFyY2ggZm9yIGlzc3Vlc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3NlYXJjaC8jc2VhcmNoLWlzc3Vlc1xuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgc2VhcmNoXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGZvcklzc3VlcyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCgnaXNzdWVzJywgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFNlYXJjaCBmb3IgdXNlcnNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3NlYXJjaC11c2Vyc1xuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgc2VhcmNoXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGZvclVzZXJzKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKCd1c2VycycsIG9wdGlvbnMsIGNiKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZWFyY2g7XG4iXX0=
//# sourceMappingURL=Search.js.map
