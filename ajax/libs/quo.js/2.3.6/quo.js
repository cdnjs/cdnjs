/* QuoJS v2.3.6 - 2013/5/13
   http://quojs.tapquo.com
   Copyright (c) 2013 Javi Jimenez Villar (@soyjavi) - Licensed MIT */
(function() {
  var Quo;

  Quo = (function() {
    var $$, EMPTY_ARRAY, Q;

    EMPTY_ARRAY = [];
    $$ = function(selector, children) {
      var dom;

      if (!selector) {
        return Q();
      } else if ($$.toType(selector) === "function") {
        return $$(document).ready(selector);
      } else {
        dom = $$.getDOMObject(selector, children);
        return Q(dom, selector);
      }
    };
    Q = function(dom, selector) {
      dom = dom || EMPTY_ARRAY;
      dom.__proto__ = Q.prototype;
      dom.selector = selector || '';
      return dom;
    };
    $$.extend = function(target) {
      Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        var key, _results;

        _results = [];
        for (key in source) {
          _results.push(target[key] = source[key]);
        }
        return _results;
      });
      return target;
    };
    Q.prototype = $$.fn = {};
    return $$;
  })();

  window.Quo = Quo;

  "$$" in window || (window.$$ = Quo);

}).call(this);

(function() {
  (function($$) {
    var DEFAULT, JSONP_ID, MIME_TYPES, _isJsonP, _parseResponse, _xhrError, _xhrForm, _xhrHeaders, _xhrStatus, _xhrSuccess, _xhrTimeout;

    DEFAULT = {
      TYPE: "GET",
      MIME: "json"
    };
    MIME_TYPES = {
      script: "text/javascript, application/javascript",
      json: "application/json",
      xml: "application/xml, text/xml",
      html: "text/html",
      text: "text/plain"
    };
    JSONP_ID = 0;
    $$.ajaxSettings = {
      type: DEFAULT.TYPE,
      async: true,
      success: {},
      error: {},
      context: null,
      dataType: DEFAULT.MIME,
      headers: {},
      xhr: function() {
        return new window.XMLHttpRequest();
      },
      crossDomain: false,
      timeout: 0
    };
    $$.ajax = function(options) {
      var abortTimeout, error, settings, xhr;

      settings = $$.mix($$.ajaxSettings, options);
      if (settings.type === DEFAULT.TYPE) {
        settings.url += $$.serializeParameters(settings.data, "?");
      } else {
        settings.data = $$.serializeParameters(settings.data);
      }
      if (_isJsonP(settings.url)) {
        return $$.jsonp(settings);
      }
      xhr = settings.xhr();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          clearTimeout(abortTimeout);
          return _xhrStatus(xhr, settings);
        }
      };
      xhr.open(settings.type, settings.url, settings.async);
      _xhrHeaders(xhr, settings);
      if (settings.timeout > 0) {
        abortTimeout = setTimeout((function() {
          return _xhrTimeout(xhr, settings);
        }), settings.timeout);
      }
      try {
        xhr.send(settings.data);
      } catch (_error) {
        error = _error;
        xhr = error;
        _xhrError("Resource not found", xhr, settings);
      }
      if (settings.async) {
        return xhr;
      } else {
        return _parseResponse(xhr, settings);
      }
    };
    $$.jsonp = function(settings) {
      var abortTimeout, callbackName, script, xhr;

      if (settings.async) {
        callbackName = "jsonp" + (++JSONP_ID);
        script = document.createElement("script");
        xhr = {
          abort: function() {
            $$(script).remove();
            if (callbackName in window) {
              return window[callbackName] = {};
            }
          }
        };
        abortTimeout = void 0;
        window[callbackName] = function(response) {
          clearTimeout(abortTimeout);
          $$(script).remove();
          delete window[callbackName];
          return _xhrSuccess(response, xhr, settings);
        };
        script.src = settings.url.replace(RegExp("=\\?"), "=" + callbackName);
        $$("head").append(script);
        if (settings.timeout > 0) {
          abortTimeout = setTimeout((function() {
            return _xhrTimeout(xhr, settings);
          }), settings.timeout);
        }
        return xhr;
      } else {
        return console.error("QuoJS.ajax: Unable to make jsonp synchronous call.");
      }
    };
    $$.get = function(url, data, success, dataType) {
      return $$.ajax({
        url: url,
        data: data,
        success: success,
        dataType: dataType
      });
    };
    $$.post = function(url, data, success, dataType) {
      return _xhrForm("POST", url, data, success, dataType);
    };
    $$.put = function(url, data, success, dataType) {
      return _xhrForm("PUT", url, data, success, dataType);
    };
    $$["delete"] = function(url, data, success, dataType) {
      return _xhrForm("DELETE", url, data, success, dataType);
    };
    $$.json = function(url, data, success) {
      return $$.ajax({
        url: url,
        data: data,
        success: success,
        dataType: DEFAULT.MIME
      });
    };
    $$.serializeParameters = function(parameters, character) {
      var parameter, serialize;

      if (character == null) {
        character = "";
      }
      serialize = character;
      for (parameter in parameters) {
        if (parameters.hasOwnProperty(parameter)) {
          if (serialize !== character) {
            serialize += "&";
          }
          serialize += "" + (encodeURIComponent(parameter)) + "=" + (encodeURIComponent(parameters[parameter]));
        }
      }
      if (serialize === character) {
        return "";
      } else {
        return serialize;
      }
    };
    _xhrStatus = function(xhr, settings) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
        if (settings.async) {
          _xhrSuccess(_parseResponse(xhr, settings), xhr, settings);
        }
      } else {
        _xhrError("QuoJS.ajax: Unsuccesful request", xhr, settings);
      }
    };
    _xhrSuccess = function(response, xhr, settings) {
      settings.success.call(settings.context, response, xhr);
    };
    _xhrError = function(type, xhr, settings) {
      settings.error.call(settings.context, type, xhr, settings);
    };
    _xhrHeaders = function(xhr, settings) {
      var header;

      if (settings.contentType) {
        settings.headers["Content-Type"] = settings.contentType;
      }
      if (settings.dataType) {
        settings.headers["Accept"] = MIME_TYPES[settings.dataType];
      }
      for (header in settings.headers) {
        xhr.setRequestHeader(header, settings.headers[header]);
      }
    };
    _xhrTimeout = function(xhr, settings) {
      xhr.onreadystatechange = {};
      xhr.abort();
      _xhrError("QuoJS.ajax: Timeout exceeded", xhr, settings);
    };
    _xhrForm = function(method, url, data, success, dataType) {
      return $$.ajax({
        type: method,
        url: url,
        data: data,
        success: success,
        dataType: dataType,
        contentType: "application/x-www-form-urlencoded"
      });
    };
    _parseResponse = function(xhr, settings) {
      var error, response;

      response = xhr.responseText;
      if (response) {
        if (settings.dataType === DEFAULT.MIME) {
          try {
            response = JSON.parse(response);
          } catch (_error) {
            error = _error;
            response = error;
            _xhrError("QuoJS.ajax: Parse Error", xhr, settings);
          }
        } else {
          if (settings.dataType === "xml") {
            response = xhr.responseXML;
          }
        }
      }
      return response;
    };
    return _isJsonP = function(url) {
      return RegExp("=\\?").test(url);
    };
  })(Quo);

}).call(this);

(function() {
  (function($$) {
    var EMPTY_ARRAY, HTML_CONTAINERS, IS_HTML_FRAGMENT, OBJECT_PROTOTYPE, TABLE, TABLE_ROW, _compact, _flatten;

    EMPTY_ARRAY = [];
    OBJECT_PROTOTYPE = Object.prototype;
    IS_HTML_FRAGMENT = /^\s*<(\w+|!)[^>]*>/;
    TABLE = document.createElement('table');
    TABLE_ROW = document.createElement('tr');
    HTML_CONTAINERS = {
      "tr": document.createElement("tbody"),
      "tbody": TABLE,
      "thead": TABLE,
      "tfoot": TABLE,
      "td": TABLE_ROW,
      "th": TABLE_ROW,
      "*": document.createElement("div")
    };
    $$.toType = function(obj) {
      return OBJECT_PROTOTYPE.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    };
    $$.isOwnProperty = function(object, property) {
      return OBJECT_PROTOTYPE.hasOwnProperty.call(object, property);
    };
    $$.getDOMObject = function(selector, children) {
      var domain, elementTypes, type;

      domain = null;
      elementTypes = [1, 9, 11];
      type = $$.toType(selector);
      if (type === "array") {
        domain = _compact(selector);
      } else if (type === "string" && IS_HTML_FRAGMENT.test(selector)) {
        domain = $$.fragment(selector.trim(), RegExp.$1);
        selector = null;
      } else if (type === "string") {
        domain = $$.query(document, selector);
        if (children) {
          if (domain.length === 1) {
            domain = $$.query(domain[0], children);
          } else {
            domain = $$.map(function() {
              return $$.query(domain, children);
            });
          }
        }
      } else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window) {
        domain = [selector];
        selector = null;
      }
      return domain;
    };
    $$.map = function(elements, callback) {
      var i, key, value, values;

      values = [];
      i = void 0;
      key = void 0;
      if ($$.toType(elements) === "array") {
        i = 0;
        while (i < elements.length) {
          value = callback(elements[i], i);
          if (value != null) {
            values.push(value);
          }
          i++;
        }
      } else {
        for (key in elements) {
          value = callback(elements[key], key);
          if (value != null) {
            values.push(value);
          }
        }
      }
      return _flatten(values);
    };
    $$.each = function(elements, callback) {
      var i, key;

      i = void 0;
      key = void 0;
      if ($$.toType(elements) === "array") {
        i = 0;
        while (i < elements.length) {
          if (callback.call(elements[i], i, elements[i]) === false) {
            return elements;
          }
          i++;
        }
      } else {
        for (key in elements) {
          if (callback.call(elements[key], key, elements[key]) === false) {
            return elements;
          }
        }
      }
      return elements;
    };
    $$.mix = function() {
      var arg, argument, child, len, prop;

      child = {};
      arg = 0;
      len = arguments.length;
      while (arg < len) {
        argument = arguments[arg];
        for (prop in argument) {
          if ($$.isOwnProperty(argument, prop) && argument[prop] !== undefined) {
            child[prop] = argument[prop];
          }
        }
        arg++;
      }
      return child;
    };
    $$.fragment = function(markup, tag) {
      var container;

      if (tag == null) {
        tag = "*";
      }
      if (!(tag in HTML_CONTAINERS)) {
        tag = "*";
      }
      container = HTML_CONTAINERS[tag];
      container.innerHTML = "" + markup;
      return $$.each(Array.prototype.slice.call(container.childNodes), function() {
        return container.removeChild(this);
      });
    };
    $$.fn.map = function(fn) {
      return $$.map(this, function(el, i) {
        return fn.call(el, i, el);
      });
    };
    $$.fn.instance = function(property) {
      return this.map(function() {
        return this[property];
      });
    };
    $$.fn.filter = function(selector) {
      return $$([].filter.call(this, function(element) {
        return element.parentNode && $$.query(element.parentNode, selector).indexOf(element) >= 0;
      }));
    };
    $$.fn.forEach = EMPTY_ARRAY.forEach;
    $$.fn.indexOf = EMPTY_ARRAY.indexOf;
    _compact = function(array) {
      return array.filter(function(item) {
        return item !== void 0 && item !== null;
      });
    };
    return _flatten = function(array) {
      if (array.length > 0) {
        return [].concat.apply([], array);
      } else {
        return array;
      }
    };
  })(Quo);

}).call(this);

(function() {
  (function($$) {
    $$.fn.attr = function(name, value) {
      if (this.length === 0) {
        null;
      }
      if ($$.toType(name) === "string" && value === void 0) {
        return this[0].getAttribute(name);
      } else {
        return this.each(function() {
          return this.setAttribute(name, value);
        });
      }
    };
    $$.fn.removeAttr = function(name) {
      return this.each(function() {
        return this.removeAttribute(name);
      });
    };
    $$.fn.data = function(name, value) {
      return this.attr("data-" + name, value);
    };
    $$.fn.removeData = function(name) {
      return this.removeAttr("data-" + name);
    };
    $$.fn.val = function(value) {
      if ($$.toType(value) === "string") {
        return this.each(function() {
          return this.value = value;
        });
      } else {
        if (this.length > 0) {
          return this[0].value;
        } else {
          return null;
        }
      }
    };
    $$.fn.show = function() {
      return this.style("display", "block");
    };
    $$.fn.hide = function() {
      return this.style("display", "none");
    };
    $$.fn.height = function() {
      var offset;

      offset = this.offset();
      return offset.height;
    };
    $$.fn.width = function() {
      var offset;

      offset = this.offset();
      return offset.width;
    };
    $$.fn.offset = function() {
      var bounding;

      bounding = this[0].getBoundingClientRect();
      return {
        left: bounding.left + window.pageXOffset,
        top: bounding.top + window.pageYOffset,
        width: bounding.width,
        height: bounding.height
      };
    };
    return $$.fn.remove = function() {
      return this.each(function() {
        if (this.parentNode != null) {
          return this.parentNode.removeChild(this);
        }
      });
    };
  })(Quo);

}).call(this);

(function() {
  (function($$) {
    var IS_WEBKIT, SUPPORTED_OS, _current, _detectBrowser, _detectEnvironment, _detectOS, _detectScreen;

    _current = null;
    IS_WEBKIT = /WebKit\/([\d.]+)/;
    SUPPORTED_OS = {
      Android: /(Android)\s+([\d.]+)/,
      ipad: /(iPad).*OS\s([\d_]+)/,
      iphone: /(iPhone\sOS)\s([\d_]+)/,
      Blackberry: /(BlackBerry|BB10|Playbook).*Version\/([\d.]+)/,
      FirefoxOS: /(Mozilla).*Mobile[^\/]*\/([\d\.]*)/,
      webOS: /(webOS|hpwOS)[\s\/]([\d.]+)/
    };
    $$.isMobile = function() {
      _current = _current || _detectEnvironment();
      return _current.isMobile && _current.os.name !== "firefoxOS";
    };
    $$.environment = function() {
      _current = _current || _detectEnvironment();
      return _current;
    };
    $$.isOnline = function() {
      return navigator.onLine;
    };
    _detectEnvironment = function() {
      var environment, user_agent;

      user_agent = navigator.userAgent;
      environment = {};
      environment.browser = _detectBrowser(user_agent);
      environment.os = _detectOS(user_agent);
      environment.isMobile = !!environment.os;
      environment.screen = _detectScreen();
      return environment;
    };
    _detectBrowser = function(user_agent) {
      var is_webkit;

      is_webkit = user_agent.match(IS_WEBKIT);
      if (is_webkit) {
        return is_webkit[0];
      } else {
        return user_agent;
      }
    };
    _detectOS = function(user_agent) {
      var detected_os, os, supported;

      detected_os = null;
      for (os in SUPPORTED_OS) {
        supported = user_agent.match(SUPPORTED_OS[os]);
        if (supported) {
          detected_os = {
            name: (os === "iphone" || os === "ipad" ? "ios" : os),
            version: supported[2].replace("_", ".")
          };
          break;
        }
      }
      return detected_os;
    };
    return _detectScreen = function() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };
  })(Quo);

}).call(this);

(function() {
  (function($$) {
    var ELEMENT_ID, EVENTS_DESKTOP, EVENT_METHODS, HANDLERS, READY_EXPRESSION, _createProxy, _createProxyCallback, _environmentEvent, _findHandlers, _getElementId, _subscribe, _unsubscribe;

    ELEMENT_ID = 1;
    HANDLERS = {};
    EVENT_METHODS = {
      preventDefault: "isDefaultPrevented",
      stopImmediatePropagation: "isImmediatePropagationStopped",
      stopPropagation: "isPropagationStopped"
    };
    EVENTS_DESKTOP = {
      touchstart: "mousedown",
      touchmove: "mousemove",
      touchend: "mouseup",
      touch: "click",
      doubletap: "dblclick",
      orientationchange: "resize"
    };
    READY_EXPRESSION = /complete|loaded|interactive/;
    $$.fn.on = function(event, selector, callback) {
      if (selector === "undefined" || $$.toType(selector) === "function") {
        return this.bind(event, selector);
      } else {
        return this.delegate(selector, event, callback);
      }
    };
    $$.fn.off = function(event, selector, callback) {
      if (selector === "undefined" || $$.toType(selector) === "function") {
        return this.unbind(event, selector);
      } else {
        return this.undelegate(selector, event, callback);
      }
    };
    $$.fn.ready = function(callback) {
      if (READY_EXPRESSION.test(document.readyState)) {
        return callback($$);
      } else {
        return $$.fn.addEvent(document, "DOMContentLoaded", function() {
          return callback($$);
        });
      }
    };
    $$.Event = function(type, touch) {
      var event, property;

      event = document.createEvent("Events");
      event.initEvent(type, true, true, null, null, null, null, null, null, null, null, null, null, null, null);
      if (touch) {
        for (property in touch) {
          event[property] = touch[property];
        }
      }
      return event;
    };
    $$.fn.bind = function(event, callback) {
      return this.each(function() {
        _subscribe(this, event, callback);
      });
    };
    $$.fn.unbind = function(event, callback) {
      return this.each(function() {
        _unsubscribe(this, event, callback);
      });
    };
    $$.fn.delegate = function(selector, event, callback) {
      return this.each(function(i, element) {
        _subscribe(element, event, callback, selector, function(fn) {
          return function(e) {
            var evt, match;

            match = $$(e.target).closest(selector, element).get(0);
            if (match) {
              evt = $$.extend(_createProxy(e), {
                currentTarget: match,
                liveFired: element
              });
              return fn.apply(match, [evt].concat([].slice.call(arguments, 1)));
            }
          };
        });
      });
    };
    $$.fn.undelegate = function(selector, event, callback) {
      return this.each(function() {
        _unsubscribe(this, event, callback, selector);
      });
    };
    $$.fn.trigger = function(event, touch, originalEvent) {
      if ($$.toType(event) === "string") {
        event = $$.Event(event, touch);
      }
      if (originalEvent != null) {
        event.originalEvent = originalEvent;
      }
      return this.each(function() {
        this.dispatchEvent(event);
      });
    };
    $$.fn.addEvent = function(element, event_name, callback) {
      if (element.addEventListener) {
        return element.addEventListener(event_name, callback, false);
      } else if (element.attachEvent) {
        return element.attachEvent("on" + event_name, callback);
      } else {
        return element["on" + event_name] = callback;
      }
    };
    $$.fn.removeEvent = function(element, event_name, callback) {
      if (element.removeEventListener) {
        return element.removeEventListener(event_name, callback, false);
      } else if (element.detachEvent) {
        return element.detachEvent("on" + event_name, callback);
      } else {
        return element["on" + event_name] = null;
      }
    };
    _subscribe = function(element, event, callback, selector, delegate_callback) {
      var delegate, element_handlers, element_id, handler;

      event = _environmentEvent(event);
      element_id = _getElementId(element);
      element_handlers = HANDLERS[element_id] || (HANDLERS[element_id] = []);
      delegate = delegate_callback && delegate_callback(callback, event);
      handler = {
        event: event,
        callback: callback,
        selector: selector,
        proxy: _createProxyCallback(delegate, callback, element),
        delegate: delegate,
        index: element_handlers.length
      };
      element_handlers.push(handler);
      return $$.fn.addEvent(element, handler.event, handler.proxy);
    };
    _unsubscribe = function(element, event, callback, selector) {
      var element_id;

      event = _environmentEvent(event);
      element_id = _getElementId(element);
      return _findHandlers(element_id, event, callback, selector).forEach(function(handler) {
        delete HANDLERS[element_id][handler.index];
        return $$.fn.removeEvent(element, handler.event, handler.proxy);
      });
    };
    _getElementId = function(element) {
      return element._id || (element._id = ELEMENT_ID++);
    };
    _environmentEvent = function(event) {
      var environment_event;

      environment_event = ($$.isMobile() ? event : EVENTS_DESKTOP[event]);
      return environment_event || event;
    };
    _createProxyCallback = function(delegate, callback, element) {
      var proxy;

      callback = delegate || callback;
      proxy = function(event) {
        var result;

        result = callback.apply(element, [event].concat(event.data));
        if (result === false) {
          event.preventDefault();
        }
        return result;
      };
      return proxy;
    };
    _findHandlers = function(element_id, event, fn, selector) {
      return (HANDLERS[element_id] || []).filter(function(handler) {
        return handler && (!event || handler.event === event) && (!fn || handler.callback === fn) && (!selector || handler.selector === selector);
      });
    };
    return _createProxy = function(event) {
      var proxy;

      proxy = $$.extend({
        originalEvent: event
      }, event);
      $$.each(EVENT_METHODS, function(name, method) {
        proxy[name] = function() {
          this[method] = function() {
            return true;
          };
          return event[name].apply(event, arguments);
        };
        return proxy[method] = function() {
          return false;
        };
      });
      return proxy;
    };
  })(Quo);

}).call(this);

(function() {
  (function($$) {
    var CURRENT_TOUCH, EVENT, FIRST_TOUCH, GESTURE, GESTURES, HOLD_DELAY, TAPS, TOUCH_TIMEOUT, _angle, _capturePinch, _captureRotation, _cleanGesture, _distance, _fingersPosition, _getTouches, _hold, _isSwipe, _listenTouches, _onTouchEnd, _onTouchMove, _onTouchStart, _parentIfText, _swipeDirection, _trigger;

    TAPS = null;
    EVENT = void 0;
    GESTURE = {};
    FIRST_TOUCH = [];
    CURRENT_TOUCH = [];
    TOUCH_TIMEOUT = void 0;
    HOLD_DELAY = 650;
    GESTURES = ["touch", "tap", "singleTap", "doubleTap", "hold", "swipe", "swiping", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "rotate", "rotating", "rotateLeft", "rotateRight", "pinch", "pinching", "pinchIn", "pinchOut", "drag", "dragLeft", "dragRight", "dragUp", "dragDown"];
    GESTURES.forEach(function(event) {
      $$.fn[event] = function(callback) {
        var event_name;

        event_name = event === "touch" ? "touchend" : event;
        return $$(document.body).delegate(this.selector, event_name, callback);
      };
      return this;
    });
    $$(document).ready(function() {
      return _listenTouches();
    });
    _listenTouches = function() {
      var environment;

      environment = $$(document.body);
      environment.bind("touchstart", _onTouchStart);
      environment.bind("touchmove", _onTouchMove);
      environment.bind("touchend", _onTouchEnd);
      return environment.bind("touchcancel", _cleanGesture);
    };
    _onTouchStart = function(event) {
      var delta, fingers, now, touches;

      EVENT = event;
      now = Date.now();
      delta = now - (GESTURE.last || now);
      TOUCH_TIMEOUT && clearTimeout(TOUCH_TIMEOUT);
      touches = _getTouches(event);
      fingers = touches.length;
      FIRST_TOUCH = _fingersPosition(touches, fingers);
      GESTURE.el = $$(_parentIfText(touches[0].target));
      GESTURE.fingers = fingers;
      GESTURE.last = now;
      if (!GESTURE.taps) {
        GESTURE.taps = 0;
      }
      GESTURE.taps++;
      if (fingers === 1) {
        if (fingers >= 1) {
          GESTURE.gap = delta > 0 && delta <= 250;
        }
        return setTimeout(_hold, HOLD_DELAY);
      } else if (fingers === 2) {
        GESTURE.initial_angle = parseInt(_angle(FIRST_TOUCH), 10);
        GESTURE.initial_distance = parseInt(_distance(FIRST_TOUCH), 10);
        GESTURE.angle_difference = 0;
        return GESTURE.distance_difference = 0;
      }
    };
    _onTouchMove = function(event) {
      var fingers, is_swipe, touches;

      EVENT = event;
      if (GESTURE.el) {
        touches = _getTouches(event);
        fingers = touches.length;
        if (fingers === GESTURE.fingers) {
          CURRENT_TOUCH = _fingersPosition(touches, fingers);
          is_swipe = _isSwipe(event);
          if (is_swipe) {
            GESTURE.prevSwipe = true;
          }
          if (is_swipe || GESTURE.prevSwipe === true) {
            _trigger("swiping");
          }
          if (fingers === 2) {
            _captureRotation();
            _capturePinch();
            event.preventDefault();
          }
        } else {
          _cleanGesture();
        }
      }
      return true;
    };
    _isSwipe = function(event) {
      var it_is, move_horizontal, move_vertical;

      it_is = false;
      if (CURRENT_TOUCH[0]) {
        move_horizontal = Math.abs(FIRST_TOUCH[0].x - CURRENT_TOUCH[0].x) > 30;
        move_vertical = Math.abs(FIRST_TOUCH[0].y - CURRENT_TOUCH[0].y) > 30;
        it_is = GESTURE.el && (move_horizontal || move_vertical);
      }
      return it_is;
    };
    _onTouchEnd = function(event) {
      var anyevent, drag_direction, pinch_direction, rotation_direction, swipe_direction;

      EVENT = event;
      _trigger("touch");
      if (GESTURE.fingers === 1) {
        if (GESTURE.taps === 2 && GESTURE.gap) {
          _trigger("doubleTap");
          _cleanGesture();
        } else if (_isSwipe() || GESTURE.prevSwipe) {
          _trigger("swipe");
          swipe_direction = _swipeDirection(FIRST_TOUCH[0].x, CURRENT_TOUCH[0].x, FIRST_TOUCH[0].y, CURRENT_TOUCH[0].y);
          _trigger("swipe" + swipe_direction);
          _cleanGesture();
        } else {
          _trigger("tap");
          if (GESTURE.taps === 1) {
            TOUCH_TIMEOUT = setTimeout((function() {
              _trigger("singleTap");
              return _cleanGesture();
            }), 100);
          }
        }
      } else {
        anyevent = false;
        if (GESTURE.angle_difference !== 0) {
          _trigger("rotate", {
            angle: GESTURE.angle_difference
          });
          rotation_direction = GESTURE.angle_difference > 0 ? "rotateRight" : "rotateLeft";
          _trigger(rotation_direction, {
            angle: GESTURE.angle_difference
          });
          anyevent = true;
        }
        if (GESTURE.distance_difference !== 0) {
          _trigger("pinch", {
            angle: GESTURE.distance_difference
          });
          pinch_direction = GESTURE.distance_difference > 0 ? "pinchOut" : "pinchIn";
          _trigger(pinch_direction, {
            distance: GESTURE.distance_difference
          });
          anyevent = true;
        }
        if (!anyevent && CURRENT_TOUCH[0]) {
          if (Math.abs(FIRST_TOUCH[0].x - CURRENT_TOUCH[0].x) > 10 || Math.abs(FIRST_TOUCH[0].y - CURRENT_TOUCH[0].y) > 10) {
            _trigger("drag");
            drag_direction = _swipeDirection(FIRST_TOUCH[0].x, CURRENT_TOUCH[0].x, FIRST_TOUCH[0].y, CURRENT_TOUCH[0].y);
            _trigger("drag" + drag_direction);
          }
        }
        _cleanGesture();
      }
      return EVENT = void 0;
    };
    _fingersPosition = function(touches, fingers) {
      var i, result;

      result = [];
      i = 0;
      touches = touches[0].targetTouches ? touches[0].targetTouches : touches;
      while (i < fingers) {
        result.push({
          x: touches[i].pageX,
          y: touches[i].pageY
        });
        i++;
      }
      return result;
    };
    _captureRotation = function() {
      var angle, diff, i, symbol;

      angle = parseInt(_angle(CURRENT_TOUCH), 10);
      diff = parseInt(GESTURE.initial_angle - angle, 10);
      if (Math.abs(diff) > 20 || GESTURE.angle_difference !== 0) {
        i = 0;
        symbol = GESTURE.angle_difference < 0 ? "-" : "+";
        while (Math.abs(diff - GESTURE.angle_difference) > 90 && i++ < 10) {
          eval("diff " + symbol + "= 180;");
        }
        GESTURE.angle_difference = parseInt(diff, 10);
        return _trigger("rotating", {
          angle: GESTURE.angle_difference
        });
      }
    };
    _capturePinch = function() {
      var diff, distance;

      distance = parseInt(_distance(CURRENT_TOUCH), 10);
      diff = GESTURE.initial_distance - distance;
      if (Math.abs(diff) > 10) {
        GESTURE.distance_difference = diff;
        return _trigger("pinching", {
          distance: diff
        });
      }
    };
    _trigger = function(type, params) {
      if (GESTURE.el) {
        params = params || {};
        if (CURRENT_TOUCH[0]) {
          params.iniTouch = (GESTURE.fingers > 1 ? FIRST_TOUCH : FIRST_TOUCH[0]);
          params.currentTouch = (GESTURE.fingers > 1 ? CURRENT_TOUCH : CURRENT_TOUCH[0]);
        }
        return GESTURE.el.trigger(type, params, EVENT);
      }
    };
    _cleanGesture = function(event) {
      FIRST_TOUCH = [];
      CURRENT_TOUCH = [];
      GESTURE = {};
      return clearTimeout(TOUCH_TIMEOUT);
    };
    _angle = function(touches_data) {
      var A, B, angle;

      A = touches_data[0];
      B = touches_data[1];
      angle = Math.atan((B.y - A.y) * -1 / (B.x - A.x)) * (180 / Math.PI);
      if (angle < 0) {
        return angle + 180;
      } else {
        return angle;
      }
    };
    _distance = function(touches_data) {
      var A, B;

      A = touches_data[0];
      B = touches_data[1];
      return Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y)) * -1;
    };
    _getTouches = function(event) {
      if ($$.isMobile()) {
        return event.touches;
      } else {
        return [event];
      }
    };
    _parentIfText = function(node) {
      if ("tagName" in node) {
        return node;
      } else {
        return node.parentNode;
      }
    };
    _swipeDirection = function(x1, x2, y1, y2) {
      var xDelta, yDelta;

      xDelta = Math.abs(x1 - x2);
      yDelta = Math.abs(y1 - y2);
      if (xDelta >= yDelta) {
        if (x1 - x2 > 0) {
          return "Left";
        } else {
          return "Right";
        }
      } else {
        if (y1 - y2 > 0) {
          return "Up";
        } else {
          return "Down";
        }
      }
    };
    return _hold = function() {
      if (GESTURE.last && (Date.now() - GESTURE.last >= HOLD_DELAY)) {
        _trigger("hold");
        return GESTURE.taps = 0;
      }
    };
  })(Quo);

}).call(this);

(function() {
  (function($$) {
    $$.fn.text = function(value) {
      if (value || $$.toType(value) === "number") {
        return this.each(function() {
          return this.textContent = value;
        });
      } else {
        return this[0].textContent;
      }
    };
    $$.fn.html = function(value) {
      var type;

      type = $$.toType(value);
      if (value || type === "number" || type === "string") {
        return this.each(function() {
          var element, _i, _len, _results;

          if (type === "string" || type === "number") {
            return this.innerHTML = value;
          } else {
            this.innerHTML = null;
            if (type === "array") {
              _results = [];
              for (_i = 0, _len = value.length; _i < _len; _i++) {
                element = value[_i];
                _results.push(this.appendChild(element));
              }
              return _results;
            } else {
              return this.appendChild(value);
            }
          }
        });
      } else {
        return this[0].innerHTML;
      }
    };
    $$.fn.append = function(value) {
      var type;

      type = $$.toType(value);
      return this.each(function() {
        var _this = this;

        if (type === "string") {
          return this.insertAdjacentHTML("beforeend", value);
        } else if (type === "array") {
          return value.each(function(index, value) {
            return _this.appendChild(value);
          });
        } else {
          return this.appendChild(value);
        }
      });
    };
    $$.fn.prepend = function(value) {
      var type;

      type = $$.toType(value);
      return this.each(function() {
        var _this = this;

        if (type === "string") {
          return this.insertAdjacentHTML("afterbegin", value);
        } else if (type === "array") {
          return value.each(function(index, value) {
            return _this.insertBefore(value, _this.firstChild);
          });
        } else {
          return this.insertBefore(value, this.firstChild);
        }
      });
    };
    $$.fn.replaceWith = function(value) {
      var type;

      type = $$.toType(value);
      this.each(function() {
        var _this = this;

        if (this.parentNode) {
          if (type === "string") {
            return this.insertAdjacentHTML("beforeBegin", value);
          } else if (type === "array") {
            return value.each(function(index, value) {
              return _this.parentNode.insertBefore(value, _this);
            });
          } else {
            return this.parentNode.insertBefore(value, this);
          }
        }
      });
      return this.remove();
    };
    return $$.fn.empty = function() {
      return this.each(function() {
        return this.innerHTML = null;
      });
    };
  })(Quo);

}).call(this);

(function() {
  (function($$) {
    var CLASS_SELECTOR, ID_SELECTOR, PARENT_NODE, TAG_SELECTOR, _filtered, _findAncestors;

    PARENT_NODE = "parentNode";
    CLASS_SELECTOR = /^\.([\w-]+)$/;
    ID_SELECTOR = /^#[\w\d-]+$/;
    TAG_SELECTOR = /^[\w-]+$/;
    $$.query = function(domain, selector) {
      var elements;

      selector = selector.trim();
      if (CLASS_SELECTOR.test(selector)) {
        elements = domain.getElementsByClassName(selector.replace(".", ""));
      } else if (TAG_SELECTOR.test(selector)) {
        elements = domain.getElementsByTagName(selector);
      } else if (ID_SELECTOR.test(selector) && domain === document) {
        elements = domain.getElementById(selector.replace("#", ""));
        if (!elements) {
          elements = [];
        }
      } else {
        elements = domain.querySelectorAll(selector);
      }
      if (elements.nodeType) {
        return [elements];
      } else {
        return Array.prototype.slice.call(elements);
      }
    };
    $$.fn.find = function(selector) {
      var result;

      if (this.length === 1) {
        result = Quo.query(this[0], selector);
      } else {
        result = this.map(function() {
          return Quo.query(this, selector);
        });
      }
      return $$(result);
    };
    $$.fn.parent = function(selector) {
      var ancestors;

      ancestors = (selector ? _findAncestors(this) : this.instance(PARENT_NODE));
      return _filtered(ancestors, selector);
    };
    $$.fn.siblings = function(selector) {
      var siblings_elements;

      siblings_elements = this.map(function(index, element) {
        return Array.prototype.slice.call(element.parentNode.children).filter(function(child) {
          return child !== element;
        });
      });
      return _filtered(siblings_elements, selector);
    };
    $$.fn.children = function(selector) {
      var children_elements;

      children_elements = this.map(function() {
        return Array.prototype.slice.call(this.children);
      });
      return _filtered(children_elements, selector);
    };
    $$.fn.get = function(index) {
      if (index === undefined) {
        return this;
      } else {
        return this[index];
      }
    };
    $$.fn.first = function() {
      return $$(this[0]);
    };
    $$.fn.last = function() {
      return $$(this[this.length - 1]);
    };
    $$.fn.closest = function(selector, context) {
      var candidates, node;

      node = this[0];
      candidates = $$(selector);
      if (!candidates.length) {
        node = null;
      }
      while (node && candidates.indexOf(node) < 0) {
        node = node !== context && node !== document && node.parentNode;
      }
      return $$(node);
    };
    $$.fn.each = function(callback) {
      this.forEach(function(element, index) {
        return callback.call(element, index, element);
      });
      return this;
    };
    _findAncestors = function(nodes) {
      var ancestors;

      ancestors = [];
      while (nodes.length > 0) {
        nodes = $$.map(nodes, function(node) {
          if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
            ancestors.push(node);
            return node;
          }
        });
      }
      return ancestors;
    };
    return _filtered = function(nodes, selector) {
      if (selector === undefined) {
        return $$(nodes);
      } else {
        return $$(nodes).filter(selector);
      }
    };
  })(Quo);

}).call(this);

(function() {
  (function($$) {
    var VENDORS, _computedStyle, _existsClass;

    VENDORS = ["-webkit-", "-moz-", "-ms-", "-o-", ""];
    $$.fn.addClass = function(name) {
      return this.each(function() {
        if (!_existsClass(name, this.className)) {
          this.className += " " + name;
          return this.className = this.className.trim();
        }
      });
    };
    $$.fn.removeClass = function(name) {
      return this.each(function() {
        if (!name) {
          return this.className = "";
        } else {
          if (_existsClass(name, this.className)) {
            return this.className = this.className.replace(name, " ").replace(/\s+/g, " ").trim();
          }
        }
      });
    };
    $$.fn.toggleClass = function(name) {
      return this.each(function() {
        if (_existsClass(name, this.className)) {
          return this.className = this.className.replace(name, " ");
        } else {
          this.className += " " + name;
          return this.className = this.className.trim();
        }
      });
    };
    $$.fn.hasClass = function(name) {
      return _existsClass(name, this[0].className);
    };
    $$.fn.style = function(property, value) {
      if (value) {
        return this.each(function() {
          return this.style[property] = value;
        });
      } else {
        return this[0].style[property] || _computedStyle(this[0], property);
      }
    };
    $$.fn.css = function(property, value) {
      return this.style(property, value);
    };
    $$.fn.vendor = function(property, value) {
      var vendor, _i, _len, _results;

      _results = [];
      for (_i = 0, _len = VENDORS.length; _i < _len; _i++) {
        vendor = VENDORS[_i];
        _results.push(this.style("" + vendor + property, value));
      }
      return _results;
    };
    _existsClass = function(name, className) {
      var classes;

      classes = className.split(/\s+/g);
      return classes.indexOf(name) >= 0;
    };
    return _computedStyle = function(element, property) {
      return document.defaultView.getComputedStyle(element, "")[property];
    };
  })(Quo);

}).call(this);
