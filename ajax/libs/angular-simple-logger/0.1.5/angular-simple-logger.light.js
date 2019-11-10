/**
 *  angular-simple-logger
 *
 * @version: 0.1.5
 * @author: Nicholas McCready
 * @date: Wed Oct 21 2015 12:47:46 GMT-0400 (EDT)
 * @license: MIT
 */

(function (window, angular){
  angular.module('nemLogging', []);

angular.module('nemLogging').provider('nemDebug', function (){
  var ourDebug = null;
  
  this.$get =  function(){
    //avail as service
    return ourDebug;
  };

  //avail at provider, config time
  this.debug = ourDebug;

  return this;
});
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

angular.module('nemLogging').provider('nemSimpleLogger', [
  'nemDebugProvider', function(nemDebugProvider) {
    var LEVELS, Logger, _fns, _isValidLogObject, _maybeExecLevel, _wrapDebug, i, key, len, nemDebug, val;
    nemDebug = nemDebugProvider.debug;
    _fns = ['debug', 'info', 'warn', 'error', 'log'];
    LEVELS = {};
    for (key = i = 0, len = _fns.length; i < len; key = ++i) {
      val = _fns[key];
      LEVELS[val] = key;
    }
    _maybeExecLevel = function(level, current, fn) {
      if (level >= current) {
        return fn();
      }
    };
    _isValidLogObject = function(logObject) {
      var isValid, j, len1;
      isValid = false;
      if (!logObject) {
        return isValid;
      }
      for (j = 0, len1 = _fns.length; j < len1; j++) {
        val = _fns[j];
        isValid = (logObject[val] != null) && typeof logObject[val] === 'function';
        if (!isValid) {
          break;
        }
      }
      return isValid;
    };

    /*
      Overide logeObject.debug with a nemDebug instance
      see: https://github.com/visionmedia/debug/blob/master/Readme.md
     */
    _wrapDebug = function(debugStrLevel, logObject) {
      var debugInstance, j, len1, newLogger;
      debugInstance = nemDebug(debugStrLevel);
      newLogger = {};
      for (j = 0, len1 = _fns.length; j < len1; j++) {
        val = _fns[j];
        newLogger[val] = val === 'debug' ? debugInstance : logObject[val];
      }
      return newLogger;
    };
    Logger = (function() {
      function Logger($log1) {
        var fn1, j, len1, level, logFns;
        this.$log = $log1;
        this.spawn = bind(this.spawn, this);
        if (!this.$log) {
          throw 'internalLogger undefined';
        }
        if (!_isValidLogObject(this.$log)) {
          throw '@$log is invalid';
        }
        this.doLog = true;
        logFns = {};
        fn1 = (function(_this) {
          return function(level) {
            logFns[level] = function(msg) {
              if (_this.doLog) {
                return _maybeExecLevel(LEVELS[level], _this.currentLevel, function() {
                  return _this.$log[level](msg);
                });
              }
            };
            return _this[level] = logFns[level];
          };
        })(this);
        for (j = 0, len1 = _fns.length; j < len1; j++) {
          level = _fns[j];
          fn1(level);
        }
        this.LEVELS = LEVELS;
        this.currentLevel = LEVELS.error;
      }

      Logger.prototype.spawn = function(newInternalLogger) {
        if (typeof newInternalLogger === 'string') {
          if (!_isValidLogObject(this.$log)) {
            throw '@$log is invalid';
          }
          if (!nemDebug) {
            throw 'nemDebug is undefined this is probably the light version of this library sep debug logggers is not supported!';
          }
          return _wrapDebug(newInternalLogger, this.$log);
        }
        return new Logger(newInternalLogger || this.$log);
      };

      return Logger;

    })();
    this.decorator = [
      '$log', function($delegate) {
        var log;
        log = new Logger($delegate);
        log.currentLevel = LEVELS.debug;
        return log;
      }
    ];
    this.$get = [
      '$log', function($log) {
        return new Logger($log);
      }
    ];
    return this;
  }
]);

})(window, angular);