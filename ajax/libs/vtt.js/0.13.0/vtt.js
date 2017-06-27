/* vtt.js - v0.12.1 (https://github.com/mozilla/vtt.js) built on 03-12-2015 */

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root) {

  var autoKeyword = "auto";
  var directionSetting = {
    "": true,
    "lr": true,
    "rl": true
  };
  var alignSetting = {
    "start": true,
    "middle": true,
    "end": true,
    "left": true,
    "right": true
  };

  function findDirectionSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var dir = directionSetting[value.toLowerCase()];
    return dir ? value.toLowerCase() : false;
  }

  function findAlignSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var align = alignSetting[value.toLowerCase()];
    return align ? value.toLowerCase() : false;
  }

  function extend(obj) {
    var i = 1;
    for (; i < arguments.length; i++) {
      var cobj = arguments[i];
      for (var p in cobj) {
        obj[p] = cobj[p];
      }
    }

    return obj;
  }

  function VTTCue(startTime, endTime, text) {
    var cue = this;
    var isIE8 = (/MSIE\s8\.0/).test(navigator.userAgent);
    var baseObj = {};

    if (isIE8) {
      cue = document.createElement('custom');
    } else {
      baseObj.enumerable = true;
    }

    /**
     * Shim implementation specific properties. These properties are not in
     * the spec.
     */

    // Lets us know when the VTTCue's data has changed in such a way that we need
    // to recompute its display state. This lets us compute its display state
    // lazily.
    cue.hasBeenReset = false;

    /**
     * VTTCue and TextTrackCue properties
     * http://dev.w3.org/html5/webvtt/#vttcue-interface
     */

    var _id = "";
    var _pauseOnExit = false;
    var _startTime = startTime;
    var _endTime = endTime;
    var _text = text;
    var _region = null;
    var _vertical = "";
    var _snapToLines = true;
    var _line = "auto";
    var _lineAlign = "start";
    var _position = 50;
    var _positionAlign = "middle";
    var _size = 50;
    var _align = "middle";

    Object.defineProperty(cue,
      "id", extend({}, baseObj, {
        get: function() {
          return _id;
        },
        set: function(value) {
          _id = "" + value;
        }
      }));

    Object.defineProperty(cue,
      "pauseOnExit", extend({}, baseObj, {
        get: function() {
          return _pauseOnExit;
        },
        set: function(value) {
          _pauseOnExit = !!value;
        }
      }));

    Object.defineProperty(cue,
      "startTime", extend({}, baseObj, {
        get: function() {
          return _startTime;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("Start time must be set to a number.");
          }
          _startTime = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "endTime", extend({}, baseObj, {
        get: function() {
          return _endTime;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("End time must be set to a number.");
          }
          _endTime = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "text", extend({}, baseObj, {
        get: function() {
          return _text;
        },
        set: function(value) {
          _text = "" + value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "region", extend({}, baseObj, {
        get: function() {
          return _region;
        },
        set: function(value) {
          _region = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "vertical", extend({}, baseObj, {
        get: function() {
          return _vertical;
        },
        set: function(value) {
          var setting = findDirectionSetting(value);
          // Have to check for false because the setting an be an empty string.
          if (setting === false) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _vertical = setting;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "snapToLines", extend({}, baseObj, {
        get: function() {
          return _snapToLines;
        },
        set: function(value) {
          _snapToLines = !!value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "line", extend({}, baseObj, {
        get: function() {
          return _line;
        },
        set: function(value) {
          if (typeof value !== "number" && value !== autoKeyword) {
            throw new SyntaxError("An invalid number or illegal string was specified.");
          }
          _line = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "lineAlign", extend({}, baseObj, {
        get: function() {
          return _lineAlign;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _lineAlign = setting;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "position", extend({}, baseObj, {
        get: function() {
          return _position;
        },
        set: function(value) {
          if (value < 0 || value > 100) {
            throw new Error("Position must be between 0 and 100.");
          }
          _position = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "positionAlign", extend({}, baseObj, {
        get: function() {
          return _positionAlign;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _positionAlign = setting;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "size", extend({}, baseObj, {
        get: function() {
          return _size;
        },
        set: function(value) {
          if (value < 0 || value > 100) {
            throw new Error("Size must be between 0 and 100.");
          }
          _size = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "align", extend({}, baseObj, {
        get: function() {
          return _align;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _align = setting;
          this.hasBeenReset = true;
        }
      }));

    /**
     * Other <track> spec defined properties
     */

    // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#text-track-cue-display-state
    cue.displayState = undefined;

    if (isIE8) {
      return cue;
    }
  }

  /**
   * VTTCue methods
   */

  VTTCue.prototype.getCueAsHTML = function() {
    // Assume WebVTT.convertCueToDOMTree is on the global.
    return WebVTT.convertCueToDOMTree(window, this.text);
  };

  root.VTTCue = VTTCue || root.VTTCue;
}(this));

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root) {

  var scrollSetting = {
    "": true,
    "up": true
  };

  function findScrollSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var scroll = scrollSetting[value.toLowerCase()];
    return scroll ? value.toLowerCase() : false;
  }

  function isValidPercentValue(value) {
    return typeof value === "number" && (value >= 0 && value <= 100);
  }

  // VTTRegion shim http://dev.w3.org/html5/webvtt/#vttregion-interface
  function VTTRegion() {
    var _width = 100;
    var _lines = 3;
    var _regionAnchorX = 0;
    var _regionAnchorY = 100;
    var _viewportAnchorX = 0;
    var _viewportAnchorY = 100;
    var _scroll = "";

    Object.defineProperties(this, {
      "width": {
        enumerable: true,
        get: function() {
          return _width;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("Width must be between 0 and 100.");
          }
          _width = value;
        }
      },
      "lines": {
        enumerable: true,
        get: function() {
          return _lines;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("Lines must be set to a number.");
          }
          _lines = value;
        }
      },
      "regionAnchorY": {
        enumerable: true,
        get: function() {
          return _regionAnchorY;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("RegionAnchorX must be between 0 and 100.");
          }
          _regionAnchorY = value;
        }
      },
      "regionAnchorX": {
        enumerable: true,
        get: function() {
          return _regionAnchorX;
        },
        set: function(value) {
          if(!isValidPercentValue(value)) {
            throw new Error("RegionAnchorY must be between 0 and 100.");
          }
          _regionAnchorX = value;
        }
      },
      "viewportAnchorY": {
        enumerable: true,
        get: function() {
          return _viewportAnchorY;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("ViewportAnchorY must be between 0 and 100.");
          }
          _viewportAnchorY = value;
        }
      },
      "viewportAnchorX": {
        enumerable: true,
        get: function() {
          return _viewportAnchorX;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("ViewportAnchorX must be between 0 and 100.");
          }
          _viewportAnchorX = value;
        }
      },
      "scroll": {
        enumerable: true,
        get: function() {
          return _scroll;
        },
        set: function(value) {
          var setting = findScrollSetting(value);
          // Have to check for false as an empty string is a legal value.
          if (setting === false) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _scroll = setting;
        }
      }
    });
  }

  root.VTTRegion = root.VTTRegion || VTTRegion;
}(this));

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

(function(global) {
  function makeColorSet(color, opacity) {
    if(opacity === undefined) {
      opacity = 1;
    }
    return "rgba(" + [parseInt(color.substring(0, 2), 16),
                      parseInt(color.substring(2, 4), 16),
                      parseInt(color.substring(4, 6), 16),
                      opacity].join(",") + ")";
  }

  var WebVTTPrefs = ['webvtt.font.color', 'webvtt.font.opacity', 'webvtt.font.scale',
                     'webvtt.bg.color', 'webvtt.bg.opacity',
                     'webvtt.edge.color', 'webvtt.edge.type'];

  var fontScale = 1;

  function observe(subject, topic, data) {
    switch (data) {
      case "webvtt.font.color":
      case "webvtt.font.opacity":
        var fontColor = Services.prefs.getCharPref("webvtt.font.color");
        var fontOpacity = Services.prefs.getIntPref("webvtt.font.opacity") / 100;
        WebVTTSet.fontSet = makeColorSet(fontColor, fontOpacity);
        break;
      case "webvtt.font.scale":
        fontScale = Services.prefs.getIntPref("webvtt.font.scale") / 100;
        break;
      case "webvtt.bg.color":
      case "webvtt.bg.opacity":
        var backgroundColor = Services.prefs.getCharPref("webvtt.bg.color");
        var backgroundOpacity = Services.prefs.getIntPref("webvtt.bg.opacity") / 100;
        WebVTTSet.backgroundSet = makeColorSet(backgroundColor, backgroundOpacity);
        break;
      case "webvtt.edge.color":
      case "webvtt.edge.type":
        var edgeTypeList = ["", "0px 0px ", "4px 4px 4px ", "-2px -2px ", "2px 2px "];
        var edgeType = Services.prefs.getIntPref("webvtt.edge.type");
        var edgeColor = Services.prefs.getCharPref("webvtt.edge.color");
        WebVTTSet.edgeSet = edgeTypeList[edgeType] + makeColorSet(edgeColor);
        break;
    }
  }

  if(typeof Services !== "undefined") {
    var WebVTTSet = {};
    WebVTTPrefs.forEach(function (pref) {
      observe(undefined, undefined, pref);
      Services.prefs.addObserver(pref, observe, false);
    });
  }

  var _objCreate = Object.create || (function() {
    function F() {}
    return function(o) {
      if (arguments.length !== 1) {
        throw new Error('Object.create shim only accepts one parameter.');
      }
      F.prototype = o;
      return new F();
    };
  })();

  // Creates a new ParserError object from an errorData object. The errorData
  // object should have default code and message properties. The default message
  // property can be overriden by passing in a message parameter.
  // See ParsingError.Errors below for acceptable errors.
  function ParsingError(errorData, message) {
    this.name = "ParsingError";
    this.code = errorData.code;
    this.message = message || errorData.message;
  }
  ParsingError.prototype = _objCreate(Error.prototype);
  ParsingError.prototype.constructor = ParsingError;

  // ParsingError metadata for acceptable ParsingErrors.
  ParsingError.Errors = {
    BadSignature: {
      code: 0,
      message: "Malformed WebVTT signature."
    },
    BadTimeStamp: {
      code: 1,
      message: "Malformed time stamp."
    }
  };

  // Try to parse input as a time stamp.
  function parseTimeStamp(input) {

    function computeSeconds(h, m, s, f) {
      return (h | 0) * 3600 + (m | 0) * 60 + (s | 0) + (f | 0) / 1000;
    }

    var m = input.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
    if (!m) {
      return null;
    }

    if (m[3]) {
      // Timestamp takes the form of [hours]:[minutes]:[seconds].[milliseconds]
      return computeSeconds(m[1], m[2], m[3].replace(":", ""), m[4]);
    } else if (m[1] > 59) {
      // Timestamp takes the form of [hours]:[minutes].[milliseconds]
      // First position is hours as it's over 59.
      return computeSeconds(m[1], m[2], 0,  m[4]);
    } else {
      // Timestamp takes the form of [minutes]:[seconds].[milliseconds]
      return computeSeconds(0, m[1], m[2], m[4]);
    }
  }

  // A settings object holds key/value pairs and will ignore anything but the first
  // assignment to a specific key.
  function Settings() {
    this.values = _objCreate(null);
  }

  Settings.prototype = {
    // Only accept the first assignment to any key.
    set: function(k, v) {
      if (!this.get(k) && v !== "") {
        this.values[k] = v;
      }
    },
    // Return the value for a key, or a default value.
    // If 'defaultKey' is passed then 'dflt' is assumed to be an object with
    // a number of possible default values as properties where 'defaultKey' is
    // the key of the property that will be chosen; otherwise it's assumed to be
    // a single value.
    get: function(k, dflt, defaultKey) {
      if (defaultKey) {
        return this.has(k) ? this.values[k] : dflt[defaultKey];
      }
      return this.has(k) ? this.values[k] : dflt;
    },
    // Check whether we have a value for a key.
    has: function(k) {
      return k in this.values;
    },
    // Accept a setting if its one of the given alternatives.
    alt: function(k, v, a) {
      for (var n = 0; n < a.length; ++n) {
        if (v === a[n]) {
          this.set(k, v);
          break;
        }
      }
    },
    // Accept a setting if its a valid (signed) integer.
    integer: function(k, v) {
      if (/^-?\d+$/.test(v)) { // integer
        this.set(k, parseInt(v, 10));
      }
    },
    // Accept a setting if its a valid percentage.
    percent: function(k, v) {
      var m;
      if ((m = v.match(/^([\d]{1,3})(\.[\d]*)?%$/))) {
        v = parseFloat(v);
        if (v >= 0 && v <= 100) {
          this.set(k, v);
          return true;
        }
      }
      return false;
    }
  };

  // Helper function to parse input into groups separated by 'groupDelim', and
  // interprete each group as a key/value pair separated by 'keyValueDelim'.
  function parseOptions(input, callback, keyValueDelim, groupDelim) {
    var groups = groupDelim ? input.split(groupDelim) : [input];
    for (var i in groups) {
      if (typeof groups[i] !== "string") {
        continue;
      }
      var kv = groups[i].split(keyValueDelim);
      if (kv.length !== 2) {
        continue;
      }
      var k = kv[0];
      var v = kv[1];
      callback(k, v);
    }
  }

  function parseCue(input, cue, regionList) {
    // Remember the original input if we need to throw an error.
    var oInput = input;
    // 4.1 WebVTT timestamp
    function consumeTimeStamp() {
      var ts = parseTimeStamp(input);
      if (ts === null) {
        throw new ParsingError(ParsingError.Errors.BadTimeStamp,
                              "Malformed timestamp: " + oInput);
      }
      // Remove time stamp from input.
      input = input.replace(/^[^\sa-zA-Z-]+/, "");
      return ts;
    }

    // 4.4.2 WebVTT cue settings
    function consumeCueSettings(input, cue) {
      var settings = new Settings();

      parseOptions(input, function (k, v) {
        switch (k) {
        case "region":
          // Find the last region we parsed with the same region id.
          for (var i = regionList.length - 1; i >= 0; i--) {
            if (regionList[i].id === v) {
              settings.set(k, regionList[i].region);
              break;
            }
          }
          break;
        case "vertical":
          settings.alt(k, v, ["rl", "lr"]);
          break;
        case "line":
          var vals = v.split(","),
              vals0 = vals[0];
          settings.integer(k, vals0);
          settings.percent(k, vals0) ? settings.set("snapToLines", false) : null;
          settings.alt(k, vals0, ["auto"]);
          if (vals.length === 2) {
            settings.alt("lineAlign", vals[1], ["start", "middle", "end"]);
          }
          break;
        case "position":
          vals = v.split(",");
          settings.percent(k, vals[0]);
          if (vals.length === 2) {
            settings.alt("positionAlign", vals[1], ["start", "middle", "end"]);
          }
          break;
        case "size":
          settings.percent(k, v);
          break;
        case "align":
          settings.alt(k, v, ["start", "middle", "end", "left", "right"]);
          break;
        }
      }, /:/, /\s/);

      // Apply default values for any missing fields.
      cue.region = settings.get("region", null);
      cue.vertical = settings.get("vertical", "");
      cue.line = settings.get("line", "auto");
      cue.lineAlign = settings.get("lineAlign", "start");
      cue.snapToLines = settings.get("snapToLines", true);
      cue.size = settings.get("size", 100);
      cue.align = settings.get("align", "middle");
      cue.position = settings.get("position", "auto");
      cue.positionAlign = settings.get("positionAlign", {
        start: "start",
        left: "start",
        middle: "middle",
        end: "end",
        right: "end"
      }, cue.align);
    }

    function skipWhitespace() {
      input = input.replace(/^\s+/, "");
    }

    // 4.1 WebVTT cue timings.
    skipWhitespace();
    cue.startTime = consumeTimeStamp();   // (1) collect cue start time
    skipWhitespace();
    if (input.substr(0, 3) !== "-->") {     // (3) next characters must match "-->"
      throw new ParsingError(ParsingError.Errors.BadTimeStamp,
                             "Malformed time stamp (time stamps must be separated by '-->'): " +
                             oInput);
    }
    input = input.substr(3);
    skipWhitespace();
    cue.endTime = consumeTimeStamp();     // (5) collect cue end time

    // 4.1 WebVTT cue settings list.
    skipWhitespace();
    consumeCueSettings(input, cue);
  }

  var ESCAPE = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&lrm;": "\u200e",
    "&rlm;": "\u200f",
    "&nbsp;": "\u00a0"
  };

  var TAG_NAME = {
    c: "span",
    i: "i",
    b: "b",
    u: "u",
    ruby: "ruby",
    rt: "rt",
    v: "span",
    lang: "span"
  };

  var TAG_ANNOTATION = {
    v: "title",
    lang: "lang"
  };

  var NEEDS_PARENT = {
    rt: "ruby"
  };

  // Parse content into a document fragment.
  function parseContent(window, input) {
    function nextToken() {
      // Check for end-of-string.
      if (!input) {
        return null;
      }

      // Consume 'n' characters from the input.
      function consume(result) {
        input = input.substr(result.length);
        return result;
      }

      var m = input.match(/^([^<]*)(<[^>]+>?)?/);
      // If there is some text before the next tag, return it, otherwise return
      // the tag.
      return consume(m[1] ? m[1] : m[2]);
    }

    // Unescape a string 's'.
    function unescape1(e) {
      return ESCAPE[e];
    }
    function unescape(s) {
      while ((m = s.match(/&(amp|lt|gt|lrm|rlm|nbsp);/))) {
        s = s.replace(m[0], unescape1);
      }
      return s;
    }

    function shouldAdd(current, element) {
      return !NEEDS_PARENT[element.localName] ||
             NEEDS_PARENT[element.localName] === current.localName;
    }

    // Create an element for this tag.
    function createElement(type, annotation) {
      var tagName = TAG_NAME[type];
      if (!tagName) {
        return null;
      }
      var element = window.document.createElement(tagName);
      element.localName = tagName;
      var name = TAG_ANNOTATION[type];
      if (name && annotation) {
        element[name] = annotation.trim();
      }
      return element;
    }

    var rootDiv = window.document.createElement("div"),
        current = rootDiv,
        t,
        tagStack = [];

    while ((t = nextToken()) !== null) {
      if (t[0] === '<') {
        if (t[1] === "/") {
          // If the closing tag matches, move back up to the parent node.
          if (tagStack.length &&
              tagStack[tagStack.length - 1] === t.substr(2).replace(">", "")) {
            tagStack.pop();
            current = current.parentNode;
          }
          // Otherwise just ignore the end tag.
          continue;
        }
        var ts = parseTimeStamp(t.substr(1, t.length - 2));
        var node;
        if (ts) {
          // Timestamps are lead nodes as well.
          node = window.document.createProcessingInstruction("timestamp", ts);
          current.appendChild(node);
          continue;
        }
        var m = t.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
        // If we can't parse the tag, skip to the next tag.
        if (!m) {
          continue;
        }
        // Try to construct an element, and ignore the tag if we couldn't.
        node = createElement(m[1], m[3]);
        if (!node) {
          continue;
        }
        // Determine if the tag should be added based on the context of where it
        // is placed in the cuetext.
        if (!shouldAdd(current, node)) {
          continue;
        }
        // Set the class list (as a list of classes, separated by space).
        if (m[2]) {
          node.className = m[2].substr(1).replace('.', ' ');
        }
        // Append the node to the current node, and enter the scope of the new
        // node.
        tagStack.push(m[1]);
        current.appendChild(node);
        current = node;
        continue;
      }

      // Text nodes are leaf nodes.
      current.appendChild(window.document.createTextNode(unescape(t)));
    }

    return rootDiv;
  }

  // This is a list of all the Unicode characters that have a strong
  // right-to-left category. What this means is that these characters are
  // written right-to-left for sure. It was generated by pulling all the strong
  // right-to-left characters out of the Unicode data table. That table can
  // found at: http://www.unicode.org/Public/UNIDATA/UnicodeData.txt
  var strongRTLChars = [0x05BE, 0x05C0, 0x05C3, 0x05C6, 0x05D0, 0x05D1,
      0x05D2, 0x05D3, 0x05D4, 0x05D5, 0x05D6, 0x05D7, 0x05D8, 0x05D9, 0x05DA,
      0x05DB, 0x05DC, 0x05DD, 0x05DE, 0x05DF, 0x05E0, 0x05E1, 0x05E2, 0x05E3,
      0x05E4, 0x05E5, 0x05E6, 0x05E7, 0x05E8, 0x05E9, 0x05EA, 0x05F0, 0x05F1,
      0x05F2, 0x05F3, 0x05F4, 0x0608, 0x060B, 0x060D, 0x061B, 0x061E, 0x061F,
      0x0620, 0x0621, 0x0622, 0x0623, 0x0624, 0x0625, 0x0626, 0x0627, 0x0628,
      0x0629, 0x062A, 0x062B, 0x062C, 0x062D, 0x062E, 0x062F, 0x0630, 0x0631,
      0x0632, 0x0633, 0x0634, 0x0635, 0x0636, 0x0637, 0x0638, 0x0639, 0x063A,
      0x063B, 0x063C, 0x063D, 0x063E, 0x063F, 0x0640, 0x0641, 0x0642, 0x0643,
      0x0644, 0x0645, 0x0646, 0x0647, 0x0648, 0x0649, 0x064A, 0x066D, 0x066E,
      0x066F, 0x0671, 0x0672, 0x0673, 0x0674, 0x0675, 0x0676, 0x0677, 0x0678,
      0x0679, 0x067A, 0x067B, 0x067C, 0x067D, 0x067E, 0x067F, 0x0680, 0x0681,
      0x0682, 0x0683, 0x0684, 0x0685, 0x0686, 0x0687, 0x0688, 0x0689, 0x068A,
      0x068B, 0x068C, 0x068D, 0x068E, 0x068F, 0x0690, 0x0691, 0x0692, 0x0693,
      0x0694, 0x0695, 0x0696, 0x0697, 0x0698, 0x0699, 0x069A, 0x069B, 0x069C,
      0x069D, 0x069E, 0x069F, 0x06A0, 0x06A1, 0x06A2, 0x06A3, 0x06A4, 0x06A5,
      0x06A6, 0x06A7, 0x06A8, 0x06A9, 0x06AA, 0x06AB, 0x06AC, 0x06AD, 0x06AE,
      0x06AF, 0x06B0, 0x06B1, 0x06B2, 0x06B3, 0x06B4, 0x06B5, 0x06B6, 0x06B7,
      0x06B8, 0x06B9, 0x06BA, 0x06BB, 0x06BC, 0x06BD, 0x06BE, 0x06BF, 0x06C0,
      0x06C1, 0x06C2, 0x06C3, 0x06C4, 0x06C5, 0x06C6, 0x06C7, 0x06C8, 0x06C9,
      0x06CA, 0x06CB, 0x06CC, 0x06CD, 0x06CE, 0x06CF, 0x06D0, 0x06D1, 0x06D2,
      0x06D3, 0x06D4, 0x06D5, 0x06E5, 0x06E6, 0x06EE, 0x06EF, 0x06FA, 0x06FB,
      0x06FC, 0x06FD, 0x06FE, 0x06FF, 0x0700, 0x0701, 0x0702, 0x0703, 0x0704,
      0x0705, 0x0706, 0x0707, 0x0708, 0x0709, 0x070A, 0x070B, 0x070C, 0x070D,
      0x070F, 0x0710, 0x0712, 0x0713, 0x0714, 0x0715, 0x0716, 0x0717, 0x0718,
      0x0719, 0x071A, 0x071B, 0x071C, 0x071D, 0x071E, 0x071F, 0x0720, 0x0721,
      0x0722, 0x0723, 0x0724, 0x0725, 0x0726, 0x0727, 0x0728, 0x0729, 0x072A,
      0x072B, 0x072C, 0x072D, 0x072E, 0x072F, 0x074D, 0x074E, 0x074F, 0x0750,
      0x0751, 0x0752, 0x0753, 0x0754, 0x0755, 0x0756, 0x0757, 0x0758, 0x0759,
      0x075A, 0x075B, 0x075C, 0x075D, 0x075E, 0x075F, 0x0760, 0x0761, 0x0762,
      0x0763, 0x0764, 0x0765, 0x0766, 0x0767, 0x0768, 0x0769, 0x076A, 0x076B,
      0x076C, 0x076D, 0x076E, 0x076F, 0x0770, 0x0771, 0x0772, 0x0773, 0x0774,
      0x0775, 0x0776, 0x0777, 0x0778, 0x0779, 0x077A, 0x077B, 0x077C, 0x077D,
      0x077E, 0x077F, 0x0780, 0x0781, 0x0782, 0x0783, 0x0784, 0x0785, 0x0786,
      0x0787, 0x0788, 0x0789, 0x078A, 0x078B, 0x078C, 0x078D, 0x078E, 0x078F,
      0x0790, 0x0791, 0x0792, 0x0793, 0x0794, 0x0795, 0x0796, 0x0797, 0x0798,
      0x0799, 0x079A, 0x079B, 0x079C, 0x079D, 0x079E, 0x079F, 0x07A0, 0x07A1,
      0x07A2, 0x07A3, 0x07A4, 0x07A5, 0x07B1, 0x07C0, 0x07C1, 0x07C2, 0x07C3,
      0x07C4, 0x07C5, 0x07C6, 0x07C7, 0x07C8, 0x07C9, 0x07CA, 0x07CB, 0x07CC,
      0x07CD, 0x07CE, 0x07CF, 0x07D0, 0x07D1, 0x07D2, 0x07D3, 0x07D4, 0x07D5,
      0x07D6, 0x07D7, 0x07D8, 0x07D9, 0x07DA, 0x07DB, 0x07DC, 0x07DD, 0x07DE,
      0x07DF, 0x07E0, 0x07E1, 0x07E2, 0x07E3, 0x07E4, 0x07E5, 0x07E6, 0x07E7,
      0x07E8, 0x07E9, 0x07EA, 0x07F4, 0x07F5, 0x07FA, 0x0800, 0x0801, 0x0802,
      0x0803, 0x0804, 0x0805, 0x0806, 0x0807, 0x0808, 0x0809, 0x080A, 0x080B,
      0x080C, 0x080D, 0x080E, 0x080F, 0x0810, 0x0811, 0x0812, 0x0813, 0x0814,
      0x0815, 0x081A, 0x0824, 0x0828, 0x0830, 0x0831, 0x0832, 0x0833, 0x0834,
      0x0835, 0x0836, 0x0837, 0x0838, 0x0839, 0x083A, 0x083B, 0x083C, 0x083D,
      0x083E, 0x0840, 0x0841, 0x0842, 0x0843, 0x0844, 0x0845, 0x0846, 0x0847,
      0x0848, 0x0849, 0x084A, 0x084B, 0x084C, 0x084D, 0x084E, 0x084F, 0x0850,
      0x0851, 0x0852, 0x0853, 0x0854, 0x0855, 0x0856, 0x0857, 0x0858, 0x085E,
      0x08A0, 0x08A2, 0x08A3, 0x08A4, 0x08A5, 0x08A6, 0x08A7, 0x08A8, 0x08A9,
      0x08AA, 0x08AB, 0x08AC, 0x200F, 0xFB1D, 0xFB1F, 0xFB20, 0xFB21, 0xFB22,
      0xFB23, 0xFB24, 0xFB25, 0xFB26, 0xFB27, 0xFB28, 0xFB2A, 0xFB2B, 0xFB2C,
      0xFB2D, 0xFB2E, 0xFB2F, 0xFB30, 0xFB31, 0xFB32, 0xFB33, 0xFB34, 0xFB35,
      0xFB36, 0xFB38, 0xFB39, 0xFB3A, 0xFB3B, 0xFB3C, 0xFB3E, 0xFB40, 0xFB41,
      0xFB43, 0xFB44, 0xFB46, 0xFB47, 0xFB48, 0xFB49, 0xFB4A, 0xFB4B, 0xFB4C,
      0xFB4D, 0xFB4E, 0xFB4F, 0xFB50, 0xFB51, 0xFB52, 0xFB53, 0xFB54, 0xFB55,
      0xFB56, 0xFB57, 0xFB58, 0xFB59, 0xFB5A, 0xFB5B, 0xFB5C, 0xFB5D, 0xFB5E,
      0xFB5F, 0xFB60, 0xFB61, 0xFB62, 0xFB63, 0xFB64, 0xFB65, 0xFB66, 0xFB67,
      0xFB68, 0xFB69, 0xFB6A, 0xFB6B, 0xFB6C, 0xFB6D, 0xFB6E, 0xFB6F, 0xFB70,
      0xFB71, 0xFB72, 0xFB73, 0xFB74, 0xFB75, 0xFB76, 0xFB77, 0xFB78, 0xFB79,
      0xFB7A, 0xFB7B, 0xFB7C, 0xFB7D, 0xFB7E, 0xFB7F, 0xFB80, 0xFB81, 0xFB82,
      0xFB83, 0xFB84, 0xFB85, 0xFB86, 0xFB87, 0xFB88, 0xFB89, 0xFB8A, 0xFB8B,
      0xFB8C, 0xFB8D, 0xFB8E, 0xFB8F, 0xFB90, 0xFB91, 0xFB92, 0xFB93, 0xFB94,
      0xFB95, 0xFB96, 0xFB97, 0xFB98, 0xFB99, 0xFB9A, 0xFB9B, 0xFB9C, 0xFB9D,
      0xFB9E, 0xFB9F, 0xFBA0, 0xFBA1, 0xFBA2, 0xFBA3, 0xFBA4, 0xFBA5, 0xFBA6,
      0xFBA7, 0xFBA8, 0xFBA9, 0xFBAA, 0xFBAB, 0xFBAC, 0xFBAD, 0xFBAE, 0xFBAF,
      0xFBB0, 0xFBB1, 0xFBB2, 0xFBB3, 0xFBB4, 0xFBB5, 0xFBB6, 0xFBB7, 0xFBB8,
      0xFBB9, 0xFBBA, 0xFBBB, 0xFBBC, 0xFBBD, 0xFBBE, 0xFBBF, 0xFBC0, 0xFBC1,
      0xFBD3, 0xFBD4, 0xFBD5, 0xFBD6, 0xFBD7, 0xFBD8, 0xFBD9, 0xFBDA, 0xFBDB,
      0xFBDC, 0xFBDD, 0xFBDE, 0xFBDF, 0xFBE0, 0xFBE1, 0xFBE2, 0xFBE3, 0xFBE4,
      0xFBE5, 0xFBE6, 0xFBE7, 0xFBE8, 0xFBE9, 0xFBEA, 0xFBEB, 0xFBEC, 0xFBED,
      0xFBEE, 0xFBEF, 0xFBF0, 0xFBF1, 0xFBF2, 0xFBF3, 0xFBF4, 0xFBF5, 0xFBF6,
      0xFBF7, 0xFBF8, 0xFBF9, 0xFBFA, 0xFBFB, 0xFBFC, 0xFBFD, 0xFBFE, 0xFBFF,
      0xFC00, 0xFC01, 0xFC02, 0xFC03, 0xFC04, 0xFC05, 0xFC06, 0xFC07, 0xFC08,
      0xFC09, 0xFC0A, 0xFC0B, 0xFC0C, 0xFC0D, 0xFC0E, 0xFC0F, 0xFC10, 0xFC11,
      0xFC12, 0xFC13, 0xFC14, 0xFC15, 0xFC16, 0xFC17, 0xFC18, 0xFC19, 0xFC1A,
      0xFC1B, 0xFC1C, 0xFC1D, 0xFC1E, 0xFC1F, 0xFC20, 0xFC21, 0xFC22, 0xFC23,
      0xFC24, 0xFC25, 0xFC26, 0xFC27, 0xFC28, 0xFC29, 0xFC2A, 0xFC2B, 0xFC2C,
      0xFC2D, 0xFC2E, 0xFC2F, 0xFC30, 0xFC31, 0xFC32, 0xFC33, 0xFC34, 0xFC35,
      0xFC36, 0xFC37, 0xFC38, 0xFC39, 0xFC3A, 0xFC3B, 0xFC3C, 0xFC3D, 0xFC3E,
      0xFC3F, 0xFC40, 0xFC41, 0xFC42, 0xFC43, 0xFC44, 0xFC45, 0xFC46, 0xFC47,
      0xFC48, 0xFC49, 0xFC4A, 0xFC4B, 0xFC4C, 0xFC4D, 0xFC4E, 0xFC4F, 0xFC50,
      0xFC51, 0xFC52, 0xFC53, 0xFC54, 0xFC55, 0xFC56, 0xFC57, 0xFC58, 0xFC59,
      0xFC5A, 0xFC5B, 0xFC5C, 0xFC5D, 0xFC5E, 0xFC5F, 0xFC60, 0xFC61, 0xFC62,
      0xFC63, 0xFC64, 0xFC65, 0xFC66, 0xFC67, 0xFC68, 0xFC69, 0xFC6A, 0xFC6B,
      0xFC6C, 0xFC6D, 0xFC6E, 0xFC6F, 0xFC70, 0xFC71, 0xFC72, 0xFC73, 0xFC74,
      0xFC75, 0xFC76, 0xFC77, 0xFC78, 0xFC79, 0xFC7A, 0xFC7B, 0xFC7C, 0xFC7D,
      0xFC7E, 0xFC7F, 0xFC80, 0xFC81, 0xFC82, 0xFC83, 0xFC84, 0xFC85, 0xFC86,
      0xFC87, 0xFC88, 0xFC89, 0xFC8A, 0xFC8B, 0xFC8C, 0xFC8D, 0xFC8E, 0xFC8F,
      0xFC90, 0xFC91, 0xFC92, 0xFC93, 0xFC94, 0xFC95, 0xFC96, 0xFC97, 0xFC98,
      0xFC99, 0xFC9A, 0xFC9B, 0xFC9C, 0xFC9D, 0xFC9E, 0xFC9F, 0xFCA0, 0xFCA1,
      0xFCA2, 0xFCA3, 0xFCA4, 0xFCA5, 0xFCA6, 0xFCA7, 0xFCA8, 0xFCA9, 0xFCAA,
      0xFCAB, 0xFCAC, 0xFCAD, 0xFCAE, 0xFCAF, 0xFCB0, 0xFCB1, 0xFCB2, 0xFCB3,
      0xFCB4, 0xFCB5, 0xFCB6, 0xFCB7, 0xFCB8, 0xFCB9, 0xFCBA, 0xFCBB, 0xFCBC,
      0xFCBD, 0xFCBE, 0xFCBF, 0xFCC0, 0xFCC1, 0xFCC2, 0xFCC3, 0xFCC4, 0xFCC5,
      0xFCC6, 0xFCC7, 0xFCC8, 0xFCC9, 0xFCCA, 0xFCCB, 0xFCCC, 0xFCCD, 0xFCCE,
      0xFCCF, 0xFCD0, 0xFCD1, 0xFCD2, 0xFCD3, 0xFCD4, 0xFCD5, 0xFCD6, 0xFCD7,
      0xFCD8, 0xFCD9, 0xFCDA, 0xFCDB, 0xFCDC, 0xFCDD, 0xFCDE, 0xFCDF, 0xFCE0,
      0xFCE1, 0xFCE2, 0xFCE3, 0xFCE4, 0xFCE5, 0xFCE6, 0xFCE7, 0xFCE8, 0xFCE9,
      0xFCEA, 0xFCEB, 0xFCEC, 0xFCED, 0xFCEE, 0xFCEF, 0xFCF0, 0xFCF1, 0xFCF2,
      0xFCF3, 0xFCF4, 0xFCF5, 0xFCF6, 0xFCF7, 0xFCF8, 0xFCF9, 0xFCFA, 0xFCFB,
      0xFCFC, 0xFCFD, 0xFCFE, 0xFCFF, 0xFD00, 0xFD01, 0xFD02, 0xFD03, 0xFD04,
      0xFD05, 0xFD06, 0xFD07, 0xFD08, 0xFD09, 0xFD0A, 0xFD0B, 0xFD0C, 0xFD0D,
      0xFD0E, 0xFD0F, 0xFD10, 0xFD11, 0xFD12, 0xFD13, 0xFD14, 0xFD15, 0xFD16,
      0xFD17, 0xFD18, 0xFD19, 0xFD1A, 0xFD1B, 0xFD1C, 0xFD1D, 0xFD1E, 0xFD1F,
      0xFD20, 0xFD21, 0xFD22, 0xFD23, 0xFD24, 0xFD25, 0xFD26, 0xFD27, 0xFD28,
      0xFD29, 0xFD2A, 0xFD2B, 0xFD2C, 0xFD2D, 0xFD2E, 0xFD2F, 0xFD30, 0xFD31,
      0xFD32, 0xFD33, 0xFD34, 0xFD35, 0xFD36, 0xFD37, 0xFD38, 0xFD39, 0xFD3A,
      0xFD3B, 0xFD3C, 0xFD3D, 0xFD50, 0xFD51, 0xFD52, 0xFD53, 0xFD54, 0xFD55,
      0xFD56, 0xFD57, 0xFD58, 0xFD59, 0xFD5A, 0xFD5B, 0xFD5C, 0xFD5D, 0xFD5E,
      0xFD5F, 0xFD60, 0xFD61, 0xFD62, 0xFD63, 0xFD64, 0xFD65, 0xFD66, 0xFD67,
      0xFD68, 0xFD69, 0xFD6A, 0xFD6B, 0xFD6C, 0xFD6D, 0xFD6E, 0xFD6F, 0xFD70,
      0xFD71, 0xFD72, 0xFD73, 0xFD74, 0xFD75, 0xFD76, 0xFD77, 0xFD78, 0xFD79,
      0xFD7A, 0xFD7B, 0xFD7C, 0xFD7D, 0xFD7E, 0xFD7F, 0xFD80, 0xFD81, 0xFD82,
      0xFD83, 0xFD84, 0xFD85, 0xFD86, 0xFD87, 0xFD88, 0xFD89, 0xFD8A, 0xFD8B,
      0xFD8C, 0xFD8D, 0xFD8E, 0xFD8F, 0xFD92, 0xFD93, 0xFD94, 0xFD95, 0xFD96,
      0xFD97, 0xFD98, 0xFD99, 0xFD9A, 0xFD9B, 0xFD9C, 0xFD9D, 0xFD9E, 0xFD9F,
      0xFDA0, 0xFDA1, 0xFDA2, 0xFDA3, 0xFDA4, 0xFDA5, 0xFDA6, 0xFDA7, 0xFDA8,
      0xFDA9, 0xFDAA, 0xFDAB, 0xFDAC, 0xFDAD, 0xFDAE, 0xFDAF, 0xFDB0, 0xFDB1,
      0xFDB2, 0xFDB3, 0xFDB4, 0xFDB5, 0xFDB6, 0xFDB7, 0xFDB8, 0xFDB9, 0xFDBA,
      0xFDBB, 0xFDBC, 0xFDBD, 0xFDBE, 0xFDBF, 0xFDC0, 0xFDC1, 0xFDC2, 0xFDC3,
      0xFDC4, 0xFDC5, 0xFDC6, 0xFDC7, 0xFDF0, 0xFDF1, 0xFDF2, 0xFDF3, 0xFDF4,
      0xFDF5, 0xFDF6, 0xFDF7, 0xFDF8, 0xFDF9, 0xFDFA, 0xFDFB, 0xFDFC, 0xFE70,
      0xFE71, 0xFE72, 0xFE73, 0xFE74, 0xFE76, 0xFE77, 0xFE78, 0xFE79, 0xFE7A,
      0xFE7B, 0xFE7C, 0xFE7D, 0xFE7E, 0xFE7F, 0xFE80, 0xFE81, 0xFE82, 0xFE83,
      0xFE84, 0xFE85, 0xFE86, 0xFE87, 0xFE88, 0xFE89, 0xFE8A, 0xFE8B, 0xFE8C,
      0xFE8D, 0xFE8E, 0xFE8F, 0xFE90, 0xFE91, 0xFE92, 0xFE93, 0xFE94, 0xFE95,
      0xFE96, 0xFE97, 0xFE98, 0xFE99, 0xFE9A, 0xFE9B, 0xFE9C, 0xFE9D, 0xFE9E,
      0xFE9F, 0xFEA0, 0xFEA1, 0xFEA2, 0xFEA3, 0xFEA4, 0xFEA5, 0xFEA6, 0xFEA7,
      0xFEA8, 0xFEA9, 0xFEAA, 0xFEAB, 0xFEAC, 0xFEAD, 0xFEAE, 0xFEAF, 0xFEB0,
      0xFEB1, 0xFEB2, 0xFEB3, 0xFEB4, 0xFEB5, 0xFEB6, 0xFEB7, 0xFEB8, 0xFEB9,
      0xFEBA, 0xFEBB, 0xFEBC, 0xFEBD, 0xFEBE, 0xFEBF, 0xFEC0, 0xFEC1, 0xFEC2,
      0xFEC3, 0xFEC4, 0xFEC5, 0xFEC6, 0xFEC7, 0xFEC8, 0xFEC9, 0xFECA, 0xFECB,
      0xFECC, 0xFECD, 0xFECE, 0xFECF, 0xFED0, 0xFED1, 0xFED2, 0xFED3, 0xFED4,
      0xFED5, 0xFED6, 0xFED7, 0xFED8, 0xFED9, 0xFEDA, 0xFEDB, 0xFEDC, 0xFEDD,
      0xFEDE, 0xFEDF, 0xFEE0, 0xFEE1, 0xFEE2, 0xFEE3, 0xFEE4, 0xFEE5, 0xFEE6,
      0xFEE7, 0xFEE8, 0xFEE9, 0xFEEA, 0xFEEB, 0xFEEC, 0xFEED, 0xFEEE, 0xFEEF,
      0xFEF0, 0xFEF1, 0xFEF2, 0xFEF3, 0xFEF4, 0xFEF5, 0xFEF6, 0xFEF7, 0xFEF8,
      0xFEF9, 0xFEFA, 0xFEFB, 0xFEFC, 0x10800, 0x10801, 0x10802, 0x10803,
      0x10804, 0x10805, 0x10808, 0x1080A, 0x1080B, 0x1080C, 0x1080D, 0x1080E,
      0x1080F, 0x10810, 0x10811, 0x10812, 0x10813, 0x10814, 0x10815, 0x10816,
      0x10817, 0x10818, 0x10819, 0x1081A, 0x1081B, 0x1081C, 0x1081D, 0x1081E,
      0x1081F, 0x10820, 0x10821, 0x10822, 0x10823, 0x10824, 0x10825, 0x10826,
      0x10827, 0x10828, 0x10829, 0x1082A, 0x1082B, 0x1082C, 0x1082D, 0x1082E,
      0x1082F, 0x10830, 0x10831, 0x10832, 0x10833, 0x10834, 0x10835, 0x10837,
      0x10838, 0x1083C, 0x1083F, 0x10840, 0x10841, 0x10842, 0x10843, 0x10844,
      0x10845, 0x10846, 0x10847, 0x10848, 0x10849, 0x1084A, 0x1084B, 0x1084C,
      0x1084D, 0x1084E, 0x1084F, 0x10850, 0x10851, 0x10852, 0x10853, 0x10854,
      0x10855, 0x10857, 0x10858, 0x10859, 0x1085A, 0x1085B, 0x1085C, 0x1085D,
      0x1085E, 0x1085F, 0x10900, 0x10901, 0x10902, 0x10903, 0x10904, 0x10905,
      0x10906, 0x10907, 0x10908, 0x10909, 0x1090A, 0x1090B, 0x1090C, 0x1090D,
      0x1090E, 0x1090F, 0x10910, 0x10911, 0x10912, 0x10913, 0x10914, 0x10915,
      0x10916, 0x10917, 0x10918, 0x10919, 0x1091A, 0x1091B, 0x10920, 0x10921,
      0x10922, 0x10923, 0x10924, 0x10925, 0x10926, 0x10927, 0x10928, 0x10929,
      0x1092A, 0x1092B, 0x1092C, 0x1092D, 0x1092E, 0x1092F, 0x10930, 0x10931,
      0x10932, 0x10933, 0x10934, 0x10935, 0x10936, 0x10937, 0x10938, 0x10939,
      0x1093F, 0x10980, 0x10981, 0x10982, 0x10983, 0x10984, 0x10985, 0x10986,
      0x10987, 0x10988, 0x10989, 0x1098A, 0x1098B, 0x1098C, 0x1098D, 0x1098E,
      0x1098F, 0x10990, 0x10991, 0x10992, 0x10993, 0x10994, 0x10995, 0x10996,
      0x10997, 0x10998, 0x10999, 0x1099A, 0x1099B, 0x1099C, 0x1099D, 0x1099E,
      0x1099F, 0x109A0, 0x109A1, 0x109A2, 0x109A3, 0x109A4, 0x109A5, 0x109A6,
      0x109A7, 0x109A8, 0x109A9, 0x109AA, 0x109AB, 0x109AC, 0x109AD, 0x109AE,
      0x109AF, 0x109B0, 0x109B1, 0x109B2, 0x109B3, 0x109B4, 0x109B5, 0x109B6,
      0x109B7, 0x109BE, 0x109BF, 0x10A00, 0x10A10, 0x10A11, 0x10A12, 0x10A13,
      0x10A15, 0x10A16, 0x10A17, 0x10A19, 0x10A1A, 0x10A1B, 0x10A1C, 0x10A1D,
      0x10A1E, 0x10A1F, 0x10A20, 0x10A21, 0x10A22, 0x10A23, 0x10A24, 0x10A25,
      0x10A26, 0x10A27, 0x10A28, 0x10A29, 0x10A2A, 0x10A2B, 0x10A2C, 0x10A2D,
      0x10A2E, 0x10A2F, 0x10A30, 0x10A31, 0x10A32, 0x10A33, 0x10A40, 0x10A41,
      0x10A42, 0x10A43, 0x10A44, 0x10A45, 0x10A46, 0x10A47, 0x10A50, 0x10A51,
      0x10A52, 0x10A53, 0x10A54, 0x10A55, 0x10A56, 0x10A57, 0x10A58, 0x10A60,
      0x10A61, 0x10A62, 0x10A63, 0x10A64, 0x10A65, 0x10A66, 0x10A67, 0x10A68,
      0x10A69, 0x10A6A, 0x10A6B, 0x10A6C, 0x10A6D, 0x10A6E, 0x10A6F, 0x10A70,
      0x10A71, 0x10A72, 0x10A73, 0x10A74, 0x10A75, 0x10A76, 0x10A77, 0x10A78,
      0x10A79, 0x10A7A, 0x10A7B, 0x10A7C, 0x10A7D, 0x10A7E, 0x10A7F, 0x10B00,
      0x10B01, 0x10B02, 0x10B03, 0x10B04, 0x10B05, 0x10B06, 0x10B07, 0x10B08,
      0x10B09, 0x10B0A, 0x10B0B, 0x10B0C, 0x10B0D, 0x10B0E, 0x10B0F, 0x10B10,
      0x10B11, 0x10B12, 0x10B13, 0x10B14, 0x10B15, 0x10B16, 0x10B17, 0x10B18,
      0x10B19, 0x10B1A, 0x10B1B, 0x10B1C, 0x10B1D, 0x10B1E, 0x10B1F, 0x10B20,
      0x10B21, 0x10B22, 0x10B23, 0x10B24, 0x10B25, 0x10B26, 0x10B27, 0x10B28,
      0x10B29, 0x10B2A, 0x10B2B, 0x10B2C, 0x10B2D, 0x10B2E, 0x10B2F, 0x10B30,
      0x10B31, 0x10B32, 0x10B33, 0x10B34, 0x10B35, 0x10B40, 0x10B41, 0x10B42,
      0x10B43, 0x10B44, 0x10B45, 0x10B46, 0x10B47, 0x10B48, 0x10B49, 0x10B4A,
      0x10B4B, 0x10B4C, 0x10B4D, 0x10B4E, 0x10B4F, 0x10B50, 0x10B51, 0x10B52,
      0x10B53, 0x10B54, 0x10B55, 0x10B58, 0x10B59, 0x10B5A, 0x10B5B, 0x10B5C,
      0x10B5D, 0x10B5E, 0x10B5F, 0x10B60, 0x10B61, 0x10B62, 0x10B63, 0x10B64,
      0x10B65, 0x10B66, 0x10B67, 0x10B68, 0x10B69, 0x10B6A, 0x10B6B, 0x10B6C,
      0x10B6D, 0x10B6E, 0x10B6F, 0x10B70, 0x10B71, 0x10B72, 0x10B78, 0x10B79,
      0x10B7A, 0x10B7B, 0x10B7C, 0x10B7D, 0x10B7E, 0x10B7F, 0x10C00, 0x10C01,
      0x10C02, 0x10C03, 0x10C04, 0x10C05, 0x10C06, 0x10C07, 0x10C08, 0x10C09,
      0x10C0A, 0x10C0B, 0x10C0C, 0x10C0D, 0x10C0E, 0x10C0F, 0x10C10, 0x10C11,
      0x10C12, 0x10C13, 0x10C14, 0x10C15, 0x10C16, 0x10C17, 0x10C18, 0x10C19,
      0x10C1A, 0x10C1B, 0x10C1C, 0x10C1D, 0x10C1E, 0x10C1F, 0x10C20, 0x10C21,
      0x10C22, 0x10C23, 0x10C24, 0x10C25, 0x10C26, 0x10C27, 0x10C28, 0x10C29,
      0x10C2A, 0x10C2B, 0x10C2C, 0x10C2D, 0x10C2E, 0x10C2F, 0x10C30, 0x10C31,
      0x10C32, 0x10C33, 0x10C34, 0x10C35, 0x10C36, 0x10C37, 0x10C38, 0x10C39,
      0x10C3A, 0x10C3B, 0x10C3C, 0x10C3D, 0x10C3E, 0x10C3F, 0x10C40, 0x10C41,
      0x10C42, 0x10C43, 0x10C44, 0x10C45, 0x10C46, 0x10C47, 0x10C48, 0x1EE00,
      0x1EE01, 0x1EE02, 0x1EE03, 0x1EE05, 0x1EE06, 0x1EE07, 0x1EE08, 0x1EE09,
      0x1EE0A, 0x1EE0B, 0x1EE0C, 0x1EE0D, 0x1EE0E, 0x1EE0F, 0x1EE10, 0x1EE11,
      0x1EE12, 0x1EE13, 0x1EE14, 0x1EE15, 0x1EE16, 0x1EE17, 0x1EE18, 0x1EE19,
      0x1EE1A, 0x1EE1B, 0x1EE1C, 0x1EE1D, 0x1EE1E, 0x1EE1F, 0x1EE21, 0x1EE22,
      0x1EE24, 0x1EE27, 0x1EE29, 0x1EE2A, 0x1EE2B, 0x1EE2C, 0x1EE2D, 0x1EE2E,
      0x1EE2F, 0x1EE30, 0x1EE31, 0x1EE32, 0x1EE34, 0x1EE35, 0x1EE36, 0x1EE37,
      0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE4D, 0x1EE4E,
      0x1EE4F, 0x1EE51, 0x1EE52, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D,
      0x1EE5F, 0x1EE61, 0x1EE62, 0x1EE64, 0x1EE67, 0x1EE68, 0x1EE69, 0x1EE6A,
      0x1EE6C, 0x1EE6D, 0x1EE6E, 0x1EE6F, 0x1EE70, 0x1EE71, 0x1EE72, 0x1EE74,
      0x1EE75, 0x1EE76, 0x1EE77, 0x1EE79, 0x1EE7A, 0x1EE7B, 0x1EE7C, 0x1EE7E,
      0x1EE80, 0x1EE81, 0x1EE82, 0x1EE83, 0x1EE84, 0x1EE85, 0x1EE86, 0x1EE87,
      0x1EE88, 0x1EE89, 0x1EE8B, 0x1EE8C, 0x1EE8D, 0x1EE8E, 0x1EE8F, 0x1EE90,
      0x1EE91, 0x1EE92, 0x1EE93, 0x1EE94, 0x1EE95, 0x1EE96, 0x1EE97, 0x1EE98,
      0x1EE99, 0x1EE9A, 0x1EE9B, 0x1EEA1, 0x1EEA2, 0x1EEA3, 0x1EEA5, 0x1EEA6,
      0x1EEA7, 0x1EEA8, 0x1EEA9, 0x1EEAB, 0x1EEAC, 0x1EEAD, 0x1EEAE, 0x1EEAF,
      0x1EEB0, 0x1EEB1, 0x1EEB2, 0x1EEB3, 0x1EEB4, 0x1EEB5, 0x1EEB6, 0x1EEB7,
      0x1EEB8, 0x1EEB9, 0x1EEBA, 0x1EEBB, 0x10FFFD];

  function determineBidi(cueDiv) {
    var nodeStack = [],
        text = "",
        charCode;

    if (!cueDiv || !cueDiv.childNodes) {
      return "ltr";
    }

    function pushNodes(nodeStack, node) {
      for (var i = node.childNodes.length - 1; i >= 0; i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }

    function nextTextNode(nodeStack) {
      if (!nodeStack || !nodeStack.length) {
        return null;
      }

      var node = nodeStack.pop(),
          text = node.textContent || node.innerText;
      if (text) {
        // TODO: This should match all unicode type B characters (paragraph
        // separator characters). See issue #115.
        var m = text.match(/^.*(\n|\r)/);
        if (m) {
          nodeStack.length = 0;
          return m[0];
        }
        return text;
      }
      if (node.tagName === "ruby") {
        return nextTextNode(nodeStack);
      }
      if (node.childNodes) {
        pushNodes(nodeStack, node);
        return nextTextNode(nodeStack);
      }
    }

    pushNodes(nodeStack, cueDiv);
    while ((text = nextTextNode(nodeStack))) {
      for (var i = 0; i < text.length; i++) {
        charCode = text.charCodeAt(i);
        for (var j = 0; j < strongRTLChars.length; j++) {
          if (strongRTLChars[j] === charCode) {
            return "rtl";
          }
        }
      }
    }
    return "ltr";
  }

  function computeLinePos(cue) {
    if (typeof cue.line === "number" &&
        (cue.snapToLines || (cue.line >= 0 && cue.line <= 100))) {
      return cue.line;
    }
    if (!cue.track || !cue.track.textTrackList ||
        !cue.track.textTrackList.mediaElement) {
      return -1;
    }
    var track = cue.track,
        trackList = track.textTrackList,
        count = 0;
    for (var i = 0; i < trackList.length && trackList[i] !== track; i++) {
      if (trackList[i].mode === "showing") {
        count++;
      }
    }
    return ++count * -1;
  }

  function StyleBox() {
  }

  // Apply styles to a div. If there is no div passed then it defaults to the
  // div on 'this'.
  StyleBox.prototype.applyStyles = function(styles, div) {
    div = div || this.div;
    for (var prop in styles) {
      if (styles.hasOwnProperty(prop)) {
        div.style[prop] = styles[prop];
      }
    }
  };

  StyleBox.prototype.formatStyle = function(val, unit) {
    return val === 0 ? 0 : val + unit;
  };

  // Constructs the computed display state of the cue (a div). Places the div
  // into the overlay which should be a block level element (usually a div).
  function CueStyleBox(window, cue, styleOptions) {
    var isIE8 = (typeof navigator !== "undefined") &&
      (/MSIE\s8\.0/).test(navigator.userAgent);
    var color = "rgba(255, 255, 255, 1)";
    var backgroundColor = "rgba(0, 0, 0, 0.8)";
    var textShadow = "";

    if(typeof WebVTTSet !== "undefined") {
      color = WebVTTSet.fontSet;
      backgroundColor = WebVTTSet.backgroundSet;
      textShadow = WebVTTSet.edgeSet;
    }

    if (isIE8) {
      color = "rgb(255, 255, 255)";
      backgroundColor = "rgb(0, 0, 0)";
    }

    StyleBox.call(this);
    this.cue = cue;

    // Parse our cue's text into a DOM tree rooted at 'cueDiv'. This div will
    // have inline positioning and will function as the cue background box.
    this.cueDiv = parseContent(window, cue.text);
    var styles = {
      color: color,
      backgroundColor: backgroundColor,
      textShadow: textShadow,
      position: "relative",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "inline"
    };

    if (!isIE8) {
      styles.writingMode = cue.vertical === "" ? "horizontal-tb"
                                               : cue.vertical === "lr" ? "vertical-lr"
                                                                       : "vertical-rl";
      styles.unicodeBidi = "plaintext";
    }
    this.applyStyles(styles, this.cueDiv);

    // Create an absolutely positioned div that will be used to position the cue
    // div. Note, all WebVTT cue-setting alignments are equivalent to the CSS
    // mirrors of them except "middle" which is "center" in CSS.
    this.div = window.document.createElement("div");
    styles = {
      textAlign: cue.align === "middle" ? "center" : cue.align,
      font: styleOptions.font,
      whiteSpace: "pre-line",
      position: "absolute"
    };

    if (!isIE8) {
      styles.direction = determineBidi(this.cueDiv);
      styles.writingMode = cue.vertical === "" ? "horizontal-tb"
                                               : cue.vertical === "lr" ? "vertical-lr"
                                                                       : "vertical-rl".
      stylesunicodeBidi =  "plaintext";
    }

    this.applyStyles(styles);

    this.div.appendChild(this.cueDiv);

    // Calculate the distance from the reference edge of the viewport to the text
    // position of the cue box. The reference edge will be resolved later when
    // the box orientation styles are applied.
    var textPos = 0;
    switch (cue.positionAlign) {
    case "start":
      textPos = cue.position;
      break;
    case "middle":
      textPos = cue.position - (cue.size / 2);
      break;
    case "end":
      textPos = cue.position - cue.size;
      break;
    }

    // Horizontal box orientation; textPos is the distance from the left edge of the
    // area to the left edge of the box and cue.size is the distance extending to
    // the right from there.
    if (cue.vertical === "") {
      this.applyStyles({
        left:  this.formatStyle(textPos, "%"),
        width: this.formatStyle(cue.size, "%")
      });
    // Vertical box orientation; textPos is the distance from the top edge of the
    // area to the top edge of the box and cue.size is the height extending
    // downwards from there.
    } else {
      this.applyStyles({
        top: this.formatStyle(textPos, "%"),
        height: this.formatStyle(cue.size, "%")
      });
    }

    this.move = function(box) {
      this.applyStyles({
        top: this.formatStyle(box.top, "px"),
        bottom: this.formatStyle(box.bottom, "px"),
        left: this.formatStyle(box.left, "px"),
        right: this.formatStyle(box.right, "px"),
        height: this.formatStyle(box.height, "px"),
        width: this.formatStyle(box.width, "px")
      });
    };
  }
  CueStyleBox.prototype = _objCreate(StyleBox.prototype);
  CueStyleBox.prototype.constructor = CueStyleBox;

  // Represents the co-ordinates of an Element in a way that we can easily
  // compute things with such as if it overlaps or intersects with another Element.
  // Can initialize it with either a StyleBox or another BoxPosition.
  function BoxPosition(obj) {
    var isIE8 = (typeof navigator !== "undefined") &&
      (/MSIE\s8\.0/).test(navigator.userAgent);

    // Either a BoxPosition was passed in and we need to copy it, or a StyleBox
    // was passed in and we need to copy the results of 'getBoundingClientRect'
    // as the object returned is readonly. All co-ordinate values are in reference
    // to the viewport origin (top left).
    var lh, height, width, top;
    if (obj.div) {
      height = obj.div.offsetHeight;
      width = obj.div.offsetWidth;
      top = obj.div.offsetTop;

      var rects = (rects = obj.div.childNodes) && (rects = rects[0]) &&
                  rects.getClientRects && rects.getClientRects();
      obj = obj.div.getBoundingClientRect();
      // In certain cases the outter div will be slightly larger then the sum of
      // the inner div's lines. This could be due to bold text, etc, on some platforms.
      // In this case we should get the average line height and use that. This will
      // result in the desired behaviour.
      lh = rects ? Math.max((rects[0] && rects[0].height) || 0, obj.height / rects.length)
                 : 0;

    }
    this.left = obj.left;
    this.right = obj.right;
    this.top = obj.top || top;
    this.height = obj.height || height;
    this.bottom = obj.bottom || (top + (obj.height || height));
    this.width = obj.width || width;
    this.lineHeight = lh !== undefined ? lh : obj.lineHeight;

    if (isIE8 && !this.lineHeight) {
      this.lineHeight = 13;
    }
  }

  // Move the box along a particular axis. Optionally pass in an amount to move
  // the box. If no amount is passed then the default is the line height of the
  // box.
  BoxPosition.prototype.move = function(axis, toMove) {
    toMove = toMove !== undefined ? toMove : this.lineHeight;
    switch (axis) {
    case "+x":
      this.left += toMove;
      this.right += toMove;
      break;
    case "-x":
      this.left -= toMove;
      this.right -= toMove;
      break;
    case "+y":
      this.top += toMove;
      this.bottom += toMove;
      break;
    case "-y":
      this.top -= toMove;
      this.bottom -= toMove;
      break;
    }
  };

  // Check if this box overlaps another box, b2.
  BoxPosition.prototype.overlaps = function(b2) {
    return this.left < b2.right &&
           this.right > b2.left &&
           this.top < b2.bottom &&
           this.bottom > b2.top;
  };

  // Check if this box overlaps any other boxes in boxes.
  BoxPosition.prototype.overlapsAny = function(boxes) {
    for (var i = 0; i < boxes.length; i++) {
      if (this.overlaps(boxes[i])) {
        return true;
      }
    }
    return false;
  };

  // Check if this box is within another box.
  BoxPosition.prototype.within = function(container) {
    return this.top >= container.top &&
           this.bottom <= container.bottom &&
           this.left >= container.left &&
           this.right <= container.right;
  };

  // Check if this box is entirely within the container or it is overlapping
  // on the edge opposite of the axis direction passed. For example, if "+x" is
  // passed and the box is overlapping on the left edge of the container, then
  // return true.
  BoxPosition.prototype.overlapsOppositeAxis = function(container, axis) {
    switch (axis) {
    case "+x":
      return this.left < container.left;
    case "-x":
      return this.right > container.right;
    case "+y":
      return this.top < container.top;
    case "-y":
      return this.bottom > container.bottom;
    }
  };

  // Find the percentage of the area that this box is overlapping with another
  // box.
  BoxPosition.prototype.intersectPercentage = function(b2) {
    var x = Math.max(0, Math.min(this.right, b2.right) - Math.max(this.left, b2.left)),
        y = Math.max(0, Math.min(this.bottom, b2.bottom) - Math.max(this.top, b2.top)),
        intersectArea = x * y;
    return intersectArea / (this.height * this.width);
  };

  // Convert the positions from this box to CSS compatible positions using
  // the reference container's positions. This has to be done because this
  // box's positions are in reference to the viewport origin, whereas, CSS
  // values are in referecne to their respective edges.
  BoxPosition.prototype.toCSSCompatValues = function(reference) {
    return {
      top: this.top - reference.top,
      bottom: reference.bottom - this.bottom,
      left: this.left - reference.left,
      right: reference.right - this.right,
      height: this.height,
      width: this.width
    };
  };

  // Get an object that represents the box's position without anything extra.
  // Can pass a StyleBox, HTMLElement, or another BoxPositon.
  BoxPosition.getSimpleBoxPosition = function(obj) {
    var height = obj.div ? obj.div.offsetHeight : obj.tagName ? obj.offsetHeight : 0;
    var width = obj.div ? obj.div.offsetWidth : obj.tagName ? obj.offsetWidth : 0;
    var top = obj.div ? obj.div.offsetTop : obj.tagName ? obj.offsetTop : 0;

    obj = obj.div ? obj.div.getBoundingClientRect() :
                  obj.tagName ? obj.getBoundingClientRect() : obj;
    var ret = {
      left: obj.left,
      right: obj.right,
      top: obj.top || top,
      height: obj.height || height,
      bottom: obj.bottom || (top + (obj.height || height)),
      width: obj.width || width
    };
    return ret;
  };

  // Move a StyleBox to its specified, or next best, position. The containerBox
  // is the box that contains the StyleBox, such as a div. boxPositions are
  // a list of other boxes that the styleBox can't overlap with.
  function moveBoxToLinePosition(window, styleBox, containerBox, boxPositions) {

    // Find the best position for a cue box, b, on the video. The axis parameter
    // is a list of axis, the order of which, it will move the box along. For example:
    // Passing ["+x", "-x"] will move the box first along the x axis in the positive
    // direction. If it doesn't find a good position for it there it will then move
    // it along the x axis in the negative direction.
    function findBestPosition(b, axis) {
      var bestPosition,
          specifiedPosition = new BoxPosition(b),
          percentage = 1; // Highest possible so the first thing we get is better.

      for (var i = 0; i < axis.length; i++) {
        while (b.overlapsOppositeAxis(containerBox, axis[i]) ||
               (b.within(containerBox) && b.overlapsAny(boxPositions))) {
          b.move(axis[i]);
        }
        // We found a spot where we aren't overlapping anything. This is our
        // best position.
        if (b.within(containerBox)) {
          return b;
        }
        var p = b.intersectPercentage(containerBox);
        // If we're outside the container box less then we were on our last try
        // then remember this position as the best position.
        if (percentage > p) {
          bestPosition = new BoxPosition(b);
          percentage = p;
        }
        // Reset the box position to the specified position.
        b = new BoxPosition(specifiedPosition);
      }
      return bestPosition || specifiedPosition;
    }

    var boxPosition = new BoxPosition(styleBox),
        cue = styleBox.cue,
        linePos = computeLinePos(cue),
        axis = [];

    // If we have a line number to align the cue to.
    if (cue.snapToLines) {
      var size;
      switch (cue.vertical) {
      case "":
        axis = [ "+y", "-y" ];
        size = "height";
        break;
      case "rl":
        axis = [ "+x", "-x" ];
        size = "width";
        break;
      case "lr":
        axis = [ "-x", "+x" ];
        size = "width";
        break;
      }

      var step = boxPosition.lineHeight,
          position = step * Math.round(linePos),
          maxPosition = containerBox[size] + step,
          initialAxis = axis[0];

      // If the specified intial position is greater then the max position then
      // clamp the box to the amount of steps it would take for the box to
      // reach the max position.
      if (Math.abs(position) > maxPosition) {
        position = position < 0 ? -1 : 1;
        position *= Math.ceil(maxPosition / step) * step;
      }

      // If computed line position returns negative then line numbers are
      // relative to the bottom of the video instead of the top. Therefore, we
      // need to increase our initial position by the length or width of the
      // video, depending on the writing direction, and reverse our axis directions.
      if (linePos < 0) {
        position += cue.vertical === "" ? containerBox.height : containerBox.width;
        axis = axis.reverse();
      }

      // Move the box to the specified position. This may not be its best
      // position.
      boxPosition.move(initialAxis, position);

    } else {
      // If we have a percentage line value for the cue.
      var calculatedPercentage = (boxPosition.lineHeight / containerBox.height) * 100;

      switch (cue.lineAlign) {
      case "middle":
        linePos -= (calculatedPercentage / 2);
        break;
      case "end":
        linePos -= calculatedPercentage;
        break;
      }

      // Apply initial line position to the cue box.
      switch (cue.vertical) {
      case "":
        styleBox.applyStyles({
          top: styleBox.formatStyle(linePos, "%")
        });
        break;
      case "rl":
        styleBox.applyStyles({
          left: styleBox.formatStyle(linePos, "%")
        });
        break;
      case "lr":
        styleBox.applyStyles({
          right: styleBox.formatStyle(linePos, "%")
        });
        break;
      }

      axis = [ "+y", "-x", "+x", "-y" ];

      // Get the box position again after we've applied the specified positioning
      // to it.
      boxPosition = new BoxPosition(styleBox);
    }

    var bestPosition = findBestPosition(boxPosition, axis);
    styleBox.move(bestPosition.toCSSCompatValues(containerBox));
  }

  function WebVTT() {
    // Nothing
  }

  // Helper to allow strings to be decoded instead of the default binary utf8 data.
  WebVTT.StringDecoder = function() {
    return {
      decode: function(data) {
        if (!data) {
          return "";
        }
        if (typeof data !== "string") {
          throw new Error("Error - expected string data.");
        }
        return decodeURIComponent(encodeURIComponent(data));
      }
    };
  };

  WebVTT.convertCueToDOMTree = function(window, cuetext) {
    if (!window || !cuetext) {
      return null;
    }
    return parseContent(window, cuetext);
  };

  var FONT_SIZE_PERCENT = 0.05;
  var FONT_STYLE = "sans-serif";
  var CUE_BACKGROUND_PADDING = "1.5%";

  // Runs the processing model over the cues and regions passed to it.
  // @param overlay A block level element (usually a div) that the computed cues
  //                and regions will be placed into.
  WebVTT.processCues = function(window, cues, overlay) {
    if (!window || !cues || !overlay) {
      return null;
    }

    // Remove all previous children.
    while (overlay.firstChild) {
      overlay.removeChild(overlay.firstChild);
    }

    var paddedOverlay = window.document.createElement("div");
    paddedOverlay.style.position = "absolute";
    paddedOverlay.style.left = "0";
    paddedOverlay.style.right = "0";
    paddedOverlay.style.top = "0";
    paddedOverlay.style.bottom = "0";
    paddedOverlay.style.margin = CUE_BACKGROUND_PADDING;
    overlay.appendChild(paddedOverlay);

    // Determine if we need to compute the display states of the cues. This could
    // be the case if a cue's state has been changed since the last computation or
    // if it has not been computed yet.
    function shouldCompute(cues) {
      for (var i = 0; i < cues.length; i++) {
        if (cues[i].hasBeenReset || !cues[i].displayState) {
          return true;
        }
      }
      return false;
    }

    // We don't need to recompute the cues' display states. Just reuse them.
    if (!shouldCompute(cues)) {
      for (var i = 0; i < cues.length; i++) {
        paddedOverlay.appendChild(cues[i].displayState);
      }
      return;
    }

    var boxPositions = [],
        containerBox = BoxPosition.getSimpleBoxPosition(paddedOverlay),
        fontSize = Math.round(containerBox.height * FONT_SIZE_PERCENT * 100) / 100;
    var styleOptions = {
      font: (fontSize * fontScale) + "px " + FONT_STYLE
    };

    (function() {
      var styleBox, cue;

      for (var i = 0; i < cues.length; i++) {
        cue = cues[i];

        // Compute the intial position and styles of the cue div.
        styleBox = new CueStyleBox(window, cue, styleOptions);
        paddedOverlay.appendChild(styleBox.div);

        // Move the cue div to it's correct line position.
        moveBoxToLinePosition(window, styleBox, containerBox, boxPositions);

        // Remember the computed div so that we don't have to recompute it later
        // if we don't have too.
        cue.displayState = styleBox.div;

        boxPositions.push(BoxPosition.getSimpleBoxPosition(styleBox));
      }
    })();
  };

  WebVTT.Parser = function(window, decoder) {
    this.window = window;
    this.state = "INITIAL";
    this.buffer = "";
    this.decoder = decoder || new TextDecoder("utf8");
    this.regionList = [];
  };

  WebVTT.Parser.prototype = {
    // If the error is a ParsingError then report it to the consumer if
    // possible. If it's not a ParsingError then throw it like normal.
    reportOrThrowError: function(e) {
      if (e instanceof ParsingError) {
        this.onparsingerror && this.onparsingerror(e);
      } else {
        throw e;
      }
    },
    parse: function (data) {
      var self = this;

      // If there is no data then we won't decode it, but will just try to parse
      // whatever is in buffer already. This may occur in circumstances, for
      // example when flush() is called.
      if (data) {
        // Try to decode the data that we received.
        self.buffer += self.decoder.decode(data, {stream: true});
      }

      function collectNextLine() {
        var buffer = self.buffer;
        var pos = 0;
        while (pos < buffer.length && buffer[pos] !== '\r' && buffer[pos] !== '\n') {
          ++pos;
        }
        var line = buffer.substr(0, pos);
        // Advance the buffer early in case we fail below.
        if (buffer[pos] === '\r') {
          ++pos;
        }
        if (buffer[pos] === '\n') {
          ++pos;
        }
        self.buffer = buffer.substr(pos);
        return line;
      }

      // 3.4 WebVTT region and WebVTT region settings syntax
      function parseRegion(input) {
        var settings = new Settings();

        parseOptions(input, function (k, v) {
          switch (k) {
          case "id":
            settings.set(k, v);
            break;
          case "width":
            settings.percent(k, v);
            break;
          case "lines":
            settings.integer(k, v);
            break;
          case "regionanchor":
          case "viewportanchor":
            var xy = v.split(',');
            if (xy.length !== 2) {
              break;
            }
            // We have to make sure both x and y parse, so use a temporary
            // settings object here.
            var anchor = new Settings();
            anchor.percent("x", xy[0]);
            anchor.percent("y", xy[1]);
            if (!anchor.has("x") || !anchor.has("y")) {
              break;
            }
            settings.set(k + "X", anchor.get("x"));
            settings.set(k + "Y", anchor.get("y"));
            break;
          case "scroll":
            settings.alt(k, v, ["up"]);
            break;
          }
        }, /=/, /\s/);

        // Create the region, using default values for any values that were not
        // specified.
        if (settings.has("id")) {
          var region = new self.window.VTTRegion();
          region.width = settings.get("width", 100);
          region.lines = settings.get("lines", 3);
          region.regionAnchorX = settings.get("regionanchorX", 0);
          region.regionAnchorY = settings.get("regionanchorY", 100);
          region.viewportAnchorX = settings.get("viewportanchorX", 0);
          region.viewportAnchorY = settings.get("viewportanchorY", 100);
          region.scroll = settings.get("scroll", "");
          // Register the region.
          self.onregion && self.onregion(region);
          // Remember the VTTRegion for later in case we parse any VTTCues that
          // reference it.
          self.regionList.push({
            id: settings.get("id"),
            region: region
          });
        }
      }

      // 3.2 WebVTT metadata header syntax
      function parseHeader(input) {
        parseOptions(input, function (k, v) {
          switch (k) {
          case "Region":
            // 3.3 WebVTT region metadata header syntax
            parseRegion(v);
            break;
          }
        }, /:/);
      }

      // 5.1 WebVTT file parsing.
      try {
        var line;
        if (self.state === "INITIAL") {
          // We can't start parsing until we have the first line.
          if (!/\r\n|\n/.test(self.buffer)) {
            return this;
          }

          line = collectNextLine();

          var m = line.match(/^WEBVTT([ \t].*)?$/);
          if (!m || !m[0]) {
            throw new ParsingError(ParsingError.Errors.BadSignature);
          }

          self.state = "HEADER";
        }

        var alreadyCollectedLine = false;
        while (self.buffer) {
          // We can't parse a line until we have the full line.
          if (!/\r\n|\n/.test(self.buffer)) {
            return this;
          }

          if (!alreadyCollectedLine) {
            line = collectNextLine();
          } else {
            alreadyCollectedLine = false;
          }

          switch (self.state) {
          case "HEADER":
            // 13-18 - Allow a header (metadata) under the WEBVTT line.
            if (/:/.test(line)) {
              parseHeader(line);
            } else if (!line) {
              // An empty line terminates the header and starts the body (cues).
              self.state = "ID";
            }
            continue;
          case "NOTE":
            // Ignore NOTE blocks.
            if (!line) {
              self.state = "ID";
            }
            continue;
          case "ID":
            // Check for the start of NOTE blocks.
            if (/^NOTE($|[ \t])/.test(line)) {
              self.state = "NOTE";
              break;
            }
            // 19-29 - Allow any number of line terminators, then initialize new cue values.
            if (!line) {
              continue;
            }
            self.cue = new self.window.VTTCue(0, 0, "");
            self.state = "CUE";
            // 30-39 - Check if self line contains an optional identifier or timing data.
            if (line.indexOf("-->") === -1) {
              self.cue.id = line;
              continue;
            }
            // Process line as start of a cue.
            /*falls through*/
          case "CUE":
            // 40 - Collect cue timings and settings.
            try {
              parseCue(line, self.cue, self.regionList);
            } catch (e) {
              self.reportOrThrowError(e);
              // In case of an error ignore rest of the cue.
              self.cue = null;
              self.state = "BADCUE";
              continue;
            }
            self.state = "CUETEXT";
            continue;
          case "CUETEXT":
            var hasSubstring = line.indexOf("-->") !== -1;
            // 34 - If we have an empty line then report the cue.
            // 35 - If we have the special substring '-->' then report the cue,
            // but do not collect the line as we need to process the current
            // one as a new cue.
            if (!line || hasSubstring && (alreadyCollectedLine = true)) {
              // We are done parsing self cue.
              self.oncue && self.oncue(self.cue);
              self.cue = null;
              self.state = "ID";
              continue;
            }
            if (self.cue.text) {
              self.cue.text += "\n";
            }
            self.cue.text += line;
            continue;
          case "BADCUE": // BADCUE
            // 54-62 - Collect and discard the remaining cue.
            if (!line) {
              self.state = "ID";
            }
            continue;
          }
        }
      } catch (e) {
        self.reportOrThrowError(e);

        // If we are currently parsing a cue, report what we have.
        if (self.state === "CUETEXT" && self.cue && self.oncue) {
          self.oncue(self.cue);
        }
        self.cue = null;
        // Enter BADWEBVTT state if header was not parsed correctly otherwise
        // another exception occurred so enter BADCUE state.
        self.state = self.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
      }
      return this;
    },
    flush: function () {
      var self = this;
      try {
        // Finish decoding the stream.
        self.buffer += self.decoder.decode();
        // Synthesize the end of the current cue or region.
        if (self.cue || self.state === "HEADER") {
          self.buffer += "\n\n";
          self.parse();
        }
        // If we've flushed, parsed, and we're still on the INITIAL state then
        // that means we don't have enough of the stream to parse the first
        // line.
        if (self.state === "INITIAL") {
          throw new ParsingError(ParsingError.Errors.BadSignature);
        }
      } catch(e) {
        self.reportOrThrowError(e);
      }
      self.onflush && self.onflush();
      return this;
    }
  };

  global.WebVTT = WebVTT;

}(this));

// If we're in node require encoding-indexes and attach it to the global.
if (typeof module !== "undefined" && module.exports) {
  this["encoding-indexes"] = require("./encoding-indexes.js")["encoding-indexes"];
}

(function(global) {
  'use strict';

  //
  // Utilities
  //

  /**
   * @param {number} a The number to test.
   * @param {number} min The minimum value in the range, inclusive.
   * @param {number} max The maximum value in the range, inclusive.
   * @return {boolean} True if a >= min and a <= max.
   */
  function inRange(a, min, max) {
    return min <= a && a <= max;
  }

  /**
   * @param {number} n The numerator.
   * @param {number} d The denominator.
   * @return {number} The result of the integer division of n by d.
   */
  function div(n, d) {
    return Math.floor(n / d);
  }


  //
  // Implementation of Encoding specification
  // http://dvcs.w3.org/hg/encoding/raw-file/tip/Overview.html
  //

  //
  // 3. Terminology
  //

  //
  // 4. Encodings
  //

  /** @const */ var EOF_byte = -1;
  /** @const */ var EOF_code_point = -1;

  /**
   * @constructor
   * @param {Uint8Array} bytes Array of bytes that provide the stream.
   */
  function ByteInputStream(bytes) {
    /** @type {number} */
    var pos = 0;

    /**
     * @this {ByteInputStream}
     * @return {number} Get the next byte from the stream.
     */
    this.get = function() {
      return (pos >= bytes.length) ? EOF_byte : Number(bytes[pos]);
    };

    /** @param {number} n Number (positive or negative) by which to
     *      offset the byte pointer. */
    this.offset = function(n) {
      pos += n;
      if (pos < 0) {
        throw new Error('Seeking past start of the buffer');
      }
      if (pos > bytes.length) {
        throw new Error('Seeking past EOF');
      }
    };

    /**
     * @param {Array.<number>} test Array of bytes to compare against.
     * @return {boolean} True if the start of the stream matches the test
     *     bytes.
     */
    this.match = function(test) {
      if (test.length > pos + bytes.length) {
        return false;
      }
      var i;
      for (i = 0; i < test.length; i += 1) {
        if (Number(bytes[pos + i]) !== test[i]) {
          return false;
        }
      }
      return true;
    };
  }

  /**
   * @constructor
   * @param {Array.<number>} bytes The array to write bytes into.
   */
  function ByteOutputStream(bytes) {
    /** @type {number} */
    var pos = 0;

    /**
     * @param {...number} var_args The byte or bytes to emit into the stream.
     * @return {number} The last byte emitted.
     */
    this.emit = function(var_args) {
      /** @type {number} */
      var last = EOF_byte;
      var i;
      for (i = 0; i < arguments.length; ++i) {
        last = Number(arguments[i]);
        bytes[pos++] = last;
      }
      return last;
    };
  }

  /**
   * @constructor
   * @param {string} string The source of code units for the stream.
   */
  function CodePointInputStream(string) {
    /**
     * @param {string} string Input string of UTF-16 code units.
     * @return {Array.<number>} Code points.
     */
    function stringToCodePoints(string) {
      /** @type {Array.<number>} */
      var cps = [];
      // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
      var i = 0, n = string.length;
      while (i < string.length) {
        var c = string.charCodeAt(i);
        if (!inRange(c, 0xD800, 0xDFFF)) {
          cps.push(c);
        } else if (inRange(c, 0xDC00, 0xDFFF)) {
          cps.push(0xFFFD);
        } else { // (inRange(cu, 0xD800, 0xDBFF))
          if (i === n - 1) {
            cps.push(0xFFFD);
          } else {
            var d = string.charCodeAt(i + 1);
            if (inRange(d, 0xDC00, 0xDFFF)) {
              var a = c & 0x3FF;
              var b = d & 0x3FF;
              i += 1;
              cps.push(0x10000 + (a << 10) + b);
            } else {
              cps.push(0xFFFD);
            }
          }
        }
        i += 1;
      }
      return cps;
    }

    /** @type {number} */
    var pos = 0;
    /** @type {Array.<number>} */
    var cps = stringToCodePoints(string);

    /** @param {number} n The number of bytes (positive or negative)
     *      to advance the code point pointer by.*/
    this.offset = function(n) {
      pos += n;
      if (pos < 0) {
        throw new Error('Seeking past start of the buffer');
      }
      if (pos > cps.length) {
        throw new Error('Seeking past EOF');
      }
    };


    /** @return {number} Get the next code point from the stream. */
    this.get = function() {
      if (pos >= cps.length) {
        return EOF_code_point;
      }
      return cps[pos];
    };
  }

  /**
   * @constructor
   */
  function CodePointOutputStream() {
    /** @type {string} */
    var string = '';

    /** @return {string} The accumulated string. */
    this.string = function() {
      return string;
    };

    /** @param {number} c The code point to encode into the stream. */
    this.emit = function(c) {
      if (c <= 0xFFFF) {
        string += String.fromCharCode(c);
      } else {
        c -= 0x10000;
        string += String.fromCharCode(0xD800 + ((c >> 10) & 0x3ff));
        string += String.fromCharCode(0xDC00 + (c & 0x3ff));
      }
    };
  }

  /**
   * @constructor
   * @param {string} message Description of the error.
   */
  function EncodingError(message) {
    this.name = 'EncodingError';
    this.message = message;
    this.code = 0;
  }
  EncodingError.prototype = Error.prototype;

  /**
   * @param {boolean} fatal If true, decoding errors raise an exception.
   * @param {number=} opt_code_point Override the standard fallback code point.
   * @return {number} The code point to insert on a decoding error.
   */
  function decoderError(fatal, opt_code_point) {
    if (fatal) {
      throw new EncodingError('Decoder error');
    }
    return opt_code_point || 0xFFFD;
  }

  /**
   * @param {number} code_point The code point that could not be encoded.
   * @return {number} Always throws, no value is actually returned.
   */
  function encoderError(code_point) {
    throw new EncodingError('The code point ' + code_point +
                            ' could not be encoded.');
  }

  /**
   * @param {string} label The encoding label.
   * @return {?{name:string,labels:Array.<string>}}
   */
  function getEncoding(label) {
    label = String(label).trim().toLowerCase();
    if (Object.prototype.hasOwnProperty.call(label_to_encoding, label)) {
      return label_to_encoding[label];
    }
    return null;
  }

  /** @type {Array.<{encodings: Array.<{name:string,labels:Array.<string>}>,
   *      heading: string}>} */
  var encodings = [
    {
      "encodings": [
        {
          "labels": [
            "unicode-1-1-utf-8",
            "utf-8",
            "utf8"
          ],
          "name": "utf-8"
        }
      ],
      "heading": "The Encoding"
    },
    {
      "encodings": [
        {
          "labels": [
            "866",
            "cp866",
            "csibm866",
            "ibm866"
          ],
          "name": "ibm866"
        },
        {
          "labels": [
            "csisolatin2",
            "iso-8859-2",
            "iso-ir-101",
            "iso8859-2",
            "iso88592",
            "iso_8859-2",
            "iso_8859-2:1987",
            "l2",
            "latin2"
          ],
          "name": "iso-8859-2"
        },
        {
          "labels": [
            "csisolatin3",
            "iso-8859-3",
            "iso-ir-109",
            "iso8859-3",
            "iso88593",
            "iso_8859-3",
            "iso_8859-3:1988",
            "l3",
            "latin3"
          ],
          "name": "iso-8859-3"
        },
        {
          "labels": [
            "csisolatin4",
            "iso-8859-4",
            "iso-ir-110",
            "iso8859-4",
            "iso88594",
            "iso_8859-4",
            "iso_8859-4:1988",
            "l4",
            "latin4"
          ],
          "name": "iso-8859-4"
        },
        {
          "labels": [
            "csisolatincyrillic",
            "cyrillic",
            "iso-8859-5",
            "iso-ir-144",
            "iso8859-5",
            "iso88595",
            "iso_8859-5",
            "iso_8859-5:1988"
          ],
          "name": "iso-8859-5"
        },
        {
          "labels": [
            "arabic",
            "asmo-708",
            "csiso88596e",
            "csiso88596i",
            "csisolatinarabic",
            "ecma-114",
            "iso-8859-6",
            "iso-8859-6-e",
            "iso-8859-6-i",
            "iso-ir-127",
            "iso8859-6",
            "iso88596",
            "iso_8859-6",
            "iso_8859-6:1987"
          ],
          "name": "iso-8859-6"
        },
        {
          "labels": [
            "csisolatingreek",
            "ecma-118",
            "elot_928",
            "greek",
            "greek8",
            "iso-8859-7",
            "iso-ir-126",
            "iso8859-7",
            "iso88597",
            "iso_8859-7",
            "iso_8859-7:1987",
            "sun_eu_greek"
          ],
          "name": "iso-8859-7"
        },
        {
          "labels": [
            "csiso88598e",
            "csisolatinhebrew",
            "hebrew",
            "iso-8859-8",
            "iso-8859-8-e",
            "iso-ir-138",
            "iso8859-8",
            "iso88598",
            "iso_8859-8",
            "iso_8859-8:1988",
            "visual"
          ],
          "name": "iso-8859-8"
        },
        {
          "labels": [
            "csiso88598i",
            "iso-8859-8-i",
            "logical"
          ],
          "name": "iso-8859-8-i"
        },
        {
          "labels": [
            "csisolatin6",
            "iso-8859-10",
            "iso-ir-157",
            "iso8859-10",
            "iso885910",
            "l6",
            "latin6"
          ],
          "name": "iso-8859-10"
        },
        {
          "labels": [
            "iso-8859-13",
            "iso8859-13",
            "iso885913"
          ],
          "name": "iso-8859-13"
        },
        {
          "labels": [
            "iso-8859-14",
            "iso8859-14",
            "iso885914"
          ],
          "name": "iso-8859-14"
        },
        {
          "labels": [
            "csisolatin9",
            "iso-8859-15",
            "iso8859-15",
            "iso885915",
            "iso_8859-15",
            "l9"
          ],
          "name": "iso-8859-15"
        },
        {
          "labels": [
            "iso-8859-16"
          ],
          "name": "iso-8859-16"
        },
        {
          "labels": [
            "cskoi8r",
            "koi",
            "koi8",
            "koi8-r",
            "koi8_r"
          ],
          "name": "koi8-r"
        },
        {
          "labels": [
            "koi8-u"
          ],
          "name": "koi8-u"
        },
        {
          "labels": [
            "csmacintosh",
            "mac",
            "macintosh",
            "x-mac-roman"
          ],
          "name": "macintosh"
        },
        {
          "labels": [
            "dos-874",
            "iso-8859-11",
            "iso8859-11",
            "iso885911",
            "tis-620",
            "windows-874"
          ],
          "name": "windows-874"
        },
        {
          "labels": [
            "cp1250",
            "windows-1250",
            "x-cp1250"
          ],
          "name": "windows-1250"
        },
        {
          "labels": [
            "cp1251",
            "windows-1251",
            "x-cp1251"
          ],
          "name": "windows-1251"
        },
        {
          "labels": [
            "ansi_x3.4-1968",
            "ascii",
            "cp1252",
            "cp819",
            "csisolatin1",
            "ibm819",
            "iso-8859-1",
            "iso-ir-100",
            "iso8859-1",
            "iso88591",
            "iso_8859-1",
            "iso_8859-1:1987",
            "l1",
            "latin1",
            "us-ascii",
            "windows-1252",
            "x-cp1252"
          ],
          "name": "windows-1252"
        },
        {
          "labels": [
            "cp1253",
            "windows-1253",
            "x-cp1253"
          ],
          "name": "windows-1253"
        },
        {
          "labels": [
            "cp1254",
            "csisolatin5",
            "iso-8859-9",
            "iso-ir-148",
            "iso8859-9",
            "iso88599",
            "iso_8859-9",
            "iso_8859-9:1989",
            "l5",
            "latin5",
            "windows-1254",
            "x-cp1254"
          ],
          "name": "windows-1254"
        },
        {
          "labels": [
            "cp1255",
            "windows-1255",
            "x-cp1255"
          ],
          "name": "windows-1255"
        },
        {
          "labels": [
            "cp1256",
            "windows-1256",
            "x-cp1256"
          ],
          "name": "windows-1256"
        },
        {
          "labels": [
            "cp1257",
            "windows-1257",
            "x-cp1257"
          ],
          "name": "windows-1257"
        },
        {
          "labels": [
            "cp1258",
            "windows-1258",
            "x-cp1258"
          ],
          "name": "windows-1258"
        },
        {
          "labels": [
            "x-mac-cyrillic",
            "x-mac-ukrainian"
          ],
          "name": "x-mac-cyrillic"
        }
      ],
      "heading": "Legacy single-byte encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "chinese",
            "csgb2312",
            "csiso58gb231280",
            "gb18030",
            "gb2312",
            "gb_2312",
            "gb_2312-80",
            "gbk",
            "iso-ir-58",
            "x-gbk"
          ],
          "name": "gb18030"
        },
        {
          "labels": [
            "hz-gb-2312"
          ],
          "name": "hz-gb-2312"
        }
      ],
      "heading": "Legacy multi-byte Chinese (simplified) encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "big5",
            "big5-hkscs",
            "cn-big5",
            "csbig5",
            "x-x-big5"
          ],
          "name": "big5"
        }
      ],
      "heading": "Legacy multi-byte Chinese (traditional) encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "cseucpkdfmtjapanese",
            "euc-jp",
            "x-euc-jp"
          ],
          "name": "euc-jp"
        },
        {
          "labels": [
            "csiso2022jp",
            "iso-2022-jp"
          ],
          "name": "iso-2022-jp"
        },
        {
          "labels": [
            "csshiftjis",
            "ms_kanji",
            "shift-jis",
            "shift_jis",
            "sjis",
            "windows-31j",
            "x-sjis"
          ],
          "name": "shift_jis"
        }
      ],
      "heading": "Legacy multi-byte Japanese encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "cseuckr",
            "csksc56011987",
            "euc-kr",
            "iso-ir-149",
            "korean",
            "ks_c_5601-1987",
            "ks_c_5601-1989",
            "ksc5601",
            "ksc_5601",
            "windows-949"
          ],
          "name": "euc-kr"
        }
      ],
      "heading": "Legacy multi-byte Korean encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "csiso2022kr",
            "iso-2022-cn",
            "iso-2022-cn-ext",
            "iso-2022-kr"
          ],
          "name": "replacement"
        },
        {
          "labels": [
            "utf-16be"
          ],
          "name": "utf-16be"
        },
        {
          "labels": [
            "utf-16",
            "utf-16le"
          ],
          "name": "utf-16le"
        },
        {
          "labels": [
            "x-user-defined"
          ],
          "name": "x-user-defined"
        }
      ],
      "heading": "Legacy miscellaneous encodings"
    }
  ];

  var name_to_encoding = {};
  var label_to_encoding = {};
  encodings.forEach(function(category) {
    category['encodings'].forEach(function(encoding) {
      name_to_encoding[encoding['name']] = encoding;
      encoding['labels'].forEach(function(label) {
        label_to_encoding[label] = encoding;
      });
    });
  });

  //
  // 5. Indexes
  //

  /**
   * @param {number} pointer The |pointer| to search for.
   * @param {Array.<?number>|undefined} index The |index| to search within.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in |index|.
   */
  function indexCodePointFor(pointer, index) {
    if (!index) return null;
    return index[pointer] || null;
  }

  /**
   * @param {number} code_point The |code point| to search for.
   * @param {Array.<?number>} index The |index| to search within.
   * @return {?number} The first pointer corresponding to |code point| in
   *     |index|, or null if |code point| is not in |index|.
   */
  function indexPointerFor(code_point, index) {
    var pointer = index.indexOf(code_point);
    return pointer === -1 ? null : pointer;
  }

  /**
   * @param {string} name Name of the index.
   * @return {(Array.<number>|Array.<Array.<number>>)}
   *  */
  function index(name) {
    if (!('encoding-indexes' in global))
      throw new Error("Indexes missing. Did you forget to include encoding-indexes.js?");
    return global['encoding-indexes'][name];
  }

  /**
   * @param {number} pointer The |pointer| to search for in the gb18030 index.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in the gb18030 index.
   */
  function indexGB18030CodePointFor(pointer) {
    if ((pointer > 39419 && pointer < 189000) || (pointer > 1237575)) {
      return null;
    }
    var /** @type {number} */ offset = 0,
        /** @type {number} */ code_point_offset = 0,
        /** @type {Array.<Array.<number>>} */ idx = index('gb18030');
    var i;
    for (i = 0; i < idx.length; ++i) {
      var entry = idx[i];
      if (entry[0] <= pointer) {
        offset = entry[0];
        code_point_offset = entry[1];
      } else {
        break;
      }
    }
    return code_point_offset + pointer - offset;
  }

  /**
   * @param {number} code_point The |code point| to locate in the gb18030 index.
   * @return {number} The first pointer corresponding to |code point| in the
   *     gb18030 index.
   */
  function indexGB18030PointerFor(code_point) {
    var /** @type {number} */ offset = 0,
        /** @type {number} */ pointer_offset = 0,
        /** @type {Array.<Array.<number>>} */ idx = index('gb18030');
    var i;
    for (i = 0; i < idx.length; ++i) {
      var entry = idx[i];
      if (entry[1] <= code_point) {
        offset = entry[1];
        pointer_offset = entry[0];
      } else {
        break;
      }
    }
    return pointer_offset + code_point - offset;
  }


  //
  // 7. API
  //

  /** @const */ var DEFAULT_ENCODING = 'utf-8';

  // 7.1 Interface TextDecoder

  /**
   * @constructor
   * @param {string=} opt_encoding The label of the encoding;
   *     defaults to 'utf-8'.
   * @param {{fatal: boolean}=} options
   */
  function TextDecoder(opt_encoding, options) {
    if (!(this instanceof TextDecoder)) {
      return new TextDecoder(opt_encoding, options);
    }
    opt_encoding = opt_encoding ? String(opt_encoding) : DEFAULT_ENCODING;
    options = Object(options);
    /** @private */
    this._encoding = getEncoding(opt_encoding);
    if (this._encoding === null || this._encoding.name === 'replacement')
      throw new TypeError('Unknown encoding: ' + opt_encoding);

    if (!this._encoding.getDecoder)
      throw new Error('Decoder not present. Did you forget to include encoding-indexes.js?');

    /** @private @type {boolean} */
    this._streaming = false;
    /** @private @type {boolean} */
    this._BOMseen = false;
    /** @private */
    this._decoder = null;
    /** @private @type {{fatal: boolean}=} */
    this._options = { fatal: Boolean(options.fatal) };

    if (Object.defineProperty) {
      Object.defineProperty(
          this, 'encoding',
          { get: function() { return this._encoding.name; } });
    } else {
      this.encoding = this._encoding.name;
    }

    return this;
  }

  // TODO: Issue if input byte stream is offset by decoder
  // TODO: BOM detection will not work if stream header spans multiple calls
  // (last N bytes of previous stream may need to be retained?)
  TextDecoder.prototype = {
    /**
     * @param {ArrayBufferView=} opt_view The buffer of bytes to decode.
     * @param {{stream: boolean}=} options
     */
    decode: function decode(opt_view, options) {
      if (opt_view && !('buffer' in opt_view && 'byteOffset' in opt_view &&
                        'byteLength' in opt_view)) {
        throw new TypeError('Expected ArrayBufferView');
      } else if (!opt_view) {
        opt_view = new Uint8Array(0);
      }
      options = Object(options);

      if (!this._streaming) {
        this._decoder = this._encoding.getDecoder(this._options);
        this._BOMseen = false;
      }
      this._streaming = Boolean(options.stream);

      var bytes = new Uint8Array(opt_view.buffer,
                                 opt_view.byteOffset,
                                 opt_view.byteLength);
      var input_stream = new ByteInputStream(bytes);

      var output_stream = new CodePointOutputStream();

      /** @type {number} */
      var code_point;

      while (input_stream.get() !== EOF_byte) {
        code_point = this._decoder.decode(input_stream);
        if (code_point !== null && code_point !== EOF_code_point) {
          output_stream.emit(code_point);
        }
      }
      if (!this._streaming) {
        do {
          code_point = this._decoder.decode(input_stream);
          if (code_point !== null && code_point !== EOF_code_point) {
            output_stream.emit(code_point);
          }
        } while (code_point !== EOF_code_point &&
                 input_stream.get() != EOF_byte);
        this._decoder = null;
      }

      var result = output_stream.string();
      if (!this._BOMseen && result.length) {
        this._BOMseen = true;
        if (['utf-8', 'utf-16le', 'utf-16be'].indexOf(this.encoding) !== -1 &&
           result.charCodeAt(0) === 0xFEFF) {
          result = result.substring(1);
        }
      }

      return result;
    }
  };

  // 7.2 Interface TextEncoder

  /**
   * @constructor
   * @param {string=} opt_encoding The label of the encoding;
   *     defaults to 'utf-8'.
   * @param {{fatal: boolean}=} options
   */
  function TextEncoder(opt_encoding, options) {
    if (!(this instanceof TextEncoder)) {
      return new TextEncoder(opt_encoding, options);
    }
    opt_encoding = opt_encoding ? String(opt_encoding) : DEFAULT_ENCODING;
    options = Object(options);
    /** @private */
    this._encoding = getEncoding(opt_encoding);

    var allowLegacyEncoding = options.NONSTANDARD_allowLegacyEncoding;
    var isLegacyEncoding = (this._encoding.name !== 'utf-8' &&
                            this._encoding.name !== 'utf-16le' &&
                            this._encoding.name !== 'utf-16be');
    if (this._encoding === null || (isLegacyEncoding && !allowLegacyEncoding))
      throw new TypeError('Unknown encoding: ' + opt_encoding);

    if (!this._encoding.getEncoder)
      throw new Error('Encoder not present. Did you forget to include encoding-indexes.js?');

    /** @private @type {boolean} */
    this._streaming = false;
    /** @private */
    this._encoder = null;
    /** @private @type {{fatal: boolean}=} */
    this._options = { fatal: Boolean(options.fatal) };

    if (Object.defineProperty) {
      Object.defineProperty(
          this, 'encoding',
          { get: function() { return this._encoding.name; } });
    } else {
      this.encoding = this._encoding.name;
    }

    return this;
  }

  TextEncoder.prototype = {
    /**
     * @param {string=} opt_string The string to encode.
     * @param {{stream: boolean}=} options
     */
    encode: function encode(opt_string, options) {
      opt_string = opt_string ? String(opt_string) : '';
      options = Object(options);
      // TODO: any options?
      if (!this._streaming) {
        this._encoder = this._encoding.getEncoder(this._options);
      }
      this._streaming = Boolean(options.stream);

      var bytes = [];
      var output_stream = new ByteOutputStream(bytes);
      var input_stream = new CodePointInputStream(opt_string);
      while (input_stream.get() !== EOF_code_point) {
        this._encoder.encode(output_stream, input_stream);
      }
      if (!this._streaming) {
        /** @type {number} */
        var last_byte;
        do {
          last_byte = this._encoder.encode(output_stream, input_stream);
        } while (last_byte !== EOF_byte);
        this._encoder = null;
      }
      return new Uint8Array(bytes);
    }
  };


  //
  // 8. The encoding
  //

  // 8.1 utf-8

  /**
   * @constructor
    * @param {{fatal: boolean}} options
   */
  function UTF8Decoder(options) {
    var fatal = options.fatal;
    var /** @type {number} */ utf8_code_point = 0,
        /** @type {number} */ utf8_bytes_needed = 0,
        /** @type {number} */ utf8_bytes_seen = 0,
        /** @type {number} */ utf8_lower_boundary = 0;

    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite === EOF_byte) {
        if (utf8_bytes_needed !== 0) {
          return decoderError(fatal);
        }
        return EOF_code_point;
      }
      byte_pointer.offset(1);

      if (utf8_bytes_needed === 0) {
        if (inRange(bite, 0x00, 0x7F)) {
          return bite;
        }
        if (inRange(bite, 0xC2, 0xDF)) {
          utf8_bytes_needed = 1;
          utf8_lower_boundary = 0x80;
          utf8_code_point = bite - 0xC0;
        } else if (inRange(bite, 0xE0, 0xEF)) {
          utf8_bytes_needed = 2;
          utf8_lower_boundary = 0x800;
          utf8_code_point = bite - 0xE0;
        } else if (inRange(bite, 0xF0, 0xF4)) {
          utf8_bytes_needed = 3;
          utf8_lower_boundary = 0x10000;
          utf8_code_point = bite - 0xF0;
        } else {
          return decoderError(fatal);
        }
        utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
        return null;
      }
      if (!inRange(bite, 0x80, 0xBF)) {
        utf8_code_point = 0;
        utf8_bytes_needed = 0;
        utf8_bytes_seen = 0;
        utf8_lower_boundary = 0;
        byte_pointer.offset(-1);
        return decoderError(fatal);
      }
      utf8_bytes_seen += 1;
      utf8_code_point = utf8_code_point + (bite - 0x80) *
          Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
      if (utf8_bytes_seen !== utf8_bytes_needed) {
        return null;
      }
      var code_point = utf8_code_point;
      var lower_boundary = utf8_lower_boundary;
      utf8_code_point = 0;
      utf8_bytes_needed = 0;
      utf8_bytes_seen = 0;
      utf8_lower_boundary = 0;
      if (inRange(code_point, lower_boundary, 0x10FFFF) &&
          !inRange(code_point, 0xD800, 0xDFFF)) {
        return code_point;
      }
      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function UTF8Encoder(options) {
    var fatal = options.fatal;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      /** @type {number} */
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0xD800, 0xDFFF)) {
        return encoderError(code_point);
      }
      if (inRange(code_point, 0x0000, 0x007f)) {
        return output_byte_stream.emit(code_point);
      }
      var count, offset;
      if (inRange(code_point, 0x0080, 0x07FF)) {
        count = 1;
        offset = 0xC0;
      } else if (inRange(code_point, 0x0800, 0xFFFF)) {
        count = 2;
        offset = 0xE0;
      } else if (inRange(code_point, 0x10000, 0x10FFFF)) {
        count = 3;
        offset = 0xF0;
      }
      var result = output_byte_stream.emit(
          div(code_point, Math.pow(64, count)) + offset);
      while (count > 0) {
        var temp = div(code_point, Math.pow(64, count - 1));
        result = output_byte_stream.emit(0x80 + (temp % 64));
        count -= 1;
      }
      return result;
    };
  }

  /** @param {{fatal: boolean}} options */
  name_to_encoding['utf-8'].getEncoder = function(options) {
    return new UTF8Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['utf-8'].getDecoder = function(options) {
    return new UTF8Decoder(options);
  };

  //
  // 9. Legacy single-byte encodings
  //

  /**
   * @constructor
   * @param {Array.<number>} index The encoding index.
   * @param {{fatal: boolean}} options
   */
  function SingleByteDecoder(index, options) {
    var fatal = options.fatal;
    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite === EOF_byte) {
        return EOF_code_point;
      }
      byte_pointer.offset(1);
      if (inRange(bite, 0x00, 0x7F)) {
        return bite;
      }
      var code_point = index[bite - 0x80];
      if (code_point === null) {
        return decoderError(fatal);
      }
      return code_point;
    };
  }

  /**
   * @constructor
   * @param {Array.<?number>} index The encoding index.
   * @param {{fatal: boolean}} options
   */
  function SingleByteEncoder(index, options) {
    var fatal = options.fatal;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0x0000, 0x007F)) {
        return output_byte_stream.emit(code_point);
      }
      var pointer = indexPointerFor(code_point, index);
      if (pointer === null) {
        encoderError(code_point);
      }
      return output_byte_stream.emit(pointer + 0x80);
    };
  }

  (function() {
    if (!('encoding-indexes' in global))
      return;
    encodings.forEach(function(category) {
      if (category['heading'] !== 'Legacy single-byte encodings')
        return;
      category['encodings'].forEach(function(encoding) {
        var idx = index(encoding['name']);
        /** @param {{fatal: boolean}} options */
        encoding.getDecoder = function(options) {
          return new SingleByteDecoder(idx, options);
        };
        /** @param {{fatal: boolean}} options */
        encoding.getEncoder = function(options) {
          return new SingleByteEncoder(idx, options);
        };
      });
    });
  }());

  //
  // 10. Legacy multi-byte Chinese (simplified) encodings
  //

  // 9.1 gb18030

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function GB18030Decoder(options) {
    var fatal = options.fatal;
    var /** @type {number} */ gb18030_first = 0x00,
        /** @type {number} */ gb18030_second = 0x00,
        /** @type {number} */ gb18030_third = 0x00;
    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite === EOF_byte && gb18030_first === 0x00 &&
          gb18030_second === 0x00 && gb18030_third === 0x00) {
        return EOF_code_point;
      }
      if (bite === EOF_byte &&
          (gb18030_first !== 0x00 || gb18030_second !== 0x00 || gb18030_third !== 0x00)) {
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        gb18030_third = 0x00;
        decoderError(fatal);
      }
      byte_pointer.offset(1);
      var code_point;
      if (gb18030_third !== 0x00) {
        code_point = null;
        if (inRange(bite, 0x30, 0x39)) {
          code_point = indexGB18030CodePointFor(
              (((gb18030_first - 0x81) * 10 + (gb18030_second - 0x30)) * 126 +
               (gb18030_third - 0x81)) * 10 + bite - 0x30);
        }
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        gb18030_third = 0x00;
        if (code_point === null) {
          byte_pointer.offset(-3);
          return decoderError(fatal);
        }
        return code_point;
      }
      if (gb18030_second !== 0x00) {
        if (inRange(bite, 0x81, 0xFE)) {
          gb18030_third = bite;
          return null;
        }
        byte_pointer.offset(-2);
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        return decoderError(fatal);
      }
      if (gb18030_first !== 0x00) {
        if (inRange(bite, 0x30, 0x39)) {
          gb18030_second = bite;
          return null;
        }
        var lead = gb18030_first;
        var pointer = null;
        gb18030_first = 0x00;
        var offset = bite < 0x7F ? 0x40 : 0x41;
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0x80, 0xFE)) {
          pointer = (lead - 0x81) * 190 + (bite - offset);
        }
        code_point = pointer === null ? null :
            indexCodePointFor(pointer, index('gb18030'));
        if (pointer === null) {
          byte_pointer.offset(-1);
        }
        if (code_point === null) {
          return decoderError(fatal);
        }
        return code_point;
      }
      if (inRange(bite, 0x00, 0x7F)) {
        return bite;
      }
      if (bite === 0x80) {
        return 0x20AC;
      }
      if (inRange(bite, 0x81, 0xFE)) {
        gb18030_first = bite;
        return null;
      }
      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function GB18030Encoder(options) {
    var fatal = options.fatal;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0x0000, 0x007F)) {
        return output_byte_stream.emit(code_point);
      }
      var pointer = indexPointerFor(code_point, index('gb18030'));
      if (pointer !== null) {
        var lead = div(pointer, 190) + 0x81;
        var trail = pointer % 190;
        var offset = trail < 0x3F ? 0x40 : 0x41;
        return output_byte_stream.emit(lead, trail + offset);
      }
      pointer = indexGB18030PointerFor(code_point);
      var byte1 = div(div(div(pointer, 10), 126), 10);
      pointer = pointer - byte1 * 10 * 126 * 10;
      var byte2 = div(div(pointer, 10), 126);
      pointer = pointer - byte2 * 10 * 126;
      var byte3 = div(pointer, 10);
      var byte4 = pointer - byte3 * 10;
      return output_byte_stream.emit(byte1 + 0x81,
                                     byte2 + 0x30,
                                     byte3 + 0x81,
                                     byte4 + 0x30);
    };
  }

  /** @param {{fatal: boolean}} options */
  name_to_encoding['gb18030'].getEncoder = function(options) {
    return new GB18030Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['gb18030'].getDecoder = function(options) {
    return new GB18030Decoder(options);
  };

  // 10.2 hz-gb-2312

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function HZGB2312Decoder(options) {
    var fatal = options.fatal;
    var /** @type {boolean} */ hzgb2312 = false,
        /** @type {number} */ hzgb2312_lead = 0x00;
    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite === EOF_byte && hzgb2312_lead === 0x00) {
        return EOF_code_point;
      }
      if (bite === EOF_byte && hzgb2312_lead !== 0x00) {
        hzgb2312_lead = 0x00;
        return decoderError(fatal);
      }
      byte_pointer.offset(1);
      if (hzgb2312_lead === 0x7E) {
        hzgb2312_lead = 0x00;
        if (bite === 0x7B) {
          hzgb2312 = true;
          return null;
        }
        if (bite === 0x7D) {
          hzgb2312 = false;
          return null;
        }
        if (bite === 0x7E) {
          return 0x007E;
        }
        if (bite === 0x0A) {
          return null;
        }
        byte_pointer.offset(-1);
        return decoderError(fatal);
      }
      if (hzgb2312_lead !== 0x00) {
        var lead = hzgb2312_lead;
        hzgb2312_lead = 0x00;
        var code_point = null;
        if (inRange(bite, 0x21, 0x7E)) {
          code_point = indexCodePointFor((lead - 1) * 190 +
                                         (bite + 0x3F), index('gb18030'));
        }
        if (bite === 0x0A) {
          hzgb2312 = false;
        }
        if (code_point === null) {
          return decoderError(fatal);
        }
        return code_point;
      }
      if (bite === 0x7E) {
        hzgb2312_lead = 0x7E;
        return null;
      }
      if (hzgb2312) {
        if (inRange(bite, 0x20, 0x7F)) {
          hzgb2312_lead = bite;
          return null;
        }
        if (bite === 0x0A) {
          hzgb2312 = false;
        }
        return decoderError(fatal);
      }
      if (inRange(bite, 0x00, 0x7F)) {
        return bite;
      }
      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function HZGB2312Encoder(options) {
    var fatal = options.fatal;
    /** @type {boolean} */
    var hzgb2312 = false;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0x0000, 0x007F) && hzgb2312) {
        code_point_pointer.offset(-1);
        hzgb2312 = false;
        return output_byte_stream.emit(0x7E, 0x7D);
      }
      if (code_point === 0x007E) {
        return output_byte_stream.emit(0x7E, 0x7E);
      }
      if (inRange(code_point, 0x0000, 0x007F)) {
        return output_byte_stream.emit(code_point);
      }
      if (!hzgb2312) {
        code_point_pointer.offset(-1);
        hzgb2312 = true;
        return output_byte_stream.emit(0x7E, 0x7B);
      }
      var pointer = indexPointerFor(code_point, index('gb18030'));
      if (pointer === null) {
        return encoderError(code_point);
      }
      var lead = div(pointer, 190) + 1;
      var trail = pointer % 190 - 0x3F;
      if (!inRange(lead, 0x21, 0x7E) || !inRange(trail, 0x21, 0x7E)) {
        return encoderError(code_point);
      }
      return output_byte_stream.emit(lead, trail);
    };
  }

  /** @param {{fatal: boolean}} options */
  name_to_encoding['hz-gb-2312'].getEncoder = function(options) {
    return new HZGB2312Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['hz-gb-2312'].getDecoder = function(options) {
    return new HZGB2312Decoder(options);
  };

  //
  // 11. Legacy multi-byte Chinese (traditional) encodings
  //

  // 11.1 big5

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function Big5Decoder(options) {
    var fatal = options.fatal;
    var /** @type {number} */ big5_lead = 0x00,
        /** @type {?number} */ big5_pending = null;

    /**
     * @param {ByteInputStream} byte_pointer The byte steram to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      // NOTE: Hack to support emitting two code points
      if (big5_pending !== null) {
        var pending = big5_pending;
        big5_pending = null;
        return pending;
      }
      var bite = byte_pointer.get();
      if (bite === EOF_byte && big5_lead === 0x00) {
        return EOF_code_point;
      }
      if (bite === EOF_byte && big5_lead !== 0x00) {
        big5_lead = 0x00;
        return decoderError(fatal);
      }
      byte_pointer.offset(1);
      if (big5_lead !== 0x00) {
        var lead = big5_lead;
        var pointer = null;
        big5_lead = 0x00;
        var offset = bite < 0x7F ? 0x40 : 0x62;
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0xA1, 0xFE)) {
          pointer = (lead - 0x81) * 157 + (bite - offset);
        }
        if (pointer === 1133) {
          big5_pending = 0x0304;
          return 0x00CA;
        }
        if (pointer === 1135) {
          big5_pending = 0x030C;
          return 0x00CA;
        }
        if (pointer === 1164) {
          big5_pending = 0x0304;
          return 0x00EA;
        }
        if (pointer === 1166) {
          big5_pending = 0x030C;
          return 0x00EA;
        }
        var code_point = (pointer === null) ? null :
            indexCodePointFor(pointer, index('big5'));
        if (pointer === null) {
          byte_pointer.offset(-1);
        }
        if (code_point === null) {
          return decoderError(fatal);
        }
        return code_point;
      }
      if (inRange(bite, 0x00, 0x7F)) {
        return bite;
      }
      if (inRange(bite, 0x81, 0xFE)) {
        big5_lead = bite;
        return null;
      }
      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function Big5Encoder(options) {
    var fatal = options.fatal;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0x0000, 0x007F)) {
        return output_byte_stream.emit(code_point);
      }
      var pointer = indexPointerFor(code_point, index('big5'));
      if (pointer === null) {
        return encoderError(code_point);
      }
      var lead = div(pointer, 157) + 0x81;
      //if (lead < 0xA1) {
      //  return encoderError(code_point);
      //}
      var trail = pointer % 157;
      var offset = trail < 0x3F ? 0x40 : 0x62;
      return output_byte_stream.emit(lead, trail + offset);
    };
  }

  /** @param {{fatal: boolean}} options */
  name_to_encoding['big5'].getEncoder = function(options) {
    return new Big5Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['big5'].getDecoder = function(options) {
    return new Big5Decoder(options);
  };


  //
  // 12. Legacy multi-byte Japanese encodings
  //

  // 12.1 euc.jp

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function EUCJPDecoder(options) {
    var fatal = options.fatal;
    var /** @type {number} */ eucjp_first = 0x00,
        /** @type {number} */ eucjp_second = 0x00;
    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite === EOF_byte) {
        if (eucjp_first === 0x00 && eucjp_second === 0x00) {
          return EOF_code_point;
        }
        eucjp_first = 0x00;
        eucjp_second = 0x00;
        return decoderError(fatal);
      }
      byte_pointer.offset(1);

      var lead, code_point;
      if (eucjp_second !== 0x00) {
        lead = eucjp_second;
        eucjp_second = 0x00;
        code_point = null;
        if (inRange(lead, 0xA1, 0xFE) && inRange(bite, 0xA1, 0xFE)) {
          code_point = indexCodePointFor((lead - 0xA1) * 94 + bite - 0xA1,
                                         index('jis0212'));
        }
        if (!inRange(bite, 0xA1, 0xFE)) {
          byte_pointer.offset(-1);
        }
        if (code_point === null) {
          return decoderError(fatal);
        }
        return code_point;
      }
      if (eucjp_first === 0x8E && inRange(bite, 0xA1, 0xDF)) {
        eucjp_first = 0x00;
        return 0xFF61 + bite - 0xA1;
      }
      if (eucjp_first === 0x8F && inRange(bite, 0xA1, 0xFE)) {
        eucjp_first = 0x00;
        eucjp_second = bite;
        return null;
      }
      if (eucjp_first !== 0x00) {
        lead = eucjp_first;
        eucjp_first = 0x00;
        code_point = null;
        if (inRange(lead, 0xA1, 0xFE) && inRange(bite, 0xA1, 0xFE)) {
          code_point = indexCodePointFor((lead - 0xA1) * 94 + bite - 0xA1,
                                         index('jis0208'));
        }
        if (!inRange(bite, 0xA1, 0xFE)) {
          byte_pointer.offset(-1);
        }
        if (code_point === null) {
          return decoderError(fatal);
        }
        return code_point;
      }
      if (inRange(bite, 0x00, 0x7F)) {
        return bite;
      }
      if (bite === 0x8E || bite === 0x8F || (inRange(bite, 0xA1, 0xFE))) {
        eucjp_first = bite;
        return null;
      }
      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function EUCJPEncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0x0000, 0x007F)) {
        return output_byte_stream.emit(code_point);
      }
      if (code_point === 0x00A5) {
        return output_byte_stream.emit(0x5C);
      }
      if (code_point === 0x203E) {
        return output_byte_stream.emit(0x7E);
      }
      if (inRange(code_point, 0xFF61, 0xFF9F)) {
        return output_byte_stream.emit(0x8E, code_point - 0xFF61 + 0xA1);
      }

      var pointer = indexPointerFor(code_point, index('jis0208'));
      if (pointer === null) {
        return encoderError(code_point);
      }
      var lead = div(pointer, 94) + 0xA1;
      var trail = pointer % 94 + 0xA1;
      return output_byte_stream.emit(lead, trail);
    };
  }

  /** @param {{fatal: boolean}} options */
  name_to_encoding['euc-jp'].getEncoder = function(options) {
    return new EUCJPEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['euc-jp'].getDecoder = function(options) {
    return new EUCJPDecoder(options);
  };

  // 12.2 iso-2022-jp

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function ISO2022JPDecoder(options) {
    var fatal = options.fatal;
    /** @enum */
    var state = {
      ASCII: 0,
      escape_start: 1,
      escape_middle: 2,
      escape_final: 3,
      lead: 4,
      trail: 5,
      Katakana: 6
    };
    var /** @type {number} */ iso2022jp_state = state.ASCII,
        /** @type {boolean} */ iso2022jp_jis0212 = false,
        /** @type {number} */ iso2022jp_lead = 0x00;
    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite !== EOF_byte) {
        byte_pointer.offset(1);
      }
      switch (iso2022jp_state) {
        default:
        case state.ASCII:
          if (bite === 0x1B) {
            iso2022jp_state = state.escape_start;
            return null;
          }
          if (inRange(bite, 0x00, 0x7F)) {
            return bite;
          }
          if (bite === EOF_byte) {
            return EOF_code_point;
          }
          return decoderError(fatal);

        case state.escape_start:
          if (bite === 0x24 || bite === 0x28) {
            iso2022jp_lead = bite;
            iso2022jp_state = state.escape_middle;
            return null;
          }
          if (bite !== EOF_byte) {
            byte_pointer.offset(-1);
          }
          iso2022jp_state = state.ASCII;
          return decoderError(fatal);

        case state.escape_middle:
          var lead = iso2022jp_lead;
          iso2022jp_lead = 0x00;
          if (lead === 0x24 && (bite === 0x40 || bite === 0x42)) {
            iso2022jp_jis0212 = false;
            iso2022jp_state = state.lead;
            return null;
          }
          if (lead === 0x24 && bite === 0x28) {
            iso2022jp_state = state.escape_final;
            return null;
          }
          if (lead === 0x28 && (bite === 0x42 || bite === 0x4A)) {
            iso2022jp_state = state.ASCII;
            return null;
          }
          if (lead === 0x28 && bite === 0x49) {
            iso2022jp_state = state.Katakana;
            return null;
          }
          if (bite === EOF_byte) {
            byte_pointer.offset(-1);
          } else {
            byte_pointer.offset(-2);
          }
          iso2022jp_state = state.ASCII;
          return decoderError(fatal);

        case state.escape_final:
          if (bite === 0x44) {
            iso2022jp_jis0212 = true;
            iso2022jp_state = state.lead;
            return null;
          }
          if (bite === EOF_byte) {
            byte_pointer.offset(-2);
          } else {
            byte_pointer.offset(-3);
          }
          iso2022jp_state = state.ASCII;
          return decoderError(fatal);

        case state.lead:
          if (bite === 0x0A) {
            iso2022jp_state = state.ASCII;
            return decoderError(fatal, 0x000A);
          }
          if (bite === 0x1B) {
            iso2022jp_state = state.escape_start;
            return null;
          }
          if (bite === EOF_byte) {
            return EOF_code_point;
          }
          iso2022jp_lead = bite;
          iso2022jp_state = state.trail;
          return null;

        case state.trail:
          iso2022jp_state = state.lead;
          if (bite === EOF_byte) {
            return decoderError(fatal);
          }
          var code_point = null;
          var pointer = (iso2022jp_lead - 0x21) * 94 + bite - 0x21;
          if (inRange(iso2022jp_lead, 0x21, 0x7E) &&
              inRange(bite, 0x21, 0x7E)) {
            code_point = (iso2022jp_jis0212 === false) ?
                indexCodePointFor(pointer, index('jis0208')) :
                indexCodePointFor(pointer, index('jis0212'));
          }
          if (code_point === null) {
            return decoderError(fatal);
          }
          return code_point;

        case state.Katakana:
          if (bite === 0x1B) {
            iso2022jp_state = state.escape_start;
            return null;
          }
          if (inRange(bite, 0x21, 0x5F)) {
            return 0xFF61 + bite - 0x21;
          }
          if (bite === EOF_byte) {
            return EOF_code_point;
          }
          return decoderError(fatal);
      }
    };
  }

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function ISO2022JPEncoder(options) {
    var fatal = options.fatal;
    /** @enum */
    var state = {
      ASCII: 0,
      lead: 1,
      Katakana: 2
    };
    var /** @type {number} */ iso2022jp_state = state.ASCII;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if ((inRange(code_point, 0x0000, 0x007F) ||
           code_point === 0x00A5 || code_point === 0x203E) &&
          iso2022jp_state !== state.ASCII) {
        code_point_pointer.offset(-1);
        iso2022jp_state = state.ASCII;
        return output_byte_stream.emit(0x1B, 0x28, 0x42);
      }
      if (inRange(code_point, 0x0000, 0x007F)) {
        return output_byte_stream.emit(code_point);
      }
      if (code_point === 0x00A5) {
        return output_byte_stream.emit(0x5C);
      }
      if (code_point === 0x203E) {
        return output_byte_stream.emit(0x7E);
      }
      if (inRange(code_point, 0xFF61, 0xFF9F) &&
          iso2022jp_state !== state.Katakana) {
        code_point_pointer.offset(-1);
        iso2022jp_state = state.Katakana;
        return output_byte_stream.emit(0x1B, 0x28, 0x49);
      }
      if (inRange(code_point, 0xFF61, 0xFF9F)) {
        return output_byte_stream.emit(code_point - 0xFF61 - 0x21);
      }
      if (iso2022jp_state !== state.lead) {
        code_point_pointer.offset(-1);
        iso2022jp_state = state.lead;
        return output_byte_stream.emit(0x1B, 0x24, 0x42);
      }
      var pointer = indexPointerFor(code_point, index('jis0208'));
      if (pointer === null) {
        return encoderError(code_point);
      }
      var lead = div(pointer, 94) + 0x21;
      var trail = pointer % 94 + 0x21;
      return output_byte_stream.emit(lead, trail);
    };
  }

  /** @param {{fatal: boolean}} options */
  name_to_encoding['iso-2022-jp'].getEncoder = function(options) {
    return new ISO2022JPEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['iso-2022-jp'].getDecoder = function(options) {
    return new ISO2022JPDecoder(options);
  };

  // 12.3 shift_jis

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function ShiftJISDecoder(options) {
    var fatal = options.fatal;
    var /** @type {number} */ shiftjis_lead = 0x00;
    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite === EOF_byte && shiftjis_lead === 0x00) {
        return EOF_code_point;
      }
      if (bite === EOF_byte && shiftjis_lead !== 0x00) {
        shiftjis_lead = 0x00;
        return decoderError(fatal);
      }
      byte_pointer.offset(1);
      if (shiftjis_lead !== 0x00) {
        var lead = shiftjis_lead;
        shiftjis_lead = 0x00;
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0x80, 0xFC)) {
          var offset = (bite < 0x7F) ? 0x40 : 0x41;
          var lead_offset = (lead < 0xA0) ? 0x81 : 0xC1;
          var code_point = indexCodePointFor((lead - lead_offset) * 188 +
                                             bite - offset, index('jis0208'));
          if (code_point === null) {
            return decoderError(fatal);
          }
          return code_point;
        }
        byte_pointer.offset(-1);
        return decoderError(fatal);
      }
      if (inRange(bite, 0x00, 0x80)) {
        return bite;
      }
      if (inRange(bite, 0xA1, 0xDF)) {
        return 0xFF61 + bite - 0xA1;
      }
      if (inRange(bite, 0x81, 0x9F) || inRange(bite, 0xE0, 0xFC)) {
        shiftjis_lead = bite;
        return null;
      }
      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function ShiftJISEncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0x0000, 0x0080)) {
        return output_byte_stream.emit(code_point);
      }
      if (code_point === 0x00A5) {
        return output_byte_stream.emit(0x5C);
      }
      if (code_point === 0x203E) {
        return output_byte_stream.emit(0x7E);
      }
      if (inRange(code_point, 0xFF61, 0xFF9F)) {
        return output_byte_stream.emit(code_point - 0xFF61 + 0xA1);
      }
      var pointer = indexPointerFor(code_point, index('jis0208'));
      if (pointer === null) {
        return encoderError(code_point);
      }
      var lead = div(pointer, 188);
      var lead_offset = lead < 0x1F ? 0x81 : 0xC1;
      var trail = pointer % 188;
      var offset = trail < 0x3F ? 0x40 : 0x41;
      return output_byte_stream.emit(lead + lead_offset, trail + offset);
    };
  }

  /** @param {{fatal: boolean}} options */
  name_to_encoding['shift_jis'].getEncoder = function(options) {
    return new ShiftJISEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['shift_jis'].getDecoder = function(options) {
    return new ShiftJISDecoder(options);
  };

  //
  // 13. Legacy multi-byte Korean encodings
  //

  // 13.1 euc-kr

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function EUCKRDecoder(options) {
    var fatal = options.fatal;
    var /** @type {number} */ euckr_lead = 0x00;
    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite === EOF_byte && euckr_lead === 0) {
        return EOF_code_point;
      }
      if (bite === EOF_byte && euckr_lead !== 0) {
        euckr_lead = 0x00;
        return decoderError(fatal);
      }
      byte_pointer.offset(1);
      if (euckr_lead !== 0x00) {
        var lead = euckr_lead;
        var pointer = null;
        euckr_lead = 0x00;

        if (inRange(lead, 0x81, 0xC6)) {
          var temp = (26 + 26 + 126) * (lead - 0x81);
          if (inRange(bite, 0x41, 0x5A)) {
            pointer = temp + bite - 0x41;
          } else if (inRange(bite, 0x61, 0x7A)) {
            pointer = temp + 26 + bite - 0x61;
          } else if (inRange(bite, 0x81, 0xFE)) {
            pointer = temp + 26 + 26 + bite - 0x81;
          }
        }

        if (inRange(lead, 0xC7, 0xFD) && inRange(bite, 0xA1, 0xFE)) {
          pointer = (26 + 26 + 126) * (0xC7 - 0x81) + (lead - 0xC7) * 94 +
              (bite - 0xA1);
        }

        var code_point = (pointer === null) ? null :
            indexCodePointFor(pointer, index('euc-kr'));
        if (pointer === null) {
          byte_pointer.offset(-1);
        }
        if (code_point === null) {
          return decoderError(fatal);
        }
        return code_point;
      }

      if (inRange(bite, 0x00, 0x7F)) {
        return bite;
      }

      if (inRange(bite, 0x81, 0xFD)) {
        euckr_lead = bite;
        return null;
      }

      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function EUCKREncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0x0000, 0x007F)) {
        return output_byte_stream.emit(code_point);
      }
      var pointer = indexPointerFor(code_point, index('euc-kr'));
      if (pointer === null) {
        return encoderError(code_point);
      }
      var lead, trail;
      if (pointer < ((26 + 26 + 126) * (0xC7 - 0x81))) {
        lead = div(pointer, (26 + 26 + 126)) + 0x81;
        trail = pointer % (26 + 26 + 126);
        var offset = trail < 26 ? 0x41 : trail < 26 + 26 ? 0x47 : 0x4D;
        return output_byte_stream.emit(lead, trail + offset);
      }
      pointer = pointer - (26 + 26 + 126) * (0xC7 - 0x81);
      lead = div(pointer, 94) + 0xC7;
      trail = pointer % 94 + 0xA1;
      return output_byte_stream.emit(lead, trail);
    };
  }

  /** @param {{fatal: boolean}} options */
  name_to_encoding['euc-kr'].getEncoder = function(options) {
    return new EUCKREncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['euc-kr'].getDecoder = function(options) {
    return new EUCKRDecoder(options);
  };


  //
  // 14. Legacy miscellaneous encodings
  //

  // 14.1 replacement

  // Not needed - API throws TypeError

  // 14.2 utf-16

  /**
   * @constructor
   * @param {boolean} utf16_be True if big-endian, false if little-endian.
   * @param {{fatal: boolean}} options
   */
  function UTF16Decoder(utf16_be, options) {
    var fatal = options.fatal;
    var /** @type {?number} */ utf16_lead_byte = null,
        /** @type {?number} */ utf16_lead_surrogate = null;
    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite === EOF_byte && utf16_lead_byte === null &&
          utf16_lead_surrogate === null) {
        return EOF_code_point;
      }
      if (bite === EOF_byte && (utf16_lead_byte !== null ||
                                utf16_lead_surrogate !== null)) {
        return decoderError(fatal);
      }
      byte_pointer.offset(1);
      if (utf16_lead_byte === null) {
        utf16_lead_byte = bite;
        return null;
      }
      var code_point;
      if (utf16_be) {
        code_point = (utf16_lead_byte << 8) + bite;
      } else {
        code_point = (bite << 8) + utf16_lead_byte;
      }
      utf16_lead_byte = null;
      if (utf16_lead_surrogate !== null) {
        var lead_surrogate = utf16_lead_surrogate;
        utf16_lead_surrogate = null;
        if (inRange(code_point, 0xDC00, 0xDFFF)) {
          return 0x10000 + (lead_surrogate - 0xD800) * 0x400 +
              (code_point - 0xDC00);
        }
        byte_pointer.offset(-2);
        return decoderError(fatal);
      }
      if (inRange(code_point, 0xD800, 0xDBFF)) {
        utf16_lead_surrogate = code_point;
        return null;
      }
      if (inRange(code_point, 0xDC00, 0xDFFF)) {
        return decoderError(fatal);
      }
      return code_point;
    };
  }

  /**
   * @constructor
   * @param {boolean} utf16_be True if big-endian, false if little-endian.
   * @param {{fatal: boolean}} options
   */
  function UTF16Encoder(utf16_be, options) {
    var fatal = options.fatal;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      /**
       * @param {number} code_unit
       * @return {number} last byte emitted
       */
      function convert_to_bytes(code_unit) {
        var byte1 = code_unit >> 8;
        var byte2 = code_unit & 0x00FF;
        if (utf16_be) {
          return output_byte_stream.emit(byte1, byte2);
        }
        return output_byte_stream.emit(byte2, byte1);
      }
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0xD800, 0xDFFF)) {
        encoderError(code_point);
      }
      if (code_point <= 0xFFFF) {
        return convert_to_bytes(code_point);
      }
      var lead = div((code_point - 0x10000), 0x400) + 0xD800;
      var trail = ((code_point - 0x10000) % 0x400) + 0xDC00;
      convert_to_bytes(lead);
      return convert_to_bytes(trail);
    };
  }

  // 14.3 utf-16be
  /** @param {{fatal: boolean}} options */
  name_to_encoding['utf-16be'].getEncoder = function(options) {
    return new UTF16Encoder(true, options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['utf-16be'].getDecoder = function(options) {
    return new UTF16Decoder(true, options);
  };

  // 14.4 utf-16le
  /** @param {{fatal: boolean}} options */
  name_to_encoding['utf-16le'].getEncoder = function(options) {
    return new UTF16Encoder(false, options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['utf-16le'].getDecoder = function(options) {
    return new UTF16Decoder(false, options);
  };

  // 14.5 x-user-defined

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function XUserDefinedDecoder(options) {
    var fatal = options.fatal;
    /**
     * @param {ByteInputStream} byte_pointer The byte stream to decode.
     * @return {?number} The next code point decoded, or null if not enough
     *     data exists in the input stream to decode a complete code point.
     */
    this.decode = function(byte_pointer) {
      var bite = byte_pointer.get();
      if (bite === EOF_byte) {
        return EOF_code_point;
      }
      byte_pointer.offset(1);
      if (inRange(bite, 0x00, 0x7F)) {
        return bite;
      }
      return 0xF780 + bite - 0x80;
    };
  }

  /**
   * @constructor
   * @param {{fatal: boolean}} options
   */
  function XUserDefinedEncoder(index, options) {
    var fatal = options.fatal;
    /**
     * @param {ByteOutputStream} output_byte_stream Output byte stream.
     * @param {CodePointInputStream} code_point_pointer Input stream.
     * @return {number} The last byte emitted.
     */
    this.encode = function(output_byte_stream, code_point_pointer) {
      var code_point = code_point_pointer.get();
      if (code_point === EOF_code_point) {
        return EOF_byte;
      }
      code_point_pointer.offset(1);
      if (inRange(code_point, 0x0000, 0x007F)) {
        return output_byte_stream.emit(code_point);
      }
      if (inRange(code_point, 0xF780, 0xF7FF)) {
        return output_byte_stream.emit(code_point - 0xF780 + 0x80);
      }
      encoderError(code_point);
    };
  }

  /** @param {{fatal: boolean}} options */
  name_to_encoding['x-user-defined'].getEncoder = function(options) {
    return new XUserDefinedEncoder(false, options);
  };
  /** @param {{fatal: boolean}} options */
  name_to_encoding['x-user-defined'].getDecoder = function(options) {
    return new XUserDefinedDecoder(false, options);
  };

  // NOTE: currently unused
  /**
   * @param {string} label The encoding label.
   * @param {ByteInputStream} input_stream The byte stream to test.
   */
  function detectEncoding(label, input_stream) {
    if (input_stream.match([0xFF, 0xFE])) {
      input_stream.offset(2);
      return 'utf-16le';
    }
    if (input_stream.match([0xFE, 0xFF])) {
      input_stream.offset(2);
      return 'utf-16be';
    }
    if (input_stream.match([0xEF, 0xBB, 0xBF])) {
      input_stream.offset(3);
      return 'utf-8';
    }
    return label;
  }

  if (!('TextEncoder' in global)) global['TextEncoder'] = TextEncoder;
  if (!('TextDecoder' in global)) global['TextDecoder'] = TextDecoder;
}(this));
