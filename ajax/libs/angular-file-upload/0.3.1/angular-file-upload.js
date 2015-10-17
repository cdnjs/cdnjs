(function(angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define('angular-file-upload', ['angular'], function(angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(angular || null, function(angular) {
/**
 * The angular file upload module
 * @author: nerv
 * @version: 0.3, 2014-01-03
 */
var app = angular.module('angularFileUpload', []);

/**
 * The angular file upload module
 * @author: nerv
 * @version: 0.3, 2014-01-03
 */

// It is attached to an element that catches the event drop file
app.directive('ngFileDrop', [ '$fileUploader', function ($fileUploader) {
    'use strict';

    return {
        // don't use drag-n-drop files in IE9, because not File API support
        link: !$fileUploader.isHTML5 ? angular.noop : function (scope, element, attributes) {
            element
                .bind('drop', function (event) {
                    var dataTransfer = event.dataTransfer ?
                        event.dataTransfer :
                        event.originalEvent.dataTransfer; // jQuery fix;
                    if (!dataTransfer) return;
                    event.preventDefault();
                    event.stopPropagation();
                    scope.$broadcast('file:removeoverclass');
                    scope.$emit('file:add', dataTransfer.files, scope.$eval(attributes.ngFileDrop));
                })
                .bind('dragover', function (event) {
                    var dataTransfer = event.dataTransfer ?
                        event.dataTransfer :
                        event.originalEvent.dataTransfer; // jQuery fix;

                    event.preventDefault();
                    event.stopPropagation();
                    dataTransfer.dropEffect = 'copy';
                    scope.$broadcast('file:addoverclass');
                })
                .bind('dragleave', function () {
                    scope.$broadcast('file:removeoverclass');
                });
        }
    };
}])
/**
 * The angular file upload module
 * @author: nerv
 * @version: 0.3, 2014-01-03
 */

// It is attached to an element which will be assigned to a class "ng-file-over" or ng-file-over="className"
app.directive('ngFileOver', function () {
    'use strict';

    return {
        link: function (scope, element, attributes) {
            scope.$on('file:addoverclass', function () {
                element.addClass(attributes.ngFileOver || 'ng-file-over');
            });
            scope.$on('file:removeoverclass', function () {
                element.removeClass(attributes.ngFileOver || 'ng-file-over');
            });
        }
    };
});
/**
 * The angular file upload module
 * @author: nerv
 * @version: 0.3, 2014-01-03
 */

// It is attached to <input type="file"> element like <ng-file-select="options">
app.directive('ngFileSelect', [ '$fileUploader', function ($fileUploader) {
    'use strict';

    return {
        link: function (scope, element, attributes) {
            $fileUploader.isHTML5 || element.removeAttr('multiple');

            element.bind('change', function () {
                scope.$emit('file:add', $fileUploader.isHTML5 ? this.files : this, scope.$eval(attributes.ngFileSelect));
                $fileUploader.isHTML5 && element.prop('value', null);
            });

            element.prop('value', null); // FF fix
        }
    };
}]);
/**
 * The angular file upload module
 * @author: nerv
 * @version: 0.3, 2014-01-03
 */
app.factory('$fileUploader', [ '$compile', '$rootScope', '$http', '$window', function ($compile, $rootScope, $http, $window) {
    'use strict';

    function Uploader(params) {
        angular.extend(this, {
            scope: $rootScope,
            url: '/',
            alias: 'file',
            queue: [],
            headers: {},
            progress: null,
            autoUpload: false,
            removeAfterUpload: false,
            method: 'POST',
            filters: [],
            formData: [],
            isUploading: false,
            _nextIndex: 0,
            _timestamp: Date.now()
        }, params);

        // add the base filter
        this.filters.unshift(this._filter);

        this.scope.$on('file:add', function (event, items, options) {
            event.stopPropagation();
            this.addToQueue(items, options);
        }.bind(this));

        this.bind('beforeupload', Item.prototype._beforeupload);
        this.bind('in:progress', Item.prototype._progress);
        this.bind('in:success', Item.prototype._success);
        this.bind('in:cancel', Item.prototype._cancel);
        this.bind('in:error', Item.prototype._error);
        this.bind('in:complete', Item.prototype._complete);
        this.bind('in:progress', this._progress);
        this.bind('in:complete', this._complete);
    }

    Uploader.prototype = {

        /**
         * The base filter. If returns "true" an item will be added to the queue
         * @param {File|Input} item
         * @returns {boolean}
         */
        _filter: function (item) {
            return angular.isElement(item) ? true : !!item.size;
        },

        /**
         * Registers a event handler
         * @param {String} event
         * @param {Function} handler
         * @return {Function} unsubscribe function
         */
        bind: function (event, handler) {
            return this.scope.$on(this._timestamp + ':' + event, handler.bind(this));
        },

        /**
         * Triggers events
         * @param {String} event
         * @param {...*} [some]
         */
        trigger: function (event, some) {
            arguments[ 0 ] = this._timestamp + ':' + event;
            this.scope.$broadcast.apply(this.scope, arguments);
        },

        /**
         * Checks a support the html5 uploader
         * @returns {Boolean}
         */
        isHTML5: !!($window.File && $window.FormData),

        /**
         * Adds items to the queue
         * @param {FileList|File|HTMLInputElement} items
         * @param {Object} [options]
         */
        addToQueue: function (items, options) {
            var length = this.queue.length;
            var list = 'length' in items ? items : [items];

            angular.forEach(list, function (file) {
                var isValid = !this.filters.length ? true : this.filters.every(function (filter) {
                    return filter.call(this, file);
                }, this);

                if (isValid) {
                    var item = new Item(angular.extend({
                        url: this.url,
                        alias: this.alias,
                        headers: angular.copy(this.headers),
                        formData: angular.copy(this.formData),
                        removeAfterUpload: this.removeAfterUpload,
                        method: this.method,
                        uploader: this,
                        file: file
                    }, options));

                    this.queue.push(item);
                    this.trigger('afteraddingfile', item);
                }
            }, this);

            if (this.queue.length !== length) {
                this.trigger('after:adding:all', this.queue);
                this.progress = this._getTotalProgress();
            }

            this._render();
            this.autoUpload && this.uploadAll();
        },

        /**
         * Remove items from the queue. Remove last: index = -1
         * @param {Item|Number} value
         */
        removeFromQueue: function (value) {
            var index = this.getIndexOfItem(value);
            var item = this.queue[ index ];
            item.isUploading && item.cancel();
            this.queue.splice(index, 1);
            item._destroy();
            this.progress = this._getTotalProgress();
        },

        /**
         * Clears the queue
         */
        clearQueue: function () {
            this.queue.forEach(function (item) {
                item.isUploading && item.cancel();
                item._destroy();
            }, this);
            this.queue.length = 0;
            this.progress = 0;
        },

        /**
         * Returns a index of item from the queue
         * @param {Item|Number} value
         * @returns {Number}
         */
        getIndexOfItem: function (value) {
            return angular.isObject(value) ? this.queue.indexOf(value) : value;
        },

        /**
         * Returns not uploaded items
         * @returns {Array}
         */
        getNotUploadedItems: function () {
            return this.queue.filter(function (item) {
                return !item.isUploaded;
            });
        },

        /**
         * Returns items ready for upload
         * @returns {Array}
         */
        getReadyItems: function() {
            return this.queue
                .filter(function(item) {
                    return item.isReady && !item.isUploading;
                })
                .sort(function(item1, item2) {
                    return item1.index - item2.index;
                });
        },

        /**
         * Uploads a item from the queue
         * @param {Item|Number} value
         */
        uploadItem: function (value) {
            var index = this.getIndexOfItem(value);
            var item = this.queue[ index ];
            var transport = this.isHTML5 ? '_xhrTransport' : '_iframeTransport';

            item.index = item.index || this._nextIndex++;
            item.isReady = true;

            if (this.isUploading) {
                return;
            }

            this.isUploading = true;
            this[ transport ](item);
        },


        /**
         * Cancels uploading of item from the queue
         * @param {Item|Number} value
         */
        cancelItem: function(value) {
            var index = this.getIndexOfItem(value);
            var item = this.queue[ index ];
            var prop = this.isHTML5 ? '_xhr' : '_form';
            item[prop] && item[prop].abort();
        },


        /**
         * Uploads all not uploaded items of queue
         */
        uploadAll: function () {
            var items = this.getNotUploadedItems().filter(function(item) {
                return !item.isUploading;
            });
            items.forEach(function(item) {
                item.index = item.index || this._nextIndex++;
                item.isReady = true;
            }, this);
            items.length && this.uploadItem(items[ 0 ]);
        },


        /**
         * Cancels all uploads
         */
        cancelAll: function() {
            this.getNotUploadedItems().forEach(function(item) {
                this.cancelItem(item);
            }, this);
        },


        /**
         * Updates angular scope
         * @private
         */
        _render: function() {
            this.scope.$$phase || this.scope.$digest();
        },


        /**
         * Returns the total progress
         * @param {Number} [value]
         * @returns {Number}
         */
        _getTotalProgress: function (value) {
            if (this.removeAfterUpload) {
                return value || 0;
            }

            var notUploaded = this.getNotUploadedItems().length;
            var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
            var ratio = 100 / this.queue.length;
            var current = (value || 0) * ratio / 100;

            return Math.round(uploaded * ratio + current);
        },

        /**
         * The 'in:progress' handler
         */
        _progress: function (event, item, progress) {
            var result = this._getTotalProgress(progress);
            this.trigger('progressall', result);
            this.progress = result;
            this._render();
        },

        /**
         * The 'in:complete' handler
         */
        _complete: function () {
            var item = this.getReadyItems()[ 0 ];
            this.isUploading = false;

            if (angular.isDefined(item)) {
                this.uploadItem(item);
                return;
            }

            this.trigger('completeall', this.queue);
            this.progress = this._getTotalProgress();
            this._render();
        },

        /**
         * The XMLHttpRequest transport
         */
        _xhrTransport: function (item) {
            var xhr = item._xhr = new XMLHttpRequest();
            var form = new FormData();
            var that = this;

            this.trigger('beforeupload', item);

            item.formData.forEach(function(obj) {
                angular.forEach(obj, function(value, key) {
                    form.append(key, value);
                });
            });

            form.append(item.alias, item.file);

            xhr.upload.onprogress = function (event) {
                var progress = event.lengthComputable ? event.loaded * 100 / event.total : 0;
                that.trigger('in:progress', item, Math.round(progress));
            };

            xhr.onload = function () {
                var response = that._transformResponse(xhr.response);
                var event = that._isSuccessCode(xhr.status) ? 'success' : 'error';
                that.trigger('in:' + event, xhr, item, response);
                that.trigger('in:complete', xhr, item, response);
            };

            xhr.onerror = function () {
                that.trigger('in:error', xhr, item);
                that.trigger('in:complete', xhr, item);
            };

            xhr.onabort = function () {
                that.trigger('in:cancel', xhr, item);
                that.trigger('in:complete', xhr, item);
            };

            xhr.open(item.method, item.url, true);

            angular.forEach(item.headers, function (value, name) {
                xhr.setRequestHeader(name, value);
            });

            xhr.send(form);
        },

        /**
         * The IFrame transport
         */
        _iframeTransport: function (item) {
            var form = angular.element('<form style="display: none;" />');
            var iframe = angular.element('<iframe name="iframeTransport' + Date.now() + '">');
            var input = item._input;
            var that = this;

            item._form && item._form.replaceWith(input); // remove old form
            item._form = form; // save link to new form

            this.trigger('beforeupload', item);

            input.prop('name', item.alias);

            item.formData.forEach(function(obj) {
                angular.forEach(obj, function(value, key) {
                    form.append(angular.element('<input type="hidden" name="' + key + '" value="' + value + '" />'));
                });
            });

            form.prop({
                action: item.url,
                method: item.method,
                target: iframe.prop('name'),
                enctype: 'multipart/form-data',
                encoding: 'multipart/form-data' // old IE
            });

            iframe.bind('load', function () {
                var xhr = { response: iframe.contents()[ 0 ].body.innerHTML, status: 200, dummy: true };
                var response = that._transformResponse(xhr.response);
                that.trigger('in:success', xhr, item, response);
                that.trigger('in:complete', xhr, item, response);
            });

            form.abort = function() {
                var xhr = { status: 0, dummy: true };
                iframe.unbind('load').prop('src', 'javascript:false;');
                form.replaceWith(input);
                that.trigger('in:cancel', xhr, item);
                that.trigger('in:complete', xhr, item);
            };

            input.after(form);
            form.append(input).append(iframe);

            form[ 0 ].submit();
        },


        /**
         * Checks whether upload successful
         * @param {Number} status
         * @returns {Boolean}
         */
        _isSuccessCode: function(status) {
            return (status >= 200 && status < 300) || status === 304;
        },


        /**
         * Transforms the server response
         * @param {*} response
         * @returns {*}
         */
        _transformResponse: function (response) {
            $http.defaults.transformResponse.forEach(function (transformFn) {
                response = transformFn(response);
            });
            return response;
        }
    };


    // item of queue
    function Item(params) {
        // fix for old browsers
        if (!Uploader.prototype.isHTML5) {
            var input = angular.element(params.file);
            var clone = $compile(input.clone())(params.uploader.scope);
            var value = input.val();

            params.file = {
                lastModifiedDate: null,
                size: null,
                type: 'like/' + value.replace(/^.+\.(?!\.)|.*/, ''),
                name: value.match(/[^\\]+$/)[ 0 ]
            };

            params._input = input;
            clone.prop('value', null); // FF fix
            input.hide().after(clone);
        }

        angular.extend(this, {
            isReady: false,
            isUploading: false,
            isUploaded: false,
            isSuccess: false,
            isCancel: false,
            isError: false,
            progress: null,
            index: null
        }, params);
    }

    Item.prototype = {
        remove: function () {
            this.uploader.removeFromQueue(this);
        },
        upload: function () {
            this.uploader.uploadItem(this);
        },
        cancel: function() {
            this.uploader.cancelItem(this);
        },
        _destroy: function() {
            this._form && this._form.remove();
            this._input && this._input.remove();
            delete this._form;
            delete this._input;
        },
        _beforeupload: function (event, item) {
            item.isReady = true;
            item.isUploading = true;
            item.isUploaded = false;
            item.isSuccess = false;
            item.isCancel = false;
            item.isError = false;
            item.progress = 0;
        },
        _progress: function (event, item, progress) {
            item.progress = progress;
            item.uploader.trigger('progress', item, progress);
        },
        _success: function (event, xhr, item, response) {
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = true;
            item.isSuccess = true;
            item.isCancel = false;
            item.isError = false;
            item.progress = 100;
            item.index = null;
            item.uploader.trigger('success', xhr, item, response);
        },
        _cancel: function(event, xhr, item) {
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = false;
            item.isSuccess = false;
            item.isCancel = true;
            item.isError = false;
            item.progress = 0;
            item.index = null;
            item.uploader.trigger('cancel', xhr, item);
        },
        _error: function (event, xhr, item, response) {
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = true;
            item.isSuccess = false;
            item.isCancel = false;
            item.isError = true;
            item.progress = 100;
            item.index = null;
            item.uploader.trigger('error', xhr, item, response);
        },
        _complete: function (event, xhr, item, response) {
            item.uploader.trigger('complete', xhr, item, response);
            item.removeAfterUpload && item.remove();
        }
    };

    return {
        create: function (params) {
            return new Uploader(params);
        },
        isHTML5: Uploader.prototype.isHTML5
    };
}])

    return app;
}));