/**
 *  angular-simple-logger
 *
 * @version: 0.0.4
 * @author: Nicholas McCready
 * @date: Tue Sep 22 2015 17:09:12 GMT-0400 (EDT)
 * @license: MIT
 */var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

angular.module('nemLogging', []).provider('nemSimpleLogger', function() {
  var LEVELS, Logger, _fns, maybeExecLevel;
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
  Logger = (function() {
    function Logger($log1) {
      var logFns;
      this.$log = $log1;
      this.spawn = bind(this.spawn, this);
      if (!this.$log) {
        throw 'internalLogger undefined';
      }
      this.doLog = true;
      logFns = {};
      _fns.forEach((function(_this) {
        return function(level) {
          return logFns[level] = function(msg) {
            if (_this.doLog) {
              return maybeExecLevel(LEVELS[level], _this.currentLevel, function() {
                return _this.$log[level](msg);
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

    Logger.prototype.spawn = function(newInternalLogger) {
      return new Logger(newInternalLogger || this.$log);
    };

    return Logger;

  })();
  this.decorator = [
    '$log', function($delegate) {
      var log;
      log = new Logger($delegate);
      log.currentLevel = LEVELS.log;
      return log;
    }
  ];
  this.$get = [
    '$log', function($log) {
      return new Logger($log);
    }
  ];
  return this;
});
