(function($angular) {

    "use strict";

    // The truest wisdom is a resolute determination...
    $angular.module('ngDroplet', []).directive('droplet', ['$rootScope', '$window', '$timeout',

    function DropletDirective($rootScope, $window, $timeout) {

        /**
         * @constructor
         */
        var DropletModel = function DropletModel() {};

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'EA',

            /**
             * @property template
             * @type {String}
             */
            template: '<droplet-preview ng-repeat="file in filterFiles(FILE_TYPES.VALID)" ng-model="file"></droplet-preview>',

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
                     * Invoked once the HTTP request has been successfully completed.
                     *
                     * @method success
                     * @param httpRequest {XMLHttpRequest}
                     * @return {void}
                     */
                    success: function success(httpRequest) {

                        $scope.finishedUploading();

                        httpRequest.upload.onload = function onLoad() {

                            $scope.$apply(function apply() {

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
                     * @param httpRequest {XMLHttpRequest}
                     * @param uploadedFiles {Array}
                     * @return {void}
                     */
                    finish: function finish(httpRequest, uploadedFiles) {

                        httpRequest.onreadystatechange = function onReadyStateChange() {

                            if (httpRequest.readyState === 4 && httpRequest.status !== 0) {

                                $scope.$apply(function apply() {

                                    // Parse the response, and then emit the event passing along the response
                                    // and the uploaded files!
                                    var response = $window.JSON.parse(httpRequest.responseText);
                                    $rootScope.$broadcast('$dropletUploaded', response, uploadedFiles);

                                });

                            }

                        };

                    },

                    /**
                     * Invoked when an error is thrown when uploading the files.
                     *
                     * @method error
                     * @param httpRequest {XMLHttpRequest}
                     * @return {void}
                     */
                    error: function error(httpRequest) {

                        httpRequest.upload.onerror = function onError() {

                            $scope.$apply(function apply() {

                                $scope.finishedUploading();
                                $scope.isError = true;

                            });

                        };

                    },

                    /**
                     * Invoked each time there's a progress update on the files being uploaded.
                     *
                     * @method progress
                     * @param httpRequest {XMLHttpRequest}
                     * @param requestLength {Number}
                     * @return {void}
                     */
                    progress: function progress(httpRequest, requestLength) {

                        httpRequest.upload.onprogress = function onProgress(event) {

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
                    var model = { file: file, type: type, date: new $window.Date(), mimeType: file.type,
                                  extension: $scope.getExtension(file) };

                    $scope.files.push(model);
                    return model;

                };

                /**
                 * @method deleteFile
                 * @param model {Object}
                 * @return {void}
                 */
//                $scope.deleteFile = function deleteFile(model) {
//
//
//
//                };

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
                 * @return {void}
                 */
                $scope.uploadFiles = function uploadFiles() {

                    // Reset...
                    $scope.isError = false;

                    var httpRequest   = new $window.XMLHttpRequest(),
                        formData      = new $window.FormData(),
                        queuedFiles   = $scope.filterFiles($scope.FILE_TYPES.VALID),
                        fileProperty  = $scope.options.useArray ? 'file[]' : 'file',
                        requestLength = $scope.getRequestLength(queuedFiles);

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

                        // Configure the event listeners for the impending request.
                        $scope.listeners.finish(httpRequest, queuedFiles);
                        $scope.listeners.success(httpRequest);
                        $scope.listeners.progress(httpRequest, requestLength);
                        $scope.listeners.error(httpRequest);

                    })();

                    // Iterate all of the valid files to append them to the previously created
                    // `formData` object.
                    $angular.forEach(queuedFiles, function forEach(model) {
                        formData.append(fileProperty, model.file);
                    });

                    // Voila...
                    $scope.isUploading = true;
                    httpRequest.send(formData);

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
                 * @private
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
                         * @property isUploading
                         * @type {Object}
                         */
                        isUploading: $scope.isUploading,

                        /**
                         * @property isError
                         * @type {Object}
                         */
                        isError: $scope.isError,

                        /**
                         * @method addFile
                         * @param file {File}
                         * @param type {Number}
                         * @return {void}
                         */
                        addFile: $scope.addFile,

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
            template: '<section class="droplet-preview"><div class="extension-{{model.extension}}" ng-show="!isImage(model.file)"><label>{{model.file.name}}</label></div><img ng-show="isImage(model.file)" ng-src="{{imageData}}" class="droplet-preview" /></section>',

            /**
             * @method controller
             * @param $scope {Object}
             * @return {void}
             */
            controller: ['$scope', function controller($scope) {

                /**
                 * @method isImage
                 * @param file {File}
                 * @return {Boolean}
                 */
                $scope.isImage = function isImage(file) {
                    return !!file.type.match(/^image\//i);
                };

            }],

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

                if (scope.isImage(scope.model.file)) {

                    // Initialise the loading of the image into the file reader.
                    fileReader.readAsDataURL(scope.model.file);

                }


            }

        }

    }]);

})(window.angular);