angular.module('ngWig')
    .config(['ngWigToolbarProvider', function (ngWigToolbarProvider) {
       ngWigToolbarProvider.addCustomButton('forecolor', 'nw-forecolor-button');
    }])
    .directive('nwForecolorButton', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<button colorpicker ng-model="fontcolor" ng-disabled="editMode" colorpicker-position="right" class="nw-button font-color" title="Font Color" ng-disabled="isDisabled">Font Color</button>',
            link: function (scope) {
                scope.$on('colorpicker-selected', function ($event, color) {
                    scope.execCommand('foreColor', color.value);
                });
            }
        };
    });

