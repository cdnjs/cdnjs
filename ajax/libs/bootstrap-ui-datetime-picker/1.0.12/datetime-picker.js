// https://github.com/Gillardo/bootstrap-ui-datetime-picker
// Version: 1.0.12
// Released: 2015-03-23 
angular.module('ui.bootstrap.datetimepicker', ['ui.bootstrap.dateparser', 'ui.bootstrap.position'])
    .directive('datetimePicker', ['$compile', '$parse', '$document', '$timeout', '$position', 'dateFilter', 'dateParser', 'datepickerPopupConfig',
        function ($compile, $parse, $document, $timeout, $position, dateFilter, dateParser, datepickerPopupConfig) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    isOpen: '=?',
                    enableDate: '=?',
                    enableTime: '=?',
                    todayText: '@',
                    nowText: '@',
                    dateText: '@',
                    timeText: '@',
                    clearText: '@',
                    closeText: '@',
                    dateDisabled: '&'
                },
                link: function (scope, element, attrs, ngModel) {
                    var dateFormat, currentDate,
                        closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$parent.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection,
                        appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? scope.$parent.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody;

                    scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? scope.$parent.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar;

                    // determine which pickers should be available. Defaults to date and time
                    scope.enableDate = !(scope.enableDate == false);
                    scope.enableTime = !(scope.enableTime == false);

                    // default picker view
                    scope.showPicker = scope.enableDate ? 'date' : 'time';

                    // default text
                    scope.todayText = scope.todayText || 'Today';
                    scope.nowText = scope.nowText || 'Now';
                    scope.clearText = scope.clearText || 'Clear';
                    scope.closeText = scope.closeText || 'Close';
                    scope.dateText = scope.dateText || 'Date';
                    scope.timeText = scope.timeText || 'Time';

                    scope.getText = function (key) {
                        return scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];
                    };

                    attrs.$observe('datetimePicker', function (value) {
                        dateFormat = value || datepickerPopupConfig.datepickerPopup;
                        ngModel.$render();
                    });

                    // popup element used to display calendar
                    var popupEl = angular.element('' +
                    '<div datetime-picker-popup>' +
                    '<div collapse="!(showPicker == \'date\')" datepicker></div>' +
                    '<div collapse="!(showPicker == \'time\')">' +
                    '<div timepicker style="margin:0 auto"></div>' +
                    '</div>' +
                    '</div>');

                    // get attributes from directive
                    popupEl.attr({
                        'ng-model': 'date',
                        'ng-change': 'dateSelection()'
                    });

                    function cameltoDash(string) {
                        return string.replace(/([A-Z])/g, function ($1) { return '-' + $1.toLowerCase(); });
                    }

                    // datepicker element
                    var datepickerEl = angular.element(popupEl.children()[0]);
                    if (attrs.datepickerOptions) {
                        angular.forEach(scope.$parent.$eval(attrs.datepickerOptions), function (value, option) {
                            datepickerEl.attr(cameltoDash(option), value);
                        });
                    }

                    // timepicker element
                    var timepickerEl = angular.element(popupEl.children()[1].children[0]);
                    if (attrs.timepickerOptions) {
                        angular.forEach(scope.$parent.$eval(attrs.timepickerOptions), function (value, option) {
                            timepickerEl.attr(cameltoDash(option), value);
                        });
                    }

                    // set datepickerMode to day by default as need to create watch
                    // this gets round issue#5 where by the highlight is not shown
                    if (!attrs['datepickerMode']) attrs['datepickerMode'] = 'day';

                    scope.watchData = {};
                    angular.forEach(['minDate', 'maxDate', 'datepickerMode'], function (key) {
                        if (attrs[key]) {
                            var getAttribute = $parse(attrs[key]);

                            // was scope.$parent.$watch, but this is incorrect as added a page level watch
                            // and we would like it just for this picker, not all pickers on the page
                            scope.$watch(getAttribute, function (value) {
                                scope.watchData[key] = value;
                            });
                            datepickerEl.attr(cameltoDash(key), 'watchData.' + key);

                            // Propagate changes from datepicker to outside
                            if (key === 'datepickerMode') {
                                var setAttribute = getAttribute.assign;
                                scope.$watch('watchData.' + key, function (value, oldvalue) {
                                    if (value !== oldvalue) {
                                        setAttribute(scope.$parent, value);
                                    }
                                });
                            }
                        }
                    });

                    if (attrs.dateDisabled) {
                        datepickerEl.attr('date-disabled', 'dateDisabled({ date: date, mode: mode })');
                    }

                    function parseDate(viewValue) {
                        if (!viewValue) {
                            ngModel.$setValidity('date', true);
                            return null;
                        } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
                            ngModel.$setValidity('date', true);
                            return viewValue;
                        } else if (angular.isString(viewValue)) {
                            var date = dateParser.parse(viewValue, dateFormat) || new Date(viewValue);

                            // has problem parsing a time only, so create a date
                            // with the time added on the end, and a dummy formatter
                            // and use this to see if the time is valid
                            if (scope.enableTime && !scope.enableDate) {
                                if (viewValue.length == dateFormat.length) {
                                    var timeFormat = 'EEE MMM dd yyyy ' + dateFormat;
                                    var newTime = 'Fri Mar 12 2015 ' + viewValue;

                                    date = dateParser.parse(newTime, timeFormat) || new Date(newTime);
                                }
                            }

                            if (isNaN(date)) {
                                ngModel.$setValidity('date', false);
                                return undefined;
                            } else {
                                ngModel.$setValidity('date', true);
                                return date;
                            }
                        } else {
                            ngModel.$setValidity('date', false);
                            return undefined;
                        }
                    }
                    ngModel.$parsers.unshift(parseDate);

                    // Inner change
                    scope.dateSelection = function (dt) {
                        // check which picker is being shown, if its sate, all is fine and this is the date
                        // we will use, if its the timePicker but enableDate = true, we need to merge
                        // the values, else timePicker will reset the date
                        if (scope.enableDate && scope.enableTime && scope.showPicker == 'time') {
                            if (currentDate && currentDate !== null && scope.date !== null) {
                                currentDate.setHours(scope.date.getHours());
                                currentDate.setMinutes(scope.date.getMinutes());
                                currentDate.setSeconds(scope.date.getSeconds());
                                currentDate.setMilliseconds(scope.date.getMilliseconds());
                                scope.date = currentDate;
                            }
                        }

                        if (angular.isDefined(dt)) {
                            scope.date = dt;
                        }

                        // store currentDate
                        currentDate = scope.date;

                        ngModel.$setViewValue(scope.date);
                        ngModel.$render();

                        // to get round issue#5 and to force the highlight, if the user has selected a date
                        // lets change the datePicker to month, and then back to day again
                        if (scope.showPicker == 'date') {
                            $timeout(function() {
                                scope.watchData['datepickerMode'] = 'month';

                                $timeout(function() {
                                    scope.watchData['datepickerMode'] = 'day';
                                }, 200);

                            }, 400);
                        }

                        if (closeOnDateSelection) {
                            // do not close when using timePicker
                            if (scope.showPicker != 'time') {
                                // if time is enabled, swap to timePicker
                                if (scope.enableTime) {
                                    scope.showPicker = 'time';
                                } else {
                                    scope.isOpen = false;
                                    element[0].focus();
                                }
                            }
                        }

                    };

                    element.bind('input change keyup', function () {
                        scope.$apply(function () {
                            scope.date = ngModel.$modelValue;
                        });
                    });

                    // Outer change
                    ngModel.$render = function () {
                        var date = ngModel.$viewValue ? parseDate(ngModel.$viewValue) : null;
                        var display = date ? dateFilter(date, dateFormat) : '';
                        element.val(display);
                        scope.date = date;
                    };

                    var documentClickBind = function (event) {
                        if (scope.isOpen && event.target !== element[0]) {
                            scope.$apply(function () {
                                scope.isOpen = false;
                            });
                        }
                    };

                    var keydown = function (evt, noApply) {
                        scope.keydown(evt);
                    };
                    element.bind('keydown', keydown);

                    scope.keydown = function (evt) {
                        if (evt.which === 27) {
                            evt.preventDefault();
                            evt.stopPropagation();
                            scope.close();
                        } else if (evt.which === 40 && !scope.isOpen) {
                            scope.isOpen = true;
                        }
                    };

                    scope.$watch('isOpen', function (value) {
                        if (value) {
                            scope.$broadcast('datepicker.focus');
                            scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                            scope.position.top = scope.position.top + element.prop('offsetHeight');

                            $document.bind('click', documentClickBind);
                        } else {
                            $document.unbind('click', documentClickBind);
                        }
                    });

                    scope.select = function (date) {
                        if (date === 'today' || date == 'now') {
                            var now = new Date();
                            if (angular.isDate(ngModel.$modelValue)) {
                                date = new Date(ngModel.$modelValue);
                                date.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
                                date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
                            } else {
                                date = now;
                            }
                        }
                        scope.dateSelection(date);
                    };

                    scope.close = function () {
                        scope.isOpen = false;
                        element[0].focus();
                    };

                    scope.changePicker = function (e) {
                        scope.showPicker = e;
                    };

                    var $popup = $compile(popupEl)(scope);
                    // Prevent jQuery cache memory leak (template is now redundant after linking)
                    popupEl.remove();

                    if (appendToBody) {
                        $document.find('body').append($popup);
                    } else {
                        element.after($popup);
                    }

                    scope.$on('$destroy', function () {
                        $popup.remove();
                        element.unbind('keydown', keydown);
                        $document.unbind('click', documentClickBind);
                    });
                }
            };
        }])

    .directive('datetimePickerPopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: 'template/datetime-picker.html',
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
        };
    });
angular.module('ui.bootstrap.datetimepicker').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/datetime-picker.html',
    "<ul class=\"dropdown-menu dropdown-menu-right\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', right: position.right+'px'}\" style=left:inherit ng-keydown=keydown($event)><li style=\"padding:0 5px 5px 5px\" class=datetime-picker><div ng-transclude></div></li><li ng-if=showButtonBar style=padding:5px><span class=\"btn-group pull-left\" style=margin-right:10px><button ng-if=\"showPicker == 'date'\" type=button class=\"btn btn-sm btn-info\" ng-click=\"select('today')\">{{ getText('today') }}</button> <button ng-if=\"showPicker == 'time'\" type=button class=\"btn btn-sm btn-info\" ng-click=\"select('now')\">{{ getText('now') }}</button> <button type=button class=\"btn btn-sm btn-danger\" ng-click=select(null)>{{ getText('clear') }}</button></span> <span class=\"btn-group pull-right\"><button ng-if=\"showPicker == 'date' && enableTime\" type=button class=\"btn btn-sm btn-default\" ng-click=\"changePicker('time')\">{{ getText('time')}}</button> <button ng-if=\"showPicker == 'time' && enableDate\" type=button class=\"btn btn-sm btn-default\" ng-click=\"changePicker('date')\">{{ getText('date')}}</button> <button type=button class=\"btn btn-sm btn-success\" ng-click=close()>{{ getText('close') }}</button></span></li></ul>"
  );

}]);
