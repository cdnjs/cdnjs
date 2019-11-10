(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-collection'), require('d3-dispatch'), require('d3-dsv')) :
  typeof define === 'function' && define.amd ? define('d3-request', ['exports', 'd3-collection', 'd3-dispatch', 'd3-dsv'], factory) :
  factory((global.d3_request = {}),global.d3_collection,global.d3_dispatch,global.d3_dsv);
}(this, function (exports,d3Collection,d3Dispatch,d3Dsv) { 'use strict';

  function request(url, callback) {
    var request,
        event = d3Dispatch.dispatch("beforesend", "progress", "load", "error"),
        mimeType,
        headers = d3Collection.map(),
        xhr = new XMLHttpRequest,
        response,
        responseType,
        timeout = 0;

    // If IE does not support CORS, use XDomainRequest.
    if (typeof XDomainRequest !== "undefined"
        && !("withCredentials" in xhr)
        && /^(http(s)?:)?\/\//.test(url)) xhr = new XDomainRequest;

    "onload" in xhr
        ? xhr.onload = xhr.onerror = xhr.ontimeout = respond
        : xhr.onreadystatechange = function() { xhr.readyState > 3 && respond(); };

    function respond() {
      var status = xhr.status, result;
      if (!status && hasResponse(xhr)
          || status >= 200 && status < 300
          || status === 304) {
        if (response) {
          try {
            result = response.call(request, xhr);
          } catch (e) {
            event.error.call(request, e);
            return;
          }
        } else {
          result = xhr;
        }
        event.load.call(request, result);
      } else {
        event.error.call(request, xhr);
      }
    }

    xhr.onprogress = function(e) {
      event.progress.call(request, e);
    };

    request = {
      header: function(name, value) {
        name = (name + "").toLowerCase();
        if (arguments.length < 2) return headers.get(name);
        if (value == null) headers.remove(name);
        else headers.set(name, value + "");
        return request;
      },

      // If mimeType is non-null and no Accept header is set, a default is used.
      mimeType: function(value) {
        if (!arguments.length) return mimeType;
        mimeType = value == null ? null : value + "";
        return request;
      },

      // Specifies what type the response value should take;
      // for instance, arraybuffer, blob, document, or text.
      responseType: function(value) {
        if (!arguments.length) return responseType;
        responseType = value;
        return request;
      },

      timeout: function(value) {
        if (!arguments.length) return timeout;
        timeout = +value;
        return request;
      },

      // Specify how to convert the response content to a specific type;
      // changes the callback value on "load" events.
      response: function(value) {
        response = value;
        return request;
      },

      // Alias for send("GET", …).
      get: function(data, callback) {
        return request.send("GET", data, callback);
      },

      // Alias for send("POST", …).
      post: function(data, callback) {
        return request.send("POST", data, callback);
      },

      // If callback is non-null, it will be used for error and load events.
      send: function(method, data, callback) {
        if (!callback && typeof data === "function") callback = data, data = null;
        if (callback && callback.length === 1) callback = fixCallback(callback);
        xhr.open(method, url, true);
        if (mimeType != null && !headers.has("accept")) headers.set("accept", mimeType + ",*/*");
        if (xhr.setRequestHeader) headers.each(function(value, name) { xhr.setRequestHeader(name, value); });
        if (mimeType != null && xhr.overrideMimeType) xhr.overrideMimeType(mimeType);
        if (responseType != null) xhr.responseType = responseType;
        if (timeout > 0) xhr.timeout = timeout;
        if (callback) request.on("error", callback).on("load", function(xhr) { callback(null, xhr); });
        event.beforesend.call(request, xhr);
        xhr.send(data == null ? null : data);
        return request;
      },

      abort: function() {
        xhr.abort();
        return request;
      },

      on: function() {
        var value = event.on.apply(event, arguments);
        return value === event ? request : value;
      }
    };

    return callback
        ? request.get(callback)
        : request;
  };

  function fixCallback(callback) {
    return function(error, xhr) {
      callback(error == null ? xhr : null);
    };
  }

  function hasResponse(xhr) {
    var type = xhr.responseType;
    return type && type !== "text"
        ? xhr.response // null on error
        : xhr.responseText; // "" on error
  }

  function requestType(defaultMimeType, response) {
    return function(url, callback) {
      var r = request(url).mimeType(defaultMimeType).response(response);
      return callback ? r.get(callback) : r;
    };
  };

  var html = requestType("text/html", function(xhr) {
    return document.createRange().createContextualFragment(xhr.responseText);
  });

  var json = requestType("application/json", function(xhr) {
    return JSON.parse(xhr.responseText);
  });

  var text = requestType("text/plain", function(xhr) {
    return xhr.responseText;
  });

  var xml = requestType("application/xml", function(xhr) {
    var xml = xhr.responseXML;
    if (!xml) throw new Error("parse error");
    return xml;
  });

  function requestDsv(defaultMimeType, dsv) {
    return function(url, row, callback) {
      if (arguments.length < 3) callback = row, row = null;
      var r = request(url).mimeType(defaultMimeType);
      r.row = function(_) { return arguments.length ? r.response(responseOf(dsv, row = _)) : row; };
      r.row(row);
      return callback ? r.get(callback) : r;
    };
  };

  function responseOf(dsv, row) {
    return function(request) {
      return dsv.parse(request.responseText, row);
    };
  }

  var csv = requestDsv("text/csv", d3Dsv.csv);

  var tsv = requestDsv("text/tab-separated-values", d3Dsv.tsv);

  var version = "0.3.0";

  exports.version = version;
  exports.request = request;
  exports.requestHtml = html;
  exports.requestJson = json;
  exports.requestText = text;
  exports.requestXml = xml;
  exports.requestCsv = csv;
  exports.requestTsv = tsv;

}));