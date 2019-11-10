'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *             Github.js is freely distributable.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Organization encapsulates the functionality to create repositories in organizations
 */
var Organization = function (_Requestable) {
  _inherits(Organization, _Requestable);

  /**
   * Create a new Organization
   * @param {string} organization - the name of the organization
   * @param {Requestable.auth} [auth] - information required to authenticate to Github
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */
  function Organization(organization, auth, apiBase) {
    _classCallCheck(this, Organization);

    var _this = _possibleConstructorReturn(this, (Organization.__proto__ || Object.getPrototypeOf(Organization)).call(this, auth, apiBase));

    _this.__name = organization;
    return _this;
  }

  /**
   * Create a repository in an organization
   * @see https://developer.github.com/v3/repos/#create
   * @param {Object} options - the repository definition
   * @param {Requestable.callback} [cb] - will receive the created repository
   * @return {Promise} - the promise for the http request
   */


  _createClass(Organization, [{
    key: 'createRepo',
    value: function createRepo(options, cb) {
      return this._request('POST', '/orgs/' + this.__name + '/repos', options, cb);
    }

    /**
     * List the repositories in an organization
     * @see https://developer.github.com/v3/repos/#list-organization-repositories
     * @param {Requestable.callback} [cb] - will receive the list of repositories
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getRepos',
    value: function getRepos(cb) {
      var requestOptions = this._getOptionsWithDefaults({ direction: 'desc' });

      return this._requestAllPages('/orgs/' + this.__name + '/repos', requestOptions, cb);
    }

    /**
     * Query if the user is a member or not
     * @param {string} username - the user in question
     * @param {Requestable.callback} [cb] - will receive true if the user is a member
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'isMember',
    value: function isMember(username, cb) {
      return this._request204or404('/orgs/' + this.__name + '/members/' + username, null, cb);
    }

    /**
     * List the users who are members of the company
     * @see https://developer.github.com/v3/orgs/members/#members-list
     * @param {object} options - filtering options
     * @param {string} [options.filter=all] - can be either `2fa_disabled` or `all`
     * @param {string} [options.role=all] - can be one of: `all`, `admin`, or `member`
     * @param {Requestable.callback} [cb] - will receive the list of users
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listMembers',
    value: function listMembers(options, cb) {
      return this._request('GET', '/orgs/' + this.__name + '/members', options, cb);
    }

    /**
     * List the Teams in the Organization
     * @see https://developer.github.com/v3/orgs/teams/#list-teams
     * @param {Requestable.callback} [cb] - will receive the list of teams
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getTeams',
    value: function getTeams(cb) {
      return this._requestAllPages('/orgs/' + this.__name + '/teams', undefined, cb);
    }

    /**
     * Create a team
     * @see https://developer.github.com/v3/orgs/teams/#create-team
     * @param {object} options - Team creation parameters
     * @param {string} options.name - The name of the team
     * @param {string} [options.description] - Team description
     * @param {string} [options.repo_names] - Repos to add the team to
     * @param {string} [options.privacy=secret] - The level of privacy the team should have. Can be either one
     * of: `secret`, or `closed`
     * @param {Requestable.callback} [cb] - will receive the created team
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createTeam',
    value: function createTeam(options, cb) {
      return this._request('POST', '/orgs/' + this.__name + '/teams', options, cb);
    }

    /**
     * Get information about all projects
     * @see https://developer.github.com/v3/projects/#list-organization-projects
     * @param {Requestable.callback} [cb] - will receive the list of projects
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listProjects',
    value: function listProjects(cb) {
      return this._requestAllPages('/orgs/' + this.__name + '/projects', { AcceptHeader: 'inertia-preview' }, cb);
    }

    /**
     * Create a new project
     * @see https://developer.github.com/v3/repos/projects/#create-a-project
     * @param {Object} options - the description of the project
     * @param {Requestable.callback} cb - will receive the newly created project
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createProject',
    value: function createProject(options, cb) {
      options = options || {};
      options.AcceptHeader = 'inertia-preview';
      return this._request('POST', '/orgs/' + this.__name + '/projects', options, cb);
    }
  }]);

  return Organization;
}(_Requestable3.default);

module.exports = Organization;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9yZ2FuaXphdGlvbi5qcyJdLCJuYW1lcyI6WyJPcmdhbml6YXRpb24iLCJvcmdhbml6YXRpb24iLCJhdXRoIiwiYXBpQmFzZSIsIl9fbmFtZSIsIm9wdGlvbnMiLCJjYiIsIl9yZXF1ZXN0IiwicmVxdWVzdE9wdGlvbnMiLCJfZ2V0T3B0aW9uc1dpdGhEZWZhdWx0cyIsImRpcmVjdGlvbiIsIl9yZXF1ZXN0QWxsUGFnZXMiLCJ1c2VybmFtZSIsIl9yZXF1ZXN0MjA0b3I0MDQiLCJ1bmRlZmluZWQiLCJBY2NlcHRIZWFkZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBT0E7Ozs7Ozs7Ozs7K2VBUEE7Ozs7Ozs7QUFTQTs7O0lBR01BLFk7OztBQUNIOzs7Ozs7QUFNQSx3QkFBWUMsWUFBWixFQUEwQkMsSUFBMUIsRUFBZ0NDLE9BQWhDLEVBQXlDO0FBQUE7O0FBQUEsNEhBQ2hDRCxJQURnQyxFQUMxQkMsT0FEMEI7O0FBRXRDLFVBQUtDLE1BQUwsR0FBY0gsWUFBZDtBQUZzQztBQUd4Qzs7QUFFRDs7Ozs7Ozs7Ozs7K0JBT1dJLE8sRUFBU0MsRSxFQUFJO0FBQ3JCLGFBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQsYUFBK0IsS0FBS0gsTUFBcEMsYUFBb0RDLE9BQXBELEVBQTZEQyxFQUE3RCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs2QkFNU0EsRSxFQUFJO0FBQ1YsVUFBSUUsaUJBQWlCLEtBQUtDLHVCQUFMLENBQTZCLEVBQUNDLFdBQVcsTUFBWixFQUE3QixDQUFyQjs7QUFFQSxhQUFPLEtBQUtDLGdCQUFMLFlBQStCLEtBQUtQLE1BQXBDLGFBQW9ESSxjQUFwRCxFQUFvRUYsRUFBcEUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7NkJBTVNNLFEsRUFBVU4sRSxFQUFJO0FBQ3BCLGFBQU8sS0FBS08sZ0JBQUwsWUFBK0IsS0FBS1QsTUFBcEMsaUJBQXNEUSxRQUF0RCxFQUFrRSxJQUFsRSxFQUF3RU4sRUFBeEUsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7Z0NBU1lELE8sRUFBU0MsRSxFQUFJO0FBQ3RCLGFBQU8sS0FBS0MsUUFBTCxDQUFjLEtBQWQsYUFBOEIsS0FBS0gsTUFBbkMsZUFBcURDLE9BQXJELEVBQThEQyxFQUE5RCxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs2QkFNU0EsRSxFQUFJO0FBQ1YsYUFBTyxLQUFLSyxnQkFBTCxZQUErQixLQUFLUCxNQUFwQyxhQUFvRFUsU0FBcEQsRUFBK0RSLEVBQS9ELENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OytCQVlXRCxPLEVBQVNDLEUsRUFBSTtBQUNyQixhQUFPLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLGFBQStCLEtBQUtILE1BQXBDLGFBQW9EQyxPQUFwRCxFQUE2REMsRUFBN0QsQ0FBUDtBQUNGOztBQUVEOzs7Ozs7Ozs7aUNBTWFBLEUsRUFBSTtBQUNkLGFBQU8sS0FBS0ssZ0JBQUwsWUFBK0IsS0FBS1AsTUFBcEMsZ0JBQXVELEVBQUNXLGNBQWMsaUJBQWYsRUFBdkQsRUFBMEZULEVBQTFGLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztrQ0FPY0QsTyxFQUFTQyxFLEVBQUk7QUFDeEJELGdCQUFVQSxXQUFXLEVBQXJCO0FBQ0FBLGNBQVFVLFlBQVIsR0FBdUIsaUJBQXZCO0FBQ0EsYUFBTyxLQUFLUixRQUFMLENBQWMsTUFBZCxhQUErQixLQUFLSCxNQUFwQyxnQkFBdURDLE9BQXZELEVBQWdFQyxFQUFoRSxDQUFQO0FBQ0Y7Ozs7OztBQUdKVSxPQUFPQyxPQUFQLEdBQWlCakIsWUFBakIiLCJmaWxlIjoiT3JnYW5pemF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XG5cbi8qKlxuICogT3JnYW5pemF0aW9uIGVuY2Fwc3VsYXRlcyB0aGUgZnVuY3Rpb25hbGl0eSB0byBjcmVhdGUgcmVwb3NpdG9yaWVzIGluIG9yZ2FuaXphdGlvbnNcbiAqL1xuY2xhc3MgT3JnYW5pemF0aW9uIGV4dGVuZHMgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgT3JnYW5pemF0aW9uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3JnYW5pemF0aW9uIC0gdGhlIG5hbWUgb2YgdGhlIG9yZ2FuaXphdGlvblxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSBpbmZvcm1hdGlvbiByZXF1aXJlZCB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxuICAgICovXG4gICBjb25zdHJ1Y3Rvcihvcmdhbml6YXRpb24sIGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgICAgdGhpcy5fX25hbWUgPSBvcmdhbml6YXRpb247XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgcmVwb3NpdG9yeSBpbiBhbiBvcmdhbml6YXRpb25cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jY3JlYXRlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSByZXBvc2l0b3J5IGRlZmluaXRpb25cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNyZWF0ZWQgcmVwb3NpdG9yeVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVSZXBvKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvb3Jncy8ke3RoaXMuX19uYW1lfS9yZXBvc2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSByZXBvc2l0b3JpZXMgaW4gYW4gb3JnYW5pemF0aW9uXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2xpc3Qtb3JnYW5pemF0aW9uLXJlcG9zaXRvcmllc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiByZXBvc2l0b3JpZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0UmVwb3MoY2IpIHtcbiAgICAgIGxldCByZXF1ZXN0T3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnNXaXRoRGVmYXVsdHMoe2RpcmVjdGlvbjogJ2Rlc2MnfSk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9vcmdzLyR7dGhpcy5fX25hbWV9L3JlcG9zYCwgcmVxdWVzdE9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBRdWVyeSBpZiB0aGUgdXNlciBpcyBhIG1lbWJlciBvciBub3RcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSAtIHRoZSB1c2VyIGluIHF1ZXN0aW9uXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHVzZXIgaXMgYSBtZW1iZXJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgaXNNZW1iZXIodXNlcm5hbWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdDIwNG9yNDA0KGAvb3Jncy8ke3RoaXMuX19uYW1lfS9tZW1iZXJzLyR7dXNlcm5hbWV9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIHVzZXJzIHdobyBhcmUgbWVtYmVycyBvZiB0aGUgY29tcGFueVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvbWVtYmVycy8jbWVtYmVycy1saXN0XG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGZpbHRlcmluZyBvcHRpb25zXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZmlsdGVyPWFsbF0gLSBjYW4gYmUgZWl0aGVyIGAyZmFfZGlzYWJsZWRgIG9yIGBhbGxgXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucm9sZT1hbGxdIC0gY2FuIGJlIG9uZSBvZjogYGFsbGAsIGBhZG1pbmAsIG9yIGBtZW1iZXJgXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHVzZXJzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RNZW1iZXJzKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9vcmdzLyR7dGhpcy5fX25hbWV9L21lbWJlcnNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgVGVhbXMgaW4gdGhlIE9yZ2FuaXphdGlvblxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2xpc3QtdGVhbXNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgdGVhbXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0VGVhbXMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9vcmdzLyR7dGhpcy5fX25hbWV9L3RlYW1zYCwgdW5kZWZpbmVkLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgdGVhbVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2NyZWF0ZS10ZWFtXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRlYW0gY3JlYXRpb24gcGFyYW1ldGVyc1xuICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB0ZWFtXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZGVzY3JpcHRpb25dIC0gVGVhbSBkZXNjcmlwdGlvblxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnJlcG9fbmFtZXNdIC0gUmVwb3MgdG8gYWRkIHRoZSB0ZWFtIHRvXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucHJpdmFjeT1zZWNyZXRdIC0gVGhlIGxldmVsIG9mIHByaXZhY3kgdGhlIHRlYW0gc2hvdWxkIGhhdmUuIENhbiBiZSBlaXRoZXIgb25lXG4gICAgKiBvZjogYHNlY3JldGAsIG9yIGBjbG9zZWRgXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjcmVhdGVkIHRlYW1cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlVGVhbShvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL29yZ3MvJHt0aGlzLl9fbmFtZX0vdGVhbXNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGFsbCBwcm9qZWN0c1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzLyNsaXN0LW9yZ2FuaXphdGlvbi1wcm9qZWN0c1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBwcm9qZWN0c1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0UHJvamVjdHMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9vcmdzLyR7dGhpcy5fX25hbWV9L3Byb2plY3RzYCwge0FjY2VwdEhlYWRlcjogJ2luZXJ0aWEtcHJldmlldyd9LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IHByb2plY3RcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9wcm9qZWN0cy8jY3JlYXRlLWEtcHJvamVjdFxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIHByb2plY3RcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXdseSBjcmVhdGVkIHByb2plY3RcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlUHJvamVjdChvcHRpb25zLCBjYikge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICBvcHRpb25zLkFjY2VwdEhlYWRlciA9ICdpbmVydGlhLXByZXZpZXcnO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL29yZ3MvJHt0aGlzLl9fbmFtZX0vcHJvamVjdHNgLCBvcHRpb25zLCBjYik7XG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT3JnYW5pemF0aW9uO1xuIl19
//# sourceMappingURL=Organization.js.map
