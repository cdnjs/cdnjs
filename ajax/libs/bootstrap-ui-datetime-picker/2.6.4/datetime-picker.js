// https://github.com/Gillardo/bootstrap-ui-datetime-picker
// Version: 2.6.4
// Released: 2020-01-27 
angular.module('ui.bootstrap.datetimepicker', ['ui.bootstrap.dateparser', 'ui.bootstrap.position'])
    .constant('uiDatetimePickerConfig', {
        dateFormat: 'yyyy-MM-dd HH:mm',
        defaultTime: '00:00:00',
        html5Types: {
            date: 'yyyy-MM-dd',
            'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
            'month': 'yyyy-MM'
        },
        initialPicker: 'date',
        reOpenDefault: false,
        disableFocusStealing: false,
        enableDate: true,
        enableTime: true,
        buttonBar: {
            show: true,
            now: {
                show: true,
                text: 'Now',
                cls: 'btn-sm btn-default'
            },
            today: {
                show: true,
                text: 'Today',
                cls: 'btn-sm btn-default'
            },
            clear: {
                show: true,
                text: 'Clear',
                cls: 'btn-sm btn-default'
            },
            date: {
                show: true,
                text: 'Date',
                cls: 'btn-sm btn-default'
            },
            time: {
                show: true,
                text: 'Time',
                cls: 'btn-sm btn-default'
            },
            close: {
                show: true,
                text: 'Close',
                cls: 'btn-sm btn-default'
            },
            cancel: {
                show: false,
                text: 'Cancel',
                cls: 'btn-sm btn-default'
            }
        },
        closeOnDateSelection: true,
        closeOnTimeNow: true,
        appendToBody: false,
        altInputFormats: [],
        ngModelOptions: { timezone: null },
        saveAs: false,
        readAs: false
    })
    .controller('DateTimePickerController', ['$scope', '$element', '$attrs', '$compile', '$parse', '$document', '$timeout', '$uibPosition', 'dateFilter', 'uibDateParser', 'uiDatetimePickerConfig', '$rootScope',
        function ($scope, $element, $attrs, $compile, $parse, $document, $timeout, $uibPosition, dateFilter, uibDateParser, uiDatetimePickerConfig, $rootScope) {
            var dateFormat = uiDatetimePickerConfig.dateFormat,
                ngModel, ngModelOptions, $popup, cache = {}, watchListeners = [],
                closeOnDateSelection = angular.isDefined($attrs.closeOnDateSelection) ? $scope.$parent.$eval($attrs.closeOnDateSelection) : uiDatetimePickerConfig.closeOnDateSelection,
                closeOnTimeNow = angular.isDefined($attrs.closeOnTimeNow) ? $scope.$parent.$eval($attrs.closeOnTimeNow) : uiDatetimePickerConfig.closeOnTimeNow,
                appendToBody = angular.isDefined($attrs.datepickerAppendToBody) ? $scope.$parent.$eval($attrs.datepickerAppendToBody) : uiDatetimePickerConfig.appendToBody,
                altInputFormats = angular.isDefined($attrs.altInputFormats) ? $scope.$parent.$eval($attrs.altInputFormats) : uiDatetimePickerConfig.altInputFormats,
                saveAs = angular.isDefined($attrs.saveAs) ? $scope.$parent.$eval($attrs.saveAs) || $attrs.saveAs : uiDatetimePickerConfig.saveAs,
                readAs = angular.isDefined($attrs.readAs) ? $scope.$parent.$eval($attrs.readAs) : uiDatetimePickerConfig.readAs,
                currentDateTimeModelValue = null;

            this.init = function (_ngModel) {
                ngModel = _ngModel;
                ngModelOptions = extractOptions(ngModel);

                $scope.buttonBar = angular.isDefined($attrs.buttonBar) ? $scope.$parent.$eval($attrs.buttonBar) : uiDatetimePickerConfig.buttonBar;

                // determine which pickers should be available. Defaults to date and time
                $scope.enableDate = angular.isDefined($scope.enableDate) ? $scope.enableDate : uiDatetimePickerConfig.enableDate;
                $scope.enableTime = angular.isDefined($scope.enableTime) ? $scope.enableTime : uiDatetimePickerConfig.enableTime;

                // determine default picker
                $scope.initialPicker = angular.isDefined($attrs.initialPicker) ? $attrs.initialPicker : ($scope.enableDate ? uiDatetimePickerConfig.initialPicker : 'time');

                // determine the picker to open when control is re-opened
                $scope.reOpenDefault = angular.isDefined($attrs.reOpenDefault) ? $attrs.reOpenDefault : uiDatetimePickerConfig.reOpenDefault;

                // determine if picker should steal focus from datebox on popup
                $scope.disableFocusStealing = angular.isDefined($attrs.disableFocusStealing) ? $attrs.disableFocusStealing : uiDatetimePickerConfig.disableFocusStealing;

                // check if an illegal combination of options exists
                if ($scope.initialPicker === 'date' && !$scope.enableDate) {
                    throw new Error("datetimePicker can't have initialPicker set to date and have enableDate set to false.");
                }

                // default picker view
                $scope.showPicker = !$scope.enableDate ? 'time' : $scope.initialPicker;

                var isHtml5DateInput = false;

                if (uiDatetimePickerConfig.html5Types[$attrs.type]) {
                    dateFormat = uiDatetimePickerConfig.html5Types[$attrs.type];
                    isHtml5DateInput = true;
                } else {
                    dateFormat = $attrs.datetimePicker || uiDatetimePickerConfig.dateFormat;
                    $attrs.$observe('datetimePicker', function (value) {
                        var newDateFormat = value || uiDatetimePickerConfig.dateFormat;

                        if (newDateFormat !== dateFormat) {
                            dateFormat = newDateFormat;
                            ngModel.$modelValue = null;

                            if (!dateFormat) {
                                throw new Error('datetimePicker must have a date format specified.');
                            }
                        }
                    });
                }

                if (!dateFormat) {
                    throw new Error('datetimePicker must have a date format specified.');
                }

                // popup element used to display calendar
                var popupEl = angular.element('' +
                    '<div date-picker-wrap>' +
                    '<div uib-datepicker></div>' +
                    '</div>' +
                    '<div time-picker-wrap>' +
                    '<div uib-timepicker style="margin:0 auto"></div>' +
                    '</div>');

                // get attributes from directive
                popupEl.attr({
                    'ng-model': 'date',
                    'ng-change': 'dateSelection(date)'
                });

                // datepicker element
                var datepickerEl = angular.element(popupEl.children()[0]);

                if (!$scope.datepickerOptions) {
                    $scope.datepickerOptions = {};
                }

                if (isHtml5DateInput) {
                    if ($attrs.type === 'month') {
                        $scope.datepickerOptions.datepickerMode = 'month';
                        $scope.datepickerOptions.minMode = 'month';
                    }
                }

                datepickerEl.attr('datepicker-options', 'datepickerOptions');

                // set datepickerMode to day by default as need to create watch
                // else disabled cannot pass in mode
                if (!angular.isDefined($scope.datepickerOptions.datepickerMode)) {
                    $scope.datepickerOptions.datepickerMode = 'day';
                }

                // timepicker element
                var timepickerEl = angular.element(popupEl.children()[1]);

                if (!$scope.timepickerOptions)
                    $scope.timepickerOptions = {
                        showMeridian: true
                    };

                for (var key in $scope.timepickerOptions) {
                    timepickerEl.attr(cameltoDash(key), 'timepickerOptions.' + key);
                }

                // watch attrs - NOTE: minDate and maxDate are used with datePicker and timePicker.  By using the minDate and maxDate
                // with the timePicker, you can dynamically set the min and max time values.  This cannot be done using the min and max values
                // with the timePickerOptions
                // add a solution to set time picker options min and max.
                angular.forEach(['minDate', 'maxDate', 'initDate'], function (key) {
                    if ($scope.datepickerOptions[key]) {
                        if (key === 'minDate') {
                            if ($scope.timepickerOptions.min) {
                                timepickerEl.attr('min', 'timepickerOptions.min');
                            } else {
                                timepickerEl.attr('min', 'datepickerOptions.minDate');
                            }
                        } else if (key === 'maxDate') {
                            if ($scope.timepickerOptions.max) {
                                timepickerEl.attr('max', 'timepickerOptions.max');
                            } else {
                                timepickerEl.attr('max', 'datepickerOptions.maxDate');
                            }
                        }
                    }
                });

                // do not check showWeeks attr, as should be used via datePickerOptions

                if (!isHtml5DateInput) {
                    // Internal API to maintain the correct ng-invalid-[key] class
                    ngModel.$$parserName = 'datetime';
                    ngModel.$validators.datetime = validator;
                    ngModel.$parsers.unshift(parseDate);
                    ngModel.$formatters.push(function (value) {
                        if (ngModel.$isEmpty(value)) {
                            $scope.date = value;
                            return value;
                        }

                        $scope.date = uibDateParser.fromTimezone(value, ngModelOptions.getOption('timezone'));

                        dateFormat = dateFormat.replace(/M!/, 'MM')
                            .replace(/d!/, 'dd');

                        return uibDateParser.filter($scope.date, dateFormat);
                    });
                } else {
                    ngModel.$formatters.push(function (value) {
                        $scope.date = uibDateParser.fromTimezone(value, ngModelOptions.getOption('timezone'));
                        return value;
                    });
                }

                if (saveAs) {
                    // If it is determined closure var's need to be exposed to the parser, don't add the formatter here.
                    // Instead just call the method from within the stock parser with this context and/or any needed closure variables.
                    if (angular.isFunction(saveAs))
                        ngModel.$parsers.push(saveAs);
                    else
                        ngModel.$parsers.push(saveAsParser);

                    // Assuming if saveAs is !false, we'll want to convert, either pass the function, or the stock str/num -> Date obj formatter.
                    if (angular.isFunction(readAs))
                        ngModel.$formatters.push(readAs);
                    else
                        ngModel.$formatters.push(readAsFormatter);
                }
                // Detect changes in the view from the text box
                ngModel.$viewChangeListeners.push(function () {
                    if ($scope.timepickerOptions.min) {
                        var startHour = new Date($scope.timepickerOptions.min).getHours(),
                            starMinutes = new Date($scope.timepickerOptions.min).getMinutes(),
                            startTime = new Date($scope.date);
                        // set start time, that time picker should use.
                        startTime.setHours(startHour);
                        startTime.setMinutes(starMinutes);
                        $scope.timepickerOptions.min = startTime;
                    }
                    if ($scope.timepickerOptions.max) {
                        var endHour = new Date($scope.timepickerOptions.max).getHours(),
                            endMinutes = new Date($scope.timepickerOptions.max).getMinutes(),
                            endTime = new Date($scope.date);
                        // set start time, that time picker should use.
                        endTime.setHours(endHour);
                        endTime.setMinutes(endMinutes);
                        $scope.timepickerOptions.max = endTime;
                    }
                    $scope.date = parseDateString(ngModel.$viewValue);
                });

                $element.bind('keydown', inputKeydownBind);

                $popup = $compile(popupEl)($scope);
                // Prevent jQuery cache memory leak (template is now redundant after linking)
                popupEl.remove();

                if (appendToBody) {
                    $document.find('body').append($popup);
                } else {
                    $element.after($popup);
                }

                function readAsFormatter(value) {
                    if (ngModel.$isEmpty(value))
                        return value;

                    var d = new Date(value);
                    if (angular.isDate(d) && !isNaN(d))
                        return d;

                    return value;
                }

                function saveAsParser(value) {
                    if (!value || angular.isString(value) || !angular.isDate(value) || isNaN(value))
                        return value;

                    if (saveAs === 'ISO')
                        return value.toISOString();

                    if (saveAs === 'json')
                        return value.toJSON();

                    if (saveAs === 'number')
                        return value.valueOf();

                    if (!isHtml5DateInput) {
                        dateFormat = dateFormat.replace(/M!/, 'MM')
                            .replace(/d!/, 'dd');
                        return uibDateParser.filter(uibDateParser.fromTimezone(value, ngModelOptions.getOption('timezone')), dateFormat);
                    } else {
                        return uibDateParser.fromTimezone(value, ngModelOptions.getOption('timezone')).toLocaleString();
                    }
                }
            };

            // get text
            $scope.getText = function (key) {
                return $scope.buttonBar[key].text || uiDatetimePickerConfig.buttonBar[key].text;
            };

            // get class
            $scope.getClass = function (key) {
                return $scope.buttonBar[key].cls || uiDatetimePickerConfig.buttonBar[key].cls;
            };

            $scope.keydown = function (evt) {
                if (evt.which === 27) {
                    evt.preventDefault();
                    evt.stopPropagation();

                    $scope.close(false);

                    $timeout(function(){
                        $element[0].focus();
                    }, 0);
                }
            };

            // determine if button is to be shown or not
            $scope.doShow = function (key) {
                if (angular.isDefined($scope.buttonBar[key].show))
                    return $scope.buttonBar[key].show;
                else
                    return uiDatetimePickerConfig.buttonBar[key].show;
            };

            // Inner change
            $scope.dateSelection = function (dt, opt) {

                // check if timePicker is being shown and merge dates, so that the date
                // part is never changed, only the time
                if ($scope.enableTime && $scope.showPicker === 'time') {

                    // only proceed if dt is a date
                    if (dt || dt != null) {
                        // check if our $scope.date is null, and if so, set to todays date
                        if (!angular.isDefined($scope.date) || $scope.date == null) {
                            $scope.date = new Date();
                        }

                        // dt will not be undefined if the now or today button is pressed
                        if (dt && dt != null) {
                            // get the existing date and update the time
                            var date1 = new Date($scope.date);
                            date1.setHours(dt.getHours());
                            date1.setMinutes(dt.getMinutes());
                            date1.setSeconds(dt.getSeconds());
                            date1.setMilliseconds(dt.getMilliseconds());
                            dt = date1;
                        }
                    
                    // In case we have an invalid time, save the previous date part
                    } else {
                        $scope.oldDate = $scope.date;
                    }
                }

                if (angular.isDefined(dt)) {
                    if (!$scope.date) {
                        var defaultTime = angular.isDefined($attrs.defaultTime) ? $attrs.defaultTime : uiDatetimePickerConfig.defaultTime;
                        var t = new Date('2001/01/01 ' + defaultTime);

                        if (!isNaN(t) && dt != null) {
                            dt.setHours(t.getHours());
                            dt.setMinutes(t.getMinutes());
                            dt.setSeconds(t.getSeconds());
                            dt.setMilliseconds(t.getMilliseconds());
                        }
                    }
                    $scope.date = dt;

                    if (dt && $scope.oldDate) {
                        dt.setDate($scope.oldDate.getDate());
                        dt.setMonth($scope.oldDate.getMonth());
                        dt.setFullYear($scope.oldDate.getFullYear());
                        delete $scope.oldDate;
                    }
                }

                var date = $scope.date ? dateFilter($scope.date, dateFormat) : null;

                $element.val(date);
                ngModel.$setViewValue(date);

                if (closeOnDateSelection) {
                    // do not close when using timePicker as make impossible to choose a time
                    if ($scope.showPicker !== 'time' && date != null) {
                        // if time is enabled, swap to timePicker
                        if ($scope.enableTime) {
                            $scope.open('time');
                        } else {
                            $scope.close(false);
                        }
                    } else if (closeOnTimeNow && $scope.showPicker === 'time' && date != null && opt === 'now') {
                        $scope.close(false);
                    }
                }

            };

            $scope.$watch('isOpen', function (value) {
                $scope.dropdownStyle = {
                    display: value ? 'block' : 'none'
                };

                if (value) {
                    cache['openDate'] = $scope.date;

                    var position = appendToBody ? $uibPosition.offset($element) : $uibPosition.position($element);

                    if (appendToBody) {
                        $scope.dropdownStyle.top = (position.top + $element.prop('offsetHeight')) + 'px';
                    } else {
                        $scope.dropdownStyle.top = undefined;
                    }

                    $scope.dropdownStyle.left = position.left + 'px';

                    $timeout(function () {
                        if (!$scope.disableFocusStealing) {
                            $scope.$broadcast('uib:datepicker.focus');
                        }
                        $document.bind('click', documentClickBind);
                    }, 0, false);

                    $scope.open($scope.showPicker);
                } else {
                    $document.unbind('click', documentClickBind);
                }
            });

            $scope.isDisabled = function (date) {
                if (date === 'today' || date === 'now')
                    date = uibDateParser.fromTimezone(new Date(), ngModelOptions.getOption('timezone'));

                var dates = {};
                angular.forEach(['minDate', 'maxDate'], function (key) {
                    if (!$scope.datepickerOptions[key]) {
                        dates[key] = null;
                    } else if (angular.isDate($scope.datepickerOptions[key])) {
                        dates[key] = uibDateParser.fromTimezone(new Date($scope.datepickerOptions[key]), ngModelOptions.getOption('timezone'));
                    } else {
                        dates[key] = new Date(dateFilter($scope.datepickerOptions[key], 'medium'));
                    }
                });

                return $scope.datepickerOptions &&
                    dates.minDate && $scope.compare(date, dates.minDate) < 0 ||
                    dates.maxDate && $scope.compare(date, dates.maxDate) > 0;
            };

            $scope.compare = function (date1, date2) {
                return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            };

            $scope.select = function (opt, evt) {
                if (angular.isDefined(evt)) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
				
                var date = null;
                var isNow = opt === 'now';

                if (opt === 'today' || opt === 'now') {
                    var now = new Date();
                    if (angular.isDate($scope.date)) {
                        date = new Date($scope.date);
                        date.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
                        date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
                    } else {
                        date = now;
                    }
                }

                $scope.dateSelection(date, opt);
            };

            $scope.cancel = function (evt) {
                if (angular.isDefined(evt)) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }

                $element.val(dateFilter(currentDateTimeModelValue, dateFormat));
                ngModel.$setViewValue(dateFilter(currentDateTimeModelValue, dateFormat));

                $scope.close(false);
            };

            $scope.open = function (picker, evt) {
                if (angular.isDefined(evt)) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }

                currentDateTimeModelValue = $element.val();

                // need to delay this, else timePicker never shown
                $timeout(function () {
                    $scope.showPicker = picker;
                }, 0);

                // in order to update the timePicker, we need to update the model reference!
                // as found here https://angular-ui.github.io/bootstrap/#/timepicker
                if (picker === 'time') {
                    $timeout(function () {
                        $scope.date = parseDateString(ngModel.$viewValue);
                    }, 50);
                }
            };

            $scope.close = function (closePressed, evt) {
                if (angular.isDefined(evt)) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
				
                $scope.isOpen = false;

                // if enableDate and enableTime are true, reopen the picker in date mode first
                if ($scope.enableDate && $scope.enableTime)
                    $scope.showPicker = $scope.reOpenDefault === false ? 'date' : $scope.reOpenDefault;

                // manually trigger the blur event
                if (ngModelOptions.getOption('updateOn') === 'blur') {
                    $element[0].focus();
                    $timeout(function() {
                        $element[0].blur();
                    }, 50);
                }

                // if a on-close-fn has been defined, lets call it
                // we only call this if closePressed is defined!
                if (angular.isDefined(closePressed)) {
                    $scope.whenClosed({args: {closePressed: closePressed, openDate: cache['openDate'] || null, closeDate: $scope.date}});
                } else {
                    $element[0].focus();
                }
            };

            $scope.$on('$destroy', function () {
                if ($scope.isOpen === true) {
                    if (!$rootScope.$$phase) {
                        $scope.$apply(function () {
                            $scope.close();
                        });
                    }
                }

                watchListeners.forEach(function (a) {
                    a();
                });
                $popup.remove();
                $element.unbind('keydown', inputKeydownBind);
                $document.unbind('click', documentClickBind);
            });

            function extractOptions(ngModelCtrl) {
                var ngModelOptions;

                if (angular.version.minor < 6) { // in angular < 1.6 $options could be missing
                    // guarantee a value
                    ngModelOptions = angular.isObject(ngModelCtrl.$options) ?
                        ngModelCtrl.$options :
                        {
                            timezone: null
                        };

                    // mimic 1.6+ api
                    ngModelOptions.getOption = function (key) {
                        return ngModelOptions[key];
                    };
                } else { // in angular >=1.6 $options is always present
                    ngModelOptions = ngModelCtrl.$options;
                }

                return ngModelOptions;
            }

            function documentClickBind(evt) {
                var popup = $popup[0];
                var dpContainsTarget = $element[0].contains(evt.target);

                // The popup node may not be an element node
                // In some browsers (IE only) element nodes have the 'contains' function
                var popupContainsTarget = popup.contains !== undefined && popup.contains(evt.target);

                if ($scope.isOpen && !(dpContainsTarget || popupContainsTarget)) {
                    $scope.$apply(function () {
                        $scope.close(false);
                    });
                }
            }

            function inputKeydownBind(evt) {
                if (evt.which === 27 && $scope.isOpen) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $scope.$apply(function () {
                        $scope.close(false);
                    });
                    $element[0].focus();
                } else if (evt.which === 40 && !$scope.isOpen) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $scope.$apply(function () {
                        $scope.isOpen = true;
                    });
                }
            }

            function cameltoDash(string) {
                return string.replace(/([A-Z])/g, function ($1) {
                    return '-' + $1.toLowerCase();
                });
            }

            function parseDateString(viewValue) {
                // disabled as not functioning correctly
                // viewValue = applyMask(viewValue) || viewValue;
              
                var date = uibDateParser.parse(viewValue, dateFormat, $scope.date);

                if (isNaN(date)) {
                    for (var i = 0; i < altInputFormats.length; i++) {
                        date = uibDateParser.parse(viewValue, altInputFormats[i], $scope.date);
                        if (!isNaN(date)) {
                            return date;
                        }
                    }
                }
                return date;
            }

            function parseDate(viewValue) {
                if (angular.isNumber(viewValue) && !isNaN(viewValue)) {
                    // presumably timestamp to date object
                    viewValue = new Date(viewValue);
                }

                if (!viewValue) {
                    return null;
                }

                if (angular.isDate(viewValue) && !isNaN(viewValue)) {
                    return viewValue;
                }

                if (angular.isString(viewValue)) {
                    var date = parseDateString(viewValue);
                    if (!isNaN(date)) {
                        return uibDateParser.toTimezone(date, ngModelOptions.getOption('timezone'));
                    }

                    return undefined;
                } else {
                    return undefined;
                }
            }

            function validateMinMax(value) {
                if ($scope.datepickerOptions.minDate && value < $scope.datepickerOptions.minDate) {
                    return false;
                } else {
                    return !($scope.datepickerOptions.maxDate && value > $scope.datepickerOptions.maxDate);
                }
            }

            function validator(modelValue, viewValue) {
                var value = modelValue || viewValue;

                if (!($attrs.ngRequired || $attrs.required) && !value) {
                    return true;
                }

                if (angular.isNumber(value)) {
                    value = new Date(value);
                }

                if (!value) {
                    return true;
                } else if (angular.isDate(value) && !isNaN(value)) {
                    return validateMinMax(value);
                } else if (angular.isDate(new Date(value)) && !isNaN(new Date(value).valueOf())) {
                    return validateMinMax(new Date(value));
                } else if (angular.isString(value)) {
                    return !isNaN(parseDateString(viewValue)) && validateMinMax(parseDateString(viewValue));
                } else {
                    return false;
                }
            }
            
            /**
          	* @description Applies the given mask to the given value.
          	* @param {string} value The raw value.
          	* @param {string} mask The mask string.
          	* @return {string} The value after the mask is applied.
          	*/
          	function applyMask(value) {
          	  
          	  var allowedChars = "mMdDyYsShH";
          		if (!value) {
          			return "";
          		}
          		
          		var pattern = dateFormat.replace(/[mMdDyYsShH]/gi, "\\d");
          		var regx = new RegExp(pattern);
          		if(regx.test(value)) {
          		  return value;
          		}
          		
          		var maskedValue = "";
          		var maskArray = dateFormat.split("");
          		var valueArray = value.split("");
          		var valueArrayIndex = 0;
          
          		for (var maskArrayIndex = 0; maskArrayIndex < maskArray.length; maskArrayIndex++) {
          			if (allowedChars.indexOf(maskArray[maskArrayIndex]) > -1) {
          				if (valueArrayIndex >= valueArray.length) {
          					break;
          				}
          				maskedValue += valueArray[valueArrayIndex++];
          			} else {
          				maskedValue += maskArray[maskArrayIndex];
          			}
          		}
          		return maskedValue;
          	}

        }])
    .directive('datetimePicker', function () {
        return {
            restrict: 'A',
            require: ['ngModel', 'datetimePicker'],
            controller: 'DateTimePickerController',
            scope: {
                isOpen: '=?',
                datepickerOptions: '=?',
                timepickerOptions: '=?',
                enableDate: '=?',
                enableTime: '=?',
                initialPicker: '=?',
                reOpenDefault: '=?',
                whenClosed: '&'
            },
            link: function (scope, element, attrs, ctrls) {
                var ngModel = ctrls[0],
                    ctrl = ctrls[1];

                ctrl.init(ngModel);
            }
        };
    })
    .directive('datePickerWrap', function () {
        return {
            restrict: 'EA',
            priority: 2,
            replace: true,
            transclude: true,
            templateUrl: 'template/date-picker.html'
        };
    })

    .directive('timePickerWrap', function () {
        return {
            restrict: 'EA',
            priority: 2,
            replace: true,
            transclude: true,
            templateUrl: 'template/time-picker.html'
        };
    });

angular.module('ui.bootstrap.datetimepicker').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/date-picker.html',
    "<ul class=\"dropdown-menu dropdown-menu-left datetime-picker-dropdown\" ng-if=\"isOpen && showPicker == 'date'\" ng-style=dropdownStyle style=left:inherit ng-keydown=keydown($event) ng-click=\"$event.preventDefault(); $event.stopPropagation()\"><li style=\"padding:0 5px 5px 5px\" class=date-picker-menu><div ng-transclude></div></li><li style=padding:5px ng-if=buttonBar.show><span class=\"btn-group pull-left\" style=margin-right:10px ng-if=\"doShow('today') || doShow('clear')\"><button type=button class=btn ng-class=\"getClass('today')\" ng-if=\"doShow('today')\" ng-click=\"select('today', $event)\" ng-disabled=\"isDisabled('today')\">{{ getText('today') }}</button> <button type=button class=btn ng-class=\"getClass('clear')\" ng-if=\"doShow('clear')\" ng-click=\"select('clear', $event)\">{{ getText('clear') }}</button></span> <span class=\"btn-group pull-right\" ng-if=\"(doShow('time') && enableTime) || doShow('close') || doShow('cancel')\"><button type=button class=btn ng-class=\"getClass('time')\" ng-if=\"doShow('time') && enableTime\" ng-click=\"open('time', $event)\">{{ getText('time')}}</button> <button type=button class=btn ng-class=\"getClass('close')\" ng-if=\"doShow('close')\" ng-click=\"close(true, $event)\">{{ getText('close') }}</button> <button type=button class=btn ng-class=\"getClass('cancel')\" ng-if=\"doShow('cancel')\" ng-click=cancel($event)>{{ getText('cancel') }}</button></span> <span class=clearfix></span></li></ul>"
  );


  $templateCache.put('template/time-picker.html',
    "<ul class=\"dropdown-menu dropdown-menu-left datetime-picker-dropdown\" ng-if=\"isOpen && showPicker == 'time'\" ng-style=dropdownStyle style=left:inherit ng-keydown=keydown($event) ng-click=\"$event.preventDefault(); $event.stopPropagation()\"><li style=\"padding:0 5px 5px 5px\" class=time-picker-menu><div ng-transclude></div></li><li style=padding:5px ng-if=buttonBar.show><span class=\"btn-group pull-left\" style=margin-right:10px ng-if=\"doShow('now') || doShow('clear')\"><button type=button class=btn ng-class=\"getClass('now')\" ng-if=\"doShow('now')\" ng-click=\"select('now', $event)\" ng-disabled=\"isDisabled('now')\">{{ getText('now') }}</button> <button type=button class=btn ng-class=\"getClass('clear')\" ng-if=\"doShow('clear')\" ng-click=\"select('clear', $event)\">{{ getText('clear') }}</button></span> <span class=\"btn-group pull-right\" ng-if=\"(doShow('date') && enableDate) || doShow('close') || doShow('cancel')\"><button type=button class=btn ng-class=\"getClass('date')\" ng-if=\"doShow('date') && enableDate\" ng-click=\"open('date', $event)\">{{ getText('date')}}</button> <button type=button class=btn ng-class=\"getClass('close')\" ng-if=\"doShow('close')\" ng-click=\"close(true, $event)\">{{ getText('close') }}</button> <button type=button class=btn ng-class=\"getClass('cancel')\" ng-if=\"doShow('cancel')\" ng-click=cancel($event)>{{ getText('cancel') }}</button></span> <span class=clearfix></span></li></ul>"
  );

}]);

if(typeof exports === 'object' && typeof module === 'object') {
    module.exports = 'ui.bootstrap.datetimepicker';
}