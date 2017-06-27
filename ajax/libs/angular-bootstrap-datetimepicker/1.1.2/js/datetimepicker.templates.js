/* globals define, module, require, angular */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author       Dale "Ducky" Lotts
 * @since        2016-Jan-31
 */

;(function (root, factory) {
  'use strict'
  /* istanbul ignore if */
  if (typeof module !== 'undefined' && module.exports) {
    var ng = typeof angular === 'undefined' ? require('angular') : angular
    factory(ng)
    module.exports = 'ui.bootstrap.datetimepicker.templates'
    /* istanbul ignore next */
  } else if (typeof define === 'function' && /* istanbul ignore next */ define.amd) {
    define(['angular'], factory)
  } else {
    factory(root.angular, root.moment)
  }
}(this, function (angular) {
  'use strict'
  angular.module('ui.bootstrap.datetimepicker').run(['$templateCache', function ($templateCache) {
    $templateCache.put('templates/datetimepicker.html', '<div class="datetimepicker table-responsive">\n    <table class="table table-condensed {{ data.currentView }}-view">\n        <thead>\n        <tr>\n            <th class="left" data-ng-click="changeView(data.currentView, data.leftDate, $event)" data-ng-show="data.leftDate.selectable"><i class="glyphicon glyphicon-arrow-left"><span class="sr-only">{{ screenReader.previous }}</span></i>\n            </th>\n            <th class="switch" colspan="5" data-ng-show="data.previousViewDate.selectable" data-ng-click="changeView(data.previousView, data.previousViewDate, $event)">{{ data.previousViewDate.display }}</th>\n            <th class="right" data-ng-click="changeView(data.currentView, data.rightDate, $event)" data-ng-show="data.rightDate.selectable"><i class="glyphicon glyphicon-arrow-right"><span class="sr-only">{{ screenReader.next }}</span></i>\n            </th>\n        </tr>\n        <tr>\n            <th class="dow" data-ng-repeat="day in data.dayNames">{{ day }}</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr data-ng-if="data.currentView !== \'day\'">\n            <td colspan="7">\n                          <span class="{{ data.currentView }}" data-ng-repeat="dateObject in data.dates" data-ng-class="{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}" data-ng-click="changeView(data.nextView, dateObject, $event)">{{ dateObject.display }}</span></td>\n        </tr>\n        <tr data-ng-if="data.currentView === \'day\'" data-ng-repeat="week in data.weeks">\n            <td data-ng-repeat="dateObject in week.dates" data-ng-click="changeView(data.nextView, dateObject, $event)" class="day" data-ng-class="{current: dateObject.current, active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}">{{ dateObject.display }}</td>\n        </tr>\n        </tbody>\n    </table>\n</div>\n')
  }])
}))
