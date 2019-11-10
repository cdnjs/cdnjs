/*
 angular-file-upload v2.3.1
 https://github.com/nervgh/angular-file-upload
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["angular-file-upload"] = factory();
	else
		root["angular-file-upload"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _options = __webpack_require__(2);
	
	var _options2 = _interopRequireDefault(_options);
	
	var _FileUploader = __webpack_require__(3);
	
	var _FileUploader2 = _interopRequireDefault(_FileUploader);
	
	var _FileLikeObject = __webpack_require__(4);
	
	var _FileLikeObject2 = _interopRequireDefault(_FileLikeObject);
	
	var _FileItem = __webpack_require__(5);
	
	var _FileItem2 = _interopRequireDefault(_FileItem);
	
	var _FileDirective = __webpack_require__(6);
	
	var _FileDirective2 = _interopRequireDefault(_FileDirective);
	
	var _FileSelect = __webpack_require__(7);
	
	var _FileSelect2 = _interopRequireDefault(_FileSelect);
	
	var _FileDrop = __webpack_require__(8);
	
	var _FileDrop2 = _interopRequireDefault(_FileDrop);
	
	var _FileOver = __webpack_require__(9);
	
	var _FileOver2 = _interopRequireDefault(_FileOver);
	
	var _FileSelect3 = __webpack_require__(10);
	
	var _FileSelect4 = _interopRequireDefault(_FileSelect3);
	
	var _FileDrop3 = __webpack_require__(11);
	
	var _FileDrop4 = _interopRequireDefault(_FileDrop3);
	
	var _FileOver3 = __webpack_require__(12);
	
	var _FileOver4 = _interopRequireDefault(_FileOver3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	angular.module(_config2.default.name, []).value('fileUploaderOptions', _options2.default).factory('FileUploader', _FileUploader2.default).factory('FileLikeObject', _FileLikeObject2.default).factory('FileItem', _FileItem2.default).factory('FileDirective', _FileDirective2.default).factory('FileSelect', _FileSelect2.default).factory('FileDrop', _FileDrop2.default).factory('FileOver', _FileOver2.default).directive('nvFileSelect', _FileSelect4.default).directive('nvFileDrop', _FileDrop4.default).directive('nvFileOver', _FileOver4.default).run(['FileUploader', 'FileLikeObject', 'FileItem', 'FileDirective', 'FileSelect', 'FileDrop', 'FileOver', function (FileUploader, FileLikeObject, FileItem, FileDirective, FileSelect, FileDrop, FileOver) {
	    // only for compatibility
	    FileUploader.FileLikeObject = FileLikeObject;
	    FileUploader.FileItem = FileItem;
	    FileUploader.FileDirective = FileDirective;
	    FileUploader.FileSelect = FileSelect;
	    FileUploader.FileDrop = FileDrop;
	    FileUploader.FileOver = FileOver;
	}]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
		"name": "angularFileUpload"
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    url: '/',
	    alias: 'file',
	    headers: {},
	    queue: [],
	    progress: 0,
	    autoUpload: false,
	    removeAfterUpload: false,
	    method: 'POST',
	    filters: [],
	    formData: [],
	    queueLimit: Number.MAX_VALUE,
	    withCredentials: false,
	    disableMultipart: false
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = __identity;
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _angular = angular;
	var copy = _angular.copy;
	var extend = _angular.extend;
	var forEach = _angular.forEach;
	var isObject = _angular.isObject;
	var isNumber = _angular.isNumber;
	var isDefined = _angular.isDefined;
	var isArray = _angular.isArray;
	var element = _angular.element;
	function __identity(fileUploaderOptions, $rootScope, $http, $window, FileLikeObject, FileItem) {
	    var File = $window.File;
	    var FormData = $window.FormData;
	
	    var FileUploader = function () {
	        /**********************
	         * PUBLIC
	         **********************/
	        /**
	         * Creates an instance of FileUploader
	         * @param {Object} [options]
	         * @constructor
	         */
	
	        function FileUploader(options) {
	            _classCallCheck(this, FileUploader);
	
	            var settings = copy(fileUploaderOptions);
	
	            extend(this, settings, options, {
	                isUploading: false,
	                _nextIndex: 0,
	                _failFilterIndex: -1,
	                _directives: { select: [], drop: [], over: [] }
	            });
	
	            // add default filters
	            this.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
	            this.filters.unshift({ name: 'folder', fn: this._folderFilter });
	        }
	        /**
	         * Adds items to the queue
	         * @param {File|HTMLInputElement|Object|FileList|Array<Object>} files
	         * @param {Object} [options]
	         * @param {Array<Function>|String} filters
	         */
	
	
	        _createClass(FileUploader, [{
	            key: 'addToQueue',
	            value: function addToQueue(files, options, filters) {
	                var _this = this;
	
	                var list = this.isArrayLikeObject(files) ? files : [files];
	                var arrayOfFilters = this._getFilters(filters);
	                var count = this.queue.length;
	                var addedFileItems = [];
	
	                forEach(list, function (some /*{File|HTMLInputElement|Object}*/) {
	                    var temp = new FileLikeObject(some);
	
	                    if (_this._isValidFile(temp, arrayOfFilters, options)) {
	                        var fileItem = new FileItem(_this, some, options);
	                        addedFileItems.push(fileItem);
	                        _this.queue.push(fileItem);
	                        _this._onAfterAddingFile(fileItem);
	                    } else {
	                        var filter = arrayOfFilters[_this._failFilterIndex];
	                        _this._onWhenAddingFileFailed(temp, filter, options);
	                    }
	                });
	
	                if (this.queue.length !== count) {
	                    this._onAfterAddingAll(addedFileItems);
	                    this.progress = this._getTotalProgress();
	                }
	
	                this._render();
	                if (this.autoUpload) this.uploadAll();
	            }
	            /**
	             * Remove items from the queue. Remove last: index = -1
	             * @param {FileItem|Number} value
	             */
	
	        }, {
	            key: 'removeFromQueue',
	            value: function removeFromQueue(value) {
	                var index = this.getIndexOfItem(value);
	                var item = this.queue[index];
	                if (item.isUploading) item.cancel();
	                this.queue.splice(index, 1);
	                item._destroy();
	                this.progress = this._getTotalProgress();
	            }
	            /**
	             * Clears the queue
	             */
	
	        }, {
	            key: 'clearQueue',
	            value: function clearQueue() {
	                while (this.queue.length) {
	                    this.queue[0].remove();
	                }
	                this.progress = 0;
	            }
	            /**
	             * Uploads a item from the queue
	             * @param {FileItem|Number} value
	             */
	
	        }, {
	            key: 'uploadItem',
	            value: function uploadItem(value) {
	                var index = this.getIndexOfItem(value);
	                var item = this.queue[index];
	                var transport = this.isHTML5 ? '_xhrTransport' : '_iframeTransport';
	
	                item._prepareToUploading();
	                if (this.isUploading) return;
	
	                this.isUploading = true;
	                this[transport](item);
	            }
	            /**
	             * Cancels uploading of item from the queue
	             * @param {FileItem|Number} value
	             */
	
	        }, {
	            key: 'cancelItem',
	            value: function cancelItem(value) {
	                var index = this.getIndexOfItem(value);
	                var item = this.queue[index];
	                var prop = this.isHTML5 ? '_xhr' : '_form';
	                if (item && item.isUploading) item[prop].abort();
	            }
	            /**
	             * Uploads all not uploaded items of queue
	             */
	
	        }, {
	            key: 'uploadAll',
	            value: function uploadAll() {
	                var items = this.getNotUploadedItems().filter(function (item) {
	                    return !item.isUploading;
	                });
	                if (!items.length) return;
	
	                forEach(items, function (item) {
	                    return item._prepareToUploading();
	                });
	                items[0].upload();
	            }
	            /**
	             * Cancels all uploads
	             */
	
	        }, {
	            key: 'cancelAll',
	            value: function cancelAll() {
	                var items = this.getNotUploadedItems();
	                forEach(items, function (item) {
	                    return item.cancel();
	                });
	            }
	            /**
	             * Returns "true" if value an instance of File
	             * @param {*} value
	             * @returns {Boolean}
	             * @private
	             */
	
	        }, {
	            key: 'isFile',
	            value: function isFile(value) {
	                return this.constructor.isFile(value);
	            }
	            /**
	             * Returns "true" if value an instance of FileLikeObject
	             * @param {*} value
	             * @returns {Boolean}
	             * @private
	             */
	
	        }, {
	            key: 'isFileLikeObject',
	            value: function isFileLikeObject(value) {
	                return this.constructor.isFileLikeObject(value);
	            }
	            /**
	             * Returns "true" if value is array like object
	             * @param {*} value
	             * @returns {Boolean}
	             */
	
	        }, {
	            key: 'isArrayLikeObject',
	            value: function isArrayLikeObject(value) {
	                return this.constructor.isArrayLikeObject(value);
	            }
	            /**
	             * Returns a index of item from the queue
	             * @param {Item|Number} value
	             * @returns {Number}
	             */
	
	        }, {
	            key: 'getIndexOfItem',
	            value: function getIndexOfItem(value) {
	                return isNumber(value) ? value : this.queue.indexOf(value);
	            }
	            /**
	             * Returns not uploaded items
	             * @returns {Array}
	             */
	
	        }, {
	            key: 'getNotUploadedItems',
	            value: function getNotUploadedItems() {
	                return this.queue.filter(function (item) {
	                    return !item.isUploaded;
	                });
	            }
	            /**
	             * Returns items ready for upload
	             * @returns {Array}
	             */
	
	        }, {
	            key: 'getReadyItems',
	            value: function getReadyItems() {
	                return this.queue.filter(function (item) {
	                    return item.isReady && !item.isUploading;
	                }).sort(function (item1, item2) {
	                    return item1.index - item2.index;
	                });
	            }
	            /**
	             * Destroys instance of FileUploader
	             */
	
	        }, {
	            key: 'destroy',
	            value: function destroy() {
	                var _this2 = this;
	
	                forEach(this._directives, function (key) {
	                    forEach(_this2._directives[key], function (object) {
	                        object.destroy();
	                    });
	                });
	            }
	            /**
	             * Callback
	             * @param {Array} fileItems
	             */
	
	        }, {
	            key: 'onAfterAddingAll',
	            value: function onAfterAddingAll(fileItems) {}
	            /**
	             * Callback
	             * @param {FileItem} fileItem
	             */
	
	        }, {
	            key: 'onAfterAddingFile',
	            value: function onAfterAddingFile(fileItem) {}
	            /**
	             * Callback
	             * @param {File|Object} item
	             * @param {Object} filter
	             * @param {Object} options
	             */
	
	        }, {
	            key: 'onWhenAddingFileFailed',
	            value: function onWhenAddingFileFailed(item, filter, options) {}
	            /**
	             * Callback
	             * @param {FileItem} fileItem
	             */
	
	        }, {
	            key: 'onBeforeUploadItem',
	            value: function onBeforeUploadItem(fileItem) {}
	            /**
	             * Callback
	             * @param {FileItem} fileItem
	             * @param {Number} progress
	             */
	
	        }, {
	            key: 'onProgressItem',
	            value: function onProgressItem(fileItem, progress) {}
	            /**
	             * Callback
	             * @param {Number} progress
	             */
	
	        }, {
	            key: 'onProgressAll',
	            value: function onProgressAll(progress) {}
	            /**
	             * Callback
	             * @param {FileItem} item
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             */
	
	        }, {
	            key: 'onSuccessItem',
	            value: function onSuccessItem(item, response, status, headers) {}
	            /**
	             * Callback
	             * @param {FileItem} item
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             */
	
	        }, {
	            key: 'onErrorItem',
	            value: function onErrorItem(item, response, status, headers) {}
	            /**
	             * Callback
	             * @param {FileItem} item
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             */
	
	        }, {
	            key: 'onCancelItem',
	            value: function onCancelItem(item, response, status, headers) {}
	            /**
	             * Callback
	             * @param {FileItem} item
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             */
	
	        }, {
	            key: 'onCompleteItem',
	            value: function onCompleteItem(item, response, status, headers) {}
	            /**
	             * Callback
	             */
	
	        }, {
	            key: 'onCompleteAll',
	            value: function onCompleteAll() {}
	            /**********************
	             * PRIVATE
	             **********************/
	            /**
	             * Returns the total progress
	             * @param {Number} [value]
	             * @returns {Number}
	             * @private
	             */
	
	        }, {
	            key: '_getTotalProgress',
	            value: function _getTotalProgress(value) {
	                if (this.removeAfterUpload) return value || 0;
	
	                var notUploaded = this.getNotUploadedItems().length;
	                var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
	                var ratio = 100 / this.queue.length;
	                var current = (value || 0) * ratio / 100;
	
	                return Math.round(uploaded * ratio + current);
	            }
	            /**
	             * Returns array of filters
	             * @param {Array<Function>|String} filters
	             * @returns {Array<Function>}
	             * @private
	             */
	
	        }, {
	            key: '_getFilters',
	            value: function _getFilters(filters) {
	                if (!filters) return this.filters;
	                if (isArray(filters)) return filters;
	                var names = filters.match(/[^\s,]+/g);
	                return this.filters.filter(function (filter) {
	                    return names.indexOf(filter.name) !== -1;
	                });
	            }
	            /**
	             * Updates html
	             * @private
	             */
	
	        }, {
	            key: '_render',
	            value: function _render() {
	                if (!$rootScope.$$phase) $rootScope.$apply();
	            }
	            /**
	             * Returns "true" if item is a file (not folder)
	             * @param {File|FileLikeObject} item
	             * @returns {Boolean}
	             * @private
	             */
	
	        }, {
	            key: '_folderFilter',
	            value: function _folderFilter(item) {
	                return !!(item.size || item.type);
	            }
	            /**
	             * Returns "true" if the limit has not been reached
	             * @returns {Boolean}
	             * @private
	             */
	
	        }, {
	            key: '_queueLimitFilter',
	            value: function _queueLimitFilter() {
	                return this.queue.length < this.queueLimit;
	            }
	            /**
	             * Returns "true" if file pass all filters
	             * @param {File|Object} file
	             * @param {Array<Function>} filters
	             * @param {Object} options
	             * @returns {Boolean}
	             * @private
	             */
	
	        }, {
	            key: '_isValidFile',
	            value: function _isValidFile(file, filters, options) {
	                var _this3 = this;
	
	                this._failFilterIndex = -1;
	                return !filters.length ? true : filters.every(function (filter) {
	                    _this3._failFilterIndex++;
	                    return filter.fn.call(_this3, file, options);
	                });
	            }
	            /**
	             * Checks whether upload successful
	             * @param {Number} status
	             * @returns {Boolean}
	             * @private
	             */
	
	        }, {
	            key: '_isSuccessCode',
	            value: function _isSuccessCode(status) {
	                return status >= 200 && status < 300 || status === 304;
	            }
	            /**
	             * Transforms the server response
	             * @param {*} response
	             * @param {Object} headers
	             * @returns {*}
	             * @private
	             */
	
	        }, {
	            key: '_transformResponse',
	            value: function _transformResponse(response, headers) {
	                var headersGetter = this._headersGetter(headers);
	                forEach($http.defaults.transformResponse, function (transformFn) {
	                    response = transformFn(response, headersGetter);
	                });
	                return response;
	            }
	            /**
	             * Parsed response headers
	             * @param headers
	             * @returns {Object}
	             * @see https://github.com/angular/angular.js/blob/master/src/ng/http.js
	             * @private
	             */
	
	        }, {
	            key: '_parseHeaders',
	            value: function _parseHeaders(headers) {
	                var parsed = {},
	                    key,
	                    val,
	                    i;
	
	                if (!headers) return parsed;
	
	                forEach(headers.split('\n'), function (line) {
	                    i = line.indexOf(':');
	                    key = line.slice(0, i).trim().toLowerCase();
	                    val = line.slice(i + 1).trim();
	
	                    if (key) {
	                        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	                    }
	                });
	
	                return parsed;
	            }
	            /**
	             * Returns function that returns headers
	             * @param {Object} parsedHeaders
	             * @returns {Function}
	             * @private
	             */
	
	        }, {
	            key: '_headersGetter',
	            value: function _headersGetter(parsedHeaders) {
	                return function (name) {
	                    if (name) {
	                        return parsedHeaders[name.toLowerCase()] || null;
	                    }
	                    return parsedHeaders;
	                };
	            }
	            /**
	             * The XMLHttpRequest transport
	             * @param {FileItem} item
	             * @private
	             */
	
	        }, {
	            key: '_xhrTransport',
	            value: function _xhrTransport(item) {
	                var _this4 = this;
	
	                var xhr = item._xhr = new XMLHttpRequest();
	                var sendable;
	
	                this._onBeforeUploadItem(item);
	
	                if (!item.disableMultipart) {
	                    sendable = new FormData();
	                    forEach(item.formData, function (obj) {
	                        forEach(obj, function (value, key) {
	                            sendable.append(key, value);
	                        });
	                    });
	
	                    sendable.append(item.alias, item._file, item.file.name);
	                } else {
	                    sendable = item._file;
	                }
	
	                if (typeof item._file.size != 'number') {
	                    throw new TypeError('The file specified is no longer valid');
	                }
	
	                xhr.upload.onprogress = function (event) {
	                    var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
	                    _this4._onProgressItem(item, progress);
	                };
	
	                xhr.onload = function () {
	                    var headers = _this4._parseHeaders(xhr.getAllResponseHeaders());
	                    var response = _this4._transformResponse(xhr.response, headers);
	                    var gist = _this4._isSuccessCode(xhr.status) ? 'Success' : 'Error';
	                    var method = '_on' + gist + 'Item';
	                    _this4[method](item, response, xhr.status, headers);
	                    _this4._onCompleteItem(item, response, xhr.status, headers);
	                };
	
	                xhr.onerror = function () {
	                    var headers = _this4._parseHeaders(xhr.getAllResponseHeaders());
	                    var response = _this4._transformResponse(xhr.response, headers);
	                    _this4._onErrorItem(item, response, xhr.status, headers);
	                    _this4._onCompleteItem(item, response, xhr.status, headers);
	                };
	
	                xhr.onabort = function () {
	                    var headers = _this4._parseHeaders(xhr.getAllResponseHeaders());
	                    var response = _this4._transformResponse(xhr.response, headers);
	                    _this4._onCancelItem(item, response, xhr.status, headers);
	                    _this4._onCompleteItem(item, response, xhr.status, headers);
	                };
	
	                xhr.open(item.method, item.url, true);
	
	                xhr.withCredentials = item.withCredentials;
	
	                forEach(item.headers, function (value, name) {
	                    xhr.setRequestHeader(name, value);
	                });
	
	                xhr.send(sendable);
	                this._render();
	            }
	            /**
	             * The IFrame transport
	             * @param {FileItem} item
	             * @private
	             */
	
	        }, {
	            key: '_iframeTransport',
	            value: function _iframeTransport(item) {
	                var _this5 = this;
	
	                var form = element('<form style="display: none;" />');
	                var iframe = element('<iframe name="iframeTransport' + Date.now() + '">');
	                var input = item._input;
	
	                if (item._form) item._form.replaceWith(input); // remove old form
	                item._form = form; // save link to new form
	
	                this._onBeforeUploadItem(item);
	
	                input.prop('name', item.alias);
	
	                forEach(item.formData, function (obj) {
	                    forEach(obj, function (value, key) {
	                        var element_ = element('<input type="hidden" name="' + key + '" />');
	                        element_.val(value);
	                        form.append(element_);
	                    });
	                });
	
	                form.prop({
	                    action: item.url,
	                    method: 'POST',
	                    target: iframe.prop('name'),
	                    enctype: 'multipart/form-data',
	                    encoding: 'multipart/form-data' // old IE
	                });
	
	                iframe.bind('load', function () {
	                    var html = '';
	                    var status = 200;
	
	                    try {
	                        // Fix for legacy IE browsers that loads internal error page
	                        // when failed WS response received. In consequence iframe
	                        // content access denied error is thrown becouse trying to
	                        // access cross domain page. When such thing occurs notifying
	                        // with empty response object. See more info at:
	                        // http://stackoverflow.com/questions/151362/access-is-denied-error-on-accessing-iframe-document-object
	                        // Note that if non standard 4xx or 5xx error code returned
	                        // from WS then response content can be accessed without error
	                        // but 'XHR' status becomes 200. In order to avoid confusion
	                        // returning response via same 'success' event handler.
	
	                        // fixed angular.contents() for iframes
	                        html = iframe[0].contentDocument.body.innerHTML;
	                    } catch (e) {
	                        // in case we run into the access-is-denied error or we have another error on the server side
	                        // (intentional 500,40... errors), we at least say 'something went wrong' -> 500
	                        status = 500;
	                    }
	
	                    var xhr = { response: html, status: status, dummy: true };
	                    var headers = {};
	                    var response = _this5._transformResponse(xhr.response, headers);
	
	                    _this5._onSuccessItem(item, response, xhr.status, headers);
	                    _this5._onCompleteItem(item, response, xhr.status, headers);
	                });
	
	                form.abort = function () {
	                    var xhr = { status: 0, dummy: true };
	                    var headers = {};
	                    var response;
	
	                    iframe.unbind('load').prop('src', 'javascript:false;');
	                    form.replaceWith(input);
	
	                    _this5._onCancelItem(item, response, xhr.status, headers);
	                    _this5._onCompleteItem(item, response, xhr.status, headers);
	                };
	
	                input.after(form);
	                form.append(input).append(iframe);
	
	                form[0].submit();
	                this._render();
	            }
	            /**
	             * Inner callback
	             * @param {File|Object} item
	             * @param {Object} filter
	             * @param {Object} options
	             * @private
	             */
	
	        }, {
	            key: '_onWhenAddingFileFailed',
	            value: function _onWhenAddingFileFailed(item, filter, options) {
	                this.onWhenAddingFileFailed(item, filter, options);
	            }
	            /**
	             * Inner callback
	             * @param {FileItem} item
	             */
	
	        }, {
	            key: '_onAfterAddingFile',
	            value: function _onAfterAddingFile(item) {
	                this.onAfterAddingFile(item);
	            }
	            /**
	             * Inner callback
	             * @param {Array<FileItem>} items
	             */
	
	        }, {
	            key: '_onAfterAddingAll',
	            value: function _onAfterAddingAll(items) {
	                this.onAfterAddingAll(items);
	            }
	            /**
	             *  Inner callback
	             * @param {FileItem} item
	             * @private
	             */
	
	        }, {
	            key: '_onBeforeUploadItem',
	            value: function _onBeforeUploadItem(item) {
	                item._onBeforeUpload();
	                this.onBeforeUploadItem(item);
	            }
	            /**
	             * Inner callback
	             * @param {FileItem} item
	             * @param {Number} progress
	             * @private
	             */
	
	        }, {
	            key: '_onProgressItem',
	            value: function _onProgressItem(item, progress) {
	                var total = this._getTotalProgress(progress);
	                this.progress = total;
	                item._onProgress(progress);
	                this.onProgressItem(item, progress);
	                this.onProgressAll(total);
	                this._render();
	            }
	            /**
	             * Inner callback
	             * @param {FileItem} item
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             * @private
	             */
	
	        }, {
	            key: '_onSuccessItem',
	            value: function _onSuccessItem(item, response, status, headers) {
	                item._onSuccess(response, status, headers);
	                this.onSuccessItem(item, response, status, headers);
	            }
	            /**
	             * Inner callback
	             * @param {FileItem} item
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             * @private
	             */
	
	        }, {
	            key: '_onErrorItem',
	            value: function _onErrorItem(item, response, status, headers) {
	                item._onError(response, status, headers);
	                this.onErrorItem(item, response, status, headers);
	            }
	            /**
	             * Inner callback
	             * @param {FileItem} item
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             * @private
	             */
	
	        }, {
	            key: '_onCancelItem',
	            value: function _onCancelItem(item, response, status, headers) {
	                item._onCancel(response, status, headers);
	                this.onCancelItem(item, response, status, headers);
	            }
	            /**
	             * Inner callback
	             * @param {FileItem} item
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             * @private
	             */
	
	        }, {
	            key: '_onCompleteItem',
	            value: function _onCompleteItem(item, response, status, headers) {
	                item._onComplete(response, status, headers);
	                this.onCompleteItem(item, response, status, headers);
	
	                var nextItem = this.getReadyItems()[0];
	                this.isUploading = false;
	
	                if (isDefined(nextItem)) {
	                    nextItem.upload();
	                    return;
	                }
	
	                this.onCompleteAll();
	                this.progress = this._getTotalProgress();
	                this._render();
	            }
	            /**********************
	             * STATIC
	             **********************/
	            /**
	             * Returns "true" if value an instance of File
	             * @param {*} value
	             * @returns {Boolean}
	             * @private
	             */
	
	        }], [{
	            key: 'isFile',
	            value: function isFile(value) {
	                return File && value instanceof File;
	            }
	            /**
	             * Returns "true" if value an instance of FileLikeObject
	             * @param {*} value
	             * @returns {Boolean}
	             * @private
	             */
	
	        }, {
	            key: 'isFileLikeObject',
	            value: function isFileLikeObject(value) {
	                return value instanceof FileLikeObject;
	            }
	            /**
	             * Returns "true" if value is array like object
	             * @param {*} value
	             * @returns {Boolean}
	             */
	
	        }, {
	            key: 'isArrayLikeObject',
	            value: function isArrayLikeObject(value) {
	                return isObject(value) && 'length' in value;
	            }
	            /**
	             * Inherits a target (Class_1) by a source (Class_2)
	             * @param {Function} target
	             * @param {Function} source
	             */
	
	        }, {
	            key: 'inherit',
	            value: function inherit(target, source) {
	                target.prototype = Object.create(source.prototype);
	                target.prototype.constructor = target;
	                target.super_ = source;
	            }
	        }]);
	
	        return FileUploader;
	    }();
	
	    /**********************
	     * PUBLIC
	     **********************/
	    /**
	     * Checks a support the html5 uploader
	     * @returns {Boolean}
	     * @readonly
	     */
	
	
	    FileUploader.prototype.isHTML5 = !!(File && FormData);
	    /**********************
	     * STATIC
	     **********************/
	    /**
	     * @borrows FileUploader.prototype.isHTML5
	     */
	    FileUploader.isHTML5 = FileUploader.prototype.isHTML5;
	
	    return FileUploader;
	}
	
	__identity.$inject = ['fileUploaderOptions', '$rootScope', '$http', '$window', 'FileLikeObject', 'FileItem'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = __identity;
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _angular = angular;
	var copy = _angular.copy;
	var isElement = _angular.isElement;
	var isString = _angular.isString;
	function __identity() {
	
	    return function () {
	        /**
	         * Creates an instance of FileLikeObject
	         * @param {File|HTMLInputElement|Object} fileOrInput
	         * @constructor
	         */
	
	        function FileLikeObject(fileOrInput) {
	            _classCallCheck(this, FileLikeObject);
	
	            var isInput = isElement(fileOrInput);
	            var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
	            var postfix = isString(fakePathOrObject) ? 'FakePath' : 'Object';
	            var method = '_createFrom' + postfix;
	            this[method](fakePathOrObject);
	        }
	        /**
	         * Creates file like object from fake path string
	         * @param {String} path
	         * @private
	         */
	
	
	        _createClass(FileLikeObject, [{
	            key: '_createFromFakePath',
	            value: function _createFromFakePath(path) {
	                this.lastModifiedDate = null;
	                this.size = null;
	                this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
	                this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
	            }
	            /**
	             * Creates file like object from object
	             * @param {File|FileLikeObject} object
	             * @private
	             */
	
	        }, {
	            key: '_createFromObject',
	            value: function _createFromObject(object) {
	                this.lastModifiedDate = copy(object.lastModifiedDate);
	                this.size = object.size;
	                this.type = object.type;
	                this.name = object.name;
	            }
	        }]);
	
	        return FileLikeObject;
	    }();
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = __identity;
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _angular = angular;
	var copy = _angular.copy;
	var extend = _angular.extend;
	var element = _angular.element;
	var isElement = _angular.isElement;
	function __identity($compile, FileLikeObject) {
	
	    return function () {
	        /**
	         * Creates an instance of FileItem
	         * @param {FileUploader} uploader
	         * @param {File|HTMLInputElement|Object} some
	         * @param {Object} options
	         * @constructor
	         */
	
	        function FileItem(uploader, some, options) {
	            _classCallCheck(this, FileItem);
	
	            var isInput = isElement(some);
	            var input = isInput ? element(some) : null;
	            var file = !isInput ? some : null;
	
	            extend(this, {
	                url: uploader.url,
	                alias: uploader.alias,
	                headers: copy(uploader.headers),
	                formData: copy(uploader.formData),
	                removeAfterUpload: uploader.removeAfterUpload,
	                withCredentials: uploader.withCredentials,
	                disableMultipart: uploader.disableMultipart,
	                method: uploader.method
	            }, options, {
	                uploader: uploader,
	                file: new FileLikeObject(some),
	                isReady: false,
	                isUploading: false,
	                isUploaded: false,
	                isSuccess: false,
	                isCancel: false,
	                isError: false,
	                progress: 0,
	                index: null,
	                _file: file,
	                _input: input
	            });
	
	            if (input) this._replaceNode(input);
	        }
	        /**********************
	         * PUBLIC
	         **********************/
	        /**
	         * Uploads a FileItem
	         */
	
	
	        _createClass(FileItem, [{
	            key: 'upload',
	            value: function upload() {
	                try {
	                    this.uploader.uploadItem(this);
	                } catch (e) {
	                    this.uploader._onCompleteItem(this, '', 0, []);
	                    this.uploader._onErrorItem(this, '', 0, []);
	                }
	            }
	            /**
	             * Cancels uploading of FileItem
	             */
	
	        }, {
	            key: 'cancel',
	            value: function cancel() {
	                this.uploader.cancelItem(this);
	            }
	            /**
	             * Removes a FileItem
	             */
	
	        }, {
	            key: 'remove',
	            value: function remove() {
	                this.uploader.removeFromQueue(this);
	            }
	            /**
	             * Callback
	             * @private
	             */
	
	        }, {
	            key: 'onBeforeUpload',
	            value: function onBeforeUpload() {}
	            /**
	             * Callback
	             * @param {Number} progress
	             * @private
	             */
	
	        }, {
	            key: 'onProgress',
	            value: function onProgress(progress) {}
	            /**
	             * Callback
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             */
	
	        }, {
	            key: 'onSuccess',
	            value: function onSuccess(response, status, headers) {}
	            /**
	             * Callback
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             */
	
	        }, {
	            key: 'onError',
	            value: function onError(response, status, headers) {}
	            /**
	             * Callback
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             */
	
	        }, {
	            key: 'onCancel',
	            value: function onCancel(response, status, headers) {}
	            /**
	             * Callback
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             */
	
	        }, {
	            key: 'onComplete',
	            value: function onComplete(response, status, headers) {}
	            /**********************
	             * PRIVATE
	             **********************/
	            /**
	             * Inner callback
	             */
	
	        }, {
	            key: '_onBeforeUpload',
	            value: function _onBeforeUpload() {
	                this.isReady = true;
	                this.isUploading = true;
	                this.isUploaded = false;
	                this.isSuccess = false;
	                this.isCancel = false;
	                this.isError = false;
	                this.progress = 0;
	                this.onBeforeUpload();
	            }
	            /**
	             * Inner callback
	             * @param {Number} progress
	             * @private
	             */
	
	        }, {
	            key: '_onProgress',
	            value: function _onProgress(progress) {
	                this.progress = progress;
	                this.onProgress(progress);
	            }
	            /**
	             * Inner callback
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             * @private
	             */
	
	        }, {
	            key: '_onSuccess',
	            value: function _onSuccess(response, status, headers) {
	                this.isReady = false;
	                this.isUploading = false;
	                this.isUploaded = true;
	                this.isSuccess = true;
	                this.isCancel = false;
	                this.isError = false;
	                this.progress = 100;
	                this.index = null;
	                this.onSuccess(response, status, headers);
	            }
	            /**
	             * Inner callback
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             * @private
	             */
	
	        }, {
	            key: '_onError',
	            value: function _onError(response, status, headers) {
	                this.isReady = false;
	                this.isUploading = false;
	                this.isUploaded = true;
	                this.isSuccess = false;
	                this.isCancel = false;
	                this.isError = true;
	                this.progress = 0;
	                this.index = null;
	                this.onError(response, status, headers);
	            }
	            /**
	             * Inner callback
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             * @private
	             */
	
	        }, {
	            key: '_onCancel',
	            value: function _onCancel(response, status, headers) {
	                this.isReady = false;
	                this.isUploading = false;
	                this.isUploaded = false;
	                this.isSuccess = false;
	                this.isCancel = true;
	                this.isError = false;
	                this.progress = 0;
	                this.index = null;
	                this.onCancel(response, status, headers);
	            }
	            /**
	             * Inner callback
	             * @param {*} response
	             * @param {Number} status
	             * @param {Object} headers
	             * @private
	             */
	
	        }, {
	            key: '_onComplete',
	            value: function _onComplete(response, status, headers) {
	                this.onComplete(response, status, headers);
	                if (this.removeAfterUpload) this.remove();
	            }
	            /**
	             * Destroys a FileItem
	             */
	
	        }, {
	            key: '_destroy',
	            value: function _destroy() {
	                if (this._input) this._input.remove();
	                if (this._form) this._form.remove();
	                delete this._form;
	                delete this._input;
	            }
	            /**
	             * Prepares to uploading
	             * @private
	             */
	
	        }, {
	            key: '_prepareToUploading',
	            value: function _prepareToUploading() {
	                this.index = this.index || ++this.uploader._nextIndex;
	                this.isReady = true;
	            }
	            /**
	             * Replaces input element on his clone
	             * @param {JQLite|jQuery} input
	             * @private
	             */
	
	        }, {
	            key: '_replaceNode',
	            value: function _replaceNode(input) {
	                var clone = $compile(input.clone())(input.scope());
	                clone.prop('value', null); // FF fix
	                input.css('display', 'none');
	                input.after(clone); // remove jquery dependency
	            }
	        }]);
	
	        return FileItem;
	    }();
	}
	
	__identity.$inject = ['$compile', 'FileLikeObject'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = __identity;
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _angular = angular;
	var extend = _angular.extend;
	function __identity() {
	    var FileDirective = function () {
	        /**
	         * Creates instance of {FileDirective} object
	         * @param {Object} options
	         * @param {Object} options.uploader
	         * @param {HTMLElement} options.element
	         * @param {Object} options.events
	         * @param {String} options.prop
	         * @constructor
	         */
	
	        function FileDirective(options) {
	            _classCallCheck(this, FileDirective);
	
	            extend(this, options);
	            this.uploader._directives[this.prop].push(this);
	            this._saveLinks();
	            this.bind();
	        }
	        /**
	         * Binds events handles
	         */
	
	
	        _createClass(FileDirective, [{
	            key: 'bind',
	            value: function bind() {
	                for (var key in this.events) {
	                    var prop = this.events[key];
	                    this.element.bind(key, this[prop]);
	                }
	            }
	            /**
	             * Unbinds events handles
	             */
	
	        }, {
	            key: 'unbind',
	            value: function unbind() {
	                for (var key in this.events) {
	                    this.element.unbind(key, this.events[key]);
	                }
	            }
	            /**
	             * Destroys directive
	             */
	
	        }, {
	            key: 'destroy',
	            value: function destroy() {
	                var index = this.uploader._directives[this.prop].indexOf(this);
	                this.uploader._directives[this.prop].splice(index, 1);
	                this.unbind();
	                // this.element = null;
	            }
	            /**
	             * Saves links to functions
	             * @private
	             */
	
	        }, {
	            key: '_saveLinks',
	            value: function _saveLinks() {
	                for (var key in this.events) {
	                    var prop = this.events[key];
	                    this[prop] = this[prop].bind(this);
	                }
	            }
	        }]);
	
	        return FileDirective;
	    }();
	
	    /**
	     * Map of events
	     * @type {Object}
	     */
	
	
	    FileDirective.prototype.events = {};
	
	    return FileDirective;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = __identity;
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _angular = angular;
	var extend = _angular.extend;
	function __identity(FileDirective) {
	
	    return function (_FileDirective) {
	        _inherits(FileSelect, _FileDirective);
	
	        /**
	         * Creates instance of {FileSelect} object
	         * @param {Object} options
	         * @constructor
	         */
	
	        function FileSelect(options) {
	            _classCallCheck(this, FileSelect);
	
	            var extendedOptions = extend(options, {
	                // Map of events
	                events: {
	                    $destroy: 'destroy',
	                    change: 'onChange'
	                },
	                // Name of property inside uploader._directive object
	                prop: 'select'
	            });
	
	            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileSelect).call(this, extendedOptions));
	
	            if (!_this.uploader.isHTML5) {
	                _this.element.removeAttr('multiple');
	            }
	            _this.element.prop('value', null); // FF fix
	            return _this;
	        }
	        /**
	         * Returns options
	         * @return {Object|undefined}
	         */
	
	
	        _createClass(FileSelect, [{
	            key: 'getOptions',
	            value: function getOptions() {}
	            /**
	             * Returns filters
	             * @return {Array<Function>|String|undefined}
	             */
	
	        }, {
	            key: 'getFilters',
	            value: function getFilters() {}
	            /**
	             * If returns "true" then HTMLInputElement will be cleared
	             * @returns {Boolean}
	             */
	
	        }, {
	            key: 'isEmptyAfterSelection',
	            value: function isEmptyAfterSelection() {
	                return !!this.element.attr('multiple');
	            }
	            /**
	             * Event handler
	             */
	
	        }, {
	            key: 'onChange',
	            value: function onChange() {
	                var files = this.uploader.isHTML5 ? this.element[0].files : this.element[0];
	                var options = this.getOptions();
	                var filters = this.getFilters();
	
	                if (!this.uploader.isHTML5) this.destroy();
	                this.uploader.addToQueue(files, options, filters);
	                if (this.isEmptyAfterSelection()) {
	                    this.element.prop('value', null);
	                    this.element.replaceWith(this.element = this.element.clone(true)); // IE fix
	                }
	            }
	        }]);
	
	        return FileSelect;
	    }(FileDirective);
	}
	
	__identity.$inject = ['FileDirective'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = __identity;
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _angular = angular;
	var extend = _angular.extend;
	var forEach = _angular.forEach;
	function __identity(FileDirective) {
	
	    return function (_FileDirective) {
	        _inherits(FileDrop, _FileDirective);
	
	        /**
	         * Creates instance of {FileDrop} object
	         * @param {Object} options
	         * @constructor
	         */
	
	        function FileDrop(options) {
	            _classCallCheck(this, FileDrop);
	
	            var extendedOptions = extend(options, {
	                // Map of events
	                events: {
	                    $destroy: 'destroy',
	                    drop: 'onDrop',
	                    dragover: 'onDragOver',
	                    dragleave: 'onDragLeave'
	                },
	                // Name of property inside uploader._directive object
	                prop: 'drop'
	            });
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(FileDrop).call(this, extendedOptions));
	        }
	        /**
	         * Returns options
	         * @return {Object|undefined}
	         */
	
	
	        _createClass(FileDrop, [{
	            key: 'getOptions',
	            value: function getOptions() {}
	            /**
	             * Returns filters
	             * @return {Array<Function>|String|undefined}
	             */
	
	        }, {
	            key: 'getFilters',
	            value: function getFilters() {}
	            /**
	             * Event handler
	             */
	
	        }, {
	            key: 'onDrop',
	            value: function onDrop(event) {
	                var transfer = this._getTransfer(event);
	                if (!transfer) return;
	                var options = this.getOptions();
	                var filters = this.getFilters();
	                this._preventAndStop(event);
	                forEach(this.uploader._directives.over, this._removeOverClass, this);
	                this.uploader.addToQueue(transfer.files, options, filters);
	            }
	            /**
	             * Event handler
	             */
	
	        }, {
	            key: 'onDragOver',
	            value: function onDragOver(event) {
	                var transfer = this._getTransfer(event);
	                if (!this._haveFiles(transfer.types)) return;
	                transfer.dropEffect = 'copy';
	                this._preventAndStop(event);
	                forEach(this.uploader._directives.over, this._addOverClass, this);
	            }
	            /**
	             * Event handler
	             */
	
	        }, {
	            key: 'onDragLeave',
	            value: function onDragLeave(event) {
	                if (event.currentTarget === this.element[0]) return;
	                this._preventAndStop(event);
	                forEach(this.uploader._directives.over, this._removeOverClass, this);
	            }
	            /**
	             * Helper
	             */
	
	        }, {
	            key: '_getTransfer',
	            value: function _getTransfer(event) {
	                return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
	            }
	            /**
	             * Helper
	             */
	
	        }, {
	            key: '_preventAndStop',
	            value: function _preventAndStop(event) {
	                event.preventDefault();
	                event.stopPropagation();
	            }
	            /**
	             * Returns "true" if types contains files
	             * @param {Object} types
	             */
	
	        }, {
	            key: '_haveFiles',
	            value: function _haveFiles(types) {
	                if (!types) return false;
	                if (types.indexOf) {
	                    return types.indexOf('Files') !== -1;
	                } else if (types.contains) {
	                    return types.contains('Files');
	                } else {
	                    return false;
	                }
	            }
	            /**
	             * Callback
	             */
	
	        }, {
	            key: '_addOverClass',
	            value: function _addOverClass(item) {
	                item.addOverClass();
	            }
	            /**
	             * Callback
	             */
	
	        }, {
	            key: '_removeOverClass',
	            value: function _removeOverClass(item) {
	                item.removeOverClass();
	            }
	        }]);
	
	        return FileDrop;
	    }(FileDirective);
	}
	
	__identity.$inject = ['FileDirective'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = __identity;
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _angular = angular;
	var extend = _angular.extend;
	function __identity(FileDirective) {
	
	    return function (_FileDirective) {
	        _inherits(FileOver, _FileDirective);
	
	        /**
	         * Creates instance of {FileDrop} object
	         * @param {Object} options
	         * @constructor
	         */
	
	        function FileOver(options) {
	            _classCallCheck(this, FileOver);
	
	            var extendedOptions = extend(options, {
	                // Map of events
	                events: {
	                    $destroy: 'destroy'
	                },
	                // Name of property inside uploader._directive object
	                prop: 'over',
	                // Over class
	                overClass: 'nv-file-over'
	            });
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(FileOver).call(this, extendedOptions));
	        }
	        /**
	         * Adds over class
	         */
	
	
	        _createClass(FileOver, [{
	            key: 'addOverClass',
	            value: function addOverClass() {
	                this.element.addClass(this.getOverClass());
	            }
	            /**
	             * Removes over class
	             */
	
	        }, {
	            key: 'removeOverClass',
	            value: function removeOverClass() {
	                this.element.removeClass(this.getOverClass());
	            }
	            /**
	             * Returns over class
	             * @returns {String}
	             */
	
	        }, {
	            key: 'getOverClass',
	            value: function getOverClass() {
	                return this.overClass;
	            }
	        }]);
	
	        return FileOver;
	    }(FileDirective);
	}
	
	__identity.$inject = ['FileDirective'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = __identity;
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function __identity($parse, FileUploader, FileSelect) {
	
	    return {
	        link: function link(scope, element, attributes) {
	            var uploader = scope.$eval(attributes.uploader);
	
	            if (!(uploader instanceof FileUploader)) {
	                throw new TypeError('"Uploader" must be an instance of FileUploader');
	            }
	
	            var object = new FileSelect({
	                uploader: uploader,
	                element: element
	            });
	
	            object.getOptions = $parse(attributes.options).bind(object, scope);
	            object.getFilters = function () {
	                return attributes.filters;
	            };
	        }
	    };
	}
	
	__identity.$inject = ['$parse', 'FileUploader', 'FileSelect'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = __identity;
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function __identity($parse, FileUploader, FileDrop) {
	
	    return {
	        link: function link(scope, element, attributes) {
	            var uploader = scope.$eval(attributes.uploader);
	
	            if (!(uploader instanceof FileUploader)) {
	                throw new TypeError('"Uploader" must be an instance of FileUploader');
	            }
	
	            if (!uploader.isHTML5) return;
	
	            var object = new FileDrop({
	                uploader: uploader,
	                element: element
	            });
	
	            object.getOptions = $parse(attributes.options).bind(object, scope);
	            object.getFilters = function () {
	                return attributes.filters;
	            };
	        }
	    };
	}
	
	__identity.$inject = ['$parse', 'FileUploader', 'FileDrop'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = __identity;
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function __identity(FileUploader, FileOver) {
	
	    return {
	        link: function link(scope, element, attributes) {
	            var uploader = scope.$eval(attributes.uploader);
	
	            if (!(uploader instanceof FileUploader)) {
	                throw new TypeError('"Uploader" must be an instance of FileUploader');
	            }
	
	            var object = new FileOver({
	                uploader: uploader,
	                element: element
	            });
	
	            object.getOverClass = function () {
	                return attributes.overClass || object.overClass;
	            };
	        }
	    };
	}
	
	__identity.$inject = ['FileUploader', 'FileOver'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-file-upload.js.map