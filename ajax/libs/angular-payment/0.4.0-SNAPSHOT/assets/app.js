angular.module('paymentDemoApp', ['payment', 'ui.bootstrap.dropdownToggle']);
angular.module('paymentDemoApp').controller('MainCtrl', ['$scope', '$location', '$anchorScroll',
    function ($scope, $location, $anchorScroll) {
        'use strict';

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };
    }]);
