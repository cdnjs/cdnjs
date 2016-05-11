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
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 * http://spin.js.org/
 *
 * Example:
    var opts = {
      lines: 12            
    , length: 7            
    , width: 5             
    , radius: 10           
    , scale: 1.0           
    , corners: 1           
    , color: '#000'        
    , opacity: 1/4         
    , rotate: 0            
    , direction: 1         
    , speed: 1             
    , trail: 100           
    , fps: 20              
    , zIndex: 2e9          
    , className: 'spinner' 
    , top: '50%'           
    , left: '50%'          
    , shadow: false        
    , hwaccel: false       
    , position: 'absolute' 
    }
    var target = document.getElementById('foo')
    var spinner = new Spinner(opts).spin(target)
 */
;(function (root, factory) {
  /* CommonJS */
  if (typeof exports == 'object') module.exports = factory()
  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)
  /* Browser global */
  else root.Spinner = factory()
}(this, function () {
  "use strict"
  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */
    , sheet /* A stylesheet to hold the @keyframe or VML rules. */
  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl (tag, prop) {
    var el = document.createElement(tag || 'div')
      , n
    for (n in prop) el[n] = prop[n]
    return el
  }
  /**
   * Appends children and returns the parent.
   */
  function ins (parent /* child1, child2, ...*/) {
    for (var i = 1, n = arguments.length; i < n; i++) {
      parent.appendChild(arguments[i])
    }
    return parent
  }
  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation (alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''
    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)
      animations[name] = 1
    }
    return name
  }
  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor (el, prop) {
    var s = el.style
      , pp
      , i
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    if (s[prop] !== undefined) return prop
    for (i = 0; i < prefixes.length; i++) {
      pp = prefixes[i]+prop
      if (s[pp] !== undefined) return pp
    }
  }
  /**
   * Sets multiple style properties at once.
   */
  function css (el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n) || n] = prop[n]
    }
    return el
  }
  /**
   * Fills in default values.
   */
  function merge (obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n]
      }
    }
    return obj
  }
  /**
   * Returns the line color from the given string or array.
   */
  function getColor (color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }
  var defaults = {
    lines: 12            
  , length: 7            
  , width: 5             
  , radius: 10           
  , scale: 1.0           
  , corners: 1           
  , color: '#000'        
  , opacity: 1/4         
  , rotate: 0            
  , direction: 1         
  , speed: 1             
  , trail: 100           
  , fps: 20              
  , zIndex: 2e9          
  , className: 'spinner' 
  , top: '50%'           
  , left: '50%'          
  , shadow: false        
  , hwaccel: false       
  , position: 'absolute' 
  }
  /** The constructor */
  function Spinner (o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }
  Spinner.defaults = {}
  merge(Spinner.prototype, {
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function (target) {
      this.stop()
      var self = this
        , o = self.opts
        , el = self.el = createEl(null, {className: o.className})
      css(el, {
        position: o.position
      , width: 0
      , zIndex: o.zIndex
      , left: o.left
      , top: o.top
      })
      if (target) {
        target.insertBefore(el, target.firstChild || null)
      }
      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)
      if (!useCssAnimations) {
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps / o.speed
          , ostep = (1 - o.opacity) / (f * o.trail / 100)
          , astep = f / o.lines
        ;(function anim () {
          i++
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)
            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
        })()
      }
      return self
    }
    /**
     * Stops and removes the Spinner.
     */
  , stop: function () {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    }
    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
  , lines: function (el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg
      function fill (color, shadow) {
        return css(createEl(), {
          position: 'absolute'
        , width: o.scale * (o.length + o.width) + 'px'
        , height: o.scale * o.width + 'px'
        , background: color
        , boxShadow: shadow
        , transformOrigin: 'left'
        , transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)'
        , borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
        })
      }
      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute'
        , top: 1 + ~(o.scale * o.width / 2) + 'px'
        , transform: o.hwaccel ? 'translate3d(0,0,0)' : ''
        , opacity: o.opacity
        , animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        })
        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    }
    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
  , opacity: function (el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }
  })
  function initVML () {
    /* Utility function to create a VML tag */
    function vml (tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')
    Spinner.prototype.lines = function (el, o) {
      var r = o.scale * (o.length + o.width)
        , s = o.scale * 2 * r
      function grp () {
        return css(
          vml('group', {
            coordsize: s + ' ' + s
          , coordorigin: -r + ' ' + -r
          })
        , { width: s, height: s }
        )
      }
      var margin = -(o.width + o.length) * o.scale * 2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i
      function seg (i, dx, filter) {
        ins(
          g
        , ins(
            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx})
          , ins(
              css(
                vml('roundrect', {arcsize: o.corners})
              , { width: r
                , height: o.scale * o.width
                , left: o.scale * o.radius
                , top: -o.scale * o.width >> 1
                , filter: filter
                }
              )
            , vml('fill', {color: getColor(o.color, i), opacity: o.opacity})
            , vml('stroke', {opacity: 0})
            )
          )
        )
      }
      if (o.shadow)
        for (i = 1; i <= o.lines; i++) {
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')
        }
      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }
    Spinner.prototype.opacity = function (el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i + o < c.childNodes.length) {
        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }
  if (typeof document !== 'undefined') {
    sheet = (function () {
      var el = createEl('style', {type : 'text/css'})
      ins(document.getElementsByTagName('head')[0], el)
      return el.sheet || el.styleSheet
    }())
    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})
    if (!vendor(probe, 'transform') && probe.adj) initVML()
    else useCssAnimations = vendor(probe, 'animation')
  }
  return Spinner
}));
},{}],5:[function(require,module,exports){
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
},{"emitter":6,"reduce":7}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{"./index":16,"./utils/each":29}],9:[function(require,module,exports){
module.exports = function(){
  return "undefined" == typeof window ? "server" : "browser";
};
},{}],10:[function(require,module,exports){
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
},{"../utils/each":29,"../utils/json-shim":32}],11:[function(require,module,exports){
module.exports = function(){
  return new Date().getTimezoneOffset() * -60;
};
},{}],12:[function(require,module,exports){
module.exports = function(){
  if ("undefined" !== typeof window) {
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      return 2000;
    }
  }
  return 16000;
};
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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
},{"../utils/each":29,"./get-xhr-object":13,"superagent":5}],16:[function(require,module,exports){
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
Keen.version = '3.4.0';
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
},{"./utils/emitter-shim":30}],17:[function(require,module,exports){
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
},{"../helpers/get-context":9,"../helpers/get-query-string":10,"../helpers/get-url-max-length":12,"../helpers/get-xhr-object":13,"../helpers/superagent-handle-response":14,"../helpers/superagent-request-types":15,"../index":16,"../utils/base64":27,"../utils/each":29,"../utils/json-shim":32,"superagent":5}],18:[function(require,module,exports){
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
},{"../helpers/get-context":9,"../helpers/get-xhr-object":13,"../helpers/superagent-handle-response":14,"../helpers/superagent-request-types":15,"../index":16,"../utils/each":29,"superagent":5}],19:[function(require,module,exports){
var request = require('superagent');
var getQueryString = require('../helpers/get-query-string'),
    handleResponse = require('../helpers/superagent-handle-response'),
    requestTypes = require('../helpers/superagent-request-types');
module.exports = function(url, params, api_key, callback){
  var reqType = this.config.requestType,
      data = params || {};
  if (reqType === 'beacon') {
    reqType = 'jsonp';
  }
  data['api_key'] = data['api_key'] || api_key;
  request
    .get(url+getQueryString(data))
    .use(requestTypes(reqType))
    .end(function(err, res){
      handleResponse(err, res, callback);
      callback = null;
    });
};
},{"../helpers/get-query-string":10,"../helpers/superagent-handle-response":14,"../helpers/superagent-request-types":15,"superagent":5}],20:[function(require,module,exports){
var request = require('superagent');
var handleResponse = require('../helpers/superagent-handle-response');
module.exports = function(url, data, api_key, callback){
  request
    .post(url)
    .set('Content-Type', 'application/json')
    .set('Authorization', api_key)
    .send(data || {})
    .end(function(err, res) {
      handleResponse(err, res, callback);
      callback = null;
    });
};
},{"../helpers/superagent-handle-response":14,"superagent":5}],21:[function(require,module,exports){
var Request = require("../request");
module.exports = function(query, callback) {
  var queries = [],
      cb = callback,
      request;
  if (!this.config.projectId || !this.config.projectId.length) {
    handleConfigError.call(this, 'Missing projectId property');
  }
  if (!this.config.readKey || !this.config.readKey.length) {
    handleConfigError.call(this, 'Missing readKey property');
  }
  function handleConfigError(msg){
    var err = 'Query not sent: ' + msg;
    this.trigger('error', err);
    if (cb) {
      cb.call(this, err, null);
      cb = callback = null;
    }
  }
  if (query instanceof Array) {
    queries = query;
  } else {
    queries.push(query);
  }
  request = new Request(this, queries, cb).refresh();
  cb = callback = null;
  return request;
};
},{"../request":25}],22:[function(require,module,exports){
module.exports = function(newGlobalProperties) {
  if (newGlobalProperties && typeof(newGlobalProperties) == "function") {
    this.config.globalProperties = newGlobalProperties;
  } else {
    this.trigger("error", "Invalid value for global properties: " + newGlobalProperties);
  }
};
},{}],23:[function(require,module,exports){
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
},{"./addEvent":17}],24:[function(require,module,exports){
var each = require("./utils/each"),
    extend = require("./utils/extend"),
    getTimezoneOffset = require("./helpers/get-timezone-offset"),
    getQueryString = require("./helpers/get-query-string");
var Emitter = require('./utils/emitter-shim');
function Query(){
  this.configure.apply(this, arguments);
};
Emitter(Query.prototype);
Query.prototype.configure = function(analysisType, params) {
  this.analysis = analysisType;
  this.params = this.params || {};
  this.set(params);
  if (this.params.timezone === void 0) {
    this.params.timezone = getTimezoneOffset();
  }
  return this;
};
Query.prototype.set = function(attributes) {
  var self = this;
  each(attributes, function(v, k){
    var key = k, value = v;
    if (k.match(new RegExp("[A-Z]"))) {
      key = k.replace(/([A-Z])/g, function($1) { return "_"+$1.toLowerCase(); });
    }
    self.params[key] = value;
    if (value instanceof Array) {
      each(value, function(dv, index){
        if (dv instanceof Array == false && typeof dv === "object") {
          each(dv, function(deepValue, deepKey){
            if (deepKey.match(new RegExp("[A-Z]"))) {
              var _deepKey = deepKey.replace(/([A-Z])/g, function($1) { return "_"+$1.toLowerCase(); });
              delete self.params[key][index][deepKey];
              self.params[key][index][_deepKey] = deepValue;
            }
          });
        }
      });
    }
  });
  return self;
};
Query.prototype.get = function(attribute) {
  var key = attribute;
  if (key.match(new RegExp("[A-Z]"))) {
    key = key.replace(/([A-Z])/g, function($1) { return "_"+$1.toLowerCase(); });
  }
  if (this.params) {
    return this.params[key] || null;
  }
};
Query.prototype.addFilter = function(property, operator, value) {
  this.params.filters = this.params.filters || [];
  this.params.filters.push({
    "property_name": property,
    "operator": operator,
    "property_value": value
  });
  return this;
};
module.exports = Query;
},{"./helpers/get-query-string":10,"./helpers/get-timezone-offset":11,"./utils/each":29,"./utils/emitter-shim":30,"./utils/extend":31}],25:[function(require,module,exports){
var each = require('./utils/each'),
    extend = require('./utils/extend'),
    sendQuery = require('./utils/sendQuery'),
    sendSavedQuery = require('./utils/sendSavedQuery');
var Emitter = require('./utils/emitter-shim');
var Keen = require('./');
var Query = require('./query');
function Request(client, queries, callback){
  var cb = callback;
  this.config = {
    timeout: 300 * 1000
  };
  this.configure(client, queries, cb);
  cb = callback = null;
};
Emitter(Request.prototype);
Request.prototype.configure = function(client, queries, callback){
  var cb = callback;
  extend(this, {
    'client'   : client,
    'queries'  : queries,
    'data'     : {},
    'callback' : cb
  });
  cb = callback = null;
  return this;
};
Request.prototype.timeout = function(ms){
  if (!arguments.length) return this.config.timeout;
  this.config.timeout = (!isNaN(parseInt(ms)) ? parseInt(ms) : null);
  return this;
};
Request.prototype.refresh = function(){
  var self = this,
      completions = 0,
      response = [],
      errored = false;
  var handleResponse = function(err, res, index){
    if (errored) {
      return;
    }
    if (err) {
      self.trigger('error', err);
      if (self.callback) {
        self.callback(err, null);
      }
      errored = true;
      return;
    }
    response[index] = res;
    completions++;
    if (completions == self.queries.length && !errored) {
      self.data = (self.queries.length == 1) ? response[0] : response;
      self.trigger('complete', null, self.data);
      if (self.callback) {
        self.callback(null, self.data);
      }
    }
  };
  each(self.queries, function(query, index){
    var cbSequencer = function(err, res){
      handleResponse(err, res, index);
    };
    var path = '/queries';
    if (typeof query === 'string') {
      path += '/saved/' + query + '/result';
      sendSavedQuery.call(self, path, {}, cbSequencer);
    }
    else if (query instanceof Query) {
      path += '/' + query.analysis;
      if (query.analysis === 'saved') {
        path += '/' + query.params.query_name + '/result';
        sendSavedQuery.call(self, path, {}, cbSequencer);
      }
      else {
        sendQuery.call(self, path, query.params, cbSequencer);
      }
    }
    else {
      var res = {
        statusText: 'Bad Request',
        responseText: { message: 'Error: Query ' + (+index+1) + ' of ' + self.queries.length + ' for project ' + self.client.projectId() + ' is not a valid request' }
      };
      self.trigger('error', res.responseText.message);
      if (self.callback) {
        self.callback(res.responseText.message, null);
      }
    }
  });
  return this;
};
module.exports = Request;
},{"./":16,"./query":24,"./utils/each":29,"./utils/emitter-shim":30,"./utils/extend":31,"./utils/sendQuery":34,"./utils/sendSavedQuery":35}],26:[function(require,module,exports){
var request = require('superagent');
var responseHandler = require('./helpers/superagent-handle-response');
function savedQueries() {
  var _this = this;
  this.all = function(callback) {
    var url = _this.url('/queries/saved');
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', _this.masterKey())
      .end(handleResponse);
    function handleResponse(err, res){
      responseHandler(err, res, callback);
      callback = null;
    }
  };
  this.get = function(queryName, callback) {
    var url = _this.url('/queries/saved/' + queryName);
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', _this.masterKey())
      .end(handleResponse);
    function handleResponse(err, res){
      responseHandler(err, res, callback);
      callback = null;
    }
  };
  this.update = function(queryName, body, callback) {
    var url = _this.url('/queries/saved/' + queryName);
    request
      .put(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', _this.masterKey())
      .send(body || {})
      .end(handleResponse);
    function handleResponse(err, res){
      responseHandler(err, res, callback);
      callback = null;
    }
  };
  this.create = this.update;
  this.destroy = function(queryName, callback) {
    var url = _this.url('/queries/saved/' + queryName);
    request
      .del(url)
      .set('Content-Type', 'application/json')
      .set('Authorization', _this.masterKey())
      .end(handleResponse);
    function handleResponse(err, res){
      responseHandler(err, res, callback);
      callback = null;
    }
  };
  return this;
}
module.exports = savedQueries;
},{"./helpers/superagent-handle-response":14,"superagent":5}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){
var json = require('./json-shim');
module.exports = function(target) {
  return json.parse( json.stringify( target ) );
};
},{"./json-shim":32}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
var Emitter = require('component-emitter');
Emitter.prototype.trigger = Emitter.prototype.emit;
module.exports = Emitter;
},{"component-emitter":1}],31:[function(require,module,exports){
module.exports = function(target){
  for (var i = 1; i < arguments.length; i++) {
    for (var prop in arguments[i]){
      target[prop] = arguments[i][prop];
    }
  }
  return target;
};
},{}],32:[function(require,module,exports){
module.exports = ('undefined' !== typeof window && window.JSON) ? window.JSON : require("json3");
},{"json3":3}],33:[function(require,module,exports){
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
},{}],34:[function(require,module,exports){
var request = require('superagent');
var getContext = require('../helpers/get-context'),
    getXHR = require('../helpers/get-xhr-object'),
    responseHandler = require('../helpers/superagent-handle-response');
module.exports = function(path, params, callback){
  var url = this.client.url(path);
  if (!this.client.projectId()) {
    this.client.trigger('error', 'Query not sent: Missing projectId property');
    return;
  }
  if (!this.client.readKey()) {
    this.client.trigger('error', 'Query not sent: Missing readKey property');
    return;
  }
  if (getContext() === 'server' || getXHR()) {
    request
      .post(url)
        .set('Content-Type', 'application/json')
        .set('Authorization', this.client.readKey())
        .timeout(this.timeout())
        .send(params || {})
        .end(handleResponse);
  }
  function handleResponse(err, res){
    responseHandler(err, res, callback);
    callback = null;
  }
  return;
}
},{"../helpers/get-context":9,"../helpers/get-xhr-object":13,"../helpers/superagent-handle-response":14,"superagent":5}],35:[function(require,module,exports){
var request = require('superagent');
var responseHandler = require('../helpers/superagent-handle-response');
module.exports = function(path, params, callback){
  var key;
  if (this.client.readKey()) {
    key = this.client.readKey();
  }
  else if (this.client.masterKey()) {
    key = this.client.masterKey();
  }
  request
    .get(this.client.url(path))
    .set('Content-Type', 'application/json')
    .set('Authorization', key)
    .timeout(this.timeout())
    .send()
    .end(function(err, res) {
      responseHandler(err, res, callback);
      callback = null;
    });
  return;
}
},{"../helpers/superagent-handle-response":14,"superagent":5}],36:[function(require,module,exports){
var clone = require("../core/utils/clone"),
    each = require("../core/utils/each"),
    flatten = require("./utils/flatten"),
    parse = require("./utils/parse");
var Emitter = require('../core/utils/emitter-shim');
function Dataset(){
  this.data = {
    input: {},
    output: [['Index']]
  };
  this.meta = {
    schema: {},
    method: undefined
  };
  this.parser = undefined;
  if (arguments.length > 0) {
    this.parse.apply(this, arguments);
  }
}
Dataset.defaults = {
  delimeter: " -> "
};
Emitter(Dataset);
Emitter(Dataset.prototype);
Dataset.parser = require('./utils/parsers')(Dataset);
Dataset.prototype.input = function(obj){
  if (!arguments.length) return this["data"]["input"];
  this["data"]["input"] = (obj ? clone(obj) : null);
  return this;
};
Dataset.prototype.output = function(arr){
  if (!arguments.length) return this["data"].output;
  this["data"].output = (arr instanceof Array ? arr : null);
  return this;
}
Dataset.prototype.method = function(str){
  if (!arguments.length) return this.meta["method"];
  this.meta["method"] = (str ? String(str) : null);
  return this;
};
Dataset.prototype.schema = function(obj){
  if (!arguments.length) return this.meta.schema;
  this.meta.schema = (obj ? obj : null);
  return this;
};
Dataset.prototype.parse = function(raw, schema){
  var options;
  if (raw) this.input(raw);
  if (schema) this.schema(schema);
  this.output([[]]);
  if (this.meta.schema.select) {
    this.method("select");
    options = extend({
      records: "",
      select: true
    }, this.schema());
    _select.call(this, _optHash(options));
  }
  else if (this.meta.schema.unpack) {
    this.method("unpack");
    options = extend({
      records: "",
      unpack: {
        index: false,
        value: false,
        label: false
      }
    }, this.schema());
    _unpack.call(this, _optHash(options));
  }
  return this;
};
function _select(cfg){
  var self = this,
      options = cfg || {},
      target_set = [],
      unique_keys = [];
  var root, records_target;
  if (options.records === "" || !options.records) {
    root = [self.input()];
  } else {
    records_target = options.records.split(Dataset.defaults.delimeter);
    root = parse.apply(self, [self.input()].concat(records_target))[0];
  }
  each(options.select, function(prop){
    target_set.push(prop.path.split(Dataset.defaults.delimeter));
  });
  if (target_set.length == 0) {
    each(root, function(record, interval){
      var flat = flatten(record);
      for (var key in flat) {
        if (flat.hasOwnProperty(key) && unique_keys.indexOf(key) == -1) {
          unique_keys.push(key);
          target_set.push([key]);
        }
      }
    });
  }
  var test = [[]];
  each(target_set, function(props, i){
    if (target_set.length == 1) {
      test[0].push('label', 'value');
    } else {
      test[0].push(props.join("."));
    }
  });
  each(root, function(record, i){
    var flat = flatten(record);
    if (target_set.length == 1) {
      test.push([target_set.join("."), flat[target_set.join(".")]]);
    } else {
      test.push([]);
      each(target_set, function(t, j){
        var target = t.join(".");
        test[i+1].push(flat[target]);
      });
    }
  });
  self.output(test);
  self.format(options.select);
  return self;
}
function _unpack(options){
  var self = this, discovered_labels = [];
  var value_set = (options.unpack.value) ? options.unpack.value.path.split(Dataset.defaults.delimeter) : false,
      label_set = (options.unpack.label) ? options.unpack.label.path.split(Dataset.defaults.delimeter) : false,
      index_set = (options.unpack.index) ? options.unpack.index.path.split(Dataset.defaults.delimeter) : false;
  var value_desc = (value_set[value_set.length-1] !== "") ? value_set[value_set.length-1] : "Value",
      label_desc = (label_set[label_set.length-1] !== "") ? label_set[label_set.length-1] : "Label",
      index_desc = (index_set[index_set.length-1] !== "") ? index_set[index_set.length-1] : "Index";
  var root = (function(){
    var root;
    if (options.records == "") {
      root = [self.input()];
    } else {
      root = parse.apply(self, [self.input()].concat(options.records.split(Dataset.defaults.delimeter)));
    }
    return root[0];
  })();
  if (root instanceof Array == false) {
    root = [root];
  }
  each(root, function(record, interval){
    var labels = (label_set) ? parse.apply(self, [record].concat(label_set)) : [];
    if (labels) {
      discovered_labels = labels;
    }
  });
  each(root, function(record, interval){
    var plucked_value = (value_set) ? parse.apply(self, [record].concat(value_set)) : false,
        plucked_index = (index_set) ? parse.apply(self, [record].concat(index_set)) : false;
    if (plucked_index) {
      each(plucked_index, function(){
        self.data.output.push([]);
      });
    } else {
      self.data.output.push([]);
    }
    if (plucked_index) {
      if (interval == 0) {
        self.data.output[0].push(index_desc);
        if (discovered_labels.length > 0) {
          each(discovered_labels, function(value, i){
            self.data.output[0].push(value);
          });
        } else {
          self.data.output[0].push(value_desc);
        }
      }
      if (root.length < self.data.output.length-1) {
        if (interval == 0) {
          each(self.data.output, function(row, i){
            if (i > 0) {
              self.data.output[i].push(plucked_index[i-1]);
            }
          });
        }
      } else {
        self.data.output[interval+1].push(plucked_index[0]);
      }
    }
    if (!plucked_index && discovered_labels.length > 0) {
      if (interval == 0) {
        self.data.output[0].push(label_desc);
        self.data.output[0].push(value_desc);
      }
      self.data.output[interval+1].push(discovered_labels[0]);
    }
    if (!plucked_index && discovered_labels.length == 0) {
      self.data.output[0].push('');
    }
    if (plucked_value) {
      if (root.length < self.data.output.length-1) {
        if (interval == 0) {
          each(self.data.output, function(row, i){
            if (i > 0) {
              self.data.output[i].push(plucked_value[i-1]);
            }
          });
        }
      } else {
        each(plucked_value, function(value){
          self.data.output[interval+1].push(value);
        });
      }
    } else {
      each(self.data.output[0], function(cell, i){
        var offset = (plucked_index) ? 0 : -1;
        if (i > offset) {
          self.data.output[interval+1].push(null);
        }
      })
    }
  });
  self.format(options.unpack);
  return this;
}
function _optHash(options){
  each(options.unpack, function(value, key, object){
    if (value && is(value, 'string')) {
      options.unpack[key] = { path: options.unpack[key] };
    }
  });
  return options;
}
function is(o, t){
  o = typeof(o);
  if (!t){
    return o != 'undefined';
  }
  return o == t;
}
function extend(o, e){
  each(e, function(v, n){
    if (is(o[n], 'object') && is(v, 'object')){
      o[n] = extend(o[n], v);
    } else if (v !== null) {
      o[n] = v;
    }
  });
  return o;
}
module.exports = Dataset;
},{"../core/utils/clone":28,"../core/utils/each":29,"../core/utils/emitter-shim":30,"./utils/flatten":49,"./utils/parse":50,"./utils/parsers":51}],37:[function(require,module,exports){
var extend = require("../core/utils/extend"),
    Dataset = require("./dataset");
extend(Dataset.prototype, require("./lib/append"));
extend(Dataset.prototype, require("./lib/delete"));
extend(Dataset.prototype, require("./lib/filter"));
extend(Dataset.prototype, require("./lib/insert"));
extend(Dataset.prototype, require("./lib/select"));
extend(Dataset.prototype, require("./lib/set"));
extend(Dataset.prototype, require("./lib/sort"));
extend(Dataset.prototype, require("./lib/update"));
extend(Dataset.prototype, require("./lib/analyses"));
extend(Dataset.prototype, {
  "format": require("./lib/format")
});
module.exports = Dataset;
},{"../core/utils/extend":31,"./dataset":36,"./lib/analyses":38,"./lib/append":39,"./lib/delete":40,"./lib/filter":41,"./lib/format":42,"./lib/insert":43,"./lib/select":44,"./lib/set":45,"./lib/sort":46,"./lib/update":47}],38:[function(require,module,exports){
var each = require("../../core/utils/each"),
    arr = ["Average", "Maximum", "Minimum", "Sum"],
    output = {};
output["average"] = function(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      sum = 0,
      avg = null;
  each(set, function(val, i){
    if (typeof val === "number" && !isNaN(parseFloat(val))) {
      sum += parseFloat(val);
    }
  });
  return sum / set.length;
};
output["maximum"] = function(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      nums = [];
  each(set, function(val, i){
    if (typeof val === "number" && !isNaN(parseFloat(val))) {
      nums.push(parseFloat(val));
    }
  });
  return Math.max.apply(Math, nums);
};
output["minimum"] = function(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      nums = [];
  each(set, function(val, i){
    if (typeof val === "number" && !isNaN(parseFloat(val))) {
      nums.push(parseFloat(val));
    }
  });
  return Math.min.apply(Math, nums);
};
output["sum"] = function(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      sum = 0;
  each(set, function(val, i){
    if (typeof val === "number" && !isNaN(parseFloat(val))) {
      sum += parseFloat(val);
    }
  });
  return sum;
};
each(arr, function(v,i){
  output["getColumn"+v] = output["getRow"+v] = function(arr){
    return this[v.toLowerCase()](arr, 1);
  };
});
output["getColumnLabel"] = output["getRowIndex"] = function(arr){
  return arr[0];
};
module.exports = output;
},{"../../core/utils/each":29}],39:[function(require,module,exports){
var each = require("../../core/utils/each");
var createNullList = require('../utils/create-null-list');
module.exports = {
  "appendColumn": appendColumn,
  "appendRow": appendRow
};
function appendColumn(str, input){
  var self = this,
      args = Array.prototype.slice.call(arguments, 2),
      label = (str !== undefined) ? str : null;
  if (typeof input === "function") {
    self.data.output[0].push(label);
    each(self.output(), function(row, i){
      var cell;
      if (i > 0) {
        cell = input.call(self, row, i);
        if (typeof cell === "undefined") {
          cell = null;
        }
        self.data.output[i].push(cell);
      }
    });
  }
  else if (!input || input instanceof Array) {
    input = input || [];
    if (input.length <= self.output().length - 1) {
      input = input.concat( createNullList(self.output().length - 1 - input.length) );
    }
    else {
      each(input, function(value, i){
        if (self.data.output.length -1 < input.length) {
          appendRow.call(self, String( self.data.output.length ));
        }
      });
    }
    self.data.output[0].push(label);
    each(input, function(value, i){
      self.data.output[i+1][self.data.output[0].length-1] = value;
    });
  }
  return self;
}
function appendRow(str, input){
  var self = this,
      args = Array.prototype.slice.call(arguments, 2),
      label = (str !== undefined) ? str : null,
      newRow = [];
  newRow.push(label);
  if (typeof input === "function") {
    each(self.data.output[0], function(label, i){
      var col, cell;
      if (i > 0) {
        col = self.selectColumn(i);
        cell = input.call(self, col, i);
        if (typeof cell === "undefined") {
          cell = null;
        }
        newRow.push(cell);
      }
    });
    self.data.output.push(newRow);
  }
  else if (!input || input instanceof Array) {
    input = input || [];
    if (input.length <= self.data.output[0].length - 1) {
      input = input.concat( createNullList( self.data.output[0].length - 1 - input.length ) );
    }
    else {
      each(input, function(value, i){
        if (self.data.output[0].length -1 < input.length) {
          appendColumn.call(self, String( self.data.output[0].length ));
        }
      });
    }
    self.data.output.push( newRow.concat(input) );
  }
  return self;
}
},{"../../core/utils/each":29,"../utils/create-null-list":48}],40:[function(require,module,exports){
var each = require("../../core/utils/each");
module.exports = {
  "deleteColumn": deleteColumn,
  "deleteRow": deleteRow
};
function deleteColumn(q){
  var self = this,
      index = (typeof q === 'number') ? q : this.data.output[0].indexOf(q);
  if (index > -1) {
    each(self.data.output, function(row, i){
      self.data.output[i].splice(index, 1);
    });
  }
  return self;
}
function deleteRow(q){
  var index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);
  if (index > -1) {
    this.data.output.splice(index, 1);
  }
  return this;
}
},{"../../core/utils/each":29}],41:[function(require,module,exports){
var each = require("../../core/utils/each");
module.exports = {
  "filterColumns": filterColumns,
  "filterRows": filterRows
};
function filterColumns(fn){
  var self = this,
      clone = new Array();
  each(self.data.output, function(row, i){
    clone.push([]);
  });
  each(self.data.output[0], function(col, i){
    var selectedColumn = self.selectColumn(i);
    if (i == 0 || fn.call(self, selectedColumn, i)) {
      each(selectedColumn, function(cell, ri){
        clone[ri].push(cell);
      });
    }
  });
  self.output(clone);
  return self;
}
function filterRows(fn){
  var self = this,
      clone = [];
  each(self.output(), function(row, i){
    if (i == 0 || fn.call(self, row, i)) {
      clone.push(row);
    }
  });
  self.output(clone);
  return self;
}
},{"../../core/utils/each":29}],42:[function(require,module,exports){
var each = require("../../core/utils/each");
module.exports = function(options){
  var self = this;
    if (this.method() === 'select') {
      each(self.output(), function(row, i){
        if (i == 0) {
          each(row, function(cell, j){
            if (options[j] && options[j].label) {
              self.data.output[i][j] = options[j].label;
            }
          });
        } else {
          each(row, function(cell, j){
            self.data.output[i][j] = _applyFormat(self.data.output[i][j], options[j]);
          });
        }
      });
    }
  if (this.method() === 'unpack') {
    if (options.index) {
      each(self.output(), function(row, i){
        if (i == 0) {
          if (options.index.label) {
            self.data.output[i][0] = options.index.label;
          }
        } else {
          self.data.output[i][0] = _applyFormat(self.data.output[i][0], options.index);
        }
      });
    }
    if (options.label) {
      if (options.index) {
        each(self.output(), function(row, i){
          each(row, function(cell, j){
            if (i == 0 && j > 0) {
              self.data.output[i][j] = _applyFormat(self.data.output[i][j], options.label);
            }
          });
        });
      } else {
        each(self.output(), function(row, i){
          if (i > 0) {
            self.data.output[i][0] = _applyFormat(self.data.output[i][0], options.label);
          }
        });
      }
    }
    if (options.value) {
      if (options.index) {
        each(self.output(), function(row, i){
          each(row, function(cell, j){
            if (i > 0 && j > 0) {
              self.data.output[i][j] = _applyFormat(self.data.output[i][j], options.value);
            }
          });
        });
      } else {
        each(self.output(), function(row, i){
          each(row, function(cell, j){
            if (i > 0) {
              self.data.output[i][j] = _applyFormat(self.data.output[i][j], options.value);
            }
          });
        });
      }
    }
  }
  return self;
};
function _applyFormat(value, opts){
  var output = value,
      options = opts || {};
  if (options.replace) {
    each(options.replace, function(val, key){
      if (output == key || String(output) == String(key) || parseFloat(output) == parseFloat(key)) {
        output = val;
      }
    });
  }
  if (options.type && options.type == 'date') {
    if (options.format && moment && moment(value).isValid()) {
      output = moment(output).format(options.format);
    } else {
      output = new Date(output);
    }
  }
  if (options.type && options.type == 'string') {
    output = String(output);
  }
  if (options.type && options.type == 'number' && !isNaN(parseFloat(output))) {
    output = parseFloat(output);
  }
  return output;
}
},{"../../core/utils/each":29}],43:[function(require,module,exports){
var each = require("../../core/utils/each");
var createNullList = require('../utils/create-null-list');
var append = require('./append');
var appendRow = append.appendRow,
    appendColumn = append.appendColumn;
module.exports = {
  "insertColumn": insertColumn,
  "insertRow": insertRow
};
function insertColumn(index, str, input){
  var self = this, label;
  label = (str !== undefined) ? str : null;
  if (typeof input === "function") {
    self.data.output[0].splice(index, 0, label);
    each(self.output(), function(row, i){
      var cell;
      if (i > 0) {
        cell = input.call(self, row, i);
        if (typeof cell === "undefined") {
          cell = null;
        }
        self.data.output[i].splice(index, 0, cell);
      }
    });
  }
  else if (!input || input instanceof Array) {
    input = input || [];
    if (input.length <= self.output().length - 1) {
      input = input.concat( createNullList(self.output().length - 1 - input.length) );
    }
    else {
      each(input, function(value, i){
        if (self.data.output.length -1 < input.length) {
          appendRow.call(self, String( self.data.output.length ));
        }
      });
    }
    self.data.output[0].splice(index, 0, label);
    each(input, function(value, i){
      self.data.output[i+1].splice(index, 0, value);
    });
  }
  return self;
}
function insertRow(index, str, input){
  var self = this, label, newRow = [];
  label = (str !== undefined) ? str : null;
  newRow.push(label);
  if (typeof input === "function") {
    each(self.output()[0], function(label, i){
      var col, cell;
      if (i > 0) {
        col = self.selectColumn(i);
        cell = input.call(self, col, i);
        if (typeof cell === "undefined") {
          cell = null;
        }
        newRow.push(cell);
      }
    });
    self.data.output.splice(index, 0, newRow);
  }
  else if (!input || input instanceof Array) {
    input = input || [];
    if (input.length <= self.data.output[0].length - 1) {
      input = input.concat( createNullList( self.data.output[0].length - 1 - input.length ) );
    }
    else {
      each(input, function(value, i){
        if (self.data.output[0].length -1 < input.length) {
          appendColumn.call(self, String( self.data.output[0].length ));
        }
      });
    }
    self.data.output.splice(index, 0, newRow.concat(input) );
  }
  return self;
}
},{"../../core/utils/each":29,"../utils/create-null-list":48,"./append":39}],44:[function(require,module,exports){
var each = require("../../core/utils/each");
module.exports = {
  "selectColumn": selectColumn,
  "selectRow": selectRow
};
function selectColumn(q){
  var result = new Array(),
      index = (typeof q === 'number') ? q : this.data.output[0].indexOf(q);
  if (index > -1 && 'undefined' !== typeof this.data.output[0][index]) {
    each(this.data.output, function(row, i){
      result.push(row[index]);
    });
  }
  return result;
}
function selectRow(q){
  var result = new Array(),
      index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);
  if (index > -1 && 'undefined' !== typeof this.data.output[index]) {
    result = this.data.output[index];
  }
  return  result;
}
},{"../../core/utils/each":29}],45:[function(require,module,exports){
var each = require("../../core/utils/each");
var append = require('./append');
var select = require('./select');
module.exports = {
  "set": set
};
function set(coords, value){
  if (arguments.length < 2 || coords.length < 2) {
    throw Error('Incorrect arguments provided for #set method');
  }
  var colIndex = 'number' === typeof coords[0] ? coords[0] : this.data.output[0].indexOf(coords[0]),
      rowIndex = 'number' === typeof coords[1] ? coords[1] : select.selectColumn.call(this, 0).indexOf(coords[1]);
  var colResult = select.selectColumn.call(this, coords[0]),
      rowResult = select.selectRow.call(this, coords[1]);
  if (colResult.length < 1) {
    append.appendColumn.call(this, coords[0]);
    colIndex = this.data.output[0].length-1;
  }
  if (rowResult.length < 1) {
    append.appendRow.call(this, coords[1]);
    rowIndex = this.data.output.length-1;
  }
  this.data.output[ rowIndex ][ colIndex ] = value;
  return this;
}
},{"../../core/utils/each":29,"./append":39,"./select":44}],46:[function(require,module,exports){
var each = require("../../core/utils/each");
module.exports = {
  "sortColumns": sortColumns,
  "sortRows": sortRows
};
function sortColumns(str, comp){
  var self = this,
      head = this.output()[0].slice(1),
      cols = [],
      clone = [],
      fn = comp || this.getColumnLabel;
  each(head, function(cell, i){
    cols.push(self.selectColumn(i+1).slice(0));
  });
  cols.sort(function(a,b){
    var op = fn.call(self, a) > fn.call(self, b);
    if (op) {
      return (str === "asc" ? 1 : -1);
    } else if (!op) {
      return (str === "asc" ? -1 : 1);
    } else {
      return 0;
    }
  });
  each(cols, function(col, i){
    self
      .deleteColumn(i+1)
      .insertColumn(i+1, col[0], col.slice(1));
  });
  return self;
}
function sortRows(str, comp){
  var self = this,
      head = this.output().slice(0,1),
      body = this.output().slice(1),
      fn = comp || this.getRowIndex;
  body.sort(function(a, b){
    var op = fn.call(self, a) > fn.call(self, b);
    if (op) {
      return (str === "asc" ? 1 : -1);
    } else if (!op) {
      return (str === "asc" ? -1 : 1);
    } else {
      return 0;
    }
  });
  self.output(head.concat(body));
  return self;
}
},{"../../core/utils/each":29}],47:[function(require,module,exports){
var each = require("../../core/utils/each");
var createNullList = require('../utils/create-null-list');
var append = require('./append');
var appendRow = append.appendRow,
    appendColumn = append.appendColumn;
module.exports = {
  "updateColumn": updateColumn,
  "updateRow": updateRow
};
function updateColumn(q, input){
  var self = this,
      index = (typeof q === 'number') ? q : this.data.output[0].indexOf(q);
  if (index > -1) {
    if (typeof input === "function") {
      each(self.output(), function(row, i){
        var cell;
        if (i > 0) {
          cell = input.call(self, row[index], i, row);
          if (typeof cell !== "undefined") {
            self.data.output[i][index] = cell;
          }
        }
      });
    } else if (!input || input instanceof Array) {
      input = input || [];
      if (input.length <= self.output().length - 1) {
        input = input.concat( createNullList(self.output().length - 1 - input.length) );
      }
      else {
        each(input, function(value, i){
          if (self.data.output.length -1 < input.length) {
            appendRow.call(self, String( self.data.output.length ));
          }
        });
      }
      each(input, function(value, i){
        self.data.output[i+1][index] = value;
      });
    }
  }
  return self;
}
function updateRow(q, input){
  var self = this,
      index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);
  if (index > -1) {
    if (typeof input === "function") {
      each(self.output()[index], function(value, i){
        var col = self.selectColumn(i),
        cell = input.call(self, value, i, col);
        if (typeof cell !== "undefined") {
          self.data.output[index][i] = cell;
        }
      });
    } else if (!input || input instanceof Array) {
      input = input || [];
      if (input.length <= self.data.output[0].length - 1) {
        input = input.concat( createNullList( self.data.output[0].length - 1 - input.length ) );
      }
      else {
        each(input, function(value, i){
          if (self.data.output[0].length -1 < input.length) {
            appendColumn.call(self, String( self.data.output[0].length ));
          }
        });
      }
      each(input, function(value, i){
        self.data.output[index][i+1] = value;
      });
    }
  }
  return self;
}
},{"../../core/utils/each":29,"../utils/create-null-list":48,"./append":39}],48:[function(require,module,exports){
module.exports = function(len){
  var list = new Array();
  for (i = 0; i < len; i++) {
    list.push(null);
  }
  return list;
};
},{}],49:[function(require,module,exports){
module.exports = flatten;
function flatten(ob) {
  var toReturn = {};
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      var flatObject = flatten(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}
},{}],50:[function(require,module,exports){
var each = require("../../core/utils/each");
module.exports = function() {
  var result = [];
  var loop = function() {
    var root = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    var target = args.pop();
    if (args.length === 0) {
      if (root instanceof Array) {
        args = root;
      } else if (typeof root === 'object') {
        args.push(root);
      }
    }
    each(args, function(el){
      if (target == "") {
        if (typeof el == "number" || el == null) {
          return result.push(el);
        }
      }
      if (el[target] || el[target] === 0 || el[target] !== void 0) {
        if (el[target] === null) {
          return result.push(null);
        } else {
          return result.push(el[target]);
        }
      } else if (root[el]){
        if (root[el] instanceof Array) {
          each(root[el], function(n, i) {
            var splinter = [root[el]].concat(root[el][i]).concat(args.slice(1)).concat(target);
            return loop.apply(this, splinter);
          });
        } else {
          if (root[el][target]) {
            return result.push(root[el][target]);
          } else {
            return loop.apply(this, [root[el]].concat(args.splice(1)).concat(target));
          }
        }
      } else if (typeof root === 'object' && root instanceof Array === false && !root[target]) {
        throw new Error("Target property does not exist", target);
      } else {
        return loop.apply(this, [el].concat(args.splice(1)).concat(target));
      }
      return;
    });
    if (result.length > 0) {
      return result;
    }
  };
  return loop.apply(this, arguments);
}
},{"../../core/utils/each":29}],51:[function(require,module,exports){
var Dataset; /* injected */
var each = require('../../core/utils/each'),
    flatten = require('./flatten');
var parsers = {
  'metric':                   parseMetric,
  'interval':                 parseInterval,
  'grouped-metric':           parseGroupedMetric,
  'grouped-interval':         parseGroupedInterval,
  'double-grouped-metric':    parseDoubleGroupedMetric,
  'double-grouped-interval':  parseDoubleGroupedInterval,
  'funnel':                   parseFunnel,
  'list':                     parseList,
  'extraction':               parseExtraction
};
module.exports = initialize;
function initialize(lib){
  Dataset = lib;
  return function(name){
    var options = Array.prototype.slice.call(arguments, 1);
    if (!parsers[name]) {
      throw 'Requested parser does not exist';
    }
    else {
      return parsers[name].apply(this, options);
    }
  };
}
function parseMetric(){
  return function(res){
    var dataset = new Dataset();
    dataset.data.input = res;
    dataset.parser = {
      name: 'metric'
    };
    return dataset.set(['Value', 'Result'], res.result);
  }
}
function parseInterval(){
  var options = Array.prototype.slice.call(arguments);
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(record, i){
      var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      dataset.set(['Result', index], record.value);
    });
    dataset.data.input = res;
    dataset.parser = 'interval';
    dataset.parser = {
      name: 'interval',
      options: options
    };
    return dataset;
  }
}
function parseGroupedMetric(){
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(record, i){
      var label;
      each(record, function(value, key){
        if (key !== 'result') {
          label = key;
        }
      });
      dataset.set(['Result', String(record[label])], record.result);
    });
    dataset.data.input = res;
    dataset.parser = {
      name: 'grouped-metric'
    };
    return dataset;
  }
}
function parseGroupedInterval(){
  var options = Array.prototype.slice.call(arguments);
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(record, i){
      var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      if (record.value.length) {
        each(record.value, function(group, j){
          var label;
          each(group, function(value, key){
            if (key !== 'result') {
              label = key;
            }
          });
          dataset.set([ String(group[label]) || '', index ], group.result);
        });
      }
      else {
        dataset.appendRow(index);
      }
    });
    dataset.data.input = res;
    dataset.parser = {
      name: 'grouped-interval',
      options: options
    };
    return dataset;
  }
}
function parseDoubleGroupedMetric(){
  var options = Array.prototype.slice.call(arguments);
  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(record, i){
      dataset.set([ 'Result', record[options[0][0]] + ' ' + record[options[0][1]] ], record.result);
    });
    dataset.data.input = res;
    dataset.parser = {
      name: 'double-grouped-metric',
      options: options
    };
    return dataset;
  }
}
function parseDoubleGroupedInterval(){
  var options = Array.prototype.slice.call(arguments);
  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(record, i){
      var index = options[1] && options[1] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      each(record['value'], function(value, j){
        var label = String(value[options[0][0]]) + ' ' + String(value[options[0][1]]);
        dataset.set([ label, index ], value.result);
      });
    });
    dataset.data.input = res;
    dataset.parser = {
      name: 'double-grouped-interval',
      options: options
    };
    return dataset;
  }
}
function parseFunnel(){
  return function(res){
    var dataset = new Dataset();
    dataset.appendColumn('Step Value');
    each(res.result, function(value, i){
      dataset.appendRow(res.steps[i].event_collection, [ value ]);
    });
    dataset.data.input = res;
    dataset.parser = {
      name: 'funnel'
    };
    return dataset;
  }
}
function parseList(){
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(value, i){
      dataset.set( [ 'Value', i+1 ], value );
    });
    dataset.data.input = res;
    dataset.parser = {
      name: 'list'
    };
    return dataset;
  }
}
function parseExtraction(){
  return function(res){
    var dataset = new Dataset();
    each(res.result, function(record, i){
      each(flatten(record), function(value, key){
        dataset.set([key, i+1], value);
      });
    });
    dataset.deleteColumn(0);
    dataset.data.input = res;
    dataset.parser = {
      name: 'extraction'
    };
    return dataset;
  }
}
},{"../../core/utils/each":29,"./flatten":49}],52:[function(require,module,exports){
/*!
 * ----------------------
 * C3.js Adapter
 * ----------------------
 */
var Dataviz = require('../dataviz'),
    each = require('../../core/utils/each'),
    extend = require('../../core/utils/extend');
module.exports = function(){
  var dataTypes = {
    'singular'             : ['gauge'],
    'categorical'          : ['donut', 'pie'],
    'cat-interval'         : ['area-step', 'step', 'bar', 'area', 'area-spline', 'spline', 'line'],
    'cat-ordinal'          : ['bar', 'area', 'area-spline', 'spline', 'line', 'step', 'area-step'],
    'chronological'        : ['area', 'area-spline', 'spline', 'line', 'bar', 'step', 'area-step'],
    'cat-chronological'    : ['line', 'spline', 'area', 'area-spline', 'bar', 'step', 'area-step']
  };
  var charts = {};
  each(['gauge', 'donut', 'pie', 'bar', 'area', 'area-spline', 'spline', 'line', 'step', 'area-step'], function(type, index){
    charts[type] = {
      render: function(){
        var setup = getSetupTemplate.call(this, type);
        this.view._artifacts['c3'] = c3.generate(setup);
        this.update();
      },
      update: function(){
        var self = this, cols = [];
        if (type === 'gauge') {
          self.view._artifacts['c3'].load({
            columns: [ [self.title(), self.data()[1][1]] ]
          })
        }
        else if (type === 'pie' || type === 'donut') {
          self.view._artifacts['c3'].load({
            columns: self.dataset.data.output.slice(1)
          });
        }
        else {
          if (this.dataType().indexOf('chron') > -1) {
            cols.push(self.dataset.selectColumn(0));
            cols[0][0] = 'x';
          }
          each(self.data()[0], function(c, i){
            if (i > 0) {
              cols.push(self.dataset.selectColumn(i));
            }
          });
          if (self.stacked()) {
            self.view._artifacts['c3'].groups([self.labels()]);
          }
          self.view._artifacts['c3'].load({
            columns: cols
          });
        }
      },
      destroy: function(){
        _selfDestruct.call(this);
      }
    };
  });
  function getSetupTemplate(type){
    var setup = extend({
      axis: {},
      color: {},
      data: {},
      size: {}
    }, this.chartOptions());
    setup.bindto = this.el();
    setup.color.pattern = this.colors();
    setup.data.columns = [];
    setup.size.height = this.height();
    setup.size.width = this.width();
    setup['data']['type'] = type;
    if (type === 'gauge') {}
    else if (type === 'pie' || type === 'donut') {
      setup[type] = { title: this.title() };
    }
    else {
      if (this.dataType().indexOf('chron') > -1) {
        setup['data']['x'] = 'x';
        setup['axis']['x'] = {
          type: 'timeseries',
          tick: {
            format: this.dateFormat() || getDateFormatDefault(this.data()[1][0], this.data()[2][0])
          }
        };
      }
      else {
        if (this.dataType() === 'cat-ordinal') {
          setup['axis']['x'] = {
            type: 'category',
            categories: this.labels()
          };
        }
      }
      if (this.title()) {
        setup['axis']['y'] = { label: this.title() }
      }
    }
    return setup;
  }
  function _selfDestruct(){
    if (this.view._artifacts['c3']) {
      this.view._artifacts['c3'].destroy();
      this.view._artifacts['c3'] = null;
    }
  }
  function getDateFormatDefault(a, b){
    var d = Math.abs(new Date(a).getTime() - new Date(b).getTime());
    var months = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'June',
      'July', 'Aug', 'Sept',
      'Oct', 'Nov', 'Dec'
    ];
    if (d >= 2419200000) {
      return function(ms){
        var date = new Date(ms);
        return months[date.getMonth()] + ' ' + date.getFullYear();
      };
    }
    else if (d >= 86400000) {
      return function(ms){
        var date = new Date(ms);
        return months[date.getMonth()] + ' ' + date.getDate();
      };
    }
    else if (d >= 3600000) {
      return '%I:%M %p';
    }
    else {
      return '%I:%M:%S %p';
    }
  }
  Dataviz.register('c3', charts, { capabilities: dataTypes });
};
},{"../../core/utils/each":29,"../../core/utils/extend":31,"../dataviz":56}],53:[function(require,module,exports){
/*!
 * ----------------------
 * Chart.js Adapter
 * ----------------------
 */
var Dataviz = require("../dataviz"),
    each = require("../../core/utils/each"),
    extend = require("../../core/utils/extend");
module.exports = function(){
  if (typeof Chart !== "undefined") {
    Chart.defaults.global.responsive = true;
  }
  var dataTypes = {
    "categorical"          : ["doughnut", "pie", "polar-area", "radar"],
    "cat-interval"         : ["bar", "line"],
    "cat-ordinal"          : ["bar", "line"],
    "chronological"        : ["line", "bar"],
    "cat-chronological"    : ["line", "bar"]
  };
  var ChartNameMap = {
    "radar": "Radar",
    "polar-area": "PolarArea",
    "pie": "Pie",
    "doughnut": "Doughnut",
    "line": "Line",
    "bar": "Bar"
  };
  var dataTransformers = {
    'doughnut': getCategoricalData,
    'pie': getCategoricalData,
    'polar-area': getCategoricalData,
    'radar': getSeriesData,
    'line': getSeriesData,
    'bar': getSeriesData
  };
  function getCategoricalData(){
    var self = this, result = [];
    each(self.dataset.selectColumn(0).slice(1), function(label, i){
      result.push({
        value: self.dataset.selectColumn(1).slice(1)[i],
        color: self.colors()[+i],
        hightlight: self.colors()[+i+9],
        label: label
      });
    });
    return result;
  }
  function getSeriesData(){
    var self = this,
        labels,
        result = {
          labels: [],
          datasets: []
        };
    labels = this.dataset.selectColumn(0).slice(1);
    each(labels, function(l,i){
      if (l instanceof Date) {
        result.labels.push((l.getMonth()+1) + "-" + l.getDate() + "-" + l.getFullYear());
      } else {
        result.labels.push(l);
      }
    })
    each(self.dataset.selectRow(0).slice(1), function(label, i){
      var hex = {
        r: hexToR(self.colors()[i]),
        g: hexToG(self.colors()[i]),
        b: hexToB(self.colors()[i])
      };
      result.datasets.push({
        label: label,
        fillColor    : "rgba(" + hex.r + "," + hex.g + "," + hex.b + ",0.2)",
        strokeColor  : "rgba(" + hex.r + "," + hex.g + "," + hex.b + ",1)",
        pointColor   : "rgba(" + hex.r + "," + hex.g + "," + hex.b + ",1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(" + hex.r + "," + hex.g + "," + hex.b + ",1)",
        data: self.dataset.selectColumn(+i+1).slice(1)
      });
    });
    return result;
  }
  var charts = {};
  each(["doughnut", "pie", "polar-area", "radar", "bar", "line"], function(type, index){
    charts[type] = {
      initialize: function(){
        if (this.el().nodeName.toLowerCase() !== "canvas") {
          var canvas = document.createElement('canvas');
          this.el().innerHTML = "";
          this.el().appendChild(canvas);
          this.view._artifacts["ctx"] = canvas.getContext("2d");
        }
        else {
          this.view._artifacts["ctx"] = this.el().getContext("2d");
        }
        if (this.height()) {
          this.view._artifacts["ctx"].canvas.height = this.height();
          this.view._artifacts["ctx"].canvas.style.height = String(this.height() + "px");
        }
        if (this.width()) {
          this.view._artifacts["ctx"].canvas.width = this.width();
          this.view._artifacts["ctx"].canvas.style.width = String(this.width() + "px");
        }
        return this;
      },
      render: function(){
        if(_isEmptyOutput(this.dataset)) {
          this.error("No results to display");
          return;
        }
        var method = ChartNameMap[type],
            opts = extend({}, this.chartOptions()),
            data = dataTransformers[type].call(this);
        if (this.view._artifacts["chartjs"]) {
          this.view._artifacts["chartjs"].destroy();
        }
        this.view._artifacts["chartjs"] = new Chart(this.view._artifacts["ctx"])[method](data, opts);
        return this;
      },
      destroy: function(){
        _selfDestruct.call(this);
      }
    };
  });
  function _selfDestruct(){
    if (this.view._artifacts["chartjs"]) {
      this.view._artifacts["chartjs"].destroy();
      this.view._artifacts["chartjs"] = null;
    }
  }
  function _isEmptyOutput(dataset) {
    var flattened = dataset.output().reduce(function(a, b) {
      return a.concat(b)
    });
    return flattened.length === 0
  }
  function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
  function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
  function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
  function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
  Dataviz.register("chartjs", charts, { capabilities: dataTypes });
};
},{"../../core/utils/each":29,"../../core/utils/extend":31,"../dataviz":56}],54:[function(require,module,exports){
/*!
 * ----------------------
 * Google Charts Adapter
 * ----------------------
 */
/*
  TODO:
  [ ] Build a more robust DataTable transformer
  [ ] ^Expose date parser for google charts tooltips (#70)
  [ ] ^Allow custom tooltips (#147)
*/
var Dataviz = require("../dataviz"),
    each = require("../../core/utils/each"),
    extend = require("../../core/utils/extend"),
    Keen = require("../../core");
module.exports = function(){
  Keen.loaded = false;
  var errorMapping = {
    "Data column(s) for axis #0 cannot be of type string": "No results to visualize"
  };
  var chartTypes = ['AreaChart', 'BarChart', 'ColumnChart', 'LineChart', 'PieChart', 'Table'];
  var chartMap = {};
  var dataTypes = {
    'categorical':        ['piechart', 'barchart', 'columnchart', 'table'],
    'cat-interval':       ['columnchart', 'barchart', 'table'],
    'cat-ordinal':        ['barchart', 'columnchart', 'areachart', 'linechart', 'table'],
    'chronological':      ['areachart', 'linechart', 'table'],
    'cat-chronological':  ['linechart', 'columnchart', 'barchart', 'areachart'],
    'nominal':            ['table'],
    'extraction':         ['table']
  };
  each(chartTypes, function (type) {
    var name = type.toLowerCase();
    chartMap[name] = {
      initialize: function(){
      },
      render: function(){
        if(typeof google === "undefined") {
          this.error("The Google Charts library could not be loaded.");
          return;
        }
        var self = this;
        if (self.view._artifacts['googlechart']) {
          this.destroy();
        }
        self.view._artifacts['googlechart'] = self.view._artifacts['googlechart'] || new google.visualization[type](self.el());
        google.visualization.events.addListener(self.view._artifacts['googlechart'], 'error', function(stack){
          _handleErrors.call(self, stack);
        });
        this.update();
      },
      update: function(){
        var options = _getDefaultAttributes.call(this, type);
        extend(options, this.chartOptions(), this.attributes());
        options['isStacked'] = (this.stacked() || options['isStacked']);
        this.view._artifacts['datatable'] = google.visualization.arrayToDataTable(this.data());
        if (options.dateFormat) {
          if (typeof options.dateFormat === 'function') {
            options.dateFormat(this.view._artifacts['datatable']);
          }
          else if (typeof options.dateFormat === 'string') {
            new google.visualization.DateFormat({
              pattern: options.dateFormat
            }).format(this.view._artifacts['datatable'], 0);
          }
        }
        if (this.view._artifacts['googlechart']) {
          this.view._artifacts['googlechart'].draw(this.view._artifacts['datatable'], options);
        }
      },
      destroy: function(){
        if (this.view._artifacts['googlechart']) {
          google.visualization.events.removeAllListeners(this.view._artifacts['googlechart']);
          this.view._artifacts['googlechart'].clearChart();
          this.view._artifacts['googlechart'] = null;
          this.view._artifacts['datatable'] = null;
        }
      }
    };
  });
  Dataviz.register('google', chartMap, {
    capabilities: dataTypes,
    dependencies: [{
      type: 'script',
      url: 'https://www.google.com/jsapi',
      cb: function(done) {
        if (typeof google === 'undefined'){
          this.trigger("error", "Problem loading Google Charts library. Please contact us!");
          done();
        }
        else {
          google.load('visualization', '1.1', {
              packages: ['corechart', 'table'],
              callback: function(){
                done();
              }
          });
        }
      }
    }]
  });
  function _handleErrors(stack){
    var message = errorMapping[stack['message']] || stack['message'] || 'An error occurred';
    this.error(message);
  }
  function _getDefaultAttributes(type){
    var output = {};
    switch (type.toLowerCase()) {
      case "areachart":
        output.lineWidth = 2;
        output.hAxis = {
          baselineColor: 'transparent',
          gridlines: { color: 'transparent' }
        };
        output.vAxis = {
          viewWindow: { min: 0 }
        };
        if (this.dataType() === "chronological" || this.dataType() === "cat-ordinal") {
          output.legend = "none";
          output.chartArea = {
            width: "85%"
          };
        }
        if (this.dateFormat() && typeof this.dateFormat() === 'string') {
          output.hAxis.format = this.dateFormat();
        }
        break;
      case "barchart":
        output.hAxis = {
          viewWindow: { min: 0 }
        };
        output.vAxis = {
          baselineColor: 'transparent',
          gridlines: { color: 'transparent' }
        };
        if (this.dataType() === "chronological" || this.dataType() === "cat-ordinal") {
          output.legend = "none";
        }
        if (this.dateFormat() && typeof this.dateFormat() === 'string') {
          output.vAxis.format = this.dateFormat();
        }
        break;
      case "columnchart":
        output.hAxis = {
          baselineColor: 'transparent',
          gridlines: { color: 'transparent' }
        };
        output.vAxis = {
          viewWindow: { min: 0 }
        };
        if (this.dataType() === "chronological" || this.dataType() === "cat-ordinal") {
          output.legend = "none";
          output.chartArea = {
            width: "85%"
          };
        }
        if (this.dateFormat() && typeof this.dateFormat() === 'string') {
          output.hAxis.format = this.dateFormat();
        }
        break;
      case "linechart":
        output.lineWidth = 2;
        output.hAxis = {
          baselineColor: 'transparent',
          gridlines: { color: 'transparent' }
        };
        output.vAxis = {
          viewWindow: { min: 0 }
        };
        if (this.dataType() === "chronological" || this.dataType() === "cat-ordinal") {
          output.legend = "none";
          output.chartArea = {
            width: "85%"
          };
        }
        if (this.dateFormat() && typeof this.dateFormat() === 'string') {
          output.hAxis.format = this.dateFormat();
        }
        break;
      case "piechart":
        output.sliceVisibilityThreshold = 0.01;
        break;
      case "table":
        break;
    }
    return output;
  }
};
},{"../../core":16,"../../core/utils/each":29,"../../core/utils/extend":31,"../dataviz":56}],55:[function(require,module,exports){
/*!
* ----------------------
* Keen IO Adapter
* ----------------------
*/
var Keen = require("../../core"),
    Dataviz = require("../dataviz");
var clone = require("../../core/utils/clone"),
    each = require("../../core/utils/each"),
    extend = require("../../core/utils/extend"),
    prettyNumber = require("../utils/prettyNumber");
module.exports = function(){
  var Metric, Error, Spinner;
  Keen.Error = {
    defaults: {
      backgroundColor : "",
      borderRadius    : "4px",
      color           : "#ccc",
      display         : "block",
      fontFamily      : "Helvetica Neue, Helvetica, Arial, sans-serif",
      fontSize        : "21px",
      fontWeight      : "light",
      textAlign       : "center"
    }
  };
  Keen.Spinner.defaults = {
    height: 138,                 
    lines: 10,                   
    length: 8,                   
    width: 3,                    
    radius: 10,                  
    corners: 1,                  
    rotate: 0,                   
    direction: 1,                
    color: '#4d4d4d',            
    speed: 1.67,                 
    trail: 60,                   
    shadow: false,               
    hwaccel: false,              
    className: 'keen-spinner',   
    zIndex: 2e9,                 
    top: '50%',                  
    left: '50%'                  
  };
  var dataTypes = {
    'singular': ['metric']
  };
  Metric = {
    initialize: function(){
      var css = document.createElement("style"),
          bgDefault = "#49c5b1";
      css.id = "keen-widgets";
      css.type = "text/css";
      css.innerHTML = "\
  .keen-metric { \n  background: " + bgDefault + "; \n  border-radius: 4px; \n  color: #fff; \n  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; \n  padding: 10px 0; \n  text-align: center; \n} \
  .keen-metric-value { \n  display: block; \n  font-size: 84px; \n  font-weight: 700; \n  line-height: 84px; \n} \
  .keen-metric-title { \n  display: block; \n  font-size: 24px; \n  font-weight: 200; \n}";
      if (!document.getElementById(css.id)) {
        document.body.appendChild(css);
      }
    },
    render: function(){
      var bgColor = (this.colors().length == 1) ? this.colors()[0] : "#49c5b1",
          title = this.title() || "Result",
          value = (this.data()[1] && this.data()[1][1]) ? this.data()[1][1] : 0,
          width = this.width(),
          opts = this.chartOptions() || {},
          prefix = "",
          suffix = "";
      var styles = {
        'width': (width) ? width + 'px' : 'auto'
      };
      var formattedNum = value;
      if ( typeof opts.prettyNumber === 'undefined' || opts.prettyNumber == true ) {
        if ( !isNaN(parseInt(value)) ) {
          formattedNum = prettyNumber(value);
        }
      }
      if (opts['prefix']) {
        prefix = '<span class="keen-metric-prefix">' + opts['prefix'] + '</span>';
      }
      if (opts['suffix']) {
        suffix = '<span class="keen-metric-suffix">' + opts['suffix'] + '</span>';
      }
      this.el().innerHTML = '' +
        '<div class="keen-widget keen-metric" style="background-color: ' + bgColor + '; width:' + styles.width + ';" title="' + value + '">' +
          '<span class="keen-metric-value">' + prefix + formattedNum + suffix + '</span>' +
          '<span class="keen-metric-title">' + title + '</span>' +
        '</div>';
    }
  };
  Error = {
    initialize: function(){},
    render: function(text, style){
      var err, msg;
      var defaultStyle = clone(Keen.Error.defaults);
      var currentStyle = extend(defaultStyle, style);
      err = document.createElement("div");
      err.className = "keen-error";
      each(currentStyle, function(value, key){
        err.style[key] = value;
      });
      err.style.height = String(this.height() + "px");
      err.style.paddingTop = (this.height() / 2 - 15) + "px";
      err.style.width = String(this.width() + "px");
      msg = document.createElement("span");
      msg.innerHTML = text || "Yikes! An error occurred!";
      err.appendChild(msg);
      this.el().innerHTML = "";
      this.el().appendChild(err);
    },
    destroy: function(){
      this.el().innerHTML = "";
    }
  };
  Spinner = {
    initialize: function(){},
    render: function(){
      var spinner = document.createElement("div");
      var height = this.height() || Keen.Spinner.defaults.height;
      spinner.className = "keen-loading";
      spinner.style.height = String(height + "px");
      spinner.style.position = "relative";
      spinner.style.width = String(this.width() + "px");
      this.el().innerHTML = "";
      this.el().appendChild(spinner);
      this.view._artifacts.spinner = new Keen.Spinner(Keen.Spinner.defaults).spin(spinner);
    },
    destroy: function(){
      this.view._artifacts.spinner.stop();
      this.view._artifacts.spinner = null;
    }
  };
  Keen.Dataviz.register('keen-io', {
    'metric': Metric,
    'error': Error,
    'spinner': Spinner
  }, {
    capabilities: dataTypes
  });
};
},{"../../core":16,"../../core/utils/clone":28,"../../core/utils/each":29,"../../core/utils/extend":31,"../dataviz":56,"../utils/prettyNumber":95}],56:[function(require,module,exports){
var clone = require('../core/utils/clone'),
    each = require('../core/utils/each'),
    extend = require('../core/utils/extend'),
    loadScript = require('./utils/loadScript'),
    loadStyle = require('./utils/loadStyle');
var Keen = require('../core');
var Emitter = require('../core/utils/emitter-shim');
var Dataset = require('../dataset');
function Dataviz(){
  this.dataset = new Dataset();
  this.view = {
    _prepared: false,
    _initialized: false,
    _rendered: false,
    _artifacts: { /* state bin */ },
    adapter: {
      library: undefined,
      chartOptions: {},
      chartType: undefined,
      defaultChartType: undefined,
      dataType: undefined
    },
    attributes: clone(Dataviz.defaults),
    defaults: clone(Dataviz.defaults),
    el: undefined,
    loader: { library: 'keen-io', chartType: 'spinner' }
  };
  Dataviz.visuals.push(this);
};
extend(Dataviz, {
  dataTypeMap: {
    'singular':          { library: 'keen-io', chartType: 'metric'      },
    'categorical':       { library: 'google',  chartType: 'piechart'    },
    'cat-interval':      { library: 'google',  chartType: 'columnchart' },
    'cat-ordinal':       { library: 'google',  chartType: 'barchart'    },
    'chronological':     { library: 'google',  chartType: 'areachart'   },
    'cat-chronological': { library: 'google',  chartType: 'linechart'   },
    'extraction':        { library: 'google',  chartType: 'table'       },
    'nominal':           { library: 'google',  chartType: 'table'       }
  },
  defaults: {
    colors: [
    /* teal      red        yellow     purple     orange     mint       blue       green      lavender */
    '#00bbde', '#fe6672', '#eeb058', '#8a8ad6', '#ff855c', '#00cfbb', '#5a9eed', '#73d483', '#c879bb',
    '#0099b6', '#d74d58', '#cb9141', '#6b6bb6', '#d86945', '#00aa99', '#4281c9', '#57b566', '#ac5c9e',
    '#27cceb', '#ff818b', '#f6bf71', '#9b9be1', '#ff9b79', '#26dfcd', '#73aff4', '#87e096', '#d88bcb'
    ],
    indexBy: 'timeframe.start',
    stacked: false
  },
  dependencies: {
    loading: 0,
    loaded: 0,
    urls: {}
  },
  libraries: {},
  visuals: []
});
Emitter(Dataviz);
Emitter(Dataviz.prototype);
Dataviz.register = function(name, methods, config){
  var self = this;
  var loadHandler = function(st) {
    st.loaded++;
    if(st.loaded === st.loading) {
      Keen.loaded = true;
      Keen.trigger('ready');
    }
  };
  Dataviz.libraries[name] = Dataviz.libraries[name] || {};
  each(methods, function(method, key){
    Dataviz.libraries[name][key] = method;
  });
  if (config && config.capabilities) {
    Dataviz.libraries[name]._defaults = Dataviz.libraries[name]._defaults || {};
    each(config.capabilities, function(typeSet, key){
      Dataviz.libraries[name]._defaults[key] = typeSet;
    });
  }
  if (config && config.dependencies) {
    each(config.dependencies, function (dependency, index, collection) {
      var status = Dataviz.dependencies;
      if(!status.urls[dependency.url]) {
        status.urls[dependency.url] = true;
        status.loading++;
        var method = dependency.type === 'script' ? loadScript : loadStyle;
        method(dependency.url, function() {
          if(dependency.cb) {
            dependency.cb.call(self, function() {
              loadHandler(status);
            });
          } else {
            loadHandler(status);
          }
        });
      }
    });
  }
};
Dataviz.find = function(target){
  if (!arguments.length) return Dataviz.visuals;
  var el = target.nodeName ? target : document.querySelector(target),
      match;
  each(Dataviz.visuals, function(visual){
    if (el == visual.el()){
      match = visual;
      return false;
    }
  });
  if (match) return match;
};
module.exports = Dataviz;
},{"../core":16,"../core/utils/clone":28,"../core/utils/each":29,"../core/utils/emitter-shim":30,"../core/utils/extend":31,"../dataset":37,"./utils/loadScript":93,"./utils/loadStyle":94}],57:[function(require,module,exports){
var clone = require("../../core/utils/clone"),
    extend = require("../../core/utils/extend"),
    Dataviz = require("../dataviz"),
    Request = require("../../core/request");
module.exports = function(query, el, cfg) {
  var DEFAULTS = clone(Dataviz.defaults),
      visual = new Dataviz(),
      request = new Request(this, [query]),
      config = cfg || {};
  visual
    .attributes(extend(DEFAULTS, config))
    .el(el)
    .prepare();
  request.refresh();
  request.on("complete", function(){
    visual
      .parseRequest(this)
      .call(function(){
        if (config.labels) {
          this.labels(config.labels);
        }
      })
      .render();
  });
  request.on("error", function(res){
    visual.error(res.message);
  });
  return visual;
};
},{"../../core/request":25,"../../core/utils/clone":28,"../../core/utils/extend":31,"../dataviz":56}],58:[function(require,module,exports){
var Dataviz = require("../dataviz"),
    extend = require("../../core/utils/extend")
module.exports = function(){
  var map = extend({}, Dataviz.dataTypeMap),
      dataType = this.dataType(),
      library = this.library(),
      chartType = this.chartType() || this.defaultChartType();
  if (!library && map[dataType]) {
    library = map[dataType].library;
  }
  if (library && !chartType && dataType) {
    chartType = Dataviz.libraries[library]._defaults[dataType][0];
  }
  if (library && !chartType && map[dataType]) {
    chartType = map[dataType].chartType;
  }
  if (library && chartType && Dataviz.libraries[library][chartType]) {
    return Dataviz.libraries[library][chartType];
  }
  else {
    return {};
  }
};
},{"../../core/utils/extend":31,"../dataviz":56}],59:[function(require,module,exports){
module.exports = function(req){
  var analysis = req.queries[0].analysis.replace("_", " "),
  collection = req.queries[0].get('event_collection'),
  output;
  output = analysis.replace( /\b./g, function(a){
    return a.toUpperCase();
  });
  if (collection) {
    output += ' - ' + collection;
  }
  return output;
};
},{}],60:[function(require,module,exports){
module.exports = function(query){
  var isInterval = typeof query.params.interval === "string",
  isGroupBy = typeof query.params.group_by === "string",
  is2xGroupBy = query.params.group_by instanceof Array,
  dataType;
  if (!isGroupBy && !isInterval) {
    dataType = 'singular';
  }
  if (isGroupBy && !isInterval) {
    dataType = 'categorical';
  }
  if (isInterval && !isGroupBy) {
    dataType = 'chronological';
  }
  if (isInterval && isGroupBy) {
    dataType = 'cat-chronological';
  }
  if (!isInterval && is2xGroupBy) {
    dataType = 'categorical';
  }
  if (isInterval && is2xGroupBy) {
    dataType = 'cat-chronological';
  }
  if (query.analysis === "funnel") {
    dataType = 'cat-ordinal';
  }
  if (query.analysis === "extraction") {
    dataType = 'extraction';
  }
  if (query.analysis === "select_unique") {
    dataType = 'nominal';
  }
  return dataType;
};
},{}],61:[function(require,module,exports){
var extend = require('../core/utils/extend'),
    Dataviz = require('./dataviz');
extend(Dataviz.prototype, {
  'adapter'          : require('./lib/adapter'),
  'attributes'       : require('./lib/attributes'),
  'call'             : require('./lib/call'),
  'chartOptions'     : require('./lib/chartOptions'),
  'chartType'        : require('./lib/chartType'),
  'colorMapping'     : require('./lib/colorMapping'),
  'colors'           : require('./lib/colors'),
  'data'             : require('./lib/data'),
  'dataType'         : require('./lib/dataType'),
  'dateFormat'       : require('./lib/dateFormat'),
  'defaultChartType' : require('./lib/defaultChartType'),
  'el'               : require('./lib/el'),
  'height'           : require('./lib/height'),
  'indexBy'          : require('./lib/indexBy'),
  'labelMapping'     : require('./lib/labelMapping'),
  'labels'           : require('./lib/labels'),
  'library'          : require('./lib/library'),
  'parseRawData'     : require('./lib/parseRawData'),
  'parseRequest'     : require('./lib/parseRequest'),
  'prepare'          : require('./lib/prepare'),
  'sortGroups'       : require('./lib/sortGroups'),
  'sortIntervals'    : require('./lib/sortIntervals'),
  'stacked'          : require('./lib/stacked'),
  'title'            : require('./lib/title'),
  'width'            : require('./lib/width')
});
extend(Dataviz.prototype, {
  'destroy'          : require('./lib/actions/destroy'),
  'error'            : require('./lib/actions/error'),
  'initialize'       : require('./lib/actions/initialize'),
  'render'           : require('./lib/actions/render'),
  'update'           : require('./lib/actions/update')
});
module.exports = Dataviz;
},{"../core/utils/extend":31,"./dataviz":56,"./lib/actions/destroy":62,"./lib/actions/error":63,"./lib/actions/initialize":64,"./lib/actions/render":65,"./lib/actions/update":66,"./lib/adapter":67,"./lib/attributes":68,"./lib/call":69,"./lib/chartOptions":70,"./lib/chartType":71,"./lib/colorMapping":72,"./lib/colors":73,"./lib/data":74,"./lib/dataType":75,"./lib/dateFormat":76,"./lib/defaultChartType":77,"./lib/el":78,"./lib/height":79,"./lib/indexBy":80,"./lib/labelMapping":81,"./lib/labels":82,"./lib/library":83,"./lib/parseRawData":84,"./lib/parseRequest":85,"./lib/prepare":86,"./lib/sortGroups":87,"./lib/sortIntervals":88,"./lib/stacked":89,"./lib/title":90,"./lib/width":91}],62:[function(require,module,exports){
var getAdapterActions = require("../../helpers/getAdapterActions");
module.exports = function(){
  var actions = getAdapterActions.call(this);
  if (actions.destroy) {
    actions.destroy.apply(this, arguments);
  }
  if (this.el()) {
    this.el().innerHTML = "";
  }
  this.view._prepared = false;
  this.view._initialized = false;
  this.view._rendered = false;
  this.view._artifacts = {};
  return this;
};
},{"../../helpers/getAdapterActions":58}],63:[function(require,module,exports){
var getAdapterActions = require("../../helpers/getAdapterActions"),
    Dataviz = require("../../dataviz");
module.exports = function(){
  var actions = getAdapterActions.call(this);
  if (this.el()) {
    if (actions['error']) {
      actions['error'].apply(this, arguments);
    } else {
      Dataviz.libraries['keen-io']['error'].render.apply(this, arguments);
    }
  }
  else {
    this.emit('error', 'No DOM element provided');
  }
  return this;
};
},{"../../dataviz":56,"../../helpers/getAdapterActions":58}],64:[function(require,module,exports){
var getAdapterActions = require("../../helpers/getAdapterActions"),
    Dataviz = require("../../dataviz");
module.exports = function(){
  var actions = getAdapterActions.call(this);
  var loader = Dataviz.libraries[this.view.loader.library][this.view.loader.chartType];
  if (this.view._prepared) {
    if (loader.destroy) loader.destroy.apply(this, arguments);
  } else {
    if (this.el()) this.el().innerHTML = "";
  }
  if (actions.initialize) {
    actions.initialize.apply(this, arguments);
  }
  else {
    this.error('Incorrect chartType');
    this.emit('error', 'Incorrect chartType');
  }
  this.view._initialized = true;
  return this;
};
},{"../../dataviz":56,"../../helpers/getAdapterActions":58}],65:[function(require,module,exports){
var getAdapterActions = require("../../helpers/getAdapterActions"),
    applyTransforms = require("../../utils/applyTransforms");
module.exports = function(){
  var actions = getAdapterActions.call(this);
  applyTransforms.call(this);
  if (!this.view._initialized) {
    this.initialize();
  }
  if (this.el() && actions.render) {
    actions.render.apply(this, arguments);
    this.view._rendered = true;
  }
  return this;
};
},{"../../helpers/getAdapterActions":58,"../../utils/applyTransforms":92}],66:[function(require,module,exports){
var getAdapterActions = require("../../helpers/getAdapterActions"),
    applyTransforms = require("../../utils/applyTransforms");
module.exports = function(){
  var actions = getAdapterActions.call(this);
  applyTransforms.call(this);
  if (actions.update) {
    actions.update.apply(this, arguments);
  } else if (actions.render) {
    this.render();
  }
  return this;
};
},{"../../helpers/getAdapterActions":58,"../../utils/applyTransforms":92}],67:[function(require,module,exports){
var each = require("../../core/utils/each");
module.exports = function(obj){
  if (!arguments.length) return this.view.adapter;
  var self = this;
  each(obj, function(prop, key){
    self.view.adapter[key] = (prop ? prop : null);
  });
  return this;
};
},{"../../core/utils/each":29}],68:[function(require,module,exports){
var each = require("../../core/utils/each");
var chartOptions = require("./chartOptions")
    chartType = require("./chartType"),
    library = require("./library");
module.exports = function(obj){
  if (!arguments.length) return this.view["attributes"];
  var self = this;
  each(obj, function(prop, key){
    if (key === "library") {
      library.call(self, prop);
    }
    else if (key === "chartType") {
      chartType.call(self, prop);
    }
    else if (key === "chartOptions") {
      chartOptions.call(self, prop);
    }
    else {
      self.view["attributes"][key] = prop;
    }
  });
  return this;
};
},{"../../core/utils/each":29,"./chartOptions":70,"./chartType":71,"./library":83}],69:[function(require,module,exports){
module.exports = function(fn){
  fn.call(this);
  return this;
};
},{}],70:[function(require,module,exports){
var extend = require('../../core/utils/extend');
module.exports = function(obj){
  if (!arguments.length) return this.view.adapter.chartOptions;
  if (typeof obj === 'object' && obj !== null) {
    extend(this.view.adapter.chartOptions, obj);
  }
  else {
    this.view.adapter.chartOptions = {};
  }
  return this;
};
},{"../../core/utils/extend":31}],71:[function(require,module,exports){
module.exports = function(str){
  if (!arguments.length) return this.view.adapter.chartType;
  this.view.adapter.chartType = (str ? String(str) : null);
  return this;
};
},{}],72:[function(require,module,exports){
var each = require("../../core/utils/each");
module.exports = function(obj){
  if (!arguments.length) return this.view["attributes"].colorMapping;
  this.view["attributes"].colorMapping = (obj ? obj : null);
  colorMapping.call(this);
  return this;
};
function colorMapping(){
  var self = this,
      schema = this.dataset.schema,
      data = this.dataset.output(),
      colorSet = this.view.defaults.colors.slice(),
      colorMap = this.colorMapping(),
      dt = this.dataType() || "";
  if (colorMap) {
    if (dt.indexOf("chronological") > -1 || (schema.unpack && data[0].length > 2)) {
      each(data[0].slice(1), function(label, i){
        var color = colorMap[label];
        if (color && colorSet[i] !== color) {
          colorSet.splice(i, 0, color);
        }
      });
    }
    else {
      each(self.dataset.selectColumn(0).slice(1), function(label, i){
        var color = colorMap[label];
        if (color && colorSet[i] !== color) {
          colorSet.splice(i, 0, color);
        }
      });
    }
    self.view.attributes.colors = colorSet;
  }
}
},{"../../core/utils/each":29}],73:[function(require,module,exports){
module.exports = function(arr){
  if (!arguments.length) return this.view["attributes"].colors;
  this.view["attributes"].colors = (arr instanceof Array ? arr : null);
  this.view.defaults.colors = (arr instanceof Array ? arr : null);
  return this;
};
},{}],74:[function(require,module,exports){
var Dataset = require("../../dataset"),
    Request = require("../../core/request");
module.exports = function(data){
  if (!arguments.length) return this.dataset.output();
  if (data instanceof Dataset) {
    this.dataset = data;
  } else if (data instanceof Request) {
    this.parseRequest(data);
  } else {
    this.parseRawData(data);
  }
  return this;
};
},{"../../core/request":25,"../../dataset":37}],75:[function(require,module,exports){
module.exports = function(str){
  if (!arguments.length) return this.view.adapter.dataType;
  this.view.adapter.dataType = (str ? String(str) : null);
  return this;
};
},{}],76:[function(require,module,exports){
module.exports = function(val){
  if (!arguments.length) return this.view.attributes.dateFormat;
  if (typeof val === 'string' || typeof val === 'function') {
    this.view.attributes.dateFormat = val;
  }
  else {
    this.view.attributes.dateFormat = undefined;
  }
  return this;
};
},{}],77:[function(require,module,exports){
module.exports = function(str){
  if (!arguments.length) return this.view.adapter.defaultChartType;
  this.view.adapter.defaultChartType = (str ? String(str) : null);
  return this;
};
},{}],78:[function(require,module,exports){
module.exports = function(el){
  if (!arguments.length) return this.view.el;
  this.view.el = el;
  return this;
};
},{}],79:[function(require,module,exports){
module.exports = function(num){
  if (!arguments.length) return this.view["attributes"]["height"];
  this.view["attributes"]["height"] = (!isNaN(parseInt(num)) ? parseInt(num) : null);
  return this;
};
},{}],80:[function(require,module,exports){
var Dataset = require('../../dataset'),
    Dataviz = require('../dataviz'),
    each = require('../../core/utils/each');
module.exports = function(str){
  if (!arguments.length) return this.view['attributes'].indexBy;
  this.view['attributes'].indexBy = (str ? String(str) : Dataviz.defaults.indexBy);
  indexBy.call(this);
  return this;
};
function indexBy(){
  var parser, options;
  if (this.dataset.output().length > 1
    && !isNaN(new Date(this.dataset.output()[1][0]).getTime())) {
    if (this.dataset.parser
      && this.dataset.parser.name
        && this.dataset.parser.options) {
      if (this.dataset.parser.options.length === 1) {
        parser = Dataset.parser(this.dataset.parser.name, this.indexBy());
        this.dataset.parser.options[0] = this.indexBy();
      }
      else {
        parser = Dataset.parser(this.dataset.parser.name, this.dataset.parser.options[0], this.indexBy());
        this.dataset.parser.options[1] = this.indexBy();
      }
    }
    else if (this.dataset.output()[0].length === 2) {
      parser = Dataset.parser('interval', this.indexBy());
      this.dataset.parser = {
        name: 'interval',
        options: [this.indexBy()]
      };
    }
    else {
      parser = Dataset.parser('grouped-interval', this.indexBy());
      this.dataset.parser = {
        name: 'grouped-interval',
        options: [this.indexBy()]
      };
    }
    this.dataset = parser(this.dataset.input());
    this.dataset.updateColumn(0, function(value){
      return (typeof value === 'string') ? new Date(value) : value;
    });
  }
}
},{"../../core/utils/each":29,"../../dataset":37,"../dataviz":56}],81:[function(require,module,exports){
var each = require("../../core/utils/each");
module.exports = function(obj){
  if (!arguments.length) return this.view["attributes"].labelMapping;
  this.view["attributes"].labelMapping = (obj ? obj : null);
  applyLabelMapping.call(this);
  return this;
};
function applyLabelMapping(){
  var self = this,
  labelMap = this.labelMapping(),
  dt = this.dataType() || "";
  if (labelMap) {
    if (dt.indexOf("chronological") > -1 || (self.dataset.output()[0].length > 2)) {
      each(self.dataset.output()[0], function(c, i){
        if (i > 0) {
          self.dataset.data.output[0][i] = labelMap[c] || c;
        }
      });
    }
    else if (self.dataset.output()[0].length === 2) {
      self.dataset.updateColumn(0, function(c, i){
        return labelMap[c] || c;
      });
    }
  }
}
},{"../../core/utils/each":29}],82:[function(require,module,exports){
var each = require('../../core/utils/each');
module.exports = function(arr){
  if (!arguments.length) {
    if (!this.view['attributes'].labels || !this.view['attributes'].labels.length) {
      return getLabels.call(this);
    }
    else {
      return this.view['attributes'].labels;
    }
  }
  else {
    this.view['attributes'].labels = (arr instanceof Array ? arr : null);
    setLabels.call(this);
    return this;
  }
};
function setLabels(){
  var self = this,
      labelSet = this.labels() || null,
      data = this.dataset.output(),
      dt = this.dataType() || '';
  if (labelSet) {
    if (dt.indexOf('chronological') > -1 || (data[0].length > 2)) {
      each(data[0], function(cell,i){
        if (i > 0 && labelSet[i-1]) {
          self.dataset.data.output[0][i] = labelSet[i-1];
        }
      });
    }
    else {
      each(data, function(row,i){
        if (i > 0 && labelSet[i-1]) {
          self.dataset.data.output[i][0] = labelSet[i-1];
        }
      });
    }
  }
}
function getLabels(){
  var data = this.dataset.output(),
      dt = this.dataType() || '',
      labels;
  if (dt.indexOf('chron') > -1 || (data[0].length > 2)) {
    labels = this.dataset.selectRow(0).slice(1);
  }
  else {
    labels = this.dataset.selectColumn(0).slice(1);
  }
  return labels;
}
},{"../../core/utils/each":29}],83:[function(require,module,exports){
module.exports = function(str){
  if (!arguments.length) return this.view.adapter.library;
  this.view.adapter.library = (str ? String(str) : null);
  return this;
};
},{}],84:[function(require,module,exports){
var Dataset = require('../../dataset');
var extend = require('../../core/utils/extend');
module.exports = function(response){
  var dataType,
      indexBy = this.indexBy() ? this.indexBy() : 'timestamp.start',
      parser,
      parserArgs = [],
      query = (typeof response.query !== 'undefined') ? response.query : {};
  query = extend({
    analysis_type: null,
    event_collection: null,
    filters: [],
    group_by: null,
    interval: null,
    timeframe: null,
    timezone: null
  }, query);
  if (query.analysis_type === 'funnel') {
    dataType = 'cat-ordinal';
    parser = 'funnel';
  }
  else if (query.analysis_type === 'extraction'){
    dataType = 'extraction';
    parser = 'extraction';
  }
  else if (query.analysis_type === 'select_unique') {
    if (!query.group_by && !query.interval) {
      dataType = 'nominal';
      parser = 'list';
    }
  }
  else if (query.analysis_type) {
    if (!query.group_by && !query.interval) {
      dataType = 'singular';
      parser = 'metric';
    }
    else if (query.group_by && !query.interval) {
      if (query.group_by instanceof Array && query.group_by.length > 1) {
        dataType = 'categorical';
        parser = 'double-grouped-metric';
        parserArgs.push(query.group_by);
      }
      else {
        dataType = 'categorical';
        parser = 'grouped-metric';
      }
    }
    else if (query.interval && !query.group_by) {
      dataType = 'chronological';
      parser = 'interval';
      parserArgs.push(indexBy);
    }
    else if (query.group_by && query.interval) {
      if (query.group_by instanceof Array && query.group_by.length > 1) {
        dataType = 'cat-chronological';
        parser = 'double-grouped-interval';
        parserArgs.push(query.group_by);
        parserArgs.push(indexBy);
      }
      else {
        dataType = 'cat-chronological';
        parser = 'grouped-interval';
        parserArgs.push(indexBy);
      }
    }
  }
  if (!parser) {
    if (typeof response.result === 'number'){
      dataType = 'singular';
      parser = 'metric';
    }
    if (response.result instanceof Array && response.result.length > 0){
      if (response.result[0].timeframe && (typeof response.result[0].value == 'number' || response.result[0].value == null)) {
        dataType = 'chronological';
        parser = 'interval';
        parserArgs.push(indexBy)
      }
      if (typeof response.result[0].result == 'number'){
        dataType = 'categorical';
        parser = 'grouped-metric';
      }
      if (response.result[0].value instanceof Array){
        dataType = 'cat-chronological';
        parser = 'grouped-interval';
        parserArgs.push(indexBy)
      }
      if (typeof response.result[0] == 'number' && typeof response.steps !== "undefined"){
        dataType = 'cat-ordinal';
        parser = 'funnel';
      }
      if ((typeof response.result[0] == 'string' || typeof response.result[0] == 'number') && typeof response.steps === "undefined"){
        dataType = 'nominal';
        parser = 'list';
      }
      if (dataType === void 0) {
        dataType = 'extraction';
        parser = 'extraction';
      }
    }
  }
  if (dataType) {
    this.dataType(dataType);
  }
  this.dataset = Dataset.parser.apply(this, [parser].concat(parserArgs))(response);
  if (parser.indexOf('interval') > -1) {
    this.dataset.updateColumn(0, function(value, i){
      return new Date(value);
    });
  }
  return this;
};
},{"../../core/utils/extend":31,"../../dataset":37}],85:[function(require,module,exports){
var Query = require('../../core/query');
var dataType = require('./dataType'),
    extend = require('../../core/utils/extend'),
    getDefaultTitle = require('../helpers/getDefaultTitle'),
    getQueryDataType = require('../helpers/getQueryDataType'),
    parseRawData = require('./parseRawData'),
    title = require('./title');
module.exports = function(req){
  var response = req.data instanceof Array ? req.data[0] : req.data;
  if (req.queries[0] instanceof Query) {
    response.query = extend({
      analysis_type: req.queries[0].analysis
    }, req.queries[0].params);
    dataType.call(this, getQueryDataType(req.queries[0]));
    this.view.defaults.title = getDefaultTitle.call(this, req);
    if (!title.call(this)) {
      title.call(this, this.view.defaults.title);
    }
  }
  parseRawData.call(this, response);
  return this;
};
},{"../../core/query":24,"../../core/utils/extend":31,"../helpers/getDefaultTitle":59,"../helpers/getQueryDataType":60,"./dataType":75,"./parseRawData":84,"./title":90}],86:[function(require,module,exports){
var Dataviz = require("../dataviz");
module.exports = function(){
  var loader;
  if (this.view._rendered) {
    this.destroy();
  }
  if (this.el()) {
    this.el().innerHTML = "";
    loader = Dataviz.libraries[this.view.loader.library][this.view.loader.chartType];
    if (loader.initialize) {
      loader.initialize.apply(this, arguments);
    }
    if (loader.render) {
      loader.render.apply(this, arguments);
    }
    this.view._prepared = true;
  }
  return this;
};
},{"../dataviz":56}],87:[function(require,module,exports){
module.exports = function(str){
  if (!arguments.length) return this.view["attributes"].sortGroups;
  this.view["attributes"].sortGroups = (str ? String(str) : null);
  runSortGroups.call(this);
  return this;
};
function runSortGroups(){
  var dt = this.dataType();
  if (!this.sortGroups()) return;
  if ((dt && dt.indexOf("chronological") > -1) || this.data()[0].length > 2) {
    this.dataset.sortColumns(this.sortGroups(), this.dataset.getColumnSum);
  }
  else if (dt && (dt.indexOf("cat-") > -1 || dt.indexOf("categorical") > -1)) {
    this.dataset.sortRows(this.sortGroups(), this.dataset.getRowSum);
  }
  return;
}
},{}],88:[function(require,module,exports){
module.exports = function(str){
  if (!arguments.length) return this.view["attributes"].sortIntervals;
  this.view["attributes"].sortIntervals = (str ? String(str) : null);
  runSortIntervals.call(this);
  return this;
};
function runSortIntervals(){
  if (!this.sortIntervals()) return;
  this.dataset.sortRows(this.sortIntervals());
  return;
}
},{}],89:[function(require,module,exports){
module.exports = function(bool){
  if (!arguments.length) return this.view['attributes']['stacked'];
  this.view['attributes']['stacked'] = bool ? true : false;
  return this;
};
},{}],90:[function(require,module,exports){
module.exports = function(str){
  if (!arguments.length) return this.view["attributes"]["title"];
  this.view["attributes"]["title"] = (str ? String(str) : null);
  return this;
};
},{}],91:[function(require,module,exports){
module.exports = function(num){
  if (!arguments.length) return this.view["attributes"]["width"];
  this.view["attributes"]["width"] = (!isNaN(parseInt(num)) ? parseInt(num) : null);
  return this;
};
},{}],92:[function(require,module,exports){
module.exports = function(){
  if (this.labelMapping()) {
    this.labelMapping(this.labelMapping());
  }
  if (this.colorMapping()) {
    this.colorMapping(this.colorMapping());
  }
  if (this.sortGroups()) {
    this.sortGroups(this.sortGroups());
  }
  if (this.sortIntervals()) {
    this.sortIntervals(this.sortIntervals());
  }
};
},{}],93:[function(require,module,exports){
module.exports = function(url, cb) {
  var doc = document;
  var handler;
  var head = doc.head || doc.getElementsByTagName("head");
  setTimeout(function () {
    if ('item' in head) {
      if (!head[0]) {
        setTimeout(arguments.callee, 25);
        return;
      }
      head = head[0];
    }
    var script = doc.createElement("script"),
    scriptdone = false;
    script.onload = script.onreadystatechange = function () {
      if ((script.readyState && script.readyState !== "complete" && script.readyState !== "loaded") || scriptdone) {
        return false;
      }
      script.onload = script.onreadystatechange = null;
      scriptdone = true;
      cb();
    };
    script.src = url;
    head.insertBefore(script, head.firstChild);
  }, 0);
  if (doc.readyState === null && doc.addEventListener) {
    doc.readyState = "loading";
    doc.addEventListener("DOMContentLoaded", handler = function () {
      doc.removeEventListener("DOMContentLoaded", handler, false);
      doc.readyState = "complete";
    }, false);
  }
};
},{}],94:[function(require,module,exports){
module.exports = function(url, cb) {
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.type = 'text/css';
  link.href = url;
  cb();
  document.head.appendChild(link);
};
},{}],95:[function(require,module,exports){
module.exports = function(_input) {
  var input = Number(_input),
      sciNo = input.toPrecision(3),
      prefix = "",
      suffixes = ["", "k", "M", "B", "T"];
  if (Number(sciNo) == input && String(input).length <= 4) {
    return String(input);
  }
  if(input >= 1 || input <= -1) {
    if(input < 0){
      input = -input;
      prefix = "-";
    }
    return prefix + recurse(input, 0);
  } else {
    return input.toPrecision(3);
  }
  function recurse(input, iteration) {
    var input = String(input);
    var split = input.split(".");
    if(split.length > 1) {
      input = split[0];
      var rhs = split[1];
      if (input.length == 2 && rhs.length > 0) {
        if (rhs.length > 0) {
          input = input + "." + rhs.charAt(0);
        }
        else {
          input += "0";
        }
      }
      else if (input.length == 1 && rhs.length > 0) {
        input = input + "." + rhs.charAt(0);
        if(rhs.length > 1) {
          input += rhs.charAt(1);
        }
        else {
          input += "0";
        }
      }
    }
    var numNumerals = input.length;
    if (input.split(".").length > 1) {
      numNumerals--;
    }
    if(numNumerals <= 3) {
      return String(input) + suffixes[iteration];
    }
    else {
      return recurse(Number(input) / 1000, iteration + 1);
    }
  }
};
},{}],96:[function(require,module,exports){
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
    "trackExternalLink"   : require("./core/lib/trackExternalLink"),
    "get"                 : require("./core/lib/get"),
    "post"                : require("./core/lib/post"),
    "put"                 : require("./core/lib/post"),
    "run"                 : require("./core/lib/run"),
    "savedQueries"        : require("./core/saved-queries"),
    "draw"                : require("./dataviz/extensions/draw")
  });
  Keen.Query = require("./core/query");
  Keen.Request = require("./core/request");
  Keen.Dataset = require("./dataset");
  Keen.Dataviz = require("./dataviz");
  Keen.Base64 = require("./core/utils/base64");
  Keen.Spinner = require("spin.js");
  Keen.utils = {
    "domready"     : require("domready"),
    "each"         : require("./core/utils/each"),
    "extend"       : extend,
    "parseParams"  : require("./core/utils/parseParams"),
    "prettyNumber" : require("./dataviz/utils/prettyNumber")
  };
  require("./dataviz/adapters/keen-io")();
  require("./dataviz/adapters/google")();
  require("./dataviz/adapters/c3")();
  require("./dataviz/adapters/chartjs")();
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
},{"./core":16,"./core/async":8,"./core/lib/addEvent":17,"./core/lib/addEvents":18,"./core/lib/get":19,"./core/lib/post":20,"./core/lib/run":21,"./core/lib/setGlobalProperties":22,"./core/lib/trackExternalLink":23,"./core/query":24,"./core/request":25,"./core/saved-queries":26,"./core/utils/base64":27,"./core/utils/each":29,"./core/utils/extend":31,"./core/utils/parseParams":33,"./dataset":37,"./dataviz":61,"./dataviz/adapters/c3":52,"./dataviz/adapters/chartjs":53,"./dataviz/adapters/google":54,"./dataviz/adapters/keen-io":55,"./dataviz/extensions/draw":57,"./dataviz/utils/prettyNumber":95,"domready":2,"spin.js":4}]},{},[96]);
