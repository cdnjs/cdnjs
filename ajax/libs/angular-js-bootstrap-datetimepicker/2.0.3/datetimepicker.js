angular.module('ui.bootstrap.datetimepicker', ["ui.bootstrap.dateparser", "ui.bootstrap.datepicker", "ui.bootstrap.timepicker"])
  .directive('datepickerPopup', function () {
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function (scope, element, attr, controller) {
        //remove the default formatter from the input directive to prevent conflict
        controller.$formatters.shift();
      }
    }
  })
  .directive('datetimepicker', [
    function () {

      function versionCheck(){
        return (angular.version.major === 1 && (angular.version.minor > 4 || (angular.version.minor === 4 && angular.version.dot >= 4)));
      }

      if (!versionCheck()) {
        return {
          restrict: 'EA',
          template: "<div class=\"alert alert-danger\">Angular 1.4.4 or above is required for datetimepicker to work correctly</div>"
        };
      }
      return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
          ngModel: '=',
          ngChange: '&',
          dayFormat: "=",
          monthFormat: "=",
          yearFormat: "=",
          minTime: "=",
          maxTime: "=",
          dayHeaderFormat: "=",
          dayTitleFormat: "=",
          monthTitleFormat: "=",
          yearRange: "=",
          dateOptions: "=?",
          dateDisabled: "&",
          dateNgClick: "&",
          hourStep: "=",
          dateOpened: "=",
          minuteStep: "=",
          showMeridian: "=",
          meredians: "=",
          mousewheel: "=",
          readonlyTime: "=",
          readonlyDate: "=",
          disabledDate: "=",
          hiddenTime: "=",
          hiddenDate: "="
        },
        template: function (elem, attrs) {
          function dashCase(name) {
            return name.replace(/[A-Z]/g, function (letter, pos) {
              return (pos ? '-' : '') + letter.toLowerCase();
            });
          }

          function createAttr(innerAttr, dateTimeAttrOpt) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + dateTimeAttr + "\" ";
            } else {
              return '';
            }
          }

          function createFuncAttr(innerAttr, funcArgs, dateTimeAttrOpt, defaultImpl) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + dateTimeAttr + "({" + funcArgs + "})\" ";
            } else {
              return angular.isDefined(defaultImpl) ? dashCase(innerAttr) + "=\"" + defaultImpl + "\"" : "";
            }
          }

          function createEvalAttr(innerAttr, dateTimeAttrOpt) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + attrs[dateTimeAttr] + "\" ";
            } else {
              return dashCase(innerAttr) + " ";
            }
          }

          function createAttrConcat(previousAttrs, attr) {
            return previousAttrs + createAttr.apply(null, attr)
          }

          var dateTmpl = "<div class=\"datetimepicker-wrapper\">" +
            "<input class=\"form-control\" type=\"text\" " +
            "name=\"datepicker\"" +
            "ng-change=\"date_change($event)\" " +
            "is-open=\"innerDateOpened\" " +
            "datepicker-options=\"dateOptions\" " +
            "uib-datepicker-popup=\"{{dateFormat}}\"" +
            "ng-model=\"ngModel\" " + [
              ["dayFormat"],
              ["monthFormat"],
              ["yearFormat"],
              ["dayHeaderFormat"],
              ["dayTitleFormat"],
              ["monthTitleFormat"],
              ["yearRange"],
              ["showButtonBar"],
              ["ngHide", "hiddenDate"],
              ["ngReadonly", "readonlyDate"],
              ["ngDisabled", "disabledDate"]
            ].reduce(createAttrConcat, '') +
            createFuncAttr("ngClick",
              "$event: $event, opened: opened",
              "dateNgClick",
              "open($event)") +
            createEvalAttr("currentText", "currentText") +
            createEvalAttr("clearText", "clearText") +
            createEvalAttr("datepickerAppendToBody", "datepickerAppendToBody") +
            createEvalAttr("closeText", "closeText") +
            createEvalAttr("placeholder", "placeholder") +
            "/>\n" +
            "</div>\n";
          var timeTmpl = "<div class=\"datetimepicker-wrapper\" name=\"timepicker\" ng-model=\"time\" ng-change=\"time_change()\" style=\"display:inline-block\">\n" +
            "<div uib-timepicker min=\"minDate\" max=\"maxDate\" " + [
              ["hourStep"],
              ["minuteStep"],
              ["showMeridian"],
              ["meredians"],
              ["mousewheel"],
              ["ngHide", "hiddenTime"],
              ["ngDisabled", "readonlyTime"]
            ].reduce(createAttrConcat, '') +
            createEvalAttr("showSpinners", "showSpinners") +
            "></div>\n" +
            "</div>";
          // form is isolated so the directive is registered as one component in the parent form (not date and time)
          var tmpl = "<ng-form name=\"datetimepickerForm\" isolate-form>" + dateTmpl + timeTmpl + "</ng-form>";
          return tmpl;
        },
        controller: ['$scope', '$attrs',
          function ($scope, $attrs) {
            $scope.date_change = function () {
              // If we changed the date only, set the time (h,m) on it.
              // This is important in case the previous date was null.
              // This solves the issue when the user set a date and time, cleared the date, and chose another date,
              // and then, the time was cleared too - which is unexpected
              var time = $scope.time;
              if ($scope.ngModel && $scope.time) { // if ngModel is null, that's because the user cleared the date field
                $scope.ngModel.setHours(time.getHours(), time.getMinutes(), 0, 0);
              }
            };
            $scope.time_change = function () {
              if ($scope.ngModel && $scope.time) {
                $scope.ngModel.setHours($scope.time.getHours(), $scope.time.getMinutes(), 0, 0);
              }  // else the time is invalid, keep the current Date value in datepicker
            };
            $scope.open = function ($event) {
              $event.preventDefault();
              $event.stopPropagation();
              $scope.innerDateOpened = true;
            };
            $attrs.$observe('dateFormat', function(newDateFormat, oldValue) {
              $scope.dateFormat = newDateFormat;
            });
            $scope.dateOptions = angular.isDefined($scope.dateOptions) ? $scope.dateOptions : {};
            $scope.dateOptions.dateDisabled = $scope.dateDisabled;
          }
        ],
        link: function (scope, element, attrs, ctrl) {
          var updateMinTime = function() {
            if (!scope.ngModel) {
              return;
            }
            if (scope.minTime) {
              scope.minDate = new Date(scope.ngModel.getFullYear(),
                                       scope.ngModel.getMonth(),
                                       scope.ngModel.getDate(),
                                       scope.minTime.getHours(),
                                       scope.minTime.getMinutes(),
                                       0);
              if (scope.dateOptions.minDate && scope.dateOptions.minDate > scope.minDate) {
                scope.minDate = scope.dateOptions.minDate;
              }
            } else {
              scope.minDate = scope.dateOptions.minDate;
            }
          };
          var updateMaxTime = function() {
            if (!scope.ngModel) {
              return;
            }
            if (scope.maxTime) {
              scope.maxDate = new Date(scope.ngModel.getFullYear(),
                                       scope.ngModel.getMonth(),
                                       scope.ngModel.getDate(),
                                       scope.maxTime.getHours(),
                                       scope.maxTime.getMinutes(),
                                       0);
              if (scope.dateOptions.maxDate && scope.dateOptions.maxDate < scope.maxDate) {
                scope.maxDate = scope.dateOptions.maxDate;
              }
            } else {
              scope.maxDate = scope.dateOptions.maxDate;
            }
          };

          var firstTimeAssign = true;

          scope.$watch(function () {
            return scope.ngModel;
          }, function (newTime) {
            if (scope.ngModel && !(scope.ngModel instanceof Date)) {
                // convert from ISO format to Date
                scope.ngModel = new Date(scope.ngModel);
            }

            var timeElement = element[0].querySelector('[name=timepicker]');

            // if a time element is focused, updating its model will cause hours/minutes to be formatted by padding with leading zeros
            if (timeElement && !timeElement.contains(document.activeElement)) {

              if (newTime === null || newTime === '') { // if the newTime is not defined
                if (firstTimeAssign) { // if it's the first time we assign the time value
                  // create a new default time where the hours, minutes, seconds and milliseconds are set to 0.
                  newTime = new Date();
                  newTime.setHours(0, 0, 0, 0);
                } else { // clear the time
                  scope.time = null;
                  if (scope.ngChange) scope.$eval(scope.ngChange);
                  return;
                }
              }
              // Update timepicker (watch on ng-model in timepicker does not use object equality),
              // also if the ngModel was not a Date, convert it to date
              newTime = new Date(newTime);

              if (isNaN(newTime.getTime()) === false) {
                scope.time = newTime; // change the time in timepicker
                if (firstTimeAssign) {
                  firstTimeAssign = false;
                }
              }
            }
            updateMinTime();
            updateMaxTime();
            if (scope.ngChange) {
              scope.$eval(scope.ngChange);
            }
          }, true);

          scope.$watch(function () {
            return scope.datetimepickerForm && scope.datetimepickerForm.$error;
          }, function (errors) {
            if (angular.isUndefined(errors)) {
              return;
            }
            Object.keys(ctrl.$error).forEach(function (error) {
              ctrl.$setValidity(error, true);
            });
            Object.keys(errors).forEach(function (error) {
              ctrl.$setValidity(error, false);
            });
          }, true);

          scope.$watch(function () {
            return scope.datetimepickerForm && (scope.datetimepickerForm.timepicker.$touched || scope.datetimepickerForm.datepicker.$touched);
          }, function (touched) {
            if (touched) {
              ctrl.$setTouched();
            }
          });

          scope.$watch(function () {
            return scope.datetimepickerForm && scope.datetimepickerForm.$dirty;
          }, function (dirty) {
            if (dirty) {
              ctrl.$setDirty();
            }
          });

          scope.$watch('dateOpened', function (value) {
            scope.innerDateOpened = value;
          });
          scope.$watch('innerDateOpened', function (value) {
            if (angular.isDefined(scope.dateOpened)) {
              scope.dateOpened = value;
            }
          });
          scope.$watch('dateOptions.minDate', function (value) {
            updateMinTime();
          });
          scope.$watch('timeMin', function (value) {
            updateMinTime();
          });
          scope.$watch('dateOptions.maxDate', function (value) {
            updateMaxTime();
          });
          scope.$watch('timeMax', function (value) {
            updateMaxTime();
          });
        }
      }
    }
  ]).directive('isolateForm', [function () {
  return {
    restrict: 'A',
    require: '?form',
    link: function (scope, elm, attrs, ctrl) {
      if (!ctrl) {
        return;
      }
      // Do a copy of the controller
      var ctrlCopy = {};
      angular.copy(ctrl, ctrlCopy);

      // Get the parent of the form
      var parent = elm.parent().controller('form');
      if (!parent) {
        return;
      }
      // Remove parent link to the controller
      parent.$removeControl(ctrl);

      // Replace form controller with an "isolated form"
      var isolatedFormCtrl = {
        $setValidity: function (validationToken, isValid, control) {
          ctrlCopy.$setValidity(validationToken, isValid, control);
          parent.$setValidity(validationToken, true, ctrl);
        }
      };
      angular.extend(ctrl, isolatedFormCtrl);
    }
  };
}]);
