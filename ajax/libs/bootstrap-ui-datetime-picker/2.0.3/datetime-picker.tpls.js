angular.module('ui.bootstrap.datetimepicker').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/date-picker.html',
    "<ul ng-if=\"isOpen && showPicker == 'date'\" class=\"dropdown-menu dropdown-menu-left datetime-picker-dropdown\" ng-style=dropdownStyle style=left:inherit ng-keydown=keydown($event) ng-click=$event.stopPropagation()><li style=\"padding:0 5px 5px 5px\" class=date-picker-menu><div ng-transclude></div></li><li ng-if=showButtonBar style=padding:5px><span class=\"btn-group pull-left\" style=margin-right:10px><button type=button class=\"btn btn-sm btn-info\" ng-click=\"select('today')\" ng-disabled=\"isDisabled('today')\">{{ getText('today') }}</button> <button type=button class=\"btn btn-sm btn-danger\" ng-click=\"select('clear')\">{{ getText('clear') }}</button></span> <span class=\"btn-group pull-right\"><button ng-if=enableTime type=button class=\"btn btn-sm btn-default\" ng-click=\"changePicker($event, 'time')\">{{ getText('time')}}</button> <button type=button class=\"btn btn-sm btn-success\" ng-click=close()>{{ getText('close') }}</button></span></li></ul>"
  );


  $templateCache.put('template/time-picker.html',
    "<ul ng-if=\"isOpen && showPicker == 'time'\" class=\"dropdown-menu dropdown-menu-left datetime-picker-dropdown\" ng-style=dropdownStyle style=left:inherit ng-keydown=keydown($event) ng-click=$event.stopPropagation()><li style=\"padding:0 5px 5px 5px\" class=time-picker-menu><div ng-transclude></div></li><li ng-if=showButtonBar style=padding:5px><span class=\"btn-group pull-left\" style=margin-right:10px><button type=button class=\"btn btn-sm btn-info\" ng-click=\"select('now')\" ng-disabled=\"isDisabled('now')\">{{ getText('now') }}</button> <button type=button class=\"btn btn-sm btn-danger\" ng-click=\"select('clear')\">{{ getText('clear') }}</button></span> <span class=\"btn-group pull-right\"><button ng-if=enableDate type=button class=\"btn btn-sm btn-default\" ng-click=\"changePicker($event, 'date')\">{{ getText('date')}}</button> <button type=button class=\"btn btn-sm btn-success\" ng-click=close()>{{ getText('close') }}</button></span></li></ul>"
  );

}]);
