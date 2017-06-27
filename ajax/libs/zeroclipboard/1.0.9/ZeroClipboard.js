/*!
 * zeroclipboard
 * The Zero Clipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie, and a JavaScript interface.
 * Copyright 2012 Jon Rohan, James M. Greene, .
 * Released under the MIT license
 * http://jonrohan.github.com/ZeroClipboard/
 * v1.0.9
 */(function() {
  "use strict";
  var ZeroClipboard = {};
  ZeroClipboard.Client = function(elem) {
    this.handlers = {};
    this.id = ZeroClipboard.nextId++;
    this.movieId = "ZeroClipboardMovie_" + this.id;
    ZeroClipboard.register(this.id, this);
    if (elem) this.glue(elem);
  };
  ZeroClipboard.Client.prototype.id = 0;
  ZeroClipboard.Client.prototype.title = "";
  ZeroClipboard.Client.prototype.ready = false;
  ZeroClipboard.Client.prototype.movie = null;
  ZeroClipboard.Client.prototype.clipText = "";
  ZeroClipboard.Client.prototype.handCursorEnabled = true;
  ZeroClipboard.Client.prototype.cssEffects = true;
  ZeroClipboard.Client.prototype.handlers = null;
  ZeroClipboard.Client.prototype.zIndex = 99;
  ZeroClipboard.Client.prototype.getHTML = function(width, height) {
    var html = "";
    var flashvars = "id=" + this.id + "&width=" + width + "&height=" + height, title = this.title ? ' title="' + this.title + '"' : "";
    if (navigator.userAgent.match(/MSIE/)) {
      var protocol = location.href.match(/^https/i) ? "https://" : "http://";
      html += "<object" + title + ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + protocol + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="' + this.movieId + '"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><param name="wmode" value="transparent"/></object>';
    } else {
      html += "<embed" + title + ' id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + height + '" name="' + this.movieId + '" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" wmode="transparent" />';
    }
    return html;
  };
  ZeroClipboard.Client.prototype.destroy = function() {
    if (this.domElement && this.div) {
      this.hide();
      this.div.innerHTML = "";
      var body = document.getElementsByTagName("body")[0];
      try {
        body.removeChild(this.div);
      } catch (e) {}
      this.domElement = null;
      this.div = null;
    }
  };
  ZeroClipboard.Client.prototype.setText = function(newText) {
    this.clipText = newText;
    if (this.ready) this.movie.setText(newText);
  };
  ZeroClipboard.Client.prototype.setTitle = function(newTitle) {
    this.title = newTitle;
    if (this.div) {
      var flashElems = this.div.children;
      if (flashElems.length) {
        flashElems[0].setAttribute("title", this.title);
      }
    }
  };
  ZeroClipboard.Client.prototype.setHandCursor = function(enabled) {
    this.handCursorEnabled = enabled;
    if (this.ready) this.movie.setHandCursor(enabled);
  };
  ZeroClipboard.Client.prototype.setCSSEffects = function(enabled) {
    this.cssEffects = !!enabled;
  };
  ZeroClipboard.version = "1.0.9";
  ZeroClipboard.clients = {};
  ZeroClipboard.moviePath = "ZeroClipboard.swf";
  ZeroClipboard.nextId = 1;
  ZeroClipboard.setMoviePath = function(path) {
    this.moviePath = path;
  };
  ZeroClipboard.newClient = function() {
    return new ZeroClipboard.Client;
  };
  ZeroClipboard.register = function(id, client) {
    this.clients[id] = client;
  };
  ZeroClipboard.dispatch = function(id, eventName, args) {
    var client = this.clients[id];
    if (client) {
      client.receiveEvent(eventName, args);
    }
  };
  ZeroClipboard.Client.prototype.addEventListener = function(eventName, func) {
    eventName = eventName.toString().toLowerCase().replace(/^on/, "");
    if (!this.handlers[eventName]) this.handlers[eventName] = [];
    this.handlers[eventName].push(func);
  };
  ZeroClipboard.Client.prototype.receiveEvent = function(eventName, args) {
    eventName = eventName.toString().toLowerCase().replace(/^on/, "");
    switch (eventName) {
     case "load":
      this.movie = document.getElementById(this.movieId);
      var self;
      if (!this.movie) {
        self = this;
        setTimeout(function() {
          self.receiveEvent("load", null);
        }, 1);
        return;
      }
      if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
        self = this;
        setTimeout(function() {
          self.receiveEvent("load", null);
        }, 100);
        this.ready = true;
        return;
      }
      this.ready = true;
      this.movie.setText(this.clipText);
      this.movie.setHandCursor(this.handCursorEnabled);
      break;
     case "mouseover":
      if (this.domElement && this.cssEffects) {
        this.domElement.addClass("hover");
        if (this.recoverActive) this.domElement.addClass("active");
      }
      break;
     case "mouseout":
      if (this.domElement && this.cssEffects) {
        this.recoverActive = false;
        if (this.domElement.hasClass("active")) {
          this.domElement.removeClass("active");
          this.recoverActive = true;
        }
        this.domElement.removeClass("hover");
      }
      break;
     case "mousedown":
      if (this.domElement && this.cssEffects) {
        this.domElement.addClass("active");
      }
      break;
     case "mouseup":
      if (this.domElement && this.cssEffects) {
        this.domElement.removeClass("active");
        this.recoverActive = false;
      }
      break;
    }
    if (this.handlers[eventName]) {
      for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
        var func = this.handlers[eventName][idx];
        if (typeof func == "function") {
          func(this, args);
        } else if (typeof func == "object" && func.length == 2) {
          func[0][func[1]](this, args);
        } else if (typeof func == "string") {
          window[func](this, args);
        }
      }
    }
  };
  ZeroClipboard.Client.prototype.glue = function(elem, appendElem, stylesToAdd) {
    this.domElement = ZeroClipboard.$(elem);
    if (this.domElement.style.zIndex) {
      this.zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
    }
    if (!this.title && this.domElement.getAttribute("title")) {
      this.title = this.domElement.getAttribute("title");
    }
    if (!this.clipText && this.domElement.getAttribute("data-clipboard-text")) {
      this.clipText = this.domElement.getAttribute("data-clipboard-text");
    }
    if (typeof appendElem == "string") {
      appendElem = ZeroClipboard.$(appendElem);
    } else if (typeof appendElem == "undefined") {
      appendElem = document.getElementsByTagName("body")[0];
    }
    var box = ZeroClipboard.getDOMObjectPosition(this.domElement, appendElem);
    this.div = document.createElement("div");
    var style = this.div.style;
    style.position = "absolute";
    style.left = "" + box.left + "px";
    style.top = "" + box.top + "px";
    style.width = "" + box.width + "px";
    style.height = "" + box.height + "px";
    style.zIndex = this.zIndex;
    if (typeof stylesToAdd == "object") {
      for (var addedStyle in stylesToAdd) {
        style[addedStyle] = stylesToAdd[addedStyle];
      }
    }
    this.div.innerHTML = this.getHTML(box.width, box.height);
    appendElem.appendChild(this.div);
  };
  ZeroClipboard.getDOMObjectPosition = function(obj, stopObj) {
    var info = {
      left: 0,
      top: 0,
      width: obj.width ? obj.width : obj.offsetWidth,
      height: obj.height ? obj.height : obj.offsetHeight
    };
    while (obj && obj != stopObj) {
      info.left += obj.offsetLeft;
      info.left += obj.style.borderLeftWidth ? parseInt(obj.style.borderLeftWidth, 10) : 0;
      info.top += obj.offsetTop;
      info.top += obj.style.borderTopWidth ? parseInt(obj.style.borderTopWidth, 10) : 0;
      obj = obj.offsetParent;
    }
    return info;
  };
  ZeroClipboard.Client.prototype.reposition = function(elem) {
    if (elem) {
      this.domElement = ZeroClipboard.$(elem);
      if (!this.domElement) this.hide();
    }
    if (this.domElement && this.div) {
      var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
      var style = this.div.style;
      style.left = "" + box.left + "px";
      style.top = "" + box.top + "px";
    }
  };
  ZeroClipboard.Client.prototype.hide = function() {
    if (this.div) {
      this.div.style.left = "-2000px";
    }
  };
  ZeroClipboard.Client.prototype.show = function() {
    this.reposition();
  };
  ZeroClipboard.$ = function(thingy) {
    if (typeof thingy == "string") thingy = document.getElementById(thingy);
    if (!thingy.addClass) {
      thingy.hide = function() {
        this.style.display = "none";
      };
      thingy.show = function() {
        this.style.display = "";
      };
      thingy.addClass = function(name) {
        this.removeClass(name);
        this.className += " " + name;
      };
      thingy.removeClass = function(name) {
        var classes = this.className.split(/\s+/);
        var idx = -1;
        for (var k = 0; k < classes.length; k++) {
          if (classes[k] == name) {
            idx = k;
            k = classes.length;
          }
        }
        if (idx > -1) {
          classes.splice(idx, 1);
          this.className = classes.join(" ");
        }
        return this;
      };
      thingy.hasClass = function(name) {
        return !!this.className.match(new RegExp("\\s*" + name + "\\s*"));
      };
    }
    return thingy;
  };
  if (typeof module !== "undefined") {
    module.exports = ZeroClipboard;
  } else {
    window.ZeroClipboard = ZeroClipboard;
  }
})();