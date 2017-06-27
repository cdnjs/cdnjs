// jQuery ajax adapter ( JQuery v.>=1.5 )
// see https://api.jquery.com/jQuery.ajax/
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

  var jQuery;

  var ctor = function AjaxJQueryAdapter() {
    this.name = "jQuery";
    this.defaultSettings = { };
    this.requestInterceptor = null;
  };
  var proto = ctor.prototype;

  proto.initialize = function () {
    // look for the jQuery lib but don't fail immediately if not found
    jQuery = core.requireLib("jQuery");
  };

  proto.ajax = function (config) {
    if (!jQuery) {
      throw new Error("Unable to locate jQuery");
    }
    var jqConfig = {
      type: config.type,
      url: config.url,
      data: config.params || config.data,
      dataType: config.dataType,
      contentType: config.contentType,
      crossDomain: config.crossDomain,
      headers: config.headers || {}
    }

    if (!core.isEmpty(this.defaultSettings)) {
      var compositeConfig = core.extend({}, this.defaultSettings);
      jqConfig = core.extend(compositeConfig, jqConfig);
      // extend is shallow; extend headers separately
      var headers =core.extend({}, this.defaultSettings.headers); // copy default headers 1st
      jqConfig.headers = core.extend(headers, jqConfig.headers);
    }

    var requestInfo = {
      adapter: this,      // this adapter
      config: jqConfig,   // jQuery's ajax 'settings' object
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
      requestInfo.jqXHR = jQuery.ajax(requestInfo.config)
          .done(requestInfo.success)
          .fail(requestInfo.error);
    }

    function successFn(data, statusText, jqXHR) {
      var httpResponse = {
        config: config,
        data: data,
        getHeaders: getHeadersFn(jqXHR),
        status: jqXHR.status,
        statusText: statusText
      };
      config.success(httpResponse);
      jqXHR.onreadystatechange = null;
      jqXHR.abort = null;
    }

    function errorFn(jqXHR, statusText, errorThrown) {
      var httpResponse = {
        config: config,
        data: jqXHR.responseText,
        error: errorThrown,
        getHeaders: getHeadersFn(jqXHR),
        status: jqXHR.status,
        statusText: statusText
      };
      config.error(httpResponse);
      jqXHR.onreadystatechange = null;
      jqXHR.abort = null;
    }
  };

  function getHeadersFn(jqXHR) {
    if (jqXHR.status === 0) { // timeout or abort; no headers
      return function (headerName) {
        return (headerName && headerName.length > 0) ? "" : {};
      };
    } else { // jqXHR should have header functions
      return function (headerName) {
        return (headerName && headerName.length > 0) ?
               jqXHR.getResponseHeader(headerName) :
               jqXHR.getAllResponseHeaders();
      };
    }
  }

  breeze.config.registerAdapter("ajax", ctor);

}));
