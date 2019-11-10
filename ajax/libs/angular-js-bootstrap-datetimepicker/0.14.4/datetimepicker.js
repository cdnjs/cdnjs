angular.module('ui.bootstrap.datetimepicker',
    ["ui.bootstrap.dateparser", "ui.bootstrap.datepicker", "ui.bootstrap.timepicker"]
  )
  .directive('datepickerPopup', function (){
   return {
    restrict: 'EAC',
    require: 'ngModel',
    link: function(scope, element, attr, controller) {
      //remove the default formatter from the input directive to prevent conflict
      controller.$formatters.shift();
    }
   }
  })
  .directive('datetimepicker', [
    function() {
      if (angular.version.full < '1.1.4') {
        return {
          restrict: 'EA',
          template: "<div class=\"alert alert-danger\">Angular 1.1.4 or above is required for datetimepicker to work correctly</div>"
        };
      }
      return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
          ngModel: '=',
          dayFormat: "=",
          monthFormat: "=",
          yearFormat: "=",
          dayHeaderFormat: "=",
          dayTitleFormat: "=",
          monthTitleFormat: "=",
          yearRange: "=",
          dateFormat: "=",
          minDate: "=",
          maxDate: "=",
          dateOptions: "=",
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
          hiddenTime: "=",
          hiddenDate: "="
        },
        template: function(elem, attrs) {
          function dashCase(name) {
            return name.replace(/[A-Z]/g, function(letter, pos) {
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
              return angular.isDefined(defaultImpl) ? dashCase(innerAttr) + "=\"" + defaultImpl + "\"": "";
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
              "ng-change=\"date_change($event)\" " +
              "is-open=\"innerDateOpened\" " +
              "ng-model=\"ngModel\" " + [
              ["minDate"],
              ["maxDate"],
              ["dayFormat"],
              ["monthFormat"],
              ["yearFormat"],
              ["dayHeaderFormat"],
              ["dayTitleFormat"],
              ["monthTitleFormat"],
              ["yearRange"],
              ["datepickerOptions", "dateOptions"],
              ["ngHide", "hiddenDate"],
              ["ngDisabled", "readonlyDate"]
          ].reduce(createAttrConcat, '') +
            createFuncAttr("dateDisabled", "date: date, mode: mode") +
            createFuncAttr("ngClick", 
                "$event: $event, opened: opened", 
                "dateNgClick",
                "open($event)") +
            createEvalAttr("uibDatepickerPopup", "dateFormat") +
            createEvalAttr("currentText", "currentText") +
            createEvalAttr("clearText", "clearText") +
            createEvalAttr("closeText", "closeText") +
            createEvalAttr("placeholder", "placeholder") +
            "/>\n" +
            "</div>\n";
          var timeTmpl = "<div class=\"datetimepicker-wrapper\" ng-model=\"time\" ng-change=\"time_change()\" style=\"display:inline-block\">\n" +
            "<uib-timepicker " + [
              ["hourStep"],
              ["minuteStep"],
              ["showMeridian"],
              ["meredians"],
              ["mousewheel"],
              ["ngHide", "hiddenTime"],
              ["readonlyInput", "readonlyTime"]
            ].reduce(createAttrConcat, '') +
            createEvalAttr("showSpinners", "showSpinners") +
            "></timepicker>\n" +
            "</div>";
          var tmpl = "<ng-form name=\"datetimepickerForm\" isolate-form>" + dateTmpl + timeTmpl + "</ng-form>";
          return tmpl;
        },
        controller: ['$scope',
          function($scope) {
            $scope.date_change = function() {
              // If we changed the date only, set the time (h,m) on it.
              // This is important in case the previous date was null.
              // This solves the issue when the user set a date and time, cleared the date, and chose another date,
              // and then, the time was cleared too - which is unexpected
              var time = $scope.time;
              if ($scope.ngModel) { // if this is null, that's because the user cleared the date field
                $scope.ngModel.setHours(time.getHours(), time.getMinutes(), 0, 0);
              }
            };

            $scope.time_change = function() {
              if ($scope.ngModel && $scope.time) {
                // convert from ISO format to Date
                if (!($scope.ngModel instanceof Date)) $scope.ngModel = new Date($scope.ngModel);
                $scope.ngModel.setHours($scope.time.getHours(), $scope.time.getMinutes(), 0, 0);
              }
            };
            $scope.open = function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              $scope.innerDateOpened = true;
            };
          }
        ],
        link: function(scope, element, attrs, ctrl) {
          var firstTimeAssign = true;

          scope.$watch(function() {
            return scope.ngModel;
          }, function(newTime) { 
            var timeElement = document.evaluate("//*[@ng-model='time']", 
                element[0], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue

            // if a time element is focused, updating its model will cause hours/minutes to be formatted by padding with leading zeros
            if (timeElement && !timeElement.contains(document.activeElement)) {
              if (newTime === null || newTime === '') { // if the newTime is not defined
                if (firstTimeAssign) { // if it's the first time we assign the time value
                  // create a new default time where the hours, minutes, seconds and milliseconds are set to 0.
                  newTime = new Date();
                  newTime.setHours(0, 0, 0, 0);
                } else { // just leave the time unchanged
                  return;
                }
              }
              // Update timepicker (watch on ng-model in timepicker does not use object equality),
              // also if the ngModel was not a Date, convert it to date
              newTime = new Date(newTime);

              if (isNaN(newTime.getTime()) === false) {
                scope.time = newTime; // change the time
                if (firstTimeAssign) {
                  firstTimeAssign = false;
                }
              }
            }
          }, true);
          
          scope.$watch(function() {
            return scope.datetimepickerForm.$error;
          }, function(errors) { 
            Object.keys(ctrl.$error).forEach(function(error) {
              ctrl.$setValidity(error, true);
            });
            Object.keys(errors).forEach(function(error) {
              ctrl.$setValidity(error, false);
            });
          }, 
          true); 
          
          scope.$watch('dateOpened', function(value) {
            scope.innerDateOpened = value;
          });
          scope.$watch('innerDateOpened', function(value) {
            if (angular.isDefined(scope.dateOpened)) {
                scope.dateOpened = value;
            }
          })
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
            // Remove parent link to the controller
            parent.$removeControl(ctrl);

            // Replace form controller with a "isolated form"
            var isolatedFormCtrl = {
                $setValidity: function (validationToken, isValid, control) {
                    ctrlCopy.$setValidity(validationToken, isValid, control);
                    parent.$setValidity(validationToken, true, ctrl);
                },
                $setDirty: function () {
                    elm.removeClass('ng-pristine').addClass('ng-dirty');
                    ctrl.$dirty = true;
                    ctrl.$pristine = false;
                },
            };
            angular.extend(ctrl, isolatedFormCtrl);
        }
    };
  }]);

  

