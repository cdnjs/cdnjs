// Angular ajax adapter
// See https://docs.angularjs.org/api/ng/service/$http
(function (factory) {
  // Module systems magic dance.
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";
  var core = breeze.core;

  var ctor = function AjaxAngularAdapter() {
    this.name = "angular";
    this.defaultSettings = { };
    this.requestInterceptor = null;
    // Will set:
    //   this.$http;
    //   this.$rootScope;
  };
  var proto = ctor.prototype;

  proto.initialize = function () {

    var ng = core.requireLib("angular");
    if (ng) {
      var $injector = ng.injector(['ng']);
      var http, rootScope;
      $injector.invoke(['$http', '$rootScope', function ($http, $rootScope) {
        http = $http;
        rootScope = $rootScope;
      }]);
      this.$http = http;
      this.$rootScope = rootScope;
    }

  };

  proto.setHttp = function (http) {
    this.$http = http;
    this.$rootScope = null; // to suppress $rootScope.digest
  };


  proto.ajax = function (config) {
    if (!this.$http) {
      throw new Error("Unable to locate angular for ajax adapter");
    }
    var ngConfig = {
      method: config.type,
      url: config.url,
      dataType: config.dataType,
      contentType: config.contentType,
      crossDomain: config.crossDomain,
      headers: config.headers || {}
    }

    if (config.params) {
      // Hack: because of the way that Angular handles writing parameters out to the url.
      // so this approach takes over the url param writing completely.
      // See: http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
      var delim = (ngConfig.url.indexOf("?") >= 0) ? "&" : "?";
      ngConfig.url = ngConfig.url + delim + encodeParams(config.params);
    }

    if (config.data) {
      ngConfig.data = config.data;
    }

    if (!core.isEmpty(this.defaultSettings)) {
      var compositeConfig = core.extend({}, this.defaultSettings);
      ngConfig = core.extend(compositeConfig, ngConfig);
      // extend is shallow; extend headers separately
      var headers =core.extend({}, this.defaultSettings.headers); // copy default headers 1st
      ngConfig.headers = core.extend(headers, ngConfig.headers);
    }

    var requestInfo = {
      adapter: this,      // this adapter
      config: ngConfig,   // angular's $http configuration object
      dsaConfig: config,  // the config arg from the calling Breeze DataServiceAdapter
      success: successFn, // adapter's success callback
      error: errorFn      // adapter's error callback
    }

    if (core.isFunction(this.requestInterceptor)) {
      this.requestInterceptor(requestInfo);
      if (this.requestInterceptor.oneTime) {
        this.requestInterceptor = null;
      }
    }

    if (requestInfo.config) { // exists unless requestInterceptor killed it.
      this.$http(requestInfo.config)
          .success(requestInfo.success)
          .error(requestInfo.error);
      this.$rootScope && this.$rootScope.$digest();
    }

    function successFn(data, status, headers, xconfig, statusText) {
      // HACK: because $http returns a server side null as a string containing "null" - this is WRONG.
      if (data === "null") data = null;
      var httpResponse = {
        config: config,
        data: data,
        getHeaders: headers,
        status: status,
        statusText: statusText
      };
      config.success(httpResponse);
    }

    function errorFn(data, status, headers, xconfig, statusText) {
      // Timeout appears as an error with status===0 and no data.
      // Make it better
      if (status === 0 && data == null) {
        data = 'timeout';
      }
      var httpResponse = {
        config: config,
        data: data,
        getHeaders: headers,
        status: status,
        statusText: statusText
      };
      config.error(httpResponse);
    }
  };

  function encodeParams(obj) {
    var query = '';
    var subValue, innerObj, fullSubName;

    for (var name in obj) {
      var value = obj[name];

      if (value instanceof Array) {
        for (var i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += encodeParams(innerObj) + '&';
        }
      } else if (value && value.toISOString) { // a feature of Date-like things
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value.toISOString()) + '&';
      } else if (value instanceof Object) {
        for (var subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += encodeParams(innerObj) + '&';
        }
      } else if (value === null) {
        query += encodeURIComponent(name) + '=&';
      } else if (value !== undefined) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  }

  breeze.config.registerAdapter("ajax", ctor);

}));
