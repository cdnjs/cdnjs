/*!
 * zeroclipboard
 * The Zero Clipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie, and a JavaScript interface.
 * Copyright 2012 Jon Rohan, James M. Greene, .
 * Released under the MIT license
 * http://jonrohan.github.com/ZeroClipboard/
 * v1.1.4
 */(function() {
  "use strict";
  var ZeroClipboard = {};
  ZeroClipboard.Client = function(query) {
    var singleton = ZeroClipboard._client;
    if (singleton) {
      if (query) singleton.glue(query);
      return singleton;
    }
    this.handlers = {};
    this._text = null;
    if (ZeroClipboard.detectFlashSupport()) this.bridge();
    if (query) this.glue(query);
    ZeroClipboard._client = this;
  };
  ZeroClipboard.Client.prototype.bridge = function() {
    this.htmlBridge = ZeroClipboard.$("#global-zeroclipboard-html-bridge");
    if (this.htmlBridge.length) {
      this.htmlBridge = this.htmlBridge[0];
      this.flashBridge = document["global-zeroclipboard-flash-bridge"];
      return;
    }
    function noCache(path) {
      return (path.indexOf("?") >= 0 ? "&" : "?") + "nocache=" + (new Date).getTime();
    }
    function vars() {
      var str = [];
      if (ZeroClipboard._trustedDomain) str.push("trustedDomain=" + ZeroClipboard._trustedDomain);
      return str.join("&");
    }
    var html = '    <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">       <param name="movie" value="' + ZeroClipboard._moviePath + noCache(ZeroClipboard._moviePath) + '"/>       <param name="allowScriptAccess" value="always" />       <param name="scale" value="exactfit">       <param name="loop" value="false" />       <param name="menu" value="false" />       <param name="quality" value="best" />       <param name="bgcolor" value="#ffffff" />       <param name="wmode" value="transparent"/>       <param name="flashvars" value="' + vars() + '"/>       <embed src="' + ZeroClipboard._moviePath + noCache(ZeroClipboard._moviePath) + '"         loop="false" menu="false"         quality="best" bgcolor="#ffffff"         width="100%" height="100%"         name="global-zeroclipboard-flash-bridge"         allowScriptAccess="always"         allowFullScreen="false"         type="application/x-shockwave-flash"         wmode="transparent"         pluginspage="http://www.macromedia.com/go/getflashplayer"         flashvars="' + vars() + '"         scale="exactfit">       </embed>     </object>';
    this.htmlBridge = document.createElement("div");
    this.htmlBridge.id = "global-zeroclipboard-html-bridge";
    this.htmlBridge.setAttribute("class", "global-zeroclipboard-container");
    this.htmlBridge.setAttribute("data-clipboard-ready", false);
    this.htmlBridge.style.position = "absolute";
    this.htmlBridge.style.left = "-9999px";
    this.htmlBridge.style.top = "-9999px";
    this.htmlBridge.style.width = "15px";
    this.htmlBridge.style.height = "15px";
    this.htmlBridge.style.zIndex = "9999";
    this.htmlBridge.innerHTML = html;
    document.body.appendChild(this.htmlBridge);
    this.flashBridge = document["global-zeroclipboard-flash-bridge"];
  };
  ZeroClipboard.Client.prototype.resetBridge = function() {
    this.htmlBridge.style.left = "-9999px";
    this.htmlBridge.style.top = "-9999px";
    this.htmlBridge.removeAttribute("title");
    this.htmlBridge.removeAttribute("data-clipboard-text");
    ZeroClipboard.currentElement.removeClass("zeroclipboard-is-active");
    delete ZeroClipboard.currentElement;
  };
  ZeroClipboard.Client.prototype.ready = function() {
    var ready = this.htmlBridge.getAttribute("data-clipboard-ready");
    return ready === "true" || ready === true;
  };
  function _getStyle(el, prop) {
    var y = el.style[prop];
    if (el.currentStyle) y = el.currentStyle[prop]; else if (window.getComputedStyle) y = document.defaultView.getComputedStyle(el, null).getPropertyValue(prop);
    if (y == "auto" && prop == "cursor") {
      var possiblePointers = [ "a" ];
      for (var i = 0; i < possiblePointers.length; i++) {
        if (el.tagName.toLowerCase() == possiblePointers[i]) {
          return "pointer";
        }
      }
    }
    return y;
  }
  ZeroClipboard.Client.prototype.setCurrent = function(element) {
    ZeroClipboard.currentElement = element;
    this.reposition();
    this.setText(this._text || element.getAttribute("data-clipboard-text"));
    if (element.getAttribute("title")) {
      this.setTitle(element.getAttribute("title"));
    }
    if (_getStyle(element, "cursor") == "pointer") {
      this.setHandCursor(true);
    } else {
      this.setHandCursor(false);
    }
  };
  ZeroClipboard.Client.prototype.reposition = function() {
    if (!ZeroClipboard.currentElement) return false;
    var pos = _getDOMObjectPosition(ZeroClipboard.currentElement);
    this.htmlBridge.style.top = pos.top + "px";
    this.htmlBridge.style.left = pos.left + "px";
    this.htmlBridge.style.width = pos.width + "px";
    this.htmlBridge.style.height = pos.height + "px";
    this.htmlBridge.style.zIndex = pos.zIndex + 1;
    this.setSize(pos.width, pos.height);
  };
  ZeroClipboard.Client.prototype.setText = function(newText) {
    if (newText && newText !== "") {
      this._text = newText;
      if (this.ready()) this.flashBridge.setText(newText);
    }
  };
  ZeroClipboard.Client.prototype.resetText = function() {
    this._text = null;
  };
  ZeroClipboard.Client.prototype.setTitle = function(newTitle) {
    if (newTitle && newTitle !== "") this.htmlBridge.setAttribute("title", newTitle);
  };
  ZeroClipboard.Client.prototype.setSize = function(width, height) {
    if (this.ready()) this.flashBridge.setSize(width, height);
  };
  ZeroClipboard.Client.prototype.setHandCursor = function(enabled) {
    if (this.ready()) this.flashBridge.setHandCursor(enabled);
  };
  ZeroClipboard.version = "1.1.4";
  ZeroClipboard._moviePath = "ZeroClipboard.swf";
  ZeroClipboard._client = null;
  ZeroClipboard.setMoviePath = function(path) {
    this._moviePath = path;
  };
  ZeroClipboard.setTrustedDomain = function(obj) {
    this._trustedDomain = obj;
  };
  ZeroClipboard.destroy = function() {
    var query = ZeroClipboard.$("#global-zeroclipboard-html-bridge");
    if (!query.length) return;
    delete ZeroClipboard._client;
    var bridge = query[0];
    bridge.parentNode.removeChild(bridge);
  };
  ZeroClipboard.detectFlashSupport = function() {
    var hasFlash = false;
    try {
      if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
        hasFlash = true;
      }
    } catch (error) {
      if (navigator.mimeTypes["application/x-shockwave-flash"]) {
        hasFlash = true;
      }
    }
    return hasFlash;
  };
  ZeroClipboard.dispatch = function(eventName, args) {
    ZeroClipboard._client.receiveEvent(eventName, args);
  };
  ZeroClipboard.Client.prototype.on = function(eventName, func) {
    var events = eventName.toString().split(/\s/g);
    for (var i = 0; i < events.length; i++) {
      eventName = events[i].toLowerCase().replace(/^on/, "");
      if (!this.handlers[eventName]) this.handlers[eventName] = [];
      this.handlers[eventName].push(func);
    }
    if (this.handlers.noflash && !ZeroClipboard.detectFlashSupport()) {
      this.receiveEvent("onNoFlash", null);
    }
  };
  ZeroClipboard.Client.prototype.addEventListener = function(eventName, func) {
    this.on(eventName, func);
  };
  ZeroClipboard.Client.prototype.receiveEvent = function(eventName, args) {
    eventName = eventName.toString().toLowerCase().replace(/^on/, "");
    var currentElement = ZeroClipboard.currentElement;
    switch (eventName) {
     case "load":
      if (args && parseFloat(args.flashVersion.replace(",", ".").replace(/[^0-9\.]/gi, "")) < 10) {
        this.receiveEvent("onWrongFlash", {
          flashVersion: args.flashVersion
        });
        return;
      }
      this.htmlBridge.setAttribute("data-clipboard-ready", true);
      break;
     case "mouseover":
      currentElement.addClass("zeroclipboard-is-hover");
      break;
     case "mouseout":
      currentElement.removeClass("zeroclipboard-is-hover");
      this.resetBridge();
      break;
     case "mousedown":
      currentElement.addClass("zeroclipboard-is-active");
      break;
     case "mouseup":
      currentElement.removeClass("zeroclipboard-is-active");
      break;
     case "complete":
      this.resetText();
      break;
    }
    if (this.handlers[eventName]) {
      for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
        var func = this.handlers[eventName][idx];
        if (typeof func == "function") {
          func.call(currentElement, this, args);
        } else if (typeof func == "string") {
          window[func].call(currentElement, this, args);
        }
      }
    }
  };
  function _elementMouseOver(event) {
    if (!event) {
      event = window.event;
    }
    var target;
    if (this !== window) {
      target = this;
    } else if (event.target) {
      target = event.target;
    } else if (event.srcElement) {
      target = event.srcElement;
    }
    ZeroClipboard._client.setCurrent(elementWrapper(target));
  }
  ZeroClipboard.Client.prototype.glue = function(query) {
    function _addEventHandler(element, method, func) {
      if (element.addEventListener) {
        element.addEventListener(method, func, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + method, func);
      }
    }
    var elements = ZeroClipboard.$(query);
    for (var i = 0; i < elements.length; i++) {
      _addEventHandler(elements[i], "mouseover", _elementMouseOver);
    }
  };
  ZeroClipboard.Client.prototype.unglue = function(query) {
    function _removeEventHandler(element, method, func) {
      if (element.removeEventListener) {
        element.removeEventListener(method, func, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + method, func);
      }
    }
    var elements = ZeroClipboard.$(query);
    for (var i = 0; i < elements.length; i++) {
      _removeEventHandler(elements[i], "mouseover", _elementMouseOver);
    }
  };
  var _getDOMObjectPosition = function(obj) {
    var info = {
      left: 0,
      top: 0,
      width: obj.width ? obj.width : obj.offsetWidth,
      height: obj.height ? obj.height : obj.offsetHeight,
      zIndex: 9999
    };
    var zi = _getStyle(obj, "zIndex");
    if (zi && zi != "auto") {
      info.zIndex = parseInt(zi, 10);
    }
    while (obj) {
      info.left += obj.offsetLeft;
      info.left += _getStyle(obj, "borderLeftWidth") ? parseInt(_getStyle(obj, "borderLeftWidth"), 10) : 0;
      info.top += obj.offsetTop;
      info.top += _getStyle(obj, "borderTopWidth") ? parseInt(_getStyle(obj, "borderTopWidth"), 10) : 0;
      obj = obj.offsetParent;
    }
    return info;
  };
  function elementWrapper(element) {
    if (!element || element.addClass) return element;
    element.addClass = function(value) {
      if (value && typeof value === "string") {
        var classNames = (value || "").split(/\s+/);
        var elem = this;
        if (elem.nodeType === 1) {
          if (!elem.className) {
            elem.className = value;
          } else {
            var className = " " + elem.className + " ", setClass = elem.className;
            for (var c = 0, cl = classNames.length; c < cl; c++) {
              if (className.indexOf(" " + classNames[c] + " ") < 0) {
                setClass += " " + classNames[c];
              }
            }
            elem.className = setClass.replace(/^\s+|\s+$/g, "");
          }
        }
      }
      return this;
    };
    element.removeClass = function(value) {
      if (value && typeof value === "string" || value === undefined) {
        var classNames = (value || "").split(/\s+/);
        var elem = this;
        if (elem.nodeType === 1 && elem.className) {
          if (value) {
            var className = (" " + elem.className + " ").replace(/[\n\t]/g, " ");
            for (var c = 0, cl = classNames.length; c < cl; c++) {
              className = className.replace(" " + classNames[c] + " ", " ");
            }
            elem.className = className.replace(/^\s+|\s+$/g, "");
          } else {
            elem.className = "";
          }
        }
      }
      return this;
    };
    return element;
  }
  ZeroClipboard.$ = function(query) {
    var ZeroClipboardSelect = function(s, n) {
      return n.querySelectorAll(s);
    }, result;
    if (typeof Sizzle === "function") {
      ZeroClipboardSelect = function(s, n) {
        return Sizzle.uniqueSort(Sizzle(s, n));
      };
    } else if (typeof jQuery === "function") {
      ZeroClipboardSelect = function(s, n) {
        return jQuery.unique(jQuery.find(s, n));
      };
    }
    if (typeof query === "string") {
      result = ZeroClipboardSelect(query, document);
      if (result.length === 0) result = [ document.getElementById(query) ];
    }
    var newresult = [];
    for (var i = 0; i < result.length; i++) {
      if (result[i] !== null) newresult.push(elementWrapper(result[i]));
    }
    return newresult;
  };
  if (typeof module !== "undefined") {
    module.exports = ZeroClipboard;
  } else {
    window.ZeroClipboard = ZeroClipboard;
  }
})();