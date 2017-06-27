/**
 *  angular-simple-logger
 *
 * @version: 0.1.4
 * @author: Nicholas McCready
 * @date: Fri Oct 02 2015 11:38:43 GMT-0400 (EDT)
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
    var LEVELS, Logger, _fns, _isValidLogObject, _maybeExecLevel, _wrapDebug, key, nemDebug, val;
    nemDebug = nemDebugProvider.debug;
    _fns = ['debug', 'info', 'warn', 'error', 'log'];
    LEVELS = {};
    for (key in _fns) {
      val = _fns[key];
      LEVELS[val] = key;
    }
    _maybeExecLevel = function(level, current, fn) {
      if (level >= current) {
        return fn();
      }
    };
    _isValidLogObject = function(logObject) {
      var isValid;
      isValid = false;
      if (!logObject) {
        return isValid;
      }
      for (key in _fns) {
        val = _fns[key];
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
      var debugInstance, newLogger;
      debugInstance = nemDebug(debugStrLevel);
      newLogger = {};
      for (key in _fns) {
        val = _fns[key];
        newLogger[val] = val === 'debug' ? debugInstance : logObject[val];
      }
      return newLogger;
    };
    Logger = (function() {
      function Logger($log1) {
        var logFns;
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
        _fns.forEach((function(_this) {
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
        })(this));
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