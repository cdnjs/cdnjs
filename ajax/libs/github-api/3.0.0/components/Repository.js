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
            base_tree: baseSHA }, cb);
      }

      /**
       * Add a commit to the repository
       * @see https://developer.github.com/v3/git/commits/#create-a-commit
       * @param {string} parent - the SHA of the parent commit
       * @param {string} tree - the SHA of the tree for this commit
       * @param {string} message - the commit message
       * @param {Requestable.callback} cb - will receive the commit that is created
       * @return {Promise} - the promise for the http request
       */

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
         return this._request('DELETE', this.__fullname + '/hooks/' + id, null, cb);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcG9zaXRvcnkuanMiXSwibmFtZXMiOlsibG9nIiwiUmVwb3NpdG9yeSIsImZ1bGxuYW1lIiwiYXV0aCIsImFwaUJhc2UiLCJfX2Z1bGxuYW1lIiwiX19jdXJyZW50VHJlZSIsImJyYW5jaCIsInNoYSIsInJlZiIsImNiIiwiX3JlcXVlc3QiLCJvcHRpb25zIiwibnVtYmVyIiwiYmFzZSIsImhlYWQiLCJzaW5jZSIsIl9kYXRlVG9JU08iLCJ1bnRpbCIsInBhdGgiLCJ0cmVlU0hBIiwiY29udGVudCIsInBvc3RCb2R5IiwiX2dldENvbnRlbnRPYmplY3QiLCJlbmNvZGUiLCJlbmNvZGluZyIsIkJ1ZmZlciIsInRvU3RyaW5nIiwiQmxvYiIsIkpTT04iLCJzdHJpbmdpZnkiLCJFcnJvciIsImJhc2VUcmVlU0hBIiwiYmxvYlNIQSIsIm5ld1RyZWUiLCJiYXNlX3RyZWUiLCJ0cmVlIiwibW9kZSIsInR5cGUiLCJiYXNlU0hBIiwicGFyZW50IiwibWVzc2FnZSIsImRhdGEiLCJwYXJlbnRzIiwidGhlbiIsInJlc3BvbnNlIiwiY29tbWl0U0hBIiwiZm9yY2UiLCJ1c2VybmFtZSIsInJhdyIsImVuY29kZVVSSSIsIm9sZEJyYW5jaCIsIm5ld0JyYW5jaCIsImdldFJlZiIsIm9iamVjdCIsImNyZWF0ZVJlZiIsImlkIiwiZ2V0U2hhIiwiZGVsZXRlQ29tbWl0Iiwib2xkUGF0aCIsIm5ld1BhdGgiLCJvbGRTaGEiLCJnZXRUcmVlIiwibWFwIiwiY3JlYXRlVHJlZSIsImNvbW1pdCIsInVwZGF0ZUhlYWQiLCJmaWxlUGF0aCIsInNob3VsZEVuY29kZSIsImF1dGhvciIsImNvbW1pdHRlciIsIl9yZXF1ZXN0MjA0b3I0MDQiLCJfcmVxdWVzdEFsbFBhZ2VzIiwiQWNjZXB0SGVhZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBT0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOzs7Ozs7Ozs7OytlQVpBOzs7Ozs7O0FBYUEsSUFBTUEsTUFB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ZmlsZSI6IlJlcG9zaXRvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlXG4gKiBAY29weXJpZ2h0ICAyMDEzIE1pY2hhZWwgQXVmcmVpdGVyIChEZXZlbG9wbWVudCBTZWVkKSBhbmQgMjAxNiBZYWhvbyBJbmMuXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxuICovXG5cbmltcG9ydCBSZXF1ZXN0YWJsZSBmcm9tICcuL1JlcXVlc3RhYmxlJztcbmltcG9ydCBVdGY4IGZyb20gJ3V0ZjgnO1xuaW1wb3J0IHtcbiAgIEJhc2U2NCxcbn0gZnJvbSAnanMtYmFzZTY0JztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5jb25zdCBsb2cgPSBkZWJ1ZygnZ2l0aHViOnJlcG9zaXRvcnknKTtcblxuLyoqXG4gKiBSZXNwb3NpdG9yeSBlbmNhcHN1bGF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gY3JlYXRlLCBxdWVyeSwgYW5kIG1vZGlmeSBmaWxlcy5cbiAqL1xuY2xhc3MgUmVwb3NpdG9yeSBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgUmVwb3NpdG9yeS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBmdWxsbmFtZSAtIHRoZSBmdWxsIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IoZnVsbG5hbWUsIGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgICAgdGhpcy5fX2Z1bGxuYW1lID0gZnVsbG5hbWU7XG4gICAgICB0aGlzLl9fY3VycmVudFRyZWUgPSB7XG4gICAgICAgICBicmFuY2g6IG51bGwsXG4gICAgICAgICBzaGE6IG51bGwsXG4gICAgICB9O1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhIHJlZmVyZW5jZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9yZWZzLyNnZXQtYS1yZWZlcmVuY2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgcmVmZXJlbmNlIHRvIGdldFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVmZXJlbmNlJ3MgcmVmU3BlYyBvciBhIGxpc3Qgb2YgcmVmU3BlY3MgdGhhdCBtYXRjaCBgcmVmYFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRSZWYocmVmLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9yZWZzLyR7cmVmfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSByZWZlcmVuY2VcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvcmVmcy8jY3JlYXRlLWEtcmVmZXJlbmNlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBvYmplY3QgZGVzY3JpYmluZyB0aGUgcmVmXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZWZcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlUmVmKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9yZWZzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIHJlZmVyZW5jZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9yZWZzLyNkZWxldGUtYS1yZWZlcmVuY2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgbmFtZSBvZiB0aGUgcmVmIHRvIGRlbHRlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcXVlc3QgaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVSZWYocmVmLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9yZWZzLyR7cmVmfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBEZWxldGUgYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2RlbGV0ZS1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZVJlcG8oY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSB0YWdzIG9uIGEgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNsaXN0LXRhZ3NcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHRhZyBkYXRhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RUYWdzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vdGFnc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBvcGVuIHB1bGwgcmVxdWVzdHMgb24gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wdWxscy8jbGlzdC1wdWxsLXJlcXVlc3RzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgdG8gZmlsdGVyIHRoZSBzZWFyY2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgUFJzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RQdWxsUmVxdWVzdHMob3B0aW9ucywgY2IpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3B1bGxzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCBhIHNwZWNpZmljIHB1bGwgcmVxdWVzdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3B1bGxzLyNnZXQtYS1zaW5nbGUtcHVsbC1yZXF1ZXN0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gdGhlIFBSIHlvdSB3aXNoIHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBQUiBmcm9tIHRoZSBBUElcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0UHVsbFJlcXVlc3QobnVtYmVyLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3B1bGxzLyR7bnVtYmVyfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBmaWxlcyBvZiBhIHNwZWNpZmljIHB1bGwgcmVxdWVzdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3B1bGxzLyNsaXN0LXB1bGwtcmVxdWVzdHMtZmlsZXNcbiAgICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbnVtYmVyIC0gdGhlIFBSIHlvdSB3aXNoIHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGZpbGVzIGZyb20gdGhlIEFQSVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0UHVsbFJlcXVlc3RGaWxlcyhudW1iZXIsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHVsbHMvJHtudW1iZXJ9L2ZpbGVzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENvbXBhcmUgdHdvIGJyYW5jaGVzL2NvbW1pdHMvcmVwb3NpdG9yaWVzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29tbWl0cy8jY29tcGFyZS10d28tY29tbWl0c1xuICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2UgLSB0aGUgYmFzZSBjb21taXRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkIC0gdGhlIGhlYWQgY29tbWl0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tcGFyaXNvblxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjb21wYXJlQnJhbmNoZXMoYmFzZSwgaGVhZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb21wYXJlLyR7YmFzZX0uLi4ke2hlYWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgYWxsIHRoZSBicmFuY2hlcyBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jbGlzdC1icmFuY2hlc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgYnJhbmNoZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdEJyYW5jaGVzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vYnJhbmNoZXNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgcmF3IGJsb2IgZnJvbSB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9ibG9icy8jZ2V0LWEtYmxvYlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNoYSAtIHRoZSBzaGEgb2YgdGhlIGJsb2IgdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBibG9iIGZyb20gdGhlIEFQSVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRCbG9iKHNoYSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvYmxvYnMvJHtzaGF9YCwgbnVsbCwgY2IsICdyYXcnKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBzaW5nbGUgYnJhbmNoXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvYnJhbmNoZXMvI2dldC1icmFuY2hcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBicmFuY2ggLSB0aGUgbmFtZSBvZiB0aGUgYnJhbmNoIHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgYnJhbmNoIGZyb20gdGhlIEFQSVxuICAgICogQHJldHVybnMge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0QnJhbmNoKGJyYW5jaCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9icmFuY2hlcy8ke2JyYW5jaH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgY29tbWl0IGZyb20gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb21taXRzLyNnZXQtYS1zaW5nbGUtY29tbWl0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhIC0gdGhlIHNoYSBmb3IgdGhlIGNvbW1pdCB0byBmZXRjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1pdCBkYXRhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldENvbW1pdChzaGEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L2NvbW1pdHMvJHtzaGF9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGNvbW1pdHMgb24gYSByZXBvc2l0b3J5LCBvcHRpb25hbGx5IGZpbHRlcmluZyBieSBwYXRoLCBhdXRob3Igb3IgdGltZSByYW5nZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbW1pdHMvI2xpc3QtY29tbWl0cy1vbi1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgZmlsdGVyaW5nIG9wdGlvbnMgZm9yIGNvbW1pdHNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5zaGFdIC0gdGhlIFNIQSBvciBicmFuY2ggdG8gc3RhcnQgZnJvbVxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBhdGhdIC0gdGhlIHBhdGggdG8gc2VhcmNoIG9uXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuYXV0aG9yXSAtIHRoZSBjb21taXQgYXV0aG9yXG4gICAgKiBAcGFyYW0geyhEYXRlfHN0cmluZyl9IFtvcHRpb25zLnNpbmNlXSAtIG9ubHkgY29tbWl0cyBhZnRlciB0aGlzIGRhdGUgd2lsbCBiZSByZXR1cm5lZFxuICAgICogQHBhcmFtIHsoRGF0ZXxzdHJpbmcpfSBbb3B0aW9ucy51bnRpbF0gLSBvbmx5IGNvbW1pdHMgYmVmb3JlIHRoaXMgZGF0ZSB3aWxsIGJlIHJldHVybmVkXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBjb21taXRzIGZvdW5kIG1hdGNoaW5nIHRoZSBjcml0ZXJpYVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0Q29tbWl0cyhvcHRpb25zLCBjYikge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIG9wdGlvbnMuc2luY2UgPSB0aGlzLl9kYXRlVG9JU08ob3B0aW9ucy5zaW5jZSk7XG4gICAgICBvcHRpb25zLnVudGlsID0gdGhpcy5fZGF0ZVRvSVNPKG9wdGlvbnMudW50aWwpO1xuXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29tbWl0c2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBzaW5nbGUgY29tbWl0IGluZm9ybWF0aW9uIGZvciBhIHJlcG9zaXRvcnlcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29tbWl0cy8jZ2V0LWEtc2luZ2xlLWNvbW1pdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgcmVmZXJlbmNlIGZvciB0aGUgY29tbWl0LWlzaFxuICAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb21taXQgaW5mb3JtYXRpb25cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgICovXG4gICBnZXRTaW5nbGVDb21taXQocmVmLCBjYikge1xuICAgICAgcmVmID0gcmVmIHx8ICcnO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbW1pdHMvJHtyZWZ9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCB0aGEgc2hhIGZvciBhIHBhcnRpY3VsYXIgb2JqZWN0IGluIHRoZSByZXBvc2l0b3J5LiBUaGlzIGlzIGEgY29udmVuaWVuY2UgZnVuY3Rpb25cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb250ZW50cy8jZ2V0LWNvbnRlbnRzXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2JyYW5jaF0gLSB0aGUgYnJhbmNoIHRvIGxvb2sgaW4sIG9yIHRoZSByZXBvc2l0b3J5J3MgZGVmYXVsdCBicmFuY2ggaWYgb21pdHRlZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBvZiB0aGUgZmlsZSBvciBkaXJlY3RvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIGEgZGVzY3JpcHRpb24gb2YgdGhlIHJlcXVlc3RlZCBvYmplY3QsIGluY2x1ZGluZyBhIGBTSEFgIHByb3BlcnR5XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFNoYShicmFuY2gsIHBhdGgsIGNiKSB7XG4gICAgICBicmFuY2ggPSBicmFuY2ggPyBgP3JlZj0ke2JyYW5jaH1gIDogJyc7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29udGVudHMvJHtwYXRofSR7YnJhbmNofWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBjb21taXQgc3RhdHVzZXMgZm9yIGEgcGFydGljdWxhciBzaGEsIGJyYW5jaCwgb3IgdGFnXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3Mvc3RhdHVzZXMvI2xpc3Qtc3RhdHVzZXMtZm9yLWEtc3BlY2lmaWMtcmVmXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhIC0gdGhlIHNoYSwgYnJhbmNoLCBvciB0YWcgdG8gZ2V0IHN0YXR1c2VzIGZvclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2Ygc3RhdHVzZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdFN0YXR1c2VzKHNoYSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb21taXRzLyR7c2hhfS9zdGF0dXNlc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBkZXNjcmlwdGlvbiBvZiBhIGdpdCB0cmVlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3RyZWVzLyNnZXQtYS10cmVlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdHJlZVNIQSAtIHRoZSBTSEEgb2YgdGhlIHRyZWUgdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjYWxsYmFjayBkYXRhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFRyZWUodHJlZVNIQSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvdHJlZXMvJHt0cmVlU0hBfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBibG9iXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L2Jsb2JzLyNjcmVhdGUtYS1ibG9iXG4gICAgKiBAcGFyYW0geyhzdHJpbmd8QnVmZmVyfEJsb2IpfSBjb250ZW50IC0gdGhlIGNvbnRlbnQgdG8gYWRkIHRvIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgZGV0YWlscyBvZiB0aGUgY3JlYXRlZCBibG9iXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZUJsb2IoY29udGVudCwgY2IpIHtcbiAgICAgIGxldCBwb3N0Qm9keSA9IHRoaXMuX2dldENvbnRlbnRPYmplY3QoY29udGVudCk7XG5cbiAgICAgIGxvZygnc2VuZGluZyBjb250ZW50JywgcG9zdEJvZHkpO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvYmxvYnNgLCBwb3N0Qm9keSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCB0aGUgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgcHJvdmlkZWQgY29udGVudFxuICAgICogQHBhcmFtIHtzdHJpbmd8QnVmZmVyfEJsb2J9IGNvbnRlbnQgLSB0aGUgY29udGVudCB0byBzZW5kIHRvIHRoZSBzZXJ2ZXJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIHJlcHJlc2VudGF0aW9uIG9mIGBjb250ZW50YCBmb3IgdGhlIEdpdEh1YiBBUElcbiAgICAqL1xuICAgX2dldENvbnRlbnRPYmplY3QoY29udGVudCkge1xuICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgbG9nKCdjb250ZXQgaXMgYSBzdHJpbmcnKTtcbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250ZW50OiBVdGY4LmVuY29kZShjb250ZW50KSxcbiAgICAgICAgICAgIGVuY29kaW5nOiAndXRmLTgnLFxuICAgICAgICAgfTtcblxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZW50IGluc3RhbmNlb2YgQnVmZmVyKSB7XG4gICAgICAgICBsb2coJ1dlIGFwcGVhciB0byBiZSBpbiBOb2RlJyk7XG4gICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29udGVudDogY29udGVudC50b1N0cmluZygnYmFzZTY0JyksXG4gICAgICAgICAgICBlbmNvZGluZzogJ2Jhc2U2NCcsXG4gICAgICAgICB9O1xuXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBjb250ZW50IGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgbG9nKCdXZSBhcHBlYXIgdG8gYmUgaW4gdGhlIGJyb3dzZXInKTtcbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250ZW50OiBCYXNlNjQuZW5jb2RlKGNvbnRlbnQpLFxuICAgICAgICAgICAgZW5jb2Rpbmc6ICdiYXNlNjQnLFxuICAgICAgICAgfTtcblxuICAgICAgfSBlbHNlIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgbG9nKGBOb3Qgc3VyZSB3aGF0IHRoaXMgY29udGVudCBpczogJHt0eXBlb2YgY29udGVudH0sICR7SlNPTi5zdHJpbmdpZnkoY29udGVudCl9YCk7XG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gY29udGVudCBwYXNzZWQgdG8gcG9zdEJsb2IuIE11c3QgYmUgc3RyaW5nIG9yIEJ1ZmZlciAobm9kZSkgb3IgQmxvYiAod2ViKScpO1xuICAgICAgfVxuICAgfVxuXG4gICAvKipcbiAgICAqIFVwZGF0ZSBhIHRyZWUgaW4gR2l0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3RyZWVzLyNjcmVhdGUtYS10cmVlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVRyZWVTSEEgLSB0aGUgU0hBIG9mIHRoZSB0cmVlIHRvIHVwZGF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBmb3IgdGhlIG5ldyBmaWxlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmxvYlNIQSAtIHRoZSBTSEEgZm9yIHRoZSBibG9iIHRvIHB1dCBhdCBgcGF0aGBcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgdHJlZSB0aGF0IGlzIGNyZWF0ZWRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgUmVwb3NpdG9yeSNjcmVhdGVUcmVlfSBpbnN0ZWFkXG4gICAgKi9cbiAgIHVwZGF0ZVRyZWUoYmFzZVRyZWVTSEEsIHBhdGgsIGJsb2JTSEEsIGNiKSB7XG4gICAgICBsZXQgbmV3VHJlZSA9IHtcbiAgICAgICAgIGJhc2VfdHJlZTogYmFzZVRyZWVTSEEsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgIHRyZWU6IFt7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgc2hhOiBibG9iU0hBLFxuICAgICAgICAgICAgbW9kZTogJzEwMDY0NCcsXG4gICAgICAgICAgICB0eXBlOiAnYmxvYicsXG4gICAgICAgICB9XSxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3RyZWVzYCwgbmV3VHJlZSwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyB0cmVlIGluIGdpdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC90cmVlcy8jY3JlYXRlLWEtdHJlZVxuICAgICogQHBhcmFtIHtPYmplY3R9IHRyZWUgLSB0aGUgdHJlZSB0byBjcmVhdGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlU0hBIC0gdGhlIHJvb3Qgc2hhIG9mIHRoZSB0cmVlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3IHRyZWUgdGhhdCBpcyBjcmVhdGVkXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZVRyZWUodHJlZSwgYmFzZVNIQSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3RyZWVzYCwge1xuICAgICAgICAgdHJlZSxcbiAgICAgICAgIGJhc2VfdHJlZTogYmFzZVNIQSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgICAgIH0sIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBBZGQgYSBjb21taXQgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvY29tbWl0cy8jY3JlYXRlLWEtY29tbWl0XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50IC0gdGhlIFNIQSBvZiB0aGUgcGFyZW50IGNvbW1pdFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHRyZWUgLSB0aGUgU0hBIG9mIHRoZSB0cmVlIGZvciB0aGlzIGNvbW1pdFxuICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgY29tbWl0IG1lc3NhZ2VcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb21taXQgdGhhdCBpcyBjcmVhdGVkXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNvbW1pdChwYXJlbnQsIHRyZWUsIG1lc3NhZ2UsIGNiKSB7XG4gICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICB0cmVlLFxuICAgICAgICAgcGFyZW50czogW3BhcmVudF0sXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9jb21taXRzYCwgZGF0YSwgY2IpXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX19jdXJyZW50VHJlZS5zaGEgPSByZXNwb25zZS5kYXRhLnNoYTsgLy8gVXBkYXRlIGxhdGVzdCBjb21taXRcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgIH0pO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFVwZGF0ZSBhIHJlZlxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9yZWZzLyN1cGRhdGUtYS1yZWZlcmVuY2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgcmVmIHRvIHVwZGF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1pdFNIQSAtIHRoZSBTSEEgdG8gcG9pbnQgdGhlIHJlZmVyZW5jZSB0b1xuICAgICogQHBhcmFtIHtib29sZWFufSBmb3JjZSAtIGluZGljYXRlcyB3aGV0aGVyIHRvIGZvcmNlIG9yIGVuc3VyZSBhIGZhc3QtZm9yd2FyZCB1cGRhdGVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSB1cGRhdGVkIHJlZiBiYWNrXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVwZGF0ZUhlYWQocmVmLCBjb21taXRTSEEsIGZvcmNlLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3JlZnMvJHtyZWZ9YCwge1xuICAgICAgICAgc2hhOiBjb21taXRTSEEsXG4gICAgICAgICBmb3JjZTogZm9yY2UsXG4gICAgICB9LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogVXBkYXRlIGNvbW1pdCBzdGF0dXNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9zdGF0dXNlcy9cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21taXRTSEEgLSB0aGUgU0hBIG9mIHRoZSBjb21taXQgdGhhdCBzaG91bGQgYmUgdXBkYXRlZFxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBDb21taXQgc3RhdHVzIHBhcmFtZXRlcnNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnN0YXRlIC0gVGhlIHN0YXRlIG9mIHRoZSBzdGF0dXMuIENhbiBiZSBvbmUgb2Y6IHBlbmRpbmcsIHN1Y2Nlc3MsIGVycm9yLCBvciBmYWlsdXJlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnRhcmdldF91cmxdIC0gVGhlIHRhcmdldCBVUkwgdG8gYXNzb2NpYXRlIHdpdGggdGhpcyBzdGF0dXMuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZGVzY3JpcHRpb25dIC0gQSBzaG9ydCBkZXNjcmlwdGlvbiBvZiB0aGUgc3RhdHVzLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNvbnRleHRdIC0gQSBzdHJpbmcgbGFiZWwgdG8gZGlmZmVyZW50aWF0ZSB0aGlzIHN0YXR1cyBhbW9uZyBDSSBzeXN0ZW1zLlxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIHVwZGF0ZWQgY29tbWl0IGJhY2tcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgdXBkYXRlU3RhdHVzKGNvbW1pdFNIQSwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vc3RhdHVzZXMvJHtjb21taXRTSEF9YCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFVwZGF0ZSByZXBvc2l0b3J5IGluZm9ybWF0aW9uXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2VkaXRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gTmV3IHBhcmFtZXRlcnMgdGhhdCB3aWxsIGJlIHNldCB0byB0aGUgcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIE5hbWUgb2YgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5kZXNjcmlwdGlvbl0gLSBBIHNob3J0IGRlc2NyaXB0aW9uIG9mIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuaG9tZXBhZ2VdIC0gQSBVUkwgd2l0aCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnByaXZhdGVdIC0gRWl0aGVyIHRydWUgdG8gbWFrZSB0aGUgcmVwb3NpdG9yeSBwcml2YXRlLCBvciBmYWxzZSB0byBtYWtlIGl0IHB1YmxpYy5cbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaGFzX2lzc3Vlc10gLSBFaXRoZXIgdHJ1ZSB0byBlbmFibGUgaXNzdWVzIGZvciB0aGlzIHJlcG9zaXRvcnksIGZhbHNlIHRvIGRpc2FibGUgdGhlbS5cbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaGFzX3dpa2ldIC0gRWl0aGVyIHRydWUgdG8gZW5hYmxlIHRoZSB3aWtpIGZvciB0aGlzIHJlcG9zaXRvcnksIGZhbHNlIHRvIGRpc2FibGUgaXQuXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmhhc19kb3dubG9hZHNdIC0gRWl0aGVyIHRydWUgdG8gZW5hYmxlIGRvd25sb2FkcywgZmFsc2UgdG8gZGlzYWJsZSB0aGVtLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmRlZmF1bHRfYnJhbmNoXSAtIFVwZGF0ZXMgdGhlIGRlZmF1bHQgYnJhbmNoIGZvciB0aGlzIHJlcG9zaXRvcnkuXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgdXBkYXRlZCByZXBvc2l0b3J5IGJhY2tcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgdXBkYXRlUmVwb3NpdG9yeShvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BBVENIJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX1gLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgLyoqXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jZ2V0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0RGV0YWlscyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGNvbnRyaWJ1dG9ycyB0byB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNsaXN0LWNvbnRyaWJ1dG9yc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgY29udHJpYnV0b3JzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldENvbnRyaWJ1dG9ycyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbnRyaWJ1dG9yc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBjb250cmlidXRvciBzdGF0cyB0byB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zLyNsaXN0LWNvbnRyaWJ1dG9yc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgY29udHJpYnV0b3JzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldENvbnRyaWJ1dG9yU3RhdHMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9zdGF0cy9jb250cmlidXRvcnNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgdXNlcnMgd2hvIGFyZSBjb2xsYWJvcmF0b3JzIG9uIHRoZSByZXBvc2l0b3J5LiBUaGUgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgdXNlciBtdXN0IGhhdmVcbiAgICAqIHB1c2ggYWNjZXNzIHRvIHVzZSB0aGlzIG1ldGhvZFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbGxhYm9yYXRvcnMvI2xpc3QtY29sbGFib3JhdG9yc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgY29sbGFib3JhdG9yc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRDb2xsYWJvcmF0b3JzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29sbGFib3JhdG9yc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDaGVjayBpZiBhIHVzZXIgaXMgYSBjb2xsYWJvcmF0b3Igb24gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb2xsYWJvcmF0b3JzLyNjaGVjay1pZi1hLXVzZXItaXMtYS1jb2xsYWJvcmF0b3JcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSAtIHRoZSB1c2VyIHRvIGNoZWNrXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSB1c2VyIGlzIGEgY29sbGFib3JhdG9yIGFuZCBmYWxzZSBpZiB0aGV5IGFyZSBub3RcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3Qge0Jvb2xlYW59IFtkZXNjcmlwdGlvbl1cbiAgICAqL1xuICAgaXNDb2xsYWJvcmF0b3IodXNlcm5hbWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29sbGFib3JhdG9ycy8ke3VzZXJuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgdGhlIGNvbnRlbnRzIG9mIGEgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbnRlbnRzLyNnZXQtY29udGVudHNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgcmVmIHRvIGNoZWNrXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIGNvbnRhaW5pbmcgdGhlIGNvbnRlbnQgdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmF3IC0gYHRydWVgIGlmIHRoZSByZXN1bHRzIHNob3VsZCBiZSByZXR1cm5lZCByYXcgaW5zdGVhZCBvZiBHaXRIdWIncyBub3JtYWxpemVkIGZvcm1hdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGZldGNoZWQgZGF0YVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRDb250ZW50cyhyZWYsIHBhdGgsIHJhdywgY2IpIHtcbiAgICAgIHBhdGggPSBwYXRoID8gYCR7ZW5jb2RlVVJJKHBhdGgpfWAgOiAnJztcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb250ZW50cy8ke3BhdGh9YCwge1xuICAgICAgICAgcmVmLFxuICAgICAgfSwgY2IsIHJhdyk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IHRoZSBSRUFETUUgb2YgYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29udGVudHMvI2dldC10aGUtcmVhZG1lXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmIC0gdGhlIHJlZiB0byBjaGVja1xuICAgICogQHBhcmFtIHtib29sZWFufSByYXcgLSBgdHJ1ZWAgaWYgdGhlIHJlc3VsdHMgc2hvdWxkIGJlIHJldHVybmVkIHJhdyBpbnN0ZWFkIG9mIEdpdEh1YidzIG5vcm1hbGl6ZWQgZm9ybWF0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgZmV0Y2hlZCBkYXRhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFJlYWRtZShyZWYsIHJhdywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9yZWFkbWVgLCB7XG4gICAgICAgICByZWYsXG4gICAgICB9LCBjYiwgcmF3KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBGb3JrIGEgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2ZvcmtzLyNjcmVhdGUtYS1mb3JrXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG5ld2x5IGNyZWF0ZWQgZm9ya1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBmb3JrKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2ZvcmtzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgYSByZXBvc2l0b3J5J3MgZm9ya3NcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9mb3Jrcy8jbGlzdC1mb3Jrc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcmVwb3NpdG9yaWVzIGZvcmtlZCBmcm9tIHRoaXMgb25lXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RGb3JrcyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2ZvcmtzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyBicmFuY2ggZnJvbSBhbiBleGlzdGluZyBicmFuY2guXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29sZEJyYW5jaD1tYXN0ZXJdIC0gdGhlIG5hbWUgb2YgdGhlIGV4aXN0aW5nIGJyYW5jaFxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld0JyYW5jaCAtIHRoZSBuYW1lIG9mIHRoZSBuZXcgYnJhbmNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWl0IGRhdGEgZm9yIHRoZSBoZWFkIG9mIHRoZSBuZXcgYnJhbmNoXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZUJyYW5jaChvbGRCcmFuY2gsIG5ld0JyYW5jaCwgY2IpIHtcbiAgICAgIGlmICh0eXBlb2YgbmV3QnJhbmNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICBjYiA9IG5ld0JyYW5jaDtcbiAgICAgICAgIG5ld0JyYW5jaCA9IG9sZEJyYW5jaDtcbiAgICAgICAgIG9sZEJyYW5jaCA9ICdtYXN0ZXInO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZXRSZWYoYGhlYWRzLyR7b2xkQnJhbmNofWApXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBzaGEgPSByZXNwb25zZS5kYXRhLm9iamVjdC5zaGE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVSZWYoe1xuICAgICAgICAgICAgICAgc2hhLFxuICAgICAgICAgICAgICAgcmVmOiBgcmVmcy9oZWFkcy8ke25ld0JyYW5jaH1gLFxuICAgICAgICAgICAgfSwgY2IpO1xuICAgICAgICAgfSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IHB1bGwgcmVxdWVzdFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3B1bGxzLyNjcmVhdGUtYS1wdWxsLXJlcXVlc3RcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIHB1bGwgcmVxdWVzdCBkZXNjcmlwdGlvblxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ldyBwdWxsIHJlcXVlc3RcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlUHVsbFJlcXVlc3Qob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHVsbHNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogVXBkYXRlIGEgcHVsbCByZXF1ZXN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHVsbHMvI3VwZGF0ZS1hLXB1bGwtcmVxdWVzdFxuICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBudW1iZXIgLSB0aGUgbnVtYmVyIG9mIHRoZSBwdWxsIHJlcXVlc3QgdG8gdXBkYXRlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBwdWxsIHJlcXVlc3QgZGVzY3JpcHRpb25cbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHB1bGwgcmVxdWVzdCBpbmZvcm1hdGlvblxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1cGRhdGVQdWxsUmVxdWVzdChudW1iZXIsIG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9wdWxscy8ke251bWJlcn1gLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgaG9va3MgZm9yIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvaG9va3MvI2xpc3QtaG9va3NcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGhvb2tzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RIb29rcyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBhIGhvb2sgZm9yIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvaG9va3MvI2dldC1zaW5nbGUtaG9va1xuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSB3ZWJvb2tcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBkZXRhaWxzIG9mIHRoZSB3ZWJvb2tcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0SG9vayhpZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9ob29rcy8ke2lkfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBBZGQgYSBuZXcgaG9vayB0byB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2hvb2tzLyNjcmVhdGUtYS1ob29rXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBjb25maWd1cmF0aW9uIGRlc2NyaWJpbmcgdGhlIG5ldyBob29rXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3IHdlYmhvb2tcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlSG9vayhvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9ob29rc2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBFZGl0IGFuIGV4aXN0aW5nIHdlYmhvb2tcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9ob29rcy8jZWRpdC1hLWhvb2tcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBpZCBvZiB0aGUgd2ViaG9va1xuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgbmV3IGRlc2NyaXB0aW9uIG9mIHRoZSB3ZWJob29rXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgdXBkYXRlZCB3ZWJob29rXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVwZGF0ZUhvb2soaWQsIG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9ob29rcy8ke2lkfWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBEZWxldGUgYSB3ZWJob29rXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvaG9va3MvI2RlbGV0ZS1hLWhvb2tcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBpZCBvZiB0aGUgd2ViaG9vayB0byBiZSBkZWxldGVkXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBjYWxsIGlzIHN1Y2Nlc3NmdWxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZGVsZXRlSG9vayhpZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIGRlcGxveSBrZXlzIGZvciB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2tleXMvI2xpc3QtZGVwbG95LWtleXNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGRlcGxveSBrZXlzXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RLZXlzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0va2V5c2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBkZXBsb3kga2V5IGZvciB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2tleXMvI2dldC1hLWRlcGxveS1rZXlcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBpZCBvZiB0aGUgZGVwbG95IGtleVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGRldGFpbHMgb2YgdGhlIGRlcGxveSBrZXlcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0S2V5KGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2tleXMvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQWRkIGEgbmV3IGRlcGxveSBrZXkgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9rZXlzLyNhZGQtYS1uZXctZGVwbG95LWtleVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgY29uZmlndXJhdGlvbiBkZXNjcmliaW5nIHRoZSBuZXcgZGVwbG95IGtleVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ldyBkZXBsb3kga2V5XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZUtleShvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9rZXlzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIGRlcGxveSBrZXlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9rZXlzLyNyZW1vdmUtYS1kZXBsb3kta2V5XG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgaWQgb2YgdGhlIGRlcGxveSBrZXkgdG8gYmUgZGVsZXRlZFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgY2FsbCBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZUtleShpZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9rZXlzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIGZpbGUgZnJvbSBhIGJyYW5jaFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbnRlbnRzLyNkZWxldGUtYS1maWxlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYnJhbmNoIC0gdGhlIGJyYW5jaCB0byBkZWxldGUgZnJvbSwgb3IgdGhlIGRlZmF1bHQgYnJhbmNoIGlmIG5vdCBzcGVjaWZpZWRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gdGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gcmVtb3ZlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWl0IGluIHdoaWNoIHRoZSBkZWxldGUgb2NjdXJyZWRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZGVsZXRlRmlsZShicmFuY2gsIHBhdGgsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTaGEoYnJhbmNoLCBwYXRoKVxuICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVDb21taXQgPSB7XG4gICAgICAgICAgICAgICBtZXNzYWdlOiBgRGVsZXRlIHRoZSBmaWxlIGF0ICcke3BhdGh9J2AsXG4gICAgICAgICAgICAgICBzaGE6IHJlc3BvbnNlLmRhdGEuc2hhLFxuICAgICAgICAgICAgICAgYnJhbmNoLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb250ZW50cy8ke3BhdGh9YCwgZGVsZXRlQ29tbWl0LCBjYik7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDaGFuZ2UgYWxsIHJlZmVyZW5jZXMgaW4gYSByZXBvIGZyb20gb2xkUGF0aCB0byBuZXdfcGF0aFxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJyYW5jaCAtIHRoZSBicmFuY2ggdG8gY2Fycnkgb3V0IHRoZSByZWZlcmVuY2UgY2hhbmdlLCBvciB0aGUgZGVmYXVsdCBicmFuY2ggaWYgbm90IHNwZWNpZmllZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IG9sZFBhdGggLSBvcmlnaW5hbCBwYXRoXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UGF0aCAtIG5ldyByZWZlcmVuY2UgcGF0aFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGNvbW1pdCBpbiB3aGljaCB0aGUgbW92ZSBvY2N1cnJlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBtb3ZlKGJyYW5jaCwgb2xkUGF0aCwgbmV3UGF0aCwgY2IpIHtcbiAgICAgIGxldCBvbGRTaGE7XG4gICAgICByZXR1cm4gdGhpcy5nZXRSZWYoYGhlYWRzLyR7YnJhbmNofWApXG4gICAgICAgICAudGhlbigoe2RhdGE6IHtvYmplY3R9fSkgPT4gdGhpcy5nZXRUcmVlKGAke29iamVjdC5zaGF9P3JlY3Vyc2l2ZT10cnVlYCkpXG4gICAgICAgICAudGhlbigoe2RhdGE6IHt0cmVlLCBzaGF9fSkgPT4ge1xuICAgICAgICAgICAgb2xkU2hhID0gc2hhO1xuICAgICAgICAgICAgbGV0IG5ld1RyZWUgPSB0cmVlLm1hcCgocmVmKSA9PiB7XG4gICAgICAgICAgICAgICBpZiAocmVmLnBhdGggPT09IG9sZFBhdGgpIHtcbiAgICAgICAgICAgICAgICAgIHJlZi5wYXRoID0gbmV3UGF0aDtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGlmIChyZWYudHlwZSA9PT0gJ3RyZWUnKSB7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgcmVmLnNoYTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIHJldHVybiByZWY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRyZWUobmV3VHJlZSk7XG4gICAgICAgICB9KVxuICAgICAgICAgLnRoZW4oKHtkYXRhOiB0cmVlfSkgPT4gdGhpcy5jb21taXQob2xkU2hhLCB0cmVlLnNoYSwgYFJlbmFtZWQgJyR7b2xkUGF0aH0nIHRvICcke25ld1BhdGh9J2ApKVxuICAgICAgICAgLnRoZW4oKHtkYXRhOiBjb21taXR9KSA9PiB0aGlzLnVwZGF0ZUhlYWQoYGhlYWRzLyR7YnJhbmNofWAsIGNvbW1pdC5zaGEsIHRydWUsIGNiKSk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogV3JpdGUgYSBmaWxlIHRvIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29udGVudHMvI3VwZGF0ZS1hLWZpbGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBicmFuY2ggLSB0aGUgbmFtZSBvZiB0aGUgYnJhbmNoXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIGZvciB0aGUgZmlsZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgLSB0aGUgY29udGVudHMgb2YgdGhlIGZpbGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIGNvbW1pdCBtZXNzYWdlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gY29tbWl0IG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5hdXRob3JdIC0gdGhlIGF1dGhvciBvZiB0aGUgY29tbWl0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuY29tbWl0ZXJdIC0gdGhlIGNvbW1pdHRlclxuICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5lbmNvZGVdIC0gdHJ1ZSBpZiB0aGUgY29udGVudCBzaG91bGQgYmUgYmFzZTY0IGVuY29kZWRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgY29tbWl0XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHdyaXRlRmlsZShicmFuY2gsIHBhdGgsIGNvbnRlbnQsIG1lc3NhZ2UsIG9wdGlvbnMsIGNiKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgIGNiID0gb3B0aW9ucztcbiAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIGxldCBmaWxlUGF0aCA9IHBhdGggPyBlbmNvZGVVUkkocGF0aCkgOiAnJztcbiAgICAgIGxldCBzaG91bGRFbmNvZGUgPSBvcHRpb25zLmVuY29kZSAhPT0gZmFsc2U7XG4gICAgICBsZXQgY29tbWl0ID0ge1xuICAgICAgICAgYnJhbmNoLFxuICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgIGF1dGhvcjogb3B0aW9ucy5hdXRob3IsXG4gICAgICAgICBjb21taXR0ZXI6IG9wdGlvbnMuY29tbWl0dGVyLFxuICAgICAgICAgY29udGVudDogc2hvdWxkRW5jb2RlID8gQmFzZTY0LmVuY29kZShjb250ZW50KSA6IGNvbnRlbnQsXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gdGhpcy5nZXRTaGEoYnJhbmNoLCBmaWxlUGF0aClcbiAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29tbWl0LnNoYSA9IHJlc3BvbnNlLmRhdGEuc2hhO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbnRlbnRzLyR7ZmlsZVBhdGh9YCwgY29tbWl0LCBjYik7XG4gICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29udGVudHMvJHtmaWxlUGF0aH1gLCBjb21taXQsIGNiKTtcbiAgICAgICAgIH0pO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENoZWNrIGlmIGEgcmVwb3NpdG9yeSBpcyBzdGFycmVkIGJ5IHlvdVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2FjdGl2aXR5L3N0YXJyaW5nLyNjaGVjay1pZi15b3UtYXJlLXN0YXJyaW5nLWEtcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVwb3NpdG9yeSBpcyBzdGFycmVkIGFuZCBmYWxzZSBpZiB0aGUgcmVwb3NpdG9yeVxuICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgbm90IHN0YXJyZWRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3Qge0Jvb2xlYW59IFtkZXNjcmlwdGlvbl1cbiAgICAqL1xuICAgaXNTdGFycmVkKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdDIwNG9yNDA0KGAvdXNlci9zdGFycmVkLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBTdGFyIGEgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2FjdGl2aXR5L3N0YXJyaW5nLyNzdGFyLWEtcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVwb3NpdG9yeSBpcyBzdGFycmVkXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHN0YXIoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQVVQnLCBgL3VzZXIvc3RhcnJlZC8ke3RoaXMuX19mdWxsbmFtZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogVW5zdGFyIGEgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2FjdGl2aXR5L3N0YXJyaW5nLyN1bnN0YXItYS1yZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXBvc2l0b3J5IGlzIHVuc3RhcnJlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICB1bnN0YXIoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3VzZXIvc3RhcnJlZC8ke3RoaXMuX19mdWxsbmFtZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IHJlbGVhc2VcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9yZWxlYXNlcy8jY3JlYXRlLWEtcmVsZWFzZVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIHJlbGVhc2VcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXdseSBjcmVhdGVkIHJlbGVhc2VcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlUmVsZWFzZShvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9yZWxlYXNlc2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBFZGl0IGEgcmVsZWFzZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL3JlbGVhc2VzLyNlZGl0LWEtcmVsZWFzZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGlkIG9mIHRoZSByZWxlYXNlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgcmVsZWFzZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG1vZGlmaWVkIHJlbGVhc2VcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgdXBkYXRlUmVsZWFzZShpZCwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3JlbGVhc2VzLyR7aWR9YCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCBhbGwgcmVsZWFzZXNcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9yZWxlYXNlcy8jbGlzdC1yZWxlYXNlcy1mb3ItYS1yZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgcmVsZWFzZSBpbmZvcm1hdGlvblxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBsaXN0UmVsZWFzZXMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9yZWxlYXNlc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYSByZWxlYXNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvcmVsZWFzZXMvI2dldC1hLXNpbmdsZS1yZWxlYXNlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgaWQgb2YgdGhlIHJlbGVhc2VcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSByZWxlYXNlIGluZm9ybWF0aW9uXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFJlbGVhc2UoaWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcmVsZWFzZXMvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgcmVsZWFzZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL3JlbGVhc2VzLyNkZWxldGUtYS1yZWxlYXNlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgcmVsZWFzZSB0byBiZSBkZWxldGVkXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBvcGVyYXRpb24gaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVSZWxlYXNlKGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3JlbGVhc2VzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIE1lcmdlIGEgcHVsbCByZXF1ZXN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHVsbHMvI21lcmdlLWEtcHVsbC1yZXF1ZXN0LW1lcmdlLWJ1dHRvblxuICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBudW1iZXIgLSB0aGUgbnVtYmVyIG9mIHRoZSBwdWxsIHJlcXVlc3QgdG8gbWVyZ2VcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIG1lcmdlIG9wdGlvbnMgZm9yIHRoZSBwdWxsIHJlcXVlc3RcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIG1lcmdlIGluZm9ybWF0aW9uIGlmIHRoZSBvcGVyYXRpb24gaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBtZXJnZVB1bGxSZXF1ZXN0KG51bWJlciwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQVVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9wdWxscy8ke251bWJlcn0vbWVyZ2VgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGFsbCBwcm9qZWN0c1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3Byb2plY3RzLyNsaXN0LXJlcG9zaXRvcnktcHJvamVjdHNcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgcHJvamVjdHNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdFByb2plY3RzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdEFsbFBhZ2VzKGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3Byb2plY3RzYCwge0FjY2VwdEhlYWRlcjogJ2luZXJ0aWEtcHJldmlldyd9LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IHByb2plY3RcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9wcm9qZWN0cy8jY3JlYXRlLWEtcmVwb3NpdG9yeS1wcm9qZWN0XG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgcHJvamVjdFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ld2x5IGNyZWF0ZWQgcHJvamVjdFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVQcm9qZWN0KG9wdGlvbnMsIGNiKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgIG9wdGlvbnMuQWNjZXB0SGVhZGVyID0gJ2luZXJ0aWEtcHJldmlldyc7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3Byb2plY3RzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVwb3NpdG9yeTtcbiJdfQ==
//# sourceMappingURL=Repository.js.map
