angular.module('ui.bootstrap.datetimepicker', ["ui.bootstrap"])
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
          showWeeks: "=",
          startingDay: "=",
          yearRange: "=",
          dateFormat: "=",
          minDate: "=",
          maxDate: "=",
          dateOptions: "=",
          dateDisabled: "&",
          hourStep: "=",
          minuteStep: "=",
          showMeridian: "=",
          meredians: "=",
          mousewheel: "=",
          readonlyTime: "@"
        },
        template: function(elem, attrs) {
          function dashCase(name, separator) {
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

          function createFuncAttr(innerAttr, funcArgs, dateTimeAttrOpt) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + dateTimeAttr + "({" + funcArgs + "})\" ";
            } else {
              return '';
            }
          }

          function createEvalAttr(innerAttr, dateTimeAttrOpt) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + attrs[dateTimeAttr] + "\" ";
            } else {
              return dashCase(innerAttr);
            }
          }

          function createAttrConcat(previousAttrs, attr) {
            return previousAttrs + createAttr.apply(null, attr)
          }
          var tmpl = "<div class=\"datetimepicker-wrapper\">" +
            "<input class=\"form-control\" type=\"text\" ng-model=\"ngModel\" " + [
              ["min", "minDate"],
              ["max", "maxDate"],
              ["dayFormat"],
              ["monthFormat"],
              ["yearFormat"],
              ["dayHeaderFormat"],
              ["dayTitleFormat"],
              ["monthTitleFormat"],
              ["showWeeks"],
              ["startingDay"],
              ["yearRange"],
              ["datepickerOptions", "dateOptions"]
          ].reduce(createAttrConcat, '') +
            createFuncAttr("dateDisabled", "date: date, mode: mode") +
            createEvalAttr("datepickerPopup", "dateFormat") +
            "/>\n" +
            "</div>\n" +
            "<div class=\"datetimepicker-wrapper\" ng-model=\"time\" ng-change=\"time_change()\" style=\"display:inline-block\">\n" +
            "<timepicker " + [
              ["hourStep"],
              ["minuteStep"],
              ["showMeridian"],
              ["meredians"],
              ["mousewheel"]
          ].reduce(createAttrConcat, '') +
            createEvalAttr("readonlyInput", "readonlyTime") +
            "></timepicker>\n" +
            "</div>";
          return tmpl;
        },
        controller: ['$scope',
          function($scope) {
            $scope.time_change = function() {
              if (angular.isDefined($scope.ngModel) && angular.isDefined($scope.time)) {
                $scope.ngModel.setHours($scope.time.getHours(), $scope.time.getMinutes());
              }
            }
          }
        ],
        link: function(scope) {
          scope.$watch(function() {
            return scope.ngModel;
          }, function(ngModel) {
            scope.time = ngModel;
          });
        }
      }
    }
  ]);
