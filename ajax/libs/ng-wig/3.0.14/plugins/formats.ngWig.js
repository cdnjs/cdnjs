'use strict';

angular.module('ngWig').config(['ngWigToolbarProvider', function (ngWigToolbarProvider) {
    ngWigToolbarProvider.addCustomButton('formats', 'nw-formats-button');
}]).component('nwFormatsButton', {
    bindings: {
        execCommand: '=',
        editMode: '=',
        disabled: '='
    },
    template: '<select class="nw-select" \n                           ng-model="$ctrl.format" \n                           ng-change="$ctrl.execCommand(\'formatblock\', $ctrl.format.value)" \n                           ng-options="format.name for format in $ctrl.formats" \n                           ng-disabled="$ctrl.editMode || $ctrl.disabled"></select>',
    controller: function controller() {

        this.formats = [{ name: 'Normal text', value: '<p>' }, { name: 'Header 1', value: '<h1>' }, { name: 'Header 2', value: '<h2>' }, { name: 'Header 3', value: '<h3>' }];

        this.format = this.formats[0];
    }
});
//# sourceMappingURL=formats.ngWig.js.map
