(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GitHub = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    global.Gist = mod.exports;
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

  var Gist = function (_Requestable) {
    _inherits(Gist, _Requestable);

    /**
     * Create a Gist.
     * @param {string} id - the id of the gist (not required when creating a gist)
     * @param {Requestable.auth} [auth] - information required to authenticate to Github
     * @param {string} [apiBase=https://api.github.com] - the base Github API URL
     */

    function Gist(id, auth, apiBase) {
      _classCallCheck(this, Gist);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Gist).call(this, auth, apiBase));

      _this.__id = id;
      return _this;
    }

    /**
     * Fetch a gist.
     * @see https://developer.github.com/v3/gists/#get-a-single-gist
     * @param {Requestable.callback} [cb] - will receive the gist
     * @return {Promise} - the Promise for the http request
     */


    _createClass(Gist, [{
      key: 'read',
      value: function read(cb) {
        return this._request('GET', '/gists/' + this.__id, null, cb);
      }
    }, {
      key: 'create',
      value: function create(gist, cb) {
        var _this2 = this;

        return this._request('POST', '/gists', gist, cb).then(function (response) {
          _this2.__id = response.data.id;
          return response;
        });
      }
    }, {
      key: 'delete',
      value: function _delete(cb) {
        return this._request('DELETE', '/gists/' + this.__id, null, cb);
      }
    }, {
      key: 'fork',
      value: function fork(cb) {
        return this._request('POST', '/gists/' + this.__id + '/forks', null, cb);
      }
    }, {
      key: 'update',
      value: function update(gist, cb) {
        return this._request('PATCH', '/gists/' + this.__id, gist, cb);
      }
    }, {
      key: 'star',
      value: function star(cb) {
        return this._request('PUT', '/gists/' + this.__id + '/star', null, cb);
      }
    }, {
      key: 'unstar',
      value: function unstar(cb) {
        return this._request('DELETE', '/gists/' + this.__id + '/star', null, cb);
      }
    }, {
      key: 'isStarred',
      value: function isStarred(cb) {
        return this._request204or404('/gists/' + this.__id + '/star', null, cb);
      }
    }, {
      key: 'listComments',
      value: function listComments(cb) {
        return this._requestAllPages('/gists/' + this.__id + '/comments', null, cb);
      }
    }, {
      key: 'getComment',
      value: function getComment(comment, cb) {
        return this._request('GET', '/gists/' + this.__id + '/comments/' + comment, null, cb);
      }
    }, {
      key: 'createComment',
      value: function createComment(comment, cb) {
        return this._request('POST', '/gists/' + this.__id + '/comments', { body: comment }, cb);
      }
    }, {
      key: 'editComment',
      value: function editComment(comment, body, cb) {
        return this._request('PATCH', '/gists/' + this.__id + '/comments/' + comment, { body: body }, cb);
      }
    }, {
      key: 'deleteComment',
      value: function deleteComment(comment, cb) {
        return this._request('DELETE', '/gists/' + this.__id + '/comments/' + comment, null, cb);
      }
    }]);

    return Gist;
  }(_Requestable3.default);

  module.exports = Gist;
});

},{"./Requestable":8}],2:[function(require,module,exports){
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

},{"./Gist":1,"./Issue":3,"./Markdown":4,"./Organization":5,"./RateLimit":6,"./Repository":7,"./Search":9,"./Team":10,"./User":11}],3:[function(require,module,exports){
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

},{"./Requestable":8}],4:[function(require,module,exports){
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
    global.Markdown = mod.exports;
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

  var Markdown = function (_Requestable) {
    _inherits(Markdown, _Requestable);

    /**
     * construct a RateLimit
     * @param {Requestable.auth} auth - the credentials to authenticate to GitHub
     * @param {string} [apiBase] - the base Github API URL
     * @return {Promise} - the promise for the http request
     */

    function Markdown(auth, apiBase) {
      _classCallCheck(this, Markdown);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Markdown).call(this, auth, apiBase));
    }

    /**
     * Render html from Markdown text.
     * @see https://developer.github.com/v3/markdown/#render-an-arbitrary-markdown-document
     * @param {Object} options - conversion options
     * @param {string} [options.text] - the markdown text to convert
     * @param {string} [options.mode=markdown] - can be either `markdown` or `gfm`
     * @param {string} [options.context] - repository name if mode is gfm
     * @param {Requestable.callback} [cb] - will receive the converted html
     * @return {Promise} - the promise for the http request
     */


    _createClass(Markdown, [{
      key: 'render',
      value: function render(options, cb) {
        return this._request('POST', '/markdown', options, cb);
      }
    }]);

    return Markdown;
  }(_Requestable3.default);

  module.exports = Markdown;
});

},{"./Requestable":8}],5:[function(require,module,exports){
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
    global.Organization = mod.exports;
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

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Organization).call(this, auth, apiBase));

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
    }, {
      key: 'getRepos',
      value: function getRepos(cb) {
        var requestOptions = this._getOptionsWithDefaults({ direction: 'desc' });

        return this._requestAllPages('/orgs/' + this.__name + '/repos', requestOptions, cb);
      }
    }, {
      key: 'isMember',
      value: function isMember(username, cb) {
        return this._request204or404('/orgs/' + this.__name + '/members/' + username, null, cb);
      }
    }, {
      key: 'listMembers',
      value: function listMembers(options, cb) {
        return this._request('GET', '/orgs/' + this.__name + '/members', options, cb);
      }
    }, {
      key: 'getTeams',
      value: function getTeams(cb) {
        return this._requestAllPages('/orgs/' + this.__name + '/teams', undefined, cb);
      }
    }, {
      key: 'createTeam',
      value: function createTeam(options, cb) {
        return this._request('POST', '/orgs/' + this.__name + '/teams', options, cb);
      }
    }]);

    return Organization;
  }(_Requestable3.default);

  module.exports = Organization;
});

},{"./Requestable":8}],6:[function(require,module,exports){
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
    global.RateLimit = mod.exports;
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

  var RateLimit = function (_Requestable) {
    _inherits(RateLimit, _Requestable);

    /**
     * construct a RateLimit
     * @param {Requestable.auth} auth - the credentials to authenticate to GitHub
     * @param {string} [apiBase] - the base Github API URL
     * @return {Promise} - the promise for the http request
     */

    function RateLimit(auth, apiBase) {
      _classCallCheck(this, RateLimit);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(RateLimit).call(this, auth, apiBase));
    }

    /**
     * Query the current rate limit
     * @see https://developer.github.com/v3/rate_limit/
     * @param {Requestable.callback} [cb] - will receive the rate-limit data
     * @return {Promise} - the promise for the http request
     */


    _createClass(RateLimit, [{
      key: 'getRateLimit',
      value: function getRateLimit(cb) {
        return this._request('GET', '/rate_limit', null, cb);
      }
    }]);

    return RateLimit;
  }(_Requestable3.default);

  module.exports = RateLimit;
});

},{"./Requestable":8}],7:[function(require,module,exports){
(function (Buffer){
(function (global, factory) {
   if (typeof define === "function" && define.amd) {
      define(['module', './Requestable', 'utf8', 'js-base64', 'debug'], factory);
   } else if (typeof exports !== "undefined") {
      factory(module, require('./Requestable'), require('utf8'), require('js-base64'), require('debug'));
   } else {
      var mod = {
         exports: {}
      };
      factory(mod, global.Requestable, global.utf8, global.jsBase64, global.debug);
      global.Repository = mod.exports;
   }
})(this, function (module, _Requestable2, _utf, _jsBase, _debug) {
   'use strict';

   var _Requestable3 = _interopRequireDefault(_Requestable2);

   var _utf2 = _interopRequireDefault(_utf);

   var _debug2 = _interopRequireDefault(_debug);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
   } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
   };

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

   var log = (0, _debug2.default)('github:repository');

   /**
    * Respository encapsulates the functionality to create, query, and modify files.
    */

   var Repository = function (_Requestable) {
      _inherits(Repository, _Requestable);

      /**
       * Create a Repository.
       * @param {string} fullname - the full name of the repository
       * @param {Requestable.auth} [auth] - information required to authenticate to Github
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */

      function Repository(fullname, auth, apiBase) {
         _classCallCheck(this, Repository);

         var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Repository).call(this, auth, apiBase));

         _this.__fullname = fullname;
         _this.__currentTree = {
            branch: null,
            sha: null
         };
         return _this;
      }

      /**
       * Get a reference
       * @see https://developer.github.com/v3/git/refs/#get-a-reference
       * @param {string} ref - the reference to get
       * @param {Requestable.callback} [cb] - will receive the reference's refSpec or a list of refSpecs that match `ref`
       * @return {Promise} - the promise for the http request
       */


      _createClass(Repository, [{
         key: 'getRef',
         value: function getRef(ref, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/git/refs/' + ref, null, cb);
         }
      }, {
         key: 'createRef',
         value: function createRef(options, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/git/refs', options, cb);
         }
      }, {
         key: 'deleteRef',
         value: function deleteRef(ref, cb) {
            return this._request('DELETE', '/repos/' + this.__fullname + '/git/refs/' + ref, null, cb);
         }
      }, {
         key: 'deleteRepo',
         value: function deleteRepo(cb) {
            return this._request('DELETE', '/repos/' + this.__fullname, null, cb);
         }
      }, {
         key: 'listTags',
         value: function listTags(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/tags', null, cb);
         }
      }, {
         key: 'listPullRequests',
         value: function listPullRequests(options, cb) {
            options = options || {};
            return this._request('GET', '/repos/' + this.__fullname + '/pulls', options, cb);
         }
      }, {
         key: 'getPullRequest',
         value: function getPullRequest(number, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/pulls/' + number, null, cb);
         }
      }, {
         key: 'listPullRequestFiles',
         value: function listPullRequestFiles(number, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/pulls/' + number + '/files', null, cb);
         }
      }, {
         key: 'compareBranches',
         value: function compareBranches(base, head, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/compare/' + base + '...' + head, null, cb);
         }
      }, {
         key: 'listBranches',
         value: function listBranches(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/branches', null, cb);
         }
      }, {
         key: 'getBlob',
         value: function getBlob(sha, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/git/blobs/' + sha, null, cb, 'raw');
         }
      }, {
         key: 'getCommit',
         value: function getCommit(sha, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/git/commits/' + sha, null, cb);
         }
      }, {
         key: 'listCommits',
         value: function listCommits(options, cb) {
            options = options || {};

            options.since = this._dateToISO(options.since);
            options.until = this._dateToISO(options.until);

            return this._request('GET', '/repos/' + this.__fullname + '/commits', options, cb);
         }
      }, {
         key: 'getSingleCommit',
         value: function getSingleCommit(ref, cb) {
            ref = ref || '';
            return this._request('GET', '/repos/' + this.__fullname + '/commits/' + ref, null, cb);
         }
      }, {
         key: 'getSha',
         value: function getSha(branch, path, cb) {
            branch = branch ? '?ref=' + branch : '';
            return this._request('GET', '/repos/' + this.__fullname + '/contents/' + path + branch, null, cb);
         }
      }, {
         key: 'listStatuses',
         value: function listStatuses(sha, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/commits/' + sha + '/statuses', null, cb);
         }
      }, {
         key: 'getTree',
         value: function getTree(treeSHA, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/git/trees/' + treeSHA, null, cb);
         }
      }, {
         key: 'createBlob',
         value: function createBlob(content, cb) {
            var postBody = this._getContentObject(content);

            log('sending content', postBody);
            return this._request('POST', '/repos/' + this.__fullname + '/git/blobs', postBody, cb);
         }
      }, {
         key: '_getContentObject',
         value: function _getContentObject(content) {
            if (typeof content === 'string') {
               log('contet is a string');
               return {
                  content: _utf2.default.encode(content),
                  encoding: 'utf-8'
               };
            } else if (typeof Buffer !== 'undefined' && content instanceof Buffer) {
               log('We appear to be in Node');
               return {
                  content: content.toString('base64'),
                  encoding: 'base64'
               };
            } else if (typeof Blob !== 'undefined' && content instanceof Blob) {
               log('We appear to be in the browser');
               return {
                  content: _jsBase.Base64.encode(content),
                  encoding: 'base64'
               };
            } else {
               // eslint-disable-line
               log('Not sure what this content is: ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)) + ', ' + JSON.stringify(content));
               throw new Error('Unknown content passed to postBlob. Must be string or Buffer (node) or Blob (web)');
            }
         }
      }, {
         key: 'updateTree',
         value: function updateTree(baseTreeSHA, path, blobSHA, cb) {
            var newTree = {
               base_tree: baseTreeSHA, // eslint-disable-line
               tree: [{
                  path: path,
                  sha: blobSHA,
                  mode: '100644',
                  type: 'blob'
               }]
            };

            return this._request('POST', '/repos/' + this.__fullname + '/git/trees', newTree, cb);
         }
      }, {
         key: 'createTree',
         value: function createTree(tree, baseSHA, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/git/trees', {
               tree: tree,
               base_tree: baseSHA // eslint-disable-line
            }, cb);
         }
      }, {
         key: 'commit',
         value: function commit(parent, tree, message, cb) {
            var _this2 = this;

            var data = {
               message: message,
               tree: tree,
               parents: [parent]
            };

            return this._request('POST', '/repos/' + this.__fullname + '/git/commits', data, cb).then(function (response) {
               _this2.__currentTree.sha = response.data.sha; // Update latest commit
               return response;
            });
         }
      }, {
         key: 'updateHead',
         value: function updateHead(ref, commitSHA, force, cb) {
            return this._request('PATCH', '/repos/' + this.__fullname + '/git/refs/' + ref, {
               sha: commitSHA,
               force: force
            }, cb);
         }
      }, {
         key: 'getDetails',
         value: function getDetails(cb) {
            return this._request('GET', '/repos/' + this.__fullname, null, cb);
         }
      }, {
         key: 'getContributors',
         value: function getContributors(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/stats/contributors', null, cb);
         }
      }, {
         key: 'getCollaborators',
         value: function getCollaborators(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/collaborators', null, cb);
         }
      }, {
         key: 'isCollaborator',
         value: function isCollaborator(username, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/collaborators/' + username, null, cb);
         }
      }, {
         key: 'getContents',
         value: function getContents(ref, path, raw, cb) {
            path = path ? '' + encodeURI(path) : '';
            return this._request('GET', '/repos/' + this.__fullname + '/contents/' + path, {
               ref: ref
            }, cb, raw);
         }
      }, {
         key: 'getReadme',
         value: function getReadme(ref, raw, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/readme', {
               ref: ref
            }, cb, raw);
         }
      }, {
         key: 'fork',
         value: function fork(cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/forks', null, cb);
         }
      }, {
         key: 'listForks',
         value: function listForks(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/forks', null, cb);
         }
      }, {
         key: 'createBranch',
         value: function createBranch(oldBranch, newBranch, cb) {
            var _this3 = this;

            if (typeof newBranch === 'function') {
               cb = newBranch;
               newBranch = oldBranch;
               oldBranch = 'master';
            }

            return this.getRef('heads/' + oldBranch).then(function (response) {
               var sha = response.data.object.sha;
               return _this3.createRef({
                  sha: sha,
                  ref: 'refs/heads/' + newBranch
               }, cb);
            });
         }
      }, {
         key: 'createPullRequest',
         value: function createPullRequest(options, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/pulls', options, cb);
         }
      }, {
         key: 'updatePullRequst',
         value: function updatePullRequst(number, options, cb) {
            return this._request('PATCH', '/repos/' + this.__fullname + '/pulls/' + number, options, cb);
         }
      }, {
         key: 'listHooks',
         value: function listHooks(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/hooks', null, cb);
         }
      }, {
         key: 'getHook',
         value: function getHook(id, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/hooks/' + id, null, cb);
         }
      }, {
         key: 'createHook',
         value: function createHook(options, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/hooks', options, cb);
         }
      }, {
         key: 'updateHook',
         value: function updateHook(id, options, cb) {
            return this._request('PATCH', '/repos/' + this.__fullname + '/hooks/' + id, options, cb);
         }
      }, {
         key: 'deleteHook',
         value: function deleteHook(id, cb) {
            return this._request('DELETE', this.__repoPath + '/hooks/' + id, null, cb);
         }
      }, {
         key: 'deleteFile',
         value: function deleteFile(branch, path, cb) {
            var _this4 = this;

            return this.getSha(branch, path).then(function (response) {
               var deleteCommit = {
                  message: 'Delete the file at \'' + path + '\'',
                  sha: response.data.sha,
                  branch: branch
               };
               return _this4._request('DELETE', '/repos/' + _this4.__fullname + '/contents/' + path, deleteCommit, cb);
            });
         }
      }, {
         key: 'move',
         value: function move(branch, oldPath, newPath, cb) {
            var _this5 = this;

            var oldSha = void 0;
            return this.getRef('heads/' + branch).then(function (_ref) {
               var object = _ref.data.object;
               return _this5.getTree(object.sha + '?recursive=true');
            }).then(function (_ref2) {
               var _ref2$data = _ref2.data;
               var tree = _ref2$data.tree;
               var sha = _ref2$data.sha;

               oldSha = sha;
               var newTree = tree.map(function (ref) {
                  if (ref.path === oldPath) {
                     ref.path = newPath;
                  }
                  if (ref.type === 'tree') {
                     delete ref.sha;
                  }
                  return ref;
               });
               return _this5.createTree(newTree);
            }).then(function (_ref3) {
               var tree = _ref3.data;
               return _this5.commit(oldSha, tree.sha, 'Renamed \'' + oldPath + '\' to \'' + newPath + '\'');
            }).then(function (_ref4) {
               var commit = _ref4.data;
               return _this5.updateHead('heads/' + branch, commit.sha, true, cb);
            });
         }
      }, {
         key: 'writeFile',
         value: function writeFile(branch, path, content, message, options, cb) {
            var _this6 = this;

            if (typeof options === 'function') {
               cb = options;
               options = {};
            }
            var filePath = path ? encodeURI(path) : '';
            var shouldEncode = options.encode !== false;
            var commit = {
               branch: branch,
               message: message,
               author: options.author,
               committer: options.committer,
               content: shouldEncode ? _jsBase.Base64.encode(content) : content
            };

            return this.getSha(branch, filePath).then(function (response) {
               commit.sha = response.data.sha;
               return _this6._request('PUT', '/repos/' + _this6.__fullname + '/contents/' + filePath, commit, cb);
            }, function () {
               return _this6._request('PUT', '/repos/' + _this6.__fullname + '/contents/' + filePath, commit, cb);
            });
         }
      }, {
         key: 'isStarred',
         value: function isStarred(cb) {
            return this._request204or404('/user/starred/' + this.__fullname, null, cb);
         }
      }, {
         key: 'star',
         value: function star(cb) {
            return this._request('PUT', '/user/starred/' + this.__fullname, null, cb);
         }
      }, {
         key: 'unstar',
         value: function unstar(cb) {
            return this._request('DELETE', '/user/starred/' + this.__fullname, null, cb);
         }
      }, {
         key: 'createRelease',
         value: function createRelease(options, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/releases', options, cb);
         }
      }, {
         key: 'updateRelease',
         value: function updateRelease(id, options, cb) {
            return this._request('PATCH', '/repos/' + this.__fullname + '/releases/' + id, options, cb);
         }
      }, {
         key: 'listReleases',
         value: function listReleases(cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/releases', null, cb);
         }
      }, {
         key: 'getRelease',
         value: function getRelease(id, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/releases/' + id, null, cb);
         }
      }, {
         key: 'deleteRelease',
         value: function deleteRelease(id, cb) {
            return this._request('DELETE', '/repos/' + this.__fullname + '/releases/' + id, null, cb);
         }
      }, {
         key: 'mergePullRequest',
         value: function mergePullRequest(number, options, cb) {
            return this._request('PUT', '/repos/' + this.__fullname + '/pulls/' + number + '/merge', options, cb);
         }
      }]);

      return Repository;
   }(_Requestable3.default);

   module.exports = Repository;
});

}).call(this,require("buffer").Buffer)

},{"./Requestable":8,"buffer":undefined,"debug":undefined,"js-base64":undefined,"utf8":undefined}],8:[function(require,module,exports){
(function (global, factory) {
   if (typeof define === "function" && define.amd) {
      define(['module', 'axios', 'debug', 'js-base64', 'es6-promise'], factory);
   } else if (typeof exports !== "undefined") {
      factory(module, require('axios'), require('debug'), require('js-base64'), require('es6-promise'));
   } else {
      var mod = {
         exports: {}
      };
      factory(mod, global.axios, global.debug, global.jsBase64, global.Promise);
      global.Requestable = mod.exports;
   }
})(this, function (module, _axios, _debug, _jsBase, _es6Promise) {
   'use strict';

   var _axios2 = _interopRequireDefault(_axios);

   var _debug2 = _interopRequireDefault(_debug);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
   } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
   };

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

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

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

   var log = (0, _debug2.default)('github:request');

   if (typeof Promise === 'undefined') {
      (0, _es6Promise.polyfill)();
   }

   /**
    * The error structure returned when a network call fails
    */

   var ResponseError = function (_Error) {
      _inherits(ResponseError, _Error);

      /**
       * Construct a new ResponseError
       * @param {string} message - an message to return instead of the the default error message
       * @param {string} path - the requested path
       * @param {Object} response - the object returned by Axios
       */

      function ResponseError(message, path, response) {
         _classCallCheck(this, ResponseError);

         var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ResponseError).call(this, message));

         _this.path = path;
         _this.request = response.config;
         _this.response = response;
         _this.status = response.status;
         return _this;
      }

      return ResponseError;
   }(Error);

   var Requestable = function () {
      /**
       * Either a username and password or an oauth token for Github
       * @typedef {Object} Requestable.auth
       * @prop {string} [username] - the Github username
       * @prop {string} [password] - the user's password
       * @prop {token} [token] - an OAuth token
       */
      /**
       * Initialize the http internals.
       * @param {Requestable.auth} [auth] - the credentials to authenticate to Github. If auth is
       *                                  not provided request will be made unauthenticated
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */

      function Requestable(auth, apiBase) {
         _classCallCheck(this, Requestable);

         this.__apiBase = apiBase || 'https://api.github.com';
         this.__auth = {
            token: auth.token,
            username: auth.username,
            password: auth.password
         };

         if (auth.token) {
            this.__authorizationHeader = 'token ' + auth.token;
         } else if (auth.username && auth.password) {
            this.__authorizationHeader = 'Basic ' + _jsBase.Base64.encode(auth.username + ':' + auth.password);
         }
      }

      /**
       * Compute the URL to use to make a request.
       * @private
       * @param {string} path - either a URL relative to the API base or an absolute URL
       * @return {string} - the URL to use
       */


      _createClass(Requestable, [{
         key: '__getURL',
         value: function __getURL(path) {
            var url = path;

            if (path.indexOf('//') === -1) {
               url = this.__apiBase + path;
            }

            var newCacheBuster = 'timestamp=' + new Date().getTime();
            return url.replace(/(timestamp=\d+)/, newCacheBuster);
         }
      }, {
         key: '__getRequestHeaders',
         value: function __getRequestHeaders(raw) {
            var headers = {
               'Accept': raw ? 'application/vnd.github.v3.raw+json' : 'application/vnd.github.v3+json',
               'Content-Type': 'application/json;charset=UTF-8'
            };

            if (this.__authorizationHeader) {
               headers.Authorization = this.__authorizationHeader;
            }

            return headers;
         }
      }, {
         key: '_getOptionsWithDefaults',
         value: function _getOptionsWithDefaults() {
            var requestOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            if (!(requestOptions.visibility || requestOptions.affiliation)) {
               requestOptions.type = requestOptions.type || 'all';
            }
            requestOptions.sort = requestOptions.sort || 'updated';
            requestOptions.per_page = requestOptions.per_page || '100'; // eslint-disable-line

            return requestOptions;
         }
      }, {
         key: '_dateToISO',
         value: function _dateToISO(date) {
            if (date && date instanceof Date) {
               date = date.toISOString();
            }

            return date;
         }
      }, {
         key: '_request',
         value: function _request(method, path, data, cb, raw) {
            var url = this.__getURL(path);
            var headers = this.__getRequestHeaders(raw);
            var queryParams = {};

            var shouldUseDataAsParams = data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && methodHasNoBody(method);
            if (shouldUseDataAsParams) {
               queryParams = data;
               data = undefined;
            }

            var config = {
               url: url,
               method: method,
               headers: headers,
               params: queryParams,
               data: data,
               responseType: raw ? 'text' : 'json'
            };

            log(config.method + ' to ' + config.url);
            var requestPromise = (0, _axios2.default)(config).catch(callbackErrorOrThrow(cb, path));

            if (cb) {
               requestPromise.then(function (response) {
                  cb(null, response.data || true, response);
               });
            }

            return requestPromise;
         }
      }, {
         key: '_request204or404',
         value: function _request204or404(path, data, cb) {
            var method = arguments.length <= 3 || arguments[3] === undefined ? 'GET' : arguments[3];

            return this._request(method, path, data).then(function success(response) {
               if (cb) {
                  cb(null, true, response);
               }
               return true;
            }, function failure(response) {
               if (response.status === 404) {
                  if (cb) {
                     cb(null, false, response);
                  }
                  return false;
               }

               if (cb) {
                  cb(response);
               }
               throw response;
            });
         }
      }, {
         key: '_requestAllPages',
         value: function _requestAllPages(path, options, cb, results) {
            var _this2 = this;

            results = results || [];

            return this._request('GET', path, options).then(function (response) {
               var thisGroup = void 0;
               if (response.data instanceof Array) {
                  thisGroup = response.data;
               } else if (response.data.items instanceof Array) {
                  thisGroup = response.data.items;
               } else {
                  var message = 'cannot figure out how to append ' + response.data + ' to the result set';
                  throw new ResponseError(message, path, response);
               }
               results.push.apply(results, thisGroup);

               var nextUrl = getNextPage(response.headers.link);
               if (nextUrl) {
                  log('getting next page: ' + nextUrl);
                  return _this2._requestAllPages(nextUrl, options, cb, results);
               }

               if (cb) {
                  cb(null, results, response);
               }

               response.data = results;
               return response;
            }).catch(callbackErrorOrThrow(cb, path));
         }
      }]);

      return Requestable;
   }();

   module.exports = Requestable;

   // ////////////////////////// //
   //  Private helper functions  //
   // ////////////////////////// //
   var METHODS_WITH_NO_BODY = ['GET', 'HEAD', 'DELETE'];
   function methodHasNoBody(method) {
      return METHODS_WITH_NO_BODY.indexOf(method) !== -1;
   }

   function getNextPage() {
      var linksHeader = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var links = linksHeader.split(/\s*,\s*/); // splits and strips the urls
      return links.reduce(function (nextUrl, link) {
         if (link.search(/rel="next"/) !== -1) {
            return (link.match(/<(.*)>/) || [])[1];
         }

         return nextUrl;
      }, undefined);
   }

   function callbackErrorOrThrow(cb, path) {
      return function handler(response) {
         var message = 'error making request ' + response.config.method + ' ' + response.config.url;
         var error = new ResponseError(message, path, response);
         log(message + ' ' + JSON.stringify(response.data));
         if (cb) {
            log('going to error callback');
            cb(error);
         } else {
            log('throwing error');
            throw error;
         }
      };
   }
});

},{"axios":undefined,"debug":undefined,"es6-promise":undefined,"js-base64":undefined}],9:[function(require,module,exports){
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

},{"./Requestable":8,"debug":undefined}],10:[function(require,module,exports){
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

},{"./Requestable":8,"debug":undefined}],11:[function(require,module,exports){
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
      global.User = mod.exports;
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

   var log = (0, _debug2.default)('github:user');

   /**
    * A User allows scoping of API requests to a particular Github user.
    */

   var User = function (_Requestable) {
      _inherits(User, _Requestable);

      /**
       * Create a User.
       * @param {string} [username] - the user to use for user-scoped queries
       * @param {Requestable.auth} [auth] - information required to authenticate to Github
       * @param {string} [apiBase=https://api.github.com] - the base Github API URL
       */

      function User(username, auth, apiBase) {
         _classCallCheck(this, User);

         var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(User).call(this, auth, apiBase));

         _this.__user = username;
         return _this;
      }

      /**
       * Get the url for the request. (dependent on if we're requesting for the authenticated user or not)
       * @private
       * @param {string} endpoint - the endpoint being requested
       * @return {string} - the resolved endpoint
       */


      _createClass(User, [{
         key: '__getScopedUrl',
         value: function __getScopedUrl(endpoint) {
            if (this.__user) {
               return endpoint ? '/users/' + this.__user + '/' + endpoint : '/users/' + this.__user;
            } else {
               // eslint-disable-line
               switch (endpoint) {
                  case '':
                     return '/user';

                  case 'notifications':
                  case 'gists':
                     return '/' + endpoint;

                  default:
                     return '/user/' + endpoint;
               }
            }
         }
      }, {
         key: 'listRepos',
         value: function listRepos(options, cb) {
            if (typeof options === 'function') {
               cb = options;
               options = {};
            }

            options = this._getOptionsWithDefaults(options);

            log('Fetching repositories with options: ' + JSON.stringify(options));
            return this._requestAllPages(this.__getScopedUrl('repos'), options, cb);
         }
      }, {
         key: 'listOrgs',
         value: function listOrgs(cb) {
            return this._request('GET', this.__getScopedUrl('orgs'), null, cb);
         }
      }, {
         key: 'listGists',
         value: function listGists(cb) {
            return this._request('GET', this.__getScopedUrl('gists'), null, cb);
         }
      }, {
         key: 'listNotifications',
         value: function listNotifications(options, cb) {
            options = options || {};
            if (typeof options === 'function') {
               cb = options;
               options = {};
            }

            options.since = this._dateToISO(options.since);
            options.before = this._dateToISO(options.before);

            return this._request('GET', this.__getScopedUrl('notifications'), options, cb);
         }
      }, {
         key: 'getProfile',
         value: function getProfile(cb) {
            return this._request('GET', this.__getScopedUrl(''), null, cb);
         }
      }, {
         key: 'listStarredRepos',
         value: function listStarredRepos(cb) {
            var requestOptions = this._getOptionsWithDefaults();
            return this._requestAllPages(this.__getScopedUrl('starred'), requestOptions, cb);
         }
      }, {
         key: 'follow',
         value: function follow(username, cb) {
            return this._request('PUT', '/user/following/' + this.__user, null, cb);
         }
      }, {
         key: 'unfollow',
         value: function unfollow(username, cb) {
            return this._request('DELETE', '/user/following/' + this.__user, null, cb);
         }
      }, {
         key: 'createRepo',
         value: function createRepo(options, cb) {
            return this._request('POST', '/user/repos', options, cb);
         }
      }]);

      return User;
   }(_Requestable3.default);

   module.exports = User;
});

},{"./Requestable":8,"debug":undefined}]},{},[2])(2)
});


//# sourceMappingURL=GitHub.js.map
