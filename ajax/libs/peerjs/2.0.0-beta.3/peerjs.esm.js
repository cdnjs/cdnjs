var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/peerjs-js-binarypack/lib/bufferbuilder.js
var require_bufferbuilder = __commonJS({
  "node_modules/peerjs-js-binarypack/lib/bufferbuilder.js"(exports, module) {
    var binaryFeatures = {};
    binaryFeatures.useBlobBuilder = function() {
      try {
        new Blob([]);
        return false;
      } catch (e) {
        return true;
      }
    }();
    binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && function() {
      try {
        return new Blob([new Uint8Array([])]).size === 0;
      } catch (e) {
        return true;
      }
    }();
    module.exports.binaryFeatures = binaryFeatures;
    var BlobBuilder = module.exports.BlobBuilder;
    if (typeof window !== "undefined") {
      BlobBuilder = module.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
    }
    function BufferBuilder() {
      this._pieces = [];
      this._parts = [];
    }
    BufferBuilder.prototype.append = function(data) {
      if (typeof data === "number") {
        this._pieces.push(data);
      } else {
        this.flush();
        this._parts.push(data);
      }
    };
    BufferBuilder.prototype.flush = function() {
      if (this._pieces.length > 0) {
        var buf = new Uint8Array(this._pieces);
        if (!binaryFeatures.useArrayBufferView) {
          buf = buf.buffer;
        }
        this._parts.push(buf);
        this._pieces = [];
      }
    };
    BufferBuilder.prototype.getBuffer = function() {
      this.flush();
      if (binaryFeatures.useBlobBuilder) {
        var builder = new BlobBuilder();
        for (var i = 0, ii = this._parts.length; i < ii; i++) {
          builder.append(this._parts[i]);
        }
        return builder.getBlob();
      } else {
        return new Blob(this._parts);
      }
    };
    module.exports.BufferBuilder = BufferBuilder;
  }
});

// node_modules/peerjs-js-binarypack/lib/binarypack.js
var require_binarypack = __commonJS({
  "node_modules/peerjs-js-binarypack/lib/binarypack.js"(exports, module) {
    var BufferBuilder = require_bufferbuilder().BufferBuilder;
    var binaryFeatures = require_bufferbuilder().binaryFeatures;
    var BinaryPack2 = {
      unpack: function(data) {
        var unpacker = new Unpacker(data);
        return unpacker.unpack();
      },
      pack: function(data) {
        var packer = new Packer();
        packer.pack(data);
        var buffer = packer.getBuffer();
        return buffer;
      }
    };
    module.exports = BinaryPack2;
    function Unpacker(data) {
      this.index = 0;
      this.dataBuffer = data;
      this.dataView = new Uint8Array(this.dataBuffer);
      this.length = this.dataBuffer.byteLength;
    }
    Unpacker.prototype.unpack = function() {
      var type = this.unpack_uint8();
      if (type < 128) {
        return type;
      } else if ((type ^ 224) < 32) {
        return (type ^ 224) - 32;
      }
      var size;
      if ((size = type ^ 160) <= 15) {
        return this.unpack_raw(size);
      } else if ((size = type ^ 176) <= 15) {
        return this.unpack_string(size);
      } else if ((size = type ^ 144) <= 15) {
        return this.unpack_array(size);
      } else if ((size = type ^ 128) <= 15) {
        return this.unpack_map(size);
      }
      switch (type) {
        case 192:
          return null;
        case 193:
          return void 0;
        case 194:
          return false;
        case 195:
          return true;
        case 202:
          return this.unpack_float();
        case 203:
          return this.unpack_double();
        case 204:
          return this.unpack_uint8();
        case 205:
          return this.unpack_uint16();
        case 206:
          return this.unpack_uint32();
        case 207:
          return this.unpack_uint64();
        case 208:
          return this.unpack_int8();
        case 209:
          return this.unpack_int16();
        case 210:
          return this.unpack_int32();
        case 211:
          return this.unpack_int64();
        case 212:
          return void 0;
        case 213:
          return void 0;
        case 214:
          return void 0;
        case 215:
          return void 0;
        case 216:
          size = this.unpack_uint16();
          return this.unpack_string(size);
        case 217:
          size = this.unpack_uint32();
          return this.unpack_string(size);
        case 218:
          size = this.unpack_uint16();
          return this.unpack_raw(size);
        case 219:
          size = this.unpack_uint32();
          return this.unpack_raw(size);
        case 220:
          size = this.unpack_uint16();
          return this.unpack_array(size);
        case 221:
          size = this.unpack_uint32();
          return this.unpack_array(size);
        case 222:
          size = this.unpack_uint16();
          return this.unpack_map(size);
        case 223:
          size = this.unpack_uint32();
          return this.unpack_map(size);
      }
    };
    Unpacker.prototype.unpack_uint8 = function() {
      var byte = this.dataView[this.index] & 255;
      this.index++;
      return byte;
    };
    Unpacker.prototype.unpack_uint16 = function() {
      var bytes = this.read(2);
      var uint16 = (bytes[0] & 255) * 256 + (bytes[1] & 255);
      this.index += 2;
      return uint16;
    };
    Unpacker.prototype.unpack_uint32 = function() {
      var bytes = this.read(4);
      var uint32 = ((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3];
      this.index += 4;
      return uint32;
    };
    Unpacker.prototype.unpack_uint64 = function() {
      var bytes = this.read(8);
      var uint64 = ((((((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3]) * 256 + bytes[4]) * 256 + bytes[5]) * 256 + bytes[6]) * 256 + bytes[7];
      this.index += 8;
      return uint64;
    };
    Unpacker.prototype.unpack_int8 = function() {
      var uint8 = this.unpack_uint8();
      return uint8 < 128 ? uint8 : uint8 - (1 << 8);
    };
    Unpacker.prototype.unpack_int16 = function() {
      var uint16 = this.unpack_uint16();
      return uint16 < 32768 ? uint16 : uint16 - (1 << 16);
    };
    Unpacker.prototype.unpack_int32 = function() {
      var uint32 = this.unpack_uint32();
      return uint32 < Math.pow(2, 31) ? uint32 : uint32 - Math.pow(2, 32);
    };
    Unpacker.prototype.unpack_int64 = function() {
      var uint64 = this.unpack_uint64();
      return uint64 < Math.pow(2, 63) ? uint64 : uint64 - Math.pow(2, 64);
    };
    Unpacker.prototype.unpack_raw = function(size) {
      if (this.length < this.index + size) {
        throw new Error("BinaryPackFailure: index is out of range " + this.index + " " + size + " " + this.length);
      }
      var buf = this.dataBuffer.slice(this.index, this.index + size);
      this.index += size;
      return buf;
    };
    Unpacker.prototype.unpack_string = function(size) {
      var bytes = this.read(size);
      var i = 0;
      var str = "";
      var c;
      var code;
      while (i < size) {
        c = bytes[i];
        if (c < 128) {
          str += String.fromCharCode(c);
          i++;
        } else if ((c ^ 192) < 32) {
          code = (c ^ 192) << 6 | bytes[i + 1] & 63;
          str += String.fromCharCode(code);
          i += 2;
        } else {
          code = (c & 15) << 12 | (bytes[i + 1] & 63) << 6 | bytes[i + 2] & 63;
          str += String.fromCharCode(code);
          i += 3;
        }
      }
      this.index += size;
      return str;
    };
    Unpacker.prototype.unpack_array = function(size) {
      var objects = new Array(size);
      for (var i = 0; i < size; i++) {
        objects[i] = this.unpack();
      }
      return objects;
    };
    Unpacker.prototype.unpack_map = function(size) {
      var map = {};
      for (var i = 0; i < size; i++) {
        var key = this.unpack();
        var value = this.unpack();
        map[key] = value;
      }
      return map;
    };
    Unpacker.prototype.unpack_float = function() {
      var uint32 = this.unpack_uint32();
      var sign = uint32 >> 31;
      var exp = (uint32 >> 23 & 255) - 127;
      var fraction = uint32 & 8388607 | 8388608;
      return (sign === 0 ? 1 : -1) * fraction * Math.pow(2, exp - 23);
    };
    Unpacker.prototype.unpack_double = function() {
      var h32 = this.unpack_uint32();
      var l32 = this.unpack_uint32();
      var sign = h32 >> 31;
      var exp = (h32 >> 20 & 2047) - 1023;
      var hfrac = h32 & 1048575 | 1048576;
      var frac = hfrac * Math.pow(2, exp - 20) + l32 * Math.pow(2, exp - 52);
      return (sign === 0 ? 1 : -1) * frac;
    };
    Unpacker.prototype.read = function(length) {
      var j = this.index;
      if (j + length <= this.length) {
        return this.dataView.subarray(j, j + length);
      } else {
        throw new Error("BinaryPackFailure: read index out of range");
      }
    };
    function Packer() {
      this.bufferBuilder = new BufferBuilder();
    }
    Packer.prototype.getBuffer = function() {
      return this.bufferBuilder.getBuffer();
    };
    Packer.prototype.pack = function(value) {
      var type = typeof value;
      if (type === "string") {
        this.pack_string(value);
      } else if (type === "number") {
        if (Math.floor(value) === value) {
          this.pack_integer(value);
        } else {
          this.pack_double(value);
        }
      } else if (type === "boolean") {
        if (value === true) {
          this.bufferBuilder.append(195);
        } else if (value === false) {
          this.bufferBuilder.append(194);
        }
      } else if (type === "undefined") {
        this.bufferBuilder.append(192);
      } else if (type === "object") {
        if (value === null) {
          this.bufferBuilder.append(192);
        } else {
          var constructor = value.constructor;
          if (constructor == Array) {
            this.pack_array(value);
          } else if (constructor == Blob || constructor == File || value instanceof Blob || value instanceof File) {
            this.pack_bin(value);
          } else if (constructor == ArrayBuffer) {
            if (binaryFeatures.useArrayBufferView) {
              this.pack_bin(new Uint8Array(value));
            } else {
              this.pack_bin(value);
            }
          } else if ("BYTES_PER_ELEMENT" in value) {
            if (binaryFeatures.useArrayBufferView) {
              this.pack_bin(new Uint8Array(value.buffer));
            } else {
              this.pack_bin(value.buffer);
            }
          } else if (constructor == Object || constructor.toString().startsWith("class")) {
            this.pack_object(value);
          } else if (constructor == Date) {
            this.pack_string(value.toString());
          } else if (typeof value.toBinaryPack === "function") {
            this.bufferBuilder.append(value.toBinaryPack());
          } else {
            throw new Error('Type "' + constructor.toString() + '" not yet supported');
          }
        }
      } else {
        throw new Error('Type "' + type + '" not yet supported');
      }
      this.bufferBuilder.flush();
    };
    Packer.prototype.pack_bin = function(blob) {
      var length = blob.length || blob.byteLength || blob.size;
      if (length <= 15) {
        this.pack_uint8(160 + length);
      } else if (length <= 65535) {
        this.bufferBuilder.append(218);
        this.pack_uint16(length);
      } else if (length <= 4294967295) {
        this.bufferBuilder.append(219);
        this.pack_uint32(length);
      } else {
        throw new Error("Invalid length");
      }
      this.bufferBuilder.append(blob);
    };
    Packer.prototype.pack_string = function(str) {
      var length = utf8Length(str);
      if (length <= 15) {
        this.pack_uint8(176 + length);
      } else if (length <= 65535) {
        this.bufferBuilder.append(216);
        this.pack_uint16(length);
      } else if (length <= 4294967295) {
        this.bufferBuilder.append(217);
        this.pack_uint32(length);
      } else {
        throw new Error("Invalid length");
      }
      this.bufferBuilder.append(str);
    };
    Packer.prototype.pack_array = function(ary) {
      var length = ary.length;
      if (length <= 15) {
        this.pack_uint8(144 + length);
      } else if (length <= 65535) {
        this.bufferBuilder.append(220);
        this.pack_uint16(length);
      } else if (length <= 4294967295) {
        this.bufferBuilder.append(221);
        this.pack_uint32(length);
      } else {
        throw new Error("Invalid length");
      }
      for (var i = 0; i < length; i++) {
        this.pack(ary[i]);
      }
    };
    Packer.prototype.pack_integer = function(num) {
      if (num >= -32 && num <= 127) {
        this.bufferBuilder.append(num & 255);
      } else if (num >= 0 && num <= 255) {
        this.bufferBuilder.append(204);
        this.pack_uint8(num);
      } else if (num >= -128 && num <= 127) {
        this.bufferBuilder.append(208);
        this.pack_int8(num);
      } else if (num >= 0 && num <= 65535) {
        this.bufferBuilder.append(205);
        this.pack_uint16(num);
      } else if (num >= -32768 && num <= 32767) {
        this.bufferBuilder.append(209);
        this.pack_int16(num);
      } else if (num >= 0 && num <= 4294967295) {
        this.bufferBuilder.append(206);
        this.pack_uint32(num);
      } else if (num >= -2147483648 && num <= 2147483647) {
        this.bufferBuilder.append(210);
        this.pack_int32(num);
      } else if (num >= -9223372036854776e3 && num <= 9223372036854776e3) {
        this.bufferBuilder.append(211);
        this.pack_int64(num);
      } else if (num >= 0 && num <= 18446744073709552e3) {
        this.bufferBuilder.append(207);
        this.pack_uint64(num);
      } else {
        throw new Error("Invalid integer");
      }
    };
    Packer.prototype.pack_double = function(num) {
      var sign = 0;
      if (num < 0) {
        sign = 1;
        num = -num;
      }
      var exp = Math.floor(Math.log(num) / Math.LN2);
      var frac0 = num / Math.pow(2, exp) - 1;
      var frac1 = Math.floor(frac0 * Math.pow(2, 52));
      var b32 = Math.pow(2, 32);
      var h32 = sign << 31 | exp + 1023 << 20 | frac1 / b32 & 1048575;
      var l32 = frac1 % b32;
      this.bufferBuilder.append(203);
      this.pack_int32(h32);
      this.pack_int32(l32);
    };
    Packer.prototype.pack_object = function(obj) {
      var keys = Object.keys(obj);
      var length = keys.length;
      if (length <= 15) {
        this.pack_uint8(128 + length);
      } else if (length <= 65535) {
        this.bufferBuilder.append(222);
        this.pack_uint16(length);
      } else if (length <= 4294967295) {
        this.bufferBuilder.append(223);
        this.pack_uint32(length);
      } else {
        throw new Error("Invalid length");
      }
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          this.pack(prop);
          this.pack(obj[prop]);
        }
      }
    };
    Packer.prototype.pack_uint8 = function(num) {
      this.bufferBuilder.append(num);
    };
    Packer.prototype.pack_uint16 = function(num) {
      this.bufferBuilder.append(num >> 8);
      this.bufferBuilder.append(num & 255);
    };
    Packer.prototype.pack_uint32 = function(num) {
      var n = num & 4294967295;
      this.bufferBuilder.append((n & 4278190080) >>> 24);
      this.bufferBuilder.append((n & 16711680) >>> 16);
      this.bufferBuilder.append((n & 65280) >>> 8);
      this.bufferBuilder.append(n & 255);
    };
    Packer.prototype.pack_uint64 = function(num) {
      var high = num / Math.pow(2, 32);
      var low = num % Math.pow(2, 32);
      this.bufferBuilder.append((high & 4278190080) >>> 24);
      this.bufferBuilder.append((high & 16711680) >>> 16);
      this.bufferBuilder.append((high & 65280) >>> 8);
      this.bufferBuilder.append(high & 255);
      this.bufferBuilder.append((low & 4278190080) >>> 24);
      this.bufferBuilder.append((low & 16711680) >>> 16);
      this.bufferBuilder.append((low & 65280) >>> 8);
      this.bufferBuilder.append(low & 255);
    };
    Packer.prototype.pack_int8 = function(num) {
      this.bufferBuilder.append(num & 255);
    };
    Packer.prototype.pack_int16 = function(num) {
      this.bufferBuilder.append((num & 65280) >> 8);
      this.bufferBuilder.append(num & 255);
    };
    Packer.prototype.pack_int32 = function(num) {
      this.bufferBuilder.append(num >>> 24 & 255);
      this.bufferBuilder.append((num & 16711680) >>> 16);
      this.bufferBuilder.append((num & 65280) >>> 8);
      this.bufferBuilder.append(num & 255);
    };
    Packer.prototype.pack_int64 = function(num) {
      var high = Math.floor(num / Math.pow(2, 32));
      var low = num % Math.pow(2, 32);
      this.bufferBuilder.append((high & 4278190080) >>> 24);
      this.bufferBuilder.append((high & 16711680) >>> 16);
      this.bufferBuilder.append((high & 65280) >>> 8);
      this.bufferBuilder.append(high & 255);
      this.bufferBuilder.append((low & 4278190080) >>> 24);
      this.bufferBuilder.append((low & 16711680) >>> 16);
      this.bufferBuilder.append((low & 65280) >>> 8);
      this.bufferBuilder.append(low & 255);
    };
    function _utf8Replace(m) {
      var code = m.charCodeAt(0);
      if (code <= 2047)
        return "00";
      if (code <= 65535)
        return "000";
      if (code <= 2097151)
        return "0000";
      if (code <= 67108863)
        return "00000";
      return "000000";
    }
    function utf8Length(str) {
      if (str.length > 600) {
        return new Blob([str]).size;
      } else {
        return str.replace(/[^\u0000-\u007F]/g, _utf8Replace).length;
      }
    }
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter5() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter5.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter5.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter5.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter5.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter5.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter5.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter5.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter5.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter5.prototype.off = EventEmitter5.prototype.removeListener;
    EventEmitter5.prototype.addListener = EventEmitter5.prototype.on;
    EventEmitter5.prefixed = prefix;
    EventEmitter5.EventEmitter = EventEmitter5;
    if (typeof module !== "undefined") {
      module.exports = EventEmitter5;
    }
  }
});

// lib/utils.ts
var BinaryPack = __toESM(require_binarypack());
var DEFAULT_CONFIG = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "turn:0.peerjs.com:3478", username: "peerjs", credential: "peerjsp" }
  ],
  sdpSemantics: "unified-plan"
};
var Utils = new class {
  constructor() {
    this.CLOUD_HOST = "0.peerjs.com";
    this.CLOUD_PORT = 443;
    this.chunkedMTU = 16300;
    this.defaultConfig = DEFAULT_CONFIG;
    this.pack = BinaryPack.pack;
    this.unpack = BinaryPack.unpack;
    this._dataCount = 1;
  }
  validateId(id) {
    return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(id);
  }
  chunk(blob) {
    const chunks = [];
    const size = blob.size;
    const total = Math.ceil(size / Utils.chunkedMTU);
    let index = 0;
    let start = 0;
    while (start < size) {
      const end = Math.min(size, start + Utils.chunkedMTU);
      const b = blob.slice(start, end);
      const chunk = {
        __peerData: this._dataCount,
        n: index,
        data: b,
        total
      };
      chunks.push(chunk);
      start = end;
      index++;
    }
    this._dataCount++;
    return chunks;
  }
  blobToArrayBuffer(FileReaderCtr, blob, cb) {
    const fr = new FileReaderCtr();
    fr.onload = function(evt) {
      if (evt.target) {
        cb(evt.target.result);
      }
    };
    fr.readAsArrayBuffer(blob);
    return fr;
  }
  binaryStringToArrayBuffer(binary) {
    const byteArray = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      byteArray[i] = binary.charCodeAt(i) & 255;
    }
    return byteArray.buffer;
  }
  randomToken() {
    return Math.random().toString(36).substr(2);
  }
  isSecure() {
    return location.protocol === "https:";
  }
}();

// lib/peer.ts
var import_eventemitter34 = __toESM(require_eventemitter3());

// lib/logger.ts
var LOG_PREFIX = "PeerJS: ";
var Logger = class {
  constructor() {
    this._logLevel = 0 /* Disabled */;
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(logLevel) {
    this._logLevel = logLevel;
  }
  log(...args) {
    if (this._logLevel >= 3 /* All */) {
      this._print(3 /* All */, ...args);
    }
  }
  warn(...args) {
    if (this._logLevel >= 2 /* Warnings */) {
      this._print(2 /* Warnings */, ...args);
    }
  }
  error(...args) {
    if (this._logLevel >= 1 /* Errors */) {
      this._print(1 /* Errors */, ...args);
    }
  }
  setLogFunction(fn) {
    this._print = fn;
  }
  _print(logLevel, ...rest) {
    const copy = [LOG_PREFIX, ...rest];
    for (let i in copy) {
      if (copy[i] instanceof Error) {
        copy[i] = "(" + copy[i].name + ") " + copy[i].message;
      }
    }
    if (logLevel >= 3 /* All */) {
      console.log(...copy);
    } else if (logLevel >= 2 /* Warnings */) {
      console.warn("WARNING", ...copy);
    } else if (logLevel >= 1 /* Errors */) {
      console.error("ERROR", ...copy);
    }
  }
};
var logger_default = new Logger();

// lib/socket.ts
var import_eventemitter3 = __toESM(require_eventemitter3());
var Socket = class extends import_eventemitter3.EventEmitter {
  constructor({ secure, host, port, path, key, pingInterval = 5e3, polyfills }) {
    super();
    this._disconnected = true;
    this._id = null;
    this._messagesQueue = [];
    this.alive = false;
    this._destroyed = false;
    var _a;
    this.pingInterval = pingInterval;
    const wsProtocol = secure ? "wss://" : "ws://";
    this._baseUrl = wsProtocol + host + ":" + port + path + "peerjs?key=" + key;
    this.WebSocketConstructor = (_a = polyfills == null ? void 0 : polyfills.WebSocket) != null ? _a : window.WebSocket;
  }
  get messagesQueue() {
    return this._messagesQueue;
  }
  get destroyed() {
    return this._destroyed;
  }
  start(id, token) {
    if (this._destroyed)
      throw new Error("Socket was destroyed!");
    this._id = id;
    if (!!this._socket || !this._disconnected) {
      return;
    }
    const wsUrl = `${this._baseUrl}&id=${id}&token=${token}`;
    this._socket = new this.WebSocketConstructor(wsUrl);
    this._disconnected = false;
    this._socket.onmessage = (event) => {
      if (this._destroyed)
        return;
      let data;
      try {
        data = JSON.parse(event.data);
        logger_default.log("Server message received:", data);
      } catch (e) {
        logger_default.log("Invalid server message", event.data);
        return;
      }
      this.emit("message" /* Message */, data);
    };
    this._socket.onclose = (event) => {
      if (this._disconnected || this._destroyed) {
        return;
      }
      logger_default.log("Socket closed.", event);
      this._cleanup();
      this._disconnected = true;
      this.emit("disconnected" /* Disconnected */);
    };
    this._socket.onopen = () => {
      if (this._disconnected || this._destroyed) {
        return;
      }
      logger_default.log("Socket open");
      this.emit("open" /* Open */);
      this._sendQueuedMessages();
      this._scheduleHeartbeat();
    };
  }
  _scheduleHeartbeat() {
    this._wsPingTimer = setTimeout(() => {
      this._sendHeartbeat();
    }, this.pingInterval);
  }
  _sendHeartbeat() {
    if (this._destroyed)
      return;
    if (!this._wsOpen()) {
      logger_default.log(`Cannot send heartbeat, because socket closed`);
      return;
    }
    const message = JSON.stringify({ type: "HEARTBEAT" /* Heartbeat */ });
    this._socket.send(message);
    this._scheduleHeartbeat();
  }
  _wsOpen() {
    return !!this._socket && this._socket.readyState === 1;
  }
  _sendQueuedMessages() {
    const copiedQueue = [...this._messagesQueue];
    this._messagesQueue = [];
    for (const message of copiedQueue) {
      this.send(message);
    }
    if (copiedQueue.length > 0) {
      logger_default.log(`${copiedQueue.length} queued messages was sent`);
    }
  }
  send(data) {
    if (this._destroyed)
      throw new Error("Socket was destroyed!");
    if (!data.type) {
      this.emit("error" /* Error */, "Invalid message");
      return;
    }
    if (!this.alive) {
      return;
    }
    if (this._id == null || !this._wsOpen()) {
      this._messagesQueue.push(data);
      return;
    }
    const message = JSON.stringify(data);
    this._socket.send(message);
  }
  close() {
    if (this._disconnected) {
      return;
    }
    this._cleanup();
    this._id = null;
    this._disconnected = true;
  }
  _cleanup() {
    if (this._socket) {
      this._socket.onopen = this._socket.onmessage = this._socket.onclose = null;
      this._socket.close();
      this._socket = void 0;
    }
    clearTimeout(this._wsPingTimer);
  }
  destroy() {
    if (this._destroyed)
      return;
    this.close();
    this._messagesQueue.length = 0;
    this._destroyed = true;
  }
};

// lib/negotiator.ts
function noop() {
}
var Negotiator = class {
  constructor(connection) {
    this.connection = connection;
  }
  get webRtc() {
    var _a, _b;
    return (_b = (_a = this.connection.provider.options.polyfills) == null ? void 0 : _a.WebRTC) != null ? _b : window;
  }
  startConnection(options) {
    const peerConnection = this._startPeerConnection();
    this.connection.peerConnection = peerConnection;
    if (this.connection.type === "media" /* Media */ && options._stream) {
      this._addTracksToConnection(options._stream, peerConnection);
    }
    if (options.originator) {
      if (this.connection.type === "data" /* Data */) {
        const dataConnection = this.connection;
        const config = { ordered: !!options.reliable };
        const dataChannel = peerConnection.createDataChannel(dataConnection.label, config);
        dataConnection.initialize(dataChannel);
      }
      this._makeOffer();
    } else {
      this.handleSDP("OFFER", options.sdp);
    }
  }
  _startPeerConnection() {
    logger_default.log("Creating RTCPeerConnection.");
    const ctr = this.webRtc.RTCPeerConnection;
    const peerConnection = new ctr(this.connection.provider.options.config);
    this._setupListeners(peerConnection);
    return peerConnection;
  }
  _setupListeners(peerConnection) {
    const peerId = this.connection.peer;
    const connectionId = this.connection.connectionId;
    const connectionType = this.connection.type;
    const provider = this.connection.provider;
    logger_default.log("Listening for ICE candidates, remote streams and data channels.");
    peerConnection.onicecandidate = (evt) => {
      if (!evt.candidate || !evt.candidate.candidate)
        return;
      logger_default.log(`Received ICE candidates for ${peerId}:`, evt.candidate);
      provider.socket.send({
        type: "CANDIDATE" /* Candidate */,
        payload: {
          candidate: evt.candidate,
          type: connectionType,
          connectionId
        },
        dst: peerId
      });
    };
    peerConnection.oniceconnectionstatechange = () => {
      switch (peerConnection.iceConnectionState) {
        case "failed":
          logger_default.log("iceConnectionState is failed, closing connections to " + peerId);
          this.connection.emit("error" /* Error */, new Error("Negotiation of connection to " + peerId + " failed."));
          this.connection.close();
          break;
        case "closed":
          logger_default.log("iceConnectionState is closed, closing connections to " + peerId);
          this.connection.emit("error" /* Error */, new Error("Connection to " + peerId + " closed."));
          this.connection.close();
          break;
        case "connected":
          logger_default.log("iceConnectionState changed to connected on the connection with " + peerId);
          break;
        case "disconnected":
          logger_default.log("iceConnectionState changed to disconnected on the connection with " + peerId);
          break;
        case "completed":
          logger_default.log("iceConnectionState changed to completed on the connection with " + peerId);
          peerConnection.onicecandidate = noop;
          break;
      }
      this.connection.emit("iceStateChanged" /* IceStateChanged */, peerConnection.iceConnectionState);
    };
    peerConnection.ondatachannel = (evt) => {
      logger_default.log("Received data channel");
      const dataChannel = evt.channel;
      const connection = provider.getConnection(peerId, connectionId);
      connection.initialize(dataChannel);
    };
    peerConnection.ontrack = (evt) => {
      logger_default.log("Received remote stream");
      const stream = evt.streams[0];
      const connection = provider.getConnection(peerId, connectionId);
      if (connection.type === "media" /* Media */) {
        const mediaConnection = connection;
        this._addStreamToMediaConnection(stream, mediaConnection);
      }
    };
  }
  cleanup() {
    logger_default.log("Cleaning up PeerConnection to " + this.connection.peer);
    const peerConnection = this.connection.peerConnection;
    if (!peerConnection) {
      return;
    }
    this.connection.peerConnection = null;
    peerConnection.onicecandidate = peerConnection.oniceconnectionstatechange = peerConnection.ondatachannel = peerConnection.ontrack = null;
    const peerConnectionNotClosed = peerConnection.signalingState !== "closed";
    let dataChannelNotClosed = false;
    if (this.connection.type === "data" /* Data */) {
      const dataConnection = this.connection;
      const dataChannel = dataConnection.dataChannel;
      if (dataChannel) {
        dataChannelNotClosed = !!dataChannel.readyState && dataChannel.readyState !== "closed";
      }
    }
    if (peerConnectionNotClosed || dataChannelNotClosed) {
      peerConnection.close();
    }
  }
  _makeOffer() {
    return __async(this, null, function* () {
      const peerConnection = this.connection.peerConnection;
      const provider = this.connection.provider;
      try {
        const offer = yield peerConnection.createOffer(this.connection.options.constraints);
        if (peerConnection.signalingState === "closed")
          return;
        logger_default.log("Created offer.");
        if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") {
          offer.sdp = this.connection.options.sdpTransform(offer.sdp) || offer.sdp;
        }
        try {
          yield peerConnection.setLocalDescription(offer);
          logger_default.log("Set localDescription:", offer, `for:${this.connection.peer}`);
          let payload = {
            sdp: offer,
            type: this.connection.type,
            connectionId: this.connection.connectionId,
            metadata: this.connection.metadata
          };
          if (this.connection.type === "data" /* Data */) {
            const dataConnection = this.connection;
            payload = __spreadProps(__spreadValues({}, payload), {
              label: dataConnection.label,
              reliable: dataConnection.reliable,
              serialization: dataConnection.serialization
            });
          }
          provider.socket.send({
            type: "OFFER" /* Offer */,
            payload,
            dst: this.connection.peer
          });
        } catch (err) {
          if (err != "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer") {
            provider.emitError("webrtc" /* WebRTC */, err);
            logger_default.log("Failed to setLocalDescription, ", err);
          }
        }
      } catch (err_1) {
        provider.emitError("webrtc" /* WebRTC */, err_1);
        logger_default.log("Failed to createOffer, ", err_1);
      }
    });
  }
  _makeAnswer() {
    return __async(this, null, function* () {
      const peerConnection = this.connection.peerConnection;
      const provider = this.connection.provider;
      try {
        const answer = yield peerConnection.createAnswer();
        if (peerConnection.signalingState === "closed")
          return;
        logger_default.log("Created answer.");
        if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") {
          answer.sdp = this.connection.options.sdpTransform(answer.sdp) || answer.sdp;
        }
        try {
          yield peerConnection.setLocalDescription(answer);
          logger_default.log(`Set localDescription:`, answer, `for:${this.connection.peer}`);
          provider.socket.send({
            type: "ANSWER" /* Answer */,
            payload: {
              sdp: answer,
              type: this.connection.type,
              connectionId: this.connection.connectionId
            },
            dst: this.connection.peer
          });
        } catch (err) {
          provider.emitError("webrtc" /* WebRTC */, err);
          logger_default.log("Failed to setLocalDescription, ", err);
        }
      } catch (err_1) {
        provider.emitError("webrtc" /* WebRTC */, err_1);
        logger_default.log("Failed to create answer, ", err_1);
      }
    });
  }
  handleSDP(type, sdp) {
    return __async(this, null, function* () {
      const ctr = this.webRtc.RTCSessionDescription;
      sdp = new ctr(sdp);
      const peerConnection = this.connection.peerConnection;
      const provider = this.connection.provider;
      logger_default.log("Setting remote description", sdp);
      const self = this;
      try {
        yield peerConnection.setRemoteDescription(sdp);
        logger_default.log(`Set remoteDescription:${type} for:${this.connection.peer}`);
        if (type === "OFFER") {
          yield self._makeAnswer();
        }
      } catch (err) {
        provider.emitError("webrtc" /* WebRTC */, err);
        logger_default.log("Failed to setRemoteDescription, ", err);
      }
    });
  }
  handleCandidate(ice) {
    return __async(this, null, function* () {
      logger_default.log(`handleCandidate:`, ice);
      const candidate = ice.candidate;
      const sdpMLineIndex = ice.sdpMLineIndex;
      const sdpMid = ice.sdpMid;
      const peerConnection = this.connection.peerConnection;
      const provider = this.connection.provider;
      try {
        const ctr = this.webRtc.RTCIceCandidate;
        yield peerConnection.addIceCandidate(new ctr({
          sdpMid,
          sdpMLineIndex,
          candidate
        }));
        logger_default.log(`Added ICE candidate for:${this.connection.peer}`);
      } catch (err) {
        provider.emitError("webrtc" /* WebRTC */, err);
        logger_default.log("Failed to handleCandidate, ", err);
      }
    });
  }
  _addTracksToConnection(stream, peerConnection) {
    logger_default.log(`add tracks from stream ${stream.id} to peer connection`);
    if (!peerConnection.addTrack) {
      return logger_default.error(`Your browser does't support RTCPeerConnection#addTrack. Ignored.`);
    }
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });
  }
  _addStreamToMediaConnection(stream, mediaConnection) {
    logger_default.log(`add stream ${stream.id} to media connection ${mediaConnection.connectionId}`);
    mediaConnection.addStream(stream);
  }
};

// lib/baseconnection.ts
var import_eventemitter32 = __toESM(require_eventemitter3());
var BaseConnection = class extends import_eventemitter32.EventEmitter {
  constructor(peer, provider, options) {
    super();
    this.peer = peer;
    this.provider = provider;
    this.options = options;
    this._open = false;
    this.metadata = options.metadata;
  }
  get open() {
    return this._open;
  }
};

// lib/mediaconnection.ts
var _MediaConnection = class extends BaseConnection {
  get type() {
    return "media" /* Media */;
  }
  get localStream() {
    return this._localStream;
  }
  get remoteStream() {
    return this._remoteStream;
  }
  constructor(peerId, provider, options) {
    super(peerId, provider, options);
    this._localStream = this.options._stream;
    this.connectionId = this.options.connectionId || _MediaConnection.ID_PREFIX + Utils.randomToken();
    this._negotiator = new Negotiator(this);
    if (this._localStream) {
      this._negotiator.startConnection({
        _stream: this._localStream,
        originator: true
      });
    }
  }
  addStream(remoteStream) {
    logger_default.log("Receiving stream", remoteStream);
    this._remoteStream = remoteStream;
    super.emit("stream" /* Stream */, remoteStream);
  }
  handleMessage(message) {
    const type = message.type;
    const payload = message.payload;
    switch (message.type) {
      case "ANSWER" /* Answer */:
        this._negotiator.handleSDP(type, payload.sdp);
        this._open = true;
        break;
      case "CANDIDATE" /* Candidate */:
        this._negotiator.handleCandidate(payload.candidate);
        break;
      default:
        logger_default.warn(`Unrecognized message type:${type} from peer:${this.peer}`);
        break;
    }
  }
  answer(stream, options = {}) {
    if (this._localStream) {
      logger_default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
      return;
    }
    this._localStream = stream;
    if (options && options.sdpTransform) {
      this.options.sdpTransform = options.sdpTransform;
    }
    this._negotiator.startConnection(__spreadProps(__spreadValues({}, this.options._payload), { _stream: stream }));
    const messages = this.provider._getMessages(this.connectionId);
    for (let message of messages) {
      this.handleMessage(message);
    }
    this._open = true;
  }
  close() {
    if (this._negotiator) {
      this._negotiator.cleanup();
      this._negotiator = null;
    }
    this._localStream = null;
    this._remoteStream = null;
    if (this.provider) {
      this.provider._removeConnection(this);
      this.provider = null;
    }
    if (this.options && this.options._stream) {
      this.options._stream = null;
    }
    if (!this.open) {
      return;
    }
    this._open = false;
    super.emit("close" /* Close */);
  }
};
var MediaConnection = _MediaConnection;
MediaConnection.ID_PREFIX = "mc_";

// lib/encodingQueue.ts
var import_eventemitter33 = __toESM(require_eventemitter3());
var EncodingQueue = class extends import_eventemitter33.EventEmitter {
  constructor(fileReader) {
    super();
    this.fileReader = fileReader;
    this._queue = [];
    this._processing = false;
    this.fileReader.onload = (evt) => {
      this._processing = false;
      if (evt.target) {
        this.emit("done", evt.target.result);
      }
      this.doNextTask();
    };
    this.fileReader.onerror = (evt) => {
      logger_default.error(`EncodingQueue error:`, evt);
      this._processing = false;
      this.destroy();
      this.emit("error", evt);
    };
  }
  get queue() {
    return this._queue;
  }
  get size() {
    return this.queue.length;
  }
  get processing() {
    return this._processing;
  }
  enque(blob) {
    this.queue.push(blob);
    if (this.processing)
      return;
    this.doNextTask();
  }
  destroy() {
    this.fileReader.abort();
    this._queue = [];
  }
  doNextTask() {
    if (this.size === 0)
      return;
    if (this.processing)
      return;
    this._processing = true;
    this.fileReader.readAsArrayBuffer(this.queue.shift());
  }
};

// lib/dataconnection.ts
var _DataConnection = class extends BaseConnection {
  constructor(peerId, provider, options) {
    super(peerId, provider, options);
    this.stringify = JSON.stringify;
    this.parse = JSON.parse;
    this._buffer = [];
    this._bufferSize = 0;
    this._buffering = false;
    this._chunkedData = {};
    var _a, _b;
    this.connectionId = this.options.connectionId || _DataConnection.ID_PREFIX + Utils.randomToken();
    this.label = this.options.label || this.connectionId;
    this.serialization = this.options.serialization || "binary" /* Binary */;
    this.reliable = !!this.options.reliable;
    this.FileReaderCtr = (_b = (_a = provider.options.polyfills) == null ? void 0 : _a.FileReader) != null ? _b : window.FileReader;
    this._encodingQueue = new EncodingQueue(new this.FileReaderCtr());
    this._encodingQueue.on("done", (ab) => {
      this._bufferedSend(ab);
    });
    this._encodingQueue.on("error", () => {
      logger_default.error(`DC#${this.connectionId}: Error occured in encoding from blob to arraybuffer, close DC`);
      this.close();
    });
    this._negotiator = new Negotiator(this);
    this._negotiator.startConnection(this.options._payload || {
      originator: true
    });
  }
  get type() {
    return "data" /* Data */;
  }
  get dataChannel() {
    return this._dc;
  }
  get bufferSize() {
    return this._bufferSize;
  }
  initialize(dc) {
    this._dc = dc;
    this._configureDataChannel();
  }
  _configureDataChannel() {
    if (!this.provider.features.binaryBlob || this.provider.features.reliable) {
      this.dataChannel.binaryType = "arraybuffer";
    }
    this.dataChannel.onopen = () => {
      logger_default.log(`DC#${this.connectionId} dc connection success`);
      this._open = true;
      this.emit("open" /* Open */);
    };
    this.dataChannel.onmessage = (e) => {
      logger_default.log(`DC#${this.connectionId} dc onmessage:`, e.data);
      this._handleDataMessage(e);
    };
    this.dataChannel.onclose = () => {
      logger_default.log(`DC#${this.connectionId} dc closed for:`, this.peer);
      this.close();
    };
  }
  _handleDataMessage({ data }) {
    const datatype = data.constructor;
    const isBinarySerialization = this.serialization === "binary" /* Binary */ || this.serialization === "binary-utf8" /* BinaryUTF8 */;
    let deserializedData = data;
    if (isBinarySerialization) {
      if (datatype === Blob) {
        Utils.blobToArrayBuffer(this.FileReaderCtr, data, (ab) => {
          const unpackedData = Utils.unpack(ab);
          this.emit("data" /* Data */, unpackedData);
        });
        return;
      } else if (datatype === ArrayBuffer) {
        deserializedData = Utils.unpack(data);
      } else if (datatype === String) {
        const ab = Utils.binaryStringToArrayBuffer(data);
        deserializedData = Utils.unpack(ab);
      }
    } else if (this.serialization === "json" /* JSON */) {
      deserializedData = this.parse(data);
    }
    if (deserializedData.__peerData) {
      this._handleChunk(deserializedData);
      return;
    }
    super.emit("data" /* Data */, deserializedData);
  }
  _handleChunk(data) {
    const id = data.__peerData;
    const chunkInfo = this._chunkedData[id] || {
      data: [],
      count: 0,
      total: data.total
    };
    chunkInfo.data[data.n] = data.data;
    chunkInfo.count++;
    this._chunkedData[id] = chunkInfo;
    if (chunkInfo.total === chunkInfo.count) {
      delete this._chunkedData[id];
      const data2 = new Blob(chunkInfo.data);
      this._handleDataMessage({ data: data2 });
    }
  }
  close() {
    this._buffer = [];
    this._bufferSize = 0;
    this._chunkedData = {};
    if (this._negotiator) {
      this._negotiator.cleanup();
      this._negotiator = null;
    }
    if (this.provider) {
      this.provider._removeConnection(this);
      this.provider = null;
    }
    if (this.dataChannel) {
      this.dataChannel.onopen = null;
      this.dataChannel.onmessage = null;
      this.dataChannel.onclose = null;
      this._dc = null;
    }
    if (this._encodingQueue) {
      this._encodingQueue.destroy();
      this._encodingQueue.removeAllListeners();
      this._encodingQueue = null;
    }
    if (!this.open) {
      return;
    }
    this._open = false;
    super.emit("close" /* Close */);
  }
  send(data, chunked) {
    if (!this.open) {
      super.emit("error" /* Error */, new Error("Connection is not open. You should listen for the `open` event before sending messages."));
      return;
    }
    if (this.serialization === "json" /* JSON */) {
      this._bufferedSend(this.stringify(data));
    } else if (this.serialization === "binary" /* Binary */ || this.serialization === "binary-utf8" /* BinaryUTF8 */) {
      const blob = Utils.pack(data);
      if (!chunked && blob.size > Utils.chunkedMTU) {
        this._sendChunks(blob);
        return;
      }
      if (!this.provider.features.binaryBlob) {
        this._encodingQueue.enque(blob);
      } else {
        this._bufferedSend(blob);
      }
    } else {
      this._bufferedSend(data);
    }
  }
  _bufferedSend(msg) {
    if (this._buffering || !this._trySend(msg)) {
      this._buffer.push(msg);
      this._bufferSize = this._buffer.length;
    }
  }
  _trySend(msg) {
    if (!this.open) {
      return false;
    }
    if (this.dataChannel.bufferedAmount > _DataConnection.MAX_BUFFERED_AMOUNT) {
      this._buffering = true;
      setTimeout(() => {
        this._buffering = false;
        this._tryBuffer();
      }, 50);
      return false;
    }
    try {
      this.dataChannel.send(msg);
    } catch (e) {
      logger_default.error(`DC#:${this.connectionId} Error when sending:`, e);
      this._buffering = true;
      this.close();
      return false;
    }
    return true;
  }
  _tryBuffer() {
    if (!this.open) {
      return;
    }
    if (this._buffer.length === 0) {
      return;
    }
    const msg = this._buffer[0];
    if (this._trySend(msg)) {
      this._buffer.shift();
      this._bufferSize = this._buffer.length;
      this._tryBuffer();
    }
  }
  _sendChunks(blob) {
    const blobs = Utils.chunk(blob);
    logger_default.log(`DC#${this.connectionId} Try to send ${blobs.length} chunks...`);
    for (let blob2 of blobs) {
      this.send(blob2, true);
    }
  }
  handleMessage(message) {
    const payload = message.payload;
    switch (message.type) {
      case "ANSWER" /* Answer */:
        this._negotiator.handleSDP(message.type, payload.sdp);
        break;
      case "CANDIDATE" /* Candidate */:
        this._negotiator.handleCandidate(payload.candidate);
        break;
      default:
        logger_default.warn("Unrecognized message type:", message.type, "from peer:", this.peer);
        break;
    }
  }
};
var DataConnection = _DataConnection;
DataConnection.ID_PREFIX = "dc_";
DataConnection.MAX_BUFFERED_AMOUNT = 8 * 1024 * 1024;

// lib/api.ts
var API = class {
  constructor(_options) {
    this._options = _options;
  }
  _request(url) {
    var _a, _b;
    return ((_b = (_a = this._options.polyfills) == null ? void 0 : _a.fetch) != null ? _b : window.fetch)(url);
  }
  _buildUrl(method) {
    const protocol = this._options.secure ? "https://" : "http://";
    let url = protocol + this._options.host + ":" + this._options.port + this._options.path + this._options.key + "/" + method;
    const queryString = "?ts=" + new Date().getTime() + Math.random();
    url += queryString;
    return url;
  }
  retrieveId() {
    return __async(this, null, function* () {
      const url = this._buildUrl("id");
      try {
        const response = yield this._request(url);
        if (response.status !== 200) {
          throw new Error(`Error. Status:${response.status}`);
        }
        return response.text();
      } catch (error) {
        logger_default.error("Error retrieving ID", error);
        let pathError = "";
        if (this._options.path === "/" && this._options.host !== Utils.CLOUD_HOST) {
          pathError = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer.";
        }
        throw new Error("Could not get an ID from the server." + pathError);
      }
    });
  }
  listAllPeers() {
    return __async(this, null, function* () {
      const url = this._buildUrl("peers");
      try {
        const response = yield this._request(url);
        if (response.status !== 200) {
          if (response.status === 401) {
            let helpfulError = "";
            if (this._options.host === Utils.CLOUD_HOST) {
              helpfulError = "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.";
            } else {
              helpfulError = "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.";
            }
            throw new Error("It doesn't look like you have permission to list peers IDs. " + helpfulError);
          }
          throw new Error(`Error. Status:${response.status}`);
        }
        return response.json();
      } catch (error) {
        logger_default.error("Error retrieving list peers", error);
        throw new Error("Could not get list peers from the server." + error);
      }
    });
  }
};

// lib/supports.ts
var Supports = {
  isUnifiedPlanSupported(webRtc) {
    if (!webRtc && typeof window !== "undefined") {
      webRtc = window;
    }
    if (typeof webRtc.RTCRtpTransceiver === "undefined" || !("currentDirection" in webRtc.RTCRtpTransceiver.prototype)) {
      return false;
    }
    let tempPc;
    let supported = false;
    try {
      tempPc = new webRtc.RTCPeerConnection();
      tempPc.addTransceiver("audio");
      supported = true;
    } catch (e) {
    } finally {
      if (tempPc) {
        tempPc.close();
      }
    }
    return supported;
  }
};

// lib/peer.ts
var _Peer = class extends import_eventemitter34.EventEmitter {
  constructor(id, options) {
    super();
    this._id = null;
    this._lastServerId = null;
    this._destroyed = false;
    this._disconnected = false;
    this._open = false;
    this._connections = /* @__PURE__ */ new Map();
    this._lostMessages = /* @__PURE__ */ new Map();
    var _a;
    let userId;
    if (id && id.constructor == Object) {
      options = id;
    } else if (id) {
      userId = id.toString();
    }
    options = __spreadValues({
      debug: 0,
      host: Utils.CLOUD_HOST,
      port: Utils.CLOUD_PORT,
      path: "/",
      key: _Peer.DEFAULT_KEY,
      token: Utils.randomToken(),
      config: Utils.defaultConfig
    }, options);
    this._options = options;
    if (typeof window !== "undefined" && this._options.host === "/") {
      this._options.host = window.location.hostname;
    }
    if (this._options.path) {
      if (this._options.path[0] !== "/") {
        this._options.path = "/" + this._options.path;
      }
      if (this._options.path[this._options.path.length - 1] !== "/") {
        this._options.path += "/";
      }
    }
    if (this._options.secure === void 0 && this._options.host !== Utils.CLOUD_HOST) {
      this._options.secure = Utils.isSecure();
    } else if (this._options.host == Utils.CLOUD_HOST) {
      this._options.secure = true;
    }
    if (this._options.logFunction) {
      logger_default.setLogFunction(this._options.logFunction);
    }
    logger_default.logLevel = this._options.debug || 0;
    this._api = new API(options);
    this._socket = this._createServerConnection();
    this.features = _Peer.getFeatures((_a = this._options.polyfills) == null ? void 0 : _a.WebRTC);
    if (!this.features.audioVideo && !this.features.data) {
      this._delayedAbort("browser-incompatible" /* BrowserIncompatible */, "The current browser does not support WebRTC");
      return;
    }
    if (!!userId && !Utils.validateId(userId)) {
      this._delayedAbort("invalid-id" /* InvalidID */, `ID "${userId}" is invalid`);
      return;
    }
    this.socket.alive = true;
    if (userId) {
      this._initialize(userId);
    } else {
      this._api.retrieveId().then((id2) => this._initialize(id2)).catch((error) => this._abort("server-error" /* ServerError */, error));
    }
  }
  get id() {
    return this._id;
  }
  get options() {
    return this._options;
  }
  get open() {
    return this._open;
  }
  get socket() {
    return this._socket;
  }
  get connections() {
    const plainConnections = /* @__PURE__ */ Object.create(null);
    for (let [k, v] of this._connections) {
      plainConnections[k] = v;
    }
    return plainConnections;
  }
  get destroyed() {
    return this._destroyed;
  }
  get disconnected() {
    return this._disconnected;
  }
  _createServerConnection() {
    const socket = new Socket(this._options);
    socket.on("message" /* Message */, (data) => {
      this._handleMessage(data);
    });
    socket.on("error" /* Error */, (error) => {
      this._abort("socket-error" /* SocketError */, error);
    });
    socket.on("disconnected" /* Disconnected */, () => {
      if (this.disconnected) {
        return;
      }
      this.emitError("network" /* Network */, "Lost connection to server.");
      this.disconnect();
    });
    socket.on("close" /* Close */, () => {
      if (this.disconnected) {
        return;
      }
      this._abort("socket-closed" /* SocketClosed */, "Underlying socket is already closed.");
    });
    return socket;
  }
  _initialize(id) {
    if (this.destroyed)
      return;
    this._id = id;
    this.socket.start(id, this._options.token);
  }
  _handleMessage(message) {
    const type = message.type;
    const payload = message.payload;
    const peerId = message.src;
    switch (type) {
      case "OPEN" /* Open */:
        this._lastServerId = this.id;
        this._open = true;
        this.emit("open" /* Open */, this.id);
        break;
      case "ERROR" /* Error */:
        this._abort("server-error" /* ServerError */, payload.msg);
        break;
      case "ID-TAKEN" /* IdTaken */:
        this._abort("unavailable-id" /* UnavailableID */, `ID "${this.id}" is taken`);
        break;
      case "INVALID-KEY" /* InvalidKey */:
        this._abort("invalid-key" /* InvalidKey */, `API KEY "${this._options.key}" is invalid`);
        break;
      case "LEAVE" /* Leave */:
        logger_default.log(`Received leave message from ${peerId}`);
        this._cleanupPeer(peerId);
        this._connections.delete(peerId);
        break;
      case "EXPIRE" /* Expire */:
        this.emitError("peer-unavailable" /* PeerUnavailable */, `Could not connect to peer ${peerId}`);
        break;
      case "OFFER" /* Offer */: {
        const connectionId = payload.connectionId;
        let connection = this.getConnection(peerId, connectionId);
        if (connection) {
          connection.close();
          logger_default.warn(`Offer received for existing Connection ID:${connectionId}`);
        }
        if (payload.type === "media" /* Media */) {
          connection = new MediaConnection(peerId, this, {
            connectionId,
            _payload: payload,
            metadata: payload.metadata
          });
          this._addConnection(peerId, connection);
          this.emit("call" /* Call */, connection);
        } else if (payload.type === "data" /* Data */) {
          connection = new DataConnection(peerId, this, {
            connectionId,
            _payload: payload,
            metadata: payload.metadata,
            label: payload.label,
            serialization: payload.serialization,
            reliable: payload.reliable
          });
          this._addConnection(peerId, connection);
          this.emit("connection" /* Connection */, connection);
        } else {
          logger_default.warn(`Received malformed connection type:${payload.type}`);
          return;
        }
        const messages = this._getMessages(connectionId);
        for (let message2 of messages) {
          connection.handleMessage(message2);
        }
        break;
      }
      default: {
        if (!payload) {
          logger_default.warn(`You received a malformed message from ${peerId} of type ${type}`);
          return;
        }
        const connectionId = payload.connectionId;
        const connection = this.getConnection(peerId, connectionId);
        if (connection && connection.peerConnection) {
          connection.handleMessage(message);
        } else if (connectionId) {
          this._storeMessage(connectionId, message);
        } else {
          logger_default.warn("You received an unrecognized message:", message);
        }
        break;
      }
    }
  }
  _storeMessage(connectionId, message) {
    if (!this._lostMessages.has(connectionId)) {
      this._lostMessages.set(connectionId, []);
    }
    this._lostMessages.get(connectionId).push(message);
  }
  _getMessages(connectionId) {
    const messages = this._lostMessages.get(connectionId);
    if (messages) {
      this._lostMessages.delete(connectionId);
      return messages;
    }
    return [];
  }
  connect(peer, options = {}) {
    if (this.disconnected) {
      logger_default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available.");
      this.emitError("disconnected" /* Disconnected */, "Cannot connect to new Peer after disconnecting from server.");
      return;
    }
    const dataConnection = new DataConnection(peer, this, options);
    this._addConnection(peer, dataConnection);
    return dataConnection;
  }
  call(peer, stream, options = {}) {
    if (this.disconnected) {
      logger_default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect.");
      this.emitError("disconnected" /* Disconnected */, "Cannot connect to new Peer after disconnecting from server.");
      return;
    }
    if (!stream) {
      logger_default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
      return;
    }
    options._stream = stream;
    const mediaConnection = new MediaConnection(peer, this, options);
    this._addConnection(peer, mediaConnection);
    return mediaConnection;
  }
  _addConnection(peerId, connection) {
    logger_default.log(`add connection ${connection.type}:${connection.connectionId} to peerId:${peerId}`);
    if (!this._connections.has(peerId)) {
      this._connections.set(peerId, []);
    }
    this._connections.get(peerId).push(connection);
  }
  _removeConnection(connection) {
    const connections = this._connections.get(connection.peer);
    if (connections) {
      const index = connections.indexOf(connection);
      if (index !== -1) {
        connections.splice(index, 1);
        if (connections.length === 0) {
          this._connections.delete(connection.peer);
        }
      }
    }
    this._lostMessages.delete(connection.connectionId);
  }
  getConnection(peerId, connectionId) {
    const connections = this._connections.get(peerId);
    if (!connections) {
      return null;
    }
    for (let connection of connections) {
      if (connection.connectionId === connectionId) {
        return connection;
      }
    }
    return null;
  }
  _delayedAbort(type, message) {
    setTimeout(() => {
      this._abort(type, message);
    }, 0);
  }
  _abort(type, message) {
    logger_default.error("Aborting!");
    this.emitError(type, message);
    if (!this._lastServerId) {
      this.destroy();
    } else {
      this.disconnect();
    }
  }
  emitError(type, err) {
    logger_default.error("Error:", err);
    let error;
    if (typeof err === "string") {
      error = new Error(err);
    } else {
      error = err;
    }
    error.type = type;
    this.emit("error" /* Error */, error);
  }
  destroy() {
    if (this.destroyed) {
      return;
    }
    logger_default.log(`Destroy peer with ID:${this.id}`);
    this.disconnect();
    this._cleanup();
    this.socket.destroy();
    this._destroyed = true;
    this.emit("close" /* Close */);
  }
  _cleanup() {
    for (let peerId of this._connections.keys()) {
      this._cleanupPeer(peerId);
      this._connections.delete(peerId);
    }
    this.socket.removeAllListeners();
  }
  _cleanupPeer(peerId) {
    const connections = this._connections.get(peerId);
    if (!connections)
      return;
    for (let connection of connections) {
      connection.close();
    }
  }
  disconnect() {
    if (this.disconnected) {
      return;
    }
    const currentId = this.id;
    logger_default.log(`Disconnect peer with ID:${currentId}`);
    this._disconnected = true;
    this._open = false;
    this.socket.alive = false;
    this.socket.close();
    this._lastServerId = currentId;
    this._id = null;
    this.emit("disconnected" /* Disconnected */, currentId);
  }
  reconnect() {
    if (this.disconnected && !this.destroyed) {
      logger_default.log(`Attempting reconnection to server with ID ${this._lastServerId}`);
      this._disconnected = false;
      this.socket.alive = true;
      this._initialize(this._lastServerId);
    } else if (this.destroyed) {
      throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
    } else if (!this.disconnected && !this.open) {
      logger_default.error("In a hurry? We're still trying to make the initial connection!");
    } else {
      throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`);
    }
  }
  listAllPeers(cb = (_) => {
  }) {
    this._api.listAllPeers().then((peers) => cb(peers)).catch((error) => this._abort("server-error" /* ServerError */, error));
  }
  static getFeatures(webRtc) {
    if (!webRtc && typeof window !== "undefined") {
      webRtc = window;
    }
    if (!_Peer._features) {
      _Peer._features = _Peer.checkFeatures(webRtc);
    }
    return _Peer._features;
  }
  static checkFeatures(webRtc) {
    if (!webRtc && typeof window !== "undefined") {
      webRtc = window;
    }
    const supported = {
      webRTC: typeof webRtc.RTCPeerConnection !== "undefined",
      audioVideo: true,
      data: false,
      binaryBlob: false,
      reliable: false,
      unifiedPlan: false
    };
    if (!supported.webRTC)
      return supported;
    let pc;
    try {
      pc = new webRtc.RTCPeerConnection(Utils.defaultConfig);
      let dc;
      try {
        dc = pc.createDataChannel("_PEERJSTEST", { ordered: true });
        supported.data = true;
        supported.reliable = !!dc.ordered;
        try {
          dc.binaryType = "blob";
          supported.binaryBlob = true;
        } catch (e) {
        }
      } catch (e) {
      } finally {
        if (dc) {
          dc.close();
        }
      }
    } catch (e) {
    } finally {
      if (pc) {
        pc.close();
      }
    }
    supported.unifiedPlan = Supports.isUnifiedPlanSupported(webRtc);
    return supported;
  }
};
var Peer = _Peer;
Peer.DEFAULT_KEY = "peerjs";

// lib/index.ts
var lib_default = Peer;
if (typeof window !== "undefined") {
  window.Peer = Peer;
}
export {
  Peer,
  Utils,
  lib_default as default
};
