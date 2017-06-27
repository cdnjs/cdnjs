(function($angular) {

    "use strict";

    /**
     * @property blankImage
     * @type {String}
     */
    var blankImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

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
                interface: '=ngModel'
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
                $scope.FILE_TYPES = { VALID: 1, INVALID: 2, DELETED: 4, UPLOADED: 8, FAILED: 16 };

                // Dynamically add the `ALL` property.
                $scope.FILE_TYPES.ALL = Object.keys($scope.FILE_TYPES).reduce(function map(current, key) {
                    return (current |= $scope.FILE_TYPES[key]);
                }, 0);

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
                 * @method isValid
                 * @param value {String|Number}
                 * @param values {Array}
                 * @return {Boolean}
                 * @private
                 */
                var isValid = function isValid(value, values) {

                    /**
                     * @method conditionallyLowercase
                     * @param value {String|Number}
                     * @return {String|Number}
                     */
                    var conditionallyLowercase = function conditionallyLowercase(value) {

                        if (typeof value === 'string') {
                            return value.toLowerCase();
                        }

                        return value;

                    };

                    return values.some(function some(currentValue) {

                        var isRegExp = (currentValue instanceof $window.RegExp);

                        if (isRegExp) {

                            // Evaluate the status code as a regular expression.
                            return currentValue.test(conditionallyLowercase(value));

                        }

                        return conditionallyLowercase(currentValue) === conditionallyLowercase(value);

                    });

                };

                /**
                 * Responsible for determining if the event is actually a jQuery event, which has therefore
                 * placed the original event inside of the `originalEvent` property.
                 *
                 * @method getEvent
                 * @param event {Object}
                 * @return {Object}
                 */
                $scope.getEvent = function getEvent(event) {

                    if ('originalEvent' in event) {

                        // jQuery likes to send across its own event, and place the original event
                        // in the `originalEvent` property.
                        return event.originalEvent;

                    }

                    return event;

                };

                /**
                 * @method isValidHTTPStatus
                 * @param statusCode {Number}
                 * @return {Boolean}
                 */
                $scope.isValidHTTPStatus = function isValidHTTPStatus(statusCode) {
                    return isValid(statusCode, $scope.options.statuses.success);
                };

                /**
                 * @method isValidExtension
                 * @param extension {String}
                 * @return {Boolean}
                 */
                $scope.isValidExtension = function isValidExtension(extension) {
                    return isValid(extension, $scope.options.extensions);
                };

                /**
                 * @property options
                 * @type {Object}
                 */
                $scope.options = {

                    /**
                     * URL that will be called when making the POST request.
                     *
                     * @property requestUrl
                     * @type {String}
                     */
                    requestUrl: '',

                    /**
                     * Determines whether the X-File-Size header is appended to the request.
                     *
                     * @property disableXFileSize
                     * @type {Boolean}
                     */
                    disableXFileSize: false,

                    /**
                     * @property parserFn
                     * @type {Function}
                     */
                    parserFn: function parserFunction(responseText) {
                        return $window.JSON.parse(responseText);
                    },

                    /**
                     * Whether to use the array notation for the file parameter, or not.
                     *
                     * @property useArray
                     * @type {Boolean}
                     */
                    useArray: true,

                    /**
                     * @property maximumValidFiles
                     * @type {Number|Infinity}
                     * @default Infinity
                     */
                    maximumValidFiles: Infinity,

                    /**
                     * Additional headers to append to the request.
                     *
                     * @property requestHeaders
                     * @type {Object}
                     */
                    requestHeaders: {},

                    /**
                     * Additional POST to data to be appended to the FormData object.
                     *
                     * @property requestPostData
                     * @type {Object}
                     */
                    requestPostData: {},

                    /**
                     * List of valid extensions for uploading to the server.
                     *
                     * @property extensions
                     * @type {Array}
                     */
                    extensions: [],

                    /**
                     * @property statuses
                     * @type {Object}
                     */
                    statuses: {

                        /**
                         * List of HTTP status codes that denote a successful HTTP request.
                         *
                         * @property success
                         * @type {Array}
                         */
                        success: [/2.{2}/]

                    }
                };

                /**
                 * @property requestProgress
                 * @type {Object}
                 */
                $scope.requestProgress = { percent: 0, total: 0, loaded: 0 };

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
                     * @property deferred
                     * @type {$q.defer|null}
                     */
                    deferred: null,

                    /**
                     * @property httpRequest
                     * @type {XMLHttpRequest|null}
                     */
                    httpRequest: null,

                    /**
                     * Invoked once everything has been uploaded.
                     *
                     * @method success
                     * @return {void}
                     */
                    success: function success() {

                        this.httpRequest.onreadystatechange = function onReadyStateChange() {

                            if (this.httpRequest.readyState === 4) {

                                if ($scope.isValidHTTPStatus(this.httpRequest.status)) {

                                    $scope.$apply(function apply() {

                                        // Parse the response, and then emit the event passing along the response
                                        // and the uploaded files!

                                        function parseJSON(str) {
                                            var result;
                                            try {
                                                result = $scope.options.parserFn(str);
                                            } catch (e) {
                                                return str;
                                            }
                                            return result;
                                        }

                                        var response = parseJSON(this.httpRequest.responseText);
                                        this.deferred.resolve(response, this.files);

                                        $scope.finishedUploading();

                                        $angular.forEach(this.files, function forEach(model) {

                                            // Advance the status of the file to that of an uploaded file.
                                            model.setType($scope.FILE_TYPES.UPLOADED);

                                        });

                                        $rootScope.$broadcast('$dropletSuccess', response, this.files);

                                    }.bind(this));

                                    return;

                                }

                                // Error was thrown instead.
                                this.httpRequest.upload.onerror();

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

                                var response = $scope.options.parserFn(this.httpRequest.responseText);
                                $rootScope.$broadcast('$dropletError', response);
                                this.deferred.reject(response);

                            }.bind(this));

                        }.bind(this);

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
                         * @return {void}
                         */
                        load: function load(file) {

                            if (!(file instanceof $window.File) && !(file instanceof $window.Blob)) {
                                $scope.throwException('Loaded files must be an instance of the "File" or "Blob" objects');
                            }

                            this.file      = file;
                            this.date      = new $window.Date();
                            this.mimeType  = file.type;
                            this.extension = $scope.getExtension(file);

                            // File has been added!
                            $rootScope.$broadcast('$dropletFileAdded', this);

                        },

                        /**
                         * @method deleteFile
                         * @return {void}
                         */
                        deleteFile: function deleteFile() {

                            this.setType($scope.FILE_TYPES.DELETED);

                            // File has been deleted!
                            $rootScope.$broadcast('$dropletFileDeleted', this);

                        },

                        /**
                         * @method setType
                         * @param type {Number}
                         * @return {void}
                         */
                        setType: function setType(type) {
                            this.type = type;
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
                    model.setType(type);

                    $scope.files.push(model);
                    model.load(file); //will broadcast the event once the model is complete
                    return model;

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

	                var str, separator;

	                if ( typeof file.name !== 'undefined' ) {
		                str = file.name;
		                separator = '.';
	                } else {
		                str = file.type;
		                separator = '/';
	                }

	                if (str.indexOf(separator) === -1) {
		                // Filename doesn't actually have an extension.
		                return '';
	                }

	                return str.split(separator).pop().trim().toLowerCase();

                };

                /**
                 * @method traverseFiles
                 * @param files {FileList}
                 * @return {void}
                 */
                $scope.traverseFiles = function traverseFiles(files) {

                    for (var index = 0, numFiles = files.length; index < numFiles; index++) {

                        var file      = files[index],
                            extension = $scope.getExtension(file),
                            type      = $scope.FILE_TYPES.VALID,
                            maximum   = $scope.options.maximumValidFiles || Infinity,
                            current   = $scope.filterFiles($scope.FILE_TYPES.VALID).length;

                        if (!$scope.isValidExtension(extension) || current >= maximum) {

                            // Invalid extension which we must reject!
                            type = $scope.FILE_TYPES.INVALID;


                        }

                        // Finally we'll register the file using the type that has been deduced.
                        $scope.addFile(file, type);

                    }

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
                    httpRequest.open('post', $scope.options.requestUrl, true);

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

                    for (var header in $scope.options.requestHeaders) {

                        if ($scope.options.requestHeaders.hasOwnProperty(header)) {
                            httpRequest.setRequestHeader(header, $scope.options.requestHeaders[header]);
                        }

                    }

                    return Object.keys($scope.options.requestHeaders);

                };

                /**
                 * Iterate over any additional POST data that must be bundled with the request.
                 *
                 * @method addPostData
                 * @param formData {FormData}
                 * @return {Array}
                 */
                $scope.addPostData = function addPostData(formData) {

                    for (var header in $scope.options.requestPostData) {

                        if ($scope.options.requestPostData.hasOwnProperty(header)) {
                            formData.append(header, $scope.options.requestPostData[header]);
                        }

                    }

                    return Object.keys($scope.options.requestPostData);

                };

                /**
                 * Determine the size of the request based on the files preparing to be uploaded.
                 *
                 * @method getRequestLength
                 * @param [files=[]] {Array}
                 * @return {Number}
                 */
                $scope.getRequestLength = function getRequestLength(files) {

                    var allFiles = files || $scope.filterFiles($scope.FILE_TYPES.VALID);

                    // Iterate over all of the files to determine the size of all the specified files.
                    return allFiles.reduce(function reduce(previousValue, currentModel) {
                        return previousValue + currentModel.file.size;
                    }, 0);

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
                     * @property interface
                     * @type {Object}
                     */
                    $scope.interface = {

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
                         * @method useParser
                         * @param parserFn {Function}
                         * @return {void}
                         */
                        useParser: function useParser(parserFn) {

                            if (typeof parserFn !== 'function') {
                                $scope.throwException('Parser function must be typeof "function"');
                            }

                            $scope.options.parserFn = parserFn;

                        },

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
                            $scope.options.requestUrl = url;
                        },

                        /**
                         * @method setRequestHeaders
                         * @param headers {Object}
                         * @return {void}
                         */
                        setRequestHeaders: function setRequestHeaders(headers) {
                            $scope.options.requestHeaders = headers;
                        },

                        /**
                         * @method setPostData
                         * @param data {Object}
                         * @return {void}
                         */
                        setPostData: function setPostData(data) {
                            $scope.options.requestPostData = data;
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

                            $scope.options.extensions = extensions;

                        },

                        /**
                         * @method defineHTTPSuccess
                         * @param statuses {Array}
                         * @return {void}
                         */
                        defineHTTPSuccess: function defineHTTPSuccess(statuses) {

                            if (!$angular.isArray(statuses)) {

                                // Developer didn't pass an array of extensions!
                                $scope.throwException('Status list must be an array');

                            }

                            $scope.options.statuses.success = statuses;

                        }

                    };

                    $timeout(function timeout() {

                        // Emit the event to notify any listening scopes that the interface has been attached
                        // for communicating with the directive.
                        $rootScope.$broadcast('$dropletReady', $scope.interface);

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

                    event = scope.getEvent(event);

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

                    scope.$apply(function apply() {

                        event = scope.getEvent(event);
                        scope.traverseFiles(event.dataTransfer.files);

                    });

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
            restrict: 'EA',

            /**
             * @property replace
             * @type {Boolean}
             */
            replace: true,

            /**
             * @property template
             * @type {String}
             */
            template: '<img ng-show="model.isImage()" src="' + blankImage + '" style="background-image: url({{imageData}})" class="droplet-preview" />',

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

                            scope.$apply(function apply() {
                                scope.interface.traverseFiles(element[0].files);
                            });

                        });

                        // Reset the `value` of the element each time a user clicks.
                        element.bind('click', function onClick() {
                            this.value = null;
                        });

                    }

                }

            });

        };

        // Create the actual input elements.
        createDirective('dropletUploadSingle', '<input class="droplet-upload droplet-single" type="file" />');
        createDirective('dropletUploadMultiple', '<input class="droplet-upload droplet-multiple" type="file" multiple="multiple" />');

    })();

})(window.angular);