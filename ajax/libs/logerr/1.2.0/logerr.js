/**
 * logerr
 *
 * @category   logerr
 * @author     Vaibhav Mehta <vaibhav@decodingweb.com>
 * @copyright  Copyright (c) 2016 Vaibhav Mehta <https://github.com/i-break-codes>
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.2 Stable
 */
 
var Logerr = function() {
  'use strict';
  
  var setConfig;

  function init(userConfig) {
    if(!userConfig) userConfig = {};
    
    // Default configuration
    var config = {
      detailedErrors: true,
      remoteLogging: false,
      remoteSettings: {
        url: null,
        additionalParams: null,
        successCallback: null,
        errorCallback: null
      }
    };

    // Override with user config
    setConfig = Object.assign(config, userConfig);
    
    //Remove current listener
    window.removeEventListener('error', _listener);
    
    // Listen to errors
    window.addEventListener('error', _listener);
  }
  
  // NOTE: Private
  function _listener(e) {
    if(setConfig.detailedErrors) {
      _detailedErrors(e);
    }
    
    if(setConfig.remoteLogging) {
      _remoteLogging(e, setConfig.remoteSettings);
    }
  }

  function _detailedErrors(e) {
    var i = _errorData(e);
    var helpPath = encodeURI("https://stackoverflow.com/search?q=" + i.error.split(' ').join('+'));

    var str = [
      "%cType: %c" + i.type,
      "%cError: %c" + i.error,
      "%cStackTrace: %c" + i.stackTrace,
      "%cFile Name: %c" + i.filename,
      "%cPath: %c" + i.path,
      "%cLine: %c" + i.line,
      "%cColumn: %c" + i.column,
      "%cDate: %c" + i.datetime,
      "%cDebug : %c" + i.path + ':' + i.line,
      "%cGet Help: " + "%c" + helpPath
    ].join("\n");
    
    if(window.chrome) {
      console.log(str, "font-weight: bold;", "color: #e74c3c;", "font-weight: bold;", "font-weight: normal; color: #e74c3c;","font-weight: bold;", "font-weight: normal; color: #e74c3c;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal; color: #3498db;");
    } else {
      console.log(str.replace(/%c/gi, ''));
    }
  }
  
  function _remoteLogging(e, remoteSettings) {
    if(!remoteSettings.url) {
      throw 'Provide remote URL to log errors remotely';
    } else if(remoteSettings.additionalParams && typeof remoteSettings.additionalParams !== 'object') {
      throw 'Invalid data type, additionalParams should be a valid object';
    }
    
    var http = new XMLHttpRequest();
    var url = remoteSettings.url;
    var data = _errorData(e);
    var setData = Object.assign(data, remoteSettings.additionalParams);
    var params = _serializeData(setData);
    
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(params);

    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        if (http.readyState == XMLHttpRequest.DONE) {
          if(remoteSettings.successCallback) {
            remoteSettings.successCallback();
          }
        } else {
          if(remoteSettings.errorCallback) {
            remoteSettings.errorCallback();
          } else {
            throw 'Remote error logging failed!';
          }
        }
      }
    };
  }
  
  function _serializeData(params) {
    return Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
    }).join('&');
  }
  
  function _errorData(e) {
    var filename = e.filename.lastIndexOf('/');
    var datetime = new Date().toString();
    
    /**
     * userAgent only for POST request purposes, not required in pretty print
     */

    return {
      type: e.type,
      path: e.filename,
      filename: e.filename.substring(++filename),
      line: e.lineno,
      column: e.colno,
      error: e.message,
      stackTrace: ((e.error) ? e.error.stack.toString().replace(/(\r\n|\n|\r)/gm,"") : ""),
      datetime: datetime,
      userAgent: navigator.userAgent || window.navigator.userAgent
    };
  }
  
  //Polyfill for Object.assign
  if (typeof Object.assign != 'function') {
    Object.assign = function(target) {
      if (target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }
  
  return {
    init: init
  };
  
}();