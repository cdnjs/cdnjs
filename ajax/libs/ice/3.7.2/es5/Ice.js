"use strict";

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var root = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var ice = root.ice || {};
  root.Ice = root.Ice || {};
  ice.Ice = root.Ice;
  Ice.Slice = Ice.Slice || {};
  root.IceMX = root.IceMX || {};
  ice.IceMX = root.IceMX;
  root.IceSSL = root.IceSSL || {};
  ice.IceSSL = root.IceSSL;
  var Slice = Ice.Slice;

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //

    /* global
        self : false
    */
    var root = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    /* global
        self : true
    */

    var _ModuleRegistry =
    /*#__PURE__*/
    function () {
      function _ModuleRegistry() {
        _classCallCheck(this, _ModuleRegistry);
      }

      _createClass(_ModuleRegistry, null, [{
        key: "module",
        value: function module(name) {
          var m = root[name];

          if (m === undefined) {
            m = {};
            root[name] = m;
          }

          return m;
        }
      }, {
        key: "require",
        value: function require(name) {
          return root;
        }
      }, {
        key: "type",
        value: function type(scoped) {
          if (scoped === undefined) {
            return undefined;
          }

          var components = scoped.split(".");
          var T = root;

          for (var i = 0, length = components.length; i < length; ++i) {
            T = T[components[i]];

            if (T === undefined) {
              return undefined;
            }
          }

          return T;
        }
      }]);

      return _ModuleRegistry;
    }();

    Ice._require = function () {
      return root;
    };

    Ice.Slice = Ice.Slice || {};
    Ice._ModuleRegistry = _ModuleRegistry;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var _ModuleRegistry = Ice._ModuleRegistry;
    var Slice = Ice.Slice;

    var eq = function eq(e1, e2) {
      if (e1 === e2) {
        return true; // If identity compare equals members are equal.
      } else if (e1 === null || e1 === undefined || e2 === null || e2 === undefined) {
        return false;
      } else if (e1.prototype !== e2.prototype) {
        return false;
      } else if (typeof e1.equals == "function") {
        return e1.equals(e2);
      } else if (e1 instanceof Array || e1 instanceof Uint8Array) {
        return ArrayUtil.equals(e1, e2, eq);
      }

      return false;
    };

    var ArrayUtil =
    /*#__PURE__*/
    function () {
      function ArrayUtil() {
        _classCallCheck(this, ArrayUtil);
      }

      _createClass(ArrayUtil, null, [{
        key: "clone",
        value: function clone(arr) {
          if (arr === undefined) {
            return arr;
          } else if (arr === null) {
            return [];
          } else {
            return arr.slice();
          }
        }
      }, {
        key: "equals",
        value: function equals(v1, v2, valuesEqual) {
          if (v1.length != v2.length) {
            return false;
          }

          var equalFn = valuesEqual || eq;

          for (var i = 0; i < v1.length; ++i) {
            if (!equalFn.call(equalFn, v1[i], v2[i])) {
              return false;
            }
          }

          return true;
        }
      }, {
        key: "shuffle",
        value: function shuffle(arr) {
          for (var i = arr.length; i > 1; --i) {
            var e = arr[i - 1];
            var rand = Math.floor(Math.random() * i);
            arr[i - 1] = arr[rand];
            arr[rand] = e;
          }
        }
      }]);

      return ArrayUtil;
    }();

    ArrayUtil.eq = eq;

    Slice.defineSequence = function (module, name, valueHelper, fixed, elementType) {
      var helper = null;
      Object.defineProperty(module, name, {
        get: function get() {
          if (helper === null) {
            helper = Ice.StreamHelpers.generateSeqHelper(_ModuleRegistry.type(valueHelper), fixed, _ModuleRegistry.type(elementType));
          }

          return helper;
        }
      });
    };

    Ice.ArrayUtil = ArrayUtil;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice.EnumBase
    //
    var EnumBase =
    /*#__PURE__*/
    function () {
      function EnumBase(name, value) {
        _classCallCheck(this, EnumBase);

        this._name = name;
        this._value = value;
      }

      _createClass(EnumBase, [{
        key: "equals",
        value: function equals(rhs) {
          if (this === rhs) {
            return true;
          }

          if (!(rhs instanceof Object.getPrototypeOf(this).constructor)) {
            return false;
          }

          return this._value == rhs._value;
        }
      }, {
        key: "hashCode",
        value: function hashCode() {
          return this._value;
        }
      }, {
        key: "toString",
        value: function toString() {
          return this._name;
        }
      }, {
        key: "name",
        get: function get() {
          return this._name;
        }
      }, {
        key: "value",
        get: function get() {
          return this._value;
        }
      }]);

      return EnumBase;
    }();

    Ice.EnumBase = EnumBase;

    var EnumHelper =
    /*#__PURE__*/
    function () {
      function EnumHelper(enumType) {
        _classCallCheck(this, EnumHelper);

        this._enumType = enumType;
      }

      _createClass(EnumHelper, [{
        key: "write",
        value: function write(os, v) {
          this._enumType._write(os, v);
        }
      }, {
        key: "writeOptional",
        value: function writeOptional(os, tag, v) {
          this._enumType._writeOpt(os, tag, v);
        }
      }, {
        key: "read",
        value: function read(is) {
          return this._enumType._read(is);
        }
      }, {
        key: "readOptional",
        value: function readOptional(is, tag) {
          return this._enumType._readOpt(is, tag);
        }
      }]);

      return EnumHelper;
    }();

    Ice.EnumHelper = EnumHelper;
    var Slice = Ice.Slice;

    Slice.defineEnum = function (enumerators) {
      var type =
      /*#__PURE__*/
      function (_EnumBase) {
        _inherits(type, _EnumBase);

        function type() {
          _classCallCheck(this, type);

          return _possibleConstructorReturn(this, _getPrototypeOf(type).apply(this, arguments));
        }

        return type;
      }(EnumBase);

      var enums = [];
      var maxValue = 0;
      var firstEnum = null;

      for (var idx in enumerators) {
        var e = enumerators[idx][0];
        var value = enumerators[idx][1];
        var enumerator = new type(e, value);
        enums[value] = enumerator;

        if (!firstEnum) {
          firstEnum = enumerator;
        }

        Object.defineProperty(type, e, {
          enumerable: true,
          value: enumerator
        });

        if (value > maxValue) {
          maxValue = value;
        }
      }

      Object.defineProperty(type, "minWireSize", {
        get: function get() {
          return 1;
        }
      });

      type._write = function (os, v) {
        if (v) {
          os.writeEnum(v);
        } else {
          os.writeEnum(firstEnum);
        }
      };

      type._read = function (is) {
        return is.readEnum(type);
      };

      type._writeOpt = function (os, tag, v) {
        if (v !== undefined) {
          if (os.writeOptional(tag, Ice.OptionalFormat.Size)) {
            type._write(os, v);
          }
        }
      };

      type._readOpt = function (is, tag) {
        return is.readOptionalEnum(tag, type);
      };

      type._helper = new EnumHelper(type);
      Object.defineProperty(type, 'valueOf', {
        value: function value(v) {
          if (v === undefined) {
            return type;
          }

          return enums[v];
        }
      });
      Object.defineProperty(type, 'maxValue', {
        value: maxValue
      });
      Object.defineProperty(type.prototype, 'maxValue', {
        value: maxValue
      });
      return type;
    };
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // The Long type represents a signed 64-bit integer as two 32-bit values
    // corresponding to the high and low words.
    //
    var Long =
    /*#__PURE__*/
    function () {
      //
      // If only one argument is provide we assume it is a JavaScript Number,
      // and we convert it to two 32 bit words to fit in the Ice.Long internal
      // representation.
      //
      // If two arguments are provided we asume these are the high and low words
      // respectively.
      //
      function Long() {
        var high = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var low = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        _classCallCheck(this, Long);

        if (!Number.isSafeInteger(high)) {
          throw new RangeError(low === undefined ? "Number must be a safe integer" : "High word must be a safe integer");
        }

        if (low === undefined) {
          this.low = high >>> 0;
          this.high = (high - this.low) / Long.HIGH_MASK >>> 0;
        } else {
          if (!Number.isSafeInteger(low)) {
            throw new RangeError("Low word must be a safe integer");
          }

          if (low < 0 || low > Long.MAX_UINT32) {
            throw new RangeError("Low word must be between 0 and 0xFFFFFFFF");
          }

          if (high < 0 || high > Long.MAX_UINT32) {
            throw new RangeError("High word must be between 0 and 0xFFFFFFFF");
          }

          this.high = high;
          this.low = low;
        }
      }

      _createClass(Long, [{
        key: "hashCode",
        value: function hashCode() {
          return this.low;
        }
      }, {
        key: "equals",
        value: function equals(rhs) {
          if (this === rhs) {
            return true;
          }

          if (!(rhs instanceof Long)) {
            return false;
          }

          return this.high === rhs.high && this.low === rhs.low;
        }
      }, {
        key: "toString",
        value: function toString() {
          return this.high + ":" + this.low;
        }
      }, {
        key: "toNumber",
        value: function toNumber() {
          if ((this.high & Long.SIGN_MASK) !== 0) {
            var l = ~this.low >>> 0;
            var h = ~this.high >>> 0;

            if (h > Long.HIGH_MAX || h == Long.HIGH_MAX && l == Long.MAX_UINT32) {
              return Number.NEGATIVE_INFINITY;
            }

            return -(h * Long.HIGH_MASK + l + 1);
          } else {
            if (this.high > Long.HIGH_MAX) {
              return Number.POSITIVE_INFINITY;
            }

            return this.high * Long.HIGH_MASK + this.low;
          }
        }
      }]);

      return Long;
    }(); //
    // 2^32
    //


    Long.MAX_UINT32 = 0xFFFFFFFF; //
    // (high & SIGN_MASK) != 0 denotes a negative number;
    // that is, the most significant bit is set.
    //

    Long.SIGN_MASK = 0x80000000; //
    // When converting to a JavaScript Number we left shift the
    // high word by 32 bits. As that isn't possible using JavaScript's
    // left shift operator, we multiply the value by 2^32 which will
    // produce the same result.
    //

    Long.HIGH_MASK = 0x100000000; //
    // The maximum value for the high word when coverting to
    // a JavaScript Number is 2^21 - 1, in which case all
    // 53 bits are used.
    //

    Long.HIGH_MAX = 0x1FFFFF;
    Ice.Long = Long;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    Ice.AsyncStatus = {
      Queued: 0,
      Sent: 1
    };
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Long = Ice.Long;
    var bufferOverflowExceptionMsg = "BufferOverflowException";
    var bufferUnderflowExceptionMsg = "BufferUnderflowException";
    var indexOutOfBoundsExceptionMsg = "IndexOutOfBoundsException";

    var Buffer =
    /*#__PURE__*/
    function () {
      function Buffer(buffer) {
        _classCallCheck(this, Buffer);

        if (buffer !== undefined) {
          this.b = buffer;
          this.v = new DataView(this.b);
          this._limit = this.b.byteLength;
        } else {
          this.b = null; // ArrayBuffer

          this.v = null; // DataView

          this._limit = 0;
        }

        this._position = 0;
        this._shrinkCounter = 0;
      }

      _createClass(Buffer, [{
        key: "empty",
        value: function empty() {
          return this._limit === 0;
        }
      }, {
        key: "resize",
        value: function resize(n) {
          if (n === 0) {
            this.clear();
          } else if (n > this.capacity) {
            this.reserve(n);
          }

          this._limit = n;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.b = null;
          this.v = null;
          this._position = 0;
          this._limit = 0;
        } //
        // Call expand(n) to add room for n additional bytes. Note that expand()
        // examines the current position of the buffer first; we don't want to
        // expand the buffer if the caller is writing to a location that is
        // already in the buffer.
        //

      }, {
        key: "expand",
        value: function expand(n) {
          var sz = this.capacity === 0 ? n : this._position + n;

          if (sz > this._limit) {
            this.resize(sz);
          }
        }
      }, {
        key: "reset",
        value: function reset() {
          if (this._limit > 0 && this._limit * 2 < this.capacity) {
            //
            // If the current buffer size is smaller than the
            // buffer capacity, we shrink the buffer memory to the
            // current size. This is to avoid holding on to too much
            // memory if it's not needed anymore.
            //
            if (++this._shrinkCounter > 2) {
              this.reserve(this._limit);
              this._shrinkCounter = 0;
            }
          } else {
            this._shrinkCounter = 0;
          }

          this._limit = this.capacity();
          this._position = 0;
        }
      }, {
        key: "reserve",
        value: function reserve(n) {
          if (n > this.capacity) {
            var capacity = Math.max(1024, Math.max(n, 2 * this.capacity));

            if (!this.b) {
              this.b = new ArrayBuffer(capacity);
            } else {
              var b = new Uint8Array(capacity);
              b.set(new Uint8Array(this.b));
              this.b = b.buffer;
            }

            this.v = new DataView(this.b);
          } else if (n < this.capacity) {
            this.b = this.b.slice(0, n);
            this.v = new DataView(this.b);
          }
        }
      }, {
        key: "put",
        value: function put(v) {
          if (this._position === this._limit) {
            throw new RangeError(bufferOverflowExceptionMsg);
          }

          this.v.setUint8(this._position, v);
          this._position++;
        }
      }, {
        key: "putAt",
        value: function putAt(i, v) {
          if (i >= this._limit) {
            throw new RangeError(indexOutOfBoundsExceptionMsg);
          }

          this.v.setUint8(i, v);
        }
      }, {
        key: "putArray",
        value: function putArray(v) {
          // Expects an Uint8Array
          if (!(v instanceof Uint8Array)) {
            throw new TypeError('argument is not a Uint8Array');
          }

          if (v.byteLength > 0) {
            if (this._position + v.length > this._limit) {
              throw new RangeError(bufferOverflowExceptionMsg);
            }

            new Uint8Array(this.b, 0, this.b.byteLength).set(v, this._position);
            this._position += v.byteLength;
          }
        }
      }, {
        key: "putShort",
        value: function putShort(v) {
          if (this._position + 2 > this._limit) {
            throw new RangeError(bufferOverflowExceptionMsg);
          }

          this.v.setInt16(this._position, v, true);
          this._position += 2;
        }
      }, {
        key: "putInt",
        value: function putInt(v) {
          if (this._position + 4 > this._limit) {
            throw new RangeError(bufferOverflowExceptionMsg);
          }

          this.v.setInt32(this._position, v, true);
          this._position += 4;
        }
      }, {
        key: "putIntAt",
        value: function putIntAt(i, v) {
          if (i + 4 > this._limit || i < 0) {
            throw new RangeError(indexOutOfBoundsExceptionMsg);
          }

          this.v.setInt32(i, v, true);
        }
      }, {
        key: "putFloat",
        value: function putFloat(v) {
          if (this._position + 4 > this._limit) {
            throw new RangeError(bufferOverflowExceptionMsg);
          }

          this.v.setFloat32(this._position, v, true);
          this._position += 4;
        }
      }, {
        key: "putDouble",
        value: function putDouble(v) {
          if (this._position + 8 > this._limit) {
            throw new RangeError(bufferOverflowExceptionMsg);
          }

          this.v.setFloat64(this._position, v, true);
          this._position += 8;
        }
      }, {
        key: "putLong",
        value: function putLong(v) {
          if (this._position + 8 > this._limit) {
            throw new RangeError(bufferOverflowExceptionMsg);
          }

          this.v.setInt32(this._position, v.low, true);
          this._position += 4;
          this.v.setInt32(this._position, v.high, true);
          this._position += 4;
        }
      }, {
        key: "writeString",
        value: function writeString(stream, v) {
          //
          // Encode the string as utf8
          //
          var encoded = unescape(encodeURIComponent(v));
          stream.writeSize(encoded.length);
          stream.expand(encoded.length);
          this.putString(encoded, encoded.length);
        }
      }, {
        key: "putString",
        value: function putString(v, sz) {
          if (this._position + sz > this._limit) {
            throw new RangeError(bufferOverflowExceptionMsg);
          }

          for (var i = 0; i < sz; ++i) {
            this.v.setUint8(this._position, v.charCodeAt(i));
            this._position++;
          }
        }
      }, {
        key: "get",
        value: function get() {
          if (this._position >= this._limit) {
            throw new RangeError(bufferUnderflowExceptionMsg);
          }

          var v = this.v.getUint8(this._position);
          this._position++;
          return v;
        }
      }, {
        key: "getAt",
        value: function getAt(i) {
          if (i < 0 || i >= this._limit) {
            throw new RangeError(indexOutOfBoundsExceptionMsg);
          }

          return this.v.getUint8(i);
        }
      }, {
        key: "getArray",
        value: function getArray(length) {
          if (this._position + length > this._limit) {
            throw new RangeError(bufferUnderflowExceptionMsg);
          }

          var buffer = this.b.slice(this._position, this._position + length);
          this._position += length;
          return new Uint8Array(buffer);
        }
      }, {
        key: "getArrayAt",
        value: function getArrayAt(position, length) {
          if (position + length > this._limit) {
            throw new RangeError(bufferUnderflowExceptionMsg);
          }

          return new Uint8Array(this.b.slice(position, position + length === undefined ? this.b.byteLength - position : length));
        }
      }, {
        key: "getShort",
        value: function getShort() {
          if (this._limit - this._position < 2) {
            throw new RangeError(bufferUnderflowExceptionMsg);
          }

          var v = this.v.getInt16(this._position, true);
          this._position += 2;
          return v;
        }
      }, {
        key: "getInt",
        value: function getInt() {
          if (this._limit - this._position < 4) {
            throw new RangeError(bufferUnderflowExceptionMsg);
          }

          var v = this.v.getInt32(this._position, true);
          this._position += 4;
          return v;
        }
      }, {
        key: "getFloat",
        value: function getFloat() {
          if (this._limit - this._position < 4) {
            throw new RangeError(bufferUnderflowExceptionMsg);
          }

          var v = this.v.getFloat32(this._position, true);
          this._position += 4;
          return v;
        }
      }, {
        key: "getDouble",
        value: function getDouble() {
          if (this._limit - this._position < 8) {
            throw new RangeError(bufferUnderflowExceptionMsg);
          }

          var v = this.v.getFloat64(this._position, true);
          this._position += 8;
          return v;
        }
      }, {
        key: "getLong",
        value: function getLong() {
          if (this._limit - this._position < 8) {
            throw new RangeError(bufferUnderflowExceptionMsg);
          }

          var low = this.v.getUint32(this._position, true);
          this._position += 4;
          var high = this.v.getUint32(this._position, true);
          this._position += 4;
          return new Long(high, low);
        }
      }, {
        key: "getString",
        value: function getString(length) {
          if (this._position + length > this._limit) {
            throw new RangeError(bufferUnderflowExceptionMsg);
          }

          var data = new DataView(this.b, this._position, length);
          var s = "";

          for (var i = 0; i < length; ++i) {
            s += String.fromCharCode(data.getUint8(i));
          }

          this._position += length;
          return decodeURIComponent(escape(s));
        }
      }, {
        key: "position",
        get: function get() {
          return this._position;
        },
        set: function set(value) {
          if (value >= 0 && value <= this._limit) {
            this._position = value;
          }
        }
      }, {
        key: "limit",
        get: function get() {
          return this._limit;
        },
        set: function set(value) {
          if (value <= this.capacity) {
            this._limit = value;

            if (this._position > value) {
              this._position = value;
            }
          }
        }
      }, {
        key: "capacity",
        get: function get() {
          return this.b === null ? 0 : this.b.byteLength;
        }
      }, {
        key: "remaining",
        get: function get() {
          return this._limit - this._position;
        }
      }]);

      return Buffer;
    }();

    Ice.Buffer = Buffer;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    Ice.CompactIdRegistry = new Map();
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var _toString = function toString(key, object, objectTable, ident) {
      ident += "  ";

      if (object === null) {
        return "\n" + ident + key + ": (null)";
      }

      if (object === undefined) {
        return "\n" + ident + key + ": (undefined)";
      }

      if (key == "stack" || typeof object == "function") {
        return "";
      }

      if (_typeof(object) != "object") {
        return "\n" + ident + key + ": \"" + object + "\"";
      }

      if (objectTable.indexOf(object) != -1) {
        return "\n" + ident + key + ": (recursive)";
      }

      objectTable.push(object);
      var s = "\n" + ident + key + ":";

      for (var k in object) {
        if (key.indexOf("_") === 0) {
          continue;
        }

        if (typeof object[k] == "function") {
          continue;
        }

        s += ident + _toString(k, object[k], objectTable, ident);
      }

      return s;
    }; //
    // Ice.Exception
    //


    var Exception =
    /*#__PURE__*/
    function (_Error) {
      _inherits(Exception, _Error);

      function Exception(cause) {
        var _this;

        _classCallCheck(this, Exception);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Exception).call(this));

        if (cause) {
          _this.ice_cause = cause;
        }

        return _this;
      }

      _createClass(Exception, [{
        key: "ice_name",
        value: function ice_name() {
          return this.constructor._id.substr(2);
        }
      }, {
        key: "ice_id",
        value: function ice_id() {
          return this.constructor._id;
        }
      }, {
        key: "toString",
        value: function toString() {
          //
          // We have a guard here to prevent being re-entered. With some browsers (IE), accessing
          // the stack property ends up calling toString on the exception to print it out with the
          // stack.
          //
          if (this._inToStringAlready) {
            return "";
          }

          this._inToStringAlready = true;
          var s = this.ice_id();

          for (var key in this) {
            if (key != "_inToStringAlready") {
              s += _toString(key, this[key], [], "");
            }
          }

          if (Ice._printStackTraces === true && this.stack) {
            s += "\n" + this.stack;
          }

          this._inToStringAlready = false;
          return s;
        }
      }], [{
        key: "captureStackTrace",
        value: function captureStackTrace(object) {
          var stack = new Error().stack; //
          // In IE 10 and greater the stack will be filled once the Error is throw
          // we don't need to do anything.
          //

          if (stack !== undefined) {
            Object.defineProperty(object, "stack", {
              get: function get() {
                return stack;
              }
            });
          }
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::Exception";
        }
      }]);

      return Exception;
    }(_wrapNativeSuper(Error));

    Ice.Exception = Exception; //
    // Ice.LocalException
    //

    var LocalException =
    /*#__PURE__*/
    function (_Exception) {
      _inherits(LocalException, _Exception);

      function LocalException(cause) {
        var _this2;

        _classCallCheck(this, LocalException);

        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(LocalException).call(this, cause));
        Exception.captureStackTrace(_assertThisInitialized(_assertThisInitialized(_this2)));
        return _this2;
      }

      _createClass(LocalException, null, [{
        key: "_id",
        get: function get() {
          return "::Ice::LocalException";
        }
      }]);

      return LocalException;
    }(Exception);

    Ice.LocalException = LocalException; //
    // Ice.UserException
    //

    var UserException =
    /*#__PURE__*/
    function (_Exception2) {
      _inherits(UserException, _Exception2);

      function UserException(cause) {
        var _this3;

        _classCallCheck(this, UserException);

        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(UserException).call(this, cause));
        Exception.captureStackTrace(_assertThisInitialized(_assertThisInitialized(_this3)));
        return _this3;
      }

      _createClass(UserException, [{
        key: "ice_getSlicedData",
        value: function ice_getSlicedData() {
          return null;
        }
      }, {
        key: "_write",
        value: function _write(os) {
          os.startException(null);
          writeImpl(this, os, this._mostDerivedType());
          os.endException();
        }
      }, {
        key: "_read",
        value: function _read(is) {
          is.startException();
          readImpl(this, is, this._mostDerivedType());
          is.endException(false);
        }
      }, {
        key: "_usesClasses",
        value: function _usesClasses() {
          return false;
        }
      }, {
        key: "_mostDerivedType",
        value: function _mostDerivedType() {
          return Ice.UserException;
        }
      }], [{
        key: "_id",
        get: function get() {
          return "::Ice::UserException";
        }
      }]);

      return UserException;
    }(Exception);

    Ice.UserException = UserException; //
    // Private methods
    //

    var writeImpl = function writeImpl(obj, os, type) {
      //
      // The writeImpl method is a recursive method that goes down the
      // class hierarchy to marshal each slice of the class using the
      // generated _writeMemberImpl method.
      //
      if (type === undefined || type === UserException) {
        return; // Don't marshal anything for Ice.UserException
      }

      os.startSlice(type._id, -1, type._parent === UserException);

      if (type.prototype.hasOwnProperty('_writeMemberImpl')) {
        type.prototype._writeMemberImpl.call(obj, os);
      }

      os.endSlice();
      writeImpl(obj, os, type._parent);
    };

    var readImpl = function readImpl(obj, is, type) {
      //
      // The readImpl method is a recursive method that goes down the
      // class hierarchy to marshal each slice of the class using the
      // generated _readMemberImpl method.
      //
      if (type === undefined || type === UserException) {
        return; // Don't marshal anything for UserException
      }

      is.startSlice();

      if (type.prototype.hasOwnProperty('_readMemberImpl')) {
        type.prototype._readMemberImpl.call(obj, is);
      }

      is.endSlice();
      readImpl(obj, is, type._parent);
    };

    var writePreserved = function writePreserved(os) {
      //
      // For Slice exceptions which are marked "preserved", the implementation of this method
      // replaces the Ice.UserException.prototype._write method.
      //
      os.startException(this._slicedData);
      writeImpl(this, os, this._mostDerivedType());
      os.endException();
    };

    var readPreserved = function readPreserved(is) {
      //
      // For Slice exceptions which are marked "preserved", the implementation of this method
      // replaces the Ice.UserException.prototype._read method.
      //
      is.startException();
      readImpl(this, is, this._mostDerivedType());
      this._slicedData = is.endException(true);
    };

    var ice_getSlicedData = function ice_getSlicedData() {
      return this._slicedData;
    };

    Ice.Slice.PreservedUserException = function (ex) {
      ex.prototype.ice_getSlicedData = ice_getSlicedData;
      ex.prototype._write = writePreserved;
      ex.prototype._read = readPreserved;
    };
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    Ice.FormatType = Ice.Slice.defineEnum([['DefaultFormat', 0], ['CompactFormat', 1], ['SlicedFormat', 2]]);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var AssertionFailedException =
    /*#__PURE__*/
    function (_Error2) {
      _inherits(AssertionFailedException, _Error2);

      function AssertionFailedException(message) {
        var _this4;

        _classCallCheck(this, AssertionFailedException);

        _this4 = _possibleConstructorReturn(this, _getPrototypeOf(AssertionFailedException).call(this));
        Ice.Exception.captureStackTrace(_assertThisInitialized(_assertThisInitialized(_this4)));
        _this4.message = message;
        return _this4;
      }

      return AssertionFailedException;
    }(_wrapNativeSuper(Error));

    Ice.AssertionFailedException = AssertionFailedException;

    var Debug =
    /*#__PURE__*/
    function () {
      function Debug() {
        _classCallCheck(this, Debug);
      }

      _createClass(Debug, null, [{
        key: "assert",
        value: function assert(b, msg) {
          if (!b) {
            console.log(msg === undefined ? "assertion failed" : msg);
            console.log(Error().stack);
            throw new Ice.AssertionFailedException(msg === undefined ? "assertion failed" : msg);
          }
        }
      }]);

      return Debug;
    }();

    Ice.Debug = Debug;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Debug = Ice.Debug;

    Ice.StringUtil =
    /*#__PURE__*/
    function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      _createClass(_class, null, [{
        key: "findFirstOf",
        //
        // Return the index of the first character in str to
        // appear in match, starting from start. Returns -1 if none is
        // found.
        //
        value: function findFirstOf(str, match, start) {
          start = start === undefined ? 0 : start;

          for (var i = start; i < str.length; i++) {
            var ch = str.charAt(i);

            if (match.indexOf(ch) != -1) {
              return i;
            }
          }

          return -1;
        } //
        // Return the index of the first character in str which does
        // not appear in match, starting from start. Returns -1 if none is
        // found.
        //

      }, {
        key: "findFirstNotOf",
        value: function findFirstNotOf(str, match, start) {
          start = start === undefined ? 0 : start;

          for (var i = start; i < str.length; i++) {
            var ch = str.charAt(i);

            if (match.indexOf(ch) == -1) {
              return i;
            }
          }

          return -1;
        } //
        // Add escape sequences (such as "\n", or "\123") to s
        //

      }, {
        key: "escapeString",
        value: function escapeString(s, special, toStringMode) {
          special = special === undefined ? null : special;

          if (special !== null) {
            for (var i = 0; i < special.length; ++i) {
              if (special.charCodeAt(i) < 32 || special.charCodeAt(i) > 126) {
                throw new RangeError("special characters must be in ASCII range 32-126");
              }
            }
          }

          var result = [];

          if (toStringMode === Ice.ToStringMode.Compat) {
            // Encode UTF-8 bytes
            var bytes = unescape(encodeURIComponent(s));

            for (var _i = 0; _i < bytes.length; ++_i) {
              var c = bytes.charCodeAt(_i);
              encodeChar(c, result, special, toStringMode);
            }
          } else {
            for (var _i2 = 0; _i2 < s.length; ++_i2) {
              var _c = s.charCodeAt(_i2);

              if (toStringMode === Ice.ToStringMode.Unicode || _c < 0xD800 || _c > 0xDFFF) {
                encodeChar(_c, result, special, toStringMode);
              } else {
                Debug.assert(toStringMode === Ice.ToStringMode.ASCII && _c >= 0xD800 && _c <= 0xDFFF);

                if (_i2 + 1 === s.length) {
                  throw new RangeError("High surrogate without low surrogate");
                } else {
                  var codePoint = s.codePointAt(_i2);
                  Debug.assert(codePoint > 0xFFFF);
                  _i2++; // append \Unnnnnnnn

                  result.push("\\U");
                  var hex = codePoint.toString(16);

                  for (var j = hex.length; j < 8; j++) {
                    result.push('0');
                  }

                  result.push(hex);
                }
              }
            }
          }

          return result.join("");
        } //
        // Remove escape sequences added by escapeString. Throws Error
        // for an invalid input string.
        //

      }, {
        key: "unescapeString",
        value: function unescapeString(s, start, end, special) {
          start = start === undefined ? 0 : start;
          end = end === undefined ? s.length : end;
          special = special === undefined ? null : special;
          Debug.assert(start >= 0 && start <= end && end <= s.length);

          if (special !== null) {
            for (var i = 0; i < special.length; ++i) {
              if (special.charCodeAt(i) < 32 || special.charCodeAt(i) > 126) {
                throw new RangeError("special characters must be in ASCII range 32-126");
              }
            }
          } // Optimization for strings without escapes


          var p = s.indexOf('\\', start);

          if (p == -1 || p >= end) {
            p = start;

            while (p < end) {
              checkChar(s, p++);
            }

            return s.substring(start, end);
          } else {
            var arr = [];

            while (start < end) {
              start = decodeChar(s, start, end, special, arr);
            }

            return arr.join("");
          }
        } //
        // Split string helper; returns null for unmatched quotes
        //

      }, {
        key: "splitString",
        value: function splitString(str, delim) {
          var v = [];
          var s = "";
          var pos = 0;
          var quoteChar = null;

          while (pos < str.length) {
            if (quoteChar === null && (str.charAt(pos) === '"' || str.charAt(pos) === '\'')) {
              quoteChar = str.charAt(pos++);
              continue; // Skip the quote.
            } else if (quoteChar === null && str.charAt(pos) === '\\' && pos + 1 < str.length && (str.charAt(pos + 1) === '"' || str.charAt(pos + 1) === '\'')) {
              ++pos; // Skip the backslash
            } else if (quoteChar !== null && str.charAt(pos) === '\\' && pos + 1 < str.length && str.charAt(pos + 1) === quoteChar) {
              ++pos; // Skip the backslash
            } else if (quoteChar !== null && str.charAt(pos) === quoteChar) {
              ++pos;
              quoteChar = null;
              continue; // Skip the quote.
            } else if (delim.indexOf(str.charAt(pos)) !== -1) {
              if (quoteChar === null) {
                ++pos;

                if (s.length > 0) {
                  v.push(s);
                  s = "";
                }

                continue;
              }
            }

            if (pos < str.length) {
              s += str.charAt(pos++);
            }
          }

          if (s.length > 0) {
            v.push(s);
          }

          if (quoteChar !== null) {
            return null; // Unmatched quote.
          }

          return v;
        } //
        // If a single or double quotation mark is found at the start position,
        // then the position of the matching closing quote is returned. If no
        // quotation mark is found at the start position, then 0 is returned.
        // If no matching closing quote is found, then -1 is returned.
        //

      }, {
        key: "checkQuote",
        value: function checkQuote(s, start) {
          start = start === undefined ? 0 : start;
          var quoteChar = s.charAt(start);

          if (quoteChar == '"' || quoteChar == '\'') {
            start++;
            var pos;

            while (start < s.length && (pos = s.indexOf(quoteChar, start)) != -1) {
              if (s.charAt(pos - 1) != '\\') {
                return pos;
              }

              start = pos + 1;
            }

            return -1; // Unmatched quote
          }

          return 0; // Not quoted
        }
      }, {
        key: "hashCode",
        value: function hashCode(s) {
          var hash = 0;

          for (var i = 0; i < s.length; i++) {
            hash = 31 * hash + s.charCodeAt(i);
          }

          return hash;
        }
      }, {
        key: "toInt",
        value: function toInt(s) {
          var n = parseInt(s, 10);

          if (isNaN(n)) {
            throw new RangeError("conversion of `" + s + "' to int failed");
          }

          return n;
        }
      }]);

      return _class;
    }();

    function encodeChar(c, sb, special, toStringMode) {
      switch (c) {
        case 92:
          // '\\'
          {
            sb.push("\\\\");
            break;
          }

        case 39:
          // '\''
          {
            sb.push("\\'");
            break;
          }

        case 34:
          // '"'
          {
            sb.push("\\\"");
            break;
          }

        case 7:
          // '\a'
          {
            if (toStringMode == Ice.ToStringMode.Compat) {
              // Octal escape for compatibility with 3.6 and earlier
              sb.push("\\007");
            } else {
              sb.push("\\a");
            }

            break;
          }

        case 8:
          // '\b'
          {
            sb.push("\\b");
            break;
          }

        case 12:
          // '\f'
          {
            sb.push("\\f");
            break;
          }

        case 10:
          // '\n'
          {
            sb.push("\\n");
            break;
          }

        case 13:
          // '\r'
          {
            sb.push("\\r");
            break;
          }

        case 9:
          // '\t'
          {
            sb.push("\\t");
            break;
          }

        case 11:
          // '\v'
          {
            if (toStringMode == Ice.ToStringMode.Compat) {
              // Octal escape for compatibility with 3.6 and earlier
              sb.push("\\013");
            } else {
              sb.push("\\v");
            }

            break;
          }

        default:
          {
            var s = String.fromCharCode(c);

            if (special !== null && special.indexOf(s) !== -1) {
              sb.push('\\');
              sb.push(s);
            } else if (c < 32 || c > 126) {
              if (toStringMode === Ice.ToStringMode.Compat) {
                //
                // When ToStringMode=Compat, c is a UTF-8 byte
                //
                Debug.assert(c < 256);
                sb.push('\\');
                var octal = c.toString(8); //
                // Add leading zeroes so that we avoid problems during
                // decoding. For example, consider the encoded string
                // \0013 (i.e., a character with value 1 followed by
                // the character '3'). If the leading zeroes were omitted,
                // the result would be incorrectly interpreted by the
                // decoder as a single character with value 11.
                //

                for (var j = octal.length; j < 3; j++) {
                  sb.push('0');
                }

                sb.push(octal);
              } else if (c < 32 || c == 127 || toStringMode === Ice.ToStringMode.ASCII) {
                // append \\unnnn
                sb.push("\\u");
                var hex = c.toString(16);

                for (var _j = hex.length; _j < 4; _j++) {
                  sb.push('0');
                }

                sb.push(hex);
              } else {
                // keep as is
                sb.push(s);
              }
            } else {
              // printable ASCII character
              sb.push(s);
            }

            break;
          }
      }
    }

    function checkChar(s, pos) {
      var c = s.charCodeAt(pos);

      if (c < 32 || c === 127) {
        var msg;

        if (pos > 0) {
          msg = "character after `" + s.substring(0, pos) + "'";
        } else {
          msg = "first character";
        }

        msg += " has invalid ordinal value" + c;
        throw new RangeError(msg);
      }

      return s.charAt(pos);
    } //
    // Decode the character or escape sequence starting at start and appends it to result;
    // returns the index of the first character following the decoded character
    // or escape sequence.
    //


    function decodeChar(s, start, end, special, result) {
      Debug.assert(start >= 0);
      Debug.assert(start < end);
      Debug.assert(end <= s.length);

      if (s.charAt(start) != '\\') {
        result.push(checkChar(s, start++));
      } else if (start + 1 === end) {
        ++start;
        result.push("\\"); // trailing backslash
      } else {
        var c = s.charAt(++start);

        switch (c) {
          case '\\':
          case '\'':
          case '"':
          case '?':
            {
              ++start;
              result.push(c);
              break;
            }

          case 'a':
            {
              ++start;
              result.append("\x07");
              break;
            }

          case 'b':
            {
              ++start;
              result.push("\b");
              break;
            }

          case 'f':
            {
              ++start;
              result.push("\f");
              break;
            }

          case 'n':
            {
              ++start;
              result.push("\n");
              break;
            }

          case 'r':
            {
              ++start;
              result.push("\r");
              break;
            }

          case 't':
            {
              ++start;
              result.push("\t");
              break;
            }

          case 'v':
            {
              ++start;
              result.push("\v");
              break;
            }

          case 'u':
          case 'U':
            {
              var codePoint = 0;
              var inBMP = c === 'u';
              var size = inBMP ? 4 : 8;
              ++start;

              while (size > 0 && start < end) {
                var charVal = s.charCodeAt(start++);

                if (charVal >= 0x30 && charVal <= 0x39) {
                  charVal -= 0x30;
                } else if (charVal >= 0x61 && charVal <= 0x66) {
                  charVal += 10 - 0x61;
                } else if (charVal >= 0x41 && charVal <= 0x46) {
                  charVal += 10 - 0x41;
                } else {
                  break; // while
                }

                codePoint = codePoint * 16 + charVal;
                --size;
              }

              if (size > 0) {
                throw new RangeError("Invalid universal character name: too few hex digits");
              }

              if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
                throw new RangeError("A universal character name cannot designate a surrogate");
              }

              if (inBMP || codePoint <= 0xFFFF) {
                result.push(String.fromCharCode(codePoint));
              } else {
                result.push(String.fromCodePoint(codePoint));
              }

              break;
            }

          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case 'x':
            {
              // UTF-8 byte sequence encoded with octal or hex escapes
              var arr = [];
              var more = true;

              while (more) {
                var val = 0;

                if (c === 'x') {
                  var _size = 2;
                  ++start;

                  while (_size > 0 && start < end) {
                    var _charVal = s.charCodeAt(start++);

                    if (_charVal >= 0x30 && _charVal <= 0x39) {
                      _charVal -= 0x30;
                    } else if (_charVal >= 0x61 && _charVal <= 0x66) {
                      _charVal += 10 - 0x61;
                    } else if (_charVal >= 0x41 && _charVal <= 0x46) {
                      _charVal += 10 - 0x41;
                    } else {
                      break; // while
                    }

                    val = val * 16 + _charVal;
                    --_size;
                  }

                  if (_size === 2) {
                    throw new RangeError("Invalid \\x escape sequence: no hex digit");
                  }
                } else {
                  for (var j = 0; j < 3 && start < end; ++j) {
                    var _charVal2 = s.charCodeAt(start++) - '0'.charCodeAt(0);

                    if (_charVal2 < 0 || _charVal2 > 7) {
                      --start; // move back

                      Debug.assert(j !== 0); // must be at least one digit

                      break; // for
                    }

                    val = val * 8 + _charVal2;
                  }

                  if (val > 255) {
                    throw new RangeError("octal value \\" + val.toString(8) + " (" + val + ") is out of range");
                  }
                }

                arr.push(String.fromCharCode(val));
                more = false;

                if (start + 1 < end && s.charAt(start) === '\\') {
                  c = s.charAt(start + 1);

                  var _charVal3 = s.charCodeAt(start + 1);

                  if (c === 'x' || _charVal3 >= 0x30 && _charVal3 <= 0x39) {
                    start++;
                    more = true;
                  }
                }
              } // Decode UTF-8 arr into string


              result.push(decodeURIComponent(escape(arr.join(""))));
              break;
            }

          default:
            {
              if (special === null || special.length === 0 || special.indexOf(c) === -1) {
                result.push("\\"); // not in special, so we keep the backslash
              }

              result.push(checkChar(s, start++));
              break;
            }
        }
      }

      return start;
    }
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Using a separate module for these constants so that ObjectPrx does
    // not need to include Reference.
    //
    Ice.ReferenceMode = {
      ModeTwoway: 0,
      ModeOneway: 1,
      ModeBatchOneway: 2,
      ModeDatagram: 3,
      ModeBatchDatagram: 4,
      ModeLast: 4
    };
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    Ice.OptionalFormat = Ice.Slice.defineEnum([['F1', 0], ['F2', 1], ['F4', 2], ['F8', 3], ['Size', 4], ['VSize', 5], ['FSize', 6], ['Class', 7]]);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var defineProperty = Object.defineProperty;
    var OptionalFormat = Ice.OptionalFormat;
    var StreamHelpers = {};

    StreamHelpers.FSizeOptHelper = function () {
      this.writeOptional = function (os, tag, v) {
        if (v !== undefined && os.writeOptional(tag, OptionalFormat.FSize)) {
          var pos = os.startSize();
          this.write(os, v);
          os.endSize(pos);
        }
      };

      this.readOptional = function (is, tag) {
        var v;

        if (is.readOptional(tag, OptionalFormat.FSize)) {
          is.skip(4);
          v = this.read(is);
        }

        return v;
      };
    };

    StreamHelpers.VSizeOptHelper = function () {
      this.writeOptional = function (os, tag, v) {
        if (v !== undefined && os.writeOptional(tag, OptionalFormat.VSize)) {
          os.writeSize(this.minWireSize);
          this.write(os, v);
        }
      };

      this.readOptional = function (is, tag) {
        var v;

        if (is.readOptional(tag, OptionalFormat.VSize)) {
          is.skipSize();
          v = this.read(is);
        }

        return v;
      };
    };

    StreamHelpers.VSizeContainerOptHelper = function (elementSize) {
      this.writeOptional = function (os, tag, v) {
        if (v !== undefined && os.writeOptional(tag, OptionalFormat.VSize)) {
          var sz = this.size(v);
          os.writeSize(sz > 254 ? sz * elementSize + 5 : sz * elementSize + 1);
          this.write(os, v);
        }
      };

      this.readOptional = function (is, tag) {
        var v;

        if (is.readOptional(tag, OptionalFormat.VSize)) {
          is.skipSize();
          v = this.read(is);
        }

        return v;
      };
    };

    StreamHelpers.VSizeContainer1OptHelper = function () {
      this.writeOptional = function (os, tag, v) {
        if (v !== undefined && os.writeOptional(tag, OptionalFormat.VSize)) {
          this.write(os, v);
        }
      };

      this.readOptional = function (is, tag) {
        var v;

        if (is.readOptional(tag, OptionalFormat.VSize)) {
          v = this.read(is);
        }

        return v;
      };
    }; //
    // Sequence helper to write sequences
    //


    var SequenceHelper =
    /*#__PURE__*/
    function () {
      function SequenceHelper() {
        _classCallCheck(this, SequenceHelper);
      }

      _createClass(SequenceHelper, [{
        key: "write",
        value: function write(os, v) {
          if (v === null || v.length === 0) {
            os.writeSize(0);
          } else {
            var helper = this.elementHelper;
            os.writeSize(v.length);

            for (var i = 0; i < v.length; ++i) {
              helper.write(os, v[i]);
            }
          }
        }
      }, {
        key: "read",
        value: function read(is) {
          var helper = this.elementHelper; // Cache the element helper.

          var sz = is.readAndCheckSeqSize(helper.minWireSize);
          var v = [];
          v.length = sz;

          for (var i = 0; i < sz; ++i) {
            v[i] = helper.read(is);
          }

          return v;
        }
      }, {
        key: "size",
        value: function size(v) {
          return v === null || v === undefined ? 0 : v.length;
        }
      }, {
        key: "minWireSize",
        get: function get() {
          return 1;
        }
      }]);

      return SequenceHelper;
    }(); // Speacialization optimized for ByteSeq


    var byteSeqHelper = new SequenceHelper();

    byteSeqHelper.write = function (os, v) {
      return os.writeByteSeq(v);
    };

    byteSeqHelper.read = function (is) {
      return is.readByteSeq();
    };

    defineProperty(byteSeqHelper, "elementHelper", {
      get: function get() {
        return Ice.ByteHelper;
      }
    });
    StreamHelpers.VSizeContainer1OptHelper.call(byteSeqHelper); // Read method for value sequences

    var valueSequenceHelperRead = function valueSequenceHelperRead(is) {
      var sz = is.readAndCheckSeqSize(1);
      var v = [];
      v.length = sz;
      var elementType = this.elementType;

      var readValueAtIndex = function readValueAtIndex(idx) {
        is.readValue(function (obj) {
          v[idx] = obj;
        }, elementType);
      };

      for (var i = 0; i < sz; ++i) {
        readValueAtIndex(i);
      }

      return v;
    };

    StreamHelpers.generateSeqHelper = function (elementHelper, fixed, elementType) {
      if (elementHelper === Ice.ByteHelper) {
        return byteSeqHelper;
      }

      var helper = new SequenceHelper();

      if (fixed) {
        if (elementHelper.minWireSize === 1) {
          StreamHelpers.VSizeContainer1OptHelper.call(helper);
        } else {
          StreamHelpers.VSizeContainerOptHelper.call(helper, elementHelper.minWireSize);
        }
      } else {
        StreamHelpers.FSizeOptHelper.call(helper);
      }

      defineProperty(helper, "elementHelper", {
        get: function get() {
          return elementHelper;
        }
      });

      if (elementHelper == Ice.ObjectHelper) {
        defineProperty(helper, "elementType", {
          get: function get() {
            return elementType;
          }
        });
        helper.read = valueSequenceHelperRead;
      }

      return helper;
    }; //
    // Dictionary helper to write dictionaries
    //


    var DictionaryHelper =
    /*#__PURE__*/
    function () {
      function DictionaryHelper() {
        _classCallCheck(this, DictionaryHelper);
      }

      _createClass(DictionaryHelper, [{
        key: "write",
        value: function write(os, v) {
          if (v === null || v.size === 0) {
            os.writeSize(0);
          } else {
            var keyHelper = this.keyHelper;
            var valueHelper = this.valueHelper;
            os.writeSize(v.size);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = v[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2),
                    key = _step$value[0],
                    value = _step$value[1];

                keyHelper.write(os, key);
                valueHelper.write(os, value);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        }
      }, {
        key: "read",
        value: function read(is) {
          var mapType = this.mapType;
          var v = new mapType();
          var sz = is.readSize();
          var keyHelper = this.keyHelper;
          var valueHelper = this.valueHelper;

          for (var i = 0; i < sz; ++i) {
            v.set(keyHelper.read(is), valueHelper.read(is));
          }

          return v;
        }
      }, {
        key: "size",
        value: function size(v) {
          return v === null || v === undefined ? 0 : v.size;
        }
      }, {
        key: "minWireSize",
        get: function get() {
          return 1;
        }
      }]);

      return DictionaryHelper;
    }(); // Read method for dictionaries of values


    var valueDictionaryHelperRead = function valueDictionaryHelperRead(is) {
      var sz = is.readSize();
      var mapType = this.mapType;
      var v = new mapType();
      var valueType = this.valueType;

      var readValueForKey = function readValueForKey(key) {
        is.readValue(function (obj) {
          return v.set(key, obj);
        }, valueType);
      };

      var keyHelper = this.keyHelper;

      for (var i = 0; i < sz; ++i) {
        readValueForKey(keyHelper.read(is));
      }

      return v;
    };

    StreamHelpers.generateDictHelper = function (keyHelper, valueHelper, fixed, valueType, mapType) {
      var helper = new DictionaryHelper();

      if (fixed) {
        StreamHelpers.VSizeContainerOptHelper.call(helper, keyHelper.minWireSize + valueHelper.minWireSize);
      } else {
        StreamHelpers.FSizeOptHelper.call(helper);
      }

      defineProperty(helper, "mapType", {
        get: function get() {
          return mapType;
        }
      });
      defineProperty(helper, "keyHelper", {
        get: function get() {
          return keyHelper;
        }
      });
      defineProperty(helper, "valueHelper", {
        get: function get() {
          return valueHelper;
        }
      });

      if (valueHelper == Ice.ObjectHelper) {
        defineProperty(helper, "valueType", {
          get: function get() {
            return valueType;
          }
        });
        helper.read = valueDictionaryHelperRead;
      }

      return helper;
    };

    Ice.StreamHelpers = StreamHelpers;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var ReferenceMode = Ice.ReferenceMode;

    var ConnectionRequestHandler =
    /*#__PURE__*/
    function () {
      function ConnectionRequestHandler(ref, connection) {
        _classCallCheck(this, ConnectionRequestHandler);

        this._reference = ref;
        this._response = ref.getMode() == ReferenceMode.ModeTwoway;
        this._connection = connection;
      }

      _createClass(ConnectionRequestHandler, [{
        key: "update",
        value: function update(previousHandler, newHandler) {
          try {
            if (previousHandler === this) {
              return newHandler;
            } else if (previousHandler.getConnection() === this._connection) {
              //
              // If both request handlers point to the same connection, we also
              // update the request handler. See bug ICE-5489 for reasons why
              // this can be useful.
              //
              return newHandler;
            }
          } catch (ex) {// Ignore
          }

          return this;
        }
      }, {
        key: "sendAsyncRequest",
        value: function sendAsyncRequest(out) {
          return out.invokeRemote(this._connection, this._response);
        }
      }, {
        key: "asyncRequestCanceled",
        value: function asyncRequestCanceled(out) {
          return this._connection.asyncRequestCanceled(out);
        }
      }, {
        key: "getReference",
        value: function getReference() {
          return this._reference;
        }
      }, {
        key: "getConnection",
        value: function getConnection() {
          return this._connection;
        }
      }]);

      return ConnectionRequestHandler;
    }();

    Ice.ConnectionRequestHandler = ConnectionRequestHandler;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice.Object
    //
    // Using IceObject in this file to avoid collisions with the native Object.
    //
    Ice.Object =
    /*#__PURE__*/
    function () {
      function _class2() {
        _classCallCheck(this, _class2);
      }

      _createClass(_class2, [{
        key: "ice_isA",
        value: function ice_isA(s, current) {
          return this._iceMostDerivedType()._iceIds.indexOf(s) >= 0;
        }
      }, {
        key: "ice_ping",
        value: function ice_ping(current) {}
      }, {
        key: "ice_ids",
        value: function ice_ids(current) {
          return this._iceMostDerivedType()._iceIds;
        }
      }, {
        key: "ice_id",
        value: function ice_id(current) {
          return this._iceMostDerivedType()._iceId;
        }
      }, {
        key: "toString",
        value: function toString() {
          return "[object " + this.ice_id() + "]";
        } //
        // _iceMostDerivedType returns the the most derived Ice generated class. This is
        // necessary because the user might extend Slice generated classes. The user
        // class extensions don't have _iceId, _iceIds, etc static members so the implementation
        // of ice_id and ice_ids would fail trying to access those members of the user
        // defined class. Instead, ice_id, ice_ids and ice_instanceof call _iceMostDerivedType
        // to get the most derived Ice class.
        //

      }, {
        key: "_iceMostDerivedType",
        value: function _iceMostDerivedType() {
          return Ice.Object;
        } //
        // The default implementation of equals compare references.
        //

      }, {
        key: "equals",
        value: function equals(other) {
          return this === other;
        }
      }], [{
        key: "_iceImplements",
        get: function get() {
          return [];
        }
      }]);

      return _class2;
    }();
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
      return uuid;
    }

    Ice.generateUUID = generateUUID;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var StringUtil = Ice.StringUtil;

    var HashUtil =
    /*#__PURE__*/
    function () {
      function HashUtil() {
        _classCallCheck(this, HashUtil);
      }

      _createClass(HashUtil, null, [{
        key: "addBoolean",
        value: function addBoolean(h, b) {
          return (h << 5) + h ^ (b ? 0 : 1);
        }
      }, {
        key: "addString",
        value: function addString(h, str) {
          if (str !== undefined && str !== null) {
            h = (h << 5) + h ^ StringUtil.hashCode(str);
          }

          return h;
        }
      }, {
        key: "addNumber",
        value: function addNumber(h, num) {
          return (h << 5) + h ^ num;
        }
      }, {
        key: "addHashable",
        value: function addHashable(h, obj) {
          if (obj !== undefined && obj !== null) {
            h = (h << 5) + h ^ obj.hashCode();
          }

          return h;
        }
      }, {
        key: "addArray",
        value: function addArray(h, arr, hashCode) {
          if (arr !== undefined && arr !== null) {
            for (var i = 0; i < arr.length; ++i) {
              h = hashCode(h, arr[i]);
            }
          }

          return h;
        }
      }]);

      return HashUtil;
    }();

    Ice.HashUtil = HashUtil;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var _ModuleRegistry = Ice._ModuleRegistry;
    var StringUtil = Ice.StringUtil;

    function setInternal(map, key, value, hash, index) {
      //
      // Search for an entry with the same key.
      //
      for (var e = map._table[index]; e !== null; e = e._nextInBucket) {
        if (e._hash === hash && map.keysEqual(key, e._key)) {
          //
          // Found a match, update the value.
          //
          e._value = value;
          return undefined;
        }
      } //
      // No match found, add a new entry.
      //


      map.add(key, value, hash, index);
      return undefined;
    }

    function compareEquals(v1, v2) {
      if (v1 === v2) {
        return true;
      }

      if (v1 === undefined || v1 === null || v2 === undefined || v2 === null) {
        return false;
      }

      return v1.equals(v2);
    }

    function compareIdentity(v1, v2) {
      return v1 === v2;
    }

    var HashMap =
    /*#__PURE__*/
    function () {
      function HashMap(arg1, arg2) {
        _classCallCheck(this, HashMap);

        //
        // The first argument can be a HashMap or the keyComparator, the second
        // argument if present is always the value comparator.
        //
        var h, keyComparator, valueComparator;

        if (typeof arg1 == "function") {
          keyComparator = arg1;
          valueComparator = arg2;
        } else if (arg1 instanceof HashMap) {
          h = arg1;
          keyComparator = h.keyComparator;
          valueComparator = h.valueComparator;
        }

        this._size = 0;
        this._head = null;
        this._initialCapacity = 32;
        this._loadFactor = 0.75;
        this._table = [];
        this._keyComparator = typeof keyComparator == "function" ? keyComparator : compareIdentity;
        this._valueComparator = typeof valueComparator == "function" ? valueComparator : compareIdentity;

        if (h instanceof HashMap && h._size > 0) {
          this._threshold = h._threshold;
          this._table.length = h._table.length;

          for (var i = 0; i < h._table.length; i++) {
            this._table[i] = null;
          }

          this.merge(h);
        } else {
          this._threshold = this._initialCapacity * this._loadFactor;

          for (var _i3 = 0; _i3 < this._initialCapacity; _i3++) {
            this._table[_i3] = null;
          }
        }
      }

      _createClass(HashMap, [{
        key: "set",
        value: function set(key, value) {
          var r = this.computeHash(key); // Returns an object with key,hash members.

          var index = this.hashIndex(r.hash, this._table.length);
          return setInternal(this, r.key, value, r.hash, index);
        }
      }, {
        key: "get",
        value: function get(key) {
          var r = this.computeHash(key); // Returns an object with key,hash members.

          var e = this.findEntry(r.key, r.hash);
          return e !== undefined ? e._value : undefined;
        }
      }, {
        key: "has",
        value: function has(key) {
          var r = this.computeHash(key); // Returns an object with key,hash members.

          return this.findEntry(r.key, r.hash) !== undefined;
        }
      }, {
        key: "delete",
        value: function _delete(key) {
          var r = this.computeHash(key); // Returns an object with key,hash members.

          var index = this.hashIndex(r.hash, this._table.length); //
          // Search for an entry with the same key.
          //

          var prev = null;

          for (var e = this._table[index]; e !== null; e = e._nextInBucket) {
            if (e._hash === r.hash && this.keysEqual(r.key, e._key)) {
              //
              // Found a match.
              //
              this._size--; //
              // Remove from bucket.
              //

              if (prev !== null) {
                prev._nextInBucket = e._nextInBucket;
              } else {
                this._table[index] = e._nextInBucket;
              } //
              // Unlink the entry.
              //


              if (e._prev !== null) {
                e._prev._next = e._next;
              }

              if (e._next !== null) {
                e._next._prev = e._prev;
              }

              if (this._head === e) {
                this._head = e._next;
              }

              return e._value;
            }

            prev = e;
          }

          return undefined;
        }
      }, {
        key: "clear",
        value: function clear() {
          for (var i = 0; i < this._table.length; ++i) {
            this._table[i] = null;
          }

          this._head = null;
          this._size = 0;
        }
      }, {
        key: "forEach",
        value: function forEach(fn, obj) {
          obj = obj === undefined ? fn : obj;

          for (var e = this._head; e !== null; e = e._next) {
            fn.call(obj, e._value, e._key);
          }
        }
      }, {
        key: "entries",
        value:
        /*#__PURE__*/
        regeneratorRuntime.mark(function entries() {
          var e;
          return regeneratorRuntime.wrap(function entries$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  e = this._head;

                case 1:
                  if (!(e !== null)) {
                    _context.next = 7;
                    break;
                  }

                  _context.next = 4;
                  return [e._key, e._value];

                case 4:
                  e = e._next;
                  _context.next = 1;
                  break;

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, entries, this);
        })
      }, {
        key: "keys",
        value:
        /*#__PURE__*/
        regeneratorRuntime.mark(function keys() {
          var e;
          return regeneratorRuntime.wrap(function keys$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  e = this._head;

                case 1:
                  if (!(e !== null)) {
                    _context2.next = 7;
                    break;
                  }

                  _context2.next = 4;
                  return e._key;

                case 4:
                  e = e._next;
                  _context2.next = 1;
                  break;

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, keys, this);
        })
      }, {
        key: "values",
        value:
        /*#__PURE__*/
        regeneratorRuntime.mark(function values() {
          var e;
          return regeneratorRuntime.wrap(function values$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  e = this._head;

                case 1:
                  if (!(e !== null)) {
                    _context3.next = 7;
                    break;
                  }

                  _context3.next = 4;
                  return e._value;

                case 4:
                  e = e._next;
                  _context3.next = 1;
                  break;

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, values, this);
        })
      }, {
        key: "equals",
        value: function equals(other, valuesEqual) {
          var _this5 = this;

          if (other === null || !(other instanceof HashMap) || this._size !== other._size) {
            return false;
          }

          var eq;

          if (valuesEqual) {
            eq = valuesEqual;
          } else {
            eq = function eq(v1, v2) {
              return _this5._valueComparator.call(_this5._valueComparator, v1, v2);
            };
          }

          for (var e = this._head; e !== null; e = e._next) {
            var oe = other.findEntry(e._key, e._hash);

            if (oe === undefined || !eq(e._value, oe._value)) {
              return false;
            }
          }

          return true;
        }
      }, {
        key: "merge",
        value: function merge(from) {
          for (var e = from._head; e !== null; e = e._next) {
            setInternal(this, e._key, e._value, e._hash, this.hashIndex(e._hash, this._table.length));
          }
        }
      }, {
        key: "add",
        value: function add(key, value, hash, index) {
          //
          // Create a new table entry.
          //
          var e = Object.create(null, {
            key: {
              enumerable: true,
              get: function get() {
                return this._key;
              }
            },
            value: {
              enumerable: true,
              get: function get() {
                return this._value;
              }
            },
            next: {
              enumerable: true,
              get: function get() {
                return this._next;
              }
            },
            _key: {
              enumerable: false,
              writable: true,
              value: key
            },
            _value: {
              enumerable: false,
              writable: true,
              value: value
            },
            _prev: {
              enumerable: false,
              writable: true,
              value: null
            },
            _next: {
              enumerable: false,
              writable: true,
              value: null
            },
            _nextInBucket: {
              enumerable: false,
              writable: true,
              value: null
            },
            _hash: {
              enumerable: false,
              writable: true,
              value: hash
            }
          });
          e._nextInBucket = this._table[index];
          this._table[index] = e;
          e._next = this._head;

          if (this._head !== null) {
            this._head._prev = e;
          }

          this._head = e;
          this._size++;

          if (this._size >= this._threshold) {
            this.resize(this._table.length * 2);
          }
        }
      }, {
        key: "resize",
        value: function resize(capacity) {
          var newTable = new Array(capacity).fill(null); //
          // Re-assign all entries to buckets.
          //

          for (var e = this._head; e !== null; e = e._next) {
            var index = this.hashIndex(e._hash, capacity);
            e._nextInBucket = newTable[index];
            newTable[index] = e;
          }

          this._table = newTable;
          this._threshold = capacity * this._loadFactor;
        }
      }, {
        key: "findEntry",
        value: function findEntry(key, hash) {
          var index = this.hashIndex(hash, this._table.length); //
          // Search for an entry with the same key.
          //

          for (var e = this._table[index]; e !== null; e = e._nextInBucket) {
            if (e._hash === hash && this.keysEqual(key, e._key)) {
              return e;
            }
          }

          return undefined;
        }
      }, {
        key: "hashIndex",
        value: function hashIndex(hash, len) {
          return hash & len - 1;
        }
      }, {
        key: "computeHash",
        value: function computeHash(v) {
          if (v === 0) {
            return {
              key: 0,
              hash: 0
            };
          }

          if (v === null) {
            if (HashMap._null === null) {
              var uuid = Ice.generateUUID();
              HashMap._null = {
                key: uuid,
                hash: StringUtil.hashCode(uuid)
              };
            }

            return HashMap._null;
          }

          if (v === undefined) {
            throw new RangeError("cannot compute hash for undefined value");
          }

          if (typeof v.hashCode === "function") {
            return {
              key: v,
              hash: v.hashCode()
            };
          }

          var type = _typeof(v);

          if (type === "string" || v instanceof String) {
            return {
              key: v,
              hash: StringUtil.hashCode(v)
            };
          } else if (type === "number" || v instanceof Number) {
            if (isNaN(v)) {
              if (HashMap._nan === null) {
                var _uuid = Ice.generateUUID();

                HashMap._nan = {
                  key: _uuid,
                  hash: StringUtil.hashCode(_uuid)
                };
              }

              return HashMap._nan;
            }

            return {
              key: v,
              hash: v.toFixed(0)
            };
          } else if (type === "boolean" || v instanceof Boolean) {
            return {
              key: v,
              hash: v ? 1 : 0
            };
          }

          throw new RangeError("cannot compute hash for value of type " + type);
        }
      }, {
        key: "keysEqual",
        value: function keysEqual(k1, k2) {
          return this._keyComparator.call(this._keyComparator, k1, k2);
        }
      }, {
        key: "size",
        get: function get() {
          return this._size;
        }
      }]);

      return HashMap;
    }();

    HashMap.prototype[Symbol.iterator] = HashMap.prototype.entries;
    Ice.HashMap = HashMap;
    HashMap.compareEquals = compareEquals;
    HashMap.compareIdentity = compareIdentity;
    HashMap._null = null;
    HashMap._nan = null;
    var Slice = Ice.Slice;

    Slice.defineDictionary = function (module, name, helperName, keyHelper, valueHelper, fixed, keysEqual, valueType) {
      if (keysEqual === undefined) {
        module[name] = Map;
      } else {
        //
        // Define a constructor function for a dictionary whose key type requires
        // comparison using an equals() method instead of the native comparison
        // operators.
        //
        module[name] = function (h) {
          return new HashMap(h || keysEqual);
        };
      }

      var helper = null;
      Object.defineProperty(module, helperName, {
        get: function get() {
          if (helper === null) {
            helper = Ice.StreamHelpers.generateDictHelper(_ModuleRegistry.type(keyHelper), _ModuleRegistry.type(valueHelper), fixed, _ModuleRegistry.type(valueType), module[name]);
          }

          return helper;
        }
      });
    };
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `InstrumentationF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice.Value
    //
    Ice.Value =
    /*#__PURE__*/
    function () {
      function _class3() {
        _classCallCheck(this, _class3);
      }

      _createClass(_class3, [{
        key: "ice_preMarshal",
        value: function ice_preMarshal() {}
      }, {
        key: "ice_postUnmarshal",
        value: function ice_postUnmarshal() {}
      }, {
        key: "ice_getSlicedData",
        value: function ice_getSlicedData() {
          return null;
        }
      }, {
        key: "_iceWrite",
        value: function _iceWrite(os) {
          os.startValue(null);
          writeImpl(this, os, this._iceMostDerivedType());
          os.endValue();
        }
      }, {
        key: "_iceRead",
        value: function _iceRead(is) {
          is.startValue();
          readImpl(this, is, this._iceMostDerivedType());
          is.endValue(false);
        } //
        // These methods are used for object parameters.
        //

      }], [{
        key: "write",
        value: function write(os, v) {
          os.writeValue(v);
        }
      }, {
        key: "writeOptional",
        value: function writeOptional(os, tag, v) {
          os.writeOptionalValue(tag, v);
        }
      }, {
        key: "read",
        value: function read(is) {
          var v = {
            value: null
          };
          is.readValue(function (o) {
            v.value = o;
          }, this);
          return v;
        }
      }, {
        key: "readOptional",
        value: function readOptional(is, tag) {
          var v = {
            value: undefined
          };
          is.readOptionalValue(tag, function (o) {
            v.value = o;
          }, this);
          return v;
        }
      }]);

      return _class3;
    }();

    Ice.InterfaceByValue =
    /*#__PURE__*/
    function (_Ice$Value) {
      _inherits(_class4, _Ice$Value);

      function _class4(id) {
        var _this6;

        _classCallCheck(this, _class4);

        _this6 = _possibleConstructorReturn(this, _getPrototypeOf(_class4).call(this));
        _this6._id = id;
        return _this6;
      }

      _createClass(_class4, [{
        key: "ice_id",
        value: function ice_id() {
          return this._id;
        }
      }, {
        key: "_iceWrite",
        value: function _iceWrite(os) {
          os.startValue(null);
          os.startSlice(this.ice_id(), -1, true);
          os.endSlice();
          os.endValue();
        }
      }, {
        key: "_iceRead",
        value: function _iceRead(is) {
          is.startValue();
          is.startSlice();
          is.endSlice();
          is.endValue(false);
        }
      }]);

      return _class4;
    }(Ice.Value); //
    // Private methods
    //


    var writeImpl = function writeImpl(obj, os, type) {
      //
      // The writeImpl method is a recursive method that goes down the
      // class hierarchy to marshal each slice of the class using the
      // generated _iceWriteMemberImpl method.
      //
      if (type === undefined || type === Ice.Value) {
        return; // Don't marshal anything for Ice.Value
      }

      os.startSlice(type.ice_staticId(), Object.prototype.hasOwnProperty.call(type, '_iceCompactId') ? type._iceCompactId : -1, Object.getPrototypeOf(type) === Ice.Value);

      if (type.prototype.hasOwnProperty('_iceWriteMemberImpl')) {
        type.prototype._iceWriteMemberImpl.call(obj, os);
      }

      os.endSlice();
      writeImpl(obj, os, Object.getPrototypeOf(type));
    };

    var readImpl = function readImpl(obj, is, type) {
      //
      // The readImpl method is a recursive method that goes down the
      // class hierarchy to unmarshal each slice of the class using the
      // generated _iceReadMemberImpl method.
      //
      if (type === undefined || type === Ice.Value) {
        return; // Don't unmarshal anything for Ice.Value
      }

      is.startSlice();

      if (type.prototype.hasOwnProperty('_iceReadMemberImpl')) {
        type.prototype._iceReadMemberImpl.call(obj, is);
      }

      is.endSlice();
      readImpl(obj, is, Object.getPrototypeOf(type));
    };

    function writePreserved(os) {
      //
      // For Slice classes which are marked "preserved", the implementation of this method
      // replaces the Ice.Value.prototype._iceWrite method.
      //
      os.startValue(this._iceSlicedData);
      writeImpl(this, os, this._iceMostDerivedType());
      os.endValue();
    }

    function readPreserved(is) {
      //
      // For Slice classes which are marked "preserved", the implementation of this method
      // replaces the Ice.Value.prototype._iceRead method.
      //
      is.startValue();
      readImpl(this, is, this._iceMostDerivedType());
      this._iceSlicedData = is.endValue(true);
    }

    function ice_getSlicedData() {
      return this._iceSlicedData;
    }

    var Slice = Ice.Slice;

    Slice.defineValue = function (valueType, id, preserved) {
      var compactId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      valueType.prototype.ice_id = function () {
        return id;
      };

      valueType.prototype._iceMostDerivedType = function () {
        return valueType;
      };

      valueType.ice_staticId = function () {
        return id;
      };

      if (preserved) {
        valueType.prototype.ice_getSlicedData = ice_getSlicedData;
        valueType.prototype._iceWrite = writePreserved;
        valueType.prototype._iceRead = readPreserved;
      }

      if (compactId > 0) {
        Ice.CompactIdRegistry.set(compactId, id);
      }
    };

    Slice.defineValue(Ice.Value, "::Ice::Object");
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var ArrayUtil = Ice.ArrayUtil; //
    // Use generic equality test from ArrayUtil.
    //

    var eq = ArrayUtil.eq;

    function equals(other) {
      if (this === other) {
        return true;
      }

      if (other === null || other === undefined) {
        return false;
      }

      if (this.prototype !== other.prototype) {
        return false;
      }

      for (var key in this) {
        var e1 = this[key];
        var e2 = other[key];

        if (typeof e1 == "function") {
          continue; // Don't need to compare functions
        } else if (!eq(e1, e2)) {
          return false;
        }
      }

      return true;
    }

    function clone() {
      var other = new this.constructor();

      for (var key in this) {
        var e = this[key];

        if (e === undefined || e === null) {
          other[key] = e;
        } else if (typeof e == "function") {
          continue;
        } else if (typeof e.clone == "function") {
          other[key] = e.clone();
        } else if (e instanceof Array) {
          other[key] = ArrayUtil.clone(e);
        } else {
          other[key] = e;
        }
      }

      return other;
    }

    function memberHashCode(h, e) {
      if (typeof e.hashCode == "function") {
        return Ice.HashUtil.addHashable(h, e);
      } else if (e instanceof Array) {
        return Ice.HashUtil.addArray(h, e, memberHashCode);
      } else {
        var t = _typeof(e);

        if (e instanceof String || t == "string") {
          return Ice.HashUtil.addString(h, e);
        } else if (e instanceof Number || t == "number") {
          return Ice.HashUtil.addNumber(h, e);
        } else if (e instanceof Boolean || t == "boolean") {
          return Ice.HashUtil.addBoolean(h, e);
        }
      }
    }

    function hashCode() {
      var h = 5381;

      for (var key in this) {
        var e = this[key];

        if (e === undefined || e === null || typeof e == "function") {
          continue;
        }

        h = memberHashCode(h, e);
      }

      return h;
    }

    Ice.Slice.defineStruct = function (obj, legalKeyType, variableLength) {
      obj.prototype.clone = clone;
      obj.prototype.equals = equals; //
      // Only generate hashCode if this structure type is a legal dictionary key type.
      //

      if (legalKeyType) {
        obj.prototype.hashCode = hashCode;
      }

      if (obj.prototype._write && obj.prototype._read) {
        obj.write = function (os, v) {
          if (!v) {
            if (!obj.prototype._nullMarshalValue) {
              obj.prototype._nullMarshalValue = new this();
            }

            v = obj.prototype._nullMarshalValue;
          }

          v._write(os);
        };

        obj.read = function (is, v) {
          if (!v || !(v instanceof this)) {
            v = new this();
          }

          v._read(is);

          return v;
        };

        if (variableLength) {
          Ice.StreamHelpers.FSizeOptHelper.call(obj);
        } else {
          Ice.StreamHelpers.VSizeOptHelper.call(obj);
        }
      }

      return obj;
    };
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ConnectionF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var _codeA = "A".charCodeAt(0);

    var _codea = "a".charCodeAt(0);

    var _code0 = "0".charCodeAt(0);

    function encodeChar(uc) {
      if (uc < 26) {
        return String.fromCharCode(_codeA + uc);
      }

      if (uc < 52) {
        return String.fromCharCode(_codea + (uc - 26));
      }

      if (uc < 62) {
        return String.fromCharCode(_code0 + (uc - 52));
      }

      if (uc == 62) {
        return "+";
      }

      return "/";
    }

    function decodeChar(c) {
      if (c >= 'A' && c <= 'Z') {
        return c.charCodeAt(0) - _codeA;
      }

      if (c >= 'a' && c <= 'z') {
        return c.charCodeAt(0) - _codea + 26;
      }

      if (c >= '0' && c <= '9') {
        return c.charCodeAt(0) - _code0 + 52;
      }

      if (c == '+') {
        return 62;
      }

      return 63;
    }

    var Base64 =
    /*#__PURE__*/
    function () {
      function Base64() {
        _classCallCheck(this, Base64);
      }

      _createClass(Base64, null, [{
        key: "encode",
        // Expects native Buffer
        value: function encode(buf) {
          if (buf === null || buf.length === 0) {
            return "";
          }

          var v = [];
          var by1;
          var by2;
          var by3;
          var by4;
          var by5;
          var by6;
          var by7;

          for (var i = 0; i < buf.length; i += 3) {
            by1 = buf[i] & 0xff;
            by2 = 0;
            by3 = 0;

            if (i + 1 < buf.length) {
              by2 = buf[i + 1] & 0xff;
            }

            if (i + 2 < buf.length) {
              by3 = buf[i + 2] & 0xff;
            }

            by4 = by1 >> 2 & 0xff;
            by5 = ((by1 & 0x3) << 4 | by2 >> 4) & 0xff;
            by6 = ((by2 & 0xf) << 2 | by3 >> 6) & 0xff;
            by7 = by3 & 0x3f;
            v.push(encodeChar(by4));
            v.push(encodeChar(by5));

            if (i + 1 < buf.length) {
              v.push(encodeChar(by6));
            } else {
              v.push("=");
            }

            if (i + 2 < buf.length) {
              v.push(encodeChar(by7));
            } else {
              v.push("=");
            }
          }

          var retval = v.join("");
          var outString = [];
          var iter = 0;

          while (retval.length - iter > 76) {
            outString.push(retval.substring(iter, iter + 76));
            outString.push("\r\n");
            iter += 76;
          }

          outString.push(retval.substring(iter));
          return outString.join("");
        }
      }, {
        key: "decode",
        value: function decode(str) // Returns native Buffer
        {
          var newStr = [];

          for (var j = 0; j < str.length; j++) {
            var c = str.charAt(j);

            if (Base64.isBase64(c)) {
              newStr.push(c);
            }
          }

          if (newStr.length === 0) {
            return null;
          } // Note: This is how we were previously computing the size of the return
          //       sequence.  The method below is more efficient (and correct).
          // size_t lines = str.size() / 78;
          // size_t totalBytes = (lines * 76) + (((str.size() - (lines * 78)) * 3) / 4);
          // Figure out how long the final sequence is going to be.


          var totalBytes = newStr.length * 3 / 4 + 1;
          var retval = new Ice.Buffer();
          retval.resize(totalBytes);
          var by1;
          var by2;
          var by3;
          var by4;
          var c1;
          var c2;
          var c3;
          var c4;

          for (var i = 0; i < newStr.length; i += 4) {
            c1 = "A";
            c2 = "A";
            c3 = "A";
            c4 = "A";
            c1 = newStr[i];

            if (i + 1 < newStr.length) {
              c2 = newStr[i + 1];
            }

            if (i + 2 < newStr.length) {
              c3 = newStr[i + 2];
            }

            if (i + 3 < newStr.length) {
              c4 = newStr[i + 3];
            }

            by1 = decodeChar(c1) & 0xff;
            by2 = decodeChar(c2) & 0xff;
            by3 = decodeChar(c3) & 0xff;
            by4 = decodeChar(c4) & 0xff;
            retval.put(by1 << 2 | by2 >> 4);

            if (c3 != "=") {
              retval.put((by2 & 0xf) << 4 | by3 >> 2);
            }

            if (c4 != "=") {
              retval.put((by3 & 0x3) << 6 | by4);
            }
          }

          return retval.remaining > 0 ? retval.getArrayAt(0, retval.position) : retval.getArrayAt(0);
        }
      }, {
        key: "isBase64",
        value: function isBase64(c) {
          if (c >= 'A' && c <= 'Z') {
            return true;
          }

          if (c >= 'a' && c <= 'z') {
            return true;
          }

          if (c >= '0' && c <= '9') {
            return true;
          }

          if (c == '+') {
            return true;
          }

          if (c == '/') {
            return true;
          }

          if (c == '=') {
            return true;
          }

          return false;
        }
      }]);

      return Base64;
    }();

    Ice.Base64 = Base64;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `BuiltinSequences.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
    Slice.defineSequence(Ice, "BoolSeqHelper", "Ice.BoolHelper", true);
    Slice.defineSequence(Ice, "ByteSeqHelper", "Ice.ByteHelper", true);
    Slice.defineSequence(Ice, "ShortSeqHelper", "Ice.ShortHelper", true);
    Slice.defineSequence(Ice, "IntSeqHelper", "Ice.IntHelper", true);
    Slice.defineSequence(Ice, "LongSeqHelper", "Ice.LongHelper", true);
    Slice.defineSequence(Ice, "FloatSeqHelper", "Ice.FloatHelper", true);
    Slice.defineSequence(Ice, "DoubleSeqHelper", "Ice.DoubleHelper", true);
    Slice.defineSequence(Ice, "StringSeqHelper", "Ice.StringHelper", false);
    Slice.defineSequence(Ice, "ObjectSeqHelper", "Ice.ObjectHelper", false, "Ice.Value");
    Slice.defineSequence(Ice, "ObjectProxySeqHelper", "Ice.ObjectPrx", false);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Identity.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */

    /**
     * The identity of an Ice object. In a proxy, an empty {@link Identity#name} denotes a nil
     * proxy. An identity with an empty {@link Identity#name} and a non-empty {@link Identity#category}
     * is illegal. You cannot add a servant with an empty name to the Active Servant Map.
     *
     * @see ServantLocator
     * @see ObjectAdapter#addServantLocator
     *
     **/
    Ice.Identity =
    /*#__PURE__*/
    function () {
      function _class5() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class5);

        this.name = name;
        this.category = category;
      }

      _createClass(_class5, [{
        key: "_write",
        value: function _write(ostr) {
          ostr.writeString(this.name);
          ostr.writeString(this.category);
        }
      }, {
        key: "_read",
        value: function _read(istr) {
          this.name = istr.readString();
          this.category = istr.readString();
        }
      }], [{
        key: "minWireSize",
        get: function get() {
          return 2;
        }
      }]);

      return _class5;
    }();

    Slice.defineStruct(Ice.Identity, true, true);
    Slice.defineDictionary(Ice, "ObjectDict", "ObjectDictHelper", "Ice.Identity", "Ice.ObjectHelper", false, Ice.HashMap.compareEquals, "Ice.Value");
    Slice.defineSequence(Ice, "IdentitySeqHelper", "Ice.Identity", false);
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ObjectAdapterF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Version.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */

    /**
     * A version structure for the protocol version.
     *
     **/
    Ice.ProtocolVersion =
    /*#__PURE__*/
    function () {
      function _class6() {
        var major = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var minor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, _class6);

        this.major = major;
        this.minor = minor;
      }

      _createClass(_class6, [{
        key: "_write",
        value: function _write(ostr) {
          ostr.writeByte(this.major);
          ostr.writeByte(this.minor);
        }
      }, {
        key: "_read",
        value: function _read(istr) {
          this.major = istr.readByte();
          this.minor = istr.readByte();
        }
      }], [{
        key: "minWireSize",
        get: function get() {
          return 2;
        }
      }]);

      return _class6;
    }();

    Slice.defineStruct(Ice.ProtocolVersion, true, false);
    /**
     * A version structure for the encoding version.
     *
     **/

    Ice.EncodingVersion =
    /*#__PURE__*/
    function () {
      function _class7() {
        var major = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var minor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, _class7);

        this.major = major;
        this.minor = minor;
      }

      _createClass(_class7, [{
        key: "_write",
        value: function _write(ostr) {
          ostr.writeByte(this.major);
          ostr.writeByte(this.minor);
        }
      }, {
        key: "_read",
        value: function _read(istr) {
          this.major = istr.readByte();
          this.minor = istr.readByte();
        }
      }], [{
        key: "minWireSize",
        get: function get() {
          return 2;
        }
      }]);

      return _class7;
    }();

    Slice.defineStruct(Ice.EncodingVersion, true, false);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // jshint browser: true
    //

    /* global WorkerGlobalScope */
    function isIE() {
      return navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.match(/Trident.*rv:11\./);
    }

    function isEdge() {
      return /Edge/.test(navigator.userAgent);
    }

    function isWorker() {
      return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
    }

    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var _nextId = 0;

    var nextId = function nextId() {
      if (_nextId == MAX_SAFE_INTEGER) {
        _nextId = 0;
      }

      return _nextId++;
    };

    var _timers = new Map(); //
    // Create a timer object that uses the default browser methods.
    //


    function createTimerObject() {
      var Timer =
      /*#__PURE__*/
      function () {
        function Timer() {
          _classCallCheck(this, Timer);
        }

        _createClass(Timer, null, [{
          key: "setTimeout",
          value: function (_setTimeout) {
            function setTimeout(_x, _x2) {
              return _setTimeout.apply(this, arguments);
            }

            setTimeout.toString = function () {
              return _setTimeout.toString();
            };

            return setTimeout;
          }(function (cb, ms) {
            return setTimeout(cb, ms);
          })
        }, {
          key: "clearTimeout",
          value: function (_clearTimeout) {
            function clearTimeout(_x3) {
              return _clearTimeout.apply(this, arguments);
            }

            clearTimeout.toString = function () {
              return _clearTimeout.toString();
            };

            return clearTimeout;
          }(function (id) {
            return clearTimeout(id);
          })
        }, {
          key: "setInterval",
          value: function (_setInterval) {
            function setInterval(_x4, _x5) {
              return _setInterval.apply(this, arguments);
            }

            setInterval.toString = function () {
              return _setInterval.toString();
            };

            return setInterval;
          }(function (cb, ms) {
            return setInterval(cb, ms);
          })
        }, {
          key: "clearInterval",
          value: function (_clearInterval) {
            function clearInterval(_x6) {
              return _clearInterval.apply(this, arguments);
            }

            clearInterval.toString = function () {
              return _clearInterval.toString();
            };

            return clearInterval;
          }(function (id) {
            return clearInterval(id);
          })
        }]);

        return Timer;
      }(); //
      // For Browsers that support setImmediate prefer that,
      // otherwise implement it using MessageChannel
      //


      if (isEdge() || isIE()) {
        Timer.setImmediate = function (cb) {
          setImmediate(cb);
        };
      } else {
        //
        // Should be only call for workers
        //
        var channel = new MessageChannel();

        channel.port1.onmessage = function (event) {
          var id = event.data;

          var cb = _timers.get(id);

          if (cb !== undefined) {
            cb.call();

            _timers.delete(id);
          }
        };

        Timer.setImmediate = function (cb) {
          var id = nextId();

          _timers.set(id, cb);

          channel.port2.postMessage(id);
        };
      }

      return Timer;
    }

    var _SetTimeoutType = 0;
    var _SetIntervalType = 1;
    var _SetImmediateType = 2;
    var _ClearTimeoutType = 3;
    var _ClearIntervalType = 4;
    var worker;

    var Timer =
    /*#__PURE__*/
    function () {
      function Timer() {
        _classCallCheck(this, Timer);
      }

      _createClass(Timer, null, [{
        key: "setTimeout",
        value: function setTimeout(cb, ms) {
          var id = nextId();

          _timers.set(id, cb);

          worker.postMessage({
            type: _SetTimeoutType,
            id: id,
            ms: ms
          });
          return id;
        }
      }, {
        key: "clearTimeout",
        value: function clearTimeout(id) {
          _timers.delete(id);

          worker.postMessage({
            type: _ClearTimeoutType,
            id: id
          });
        }
      }, {
        key: "setInterval",
        value: function setInterval(cb, ms) {
          var id = nextId();

          _timers.set(id, cb);

          worker.postMessage({
            type: _SetIntervalType,
            id: id,
            ms: ms
          });
          return id;
        }
      }, {
        key: "clearInterval",
        value: function clearInterval(id) {
          _timers.delete(id);

          worker.postMessage({
            type: _ClearIntervalType,
            id: id
          });
        }
      }, {
        key: "setImmediate",
        value: function setImmediate(cb) {
          var id = nextId();

          _timers.set(id, cb);

          worker.postMessage({
            type: _SetImmediateType,
            id: id
          });
          return id;
        }
      }, {
        key: "onmessage",
        value: function onmessage(e) {
          var cb = _timers.get(e.data.id);

          if (cb !== undefined) {
            cb.call();

            if (e.data.type !== _SetIntervalType) {
              _timers.delete(e.data.id);
            }
          }
        }
      }]);

      return Timer;
    }();

    var workerCode = function workerCode() {
      return "(" + function () {
        //
        // jshint worker: true
        //
        var _wSetTimeoutType = 0;
        var _wSetIntervalType = 1;
        var _wSetImmediateType = 2;
        var _wClearTimeoutType = 3;
        var _wClearIntervalType = 4;
        var timers = {};

        self.onmessage = function (e) {
          if (e.data.type == _wSetTimeoutType) {
            timers[e.data.id] = setTimeout(function () {
              return self.postMessage(e.data);
            }, e.data.ms);
          } else if (e.data.type == _wSetIntervalType) {
            timers[e.data.id] = setInterval(function () {
              return self.postMessage(e.data);
            }, e.data.ms);
          } else if (e.data.type == _wSetImmediateType) {
            self.postMessage(e.data);
          } else if (e.data.type == _wClearTimeoutType) {
            clearTimeout(timers[e.data.id]);
            delete timers[e.data.id];
          } else if (e.data.type == _wClearIntervalType) {
            clearInterval(timers[e.data.id]);
            delete timers[e.data.id];
          }
        }; //
        // jshint worker: false
        //

      }.toString() + "());";
    };

    if (isIE()) {
      //
      // With IE always use the setInterval/setTimeout browser functions directly
      //
      Ice.Timer = createTimerObject();
    } else if (isWorker()) {
      //
      // If we are running in a worker don't spawn a separate worker for the timer
      //
      Ice.Timer = createTimerObject();
    } else if (worker === undefined) {
      var url = URL.createObjectURL(new Blob([workerCode()], {
        type: 'text/javascript'
      }));
      worker = new Worker(url);
      worker.onmessage = Timer.onmessage;
      Ice.Timer = Timer;
    }
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `PluginF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `LocalException.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */

    /**
     * This exception is raised when a failure occurs during initialization.
     *
     **/
    Ice.InitializationException =
    /*#__PURE__*/
    function (_Ice$LocalException) {
      _inherits(_class8, _Ice$LocalException);

      function _class8() {
        var _this7;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class8);

        _this7 = _possibleConstructorReturn(this, _getPrototypeOf(_class8).call(this, _cause));
        _this7.reason = reason;
        return _this7;
      }

      _createClass(_class8, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::InitializationException";
        }
      }]);

      return _class8;
    }(Ice.LocalException);
    /**
     * This exception indicates that a failure occurred while initializing
     * a plug-in.
     *
     **/


    Ice.PluginInitializationException =
    /*#__PURE__*/
    function (_Ice$LocalException2) {
      _inherits(_class9, _Ice$LocalException2);

      function _class9() {
        var _this8;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class9);

        _this8 = _possibleConstructorReturn(this, _getPrototypeOf(_class9).call(this, _cause));
        _this8.reason = reason;
        return _this8;
      }

      _createClass(_class9, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::PluginInitializationException";
        }
      }]);

      return _class9;
    }(Ice.LocalException);
    /**
     * This exception is raised if a feature is requested that is not
     * supported with collocation optimization.
     *
     * @deprecated This exception is no longer used by the Ice run time
     **/


    Ice.CollocationOptimizationException =
    /*#__PURE__*/
    function (_Ice$LocalException3) {
      _inherits(_class10, _Ice$LocalException3);

      function _class10() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class10);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class10).call(this, _cause));
      }

      _createClass(_class10, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::CollocationOptimizationException";
        }
      }]);

      return _class10;
    }(Ice.LocalException);
    /**
     * An attempt was made to register something more than once with
     * the Ice run time.
     *
     * This exception is raised if an attempt is made to register a
     * servant, servant locator, facet, value factory, plug-in, object
     * adapter, object, or user exception factory more than once for the
     * same ID.
     *
     **/


    Ice.AlreadyRegisteredException =
    /*#__PURE__*/
    function (_Ice$LocalException4) {
      _inherits(_class11, _Ice$LocalException4);

      function _class11() {
        var _this9;

        var kindOfObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        var _cause = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        _classCallCheck(this, _class11);

        _this9 = _possibleConstructorReturn(this, _getPrototypeOf(_class11).call(this, _cause));
        _this9.kindOfObject = kindOfObject;
        _this9.id = id;
        return _this9;
      }

      _createClass(_class11, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::AlreadyRegisteredException";
        }
      }]);

      return _class11;
    }(Ice.LocalException);
    /**
     * An attempt was made to find or deregister something that is not
     * registered with the Ice run time or Ice locator.
     *
     * This exception is raised if an attempt is made to remove a servant,
     * servant locator, facet, value factory, plug-in, object adapter,
     * object, or user exception factory that is not currently registered.
     *
     * It's also raised if the Ice locator can't find an object or object
     * adapter when resolving an indirect proxy or when an object adapter
     * is activated.
     *
     **/


    Ice.NotRegisteredException =
    /*#__PURE__*/
    function (_Ice$LocalException5) {
      _inherits(_class12, _Ice$LocalException5);

      function _class12() {
        var _this10;

        var kindOfObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        var _cause = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        _classCallCheck(this, _class12);

        _this10 = _possibleConstructorReturn(this, _getPrototypeOf(_class12).call(this, _cause));
        _this10.kindOfObject = kindOfObject;
        _this10.id = id;
        return _this10;
      }

      _createClass(_class12, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::NotRegisteredException";
        }
      }]);

      return _class12;
    }(Ice.LocalException);
    /**
     * The operation can only be invoked with a twoway request.
     *
     * This exception is raised if an attempt is made to invoke an
     * operation with <code>ice_oneway</code>, <code>ice_batchOneway</code>, <code>ice_datagram</code>,
     * or <code>ice_batchDatagram</code> and the operation has a return value,
     * out-parameters, or an exception specification.
     *
     **/


    Ice.TwowayOnlyException =
    /*#__PURE__*/
    function (_Ice$LocalException6) {
      _inherits(_class13, _Ice$LocalException6);

      function _class13() {
        var _this11;

        var operation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class13);

        _this11 = _possibleConstructorReturn(this, _getPrototypeOf(_class13).call(this, _cause));
        _this11.operation = operation;
        return _this11;
      }

      _createClass(_class13, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::TwowayOnlyException";
        }
      }]);

      return _class13;
    }(Ice.LocalException);
    /**
     * An attempt was made to clone a class that does not support
     * cloning.
     *
     * This exception is raised if <code>ice_clone</code> is called on
     * a class that is derived from an abstract Slice class (that is,
     * a class containing operations), and the derived class does not
     * provide an implementation of the <code>ice_clone</code> operation (C++ only).
     *
     **/


    Ice.CloneNotImplementedException =
    /*#__PURE__*/
    function (_Ice$LocalException7) {
      _inherits(_class14, _Ice$LocalException7);

      function _class14() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class14);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class14).call(this, _cause));
      }

      _createClass(_class14, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::CloneNotImplementedException";
        }
      }]);

      return _class14;
    }(Ice.LocalException);
    /**
     * This exception is raised if an operation call on a server raises an
     * unknown exception. For example, for C++, this exception is raised
     * if the server throws a C++ exception that is not directly or
     * indirectly derived from <code>Ice::LocalException</code> or
     * <code>Ice::UserException</code>.
     *
     **/


    Ice.UnknownException =
    /*#__PURE__*/
    function (_Ice$LocalException8) {
      _inherits(_class15, _Ice$LocalException8);

      function _class15() {
        var _this12;

        var unknown = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class15);

        _this12 = _possibleConstructorReturn(this, _getPrototypeOf(_class15).call(this, _cause));
        _this12.unknown = unknown;
        return _this12;
      }

      _createClass(_class15, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::UnknownException";
        }
      }]);

      return _class15;
    }(Ice.LocalException);
    /**
     * This exception is raised if an operation call on a server raises a
     * local exception. Because local exceptions are not transmitted by
     * the Ice protocol, the client receives all local exceptions raised
     * by the server as {@link UnknownLocalException}. The only exception to this
     * rule are all exceptions derived from {@link RequestFailedException},
     * which are transmitted by the Ice protocol even though they are
     * declared <code>local</code>.
     *
     **/


    Ice.UnknownLocalException =
    /*#__PURE__*/
    function (_Ice$UnknownException) {
      _inherits(_class16, _Ice$UnknownException);

      function _class16(unknown) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class16);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class16).call(this, unknown, _cause));
      }

      _createClass(_class16, null, [{
        key: "_parent",
        get: function get() {
          return Ice.UnknownException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::UnknownLocalException";
        }
      }]);

      return _class16;
    }(Ice.UnknownException);
    /**
     * An operation raised an incorrect user exception.
     *
     * This exception is raised if an operation raises a
     * user exception that is not declared in the exception's
     * <code>throws</code> clause. Such undeclared exceptions are
     * not transmitted from the server to the client by the Ice
     * protocol, but instead the client just gets an
     * {@link UnknownUserException}. This is necessary in order to not violate
     * the contract established by an operation's signature: Only local
     * exceptions and user exceptions declared in the
     * <code>throws</code> clause can be raised.
     *
     **/


    Ice.UnknownUserException =
    /*#__PURE__*/
    function (_Ice$UnknownException2) {
      _inherits(_class17, _Ice$UnknownException2);

      function _class17(unknown) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class17);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class17).call(this, unknown, _cause));
      }

      _createClass(_class17, null, [{
        key: "_parent",
        get: function get() {
          return Ice.UnknownException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::UnknownUserException";
        }
      }]);

      return _class17;
    }(Ice.UnknownException);
    /**
     * This exception is raised if the Ice library version does not match
     * the version in the Ice header files.
     *
     **/


    Ice.VersionMismatchException =
    /*#__PURE__*/
    function (_Ice$LocalException9) {
      _inherits(_class18, _Ice$LocalException9);

      function _class18() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class18);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class18).call(this, _cause));
      }

      _createClass(_class18, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::VersionMismatchException";
        }
      }]);

      return _class18;
    }(Ice.LocalException);
    /**
     * This exception is raised if the {@link Communicator} has been destroyed.
     *
     * @see Communicator#destroy
     *
     **/


    Ice.CommunicatorDestroyedException =
    /*#__PURE__*/
    function (_Ice$LocalException10) {
      _inherits(_class19, _Ice$LocalException10);

      function _class19() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class19);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class19).call(this, _cause));
      }

      _createClass(_class19, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::CommunicatorDestroyedException";
        }
      }]);

      return _class19;
    }(Ice.LocalException);
    /**
     * This exception is raised if an attempt is made to use a deactivated
     * {@link ObjectAdapter}.
     *
     * @see ObjectAdapter#deactivate
     * @see Communicator#shutdown
     *
     **/


    Ice.ObjectAdapterDeactivatedException =
    /*#__PURE__*/
    function (_Ice$LocalException11) {
      _inherits(_class20, _Ice$LocalException11);

      function _class20() {
        var _this13;

        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class20);

        _this13 = _possibleConstructorReturn(this, _getPrototypeOf(_class20).call(this, _cause));
        _this13.name = name;
        return _this13;
      }

      _createClass(_class20, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ObjectAdapterDeactivatedException";
        }
      }]);

      return _class20;
    }(Ice.LocalException);
    /**
     * This exception is raised if an {@link ObjectAdapter} cannot be activated.
     *
     * This happens if the {@link Locator} detects another active {@link ObjectAdapter} with
     * the same adapter id.
     *
     **/


    Ice.ObjectAdapterIdInUseException =
    /*#__PURE__*/
    function (_Ice$LocalException12) {
      _inherits(_class21, _Ice$LocalException12);

      function _class21() {
        var _this14;

        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class21);

        _this14 = _possibleConstructorReturn(this, _getPrototypeOf(_class21).call(this, _cause));
        _this14.id = id;
        return _this14;
      }

      _createClass(_class21, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ObjectAdapterIdInUseException";
        }
      }]);

      return _class21;
    }(Ice.LocalException);
    /**
     * This exception is raised if no suitable endpoint is available.
     *
     **/


    Ice.NoEndpointException =
    /*#__PURE__*/
    function (_Ice$LocalException13) {
      _inherits(_class22, _Ice$LocalException13);

      function _class22() {
        var _this15;

        var proxy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class22);

        _this15 = _possibleConstructorReturn(this, _getPrototypeOf(_class22).call(this, _cause));
        _this15.proxy = proxy;
        return _this15;
      }

      _createClass(_class22, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::NoEndpointException";
        }
      }]);

      return _class22;
    }(Ice.LocalException);
    /**
     * This exception is raised if there was an error while parsing an
     * endpoint.
     *
     **/


    Ice.EndpointParseException =
    /*#__PURE__*/
    function (_Ice$LocalException14) {
      _inherits(_class23, _Ice$LocalException14);

      function _class23() {
        var _this16;

        var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class23);

        _this16 = _possibleConstructorReturn(this, _getPrototypeOf(_class23).call(this, _cause));
        _this16.str = str;
        return _this16;
      }

      _createClass(_class23, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::EndpointParseException";
        }
      }]);

      return _class23;
    }(Ice.LocalException);
    /**
     * This exception is raised if there was an error while parsing an
     * endpoint selection type.
     *
     **/


    Ice.EndpointSelectionTypeParseException =
    /*#__PURE__*/
    function (_Ice$LocalException15) {
      _inherits(_class24, _Ice$LocalException15);

      function _class24() {
        var _this17;

        var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class24);

        _this17 = _possibleConstructorReturn(this, _getPrototypeOf(_class24).call(this, _cause));
        _this17.str = str;
        return _this17;
      }

      _createClass(_class24, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::EndpointSelectionTypeParseException";
        }
      }]);

      return _class24;
    }(Ice.LocalException);
    /**
     * This exception is raised if there was an error while parsing a
     * version.
     *
     **/


    Ice.VersionParseException =
    /*#__PURE__*/
    function (_Ice$LocalException16) {
      _inherits(_class25, _Ice$LocalException16);

      function _class25() {
        var _this18;

        var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class25);

        _this18 = _possibleConstructorReturn(this, _getPrototypeOf(_class25).call(this, _cause));
        _this18.str = str;
        return _this18;
      }

      _createClass(_class25, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::VersionParseException";
        }
      }]);

      return _class25;
    }(Ice.LocalException);
    /**
     * This exception is raised if there was an error while parsing a
     * stringified identity.
     *
     **/


    Ice.IdentityParseException =
    /*#__PURE__*/
    function (_Ice$LocalException17) {
      _inherits(_class26, _Ice$LocalException17);

      function _class26() {
        var _this19;

        var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class26);

        _this19 = _possibleConstructorReturn(this, _getPrototypeOf(_class26).call(this, _cause));
        _this19.str = str;
        return _this19;
      }

      _createClass(_class26, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::IdentityParseException";
        }
      }]);

      return _class26;
    }(Ice.LocalException);
    /**
     * This exception is raised if there was an error while parsing a
     * stringified proxy.
     *
     **/


    Ice.ProxyParseException =
    /*#__PURE__*/
    function (_Ice$LocalException18) {
      _inherits(_class27, _Ice$LocalException18);

      function _class27() {
        var _this20;

        var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class27);

        _this20 = _possibleConstructorReturn(this, _getPrototypeOf(_class27).call(this, _cause));
        _this20.str = str;
        return _this20;
      }

      _createClass(_class27, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ProxyParseException";
        }
      }]);

      return _class27;
    }(Ice.LocalException);
    /**
     * This exception is raised if an illegal identity is encountered.
     *
     **/


    Ice.IllegalIdentityException =
    /*#__PURE__*/
    function (_Ice$LocalException19) {
      _inherits(_class28, _Ice$LocalException19);

      function _class28() {
        var _this21;

        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Ice.Identity();

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class28);

        _this21 = _possibleConstructorReturn(this, _getPrototypeOf(_class28).call(this, _cause));
        _this21.id = id;
        return _this21;
      }

      _createClass(_class28, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::IllegalIdentityException";
        }
      }]);

      return _class28;
    }(Ice.LocalException);
    /**
     * This exception is raised to reject an illegal servant (typically
     * a null servant)
     *
     **/


    Ice.IllegalServantException =
    /*#__PURE__*/
    function (_Ice$LocalException20) {
      _inherits(_class29, _Ice$LocalException20);

      function _class29() {
        var _this22;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class29);

        _this22 = _possibleConstructorReturn(this, _getPrototypeOf(_class29).call(this, _cause));
        _this22.reason = reason;
        return _this22;
      }

      _createClass(_class29, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::IllegalServantException";
        }
      }]);

      return _class29;
    }(Ice.LocalException);
    /**
     * This exception is raised if a request failed. This exception, and
     * all exceptions derived from {@link RequestFailedException}, are
     * transmitted by the Ice protocol, even though they are declared
     * <code>local</code>.
     *
     **/


    Ice.RequestFailedException =
    /*#__PURE__*/
    function (_Ice$LocalException21) {
      _inherits(_class30, _Ice$LocalException21);

      function _class30() {
        var _this23;

        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Ice.Identity();
        var facet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var operation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        var _cause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        _classCallCheck(this, _class30);

        _this23 = _possibleConstructorReturn(this, _getPrototypeOf(_class30).call(this, _cause));
        _this23.id = id;
        _this23.facet = facet;
        _this23.operation = operation;
        return _this23;
      }

      _createClass(_class30, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::RequestFailedException";
        }
      }]);

      return _class30;
    }(Ice.LocalException);
    /**
     * This exception is raised if an object does not exist on the server,
     * that is, if no facets with the given identity exist.
     *
     **/


    Ice.ObjectNotExistException =
    /*#__PURE__*/
    function (_Ice$RequestFailedExc) {
      _inherits(_class31, _Ice$RequestFailedExc);

      function _class31(id, facet, operation) {
        var _cause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        _classCallCheck(this, _class31);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class31).call(this, id, facet, operation, _cause));
      }

      _createClass(_class31, null, [{
        key: "_parent",
        get: function get() {
          return Ice.RequestFailedException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ObjectNotExistException";
        }
      }]);

      return _class31;
    }(Ice.RequestFailedException);
    /**
     * This exception is raised if no facet with the given name exists,
     * but at least one facet with the given identity exists.
     *
     **/


    Ice.FacetNotExistException =
    /*#__PURE__*/
    function (_Ice$RequestFailedExc2) {
      _inherits(_class32, _Ice$RequestFailedExc2);

      function _class32(id, facet, operation) {
        var _cause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        _classCallCheck(this, _class32);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class32).call(this, id, facet, operation, _cause));
      }

      _createClass(_class32, null, [{
        key: "_parent",
        get: function get() {
          return Ice.RequestFailedException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::FacetNotExistException";
        }
      }]);

      return _class32;
    }(Ice.RequestFailedException);
    /**
     * This exception is raised if an operation for a given object does
     * not exist on the server. Typically this is caused by either the
     * client or the server using an outdated Slice specification.
     *
     **/


    Ice.OperationNotExistException =
    /*#__PURE__*/
    function (_Ice$RequestFailedExc3) {
      _inherits(_class33, _Ice$RequestFailedExc3);

      function _class33(id, facet, operation) {
        var _cause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        _classCallCheck(this, _class33);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class33).call(this, id, facet, operation, _cause));
      }

      _createClass(_class33, null, [{
        key: "_parent",
        get: function get() {
          return Ice.RequestFailedException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::OperationNotExistException";
        }
      }]);

      return _class33;
    }(Ice.RequestFailedException);
    /**
     * This exception is raised if a system error occurred in the server
     * or client process. There are many possible causes for such a system
     * exception. For details on the cause, {@link SyscallException#error}
     * should be inspected.
     *
     **/


    Ice.SyscallException =
    /*#__PURE__*/
    function (_Ice$LocalException22) {
      _inherits(_class34, _Ice$LocalException22);

      function _class34() {
        var _this24;

        var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class34);

        _this24 = _possibleConstructorReturn(this, _getPrototypeOf(_class34).call(this, _cause));
        _this24.error = error;
        return _this24;
      }

      _createClass(_class34, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::SyscallException";
        }
      }]);

      return _class34;
    }(Ice.LocalException);
    /**
     * This exception indicates socket errors.
     *
     **/


    Ice.SocketException =
    /*#__PURE__*/
    function (_Ice$SyscallException) {
      _inherits(_class35, _Ice$SyscallException);

      function _class35(error) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class35);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class35).call(this, error, _cause));
      }

      _createClass(_class35, null, [{
        key: "_parent",
        get: function get() {
          return Ice.SyscallException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::SocketException";
        }
      }]);

      return _class35;
    }(Ice.SyscallException);
    /**
     * This exception indicates CFNetwork errors.
     *
     **/


    Ice.CFNetworkException =
    /*#__PURE__*/
    function (_Ice$SocketException) {
      _inherits(_class36, _Ice$SocketException);

      function _class36(error) {
        var _this25;

        var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        var _cause = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        _classCallCheck(this, _class36);

        _this25 = _possibleConstructorReturn(this, _getPrototypeOf(_class36).call(this, error, _cause));
        _this25.domain = domain;
        return _this25;
      }

      _createClass(_class36, null, [{
        key: "_parent",
        get: function get() {
          return Ice.SocketException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::CFNetworkException";
        }
      }]);

      return _class36;
    }(Ice.SocketException);
    /**
     * This exception indicates file errors.
     *
     **/


    Ice.FileException =
    /*#__PURE__*/
    function (_Ice$SyscallException2) {
      _inherits(_class37, _Ice$SyscallException2);

      function _class37(error) {
        var _this26;

        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        var _cause = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        _classCallCheck(this, _class37);

        _this26 = _possibleConstructorReturn(this, _getPrototypeOf(_class37).call(this, error, _cause));
        _this26.path = path;
        return _this26;
      }

      _createClass(_class37, null, [{
        key: "_parent",
        get: function get() {
          return Ice.SyscallException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::FileException";
        }
      }]);

      return _class37;
    }(Ice.SyscallException);
    /**
     * This exception indicates connection failures.
     *
     **/


    Ice.ConnectFailedException =
    /*#__PURE__*/
    function (_Ice$SocketException2) {
      _inherits(_class38, _Ice$SocketException2);

      function _class38(error) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class38);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class38).call(this, error, _cause));
      }

      _createClass(_class38, null, [{
        key: "_parent",
        get: function get() {
          return Ice.SocketException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ConnectFailedException";
        }
      }]);

      return _class38;
    }(Ice.SocketException);
    /**
     * This exception indicates a connection failure for which
     * the server host actively refuses a connection.
     *
     **/


    Ice.ConnectionRefusedException =
    /*#__PURE__*/
    function (_Ice$ConnectFailedExc) {
      _inherits(_class39, _Ice$ConnectFailedExc);

      function _class39(error) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class39);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class39).call(this, error, _cause));
      }

      _createClass(_class39, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ConnectFailedException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ConnectionRefusedException";
        }
      }]);

      return _class39;
    }(Ice.ConnectFailedException);
    /**
     * This exception indicates a lost connection.
     *
     **/


    Ice.ConnectionLostException =
    /*#__PURE__*/
    function (_Ice$SocketException3) {
      _inherits(_class40, _Ice$SocketException3);

      function _class40(error) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class40);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class40).call(this, error, _cause));
      }

      _createClass(_class40, null, [{
        key: "_parent",
        get: function get() {
          return Ice.SocketException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ConnectionLostException";
        }
      }]);

      return _class40;
    }(Ice.SocketException);
    /**
     * This exception indicates a DNS problem. For details on the cause,
     * {@link DNSException#error} should be inspected.
     *
     **/


    Ice.DNSException =
    /*#__PURE__*/
    function (_Ice$LocalException23) {
      _inherits(_class41, _Ice$LocalException23);

      function _class41() {
        var _this27;

        var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var host = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        var _cause = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        _classCallCheck(this, _class41);

        _this27 = _possibleConstructorReturn(this, _getPrototypeOf(_class41).call(this, _cause));
        _this27.error = error;
        _this27.host = host;
        return _this27;
      }

      _createClass(_class41, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::DNSException";
        }
      }]);

      return _class41;
    }(Ice.LocalException);
    /**
     * This exception indicates a request was interrupted.
     *
     **/


    Ice.OperationInterruptedException =
    /*#__PURE__*/
    function (_Ice$LocalException24) {
      _inherits(_class42, _Ice$LocalException24);

      function _class42() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class42);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class42).call(this, _cause));
      }

      _createClass(_class42, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::OperationInterruptedException";
        }
      }]);

      return _class42;
    }(Ice.LocalException);
    /**
     * This exception indicates a timeout condition.
     *
     **/


    Ice.TimeoutException =
    /*#__PURE__*/
    function (_Ice$LocalException25) {
      _inherits(_class43, _Ice$LocalException25);

      function _class43() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class43);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class43).call(this, _cause));
      }

      _createClass(_class43, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::TimeoutException";
        }
      }]);

      return _class43;
    }(Ice.LocalException);
    /**
     * This exception indicates a connection establishment timeout condition.
     *
     **/


    Ice.ConnectTimeoutException =
    /*#__PURE__*/
    function (_Ice$TimeoutException) {
      _inherits(_class44, _Ice$TimeoutException);

      function _class44() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class44);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class44).call(this, _cause));
      }

      _createClass(_class44, null, [{
        key: "_parent",
        get: function get() {
          return Ice.TimeoutException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ConnectTimeoutException";
        }
      }]);

      return _class44;
    }(Ice.TimeoutException);
    /**
     * This exception indicates a connection closure timeout condition.
     *
     **/


    Ice.CloseTimeoutException =
    /*#__PURE__*/
    function (_Ice$TimeoutException2) {
      _inherits(_class45, _Ice$TimeoutException2);

      function _class45() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class45);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class45).call(this, _cause));
      }

      _createClass(_class45, null, [{
        key: "_parent",
        get: function get() {
          return Ice.TimeoutException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::CloseTimeoutException";
        }
      }]);

      return _class45;
    }(Ice.TimeoutException);
    /**
     * This exception indicates that a connection has been shut down because it has been
     * idle for some time.
     *
     **/


    Ice.ConnectionTimeoutException =
    /*#__PURE__*/
    function (_Ice$TimeoutException3) {
      _inherits(_class46, _Ice$TimeoutException3);

      function _class46() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class46);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class46).call(this, _cause));
      }

      _createClass(_class46, null, [{
        key: "_parent",
        get: function get() {
          return Ice.TimeoutException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ConnectionTimeoutException";
        }
      }]);

      return _class46;
    }(Ice.TimeoutException);
    /**
     * This exception indicates that an invocation failed because it timed
     * out.
     *
     **/


    Ice.InvocationTimeoutException =
    /*#__PURE__*/
    function (_Ice$TimeoutException4) {
      _inherits(_class47, _Ice$TimeoutException4);

      function _class47() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class47);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class47).call(this, _cause));
      }

      _createClass(_class47, null, [{
        key: "_parent",
        get: function get() {
          return Ice.TimeoutException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::InvocationTimeoutException";
        }
      }]);

      return _class47;
    }(Ice.TimeoutException);
    /**
     * This exception indicates that an asynchronous invocation failed
     * because it was canceled explicitly by the user.
     *
     **/


    Ice.InvocationCanceledException =
    /*#__PURE__*/
    function (_Ice$LocalException26) {
      _inherits(_class48, _Ice$LocalException26);

      function _class48() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class48);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class48).call(this, _cause));
      }

      _createClass(_class48, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::InvocationCanceledException";
        }
      }]);

      return _class48;
    }(Ice.LocalException);
    /**
     * A generic exception base for all kinds of protocol error
     * conditions.
     *
     **/


    Ice.ProtocolException =
    /*#__PURE__*/
    function (_Ice$LocalException27) {
      _inherits(_class49, _Ice$LocalException27);

      function _class49() {
        var _this28;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class49);

        _this28 = _possibleConstructorReturn(this, _getPrototypeOf(_class49).call(this, _cause));
        _this28.reason = reason;
        return _this28;
      }

      _createClass(_class49, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ProtocolException";
        }
      }]);

      return _class49;
    }(Ice.LocalException);
    /**
     * This exception indicates that a message did not start with the expected
     * magic number ('I', 'c', 'e', 'P').
     *
     **/


    Ice.BadMagicException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio) {
      _inherits(_class50, _Ice$ProtocolExceptio);

      function _class50(reason) {
        var _this29;

        var badMagic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var _cause = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        _classCallCheck(this, _class50);

        _this29 = _possibleConstructorReturn(this, _getPrototypeOf(_class50).call(this, reason, _cause));
        _this29.badMagic = badMagic;
        return _this29;
      }

      _createClass(_class50, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::BadMagicException";
        }
      }]);

      return _class50;
    }(Ice.ProtocolException);
    /**
     * This exception indicates an unsupported protocol version.
     *
     **/


    Ice.UnsupportedProtocolException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio2) {
      _inherits(_class51, _Ice$ProtocolExceptio2);

      function _class51(reason) {
        var _this30;

        var bad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Ice.ProtocolVersion();
        var supported = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Ice.ProtocolVersion();

        var _cause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        _classCallCheck(this, _class51);

        _this30 = _possibleConstructorReturn(this, _getPrototypeOf(_class51).call(this, reason, _cause));
        _this30.bad = bad;
        _this30.supported = supported;
        return _this30;
      }

      _createClass(_class51, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::UnsupportedProtocolException";
        }
      }]);

      return _class51;
    }(Ice.ProtocolException);
    /**
     * This exception indicates an unsupported data encoding version.
     *
     **/


    Ice.UnsupportedEncodingException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio3) {
      _inherits(_class52, _Ice$ProtocolExceptio3);

      function _class52(reason) {
        var _this31;

        var bad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Ice.EncodingVersion();
        var supported = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Ice.EncodingVersion();

        var _cause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        _classCallCheck(this, _class52);

        _this31 = _possibleConstructorReturn(this, _getPrototypeOf(_class52).call(this, reason, _cause));
        _this31.bad = bad;
        _this31.supported = supported;
        return _this31;
      }

      _createClass(_class52, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::UnsupportedEncodingException";
        }
      }]);

      return _class52;
    }(Ice.ProtocolException);
    /**
     * This exception indicates that an unknown protocol message has been received.
     *
     **/


    Ice.UnknownMessageException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio4) {
      _inherits(_class53, _Ice$ProtocolExceptio4);

      function _class53(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class53);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class53).call(this, reason, _cause));
      }

      _createClass(_class53, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::UnknownMessageException";
        }
      }]);

      return _class53;
    }(Ice.ProtocolException);
    /**
     * This exception is raised if a message is received over a connection
     * that is not yet validated.
     *
     **/


    Ice.ConnectionNotValidatedException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio5) {
      _inherits(_class54, _Ice$ProtocolExceptio5);

      function _class54(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class54);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class54).call(this, reason, _cause));
      }

      _createClass(_class54, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ConnectionNotValidatedException";
        }
      }]);

      return _class54;
    }(Ice.ProtocolException);
    /**
     * This exception indicates that a response for an unknown request ID has been
     * received.
     *
     **/


    Ice.UnknownRequestIdException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio6) {
      _inherits(_class55, _Ice$ProtocolExceptio6);

      function _class55(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class55);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class55).call(this, reason, _cause));
      }

      _createClass(_class55, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::UnknownRequestIdException";
        }
      }]);

      return _class55;
    }(Ice.ProtocolException);
    /**
     * This exception indicates that an unknown reply status has been received.
     *
     **/


    Ice.UnknownReplyStatusException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio7) {
      _inherits(_class56, _Ice$ProtocolExceptio7);

      function _class56(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class56);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class56).call(this, reason, _cause));
      }

      _createClass(_class56, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::UnknownReplyStatusException";
        }
      }]);

      return _class56;
    }(Ice.ProtocolException);
    /**
     * This exception indicates that the connection has been gracefully shut down by the
     * server. The operation call that caused this exception has not been
     * executed by the server. In most cases you will not get this
     * exception, because the client will automatically retry the
     * operation call in case the server shut down the connection. However,
     * if upon retry the server shuts down the connection again, and the
     * retry limit has been reached, then this exception is propagated to
     * the application code.
     *
     **/


    Ice.CloseConnectionException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio8) {
      _inherits(_class57, _Ice$ProtocolExceptio8);

      function _class57(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class57);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class57).call(this, reason, _cause));
      }

      _createClass(_class57, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::CloseConnectionException";
        }
      }]);

      return _class57;
    }(Ice.ProtocolException);
    /**
     * This exception is raised by an operation call if the application
     * closes the connection locally using {@link Connection#close}.
     *
     * @see Connection#close
     *
     **/


    Ice.ConnectionManuallyClosedException =
    /*#__PURE__*/
    function (_Ice$LocalException28) {
      _inherits(_class58, _Ice$LocalException28);

      function _class58() {
        var _this32;

        var graceful = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class58);

        _this32 = _possibleConstructorReturn(this, _getPrototypeOf(_class58).call(this, _cause));
        _this32.graceful = graceful;
        return _this32;
      }

      _createClass(_class58, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ConnectionManuallyClosedException";
        }
      }]);

      return _class58;
    }(Ice.LocalException);
    /**
     * This exception indicates that a message size is less
     * than the minimum required size.
     *
     **/


    Ice.IllegalMessageSizeException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio9) {
      _inherits(_class59, _Ice$ProtocolExceptio9);

      function _class59(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class59);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class59).call(this, reason, _cause));
      }

      _createClass(_class59, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::IllegalMessageSizeException";
        }
      }]);

      return _class59;
    }(Ice.ProtocolException);
    /**
     * This exception indicates a problem with compressing or uncompressing data.
     *
     **/


    Ice.CompressionException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio10) {
      _inherits(_class60, _Ice$ProtocolExceptio10);

      function _class60(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class60);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class60).call(this, reason, _cause));
      }

      _createClass(_class60, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::CompressionException";
        }
      }]);

      return _class60;
    }(Ice.ProtocolException);
    /**
     * A datagram exceeds the configured size.
     *
     * This exception is raised if a datagram exceeds the configured send or receive buffer
     * size, or exceeds the maximum payload size of a UDP packet (65507 bytes).
     *
     **/


    Ice.DatagramLimitException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio11) {
      _inherits(_class61, _Ice$ProtocolExceptio11);

      function _class61(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class61);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class61).call(this, reason, _cause));
      }

      _createClass(_class61, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::DatagramLimitException";
        }
      }]);

      return _class61;
    }(Ice.ProtocolException);
    /**
     * This exception is raised for errors during marshaling or unmarshaling data.
     *
     **/


    Ice.MarshalException =
    /*#__PURE__*/
    function (_Ice$ProtocolExceptio12) {
      _inherits(_class62, _Ice$ProtocolExceptio12);

      function _class62(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class62);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class62).call(this, reason, _cause));
      }

      _createClass(_class62, null, [{
        key: "_parent",
        get: function get() {
          return Ice.ProtocolException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::MarshalException";
        }
      }]);

      return _class62;
    }(Ice.ProtocolException);
    /**
     * This exception is raised if inconsistent data is received while unmarshaling a proxy.
     *
     **/


    Ice.ProxyUnmarshalException =
    /*#__PURE__*/
    function (_Ice$MarshalException) {
      _inherits(_class63, _Ice$MarshalException);

      function _class63(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class63);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class63).call(this, reason, _cause));
      }

      _createClass(_class63, null, [{
        key: "_parent",
        get: function get() {
          return Ice.MarshalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ProxyUnmarshalException";
        }
      }]);

      return _class63;
    }(Ice.MarshalException);
    /**
     * This exception is raised if an out-of-bounds condition occurs during unmarshaling.
     *
     **/


    Ice.UnmarshalOutOfBoundsException =
    /*#__PURE__*/
    function (_Ice$MarshalException2) {
      _inherits(_class64, _Ice$MarshalException2);

      function _class64(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class64);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class64).call(this, reason, _cause));
      }

      _createClass(_class64, null, [{
        key: "_parent",
        get: function get() {
          return Ice.MarshalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::UnmarshalOutOfBoundsException";
        }
      }]);

      return _class64;
    }(Ice.MarshalException);
    /**
     * This exception is raised if no suitable value factory was found during
     * unmarshaling of a Slice class instance.
     *
     * @see ValueFactory
     * @see Communicator#getValueFactoryManager
     * @see ValueFactoryManager#add
     * @see ValueFactoryManager#find
     *
     **/


    Ice.NoValueFactoryException =
    /*#__PURE__*/
    function (_Ice$MarshalException3) {
      _inherits(_class65, _Ice$MarshalException3);

      function _class65(reason) {
        var _this33;

        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        var _cause = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        _classCallCheck(this, _class65);

        _this33 = _possibleConstructorReturn(this, _getPrototypeOf(_class65).call(this, reason, _cause));
        _this33.type = type;
        return _this33;
      }

      _createClass(_class65, null, [{
        key: "_parent",
        get: function get() {
          return Ice.MarshalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::NoValueFactoryException";
        }
      }]);

      return _class65;
    }(Ice.MarshalException);
    /**
     * This exception is raised if the type of an unmarshaled Slice class instance does
     * not match its expected type.
     * This can happen if client and server are compiled with mismatched Slice
     * definitions or if a class of the wrong type is passed as a parameter
     * or return value using dynamic invocation. This exception can also be
     * raised if IceStorm is used to send Slice class instances and
     * an operation is subscribed to the wrong topic.
     *
     **/


    Ice.UnexpectedObjectException =
    /*#__PURE__*/
    function (_Ice$MarshalException4) {
      _inherits(_class66, _Ice$MarshalException4);

      function _class66(reason) {
        var _this34;

        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var expectedType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        var _cause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        _classCallCheck(this, _class66);

        _this34 = _possibleConstructorReturn(this, _getPrototypeOf(_class66).call(this, reason, _cause));
        _this34.type = type;
        _this34.expectedType = expectedType;
        return _this34;
      }

      _createClass(_class66, null, [{
        key: "_parent",
        get: function get() {
          return Ice.MarshalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::UnexpectedObjectException";
        }
      }]);

      return _class66;
    }(Ice.MarshalException);
    /**
     * This exception is raised when Ice receives a request or reply
     * message whose size exceeds the limit specified by the
     * <code>Ice.MessageSizeMax</code> property.
     *
     **/


    Ice.MemoryLimitException =
    /*#__PURE__*/
    function (_Ice$MarshalException5) {
      _inherits(_class67, _Ice$MarshalException5);

      function _class67(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class67);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class67).call(this, reason, _cause));
      }

      _createClass(_class67, null, [{
        key: "_parent",
        get: function get() {
          return Ice.MarshalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::MemoryLimitException";
        }
      }]);

      return _class67;
    }(Ice.MarshalException);
    /**
     * This exception is raised when a string conversion to or from UTF-8
     * fails during marshaling or unmarshaling.
     *
     **/


    Ice.StringConversionException =
    /*#__PURE__*/
    function (_Ice$MarshalException6) {
      _inherits(_class68, _Ice$MarshalException6);

      function _class68(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class68);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class68).call(this, reason, _cause));
      }

      _createClass(_class68, null, [{
        key: "_parent",
        get: function get() {
          return Ice.MarshalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::StringConversionException";
        }
      }]);

      return _class68;
    }(Ice.MarshalException);
    /**
     * This exception indicates a malformed data encapsulation.
     *
     **/


    Ice.EncapsulationException =
    /*#__PURE__*/
    function (_Ice$MarshalException7) {
      _inherits(_class69, _Ice$MarshalException7);

      function _class69(reason) {
        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class69);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class69).call(this, reason, _cause));
      }

      _createClass(_class69, null, [{
        key: "_parent",
        get: function get() {
          return Ice.MarshalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::EncapsulationException";
        }
      }]);

      return _class69;
    }(Ice.MarshalException);
    /**
     * This exception is raised if an unsupported feature is used. The
     * unsupported feature string contains the name of the unsupported
     * feature
     *
     **/


    Ice.FeatureNotSupportedException =
    /*#__PURE__*/
    function (_Ice$LocalException29) {
      _inherits(_class70, _Ice$LocalException29);

      function _class70() {
        var _this35;

        var unsupportedFeature = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class70);

        _this35 = _possibleConstructorReturn(this, _getPrototypeOf(_class70).call(this, _cause));
        _this35.unsupportedFeature = unsupportedFeature;
        return _this35;
      }

      _createClass(_class70, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::FeatureNotSupportedException";
        }
      }]);

      return _class70;
    }(Ice.LocalException);
    /**
     * This exception indicates a failure in a security subsystem,
     * such as the IceSSL plug-in.
     *
     **/


    Ice.SecurityException =
    /*#__PURE__*/
    function (_Ice$LocalException30) {
      _inherits(_class71, _Ice$LocalException30);

      function _class71() {
        var _this36;

        var reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        var _cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, _class71);

        _this36 = _possibleConstructorReturn(this, _getPrototypeOf(_class71).call(this, _cause));
        _this36.reason = reason;
        return _this36;
      }

      _createClass(_class71, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::SecurityException";
        }
      }]);

      return _class71;
    }(Ice.LocalException);
    /**
     * This exception indicates that an attempt has been made to
     * change the connection properties of a fixed proxy.
     *
     **/


    Ice.FixedProxyException =
    /*#__PURE__*/
    function (_Ice$LocalException31) {
      _inherits(_class72, _Ice$LocalException31);

      function _class72() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class72);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class72).call(this, _cause));
      }

      _createClass(_class72, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::FixedProxyException";
        }
      }]);

      return _class72;
    }(Ice.LocalException);
    /**
     * Indicates that the response to a request has already been sent;
     * re-dispatching such a request is not possible.
     *
     **/


    Ice.ResponseSentException =
    /*#__PURE__*/
    function (_Ice$LocalException32) {
      _inherits(_class73, _Ice$LocalException32);

      function _class73() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class73);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class73).call(this, _cause));
      }

      _createClass(_class73, null, [{
        key: "_parent",
        get: function get() {
          return Ice.LocalException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ResponseSentException";
        }
      }]);

      return _class73;
    }(Ice.LocalException);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var CommunicatorDestroyedException = Ice.CommunicatorDestroyedException;

    var Timer =
    /*#__PURE__*/
    function () {
      function Timer(logger) {
        _classCallCheck(this, Timer);

        this._logger = logger;
        this._destroyed = false;
        this._tokenId = 0;
        this._tokens = new Map();
      }

      _createClass(Timer, [{
        key: "destroy",
        value: function destroy() {
          var _this37 = this;

          this._tokens.forEach(function (value, key) {
            return _this37.cancel(key);
          });

          this._destroyed = true;

          this._tokens.clear();
        }
      }, {
        key: "schedule",
        value: function schedule(callback, delay) {
          var _this38 = this;

          if (this._destroyed) {
            throw new CommunicatorDestroyedException();
          }

          var token = this._tokenId++;
          var id = Timer.setTimeout(function () {
            return _this38.handleTimeout(token);
          }, delay);

          this._tokens.set(token, {
            callback: callback,
            id: id,
            isInterval: false
          });

          return token;
        }
      }, {
        key: "scheduleRepeated",
        value: function scheduleRepeated(callback, period) {
          var _this39 = this;

          if (this._destroyed) {
            throw new CommunicatorDestroyedException();
          }

          var token = this._tokenId++;
          var id = Timer.setInterval(function () {
            return _this39.handleInterval(token);
          }, period);

          this._tokens.set(token, {
            callback: callback,
            id: id,
            isInterval: true
          });

          return token;
        }
      }, {
        key: "cancel",
        value: function cancel(id) {
          if (this._destroyed) {
            return false;
          }

          var token = this._tokens.get(id);

          if (token === undefined) {
            return false;
          }

          this._tokens.delete(id);

          if (token.isInterval) {
            Timer.clearInterval(token.id);
          } else {
            Timer.clearTimeout(token.id);
          }

          return true;
        }
      }, {
        key: "handleTimeout",
        value: function handleTimeout(id) {
          if (this._destroyed) {
            return;
          }

          var token = this._tokens.get(id);

          if (token !== undefined) {
            this._tokens.delete(id);

            try {
              token.callback();
            } catch (ex) {
              this._logger.warning("uncaught exception while executing timer:\n" + ex);
            }
          }
        }
      }, {
        key: "handleInterval",
        value: function handleInterval(id) {
          if (this._destroyed) {
            return;
          }

          var token = this._tokens.get(id);

          if (token !== undefined) {
            try {
              token.callback();
            } catch (ex) {
              this._logger.warning("uncaught exception while executing timer:\n" + ex);
            }
          }
        }
      }]);

      return Timer;
    }();

    Timer.setTimeout = Ice.Timer.setTimeout;
    Timer.clearTimeout = Ice.Timer.clearTimeout;
    Timer.setInterval = Ice.Timer.setInterval;
    Timer.clearInterval = Ice.Timer.clearInterval;
    Timer.setImmediate = Ice.Timer.setImmediate;
    Ice.Timer = Timer;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Local aliases.
    //
    var UnexpectedObjectException = Ice.UnexpectedObjectException;
    var MemoryLimitException = Ice.MemoryLimitException; //
    // Exception utilities
    //

    Ice.ExUtil = {
      throwUOE: function throwUOE(expectedType, v) {
        var type = v.ice_id();
        throw new UnexpectedObjectException("expected element of type `" + expectedType + "' but received `" + type + "'", type, expectedType);
      },
      throwMemoryLimitException: function throwMemoryLimitException(requested, maximum) {
        throw new MemoryLimitException("requested " + requested + " bytes, maximum allowed is " + maximum + " bytes (see Ice.MessageSizeMax)");
      }
    };
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Logger =
    /*#__PURE__*/
    function () {
      function Logger(prefix) {
        _classCallCheck(this, Logger);

        if (prefix !== undefined && prefix.length > 0) {
          this._prefix = prefix + ": ";
        } else {
          this._prefix = "";
        }

        this._dateformat = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false
        };
      }

      _createClass(Logger, [{
        key: "print",
        value: function print(message) {
          this.write(message, false);
        }
      }, {
        key: "trace",
        value: function trace(category, message) {
          var s = [];
          s.push("-- ");
          s.push(this.timestamp());
          s.push(' ');
          s.push(this._prefix);
          s.push(category);
          s.push(": ");
          s.push(message);
          this.write(s.join(""), true);
        }
      }, {
        key: "warning",
        value: function warning(message) {
          var s = [];
          s.push("-! ");
          s.push(this.timestamp());
          s.push(' ');
          s.push(this._prefix);
          s.push("warning: ");
          s.push(message);
          this.write(s.join(""), true);
        }
      }, {
        key: "error",
        value: function error(message) {
          var s = [];
          s.push("!! ");
          s.push(this.timestamp());
          s.push(' ');
          s.push(this._prefix);
          s.push("error: ");
          s.push(message);
          this.write(s.join(""), true);
        }
      }, {
        key: "cloneWithPrefix",
        value: function cloneWithPrefix(prefix) {
          return new Logger(prefix);
        }
      }, {
        key: "write",
        value: function write(message, indent) {
          if (indent) {
            message = message.replace(/\n/g, "\n   ");
          }

          console.log(message);
        }
      }, {
        key: "timestamp",
        value: function timestamp() {
          var d = new Date();
          return d.toLocaleString("en-US", this._dateformat) + "." + d.getMilliseconds();
        }
      }]);

      return Logger;
    }();

    Ice.Logger = Logger;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var SliceInfo = function SliceInfo() {
      _classCallCheck(this, SliceInfo);

      //
      // The Slice type ID for this slice.
      //
      this.typeId = ""; //
      // The Slice compact type ID for this slice.
      //

      this.compactId = -1; //
      // The encoded bytes for this slice, including the leading size integer.
      //

      this.bytes = []; //
      // The class instances referenced by this slice.
      //

      this.instances = []; //
      // Whether or not the slice contains optional members.
      //

      this.hasOptionalMembers = false; //
      // Whether or not this is the last slice.
      //

      this.isLastSlice = false;
    };

    Ice.SliceInfo = SliceInfo;

    var SlicedData = function SlicedData(slices) {
      _classCallCheck(this, SlicedData);

      this.slices = slices;
    };

    Ice.SlicedData = SlicedData;

    var UnknownSlicedValue =
    /*#__PURE__*/
    function (_Ice$Value2) {
      _inherits(UnknownSlicedValue, _Ice$Value2);

      function UnknownSlicedValue(unknownTypeId) {
        var _this40;

        _classCallCheck(this, UnknownSlicedValue);

        _this40 = _possibleConstructorReturn(this, _getPrototypeOf(UnknownSlicedValue).call(this));
        _this40._unknownTypeId = unknownTypeId;
        return _this40;
      }

      _createClass(UnknownSlicedValue, [{
        key: "ice_getSlicedData",
        value: function ice_getSlicedData() {
          return this._slicedData;
        }
      }, {
        key: "ice_id",
        value: function ice_id() {
          return this._unknownTypeId;
        }
      }, {
        key: "_iceWrite",
        value: function _iceWrite(os) {
          os.startValue(this._slicedData);
          os.endValue();
        }
      }, {
        key: "_iceRead",
        value: function _iceRead(is) {
          is.startValue();
          this._slicedData = is.endValue(true);
        }
      }]);

      return UnknownSlicedValue;
    }(Ice.Value);

    Ice.UnknownSlicedValue = UnknownSlicedValue;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var StringUtil = Ice.StringUtil;
    var Protocol = {};
    Ice.Encoding_1_0 = new Ice.EncodingVersion(1, 0);
    Ice.Encoding_1_1 = new Ice.EncodingVersion(1, 1);
    Ice.Protocol_1_0 = new Ice.ProtocolVersion(1, 0); //
    // Size of the Ice protocol header
    //
    // Magic number (4 bytes)
    // Protocol version major (Byte)
    // Protocol version minor (Byte)
    // Encoding version major (Byte)
    // Encoding version minor (Byte)
    // Message type (Byte)
    // Compression status (Byte)
    // Message size (Int)
    //

    Protocol.headerSize = 14; //
    // The magic number at the front of each message ['I', 'c', 'e', 'P']
    //

    Protocol.magic = new Uint8Array([0x49, 0x63, 0x65, 0x50]); //
    // The current Ice protocol and encoding version
    //

    Protocol.protocolMajor = 1;
    Protocol.protocolMinor = 0;
    Protocol.protocolEncodingMajor = 1;
    Protocol.protocolEncodingMinor = 0;
    Protocol.encodingMajor = 1;
    Protocol.encodingMinor = 1; //
    // The Ice protocol message types
    //

    Protocol.requestMsg = 0;
    Protocol.requestBatchMsg = 1;
    Protocol.replyMsg = 2;
    Protocol.validateConnectionMsg = 3;
    Protocol.closeConnectionMsg = 4; //
    // Reply status
    //

    Protocol.replyOK = 0;
    Protocol.replyUserException = 1;
    Protocol.replyObjectNotExist = 2;
    Protocol.replyFacetNotExist = 3;
    Protocol.replyOperationNotExist = 4;
    Protocol.replyUnknownLocalException = 5;
    Protocol.replyUnknownUserException = 6;
    Protocol.replyUnknownException = 7;
    Protocol.requestHdr = new Uint8Array([Protocol.magic[0], Protocol.magic[1], Protocol.magic[2], Protocol.magic[3], Protocol.protocolMajor, Protocol.protocolMinor, Protocol.protocolEncodingMajor, Protocol.protocolEncodingMinor, Protocol.requestMsg, 0, // Compression status.
    0, 0, 0, 0, // Message size (placeholder).
    0, 0, 0, 0 // Request ID (placeholder).
    ]);
    Protocol.requestBatchHdr = new Uint8Array([Protocol.magic[0], Protocol.magic[1], Protocol.magic[2], Protocol.magic[3], Protocol.protocolMajor, Protocol.protocolMinor, Protocol.protocolEncodingMajor, Protocol.protocolEncodingMinor, Protocol.requestBatchMsg, 0, // Compression status.
    0, 0, 0, 0, // Message size (placeholder).
    0, 0, 0, 0 // Number of requests in batch (placeholder).
    ]);
    Protocol.replyHdr = new Uint8Array([Protocol.magic[0], Protocol.magic[1], Protocol.magic[2], Protocol.magic[3], Protocol.protocolMajor, Protocol.protocolMinor, Protocol.protocolEncodingMajor, Protocol.protocolEncodingMinor, Protocol.replyMsg, 0, // Compression status.
    0, 0, 0, 0 // Message size (placeholder).
    ]);
    Protocol.currentProtocol = new Ice.ProtocolVersion(Protocol.protocolMajor, Protocol.protocolMinor);
    Protocol.currentProtocolEncoding = new Ice.EncodingVersion(Protocol.protocolEncodingMajor, Protocol.protocolEncodingMinor);
    Protocol.currentEncoding = new Ice.EncodingVersion(Protocol.encodingMajor, Protocol.encodingMinor);

    Protocol.checkSupportedProtocol = function (v) {
      if (v.major !== Protocol.currentProtocol.major || v.minor > Protocol.currentProtocol.minor) {
        throw new Ice.UnsupportedProtocolException("", v, Protocol.currentProtocol);
      }
    };

    Protocol.checkSupportedProtocolEncoding = function (v) {
      if (v.major !== Protocol.currentProtocolEncoding.major || v.minor > Protocol.currentProtocolEncoding.minor) {
        throw new Ice.UnsupportedEncodingException("", v, Protocol.currentProtocolEncoding);
      }
    };

    Protocol.checkSupportedEncoding = function (v) {
      if (v.major !== Protocol.currentEncoding.major || v.minor > Protocol.currentEncoding.minor) {
        throw new Ice.UnsupportedEncodingException("", v, Protocol.currentEncoding);
      }
    }; //
    // Either return the given protocol if not compatible, or the greatest
    // supported protocol otherwise.
    //


    Protocol.getCompatibleProtocol = function (v) {
      if (v.major !== Protocol.currentProtocol.major) {
        return v; // Unsupported protocol, return as is.
      } else if (v.minor < Protocol.currentProtocol.minor) {
        return v; // Supported protocol.
      } else {
        //
        // Unsupported but compatible, use the currently supported
        // protocol, that's the best we can do.
        //
        return Protocol.currentProtocol;
      }
    }; //
    // Either return the given encoding if not compatible, or the greatest
    // supported encoding otherwise.
    //


    Protocol.getCompatibleEncoding = function (v) {
      if (v.major !== Protocol.currentEncoding.major) {
        return v; // Unsupported encoding, return as is.
      } else if (v.minor < Protocol.currentEncoding.minor) {
        return v; // Supported encoding.
      } else {
        //
        // Unsupported but compatible, use the currently supported
        // encoding, that's the best we can do.
        //
        return Protocol.currentEncoding;
      }
    };

    Protocol.isSupported = function (version, supported) {
      return version.major === supported.major && version.minor <= supported.minor;
    };
    /**
    * Converts a string to a protocol version.
    *
    * @param version The string to convert.
    *
    * @return The converted protocol version.
    **/


    Ice.stringToProtocolVersion = function (version) {
      return new Ice.ProtocolVersion(stringToMajor(version), stringToMinor(version));
    };
    /**
    * Converts a string to an encoding version.
    *
    * @param version The string to convert.
    *
    * @return The converted object identity.
    **/


    Ice.stringToEncodingVersion = function (version) {
      return new Ice.EncodingVersion(stringToMajor(version), stringToMinor(version));
    };
    /**
    * Converts a protocol version to a string.
    *
    * @param v The protocol version to convert.
    *
    * @return The converted string.
    **/


    Ice.protocolVersionToString = function (v) {
      return majorMinorToString(v.major, v.minor);
    };
    /**
     * Converts an encoding version to a string.
     *
     * @param v The encoding version to convert.
     *
     * @return The converted string.
     **/


    Ice.encodingVersionToString = function (v) {
      return majorMinorToString(v.major, v.minor);
    };

    Protocol.OPTIONAL_END_MARKER = 0xFF;
    Protocol.FLAG_HAS_TYPE_ID_STRING = 1 << 0;
    Protocol.FLAG_HAS_TYPE_ID_INDEX = 1 << 1;
    Protocol.FLAG_HAS_TYPE_ID_COMPACT = 1 << 1 | 1 << 0;
    Protocol.FLAG_HAS_OPTIONAL_MEMBERS = 1 << 2;
    Protocol.FLAG_HAS_INDIRECTION_TABLE = 1 << 3;
    Protocol.FLAG_HAS_SLICE_SIZE = 1 << 4;
    Protocol.FLAG_IS_LAST_SLICE = 1 << 5;
    Ice.Protocol = Protocol;

    function stringToMajor(str) {
      var pos = str.indexOf('.');

      if (pos === -1) {
        throw new Ice.VersionParseException("malformed version value `" + str + "'");
      }

      try {
        var majVersion = StringUtil.toInt(str.substring(0, pos));

        if (majVersion < 1 || majVersion > 255) {
          throw new Ice.VersionParseException("range error in version `" + str + "'");
        }

        return majVersion;
      } catch (ex) {
        throw new Ice.VersionParseException("invalid version value `" + str + "'");
      }
    }

    function stringToMinor(str) {
      var pos = str.indexOf('.');

      if (pos === -1) {
        throw new Ice.VersionParseException("malformed version value `" + str + "'");
      }

      try {
        var minVersion = StringUtil.toInt(str.substring(pos + 1));

        if (minVersion < 0 || minVersion > 255) {
          throw new Ice.VersionParseException("range error in version `" + str + "'");
        }

        return minVersion;
      } catch (ex) {
        throw new Ice.VersionParseException("invalid version value `" + str + "'");
      }
    }

    function majorMinorToString(major, minor) {
      return major + "." + minor;
    }
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var MapUtil =
    /*#__PURE__*/
    function () {
      function MapUtil() {
        _classCallCheck(this, MapUtil);
      }

      _createClass(MapUtil, null, [{
        key: "equals",
        value: function equals(m1, m2) {
          if (m1 === m2) {
            return true;
          } else if (m1.size != m2.size) {
            return false;
          } else {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = m1[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value = _slicedToArray(_step2.value, 2),
                    key = _step2$value[0],
                    value = _step2$value[1];

                if (value === undefined) {
                  if (!m2.has(key)) {
                    return false;
                  } else if (m2.get(key) !== value) {
                    return false;
                  }
                } else if (m2.get(key) !== value) {
                  return false;
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }

          return true;
        }
      }]);

      return MapUtil;
    }();

    Ice.MapUtil = MapUtil;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Current.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
    Slice.defineDictionary(Ice, "Context", "ContextHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
    /**
     * Determines the retry behavior an invocation in case of a (potentially) recoverable error.
     *
     **/

    Ice.OperationMode = Slice.defineEnum([['Normal', 0], ['Nonmutating', 1], ['Idempotent', 2]]);
    /**
     * Information about the current method invocation for servers. Each
     * operation on the server has a <code>Current</code> as its implicit final
     * parameter. <code>Current</code> is mostly used for Ice services. Most
     * applications ignore this parameter.
     *
     **/

    Ice.Current =
    /*#__PURE__*/
    function () {
      function _class74() {
        var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var con = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Ice.Identity();
        var facet = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        var operation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
        var mode = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Ice.OperationMode.Normal;
        var ctx = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
        var requestId = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
        var encoding = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : new Ice.EncodingVersion();

        _classCallCheck(this, _class74);

        this.adapter = adapter;
        this.con = con;
        this.id = id;
        this.facet = facet;
        this.operation = operation;
        this.mode = mode;
        this.ctx = ctx;
        this.requestId = requestId;
        this.encoding = encoding;
      }

      return _class74;
    }();

    Slice.defineStruct(Ice.Current, false, true);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    Ice.Property =
    /*#__PURE__*/
    function () {
      function _class75(pattern, deprecated, deprecatedBy) {
        _classCallCheck(this, _class75);

        this._pattern = pattern;
        this._deprecated = deprecated;
        this._deprecatedBy = deprecatedBy;
      }

      _createClass(_class75, [{
        key: "pattern",
        get: function get() {
          return this._pattern;
        }
      }, {
        key: "deprecated",
        get: function get() {
          return this._deprecated;
        }
      }, {
        key: "deprecatedBy",
        get: function get() {
          return this._deprecatedBy;
        }
      }]);

      return _class75;
    }();
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    // Generated by makeprops.py from file ../config/PropertyNames.xml, Thu Oct 25 22:10:11 2018
    // IMPORTANT: Do not edit this file -- any edits made here will be lost!

    /* eslint comma-dangle: "off" */

    /* eslint array-bracket-newline: "off" */

    /* eslint no-useless-escape: "off" */
    var PropertyNames = {};
    var Property = Ice.Property;
    PropertyNames.IceProps = [new Property("/^Ice\.ACM\.Client/", true, null), new Property("/^Ice\.ACM\.Server/", true, null), new Property("/^Ice\.ACM\.Timeout/", false, null), new Property("/^Ice\.ACM\.Heartbeat/", false, null), new Property("/^Ice\.ACM\.Close/", false, null), new Property("/^Ice\.ACM/", false, null), new Property("/^Ice\.ACM\.Client\.Timeout/", false, null), new Property("/^Ice\.ACM\.Client\.Heartbeat/", false, null), new Property("/^Ice\.ACM\.Client\.Close/", false, null), new Property("/^Ice\.ACM\.Client/", false, null), new Property("/^Ice\.ACM\.Server\.Timeout/", false, null), new Property("/^Ice\.ACM\.Server\.Heartbeat/", false, null), new Property("/^Ice\.ACM\.Server\.Close/", false, null), new Property("/^Ice\.ACM\.Server/", false, null), new Property("/^Ice\.Admin\.ACM\.Timeout/", false, null), new Property("/^Ice\.Admin\.ACM\.Heartbeat/", false, null), new Property("/^Ice\.Admin\.ACM\.Close/", false, null), new Property("/^Ice\.Admin\.ACM/", false, null), new Property("/^Ice\.Admin\.AdapterId/", false, null), new Property("/^Ice\.Admin\.Endpoints/", false, null), new Property("/^Ice\.Admin\.Locator\.EndpointSelection/", false, null), new Property("/^Ice\.Admin\.Locator\.ConnectionCached/", false, null), new Property("/^Ice\.Admin\.Locator\.PreferSecure/", false, null), new Property("/^Ice\.Admin\.Locator\.LocatorCacheTimeout/", false, null), new Property("/^Ice\.Admin\.Locator\.InvocationTimeout/", false, null), new Property("/^Ice\.Admin\.Locator\.Locator/", false, null), new Property("/^Ice\.Admin\.Locator\.Router/", false, null), new Property("/^Ice\.Admin\.Locator\.CollocationOptimized/", false, null), new Property("/^Ice\.Admin\.Locator\.Context\../", false, null), new Property("/^Ice\.Admin\.Locator/", false, null), new Property("/^Ice\.Admin\.PublishedEndpoints/", false, null), new Property("/^Ice\.Admin\.ReplicaGroupId/", false, null), new Property("/^Ice\.Admin\.Router\.EndpointSelection/", false, null), new Property("/^Ice\.Admin\.Router\.ConnectionCached/", false, null), new Property("/^Ice\.Admin\.Router\.PreferSecure/", false, null), new Property("/^Ice\.Admin\.Router\.LocatorCacheTimeout/", false, null), new Property("/^Ice\.Admin\.Router\.InvocationTimeout/", false, null), new Property("/^Ice\.Admin\.Router\.Locator/", false, null), new Property("/^Ice\.Admin\.Router\.Router/", false, null), new Property("/^Ice\.Admin\.Router\.CollocationOptimized/", false, null), new Property("/^Ice\.Admin\.Router\.Context\../", false, null), new Property("/^Ice\.Admin\.Router/", false, null), new Property("/^Ice\.Admin\.ProxyOptions/", false, null), new Property("/^Ice\.Admin\.ThreadPool\.Size/", false, null), new Property("/^Ice\.Admin\.ThreadPool\.SizeMax/", false, null), new Property("/^Ice\.Admin\.ThreadPool\.SizeWarn/", false, null), new Property("/^Ice\.Admin\.ThreadPool\.StackSize/", false, null), new Property("/^Ice\.Admin\.ThreadPool\.Serialize/", false, null), new Property("/^Ice\.Admin\.ThreadPool\.ThreadIdleTime/", false, null), new Property("/^Ice\.Admin\.ThreadPool\.ThreadPriority/", false, null), new Property("/^Ice\.Admin\.MessageSizeMax/", false, null), new Property("/^Ice\.Admin\.DelayCreation/", false, null), new Property("/^Ice\.Admin\.Enabled/", false, null), new Property("/^Ice\.Admin\.Facets/", false, null), new Property("/^Ice\.Admin\.InstanceName/", false, null), new Property("/^Ice\.Admin\.Logger\.KeepLogs/", false, null), new Property("/^Ice\.Admin\.Logger\.KeepTraces/", false, null), new Property("/^Ice\.Admin\.Logger\.Properties/", false, null), new Property("/^Ice\.Admin\.ServerId/", false, null), new Property("/^Ice\.BackgroundLocatorCacheUpdates/", false, null), new Property("/^Ice\.BatchAutoFlush/", true, null), new Property("/^Ice\.BatchAutoFlushSize/", false, null), new Property("/^Ice\.ChangeUser/", false, null), new Property("/^Ice\.ClassGraphDepthMax/", false, null), new Property("/^Ice\.ClientAccessPolicyProtocol/", false, null), new Property("/^Ice\.Compression\.Level/", false, null), new Property("/^Ice\.CollectObjects/", false, null), new Property("/^Ice\.Config/", false, null), new Property("/^Ice\.ConsoleListener/", false, null), new Property("/^Ice\.Default\.CollocationOptimized/", false, null), new Property("/^Ice\.Default\.EncodingVersion/", false, null), new Property("/^Ice\.Default\.EndpointSelection/", false, null), new Property("/^Ice\.Default\.Host/", false, null), new Property("/^Ice\.Default\.Locator\.EndpointSelection/", false, null), new Property("/^Ice\.Default\.Locator\.ConnectionCached/", false, null), new Property("/^Ice\.Default\.Locator\.PreferSecure/", false, null), new Property("/^Ice\.Default\.Locator\.LocatorCacheTimeout/", false, null), new Property("/^Ice\.Default\.Locator\.InvocationTimeout/", false, null), new Property("/^Ice\.Default\.Locator\.Locator/", false, null), new Property("/^Ice\.Default\.Locator\.Router/", false, null), new Property("/^Ice\.Default\.Locator\.CollocationOptimized/", false, null), new Property("/^Ice\.Default\.Locator\.Context\../", false, null), new Property("/^Ice\.Default\.Locator/", false, null), new Property("/^Ice\.Default\.LocatorCacheTimeout/", false, null), new Property("/^Ice\.Default\.InvocationTimeout/", false, null), new Property("/^Ice\.Default\.Package/", false, null), new Property("/^Ice\.Default\.PreferSecure/", false, null), new Property("/^Ice\.Default\.Protocol/", false, null), new Property("/^Ice\.Default\.Router\.EndpointSelection/", false, null), new Property("/^Ice\.Default\.Router\.ConnectionCached/", false, null), new Property("/^Ice\.Default\.Router\.PreferSecure/", false, null), new Property("/^Ice\.Default\.Router\.LocatorCacheTimeout/", false, null), new Property("/^Ice\.Default\.Router\.InvocationTimeout/", false, null), new Property("/^Ice\.Default\.Router\.Locator/", false, null), new Property("/^Ice\.Default\.Router\.Router/", false, null), new Property("/^Ice\.Default\.Router\.CollocationOptimized/", false, null), new Property("/^Ice\.Default\.Router\.Context\../", false, null), new Property("/^Ice\.Default\.Router/", false, null), new Property("/^Ice\.Default\.SlicedFormat/", false, null), new Property("/^Ice\.Default\.SourceAddress/", false, null), new Property("/^Ice\.Default\.Timeout/", false, null), new Property("/^Ice\.EventLog\.Source/", false, null), new Property("/^Ice\.FactoryAssemblies/", false, null), new Property("/^Ice\.HTTPProxyHost/", false, null), new Property("/^Ice\.HTTPProxyPort/", false, null), new Property("/^Ice\.ImplicitContext/", false, null), new Property("/^Ice\.InitPlugins/", false, null), new Property("/^Ice\.IPv4/", false, null), new Property("/^Ice\.IPv6/", false, null), new Property("/^Ice\.LogFile/", false, null), new Property("/^Ice\.LogFile\.SizeMax/", false, null), new Property("/^Ice\.LogStdErr\.Convert/", false, null), new Property("/^Ice\.MessageSizeMax/", false, null), new Property("/^Ice\.Nohup/", false, null), new Property("/^Ice\.NullHandleAbort/", false, null), new Property("/^Ice\.Override\.CloseTimeout/", false, null), new Property("/^Ice\.Override\.Compress/", false, null), new Property("/^Ice\.Override\.ConnectTimeout/", false, null), new Property("/^Ice\.Override\.Timeout/", false, null), new Property("/^Ice\.Override\.Secure/", false, null), new Property("/^Ice\.Package\../", false, null), new Property("/^Ice\.Plugin\../", false, null), new Property("/^Ice\.PluginLoadOrder/", false, null), new Property("/^Ice\.PreferIPv6Address/", false, null), new Property("/^Ice\.PreloadAssemblies/", false, null), new Property("/^Ice\.PrintAdapterReady/", false, null), new Property("/^Ice\.PrintProcessId/", false, null), new Property("/^Ice\.PrintStackTraces/", false, null), new Property("/^Ice\.ProgramName/", false, null), new Property("/^Ice\.RetryIntervals/", false, null), new Property("/^Ice\.ServerIdleTime/", false, null), new Property("/^Ice\.SOCKSProxyHost/", false, null), new Property("/^Ice\.SOCKSProxyPort/", false, null), new Property("/^Ice\.StdErr/", false, null), new Property("/^Ice\.StdOut/", false, null), new Property("/^Ice\.SyslogFacility/", false, null), new Property("/^Ice\.ThreadPool\.Client\.Size/", false, null), new Property("/^Ice\.ThreadPool\.Client\.SizeMax/", false, null), new Property("/^Ice\.ThreadPool\.Client\.SizeWarn/", false, null), new Property("/^Ice\.ThreadPool\.Client\.StackSize/", false, null), new Property("/^Ice\.ThreadPool\.Client\.Serialize/", false, null), new Property("/^Ice\.ThreadPool\.Client\.ThreadIdleTime/", false, null), new Property("/^Ice\.ThreadPool\.Client\.ThreadPriority/", false, null), new Property("/^Ice\.ThreadPool\.Server\.Size/", false, null), new Property("/^Ice\.ThreadPool\.Server\.SizeMax/", false, null), new Property("/^Ice\.ThreadPool\.Server\.SizeWarn/", false, null), new Property("/^Ice\.ThreadPool\.Server\.StackSize/", false, null), new Property("/^Ice\.ThreadPool\.Server\.Serialize/", false, null), new Property("/^Ice\.ThreadPool\.Server\.ThreadIdleTime/", false, null), new Property("/^Ice\.ThreadPool\.Server\.ThreadPriority/", false, null), new Property("/^Ice\.ThreadPriority/", false, null), new Property("/^Ice\.ToStringMode/", false, null), new Property("/^Ice\.Trace\.Admin\.Properties/", false, null), new Property("/^Ice\.Trace\.Admin\.Logger/", false, null), new Property("/^Ice\.Trace\.Locator/", false, null), new Property("/^Ice\.Trace\.Network/", false, null), new Property("/^Ice\.Trace\.Protocol/", false, null), new Property("/^Ice\.Trace\.Retry/", false, null), new Property("/^Ice\.Trace\.Slicing/", false, null), new Property("/^Ice\.Trace\.ThreadPool/", false, null), new Property("/^Ice\.UDP\.RcvSize/", false, null), new Property("/^Ice\.UDP\.SndSize/", false, null), new Property("/^Ice\.TCP\.Backlog/", false, null), new Property("/^Ice\.TCP\.RcvSize/", false, null), new Property("/^Ice\.TCP\.SndSize/", false, null), new Property("/^Ice\.UseApplicationClassLoader/", false, null), new Property("/^Ice\.UseSyslog/", false, null), new Property("/^Ice\.UseSystemdJournal/", false, null), new Property("/^Ice\.Warn\.AMICallback/", false, null), new Property("/^Ice\.Warn\.Connections/", false, null), new Property("/^Ice\.Warn\.Datagrams/", false, null), new Property("/^Ice\.Warn\.Dispatch/", false, null), new Property("/^Ice\.Warn\.Endpoints/", false, null), new Property("/^Ice\.Warn\.UnknownProperties/", false, null), new Property("/^Ice\.Warn\.UnusedProperties/", false, null), new Property("/^Ice\.CacheMessageBuffers/", false, null), new Property("/^Ice\.ThreadInterruptSafe/", false, null), new Property("/^Ice\.Voip/", true, null)];
    PropertyNames.validProps = [PropertyNames.IceProps];
    PropertyNames.clPropNames = ["Ice"];
    Ice.PropertyNames = PropertyNames;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Timer = Ice.Timer;

    var P =
    /*#__PURE__*/
    function (_Promise2) {
      _inherits(P, _Promise2);

      function P(cb) {
        var _this41;

        _classCallCheck(this, P);

        var res;
        var rej;
        _this41 = _possibleConstructorReturn(this, _getPrototypeOf(P).call(this, function (resolve, reject) {
          res = resolve;
          rej = reject;

          if (cb !== undefined) {
            cb(resolve, reject);
          }
        }));
        _this41.resolve = res;
        _this41.reject = rej;
        return _this41;
      }

      _createClass(P, [{
        key: "delay",
        value: function delay(ms) {
          return this.then(function (value) {
            return new P(function (resolve, reject) {
              return Timer.setTimeout(function () {
                return resolve(value);
              }, ms);
            });
          }, function (reason) {
            return new P(function (resolve, reject) {
              return Timer.setTimeout(function () {
                return reject(reason);
              }, ms);
            });
          });
        }
      }], [{
        key: "delay",
        value: function delay(ms, value) {
          return new P(function (resolve) {
            return Timer.setTimeout(function () {
              return resolve(value);
            }, ms);
          });
        }
      }, {
        key: "try",
        value: function _try(cb) {
          return P.resolve().then(cb);
        }
      }, {
        key: Symbol.species,
        get: function get() {
          return P;
        }
      }]);

      return P;
    }(_wrapNativeSuper(Promise));

    Ice.Promise = P;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var AsyncResultBase =
    /*#__PURE__*/
    function (_Ice$Promise) {
      _inherits(AsyncResultBase, _Ice$Promise);

      function AsyncResultBase(communicator, op, connection, proxy, adapter) {
        var _this42;

        _classCallCheck(this, AsyncResultBase);

        _this42 = _possibleConstructorReturn(this, _getPrototypeOf(AsyncResultBase).call(this));
        _this42._communicator = communicator;
        _this42._instance = communicator !== null ? communicator.instance : null;
        _this42._operation = op;
        _this42._connection = connection;
        _this42._proxy = proxy;
        _this42._adapter = adapter;
        return _this42;
      }

      _createClass(AsyncResultBase, [{
        key: "communicator",
        get: function get() {
          return this._communicator;
        }
      }, {
        key: "connection",
        get: function get() {
          return this._connection;
        }
      }, {
        key: "proxy",
        get: function get() {
          return this._proxy;
        }
      }, {
        key: "adapter",
        get: function get() {
          return this._adapter;
        }
      }, {
        key: "operation",
        get: function get() {
          return this._operation;
        }
      }]);

      return AsyncResultBase;
    }(Ice.Promise);

    Ice.AsyncResultBase = AsyncResultBase;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Local aliases.
    //
    var Debug = Ice.Debug;
    var Protocol = Ice.Protocol;
    var StringUtil = Ice.StringUtil;
    var OperationMode = Ice.OperationMode;
    var Identity = Ice.Identity;
    var slicingIds = new Map();

    function printIdentityFacetOperation(s, stream) {
      var toStringMode = Ice.ToStringMode.Unicode;

      if (stream.instance !== null) {
        toStringMode = stream.instance.toStringMode();
      }

      var identity = new Identity();

      identity._read(stream);

      s.push("\nidentity = " + Ice.identityToString(identity, toStringMode));
      var facet = Ice.StringSeqHelper.read(stream);
      s.push("\nfacet = ");

      if (facet.length > 0) {
        s.push(StringUtil.escapeString(facet[0], "", toStringMode));
      }

      var operation = stream.readString();
      s.push("\noperation = " + operation);
    }

    function printRequest(s, stream) {
      var requestId = stream.readInt();
      s.push("\nrequest id = " + requestId);

      if (requestId === 0) {
        s.push(" (oneway)");
      }

      printRequestHeader(s, stream);
    }

    function printBatchRequest(s, stream) {
      var batchRequestNum = stream.readInt();
      s.push("\nnumber of requests = " + batchRequestNum);

      for (var i = 0; i < batchRequestNum; ++i) {
        s.push("\nrequest #" + i + ':');
        printRequestHeader(s, stream);
      }
    }

    function printReply(s, stream) {
      var requestId = stream.readInt();
      s.push("\nrequest id = " + requestId);
      var replyStatus = stream.readByte();
      s.push("\nreply status = " + replyStatus + ' ');

      switch (replyStatus) {
        case Protocol.replyOK:
          {
            s.push("(ok)");
            break;
          }

        case Protocol.replyUserException:
          {
            s.push("(user exception)");
            break;
          }

        case Protocol.replyObjectNotExist:
        case Protocol.replyFacetNotExist:
        case Protocol.replyOperationNotExist:
          {
            switch (replyStatus) {
              case Protocol.replyObjectNotExist:
                {
                  s.push("(object not exist)");
                  break;
                }

              case Protocol.replyFacetNotExist:
                {
                  s.push("(facet not exist)");
                  break;
                }

              case Protocol.replyOperationNotExist:
                {
                  s.push("(operation not exist)");
                  break;
                }

              default:
                {
                  Debug.assert(false);
                  break;
                }
            }

            printIdentityFacetOperation(s, stream);
            break;
          }

        case Protocol.replyUnknownException:
        case Protocol.replyUnknownLocalException:
        case Protocol.replyUnknownUserException:
          {
            switch (replyStatus) {
              case Protocol.replyUnknownException:
                {
                  s.push("(unknown exception)");
                  break;
                }

              case Protocol.replyUnknownLocalException:
                {
                  s.push("(unknown local exception)");
                  break;
                }

              case Protocol.replyUnknownUserException:
                {
                  s.push("(unknown user exception)");
                  break;
                }

              default:
                {
                  Debug.assert(false);
                  break;
                }
            }

            var unknown = stream.readString();
            s.push("\nunknown = " + unknown);
            break;
          }

        default:
          {
            s.push("(unknown)");
            break;
          }
      }

      if (replyStatus === Protocol.replyOK || replyStatus === Protocol.replyUserException) {
        var ver = stream.skipEncapsulation();

        if (!ver.equals(Ice.Encoding_1_0)) {
          s.push("\nencoding = ");
          s.push(Ice.encodingVersionToString(ver));
        }
      }
    }

    function printRequestHeader(s, stream) {
      printIdentityFacetOperation(s, stream);
      var mode = stream.readByte();
      s.push("\nmode = " + mode + ' ');

      switch (OperationMode.valueOf(mode)) {
        case OperationMode.Normal:
          {
            s.push("(normal)");
            break;
          }

        case OperationMode.Nonmutating:
          {
            s.push("(nonmutating)");
            break;
          }

        case OperationMode.Idempotent:
          {
            s.push("(idempotent)");
            break;
          }

        default:
          {
            s.push("(unknown)");
            break;
          }
      }

      var sz = stream.readSize();
      s.push("\ncontext = ");

      while (sz-- > 0) {
        var key = stream.readString();
        var value = stream.readString();
        s.push(key + '/' + value);

        if (sz > 0) {
          s.push(", ");
        }
      }

      var ver = stream.skipEncapsulation();

      if (!ver.equals(Ice.Encoding_1_0)) {
        s.push("\nencoding = ");
        s.push(Ice.encodingVersionToString(ver));
      }
    }

    function printHeader(s, stream) {
      stream.readByte(); // Don't bother printing the magic number

      stream.readByte();
      stream.readByte();
      stream.readByte(); //        const pMajor = stream.readByte();
      //        const pMinor = stream.readByte();
      //        s.push("\nprotocol version = " + pMajor + "." + pMinor);

      stream.readByte(); // major

      stream.readByte(); // minor
      //        const eMajor = stream.readByte();
      //        const eMinor = stream.readByte();
      //        s.push("\nencoding version = " + eMajor + "." + eMinor);

      stream.readByte(); // major

      stream.readByte(); // minor

      var type = stream.readByte();
      s.push("\nmessage type = " + type + " (" + getMessageTypeAsString(type) + ')');
      var compress = stream.readByte();
      s.push("\ncompression status = " + compress + ' ');

      switch (compress) {
        case 0:
          {
            s.push("(not compressed; do not compress response, if any)");
            break;
          }

        case 1:
          {
            s.push("(not compressed; compress response, if any)");
            break;
          }

        case 2:
          {
            s.push("(compressed; compress response, if any)");
            break;
          }

        default:
          {
            s.push("(unknown)");
            break;
          }
      }

      var size = stream.readInt();
      s.push("\nmessage size = " + size);
      return type;
    }

    function printMessage(s, stream) {
      var type = printHeader(s, stream);

      switch (type) {
        case Protocol.closeConnectionMsg:
        case Protocol.validateConnectionMsg:
          {
            // We're done.
            break;
          }

        case Protocol.requestMsg:
          {
            printRequest(s, stream);
            break;
          }

        case Protocol.requestBatchMsg:
          {
            printBatchRequest(s, stream);
            break;
          }

        case Protocol.replyMsg:
          {
            printReply(s, stream);
            break;
          }

        default:
          {
            break;
          }
      }

      return type;
    }

    function getMessageTypeAsString(type) {
      switch (type) {
        case Protocol.requestMsg:
          return "request";

        case Protocol.requestBatchMsg:
          return "batch request";

        case Protocol.replyMsg:
          return "reply";

        case Protocol.closeConnectionMsg:
          return "close connection";

        case Protocol.validateConnectionMsg:
          return "validate connection";

        default:
          return "unknown";
      }
    }

    var TraceUtil =
    /*#__PURE__*/
    function () {
      function TraceUtil() {
        _classCallCheck(this, TraceUtil);
      }

      _createClass(TraceUtil, null, [{
        key: "traceSlicing",
        value: function traceSlicing(kind, typeId, slicingCat, logger) {
          if (!slicingIds.has(typeId)) {
            logger.trace(slicingCat, "unknown ".concat(kind, " type `").concat(typeId, "'"));
            slicingIds.set(typeId, 1);
          }
        }
      }, {
        key: "traceSend",
        value: function traceSend(stream, logger, traceLevels) {
          if (traceLevels.protocol >= 1) {
            var p = stream.pos;
            var is = new Ice.InputStream(stream.instance, stream.getEncoding(), stream.buffer);
            is.pos = 0;
            var s = [];
            var type = printMessage(s, is);
            logger.trace(traceLevels.protocolCat, "sending " + getMessageTypeAsString(type) + " " + s.join(""));
            stream.pos = p;
          }
        }
      }, {
        key: "traceRecv",
        value: function traceRecv(stream, logger, traceLevels) {
          if (traceLevels.protocol >= 1) {
            var p = stream.pos;
            stream.pos = 0;
            var s = [];
            var type = printMessage(s, stream);
            logger.trace(traceLevels.protocolCat, "received " + getMessageTypeAsString(type) + " " + s.join(""));
            stream.pos = p;
          }
        }
      }, {
        key: "traceOut",
        value: function traceOut(heading, stream, logger, traceLevels) {
          if (traceLevels.protocol >= 1) {
            var p = stream.pos;
            var is = new Ice.InputStream(stream.instance, stream.getEncoding(), stream.buffer);
            is.pos = 0;
            var s = [];
            s.push(heading);
            printMessage(s, is);
            logger.trace(traceLevels.protocolCat, s.join(""));
            stream.pos = p;
          }
        }
      }, {
        key: "traceIn",
        value: function traceIn(heading, stream, logger, traceLevels) {
          if (traceLevels.protocol >= 1) {
            var p = stream.pos;
            stream.pos = 0;
            var s = [];
            s.push(heading);
            printMessage(s, stream);
            logger.trace(traceLevels.protocolCat, s.join(""));
            stream.pos = p;
          }
        }
      }, {
        key: "dumpStream",
        value: function dumpStream(stream) {
          var pos = stream.pos;
          stream.pos = 0;
          var data = stream.readBlob(stream.size());
          TraceUtil.dumpOctets(data);
          stream.pos = pos;
        }
      }, {
        key: "dumpOctets",
        value: function dumpOctets(data) {
          var inc = 8;
          var buf = [];

          for (var i = 0; i < data.length; i += inc) {
            for (var j = i; j - i < inc; j++) {
              if (j < data.length) {
                var n = data[j];

                if (n < 0) {
                  n += 256;
                }

                var s = void 0;

                if (n < 10) {
                  s = "  " + n;
                } else if (n < 100) {
                  s = " " + n;
                } else {
                  s = String(n);
                }

                buf.push(s + " ");
              } else {
                buf.push("    ");
              }
            }

            buf.push('"');

            for (var _j2 = i; _j2 < data.length && _j2 - i < inc; _j2++) {
              if (data[_j2] >= 32 && data[_j2] < 127) {
                buf.push(String.fromCharCode(data[_j2]));
              } else {
                buf.push('.');
              }
            }

            buf.push("\"\n");
          }

          console.log(buf.join(""));
        }
      }]);

      return TraceUtil;
    }();

    Ice.TraceUtil = TraceUtil;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var RetryException =
    /*#__PURE__*/
    function (_Error3) {
      _inherits(RetryException, _Error3);

      function RetryException(ex) {
        var _this43;

        _classCallCheck(this, RetryException);

        _this43 = _possibleConstructorReturn(this, _getPrototypeOf(RetryException).call(this));

        if (ex instanceof Ice.LocalException) {
          _this43._ex = ex;
        } else {
          Ice.Debug.assert(ex instanceof RetryException);
          _this43._ex = ex._ex;
        }

        return _this43;
      }

      _createClass(RetryException, [{
        key: "inner",
        get: function get() {
          return this._ex;
        }
      }]);

      return RetryException;
    }(_wrapNativeSuper(Error));

    Ice.RetryException = RetryException;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var _ModuleRegistry = Ice._ModuleRegistry;
    var Debug = Ice.Debug;
    var ExUtil = Ice.ExUtil;
    var FormatType = Ice.FormatType;
    var OptionalFormat = Ice.OptionalFormat;
    var Protocol = Ice.Protocol;
    var TraceUtil = Ice.TraceUtil;
    var ArrayUtil = Ice.ArrayUtil;
    var SlicedData = Ice.SlicedData;
    var SliceType = {
      NoSlice: 0,
      ValueSlice: 1,
      ExceptionSlice: 2
    }; //
    // Number.isNaN polyfill for compatibility with IE
    //
    // see: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
    //

    Number.isNaN = Number.isNaN || function (value) {
      return typeof value === "number" && isNaN(value);
    }; //
    // InputStream
    //


    var IndirectPatchEntry = function IndirectPatchEntry(index, cb) {
      _classCallCheck(this, IndirectPatchEntry);

      this.index = index;
      this.cb = cb;
    };

    var EncapsDecoder =
    /*#__PURE__*/
    function () {
      function EncapsDecoder(stream, encaps, sliceValues, f) {
        _classCallCheck(this, EncapsDecoder);

        this._stream = stream;
        this._encaps = encaps;
        this._sliceValues = sliceValues;
        this._valueFactoryManager = f;
        this._patchMap = null; // Lazy initialized, Map<int, Patcher[] >()

        this._unmarshaledMap = new Map(); // Map<int, Ice.Value>()

        this._typeIdMap = null; // Lazy initialized, Map<int, String>

        this._typeIdIndex = 0;
        this._valueList = null; // Lazy initialized. Ice.Value[]
      }

      _createClass(EncapsDecoder, [{
        key: "readOptional",
        value: function readOptional() {
          return false;
        }
      }, {
        key: "readPendingValues",
        value: function readPendingValues() {}
      }, {
        key: "readTypeId",
        value: function readTypeId(isIndex) {
          if (this._typeIdMap === null) // Lazy initialization
            {
              this._typeIdMap = new Map(); // Map<int, String>();
            }

          var typeId;

          if (isIndex) {
            typeId = this._typeIdMap.get(this._stream.readSize());

            if (typeId === undefined) {
              throw new Ice.UnmarshalOutOfBoundsException();
            }
          } else {
            typeId = this._stream.readString();

            this._typeIdMap.set(++this._typeIdIndex, typeId);
          }

          return typeId;
        }
      }, {
        key: "newInstance",
        value: function newInstance(typeId) {
          //
          // Try to find a factory registered for the specific type.
          //
          var userFactory = this._valueFactoryManager.find(typeId);

          var v = null;

          if (userFactory !== undefined) {
            v = userFactory(typeId);
          } //
          // If that fails, invoke the default factory if one has been
          // registered.
          //


          if (v === null || v === undefined) {
            userFactory = this._valueFactoryManager.find("");

            if (userFactory !== undefined) {
              v = userFactory(typeId);
            }
          } //
          // Last chance: try to instantiate the class dynamically.
          //


          if (v === null || v === undefined) {
            v = this._stream.createInstance(typeId);
          }

          return v;
        }
      }, {
        key: "addPatchEntry",
        value: function addPatchEntry(index, cb) {
          Debug.assert(index > 0); //
          // Check if we have already unmarshaled the instance. If that's the case,
          // just call the callback and we're done.
          //

          var obj = this._unmarshaledMap.get(index);

          if (obj !== undefined && obj !== null) {
            cb(obj);
            return;
          }

          if (this._patchMap === null) // Lazy initialization
            {
              this._patchMap = new Map(); // Map<Integer, Patcher[] >();
            } //
          // Add a patch entry if the instance isn't unmarshaled yet,
          // the callback will be called when the instance is
          // unmarshaled.
          //


          var l = this._patchMap.get(index);

          if (l === undefined) {
            //
            // We have no outstanding instances to be patched for this
            // index, so make a new entry in the patch map.
            //
            l = []; // ReadValueCallback[]

            this._patchMap.set(index, l);
          } //
          // Append a patch entry for this instance.
          //


          l.push(cb);
        }
      }, {
        key: "unmarshal",
        value: function unmarshal(index, v) {
          //
          // Add the instance to the map of unmarshaled instances, this must
          // be done before reading the instances (for circular references).
          //
          this._unmarshaledMap.set(index, v); //
          // Read the instance.
          //


          v._iceRead(this._stream);

          if (this._patchMap !== null) {
            //
            // Patch all instances now that the instance is unmarshaled.
            //
            var l = this._patchMap.get(index);

            if (l !== undefined) {
              Debug.assert(l.length > 0); //
              // Patch all pointers that refer to the instance.
              //

              for (var i = 0; i < l.length; ++i) {
                l[i](v);
              } //
              // Clear out the patch map for that index -- there is nothing left
              // to patch for that index for the time being.
              //


              this._patchMap.delete(index);
            }
          }

          if ((this._patchMap === null || this._patchMap.size === 0) && this._valueList === null) {
            try {
              v.ice_postUnmarshal();
            } catch (ex) {
              this._stream.instance.initializationData().logger.warning("exception raised by ice_postUnmarshal:\n" + ex.toString());
            }
          } else {
            if (this._valueList === null) // Lazy initialization
              {
                this._valueList = []; // Ice.Value[]
              }

            this._valueList.push(v);

            if (this._patchMap === null || this._patchMap.size === 0) {
              //
              // Iterate over the instance list and invoke ice_postUnmarshal on
              // each instance. We must do this after all instances have been
              // unmarshaled in order to ensure that any instance data members
              // have been properly patched.
              //
              for (var _i4 = 0; _i4 < this._valueList.length; _i4++) {
                try {
                  this._valueList[_i4].ice_postUnmarshal();
                } catch (ex) {
                  this._stream.instance.initializationData().logger.warning("exception raised by ice_postUnmarshal:\n" + ex.toString());
                }
              }

              this._valueList = [];
            }
          }
        }
      }]);

      return EncapsDecoder;
    }();

    var EncapsDecoder10 =
    /*#__PURE__*/
    function (_EncapsDecoder) {
      _inherits(EncapsDecoder10, _EncapsDecoder);

      function EncapsDecoder10(stream, encaps, sliceValues, f) {
        var _this44;

        _classCallCheck(this, EncapsDecoder10);

        _this44 = _possibleConstructorReturn(this, _getPrototypeOf(EncapsDecoder10).call(this, stream, encaps, sliceValues, f));
        _this44._sliceType = SliceType.NoSlice;
        return _this44;
      }

      _createClass(EncapsDecoder10, [{
        key: "readValue",
        value: function readValue(cb) {
          Debug.assert(cb !== null); //
          // Instance references are encoded as a negative integer in 1.0.
          //

          var index = this._stream.readInt();

          if (index > 0) {
            throw new Ice.MarshalException("invalid object id");
          }

          index = -index;

          if (index === 0) {
            cb(null);
          } else {
            this.addPatchEntry(index, cb);
          }
        }
      }, {
        key: "throwException",
        value: function throwException() {
          Debug.assert(this._sliceType === SliceType.NoSlice); //
          // User exceptions with the 1.0 encoding start with a boolean flag
          // that indicates whether or not the exception has classes.
          //
          // This allows reading the pending instances even if some part of
          // the exception was sliced.
          //

          var usesClasses = this._stream.readBool();

          this._sliceType = SliceType.ExceptionSlice;
          this._skipFirstSlice = false; //
          // Read the first slice header.
          //

          this.startSlice();
          var mostDerivedId = this._typeId;

          while (true) {
            var userEx = this._stream.createUserException(this._typeId); //
            // We found the exception.
            //


            if (userEx !== null) {
              userEx._read(this._stream);

              if (usesClasses) {
                this.readPendingValues();
              }

              throw userEx; // Never reached.
            } //
            // Slice off what we don't understand.
            //


            this.skipSlice();

            try {
              this.startSlice();
            } catch (ex) {
              //
              // An oversight in the 1.0 encoding means there is no marker to indicate
              // the last slice of an exception. As a result, we just try to read the
              // next type ID, which raises UnmarshalOutOfBoundsException when the
              // input buffer underflows.
              //
              // Set the reason member to a more helpful message.
              //
              if (ex instanceof Ice.UnmarshalOutOfBoundsException) {
                ex.reason = "unknown exception type `" + mostDerivedId + "'";
              }

              throw ex;
            }
          }
        }
      }, {
        key: "startInstance",
        value: function startInstance(sliceType) {
          Debug.assert(this._sliceType === sliceType);
          this._skipFirstSlice = true;
        }
      }, {
        key: "endInstance",
        value: function endInstance(preserve) {
          //
          // Read the Ice::Object slice.
          //
          if (this._sliceType === SliceType.ValueSlice) {
            this.startSlice();

            var sz = this._stream.readSize(); // For compatibility with the old AFM.


            if (sz !== 0) {
              throw new Ice.MarshalException("invalid Object slice");
            }

            this.endSlice();
          }

          this._sliceType = SliceType.NoSlice;
          return null;
        }
      }, {
        key: "startSlice",
        value: function startSlice() {
          //
          // If first slice, don't read the header, it was already read in
          // readInstance or throwException to find the factory.
          //
          if (this._skipFirstSlice) {
            this._skipFirstSlice = false;
            return this._typeId;
          } //
          // For instances, first read the type ID boolean which indicates
          // whether or not the type ID is encoded as a string or as an
          // index. For exceptions, the type ID is always encoded as a
          // string.
          //


          if (this._sliceType === SliceType.ValueSlice) // For exceptions, the type ID is always encoded as a string
            {
              var isIndex = this._stream.readBool();

              this._typeId = this.readTypeId(isIndex);
            } else {
            this._typeId = this._stream.readString();
          }

          this._sliceSize = this._stream.readInt();

          if (this._sliceSize < 4) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          return this._typeId;
        }
      }, {
        key: "endSlice",
        value: function endSlice() {}
      }, {
        key: "skipSlice",
        value: function skipSlice() {
          this._stream.traceSkipSlice(this._typeId, this._sliceType);

          Debug.assert(this._sliceSize >= 4);

          this._stream.skip(this._sliceSize - 4);
        }
      }, {
        key: "readPendingValues",
        value: function readPendingValues() {
          var num;

          do {
            num = this._stream.readSize();

            for (var k = num; k > 0; --k) {
              this.readInstance();
            }
          } while (num > 0);

          if (this._patchMap !== null && this._patchMap.size !== 0) {
            //
            // If any entries remain in the patch map, the sender has sent an index for an instance, but failed
            // to supply the instance.
            //
            throw new Ice.MarshalException("index for class received, but no instance");
          }
        }
      }, {
        key: "readInstance",
        value: function readInstance() {
          var index = this._stream.readInt();

          var v = null;

          if (index <= 0) {
            throw new Ice.MarshalException("invalid object id");
          }

          this._sliceType = SliceType.ValueSlice;
          this._skipFirstSlice = false; //
          // Read the first slice header.
          //

          this.startSlice();
          var mostDerivedId = this._typeId;

          while (true) {
            //
            // For the 1.0 encoding, the type ID for the base Object class
            // marks the last slice.
            //
            if (this._typeId == Ice.Value.ice_staticId()) {
              throw new Ice.NoValueFactoryException("", mostDerivedId);
            }

            v = this.newInstance(this._typeId); //
            // We found a factory, we get out of this loop.
            //

            if (v) {
              break;
            } //
            // If slicing is disabled, stop unmarshaling.
            //


            if (!this._sliceValues) {
              throw new Ice.NoValueFactoryException("no value factory found and slicing is disabled", this._typeId);
            } //
            // Slice off what we don't understand.
            //


            this.skipSlice();
            this.startSlice(); // Read next Slice header for next iteration.
          } //
          // Unmarshal the instance and add it to the map of unmarshaled instances.
          //


          this.unmarshal(index, v);
        }
      }]);

      return EncapsDecoder10;
    }(EncapsDecoder);

    var EncapsDecoder11 =
    /*#__PURE__*/
    function (_EncapsDecoder2) {
      _inherits(EncapsDecoder11, _EncapsDecoder2);

      function EncapsDecoder11(stream, encaps, sliceValues, f, r) {
        var _this45;

        _classCallCheck(this, EncapsDecoder11);

        _this45 = _possibleConstructorReturn(this, _getPrototypeOf(EncapsDecoder11).call(this, stream, encaps, sliceValues, f));
        _this45._compactIdResolver = r;
        _this45._current = null;
        _this45._valueIdIndex = 1;
        return _this45;
      }

      _createClass(EncapsDecoder11, [{
        key: "readValue",
        value: function readValue(cb) {
          var index = this._stream.readSize();

          if (index < 0) {
            throw new Ice.MarshalException("invalid object id");
          } else if (index === 0) {
            if (cb !== null) {
              cb(null);
            }
          } else if (this._current !== null && (this._current.sliceFlags & Protocol.FLAG_HAS_INDIRECTION_TABLE) !== 0) {
            //
            // When reading an instance within a slice and there's an
            // indirect instance table, always read an indirect reference
            // that points to an instance from the indirect instance table
            // marshaled at the end of the Slice.
            //
            // Maintain a list of indirect references. Note that the
            // indirect index starts at 1, so we decrement it by one to
            // derive an index into the indirection table that we'll read
            // at the end of the slice.
            //
            if (cb !== null) {
              if (this._current.indirectPatchList === null) // Lazy initialization
                {
                  this._current.indirectPatchList = []; // IndirectPatchEntry[]
                }

              this._current.indirectPatchList.push(new IndirectPatchEntry(index - 1, cb));
            }
          } else {
            this.readInstance(index, cb);
          }
        }
      }, {
        key: "throwException",
        value: function throwException() {
          Debug.assert(this._current === null);
          this.push(SliceType.ExceptionSlice); //
          // Read the first slice header.
          //

          this.startSlice();
          var mostDerivedId = this._current.typeId;

          while (true) {
            var userEx = this._stream.createUserException(this._current.typeId); //
            // We found the exception.
            //


            if (userEx !== null) {
              userEx._read(this._stream);

              throw userEx; // Never reached.
            } //
            // Slice off what we don't understand.
            //


            this.skipSlice();

            if ((this._current.sliceFlags & Protocol.FLAG_IS_LAST_SLICE) !== 0) {
              if (mostDerivedId.indexOf("::") === 0) {
                throw new Ice.UnknownUserException(mostDerivedId.substr(2));
              }

              throw new Ice.UnknownUserException(mostDerivedId);
            }

            this.startSlice();
          }
        }
      }, {
        key: "startInstance",
        value: function startInstance(sliceType) {
          Debug.assert(sliceType !== undefined);
          Debug.assert(this._current.sliceType !== null && this._current.sliceType === sliceType);
          this._current.skipFirstSlice = true;
        }
      }, {
        key: "endInstance",
        value: function endInstance(preserve) {
          var slicedData = null;

          if (preserve) {
            slicedData = this.readSlicedData();
          }

          if (this._current.slices !== null) {
            this._current.slices.length = 0; // Clear the array.

            this._current.indirectionTables.length = 0; // Clear the array.
          }

          this._current = this._current.previous;
          return slicedData;
        }
      }, {
        key: "startSlice",
        value: function startSlice() {
          //
          // If first slice, don't read the header, it was already read in
          // readInstance or throwException to find the factory.
          //
          if (this._current.skipFirstSlice) {
            this._current.skipFirstSlice = false;
            return this._current.typeId;
          }

          this._current.sliceFlags = this._stream.readByte(); //
          // Read the type ID, for instance slices the type ID is encoded as a
          // string or as an index, for exceptions it's always encoded as a
          // string.
          //

          if (this._current.sliceType === SliceType.ValueSlice) {
            if ((this._current.sliceFlags & Protocol.FLAG_HAS_TYPE_ID_COMPACT) === Protocol.FLAG_HAS_TYPE_ID_COMPACT) // Must be checked 1st!
              {
                this._current.typeId = "";
                this._current.compactId = this._stream.readSize();
              } else if ((this._current.sliceFlags & (Protocol.FLAG_HAS_TYPE_ID_INDEX | Protocol.FLAG_HAS_TYPE_ID_STRING)) !== 0) {
              this._current.typeId = this.readTypeId((this._current.sliceFlags & Protocol.FLAG_HAS_TYPE_ID_INDEX) !== 0);
              this._current.compactId = -1;
            } else {
              //
              // Only the most derived slice encodes the type ID for the compact format.
              //
              this._current.typeId = "";
              this._current.compactId = -1;
            }
          } else {
            this._current.typeId = this._stream.readString();
            this._current.compactId = -1;
          } //
          // Read the slice size if necessary.
          //


          if ((this._current.sliceFlags & Protocol.FLAG_HAS_SLICE_SIZE) !== 0) {
            this._current.sliceSize = this._stream.readInt();

            if (this._current.sliceSize < 4) {
              throw new Ice.UnmarshalOutOfBoundsException();
            }
          } else {
            this._current.sliceSize = 0;
          }

          return this._current.typeId;
        }
      }, {
        key: "endSlice",
        value: function endSlice() {
          var _this46 = this;

          if ((this._current.sliceFlags & Protocol.FLAG_HAS_OPTIONAL_MEMBERS) !== 0) {
            this._stream.skipOptionals();
          } //
          // Read the indirection table if one is present and transform the
          // indirect patch list into patch entries with direct references.
          //


          if ((this._current.sliceFlags & Protocol.FLAG_HAS_INDIRECTION_TABLE) !== 0) {
            var indirectionTable = []; //
            // The table is written as a sequence<size> to conserve space.
            //

            var length = this._stream.readAndCheckSeqSize(1);

            for (var i = 0; i < length; ++i) {
              indirectionTable[i] = this.readInstance(this._stream.readSize(), null);
            } //
            // Sanity checks. If there are optional members, it's possible
            // that not all instance references were read if they are from
            // unknown optional data members.
            //


            if (indirectionTable.length === 0) {
              throw new Ice.MarshalException("empty indirection table");
            }

            if ((this._current.indirectPatchList === null || this._current.indirectPatchList.length === 0) && (this._current.sliceFlags & Protocol.FLAG_HAS_OPTIONAL_MEMBERS) === 0) {
              throw new Ice.MarshalException("no references to indirection table");
            } //
            // Convert indirect references into direct references.
            //


            if (this._current.indirectPatchList !== null) {
              this._current.indirectPatchList.forEach(function (e) {
                Debug.assert(e.index >= 0);

                if (e.index >= indirectionTable.length) {
                  throw new Ice.MarshalException("indirection out of range");
                }

                _this46.addPatchEntry(indirectionTable[e.index], e.cb);
              });

              this._current.indirectPatchList.length = 0;
            }
          }
        }
      }, {
        key: "skipSlice",
        value: function skipSlice() {
          this._stream.traceSkipSlice(this._current.typeId, this._current.sliceType);

          var start = this._stream.pos;

          if ((this._current.sliceFlags & Protocol.FLAG_HAS_SLICE_SIZE) !== 0) {
            Debug.assert(this._current.sliceSize >= 4);

            this._stream.skip(this._current.sliceSize - 4);
          } else if (this._current.sliceType === SliceType.ValueSlice) {
            throw new Ice.NoValueFactoryException("no value factory found and compact format prevents slicing " + "(the sender should use the sliced format instead)", this._current.typeId);
          } else if (this._current.typeId.indexOf("::") === 0) {
            throw new Ice.UnknownUserException(this._current.typeId.substring(2));
          } else {
            throw new Ice.UnknownUserException(this._current.typeId);
          } //
          // Preserve this slice.
          //


          var info = new Ice.SliceInfo();
          info.typeId = this._current.typeId;
          info.compactId = this._current.compactId;
          info.hasOptionalMembers = (this._current.sliceFlags & Protocol.FLAG_HAS_OPTIONAL_MEMBERS) !== 0;
          info.isLastSlice = (this._current.sliceFlags & Protocol.FLAG_IS_LAST_SLICE) !== 0;
          var b = this._stream._buf;
          var end = b.position;
          var dataEnd = end;

          if (info.hasOptionalMembers) {
            //
            // Don't include the optional member end marker. It will be re-written by
            // endSlice when the sliced data is re-written.
            //
            --dataEnd;
          }

          b.position = start;
          info.bytes = b.getArray(dataEnd - start);
          b.position = end;

          if (this._current.slices === null) // Lazy initialization
            {
              this._current.slices = []; // Ice.SliceInfo[]

              this._current.indirectionTables = []; // int[]
            } //
          // Read the indirect instance table. We read the instances or their
          // IDs if the instance is a reference to an already unmarshaled
          // instance.
          //


          if ((this._current.sliceFlags & Protocol.FLAG_HAS_INDIRECTION_TABLE) !== 0) {
            var length = this._stream.readAndCheckSeqSize(1);

            var indirectionTable = [];

            for (var i = 0; i < length; ++i) {
              indirectionTable[i] = this.readInstance(this._stream.readSize(), null);
            }

            this._current.indirectionTables.push(indirectionTable);
          } else {
            this._current.indirectionTables.push(null);
          }

          this._current.slices.push(info);
        }
      }, {
        key: "readOptional",
        value: function readOptional(readTag, expectedFormat) {
          if (this._current === null) {
            return this._stream.readOptImpl(readTag, expectedFormat);
          } else if ((this._current.sliceFlags & Protocol.FLAG_HAS_OPTIONAL_MEMBERS) !== 0) {
            return this._stream.readOptImpl(readTag, expectedFormat);
          }

          return false;
        }
      }, {
        key: "readInstance",
        value: function readInstance(index, cb) {
          Debug.assert(index > 0);
          var v = null;

          if (index > 1) {
            if (cb !== null) {
              this.addPatchEntry(index, cb);
            }

            return index;
          }

          this.push(SliceType.ValueSlice); //
          // Get the instance ID before we start reading slices. If some
          // slices are skipped, the indirect instance table is still read and
          // might read other instances.
          //

          index = ++this._valueIdIndex; //
          // Read the first slice header.
          //

          this.startSlice();
          var mostDerivedId = this._current.typeId;

          while (true) {
            if (this._current.compactId >= 0) {
              //
              // Translate a compact (numeric) type ID into a string type ID.
              //
              this._current.typeId = "";

              if (this._compactIdResolver !== null) {
                try {
                  this._current.typeId = this._compactIdResolver.call(null, this._current.compactId);
                } catch (ex) {
                  if (!(ex instanceof Ice.LocalException)) {
                    throw new Ice.MarshalException("exception in CompactIdResolver for ID " + this._current.compactId, ex);
                  }

                  throw ex;
                }
              }

              if (this._current.typeId.length === 0) {
                this._current.typeId = this._stream.resolveCompactId(this._current.compactId);
              }
            }

            if (this._current.typeId.length > 0) {
              v = this.newInstance(this._current.typeId);
            }

            if (v !== null && v !== undefined) {
              //
              // We have an instance, we get out of this loop.
              //
              break;
            } //
            // If slicing is disabled, stop unmarshaling.
            //


            if (!this._sliceValues) {
              throw new Ice.NoValueFactoryException("no value factory found and slicing is disabled", this._current.typeId);
            } //
            // Slice off what we don't understand.
            //


            this.skipSlice(); //
            // If this is the last slice, keep the instance as an opaque
            // UnknownSlicedValue object.
            //

            if ((this._current.sliceFlags & Protocol.FLAG_IS_LAST_SLICE) !== 0) {
              v = new Ice.UnknownSlicedValue(mostDerivedId);
              break;
            }

            this.startSlice(); // Read next Slice header for next iteration.
          } //
          // Unmarshal the instance.
          //


          this.unmarshal(index, v);

          if (this._current === null && this._patchMap !== null && this._patchMap.size !== 0) {
            //
            // If any entries remain in the patch map, the sender has sent an index for an instance, but failed
            // to supply the instance.
            //
            throw new Ice.MarshalException("index for class received, but no instance");
          }

          if (cb !== null) {
            cb(v);
          }

          return index;
        }
      }, {
        key: "readSlicedData",
        value: function readSlicedData() {
          if (this._current.slices === null) // No preserved slices.
            {
              return null;
            } //
          // The _indirectionTables member holds the indirection table for each slice
          // in _slices.
          //


          Debug.assert(this._current.slices.length === this._current.indirectionTables.length);

          for (var i = 0; i < this._current.slices.length; ++i) {
            //
            // We use the "instances" list in SliceInfo to hold references
            // to the target instances. Note that the instances might not have
            // been read yet in the case of a circular reference to an
            // enclosing instance.
            //
            var table = this._current.indirectionTables[i];
            var info = this._current.slices[i];
            info.instances = [];

            if (table) {
              for (var j = 0; j < table.length; ++j) {
                this.addPatchEntry(table[j], sequencePatcher(info.instances, j, Ice.Value));
              }
            }
          }

          return new SlicedData(ArrayUtil.clone(this._current.slices));
        }
      }, {
        key: "push",
        value: function push(sliceType) {
          if (this._current === null) {
            this._current = new EncapsDecoder11.InstanceData(null);
          } else {
            this._current = !this._current.next ? new EncapsDecoder11.InstanceData(this._current) : this._current.next;
          }

          this._current.sliceType = sliceType;
          this._current.skipFirstSlice = false;
        }
      }]);

      return EncapsDecoder11;
    }(EncapsDecoder);

    EncapsDecoder11.InstanceData =
    /*#__PURE__*/
    function () {
      function _class76(previous) {
        _classCallCheck(this, _class76);

        if (previous !== null) {
          previous.next = this;
        }

        this.previous = previous;
        this.next = null; // Instance attributes

        this.sliceType = null;
        this.skipFirstSlice = false;
        this.slices = null; // Preserved slices. Ice.SliceInfo[]

        this.indirectionTables = null; // int[][]
        // Slice attributes

        this.sliceFlags = 0;
        this.sliceSize = 0;
        this.typeId = null;
        this.compactId = 0;
        this.indirectPatchList = null; // Lazy initialized, IndirectPatchEntry[]
      }

      return _class76;
    }();

    var sequencePatcher = function sequencePatcher(seq, index, T) {
      return function (v) {
        if (v !== null && !(v instanceof T)) {
          ExUtil.throwUOE(T.ice_staticId(), v);
        }

        seq[index] = v;
      };
    };

    var ReadEncaps =
    /*#__PURE__*/
    function () {
      function ReadEncaps() {
        _classCallCheck(this, ReadEncaps);

        this.start = 0;
        this.sz = 0;
        this.encoding = null;
        this.encoding_1_0 = false;
        this.decoder = null;
        this.next = null;
      }

      _createClass(ReadEncaps, [{
        key: "reset",
        value: function reset() {
          this.decoder = null;
        }
      }, {
        key: "setEncoding",
        value: function setEncoding(encoding) {
          this.encoding = encoding;
          this.encoding_1_0 = encoding.equals(Ice.Encoding_1_0);
        }
      }]);

      return ReadEncaps;
    }();

    var InputStream =
    /*#__PURE__*/
    function () {
      function InputStream(arg1, arg2, arg3) {
        _classCallCheck(this, InputStream);

        var args = {
          instance: null,
          encoding: null,
          bytes: null,
          buffer: null
        };

        this._checkArgs([arg1, arg2, arg3], args);

        this._initialize(args);
      }

      _createClass(InputStream, [{
        key: "_checkArgs",
        value: function _checkArgs(arr, args) {
          //
          // The constructor can accept a variety of argument combinations:
          //
          // (<empty>)
          // (communicator)
          // (instance)
          // (encoding)
          // (array)
          // (buffer)
          // (communicator, encoding)
          // (instance, encoding)
          // (communicator, array)
          // (instance, array)
          // (communicator, buffer)
          // (instance, buffer)
          // (communicator, encoding, array)
          // (instance, encoding, array)
          // (communicator, encoding, buffer)
          // (instance, encoding, buffer)
          // (encoding, array)
          // (encoding, array)
          // (encoding, buffer)
          // (encoding, buffer)
          //
          arr.forEach(function (arg) {
            if (arg !== null && arg !== undefined) {
              if (arg.constructor === Ice.Communicator) {
                args.instance = arg.instance;
              } else if (arg.constructor === Ice.Instance) {
                args.instance = arg;
              } else if (arg.constructor === Ice.EncodingVersion) {
                args.encoding = arg;
              } else if (arg.constructor === Ice.Buffer) {
                args.buffer = arg;
              } else if (arg.constructor === ArrayBuffer) {
                args.bytes = arg;
              } else if (arg.constructor === Uint8Array) {
                args.bytes = arg.buffer;
              } else {
                throw new Ice.InitializationException("unknown argument to InputStream constructor");
              }
            }
          });

          if (args.buffer !== null && args.bytes !== null) {
            throw new Ice.InitializationException("invalid argument to InputStream constructor");
          }
        }
      }, {
        key: "_initialize",
        value: function _initialize(args) {
          this._instance = args.instance;
          this._encoding = args.encoding;
          this._encapsStack = null;
          this._encapsCache = null;
          this._closure = null;
          this._sliceValues = true;
          this._startSeq = -1;
          this._sizePos = -1;
          this._compactIdResolver = null;

          if (this._instance !== null) {
            if (this._encoding === null) {
              this._encoding = this._instance.defaultsAndOverrides().defaultEncoding;
            }

            this._traceSlicing = this._instance.traceLevels().slicing > 0;
            this._valueFactoryManager = this._instance.initializationData().valueFactoryManager;
            this._logger = this._instance.initializationData().logger;
          } else {
            if (this._encoding === null) {
              this._encoding = Protocol.currentEncoding;
            }

            this._traceSlicing = false;
            this._valueFactoryManager = null;
            this._logger = null;
          }

          if (args.bytes !== null) {
            this._buf = new Ice.Buffer(args.bytes);
          } else if (args.buffer !== null) {
            this._buf = args.buffer;
          } else {
            this._buf = new Ice.Buffer();
          }
        } //
        // This function allows this object to be reused, rather than reallocated.
        //

      }, {
        key: "reset",
        value: function reset() {
          this._buf.reset();

          this.clear();
        }
      }, {
        key: "clear",
        value: function clear() {
          if (this._encapsStack !== null) {
            Debug.assert(this._encapsStack.next === null);
            this._encapsStack.next = this._encapsCache;
            this._encapsCache = this._encapsStack;

            this._encapsCache.reset();

            this._encapsStack = null;
          }

          this._startSeq = -1;
          this._sliceValues = true;
        }
      }, {
        key: "swap",
        value: function swap(other) {
          Debug.assert(this._instance === other._instance);
          var _ref = [this._buf, other._buf];
          other._buf = _ref[0];
          this._buf = _ref[1];
          var _ref2 = [this._encoding, other._encoding];
          other._encoding = _ref2[0];
          this._encoding = _ref2[1];
          var _ref3 = [this._traceSlicing, other._traceSlicing];
          other._traceSlicing = _ref3[0];
          this._traceSlicing = _ref3[1];
          var _ref4 = [this._closure, other.closure];
          other._closure = _ref4[0];
          this._closure = _ref4[1];
          var _ref5 = [this._sliceValues, other._sliceValues];
          other._sliceValues = _ref5[0];
          this._sliceValues = _ref5[1];
          //
          // Swap is never called for InputStreams that have encapsulations being read/write. However,
          // encapsulations might still be set in case marshaling or unmarshaling failed. We just
          // reset the encapsulations if there are still some set.
          //
          this.resetEncapsulation();
          other.resetEncapsulation();
          var _ref6 = [this._startSeq, other._startSeq];
          other._startSeq = _ref6[0];
          this._startSeq = _ref6[1];
          var _ref7 = [this._minSeqSize, other._minSeqSize];
          other._minSeqSize = _ref7[0];
          this._minSeqSize = _ref7[1];
          var _ref8 = [this._sizePos, other._sizePos];
          other._sizePos = _ref8[0];
          this._sizePos = _ref8[1];
          var _ref9 = [this._valueFactoryManager, other._valueFactoryManager];
          other._valueFactoryManager = _ref9[0];
          this._valueFactoryManager = _ref9[1];
          var _ref10 = [this._logger, other._logger];
          other._logger = _ref10[0];
          this._logger = _ref10[1];
          var _ref11 = [this._compactIdResolver, other._compactIdResolver];
          other._compactIdResolver = _ref11[0];
          this._compactIdResolver = _ref11[1];
        }
      }, {
        key: "resetEncapsulation",
        value: function resetEncapsulation() {
          this._encapsStack = null;
        }
      }, {
        key: "resize",
        value: function resize(sz) {
          this._buf.resize(sz);

          this._buf.position = sz;
        }
      }, {
        key: "startValue",
        value: function startValue() {
          Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);

          this._encapsStack.decoder.startInstance(SliceType.ValueSlice);
        }
      }, {
        key: "endValue",
        value: function endValue(preserve) {
          Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);
          return this._encapsStack.decoder.endInstance(preserve);
        }
      }, {
        key: "startException",
        value: function startException() {
          Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);

          this._encapsStack.decoder.startInstance(SliceType.ExceptionSlice);
        }
      }, {
        key: "endException",
        value: function endException(preserve) {
          Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);
          return this._encapsStack.decoder.endInstance(preserve);
        }
      }, {
        key: "startEncapsulation",
        value: function startEncapsulation() {
          var curr = this._encapsCache;

          if (curr !== null) {
            curr.reset();
            this._encapsCache = this._encapsCache.next;
          } else {
            curr = new ReadEncaps();
          }

          curr.next = this._encapsStack;
          this._encapsStack = curr;
          this._encapsStack.start = this._buf.position; //
          // I don't use readSize() for encapsulations, because when creating an encapsulation,
          // I must know in advance how many bytes the size information will require in the data
          // stream. If I use an Int, it is always 4 bytes. For readSize(), it could be 1 or 5 bytes.
          //

          var sz = this.readInt();

          if (sz < 6) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          if (sz - 4 > this._buf.remaining) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          this._encapsStack.sz = sz;
          var encoding = new Ice.EncodingVersion();

          encoding._read(this);

          Protocol.checkSupportedEncoding(encoding); // Make sure the encoding is supported.

          this._encapsStack.setEncoding(encoding);

          return encoding;
        }
      }, {
        key: "endEncapsulation",
        value: function endEncapsulation() {
          Debug.assert(this._encapsStack !== null);

          if (!this._encapsStack.encoding_1_0) {
            this.skipOptionals();

            if (this._buf.position !== this._encapsStack.start + this._encapsStack.sz) {
              throw new Ice.EncapsulationException();
            }
          } else if (this._buf.position !== this._encapsStack.start + this._encapsStack.sz) {
            if (this._buf.position + 1 !== this._encapsStack.start + this._encapsStack.sz) {
              throw new Ice.EncapsulationException();
            } //
            // Ice version < 3.3 had a bug where user exceptions with
            // class members could be encoded with a trailing byte
            // when dispatched with AMD. So we tolerate an extra byte
            // in the encapsulation.
            //


            try {
              this._buf.get();
            } catch (ex) {
              throw new Ice.UnmarshalOutOfBoundsException();
            }
          }

          var curr = this._encapsStack;
          this._encapsStack = curr.next;
          curr.next = this._encapsCache;
          this._encapsCache = curr;

          this._encapsCache.reset();
        }
      }, {
        key: "skipEmptyEncapsulation",
        value: function skipEmptyEncapsulation() {
          var sz = this.readInt();

          if (sz < 6) {
            throw new Ice.EncapsulationException();
          }

          if (sz - 4 > this._buf.remaining) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          var encoding = new Ice.EncodingVersion();

          encoding._read(this);

          Protocol.checkSupportedEncoding(encoding); // Make sure the encoding is supported.

          if (encoding.equals(Ice.Encoding_1_0)) {
            if (sz != 6) {
              throw new Ice.EncapsulationException();
            }
          } else {
            // Skip the optional content of the encapsulation if we are expecting an
            // empty encapsulation.
            this._buf.position = this._buf.position + sz - 6;
          }

          return encoding;
        }
      }, {
        key: "readEncapsulation",
        value: function readEncapsulation(encoding) {
          Debug.assert(encoding !== undefined);
          var sz = this.readInt();

          if (sz < 6) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          if (sz - 4 > this._buf.remaining) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          if (encoding !== null) {
            encoding._read(this);

            this._buf.position = this._buf.position - 6;
          } else {
            this._buf.position = this._buf.position - 4;
          }

          try {
            return this._buf.getArray(sz);
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "getEncoding",
        value: function getEncoding() {
          return this._encapsStack !== null ? this._encapsStack.encoding : this._encoding;
        }
      }, {
        key: "getEncapsulationSize",
        value: function getEncapsulationSize() {
          Debug.assert(this._encapsStack !== null);
          return this._encapsStack.sz - 6;
        }
      }, {
        key: "skipEncapsulation",
        value: function skipEncapsulation() {
          var sz = this.readInt();

          if (sz < 6) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          var encoding = new Ice.EncodingVersion();

          encoding._read(this);

          try {
            this._buf.position = this._buf.position + sz - 6;
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          return encoding;
        }
      }, {
        key: "startSlice",
        value: function startSlice() // Returns type ID of next slice
        {
          Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);
          return this._encapsStack.decoder.startSlice();
        }
      }, {
        key: "endSlice",
        value: function endSlice() {
          Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);

          this._encapsStack.decoder.endSlice();
        }
      }, {
        key: "skipSlice",
        value: function skipSlice() {
          Debug.assert(this._encapsStack !== null && this._encapsStack.decoder !== null);

          this._encapsStack.decoder.skipSlice();
        }
      }, {
        key: "readPendingValues",
        value: function readPendingValues() {
          if (this._encapsStack !== null && this._encapsStack.decoder !== null) {
            this._encapsStack.decoder.readPendingValues();
          } else if (this._encapsStack !== null && this._encapsStack.encoding_1_0 || this._encapsStack === null && this._encoding.equals(Ice.Encoding_1_0)) {
            //
            // If using the 1.0 encoding and no instances were read, we
            // still read an empty sequence of pending instances if
            // requested (i.e.: if this is called).
            //
            // This is required by the 1.0 encoding, even if no instances
            // are written we do marshal an empty sequence if marshaled
            // data types use classes.
            //
            this.skipSize();
          }
        }
      }, {
        key: "readSize",
        value: function readSize() {
          try {
            var b = this._buf.get();

            if (b === 255) {
              var v = this._buf.getInt();

              if (v < 0) {
                throw new Ice.UnmarshalOutOfBoundsException();
              }

              return v;
            }

            return b;
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "readAndCheckSeqSize",
        value: function readAndCheckSeqSize(minSize) {
          var sz = this.readSize();

          if (sz === 0) {
            return sz;
          } //
          // The _startSeq variable points to the start of the sequence for which
          // we expect to read at least _minSeqSize bytes from the stream.
          //
          // If not initialized or if we already read more data than _minSeqSize,
          // we reset _startSeq and _minSeqSize for this sequence (possibly a
          // top-level sequence or enclosed sequence it doesn't really matter).
          //
          // Otherwise, we are reading an enclosed sequence and we have to bump
          // _minSeqSize by the minimum size that this sequence will  require on
          // the stream.
          //
          // The goal of this check is to ensure that when we start unmarshaling
          // a new sequence, we check the minimal size of this new sequence against
          // the estimated remaining buffer size. This estimatation is based on
          // the minimum size of the enclosing sequences, it's _minSeqSize.
          //


          if (this._startSeq === -1 || this._buf.position > this._startSeq + this._minSeqSize) {
            this._startSeq = this._buf.position;
            this._minSeqSize = sz * minSize;
          } else {
            this._minSeqSize += sz * minSize;
          } //
          // If there isn't enough data to read on the stream for the sequence (and
          // possibly enclosed sequences), something is wrong with the marshaled
          // data: it's claiming having more data that what is possible to read.
          //


          if (this._startSeq + this._minSeqSize > this._buf.limit) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          return sz;
        }
      }, {
        key: "readBlob",
        value: function readBlob(sz) {
          if (this._buf.remaining < sz) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          try {
            return this._buf.getArray(sz);
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "readOptional",
        value: function readOptional(tag, expectedFormat) {
          Debug.assert(this._encapsStack !== null);

          if (this._encapsStack.decoder !== null) {
            return this._encapsStack.decoder.readOptional(tag, expectedFormat);
          }

          return this.readOptImpl(tag, expectedFormat);
        }
      }, {
        key: "readOptionalHelper",
        value: function readOptionalHelper(tag, format, read) {
          if (this.readOptional(tag, format)) {
            return read.call(this);
          } else {
            return undefined;
          }
        }
      }, {
        key: "readByte",
        value: function readByte() {
          try {
            return this._buf.get();
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "readByteSeq",
        value: function readByteSeq() {
          return this._buf.getArray(this.readAndCheckSeqSize(1));
        }
      }, {
        key: "readBool",
        value: function readBool() {
          try {
            return this._buf.get() === 1;
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "readShort",
        value: function readShort() {
          try {
            return this._buf.getShort();
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "readInt",
        value: function readInt() {
          try {
            return this._buf.getInt();
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "readLong",
        value: function readLong() {
          try {
            return this._buf.getLong();
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "readFloat",
        value: function readFloat() {
          try {
            return this._buf.getFloat();
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "readDouble",
        value: function readDouble() {
          try {
            return this._buf.getDouble();
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "readString",
        value: function readString() {
          var len = this.readSize();

          if (len === 0) {
            return "";
          } //
          // Check the buffer has enough bytes to read.
          //


          if (this._buf.remaining < len) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          try {
            return this._buf.getString(len);
          } catch (ex) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }
        }
      }, {
        key: "readProxy",
        value: function readProxy(type) {
          return this._instance.proxyFactory().streamToProxy(this, type);
        }
      }, {
        key: "readOptionalProxy",
        value: function readOptionalProxy(tag, type) {
          if (this.readOptional(tag, OptionalFormat.FSize)) {
            this.skip(4);
            return this.readProxy(type);
          } else {
            return undefined;
          }
        }
      }, {
        key: "readEnum",
        value: function readEnum(T) {
          var v;

          if (this.getEncoding().equals(Ice.Encoding_1_0)) {
            if (T.maxValue < 127) {
              v = this.readByte();
            } else if (T.maxValue < 32767) {
              v = this.readShort();
            } else {
              v = this.readInt();
            }
          } else {
            v = this.readSize();
          }

          var e = T.valueOf(v);

          if (e === undefined) {
            throw new Ice.MarshalException("enumerator value " + v + " is out of range");
          }

          return e;
        }
      }, {
        key: "readOptionalEnum",
        value: function readOptionalEnum(tag, T) {
          if (this.readOptional(tag, OptionalFormat.Size)) {
            return this.readEnum(T);
          } else {
            return undefined;
          }
        }
      }, {
        key: "readValue",
        value: function readValue(cb, T) {
          this.initEncaps();

          this._encapsStack.decoder.readValue(cb === null ? null : function (obj) {
            if (obj !== null && !(obj instanceof T)) {
              ExUtil.throwUOE(T.ice_staticId(), obj);
            }

            cb(obj);
          });
        }
      }, {
        key: "readOptionalValue",
        value: function readOptionalValue(tag, cb, T) {
          if (this.readOptional(tag, OptionalFormat.Class)) {
            this.readValue(cb, T);
          } else {
            cb(undefined);
          }
        }
      }, {
        key: "throwException",
        value: function throwException() {
          this.initEncaps();

          this._encapsStack.decoder.throwException();
        }
      }, {
        key: "readOptImpl",
        value: function readOptImpl(readTag, expectedFormat) {
          if (this.isEncoding_1_0()) {
            return false; // Optional members aren't supported with the 1.0 encoding.
          }

          while (true) {
            if (this._buf.position >= this._encapsStack.start + this._encapsStack.sz) {
              return false; // End of encapsulation also indicates end of optionals.
            }

            var v = this.readByte();

            if (v === Protocol.OPTIONAL_END_MARKER) {
              this._buf.position -= 1; // Rewind.

              return false;
            }

            var format = OptionalFormat.valueOf(v & 0x07); // First 3 bits.

            var tag = v >> 3;

            if (tag === 30) {
              tag = this.readSize();
            }

            if (tag > readTag) {
              var offset = tag < 30 ? 1 : tag < 255 ? 2 : 6; // Rewind

              this._buf.position -= offset;
              return false; // No optional data members with the requested tag.
            } else if (tag < readTag) {
              this.skipOptional(format); // Skip optional data members
            } else {
              if (format !== expectedFormat) {
                throw new Ice.MarshalException("invalid optional data member `" + tag + "': unexpected format");
              }

              return true;
            }
          }
        }
      }, {
        key: "skipOptional",
        value: function skipOptional(format) {
          switch (format) {
            case OptionalFormat.F1:
              {
                this.skip(1);
                break;
              }

            case OptionalFormat.F2:
              {
                this.skip(2);
                break;
              }

            case OptionalFormat.F4:
              {
                this.skip(4);
                break;
              }

            case OptionalFormat.F8:
              {
                this.skip(8);
                break;
              }

            case OptionalFormat.Size:
              {
                this.skipSize();
                break;
              }

            case OptionalFormat.VSize:
              {
                this.skip(this.readSize());
                break;
              }

            case OptionalFormat.FSize:
              {
                this.skip(this.readInt());
                break;
              }

            case OptionalFormat.Class:
              {
                this.readValue(null, Ice.Value);
                break;
              }

            default:
              {
                Debug.assert(false);
                break;
              }
          }
        }
      }, {
        key: "skipOptionals",
        value: function skipOptionals() {
          //
          // Skip remaining un-read optional members.
          //
          while (true) {
            if (this._buf.position >= this._encapsStack.start + this._encapsStack.sz) {
              return; // End of encapsulation also indicates end of optionals.
            }

            var b = this.readByte();
            var v = b < 0 ? b + 256 : b;

            if (v === Protocol.OPTIONAL_END_MARKER) {
              return;
            }

            var format = OptionalFormat.valueOf(v & 0x07); // Read first 3 bits.

            if (v >> 3 === 30) {
              this.skipSize();
            }

            this.skipOptional(format);
          }
        }
      }, {
        key: "skip",
        value: function skip(size) {
          if (size > this._buf.remaining) {
            throw new Ice.UnmarshalOutOfBoundsException();
          }

          this._buf.position += size;
        }
      }, {
        key: "skipSize",
        value: function skipSize() {
          var b = this.readByte();

          if (b === 255) {
            this.skip(4);
          }
        }
      }, {
        key: "isEmpty",
        value: function isEmpty() {
          return this._buf.empty();
        }
      }, {
        key: "expand",
        value: function expand(n) {
          this._buf.expand(n);
        }
      }, {
        key: "createInstance",
        value: function createInstance(id) {
          var obj = null;

          try {
            var typeId = id.length > 2 ? id.substr(2).replace(/::/g, ".") : "";

            var Class = _ModuleRegistry.type(typeId);

            if (Class !== undefined) {
              obj = new Class();
            }
          } catch (ex) {
            throw new Ice.NoValueFactoryException("no value factory", id, ex);
          }

          return obj;
        }
      }, {
        key: "createUserException",
        value: function createUserException(id) {
          var userEx = null;

          try {
            var typeId = id.length > 2 ? id.substr(2).replace(/::/g, ".") : "";

            var Class = _ModuleRegistry.type(typeId);

            if (Class !== undefined) {
              userEx = new Class();
            }
          } catch (ex) {
            throw new Ice.MarshalException(ex);
          }

          return userEx;
        }
      }, {
        key: "resolveCompactId",
        value: function resolveCompactId(compactId) {
          var typeId = Ice.CompactIdRegistry.get(compactId);
          return typeId === undefined ? "" : typeId;
        }
      }, {
        key: "isEncoding_1_0",
        value: function isEncoding_1_0() {
          return this._encapsStack !== null ? this._encapsStack.encoding_1_0 : this._encoding.equals(Ice.Encoding_1_0);
        }
      }, {
        key: "initEncaps",
        value: function initEncaps() {
          if (this._encapsStack === null) // Lazy initialization
            {
              this._encapsStack = this._encapsCache;

              if (this._encapsStack !== null) {
                this._encapsCache = this._encapsCache.next;
              } else {
                this._encapsStack = new ReadEncaps();
              }

              this._encapsStack.setEncoding(this._encoding);

              this._encapsStack.sz = this._buf.limit;
            }

          if (this._encapsStack.decoder === null) // Lazy initialization.
            {
              if (this._encapsStack.encoding_1_0) {
                this._encapsStack.decoder = new EncapsDecoder10(this, this._encapsStack, this._sliceValues, this._valueFactoryManager);
              } else {
                this._encapsStack.decoder = new EncapsDecoder11(this, this._encapsStack, this._sliceValues, this._valueFactoryManager, this._compactIdResolver);
              }
            }
        }
      }, {
        key: "traceSkipSlice",
        value: function traceSkipSlice(typeId, sliceType) {
          if (this._traceSlicing && this._logger !== null) {
            TraceUtil.traceSlicing(sliceType === SliceType.ExceptionSlice ? "exception" : "object", typeId, "Slicing", this._logger);
          }
        } //
        // Sets the value factory manager to use when marshaling value instances. If the stream
        // was initialized with a communicator, the communicator's value factory manager will
        // be used by default.
        //

      }, {
        key: "valueFactoryManager",
        get: function get() {
          return this._valueFactoryManager;
        },
        set: function set(value) {
          this._valueFactoryManager = value !== undefined ? value : null;
        } //
        // Sets the logger to use when logging trace messages. If the stream
        // was initialized with a communicator, the communicator's logger will
        // be used by default.
        //

      }, {
        key: "logger",
        get: function get() {
          return this._logger;
        },
        set: function set(value) {
          this._logger = value !== undefined ? value : null;
        } //
        // Sets the compact ID resolver to use when unmarshaling value and exception
        // instances. If the stream was initialized with a communicator, the communicator's
        // resolver will be used by default.
        //

      }, {
        key: "compactIdResolver",
        get: function get() {
          return this._compactIdResolver;
        },
        set: function set(value) {
          this._compactIdResolver = value !== undefined ? value : null;
        } //
        // Determines the behavior of the stream when extracting instances of Slice classes.
        // A instance is "sliced" when a factory cannot be found for a Slice type ID.
        // The stream's default behavior is to slice instances.
        //
        // If slicing is disabled and the stream encounters a Slice type ID
        // during decoding for which no value factory is installed, it raises
        // NoValueFactoryException.
        //

      }, {
        key: "sliceValues",
        get: function get() {
          return this._sliceValues;
        },
        set: function set(value) {
          this._sliceValues = value;
        } //
        // Determines whether the stream logs messages about slicing instances of Slice values.
        //

      }, {
        key: "traceSlicing",
        get: function get() {
          return this._traceSlicing;
        },
        set: function set(value) {
          this._traceSlicing = value;
        }
      }, {
        key: "pos",
        get: function get() {
          return this._buf.position;
        },
        set: function set(value) {
          this._buf.position = value;
        }
      }, {
        key: "size",
        get: function get() {
          return this._buf.limit;
        }
      }, {
        key: "instance",
        get: function get() {
          return this._instance;
        }
      }, {
        key: "closure",
        get: function get() {
          return this._type;
        },
        set: function set(value) {
          this._type = value;
        }
      }, {
        key: "buffer",
        get: function get() {
          return this._buf;
        }
      }]);

      return InputStream;
    }(); //
    // OutputStream
    //


    var EncapsEncoder =
    /*#__PURE__*/
    function () {
      function EncapsEncoder(stream, encaps) {
        _classCallCheck(this, EncapsEncoder);

        this._stream = stream;
        this._encaps = encaps;
        this._marshaledMap = new Map(); // Map<Ice.Value, int>;

        this._typeIdMap = null; // Lazy initialized. Map<String, int>

        this._typeIdIndex = 0;
      }

      _createClass(EncapsEncoder, [{
        key: "writeOptional",
        value: function writeOptional() {
          return false;
        }
      }, {
        key: "writePendingValues",
        value: function writePendingValues() {
          return undefined;
        }
      }, {
        key: "registerTypeId",
        value: function registerTypeId(typeId) {
          if (this._typeIdMap === null) // Lazy initialization
            {
              this._typeIdMap = new Map(); // Map<String, int>
            }

          var p = this._typeIdMap.get(typeId);

          if (p !== undefined) {
            return p;
          } else {
            this._typeIdMap.set(typeId, ++this._typeIdIndex);

            return -1;
          }
        }
      }]);

      return EncapsEncoder;
    }();

    var EncapsEncoder10 =
    /*#__PURE__*/
    function (_EncapsEncoder) {
      _inherits(EncapsEncoder10, _EncapsEncoder);

      function EncapsEncoder10(stream, encaps) {
        var _this47;

        _classCallCheck(this, EncapsEncoder10);

        _this47 = _possibleConstructorReturn(this, _getPrototypeOf(EncapsEncoder10).call(this, stream, encaps));
        _this47._sliceType = SliceType.NoSlice;
        _this47._writeSlice = 0; // Position of the slice data members

        _this47._valueIdIndex = 0;
        _this47._toBeMarshaledMap = new Map(); // Map<Ice.Value, Integer>();

        return _this47;
      }

      _createClass(EncapsEncoder10, [{
        key: "writeValue",
        value: function writeValue(v) {
          Debug.assert(v !== undefined); //
          // Object references are encoded as a negative integer in 1.0.
          //

          if (v !== null) {
            this._stream.writeInt(-this.registerValue(v));
          } else {
            this._stream.writeInt(0);
          }
        }
      }, {
        key: "writeException",
        value: function writeException(v) {
          Debug.assert(v !== null && v !== undefined); //
          // User exception with the 1.0 encoding start with a boolean
          // flag that indicates whether or not the exception uses
          // classes.
          //
          // This allows reading the pending instances even if some part of
          // the exception was sliced.
          //

          var usesClasses = v._usesClasses();

          this._stream.writeBool(usesClasses);

          v._write(this._stream);

          if (usesClasses) {
            this.writePendingValues();
          }
        }
      }, {
        key: "startInstance",
        value: function startInstance(sliceType) {
          this._sliceType = sliceType;
        }
      }, {
        key: "endInstance",
        value: function endInstance() {
          if (this._sliceType === SliceType.ValueSlice) {
            //
            // Write the Object slice.
            //
            this.startSlice(Ice.Value.ice_staticId(), -1, true);

            this._stream.writeSize(0); // For compatibility with the old AFM.


            this.endSlice();
          }

          this._sliceType = SliceType.NoSlice;
        }
      }, {
        key: "startSlice",
        value: function startSlice(typeId) {
          //
          // For instance slices, encode a boolean to indicate how the type ID
          // is encoded and the type ID either as a string or index. For
          // exception slices, always encode the type ID as a string.
          //
          if (this._sliceType === SliceType.ValueSlice) {
            var index = this.registerTypeId(typeId);

            if (index < 0) {
              this._stream.writeBool(false);

              this._stream.writeString(typeId);
            } else {
              this._stream.writeBool(true);

              this._stream.writeSize(index);
            }
          } else {
            this._stream.writeString(typeId);
          }

          this._stream.writeInt(0); // Placeholder for the slice length.


          this._writeSlice = this._stream.pos;
        }
      }, {
        key: "endSlice",
        value: function endSlice() {
          //
          // Write the slice length.
          //
          var sz = this._stream.pos - this._writeSlice + 4;

          this._stream.rewriteInt(sz, this._writeSlice - 4);
        }
      }, {
        key: "writePendingValues",
        value: function writePendingValues() {
          var _this48 = this;

          var writeCB = function writeCB(value, key) {
            //
            // Ask the instance to marshal itself. Any new class
            // instances that are triggered by the classes marshaled
            // are added to toBeMarshaledMap.
            //
            _this48._stream.writeInt(value);

            try {
              key.ice_preMarshal();
            } catch (ex) {
              _this48._stream.instance.initializationData().logger.warning("exception raised by ice_preMarshal:\n" + ex.toString());
            }

            key._iceWrite(_this48._stream);
          };

          while (this._toBeMarshaledMap.size > 0) {
            //
            // Consider the to be marshalled instances as marshalled now,
            // this is necessary to avoid adding again the "to be
            // marshalled instances" into _toBeMarshaledMap while writing
            // instances.
            //
            this._toBeMarshaledMap.forEach(function (value, key) {
              return _this48._marshaledMap.set(key, value);
            });

            var savedMap = this._toBeMarshaledMap;
            this._toBeMarshaledMap = new Map(); // Map<Ice.Value, int>();

            this._stream.writeSize(savedMap.size);

            savedMap.forEach(writeCB);
          }

          this._stream.writeSize(0); // Zero marker indicates end of sequence of sequences of instances.

        }
      }, {
        key: "registerValue",
        value: function registerValue(v) {
          Debug.assert(v !== null); //
          // Look for this instance in the to-be-marshaled map.
          //

          var p = this._toBeMarshaledMap.get(v);

          if (p !== undefined) {
            return p;
          } //
          // Didn't find it, try the marshaled map next.
          //


          p = this._marshaledMap.get(v);

          if (p !== undefined) {
            return p;
          } //
          // We haven't seen this instance previously, create a new
          // index, and insert it into the to-be-marshaled map.
          //


          this._toBeMarshaledMap.set(v, ++this._valueIdIndex);

          return this._valueIdIndex;
        }
      }]);

      return EncapsEncoder10;
    }(EncapsEncoder);

    var EncapsEncoder11 =
    /*#__PURE__*/
    function (_EncapsEncoder2) {
      _inherits(EncapsEncoder11, _EncapsEncoder2);

      function EncapsEncoder11(stream, encaps) {
        var _this49;

        _classCallCheck(this, EncapsEncoder11);

        _this49 = _possibleConstructorReturn(this, _getPrototypeOf(EncapsEncoder11).call(this, stream, encaps));
        _this49._current = null;
        _this49._valueIdIndex = 1;
        return _this49;
      }

      _createClass(EncapsEncoder11, [{
        key: "writeValue",
        value: function writeValue(v) {
          Debug.assert(v !== undefined);

          if (v === null) {
            this._stream.writeSize(0);
          } else if (this._current !== null && this._encaps.format === FormatType.SlicedFormat) {
            if (this._current.indirectionTable === null) // Lazy initialization
              {
                this._current.indirectionTable = []; // Ice.Value[]

                this._current.indirectionMap = new Map(); // Map<Ice.Value, int>
              } //
            // If writing an instance within a slice and using the sliced
            // format, write an index from the instance indirection
            // table. The indirect instance table is encoded at the end of
            // each slice and is always read (even if the Slice is
            // unknown).
            //


            var index = this._current.indirectionMap.get(v);

            if (index === undefined) {
              this._current.indirectionTable.push(v);

              var idx = this._current.indirectionTable.length; // Position + 1 (0 is reserved for nil)

              this._current.indirectionMap.set(v, idx);

              this._stream.writeSize(idx);
            } else {
              this._stream.writeSize(index);
            }
          } else {
            this.writeInstance(v); // Write the instance or a reference if already marshaled.
          }
        }
      }, {
        key: "writePendingValues",
        value: function writePendingValues() {
          return undefined;
        }
      }, {
        key: "writeException",
        value: function writeException(v) {
          Debug.assert(v !== null && v !== undefined);

          v._write(this._stream);
        }
      }, {
        key: "startInstance",
        value: function startInstance(sliceType, data) {
          if (this._current === null) {
            this._current = new EncapsEncoder11.InstanceData(null);
          } else {
            this._current = this._current.next === null ? new EncapsEncoder11.InstanceData(this._current) : this._current.next;
          }

          this._current.sliceType = sliceType;
          this._current.firstSlice = true;

          if (data !== null && data !== undefined) {
            this.writeSlicedData(data);
          }
        }
      }, {
        key: "endInstance",
        value: function endInstance() {
          this._current = this._current.previous;
        }
      }, {
        key: "startSlice",
        value: function startSlice(typeId, compactId, last) {
          Debug.assert((this._current.indirectionTable === null || this._current.indirectionTable.length === 0) && (this._current.indirectionMap === null || this._current.indirectionMap.size === 0));
          this._current.sliceFlagsPos = this._stream.pos;
          this._current.sliceFlags = 0;

          if (this._encaps.format === FormatType.SlicedFormat) {
            // Encode the slice size if using the sliced format.
            this._current.sliceFlags |= Protocol.FLAG_HAS_SLICE_SIZE;
          }

          if (last) {
            this._current.sliceFlags |= Protocol.FLAG_IS_LAST_SLICE; // This is the last slice.
          }

          this._stream.writeByte(0); // Placeholder for the slice flags
          //
          // For instance slices, encode the flag and the type ID either as a
          // string or index. For exception slices, always encode the type
          // ID a string.
          //


          if (this._current.sliceType === SliceType.ValueSlice) {
            //
            // Encode the type ID (only in the first slice for the compact
            // encoding).
            //
            if (this._encaps.format === FormatType.SlicedFormat || this._current.firstSlice) {
              if (compactId >= 0) {
                this._current.sliceFlags |= Protocol.FLAG_HAS_TYPE_ID_COMPACT;

                this._stream.writeSize(compactId);
              } else {
                var index = this.registerTypeId(typeId);

                if (index < 0) {
                  this._current.sliceFlags |= Protocol.FLAG_HAS_TYPE_ID_STRING;

                  this._stream.writeString(typeId);
                } else {
                  this._current.sliceFlags |= Protocol.FLAG_HAS_TYPE_ID_INDEX;

                  this._stream.writeSize(index);
                }
              }
            }
          } else {
            this._stream.writeString(typeId);
          }

          if ((this._current.sliceFlags & Protocol.FLAG_HAS_SLICE_SIZE) !== 0) {
            this._stream.writeInt(0); // Placeholder for the slice length.

          }

          this._current.writeSlice = this._stream.pos;
          this._current.firstSlice = false;
        }
      }, {
        key: "endSlice",
        value: function endSlice() {
          var _this50 = this;

          //
          // Write the optional member end marker if some optional members
          // were encoded. Note that the optional members are encoded before
          // the indirection table and are included in the slice size.
          //
          if ((this._current.sliceFlags & Protocol.FLAG_HAS_OPTIONAL_MEMBERS) !== 0) {
            this._stream.writeByte(Protocol.OPTIONAL_END_MARKER);
          } //
          // Write the slice length if necessary.
          //


          if ((this._current.sliceFlags & Protocol.FLAG_HAS_SLICE_SIZE) !== 0) {
            var sz = this._stream.pos - this._current.writeSlice + 4;

            this._stream.rewriteInt(sz, this._current.writeSlice - 4);
          } //
          // Only write the indirection table if it contains entries.
          //


          if (this._current.indirectionTable !== null && this._current.indirectionTable.length !== 0) {
            Debug.assert(this._encaps.format === FormatType.SlicedFormat);
            this._current.sliceFlags |= Protocol.FLAG_HAS_INDIRECTION_TABLE; //
            // Write the indirection instance table.
            //

            this._stream.writeSize(this._current.indirectionTable.length);

            this._current.indirectionTable.forEach(function (o) {
              return _this50.writeInstance(o);
            });

            this._current.indirectionTable.length = 0; // Faster way to clean array in JavaScript

            this._current.indirectionMap.clear();
          } //
          // Finally, update the slice flags.
          //


          this._stream.rewriteByte(this._current.sliceFlags, this._current.sliceFlagsPos);
        }
      }, {
        key: "writeOptional",
        value: function writeOptional(tag, format) {
          if (this._current === null) {
            return this._stream.writeOptImpl(tag, format);
          }

          if (this._stream.writeOptImpl(tag, format)) {
            this._current.sliceFlags |= Protocol.FLAG_HAS_OPTIONAL_MEMBERS;
            return true;
          }

          return false;
        }
      }, {
        key: "writeSlicedData",
        value: function writeSlicedData(slicedData) {
          var _this51 = this;

          Debug.assert(slicedData !== null && slicedData !== undefined); //
          // We only remarshal preserved slices if we are using the sliced
          // format. Otherwise, we ignore the preserved slices, which
          // essentially "slices" the instance into the most-derived type
          // known by the sender.
          //

          if (this._encaps.format !== FormatType.SlicedFormat) {
            return;
          }

          slicedData.slices.forEach(function (info) {
            _this51.startSlice(info.typeId, info.compactId, info.isLastSlice); //
            // Write the bytes associated with this slice.
            //


            _this51._stream.writeBlob(info.bytes);

            if (info.hasOptionalMembers) {
              _this51._current.sliceFlags |= Protocol.FLAG_HAS_OPTIONAL_MEMBERS;
            } //
            // Make sure to also re-write the instance indirection table.
            //


            if (info.instances !== null && info.instances.length > 0) {
              if (_this51._current.indirectionTable === null) // Lazy initialization
                {
                  _this51._current.indirectionTable = []; // Ice.Value[]

                  _this51._current.indirectionMap = new Map(); // Map<Ice.Value, int>
                }

              info.instances.forEach(function (instance) {
                return _this51._current.indirectionTable.push(instance);
              });
            }

            _this51.endSlice();
          });
        }
      }, {
        key: "writeInstance",
        value: function writeInstance(v) {
          Debug.assert(v !== null && v !== undefined); //
          // If the instance was already marshaled, just write it's ID.
          //

          var p = this._marshaledMap.get(v);

          if (p !== undefined) {
            this._stream.writeSize(p);

            return;
          } //
          // We haven't seen this instance previously, create a new ID,
          // insert it into the marshaled map, and write the instance.
          //


          this._marshaledMap.set(v, ++this._valueIdIndex);

          try {
            v.ice_preMarshal();
          } catch (ex) {
            this._stream.instance.initializationData().logger.warning("exception raised by ice_preMarshal:\n" + ex.toString());
          }

          this._stream.writeSize(1); // Object instance marker.


          v._iceWrite(this._stream);
        }
      }]);

      return EncapsEncoder11;
    }(EncapsEncoder);

    EncapsEncoder11.InstanceData =
    /*#__PURE__*/
    function () {
      function _class77(previous) {
        _classCallCheck(this, _class77);

        Debug.assert(previous !== undefined);

        if (previous !== null) {
          previous.next = this;
        }

        this.previous = previous;
        this.next = null; // Instance attributes

        this.sliceType = null;
        this.firstSlice = false; // Slice attributes

        this.sliceFlags = 0;
        this.writeSlice = 0; // Position of the slice data members

        this.sliceFlagsPos = 0; // Position of the slice flags

        this.indirectionTable = null; // Ice.Value[]

        this.indirectionMap = null; // Map<Ice.Value, int>
      }

      return _class77;
    }();

    var WriteEncaps =
    /*#__PURE__*/
    function () {
      function WriteEncaps() {
        _classCallCheck(this, WriteEncaps);

        this.start = 0;
        this.format = FormatType.DefaultFormat;
        this.encoding = null;
        this.encoding_1_0 = false;
        this.encoder = null;
        this.next = null;
      }

      _createClass(WriteEncaps, [{
        key: "reset",
        value: function reset() {
          this.encoder = null;
        }
      }, {
        key: "setEncoding",
        value: function setEncoding(encoding) {
          this.encoding = encoding;
          this.encoding_1_0 = encoding.equals(Ice.Encoding_1_0);
        }
      }]);

      return WriteEncaps;
    }();

    var OutputStream =
    /*#__PURE__*/
    function () {
      function OutputStream(arg1, arg2) {
        _classCallCheck(this, OutputStream);

        this._instance = null;
        this._encoding = null;

        if (arg1 !== undefined && arg1 !== null) {
          if (arg1.constructor == Ice.Communicator) {
            this._instance = arg1.instance;
          } else if (arg1.constructor == Ice.Instance) {
            this._instance = arg1;
          } else if (arg1.constructor == Ice.EncodingVersion) {
            this._encoding = arg1;
          } else {
            throw new Ice.InitializationException("unknown argument to OutputStream constructor");
          }
        }

        if (arg2 !== undefined && arg2 !== null) {
          if (arg2.constructor == Ice.EncodingVersion) {
            this._encoding = arg2;
          } else {
            throw new Ice.InitializationException("unknown argument to OutputStream constructor");
          }
        }

        this._buf = new Ice.Buffer();
        this._closure = null;
        this._encapsStack = null;
        this._encapsCache = null;

        if (this._instance !== null) {
          if (this._encoding === null) {
            this._encoding = this._instance.defaultsAndOverrides().defaultEncoding;
          }

          this._format = this._instance.defaultsAndOverrides().defaultFormat;
        } else {
          if (this._encoding === null) {
            this._encoding = Protocol.currentEncoding;
          }

          this._format = FormatType.CompactFormat;
        }
      } //
      // This function allows this object to be reused, rather than reallocated.
      //


      _createClass(OutputStream, [{
        key: "reset",
        value: function reset() {
          this._buf.reset();

          this.clear();
        }
      }, {
        key: "clear",
        value: function clear() {
          if (this._encapsStack !== null) {
            Debug.assert(this._encapsStack.next);
            this._encapsStack.next = this._encapsCache;
            this._encapsCache = this._encapsStack;

            this._encapsCache.reset();

            this._encapsStack = null;
          }
        }
      }, {
        key: "finished",
        value: function finished() {
          return this.prepareWrite().getArray(this.size);
        }
      }, {
        key: "swap",
        value: function swap(other) {
          Debug.assert(this._instance === other._instance);
          var _ref12 = [this._buf, other._buf];
          other._buf = _ref12[0];
          this._buf = _ref12[1];
          var _ref13 = [this._encoding, other._encoding];
          other._encoding = _ref13[0];
          this._encoding = _ref13[1];
          var _ref14 = [this._closure, other._closure];
          other._closure = _ref14[0];
          this._closure = _ref14[1];
          //
          // Swap is never called for streams that have encapsulations being written. However,
          // encapsulations might still be set in case marshaling failed. We just
          // reset the encapsulations if there are still some set.
          //
          this.resetEncapsulation();
          other.resetEncapsulation();
        }
      }, {
        key: "resetEncapsulation",
        value: function resetEncapsulation() {
          this._encapsStack = null;
        }
      }, {
        key: "resize",
        value: function resize(sz) {
          this._buf.resize(sz);

          this._buf.position = sz;
        }
      }, {
        key: "prepareWrite",
        value: function prepareWrite() {
          this._buf.position = 0;
          return this._buf;
        }
      }, {
        key: "startValue",
        value: function startValue(data) {
          Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);

          this._encapsStack.encoder.startInstance(SliceType.ValueSlice, data);
        }
      }, {
        key: "endValue",
        value: function endValue() {
          Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);

          this._encapsStack.encoder.endInstance();
        }
      }, {
        key: "startException",
        value: function startException(data) {
          Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);

          this._encapsStack.encoder.startInstance(SliceType.ExceptionSlice, data);
        }
      }, {
        key: "endException",
        value: function endException() {
          Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);

          this._encapsStack.encoder.endInstance();
        }
      }, {
        key: "startEncapsulation",
        value: function startEncapsulation(encoding, format) {
          //
          // If no encoding version is specified, use the current write
          // encapsulation encoding version if there's a current write
          // encapsulation, otherwise, use the stream encoding version.
          //
          if (encoding === undefined) {
            if (this._encapsStack !== null) {
              encoding = this._encapsStack.encoding;
              format = this._encapsStack.format;
            } else {
              encoding = this._encoding;
              format = FormatType.DefaultFormat;
            }
          }

          Protocol.checkSupportedEncoding(encoding);
          var curr = this._encapsCache;

          if (curr !== null) {
            curr.reset();
            this._encapsCache = this._encapsCache.next;
          } else {
            curr = new WriteEncaps();
          }

          curr.next = this._encapsStack;
          this._encapsStack = curr;
          this._encapsStack.format = format;

          this._encapsStack.setEncoding(encoding);

          this._encapsStack.start = this._buf.limit;
          this.writeInt(0); // Placeholder for the encapsulation length.

          this._encapsStack.encoding._write(this);
        }
      }, {
        key: "endEncapsulation",
        value: function endEncapsulation() {
          Debug.assert(this._encapsStack); // Size includes size and version.

          var start = this._encapsStack.start;
          var sz = this._buf.limit - start;

          this._buf.putIntAt(start, sz);

          var curr = this._encapsStack;
          this._encapsStack = curr.next;
          curr.next = this._encapsCache;
          this._encapsCache = curr;

          this._encapsCache.reset();
        }
      }, {
        key: "writeEmptyEncapsulation",
        value: function writeEmptyEncapsulation(encoding) {
          Protocol.checkSupportedEncoding(encoding);
          this.writeInt(6); // Size

          encoding._write(this);
        }
      }, {
        key: "writeEncapsulation",
        value: function writeEncapsulation(v) {
          if (v.length < 6) {
            throw new Ice.EncapsulationException();
          }

          this.expand(v.length);

          this._buf.putArray(v);
        }
      }, {
        key: "getEncoding",
        value: function getEncoding() {
          return this._encapsStack !== null ? this._encapsStack.encoding : this._encoding;
        }
      }, {
        key: "startSlice",
        value: function startSlice(typeId, compactId, last) {
          Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);

          this._encapsStack.encoder.startSlice(typeId, compactId, last);
        }
      }, {
        key: "endSlice",
        value: function endSlice() {
          Debug.assert(this._encapsStack !== null && this._encapsStack.encoder !== null);

          this._encapsStack.encoder.endSlice();
        }
      }, {
        key: "writePendingValues",
        value: function writePendingValues() {
          if (this._encapsStack !== null && this._encapsStack.encoder !== null) {
            this._encapsStack.encoder.writePendingValues();
          } else if (this._encapsStack !== null && this._encapsStack.encoding_1_0 || this._encapsStack === null && this._encoding.equals(Ice.Encoding_1_0)) {
            //
            // If using the 1.0 encoding and no instances were written, we
            // still write an empty sequence for pending instances if
            // requested (i.e.: if this is called).
            //
            // This is required by the 1.0 encoding, even if no instances
            // are written we do marshal an empty sequence if marshaled
            // data types use classes.
            //
            this.writeSize(0);
          }
        }
      }, {
        key: "writeSize",
        value: function writeSize(v) {
          if (v > 254) {
            this.expand(5);

            this._buf.put(255);

            this._buf.putInt(v);
          } else {
            this.expand(1);

            this._buf.put(v);
          }
        }
      }, {
        key: "startSize",
        value: function startSize() {
          var pos = this._buf.position;
          this.writeInt(0); // Placeholder for 32-bit size

          return pos;
        }
      }, {
        key: "endSize",
        value: function endSize(pos) {
          Debug.assert(pos >= 0);
          this.rewriteInt(this._buf.position - pos - 4, pos);
        }
      }, {
        key: "writeBlob",
        value: function writeBlob(v) {
          if (v === null) {
            return;
          }

          this.expand(v.length);

          this._buf.putArray(v);
        } // Read/write format and tag for optionals

      }, {
        key: "writeOptional",
        value: function writeOptional(tag, format) {
          Debug.assert(this._encapsStack !== null);

          if (this._encapsStack.encoder !== null) {
            return this._encapsStack.encoder.writeOptional(tag, format);
          }

          return this.writeOptImpl(tag, format);
        }
      }, {
        key: "writeOptionalHelper",
        value: function writeOptionalHelper(tag, format, write, v) {
          if (v !== undefined) {
            if (this.writeOptional(tag, format)) {
              write.call(this, v);
            }
          }
        }
      }, {
        key: "writeByte",
        value: function writeByte(v) {
          this.expand(1);

          this._buf.put(v);
        }
      }, {
        key: "rewriteByte",
        value: function rewriteByte(v, dest) {
          this._buf.putAt(dest, v);
        }
      }, {
        key: "writeByteSeq",
        value: function writeByteSeq(v) {
          if (v === null || v.length === 0) {
            this.writeSize(0);
          } else {
            this.writeSize(v.length);
            this.expand(v.length);

            this._buf.putArray(v);
          }
        }
      }, {
        key: "writeBool",
        value: function writeBool(v) {
          this.expand(1);

          this._buf.put(v ? 1 : 0);
        }
      }, {
        key: "rewriteBool",
        value: function rewriteBool(v, dest) {
          this._buf.putAt(dest, v ? 1 : 0);
        }
      }, {
        key: "writeShort",
        value: function writeShort(v) {
          this.expand(2);

          this._buf.putShort(v);
        }
      }, {
        key: "writeInt",
        value: function writeInt(v) {
          this.expand(4);

          this._buf.putInt(v);
        }
      }, {
        key: "rewriteInt",
        value: function rewriteInt(v, dest) {
          this._buf.putIntAt(dest, v);
        }
      }, {
        key: "writeLong",
        value: function writeLong(v) {
          this.expand(8);

          this._buf.putLong(v);
        }
      }, {
        key: "writeFloat",
        value: function writeFloat(v) {
          this.expand(4);

          this._buf.putFloat(v);
        }
      }, {
        key: "writeDouble",
        value: function writeDouble(v) {
          this.expand(8);

          this._buf.putDouble(v);
        }
      }, {
        key: "writeString",
        value: function writeString(v) {
          if (v === null || v.length === 0) {
            this.writeSize(0);
          } else {
            this._buf.writeString(this, v);
          }
        }
      }, {
        key: "writeProxy",
        value: function writeProxy(v) {
          if (v !== null) {
            v._write(this);
          } else {
            var ident = new Ice.Identity();

            ident._write(this);
          }
        }
      }, {
        key: "writeOptionalProxy",
        value: function writeOptionalProxy(tag, v) {
          if (v !== undefined) {
            if (this.writeOptional(tag, OptionalFormat.FSize)) {
              var pos = this.startSize();
              this.writeProxy(v);
              this.endSize(pos);
            }
          }
        }
      }, {
        key: "writeEnum",
        value: function writeEnum(v) {
          if (this.isEncoding_1_0()) {
            if (v.maxValue < 127) {
              this.writeByte(v.value);
            } else if (v.maxValue < 32767) {
              this.writeShort(v.value);
            } else {
              this.writeInt(v.value);
            }
          } else {
            this.writeSize(v.value);
          }
        }
      }, {
        key: "writeValue",
        value: function writeValue(v) {
          this.initEncaps();

          this._encapsStack.encoder.writeValue(v);
        }
      }, {
        key: "writeOptionalValue",
        value: function writeOptionalValue(tag, v) {
          if (v !== undefined) {
            if (this.writeOptional(tag, OptionalFormat.Class)) {
              this.writeValue(v);
            }
          }
        }
      }, {
        key: "writeException",
        value: function writeException(e) {
          this.initEncaps();

          this._encapsStack.encoder.writeException(e);
        } //
        // Keep for compatibility with 3.7.0 remove with next major version
        //

      }, {
        key: "writeUserException",
        value: function writeUserException(e) {
          this.WriteException(e);
        }
      }, {
        key: "writeOptImpl",
        value: function writeOptImpl(tag, format) {
          if (this.isEncoding_1_0()) {
            return false; // Optional members aren't supported with the 1.0 encoding.
          }

          var v = format.value;

          if (tag < 30) {
            v |= tag << 3;
            this.writeByte(v);
          } else {
            v |= 0x0F0; // tag = 30

            this.writeByte(v);
            this.writeSize(tag);
          }

          return true;
        }
      }, {
        key: "isEmpty",
        value: function isEmpty() {
          return this._buf.empty();
        }
      }, {
        key: "expand",
        value: function expand(n) {
          this._buf.expand(n);
        }
      }, {
        key: "isEncoding_1_0",
        value: function isEncoding_1_0() {
          return this._encapsStack ? this._encapsStack.encoding_1_0 : this._encoding.equals(Ice.Encoding_1_0);
        }
      }, {
        key: "initEncaps",
        value: function initEncaps() {
          if (!this._encapsStack) // Lazy initialization
            {
              this._encapsStack = this._encapsCache;

              if (this._encapsStack) {
                this._encapsCache = this._encapsCache.next;
              } else {
                this._encapsStack = new WriteEncaps();
              }

              this._encapsStack.setEncoding(this._encoding);
            }

          if (this._encapsStack.format === FormatType.DefaultFormat) {
            this._encapsStack.format = this._instance.defaultsAndOverrides().defaultFormat;
          }

          if (!this._encapsStack.encoder) // Lazy initialization.
            {
              if (this._encapsStack.encoding_1_0) {
                this._encapsStack.encoder = new EncapsEncoder10(this, this._encapsStack);
              } else {
                this._encapsStack.encoder = new EncapsEncoder11(this, this._encapsStack);
              }
            }
        } //
        // Sets the encoding format for class and exception instances.
        //

      }, {
        key: "format",
        get: function get() {
          return this._format;
        },
        set: function set(value) {
          this._format = value;
        }
      }, {
        key: "pos",
        get: function get() {
          return this._buf.position;
        },
        set: function set(value) {
          this._buf.position = value;
        }
      }, {
        key: "size",
        get: function get() {
          return this._buf.limit;
        }
      }, {
        key: "instance",
        get: function get() {
          return this._instance;
        }
      }, {
        key: "closure",
        get: function get() {
          return this._closure;
        },
        set: function set(value) {
          this._closure = value;
        }
      }, {
        key: "buffer",
        get: function get() {
          return this._buf;
        }
      }]);

      return OutputStream;
    }();

    var defineBuiltinHelper = function defineBuiltinHelper(_write2, _read2, sz, format, min, max) {
      var helper =
      /*#__PURE__*/
      function () {
        function helper() {
          _classCallCheck(this, helper);
        }

        _createClass(helper, null, [{
          key: "write",
          value: function write(os, v) {
            return _write2.call(os, v);
          }
        }, {
          key: "read",
          value: function read(is) {
            return _read2.call(is);
          }
        }, {
          key: "writeOptional",
          value: function writeOptional(os, tag, v) {
            os.writeOptionalHelper(tag, format, _write2, v);
          }
        }, {
          key: "readOptional",
          value: function readOptional(is, tag) {
            return is.readOptionalHelper(tag, format, _read2);
          }
        }, {
          key: "minWireSize",
          get: function get() {
            return sz;
          }
        }]);

        return helper;
      }();

      if (min !== undefined && max !== undefined) {
        helper.validate = function (v) {
          return v >= min && v <= max;
        };
      }

      return helper;
    };

    var istr = InputStream.prototype;
    var ostr = OutputStream.prototype; //
    // Constants to use in number type range checks.
    //

    var MIN_UINT8_VALUE = 0x0;
    var MAX_UINT8_VALUE = 0xFF;
    var MIN_INT16_VALUE = -0x8000;
    var MAX_INT16_VALUE = 0x7FFF;
    var MIN_UINT32_VALUE = 0x0;
    var MAX_UINT32_VALUE = 0xFFFFFFFF;
    var MIN_INT32_VALUE = -0x80000000;
    var MAX_INT32_VALUE = 0x7FFFFFFF;
    var MIN_FLOAT32_VALUE = -3.4028234664e+38;
    var MAX_FLOAT32_VALUE = 3.4028234664e+38;
    Ice.ByteHelper = defineBuiltinHelper(ostr.writeByte, istr.readByte, 1, Ice.OptionalFormat.F1, MIN_UINT8_VALUE, MAX_UINT8_VALUE);
    Ice.ShortHelper = defineBuiltinHelper(ostr.writeShort, istr.readShort, 2, Ice.OptionalFormat.F2, MIN_INT16_VALUE, MAX_INT16_VALUE);
    Ice.IntHelper = defineBuiltinHelper(ostr.writeInt, istr.readInt, 4, Ice.OptionalFormat.F4, MIN_INT32_VALUE, MAX_INT32_VALUE);
    Ice.FloatHelper = defineBuiltinHelper(ostr.writeFloat, istr.readFloat, 4, Ice.OptionalFormat.F4, MIN_FLOAT32_VALUE, MAX_FLOAT32_VALUE);

    Ice.FloatHelper.validate = function (v) {
      return Number.isNaN(v) || v == Number.POSITIVE_INFINITY || v == Number.NEGATIVE_INFINITY || v >= MIN_FLOAT32_VALUE && v <= MAX_FLOAT32_VALUE;
    };

    Ice.DoubleHelper = defineBuiltinHelper(ostr.writeDouble, istr.readDouble, 8, Ice.OptionalFormat.F8, -Number.MAX_VALUE, Number.MAX_VALUE);

    Ice.DoubleHelper.validate = function (v) {
      return Number.isNaN(v) || v == Number.POSITIVE_INFINITY || v == Number.NEGATIVE_INFINITY || v >= -Number.MAX_VALUE && v <= Number.MAX_VALUE;
    };

    Ice.BoolHelper = defineBuiltinHelper(ostr.writeBool, istr.readBool, 1, Ice.OptionalFormat.F1);
    Ice.LongHelper = defineBuiltinHelper(ostr.writeLong, istr.readLong, 8, Ice.OptionalFormat.F8);

    Ice.LongHelper.validate = function (v) {
      //
      // For a long to be valid both words must be within the range of UINT32
      //
      return v.low >= MIN_UINT32_VALUE && v.low <= MAX_UINT32_VALUE && v.high >= MIN_UINT32_VALUE && v.high <= MAX_UINT32_VALUE;
    };

    Ice.StringHelper = defineBuiltinHelper(ostr.writeString, istr.readString, 1, Ice.OptionalFormat.VSize);

    Ice.ObjectHelper =
    /*#__PURE__*/
    function () {
      function _class78() {
        _classCallCheck(this, _class78);
      }

      _createClass(_class78, null, [{
        key: "write",
        value: function write(os, v) {
          os.writeValue(v);
        }
      }, {
        key: "read",
        value: function read(is) {
          var o;
          is.readValue(function (v) {
            o = v;
          }, Ice.Value);
          return o;
        }
      }, {
        key: "writeOptional",
        value: function writeOptional(os, tag, v) {
          os.writeOptionalValue(tag, Ice.OptionalFormat.Class, ostr.writeValue, v);
        }
      }, {
        key: "readOptional",
        value: function readOptional(is, tag) {
          var o;
          is.readOptionalValue(tag, function (v) {
            o = v;
          }, Ice.Value);
          return o;
        }
      }, {
        key: "minWireSize",
        get: function get() {
          return 1;
        }
      }]);

      return _class78;
    }();

    Ice.InputStream = InputStream;
    Ice.OutputStream = OutputStream;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    Ice.SocketOperation = {
      None: 0,
      Read: 1,
      Write: 2,
      Connect: 2 // Same as Write

    };
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Logger = Ice.Logger;
    var processLogger = null;

    Ice.getProcessLogger = function () {
      if (processLogger === null) {
        //
        // TODO: Would be nice to be able to use process name as prefix by default.
        //
        processLogger = new Logger("", "");
      }

      return processLogger;
    };

    Ice.setProcessLogger = function (logger) {
      processLogger = logger;
    };
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var OutputStream = Ice.OutputStream;
    var Debug = Ice.Debug;
    var Protocol = Ice.Protocol;
    var udpOverhead = 20 + 8;

    var BatchRequestQueue =
    /*#__PURE__*/
    function () {
      function BatchRequestQueue(instance, datagram) {
        _classCallCheck(this, BatchRequestQueue);

        this._batchStreamInUse = false;
        this._batchRequestNum = 0;
        this._batchStream = new OutputStream(instance, Protocol.currentProtocolEncoding);

        this._batchStream.writeBlob(Protocol.requestBatchHdr);

        this._batchMarker = this._batchStream.size;
        this._exception = null;
        this._maxSize = instance.batchAutoFlushSize();

        if (this._maxSize > 0 && datagram) {
          var udpSndSize = instance.initializationData().properties.getPropertyAsIntWithDefault("Ice.UDP.SndSize", 65535 - udpOverhead);

          if (udpSndSize < this._maxSize) {
            this._maxSize = udpSndSize;
          }
        }
      }

      _createClass(BatchRequestQueue, [{
        key: "prepareBatchRequest",
        value: function prepareBatchRequest(os) {
          if (this._exception) {
            throw this._exception;
          }

          this._batchStream.swap(os);
        }
      }, {
        key: "finishBatchRequest",
        value: function finishBatchRequest(os, proxy, operation) {
          //
          // No need for synchronization, no other threads are supposed
          // to modify the queue since we set this._batchStreamInUse to true.
          //
          this._batchStream.swap(os);

          try {
            if (this._maxSize > 0 && this._batchStream.size >= this._maxSize) {
              proxy.ice_flushBatchRequests(); // Auto flush
            }

            Debug.assert(this._batchMarker < this._batchStream.size);
            this._batchMarker = this._batchStream.size;
            ++this._batchRequestNum;
          } finally {
            this._batchStream.resize(this._batchMarker);
          }
        }
      }, {
        key: "abortBatchRequest",
        value: function abortBatchRequest(os) {
          this._batchStream.swap(os);

          this._batchStream.resize(this._batchMarker);
        }
      }, {
        key: "swap",
        value: function swap(os) {
          if (this._batchRequestNum === 0) {
            return 0;
          }

          var lastRequest = null;

          if (this._batchMarker < this._batchStream.size) {
            var length = this._batchStream.size - this._batchMarker;
            this._batchStream.pos = this._batchMarker;
            lastRequest = this._batchStream.buffer.getArray(length);

            this._batchStream.resize(this._batchMarker);
          }

          var requestNum = this._batchRequestNum;

          this._batchStream.swap(os); //
          // Reset the batch.
          //


          this._batchRequestNum = 0;

          this._batchStream.writeBlob(Protocol.requestBatchHdr);

          this._batchMarker = this._batchStream.size;

          if (lastRequest !== null) {
            this._batchStream.writeBlob(lastRequest);
          }

          return requestNum;
        }
      }, {
        key: "destroy",
        value: function destroy(ex) {
          this._exception = ex;
        }
      }, {
        key: "isEmpty",
        value: function isEmpty() {
          return this._batchStream.size === Protocol.requestBatchHdr.length;
        }
      }]);

      return BatchRequestQueue;
    }();

    Ice.BatchRequestQueue = BatchRequestQueue;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var AsyncResultBase = Ice.AsyncResultBase;
    var Debug = Ice.Debug;
    var Protocol = Ice.Protocol;
    var UserException = Ice.UserException;
    var OutputStream = Ice.OutputStream;

    var AsyncResult =
    /*#__PURE__*/
    function (_AsyncResultBase) {
      _inherits(AsyncResult, _AsyncResultBase);

      function AsyncResult(com, op, connection, proxy, adapter, completedFn) {
        var _this52;

        _classCallCheck(this, AsyncResult);

        _this52 = _possibleConstructorReturn(this, _getPrototypeOf(AsyncResult).call(this, com, op, connection, proxy, adapter));
        _this52._completed = completedFn;
        _this52._is = null;
        _this52._os = com !== null ? new OutputStream(_this52._instance, Protocol.currentProtocolEncoding) : null;
        _this52._state = 0;
        _this52._exception = null;
        _this52._sentSynchronously = false;
        return _this52;
      }

      _createClass(AsyncResult, [{
        key: "cancel",
        value: function cancel() {
          this.cancelWithException(new Ice.InvocationCanceledException());
        }
      }, {
        key: "isCompleted",
        value: function isCompleted() {
          return (this._state & AsyncResult.Done) > 0;
        }
      }, {
        key: "isSent",
        value: function isSent() {
          return (this._state & AsyncResult.Sent) > 0;
        }
      }, {
        key: "throwLocalException",
        value: function throwLocalException() {
          if (this._exception !== null) {
            throw this._exception;
          }
        }
      }, {
        key: "sentSynchronously",
        value: function sentSynchronously() {
          return this._sentSynchronously;
        }
      }, {
        key: "markSent",
        value: function markSent(done) {
          Debug.assert((this._state & AsyncResult.Done) === 0);
          this._state |= AsyncResult.Sent;

          if (done) {
            this._state |= AsyncResult.Done | AsyncResult.OK;
            this._cancellationHandler = null;
            this.resolve();
          }
        }
      }, {
        key: "markFinished",
        value: function markFinished(ok, completed) {
          Debug.assert((this._state & AsyncResult.Done) === 0);
          this._state |= AsyncResult.Done;

          if (ok) {
            this._state |= AsyncResult.OK;
          }

          this._cancellationHandler = null;

          if (completed) {
            completed(this);
          } else {
            this.resolve();
          }
        }
      }, {
        key: "markFinishedEx",
        value: function markFinishedEx(ex) {
          Debug.assert((this._state & AsyncResult.Done) === 0);
          this._exception = ex;
          this._state |= AsyncResult.Done;
          this._cancellationHandler = null;
          this.reject(ex);
        }
      }, {
        key: "cancelWithException",
        value: function cancelWithException(ex) {
          this._cancellationException = ex;

          if (this._cancellationHandler) {
            this._cancellationHandler.asyncRequestCanceled(this, ex);
          }
        }
      }, {
        key: "cancelable",
        value: function cancelable(handler) {
          if (this._cancellationException) {
            try {
              throw this._cancellationException;
            } finally {
              this._cancellationException = null;
            }
          }

          this._cancellationHandler = handler;
        }
      }, {
        key: "getOs",
        value: function getOs() {
          return this._os;
        }
      }, {
        key: "startReadParams",
        value: function startReadParams() {
          this._is.startEncapsulation();

          return this._is;
        }
      }, {
        key: "endReadParams",
        value: function endReadParams() {
          this._is.endEncapsulation();
        }
      }, {
        key: "readEmptyParams",
        value: function readEmptyParams() {
          this._is.skipEmptyEncapsulation();
        }
      }, {
        key: "throwUserException",
        value: function throwUserException() {
          Debug.assert((this._state & AsyncResult.Done) !== 0);

          if ((this._state & AsyncResult.OK) === 0) {
            try {
              this._is.startEncapsulation();

              this._is.throwException();
            } catch (ex) {
              if (ex instanceof UserException) {
                this._is.endEncapsulation();
              }

              throw ex;
            }
          }
        }
      }]);

      return AsyncResult;
    }(AsyncResultBase);

    AsyncResult.OK = 0x1;
    AsyncResult.Done = 0x2;
    AsyncResult.Sent = 0x4;
    Ice.AsyncResult = AsyncResult;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var StringUtil = Ice.StringUtil;
    var Identity = Ice.Identity;
    var IdentityParseException = Ice.IdentityParseException;
    /**
    * Converts a string to an object identity.
    *
    * @param s The string to convert.
    *
    * @return The converted object identity.
    **/

    Ice.stringToIdentity = function (s) {
      var ident = new Identity(); //
      // Find unescaped separator; note that the string may contain an escaped
      // backslash before the separator.
      //

      var slash = -1;
      var pos = 0;

      while ((pos = s.indexOf('/', pos)) !== -1) {
        var escapes = 0;

        while (pos - escapes > 0 && s.charAt(pos - escapes - 1) == '\\') {
          escapes++;
        } //
        // We ignore escaped escapes
        //


        if (escapes % 2 === 0) {
          if (slash == -1) {
            slash = pos;
          } else {
            //
            // Extra unescaped slash found.
            //
            throw new IdentityParseException("unescaped backslash in identity `".concat(s, "'"));
          }
        }

        pos++;
      }

      if (slash == -1) {
        ident.category = "";

        try {
          ident.name = StringUtil.unescapeString(s, 0, s.length, "/");
        } catch (e) {
          throw new IdentityParseException("invalid identity name `".concat(s, "': ").concat(e.toString()));
        }
      } else {
        try {
          ident.category = StringUtil.unescapeString(s, 0, slash, "/");
        } catch (e) {
          throw new IdentityParseException("invalid category in identity `".concat(s, "': ").concat(e.toString()));
        }

        if (slash + 1 < s.length) {
          try {
            ident.name = StringUtil.unescapeString(s, slash + 1, s.length, "/");
          } catch (e) {
            throw new IdentityParseException("invalid name in identity `".concat(s, "': ").concat(e.toString()));
          }
        } else {
          ident.name = "";
        }
      }

      return ident;
    };
    /**
    * Converts an object identity to a string.
    *
    * @param ident The object identity to convert.
    *
    * @param toStringMode Specifies if and how non-printable ASCII characters are escaped in the result.
    *
    * @return The string representation of the object identity.
    **/


    Ice.identityToString = function (ident) {
      var toStringMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Ice.ToStringMode.Unicode;

      if (ident.category === null || ident.category.length === 0) {
        return StringUtil.escapeString(ident.name, "/", toStringMode);
      } else {
        return StringUtil.escapeString(ident.category, "/", toStringMode) + '/' + StringUtil.escapeString(ident.name, "/", toStringMode);
      }
    };
    /**
    * Compares the object identities of two proxies.
    *
    * @param lhs A proxy.
    * @param rhs A proxy.
    * @return -1 if the identity in <code>lhs</code> compares
    * less than the identity in <code>rhs</code>; 0 if the identities
    * compare equal; 1, otherwise.
    *
    * @see ProxyIdentityKey
    * @see ProxyIdentityAndFacetKey
    * @see ProxyIdentityAndFacetCompare
    **/


    Ice.proxyIdentityCompare = function (lhs, rhs) {
      if (lhs === rhs) {
        return 0;
      } else if (lhs === null && rhs !== null) {
        return -1;
      } else if (lhs !== null && rhs === null) {
        return 1;
      } else {
        var lhsIdentity = lhs.ice_getIdentity();
        var rhsIdentity = rhs.ice_getIdentity();
        var n = lhsIdentity.name.localeCompare(rhsIdentity.name);
        return n !== 0 ? n : lhsIdentity.category.localeCompare(rhsIdentity.category);
      }
    };
    /**
    * Compares the object identities and facets of two proxies.
    *
    * @param lhs A proxy.
    * @param rhs A proxy.
    * @return -1 if the identity and facet in <code>lhs</code> compare
    * less than the identity and facet in <code>rhs</code>; 0 if the identities
    * and facets compare equal; 1, otherwise.
    *
    * @see ProxyIdentityAndFacetKey
    * @see ProxyIdentityKey
    * @see ProxyIdentityCompare
    **/


    Ice.proxyIdentityAndFacetCompare = function (lhs, rhs) {
      if (lhs === rhs) {
        return 0;
      } else if (lhs === null && rhs !== null) {
        return -1;
      } else if (lhs !== null && rhs === null) {
        return 1;
      } else {
        var lhsIdentity = lhs.ice_getIdentity();
        var rhsIdentity = rhs.ice_getIdentity();
        var n = lhsIdentity.name.localeCompare(rhsIdentity.name);

        if (n !== 0) {
          return n;
        }

        n = lhsIdentity.category.localeCompare(rhsIdentity.category);

        if (n !== 0) {
          return n;
        }

        var lhsFacet = lhs.ice_getFacet();
        var rhsFacet = rhs.ice_getFacet();

        if (lhsFacet === null && rhsFacet === null) {
          return 0;
        } else if (lhsFacet === null) {
          return -1;
        } else if (rhsFacet === null) {
          return 1;
        }

        return lhsFacet.localeCompare(rhsFacet);
      }
    };
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var AsyncStatus = Ice.AsyncStatus;
    var AsyncResult = Ice.AsyncResult;
    var InputStream = Ice.InputStream;
    var OutputStream = Ice.OutputStream;
    var Debug = Ice.Debug;
    var RetryException = Ice.RetryException;
    var Protocol = Ice.Protocol;
    var Identity = Ice.Identity;

    var OutgoingAsyncBase =
    /*#__PURE__*/
    function (_AsyncResult) {
      _inherits(OutgoingAsyncBase, _AsyncResult);

      function OutgoingAsyncBase(communicator, operation, connection, proxy, adapter) {
        var _this53;

        _classCallCheck(this, OutgoingAsyncBase);

        _this53 = _possibleConstructorReturn(this, _getPrototypeOf(OutgoingAsyncBase).call(this, communicator, operation, connection, proxy, adapter));
        _this53._os = new OutputStream(_this53._instance, Protocol.currentProtocolEncoding);
        return _this53;
      }

      _createClass(OutgoingAsyncBase, [{
        key: "getOs",
        value: function getOs() {
          return this._os;
        }
      }, {
        key: "sent",
        value: function sent() {
          this.markSent(true);
        }
      }, {
        key: "completedEx",
        value: function completedEx(ex) {
          this.markFinishedEx(ex);
        }
      }]);

      return OutgoingAsyncBase;
    }(AsyncResult);

    var ProxyOutgoingAsyncBase =
    /*#__PURE__*/
    function (_OutgoingAsyncBase) {
      _inherits(ProxyOutgoingAsyncBase, _OutgoingAsyncBase);

      function ProxyOutgoingAsyncBase(prx, operation) {
        var _this54;

        _classCallCheck(this, ProxyOutgoingAsyncBase);

        _this54 = _possibleConstructorReturn(this, _getPrototypeOf(ProxyOutgoingAsyncBase).call(this, prx.ice_getCommunicator(), operation, null, prx, null));
        _this54._mode = null;
        _this54._cnt = 0;
        _this54._sent = false;
        _this54._handler = null;
        return _this54;
      }

      _createClass(ProxyOutgoingAsyncBase, [{
        key: "completedEx",
        value: function completedEx(ex) {
          try {
            this._instance.retryQueue().add(this, this.handleException(ex));
          } catch (ex) {
            this.markFinishedEx(ex);
          }
        }
      }, {
        key: "retryException",
        value: function retryException(ex) {
          try {
            this._proxy._updateRequestHandler(this._handler, null); // Clear request handler and always retry.


            this._instance.retryQueue().add(this, 0);
          } catch (ex) {
            this.completedEx(ex);
          }
        }
      }, {
        key: "retry",
        value: function retry() {
          this.invokeImpl(false);
        }
      }, {
        key: "abort",
        value: function abort(ex) {
          this.markFinishedEx(ex);
        }
      }, {
        key: "invokeImpl",
        value: function invokeImpl(userThread) {
          var _this55 = this;

          try {
            if (userThread) {
              var invocationTimeout = this._proxy._getReference().getInvocationTimeout();

              if (invocationTimeout > 0) {
                this._timeoutToken = this._instance.timer().schedule(function () {
                  _this55.cancelWithException(new Ice.InvocationTimeoutException());
                }, invocationTimeout);
              }
            }

            while (true) {
              try {
                this._sent = false;
                this._handler = this._proxy._getRequestHandler();

                if ((this._handler.sendAsyncRequest(this) & AsyncStatus.Sent) > 0) {
                  if (userThread) {
                    this._sentSynchronously = true;
                  }
                }

                return; // We're done!
              } catch (ex) {
                if (ex instanceof RetryException) {
                  // Clear request handler and always retry
                  this._proxy._updateRequestHandler(this._handler, null);
                } else {
                  var interval = this.handleException(ex);

                  if (interval > 0) {
                    this._instance.retryQueue().add(this, interval);

                    return;
                  }
                }
              }
            }
          } catch (ex) {
            this.markFinishedEx(ex);
          }
        }
      }, {
        key: "markSent",
        value: function markSent(done) {
          this._sent = true;

          if (done) {
            if (this._timeoutToken) {
              this._instance.timer().cancel(this._timeoutToken);
            }
          }

          _get(_getPrototypeOf(ProxyOutgoingAsyncBase.prototype), "markSent", this).call(this, done);
        }
      }, {
        key: "markFinishedEx",
        value: function markFinishedEx(ex) {
          if (this._timeoutToken) {
            this._instance.timer().cancel(this._timeoutToken);
          }

          _get(_getPrototypeOf(ProxyOutgoingAsyncBase.prototype), "markFinishedEx", this).call(this, ex);
        }
      }, {
        key: "handleException",
        value: function handleException(ex) {
          var interval = {
            value: 0
          };
          this._cnt = this._proxy._handleException(ex, this._handler, this._mode, this._sent, interval, this._cnt);
          return interval.value;
        }
      }]);

      return ProxyOutgoingAsyncBase;
    }(OutgoingAsyncBase);

    var OutgoingAsync =
    /*#__PURE__*/
    function (_ProxyOutgoingAsyncBa) {
      _inherits(OutgoingAsync, _ProxyOutgoingAsyncBa);

      function OutgoingAsync(prx, operation, completed) {
        var _this56;

        _classCallCheck(this, OutgoingAsync);

        _this56 = _possibleConstructorReturn(this, _getPrototypeOf(OutgoingAsync).call(this, prx, operation));
        _this56._encoding = Protocol.getCompatibleEncoding(_this56._proxy._getReference().getEncoding());
        _this56._completed = completed;
        return _this56;
      }

      _createClass(OutgoingAsync, [{
        key: "prepare",
        value: function prepare(op, mode, ctx) {
          Protocol.checkSupportedProtocol(Protocol.getCompatibleProtocol(this._proxy._getReference().getProtocol()));
          this._mode = mode;

          if (ctx === null) {
            ctx = OutgoingAsync._emptyContext;
          }

          if (this._proxy.ice_isBatchOneway() || this._proxy.ice_isBatchDatagram()) {
            this._proxy._getBatchRequestQueue().prepareBatchRequest(this._os);
          } else {
            this._os.writeBlob(Protocol.requestHdr);
          }

          var ref = this._proxy._getReference();

          ref.getIdentity()._write(this._os); //
          // For compatibility with the old FacetPath.
          //


          var facet = ref.getFacet();

          if (facet === null || facet.length === 0) {
            Ice.StringSeqHelper.write(this._os, null);
          } else {
            Ice.StringSeqHelper.write(this._os, [facet]);
          }

          this._os.writeString(this._operation);

          this._os.writeByte(mode.value);

          if (ctx !== undefined) {
            if (ctx !== null && !(ctx instanceof Map)) {
              throw new RangeError("illegal context value, expecting null or Map");
            } //
            // Explicit context
            //


            Ice.ContextHelper.write(this._os, ctx);
          } else {
            //
            // Implicit context
            //
            var implicitContext = ref.getInstance().getImplicitContext();
            var prxContext = ref.getContext();

            if (implicitContext === null) {
              Ice.ContextHelper.write(this._os, prxContext);
            } else {
              implicitContext.write(prxContext, this._os);
            }
          }
        }
      }, {
        key: "sent",
        value: function sent() {
          this.markSent(!this._proxy.ice_isTwoway());
        }
      }, {
        key: "invokeRemote",
        value: function invokeRemote(connection, response) {
          return connection.sendAsyncRequest(this, response, 0);
        }
      }, {
        key: "abort",
        value: function abort(ex) {
          if (this._proxy.ice_isBatchOneway() || this._proxy.ice_isBatchDatagram()) {
            this._proxy._getBatchRequestQueue().abortBatchRequest(this._os);
          }

          _get(_getPrototypeOf(OutgoingAsync.prototype), "abort", this).call(this, ex);
        }
      }, {
        key: "invoke",
        value: function invoke() {
          if (this._proxy.ice_isBatchOneway() || this._proxy.ice_isBatchDatagram()) {
            this._sentSynchronously = true;

            this._proxy._getBatchRequestQueue().finishBatchRequest(this._os, this._proxy, this._operation);

            this.markFinished(true);
            return;
          } //
          // NOTE: invokeImpl doesn't throw so this can be called from the
          // try block with the catch block calling abort() in case of an
          // exception.
          //


          this.invokeImpl(true); // userThread = true
        }
      }, {
        key: "completed",
        value: function completed(istr) {
          Debug.assert(this._proxy.ice_isTwoway()); // Can only be called for twoways.

          var replyStatus;

          try {
            if (this._is === null) // _is can already be initialized if the invocation is retried
              {
                this._is = new InputStream(this._instance, Protocol.currentProtocolEncoding);
              }

            this._is.swap(istr);

            replyStatus = this._is.readByte();

            switch (replyStatus) {
              case Protocol.replyOK:
              case Protocol.replyUserException:
                {
                  break;
                }

              case Protocol.replyObjectNotExist:
              case Protocol.replyFacetNotExist:
              case Protocol.replyOperationNotExist:
                {
                  var id = new Identity();

                  id._read(this._is); //
                  // For compatibility with the old FacetPath.
                  //


                  var facetPath = Ice.StringSeqHelper.read(this._is);
                  var facet;

                  if (facetPath.length > 0) {
                    if (facetPath.length > 1) {
                      throw new Ice.MarshalException();
                    }

                    facet = facetPath[0];
                  } else {
                    facet = "";
                  }

                  var operation = this._is.readString();

                  var rfe = null;

                  switch (replyStatus) {
                    case Protocol.replyObjectNotExist:
                      {
                        rfe = new Ice.ObjectNotExistException();
                        break;
                      }

                    case Protocol.replyFacetNotExist:
                      {
                        rfe = new Ice.FacetNotExistException();
                        break;
                      }

                    case Protocol.replyOperationNotExist:
                      {
                        rfe = new Ice.OperationNotExistException();
                        break;
                      }

                    default:
                      {
                        Debug.assert(false);
                        break;
                      }
                  }

                  rfe.id = id;
                  rfe.facet = facet;
                  rfe.operation = operation;
                  throw rfe;
                }

              case Protocol.replyUnknownException:
              case Protocol.replyUnknownLocalException:
              case Protocol.replyUnknownUserException:
                {
                  var unknown = this._is.readString();

                  var ue = null;

                  switch (replyStatus) {
                    case Protocol.replyUnknownException:
                      {
                        ue = new Ice.UnknownException();
                        break;
                      }

                    case Protocol.replyUnknownLocalException:
                      {
                        ue = new Ice.UnknownLocalException();
                        break;
                      }

                    case Protocol.replyUnknownUserException:
                      {
                        ue = new Ice.UnknownUserException();
                        break;
                      }

                    default:
                      {
                        Debug.assert(false);
                        break;
                      }
                  }

                  ue.unknown = unknown;
                  throw ue;
                }

              default:
                {
                  throw new Ice.UnknownReplyStatusException();
                }
            }

            this.markFinished(replyStatus == Protocol.replyOK, this._completed);
          } catch (ex) {
            this.completedEx(ex);
          }
        }
      }, {
        key: "startWriteParams",
        value: function startWriteParams(format) {
          this._os.startEncapsulation(this._encoding, format);

          return this._os;
        }
      }, {
        key: "endWriteParams",
        value: function endWriteParams() {
          this._os.endEncapsulation();
        }
      }, {
        key: "writeEmptyParams",
        value: function writeEmptyParams() {
          this._os.writeEmptyEncapsulation(this._encoding);
        }
      }, {
        key: "startReadParams",
        value: function startReadParams() {
          this._is.startEncapsulation();

          return this._is;
        }
      }, {
        key: "endReadParams",
        value: function endReadParams() {
          this._is.endEncapsulation();
        }
      }, {
        key: "readEmptyParams",
        value: function readEmptyParams() {
          this._is.skipEmptyEncapsulation();
        }
      }, {
        key: "throwUserException",
        value: function throwUserException() {
          Debug.assert((this._state & AsyncResult.Done) !== 0);

          if ((this._state & AsyncResult.OK) === 0) {
            try {
              this._is.startEncapsulation();

              this._is.throwException();
            } catch (ex) {
              if (ex instanceof Ice.UserException) {
                this._is.endEncapsulation();
              }

              throw ex;
            }
          }
        }
      }]);

      return OutgoingAsync;
    }(ProxyOutgoingAsyncBase);

    OutgoingAsync._emptyContext = new Map(); // Map<string, string>

    var ProxyFlushBatch =
    /*#__PURE__*/
    function (_ProxyOutgoingAsyncBa2) {
      _inherits(ProxyFlushBatch, _ProxyOutgoingAsyncBa2);

      function ProxyFlushBatch(prx, operation) {
        var _this57;

        _classCallCheck(this, ProxyFlushBatch);

        _this57 = _possibleConstructorReturn(this, _getPrototypeOf(ProxyFlushBatch).call(this, prx, operation));
        _this57._batchRequestNum = prx._getBatchRequestQueue().swap(_this57._os);
        return _this57;
      }

      _createClass(ProxyFlushBatch, [{
        key: "invokeRemote",
        value: function invokeRemote(connection, response) {
          if (this._batchRequestNum === 0) {
            this.sent();
            return AsyncStatus.Sent;
          }

          return connection.sendAsyncRequest(this, response, this._batchRequestNum);
        }
      }, {
        key: "invoke",
        value: function invoke() {
          Protocol.checkSupportedProtocol(Protocol.getCompatibleProtocol(this._proxy._getReference().getProtocol()));
          this.invokeImpl(true); // userThread = true
        }
      }]);

      return ProxyFlushBatch;
    }(ProxyOutgoingAsyncBase);

    var ProxyGetConnection =
    /*#__PURE__*/
    function (_ProxyOutgoingAsyncBa3) {
      _inherits(ProxyGetConnection, _ProxyOutgoingAsyncBa3);

      function ProxyGetConnection() {
        _classCallCheck(this, ProxyGetConnection);

        return _possibleConstructorReturn(this, _getPrototypeOf(ProxyGetConnection).apply(this, arguments));
      }

      _createClass(ProxyGetConnection, [{
        key: "invokeRemote",
        value: function invokeRemote(connection, response) {
          this.markFinished(true, function (r) {
            return r.resolve(connection);
          });
          return AsyncStatus.Sent;
        }
      }, {
        key: "invoke",
        value: function invoke() {
          this.invokeImpl(true); // userThread = true
        }
      }]);

      return ProxyGetConnection;
    }(ProxyOutgoingAsyncBase);

    var ConnectionFlushBatch =
    /*#__PURE__*/
    function (_OutgoingAsyncBase2) {
      _inherits(ConnectionFlushBatch, _OutgoingAsyncBase2);

      function ConnectionFlushBatch(con, communicator, operation) {
        _classCallCheck(this, ConnectionFlushBatch);

        return _possibleConstructorReturn(this, _getPrototypeOf(ConnectionFlushBatch).call(this, communicator, operation, con, null, null));
      }

      _createClass(ConnectionFlushBatch, [{
        key: "invoke",
        value: function invoke() {
          try {
            var batchRequestNum = this._connection.getBatchRequestQueue().swap(this._os);

            var status;

            if (batchRequestNum === 0) {
              this.sent();
              status = AsyncStatus.Sent;
            } else {
              status = this._connection.sendAsyncRequest(this, false, batchRequestNum);
            }

            if ((status & AsyncStatus.Sent) > 0) {
              this._sentSynchronously = true;
            }
          } catch (ex) {
            this.completedEx(ex);
          }
        }
      }]);

      return ConnectionFlushBatch;
    }(OutgoingAsyncBase);

    var HeartbeatAsync =
    /*#__PURE__*/
    function (_OutgoingAsyncBase3) {
      _inherits(HeartbeatAsync, _OutgoingAsyncBase3);

      function HeartbeatAsync(con, communicator) {
        _classCallCheck(this, HeartbeatAsync);

        return _possibleConstructorReturn(this, _getPrototypeOf(HeartbeatAsync).call(this, communicator, "heartbeat", con, null, null));
      }

      _createClass(HeartbeatAsync, [{
        key: "invoke",
        value: function invoke() {
          try {
            this._os.writeBlob(Protocol.magic);

            Protocol.currentProtocol._write(this._os);

            Protocol.currentProtocolEncoding._write(this._os);

            this._os.writeByte(Protocol.validateConnectionMsg);

            this._os.writeByte(0);

            this._os.writeInt(Protocol.headerSize); // Message size.


            var status = this._connection.sendAsyncRequest(this, false, 0);

            if ((status & AsyncStatus.Sent) > 0) {
              this._sentSynchronously = true;
            }
          } catch (ex) {
            this.completedEx(ex);
          }
        }
      }]);

      return HeartbeatAsync;
    }(OutgoingAsyncBase);

    Ice.OutgoingAsync = OutgoingAsync;
    Ice.ProxyFlushBatch = ProxyFlushBatch;
    Ice.ProxyGetConnection = ProxyGetConnection;
    Ice.ConnectionFlushBatch = ConnectionFlushBatch;
    Ice.HeartbeatAsync = HeartbeatAsync;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var ArrayUtil = Ice.ArrayUtil;
    var AsyncResultBase = Ice.AsyncResultBase;
    var Debug = Ice.Debug;
    var OutgoingAsync = Ice.OutgoingAsync;
    var ProxyFlushBatch = Ice.ProxyFlushBatch;
    var ProxyGetConnection = Ice.ProxyGetConnection;
    var RefMode = Ice.ReferenceMode;
    var OperationMode = Ice.OperationMode; //
    // Ice.ObjectPrx
    //

    var ObjectPrx =
    /*#__PURE__*/
    function () {
      function ObjectPrx() {
        _classCallCheck(this, ObjectPrx);

        this._reference = null;
        this._requestHandler = null;
      }

      _createClass(ObjectPrx, [{
        key: "hashCode",
        value: function hashCode(r) {
          return this._reference.hashCode();
        }
      }, {
        key: "ice_getCommunicator",
        value: function ice_getCommunicator() {
          return this._reference.getCommunicator();
        }
      }, {
        key: "toString",
        value: function toString() {
          return this._reference.toString();
        }
      }, {
        key: "ice_getIdentity",
        value: function ice_getIdentity() {
          return this._reference.getIdentity().clone();
        }
      }, {
        key: "ice_identity",
        value: function ice_identity(newIdentity) {
          if (newIdentity === undefined || newIdentity === null || newIdentity.name.length === 0) {
            throw new Ice.IllegalIdentityException();
          }

          if (newIdentity.equals(this._reference.getIdentity())) {
            return this;
          } else {
            var proxy = new ObjectPrx();

            proxy._setup(this._reference.changeIdentity(newIdentity));

            return proxy;
          }
        }
      }, {
        key: "ice_getContext",
        value: function ice_getContext() {
          return new Map(this._reference.getContext());
        }
      }, {
        key: "ice_context",
        value: function ice_context(newContext) {
          return this._newInstance(this._reference.changeContext(newContext));
        }
      }, {
        key: "ice_getFacet",
        value: function ice_getFacet() {
          return this._reference.getFacet();
        }
      }, {
        key: "ice_facet",
        value: function ice_facet(newFacet) {
          if (newFacet === undefined || newFacet === null) {
            newFacet = "";
          }

          if (newFacet === this._reference.getFacet()) {
            return this;
          } else {
            var proxy = new ObjectPrx();

            proxy._setup(this._reference.changeFacet(newFacet));

            return proxy;
          }
        }
      }, {
        key: "ice_getAdapterId",
        value: function ice_getAdapterId() {
          return this._reference.getAdapterId();
        }
      }, {
        key: "ice_adapterId",
        value: function ice_adapterId(newAdapterId) {
          if (newAdapterId === undefined || newAdapterId === null) {
            newAdapterId = "";
          }

          if (newAdapterId === this._reference.getAdapterId()) {
            return this;
          } else {
            return this._newInstance(this._reference.changeAdapterId(newAdapterId));
          }
        }
      }, {
        key: "ice_getEndpoints",
        value: function ice_getEndpoints() {
          return ArrayUtil.clone(this._reference.getEndpoints());
        }
      }, {
        key: "ice_endpoints",
        value: function ice_endpoints(newEndpoints) {
          if (newEndpoints === undefined || newEndpoints === null) {
            newEndpoints = [];
          }

          if (ArrayUtil.equals(newEndpoints, this._reference.getEndpoints())) {
            return this;
          } else {
            return this._newInstance(this._reference.changeEndpoints(newEndpoints));
          }
        }
      }, {
        key: "ice_getLocatorCacheTimeout",
        value: function ice_getLocatorCacheTimeout() {
          return this._reference.getLocatorCacheTimeout();
        }
      }, {
        key: "ice_locatorCacheTimeout",
        value: function ice_locatorCacheTimeout(newTimeout) {
          if (newTimeout < -1) {
            throw new RangeError("invalid value passed to ice_locatorCacheTimeout: " + newTimeout);
          }

          if (newTimeout === this._reference.getLocatorCacheTimeout()) {
            return this;
          } else {
            return this._newInstance(this._reference.changeLocatorCacheTimeout(newTimeout));
          }
        }
      }, {
        key: "ice_getInvocationTimeout",
        value: function ice_getInvocationTimeout() {
          return this._reference.getInvocationTimeout();
        }
      }, {
        key: "ice_invocationTimeout",
        value: function ice_invocationTimeout(newTimeout) {
          if (newTimeout < 1 && newTimeout !== -1) {
            throw new RangeError("invalid value passed to ice_invocationTimeout: " + newTimeout);
          }

          if (newTimeout === this._reference.getInvocationTimeout()) {
            return this;
          } else {
            return this._newInstance(this._reference.changeInvocationTimeout(newTimeout));
          }
        }
      }, {
        key: "ice_isConnectionCached",
        value: function ice_isConnectionCached() {
          return this._reference.getCacheConnection();
        }
      }, {
        key: "ice_connectionCached",
        value: function ice_connectionCached(newCache) {
          if (newCache === this._reference.getCacheConnection()) {
            return this;
          } else {
            return this._newInstance(this._reference.changeCacheConnection(newCache));
          }
        }
      }, {
        key: "ice_getEndpointSelection",
        value: function ice_getEndpointSelection() {
          return this._reference.getEndpointSelection();
        }
      }, {
        key: "ice_endpointSelection",
        value: function ice_endpointSelection(newType) {
          if (newType === this._reference.getEndpointSelection()) {
            return this;
          } else {
            return this._newInstance(this._reference.changeEndpointSelection(newType));
          }
        }
      }, {
        key: "ice_isSecure",
        value: function ice_isSecure() {
          return this._reference.getSecure();
        }
      }, {
        key: "ice_secure",
        value: function ice_secure(b) {
          if (b === this._reference.getSecure()) {
            return this;
          } else {
            return this._newInstance(this._reference.changeSecure(b));
          }
        }
      }, {
        key: "ice_getEncodingVersion",
        value: function ice_getEncodingVersion() {
          return this._reference.getEncoding().clone();
        }
      }, {
        key: "ice_encodingVersion",
        value: function ice_encodingVersion(e) {
          if (e.equals(this._reference.getEncoding())) {
            return this;
          } else {
            return this._newInstance(this._reference.changeEncoding(e));
          }
        }
      }, {
        key: "ice_isPreferSecure",
        value: function ice_isPreferSecure() {
          return this._reference.getPreferSecure();
        }
      }, {
        key: "ice_preferSecure",
        value: function ice_preferSecure(b) {
          if (b === this._reference.getPreferSecure()) {
            return this;
          } else {
            return this._newInstance(this._reference.changePreferSecure(b));
          }
        }
      }, {
        key: "ice_getRouter",
        value: function ice_getRouter() {
          var ri = this._reference.getRouterInfo();

          return ri !== null ? ri.getRouter() : null;
        }
      }, {
        key: "ice_router",
        value: function ice_router(router) {
          var ref = this._reference.changeRouter(router);

          if (ref.equals(this._reference)) {
            return this;
          } else {
            return this._newInstance(ref);
          }
        }
      }, {
        key: "ice_getLocator",
        value: function ice_getLocator() {
          var ri = this._reference.getLocatorInfo();

          return ri !== null ? ri.getLocator() : null;
        }
      }, {
        key: "ice_locator",
        value: function ice_locator(locator) {
          var ref = this._reference.changeLocator(locator);

          if (ref.equals(this._reference)) {
            return this;
          } else {
            return this._newInstance(ref);
          }
        }
      }, {
        key: "ice_isTwoway",
        value: function ice_isTwoway() {
          return this._reference.getMode() === RefMode.ModeTwoway;
        }
      }, {
        key: "ice_twoway",
        value: function ice_twoway() {
          if (this._reference.getMode() === RefMode.ModeTwoway) {
            return this;
          } else {
            return this._newInstance(this._reference.changeMode(RefMode.ModeTwoway));
          }
        }
      }, {
        key: "ice_isOneway",
        value: function ice_isOneway() {
          return this._reference.getMode() === RefMode.ModeOneway;
        }
      }, {
        key: "ice_oneway",
        value: function ice_oneway() {
          if (this._reference.getMode() === RefMode.ModeOneway) {
            return this;
          } else {
            return this._newInstance(this._reference.changeMode(RefMode.ModeOneway));
          }
        }
      }, {
        key: "ice_isBatchOneway",
        value: function ice_isBatchOneway() {
          return this._reference.getMode() === RefMode.ModeBatchOneway;
        }
      }, {
        key: "ice_batchOneway",
        value: function ice_batchOneway() {
          if (this._reference.getMode() === RefMode.ModeBatchOneway) {
            return this;
          } else {
            return this._newInstance(this._reference.changeMode(RefMode.ModeBatchOneway));
          }
        }
      }, {
        key: "ice_isDatagram",
        value: function ice_isDatagram() {
          return this._reference.getMode() === RefMode.ModeDatagram;
        }
      }, {
        key: "ice_datagram",
        value: function ice_datagram() {
          if (this._reference.getMode() === RefMode.ModeDatagram) {
            return this;
          } else {
            return this._newInstance(this._reference.changeMode(RefMode.ModeDatagram));
          }
        }
      }, {
        key: "ice_isBatchDatagram",
        value: function ice_isBatchDatagram() {
          return this._reference.getMode() === RefMode.ModeBatchDatagram;
        }
      }, {
        key: "ice_batchDatagram",
        value: function ice_batchDatagram() {
          if (this._reference.getMode() === RefMode.ModeBatchDatagram) {
            return this;
          } else {
            return this._newInstance(this._reference.changeMode(RefMode.ModeBatchDatagram));
          }
        }
      }, {
        key: "ice_timeout",
        value: function ice_timeout(t) {
          if (t < 1 && t !== -1) {
            throw new RangeError("invalid value passed to ice_timeout: " + t);
          }

          var ref = this._reference.changeTimeout(t);

          if (ref.equals(this._reference)) {
            return this;
          } else {
            return this._newInstance(ref);
          }
        }
      }, {
        key: "ice_getTimeout",
        value: function ice_getTimeout() {
          return this._reference.getTimeout();
        }
      }, {
        key: "ice_fixed",
        value: function ice_fixed(connection) {
          if (connection === null) {
            throw new RangeError("invalid null connection passed to ice_fixed");
          }

          if (!(connection instanceof Ice.ConnectionI)) {
            throw new RangeError("invalid connection passed to ice_fixed");
          }

          var ref = this._reference.changeConnection(connection);

          if (ref.equals(this._reference)) {
            return this;
          } else {
            return this._newInstance(ref);
          }
        }
      }, {
        key: "ice_getConnectionId",
        value: function ice_getConnectionId() {
          return this._reference.getConnectionId();
        }
      }, {
        key: "ice_connectionId",
        value: function ice_connectionId(id) {
          var ref = this._reference.changeConnectionId(id);

          if (ref.equals(this._reference)) {
            return this;
          } else {
            return this._newInstance(ref);
          }
        }
      }, {
        key: "ice_getConnection",
        value: function ice_getConnection() {
          var r = new ProxyGetConnection(this, "ice_getConnection");

          try {
            r.invoke();
          } catch (ex) {
            r.abort(ex);
          }

          return r;
        }
      }, {
        key: "ice_getCachedConnection",
        value: function ice_getCachedConnection() {
          return this._requestHandler ? this._requestHandler.getConnection() : null;
        }
      }, {
        key: "ice_flushBatchRequests",
        value: function ice_flushBatchRequests() {
          var r = new ProxyFlushBatch(this, "ice_flushBatchRequests");

          try {
            r.invoke();
          } catch (ex) {
            r.abort(ex);
          }

          return r;
        }
      }, {
        key: "equals",
        value: function equals(r) {
          if (this === r) {
            return true;
          }

          if (r instanceof ObjectPrx) {
            return this._reference.equals(r._reference);
          }

          return false;
        }
      }, {
        key: "_write",
        value: function _write(os) {
          this._reference.getIdentity()._write(os);

          this._reference.streamWrite(os);
        }
      }, {
        key: "_getReference",
        value: function _getReference() {
          return this._reference;
        }
      }, {
        key: "_copyFrom",
        value: function _copyFrom(from) {
          Debug.assert(this._reference === null);
          Debug.assert(this._requestHandler === null);
          this._reference = from._reference;
          this._requestHandler = from._requestHandler;
        }
      }, {
        key: "_handleException",
        value: function _handleException(ex, handler, mode, sent, sleep, cnt) {
          this._updateRequestHandler(handler, null); // Clear the request handler
          //
          // We only retry local exception, system exceptions aren't retried.
          //
          // A CloseConnectionException indicates graceful server shutdown, and is therefore
          // always repeatable without violating "at-most-once". That's because by sending a
          // close connection message, the server guarantees that all outstanding requests
          // can safely be repeated.
          //
          // An ObjectNotExistException can always be retried as well without violating
          // "at-most-once" (see the implementation of the checkRetryAfterException method
          //  of the ProxyFactory class for the reasons why it can be useful).
          //
          // If the request didn't get sent or if it's non-mutating or idempotent it can
          // also always be retried if the retry count isn't reached.
          //


          if (ex instanceof Ice.LocalException && (!sent || mode == OperationMode.Nonmutating || mode == OperationMode.Idempotent || ex instanceof Ice.CloseConnectionException || ex instanceof Ice.ObjectNotExistException)) {
            try {
              return this._reference.getInstance().proxyFactory().checkRetryAfterException(ex, this._reference, sleep, cnt);
            } catch (exc) {
              if (exc instanceof Ice.CommunicatorDestroyedException) {
                //
                // The communicator is already destroyed, so we cannot retry.
                //
                throw ex;
              } else {
                throw exc;
              }
            }
          } else {
            throw ex;
          }
        }
      }, {
        key: "_checkAsyncTwowayOnly",
        value: function _checkAsyncTwowayOnly(name) {
          if (!this.ice_isTwoway()) {
            throw new Ice.TwowayOnlyException(name);
          }
        }
      }, {
        key: "_getRequestHandler",
        value: function _getRequestHandler() {
          if (this._reference.getCacheConnection()) {
            if (this._requestHandler) {
              return this._requestHandler;
            }
          }

          return this._reference.getRequestHandler(this);
        }
      }, {
        key: "_getBatchRequestQueue",
        value: function _getBatchRequestQueue() {
          if (!this._batchRequestQueue) {
            this._batchRequestQueue = this._reference.getBatchRequestQueue();
          }

          return this._batchRequestQueue;
        }
      }, {
        key: "_setRequestHandler",
        value: function _setRequestHandler(handler) {
          if (this._reference.getCacheConnection()) {
            if (!this._requestHandler) {
              this._requestHandler = handler;
            }

            return this._requestHandler;
          }

          return handler;
        }
      }, {
        key: "_updateRequestHandler",
        value: function _updateRequestHandler(previous, handler) {
          if (this._reference.getCacheConnection() && previous !== null) {
            if (this._requestHandler && this._requestHandler !== handler) {
              this._requestHandler = this._requestHandler.update(previous, handler);
            }
          }
        } //
        // Only for use by IceInternal.ProxyFactory
        //

      }, {
        key: "_setup",
        value: function _setup(ref) {
          Debug.assert(this._reference === null);
          this._reference = ref;
        }
      }, {
        key: "_newInstance",
        value: function _newInstance(ref) {
          var proxy = new this.constructor();

          proxy._setup(ref);

          return proxy;
        }
      }, {
        key: "ice_instanceof",
        value: function ice_instanceof(T) {
          if (T) {
            if (this instanceof T) {
              return true;
            }

            return this.constructor._instanceof(T);
          }

          return false;
        } //
        // Generic invocation for operations that have input parameters.
        //

      }], [{
        key: "_invoke",
        value: function _invoke(p, name, mode, fmt, ctx, marshalFn, unmarshalFn, userEx, args) {
          var _this58 = this;

          if (unmarshalFn !== null || userEx.length > 0) {
            p._checkAsyncTwowayOnly(name);
          }

          var r = new OutgoingAsync(p, name, function (res) {
            _this58._completed(res, unmarshalFn, userEx);
          });

          try {
            r.prepare(name, mode, ctx);

            if (marshalFn === null) {
              r.writeEmptyParams();
            } else {
              var ostr = r.startWriteParams(fmt);
              marshalFn(ostr, args);
              r.endWriteParams();
            }

            r.invoke();
          } catch (ex) {
            r.abort(ex);
          }

          return r;
        } //
        // Handles the completion of an invocation.
        //

      }, {
        key: "_completed",
        value: function _completed(r, unmarshalFn, userEx) {
          if (!this._check(r, userEx)) {
            return;
          }

          try {
            if (unmarshalFn === null) {
              r.readEmptyParams();
              r.resolve();
            } else {
              r.resolve(unmarshalFn(r));
            }
          } catch (ex) {
            this.dispatchLocalException(r, ex);
          }
        } //
        // Handles user exceptions.
        //

      }, {
        key: "_check",
        value: function _check(r, uex) {
          //
          // If uex is non-null, it must be an array of exception types.
          //
          try {
            r.throwUserException();
          } catch (ex) {
            if (ex instanceof Ice.UserException) {
              if (uex !== null) {
                for (var i = 0; i < uex.length; ++i) {
                  if (ex instanceof uex[i]) {
                    r.reject(ex);
                    return false;
                  }
                }
              }

              r.reject(new Ice.UnknownUserException(ex.ice_id()));
              return false;
            } else {
              r.reject(ex);
              return false;
            }
          }

          return true;
        }
      }, {
        key: "dispatchLocalException",
        value: function dispatchLocalException(r, ex) {
          r.reject(ex);
        }
      }, {
        key: "checkedCast",
        value: function checkedCast(prx, facet, ctx) {
          var _this59 = this;

          var r = null;

          if (prx === undefined || prx === null) {
            r = new AsyncResultBase(null, "checkedCast", null, null, null);
            r.resolve(null);
          } else {
            if (facet !== undefined) {
              prx = prx.ice_facet(facet);
            }

            r = new AsyncResultBase(prx.ice_getCommunicator(), "checkedCast", null, prx, null);
            prx.ice_isA(this.ice_staticId(), ctx).then(function (ret) {
              if (ret) {
                var h = new _this59();

                h._copyFrom(prx);

                r.resolve(h);
              } else {
                r.resolve(null);
              }
            }).catch(function (ex) {
              if (ex instanceof Ice.FacetNotExistException) {
                r.resolve(null);
              } else {
                r.reject(ex);
              }
            });
          }

          return r;
        }
      }, {
        key: "uncheckedCast",
        value: function uncheckedCast(prx, facet) {
          var r = null;

          if (prx !== undefined && prx !== null) {
            r = new this();

            if (facet !== undefined) {
              prx = prx.ice_facet(facet);
            }

            r._copyFrom(prx);
          }

          return r;
        }
      }, {
        key: "write",
        value: function write(os, v) {
          os.writeProxy(v);
        }
      }, {
        key: "read",
        value: function read(is) {
          return is.readProxy(this);
        }
      }, {
        key: "writeOptional",
        value: function writeOptional(os, tag, v) {
          os.writeOptionalProxy(tag, v);
        }
      }, {
        key: "readOptional",
        value: function readOptional(is, tag) {
          return is.readOptionalProxy(tag, this);
        }
      }, {
        key: "_instanceof",
        value: function _instanceof(T) {
          if (T === this) {
            return true;
          }

          for (var i in this._implements) {
            if (this._implements[i]._instanceof(T)) {
              return true;
            }
          }

          return false;
        }
      }, {
        key: "ice_staticId",
        value: function ice_staticId() {
          return this._id;
        }
      }, {
        key: "minWireSize",
        get: function get() {
          return 2;
        }
      }, {
        key: "_implements",
        get: function get() {
          return [];
        }
      }]);

      return ObjectPrx;
    }();

    Ice.ObjectPrx = ObjectPrx;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var StringUtil = Ice.StringUtil;
    var PropertyNames = Ice.PropertyNames;
    var Debug = Ice.Debug;
    var getProcessLogger = Ice.getProcessLogger;
    var InitializationException = Ice.InitializationException;
    var ParseStateKey = 0;
    var ParseStateValue = 1; //
    // Ice.Properties
    //

    var Properties =
    /*#__PURE__*/
    function () {
      function Properties(args, defaults) {
        _classCallCheck(this, Properties);

        this._properties = new Map();

        if (defaults !== undefined && defaults !== null) {
          //
          // NOTE: we can't just do a shallow copy of the map as the map values
          // would otherwise be shared between the two PropertiesI object.
          //
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = defaults._properties[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _step3$value = _slicedToArray(_step3.value, 2),
                  key = _step3$value[0],
                  property = _step3$value[1];

              this._properties.set(key, {
                value: property.value,
                used: false
              });
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }

        if (args !== undefined && args !== null) {
          var v = this.parseIceCommandLineOptions(args);
          args.length = 0;

          for (var i = 0; i < v.length; ++i) {
            args.push(v[i]);
          }
        }
      }

      _createClass(Properties, [{
        key: "getProperty",
        value: function getProperty(key) {
          return this.getPropertyWithDefault(key, "");
        }
      }, {
        key: "getPropertyWithDefault",
        value: function getPropertyWithDefault(key, value) {
          var pv = this._properties.get(key);

          if (pv !== undefined) {
            pv.used = true;
            return pv.value;
          } else {
            return value;
          }
        }
      }, {
        key: "getPropertyAsInt",
        value: function getPropertyAsInt(key) {
          return this.getPropertyAsIntWithDefault(key, 0);
        }
      }, {
        key: "getPropertyAsIntWithDefault",
        value: function getPropertyAsIntWithDefault(key, value) {
          var pv = this._properties.get(key);

          if (pv !== undefined) {
            pv.used = true;
            return parseInt(pv.value);
          } else {
            return value;
          }
        }
      }, {
        key: "getPropertyAsList",
        value: function getPropertyAsList(key) {
          return this.getPropertyAsListWithDefault(key, 0);
        }
      }, {
        key: "getPropertyAsListWithDefault",
        value: function getPropertyAsListWithDefault(key, value) {
          if (value === undefined || value === null) {
            value = [];
          }

          var pv = this._properties.get(key);

          if (pv !== undefined) {
            pv.used = true;
            var result = StringUtil.splitString(pv.value, ", \t\r\n");

            if (result === null) {
              getProcessLogger().warning("mismatched quotes in property " + key + "'s value, returning default value");
              return value;
            }

            if (result.length === 0) {
              result = value;
            }

            return result;
          } else {
            return value;
          }
        }
      }, {
        key: "getPropertiesForPrefix",
        value: function getPropertiesForPrefix() {
          var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
          var result = new Map();

          this._properties.forEach(function (property, key) {
            if (key.indexOf(prefix) === 0) {
              property.used = true;
              result.set(key, property.value);
            }
          });

          return result;
        }
      }, {
        key: "setProperty",
        value: function setProperty() {
          var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
          var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

          //
          // Trim whitespace
          //
          if (key !== null) {
            key = key.trim();
          } //
          // Check if the property is legal.
          //


          var logger = getProcessLogger();

          if (key === null || key.length === 0) {
            throw new InitializationException("Attempt to set property with empty key");
          }

          var dotPos = key.indexOf(".");

          if (dotPos !== -1) {
            var prefix = key.substr(0, dotPos);

            for (var i = 0; i < PropertyNames.validProps.length; ++i) {
              var pattern = PropertyNames.validProps[i][0].pattern;
              dotPos = pattern.indexOf("."); //
              // Each top level prefix describes a non-empty namespace. Having a string without a
              // prefix followed by a dot is an error.
              //

              Debug.assert(dotPos != -1);

              if (pattern.substring(0, dotPos - 1) != prefix) {
                continue;
              }

              var found = false;
              var mismatchCase = false;
              var otherKey = void 0;

              for (var j = 0; j < PropertyNames.validProps[i][j].length && !found; ++j) {
                pattern = PropertyNames.validProps[i][j].pattern();
                var pComp = new RegExp(pattern);
                found = pComp.test(key);

                if (found && PropertyNames.validProps[i][j].deprecated) {
                  logger.warning("deprecated property: " + key);

                  if (PropertyNames.validProps[i][j].deprecatedBy !== null) {
                    key = PropertyNames.validProps[i][j].deprecatedBy;
                  }
                }

                if (found) {
                  break;
                } else {
                  pComp = new RegExp(pattern.toUpperCase());
                  found = pComp.test(key.toUpperCase());

                  if (found) {
                    mismatchCase = true;
                    otherKey = pattern.substr(2);
                    otherKey = otherKey.substr(0, otherKey.length - 1);
                    otherKey = otherKey.replace(/\\/g, "");
                    break;
                  }
                }
              }

              if (!found) {
                logger.warning("unknown property: " + key);
              } else if (mismatchCase) {
                logger.warning("unknown property: `" + key + "'; did you mean `" + otherKey + "'");
              }
            }
          } //
          // Set or clear the property.
          //


          if (value !== null && value.length > 0) {
            var pv = this._properties.get(key);

            if (pv !== undefined) {
              pv.value = value;
            } else {
              this._properties.set(key, {
                value: value,
                used: false
              });
            }
          } else {
            this._properties.delete(key);
          }
        }
      }, {
        key: "getCommandLineOptions",
        value: function getCommandLineOptions() {
          var result = [];

          this._properties.forEach(function (property, key) {
            result.push("--" + key + "=" + property.value);
          });

          return result;
        }
      }, {
        key: "parseCommandLineOptions",
        value: function parseCommandLineOptions(pfx, options) {
          var _this60 = this;

          if (pfx.length > 0 && pfx.charAt(pfx.length - 1) != ".") {
            pfx += ".";
          }

          pfx = "--" + pfx;
          var result = [];
          options.forEach(function (opt) {
            if (opt.indexOf(pfx) === 0) {
              if (opt.indexOf('=') === -1) {
                opt += "=1";
              }

              _this60.parseLine(opt.substring(2));
            } else {
              result.push(opt);
            }
          });
          return result;
        }
      }, {
        key: "parseIceCommandLineOptions",
        value: function parseIceCommandLineOptions(options) {
          var args = options.slice();

          for (var i = 0; i < PropertyNames.clPropNames.length; ++i) {
            args = this.parseCommandLineOptions(PropertyNames.clPropNames[i], args);
          }

          return args;
        }
      }, {
        key: "parse",
        value: function parse(data) {
          var _this61 = this;

          data.match(/[^\r\n]+/g).forEach(function (line) {
            return _this61.parseLine(line);
          });
        }
      }, {
        key: "parseLine",
        value: function parseLine(line) {
          var key = "";
          var value = "";
          var state = ParseStateKey;
          var whitespace = "";
          var escapedspace = "";
          var finished = false;

          for (var i = 0; i < line.length; ++i) {
            var c = line.charAt(i);

            switch (state) {
              case ParseStateKey:
                {
                  switch (c) {
                    case '\\':
                      if (i < line.length - 1) {
                        c = line.charAt(++i);

                        switch (c) {
                          case '\\':
                          case '#':
                          case '=':
                            key += whitespace;
                            whitespace = "";
                            key += c;
                            break;

                          case ' ':
                            if (key.length !== 0) {
                              whitespace += c;
                            }

                            break;

                          default:
                            key += whitespace;
                            whitespace = "";
                            key += '\\';
                            key += c;
                            break;
                        }
                      } else {
                        key += whitespace;
                        key += c;
                      }

                      break;

                    case ' ':
                    case '\t':
                    case '\r':
                    case '\n':
                      if (key.length !== 0) {
                        whitespace += c;
                      }

                      break;

                    case '=':
                      whitespace = "";
                      state = ParseStateValue;
                      break;

                    case '#':
                      finished = true;
                      break;

                    default:
                      key += whitespace;
                      whitespace = "";
                      key += c;
                      break;
                  }

                  break;
                }

              case ParseStateValue:
                {
                  switch (c) {
                    case '\\':
                      if (i < line.length - 1) {
                        c = line.charAt(++i);

                        switch (c) {
                          case '\\':
                          case '#':
                          case '=':
                            value += value.length === 0 ? escapedspace : whitespace;
                            whitespace = "";
                            escapedspace = "";
                            value += c;
                            break;

                          case ' ':
                            whitespace += c;
                            escapedspace += c;
                            break;

                          default:
                            value += value.length === 0 ? escapedspace : whitespace;
                            whitespace = "";
                            escapedspace = "";
                            value += '\\';
                            value += c;
                            break;
                        }
                      } else {
                        value += value.length === 0 ? escapedspace : whitespace;
                        value += c;
                      }

                      break;

                    case ' ':
                    case '\t':
                    case '\r':
                    case '\n':
                      if (value.length !== 0) {
                        whitespace += c;
                      }

                      break;

                    case '#':
                      finished = true;
                      break;

                    default:
                      value += value.length === 0 ? escapedspace : whitespace;
                      whitespace = "";
                      escapedspace = "";
                      value += c;
                      break;
                  }

                  break;
                }

              default:
                {
                  Debug.assert(false);
                  break;
                }
            }

            if (finished) {
              break;
            }
          }

          value += escapedspace;

          if (state === ParseStateKey && key.length !== 0 || state == ParseStateValue && key.length === 0) {
            getProcessLogger().warning("invalid config file entry: \"" + line + "\"");
            return;
          } else if (key.length === 0) {
            return;
          }

          this.setProperty(key, value);
        }
      }, {
        key: "clone",
        value: function clone() {
          return new Properties(null, this);
        }
      }, {
        key: "getUnusedProperties",
        value: function getUnusedProperties() {
          var unused = [];

          this._properties.forEach(function (property, key) {
            if (!property.used) {
              unused.push(key);
            }
          });

          return unused;
        }
      }], [{
        key: "createProperties",
        value: function createProperties(args, defaults) {
          return new Properties(args, defaults);
        }
      }]);

      return Properties;
    }();

    Ice.Properties = Properties;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `EndpointTypes.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */

    /**
     * Determines the order in which the Ice run time uses the endpoints
     * in a proxy when establishing a connection.
     *
     **/
    Ice.EndpointSelectionType = Slice.defineEnum([['Random', 0], ['Ordered', 1]]);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var ProtocolInstance =
    /*#__PURE__*/
    function () {
      function ProtocolInstance(instance, type, protocol, secure) {
        _classCallCheck(this, ProtocolInstance);

        this._instance = instance;
        this._traceLevel = instance.traceLevels().network;
        this._traceCategory = instance.traceLevels().networkCat;
        this._logger = instance.initializationData().logger;
        this._properties = instance.initializationData().properties;
        this._type = type;
        this._protocol = protocol;
        this._secure = secure;
      }

      _createClass(ProtocolInstance, [{
        key: "traceLevel",
        value: function traceLevel() {
          return this._traceLevel;
        }
      }, {
        key: "traceCategory",
        value: function traceCategory() {
          return this._traceCategory;
        }
      }, {
        key: "logger",
        value: function logger() {
          return this._logger;
        }
      }, {
        key: "protocol",
        value: function protocol() {
          return this._protocol;
        }
      }, {
        key: "type",
        value: function type() {
          return this._type;
        }
      }, {
        key: "secure",
        value: function secure() {
          return this._secure;
        }
      }, {
        key: "properties",
        value: function properties() {
          return this._properties;
        }
      }, {
        key: "defaultHost",
        value: function defaultHost() {
          return this._instance.defaultsAndOverrides().defaultHost;
        }
      }, {
        key: "defaultSourceAddress",
        value: function defaultSourceAddress() {
          return this._instance.defaultsAndOverrides().defaultSourceAddress;
        }
      }, {
        key: "defaultEncoding",
        value: function defaultEncoding() {
          return this._instance.defaultsAndOverrides().defaultEncoding;
        }
      }, {
        key: "defaultTimeout",
        value: function defaultTimeout() {
          return this._instance.defaultsAndOverrides().defaultTimeout;
        }
      }, {
        key: "messageSizeMax",
        value: function messageSizeMax() {
          return this._instance.messageSizeMax();
        }
      }]);

      return ProtocolInstance;
    }();

    Ice.ProtocolInstance = ProtocolInstance;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `EndpointF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
    Slice.defineSequence(Ice, "EndpointSeqHelper", "Ice.ObjectHelper", false, "Ice.Endpoint");
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Endpoint.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
    Object.defineProperty(Ice, 'TCPEndpointType', {
      value: 1
    });
    Object.defineProperty(Ice, 'SSLEndpointType', {
      value: 2
    });
    Object.defineProperty(Ice, 'UDPEndpointType', {
      value: 3
    });
    Object.defineProperty(Ice, 'WSEndpointType', {
      value: 4
    });
    Object.defineProperty(Ice, 'WSSEndpointType', {
      value: 5
    });
    Object.defineProperty(Ice, 'BTEndpointType', {
      value: 6
    });
    Object.defineProperty(Ice, 'BTSEndpointType', {
      value: 7
    });
    Object.defineProperty(Ice, 'iAPEndpointType', {
      value: 8
    });
    Object.defineProperty(Ice, 'iAPSEndpointType', {
      value: 9
    });
    /**
     * Base class providing access to the endpoint details.
     *
     **/

    Ice.EndpointInfo =
    /*#__PURE__*/
    function () {
      function _class79() {
        var underlying = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var compress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, _class79);

        this.underlying = underlying;
        this.timeout = timeout;
        this.compress = compress;
      }

      return _class79;
    }();
    /**
     * Provides access to the address details of a IP endpoint.
     *
     * @see Endpoint
     *
     **/


    Ice.IPEndpointInfo =
    /*#__PURE__*/
    function (_Ice$EndpointInfo) {
      _inherits(_class80, _Ice$EndpointInfo);

      function _class80(underlying, timeout, compress) {
        var _this62;

        var host = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        var port = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var sourceAddress = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";

        _classCallCheck(this, _class80);

        _this62 = _possibleConstructorReturn(this, _getPrototypeOf(_class80).call(this, underlying, timeout, compress));
        _this62.host = host;
        _this62.port = port;
        _this62.sourceAddress = sourceAddress;
        return _this62;
      }

      return _class80;
    }(Ice.EndpointInfo);
    /**
     * Provides access to a TCP endpoint information.
     *
     * @see Endpoint
     *
     **/


    Ice.TCPEndpointInfo =
    /*#__PURE__*/
    function (_Ice$IPEndpointInfo) {
      _inherits(_class81, _Ice$IPEndpointInfo);

      function _class81(underlying, timeout, compress, host, port, sourceAddress) {
        _classCallCheck(this, _class81);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class81).call(this, underlying, timeout, compress, host, port, sourceAddress));
      }

      return _class81;
    }(Ice.IPEndpointInfo);
    /**
     * Provides access to an UDP endpoint information.
     *
     * @see Endpoint
     *
     **/


    Ice.UDPEndpointInfo =
    /*#__PURE__*/
    function (_Ice$IPEndpointInfo2) {
      _inherits(_class82, _Ice$IPEndpointInfo2);

      function _class82(underlying, timeout, compress, host, port, sourceAddress) {
        var _this63;

        var mcastInterface = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "";
        var mcastTtl = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;

        _classCallCheck(this, _class82);

        _this63 = _possibleConstructorReturn(this, _getPrototypeOf(_class82).call(this, underlying, timeout, compress, host, port, sourceAddress));
        _this63.mcastInterface = mcastInterface;
        _this63.mcastTtl = mcastTtl;
        return _this63;
      }

      return _class82;
    }(Ice.IPEndpointInfo);
    /**
     * Provides access to a WebSocket endpoint information.
     *
     **/


    Ice.WSEndpointInfo =
    /*#__PURE__*/
    function (_Ice$EndpointInfo2) {
      _inherits(_class83, _Ice$EndpointInfo2);

      function _class83(underlying, timeout, compress) {
        var _this64;

        var resource = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        _classCallCheck(this, _class83);

        _this64 = _possibleConstructorReturn(this, _getPrototypeOf(_class83).call(this, underlying, timeout, compress));
        _this64.resource = resource;
        return _this64;
      }

      return _class83;
    }(Ice.EndpointInfo);
    /**
     * Provides access to the details of an opaque endpoint.
     *
     * @see Endpoint
     *
     **/


    Ice.OpaqueEndpointInfo =
    /*#__PURE__*/
    function (_Ice$EndpointInfo3) {
      _inherits(_class84, _Ice$EndpointInfo3);

      function _class84(underlying, timeout, compress) {
        var _this65;

        var rawEncoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Ice.EncodingVersion();
        var rawBytes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        _classCallCheck(this, _class84);

        _this65 = _possibleConstructorReturn(this, _getPrototypeOf(_class84).call(this, underlying, timeout, compress));
        _this65.rawEncoding = rawEncoding;
        _this65.rawBytes = rawBytes;
        return _this65;
      }

      return _class84;
    }(Ice.EndpointInfo);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var AsyncStatus = Ice.AsyncStatus;
    var ConnectionRequestHandler = Ice.ConnectionRequestHandler;
    var Debug = Ice.Debug;
    var RetryException = Ice.RetryException;
    var ReferenceMode = Ice.ReferenceMode;
    var LocalException = Ice.LocalException;

    var ConnectRequestHandler =
    /*#__PURE__*/
    function () {
      function ConnectRequestHandler(ref, proxy) {
        _classCallCheck(this, ConnectRequestHandler);

        this._reference = ref;
        this._response = ref.getMode() === ReferenceMode.ModeTwoway;
        this._proxy = proxy;
        this._proxies = [];
        this._initialized = false;
        this._connection = null;
        this._exception = null;
        this._requests = [];
      }

      _createClass(ConnectRequestHandler, [{
        key: "connect",
        value: function connect(proxy) {
          if (!this.initialized()) {
            this._proxies.push(proxy);
          }

          return this._requestHandler ? this._requestHandler : this;
        }
      }, {
        key: "update",
        value: function update(previousHandler, newHandler) {
          return previousHandler === this ? newHandler : this;
        }
      }, {
        key: "sendAsyncRequest",
        value: function sendAsyncRequest(out) {
          if (!this._initialized) {
            out.cancelable(this); // This will throw if the request is canceled
          }

          if (!this.initialized()) {
            this._requests.push(out);

            return AsyncStatus.Queued;
          }

          return out.invokeRemote(this._connection, this._response);
        }
      }, {
        key: "asyncRequestCanceled",
        value: function asyncRequestCanceled(out, ex) {
          if (this._exception !== null) {
            return; // The request has been notified of a failure already.
          }

          if (!this.initialized()) {
            for (var i = 0; i < this._requests.length; i++) {
              if (this._requests[i] === out) {
                out.completedEx(ex);

                this._requests.splice(i, 1);

                return;
              }
            }

            Debug.assert(false); // The request has to be queued if it timed out and we're not initialized yet.
          }

          this._connection.asyncRequestCanceled(out, ex);
        }
      }, {
        key: "getReference",
        value: function getReference() {
          return this._reference;
        }
      }, {
        key: "getConnection",
        value: function getConnection() {
          if (this._exception !== null) {
            throw this._exception;
          } else {
            return this._connection;
          }
        } //
        // Implementation of Reference_GetConnectionCallback
        //

      }, {
        key: "setConnection",
        value: function setConnection(connection) {
          var _this66 = this;

          Debug.assert(this._exception === null && this._connection === null);
          this._connection = connection; //
          // If this proxy is for a non-local object, and we are using a router, then
          // add this proxy to the router info object.
          //

          var ri = this._reference.getRouterInfo();

          if (ri !== null) {
            ri.addProxy(this._proxy).then( //
            // The proxy was added to the router
            // info, we're now ready to send the
            // queued requests.
            //
            function () {
              return _this66.flushRequests();
            }, function (ex) {
              return _this66.setException(ex);
            });
            return; // The request handler will be initialized once addProxy completes.
          } //
          // We can now send the queued requests.
          //


          this.flushRequests();
        }
      }, {
        key: "setException",
        value: function setException(ex) {
          var _this67 = this;

          Debug.assert(!this._initialized && this._exception === null);
          this._exception = ex;
          this._proxies.length = 0;
          this._proxy = null; // Break cyclic reference count.
          //
          // NOTE: remove the request handler *before* notifying the
          // requests that the connection failed. It's important to ensure
          // that future invocations will obtain a new connect request
          // handler once invocations are notified.
          //

          try {
            this._reference.getInstance().requestHandlerFactory().removeRequestHandler(this._reference, this);
          } catch (exc) {// Ignore
          }

          this._requests.forEach(function (request) {
            if (request !== null) {
              request.completedEx(_this67._exception);
            }
          });

          this._requests.length = 0;
        }
      }, {
        key: "initialized",
        value: function initialized() {
          if (this._initialized) {
            Debug.assert(this._connection !== null);
            return true;
          } else if (this._exception !== null) {
            if (this._connection !== null) {
              //
              // Only throw if the connection didn't get established. If
              // it died after being established, we allow the caller to
              // retry the connection establishment by not throwing here
              // (the connection will throw RetryException).
              //
              return true;
            }

            throw this._exception;
          } else {
            return this._initialized;
          }
        }
      }, {
        key: "flushRequests",
        value: function flushRequests() {
          var _this68 = this;

          Debug.assert(this._connection !== null && !this._initialized);
          var exception = null;

          this._requests.forEach(function (request) {
            try {
              request.invokeRemote(_this68._connection, _this68._response);
            } catch (ex) {
              if (ex instanceof RetryException) {
                exception = ex.inner; // Remove the request handler before retrying.

                _this68._reference.getInstance().requestHandlerFactory().removeRequestHandler(_this68._reference, _this68);

                request.retryException(ex.inner);
              } else {
                Debug.assert(ex instanceof LocalException);
                exception = ex;
                request.out.completedEx(ex);
              }
            }
          });

          this._requests.length = 0;

          if (this._reference.getCacheConnection() && exception === null) {
            this._requestHandler = new ConnectionRequestHandler(this._reference, this._connection);

            this._proxies.forEach(function (proxy) {
              return proxy._updateRequestHandler(_this68, _this68._requestHandler);
            });
          }

          Debug.assert(!this._initialized);
          this._exception = exception;
          this._initialized = this._exception === null; //
          // Only remove once all the requests are flushed to
          // guarantee serialization.
          //

          this._reference.getInstance().requestHandlerFactory().removeRequestHandler(this._reference, this);

          this._proxies.length = 0;
          this._proxy = null; // Break cyclic reference count.
        }
      }]);

      return ConnectRequestHandler;
    }();

    Ice.ConnectRequestHandler = ConnectRequestHandler;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var EndpointI =
    /*#__PURE__*/
    function () {
      function EndpointI() {
        _classCallCheck(this, EndpointI);
      }

      _createClass(EndpointI, [{
        key: "toString",
        value: function toString() {
          //
          // WARNING: Certain features, such as proxy validation in Glacier2,
          // depend on the format of proxy strings. Changes to toString() and
          // methods called to generate parts of the reference string could break
          // these features. Please review for all features that depend on the
          // format of proxyToString() before changing this and related code.
          //
          return this.protocol() + this.options();
        }
      }, {
        key: "initWithOptions",
        value: function initWithOptions(args) {
          var unknown = [];
          var str = "`" + this.protocol();

          for (var i = 0; i < args.length; ++i) {
            if (args[i].search(/[ \t\n\r]+/) !== -1) {
              str += " \"" + args[i] + "\"";
            } else {
              str += " " + args[i];
            }
          }

          str += "'";

          for (var _i5 = 0; _i5 < args.length;) {
            var option = args[_i5++];

            if (option.length < 2 || option.charAt(0) != '-') {
              unknown.push(option);
              continue;
            }

            var argument = null;

            if (_i5 < args.length && args[_i5].charAt(0) != '-') {
              argument = args[_i5++];
            }

            if (!this.checkOption(option, argument, str)) {
              unknown.push(option);

              if (argument !== null) {
                unknown.push(argument);
              }
            }
          }

          args.length = 0;

          for (var _i6 = 0; _i6 < unknown.length; _i6++) {
            args.push(unknown[_i6]);
          }
        } //
        // Compare endpoints for sorting purposes
        //

      }, {
        key: "equals",
        value: function equals(p) {
          if (!(p instanceof EndpointI)) {
            return false;
          }

          return this.compareTo(p) === 0;
        }
      }, {
        key: "checkOption",
        value: function checkOption() {
          return false;
        }
      }]);

      return EndpointI;
    }();

    Ice.EndpointI = EndpointI;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var RetryTask =
    /*#__PURE__*/
    function () {
      function RetryTask(instance, queue, outAsync, interval) {
        _classCallCheck(this, RetryTask);

        this._instance = instance;
        this._queue = queue;
        this._outAsync = outAsync;
      }

      _createClass(RetryTask, [{
        key: "run",
        value: function run() {
          this._outAsync.retry();

          this._queue.remove(this);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          try {
            this._outAsync.abort(new Ice.CommunicatorDestroyedException());
          } catch (ex) {// Abort shouldn't throw if there's no callback, ignore.
          }
        }
      }, {
        key: "asyncRequestCanceled",
        value: function asyncRequestCanceled(outAsync, ex) {
          if (this._queue.cancel(this)) {
            if (this._instance.traceLevels().retry >= 1) {
              this._instance.initializationData().logger.trace(this._instance.traceLevels().retryCat, "operation retry canceled\n" + ex.toString());
            }

            this._outAsync.completedEx(ex);
          }
        }
      }]);

      return RetryTask;
    }();

    var RetryQueue =
    /*#__PURE__*/
    function () {
      function RetryQueue(instance) {
        _classCallCheck(this, RetryQueue);

        this._instance = instance;
        this._requests = [];
      }

      _createClass(RetryQueue, [{
        key: "add",
        value: function add(outAsync, interval) {
          if (this._instance === null) {
            throw new Ice.CommunicatorDestroyedException();
          }

          var task = new RetryTask(this._instance, this, outAsync);
          outAsync.cancelable(task); // This will throw if the request is canceled

          task.token = this._instance.timer().schedule(function () {
            return task.run();
          }, interval);

          this._requests.push(task);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          var _this69 = this;

          this._requests.forEach(function (request) {
            _this69._instance.timer().cancel(request.token);

            request.destroy();
          });

          this._requests = [];
          this._instance = null;
        }
      }, {
        key: "remove",
        value: function remove(task) {
          var idx = this._requests.indexOf(task);

          if (idx >= 0) {
            this._requests.splice(idx, 1);
          }
        }
      }, {
        key: "cancel",
        value: function cancel(task) {
          var idx = this._requests.indexOf(task);

          if (idx >= 0) {
            this._requests.splice(idx, 1);

            return this._instance.timer().cancel(task.token);
          }

          return false;
        }
      }]);

      return RetryQueue;
    }();

    Ice.RetryQueue = RetryQueue;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Debug = Ice.Debug;
    var HashMap = Ice.HashMap;

    var RouterInfo =
    /*#__PURE__*/
    function () {
      function RouterInfo(router) {
        _classCallCheck(this, RouterInfo);

        this._router = router;
        Debug.assert(this._router !== null);
        this._clientEndpoints = null;
        this._adapter = null;
        this._identities = new HashMap(HashMap.compareEquals); // Set<Identity> = Map<Identity, 1>

        this._evictedIdentities = [];
        this._hasRoutingTable = false;
      }

      _createClass(RouterInfo, [{
        key: "destroy",
        value: function destroy() {
          this._clientEndpoints = [];
          this._adapter = null;

          this._identities.clear();
        }
      }, {
        key: "equals",
        value: function equals(rhs) {
          if (this === rhs) {
            return true;
          }

          if (rhs instanceof RouterInfo) {
            return this._router.equals(rhs._router);
          }

          return false;
        }
      }, {
        key: "hashCode",
        value: function hashCode() {
          return this._router.hashCode();
        }
      }, {
        key: "getRouter",
        value: function getRouter() {
          //
          // No mutex lock necessary, _router is immutable.
          //
          return this._router;
        }
      }, {
        key: "getClientEndpoints",
        value: function getClientEndpoints() {
          var _this70 = this;

          var promise = new Ice.Promise();

          if (this._clientEndpoints !== null) {
            promise.resolve(this._clientEndpoints);
          } else {
            this._router.getClientProxy().then(function (result) {
              return _this70.setClientEndpoints(result[0], result[1] !== undefined ? result[1] : true, promise);
            }).catch(promise.reject);
          }

          return promise;
        }
      }, {
        key: "getServerEndpoints",
        value: function getServerEndpoints() {
          return this._router.getServerProxy().then(function (serverProxy) {
            if (serverProxy === null) {
              throw new Ice.NoEndpointException();
            }

            serverProxy = serverProxy.ice_router(null); // The server proxy cannot be routed.

            return serverProxy._getReference().getEndpoints();
          });
        }
      }, {
        key: "addProxy",
        value: function addProxy(proxy) {
          var _this71 = this;

          Debug.assert(proxy !== null);

          if (!this._hasRoutingTable) {
            return Ice.Promise.resolve(); // The router implementation doesn't maintain a routing table.
          } else if (this._identities.has(proxy.ice_getIdentity())) {
            //
            // Only add the proxy to the router if it's not already in our local map.
            //
            return Ice.Promise.resolve();
          } else {
            return this._router.addProxies([proxy]).then(function (evictedProxies) {
              _this71.addAndEvictProxies(proxy, evictedProxies);
            });
          }
        }
      }, {
        key: "setAdapter",
        value: function setAdapter(adapter) {
          this._adapter = adapter;
        }
      }, {
        key: "getAdapter",
        value: function getAdapter() {
          return this._adapter;
        }
      }, {
        key: "clearCache",
        value: function clearCache(ref) {
          this._identities.delete(ref.getIdentity());
        }
      }, {
        key: "setClientEndpoints",
        value: function setClientEndpoints(clientProxy, hasRoutingTable, promise) {
          var _this72 = this;

          if (this._clientEndpoints === null) {
            this._hasRoutingTable = hasRoutingTable;

            if (clientProxy === null) {
              //
              // If getClientProxy() return nil, use router endpoints.
              //
              this._clientEndpoints = this._router._getReference().getEndpoints();
              promise.resolve(this._clientEndpoints);
            } else {
              clientProxy = clientProxy.ice_router(null); // The client proxy cannot be routed.
              //
              // In order to avoid creating a new connection to the
              // router, we must use the same timeout as the already
              // existing connection.
              //

              this._router.ice_getConnection().then(function (con) {
                _this72._clientEndpoints = clientProxy.ice_timeout(con.timeout())._getReference().getEndpoints();
                promise.resolve(_this72._clientEndpoints);
              }).catch(promise.reject);
            }
          } else {
            promise.resolve(this._clientEndpoints);
          }
        }
      }, {
        key: "addAndEvictProxies",
        value: function addAndEvictProxies(proxy, evictedProxies) {
          var _this73 = this;

          //
          // Check if the proxy hasn't already been evicted by a
          // concurrent addProxies call. If it's the case, don't
          // add it to our local map.
          //
          var index = this._evictedIdentities.findIndex(function (e) {
            return e.equals(proxy.ice_getIdentity());
          });

          if (index >= 0) {
            this._evictedIdentities.splice(index, 1);
          } else {
            //
            // If we successfully added the proxy to the router,
            // we add it to our local map.
            //
            this._identities.set(proxy.ice_getIdentity(), 1);
          } //
          // We also must remove whatever proxies the router evicted.
          //


          evictedProxies.forEach(function (proxy) {
            _this73._identities.delete(proxy.ice_getIdentity());
          });
        }
      }]);

      return RouterInfo;
    }();

    Ice.RouterInfo = RouterInfo;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Connection.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */

    /**
     * The batch compression option when flushing queued batch requests.
     *
     **/
    Ice.CompressBatch = Slice.defineEnum([['Yes', 0], ['No', 1], ['BasedOnProxy', 2]]);
    /**
     * Base class providing access to the connection details.
     *
     **/

    Ice.ConnectionInfo =
    /*#__PURE__*/
    function () {
      function _class85() {
        var underlying = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var incoming = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var adapterName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        var connectionId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        _classCallCheck(this, _class85);

        this.underlying = underlying;
        this.incoming = incoming;
        this.adapterName = adapterName;
        this.connectionId = connectionId;
      }

      return _class85;
    }();
    /**
     * Specifies the close semantics for Active Connection Management.
     **/


    Ice.ACMClose = Slice.defineEnum([['CloseOff', 0], ['CloseOnIdle', 1], ['CloseOnInvocation', 2], ['CloseOnInvocationAndIdle', 3], ['CloseOnIdleForceful', 4]]);
    /**
     * Specifies the heartbeat semantics for Active Connection Management.
     **/

    Ice.ACMHeartbeat = Slice.defineEnum([['HeartbeatOff', 0], ['HeartbeatOnDispatch', 1], ['HeartbeatOnIdle', 2], ['HeartbeatAlways', 3]]);
    /**
     * A collection of Active Connection Management configuration settings.
     **/

    Ice.ACM =
    /*#__PURE__*/
    function () {
      function _class86() {
        var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Ice.ACMClose.CloseOff;
        var heartbeat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Ice.ACMHeartbeat.HeartbeatOff;

        _classCallCheck(this, _class86);

        this.timeout = timeout;
        this.close = close;
        this.heartbeat = heartbeat;
      }

      return _class86;
    }();

    Slice.defineStruct(Ice.ACM, true, true);
    /**
     * Determines the behavior when manually closing a connection.
     **/

    Ice.ConnectionClose = Slice.defineEnum([['Forcefully', 0], ['Gracefully', 1], ['GracefullyWithWait', 2]]);
    /**
     * Provides access to the connection details of an IP connection
     *
     **/

    Ice.IPConnectionInfo =
    /*#__PURE__*/
    function (_Ice$ConnectionInfo) {
      _inherits(_class87, _Ice$ConnectionInfo);

      function _class87(underlying, incoming, adapterName, connectionId) {
        var _this74;

        var localAddress = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
        var localPort = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;
        var remoteAddress = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "";
        var remotePort = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : -1;

        _classCallCheck(this, _class87);

        _this74 = _possibleConstructorReturn(this, _getPrototypeOf(_class87).call(this, underlying, incoming, adapterName, connectionId));
        _this74.localAddress = localAddress;
        _this74.localPort = localPort;
        _this74.remoteAddress = remoteAddress;
        _this74.remotePort = remotePort;
        return _this74;
      }

      return _class87;
    }(Ice.ConnectionInfo);
    /**
     * Provides access to the connection details of a TCP connection
     *
     **/


    Ice.TCPConnectionInfo =
    /*#__PURE__*/
    function (_Ice$IPConnectionInfo) {
      _inherits(_class88, _Ice$IPConnectionInfo);

      function _class88(underlying, incoming, adapterName, connectionId, localAddress, localPort, remoteAddress, remotePort) {
        var _this75;

        var rcvSize = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
        var sndSize = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;

        _classCallCheck(this, _class88);

        _this75 = _possibleConstructorReturn(this, _getPrototypeOf(_class88).call(this, underlying, incoming, adapterName, connectionId, localAddress, localPort, remoteAddress, remotePort));
        _this75.rcvSize = rcvSize;
        _this75.sndSize = sndSize;
        return _this75;
      }

      return _class88;
    }(Ice.IPConnectionInfo);
    /**
     * Provides access to the connection details of a UDP connection
     *
     **/


    Ice.UDPConnectionInfo =
    /*#__PURE__*/
    function (_Ice$IPConnectionInfo2) {
      _inherits(_class89, _Ice$IPConnectionInfo2);

      function _class89(underlying, incoming, adapterName, connectionId, localAddress, localPort, remoteAddress, remotePort) {
        var _this76;

        var mcastAddress = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "";
        var mcastPort = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : -1;
        var rcvSize = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
        var sndSize = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;

        _classCallCheck(this, _class89);

        _this76 = _possibleConstructorReturn(this, _getPrototypeOf(_class89).call(this, underlying, incoming, adapterName, connectionId, localAddress, localPort, remoteAddress, remotePort));
        _this76.mcastAddress = mcastAddress;
        _this76.mcastPort = mcastPort;
        _this76.rcvSize = rcvSize;
        _this76.sndSize = sndSize;
        return _this76;
      }

      return _class89;
    }(Ice.IPConnectionInfo);

    Slice.defineDictionary(Ice, "HeaderDict", "HeaderDictHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
    /**
     * Provides access to the connection details of a WebSocket connection
     *
     **/

    Ice.WSConnectionInfo =
    /*#__PURE__*/
    function (_Ice$ConnectionInfo2) {
      _inherits(_class90, _Ice$ConnectionInfo2);

      function _class90(underlying, incoming, adapterName, connectionId) {
        var _this77;

        var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        _classCallCheck(this, _class90);

        _this77 = _possibleConstructorReturn(this, _getPrototypeOf(_class90).call(this, underlying, incoming, adapterName, connectionId));
        _this77.headers = headers;
        return _this77;
      }

      return _class90;
    }(Ice.ConnectionInfo);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var _ModuleRegistry = Ice._ModuleRegistry;
    var builtinHelpers = [Ice.ByteHelper, Ice.BoolHelper, Ice.ShortHelper, Ice.IntHelper, Ice.LongHelper, Ice.FloatHelper, Ice.DoubleHelper, Ice.StringHelper, Ice.Value, Ice.ObjectPrx, Ice.Value];

    function parseParam(p) {
      var type = p[0];

      var t = _typeof(type);

      if (t === 'number') {
        type = builtinHelpers[p[0]];
      } else if (t === 'string') {
        type = _ModuleRegistry.type(type);
      }

      return {
        type: type,
        isObject: p[1] === true,
        tag: p[2] // Optional tag, which may not be present - an undefined tag means "not optional".

      };
    } //
    // Each operation descriptor is a property. The key is the "on-the-wire"
    // name, and the value is an array consisting of the following elements:
    //
    //  0: native method name in case of a keyword conflict (e.g., "_while"),
    //     otherwise an empty string
    //  1: mode (undefined == Normal or int)
    //  2: sendMode (undefined == Normal or int)
    //  3: format (undefined == Default or int)
    //  4: return type (undefined if void, or [type, tag])
    //  5: in params (undefined if none, or array of [type, tag])
    //  6: out params (undefined if none, or array of [type, tag])
    //  7: exceptions (undefined if none, or array of types)
    //  8: sends classes (true or undefined)
    //  9: returns classes (true or undefined)
    //


    function parseOperation(name, arr) {
      var r = {};
      r.name = name;
      r.servantMethod = arr[0] ? arr[0] : name;
      r.mode = arr[1] ? Ice.OperationMode.valueOf(arr[1]) : Ice.OperationMode.Normal;
      r.sendMode = arr[2] ? Ice.OperationMode.valueOf(arr[2]) : Ice.OperationMode.Normal;
      r.format = arr[3] ? Ice.FormatType.valueOf(arr[3]) : Ice.FormatType.DefaultFormat;
      var ret;

      if (arr[4]) {
        ret = parseParam(arr[4]);
        ret.pos = 0;
      }

      r.returns = ret;
      var inParams = [];
      var inParamsOpt = [];

      if (arr[5]) {
        for (var i = 0; i < arr[5].length; ++i) {
          var p = parseParam(arr[5][i]);
          p.pos = i;
          inParams.push(p);

          if (p.tag) {
            inParamsOpt.push(p);
          }
        }
      }

      inParamsOpt.sort(function (p1, p2) {
        return p1.tag - p2.tag;
      }); // Sort by tag.

      r.inParams = inParams;
      r.inParamsOpt = inParamsOpt;
      var outParams = [];
      var outParamsOpt = [];

      if (arr[6]) {
        var offs = ret ? 1 : 0;

        for (var _i7 = 0; _i7 < arr[6].length; ++_i7) {
          var _p = parseParam(arr[6][_i7]);

          _p.pos = _i7 + offs;
          outParams.push(_p);

          if (_p.tag) {
            outParamsOpt.push(_p);
          }
        }
      }

      if (ret && ret.tag) {
        outParamsOpt.push(ret);
      }

      outParamsOpt.sort(function (p1, p2) {
        return p1.tag - p2.tag;
      }); // Sort by tag.

      r.outParams = outParams;
      r.outParamsOpt = outParamsOpt;
      var exceptions = [];

      if (arr[7]) {
        for (var _i8 = 0; _i8 < arr[7].length; ++_i8) {
          exceptions.push(arr[7][_i8]);
        }
      }

      r.exceptions = exceptions;
      r.sendsClasses = arr[8] === true;
      r.returnsClasses = arr[9] === true;
      return r;
    }

    var OpTable =
    /*#__PURE__*/
    function () {
      function OpTable(ops) {
        _classCallCheck(this, OpTable);

        this.raw = ops;
        this.parsed = {};
      }

      _createClass(OpTable, [{
        key: "find",
        value: function find(name) {
          //
          // Check if we've already parsed the operation.
          //
          var op = this.parsed[name];

          if (op === undefined && this.raw[name] !== undefined) {
            //
            // We haven't parsed it yet, but we found a match for the name, so parse it now.
            //
            op = parseOperation(name, this.raw[name]);
            this.parsed[name] = op;
          }

          return op;
        }
      }]);

      return OpTable;
    }();

    function unmarshalParams(is, retvalInfo, allParamInfo, optParamInfo, usesClasses, params, offset) {
      var readParam = function readParam(p, optional) {
        if (optional) {
          if (p.isObject) {
            is.readOptionalValue(p.tag, function (obj) {
              params[p.pos + offset] = obj;
            }, p.type);
          } else {
            params[p.pos + offset] = p.type.readOptional(is, p.tag);
          }
        } else if (p.isObject) {
          is.readValue(function (obj) {
            params[p.pos + offset] = obj;
          }, p.type);
        } else {
          params[p.pos + offset] = p.type.read(is);
        }
      }; //
      // First read all required params.
      //


      for (var i = 0; i < allParamInfo.length; ++i) {
        if (!allParamInfo[i].tag) {
          readParam(allParamInfo[i], false);
        }
      } //
      // Then read a required return value (if any).
      //


      if (retvalInfo) {
        readParam(retvalInfo, false);
      } //
      // Then read all optional params.
      //


      for (var _i9 = 0; _i9 < optParamInfo.length; ++_i9) {
        readParam(optParamInfo[_i9], true);
      }

      if (usesClasses) {
        is.readPendingValues();
      }
    }

    function marshalParams(os, params, retvalInfo, paramInfo, optParamInfo, usesClasses) {
      //
      // Write the required params.
      //
      for (var i = 0; i < paramInfo.length; ++i) {
        var p = paramInfo[i];

        if (!p.tag) {
          p.type.write(os, params[p.pos]);
        }
      } //
      // retvalInfo should only be provided if there is a non-void required return value.
      //


      if (retvalInfo) {
        retvalInfo.type.write(os, params[retvalInfo.pos]);
      } //
      // Write the optional params.
      //


      for (var _i10 = 0; _i10 < optParamInfo.length; ++_i10) {
        var _p2 = optParamInfo[_i10];

        _p2.type.writeOptional(os, _p2.tag, params[_p2.pos]);
      }

      if (usesClasses) {
        os.writePendingValues();
      }
    }

    function dispatchImpl(servant, op, incomingAsync, current) {
      //
      // Check to make sure the servant implements the operation.
      //
      var method = servant[op.servantMethod];

      if (method === undefined || typeof method !== "function") {
        throw new Ice.UnknownException("servant for identity " + current.adapter.getCommunicator().identityToString(current.id) + " does not define operation `" + op.servantMethod + "'");
      } //
      // Unmarshal the in params (if any).
      //


      var params = [];

      if (op.inParams.length === 0) {
        incomingAsync.readEmptyParams();
      } else {
        var is = incomingAsync.startReadParams();
        unmarshalParams(is, undefined, op.inParams, op.inParamsOpt, op.sendsClasses, params, 0);
        incomingAsync.endReadParams();
      }

      params.push(current);
      incomingAsync.setFormat(op.format);

      var marshalFn = function marshalFn(params) {
        var numExpectedResults = op.outParams.length + (op.returns ? 1 : 0);

        if (numExpectedResults > 1 && !(params instanceof Array)) {
          throw new Ice.MarshalException("operation `" + op.servantMethod + "' should return an array");
        } else if (numExpectedResults === 1) {
          params = [params]; // Wrap a single out parameter in an array.
        }

        if (op.returns === undefined && op.outParams.length === 0) {
          if (params && params.length > 0) {
            throw new Ice.MarshalException("operation `" + op.servantMethod + "' shouldn't return any value");
          } else {
            incomingAsync.writeEmptyParams();
          }
        } else {
          var retvalInfo;

          if (op.returns && !op.returns.tag) {
            retvalInfo = op.returns;
          }

          var os = incomingAsync.startWriteParams();
          marshalParams(os, params, retvalInfo, op.outParams, op.outParamsOpt, op.returnsClasses);
          incomingAsync.endWriteParams();
        }
      };

      var results = method.apply(servant, params);

      if (results instanceof Promise) {
        return results.then(marshalFn);
      } else {
        marshalFn(results);
        return null;
      }
    }

    function getServantMethodFromInterfaces(interfaces, methodName, all) {
      var method;

      for (var i = 0; method === undefined && i < interfaces.length; ++i) {
        var intf = interfaces[i];
        method = intf[methodName];

        if (method === undefined) {
          if (all.indexOf(intf) === -1) {
            all.push(intf);
          }

          if (intf._iceImplements) {
            method = getServantMethodFromInterfaces(intf._iceImplements, methodName, all);
          }
        }
      }

      return method;
    }

    var dispatchPrefix = "_iceD_";

    function getServantMethod(servantType, name) {
      //
      // The dispatch method is named _iceD_<Slice name> and is stored in the type (not the prototype).
      //
      var methodName = dispatchPrefix + name; //
      // First check the servant type.
      //

      var method = servantType[methodName];
      var allInterfaces;

      if (method === undefined) {
        allInterfaces = []; //
        // Now check the prototypes of the implemented interfaces.
        //

        var curr = servantType;

        while (curr && method === undefined) {
          if (curr._iceImplements) {
            method = getServantMethodFromInterfaces(curr._iceImplements, methodName, allInterfaces);
          }

          curr = Object.getPrototypeOf(curr);
        }

        if (method !== undefined) {
          //
          // Add the method to the servant's type.
          //
          servantType[methodName] = method;
        }
      }

      if (method === undefined) {
        //
        // Next check the op table for the servant's type.
        //
        var op;

        if (servantType._iceOps) {
          op = servantType._iceOps.find(name);
        }

        var source;

        if (op === undefined) {
          //
          // Now check the op tables of the base types.
          //
          var parent = Object.getPrototypeOf(servantType);

          while (op === undefined && parent) {
            if (parent._iceOps) {
              if ((op = parent._iceOps.find(name)) !== undefined) {
                source = parent;
              }
            }

            parent = Object.getPrototypeOf(parent);
          } //
          // Now check the op tables of all base interfaces.
          //


          for (var i = 0; op === undefined && i < allInterfaces.length; ++i) {
            var intf = allInterfaces[i];

            if (intf._iceOps) {
              if ((op = intf._iceOps.find(name)) !== undefined) {
                source = intf;
              }
            }
          }
        }

        if (op !== undefined) {
          method = function method(servant, incomingAsync, current) {
            return dispatchImpl(servant, op, incomingAsync, current);
          }; //
          // Add the method to the servant type.
          //


          servantType[methodName] = method; //
          // Also add the method to the type in which the operation was found.
          //

          if (source) {
            source[methodName] = method;
          }
        }
      }

      return method;
    }

    function addProxyOperation(proxyType, name, data) {
      var method = data[0] ? data[0] : name;
      var op = null;

      proxyType.prototype[method] = function () {
        //
        // Parse the operation data on the first invocation of a proxy method.
        //
        if (op === null) {
          op = parseOperation(name, data);
        }

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var ctx = args[op.inParams.length]; // The request context is the last argument (if present).

        var marshalFn = null;

        if (op.inParams.length > 0) {
          marshalFn = function marshalFn(os, params) {
            //
            // Validate the parameters.
            //
            for (var i = 0; i < op.inParams.length; ++i) {
              var p = op.inParams[i];
              var v = params[p.pos];

              if (!p.tag || v !== undefined) {
                if (typeof p.type.validate === "function") {
                  if (!p.type.validate(v)) {
                    throw new Ice.MarshalException("invalid value for argument " + (i + 1) + " in operation `" + op.servantMethod + "'");
                  }
                }
              }
            }

            marshalParams(os, params, undefined, op.inParams, op.inParamsOpt, op.sendsClasses);
          };
        }

        var unmarshalFn = null;

        if (op.returns || op.outParams.length > 0) {
          unmarshalFn = function unmarshalFn(asyncResult) {
            //
            // The results array holds the out parameters in the following format:
            //
            // [retval, out1, out2, ..., asyncResult]
            //
            var results = [];
            var is = asyncResult.startReadParams();
            var retvalInfo;

            if (op.returns && !op.returns.tag) {
              retvalInfo = op.returns;
            }

            unmarshalParams(is, retvalInfo, op.outParams, op.outParamsOpt, op.returnsClasses, results, 0);
            asyncResult.endReadParams();
            return results.length == 1 ? results[0] : results;
          };
        }

        return Ice.ObjectPrx._invoke(this, op.name, op.sendMode, op.format, ctx, marshalFn, unmarshalFn, op.exceptions, Array.prototype.slice.call(args));
      };
    }

    var Slice = Ice.Slice;

    Slice.defineOperations = function (classType, proxyType, ids, pos, ops) {
      if (ops) {
        classType._iceOps = new OpTable(ops);
      }

      classType.prototype._iceDispatch = function (incomingAsync, current) {
        //
        // Retrieve the dispatch method for this operation.
        //
        var method = getServantMethod(classType, current.operation);

        if (method === undefined || typeof method !== 'function') {
          throw new Ice.OperationNotExistException(current.id, current.facet, current.operation);
        }

        return method.call(method, this, incomingAsync, current);
      };

      classType.prototype._iceMostDerivedType = function () {
        return classType;
      };

      Object.defineProperty(classType, "_iceIds", {
        get: function get() {
          return ids;
        }
      });
      Object.defineProperty(classType, "_iceId", {
        get: function get() {
          return ids[pos];
        }
      });

      classType.ice_staticId = function () {
        return classType._iceId;
      };

      if (proxyType !== undefined) {
        if (ops) {
          for (var name in ops) {
            addProxyOperation(proxyType, name, ops[name]);
          }
        } //
        // Copy proxy methods from super-interfaces.
        //


        if (proxyType._implements) {
          for (var intf in proxyType._implements) {
            var proto = proxyType._implements[intf].prototype;

            for (var f in proto) {
              if (typeof proto[f] == "function" && proxyType.prototype[f] === undefined) {
                proxyType.prototype[f] = proto[f];
              }
            }
          }
        }

        Object.defineProperty(proxyType, "_id", {
          get: function get() {
            return ids[pos];
          }
        });
      }
    }; //
    // Define the "built-in" operations for all Ice objects.
    //


    Slice.defineOperations(Ice.Object, Ice.ObjectPrx, ["::Ice::Object"], 0, {
      ice_ping: [undefined, 1, 1, undefined, undefined, undefined, undefined, undefined],
      ice_isA: [undefined, 1, 1, undefined, [1], [[7]], undefined, undefined],
      ice_id: [undefined, 1, 1, undefined, [7], undefined, undefined, undefined],
      ice_ids: [undefined, 1, 1, undefined, ["Ice.StringSeqHelper"], undefined, undefined, undefined]
    });
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Router.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
    var iceC_Ice_Router_ids = ["::Ice::Object", "::Ice::Router"];
    /**
     * The Ice router interface. Routers can be set either globally with
     * {@link Communicator#setDefaultRouter}, or with <code>ice_router</code> on specific
     * proxies.
     *
     **/

    Ice.Router =
    /*#__PURE__*/
    function (_Ice$Object) {
      _inherits(_class91, _Ice$Object);

      function _class91() {
        _classCallCheck(this, _class91);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class91).apply(this, arguments));
      }

      return _class91;
    }(Ice.Object);

    Ice.RouterPrx =
    /*#__PURE__*/
    function (_Ice$ObjectPrx) {
      _inherits(_class92, _Ice$ObjectPrx);

      function _class92() {
        _classCallCheck(this, _class92);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class92).apply(this, arguments));
      }

      return _class92;
    }(Ice.ObjectPrx);

    Slice.defineOperations(Ice.Router, Ice.RouterPrx, iceC_Ice_Router_ids, 1, {
      "getClientProxy": [, 2, 1,, [9],, [[1,, 1]],,,],
      "getServerProxy": [, 2, 1,, [9],,,,,],
      "addProxies": [, 2, 2,, ["Ice.ObjectProxySeqHelper"], [["Ice.ObjectProxySeqHelper"]],,,,]
    });
    var iceC_Ice_RouterFinder_ids = ["::Ice::Object", "::Ice::RouterFinder"];
    /**
     * This inferface should be implemented by services implementing the
     * Ice::Router interface. It should be advertised through an Ice
     * object with the identity `Ice/RouterFinder'. This allows clients to
     * retrieve the router proxy with just the endpoint information of the
     * service.
     *
     **/

    Ice.RouterFinder =
    /*#__PURE__*/
    function (_Ice$Object2) {
      _inherits(_class93, _Ice$Object2);

      function _class93() {
        _classCallCheck(this, _class93);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class93).apply(this, arguments));
      }

      return _class93;
    }(Ice.Object);

    Ice.RouterFinderPrx =
    /*#__PURE__*/
    function (_Ice$ObjectPrx2) {
      _inherits(_class94, _Ice$ObjectPrx2);

      function _class94() {
        _classCallCheck(this, _class94);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class94).apply(this, arguments));
      }

      return _class94;
    }(Ice.ObjectPrx);

    Slice.defineOperations(Ice.RouterFinder, Ice.RouterFinderPrx, iceC_Ice_RouterFinder_ids, 1, {
      "getRouter": [,,,, ["Ice.RouterPrx"],,,,,]
    });
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var OutputStream = Ice.OutputStream;
    var Current = Ice.Current;
    var Debug = Ice.Debug;
    var Context = Ice.Context;
    var Identity = Ice.Identity;
    var Protocol = Ice.Protocol;
    var StringUtil = Ice.StringUtil;

    var IncomingAsync =
    /*#__PURE__*/
    function () {
      function IncomingAsync(instance, connection, adapter, response, requestId) {
        _classCallCheck(this, IncomingAsync);

        this._instance = instance;
        this._response = response;
        this._connection = connection;
        this._format = Ice.FormatType.DefaultFormat;
        this._current = new Current();
        this._current.id = new Identity();
        this._current.adapter = adapter;
        this._current.con = this._connection;
        this._current.requestId = requestId;
        this._servant = null;
        this._locator = null;
        this._cookie = {
          value: null
        };
        this._os = null;
        this._is = null;
      }

      _createClass(IncomingAsync, [{
        key: "startWriteParams",
        value: function startWriteParams() {
          if (!this._response) {
            throw new Ice.MarshalException("can't marshal out parameters for oneway dispatch");
          }

          Debug.assert(this._current.encoding !== null); // Encoding for reply is known.

          this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);

          this._os.writeBlob(Protocol.replyHdr);

          this._os.writeInt(this._current.requestId);

          this._os.writeByte(0);

          this._os.startEncapsulation(this._current.encoding, this._format);

          return this._os;
        }
      }, {
        key: "endWriteParams",
        value: function endWriteParams() {
          if (this._response) {
            this._os.endEncapsulation();
          }
        }
      }, {
        key: "writeEmptyParams",
        value: function writeEmptyParams() {
          if (this._response) {
            Debug.assert(this._current.encoding !== null); // Encoding for reply is known.

            this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);

            this._os.writeBlob(Protocol.replyHdr);

            this._os.writeInt(this._current.requestId);

            this._os.writeByte(Protocol.replyOK);

            this._os.writeEmptyEncapsulation(this._current.encoding);
          }
        }
      }, {
        key: "writeParamEncaps",
        value: function writeParamEncaps(v, ok) {
          if (this._response) {
            Debug.assert(this._current.encoding !== null); // Encoding for reply is known.

            this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);

            this._os.writeBlob(Protocol.replyHdr);

            this._os.writeInt(this._current.requestId);

            this._os.writeByte(ok ? Protocol.replyOK : Protocol.replyUserException);

            if (v === null || v.length === 0) {
              this._os.writeEmptyEncapsulation(this._current.encoding);
            } else {
              this._os.writeEncapsulation(v);
            }
          }
        }
      }, {
        key: "setFormat",
        value: function setFormat(format) {
          this._format = format;
        }
      }, {
        key: "warning",
        value: function warning(ex) {
          Debug.assert(this._instance !== null);
          var s = [];
          s.push("dispatch exception:");
          s.push("\nidentity: " + Ice.identityToString(this._current.id, this._instance.toStringMode()));
          s.push("\nfacet: " + StringUtil.escapeString(this._current.facet, "", this._instance.toStringMode()));
          s.push("\noperation: " + this._current.operation);

          if (this._connection !== null) {
            try {
              for (var p = this._connection.getInfo(); p; p = p.underlying) {
                if (p instanceof Ice.IPConnectionInfo) {
                  s.push("\nremote host: " + p.remoteAddress + " remote port: " + p.remotePort);
                }
              }
            } catch (exc) {// Ignore.
            }
          }

          if (ex.stack) {
            s.push("\n");
            s.push(ex.stack);
          }

          this._instance.initializationData().logger.warning(s.join(""));
        }
      }, {
        key: "handleException",
        value: function handleException(ex, amd) {
          Debug.assert(this._connection !== null);

          var props = this._instance.initializationData().properties;

          if (ex instanceof Ice.RequestFailedException) {
            if (ex.id === null) {
              ex.id = this._current.id;
            }

            if (ex.facet === null) {
              ex.facet = this._current.facet;
            }

            if (ex.operation === null || ex.operation.length === 0) {
              ex.operation = this._current.operation;
            }

            if (props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 1) {
              this.warning(ex);
            }

            if (this._response) {
              this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);

              this._os.writeBlob(Protocol.replyHdr);

              this._os.writeInt(this._current.requestId);

              if (ex instanceof Ice.ObjectNotExistException) {
                this._os.writeByte(Protocol.replyObjectNotExist);
              } else if (ex instanceof Ice.FacetNotExistException) {
                this._os.writeByte(Protocol.replyFacetNotExist);
              } else if (ex instanceof Ice.OperationNotExistException) {
                this._os.writeByte(Protocol.replyOperationNotExist);
              } else {
                Debug.assert(false);
              }

              ex.id._write(this._os); //
              // For compatibility with the old FacetPath.
              //


              if (ex.facet === null || ex.facet.length === 0) {
                Ice.StringSeqHelper.write(this._os, null);
              } else {
                Ice.StringSeqHelper.write(this._os, [ex.facet]);
              }

              this._os.writeString(ex.operation);

              this._connection.sendResponse(this._os);
            } else {
              this._connection.sendNoResponse();
            }
          } else if (ex instanceof Ice.UnknownLocalException) {
            if (props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0) {
              this.warning(ex);
            }

            if (this._response) {
              this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);

              this._os.writeBlob(Protocol.replyHdr);

              this._os.writeInt(this._current.requestId);

              this._os.writeByte(Protocol.replyUnknownLocalException);

              this._os.writeString(ex.unknown);

              this._connection.sendResponse(this._os);
            } else {
              this._connection.sendNoResponse();
            }
          } else if (ex instanceof Ice.UnknownUserException) {
            if (props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0) {
              this.warning(ex);
            }

            if (this._response) {
              this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);

              this._os.writeBlob(Protocol.replyHdr);

              this._os.writeInt(this._current.requestId);

              this._os.writeByte(Protocol.replyUnknownUserException);

              this._os.writeString(ex.unknown);

              this._connection.sendResponse(this._os);
            } else {
              this._connection.sendNoResponse();
            }
          } else if (ex instanceof Ice.UnknownException) {
            if (props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0) {
              this.warning(ex);
            }

            if (this._response) {
              this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);

              this._os.writeBlob(Protocol.replyHdr);

              this._os.writeInt(this._current.requestId);

              this._os.writeByte(Protocol.replyUnknownException);

              this._os.writeString(ex.unknown);

              this._connection.sendResponse(this._os);
            } else {
              this._connection.sendNoResponse();
            }
          } else if (ex instanceof Ice.LocalException) {
            if (props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0) {
              this.warning(ex);
            }

            if (this._response) {
              this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);

              this._os.writeBlob(Protocol.replyHdr);

              this._os.writeInt(this._current.requestId);

              this._os.writeByte(Protocol.replyUnknownLocalException); // this._os.writeString(ex.toString());


              var s = [ex.ice_id()];

              if (ex.stack) {
                s.push("\n");
                s.push(ex.stack);
              }

              this._os.writeString(s.join(""));

              this._connection.sendResponse(this._os);
            } else {
              this._connection.sendNoResponse();
            }
          } else if (ex instanceof Ice.UserException) {
            if (this._response) {
              this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);

              this._os.writeBlob(Protocol.replyHdr);

              this._os.writeInt(this._current.requestId);

              this._os.writeByte(Protocol.replyUserException);

              this._os.startEncapsulation(this._current.encoding, this._format);

              this._os.writeException(ex);

              this._os.endEncapsulation();

              this._connection.sendResponse(this._os);
            } else {
              this._connection.sendNoResponse();
            }
          } else {
            if (props.getPropertyAsIntWithDefault("Ice.Warn.Dispatch", 1) > 0) {
              this.warning(ex);
            }

            if (this._response) {
              this._os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);

              this._os.writeBlob(Protocol.replyHdr);

              this._os.writeInt(this._current.requestId);

              this._os.writeByte(Protocol.replyUnknownException);

              this._os.writeString(ex.toString() + (ex.stack ? "\n" + ex.stack : ""));

              this._connection.sendResponse(this._os);
            } else {
              this._connection.sendNoResponse();
            }
          }

          this._connection = null;
        }
      }, {
        key: "invoke",
        value: function invoke(servantManager, stream) {
          var _this78 = this;

          this._is = stream; //
          // Read the current.
          //

          this._current.id._read(this._is); //
          // For compatibility with the old FacetPath.
          //


          var facetPath = Ice.StringSeqHelper.read(this._is);

          if (facetPath.length > 0) {
            if (facetPath.length > 1) {
              throw new Ice.MarshalException();
            }

            this._current.facet = facetPath[0];
          } else {
            this._current.facet = "";
          }

          this._current.operation = this._is.readString();
          this._current.mode = Ice.OperationMode.valueOf(this._is.readByte());
          this._current.ctx = new Context();

          var sz = this._is.readSize();

          while (sz-- > 0) {
            this._current.ctx.set(this._is.readString(), this._is.readString());
          } //
          // Don't put the code above into the try block below. Exceptions
          // in the code above are considered fatal, and must propagate to
          // the caller of this operation.
          //


          if (servantManager !== null) {
            this._servant = servantManager.findServant(this._current.id, this._current.facet);

            if (this._servant === null) {
              this._locator = servantManager.findServantLocator(this._current.id.category);

              if (this._locator === null && this._current.id.category.length > 0) {
                this._locator = servantManager.findServantLocator("");
              }

              if (this._locator !== null) {
                try {
                  this._servant = this._locator.locate(this._current, this._cookie);
                } catch (ex) {
                  this.skipReadParams(); // Required for batch requests.

                  this.handleException(ex, false);
                  return;
                }
              }
            }
          }

          if (this._servant === null) {
            try {
              if (servantManager !== null && servantManager.hasServant(this._current.id)) {
                throw new Ice.FacetNotExistException(this._current.id, this._current.facet, this._current.operation);
              } else {
                throw new Ice.ObjectNotExistException(this._current.id, this._current.facet, this._current.operation);
              }
            } catch (ex) {
              this.skipReadParams(); // Required for batch requests.

              this.handleException(ex, false);
              return;
            }
          }

          try {
            Debug.assert(this._servant !== null);

            var promise = this._servant._iceDispatch(this, this._current);

            if (promise !== null) {
              promise.then(function () {
                return _this78.completed(null, true);
              }, function (ex) {
                return _this78.completed(ex, true);
              });
              return;
            }

            Debug.assert(!this._response || this._os !== null);
            this.completed(null, false);
          } catch (ex) {
            this.completed(ex, false);
          }
        }
      }, {
        key: "startReadParams",
        value: function startReadParams() {
          //
          // Remember the encoding used by the input parameters, we'll
          // encode the response parameters with the same encoding.
          //
          this._current.encoding = this._is.startEncapsulation();
          return this._is;
        }
      }, {
        key: "endReadParams",
        value: function endReadParams() {
          this._is.endEncapsulation();
        }
      }, {
        key: "readEmptyParams",
        value: function readEmptyParams() {
          this._current.encoding = this._is.skipEmptyEncapsulation();
        }
      }, {
        key: "readParamEncaps",
        value: function readParamEncaps() {
          this._current.encoding = new Ice.EncodingVersion();
          return this._is.readEncapsulation(this._current.encoding);
        }
      }, {
        key: "skipReadParams",
        value: function skipReadParams() {
          this._current.encoding = this._is.skipEncapsulation();
        }
      }, {
        key: "completed",
        value: function completed(exc, amd) {
          try {
            if (this._locator !== null) {
              Debug.assert(this._locator !== null && this._servant !== null);

              try {
                this._locator.finished(this._current, this._servant, this._cookie.value);
              } catch (ex) {
                this.handleException(ex, amd);
                return;
              }
            }

            Debug.assert(this._connection !== null);

            if (exc !== null) {
              this.handleException(exc, amd);
            } else if (this._response) {
              this._connection.sendResponse(this._os);
            } else {
              this._connection.sendNoResponse();
            }
          } catch (ex) {
            if (ex instanceof Ice.LocalException) {
              this._connection.invokeException(ex, 1);
            } else {
              throw ex;
            }
          }

          this._connection = null;
        }
      }]);

      return IncomingAsync;
    }();

    Ice.IncomingAsync = IncomingAsync;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Debug = Ice.Debug;

    var ACMConfig = function ACMConfig(p, l, prefix, dflt) {
      _classCallCheck(this, ACMConfig);

      if (p === undefined) {
        this.timeout = 60 * 1000;
        this.heartbeat = Ice.ACMHeartbeat.HeartbeatOnDispatch;
        this.close = Ice.ACMClose.CloseOnInvocationAndIdle;
        return;
      }

      var timeoutProperty;

      if ((prefix == "Ice.ACM.Client" || prefix == "Ice.ACM.Server") && p.getProperty(prefix + ".Timeout").length === 0) {
        timeoutProperty = prefix; // Deprecated property.
      } else {
        timeoutProperty = prefix + ".Timeout";
      }

      this.timeout = p.getPropertyAsIntWithDefault(timeoutProperty, dflt.timeout / 1000) * 1000; // To ms

      if (this.timeout < 0) {
        l.warning("invalid value for property `" + timeoutProperty + "', default value will be used instead");
        this.timeout = dflt.timeout;
      }

      var hb = p.getPropertyAsIntWithDefault(prefix + ".Heartbeat", dflt.heartbeat.value);

      if (hb >= 0 && hb <= Ice.ACMHeartbeat.maxValue) {
        this.heartbeat = Ice.ACMHeartbeat.valueOf(hb);
      } else {
        l.warning("invalid value for property `" + prefix + ".Heartbeat" + "', default value will be used instead");
        this.heartbeat = dflt.heartbeat;
      }

      var cl = p.getPropertyAsIntWithDefault(prefix + ".Close", dflt.close.value);

      if (cl >= 0 && cl <= Ice.ACMClose.maxValue) {
        this.close = Ice.ACMClose.valueOf(cl);
      } else {
        l.warning("invalid value for property `" + prefix + ".Close" + "', default value will be used instead");
        this.close = dflt.close;
      }
    };

    var FactoryACMMonitor =
    /*#__PURE__*/
    function () {
      function FactoryACMMonitor(instance, config) {
        _classCallCheck(this, FactoryACMMonitor);

        this._instance = instance;
        this._config = config;
        this._reapedConnections = [];
        this._connections = [];
      }

      _createClass(FactoryACMMonitor, [{
        key: "destroy",
        value: function destroy() {
          if (this._instance === null) {
            return;
          }

          this._instance = null;
        }
      }, {
        key: "add",
        value: function add(connection) {
          var _this79 = this;

          if (this._config.timeout === 0) {
            return;
          }

          this._connections.push(connection);

          if (this._connections.length == 1) {
            this._timerToken = this._instance.timer().scheduleRepeated(function () {
              return _this79.runTimerTask();
            }, this._config.timeout / 2);
          }
        }
      }, {
        key: "remove",
        value: function remove(connection) {
          if (this._config.timeout === 0) {
            return;
          }

          var i = this._connections.indexOf(connection);

          Debug.assert(i >= 0);

          this._connections.splice(i, 1);

          if (this._connections.length === 0) {
            this._instance.timer().cancel(this._timerToken);
          }
        }
      }, {
        key: "reap",
        value: function reap(connection) {
          this._reapedConnections.push(connection);
        }
      }, {
        key: "acm",
        value: function acm(timeout, close, heartbeat) {
          Debug.assert(this._instance !== null);
          var config = new ACMConfig();
          config.timeout = this._config.timeout;
          config.close = this._config.close;
          config.heartbeat = this._config.heartbeat;

          if (timeout !== undefined) {
            config.timeout = timeout * 1000; // To milliseconds
          }

          if (close !== undefined) {
            config.close = close;
          }

          if (heartbeat !== undefined) {
            config.heartbeat = heartbeat;
          }

          return new ConnectionACMMonitor(this, this._instance.timer(), config);
        }
      }, {
        key: "getACM",
        value: function getACM() {
          return new Ice.ACM(this._config.timeout / 1000, this._config.close, this._config.heartbeat);
        }
      }, {
        key: "swapReapedConnections",
        value: function swapReapedConnections() {
          if (this._reapedConnections.length === 0) {
            return null;
          }

          var connections = this._reapedConnections;
          this._reapedConnections = [];
          return connections;
        }
      }, {
        key: "runTimerTask",
        value: function runTimerTask() {
          var _this80 = this;

          if (this._instance === null) {
            this._connections = null;
            return;
          } //
          // Monitor connections outside the thread synchronization, so
          // that connections can be added or removed during monitoring.
          //


          var now = Date.now();

          this._connections.forEach(function (connection) {
            try {
              connection.monitor(now, _this80._config);
            } catch (ex) {
              _this80.handleException(ex);
            }
          });
        }
      }, {
        key: "handleException",
        value: function handleException(ex) {
          if (this._instance === null) {
            return;
          }

          this._instance.initializationData().logger.error("exception in connection monitor:\n" + ex);
        }
      }]);

      return FactoryACMMonitor;
    }();

    var ConnectionACMMonitor =
    /*#__PURE__*/
    function () {
      function ConnectionACMMonitor(parent, timer, config) {
        _classCallCheck(this, ConnectionACMMonitor);

        this._parent = parent;
        this._timer = timer;
        this._config = config;
        this._connection = null;
      }

      _createClass(ConnectionACMMonitor, [{
        key: "add",
        value: function add(connection) {
          var _this81 = this;

          Debug.assert(this._connection === null);
          this._connection = connection;

          if (this._config.timeout > 0) {
            this._timerToken = this._timer.scheduleRepeated(function () {
              return _this81.runTimerTask();
            }, this._config.timeout / 2);
          }
        }
      }, {
        key: "remove",
        value: function remove(connection) {
          Debug.assert(this._connection === connection);
          this._connection = null;

          if (this._config.timeout > 0) {
            this._timer.cancel(this._timerToken);
          }
        }
      }, {
        key: "reap",
        value: function reap(connection) {
          this._parent.reap(connection);
        }
      }, {
        key: "acm",
        value: function acm(timeout, close, heartbeat) {
          return this._parent.acm(timeout, close, heartbeat);
        }
      }, {
        key: "getACM",
        value: function getACM() {
          return new Ice.ACM(this._config.timeout / 1000, this._config.close, this._config.heartbeat);
        }
      }, {
        key: "runTimerTask",
        value: function runTimerTask() {
          try {
            this._connection.monitor(Date.now(), this._config);
          } catch (ex) {
            this._parent.handleException(ex);
          }
        }
      }]);

      return ConnectionACMMonitor;
    }();

    Ice.FactoryACMMonitor = FactoryACMMonitor;
    Ice.ACMConfig = ACMConfig;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Process.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
    var iceC_Ice_Process_ids = ["::Ice::Object", "::Ice::Process"];
    /**
     * An administrative interface for process management. Managed servers must
     * implement this interface.
     *
     * <p class="Note">A servant implementing this interface is a potential target
     * for denial-of-service attacks, therefore proper security precautions
     * should be taken. For example, the servant can use a UUID to make its
     * identity harder to guess, and be registered in an object adapter with
     * a secured endpoint.
     *
     **/

    Ice.Process =
    /*#__PURE__*/
    function (_Ice$Object3) {
      _inherits(_class95, _Ice$Object3);

      function _class95() {
        _classCallCheck(this, _class95);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class95).apply(this, arguments));
      }

      return _class95;
    }(Ice.Object);

    Ice.ProcessPrx =
    /*#__PURE__*/
    function (_Ice$ObjectPrx3) {
      _inherits(_class96, _Ice$ObjectPrx3);

      function _class96() {
        _classCallCheck(this, _class96);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class96).apply(this, arguments));
      }

      return _class96;
    }(Ice.ObjectPrx);

    Slice.defineOperations(Ice.Process, Ice.ProcessPrx, iceC_Ice_Process_ids, 1, {
      "shutdown": [,,,,,,,,,],
      "writeMessage": [,,,,, [[7], [3]],,,,]
    });
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var HashMap = Ice.HashMap;
    var Debug = Ice.Debug;

    var EndpointTableEntry = function EndpointTableEntry(time, endpoints) {
      _classCallCheck(this, EndpointTableEntry);

      this.time = time;
      this.endpoints = endpoints;
    };

    var ReferenceTableEntry = function ReferenceTableEntry(time, reference) {
      _classCallCheck(this, ReferenceTableEntry);

      this.time = time;
      this.reference = reference;
    };

    var LocatorTable =
    /*#__PURE__*/
    function () {
      function LocatorTable() {
        _classCallCheck(this, LocatorTable);

        this._adapterEndpointsTable = new Map(); // Map<String, EndpointTableEntry>

        this._objectTable = new HashMap(HashMap.compareEquals); // Map<Ice.Identity, ReferenceTableEntry>
      }

      _createClass(LocatorTable, [{
        key: "clear",
        value: function clear() {
          this._adapterEndpointsTable.clear();

          this._objectTable.clear();
        }
      }, {
        key: "getAdapterEndpoints",
        value: function getAdapterEndpoints(adapter, ttl, cached) {
          if (ttl === 0) // Locator cache disabled.
            {
              cached.value = false;
              return null;
            }

          var entry = this._adapterEndpointsTable.get(adapter);

          if (entry !== undefined) {
            cached.value = this.checkTTL(entry.time, ttl);
            return entry.endpoints;
          }

          cached.value = false;
          return null;
        }
      }, {
        key: "addAdapterEndpoints",
        value: function addAdapterEndpoints(adapter, endpoints) {
          this._adapterEndpointsTable.set(adapter, new EndpointTableEntry(Date.now(), endpoints));
        }
      }, {
        key: "removeAdapterEndpoints",
        value: function removeAdapterEndpoints(adapter) {
          var entry = this._adapterEndpointsTable.get(adapter);

          this._adapterEndpointsTable.delete(adapter);

          return entry !== undefined ? entry.endpoints : null;
        }
      }, {
        key: "getObjectReference",
        value: function getObjectReference(id, ttl, cached) {
          if (ttl === 0) // Locator cache disabled.
            {
              cached.value = false;
              return null;
            }

          var entry = this._objectTable.get(id);

          if (entry !== undefined) {
            cached.value = this.checkTTL(entry.time, ttl);
            return entry.reference;
          }

          cached.value = false;
          return null;
        }
      }, {
        key: "addObjectReference",
        value: function addObjectReference(id, ref) {
          this._objectTable.set(id, new ReferenceTableEntry(Date.now(), ref));
        }
      }, {
        key: "removeObjectReference",
        value: function removeObjectReference(id) {
          var entry = this._objectTable.get(id);

          this._objectTable.delete(id);

          return entry !== undefined ? entry.reference : null;
        }
      }, {
        key: "checkTTL",
        value: function checkTTL(time, ttl) {
          Debug.assert(ttl !== 0);

          if (ttl < 0) // TTL = infinite
            {
              return true;
            } else {
            return Date.now() - time <= ttl * 1000;
          }
        }
      }]);

      return LocatorTable;
    }();

    Ice.LocatorTable = LocatorTable;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Address = function Address(host, port) {
      _classCallCheck(this, Address);

      this.host = host;
      this.port = port;
    };

    Ice.Address = Address;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Address = Ice.Address;
    var HashUtil = Ice.HashUtil;
    var StringUtil = Ice.StringUtil;
    var EndpointParseException = Ice.EndpointParseException;

    var IPEndpointI =
    /*#__PURE__*/
    function (_Ice$EndpointI) {
      _inherits(IPEndpointI, _Ice$EndpointI);

      function IPEndpointI(instance, ho, po, sa, conId) {
        var _this82;

        _classCallCheck(this, IPEndpointI);

        _this82 = _possibleConstructorReturn(this, _getPrototypeOf(IPEndpointI).call(this));
        _this82._instance = instance;
        _this82._host = ho === undefined ? null : ho;
        _this82._port = po === undefined ? null : po;
        _this82._sourceAddr = sa === undefined ? null : sa;
        _this82._connectionId = conId === undefined ? "" : conId;
        return _this82;
      } //
      // Marshal the endpoint
      //


      _createClass(IPEndpointI, [{
        key: "streamWrite",
        value: function streamWrite(s) {
          s.startEncapsulation();
          this.streamWriteImpl(s);
          s.endEncapsulation();
        }
      }, {
        key: "getInfo",
        value: function getInfo() {
          var info = new Ice.IPEndpointInfo();
          this.fillEndpointInfo(info);
          return info;
        } //
        // Return the endpoint type
        //

      }, {
        key: "type",
        value: function type() {
          return this._instance.type();
        } //
        // Return the protocol string
        //

      }, {
        key: "protocol",
        value: function protocol() {
          return this._instance.protocol();
        } //
        // Return true if the endpoint is secure.
        //

      }, {
        key: "secure",
        value: function secure() {
          return this._instance.secure();
        }
      }, {
        key: "connectionId",
        value: function connectionId() {
          return this._connectionId;
        } //
        // Return a new endpoint with a different connection id.
        //

      }, {
        key: "changeConnectionId",
        value: function changeConnectionId(connectionId) {
          if (connectionId === this._connectionId) {
            return this;
          } else {
            return this.createEndpoint(this._host, this._port, connectionId);
          }
        } //
        // Return the endpoint information.
        //

      }, {
        key: "hashCode",
        value: function hashCode() {
          if (this._hashCode === undefined) {
            this._hashCode = this.hashInit(5381);
          }

          return this._hashCode;
        }
      }, {
        key: "options",
        value: function options() {
          //
          // WARNING: Certain features, such as proxy validation in Glacier2,
          // depend on the format of proxy strings. Changes to toString() and
          // methods called to generate parts of the reference string could break
          // these features. Please review for all features that depend on the
          // format of proxyToString() before changing this and related code.
          //
          var s = "";

          if (this._host !== null && this._host.length > 0) {
            s += " -h ";
            var addQuote = this._host.indexOf(':') != -1;

            if (addQuote) {
              s += "\"";
            }

            s += this._host;

            if (addQuote) {
              s += "\"";
            }
          }

          s += " -p " + this._port;

          if (this._sourceAddr !== null && this._sourceAddr.length > 0) {
            s += " --sourceAddr " + this._sourceAddr;
          }

          return s;
        }
      }, {
        key: "compareTo",
        value: function compareTo(p) {
          if (this === p) {
            return 0;
          }

          if (p === null) {
            return 1;
          }

          if (!(p instanceof IPEndpointI)) {
            return this.type() < p.type() ? -1 : 1;
          }

          if (this._port < p._port) {
            return -1;
          } else if (p._port < this._port) {
            return 1;
          }

          if (this._host != p._host) {
            return this._host < p._host ? -1 : 1;
          }

          if (this._sourceAddr != p._sourceAddr) {
            return this._sourceAddr < p._sourceAddr ? -1 : 1;
          }

          if (this._connectionId != p._connectionId) {
            return this._connectionId < p._connectionId ? -1 : 1;
          }

          return 0;
        }
      }, {
        key: "getAddress",
        value: function getAddress() {
          return new Address(this._host, this._port);
        } //
        // Convert the endpoint to its Connector string form
        //

      }, {
        key: "toConnectorString",
        value: function toConnectorString() {
          return this._host + ":" + this._port;
        }
      }, {
        key: "streamWriteImpl",
        value: function streamWriteImpl(s) {
          s.writeString(this._host);
          s.writeInt(this._port);
        }
      }, {
        key: "hashInit",
        value: function hashInit(h) {
          h = HashUtil.addNumber(h, this.type());
          h = HashUtil.addString(h, this._host);
          h = HashUtil.addNumber(h, this._port);
          h = HashUtil.addString(h, this._sourceAddr);
          h = HashUtil.addString(h, this._connectionId);
          return h;
        }
      }, {
        key: "fillEndpointInfo",
        value: function fillEndpointInfo(info) {
          var _this83 = this;

          info.type = function () {
            return _this83.type();
          };

          info.datagram = function () {
            return _this83.datagram();
          };

          info.secure = function () {
            return _this83.secure();
          };

          info.host = this._host;
          info.port = this._port;
          info.sourceAddress = this._sourceAddr;
        }
      }, {
        key: "initWithOptions",
        value: function initWithOptions(args, oaEndpoint) {
          _get(_getPrototypeOf(IPEndpointI.prototype), "initWithOptions", this).call(this, args);

          if (this._host === null || this._host.length === 0) {
            this._host = this._instance.defaultHost();
          } else if (this._host == "*") {
            if (oaEndpoint) {
              this._host = "";
            } else {
              throw new EndpointParseException("`-h *' not valid for proxy endpoint `" + this + "'");
            }
          }

          if (this._host === null) {
            this._host = "";
          }

          if (this._sourceAddr === null) {
            if (!oaEndpoint) {
              this._sourceAddr = this._instance.defaultSourceAddress();
            }
          } else if (oaEndpoint) {
            throw new EndpointParseException("`--sourceAddress not valid for object adapter endpoint `" + this + "'");
          }
        }
      }, {
        key: "initWithStream",
        value: function initWithStream(s) {
          this._host = s.readString();
          this._port = s.readInt();
        }
      }, {
        key: "checkOption",
        value: function checkOption(option, argument, str) {
          if (option === "-h") {
            if (argument === null) {
              throw new EndpointParseException("no argument provided for -h option in endpoint " + str);
            }

            this._host = argument;
          } else if (option === "-p") {
            if (argument === null) {
              throw new EndpointParseException("no argument provided for -p option in endpoint " + str);
            }

            try {
              this._port = StringUtil.toInt(argument);
            } catch (ex) {
              throw new EndpointParseException("invalid port value `" + argument + "' in endpoint " + str);
            }

            if (this._port < 0 || this._port > 65535) {
              throw new EndpointParseException("port value `" + argument + "' out of range in endpoint " + str);
            }
          } else if (option === "--sourceAddress") {
            if (argument === null) {
              throw new EndpointParseException("no argument provided for --sourceAddress option in endpoint " + str);
            }

            this._sourceAddr = argument;
          } else {
            return false;
          }

          return true;
        }
      }]);

      return IPEndpointI;
    }(Ice.EndpointI);

    Ice.IPEndpointI = IPEndpointI;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `EndpointInfo.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */

    /**
     * Provides access to an SSL endpoint information.
     *
     **/
    IceSSL.EndpointInfo =
    /*#__PURE__*/
    function (_Ice$EndpointInfo4) {
      _inherits(_class97, _Ice$EndpointInfo4);

      function _class97(underlying, timeout, compress) {
        _classCallCheck(this, _class97);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class97).call(this, underlying, timeout, compress));
      }

      return _class97;
    }(Ice.EndpointInfo);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    Ice.ToStringMode = Ice.Slice.defineEnum([['Unicode', 0], ['ASCII', 1], ['Compat', 2]]);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    Ice.TraceLevels = function (properties) {
      var networkCat = "Network";
      var protocolCat = "Protocol";
      var retryCat = "Retry";
      var locationCat = "Locator";
      var slicingCat = "Slicing";
      var keyBase = "Ice.Trace.";
      var network = properties.getPropertyAsInt(keyBase + networkCat);
      var protocol = properties.getPropertyAsInt(keyBase + protocolCat);
      var retry = properties.getPropertyAsInt(keyBase + retryCat);
      var location = properties.getPropertyAsInt(keyBase + locationCat);
      var slicing = properties.getPropertyAsInt(keyBase + slicingCat);
      properties.getPropertyAsInt(keyBase + "ThreadPool"); // Avoid an "unused property" warning.

      return (
        /*#__PURE__*/
        function () {
          function _class98() {
            _classCallCheck(this, _class98);
          }

          _createClass(_class98, null, [{
            key: "network",
            get: function get() {
              return network;
            }
          }, {
            key: "networkCat",
            get: function get() {
              return networkCat;
            }
          }, {
            key: "protocol",
            get: function get() {
              return protocol;
            }
          }, {
            key: "protocolCat",
            get: function get() {
              return protocolCat;
            }
          }, {
            key: "retry",
            get: function get() {
              return retry;
            }
          }, {
            key: "retryCat",
            get: function get() {
              return retryCat;
            }
          }, {
            key: "location",
            get: function get() {
              return location;
            }
          }, {
            key: "locationCat",
            get: function get() {
              return locationCat;
            }
          }, {
            key: "slicing",
            get: function get() {
              return slicing;
            }
          }, {
            key: "slicingCat",
            get: function get() {
              return slicingCat;
            }
          }]);

          return _class98;
        }()
      );
    };
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Logger.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var AsyncStatus = Ice.AsyncStatus;
    var AsyncResultBase = Ice.AsyncResultBase;
    var InputStream = Ice.InputStream;
    var OutputStream = Ice.OutputStream;
    var BatchRequestQueue = Ice.BatchRequestQueue;
    var ConnectionFlushBatch = Ice.ConnectionFlushBatch;
    var HeartbeatAsync = Ice.HeartbeatAsync;
    var Debug = Ice.Debug;
    var ExUtil = Ice.ExUtil;
    var HashMap = Ice.HashMap;
    var IncomingAsync = Ice.IncomingAsync;
    var RetryException = Ice.RetryException;
    var Protocol = Ice.Protocol;
    var SocketOperation = Ice.SocketOperation;
    var Timer = Ice.Timer;
    var TraceUtil = Ice.TraceUtil;
    var ProtocolVersion = Ice.ProtocolVersion;
    var EncodingVersion = Ice.EncodingVersion;
    var ACM = Ice.ACM;
    var ACMClose = Ice.ACMClose;
    var ACMHeartbeat = Ice.ACMHeartbeat;
    var ConnectionClose = Ice.ConnectionClose;
    var StateNotInitialized = 0;
    var StateNotValidated = 1;
    var StateActive = 2;
    var StateHolding = 3;
    var StateClosing = 4;
    var StateClosed = 5;
    var StateFinished = 6;

    var MessageInfo = function MessageInfo(instance) {
      _classCallCheck(this, MessageInfo);

      this.stream = new InputStream(instance, Protocol.currentProtocolEncoding);
      this.invokeNum = 0;
      this.requestId = 0;
      this.servantManager = null;
      this.adapter = null;
      this.outAsync = null;
      this.heartbeatCallback = null;
    };

    var ConnectionI =
    /*#__PURE__*/
    function () {
      function ConnectionI(communicator, instance, monitor, transceiver, endpoint, incoming, adapter) {
        _classCallCheck(this, ConnectionI);

        this._communicator = communicator;
        this._instance = instance;
        this._monitor = monitor;
        this._transceiver = transceiver;
        this._desc = transceiver.toString();
        this._type = transceiver.type();
        this._endpoint = endpoint;
        this._incoming = incoming;
        this._adapter = adapter;
        var initData = instance.initializationData();
        this._logger = initData.logger; // Cached for better performance.

        this._traceLevels = instance.traceLevels(); // Cached for better performance.

        this._timer = instance.timer();
        this._writeTimeoutId = 0;
        this._writeTimeoutScheduled = false;
        this._readTimeoutId = 0;
        this._readTimeoutScheduled = false;
        this._hasMoreData = {
          value: false
        };
        this._warn = initData.properties.getPropertyAsInt("Ice.Warn.Connections") > 0;
        this._warnUdp = instance.initializationData().properties.getPropertyAsInt("Ice.Warn.Datagrams") > 0;
        this._acmLastActivity = this._monitor !== null && this._monitor.getACM().timeout > 0 ? Date.now() : -1;
        this._nextRequestId = 1;
        this._messageSizeMax = adapter ? adapter.messageSizeMax() : instance.messageSizeMax();
        this._batchRequestQueue = new BatchRequestQueue(instance, endpoint.datagram());
        this._sendStreams = [];
        this._readStream = new InputStream(instance, Protocol.currentProtocolEncoding);
        this._readHeader = false;
        this._writeStream = new OutputStream(instance, Protocol.currentProtocolEncoding);
        this._readStreamPos = -1;
        this._writeStreamPos = -1;
        this._dispatchCount = 0;
        this._state = StateNotInitialized;
        this._shutdownInitiated = false;
        this._initialized = false;
        this._validated = false;
        this._readProtocol = new ProtocolVersion();
        this._readProtocolEncoding = new EncodingVersion();
        this._asyncRequests = new HashMap(); // Map<int, OutgoingAsync>

        this._exception = null;
        this._startPromise = null;
        this._closePromises = [];
        this._finishedPromises = [];

        if (this._adapter !== null) {
          this._servantManager = this._adapter.getServantManager();
        } else {
          this._servantManager = null;
        }

        this._closeCallback = null;
        this._heartbeatCallback = null;
      }

      _createClass(ConnectionI, [{
        key: "start",
        value: function start() {
          var _this84 = this;

          Debug.assert(this._startPromise === null);

          try {
            // The connection might already be closed if the communicator was destroyed.
            if (this._state >= StateClosed) {
              Debug.assert(this._exception !== null);
              return Ice.Promise.reject(this._exception);
            }

            this._startPromise = new Ice.Promise();

            this._transceiver.setCallbacks(function () {
              return _this84.message(SocketOperation.Write);
            }, // connected callback
            function () {
              return _this84.message(SocketOperation.Read);
            }, // read callback
            function () {
              return _this84.message(SocketOperation.Write);
            } // write callback
            );

            this.initialize();
          } catch (ex) {
            var startPromise = this._startPromise;
            this.exception(ex);
            return startPromise;
          }

          return this._startPromise;
        }
      }, {
        key: "activate",
        value: function activate() {
          if (this._state <= StateNotValidated) {
            return;
          }

          if (this._acmLastActivity > 0) {
            this._acmLastActivity = Date.now();
          }

          this.setState(StateActive);
        }
      }, {
        key: "hold",
        value: function hold() {
          if (this._state <= StateNotValidated) {
            return;
          }

          this.setState(StateHolding);
        }
      }, {
        key: "destroy",
        value: function destroy(reason) {
          switch (reason) {
            case ConnectionI.ObjectAdapterDeactivated:
              {
                this.setState(StateClosing, new Ice.ObjectAdapterDeactivatedException());
                break;
              }

            case ConnectionI.CommunicatorDestroyed:
              {
                this.setState(StateClosing, new Ice.CommunicatorDestroyedException());
                break;
              }

            default:
              {
                Debug.assert(false);
                break;
              }
          }
        }
      }, {
        key: "close",
        value: function close(mode) {
          var r = new AsyncResultBase(this._communicator, "close", this, null, null);

          if (mode == ConnectionClose.Forcefully) {
            this.setState(StateClosed, new Ice.ConnectionManuallyClosedException(false));
            r.resolve();
          } else if (mode == ConnectionClose.Gracefully) {
            this.setState(StateClosing, new Ice.ConnectionManuallyClosedException(true));
            r.resolve();
          } else {
            Debug.assert(mode == ConnectionClose.GracefullyWithWait); //
            // Wait until all outstanding requests have been completed.
            //

            this._closePromises.push(r);

            this.checkClose();
          }

          return r;
        }
      }, {
        key: "checkClose",
        value: function checkClose() {
          var _this85 = this;

          //
          // If close(GracefullyWithWait) has been called, then we need to check if all
          // requests have completed and we can transition to StateClosing. We also
          // complete outstanding promises.
          //
          if (this._asyncRequests.size === 0 && this._closePromises.length > 0) {
            //
            // The caller doesn't expect the state of the connection to change when this is called so
            // we defer the check immediately after doing whather we're doing. This is consistent with
            // other implementations as well.
            //
            Timer.setImmediate(function () {
              _this85.setState(StateClosing, new Ice.ConnectionManuallyClosedException(true));

              _this85._closePromises.forEach(function (p) {
                return p.resolve();
              });

              _this85._closePromises = [];
            });
          }
        }
      }, {
        key: "isActiveOrHolding",
        value: function isActiveOrHolding() {
          return this._state > StateNotValidated && this._state < StateClosing;
        }
      }, {
        key: "isFinished",
        value: function isFinished() {
          if (this._state !== StateFinished || this._dispatchCount !== 0) {
            return false;
          }

          Debug.assert(this._state === StateFinished);
          return true;
        }
      }, {
        key: "throwException",
        value: function throwException() {
          if (this._exception !== null) {
            Debug.assert(this._state >= StateClosing);
            throw this._exception;
          }
        }
      }, {
        key: "waitUntilFinished",
        value: function waitUntilFinished() {
          var promise = new Ice.Promise();

          this._finishedPromises.push(promise);

          this.checkState();
          return promise;
        }
      }, {
        key: "monitor",
        value: function monitor(now, acm) {
          if (this._state !== StateActive) {
            return;
          } //
          // We send a heartbeat if there was no activity in the last
          // (timeout / 4) period. Sending a heartbeat sooner than
          // really needed is safer to ensure that the receiver will
          // receive the heartbeat in time. Sending the heartbeat if
          // there was no activity in the last (timeout / 2) period
          // isn't enough since monitor() is called only every (timeout
          // / 2) period.
          //
          // Note that this doesn't imply that we are sending 4 heartbeats
          // per timeout period because the monitor() method is still only
          // called every (timeout / 2) period.
          //


          if (acm.heartbeat == Ice.ACMHeartbeat.HeartbeatAlways || acm.heartbeat != Ice.ACMHeartbeat.HeartbeatOff && this._writeStream.isEmpty() && now >= this._acmLastActivity + acm.timeout / 4) {
            if (acm.heartbeat != Ice.ACMHeartbeat.HeartbeatOnDispatch || this._dispatchCount > 0) {
              this.sendHeartbeatNow(); // Send heartbeat if idle in the last timeout / 2 period.
            }
          }

          if (this._readStream.size > Protocol.headerSize || !this._writeStream.isEmpty()) {
            //
            // If writing or reading, nothing to do, the connection
            // timeout will kick-in if writes or reads don't progress.
            // This check is necessary because the actitivy timer is
            // only set when a message is fully read/written.
            //
            return;
          }

          if (acm.close != Ice.ACMClose.CloseOff && now >= this._acmLastActivity + acm.timeout) {
            if (acm.close == Ice.ACMClose.CloseOnIdleForceful || acm.close != Ice.ACMClose.CloseOnIdle && this._asyncRequests.size > 0) {
              //
              // Close the connection if we didn't receive a heartbeat in
              // the last period.
              //
              this.setState(StateClosed, new Ice.ConnectionTimeoutException());
            } else if (acm.close != Ice.ACMClose.CloseOnInvocation && this._dispatchCount === 0 && this._batchRequestQueue.isEmpty() && this._asyncRequests.size === 0) {
              //
              // The connection is idle, close it.
              //
              this.setState(StateClosing, new Ice.ConnectionTimeoutException());
            }
          }
        }
      }, {
        key: "sendAsyncRequest",
        value: function sendAsyncRequest(out, response, batchRequestNum) {
          var requestId = 0;
          var ostr = out.getOs();

          if (this._exception !== null) {
            //
            // If the connection is closed before we even have a chance
            // to send our request, we always try to send the request
            // again.
            //
            throw new RetryException(this._exception);
          }

          Debug.assert(this._state > StateNotValidated);
          Debug.assert(this._state < StateClosing); //
          // Ensure the message isn't bigger than what we can send with the
          // transport.
          //

          this._transceiver.checkSendSize(ostr); //
          // Notify the request that it's cancelable with this connection.
          // This will throw if the request is canceled.
          //


          out.cancelable(this); // Notify the request that it's cancelable

          if (response) {
            //
            // Create a new unique request ID.
            //
            requestId = this._nextRequestId++;

            if (requestId <= 0) {
              this._nextRequestId = 1;
              requestId = this._nextRequestId++;
            } //
            // Fill in the request ID.
            //


            ostr.pos = Protocol.headerSize;
            ostr.writeInt(requestId);
          } else if (batchRequestNum > 0) {
            ostr.pos = Protocol.headerSize;
            ostr.writeInt(batchRequestNum);
          }

          var status;

          try {
            status = this.sendMessage(OutgoingMessage.create(out, out.getOs(), requestId));
          } catch (ex) {
            if (ex instanceof Ice.LocalException) {
              this.setState(StateClosed, ex);
              Debug.assert(this._exception !== null);
              throw this._exception;
            } else {
              throw ex;
            }
          }

          if (response) {
            //
            // Add to the async requests map.
            //
            this._asyncRequests.set(requestId, out);
          }

          return status;
        }
      }, {
        key: "getBatchRequestQueue",
        value: function getBatchRequestQueue() {
          return this._batchRequestQueue;
        }
      }, {
        key: "flushBatchRequests",
        value: function flushBatchRequests() {
          var result = new ConnectionFlushBatch(this, this._communicator, "flushBatchRequests");
          result.invoke();
          return result;
        }
      }, {
        key: "setCloseCallback",
        value: function setCloseCallback(callback) {
          var _this86 = this;

          if (this._state >= StateClosed) {
            if (callback !== null) {
              Timer.setImmediate(function () {
                try {
                  callback(_this86);
                } catch (ex) {
                  _this86._logger.error("connection callback exception:\n" + ex + '\n' + _this86._desc);
                }
              });
            }
          } else {
            this._closeCallback = callback;
          }
        }
      }, {
        key: "setHeartbeatCallback",
        value: function setHeartbeatCallback(callback) {
          if (this._state >= StateClosed) {
            return;
          }

          this._heartbeatCallback = callback;
        }
      }, {
        key: "heartbeat",
        value: function heartbeat() {
          var result = new HeartbeatAsync(this, this._communicator);
          result.invoke();
          return result;
        }
      }, {
        key: "setACM",
        value: function setACM(timeout, close, heartbeat) {
          if (timeout !== undefined && timeout < 0) {
            throw new RangeError("invalid negative ACM timeout value");
          }

          if (this._monitor === null || this._state >= StateClosed) {
            return;
          }

          if (this._state == StateActive) {
            this._monitor.remove(this);
          }

          this._monitor = this._monitor.acm(timeout, close, heartbeat);

          if (this._state == StateActive) {
            this._monitor.add(this);
          }

          if (this._monitor.getACM().timeout <= 0) {
            this._acmLastActivity = -1; // Disable the recording of last activity.
          } else if (this._state == StateActive && this._acmLastActivity == -1) {
            this._acmLastActivity = Date.now();
          }
        }
      }, {
        key: "getACM",
        value: function getACM() {
          return this._monitor !== null ? this._monitor.getACM() : new ACM(0, ACMClose.CloseOff, ACMHeartbeat.HeartbeatOff);
        }
      }, {
        key: "asyncRequestCanceled",
        value: function asyncRequestCanceled(outAsync, ex) {
          for (var i = 0; i < this._sendStreams.length; i++) {
            var o = this._sendStreams[i];

            if (o.outAsync === outAsync) {
              if (o.requestId > 0) {
                this._asyncRequests.delete(o.requestId);
              } //
              // If the request is being sent, don't remove it from the send streams,
              // it will be removed once the sending is finished.
              //


              o.canceled();

              if (i !== 0) {
                this._sendStreams.splice(i, 1);
              }

              outAsync.completedEx(ex);
              this.checkClose();
              return; // We're done.
            }
          }

          if (outAsync instanceof Ice.OutgoingAsync) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = this._asyncRequests[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _step4$value = _slicedToArray(_step4.value, 2),
                    key = _step4$value[0],
                    value = _step4$value[1];

                if (value === outAsync) {
                  this._asyncRequests.delete(key);

                  outAsync.completedEx(ex);
                  this.checkClose();
                  return; // We're done.
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        }
      }, {
        key: "sendResponse",
        value: function sendResponse(os) {
          Debug.assert(this._state > StateNotValidated);

          try {
            if (--this._dispatchCount === 0) {
              if (this._state === StateFinished) {
                this.reap();
              }

              this.checkState();
            }

            if (this._state >= StateClosed) {
              Debug.assert(this._exception !== null);
              throw this._exception;
            }

            this.sendMessage(OutgoingMessage.createForStream(os, true));

            if (this._state === StateClosing && this._dispatchCount === 0) {
              this.initiateShutdown();
            }
          } catch (ex) {
            if (ex instanceof Ice.LocalException) {
              this.setState(StateClosed, ex);
            } else {
              throw ex;
            }
          }
        }
      }, {
        key: "sendNoResponse",
        value: function sendNoResponse() {
          Debug.assert(this._state > StateNotValidated);

          try {
            if (--this._dispatchCount === 0) {
              if (this._state === StateFinished) {
                this.reap();
              }

              this.checkState();
            }

            if (this._state >= StateClosed) {
              Debug.assert(this._exception !== null);
              throw this._exception;
            }

            if (this._state === StateClosing && this._dispatchCount === 0) {
              this.initiateShutdown();
            }
          } catch (ex) {
            if (ex instanceof Ice.LocalException) {
              this.setState(StateClosed, ex);
            } else {
              throw ex;
            }
          }
        }
      }, {
        key: "endpoint",
        value: function endpoint() {
          return this._endpoint;
        }
      }, {
        key: "setAdapter",
        value: function setAdapter(adapter) {
          if (adapter !== null) {
            adapter.checkForDeactivation();

            if (this._state <= StateNotValidated || this._state >= StateClosing) {
              return;
            }

            this._adapter = adapter;
            this._servantManager = adapter.getServantManager(); // The OA's servant manager is immutable.
          } else {
            if (this._state <= StateNotValidated || this._state >= StateClosing) {
              return;
            }

            this._adapter = null;
            this._servantManager = null;
          }
        }
      }, {
        key: "getAdapter",
        value: function getAdapter() {
          return this._adapter;
        }
      }, {
        key: "getEndpoint",
        value: function getEndpoint() {
          return this._endpoint;
        }
      }, {
        key: "createProxy",
        value: function createProxy(ident) {
          //
          // Create a reference and return a reverse proxy for this
          // reference.
          //
          return this._instance.proxyFactory().referenceToProxy(this._instance.referenceFactory().createFixed(ident, this));
        }
      }, {
        key: "message",
        value: function message(operation) {
          var _this87 = this;

          if (this._state >= StateClosed) {
            return;
          }

          this.unscheduleTimeout(operation); //
          // Keep reading until no more data is available.
          //

          this._hasMoreData.value = (operation & SocketOperation.Read) !== 0;
          var info = null;

          try {
            if ((operation & SocketOperation.Write) !== 0 && this._writeStream.buffer.remaining > 0) {
              if (!this.write(this._writeStream.buffer)) {
                Debug.assert(!this._writeStream.isEmpty());
                this.scheduleTimeout(SocketOperation.Write);
                return;
              }

              Debug.assert(this._writeStream.buffer.remaining === 0);
            }

            if ((operation & SocketOperation.Read) !== 0 && !this._readStream.isEmpty()) {
              if (this._readHeader) // Read header if necessary.
                {
                  if (!this.read(this._readStream.buffer)) {
                    //
                    // We didn't get enough data to complete the header.
                    //
                    return;
                  }

                  Debug.assert(this._readStream.buffer.remaining === 0);
                  this._readHeader = false;
                  var pos = this._readStream.pos;

                  if (pos < Protocol.headerSize) {
                    //
                    // This situation is possible for small UDP packets.
                    //
                    throw new Ice.IllegalMessageSizeException();
                  }

                  this._readStream.pos = 0;

                  var magic0 = this._readStream.readByte();

                  var magic1 = this._readStream.readByte();

                  var magic2 = this._readStream.readByte();

                  var magic3 = this._readStream.readByte();

                  if (magic0 !== Protocol.magic[0] || magic1 !== Protocol.magic[1] || magic2 !== Protocol.magic[2] || magic3 !== Protocol.magic[3]) {
                    throw new Ice.BadMagicException("", new Uint8Array([magic0, magic1, magic2, magic3]));
                  }

                  this._readProtocol._read(this._readStream);

                  Protocol.checkSupportedProtocol(this._readProtocol);

                  this._readProtocolEncoding._read(this._readStream);

                  Protocol.checkSupportedProtocolEncoding(this._readProtocolEncoding);

                  this._readStream.readByte(); // messageType


                  this._readStream.readByte(); // compress


                  var size = this._readStream.readInt();

                  if (size < Protocol.headerSize) {
                    throw new Ice.IllegalMessageSizeException();
                  }

                  if (size > this._messageSizeMax) {
                    ExUtil.throwMemoryLimitException(size, this._messageSizeMax);
                  }

                  if (size > this._readStream.size) {
                    this._readStream.resize(size);
                  }

                  this._readStream.pos = pos;
                }

              if (this._readStream.pos != this._readStream.size) {
                if (this._endpoint.datagram()) {
                  throw new Ice.DatagramLimitException(); // The message was truncated.
                } else {
                  if (!this.read(this._readStream.buffer)) {
                    Debug.assert(!this._readStream.isEmpty());
                    this.scheduleTimeout(SocketOperation.Read);
                    return;
                  }

                  Debug.assert(this._readStream.buffer.remaining === 0);
                }
              }
            }

            if (this._state <= StateNotValidated) {
              if (this._state === StateNotInitialized && !this.initialize()) {
                return;
              }

              if (this._state <= StateNotValidated && !this.validate()) {
                return;
              }

              this._transceiver.unregister(); //
              // We start out in holding state.
              //


              this.setState(StateHolding);

              if (this._startPromise !== null) {
                ++this._dispatchCount;
              }
            } else {
              Debug.assert(this._state <= StateClosing); //
              // We parse messages first, if we receive a close
              // connection message we won't send more messages.
              //

              if ((operation & SocketOperation.Read) !== 0) {
                info = this.parseMessage();
              }

              if ((operation & SocketOperation.Write) !== 0) {
                this.sendNextMessage();
              }
            }
          } catch (ex) {
            if (ex instanceof Ice.DatagramLimitException) // Expected.
              {
                if (this._warnUdp) {
                  this._logger.warning("maximum datagram size of " + this._readStream.pos + " exceeded");
                }

                this._readStream.resize(Protocol.headerSize);

                this._readStream.pos = 0;
                this._readHeader = true;
                return;
              } else if (ex instanceof Ice.SocketException) {
              this.setState(StateClosed, ex);
              return;
            } else if (ex instanceof Ice.LocalException) {
              if (this._endpoint.datagram()) {
                if (this._warn) {
                  this._logger.warning("datagram connection exception:\n" + ex + '\n' + this._desc);
                }

                this._readStream.resize(Protocol.headerSize);

                this._readStream.pos = 0;
                this._readHeader = true;
              } else {
                this.setState(StateClosed, ex);
              }

              return;
            } else {
              throw ex;
            }
          }

          if (this._acmLastActivity > 0) {
            this._acmLastActivity = Date.now();
          }

          this.dispatch(info);

          if (this._hasMoreData.value) {
            Timer.setImmediate(function () {
              return _this87.message(SocketOperation.Read);
            }); // Don't tie up the thread.
          }
        }
      }, {
        key: "dispatch",
        value: function dispatch(info) {
          var count = 0; //
          // Notify the factory that the connection establishment and
          // validation has completed.
          //

          if (this._startPromise !== null) {
            this._startPromise.resolve();

            this._startPromise = null;
            ++count;
          }

          if (info !== null) {
            if (info.outAsync !== null) {
              info.outAsync.completed(info.stream);
              ++count;
            }

            if (info.invokeNum > 0) {
              this.invokeAll(info.stream, info.invokeNum, info.requestId, info.servantManager, info.adapter); //
              // Don't increase count, the dispatch count is
              // decreased when the incoming reply is sent.
              //
            }

            if (info.heartbeatCallback) {
              try {
                info.heartbeatCallback(this);
              } catch (ex) {
                this._logger.error("connection callback exception:\n" + ex + '\n' + this._desc);
              }

              info.heartbeatCallback = null;
              ++count;
            }
          } //
          // Decrease dispatch count.
          //


          if (count > 0) {
            this._dispatchCount -= count;

            if (this._dispatchCount === 0) {
              if (this._state === StateClosing) {
                try {
                  this.initiateShutdown();
                } catch (ex) {
                  if (ex instanceof Ice.LocalException) {
                    this.setState(StateClosed, ex);
                  } else {
                    throw ex;
                  }
                }
              } else if (this._state === StateFinished) {
                this.reap();
              }

              this.checkState();
            }
          }
        }
      }, {
        key: "finish",
        value: function finish() {
          Debug.assert(this._state === StateClosed);
          this.unscheduleTimeout(SocketOperation.Read | SocketOperation.Write | SocketOperation.Connect);

          var traceLevels = this._instance.traceLevels();

          if (!this._initialized) {
            if (traceLevels.network >= 2) {
              var s = [];
              s.push("failed to establish ");
              s.push(this._endpoint.protocol());
              s.push(" connection\n");
              s.push(this.toString());
              s.push("\n");
              s.push(this._exception.toString());

              this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
            }
          } else if (traceLevels.network >= 1) {
            var _s2 = [];

            _s2.push("closed ");

            _s2.push(this._endpoint.protocol());

            _s2.push(" connection\n");

            _s2.push(this.toString()); //
            // Trace the cause of unexpected connection closures
            //


            if (!(this._exception instanceof Ice.CloseConnectionException || this._exception instanceof Ice.ConnectionManuallyClosedException || this._exception instanceof Ice.ConnectionTimeoutException || this._exception instanceof Ice.CommunicatorDestroyedException || this._exception instanceof Ice.ObjectAdapterDeactivatedException)) {
              _s2.push("\n");

              _s2.push(this._exception.toString());
            }

            this._instance.initializationData().logger.trace(traceLevels.networkCat, _s2.join(""));
          }

          if (this._startPromise !== null) {
            this._startPromise.reject(this._exception);

            this._startPromise = null;
          }

          if (this._sendStreams.length > 0) {
            if (!this._writeStream.isEmpty()) {
              //
              // Return the stream to the outgoing call. This is important for
              // retriable AMI calls which are not marshalled again.
              //
              this._writeStream.swap(this._sendStreams[0].stream);
            } //
            // NOTE: for twoway requests which are not sent, finished can be called twice: the
            // first time because the outgoing is in the _sendStreams set and the second time
            // because it's either in the _requests/_asyncRequests set. This is fine, only the
            // first call should be taken into account by the implementation of finished.
            //


            for (var i = 0; i < this._sendStreams.length; ++i) {
              var p = this._sendStreams[i];

              if (p.requestId > 0) {
                this._asyncRequests.delete(p.requestId);
              }

              p.completed(this._exception);
            }

            this._sendStreams = [];
          }

          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = this._asyncRequests.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var value = _step5.value;
              value.completedEx(this._exception);
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          this._asyncRequests.clear();

          this.checkClose(); //
          // Don't wait to be reaped to reclaim memory allocated by read/write streams.
          //

          this._readStream.clear();

          this._readStream.buffer.clear();

          this._writeStream.clear();

          this._writeStream.buffer.clear();

          if (this._closeCallback !== null) {
            try {
              this._closeCallback(this);
            } catch (ex) {
              this._logger.error("connection callback exception:\n" + ex + '\n' + this._desc);
            }

            this._closeCallback = null;
          }

          this._heartbeatCallback = null; //
          // This must be done last as this will cause waitUntilFinished() to return (and communicator
          // objects such as the timer might be destroyed too).
          //

          if (this._dispatchCount === 0) {
            this.reap();
          }

          this.setState(StateFinished);
        }
      }, {
        key: "toString",
        value: function toString() {
          return this._desc;
        }
      }, {
        key: "timedOut",
        value: function timedOut(event) {
          if (this._state <= StateNotValidated) {
            this.setState(StateClosed, new Ice.ConnectTimeoutException());
          } else if (this._state < StateClosing) {
            this.setState(StateClosed, new Ice.TimeoutException());
          } else if (this._state === StateClosing) {
            this.setState(StateClosed, new Ice.CloseTimeoutException());
          }
        }
      }, {
        key: "type",
        value: function type() {
          return this._type;
        }
      }, {
        key: "timeout",
        value: function timeout() {
          return this._endpoint.timeout();
        }
      }, {
        key: "getInfo",
        value: function getInfo() {
          if (this._state >= StateClosed) {
            throw this._exception;
          }

          var info = this._transceiver.getInfo();

          for (var p = info; p !== null; p = p.underlying) {
            p.adapterName = this._adapter !== null ? this._adapter.getName() : "";
            p.incoming = this._incoming;
          }

          return info;
        }
      }, {
        key: "setBufferSize",
        value: function setBufferSize(rcvSize, sndSize) {
          if (this._state >= StateClosed) {
            throw this._exception;
          }

          this._transceiver.setBufferSize(rcvSize, sndSize);
        }
      }, {
        key: "exception",
        value: function exception(ex) {
          this.setState(StateClosed, ex);
        }
      }, {
        key: "invokeException",
        value: function invokeException(ex, invokeNum) {
          //
          // Fatal exception while invoking a request. Since sendResponse/sendNoResponse isn't
          // called in case of a fatal exception we decrement this._dispatchCount here.
          //
          this.setState(StateClosed, ex);

          if (invokeNum > 0) {
            Debug.assert(this._dispatchCount > 0);
            this._dispatchCount -= invokeNum;
            Debug.assert(this._dispatchCount >= 0);

            if (this._dispatchCount === 0) {
              if (this._state === StateFinished) {
                this.reap();
              }

              this.checkState();
            }
          }
        }
      }, {
        key: "setState",
        value: function setState(state, ex) {
          if (ex !== undefined) {
            Debug.assert(ex instanceof Ice.LocalException); //
            // If setState() is called with an exception, then only closed
            // and closing states are permissible.
            //

            Debug.assert(state >= StateClosing);

            if (this._state === state) // Don't switch twice.
              {
                return;
              }

            if (this._exception === null) {
              this._exception = ex; //
              // We don't warn if we are not validated.
              //

              if (this._warn && this._validated) {
                //
                // Don't warn about certain expected exceptions.
                //
                if (!(this._exception instanceof Ice.CloseConnectionException || this._exception instanceof Ice.ConnectionManuallyClosedException || this._exception instanceof Ice.ConnectionTimeoutException || this._exception instanceof Ice.CommunicatorDestroyedException || this._exception instanceof Ice.ObjectAdapterDeactivatedException || this._exception instanceof Ice.ConnectionLostException && this._state === StateClosing)) {
                  this.warning("connection exception", this._exception);
                }
              }
            } //
            // We must set the new state before we notify requests of any
            // exceptions. Otherwise new requests may retry on a
            // connection that is not yet marked as closed or closing.
            //

          } //
          // We don't want to send close connection messages if the endpoint
          // only supports oneway transmission from client to server.
          //


          if (this._endpoint.datagram() && state === StateClosing) {
            state = StateClosed;
          } //
          // Skip graceful shutdown if we are destroyed before validation.
          //


          if (this._state <= StateNotValidated && state === StateClosing) {
            state = StateClosed;
          }

          if (this._state === state) // Don't switch twice.
            {
              return;
            }

          try {
            switch (state) {
              case StateNotInitialized:
                {
                  Debug.assert(false);
                  break;
                }

              case StateNotValidated:
                {
                  if (this._state !== StateNotInitialized) {
                    Debug.assert(this._state === StateClosed);
                    return;
                  } //
                  // Register to receive validation message.
                  //


                  if (!this._endpoint.datagram() && !this._incoming) {
                    //
                    // Once validation is complete, a new connection starts out in the
                    // Holding state. We only want to register the transceiver now if we
                    // need to receive data in order to validate the connection.
                    //
                    this._transceiver.register();
                  }

                  break;
                }

              case StateActive:
                {
                  //
                  // Can only switch from holding or not validated to
                  // active.
                  //
                  if (this._state !== StateHolding && this._state !== StateNotValidated) {
                    return;
                  }

                  this._transceiver.register();

                  break;
                }

              case StateHolding:
                {
                  //
                  // Can only switch from active or not validated to
                  // holding.
                  //
                  if (this._state !== StateActive && this._state !== StateNotValidated) {
                    return;
                  }

                  if (this._state === StateActive) {
                    this._transceiver.unregister();
                  }

                  break;
                }

              case StateClosing:
                {
                  //
                  // Can't change back from closed.
                  //
                  if (this._state >= StateClosed) {
                    return;
                  }

                  if (this._state === StateHolding) {
                    // We need to continue to read in closing state.
                    this._transceiver.register();
                  }

                  break;
                }

              case StateClosed:
                {
                  if (this._state === StateFinished) {
                    return;
                  }

                  this._batchRequestQueue.destroy(this._exception);

                  this._transceiver.unregister();

                  break;
                }

              case StateFinished:
                {
                  Debug.assert(this._state === StateClosed);

                  this._transceiver.close();

                  this._communicator = null;
                  break;
                }

              default:
                {
                  Debug.assert(false);
                  break;
                }
            }
          } catch (ex) {
            if (ex instanceof Ice.LocalException) {
              this._instance.initializationData().logger.error("unexpected connection exception:\n".concat(this._desc, "\n").concat(ex.toString()));
            } else {
              throw ex;
            }
          } //
          // We only register with the connection monitor if our new state
          // is StateActive. Otherwise we unregister with the connection
          // monitor, but only if we were registered before, i.e., if our
          // old state was StateActive.
          //


          if (this._monitor !== null) {
            if (state === StateActive) {
              this._monitor.add(this);

              if (this._acmLastActivity > 0) {
                this._acmLastActivity = Date.now();
              }
            } else if (this._state === StateActive) {
              this._monitor.remove(this);
            }
          }

          this._state = state;

          if (this._state === StateClosing && this._dispatchCount === 0) {
            try {
              this.initiateShutdown();
            } catch (ex) {
              if (ex instanceof Ice.LocalException) {
                this.setState(StateClosed, ex);
              } else {
                throw ex;
              }
            }
          } else if (this._state === StateClosed) {
            this.finish();
          }

          this.checkState();
        }
      }, {
        key: "initiateShutdown",
        value: function initiateShutdown() {
          Debug.assert(this._state === StateClosing && this._dispatchCount === 0);

          if (this._shutdownInitiated) {
            return;
          }

          this._shutdownInitiated = true;

          if (!this._endpoint.datagram()) {
            //
            // Before we shut down, we send a close connection message.
            //
            var os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
            os.writeBlob(Protocol.magic);

            Protocol.currentProtocol._write(os);

            Protocol.currentProtocolEncoding._write(os);

            os.writeByte(Protocol.closeConnectionMsg);
            os.writeByte(0); // compression status: always report 0 for CloseConnection.

            os.writeInt(Protocol.headerSize); // Message size.

            if ((this.sendMessage(OutgoingMessage.createForStream(os, false)) & AsyncStatus.Sent) > 0) {
              //
              // Schedule the close timeout to wait for the peer to close the connection.
              //
              this.scheduleTimeout(SocketOperation.Read);
            }
          }
        }
      }, {
        key: "sendHeartbeatNow",
        value: function sendHeartbeatNow() {
          Debug.assert(this._state === StateActive);

          if (!this._endpoint.datagram()) {
            var os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
            os.writeBlob(Protocol.magic);

            Protocol.currentProtocol._write(os);

            Protocol.currentProtocolEncoding._write(os);

            os.writeByte(Protocol.validateConnectionMsg);
            os.writeByte(0);
            os.writeInt(Protocol.headerSize); // Message size.

            try {
              this.sendMessage(OutgoingMessage.createForStream(os, false));
            } catch (ex) {
              this.setState(StateClosed, ex);
              Debug.assert(this._exception !== null);
            }
          }
        }
      }, {
        key: "initialize",
        value: function initialize() {
          var s = this._transceiver.initialize(this._readStream.buffer, this._writeStream.buffer);

          if (s != SocketOperation.None) {
            this.scheduleTimeout(s);
            return false;
          } //
          // Update the connection description once the transceiver is initialized.
          //


          this._desc = this._transceiver.toString();
          this._initialized = true;
          this.setState(StateNotValidated);
          return true;
        }
      }, {
        key: "validate",
        value: function validate() {
          if (!this._endpoint.datagram()) // Datagram connections are always implicitly validated.
            {
              if (this._adapter !== null) // The server side has the active role for connection validation.
                {
                  if (this._writeStream.size === 0) {
                    this._writeStream.writeBlob(Protocol.magic);

                    Protocol.currentProtocol._write(this._writeStream);

                    Protocol.currentProtocolEncoding._write(this._writeStream);

                    this._writeStream.writeByte(Protocol.validateConnectionMsg);

                    this._writeStream.writeByte(0); // Compression status (always zero for validate connection).


                    this._writeStream.writeInt(Protocol.headerSize); // Message size.


                    TraceUtil.traceSend(this._writeStream, this._logger, this._traceLevels);

                    this._writeStream.prepareWrite();
                  }

                  if (this._writeStream.pos != this._writeStream.size && !this.write(this._writeStream.buffer)) {
                    this.scheduleTimeout(SocketOperation.Write);
                    return false;
                  }
                } else // The client side has the passive role for connection validation.
                {
                  if (this._readStream.size === 0) {
                    this._readStream.resize(Protocol.headerSize);

                    this._readStream.pos = 0;
                  }

                  if (this._readStream.pos !== this._readStream.size && !this.read(this._readStream.buffer)) {
                    this.scheduleTimeout(SocketOperation.Read);
                    return false;
                  }

                  Debug.assert(this._readStream.pos === Protocol.headerSize);
                  this._readStream.pos = 0;

                  var m = this._readStream.readBlob(4);

                  if (m[0] !== Protocol.magic[0] || m[1] !== Protocol.magic[1] || m[2] !== Protocol.magic[2] || m[3] !== Protocol.magic[3]) {
                    throw new Ice.BadMagicException("", m);
                  }

                  this._readProtocol._read(this._readStream);

                  Protocol.checkSupportedProtocol(this._readProtocol);

                  this._readProtocolEncoding._read(this._readStream);

                  Protocol.checkSupportedProtocolEncoding(this._readProtocolEncoding);

                  var messageType = this._readStream.readByte();

                  if (messageType !== Protocol.validateConnectionMsg) {
                    throw new Ice.ConnectionNotValidatedException();
                  }

                  this._readStream.readByte(); // Ignore compression status for validate connection.


                  if (this._readStream.readInt() !== Protocol.headerSize) {
                    throw new Ice.IllegalMessageSizeException();
                  }

                  TraceUtil.traceRecv(this._readStream, this._logger, this._traceLevels);
                  this._validated = true;
                }
            }

          this._writeStream.resize(0);

          this._writeStream.pos = 0;

          this._readStream.resize(Protocol.headerSize);

          this._readHeader = true;
          this._readStream.pos = 0;

          var traceLevels = this._instance.traceLevels();

          if (traceLevels.network >= 1) {
            var s = [];

            if (this._endpoint.datagram()) {
              s.push("starting to send ");
              s.push(this._endpoint.protocol());
              s.push(" messages\n");
              s.push(this._transceiver.toDetailedString());
            } else {
              s.push("established ");
              s.push(this._endpoint.protocol());
              s.push(" connection\n");
              s.push(this.toString());
            }

            this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
          }

          return true;
        }
      }, {
        key: "sendNextMessage",
        value: function sendNextMessage() {
          if (this._sendStreams.length === 0) {
            return;
          }

          Debug.assert(!this._writeStream.isEmpty() && this._writeStream.pos === this._writeStream.size);

          try {
            while (true) {
              //
              // Notify the message that it was sent.
              //
              var message = this._sendStreams.shift();

              this._writeStream.swap(message.stream);

              message.sent(); //
              // If there's nothing left to send, we're done.
              //

              if (this._sendStreams.length === 0) {
                break;
              } //
              // If we are in the closed state, don't continue sending.
              //
              // The connection can be in the closed state if parseMessage
              // (called before sendNextMessage by message()) closes the
              // connection.
              //


              if (this._state >= StateClosed) {
                return;
              } //
              // Otherwise, prepare the next message stream for writing.
              //


              message = this._sendStreams[0];
              Debug.assert(!message.prepared);
              var stream = message.stream;
              stream.pos = 10;
              stream.writeInt(stream.size);
              stream.prepareWrite();
              message.prepared = true;
              TraceUtil.traceSend(stream, this._logger, this._traceLevels);

              this._writeStream.swap(message.stream); //
              // Send the message.
              //


              if (this._writeStream.pos != this._writeStream.size && !this.write(this._writeStream.buffer)) {
                Debug.assert(!this._writeStream.isEmpty());
                this.scheduleTimeout(SocketOperation.Write);
                return;
              }
            }
          } catch (ex) {
            if (ex instanceof Ice.LocalException) {
              this.setState(StateClosed, ex);
              return;
            } else {
              throw ex;
            }
          }

          Debug.assert(this._writeStream.isEmpty()); //
          // If all the messages were sent and we are in the closing state, we schedule
          // the close timeout to wait for the peer to close the connection.
          //

          if (this._state === StateClosing && this._shutdownInitiated) {
            this.scheduleTimeout(SocketOperation.Read);
          }
        }
      }, {
        key: "sendMessage",
        value: function sendMessage(message) {
          if (this._sendStreams.length > 0) {
            message.doAdopt();

            this._sendStreams.push(message);

            return AsyncStatus.Queued;
          }

          Debug.assert(this._state < StateClosed);
          Debug.assert(!message.prepared);
          var stream = message.stream;
          stream.pos = 10;
          stream.writeInt(stream.size);
          stream.prepareWrite();
          message.prepared = true;
          TraceUtil.traceSend(stream, this._logger, this._traceLevels);

          if (this.write(stream.buffer)) {
            //
            // Entire buffer was written immediately.
            //
            message.sent();

            if (this._acmLastActivity > 0) {
              this._acmLastActivity = Date.now();
            }

            return AsyncStatus.Sent;
          }

          message.doAdopt();

          this._writeStream.swap(message.stream);

          this._sendStreams.push(message);

          this.scheduleTimeout(SocketOperation.Write);
          return AsyncStatus.Queued;
        }
      }, {
        key: "parseMessage",
        value: function parseMessage() {
          Debug.assert(this._state > StateNotValidated && this._state < StateClosed);
          var info = new MessageInfo(this._instance);

          this._readStream.swap(info.stream);

          this._readStream.resize(Protocol.headerSize);

          this._readStream.pos = 0;
          this._readHeader = true; //
          // Connection is validated on first message. This is only used by
          // setState() to check wether or not we can print a connection
          // warning (a client might close the connection forcefully if the
          // connection isn't validated).
          //

          this._validated = true;
          Debug.assert(info.stream.pos === info.stream.size);

          try {
            //
            // We don't need to check magic and version here. This has already
            // been done by the caller.
            //
            info.stream.pos = 8;
            var messageType = info.stream.readByte();
            var compress = info.stream.readByte();

            if (compress === 2) {
              throw new Ice.FeatureNotSupportedException("Cannot uncompress compressed message");
            }

            info.stream.pos = Protocol.headerSize;

            switch (messageType) {
              case Protocol.closeConnectionMsg:
                {
                  TraceUtil.traceRecv(info.stream, this._logger, this._traceLevels);

                  if (this._endpoint.datagram()) {
                    if (this._warn) {
                      this._logger.warning("ignoring close connection message for datagram connection:\n" + this._desc);
                    }
                  } else {
                    this.setState(StateClosed, new Ice.CloseConnectionException());
                  }

                  break;
                }

              case Protocol.requestMsg:
                {
                  if (this._state === StateClosing) {
                    TraceUtil.traceIn("received request during closing\n" + "(ignored by server, client will retry)", info.stream, this._logger, this._traceLevels);
                  } else {
                    TraceUtil.traceRecv(info.stream, this._logger, this._traceLevels);
                    info.requestId = info.stream.readInt();
                    info.invokeNum = 1;
                    info.servantManager = this._servantManager;
                    info.adapter = this._adapter;
                    ++this._dispatchCount;
                  }

                  break;
                }

              case Protocol.requestBatchMsg:
                {
                  if (this._state === StateClosing) {
                    TraceUtil.traceIn("received batch request during closing\n" + "(ignored by server, client will retry)", info.stream, this._logger, this._traceLevels);
                  } else {
                    TraceUtil.traceRecv(info.stream, this._logger, this._traceLevels);
                    info.invokeNum = info.stream.readInt();

                    if (info.invokeNum < 0) {
                      info.invokeNum = 0;
                      throw new Ice.UnmarshalOutOfBoundsException();
                    }

                    info.servantManager = this._servantManager;
                    info.adapter = this._adapter;
                    this._dispatchCount += info.invokeNum;
                  }

                  break;
                }

              case Protocol.replyMsg:
                {
                  TraceUtil.traceRecv(info.stream, this._logger, this._traceLevels);
                  info.requestId = info.stream.readInt();
                  info.outAsync = this._asyncRequests.get(info.requestId);

                  if (info.outAsync) {
                    this._asyncRequests.delete(info.requestId);

                    ++this._dispatchCount;
                  } else {
                    info = null;
                  }

                  this.checkClose();
                  break;
                }

              case Protocol.validateConnectionMsg:
                {
                  TraceUtil.traceRecv(info.stream, this._logger, this._traceLevels);

                  if (this._heartbeatCallback !== null) {
                    info.heartbeatCallback = this._heartbeatCallback;
                    ++this._dispatchCount;
                  }

                  break;
                }

              default:
                {
                  TraceUtil.traceIn("received unknown message\n(invalid, closing connection)", info.stream, this._logger, this._traceLevels);
                  throw new Ice.UnknownMessageException();
                }
            }
          } catch (ex) {
            if (ex instanceof Ice.LocalException) {
              if (this._endpoint.datagram()) {
                if (this._warn) {
                  this._logger.warning("datagram connection exception:\n" + ex + '\n' + this._desc);
                }
              } else {
                this.setState(StateClosed, ex);
              }
            } else {
              throw ex;
            }
          }

          return info;
        }
      }, {
        key: "invokeAll",
        value: function invokeAll(stream, invokeNum, requestId, servantManager, adapter) {
          try {
            while (invokeNum > 0) {
              //
              // Prepare the invocation.
              //
              var inc = new IncomingAsync(this._instance, this, adapter, !this._endpoint.datagram() && requestId !== 0, // response
              requestId); //
              // Dispatch the invocation.
              //

              inc.invoke(servantManager, stream);
              --invokeNum;
            }

            stream.clear();
          } catch (ex) {
            if (ex instanceof Ice.LocalException) {
              this.invokeException(ex, invokeNum);
            } else {
              //
              // An Error was raised outside of servant code (i.e., by Ice code).
              // Attempt to log the error and clean up.
              //
              this._logger.error("unexpected exception:\n" + ex.toString());

              this.invokeException(new Ice.UnknownException(ex), invokeNum);
            }
          }
        }
      }, {
        key: "scheduleTimeout",
        value: function scheduleTimeout(op) {
          var _this88 = this;

          var timeout;

          if (this._state < StateActive) {
            var defaultsAndOverrides = this._instance.defaultsAndOverrides();

            if (defaultsAndOverrides.overrideConnectTimeout) {
              timeout = defaultsAndOverrides.overrideConnectTimeoutValue;
            } else {
              timeout = this._endpoint.timeout();
            }
          } else if (this._state < StateClosing) {
            if (this._readHeader) // No timeout for reading the header.
              {
                op &= ~SocketOperation.Read;
              }

            timeout = this._endpoint.timeout();
          } else {
            var _defaultsAndOverrides = this._instance.defaultsAndOverrides();

            if (_defaultsAndOverrides.overrideCloseTimeout) {
              timeout = _defaultsAndOverrides.overrideCloseTimeoutValue;
            } else {
              timeout = this._endpoint.timeout();
            }
          }

          if (timeout < 0) {
            return;
          }

          if ((op & SocketOperation.Read) !== 0) {
            if (this._readTimeoutScheduled) {
              this._timer.cancel(this._readTimeoutId);
            }

            this._readTimeoutId = this._timer.schedule(function () {
              return _this88.timedOut();
            }, timeout);
            this._readTimeoutScheduled = true;
          }

          if ((op & (SocketOperation.Write | SocketOperation.Connect)) !== 0) {
            if (this._writeTimeoutScheduled) {
              this._timer.cancel(this._writeTimeoutId);
            }

            this._writeTimeoutId = this._timer.schedule(function () {
              return _this88.timedOut();
            }, timeout);
            this._writeTimeoutScheduled = true;
          }
        }
      }, {
        key: "unscheduleTimeout",
        value: function unscheduleTimeout(op) {
          if ((op & SocketOperation.Read) !== 0 && this._readTimeoutScheduled) {
            this._timer.cancel(this._readTimeoutId);

            this._readTimeoutScheduled = false;
          }

          if ((op & (SocketOperation.Write | SocketOperation.Connect)) !== 0 && this._writeTimeoutScheduled) {
            this._timer.cancel(this._writeTimeoutId);

            this._writeTimeoutScheduled = false;
          }
        }
      }, {
        key: "warning",
        value: function warning(msg, ex) {
          this._logger.warning(msg + ":\n" + this._desc + "\n" + ex.toString());
        }
      }, {
        key: "checkState",
        value: function checkState() {
          if (this._state < StateHolding || this._dispatchCount > 0) {
            return;
          } //
          // We aren't finished until the state is finished and all
          // outstanding requests are completed. Otherwise we couldn't
          // guarantee that there are no outstanding calls when deactivate()
          // is called on the servant locators.
          //


          if (this._state === StateFinished && this._finishedPromises.length > 0) {
            //
            // Clear the OA. See bug 1673 for the details of why this is necessary.
            //
            this._adapter = null;

            this._finishedPromises.forEach(function (p) {
              return p.resolve();
            });

            this._finishedPromises = [];
          }
        }
      }, {
        key: "reap",
        value: function reap() {
          if (this._monitor !== null) {
            this._monitor.reap(this);
          }
        }
      }, {
        key: "read",
        value: function read(buf) {
          var start = buf.position;

          var ret = this._transceiver.read(buf, this._hasMoreData);

          if (this._instance.traceLevels().network >= 3 && buf.position != start) {
            var s = [];
            s.push("received ");

            if (this._endpoint.datagram()) {
              s.push(buf.limit);
            } else {
              s.push(buf.position - start);
              s.push(" of ");
              s.push(buf.limit - start);
            }

            s.push(" bytes via ");
            s.push(this._endpoint.protocol());
            s.push("\n");
            s.push(this.toString());

            this._instance.initializationData().logger.trace(this._instance.traceLevels().networkCat, s.join(""));
          }

          return ret;
        }
      }, {
        key: "write",
        value: function write(buf) {
          var start = buf.position;

          var ret = this._transceiver.write(buf);

          if (this._instance.traceLevels().network >= 3 && buf.position != start) {
            var s = [];
            s.push("sent ");
            s.push(buf.position - start);

            if (!this._endpoint.datagram()) {
              s.push(" of ");
              s.push(buf.limit - start);
            }

            s.push(" bytes via ");
            s.push(this._endpoint.protocol());
            s.push("\n");
            s.push(this.toString());

            this._instance.initializationData().logger.trace(this._instance.traceLevels().networkCat, s.join(""));
          }

          return ret;
        }
      }]);

      return ConnectionI;
    }(); // DestructionReason.


    ConnectionI.ObjectAdapterDeactivated = 0;
    ConnectionI.CommunicatorDestroyed = 1;
    Ice.ConnectionI = ConnectionI;

    var OutgoingMessage =
    /*#__PURE__*/
    function () {
      function OutgoingMessage() {
        _classCallCheck(this, OutgoingMessage);

        this.stream = null;
        this.outAsync = null;
        this.requestId = 0;
        this.prepared = false;
      }

      _createClass(OutgoingMessage, [{
        key: "canceled",
        value: function canceled() {
          Debug.assert(this.outAsync !== null);
          this.outAsync = null;
        }
      }, {
        key: "doAdopt",
        value: function doAdopt() {
          if (this.adopt) {
            var stream = new OutputStream(this.stream.instance, Protocol.currentProtocolEncoding);
            stream.swap(this.stream);
            this.stream = stream;
            this.adopt = false;
          }
        }
      }, {
        key: "sent",
        value: function sent() {
          if (this.outAsync !== null) {
            this.outAsync.sent();
          }
        }
      }, {
        key: "completed",
        value: function completed(ex) {
          if (this.outAsync !== null) {
            this.outAsync.completedEx(ex);
          }
        }
      }], [{
        key: "createForStream",
        value: function createForStream(stream, adopt) {
          var m = new OutgoingMessage();
          m.stream = stream;
          m.adopt = adopt;
          m.isSent = false;
          m.requestId = 0;
          m.outAsync = null;
          return m;
        }
      }, {
        key: "create",
        value: function create(out, stream, requestId) {
          var m = new OutgoingMessage();
          m.stream = stream;
          m.outAsync = out;
          m.requestId = requestId;
          m.isSent = false;
          m.adopt = false;
          return m;
        }
      }]);

      return OutgoingMessage;
    }();
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Base64 = Ice.Base64;
    var Debug = Ice.Debug;
    var HashUtil = Ice.HashUtil;
    var StringUtil = Ice.StringUtil;
    var EndpointParseException = Ice.EndpointParseException;

    var OpaqueEndpointI =
    /*#__PURE__*/
    function (_Ice$EndpointI2) {
      _inherits(OpaqueEndpointI, _Ice$EndpointI2);

      function OpaqueEndpointI(type) {
        var _this89;

        _classCallCheck(this, OpaqueEndpointI);

        _this89 = _possibleConstructorReturn(this, _getPrototypeOf(OpaqueEndpointI).call(this));
        _this89._rawEncoding = Ice.Encoding_1_0;
        _this89._type = type === undefined ? -1 : type;
        _this89._rawBytes = null;
        return _this89;
      } //
      // Marshal the endpoint
      //


      _createClass(OpaqueEndpointI, [{
        key: "streamWrite",
        value: function streamWrite(s) {
          s.startEncapsulation(this._rawEncoding, Ice.FormatType.DefaultFormat);
          s.writeBlob(this._rawBytes);
          s.endEncapsulation();
        } //
        // Return the endpoint information.
        //

      }, {
        key: "getInfo",
        value: function getInfo() {
          return new OpaqueEndpointInfoI(null, -1, false, this._rawEncoding, this._rawBytes, this._type);
        } //
        // Return the endpoint type
        //

      }, {
        key: "type",
        value: function type() {
          return this._type;
        }
      }, {
        key: "protocol",
        value: function protocol() {
          return "opaque";
        } //
        // Return the timeout for the endpoint in milliseconds. 0 means
        // non-blocking, -1 means no timeout.
        //

      }, {
        key: "timeout",
        value: function timeout() {
          return -1;
        } //
        // Return a new endpoint with a different timeout value, provided
        // that timeouts are supported by the endpoint. Otherwise the same
        // endpoint is returned.
        //

      }, {
        key: "changeTimeout",
        value: function changeTimeout(t) {
          return this;
        } //
        // Return a new endpoint with a different connection id.
        //

      }, {
        key: "changeConnectionId",
        value: function changeConnectionId(connectionId) {
          return this;
        } //
        // Return true if the endpoints support bzip2 compress, or false
        // otherwise.
        //

      }, {
        key: "compress",
        value: function compress() {
          return false;
        } //
        // Return a new endpoint with a different compression value,
        // provided that compression is supported by the
        // endpoint. Otherwise the same endpoint is returned.
        //

      }, {
        key: "changeCompress",
        value: function changeCompress(compress) {
          return this;
        } //
        // Return true if the endpoint is datagram-based.
        //

      }, {
        key: "datagram",
        value: function datagram() {
          return false;
        } //
        // Return true if the endpoint is secure.
        //

      }, {
        key: "secure",
        value: function secure() {
          return false;
        } //
        // Get the encoded endpoint.
        //

      }, {
        key: "rawBytes",
        value: function rawBytes() {
          return this._rawBytes; // Returns a Uint8Array
        } //
        // Return a server side transceiver for this endpoint, or null if a
        // transceiver can only be created by an acceptor. In case a
        // transceiver is created, this operation also returns a new
        // "effective" endpoint, which might differ from this endpoint,
        // for example, if a dynamic port number is assigned.
        //

      }, {
        key: "transceiver",
        value: function transceiver(endpoint) {
          endpoint.value = null;
          return null;
        } //
        // Return an acceptor for this endpoint, or null if no acceptors
        // is available. In case an acceptor is created, this operation
        // also returns a new "effective" endpoint, which might differ
        // from this endpoint, for example, if a dynamic port number is
        // assigned.
        //

      }, {
        key: "acceptor",
        value: function acceptor(endpoint, adapterName) {
          endpoint.value = this;
          return null;
        }
      }, {
        key: "connect",
        value: function connect() {
          return null;
        }
      }, {
        key: "hashCode",
        value: function hashCode() {
          if (this._hashCode === undefined) {
            var h = 5381;
            h = HashUtil.addNumber(h, this._type);
            h = HashUtil.addHashable(h, this._rawEncoding);
            h = HashUtil.addArray(h, this._rawBytes, HashUtil.addNumber);
            this._hashCode = h;
          }

          return this._hashCode;
        }
      }, {
        key: "options",
        value: function options() {
          var s = "";
          s += " -t " + this._type;
          s += " -e " + Ice.encodingVersionToString(this._rawEncoding);
          s += " -v " + Base64.encode(this._rawBytes);
          return s;
        } //
        // Compare endpoints for sorting purposes
        //

      }, {
        key: "equals",
        value: function equals(p) {
          if (!(p instanceof OpaqueEndpointI)) {
            return false;
          }

          if (this === p) {
            return true;
          }

          if (this._type !== p._type) {
            return false;
          }

          if (!this._rawEncoding.equals(p._rawEncoding)) {
            return false;
          }

          if (this._rawBytes.length !== p._rawBytes.length) {
            return false;
          }

          for (var i = 0; i < this._rawBytes.length; i++) {
            if (this._rawBytes[i] !== p._rawBytes[i]) {
              return false;
            }
          }

          return true;
        }
      }, {
        key: "compareTo",
        value: function compareTo(p) {
          if (this === p) {
            return 0;
          }

          if (p === null) {
            return 1;
          }

          if (!(p instanceof OpaqueEndpointI)) {
            return this.type() < p.type() ? -1 : 1;
          }

          if (this._type < p._type) {
            return -1;
          } else if (p._type < this._type) {
            return 1;
          }

          if (this._rawEncoding.major < p._rawEncoding.major) {
            return -1;
          } else if (p._rawEncoding.major < this._rawEncoding.major) {
            return 1;
          }

          if (this._rawEncoding.minor < p._rawEncoding.minor) {
            return -1;
          } else if (p._rawEncoding.minor < this._rawEncoding.minor) {
            return 1;
          }

          if (this._rawBytes.length < p._rawBytes.length) {
            return -1;
          } else if (p._rawBytes.length < this._rawBytes.length) {
            return 1;
          }

          for (var i = 0; i < this._rawBytes.length; i++) {
            if (this._rawBytes[i] < p._rawBytes[i]) {
              return -1;
            } else if (p._rawBytes[i] < this._rawBytes[i]) {
              return 1;
            }
          }

          return 0;
        }
      }, {
        key: "checkOption",
        value: function checkOption(option, argument, endpoint) {
          switch (option.charAt(1)) {
            case 't':
              {
                if (this._type > -1) {
                  throw new EndpointParseException("multiple -t options in endpoint " + endpoint);
                }

                if (argument === null) {
                  throw new EndpointParseException("no argument provided for -t option in endpoint " + endpoint);
                }

                var type;

                try {
                  type = StringUtil.toInt(argument);
                } catch (ex) {
                  throw new EndpointParseException("invalid type value `" + argument + "' in endpoint " + endpoint);
                }

                if (type < 0 || type > 65535) {
                  throw new EndpointParseException("type value `" + argument + "' out of range in endpoint " + endpoint);
                }

                this._type = type;
                return true;
              }

            case 'v':
              {
                if (this._rawBytes) {
                  throw new EndpointParseException("multiple -v options in endpoint " + endpoint);
                }

                if (argument === null || argument.length === 0) {
                  throw new EndpointParseException("no argument provided for -v option in endpoint " + endpoint);
                }

                for (var i = 0; i < argument.length; ++i) {
                  if (!Base64.isBase64(argument.charAt(i))) {
                    throw new EndpointParseException("invalid base64 character `" + argument.charAt(i) + "' (ordinal " + argument.charCodeAt(i) + ") in endpoint " + endpoint);
                  }
                }

                this._rawBytes = Base64.decode(argument);
                return true;
              }

            case 'e':
              {
                if (argument === null) {
                  throw new EndpointParseException("no argument provided for -e option in endpoint " + endpoint);
                }

                try {
                  this._rawEncoding = Ice.stringToEncodingVersion(argument);
                } catch (e) {
                  throw new EndpointParseException("invalid encoding version `" + argument + "' in endpoint " + endpoint + ":\n" + e.str);
                }

                return true;
              }

            default:
              {
                return false;
              }
          }
        }
      }, {
        key: "initWithOptions",
        value: function initWithOptions(args) {
          _get(_getPrototypeOf(OpaqueEndpointI.prototype), "initWithOptions", this).call(this, args);

          Debug.assert(this._rawEncoding);

          if (this._type < 0) {
            throw new EndpointParseException("no -t option in endpoint `" + this + "'");
          }

          if (this._rawBytes === null || this._rawBytes.length === 0) {
            throw new EndpointParseException("no -v option in endpoint `" + this + "'");
          }
        }
      }, {
        key: "initWithStream",
        value: function initWithStream(s) {
          this._rawEncoding = s.getEncoding();
          this._rawBytes = s.readBlob(s.getEncapsulationSize());
        }
      }]);

      return OpaqueEndpointI;
    }(Ice.EndpointI);

    var OpaqueEndpointInfoI =
    /*#__PURE__*/
    function (_Ice$OpaqueEndpointIn) {
      _inherits(OpaqueEndpointInfoI, _Ice$OpaqueEndpointIn);

      function OpaqueEndpointInfoI(timeout, compress, rawEncoding, rawBytes, type) {
        var _this90;

        _classCallCheck(this, OpaqueEndpointInfoI);

        _this90 = _possibleConstructorReturn(this, _getPrototypeOf(OpaqueEndpointInfoI).call(this, -1, false, rawEncoding, rawBytes));
        _this90._type = type;
        return _this90;
      }

      _createClass(OpaqueEndpointInfoI, [{
        key: "type",
        value: function type() {
          return this._type;
        }
      }, {
        key: "datagram",
        value: function datagram() {
          return false;
        }
      }, {
        key: "secure",
        value: function secure() {
          return false;
        }
      }]);

      return OpaqueEndpointInfoI;
    }(Ice.OpaqueEndpointInfo);

    Ice.OpaqueEndpointI = OpaqueEndpointI;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Locator.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */

    /**
     * This exception is raised if an adapter cannot be found.
     *
     **/
    Ice.AdapterNotFoundException =
    /*#__PURE__*/
    function (_Ice$UserException) {
      _inherits(_class99, _Ice$UserException);

      function _class99() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class99);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class99).call(this, _cause));
      }

      _createClass(_class99, [{
        key: "_mostDerivedType",
        value: function _mostDerivedType() {
          return Ice.AdapterNotFoundException;
        }
      }], [{
        key: "_parent",
        get: function get() {
          return Ice.UserException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::AdapterNotFoundException";
        }
      }]);

      return _class99;
    }(Ice.UserException);
    /**
     * This exception is raised if the replica group provided by the
     * server is invalid.
     *
     **/


    Ice.InvalidReplicaGroupIdException =
    /*#__PURE__*/
    function (_Ice$UserException2) {
      _inherits(_class100, _Ice$UserException2);

      function _class100() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class100);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class100).call(this, _cause));
      }

      _createClass(_class100, [{
        key: "_mostDerivedType",
        value: function _mostDerivedType() {
          return Ice.InvalidReplicaGroupIdException;
        }
      }], [{
        key: "_parent",
        get: function get() {
          return Ice.UserException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::InvalidReplicaGroupIdException";
        }
      }]);

      return _class100;
    }(Ice.UserException);
    /**
     * This exception is raised if a server tries to set endpoints for
     * an adapter that is already active.
     *
     **/


    Ice.AdapterAlreadyActiveException =
    /*#__PURE__*/
    function (_Ice$UserException3) {
      _inherits(_class101, _Ice$UserException3);

      function _class101() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class101);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class101).call(this, _cause));
      }

      _createClass(_class101, [{
        key: "_mostDerivedType",
        value: function _mostDerivedType() {
          return Ice.AdapterAlreadyActiveException;
        }
      }], [{
        key: "_parent",
        get: function get() {
          return Ice.UserException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::AdapterAlreadyActiveException";
        }
      }]);

      return _class101;
    }(Ice.UserException);
    /**
     * This exception is raised if an object cannot be found.
     *
     **/


    Ice.ObjectNotFoundException =
    /*#__PURE__*/
    function (_Ice$UserException4) {
      _inherits(_class102, _Ice$UserException4);

      function _class102() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class102);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class102).call(this, _cause));
      }

      _createClass(_class102, [{
        key: "_mostDerivedType",
        value: function _mostDerivedType() {
          return Ice.ObjectNotFoundException;
        }
      }], [{
        key: "_parent",
        get: function get() {
          return Ice.UserException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ObjectNotFoundException";
        }
      }]);

      return _class102;
    }(Ice.UserException);
    /**
     * This exception is raised if a server cannot be found.
     *
     **/


    Ice.ServerNotFoundException =
    /*#__PURE__*/
    function (_Ice$UserException5) {
      _inherits(_class103, _Ice$UserException5);

      function _class103() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class103);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class103).call(this, _cause));
      }

      _createClass(_class103, [{
        key: "_mostDerivedType",
        value: function _mostDerivedType() {
          return Ice.ServerNotFoundException;
        }
      }], [{
        key: "_parent",
        get: function get() {
          return Ice.UserException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::ServerNotFoundException";
        }
      }]);

      return _class103;
    }(Ice.UserException);

    var iceC_Ice_Locator_ids = ["::Ice::Locator", "::Ice::Object"];
    /**
     * The Ice locator interface. This interface is used by clients to
     * lookup adapters and objects. It is also used by servers to get the
     * locator registry proxy.
     *
     * <p class="Note">The {@link Locator} interface is intended to be used by
     * Ice internals and by locator implementations. Regular user code
     * should not attempt to use any functionality of this interface
     * directly.
     *
     **/

    Ice.Locator =
    /*#__PURE__*/
    function (_Ice$Object4) {
      _inherits(_class104, _Ice$Object4);

      function _class104() {
        _classCallCheck(this, _class104);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class104).apply(this, arguments));
      }

      return _class104;
    }(Ice.Object);

    Ice.LocatorPrx =
    /*#__PURE__*/
    function (_Ice$ObjectPrx4) {
      _inherits(_class105, _Ice$ObjectPrx4);

      function _class105() {
        _classCallCheck(this, _class105);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class105).apply(this, arguments));
      }

      return _class105;
    }(Ice.ObjectPrx);

    Slice.defineOperations(Ice.Locator, Ice.LocatorPrx, iceC_Ice_Locator_ids, 0, {
      "findObjectById": [, 2, 1,, [9], [[Ice.Identity]],, [Ice.ObjectNotFoundException],,],
      "findAdapterById": [, 2, 1,, [9], [[7]],, [Ice.AdapterNotFoundException],,],
      "getRegistry": [, 2, 1,, ["Ice.LocatorRegistryPrx"],,,,,]
    });
    var iceC_Ice_LocatorRegistry_ids = ["::Ice::LocatorRegistry", "::Ice::Object"];
    /**
     * The Ice locator registry interface. This interface is used by
     * servers to register adapter endpoints with the locator.
     *
     * <p class="Note"> The {@link LocatorRegistry} interface is intended to be used
     * by Ice internals and by locator implementations. Regular user
     * code should not attempt to use any functionality of this interface
     * directly.
     *
     **/

    Ice.LocatorRegistry =
    /*#__PURE__*/
    function (_Ice$Object5) {
      _inherits(_class106, _Ice$Object5);

      function _class106() {
        _classCallCheck(this, _class106);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class106).apply(this, arguments));
      }

      return _class106;
    }(Ice.Object);

    Ice.LocatorRegistryPrx =
    /*#__PURE__*/
    function (_Ice$ObjectPrx5) {
      _inherits(_class107, _Ice$ObjectPrx5);

      function _class107() {
        _classCallCheck(this, _class107);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class107).apply(this, arguments));
      }

      return _class107;
    }(Ice.ObjectPrx);

    Slice.defineOperations(Ice.LocatorRegistry, Ice.LocatorRegistryPrx, iceC_Ice_LocatorRegistry_ids, 0, {
      "setAdapterDirectProxy": [, 2, 2,,, [[7], [9]],, [Ice.AdapterAlreadyActiveException, Ice.AdapterNotFoundException],,],
      "setReplicatedAdapterDirectProxy": [, 2, 2,,, [[7], [7], [9]],, [Ice.AdapterAlreadyActiveException, Ice.AdapterNotFoundException, Ice.InvalidReplicaGroupIdException],,],
      "setServerProcessProxy": [, 2, 2,,, [[7], ["Ice.ProcessPrx"]],, [Ice.ServerNotFoundException],,]
    });
    var iceC_Ice_LocatorFinder_ids = ["::Ice::LocatorFinder", "::Ice::Object"];
    /**
     * This inferface should be implemented by services implementing the
     * Ice::Locator interface. It should be advertised through an Ice
     * object with the identity `Ice/LocatorFinder'. This allows clients
     * to retrieve the locator proxy with just the endpoint information of
     * the service.
     *
     **/

    Ice.LocatorFinder =
    /*#__PURE__*/
    function (_Ice$Object6) {
      _inherits(_class108, _Ice$Object6);

      function _class108() {
        _classCallCheck(this, _class108);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class108).apply(this, arguments));
      }

      return _class108;
    }(Ice.Object);

    Ice.LocatorFinderPrx =
    /*#__PURE__*/
    function (_Ice$ObjectPrx6) {
      _inherits(_class109, _Ice$ObjectPrx6);

      function _class109() {
        _classCallCheck(this, _class109);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class109).apply(this, arguments));
      }

      return _class109;
    }(Ice.ObjectPrx);

    Slice.defineOperations(Ice.LocatorFinder, Ice.LocatorFinderPrx, iceC_Ice_LocatorFinder_ids, 0, {
      "getLocator": [,,,, ["Ice.LocatorPrx"],,,,,]
    });
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var AlreadyRegisteredException = Ice.AlreadyRegisteredException; //
    // Only for use by Instance
    //

    var ValueFactoryManagerI =
    /*#__PURE__*/
    function () {
      function ValueFactoryManagerI() {
        _classCallCheck(this, ValueFactoryManagerI);

        this._factoryMap = new Map(); // Map<String, ValueFactory>
      }

      _createClass(ValueFactoryManagerI, [{
        key: "add",
        value: function add(factory, id) {
          if (this._factoryMap.has(id)) {
            throw new AlreadyRegisteredException("value factory", id);
          }

          this._factoryMap.set(id, factory);
        }
      }, {
        key: "find",
        value: function find(id) {
          return this._factoryMap.get(id);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._factoryMap = new Map(); // Map<String, ValueFactory>
        }
      }]);

      return ValueFactoryManagerI;
    }();

    Ice.ValueFactoryManagerI = ValueFactoryManagerI;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ConnectionInfo.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */

    /**
     * Provides access to the connection details of an SSL connection
     *
     **/
    IceSSL.ConnectionInfo =
    /*#__PURE__*/
    function (_Ice$ConnectionInfo3) {
      _inherits(_class110, _Ice$ConnectionInfo3);

      function _class110(underlying, incoming, adapterName, connectionId) {
        var _this91;

        var cipher = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
        var certs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
        var verified = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

        _classCallCheck(this, _class110);

        _this91 = _possibleConstructorReturn(this, _getPrototypeOf(_class110).call(this, underlying, incoming, adapterName, connectionId));
        _this91.cipher = cipher;
        _this91.certs = certs;
        _this91.verified = verified;
        return _this91;
      }

      return _class110;
    }(Ice.ConnectionInfo);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `FacetMap.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
    Slice.defineDictionary(Ice, "FacetMap", "FacetMapHelper", "Ice.StringHelper", "Ice.ObjectHelper", false, undefined, "Ice.Value");
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var IceSSL = Ice._ModuleRegistry.module("IceSSL"); //
    // With Chrome we don't want to close the socket while connection is in progress,
    // see comments on close implementation below.
    //
    // We need to check for Edge browser as it might include Chrome in its user agent.
    //


    var IsChrome = navigator.userAgent.indexOf("Edge/") === -1 && navigator.userAgent.indexOf("Chrome/") !== -1;
    var IsSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent);
    var Debug = Ice.Debug;
    var SocketOperation = Ice.SocketOperation;
    var Timer = Ice.Timer;
    var StateNeedConnect = 0;
    var StateConnectPending = 1;
    var StateConnected = 2;
    var StateClosePending = 3;
    var StateClosed = 4;

    var WSTransceiver =
    /*#__PURE__*/
    function () {
      function WSTransceiver(instance) {
        _classCallCheck(this, WSTransceiver);

        this._readBuffers = [];
        this._readPosition = 0;
        this._maxSendPacketSize = instance.properties().getPropertyAsIntWithDefault("Ice.TCP.SndSize", 512 * 1024);
        this._writeReadyTimeout = 0;
      }

      _createClass(WSTransceiver, [{
        key: "writeReadyTimeout",
        value: function writeReadyTimeout() {
          var t = Math.round(this._writeReadyTimeout);
          this._writeReadyTimeout += this._writeReadyTimeout >= 5 ? 5 : 0.2;
          return Math.min(t, 25);
        }
      }, {
        key: "setCallbacks",
        value: function setCallbacks(connectedCallback, bytesAvailableCallback, bytesWrittenCallback) {
          this._connectedCallback = connectedCallback;
          this._bytesAvailableCallback = bytesAvailableCallback;
          this._bytesWrittenCallback = bytesWrittenCallback;
        } //
        // Returns SocketOperation.None when initialization is complete.
        //

      }, {
        key: "initialize",
        value: function initialize(readBuffer, writeBuffer) {
          var _this92 = this;

          try {
            if (this._exception) {
              throw this._exception;
            }

            if (this._state === StateNeedConnect) {
              this._state = StateConnectPending;
              this._fd = new WebSocket(this._url, "ice.zeroc.com");
              this._fd.binaryType = "arraybuffer";

              this._fd.onopen = function (e) {
                return _this92.socketConnected(e);
              };

              this._fd.onmessage = function (e) {
                return _this92.socketBytesAvailable(e.data);
              };

              this._fd.onclose = function (e) {
                return _this92.socketClosed(e);
              };

              return SocketOperation.Connect; // Waiting for connect to complete.
            } else if (this._state === StateConnectPending) {
              //
              // Socket is connected.
              //
              this._desc = fdToString(this._addr);
              this._state = StateConnected;
            }
          } catch (err) {
            if (!this._exception) {
              this._exception = translateError(this._state, err);
            }

            throw this._exception;
          }

          Debug.assert(this._state === StateConnected);
          return SocketOperation.None;
        }
      }, {
        key: "register",
        value: function register() {
          var _this93 = this;

          //
          // Register the socket data listener.
          //
          this._registered = true;

          if (this._hasBytesAvailable || this._exception) {
            this._hasBytesAvailable = false;
            Timer.setTimeout(function () {
              return _this93._bytesAvailableCallback();
            }, 0);
          }
        }
      }, {
        key: "unregister",
        value: function unregister() {
          //
          // Unregister the socket data listener.
          //
          this._registered = false;
        }
      }, {
        key: "close",
        value: function close() {
          if (this._fd === null) {
            Debug.assert(this._exception); // Websocket creation failed.

            return;
          } //
          // With Chrome (in particular on macOS) calling close() while the websocket isn't
          // connected yet doesn't abort the connection attempt, and might result in the
          // connection being reused by a different web socket.
          //
          // To workaround this problem, we always wait for the socket to be connected or
          // closed before closing the socket.
          //
          // NOTE: when this workaround is no longer necessary, don't forget removing the
          // StateClosePending state.
          //


          if ((IsChrome || IsSafari) && this._fd.readyState === WebSocket.CONNECTING) {
            this._state = StateClosePending;
            return;
          }

          Debug.assert(this._fd !== null);

          try {
            this._state = StateClosed;

            this._fd.close();
          } catch (ex) {
            throw translateError(this._state, ex);
          } finally {
            this._fd = null;
          }
        } //
        // Returns true if all of the data was flushed to the kernel buffer.
        //

      }, {
        key: "write",
        value: function write(byteBuffer) {
          var _this94 = this;

          if (this._exception) {
            throw this._exception;
          } else if (byteBuffer.remaining === 0) {
            return true;
          }

          Debug.assert(this._fd);

          var cb = function cb() {
            if (_this94._fd) {
              var packetSize = _this94._maxSendPacketSize > 0 && byteBuffer.remaining > _this94._maxSendPacketSize ? _this94._maxSendPacketSize : byteBuffer.remaining;

              if (_this94._fd.bufferedAmount + packetSize <= _this94._maxSendPacketSize) {
                _this94._bytesWrittenCallback(0, 0);
              } else {
                Timer.setTimeout(cb, _this94.writeReadyTimeout());
              }
            }
          };

          while (true) {
            var packetSize = this._maxSendPacketSize > 0 && byteBuffer.remaining > this._maxSendPacketSize ? this._maxSendPacketSize : byteBuffer.remaining;

            if (byteBuffer.remaining === 0) {
              break;
            }

            Debug.assert(packetSize > 0);

            if (this._fd.bufferedAmount + packetSize > this._maxSendPacketSize) {
              Timer.setTimeout(cb, this.writeReadyTimeout());
              return false;
            }

            this._writeReadyTimeout = 0;
            var slice = byteBuffer.b.slice(byteBuffer.position, byteBuffer.position + packetSize);

            this._fd.send(slice);

            byteBuffer.position += packetSize; //
            // TODO: WORKAROUND for Safari issue. The websocket accepts all the
            // data (bufferedAmount is always 0). We relinquish the control here
            // to ensure timeouts work properly.
            //

            if (IsSafari && byteBuffer.remaining > 0) {
              Timer.setTimeout(cb, this.writeReadyTimeout());
              return false;
            }
          }

          return true;
        }
      }, {
        key: "read",
        value: function read(byteBuffer, moreData) {
          if (this._exception) {
            throw this._exception;
          }

          moreData.value = false;

          if (this._readBuffers.length === 0) {
            return false; // No data available.
          }

          var avail = this._readBuffers[0].byteLength - this._readPosition;
          Debug.assert(avail > 0);

          while (byteBuffer.remaining > 0) {
            if (avail > byteBuffer.remaining) {
              avail = byteBuffer.remaining;
            }

            new Uint8Array(byteBuffer.b).set(new Uint8Array(this._readBuffers[0], this._readPosition, avail), byteBuffer.position);
            byteBuffer.position += avail;
            this._readPosition += avail;

            if (this._readPosition === this._readBuffers[0].byteLength) {
              //
              // We've exhausted the current read buffer.
              //
              this._readPosition = 0;

              this._readBuffers.shift();

              if (this._readBuffers.length === 0) {
                break; // No more data - we're done.
              } else {
                avail = this._readBuffers[0].byteLength;
              }
            }
          }

          moreData.value = this._readBuffers.byteLength > 0;
          return byteBuffer.remaining === 0;
        }
      }, {
        key: "type",
        value: function type() {
          return this._secure ? "wss" : "ws";
        }
      }, {
        key: "getInfo",
        value: function getInfo() {
          Debug.assert(this._fd !== null);
          var info = new Ice.WSConnectionInfo();
          var tcpinfo = new Ice.TCPConnectionInfo();
          tcpinfo.localAddress = "";
          tcpinfo.localPort = -1;
          tcpinfo.remoteAddress = this._addr.host;
          tcpinfo.remotePort = this._addr.port;
          info.underlying = this._secure ? new IceSSL.ConnectionInfo(tcpinfo, tcpinfo.timeout, tcpinfo.compress) : tcpinfo;
          info.rcvSize = -1;
          info.sndSize = this._maxSendPacketSize;
          info.headers = {};
          return info;
        }
      }, {
        key: "checkSendSize",
        value: function checkSendSize(stream) {}
      }, {
        key: "setBufferSize",
        value: function setBufferSize(rcvSize, sndSize) {
          this._maxSendPacketSize = sndSize;
        }
      }, {
        key: "toString",
        value: function toString() {
          return this._desc;
        }
      }, {
        key: "socketConnected",
        value: function socketConnected(e) {
          if (this._state == StateClosePending) {
            this.close();
            return;
          }

          Debug.assert(this._connectedCallback !== null);

          this._connectedCallback();
        }
      }, {
        key: "socketBytesAvailable",
        value: function socketBytesAvailable(buf) {
          Debug.assert(this._bytesAvailableCallback !== null);

          if (buf.byteLength > 0) {
            this._readBuffers.push(buf);

            if (this._registered) {
              this._bytesAvailableCallback();
            } else if (!this._hasBytesAvailable) {
              this._hasBytesAvailable = true;
            }
          }
        }
      }, {
        key: "socketClosed",
        value: function socketClosed(err) {
          if (this._state == StateClosePending) {
            this.close();
            return;
          }

          this._exception = translateError(this._state, err);

          if (this._state < StateConnected) {
            this._connectedCallback();
          } else if (this._registered) {
            this._bytesAvailableCallback();
          }
        }
      }], [{
        key: "createOutgoing",
        value: function createOutgoing(instance, secure, addr, resource) {
          var transceiver = new WSTransceiver(instance);
          var url = secure ? "wss" : "ws";
          url += "://" + addr.host;

          if (addr.port !== 80) {
            url += ":" + addr.port;
          }

          url += resource ? resource : "/";
          transceiver._url = url;
          transceiver._fd = null;
          transceiver._addr = addr;
          transceiver._desc = "local address = <not available>\nremote address = " + addr.host + ":" + addr.port;
          transceiver._state = StateNeedConnect;
          transceiver._secure = secure;
          transceiver._exception = null;
          return transceiver;
        }
      }]);

      return WSTransceiver;
    }();

    function fdToString(address) {
      return "local address = <not available>\nremote address = " + address.host + ":" + address.port;
    }

    function translateError(state, err) {
      if (state < StateConnected) {
        return new Ice.ConnectFailedException(err.code, err);
      } else {
        if (err.code === 1000 || err.code === 1006) // CLOSE_NORMAL | CLOSE_ABNORMAL
          {
            return new Ice.ConnectionLostException();
          }

        return new Ice.SocketException(err.code, err);
      }
    }

    Ice.WSTransceiver = WSTransceiver;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var AsyncResultBase = Ice.AsyncResultBase;
    var ConnectionI = Ice.ConnectionI;
    var Debug = Ice.Debug;
    var HashMap = Ice.HashMap;
    var FactoryACMMonitor = Ice.FactoryACMMonitor; //
    // Only for use by Instance.
    //

    var OutgoingConnectionFactory =
    /*#__PURE__*/
    function () {
      function OutgoingConnectionFactory(communicator, instance) {
        _classCallCheck(this, OutgoingConnectionFactory);

        this._communicator = communicator;
        this._instance = instance;
        this._destroyed = false;
        this._monitor = new FactoryACMMonitor(this._instance, this._instance.clientACM());
        this._connectionsByEndpoint = new ConnectionListMap(); // map<EndpointI, Array<Ice.ConnectionI>>

        this._pending = new HashMap(HashMap.compareEquals); // map<EndpointI, Array<ConnectCallback>>

        this._pendingConnectCount = 0;
        this._waitPromise = null;
      }

      _createClass(OutgoingConnectionFactory, [{
        key: "destroy",
        value: function destroy() {
          if (this._destroyed) {
            return;
          }

          this._connectionsByEndpoint.forEach(function (connection) {
            return connection.destroy(ConnectionI.CommunicatorDestroyed);
          });

          this._destroyed = true;
          this._communicator = null;
          this.checkFinished();
        }
      }, {
        key: "waitUntilFinished",
        value: function waitUntilFinished() {
          this._waitPromise = new Ice.Promise();
          this.checkFinished();
          return this._waitPromise;
        } //
        // Returns a promise, success callback receives the connection
        //

      }, {
        key: "create",
        value: function create(endpts, hasMore, selType) {
          Debug.assert(endpts.length > 0); //
          // Apply the overrides.
          //

          var endpoints = this.applyOverrides(endpts); //
          // Try to find a connection to one of the given endpoints.
          //

          try {
            var connection = this.findConnectionByEndpoint(endpoints);

            if (connection !== null) {
              return Ice.Promise.resolve(connection);
            }
          } catch (ex) {
            return Ice.Promise.reject(ex);
          }

          return new ConnectCallback(this, endpoints, hasMore, selType).start();
        }
      }, {
        key: "setRouterInfo",
        value: function setRouterInfo(routerInfo) {
          var _this95 = this;

          return Ice.Promise.try(function () {
            if (_this95._destroyed) {
              throw new Ice.CommunicatorDestroyedException();
            }

            return routerInfo.getClientEndpoints();
          }).then(function (endpoints) {
            //
            // Search for connections to the router's client proxy
            // endpoints, and update the object adapter for such
            // connections, so that callbacks from the router can be
            // received over such connections.
            //
            var adapter = routerInfo.getAdapter();

            var defaultsAndOverrides = _this95._instance.defaultsAndOverrides();

            endpoints.forEach(function (endpoint) {
              //
              // Modify endpoints with overrides.
              //
              if (defaultsAndOverrides.overrideTimeout) {
                endpoint = endpoint.changeTimeout(defaultsAndOverrides.overrideTimeoutValue);
              } //
              // The Connection object does not take the compression flag of
              // endpoints into account, but instead gets the information
              // about whether messages should be compressed or not from
              // other sources. In order to allow connection sharing for
              // endpoints that differ in the value of the compression flag
              // only, we always set the compression flag to false here in
              // this connection factory.
              //


              endpoint = endpoint.changeCompress(false);

              _this95._connectionsByEndpoint.forEach(function (connection) {
                if (connection.endpoint().equals(endpoint)) {
                  connection.setAdapter(adapter);
                }
              });
            });
          });
        }
      }, {
        key: "removeAdapter",
        value: function removeAdapter(adapter) {
          if (this._destroyed) {
            return;
          }

          this._connectionsByEndpoint.forEach(function (connection) {
            if (connection.getAdapter() === adapter) {
              connection.setAdapter(null);
            }
          });
        }
      }, {
        key: "flushAsyncBatchRequests",
        value: function flushAsyncBatchRequests() {
          var promise = new AsyncResultBase(this._communicator, "flushBatchRequests", null, null, null);

          if (this._destroyed) {
            promise.resolve();
            return promise;
          }

          Ice.Promise.all(this._connectionsByEndpoint.map(function (connection) {
            if (connection.isActiveOrHolding()) {
              return connection.flushBatchRequests().catch(function (ex) {
                if (ex instanceof Ice.LocalException) {// Ignore
                } else {
                  throw ex;
                }
              });
            }
          })).then(promise.resolve, promise.reject);
          return promise;
        }
      }, {
        key: "applyOverrides",
        value: function applyOverrides(endpts) {
          var defaultsAndOverrides = this._instance.defaultsAndOverrides();

          return endpts.map(function (endpoint) {
            if (defaultsAndOverrides.overrideTimeout) {
              return endpoint.changeTimeout(defaultsAndOverrides.overrideTimeoutValue);
            } else {
              return endpoint;
            }
          });
        }
      }, {
        key: "findConnectionByEndpoint",
        value: function findConnectionByEndpoint(endpoints) {
          if (this._destroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(endpoints.length > 0);

          for (var i = 0; i < endpoints.length; ++i) {
            var endpoint = endpoints[i];

            if (this._pending.has(endpoint)) {
              continue;
            }

            var connectionList = this._connectionsByEndpoint.get(endpoint);

            if (connectionList === undefined) {
              continue;
            }

            for (var j = 0; j < connectionList.length; ++j) {
              if (connectionList[j].isActiveOrHolding()) // Don't return destroyed or un-validated connections
                {
                  return connectionList[j];
                }
            }
          }

          return null;
        }
      }, {
        key: "incPendingConnectCount",
        value: function incPendingConnectCount() {
          //
          // Keep track of the number of pending connects. The outgoing connection factory
          // waitUntilFinished() method waits for all the pending connects to terminate before
          // to return. This ensures that the communicator client thread pool isn't destroyed
          // too soon and will still be available to execute the ice_exception() callbacks for
          // the asynchronous requests waiting on a connection to be established.
          //
          if (this._destroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          ++this._pendingConnectCount;
        }
      }, {
        key: "decPendingConnectCount",
        value: function decPendingConnectCount() {
          --this._pendingConnectCount;
          Debug.assert(this._pendingConnectCount >= 0);

          if (this._destroyed && this._pendingConnectCount === 0) {
            this.checkFinished();
          }
        }
      }, {
        key: "getConnection",
        value: function getConnection(endpoints, cb) {
          var _this96 = this;

          if (this._destroyed) {
            throw new Ice.CommunicatorDestroyedException();
          } //
          // Reap closed connections
          //


          var cons = this._monitor.swapReapedConnections();

          if (cons !== null) {
            cons.forEach(function (c) {
              _this96._connectionsByEndpoint.removeConnection(c.endpoint(), c);

              _this96._connectionsByEndpoint.removeConnection(c.endpoint().changeCompress(true), c);
            });
          } //
          // Try to get the connection.
          //


          while (true) {
            if (this._destroyed) {
              throw new Ice.CommunicatorDestroyedException();
            } //
            // Search for a matching connection. If we find one, we're done.
            //


            var connection = this.findConnectionByEndpoint(endpoints);

            if (connection !== null) {
              return connection;
            }

            if (this.addToPending(cb, endpoints)) {
              //
              // A connection is already pending.
              //
              return null;
            } else {
              //
              // No connection is currently pending to one of our endpoints, so we
              // get out of this loop and start the connection establishment to one of the
              // given endpoints.
              //
              break;
            }
          } //
          // At this point, we're responsible for establishing the connection to one of
          // the given endpoints. If it's a non-blocking connect, calling nextEndpoint
          // will start the connection establishment. Otherwise, we return null to get
          // the caller to establish the connection.
          //


          cb.nextEndpoint();
          return null;
        }
      }, {
        key: "createConnection",
        value: function createConnection(transceiver, endpoint) {
          Debug.assert(this._pending.has(endpoint) && transceiver !== null); //
          // Create and add the connection to the connection map. Adding the connection to the map
          // is necessary to support the interruption of the connection initialization and validation
          // in case the communicator is destroyed.
          //

          var connection = null;

          try {
            if (this._destroyed) {
              throw new Ice.CommunicatorDestroyedException();
            }

            connection = new ConnectionI(this._communicator, this._instance, this._monitor, transceiver, endpoint.changeCompress(false), false, null);
          } catch (ex) {
            if (ex instanceof Ice.LocalException) {
              try {
                transceiver.close();
              } catch (exc) {// Ignore
              }
            }

            throw ex;
          }

          this._connectionsByEndpoint.set(connection.endpoint(), connection);

          this._connectionsByEndpoint.set(connection.endpoint().changeCompress(true), connection);

          return connection;
        }
      }, {
        key: "finishGetConnection",
        value: function finishGetConnection(endpoints, endpoint, connection, cb) {
          var _this97 = this;

          // cb is-a ConnectCallback
          var connectionCallbacks = [];

          if (cb !== null) {
            connectionCallbacks.push(cb);
          }

          var callbacks = [];
          endpoints.forEach(function (endpt) {
            var cbs = _this97._pending.get(endpt);

            if (cbs !== undefined) {
              _this97._pending.delete(endpt);

              cbs.forEach(function (cc) {
                if (cc.hasEndpoint(endpoint)) {
                  if (connectionCallbacks.indexOf(cc) === -1) {
                    connectionCallbacks.push(cc);
                  }
                } else if (callbacks.indexOf(cc) === -1) {
                  callbacks.push(cc);
                }
              });
            }
          });
          connectionCallbacks.forEach(function (cc) {
            cc.removeFromPending();
            var idx = callbacks.indexOf(cc);

            if (idx !== -1) {
              callbacks.splice(idx, 1);
            }
          });
          callbacks.forEach(function (cc) {
            return cc.removeFromPending();
          });
          callbacks.forEach(function (cc) {
            return cc.getConnection();
          });
          connectionCallbacks.forEach(function (cc) {
            return cc.setConnection(connection);
          });
          this.checkFinished();
        }
      }, {
        key: "finishGetConnectionEx",
        value: function finishGetConnectionEx(endpoints, ex, cb) {
          var _this98 = this;

          // cb is-a ConnectCallback
          var failedCallbacks = [];

          if (cb !== null) {
            failedCallbacks.push(cb);
          }

          var callbacks = [];
          endpoints.forEach(function (endpt) {
            var cbs = _this98._pending.get(endpt);

            if (cbs !== undefined) {
              _this98._pending.delete(endpt);

              cbs.forEach(function (cc) {
                if (cc.removeEndpoints(endpoints)) {
                  if (failedCallbacks.indexOf(cc) === -1) {
                    failedCallbacks.push(cc);
                  }
                } else if (callbacks.indexOf(cc) === -1) {
                  callbacks.push(cc);
                }
              });
            }
          });
          callbacks.forEach(function (cc) {
            Debug.assert(failedCallbacks.indexOf(cc) === -1);
            cc.removeFromPending();
          });
          this.checkFinished();
          callbacks.forEach(function (cc) {
            return cc.getConnection();
          });
          failedCallbacks.forEach(function (cc) {
            return cc.setException(ex);
          });
        }
      }, {
        key: "addToPending",
        value: function addToPending(cb, endpoints) {
          var _this99 = this;

          // cb is-a ConnectCallback
          //
          // Add the callback to each pending list.
          //
          var found = false;

          if (cb !== null) {
            endpoints.forEach(function (p) {
              var cbs = _this99._pending.get(p);

              if (cbs !== undefined) {
                found = true;

                if (cbs.indexOf(cb) === -1) {
                  cbs.push(cb); // Add the callback to each pending endpoint.
                }
              }
            });
          }

          if (found) {
            return true;
          } //
          // If there's no pending connection for the given endpoints, we're
          // responsible for its establishment. We add empty pending lists,
          // other callbacks to the same endpoints will be queued.
          //


          endpoints.forEach(function (p) {
            if (!_this99._pending.has(p)) {
              _this99._pending.set(p, []);
            }
          });
          return false;
        }
      }, {
        key: "removeFromPending",
        value: function removeFromPending(cb, endpoints) {
          var _this100 = this;

          // cb is-a ConnectCallback
          endpoints.forEach(function (p) {
            var cbs = _this100._pending.get(p);

            if (cbs !== undefined) {
              var idx = cbs.indexOf(cb);

              if (idx !== -1) {
                cbs.splice(idx, 1);
              }
            }
          });
        }
      }, {
        key: "handleConnectionException",
        value: function handleConnectionException(ex, hasMore) {
          var traceLevels = this._instance.traceLevels();

          if (traceLevels.network >= 2) {
            var s = [];
            s.push("connection to endpoint failed");

            if (ex instanceof Ice.CommunicatorDestroyedException) {
              s.push("\n");
            } else if (hasMore) {
              s.push(", trying next endpoint\n");
            } else {
              s.push(" and no more endpoints to try\n");
            }

            s.push(ex.toString());

            this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
          }
        }
      }, {
        key: "handleException",
        value: function handleException(ex, hasMore) {
          var traceLevels = this._instance.traceLevels();

          if (traceLevels.network >= 2) {
            var s = [];
            s.push("couldn't resolve endpoint host");

            if (ex instanceof Ice.CommunicatorDestroyedException) {
              s.push("\n");
            } else if (hasMore) {
              s.push(", trying next endpoint\n");
            } else {
              s.push(" and no more endpoints to try\n");
            }

            s.push(ex.toString());

            this._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
          }
        }
      }, {
        key: "checkFinished",
        value: function checkFinished() {
          var _this101 = this;

          //
          // Can't continue until the factory is destroyed and there are no pending connections.
          //
          if (!this._waitPromise || !this._destroyed || this._pending.size > 0 || this._pendingConnectCount > 0) {
            return;
          }

          Ice.Promise.all(this._connectionsByEndpoint.map(function (connection) {
            return connection.waitUntilFinished().catch(function (ex) {
              return Debug.assert(false);
            });
          })).then(function () {
            var cons = _this101._monitor.swapReapedConnections();

            if (cons !== null) {
              var arr = [];

              _this101._connectionsByEndpoint.forEach(function (connection) {
                if (arr.indexOf(connection) === -1) {
                  arr.push(connection);
                }
              });

              Debug.assert(cons.length === arr.length);

              _this101._connectionsByEndpoint.clear();
            } else {
              Debug.assert(_this101._connectionsByEndpoint.size === 0);
            }

            Debug.assert(_this101._waitPromise !== null);

            _this101._waitPromise.resolve();

            _this101._monitor.destroy();
          });
        }
      }]);

      return OutgoingConnectionFactory;
    }();

    Ice.OutgoingConnectionFactory = OutgoingConnectionFactory; //
    // Value is a Vector<Ice.ConnectionI>
    //

    var ConnectionListMap =
    /*#__PURE__*/
    function (_HashMap) {
      _inherits(ConnectionListMap, _HashMap);

      function ConnectionListMap(h) {
        _classCallCheck(this, ConnectionListMap);

        return _possibleConstructorReturn(this, _getPrototypeOf(ConnectionListMap).call(this, h || HashMap.compareEquals));
      }

      _createClass(ConnectionListMap, [{
        key: "set",
        value: function set(key, value) {
          var list = this.get(key);

          if (list === undefined) {
            list = [];

            _get(_getPrototypeOf(ConnectionListMap.prototype), "set", this).call(this, key, list);
          }

          Debug.assert(value instanceof ConnectionI);
          list.push(value);
          return undefined;
        }
      }, {
        key: "removeConnection",
        value: function removeConnection(key, conn) {
          var list = this.get(key);
          Debug.assert(list !== null);
          var idx = list.indexOf(conn);
          Debug.assert(idx !== -1);
          list.splice(idx, 1);

          if (list.length === 0) {
            this.delete(key);
          }
        }
      }, {
        key: "map",
        value: function map(fn) {
          var arr = [];
          this.forEach(function (c) {
            return arr.push(fn(c));
          });
          return arr;
        }
      }, {
        key: "forEach",
        value: function forEach(fn) {
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = this.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var connections = _step6.value;
              connections.forEach(fn);
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        }
      }]);

      return ConnectionListMap;
    }(HashMap);

    var ConnectCallback =
    /*#__PURE__*/
    function () {
      function ConnectCallback(f, endpoints, more, selType) {
        _classCallCheck(this, ConnectCallback);

        this._factory = f;
        this._endpoints = endpoints;
        this._hasMore = more;
        this._selType = selType;
        this._promise = new Ice.Promise();
        this._index = 0;
        this._current = null;
      } //
      // Methods from ConnectionI_StartCallback
      //


      _createClass(ConnectCallback, [{
        key: "connectionStartCompleted",
        value: function connectionStartCompleted(connection) {
          connection.activate();

          this._factory.finishGetConnection(this._endpoints, this._current, connection, this);
        }
      }, {
        key: "connectionStartFailed",
        value: function connectionStartFailed(connection, ex) {
          Debug.assert(this._current !== null);

          if (this.connectionStartFailedImpl(ex)) {
            this.nextEndpoint();
          }
        }
      }, {
        key: "setConnection",
        value: function setConnection(connection) {
          //
          // Callback from the factory: the connection to one of the callback
          // connectors has been established.
          //
          this._promise.resolve(connection);

          this._factory.decPendingConnectCount(); // Must be called last.

        }
      }, {
        key: "setException",
        value: function setException(ex) {
          //
          // Callback from the factory: connection establishment failed.
          //
          this._promise.reject(ex);

          this._factory.decPendingConnectCount(); // Must be called last.

        }
      }, {
        key: "hasEndpoint",
        value: function hasEndpoint(endpoint) {
          return this.findEndpoint(endpoint) !== -1;
        }
      }, {
        key: "findEndpoint",
        value: function findEndpoint(endpoint) {
          return this._endpoints.findIndex(function (value) {
            return endpoint.equals(value);
          });
        }
      }, {
        key: "removeEndpoints",
        value: function removeEndpoints(endpoints) {
          var _this102 = this;

          endpoints.forEach(function (endpoint) {
            var idx = _this102.findEndpoint(endpoint);

            if (idx !== -1) {
              _this102._endpoints.splice(idx, 1);
            }
          });
          this._index = 0;
          return this._endpoints.length === 0;
        }
      }, {
        key: "removeFromPending",
        value: function removeFromPending() {
          this._factory.removeFromPending(this, this._endpoints);
        }
      }, {
        key: "start",
        value: function start() {
          try {
            //
            // Notify the factory that there's an async connect pending. This is necessary
            // to prevent the outgoing connection factory to be destroyed before all the
            // pending asynchronous connects are finished.
            //
            this._factory.incPendingConnectCount();
          } catch (ex) {
            this._promise.reject(ex);

            return;
          }

          this.getConnection();
          return this._promise;
        }
      }, {
        key: "getConnection",
        value: function getConnection() {
          try {
            //
            // Ask the factory to get a connection.
            //
            var connection = this._factory.getConnection(this._endpoints, this);

            if (connection === null) {
              //
              // A null return value from getConnection indicates that the connection
              // is being established and that everthing has been done to ensure that
              // the callback will be notified when the connection establishment is
              // done.
              //
              return;
            }

            this._promise.resolve(connection);

            this._factory.decPendingConnectCount(); // Must be called last.

          } catch (ex) {
            this._promise.reject(ex);

            this._factory.decPendingConnectCount(); // Must be called last.

          }
        }
      }, {
        key: "nextEndpoint",
        value: function nextEndpoint() {
          var _this103 = this;

          var start = function start(connection) {
            connection.start().then(function () {
              _this103.connectionStartCompleted(connection);
            }, function (ex) {
              _this103.connectionStartFailed(connection, ex);
            });
          };

          while (true) {
            var traceLevels = this._factory._instance.traceLevels();

            try {
              Debug.assert(this._index < this._endpoints.length);
              this._current = this._endpoints[this._index++];

              if (traceLevels.network >= 2) {
                var s = [];
                s.push("trying to establish ");
                s.push(this._current.protocol());
                s.push(" connection to ");
                s.push(this._current.toConnectorString());

                this._factory._instance.initializationData().logger.trace(traceLevels.networkCat, s.join(""));
              }

              start(this._factory.createConnection(this._current.connect(), this._current));
            } catch (ex) {
              if (traceLevels.network >= 2) {
                var _s3 = [];

                _s3.push("failed to establish ");

                _s3.push(this._current.protocol());

                _s3.push(" connection to ");

                _s3.push(this._current.toString());

                _s3.push("\n");

                _s3.push(ex.toString());

                this._factory._instance.initializationData().logger.trace(traceLevels.networkCat, _s3.join(""));
              }

              if (this.connectionStartFailedImpl(ex)) {
                continue;
              }
            }

            break;
          }
        }
      }, {
        key: "connectionStartFailedImpl",
        value: function connectionStartFailedImpl(ex) {
          if (ex instanceof Ice.LocalException) {
            this._factory.handleConnectionException(ex, this._hasMore || this._index < this._endpoints.length);

            if (ex instanceof Ice.CommunicatorDestroyedException) // No need to continue.
              {
                this._factory.finishGetConnectionEx(this._endpoints, ex, this);
              } else if (this._index < this._endpoints.length) // Try the next endpoint.
              {
                return true;
              } else {
              this._factory.finishGetConnectionEx(this._endpoints, ex, this);
            }
          } else {
            this._factory.finishGetConnectionEx(this._endpoints, ex, this);
          }

          return false;
        }
      }]);

      return ConnectCallback;
    }();
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Debug = Ice.Debug;
    var HashUtil = Ice.HashUtil;
    var StringUtil = Ice.StringUtil;
    var TcpTransceiver = typeof Ice.TcpTransceiver !== "undefined" ? Ice.TcpTransceiver : null;

    var TcpEndpointI =
    /*#__PURE__*/
    function (_Ice$IPEndpointI) {
      _inherits(TcpEndpointI, _Ice$IPEndpointI);

      function TcpEndpointI(instance, ho, po, sif, ti, conId, co) {
        var _this104;

        _classCallCheck(this, TcpEndpointI);

        _this104 = _possibleConstructorReturn(this, _getPrototypeOf(TcpEndpointI).call(this, instance, ho, po, sif, conId));
        _this104._timeout = ti === undefined ? instance ? instance.defaultTimeout() : undefined : ti;
        _this104._compress = co === undefined ? false : co;
        return _this104;
      } //
      // Return the endpoint information.
      //


      _createClass(TcpEndpointI, [{
        key: "getInfo",
        value: function getInfo() {
          var info = new Ice.TCPEndpointInfo();
          this.fillEndpointInfo(info);
          return this.secure() ? new IceSSL.EndpointInfo(info, info.timeout, info.compress) : info;
        } //
        // Return the timeout for the endpoint in milliseconds. 0 means
        // non-blocking, -1 means no timeout.
        //

      }, {
        key: "timeout",
        value: function timeout() {
          return this._timeout;
        } //
        // Return a new endpoint with a different timeout value, provided
        // that timeouts are supported by the endpoint. Otherwise the same
        // endpoint is returned.
        //

      }, {
        key: "changeTimeout",
        value: function changeTimeout(timeout) {
          if (timeout === this._timeout) {
            return this;
          } else {
            return new TcpEndpointI(this._instance, this._host, this._port, this._sourceAddr, timeout, this._connectionId, this._compress);
          }
        } //
        // Return a new endpoint with a different connection id.
        //

      }, {
        key: "changeConnectionId",
        value: function changeConnectionId(connectionId) {
          if (connectionId === this._connectionId) {
            return this;
          } else {
            return new TcpEndpointI(this._instance, this._host, this._port, this._sourceAddr, this._timeout, connectionId, this._compress);
          }
        } //
        // Return true if the endpoints support bzip2 compress, or false
        // otherwise.
        //

      }, {
        key: "compress",
        value: function compress() {
          return this._compress;
        } //
        // Return a new endpoint with a different compression value,
        // provided that compression is supported by the
        // endpoint. Otherwise the same endpoint is returned.
        //

      }, {
        key: "changeCompress",
        value: function changeCompress(compress) {
          if (compress === this._compress) {
            return this;
          } else {
            return new TcpEndpointI(this._instance, this._host, this._port, this._sourceAddr, this._timeout, this._connectionId, compress);
          }
        } //
        // Return true if the endpoint is datagram-based.
        //

      }, {
        key: "datagram",
        value: function datagram() {
          return false;
        }
      }, {
        key: "connectable",
        value: function connectable() {
          //
          // TCP endpoints are not connectable when running in a browser, SSL
          // isn't currently supported.
          //
          return TcpTransceiver !== null && !this.secure();
        }
      }, {
        key: "connect",
        value: function connect() {
          Debug.assert(!this.secure());
          return TcpTransceiver.createOutgoing(this._instance, this.getAddress(), this._sourceAddr);
        } //
        // Convert the endpoint to its string form
        //

      }, {
        key: "options",
        value: function options() {
          //
          // WARNING: Certain features, such as proxy validation in Glacier2,
          // depend on the format of proxy strings. Changes to toString() and
          // methods called to generate parts of the reference string could break
          // these features. Please review for all features that depend on the
          // format of proxyToString() before changing this and related code.
          //
          var s = _get(_getPrototypeOf(TcpEndpointI.prototype), "options", this).call(this);

          if (this._timeout == -1) {
            s += " -t infinite";
          } else {
            s += " -t " + this._timeout;
          }

          if (this._compress) {
            s += " -z";
          }

          return s;
        }
      }, {
        key: "compareTo",
        value: function compareTo(p) {
          if (this === p) {
            return 0;
          }

          if (p === null) {
            return 1;
          }

          if (!(p instanceof TcpEndpointI)) {
            return this.type() < p.type() ? -1 : 1;
          }

          if (this._timeout < p._timeout) {
            return -1;
          } else if (p._timeout < this._timeout) {
            return 1;
          }

          if (!this._compress && p._compress) {
            return -1;
          } else if (!p._compress && this._compress) {
            return 1;
          }

          return _get(_getPrototypeOf(TcpEndpointI.prototype), "compareTo", this).call(this, p);
        }
      }, {
        key: "streamWriteImpl",
        value: function streamWriteImpl(s) {
          _get(_getPrototypeOf(TcpEndpointI.prototype), "streamWriteImpl", this).call(this, s);

          s.writeInt(this._timeout);
          s.writeBool(this._compress);
        }
      }, {
        key: "hashInit",
        value: function hashInit(h) {
          h = _get(_getPrototypeOf(TcpEndpointI.prototype), "hashInit", this).call(this, h);
          h = HashUtil.addNumber(h, this._timeout);
          h = HashUtil.addBoolean(h, this._compress);
          return h;
        }
      }, {
        key: "fillEndpointInfo",
        value: function fillEndpointInfo(info) {
          _get(_getPrototypeOf(TcpEndpointI.prototype), "fillEndpointInfo", this).call(this, info);

          info.timeout = this._timeout;
          info.compress = this._compress;
        }
      }, {
        key: "initWithStream",
        value: function initWithStream(s) {
          _get(_getPrototypeOf(TcpEndpointI.prototype), "initWithStream", this).call(this, s);

          this._timeout = s.readInt();
          this._compress = s.readBool();
        }
      }, {
        key: "checkOption",
        value: function checkOption(option, argument, endpoint) {
          if (_get(_getPrototypeOf(TcpEndpointI.prototype), "checkOption", this).call(this, option, argument, endpoint)) {
            return true;
          }

          if (option === "-t") {
            if (argument === null) {
              throw new Ice.EndpointParseException("no argument provided for -t option in endpoint " + endpoint);
            }

            if (argument == "infinite") {
              this._timeout = -1;
            } else {
              var invalid = false;

              try {
                this._timeout = StringUtil.toInt(argument);
              } catch (ex) {
                invalid = true;
              }

              if (invalid || this._timeout < 1) {
                throw new Ice.EndpointParseException("invalid timeout value `" + argument + "' in endpoint " + endpoint);
              }
            }
          } else if (option === "-z") {
            if (argument !== null) {
              throw new Ice.EndpointParseException("unexpected argument `" + argument + "' provided for -z option in " + endpoint);
            }

            this._compress = true;
          } else {
            return false;
          }

          return true;
        }
      }, {
        key: "createEndpoint",
        value: function createEndpoint(host, port, conId) {
          return new TcpEndpointI(this._instance, host, port, this._sourceAddr, this._timeout, conId, this._compress);
        }
      }]);

      return TcpEndpointI;
    }(Ice.IPEndpointI);

    Ice.TcpEndpointI = TcpEndpointI;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var ArrayUtil = Ice.ArrayUtil;
    var Debug = Ice.Debug;
    var BatchRequestQueue = Ice.BatchRequestQueue;
    var HashUtil = Ice.HashUtil;
    var OpaqueEndpointI = Ice.OpaqueEndpointI;
    var RefMode = Ice.ReferenceMode;
    var StringUtil = Ice.StringUtil;
    var StringSeqHelper = Ice.StringSeqHelper;
    var EndpointSelectionType = Ice.EndpointSelectionType;
    var Identity = Ice.Identity;
    var RouterPrx = Ice.RouterPrx;
    var LocatorPrx = Ice.LocatorPrx;
    var PropertyNames = Ice.PropertyNames;
    var ConnectionRequestHandler = Ice.ConnectionRequestHandler;
    var MapUtil = Ice.MapUtil;
    var suffixes = ["EndpointSelection", "ConnectionCached", "PreferSecure", "EncodingVersion", "LocatorCacheTimeout", "InvocationTimeout", "Locator", "Router", "CollocationOptimized"]; //
    // Only for use by Instance
    //

    var ReferenceFactory =
    /*#__PURE__*/
    function () {
      function ReferenceFactory(instance, communicator) {
        _classCallCheck(this, ReferenceFactory);

        this._instance = instance;
        this._communicator = communicator;
        this._defaultRouter = null;
        this._defaultLocator = null;
      }

      _createClass(ReferenceFactory, [{
        key: "create",
        value: function create(ident, facet, tmpl, endpoints) {
          if (ident.name.length === 0 && ident.category.length === 0) {
            return null;
          }

          return this.createImpl(ident, facet, tmpl.getMode(), tmpl.getSecure(), tmpl.getProtocol(), tmpl.getEncoding(), endpoints, null, null);
        }
      }, {
        key: "createWithAdapterId",
        value: function createWithAdapterId(ident, facet, tmpl, adapterId) {
          if (ident.name.length === 0 && ident.category.length === 0) {
            return null;
          }

          return this.createImpl(ident, facet, tmpl.getMode(), tmpl.getSecure(), tmpl.getProtocol(), tmpl.getEncoding(), null, adapterId, null);
        }
      }, {
        key: "createFixed",
        value: function createFixed(ident, fixedConnection) {
          if (ident.name.length === 0 && ident.category.length === 0) {
            return null;
          } //
          // Create new reference
          //


          return new FixedReference(this._instance, this._communicator, ident, "", // Facet
          fixedConnection.endpoint().datagram() ? RefMode.ModeDatagram : RefMode.ModeTwoway, fixedConnection.endpoint().secure(), Ice.Protocol_1_0, this._instance.defaultsAndOverrides().defaultEncoding, fixedConnection, -1, null);
        }
      }, {
        key: "copy",
        value: function copy(r) {
          var ident = r.getIdentity();

          if (ident.name.length === 0 && ident.category.length === 0) {
            return null;
          }

          return r.clone();
        }
      }, {
        key: "createFromString",
        value: function createFromString(s, propertyPrefix) {
          if (s === undefined || s === null || s.length === 0) {
            return null;
          }

          var delim = " \t\n\r";
          var end = 0;
          var beg = StringUtil.findFirstNotOf(s, delim, end);

          if (beg == -1) {
            throw new Ice.ProxyParseException("no non-whitespace characters found in `" + s + "'");
          } //
          // Extract the identity, which may be enclosed in single
          // or double quotation marks.
          //


          var idstr = null;
          end = StringUtil.checkQuote(s, beg);

          if (end === -1) {
            throw new Ice.ProxyParseException("mismatched quotes around identity in `" + s + "'");
          } else if (end === 0) {
            end = StringUtil.findFirstOf(s, delim + ":@", beg);

            if (end === -1) {
              end = s.length;
            }

            idstr = s.substring(beg, end);
          } else {
            beg++; // Skip leading quote

            idstr = s.substring(beg, end);
            end++; // Skip trailing quote
          }

          if (beg === end) {
            throw new Ice.ProxyParseException("no identity in `" + s + "'");
          } //
          // Parsing the identity may raise IdentityParseException.
          //


          var ident = Ice.stringToIdentity(idstr);

          if (ident.name.length === 0) {
            //
            // An identity with an empty name and a non-empty
            // category is illegal.
            //
            if (ident.category.length > 0) {
              throw new Ice.IllegalIdentityException(ident);
            } //
            // Treat a stringified proxy containing two double
            // quotes ("") the same as an empty string, i.e.,
            // a null proxy, but only if nothing follows the
            // quotes.
            //
            else if (StringUtil.findFirstNotOf(s, delim, end) != -1) {
                throw new Ice.ProxyParseException("invalid characters after identity in `" + s + "'");
              } else {
                return null;
              }
          }

          var facet = "";
          var mode = RefMode.ModeTwoway;
          var secure = false;

          var encoding = this._instance.defaultsAndOverrides().defaultEncoding;

          var protocol = Ice.Protocol_1_0;
          var adapter = "";

          while (true) {
            beg = StringUtil.findFirstNotOf(s, delim, end);

            if (beg === -1) {
              break;
            }

            if (s.charAt(beg) == ':' || s.charAt(beg) == '@') {
              break;
            }

            end = StringUtil.findFirstOf(s, delim + ":@", beg);

            if (end == -1) {
              end = s.length;
            }

            if (beg == end) {
              break;
            }

            var option = s.substring(beg, end);

            if (option.length != 2 || option.charAt(0) != '-') {
              throw new Ice.ProxyParseException("expected a proxy option but found `" + option + "' in `" + s + "'");
            } //
            // Check for the presence of an option argument. The
            // argument may be enclosed in single or double
            // quotation marks.
            //


            var argument = null;
            var argumentBeg = StringUtil.findFirstNotOf(s, delim, end);

            if (argumentBeg != -1) {
              var ch = s.charAt(argumentBeg);

              if (ch != "@" && ch != ":" && ch != "-") {
                beg = argumentBeg;
                end = StringUtil.checkQuote(s, beg);

                if (end == -1) {
                  throw new Ice.ProxyParseException("mismatched quotes around value for " + option + " option in `" + s + "'");
                } else if (end === 0) {
                  end = StringUtil.findFirstOf(s, delim + ":@", beg);

                  if (end === -1) {
                    end = s.length;
                  }

                  argument = s.substring(beg, end);
                } else {
                  beg++; // Skip leading quote

                  argument = s.substring(beg, end);
                  end++; // Skip trailing quote
                }
              }
            } //
            // If any new options are added here,
            // IceInternal::Reference::toString() and its derived classes must be updated as well.
            //


            switch (option.charAt(1)) {
              case 'f':
                {
                  if (argument === null) {
                    throw new Ice.ProxyParseException("no argument provided for -f option in `" + s + "'");
                  }

                  try {
                    facet = StringUtil.unescapeString(argument, 0, argument.length);
                  } catch (ex) {
                    throw new Ice.ProxyParseException("invalid facet in `" + s + "': " + ex.message);
                  }

                  break;
                }

              case 't':
                {
                  if (argument !== null) {
                    throw new Ice.ProxyParseException("unexpected argument `" + argument + "' provided for -t option in `" + s + "'");
                  }

                  mode = RefMode.ModeTwoway;
                  break;
                }

              case 'o':
                {
                  if (argument !== null) {
                    throw new Ice.ProxyParseException("unexpected argument `" + argument + "' provided for -o option in `" + s + "'");
                  }

                  mode = RefMode.ModeOneway;
                  break;
                }

              case 'O':
                {
                  if (argument !== null) {
                    throw new Ice.ProxyParseException("unexpected argument `" + argument + "' provided for -O option in `" + s + "'");
                  }

                  mode = RefMode.ModeBatchOneway;
                  break;
                }

              case 'd':
                {
                  if (argument !== null) {
                    throw new Ice.ProxyParseException("unexpected argument `" + argument + "' provided for -d option in `" + s + "'");
                  }

                  mode = RefMode.ModeDatagram;
                  break;
                }

              case 'D':
                {
                  if (argument !== null) {
                    throw new Ice.ProxyParseException("unexpected argument `" + argument + "' provided for -D option in `" + s + "'");
                  }

                  mode = RefMode.ModeBatchDatagram;
                  break;
                }

              case 's':
                {
                  if (argument !== null) {
                    throw new Ice.ProxyParseException("unexpected argument `" + argument + "' provided for -s option in `" + s + "'");
                  }

                  secure = true;
                  break;
                }

              case 'e':
                {
                  if (argument === null) {
                    throw new Ice.ProxyParseException("no argument provided for -e option in `" + s + "'");
                  }

                  try {
                    encoding = Ice.stringToEncodingVersion(argument);
                  } catch (e) // VersionParseException
                  {
                    throw new Ice.ProxyParseException("invalid encoding version `" + argument + "' in `" + s + "':\n" + e.str);
                  }

                  break;
                }

              case 'p':
                {
                  if (argument === null) {
                    throw new Ice.ProxyParseException("no argument provided for -p option in `" + s + "'");
                  }

                  try {
                    protocol = Ice.stringToProtocolVersion(argument);
                  } catch (e) // VersionParseException
                  {
                    throw new Ice.ProxyParseException("invalid protocol version `" + argument + "' in `" + s + "':\n" + e.str);
                  }

                  break;
                }

              default:
                {
                  throw new Ice.ProxyParseException("unknown option `" + option + "' in `" + s + "'");
                }
            }
          }

          if (beg === -1) {
            return this.createImpl(ident, facet, mode, secure, protocol, encoding, null, null, propertyPrefix);
          }

          var endpoints = [];

          if (s.charAt(beg) == ':') {
            var unknownEndpoints = [];
            end = beg;

            while (end < s.length && s.charAt(end) == ':') {
              beg = end + 1;
              end = beg;

              while (true) {
                end = s.indexOf(':', end);

                if (end == -1) {
                  end = s.length;
                  break;
                } else {
                  var quoted = false;
                  var quote = beg;

                  while (true) {
                    quote = s.indexOf("\"", quote);

                    if (quote == -1 || end < quote) {
                      break;
                    } else {
                      quote = s.indexOf("\"", ++quote);

                      if (quote == -1) {
                        break;
                      } else if (end < quote) {
                        quoted = true;
                        break;
                      }

                      ++quote;
                    }
                  }

                  if (!quoted) {
                    break;
                  }

                  ++end;
                }
              }

              var es = s.substring(beg, end);

              var endp = this._instance.endpointFactoryManager().create(es, false);

              if (endp !== null) {
                endpoints.push(endp);
              } else {
                unknownEndpoints.push(es);
              }
            }

            if (endpoints.length === 0) {
              Debug.assert(unknownEndpoints.length > 0);
              throw new Ice.EndpointParseException("invalid endpoint `" + unknownEndpoints[0] + "' in `" + s + "'");
            } else if (unknownEndpoints.length !== 0 && this._instance.initializationData().properties.getPropertyAsIntWithDefault("Ice.Warn.Endpoints", 1) > 0) {
              var msg = [];
              msg.push("Proxy contains unknown endpoints:");
              unknownEndpoints.forEach(function (unknownEndpoint) {
                msg.push(" `");
                msg.push(unknownEndpoint);
                msg.push("'");
              });

              this._instance.initializationData().logger.warning(msg.join(""));
            }

            return this.createImpl(ident, facet, mode, secure, protocol, encoding, endpoints, null, propertyPrefix);
          } else if (s.charAt(beg) == '@') {
            beg = StringUtil.findFirstNotOf(s, delim, beg + 1);

            if (beg == -1) {
              throw new Ice.ProxyParseException("missing adapter id in `" + s + "'");
            }

            var adapterstr = null;
            end = StringUtil.checkQuote(s, beg);

            if (end === -1) {
              throw new Ice.ProxyParseException("mismatched quotes around adapter id in `" + s + "'");
            } else if (end === 0) {
              end = StringUtil.findFirstOf(s, delim, beg);

              if (end === -1) {
                end = s.length;
              }

              adapterstr = s.substring(beg, end);
            } else {
              beg++; // Skip leading quote

              adapterstr = s.substring(beg, end);
              end++; // Skip trailing quote
            }

            if (end !== s.length && StringUtil.findFirstNotOf(s, delim, end) !== -1) {
              throw new Ice.ProxyParseException("invalid trailing characters after `" + s.substring(0, end + 1) + "' in `" + s + "'");
            }

            try {
              adapter = StringUtil.unescapeString(adapterstr, 0, adapterstr.length);
            } catch (ex) {
              throw new Ice.ProxyParseException("invalid adapter id in `" + s + "': " + ex.message);
            }

            if (adapter.length === 0) {
              throw new Ice.ProxyParseException("empty adapter id in `" + s + "'");
            }

            return this.createImpl(ident, facet, mode, secure, protocol, encoding, null, adapter, propertyPrefix);
          }

          throw new Ice.ProxyParseException("malformed proxy `" + s + "'");
        }
      }, {
        key: "createFromStream",
        value: function createFromStream(ident, s) {
          //
          // Don't read the identity here. Operations calling this
          // constructor read the identity, and pass it as a parameter.
          //
          if (ident.name.length === 0 && ident.category.length === 0) {
            return null;
          } //
          // For compatibility with the old FacetPath.
          //


          var facetPath = StringSeqHelper.read(s); // String[]

          var facet;

          if (facetPath.length > 0) {
            if (facetPath.length > 1) {
              throw new Ice.ProxyUnmarshalException();
            }

            facet = facetPath[0];
          } else {
            facet = "";
          }

          var mode = s.readByte();

          if (mode < 0 || mode > RefMode.ModeLast) {
            throw new Ice.ProxyUnmarshalException();
          }

          var secure = s.readBool();
          var protocol = null;
          var encoding = null;

          if (!s.getEncoding().equals(Ice.Encoding_1_0)) {
            protocol = new Ice.ProtocolVersion();

            protocol._read(s);

            encoding = new Ice.EncodingVersion();

            encoding._read(s);
          } else {
            protocol = Ice.Protocol_1_0;
            encoding = Ice.Encoding_1_0;
          }

          var endpoints = null; // EndpointI[]

          var adapterId = null;
          var sz = s.readSize();

          if (sz > 0) {
            endpoints = [];

            for (var i = 0; i < sz; i++) {
              endpoints[i] = this._instance.endpointFactoryManager().read(s);
            }
          } else {
            adapterId = s.readString();
          }

          return this.createImpl(ident, facet, mode, secure, protocol, encoding, endpoints, adapterId, null);
        }
      }, {
        key: "setDefaultRouter",
        value: function setDefaultRouter(defaultRouter) {
          if (this._defaultRouter === null ? defaultRouter === null : this._defaultRouter.equals(defaultRouter)) {
            return this;
          }

          var factory = new ReferenceFactory(this._instance, this._communicator);
          factory._defaultLocator = this._defaultLocator;
          factory._defaultRouter = defaultRouter;
          return factory;
        }
      }, {
        key: "getDefaultRouter",
        value: function getDefaultRouter() {
          return this._defaultRouter;
        }
      }, {
        key: "setDefaultLocator",
        value: function setDefaultLocator(defaultLocator) {
          if (this._defaultLocator === null ? defaultLocator === null : this._defaultLocator.equals(defaultLocator)) {
            return this;
          }

          var factory = new ReferenceFactory(this._instance, this._communicator);
          factory._defaultRouter = this._defaultRouter;
          factory._defaultLocator = defaultLocator;
          return factory;
        }
      }, {
        key: "getDefaultLocator",
        value: function getDefaultLocator() {
          return this._defaultLocator;
        }
      }, {
        key: "checkForUnknownProperties",
        value: function checkForUnknownProperties(prefix) {
          var unknownProps = []; //
          // Do not warn about unknown properties for Ice prefixes (Ice, Glacier2, etc.)
          //

          for (var i = 0; i < PropertyNames.clPropNames.length; ++i) {
            if (prefix.indexOf(PropertyNames.clPropNames[i] + ".") === 0) {
              return;
            }
          }

          var properties = this._instance.initializationData().properties.getPropertiesForPrefix(prefix + ".");

          unknownProps = unknownProps.concat(Array.from(properties.keys()).filter(function (key) {
            return !suffixes.some(function (suffix) {
              return key === prefix + "." + suffix;
            });
          }));

          if (unknownProps.length > 0) {
            var message = [];
            message.push("found unknown properties for proxy '");
            message.push(prefix);
            message.push("':");
            unknownProps.forEach(function (unknownProp) {
              return message.push("\n    ", unknownProp);
            });

            this._instance.initializationData().logger.warning(message.join(""));
          }
        }
      }, {
        key: "createImpl",
        value: function createImpl(ident, facet, mode, secure, protocol, encoding, endpoints, adapterId, propertyPrefix) {
          var defaultsAndOverrides = this._instance.defaultsAndOverrides(); //
          // Default local proxy options.
          //


          var locatorInfo = null;

          if (this._defaultLocator !== null) {
            if (!this._defaultLocator._getReference().getEncoding().equals(encoding)) {
              locatorInfo = this._instance.locatorManager().find(this._defaultLocator.ice_encodingVersion(encoding));
            } else {
              locatorInfo = this._instance.locatorManager().find(this._defaultLocator);
            }
          }

          var routerInfo = this._instance.routerManager().find(this._defaultRouter);

          var cacheConnection = true;
          var preferSecure = defaultsAndOverrides.defaultPreferSecure;
          var endpointSelection = defaultsAndOverrides.defaultEndpointSelection;
          var locatorCacheTimeout = defaultsAndOverrides.defaultLocatorCacheTimeout;
          var invocationTimeout = defaultsAndOverrides.defaultInvocationTimeout; //
          // Override the defaults with the proxy properties if a property prefix is defined.
          //

          if (propertyPrefix !== null && propertyPrefix.length > 0) {
            var properties = this._instance.initializationData().properties; //
            // Warn about unknown properties.
            //


            if (properties.getPropertyAsIntWithDefault("Ice.Warn.UnknownProperties", 1) > 0) {
              this.checkForUnknownProperties(propertyPrefix);
            }

            var property = propertyPrefix + ".Locator";
            var locator = LocatorPrx.uncheckedCast(this._communicator.propertyToProxy(property));

            if (locator !== null) {
              if (!locator._getReference().getEncoding().equals(encoding)) {
                locatorInfo = this._instance.locatorManager().find(locator.ice_encodingVersion(encoding));
              } else {
                locatorInfo = this._instance.locatorManager().find(locator);
              }
            }

            property = propertyPrefix + ".Router";
            var router = RouterPrx.uncheckedCast(this._communicator.propertyToProxy(property));

            if (router !== null) {
              var match = ".Router";

              if (propertyPrefix.lastIndexOf(match) == propertyPrefix.length - match.length) {
                this._instance.initializationData().logger.warning("`" + property + "=" + properties.getProperty(property) + "': cannot set a router on a router; setting ignored");
              } else {
                routerInfo = this._instance.routerManager().find(router);
              }
            }

            property = propertyPrefix + ".ConnectionCached";
            cacheConnection = properties.getPropertyAsIntWithDefault(property, cacheConnection ? 1 : 0) > 0;
            property = propertyPrefix + ".PreferSecure";
            preferSecure = properties.getPropertyAsIntWithDefault(property, preferSecure ? 1 : 0) > 0;
            property = propertyPrefix + ".EndpointSelection";

            if (properties.getProperty(property).length > 0) {
              var type = properties.getProperty(property);

              if (type == "Random") {
                endpointSelection = EndpointSelectionType.Random;
              } else if (type == "Ordered") {
                endpointSelection = EndpointSelectionType.Ordered;
              } else {
                throw new Ice.EndpointSelectionTypeParseException("illegal value `" + type + "'; expected `Random' or `Ordered'");
              }
            }

            property = propertyPrefix + ".LocatorCacheTimeout";
            var value = properties.getProperty(property);

            if (value.length !== 0) {
              locatorCacheTimeout = properties.getPropertyAsIntWithDefault(property, locatorCacheTimeout);

              if (locatorCacheTimeout < -1) {
                locatorCacheTimeout = -1;

                this._instance.initializationData().logger.warning("invalid value for" + property + "`" + properties.getProperty(property) + "': defaulting to -1");
              }
            }

            property = propertyPrefix + ".InvocationTimeout";
            value = properties.getProperty(property);

            if (value.length !== 0) {
              invocationTimeout = properties.getPropertyAsIntWithDefault(property, invocationTimeout);

              if (invocationTimeout < 1 && invocationTimeout !== -1) {
                invocationTimeout = -1;

                this._instance.initializationData().logger.warning("invalid value for" + property + "`" + properties.getProperty(property) + "': defaulting to -1");
              }
            }
          } //
          // Create new reference
          //


          return new RoutableReference(this._instance, this._communicator, ident, facet, mode, secure, protocol, encoding, endpoints, adapterId, locatorInfo, routerInfo, cacheConnection, preferSecure, endpointSelection, locatorCacheTimeout, invocationTimeout);
        }
      }]);

      return ReferenceFactory;
    }();

    Ice.ReferenceFactory = ReferenceFactory;

    var Reference =
    /*#__PURE__*/
    function () {
      function Reference(instance, communicator, identity, facet, mode, secure, protocol, encoding, invocationTimeout, context) {
        _classCallCheck(this, Reference);

        //
        // Validate string arguments.
        //
        Debug.assert(identity === undefined || identity.name !== null);
        Debug.assert(identity === undefined || identity.category !== null);
        Debug.assert(facet === undefined || facet !== null);
        this._instance = instance;
        this._communicator = communicator;
        this._mode = mode;
        this._secure = secure;
        this._identity = identity;
        this._context = context === undefined ? Reference._emptyContext : context;
        this._facet = facet;
        this._protocol = protocol;
        this._encoding = encoding;
        this._invocationTimeout = invocationTimeout;
        this._hashInitialized = false;
      }

      _createClass(Reference, [{
        key: "getMode",
        value: function getMode() {
          return this._mode;
        }
      }, {
        key: "getSecure",
        value: function getSecure() {
          return this._secure;
        }
      }, {
        key: "getProtocol",
        value: function getProtocol() {
          return this._protocol;
        }
      }, {
        key: "getEncoding",
        value: function getEncoding() {
          return this._encoding;
        }
      }, {
        key: "getIdentity",
        value: function getIdentity() {
          return this._identity;
        }
      }, {
        key: "getFacet",
        value: function getFacet() {
          return this._facet;
        }
      }, {
        key: "getInstance",
        value: function getInstance() {
          return this._instance;
        }
      }, {
        key: "getContext",
        value: function getContext() {
          return this._context; // Map
        }
      }, {
        key: "getInvocationTimeout",
        value: function getInvocationTimeout() {
          return this._invocationTimeout;
        }
      }, {
        key: "getCommunicator",
        value: function getCommunicator() {
          return this._communicator;
        }
      }, {
        key: "getEndpoints",
        value: function getEndpoints() {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "getAdapterId",
        value: function getAdapterId() {
          // Abstract
          Debug.assert(false);
          return "";
        }
      }, {
        key: "getRouterInfo",
        value: function getRouterInfo() {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "getLocatorInfo",
        value: function getLocatorInfo() {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "getCacheConnection",
        value: function getCacheConnection() {
          // Abstract
          Debug.assert(false);
          return false;
        }
      }, {
        key: "getPreferSecure",
        value: function getPreferSecure() {
          // Abstract
          Debug.assert(false);
          return false;
        }
      }, {
        key: "getEndpointSelection",
        value: function getEndpointSelection() {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "getLocatorCacheTimeout",
        value: function getLocatorCacheTimeout() {
          // Abstract
          Debug.assert(false);
          return 0;
        }
      }, {
        key: "getConnectionId",
        value: function getConnectionId() {
          // Abstract
          Debug.assert(false);
          return "";
        }
      }, {
        key: "getTimeout",
        value: function getTimeout() {
          // Abstract
          Debug.assert(false);
          return "";
        } //
        // The change* methods (here and in derived classes) create
        // a new reference based on the existing one, with the
        // corresponding value changed.
        //

      }, {
        key: "changeContext",
        value: function changeContext(newContext) {
          if (newContext === undefined || newContext === null) {
            newContext = Reference._emptyContext;
          }

          var r = this._instance.referenceFactory().copy(this);

          if (newContext.size === 0) {
            r._context = Reference._emptyContext;
          } else {
            r._context = new Map(newContext);
          }

          return r;
        }
      }, {
        key: "changeMode",
        value: function changeMode(newMode) {
          if (newMode === this._mode) {
            return this;
          }

          var r = this._instance.referenceFactory().copy(this);

          r._mode = newMode;
          return r;
        }
      }, {
        key: "changeSecure",
        value: function changeSecure(newSecure) {
          if (newSecure === this._secure) {
            return this;
          }

          var r = this._instance.referenceFactory().copy(this);

          r._secure = newSecure;
          return r;
        }
      }, {
        key: "changeIdentity",
        value: function changeIdentity(newIdentity) {
          if (newIdentity.equals(this._identity)) {
            return this;
          }

          var r = this._instance.referenceFactory().copy(this);

          r._identity = new Identity(newIdentity.name, newIdentity.category);
          return r;
        }
      }, {
        key: "changeFacet",
        value: function changeFacet(newFacet) {
          if (newFacet === this._facet) {
            return this;
          }

          var r = this._instance.referenceFactory().copy(this);

          r._facet = newFacet;
          return r;
        }
      }, {
        key: "changeInvocationTimeout",
        value: function changeInvocationTimeout(newInvocationTimeout) {
          if (newInvocationTimeout === this._invocationTimeout) {
            return this;
          }

          var r = this._instance.referenceFactory().copy(this);

          r._invocationTimeout = newInvocationTimeout;
          return r;
        }
      }, {
        key: "changeEncoding",
        value: function changeEncoding(newEncoding) {
          if (newEncoding.equals(this._encoding)) {
            return this;
          }

          var r = this._instance.referenceFactory().copy(this);

          r._encoding = newEncoding;
          return r;
        }
      }, {
        key: "changeAdapterId",
        value: function changeAdapterId(newAdapterId) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "changeEndpoints",
        value: function changeEndpoints(newEndpoints) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "changeLocator",
        value: function changeLocator(newLocator) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "changeRouter",
        value: function changeRouter(newRouter) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "changeCacheConnection",
        value: function changeCacheConnection(newCache) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "changePreferSecure",
        value: function changePreferSecure(newPreferSecure) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "changeEndpointSelection",
        value: function changeEndpointSelection(newType) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "changeLocatorCacheTimeout",
        value: function changeLocatorCacheTimeout(newTimeout) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "changeTimeout",
        value: function changeTimeout(newTimeout) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "changeConnectionId",
        value: function changeConnectionId(connectionId) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "changeConnection",
        value: function changeConnection(connection) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "hashCode",
        value: function hashCode() {
          if (this._hashInitialized) {
            return this._hashValue;
          }

          var h = 5381;
          h = HashUtil.addNumber(h, this._mode);
          h = HashUtil.addBoolean(h, this._secure);
          h = HashUtil.addHashable(h, this._identity);

          if (this._context !== null && this._context !== undefined) {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
              for (var _iterator7 = this._context[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var _step7$value = _slicedToArray(_step7.value, 2),
                    key = _step7$value[0],
                    value = _step7$value[1];

                h = HashUtil.addString(h, key);
                h = HashUtil.addString(h, value);
              }
            } catch (err) {
              _didIteratorError7 = true;
              _iteratorError7 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                  _iterator7.return();
                }
              } finally {
                if (_didIteratorError7) {
                  throw _iteratorError7;
                }
              }
            }
          }

          h = HashUtil.addString(h, this._facet);
          h = HashUtil.addHashable(h, this._protocol);
          h = HashUtil.addHashable(h, this._encoding);
          h = HashUtil.addNumber(h, this._invocationTimeout);
          this._hashValue = h;
          this._hashInitialized = true;
          return this._hashValue;
        } //
        // Utility methods
        //

      }, {
        key: "isIndirect",
        value: function isIndirect() {
          // Abstract
          Debug.assert(false);
          return false;
        }
      }, {
        key: "isWellKnown",
        value: function isWellKnown() {
          // Abstract
          Debug.assert(false);
          return false;
        } //
        // Marshal the reference.
        //

      }, {
        key: "streamWrite",
        value: function streamWrite(s) {
          //
          // Don't write the identity here. Operations calling streamWrite
          // write the identity.
          //
          //
          // For compatibility with the old FacetPath.
          //
          if (this._facet.length === 0) {
            s.writeSize(0); // Empty string sequence
          } else {
            s.writeSize(1); // String sequence with one element

            s.writeString(this._facet);
          }

          s.writeByte(this._mode);
          s.writeBool(this._secure);

          if (!s.getEncoding().equals(Ice.Encoding_1_0)) {
            this._protocol._write(s);

            this._encoding._write(s);
          } // Derived class writes the remainder of the reference.

        } //
        // Convert the reference to its string form.
        //

      }, {
        key: "toString",
        value: function toString() {
          //
          // WARNING: Certain features, such as proxy validation in Glacier2,
          // depend on the format of proxy strings. Changes to toString() and
          // methods called to generate parts of the reference string could break
          // these features. Please review for all features that depend on the
          // format of proxyToString() before changing this and related code.
          //
          var s = [];

          var toStringMode = this._instance.toStringMode(); //
          // If the encoded identity string contains characters which
          // the reference parser uses as separators, then we enclose
          // the identity string in quotes.
          //


          var id = Ice.identityToString(this._identity, toStringMode);

          if (id.search(/[ :@]/) != -1) {
            s.push('"');
            s.push(id);
            s.push('"');
          } else {
            s.push(id);
          }

          if (this._facet.length > 0) {
            //
            // If the encoded facet string contains characters which
            // the reference parser uses as separators, then we enclose
            // the facet string in quotes.
            //
            s.push(" -f ");
            var fs = StringUtil.escapeString(this._facet, "", toStringMode);

            if (fs.search(/[ :@]/) != -1) {
              s.push('"');
              s.push(fs);
              s.push('"');
            } else {
              s.push(fs);
            }
          }

          switch (this._mode) {
            case RefMode.ModeTwoway:
              {
                s.push(" -t");
                break;
              }

            case RefMode.ModeOneway:
              {
                s.push(" -o");
                break;
              }

            case RefMode.ModeBatchOneway:
              {
                s.push(" -O");
                break;
              }

            case RefMode.ModeDatagram:
              {
                s.push(" -d");
                break;
              }

            case RefMode.ModeBatchDatagram:
              {
                s.push(" -D");
                break;
              }

            default:
              {
                Debug.assert(false);
                break;
              }
          }

          if (this._secure) {
            s.push(" -s");
          }

          if (!this._protocol.equals(Ice.Protocol_1_0)) {
            //
            // We only print the protocol if it's not 1.0. It's fine as
            // long as we don't add Ice.Default.ProtocolVersion, a
            // stringified proxy will convert back to the same proxy with
            // stringToProxy.
            //
            s.push(" -p ");
            s.push(Ice.protocolVersionToString(this._protocol));
          } //
          // Always print the encoding version to ensure a stringified proxy
          // will convert back to a proxy with the same encoding with
          // stringToProxy (and won't use Ice.Default.EncodingVersion).
          //


          s.push(" -e ");
          s.push(Ice.encodingVersionToString(this._encoding));
          return s.join(""); // Derived class writes the remainder of the string.
        } //
        // Convert the reference to its property form.
        //

      }, {
        key: "toProperty",
        value: function toProperty(prefix) {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "getRequestHandler",
        value: function getRequestHandler(proxy) {
          // Abstract
          Debug.assert(false);
        }
      }, {
        key: "getBatchRequestQueue",
        value: function getBatchRequestQueue() {
          // Abstract
          Debug.assert(false);
        }
      }, {
        key: "equals",
        value: function equals(r) {
          //
          // Note: if(this === r) and type test are performed by each non-abstract derived class.
          //
          if (this._mode !== r._mode) {
            return false;
          }

          if (this._secure !== r._secure) {
            return false;
          }

          if (!this._identity.equals(r._identity)) {
            return false;
          }

          if (!MapUtil.equals(this._context, r._context)) {
            return false;
          }

          if (this._facet !== r._facet) {
            return false;
          }

          if (!this._protocol.equals(r._protocol)) {
            return false;
          }

          if (!this._encoding.equals(r._encoding)) {
            return false;
          }

          if (this._invocationTimeout !== r._invocationTimeout) {
            return false;
          }

          return true;
        }
      }, {
        key: "clone",
        value: function clone() {
          // Abstract
          Debug.assert(false);
          return null;
        }
      }, {
        key: "copyMembers",
        value: function copyMembers(r) {
          //
          // Copy the members that are not passed to the constructor.
          //
          r._context = this._context;
        }
      }]);

      return Reference;
    }();

    Reference._emptyContext = new Map();
    Reference._emptyEndpoints = [];
    Ice.Reference = Reference;

    var FixedReference =
    /*#__PURE__*/
    function (_Reference) {
      _inherits(FixedReference, _Reference);

      function FixedReference(instance, communicator, identity, facet, mode, secure, protocol, encoding, connection, invocationTimeout, context) {
        var _this105;

        _classCallCheck(this, FixedReference);

        _this105 = _possibleConstructorReturn(this, _getPrototypeOf(FixedReference).call(this, instance, communicator, identity, facet, mode, secure, protocol, encoding, invocationTimeout, context));
        _this105._fixedConnection = connection;
        return _this105;
      }

      _createClass(FixedReference, [{
        key: "getEndpoints",
        value: function getEndpoints() {
          return Reference._emptyEndpoints;
        }
      }, {
        key: "getAdapterId",
        value: function getAdapterId() {
          return "";
        }
      }, {
        key: "getRouterInfo",
        value: function getRouterInfo() {
          return null;
        }
      }, {
        key: "getLocatorInfo",
        value: function getLocatorInfo() {
          return null;
        }
      }, {
        key: "getCacheConnection",
        value: function getCacheConnection() {
          return true;
        }
      }, {
        key: "getPreferSecure",
        value: function getPreferSecure() {
          return false;
        }
      }, {
        key: "getEndpointSelection",
        value: function getEndpointSelection() {
          return EndpointSelectionType.Random;
        }
      }, {
        key: "getLocatorCacheTimeout",
        value: function getLocatorCacheTimeout() {
          return 0;
        }
      }, {
        key: "getConnectionId",
        value: function getConnectionId() {
          return "";
        }
      }, {
        key: "getTimeout",
        value: function getTimeout() {
          return undefined;
        }
      }, {
        key: "changeAdapterId",
        value: function changeAdapterId(newAdapterId) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "changeEndpoints",
        value: function changeEndpoints(newEndpoints) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "changeLocato",
        value: function changeLocato(newLocator) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "changeRouter",
        value: function changeRouter(newRouter) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "changeCacheConnection",
        value: function changeCacheConnection(newCache) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "changePreferSecure",
        value: function changePreferSecure(prefSec) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "changeEndpointSelection",
        value: function changeEndpointSelection(newType) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "changeLocatorCacheTimeout",
        value: function changeLocatorCacheTimeout(newTimeout) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "changeTimeout",
        value: function changeTimeout(newTimeout) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "changeConnectionId",
        value: function changeConnectionId(connectionId) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "changeConnection",
        value: function changeConnection(newConnection) {
          if (newConnection == this._fixedConnection) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._fixedConnection = newConnection;
          return r;
        }
      }, {
        key: "isIndirect",
        value: function isIndirect() {
          return false;
        }
      }, {
        key: "isWellKnown",
        value: function isWellKnown() {
          return false;
        }
      }, {
        key: "streamWrite",
        value: function streamWrite(s) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "toProperty",
        value: function toProperty(prefix) {
          throw new Ice.FixedProxyException();
        }
      }, {
        key: "clone",
        value: function clone() {
          var r = new FixedReference(this.getInstance(), this.getCommunicator(), this.getIdentity(), this.getFacet(), this.getMode(), this.getSecure(), this.getProtocol(), this.getEncoding(), this._fixedConnection, this.getInvocationTimeout(), this.getContext());
          this.copyMembers(r);
          return r;
        }
      }, {
        key: "getRequestHandler",
        value: function getRequestHandler(proxy) {
          switch (this.getMode()) {
            case RefMode.ModeTwoway:
            case RefMode.ModeOneway:
            case RefMode.ModeBatchOneway:
              {
                if (this._fixedConnection.endpoint().datagram()) {
                  throw new Ice.NoEndpointException(this.toString());
                }

                break;
              }

            case RefMode.ModeDatagram:
            case RefMode.ModeBatchDatagram:
              {
                if (!this._fixedConnection.endpoint().datagram()) {
                  throw new Ice.NoEndpointException(this.toString());
                }

                break;
              }

            default:
              {
                Debug.assert(false);
                break;
              }
          } //
          // If a secure connection is requested or secure overrides is set,
          // check if the connection is secure.
          //


          var defaultsAndOverrides = this.getInstance().defaultsAndOverrides();
          var secure = defaultsAndOverrides.overrideSecure ? defaultsAndOverrides.overrideSecureValue : this.getSecure();

          if (secure && !this._fixedConnection.endpoint().secure()) {
            throw new Ice.NoEndpointException(this.toString());
          }

          this._fixedConnection.throwException(); // Throw in case our connection is already destroyed.


          return proxy._setRequestHandler(new ConnectionRequestHandler(this, this._fixedConnection));
        }
      }, {
        key: "getBatchRequestQueue",
        value: function getBatchRequestQueue() {
          return this._fixedConnection.getBatchRequestQueue();
        }
      }, {
        key: "equals",
        value: function equals(rhs) {
          if (this === rhs) {
            return true;
          }

          if (!(rhs instanceof FixedReference)) {
            return false;
          }

          if (!_get(_getPrototypeOf(FixedReference.prototype), "equals", this).call(this, rhs)) {
            return false;
          }

          return this._fixedConnection == rhs._fixedConnection;
        }
      }]);

      return FixedReference;
    }(Reference);

    Ice.FixedReference = FixedReference;

    var RoutableReference =
    /*#__PURE__*/
    function (_Reference2) {
      _inherits(RoutableReference, _Reference2);

      function RoutableReference(instance, communicator, identity, facet, mode, secure, protocol, encoding, endpoints, adapterId, locatorInfo, routerInfo, cacheConnection, preferSecure, endpointSelection, locatorCacheTimeout, invocationTimeout, context) {
        var _this106;

        _classCallCheck(this, RoutableReference);

        _this106 = _possibleConstructorReturn(this, _getPrototypeOf(RoutableReference).call(this, instance, communicator, identity, facet, mode, secure, protocol, encoding, invocationTimeout, context));
        _this106._endpoints = endpoints;
        _this106._adapterId = adapterId;
        _this106._locatorInfo = locatorInfo;
        _this106._routerInfo = routerInfo;
        _this106._cacheConnection = cacheConnection;
        _this106._preferSecure = preferSecure;
        _this106._endpointSelection = endpointSelection;
        _this106._locatorCacheTimeout = locatorCacheTimeout;
        _this106._overrideTimeout = false;
        _this106._timeout = -1;

        if (_this106._endpoints === null) {
          _this106._endpoints = Reference._emptyEndpoints;
        }

        if (_this106._adapterId === null) {
          _this106._adapterId = "";
        }

        _this106._connectionId = "";
        Debug.assert(_this106._adapterId.length === 0 || _this106._endpoints.length === 0);
        return _this106;
      }

      _createClass(RoutableReference, [{
        key: "getEndpoints",
        value: function getEndpoints() {
          return this._endpoints;
        }
      }, {
        key: "getAdapterId",
        value: function getAdapterId() {
          return this._adapterId;
        }
      }, {
        key: "getRouterInfo",
        value: function getRouterInfo() {
          return this._routerInfo;
        }
      }, {
        key: "getLocatorInfo",
        value: function getLocatorInfo() {
          return this._locatorInfo;
        }
      }, {
        key: "getCacheConnection",
        value: function getCacheConnection() {
          return this._cacheConnection;
        }
      }, {
        key: "getPreferSecure",
        value: function getPreferSecure() {
          return this._preferSecure;
        }
      }, {
        key: "getEndpointSelection",
        value: function getEndpointSelection() {
          return this._endpointSelection;
        }
      }, {
        key: "getLocatorCacheTimeout",
        value: function getLocatorCacheTimeout() {
          return this._locatorCacheTimeout;
        }
      }, {
        key: "getConnectionId",
        value: function getConnectionId() {
          return this._connectionId;
        }
      }, {
        key: "getTimeout",
        value: function getTimeout() {
          return this._overrideTimeout ? this._timeout : undefined;
        }
      }, {
        key: "changeEncoding",
        value: function changeEncoding(newEncoding) {
          var r = _get(_getPrototypeOf(RoutableReference.prototype), "changeEncoding", this).call(this, newEncoding);

          if (r !== this) {
            if (r._locatorInfo !== null && !r._locatorInfo.getLocator().ice_getEncodingVersion().equals(newEncoding)) {
              r._locatorInfo = this.getInstance().locatorManager().find(r._locatorInfo.getLocator().ice_encodingVersion(newEncoding));
            }
          }

          return r;
        }
      }, {
        key: "changeAdapterId",
        value: function changeAdapterId(newAdapterId) {
          if (this._adapterId === newAdapterId) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._adapterId = newAdapterId;
          r._endpoints = Reference._emptyEndpoints;
          return r;
        }
      }, {
        key: "changeEndpoints",
        value: function changeEndpoints(newEndpoints) {
          if (ArrayUtil.equals(newEndpoints, this._endpoints, function (e1, e2) {
            return e1.equals(e2);
          })) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._endpoints = newEndpoints;
          r._adapterId = "";
          r.applyOverrides(r._endpoints);
          return r;
        }
      }, {
        key: "changeLocator",
        value: function changeLocator(newLocator) {
          var newLocatorInfo = this.getInstance().locatorManager().find(newLocator);

          if (newLocatorInfo !== null && this._locatorInfo !== null && newLocatorInfo.equals(this._locatorInfo)) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._locatorInfo = newLocatorInfo;
          return r;
        }
      }, {
        key: "changeRouter",
        value: function changeRouter(newRouter) {
          var newRouterInfo = this.getInstance().routerManager().find(newRouter);

          if (newRouterInfo !== null && this._routerInfo !== null && newRouterInfo.equals(this._routerInfo)) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._routerInfo = newRouterInfo;
          return r;
        }
      }, {
        key: "changeCacheConnection",
        value: function changeCacheConnection(newCache) {
          if (newCache === this._cacheConnection) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._cacheConnection = newCache;
          return r;
        }
      }, {
        key: "changePreferSecure",
        value: function changePreferSecure(newPreferSecure) {
          if (newPreferSecure === this._preferSecure) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._preferSecure = newPreferSecure;
          return r;
        }
      }, {
        key: "changeEndpointSelection",
        value: function changeEndpointSelection(newType) {
          if (newType === this._endpointSelection) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._endpointSelection = newType;
          return r;
        }
      }, {
        key: "changeLocatorCacheTimeout",
        value: function changeLocatorCacheTimeout(newTimeout) {
          if (this._locatorCacheTimeout === newTimeout) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._locatorCacheTimeout = newTimeout;
          return r;
        }
      }, {
        key: "changeTimeout",
        value: function changeTimeout(newTimeout) {
          if (this._overrideTimeout && this._timeout === newTimeout) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._timeout = newTimeout;
          r._overrideTimeout = true;
          r._endpoints = this._endpoints.map(function (endpoint) {
            return endpoint.changeTimeout(newTimeout);
          });
          return r;
        }
      }, {
        key: "changeConnectionId",
        value: function changeConnectionId(id) {
          if (this._connectionId === id) {
            return this;
          }

          var r = this.getInstance().referenceFactory().copy(this);
          r._connectionId = id;
          r._endpoints = this._endpoints.map(function (endpoint) {
            return endpoint.changeConnectionId(id);
          });
          return r;
        }
      }, {
        key: "changeConnection",
        value: function changeConnection(newConnection) {
          return new FixedReference(this.getInstance(), this.getCommunicator(), this.getIdentity(), this.getFacet(), this.getMode(), this.getSecure(), this.getProtocol(), this.getEncoding(), newConnection, this.getInvocationTimeout(), this.getContext());
        }
      }, {
        key: "isIndirect",
        value: function isIndirect() {
          return this._endpoints.length === 0;
        }
      }, {
        key: "isWellKnown",
        value: function isWellKnown() {
          return this._endpoints.length === 0 && this._adapterId.length === 0;
        }
      }, {
        key: "streamWrite",
        value: function streamWrite(s) {
          _get(_getPrototypeOf(RoutableReference.prototype), "streamWrite", this).call(this, s);

          s.writeSize(this._endpoints.length);

          if (this._endpoints.length > 0) {
            Debug.assert(this._adapterId.length === 0);

            this._endpoints.forEach(function (endpoint) {
              s.writeShort(endpoint.type());
              endpoint.streamWrite(s);
            });
          } else {
            s.writeString(this._adapterId); // Adapter id.
          }
        }
      }, {
        key: "toString",
        value: function toString() {
          //
          // WARNING: Certain features, such as proxy validation in Glacier2,
          // depend on the format of proxy strings. Changes to toString() and
          // methods called to generate parts of the reference string could break
          // these features. Please review for all features that depend on the
          // format of proxyToString() before changing this and related code.
          //
          var s = [];
          s.push(_get(_getPrototypeOf(RoutableReference.prototype), "toString", this).call(this));

          if (this._endpoints.length > 0) {
            this._endpoints.forEach(function (endpoint) {
              var endp = endpoint.toString();

              if (endp !== null && endp.length > 0) {
                s.push(':');
                s.push(endp);
              }
            });
          } else if (this._adapterId.length > 0) {
            s.push(" @ "); //
            // If the encoded adapter id string contains characters which
            // the reference parser uses as separators, then we enclose
            // the adapter id string in quotes.
            //

            var a = StringUtil.escapeString(this._adapterId, null, this._instance.toStringMode());

            if (a.search(/[ :@]/) != -1) {
              s.push('"');
              s.push(a);
              s.push('"');
            } else {
              s.push(a);
            }
          }

          return s.join("");
        }
      }, {
        key: "toProperty",
        value: function toProperty(prefix) {
          var properties = new Map();
          properties.set(prefix, this.toString());
          properties.set(prefix + ".CollocationOptimized", "0");
          properties.set(prefix + ".ConnectionCached", this._cacheConnection ? "1" : "0");
          properties.set(prefix + ".PreferSecure", this._preferSecure ? "1" : "0");
          properties.set(prefix + ".EndpointSelection", this._endpointSelection === EndpointSelectionType.Random ? "Random" : "Ordered");
          properties.set(prefix + ".LocatorCacheTimeout", String(this._locatorCacheTimeout));
          properties.set(prefix + ".InvocationTimeout", String(this.getInvocationTimeout()));

          if (this._routerInfo !== null) {
            this._routerInfo.getRouter()._getReference().toProperty(prefix + ".Router").forEach(function (value, key) {
              return properties.set(key, value);
            });
          }

          if (this._locatorInfo !== null) {
            this._locatorInfo.getLocator()._getReference().toProperty(prefix + ".Locator").forEach(function (value, key) {
              return properties.set(key, value);
            });
          }

          return properties;
        }
      }, {
        key: "hashCode",
        value: function hashCode() {
          if (!this._hashInitialized) {
            _get(_getPrototypeOf(RoutableReference.prototype), "hashCode", this).call(this); // Initializes _hashValue.


            this._hashValue = HashUtil.addString(this._hashValue, this._adapterId);
          }

          return this._hashValue;
        }
      }, {
        key: "equals",
        value: function equals(rhs) {
          if (this === rhs) {
            return true;
          }

          if (!(rhs instanceof RoutableReference)) {
            return false;
          }

          if (!_get(_getPrototypeOf(RoutableReference.prototype), "equals", this).call(this, rhs)) {
            return false;
          }

          if (this._locatorInfo === null ? rhs._locatorInfo !== null : !this._locatorInfo.equals(rhs._locatorInfo)) {
            return false;
          }

          if (this._routerInfo === null ? rhs._routerInfo !== null : !this._routerInfo.equals(rhs._routerInfo)) {
            return false;
          }

          if (this._cacheConnection !== rhs._cacheConnection) {
            return false;
          }

          if (this._preferSecure !== rhs._preferSecure) {
            return false;
          }

          if (this._endpointSelection !== rhs._endpointSelection) {
            return false;
          }

          if (this._locatorCacheTimeout !== rhs._locatorCacheTimeout) {
            return false;
          }

          if (this._connectionId !== rhs._connectionId) {
            return false;
          }

          if (this._overrideTimeout !== rhs._overrideTimeout) {
            return false;
          }

          if (this._overrideTimeout && this._timeout !== rhs._timeout) {
            return false;
          }

          if (!ArrayUtil.equals(this._endpoints, rhs._endpoints, function (e1, e2) {
            return e1.equals(e2);
          })) {
            return false;
          }

          if (this._adapterId !== rhs._adapterId) {
            return false;
          }

          return true;
        }
      }, {
        key: "getRequestHandler",
        value: function getRequestHandler(proxy) {
          return this._instance.requestHandlerFactory().getRequestHandler(this, proxy);
        }
      }, {
        key: "getBatchRequestQueue",
        value: function getBatchRequestQueue() {
          return new BatchRequestQueue(this._instance, this._mode === RefMode.ModeBatchDatagram);
        }
      }, {
        key: "getConnection",
        value: function getConnection() {
          var _this107 = this;

          var p = new Ice.Promise(); // success callback receives (connection)

          if (this._routerInfo !== null) {
            //
            // If we route, we send everything to the router's client
            // proxy endpoints.
            //
            this._routerInfo.getClientEndpoints().then(function (endpts) {
              if (endpts.length > 0) {
                _this107.applyOverrides(endpts);

                _this107.createConnection(endpts).then(p.resolve, p.reject);
              } else {
                _this107.getConnectionNoRouterInfo(p);
              }
            }).catch(p.reject);
          } else {
            this.getConnectionNoRouterInfo(p);
          }

          return p;
        }
      }, {
        key: "getConnectionNoRouterInfo",
        value: function getConnectionNoRouterInfo(p) {
          var _this108 = this;

          if (this._endpoints.length > 0) {
            this.createConnection(this._endpoints).then(p.resolve).catch(p.reject);
            return;
          }

          if (this._locatorInfo !== null) {
            this._locatorInfo.getEndpoints(this, null, this._locatorCacheTimeout).then(function (values) {
              var _values = _slicedToArray(values, 2),
                  endpoints = _values[0],
                  cached = _values[1];

              if (endpoints.length === 0) {
                p.reject(new Ice.NoEndpointException(_this108.toString()));
                return;
              }

              _this108.applyOverrides(endpoints);

              _this108.createConnection(endpoints).then(p.resolve, function (ex) {
                if (ex instanceof Ice.NoEndpointException) {
                  //
                  // No need to retry if there's no endpoints.
                  //
                  p.reject(ex);
                } else {
                  Debug.assert(_this108._locatorInfo !== null);

                  _this108.getLocatorInfo().clearCache(_this108);

                  if (cached) {
                    var traceLevels = _this108.getInstance().traceLevels();

                    if (traceLevels.retry >= 2) {
                      _this108.getInstance().initializationData().logger.trace(traceLevels.retryCat, "connection to cached endpoints failed\n" + "removing endpoints from cache and trying again\n" + ex.toString());
                    }

                    _this108.getConnectionNoRouterInfo(p); // Retry.


                    return;
                  }

                  p.reject(ex);
                }
              });
            }).catch(p.reject);
          } else {
            p.reject(new Ice.NoEndpointException(this.toString()));
          }
        }
      }, {
        key: "clone",
        value: function clone() {
          var r = new RoutableReference(this.getInstance(), this.getCommunicator(), this.getIdentity(), this.getFacet(), this.getMode(), this.getSecure(), this.getProtocol(), this.getEncoding(), this._endpoints, this._adapterId, this._locatorInfo, this._routerInfo, this._cacheConnection, this._preferSecure, this._endpointSelection, this._locatorCacheTimeout, this._invocationTimeout);
          this.copyMembers(r);
          return r;
        }
      }, {
        key: "copyMembers",
        value: function copyMembers(rhs) {
          //
          // Copy the members that are not passed to the constructor.
          //
          _get(_getPrototypeOf(RoutableReference.prototype), "copyMembers", this).call(this, rhs);

          rhs._overrideTimeout = this._overrideTimeout;
          rhs._timeout = this._timeout;
          rhs._connectionId = this._connectionId;
        }
      }, {
        key: "applyOverrides",
        value: function applyOverrides(endpts) {
          //
          // Apply the endpoint overrides to each endpoint.
          //
          for (var i = 0; i < endpts.length; ++i) {
            endpts[i] = endpts[i].changeConnectionId(this._connectionId);

            if (this._overrideTimeout) {
              endpts[i] = endpts[i].changeTimeout(this._timeout);
            }
          }
        }
      }, {
        key: "filterEndpoints",
        value: function filterEndpoints(allEndpoints) {
          //
          // Filter out opaque endpoints or endpoints which can't connect.
          //
          var endpoints = allEndpoints.filter(function (e) {
            return !(e instanceof OpaqueEndpointI) && e.connectable();
          }); //
          // Filter out endpoints according to the mode of the reference.
          //

          switch (this.getMode()) {
            case RefMode.ModeTwoway:
            case RefMode.ModeOneway:
            case RefMode.ModeBatchOneway:
              {
                //
                // Filter out datagram endpoints.
                //
                endpoints = endpoints.filter(function (e) {
                  return !e.datagram();
                });
                break;
              }

            case RefMode.ModeDatagram:
            case RefMode.ModeBatchDatagram:
              {
                //
                // Filter out non-datagram endpoints.
                //
                endpoints = endpoints.filter(function (e) {
                  return e.datagram();
                });
                break;
              }

            default:
              {
                Debug.assert(false);
                break;
              }
          } //
          // Sort the endpoints according to the endpoint selection type.
          //


          switch (this.getEndpointSelection()) {
            case EndpointSelectionType.Random:
              {
                //
                // Shuffle the endpoints.
                //
                ArrayUtil.shuffle(endpoints);
                break;
              }

            case EndpointSelectionType.Ordered:
              {
                // Nothing to do.
                break;
              }

            default:
              {
                Debug.assert(false);
                break;
              }
          } //
          // If a secure connection is requested or secure overrides is
          // set, remove all non-secure endpoints. Otherwise if preferSecure is set
          // make secure endpoints prefered. By default make non-secure
          // endpoints preferred over secure endpoints.
          //


          var overrides = this.getInstance().defaultsAndOverrides();

          if (overrides.overrideSecure ? overrides.overrideSecureValue : this.getSecure()) {
            endpoints = endpoints.filter(function (e) {
              return e.secure();
            });
          } else {
            var preferSecure = this.getPreferSecure();

            var compare = function compare(e1, e2) {
              var ls = e1.secure();
              var rs = e2.secure();

              if (ls && rs || !ls && !rs) {
                return 0;
              } else if (!ls && rs) {
                return preferSecure ? 1 : -1;
              } else {
                return preferSecure ? -1 : 1;
              }
            };

            endpoints.sort(compare);
          }

          return endpoints;
        }
      }, {
        key: "createConnection",
        value: function createConnection(allEndpoints) {
          var endpoints = this.filterEndpoints(allEndpoints);

          if (endpoints.length === 0) {
            return Ice.Promise.reject(new Ice.NoEndpointException(this.toString()));
          } //
          // Finally, create the connection.
          //


          var promise = new Ice.Promise();
          var factory = this.getInstance().outgoingConnectionFactory();

          if (this.getCacheConnection() || endpoints.length == 1) {
            //
            // Get an existing connection or create one if there's no
            // existing connection to one of the given endpoints.
            //
            var cb = new CreateConnectionCallback(this, null, promise);
            factory.create(endpoints, false, this.getEndpointSelection()).then(function (connection) {
              return cb.setConnection(connection);
            }).catch(function (ex) {
              return cb.setException(ex);
            });
          } else {
            //
            // Go through the list of endpoints and try to create the
            // connection until it succeeds. This is different from just
            // calling create() with the given endpoints since this might
            // create a new connection even if there's an existing
            // connection for one of the endpoints.
            //
            var _cb = new CreateConnectionCallback(this, endpoints, promise);

            factory.create([endpoints[0]], true, this.getEndpointSelection()).then(function (connection) {
              return _cb.setConnection(connection);
            }).catch(function (ex) {
              return _cb.setException(ex);
            });
          }

          return promise;
        }
      }]);

      return RoutableReference;
    }(Reference);

    Ice.RoutableReference = RoutableReference;

    var CreateConnectionCallback =
    /*#__PURE__*/
    function () {
      function CreateConnectionCallback(r, endpoints, promise) {
        _classCallCheck(this, CreateConnectionCallback);

        this.ref = r;
        this.endpoints = endpoints;
        this.promise = promise;
        this.i = 0;
        this.exception = null;
      }

      _createClass(CreateConnectionCallback, [{
        key: "setConnection",
        value: function setConnection(connection) {
          //
          // If we have a router, set the object adapter for this router
          // (if any) to the new connection, so that callbacks from the
          // router can be received over this new connection.
          //
          if (this.ref.getRouterInfo() !== null && this.ref.getRouterInfo().getAdapter() !== null) {
            connection.setAdapter(this.ref.getRouterInfo().getAdapter());
          }

          this.promise.resolve(connection);
        }
      }, {
        key: "setException",
        value: function setException(ex) {
          var _this109 = this;

          if (this.exception === null) {
            this.exception = ex;
          }

          if (this.endpoints === null || ++this.i === this.endpoints.length) {
            this.promise.reject(this.exception);
            return;
          }

          this.ref.getInstance().outgoingConnectionFactory().create([this.endpoints[this.i]], this.i != this.endpoints.length - 1, this.ref.getEndpointSelection()).then(function (connection) {
            return _this109.setConnection(connection);
          }).catch(function (ex) {
            return _this109.setException(ex);
          });
        }
      }]);

      return CreateConnectionCallback;
    }();
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var HashUtil = Ice.HashUtil;
    var EndpointI = Ice.EndpointI;

    var WSEndpoint =
    /*#__PURE__*/
    function (_EndpointI) {
      _inherits(WSEndpoint, _EndpointI);

      function WSEndpoint(instance, del, re) {
        var _this110;

        _classCallCheck(this, WSEndpoint);

        _this110 = _possibleConstructorReturn(this, _getPrototypeOf(WSEndpoint).call(this));
        _this110._instance = instance;
        _this110._delegate = del;
        _this110._resource = re || "/";
        return _this110;
      }

      _createClass(WSEndpoint, [{
        key: "getInfo",
        value: function getInfo() {
          var _this111 = this;

          var info = new Ice.WSEndpointInfo();

          info.type = function () {
            return _this111.type();
          };

          info.datagram = function () {
            return _this111.datagram();
          };

          info.secure = function () {
            return _this111.secure();
          };

          info.resource = this._resource;
          info.underlying = this._delegate.getInfo();
          info.timeout = info.underlying.timeout;
          info.compress = info.underlying.compress;
          return info;
        }
      }, {
        key: "type",
        value: function type() {
          return this._delegate.type();
        }
      }, {
        key: "protocol",
        value: function protocol() {
          return this._delegate.protocol();
        }
      }, {
        key: "streamWrite",
        value: function streamWrite(s) {
          s.startEncapsulation();

          this._delegate.streamWriteImpl(s);

          s.writeString(this._resource);
          s.endEncapsulation();
        }
      }, {
        key: "timeout",
        value: function timeout() {
          return this._delegate.timeout();
        }
      }, {
        key: "changeTimeout",
        value: function changeTimeout(timeout) {
          if (timeout === this._delegate.timeout()) {
            return this;
          } else {
            return new WSEndpoint(this._instance, this._delegate.changeTimeout(timeout), this._resource);
          }
        }
      }, {
        key: "changeConnectionId",
        value: function changeConnectionId(connectionId) {
          if (connectionId === this._delegate.connectionId()) {
            return this;
          } else {
            return new WSEndpoint(this._instance, this._delegate.changeConnectionId(connectionId), this._resource);
          }
        }
      }, {
        key: "compress",
        value: function compress() {
          return this._delegate.compress();
        }
      }, {
        key: "changeCompress",
        value: function changeCompress(compress) {
          if (compress === this._delegate.compress()) {
            return this;
          } else {
            return new WSEndpoint(this._instance, this._delegate.changeCompress(compress), this._resource);
          }
        }
      }, {
        key: "datagram",
        value: function datagram() {
          return this._delegate.datagram();
        }
      }, {
        key: "secure",
        value: function secure() {
          return this._delegate.secure();
        }
      }, {
        key: "connect",
        value: function connect() {
          return Ice.WSTransceiver.createOutgoing(this._instance, this._delegate.secure(), this._delegate.getAddress(), this._resource);
        }
      }, {
        key: "hashCode",
        value: function hashCode() {
          if (this._hashCode === undefined) {
            this._hashCode = this._delegate.hashCode();
            this._hashCode = HashUtil.addString(this._hashCode, this._resource);
          }

          return this._hashCode;
        }
      }, {
        key: "compareTo",
        value: function compareTo(p) {
          if (this === p) {
            return 0;
          }

          if (p === null) {
            return 1;
          }

          if (!(p instanceof WSEndpoint)) {
            return this.type() < p.type() ? -1 : 1;
          }

          var r = this._delegate.compareTo(p._delegate);

          if (r !== 0) {
            return r;
          }

          if (this._resource !== p._resource) {
            return this._resource < p._resource ? -1 : 1;
          }

          return 0;
        }
      }, {
        key: "options",
        value: function options() {
          //
          // WARNING: Certain features, such as proxy validation in Glacier2,
          // depend on the format of proxy strings. Changes to toString() and
          // methods called to generate parts of the reference string could break
          // these features. Please review for all features that depend on the
          // format of proxyToString() before changing this and related code.
          //
          var s = this._delegate.options();

          if (this._resource !== null && this._resource.length > 0) {
            s += " -r ";
            s += this._resource.indexOf(':') !== -1 ? "\"" + this._resource + "\"" : this._resource;
          }

          return s;
        }
      }, {
        key: "toConnectorString",
        value: function toConnectorString() {
          return this._delegate.toConnectorString();
        }
      }, {
        key: "initWithStream",
        value: function initWithStream(s) {
          this._resource = s.readString();
        }
      }, {
        key: "checkOption",
        value: function checkOption(option, argument, endpoint) {
          if (option === "-r") {
            if (argument === null) {
              throw new Ice.EndpointParseException("no argument provided for -r option in endpoint " + endpoint);
            }

            this._resource = argument;
          } else {
            return false;
          }

          return true;
        }
      }, {
        key: "connectable",
        value: function connectable() {
          return typeof Ice.WSTransceiver !== "undefined";
        }
      }]);

      return WSEndpoint;
    }(EndpointI);

    Ice.WSEndpoint = WSEndpoint;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Debug = Ice.Debug;
    var StringUtil = Ice.StringUtil;
    var HashMap = Ice.HashMap; //
    // Only for use by Ice.ObjectAdatperI.
    //

    var ServantManager =
    /*#__PURE__*/
    function () {
      function ServantManager(instance, adapterName) {
        _classCallCheck(this, ServantManager);

        this._instance = instance;
        this._adapterName = adapterName; // Map<Ice.Identity, Map<String, Ice.Object> >

        this._servantMapMap = new HashMap(HashMap.compareEquals); // Map<String, Ice.Object>

        this._defaultServantMap = new Map(); // Map<String, Ice.ServantLocator>

        this._locatorMap = new Map();
      }

      _createClass(ServantManager, [{
        key: "addServant",
        value: function addServant(servant, ident, facet) {
          Debug.assert(this._instance !== null); // Must not be called after destruction.

          if (facet === null) {
            facet = "";
          }

          var m = this._servantMapMap.get(ident);

          if (m === undefined) {
            m = new Map();

            this._servantMapMap.set(ident, m);
          } else if (m.has(facet)) {
            var ex = new Ice.AlreadyRegisteredException();
            ex.id = Ice.identityToString(ident, this._instance.toStringMode());
            ex.kindOfObject = "servant";

            if (facet.length > 0) {
              ex.id += " -f " + StringUtil.escapeString(facet, "", this._instance.toStringMode());
            }

            throw ex;
          }

          m.set(facet, servant);
        }
      }, {
        key: "addDefaultServant",
        value: function addDefaultServant(servant, category) {
          Debug.assert(this._instance !== null); // Must not be called after destruction

          if (this._defaultServantMap.has(category)) {
            var ex = new Ice.AlreadyRegisteredException();
            ex.kindOfObject = "default servant";
            ex.id = category;
            throw ex;
          }

          this._defaultServantMap.set(category, servant);
        }
      }, {
        key: "removeServant",
        value: function removeServant(ident, facet) {
          Debug.assert(this._instance !== null); // Must not be called after destruction.

          if (facet === null) {
            facet = "";
          }

          var m = this._servantMapMap.get(ident);

          if (m === undefined || !m.has(facet)) {
            var ex = new Ice.NotRegisteredException();
            ex.id = Ice.identityToString(ident, this._instance.toStringMode());
            ex.kindOfObject = "servant";

            if (facet.length > 0) {
              ex.id += " -f " + StringUtil.escapeString(facet, "", this._instance.toStringMode());
            }

            throw ex;
          }

          var obj = m.get(facet);
          m.delete(facet);

          if (m.size === 0) {
            this._servantMapMap.delete(ident);
          }

          return obj;
        }
      }, {
        key: "removeDefaultServant",
        value: function removeDefaultServant(category) {
          Debug.assert(this._instance !== null); // Must not be called after destruction.

          var obj = this._defaultServantMap.get(category);

          if (obj === undefined) {
            var ex = new Ice.NotRegisteredException();
            ex.kindOfObject = "default servant";
            ex.id = category;
            throw ex;
          }

          this._defaultServantMap.delete(category);

          return obj;
        }
      }, {
        key: "removeAllFacets",
        value: function removeAllFacets(ident) {
          Debug.assert(this._instance !== null); // Must not be called after destruction.

          var m = this._servantMapMap.get(ident);

          if (m === undefined) {
            var ex = new Ice.NotRegisteredException();
            ex.id = Ice.identityToString(ident, this._instance.toStringMode());
            ex.kindOfObject = "servant";
            throw ex;
          }

          this._servantMapMap.delete(ident);

          return m;
        }
      }, {
        key: "findServant",
        value: function findServant(ident, facet) {
          if (facet === null) {
            facet = "";
          }

          var m = this._servantMapMap.get(ident);

          var obj = null;

          if (m === undefined) {
            obj = this._defaultServantMap.get(ident.category);

            if (obj === undefined) {
              obj = this._defaultServantMap.get("");
            }
          } else {
            obj = m.get(facet);
          }

          return obj === undefined ? null : obj;
        }
      }, {
        key: "findDefaultServant",
        value: function findDefaultServant(category) {
          Debug.assert(this._instance !== null); // Must not be called after destruction.

          var ds = this._defaultServantMap.get(category);

          return ds === undefined ? null : ds;
        }
      }, {
        key: "findAllFacets",
        value: function findAllFacets(ident) {
          Debug.assert(this._instance !== null); // Must not be called after destruction.

          var m = this._servantMapMap.get(ident);

          if (m !== undefined) {
            return new Map(m);
          }

          return new Map();
        }
      }, {
        key: "hasServant",
        value: function hasServant(ident) {
          var m = this._servantMapMap.get(ident);

          if (m === undefined) {
            return false;
          } else {
            Debug.assert(m.size > 0);
            return true;
          }
        }
      }, {
        key: "addServantLocator",
        value: function addServantLocator(locator, category) {
          Debug.assert(this._instance !== null); // Must not be called after destruction.

          if (this._locatorMap.has(category)) {
            var ex = new Ice.AlreadyRegisteredException();
            ex.id = StringUtil.escapeString(category, "", this._instance.toStringMode());
            ex.kindOfObject = "servant locator";
            throw ex;
          }

          this._locatorMap.set(category, locator);
        }
      }, {
        key: "removeServantLocator",
        value: function removeServantLocator(category) {
          Debug.assert(this._instance !== null); // Must not be called after destruction.

          var l = this._locatorMap.get(category);

          if (l === undefined) {
            var ex = new Ice.NotRegisteredException();
            ex.id = StringUtil.escapeString(category, "", this._instance.toStringMode());
            ex.kindOfObject = "servant locator";
            throw ex;
          }

          this._locatorMap.delete(category);

          return l;
        }
      }, {
        key: "findServantLocator",
        value: function findServantLocator(category) {
          var l = this._locatorMap.get(category);

          return l === undefined ? null : l;
        } //
        // Only for use by Ice.ObjectAdapterI.
        //

      }, {
        key: "destroy",
        value: function destroy() {
          Debug.assert(this._instance !== null); // Must not be called after destruction.

          var logger = this._instance.initializationData().logger;

          this._servantMapMap.clear();

          this._defaultServantMap.clear();

          var locatorMap = new Map(this._locatorMap);

          this._locatorMap.clear();

          this._instance = null;
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = locatorMap[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var _step8$value = _slicedToArray(_step8.value, 2),
                  key = _step8$value[0],
                  locator = _step8$value[1];

              try {
                locator.deactivate(key);
              } catch (ex) {
                logger.error("exception during locator deactivation:\nobject adapter: `" + this._adapterName + "'\nlocator category: `" + key + "'\n" + ex.toString());
              }
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
                _iterator8.return();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      }]);

      return ServantManager;
    }();

    Ice.ServantManager = ServantManager;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Context = Ice.Context;
    var InitializationException = Ice.InitializationException; //
    // The base class for all ImplicitContext implementations
    //

    var ImplicitContextI =
    /*#__PURE__*/
    function () {
      function ImplicitContextI() {
        _classCallCheck(this, ImplicitContextI);

        this._context = new Context();
      }

      _createClass(ImplicitContextI, [{
        key: "getContext",
        value: function getContext() {
          return new Context(this._context);
        }
      }, {
        key: "setContext",
        value: function setContext(context) {
          if (context !== null && context.size > 0) {
            this._context = new Context(context);
          } else {
            this._context.clear();
          }
        }
      }, {
        key: "containsKey",
        value: function containsKey(key) {
          if (key === null) {
            key = "";
          }

          return this._context.has(key);
        }
      }, {
        key: "get",
        value: function get(key) {
          if (key === null) {
            key = "";
          }

          var val = this._context.get(key);

          if (val === null) {
            val = "";
          }

          return val;
        }
      }, {
        key: "put",
        value: function put(key, value) {
          if (key === null) {
            key = "";
          }

          if (value === null) {
            value = "";
          }

          var oldVal = this._context.get(key);

          if (oldVal === null) {
            oldVal = "";
          }

          this._context.set(key, value);

          return oldVal;
        }
      }, {
        key: "remove",
        value: function remove(key) {
          if (key === null) {
            key = "";
          }

          var val = this._context.get(key);

          this._context.delete(key);

          if (val === null) {
            val = "";
          }

          return val;
        }
      }, {
        key: "write",
        value: function write(prxContext, os) {
          if (prxContext.size === 0) {
            Ice.ContextHelper.write(os, this._context);
          } else {
            var ctx = null;

            if (this._context.size === 0) {
              ctx = prxContext;
            } else {
              ctx = new Context(this._context);
              var _iteratorNormalCompletion9 = true;
              var _didIteratorError9 = false;
              var _iteratorError9 = undefined;

              try {
                for (var _iterator9 = prxContext[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                  var _step9$value = _slicedToArray(_step9.value, 2),
                      key = _step9$value[0],
                      value = _step9$value[1];

                  ctx.set(key, value);
                }
              } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
                    _iterator9.return();
                  }
                } finally {
                  if (_didIteratorError9) {
                    throw _iteratorError9;
                  }
                }
              }
            }

            Ice.ContextHelper.write(os, ctx);
          }
        }
      }], [{
        key: "create",
        value: function create(kind) {
          if (kind.length === 0 || kind === "None") {
            return null;
          } else if (kind === "Shared") {
            return new ImplicitContextI();
          } else {
            throw new InitializationException("'" + kind + "' is not a valid value for Ice.ImplicitContext");
          }
        }
      }]);

      return ImplicitContextI;
    }();

    Ice.ImplicitContextI = ImplicitContextI;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Debug = Ice.Debug;
    var ObjectPrx = Ice.ObjectPrx;
    var StringUtil = Ice.StringUtil;
    var Identity = Ice.Identity; //
    // Only for use by Instance.
    //

    var ProxyFactory =
    /*#__PURE__*/
    function () {
      function ProxyFactory(instance) {
        _classCallCheck(this, ProxyFactory);

        this._instance = instance;

        var arr = this._instance.initializationData().properties.getPropertyAsList("Ice.RetryIntervals");

        if (arr.length > 0) {
          this._retryIntervals = [];

          for (var i = 0; i < arr.length; i++) {
            var v = void 0;

            try {
              v = StringUtil.toInt(arr[i]);
            } catch (ex) {
              v = 0;
            } //
            // If -1 is the first value, no retry and wait intervals.
            //


            if (i === 0 && v === -1) {
              break;
            }

            this._retryIntervals[i] = v > 0 ? v : 0;
          }
        } else {
          this._retryIntervals = [0];
        }
      }

      _createClass(ProxyFactory, [{
        key: "stringToProxy",
        value: function stringToProxy(str) {
          return this.referenceToProxy(this._instance.referenceFactory().createFromString(str, null));
        }
      }, {
        key: "proxyToString",
        value: function proxyToString(proxy) {
          return proxy === null ? "" : proxy._getReference().toString();
        }
      }, {
        key: "propertyToProxy",
        value: function propertyToProxy(prefix) {
          var proxy = this._instance.initializationData().properties.getProperty(prefix);

          var ref = this._instance.referenceFactory().createFromString(proxy, prefix);

          return this.referenceToProxy(ref);
        }
      }, {
        key: "proxyToProperty",
        value: function proxyToProperty(proxy, prefix) {
          return proxy === null ? new Map() : proxy._getReference().toProperty(prefix);
        }
      }, {
        key: "streamToProxy",
        value: function streamToProxy(s, type) {
          var ident = new Identity();

          ident._read(s);

          return this.referenceToProxy(this._instance.referenceFactory().createFromStream(ident, s), type);
        }
      }, {
        key: "referenceToProxy",
        value: function referenceToProxy(ref, type) {
          if (ref !== null) {
            var proxy = type ? new type() : new ObjectPrx();

            proxy._setup(ref);

            return proxy;
          } else {
            return null;
          }
        }
      }, {
        key: "checkRetryAfterException",
        value: function checkRetryAfterException(ex, ref, sleepInterval, cnt) {
          var traceLevels = this._instance.traceLevels();

          var logger = this._instance.initializationData().logger; //
          // We don't retry batch requests because the exception might have caused
          // the all the requests batched with the connection to be aborted and we
          // want the application to be notified.
          //


          if (ref.getMode() === Ice.Reference.ModeBatchOneway || ref.getMode() === Ice.Reference.ModeBatchDatagram) {
            throw ex;
          }

          if (ex instanceof Ice.ObjectNotExistException) {
            if (ref.getRouterInfo() !== null && ex.operation === "ice_add_proxy") {
              //
              // If we have a router, an ObjectNotExistException with an
              // operation name "ice_add_proxy" indicates to the client
              // that the router isn't aware of the proxy (for example,
              // because it was evicted by the router). In this case, we
              // must *always* retry, so that the missing proxy is added
              // to the router.
              //
              ref.getRouterInfo().clearCache(ref);

              if (traceLevels.retry >= 1) {
                logger.trace(traceLevels.retryCat, "retrying operation call to add proxy to router\n" + ex.toString());
              }

              if (sleepInterval !== null) {
                sleepInterval.value = 0;
              }

              return cnt; // We must always retry, so we don't look at the retry count.
            } else if (ref.isIndirect()) {
              //
              // We retry ObjectNotExistException if the reference is
              // indirect.
              //
              if (ref.isWellKnown()) {
                var li = ref.getLocatorInfo();

                if (li !== null) {
                  li.clearCache(ref);
                }
              }
            } else {
              //
              // For all other cases, we don't retry ObjectNotExistException.
              //
              throw ex;
            }
          } else if (ex instanceof Ice.RequestFailedException) {
            //
            // For all other cases, we don't retry ObjectNotExistException
            //
            throw ex;
          } //
          // There is no point in retrying an operation that resulted in a
          // MarshalException. This must have been raised locally (because
          // if it happened in a server it would result in an
          // UnknownLocalException instead), which means there was a problem
          // in this process that will not change if we try again.
          //
          // The most likely cause for a MarshalException is exceeding the
          // maximum message size, which is represented by the the subclass
          // MemoryLimitException. For example, a client can attempt to send
          // a message that exceeds the maximum memory size, or accumulate
          // enough batch requests without flushing that the maximum size is
          // reached.
          //
          // This latter case is especially problematic, because if we were
          // to retry a batch request after a MarshalException, we would in
          // fact silently discard the accumulated requests and allow new
          // batch requests to accumulate. If the subsequent batched
          // requests do not exceed the maximum message size, it appears to
          // the client that all of the batched requests were accepted, when
          // in reality only the last few are actually sent.
          //


          if (ex instanceof Ice.MarshalException) {
            throw ex;
          } //
          // Don't retry if the communicator is destroyed, object adapter is deactivated,
          // or connection is manually closed.
          //


          if (ex instanceof Ice.CommunicatorDestroyedException || ex instanceof Ice.ObjectAdapterDeactivatedException || ex instanceof Ice.ConnectionManuallyClosedException) {
            throw ex;
          } //
          // Don't retry invocation timeouts.
          //


          if (ex instanceof Ice.InvocationTimeoutException || ex instanceof Ice.InvocationCanceledException) {
            throw ex;
          }

          ++cnt;
          Debug.assert(cnt > 0);
          var interval;

          if (cnt === this._retryIntervals.length + 1 && ex instanceof Ice.CloseConnectionException) {
            //
            // A close connection exception is always retried at least once, even if the retry
            // limit is reached.
            //
            interval = 0;
          } else if (cnt > this._retryIntervals.length) {
            if (traceLevels.retry >= 1) {
              logger.trace(traceLevels.retryCat, "cannot retry operation call because retry limit has been exceeded\n" + ex.toString());
            }

            throw ex;
          } else {
            interval = this._retryIntervals[cnt - 1];
          }

          if (traceLevels.retry >= 1) {
            var msg = "retrying operation call";

            if (interval > 0) {
              msg += " in " + interval + "ms";
            }

            msg += " because of exception\n" + ex.toString();
            logger.trace(traceLevels.retryCat, msg);
          }

          Debug.assert(sleepInterval !== null);
          sleepInterval.value = interval;
          return cnt;
        }
      }]);

      return ProxyFactory;
    }();

    Ice.ProxyFactory = ProxyFactory;
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `CommunicatorF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ImplicitContextF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Local aliases.
    //
    var Debug = Ice.Debug;
    var InputStream = Ice.InputStream;
    var OutputStream = Ice.OutputStream;
    var EndpointParseException = Ice.EndpointParseException;
    var OpaqueEndpointI = Ice.OpaqueEndpointI;
    var Protocol = Ice.Protocol;
    var StringUtil = Ice.StringUtil;

    var EndpointFactoryManager =
    /*#__PURE__*/
    function () {
      function EndpointFactoryManager(instance) {
        _classCallCheck(this, EndpointFactoryManager);

        this._instance = instance;
        this._factories = [];
      }

      _createClass(EndpointFactoryManager, [{
        key: "add",
        value: function add(factory) {
          Debug.assert(this._factories.find(function (f) {
            return factory.type() == f.type();
          }) === undefined);

          this._factories.push(factory);
        }
      }, {
        key: "get",
        value: function get(type) {
          return this._factories.find(function (f) {
            return type == f.type();
          }) || null;
        }
      }, {
        key: "create",
        value: function create(str, oaEndpoint) {
          var s = str.trim();

          if (s.length === 0) {
            throw new EndpointParseException("value has no non-whitespace characters");
          }

          var arr = StringUtil.splitString(s, " \t\n\r");

          if (arr.length === 0) {
            throw new EndpointParseException("value has no non-whitespace characters");
          }

          var protocol = arr[0];
          arr.splice(0, 1);

          if (protocol === "default") {
            protocol = this._instance.defaultsAndOverrides().defaultProtocol;
          }

          for (var i = 0, length = this._factories.length; i < length; ++i) {
            if (this._factories[i].protocol() === protocol) {
              var e = this._factories[i].create(arr, oaEndpoint);

              if (arr.length > 0) {
                throw new EndpointParseException("unrecognized argument `" + arr[0] + "' in endpoint `" + str + "'");
              }

              return e;
            }
          } //
          // If the stringified endpoint is opaque, create an unknown endpoint,
          // then see whether the type matches one of the known endpoints.
          //


          if (protocol === "opaque") {
            var ue = new OpaqueEndpointI();
            ue.initWithOptions(arr);

            if (arr.length > 0) {
              throw new EndpointParseException("unrecognized argument `" + arr[0] + "' in endpoint `" + str + "'");
            }

            for (var _i11 = 0, _length = this._factories.length; _i11 < _length; ++_i11) {
              if (this._factories[_i11].type() == ue.type()) {
                //
                // Make a temporary stream, write the opaque endpoint data into the stream,
                // and ask the factory to read the endpoint data from that stream to create
                // the actual endpoint.
                //
                var os = new OutputStream(this._instance, Protocol.currentProtocolEncoding);
                os.writeShort(ue.type());
                ue.streamWrite(os);
                var is = new InputStream(this._instance, Protocol.currentProtocolEncoding, os.buffer);
                is.pos = 0;
                is.readShort(); // type

                is.startEncapsulation();

                var _e2 = this._factories[_i11].read(is);

                is.endEncapsulation();
                return _e2;
              }
            }

            return ue; // Endpoint is opaque, but we don't have a factory for its type.
          }

          return null;
        }
      }, {
        key: "read",
        value: function read(s) {
          var type = s.readShort();
          var factory = this.get(type);
          var e = null;
          s.startEncapsulation();

          if (factory) {
            e = factory.read(s);
          } //
          // If the factory failed to read the endpoint, return an opaque endpoint. This can
          // occur if for example the factory delegates to another factory and this factory
          // isn't available. In this case, the factory needs to make sure the stream position
          // is preserved for reading the opaque endpoint.
          //


          if (!e) {
            e = new OpaqueEndpointI(type);
            e.initWithStream(s);
          }

          s.endEncapsulation();
          return e;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._factories.forEach(function (factory) {
            return factory.destroy();
          });

          this._factories = [];
        }
      }]);

      return EndpointFactoryManager;
    }();

    Ice.EndpointFactoryManager = EndpointFactoryManager;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var FormatType = Ice.FormatType;
    var EndpointSelectionType = Ice.EndpointSelectionType;
    var Protocol = Ice.Protocol;

    var DefaultsAndOverrides = function DefaultsAndOverrides(properties, logger) {
      _classCallCheck(this, DefaultsAndOverrides);

      this.defaultProtocol = properties.getPropertyWithDefault("Ice.Default.Protocol", Ice.TcpEndpointFactory !== undefined ? "tcp" : "ws");
      var value = properties.getProperty("Ice.Default.Host");
      this.defaultHost = value.length > 0 ? value : null;
      value = properties.getProperty("Ice.Default.SourceAddress");
      this.defaultSourceAddress = value.length > 0 ? value : null;
      value = properties.getProperty("Ice.Override.Timeout");

      if (value.length > 0) {
        this.overrideTimeout = true;
        this.overrideTimeoutValue = properties.getPropertyAsInt("Ice.Override.Timeout");

        if (this.overrideTimeoutValue < 1 && this.overrideTimeoutValue !== -1) {
          this.overrideTimeoutValue = -1;
          logger.warning("invalid value for Ice.Override.Timeout `" + properties.getProperty("Ice.Override.Timeout") + "': defaulting to -1");
        }
      } else {
        this.overrideTimeout = false;
        this.overrideTimeoutValue = -1;
      }

      value = properties.getProperty("Ice.Override.ConnectTimeout");

      if (value.length > 0) {
        this.overrideConnectTimeout = true;
        this.overrideConnectTimeoutValue = properties.getPropertyAsInt("Ice.Override.ConnectTimeout");

        if (this.overrideConnectTimeoutValue < 1 && this.overrideConnectTimeoutValue !== -1) {
          this.overrideConnectTimeoutValue = -1;
          logger.warning("invalid value for Ice.Override.ConnectTimeout `" + properties.getProperty("Ice.Override.ConnectTimeout") + "': defaulting to -1");
        }
      } else {
        this.overrideConnectTimeout = false;
        this.overrideConnectTimeoutValue = -1;
      }

      value = properties.getProperty("Ice.Override.CloseTimeout");

      if (value.length > 0) {
        this.overrideCloseTimeout = true;
        this.overrideCloseTimeoutValue = properties.getPropertyAsInt("Ice.Override.CloseTimeout");

        if (this.overrideCloseTimeoutValue < 1 && this.overrideCloseTimeoutValue !== -1) {
          this.overrideCloseTimeoutValue = -1;
          logger.warning("invalid value for Ice.Override.CloseTimeout `" + properties.getProperty("Ice.Override.CloseTimeout") + "': defaulting to -1");
        }
      } else {
        this.overrideCloseTimeout = false;
        this.overrideCloseTimeoutValue = -1;
      }

      this.overrideSecure = false;
      value = properties.getPropertyWithDefault("Ice.Default.EndpointSelection", "Random");

      if (value === "Random") {
        this.defaultEndpointSelection = EndpointSelectionType.Random;
      } else if (value === "Ordered") {
        this.defaultEndpointSelection = EndpointSelectionType.Ordered;
      } else {
        var ex = new Ice.EndpointSelectionTypeParseException();
        ex.str = "illegal value `" + value + "'; expected `Random' or `Ordered'";
        throw ex;
      }

      this.defaultTimeout = properties.getPropertyAsIntWithDefault("Ice.Default.Timeout", 60000);

      if (this.defaultTimeout < 1 && this.defaultTimeout !== -1) {
        this.defaultTimeout = 60000;
        logger.warning("invalid value for Ice.Default.Timeout `" + properties.getProperty("Ice.Default.Timeout") + "': defaulting to 60000");
      }

      this.defaultLocatorCacheTimeout = properties.getPropertyAsIntWithDefault("Ice.Default.LocatorCacheTimeout", -1);

      if (this.defaultLocatorCacheTimeout < -1) {
        this.defaultLocatorCacheTimeout = -1;
        logger.warning("invalid value for Ice.Default.LocatorCacheTimeout `" + properties.getProperty("Ice.Default.LocatorCacheTimeout") + "': defaulting to -1");
      }

      this.defaultInvocationTimeout = properties.getPropertyAsIntWithDefault("Ice.Default.InvocationTimeout", -1);

      if (this.defaultInvocationTimeout < 1 && this.defaultInvocationTimeout !== -1) {
        this.defaultInvocationTimeout = -1;
        logger.warning("invalid value for Ice.Default.InvocationTimeout `" + properties.getProperty("Ice.Default.InvocationTimeout") + "': defaulting to -1");
      }

      this.defaultPreferSecure = properties.getPropertyAsIntWithDefault("Ice.Default.PreferSecure", 0) > 0;
      value = properties.getPropertyWithDefault("Ice.Default.EncodingVersion", Ice.encodingVersionToString(Protocol.currentEncoding));
      this.defaultEncoding = Ice.stringToEncodingVersion(value);
      Protocol.checkSupportedEncoding(this.defaultEncoding);
      var slicedFormat = properties.getPropertyAsIntWithDefault("Ice.Default.SlicedFormat", 0) > 0;
      this.defaultFormat = slicedFormat ? FormatType.SlicedFormat : FormatType.CompactFormat;
    };

    Ice.DefaultsAndOverrides = DefaultsAndOverrides;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Debug = Ice.Debug;
    var Protocol = Ice.Protocol;
    var LocatorRegistryPrx = Ice.LocatorRegisterPrx;
    var HashMap = Ice.HashMap;

    var LocatorInfo =
    /*#__PURE__*/
    function () {
      function LocatorInfo(locator, table, background) {
        _classCallCheck(this, LocatorInfo);

        this._locator = locator;
        this._locatorRegistry = null;
        this._table = table;
        this._background = background;
        this._adapterRequests = new Map(); // Map<String, Request>

        this._objectRequests = new HashMap(HashMap.compareEquals); // Map<Ice.Identity, Request>
      }

      _createClass(LocatorInfo, [{
        key: "destroy",
        value: function destroy() {
          this._locatorRegistry = null;

          this._table.clear();
        }
      }, {
        key: "equals",
        value: function equals(rhs) {
          if (this === rhs) {
            return true;
          }

          if (rhs instanceof LocatorInfo) {
            return this._locator.equals(rhs._locator);
          }

          return false;
        }
      }, {
        key: "hashCode",
        value: function hashCode() {
          return this._locator.hashCode();
        }
      }, {
        key: "getLocator",
        value: function getLocator() {
          return this._locator;
        }
      }, {
        key: "getLocatorRegistry",
        value: function getLocatorRegistry() {
          var _this112 = this;

          if (this._locatorRegistry !== null) {
            return Ice.Promise.resolve(this._locatorRegistry);
          }

          return this._locator.getRegistry().then(function (reg) {
            //
            // The locator registry can't be located. We use ordered
            // endpoint selection in case the locator returned a proxy
            // with some endpoints which are prefered to be tried first.
            //
            _this112._locatorRegistry = LocatorRegistryPrx.uncheckedCast(reg.ice_locator(null).ice_endpointSelection(Ice.EndpointSelectionType.Ordered));
            return _this112._locatorRegistry;
          });
        }
      }, {
        key: "getEndpoints",
        value: function getEndpoints(ref, wellKnownRef, ttl, p) {
          var promise = p || new Ice.Promise(); // success callback receives (endpoints, cached)

          Debug.assert(ref.isIndirect());
          var endpoints = null;
          var cached = {
            value: false
          };

          if (!ref.isWellKnown()) {
            endpoints = this._table.getAdapterEndpoints(ref.getAdapterId(), ttl, cached);

            if (!cached.value) {
              if (this._background && endpoints !== null) {
                this.getAdapterRequest(ref).addCallback(ref, wellKnownRef, ttl, null);
              } else {
                this.getAdapterRequest(ref).addCallback(ref, wellKnownRef, ttl, promise);
                return promise;
              }
            }
          } else {
            var r = this._table.getObjectReference(ref.getIdentity(), ttl, cached);

            if (!cached.value) {
              if (this._background && r !== null) {
                this.getObjectRequest(ref).addCallback(ref, null, ttl, null);
              } else {
                this.getObjectRequest(ref).addCallback(ref, null, ttl, promise);
                return promise;
              }
            }

            if (!r.isIndirect()) {
              endpoints = r.getEndpoints();
            } else if (!r.isWellKnown()) {
              if (ref.getInstance().traceLevels().location >= 1) {
                this.traceWellKnown("found adapter for well-known object in locator cache", ref, r);
              }

              this.getEndpoints(r, ref, ttl, promise);
              return promise;
            }
          }

          Debug.assert(endpoints !== null);

          if (ref.getInstance().traceLevels().location >= 1) {
            this.getEndpointsTrace(ref, endpoints, true);
          }

          promise.resolve([endpoints, true]);
          return promise;
        }
      }, {
        key: "clearCache",
        value: function clearCache(ref) {
          Debug.assert(ref.isIndirect());

          if (!ref.isWellKnown()) {
            var endpoints = this._table.removeAdapterEndpoints(ref.getAdapterId());

            if (endpoints !== null && ref.getInstance().traceLevels().location >= 2) {
              this.trace("removed endpoints for adapter from locator cache", ref, endpoints);
            }
          } else {
            var r = this._table.removeObjectReference(ref.getIdentity());

            if (r !== null) {
              if (!r.isIndirect()) {
                if (ref.getInstance().traceLevels().location >= 2) {
                  this.trace("removed endpoints for well-known object from locator cache", ref, r.getEndpoints());
                }
              } else if (!r.isWellKnown()) {
                if (ref.getInstance().traceLevels().location >= 2) {
                  this.traceWellKnown("removed adapter for well-known object from locator cache", ref, r);
                }

                this.clearCache(r);
              }
            }
          }
        }
      }, {
        key: "trace",
        value: function trace(msg, ref, endpoints) {
          Debug.assert(ref.isIndirect());
          var s = [];
          s.push(msg);
          s.push("\n");

          if (!ref.isWellKnown()) {
            s.push("adapter = ");
            s.push(ref.getAdapterId());
            s.push("\n");
          } else {
            s.push("well-known proxy = ");
            s.push(ref.toString());
            s.push("\n");
          }

          s.push("endpoints = ");
          s.push(endpoints.map(function (e) {
            return e.toString();
          }).join(":"));
          ref.getInstance().initializationData().logger.trace(ref.getInstance().traceLevels().locationCat, s.join(""));
        }
      }, {
        key: "traceWellKnown",
        value: function traceWellKnown(msg, ref, resolved) {
          Debug.assert(ref.isWellKnown());
          var s = [];
          s.push(msg);
          s.push("\n");
          s.push("well-known proxy = ");
          s.push(ref.toString());
          s.push("\n");
          s.push("adapter = ");
          s.push(resolved.getAdapterId());
          ref.getInstance().initializationData().logger.trace(ref.getInstance().traceLevels().locationCat, s.join(""));
        }
      }, {
        key: "getEndpointsException",
        value: function getEndpointsException(ref, exc) {
          Debug.assert(ref.isIndirect());
          var instance = ref.getInstance();

          try {
            throw exc;
          } catch (ex) {
            if (ex instanceof Ice.AdapterNotFoundException) {
              if (instance.traceLevels().location >= 1) {
                var s = [];
                s.push("adapter not found\n");
                s.push("adapter = ");
                s.push(ref.getAdapterId());
                instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
              }

              var e = new Ice.NotRegisteredException();
              e.kindOfObject = "object adapter";
              e.id = ref.getAdapterId();
              throw e;
            } else if (ex instanceof Ice.ObjectNotFoundException) {
              if (instance.traceLevels().location >= 1) {
                var _s4 = [];

                _s4.push("object not found\n");

                _s4.push("object = ");

                _s4.push(Ice.identityToString(ref.getIdentity(), instance.toStringMode()));

                instance.initializationData().logger.trace(instance.traceLevels().locationCat, _s4.join(""));
              }

              var _e3 = new Ice.NotRegisteredException();

              _e3.kindOfObject = "object";
              _e3.id = Ice.identityToString(ref.getIdentity(), instance.toStringMode());
              throw _e3;
            } else if (ex instanceof Ice.NotRegisteredException) {
              throw ex;
            } else if (ex instanceof Ice.LocalException) {
              if (instance.traceLevels().location >= 1) {
                var _s5 = [];

                _s5.push("couldn't contact the locator to retrieve endpoints\n");

                if (ref.getAdapterId().length > 0) {
                  _s5.push("adapter = ");

                  _s5.push(ref.getAdapterId());

                  _s5.push("\n");
                } else {
                  _s5.push("well-known proxy = ");

                  _s5.push(ref.toString());

                  _s5.push("\n");
                }

                _s5.push("reason = " + ex.toString());

                instance.initializationData().logger.trace(instance.traceLevels().locationCat, _s5.join(""));
              }

              throw ex;
            } else {
              Debug.assert(false);
            }
          }
        }
      }, {
        key: "getEndpointsTrace",
        value: function getEndpointsTrace(ref, endpoints, cached) {
          if (endpoints !== null && endpoints.length > 0) {
            if (cached) {
              if (ref.isWellKnown()) {
                this.trace("found endpoints for well-known proxy in locator cache", ref, endpoints);
              } else {
                this.trace("found endpoints for adapter in locator cache", ref, endpoints);
              }
            } else if (ref.isWellKnown()) {
              this.trace("retrieved endpoints for well-known proxy from locator, adding to locator cache", ref, endpoints);
            } else {
              this.trace("retrieved endpoints for adapter from locator, adding to locator cache", ref, endpoints);
            }
          } else {
            var instance = ref.getInstance();
            var s = [];
            s.push("no endpoints configured for ");

            if (ref.getAdapterId().length > 0) {
              s.push("adapter\n");
              s.push("adapter = ");
              s.push(ref.getAdapterId());
              s.push("\n");
            } else {
              s.push("well-known object\n");
              s.push("well-known proxy = ");
              s.push(ref.toString());
              s.push("\n");
            }

            instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
          }
        }
      }, {
        key: "getAdapterRequest",
        value: function getAdapterRequest(ref) {
          if (ref.getInstance().traceLevels().location >= 1) {
            var instance = ref.getInstance();
            var s = [];
            s.push("searching for adapter by id\n");
            s.push("adapter = ");
            s.push(ref.getAdapterId());
            instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
          }

          var request = this._adapterRequests.get(ref.getAdapterId());

          if (request !== undefined) {
            return request;
          }

          request = new AdapterRequest(this, ref);

          this._adapterRequests.set(ref.getAdapterId(), request);

          return request;
        }
      }, {
        key: "getObjectRequest",
        value: function getObjectRequest(ref) {
          if (ref.getInstance().traceLevels().location >= 1) {
            var instance = ref.getInstance();
            var s = [];
            s.push("searching for well-known object\n");
            s.push("well-known proxy = ");
            s.push(ref.toString());
            instance.initializationData().logger.trace(instance.traceLevels().locationCat, s.join(""));
          }

          var request = this._objectRequests.get(ref.getIdentity());

          if (request !== undefined) {
            return request;
          }

          request = new ObjectRequest(this, ref);

          this._objectRequests.set(ref.getIdentity(), request);

          return request;
        }
      }, {
        key: "finishRequest",
        value: function finishRequest(ref, wellKnownRefs, proxy, notRegistered) {
          if (proxy === null || proxy._getReference().isIndirect()) {
            //
            // Remove the cached references of well-known objects for which we tried
            // to resolved the endpoints if these endpoints are empty.
            //
            for (var i = 0; i < wellKnownRefs.length; ++i) {
              this._table.removeObjectReference(wellKnownRefs[i].getIdentity());
            }
          }

          if (!ref.isWellKnown()) {
            if (proxy !== null && !proxy._getReference().isIndirect()) {
              // Cache the adapter endpoints.
              this._table.addAdapterEndpoints(ref.getAdapterId(), proxy._getReference().getEndpoints());
            } else if (notRegistered) // If the adapter isn't registered anymore, remove it from the cache.
              {
                this._table.removeAdapterEndpoints(ref.getAdapterId());
              }

            Debug.assert(this._adapterRequests.has(ref.getAdapterId()));

            this._adapterRequests.delete(ref.getAdapterId());
          } else {
            if (proxy !== null && !proxy._getReference().isWellKnown()) {
              // Cache the well-known object reference.
              this._table.addObjectReference(ref.getIdentity(), proxy._getReference());
            } else if (notRegistered) // If the well-known object isn't registered anymore, remove it from the cache.
              {
                this._table.removeObjectReference(ref.getIdentity());
              }

            Debug.assert(this._objectRequests.has(ref.getIdentity()));

            this._objectRequests.delete(ref.getIdentity());
          }
        }
      }]);

      return LocatorInfo;
    }();

    Ice.LocatorInfo = LocatorInfo;

    var RequestCallback =
    /*#__PURE__*/
    function () {
      function RequestCallback(ref, ttl, promise) {
        _classCallCheck(this, RequestCallback);

        this._ref = ref;
        this._ttl = ttl;
        this._promise = promise;
      }

      _createClass(RequestCallback, [{
        key: "response",
        value: function response(locatorInfo, proxy) {
          var _this113 = this;

          var endpoints = null;

          if (proxy !== null) {
            var r = proxy._getReference();

            if (this._ref.isWellKnown() && !Protocol.isSupported(this._ref.getEncoding(), r.getEncoding())) {//
              // If a well-known proxy and the returned proxy
              // encoding isn't supported, we're done: there's
              // no compatible endpoint we can use.
              //
            } else if (!r.isIndirect()) {
              endpoints = r.getEndpoints();
            } else if (this._ref.isWellKnown() && !r.isWellKnown()) {
              //
              // We're resolving the endpoints of a well-known object and the proxy returned
              // by the locator is an indirect proxy. We now need to resolve the endpoints
              // of this indirect proxy.
              //
              if (this._ref.getInstance().traceLevels().location >= 1) {
                locatorInfo.traceWellKnown("retrieved adapter for well-known object from locator, " + "adding to locator cache", this._ref, r);
              }

              locatorInfo.getEndpoints(r, this._ref, this._ttl).then(function (values) {
                if (_this113._promise !== null) {
                  _this113._promise.resolve(values);
                }
              }, function (ex) {
                if (_this113._promise !== null) {
                  _this113._promise.reject(ex);
                }
              });
              return;
            }
          }

          if (this._ref.getInstance().traceLevels().location >= 1) {
            locatorInfo.getEndpointsTrace(this._ref, endpoints, false);
          }

          if (this._promise !== null) {
            this._promise.resolve(endpoints === null ? [[], false] : [endpoints, false]);
          }
        }
      }, {
        key: "exception",
        value: function exception(locatorInfo, exc) {
          try {
            locatorInfo.getEndpointsException(this._ref, exc); // This throws.
          } catch (ex) {
            if (this._promise !== null) {
              this._promise.reject(ex);
            }
          }
        }
      }]);

      return RequestCallback;
    }();

    var Request =
    /*#__PURE__*/
    function () {
      function Request(locatorInfo, ref) {
        _classCallCheck(this, Request);

        this._locatorInfo = locatorInfo;
        this._ref = ref;
        this._callbacks = []; // Array<RequestCallback>

        this._wellKnownRefs = []; // Array<Reference>

        this._sent = false;
        this._response = false;
        this._proxy = null;
        this._exception = null;
      }

      _createClass(Request, [{
        key: "addCallback",
        value: function addCallback(ref, wellKnownRef, ttl, promise) {
          var callback = new RequestCallback(ref, ttl, promise);

          if (this._response) {
            callback.response(this._locatorInfo, this._proxy);
          } else if (this._exception !== null) {
            callback.exception(this._locatorInfo, this._exception);
          } else {
            this._callbacks.push(callback);

            if (wellKnownRef !== null) // This request is to resolve the endpoints of a cached well-known object ref
              {
                this._wellKnownRefs.push(wellKnownRef);
              }

            if (!this._sent) {
              this._sent = true;
              this.send();
            }
          }
        }
      }, {
        key: "response",
        value: function response(proxy) {
          this._locatorInfo.finishRequest(this._ref, this._wellKnownRefs, proxy, false);

          this._response = true;
          this._proxy = proxy;

          for (var i = 0; i < this._callbacks.length; ++i) {
            this._callbacks[i].response(this._locatorInfo, proxy);
          }
        }
      }, {
        key: "exception",
        value: function exception(ex) {
          this._locatorInfo.finishRequest(this._ref, this._wellKnownRefs, null, ex instanceof Ice.UserException);

          this._exception = ex;

          for (var i = 0; i < this._callbacks.length; ++i) {
            this._callbacks[i].exception(this._locatorInfo, ex);
          }
        }
      }]);

      return Request;
    }();

    var ObjectRequest =
    /*#__PURE__*/
    function (_Request) {
      _inherits(ObjectRequest, _Request);

      function ObjectRequest(locatorInfo, reference) {
        var _this114;

        _classCallCheck(this, ObjectRequest);

        _this114 = _possibleConstructorReturn(this, _getPrototypeOf(ObjectRequest).call(this, locatorInfo, reference));
        Debug.assert(reference.isWellKnown());
        return _this114;
      }

      _createClass(ObjectRequest, [{
        key: "send",
        value: function send() {
          var _this115 = this;

          try {
            this._locatorInfo.getLocator().findObjectById(this._ref.getIdentity()).then(function (proxy) {
              return _this115.response(proxy);
            }, function (ex) {
              return _this115.exception(ex);
            });
          } catch (ex) {
            this.exception(ex);
          }
        }
      }]);

      return ObjectRequest;
    }(Request);

    var AdapterRequest =
    /*#__PURE__*/
    function (_Request2) {
      _inherits(AdapterRequest, _Request2);

      function AdapterRequest(locatorInfo, reference) {
        var _this116;

        _classCallCheck(this, AdapterRequest);

        _this116 = _possibleConstructorReturn(this, _getPrototypeOf(AdapterRequest).call(this, locatorInfo, reference));
        Debug.assert(reference.isIndirect());
        return _this116;
      }

      _createClass(AdapterRequest, [{
        key: "send",
        value: function send() {
          var _this117 = this;

          try {
            this._locatorInfo.getLocator().findAdapterById(this._ref.getAdapterId()).then(function (proxy) {
              return _this117.response(proxy);
            }, function (ex) {
              return _this117.exception(ex);
            });
          } catch (ex) {
            this.exception(ex);
          }
        }
      }]);

      return AdapterRequest;
    }(Request);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `PropertiesAdmin.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
    Slice.defineDictionary(Ice, "PropertyDict", "PropertyDictHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
    var iceC_Ice_PropertiesAdmin_ids = ["::Ice::Object", "::Ice::PropertiesAdmin"];
    /**
     * The PropertiesAdmin interface provides remote access to the properties
     * of a communicator.
     *
     **/

    Ice.PropertiesAdmin =
    /*#__PURE__*/
    function (_Ice$Object7) {
      _inherits(_class111, _Ice$Object7);

      function _class111() {
        _classCallCheck(this, _class111);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class111).apply(this, arguments));
      }

      return _class111;
    }(Ice.Object);

    Ice.PropertiesAdminPrx =
    /*#__PURE__*/
    function (_Ice$ObjectPrx7) {
      _inherits(_class112, _Ice$ObjectPrx7);

      function _class112() {
        _classCallCheck(this, _class112);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class112).apply(this, arguments));
      }

      return _class112;
    }(Ice.ObjectPrx);

    Slice.defineOperations(Ice.PropertiesAdmin, Ice.PropertiesAdminPrx, iceC_Ice_PropertiesAdmin_ids, 1, {
      "getProperty": [,,,, [7], [[7]],,,,],
      "getPropertiesForPrefix": [,,,, ["Ice.PropertyDictHelper"], [[7]],,,,],
      "setProperties": [,,,,, [["Ice.PropertyDictHelper"]],,,,]
    });
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `LoggerF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var HashMap = Ice.HashMap;
    var LocatorInfo = Ice.LocatorInfo;
    var LocatorTable = Ice.LocatorTable;
    var LocatorPrx = Ice.LocatorPrx;

    var LocatorManager =
    /*#__PURE__*/
    function () {
      function LocatorManager(properties) {
        _classCallCheck(this, LocatorManager);

        this._background = properties.getPropertyAsInt("Ice.BackgroundLocatorCacheUpdates") > 0;
        this._table = new HashMap(HashMap.compareEquals); // Map<Ice.LocatorPrx, LocatorInfo>

        this._locatorTables = new HashMap(HashMap.compareEquals); // Map<Ice.Identity, LocatorTable>
      }

      _createClass(LocatorManager, [{
        key: "destroy",
        value: function destroy() {
          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (var _iterator10 = this._table.values()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              var locator = _step10.value;
              locator.destroy();
            }
          } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
                _iterator10.return();
              }
            } finally {
              if (_didIteratorError10) {
                throw _iteratorError10;
              }
            }
          }

          this._table.clear();

          this._locatorTables.clear();
        } //
        // Returns locator info for a given locator. Automatically creates
        // the locator info if it doesn't exist yet.
        //

      }, {
        key: "find",
        value: function find(loc) {
          if (loc === null) {
            return null;
          } //
          // The locator can't be located.
          //


          var locator = LocatorPrx.uncheckedCast(loc.ice_locator(null)); //
          // TODO: reap unused locator info objects?
          //

          var info = this._table.get(locator);

          if (info === undefined) {
            //
            // Rely on locator identity for the adapter table. We want to
            // have only one table per locator (not one per locator
            // proxy).
            //
            var table = this._locatorTables.get(locator.ice_getIdentity());

            if (table === undefined) {
              table = new LocatorTable();

              this._locatorTables.set(locator.ice_getIdentity(), table);
            }

            info = new LocatorInfo(locator, table, this._background);

            this._table.set(locator, info);
          }

          return info;
        }
      }]);

      return LocatorManager;
    }();

    Ice.LocatorManager = LocatorManager;
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ImplicitContext.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ObjectFactory.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var HashMap = Ice.HashMap;
    var RouterInfo = Ice.RouterInfo;
    var RouterPrx = Ice.RouterPrx;

    var RouterManager =
    /*#__PURE__*/
    function () {
      function RouterManager() {
        _classCallCheck(this, RouterManager);

        this._table = new HashMap(HashMap.compareEquals); // Map<Ice.RouterPrx, RouterInfo>
      }

      _createClass(RouterManager, [{
        key: "destroy",
        value: function destroy() {
          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = this._table.values()[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              var router = _step11.value;
              router.destroy();
            }
          } catch (err) {
            _didIteratorError11 = true;
            _iteratorError11 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
                _iterator11.return();
              }
            } finally {
              if (_didIteratorError11) {
                throw _iteratorError11;
              }
            }
          }

          this._table.clear();
        } //
        // Returns router info for a given router. Automatically creates
        // the router info if it doesn't exist yet.
        //

      }, {
        key: "find",
        value: function find(rtr) {
          if (rtr === null) {
            return null;
          } //
          // The router cannot be routed.
          //


          var router = RouterPrx.uncheckedCast(rtr.ice_router(null));

          var info = this._table.get(router);

          if (info === undefined) {
            info = new RouterInfo(router);

            this._table.set(router, info);
          }

          return info;
        }
      }, {
        key: "erase",
        value: function erase(rtr) {
          var info = null;

          if (rtr !== null) {
            // The router cannot be routed.
            var router = RouterPrx.uncheckedCast(rtr.ice_router(null));
            info = this._table.get(router);

            this._table.delete(router);
          }

          return info;
        }
      }]);

      return RouterManager;
    }();

    Ice.RouterManager = RouterManager;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var HashMap = Ice.HashMap;
    var ConnectRequestHandler = Ice.ConnectRequestHandler;

    var RequestHandlerFactory =
    /*#__PURE__*/
    function () {
      function RequestHandlerFactory(instance) {
        _classCallCheck(this, RequestHandlerFactory);

        this._instance = instance;
        this._handlers = new HashMap(HashMap.compareEquals);
      }

      _createClass(RequestHandlerFactory, [{
        key: "getRequestHandler",
        value: function getRequestHandler(ref, proxy) {
          var connect = false;
          var handler;

          if (ref.getCacheConnection()) {
            handler = this._handlers.get(ref);

            if (!handler) {
              handler = new ConnectRequestHandler(ref, proxy);

              this._handlers.set(ref, handler);

              connect = true;
            }
          } else {
            connect = true;
            handler = new ConnectRequestHandler(ref, proxy);
          }

          if (connect) {
            ref.getConnection().then(function (connection) {
              handler.setConnection(connection);
            }, function (ex) {
              handler.setException(ex);
            });
          }

          return proxy._setRequestHandler(handler.connect(proxy));
        }
      }, {
        key: "removeRequestHandler",
        value: function removeRequestHandler(ref, handler) {
          if (ref.getCacheConnection()) {
            if (this._handlers.get(ref) === handler) {
              this._handlers.delete(ref);
            }
          }
        }
      }]);

      return RequestHandlerFactory;
    }();

    Ice.RequestHandlerFactory = RequestHandlerFactory;
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `LocatorF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Properties.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Metrics.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
    Slice.defineDictionary(IceMX, "StringIntDict", "StringIntDictHelper", "Ice.StringHelper", "Ice.IntHelper", false, undefined, undefined);
    var iceC_IceMX_Metrics_ids = ["::Ice::Object", "::IceMX::Metrics"];
    /**
     * The base class for metrics. A metrics object represents a
     * collection of measurements associated to a given a system.
     *
     **/

    IceMX.Metrics =
    /*#__PURE__*/
    function (_Ice$Value3) {
      _inherits(_class113, _Ice$Value3);

      function _class113() {
        var _this118;

        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Ice.Long(0, 0);
        var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var totalLifetime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Ice.Long(0, 0);
        var failures = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

        _classCallCheck(this, _class113);

        _this118 = _possibleConstructorReturn(this, _getPrototypeOf(_class113).call(this));
        _this118.id = id;
        _this118.total = total;
        _this118.current = current;
        _this118.totalLifetime = totalLifetime;
        _this118.failures = failures;
        return _this118;
      }

      _createClass(_class113, [{
        key: "_iceWriteMemberImpl",
        value: function _iceWriteMemberImpl(ostr) {
          ostr.writeString(this.id);
          ostr.writeLong(this.total);
          ostr.writeInt(this.current);
          ostr.writeLong(this.totalLifetime);
          ostr.writeInt(this.failures);
        }
      }, {
        key: "_iceReadMemberImpl",
        value: function _iceReadMemberImpl(istr) {
          this.id = istr.readString();
          this.total = istr.readLong();
          this.current = istr.readInt();
          this.totalLifetime = istr.readLong();
          this.failures = istr.readInt();
        }
      }]);

      return _class113;
    }(Ice.Value);

    Slice.defineValue(IceMX.Metrics, iceC_IceMX_Metrics_ids[1], false);
    /**
     * A structure to keep track of failures associated with a given
     * metrics.
     *
     **/

    IceMX.MetricsFailures =
    /*#__PURE__*/
    function () {
      function _class114() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var failures = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, _class114);

        this.id = id;
        this.failures = failures;
      }

      _createClass(_class114, [{
        key: "_write",
        value: function _write(ostr) {
          ostr.writeString(this.id);
          IceMX.StringIntDictHelper.write(ostr, this.failures);
        }
      }, {
        key: "_read",
        value: function _read(istr) {
          this.id = istr.readString();
          this.failures = IceMX.StringIntDictHelper.read(istr);
        }
      }], [{
        key: "minWireSize",
        get: function get() {
          return 2;
        }
      }]);

      return _class114;
    }();

    Slice.defineStruct(IceMX.MetricsFailures, false, true);
    Slice.defineSequence(IceMX, "MetricsFailuresSeqHelper", "IceMX.MetricsFailures", false);
    Slice.defineSequence(IceMX, "MetricsMapHelper", "Ice.ObjectHelper", false, "IceMX.Metrics");
    Slice.defineDictionary(IceMX, "MetricsView", "MetricsViewHelper", "Ice.StringHelper", "IceMX.MetricsMapHelper", false, undefined, undefined, Ice.ArrayUtil.equals);
    /**
     * Raised if a metrics view cannot be found.
     *
     **/

    IceMX.UnknownMetricsView =
    /*#__PURE__*/
    function (_Ice$UserException6) {
      _inherits(_class115, _Ice$UserException6);

      function _class115() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class115);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class115).call(this, _cause));
      }

      _createClass(_class115, [{
        key: "_mostDerivedType",
        value: function _mostDerivedType() {
          return IceMX.UnknownMetricsView;
        }
      }], [{
        key: "_parent",
        get: function get() {
          return Ice.UserException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::IceMX::UnknownMetricsView";
        }
      }]);

      return _class115;
    }(Ice.UserException);

    var iceC_IceMX_MetricsAdmin_ids = ["::Ice::Object", "::IceMX::MetricsAdmin"];
    /**
     * The metrics administrative facet interface. This interface allows
     * remote administrative clients to access metrics of an application
     * that enabled the Ice administrative facility and configured some
     * metrics views.
     *
     **/

    IceMX.MetricsAdmin =
    /*#__PURE__*/
    function (_Ice$Object8) {
      _inherits(_class116, _Ice$Object8);

      function _class116() {
        _classCallCheck(this, _class116);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class116).apply(this, arguments));
      }

      return _class116;
    }(Ice.Object);

    IceMX.MetricsAdminPrx =
    /*#__PURE__*/
    function (_Ice$ObjectPrx8) {
      _inherits(_class117, _Ice$ObjectPrx8);

      function _class117() {
        _classCallCheck(this, _class117);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class117).apply(this, arguments));
      }

      return _class117;
    }(Ice.ObjectPrx);

    Slice.defineOperations(IceMX.MetricsAdmin, IceMX.MetricsAdminPrx, iceC_IceMX_MetricsAdmin_ids, 1, {
      "getMetricsViewNames": [,,, 2, ["Ice.StringSeqHelper"],, [["Ice.StringSeqHelper"]],,,],
      "enableMetricsView": [,,, 2,, [[7]],, [IceMX.UnknownMetricsView],,],
      "disableMetricsView": [,,, 2,, [[7]],, [IceMX.UnknownMetricsView],,],
      "getMetricsView": [,,, 2, ["IceMX.MetricsViewHelper"], [[7]], [[4]], [IceMX.UnknownMetricsView],, true],
      "getMapMetricsFailures": [,,, 2, ["IceMX.MetricsFailuresSeqHelper"], [[7], [7]],, [IceMX.UnknownMetricsView],,],
      "getMetricsFailures": [,,, 2, [IceMX.MetricsFailures], [[7], [7], [7]],, [IceMX.UnknownMetricsView],,]
    });
    var iceC_IceMX_ThreadMetrics_ids = ["::Ice::Object", "::IceMX::Metrics", "::IceMX::ThreadMetrics"];
    /**
     * Provides information on the number of threads currently in use and
     * their activity.
     *
     **/

    IceMX.ThreadMetrics =
    /*#__PURE__*/
    function (_IceMX$Metrics) {
      _inherits(_class118, _IceMX$Metrics);

      function _class118(id, total, current, totalLifetime, failures) {
        var _this119;

        var inUseForIO = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        var inUseForUser = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
        var inUseForOther = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;

        _classCallCheck(this, _class118);

        _this119 = _possibleConstructorReturn(this, _getPrototypeOf(_class118).call(this, id, total, current, totalLifetime, failures));
        _this119.inUseForIO = inUseForIO;
        _this119.inUseForUser = inUseForUser;
        _this119.inUseForOther = inUseForOther;
        return _this119;
      }

      _createClass(_class118, [{
        key: "_iceWriteMemberImpl",
        value: function _iceWriteMemberImpl(ostr) {
          ostr.writeInt(this.inUseForIO);
          ostr.writeInt(this.inUseForUser);
          ostr.writeInt(this.inUseForOther);
        }
      }, {
        key: "_iceReadMemberImpl",
        value: function _iceReadMemberImpl(istr) {
          this.inUseForIO = istr.readInt();
          this.inUseForUser = istr.readInt();
          this.inUseForOther = istr.readInt();
        }
      }]);

      return _class118;
    }(IceMX.Metrics);

    Slice.defineValue(IceMX.ThreadMetrics, iceC_IceMX_ThreadMetrics_ids[2], false);
    var iceC_IceMX_DispatchMetrics_ids = ["::Ice::Object", "::IceMX::DispatchMetrics", "::IceMX::Metrics"];
    /**
     * Provides information on servant dispatch.
     *
     **/

    IceMX.DispatchMetrics =
    /*#__PURE__*/
    function (_IceMX$Metrics2) {
      _inherits(_class119, _IceMX$Metrics2);

      function _class119(id, total, current, totalLifetime, failures) {
        var _this120;

        var userException = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        var size = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new Ice.Long(0, 0);
        var replySize = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new Ice.Long(0, 0);

        _classCallCheck(this, _class119);

        _this120 = _possibleConstructorReturn(this, _getPrototypeOf(_class119).call(this, id, total, current, totalLifetime, failures));
        _this120.userException = userException;
        _this120.size = size;
        _this120.replySize = replySize;
        return _this120;
      }

      _createClass(_class119, [{
        key: "_iceWriteMemberImpl",
        value: function _iceWriteMemberImpl(ostr) {
          ostr.writeInt(this.userException);
          ostr.writeLong(this.size);
          ostr.writeLong(this.replySize);
        }
      }, {
        key: "_iceReadMemberImpl",
        value: function _iceReadMemberImpl(istr) {
          this.userException = istr.readInt();
          this.size = istr.readLong();
          this.replySize = istr.readLong();
        }
      }]);

      return _class119;
    }(IceMX.Metrics);

    Slice.defineValue(IceMX.DispatchMetrics, iceC_IceMX_DispatchMetrics_ids[1], false);
    var iceC_IceMX_ChildInvocationMetrics_ids = ["::Ice::Object", "::IceMX::ChildInvocationMetrics", "::IceMX::Metrics"];
    /**
     * Provides information on child invocations. A child invocation is
     * either remote (sent over an Ice connection) or collocated. An
     * invocation can have multiple child invocation if it is
     * retried. Child invocation metrics are embedded within {@link
     * InvocationMetrics}.
     *
     **/

    IceMX.ChildInvocationMetrics =
    /*#__PURE__*/
    function (_IceMX$Metrics3) {
      _inherits(_class120, _IceMX$Metrics3);

      function _class120(id, total, current, totalLifetime, failures) {
        var _this121;

        var size = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : new Ice.Long(0, 0);
        var replySize = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new Ice.Long(0, 0);

        _classCallCheck(this, _class120);

        _this121 = _possibleConstructorReturn(this, _getPrototypeOf(_class120).call(this, id, total, current, totalLifetime, failures));
        _this121.size = size;
        _this121.replySize = replySize;
        return _this121;
      }

      _createClass(_class120, [{
        key: "_iceWriteMemberImpl",
        value: function _iceWriteMemberImpl(ostr) {
          ostr.writeLong(this.size);
          ostr.writeLong(this.replySize);
        }
      }, {
        key: "_iceReadMemberImpl",
        value: function _iceReadMemberImpl(istr) {
          this.size = istr.readLong();
          this.replySize = istr.readLong();
        }
      }]);

      return _class120;
    }(IceMX.Metrics);

    Slice.defineValue(IceMX.ChildInvocationMetrics, iceC_IceMX_ChildInvocationMetrics_ids[1], false);
    var iceC_IceMX_CollocatedMetrics_ids = ["::Ice::Object", "::IceMX::ChildInvocationMetrics", "::IceMX::CollocatedMetrics", "::IceMX::Metrics"];
    /**
     * Provides information on invocations that are collocated. Collocated
     * metrics are embedded within {@link InvocationMetrics}.
     *
     **/

    IceMX.CollocatedMetrics =
    /*#__PURE__*/
    function (_IceMX$ChildInvocatio) {
      _inherits(_class121, _IceMX$ChildInvocatio);

      function _class121(id, total, current, totalLifetime, failures, size, replySize) {
        _classCallCheck(this, _class121);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class121).call(this, id, total, current, totalLifetime, failures, size, replySize));
      }

      return _class121;
    }(IceMX.ChildInvocationMetrics);

    Slice.defineValue(IceMX.CollocatedMetrics, iceC_IceMX_CollocatedMetrics_ids[2], false);
    var iceC_IceMX_RemoteMetrics_ids = ["::Ice::Object", "::IceMX::ChildInvocationMetrics", "::IceMX::Metrics", "::IceMX::RemoteMetrics"];
    /**
     * Provides information on invocations that are specifically sent over
     * Ice connections. Remote metrics are embedded within {@link InvocationMetrics}.
     *
     **/

    IceMX.RemoteMetrics =
    /*#__PURE__*/
    function (_IceMX$ChildInvocatio2) {
      _inherits(_class122, _IceMX$ChildInvocatio2);

      function _class122(id, total, current, totalLifetime, failures, size, replySize) {
        _classCallCheck(this, _class122);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class122).call(this, id, total, current, totalLifetime, failures, size, replySize));
      }

      return _class122;
    }(IceMX.ChildInvocationMetrics);

    Slice.defineValue(IceMX.RemoteMetrics, iceC_IceMX_RemoteMetrics_ids[3], false);
    var iceC_IceMX_InvocationMetrics_ids = ["::Ice::Object", "::IceMX::InvocationMetrics", "::IceMX::Metrics"];
    /**
     * Provide measurements for proxy invocations. Proxy invocations can
     * either be sent over the wire or be collocated.
     *
     **/

    IceMX.InvocationMetrics =
    /*#__PURE__*/
    function (_IceMX$Metrics4) {
      _inherits(_class123, _IceMX$Metrics4);

      function _class123(id, total, current, totalLifetime, failures) {
        var _this122;

        var retry = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        var userException = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
        var remotes = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
        var collocated = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;

        _classCallCheck(this, _class123);

        _this122 = _possibleConstructorReturn(this, _getPrototypeOf(_class123).call(this, id, total, current, totalLifetime, failures));
        _this122.retry = retry;
        _this122.userException = userException;
        _this122.remotes = remotes;
        _this122.collocated = collocated;
        return _this122;
      }

      _createClass(_class123, [{
        key: "_iceWriteMemberImpl",
        value: function _iceWriteMemberImpl(ostr) {
          ostr.writeInt(this.retry);
          ostr.writeInt(this.userException);
          IceMX.MetricsMapHelper.write(ostr, this.remotes);
          IceMX.MetricsMapHelper.write(ostr, this.collocated);
        }
      }, {
        key: "_iceReadMemberImpl",
        value: function _iceReadMemberImpl(istr) {
          this.retry = istr.readInt();
          this.userException = istr.readInt();
          this.remotes = IceMX.MetricsMapHelper.read(istr);
          this.collocated = IceMX.MetricsMapHelper.read(istr);
        }
      }]);

      return _class123;
    }(IceMX.Metrics);

    Slice.defineValue(IceMX.InvocationMetrics, iceC_IceMX_InvocationMetrics_ids[1], false);
    var iceC_IceMX_ConnectionMetrics_ids = ["::Ice::Object", "::IceMX::ConnectionMetrics", "::IceMX::Metrics"];
    /**
     * Provides information on the data sent and received over Ice
     * connections.
     *
     **/

    IceMX.ConnectionMetrics =
    /*#__PURE__*/
    function (_IceMX$Metrics5) {
      _inherits(_class124, _IceMX$Metrics5);

      function _class124(id, total, current, totalLifetime, failures) {
        var _this123;

        var receivedBytes = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : new Ice.Long(0, 0);
        var sentBytes = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new Ice.Long(0, 0);

        _classCallCheck(this, _class124);

        _this123 = _possibleConstructorReturn(this, _getPrototypeOf(_class124).call(this, id, total, current, totalLifetime, failures));
        _this123.receivedBytes = receivedBytes;
        _this123.sentBytes = sentBytes;
        return _this123;
      }

      _createClass(_class124, [{
        key: "_iceWriteMemberImpl",
        value: function _iceWriteMemberImpl(ostr) {
          ostr.writeLong(this.receivedBytes);
          ostr.writeLong(this.sentBytes);
        }
      }, {
        key: "_iceReadMemberImpl",
        value: function _iceReadMemberImpl(istr) {
          this.receivedBytes = istr.readLong();
          this.sentBytes = istr.readLong();
        }
      }]);

      return _class124;
    }(IceMX.Metrics);

    Slice.defineValue(IceMX.ConnectionMetrics, iceC_IceMX_ConnectionMetrics_ids[1], false);
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ServantLocatorF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var AsyncResultBase = Ice.AsyncResultBase;
    var Debug = Ice.Debug;
    var Identity = Ice.Identity;
    var PropertyNames = Ice.PropertyNames;
    var ServantManager = Ice.ServantManager;
    var StringUtil = Ice.StringUtil;
    var ArrayUtil = Ice.ArrayUtil;
    var Timer = Ice.Timer;
    var _suffixes = ["ACM", "AdapterId", "Endpoints", "Locator", "Locator.EncodingVersion", "Locator.EndpointSelection", "Locator.ConnectionCached", "Locator.PreferSecure", "Locator.CollocationOptimized", "Locator.Router", "MessageSizeMax", "PublishedEndpoints", "ReplicaGroupId", "Router", "Router.EncodingVersion", "Router.EndpointSelection", "Router.ConnectionCached", "Router.PreferSecure", "Router.CollocationOptimized", "Router.Locator", "Router.Locator.EndpointSelection", "Router.Locator.ConnectionCached", "Router.Locator.PreferSecure", "Router.Locator.CollocationOptimized", "Router.Locator.LocatorCacheTimeout", "Router.Locator.InvocationTimeout", "Router.LocatorCacheTimeout", "Router.InvocationTimeout", "ProxyOptions", "ThreadPool.Size", "ThreadPool.SizeMax", "ThreadPool.SizeWarn", "ThreadPool.StackSize", "ThreadPool.Serialize"];
    var StateUninitialized = 0; // Just constructed.

    var StateHeld = 1; // const StateWaitActivate = 2;

    var StateActive = 3; // const StateDeactivating = 4;

    var StateDeactivated = 5;
    var StateDestroyed = 6; //
    // Only for use by IceInternal.ObjectAdapterFactory
    //

    var ObjectAdapterI =
    /*#__PURE__*/
    function () {
      function ObjectAdapterI(instance, communicator, objectAdapterFactory, name, router, noConfig, promise) {
        var _this124 = this;

        _classCallCheck(this, ObjectAdapterI);

        this._instance = instance;
        this._communicator = communicator;
        this._objectAdapterFactory = objectAdapterFactory;
        this._servantManager = new ServantManager(instance, name);
        this._name = name;
        this._publishedEndpoints = [];
        this._routerInfo = null;
        this._state = StateUninitialized;
        this._noConfig = noConfig;
        this._statePromises = [];

        if (this._noConfig) {
          this._reference = this._instance.referenceFactory().createFromString("dummy -t", "");
          this._messageSizeMax = this._instance.messageSizeMax();
          promise.resolve(this);
          return;
        }

        var properties = this._instance.initializationData().properties;

        var unknownProps = [];
        var noProps = this.filterProperties(unknownProps); //
        // Warn about unknown object adapter properties.
        //

        if (unknownProps.length !== 0 && properties.getPropertyAsIntWithDefault("Ice.Warn.UnknownProperties", 1) > 0) {
          var message = ["found unknown properties for object adapter `" + name + "':"];
          unknownProps.forEach(function (unknownProp) {
            return message.push("\n    " + unknownProp);
          });

          this._instance.initializationData().logger.warning(message.join(""));
        } //
        // Make sure named adapter has some configuration.
        //


        if (router === null && noProps) {
          throw new Ice.InitializationException("object adapter `".concat(this._name, "' requires configuration"));
        } //
        // Setup a reference to be used to get the default proxy options
        // when creating new proxies. By default, create twoway proxies.
        //


        var proxyOptions = properties.getPropertyWithDefault(this._name + ".ProxyOptions", "-t");

        try {
          this._reference = this._instance.referenceFactory().createFromString("dummy " + proxyOptions, "");
        } catch (e) {
          if (e instanceof Ice.ProxyParseException) {
            throw new Ice.InitializationException("invalid proxy options `".concat(proxyOptions, "' for object adapter `").concat(name, "'"));
          } else {
            throw e;
          }
        }

        {
          var defaultMessageSizeMax = this._instance.messageSizeMax() / 1024;
          var num = properties.getPropertyAsIntWithDefault(this._name + ".MessageSizeMax", defaultMessageSizeMax);

          if (num < 1 || num > 0x7fffffff / 1024) {
            this._messageSizeMax = 0x7fffffff;
          } else {
            this._messageSizeMax = num * 1024; // Property is in kilobytes, _messageSizeMax in bytes
          }
        }

        try {
          if (router === null) {
            router = Ice.RouterPrx.uncheckedCast(this._instance.proxyFactory().propertyToProxy(this._name + ".Router"));
          }

          var p;

          if (router !== null) {
            this._routerInfo = this._instance.routerManager().find(router);
            Debug.assert(this._routerInfo !== null); //
            // Make sure this router is not already registered with another adapter.
            //

            if (this._routerInfo.getAdapter() !== null) {
              throw new Ice.AlreadyRegisteredException("object adapter with router", Ice.identityToString(router.ice_getIdentity(), this._instance.toStringMode()));
            } //
            // Associate this object adapter with the router. This way,
            // new outgoing connections to the router's client proxy will
            // use this object adapter for callbacks.
            //


            this._routerInfo.setAdapter(this); //
            // Also modify all existing outgoing connections to the
            // router's client proxy to use this object adapter for
            // callbacks.
            //


            p = this._instance.outgoingConnectionFactory().setRouterInfo(this._routerInfo);
          } else {
            var endpoints = properties.getProperty(this._name + ".Endpoints");

            if (endpoints.length > 0) {
              throw new Ice.FeatureNotSupportedException("object adapter endpoints not supported");
            }

            p = Ice.Promise.resolve();
          }

          p.then(function () {
            return _this124.computePublishedEndpoints();
          }).then(function (endpoints) {
            _this124._publishedEndpoints = endpoints;
            promise.resolve(_this124);
          }, function (ex) {
            _this124.destroy();

            promise.reject(ex);
          });
        } catch (ex) {
          this.destroy();
          throw ex;
        }
      }

      _createClass(ObjectAdapterI, [{
        key: "getName",
        value: function getName() {
          //
          // No mutex lock necessary, _name is immutable.
          //
          return this._noConfig ? "" : this._name;
        }
      }, {
        key: "getCommunicator",
        value: function getCommunicator() {
          return this._communicator;
        }
      }, {
        key: "activate",
        value: function activate() {
          var promise = new AsyncResultBase(this._communicator, "activate", null, null, this);
          this.setState(StateActive);
          promise.resolve();
          return promise;
        }
      }, {
        key: "hold",
        value: function hold() {
          this.checkForDeactivation();
          this.setState(StateHeld);
        }
      }, {
        key: "waitForHold",
        value: function waitForHold() {
          var promise = new AsyncResultBase(this._communicator, "waitForHold", null, null, this);

          try {
            this.checkForDeactivation();
            this.waitState(StateHeld, promise);
          } catch (ex) {
            promise.reject(ex);
          }

          return promise;
        }
      }, {
        key: "deactivate",
        value: function deactivate() {
          var promise = new AsyncResultBase(this._communicator, "deactivate", null, null, this);

          if (this._state < StateDeactivated) {
            this.setState(StateDeactivated);

            this._instance.outgoingConnectionFactory().removeAdapter(this);
          }

          promise.resolve();
          return promise;
        }
      }, {
        key: "waitForDeactivate",
        value: function waitForDeactivate() {
          var promise = new AsyncResultBase(this._communicator, "waitForDeactivate", null, null, this);
          this.waitState(StateDeactivated, promise);
          return promise;
        }
      }, {
        key: "isDeactivated",
        value: function isDeactivated() {
          return this._state >= StateDeactivated;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          var _this125 = this;

          // NOTE: we don't call waitForDeactivate since it's currently a no-op.
          return this.deactivate().then(function () {
            if (_this125._state < StateDestroyed) {
              _this125.setState(StateDestroyed);

              _this125._servantManager.destroy();

              _this125._objectAdapterFactory.removeObjectAdapter(_this125);

              _this125._publishedEndpoints = [];
            }

            var promise = new AsyncResultBase(_this125._communicator, "destroy", null, null, _this125);
            promise.resolve();
            return promise;
          });
        }
      }, {
        key: "add",
        value: function add(object, ident) {
          return this.addFacet(object, ident, "");
        }
      }, {
        key: "addFacet",
        value: function addFacet(object, ident, facet) {
          this.checkForDeactivation();
          this.checkIdentity(ident);
          this.checkServant(object); //
          // Create a copy of the Identity argument, in case the caller
          // reuses it.
          //

          var id = ident.clone();

          this._servantManager.addServant(object, id, facet);

          return this.newProxy(id, facet);
        }
      }, {
        key: "addWithUUID",
        value: function addWithUUID(object) {
          return this.addFacetWithUUID(object, "");
        }
      }, {
        key: "addFacetWithUUID",
        value: function addFacetWithUUID(object, facet) {
          return this.addFacet(object, new Identity(Ice.generateUUID(), ""), facet);
        }
      }, {
        key: "addDefaultServant",
        value: function addDefaultServant(servant, category) {
          this.checkServant(servant);
          this.checkForDeactivation();

          this._servantManager.addDefaultServant(servant, category);
        }
      }, {
        key: "remove",
        value: function remove(ident) {
          return this.removeFacet(ident, "");
        }
      }, {
        key: "removeFacet",
        value: function removeFacet(ident, facet) {
          this.checkForDeactivation();
          this.checkIdentity(ident);
          return this._servantManager.removeServant(ident, facet);
        }
      }, {
        key: "removeAllFacets",
        value: function removeAllFacets(ident) {
          this.checkForDeactivation();
          this.checkIdentity(ident);
          return this._servantManager.removeAllFacets(ident);
        }
      }, {
        key: "removeDefaultServant",
        value: function removeDefaultServant(category) {
          this.checkForDeactivation();
          return this._servantManager.removeDefaultServant(category);
        }
      }, {
        key: "find",
        value: function find(ident) {
          return this.findFacet(ident, "");
        }
      }, {
        key: "findFacet",
        value: function findFacet(ident, facet) {
          this.checkForDeactivation();
          this.checkIdentity(ident);
          return this._servantManager.findServant(ident, facet);
        }
      }, {
        key: "findAllFacets",
        value: function findAllFacets(ident) {
          this.checkForDeactivation();
          this.checkIdentity(ident);
          return this._servantManager.findAllFacets(ident);
        }
      }, {
        key: "findByProxy",
        value: function findByProxy(proxy) {
          this.checkForDeactivation();

          var ref = proxy._getReference();

          return this.findFacet(ref.getIdentity(), ref.getFacet());
        }
      }, {
        key: "findDefaultServant",
        value: function findDefaultServant(category) {
          this.checkForDeactivation();
          return this._servantManager.findDefaultServant(category);
        }
      }, {
        key: "addServantLocator",
        value: function addServantLocator(locator, prefix) {
          this.checkForDeactivation();

          this._servantManager.addServantLocator(locator, prefix);
        }
      }, {
        key: "removeServantLocator",
        value: function removeServantLocator(prefix) {
          this.checkForDeactivation();
          return this._servantManager.removeServantLocator(prefix);
        }
      }, {
        key: "findServantLocator",
        value: function findServantLocator(prefix) {
          this.checkForDeactivation();
          return this._servantManager.findServantLocator(prefix);
        }
      }, {
        key: "createProxy",
        value: function createProxy(ident) {
          this.checkForDeactivation();
          this.checkIdentity(ident);
          return this.newProxy(ident, "");
        }
      }, {
        key: "createDirectProxy",
        value: function createDirectProxy(ident) {
          return this.createProxy(ident);
        }
      }, {
        key: "createIndirectProxy",
        value: function createIndirectProxy(ident) {
          throw new Ice.FeatureNotSupportedException("createIndirectProxy not supported");
        }
      }, {
        key: "setLocator",
        value: function setLocator(locator) {
          throw new Ice.FeatureNotSupportedException("setLocator not supported");
        }
      }, {
        key: "getEndpoints",
        value: function getEndpoints() {
          return [];
        }
      }, {
        key: "refreshPublishedEndpoints",
        value: function refreshPublishedEndpoints() {
          var _this126 = this;

          this.checkForDeactivation();
          return this.computePublishedEndpoints().then(function (endpoints) {
            _this126._publishedEndpoints = endpoints;
          });
        }
      }, {
        key: "getPublishedEndpoints",
        value: function getPublishedEndpoints() {
          return ArrayUtil.clone(this._publishedEndpoints);
        }
      }, {
        key: "setPublishedEndpoints",
        value: function setPublishedEndpoints(newEndpoints) {
          this.checkForDeactivation();

          if (this._routerInfo !== null) {
            throw new Error("can't set published endpoints on object adapter associated with a router");
          }

          this._publishedEndpoints = ArrayUtil.clone(newEndpoints);
        }
      }, {
        key: "getServantManager",
        value: function getServantManager() {
          //
          // _servantManager is immutable.
          //
          return this._servantManager;
        }
      }, {
        key: "setAdapterOnConnection",
        value: function setAdapterOnConnection(connection) {
          this.checkForDeactivation();
          connection.setAdapterAndServantManager(this, this._servantManager);
        }
      }, {
        key: "messageSizeMax",
        value: function messageSizeMax() {
          return this._messageSizeMax;
        }
      }, {
        key: "newProxy",
        value: function newProxy(ident, facet) {
          //
          // Now we also add the endpoints of the router's server proxy, if
          // any. This way, object references created by this object adapter
          // will also point to the router's server proxy endpoints.
          //
          //
          // Create a reference and return a proxy for this reference.
          //
          return this._instance.proxyFactory().referenceToProxy(this._instance.referenceFactory().create(ident, facet, this._reference, this._publishedEndpoints));
        }
      }, {
        key: "checkForDeactivation",
        value: function checkForDeactivation() {
          if (this._state >= StateDeactivated) {
            var ex = new Ice.ObjectAdapterDeactivatedException();
            ex.name = this.getName();
            throw ex;
          }
        }
      }, {
        key: "checkIdentity",
        value: function checkIdentity(ident) {
          if (ident.name === undefined || ident.name === null || ident.name.length === 0) {
            throw new Ice.IllegalIdentityException(ident);
          }

          if (ident.category === undefined || ident.category === null) {
            ident.category = "";
          }
        }
      }, {
        key: "checkServant",
        value: function checkServant(servant) {
          if (servant === undefined || servant === null) {
            throw new Ice.IllegalServantException("cannot add null servant to Object Adapter");
          }
        }
      }, {
        key: "computePublishedEndpoints",
        value: function computePublishedEndpoints() {
          var _this127 = this;

          var p;

          if (this._routerInfo !== null) {
            p = this._routerInfo.getServerEndpoints().then(function (endpts) {
              //
              // Remove duplicate endpoints, so we have a list of unique endpoints.
              //
              var endpoints = [];
              endpts.forEach(function (endpoint) {
                if (endpoints.findIndex(function (value) {
                  return endpoint.equals(value);
                }) === -1) {
                  endpoints.push(endpoint);
                }
              });
              return endpoints;
            });
          } else {
            //
            // Parse published endpoints. If set, these are used in proxies
            // instead of the connection factory Endpoints.
            //
            var endpoints = [];

            var s = this._instance.initializationData().properties.getProperty(this._name + ".PublishedEndpoints");

            var delim = " \t\n\r";
            var end = 0;
            var beg;

            while (end < s.length) {
              beg = StringUtil.findFirstNotOf(s, delim, end);

              if (beg === -1) {
                if (s != "") {
                  throw new Ice.EndpointParseException("invalid empty object adapter endpoint");
                }

                break;
              }

              end = beg;

              while (true) {
                end = s.indexOf(':', end);

                if (end == -1) {
                  end = s.length;
                  break;
                } else {
                  var quoted = false;
                  var quote = beg;

                  while (true) {
                    quote = s.indexOf("\"", quote);

                    if (quote == -1 || end < quote) {
                      break;
                    } else {
                      quote = s.indexOf("\"", ++quote);

                      if (quote == -1) {
                        break;
                      } else if (end < quote) {
                        quoted = true;
                        break;
                      }

                      ++quote;
                    }
                  }

                  if (!quoted) {
                    break;
                  }

                  ++end;
                }
              }

              var es = s.substring(beg, end);

              var endp = this._instance.endpointFactoryManager().create(es, false);

              if (endp === null) {
                throw new Ice.EndpointParseException("invalid object adapter endpoint `" + s + "'");
              }

              endpoints.push(endp);
            }

            p = Ice.Promise.resolve(endpoints);
          }

          return p.then(function (endpoints) {
            if (_this127._instance.traceLevels().network >= 1 && endpoints.length > 0) {
              var _s6 = [];

              _s6.push("published endpoints for object adapter `");

              _s6.push(_this127._name);

              _s6.push("':\n");

              var first = true;
              endpoints.forEach(function (endpoint) {
                if (!first) {
                  _s6.push(":");
                }

                _s6.push(endpoint.toString());

                first = false;
              });

              _this127._instance.initializationData().logger.trace(_this127._instance.traceLevels().networkCat, _s6.toString());
            }

            return endpoints;
          });
        }
      }, {
        key: "filterProperties",
        value: function filterProperties(unknownProps) {
          //
          // Do not create unknown properties list if Ice prefix, i.e., Ice, Glacier2, etc.
          //
          var addUnknown = true;
          var prefix = this._name + ".";

          for (var i = 0; i < PropertyNames.clPropNames.length; ++i) {
            if (prefix.indexOf(PropertyNames.clPropNames[i] + ".") === 0) {
              addUnknown = false;
              break;
            }
          }

          var noProps = true;

          var props = this._instance.initializationData().properties.getPropertiesForPrefix(prefix);

          var _iteratorNormalCompletion12 = true;
          var _didIteratorError12 = false;
          var _iteratorError12 = undefined;

          try {
            for (var _iterator12 = props.keys()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
              var key = _step12.value;
              var valid = false;

              for (var _i12 = 0; _i12 < _suffixes.length; ++_i12) {
                if (key === prefix + _suffixes[_i12]) {
                  noProps = false;
                  valid = true;
                  break;
                }
              }

              if (!valid && addUnknown) {
                unknownProps.push(key);
              }
            }
          } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
                _iterator12.return();
              }
            } finally {
              if (_didIteratorError12) {
                throw _iteratorError12;
              }
            }
          }

          return noProps;
        }
      }, {
        key: "setState",
        value: function setState(state) {
          var _this128 = this;

          if (this._state === state) {
            return;
          }

          this._state = state;
          var promises = [];
          (state < StateDeactivated ? [state] : [StateHeld, StateDeactivated]).forEach(function (s) {
            if (_this128._statePromises[s]) {
              promises = promises.concat(_this128._statePromises[s]);
              delete _this128._statePromises[s];
            }
          });

          if (promises.length > 0) {
            Timer.setImmediate(function () {
              return promises.forEach(function (p) {
                return p.resolve();
              });
            });
          }
        }
      }, {
        key: "waitState",
        value: function waitState(state, promise) {
          if (this._state < StateDeactivated && (state === StateHeld && this._state !== StateHeld || state === StateDeactivated)) {
            if (this._statePromises[state]) {
              this._statePromises[state].push(promise);
            } else {
              this._statePromises[state] = [promise];
            }
          } else {
            promise.resolve();
          }
        }
      }]);

      return ObjectAdapterI;
    }();

    Ice.ObjectAdapterI = ObjectAdapterI;
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ValueFactory.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var ObjectAdapterI = Ice.ObjectAdapterI;
    var _Promise = Ice.Promise; //
    // Only for use by Instance.
    //

    var ObjectAdapterFactory =
    /*#__PURE__*/
    function () {
      function ObjectAdapterFactory(instance, communicator) {
        _classCallCheck(this, ObjectAdapterFactory);

        this._instance = instance;
        this._communicator = communicator;
        this._adapters = [];
        this._adapterNamesInUse = [];
        this._shutdownPromise = new _Promise();
      }

      _createClass(ObjectAdapterFactory, [{
        key: "shutdown",
        value: function shutdown() {
          var _this129 = this;

          //
          // Ignore shutdown requests if the object adapter factory has
          // already been shut down.
          //
          if (this._instance === null) {
            return this._shutdownPromise;
          }

          this._instance = null;
          this._communicator = null;

          _Promise.all(this._adapters.map(function (adapter) {
            return adapter.deactivate();
          })).then(function () {
            return _this129._shutdownPromise.resolve();
          });

          return this._shutdownPromise;
        }
      }, {
        key: "waitForShutdown",
        value: function waitForShutdown() {
          var _this130 = this;

          return this._shutdownPromise.then(function () {
            return _Promise.all(_this130._adapters.map(function (adapter) {
              return adapter.waitForDeactivate();
            }));
          });
        }
      }, {
        key: "isShutdown",
        value: function isShutdown() {
          return this._instance === null;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          var _this131 = this;

          return this.waitForShutdown().then(function () {
            return _Promise.all(_this131._adapters.map(function (adapter) {
              return adapter.destroy();
            }));
          });
        }
      }, {
        key: "createObjectAdapter",
        value: function createObjectAdapter(name, router, promise) {
          if (this._instance === null) {
            throw new Ice.ObjectAdapterDeactivatedException();
          }

          var adapter = null;

          try {
            if (name.length === 0) {
              adapter = new ObjectAdapterI(this._instance, this._communicator, this, Ice.generateUUID(), null, true, promise);
            } else {
              if (this._adapterNamesInUse.indexOf(name) !== -1) {
                throw new Ice.AlreadyRegisteredException("object adapter", name);
              }

              adapter = new ObjectAdapterI(this._instance, this._communicator, this, name, router, false, promise);

              this._adapterNamesInUse.push(name);
            }

            this._adapters.push(adapter);
          } catch (ex) {
            promise.reject(ex);
          }
        }
      }, {
        key: "removeObjectAdapter",
        value: function removeObjectAdapter(adapter) {
          if (this._instance === null) {
            return;
          }

          var n = this._adapters.indexOf(adapter);

          if (n !== -1) {
            this._adapters.splice(n, 1);
          }

          n = this._adapterNamesInUse.indexOf(adapter.getName());

          if (n !== -1) {
            this._adapterNamesInUse.splice(n, 1);
          }
        }
      }]);

      return ObjectAdapterFactory;
    }();

    Ice.ObjectAdapterFactory = ObjectAdapterFactory;
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ProcessF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `Communicator.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */

    /**
     * The output mode for xxxToString method such as identityToString and proxyToString.
     * The actual encoding format for the string is the same for all modes: you
     * don't need to specify an encoding format or mode when reading such a string.
     *
     **/
    Ice.ToStringMode = Slice.defineEnum([['Unicode', 0], ['ASCII', 1], ['Compat', 2]]);
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `PropertiesF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `RemoteLogger.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */

    /**
     * An enumeration representing the different types of log messages.
     *
     **/
    Ice.LogMessageType = Slice.defineEnum([['PrintMessage', 0], ['TraceMessage', 1], ['WarningMessage', 2], ['ErrorMessage', 3]]);
    Slice.defineSequence(Ice, "LogMessageTypeSeqHelper", "Ice.LogMessageType._helper", false);
    /**
     * A complete log message.
     *
     **/

    Ice.LogMessage =
    /*#__PURE__*/
    function () {
      function _class125() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Ice.LogMessageType.PrintMessage;
        var timestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Ice.Long(0, 0);
        var traceCategory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

        _classCallCheck(this, _class125);

        this.type = type;
        this.timestamp = timestamp;
        this.traceCategory = traceCategory;
        this.message = message;
      }

      _createClass(_class125, [{
        key: "_write",
        value: function _write(ostr) {
          Ice.LogMessageType._write(ostr, this.type);

          ostr.writeLong(this.timestamp);
          ostr.writeString(this.traceCategory);
          ostr.writeString(this.message);
        }
      }, {
        key: "_read",
        value: function _read(istr) {
          this.type = Ice.LogMessageType._read(istr);
          this.timestamp = istr.readLong();
          this.traceCategory = istr.readString();
          this.message = istr.readString();
        }
      }], [{
        key: "minWireSize",
        get: function get() {
          return 11;
        }
      }]);

      return _class125;
    }();

    Slice.defineStruct(Ice.LogMessage, true, true);
    Slice.defineSequence(Ice, "LogMessageSeqHelper", "Ice.LogMessage", false);
    var iceC_Ice_RemoteLogger_ids = ["::Ice::Object", "::Ice::RemoteLogger"];
    /**
     * The Ice remote logger interface. An application can implement a
     * RemoteLogger to receive the log messages sent to the local {@link Logger}
     * of another Ice application.
     *
     **/

    Ice.RemoteLogger =
    /*#__PURE__*/
    function (_Ice$Object9) {
      _inherits(_class126, _Ice$Object9);

      function _class126() {
        _classCallCheck(this, _class126);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class126).apply(this, arguments));
      }

      return _class126;
    }(Ice.Object);

    Ice.RemoteLoggerPrx =
    /*#__PURE__*/
    function (_Ice$ObjectPrx9) {
      _inherits(_class127, _Ice$ObjectPrx9);

      function _class127() {
        _classCallCheck(this, _class127);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class127).apply(this, arguments));
      }

      return _class127;
    }(Ice.ObjectPrx);

    Slice.defineOperations(Ice.RemoteLogger, Ice.RemoteLoggerPrx, iceC_Ice_RemoteLogger_ids, 1, {
      "init": [,,,,, [[7], ["Ice.LogMessageSeqHelper"]],,,,],
      "log": [,,,,, [[Ice.LogMessage]],,,,]
    });
    /**
     * Thrown when the provided RemoteLogger was previously attached to a LoggerAdmin.
     *
     **/

    Ice.RemoteLoggerAlreadyAttachedException =
    /*#__PURE__*/
    function (_Ice$UserException7) {
      _inherits(_class128, _Ice$UserException7);

      function _class128() {
        var _cause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, _class128);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class128).call(this, _cause));
      }

      _createClass(_class128, [{
        key: "_mostDerivedType",
        value: function _mostDerivedType() {
          return Ice.RemoteLoggerAlreadyAttachedException;
        }
      }], [{
        key: "_parent",
        get: function get() {
          return Ice.UserException;
        }
      }, {
        key: "_id",
        get: function get() {
          return "::Ice::RemoteLoggerAlreadyAttachedException";
        }
      }]);

      return _class128;
    }(Ice.UserException);

    var iceC_Ice_LoggerAdmin_ids = ["::Ice::LoggerAdmin", "::Ice::Object"];
    /**
     * The interface of the admin object that allows an Ice application the attach its
     * {@link RemoteLogger} to the {@link Logger} of this admin object's Ice communicator.
     *
     **/

    Ice.LoggerAdmin =
    /*#__PURE__*/
    function (_Ice$Object10) {
      _inherits(_class129, _Ice$Object10);

      function _class129() {
        _classCallCheck(this, _class129);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class129).apply(this, arguments));
      }

      return _class129;
    }(Ice.Object);

    Ice.LoggerAdminPrx =
    /*#__PURE__*/
    function (_Ice$ObjectPrx10) {
      _inherits(_class130, _Ice$ObjectPrx10);

      function _class130() {
        _classCallCheck(this, _class130);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class130).apply(this, arguments));
      }

      return _class130;
    }(Ice.ObjectPrx);

    Slice.defineOperations(Ice.LoggerAdmin, Ice.LoggerAdminPrx, iceC_Ice_LoggerAdmin_ids, 0, {
      "attachRemoteLogger": [,,,,, [["Ice.RemoteLoggerPrx"], ["Ice.LogMessageTypeSeqHelper"], ["Ice.StringSeqHelper"], [3]],, [Ice.RemoteLoggerAlreadyAttachedException],,],
      "detachRemoteLogger": [,,,, [1], [["Ice.RemoteLoggerPrx"]],,,,],
      "getLog": [,,,, ["Ice.LogMessageSeqHelper"], [["Ice.LogMessageTypeSeqHelper"], ["Ice.StringSeqHelper"], [3]], [[7]],,,]
    });
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var WSEndpoint = Ice.WSEndpoint;

    var WSEndpointFactory =
    /*#__PURE__*/
    function () {
      function WSEndpointFactory(instance, delegate) {
        _classCallCheck(this, WSEndpointFactory);

        this._instance = instance;
        this._delegate = delegate;
      }

      _createClass(WSEndpointFactory, [{
        key: "type",
        value: function type() {
          return this._instance.type();
        }
      }, {
        key: "protocol",
        value: function protocol() {
          return this._instance.protocol();
        }
      }, {
        key: "create",
        value: function create(args, oaEndpoint) {
          var e = new WSEndpoint(this._instance, this._delegate.create(args, oaEndpoint));
          e.initWithOptions(args);
          return e;
        }
      }, {
        key: "read",
        value: function read(s) {
          var e = new WSEndpoint(this._instance, this._delegate.read(s));
          e.initWithStream(s);
          return e;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._delegate.destroy();

          this._instance = null;
        }
      }]);

      return WSEndpointFactory;
    }();

    Ice.WSEndpointFactory = WSEndpointFactory;
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `RouterF.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ServantLocator.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {//
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `ObjectAdapter.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    //
    // Ice version 3.7.2
    //
    // <auto-generated>
    //
    // Generated from file `SliceChecksumDict.ice'
    //
    // Warning: do not edit this file.
    //
    // </auto-generated>
    //

    /* eslint-disable */

    /* jshint ignore: start */
    Slice.defineDictionary(Ice, "SliceChecksumDict", "SliceChecksumDictHelper", "Ice.StringHelper", "Ice.StringHelper", false, undefined, undefined);
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Protocol = Ice.Protocol; //
    // Ice.InitializationData
    //

    Ice.InitializationData =
    /*#__PURE__*/
    function () {
      function _class131() {
        _classCallCheck(this, _class131);

        this.properties = null;
        this.logger = null;
        this.valueFactoryManager = null;
      }

      _createClass(_class131, [{
        key: "clone",
        value: function clone() {
          var r = new Ice.InitializationData();
          r.properties = this.properties;
          r.logger = this.logger;
          r.valueFactoryManager = this.valueFactoryManager;
          return r;
        }
      }]);

      return _class131;
    }(); //
    // Ice.initialize()
    //


    Ice.initialize = function (arg1, arg2) {
      var args = null;
      var initData = null;

      if (arg1 instanceof Array) {
        args = arg1;
      } else if (arg1 instanceof Ice.InitializationData) {
        initData = arg1;
      } else if (arg1 !== undefined && arg1 !== null) {
        throw new Ice.InitializationException("invalid argument to initialize");
      }

      if (arg2 !== undefined && arg2 !== null) {
        if (arg2 instanceof Ice.InitializationData && initData === null) {
          initData = arg2;
        } else {
          throw new Ice.InitializationException("invalid argument to initialize");
        }
      }

      if (initData === null) {
        initData = new Ice.InitializationData();
      } else {
        initData = initData.clone();
      }

      initData.properties = Ice.createProperties(args, initData.properties);
      var result = new Ice.Communicator(initData);
      result.finishSetup(null);
      return result;
    }; //
    // Ice.createProperties()
    //


    Ice.createProperties = function (args, defaults) {
      return new Ice.Properties(args, defaults);
    };

    Ice.currentProtocol = function () {
      return Protocol.currentProtocol.clone();
    };

    Ice.currentEncoding = function () {
      return Protocol.currentEncoding.clone();
    };

    Ice.stringVersion = function () {
      return "3.7.2"; // "A.B.C", with A=major, B=minor, C=patch
    };

    Ice.intVersion = function () {
      return 30702; // AABBCC, with AA=major, BB=minor, CC=patch
    };
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var TcpEndpointI = Ice.TcpEndpointI;

    var TcpEndpointFactory =
    /*#__PURE__*/
    function () {
      function TcpEndpointFactory(instance) {
        _classCallCheck(this, TcpEndpointFactory);

        this._instance = instance;
      }

      _createClass(TcpEndpointFactory, [{
        key: "type",
        value: function type() {
          return this._instance.type();
        }
      }, {
        key: "protocol",
        value: function protocol() {
          return this._instance.protocol();
        }
      }, {
        key: "create",
        value: function create(args, oaEndpoint) {
          var e = new TcpEndpointI(this._instance);
          e.initWithOptions(args, oaEndpoint);
          return e;
        }
      }, {
        key: "read",
        value: function read(s) {
          var e = new TcpEndpointI(this._instance);
          e.initWithStream(s);
          return e;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._instance = null;
        }
      }, {
        key: "clone",
        value: function clone(instance) {
          return new TcpEndpointFactory(instance);
        }
      }]);

      return TcpEndpointFactory;
    }();

    Ice.TcpEndpointFactory = TcpEndpointFactory;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var AsyncResultBase = Ice.AsyncResultBase;
    var Debug = Ice.Debug;
    var DefaultsAndOverrides = Ice.DefaultsAndOverrides;
    var EndpointFactoryManager = Ice.EndpointFactoryManager;
    var ImplicitContextI = Ice.ImplicitContextI;
    var LocatorManager = Ice.LocatorManager;
    var ObjectAdapterFactory = Ice.ObjectAdapterFactory;
    var ValueFactoryManagerI = Ice.ValueFactoryManagerI;
    var OutgoingConnectionFactory = Ice.OutgoingConnectionFactory;
    var Properties = Ice.Properties;
    var ProxyFactory = Ice.ProxyFactory;
    var RetryQueue = Ice.RetryQueue;
    var RouterManager = Ice.RouterManager;
    var Timer = Ice.Timer;
    var TraceLevels = Ice.TraceLevels;
    var ReferenceFactory = Ice.ReferenceFactory;
    var RequestHandlerFactory = Ice.RequestHandlerFactory;
    var ACMConfig = Ice.ACMConfig;
    var StateActive = 0;
    var StateDestroyInProgress = 1;
    var StateDestroyed = 2; //
    // Instance - only for use by Communicator
    //

    var Instance =
    /*#__PURE__*/
    function () {
      function Instance(initData) {
        _classCallCheck(this, Instance);

        this._state = StateActive;
        this._initData = initData;
        this._traceLevels = null;
        this._defaultsAndOverrides = null;
        this._messageSizeMax = 0;
        this._batchAutoFlushSize = 0;
        this._clientACM = null;
        this._toStringMode = Ice.ToStringMode.Unicode;
        this._implicitContext = null;
        this._routerManager = null;
        this._locatorManager = null;
        this._referenceFactory = null;
        this._requestHandlerFactory = null;
        this._proxyFactory = null;
        this._outgoingConnectionFactory = null;
        this._objectAdapterFactory = null;
        this._retryQueue = null;
        this._endpointHostResolver = null;
        this._endpointFactoryManager = null;
        this._objectFactoryMap = null;
      }

      _createClass(Instance, [{
        key: "initializationData",
        value: function initializationData() {
          //
          // No check for destruction. It must be possible to access the
          // initialization data after destruction.
          //
          // This value is immutable.
          //
          return this._initData;
        }
      }, {
        key: "traceLevels",
        value: function traceLevels() {
          // This value is immutable.
          Debug.assert(this._traceLevels !== null);
          return this._traceLevels;
        }
      }, {
        key: "defaultsAndOverrides",
        value: function defaultsAndOverrides() {
          // This value is immutable.
          Debug.assert(this._defaultsAndOverrides !== null);
          return this._defaultsAndOverrides;
        }
      }, {
        key: "routerManager",
        value: function routerManager() {
          if (this._state === StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(this._routerManager !== null);
          return this._routerManager;
        }
      }, {
        key: "locatorManager",
        value: function locatorManager() {
          if (this._state === StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(this._locatorManager !== null);
          return this._locatorManager;
        }
      }, {
        key: "referenceFactory",
        value: function referenceFactory() {
          if (this._state === StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(this._referenceFactory !== null);
          return this._referenceFactory;
        }
      }, {
        key: "requestHandlerFactory",
        value: function requestHandlerFactory() {
          if (this._state === StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(this._requestHandlerFactory !== null);
          return this._requestHandlerFactory;
        }
      }, {
        key: "proxyFactory",
        value: function proxyFactory() {
          if (this._state === StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(this._proxyFactory !== null);
          return this._proxyFactory;
        }
      }, {
        key: "outgoingConnectionFactory",
        value: function outgoingConnectionFactory() {
          if (this._state === StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(this._outgoingConnectionFactory !== null);
          return this._outgoingConnectionFactory;
        }
      }, {
        key: "objectAdapterFactory",
        value: function objectAdapterFactory() {
          if (this._state === StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(this._objectAdapterFactory !== null);
          return this._objectAdapterFactory;
        }
      }, {
        key: "retryQueue",
        value: function retryQueue() {
          if (this._state === StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(this._retryQueue !== null);
          return this._retryQueue;
        }
      }, {
        key: "timer",
        value: function timer() {
          if (this._state === StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(this._timer !== null);
          return this._timer;
        }
      }, {
        key: "endpointFactoryManager",
        value: function endpointFactoryManager() {
          if (this._state === StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          Debug.assert(this._endpointFactoryManager !== null);
          return this._endpointFactoryManager;
        }
      }, {
        key: "messageSizeMax",
        value: function messageSizeMax() {
          // This value is immutable.
          return this._messageSizeMax;
        }
      }, {
        key: "batchAutoFlushSize",
        value: function batchAutoFlushSize() {
          // This value is immutable.
          return this._batchAutoFlushSize;
        }
      }, {
        key: "clientACM",
        value: function clientACM() {
          // This value is immutable.
          return this._clientACM;
        }
      }, {
        key: "toStringMode",
        value: function toStringMode() {
          // this value is immutable
          return this._toStringMode;
        }
      }, {
        key: "getImplicitContext",
        value: function getImplicitContext() {
          return this._implicitContext;
        }
      }, {
        key: "setDefaultLocator",
        value: function setDefaultLocator(locator) {
          if (this._state == StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          this._referenceFactory = this._referenceFactory.setDefaultLocator(locator);
        }
      }, {
        key: "setDefaultRouter",
        value: function setDefaultRouter(router) {
          if (this._state == StateDestroyed) {
            throw new Ice.CommunicatorDestroyedException();
          }

          this._referenceFactory = this._referenceFactory.setDefaultRouter(router);
        }
      }, {
        key: "setLogger",
        value: function setLogger(logger) {
          this._initData.logger = logger;
        }
      }, {
        key: "finishSetup",
        value: function finishSetup(communicator, promise) {
          //
          // If promise == null, it means the caller is requesting a synchronous setup.
          // Otherwise, we resolve the promise after all initialization is complete.
          //
          try {
            if (this._initData.properties === null) {
              this._initData.properties = Properties.createProperties();
            }

            if (Ice._oneOfDone === undefined) {
              Ice._printStackTraces = this._initData.properties.getPropertyAsIntWithDefault("Ice.PrintStackTraces", 0) > 0;
              Ice._oneOfDone = true;
            }

            if (this._initData.logger === null) {
              this._initData.logger = Ice.getProcessLogger();
            }

            this._traceLevels = new TraceLevels(this._initData.properties);
            this._defaultsAndOverrides = new DefaultsAndOverrides(this._initData.properties, this._initData.logger);
            var defMessageSizeMax = 1024;

            var num = this._initData.properties.getPropertyAsIntWithDefault("Ice.MessageSizeMax", defMessageSizeMax);

            if (num < 1 || num > 0x7fffffff / 1024) {
              this._messageSizeMax = 0x7fffffff;
            } else {
              this._messageSizeMax = num * 1024; // Property is in kilobytes, _messageSizeMax in bytes
            }

            if (this._initData.properties.getProperty("Ice.BatchAutoFlushSize").length === 0 && this._initData.properties.getProperty("Ice.BatchAutoFlush").length > 0) {
              if (this._initData.properties.getPropertyAsInt("Ice.BatchAutoFlush") > 0) {
                this._batchAutoFlushSize = this._messageSizeMax;
              }
            } else {
              num = this._initData.properties.getPropertyAsIntWithDefault("Ice.BatchAutoFlushSize", 1024); // 1MB

              if (num < 1) {
                this._batchAutoFlushSize = num;
              } else if (num > 0x7fffffff / 1024) {
                this._batchAutoFlushSize = 0x7fffffff;
              } else {
                this._batchAutoFlushSize = num * 1024; // Property is in kilobytes, _batchAutoFlushSize in bytes
              }
            }

            this._clientACM = new ACMConfig(this._initData.properties, this._initData.logger, "Ice.ACM.Client", new ACMConfig(this._initData.properties, this._initData.logger, "Ice.ACM", new ACMConfig()));

            var toStringModeStr = this._initData.properties.getPropertyWithDefault("Ice.ToStringMode", "Unicode");

            if (toStringModeStr === "ASCII") {
              this._toStringMode = Ice.ToStringMode.ASCII;
            } else if (toStringModeStr === "Compat") {
              this._toStringMode = Ice.ToStringMode.Compat;
            } else if (toStringModeStr !== "Unicode") {
              throw new Ice.InitializationException("The value for Ice.ToStringMode must be Unicode, ASCII or Compat");
            }

            this._implicitContext = ImplicitContextI.create(this._initData.properties.getProperty("Ice.ImplicitContext"));
            this._routerManager = new RouterManager();
            this._locatorManager = new LocatorManager(this._initData.properties);
            this._referenceFactory = new ReferenceFactory(this, communicator);
            this._requestHandlerFactory = new RequestHandlerFactory(this, communicator);
            this._proxyFactory = new ProxyFactory(this);
            this._endpointFactoryManager = new EndpointFactoryManager(this);
            var tcpInstance = new Ice.ProtocolInstance(this, Ice.TCPEndpointType, "tcp", false);
            var tcpEndpointFactory = new Ice.TcpEndpointFactory(tcpInstance);

            this._endpointFactoryManager.add(tcpEndpointFactory);

            var wsInstance = new Ice.ProtocolInstance(this, Ice.WSEndpointType, "ws", false);
            var wsEndpointFactory = new Ice.WSEndpointFactory(wsInstance, tcpEndpointFactory.clone(wsInstance));

            this._endpointFactoryManager.add(wsEndpointFactory);

            var sslInstance = new Ice.ProtocolInstance(this, Ice.SSLEndpointType, "ssl", true);
            var sslEndpointFactory = new Ice.TcpEndpointFactory(sslInstance);

            this._endpointFactoryManager.add(sslEndpointFactory);

            var wssInstance = new Ice.ProtocolInstance(this, Ice.WSSEndpointType, "wss", true);
            var wssEndpointFactory = new Ice.WSEndpointFactory(wssInstance, sslEndpointFactory.clone(wssInstance));

            this._endpointFactoryManager.add(wssEndpointFactory);

            this._outgoingConnectionFactory = new OutgoingConnectionFactory(communicator, this);

            if (this._initData.valueFactoryManager === null) {
              this._initData.valueFactoryManager = new ValueFactoryManagerI();
            }

            this._objectAdapterFactory = new ObjectAdapterFactory(this, communicator);
            this._retryQueue = new RetryQueue(this);
            this._timer = new Timer(this._initData.logger);
            var router = Ice.RouterPrx.uncheckedCast(this._proxyFactory.propertyToProxy("Ice.Default.Router"));

            if (router !== null) {
              this._referenceFactory = this._referenceFactory.setDefaultRouter(router);
            }

            var loc = Ice.LocatorPrx.uncheckedCast(this._proxyFactory.propertyToProxy("Ice.Default.Locator"));

            if (loc !== null) {
              this._referenceFactory = this._referenceFactory.setDefaultLocator(loc);
            }

            if (promise !== null) {
              promise.resolve(communicator);
            }
          } catch (ex) {
            if (promise !== null) {
              if (ex instanceof Ice.LocalException) {
                this.destroy().finally(function () {
                  return promise.reject(ex);
                });
              } else {
                promise.reject(ex);
              }
            } else {
              if (ex instanceof Ice.LocalException) {
                this.destroy();
              }

              throw ex;
            }
          }
        } //
        // Only for use by Ice.CommunicatorI
        //

      }, {
        key: "destroy",
        value: function destroy() {
          var _this132 = this;

          var promise = new AsyncResultBase(null, "destroy", null, this, null); //
          // If destroy is in progress, wait for it to be done. This is
          // necessary in case destroy() is called concurrently by
          // multiple threads.
          //

          if (this._state == StateDestroyInProgress) {
            if (!this._destroyPromises) {
              this._destroyPromises = [];
            }

            this._destroyPromises.push(promise);

            return promise;
          }

          this._state = StateDestroyInProgress; //
          // Shutdown and destroy all the incoming and outgoing Ice
          // connections and wait for the connections to be finished.
          //

          Ice.Promise.try(function () {
            if (_this132._objectAdapterFactory) {
              return _this132._objectAdapterFactory.shutdown();
            }
          }).then(function () {
            if (_this132._outgoingConnectionFactory !== null) {
              _this132._outgoingConnectionFactory.destroy();
            }

            if (_this132._objectAdapterFactory !== null) {
              return _this132._objectAdapterFactory.destroy();
            }
          }).then(function () {
            if (_this132._outgoingConnectionFactory !== null) {
              return _this132._outgoingConnectionFactory.waitUntilFinished();
            }
          }).then(function () {
            if (_this132._retryQueue) {
              _this132._retryQueue.destroy();
            }

            if (_this132._timer) {
              _this132._timer.destroy();
            }

            if (_this132._objectFactoryMap !== null) {
              _this132._objectFactoryMap.forEach(function (factory) {
                return factory.destroy();
              });

              _this132._objectFactoryMap.clear();
            }

            if (_this132._routerManager) {
              _this132._routerManager.destroy();
            }

            if (_this132._locatorManager) {
              _this132._locatorManager.destroy();
            }

            if (_this132._endpointFactoryManager) {
              _this132._endpointFactoryManager.destroy();
            }

            if (_this132._initData.properties.getPropertyAsInt("Ice.Warn.UnusedProperties") > 0) {
              var unusedProperties = _this132._initData.properties.getUnusedProperties();

              if (unusedProperties.length > 0) {
                var message = [];
                message.push("The following properties were set but never read:");
                unusedProperties.forEach(function (p) {
                  return message.push("\n    ", p);
                });

                _this132._initData.logger.warning(message.join(""));
              }
            }

            _this132._objectAdapterFactory = null;
            _this132._outgoingConnectionFactory = null;
            _this132._retryQueue = null;
            _this132._timer = null;
            _this132._referenceFactory = null;
            _this132._requestHandlerFactory = null;
            _this132._proxyFactory = null;
            _this132._routerManager = null;
            _this132._locatorManager = null;
            _this132._endpointFactoryManager = null;
            _this132._state = StateDestroyed;

            if (_this132._destroyPromises) {
              _this132._destroyPromises.forEach(function (p) {
                return p.resolve();
              });
            }

            promise.resolve();
          }).catch(function (ex) {
            if (_this132._destroyPromises) {
              _this132._destroyPromises.forEach(function (p) {
                return p.reject(ex);
              });
            }

            promise.reject(ex);
          });
          return promise;
        }
      }, {
        key: "addObjectFactory",
        value: function addObjectFactory(factory, id) {
          //
          // Create a ValueFactory wrapper around the given ObjectFactory and register the wrapper
          // with the value factory manager. This may raise AlreadyRegisteredException.
          //
          this._initData.valueFactoryManager.add(function (typeId) {
            return factory.create(typeId);
          }, id);

          if (this._objectFactoryMap === null) {
            this._objectFactoryMap = new Map();
          }

          this._objectFactoryMap.set(id, factory);
        }
      }, {
        key: "findObjectFactory",
        value: function findObjectFactory(id) {
          var factory = null;

          if (this._objectFactoryMap !== null) {
            factory = this._objectFactoryMap.get(id);
          }

          return factory !== undefined ? factory : null;
        }
      }]);

      return Instance;
    }();

    Ice.Instance = Instance;
  })();

  (function () {
    //
    // Copyright (c) ZeroC, Inc. All rights reserved.
    //
    var Instance = Ice.Instance;
    var Debug = Ice.Debug; //
    // Ice.Communicator
    //

    var Communicator =
    /*#__PURE__*/
    function () {
      function Communicator(initData) {
        _classCallCheck(this, Communicator);

        this._instance = new Instance(initData);
      } //
      // Certain initialization tasks need to be completed after the
      // constructor.
      //


      _createClass(Communicator, [{
        key: "finishSetup",
        value: function finishSetup(promise) {
          this._instance.finishSetup(this, promise);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          return this._instance.destroy();
        }
      }, {
        key: "shutdown",
        value: function shutdown() {
          try {
            return this._instance.objectAdapterFactory().shutdown();
          } catch (ex) {
            Debug.assert(ex instanceof Ice.CommunicatorDestroyedException);
            return Ice.Promise.resolve();
          }
        }
      }, {
        key: "waitForShutdown",
        value: function waitForShutdown() {
          try {
            return this._instance.objectAdapterFactory().waitForShutdown();
          } catch (ex) {
            Debug.assert(ex instanceof Ice.CommunicatorDestroyedException);
            return Ice.Promise.resolve();
          }
        }
      }, {
        key: "isShutdown",
        value: function isShutdown() {
          try {
            return this._instance.objectAdapterFactory().isShutdown();
          } catch (ex) {
            if (!(ex instanceof Ice.CommunicatorDestroyedException)) {
              throw ex;
            }

            return true;
          }
        }
      }, {
        key: "stringToProxy",
        value: function stringToProxy(s) {
          return this._instance.proxyFactory().stringToProxy(s);
        }
      }, {
        key: "proxyToString",
        value: function proxyToString(proxy) {
          return this._instance.proxyFactory().proxyToString(proxy);
        }
      }, {
        key: "propertyToProxy",
        value: function propertyToProxy(s) {
          return this._instance.proxyFactory().propertyToProxy(s);
        }
      }, {
        key: "proxyToProperty",
        value: function proxyToProperty(proxy, prefix) {
          return this._instance.proxyFactory().proxyToProperty(proxy, prefix);
        }
      }, {
        key: "stringToIdentity",
        value: function stringToIdentity(s) {
          return Ice.stringToIdentity(s);
        }
      }, {
        key: "identityToString",
        value: function identityToString(ident) {
          return Ice.identityToString(ident, this._instance.toStringMode());
        }
      }, {
        key: "createObjectAdapter",
        value: function createObjectAdapter(name) {
          var promise = new Ice.AsyncResultBase(this, "createObjectAdapter", this, null, null);

          this._instance.objectAdapterFactory().createObjectAdapter(name, null, promise);

          return promise;
        }
      }, {
        key: "createObjectAdapterWithEndpoints",
        value: function createObjectAdapterWithEndpoints(name, endpoints) {
          if (name.length === 0) {
            name = Ice.generateUUID();
          }

          this.getProperties().setProperty(name + ".Endpoints", endpoints);
          var promise = new Ice.AsyncResultBase(this, "createObjectAdapterWithEndpoints", this, null, null);

          this._instance.objectAdapterFactory().createObjectAdapter(name, null, promise);

          return promise;
        }
      }, {
        key: "createObjectAdapterWithRouter",
        value: function createObjectAdapterWithRouter(name, router) {
          var _this133 = this;

          if (name.length === 0) {
            name = Ice.generateUUID();
          }

          var promise = new Ice.AsyncResultBase(this, "createObjectAdapterWithRouter", this, null, null); //
          // We set the proxy properties here, although we still use the proxy supplied.
          //

          this.proxyToProperty(router, name + ".Router").forEach(function (value, key) {
            _this133.getProperties().setProperty(key, value);
          });

          this._instance.objectAdapterFactory().createObjectAdapter(name, router, promise);

          return promise;
        }
      }, {
        key: "addObjectFactory",
        value: function addObjectFactory(factory, id) {
          this._instance.addObjectFactory(factory, id);
        }
      }, {
        key: "findObjectFactory",
        value: function findObjectFactory(id) {
          return this._instance.findObjectFactory(id);
        }
      }, {
        key: "getValueFactoryManager",
        value: function getValueFactoryManager() {
          return this._instance.initializationData().valueFactoryManager;
        }
      }, {
        key: "getImplicitContext",
        value: function getImplicitContext() {
          return this._instance.getImplicitContext();
        }
      }, {
        key: "getProperties",
        value: function getProperties() {
          return this._instance.initializationData().properties;
        }
      }, {
        key: "getLogger",
        value: function getLogger() {
          return this._instance.initializationData().logger;
        }
      }, {
        key: "getDefaultRouter",
        value: function getDefaultRouter() {
          return this._instance.referenceFactory().getDefaultRouter();
        }
      }, {
        key: "setDefaultRouter",
        value: function setDefaultRouter(router) {
          this._instance.setDefaultRouter(router);
        }
      }, {
        key: "getDefaultLocator",
        value: function getDefaultLocator() {
          return this._instance.referenceFactory().getDefaultLocator();
        }
      }, {
        key: "setDefaultLocator",
        value: function setDefaultLocator(locator) {
          this._instance.setDefaultLocator(locator);
        }
      }, {
        key: "flushBatchRequests",
        value: function flushBatchRequests() {
          return this._instance.outgoingConnectionFactory().flushAsyncBatchRequests();
        }
      }, {
        key: "instance",
        get: function get() {
          return this._instance;
        }
      }]);

      return Communicator;
    }();

    Ice.Communicator = Communicator;
  })();

  root.Ice = Ice;
  root.IceMX = IceMX;
  root.IceSSL = IceSSL;
  root.ice = ice;
})();
//# sourceMappingURL=Ice.js.map
