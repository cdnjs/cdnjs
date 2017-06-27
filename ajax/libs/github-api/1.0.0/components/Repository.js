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
   /**
    * @file
    * @copyright  2013 Michael Aufreiter (Development Seed) and 2016 Yahoo Inc.
    * @license    Licensed under {@link https://spdx.org/licenses/BSD-3-Clause-Clear.html BSD-3-Clause-Clear}.
    *             Github.js is freely distributable.
    */

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
               log('Not sure what this content is: ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)) + ', ' + JSON.stringify(content));
               throw new Error('Unknown content passed to postBlob. Must be string or Buffer (node) or Blob (web)');
            }
         }
      }, {
         key: 'updateTree',
         value: function updateTree(baseTreeSHA, path, blobSHA, cb) {
            var newTree = {
               'base_tree': baseTreeSHA,
               'tree': [{
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
            return this._request('POST', '/repos/' + this.__fullname + '/git/trees', { tree: tree, base_tree: baseSHA }, cb); // jscs:ignore
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
               _this2.__currentTree.sha = response.sha; // Update latest commit
               return response;
            });
         }
      }, {
         key: 'updateHead',
         value: function updateHead(ref, commitSHA, cb) {
            return this._request('PATCH', '/repos/' + this.__fullname + '/git/refs/' + ref, { sha: commitSHA }, cb);
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
            return this._request('GET', '/repos/' + this.__fullname + '/contents/' + path, { ref: ref }, cb, raw);
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
               return _this3.createRef({ sha: sha, ref: 'refs/heads/' + newBranch }, cb);
            });
         }
      }, {
         key: 'createPullRequest',
         value: function createPullRequest(options, cb) {
            return this._request('POST', '/repos/' + this.__fullname + '/pulls', options, cb);
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

            this.getSha(branch, path).then(function (response) {
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
         value: function move(branch, path, newPath, cb) {
            return this._updateTree(branch, function (err, latestCommit) {
               this.getTree(latestCommit + '?recursive=true', function (err, tree) {
                  // Update Tree
                  tree.forEach(function (ref) {
                     if (ref.path === path) {
                        ref.path = newPath;
                     }

                     if (ref.type === 'tree') {
                        delete ref.sha;
                     }
                  });

                  this.postTree(tree, function (err, rootTree) {
                     this.commit(latestCommit, rootTree, 'Deleted ' + path, function (err, commit) {
                        this.updateHead(branch, commit, cb);
                     });
                  });
               });
            });
         }
      }, {
         key: '_updateTree',
         value: function _updateTree(branch, cb) {
            if (branch === this.__currentTree.branch && this.__currentTree.sha) {
               return cb(null, this.__currentTree.sha);
            }

            this.getRef('heads/' + branch, function (err, sha) {
               this.__currentTree.branch = branch;
               this.__currentTree.sha = sha;
               cb(err, sha);
            });
         }
      }, {
         key: 'writeFile',
         value: function writeFile(branch, path, content, message, options, cb) {
            var _this5 = this;

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
               return _this5._request('PUT', '/repos/' + _this5.__fullname + '/contents/' + filePath, commit, cb);
            }, function () {
               return _this5._request('PUT', '/repos/' + _this5.__fullname + '/contents/' + filePath, commit, cb);
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
         key: 'getRelease',
         value: function getRelease(id, cb) {
            return this._request('GET', '/repos/' + this.__fullname + '/releases/' + id, null, cb);
         }
      }, {
         key: 'deleteRelease',
         value: function deleteRelease(id, cb) {
            return this._request('DELETE', '/repos/' + this.__fullname + '/releases/' + id, null, cb);
         }
      }]);

      return Repository;
   }(_Requestable3.default);

   module.exports = Repository;
});
//# sourceMappingURL=data:application/json;base64,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YyxPQUFkLGNBQWlDLEtBQUssVUFBdEMsa0JBQTZELEVBQTdELEVBQW1FLE9BQW5FLEVBQTRFLEVBQTVFLENBQVA7QUFDRjs7O29DQVNVLEUsRUFBSSxFLEVBQUk7QUFDaEIsbUJBQU8sS0FBSyxRQUFMLENBQWMsS0FBZCxjQUErQixLQUFLLFVBQXBDLGtCQUEyRCxFQUEzRCxFQUFpRSxJQUFqRSxFQUF1RSxFQUF2RSxDQUFQO0FBQ0Y7Ozt1Q0FTYSxFLEVBQUksRSxFQUFJO0FBQ25CLG1CQUFPLEtBQUssUUFBTCxDQUFjLFFBQWQsY0FBa0MsS0FBSyxVQUF2QyxrQkFBOEQsRUFBOUQsRUFBb0UsSUFBcEUsRUFBMEUsRUFBMUUsQ0FBUDtBQUNGOzs7Ozs7QUFHSixVQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiUmVwb3NpdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHQgIDIwMTMgTWljaGFlbCBBdWZyZWl0ZXIgKERldmVsb3BtZW50IFNlZWQpIGFuZCAyMDE2IFlhaG9vIEluYy5cbiAqIEBsaWNlbnNlICAgIExpY2Vuc2VkIHVuZGVyIHtAbGluayBodHRwczovL3NwZHgub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZS1DbGVhci5odG1sIEJTRC0zLUNsYXVzZS1DbGVhcn0uXG4gKiAgICAgICAgICAgICBHaXRodWIuanMgaXMgZnJlZWx5IGRpc3RyaWJ1dGFibGUuXG4gKi9cblxuaW1wb3J0IFJlcXVlc3RhYmxlIGZyb20gJy4vUmVxdWVzdGFibGUnO1xuaW1wb3J0IFV0ZjggZnJvbSAndXRmOCc7XG5pbXBvcnQge0Jhc2U2NH0gZnJvbSAnanMtYmFzZTY0JztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5jb25zdCBsb2cgPSBkZWJ1ZygnZ2l0aHViOnJlcG9zaXRvcnknKTtcblxuLyoqXG4gKiBSZXNwb3NpdG9yeSBlbmNhcHN1bGF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gY3JlYXRlLCBxdWVyeSwgYW5kIG1vZGlmeSBmaWxlcy5cbiAqL1xuY2xhc3MgUmVwb3NpdG9yeSBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgUmVwb3NpdG9yeS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBmdWxsbmFtZSAtIHRoZSBmdWxsIG5hbWUgb2YgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuYXV0aH0gW2F1dGhdIC0gaW5mb3JtYXRpb24gcmVxdWlyZWQgdG8gYXV0aGVudGljYXRlIHRvIEdpdGh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlPWh0dHBzOi8vYXBpLmdpdGh1Yi5jb21dIC0gdGhlIGJhc2UgR2l0aHViIEFQSSBVUkxcbiAgICAqL1xuICAgY29uc3RydWN0b3IoZnVsbG5hbWUsIGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgICAgdGhpcy5fX2Z1bGxuYW1lID0gZnVsbG5hbWU7XG4gICAgICB0aGlzLl9fY3VycmVudFRyZWUgPSB7XG4gICAgICAgICBicmFuY2g6IG51bGwsXG4gICAgICAgICBzaGE6IG51bGxcbiAgICAgIH07XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgcmVmZXJlbmNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3JlZnMvI2dldC1hLXJlZmVyZW5jZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSByZWZlcmVuY2UgdG8gZ2V0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSByZWZlcmVuY2UncyByZWZTcGVjIG9yIGEgbGlzdCBvZiByZWZTcGVjcyB0aGF0IG1hdGNoIGByZWZgXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFJlZihyZWYsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3JlZnMvJHtyZWZ9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIHJlZmVyZW5jZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9yZWZzLyNjcmVhdGUtYS1yZWZlcmVuY2VcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIG9iamVjdCBkZXNjcmliaW5nIHRoZSByZWZcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIHJlZlxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVSZWYob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3JlZnNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgcmVmZXJlbmNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3JlZnMvI2RlbGV0ZS1hLXJlZmVyZW5jZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIHRoZSBuYW1lIG9mIHRoZSByZWYgdG8gZGVsdGVcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVxdWVzdCBpcyBzdWNjZXNzZnVsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGRlbGV0ZVJlZihyZWYsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZ2l0L3JlZnMvJHtyZWZ9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jZGVsZXRlLWEtcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZGVsZXRlUmVwbyhjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIHRhZ3Mgb24gYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2xpc3QtdGFnc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgdGFnIGRhdGFcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdFRhZ3MoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS90YWdzYCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgdGhlIG9wZW4gcHVsbCByZXF1ZXN0cyBvbiB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3B1bGxzLyNsaXN0LXB1bGwtcmVxdWVzdHNcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyB0byBmaWx0ZXIgdGhlIHNlYXJjaFxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiBQUnNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdFB1bGxSZXF1ZXN0cyhvcHRpb25zLCBjYikge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHVsbHNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IGEgc3BlY2lmaWMgcHVsbCByZXF1ZXN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHVsbHMvI2dldC1hLXNpbmdsZS1wdWxsLXJlcXVlc3RcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgLSB0aGUgUFIgeW91IHdpc2ggdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IFtjYl0gLSB3aWxsIHJlY2VpdmUgdGhlIFBSIGZyb20gdGhlIEFQSVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRQdWxsUmVxdWVzdChudW1iZXIsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcHVsbHMvJHtudW1iZXJ9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENvbXBhcmUgdHdvIGJyYW5jaGVzL2NvbW1pdHMvcmVwb3NpdG9yaWVzXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29tbWl0cy8jY29tcGFyZS10d28tY29tbWl0c1xuICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2UgLSB0aGUgYmFzZSBjb21taXRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkIC0gdGhlIGhlYWQgY29tbWl0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tcGFyaXNvblxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjb21wYXJlQnJhbmNoZXMoYmFzZSwgaGVhZCwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb21wYXJlLyR7YmFzZX0uLi4ke2hlYWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIExpc3QgYWxsIHRoZSBicmFuY2hlcyBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jbGlzdC1icmFuY2hlc1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgYnJhbmNoZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdEJyYW5jaGVzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vYnJhbmNoZXNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgcmF3IGJsb2IgZnJvbSB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL2dpdC9ibG9icy8jZ2V0LWEtYmxvYlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNoYSAtIHRoZSBzaGEgb2YgdGhlIGJsb2IgdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBibG9iIGZyb20gdGhlIEFQSVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRCbG9iKHNoYSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvYmxvYnMvJHtzaGF9YCwgbnVsbCwgY2IsICdyYXcnKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBjb21taXQgZnJvbSB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbW1pdHMvI2dldC1hLXNpbmdsZS1jb21taXRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaGEgLSB0aGUgc2hhIGZvciB0aGUgY29tbWl0IHRvIGZldGNoXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWl0IGRhdGFcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgZ2V0Q29tbWl0KHNoYSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvY29tbWl0cy8ke3NoYX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgY29tbWl0cyBvbiBhIHJlcG9zaXRvcnksIG9wdGlvbmFsbHkgZmlsdGVyaW5nIGJ5IHBhdGgsIGF1dGhvciBvciB0aW1lIHJhbmdlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29tbWl0cy8jbGlzdC1jb21taXRzLW9uLWEtcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnNoYV0gLSB0aGUgU0hBIG9yIGJyYW5jaCB0byBzdGFydCBmcm9tXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucGF0aF0gLSB0aGUgcGF0aCB0byBzZWFyY2ggb25cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5hdXRob3JdIC0gdGhlIGNvbW1pdCBhdXRob3JcbiAgICAqIEBwYXJhbSB7KERhdGV8c3RyaW5nKX0gW29wdGlvbnMuc2luY2VdIC0gb25seSBjb21taXRzIGFmdGVyIHRoaXMgZGF0ZSB3aWxsIGJlIHJldHVybmVkXG4gICAgKiBAcGFyYW0geyhEYXRlfHN0cmluZyl9IFtvcHRpb25zLnVudGlsXSAtIG9ubHkgY29tbWl0cyBiZWZvcmUgdGhpcyBkYXRlIHdpbGwgYmUgcmV0dXJuZWRcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGNvbW1pdHMgZm91bmQgbWF0Y2hpbmcgdGhlIGNyaXRlcmlhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGxpc3RDb21taXRzKG9wdGlvbnMsIGNiKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgb3B0aW9ucy5zaW5jZSA9IHRoaXMuX2RhdGVUb0lTTyhvcHRpb25zLnNpbmNlKTtcbiAgICAgIG9wdGlvbnMudW50aWwgPSB0aGlzLl9kYXRlVG9JU08ob3B0aW9ucy51bnRpbCk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb21taXRzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEdldCB0aGEgc2hhIGZvciBhIHBhcnRpY3VsYXIgb2JqZWN0IGluIHRoZSByZXBvc2l0b3J5LiBUaGlzIGlzIGEgY29udmVuaWVuY2UgZnVuY3Rpb25cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb250ZW50cy8jZ2V0LWNvbnRlbnRzXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gW2JyYW5jaF0gLSB0aGUgYnJhbmNoIHRvIGxvb2sgaW4sIG9yIHRoZSByZXBvc2l0b3J5J3MgZGVmYXVsdCBicmFuY2ggaWYgb21pdHRlZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBvZiB0aGUgZmlsZSBvciBkaXJlY3RvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIGEgZGVzY3JpcHRpb24gb2YgdGhlIHJlcXVlc3RlZCBvYmplY3QsIGluY2x1ZGluZyBhIGBTSEFgIHByb3BlcnR5XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFNoYShicmFuY2gsIHBhdGgsIGNiKSB7XG4gICAgICBicmFuY2ggPSBicmFuY2ggPyBgP3JlZj0ke2JyYW5jaH1gIDogJyc7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29udGVudHMvJHtwYXRofSR7YnJhbmNofWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBjb21taXQgc3RhdHVzZXMgZm9yIGEgcGFydGljdWxhciBzaGEsIGJyYW5jaCwgb3IgdGFnXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3Mvc3RhdHVzZXMvI2xpc3Qtc3RhdHVzZXMtZm9yLWEtc3BlY2lmaWMtcmVmXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhIC0gdGhlIHNoYSwgYnJhbmNoLCBvciB0YWcgdG8gZ2V0IHN0YXR1c2VzIGZvclxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2Ygc3RhdHVzZXNcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdFN0YXR1c2VzKHNoYSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb21taXRzLyR7c2hhfS9zdGF0dXNlc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgYSBkZXNjcmlwdGlvbiBvZiBhIGdpdCB0cmVlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3RyZWVzLyNnZXQtYS10cmVlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdHJlZVNIQSAtIHRoZSBTSEEgb2YgdGhlIHRyZWUgdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjYWxsYmFjayBkYXRhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFRyZWUodHJlZVNIQSwgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvdHJlZXMvJHt0cmVlU0hBfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBibG9iXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L2Jsb2JzLyNjcmVhdGUtYS1ibG9iXG4gICAgKiBAcGFyYW0geyhzdHJpbmd8QnVmZmVyfEJsb2IpfSBjb250ZW50IC0gdGhlIGNvbnRlbnQgdG8gYWRkIHRvIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgZGV0YWlscyBvZiB0aGUgY3JlYXRlZCBibG9iXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZUJsb2IoY29udGVudCwgY2IpIHtcbiAgICAgIGxldCBwb3N0Qm9keSA9IHRoaXMuX2dldENvbnRlbnRPYmplY3QoY29udGVudCk7XG5cbiAgICAgIGxvZygnc2VuZGluZyBjb250ZW50JywgcG9zdEJvZHkpO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvYmxvYnNgLCBwb3N0Qm9keSwgY2IpO1xuICAgfVxuXG4gICBfZ2V0Q29udGVudE9iamVjdChjb250ZW50KSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICBsb2coJ2NvbnRldCBpcyBhIHN0cmluZycpO1xuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFV0ZjguZW5jb2RlKGNvbnRlbnQpLFxuICAgICAgICAgICAgZW5jb2Rpbmc6ICd1dGYtOCdcbiAgICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGNvbnRlbnQgaW5zdGFuY2VvZiBCdWZmZXIpIHtcbiAgICAgICAgIGxvZygnV2UgYXBwZWFyIHRvIGJlIGluIE5vZGUnKTtcbiAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LnRvU3RyaW5nKCdiYXNlNjQnKSxcbiAgICAgICAgICAgIGVuY29kaW5nOiAnYmFzZTY0J1xuICAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGNvbnRlbnQgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICBsb2coJ1dlIGFwcGVhciB0byBiZSBpbiB0aGUgYnJvd3NlcicpO1xuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IEJhc2U2NC5lbmNvZGUoY29udGVudCksXG4gICAgICAgICAgICBlbmNvZGluZzogJ2Jhc2U2NCdcbiAgICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbG9nKGBOb3Qgc3VyZSB3aGF0IHRoaXMgY29udGVudCBpczogJHt0eXBlb2YgY29udGVudH0sICR7SlNPTi5zdHJpbmdpZnkoY29udGVudCl9YCk7XG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gY29udGVudCBwYXNzZWQgdG8gcG9zdEJsb2IuIE11c3QgYmUgc3RyaW5nIG9yIEJ1ZmZlciAobm9kZSkgb3IgQmxvYiAod2ViKScpO1xuICAgICAgfVxuICAgfVxuXG4gICAvKipcbiAgICAqIFVwZGF0ZSBhIHRyZWUgaW4gR2l0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L3RyZWVzLyNjcmVhdGUtYS10cmVlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVRyZWVTSEEgLSB0aGUgU0hBIG9mIHRoZSB0cmVlIHRvIHVwZGF0ZVxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBmb3IgdGhlIG5ldyBmaWxlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmxvYlNIQSAtIHRoZSBTSEEgZm9yIHRoZSBibG9iIHRvIHB1dCBhdCBgcGF0aGBcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgdHJlZSB0aGF0IGlzIGNyZWF0ZWRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgUmVwb3NpdG9yeSNwb3N0VHJlZX0gaW5zdGVhZFxuICAgICovXG4gICB1cGRhdGVUcmVlKGJhc2VUcmVlU0hBLCBwYXRoLCBibG9iU0hBLCBjYikge1xuICAgICAgbGV0IG5ld1RyZWUgPSB7XG4gICAgICAgICAnYmFzZV90cmVlJzogYmFzZVRyZWVTSEEsXG4gICAgICAgICAndHJlZSc6IFt7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgc2hhOiBibG9iU0hBLFxuICAgICAgICAgICAgbW9kZTogJzEwMDY0NCcsXG4gICAgICAgICAgICB0eXBlOiAnYmxvYidcbiAgICAgICAgIH1dXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC90cmVlc2AsIG5ld1RyZWUsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgdHJlZSBpbiBnaXRcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvdHJlZXMvI2NyZWF0ZS1hLXRyZWVcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSB0cmVlIC0gdGhlIHRyZWUgdG8gY3JlYXRlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVNIQSAtIHRoZSByb290IHNoYSBvZiB0aGUgdHJlZVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ldyB0cmVlIHRoYXQgaXMgY3JlYXRlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVUcmVlKHRyZWUsIGJhc2VTSEEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC90cmVlc2AsIHt0cmVlLCBiYXNlX3RyZWU6IGJhc2VTSEF9LCBjYik7IC8vIGpzY3M6aWdub3JlXG4gICB9XG5cbiAgIC8qKlxuICAgICogQWRkIGEgY29tbWl0IHRvIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvZ2l0L2NvbW1pdHMvI2NyZWF0ZS1hLWNvbW1pdFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudCAtIHRoZSBTSEEgb2YgdGhlIHBhcmVudCBjb21taXRcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSB0cmVlIC0gdGhlIHRyZWUgdGhhdCBkZXNjcmliZXMgdGhpcyBjb21taXRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIGNvbW1pdCBtZXNzYWdlXG4gICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgY29tbWl0IHRoYXQgaXMgY3JlYXRlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjb21taXQocGFyZW50LCB0cmVlLCBtZXNzYWdlLCBjYikge1xuICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgdHJlZSxcbiAgICAgICAgIHBhcmVudHM6IFtwYXJlbnRdXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2dpdC9jb21taXRzYCwgZGF0YSwgY2IpXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX19jdXJyZW50VHJlZS5zaGEgPSByZXNwb25zZS5zaGE7IC8vIFVwZGF0ZSBsYXRlc3QgY29tbWl0XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBVcGRhdGUgYSByZWZcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9naXQvcmVmcy8jdXBkYXRlLWEtcmVmZXJlbmNlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmIC0gdGhlIHJlZiB0byB1cGRhdGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21taXRTSEEgLSB0aGUgU0hBIHRvIHBvaW50IHRoZSByZWZlcmVuY2UgdG9cbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gd2lsbCByZWNlaXZlIHRoZSB1cGRhdGVkIHJlZiBiYWNrXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVwZGF0ZUhlYWQocmVmLCBjb21taXRTSEEsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9naXQvcmVmcy8ke3JlZn1gLCB7c2hhOiBjb21taXRTSEF9LCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvI2dldFxuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSByZXBvc2l0b3J5XG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldERldGFpbHMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBjb250cmlidXRvcnMgdG8gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy8jbGlzdC1jb250cmlidXRvcnNcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBsaXN0IG9mIGNvbnRyaWJ1dG9yc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRDb250cmlidXRvcnMoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9zdGF0cy9jb250cmlidXRvcnNgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCB0aGUgdXNlcnMgd2hvIGFyZSBjb2xsYWJvcmF0b3JzIG9uIHRoZSByZXBvc2l0b3J5LiBUaGUgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgdXNlciBtdXN0IGhhdmVcbiAgICAqIHB1c2ggYWNjZXNzIHRvIHVzZSB0aGlzIG1ldGhvZFxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbGxhYm9yYXRvcnMvI2xpc3QtY29sbGFib3JhdG9yc1xuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgY29sbGFib3JhdG9yc1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRDb2xsYWJvcmF0b3JzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29sbGFib3JhdG9yc2AsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDaGVjayBpZiBhIHVzZXIgaXMgYSBjb2xsYWJvcmF0b3Igb24gdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9jb2xsYWJvcmF0b3JzLyNjaGVjay1pZi1hLXVzZXItaXMtYS1jb2xsYWJvcmF0b3JcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSAtIHRoZSB1c2VyIHRvIGNoZWNrXG4gICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSB1c2VyIGlzIGEgY29sbGFib3JhdG9yIGFuZCBmYWxzZSBpZiB0aGV5IGFyZSBub3RcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3Qge0Jvb2xlYW59IFtkZXNjcmlwdGlvbl1cbiAgICAqL1xuICAgaXNDb2xsYWJvcmF0b3IodXNlcm5hbWUsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vY29sbGFib3JhdG9ycy8ke3VzZXJuYW1lfWAsIG51bGwsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgdGhlIGNvbnRlbnRzIG9mIGEgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbnRlbnRzLyNnZXQtY29udGVudHNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSB0aGUgcmVmIHRvIGNoZWNrXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHRoZSBwYXRoIGNvbnRhaW5pbmcgdGhlIGNvbnRlbnQgdG8gZmV0Y2hcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmF3IC0gYHRydWVgIGlmIHRoZSByZXN1bHRzIHNob3VsZCBiZSByZXR1cm5lZCByYXcgaW5zdGVhZCBvZiBHaXRIdWIncyBub3JtYWxpemVkIGZvcm1hdFxuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGZldGNoZWQgZGF0YVxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRDb250ZW50cyhyZWYsIHBhdGgsIHJhdywgY2IpIHtcbiAgICAgIHBhdGggPSBwYXRoID8gYCR7ZW5jb2RlVVJJKHBhdGgpfWAgOiAnJztcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdHRVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb250ZW50cy8ke3BhdGh9YCwge3JlZn0sIGNiLCByYXcpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEZvcmsgYSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvZm9ya3MvI2NyZWF0ZS1hLWZvcmtcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbmV3bHkgY3JlYXRlZCBmb3JrXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGZvcmsoY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZm9ya3NgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogTGlzdCBhIHJlcG9zaXRvcnkncyBmb3Jrc1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2ZvcmtzLyNsaXN0LWZvcmtzXG4gICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbGlzdCBvZiByZXBvc2l0b3JpZXMgZm9ya2VkIGZyb20gdGhpcyBvbmVcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdEZvcmtzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vZm9ya3NgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IGJyYW5jaCBmcm9tIGFuIGV4aXN0aW5nIGJyYW5jaC5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb2xkQnJhbmNoPW1hc3Rlcl0gLSB0aGUgbmFtZSBvZiB0aGUgZXhpc3RpbmcgYnJhbmNoXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3QnJhbmNoIC0gdGhlIG5hbWUgb2YgdGhlIG5ldyBicmFuY2hcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb21taXQgZGF0YSBmb3IgdGhlIGhlYWQgb2YgdGhlIG5ldyBicmFuY2hcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgY3JlYXRlQnJhbmNoKG9sZEJyYW5jaCwgbmV3QnJhbmNoLCBjYikge1xuICAgICAgaWYgKHR5cGVvZiBuZXdCcmFuY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgIGNiID0gbmV3QnJhbmNoO1xuICAgICAgICAgbmV3QnJhbmNoID0gb2xkQnJhbmNoO1xuICAgICAgICAgb2xkQnJhbmNoID0gJ21hc3Rlcic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFJlZihgaGVhZHMvJHtvbGRCcmFuY2h9YClcbiAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHNoYSA9IHJlc3BvbnNlLmRhdGEub2JqZWN0LnNoYTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlZih7c2hhLCByZWY6IGByZWZzL2hlYWRzLyR7bmV3QnJhbmNofWB9LCBjYik7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgcHVsbCByZXF1ZXN0XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcHVsbHMvI2NyZWF0ZS1hLXB1bGwtcmVxdWVzdFxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgcHVsbCByZXF1ZXN0IGRlc2NyaXB0aW9uXG4gICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3IHB1bGwgcmVxdWVzdFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVQdWxsUmVxdWVzdChvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BPU1QnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9wdWxsc2AsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBMaXN0IHRoZSBob29rcyBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9ob29rcy8jbGlzdC1ob29rc1xuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGxpc3Qgb2YgaG9va3NcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgbGlzdEhvb2tzKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vaG9va3NgLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogR2V0IGEgaG9vayBmb3IgdGhlIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9ob29rcy8jZ2V0LXNpbmdsZS1ob29rXG4gICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgaWQgb2YgdGhlIHdlYm9va1xuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIGRldGFpbHMgb2YgdGhlIHdlYm9va1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBnZXRIb29rKGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEFkZCBhIG5ldyBob29rIHRvIHRoZSByZXBvc2l0b3J5XG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvaG9va3MvI2NyZWF0ZS1hLWhvb2tcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGNvbmZpZ3VyYXRpb24gZGVzY3JpYmluZyB0aGUgbmV3IGhvb2tcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBuZXcgd2ViaG9va1xuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBjcmVhdGVIb29rKG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUE9TVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzYCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIEVkaXQgYW4gZXhpc3Rpbmcgd2ViaG9va1xuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2hvb2tzLyNlZGl0LWEtaG9va1xuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSB3ZWJob29rXG4gICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHRoZSBuZXcgZGVzY3JpcHRpb24gb2YgdGhlIHdlYmhvb2tcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gd2lsbCByZWNlaXZlIHRoZSB1cGRhdGVkIHdlYmhvb2tcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgdXBkYXRlSG9vayhpZCwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQQVRDSCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2hvb2tzLyR7aWR9YCwgb3B0aW9ucywgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIERlbGV0ZSBhIHdlYmhvb2tcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9ob29rcy8jZGVsZXRlLWEtaG9va1xuICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGlkIG9mIHRoZSB3ZWJob29rIHRvIGJlIGRlbGV0ZWRcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIGNhbGwgaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVIb29rKGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAke3RoaXMuX19yZXBvUGF0aH0vaG9va3MvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgZmlsZSBmcm9tIGEgYnJhbmNoXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvY29udGVudHMvI2RlbGV0ZS1hLWZpbGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBicmFuY2ggLSB0aGUgYnJhbmNoIHRvIGRlbGV0ZSBmcm9tLCBvciB0aGUgZGVmYXVsdCBicmFuY2ggaWYgbm90IHNwZWNpZmllZFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBvZiB0aGUgZmlsZSB0byByZW1vdmVcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBjb21taXQgaW4gd2hpY2ggdGhlIGRlbGV0ZSBvY2N1cnJlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVGaWxlKGJyYW5jaCwgcGF0aCwgY2IpIHtcbiAgICAgIHRoaXMuZ2V0U2hhKGJyYW5jaCwgcGF0aClcbiAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlQ29tbWl0ID0ge1xuICAgICAgICAgICAgICAgbWVzc2FnZTogYERlbGV0ZSB0aGUgZmlsZSBhdCAnJHtwYXRofSdgLFxuICAgICAgICAgICAgICAgc2hhOiByZXNwb25zZS5kYXRhLnNoYSxcbiAgICAgICAgICAgICAgIGJyYW5jaFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdERUxFVEUnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb250ZW50cy8ke3BhdGh9YCwgZGVsZXRlQ29tbWl0LCBjYik7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLy8gTW92ZSBhIGZpbGUgdG8gYSBuZXcgbG9jYXRpb25cbiAgIC8vIC0tLS0tLS1cbiAgIG1vdmUoYnJhbmNoLCBwYXRoLCBuZXdQYXRoLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZVRyZWUoYnJhbmNoLCBmdW5jdGlvbihlcnIsIGxhdGVzdENvbW1pdCkge1xuICAgICAgICAgdGhpcy5nZXRUcmVlKGxhdGVzdENvbW1pdCArICc/cmVjdXJzaXZlPXRydWUnLCBmdW5jdGlvbihlcnIsIHRyZWUpIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBUcmVlXG4gICAgICAgICAgICB0cmVlLmZvckVhY2goZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICBpZiAocmVmLnBhdGggPT09IHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgIHJlZi5wYXRoID0gbmV3UGF0aDtcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgaWYgKHJlZi50eXBlID09PSAndHJlZScpIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZWYuc2hhO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucG9zdFRyZWUodHJlZSwgZnVuY3Rpb24oZXJyLCByb290VHJlZSkge1xuICAgICAgICAgICAgICAgdGhpcy5jb21taXQobGF0ZXN0Q29tbWl0LCByb290VHJlZSwgJ0RlbGV0ZWQgJyArIHBhdGgsIGZ1bmN0aW9uKGVyciwgY29tbWl0KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWQoYnJhbmNoLCBjb21taXQsIGNiKTtcbiAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBfdXBkYXRlVHJlZShicmFuY2gsIGNiKSB7XG4gICAgICBpZiAoYnJhbmNoID09PSB0aGlzLl9fY3VycmVudFRyZWUuYnJhbmNoICYmIHRoaXMuX19jdXJyZW50VHJlZS5zaGEpIHtcbiAgICAgICAgIHJldHVybiBjYihudWxsLCB0aGlzLl9fY3VycmVudFRyZWUuc2hhKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5nZXRSZWYoYGhlYWRzLyR7YnJhbmNofWAsIGZ1bmN0aW9uKGVyciwgc2hhKSB7XG4gICAgICAgICB0aGlzLl9fY3VycmVudFRyZWUuYnJhbmNoID0gYnJhbmNoO1xuICAgICAgICAgdGhpcy5fX2N1cnJlbnRUcmVlLnNoYSA9IHNoYTtcbiAgICAgICAgIGNiKGVyciwgc2hhKTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFdyaXRlIGEgZmlsZSB0byB0aGUgcmVwb3NpdG9yeVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL2NvbnRlbnRzLyN1cGRhdGUtYS1maWxlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gYnJhbmNoIC0gdGhlIG5hbWUgb2YgdGhlIGJyYW5jaFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSB0aGUgcGF0aCBmb3IgdGhlIGZpbGVcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IC0gdGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSBjb21taXQgbWVzc2FnZVxuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmF1dGhvcl0gLSB0aGUgYXV0aG9yIG9mIHRoZSBjb21taXRcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5jb21taXRlcl0gLSB0aGUgY29tbWl0dGVyXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmVuY29kZV0gLSB0cnVlIGlmIHRoZSBjb250ZW50IHNob3VsZCBiZSBiYXNlNjQgZW5jb2RlZFxuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSB3aWxsIHJlY2VpdmUgdGhlIG5ldyBjb21taXRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgd3JpdGVGaWxlKGJyYW5jaCwgcGF0aCwgY29udGVudCwgbWVzc2FnZSwgb3B0aW9ucywgY2IpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgY2IgPSBvcHRpb25zO1xuICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuICAgICAgbGV0IGZpbGVQYXRoID0gcGF0aCA/IGVuY29kZVVSSShwYXRoKSA6ICcnO1xuICAgICAgbGV0IHNob3VsZEVuY29kZSA9IG9wdGlvbnMuZW5jb2RlICE9PSBmYWxzZTtcbiAgICAgIGxldCBjb21taXQgPSB7XG4gICAgICAgICBicmFuY2gsXG4gICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgYXV0aG9yOiBvcHRpb25zLmF1dGhvcixcbiAgICAgICAgIGNvbW1pdHRlcjogb3B0aW9ucy5jb21taXR0ZXIsXG4gICAgICAgICBjb250ZW50OiBzaG91bGRFbmNvZGUgPyBCYXNlNjQuZW5jb2RlKGNvbnRlbnQpIDogY29udGVudFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0U2hhKGJyYW5jaCwgZmlsZVBhdGgpXG4gICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbW1pdC5zaGEgPSByZXNwb25zZS5kYXRhLnNoYTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQVVQnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9jb250ZW50cy8ke2ZpbGVQYXRofWAsIGNvbW1pdCwgY2IpO1xuICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ1BVVCcsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L2NvbnRlbnRzLyR7ZmlsZVBhdGh9YCwgY29tbWl0LCBjYik7XG4gICAgICAgICB9KTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDaGVjayBpZiBhIHJlcG9zaXRvcnkgaXMgc3RhcnJlZCBieSB5b3VcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9hY3Rpdml0eS9zdGFycmluZy8jY2hlY2staWYteW91LWFyZS1zdGFycmluZy1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcG9zaXRvcnkgaXMgc3RhcnJlZCBhbmQgZmFsc2UgaWYgdGhlIHJlcG9zaXRvcnlcbiAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIG5vdCBzdGFycmVkXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0IHtCb29sZWFufSBbZGVzY3JpcHRpb25dXG4gICAgKi9cbiAgIGlzU3RhcnJlZChjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QyMDRvcjQwNChgL3VzZXIvc3RhcnJlZC8ke3RoaXMuX19mdWxsbmFtZX1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogU3RhciBhIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9hY3Rpdml0eS9zdGFycmluZy8jc3Rhci1hLXJlcG9zaXRvcnlcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRydWUgaWYgdGhlIHJlcG9zaXRvcnkgaXMgc3RhcnJlZFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBzdGFyKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUFVUJywgYC91c2VyL3N0YXJyZWQvJHt0aGlzLl9fZnVsbG5hbWV9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFVuc3RhciBhIHJlcG9zaXRvcnlcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9hY3Rpdml0eS9zdGFycmluZy8jdW5zdGFyLWEtcmVwb3NpdG9yeVxuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gY2IgLSB3aWxsIHJlY2VpdmUgdHJ1ZSBpZiB0aGUgcmVwb3NpdG9yeSBpcyB1bnN0YXJyZWRcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gdGhlIHByb21pc2UgZm9yIHRoZSBodHRwIHJlcXVlc3RcbiAgICAqL1xuICAgdW5zdGFyKGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnREVMRVRFJywgYC91c2VyL3N0YXJyZWQvJHt0aGlzLl9fZnVsbG5hbWV9YCwgbnVsbCwgY2IpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZSBhIG5ldyByZWxlYXNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvcmVsZWFzZXMvI2NyZWF0ZS1hLXJlbGVhc2VcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSByZWxlYXNlXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0aGUgbmV3bHkgY3JlYXRlZCByZWxlYXNlXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNyZWF0ZVJlbGVhc2Uob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcmVsZWFzZXNgLCBvcHRpb25zLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRWRpdCBhIHJlbGVhc2VcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yZXBvcy9yZWxlYXNlcy8jZWRpdC1hLXJlbGVhc2VcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgcmVsZWFzZVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIHJlbGVhc2VcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSBtb2RpZmllZCByZWxlYXNlXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIHVwZGF0ZVJlbGVhc2UoaWQsIG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnUEFUQ0gnLCBgL3JlcG9zLyR7dGhpcy5fX2Z1bGxuYW1lfS9yZWxlYXNlcy8ke2lkfWAsIG9wdGlvbnMsIGNiKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgYSByZWxlYXNlXG4gICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmdpdGh1Yi5jb20vdjMvcmVwb3MvcmVsZWFzZXMvI2dldC1hLXNpbmdsZS1yZWxlYXNlXG4gICAgKiBAcGFyYW0ge3N0cmlnbn0gaWQgLSB0aGUgaWQgb2YgdGhlIHJlbGVhc2VcbiAgICAqIEBwYXJhbSB7UmVxdWVzdGFibGUuY2FsbGJhY2t9IGNiIC0gd2lsbCByZWNlaXZlIHRoZSByZWxlYXNlIGluZm9ybWF0aW9uXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFJlbGVhc2UoaWQsIGNiKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdCgnR0VUJywgYC9yZXBvcy8ke3RoaXMuX19mdWxsbmFtZX0vcmVsZWFzZXMvJHtpZH1gLCBudWxsLCBjYik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRGVsZXRlIGEgcmVsZWFzZVxuICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5naXRodWIuY29tL3YzL3JlcG9zL3JlbGVhc2VzLyNkZWxldGUtYS1yZWxlYXNlXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgcmVsZWFzZSB0byBiZSBkZWxldGVkXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBjYiAtIHdpbGwgcmVjZWl2ZSB0cnVlIGlmIHRoZSBvcGVyYXRpb24gaXMgc3VjY2Vzc2Z1bFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICBkZWxldGVSZWxlYXNlKGlkLCBjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0RFTEVURScsIGAvcmVwb3MvJHt0aGlzLl9fZnVsbG5hbWV9L3JlbGVhc2VzLyR7aWR9YCwgbnVsbCwgY2IpO1xuICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcG9zaXRvcnk7XG4iXX0=
//# sourceMappingURL=Repository.js.map
