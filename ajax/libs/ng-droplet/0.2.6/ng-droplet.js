(function($angular) {

    "use strict";

    // The truest wisdom is a resolute determination...
    var module = $angular.module('ngDroplet', []).directive('droplet', ['$rootScope', '$window', '$timeout', '$q',

    function DropletDirective($rootScope, $window, $timeout, $q) {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'EA',

            /**
             * @property require
             * @type {String}
             */
            require: '?ngModel',

            /**
             * @property scope
             * @type {Object}
             */
            scope: {
                directiveInterface: '=ngModel'
            },

            /**
             * @method controller
             * @param $scope {Object}
             * @return {void}
             */
            controller: ['$scope', function DropletController($scope) {

                /**
                 * @constant FILE_TYPES
                 * @type {Object}
                 */
                $scope.FILE_TYPES = { VALID: 1, INVALID: 2, DELETED: 4, UPLOADED: 8 };

                /**
                 * @property files
                 * @type {Array}
                 */
                $scope.files = [];

                /**
                 * @property isUploading
                 * @type {Boolean}
                 */
                $scope.isUploading = false;

                /**
                 * @property isError
                 * @type {Boolean}
                 */
                $scope.isError = false;

                /**
                 * @property options
                 * @type {Object}
                 */
                $scope.options = {
                    disableXFileSize: false,
                    useArray: true
                };

                /**
                 * @property extensions
                 * @type {Array}
                 */
                $scope.extensions = [];

                /**
                 * @property requestUrl
                 * @type {String}
                 */
                $scope.requestUrl = '';

                /**
                 * @property requestProgress
                 * @type {Object}
                 */
                $scope.requestProgress = { percent: 0, total: 0, loaded: 0 };

                /**
                 * @property requestHeaders
                 * @type {Object}
                 */
                $scope.requestHeaders = {};

                /**
                 * @property requestPostData
                 * @type {Object}
                 */
                $scope.requestPostData = {};

                /**
                 * @property listeners
                 * @type {Object}
                 */
                $scope.listeners = {

                    /**
                     * @property files
                     * @type {Array}
                     */
                    files: [],

                    /**
                     * @property httpRequest
                     * @type {XMLHttpRequest}
                     */
                    httpRequest: {},

                    /**
                     * @property deferred
                     * @type {$q.defer}
                     */
                    deferred: {},

                    /**
                     * Invoked once the HTTP request has been successfully completed.
                     *
                     * @method success
                     * @return {void}
                     */
                    success: function success() {

                        this.httpRequest.upload.onload = function onLoad() {

                            $scope.$apply(function apply() {

                                $scope.finishedUploading();

                                $scope.forEachFile($scope.FILE_TYPES.VALID, function forEach(model) {

                                    // Advance the status of the file to that of an uploaded file.
                                    model.type = $scope.FILE_TYPES.UPLOADED;

                                });

                            });

                        };

                    },

                    /**
                     * Invoked once everything has been uploaded.
                     *
                     * @method finish
                     * @return {void}
                     */
                    finish: function finish() {

                        this.httpRequest.onreadystatechange = function onReadyStateChange() {

                            if (this.httpRequest.readyState === 4 && this.httpRequest.status !== 0) {

                                $scope.$apply(function apply() {

                                    // Parse the response, and then emit the event passing along the response
                                    // and the uploaded files!
                                    var response = $window.JSON.parse(this.httpRequest.responseText);
                                    $rootScope.$broadcast('$dropletSuccess', response, this.files);
                                    this.deferred.resolve(response, this.files);

                                }.bind(this));

                            }

                        }.bind(this);

                    },

                    /**
                     * Invoked when an error is thrown when uploading the files.
                     *
                     * @method error
                     * @return {void}
                     */
                    error: function error() {

                        this.httpRequest.upload.onerror = function onError() {

                            $scope.$apply(function apply() {

                                $scope.finishedUploading();
                                $scope.isError = true;

                                var response = $window.JSON.parse(this.httpRequest.responseText);
                                $rootScope.$broadcast('$dropletError', response);
                                this.deferred.reject(response);

                            }.bind(this));

                        };

                    },

                    /**
                     * Invoked each time there's a progress update on the files being uploaded.
                     *
                     * @method progress
                     * @return {void}
                     */
                    progress: function progress() {

                        var requestLength = $scope.getRequestLength(this.files);

                        this.httpRequest.upload.onprogress = function onProgress(event) {

                            $scope.$apply(function apply() {

                                if (event.lengthComputable) {

                                    // Update the progress object.
                                    $scope.requestProgress.percent = Math.round((event.loaded / requestLength) * 100);
                                    $scope.requestProgress.loaded  = event.loaded;
                                    $scope.requestProgress.total   = requestLength;

                                }

                            });

                        };

                    }

                };

                /**
                 * @method createModelBlueprint
                 * @return {void}
                 */
                (function createModelBlueprint() {

                    /**
                     * @model DropletModel
                     * @constructor
                     */
                    $scope.DropletModel = function DropletModel() {};

                    /**
                     * @property prototype
                     * @type {Object}
                     */
                    $scope.DropletModel.prototype = {

                        /**
                         * @method file
                         * @param file {File}
                         * @param type {Number}
                         * @return {void}
                         */
                        load: function load(file, type) {

                            this.file      = file;
                            this.type      = type;
                            this.date      = new $window.Date();
                            this.mimeType  = file.type;
                            this.extension = $scope.getExtension(file);

                        },

                        /**
                         * @method deleteFile
                         * @return {void}
                         */
                        deleteFile: function deleteFile() {
                            $scope.deleteFile(this);
                        },

                        /**
                         * @method isImage
                         * @return {Boolean}
                         */
                        isImage: function isImage() {
                            return !!this.file.type.match(/^image\//i);
                        }

                    };

                })();

                /**
                 * @method finishedUploading
                 * @return {void}
                 */
                $scope.finishedUploading = function finishedUploading() {

                    $scope.progress    = { percent: 0, total: 0, loaded: 0 };
                    $scope.isUploading = false;

                };

                /**
                 * Utility method for iterating over files of a given type.
                 *
                 * @method forEachFile
                 * @param type {Number}
                 * @param callbackFn {Function}
                 * @return {void}
                 */
                $scope.forEachFile = function forEachFile(type, callbackFn) {

                    $angular.forEach($scope.filterFiles(type || $scope.FILE_TYPES.VALID), function forEach(model) {
                        callbackFn(model);
                    });

                };

                /**
                 * @method addFile
                 * @param file {File}
                 * @param type {Number}
                 * @return {Object}
                 */
                $scope.addFile = function addFile(file, type) {

                    // If the developer didn't specify the type then we'll assume it's a valid file
                    // that they're adding.
                    type = type || $scope.FILE_TYPES.VALID;

                    // Create the model and then register the file.
                    var model = new $scope.DropletModel();
                    model.load(file, type);

                    $scope.files.push(model);
                    return model;

                };

                /**
                 * @method deleteFile
                 * @throws Exception
                 * @param model {Object}
                 * @return {void}
                 */
                $scope.deleteFile = function deleteFile(model) {

                    if (!(model instanceof $scope.DropletModel)) {
                        $scope.throwException('Method expects an instance of DropletModel');
                    }

                    model.type = $scope.FILE_TYPES.DELETED;

                };

                /**
                 * @method filterFiles
                 * @param type {Number}
                 * @return {Array}
                 */
                $scope.filterFiles = function filterFiles(type) {

                    return $scope.files.filter(function filter(file) {
                        return type & file.type;
                    });

                };

                /**
                 * @method getExtension
                 * @param file {File}
                 * @return {String}
                 */
                $scope.getExtension = function getExtension(file) {
                    return file.name.split('.').pop().trim().toLowerCase();
                };

                /**
                 * @method traverseFiles
                 * @param files {FileList}
                 * @return {void}
                 */
                $scope.traverseFiles = function traverseFiles(files) {

                    $scope.$apply(function apply() {

                        for (var index = 0, numFiles = files.length; index < numFiles; index++) {

                            var file      = files[index],
                                extension = $scope.getExtension(file),
                                type      = $scope.FILE_TYPES.VALID;

                            if ($scope.extensions.indexOf(extension) === -1) {

                                // Invalid extension which we must reject!
                                type = $scope.FILE_TYPES.INVALID

                            }

                            // Finally we'll register the file using the type that has been deduced.
                            $scope.addFile(file, type);

                        }

                    });

                };

                /**
                 * @method uploadFiles
                 * @return {$q.promise}
                 */
                $scope.uploadFiles = function uploadFiles() {

                    // Reset...
                    $scope.isError = false;

                    var httpRequest   = new $window.XMLHttpRequest(),
                        formData      = new $window.FormData(),
                        queuedFiles   = $scope.filterFiles($scope.FILE_TYPES.VALID),
                        fileProperty  = $scope.options.useArray ? 'file[]' : 'file',
                        requestLength = $scope.getRequestLength(queuedFiles),
                        deferred      = $q.defer();

                    // Initiate the HTTP request.
                    httpRequest.open('post', $scope.requestUrl, true);

                    /**
                     * @method appendCustomData
                     * @return {void}
                     */
                    (function appendCustomData() {

                        if (!$scope.options.disableXFileSize) {

                            // Setup the file size of the request.
                            httpRequest.setRequestHeader('X-File-Size', requestLength);

                        }

                        // ...And any other additional HTTP request headers, and POST data.
                        $scope.addRequestHeaders(httpRequest);
                        $scope.addPostData(formData);

                    })();

                    /**
                     * @method attachEventListeners
                     * @return {void}
                     */
                    (function attachEventListeners() {

                        // Define the files property so that each listener has the same interface.
                        $scope.listeners.files       = queuedFiles;
                        $scope.listeners.deferred    = deferred;
                        $scope.listeners.httpRequest = httpRequest;

                        // Configure the event listeners for the impending request.
                        $scope.listeners.progress();
                        $scope.listeners.success();
                        $scope.listeners.error();
                        $scope.listeners.finish();

                    })();

                    // Iterate all of the valid files to append them to the previously created
                    // `formData` object.
                    $angular.forEach(queuedFiles, function forEach(model) {
                        formData.append(fileProperty, model.file);
                    });

                    // Voila...
                    $scope.isUploading = true;
                    httpRequest.send(formData);
                    return deferred.promise;

                };

                /**
                 * Iterate over any additional headers added by the developer and append to the current
                 * request being generated.
                 *
                 * @method addRequestHeaders
                 * @param httpRequest {XMLHttpRequest}
                 * @return {Array}
                 */
                $scope.addRequestHeaders = function addRequestHeaders(httpRequest) {

                    for (var header in $scope.requestHeaders) {

                        if ($scope.requestHeaders.hasOwnProperty(header)) {
                            httpRequest.setRequestHeader(header, $scope.requestHeaders[header]);
                        }

                    }

                    return Object.keys($scope.requestHeaders);

                };

                /**
                 * Iterate over any additional POST data that must be bundled with the request.
                 *
                 * @method addPostData
                 * @param formData {FormData}
                 * @return {Array}
                 */
                $scope.addPostData = function addPostData(formData) {

                    for (var header in $scope.requestPostData) {

                        if ($scope.requestPostData.hasOwnProperty(header)) {
                            formData.append(header, $scope.requestHeaders[header]);
                        }

                    }

                    return Object.keys($scope.requestPostData);

                };

                /**
                 * Determine the size of the request based on the files preparing to be uploaded.
                 *
                 * @method getRequestLength
                 * @param [files=[]] {Array}
                 * @return {Number}
                 */
                $scope.getRequestLength = function getRequestLength(files) {

                    var size = 0;

                    // Iterate over all of the files to determine the size of all valid files.
                    $angular.forEach(files || $scope.filterFiles($scope.FILE_TYPES.VALID), function forEach(model) {
                        size += model.file.size;
                    });

                    return size;

                };

                /**
                 * @method throwException
                 * @param message {String}
                 * @return {void}
                 */
                $scope.throwException = function throwException(message) {
                    throw "ngDroplet: " + message + ".";
                };

                /**
                 * Responsible for setting up the interface that allows the developer to interact
                 * with the directive from outside.
                 *
                 * @method setupDirectiveInterface
                 * @return {void}
                 */
                (function setupDirectiveInterface() {

                    /**
                     * @property directiveInterface
                     * @type {Object}
                     */
                    $scope.directiveInterface = {

                        /**
                         * @constant FILE_TYPES
                         * @type {Object}
                         */
                        FILE_TYPES: $scope.FILE_TYPES,

                        /**
                         * @method uploadFiles
                         * @return {void}
                         */
                        uploadFiles: $scope.uploadFiles,

                        /**
                         * @property progress
                         * @type {Object}
                         */
                        progress: $scope.requestProgress,

                        /**
                         * @method isUploading
                         * @return {Boolean}
                         */
                        isUploading: function isUploading() {
                            return $scope.isUploading;
                        },

                        /**
                         * @method isError
                         * @type {Boolean}
                         */
                        isError: function isError() {
                            return $scope.isError;
                        },

                        /**
                         * Determines if there are files ready and waiting to be uploaded.
                         *
                         * @method isReady
                         * @return {Boolean}
                         */
                        isReady: function isReady() {
                            return !!$scope.filterFiles($scope.FILE_TYPES.VALID).length;
                        },

                        /**
                         * @method addFile
                         * @param file {File}
                         * @param type {Number}
                         * @return {void}
                         */
                        addFile: $scope.addFile,

                        /**
                         * @method traverseFiles
                         * @param files {FileList}
                         * @return {void}
                         */
                        traverseFiles: $scope.traverseFiles,

                        /**
                         * @method disableXFileSize
                         * @return {void}
                         */
                        disableXFileSize: function disableXFileSize() {
                            $scope.options.disableXFileSize = true;
                        },

                        /**
                         * @method useArray
                         * @param value {Boolean}
                         * @return {void}
                         */
                        useArray: function useArray(value) {
                            $scope.options.useArray = !!value;
                        },

                        /**
                         * @method setRequestUrl
                         * @param url {String}
                         * @return {void}
                         */
                        setRequestUrl: function setRequestUrl(url) {
                            $scope.requestUrl = url;
                        },

                        /**
                         * @method setRequestHeaders
                         * @param headers {Object}
                         * @return {void}
                         */
                        setRequestHeaders: function setRequestHeaders(headers) {
                            $scope.requestHeaders = headers;
                        },

                        /**
                         * @method setPostData
                         * @param data {Object}
                         * @return {void}
                         */
                        setPostData: function setPostData(data) {
                            $scope.requestPostData = data;
                        },

                        /**
                         * @method getFiles
                         * @param type {Number}
                         * @return {Array}
                         */
                        getFiles: function getFiles(type) {

                            if (type) {

                                // Apply any necessary filters if a bitwise value has been supplied.
                                return $scope.filterFiles(type);

                            }

                            // Otherwise we'll yield the entire set of files.
                            return $scope.files;

                        },

                        /**
                         * @method allowedExtensions
                         * @param extensions {Array}
                         * @return {void}
                         */
                        allowedExtensions: function allowedExtensions(extensions) {

                            if (!$angular.isArray(extensions)) {

                                // Developer didn't pass an array of extensions!
                                $scope.throwException('Extensions must be an array');

                            }

                            $scope.extensions = extensions;

                        }

                    };

                    $timeout(function timeout() {

                        // Emit the event to notify any listening scopes that the interface has been attached
                        // for communicating with the directive.
                        $rootScope.$broadcast('$dropletReady');

                    });

                })();

            }],

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                /**
                 * @method _preventDefault
                 * @param event {Object}
                 * @return {void}
                 * @private
                 */
                var _preventDefault = function _preventDefault(event) {

                    // Remove all of the possible class names.
                    element.removeClass('event-dragleave');
                    element.removeClass('event-dragenter');
                    element.removeClass('event-dragover');
                    element.removeClass('event-drop');

                    // ...And then add the current class name.
                    element.addClass('event-' + event.type);

                    event.preventDefault();
                    event.stopPropagation();

                };

                // Events that merely need their default behaviour quelling.
                element.bind('dragover dragenter dragleave', _preventDefault);

                // Bind to the "drop" event which will contain the items the user dropped
                // onto the element.
                element.bind('drop', function onDrop(event) {

                    _preventDefault(event);
                    scope.traverseFiles(event.dataTransfer.files);

                });

            }

        }

    }]).directive('dropletPreview', ['$window', function DropletPreviewDirective($window) {

        return {

            /**
             * @property scope
             * @type {Object}
             */
            scope: {
                model: '=ngModel'
            },

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'E',

            /**
             * @property replace
             * @type {Boolean}
             */
            replace: true,

            /**
             * @property template
             * @type {String}
             */
            template: '<img ng-show="model.isImage()" ng-src="{{imageData}}" class="droplet-preview" />',

            /**
             * @method link
             * @param scope {Object}
             * @return {void}
             */
            link: function link(scope) {

                /**
                 * @property imageData
                 * @type {String}
                 */
                scope.imageData = '';

                // Instantiate the file reader for reading the image data.
                var fileReader = new $window.FileReader();

                /**
                 * @method onload
                 * @return {void}
                 */
                fileReader.onload = function onload(event) {

                    scope.$apply(function apply() {

                        // Voila! Define the image data.
                        scope.imageData = event.target.result;

                    });

                };

                if (scope.model.isImage()) {

                    // Initialise the loading of the image into the file reader.
                    fileReader.readAsDataURL(scope.model.file);

                }


            }

        }

    }]);

    /**
     * @method createInputElements
     * @return {void}
     */
    (function createInputElements() {

        /**
         * @method createDirective
         * @return {void}
         */
        var createDirective = function createDirective(name, htmlMarkup) {

            module.directive(name, function DropletUploadSingleDirective() {

                return {

                    /**
                     * @property restrict
                     * @type {String}
                     */
                    restrict: 'EA',

                    /**
                     * @property require
                     * @type {String}
                     */
                    require: 'ngModel',

                    /**
                     * @property replace
                     * @type {Boolean}
                     */
                    replace: true,

                    /**
                     * @property processFileList
                     * @type {String}
                     */
                    template: htmlMarkup,

                    /**
                     * @property scope
                     * @type {Object}
                     */
                    scope: {
                        interface: '=ngModel'
                    },

                    /**
                     * @method link
                     * @param scope {Object}
                     * @param element {Object}
                     * @return {void}
                     */
                    link: function link(scope, element) {

                        // Subscribe to the "change" event.
                        element.bind('change', function onChange() {
                            scope.interface.traverseFiles(element[0].files);
                        });

                    }

                }

            });

        };

        // Create the actual input elements.
        createDirective('dropletUploadSingle', '<inputclass="droplet-upload droplet-single" type="file" />');
        createDirective('dropletUploadMultiple', '<input class="droplet-upload droplet-multiple" type="file" multiple="multiple" />');

    })();

})(window.angular);