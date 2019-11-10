(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Expose `Emitter`.
 */
module.exports = Emitter;
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */
function Emitter(obj) {
  if (obj) return mixin(obj);
};
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */
function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }
  on.fn = fn;
  this.on(event, on);
  return this;
};
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */
Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }
  return this;
};
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */
Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */
Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};
},{}],2:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('domready', function (ready) {
  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    , loaded = loadedRgx.test(doc[readyState])
  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }
  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)
  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })
  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})
},{}],3:[function(require,module,exports){
(function (global){
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  var isLoader = typeof define === "function" && define.amd;
  var objectTypes = {
    "function": true,
    "object": true
  };
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;
  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;
    var isExtended = new Date(-3509827334573292);
    try {
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}
    function has(name) {
      if (has[name] !== undef) {
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                stringify(0) === "0" &&
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                stringify(getClass) === undef &&
                stringify(undef) === undef &&
                stringify() === undef &&
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                stringify([undef]) == "[null]" &&
                stringify(null) == "null" &&
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              if (parse("0") === 0 && !parse(false)) {
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }
    if (!has("json")) {
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";
      var charIndexBuggy = has("bug-string-char-index");
      if (!isExtended) {
        var floor = Math.floor;
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            "toString": 1
          }, members).toString != getClass) {
            isProperty = function (property) {
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              this.__proto__ = original;
              return result;
            };
          } else {
            constructor = members.constructor;
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;
        members = new Properties();
        for (property in members) {
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;
        if (!size) {
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          forEach = function (object, callback) {
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };
      if (!has("json-stringify")) {
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          return (leadingZeroes + (value || 0)).slice(-width);
        };
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                if (getDay) {
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  time = (value % 864e5 + 864e5) % 864e5;
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              value = value.toJSON(property);
            }
          }
          if (callback) {
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            return "" + value;
          } else if (className == numberClass) {
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            return quote("" + value);
          }
          if (typeof value == "object") {
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                throw TypeError();
              }
            }
            stack.push(value);
            results = [];
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            stack.pop();
            return result;
          }
        };
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };
        var Index, Source;
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    abort();
                  } else if (charCode == 92) {
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            abort();
                          }
                        }
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  Index++;
                  return value;
                }
                abort();
              default:
                begin = Index;
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                if (charCode >= 48 && charCode <= 57) {
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    abort();
                  }
                  isSigned = false;
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      abort();
                    }
                    Index = position;
                  }
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      abort();
                    }
                    Index = position;
                  }
                  return +source.slice(begin, Index);
                }
                if (isSigned) {
                  abort();
                }
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                abort();
            }
          }
          return "$";
        };
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              return value.slice(1);
            }
            if (value == "[") {
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                if (value == "]") {
                  break;
                }
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      abort();
                    }
                  } else {
                    abort();
                  }
                }
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                if (value == "}") {
                  break;
                }
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      abort();
                    }
                  } else {
                    abort();
                  }
                }
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            abort();
          }
          return value;
        };
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          if (lex() != "$") {
            abort();
          }
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }
    exports["runInContext"] = runInContext;
    return exports;
  }
  if (freeExports && !isLoader) {
    runInContext(root, freeExports);
  } else {
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;
    var JSON3 = runInContext(root, (root["JSON3"] = {
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));
    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
/**
 * Module dependencies.
 */
var Emitter = require('emitter');
var reduce = require('reduce');
/**
 * Root reference for iframes.
 */
var root = 'undefined' == typeof window
  ? this
  : window;
/**
 * Noop.
 */
function noop(){};
/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isHost(obj) {
  var str = {}.toString.call(obj);
  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}
/**
 * Determine XHR.
 */
function getXHR() {
  if (root.XMLHttpRequest
    && ('file:' != root.location.protocol || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
}
/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */
var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };
/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isObject(obj) {
  return obj === Object(obj);
}
/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */
function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(obj[key]));
    }
  }
  return pairs.join('&');
}
/**
 * Expose serialization method.
 */
 request.serializeObject = serialize;
 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */
function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;
  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }
  return obj;
}
/**
 * Expose parser.
 */
request.parseString = parseString;
/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */
request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};
/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */
 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };
 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */
request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};
/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */
function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;
  lines.pop();
  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }
  return fields;
}
/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
function type(str){
  return str.split(/ *; */).shift();
};
/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */
function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();
    if (key && val) obj[key] = val;
    return obj;
  }, {});
};
/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */
function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  this.text = this.req.method !='HEAD' 
     ? this.xhr.responseText 
     : null;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text)
    : null;
}
/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */
Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};
/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */
Response.prototype.setHeaderProperties = function(header){
  var ct = this.header['content-type'] || '';
  this.type = type(ct);
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};
/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */
Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse && str && str.length
    ? parse(str)
    : null;
};
/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */
Response.prototype.setStatusProperties = function(status){
  var type = status / 100 | 0;
  this.status = status;
  this.statusType = type;
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;
  this.accepted = 202 == status;
  this.noContent = 204 == status || 1223 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};
/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */
Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;
  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;
  return err;
};
/**
 * Expose `Response`.
 */
request.Response = Response;
/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */
function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var err = null;
    var res = null;
    try {
      res = new Response(self); 
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
    }
    self.callback(err, res);
  });
}
/**
 * Mixin `Emitter`.
 */
Emitter(Request.prototype);
/**
 * Allow for extension
 */
Request.prototype.use = function(fn) {
  fn(this);
  return this;
}
/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};
/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};
/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};
/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};
/**
 * Remove header `field`.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};
/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */
Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};
/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};
/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};
/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};
/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/
Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};
/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new FormData();
  this._formData.append(name, val);
  return this;
};
/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new FormData();
  this._formData.append(field, file, filename);
  return this;
};
/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *      
 *       request.get('/search')
 *         .end(callback)
 *
 *      
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *      
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"})
 *         .end(callback)
 *
 *      
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *      
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *      
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *      
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }
  if (!obj) return this;
  if (!type) this.type('json');
  return this;
};
/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */
Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  if (2 == fn.length) return fn(err, res);
  if (err) return this.emit('error', err);
  fn(res);
};
/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */
Request.prototype.crossDomainError = function(){
  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
  err.crossDomain = true;
  this.callback(err);
};
/**
 * Invoke callback with timeout error.
 *
 * @api private
 */
Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};
/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */
Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};
/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */
Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;
  this._callback = fn || noop;
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;
    if (0 == xhr.status) {
      if (self.aborted) return self.timeoutError();
      return self.crossDomainError();
    }
    self.emit('end');
  };
  if (xhr.upload) {
    xhr.upload.onprogress = function(e){
      e.percent = e.loaded / e.total * 100;
      self.emit('progress', e);
    };
  }
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.abort();
    }, timeout);
  }
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }
  xhr.open(this.method, this.url, true);
  if (this._withCredentials) xhr.withCredentials = true;
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    var serialize = request.serialize[this.getHeader('Content-Type')];
    if (serialize) data = serialize(data);
  }
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }
  this.emit('request', this);
  xhr.send(data);
  return this;
};
/**
 * Expose `Request`.
 */
request.Request = Request;
/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */
function request(method, url) {
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }
  if (1 == arguments.length) {
    return new Request('GET', method);
  }
  return new Request(method, url);
}
/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */
request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */
request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */
request.del = function(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};
/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */
request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */
request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */
request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * Expose `request`.
 */
module.exports = request;
},{"emitter":5,"reduce":6}],5:[function(require,module,exports){
/**
 * Expose `Emitter`.
 */
module.exports = Emitter;
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */
function Emitter(obj) {
  if (obj) return mixin(obj);
};
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */
function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};
  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }
  on.fn = fn;
  this.on(event, on);
  return this;
};
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */
Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }
  return this;
};
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */
Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */
Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};
},{}],6:[function(require,module,exports){
/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */
module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];
  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  return curr;
};
},{}],7:[function(require,module,exports){
var Keen = require("./index"),
    each = require("./utils/each");
module.exports = function(){
  var loaded = window['Keen'] || null,
      cached = window['_' + 'Keen'] || null,
      clients,
      ready;
  if (loaded && cached) {
    clients = cached['clients'] || {},
    ready = cached['ready'] || [];
    each(clients, function(client, id){
      each(Keen.prototype, function(method, key){
        loaded.prototype[key] = method;
      });
      each(["Query", "Request", "Dataset", "Dataviz"], function(name){
        loaded[name] = (Keen[name]) ? Keen[name] : function(){};
      });
      if (client._config) {
        client.configure.call(client, client._config);
      }
      if (client._setGlobalProperties) {
        each(client._setGlobalProperties, function(fn){
          client.setGlobalProperties.apply(client, fn);
        });
      }
      if (client._addEvent) {
        each(client._addEvent, function(obj){
          client.addEvent.apply(client, obj);
        });
      }
      var callback = client._on || [];
      if (client._on) {
        each(client._on, function(obj){
          client.on.apply(client, obj);
        });
        client.trigger('ready');
      }
      each(["_config", "_setGlobalProperties", "_addEvent", "_on"], function(name){
        if (client[name]) {
          client[name] = undefined;
          try{
            delete client[name];
          } catch(e){}
        }
      });
    });
    each(ready, function(cb, i){
      Keen.once("ready", cb);
    });
  }
  window['_' + 'Keen'] = undefined;
  try {
    delete window['_' + 'Keen']
  } catch(e) {}
};
},{"./index":14,"./utils/each":20}],8:[function(require,module,exports){
module.exports = function(){
  return "undefined" == typeof window ? "server" : "browser";
};
},{}],9:[function(require,module,exports){
var each = require('../utils/each'),
    json = require('../utils/json-shim');
module.exports = function(params){
  var query = [];
  each(params, function(value, key){
    if ('string' !== typeof value) {
      value = json.stringify(value);
    }
    query.push(key + '=' + encodeURIComponent(value));
  });
  return '?' + query.join('&');
};
},{"../utils/each":20,"../utils/json-shim":23}],10:[function(require,module,exports){
module.exports = function(){
  if ("undefined" !== typeof window) {
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      return 2000;
    }
  }
  return 16000;
};
},{}],11:[function(require,module,exports){
module.exports = function() {
  var root = "undefined" == typeof window ? this : window;
  if (root.XMLHttpRequest && ("file:" != root.location.protocol || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch(e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch(e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {}
  }
  return false;
};
},{}],12:[function(require,module,exports){
module.exports = function(err, res, callback) {
  var cb = callback || function() {};
  if (res && !res.ok) {
    var is_err = res.body && res.body.error_code;
    err = new Error(is_err ? res.body.message : 'Unknown error occurred');
    err.code = is_err ? res.body.error_code : 'UnknownError';
  }
  if (err) {
    cb(err, null);
  }
  else {
    cb(null, res.body);
  }
  return;
};
},{}],13:[function(require,module,exports){
var superagent = require('superagent');
var each = require('../utils/each'),
    getXHR = require('./get-xhr-object');
module.exports = function(type, opts){
  return function(request) {
    var __super__ = request.constructor.prototype.end;
    if ( typeof window === 'undefined' ) return;
    request.requestType = request.requestType || {};
    request.requestType['type'] = type;
    request.requestType['options'] = request.requestType['options'] || {
      async: true,
      success: {
        responseText: '{ "created": true }',
        status: 201
      },
      error: {
        responseText: '{ "error_code": "ERROR", "message": "Request failed" }',
        status: 404
      }
    };
    if (opts) {
      if ( typeof opts.async === 'boolean' ) {
        request.requestType['options'].async = opts.async;
      }
      if ( opts.success ) {
        extend(request.requestType['options'].success, opts.success);
      }
      if ( opts.error ) {
        extend(request.requestType['options'].error, opts.error);
      }
    }
    request.end = function(fn){
      var self = this,
          reqType = (this.requestType) ? this.requestType['type'] : 'xhr',
          query,
          timeout;
      if ( ('GET' !== self['method'] ||  reqType === 'xhr' ) && self.requestType['options'].async ) {
        __super__.call(self, fn);
        return;
      }
      query = self._query.join('&');
      timeout = self._timeout;
      self._callback = fn || noop;
      if (timeout && !self._timer) {
        self._timer = setTimeout(function(){
          abortRequest.call(self);
        }, timeout);
      }
      if (query) {
        query = superagent.serializeObject(query);
        self.url += ~self.url.indexOf('?') ? '&' + query : '?' + query;
      }
      self.emit('request', self);
      if ( !self.requestType['options'].async ) {
        sendXhrSync.call(self);
      }
      else if ( reqType === 'jsonp' ) {
        sendJsonp.call(self);
      }
      else if ( reqType === 'beacon' ) {
        sendBeacon.call(self);
      }
      return self;
    };
    return request;
  };
};
function sendXhrSync(){
  var xhr = getXHR();
  if (xhr) {
    xhr.open('GET', this.url, false);
    xhr.send(null);
  }
  return this;
}
function sendJsonp(){
  var self = this,
      timestamp = new Date().getTime(),
      script = document.createElement('script'),
      parent = document.getElementsByTagName('head')[0],
      callbackName = 'keenJSONPCallback',
      loaded = false;
  callbackName += timestamp;
  while (callbackName in window) {
    callbackName += 'a';
  }
  window[callbackName] = function(response) {
    if (loaded === true) return;
    loaded = true;
    handleSuccess.call(self, response);
    cleanup();
  };
  script.src = self.url + '&jsonp=' + callbackName;
  parent.appendChild(script);
  script.onreadystatechange = function() {
    if (loaded === false && self.readyState === 'loaded') {
      loaded = true;
      handleError.call(self);
      cleanup();
    }
  };
  script.onerror = function() {
    if (loaded === false) {
      loaded = true;
      handleError.call(self);
      cleanup();
    }
  };
  function cleanup(){
    window[callbackName] = undefined;
    try {
      delete window[callbackName];
    } catch(e){}
    parent.removeChild(script);
  }
}
function sendBeacon(){
  var self = this,
      img = document.createElement('img'),
      loaded = false;
  img.onload = function() {
    loaded = true;
    if ('naturalHeight' in this) {
      if (this.naturalHeight + this.naturalWidth === 0) {
        this.onerror();
        return;
      }
    } else if (this.width + this.height === 0) {
      this.onerror();
      return;
    }
    handleSuccess.call(self);
  };
  img.onerror = function() {
    loaded = true;
    handleError.call(self);
  };
  img.src = self.url + '&c=clv1';
}
function handleSuccess(res){
  var opts = this.requestType['options']['success'],
      response = '';
  xhrShim.call(this, opts);
  if (res) {
    try {
      response = JSON.stringify(res);
    } catch(e) {}
  }
  else {
    response = opts['responseText'];
  }
  this.xhr.responseText = response;
  this.xhr.status = opts['status'];
  this.emit('end');
}
function handleError(){
  var opts = this.requestType['options']['error'];
  xhrShim.call(this, opts);
  this.xhr.responseText = opts['responseText'];
  this.xhr.status = opts['status'];
  this.emit('end');
}
function abortRequest(){
  this.aborted = true;
  this.clearTimeout();
  this.emit('abort');
}
function xhrShim(opts){
  this.xhr = {
    getAllResponseHeaders: function(){ return ''; },
    getResponseHeader: function(){ return 'application/json'; },
    responseText: opts['responseText'],
    status: opts['status']
  };
  return this;
}
},{"../utils/each":20,"./get-xhr-object":11,"superagent":4}],14:[function(require,module,exports){
var root = 'undefined' !== typeof window ? window : this;
var previous_Keen = root.Keen;
var Emitter = require('./utils/emitter-shim');
function Keen(config) {
  this.configure(config || {});
  Keen.trigger('client', this);
}
Keen.debug = false;
Keen.enabled = true;
Keen.loaded = true;
Keen.version = '3.3.0';
Emitter(Keen);
Emitter(Keen.prototype);
Keen.prototype.configure = function(cfg){
  var config = cfg || {};
  if (config['host']) {
    config['host'].replace(/.*?:\/\//g, '');
  }
  if (config.protocol && config.protocol === 'auto') {
    config['protocol'] = location.protocol.replace(/:/g, '');
  }
  this.config = {
    projectId   : config.projectId,
    writeKey    : config.writeKey,
    readKey     : config.readKey,
    masterKey   : config.masterKey,
    requestType : config.requestType || 'jsonp',
    host        : config['host']     || 'api.keen.io/3.0',
    protocol    : config['protocol'] || 'https',
    globalProperties: null
  };
  if (Keen.debug) {
    this.on('error', Keen.log);
  }
  this.trigger('ready');
};
Keen.prototype.projectId = function(str){
  if (!arguments.length) return this.config.projectId;
  this.config.projectId = (str ? String(str) : null);
  return this;
};
Keen.prototype.masterKey = function(str){
  if (!arguments.length) return this.config.masterKey;
  this.config.masterKey = (str ? String(str) : null);
  return this;
};
Keen.prototype.readKey = function(str){
  if (!arguments.length) return this.config.readKey;
  this.config.readKey = (str ? String(str) : null);
  return this;
};
Keen.prototype.writeKey = function(str){
  if (!arguments.length) return this.config.writeKey;
  this.config.writeKey = (str ? String(str) : null);
  return this;
};
Keen.prototype.url = function(path){
  if (!this.projectId()) {
    this.trigger('error', 'Client is missing projectId property');
    return;
  }
  return this.config.protocol + '://' + this.config.host + '/projects/' + this.projectId() + path;
};
Keen.log = function(message) {
  if (Keen.debug && typeof console == 'object') {
    console.log('[Keen IO]', message);
  }
};
Keen.noConflict = function(){
  root.Keen = previous_Keen;
  return Keen;
};
Keen.ready = function(fn){
  if (Keen.loaded) {
    fn();
  } else {
    Keen.once('ready', fn);
  }
};
module.exports = Keen;
},{"./utils/emitter-shim":21}],15:[function(require,module,exports){
var json = require('../utils/json-shim');
var request = require('superagent');
var Keen = require('../index');
var base64 = require('../utils/base64'),
    each = require('../utils/each'),
    getContext = require('../helpers/get-context'),
    getQueryString = require('../helpers/get-query-string'),
    getUrlMaxLength = require('../helpers/get-url-max-length'),
    getXHR = require('../helpers/get-xhr-object'),
    requestTypes = require('../helpers/superagent-request-types'),
    responseHandler = require('../helpers/superagent-handle-response');
module.exports = function(collection, payload, callback, async) {
  var self = this,
      urlBase = this.url('/events/' + encodeURIComponent(collection)),
      reqType = this.config.requestType,
      data = {},
      cb = callback,
      isAsync,
      getUrl;
  isAsync = ('boolean' === typeof async) ? async : true;
  if (!Keen.enabled) {
    handleValidationError.call(self, 'Keen.enabled = false');
    return;
  }
  if (!self.projectId()) {
    handleValidationError.call(self, 'Missing projectId property');
    return;
  }
  if (!self.writeKey()) {
    handleValidationError.call(self, 'Missing writeKey property');
    return;
  }
  if (!collection || typeof collection !== 'string') {
    handleValidationError.call(self, 'Collection name must be a string');
    return;
  }
  if (self.config.globalProperties) {
    data = self.config.globalProperties(collection);
  }
  each(payload, function(value, key){
    data[key] = value;
  });
  if ( !getXHR() && 'xhr' === reqType ) {
    reqType = 'jsonp';
  }
  if ( 'xhr' !== reqType || !isAsync ) {
    getUrl = prepareGetRequest.call(self, urlBase, data);
  }
  if ( getUrl && getContext() === 'browser' ) {
    request
      .get(getUrl)
      .use(requestTypes(reqType, { async: isAsync }))
      .end(handleResponse);
  }
  else if ( getXHR() || getContext() === 'server' ) {
    request
      .post(urlBase)
      .set('Content-Type', 'application/json')
      .set('Authorization', self.writeKey())
      .send(data)
      .end(handleResponse);
  }
  else {
    self.trigger('error', 'Request not sent: URL length exceeds current browser limit, and XHR (POST) is not supported.');
  }
  function handleResponse(err, res){
    responseHandler(err, res, cb);
    cb = callback = null;
  }
  function handleValidationError(msg){
    var err = 'Event not recorded: ' + msg;
    self.trigger('error', err);
    if (cb) {
      cb.call(self, err, null);
      cb = callback = null;
    }
  }
  return;
};
function prepareGetRequest(url, data){
  url += getQueryString({
    api_key  : this.writeKey(),
    data     : base64.encode( json.stringify(data) ),
    modified : new Date().getTime()
  });
  return ( url.length < getUrlMaxLength() ) ? url : false;
}
},{"../helpers/get-context":8,"../helpers/get-query-string":9,"../helpers/get-url-max-length":10,"../helpers/get-xhr-object":11,"../helpers/superagent-handle-response":12,"../helpers/superagent-request-types":13,"../index":14,"../utils/base64":19,"../utils/each":20,"../utils/json-shim":23,"superagent":4}],16:[function(require,module,exports){
var Keen = require('../index');
var request = require('superagent');
var each = require('../utils/each'),
    getContext = require('../helpers/get-context'),
    getXHR = require('../helpers/get-xhr-object'),
    requestTypes = require('../helpers/superagent-request-types'),
    responseHandler = require('../helpers/superagent-handle-response');
module.exports = function(payload, callback) {
  var self = this,
      urlBase = this.url('/events'),
      data = {},
      cb = callback;
  if (!Keen.enabled) {
    handleValidationError.call(self, 'Keen.enabled = false');
    return;
  }
  if (!self.projectId()) {
    handleValidationError.call(self, 'Missing projectId property');
    return;
  }
  if (!self.writeKey()) {
    handleValidationError.call(self, 'Missing writeKey property');
    return;
  }
  if (arguments.length > 2) {
    handleValidationError.call(self, 'Incorrect arguments provided to #addEvents method');
    return;
  }
  if (typeof payload !== 'object' || payload instanceof Array) {
    handleValidationError.call(self, 'Request payload must be an object');
    return;
  }
  if (self.config.globalProperties) {
    each(payload, function(events, collection){
      each(events, function(body, index){
        var base = self.config.globalProperties(collection);
        each(body, function(value, key){
          base[key] = value;
        });
        data[collection].push(base);
      });
    });
  }
  else {
    data = payload;
  }
  if ( getXHR() || getContext() === 'server' ) {
    request
      .post(urlBase)
      .set('Content-Type', 'application/json')
      .set('Authorization', self.writeKey())
      .send(data)
      .end(function(err, res){
        responseHandler(err, res, cb);
        cb = callback = null;
      });
  }
  else {
    self.trigger('error', 'Events not recorded: XHR support is required for batch upload');
  }
  function handleValidationError(msg){
    var err = 'Events not recorded: ' + msg;
    self.trigger('error', err);
    if (cb) {
      cb.call(self, err, null);
      cb = callback = null;
    }
  }
  return;
};
},{"../helpers/get-context":8,"../helpers/get-xhr-object":11,"../helpers/superagent-handle-response":12,"../helpers/superagent-request-types":13,"../index":14,"../utils/each":20,"superagent":4}],17:[function(require,module,exports){
module.exports = function(newGlobalProperties) {
  if (newGlobalProperties && typeof(newGlobalProperties) == "function") {
    this.config.globalProperties = newGlobalProperties;
  } else {
    this.trigger("error", "Invalid value for global properties: " + newGlobalProperties);
  }
};
},{}],18:[function(require,module,exports){
var addEvent = require("./addEvent");
module.exports = function(jsEvent, eventCollection, payload, timeout, timeoutCallback){
  var evt = jsEvent,
      target = (evt.currentTarget) ? evt.currentTarget : (evt.srcElement || evt.target),
      timer = timeout || 500,
      triggered = false,
      targetAttr = "",
      callback,
      win;
  if (target.getAttribute !== void 0) {
    targetAttr = target.getAttribute("target");
  } else if (target.target) {
    targetAttr = target.target;
  }
  if ((targetAttr == "_blank" || targetAttr == "blank") && !evt.metaKey) {
    win = window.open("about:blank");
    win.document.location = target.href;
  }
  if (target.nodeName === "A") {
    callback = function(){
      if(!triggered && !evt.metaKey && (targetAttr !== "_blank" && targetAttr !== "blank")){
        triggered = true;
        window.location = target.href;
      }
    };
  } else if (target.nodeName === "FORM") {
    callback = function(){
      if(!triggered){
        triggered = true;
        target.submit();
      }
    };
  } else {
    this.trigger("error", "#trackExternalLink method not attached to an <a> or <form> DOM element");
  }
  if (timeoutCallback) {
    callback = function(){
      if(!triggered){
        triggered = true;
        timeoutCallback();
      }
    };
  }
  addEvent.call(this, eventCollection, payload, callback);
  setTimeout(callback, timer);
  if (!evt.metaKey) {
    return false;
  }
};
},{"./addEvent":15}],19:[function(require,module,exports){
module.exports = {
  map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function (n) {
    "use strict";
    var o = "", i = 0, m = this.map, i1, i2, i3, e1, e2, e3, e4;
    n = this.utf8.encode(n);
    while (i < n.length) {
      i1 = n.charCodeAt(i++); i2 = n.charCodeAt(i++); i3 = n.charCodeAt(i++);
      e1 = (i1 >> 2); e2 = (((i1 & 3) << 4) | (i2 >> 4)); e3 = (isNaN(i2) ? 64 : ((i2 & 15) << 2) | (i3 >> 6));
      e4 = (isNaN(i2) || isNaN(i3)) ? 64 : i3 & 63;
      o = o + m.charAt(e1) + m.charAt(e2) + m.charAt(e3) + m.charAt(e4);
    } return o;
  },
  decode: function (n) {
    "use strict";
    var o = "", i = 0, m = this.map, cc = String.fromCharCode, e1, e2, e3, e4, c1, c2, c3;
    n = n.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < n.length) {
      e1 = m.indexOf(n.charAt(i++)); e2 = m.indexOf(n.charAt(i++));
      e3 = m.indexOf(n.charAt(i++)); e4 = m.indexOf(n.charAt(i++));
      c1 = (e1 << 2) | (e2 >> 4); c2 = ((e2 & 15) << 4) | (e3 >> 2);
      c3 = ((e3 & 3) << 6) | e4;
      o = o + (cc(c1) + ((e3 != 64) ? cc(c2) : "")) + (((e4 != 64) ? cc(c3) : ""));
    } return this.utf8.decode(o);
  },
  utf8: {
    encode: function (n) {
      "use strict";
      var o = "", i = 0, cc = String.fromCharCode, c;
      while (i < n.length) {
        c = n.charCodeAt(i++); o = o + ((c < 128) ? cc(c) : ((c > 127) && (c < 2048)) ?
        (cc((c >> 6) | 192) + cc((c & 63) | 128)) : (cc((c >> 12) | 224) + cc(((c >> 6) & 63) | 128) + cc((c & 63) | 128)));
        } return o;
    },
    decode: function (n) {
      "use strict";
      var o = "", i = 0, cc = String.fromCharCode, c2, c;
      while (i < n.length) {
        c = n.charCodeAt(i);
        o = o + ((c < 128) ? [cc(c), i++][0] : ((c > 191) && (c < 224)) ?
        [cc(((c & 31) << 6) | ((c2 = n.charCodeAt(i + 1)) & 63)), (i += 2)][0] :
        [cc(((c & 15) << 12) | (((c2 = n.charCodeAt(i + 1)) & 63) << 6) | ((c3 = n.charCodeAt(i + 2)) & 63)), (i += 3)][0]);
      } return o;
    }
  }
};
},{}],20:[function(require,module,exports){
module.exports = function(o, cb, s){
  var n;
  if (!o){
    return 0;
  }
  s = !s ? o : s;
  if (o instanceof Array){
    for (n=0; n<o.length; n++) {
      if (cb.call(s, o[n], n, o) === false){
        return 0;
      }
    }
  } else {
    for (n in o){
      if (o.hasOwnProperty(n)) {
        if (cb.call(s, o[n], n, o) === false){
          return 0;
        }
      }
    }
  }
  return 1;
};
},{}],21:[function(require,module,exports){
var Emitter = require('component-emitter');
Emitter.prototype.trigger = Emitter.prototype.emit;
module.exports = Emitter;
},{"component-emitter":1}],22:[function(require,module,exports){
module.exports = function(target){
  for (var i = 1; i < arguments.length; i++) {
    for (var prop in arguments[i]){
      target[prop] = arguments[i][prop];
    }
  }
  return target;
};
},{}],23:[function(require,module,exports){
module.exports = ('undefined' !== typeof window && window.JSON) ? window.JSON : require("json3");
},{"json3":3}],24:[function(require,module,exports){
function parseParams(str){
  var urlParams = {},
      match,
      pl     = /\+/g, 
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
      query  = str.split("?")[1];
  while (!!(match=search.exec(query))) {
    urlParams[decode(match[1])] = decode(match[2]);
  }
  return urlParams;
};
module.exports = parseParams;
},{}],25:[function(require,module,exports){
(function (global){
;(function (f) {
  if (typeof define === "function" && define.amd) {
    define("keen", [], function(){ return f(); });
  }
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  }
  var g = null;
  if (typeof window !== "undefined") {
    g = window;
  } else if (typeof global !== "undefined") {
    g = global;
  } else if (typeof self !== "undefined") {
    g = self;
  }
  if (g) {
    g.Keen = f();
  }
})(function() {
  "use strict";
  var Keen = require("./core"),
      extend = require("./core/utils/extend");
  extend(Keen.prototype, {
    "addEvent"            : require("./core/lib/addEvent"),
    "addEvents"           : require("./core/lib/addEvents"),
    "setGlobalProperties" : require("./core/lib/setGlobalProperties"),
    "trackExternalLink"   : require("./core/lib/trackExternalLink")
  });
  Keen.Base64 = require("./core/utils/base64");
  Keen.utils = {
    "domready"     : require("domready"),
    "each"         : require("./core/utils/each"),
    "extend"       : extend,
    "parseParams"  : require("./core/utils/parseParams")
  };
  if (Keen.loaded) {
    setTimeout(function(){
      Keen.utils.domready(function(){
        Keen.emit("ready");
      });
    }, 0);
  }
  require("./core/async")();
  module.exports = Keen;
  return Keen;
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./core":14,"./core/async":7,"./core/lib/addEvent":15,"./core/lib/addEvents":16,"./core/lib/setGlobalProperties":17,"./core/lib/trackExternalLink":18,"./core/utils/base64":19,"./core/utils/each":20,"./core/utils/extend":22,"./core/utils/parseParams":24,"domready":2}]},{},[25]);
