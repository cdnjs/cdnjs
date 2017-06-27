angular.module('ngWig')
    .config(['ngWigToolbarProvider', function (ngWigToolbarProvider) {
       ngWigToolbarProvider.addCustomButton('formats', 'nw-formats-button');
    }])
    .directive('nwFormatsButton', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<select class="nw-select" ng-model="format" ng-change="execCommand(\'formatblock\', format.value)" ng-options="format.name for format in formats" ng-disabled="editMode || isDisabled"></select>',
            link: function (scope) {
                scope.formats = [
                    {name: 'Normal text', value: 'p'},
                    {name: 'Header 1', value: 'h1'},
                    {name: 'Header 2', value: 'h2'},
                    {name: 'Header 3', value: 'h3'}
                ];

                scope.format = scope.formats[0];
            }
        };
    });

