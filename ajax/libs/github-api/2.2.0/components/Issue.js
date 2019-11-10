(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', './Requestable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('./Requestable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.Requestable);
    global.Issue = mod.exports;
  }
})(this, function (module, _Requestable2) {
  'use strict';

  var _Requestable3 = _interopRequireDefault(_Requestable2);

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

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Issue).call(this, auth, apiBase));

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
    }, {
      key: 'listIssues',
      value: function listIssues(options, cb) {
        return this._requestAllPages('/repos/' + this.__repository + '/issues', options, cb);
      }
    }, {
      key: 'listIssueEvents',
      value: function listIssueEvents(issue, cb) {
        return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue + '/events', null, cb);
      }
    }, {
      key: 'listIssueComments',
      value: function listIssueComments(issue, cb) {
        return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue + '/comments', null, cb);
      }
    }, {
      key: 'getIssueComment',
      value: function getIssueComment(id, cb) {
        return this._request('GET', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
      }
    }, {
      key: 'createIssueComment',
      value: function createIssueComment(issue, comment, cb) {
        return this._request('POST', '/repos/' + this.__repository + '/issues/' + issue + '/comments', { body: comment }, cb);
      }
    }, {
      key: 'editIssueComment',
      value: function editIssueComment(id, comment, cb) {
        return this._request('PATCH', '/repos/' + this.__repository + '/issues/comments/' + id, { body: comment }, cb);
      }
    }, {
      key: 'deleteIssueComment',
      value: function deleteIssueComment(id, cb) {
        return this._request('DELETE', '/repos/' + this.__repository + '/issues/comments/' + id, null, cb);
      }
    }, {
      key: 'editIssue',
      value: function editIssue(issue, issueData, cb) {
        return this._request('PATCH', '/repos/' + this.__repository + '/issues/' + issue, issueData, cb);
      }
    }, {
      key: 'getIssue',
      value: function getIssue(issue, cb) {
        return this._request('GET', '/repos/' + this.__repository + '/issues/' + issue, null, cb);
      }
    }, {
      key: 'listMilestones',
      value: function listMilestones(options, cb) {
        return this._request('GET', '/repos/' + this.__repository + '/milestones', options, cb);
      }
    }, {
      key: 'getMilestone',
      value: function getMilestone(milestone, cb) {
        return this._request('GET', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
      }
    }, {
      key: 'createMilestone',
      value: function createMilestone(milestoneData, cb) {
        return this._request('POST', '/repos/' + this.__repository + '/milestones', milestoneData, cb);
      }
    }, {
      key: 'editMilestone',
      value: function editMilestone(milestone, milestoneData, cb) {
        return this._request('PATCH', '/repos/' + this.__repository + '/milestones/' + milestone, milestoneData, cb);
      }
    }, {
      key: 'deleteMilestone',
      value: function deleteMilestone(milestone, cb) {
        return this._request('DELETE', '/repos/' + this.__repository + '/milestones/' + milestone, null, cb);
      }
    }]);

    return Issue;
  }(_Requestable3.default);

  module.exports = Issue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIklzc3VlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BWU0sSzs7Ozs7Ozs7OztBQU9ILG1CQUFZLFVBQVosRUFBd0IsSUFBeEIsRUFBOEIsT0FBOUIsRUFBdUM7QUFBQTs7QUFBQSwyRkFDOUIsSUFEOEIsRUFDeEIsT0FEd0I7O0FBRXBDLFlBQUssWUFBTCxHQUFvQixVQUFwQjtBQUZvQztBQUd0Qzs7Ozs7Ozs7Ozs7OztrQ0FTVyxTLEVBQVcsRSxFQUFJO0FBQ3hCLGVBQU8sS0FBSyxRQUFMLENBQWMsTUFBZCxjQUFnQyxLQUFLLFlBQXJDLGNBQTRELFNBQTVELEVBQXVFLEVBQXZFLENBQVA7QUFDRjs7O2lDQVNVLE8sRUFBUyxFLEVBQUk7QUFDckIsZUFBTyxLQUFLLGdCQUFMLGFBQWdDLEtBQUssWUFBckMsY0FBNEQsT0FBNUQsRUFBcUUsRUFBckUsQ0FBUDtBQUNGOzs7c0NBU2UsSyxFQUFPLEUsRUFBSTtBQUN4QixlQUFPLEtBQUssUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBSyxZQUFwQyxnQkFBMkQsS0FBM0QsY0FBMkUsSUFBM0UsRUFBaUYsRUFBakYsQ0FBUDtBQUNGOzs7d0NBU2lCLEssRUFBTyxFLEVBQUk7QUFDMUIsZUFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFkLGNBQStCLEtBQUssWUFBcEMsZ0JBQTJELEtBQTNELGdCQUE2RSxJQUE3RSxFQUFtRixFQUFuRixDQUFQO0FBQ0Y7OztzQ0FTZSxFLEVBQUksRSxFQUFJO0FBQ3JCLGVBQU8sS0FBSyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLLFlBQXBDLHlCQUFvRSxFQUFwRSxFQUEwRSxJQUExRSxFQUFnRixFQUFoRixDQUFQO0FBQ0Y7Ozt5Q0FVa0IsSyxFQUFPLE8sRUFBUyxFLEVBQUk7QUFDcEMsZUFBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLGNBQWdDLEtBQUssWUFBckMsZ0JBQTRELEtBQTVELGdCQUE4RSxFQUFDLE1BQU0sT0FBUCxFQUE5RSxFQUErRixFQUEvRixDQUFQO0FBQ0Y7Ozt1Q0FVZ0IsRSxFQUFJLE8sRUFBUyxFLEVBQUk7QUFDL0IsZUFBTyxLQUFLLFFBQUwsQ0FBYyxPQUFkLGNBQWlDLEtBQUssWUFBdEMseUJBQXNFLEVBQXRFLEVBQTRFLEVBQUMsTUFBTSxPQUFQLEVBQTVFLEVBQTZGLEVBQTdGLENBQVA7QUFDRjs7O3lDQVNrQixFLEVBQUksRSxFQUFJO0FBQ3hCLGVBQU8sS0FBSyxRQUFMLENBQWMsUUFBZCxjQUFrQyxLQUFLLFlBQXZDLHlCQUF1RSxFQUF2RSxFQUE2RSxJQUE3RSxFQUFtRixFQUFuRixDQUFQO0FBQ0Y7OztnQ0FVUyxLLEVBQU8sUyxFQUFXLEUsRUFBSTtBQUM3QixlQUFPLEtBQUssUUFBTCxDQUFjLE9BQWQsY0FBaUMsS0FBSyxZQUF0QyxnQkFBNkQsS0FBN0QsRUFBc0UsU0FBdEUsRUFBaUYsRUFBakYsQ0FBUDtBQUNGOzs7K0JBU1EsSyxFQUFPLEUsRUFBSTtBQUNqQixlQUFPLEtBQUssUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBSyxZQUFwQyxnQkFBMkQsS0FBM0QsRUFBb0UsSUFBcEUsRUFBMEUsRUFBMUUsQ0FBUDtBQUNGOzs7cUNBU2MsTyxFQUFTLEUsRUFBSTtBQUN6QixlQUFPLEtBQUssUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBSyxZQUFwQyxrQkFBK0QsT0FBL0QsRUFBd0UsRUFBeEUsQ0FBUDtBQUNGOzs7bUNBU1ksUyxFQUFXLEUsRUFBSTtBQUN6QixlQUFPLEtBQUssUUFBTCxDQUFjLEtBQWQsY0FBK0IsS0FBSyxZQUFwQyxvQkFBK0QsU0FBL0QsRUFBNEUsSUFBNUUsRUFBa0YsRUFBbEYsQ0FBUDtBQUNGOzs7c0NBU2UsYSxFQUFlLEUsRUFBSTtBQUNoQyxlQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsY0FBZ0MsS0FBSyxZQUFyQyxrQkFBZ0UsYUFBaEUsRUFBK0UsRUFBL0UsQ0FBUDtBQUNGOzs7b0NBVWEsUyxFQUFXLGEsRUFBZSxFLEVBQUk7QUFDekMsZUFBTyxLQUFLLFFBQUwsQ0FBYyxPQUFkLGNBQWlDLEtBQUssWUFBdEMsb0JBQWlFLFNBQWpFLEVBQThFLGFBQTlFLEVBQTZGLEVBQTdGLENBQVA7QUFDRjs7O3NDQVNlLFMsRUFBVyxFLEVBQUk7QUFDNUIsZUFBTyxLQUFLLFFBQUwsQ0FBYyxRQUFkLGNBQWtDLEtBQUssWUFBdkMsb0JBQWtFLFNBQWxFLEVBQStFLElBQS9FLEVBQXFGLEVBQXJGLENBQVA7QUFDRjs7Ozs7O0FBR0osU0FBTyxPQUFQLEdBQWlCLEtBQWpCIiwiZmlsZSI6Iklzc3VlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XG5cbi8qKlxuICogSXNzdWUgd3JhcHMgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gZ2V0IGlzc3VlcyBmb3IgcmVwb3NpdG9yaWVzXG4gKi9cbmNsYXNzIElzc3VlIGV4dGVuZHMgUmVxdWVzdGFibGUge1xuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgSXNzdWVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvc2l0b3J5IC0gdGhlIGZ1bGwgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeSAoYDp1c2VyLzpyZXBvYCkgdG8gZ2V0IGlzc3VlcyBmb3JcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IocmVwb3NpdG9yeSwgYXV0aCwgYXBpQmFzZSkge1xuICAgICAgc3VwZXIoYXV0aCwgYXBpQmFzZSk7XG4gICAgICB0aGlzLl9fcmVwb3NpdG9yeSA9IHJlcG9zaXRvcnk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IGlzc3VlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzLyNjcmVhdGUtYW4taXNzdWVcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBpc3N1ZURhdGEgLSB0aGUgaXNzdWUgdG8gY3JlYXRlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjcmVhdGVkIGlzc3VlXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZUlzc3VlKGlzc3VlRGF0YSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXNgLCBpc3N1ZURhdGEsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBpc3N1ZXMgZm9yIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzLyNsaXN0LWlzc3Vlcy1mb3ItYS1yZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGZpbHRlcmluZyBvcHRpb25zXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBhcnJheSBvZiBpc3N1ZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdElzc3VlcyhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlc2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBldmVudHMgZm9yIGFuIGlzc3VlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL2V2ZW50cy8jbGlzdC1ldmVudHMtZm9yLWFuLWlzc3VlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaXNzdWUgLSB0aGUgaXNzdWUgdG8gZ2V0IGV2ZW50cyBmb3JcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgZXZlbnRzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RJc3N1ZUV2ZW50cyhpc3N1ZSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy8ke2lzc3VlfS9ldmVudHNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCBjb21tZW50cyBvbiBhbiBpc3N1ZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9jb21tZW50cy8jbGlzdC1jb21tZW50cy1vbi1hbi1pc3N1ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlzc3VlIC0gdGhlIGlkIG9mIHRoZSBpc3N1ZSB0byBnZXQgY29tbWVudHMgZnJvbVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWVudHNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdElzc3VlQ29tbWVudHMoaXNzdWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX0vY29tbWVudHNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgc2luZ2xlIGNvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2dldC1hLXNpbmdsZS1jb21tZW50XG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY29tbWVudCBpZCB0byBnZXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1lbnRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0SXNzdWVDb21tZW50KGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzL2NvbW1lbnRzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2NyZWF0ZS1hLWNvbW1lbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc3N1ZSAtIHRoZSBpZCBvZiB0aGUgaXNzdWUgdG8gY29tbWVudCBvblxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnQgLSB0aGUgY29tbWVudCB0byBhZGRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGNyZWF0ZWQgY29tbWVudFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVJc3N1ZUNvbW1lbnQoaXNzdWUsIGNvbW1lbnQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzLyR7aXNzdWV9L2NvbW1lbnRzYCwge2JvZHk6IGNvbW1lbnR9LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRWRpdCBhIGNvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2VkaXQtYS1jb21tZW50XG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY29tbWVudCBpZCB0byBlZGl0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCAtIHRoZSBjb21tZW50IHRvIGVkaXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGVkaXRlZCBjb21tZW50XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGVkaXRJc3N1ZUNvbW1lbnQoaWQsIGNvbW1lbnQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy9jb21tZW50cy8ke2lkfWAsIHtib2R5OiBjb21tZW50fSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIGNvbW1lbnQgb24gYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvY29tbWVudHMvI2RlbGV0ZS1hLWNvbW1lbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjb21tZW50IGlkIHRvIGRlbGV0ZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZGVsZXRlSXNzdWVDb21tZW50KGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vaXNzdWVzL2NvbW1lbnRzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYW4gaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2VkaXQtYW4taXNzdWVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpc3N1ZSAtIHRoZSBpc3N1ZSBudW1iZXIgdG8gZWRpdFxuICAgICogQHBhcmFtIHtPYmplY3R9IGlzc3VlRGF0YSAtIHRoZSBuZXcgaXNzdWUgZGF0YVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbW9kaWZpZWQgaXNzdWVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZWRpdElzc3VlKGlzc3VlLCBpc3N1ZURhdGEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L2lzc3Vlcy8ke2lzc3VlfWAsIGlzc3VlRGF0YSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhIHBhcnRpY3VsYXIgaXNzdWVcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvI2dldC1hLXNpbmdsZS1pc3N1ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlzc3VlIC0gdGhlIGlzc3VlIG51bWJlciB0byBmZXRjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgaXNzdWVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0SXNzdWUoaXNzdWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9pc3N1ZXMvJHtpc3N1ZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgbWlsZXN0b25lcyBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jbGlzdC1taWxlc3RvbmVzLWZvci1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gZmlsdGVyaW5nIG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IG9mIG1pbGVzdG9uZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdE1pbGVzdG9uZXMob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgbWlsZXN0b25lXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvaXNzdWVzL21pbGVzdG9uZXMvI2dldC1hLXNpbmdsZS1taWxlc3RvbmVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaWxlc3RvbmUgLSB0aGUgaWQgb2YgdGhlIG1pbGVzdG9uZSB0byBmZXRjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgbWlsZXN0b25lc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRNaWxlc3RvbmUobWlsZXN0b25lLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbWlsZXN0b25lcy8ke21pbGVzdG9uZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IG1pbGVzdG9uZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9taWxlc3RvbmVzLyNjcmVhdGUtYS1taWxlc3RvbmVcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBtaWxlc3RvbmVEYXRhIC0gdGhlIG1pbGVzdG9uZSBkZWZpbml0aW9uXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBhcnJheSBvZiBtaWxlc3RvbmVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZU1pbGVzdG9uZShtaWxlc3RvbmVEYXRhLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX3JlcG9zaXRvcnl9L21pbGVzdG9uZXNgLCBtaWxlc3RvbmVEYXRhLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRWRpdCBhIG1pbGVzdG9uZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2lzc3Vlcy9taWxlc3RvbmVzLyN1cGRhdGUtYS1taWxlc3RvbmVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaWxlc3RvbmUgLSB0aGUgaWQgb2YgdGhlIG1pbGVzdG9uZSB0byBlZGl0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gbWlsZXN0b25lRGF0YSAtIHRoZSB1cGRhdGVzIHRvIG1ha2UgdG8gdGhlIG1pbGVzdG9uZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgb2YgbWlsZXN0b25lc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBlZGl0TWlsZXN0b25lKG1pbGVzdG9uZSwgbWlsZXN0b25lRGF0YSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fcmVwb3NpdG9yeX0vbWlsZXN0b25lcy8ke21pbGVzdG9uZX1gLCBtaWxlc3RvbmVEYXRhLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgbWlsZXN0b25lICh0aGlzIGlzIGRpc3RpbmN0IGZyb20gY2xvc2luZyBhIG1pbGVzdG9uZSlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9pc3N1ZXMvbWlsZXN0b25lcy8jZGVsZXRlLWEtbWlsZXN0b25lXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWlsZXN0b25lIC0gdGhlIGlkIG9mIHRoZSBtaWxlc3RvbmUgdG8gZGVsZXRlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBhcnJheSBvZiBtaWxlc3RvbmVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZU1pbGVzdG9uZShtaWxlc3RvbmUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19yZXBvc2l0b3J5fS9taWxlc3RvbmVzLyR7bWlsZXN0b25lfWAsIG51bGwsIGNiKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJc3N1ZTtcbiJdfQ==
//# sourceMappingURL=Issue.js.map
