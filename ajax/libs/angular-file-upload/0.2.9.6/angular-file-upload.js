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
 * @version: 0.2.9.6, 2013-12-06
 */
var app = angular.module('angularFileUpload', []);

/**
 * The angular file upload module
 * @author: nerv
 * @version: 0.2.9.6, 2013-12-06
 */

// It is attached to an element that catches the event drop file
app.directive('ngFileDrop', [ '$fileUploader', function ($fileUploader) {
    'use strict';

    return {
        // don't use drag-n-drop files in IE9, because not File API support
        link: !$fileUploader.hasHTML5 ? angular.noop : function (scope, element, attributes) {
            element
                .bind('drop', function (event) {
                    var dataTransfer = event.dataTransfer ?
                        event.dataTransfer :
                        event.originalEvent.dataTransfer; // jQuery fix;

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
 * @version: 0.2.9.6, 2013-12-06
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
 * @version: 0.2.9.6, 2013-12-06
 */

// It is attached to <input type="file"> element like <ng-file-select="options">
app.directive('ngFileSelect', [ '$fileUploader', function ($fileUploader) {
    'use strict';

    return {
        link: function (scope, element, attributes) {
            $fileUploader.hasHTML5 || element.removeAttr('multiple');

            element.bind('change', function () {
                scope.$emit('file:add', this.files ? this.files : this, scope.$eval(attributes.ngFileSelect));
                $fileUploader.hasHTML5 && element.prop('value', null);
            });
        }
    };
}]);
/**
 * The angular file upload module
 * @author: nerv
 * @version: 0.2.9.6, 2013-12-06
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
        this.bind('in:error', Item.prototype._error);
        this.bind('in:complete', Item.prototype._complete);
        this.bind('changedqueue', this._changedQueue);
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
         */
        bind: function (event, handler) {
            this.scope.$on(this._timestamp + ':' + event, handler.bind(this));
            return this;
        },

        /**
         * Triggers events
         * @param {String} event
         * @param {...*} [some]
         */
        trigger: function (event, some) {
            arguments[ 0 ] = this._timestamp + ':' + event;
            this.scope.$broadcast.apply(this.scope, arguments);
            return this;
        },

        /**
         * Checks a support the html5 uploader
         * @returns {Boolean}
         */
        hasHTML5: !!($window.File && $window.FormData),

        /**
         * Adds items to the queue
         * @param {FileList|File|Input} items
         * @param {Object} [options]
         */
        addToQueue: function (items, options) {
            var length = this.queue.length;

            angular.forEach('length' in items ? items : [ items ], function (item) {
                var isValid = !this.filters.length ? true : this.filters.every(function (filter) {
                    return filter.call(this, item);
                }, this);

                if (isValid) {
                    item = new Item(angular.extend({
                        url: this.url,
                        alias: this.alias,
                        headers: angular.copy(this.headers),
                        formData: angular.copy(this.formData),
                        removeAfterUpload: this.removeAfterUpload,
                        method: this.method,
                        uploader: this,
                        file: item
                    }, options));

                    this.queue.push(item);
                    this.trigger('afteraddingfile', item);
                }
            }, this);

            if (this.queue.length !== length) {
                this.trigger('afteraddingall', this.queue);
                this.trigger('changedqueue', this.queue);
            }
            this.autoUpload && this.uploadAll();
            return this;
        },

        /**
         * Remove items from the queue. Remove last: index = -1
         * @param {Item|Number} value
         */
        removeFromQueue: function (value) {
            var index = angular.isObject(value) ? this.getIndexOfItem(value) : value;
            var item = this.queue.splice(index, 1)[ 0 ];
            item._destroyForm();
            this.trigger('changedqueue', item);
            return this;
        },

        /**
         * Clears the queue
         */
        clearQueue: function () {
            this.queue.forEach(function (item) {
                item._destroyForm();
            }, this);
            this.queue.length = 0;
            this.trigger('changedqueue', this.queue);
            return this;
        },

        /**
         * Returns a index of item from the queue
         * @param item
         * @returns {Number}
         */
        getIndexOfItem: function (item) {
            return this.queue.indexOf(item);
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
         * Upload a item from the queue
         * @param {Item|Number} value
         */
        uploadItem: function (value) {
            var index = angular.isObject(value) ? this.getIndexOfItem(value) : value;
            var item = this.queue[ index ];
            var transport = item._hasForm() ? '_iframeTransport' : '_xhrTransport';

            item.index = item.index || this._nextIndex++;
            item.isReady = true;

            if (this.isUploading) {
                return this;
            }

            this.isUploading = true;
            this[ transport ](item);
            return this;
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
            return this;
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
            var current = ( value || 0 ) * ratio / 100;

            return Math.round(uploaded * ratio + current);
        },

        /**
         * The 'in:progress' handler
         */
        _progress: function (event, item, progress) {
            var result = this._getTotalProgress(progress);
            this.progress = result;
            this.trigger('progressall', result);
            this.scope.$$phase || this.scope.$apply();
        },

        /**
         * The 'in:complete' handler
         */
        _complete: function () {
            var item = this.getReadyItems()[ 0 ];
            this.isUploading = false;

            if ( angular.isDefined(item) ) {
                this.uploadItem(item);
                return;
            }

            this.progress = this._getTotalProgress();
            this.trigger('completeall', this.queue);
            this.scope.$$phase || this.scope.$apply();
        },

        /**
         * The 'changedqueue' handler
         */
        _changedQueue: function () {
            this.progress = this._getTotalProgress();
            this.scope.$$phase || this.scope.$apply();
        },

        /**
         * The XMLHttpRequest transport
         */
        _xhrTransport: function (item) {
            var xhr = new XMLHttpRequest();
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
            var form = item.file._form;
            var iframe = form.find('iframe');
            var input = form.find('input');
            var that = this;

            this.trigger('beforeupload', item);

            // remove all but the INPUT file type
            angular.forEach(input, function(element) {
                element.type !== 'file' && angular.element(element).remove(); // prevent memory leaks
            });

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

            iframe.unbind().bind('load', function () {
                var xhr = { response: iframe.contents()[ 0 ].body.innerHTML, status: 200, dummy: true };
                var response = that._transformResponse(xhr.response);
                that.trigger('in:complete', xhr, item, response);
            });

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
        if (angular.isElement(params.file)) {
            var input = angular.element(params.file);
            var clone = $compile(input.clone())(params.uploader.scope);
            var form = angular.element('<form style="display: none;" />');
            var iframe = angular.element('<iframe name="iframeTransport' + Date.now() + '">');
            var value = input.val();

            params.file = {
                lastModifiedDate: null,
                size: null,
                type: 'like/' + value.replace(/^.+\.(?!\.)|.*/, ''),
                name: value.match(/[^\\]+$/)[ 0 ],
                _form: form
            };

            input.after(clone).after(form);
            form.append(input).append(iframe);
        }

        angular.extend(this, {
            isReady: false,
            isUploading: false,
            isUploaded: false,
            isSuccess: false,
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
        _hasForm: function() {
            return !!(this.file && this.file._form);
        },
        _destroyForm: function() {
            this._hasForm() && this.file._form.remove();
        },
        _beforeupload: function (event, item) {
            item.isReady = true;
            item.isUploading = true;
            item.isUploaded = false;
            item.isSuccess = false;
            item.isError = false;
            item.progress = null;
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
            item.isError = false;
            item.progress = 100;
            item.index = null;
            item.uploader.trigger('success', xhr, item, response);
        },
        _error: function (event, xhr, item, response) {
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = true;
            item.isSuccess = false;
            item.isError = true;
            item.index = null;
            item.uploader.trigger('error', xhr, item, response);
        },
        _complete: function (event, xhr, item, response) {
            var status = item.uploader._isSuccessCode(xhr.status);
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = true;
            item.isSuccess = status;
            item.isError = !status;
            item.index = null;
            item.uploader.trigger('complete', xhr, item, response);
            item.removeAfterUpload && item.remove();
        }
    };

    return {
        create: function (params) {
            return new Uploader(params);
        },
        hasHTML5: Uploader.prototype.hasHTML5
    };
}])
    return app;
}));