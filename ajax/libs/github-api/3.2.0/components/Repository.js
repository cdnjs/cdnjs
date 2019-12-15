'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Requestable2 = require('./Requestable');

var _Requestable3 = _interopRequireDefault(_Requestable2);

var _utf = require('utf8');

var _utf2 = _interopRequireDefault(_utf);

var _jsBase = require('js-base64');

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

var log = (0, _debug2.default)('github:repository');

/**
 * Repository encapsulates the functionality to create, query, and modify files.
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

      var _this = _possibleConstructorReturn(this, (Repository.__proto__ || Object.getPrototypeOf(Repository)).call(this, auth, apiBase));

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

      /**
       * Create a reference
       * @see https://developer.github.com/v3/git/refs/#create-a-reference
       * @param {Object} options - the object describing the ref
       * @param {Requestable.callback} [cb] - will receive the ref
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createRef',
      value: function createRef(options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/git/refs', options, cb);
      }

      /**
       * Delete a reference
       * @see https://developer.github.com/v3/git/refs/#delete-a-reference
       * @param {string} ref - the name of the ref to delte
       * @param {Requestable.callback} [cb] - will receive true if the request is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteRef',
      value: function deleteRef(ref, cb) {
         return this._request('DELETE', '/repos/' + this.__fullname + '/git/refs/' + ref, null, cb);
      }

      /**
       * Delete a repository
       * @see https://developer.github.com/v3/repos/#delete-a-repository
       * @param {Requestable.callback} [cb] - will receive true if the request is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteRepo',
      value: function deleteRepo(cb) {
         return this._request('DELETE', '/repos/' + this.__fullname, null, cb);
      }

      /**
       * List the tags on a repository
       * @see https://developer.github.com/v3/repos/#list-tags
       * @param {Requestable.callback} [cb] - will receive the tag data
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listTags',
      value: function listTags(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/tags', null, cb);
      }

      /**
       * List the open pull requests on the repository
       * @see https://developer.github.com/v3/pulls/#list-pull-requests
       * @param {Object} options - options to filter the search
       * @param {Requestable.callback} [cb] - will receive the list of PRs
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listPullRequests',
      value: function listPullRequests(options, cb) {
         options = options || {};
         return this._request('GET', '/repos/' + this.__fullname + '/pulls', options, cb);
      }

      /**
       * Get information about a specific pull request
       * @see https://developer.github.com/v3/pulls/#get-a-single-pull-request
       * @param {number} number - the PR you wish to fetch
       * @param {Requestable.callback} [cb] - will receive the PR from the API
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getPullRequest',
      value: function getPullRequest(number, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/pulls/' + number, null, cb);
      }

      /**
       * List the files of a specific pull request
       * @see https://developer.github.com/v3/pulls/#list-pull-requests-files
       * @param {number|string} number - the PR you wish to fetch
       * @param {Requestable.callback} [cb] - will receive the list of files from the API
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listPullRequestFiles',
      value: function listPullRequestFiles(number, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/pulls/' + number + '/files', null, cb);
      }

      /**
       * Compare two branches/commits/repositories
       * @see https://developer.github.com/v3/repos/commits/#compare-two-commits
       * @param {string} base - the base commit
       * @param {string} head - the head commit
       * @param {Requestable.callback} cb - will receive the comparison
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'compareBranches',
      value: function compareBranches(base, head, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/compare/' + base + '...' + head, null, cb);
      }

      /**
       * List all the branches for the repository
       * @see https://developer.github.com/v3/repos/#list-branches
       * @param {Requestable.callback} cb - will receive the list of branches
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listBranches',
      value: function listBranches(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/branches', null, cb);
      }

      /**
       * Get a raw blob from the repository
       * @see https://developer.github.com/v3/git/blobs/#get-a-blob
       * @param {string} sha - the sha of the blob to fetch
       * @param {Requestable.callback} cb - will receive the blob from the API
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getBlob',
      value: function getBlob(sha, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/git/blobs/' + sha, null, cb, 'raw');
      }

      /**
       * Get a single branch
       * @see https://developer.github.com/v3/repos/branches/#get-branch
       * @param {string} branch - the name of the branch to fetch
       * @param {Requestable.callback} cb - will receive the branch from the API
       * @returns {Promise} - the promise for the http request
       */

   }, {
      key: 'getBranch',
      value: function getBranch(branch, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/branches/' + branch, null, cb);
      }

      /**
       * Get a commit from the repository
       * @see https://developer.github.com/v3/repos/commits/#get-a-single-commit
       * @param {string} sha - the sha for the commit to fetch
       * @param {Requestable.callback} cb - will receive the commit data
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getCommit',
      value: function getCommit(sha, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/git/commits/' + sha, null, cb);
      }

      /**
       * List the commits on a repository, optionally filtering by path, author or time range
       * @see https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository
       * @param {Object} [options] - the filtering options for commits
       * @param {string} [options.sha] - the SHA or branch to start from
       * @param {string} [options.path] - the path to search on
       * @param {string} [options.author] - the commit author
       * @param {(Date|string)} [options.since] - only commits after this date will be returned
       * @param {(Date|string)} [options.until] - only commits before this date will be returned
       * @param {Requestable.callback} cb - will receive the list of commits found matching the criteria
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listCommits',
      value: function listCommits(options, cb) {
         options = options || {};

         options.since = this._dateToISO(options.since);
         options.until = this._dateToISO(options.until);

         return this._request('GET', '/repos/' + this.__fullname + '/commits', options, cb);
      }

      /**
       * Gets a single commit information for a repository
       * @see https://developer.github.com/v3/repos/commits/#get-a-single-commit
       * @param {string} ref - the reference for the commit-ish
       * @param {Requestable.callback} cb - will receive the commit information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getSingleCommit',
      value: function getSingleCommit(ref, cb) {
         ref = ref || '';
         return this._request('GET', '/repos/' + this.__fullname + '/commits/' + ref, null, cb);
      }

      /**
       * Get tha sha for a particular object in the repository. This is a convenience function
       * @see https://developer.github.com/v3/repos/contents/#get-contents
       * @param {string} [branch] - the branch to look in, or the repository's default branch if omitted
       * @param {string} path - the path of the file or directory
       * @param {Requestable.callback} cb - will receive a description of the requested object, including a `SHA` property
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getSha',
      value: function getSha(branch, path, cb) {
         branch = branch ? '?ref=' + branch : '';
         return this._request('GET', '/repos/' + this.__fullname + '/contents/' + path + branch, null, cb);
      }

      /**
       * List the commit statuses for a particular sha, branch, or tag
       * @see https://developer.github.com/v3/repos/statuses/#list-statuses-for-a-specific-ref
       * @param {string} sha - the sha, branch, or tag to get statuses for
       * @param {Requestable.callback} cb - will receive the list of statuses
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listStatuses',
      value: function listStatuses(sha, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/commits/' + sha + '/statuses', null, cb);
      }

      /**
       * Get a description of a git tree
       * @see https://developer.github.com/v3/git/trees/#get-a-tree
       * @param {string} treeSHA - the SHA of the tree to fetch
       * @param {Requestable.callback} cb - will receive the callback data
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getTree',
      value: function getTree(treeSHA, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/git/trees/' + treeSHA, null, cb);
      }

      /**
       * Create a blob
       * @see https://developer.github.com/v3/git/blobs/#create-a-blob
       * @param {(string|Buffer|Blob)} content - the content to add to the repository
       * @param {Requestable.callback} cb - will receive the details of the created blob
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createBlob',
      value: function createBlob(content, cb) {
         var postBody = this._getContentObject(content);

         log('sending content', postBody);
         return this._request('POST', '/repos/' + this.__fullname + '/git/blobs', postBody, cb);
      }

      /**
       * Get the object that represents the provided content
       * @param {string|Buffer|Blob} content - the content to send to the server
       * @return {Object} the representation of `content` for the GitHub API
       */

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

      /**
       * Update a tree in Git
       * @see https://developer.github.com/v3/git/trees/#create-a-tree
       * @param {string} baseTreeSHA - the SHA of the tree to update
       * @param {string} path - the path for the new file
       * @param {string} blobSHA - the SHA for the blob to put at `path`
       * @param {Requestable.callback} cb - will receive the new tree that is created
       * @return {Promise} - the promise for the http request
       * @deprecated use {@link Repository#createTree} instead
       */

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

      /**
       * Create a new tree in git
       * @see https://developer.github.com/v3/git/trees/#create-a-tree
       * @param {Object} tree - the tree to create
       * @param {string} baseSHA - the root sha of the tree
       * @param {Requestable.callback} cb - will receive the new tree that is created
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createTree',
      value: function createTree(tree, baseSHA, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/git/trees', {
            tree: tree,
            base_tree: baseSHA // eslint-disable-line camelcase
         }, cb);
      }

      /**
       * Add a commit to the repository
       * @see https://developer.github.com/v3/git/commits/#create-a-commit
       * @param {string} parent - the SHA of the parent commit
       * @param {string} tree - the SHA of the tree for this commit
       * @param {string} message - the commit message
       * @param {Object} [options] - commit options
       * @param {Object} [options.author] - the author of the commit
       * @param {Object} [options.commiter] - the committer
       * @param {Requestable.callback} cb - will receive the commit that is created
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'commit',
      value: function commit(parent, tree, message, options, cb) {
         var _this2 = this;

         if (typeof options === 'function') {
            cb = options;
            options = {};
         }

         var data = {
            message: message,
            tree: tree,
            parents: [parent]
         };

         data = Object.assign({}, options, data);

         return this._request('POST', '/repos/' + this.__fullname + '/git/commits', data, cb).then(function (response) {
            _this2.__currentTree.sha = response.data.sha; // Update latest commit
            return response;
         });
      }

      /**
       * Update a ref
       * @see https://developer.github.com/v3/git/refs/#update-a-reference
       * @param {string} ref - the ref to update
       * @param {string} commitSHA - the SHA to point the reference to
       * @param {boolean} force - indicates whether to force or ensure a fast-forward update
       * @param {Requestable.callback} cb - will receive the updated ref back
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateHead',
      value: function updateHead(ref, commitSHA, force, cb) {
         return this._request('PATCH', '/repos/' + this.__fullname + '/git/refs/' + ref, {
            sha: commitSHA,
            force: force
         }, cb);
      }

      /**
       * Update commit status
       * @see https://developer.github.com/v3/repos/statuses/
       * @param {string} commitSHA - the SHA of the commit that should be updated
       * @param {object} options - Commit status parameters
       * @param {string} options.state - The state of the status. Can be one of: pending, success, error, or failure.
       * @param {string} [options.target_url] - The target URL to associate with this status.
       * @param {string} [options.description] - A short description of the status.
       * @param {string} [options.context] - A string label to differentiate this status among CI systems.
       * @param {Requestable.callback} cb - will receive the updated commit back
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateStatus',
      value: function updateStatus(commitSHA, options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/statuses/' + commitSHA, options, cb);
      }

      /**
       * Update repository information
       * @see https://developer.github.com/v3/repos/#edit
       * @param {object} options - New parameters that will be set to the repository
       * @param {string} options.name - Name of the repository
       * @param {string} [options.description] - A short description of the repository
       * @param {string} [options.homepage] - A URL with more information about the repository
       * @param {boolean} [options.private] - Either true to make the repository private, or false to make it public.
       * @param {boolean} [options.has_issues] - Either true to enable issues for this repository, false to disable them.
       * @param {boolean} [options.has_wiki] - Either true to enable the wiki for this repository, false to disable it.
       * @param {boolean} [options.has_downloads] - Either true to enable downloads, false to disable them.
       * @param {string} [options.default_branch] - Updates the default branch for this repository.
       * @param {Requestable.callback} cb - will receive the updated repository back
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateRepository',
      value: function updateRepository(options, cb) {
         return this._request('PATCH', '/repos/' + this.__fullname, options, cb);
      }

      /**
        * Get information about the repository
        * @see https://developer.github.com/v3/repos/#get
        * @param {Requestable.callback} cb - will receive the information about the repository
        * @return {Promise} - the promise for the http request
        */

   }, {
      key: 'getDetails',
      value: function getDetails(cb) {
         return this._request('GET', '/repos/' + this.__fullname, null, cb);
      }

      /**
       * List the contributors to the repository
       * @see https://developer.github.com/v3/repos/#list-contributors
       * @param {Requestable.callback} cb - will receive the list of contributors
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getContributors',
      value: function getContributors(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/contributors', null, cb);
      }

      /**
       * List the contributor stats to the repository
       * @see https://developer.github.com/v3/repos/#list-contributors
       * @param {Requestable.callback} cb - will receive the list of contributors
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getContributorStats',
      value: function getContributorStats(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/stats/contributors', null, cb);
      }

      /**
       * List the users who are collaborators on the repository. The currently authenticated user must have
       * push access to use this method
       * @see https://developer.github.com/v3/repos/collaborators/#list-collaborators
       * @param {Requestable.callback} cb - will receive the list of collaborators
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getCollaborators',
      value: function getCollaborators(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/collaborators', null, cb);
      }

      /**
       * Check if a user is a collaborator on the repository
       * @see https://developer.github.com/v3/repos/collaborators/#check-if-a-user-is-a-collaborator
       * @param {string} username - the user to check
       * @param {Requestable.callback} cb - will receive true if the user is a collaborator and false if they are not
       * @return {Promise} - the promise for the http request {Boolean} [description]
       */

   }, {
      key: 'isCollaborator',
      value: function isCollaborator(username, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/collaborators/' + username, null, cb);
      }

      /**
       * Get the contents of a repository
       * @see https://developer.github.com/v3/repos/contents/#get-contents
       * @param {string} ref - the ref to check
       * @param {string} path - the path containing the content to fetch
       * @param {boolean} raw - `true` if the results should be returned raw instead of GitHub's normalized format
       * @param {Requestable.callback} cb - will receive the fetched data
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getContents',
      value: function getContents(ref, path, raw, cb) {
         path = path ? '' + encodeURI(path) : '';
         return this._request('GET', '/repos/' + this.__fullname + '/contents/' + path, {
            ref: ref
         }, cb, raw);
      }

      /**
       * Get the README of a repository
       * @see https://developer.github.com/v3/repos/contents/#get-the-readme
       * @param {string} ref - the ref to check
       * @param {boolean} raw - `true` if the results should be returned raw instead of GitHub's normalized format
       * @param {Requestable.callback} cb - will receive the fetched data
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getReadme',
      value: function getReadme(ref, raw, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/readme', {
            ref: ref
         }, cb, raw);
      }

      /**
       * Fork a repository
       * @see https://developer.github.com/v3/repos/forks/#create-a-fork
       * @param {Requestable.callback} cb - will receive the information about the newly created fork
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'fork',
      value: function fork(cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/forks', null, cb);
      }

      /**
       * List a repository's forks
       * @see https://developer.github.com/v3/repos/forks/#list-forks
       * @param {Requestable.callback} cb - will receive the list of repositories forked from this one
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listForks',
      value: function listForks(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/forks', null, cb);
      }

      /**
       * Create a new branch from an existing branch.
       * @param {string} [oldBranch=master] - the name of the existing branch
       * @param {string} newBranch - the name of the new branch
       * @param {Requestable.callback} cb - will receive the commit data for the head of the new branch
       * @return {Promise} - the promise for the http request
       */

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

      /**
       * Create a new pull request
       * @see https://developer.github.com/v3/pulls/#create-a-pull-request
       * @param {Object} options - the pull request description
       * @param {Requestable.callback} cb - will receive the new pull request
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createPullRequest',
      value: function createPullRequest(options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/pulls', options, cb);
      }

      /**
       * Update a pull request
       * @see https://developer.github.com/v3/pulls/#update-a-pull-request
       * @param {number|string} number - the number of the pull request to update
       * @param {Object} options - the pull request description
       * @param {Requestable.callback} [cb] - will receive the pull request information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updatePullRequest',
      value: function updatePullRequest(number, options, cb) {
         return this._request('PATCH', '/repos/' + this.__fullname + '/pulls/' + number, options, cb);
      }

      /**
       * List the hooks for the repository
       * @see https://developer.github.com/v3/repos/hooks/#list-hooks
       * @param {Requestable.callback} cb - will receive the list of hooks
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listHooks',
      value: function listHooks(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/hooks', null, cb);
      }

      /**
       * Get a hook for the repository
       * @see https://developer.github.com/v3/repos/hooks/#get-single-hook
       * @param {number} id - the id of the webook
       * @param {Requestable.callback} cb - will receive the details of the webook
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getHook',
      value: function getHook(id, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/hooks/' + id, null, cb);
      }

      /**
       * Add a new hook to the repository
       * @see https://developer.github.com/v3/repos/hooks/#create-a-hook
       * @param {Object} options - the configuration describing the new hook
       * @param {Requestable.callback} cb - will receive the new webhook
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createHook',
      value: function createHook(options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/hooks', options, cb);
      }

      /**
       * Edit an existing webhook
       * @see https://developer.github.com/v3/repos/hooks/#edit-a-hook
       * @param {number} id - the id of the webhook
       * @param {Object} options - the new description of the webhook
       * @param {Requestable.callback} cb - will receive the updated webhook
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateHook',
      value: function updateHook(id, options, cb) {
         return this._request('PATCH', '/repos/' + this.__fullname + '/hooks/' + id, options, cb);
      }

      /**
       * Delete a webhook
       * @see https://developer.github.com/v3/repos/hooks/#delete-a-hook
       * @param {number} id - the id of the webhook to be deleted
       * @param {Requestable.callback} cb - will receive true if the call is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteHook',
      value: function deleteHook(id, cb) {
         return this._request('DELETE', '/repos/' + this.__fullname + '/hooks/' + id, null, cb);
      }

      /**
       * List the deploy keys for the repository
       * @see https://developer.github.com/v3/repos/keys/#list-deploy-keys
       * @param {Requestable.callback} cb - will receive the list of deploy keys
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listKeys',
      value: function listKeys(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/keys', null, cb);
      }

      /**
       * Get a deploy key for the repository
       * @see https://developer.github.com/v3/repos/keys/#get-a-deploy-key
       * @param {number} id - the id of the deploy key
       * @param {Requestable.callback} cb - will receive the details of the deploy key
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getKey',
      value: function getKey(id, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/keys/' + id, null, cb);
      }

      /**
       * Add a new deploy key to the repository
       * @see https://developer.github.com/v3/repos/keys/#add-a-new-deploy-key
       * @param {Object} options - the configuration describing the new deploy key
       * @param {Requestable.callback} cb - will receive the new deploy key
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createKey',
      value: function createKey(options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/keys', options, cb);
      }

      /**
       * Delete a deploy key
       * @see https://developer.github.com/v3/repos/keys/#remove-a-deploy-key
       * @param {number} id - the id of the deploy key to be deleted
       * @param {Requestable.callback} cb - will receive true if the call is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteKey',
      value: function deleteKey(id, cb) {
         return this._request('DELETE', '/repos/' + this.__fullname + '/keys/' + id, null, cb);
      }

      /**
       * Delete a file from a branch
       * @see https://developer.github.com/v3/repos/contents/#delete-a-file
       * @param {string} branch - the branch to delete from, or the default branch if not specified
       * @param {string} path - the path of the file to remove
       * @param {Requestable.callback} cb - will receive the commit in which the delete occurred
       * @return {Promise} - the promise for the http request
       */

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

      /**
       * Change all references in a repo from oldPath to new_path
       * @param {string} branch - the branch to carry out the reference change, or the default branch if not specified
       * @param {string} oldPath - original path
       * @param {string} newPath - new reference path
       * @param {Requestable.callback} cb - will receive the commit in which the move occurred
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'move',
      value: function move(branch, oldPath, newPath, cb) {
         var _this5 = this;

         var oldSha = void 0;
         return this.getRef('heads/' + branch).then(function (_ref) {
            var object = _ref.data.object;
            return _this5.getTree(object.sha + '?recursive=true');
         }).then(function (_ref2) {
            var _ref2$data = _ref2.data,
                tree = _ref2$data.tree,
                sha = _ref2$data.sha;

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

      /**
       * Write a file to the repository
       * @see https://developer.github.com/v3/repos/contents/#update-a-file
       * @param {string} branch - the name of the branch
       * @param {string} path - the path for the file
       * @param {string} content - the contents of the file
       * @param {string} message - the commit message
       * @param {Object} [options] - commit options
       * @param {Object} [options.author] - the author of the commit
       * @param {Object} [options.commiter] - the committer
       * @param {boolean} [options.encode] - true if the content should be base64 encoded
       * @param {Requestable.callback} cb - will receive the new commit
       * @return {Promise} - the promise for the http request
       */

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

      /**
       * Check if a repository is starred by you
       * @see https://developer.github.com/v3/activity/starring/#check-if-you-are-starring-a-repository
       * @param {Requestable.callback} cb - will receive true if the repository is starred and false if the repository
       *                                  is not starred
       * @return {Promise} - the promise for the http request {Boolean} [description]
       */

   }, {
      key: 'isStarred',
      value: function isStarred(cb) {
         return this._request204or404('/user/starred/' + this.__fullname, null, cb);
      }

      /**
       * Star a repository
       * @see https://developer.github.com/v3/activity/starring/#star-a-repository
       * @param {Requestable.callback} cb - will receive true if the repository is starred
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'star',
      value: function star(cb) {
         return this._request('PUT', '/user/starred/' + this.__fullname, null, cb);
      }

      /**
       * Unstar a repository
       * @see https://developer.github.com/v3/activity/starring/#unstar-a-repository
       * @param {Requestable.callback} cb - will receive true if the repository is unstarred
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'unstar',
      value: function unstar(cb) {
         return this._request('DELETE', '/user/starred/' + this.__fullname, null, cb);
      }

      /**
       * Create a new release
       * @see https://developer.github.com/v3/repos/releases/#create-a-release
       * @param {Object} options - the description of the release
       * @param {Requestable.callback} cb - will receive the newly created release
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createRelease',
      value: function createRelease(options, cb) {
         return this._request('POST', '/repos/' + this.__fullname + '/releases', options, cb);
      }

      /**
       * Edit a release
       * @see https://developer.github.com/v3/repos/releases/#edit-a-release
       * @param {string} id - the id of the release
       * @param {Object} options - the description of the release
       * @param {Requestable.callback} cb - will receive the modified release
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'updateRelease',
      value: function updateRelease(id, options, cb) {
         return this._request('PATCH', '/repos/' + this.__fullname + '/releases/' + id, options, cb);
      }

      /**
       * Get information about all releases
       * @see https://developer.github.com/v3/repos/releases/#list-releases-for-a-repository
       * @param {Requestable.callback} cb - will receive the release information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listReleases',
      value: function listReleases(cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/releases', null, cb);
      }

      /**
       * Get information about a release
       * @see https://developer.github.com/v3/repos/releases/#get-a-single-release
       * @param {string} id - the id of the release
       * @param {Requestable.callback} cb - will receive the release information
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'getRelease',
      value: function getRelease(id, cb) {
         return this._request('GET', '/repos/' + this.__fullname + '/releases/' + id, null, cb);
      }

      /**
       * Delete a release
       * @see https://developer.github.com/v3/repos/releases/#delete-a-release
       * @param {string} id - the release to be deleted
       * @param {Requestable.callback} cb - will receive true if the operation is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'deleteRelease',
      value: function deleteRelease(id, cb) {
         return this._request('DELETE', '/repos/' + this.__fullname + '/releases/' + id, null, cb);
      }

      /**
       * Merge a pull request
       * @see https://developer.github.com/v3/pulls/#merge-a-pull-request-merge-button
       * @param {number|string} number - the number of the pull request to merge
       * @param {Object} options - the merge options for the pull request
       * @param {Requestable.callback} [cb] - will receive the merge information if the operation is successful
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'mergePullRequest',
      value: function mergePullRequest(number, options, cb) {
         return this._request('PUT', '/repos/' + this.__fullname + '/pulls/' + number + '/merge', options, cb);
      }

      /**
       * Get information about all projects
       * @see https://developer.github.com/v3/projects/#list-repository-projects
       * @param {Requestable.callback} [cb] - will receive the list of projects
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'listProjects',
      value: function listProjects(cb) {
         return this._requestAllPages('/repos/' + this.__fullname + '/projects', { AcceptHeader: 'inertia-preview' }, cb);
      }

      /**
       * Create a new project
       * @see https://developer.github.com/v3/projects/#create-a-repository-project
       * @param {Object} options - the description of the project
       * @param {Requestable.callback} cb - will receive the newly created project
       * @return {Promise} - the promise for the http request
       */

   }, {
      key: 'createProject',
      value: function createProject(options, cb) {
         options = options || {};
         options.AcceptHeader = 'inertia-preview';
         return this._request('POST', '/repos/' + this.__fullname + '/projects', options, cb);
      }
   }]);

   return Repository;
}(_Requestable3.default);

module.exports = Repository;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcG9zaXRvcnkuanMiXSwibmFtZXMiOlsibG9nIiwiUmVwb3NpdG9yeSIsImZ1bGxuYW1lIiwiYXV0aCIsImFwaUJhc2UiLCJfX2Z1bGxuYW1lIiwiX19jdXJyZW50VHJlZSIsImJyYW5jaCIsInNoYSIsInJlZiIsImNiIiwiX3JlcXVlc3QiLCJvcHRpb25zIiwibnVtYmVyIiwiYmFzZSIsImhlYWQiLCJzaW5jZSIsIl9kYXRlVG9JU08iLCJ1bnRpbCIsInBhdGgiLCJ0cmVlU0hBIiwiY29udGVudCIsInBvc3RCb2R5IiwiX2dldENvbnRlbnRPYmplY3QiLCJVdGY4IiwiZW5jb2RlIiwiZW5jb2RpbmciLCJCdWZmZXIiLCJ0b1N0cmluZyIsIkJsb2IiLCJCYXNlNjQiLCJKU09OIiwic3RyaW5naWZ5IiwiRXJyb3IiLCJiYXNlVHJlZVNIQSIsImJsb2JTSEEiLCJuZXdUcmVlIiwiYmFzZV90cmVlIiwidHJlZSIsIm1vZGUiLCJ0eXBlIiwiYmFzZVNIQSIsInBhcmVudCIsIm1lc3NhZ2UiLCJkYXRhIiwicGFyZW50cyIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJyZXNwb25zZSIsImNvbW1pdFNIQSIsImZvcmNlIiwidXNlcm5hbWUiLCJyYXciLCJlbmNvZGVVUkkiLCJvbGRCcmFuY2giLCJuZXdCcmFuY2giLCJnZXRSZWYiLCJvYmplY3QiLCJjcmVhdGVSZWYiLCJpZCIsImdldFNoYSIsImRlbGV0ZUNvbW1pdCIsIm9sZFBhdGgiLCJuZXdQYXRoIiwib2xkU2hhIiwiZ2V0VHJlZSIsIm1hcCIsImNyZWF0ZVRyZWUiLCJjb21taXQiLCJ1cGRhdGVIZWFkIiwiZmlsZVBhdGgiLCJzaG91bGRFbmNvZGUiLCJhdXRob3IiLCJjb21taXR0ZXIiLCJfcmVxdWVzdDIwNG9yNDA0IiwiX3JlcXVlc3RBbGxQYWdlcyIsIkFjY2VwdEhlYWRlciIsIlJlcXVlc3RhYmxlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBT0E7Ozs7QUFDQTs7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Q0Y7O0FBRUQ7Ozs7Ozs7Ozs7b0NBT2NFLE8sRUFBU0YsRSxFQUFJO0FBQ3hCRSxtQkFBVUEsV0FBVyxFQUFyQjtBQUNBQSxpQkFBUWlFLFlBQVIsR0FBdUIsaUJBQXZCO0FBQ0EsZ0JBQU8sS0FBS2xFLFFBQUwsQ0FBYyxNQUFkLGNBQWdDLEtBQUtOLFVBQXJDLGdCQUE0RE8sT0FBNUQsRUFBcUVGLEVBQXJFLENBQVA7QUFDRjs7OztFQWoxQnFCb0UscUI7O0FBcTFCekJDLE9BQU9DLE9BQVAsR0FBaUIvRSxVQUFqQiIsImZpbGUiOiJSZXBvc2l0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XG5pbXBvcnQgVXRmOCBmcm9tICd1dGY4JztcbmltcG9ydCB7XG4gICBCYXNlNjQsXG59IGZyb20gJ2pzLWJhc2U2NCc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuY29uc3QgbG9nID0gZGVidWcoJ2dpdGh1YjpyZXBvc2l0b3J5Jyk7XG5cbi8qKlxuICogUmVwb3NpdG9yeSBlbmNhcHN1bGF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gY3JlYXRlLCBxdWVyeSwgYW5kIG1vZGlmeSBmaWxlcy5cbiAqL1xuY2xhc3MgUmVwb3NpdG9yeSBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgUmVwb3NpdG9yeS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBmdWxsbmFtZSAtIHRoZSBmdWxsIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IoZnVsbG5hbWUsIGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgICAgdGhpcy5fX2Z1bGxuYW1lID0gZnVsbG5hbWU7XG4gICAgICB0aGlzLl9fY3VycmVudFRyZWUgPSB7XG4gICAgICAgICBicmFuY2g6IG51bGwsXG4gICAgICAgICBzaGE6IG51bGwsXG4gICAgICB9O1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhIHJlZmVyZW5jZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9yZWZzLyNnZXQtYS1yZWZlcmVuY2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgcmVmZXJlbmNlIHRvIGdldFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVmZXJlbmNlJ3MgcmVmU3BlYyBvciBhIGxpc3Qgb2YgcmVmU3BlY3MgdGhhdCBtYXRjaCBgcmVmYFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRSZWYocmVmLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9yZWZzLyR7cmVmfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSByZWZlcmVuY2VcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvcmVmcy8jY3JlYXRlLWEtcmVmZXJlbmNlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBvYmplY3QgZGVzY3JpYmluZyB0aGUgcmVmXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZWZcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlUmVmKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9yZWZzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIHJlZmVyZW5jZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9yZWZzLyNkZWxldGUtYS1yZWZlcmVuY2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgbmFtZSBvZiB0aGUgcmVmIHRvIGRlbHRlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3QgaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVSZWYocmVmLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9yZWZzLyR7cmVmfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBEZWxldGUgYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2RlbGV0ZS1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZVJlcG8oY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSB0YWdzIG9uIGEgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNsaXN0LXRhZ3NcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHRhZyBkYXRhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RUYWdzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vdGFnc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBvcGVuIHB1bGwgcmVxdWVzdHMgb24gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wdWxscy8jbGlzdC1wdWxsLXJlcXVlc3RzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgdG8gZmlsdGVyIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgUFJzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RQdWxsUmVxdWVzdHMob3B0aW9ucywgY2IpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3B1bGxzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCBhIHNwZWNpZmljIHB1bGwgcmVxdWVzdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3B1bGxzLyNnZXQtYS1zaW5nbGUtcHVsbC1yZXF1ZXN0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gdGhlIFBSIHlvdSB3aXNoIHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBQUiBmcm9tIHRoZSBBUElcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0UHVsbFJlcXVlc3QobnVtYmVyLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3B1bGxzLyR7bnVtYmVyfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBmaWxlcyBvZiBhIHNwZWNpZmljIHB1bGwgcmVxdWVzdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3B1bGxzLyNsaXN0LXB1bGwtcmVxdWVzdHMtZmlsZXNcbiAgICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbnVtYmVyIC0gdGhlIFBSIHlvdSB3aXNoIHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGZpbGVzIGZyb20gdGhlIEFQSVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0UHVsbFJlcXVlc3RGaWxlcyhudW1iZXIsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHVsbHMvJHtudW1iZXJ9L2ZpbGVzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENvbXBhcmUgdHdvIGJyYW5jaGVzL2NvbW1pdHMvcmVwb3NpdG9yaWVzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29tbWl0cy8jY29tcGFyZS10d28tY29tbWl0c1xuICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2UgLSB0aGUgYmFzZSBjb21taXRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkIC0gdGhlIGhlYWQgY29tbWl0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tcGFyaXNvblxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjb21wYXJlQnJhbmNoZXMoYmFzZSwgaGVhZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb21wYXJlLyR7YmFzZX0uLi4ke2hlYWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgYWxsIHRoZSBicmFuY2hlcyBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jbGlzdC1icmFuY2hlc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgYnJhbmNoZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdEJyYW5jaGVzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vYnJhbmNoZXNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgcmF3IGJsb2IgZnJvbSB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9ibG9icy8jZ2V0LWEtYmxvYlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNoYSAtIHRoZSBzaGEgb2YgdGhlIGJsb2IgdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBibG9iIGZyb20gdGhlIEFQSVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRCbG9iKHNoYSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvYmxvYnMvJHtzaGF9YCwgbnVsbCwgY2IsICdyYXcnKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBzaW5nbGUgYnJhbmNoXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvYnJhbmNoZXMvI2dldC1icmFuY2hcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBicmFuY2ggLSB0aGUgbmFtZSBvZiB0aGUgYnJhbmNoIHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgYnJhbmNoIGZyb20gdGhlIEFQSVxuICAgICogQHJldHVybnMge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0QnJhbmNoKGJyYW5jaCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9icmFuY2hlcy8ke2JyYW5jaH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgY29tbWl0IGZyb20gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb21taXRzLyNnZXQtYS1zaW5nbGUtY29tbWl0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhIC0gdGhlIHNoYSBmb3IgdGhlIGNvbW1pdCB0byBmZXRjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1pdCBkYXRhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldENvbW1pdChzaGEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L2NvbW1pdHMvJHtzaGF9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGNvbW1pdHMgb24gYSByZXBvc2l0b3J5LCBvcHRpb25hbGx5IGZpbHRlcmluZyBieSBwYXRoLCBhdXRob3Igb3IgdGltZSByYW5nZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbW1pdHMvI2xpc3QtY29tbWl0cy1vbi1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgZmlsdGVyaW5nIG9wdGlvbnMgZm9yIGNvbW1pdHNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5zaGFdIC0gdGhlIFNIQSBvciBicmFuY2ggdG8gc3RhcnQgZnJvbVxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBhdGhdIC0gdGhlIHBhdGggdG8gc2VhcmNoIG9uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuYXV0aG9yXSAtIHRoZSBjb21taXQgYXV0aG9yXG4gICAgKiBAcGFyYW0geyhEYXRlfHN0cmluZyl9IFtvcHRpb25zLnNpbmNlXSAtIG9ubHkgY29tbWl0cyBhZnRlciB0aGlzIGRhdGUgd2lsbCBiZSByZXR1cm5lZFxuICAgICogQHBhcmFtIHsoRGF0ZXxzdHJpbmcpfSBbb3B0aW9ucy51bnRpbF0gLSBvbmx5IGNvbW1pdHMgYmVmb3JlIHRoaXMgZGF0ZSB3aWxsIGJlIHJldHVybmVkXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBjb21taXRzIGZvdW5kIG1hdGNoaW5nIHRoZSBjcml0ZXJpYVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0Q29tbWl0cyhvcHRpb25zLCBjYikge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIG9wdGlvbnMuc2luY2UgPSB0aGlzLl9kYXRlVG9JU08ob3B0aW9ucy5zaW5jZSk7XG4gICAgICBvcHRpb25zLnVudGlsID0gdGhpcy5fZGF0ZVRvSVNPKG9wdGlvbnMudW50aWwpO1xuXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29tbWl0c2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBzaW5nbGUgY29tbWl0IGluZm9ybWF0aW9uIGZvciBhIHJlcG9zaXRvcnlcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29tbWl0cy8jZ2V0LWEtc2luZ2xlLWNvbW1pdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgcmVmZXJlbmNlIGZvciB0aGUgY29tbWl0LWlzaFxuICAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb21taXQgaW5mb3JtYXRpb25cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgICovXG4gICBnZXRTaW5nbGVDb21taXQocmVmLCBjYikge1xuICAgICAgcmVmID0gcmVmIHx8ICcnO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbW1pdHMvJHtyZWZ9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCB0aGEgc2hhIGZvciBhIHBhcnRpY3VsYXIgb2JqZWN0IGluIHRoZSByZXBvc2l0b3J5LiBUaGlzIGlzIGEgY29udmVuaWVuY2UgZnVuY3Rpb25cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb250ZW50cy8jZ2V0LWNvbnRlbnRzXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2JyYW5jaF0gLSB0aGUgYnJhbmNoIHRvIGxvb2sgaW4sIG9yIHRoZSByZXBvc2l0b3J5J3MgZGVmYXVsdCBicmFuY2ggaWYgb21pdHRlZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBvZiB0aGUgZmlsZSBvciBkaXJlY3RvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIGEgZGVzY3JpcHRpb24gb2YgdGhlIHJlcXVlc3RlZCBvYmplY3QsIGluY2x1ZGluZyBhIGBTSEFgIHByb3BlcnR5XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFNoYShicmFuY2gsIHBhdGgsIGNiKSB7XG4gICAgICBicmFuY2ggPSBicmFuY2ggPyBgP3JlZj0ke2JyYW5jaH1gIDogJyc7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29udGVudHMvJHtwYXRofSR7YnJhbmNofWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBjb21taXQgc3RhdHVzZXMgZm9yIGEgcGFydGljdWxhciBzaGEsIGJyYW5jaCwgb3IgdGFnXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3Mvc3RhdHVzZXMvI2xpc3Qtc3RhdHVzZXMtZm9yLWEtc3BlY2lmaWMtcmVmXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhIC0gdGhlIHNoYSwgYnJhbmNoLCBvciB0YWcgdG8gZ2V0IHN0YXR1c2VzIGZvclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2Ygc3RhdHVzZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdFN0YXR1c2VzKHNoYSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb21taXRzLyR7c2hhfS9zdGF0dXNlc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBkZXNjcmlwdGlvbiBvZiBhIGdpdCB0cmVlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3RyZWVzLyNnZXQtYS10cmVlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdHJlZVNIQSAtIHRoZSBTSEEgb2YgdGhlIHRyZWUgdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjYWxsYmFjayBkYXRhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFRyZWUodHJlZVNIQSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvdHJlZXMvJHt0cmVlU0hBfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBibG9iXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L2Jsb2JzLyNjcmVhdGUtYS1ibG9iXG4gICAgKiBAcGFyYW0geyhzdHJpbmd8QnVmZmVyfEJsb2IpfSBjb250ZW50IC0gdGhlIGNvbnRlbnQgdG8gYWRkIHRvIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgZGV0YWlscyBvZiB0aGUgY3JlYXRlZCBibG9iXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZUJsb2IoY29udGVudCwgY2IpIHtcbiAgICAgIGxldCBwb3N0Qm9keSA9IHRoaXMuX2dldENvbnRlbnRPYmplY3QoY29udGVudCk7XG5cbiAgICAgIGxvZygnc2VuZGluZyBjb250ZW50JywgcG9zdEJvZHkpO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvYmxvYnNgLCBwb3N0Qm9keSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCB0aGUgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgcHJvdmlkZWQgY29udGVudFxuICAgICogQHBhcmFtIHtzdHJpbmd8QnVmZmVyfEJsb2J9IGNvbnRlbnQgLSB0aGUgY29udGVudCB0byBzZW5kIHRvIHRoZSBzZXJ2ZXJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIHJlcHJlc2VudGF0aW9uIG9mIGBjb250ZW50YCBmb3IgdGhlIEdpdEh1YiBBUElcbiAgICAqL1xuICAgX2dldENvbnRlbnRPYmplY3QoY29udGVudCkge1xuICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgbG9nKCdjb250ZXQgaXMgYSBzdHJpbmcnKTtcbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250ZW50OiBVdGY4LmVuY29kZShjb250ZW50KSxcbiAgICAgICAgICAgIGVuY29kaW5nOiAndXRmLTgnLFxuICAgICAgICAgfTtcblxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZW50IGluc3RhbmNlb2YgQnVmZmVyKSB7XG4gICAgICAgICBsb2coJ1dlIGFwcGVhciB0byBiZSBpbiBOb2RlJyk7XG4gICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29udGVudDogY29udGVudC50b1N0cmluZygnYmFzZTY0JyksXG4gICAgICAgICAgICBlbmNvZGluZzogJ2Jhc2U2NCcsXG4gICAgICAgICB9O1xuXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZW50IGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgbG9nKCdXZSBhcHBlYXIgdG8gYmUgaW4gdGhlIGJyb3dzZXInKTtcbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250ZW50OiBCYXNlNjQuZW5jb2RlKGNvbnRlbnQpLFxuICAgICAgICAgICAgZW5jb2Rpbmc6ICdiYXNlNjQnLFxuICAgICAgICAgfTtcblxuICAgICAgfSBlbHNlIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgbG9nKGBOb3Qgc3VyZSB3aGF0IHRoaXMgY29udGVudCBpczogJHt0eXBlb2YgY29udGVudH0sICR7SlNPTi5zdHJpbmdpZnkoY29udGVudCl9YCk7XG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gY29udGVudCBwYXNzZWQgdG8gcG9zdEJsb2IuIE11c3QgYmUgc3RyaW5nIG9yIEJ1ZmZlciAobm9kZSkgb3IgQmxvYiAod2ViKScpO1xuICAgICAgfVxuICAgfVxuXG4gICAvKipcbiAgICAqIFVwZGF0ZSBhIHRyZWUgaW4gR2l0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3RyZWVzLyNjcmVhdGUtYS10cmVlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVRyZWVTSEEgLSB0aGUgU0hBIG9mIHRoZSB0cmVlIHRvIHVwZGF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBmb3IgdGhlIG5ldyBmaWxlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmxvYlNIQSAtIHRoZSBTSEEgZm9yIHRoZSBibG9iIHRvIHB1dCBhdCBgcGF0aGBcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgdHJlZSB0aGF0IGlzIGNyZWF0ZWRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgUmVwb3NpdG9yeSNjcmVhdGVUcmVlfSBpbnN0ZWFkXG4gICAgKi9cbiAgIHVwZGF0ZVRyZWUoYmFzZVRyZWVTSEEsIHBhdGgsIGJsb2JTSEEsIGNiKSB7XG4gICAgICBsZXQgbmV3VHJlZSA9IHtcbiAgICAgICAgIGJhc2VfdHJlZTogYmFzZVRyZWVTSEEsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgIHRyZWU6IFt7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgc2hhOiBibG9iU0hBLFxuICAgICAgICAgICAgbW9kZTogJzEwMDY0NCcsXG4gICAgICAgICAgICB0eXBlOiAnYmxvYicsXG4gICAgICAgICB9XSxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3RyZWVzYCwgbmV3VHJlZSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyB0cmVlIGluIGdpdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC90cmVlcy8jY3JlYXRlLWEtdHJlZVxuICAgICogQHBhcmFtIHtPYmplY3R9IHRyZWUgLSB0aGUgdHJlZSB0byBjcmVhdGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlU0hBIC0gdGhlIHJvb3Qgc2hhIG9mIHRoZSB0cmVlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3IHRyZWUgdGhhdCBpcyBjcmVhdGVkXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZVRyZWUodHJlZSwgYmFzZVNIQSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3RyZWVzYCwge1xuICAgICAgICAgdHJlZSxcbiAgICAgICAgIGJhc2VfdHJlZTogYmFzZVNIQSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgICAgIH0sIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBBZGQgYSBjb21taXQgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvY29tbWl0cy8jY3JlYXRlLWEtY29tbWl0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50IC0gdGhlIFNIQSBvZiB0aGUgcGFyZW50IGNvbW1pdFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHRyZWUgLSB0aGUgU0hBIG9mIHRoZSB0cmVlIGZvciB0aGlzIGNvbW1pdFxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgY29tbWl0IG1lc3NhZ2VcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBjb21taXQgb3B0aW9uc1xuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmF1dGhvcl0gLSB0aGUgYXV0aG9yIG9mIHRoZSBjb21taXRcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5jb21taXRlcl0gLSB0aGUgY29tbWl0dGVyXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWl0IHRoYXQgaXMgY3JlYXRlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjb21taXQocGFyZW50LCB0cmVlLCBtZXNzYWdlLCBvcHRpb25zLCBjYikge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICBjYiA9IG9wdGlvbnM7XG4gICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG5cbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgIHRyZWUsXG4gICAgICAgICBwYXJlbnRzOiBbcGFyZW50XSxcbiAgICAgIH07XG5cbiAgICAgIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCBkYXRhKTtcblxuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvY29tbWl0c2AsIGRhdGEsIGNiKVxuICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9fY3VycmVudFRyZWUuc2hhID0gcmVzcG9uc2UuZGF0YS5zaGE7IC8vIFVwZGF0ZSBsYXRlc3QgY29tbWl0XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBVcGRhdGUgYSByZWZcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvcmVmcy8jdXBkYXRlLWEtcmVmZXJlbmNlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmIC0gdGhlIHJlZiB0byB1cGRhdGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21taXRTSEEgLSB0aGUgU0hBIHRvIHBvaW50IHRoZSByZWZlcmVuY2UgdG9cbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yY2UgLSBpbmRpY2F0ZXMgd2hldGhlciB0byBmb3JjZSBvciBlbnN1cmUgYSBmYXN0LWZvcndhcmQgdXBkYXRlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgdXBkYXRlZCByZWYgYmFja1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1cGRhdGVIZWFkKHJlZiwgY29tbWl0U0hBLCBmb3JjZSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9yZWZzLyR7cmVmfWAsIHtcbiAgICAgICAgIHNoYTogY29tbWl0U0hBLFxuICAgICAgICAgZm9yY2U6IGZvcmNlLFxuICAgICAgfSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFVwZGF0ZSBjb21taXQgc3RhdHVzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3Mvc3RhdHVzZXMvXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWl0U0hBIC0gdGhlIFNIQSBvZiB0aGUgY29tbWl0IHRoYXQgc2hvdWxkIGJlIHVwZGF0ZWRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gQ29tbWl0IHN0YXR1cyBwYXJhbWV0ZXJzXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5zdGF0ZSAtIFRoZSBzdGF0ZSBvZiB0aGUgc3RhdHVzLiBDYW4gYmUgb25lIG9mOiBwZW5kaW5nLCBzdWNjZXNzLCBlcnJvciwgb3IgZmFpbHVyZS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50YXJnZXRfdXJsXSAtIFRoZSB0YXJnZXQgVVJMIHRvIGFzc29jaWF0ZSB3aXRoIHRoaXMgc3RhdHVzLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmRlc2NyaXB0aW9uXSAtIEEgc2hvcnQgZGVzY3JpcHRpb24gb2YgdGhlIHN0YXR1cy5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5jb250ZXh0XSAtIEEgc3RyaW5nIGxhYmVsIHRvIGRpZmZlcmVudGlhdGUgdGhpcyBzdGF0dXMgYW1vbmcgQ0kgc3lzdGVtcy5cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSB1cGRhdGVkIGNvbW1pdCBiYWNrXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVwZGF0ZVN0YXR1cyhjb21taXRTSEEsIG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3N0YXR1c2VzLyR7Y29tbWl0U0hBfWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBVcGRhdGUgcmVwb3NpdG9yeSBpbmZvcm1hdGlvblxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNlZGl0XG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE5ldyBwYXJhbWV0ZXJzIHRoYXQgd2lsbCBiZSBzZXQgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBOYW1lIG9mIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZGVzY3JpcHRpb25dIC0gQSBzaG9ydCBkZXNjcmlwdGlvbiBvZiB0aGUgcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmhvbWVwYWdlXSAtIEEgVVJMIHdpdGggbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5wcml2YXRlXSAtIEVpdGhlciB0cnVlIHRvIG1ha2UgdGhlIHJlcG9zaXRvcnkgcHJpdmF0ZSwgb3IgZmFsc2UgdG8gbWFrZSBpdCBwdWJsaWMuXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmhhc19pc3N1ZXNdIC0gRWl0aGVyIHRydWUgdG8gZW5hYmxlIGlzc3VlcyBmb3IgdGhpcyByZXBvc2l0b3J5LCBmYWxzZSB0byBkaXNhYmxlIHRoZW0uXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmhhc193aWtpXSAtIEVpdGhlciB0cnVlIHRvIGVuYWJsZSB0aGUgd2lraSBmb3IgdGhpcyByZXBvc2l0b3J5LCBmYWxzZSB0byBkaXNhYmxlIGl0LlxuICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5oYXNfZG93bmxvYWRzXSAtIEVpdGhlciB0cnVlIHRvIGVuYWJsZSBkb3dubG9hZHMsIGZhbHNlIHRvIGRpc2FibGUgdGhlbS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5kZWZhdWx0X2JyYW5jaF0gLSBVcGRhdGVzIHRoZSBkZWZhdWx0IGJyYW5jaCBmb3IgdGhpcyByZXBvc2l0b3J5LlxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgcmVwb3NpdG9yeSBiYWNrXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVwZGF0ZVJlcG9zaXRvcnkob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9YCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gIC8qKlxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2dldFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldERldGFpbHMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBjb250cmlidXRvcnMgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jbGlzdC1jb250cmlidXRvcnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGNvbnRyaWJ1dG9yc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRDb250cmlidXRvcnMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb250cmlidXRvcnNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgY29udHJpYnV0b3Igc3RhdHMgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jbGlzdC1jb250cmlidXRvcnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGNvbnRyaWJ1dG9yc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRDb250cmlidXRvclN0YXRzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vc3RhdHMvY29udHJpYnV0b3JzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIHVzZXJzIHdobyBhcmUgY29sbGFib3JhdG9ycyBvbiB0aGUgcmVwb3NpdG9yeS4gVGhlIGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHVzZXIgbXVzdCBoYXZlXG4gICAgKiBwdXNoIGFjY2VzcyB0byB1c2UgdGhpcyBtZXRob2RcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb2xsYWJvcmF0b3JzLyNsaXN0LWNvbGxhYm9yYXRvcnNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGNvbGxhYm9yYXRvcnNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0Q29sbGFib3JhdG9ycyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbGxhYm9yYXRvcnNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ2hlY2sgaWYgYSB1c2VyIGlzIGEgY29sbGFib3JhdG9yIG9uIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29sbGFib3JhdG9ycy8jY2hlY2staWYtYS11c2VyLWlzLWEtY29sbGFib3JhdG9yXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWUgLSB0aGUgdXNlciB0byBjaGVja1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgdXNlciBpcyBhIGNvbGxhYm9yYXRvciBhbmQgZmFsc2UgaWYgdGhleSBhcmUgbm90XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0IHtCb29sZWFufSBbZGVzY3JpcHRpb25dXG4gICAgKi9cbiAgIGlzQ29sbGFib3JhdG9yKHVzZXJuYW1lLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbGxhYm9yYXRvcnMvJHt1c2VybmFtZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IHRoZSBjb250ZW50cyBvZiBhIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb250ZW50cy8jZ2V0LWNvbnRlbnRzXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmIC0gdGhlIHJlZiB0byBjaGVja1xuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBjb250YWluaW5nIHRoZSBjb250ZW50IHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJhdyAtIGB0cnVlYCBpZiB0aGUgcmVzdWx0cyBzaG91bGQgYmUgcmV0dXJuZWQgcmF3IGluc3RlYWQgb2YgR2l0SHViJ3Mgbm9ybWFsaXplZCBmb3JtYXRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBmZXRjaGVkIGRhdGFcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0Q29udGVudHMocmVmLCBwYXRoLCByYXcsIGNiKSB7XG4gICAgICBwYXRoID0gcGF0aCA/IGAke2VuY29kZVVSSShwYXRoKX1gIDogJyc7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29udGVudHMvJHtwYXRofWAsIHtcbiAgICAgICAgIHJlZixcbiAgICAgIH0sIGNiLCByYXcpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCB0aGUgUkVBRE1FIG9mIGEgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbnRlbnRzLyNnZXQtdGhlLXJlYWRtZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSByZWYgdG8gY2hlY2tcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmF3IC0gYHRydWVgIGlmIHRoZSByZXN1bHRzIHNob3VsZCBiZSByZXR1cm5lZCByYXcgaW5zdGVhZCBvZiBHaXRIdWIncyBub3JtYWxpemVkIGZvcm1hdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGZldGNoZWQgZGF0YVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRSZWFkbWUocmVmLCByYXcsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcmVhZG1lYCwge1xuICAgICAgICAgcmVmLFxuICAgICAgfSwgY2IsIHJhdyk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRm9yayBhIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9mb3Jrcy8jY3JlYXRlLWEtZm9ya1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSBuZXdseSBjcmVhdGVkIGZvcmtcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZm9yayhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9mb3Jrc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IGEgcmVwb3NpdG9yeSdzIGZvcmtzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvZm9ya3MvI2xpc3QtZm9ya3NcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIHJlcG9zaXRvcmllcyBmb3JrZWQgZnJvbSB0aGlzIG9uZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0Rm9ya3MoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9mb3Jrc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgYnJhbmNoIGZyb20gYW4gZXhpc3RpbmcgYnJhbmNoLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvbGRCcmFuY2g9bWFzdGVyXSAtIHRoZSBuYW1lIG9mIHRoZSBleGlzdGluZyBicmFuY2hcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdCcmFuY2ggLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGJyYW5jaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1pdCBkYXRhIGZvciB0aGUgaGVhZCBvZiB0aGUgbmV3IGJyYW5jaFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVCcmFuY2gob2xkQnJhbmNoLCBuZXdCcmFuY2gsIGNiKSB7XG4gICAgICBpZiAodHlwZW9mIG5ld0JyYW5jaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgY2IgPSBuZXdCcmFuY2g7XG4gICAgICAgICBuZXdCcmFuY2ggPSBvbGRCcmFuY2g7XG4gICAgICAgICBvbGRCcmFuY2ggPSAnbWFzdGVyJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVmKGBoZWFkcy8ke29sZEJyYW5jaH1gKVxuICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2hhID0gcmVzcG9uc2UuZGF0YS5vYmplY3Quc2hhO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVmKHtcbiAgICAgICAgICAgICAgIHNoYSxcbiAgICAgICAgICAgICAgIHJlZjogYHJlZnMvaGVhZHMvJHtuZXdCcmFuY2h9YCxcbiAgICAgICAgICAgIH0sIGNiKTtcbiAgICAgICAgIH0pO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBwdWxsIHJlcXVlc3RcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wdWxscy8jY3JlYXRlLWEtcHVsbC1yZXF1ZXN0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBwdWxsIHJlcXVlc3QgZGVzY3JpcHRpb25cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgcHVsbCByZXF1ZXN0XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZVB1bGxSZXF1ZXN0KG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3B1bGxzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFVwZGF0ZSBhIHB1bGwgcmVxdWVzdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3B1bGxzLyN1cGRhdGUtYS1wdWxsLXJlcXVlc3RcbiAgICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbnVtYmVyIC0gdGhlIG51bWJlciBvZiB0aGUgcHVsbCByZXF1ZXN0IHRvIHVwZGF0ZVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgcHVsbCByZXF1ZXN0IGRlc2NyaXB0aW9uXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBwdWxsIHJlcXVlc3QgaW5mb3JtYXRpb25cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgdXBkYXRlUHVsbFJlcXVlc3QobnVtYmVyLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHVsbHMvJHtudW1iZXJ9YCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGhvb2tzIGZvciB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2hvb2tzLyNsaXN0LWhvb2tzXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBob29rc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0SG9va3MoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9ob29rc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBob29rIGZvciB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2hvb2tzLyNnZXQtc2luZ2xlLWhvb2tcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBpZCBvZiB0aGUgd2Vib29rXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgZGV0YWlscyBvZiB0aGUgd2Vib29rXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldEhvb2soaWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vaG9va3MvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQWRkIGEgbmV3IGhvb2sgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9ob29rcy8jY3JlYXRlLWEtaG9va1xuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgY29uZmlndXJhdGlvbiBkZXNjcmliaW5nIHRoZSBuZXcgaG9va1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ldyB3ZWJob29rXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZUhvb2sob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vaG9va3NgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRWRpdCBhbiBleGlzdGluZyB3ZWJob29rXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvaG9va3MvI2VkaXQtYS1ob29rXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgaWQgb2YgdGhlIHdlYmhvb2tcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIG5ldyBkZXNjcmlwdGlvbiBvZiB0aGUgd2ViaG9va1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgd2ViaG9va1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1cGRhdGVIb29rKGlkLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vaG9va3MvJHtpZH1gLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgd2ViaG9va1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2hvb2tzLyNkZWxldGUtYS1ob29rXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgaWQgb2YgdGhlIHdlYmhvb2sgdG8gYmUgZGVsZXRlZFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgY2FsbCBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZUhvb2soaWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vaG9va3MvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgZGVwbG95IGtleXMgZm9yIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3Mva2V5cy8jbGlzdC1kZXBsb3kta2V5c1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgZGVwbG95IGtleXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdEtleXMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9rZXlzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhIGRlcGxveSBrZXkgZm9yIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3Mva2V5cy8jZ2V0LWEtZGVwbG95LWtleVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSBkZXBsb3kga2V5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgZGV0YWlscyBvZiB0aGUgZGVwbG95IGtleVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRLZXkoaWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0va2V5cy8ke2lkfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBBZGQgYSBuZXcgZGVwbG95IGtleSB0byB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2tleXMvI2FkZC1hLW5ldy1kZXBsb3kta2V5XG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBjb25maWd1cmF0aW9uIGRlc2NyaWJpbmcgdGhlIG5ldyBkZXBsb3kga2V5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3IGRlcGxveSBrZXlcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlS2V5KG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2tleXNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgZGVwbG95IGtleVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2tleXMvI3JlbW92ZS1hLWRlcGxveS1rZXlcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBpZCBvZiB0aGUgZGVwbG95IGtleSB0byBiZSBkZWxldGVkXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBjYWxsIGlzIHN1Y2Nlc3NmdWxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZGVsZXRlS2V5KGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2tleXMvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgZmlsZSBmcm9tIGEgYnJhbmNoXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29udGVudHMvI2RlbGV0ZS1hLWZpbGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBicmFuY2ggLSB0aGUgYnJhbmNoIHRvIGRlbGV0ZSBmcm9tLCBvciB0aGUgZGVmYXVsdCBicmFuY2ggaWYgbm90IHNwZWNpZmllZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBvZiB0aGUgZmlsZSB0byByZW1vdmVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb21taXQgaW4gd2hpY2ggdGhlIGRlbGV0ZSBvY2N1cnJlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVGaWxlKGJyYW5jaCwgcGF0aCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFNoYShicmFuY2gsIHBhdGgpXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUNvbW1pdCA9IHtcbiAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBEZWxldGUgdGhlIGZpbGUgYXQgJyR7cGF0aH0nYCxcbiAgICAgICAgICAgICAgIHNoYTogcmVzcG9uc2UuZGF0YS5zaGEsXG4gICAgICAgICAgICAgICBicmFuY2gsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbnRlbnRzLyR7cGF0aH1gLCBkZWxldGVDb21taXQsIGNiKTtcbiAgICAgICAgIH0pO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENoYW5nZSBhbGwgcmVmZXJlbmNlcyBpbiBhIHJlcG8gZnJvbSBvbGRQYXRoIHRvIG5ld19wYXRoXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYnJhbmNoIC0gdGhlIGJyYW5jaCB0byBjYXJyeSBvdXQgdGhlIHJlZmVyZW5jZSBjaGFuZ2UsIG9yIHRoZSBkZWZhdWx0IGJyYW5jaCBpZiBub3Qgc3BlY2lmaWVkXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkUGF0aCAtIG9yaWdpbmFsIHBhdGhcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYXRoIC0gbmV3IHJlZmVyZW5jZSBwYXRoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWl0IGluIHdoaWNoIHRoZSBtb3ZlIG9jY3VycmVkXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIG1vdmUoYnJhbmNoLCBvbGRQYXRoLCBuZXdQYXRoLCBjYikge1xuICAgICAgbGV0IG9sZFNoYTtcbiAgICAgIHJldHVybiB0aGlzLmdldFJlZihgaGVhZHMvJHticmFuY2h9YClcbiAgICAgICAgIC50aGVuKCh7ZGF0YToge29iamVjdH19KSA9PiB0aGlzLmdldFRyZWUoYCR7b2JqZWN0LnNoYX0/cmVjdXJzaXZlPXRydWVgKSlcbiAgICAgICAgIC50aGVuKCh7ZGF0YToge3RyZWUsIHNoYX19KSA9PiB7XG4gICAgICAgICAgICBvbGRTaGEgPSBzaGE7XG4gICAgICAgICAgICBsZXQgbmV3VHJlZSA9IHRyZWUubWFwKChyZWYpID0+IHtcbiAgICAgICAgICAgICAgIGlmIChyZWYucGF0aCA9PT0gb2xkUGF0aCkge1xuICAgICAgICAgICAgICAgICAgcmVmLnBhdGggPSBuZXdQYXRoO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgaWYgKHJlZi50eXBlID09PSAndHJlZScpIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZWYuc2hhO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgcmV0dXJuIHJlZjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHJlZShuZXdUcmVlKTtcbiAgICAgICAgIH0pXG4gICAgICAgICAudGhlbigoe2RhdGE6IHRyZWV9KSA9PiB0aGlzLmNvbW1pdChvbGRTaGEsIHRyZWUuc2hhLCBgUmVuYW1lZCAnJHtvbGRQYXRofScgdG8gJyR7bmV3UGF0aH0nYCkpXG4gICAgICAgICAudGhlbigoe2RhdGE6IGNvbW1pdH0pID0+IHRoaXMudXBkYXRlSGVhZChgaGVhZHMvJHticmFuY2h9YCwgY29tbWl0LnNoYSwgdHJ1ZSwgY2IpKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBXcml0ZSBhIGZpbGUgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb250ZW50cy8jdXBkYXRlLWEtZmlsZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJyYW5jaCAtIHRoZSBuYW1lIG9mIHRoZSBicmFuY2hcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggZm9yIHRoZSBmaWxlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIHRoZSBjb250ZW50cyBvZiB0aGUgZmlsZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgY29tbWl0IG1lc3NhZ2VcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBjb21taXQgb3B0aW9uc1xuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmF1dGhvcl0gLSB0aGUgYXV0aG9yIG9mIHRoZSBjb21taXRcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5jb21taXRlcl0gLSB0aGUgY29tbWl0dGVyXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmVuY29kZV0gLSB0cnVlIGlmIHRoZSBjb250ZW50IHNob3VsZCBiZSBiYXNlNjQgZW5jb2RlZFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ldyBjb21taXRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgd3JpdGVGaWxlKGJyYW5jaCwgcGF0aCwgY29udGVudCwgbWVzc2FnZSwgb3B0aW9ucywgY2IpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgY2IgPSBvcHRpb25zO1xuICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuICAgICAgbGV0IGZpbGVQYXRoID0gcGF0aCA/IGVuY29kZVVSSShwYXRoKSA6ICcnO1xuICAgICAgbGV0IHNob3VsZEVuY29kZSA9IG9wdGlvbnMuZW5jb2RlICE9PSBmYWxzZTtcbiAgICAgIGxldCBjb21taXQgPSB7XG4gICAgICAgICBicmFuY2gsXG4gICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgYXV0aG9yOiBvcHRpb25zLmF1dGhvcixcbiAgICAgICAgIGNvbW1pdHRlcjogb3B0aW9ucy5jb21taXR0ZXIsXG4gICAgICAgICBjb250ZW50OiBzaG91bGRFbmNvZGUgPyBCYXNlNjQuZW5jb2RlKGNvbnRlbnQpIDogY29udGVudCxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFNoYShicmFuY2gsIGZpbGVQYXRoKVxuICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb21taXQuc2hhID0gcmVzcG9uc2UuZGF0YS5zaGE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29udGVudHMvJHtmaWxlUGF0aH1gLCBjb21taXQsIGNiKTtcbiAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQVVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb250ZW50cy8ke2ZpbGVQYXRofWAsIGNvbW1pdCwgY2IpO1xuICAgICAgICAgfSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ2hlY2sgaWYgYSByZXBvc2l0b3J5IGlzIHN0YXJyZWQgYnkgeW91XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvc3RhcnJpbmcvI2NoZWNrLWlmLXlvdS1hcmUtc3RhcnJpbmctYS1yZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXBvc2l0b3J5IGlzIHN0YXJyZWQgYW5kIGZhbHNlIGlmIHRoZSByZXBvc2l0b3J5XG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBub3Qgc3RhcnJlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdCB7Qm9vbGVhbn0gW2Rlc2NyaXB0aW9uXVxuICAgICovXG4gICBpc1N0YXJyZWQoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0MjA0b3I0MDQoYC91c2VyL3N0YXJyZWQvJHt0aGlzLl9fZnVsbG5hbWV9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFN0YXIgYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvc3RhcnJpbmcvI3N0YXItYS1yZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXBvc2l0b3J5IGlzIHN0YXJyZWRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgc3RhcihjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvdXNlci9zdGFycmVkLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBVbnN0YXIgYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvYWN0aXZpdHkvc3RhcnJpbmcvI3Vuc3Rhci1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcG9zaXRvcnkgaXMgdW5zdGFycmVkXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVuc3RhcihjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvdXNlci9zdGFycmVkLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgcmVsZWFzZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL3JlbGVhc2VzLyNjcmVhdGUtYS1yZWxlYXNlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgcmVsZWFzZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ld2x5IGNyZWF0ZWQgcmVsZWFzZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVSZWxlYXNlKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3JlbGVhc2VzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYSByZWxlYXNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvcmVsZWFzZXMvI2VkaXQtYS1yZWxlYXNlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgaWQgb2YgdGhlIHJlbGVhc2VcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSByZWxlYXNlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbW9kaWZpZWQgcmVsZWFzZVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1cGRhdGVSZWxlYXNlKGlkLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcmVsZWFzZXMvJHtpZH1gLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGFsbCByZWxlYXNlc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL3JlbGVhc2VzLyNsaXN0LXJlbGVhc2VzLWZvci1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSByZWxlYXNlIGluZm9ybWF0aW9uXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RSZWxlYXNlcyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3JlbGVhc2VzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCBhIHJlbGVhc2VcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9yZWxlYXNlcy8jZ2V0LWEtc2luZ2xlLXJlbGVhc2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgcmVsZWFzZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIHJlbGVhc2UgaW5mb3JtYXRpb25cbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0UmVsZWFzZShpZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9yZWxlYXNlcy8ke2lkfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBEZWxldGUgYSByZWxlYXNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvcmVsZWFzZXMvI2RlbGV0ZS1hLXJlbGVhc2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSByZWxlYXNlIHRvIGJlIGRlbGV0ZWRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZVJlbGVhc2UoaWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcmVsZWFzZXMvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTWVyZ2UgYSBwdWxsIHJlcXVlc3RcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wdWxscy8jbWVyZ2UtYS1wdWxsLXJlcXVlc3QtbWVyZ2UtYnV0dG9uXG4gICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG51bWJlciAtIHRoZSBudW1iZXIgb2YgdGhlIHB1bGwgcmVxdWVzdCB0byBtZXJnZVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgbWVyZ2Ugb3B0aW9ucyBmb3IgdGhlIHB1bGwgcmVxdWVzdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbWVyZ2UgaW5mb3JtYXRpb24gaWYgdGhlIG9wZXJhdGlvbiBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIG1lcmdlUHVsbFJlcXVlc3QobnVtYmVyLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3B1bGxzLyR7bnVtYmVyfS9tZXJnZWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYWxsIHByb2plY3RzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHJvamVjdHMvI2xpc3QtcmVwb3NpdG9yeS1wcm9qZWN0c1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBwcm9qZWN0c1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0UHJvamVjdHMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0QWxsUGFnZXMoYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHJvamVjdHNgLCB7QWNjZXB0SGVhZGVyOiAnaW5lcnRpYS1wcmV2aWV3J30sIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgcHJvamVjdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzLyNjcmVhdGUtYS1yZXBvc2l0b3J5LXByb2plY3RcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBwcm9qZWN0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3bHkgY3JlYXRlZCBwcm9qZWN0XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZVByb2plY3Qob3B0aW9ucywgY2IpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgb3B0aW9ucy5BY2NlcHRIZWFkZXIgPSAnaW5lcnRpYS1wcmV2aWV3JztcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHJvamVjdHNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXBvc2l0b3J5O1xuIl19
//# sourceMappingURL=Repository.js.map
