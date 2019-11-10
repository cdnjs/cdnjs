(function($angular) {

    "use strict";

    // The truest wisdom is a resolute determination...
    $angular.module('ngDroplet', []).directive('droplet', ['$rootScope', '$window', '$timeout',

    function DropletDirective($rootScope, $window, $timeout) {

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
                $scope.FILE_TYPES = { VALID: 1, INVALID: 2, DELETED: 4 };

                /**
                 * @property files
                 * @type {Array}
                 */
                $scope.files = [];

                /**
                 * @property extensions
                 * @type {Array}
                 */
                $scope.extensions = [];

                /**
                 * @method registerFile
                 * @param file {File}
                 * @return {Function}
                 */
                $scope.registerFile = function registerFile(file) {

                    /**
                     * @method registerFileType
                     * @param type {Number}
                     * @return {void}
                     */
                    return function registerFileType(type) {

                        // If the developer didn't specify the type then we'll assume it's a valid file
                        // that they're adding.
                        type = type || $scope.FILE_TYPES.VALID;

                        // Create the model and then register the file.
                        var model = { file: file, type: type, added: new $window.Date() };
                        $scope.files.push(model);

                    }

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
                                extension = file.name.split('.').pop().trim().toLowerCase(),
                                type      = $scope.FILE_TYPES.VALID;

                            if ($scope.extensions.indexOf(extension) === -1) {

                                // Invalid extension which we must reject!
                                type = $scope.FILE_TYPES.INVALID

                            }

                            // Finally we'll register the file using the type that has been deduced.
                            $scope.registerFile(file)(type);

                        }

                    });

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
                         * @method addFile
                         * @param file {File}
                         * @param type {Number}
                         * @return {void}
                         */
                        addFile: function addFile(file, type) {
                            $scope.registerFile(file)(type || $scope.FILE_TYPES.VALID);
                        },

                        /**
                         * @method getFiles
                         * @param type {Number}
                         * @return {Array}
                         */
                        getFiles: function getFiles(type) {

                            if (type) {

                                // Apply any necessary filters if a bitwise value has been supplied.
                                return $scope.files.filter(function filter(file) {
                                    return type & file.type;
                                });

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

    }]);

})(window.angular);