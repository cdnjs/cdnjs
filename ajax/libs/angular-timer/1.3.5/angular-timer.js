/**
 * angular-timer - v1.3.5 - 2017-03-09 2:18 PM
 * https://github.com/siddii/angular-timer
 *
 * Copyright (c) 2017 Adrian Wardell
 * Licensed MIT <https://github.com/siddii/angular-timer/blob/master/LICENSE.txt>
 */
var timerModule = angular.module('timer', [])
  .directive('timer', ['$compile', function ($compile) {
    return  {
      restrict: 'EA',
      replace: false,
      scope: {
        interval: '=interval',
        startTimeAttr: '=startTime',
        endTimeAttr: '=endTime',
        countdownattr: '=countdown',
        finishCallback: '&finishCallback',
        autoStart: '&autoStart',
        language: '@?',
        fallback: '@?',
        maxTimeUnit: '=',
        seconds: '=?',
        minutes: '=?',
        hours: '=?',
        days: '=?',
        months: '=?',
        years: '=?',
        secondsS: '=?',
        minutesS: '=?',
        hoursS: '=?',
        daysS: '=?',
        monthsS: '=?',
        yearsS: '=?'
      },
      controller: ['$scope', '$element', '$attrs', '$timeout', 'I18nService', '$interpolate', 'progressBarService', function ($scope, $element, $attrs, $timeout, I18nService, $interpolate, progressBarService) {

        // Checking for trim function since IE8 doesn't have it
        // If not a function, create tirm with RegEx to mimic native trim
        if (typeof String.prototype.trim !== 'function') {
          String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
          };
        }

        //angular 1.2 doesn't support attributes ending in "-start", so we're
        //supporting both "autostart" and "auto-start" as a solution for
        //backward and forward compatibility.
        $scope.autoStart = $attrs.autoStart || $attrs.autostart;


        $scope.language = $scope.language || 'en';
        $scope.fallback = $scope.fallback || 'en';

        //allow to change the language of the directive while already launched
        $scope.$watch('language', function(newVal, oldVal) {
          if(newVal !== undefined) {
            i18nService.init(newVal, $scope.fallback);
          }
        });

        //init momentJS i18n, default english
        var i18nService = new I18nService();
        i18nService.init($scope.language, $scope.fallback);

        //progress bar
        $scope.displayProgressBar = 0;
        $scope.displayProgressActive = 'active'; //Bootstrap active effect for progress bar

        if ($element.html().trim().length === 0) {
          $element.append($compile('<span>' + $interpolate.startSymbol() + 'millis' + $interpolate.endSymbol() + '</span>')($scope));
        } else {
          $element.append($compile($element.contents())($scope));
        }

        $scope.startTime = null;
        $scope.endTime = null;
        $scope.timeoutId = null;
        $scope.countdown = angular.isNumber($scope.countdownattr) && parseInt($scope.countdownattr, 10) >= 0 ? parseInt($scope.countdownattr, 10) : undefined;
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

        $scope.$on('timer-clear', function () {
          $scope.clear();
        });

        $scope.$on('timer-reset', function () {
          $scope.reset();
        });

        $scope.$on('timer-set-countdown', function (e, countdown) {
          $scope.countdown = countdown;
        });

        function resetTimeout() {
          if ($scope.timeoutId) {
            clearTimeout($scope.timeoutId);
          }
        }

        $scope.$watch('startTimeAttr', function(newValue, oldValue) {
          if (newValue !== oldValue && $scope.isRunning) {
            $scope.start();
          }
        });

        $scope.$watch('endTimeAttr', function(newValue, oldValue) {
          if (newValue !== oldValue && $scope.isRunning) {
            $scope.start();
          }
        });

        $scope.start = function () {
          $scope.startTime = $scope.startTimeAttr ? moment($scope.startTimeAttr) : moment();
          $scope.endTime = $scope.endTimeAttr ? moment($scope.endTimeAttr) : null;
          if (!angular.isNumber($scope.countdown)) {
            $scope.countdown = angular.isNumber($scope.countdownattr) && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : undefined;
          }
          resetTimeout();
          tick();
          $scope.isRunning = true;
          $scope.$emit('timer-started', {
            timeoutId: $scope.timeoutId,
            millis: $scope.millis,
            seconds: $scope.seconds,
            minutes: $scope.minutes,
            hours: $scope.hours,
            days: $scope.days
          });
        };

        $scope.resume = function () {
          resetTimeout();
          if ($scope.countdownattr) {
            $scope.countdown += 1;
          }
          $scope.startTime = moment().diff((moment($scope.stoppedTime).diff(moment($scope.startTime))));
          tick();
          $scope.isRunning = true;
          $scope.$emit('timer-started', {
            timeoutId: $scope.timeoutId,
            millis: $scope.millis,
            seconds: $scope.seconds,
            minutes: $scope.minutes,
            hours: $scope.hours,
            days: $scope.days
          });
        };

        $scope.stop = $scope.pause = function () {
          var timeoutId = $scope.timeoutId;
          $scope.clear();
          $scope.$emit('timer-stopped', {
            timeoutId: timeoutId,
            millis: $scope.millis,
            seconds: $scope.seconds,
            minutes: $scope.minutes,
            hours: $scope.hours,
            days: $scope.days
          });
        };

        $scope.clear = function () {
          // same as stop but without the event being triggered
          $scope.stoppedTime = moment();
          resetTimeout();
          $scope.timeoutId = null;
          $scope.isRunning = false;
        };

        $scope.reset = function () {
          $scope.startTime = $scope.startTimeAttr ? moment($scope.startTimeAttr) : moment();
          $scope.endTime = $scope.endTimeAttr ? moment($scope.endTimeAttr) : null;
          $scope.countdown = angular.isNumber($scope.countdownattr) && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : undefined;
          resetTimeout();
          tick();
          $scope.isRunning = false;
          $scope.clear();
          $scope.$emit('timer-reset', {
            timeoutId: timeoutId,
            millis: $scope.millis,
            seconds: $scope.seconds,
            minutes: $scope.minutes,
            hours: $scope.hours,
            days: $scope.days
          });
        };

        $element.bind('$destroy', function () {
          resetTimeout();
          $scope.isRunning = false;
        });


        function calculateTimeUnits() {
          var timeUnits = {}; //will contains time with units

          if ($attrs.startTime !== undefined){
            $scope.millis = moment().diff(moment($scope.startTimeAttr));
          }

          timeUnits = i18nService.getTimeUnits($scope.millis);

          // compute time values based on maxTimeUnit specification
          if (!$scope.maxTimeUnit || $scope.maxTimeUnit === 'day') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
            $scope.days = Math.floor((($scope.millis / (3600000)) / 24));
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'second') {
            $scope.seconds = Math.floor($scope.millis / 1000);
            $scope.minutes = 0;
            $scope.hours = 0;
            $scope.days = 0;
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'minute') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor($scope.millis / 60000);
            $scope.hours = 0;
            $scope.days = 0;
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'hour') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor($scope.millis / 3600000);
            $scope.days = 0;
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'month') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
            $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
            $scope.months = Math.floor((($scope.millis / (3600000)) / 24) / 30);
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'year') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
            $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
            $scope.months = Math.floor((($scope.millis / (3600000)) / 24 / 30) % 12);
            $scope.years = Math.floor(($scope.millis / (3600000)) / 24 / 365);
          }
          // plural - singular unit decision (old syntax, for backwards compatibility and English only, could be deprecated!)
          $scope.secondsS = ($scope.seconds === 1) ? '' : 's';
          $scope.minutesS = ($scope.minutes === 1) ? '' : 's';
          $scope.hoursS = ($scope.hours === 1) ? '' : 's';
          $scope.daysS = ($scope.days === 1)? '' : 's';
          $scope.monthsS = ($scope.months === 1)? '' : 's';
          $scope.yearsS = ($scope.years === 1)? '' : 's';


          // new plural-singular unit decision functions (for custom units and multilingual support)
          $scope.secondUnit = timeUnits.seconds;
          $scope.minuteUnit = timeUnits.minutes;
          $scope.hourUnit = timeUnits.hours;
          $scope.dayUnit = timeUnits.days;
          $scope.monthUnit = timeUnits.months;
          $scope.yearUnit = timeUnits.years;

          //add leading zero if number is smaller than 10
          $scope.sseconds = $scope.seconds < 10 ? '0' + $scope.seconds : $scope.seconds;
          $scope.mminutes = $scope.minutes < 10 ? '0' + $scope.minutes : $scope.minutes;
          $scope.hhours = $scope.hours < 10 ? '0' + $scope.hours : $scope.hours;
          $scope.ddays = $scope.days < 10 ? '0' + $scope.days : $scope.days;
          $scope.mmonths = $scope.months < 10 ? '0' + $scope.months : $scope.months;
          $scope.yyears = $scope.years < 10 ? '0' + $scope.years : $scope.years;

        }

        //determine initial values of time units and add AddSeconds functionality
        if ($scope.countdownattr) {
          $scope.millis = $scope.countdownattr * 1000;

          $scope.addCDSeconds = function (extraSeconds) {
            $scope.countdown += extraSeconds;
            if (!$scope.isRunning) {
              $scope.start();
            }
          };

          $scope.$on('timer-add-cd-seconds', function (e, extraSeconds) {
             $scope.addCDSeconds(extraSeconds);
          });

          $scope.$on('timer-set-countdown-seconds', function (e, countdownSeconds) {
            if (!$scope.isRunning) {
              $scope.clear();
            }

            $scope.countdown = countdownSeconds;
            $scope.millis = countdownSeconds * 1000;
            calculateTimeUnits();
          });
        } else {
          $scope.millis = 0;
        }
        calculateTimeUnits();

        var tick = function tick() {
          var typeTimer = null; // countdown or endTimeAttr
          $scope.millis = moment().diff($scope.startTime);
          var adjustment = $scope.millis % 1000;

          if ($scope.endTimeAttr) {
            typeTimer = $scope.endTimeAttr;
            $scope.millis = moment($scope.endTime).diff(moment());
            adjustment = $scope.interval - $scope.millis % 1000;
          }

          if ($scope.countdownattr) {
            typeTimer = $scope.countdownattr;
            $scope.millis = $scope.countdown * 1000;
          }

          if ($scope.millis < 0) {
            $scope.stop();
            $scope.millis = 0;
            calculateTimeUnits();
            if($scope.finishCallback) {
              $scope.$eval($scope.finishCallback);
            }
            return;
          }
          calculateTimeUnits();

          //We are not using $timeout for a reason. Please read here - https://github.com/siddii/angular-timer/pull/5
          $scope.timeoutId = setTimeout(function () {
              tick();
              // since you choose not to use $timeout, at least preserve angular cycle two way data binding
              // by calling $scope.$apply() instead of $scope.$digest()
              $scope.$apply();
          }, $scope.interval - adjustment);

          $scope.$emit('timer-tick', {
            timeoutId: $scope.timeoutId,
            millis: $scope.millis,
            seconds: $scope.seconds,
            minutes: $scope.minutes,
            hours: $scope.hours,
            days: $scope.days
          });

          if ($scope.countdown > 0) {
            $scope.countdown--;
          }
          else if ($scope.countdown <= 0) {
            $scope.stop();
            if($scope.finishCallback) {
              $scope.$eval($scope.finishCallback);
            }
          }

          if(typeTimer !== null){
            //calculate progress bar
            $scope.progressBar = progressBarService.calculateProgressBar($scope.startTime, $scope.millis, $scope.endTime, $scope.countdownattr);

            if($scope.progressBar === 100){
              $scope.displayProgressActive = ''; //No more Bootstrap active effect
            }
          }
        };

        if ($scope.autoStart === undefined || $scope.autoStart === true) {
          $scope.start();
        }
      }]
    };
  }])
  .directive('timerControls', function() {
    return {
      restrict: 'EA',
      scope: true,
      controller: ['$scope', function($scope) {
        $scope.timerStatus = "reset";
        $scope.$on('timer-started', function() {
          $scope.timerStatus = "started";
        });
        $scope.$on('timer-stopped', function() {
          $scope.timerStatus = "stopped";
        });
        $scope.$on('timer-reset', function() {
          $scope.timerStatus = "reset";
        });
        $scope.timerStart = function() {
          $scope.$broadcast('timer-start');
        };
        $scope.timerStop = function() {
          $scope.$broadcast('timer-stop');
        };
        $scope.timerResume = function() {
          $scope.$broadcast('timer-resume');
        };
        $scope.timerToggle = function() {
          switch ($scope.timerStatus) {
            case "started":
              $scope.timerStop();
              break;
            case "stopped":
              $scope.timerResume();
              break;
            case "reset":
              $scope.timerStart();
              break;
          }
        };
        $scope.timerAddCDSeconds = function(extraSeconds) {
          $scope.$broadcast('timer-add-cd-seconds', extraSeconds);
        };
      }]
    };
  });

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = timerModule;
}

var app = angular.module('timer');

app.factory('I18nService', function() {

    var I18nService = function() {};

    I18nService.prototype.language = 'en';
    I18nService.prototype.fallback = 'en';
    I18nService.prototype.timeHumanizer = {};

    I18nService.prototype.init = function init(lang, fallback) {
        var supported_languages = humanizeDuration.getSupportedLanguages();

        this.fallback = (fallback !== undefined) ? fallback : 'en';
        if (supported_languages.indexOf(fallback) === -1) {
            this.fallback = 'en';
        }

        this.language = lang;
        if (supported_languages.indexOf(lang) === -1) {
            this.language = this.fallback;
        }

        // It should be handle by the user's application itself, and not inside the directive
        // moment init
        // moment.locale(this.language);

        //human duration init, using it because momentjs does not allow accurate time (
        // momentJS: a few moment ago, human duration : 4 seconds ago
        this.timeHumanizer = humanizeDuration.humanizer({
            language: this.language,
            halfUnit:false
        });
    };

    /**
     * get time with units from momentJS i18n
     * @param {int} millis
     * @returns {{millis: string, seconds: string, minutes: string, hours: string, days: string, months: string, years: string}}
     */
    I18nService.prototype.getTimeUnits = function getTimeUnits(millis) {
        var diffFromAlarm = Math.round(millis/1000) * 1000; //time in milliseconds, get rid of the last 3 ms value to avoid 2.12 seconds display

        var time = {};

        if (typeof this.timeHumanizer != 'undefined'){
            time = {
                'millis' : this.timeHumanizer(diffFromAlarm, { units: ["ms"] }),
                'seconds' : this.timeHumanizer(diffFromAlarm, { units: ["s"] }),
                'minutes' : this.timeHumanizer(diffFromAlarm, { units: ["m", "s"] }) ,
                'hours' : this.timeHumanizer(diffFromAlarm, { units: ["h", "m", "s"] }) ,
                'days' : this.timeHumanizer(diffFromAlarm, { units: ["d", "h", "m", "s"] }) ,
                'months' : this.timeHumanizer(diffFromAlarm, { units: ["mo", "d", "h", "m", "s"] }) ,
                'years' : this.timeHumanizer(diffFromAlarm, { units: ["y", "mo", "d", "h", "m", "s"] })
            };
        }
        else {
            console.error('i18nService has not been initialized. You must call i18nService.init("en") for example');
        }

        return time;
    };

    return I18nService;
});

var app = angular.module('timer');

app.factory('progressBarService', function() {

  var ProgressBarService = function() {};

  /**
   * calculate the remaining time in a progress bar in percentage
   * @param {momentjs} startValue in seconds
   * @param {integer} currentCountdown, where are we in the countdown
   * @param {integer} remainingTime, remaining milliseconds
   * @param {integer} endTime, end time, can be undefined
   * @param {integer} coutdown, original coutdown value, can be undefined
   *
   * joke : https://www.youtube.com/watch?v=gENVB6tjq_M
   * @return {float} 0 --> 100
   */
  ProgressBarService.prototype.calculateProgressBar = function calculateProgressBar(startValue, remainingTime, endTimeAttr, coutdown) {
    var displayProgressBar = 0,
      endTimeValue,
      initialCountdown;

    remainingTime = remainingTime / 1000; //seconds


    if(endTimeAttr !== null){
      endTimeValue = moment(endTimeAttr);
      initialCountdown = endTimeValue.diff(startValue, 'seconds');
      displayProgressBar = remainingTime * 100 / initialCountdown;
    }
    else {
      displayProgressBar = remainingTime * 100 / coutdown;
    }

    displayProgressBar = 100 - displayProgressBar; //To have 0 to 100 and not 100 to 0
    displayProgressBar = Math.round(displayProgressBar * 10) / 10; //learn more why : http://stackoverflow.com/questions/588004/is-floating-point-math-broken

    if(displayProgressBar > 100){ //security
      displayProgressBar = 100;
    }

    return displayProgressBar;
  };

  return new ProgressBarService();
});
