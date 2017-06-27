/**
 *  angular-simple-logger
 *
 * @version: 0.0.1
 * @author: Nicholas McCready
 * @date: Thu Sep 03 2015 03:19:15 GMT-0400 (EDT)
 * @license: MIT
 */angular.module('nemLogging', []).service('nemSimpleLogger', [
  '$log', function($log) {
    var LEVELS, Logger, _fns, log, maybeExecLevel;
    _fns = ['log', 'info', 'debug', 'warn', 'error'];
    LEVELS = {
      log: 1,
      info: 2,
      debug: 3,
      warn: 4,
      error: 5
    };
    maybeExecLevel = function(level, current, fn) {
      if (level >= current) {
        return fn();
      }
    };
    log = function(logLevelFnName, msg) {
      if ($log != null) {
        return $log[logLevelFnName](msg);
      } else {
        return console[logLevelFnName](msg);
      }
    };
    Logger = (function() {
      function Logger() {
        var logFns;
        this.doLog = true;
        logFns = {};
        _fns.forEach((function(_this) {
          return function(level) {
            return logFns[level] = function(msg) {
              if (_this.doLog) {
                return maybeExecLevel(LEVELS[level], _this.currentLevel, function() {
                  return log(level, msg);
                });
              }
            };
          };
        })(this));
        this.LEVELS = LEVELS;
        this.currentLevel = LEVELS.error;
        _fns.forEach((function(_this) {
          return function(fnName) {
            return _this[fnName] = logFns[fnName];
          };
        })(this));
      }

      Logger.prototype.spawn = function() {
        return new Logger();
      };

      Logger.prototype.setLog = function(someLogger) {
        return $log = someLogger;
      };

      return Logger;

    })();
    return new Logger();
  }
]);
