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
 * @version: 0.2.5.2, 2012-09-25
 */
var app = angular.module('angularFileUpload', []);

/**
 * The angular file upload module
 * @author: nerv
 * @version: 0.2.7, 2012-10-06
 */

// It is attached to an element that catches the event drop file
app.directive('ngFileDrop', function () {
    'use strict';

    return {
        // don't use drag-n-drop files in IE9, because not File API support
        link: !window.File ? angular.noop : function (scope, element, attributes) {
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
})
/**
 * The angular file upload module
 * @author: nerv
 * @version: 0.2.7, 2012-10-06
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
 * @version: 0.2.7, 2012-10-06
 */

// It is attached to <input type="file"> element like <ng-file-select="options">
app.directive('ngFileSelect', function () {
    'use strict';

    return {
        link: function (scope, element, attributes) {
            if (!window.File || !window.FormData) {
                element.removeAttr('multiple');
            }

            element.bind('change', function () {
                scope.$emit('file:add', this.files ? this.files : this, scope.$eval(attributes.ngFileSelect));
                window.File && element.prop('value', null);
            });
        }
    };
});
/**
 * The angular file upload module
 * @author: nerv
 * @version: 0.2.7, 2012-10-06
 */

app.factory('$fileUploader', [ '$compile', '$rootScope', function ($compile, $rootScope) {
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
            filters: [],
            formData: [],
            isUploading: false,
            _uploadNext: false,
            _timestamp: Date.now()
        }, params);

        this._observer = this.scope.$new(true);

        // add the base filter
        this.filters.unshift(this._filter);

        $rootScope.$on('file:add', function (event, items, options) {
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
            this._observer.$on(this._timestamp + ':' + event, handler.bind(this));
        },

        /**
         * Triggers events
         * @param {String} event
         * @param {...*} [some]
         */
        trigger: function (event, some) {
            var params = Array.prototype.slice.call(arguments, 1);
            params.unshift(this._timestamp + ':' + event);
            this._observer.$emit.apply(this._observer, params);
        },

        /**
         * Checks a support the html5 uploader
         * @returns {Boolean}
         */
        hasHTML5: function () {
            return !!(window.File && window.FormData);
        },

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
        },

        /**
         * Remove items from the queue. Remove last: index = -1
         * @param {Item|Number} value
         */
        removeFromQueue: function (value) {
            var index = angular.isObject(value) ? this.getIndexOfItem(value) : value;
            var item = this.queue.splice(index, 1)[ 0 ];
            item.file._form && item.file._form.remove();
            this.trigger('changedqueue', item);
        },

        /**
         * Clears the queue
         */
        clearQueue: function () {
            angular.forEach(this.queue, function (item) {
                item.file._form && item.file._form.remove();
            }, this);
            this.queue.length = 0;
            this.trigger('changedqueue', this.queue);
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
         * Upload a item from the queue
         * @param {Item|Number} value
         */
        uploadItem: function (value) {
            if (this.isUploading) {
                return;
            }

            var index = angular.isObject(value) ? this.getIndexOfItem(value) : value;
            var item = this.queue[ index ];
            var transport = item.file._form ? '_iframeTransport' : '_xhrTransport';
            this.isUploading = true;
            this[ transport ](item);
        },

        uploadAll: function () {
            var item = this.getNotUploadedItems()[ 0 ];
            this._uploadNext = !!item;
            this._uploadNext && this.uploadItem(item);
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

        _progress: function (event, item, progress) {
            var result = this._getTotalProgress(progress);
            this.progress = result;
            this.trigger('progressall', result);
            this.scope.$$phase || this.scope.$apply();
        },

        _complete: function () {
            this.isUploading = false;
            this._uploadNext && this.uploadAll();
            this._uploadNext || this.trigger('completeall', this.queue);
            ( this._uploadNext && this.scope.$$phase ) || this.scope.$apply();
        },

        _changedQueue: function () {
            this.progress = this._getTotalProgress();
            this.scope.$$phase || this.scope.$apply();
        },

        _xhrTransport: function (item) {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            var that = this;

            angular.forEach(item.formData, function(obj) {
                angular.forEach(obj, function(value, key) {
                    form.append(key, value);
                });
            });

            form.append(item.alias, item.file);

            xhr.upload.addEventListener('progress', function (event) {
                var progress = event.lengthComputable ? event.loaded * 100 / event.total : 0;
                that.trigger('in:progress', item, Math.round(progress));
            }, false);

            xhr.addEventListener('load', function () {
                xhr.status === 200 && that.trigger('in:success', xhr, item);
                xhr.status !== 200 && that.trigger('in:error', xhr, item);
                that.trigger('in:complete', xhr, item);
            }, false);

            xhr.addEventListener('error', function () {
                that.trigger('in:error', xhr, item);
                that.trigger('in:complete', xhr, item);
            }, false);

            xhr.addEventListener('abort', function () {
                that.trigger('in:complete', xhr, item);
            }, false);

            this.trigger('beforeupload', item);

            xhr.open('POST', item.url, true);

            angular.forEach(item.headers, function (value, name) {
                xhr.setRequestHeader(name, value);
            });

            xhr.send(form);
        },

        _iframeTransport: function (item) {
            var form = item.file._form;
            var iframe = form.find('iframe');
            var input = form.find('input');
            var that = this;

            // remove all but the INPUT file type
            angular.forEach(input, function(element) {
                element.type !== 'file' && element.parentNode.removeChild(element);
            });

            input.prop('name', item.alias);

            angular.forEach(item.formData, function(obj) {
                angular.forEach(obj, function(value, key) {
                    form.append(
                        angular.element('<input type="hidden" name="' + key + '" value="' + value + '" />')
                    );
                });
            });

            form.prop({
                action: item.url,
                method: 'post',
                target: iframe.prop('name'),
                enctype: 'multipart/form-data',
                encoding: 'multipart/form-data' // old IE
            });

            iframe.unbind().bind('load', function () {
                var xhr = { response: iframe.contents()[ 0 ].body.innerHTML, status: 200, dummy: true };
                that.trigger('in:complete', xhr, item);
            });

            this.trigger('beforeupload', item);

            form[ 0 ].submit();
        }
    };


    // item of queue
    function Item(params) {
        // fix for old browsers
        if (angular.isElement(params.file)) {
            var input = angular.element(params.file);
            var clone = $compile(input.clone())(params.uploader.scope.$new(true));
            var form = angular.element('<form style="display: none;" />');
            var iframe = angular.element('<iframe name="iframeTransport' + +new Date() + '">');
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
            progress: null,
            isUploading: false,
            isUploaded: false
        }, params);
    }

    Item.prototype = {
        remove: function () {
            this.uploader.removeFromQueue(this);
        },
        upload: function () {
            this.uploader.uploadItem(this);
        },
        _beforeupload: function (event, item) {
            item.isUploaded = false;
            item.isUploading = true;
            item.progress = null;
        },
        _progress: function (event, item, progress) {
            item.progress = progress;
            item.uploader.trigger('progress', item, progress);
        },
        _success: function (event, xhr, item) {
            item.isUploaded = true;
            item.isUploading = false;
            item.uploader.trigger('success', xhr, item);
        },
        _error: function (event, xhr, item) {
            item.isUploaded = true;
            item.isUploading = false;
            item.uploader.trigger('error', xhr, item);
        },
        _complete: function (event, xhr, item) {
            item.isUploaded = true;
            item.isUploading = false;
            item.uploader.trigger('complete', xhr, item);
            item.removeAfterUpload && item.remove();
        }
    };

    return {
        create: function (params) {
            return new Uploader(params);
        }
    };
}])
    return app;
}));