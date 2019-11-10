'use strict';

angular.module('ngWig').config(['ngWigToolbarProvider', function (ngWigToolbarProvider) {
  ngWigToolbarProvider.addCustomButton('clear-styles', 'nw-clear-styles-button');
}]).component('nwClearStylesButton', {
  bindings: {
    editMode: '=',
    disabled: '='
  },
  template: '<button ng-click="$ctrl.clearStyles($event)" ng-disabled="$ctrl.editMode || $ctrl.disabled" class="nw-button clear-styles" title="Clear Styles">Clear Styles</button>',
  controller: function controller() {
    this.clearStyles = function (e) {
      // find the ngWig element that hosts the plugin
      var ngWigElement = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
      if (ngWigElement) {
        var container = angular.element(ngWigElement.querySelector('#ng-wig-editable'));
        container.text(container[0].textContent);
        container[0].focus();
      }
    };
  }
});
//# sourceMappingURL=clear-styles.ngWig.js.map
