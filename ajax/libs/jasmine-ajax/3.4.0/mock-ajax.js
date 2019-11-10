/*

Jasmine-Ajax - v3.3.1: a set of helpers for testing AJAX requests under the Jasmine
BDD framework for JavaScript.

http://github.com/jasmine/jasmine-ajax

Jasmine Home page: http://jasmine.github.io/

Copyright (c) 2008-2015 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

//Module wrapper to support both browser and CommonJS environment
(function (root, factory) {
    // if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // // CommonJS
        // var jasmineRequire = require('jasmine-core');
        // module.exports = factory(root, function() {
            // return jasmineRequire;
        // });
    // } else {
        // Browser globals
        window.MockAjax = factory(root, getJasmineRequireObj);
    // }
}(typeof window !== 'undefined' ? window : global, function (global, getJasmineRequireObj) {

// 
getJasmineRequireObj().ajax = function(jRequire) {
  var $ajax = {};

  $ajax.RequestStub = jRequire.AjaxRequestStub();
  $ajax.RequestTracker = jRequire.AjaxRequestTracker();
  $ajax.StubTracker = jRequire.AjaxStubTracker();
  $ajax.ParamParser = jRequire.AjaxParamParser();
  $ajax.event = jRequire.AjaxEvent();
  $ajax.eventBus = jRequire.AjaxEventBus($ajax.event);
  $ajax.fakeRequest = jRequire.AjaxFakeRequest($ajax.eventBus);
  $ajax.MockAjax = jRequire.MockAjax($ajax);

  return $ajax.MockAjax;
};

getJasmineRequireObj().AjaxEvent = function() {
  function now() {
    return new Date().getTime();
  }

  function noop() {
  }

  // Event object
  // https://dom.spec.whatwg.org/#concept-event
  function XMLHttpRequestEvent(xhr, type) {
    this.type = type;
    this.bubbles = false;
    this.cancelable = false;
    this.timeStamp = now();

    this.isTrusted = false;
    this.defaultPrevented = false;

    // Event phase should be "AT_TARGET"
    // https://dom.spec.whatwg.org/#dom-event-at_target
    this.eventPhase = 2;

    this.target = xhr;
    this.currentTarget = xhr;
  }

  XMLHttpRequestEvent.prototype.preventDefault = noop;
  XMLHttpRequestEvent.prototype.stopPropagation = noop;
  XMLHttpRequestEvent.prototype.stopImmediatePropagation = noop;

  function XMLHttpRequestProgressEvent() {
    XMLHttpRequestEvent.apply(this, arguments);

    this.lengthComputable = false;
    this.loaded = 0;
    this.total = 0;
  }

  // Extend prototype
  XMLHttpRequestProgressEvent.prototype = XMLHttpRequestEvent.prototype;

  return {
    event: function(xhr, type) {
      return new XMLHttpRequestEvent(xhr, type);
    },

    progressEvent: function(xhr, type) {
      return new XMLHttpRequestProgressEvent(xhr, type);
    }
  };
};
getJasmineRequireObj().AjaxEventBus = function(eventFactory) {
  function EventBus(source) {
    this.eventList = {};
    this.source = source;
  }

  function ensureEvent(eventList, name) {
    eventList[name] = eventList[name] || [];
    return eventList[name];
  }

  function findIndex(list, thing) {
    if (list.indexOf) {
      return list.indexOf(thing);
    }

    for(var i = 0; i < list.length; i++) {
      if (thing === list[i]) {
        return i;
      }
    }

    return -1;
  }

  EventBus.prototype.addEventListener = function(event, callback) {
    ensureEvent(this.eventList, event).push(callback);
  };

  EventBus.prototype.removeEventListener = function(event, callback) {
    var index = findIndex(this.eventList[event], callback);

    if (index >= 0) {
      this.eventList[event].splice(index, 1);
    }
  };

  EventBus.prototype.trigger = function(event) {
    var evt;

    // Event 'readystatechange' is should be a simple event.
    // Others are progress event.
    // https://xhr.spec.whatwg.org/#events
    if (event === 'readystatechange') {
      evt = eventFactory.event(this.source, event);
    } else {
      evt = eventFactory.progressEvent(this.source, event);
    }

    var eventListeners = this.eventList[event];

    if (eventListeners) {
      for (var i = 0; i < eventListeners.length; i++) {
        eventListeners[i].call(this.source, evt);
      }
    }
  };

  return function(source) {
    return new EventBus(source);
  };
};

getJasmineRequireObj().AjaxFakeRequest = function(eventBusFactory) {
  function extend(destination, source, propertiesToSkip) {
    propertiesToSkip = propertiesToSkip || [];
    for (var property in source) {
      if (!arrayContains(propertiesToSkip, property)) {
        destination[property] = source[property];
      }
    }
    return destination;
  }

  function arrayContains(arr, item) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        return true;
      }
    }
    return false;
  }

  function wrapProgressEvent(xhr, eventName) {
    return function() {
      if (xhr[eventName]) {
        xhr[eventName].apply(xhr, arguments);
      }
    };
  }

  function initializeEvents(xhr) {
    xhr.eventBus.addEventListener('readystatechange', wrapProgressEvent(xhr, 'onreadystatechange'));
    xhr.eventBus.addEventListener('loadstart', wrapProgressEvent(xhr, 'onloadstart'));
    xhr.eventBus.addEventListener('load', wrapProgressEvent(xhr, 'onload'));
    xhr.eventBus.addEventListener('loadend', wrapProgressEvent(xhr, 'onloadend'));
    xhr.eventBus.addEventListener('progress', wrapProgressEvent(xhr, 'onprogress'));
    xhr.eventBus.addEventListener('error', wrapProgressEvent(xhr, 'onerror'));
    xhr.eventBus.addEventListener('abort', wrapProgressEvent(xhr, 'onabort'));
    xhr.eventBus.addEventListener('timeout', wrapProgressEvent(xhr, 'ontimeout'));
  }

  function unconvertibleResponseTypeMessage(type) {
    var msg = [
      "Can't build XHR.response for XHR.responseType of '",
      type,
      "'.",
      "XHR.response must be explicitly stubbed"
    ];
    return msg.join(' ');
  }

  function fakeRequest(global, requestTracker, stubTracker, paramParser) {
    function FakeXMLHttpRequest() {
      requestTracker.track(this);
      this.eventBus = eventBusFactory(this);
      initializeEvents(this);
      this.requestHeaders = {};
      this.overriddenMimeType = null;
    }

    function findHeader(name, headers) {
      name = name.toLowerCase();
      for (var header in headers) {
        if (header.toLowerCase() === name) {
          return headers[header];
        }
      }
    }

    function normalizeHeaders(rawHeaders, contentType) {
      var headers = [];

      if (rawHeaders) {
        if (rawHeaders instanceof Array) {
          headers = rawHeaders;
        } else {
          for (var headerName in rawHeaders) {
            if (rawHeaders.hasOwnProperty(headerName)) {
              headers.push({ name: headerName, value: rawHeaders[headerName] });
            }
          }
        }
      } else {
        headers.push({ name: "Content-Type", value: contentType || "application/json" });
      }

      return headers;
    }

    function parseXml(xmlText, contentType) {
      if (global.DOMParser) {
        return (new global.DOMParser()).parseFromString(xmlText, 'text/xml');
      } else {
        var xml = new global.ActiveXObject("Microsoft.XMLDOM");
        xml.async = "false";
        xml.loadXML(xmlText);
        return xml;
      }
    }

    var xmlParsables = ['text/xml', 'application/xml'];

    function getResponseXml(responseText, contentType) {
      if (arrayContains(xmlParsables, contentType.toLowerCase())) {
        return parseXml(responseText, contentType);
      } else if (contentType.match(/\+xml$/)) {
        return parseXml(responseText, 'text/xml');
      }
      return null;
    }

extend(FakeXMLHttpRequest, {
        UNSENT: 0,
        OPENED: 1,
        HEADERS_RECEIVED: 2,
        LOADING: 3,
        DONE: 4
    });

    var iePropertiesThatCannotBeCopied = ['responseBody', 'responseText', 'responseXML', 'status', 'statusText', 'responseTimeout', 'responseURL'];
    extend(FakeXMLHttpRequest.prototype, new global.XMLHttpRequest(), iePropertiesThatCannotBeCopied);
    extend(FakeXMLHttpRequest.prototype, {
      open: function() {
        this.method = arguments[0];
        this.url = arguments[1] + '';
        this.username = arguments[3];
        this.password = arguments[4];
        this.readyState = FakeXMLHttpRequest.OPENED;
        this.requestHeaders = {};
        this.eventBus.trigger('readystatechange');
      },

      setRequestHeader: function(header, value) {
        if (this.readyState === 0) {
          throw new Error('DOMException: Failed to execute "setRequestHeader" on "XMLHttpRequest": The object\'s state must be OPENED.');
        }

        if(this.requestHeaders.hasOwnProperty(header)) {
          this.requestHeaders[header] = [this.requestHeaders[header], value].join(', ');
        } else {
          this.requestHeaders[header] = value;
        }
      },

      overrideMimeType: function(mime) {
        this.overriddenMimeType = mime;
      },

      abort: function() {
        this.readyState = FakeXMLHttpRequest.UNSENT;
        this.status = 0;
        this.statusText = "abort";
        this.eventBus.trigger('readystatechange');
        this.eventBus.trigger('progress');
        this.eventBus.trigger('abort');
        this.eventBus.trigger('loadend');
      },

      readyState: FakeXMLHttpRequest.UNSENT,

      onloadstart: null,
      onprogress: null,
      onabort: null,
      onerror: null,
      onload: null,
      ontimeout: null,
      onloadend: null,
      onreadystatechange: null,

      addEventListener: function() {
        this.eventBus.addEventListener.apply(this.eventBus, arguments);
      },

      removeEventListener: function(event, callback) {
        this.eventBus.removeEventListener.apply(this.eventBus, arguments);
      },

      status: null,

      send: function(data) {
        this.params = data;
        this.eventBus.trigger('loadstart');

        var stub = stubTracker.findStub(this.url, data, this.method);

        this.dispatchStub(stub);
      },

      dispatchStub: function(stub) {
        if (stub) {
          if (stub.isReturn()) {
            this.respondWith(stub);
          } else if (stub.isError()) {
            this.responseError(stub);
          } else if (stub.isTimeout()) {
            this.responseTimeout();
          } else if (stub.isCallFunction()) {
            this.responseCallFunction(stub);
          }
        }
      },

      contentType: function() {
        return findHeader('content-type', this.requestHeaders);
      },

      data: function() {
        if (!this.params) {
          return {};
        }

        return paramParser.findParser(this).parse(this.params);
      },

      getResponseHeader: function(name) {
        var resultHeader = null;
        if (!this.responseHeaders) { return resultHeader; }

        name = name.toLowerCase();
        for(var i = 0; i < this.responseHeaders.length; i++) {
          var header = this.responseHeaders[i];
          if (name === header.name.toLowerCase()) {
            if (resultHeader) {
              resultHeader = [resultHeader, header.value].join(', ');
            } else {
              resultHeader = header.value;
            }
          }
        }
        return resultHeader;
      },

      getAllResponseHeaders: function() {
        if (!this.responseHeaders) { return null; }

        var responseHeaders = [];
        for (var i = 0; i < this.responseHeaders.length; i++) {
          responseHeaders.push(this.responseHeaders[i].name + ': ' +
            this.responseHeaders[i].value);
        }
        return responseHeaders.join('\r\n') + '\r\n';
      },

      responseText: null,
      response: null,
      responseType: null,
      responseURL: null,

      responseValue: function() {
        switch(this.responseType) {
          case null:
          case "":
          case "text":
            return this.readyState >= FakeXMLHttpRequest.LOADING ? this.responseText : "";
          case "json":
            return JSON.parse(this.responseText);
          case "arraybuffer":
            throw unconvertibleResponseTypeMessage('arraybuffer');
          case "blob":
            throw unconvertibleResponseTypeMessage('blob');
          case "document":
            return this.responseXML;
        }
      },


      respondWith: function(response) {
        if (this.readyState === FakeXMLHttpRequest.DONE) {
          throw new Error("FakeXMLHttpRequest already completed");
        }

        this.status = response.status;
        this.statusText = response.statusText || "";
        this.responseHeaders = normalizeHeaders(response.responseHeaders, response.contentType);
        this.readyState = FakeXMLHttpRequest.HEADERS_RECEIVED;
        this.eventBus.trigger('readystatechange');

        this.responseText = response.responseText || "";
        this.responseType = response.responseType || "";
        this.responseURL = response.responseURL || null;
        this.readyState = FakeXMLHttpRequest.DONE;
        this.responseXML = getResponseXml(response.responseText, this.getResponseHeader('content-type') || '');
        if (this.responseXML) {
          this.responseType = 'document';
        }
        if (response.responseJSON) {
          this.responseText = JSON.stringify(response.responseJSON);
        }

        if ('response' in response) {
          this.response = response.response;
        } else {
          this.response = this.responseValue();
        }

        this.eventBus.trigger('readystatechange');
        this.eventBus.trigger('progress');
        this.eventBus.trigger('load');
        this.eventBus.trigger('loadend');
      },

      responseTimeout: function() {
        if (this.readyState === FakeXMLHttpRequest.DONE) {
          throw new Error("FakeXMLHttpRequest already completed");
        }
        this.readyState = FakeXMLHttpRequest.DONE;
        jasmine.clock().tick(30000);
        this.eventBus.trigger('readystatechange');
        this.eventBus.trigger('progress');
        this.eventBus.trigger('timeout');
        this.eventBus.trigger('loadend');
      },

      responseError: function(response) {
        if (!response) {
          response = {};
        }
        if (this.readyState === FakeXMLHttpRequest.DONE) {
          throw new Error("FakeXMLHttpRequest already completed");
        }
        this.status = response.status;
        this.statusText = response.statusText || "";
        this.readyState = FakeXMLHttpRequest.DONE;
        this.eventBus.trigger('readystatechange');
        this.eventBus.trigger('progress');
        this.eventBus.trigger('error');
        this.eventBus.trigger('loadend');
      },

      responseCallFunction: function(stub) {
        stub.action = undefined;
        stub.functionToCall(stub, this);
        this.dispatchStub(stub);
      }
    });

    return FakeXMLHttpRequest;
  }

  return fakeRequest;
};

getJasmineRequireObj().MockAjax = function($ajax) {
  function MockAjax(global) {
    var requestTracker = new $ajax.RequestTracker(),
      stubTracker = new $ajax.StubTracker(),
      paramParser = new $ajax.ParamParser(),
      realAjaxFunction = global.XMLHttpRequest,
      mockAjaxFunction = $ajax.fakeRequest(global, requestTracker, stubTracker, paramParser);

    this.install = function() {
      if (global.XMLHttpRequest !== realAjaxFunction) {
        throw new Error("Jasmine Ajax was unable to install over a custom XMLHttpRequest. Is Jasmine Ajax already installed?");
      }

      global.XMLHttpRequest = mockAjaxFunction;
    };

    this.uninstall = function() {
      if (global.XMLHttpRequest !== mockAjaxFunction) {
        throw new Error("MockAjax not installed.");
      }
      global.XMLHttpRequest = realAjaxFunction;

      this.stubs.reset();
      this.requests.reset();
      paramParser.reset();
    };

    this.stubRequest = function(url, data, method) {
      var stub = new $ajax.RequestStub(url, data, method);
      stubTracker.addStub(stub);
      return stub;
    };

    this.withMock = function(closure) {
      this.install();
      try {
        closure();
      } finally {
        this.uninstall();
      }
    };

    this.addCustomParamParser = function(parser) {
      paramParser.add(parser);
    };

    this.requests = requestTracker;
    this.stubs = stubTracker;
  }

  return MockAjax;
};

getJasmineRequireObj().AjaxParamParser = function() {
  function ParamParser() {
    var defaults = [
      {
        test: function(xhr) {
          return (/^application\/json/).test(xhr.contentType());
        },
        parse: function jsonParser(paramString) {
          return JSON.parse(paramString);
        }
      },
      {
        test: function(xhr) {
          return true;
        },
        parse: function naiveParser(paramString) {
          var data = {};
          var params = paramString.split('&');

          for (var i = 0; i < params.length; ++i) {
            var kv = params[i].replace(/\+/g, ' ').split('=');
            var key = decodeURIComponent(kv[0]);
            data[key] = data[key] || [];
            data[key].push(decodeURIComponent(kv[1]));
          }
          return data;
        }
      }
    ];
    var paramParsers = [];

    this.add = function(parser) {
      paramParsers.unshift(parser);
    };

    this.findParser = function(xhr) {
        for(var i in paramParsers) {
          var parser = paramParsers[i];
          if (parser.test(xhr)) {
            return parser;
          }
        }
    };

    this.reset = function() {
      paramParsers = [];
      for(var i in defaults) {
        paramParsers.push(defaults[i]);
      }
    };

    this.reset();
  }

  return ParamParser;
};

getJasmineRequireObj().AjaxRequestStub = function() {
  var RETURN = 0,
      ERROR = 1,
      TIMEOUT = 2,
      CALL = 3;

  function RequestStub(url, stubData, method) {
    var normalizeQuery = function(query) {
      return query ? query.split('&').sort().join('&') : undefined;
    };

    if (url instanceof RegExp) {
      this.url = url;
      this.query = undefined;
    } else {
      var split = url.split('?');
      this.url = split[0];
      this.query = split.length > 1 ? normalizeQuery(split[1]) : undefined;
    }

    this.data = (stubData instanceof RegExp) ? stubData : normalizeQuery(stubData);
    this.method = method;

    this.andReturn = function(options) {
      this.action = RETURN;
      this.status = (typeof options.status !== 'undefined') ? options.status : 200;
      this.statusText = options.statusText;

      this.contentType = options.contentType;
      this.response = options.response;
      this.responseText = options.responseText;
      this.responseHeaders = options.responseHeaders;
      this.responseURL = options.responseURL;
    };

    this.isReturn = function() {
      return this.action === RETURN;
    };

    this.andError = function(options) {
      if (!options) {
        options = {};
      }
      this.action = ERROR;
      this.status = options.status || 500;
    };

    this.isError = function() {
      return this.action === ERROR;
    };

    this.andTimeout = function() {
      this.action = TIMEOUT;
    };

    this.isTimeout = function() {
      return this.action === TIMEOUT;
    };

    this.andCallFunction = function(functionToCall) {
      this.action = CALL;
      this.functionToCall = functionToCall;
    };

    this.isCallFunction = function() {
      return this.action === CALL;
    };

    this.matches = function(fullUrl, data, method) {
      var urlMatches = false;
      fullUrl = fullUrl.toString();
      if (this.url instanceof RegExp) {
        urlMatches = this.url.test(fullUrl);
      } else {
        var urlSplit = fullUrl.split('?'),
            url = urlSplit[0],
            query = urlSplit[1];
        urlMatches = this.url === url && this.query === normalizeQuery(query);
      }
      var dataMatches = false;
      if (this.data instanceof RegExp) {
        dataMatches = this.data.test(data);
      } else {
        dataMatches = !this.data || this.data === normalizeQuery(data);
      }
      return urlMatches && dataMatches && (!this.method || this.method === method);
    };
  }

  return RequestStub;
};

getJasmineRequireObj().AjaxRequestTracker = function() {
  function RequestTracker() {
    var requests = [];

    this.track = function(request) {
      requests.push(request);
    };

    this.first = function() {
      return requests[0];
    };

    this.count = function() {
      return requests.length;
    };

    this.reset = function() {
      requests = [];
    };

    this.mostRecent = function() {
      return requests[requests.length - 1];
    };

    this.at = function(index) {
      return requests[index];
    };

    this.filter = function(url_to_match) {
      var matching_requests = [];

      for (var i = 0; i < requests.length; i++) {
        if (url_to_match instanceof RegExp &&
            url_to_match.test(requests[i].url)) {
            matching_requests.push(requests[i]);
        } else if (url_to_match instanceof Function &&
            url_to_match(requests[i])) {
            matching_requests.push(requests[i]);
        } else {
          if (requests[i].url === url_to_match) {
            matching_requests.push(requests[i]);
          }
        }
      }

      return matching_requests;
    };
  }

  return RequestTracker;
};

getJasmineRequireObj().AjaxStubTracker = function() {
  function StubTracker() {
    var stubs = [];

    this.addStub = function(stub) {
      stubs.push(stub);
    };

    this.reset = function() {
      stubs = [];
    };

    this.findStub = function(url, data, method) {
      for (var i = stubs.length - 1; i >= 0; i--) {
        var stub = stubs[i];
        if (stub.matches(url, data, method)) {
          return stub;
        }
      }
    };
  }

  return StubTracker;
};


    var jRequire = getJasmineRequireObj();
    var MockAjax = jRequire.ajax(jRequire);
    jasmine.Ajax = new MockAjax(global);

    return MockAjax;
}));
