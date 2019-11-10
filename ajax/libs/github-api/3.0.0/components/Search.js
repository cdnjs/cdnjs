'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, auth, apiBase));

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

      var withOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

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

    /**
     * Search for repositories
     * @see https://developer.github.com/v3/search/#search-repositories
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forRepositories',
    value: function forRepositories(options, cb) {
      return this._search('repositories', options, cb);
    }

    /**
     * Search for code
     * @see https://developer.github.com/v3/search/#search-code
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forCode',
    value: function forCode(options, cb) {
      return this._search('code', options, cb);
    }

    /**
     * Search for issues
     * @see https://developer.github.com/v3/search/#search-issues
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forIssues',
    value: function forIssues(options, cb) {
      return this._search('issues', options, cb);
    }

    /**
     * Search for users
     * @see https://developer.github.com/v3/search/#search-users
     * @param {Search.Params} [options] - additional parameters for the search
     * @param {Requestable.callback} [cb] - will receive the results of the search
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'forUsers',
    value: function forUsers(options, cb) {
      return this._search('users', options, cb);
    }
  }]);

  return Search;
}(_Requestable3.default);

module.exports = Search;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaC5qcyJdLCJuYW1lcyI6WyJsb2ciLCJTZWFyY2giLCJkZWZhdWx0cyIsImF1dGgiLCJhcGlCYXNlIiwiX19kZWZhdWx0cyIsIl9nZXRPcHRpb25zV2l0aERlZmF1bHRzIiwicGF0aCIsIndpdGhPcHRpb25zIiwiY2IiLCJ1bmRlZmluZWQiLCJyZXF1ZXN0T3B0aW9ucyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicHJvcCIsIl9yZXF1ZXN0QWxsUGFnZXMiLCJvcHRpb25zIiwiX3NlYXJjaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFPQTs7OztBQUNBOzs7Ozs7Ozs7OytlQVJBOzs7Ozs7O0FBU0EsSUFBTUEsTUFBTSxxQkFBTSxlQUFOLENBQVo7O0FBRUE7Ozs7SUFHTUMsTTs7O0FBQ0g7Ozs7OztBQU1BLGtCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsT0FBNUIsRUFBcUM7QUFBQTs7QUFBQSxnSEFDNUJELElBRDRCLEVBQ3RCQyxPQURzQjs7QUFFbEMsVUFBS0MsVUFBTCxHQUFrQixNQUFLQyx1QkFBTCxDQUE2QkosUUFBN0IsQ0FBbEI7QUFGa0M7QUFHcEM7O0FBRUQ7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7NEJBUVFLLEksRUFBd0M7QUFBQTs7QUFBQSxVQUFsQ0MsV0FBa0MsdUVBQXBCLEVBQW9CO0FBQUEsVUFBaEJDLEVBQWdCLHVFQUFYQyxTQUFXOztBQUM3QyxVQUFJQyxpQkFBaUIsRUFBckI7QUFDQUMsYUFBT0MsSUFBUCxDQUFZLEtBQUtSLFVBQWpCLEVBQTZCUyxPQUE3QixDQUFxQyxVQUFDQyxJQUFELEVBQVU7QUFDNUNKLHVCQUFlSSxJQUFmLElBQXVCLE9BQUtWLFVBQUwsQ0FBZ0JVLElBQWhCLENBQXZCO0FBQ0YsT0FGRDtBQUdBSCxhQUFPQyxJQUFQLENBQVlMLFdBQVosRUFBeUJNLE9BQXpCLENBQWlDLFVBQUNDLElBQUQsRUFBVTtBQUN4Q0osdUJBQWVJLElBQWYsSUFBdUJQLFlBQVlPLElBQVosQ0FBdkI7QUFDRixPQUZEOztBQUlBZix5QkFBaUJPLElBQWpCLHFCQUF1Q0ksY0FBdkM7QUFDQSxhQUFPLEtBQUtLLGdCQUFMLGNBQWlDVCxJQUFqQyxFQUF5Q0ksY0FBekMsRUFBeURGLEVBQXpELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztvQ0FPZ0JRLE8sRUFBU1IsRSxFQUFJO0FBQzFCLGFBQU8sS0FBS1MsT0FBTCxDQUFhLGNBQWIsRUFBNkJELE9BQTdCLEVBQXNDUixFQUF0QyxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7NEJBT1FRLE8sRUFBU1IsRSxFQUFJO0FBQ2xCLGFBQU8sS0FBS1MsT0FBTCxDQUFhLE1BQWIsRUFBcUJELE9BQXJCLEVBQThCUixFQUE5QixDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7OEJBT1VRLE8sRUFBU1IsRSxFQUFJO0FBQ3BCLGFBQU8sS0FBS1MsT0FBTCxDQUFhLFFBQWIsRUFBdUJELE9BQXZCLEVBQWdDUixFQUFoQyxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7NkJBT1NRLE8sRUFBU1IsRSxFQUFJO0FBQ25CLGFBQU8sS0FBS1MsT0FBTCxDQUFhLE9BQWIsRUFBc0JELE9BQXRCLEVBQStCUixFQUEvQixDQUFQO0FBQ0Y7Ozs7OztBQUdKVSxPQUFPQyxPQUFQLEdBQWlCbkIsTUFBakIiLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuY29uc3QgbG9nID0gZGVidWcoJ2dpdGh1YjpzZWFyY2gnKTtcblxuLyoqXG4gKiBXcmFwIHRoZSBTZWFyY2ggQVBJXG4gKi9cbmNsYXNzIFNlYXJjaCBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgU2VhcmNoXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdHMgLSBkZWZhdWx0cyBmb3IgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSBpbmZvcm1hdGlvbiByZXF1aXJlZCB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxuICAgICovXG4gICBjb25zdHJ1Y3RvcihkZWZhdWx0cywgYXV0aCwgYXBpQmFzZSkge1xuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XG4gICAgICB0aGlzLl9fZGVmYXVsdHMgPSB0aGlzLl9nZXRPcHRpb25zV2l0aERlZmF1bHRzKGRlZmF1bHRzKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBBdmFpbGFibGUgc2VhcmNoIG9wdGlvbnNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3BhcmFtZXRlcnNcbiAgICAqIEB0eXBlZGVmIHtPYmplY3R9IFNlYXJjaC5QYXJhbXNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBxIC0gdGhlIHF1ZXJ5IHRvIG1ha2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3J0IC0gdGhlIHNvcnQgZmllbGQsIG9uZSBvZiBgc3RhcnNgLCBgZm9ya3NgLCBvciBgdXBkYXRlZGAuXG4gICAgKiAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0IGlzIFtiZXN0IG1hdGNoXShodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3NlYXJjaC8jcmFua2luZy1zZWFyY2gtcmVzdWx0cylcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlciAtIHRoZSBvcmRlcmluZywgZWl0aGVyIGBhc2NgIG9yIGBkZXNjYFxuICAgICovXG4gICAvKipcbiAgICAqIFBlcmZvcm0gYSBzZWFyY2ggb24gdGhlIEdpdEh1YiBBUElcbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBzY29wZSBvZiB0aGUgc2VhcmNoXG4gICAgKiBAcGFyYW0ge1NlYXJjaC5QYXJhbXN9IFt3aXRoT3B0aW9uc10gLSBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlc3VsdHMgb2YgdGhlIHNlYXJjaFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBfc2VhcmNoKHBhdGgsIHdpdGhPcHRpb25zID0ge30sIGNiID0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgcmVxdWVzdE9wdGlvbnMgPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX19kZWZhdWx0cykuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICAgcmVxdWVzdE9wdGlvbnNbcHJvcF0gPSB0aGlzLl9fZGVmYXVsdHNbcHJvcF07XG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5rZXlzKHdpdGhPcHRpb25zKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICByZXF1ZXN0T3B0aW9uc1twcm9wXSA9IHdpdGhPcHRpb25zW3Byb3BdO1xuICAgICAgfSk7XG5cbiAgICAgIGxvZyhgc2VhcmNoaW5nICR7cGF0aH0gd2l0aCBvcHRpb25zOmAsIHJlcXVlc3RPcHRpb25zKTtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9zZWFyY2gvJHtwYXRofWAsIHJlcXVlc3RPcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU2VhcmNoIGZvciByZXBvc2l0b3JpZXNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3NlYXJjaC1yZXBvc2l0b3JpZXNcbiAgICAqIEBwYXJhbSB7U2VhcmNoLlBhcmFtc30gW29wdGlvbnNdIC0gYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgc2VhcmNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZXN1bHRzIG9mIHRoZSBzZWFyY2hcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZm9yUmVwb3NpdG9yaWVzKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKCdyZXBvc2l0b3JpZXMnLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU2VhcmNoIGZvciBjb2RlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvc2VhcmNoLyNzZWFyY2gtY29kZVxuICAgICogQHBhcmFtIHtTZWFyY2guUGFyYW1zfSBbb3B0aW9uc10gLSBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlc3VsdHMgb2YgdGhlIHNlYXJjaFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBmb3JDb2RlKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VhcmNoKCdjb2RlJywgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFNlYXJjaCBmb3IgaXNzdWVzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvc2VhcmNoLyNzZWFyY2gtaXNzdWVzXG4gICAgKiBAcGFyYW0ge1NlYXJjaC5QYXJhbXN9IFtvcHRpb25zXSAtIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgc2VhcmNoXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGZvcklzc3VlcyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCgnaXNzdWVzJywgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFNlYXJjaCBmb3IgdXNlcnNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9zZWFyY2gvI3NlYXJjaC11c2Vyc1xuICAgICogQHBhcmFtIHtTZWFyY2guUGFyYW1zfSBbb3B0aW9uc10gLSBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlc3VsdHMgb2YgdGhlIHNlYXJjaFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBmb3JVc2VycyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaCgndXNlcnMnLCBvcHRpb25zLCBjYik7XG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoO1xuIl19
//# sourceMappingURL=Search.js.map
