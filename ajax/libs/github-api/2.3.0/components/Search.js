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
     * Available search options
     * @see https://developer.github.com/v3/search/#parameters
     * @typedef {Object} Search.Params
     * @param {string} q - the query to make
     * @param {string} sort - the sort field, one of `stars`, `forks`, or `updated`.
     *                      Default is [best match](https://developer.github.com/v3/search/#ranking-search-results)
     * @param {string} order - the ordering, either `asc` or `desc`
     */
    /**
     * Perform a search on the GitHub API
     * @private
     * @param {string} path - the scope of the search
     * @param {Search.Params} [withOptions] - additional parameters for the search
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
          requestOptions[prop] = _this2.__defaults[prop];
        });
        Object.keys(withOptions).forEach(function (prop) {
          requestOptions[prop] = withOptions[prop];
        });

        log('searching ' + path + ' with options:', requestOptions);
        return this._requestAllPages('/search/' + path, requestOptions, cb);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsTUFBTSxNQUFNLHFCQUFNLGVBQU4sQ0FBWjs7Ozs7O01BS00sTTs7Ozs7Ozs7OztBQU9ILG9CQUFZLFFBQVosRUFBc0IsSUFBdEIsRUFBNEIsT0FBNUIsRUFBcUM7QUFBQTs7QUFBQSw0RkFDNUIsSUFENEIsRUFDdEIsT0FEc0I7O0FBRWxDLFlBQUssVUFBTCxHQUFrQixNQUFLLHVCQUFMLENBQTZCLFFBQTdCLENBQWxCO0FBRmtDO0FBR3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFtQk8sSSxFQUF3QztBQUFBOztBQUFBLFlBQWxDLFdBQWtDLHlEQUFwQixFQUFvQjtBQUFBLFlBQWhCLEVBQWdCLHlEQUFYLFNBQVc7O0FBQzdDLFlBQUksaUJBQWlCLEVBQXJCO0FBQ0EsZUFBTyxJQUFQLENBQVksS0FBSyxVQUFqQixFQUE2QixPQUE3QixDQUFxQyxVQUFDLElBQUQsRUFBVTtBQUM1Qyx5QkFBZSxJQUFmLElBQXVCLE9BQUssVUFBTCxDQUFnQixJQUFoQixDQUF2QjtBQUNGLFNBRkQ7QUFHQSxlQUFPLElBQVAsQ0FBWSxXQUFaLEVBQXlCLE9BQXpCLENBQWlDLFVBQUMsSUFBRCxFQUFVO0FBQ3hDLHlCQUFlLElBQWYsSUFBdUIsWUFBWSxJQUFaLENBQXZCO0FBQ0YsU0FGRDs7QUFJQSwyQkFBaUIsSUFBakIscUJBQXVDLGNBQXZDO0FBQ0EsZUFBTyxLQUFLLGdCQUFMLGNBQWlDLElBQWpDLEVBQXlDLGNBQXpDLEVBQXlELEVBQXpELENBQVA7QUFDRjs7O3NDQVNlLE8sRUFBUyxFLEVBQUk7QUFDMUIsZUFBTyxLQUFLLE9BQUwsQ0FBYSxjQUFiLEVBQTZCLE9BQTdCLEVBQXNDLEVBQXRDLENBQVA7QUFDRjs7OzhCQVNPLE8sRUFBUyxFLEVBQUk7QUFDbEIsZUFBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQXFCLE9BQXJCLEVBQThCLEVBQTlCLENBQVA7QUFDRjs7O2dDQVNTLE8sRUFBUyxFLEVBQUk7QUFDcEIsZUFBTyxLQUFLLE9BQUwsQ0FBYSxRQUFiLEVBQXVCLE9BQXZCLEVBQWdDLEVBQWhDLENBQVA7QUFDRjs7OytCQVNRLE8sRUFBUyxFLEVBQUk7QUFDbkIsZUFBTyxLQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLE9BQXRCLEVBQStCLEVBQS9CLENBQVA7QUFDRjs7Ozs7O0FBR0osU0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6IlNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6c2VhcmNoJyk7XG5cbi8qKlxuICogV3JhcCB0aGUgU2VhcmNoIEFQSVxuICovXG5jbGFzcyBTZWFyY2ggZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XG4gICAvKipcbiAgICAqIENyZWF0ZSBhIFNlYXJjaFxuICAgICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzIC0gZGVmYXVsdHMgZm9yIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IoZGVmYXVsdHMsIGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgICAgdGhpcy5fX2RlZmF1bHRzID0gdGhpcy5fZ2V0T3B0aW9uc1dpdGhEZWZhdWx0cyhkZWZhdWx0cyk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQXZhaWxhYmxlIHNlYXJjaCBvcHRpb25zXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvc2VhcmNoLyNwYXJhbWV0ZXJzXG4gICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBTZWFyY2guUGFyYW1zXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcSAtIHRoZSBxdWVyeSB0byBtYWtlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc29ydCAtIHRoZSBzb3J0IGZpZWxkLCBvbmUgb2YgYHN0YXJzYCwgYGZvcmtzYCwgb3IgYHVwZGF0ZWRgLlxuICAgICogICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdCBpcyBbYmVzdCBtYXRjaF0oaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3Jhbmtpbmctc2VhcmNoLXJlc3VsdHMpXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3JkZXIgLSB0aGUgb3JkZXJpbmcsIGVpdGhlciBgYXNjYCBvciBgZGVzY2BcbiAgICAqL1xuICAgLyoqXG4gICAgKiBQZXJmb3JtIGEgc2VhcmNoIG9uIHRoZSBHaXRIdWIgQVBJXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgc2NvcGUgb2YgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtTZWFyY2guUGFyYW1zfSBbd2l0aE9wdGlvbnNdIC0gYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgc2VhcmNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZXN1bHRzIG9mIHRoZSBzZWFyY2hcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgX3NlYXJjaChwYXRoLCB3aXRoT3B0aW9ucyA9IHt9LCBjYiA9IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IHJlcXVlc3RPcHRpb25zID0ge307XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl9fZGVmYXVsdHMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgIHJlcXVlc3RPcHRpb25zW3Byb3BdID0gdGhpcy5fX2RlZmF1bHRzW3Byb3BdO1xuICAgICAgfSk7XG4gICAgICBPYmplY3Qua2V5cyh3aXRoT3B0aW9ucykuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICAgcmVxdWVzdE9wdGlvbnNbcHJvcF0gPSB3aXRoT3B0aW9uc1twcm9wXTtcbiAgICAgIH0pO1xuXG4gICAgICBsb2coYHNlYXJjaGluZyAke3BhdGh9IHdpdGggb3B0aW9uczpgLCByZXF1ZXN0T3B0aW9ucyk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvc2VhcmNoLyR7cGF0aH1gLCByZXF1ZXN0T3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFNlYXJjaCBmb3IgcmVwb3NpdG9yaWVzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvc2VhcmNoLyNzZWFyY2gtcmVwb3NpdG9yaWVzXG4gICAgKiBAcGFyYW0ge1NlYXJjaC5QYXJhbXN9IFtvcHRpb25zXSAtIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgc2VhcmNoXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGZvclJlcG9zaXRvcmllcyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCgncmVwb3NpdG9yaWVzJywgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFNlYXJjaCBmb3IgY29kZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3NlYXJjaC8jc2VhcmNoLWNvZGVcbiAgICAqIEBwYXJhbSB7U2VhcmNoLlBhcmFtc30gW29wdGlvbnNdIC0gYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgc2VhcmNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZXN1bHRzIG9mIHRoZSBzZWFyY2hcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZm9yQ29kZShvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCgnY29kZScsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBTZWFyY2ggZm9yIGlzc3Vlc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3NlYXJjaC8jc2VhcmNoLWlzc3Vlc1xuICAgICogQHBhcmFtIHtTZWFyY2guUGFyYW1zfSBbb3B0aW9uc10gLSBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlc3VsdHMgb2YgdGhlIHNlYXJjaFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBmb3JJc3N1ZXMob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWFyY2goJ2lzc3VlcycsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBTZWFyY2ggZm9yIHVzZXJzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvc2VhcmNoLyNzZWFyY2gtdXNlcnNcbiAgICAqIEBwYXJhbSB7U2VhcmNoLlBhcmFtc30gW29wdGlvbnNdIC0gYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgc2VhcmNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZXN1bHRzIG9mIHRoZSBzZWFyY2hcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZm9yVXNlcnMob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWFyY2goJ3VzZXJzJywgb3B0aW9ucywgY2IpO1xuICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlYXJjaDtcbiJdfQ==
//# sourceMappingURL=Search.js.map
