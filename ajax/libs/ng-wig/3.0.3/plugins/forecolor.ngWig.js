angular.module('ngWig')
  .config(['ngWigToolbarProvider', function(ngWigToolbarProvider) {
    ngWigToolbarProvider.addCustomButton('forecolor', 'nw-forecolor-button');
  }])
  .component('nwForecolorButton', {
    bindings: {
      execCommand: '=',
      editMode: '=',
      disabled: '='
    },
    template: '<button colorpicker ng-model="fontcolor" ng-disabled="$ctrl.editMode || $ctrl.disabled" colorpicker-position="right" class="nw-button font-color" title="Font Color">Font Color</button>',
    controller: function($scope) {
      $scope.$on('colorpicker-selected', ($event, color) => {
        this.execCommand('foreColor', color.value);
      });
    }
  });

