'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
/* eslint valid-jsdoc: ["error", {"requireReturnDescription": false}] */

var _Gist = require('./Gist');

var _Gist2 = _interopRequireDefault(_Gist);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _Issue = require('./Issue');

var _Issue2 = _interopRequireDefault(_Issue);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _RateLimit = require('./RateLimit');

var _RateLimit2 = _interopRequireDefault(_RateLimit);

var _Repository = require('./Repository');

var _Repository2 = _interopRequireDefault(_Repository);

var _Organization = require('./Organization');

var _Organization2 = _interopRequireDefault(_Organization);

var _Team = require('./Team');

var _Team2 = _interopRequireDefault(_Team);

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Project = require('./Project');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * GitHub encapsulates the functionality to create various API wrapper objects.
 */
var GitHub = function () {
  /**
   * Create a new GitHub.
   * @param {Requestable.auth} [auth] - the credentials to authenticate to Github. If auth is
   *                                  not provided requests will be made unauthenticated
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */
  function GitHub(auth) {
    var apiBase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://api.github.com';

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

    /**
     * Create a new User wrapper
     * @param {string} [user] - the name of the user to get information about
     *                        leave undefined for the authenticated user
     * @return {User}
     */

  }, {
    key: 'getUser',
    value: function getUser(user) {
      return new _User2.default(user, this.__auth, this.__apiBase);
    }

    /**
     * Create a new Organization wrapper
     * @param {string} organization - the name of the organization
     * @return {Organization}
     */

  }, {
    key: 'getOrganization',
    value: function getOrganization(organization) {
      return new _Organization2.default(organization, this.__auth, this.__apiBase);
    }

    /**
     * create a new Team wrapper
     * @param {string} teamId - the name of the team
     * @return {team}
     */

  }, {
    key: 'getTeam',
    value: function getTeam(teamId) {
      return new _Team2.default(teamId, this.__auth, this.__apiBase);
    }

    /**
     * Create a new Repository wrapper
     * @param {string} user - the user who owns the respository
     * @param {string} repo - the name of the repository
     * @return {Repository}
     */

  }, {
    key: 'getRepo',
    value: function getRepo(user, repo) {
      return new _Repository2.default(this._getFullName(user, repo), this.__auth, this.__apiBase);
    }

    /**
     * Create a new Issue wrapper
     * @param {string} user - the user who owns the respository
     * @param {string} repo - the name of the repository
     * @return {Issue}
     */

  }, {
    key: 'getIssues',
    value: function getIssues(user, repo) {
      return new _Issue2.default(this._getFullName(user, repo), this.__auth, this.__apiBase);
    }

    /**
     * Create a new Search wrapper
     * @param {string} query - the query to search for
     * @return {Search}
     */

  }, {
    key: 'search',
    value: function search(query) {
      return new _Search2.default(query, this.__auth, this.__apiBase);
    }

    /**
     * Create a new RateLimit wrapper
     * @return {RateLimit}
     */

  }, {
    key: 'getRateLimit',
    value: function getRateLimit() {
      return new _RateLimit2.default(this.__auth, this.__apiBase);
    }

    /**
     * Create a new Markdown wrapper
     * @return {Markdown}
     */

  }, {
    key: 'getMarkdown',
    value: function getMarkdown() {
      return new _Markdown2.default(this.__auth, this.__apiBase);
    }

    /**
     * Create a new Project wrapper
     * @param {string} id - the id of the project
     * @return {Markdown}
     */

  }, {
    key: 'getProject',
    value: function getProject(id) {
      return new _Project2.default(id, this.__auth, this.__apiBase);
    }

    /**
     * Computes the full repository name
     * @param {string} user - the username (or the full name)
     * @param {string} repo - the repository name, must not be passed if `user` is the full name
     * @return {string} the repository's full name
     */

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdpdEh1Yi5qcyJdLCJuYW1lcyI6WyJHaXRIdWIiLCJhdXRoIiwiYXBpQmFzZSIsIl9fYXBpQmFzZSIsIl9fYXV0aCIsImlkIiwidXNlciIsIm9yZ2FuaXphdGlvbiIsInRlYW1JZCIsInJlcG8iLCJfZ2V0RnVsbE5hbWUiLCJxdWVyeSIsImZ1bGxuYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7cWpCQUFBOzs7Ozs7QUFNQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLE07QUFDSDs7Ozs7O0FBTUEsa0JBQVlDLElBQVosRUFBc0Q7QUFBQSxRQUFwQ0MsT0FBb0MsdUVBQTFCLHdCQUEwQjs7QUFBQTs7QUFDbkQsU0FBS0MsU0FBTCxHQUFpQkQsT0FBakI7QUFDQSxTQUFLRSxNQUFMLEdBQWNILFFBQVEsRUFBdEI7QUFDRjs7QUFFRDs7Ozs7Ozs7OzRCQUtRSSxFLEVBQUk7QUFDVCxhQUFPLG1CQUFTQSxFQUFULEVBQWEsS0FBS0QsTUFBbEIsRUFBMEIsS0FBS0QsU0FBL0IsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7NEJBTVFHLEksRUFBTTtBQUNYLGFBQU8sbUJBQVNBLElBQVQsRUFBZSxLQUFLRixNQUFwQixFQUE0QixLQUFLRCxTQUFqQyxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7O29DQUtnQkksWSxFQUFjO0FBQzNCLGFBQU8sMkJBQWlCQSxZQUFqQixFQUErQixLQUFLSCxNQUFwQyxFQUE0QyxLQUFLRCxTQUFqRCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7OzRCQUtRSyxNLEVBQVE7QUFDYixhQUFPLG1CQUFTQSxNQUFULEVBQWlCLEtBQUtKLE1BQXRCLEVBQThCLEtBQUtELFNBQW5DLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OzRCQU1RRyxJLEVBQU1HLEksRUFBTTtBQUNqQixhQUFPLHlCQUFlLEtBQUtDLFlBQUwsQ0FBa0JKLElBQWxCLEVBQXdCRyxJQUF4QixDQUFmLEVBQThDLEtBQUtMLE1BQW5ELEVBQTJELEtBQUtELFNBQWhFLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OzhCQU1VRyxJLEVBQU1HLEksRUFBTTtBQUNuQixhQUFPLG9CQUFVLEtBQUtDLFlBQUwsQ0FBa0JKLElBQWxCLEVBQXdCRyxJQUF4QixDQUFWLEVBQXlDLEtBQUtMLE1BQTlDLEVBQXNELEtBQUtELFNBQTNELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7MkJBS09RLEssRUFBTztBQUNYLGFBQU8scUJBQVdBLEtBQVgsRUFBa0IsS0FBS1AsTUFBdkIsRUFBK0IsS0FBS0QsU0FBcEMsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7O21DQUllO0FBQ1osYUFBTyx3QkFBYyxLQUFLQyxNQUFuQixFQUEyQixLQUFLRCxTQUFoQyxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7a0NBSWM7QUFDWCxhQUFPLHVCQUFhLEtBQUtDLE1BQWxCLEVBQTBCLEtBQUtELFNBQS9CLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7K0JBS1dFLEUsRUFBSTtBQUNaLGFBQU8sc0JBQVlBLEVBQVosRUFBZ0IsS0FBS0QsTUFBckIsRUFBNkIsS0FBS0QsU0FBbEMsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7aUNBTWFHLEksRUFBTUcsSSxFQUFNO0FBQ3RCLFVBQUlHLFdBQVdOLElBQWY7O0FBRUEsVUFBSUcsSUFBSixFQUFVO0FBQ1BHLG1CQUFjTixJQUFkLFNBQXNCRyxJQUF0QjtBQUNGOztBQUVELGFBQU9HLFFBQVA7QUFDRjs7Ozs7O0FBR0pDLE9BQU9DLE9BQVAsR0FBaUJkLE1BQWpCIiwiZmlsZSI6IkdpdEh1Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cbi8qIGVzbGludCB2YWxpZC1qc2RvYzogW1wiZXJyb3JcIiwge1wicmVxdWlyZVJldHVybkRlc2NyaXB0aW9uXCI6IGZhbHNlfV0gKi9cblxuaW1wb3J0IEdpc3QgZnJvbSAnLi9HaXN0JztcbmltcG9ydCBVc2VyIGZyb20gJy4vVXNlcic7XG5pbXBvcnQgSXNzdWUgZnJvbSAnLi9Jc3N1ZSc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJy4vU2VhcmNoJztcbmltcG9ydCBSYXRlTGltaXQgZnJvbSAnLi9SYXRlTGltaXQnO1xuaW1wb3J0IFJlcG9zaXRvcnkgZnJvbSAnLi9SZXBvc2l0b3J5JztcbmltcG9ydCBPcmdhbml6YXRpb24gZnJvbSAnLi9Pcmdhbml6YXRpb24nO1xuaW1wb3J0IFRlYW0gZnJvbSAnLi9UZWFtJztcbmltcG9ydCBNYXJrZG93biBmcm9tICcuL01hcmtkb3duJztcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5cbi8qKlxuICogR2l0SHViIGVuY2Fwc3VsYXRlcyB0aGUgZnVuY3Rpb25hbGl0eSB0byBjcmVhdGUgdmFyaW91cyBBUEkgd3JhcHBlciBvYmplY3RzLlxuICovXG5jbGFzcyBHaXRIdWIge1xuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgR2l0SHViLlxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSB0aGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1Yi4gSWYgYXV0aCBpc1xuICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90IHByb3ZpZGVkIHJlcXVlc3RzIHdpbGwgYmUgbWFkZSB1bmF1dGhlbnRpY2F0ZWRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYXBpQmFzZT1odHRwczovL2FwaS5naXRodWIuY29tXSAtIHRoZSBiYXNlIEdpdGh1YiBBUEkgVVJMXG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKGF1dGgsIGFwaUJhc2UgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbScpIHtcbiAgICAgIHRoaXMuX19hcGlCYXNlID0gYXBpQmFzZTtcbiAgICAgIHRoaXMuX19hdXRoID0gYXV0aCB8fCB7fTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgR2lzdCB3cmFwcGVyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gW2lkXSAtIHRoZSBpZCBmb3IgdGhlIGdpc3QsIGxlYXZlIHVuZGVmaW5lZCB3aGVuIGNyZWF0aW5nIGEgbmV3IGdpc3RcbiAgICAqIEByZXR1cm4ge0dpc3R9XG4gICAgKi9cbiAgIGdldEdpc3QoaWQpIHtcbiAgICAgIHJldHVybiBuZXcgR2lzdChpZCwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgVXNlciB3cmFwcGVyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW3VzZXJdIC0gdGhlIG5hbWUgb2YgdGhlIHVzZXIgdG8gZ2V0IGluZm9ybWF0aW9uIGFib3V0XG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgIGxlYXZlIHVuZGVmaW5lZCBmb3IgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlclxuICAgICogQHJldHVybiB7VXNlcn1cbiAgICAqL1xuICAgZ2V0VXNlcih1c2VyKSB7XG4gICAgICByZXR1cm4gbmV3IFVzZXIodXNlciwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgT3JnYW5pemF0aW9uIHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmdhbml6YXRpb24gLSB0aGUgbmFtZSBvZiB0aGUgb3JnYW5pemF0aW9uXG4gICAgKiBAcmV0dXJuIHtPcmdhbml6YXRpb259XG4gICAgKi9cbiAgIGdldE9yZ2FuaXphdGlvbihvcmdhbml6YXRpb24pIHtcbiAgICAgIHJldHVybiBuZXcgT3JnYW5pemF0aW9uKG9yZ2FuaXphdGlvbiwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBjcmVhdGUgYSBuZXcgVGVhbSB3cmFwcGVyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdGVhbUlkIC0gdGhlIG5hbWUgb2YgdGhlIHRlYW1cbiAgICAqIEByZXR1cm4ge3RlYW19XG4gICAgKi9cbiAgIGdldFRlYW0odGVhbUlkKSB7XG4gICAgICByZXR1cm4gbmV3IFRlYW0odGVhbUlkLCB0aGlzLl9fYXV0aCwgdGhpcy5fX2FwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBSZXBvc2l0b3J5IHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyIC0gdGhlIHVzZXIgd2hvIG93bnMgdGhlIHJlc3Bvc2l0b3J5XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwbyAtIHRoZSBuYW1lIG9mIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcmV0dXJuIHtSZXBvc2l0b3J5fVxuICAgICovXG4gICBnZXRSZXBvKHVzZXIsIHJlcG8pIHtcbiAgICAgIHJldHVybiBuZXcgUmVwb3NpdG9yeSh0aGlzLl9nZXRGdWxsTmFtZSh1c2VyLCByZXBvKSwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgSXNzdWUgd3JhcHBlclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXIgLSB0aGUgdXNlciB3aG8gb3ducyB0aGUgcmVzcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvIC0gdGhlIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEByZXR1cm4ge0lzc3VlfVxuICAgICovXG4gICBnZXRJc3N1ZXModXNlciwgcmVwbykge1xuICAgICAgcmV0dXJuIG5ldyBJc3N1ZSh0aGlzLl9nZXRGdWxsTmFtZSh1c2VyLCByZXBvKSwgdGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgU2VhcmNoIHdyYXBwZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSAtIHRoZSBxdWVyeSB0byBzZWFyY2ggZm9yXG4gICAgKiBAcmV0dXJuIHtTZWFyY2h9XG4gICAgKi9cbiAgIHNlYXJjaChxdWVyeSkge1xuICAgICAgcmV0dXJuIG5ldyBTZWFyY2gocXVlcnksIHRoaXMuX19hdXRoLCB0aGlzLl9fYXBpQmFzZSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IFJhdGVMaW1pdCB3cmFwcGVyXG4gICAgKiBAcmV0dXJuIHtSYXRlTGltaXR9XG4gICAgKi9cbiAgIGdldFJhdGVMaW1pdCgpIHtcbiAgICAgIHJldHVybiBuZXcgUmF0ZUxpbWl0KHRoaXMuX19hdXRoLCB0aGlzLl9fYXBpQmFzZSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IE1hcmtkb3duIHdyYXBwZXJcbiAgICAqIEByZXR1cm4ge01hcmtkb3dufVxuICAgICovXG4gICBnZXRNYXJrZG93bigpIHtcbiAgICAgIHJldHVybiBuZXcgTWFya2Rvd24odGhpcy5fX2F1dGgsIHRoaXMuX19hcGlCYXNlKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgUHJvamVjdCB3cmFwcGVyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgaWQgb2YgdGhlIHByb2plY3RcbiAgICAqIEByZXR1cm4ge01hcmtkb3dufVxuICAgICovXG4gICBnZXRQcm9qZWN0KGlkKSB7XG4gICAgICByZXR1cm4gbmV3IFByb2plY3QoaWQsIHRoaXMuX19hdXRoLCB0aGlzLl9fYXBpQmFzZSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ29tcHV0ZXMgdGhlIGZ1bGwgcmVwb3NpdG9yeSBuYW1lXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlciAtIHRoZSB1c2VybmFtZSAob3IgdGhlIGZ1bGwgbmFtZSlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvIC0gdGhlIHJlcG9zaXRvcnkgbmFtZSwgbXVzdCBub3QgYmUgcGFzc2VkIGlmIGB1c2VyYCBpcyB0aGUgZnVsbCBuYW1lXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSByZXBvc2l0b3J5J3MgZnVsbCBuYW1lXG4gICAgKi9cbiAgIF9nZXRGdWxsTmFtZSh1c2VyLCByZXBvKSB7XG4gICAgICBsZXQgZnVsbG5hbWUgPSB1c2VyO1xuXG4gICAgICBpZiAocmVwbykge1xuICAgICAgICAgZnVsbG5hbWUgPSBgJHt1c2VyfS8ke3JlcG99YDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZ1bGxuYW1lO1xuICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdpdEh1YjtcbiJdfQ==
//# sourceMappingURL=GitHub.js.map
