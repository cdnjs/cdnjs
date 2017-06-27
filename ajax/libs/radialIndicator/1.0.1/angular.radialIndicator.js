/*
    radialIndicator.js v 1.0.0
    Author: Sudhanshu Yadav
    Copyright (c) 2015 Sudhanshu Yadav - ignitersworld.com , released under the MIT license.
    Demo on: ignitersworld.com/lab/radialIndicator.html
*/

/* Angular hook for radialIndicator */
;
(function (angular) {
    angular.module('radialIndicator', []).directive('radialIndicator', ['radialIndicatorInstance',

    function (radialIndicatorInstance) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var element = element,
                        id = attrs.radialIndicatorId,
                        options = scope.$eval(attrs.radialIndicator),
                        model = attrs.radialIndicatorModel;

                    var indInstance = radialIndicator(element, options);

                    //store indicator instance on radialIndicatorConfig so can get through dependency injection
                    if (id) radialIndicatorInstance[id] = indInstance;

                    //watch for modal change
                    scope.$watch(model, function (newValue) {
                        indInstance.value(newValue);
                    });

                    //delete the idnicator instance when scope dies
                    scope.$on('$destroy', function () {
                        if (id) delete radialIndicatorInstance[id];
                    });

                }
            }
    }])
    //a factory to store radial indicators instances which can be injected to controllers or directive to get any indicators instance
    .factory('radialIndicatorInstance', function () {
        if (!window.radialIndicator) throw "Please include radialIndicator.js";

        var radialIndicatorInstance = {};

        return radialIndicatorInstance;

    });
}(angular));