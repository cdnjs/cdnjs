(function($angular) {

    "use strict";

    // The truest wisdom is a resolute determination...
    var module = $angular.module('ngDroplet', []);

    module.directive('droplet', ['$compile', function DropletDirective($compile) {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'EA',

            /**
             * @method controller
             * @param $scope {Object}
             * @return {void}
             */
            controller: ['$scope', function DropletController($scope) {

                /**
                 * @property files
                 * @type {Array}
                 */
                $scope.files = [];

                /**
                 * @property validFiles
                 * @type {Array}
                 */
                $scope.validFiles = [];

                /**
                 * @property invalidFiles
                 * @type {Array}
                 */
                $scope.invalidFiles = [];

                /**
                 * @property uploadedFiles
                 * @type {Array}
                 */
                $scope.uploadedFiles = [];

                /**
                 * @property deletedFiles
                 * @type {Array}
                 */
                $scope.deletedFiles = [];

                /**
                 * @property uploadStatus
                 * @type {Object}
                 */
                $scope.uploadStatus = {

                    /**
                     * @property percentComplete
                     * @type {Number}
                     */
                    percentComplete: 0

                };

                /**
                 * @method uploadAllFiles
                 * @return {void}
                 */
                $scope.uploadAllFiles = $angular.noop;

                /**
                 * @method clearAllFiles
                 * @return {void}
                 */
                $scope.clearAllFiles = $angular.noop;

                /**
                 * @method abortUpload
                 * @return {void}
                 */
                $scope.abortUpload = $angular.noop;

            }]

        }

    }]);

})(window.angular);