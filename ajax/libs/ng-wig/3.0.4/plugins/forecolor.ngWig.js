'use strict';

angular.module('ngWig').config(['ngWigToolbarProvider', function (ngWigToolbarProvider) {
  ngWigToolbarProvider.addCustomButton('forecolor', 'nw-forecolor-button');
}]).component('nwForecolorButton', {
  bindings: {
    execCommand: '=',
    editMode: '=',
    disabled: '='
  },
  template: '<button colorpicker ng-model="fontcolor" ng-disabled="$ctrl.editMode || $ctrl.disabled" colorpicker-position="right" class="nw-button font-color" title="Font Color">Font Color</button>',
  controller: ["$scope", function ($scope) {
    var _this = this;

    $scope.$on('colorpicker-selected', function ($event, color) {
      _this.execCommand('foreColor', color.value);
    });
  }]
});
//# sourceMappingURL=forecolor.ngWig.js.map
