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
 * Issue wraps the functionality to get issues for repositories
 */
var Issue = function (_Requestable) {
  _inherits(Issue, _Requestable);

  /**
   * Create a new Issue
   * @param {string} repository - the full name of the repository (`:user/:repo`) to get issues for
   * @param {Requestable.auth} [auth] - information required to authenticate to Github
   * @param {string} [apiBase=https://api.github.com] - the base Github API URL
   */
  function Issue(repository, auth, apiBase) {
    _classCallCheck(this, Issue);

    var _this = _possibleConstructorReturn(this, (Issue.__proto__ || Object.getPrototypeOf(Issue)).call(this, auth, apiBase));

    _this.__repository = repository;
    return _this;
  }

  /**
   * Create a new issue
   * @see https://developer.github.com/v3/issues/#create-an-issue
   * @param {Object} issueData - the issue to create
   * @param {Requestable.callback} [cb] - will receive the created issue
   * @return {Promise} - the promise for the http request
   */


  _createClass(Issue, [{
    key: 'createIssue',
    value: function createIssue(issueData, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/issues', issueData, cb);
    }

    /**
     * List the issues for the repository
     * @see https://developer.github.com/v3/issues/#list-issues-for-a-repository
     * @param {Object} options - filtering options
     * @param {Requestable.callback} [cb] - will receive the array of issues
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listIssues',
    value: function listIssues(options, cb) {
      return this._requestAllPages('/repos/' + this.__repository + '/issues', options, cb);
    }

    /**
     * List the events for an issue
     * @see https://developer.github.com/v3/issues/events/#list-events-for-an-issue
     * @param {number} issue - the issue to get events for
     * @param {Requestable.callback} [cb] - will receive the list of events
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listIssueEvents',
    value: function listIssueEvents(issue, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue + '/events', null, cb);
    }

    /**
     * List comments on an issue
     * @see https://developer.github.com/v3/issues/comments/#list-comments-on-an-issue
     * @param {number} issue - the id of the issue to get comments from
     * @param {Requestable.callback} [cb] - will receive the comments
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listIssueComments',
    value: function listIssueComments(issue, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue + '/comments', null, cb);
    }

    /**
     * Get a single comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#get-a-single-comment
     * @param {number} id - the comment id to get
     * @param {Requestable.callback} [cb] - will receive the comment
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getIssueComment',
    value: function getIssueComment(id, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
    }

    /**
     * Comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#create-a-comment
     * @param {number} issue - the id of the issue to comment on
     * @param {string} comment - the comment to add
     * @param {Requestable.callback} [cb] - will receive the created comment
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createIssueComment',
    value: function createIssueComment(issue, comment, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/issues/' + issue + '/comments', { body: comment }, cb);
    }

    /**
     * Edit a comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#edit-a-comment
     * @param {number} id - the comment id to edit
     * @param {string} comment - the comment to edit
     * @param {Requestable.callback} [cb] - will receive the edited comment
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editIssueComment',
    value: function editIssueComment(id, comment, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/issues/comments/' + id, { body: comment }, cb);
    }

    /**
     * Delete a comment on an issue
     * @see https://developer.github.com/v3/issues/comments/#delete-a-comment
     * @param {number} id - the comment id to delete
     * @param {Requestable.callback} [cb] - will receive true if the request is successful
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'deleteIssueComment',
    value: function deleteIssueComment(id, cb) {
      return this._request('DELETE', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
    }

    /**
     * Edit an issue
     * @see https://developer.github.com/v3/issues/#edit-an-issue
     * @param {number} issue - the issue number to edit
     * @param {Object} issueData - the new issue data
     * @param {Requestable.callback} [cb] - will receive the modified issue
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editIssue',
    value: function editIssue(issue, issueData, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/issues/' + issue, issueData, cb);
    }

    /**
     * Get a particular issue
     * @see https://developer.github.com/v3/issues/#get-a-single-issue
     * @param {number} issue - the issue number to fetch
     * @param {Requestable.callback} [cb] - will receive the issue
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getIssue',
    value: function getIssue(issue, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue, null, cb);
    }

    /**
     * List the milestones for the repository
     * @see https://developer.github.com/v3/issues/milestones/#list-milestones-for-a-repository
     * @param {Object} options - filtering options
     * @param {Requestable.callback} [cb] - will receive the array of milestones
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listMilestones',
    value: function listMilestones(options, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/milestones', options, cb);
    }

    /**
     * Get a milestone
     * @see https://developer.github.com/v3/issues/milestones/#get-a-single-milestone
     * @param {string} milestone - the id of the milestone to fetch
     * @param {Requestable.callback} [cb] - will receive the milestone
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getMilestone',
    value: function getMilestone(milestone, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
    }

    /**
     * Create a new milestone
     * @see https://developer.github.com/v3/issues/milestones/#create-a-milestone
     * @param {Object} milestoneData - the milestone definition
     * @param {Requestable.callback} [cb] - will receive the milestone
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createMilestone',
    value: function createMilestone(milestoneData, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/milestones', milestoneData, cb);
    }

    /**
     * Edit a milestone
     * @see https://developer.github.com/v3/issues/milestones/#update-a-milestone
     * @param {string} milestone - the id of the milestone to edit
     * @param {Object} milestoneData - the updates to make to the milestone
     * @param {Requestable.callback} [cb] - will receive the updated milestone
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editMilestone',
    value: function editMilestone(milestone, milestoneData, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/milestones/' + milestone, milestoneData, cb);
    }

    /**
     * Delete a milestone (this is distinct from closing a milestone)
     * @see https://developer.github.com/v3/issues/milestones/#delete-a-milestone
     * @param {string} milestone - the id of the milestone to delete
     * @param {Requestable.callback} [cb] - will receive the status
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'deleteMilestone',
    value: function deleteMilestone(milestone, cb) {
      return this._request('DELETE', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
    }

    /**
     * Create a new label
     * @see https://developer.github.com/v3/issues/labels/#create-a-label
     * @param {Object} labelData - the label definition
     * @param {Requestable.callback} [cb] - will receive the object representing the label
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'createLabel',
    value: function createLabel(labelData, cb) {
      return this._request('POST', '/repos/' + this.__repository + '/labels', labelData, cb);
    }

    /**
     * List the labels for the repository
     * @see https://developer.github.com/v3/issues/labels/#list-all-labels-for-this-repository
     * @param {Object} options - filtering options
     * @param {Requestable.callback} [cb] - will receive the array of labels
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'listLabels',
    value: function listLabels(options, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/labels', options, cb);
    }

    /**
     * Get a label
     * @see https://developer.github.com/v3/issues/labels/#get-a-single-label
     * @param {string} label - the name of the label to fetch
     * @param {Requestable.callback} [cb] - will receive the label
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'getLabel',
    value: function getLabel(label, cb) {
      return this._request('GET', '/repos/' + this.__repository + '/labels/' + label, null, cb);
    }

    /**
     * Edit a label
     * @see https://developer.github.com/v3/issues/labels/#update-a-label
     * @param {string} label - the name of the label to edit
     * @param {Object} labelData - the updates to make to the label
     * @param {Requestable.callback} [cb] - will receive the updated label
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'editLabel',
    value: function editLabel(label, labelData, cb) {
      return this._request('PATCH', '/repos/' + this.__repository + '/labels/' + label, labelData, cb);
    }

    /**
     * Delete a label
     * @see https://developer.github.com/v3/issues/labels/#delete-a-label
     * @param {string} label - the name of the label to delete
     * @param {Requestable.callback} [cb] - will receive the status
     * @return {Promise} - the promise for the http request
     */

  }, {
    key: 'deleteLabel',
    value: function deleteLabel(label, cb) {
      return this._request('DELETE', '/repos/' + this.__repository + '/labels/' + label, null, cb);
    }
  }]);

  return Issue;
}(_Requestable3.default);

module.exports = Issue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIklzc3VlLmpzIl0sIm5hbWVzIjpbIklzc3VlIiwicmVwb3NpdG9yeSIsImF1dGgiLCJhcGlCYXNlIiwiX19yZXBvc2l0b3J5IiwiaXNzdWVEYXRhIiwiY2IiLCJfcmVxdWVzdCIsIm9wdGlvbnMiLCJfcmVxdWVzdEFsbFBhZ2VzIiwiaXNzdWUiLCJpZCIsImNvbW1lbnQiLCJib2R5IiwibWlsZXN0b25lIiwibWlsZXN0b25lRGF0YSIsImxhYmVsRGF0YSIsImxhYmVsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQU9BOzs7Ozs7Ozs7OytlQVBBOzs7Ozs7O0FBU0E7OztJQUdNQSxLOzs7QUFDSDs7Ozs7O0FBTUEsaUJBQVlDLFVBQVosRUFBd0JDLElBQXhCLEVBQThCQyxPQUE5QixFQUF1QztBQUFBOztBQUFBLDhHQUM5QkQsSUFEOEIsRUFDeEJDLE9BRHdCOztBQUVwQyxVQUFLQyxZQUFMLEdBQW9CSCxVQUFwQjtBQUZvQztBQUd0Qzs7QUFFRDs7Ozs7Ozs7Ozs7Z0NBT1lJLFMsRUFBV0MsRSxFQUFJO0FBQ3hCLGFBQU8sS0FBS0MsUUFBTCxDQUFjLE1BQWQsY0FBZ0MsS0FBS0gsWUFBckMsY0FBNERDLFNBQTVELEVBQXVFQyxFQUF2RSxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7K0JBT1dFLE8sRUFBU0YsRSxFQUFJO0FBQ3JCLGFBQU8sS0FBS0csZ0JBQUwsYUFBZ0MsS0FBS0wsWUFBckMsY0FBNERJLE9BQTVELEVBQXFFRixFQUFyRSxDQUFQO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7b0NBT2dCSSxLLEVBQU9KLEUsRUFBSTtBQUN4QixhQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUtILFlBQXBDLGdCQUEyRE0sS0FBM0QsY0FBMkUsSUFBM0UsRUFBaUZKLEVBQWpGLENBQVA7QUFDRjs7QUFFRDs7Ozs7Ozs7OztzQ0FPa0JJLEssRUFBT0osRSxFQUFJO0FBQzFCLGFBQU8sS0FBS0MsUUFBTCxDQUFjLEtBQWQsY0FB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QWMsS0FBZCxjQUErQixLQUFLSCxZQUFwQyxjQUEyREksT0FBM0QsRUFBb0VGLEVBQXBFLENBQVA7QUFDRjs7QUFFRjs7Ozs7Ozs7Ozs2QkFPVVcsSyxFQUFPWCxFLEVBQUk7QUFDakIsYUFBTyxLQUFLQyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLSCxZQUFwQyxnQkFBMkRhLEtBQTNELEVBQW9FLElBQXBFLEVBQTBFWCxFQUExRSxDQUFQO0FBQ0Y7O0FBRUY7Ozs7Ozs7Ozs7OzhCQVFXVyxLLEVBQU9ELFMsRUFBV1YsRSxFQUFJO0FBQzdCLGFBQU8sS0FBS0MsUUFBTCxDQUFjLE9BQWQsY0FBaUMsS0FBS0gsWUFBdEMsZ0JBQTZEYSxLQUE3RCxFQUFzRUQsU0FBdEUsRUFBaUZWLEVBQWpGLENBQVA7QUFDRjs7QUFFRjs7Ozs7Ozs7OztnQ0FPYVcsSyxFQUFPWCxFLEVBQUk7QUFDcEIsYUFBTyxLQUFLQyxRQUFMLENBQWMsUUFBZCxjQUFrQyxLQUFLSCxZQUF2QyxnQkFBOERhLEtBQTlELEVBQXVFLElBQXZFLEVBQTZFWCxFQUE3RSxDQUFQO0FBQ0Y7Ozs7OztBQUdKWSxPQUFPQyxPQUFQLEdBQWlCbkIsS0FBakIiLCJmaWxlIjoiSXNzdWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlXG4gKiBAY29weXJpZ2h0ICAyMDEzIE1pY2hhZWwgQXVmcmVpdGVyIChEZXZlbG9wbWVudCBTZWVkKSBhbmQgMjAxNiBZYWhvbyBJbmMuXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxuICovXG5cbmltcG9ydCBSZXF1ZXN0YWJsZSBmcm9tICcuL1JlcXVlc3RhYmxlJztcblxuLyoqXG4gKiBJc3N1ZSB3cmFwcyB0aGUgZnVuY3Rpb25hbGl0eSB0byBnZXQgaXNzdWVzIGZvciByZXBvc2l0b3JpZXNcbiAqL1xuY2xhc3MgSXNzdWUgZXh0ZW5kcyBSZXF1ZXN0YWJsZSB7XG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBJc3N1ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG9zaXRvcnkgLSB0aGUgZnVsbCBuYW1lIG9mIHRoZSByZXBvc2l0b3J5IChgOnVzZXIvOnJlcG9gKSB0byBnZXQgaXNzdWVzIGZvclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5hdXRofSBbYXV0aF0gLSBpbmZvcm1hdGlvbiByZXF1aXJlZCB0byBhdXRoZW50aWNhdGUgdG8gR2l0aHViXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2FwaUJhc2U9aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbV0gLSB0aGUgYmFzZSBHaXRodWIgQVBJIFVSTFxuICAgICovXG4gICBjb25zdHJ1Y3RvcihyZXBvc2l0b3J5LCBhdXRoLCBhcGlCYXNlKSB7XG4gICAgICBzdXBlcihhdXRoLCBhcGlCYXNlKTtcbiAgICAgIHRoaXMuX19yZXBvc2l0b3J5ID0gcmVwb3NpdG9yeTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2NyZWF0ZS1hbi1pc3N1ZVxuICAgICogQHBhcmFtIHtPYmplY3R9IGlzc3VlRGF0YSAtIHRoZSBpc3N1ZSB0byBjcmVhdGVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNyZWF0ZWQgaXNzdWVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlSXNzdWUoaXNzdWVEYXRhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlc2AsIGlzc3VlRGF0YSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGlzc3VlcyBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2xpc3QtaXNzdWVzLWZvci1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZmlsdGVyaW5nIG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIGlzc3Vlc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0SXNzdWVzKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGV2ZW50cyBmb3IgYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvZXZlbnRzLyNsaXN0LWV2ZW50cy1mb3ItYW4taXNzdWVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc3N1ZSAtIHRoZSBpc3N1ZSB0byBnZXQgZXZlbnRzIGZvclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBldmVudHNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdElzc3VlRXZlbnRzKGlzc3VlLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzLyR7aXNzdWV9L2V2ZW50c2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IGNvbW1lbnRzIG9uIGFuIGlzc3VlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2NvbW1lbnRzLyNsaXN0LWNvbW1lbnRzLW9uLWFuLWlzc3VlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaXNzdWUgLSB0aGUgaWQgb2YgdGhlIGlzc3VlIHRvIGdldCBjb21tZW50cyBmcm9tXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjb21tZW50c1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0SXNzdWVDb21tZW50cyhpc3N1ZSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy8ke2lzc3VlfS9jb21tZW50c2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBzaW5nbGUgY29tbWVudCBvbiBhbiBpc3N1ZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9jb21tZW50cy8jZ2V0LWEtc2luZ2xlLWNvbW1lbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjb21tZW50IGlkIHRvIGdldFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWVudFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRJc3N1ZUNvbW1lbnQoaWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvY29tbWVudHMvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ29tbWVudCBvbiBhbiBpc3N1ZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9jb21tZW50cy8jY3JlYXRlLWEtY29tbWVudFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlzc3VlIC0gdGhlIGlkIG9mIHRoZSBpc3N1ZSB0byBjb21tZW50IG9uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCAtIHRoZSBjb21tZW50IHRvIGFkZFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY3JlYXRlZCBjb21tZW50XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZUlzc3VlQ29tbWVudChpc3N1ZSwgY29tbWVudCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX0vY29tbWVudHNgLCB7Ym9keTogY29tbWVudH0sIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBFZGl0IGEgY29tbWVudCBvbiBhbiBpc3N1ZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9jb21tZW50cy8jZWRpdC1hLWNvbW1lbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjb21tZW50IGlkIHRvIGVkaXRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50IC0gdGhlIGNvbW1lbnQgdG8gZWRpdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgZWRpdGVkIGNvbW1lbnRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZWRpdElzc3VlQ29tbWVudChpZCwgY29tbWVudCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzL2NvbW1lbnRzLyR7aWR9YCwge2JvZHk6IGNvbW1lbnR9LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgY29tbWVudCBvbiBhbiBpc3N1ZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9jb21tZW50cy8jZGVsZXRlLWEtY29tbWVudFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGNvbW1lbnQgaWQgdG8gZGVsZXRlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3QgaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVJc3N1ZUNvbW1lbnQoaWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvY29tbWVudHMvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRWRpdCBhbiBpc3N1ZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy8jZWRpdC1hbi1pc3N1ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlzc3VlIC0gdGhlIGlzc3VlIG51bWJlciB0byBlZGl0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXNzdWVEYXRhIC0gdGhlIG5ldyBpc3N1ZSBkYXRhXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtb2RpZmllZCBpc3N1ZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBlZGl0SXNzdWUoaXNzdWUsIGlzc3VlRGF0YSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzLyR7aXNzdWV9YCwgaXNzdWVEYXRhLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgcGFydGljdWxhciBpc3N1ZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy8jZ2V0LWEtc2luZ2xlLWlzc3VlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaXNzdWUgLSB0aGUgaXNzdWUgbnVtYmVyIHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBpc3N1ZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRJc3N1ZShpc3N1ZSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy8ke2lzc3VlfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBtaWxlc3RvbmVzIGZvciB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9taWxlc3RvbmVzLyNsaXN0LW1pbGVzdG9uZXMtZm9yLWEtcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBmaWx0ZXJpbmcgb3B0aW9uc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgbWlsZXN0b25lc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0TWlsZXN0b25lcyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbWlsZXN0b25lc2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBtaWxlc3RvbmVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jZ2V0LWEtc2luZ2xlLW1pbGVzdG9uZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1pbGVzdG9uZSAtIHRoZSBpZCBvZiB0aGUgbWlsZXN0b25lIHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtaWxlc3RvbmVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0TWlsZXN0b25lKG1pbGVzdG9uZSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXMvJHttaWxlc3RvbmV9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBtaWxlc3RvbmVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jY3JlYXRlLWEtbWlsZXN0b25lXG4gICAgKiBAcGFyYW0ge09iamVjdH0gbWlsZXN0b25lRGF0YSAtIHRoZSBtaWxlc3RvbmUgZGVmaW5pdGlvblxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWlsZXN0b25lXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZU1pbGVzdG9uZShtaWxlc3RvbmVEYXRhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXNgLCBtaWxlc3RvbmVEYXRhLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRWRpdCBhIG1pbGVzdG9uZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9taWxlc3RvbmVzLyN1cGRhdGUtYS1taWxlc3RvbmVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaWxlc3RvbmUgLSB0aGUgaWQgb2YgdGhlIG1pbGVzdG9uZSB0byBlZGl0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gbWlsZXN0b25lRGF0YSAtIHRoZSB1cGRhdGVzIHRvIG1ha2UgdG8gdGhlIG1pbGVzdG9uZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgdXBkYXRlZCBtaWxlc3RvbmVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZWRpdE1pbGVzdG9uZShtaWxlc3RvbmUsIG1pbGVzdG9uZURhdGEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXMvJHttaWxlc3RvbmV9YCwgbWlsZXN0b25lRGF0YSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIG1pbGVzdG9uZSAodGhpcyBpcyBkaXN0aW5jdCBmcm9tIGNsb3NpbmcgYSBtaWxlc3RvbmUpXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL21pbGVzdG9uZXMvI2RlbGV0ZS1hLW1pbGVzdG9uZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1pbGVzdG9uZSAtIHRoZSBpZCBvZiB0aGUgbWlsZXN0b25lIHRvIGRlbGV0ZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgc3RhdHVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZU1pbGVzdG9uZShtaWxlc3RvbmUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9taWxlc3RvbmVzLyR7bWlsZXN0b25lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgbGFiZWxcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbGFiZWxzLyNjcmVhdGUtYS1sYWJlbFxuICAgICogQHBhcmFtIHtPYmplY3R9IGxhYmVsRGF0YSAtIHRoZSBsYWJlbCBkZWZpbml0aW9uXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBsYWJlbFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVMYWJlbChsYWJlbERhdGEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbGFiZWxzYCwgbGFiZWxEYXRhLCBjYik7XG4gICB9XG5cbiAgLyoqXG4gICAqIExpc3QgdGhlIGxhYmVscyBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9sYWJlbHMvI2xpc3QtYWxsLWxhYmVscy1mb3ItdGhpcy1yZXBvc2l0b3J5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZmlsdGVyaW5nIG9wdGlvbnNcbiAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgbGFiZWxzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICovXG4gICBsaXN0TGFiZWxzKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9sYWJlbHNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGxhYmVsXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbGFiZWxzLyNnZXQtYS1zaW5nbGUtbGFiZWxcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIC0gdGhlIG5hbWUgb2YgdGhlIGxhYmVsIHRvIGZldGNoXG4gICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxhYmVsXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICovXG4gICBnZXRMYWJlbChsYWJlbCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2xhYmVscy8ke2xhYmVsfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAvKipcbiAgICogRWRpdCBhIGxhYmVsXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbGFiZWxzLyN1cGRhdGUtYS1sYWJlbFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgLSB0aGUgbmFtZSBvZiB0aGUgbGFiZWwgdG8gZWRpdFxuICAgKiBAcGFyYW0ge09iamVjdH0gbGFiZWxEYXRhIC0gdGhlIHVwZGF0ZXMgdG8gbWFrZSB0byB0aGUgbGFiZWxcbiAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgdXBkYXRlZCBsYWJlbFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAqL1xuICAgZWRpdExhYmVsKGxhYmVsLCBsYWJlbERhdGEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2xhYmVscy8ke2xhYmVsfWAsIGxhYmVsRGF0YSwgY2IpO1xuICAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBsYWJlbFxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2xhYmVscy8jZGVsZXRlLWEtbGFiZWxcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIC0gdGhlIG5hbWUgb2YgdGhlIGxhYmVsIHRvIGRlbGV0ZVxuICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBzdGF0dXNcbiAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgKi9cbiAgIGRlbGV0ZUxhYmVsKGxhYmVsLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbGFiZWxzLyR7bGFiZWx9YCwgbnVsbCwgY2IpO1xuICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IElzc3VlO1xuIl19
//# sourceMappingURL=Issue.js.map
