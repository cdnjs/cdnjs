/**
 * angular-timer - v1.0.3 - 2013-09-25 7:08 PM
 * https://github.com/siddii/angular-timer
 *
 * Copyright (c) 2013 Siddique Hameed
 * Licensed MIT <https://github.com/siddii/angular-timer/blob/master/LICENSE.txt>
 */
angular.module('timer', [])
  .directive('timer', ['$compile', function ($compile) {
    return  {
      restrict: 'E',
      replace: false,
      scope: {
        interval: '=interval',
        startTimeAttr: '=startTime',
        countdownattr: '=countdown',
        autoStart: '=autoStart'
      },
      controller: ['$scope', '$element', function ($scope, $element) {
        if ($element.html().trim().length === 0) {
          $element.append($compile('<span>{{millis}}</span>')($scope));
        }

        $scope.startTime = null;
        $scope.timeoutId = null;
        $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) >= 0 ? parseInt($scope.countdownattr, 10) : undefined;
        $scope.isRunning = false;

        $scope.$on('timer-start', function () {
          $scope.start();
        });

        $scope.$on('timer-resume', function () {
          $scope.resume();
        });

        $scope.$on('timer-stop', function () {
          $scope.stop();
        });

        function resetTimeout() {
          if ($scope.timeoutId) {
            clearTimeout($scope.timeoutId);
          }
        }

        $scope.start = $element[0].start = function () {
          $scope.startTime = $scope.startTimeAttr ? new Date($scope.startTimeAttr) : new Date();
          $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : undefined;
          resetTimeout();
          tick();
        };

        $scope.resume = $element[0].resume = function () {
          resetTimeout();
          if ($scope.countdownattr) {
            $scope.countdown += 1;
          }
          $scope.startTime = new Date() - ($scope.stoppedTime - $scope.startTime);
          tick();
        };

        $scope.stop = $scope.pause = $element[0].stop = $element[0].pause = function () {
          $scope.stoppedTime = new Date();
          resetTimeout();
          $scope.$emit('timer-stopped', {millis: $scope.millis, seconds: $scope.seconds, minutes: $scope.minutes, hours: $scope.hours, days: $scope.days});
          $scope.timeoutId = null;
        };

        $element.bind('$destroy', function () {
          resetTimeout();
        });

        function calculateTimeUnits() {
          $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
          $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
          $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
          $scope.days = Math.floor((($scope.millis / (3600000)) / 24));
        }

        //determine initial values of time units
        if ($scope.countdownattr) {
          $scope.millis = $scope.countdownattr * 1000;
        } else {
          $scope.millis = 0;
        }
        calculateTimeUnits();

        var tick = function () {

          $scope.millis = new Date() - $scope.startTime;
          var adjustment = $scope.millis % 1000;

          if ($scope.countdownattr) {
            $scope.millis = $scope.countdown * 1000;
          }

          calculateTimeUnits();
          if ($scope.countdown > 0) {
            $scope.countdown--;
          }
          else if ($scope.countdown <= 0) {
            $scope.stop();
            return;
          }

          //We are not using $timeout for a reason. Please read here - https://github.com/siddii/angular-timer/pull/5
          $scope.timeoutId = setTimeout(function () {
            tick();
            $scope.$apply();
          }, $scope.interval - adjustment);

          $scope.$emit('timer-tick', {timeoutId: $scope.timeoutId, millis: $scope.millis});
        };

        if ($scope.autoStart === undefined || $scope.autoStart === true) {
          $scope.start();
        }
      }]
    };
  }]);
