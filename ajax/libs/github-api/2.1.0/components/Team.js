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
    global.Team = mod.exports;
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

  var log = (0, _debug2.default)('github:team');

  /**
   * A Team allows scoping of API requests to a particular Github Organization Team.
   */

  var Team = function (_Requestable) {
    _inherits(Team, _Requestable);

    /**
     * Create a Team.
     * @param {string} [teamId] - the id for the team
     * @param {Requestable.auth} [auth] - information required to authenticate to Github
     * @param {string} [apiBase=https://api.github.com] - the base Github API URL
     */

    function Team(teamId, auth, apiBase) {
      _classCallCheck(this, Team);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Team).call(this, auth, apiBase));

      _this.__teamId = teamId;
      return _this;
    }

    /**
     * Get Team information
     * @see https://developer.github.com/v3/orgs/teams/#get-team
     * @param {Requestable.callback} [cb] - will receive the team
     * @return {Promise} - the promise for the http request
     */


    _createClass(Team, [{
      key: 'getTeam',
      value: function getTeam(cb) {
        log('Fetching Team ' + this.__teamId);
        return this._request('Get', '/teams/' + this.__teamId, undefined, cb);
      }
    }, {
      key: 'listRepos',
      value: function listRepos(cb) {
        log('Fetching repositories for Team ' + this.__teamId);
        return this._requestAllPages('/teams/' + this.__teamId + '/repos', undefined, cb);
      }
    }, {
      key: 'editTeam',
      value: function editTeam(options, cb) {
        log('Editing Team ' + this.__teamId);
        return this._request('PATCH', '/teams/' + this.__teamId, options, cb);
      }
    }, {
      key: 'listMembers',
      value: function listMembers(options, cb) {
        log('Getting members of Team ' + this.__teamId);
        return this._requestAllPages('/teams/' + this.__teamId + '/members', options, cb);
      }
    }, {
      key: 'getMembership',
      value: function getMembership(username, cb) {
        log('Getting membership of user ' + username + ' in Team ' + this.__teamId);
        return this._request('GET', '/teams/' + this.__teamId + '/memberships/' + username, undefined, cb);
      }
    }, {
      key: 'addMembership',
      value: function addMembership(username, options, cb) {
        log('Adding user ' + username + ' to Team ' + this.__teamId);
        return this._request('PUT', '/teams/' + this.__teamId + '/memberships/' + username, options, cb);
      }
    }, {
      key: 'isManagedRepo',
      value: function isManagedRepo(owner, repo, cb) {
        log('Getting repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
        return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, undefined, cb);
      }
    }, {
      key: 'manageRepo',
      value: function manageRepo(owner, repo, options, cb) {
        log('Adding or Updating repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
        return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, options, cb, 'PUT');
      }
    }, {
      key: 'unmanageRepo',
      value: function unmanageRepo(owner, repo, cb) {
        log('Remove repo management by Team ' + this.__teamId + ' for repo ' + owner + '/' + repo);
        return this._request204or404('/teams/' + this.__teamId + '/repos/' + owner + '/' + repo, undefined, cb, 'DELETE');
      }
    }, {
      key: 'deleteTeam',
      value: function deleteTeam(cb) {
        log('Deleting Team ' + this.__teamId);
        return this._request204or404('/teams/' + this.__teamId, undefined, cb, 'DELETE');
      }
    }]);

    return Team;
  }(_Requestable3.default);

  module.exports = Team;
});
//# sourceMappingURL=data:application/json;base64,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aUIsSUFBakIiLCJmaWxlIjoiVGVhbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTYgTWF0dCBTbWl0aCAoRGV2ZWxvcG1lbnQgU2VlZClcbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuaW1wb3J0IGRlYnVnIGZyb20gJ2RlYnVnJztcbmNvbnN0IGxvZyA9IGRlYnVnKCdnaXRodWI6dGVhbScpO1xuXG4vKipcbiAqIEEgVGVhbSBhbGxvd3Mgc2NvcGluZyBvZiBBUEkgcmVxdWVzdHMgdG8gYSBwYXJ0aWN1bGFyIEdpdGh1YiBPcmdhbml6YXRpb24gVGVhbS5cbiAqL1xuY2xhc3MgVGVhbSBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgVGVhbS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdGVhbUlkXSAtIHRoZSBpZCBmb3IgdGhlIHRlYW1cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IodGVhbUlkLCBhdXRoLCBhcGlCYXNlKSB7XG4gICAgICBzdXBlcihhdXRoLCBhcGlCYXNlKTtcbiAgICAgIHRoaXMuX190ZWFtSWQgPSB0ZWFtSWQ7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IFRlYW0gaW5mb3JtYXRpb25cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNnZXQtdGVhbVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgdGVhbVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRUZWFtKGNiKSB7XG4gICAgICBsb2coYEZldGNoaW5nIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dldCcsIGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfWAsIHVuZGVmaW5lZCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIFRlYW0ncyByZXBvc2l0b3JpZXNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNsaXN0LXRlYW0tcmVwb3NcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RSZXBvcyhjYikge1xuICAgICAgbG9nKGBGZXRjaGluZyByZXBvc2l0b3JpZXMgZm9yIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RBbGxQYWdlcyhgL3RlYW1zLyR7dGhpcy5fX3RlYW1JZH0vcmVwb3NgLCB1bmRlZmluZWQsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBFZGl0IFRlYW0gaW5mb3JtYXRpb25cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNlZGl0LXRlYW1cbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gUGFyYW1ldGVycyBmb3IgdGVhbSBlZGl0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5uYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHRlYW1cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5kZXNjcmlwdGlvbl0gLSBUZWFtIGRlc2NyaXB0aW9uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucmVwb19uYW1lc10gLSBSZXBvcyB0byBhZGQgdGhlIHRlYW0gdG9cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5wcml2YWN5PXNlY3JldF0gLSBUaGUgbGV2ZWwgb2YgcHJpdmFjeSB0aGUgdGVhbSBzaG91bGQgaGF2ZS4gQ2FuIGJlIGVpdGhlciBvbmVcbiAgICAqIG9mOiBgc2VjcmV0YCwgb3IgYGNsb3NlZGBcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgdGVhbVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBlZGl0VGVhbShvcHRpb25zLCBjYikge1xuICAgICAgbG9nKGBFZGl0aW5nIFRlYW0gJHt0aGlzLl9fdGVhbUlkfWApO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9YCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIHVzZXJzIHdobyBhcmUgbWVtYmVycyBvZiB0aGUgVGVhbVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2xpc3QtdGVhbS1tZW1iZXJzXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFBhcmFtZXRlcnMgZm9yIGxpc3RpbmcgdGVhbSB1c2Vyc1xuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnJvbGU9YWxsXSAtIGNhbiBiZSBvbmUgb2Y6IGBhbGxgLCBgbWFpbnRhaW5lcmAsIG9yIGBtZW1iZXJgXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHVzZXJzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RNZW1iZXJzKG9wdGlvbnMsIGNiKSB7XG4gICAgICBsb2coYEdldHRpbmcgbWVtYmVycyBvZiBUZWFtICR7dGhpcy5fX3RlYW1JZH1gKTtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L21lbWJlcnNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IFRlYW0gbWVtYmVyc2hpcCBzdGF0dXMgZm9yIGEgdXNlclxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL29yZ3MvdGVhbXMvI2dldC10ZWFtLW1lbWJlcnNoaXBcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSAtIGNhbiBiZSBvbmUgb2Y6IGBhbGxgLCBgbWFpbnRhaW5lcmAsIG9yIGBtZW1iZXJgXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtZW1iZXJzaGlwIHN0YXR1cyBvZiBhIHVzZXJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0TWVtYmVyc2hpcCh1c2VybmFtZSwgY2IpIHtcbiAgICAgIGxvZyhgR2V0dGluZyBtZW1iZXJzaGlwIG9mIHVzZXIgJHt1c2VybmFtZX0gaW4gVGVhbSAke3RoaXMuX190ZWFtSWR9YCk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L21lbWJlcnNoaXBzLyR7dXNlcm5hbWV9YCwgdW5kZWZpbmVkLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQWRkIGEgbWVtYmVyIHRvIHRoZSBUZWFtXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jYWRkLXRlYW0tbWVtYmVyc2hpcFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIC0gY2FuIGJlIG9uZSBvZjogYGFsbGAsIGBtYWludGFpbmVyYCwgb3IgYG1lbWJlcmBcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gUGFyYW1ldGVycyBmb3IgYWRkaW5nIGEgdGVhbSBtZW1iZXJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5yb2xlPW1lbWJlcl0gLSBUaGUgcm9sZSB0aGF0IHRoaXMgdXNlciBzaG91bGQgaGF2ZSBpbiB0aGUgdGVhbS4gQ2FuIGJlIG9uZVxuICAgICogb2Y6IGBtZW1iZXJgLCBvciBgbWFpbnRhaW5lcmBcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1lbWJlcnNoaXAgc3RhdHVzIG9mIGFkZGVkIHVzZXJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgYWRkTWVtYmVyc2hpcCh1c2VybmFtZSwgb3B0aW9ucywgY2IpIHtcbiAgICAgIGxvZyhgQWRkaW5nIHVzZXIgJHt1c2VybmFtZX0gdG8gVGVhbSAke3RoaXMuX190ZWFtSWR9YCk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC90ZWFtcy8ke3RoaXMuX190ZWFtSWR9L21lbWJlcnNoaXBzLyR7dXNlcm5hbWV9YCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCByZXBvIG1hbmFnZW1lbnQgc3RhdHVzIGZvciB0ZWFtXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jcmVtb3ZlLXRlYW0tbWVtYmVyc2hpcFxuICAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyIC0gT3JnYW5pemF0aW9uIG5hbWVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBvIC0gUmVwbyBuYW1lXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBtZW1iZXJzaGlwIHN0YXR1cyBvZiBhZGRlZCB1c2VyXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGlzTWFuYWdlZFJlcG8ob3duZXIsIHJlcG8sIGNiKSB7XG4gICAgICBsb2coYEdldHRpbmcgcmVwbyBtYW5hZ2VtZW50IGJ5IFRlYW0gJHt0aGlzLl9fdGVhbUlkfSBmb3IgcmVwbyAke293bmVyfS8ke3JlcG99YCk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdDIwNG9yNDA0KGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9yZXBvcy8ke293bmVyfS8ke3JlcG99YCwgdW5kZWZpbmVkLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQWRkIG9yIFVwZGF0ZSByZXBvIG1hbmFnZW1lbnQgc3RhdHVzIGZvciB0ZWFtXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jYWRkLW9yLXVwZGF0ZS10ZWFtLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvd25lciAtIE9yZ2FuaXphdGlvbiBuYW1lXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwbyAtIFJlcG8gbmFtZVxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBQYXJhbWV0ZXJzIGZvciBhZGRpbmcgb3IgdXBkYXRpbmcgcmVwbyBtYW5hZ2VtZW50IGZvciB0aGUgdGVhbVxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBlcm1pc3Npb25dIC0gVGhlIHBlcm1pc3Npb24gdG8gZ3JhbnQgdGhlIHRlYW0gb24gdGhpcyByZXBvc2l0b3J5LiBDYW4gYmUgb25lXG4gICAgKiBvZjogYHB1bGxgLCBgcHVzaGAsIG9yIGBhZG1pbmBcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1lbWJlcnNoaXAgc3RhdHVzIG9mIGFkZGVkIHVzZXJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbWFuYWdlUmVwbyhvd25lciwgcmVwbywgb3B0aW9ucywgY2IpIHtcbiAgICAgIGxvZyhgQWRkaW5nIG9yIFVwZGF0aW5nIHJlcG8gbWFuYWdlbWVudCBieSBUZWFtICR7dGhpcy5fX3RlYW1JZH0gZm9yIHJlcG8gJHtvd25lcn0vJHtyZXBvfWApO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL3RlYW1zLyR7dGhpcy5fX3RlYW1JZH0vcmVwb3MvJHtvd25lcn0vJHtyZXBvfWAsIG9wdGlvbnMsIGNiLCAnUFVUJyk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogUmVtb3ZlIHJlcG8gbWFuYWdlbWVudCBzdGF0dXMgZm9yIHRlYW1cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9vcmdzL3RlYW1zLyNyZW1vdmUtdGVhbS1yZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3duZXIgLSBPcmdhbml6YXRpb24gbmFtZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcG8gLSBSZXBvIG5hbWVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1lbWJlcnNoaXAgc3RhdHVzIG9mIGFkZGVkIHVzZXJcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgdW5tYW5hZ2VSZXBvKG93bmVyLCByZXBvLCBjYikge1xuICAgICAgbG9nKGBSZW1vdmUgcmVwbyBtYW5hZ2VtZW50IGJ5IFRlYW0gJHt0aGlzLl9fdGVhbUlkfSBmb3IgcmVwbyAke293bmVyfS8ke3JlcG99YCk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdDIwNG9yNDA0KGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfS9yZXBvcy8ke293bmVyfS8ke3JlcG99YCwgdW5kZWZpbmVkLCBjYiwgJ0RFTEVURScpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBUZWFtXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvb3Jncy90ZWFtcy8jZGVsZXRlLXRlYW1cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZVRlYW0oY2IpIHtcbiAgICAgIGxvZyhgRGVsZXRpbmcgVGVhbSAke3RoaXMuX190ZWFtSWR9YCk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdDIwNG9yNDA0KGAvdGVhbXMvJHt0aGlzLl9fdGVhbUlkfWAsIHVuZGVmaW5lZCwgY2IsICdERUxFVEUnKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZWFtO1xuIl19
//# sourceMappingURL=Team.js.map
