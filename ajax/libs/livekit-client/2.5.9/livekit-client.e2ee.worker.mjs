/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var loglevel$1 = {exports: {}};

/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
var loglevel = loglevel$1.exports;
var hasRequiredLoglevel;
function requireLoglevel() {
  if (hasRequiredLoglevel) return loglevel$1.exports;
  hasRequiredLoglevel = 1;
  (function (module) {
    (function (root, definition) {

      if (module.exports) {
        module.exports = definition();
      } else {
        root.log = definition();
      }
    })(loglevel, function () {

      // Slightly dubious tricks to cut down minimized file size
      var noop = function () {};
      var undefinedType = "undefined";
      var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
      var logMethods = ["trace", "debug", "info", "warn", "error"];
      var _loggersByName = {};
      var defaultLogger = null;

      // Cross-browser bind equivalent that works at least back to IE6
      function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
          return method.bind(obj);
        } else {
          try {
            return Function.prototype.bind.call(method, obj);
          } catch (e) {
            // Missing bind shim or IE8 + Modernizr, fallback to wrapping
            return function () {
              return Function.prototype.apply.apply(method, [obj, arguments]);
            };
          }
        }
      }

      // Trace() doesn't print the message in IE, so for that case we need to wrap it
      function traceForIE() {
        if (console.log) {
          if (console.log.apply) {
            console.log.apply(console, arguments);
          } else {
            // In old IE, native console methods themselves don't have apply().
            Function.prototype.apply.apply(console.log, [console, arguments]);
          }
        }
        if (console.trace) console.trace();
      }

      // Build the best logging method possible for this env
      // Wherever possible we want to bind, not wrap, to preserve stack traces
      function realMethod(methodName) {
        if (methodName === 'debug') {
          methodName = 'log';
        }
        if (typeof console === undefinedType) {
          return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
          return traceForIE;
        } else if (console[methodName] !== undefined) {
          return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
          return bindMethod(console, 'log');
        } else {
          return noop;
        }
      }

      // These private functions always need `this` to be set properly

      function replaceLoggingMethods() {
        /*jshint validthis:true */
        var level = this.getLevel();

        // Replace the actual methods.
        for (var i = 0; i < logMethods.length; i++) {
          var methodName = logMethods[i];
          this[methodName] = i < level ? noop : this.methodFactory(methodName, level, this.name);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;

        // Return any important warnings.
        if (typeof console === undefinedType && level < this.levels.SILENT) {
          return "No console available for logging";
        }
      }

      // In old IE versions, the console isn't present until you first open it.
      // We build realMethod() replacements here that regenerate logging methods
      function enableLoggingWhenConsoleArrives(methodName) {
        return function () {
          if (typeof console !== undefinedType) {
            replaceLoggingMethods.call(this);
            this[methodName].apply(this, arguments);
          }
        };
      }

      // By default, we use closely bound real methods wherever possible, and
      // otherwise we wait for a console to appear, and then try again.
      function defaultMethodFactory(methodName, _level, _loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
      }
      function Logger(name, factory) {
        // Private instance variables.
        var self = this;
        /**
         * The level inherited from a parent logger (or a global default). We
         * cache this here rather than delegating to the parent so that it stays
         * in sync with the actual logging methods that we have installed (the
         * parent could change levels but we might not have rebuilt the loggers
         * in this child yet).
         * @type {number}
         */
        var inheritedLevel;
        /**
         * The default level for this logger, if any. If set, this overrides
         * `inheritedLevel`.
         * @type {number|null}
         */
        var defaultLevel;
        /**
         * A user-specific level for this logger. If set, this overrides
         * `defaultLevel`.
         * @type {number|null}
         */
        var userLevel;
        var storageKey = "loglevel";
        if (typeof name === "string") {
          storageKey += ":" + name;
        } else if (typeof name === "symbol") {
          storageKey = undefined;
        }
        function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
            window.localStorage[storageKey] = levelName;
            return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
            window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
        }
        function getPersistedLevel() {
          var storedLevel;
          if (typeof window === undefinedType || !storageKey) return;
          try {
            storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
            try {
              var cookie = window.document.cookie;
              var cookieName = encodeURIComponent(storageKey);
              var location = cookie.indexOf(cookieName + "=");
              if (location !== -1) {
                storedLevel = /^([^;]+)/.exec(cookie.slice(location + cookieName.length + 1))[1];
              }
            } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
            storedLevel = undefined;
          }
          return storedLevel;
        }
        function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
            window.localStorage.removeItem(storageKey);
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
            window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {}
        }
        function normalizeLevel(input) {
          var level = input;
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
            level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
            return level;
          } else {
            throw new TypeError("log.setLevel() called with invalid level: " + input);
          }
        }

        /*
         *
         * Public logger API - see https://github.com/pimterry/loglevel for details
         *
         */

        self.name = name;
        self.levels = {
          "TRACE": 0,
          "DEBUG": 1,
          "INFO": 2,
          "WARN": 3,
          "ERROR": 4,
          "SILENT": 5
        };
        self.methodFactory = factory || defaultMethodFactory;
        self.getLevel = function () {
          if (userLevel != null) {
            return userLevel;
          } else if (defaultLevel != null) {
            return defaultLevel;
          } else {
            return inheritedLevel;
          }
        };
        self.setLevel = function (level, persist) {
          userLevel = normalizeLevel(level);
          if (persist !== false) {
            // defaults to true
            persistLevelIfPossible(userLevel);
          }

          // NOTE: in v2, this should call rebuild(), which updates children.
          return replaceLoggingMethods.call(self);
        };
        self.setDefaultLevel = function (level) {
          defaultLevel = normalizeLevel(level);
          if (!getPersistedLevel()) {
            self.setLevel(level, false);
          }
        };
        self.resetLevel = function () {
          userLevel = null;
          clearPersistedLevel();
          replaceLoggingMethods.call(self);
        };
        self.enableAll = function (persist) {
          self.setLevel(self.levels.TRACE, persist);
        };
        self.disableAll = function (persist) {
          self.setLevel(self.levels.SILENT, persist);
        };
        self.rebuild = function () {
          if (defaultLogger !== self) {
            inheritedLevel = normalizeLevel(defaultLogger.getLevel());
          }
          replaceLoggingMethods.call(self);
          if (defaultLogger === self) {
            for (var childName in _loggersByName) {
              _loggersByName[childName].rebuild();
            }
          }
        };

        // Initialize all the internal levels.
        inheritedLevel = normalizeLevel(defaultLogger ? defaultLogger.getLevel() : "WARN");
        var initialLevel = getPersistedLevel();
        if (initialLevel != null) {
          userLevel = normalizeLevel(initialLevel);
        }
        replaceLoggingMethods.call(self);
      }

      /*
       *
       * Top-level API
       *
       */

      defaultLogger = new Logger();
      defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }
        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(name, defaultLogger.methodFactory);
        }
        return logger;
      };

      // Grab the current global log variable in case of overwrite
      var _log = typeof window !== undefinedType ? window.log : undefined;
      defaultLogger.noConflict = function () {
        if (typeof window !== undefinedType && window.log === defaultLogger) {
          window.log = _log;
        }
        return defaultLogger;
      };
      defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
      };

      // ES6 default export, for compatibility
      defaultLogger['default'] = defaultLogger;
      return defaultLogger;
    });
  })(loglevel$1);
  return loglevel$1.exports;
}

var loglevelExports = requireLoglevel();

var LogLevel;
(function (LogLevel) {
  LogLevel[LogLevel["trace"] = 0] = "trace";
  LogLevel[LogLevel["debug"] = 1] = "debug";
  LogLevel[LogLevel["info"] = 2] = "info";
  LogLevel[LogLevel["warn"] = 3] = "warn";
  LogLevel[LogLevel["error"] = 4] = "error";
  LogLevel[LogLevel["silent"] = 5] = "silent";
})(LogLevel || (LogLevel = {}));
var LoggerNames;
(function (LoggerNames) {
  LoggerNames["Default"] = "livekit";
  LoggerNames["Room"] = "livekit-room";
  LoggerNames["Participant"] = "livekit-participant";
  LoggerNames["Track"] = "livekit-track";
  LoggerNames["Publication"] = "livekit-track-publication";
  LoggerNames["Engine"] = "livekit-engine";
  LoggerNames["Signal"] = "livekit-signal";
  LoggerNames["PCManager"] = "livekit-pc-manager";
  LoggerNames["PCTransport"] = "livekit-pc-transport";
  LoggerNames["E2EE"] = "lk-e2ee";
})(LoggerNames || (LoggerNames = {}));
let livekitLogger = loglevelExports.getLogger('livekit');
Object.values(LoggerNames).map(name => loglevelExports.getLogger(name));
livekitLogger.setDefaultLevel(LogLevel.info);
/**
 * @internal
 */
function getLogger(name) {
  const logger = loglevelExports.getLogger(name);
  logger.setDefaultLevel(livekitLogger.getLevel());
  return logger;
}
const workerLogger = loglevelExports.getLogger('lk-e2ee');

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Assert that condition is truthy or throw error (with message)
 */
function assert(condition, msg) {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- we want the implicit conversion to boolean
  if (!condition) {
    throw new Error(msg);
  }
}
const FLOAT32_MAX = 3.4028234663852886e38,
  FLOAT32_MIN = -3.4028234663852886e38,
  UINT32_MAX = 0xffffffff,
  INT32_MAX = 0x7fffffff,
  INT32_MIN = -0x80000000;
/**
 * Assert a valid signed protobuf 32-bit integer.
 */
function assertInt32(arg) {
  if (typeof arg !== "number") throw new Error("invalid int 32: " + typeof arg);
  if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN) throw new Error("invalid int 32: " + arg); // eslint-disable-line @typescript-eslint/restrict-plus-operands -- we want the implicit conversion to string
}
/**
 * Assert a valid unsigned protobuf 32-bit integer.
 */
function assertUInt32(arg) {
  if (typeof arg !== "number") throw new Error("invalid uint 32: " + typeof arg);
  if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0) throw new Error("invalid uint 32: " + arg); // eslint-disable-line @typescript-eslint/restrict-plus-operands -- we want the implicit conversion to string
}
/**
 * Assert a valid protobuf float value.
 */
function assertFloat32(arg) {
  if (typeof arg !== "number") throw new Error("invalid float 32: " + typeof arg);
  if (!Number.isFinite(arg)) return;
  if (arg > FLOAT32_MAX || arg < FLOAT32_MIN) throw new Error("invalid float 32: " + arg); // eslint-disable-line @typescript-eslint/restrict-plus-operands -- we want the implicit conversion to string
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const enumTypeSymbol = Symbol("@bufbuild/protobuf/enum-type");
/**
 * Get reflection information from a generated enum.
 * If this function is called on something other than a generated
 * enum, it raises an error.
 */
function getEnumType(enumObject) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
  const t = enumObject[enumTypeSymbol];
  assert(t, "missing enum type on enum object");
  return t; // eslint-disable-line @typescript-eslint/no-unsafe-return
}
/**
 * Sets reflection information on a generated enum.
 */
function setEnumType(enumObject, typeName, values, opt) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  enumObject[enumTypeSymbol] = makeEnumType(typeName, values.map(v => ({
    no: v.no,
    name: v.name,
    localName: enumObject[v.no]
  })));
}
/**
 * Create a new EnumType with the given values.
 */
function makeEnumType(typeName, values,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_opt) {
  const names = Object.create(null);
  const numbers = Object.create(null);
  const normalValues = [];
  for (const value of values) {
    // We do not surface options at this time
    // const value: EnumValueInfo = {...v, options: v.options ?? emptyReadonlyObject};
    const n = normalizeEnumValue(value);
    normalValues.push(n);
    names[value.name] = n;
    numbers[value.no] = n;
  }
  return {
    typeName,
    values: normalValues,
    // We do not surface options at this time
    // options: opt?.options ?? Object.create(null),
    findName(name) {
      return names[name];
    },
    findNumber(no) {
      return numbers[no];
    }
  };
}
/**
 * Create a new enum object with the given values.
 * Sets reflection information.
 */
function makeEnum(typeName, values, opt) {
  const enumObject = {};
  for (const value of values) {
    const n = normalizeEnumValue(value);
    enumObject[n.localName] = n.no;
    enumObject[n.no] = n.localName;
  }
  setEnumType(enumObject, typeName, values);
  return enumObject;
}
function normalizeEnumValue(value) {
  if ("localName" in value) {
    return value;
  }
  return Object.assign(Object.assign({}, value), {
    localName: value.name
  });
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Message is the base class of every message, generated, or created at
 * runtime.
 *
 * It is _not_ safe to extend this class. If you want to create a message at
 * run time, use proto3.makeMessageType().
 */
class Message {
  /**
   * Compare with a message of the same type.
   * Note that this function disregards extensions and unknown fields.
   */
  equals(other) {
    return this.getType().runtime.util.equals(this.getType(), this, other);
  }
  /**
   * Create a deep copy.
   */
  clone() {
    return this.getType().runtime.util.clone(this);
  }
  /**
   * Parse from binary data, merging fields.
   *
   * Repeated fields are appended. Map entries are added, overwriting
   * existing keys.
   *
   * If a message field is already present, it will be merged with the
   * new data.
   */
  fromBinary(bytes, options) {
    const type = this.getType(),
      format = type.runtime.bin,
      opt = format.makeReadOptions(options);
    format.readMessage(this, opt.readerFactory(bytes), bytes.byteLength, opt);
    return this;
  }
  /**
   * Parse a message from a JSON value.
   */
  fromJson(jsonValue, options) {
    const type = this.getType(),
      format = type.runtime.json,
      opt = format.makeReadOptions(options);
    format.readMessage(type, jsonValue, opt, this);
    return this;
  }
  /**
   * Parse a message from a JSON string.
   */
  fromJsonString(jsonString, options) {
    let json;
    try {
      json = JSON.parse(jsonString);
    } catch (e) {
      throw new Error("cannot decode ".concat(this.getType().typeName, " from JSON: ").concat(e instanceof Error ? e.message : String(e)));
    }
    return this.fromJson(json, options);
  }
  /**
   * Serialize the message to binary data.
   */
  toBinary(options) {
    const type = this.getType(),
      bin = type.runtime.bin,
      opt = bin.makeWriteOptions(options),
      writer = opt.writerFactory();
    bin.writeMessage(this, writer, opt);
    return writer.finish();
  }
  /**
   * Serialize the message to a JSON value, a JavaScript value that can be
   * passed to JSON.stringify().
   */
  toJson(options) {
    const type = this.getType(),
      json = type.runtime.json,
      opt = json.makeWriteOptions(options);
    return json.writeMessage(this, opt);
  }
  /**
   * Serialize the message to a JSON string.
   */
  toJsonString(options) {
    var _a;
    const value = this.toJson(options);
    return JSON.stringify(value, null, (_a = options === null || options === void 0 ? void 0 : options.prettySpaces) !== null && _a !== void 0 ? _a : 0);
  }
  /**
   * Override for serialization behavior. This will be invoked when calling
   * JSON.stringify on this message (i.e. JSON.stringify(msg)).
   *
   * Note that this will not serialize google.protobuf.Any with a packed
   * message because the protobuf JSON format specifies that it needs to be
   * unpacked, and this is only possible with a type registry to look up the
   * message type.  As a result, attempting to serialize a message with this
   * type will throw an Error.
   *
   * This method is protected because you should not need to invoke it
   * directly -- instead use JSON.stringify or toJsonString for
   * stringified JSON.  Alternatively, if actual JSON is desired, you should
   * use toJson.
   */
  toJSON() {
    return this.toJson({
      emitDefaultValues: true
    });
  }
  /**
   * Retrieve the MessageType of this message - a singleton that represents
   * the protobuf message declaration and provides metadata for reflection-
   * based operations.
   */
  getType() {
    // Any class that extends Message _must_ provide a complete static
    // implementation of MessageType.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return Object.getPrototypeOf(this).constructor;
  }
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Create a new message type using the given runtime.
 */
function makeMessageType(runtime, typeName, fields, opt) {
  var _a;
  const localName = (_a = opt === null || opt === void 0 ? void 0 : opt.localName) !== null && _a !== void 0 ? _a : typeName.substring(typeName.lastIndexOf(".") + 1);
  const type = {
    [localName]: function (data) {
      runtime.util.initFields(this);
      runtime.util.initPartial(data, this);
    }
  }[localName];
  Object.setPrototypeOf(type.prototype, new Message());
  Object.assign(type, {
    runtime,
    typeName,
    fields: runtime.util.newFieldList(fields),
    fromBinary(bytes, options) {
      return new type().fromBinary(bytes, options);
    },
    fromJson(jsonValue, options) {
      return new type().fromJson(jsonValue, options);
    },
    fromJsonString(jsonString, options) {
      return new type().fromJsonString(jsonString, options);
    },
    equals(a, b) {
      return runtime.util.equals(type, a, b);
    }
  });
  return type;
}

// Copyright 2008 Google Inc.  All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
// * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
// * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Code generated by the Protocol Buffer compiler is owned by the owner
// of the input file used when generating it.  This code is not
// standalone and requires a support library to be linked with it.  This
// support library is itself covered by the above license.
/* eslint-disable prefer-const,@typescript-eslint/restrict-plus-operands */
/**
 * Read a 64 bit varint as two JS numbers.
 *
 * Returns tuple:
 * [0]: low bits
 * [1]: high bits
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L175
 */
function varint64read() {
  let lowBits = 0;
  let highBits = 0;
  for (let shift = 0; shift < 28; shift += 7) {
    let b = this.buf[this.pos++];
    lowBits |= (b & 0x7f) << shift;
    if ((b & 0x80) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  let middleByte = this.buf[this.pos++];
  // last four bits of the first 32 bit number
  lowBits |= (middleByte & 0x0f) << 28;
  // 3 upper bits are part of the next 32 bit number
  highBits = (middleByte & 0x70) >> 4;
  if ((middleByte & 0x80) == 0) {
    this.assertBounds();
    return [lowBits, highBits];
  }
  for (let shift = 3; shift <= 31; shift += 7) {
    let b = this.buf[this.pos++];
    highBits |= (b & 0x7f) << shift;
    if ((b & 0x80) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  throw new Error("invalid varint");
}
/**
 * Write a 64 bit varint, given as two JS numbers, to the given bytes array.
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/writer.js#L344
 */
function varint64write(lo, hi, bytes) {
  for (let i = 0; i < 28; i = i + 7) {
    const shift = lo >>> i;
    const hasNext = !(shift >>> 7 == 0 && hi == 0);
    const byte = (hasNext ? shift | 0x80 : shift) & 0xff;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  const splitBits = lo >>> 28 & 0x0f | (hi & 0x07) << 4;
  const hasMoreBits = !(hi >> 3 == 0);
  bytes.push((hasMoreBits ? splitBits | 0x80 : splitBits) & 0xff);
  if (!hasMoreBits) {
    return;
  }
  for (let i = 3; i < 31; i = i + 7) {
    const shift = hi >>> i;
    const hasNext = !(shift >>> 7 == 0);
    const byte = (hasNext ? shift | 0x80 : shift) & 0xff;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  bytes.push(hi >>> 31 & 0x01);
}
// constants for binary math
const TWO_PWR_32_DBL = 0x100000000;
/**
 * Parse decimal string of 64 bit integer value as two JS numbers.
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
 */
function int64FromString(dec) {
  // Check for minus sign.
  const minus = dec[0] === "-";
  if (minus) {
    dec = dec.slice(1);
  }
  // Work 6 decimal digits at a time, acting like we're converting base 1e6
  // digits to binary. This is safe to do with floating point math because
  // Number.isSafeInteger(ALL_32_BITS * 1e6) == true.
  const base = 1e6;
  let lowBits = 0;
  let highBits = 0;
  function add1e6digit(begin, end) {
    // Note: Number('') is 0.
    const digit1e6 = Number(dec.slice(begin, end));
    highBits *= base;
    lowBits = lowBits * base + digit1e6;
    // Carry bits from lowBits to
    if (lowBits >= TWO_PWR_32_DBL) {
      highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
      lowBits = lowBits % TWO_PWR_32_DBL;
    }
  }
  add1e6digit(-24, -18);
  add1e6digit(-18, -12);
  add1e6digit(-12, -6);
  add1e6digit(-6);
  return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
}
/**
 * Losslessly converts a 64-bit signed integer in 32:32 split representation
 * into a decimal string.
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
 */
function int64ToString(lo, hi) {
  let bits = newBits(lo, hi);
  // If we're treating the input as a signed value and the high bit is set, do
  // a manual two's complement conversion before the decimal conversion.
  const negative = bits.hi & 0x80000000;
  if (negative) {
    bits = negate(bits.lo, bits.hi);
  }
  const result = uInt64ToString(bits.lo, bits.hi);
  return negative ? "-" + result : result;
}
/**
 * Losslessly converts a 64-bit unsigned integer in 32:32 split representation
 * into a decimal string.
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf-javascript/blob/a428c58273abad07c66071d9753bc4d1289de426/experimental/runtime/int64.js#L10
 */
function uInt64ToString(lo, hi) {
  ({
    lo,
    hi
  } = toUnsigned(lo, hi));
  // Skip the expensive conversion if the number is small enough to use the
  // built-in conversions.
  // Number.MAX_SAFE_INTEGER = 0x001FFFFF FFFFFFFF, thus any number with
  // highBits <= 0x1FFFFF can be safely expressed with a double and retain
  // integer precision.
  // Proven by: Number.isSafeInteger(0x1FFFFF * 2**32 + 0xFFFFFFFF) == true.
  if (hi <= 0x1FFFFF) {
    return String(TWO_PWR_32_DBL * hi + lo);
  }
  // What this code is doing is essentially converting the input number from
  // base-2 to base-1e7, which allows us to represent the 64-bit range with
  // only 3 (very large) digits. Those digits are then trivial to convert to
  // a base-10 string.
  // The magic numbers used here are -
  // 2^24 = 16777216 = (1,6777216) in base-1e7.
  // 2^48 = 281474976710656 = (2,8147497,6710656) in base-1e7.
  // Split 32:32 representation into 16:24:24 representation so our
  // intermediate digits don't overflow.
  const low = lo & 0xFFFFFF;
  const mid = (lo >>> 24 | hi << 8) & 0xFFFFFF;
  const high = hi >> 16 & 0xFFFF;
  // Assemble our three base-1e7 digits, ignoring carries. The maximum
  // value in a digit at this step is representable as a 48-bit integer, which
  // can be stored in a 64-bit floating point number.
  let digitA = low + mid * 6777216 + high * 6710656;
  let digitB = mid + high * 8147497;
  let digitC = high * 2;
  // Apply carries from A to B and from B to C.
  const base = 10000000;
  if (digitA >= base) {
    digitB += Math.floor(digitA / base);
    digitA %= base;
  }
  if (digitB >= base) {
    digitC += Math.floor(digitB / base);
    digitB %= base;
  }
  // If digitC is 0, then we should have returned in the trivial code path
  // at the top for non-safe integers. Given this, we can assume both digitB
  // and digitA need leading zeros.
  return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
}
function toUnsigned(lo, hi) {
  return {
    lo: lo >>> 0,
    hi: hi >>> 0
  };
}
function newBits(lo, hi) {
  return {
    lo: lo | 0,
    hi: hi | 0
  };
}
/**
 * Returns two's compliment negation of input.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Signed_32-bit_integers
 */
function negate(lowBits, highBits) {
  highBits = ~highBits;
  if (lowBits) {
    lowBits = ~lowBits + 1;
  } else {
    // If lowBits is 0, then bitwise-not is 0xFFFFFFFF,
    // adding 1 to that, results in 0x100000000, which leaves
    // the low bits 0x0 and simply adds one to the high bits.
    highBits += 1;
  }
  return newBits(lowBits, highBits);
}
/**
 * Returns decimal representation of digit1e7 with leading zeros.
 */
const decimalFrom1e7WithLeadingZeros = digit1e7 => {
  const partial = String(digit1e7);
  return "0000000".slice(partial.length) + partial;
};
/**
 * Write a 32 bit varint, signed or unsigned. Same as `varint64write(0, value, bytes)`
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/1b18833f4f2a2f681f4e4a25cdf3b0a43115ec26/js/binary/encoder.js#L144
 */
function varint32write(value, bytes) {
  if (value >= 0) {
    // write value as varint 32
    while (value > 0x7f) {
      bytes.push(value & 0x7f | 0x80);
      value = value >>> 7;
    }
    bytes.push(value);
  } else {
    for (let i = 0; i < 9; i++) {
      bytes.push(value & 127 | 128);
      value = value >> 7;
    }
    bytes.push(1);
  }
}
/**
 * Read an unsigned 32 bit varint.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L220
 */
function varint32read() {
  let b = this.buf[this.pos++];
  let result = b & 0x7f;
  if ((b & 0x80) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 0x7f) << 7;
  if ((b & 0x80) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 0x7f) << 14;
  if ((b & 0x80) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 0x7f) << 21;
  if ((b & 0x80) == 0) {
    this.assertBounds();
    return result;
  }
  // Extract only last 4 bits
  b = this.buf[this.pos++];
  result |= (b & 0x0f) << 28;
  for (let readBytes = 5; (b & 0x80) !== 0 && readBytes < 10; readBytes++) b = this.buf[this.pos++];
  if ((b & 0x80) != 0) throw new Error("invalid varint");
  this.assertBounds();
  // Result can have 32 bits, convert it to unsigned
  return result >>> 0;
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
function makeInt64Support() {
  const dv = new DataView(new ArrayBuffer(8));
  // note that Safari 14 implements BigInt, but not the DataView methods
  const ok = typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1");
  if (ok) {
    const MIN = BigInt("-9223372036854775808"),
      MAX = BigInt("9223372036854775807"),
      UMIN = BigInt("0"),
      UMAX = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: true,
      parse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > MAX || bi < MIN) {
          throw new Error("int64 invalid: ".concat(value));
        }
        return bi;
      },
      uParse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > UMAX || bi < UMIN) {
          throw new Error("uint64 invalid: ".concat(value));
        }
        return bi;
      },
      enc(value) {
        dv.setBigInt64(0, this.parse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      uEnc(value) {
        dv.setBigInt64(0, this.uParse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      dec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigInt64(0, true);
      },
      uDec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigUint64(0, true);
      }
    };
  }
  const assertInt64String = value => assert(/^-?[0-9]+$/.test(value), "int64 invalid: ".concat(value));
  const assertUInt64String = value => assert(/^[0-9]+$/.test(value), "uint64 invalid: ".concat(value));
  return {
    zero: "0",
    supported: false,
    parse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return value;
    },
    uParse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return value;
    },
    enc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return int64FromString(value);
    },
    uEnc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return int64FromString(value);
    },
    dec(lo, hi) {
      return int64ToString(lo, hi);
    },
    uDec(lo, hi) {
      return uInt64ToString(lo, hi);
    }
  };
}
const protoInt64 = makeInt64Support();

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Scalar value types. This is a subset of field types declared by protobuf
 * enum google.protobuf.FieldDescriptorProto.Type The types GROUP and MESSAGE
 * are omitted, but the numerical values are identical.
 */
var ScalarType;
(function (ScalarType) {
  // 0 is reserved for errors.
  // Order is weird for historical reasons.
  ScalarType[ScalarType["DOUBLE"] = 1] = "DOUBLE";
  ScalarType[ScalarType["FLOAT"] = 2] = "FLOAT";
  // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
  // negative values are likely.
  ScalarType[ScalarType["INT64"] = 3] = "INT64";
  ScalarType[ScalarType["UINT64"] = 4] = "UINT64";
  // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
  // negative values are likely.
  ScalarType[ScalarType["INT32"] = 5] = "INT32";
  ScalarType[ScalarType["FIXED64"] = 6] = "FIXED64";
  ScalarType[ScalarType["FIXED32"] = 7] = "FIXED32";
  ScalarType[ScalarType["BOOL"] = 8] = "BOOL";
  ScalarType[ScalarType["STRING"] = 9] = "STRING";
  // Tag-delimited aggregate.
  // Group type is deprecated and not supported in proto3. However, Proto3
  // implementations should still be able to parse the group wire format and
  // treat group fields as unknown fields.
  // TYPE_GROUP = 10,
  // TYPE_MESSAGE = 11,  // Length-delimited aggregate.
  // New in version 2.
  ScalarType[ScalarType["BYTES"] = 12] = "BYTES";
  ScalarType[ScalarType["UINT32"] = 13] = "UINT32";
  // TYPE_ENUM = 14,
  ScalarType[ScalarType["SFIXED32"] = 15] = "SFIXED32";
  ScalarType[ScalarType["SFIXED64"] = 16] = "SFIXED64";
  ScalarType[ScalarType["SINT32"] = 17] = "SINT32";
  ScalarType[ScalarType["SINT64"] = 18] = "SINT64";
})(ScalarType || (ScalarType = {}));
/**
 * JavaScript representation of fields with 64 bit integral types (int64, uint64,
 * sint64, fixed64, sfixed64).
 *
 * This is a subset of google.protobuf.FieldOptions.JSType, which defines JS_NORMAL,
 * JS_STRING, and JS_NUMBER. Protobuf-ES uses BigInt by default, but will use
 * String if `[jstype = JS_STRING]` is specified.
 *
 * ```protobuf
 * uint64 field_a = 1; // BigInt
 * uint64 field_b = 2 [jstype = JS_NORMAL]; // BigInt
 * uint64 field_b = 2 [jstype = JS_NUMBER]; // BigInt
 * uint64 field_b = 2 [jstype = JS_STRING]; // String
 * ```
 */
var LongType;
(function (LongType) {
  /**
   * Use JavaScript BigInt.
   */
  LongType[LongType["BIGINT"] = 0] = "BIGINT";
  /**
   * Use JavaScript String.
   *
   * Field option `[jstype = JS_STRING]`.
   */
  LongType[LongType["STRING"] = 1] = "STRING";
})(LongType || (LongType = {}));

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Returns true if both scalar values are equal.
 */
function scalarEquals(type, a, b) {
  if (a === b) {
    // This correctly matches equal values except BYTES and (possibly) 64-bit integers.
    return true;
  }
  // Special case BYTES - we need to compare each byte individually
  if (type == ScalarType.BYTES) {
    if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  // Special case 64-bit integers - we support number, string and bigint representation.
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (type) {
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      // Loose comparison will match between 0n, 0 and "0".
      return a == b;
  }
  // Anything that hasn't been caught by strict comparison or special cased
  // BYTES and 64-bit integers is not equal.
  return false;
}
/**
 * Returns the zero value for the given scalar type.
 */
function scalarZeroValue(type, longType) {
  switch (type) {
    case ScalarType.BOOL:
      return false;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- acceptable since it's covered by tests
      return longType == 0 ? protoInt64.zero : "0";
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return 0.0;
    case ScalarType.BYTES:
      return new Uint8Array(0);
    case ScalarType.STRING:
      return "";
    default:
      // Handles INT32, UINT32, SINT32, FIXED32, SFIXED32.
      // We do not use individual cases to save a few bytes code size.
      return 0;
  }
}
/**
 * Returns true for a zero-value. For example, an integer has the zero-value `0`,
 * a boolean is `false`, a string is `""`, and bytes is an empty Uint8Array.
 *
 * In proto3, zero-values are not written to the wire, unless the field is
 * optional or repeated.
 */
function isScalarZeroValue(type, value) {
  switch (type) {
    case ScalarType.BOOL:
      return value === false;
    case ScalarType.STRING:
      return value === "";
    case ScalarType.BYTES:
      return value instanceof Uint8Array && !value.byteLength;
    default:
      return value == 0;
    // Loose comparison matches 0n, 0 and "0"
  }
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable prefer-const,no-case-declarations,@typescript-eslint/restrict-plus-operands */
/**
 * Protobuf binary format wire types.
 *
 * A wire type provides just enough information to find the length of the
 * following value.
 *
 * See https://developers.google.com/protocol-buffers/docs/encoding#structure
 */
var WireType;
(function (WireType) {
  /**
   * Used for int32, int64, uint32, uint64, sint32, sint64, bool, enum
   */
  WireType[WireType["Varint"] = 0] = "Varint";
  /**
   * Used for fixed64, sfixed64, double.
   * Always 8 bytes with little-endian byte order.
   */
  WireType[WireType["Bit64"] = 1] = "Bit64";
  /**
   * Used for string, bytes, embedded messages, packed repeated fields
   *
   * Only repeated numeric types (types which use the varint, 32-bit,
   * or 64-bit wire types) can be packed. In proto3, such fields are
   * packed by default.
   */
  WireType[WireType["LengthDelimited"] = 2] = "LengthDelimited";
  /**
   * Start of a tag-delimited aggregate, such as a proto2 group, or a message
   * in editions with message_encoding = DELIMITED.
   */
  WireType[WireType["StartGroup"] = 3] = "StartGroup";
  /**
   * End of a tag-delimited aggregate.
   */
  WireType[WireType["EndGroup"] = 4] = "EndGroup";
  /**
   * Used for fixed32, sfixed32, float.
   * Always 4 bytes with little-endian byte order.
   */
  WireType[WireType["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));
class BinaryWriter {
  constructor(textEncoder) {
    /**
     * Previous fork states.
     */
    this.stack = [];
    this.textEncoder = textEncoder !== null && textEncoder !== void 0 ? textEncoder : new TextEncoder();
    this.chunks = [];
    this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.chunks.push(new Uint8Array(this.buf)); // flush the buffer
    let len = 0;
    for (let i = 0; i < this.chunks.length; i++) len += this.chunks[i].length;
    let bytes = new Uint8Array(len);
    let offset = 0;
    for (let i = 0; i < this.chunks.length; i++) {
      bytes.set(this.chunks[i], offset);
      offset += this.chunks[i].length;
    }
    this.chunks = [];
    return bytes;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    this.stack.push({
      chunks: this.chunks,
      buf: this.buf
    });
    this.chunks = [];
    this.buf = [];
    return this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    // get chunk of fork
    let chunk = this.finish();
    // restore previous state
    let prev = this.stack.pop();
    if (!prev) throw new Error("invalid state, fork stack empty");
    this.chunks = prev.chunks;
    this.buf = prev.buf;
    // write length of chunk as varint
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(fieldNo, type) {
    return this.uint32((fieldNo << 3 | type) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk) {
    if (this.buf.length) {
      this.chunks.push(new Uint8Array(this.buf));
      this.buf = [];
    }
    this.chunks.push(chunk);
    return this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value) {
    assertUInt32(value);
    // write value as varint 32, inlined for speed
    while (value > 0x7f) {
      this.buf.push(value & 0x7f | 0x80);
      value = value >>> 7;
    }
    this.buf.push(value);
    return this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value) {
    assertInt32(value);
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(value) {
    this.buf.push(value ? 1 : 0);
    return this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value) {
    this.uint32(value.byteLength); // write length of chunk as varint
    return this.raw(value);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value) {
    let chunk = this.textEncoder.encode(value);
    this.uint32(chunk.byteLength); // write length of chunk as varint
    return this.raw(chunk);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value) {
    assertFloat32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setFloat32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value) {
    let chunk = new Uint8Array(8);
    new DataView(chunk.buffer).setFloat64(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value) {
    assertUInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setUint32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value) {
    assertInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setInt32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value) {
    assertInt32(value);
    // zigzag encode
    value = (value << 1 ^ value >> 31) >>> 0;
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value) {
    let chunk = new Uint8Array(8),
      view = new DataView(chunk.buffer),
      tc = protoInt64.enc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value) {
    let chunk = new Uint8Array(8),
      view = new DataView(chunk.buffer),
      tc = protoInt64.uEnc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value) {
    let tc = protoInt64.enc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value) {
    let tc = protoInt64.enc(value),
      // zigzag encode
      sign = tc.hi >> 31,
      lo = tc.lo << 1 ^ sign,
      hi = (tc.hi << 1 | tc.lo >>> 31) ^ sign;
    varint64write(lo, hi, this.buf);
    return this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value) {
    let tc = protoInt64.uEnc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
}
class BinaryReader {
  constructor(buf, textDecoder) {
    this.varint64 = varint64read; // dirty cast for `this`
    /**
     * Read a `uint32` field, an unsigned 32 bit varint.
     */
    this.uint32 = varint32read; // dirty cast for `this` and access to protected `buf`
    this.buf = buf;
    this.len = buf.length;
    this.pos = 0;
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    this.textDecoder = textDecoder !== null && textDecoder !== void 0 ? textDecoder : new TextDecoder();
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let tag = this.uint32(),
      fieldNo = tag >>> 3,
      wireType = tag & 7;
    if (fieldNo <= 0 || wireType < 0 || wireType > 5) throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
    return [fieldNo, wireType];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(wireType, fieldNo) {
    let start = this.pos;
    switch (wireType) {
      case WireType.Varint:
        while (this.buf[this.pos++] & 0x80) {
          // ignore
        }
        break;
      // eslint-disable-next-line
      // @ts-ignore TS7029: Fallthrough case in switch
      case WireType.Bit64:
        this.pos += 4;
      // eslint-disable-next-line
      // @ts-ignore TS7029: Fallthrough case in switch
      case WireType.Bit32:
        this.pos += 4;
        break;
      case WireType.LengthDelimited:
        let len = this.uint32();
        this.pos += len;
        break;
      case WireType.StartGroup:
        for (;;) {
          const [fn, wt] = this.tag();
          if (wt === WireType.EndGroup) {
            if (fieldNo !== undefined && fn !== fieldNo) {
              throw new Error("invalid end group tag");
            }
            break;
          }
          this.skip(wt, fn);
        }
        break;
      default:
        throw new Error("cant skip wire type " + wireType);
    }
    this.assertBounds();
    return this.buf.subarray(start, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len) throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let zze = this.uint32();
    // decode zigzag
    return zze >>> 1 ^ -(zze & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return protoInt64.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return protoInt64.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [lo, hi] = this.varint64();
    // decode zig zag
    let s = -(lo & 1);
    lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
    hi = hi >>> 1 ^ s;
    return protoInt64.dec(lo, hi);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [lo, hi] = this.varint64();
    return lo !== 0 || hi !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return protoInt64.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return protoInt64.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, true);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let len = this.uint32(),
      start = this.pos;
    this.pos += len;
    this.assertBounds();
    return this.buf.subarray(start, start + len);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.textDecoder.decode(this.bytes());
  }
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Create a new extension using the given runtime.
 */
function makeExtension(runtime, typeName, extendee, field) {
  let fi;
  return {
    typeName,
    extendee,
    get field() {
      if (!fi) {
        const i = typeof field == "function" ? field() : field;
        i.name = typeName.split(".").pop();
        i.jsonName = "[".concat(typeName, "]");
        fi = runtime.util.newFieldList([i]).list()[0];
      }
      return fi;
    },
    runtime
  };
}
/**
 * Create a container that allows us to read extension fields into it with the
 * same logic as regular fields.
 */
function createExtensionContainer(extension) {
  const localName = extension.field.localName;
  const container = Object.create(null);
  container[localName] = initExtensionField(extension);
  return [container, () => container[localName]];
}
function initExtensionField(ext) {
  const field = ext.field;
  if (field.repeated) {
    return [];
  }
  if (field.default !== undefined) {
    return field.default;
  }
  switch (field.kind) {
    case "enum":
      return field.T.values[0].no;
    case "scalar":
      return scalarZeroValue(field.T, field.L);
    case "message":
      // eslint-disable-next-line no-case-declarations
      const T = field.T,
        value = new T();
      return T.fieldWrapper ? T.fieldWrapper.unwrapField(value) : value;
    case "map":
      throw "map fields are not allowed to be extensions";
  }
}
/**
 * Helper to filter unknown fields, optimized based on field type.
 */
function filterUnknownFields(unknownFields, field) {
  if (!field.repeated && (field.kind == "enum" || field.kind == "scalar")) {
    // singular scalar fields do not merge, we pick the last
    for (let i = unknownFields.length - 1; i >= 0; --i) {
      if (unknownFields[i].no == field.no) {
        return [unknownFields[i]];
      }
    }
    return [];
  }
  return unknownFields.filter(uf => uf.no === field.no);
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unnecessary-condition, prefer-const */
// lookup table from base64 character to byte
let encTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
// lookup table from base64 character *code* to byte because lookup by number is fast
let decTable = [];
for (let i = 0; i < encTable.length; i++) decTable[encTable[i].charCodeAt(0)] = i;
// support base64url variants
decTable["-".charCodeAt(0)] = encTable.indexOf("+");
decTable["_".charCodeAt(0)] = encTable.indexOf("/");
const protoBase64 = {
  /**
   * Decodes a base64 string to a byte array.
   *
   * - ignores white-space, including line breaks and tabs
   * - allows inner padding (can decode concatenated base64 strings)
   * - does not require padding
   * - understands base64url encoding:
   *   "-" instead of "+",
   *   "_" instead of "/",
   *   no padding
   */
  dec(base64Str) {
    // estimate byte size, not accounting for inner padding and whitespace
    let es = base64Str.length * 3 / 4;
    if (base64Str[base64Str.length - 2] == "=") es -= 2;else if (base64Str[base64Str.length - 1] == "=") es -= 1;
    let bytes = new Uint8Array(es),
      bytePos = 0,
      // position in byte array
      groupPos = 0,
      // position in base64 group
      b,
      // current byte
      p = 0; // previous byte
    for (let i = 0; i < base64Str.length; i++) {
      b = decTable[base64Str.charCodeAt(i)];
      if (b === undefined) {
        switch (base64Str[i]) {
          // @ts-ignore TS7029: Fallthrough case in switch
          case "=":
            groupPos = 0;
          // reset state when padding found
          // @ts-ignore TS7029: Fallthrough case in switch
          case "\n":
          case "\r":
          case "\t":
          case " ":
            continue;
          // skip white-space, and padding
          default:
            throw Error("invalid base64 string.");
        }
      }
      switch (groupPos) {
        case 0:
          p = b;
          groupPos = 1;
          break;
        case 1:
          bytes[bytePos++] = p << 2 | (b & 48) >> 4;
          p = b;
          groupPos = 2;
          break;
        case 2:
          bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
          p = b;
          groupPos = 3;
          break;
        case 3:
          bytes[bytePos++] = (p & 3) << 6 | b;
          groupPos = 0;
          break;
      }
    }
    if (groupPos == 1) throw Error("invalid base64 string.");
    return bytes.subarray(0, bytePos);
  },
  /**
   * Encode a byte array to a base64 string.
   */
  enc(bytes) {
    let base64 = "",
      groupPos = 0,
      // position in base64 group
      b,
      // current byte
      p = 0; // carry over from previous byte
    for (let i = 0; i < bytes.length; i++) {
      b = bytes[i];
      switch (groupPos) {
        case 0:
          base64 += encTable[b >> 2];
          p = (b & 3) << 4;
          groupPos = 1;
          break;
        case 1:
          base64 += encTable[p | b >> 4];
          p = (b & 15) << 2;
          groupPos = 2;
          break;
        case 2:
          base64 += encTable[p | b >> 6];
          base64 += encTable[b & 63];
          groupPos = 0;
          break;
      }
    }
    // add output padding
    if (groupPos) {
      base64 += encTable[p];
      base64 += "=";
      if (groupPos == 1) base64 += "=";
    }
    return base64;
  }
};

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Retrieve an extension value from a message.
 *
 * The function never returns undefined. Use hasExtension() to check whether an
 * extension is set. If the extension is not set, this function returns the
 * default value (if one was specified in the protobuf source), or the zero value
 * (for example `0` for numeric types, `[]` for repeated extension fields, and
 * an empty message instance for message fields).
 *
 * Extensions are stored as unknown fields on a message. To mutate an extension
 * value, make sure to store the new value with setExtension() after mutating.
 *
 * If the extension does not extend the given message, an error is raised.
 */
function getExtension(message, extension, options) {
  assertExtendee(extension, message);
  const opt = extension.runtime.bin.makeReadOptions(options);
  const ufs = filterUnknownFields(message.getType().runtime.bin.listUnknownFields(message), extension.field);
  const [container, get] = createExtensionContainer(extension);
  for (const uf of ufs) {
    extension.runtime.bin.readField(container, opt.readerFactory(uf.data), extension.field, uf.wireType, opt);
  }
  return get();
}
/**
 * Set an extension value on a message. If the message already has a value for
 * this extension, the value is replaced.
 *
 * If the extension does not extend the given message, an error is raised.
 */
function setExtension(message, extension, value, options) {
  assertExtendee(extension, message);
  const readOpt = extension.runtime.bin.makeReadOptions(options);
  const writeOpt = extension.runtime.bin.makeWriteOptions(options);
  if (hasExtension(message, extension)) {
    const ufs = message.getType().runtime.bin.listUnknownFields(message).filter(uf => uf.no != extension.field.no);
    message.getType().runtime.bin.discardUnknownFields(message);
    for (const uf of ufs) {
      message.getType().runtime.bin.onUnknownField(message, uf.no, uf.wireType, uf.data);
    }
  }
  const writer = writeOpt.writerFactory();
  let f = extension.field;
  // Implicit presence does not apply to extensions, see https://github.com/protocolbuffers/protobuf/issues/8234
  // We patch the field info to use explicit presence:
  if (!f.opt && !f.repeated && (f.kind == "enum" || f.kind == "scalar")) {
    f = Object.assign(Object.assign({}, extension.field), {
      opt: true
    });
  }
  extension.runtime.bin.writeField(f, value, writer, writeOpt);
  const reader = readOpt.readerFactory(writer.finish());
  while (reader.pos < reader.len) {
    const [no, wireType] = reader.tag();
    const data = reader.skip(wireType, no);
    message.getType().runtime.bin.onUnknownField(message, no, wireType, data);
  }
}
/**
 * Check whether an extension is set on a message.
 */
function hasExtension(message, extension) {
  const messageType = message.getType();
  return extension.extendee.typeName === messageType.typeName && !!messageType.runtime.bin.listUnknownFields(message).find(uf => uf.no == extension.field.no);
}
function assertExtendee(extension, message) {
  assert(extension.extendee.typeName == message.getType().typeName, "extension ".concat(extension.typeName, " can only be applied to message ").concat(extension.extendee.typeName));
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Returns true if the field is set.
 */
function isFieldSet(field, target) {
  const localName = field.localName;
  if (field.repeated) {
    return target[localName].length > 0;
  }
  if (field.oneof) {
    return target[field.oneof.localName].case === localName; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  }
  switch (field.kind) {
    case "enum":
    case "scalar":
      if (field.opt || field.req) {
        // explicit presence
        return target[localName] !== undefined;
      }
      // implicit presence
      if (field.kind == "enum") {
        return target[localName] !== field.T.values[0].no;
      }
      return !isScalarZeroValue(field.T, target[localName]);
    case "message":
      return target[localName] !== undefined;
    case "map":
      return Object.keys(target[localName]).length > 0;
    // eslint-disable-line @typescript-eslint/no-unsafe-argument
  }
}
/**
 * Resets the field, so that isFieldSet() will return false.
 */
function clearField(field, target) {
  const localName = field.localName;
  const implicitPresence = !field.opt && !field.req;
  if (field.repeated) {
    target[localName] = [];
  } else if (field.oneof) {
    target[field.oneof.localName] = {
      case: undefined
    };
  } else {
    switch (field.kind) {
      case "map":
        target[localName] = {};
        break;
      case "enum":
        target[localName] = implicitPresence ? field.T.values[0].no : undefined;
        break;
      case "scalar":
        target[localName] = implicitPresence ? scalarZeroValue(field.T, field.L) : undefined;
        break;
      case "message":
        target[localName] = undefined;
        break;
    }
  }
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Check whether the given object is any subtype of Message or is a specific
 * Message by passing the type.
 *
 * Just like `instanceof`, `isMessage` narrows the type. The advantage of
 * `isMessage` is that it compares identity by the message type name, not by
 * class identity. This makes it robust against the dual package hazard and
 * similar situations, where the same message is duplicated.
 *
 * This function is _mostly_ equivalent to the `instanceof` operator. For
 * example, `isMessage(foo, MyMessage)` is the same as `foo instanceof MyMessage`,
 * and `isMessage(foo)` is the same as `foo instanceof Message`. In most cases,
 * `isMessage` should be preferred over `instanceof`.
 *
 * However, due to the fact that `isMessage` does not use class identity, there
 * are subtle differences between this function and `instanceof`. Notably,
 * calling `isMessage` on an explicit type of Message will return false.
 */
function isMessage(arg, type) {
  if (arg === null || typeof arg != "object") {
    return false;
  }
  if (!Object.getOwnPropertyNames(Message.prototype).every(m => m in arg && typeof arg[m] == "function")) {
    return false;
  }
  const actualType = arg.getType();
  if (actualType === null || typeof actualType != "function" || !("typeName" in actualType) || typeof actualType.typeName != "string") {
    return false;
  }
  return type === undefined ? true : actualType.typeName == type.typeName;
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Wrap a primitive message field value in its corresponding wrapper
 * message. This function is idempotent.
 */
function wrapField(type, value) {
  if (isMessage(value) || !type.fieldWrapper) {
    return value;
  }
  return type.fieldWrapper.wrapField(value);
}
({
  "google.protobuf.DoubleValue": ScalarType.DOUBLE,
  "google.protobuf.FloatValue": ScalarType.FLOAT,
  "google.protobuf.Int64Value": ScalarType.INT64,
  "google.protobuf.UInt64Value": ScalarType.UINT64,
  "google.protobuf.Int32Value": ScalarType.INT32,
  "google.protobuf.UInt32Value": ScalarType.UINT32,
  "google.protobuf.BoolValue": ScalarType.BOOL,
  "google.protobuf.StringValue": ScalarType.STRING,
  "google.protobuf.BytesValue": ScalarType.BYTES
});

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable no-case-declarations,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call */
// Default options for parsing JSON.
const jsonReadDefaults = {
  ignoreUnknownFields: false
};
// Default options for serializing to JSON.
const jsonWriteDefaults = {
  emitDefaultValues: false,
  enumAsInteger: false,
  useProtoFieldName: false,
  prettySpaces: 0
};
function makeReadOptions$1(options) {
  return options ? Object.assign(Object.assign({}, jsonReadDefaults), options) : jsonReadDefaults;
}
function makeWriteOptions$1(options) {
  return options ? Object.assign(Object.assign({}, jsonWriteDefaults), options) : jsonWriteDefaults;
}
const tokenNull = Symbol();
const tokenIgnoredUnknownEnum = Symbol();
function makeJsonFormat() {
  return {
    makeReadOptions: makeReadOptions$1,
    makeWriteOptions: makeWriteOptions$1,
    readMessage(type, json, options, message) {
      if (json == null || Array.isArray(json) || typeof json != "object") {
        throw new Error("cannot decode message ".concat(type.typeName, " from JSON: ").concat(debugJsonValue(json)));
      }
      message = message !== null && message !== void 0 ? message : new type();
      const oneofSeen = new Map();
      const registry = options.typeRegistry;
      for (const [jsonKey, jsonValue] of Object.entries(json)) {
        const field = type.fields.findJsonName(jsonKey);
        if (field) {
          if (field.oneof) {
            if (jsonValue === null && field.kind == "scalar") {
              // see conformance test Required.Proto3.JsonInput.OneofFieldNull{First,Second}
              continue;
            }
            const seen = oneofSeen.get(field.oneof);
            if (seen !== undefined) {
              throw new Error("cannot decode message ".concat(type.typeName, " from JSON: multiple keys for oneof \"").concat(field.oneof.name, "\" present: \"").concat(seen, "\", \"").concat(jsonKey, "\""));
            }
            oneofSeen.set(field.oneof, jsonKey);
          }
          readField$1(message, jsonValue, field, options, type);
        } else {
          let found = false;
          if ((registry === null || registry === void 0 ? void 0 : registry.findExtension) && jsonKey.startsWith("[") && jsonKey.endsWith("]")) {
            const ext = registry.findExtension(jsonKey.substring(1, jsonKey.length - 1));
            if (ext && ext.extendee.typeName == type.typeName) {
              found = true;
              const [container, get] = createExtensionContainer(ext);
              readField$1(container, jsonValue, ext.field, options, ext);
              // We pass on the options as BinaryReadOptions/BinaryWriteOptions,
              // so that users can bring their own binary reader and writer factories
              // if necessary.
              setExtension(message, ext, get(), options);
            }
          }
          if (!found && !options.ignoreUnknownFields) {
            throw new Error("cannot decode message ".concat(type.typeName, " from JSON: key \"").concat(jsonKey, "\" is unknown"));
          }
        }
      }
      return message;
    },
    writeMessage(message, options) {
      const type = message.getType();
      const json = {};
      let field;
      try {
        for (field of type.fields.byNumber()) {
          if (!isFieldSet(field, message)) {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (field.req) {
              throw "required field not set";
            }
            if (!options.emitDefaultValues) {
              continue;
            }
            if (!canEmitFieldDefaultValue(field)) {
              continue;
            }
          }
          const value = field.oneof ? message[field.oneof.localName].value : message[field.localName];
          const jsonValue = writeField$1(field, value, options);
          if (jsonValue !== undefined) {
            json[options.useProtoFieldName ? field.name : field.jsonName] = jsonValue;
          }
        }
        const registry = options.typeRegistry;
        if (registry === null || registry === void 0 ? void 0 : registry.findExtensionFor) {
          for (const uf of type.runtime.bin.listUnknownFields(message)) {
            const ext = registry.findExtensionFor(type.typeName, uf.no);
            if (ext && hasExtension(message, ext)) {
              // We pass on the options as BinaryReadOptions, so that users can bring their own
              // binary reader factory if necessary.
              const value = getExtension(message, ext, options);
              const jsonValue = writeField$1(ext.field, value, options);
              if (jsonValue !== undefined) {
                json[ext.field.jsonName] = jsonValue;
              }
            }
          }
        }
      } catch (e) {
        const m = field ? "cannot encode field ".concat(type.typeName, ".").concat(field.name, " to JSON") : "cannot encode message ".concat(type.typeName, " to JSON");
        const r = e instanceof Error ? e.message : String(e);
        throw new Error(m + (r.length > 0 ? ": ".concat(r) : ""));
      }
      return json;
    },
    readScalar(type, json, longType) {
      // The signature of our internal function has changed. For backwards-
      // compatibility, we support the old form that is part of the public API
      // through the interface JsonFormat.
      return readScalar$1(type, json, longType !== null && longType !== void 0 ? longType : LongType.BIGINT, true);
    },
    writeScalar(type, value, emitDefaultValues) {
      // The signature of our internal function has changed. For backwards-
      // compatibility, we support the old form that is part of the public API
      // through the interface JsonFormat.
      if (value === undefined) {
        return undefined;
      }
      if (emitDefaultValues || isScalarZeroValue(type, value)) {
        return writeScalar$1(type, value);
      }
      return undefined;
    },
    debug: debugJsonValue
  };
}
function debugJsonValue(json) {
  if (json === null) {
    return "null";
  }
  switch (typeof json) {
    case "object":
      return Array.isArray(json) ? "array" : "object";
    case "string":
      return json.length > 100 ? "string" : "\"".concat(json.split('"').join('\\"'), "\"");
    default:
      return String(json);
  }
}
// Read a JSON value for a field.
// The "parentType" argument is only used to provide context in errors.
function readField$1(target, jsonValue, field, options, parentType) {
  let localName = field.localName;
  if (field.repeated) {
    assert(field.kind != "map");
    if (jsonValue === null) {
      return;
    }
    if (!Array.isArray(jsonValue)) {
      throw new Error("cannot decode field ".concat(parentType.typeName, ".").concat(field.name, " from JSON: ").concat(debugJsonValue(jsonValue)));
    }
    const targetArray = target[localName];
    for (const jsonItem of jsonValue) {
      if (jsonItem === null) {
        throw new Error("cannot decode field ".concat(parentType.typeName, ".").concat(field.name, " from JSON: ").concat(debugJsonValue(jsonItem)));
      }
      switch (field.kind) {
        case "message":
          targetArray.push(field.T.fromJson(jsonItem, options));
          break;
        case "enum":
          const enumValue = readEnum(field.T, jsonItem, options.ignoreUnknownFields, true);
          if (enumValue !== tokenIgnoredUnknownEnum) {
            targetArray.push(enumValue);
          }
          break;
        case "scalar":
          try {
            targetArray.push(readScalar$1(field.T, jsonItem, field.L, true));
          } catch (e) {
            let m = "cannot decode field ".concat(parentType.typeName, ".").concat(field.name, " from JSON: ").concat(debugJsonValue(jsonItem));
            if (e instanceof Error && e.message.length > 0) {
              m += ": ".concat(e.message);
            }
            throw new Error(m);
          }
          break;
      }
    }
  } else if (field.kind == "map") {
    if (jsonValue === null) {
      return;
    }
    if (typeof jsonValue != "object" || Array.isArray(jsonValue)) {
      throw new Error("cannot decode field ".concat(parentType.typeName, ".").concat(field.name, " from JSON: ").concat(debugJsonValue(jsonValue)));
    }
    const targetMap = target[localName];
    for (const [jsonMapKey, jsonMapValue] of Object.entries(jsonValue)) {
      if (jsonMapValue === null) {
        throw new Error("cannot decode field ".concat(parentType.typeName, ".").concat(field.name, " from JSON: map value null"));
      }
      let key;
      try {
        key = readMapKey(field.K, jsonMapKey);
      } catch (e) {
        let m = "cannot decode map key for field ".concat(parentType.typeName, ".").concat(field.name, " from JSON: ").concat(debugJsonValue(jsonValue));
        if (e instanceof Error && e.message.length > 0) {
          m += ": ".concat(e.message);
        }
        throw new Error(m);
      }
      switch (field.V.kind) {
        case "message":
          targetMap[key] = field.V.T.fromJson(jsonMapValue, options);
          break;
        case "enum":
          const enumValue = readEnum(field.V.T, jsonMapValue, options.ignoreUnknownFields, true);
          if (enumValue !== tokenIgnoredUnknownEnum) {
            targetMap[key] = enumValue;
          }
          break;
        case "scalar":
          try {
            targetMap[key] = readScalar$1(field.V.T, jsonMapValue, LongType.BIGINT, true);
          } catch (e) {
            let m = "cannot decode map value for field ".concat(parentType.typeName, ".").concat(field.name, " from JSON: ").concat(debugJsonValue(jsonValue));
            if (e instanceof Error && e.message.length > 0) {
              m += ": ".concat(e.message);
            }
            throw new Error(m);
          }
          break;
      }
    }
  } else {
    if (field.oneof) {
      target = target[field.oneof.localName] = {
        case: localName
      };
      localName = "value";
    }
    switch (field.kind) {
      case "message":
        const messageType = field.T;
        if (jsonValue === null && messageType.typeName != "google.protobuf.Value") {
          return;
        }
        let currentValue = target[localName];
        if (isMessage(currentValue)) {
          currentValue.fromJson(jsonValue, options);
        } else {
          target[localName] = currentValue = messageType.fromJson(jsonValue, options);
          if (messageType.fieldWrapper && !field.oneof) {
            target[localName] = messageType.fieldWrapper.unwrapField(currentValue);
          }
        }
        break;
      case "enum":
        const enumValue = readEnum(field.T, jsonValue, options.ignoreUnknownFields, false);
        switch (enumValue) {
          case tokenNull:
            clearField(field, target);
            break;
          case tokenIgnoredUnknownEnum:
            break;
          default:
            target[localName] = enumValue;
            break;
        }
        break;
      case "scalar":
        try {
          const scalarValue = readScalar$1(field.T, jsonValue, field.L, false);
          switch (scalarValue) {
            case tokenNull:
              clearField(field, target);
              break;
            default:
              target[localName] = scalarValue;
              break;
          }
        } catch (e) {
          let m = "cannot decode field ".concat(parentType.typeName, ".").concat(field.name, " from JSON: ").concat(debugJsonValue(jsonValue));
          if (e instanceof Error && e.message.length > 0) {
            m += ": ".concat(e.message);
          }
          throw new Error(m);
        }
        break;
    }
  }
}
function readMapKey(type, json) {
  if (type === ScalarType.BOOL) {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (json) {
      case "true":
        json = true;
        break;
      case "false":
        json = false;
        break;
    }
  }
  return readScalar$1(type, json, LongType.BIGINT, true).toString();
}
function readScalar$1(type, json, longType, nullAsZeroValue) {
  if (json === null) {
    if (nullAsZeroValue) {
      return scalarZeroValue(type, longType);
    }
    return tokenNull;
  }
  // every valid case in the switch below returns, and every fall
  // through is regarded as a failure.
  switch (type) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      if (json === "NaN") return Number.NaN;
      if (json === "Infinity") return Number.POSITIVE_INFINITY;
      if (json === "-Infinity") return Number.NEGATIVE_INFINITY;
      if (json === "") {
        // empty string is not a number
        break;
      }
      if (typeof json == "string" && json.trim().length !== json.length) {
        // extra whitespace
        break;
      }
      if (typeof json != "string" && typeof json != "number") {
        break;
      }
      const float = Number(json);
      if (Number.isNaN(float)) {
        // not a number
        break;
      }
      if (!Number.isFinite(float)) {
        // infinity and -infinity are handled by string representation above, so this is an error
        break;
      }
      if (type == ScalarType.FLOAT) assertFloat32(float);
      return float;
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.UINT32:
      let int32;
      if (typeof json == "number") int32 = json;else if (typeof json == "string" && json.length > 0) {
        if (json.trim().length === json.length) int32 = Number(json);
      }
      if (int32 === undefined) break;
      if (type == ScalarType.UINT32 || type == ScalarType.FIXED32) assertUInt32(int32);else assertInt32(int32);
      return int32;
    // int64, fixed64, uint64: JSON value will be a decimal string. Either numbers or strings are accepted.
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (typeof json != "number" && typeof json != "string") break;
      const long = protoInt64.parse(json);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return longType ? long.toString() : long;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if (typeof json != "number" && typeof json != "string") break;
      const uLong = protoInt64.uParse(json);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return longType ? uLong.toString() : uLong;
    // bool:
    case ScalarType.BOOL:
      if (typeof json !== "boolean") break;
      return json;
    // string:
    case ScalarType.STRING:
      if (typeof json !== "string") {
        break;
      }
      // A string must always contain UTF-8 encoded or 7-bit ASCII.
      // We validate with encodeURIComponent, which appears to be the fastest widely available option.
      try {
        encodeURIComponent(json);
      } catch (e) {
        throw new Error("invalid UTF8");
      }
      return json;
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      if (json === "") return new Uint8Array(0);
      if (typeof json !== "string") break;
      return protoBase64.dec(json);
  }
  throw new Error();
}
function readEnum(type, json, ignoreUnknownFields, nullAsZeroValue) {
  if (json === null) {
    if (type.typeName == "google.protobuf.NullValue") {
      return 0; // google.protobuf.NullValue.NULL_VALUE = 0
    }
    return nullAsZeroValue ? type.values[0].no : tokenNull;
  }
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (typeof json) {
    case "number":
      if (Number.isInteger(json)) {
        return json;
      }
      break;
    case "string":
      const value = type.findName(json);
      if (value !== undefined) {
        return value.no;
      }
      if (ignoreUnknownFields) {
        return tokenIgnoredUnknownEnum;
      }
      break;
  }
  throw new Error("cannot decode enum ".concat(type.typeName, " from JSON: ").concat(debugJsonValue(json)));
}
// Decide whether an unset field should be emitted with JSON write option `emitDefaultValues`
function canEmitFieldDefaultValue(field) {
  if (field.repeated || field.kind == "map") {
    // maps are {}, repeated fields are []
    return true;
  }
  if (field.oneof) {
    // oneof fields are never emitted
    return false;
  }
  if (field.kind == "message") {
    // singular message field are allowed to emit JSON null, but we do not
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (field.opt || field.req) {
    // the field uses explicit presence, so we cannot emit a zero value
    return false;
  }
  return true;
}
function writeField$1(field, value, options) {
  if (field.kind == "map") {
    assert(typeof value == "object" && value != null);
    const jsonObj = {};
    const entries = Object.entries(value);
    switch (field.V.kind) {
      case "scalar":
        for (const [entryKey, entryValue] of entries) {
          jsonObj[entryKey.toString()] = writeScalar$1(field.V.T, entryValue); // JSON standard allows only (double quoted) string as property key
        }
        break;
      case "message":
        for (const [entryKey, entryValue] of entries) {
          // JSON standard allows only (double quoted) string as property key
          jsonObj[entryKey.toString()] = entryValue.toJson(options);
        }
        break;
      case "enum":
        const enumType = field.V.T;
        for (const [entryKey, entryValue] of entries) {
          // JSON standard allows only (double quoted) string as property key
          jsonObj[entryKey.toString()] = writeEnum(enumType, entryValue, options.enumAsInteger);
        }
        break;
    }
    return options.emitDefaultValues || entries.length > 0 ? jsonObj : undefined;
  }
  if (field.repeated) {
    assert(Array.isArray(value));
    const jsonArr = [];
    switch (field.kind) {
      case "scalar":
        for (let i = 0; i < value.length; i++) {
          jsonArr.push(writeScalar$1(field.T, value[i]));
        }
        break;
      case "enum":
        for (let i = 0; i < value.length; i++) {
          jsonArr.push(writeEnum(field.T, value[i], options.enumAsInteger));
        }
        break;
      case "message":
        for (let i = 0; i < value.length; i++) {
          jsonArr.push(value[i].toJson(options));
        }
        break;
    }
    return options.emitDefaultValues || jsonArr.length > 0 ? jsonArr : undefined;
  }
  switch (field.kind) {
    case "scalar":
      return writeScalar$1(field.T, value);
    case "enum":
      return writeEnum(field.T, value, options.enumAsInteger);
    case "message":
      return wrapField(field.T, value).toJson(options);
  }
}
function writeEnum(type, value, enumAsInteger) {
  var _a;
  assert(typeof value == "number");
  if (type.typeName == "google.protobuf.NullValue") {
    return null;
  }
  if (enumAsInteger) {
    return value;
  }
  const val = type.findNumber(value);
  return (_a = val === null || val === void 0 ? void 0 : val.name) !== null && _a !== void 0 ? _a : value; // if we don't know the enum value, just return the number
}
function writeScalar$1(type, value) {
  switch (type) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      assert(typeof value == "number");
      return value;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.FLOAT:
    // assertFloat32(value);
    case ScalarType.DOUBLE:
      // eslint-disable-line no-fallthrough
      assert(typeof value == "number");
      if (Number.isNaN(value)) return "NaN";
      if (value === Number.POSITIVE_INFINITY) return "Infinity";
      if (value === Number.NEGATIVE_INFINITY) return "-Infinity";
      return value;
    // string:
    case ScalarType.STRING:
      assert(typeof value == "string");
      return value;
    // bool:
    case ScalarType.BOOL:
      assert(typeof value == "boolean");
      return value;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      assert(typeof value == "bigint" || typeof value == "string" || typeof value == "number");
      return value.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      assert(value instanceof Uint8Array);
      return protoBase64.enc(value);
  }
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable prefer-const,no-case-declarations,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return */
const unknownFieldsSymbol = Symbol("@bufbuild/protobuf/unknown-fields");
// Default options for parsing binary data.
const readDefaults = {
  readUnknownFields: true,
  readerFactory: bytes => new BinaryReader(bytes)
};
// Default options for serializing binary data.
const writeDefaults = {
  writeUnknownFields: true,
  writerFactory: () => new BinaryWriter()
};
function makeReadOptions(options) {
  return options ? Object.assign(Object.assign({}, readDefaults), options) : readDefaults;
}
function makeWriteOptions(options) {
  return options ? Object.assign(Object.assign({}, writeDefaults), options) : writeDefaults;
}
function makeBinaryFormat() {
  return {
    makeReadOptions,
    makeWriteOptions,
    listUnknownFields(message) {
      var _a;
      return (_a = message[unknownFieldsSymbol]) !== null && _a !== void 0 ? _a : [];
    },
    discardUnknownFields(message) {
      delete message[unknownFieldsSymbol];
    },
    writeUnknownFields(message, writer) {
      const m = message;
      const c = m[unknownFieldsSymbol];
      if (c) {
        for (const f of c) {
          writer.tag(f.no, f.wireType).raw(f.data);
        }
      }
    },
    onUnknownField(message, no, wireType, data) {
      const m = message;
      if (!Array.isArray(m[unknownFieldsSymbol])) {
        m[unknownFieldsSymbol] = [];
      }
      m[unknownFieldsSymbol].push({
        no,
        wireType,
        data
      });
    },
    readMessage(message, reader, lengthOrEndTagFieldNo, options, delimitedMessageEncoding) {
      const type = message.getType();
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const end = delimitedMessageEncoding ? reader.len : reader.pos + lengthOrEndTagFieldNo;
      let fieldNo, wireType;
      while (reader.pos < end) {
        [fieldNo, wireType] = reader.tag();
        if (delimitedMessageEncoding === true && wireType == WireType.EndGroup) {
          break;
        }
        const field = type.fields.find(fieldNo);
        if (!field) {
          const data = reader.skip(wireType, fieldNo);
          if (options.readUnknownFields) {
            this.onUnknownField(message, fieldNo, wireType, data);
          }
          continue;
        }
        readField(message, reader, field, wireType, options);
      }
      if (delimitedMessageEncoding && (
      // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      wireType != WireType.EndGroup || fieldNo !== lengthOrEndTagFieldNo)) {
        throw new Error("invalid end group tag");
      }
    },
    readField,
    writeMessage(message, writer, options) {
      const type = message.getType();
      for (const field of type.fields.byNumber()) {
        if (!isFieldSet(field, message)) {
          if (field.req) {
            throw new Error("cannot encode field ".concat(type.typeName, ".").concat(field.name, " to binary: required field not set"));
          }
          continue;
        }
        const value = field.oneof ? message[field.oneof.localName].value : message[field.localName];
        writeField(field, value, writer, options);
      }
      if (options.writeUnknownFields) {
        this.writeUnknownFields(message, writer);
      }
      return writer;
    },
    writeField(field, value, writer, options) {
      // The behavior of our internal function has changed, it does no longer
      // accept `undefined` values for singular scalar and map.
      // For backwards-compatibility, we support the old form that is part of
      // the public API through the interface BinaryFormat.
      if (value === undefined) {
        return undefined;
      }
      writeField(field, value, writer, options);
    }
  };
}
function readField(target,
// eslint-disable-line @typescript-eslint/no-explicit-any -- `any` is the best choice for dynamic access
reader, field, wireType, options) {
  let {
    repeated,
    localName
  } = field;
  if (field.oneof) {
    target = target[field.oneof.localName];
    if (target.case != localName) {
      delete target.value;
    }
    target.case = localName;
    localName = "value";
  }
  switch (field.kind) {
    case "scalar":
    case "enum":
      const scalarType = field.kind == "enum" ? ScalarType.INT32 : field.T;
      let read = readScalar;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- acceptable since it's covered by tests
      if (field.kind == "scalar" && field.L > 0) {
        read = readScalarLTString;
      }
      if (repeated) {
        let arr = target[localName]; // safe to assume presence of array, oneof cannot contain repeated values
        const isPacked = wireType == WireType.LengthDelimited && scalarType != ScalarType.STRING && scalarType != ScalarType.BYTES;
        if (isPacked) {
          let e = reader.uint32() + reader.pos;
          while (reader.pos < e) {
            arr.push(read(reader, scalarType));
          }
        } else {
          arr.push(read(reader, scalarType));
        }
      } else {
        target[localName] = read(reader, scalarType);
      }
      break;
    case "message":
      const messageType = field.T;
      if (repeated) {
        // safe to assume presence of array, oneof cannot contain repeated values
        target[localName].push(readMessageField(reader, new messageType(), options, field));
      } else {
        if (isMessage(target[localName])) {
          readMessageField(reader, target[localName], options, field);
        } else {
          target[localName] = readMessageField(reader, new messageType(), options, field);
          if (messageType.fieldWrapper && !field.oneof && !field.repeated) {
            target[localName] = messageType.fieldWrapper.unwrapField(target[localName]);
          }
        }
      }
      break;
    case "map":
      let [mapKey, mapVal] = readMapEntry(field, reader, options);
      // safe to assume presence of map object, oneof cannot contain repeated values
      target[localName][mapKey] = mapVal;
      break;
  }
}
// Read a message, avoiding MessageType.fromBinary() to re-use the
// BinaryReadOptions and the IBinaryReader.
function readMessageField(reader, message, options, field) {
  const format = message.getType().runtime.bin;
  const delimited = field === null || field === void 0 ? void 0 : field.delimited;
  format.readMessage(message, reader, delimited ? field.no : reader.uint32(),
  // eslint-disable-line @typescript-eslint/strict-boolean-expressions
  options, delimited);
  return message;
}
// Read a map field, expecting key field = 1, value field = 2
function readMapEntry(field, reader, options) {
  const length = reader.uint32(),
    end = reader.pos + length;
  let key, val;
  while (reader.pos < end) {
    const [fieldNo] = reader.tag();
    switch (fieldNo) {
      case 1:
        key = readScalar(reader, field.K);
        break;
      case 2:
        switch (field.V.kind) {
          case "scalar":
            val = readScalar(reader, field.V.T);
            break;
          case "enum":
            val = reader.int32();
            break;
          case "message":
            val = readMessageField(reader, new field.V.T(), options, undefined);
            break;
        }
        break;
    }
  }
  if (key === undefined) {
    key = scalarZeroValue(field.K, LongType.BIGINT);
  }
  if (typeof key != "string" && typeof key != "number") {
    key = key.toString();
  }
  if (val === undefined) {
    switch (field.V.kind) {
      case "scalar":
        val = scalarZeroValue(field.V.T, LongType.BIGINT);
        break;
      case "enum":
        val = field.V.T.values[0].no;
        break;
      case "message":
        val = new field.V.T();
        break;
    }
  }
  return [key, val];
}
// Read a scalar value, but return 64 bit integral types (int64, uint64,
// sint64, fixed64, sfixed64) as string instead of bigint.
function readScalarLTString(reader, type) {
  const v = readScalar(reader, type);
  return typeof v == "bigint" ? v.toString() : v;
}
// Does not use scalarTypeInfo() for better performance.
function readScalar(reader, type) {
  switch (type) {
    case ScalarType.STRING:
      return reader.string();
    case ScalarType.BOOL:
      return reader.bool();
    case ScalarType.DOUBLE:
      return reader.double();
    case ScalarType.FLOAT:
      return reader.float();
    case ScalarType.INT32:
      return reader.int32();
    case ScalarType.INT64:
      return reader.int64();
    case ScalarType.UINT64:
      return reader.uint64();
    case ScalarType.FIXED64:
      return reader.fixed64();
    case ScalarType.BYTES:
      return reader.bytes();
    case ScalarType.FIXED32:
      return reader.fixed32();
    case ScalarType.SFIXED32:
      return reader.sfixed32();
    case ScalarType.SFIXED64:
      return reader.sfixed64();
    case ScalarType.SINT64:
      return reader.sint64();
    case ScalarType.UINT32:
      return reader.uint32();
    case ScalarType.SINT32:
      return reader.sint32();
  }
}
function writeField(field, value, writer, options) {
  assert(value !== undefined);
  const repeated = field.repeated;
  switch (field.kind) {
    case "scalar":
    case "enum":
      let scalarType = field.kind == "enum" ? ScalarType.INT32 : field.T;
      if (repeated) {
        assert(Array.isArray(value));
        if (field.packed) {
          writePacked(writer, scalarType, field.no, value);
        } else {
          for (const item of value) {
            writeScalar(writer, scalarType, field.no, item);
          }
        }
      } else {
        writeScalar(writer, scalarType, field.no, value);
      }
      break;
    case "message":
      if (repeated) {
        assert(Array.isArray(value));
        for (const item of value) {
          writeMessageField(writer, options, field, item);
        }
      } else {
        writeMessageField(writer, options, field, value);
      }
      break;
    case "map":
      assert(typeof value == "object" && value != null);
      for (const [key, val] of Object.entries(value)) {
        writeMapEntry(writer, options, field, key, val);
      }
      break;
  }
}
function writeMapEntry(writer, options, field, key, value) {
  writer.tag(field.no, WireType.LengthDelimited);
  writer.fork();
  // javascript only allows number or string for object properties
  // we convert from our representation to the protobuf type
  let keyValue = key;
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- we deliberately handle just the special cases for map keys
  switch (field.K) {
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      keyValue = Number.parseInt(key);
      break;
    case ScalarType.BOOL:
      assert(key == "true" || key == "false");
      keyValue = key == "true";
      break;
  }
  // write key, expecting key field number = 1
  writeScalar(writer, field.K, 1, keyValue);
  // write value, expecting value field number = 2
  switch (field.V.kind) {
    case "scalar":
      writeScalar(writer, field.V.T, 2, value);
      break;
    case "enum":
      writeScalar(writer, ScalarType.INT32, 2, value);
      break;
    case "message":
      assert(value !== undefined);
      writer.tag(2, WireType.LengthDelimited).bytes(value.toBinary(options));
      break;
  }
  writer.join();
}
// Value must not be undefined
function writeMessageField(writer, options, field, value) {
  const message = wrapField(field.T, value);
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (field.delimited) writer.tag(field.no, WireType.StartGroup).raw(message.toBinary(options)).tag(field.no, WireType.EndGroup);else writer.tag(field.no, WireType.LengthDelimited).bytes(message.toBinary(options));
}
function writeScalar(writer, type, fieldNo, value) {
  assert(value !== undefined);
  let [wireType, method] = scalarTypeInfo(type);
  writer.tag(fieldNo, wireType)[method](value);
}
function writePacked(writer, type, fieldNo, value) {
  if (!value.length) {
    return;
  }
  writer.tag(fieldNo, WireType.LengthDelimited).fork();
  let [, method] = scalarTypeInfo(type);
  for (let i = 0; i < value.length; i++) {
    writer[method](value[i]);
  }
  writer.join();
}
/**
 * Get information for writing a scalar value.
 *
 * Returns tuple:
 * [0]: appropriate WireType
 * [1]: name of the appropriate method of IBinaryWriter
 * [2]: whether the given value is a default value for proto3 semantics
 *
 * If argument `value` is omitted, [2] is always false.
 */
// TODO replace call-sites writeScalar() and writePacked(), then remove
function scalarTypeInfo(type) {
  let wireType = WireType.Varint;
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- INT32, UINT32, SINT32 are covered by the defaults
  switch (type) {
    case ScalarType.BYTES:
    case ScalarType.STRING:
      wireType = WireType.LengthDelimited;
      break;
    case ScalarType.DOUBLE:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      wireType = WireType.Bit64;
      break;
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.FLOAT:
      wireType = WireType.Bit32;
      break;
  }
  const method = ScalarType[type].toLowerCase();
  return [wireType, method];
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument,no-case-declarations */
function makeUtilCommon() {
  return {
    setEnumType,
    initPartial(source, target) {
      if (source === undefined) {
        return;
      }
      const type = target.getType();
      for (const member of type.fields.byMember()) {
        const localName = member.localName,
          t = target,
          s = source;
        if (s[localName] == null) {
          // TODO if source is a Message instance, we should use isFieldSet() here to support future field presence
          continue;
        }
        switch (member.kind) {
          case "oneof":
            const sk = s[localName].case;
            if (sk === undefined) {
              continue;
            }
            const sourceField = member.findField(sk);
            let val = s[localName].value;
            if (sourceField && sourceField.kind == "message" && !isMessage(val, sourceField.T)) {
              val = new sourceField.T(val);
            } else if (sourceField && sourceField.kind === "scalar" && sourceField.T === ScalarType.BYTES) {
              val = toU8Arr(val);
            }
            t[localName] = {
              case: sk,
              value: val
            };
            break;
          case "scalar":
          case "enum":
            let copy = s[localName];
            if (member.T === ScalarType.BYTES) {
              copy = member.repeated ? copy.map(toU8Arr) : toU8Arr(copy);
            }
            t[localName] = copy;
            break;
          case "map":
            switch (member.V.kind) {
              case "scalar":
              case "enum":
                if (member.V.T === ScalarType.BYTES) {
                  for (const [k, v] of Object.entries(s[localName])) {
                    t[localName][k] = toU8Arr(v);
                  }
                } else {
                  Object.assign(t[localName], s[localName]);
                }
                break;
              case "message":
                const messageType = member.V.T;
                for (const k of Object.keys(s[localName])) {
                  let val = s[localName][k];
                  if (!messageType.fieldWrapper) {
                    // We only take partial input for messages that are not a wrapper type.
                    // For those messages, we recursively normalize the partial input.
                    val = new messageType(val);
                  }
                  t[localName][k] = val;
                }
                break;
            }
            break;
          case "message":
            const mt = member.T;
            if (member.repeated) {
              t[localName] = s[localName].map(val => isMessage(val, mt) ? val : new mt(val));
            } else {
              const val = s[localName];
              if (mt.fieldWrapper) {
                if (
                // We can't use BytesValue.typeName as that will create a circular import
                mt.typeName === "google.protobuf.BytesValue") {
                  t[localName] = toU8Arr(val);
                } else {
                  t[localName] = val;
                }
              } else {
                t[localName] = isMessage(val, mt) ? val : new mt(val);
              }
            }
            break;
        }
      }
    },
    // TODO use isFieldSet() here to support future field presence
    equals(type, a, b) {
      if (a === b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      return type.fields.byMember().every(m => {
        const va = a[m.localName];
        const vb = b[m.localName];
        if (m.repeated) {
          if (va.length !== vb.length) {
            return false;
          }
          // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- repeated fields are never "map"
          switch (m.kind) {
            case "message":
              return va.every((a, i) => m.T.equals(a, vb[i]));
            case "scalar":
              return va.every((a, i) => scalarEquals(m.T, a, vb[i]));
            case "enum":
              return va.every((a, i) => scalarEquals(ScalarType.INT32, a, vb[i]));
          }
          throw new Error("repeated cannot contain ".concat(m.kind));
        }
        switch (m.kind) {
          case "message":
            return m.T.equals(va, vb);
          case "enum":
            return scalarEquals(ScalarType.INT32, va, vb);
          case "scalar":
            return scalarEquals(m.T, va, vb);
          case "oneof":
            if (va.case !== vb.case) {
              return false;
            }
            const s = m.findField(va.case);
            if (s === undefined) {
              return true;
            }
            // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- oneof fields are never "map"
            switch (s.kind) {
              case "message":
                return s.T.equals(va.value, vb.value);
              case "enum":
                return scalarEquals(ScalarType.INT32, va.value, vb.value);
              case "scalar":
                return scalarEquals(s.T, va.value, vb.value);
            }
            throw new Error("oneof cannot contain ".concat(s.kind));
          case "map":
            const keys = Object.keys(va).concat(Object.keys(vb));
            switch (m.V.kind) {
              case "message":
                const messageType = m.V.T;
                return keys.every(k => messageType.equals(va[k], vb[k]));
              case "enum":
                return keys.every(k => scalarEquals(ScalarType.INT32, va[k], vb[k]));
              case "scalar":
                const scalarType = m.V.T;
                return keys.every(k => scalarEquals(scalarType, va[k], vb[k]));
            }
            break;
        }
      });
    },
    // TODO use isFieldSet() here to support future field presence
    clone(message) {
      const type = message.getType(),
        target = new type(),
        any = target;
      for (const member of type.fields.byMember()) {
        const source = message[member.localName];
        let copy;
        if (member.repeated) {
          copy = source.map(cloneSingularField);
        } else if (member.kind == "map") {
          copy = any[member.localName];
          for (const [key, v] of Object.entries(source)) {
            copy[key] = cloneSingularField(v);
          }
        } else if (member.kind == "oneof") {
          const f = member.findField(source.case);
          copy = f ? {
            case: source.case,
            value: cloneSingularField(source.value)
          } : {
            case: undefined
          };
        } else {
          copy = cloneSingularField(source);
        }
        any[member.localName] = copy;
      }
      for (const uf of type.runtime.bin.listUnknownFields(message)) {
        type.runtime.bin.onUnknownField(any, uf.no, uf.wireType, uf.data);
      }
      return target;
    }
  };
}
// clone a single field value - i.e. the element type of repeated fields, the value type of maps
function cloneSingularField(value) {
  if (value === undefined) {
    return value;
  }
  if (isMessage(value)) {
    return value.clone();
  }
  if (value instanceof Uint8Array) {
    const c = new Uint8Array(value.byteLength);
    c.set(value);
    return c;
  }
  return value;
}
// converts any ArrayLike<number> to Uint8Array if necessary.
function toU8Arr(input) {
  return input instanceof Uint8Array ? input : new Uint8Array(input);
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
function makeProtoRuntime(syntax, newFieldList, initFields) {
  return {
    syntax,
    json: makeJsonFormat(),
    bin: makeBinaryFormat(),
    util: Object.assign(Object.assign({}, makeUtilCommon()), {
      newFieldList,
      initFields
    }),
    makeMessageType(typeName, fields, opt) {
      return makeMessageType(this, typeName, fields, opt);
    },
    makeEnum,
    makeEnumType,
    getEnumType,
    makeExtension(typeName, extendee, field) {
      return makeExtension(this, typeName, extendee, field);
    }
  };
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
class InternalFieldList {
  constructor(fields, normalizer) {
    this._fields = fields;
    this._normalizer = normalizer;
  }
  findJsonName(jsonName) {
    if (!this.jsonNames) {
      const t = {};
      for (const f of this.list()) {
        t[f.jsonName] = t[f.name] = f;
      }
      this.jsonNames = t;
    }
    return this.jsonNames[jsonName];
  }
  find(fieldNo) {
    if (!this.numbers) {
      const t = {};
      for (const f of this.list()) {
        t[f.no] = f;
      }
      this.numbers = t;
    }
    return this.numbers[fieldNo];
  }
  list() {
    if (!this.all) {
      this.all = this._normalizer(this._fields);
    }
    return this.all;
  }
  byNumber() {
    if (!this.numbersAsc) {
      this.numbersAsc = this.list().concat().sort((a, b) => a.no - b.no);
    }
    return this.numbersAsc;
  }
  byMember() {
    if (!this.members) {
      this.members = [];
      const a = this.members;
      let o;
      for (const f of this.list()) {
        if (f.oneof) {
          if (f.oneof !== o) {
            o = f.oneof;
            a.push(o);
          }
        } else {
          a.push(f);
        }
      }
    }
    return this.members;
  }
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Returns the name of a protobuf element in generated code.
 *
 * Field names - including oneofs - are converted to lowerCamelCase. For
 * messages, enumerations and services, the package name is stripped from
 * the type name. For nested messages and enumerations, the names are joined
 * with an underscore. For methods, the first character is made lowercase.
 */
/**
 * Returns the name of a field in generated code.
 */
function localFieldName(protoName, inOneof) {
  const name = protoCamelCase(protoName);
  if (inOneof) {
    // oneof member names are not properties, but values of the `case` property.
    return name;
  }
  return safeObjectProperty(safeMessageProperty(name));
}
/**
 * Returns the name of a oneof group in generated code.
 */
function localOneofName(protoName) {
  return localFieldName(protoName, false);
}
/**
 * Returns the JSON name for a protobuf field, exactly like protoc does.
 */
const fieldJsonName = protoCamelCase;
/**
 * Converts snake_case to protoCamelCase according to the convention
 * used by protoc to convert a field name to a JSON name.
 */
function protoCamelCase(snakeCase) {
  let capNext = false;
  const b = [];
  for (let i = 0; i < snakeCase.length; i++) {
    let c = snakeCase.charAt(i);
    switch (c) {
      case "_":
        capNext = true;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        b.push(c);
        capNext = false;
        break;
      default:
        if (capNext) {
          capNext = false;
          c = c.toUpperCase();
        }
        b.push(c);
        break;
    }
  }
  return b.join("");
}
/**
 * Names that cannot be used for object properties because they are reserved
 * by built-in JavaScript properties.
 */
const reservedObjectProperties = new Set([
// names reserved by JavaScript
"constructor", "toString", "toJSON", "valueOf"]);
/**
 * Names that cannot be used for object properties because they are reserved
 * by the runtime.
 */
const reservedMessageProperties = new Set([
// names reserved by the runtime
"getType", "clone", "equals", "fromBinary", "fromJson", "fromJsonString", "toBinary", "toJson", "toJsonString",
// names reserved by the runtime for the future
"toObject"]);
const fallback = name => "".concat(name, "$");
/**
 * Will wrap names that are Object prototype properties or names reserved
 * for `Message`s.
 */
const safeMessageProperty = name => {
  if (reservedMessageProperties.has(name)) {
    return fallback(name);
  }
  return name;
};
/**
 * Names that cannot be used for object properties because they are reserved
 * by built-in JavaScript properties.
 */
const safeObjectProperty = name => {
  if (reservedObjectProperties.has(name)) {
    return fallback(name);
  }
  return name;
};

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
class InternalOneofInfo {
  constructor(name) {
    this.kind = "oneof";
    this.repeated = false;
    this.packed = false;
    this.opt = false;
    this.req = false;
    this.default = undefined;
    this.fields = [];
    this.name = name;
    this.localName = localOneofName(name);
  }
  addField(field) {
    assert(field.oneof === this, "field ".concat(field.name, " not one of ").concat(this.name));
    this.fields.push(field);
  }
  findField(localName) {
    if (!this._lookup) {
      this._lookup = Object.create(null);
      for (let i = 0; i < this.fields.length; i++) {
        this._lookup[this.fields[i].localName] = this.fields[i];
      }
    }
    return this._lookup[localName];
  }
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Convert a collection of field info to an array of normalized FieldInfo.
 *
 * The argument `packedByDefault` specifies whether fields that do not specify
 * `packed` should be packed (proto3) or unpacked (proto2).
 */
function normalizeFieldInfos(fieldInfos, packedByDefault) {
  var _a, _b, _c, _d, _e, _f;
  const r = [];
  let o;
  for (const field of typeof fieldInfos == "function" ? fieldInfos() : fieldInfos) {
    const f = field;
    f.localName = localFieldName(field.name, field.oneof !== undefined);
    f.jsonName = (_a = field.jsonName) !== null && _a !== void 0 ? _a : fieldJsonName(field.name);
    f.repeated = (_b = field.repeated) !== null && _b !== void 0 ? _b : false;
    if (field.kind == "scalar") {
      f.L = (_c = field.L) !== null && _c !== void 0 ? _c : LongType.BIGINT;
    }
    f.delimited = (_d = field.delimited) !== null && _d !== void 0 ? _d : false;
    f.req = (_e = field.req) !== null && _e !== void 0 ? _e : false;
    f.opt = (_f = field.opt) !== null && _f !== void 0 ? _f : false;
    if (field.packed === undefined) {
      {
        f.packed = field.kind == "enum" || field.kind == "scalar" && field.T != ScalarType.BYTES && field.T != ScalarType.STRING;
      }
    }
    // We do not surface options at this time
    // f.options = field.options ?? emptyReadonlyObject;
    if (field.oneof !== undefined) {
      const ooname = typeof field.oneof == "string" ? field.oneof : field.oneof.name;
      if (!o || o.name != ooname) {
        o = new InternalOneofInfo(ooname);
      }
      f.oneof = o;
      o.addField(f);
    }
    r.push(f);
  }
  return r;
}

// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * Provides functionality for messages defined with the proto3 syntax.
 */
const proto3 = makeProtoRuntime("proto3", fields => {
  return new InternalFieldList(fields, source => normalizeFieldInfos(source));
},
// TODO merge with proto2 and initExtensionField, also see initPartial, equals, clone
target => {
  for (const member of target.getType().fields.byMember()) {
    if (member.opt) {
      continue;
    }
    const name = member.localName,
      t = target;
    if (member.repeated) {
      t[name] = [];
      continue;
    }
    switch (member.kind) {
      case "oneof":
        t[name] = {
          case: undefined
        };
        break;
      case "enum":
        t[name] = 0;
        break;
      case "map":
        t[name] = {};
        break;
      case "scalar":
        t[name] = scalarZeroValue(member.T, member.L);
        break;
    }
  }
});

// Copyright 2023 LiveKit, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @generated from enum livekit.TrackType
 */
const TrackType = /*@__PURE__*/proto3.makeEnum("livekit.TrackType", [{
  no: 0,
  name: "AUDIO"
}, {
  no: 1,
  name: "VIDEO"
}, {
  no: 2,
  name: "DATA"
}]);

/**
 * @generated from enum livekit.TrackSource
 */
const TrackSource = /*@__PURE__*/proto3.makeEnum("livekit.TrackSource", [{
  no: 0,
  name: "UNKNOWN"
}, {
  no: 1,
  name: "CAMERA"
}, {
  no: 2,
  name: "MICROPHONE"
}, {
  no: 3,
  name: "SCREEN_SHARE"
}, {
  no: 4,
  name: "SCREEN_SHARE_AUDIO"
}]);

// Copyright 2023 LiveKit, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @generated from enum livekit.StreamState
 */
const StreamState = /*@__PURE__*/proto3.makeEnum("livekit.StreamState", [{
  no: 0,
  name: "ACTIVE"
}, {
  no: 1,
  name: "PAUSED"
}]);

// tiny, simplified version of https://github.com/lancedikson/bowser/blob/master/src/parser-browsers.js
// reduced to only differentiate Chrome(ium) based browsers / Firefox / Safari
const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;
let browserDetails;
/**
 * @internal
 */
function getBrowser(userAgent) {
  let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (typeof navigator === 'undefined') {
    return;
  }
  const ua = (navigator.userAgent).toLowerCase();
  if (browserDetails === undefined || force) {
    const browser = browsersList.find(_ref => {
      let {
        test
      } = _ref;
      return test.test(ua);
    });
    browserDetails = browser === null || browser === void 0 ? void 0 : browser.describe(ua);
  }
  return browserDetails;
}
const browsersList = [{
  test: /firefox|iceweasel|fxios/i,
  describe(ua) {
    const browser = {
      name: 'Firefox',
      version: getMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua),
      os: ua.toLowerCase().includes('fxios') ? 'iOS' : undefined,
      osVersion: getOSVersion(ua)
    };
    return browser;
  }
}, {
  test: /chrom|crios|crmo/i,
  describe(ua) {
    const browser = {
      name: 'Chrome',
      version: getMatch(/(?:chrome|chromium|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua),
      os: ua.toLowerCase().includes('crios') ? 'iOS' : undefined,
      osVersion: getOSVersion(ua)
    };
    return browser;
  }
}, /* Safari */
{
  test: /safari|applewebkit/i,
  describe(ua) {
    const browser = {
      name: 'Safari',
      version: getMatch(commonVersionIdentifier, ua),
      os: ua.includes('mobile/') ? 'iOS' : 'macOS',
      osVersion: getOSVersion(ua)
    };
    return browser;
  }
}];
function getMatch(exp, ua) {
  let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  const match = ua.match(exp);
  return match && match.length >= id && match[id] || '';
}
function getOSVersion(ua) {
  return ua.includes('mac os') ? getMatch(/\(.+?(\d+_\d+(:?_\d+)?)/, ua, 1).replace(/_/g, '.') : undefined;
}

class VideoPreset {
  constructor(widthOrOptions, height, maxBitrate, maxFramerate, priority) {
    if (typeof widthOrOptions === 'object') {
      this.width = widthOrOptions.width;
      this.height = widthOrOptions.height;
      this.aspectRatio = widthOrOptions.aspectRatio;
      this.encoding = {
        maxBitrate: widthOrOptions.maxBitrate,
        maxFramerate: widthOrOptions.maxFramerate,
        priority: widthOrOptions.priority
      };
    } else if (height !== undefined && maxBitrate !== undefined) {
      this.width = widthOrOptions;
      this.height = height;
      this.aspectRatio = widthOrOptions / height;
      this.encoding = {
        maxBitrate,
        maxFramerate,
        priority
      };
    } else {
      throw new TypeError('Unsupported options: provide at least width, height and maxBitrate');
    }
  }
  get resolution() {
    return {
      width: this.width,
      height: this.height,
      frameRate: this.encoding.maxFramerate,
      aspectRatio: this.aspectRatio
    };
  }
}
var AudioPresets;
(function (AudioPresets) {
  AudioPresets.telephone = {
    maxBitrate: 12000
  };
  AudioPresets.speech = {
    maxBitrate: 20000
  };
  AudioPresets.music = {
    maxBitrate: 32000
  };
  AudioPresets.musicStereo = {
    maxBitrate: 48000
  };
  AudioPresets.musicHighQuality = {
    maxBitrate: 64000
  };
  AudioPresets.musicHighQualityStereo = {
    maxBitrate: 96000
  };
})(AudioPresets || (AudioPresets = {}));
/**
 * Sane presets for video resolution/encoding
 */
({
  h90: new VideoPreset(160, 90, 90000, 20),
  h180: new VideoPreset(320, 180, 160000, 20),
  h216: new VideoPreset(384, 216, 180000, 20),
  h360: new VideoPreset(640, 360, 450000, 20),
  h540: new VideoPreset(960, 540, 800000, 25),
  h720: new VideoPreset(1280, 720, 1700000, 30),
  h1080: new VideoPreset(1920, 1080, 3000000, 30),
  h1440: new VideoPreset(2560, 1440, 5000000, 30),
  h2160: new VideoPreset(3840, 2160, 8000000, 30)
});
/**
 * Four by three presets
 */
({
  h120: new VideoPreset(160, 120, 70000, 20),
  h180: new VideoPreset(240, 180, 125000, 20),
  h240: new VideoPreset(320, 240, 140000, 20),
  h360: new VideoPreset(480, 360, 330000, 20),
  h480: new VideoPreset(640, 480, 500000, 20),
  h540: new VideoPreset(720, 540, 600000, 25),
  h720: new VideoPreset(960, 720, 1300000, 30),
  h1080: new VideoPreset(1440, 1080, 2300000, 30),
  h1440: new VideoPreset(1920, 1440, 3800000, 30)
});
({
  h360fps3: new VideoPreset(640, 360, 200000, 3, 'medium'),
  h360fps15: new VideoPreset(640, 360, 400000, 15, 'medium'),
  h720fps5: new VideoPreset(1280, 720, 800000, 5, 'medium'),
  h720fps15: new VideoPreset(1280, 720, 1500000, 15, 'medium'),
  h720fps30: new VideoPreset(1280, 720, 2000000, 30, 'medium'),
  h1080fps15: new VideoPreset(1920, 1080, 2500000, 15, 'medium'),
  h1080fps30: new VideoPreset(1920, 1080, 5000000, 30, 'medium'),
  // original resolution, without resizing
  original: new VideoPreset(0, 0, 7000000, 30, 'medium')
});

var events = {exports: {}};

var hasRequiredEvents;
function requireEvents() {
  if (hasRequiredEvents) return events.exports;
  hasRequiredEvents = 1;
  var R = typeof Reflect === 'object' ? Reflect : null;
  var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target);
    };
  }
  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }
  var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
  };
  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  events.exports = EventEmitter;
  events.exports.once = once;

  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  var defaultMaxListeners = 10;
  function checkListener(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function () {
      return defaultMaxListeners;
    },
    set: function (arg) {
      if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
      }
      defaultMaxListeners = arg;
    }
  });
  EventEmitter.init = function () {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
  };
  function _getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }
  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };
  EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    var doError = type === 'error';
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

    // If there is no 'error' event listener then throw.
    if (doError) {
      var er;
      if (args.length > 0) er = args[0];
      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      }
      // At least give some kind of context to the user
      var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
      err.context = er;
      throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined) return false;
    if (typeof handler === 'function') {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
    }
    return true;
  };
  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener !== undefined) {
        target.emit('newListener', type, listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }
    if (existing === undefined) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        // If we've already got an array, just append.
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }

      // Check for listener leak
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        // No error code for this since it is a Warning
        // eslint-disable-next-line no-restricted-syntax
        var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }
    return target;
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0) return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }
  function _onceWrap(target, type, listener) {
    var state = {
      fired: false,
      wrapFn: undefined,
      target: target,
      type: type,
      listener: listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }
  EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };

  // Emits a 'removeListener' event if and only if the listener was removed.
  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;
    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else {
        delete events[type];
        if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;
      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }
      if (position < 0) return this;
      if (position === 0) list.shift();else {
        spliceOne(list, position);
      }
      if (list.length === 1) events[type] = list[0];
      if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this;

    // not listening for removeListener, no need to emit
    if (events.removeListener === undefined) {
      if (arguments.length === 0) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      } else if (events[type] !== undefined) {
        if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
      }
      return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      var keys = Object.keys(events);
      var key;
      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = Object.create(null);
      this._eventsCount = 0;
      return this;
    }
    listeners = events[type];
    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners !== undefined) {
      // LIFO order
      for (i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners[i]);
      }
    }
    return this;
  };
  function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };
  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };
  EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };
  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
      var evlistener = events[type];
      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener !== undefined) {
        return evlistener.length;
      }
    }
    return 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };
  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i) copy[i] = arr[i];
    return copy;
  }
  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++) list[index] = list[index + 1];
    list.pop();
  }
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }
  function once(emitter, name) {
    return new Promise(function (resolve, reject) {
      function errorListener(err) {
        emitter.removeListener(name, resolver);
        reject(err);
      }
      function resolver() {
        if (typeof emitter.removeListener === 'function') {
          emitter.removeListener('error', errorListener);
        }
        resolve([].slice.call(arguments));
      }
      eventTargetAgnosticAddListener(emitter, name, resolver, {
        once: true
      });
      if (name !== 'error') {
        addErrorHandlerIfEventEmitter(emitter, errorListener, {
          once: true
        });
      }
    });
  }
  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
      eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
  }
  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
      if (flags.once) {
        emitter.once(name, listener);
      } else {
        emitter.on(name, listener);
      }
    } else if (typeof emitter.addEventListener === 'function') {
      // EventTarget does not have `error` event semantics like Node
      // EventEmitters, we do not listen for `error` events here.
      emitter.addEventListener(name, function wrapListener(arg) {
        // IE does not have builtin `{ once: true }` support so we
        // have to do it manually.
        if (flags.once) {
          emitter.removeEventListener(name, wrapListener);
        }
        listener(arg);
      });
    } else {
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
  }
  return events.exports;
}

var eventsExports = requireEvents();

/**
 * Events are the primary way LiveKit notifies your application of changes.
 *
 * The following are events emitted by [[Room]], listen to room events like
 *
 * ```typescript
 * room.on(RoomEvent.TrackPublished, (track, publication, participant) => {})
 * ```
 */
var RoomEvent;
(function (RoomEvent) {
  /**
   * When the connection to the server has been established
   */
  RoomEvent["Connected"] = "connected";
  /**
   * When the connection to the server has been interrupted and it's attempting
   * to reconnect.
   */
  RoomEvent["Reconnecting"] = "reconnecting";
  /**
   * When the signal connection to the server has been interrupted. This isn't noticeable to users most of the time.
   * It will resolve with a `RoomEvent.Reconnected` once the signal connection has been re-established.
   * If media fails additionally it an additional `RoomEvent.Reconnecting` will be emitted.
   */
  RoomEvent["SignalReconnecting"] = "signalReconnecting";
  /**
   * Fires when a reconnection has been successful.
   */
  RoomEvent["Reconnected"] = "reconnected";
  /**
   * When disconnected from room. This fires when room.disconnect() is called or
   * when an unrecoverable connection issue had occured.
   *
   * DisconnectReason can be used to determine why the participant was disconnected. Notable reasons are
   * - DUPLICATE_IDENTITY: another client with the same identity has joined the room
   * - PARTICIPANT_REMOVED: participant was removed by RemoveParticipant API
   * - ROOM_DELETED: the room has ended via DeleteRoom API
   *
   * args: ([[DisconnectReason]])
   */
  RoomEvent["Disconnected"] = "disconnected";
  /**
   * Whenever the connection state of the room changes
   *
   * args: ([[ConnectionState]])
   */
  RoomEvent["ConnectionStateChanged"] = "connectionStateChanged";
  /**
   * When input or output devices on the machine have changed.
   */
  RoomEvent["MediaDevicesChanged"] = "mediaDevicesChanged";
  /**
   * When a [[RemoteParticipant]] joins *after* the local
   * participant. It will not emit events for participants that are already
   * in the room
   *
   * args: ([[RemoteParticipant]])
   */
  RoomEvent["ParticipantConnected"] = "participantConnected";
  /**
   * When a [[RemoteParticipant]] leaves *after* the local
   * participant has joined.
   *
   * args: ([[RemoteParticipant]])
   */
  RoomEvent["ParticipantDisconnected"] = "participantDisconnected";
  /**
   * When a new track is published to room *after* the local
   * participant has joined. It will not fire for tracks that are already published.
   *
   * A track published doesn't mean the participant has subscribed to it. It's
   * simply reflecting the state of the room.
   *
   * args: ([[RemoteTrackPublication]], [[RemoteParticipant]])
   */
  RoomEvent["TrackPublished"] = "trackPublished";
  /**
   * The [[LocalParticipant]] has subscribed to a new track. This event will **always**
   * fire as long as new tracks are ready for use.
   *
   * args: ([[RemoteTrack]], [[RemoteTrackPublication]], [[RemoteParticipant]])
   */
  RoomEvent["TrackSubscribed"] = "trackSubscribed";
  /**
   * Could not subscribe to a track
   *
   * args: (track sid, [[RemoteParticipant]])
   */
  RoomEvent["TrackSubscriptionFailed"] = "trackSubscriptionFailed";
  /**
   * A [[RemoteParticipant]] has unpublished a track
   *
   * args: ([[RemoteTrackPublication]], [[RemoteParticipant]])
   */
  RoomEvent["TrackUnpublished"] = "trackUnpublished";
  /**
   * A subscribed track is no longer available. Clients should listen to this
   * event and ensure they detach tracks.
   *
   * args: ([[Track]], [[RemoteTrackPublication]], [[RemoteParticipant]])
   */
  RoomEvent["TrackUnsubscribed"] = "trackUnsubscribed";
  /**
   * A track that was muted, fires on both [[RemoteParticipant]]s and [[LocalParticipant]]
   *
   * args: ([[TrackPublication]], [[Participant]])
   */
  RoomEvent["TrackMuted"] = "trackMuted";
  /**
   * A track that was unmuted, fires on both [[RemoteParticipant]]s and [[LocalParticipant]]
   *
   * args: ([[TrackPublication]], [[Participant]])
   */
  RoomEvent["TrackUnmuted"] = "trackUnmuted";
  /**
   * A local track was published successfully. This event is helpful to know
   * when to update your local UI with the newly published track.
   *
   * args: ([[LocalTrackPublication]], [[LocalParticipant]])
   */
  RoomEvent["LocalTrackPublished"] = "localTrackPublished";
  /**
   * A local track was unpublished. This event is helpful to know when to remove
   * the local track from your UI.
   *
   * When a user stops sharing their screen by pressing "End" on the browser UI,
   * this event will also fire.
   *
   * args: ([[LocalTrackPublication]], [[LocalParticipant]])
   */
  RoomEvent["LocalTrackUnpublished"] = "localTrackUnpublished";
  /**
   * When a local audio track is published the SDK checks whether there is complete silence
   * on that track and emits the LocalAudioSilenceDetected event in that case.
   * This allows for applications to show UI informing users that they might have to
   * reset their audio hardware or check for proper device connectivity.
   */
  RoomEvent["LocalAudioSilenceDetected"] = "localAudioSilenceDetected";
  /**
   * Active speakers changed. List of speakers are ordered by their audio level.
   * loudest speakers first. This will include the LocalParticipant too.
   *
   * Speaker updates are sent only to the publishing participant and their subscribers.
   *
   * args: (Array<[[Participant]]>)
   */
  RoomEvent["ActiveSpeakersChanged"] = "activeSpeakersChanged";
  /**
   * Participant metadata is a simple way for app-specific state to be pushed to
   * all users.
   * When RoomService.UpdateParticipantMetadata is called to change a participant's
   * state, *all*  participants in the room will fire this event.
   *
   * args: (prevMetadata: string, [[Participant]])
   *
   */
  RoomEvent["ParticipantMetadataChanged"] = "participantMetadataChanged";
  /**
   * Participant's display name changed
   *
   * args: (name: string, [[Participant]])
   *
   */
  RoomEvent["ParticipantNameChanged"] = "participantNameChanged";
  /**
   * Participant attributes is an app-specific key value state to be pushed to
   * all users.
   * When a participant's attributes changed, this event will be emitted with the changed attributes and the participant
   * args: (changedAttributes: [[Record<string, string]], participant: [[Participant]])
   */
  RoomEvent["ParticipantAttributesChanged"] = "participantAttributesChanged";
  /**
   * Room metadata is a simple way for app-specific state to be pushed to
   * all users.
   * When RoomService.UpdateRoomMetadata is called to change a room's state,
   * *all*  participants in the room will fire this event.
   *
   * args: (string)
   */
  RoomEvent["RoomMetadataChanged"] = "roomMetadataChanged";
  /**
   * Data received from another participant.
   * Data packets provides the ability to use LiveKit to send/receive arbitrary payloads.
   * All participants in the room will receive the messages sent to the room.
   *
   * args: (payload: Uint8Array, participant: [[Participant]], kind: [[DataPacket_Kind]], topic?: string)
   */
  RoomEvent["DataReceived"] = "dataReceived";
  /**
   * SIP DTMF tones received from another participant.
   *
   * args: (participant: [[Participant]], dtmf: [[DataPacket_Kind]])
   */
  RoomEvent["SipDTMFReceived"] = "sipDTMFReceived";
  /**
   * Transcription received from a participant's track.
   * @beta
   */
  RoomEvent["TranscriptionReceived"] = "transcriptionReceived";
  /**
   * Connection quality was changed for a Participant. It'll receive updates
   * from the local participant, as well as any [[RemoteParticipant]]s that we are
   * subscribed to.
   *
   * args: (connectionQuality: [[ConnectionQuality]], participant: [[Participant]])
   */
  RoomEvent["ConnectionQualityChanged"] = "connectionQualityChanged";
  /**
   * StreamState indicates if a subscribed (remote) track has been paused by the SFU
   * (typically this happens because of subscriber's bandwidth constraints)
   *
   * When bandwidth conditions allow, the track will be resumed automatically.
   * TrackStreamStateChanged will also be emitted when that happens.
   *
   * args: (pub: [[RemoteTrackPublication]], streamState: [[Track.StreamState]],
   *        participant: [[RemoteParticipant]])
   */
  RoomEvent["TrackStreamStateChanged"] = "trackStreamStateChanged";
  /**
   * One of subscribed tracks have changed its permissions for the current
   * participant. If permission was revoked, then the track will no longer
   * be subscribed. If permission was granted, a TrackSubscribed event will
   * be emitted.
   *
   * args: (pub: [[RemoteTrackPublication]],
   *        status: [[TrackPublication.PermissionStatus]],
   *        participant: [[RemoteParticipant]])
   */
  RoomEvent["TrackSubscriptionPermissionChanged"] = "trackSubscriptionPermissionChanged";
  /**
   * One of subscribed tracks have changed its status for the current
   * participant.
   *
   * args: (pub: [[RemoteTrackPublication]],
   *        status: [[TrackPublication.SubscriptionStatus]],
   *        participant: [[RemoteParticipant]])
   */
  RoomEvent["TrackSubscriptionStatusChanged"] = "trackSubscriptionStatusChanged";
  /**
   * LiveKit will attempt to autoplay all audio tracks when you attach them to
   * audio elements. However, if that fails, we'll notify you via AudioPlaybackStatusChanged.
   * `Room.canPlaybackAudio` will indicate if audio playback is permitted.
   */
  RoomEvent["AudioPlaybackStatusChanged"] = "audioPlaybackChanged";
  /**
   * LiveKit will attempt to autoplay all video tracks when you attach them to
   * a video element. However, if that fails, we'll notify you via VideoPlaybackStatusChanged.
   * Calling `room.startVideo()` in a user gesture event handler will resume the video playback.
   */
  RoomEvent["VideoPlaybackStatusChanged"] = "videoPlaybackChanged";
  /**
   * When we have encountered an error while attempting to create a track.
   * The errors take place in getUserMedia().
   * Use MediaDeviceFailure.getFailure(error) to get the reason of failure.
   * [[LocalParticipant.lastCameraError]] and [[LocalParticipant.lastMicrophoneError]]
   * will indicate if it had an error while creating the audio or video track respectively.
   *
   * args: (error: Error)
   */
  RoomEvent["MediaDevicesError"] = "mediaDevicesError";
  /**
   * A participant's permission has changed.
   * args: (prevPermissions: [[ParticipantPermission]], participant: [[Participant]])
   */
  RoomEvent["ParticipantPermissionsChanged"] = "participantPermissionsChanged";
  /**
   * Signal connected, can publish tracks.
   */
  RoomEvent["SignalConnected"] = "signalConnected";
  /**
   * Recording of a room has started/stopped. Room.isRecording will be updated too.
   * args: (isRecording: boolean)
   */
  RoomEvent["RecordingStatusChanged"] = "recordingStatusChanged";
  RoomEvent["ParticipantEncryptionStatusChanged"] = "participantEncryptionStatusChanged";
  RoomEvent["EncryptionError"] = "encryptionError";
  /**
   * Emits whenever the current buffer status of a data channel changes
   * args: (isLow: boolean, kind: [[DataPacket_Kind]])
   */
  RoomEvent["DCBufferStatusChanged"] = "dcBufferStatusChanged";
  /**
   * Triggered by a call to room.switchActiveDevice
   * args: (kind: MediaDeviceKind, deviceId: string)
   */
  RoomEvent["ActiveDeviceChanged"] = "activeDeviceChanged";
  RoomEvent["ChatMessage"] = "chatMessage";
  /**
   * fired when the first remote participant has subscribed to the localParticipant's track
   */
  RoomEvent["LocalTrackSubscribed"] = "localTrackSubscribed";
  /**
   * fired when the client receives connection metrics from other participants
   */
  RoomEvent["MetricsReceived"] = "metricsReceived";
})(RoomEvent || (RoomEvent = {}));
var ParticipantEvent;
(function (ParticipantEvent) {
  /**
   * When a new track is published to room *after* the local
   * participant has joined. It will not fire for tracks that are already published.
   *
   * A track published doesn't mean the participant has subscribed to it. It's
   * simply reflecting the state of the room.
   *
   * args: ([[RemoteTrackPublication]])
   */
  ParticipantEvent["TrackPublished"] = "trackPublished";
  /**
   * Successfully subscribed to the [[RemoteParticipant]]'s track.
   * This event will **always** fire as long as new tracks are ready for use.
   *
   * args: ([[RemoteTrack]], [[RemoteTrackPublication]])
   */
  ParticipantEvent["TrackSubscribed"] = "trackSubscribed";
  /**
   * Could not subscribe to a track
   *
   * args: (track sid)
   */
  ParticipantEvent["TrackSubscriptionFailed"] = "trackSubscriptionFailed";
  /**
   * A [[RemoteParticipant]] has unpublished a track
   *
   * args: ([[RemoteTrackPublication]])
   */
  ParticipantEvent["TrackUnpublished"] = "trackUnpublished";
  /**
   * A subscribed track is no longer available. Clients should listen to this
   * event and ensure they detach tracks.
   *
   * args: ([[RemoteTrack]], [[RemoteTrackPublication]])
   */
  ParticipantEvent["TrackUnsubscribed"] = "trackUnsubscribed";
  /**
   * A track that was muted, fires on both [[RemoteParticipant]]s and [[LocalParticipant]]
   *
   * args: ([[TrackPublication]])
   */
  ParticipantEvent["TrackMuted"] = "trackMuted";
  /**
   * A track that was unmuted, fires on both [[RemoteParticipant]]s and [[LocalParticipant]]
   *
   * args: ([[TrackPublication]])
   */
  ParticipantEvent["TrackUnmuted"] = "trackUnmuted";
  /**
   * A local track was published successfully. This event is helpful to know
   * when to update your local UI with the newly published track.
   *
   * args: ([[LocalTrackPublication]])
   */
  ParticipantEvent["LocalTrackPublished"] = "localTrackPublished";
  /**
   * A local track was unpublished. This event is helpful to know when to remove
   * the local track from your UI.
   *
   * When a user stops sharing their screen by pressing "End" on the browser UI,
   * this event will also fire.
   *
   * args: ([[LocalTrackPublication]])
   */
  ParticipantEvent["LocalTrackUnpublished"] = "localTrackUnpublished";
  /**
   * Participant metadata is a simple way for app-specific state to be pushed to
   * all users.
   * When RoomService.UpdateParticipantMetadata is called to change a participant's
   * state, *all*  participants in the room will fire this event.
   * To access the current metadata, see [[Participant.metadata]].
   *
   * args: (prevMetadata: string)
   *
   */
  ParticipantEvent["ParticipantMetadataChanged"] = "participantMetadataChanged";
  /**
   * Participant's display name changed
   *
   * args: (name: string, [[Participant]])
   *
   */
  ParticipantEvent["ParticipantNameChanged"] = "participantNameChanged";
  /**
   * Data received from this participant as sender.
   * Data packets provides the ability to use LiveKit to send/receive arbitrary payloads.
   * All participants in the room will receive the messages sent to the room.
   *
   * args: (payload: Uint8Array, kind: [[DataPacket_Kind]])
   */
  ParticipantEvent["DataReceived"] = "dataReceived";
  /**
   * SIP DTMF tones received from this participant as sender.
   *
   * args: (dtmf: [[DataPacket_Kind]])
   */
  ParticipantEvent["SipDTMFReceived"] = "sipDTMFReceived";
  /**
   * Transcription received from this participant as data source.
   * @beta
   */
  ParticipantEvent["TranscriptionReceived"] = "transcriptionReceived";
  /**
   * Has speaking status changed for the current participant
   *
   * args: (speaking: boolean)
   */
  ParticipantEvent["IsSpeakingChanged"] = "isSpeakingChanged";
  /**
   * Connection quality was changed for a Participant. It'll receive updates
   * from the local participant, as well as any [[RemoteParticipant]]s that we are
   * subscribed to.
   *
   * args: (connectionQuality: [[ConnectionQuality]])
   */
  ParticipantEvent["ConnectionQualityChanged"] = "connectionQualityChanged";
  /**
   * StreamState indicates if a subscribed track has been paused by the SFU
   * (typically this happens because of subscriber's bandwidth constraints)
   *
   * When bandwidth conditions allow, the track will be resumed automatically.
   * TrackStreamStateChanged will also be emitted when that happens.
   *
   * args: (pub: [[RemoteTrackPublication]], streamState: [[Track.StreamState]])
   */
  ParticipantEvent["TrackStreamStateChanged"] = "trackStreamStateChanged";
  /**
   * One of subscribed tracks have changed its permissions for the current
   * participant. If permission was revoked, then the track will no longer
   * be subscribed. If permission was granted, a TrackSubscribed event will
   * be emitted.
   *
   * args: (pub: [[RemoteTrackPublication]],
   *        status: [[TrackPublication.SubscriptionStatus]])
   */
  ParticipantEvent["TrackSubscriptionPermissionChanged"] = "trackSubscriptionPermissionChanged";
  /**
   * One of the remote participants publications has changed its subscription status.
   *
   */
  ParticipantEvent["TrackSubscriptionStatusChanged"] = "trackSubscriptionStatusChanged";
  // fired only on LocalParticipant
  /** @internal */
  ParticipantEvent["MediaDevicesError"] = "mediaDevicesError";
  // fired only on LocalParticipant
  /** @internal */
  ParticipantEvent["AudioStreamAcquired"] = "audioStreamAcquired";
  /**
   * A participant's permission has changed.
   * args: (prevPermissions: [[ParticipantPermission]])
   */
  ParticipantEvent["ParticipantPermissionsChanged"] = "participantPermissionsChanged";
  /** @internal */
  ParticipantEvent["PCTrackAdded"] = "pcTrackAdded";
  /**
   * Participant attributes is an app-specific key value state to be pushed to
   * all users.
   * When a participant's attributes changed, this event will be emitted with the changed attributes
   * args: (changedAttributes: [[Record<string, string]])
   */
  ParticipantEvent["AttributesChanged"] = "attributesChanged";
  /**
   * fired on local participant only, when the first remote participant has subscribed to the track specified in the payload
   */
  ParticipantEvent["LocalTrackSubscribed"] = "localTrackSubscribed";
  /** only emitted on local participant */
  ParticipantEvent["ChatMessage"] = "chatMessage";
})(ParticipantEvent || (ParticipantEvent = {}));
/** @internal */
var EngineEvent;
(function (EngineEvent) {
  EngineEvent["TransportsCreated"] = "transportsCreated";
  EngineEvent["Connected"] = "connected";
  EngineEvent["Disconnected"] = "disconnected";
  EngineEvent["Resuming"] = "resuming";
  EngineEvent["Resumed"] = "resumed";
  EngineEvent["Restarting"] = "restarting";
  EngineEvent["Restarted"] = "restarted";
  EngineEvent["SignalResumed"] = "signalResumed";
  EngineEvent["SignalRestarted"] = "signalRestarted";
  EngineEvent["Closing"] = "closing";
  EngineEvent["MediaTrackAdded"] = "mediaTrackAdded";
  EngineEvent["ActiveSpeakersUpdate"] = "activeSpeakersUpdate";
  EngineEvent["DataPacketReceived"] = "dataPacketReceived";
  EngineEvent["RTPVideoMapUpdate"] = "rtpVideoMapUpdate";
  EngineEvent["DCBufferStatusChanged"] = "dcBufferStatusChanged";
  EngineEvent["ParticipantUpdate"] = "participantUpdate";
  EngineEvent["RoomUpdate"] = "roomUpdate";
  EngineEvent["SpeakersChanged"] = "speakersChanged";
  EngineEvent["StreamStateChanged"] = "streamStateChanged";
  EngineEvent["ConnectionQualityUpdate"] = "connectionQualityUpdate";
  EngineEvent["SubscriptionError"] = "subscriptionError";
  EngineEvent["SubscriptionPermissionUpdate"] = "subscriptionPermissionUpdate";
  EngineEvent["RemoteMute"] = "remoteMute";
  EngineEvent["SubscribedQualityUpdate"] = "subscribedQualityUpdate";
  EngineEvent["LocalTrackUnpublished"] = "localTrackUnpublished";
  EngineEvent["LocalTrackSubscribed"] = "localTrackSubscribed";
  EngineEvent["Offline"] = "offline";
  EngineEvent["SignalRequestResponse"] = "signalRequestResponse";
})(EngineEvent || (EngineEvent = {}));
var TrackEvent;
(function (TrackEvent) {
  TrackEvent["Message"] = "message";
  TrackEvent["Muted"] = "muted";
  TrackEvent["Unmuted"] = "unmuted";
  /**
   * Only fires on LocalTracks
   */
  TrackEvent["Restarted"] = "restarted";
  TrackEvent["Ended"] = "ended";
  TrackEvent["Subscribed"] = "subscribed";
  TrackEvent["Unsubscribed"] = "unsubscribed";
  /** @internal */
  TrackEvent["UpdateSettings"] = "updateSettings";
  /** @internal */
  TrackEvent["UpdateSubscription"] = "updateSubscription";
  /** @internal */
  TrackEvent["AudioPlaybackStarted"] = "audioPlaybackStarted";
  /** @internal */
  TrackEvent["AudioPlaybackFailed"] = "audioPlaybackFailed";
  /**
   * @internal
   * Only fires on LocalAudioTrack instances
   */
  TrackEvent["AudioSilenceDetected"] = "audioSilenceDetected";
  /** @internal */
  TrackEvent["VisibilityChanged"] = "visibilityChanged";
  /** @internal */
  TrackEvent["VideoDimensionsChanged"] = "videoDimensionsChanged";
  /** @internal */
  TrackEvent["VideoPlaybackStarted"] = "videoPlaybackStarted";
  /** @internal */
  TrackEvent["VideoPlaybackFailed"] = "videoPlaybackFailed";
  /** @internal */
  TrackEvent["ElementAttached"] = "elementAttached";
  /** @internal */
  TrackEvent["ElementDetached"] = "elementDetached";
  /**
   * @internal
   * Only fires on LocalTracks
   */
  TrackEvent["UpstreamPaused"] = "upstreamPaused";
  /**
   * @internal
   * Only fires on LocalTracks
   */
  TrackEvent["UpstreamResumed"] = "upstreamResumed";
  /**
   * @internal
   * Fires on RemoteTrackPublication
   */
  TrackEvent["SubscriptionPermissionChanged"] = "subscriptionPermissionChanged";
  /**
   * Fires on RemoteTrackPublication
   */
  TrackEvent["SubscriptionStatusChanged"] = "subscriptionStatusChanged";
  /**
   * Fires on RemoteTrackPublication
   */
  TrackEvent["SubscriptionFailed"] = "subscriptionFailed";
  /**
   * @internal
   */
  TrackEvent["TrackProcessorUpdate"] = "trackProcessorUpdate";
  /**
   * @internal
   */
  TrackEvent["AudioTrackFeatureUpdate"] = "audioTrackFeatureUpdate";
  /**
   * @beta
   */
  TrackEvent["TranscriptionReceived"] = "transcriptionReceived";
  /**
   * @experimental
   */
  TrackEvent["TimeSyncUpdate"] = "timeSyncUpdate";
})(TrackEvent || (TrackEvent = {}));

const BACKGROUND_REACTION_DELAY = 5000;
// keep old audio elements when detached, we would re-use them since on iOS
// Safari tracks which audio elements have been "blessed" by the user.
const recycledElements = [];
var VideoQuality;
(function (VideoQuality) {
  VideoQuality[VideoQuality["LOW"] = 0] = "LOW";
  VideoQuality[VideoQuality["MEDIUM"] = 1] = "MEDIUM";
  VideoQuality[VideoQuality["HIGH"] = 2] = "HIGH";
})(VideoQuality || (VideoQuality = {}));
class Track extends eventsExports.EventEmitter {
  constructor(mediaTrack, kind) {
    let loggerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _a;
    super();
    this.attachedElements = [];
    this.isMuted = false;
    /**
     * indicates current state of stream, it'll indicate `paused` if the track
     * has been paused by congestion controller
     */
    this.streamState = Track.StreamState.Active;
    this.isInBackground = false;
    this._currentBitrate = 0;
    this.log = livekitLogger;
    this.appVisibilityChangedListener = () => {
      if (this.backgroundTimeout) {
        clearTimeout(this.backgroundTimeout);
      }
      // delay app visibility update if it goes to hidden
      // update immediately if it comes back to focus
      if (document.visibilityState === 'hidden') {
        this.backgroundTimeout = setTimeout(() => this.handleAppVisibilityChanged(), BACKGROUND_REACTION_DELAY);
      } else {
        this.handleAppVisibilityChanged();
      }
    };
    this.log = getLogger((_a = loggerOptions.loggerName) !== null && _a !== void 0 ? _a : LoggerNames.Track);
    this.loggerContextCb = loggerOptions.loggerContextCb;
    this.setMaxListeners(100);
    this.kind = kind;
    this._mediaStreamTrack = mediaTrack;
    this._mediaStreamID = mediaTrack.id;
    this.source = Track.Source.Unknown;
  }
  get logContext() {
    var _a;
    return Object.assign(Object.assign({}, (_a = this.loggerContextCb) === null || _a === void 0 ? void 0 : _a.call(this)), getLogContextFromTrack(this));
  }
  /** current receive bits per second */
  get currentBitrate() {
    return this._currentBitrate;
  }
  get mediaStreamTrack() {
    return this._mediaStreamTrack;
  }
  /**
   * @internal
   * used for keep mediaStream's first id, since it's id might change
   * if we disable/enable a track
   */
  get mediaStreamID() {
    return this._mediaStreamID;
  }
  attach(element) {
    let elementType = 'audio';
    if (this.kind === Track.Kind.Video) {
      elementType = 'video';
    }
    if (this.attachedElements.length === 0 && this.kind === Track.Kind.Video) {
      this.addAppVisibilityListener();
    }
    if (!element) {
      if (elementType === 'audio') {
        recycledElements.forEach(e => {
          if (e.parentElement === null && !element) {
            element = e;
          }
        });
        if (element) {
          // remove it from pool
          recycledElements.splice(recycledElements.indexOf(element), 1);
        }
      }
      if (!element) {
        element = document.createElement(elementType);
      }
    }
    if (!this.attachedElements.includes(element)) {
      this.attachedElements.push(element);
    }
    // even if we believe it's already attached to the element, it's possible
    // the element's srcObject was set to something else out of band.
    // we'll want to re-attach it in that case
    attachToElement(this.mediaStreamTrack, element);
    // handle auto playback failures
    const allMediaStreamTracks = element.srcObject.getTracks();
    const hasAudio = allMediaStreamTracks.some(tr => tr.kind === 'audio');
    // manually play media to detect auto playback status
    element.play().then(() => {
      this.emit(hasAudio ? TrackEvent.AudioPlaybackStarted : TrackEvent.VideoPlaybackStarted);
    }).catch(e => {
      if (e.name === 'NotAllowedError') {
        this.emit(hasAudio ? TrackEvent.AudioPlaybackFailed : TrackEvent.VideoPlaybackFailed, e);
      } else if (e.name === 'AbortError') {
        // commonly triggered by another `play` request, only log for debugging purposes
        livekitLogger.debug("".concat(hasAudio ? 'audio' : 'video', " playback aborted, likely due to new play request"));
      } else {
        livekitLogger.warn("could not playback ".concat(hasAudio ? 'audio' : 'video'), e);
      }
      // If audio playback isn't allowed make sure we still play back the video
      if (hasAudio && element && allMediaStreamTracks.some(tr => tr.kind === 'video') && e.name === 'NotAllowedError') {
        element.muted = true;
        element.play().catch(() => {
          // catch for Safari, exceeded options at this point to automatically play the media element
        });
      }
    });
    this.emit(TrackEvent.ElementAttached, element);
    return element;
  }
  detach(element) {
    try {
      // detach from a single element
      if (element) {
        detachTrack(this.mediaStreamTrack, element);
        const idx = this.attachedElements.indexOf(element);
        if (idx >= 0) {
          this.attachedElements.splice(idx, 1);
          this.recycleElement(element);
          this.emit(TrackEvent.ElementDetached, element);
        }
        return element;
      }
      const detached = [];
      this.attachedElements.forEach(elm => {
        detachTrack(this.mediaStreamTrack, elm);
        detached.push(elm);
        this.recycleElement(elm);
        this.emit(TrackEvent.ElementDetached, elm);
      });
      // remove all tracks
      this.attachedElements = [];
      return detached;
    } finally {
      if (this.attachedElements.length === 0) {
        this.removeAppVisibilityListener();
      }
    }
  }
  stop() {
    this.stopMonitor();
    this._mediaStreamTrack.stop();
  }
  enable() {
    this._mediaStreamTrack.enabled = true;
  }
  disable() {
    this._mediaStreamTrack.enabled = false;
  }
  /* @internal */
  stopMonitor() {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
    }
    if (this.timeSyncHandle) {
      cancelAnimationFrame(this.timeSyncHandle);
    }
  }
  /** @internal */
  updateLoggerOptions(loggerOptions) {
    if (loggerOptions.loggerName) {
      this.log = getLogger(loggerOptions.loggerName);
    }
    if (loggerOptions.loggerContextCb) {
      this.loggerContextCb = loggerOptions.loggerContextCb;
    }
  }
  recycleElement(element) {
    if (element instanceof HTMLAudioElement) {
      // we only need to re-use a single element
      let shouldCache = true;
      element.pause();
      recycledElements.forEach(e => {
        if (!e.parentElement) {
          shouldCache = false;
        }
      });
      if (shouldCache) {
        recycledElements.push(element);
      }
    }
  }
  handleAppVisibilityChanged() {
    return __awaiter(this, void 0, void 0, function* () {
      this.isInBackground = document.visibilityState === 'hidden';
      if (!this.isInBackground && this.kind === Track.Kind.Video) {
        setTimeout(() => this.attachedElements.forEach(el => el.play().catch(() => {
          /** catch clause necessary for Safari */
        })), 0);
      }
    });
  }
  addAppVisibilityListener() {
    if (isWeb()) {
      this.isInBackground = document.visibilityState === 'hidden';
      document.addEventListener('visibilitychange', this.appVisibilityChangedListener);
    } else {
      this.isInBackground = false;
    }
  }
  removeAppVisibilityListener() {
    if (isWeb()) {
      document.removeEventListener('visibilitychange', this.appVisibilityChangedListener);
    }
  }
}
function attachToElement(track, element) {
  let mediaStream;
  if (element.srcObject instanceof MediaStream) {
    mediaStream = element.srcObject;
  } else {
    mediaStream = new MediaStream();
  }
  // check if track matches existing track
  let existingTracks;
  if (track.kind === 'audio') {
    existingTracks = mediaStream.getAudioTracks();
  } else {
    existingTracks = mediaStream.getVideoTracks();
  }
  if (!existingTracks.includes(track)) {
    existingTracks.forEach(et => {
      mediaStream.removeTrack(et);
    });
    mediaStream.addTrack(track);
  }
  if (!isSafari() || !(element instanceof HTMLVideoElement)) {
    // when in low power mode (applies to both macOS and iOS), Safari will show a play/pause overlay
    // when a video starts that has the `autoplay` attribute is set.
    // we work around this by _not_ setting the autoplay attribute on safari and instead call `setTimeout(() => el.play(),0)` further down
    element.autoplay = true;
  }
  // In case there are no audio tracks present on the mediastream, we set the element as muted to ensure autoplay works
  element.muted = mediaStream.getAudioTracks().length === 0;
  if (element instanceof HTMLVideoElement) {
    element.playsInline = true;
  }
  // avoid flicker
  if (element.srcObject !== mediaStream) {
    element.srcObject = mediaStream;
    if ((isSafari() || isFireFox()) && element instanceof HTMLVideoElement) {
      // Firefox also has a timing issue where video doesn't actually get attached unless
      // performed out-of-band
      // Safari 15 has a bug where in certain layouts, video element renders
      // black until the page is resized or other changes take place.
      // Resetting the src triggers it to render.
      // https://developer.apple.com/forums/thread/690523
      setTimeout(() => {
        element.srcObject = mediaStream;
        // Safari 15 sometimes fails to start a video
        // when the window is backgrounded before the first frame is drawn
        // manually calling play here seems to fix that
        element.play().catch(() => {
          /** do nothing */
        });
      }, 0);
    }
  }
}
/** @internal */
function detachTrack(track, element) {
  if (element.srcObject instanceof MediaStream) {
    const mediaStream = element.srcObject;
    mediaStream.removeTrack(track);
    if (mediaStream.getTracks().length > 0) {
      element.srcObject = mediaStream;
    } else {
      element.srcObject = null;
    }
  }
}
(function (Track) {
  let Kind;
  (function (Kind) {
    Kind["Audio"] = "audio";
    Kind["Video"] = "video";
    Kind["Unknown"] = "unknown";
  })(Kind = Track.Kind || (Track.Kind = {}));
  let Source;
  (function (Source) {
    Source["Camera"] = "camera";
    Source["Microphone"] = "microphone";
    Source["ScreenShare"] = "screen_share";
    Source["ScreenShareAudio"] = "screen_share_audio";
    Source["Unknown"] = "unknown";
  })(Source = Track.Source || (Track.Source = {}));
  let StreamState$1;
  (function (StreamState) {
    StreamState["Active"] = "active";
    StreamState["Paused"] = "paused";
    StreamState["Unknown"] = "unknown";
  })(StreamState$1 = Track.StreamState || (Track.StreamState = {}));
  /** @internal */
  function kindToProto(k) {
    switch (k) {
      case Kind.Audio:
        return TrackType.AUDIO;
      case Kind.Video:
        return TrackType.VIDEO;
      default:
        // FIXME this was UNRECOGNIZED before
        return TrackType.DATA;
    }
  }
  Track.kindToProto = kindToProto;
  /** @internal */
  function kindFromProto(t) {
    switch (t) {
      case TrackType.AUDIO:
        return Kind.Audio;
      case TrackType.VIDEO:
        return Kind.Video;
      default:
        return Kind.Unknown;
    }
  }
  Track.kindFromProto = kindFromProto;
  /** @internal */
  function sourceToProto(s) {
    switch (s) {
      case Source.Camera:
        return TrackSource.CAMERA;
      case Source.Microphone:
        return TrackSource.MICROPHONE;
      case Source.ScreenShare:
        return TrackSource.SCREEN_SHARE;
      case Source.ScreenShareAudio:
        return TrackSource.SCREEN_SHARE_AUDIO;
      default:
        return TrackSource.UNKNOWN;
    }
  }
  Track.sourceToProto = sourceToProto;
  /** @internal */
  function sourceFromProto(s) {
    switch (s) {
      case TrackSource.CAMERA:
        return Source.Camera;
      case TrackSource.MICROPHONE:
        return Source.Microphone;
      case TrackSource.SCREEN_SHARE:
        return Source.ScreenShare;
      case TrackSource.SCREEN_SHARE_AUDIO:
        return Source.ScreenShareAudio;
      default:
        return Source.Unknown;
    }
  }
  Track.sourceFromProto = sourceFromProto;
  /** @internal */
  function streamStateFromProto(s) {
    switch (s) {
      case StreamState.ACTIVE:
        return StreamState$1.Active;
      case StreamState.PAUSED:
        return StreamState$1.Paused;
      default:
        return StreamState$1.Unknown;
    }
  }
  Track.streamStateFromProto = streamStateFromProto;
})(Track || (Track = {}));

function getLogContextFromTrack(track) {
  if (track instanceof Track) {
    return {
      trackID: track.sid,
      source: track.source,
      muted: track.isMuted,
      enabled: track.mediaStreamTrack.enabled,
      kind: track.kind,
      streamID: track.mediaStreamID,
      streamTrackID: track.mediaStreamTrack.id
    };
  } else {
    return {
      trackID: track.trackSid,
      enabled: track.isEnabled,
      muted: track.isMuted,
      trackInfo: Object.assign({
        mimeType: track.mimeType,
        name: track.trackName,
        encrypted: track.isEncrypted,
        kind: track.kind,
        source: track.source
      }, track.track ? getLogContextFromTrack(track.track) : {})
    };
  }
}

function isFireFox() {
  var _a;
  return ((_a = getBrowser()) === null || _a === void 0 ? void 0 : _a.name) === 'Firefox';
}
function isSafari() {
  var _a;
  return ((_a = getBrowser()) === null || _a === void 0 ? void 0 : _a.name) === 'Safari';
}
function isWeb() {
  return typeof document !== 'undefined';
}
/**
 * @internal
 */
class Mutex {
  constructor() {
    this._locking = Promise.resolve();
    this._locks = 0;
  }
  isLocked() {
    return this._locks > 0;
  }
  lock() {
    this._locks += 1;
    let unlockNext;
    const willLock = new Promise(resolve => unlockNext = () => {
      this._locks -= 1;
      resolve();
    });
    const willUnlock = this._locking.then(() => unlockNext);
    this._locking = this._locking.then(() => willLock);
    return willUnlock;
  }
}

var QueueTaskStatus;
(function (QueueTaskStatus) {
  QueueTaskStatus[QueueTaskStatus["WAITING"] = 0] = "WAITING";
  QueueTaskStatus[QueueTaskStatus["RUNNING"] = 1] = "RUNNING";
  QueueTaskStatus[QueueTaskStatus["COMPLETED"] = 2] = "COMPLETED";
})(QueueTaskStatus || (QueueTaskStatus = {}));
class AsyncQueue {
  constructor() {
    this.pendingTasks = new Map();
    this.taskMutex = new Mutex();
    this.nextTaskIndex = 0;
  }
  run(task) {
    return __awaiter(this, void 0, void 0, function* () {
      const taskInfo = {
        id: this.nextTaskIndex++,
        enqueuedAt: Date.now(),
        status: QueueTaskStatus.WAITING
      };
      this.pendingTasks.set(taskInfo.id, taskInfo);
      const unlock = yield this.taskMutex.lock();
      try {
        taskInfo.executedAt = Date.now();
        taskInfo.status = QueueTaskStatus.RUNNING;
        return yield task();
      } finally {
        taskInfo.status = QueueTaskStatus.COMPLETED;
        this.pendingTasks.delete(taskInfo.id);
        unlock();
      }
    });
  }
  flush() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.run(() => __awaiter(this, void 0, void 0, function* () {}));
    });
  }
  snapshot() {
    return Array.from(this.pendingTasks.values());
  }
}

const ENCRYPTION_ALGORITHM = 'AES-GCM';
// How many consecutive frames can fail decrypting before a particular key gets marked as invalid
const DECRYPTION_FAILURE_TOLERANCE = 10;
// We copy the first bytes of the VP8 payload unencrypted.
// For keyframes this is 10 bytes, for non-keyframes (delta) 3. See
//   https://tools.ietf.org/html/rfc6386#section-9.1
// This allows the bridge to continue detecting keyframes (only one byte needed in the JVB)
// and is also a bit easier for the VP8 decoder (i.e. it generates funny garbage pictures
// instead of being unable to decode).
// This is a bit for show and we might want to reduce to 1 unconditionally in the final version.
//
// For audio (where frame.type is not set) we do not encrypt the opus TOC byte:
//   https://tools.ietf.org/html/rfc6716#section-3.1
const UNENCRYPTED_BYTES = {
  key: 10,
  delta: 3,
  audio: 1,
  // frame.type is not set on audio, so this is set manually
  empty: 0
};
/* We use a 12 byte bit IV. This is signalled in plain together with the
 packet. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#parameters */
const IV_LENGTH = 12;
const SALT = 'LKFrameEncryptionKey';
const KEY_PROVIDER_DEFAULTS = {
  sharedKey: false,
  ratchetSalt: SALT,
  ratchetWindowSize: 8,
  failureTolerance: DECRYPTION_FAILURE_TOLERANCE,
  keyringSize: 16
};
const MAX_SIF_COUNT = 100;
const MAX_SIF_DURATION = 2000;

class LivekitError extends Error {
  constructor(code, message) {
    super(message || 'an error has occured');
    this.code = code;
  }
}
var ConnectionErrorReason;
(function (ConnectionErrorReason) {
  ConnectionErrorReason[ConnectionErrorReason["NotAllowed"] = 0] = "NotAllowed";
  ConnectionErrorReason[ConnectionErrorReason["ServerUnreachable"] = 1] = "ServerUnreachable";
  ConnectionErrorReason[ConnectionErrorReason["InternalError"] = 2] = "InternalError";
  ConnectionErrorReason[ConnectionErrorReason["Cancelled"] = 3] = "Cancelled";
  ConnectionErrorReason[ConnectionErrorReason["LeaveRequest"] = 4] = "LeaveRequest";
})(ConnectionErrorReason || (ConnectionErrorReason = {}));
var MediaDeviceFailure;
(function (MediaDeviceFailure) {
  // user rejected permissions
  MediaDeviceFailure["PermissionDenied"] = "PermissionDenied";
  // device is not available
  MediaDeviceFailure["NotFound"] = "NotFound";
  // device is in use. On Windows, only a single tab may get access to a device at a time.
  MediaDeviceFailure["DeviceInUse"] = "DeviceInUse";
  MediaDeviceFailure["Other"] = "Other";
})(MediaDeviceFailure || (MediaDeviceFailure = {}));
(function (MediaDeviceFailure) {
  function getFailure(error) {
    if (error && 'name' in error) {
      if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        return MediaDeviceFailure.NotFound;
      }
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        return MediaDeviceFailure.PermissionDenied;
      }
      if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        return MediaDeviceFailure.DeviceInUse;
      }
      return MediaDeviceFailure.Other;
    }
  }
  MediaDeviceFailure.getFailure = getFailure;
})(MediaDeviceFailure || (MediaDeviceFailure = {}));

var CryptorErrorReason;
(function (CryptorErrorReason) {
  CryptorErrorReason[CryptorErrorReason["InvalidKey"] = 0] = "InvalidKey";
  CryptorErrorReason[CryptorErrorReason["MissingKey"] = 1] = "MissingKey";
  CryptorErrorReason[CryptorErrorReason["InternalError"] = 2] = "InternalError";
})(CryptorErrorReason || (CryptorErrorReason = {}));
class CryptorError extends LivekitError {
  constructor(message) {
    let reason = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CryptorErrorReason.InternalError;
    let participantIdentity = arguments.length > 2 ? arguments[2] : undefined;
    super(40, message);
    this.reason = reason;
    this.participantIdentity = participantIdentity;
  }
}

var KeyProviderEvent;
(function (KeyProviderEvent) {
  KeyProviderEvent["SetKey"] = "setKey";
  KeyProviderEvent["RatchetRequest"] = "ratchetRequest";
  KeyProviderEvent["KeyRatcheted"] = "keyRatcheted";
})(KeyProviderEvent || (KeyProviderEvent = {}));
var KeyHandlerEvent;
(function (KeyHandlerEvent) {
  KeyHandlerEvent["KeyRatcheted"] = "keyRatcheted";
})(KeyHandlerEvent || (KeyHandlerEvent = {}));
var EncryptionEvent;
(function (EncryptionEvent) {
  EncryptionEvent["ParticipantEncryptionStatusChanged"] = "participantEncryptionStatusChanged";
  EncryptionEvent["EncryptionError"] = "encryptionError";
})(EncryptionEvent || (EncryptionEvent = {}));
var CryptorEvent;
(function (CryptorEvent) {
  CryptorEvent["Error"] = "cryptorError";
})(CryptorEvent || (CryptorEvent = {}));

function isVideoFrame(frame) {
  return 'type' in frame;
}
function importKey(keyBytes_1) {
  return __awaiter(this, arguments, void 0, function (keyBytes) {
    let algorithm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      name: ENCRYPTION_ALGORITHM
    };
    let usage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'encrypt';
    return function* () {
      // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
      return crypto.subtle.importKey('raw', keyBytes, algorithm, false, usage === 'derive' ? ['deriveBits', 'deriveKey'] : ['encrypt', 'decrypt']);
    }();
  });
}
function getAlgoOptions(algorithmName, salt) {
  const textEncoder = new TextEncoder();
  const encodedSalt = textEncoder.encode(salt);
  switch (algorithmName) {
    case 'HKDF':
      return {
        name: 'HKDF',
        salt: encodedSalt,
        hash: 'SHA-256',
        info: new ArrayBuffer(128)
      };
    case 'PBKDF2':
      {
        return {
          name: 'PBKDF2',
          salt: encodedSalt,
          hash: 'SHA-256',
          iterations: 100000
        };
      }
    default:
      throw new Error("algorithm ".concat(algorithmName, " is currently unsupported"));
  }
}
/**
 * Derives a set of keys from the master key.
 * See https://tools.ietf.org/html/draft-omara-sframe-00#section-4.3.1
 */
function deriveKeys(material, salt) {
  return __awaiter(this, void 0, void 0, function* () {
    const algorithmOptions = getAlgoOptions(material.algorithm.name, salt);
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#HKDF
    // https://developer.mozilla.org/en-US/docs/Web/API/HkdfParams
    const encryptionKey = yield crypto.subtle.deriveKey(algorithmOptions, material, {
      name: ENCRYPTION_ALGORITHM,
      length: 128
    }, false, ['encrypt', 'decrypt']);
    return {
      material,
      encryptionKey
    };
  });
}
/**
 * Ratchets a key. See
 * https://tools.ietf.org/html/draft-omara-sframe-00#section-4.3.5.1
 */
function ratchet(material, salt) {
  return __awaiter(this, void 0, void 0, function* () {
    const algorithmOptions = getAlgoOptions(material.algorithm.name, salt);
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits
    return crypto.subtle.deriveBits(algorithmOptions, material, 256);
  });
}
function needsRbspUnescaping(frameData) {
  for (var i = 0; i < frameData.length - 3; i++) {
    if (frameData[i] == 0 && frameData[i + 1] == 0 && frameData[i + 2] == 3) return true;
  }
  return false;
}
function parseRbsp(stream) {
  const dataOut = [];
  var length = stream.length;
  for (var i = 0; i < stream.length;) {
    // Be careful about over/underflow here. byte_length_ - 3 can underflow, and
    // i + 3 can overflow, but byte_length_ - i can't, because i < byte_length_
    // above, and that expression will produce the number of bytes left in
    // the stream including the byte at i.
    if (length - i >= 3 && !stream[i] && !stream[i + 1] && stream[i + 2] == 3) {
      // Two rbsp bytes.
      dataOut.push(stream[i++]);
      dataOut.push(stream[i++]);
      // Skip the emulation byte.
      i++;
    } else {
      // Single rbsp byte.
      dataOut.push(stream[i++]);
    }
  }
  return new Uint8Array(dataOut);
}
const kZerosInStartSequence = 2;
const kEmulationByte = 3;
function writeRbsp(data_in) {
  const dataOut = [];
  var numConsecutiveZeros = 0;
  for (var i = 0; i < data_in.length; ++i) {
    var byte = data_in[i];
    if (byte <= kEmulationByte && numConsecutiveZeros >= kZerosInStartSequence) {
      // Need to escape.
      dataOut.push(kEmulationByte);
      numConsecutiveZeros = 0;
    }
    dataOut.push(byte);
    if (byte == 0) {
      ++numConsecutiveZeros;
    } else {
      numConsecutiveZeros = 0;
    }
  }
  return new Uint8Array(dataOut);
}

class SifGuard {
  constructor() {
    this.consecutiveSifCount = 0;
    this.lastSifReceivedAt = 0;
    this.userFramesSinceSif = 0;
  }
  recordSif() {
    var _a;
    this.consecutiveSifCount += 1;
    (_a = this.sifSequenceStartedAt) !== null && _a !== void 0 ? _a : this.sifSequenceStartedAt = Date.now();
    this.lastSifReceivedAt = Date.now();
  }
  recordUserFrame() {
    if (this.sifSequenceStartedAt === undefined) {
      return;
    } else {
      this.userFramesSinceSif += 1;
    }
    if (
    // reset if we received more user frames than SIFs
    this.userFramesSinceSif > this.consecutiveSifCount ||
    // also reset if we got a new user frame and the latest SIF frame hasn't been updated in a while
    Date.now() - this.lastSifReceivedAt > MAX_SIF_DURATION) {
      this.reset();
    }
  }
  isSifAllowed() {
    return this.consecutiveSifCount < MAX_SIF_COUNT && (this.sifSequenceStartedAt === undefined || Date.now() - this.sifSequenceStartedAt < MAX_SIF_DURATION);
  }
  reset() {
    this.userFramesSinceSif = 0;
    this.consecutiveSifCount = 0;
    this.sifSequenceStartedAt = undefined;
  }
}

const encryptionEnabledMap = new Map();
class BaseFrameCryptor extends eventsExports.EventEmitter {
  encodeFunction(encodedFrame, controller) {
    throw Error('not implemented for subclass');
  }
  decodeFunction(encodedFrame, controller) {
    throw Error('not implemented for subclass');
  }
}
/**
 * Cryptor is responsible for en-/decrypting media frames.
 * Each Cryptor instance is responsible for en-/decrypting a single mediaStreamTrack.
 */
class FrameCryptor extends BaseFrameCryptor {
  constructor(opts) {
    var _a;
    super();
    this.sendCounts = new Map();
    this.keys = opts.keys;
    this.participantIdentity = opts.participantIdentity;
    this.rtpMap = new Map();
    this.keyProviderOptions = opts.keyProviderOptions;
    this.sifTrailer = (_a = opts.sifTrailer) !== null && _a !== void 0 ? _a : Uint8Array.from([]);
    this.sifGuard = new SifGuard();
  }
  get logContext() {
    return {
      participant: this.participantIdentity,
      mediaTrackId: this.trackId,
      fallbackCodec: this.videoCodec
    };
  }
  /**
   * Assign a different participant to the cryptor.
   * useful for transceiver re-use
   * @param id
   * @param keys
   */
  setParticipant(id, keys) {
    workerLogger.debug('setting new participant on cryptor', Object.assign(Object.assign({}, this.logContext), {
      participant: id
    }));
    if (this.participantIdentity) {
      workerLogger.error('cryptor has already a participant set, participant should have been unset before', Object.assign({}, this.logContext));
    }
    this.participantIdentity = id;
    this.keys = keys;
    this.sifGuard.reset();
  }
  unsetParticipant() {
    workerLogger.debug('unsetting participant', this.logContext);
    this.participantIdentity = undefined;
  }
  isEnabled() {
    if (this.participantIdentity) {
      return encryptionEnabledMap.get(this.participantIdentity);
    } else {
      return undefined;
    }
  }
  getParticipantIdentity() {
    return this.participantIdentity;
  }
  getTrackId() {
    return this.trackId;
  }
  /**
   * Update the video codec used by the mediaStreamTrack
   * @param codec
   */
  setVideoCodec(codec) {
    this.videoCodec = codec;
  }
  /**
   * rtp payload type map used for figuring out codec of payload type when encoding
   * @param map
   */
  setRtpMap(map) {
    this.rtpMap = map;
  }
  setupTransform(operation, readable, writable, trackId, codec) {
    if (codec) {
      workerLogger.info('setting codec on cryptor to', {
        codec
      });
      this.videoCodec = codec;
    }
    workerLogger.debug('Setting up frame cryptor transform', Object.assign({
      operation,
      passedTrackId: trackId,
      codec
    }, this.logContext));
    const transformFn = operation === 'encode' ? this.encodeFunction : this.decodeFunction;
    const transformStream = new TransformStream({
      transform: transformFn.bind(this)
    });
    readable.pipeThrough(transformStream).pipeTo(writable).catch(e => {
      workerLogger.warn(e);
      this.emit(CryptorEvent.Error, e instanceof CryptorError ? e : new CryptorError(e.message, undefined, this.participantIdentity));
    });
    this.trackId = trackId;
  }
  setSifTrailer(trailer) {
    workerLogger.debug('setting SIF trailer', Object.assign(Object.assign({}, this.logContext), {
      trailer
    }));
    this.sifTrailer = trailer;
  }
  /**
   * Function that will be injected in a stream and will encrypt the given encoded frames.
   *
   * @param {RTCEncodedVideoFrame|RTCEncodedAudioFrame} encodedFrame - Encoded video frame.
   * @param {TransformStreamDefaultController} controller - TransportStreamController.
   *
   * The VP8 payload descriptor described in
   * https://tools.ietf.org/html/rfc7741#section-4.2
   * is part of the RTP packet and not part of the frame and is not controllable by us.
   * This is fine as the SFU keeps having access to it for routing.
   *
   * The encrypted frame is formed as follows:
   * 1) Find unencrypted byte length, depending on the codec, frame type and kind.
   * 2) Form the GCM IV for the frame as described above.
   * 3) Encrypt the rest of the frame using AES-GCM.
   * 4) Allocate space for the encrypted frame.
   * 5) Copy the unencrypted bytes to the start of the encrypted frame.
   * 6) Append the ciphertext to the encrypted frame.
   * 7) Append the IV.
   * 8) Append a single byte for the key identifier.
   * 9) Enqueue the encrypted frame for sending.
   */
  encodeFunction(encodedFrame, controller) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      if (!this.isEnabled() ||
      // skip for encryption for empty dtx frames
      encodedFrame.data.byteLength === 0) {
        return controller.enqueue(encodedFrame);
      }
      const keySet = this.keys.getKeySet();
      if (!keySet) {
        this.emit(CryptorEvent.Error, new CryptorError("key set not found for ".concat(this.participantIdentity, " at index ").concat(this.keys.getCurrentKeyIndex()), CryptorErrorReason.MissingKey, this.participantIdentity));
        return;
      }
      const {
        encryptionKey
      } = keySet;
      const keyIndex = this.keys.getCurrentKeyIndex();
      if (encryptionKey) {
        const iv = this.makeIV((_a = encodedFrame.getMetadata().synchronizationSource) !== null && _a !== void 0 ? _a : -1, encodedFrame.timestamp);
        let frameInfo = this.getUnencryptedBytes(encodedFrame);
        // Thіs is not encrypted and contains the VP8 payload descriptor or the Opus TOC byte.
        const frameHeader = new Uint8Array(encodedFrame.data, 0, frameInfo.unencryptedBytes);
        // Frame trailer contains the R|IV_LENGTH and key index
        const frameTrailer = new Uint8Array(2);
        frameTrailer[0] = IV_LENGTH;
        frameTrailer[1] = keyIndex;
        // Construct frame trailer. Similar to the frame header described in
        // https://tools.ietf.org/html/draft-omara-sframe-00#section-4.2
        // but we put it at the end.
        //
        // ---------+-------------------------+-+---------+----
        // payload  |IV...(length = IV_LENGTH)|R|IV_LENGTH|KID |
        // ---------+-------------------------+-+---------+----
        try {
          const cipherText = yield crypto.subtle.encrypt({
            name: ENCRYPTION_ALGORITHM,
            iv,
            additionalData: new Uint8Array(encodedFrame.data, 0, frameHeader.byteLength)
          }, encryptionKey, new Uint8Array(encodedFrame.data, frameInfo.unencryptedBytes));
          let newDataWithoutHeader = new Uint8Array(cipherText.byteLength + iv.byteLength + frameTrailer.byteLength);
          newDataWithoutHeader.set(new Uint8Array(cipherText)); // add ciphertext.
          newDataWithoutHeader.set(new Uint8Array(iv), cipherText.byteLength); // append IV.
          newDataWithoutHeader.set(frameTrailer, cipherText.byteLength + iv.byteLength); // append frame trailer.
          if (frameInfo.isH264) {
            newDataWithoutHeader = writeRbsp(newDataWithoutHeader);
          }
          var newData = new Uint8Array(frameHeader.byteLength + newDataWithoutHeader.byteLength);
          newData.set(frameHeader);
          newData.set(newDataWithoutHeader, frameHeader.byteLength);
          encodedFrame.data = newData.buffer;
          return controller.enqueue(encodedFrame);
        } catch (e) {
          // TODO: surface this to the app.
          workerLogger.error(e);
        }
      } else {
        workerLogger.debug('failed to encrypt, emitting error', this.logContext);
        this.emit(CryptorEvent.Error, new CryptorError("encryption key missing for encoding", CryptorErrorReason.MissingKey, this.participantIdentity));
      }
    });
  }
  /**
   * Function that will be injected in a stream and will decrypt the given encoded frames.
   *
   * @param {RTCEncodedVideoFrame|RTCEncodedAudioFrame} encodedFrame - Encoded video frame.
   * @param {TransformStreamDefaultController} controller - TransportStreamController.
   */
  decodeFunction(encodedFrame, controller) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.isEnabled() ||
      // skip for decryption for empty dtx frames
      encodedFrame.data.byteLength === 0) {
        workerLogger.debug('skipping empty frame', this.logContext);
        this.sifGuard.recordUserFrame();
        return controller.enqueue(encodedFrame);
      }
      if (isFrameServerInjected(encodedFrame.data, this.sifTrailer)) {
        workerLogger.debug('enqueue SIF', this.logContext);
        this.sifGuard.recordSif();
        if (this.sifGuard.isSifAllowed()) {
          encodedFrame.data = encodedFrame.data.slice(0, encodedFrame.data.byteLength - this.sifTrailer.byteLength);
          return controller.enqueue(encodedFrame);
        } else {
          workerLogger.warn('SIF limit reached, dropping frame');
          return;
        }
      } else {
        this.sifGuard.recordUserFrame();
      }
      const data = new Uint8Array(encodedFrame.data);
      const keyIndex = data[encodedFrame.data.byteLength - 1];
      if (this.keys.hasInvalidKeyAtIndex(keyIndex)) {
        // drop frame
        return;
      }
      if (this.keys.getKeySet(keyIndex)) {
        try {
          const decodedFrame = yield this.decryptFrame(encodedFrame, keyIndex);
          this.keys.decryptionSuccess(keyIndex);
          if (decodedFrame) {
            return controller.enqueue(decodedFrame);
          }
        } catch (error) {
          if (error instanceof CryptorError && error.reason === CryptorErrorReason.InvalidKey) {
            // emit an error if the key handler thinks we have a valid key
            if (this.keys.hasValidKey) {
              this.emit(CryptorEvent.Error, error);
              this.keys.decryptionFailure(keyIndex);
            }
          } else {
            workerLogger.warn('decoding frame failed', {
              error
            });
          }
        }
      } else {
        // emit an error if the key index is out of bounds but the key handler thinks we still have a valid key
        workerLogger.warn("skipping decryption due to missing key at index ".concat(keyIndex));
        this.emit(CryptorEvent.Error, new CryptorError("missing key at index ".concat(keyIndex, " for participant ").concat(this.participantIdentity), CryptorErrorReason.MissingKey, this.participantIdentity));
        this.keys.decryptionFailure(keyIndex);
      }
    });
  }
  /**
   * Function that will decrypt the given encoded frame. If the decryption fails, it will
   * ratchet the key for up to RATCHET_WINDOW_SIZE times.
   */
  decryptFrame(encodedFrame_1, keyIndex_1) {
    return __awaiter(this, arguments, void 0, function (encodedFrame, keyIndex) {
      var _this = this;
      let initialMaterial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      let ratchetOpts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        ratchetCount: 0
      };
      return function* () {
        var _a;
        const keySet = _this.keys.getKeySet(keyIndex);
        if (!ratchetOpts.encryptionKey && !keySet) {
          throw new TypeError("no encryption key found for decryption of ".concat(_this.participantIdentity));
        }
        let frameInfo = _this.getUnencryptedBytes(encodedFrame);
        // Construct frame trailer. Similar to the frame header described in
        // https://tools.ietf.org/html/draft-omara-sframe-00#section-4.2
        // but we put it at the end.
        //
        // ---------+-------------------------+-+---------+----
        // payload  |IV...(length = IV_LENGTH)|R|IV_LENGTH|KID |
        // ---------+-------------------------+-+---------+----
        try {
          const frameHeader = new Uint8Array(encodedFrame.data, 0, frameInfo.unencryptedBytes);
          var encryptedData = new Uint8Array(encodedFrame.data, frameHeader.length, encodedFrame.data.byteLength - frameHeader.length);
          if (frameInfo.isH264 && needsRbspUnescaping(encryptedData)) {
            encryptedData = parseRbsp(encryptedData);
            const newUint8 = new Uint8Array(frameHeader.byteLength + encryptedData.byteLength);
            newUint8.set(frameHeader);
            newUint8.set(encryptedData, frameHeader.byteLength);
            encodedFrame.data = newUint8.buffer;
          }
          const frameTrailer = new Uint8Array(encodedFrame.data, encodedFrame.data.byteLength - 2, 2);
          const ivLength = frameTrailer[0];
          const iv = new Uint8Array(encodedFrame.data, encodedFrame.data.byteLength - ivLength - frameTrailer.byteLength, ivLength);
          const cipherTextStart = frameHeader.byteLength;
          const cipherTextLength = encodedFrame.data.byteLength - (frameHeader.byteLength + ivLength + frameTrailer.byteLength);
          const plainText = yield crypto.subtle.decrypt({
            name: ENCRYPTION_ALGORITHM,
            iv,
            additionalData: new Uint8Array(encodedFrame.data, 0, frameHeader.byteLength)
          }, (_a = ratchetOpts.encryptionKey) !== null && _a !== void 0 ? _a : keySet.encryptionKey, new Uint8Array(encodedFrame.data, cipherTextStart, cipherTextLength));
          const newData = new ArrayBuffer(frameHeader.byteLength + plainText.byteLength);
          const newUint8 = new Uint8Array(newData);
          newUint8.set(new Uint8Array(encodedFrame.data, 0, frameHeader.byteLength));
          newUint8.set(new Uint8Array(plainText), frameHeader.byteLength);
          encodedFrame.data = newData;
          return encodedFrame;
        } catch (error) {
          if (_this.keyProviderOptions.ratchetWindowSize > 0) {
            if (ratchetOpts.ratchetCount < _this.keyProviderOptions.ratchetWindowSize) {
              workerLogger.debug("ratcheting key attempt ".concat(ratchetOpts.ratchetCount, " of ").concat(_this.keyProviderOptions.ratchetWindowSize, ", for kind ").concat(encodedFrame instanceof RTCEncodedAudioFrame ? 'audio' : 'video'));
              let ratchetedKeySet;
              if ((initialMaterial !== null && initialMaterial !== void 0 ? initialMaterial : keySet) === _this.keys.getKeySet(keyIndex)) {
                // only ratchet if the currently set key is still the same as the one used to decrypt this frame
                // if not, it might be that a different frame has already ratcheted and we try with that one first
                const newMaterial = yield _this.keys.ratchetKey(keyIndex, false);
                ratchetedKeySet = yield deriveKeys(newMaterial, _this.keyProviderOptions.ratchetSalt);
              }
              const frame = yield _this.decryptFrame(encodedFrame, keyIndex, initialMaterial || keySet, {
                ratchetCount: ratchetOpts.ratchetCount + 1,
                encryptionKey: ratchetedKeySet === null || ratchetedKeySet === void 0 ? void 0 : ratchetedKeySet.encryptionKey
              });
              if (frame && ratchetedKeySet) {
                // before updating the keys, make sure that the keySet used for this frame is still the same as the currently set key
                // if it's not, a new key might have been set already, which we don't want to override
                if ((initialMaterial !== null && initialMaterial !== void 0 ? initialMaterial : keySet) === _this.keys.getKeySet(keyIndex)) {
                  _this.keys.setKeySet(ratchetedKeySet, keyIndex, true);
                  // decryption was successful, set the new key index to reflect the ratcheted key set
                  _this.keys.setCurrentKeyIndex(keyIndex);
                }
              }
              return frame;
            } else {
              /**
               * Because we only set a new key once decryption has been successful,
               * we can be sure that we don't need to reset the key to the initial material at this point
               * as the key has not been updated on the keyHandler instance
               */
              workerLogger.warn('maximum ratchet attempts exceeded');
              throw new CryptorError("valid key missing for participant ".concat(_this.participantIdentity), CryptorErrorReason.InvalidKey, _this.participantIdentity);
            }
          } else {
            throw new CryptorError("Decryption failed: ".concat(error.message), CryptorErrorReason.InvalidKey, _this.participantIdentity);
          }
        }
      }();
    });
  }
  /**
   * Construct the IV used for AES-GCM and sent (in plain) with the packet similar to
   * https://tools.ietf.org/html/rfc7714#section-8.1
   * It concatenates
   * - the 32 bit synchronization source (SSRC) given on the encoded frame,
   * - the 32 bit rtp timestamp given on the encoded frame,
   * - a send counter that is specific to the SSRC. Starts at a random number.
   * The send counter is essentially the pictureId but we currently have to implement this ourselves.
   * There is no XOR with a salt. Note that this IV leaks the SSRC to the receiver but since this is
   * randomly generated and SFUs may not rewrite this is considered acceptable.
   * The SSRC is used to allow demultiplexing multiple streams with the same key, as described in
   *   https://tools.ietf.org/html/rfc3711#section-4.1.1
   * The RTP timestamp is 32 bits and advances by the codec clock rate (90khz for video, 48khz for
   * opus audio) every second. For video it rolls over roughly every 13 hours.
   * The send counter will advance at the frame rate (30fps for video, 50fps for 20ms opus audio)
   * every second. It will take a long time to roll over.
   *
   * See also https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
   */
  makeIV(synchronizationSource, timestamp) {
    var _a;
    const iv = new ArrayBuffer(IV_LENGTH);
    const ivView = new DataView(iv);
    // having to keep our own send count (similar to a picture id) is not ideal.
    if (!this.sendCounts.has(synchronizationSource)) {
      // Initialize with a random offset, similar to the RTP sequence number.
      this.sendCounts.set(synchronizationSource, Math.floor(Math.random() * 0xffff));
    }
    const sendCount = (_a = this.sendCounts.get(synchronizationSource)) !== null && _a !== void 0 ? _a : 0;
    ivView.setUint32(0, synchronizationSource);
    ivView.setUint32(4, timestamp);
    ivView.setUint32(8, timestamp - sendCount % 0xffff);
    this.sendCounts.set(synchronizationSource, sendCount + 1);
    return iv;
  }
  getUnencryptedBytes(frame) {
    var _a;
    var frameInfo = {
      unencryptedBytes: 0,
      isH264: false
    };
    if (isVideoFrame(frame)) {
      let detectedCodec = (_a = this.getVideoCodec(frame)) !== null && _a !== void 0 ? _a : this.videoCodec;
      if (detectedCodec !== this.detectedCodec) {
        workerLogger.debug('detected different codec', Object.assign({
          detectedCodec,
          oldCodec: this.detectedCodec
        }, this.logContext));
        this.detectedCodec = detectedCodec;
      }
      if (detectedCodec === 'av1') {
        throw new Error("".concat(detectedCodec, " is not yet supported for end to end encryption"));
      }
      if (detectedCodec === 'vp8') {
        frameInfo.unencryptedBytes = UNENCRYPTED_BYTES[frame.type];
      } else if (detectedCodec === 'vp9') {
        frameInfo.unencryptedBytes = 0;
        return frameInfo;
      }
      const data = new Uint8Array(frame.data);
      try {
        const naluIndices = findNALUIndices(data);
        // if the detected codec is undefined we test whether it _looks_ like a h264 frame as a best guess
        frameInfo.isH264 = detectedCodec === 'h264' || naluIndices.some(naluIndex => [NALUType.SLICE_IDR, NALUType.SLICE_NON_IDR].includes(parseNALUType(data[naluIndex])));
        if (frameInfo.isH264) {
          for (const index of naluIndices) {
            let type = parseNALUType(data[index]);
            switch (type) {
              case NALUType.SLICE_IDR:
              case NALUType.SLICE_NON_IDR:
                frameInfo.unencryptedBytes = index + 2;
                return frameInfo;
              default:
                break;
            }
          }
          throw new TypeError('Could not find NALU');
        }
      } catch (e) {
        // no op, we just continue and fallback to vp8
      }
      frameInfo.unencryptedBytes = UNENCRYPTED_BYTES[frame.type];
      return frameInfo;
    } else {
      frameInfo.unencryptedBytes = UNENCRYPTED_BYTES.audio;
      return frameInfo;
    }
  }
  /**
   * inspects frame payloadtype if available and maps it to the codec specified in rtpMap
   */
  getVideoCodec(frame) {
    if (this.rtpMap.size === 0) {
      return undefined;
    }
    const payloadType = frame.getMetadata().payloadType;
    const codec = payloadType ? this.rtpMap.get(payloadType) : undefined;
    return codec;
  }
}
/**
 * Slice the NALUs present in the supplied buffer, assuming it is already byte-aligned
 * code adapted from https://github.com/medooze/h264-frame-parser/blob/main/lib/NalUnits.ts to return indices only
 */
function findNALUIndices(stream) {
  const result = [];
  let start = 0,
    pos = 0,
    searchLength = stream.length - 2;
  while (pos < searchLength) {
    // skip until end of current NALU
    while (pos < searchLength && !(stream[pos] === 0 && stream[pos + 1] === 0 && stream[pos + 2] === 1)) pos++;
    if (pos >= searchLength) pos = stream.length;
    // remove trailing zeros from current NALU
    let end = pos;
    while (end > start && stream[end - 1] === 0) end--;
    // save current NALU
    if (start === 0) {
      if (end !== start) throw TypeError('byte stream contains leading data');
    } else {
      result.push(start);
    }
    // begin new NALU
    start = pos = pos + 3;
  }
  return result;
}
function parseNALUType(startByte) {
  return startByte & kNaluTypeMask;
}
const kNaluTypeMask = 0x1f;
var NALUType;
(function (NALUType) {
  /** Coded slice of a non-IDR picture */
  NALUType[NALUType["SLICE_NON_IDR"] = 1] = "SLICE_NON_IDR";
  /** Coded slice data partition A */
  NALUType[NALUType["SLICE_PARTITION_A"] = 2] = "SLICE_PARTITION_A";
  /** Coded slice data partition B */
  NALUType[NALUType["SLICE_PARTITION_B"] = 3] = "SLICE_PARTITION_B";
  /** Coded slice data partition C */
  NALUType[NALUType["SLICE_PARTITION_C"] = 4] = "SLICE_PARTITION_C";
  /** Coded slice of an IDR picture */
  NALUType[NALUType["SLICE_IDR"] = 5] = "SLICE_IDR";
  /** Supplemental enhancement information */
  NALUType[NALUType["SEI"] = 6] = "SEI";
  /** Sequence parameter set */
  NALUType[NALUType["SPS"] = 7] = "SPS";
  /** Picture parameter set */
  NALUType[NALUType["PPS"] = 8] = "PPS";
  /** Access unit delimiter */
  NALUType[NALUType["AUD"] = 9] = "AUD";
  /** End of sequence */
  NALUType[NALUType["END_SEQ"] = 10] = "END_SEQ";
  /** End of stream */
  NALUType[NALUType["END_STREAM"] = 11] = "END_STREAM";
  /** Filler data */
  NALUType[NALUType["FILLER_DATA"] = 12] = "FILLER_DATA";
  /** Sequence parameter set extension */
  NALUType[NALUType["SPS_EXT"] = 13] = "SPS_EXT";
  /** Prefix NAL unit */
  NALUType[NALUType["PREFIX_NALU"] = 14] = "PREFIX_NALU";
  /** Subset sequence parameter set */
  NALUType[NALUType["SUBSET_SPS"] = 15] = "SUBSET_SPS";
  /** Depth parameter set */
  NALUType[NALUType["DPS"] = 16] = "DPS";
  // 17, 18 reserved
  /** Coded slice of an auxiliary coded picture without partitioning */
  NALUType[NALUType["SLICE_AUX"] = 19] = "SLICE_AUX";
  /** Coded slice extension */
  NALUType[NALUType["SLICE_EXT"] = 20] = "SLICE_EXT";
  /** Coded slice extension for a depth view component or a 3D-AVC texture view component */
  NALUType[NALUType["SLICE_LAYER_EXT"] = 21] = "SLICE_LAYER_EXT";
  // 22, 23 reserved
})(NALUType || (NALUType = {}));
/**
 * we use a magic frame trailer to detect whether a frame is injected
 * by the livekit server and thus to be treated as unencrypted
 * @internal
 */
function isFrameServerInjected(frameData, trailerBytes) {
  if (trailerBytes.byteLength === 0) {
    return false;
  }
  const frameTrailer = new Uint8Array(frameData.slice(frameData.byteLength - trailerBytes.byteLength));
  return trailerBytes.every((value, index) => value === frameTrailer[index]);
}

// TODO ParticipantKeyHandlers currently don't get destroyed on participant disconnect
// we could do this by having a separate worker message on participant disconnected.
/**
 * ParticipantKeyHandler is responsible for providing a cryptor instance with the
 * en-/decryption key of a participant. It assumes that all tracks of a specific participant
 * are encrypted with the same key.
 * Additionally it exposes a method to ratchet a key which can be used by the cryptor either automatically
 * if decryption fails or can be triggered manually on both sender and receiver side.
 *
 */
class ParticipantKeyHandler extends eventsExports.EventEmitter {
  /**
   * true if the current key has not been marked as invalid
   */
  get hasValidKey() {
    return !this.hasInvalidKeyAtIndex(this.currentKeyIndex);
  }
  constructor(participantIdentity, keyProviderOptions) {
    super();
    this.currentKeyIndex = 0;
    if (keyProviderOptions.keyringSize < 1 || keyProviderOptions.keyringSize > 256) {
      throw new TypeError('Keyring size needs to be between 1 and 256');
    }
    this.cryptoKeyRing = new Array(keyProviderOptions.keyringSize).fill(undefined);
    this.decryptionFailureCounts = new Array(keyProviderOptions.keyringSize).fill(0);
    this.keyProviderOptions = keyProviderOptions;
    this.ratchetPromiseMap = new Map();
    this.participantIdentity = participantIdentity;
  }
  /**
   * Returns true if the key at the given index is marked as invalid.
   *
   * @param keyIndex the index of the key
   */
  hasInvalidKeyAtIndex(keyIndex) {
    return this.keyProviderOptions.failureTolerance >= 0 && this.decryptionFailureCounts[keyIndex] > this.keyProviderOptions.failureTolerance;
  }
  /**
   * Informs the key handler that a decryption failure occurred for an encryption key.
   * @internal
   * @param keyIndex the key index for which the failure occurred. Defaults to the current key index.
   */
  decryptionFailure() {
    let keyIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentKeyIndex;
    if (this.keyProviderOptions.failureTolerance < 0) {
      return;
    }
    this.decryptionFailureCounts[keyIndex] += 1;
    if (this.decryptionFailureCounts[keyIndex] > this.keyProviderOptions.failureTolerance) {
      workerLogger.warn("key for ".concat(this.participantIdentity, " at index ").concat(keyIndex, " is being marked as invalid"));
    }
  }
  /**
   * Informs the key handler that a frame was successfully decrypted using an encryption key.
   * @internal
   * @param keyIndex the key index for which the success occurred. Defaults to the current key index.
   */
  decryptionSuccess() {
    let keyIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentKeyIndex;
    this.resetKeyStatus(keyIndex);
  }
  /**
   * Call this after user initiated ratchet or a new key has been set in order to make sure to mark potentially
   * invalid keys as valid again
   *
   * @param keyIndex the index of the key. Defaults to the current key index.
   */
  resetKeyStatus(keyIndex) {
    if (keyIndex === undefined) {
      this.decryptionFailureCounts.fill(0);
    } else {
      this.decryptionFailureCounts[keyIndex] = 0;
    }
  }
  /**
   * Ratchets the current key (or the one at keyIndex if provided) and
   * returns the ratcheted material
   * if `setKey` is true (default), it will also set the ratcheted key directly on the crypto key ring
   * @param keyIndex
   * @param setKey
   */
  ratchetKey(keyIndex) {
    let setKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const currentKeyIndex = keyIndex !== null && keyIndex !== void 0 ? keyIndex : this.getCurrentKeyIndex();
    const existingPromise = this.ratchetPromiseMap.get(currentKeyIndex);
    if (typeof existingPromise !== 'undefined') {
      return existingPromise;
    }
    const ratchetPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      try {
        const keySet = this.getKeySet(currentKeyIndex);
        if (!keySet) {
          throw new TypeError("Cannot ratchet key without a valid keyset of participant ".concat(this.participantIdentity));
        }
        const currentMaterial = keySet.material;
        const newMaterial = yield importKey(yield ratchet(currentMaterial, this.keyProviderOptions.ratchetSalt), currentMaterial.algorithm.name, 'derive');
        if (setKey) {
          yield this.setKeyFromMaterial(newMaterial, currentKeyIndex, true);
          this.emit(KeyHandlerEvent.KeyRatcheted, newMaterial, this.participantIdentity, currentKeyIndex);
        }
        resolve(newMaterial);
      } catch (e) {
        reject(e);
      } finally {
        this.ratchetPromiseMap.delete(currentKeyIndex);
      }
    }));
    this.ratchetPromiseMap.set(currentKeyIndex, ratchetPromise);
    return ratchetPromise;
  }
  /**
   * takes in a key material with `deriveBits` and `deriveKey` set as key usages
   * and derives encryption keys from the material and sets it on the key ring buffer
   * together with the material
   * also resets the valid key property and updates the currentKeyIndex
   */
  setKey(material_1) {
    return __awaiter(this, arguments, void 0, function (material) {
      var _this = this;
      let keyIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return function* () {
        yield _this.setKeyFromMaterial(material, keyIndex);
        _this.resetKeyStatus(keyIndex);
      }();
    });
  }
  /**
   * takes in a key material with `deriveBits` and `deriveKey` set as key usages
   * and derives encryption keys from the material and sets it on the key ring buffers
   * together with the material
   * also updates the currentKeyIndex
   */
  setKeyFromMaterial(material_1, keyIndex_1) {
    return __awaiter(this, arguments, void 0, function (material, keyIndex) {
      var _this2 = this;
      let emitRatchetEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return function* () {
        const keySet = yield deriveKeys(material, _this2.keyProviderOptions.ratchetSalt);
        const newIndex = keyIndex >= 0 ? keyIndex % _this2.cryptoKeyRing.length : _this2.currentKeyIndex;
        workerLogger.debug("setting new key with index ".concat(keyIndex), {
          usage: material.usages,
          algorithm: material.algorithm,
          ratchetSalt: _this2.keyProviderOptions.ratchetSalt
        });
        _this2.setKeySet(keySet, newIndex, emitRatchetEvent);
        if (newIndex >= 0) _this2.currentKeyIndex = newIndex;
      }();
    });
  }
  setKeySet(keySet, keyIndex) {
    let emitRatchetEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    this.cryptoKeyRing[keyIndex % this.cryptoKeyRing.length] = keySet;
    if (emitRatchetEvent) {
      this.emit(KeyHandlerEvent.KeyRatcheted, keySet.material, this.participantIdentity, keyIndex);
    }
  }
  setCurrentKeyIndex(index) {
    return __awaiter(this, void 0, void 0, function* () {
      this.currentKeyIndex = index % this.cryptoKeyRing.length;
      this.resetKeyStatus(index);
    });
  }
  getCurrentKeyIndex() {
    return this.currentKeyIndex;
  }
  /**
   * returns currently used KeySet or the one at `keyIndex` if provided
   * @param keyIndex
   * @returns
   */
  getKeySet(keyIndex) {
    return this.cryptoKeyRing[keyIndex !== null && keyIndex !== void 0 ? keyIndex : this.currentKeyIndex];
  }
}

const participantCryptors = [];
const participantKeys = new Map();
let sharedKeyHandler;
let messageQueue = new AsyncQueue();
let isEncryptionEnabled = false;
let useSharedKey = false;
let sifTrailer;
let keyProviderOptions = KEY_PROVIDER_DEFAULTS;
let rtpMap = new Map();
workerLogger.setDefaultLevel('info');
onmessage = ev => {
  messageQueue.run(() => __awaiter(void 0, void 0, void 0, function* () {
    const {
      kind,
      data
    } = ev.data;
    switch (kind) {
      case 'init':
        workerLogger.setLevel(data.loglevel);
        workerLogger.info('worker initialized');
        keyProviderOptions = data.keyProviderOptions;
        useSharedKey = !!data.keyProviderOptions.sharedKey;
        // acknowledge init successful
        const ackMsg = {
          kind: 'initAck',
          data: {
            enabled: isEncryptionEnabled
          }
        };
        postMessage(ackMsg);
        break;
      case 'enable':
        setEncryptionEnabled(data.enabled, data.participantIdentity);
        workerLogger.info("updated e2ee enabled status for ".concat(data.participantIdentity, " to ").concat(data.enabled));
        // acknowledge enable call successful
        postMessage(ev.data);
        break;
      case 'decode':
        let cryptor = getTrackCryptor(data.participantIdentity, data.trackId);
        cryptor.setupTransform(kind, data.readableStream, data.writableStream, data.trackId, data.codec);
        break;
      case 'encode':
        let pubCryptor = getTrackCryptor(data.participantIdentity, data.trackId);
        pubCryptor.setupTransform(kind, data.readableStream, data.writableStream, data.trackId, data.codec);
        break;
      case 'setKey':
        if (useSharedKey) {
          yield setSharedKey(data.key, data.keyIndex);
        } else if (data.participantIdentity) {
          workerLogger.info("set participant sender key ".concat(data.participantIdentity, " index ").concat(data.keyIndex));
          yield getParticipantKeyHandler(data.participantIdentity).setKey(data.key, data.keyIndex);
        } else {
          workerLogger.error('no participant Id was provided and shared key usage is disabled');
        }
        break;
      case 'removeTransform':
        unsetCryptorParticipant(data.trackId, data.participantIdentity);
        break;
      case 'updateCodec':
        getTrackCryptor(data.participantIdentity, data.trackId).setVideoCodec(data.codec);
        break;
      case 'setRTPMap':
        // this is only used for the local participant
        rtpMap = data.map;
        participantCryptors.forEach(cr => {
          if (cr.getParticipantIdentity() === data.participantIdentity) {
            cr.setRtpMap(data.map);
          }
        });
        break;
      case 'ratchetRequest':
        handleRatchetRequest(data);
        break;
      case 'setSifTrailer':
        handleSifTrailer(data.trailer);
        break;
    }
  }));
};
function handleRatchetRequest(data) {
  return __awaiter(this, void 0, void 0, function* () {
    if (useSharedKey) {
      const keyHandler = getSharedKeyHandler();
      yield keyHandler.ratchetKey(data.keyIndex);
      keyHandler.resetKeyStatus();
    } else if (data.participantIdentity) {
      const keyHandler = getParticipantKeyHandler(data.participantIdentity);
      yield keyHandler.ratchetKey(data.keyIndex);
      keyHandler.resetKeyStatus();
    } else {
      workerLogger.error('no participant Id was provided for ratchet request and shared key usage is disabled');
    }
  });
}
function getTrackCryptor(participantIdentity, trackId) {
  let cryptors = participantCryptors.filter(c => c.getTrackId() === trackId);
  if (cryptors.length > 1) {
    const debugInfo = cryptors.map(c => {
      return {
        participant: c.getParticipantIdentity()
      };
    }).join(',');
    workerLogger.error("Found multiple cryptors for the same trackID ".concat(trackId, ". target participant: ").concat(participantIdentity, " "), {
      participants: debugInfo
    });
  }
  let cryptor = cryptors[0];
  if (!cryptor) {
    workerLogger.info('creating new cryptor for', {
      participantIdentity
    });
    if (!keyProviderOptions) {
      throw Error('Missing keyProvider options');
    }
    cryptor = new FrameCryptor({
      participantIdentity,
      keys: getParticipantKeyHandler(participantIdentity),
      keyProviderOptions,
      sifTrailer
    });
    cryptor.setRtpMap(rtpMap);
    setupCryptorErrorEvents(cryptor);
    participantCryptors.push(cryptor);
  } else if (participantIdentity !== cryptor.getParticipantIdentity()) {
    // assign new participant id to track cryptor and pass in correct key handler
    cryptor.setParticipant(participantIdentity, getParticipantKeyHandler(participantIdentity));
  }
  return cryptor;
}
function getParticipantKeyHandler(participantIdentity) {
  if (useSharedKey) {
    return getSharedKeyHandler();
  }
  let keys = participantKeys.get(participantIdentity);
  if (!keys) {
    keys = new ParticipantKeyHandler(participantIdentity, keyProviderOptions);
    keys.on(KeyHandlerEvent.KeyRatcheted, emitRatchetedKeys);
    participantKeys.set(participantIdentity, keys);
  }
  return keys;
}
function getSharedKeyHandler() {
  if (!sharedKeyHandler) {
    workerLogger.debug('creating new shared key handler');
    sharedKeyHandler = new ParticipantKeyHandler('shared-key', keyProviderOptions);
  }
  return sharedKeyHandler;
}
function unsetCryptorParticipant(trackId, participantIdentity) {
  const cryptors = participantCryptors.filter(c => c.getParticipantIdentity() === participantIdentity && c.getTrackId() === trackId);
  if (cryptors.length > 1) {
    workerLogger.error('Found multiple cryptors for the same participant and trackID combination', {
      trackId,
      participantIdentity
    });
  }
  const cryptor = cryptors[0];
  if (!cryptor) {
    workerLogger.warn('Could not unset participant on cryptor', {
      trackId,
      participantIdentity
    });
  } else {
    cryptor.unsetParticipant();
  }
}
function setEncryptionEnabled(enable, participantIdentity) {
  workerLogger.debug("setting encryption enabled for all tracks of ".concat(participantIdentity), {
    enable
  });
  encryptionEnabledMap.set(participantIdentity, enable);
}
function setSharedKey(key, index) {
  return __awaiter(this, void 0, void 0, function* () {
    workerLogger.info('set shared key', {
      index
    });
    yield getSharedKeyHandler().setKey(key, index);
  });
}
function setupCryptorErrorEvents(cryptor) {
  cryptor.on(CryptorEvent.Error, error => {
    const msg = {
      kind: 'error',
      data: {
        error: new Error("".concat(CryptorErrorReason[error.reason], ": ").concat(error.message))
      }
    };
    postMessage(msg);
  });
}
function emitRatchetedKeys(material, participantIdentity, keyIndex) {
  const msg = {
    kind: "ratchetKey",
    data: {
      participantIdentity,
      keyIndex,
      material
    }
  };
  postMessage(msg);
}
function handleSifTrailer(trailer) {
  sifTrailer = trailer;
  participantCryptors.forEach(c => {
    c.setSifTrailer(trailer);
  });
}
// Operations using RTCRtpScriptTransform.
// @ts-ignore
if (self.RTCTransformEvent) {
  workerLogger.debug('setup transform event');
  // @ts-ignore
  self.onrtctransform = event => {
    // @ts-ignore .transformer property is part of RTCTransformEvent
    const transformer = event.transformer;
    workerLogger.debug('transformer', transformer);
    // @ts-ignore monkey patching non standard flag
    transformer.handled = true;
    const {
      kind,
      participantIdentity,
      trackId,
      codec
    } = transformer.options;
    const cryptor = getTrackCryptor(participantIdentity, trackId);
    workerLogger.debug('transform', {
      codec
    });
    cryptor.setupTransform(kind, transformer.readable, transformer.writable, trackId, codec);
  };
}
//# sourceMappingURL=livekit-client.e2ee.worker.mjs.map
