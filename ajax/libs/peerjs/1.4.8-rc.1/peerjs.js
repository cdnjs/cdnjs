(function () {
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $7dc43ad2ffa25036$exports = {};

$parcel$export($7dc43ad2ffa25036$exports, "util", function () { return $7dc43ad2ffa25036$export$7debb50ef11d5e0b; }, function (v) { return $7dc43ad2ffa25036$export$7debb50ef11d5e0b = v; });
$parcel$export($7dc43ad2ffa25036$exports, "concatArrayBuffers", function () { return $7dc43ad2ffa25036$export$52c89ebcdc4f53f2; }, function (v) { return $7dc43ad2ffa25036$export$52c89ebcdc4f53f2 = v; });
function $ce235bfd42c023c6$export$2e2bcd8739ae039(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}


function $0f9bb2854e0b6ced$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $0f9bb2854e0b6ced$export$2e2bcd8739ae039(Constructor, protoProps, staticProps) {
    if (protoProps) $0f9bb2854e0b6ced$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $0f9bb2854e0b6ced$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}


function $44635a22a5de2b4c$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}


function $59a678b96ba8439d$export$2e2bcd8739ae039(obj) {
    "@swc/helpers - typeof";
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
}


var $ead48d121739fa4c$var$$e8379818650e2442$export$93654d4f2d6cd524 = /*#__PURE__*/ function() {
    "use strict";
    function $e8379818650e2442$export$93654d4f2d6cd524() {
        (0, $ce235bfd42c023c6$export$2e2bcd8739ae039)(this, $e8379818650e2442$export$93654d4f2d6cd524);
        (0, $44635a22a5de2b4c$export$2e2bcd8739ae039)(this, "encoder", new TextEncoder());
        this._pieces = [];
        this._parts = [];
    }
    (0, $0f9bb2854e0b6ced$export$2e2bcd8739ae039)($e8379818650e2442$export$93654d4f2d6cd524, [
        {
            key: "append_buffer",
            value: function append_buffer(data) {
                this.flush();
                this._parts.push(data);
            }
        },
        {
            key: "append",
            value: function append(data) {
                this._pieces.push(data);
            }
        },
        {
            key: "flush",
            value: function flush() {
                if (this._pieces.length > 0) {
                    var buf = new Uint8Array(this._pieces);
                    this._parts.push(buf);
                    this._pieces = [];
                }
            }
        },
        {
            key: "toArrayBuffer",
            value: function toArrayBuffer() {
                var buffer = [];
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this._parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var part = _step.value;
                        buffer.push(part);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                            _iterator["return"]();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return $ead48d121739fa4c$var$$e8379818650e2442$var$concatArrayBuffers(buffer).buffer;
            }
        }
    ]);
    return $e8379818650e2442$export$93654d4f2d6cd524;
}();
function $ead48d121739fa4c$var$$e8379818650e2442$var$concatArrayBuffers(bufs) {
    var size = 0;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = bufs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var buf = _step.value;
            size += buf.byteLength;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var result = new Uint8Array(size);
    var offset = 0;
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = bufs[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var buf1 = _step1.value;
            var view = new Uint8Array(buf1.buffer, buf1.byteOffset, buf1.byteLength);
            result.set(view, offset);
            offset += buf1.byteLength;
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1["return"] != null) {
                _iterator1["return"]();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    return result;
}
function $ead48d121739fa4c$export$417857010dc9287f(data) {
    var unpacker = new $ead48d121739fa4c$var$$0cfd7828ad59115f$var$Unpacker(data);
    return unpacker.unpack();
}
function $ead48d121739fa4c$export$2a703dbb0cb35339(data) {
    var packer = new $ead48d121739fa4c$export$b9ec4b114aa40074();
    packer.pack(data);
    return packer.getBuffer();
}
var $ead48d121739fa4c$var$$0cfd7828ad59115f$var$Unpacker = /*#__PURE__*/ function() {
    "use strict";
    function $0cfd7828ad59115f$var$Unpacker(data) {
        (0, $ce235bfd42c023c6$export$2e2bcd8739ae039)(this, $0cfd7828ad59115f$var$Unpacker);
        this.index = 0;
        this.dataBuffer = data;
        this.dataView = new Uint8Array(this.dataBuffer);
        this.length = this.dataBuffer.byteLength;
    }
    (0, $0f9bb2854e0b6ced$export$2e2bcd8739ae039)($0cfd7828ad59115f$var$Unpacker, [
        {
            key: "unpack",
            value: function unpack() {
                var type = this.unpack_uint8();
                if (type < 0x80) return type;
                else if ((type ^ 0xe0) < 0x20) return (type ^ 0xe0) - 0x20;
                var size;
                if ((size = type ^ 0xa0) <= 0x0f) return this.unpack_raw(size);
                else if ((size = type ^ 0xb0) <= 0x0f) return this.unpack_string(size);
                else if ((size = type ^ 0x90) <= 0x0f) return this.unpack_array(size);
                else if ((size = type ^ 0x80) <= 0x0f) return this.unpack_map(size);
                switch(type){
                    case 0xc0:
                        return null;
                    case 0xc1:
                        return undefined;
                    case 0xc2:
                        return false;
                    case 0xc3:
                        return true;
                    case 0xca:
                        return this.unpack_float();
                    case 0xcb:
                        return this.unpack_double();
                    case 0xcc:
                        return this.unpack_uint8();
                    case 0xcd:
                        return this.unpack_uint16();
                    case 0xce:
                        return this.unpack_uint32();
                    case 0xcf:
                        return this.unpack_uint64();
                    case 0xd0:
                        return this.unpack_int8();
                    case 0xd1:
                        return this.unpack_int16();
                    case 0xd2:
                        return this.unpack_int32();
                    case 0xd3:
                        return this.unpack_int64();
                    case 0xd4:
                        return undefined;
                    case 0xd5:
                        return undefined;
                    case 0xd6:
                        return undefined;
                    case 0xd7:
                        return undefined;
                    case 0xd8:
                        size = this.unpack_uint16();
                        return this.unpack_string(size);
                    case 0xd9:
                        size = this.unpack_uint32();
                        return this.unpack_string(size);
                    case 0xda:
                        size = this.unpack_uint16();
                        return this.unpack_raw(size);
                    case 0xdb:
                        size = this.unpack_uint32();
                        return this.unpack_raw(size);
                    case 0xdc:
                        size = this.unpack_uint16();
                        return this.unpack_array(size);
                    case 0xdd:
                        size = this.unpack_uint32();
                        return this.unpack_array(size);
                    case 0xde:
                        size = this.unpack_uint16();
                        return this.unpack_map(size);
                    case 0xdf:
                        size = this.unpack_uint32();
                        return this.unpack_map(size);
                }
            }
        },
        {
            key: "unpack_uint8",
            value: function unpack_uint8() {
                var _byte = this.dataView[this.index] & 0xff;
                this.index++;
                return _byte;
            }
        },
        {
            key: "unpack_uint16",
            value: function unpack_uint16() {
                var bytes = this.read(2);
                var uint16 = (bytes[0] & 0xff) * 256 + (bytes[1] & 0xff);
                this.index += 2;
                return uint16;
            }
        },
        {
            key: "unpack_uint32",
            value: function unpack_uint32() {
                var bytes = this.read(4);
                var uint32 = ((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3];
                this.index += 4;
                return uint32;
            }
        },
        {
            key: "unpack_uint64",
            value: function unpack_uint64() {
                var bytes = this.read(8);
                var uint64 = ((((((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3]) * 256 + bytes[4]) * 256 + bytes[5]) * 256 + bytes[6]) * 256 + bytes[7];
                this.index += 8;
                return uint64;
            }
        },
        {
            key: "unpack_int8",
            value: function unpack_int8() {
                var uint8 = this.unpack_uint8();
                return uint8 < 0x80 ? uint8 : uint8 - 256;
            }
        },
        {
            key: "unpack_int16",
            value: function unpack_int16() {
                var uint16 = this.unpack_uint16();
                return uint16 < 0x8000 ? uint16 : uint16 - 65536;
            }
        },
        {
            key: "unpack_int32",
            value: function unpack_int32() {
                var uint32 = this.unpack_uint32();
                return uint32 < Math.pow(2, 31) ? uint32 : uint32 - Math.pow(2, 32);
            }
        },
        {
            key: "unpack_int64",
            value: function unpack_int64() {
                var uint64 = this.unpack_uint64();
                return uint64 < Math.pow(2, 63) ? uint64 : uint64 - Math.pow(2, 64);
            }
        },
        {
            key: "unpack_raw",
            value: function unpack_raw(size) {
                if (this.length < this.index + size) throw new Error("BinaryPackFailure: index is out of range ".concat(this.index, " ").concat(size, " ").concat(this.length));
                var buf = this.dataBuffer.slice(this.index, this.index + size);
                this.index += size;
                return buf;
            }
        },
        {
            key: "unpack_string",
            value: function unpack_string(size) {
                var bytes = this.read(size);
                var i = 0;
                var str = "";
                var c;
                var code;
                while(i < size){
                    c = bytes[i];
                    // The length of a UTF-8 sequence is specified in the first byte:
                    // 0xxxxxxx means length 1,
                    // 110xxxxx means length 2,
                    // 1110xxxx means length 3,
                    // 11110xxx means length 4.
                    // 10xxxxxx is for non-initial bytes.
                    if (c < 0xa0) {
                        // One-byte sequence: bits 0xxxxxxx
                        code = c;
                        i++;
                    } else if ((c ^ 0xc0) < 0x20) {
                        // Two-byte sequence: bits 110xxxxx 10xxxxxx
                        code = (c & 0x1f) << 6 | bytes[i + 1] & 0x3f;
                        i += 2;
                    } else if ((c ^ 0xe0) < 0x10) {
                        // Three-byte sequence: bits 1110xxxx 10xxxxxx 10xxxxxx
                        code = (c & 0x0f) << 12 | (bytes[i + 1] & 0x3f) << 6 | bytes[i + 2] & 0x3f;
                        i += 3;
                    } else {
                        // Four-byte sequence: bits 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
                        code = (c & 0x07) << 18 | (bytes[i + 1] & 0x3f) << 12 | (bytes[i + 2] & 0x3f) << 6 | bytes[i + 3] & 0x3f;
                        i += 4;
                    }
                    str += String.fromCodePoint(code);
                }
                this.index += size;
                return str;
            }
        },
        {
            key: "unpack_array",
            value: function unpack_array(size) {
                var objects = new Array(size);
                for(var i = 0; i < size; i++)objects[i] = this.unpack();
                return objects;
            }
        },
        {
            key: "unpack_map",
            value: function unpack_map(size) {
                var map = {};
                for(var i = 0; i < size; i++){
                    var key = this.unpack();
                    map[key] = this.unpack();
                }
                return map;
            }
        },
        {
            key: "unpack_float",
            value: function unpack_float() {
                var uint32 = this.unpack_uint32();
                var sign = uint32 >> 31;
                var exp = (uint32 >> 23 & 0xff) - 127;
                var fraction = uint32 & 0x7fffff | 0x800000;
                return (sign === 0 ? 1 : -1) * fraction * Math.pow(2, exp - 23);
            }
        },
        {
            key: "unpack_double",
            value: function unpack_double() {
                var h32 = this.unpack_uint32();
                var l32 = this.unpack_uint32();
                var sign = h32 >> 31;
                var exp = (h32 >> 20 & 0x7ff) - 1023;
                var hfrac = h32 & 0xfffff | 0x100000;
                var frac = hfrac * Math.pow(2, exp - 20) + l32 * Math.pow(2, exp - 52);
                return (sign === 0 ? 1 : -1) * frac;
            }
        },
        {
            key: "read",
            value: function read(length) {
                var j = this.index;
                if (j + length <= this.length) return this.dataView.subarray(j, j + length);
                else throw new Error("BinaryPackFailure: read index out of range");
            }
        }
    ]);
    return $0cfd7828ad59115f$var$Unpacker;
}();
var $ead48d121739fa4c$export$b9ec4b114aa40074 = /*#__PURE__*/ function() {
    "use strict";
    function $0cfd7828ad59115f$export$b9ec4b114aa40074() {
        (0, $ce235bfd42c023c6$export$2e2bcd8739ae039)(this, $0cfd7828ad59115f$export$b9ec4b114aa40074);
        (0, $44635a22a5de2b4c$export$2e2bcd8739ae039)(this, "_bufferBuilder", new $ead48d121739fa4c$var$$e8379818650e2442$export$93654d4f2d6cd524());
        (0, $44635a22a5de2b4c$export$2e2bcd8739ae039)(this, "_textEncoder", new TextEncoder());
    }
    (0, $0f9bb2854e0b6ced$export$2e2bcd8739ae039)($0cfd7828ad59115f$export$b9ec4b114aa40074, [
        {
            key: "getBuffer",
            value: function getBuffer() {
                return this._bufferBuilder.toArrayBuffer();
            }
        },
        {
            key: "pack",
            value: function pack(value) {
                if (typeof value === "string") this.pack_string(value);
                else if (typeof value === "number") {
                    if (Math.floor(value) === value) this.pack_integer(value);
                    else this.pack_double(value);
                } else if (typeof value === "boolean") {
                    if (value === true) this._bufferBuilder.append(0xc3);
                    else if (value === false) this._bufferBuilder.append(0xc2);
                } else if (value === undefined) this._bufferBuilder.append(0xc0);
                else if (typeof value === "object") {
                    if (value === null) this._bufferBuilder.append(0xc0);
                    else {
                        var constructor = value.constructor;
                        if (value instanceof Array) this.pack_array(value);
                        else if (value instanceof ArrayBuffer) this.pack_bin(new Uint8Array(value));
                        else if ("BYTES_PER_ELEMENT" in value) {
                            var v = value;
                            this.pack_bin(new Uint8Array(v.buffer, v.byteOffset, v.byteLength));
                        } else if (value instanceof Date) this.pack_string(value.toString());
                        else if (constructor == Object || constructor.toString().startsWith("class")) this.pack_object(value);
                        else throw new Error('Type "'.concat(constructor.toString(), '" not yet supported'));
                    }
                } else throw new Error('Type "'.concat(typeof value === "undefined" ? "undefined" : (0, $59a678b96ba8439d$export$2e2bcd8739ae039)(value), '" not yet supported'));
                this._bufferBuilder.flush();
            }
        },
        {
            key: "pack_bin",
            value: function pack_bin(blob) {
                var length = blob.length;
                if (length <= 0x0f) this.pack_uint8(0xa0 + length);
                else if (length <= 0xffff) {
                    this._bufferBuilder.append(0xda);
                    this.pack_uint16(length);
                } else if (length <= 0xffffffff) {
                    this._bufferBuilder.append(0xdb);
                    this.pack_uint32(length);
                } else throw new Error("Invalid length");
                this._bufferBuilder.append_buffer(blob);
            }
        },
        {
            key: "pack_string",
            value: function pack_string(str) {
                var encoded = this._textEncoder.encode(str);
                var length = encoded.length;
                if (length <= 0x0f) this.pack_uint8(0xb0 + length);
                else if (length <= 0xffff) {
                    this._bufferBuilder.append(0xd8);
                    this.pack_uint16(length);
                } else if (length <= 0xffffffff) {
                    this._bufferBuilder.append(0xd9);
                    this.pack_uint32(length);
                } else throw new Error("Invalid length");
                this._bufferBuilder.append_buffer(encoded);
            }
        },
        {
            key: "pack_array",
            value: function pack_array(ary) {
                var length = ary.length;
                if (length <= 0x0f) this.pack_uint8(0x90 + length);
                else if (length <= 0xffff) {
                    this._bufferBuilder.append(0xdc);
                    this.pack_uint16(length);
                } else if (length <= 0xffffffff) {
                    this._bufferBuilder.append(0xdd);
                    this.pack_uint32(length);
                } else throw new Error("Invalid length");
                for(var i = 0; i < length; i++)this.pack(ary[i]);
            }
        },
        {
            key: "pack_integer",
            value: function pack_integer(num) {
                if (num >= -32 && num <= 0x7f) this._bufferBuilder.append(num & 0xff);
                else if (num >= 0x00 && num <= 0xff) {
                    this._bufferBuilder.append(0xcc);
                    this.pack_uint8(num);
                } else if (num >= -128 && num <= 0x7f) {
                    this._bufferBuilder.append(0xd0);
                    this.pack_int8(num);
                } else if (num >= 0x0000 && num <= 0xffff) {
                    this._bufferBuilder.append(0xcd);
                    this.pack_uint16(num);
                } else if (num >= -32768 && num <= 0x7fff) {
                    this._bufferBuilder.append(0xd1);
                    this.pack_int16(num);
                } else if (num >= 0x00000000 && num <= 0xffffffff) {
                    this._bufferBuilder.append(0xce);
                    this.pack_uint32(num);
                } else if (num >= -2147483648 && num <= 0x7fffffff) {
                    this._bufferBuilder.append(0xd2);
                    this.pack_int32(num);
                } else if (num >= -9223372036854776000 && num <= 0x7fffffffffffffff) {
                    this._bufferBuilder.append(0xd3);
                    this.pack_int64(num);
                } else if (num >= 0x0000000000000000 && num <= 0xffffffffffffffff) {
                    this._bufferBuilder.append(0xcf);
                    this.pack_uint64(num);
                } else throw new Error("Invalid integer");
            }
        },
        {
            key: "pack_double",
            value: function pack_double(num) {
                var sign = 0;
                if (num < 0) {
                    sign = 1;
                    num = -num;
                }
                var exp = Math.floor(Math.log(num) / Math.LN2);
                var frac0 = num / Math.pow(2, exp) - 1;
                var frac1 = Math.floor(frac0 * Math.pow(2, 52));
                var b32 = Math.pow(2, 32);
                var h32 = sign << 31 | exp + 1023 << 20 | frac1 / b32 & 0x0fffff;
                var l32 = frac1 % b32;
                this._bufferBuilder.append(0xcb);
                this.pack_int32(h32);
                this.pack_int32(l32);
            }
        },
        {
            key: "pack_object",
            value: function pack_object(obj) {
                var keys = Object.keys(obj);
                var length = keys.length;
                if (length <= 0x0f) this.pack_uint8(0x80 + length);
                else if (length <= 0xffff) {
                    this._bufferBuilder.append(0xde);
                    this.pack_uint16(length);
                } else if (length <= 0xffffffff) {
                    this._bufferBuilder.append(0xdf);
                    this.pack_uint32(length);
                } else throw new Error("Invalid length");
                for(var prop in obj)if (obj.hasOwnProperty(prop)) {
                    this.pack(prop);
                    this.pack(obj[prop]);
                }
            }
        },
        {
            key: "pack_uint8",
            value: function pack_uint8(num) {
                this._bufferBuilder.append(num);
            }
        },
        {
            key: "pack_uint16",
            value: function pack_uint16(num) {
                this._bufferBuilder.append(num >> 8);
                this._bufferBuilder.append(num & 0xff);
            }
        },
        {
            key: "pack_uint32",
            value: function pack_uint32(num) {
                var n = num & 0xffffffff;
                this._bufferBuilder.append((n & 0xff000000) >>> 24);
                this._bufferBuilder.append((n & 0x00ff0000) >>> 16);
                this._bufferBuilder.append((n & 0x0000ff00) >>> 8);
                this._bufferBuilder.append(n & 0x000000ff);
            }
        },
        {
            key: "pack_uint64",
            value: function pack_uint64(num) {
                var high = num / Math.pow(2, 32);
                var low = num % Math.pow(2, 32);
                this._bufferBuilder.append((high & 0xff000000) >>> 24);
                this._bufferBuilder.append((high & 0x00ff0000) >>> 16);
                this._bufferBuilder.append((high & 0x0000ff00) >>> 8);
                this._bufferBuilder.append(high & 0x000000ff);
                this._bufferBuilder.append((low & 0xff000000) >>> 24);
                this._bufferBuilder.append((low & 0x00ff0000) >>> 16);
                this._bufferBuilder.append((low & 0x0000ff00) >>> 8);
                this._bufferBuilder.append(low & 0x000000ff);
            }
        },
        {
            key: "pack_int8",
            value: function pack_int8(num) {
                this._bufferBuilder.append(num & 0xff);
            }
        },
        {
            key: "pack_int16",
            value: function pack_int16(num) {
                this._bufferBuilder.append((num & 0xff00) >> 8);
                this._bufferBuilder.append(num & 0xff);
            }
        },
        {
            key: "pack_int32",
            value: function pack_int32(num) {
                this._bufferBuilder.append(num >>> 24 & 0xff);
                this._bufferBuilder.append((num & 0x00ff0000) >>> 16);
                this._bufferBuilder.append((num & 0x0000ff00) >>> 8);
                this._bufferBuilder.append(num & 0x000000ff);
            }
        },
        {
            key: "pack_int64",
            value: function pack_int64(num) {
                var high = Math.floor(num / Math.pow(2, 32));
                var low = num % Math.pow(2, 32);
                this._bufferBuilder.append((high & 0xff000000) >>> 24);
                this._bufferBuilder.append((high & 0x00ff0000) >>> 16);
                this._bufferBuilder.append((high & 0x0000ff00) >>> 8);
                this._bufferBuilder.append(high & 0x000000ff);
                this._bufferBuilder.append((low & 0xff000000) >>> 24);
                this._bufferBuilder.append((low & 0x00ff0000) >>> 16);
                this._bufferBuilder.append((low & 0x0000ff00) >>> 8);
                this._bufferBuilder.append(low & 0x000000ff);
            }
        }
    ]);
    return $0cfd7828ad59115f$export$b9ec4b114aa40074;
}();


/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 

"use strict";
var $993722e8c7a9e5a7$var$logDisabled_ = true;
var $993722e8c7a9e5a7$var$deprecationWarnings_ = true;
function $993722e8c7a9e5a7$export$e3c02be309be1f23(uastring, expr, pos) {
    var match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
}
function $993722e8c7a9e5a7$export$1f48841962b828b1(window1, eventNameToWrap, wrapper) {
    if (!window1.RTCPeerConnection) return;
    var proto = window1.RTCPeerConnection.prototype;
    var nativeAddEventListener = proto.addEventListener;
    proto.addEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap) return nativeAddEventListener.apply(this, arguments);
        var wrappedCallback = function(e) {
            var modifiedEvent = wrapper(e);
            if (modifiedEvent) {
                if (cb.handleEvent) cb.handleEvent(modifiedEvent);
                else cb(modifiedEvent);
            }
        };
        this._eventMap = this._eventMap || {};
        if (!this._eventMap[eventNameToWrap]) this._eventMap[eventNameToWrap] = new Map();
        this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
        return nativeAddEventListener.apply(this, [
            nativeEventName,
            wrappedCallback
        ]);
    };
    var nativeRemoveEventListener = proto.removeEventListener;
    proto.removeEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) return nativeRemoveEventListener.apply(this, arguments);
        if (!this._eventMap[eventNameToWrap].has(cb)) return nativeRemoveEventListener.apply(this, arguments);
        var unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
        this._eventMap[eventNameToWrap]["delete"](cb);
        if (this._eventMap[eventNameToWrap].size === 0) delete this._eventMap[eventNameToWrap];
        if (Object.keys(this._eventMap).length === 0) delete this._eventMap;
        return nativeRemoveEventListener.apply(this, [
            nativeEventName,
            unwrappedCb
        ]);
    };
    Object.defineProperty(proto, "on" + eventNameToWrap, {
        get: function() {
            return this["_on" + eventNameToWrap];
        },
        set: function(cb) {
            if (this["_on" + eventNameToWrap]) {
                this.removeEventListener(eventNameToWrap, this["_on" + eventNameToWrap]);
                delete this["_on" + eventNameToWrap];
            }
            if (cb) this.addEventListener(eventNameToWrap, this["_on" + eventNameToWrap] = cb);
        },
        enumerable: true,
        configurable: true
    });
}
function $993722e8c7a9e5a7$export$afbfee8cc06fd3e4(bool) {
    if (typeof bool !== "boolean") return new Error("Argument type: " + (typeof bool === "undefined" ? "undefined" : (0, $59a678b96ba8439d$export$2e2bcd8739ae039)(bool)) + ". Please use a boolean.");
    $993722e8c7a9e5a7$var$logDisabled_ = bool;
    return bool ? "adapter.js logging disabled" : "adapter.js logging enabled";
}
function $993722e8c7a9e5a7$export$51516be4b019e41e(bool) {
    if (typeof bool !== "boolean") return new Error("Argument type: " + (typeof bool === "undefined" ? "undefined" : (0, $59a678b96ba8439d$export$2e2bcd8739ae039)(bool)) + ". Please use a boolean.");
    $993722e8c7a9e5a7$var$deprecationWarnings_ = !bool;
    return "adapter.js deprecation warnings " + (bool ? "disabled" : "enabled");
}
function $993722e8c7a9e5a7$export$bef1f36f5486a6a3() {
    if (typeof window === "object") {
        if ($993722e8c7a9e5a7$var$logDisabled_) return;
        if (typeof console !== "undefined" && typeof console.log === "function") console.log.apply(console, arguments);
    }
}
function $993722e8c7a9e5a7$export$cdd73fc4100a6ef4(oldMethod, newMethod) {
    if (!$993722e8c7a9e5a7$var$deprecationWarnings_) return;
    console.warn(oldMethod + " is deprecated, please use " + newMethod + " instead.");
}
function $993722e8c7a9e5a7$export$2d31490a0c05f094(window1) {
    // Returned result object.
    var result = {
        browser: null,
        version: null
    };
    // Fail early if it's not a browser
    if (typeof window1 === "undefined" || !window1.navigator) {
        result.browser = "Not a browser.";
        return result;
    }
    var navigator = window1.navigator;
    if (navigator.mozGetUserMedia) {
        result.browser = "firefox";
        result.version = $993722e8c7a9e5a7$export$e3c02be309be1f23(navigator.userAgent, /Firefox\/(\d+)\./, 1);
    } else if (navigator.webkitGetUserMedia || window1.isSecureContext === false && window1.webkitRTCPeerConnection) {
        // Chrome, Chromium, Webview, Opera.
        // Version matches Chrome/WebRTC version.
        // Chrome 74 removed webkitGetUserMedia on http as well so we need the
        // more complicated fallback to webkitRTCPeerConnection.
        result.browser = "chrome";
        result.version = $993722e8c7a9e5a7$export$e3c02be309be1f23(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
    } else if (window1.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
        result.browser = "safari";
        result.version = $993722e8c7a9e5a7$export$e3c02be309be1f23(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
        result.supportsUnifiedPlan = window1.RTCRtpTransceiver && "currentDirection" in window1.RTCRtpTransceiver.prototype;
    } else {
        result.browser = "Not a supported browser.";
        return result;
    }
    return result;
}
/**
 * Checks if something is an object.
 *
 * @param {*} val The something you want to check.
 * @return true if val is an object, false otherwise.
 */ function $993722e8c7a9e5a7$var$isObject(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
}
function $993722e8c7a9e5a7$export$15384eac40dc88c8(data) {
    if (!$993722e8c7a9e5a7$var$isObject(data)) return data;
    return Object.keys(data).reduce(function(accumulator, key) {
        var isObj = $993722e8c7a9e5a7$var$isObject(data[key]);
        var value = isObj ? $993722e8c7a9e5a7$export$15384eac40dc88c8(data[key]) : data[key];
        var isEmptyObject = isObj && !Object.keys(value).length;
        if (value === undefined || isEmptyObject) return accumulator;
        return Object.assign(accumulator, (0, $44635a22a5de2b4c$export$2e2bcd8739ae039)({}, key, value));
    }, {});
}
function $993722e8c7a9e5a7$export$571b373e75babb58(stats, base, resultSet) {
    if (!base || resultSet.has(base.id)) return;
    resultSet.set(base.id, base);
    Object.keys(base).forEach(function(name) {
        if (name.endsWith("Id")) $993722e8c7a9e5a7$export$571b373e75babb58(stats, stats.get(base[name]), resultSet);
        else if (name.endsWith("Ids")) base[name].forEach(function(id) {
            $993722e8c7a9e5a7$export$571b373e75babb58(stats, stats.get(id), resultSet);
        });
    });
}
function $993722e8c7a9e5a7$export$93439ffc3f787d51(result, track, outbound) {
    var streamStatsType = outbound ? "outbound-rtp" : "inbound-rtp";
    var filteredResult = new Map();
    if (track === null) return filteredResult;
    var trackStats = [];
    result.forEach(function(value) {
        if (value.type === "track" && value.trackIdentifier === track.id) trackStats.push(value);
    });
    trackStats.forEach(function(trackStat) {
        result.forEach(function(stats) {
            if (stats.type === streamStatsType && stats.trackId === trackStat.id) $993722e8c7a9e5a7$export$571b373e75babb58(result, stats, filteredResult);
        });
    });
    return filteredResult;
}


var $ef7fa8125ed93bad$exports = {};

$parcel$export($ef7fa8125ed93bad$exports, "shimMediaStream", function () { return $ef7fa8125ed93bad$export$33ee24e7a300bcd1; });
$parcel$export($ef7fa8125ed93bad$exports, "shimOnTrack", function () { return $ef7fa8125ed93bad$export$f358708f68ab068; });
$parcel$export($ef7fa8125ed93bad$exports, "shimGetSendersWithDtmf", function () { return $ef7fa8125ed93bad$export$a41a030a2842f5d6; });
$parcel$export($ef7fa8125ed93bad$exports, "shimGetStats", function () { return $ef7fa8125ed93bad$export$90608323826f0b17; });
$parcel$export($ef7fa8125ed93bad$exports, "shimSenderReceiverGetStats", function () { return $ef7fa8125ed93bad$export$f2f0f2338114eb4b; });
$parcel$export($ef7fa8125ed93bad$exports, "shimAddTrackRemoveTrackWithNative", function () { return $ef7fa8125ed93bad$export$30e3cdd46f8d5100; });
$parcel$export($ef7fa8125ed93bad$exports, "shimAddTrackRemoveTrack", function () { return $ef7fa8125ed93bad$export$9588259fcf4ebc91; });
$parcel$export($ef7fa8125ed93bad$exports, "shimPeerConnection", function () { return $ef7fa8125ed93bad$export$852a08dda9a55ea7; });
$parcel$export($ef7fa8125ed93bad$exports, "fixNegotiationNeeded", function () { return $ef7fa8125ed93bad$export$341293bbeaae37cb; });
$parcel$export($ef7fa8125ed93bad$exports, "shimGetUserMedia", function () { return $20aedc9b1b297154$export$1ed4910f4d37dc5e; });
$parcel$export($ef7fa8125ed93bad$exports, "shimGetDisplayMedia", function () { return $010acafe3c691bc6$export$97270b87351d9c04; });
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 
function $df58919c2014a615$export$2e2bcd8739ae039(arr) {
    if (Array.isArray(arr)) return arr;
}


function $ebec43925b514865$export$2e2bcd8739ae039(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}


function $41e2efd74a2a9a85$export$2e2bcd8739ae039() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}


function $8e10d5387f51b551$export$2e2bcd8739ae039(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}


function $6842459d5565b742$export$2e2bcd8739ae039(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return (0, $8e10d5387f51b551$export$2e2bcd8739ae039)(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0, $8e10d5387f51b551$export$2e2bcd8739ae039)(o, minLen);
}


function $c235cd4828fc39e0$export$2e2bcd8739ae039(arr, i) {
    return (0, $df58919c2014a615$export$2e2bcd8739ae039)(arr) || (0, $ebec43925b514865$export$2e2bcd8739ae039)(arr, i) || (0, $6842459d5565b742$export$2e2bcd8739ae039)(arr, i) || (0, $41e2efd74a2a9a85$export$2e2bcd8739ae039)();
}



/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 
"use strict";
var $20aedc9b1b297154$var$logging = $993722e8c7a9e5a7$export$bef1f36f5486a6a3;
function $20aedc9b1b297154$export$1ed4910f4d37dc5e(window, browserDetails) {
    var navigator = window && window.navigator;
    if (!navigator.mediaDevices) return;
    var constraintsToChrome_ = function constraintsToChrome_(c) {
        if (typeof c !== "object" || c.mandatory || c.optional) return c;
        var cc = {};
        Object.keys(c).forEach(function(key) {
            if (key === "require" || key === "advanced" || key === "mediaSource") return;
            var r = typeof c[key] === "object" ? c[key] : {
                ideal: c[key]
            };
            if (r.exact !== undefined && typeof r.exact === "number") r.min = r.max = r.exact;
            var oldname_ = function oldname_(prefix, name) {
                if (prefix) return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                return name === "deviceId" ? "sourceId" : name;
            };
            if (r.ideal !== undefined) {
                cc.optional = cc.optional || [];
                var oc = {};
                if (typeof r.ideal === "number") {
                    oc[oldname_("min", key)] = r.ideal;
                    cc.optional.push(oc);
                    oc = {};
                    oc[oldname_("max", key)] = r.ideal;
                    cc.optional.push(oc);
                } else {
                    oc[oldname_("", key)] = r.ideal;
                    cc.optional.push(oc);
                }
            }
            if (r.exact !== undefined && typeof r.exact !== "number") {
                cc.mandatory = cc.mandatory || {};
                cc.mandatory[oldname_("", key)] = r.exact;
            } else [
                "min",
                "max"
            ].forEach(function(mix) {
                if (r[mix] !== undefined) {
                    cc.mandatory = cc.mandatory || {};
                    cc.mandatory[oldname_(mix, key)] = r[mix];
                }
            });
        });
        if (c.advanced) cc.optional = (cc.optional || []).concat(c.advanced);
        return cc;
    };
    var shimConstraints_ = function shimConstraints_(constraints, func) {
        if (browserDetails.version >= 61) return func(constraints);
        constraints = JSON.parse(JSON.stringify(constraints));
        if (constraints && typeof constraints.audio === "object") {
            var remap = function remap(obj, a, b) {
                if (a in obj && !(b in obj)) {
                    obj[b] = obj[a];
                    delete obj[a];
                }
            };
            constraints = JSON.parse(JSON.stringify(constraints));
            remap(constraints.audio, "autoGainControl", "googAutoGainControl");
            remap(constraints.audio, "noiseSuppression", "googNoiseSuppression");
            constraints.audio = constraintsToChrome_(constraints.audio);
        }
        if (constraints && typeof constraints.video === "object") {
            // Shim facingMode for mobile & surface pro.
            var face = constraints.video.facingMode;
            face = face && (typeof face === "object" ? face : {
                ideal: face
            });
            var getSupportedFacingModeLies = browserDetails.version < 66;
            if (face && (face.exact === "user" || face.exact === "environment" || face.ideal === "user" || face.ideal === "environment") && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
                delete constraints.video.facingMode;
                var matches;
                if (face.exact === "environment" || face.ideal === "environment") matches = [
                    "back",
                    "rear"
                ];
                else if (face.exact === "user" || face.ideal === "user") matches = [
                    "front"
                ];
                if (matches) // Look for matches in label, or use last cam for back (typical).
                return navigator.mediaDevices.enumerateDevices().then(function(devices) {
                    devices = devices.filter(function(d) {
                        return d.kind === "videoinput";
                    });
                    var dev = devices.find(function(d) {
                        return matches.some(function(match) {
                            return d.label.toLowerCase().includes(match);
                        });
                    });
                    if (!dev && devices.length && matches.includes("back")) dev = devices[devices.length - 1]; // more likely the back cam
                    if (dev) constraints.video.deviceId = face.exact ? {
                        exact: dev.deviceId
                    } : {
                        ideal: dev.deviceId
                    };
                    constraints.video = constraintsToChrome_(constraints.video);
                    $20aedc9b1b297154$var$logging("chrome: " + JSON.stringify(constraints));
                    return func(constraints);
                });
            }
            constraints.video = constraintsToChrome_(constraints.video);
        }
        $20aedc9b1b297154$var$logging("chrome: " + JSON.stringify(constraints));
        return func(constraints);
    };
    var shimError_ = function shimError_(e) {
        if (browserDetails.version >= 64) return e;
        return {
            name: ({
                PermissionDeniedError: "NotAllowedError",
                PermissionDismissedError: "NotAllowedError",
                InvalidStateError: "NotAllowedError",
                DevicesNotFoundError: "NotFoundError",
                ConstraintNotSatisfiedError: "OverconstrainedError",
                TrackStartError: "NotReadableError",
                MediaDeviceFailedDueToShutdown: "NotAllowedError",
                MediaDeviceKillSwitchOn: "NotAllowedError",
                TabCaptureError: "AbortError",
                ScreenCaptureError: "AbortError",
                DeviceCaptureError: "AbortError"
            })[e.name] || e.name,
            message: e.message,
            constraint: e.constraint || e.constraintName,
            toString: function() {
                return this.name + (this.message && ": ") + this.message;
            }
        };
    };
    var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
        shimConstraints_(constraints, function(c) {
            navigator.webkitGetUserMedia(c, onSuccess, function(e) {
                if (onError) onError(shimError_(e));
            });
        });
    };
    navigator.getUserMedia = getUserMedia_.bind(navigator);
    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    if (navigator.mediaDevices.getUserMedia) {
        var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(cs) {
            return shimConstraints_(cs, function(c) {
                return origGetUserMedia(c).then(function(stream) {
                    if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                        stream.getTracks().forEach(function(track) {
                            track.stop();
                        });
                        throw new DOMException("", "NotFoundError");
                    }
                    return stream;
                }, function(e) {
                    return Promise.reject(shimError_(e));
                });
            });
        };
    }
}


/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ "use strict";
function $010acafe3c691bc6$export$97270b87351d9c04(window, getSourceId) {
    if (window.navigator.mediaDevices && "getDisplayMedia" in window.navigator.mediaDevices) return;
    if (!window.navigator.mediaDevices) return;
    // getSourceId is a function that returns a promise resolving with
    // the sourceId of the screen/window/tab to be shared.
    if (typeof getSourceId !== "function") {
        console.error("shimGetDisplayMedia: getSourceId argument is not a function");
        return;
    }
    window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
        return getSourceId(constraints).then(function(sourceId) {
            var widthSpecified = constraints.video && constraints.video.width;
            var heightSpecified = constraints.video && constraints.video.height;
            var frameRateSpecified = constraints.video && constraints.video.frameRate;
            constraints.video = {
                mandatory: {
                    chromeMediaSource: "desktop",
                    chromeMediaSourceId: sourceId,
                    maxFrameRate: frameRateSpecified || 3
                }
            };
            if (widthSpecified) constraints.video.mandatory.maxWidth = widthSpecified;
            if (heightSpecified) constraints.video.mandatory.maxHeight = heightSpecified;
            return window.navigator.mediaDevices.getUserMedia(constraints);
        });
    };
}


"use strict";
function $ef7fa8125ed93bad$export$33ee24e7a300bcd1(window) {
    window.MediaStream = window.MediaStream || window.webkitMediaStream;
}
function $ef7fa8125ed93bad$export$f358708f68ab068(window) {
    if (typeof window === "object" && window.RTCPeerConnection && !("ontrack" in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
            get: function() {
                return this._ontrack;
            },
            set: function(f) {
                if (this._ontrack) this.removeEventListener("track", this._ontrack);
                this.addEventListener("track", this._ontrack = f);
            },
            enumerable: true,
            configurable: true
        });
        var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
            var _this = this;
            if (!this._ontrackpoly) {
                this._ontrackpoly = function(e) {
                    // onaddstream does not fire when a track is added to an existing
                    // stream. But stream.onaddtrack is implemented so we use that.
                    e.stream.addEventListener("addtrack", function(te) {
                        var receiver;
                        if (window.RTCPeerConnection.prototype.getReceivers) receiver = _this.getReceivers().find(function(r) {
                            return r.track && r.track.id === te.track.id;
                        });
                        else receiver = {
                            track: te.track
                        };
                        var event = new Event("track");
                        event.track = te.track;
                        event.receiver = receiver;
                        event.transceiver = {
                            receiver: receiver
                        };
                        event.streams = [
                            e.stream
                        ];
                        _this.dispatchEvent(event);
                    });
                    e.stream.getTracks().forEach(function(track) {
                        var receiver;
                        if (window.RTCPeerConnection.prototype.getReceivers) receiver = _this.getReceivers().find(function(r) {
                            return r.track && r.track.id === track.id;
                        });
                        else receiver = {
                            track: track
                        };
                        var event = new Event("track");
                        event.track = track;
                        event.receiver = receiver;
                        event.transceiver = {
                            receiver: receiver
                        };
                        event.streams = [
                            e.stream
                        ];
                        _this.dispatchEvent(event);
                    });
                };
                this.addEventListener("addstream", this._ontrackpoly);
            }
            return origSetRemoteDescription.apply(this, arguments);
        };
    } else // even if RTCRtpTransceiver is in window, it is only used and
    // emitted in unified-plan. Unfortunately this means we need
    // to unconditionally wrap the event.
    $993722e8c7a9e5a7$export$1f48841962b828b1(window, "track", function(e) {
        if (!e.transceiver) Object.defineProperty(e, "transceiver", {
            value: {
                receiver: e.receiver
            }
        });
        return e;
    });
}
function $ef7fa8125ed93bad$export$a41a030a2842f5d6(window) {
    // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
    if (typeof window === "object" && window.RTCPeerConnection && !("getSenders" in window.RTCPeerConnection.prototype) && "createDTMFSender" in window.RTCPeerConnection.prototype) {
        var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
            return {
                track: track,
                get dtmf () {
                    if (this._dtmf === undefined) {
                        if (track.kind === "audio") this._dtmf = pc.createDTMFSender(track);
                        else this._dtmf = null;
                    }
                    return this._dtmf;
                },
                _pc: pc
            };
        };
        // augment addTrack when getSenders is not available.
        if (!window.RTCPeerConnection.prototype.getSenders) {
            window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                this._senders = this._senders || [];
                return this._senders.slice(); // return a copy of the internal state.
            };
            var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
            window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                var sender = origAddTrack.apply(this, arguments);
                if (!sender) {
                    sender = shimSenderWithDtmf(this, track);
                    this._senders.push(sender);
                }
                return sender;
            };
            var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
            window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                origRemoveTrack.apply(this, arguments);
                var idx = this._senders.indexOf(sender);
                if (idx !== -1) this._senders.splice(idx, 1);
            };
        }
        var origAddStream = window.RTCPeerConnection.prototype.addStream;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
            var _this = this;
            this._senders = this._senders || [];
            origAddStream.apply(this, [
                stream
            ]);
            stream.getTracks().forEach(function(track) {
                _this._senders.push(shimSenderWithDtmf(_this, track));
            });
        };
        var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
        window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
            var _this = this;
            this._senders = this._senders || [];
            origRemoveStream.apply(this, [
                stream
            ]);
            stream.getTracks().forEach(function(track) {
                var sender = _this._senders.find(function(s) {
                    return s.track === track;
                });
                if (sender) _this._senders.splice(_this._senders.indexOf(sender), 1);
            });
        };
    } else if (typeof window === "object" && window.RTCPeerConnection && "getSenders" in window.RTCPeerConnection.prototype && "createDTMFSender" in window.RTCPeerConnection.prototype && window.RTCRtpSender && !("dtmf" in window.RTCRtpSender.prototype)) {
        var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            var _this = this;
            var senders = origGetSenders.apply(this, []);
            senders.forEach(function(sender) {
                return sender._pc = _this;
            });
            return senders;
        };
        Object.defineProperty(window.RTCRtpSender.prototype, "dtmf", {
            get: function() {
                if (this._dtmf === undefined) {
                    if (this.track.kind === "audio") this._dtmf = this._pc.createDTMFSender(this.track);
                    else this._dtmf = null;
                }
                return this._dtmf;
            }
        });
    }
}
function $ef7fa8125ed93bad$export$90608323826f0b17(window) {
    if (!window.RTCPeerConnection) return;
    var origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
        var _this = this;
        var _arguments = (0, $c235cd4828fc39e0$export$2e2bcd8739ae039)(arguments, 3), selector = _arguments[0], onSucc = _arguments[1], onErr = _arguments[2];
        // If selector is a function then we are in the old style stats so just
        // pass back the original getStats format to avoid breaking old users.
        if (arguments.length > 0 && typeof selector === "function") return origGetStats.apply(this, arguments);
        // When spec-style getStats is supported, return those when called with
        // either no arguments or the selector argument is null.
        if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== "function")) return origGetStats.apply(this, []);
        var fixChromeStats_ = function fixChromeStats_(response) {
            var standardReport = {};
            var reports = response.result();
            reports.forEach(function(report) {
                var standardStats = {
                    id: report.id,
                    timestamp: report.timestamp,
                    type: {
                        localcandidate: "local-candidate",
                        remotecandidate: "remote-candidate"
                    }[report.type] || report.type
                };
                report.names().forEach(function(name) {
                    standardStats[name] = report.stat(name);
                });
                standardReport[standardStats.id] = standardStats;
            });
            return standardReport;
        };
        // shim getStats with maplike support
        var makeMapStats = function makeMapStats(stats) {
            return new Map(Object.keys(stats).map(function(key) {
                return [
                    key,
                    stats[key]
                ];
            }));
        };
        if (arguments.length >= 2) {
            var successCallbackWrapper_ = function successCallbackWrapper_(response) {
                onSucc(makeMapStats(fixChromeStats_(response)));
            };
            return origGetStats.apply(this, [
                successCallbackWrapper_,
                selector
            ]);
        }
        // promise-support
        return new Promise(function(resolve, reject) {
            origGetStats.apply(_this, [
                function(response) {
                    resolve(makeMapStats(fixChromeStats_(response)));
                },
                reject
            ]);
        }).then(onSucc, onErr);
    };
}
function $ef7fa8125ed93bad$export$f2f0f2338114eb4b(window) {
    if (!(typeof window === "object" && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) return;
    // shim sender stats.
    if (!("getStats" in window.RTCRtpSender.prototype)) {
        var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        if (origGetSenders) window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            var _this = this;
            var senders = origGetSenders.apply(this, []);
            senders.forEach(function(sender) {
                return sender._pc = _this;
            });
            return senders;
        };
        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        if (origAddTrack) window.RTCPeerConnection.prototype.addTrack = function addTrack() {
            var sender = origAddTrack.apply(this, arguments);
            sender._pc = this;
            return sender;
        };
        window.RTCRtpSender.prototype.getStats = function getStats() {
            var sender = this;
            return this._pc.getStats().then(function(result) {
                return(/* Note: this will include stats of all senders that
         *   send a track with the same id as sender.track as
         *   it is not possible to identify the RTCRtpSender.
         */ $993722e8c7a9e5a7$export$93439ffc3f787d51(result, sender.track, true));
            });
        };
    }
    // shim receiver stats.
    if (!("getStats" in window.RTCRtpReceiver.prototype)) {
        var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
        if (origGetReceivers) window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
            var _this = this;
            var receivers = origGetReceivers.apply(this, []);
            receivers.forEach(function(receiver) {
                return receiver._pc = _this;
            });
            return receivers;
        };
        $993722e8c7a9e5a7$export$1f48841962b828b1(window, "track", function(e) {
            e.receiver._pc = e.srcElement;
            return e;
        });
        window.RTCRtpReceiver.prototype.getStats = function getStats() {
            var receiver = this;
            return this._pc.getStats().then(function(result) {
                return $993722e8c7a9e5a7$export$93439ffc3f787d51(result, receiver.track, false);
            });
        };
    }
    if (!("getStats" in window.RTCRtpSender.prototype && "getStats" in window.RTCRtpReceiver.prototype)) return;
    // shim RTCPeerConnection.getStats(track).
    var origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
        if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
            var track = arguments[0];
            var sender;
            var receiver;
            var err;
            this.getSenders().forEach(function(s) {
                if (s.track === track) {
                    if (sender) err = true;
                    else sender = s;
                }
            });
            this.getReceivers().forEach(function(r) {
                if (r.track === track) {
                    if (receiver) err = true;
                    else receiver = r;
                }
                return r.track === track;
            });
            if (err || sender && receiver) return Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError"));
            else if (sender) return sender.getStats();
            else if (receiver) return receiver.getStats();
            return Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
        }
        return origGetStats.apply(this, arguments);
    };
}
function $ef7fa8125ed93bad$export$30e3cdd46f8d5100(window) {
    // shim addTrack/removeTrack with native variants in order to make
    // the interactions with legacy getLocalStreams behave as in other browsers.
    // Keeps a mapping stream.id => [stream, rtpsenders...]
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        var _this = this;
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        return Object.keys(this._shimmedLocalStreams).map(function(streamId) {
            return _this._shimmedLocalStreams[streamId][0];
        });
    };
    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
        if (!stream) return origAddTrack.apply(this, arguments);
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        var sender = origAddTrack.apply(this, arguments);
        if (!this._shimmedLocalStreams[stream.id]) this._shimmedLocalStreams[stream.id] = [
            stream,
            sender
        ];
        else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) this._shimmedLocalStreams[stream.id].push(sender);
        return sender;
    };
    var origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        var _this = this;
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        stream.getTracks().forEach(function(track) {
            var alreadyExists = _this.getSenders().find(function(s) {
                return s.track === track;
            });
            if (alreadyExists) throw new DOMException("Track already exists.", "InvalidAccessError");
        });
        var existingSenders = this.getSenders();
        origAddStream.apply(this, arguments);
        var newSenders = this.getSenders().filter(function(newSender) {
            return existingSenders.indexOf(newSender) === -1;
        });
        this._shimmedLocalStreams[stream.id] = [
            stream
        ].concat(newSenders);
    };
    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        delete this._shimmedLocalStreams[stream.id];
        return origRemoveStream.apply(this, arguments);
    };
    var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
    window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
        var _this = this;
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        if (sender) Object.keys(this._shimmedLocalStreams).forEach(function(streamId) {
            var idx = _this._shimmedLocalStreams[streamId].indexOf(sender);
            if (idx !== -1) _this._shimmedLocalStreams[streamId].splice(idx, 1);
            if (_this._shimmedLocalStreams[streamId].length === 1) delete _this._shimmedLocalStreams[streamId];
        });
        return origRemoveTrack.apply(this, arguments);
    };
}
function $ef7fa8125ed93bad$export$9588259fcf4ebc91(window, browserDetails) {
    var replaceInternalStreamId = // replace the internal stream id with the external one and
    // vice versa.
    function replaceInternalStreamId(pc, description) {
        var sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
            var externalStream = pc._reverseStreams[internalId];
            var internalStream = pc._streams[externalStream.id];
            sdp = sdp.replace(new RegExp(internalStream.id, "g"), externalStream.id);
        });
        return new RTCSessionDescription({
            type: description.type,
            sdp: sdp
        });
    };
    var replaceExternalStreamId = function replaceExternalStreamId(pc, description) {
        var sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
            var externalStream = pc._reverseStreams[internalId];
            var internalStream = pc._streams[externalStream.id];
            sdp = sdp.replace(new RegExp(externalStream.id, "g"), internalStream.id);
        });
        return new RTCSessionDescription({
            type: description.type,
            sdp: sdp
        });
    };
    if (!window.RTCPeerConnection) return;
    // shim addTrack and removeTrack.
    if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) return $ef7fa8125ed93bad$export$30e3cdd46f8d5100(window);
    // also shim pc.getLocalStreams when addTrack is shimmed
    // to return the original streams.
    var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        var _this = this;
        var nativeStreams = origGetLocalStreams.apply(this);
        this._reverseStreams = this._reverseStreams || {};
        return nativeStreams.map(function(stream) {
            return _this._reverseStreams[stream.id];
        });
    };
    var origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        var _this = this;
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        stream.getTracks().forEach(function(track) {
            var alreadyExists = _this.getSenders().find(function(s) {
                return s.track === track;
            });
            if (alreadyExists) throw new DOMException("Track already exists.", "InvalidAccessError");
        });
        // Add identity mapping for consistency with addTrack.
        // Unless this is being used with a stream from addTrack.
        if (!this._reverseStreams[stream.id]) {
            var newStream = new window.MediaStream(stream.getTracks());
            this._streams[stream.id] = newStream;
            this._reverseStreams[newStream.id] = stream;
            stream = newStream;
        }
        origAddStream.apply(this, [
            stream
        ]);
    };
    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        origRemoveStream.apply(this, [
            this._streams[stream.id] || stream
        ]);
        delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
        delete this._streams[stream.id];
    };
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
        var _this = this;
        if (this.signalingState === "closed") throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
        var streams = [].slice.call(arguments, 1);
        if (streams.length !== 1 || !streams[0].getTracks().find(function(t) {
            return t === track;
        })) // this is not fully correct but all we can manage without
        // [[associated MediaStreams]] internal slot.
        throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
        var alreadyExists = this.getSenders().find(function(s) {
            return s.track === track;
        });
        if (alreadyExists) throw new DOMException("Track already exists.", "InvalidAccessError");
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        var oldStream = this._streams[stream.id];
        if (oldStream) {
            // this is using odd Chrome behaviour, use with caution:
            // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
            // Note: we rely on the high-level addTrack/dtmf shim to
            // create the sender with a dtmf sender.
            oldStream.addTrack(track);
            // Trigger ONN async.
            Promise.resolve().then(function() {
                _this.dispatchEvent(new Event("negotiationneeded"));
            });
        } else {
            var newStream = new window.MediaStream([
                track
            ]);
            this._streams[stream.id] = newStream;
            this._reverseStreams[newStream.id] = stream;
            this.addStream(newStream);
        }
        return this.getSenders().find(function(s) {
            return s.track === track;
        });
    };
    [
        "createOffer",
        "createAnswer"
    ].forEach(function(method) {
        var nativeMethod = window.RTCPeerConnection.prototype[method];
        var methodObj = (0, $44635a22a5de2b4c$export$2e2bcd8739ae039)({}, method, function() {
            var _this = this;
            var args = arguments;
            var isLegacyCall = arguments.length && typeof arguments[0] === "function";
            if (isLegacyCall) return nativeMethod.apply(this, [
                function(description) {
                    var desc = replaceInternalStreamId(_this, description);
                    args[0].apply(null, [
                        desc
                    ]);
                },
                function(err) {
                    if (args[1]) args[1].apply(null, err);
                },
                arguments[2]
            ]);
            return nativeMethod.apply(this, arguments).then(function(description) {
                return replaceInternalStreamId(_this, description);
            });
        });
        window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
    var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
    window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
        if (!arguments.length || !arguments[0].type) return origSetLocalDescription.apply(this, arguments);
        arguments[0] = replaceExternalStreamId(this, arguments[0]);
        return origSetLocalDescription.apply(this, arguments);
    };
    // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier
    var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, "localDescription");
    Object.defineProperty(window.RTCPeerConnection.prototype, "localDescription", {
        get: function() {
            var description = origLocalDescription.get.apply(this);
            if (description.type === "") return description;
            return replaceInternalStreamId(this, description);
        }
    });
    window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
        var _this = this;
        if (this.signalingState === "closed") throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
        // We can not yet check for sender instanceof RTCRtpSender
        // since we shim RTPSender. So we check if sender._pc is set.
        if (!sender._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
        var isLocal = sender._pc === this;
        if (!isLocal) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
        // Search for the native stream the senders track belongs to.
        this._streams = this._streams || {};
        var stream;
        Object.keys(this._streams).forEach(function(streamid) {
            var hasTrack = _this._streams[streamid].getTracks().find(function(track) {
                return sender.track === track;
            });
            if (hasTrack) stream = _this._streams[streamid];
        });
        if (stream) {
            if (stream.getTracks().length === 1) // if this is the last track of the stream, remove the stream. This
            // takes care of any shimmed _senders.
            this.removeStream(this._reverseStreams[stream.id]);
            else // relying on the same odd chrome behaviour as above.
            stream.removeTrack(sender.track);
            this.dispatchEvent(new Event("negotiationneeded"));
        }
    };
}
function $ef7fa8125ed93bad$export$852a08dda9a55ea7(window, browserDetails) {
    if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) // very basic support for old versions.
    window.RTCPeerConnection = window.webkitRTCPeerConnection;
    if (!window.RTCPeerConnection) return;
    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
    if (browserDetails.version < 53) [
        "setLocalDescription",
        "setRemoteDescription",
        "addIceCandidate"
    ].forEach(function(method) {
        var nativeMethod = window.RTCPeerConnection.prototype[method];
        var methodObj = (0, $44635a22a5de2b4c$export$2e2bcd8739ae039)({}, method, function() {
            arguments[0] = new (method === "addIceCandidate" ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
            return nativeMethod.apply(this, arguments);
        });
        window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
}
function $ef7fa8125ed93bad$export$341293bbeaae37cb(window, browserDetails) {
    $993722e8c7a9e5a7$export$1f48841962b828b1(window, "negotiationneeded", function(e) {
        var pc = e.target;
        if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === "plan-b") {
            if (pc.signalingState !== "stable") return;
        }
        return e;
    });
}


var $f7879eae6ce316c3$exports = {};

$parcel$export($f7879eae6ce316c3$exports, "shimOnTrack", function () { return $f7879eae6ce316c3$export$f358708f68ab068; });
$parcel$export($f7879eae6ce316c3$exports, "shimPeerConnection", function () { return $f7879eae6ce316c3$export$852a08dda9a55ea7; });
$parcel$export($f7879eae6ce316c3$exports, "shimSenderGetStats", function () { return $f7879eae6ce316c3$export$f0525502095c04ef; });
$parcel$export($f7879eae6ce316c3$exports, "shimReceiverGetStats", function () { return $f7879eae6ce316c3$export$83d69126527b1171; });
$parcel$export($f7879eae6ce316c3$exports, "shimRemoveStream", function () { return $f7879eae6ce316c3$export$825e523ef749bd8c; });
$parcel$export($f7879eae6ce316c3$exports, "shimRTCDataChannel", function () { return $f7879eae6ce316c3$export$ff9cb3bc8990e8f7; });
$parcel$export($f7879eae6ce316c3$exports, "shimAddTransceiver", function () { return $f7879eae6ce316c3$export$70c77533b6e9908d; });
$parcel$export($f7879eae6ce316c3$exports, "shimGetParameters", function () { return $f7879eae6ce316c3$export$66238223c298fbaa; });
$parcel$export($f7879eae6ce316c3$exports, "shimCreateOffer", function () { return $f7879eae6ce316c3$export$51beccf0e777b843; });
$parcel$export($f7879eae6ce316c3$exports, "shimCreateAnswer", function () { return $f7879eae6ce316c3$export$df0b46e7cef08150; });
$parcel$export($f7879eae6ce316c3$exports, "shimGetUserMedia", function () { return $ff944220a0d9cb56$export$1ed4910f4d37dc5e; });
$parcel$export($f7879eae6ce316c3$exports, "shimGetDisplayMedia", function () { return $3b086a053fdafaab$export$97270b87351d9c04; });
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 


function $1eff69d19102cef4$export$2e2bcd8739ae039(arr) {
    if (Array.isArray(arr)) return (0, $8e10d5387f51b551$export$2e2bcd8739ae039)(arr);
}



function $3ba757588a0f03e6$export$2e2bcd8739ae039() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}



function $2964a74df30860a5$export$2e2bcd8739ae039(arr) {
    return (0, $1eff69d19102cef4$export$2e2bcd8739ae039)(arr) || (0, $ebec43925b514865$export$2e2bcd8739ae039)(arr) || (0, $6842459d5565b742$export$2e2bcd8739ae039)(arr) || (0, $3ba757588a0f03e6$export$2e2bcd8739ae039)();
}



/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 
"use strict";
function $ff944220a0d9cb56$export$1ed4910f4d37dc5e(window, browserDetails) {
    var navigator = window && window.navigator;
    var MediaStreamTrack = window && window.MediaStreamTrack;
    navigator.getUserMedia = function(constraints, onSuccess, onError) {
        // Replace Firefox 44+'s deprecation warning with unprefixed version.
        $993722e8c7a9e5a7$export$cdd73fc4100a6ef4("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia");
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    };
    if (!(browserDetails.version > 55 && "autoGainControl" in navigator.mediaDevices.getSupportedConstraints())) {
        var remap = function remap(obj, a, b) {
            if (a in obj && !(b in obj)) {
                obj[b] = obj[a];
                delete obj[a];
            }
        };
        var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(c) {
            if (typeof c === "object" && typeof c.audio === "object") {
                c = JSON.parse(JSON.stringify(c));
                remap(c.audio, "autoGainControl", "mozAutoGainControl");
                remap(c.audio, "noiseSuppression", "mozNoiseSuppression");
            }
            return nativeGetUserMedia(c);
        };
        if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
            var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
            MediaStreamTrack.prototype.getSettings = function() {
                var obj = nativeGetSettings.apply(this, arguments);
                remap(obj, "mozAutoGainControl", "autoGainControl");
                remap(obj, "mozNoiseSuppression", "noiseSuppression");
                return obj;
            };
        }
        if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
            var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
            MediaStreamTrack.prototype.applyConstraints = function(c) {
                if (this.kind === "audio" && typeof c === "object") {
                    c = JSON.parse(JSON.stringify(c));
                    remap(c, "autoGainControl", "mozAutoGainControl");
                    remap(c, "noiseSuppression", "mozNoiseSuppression");
                }
                return nativeApplyConstraints.apply(this, [
                    c
                ]);
            };
        }
    }
}


/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ "use strict";
function $3b086a053fdafaab$export$97270b87351d9c04(window, preferredMediaSource) {
    if (window.navigator.mediaDevices && "getDisplayMedia" in window.navigator.mediaDevices) return;
    if (!window.navigator.mediaDevices) return;
    window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
        if (!(constraints && constraints.video)) {
            var err = new DOMException("getDisplayMedia without video constraints is undefined");
            err.name = "NotFoundError";
            // from https://heycam.github.io/webidl/#idl-DOMException-error-names
            err.code = 8;
            return Promise.reject(err);
        }
        if (constraints.video === true) constraints.video = {
            mediaSource: preferredMediaSource
        };
        else constraints.video.mediaSource = preferredMediaSource;
        return window.navigator.mediaDevices.getUserMedia(constraints);
    };
}


"use strict";
function $f7879eae6ce316c3$export$f358708f68ab068(window) {
    if (typeof window === "object" && window.RTCTrackEvent && "receiver" in window.RTCTrackEvent.prototype && !("transceiver" in window.RTCTrackEvent.prototype)) Object.defineProperty(window.RTCTrackEvent.prototype, "transceiver", {
        get: function() {
            return {
                receiver: this.receiver
            };
        }
    });
}
function $f7879eae6ce316c3$export$852a08dda9a55ea7(window, browserDetails) {
    if (typeof window !== "object" || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) return; // probably media.peerconnection.enabled=false in about:config
    if (!window.RTCPeerConnection && window.mozRTCPeerConnection) // very basic support for old versions.
    window.RTCPeerConnection = window.mozRTCPeerConnection;
    if (browserDetails.version < 53) // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
    [
        "setLocalDescription",
        "setRemoteDescription",
        "addIceCandidate"
    ].forEach(function(method) {
        var nativeMethod = window.RTCPeerConnection.prototype[method];
        var methodObj = (0, $44635a22a5de2b4c$export$2e2bcd8739ae039)({}, method, function() {
            arguments[0] = new (method === "addIceCandidate" ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
            return nativeMethod.apply(this, arguments);
        });
        window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
    var modernStatsTypes = {
        inboundrtp: "inbound-rtp",
        outboundrtp: "outbound-rtp",
        candidatepair: "candidate-pair",
        localcandidate: "local-candidate",
        remotecandidate: "remote-candidate"
    };
    var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
        var _arguments = (0, $c235cd4828fc39e0$export$2e2bcd8739ae039)(arguments, 3), selector = _arguments[0], onSucc = _arguments[1], onErr = _arguments[2];
        return nativeGetStats.apply(this, [
            selector || null
        ]).then(function(stats) {
            if (browserDetails.version < 53 && !onSucc) // Shim only promise getStats with spec-hyphens in type names
            // Leave callback version alone; misc old uses of forEach before Map
            try {
                stats.forEach(function(stat) {
                    stat.type = modernStatsTypes[stat.type] || stat.type;
                });
            } catch (e) {
                if (e.name !== "TypeError") throw e;
                // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                stats.forEach(function(stat, i) {
                    stats.set(i, Object.assign({}, stat, {
                        type: modernStatsTypes[stat.type] || stat.type
                    }));
                });
            }
            return stats;
        }).then(onSucc, onErr);
    };
}
function $f7879eae6ce316c3$export$f0525502095c04ef(window) {
    if (!(typeof window === "object" && window.RTCPeerConnection && window.RTCRtpSender)) return;
    if (window.RTCRtpSender && "getStats" in window.RTCRtpSender.prototype) return;
    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
    if (origGetSenders) window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        var _this = this;
        var senders = origGetSenders.apply(this, []);
        senders.forEach(function(sender) {
            return sender._pc = _this;
        });
        return senders;
    };
    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    if (origAddTrack) window.RTCPeerConnection.prototype.addTrack = function addTrack() {
        var sender = origAddTrack.apply(this, arguments);
        sender._pc = this;
        return sender;
    };
    window.RTCRtpSender.prototype.getStats = function getStats() {
        return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
    };
}
function $f7879eae6ce316c3$export$83d69126527b1171(window) {
    if (!(typeof window === "object" && window.RTCPeerConnection && window.RTCRtpSender)) return;
    if (window.RTCRtpSender && "getStats" in window.RTCRtpReceiver.prototype) return;
    var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
    if (origGetReceivers) window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
        var _this = this;
        var receivers = origGetReceivers.apply(this, []);
        receivers.forEach(function(receiver) {
            return receiver._pc = _this;
        });
        return receivers;
    };
    $993722e8c7a9e5a7$export$1f48841962b828b1(window, "track", function(e) {
        e.receiver._pc = e.srcElement;
        return e;
    });
    window.RTCRtpReceiver.prototype.getStats = function getStats() {
        return this._pc.getStats(this.track);
    };
}
function $f7879eae6ce316c3$export$825e523ef749bd8c(window) {
    if (!window.RTCPeerConnection || "removeStream" in window.RTCPeerConnection.prototype) return;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        var _this = this;
        $993722e8c7a9e5a7$export$cdd73fc4100a6ef4("removeStream", "removeTrack");
        this.getSenders().forEach(function(sender) {
            if (sender.track && stream.getTracks().includes(sender.track)) _this.removeTrack(sender);
        });
    };
}
function $f7879eae6ce316c3$export$ff9cb3bc8990e8f7(window) {
    // rename DataChannel to RTCDataChannel (native fix in FF60):
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
    if (window.DataChannel && !window.RTCDataChannel) window.RTCDataChannel = window.DataChannel;
}
function $f7879eae6ce316c3$export$70c77533b6e9908d(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === "object" && window.RTCPeerConnection)) return;
    var origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
    if (origAddTransceiver) window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
        this.setParametersPromises = [];
        // WebIDL input coercion and validation
        var sendEncodings = arguments[1] && arguments[1].sendEncodings;
        if (sendEncodings === undefined) sendEncodings = [];
        sendEncodings = (0, $2964a74df30860a5$export$2e2bcd8739ae039)(sendEncodings);
        var shouldPerformCheck = sendEncodings.length > 0;
        if (shouldPerformCheck) // If sendEncodings params are provided, validate grammar
        sendEncodings.forEach(function(encodingParam) {
            if ("rid" in encodingParam) {
                var ridRegex = /^[a-z0-9]{0,16}$/i;
                if (!ridRegex.test(encodingParam.rid)) throw new TypeError("Invalid RID value provided.");
            }
            if ("scaleResolutionDownBy" in encodingParam) {
                if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) throw new RangeError("scale_resolution_down_by must be >= 1.0");
            }
            if ("maxFramerate" in encodingParam) {
                if (!(parseFloat(encodingParam.maxFramerate) >= 0)) throw new RangeError("max_framerate must be >= 0.0");
            }
        });
        var transceiver = origAddTransceiver.apply(this, arguments);
        if (shouldPerformCheck) {
            // Check if the init options were applied. If not we do this in an
            // asynchronous way and save the promise reference in a global object.
            // This is an ugly hack, but at the same time is way more robust than
            // checking the sender parameters before and after the createOffer
            // Also note that after the createoffer we are not 100% sure that
            // the params were asynchronously applied so we might miss the
            // opportunity to recreate offer.
            var sender = transceiver.sender;
            var params = sender.getParameters();
            if (!("encodings" in params) || // Avoid being fooled by patched getParameters() below.
            params.encodings.length === 1 && Object.keys(params.encodings[0]).length === 0) {
                params.encodings = sendEncodings;
                sender.sendEncodings = sendEncodings;
                this.setParametersPromises.push(sender.setParameters(params).then(function() {
                    delete sender.sendEncodings;
                })["catch"](function() {
                    delete sender.sendEncodings;
                }));
            }
        }
        return transceiver;
    };
}
function $f7879eae6ce316c3$export$66238223c298fbaa(window) {
    if (!(typeof window === "object" && window.RTCRtpSender)) return;
    var origGetParameters = window.RTCRtpSender.prototype.getParameters;
    if (origGetParameters) window.RTCRtpSender.prototype.getParameters = function getParameters() {
        var params = origGetParameters.apply(this, arguments);
        if (!("encodings" in params)) params.encodings = [].concat(this.sendEncodings || [
            {}
        ]);
        return params;
    };
}
function $f7879eae6ce316c3$export$51beccf0e777b843(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === "object" && window.RTCPeerConnection)) return;
    var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function createOffer() {
        var _this = this;
        if (this.setParametersPromises && this.setParametersPromises.length) return Promise.all(this.setParametersPromises).then(function() {
            return origCreateOffer.apply(_this, arguments);
        })["finally"](function() {
            _this.setParametersPromises = [];
        });
        return origCreateOffer.apply(this, arguments);
    };
}
function $f7879eae6ce316c3$export$df0b46e7cef08150(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === "object" && window.RTCPeerConnection)) return;
    var origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
    window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
        var _this = this;
        if (this.setParametersPromises && this.setParametersPromises.length) return Promise.all(this.setParametersPromises).then(function() {
            return origCreateAnswer.apply(_this, arguments);
        })["finally"](function() {
            _this.setParametersPromises = [];
        });
        return origCreateAnswer.apply(this, arguments);
    };
}


var $b5603e2a25579e83$exports = {};

$parcel$export($b5603e2a25579e83$exports, "shimLocalStreamsAPI", function () { return $b5603e2a25579e83$export$8df41282f4fdcea2; });
$parcel$export($b5603e2a25579e83$exports, "shimRemoteStreamsAPI", function () { return $b5603e2a25579e83$export$762aa4cbb4f2f857; });
$parcel$export($b5603e2a25579e83$exports, "shimCallbacksAPI", function () { return $b5603e2a25579e83$export$da31df245debdd3; });
$parcel$export($b5603e2a25579e83$exports, "shimGetUserMedia", function () { return $b5603e2a25579e83$export$1ed4910f4d37dc5e; });
$parcel$export($b5603e2a25579e83$exports, "shimConstraints", function () { return $b5603e2a25579e83$export$494a01ac68ba81ac; });
$parcel$export($b5603e2a25579e83$exports, "shimRTCIceServerUrls", function () { return $b5603e2a25579e83$export$671a8b47b41b6f41; });
$parcel$export($b5603e2a25579e83$exports, "shimTrackEventTransceiver", function () { return $b5603e2a25579e83$export$85d53da088cb1b14; });
$parcel$export($b5603e2a25579e83$exports, "shimCreateOfferLegacy", function () { return $b5603e2a25579e83$export$d444266503fdd2d4; });
$parcel$export($b5603e2a25579e83$exports, "shimAudioContext", function () { return $b5603e2a25579e83$export$857cd739a7b795d2; });
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ 
"use strict";
function $b5603e2a25579e83$export$8df41282f4fdcea2(window) {
    if (typeof window !== "object" || !window.RTCPeerConnection) return;
    if (!("getLocalStreams" in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        if (!this._localStreams) this._localStreams = [];
        return this._localStreams;
    };
    if (!("addStream" in window.RTCPeerConnection.prototype)) {
        var _addTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
            var _this = this;
            if (!this._localStreams) this._localStreams = [];
            if (!this._localStreams.includes(stream)) this._localStreams.push(stream);
            // Try to emulate Chrome's behaviour of adding in audio-video order.
            // Safari orders by track id.
            stream.getAudioTracks().forEach(function(track) {
                return _addTrack.call(_this, track, stream);
            });
            stream.getVideoTracks().forEach(function(track) {
                return _addTrack.call(_this, track, stream);
            });
        };
        window.RTCPeerConnection.prototype.addTrack = function addTrack(track) {
            for(var _len = arguments.length, streams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                streams[_key - 1] = arguments[_key];
            }
            var _this = this;
            if (streams) streams.forEach(function(stream) {
                if (!_this._localStreams) _this._localStreams = [
                    stream
                ];
                else if (!_this._localStreams.includes(stream)) _this._localStreams.push(stream);
            });
            return _addTrack.apply(this, arguments);
        };
    }
    if (!("removeStream" in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        var _this = this;
        if (!this._localStreams) this._localStreams = [];
        var index = this._localStreams.indexOf(stream);
        if (index === -1) return;
        this._localStreams.splice(index, 1);
        var tracks = stream.getTracks();
        this.getSenders().forEach(function(sender) {
            if (tracks.includes(sender.track)) _this.removeTrack(sender);
        });
    };
}
function $b5603e2a25579e83$export$762aa4cbb4f2f857(window) {
    if (typeof window !== "object" || !window.RTCPeerConnection) return;
    if (!("getRemoteStreams" in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
        return this._remoteStreams ? this._remoteStreams : [];
    };
    if (!("onaddstream" in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, "onaddstream", {
            get: function() {
                return this._onaddstream;
            },
            set: function(f) {
                var _this = this;
                if (this._onaddstream) {
                    this.removeEventListener("addstream", this._onaddstream);
                    this.removeEventListener("track", this._onaddstreampoly);
                }
                this.addEventListener("addstream", this._onaddstream = f);
                this.addEventListener("track", this._onaddstreampoly = function(e) {
                    e.streams.forEach(function(stream) {
                        if (!_this._remoteStreams) _this._remoteStreams = [];
                        if (_this._remoteStreams.includes(stream)) return;
                        _this._remoteStreams.push(stream);
                        var event = new Event("addstream");
                        event.stream = stream;
                        _this.dispatchEvent(event);
                    });
                });
            }
        });
        var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
            var pc = this;
            if (!this._onaddstreampoly) this.addEventListener("track", this._onaddstreampoly = function(e) {
                e.streams.forEach(function(stream) {
                    if (!pc._remoteStreams) pc._remoteStreams = [];
                    if (pc._remoteStreams.indexOf(stream) >= 0) return;
                    pc._remoteStreams.push(stream);
                    var event = new Event("addstream");
                    event.stream = stream;
                    pc.dispatchEvent(event);
                });
            });
            return origSetRemoteDescription.apply(pc, arguments);
        };
    }
}
function $b5603e2a25579e83$export$da31df245debdd3(window) {
    if (typeof window !== "object" || !window.RTCPeerConnection) return;
    var prototype = window.RTCPeerConnection.prototype;
    var origCreateOffer = prototype.createOffer;
    var origCreateAnswer = prototype.createAnswer;
    var setLocalDescription = prototype.setLocalDescription;
    var setRemoteDescription = prototype.setRemoteDescription;
    var addIceCandidate = prototype.addIceCandidate;
    prototype.createOffer = function createOffer(successCallback, failureCallback) {
        var options = arguments.length >= 2 ? arguments[2] : arguments[0];
        var promise = origCreateOffer.apply(this, [
            options
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
        var options = arguments.length >= 2 ? arguments[2] : arguments[0];
        var promise = origCreateAnswer.apply(this, [
            options
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    var withCallback = function withCallback(description, successCallback, failureCallback) {
        var promise = setLocalDescription.apply(this, [
            description
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.setLocalDescription = withCallback;
    withCallback = function withCallback(description, successCallback, failureCallback) {
        var promise = setRemoteDescription.apply(this, [
            description
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.setRemoteDescription = withCallback;
    withCallback = function withCallback(candidate, successCallback, failureCallback) {
        var promise = addIceCandidate.apply(this, [
            candidate
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.addIceCandidate = withCallback;
}
function $b5603e2a25579e83$export$1ed4910f4d37dc5e(window) {
    var navigator = window && window.navigator;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // shim not needed in Safari 12.1
        var mediaDevices = navigator.mediaDevices;
        var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
        navigator.mediaDevices.getUserMedia = function(constraints) {
            return _getUserMedia($b5603e2a25579e83$export$494a01ac68ba81ac(constraints));
        };
    }
    if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) navigator.getUserMedia = (function getUserMedia(constraints, cb, errcb) {
        navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
    }).bind(navigator);
}
function $b5603e2a25579e83$export$494a01ac68ba81ac(constraints) {
    if (constraints && constraints.video !== undefined) return Object.assign({}, constraints, {
        video: $993722e8c7a9e5a7$export$15384eac40dc88c8(constraints.video)
    });
    return constraints;
}
function $b5603e2a25579e83$export$671a8b47b41b6f41(window) {
    if (!window.RTCPeerConnection) return;
    // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
    var OrigPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
        if (pcConfig && pcConfig.iceServers) {
            var newIceServers = [];
            for(var i = 0; i < pcConfig.iceServers.length; i++){
                var server = pcConfig.iceServers[i];
                if (!server.hasOwnProperty("urls") && server.hasOwnProperty("url")) {
                    $993722e8c7a9e5a7$export$cdd73fc4100a6ef4("RTCIceServer.url", "RTCIceServer.urls");
                    server = JSON.parse(JSON.stringify(server));
                    server.urls = server.url;
                    delete server.url;
                    newIceServers.push(server);
                } else newIceServers.push(pcConfig.iceServers[i]);
            }
            pcConfig.iceServers = newIceServers;
        }
        return new OrigPeerConnection(pcConfig, pcConstraints);
    };
    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
    // wrap static methods. Currently just generateCertificate.
    if ("generateCertificate" in OrigPeerConnection) Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
        get: function() {
            return OrigPeerConnection.generateCertificate;
        }
    });
}
function $b5603e2a25579e83$export$85d53da088cb1b14(window) {
    // Add event.transceiver member over deprecated event.receiver
    if (typeof window === "object" && window.RTCTrackEvent && "receiver" in window.RTCTrackEvent.prototype && !("transceiver" in window.RTCTrackEvent.prototype)) Object.defineProperty(window.RTCTrackEvent.prototype, "transceiver", {
        get: function() {
            return {
                receiver: this.receiver
            };
        }
    });
}
function $b5603e2a25579e83$export$d444266503fdd2d4(window) {
    var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
        if (offerOptions) {
            if (typeof offerOptions.offerToReceiveAudio !== "undefined") // support bit values
            offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
            var audioTransceiver = this.getTransceivers().find(function(transceiver) {
                return transceiver.receiver.track.kind === "audio";
            });
            if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                if (audioTransceiver.direction === "sendrecv") {
                    if (audioTransceiver.setDirection) audioTransceiver.setDirection("sendonly");
                    else audioTransceiver.direction = "sendonly";
                } else if (audioTransceiver.direction === "recvonly") {
                    if (audioTransceiver.setDirection) audioTransceiver.setDirection("inactive");
                    else audioTransceiver.direction = "inactive";
                }
            } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) this.addTransceiver("audio", {
                direction: "recvonly"
            });
            if (typeof offerOptions.offerToReceiveVideo !== "undefined") // support bit values
            offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
            var videoTransceiver = this.getTransceivers().find(function(transceiver) {
                return transceiver.receiver.track.kind === "video";
            });
            if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                if (videoTransceiver.direction === "sendrecv") {
                    if (videoTransceiver.setDirection) videoTransceiver.setDirection("sendonly");
                    else videoTransceiver.direction = "sendonly";
                } else if (videoTransceiver.direction === "recvonly") {
                    if (videoTransceiver.setDirection) videoTransceiver.setDirection("inactive");
                    else videoTransceiver.direction = "inactive";
                }
            } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) this.addTransceiver("video", {
                direction: "recvonly"
            });
        }
        return origCreateOffer.apply(this, arguments);
    };
}
function $b5603e2a25579e83$export$857cd739a7b795d2(window) {
    if (typeof window !== "object" || window.AudioContext) return;
    window.AudioContext = window.webkitAudioContext;
}


var $1e725cbbdf747411$exports = {};

$parcel$export($1e725cbbdf747411$exports, "shimRTCIceCandidate", function () { return $1e725cbbdf747411$export$cf133661e444ccfe; });
$parcel$export($1e725cbbdf747411$exports, "shimRTCIceCandidateRelayProtocol", function () { return $1e725cbbdf747411$export$fdafb8d8280e29b5; });
$parcel$export($1e725cbbdf747411$exports, "shimMaxMessageSize", function () { return $1e725cbbdf747411$export$a99147c78a56edc4; });
$parcel$export($1e725cbbdf747411$exports, "shimSendThrowTypeError", function () { return $1e725cbbdf747411$export$d461c8d5c5db5da7; });
$parcel$export($1e725cbbdf747411$exports, "shimConnectionState", function () { return $1e725cbbdf747411$export$63bb816cc75460; });
$parcel$export($1e725cbbdf747411$exports, "removeExtmapAllowMixed", function () { return $1e725cbbdf747411$export$a57d114344295149; });
$parcel$export($1e725cbbdf747411$exports, "shimAddIceCandidateNullOrEmpty", function () { return $1e725cbbdf747411$export$51d5e40b48c771c7; });
$parcel$export($1e725cbbdf747411$exports, "shimParameterlessSetLocalDescription", function () { return $1e725cbbdf747411$export$7170d04e59f9d553; });
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ var $b2727632138354b2$exports = {};
/* eslint-env node */ "use strict";
// SDP helpers.
var $b2727632138354b2$var$SDPUtils = {};
// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
$b2727632138354b2$var$SDPUtils.generateIdentifier = function() {
    return Math.random().toString(36).substring(2, 12);
};
// The RTCP CNAME used by all peerconnections from the same JS.
$b2727632138354b2$var$SDPUtils.localCName = $b2727632138354b2$var$SDPUtils.generateIdentifier();
// Splits SDP into lines, dealing with both CRLF and LF.
$b2727632138354b2$var$SDPUtils.splitLines = function(blob) {
    return blob.trim().split("\n").map(function(line) {
        return line.trim();
    });
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
$b2727632138354b2$var$SDPUtils.splitSections = function(blob) {
    var parts = blob.split("\nm=");
    return parts.map(function(part, index) {
        return (index > 0 ? "m=" + part : part).trim() + "\r\n";
    });
};
// Returns the session description.
$b2727632138354b2$var$SDPUtils.getDescription = function(blob) {
    var sections = $b2727632138354b2$var$SDPUtils.splitSections(blob);
    return sections && sections[0];
};
// Returns the individual media sections.
$b2727632138354b2$var$SDPUtils.getMediaSections = function(blob) {
    var sections = $b2727632138354b2$var$SDPUtils.splitSections(blob);
    sections.shift();
    return sections;
};
// Returns lines that start with a certain prefix.
$b2727632138354b2$var$SDPUtils.matchPrefix = function(blob, prefix) {
    return $b2727632138354b2$var$SDPUtils.splitLines(blob).filter(function(line) {
        return line.indexOf(prefix) === 0;
    });
};
// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
// Input can be prefixed with a=.
$b2727632138354b2$var$SDPUtils.parseCandidate = function(line) {
    var parts;
    // Parse both variants.
    if (line.indexOf("a=candidate:") === 0) parts = line.substring(12).split(" ");
    else parts = line.substring(10).split(" ");
    var candidate = {
        foundation: parts[0],
        component: {
            1: "rtp",
            2: "rtcp"
        }[parts[1]] || parts[1],
        protocol: parts[2].toLowerCase(),
        priority: parseInt(parts[3], 10),
        ip: parts[4],
        address: parts[4],
        port: parseInt(parts[5], 10),
        // skip parts[6] == 'typ'
        type: parts[7]
    };
    for(var i = 8; i < parts.length; i += 2)switch(parts[i]){
        case "raddr":
            candidate.relatedAddress = parts[i + 1];
            break;
        case "rport":
            candidate.relatedPort = parseInt(parts[i + 1], 10);
            break;
        case "tcptype":
            candidate.tcpType = parts[i + 1];
            break;
        case "ufrag":
            candidate.ufrag = parts[i + 1]; // for backward compatibility.
            candidate.usernameFragment = parts[i + 1];
            break;
        default:
            if (candidate[parts[i]] === undefined) candidate[parts[i]] = parts[i + 1];
            break;
    }
    return candidate;
};
// Translates a candidate object into SDP candidate attribute.
// This does not include the a= prefix!
$b2727632138354b2$var$SDPUtils.writeCandidate = function(candidate) {
    var sdp = [];
    sdp.push(candidate.foundation);
    var component = candidate.component;
    if (component === "rtp") sdp.push(1);
    else if (component === "rtcp") sdp.push(2);
    else sdp.push(component);
    sdp.push(candidate.protocol.toUpperCase());
    sdp.push(candidate.priority);
    sdp.push(candidate.address || candidate.ip);
    sdp.push(candidate.port);
    var type = candidate.type;
    sdp.push("typ");
    sdp.push(type);
    if (type !== "host" && candidate.relatedAddress && candidate.relatedPort) {
        sdp.push("raddr");
        sdp.push(candidate.relatedAddress);
        sdp.push("rport");
        sdp.push(candidate.relatedPort);
    }
    if (candidate.tcpType && candidate.protocol.toLowerCase() === "tcp") {
        sdp.push("tcptype");
        sdp.push(candidate.tcpType);
    }
    if (candidate.usernameFragment || candidate.ufrag) {
        sdp.push("ufrag");
        sdp.push(candidate.usernameFragment || candidate.ufrag);
    }
    return "candidate:" + sdp.join(" ");
};
// Parses an ice-options line, returns an array of option tags.
// Sample input:
// a=ice-options:foo bar
$b2727632138354b2$var$SDPUtils.parseIceOptions = function(line) {
    return line.substring(14).split(" ");
};
// Parses a rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
$b2727632138354b2$var$SDPUtils.parseRtpMap = function(line) {
    var parts = line.substring(9).split(" ");
    var parsed = {
        payloadType: parseInt(parts.shift(), 10)
    };
    parts = parts[0].split("/");
    parsed.name = parts[0];
    parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
    parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
    // legacy alias, got renamed back to channels in ORTC.
    parsed.numChannels = parsed.channels;
    return parsed;
};
// Generates a rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
$b2727632138354b2$var$SDPUtils.writeRtpMap = function(codec) {
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
    var channels = codec.channels || codec.numChannels || 1;
    return "a=rtpmap:" + pt + " " + codec.name + "/" + codec.clockRate + (channels !== 1 ? "/" + channels : "") + "\r\n";
};
// Parses a extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
$b2727632138354b2$var$SDPUtils.parseExtmap = function(line) {
    var parts = line.substring(9).split(" ");
    return {
        id: parseInt(parts[0], 10),
        direction: parts[0].indexOf("/") > 0 ? parts[0].split("/")[1] : "sendrecv",
        uri: parts[1],
        attributes: parts.slice(2).join(" ")
    };
};
// Generates an extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
$b2727632138354b2$var$SDPUtils.writeExtmap = function(headerExtension) {
    return "a=extmap:" + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== "sendrecv" ? "/" + headerExtension.direction : "") + " " + headerExtension.uri + (headerExtension.attributes ? " " + headerExtension.attributes : "") + "\r\n";
};
// Parses a fmtp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
$b2727632138354b2$var$SDPUtils.parseFmtp = function(line) {
    var parsed = {};
    var kv;
    var parts = line.substring(line.indexOf(" ") + 1).split(";");
    for(var j = 0; j < parts.length; j++){
        kv = parts[j].trim().split("=");
        parsed[kv[0].trim()] = kv[1];
    }
    return parsed;
};
// Generates a fmtp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
$b2727632138354b2$var$SDPUtils.writeFmtp = function(codec) {
    var line = "";
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
    if (codec.parameters && Object.keys(codec.parameters).length) {
        var params = [];
        Object.keys(codec.parameters).forEach(function(param) {
            if (codec.parameters[param] !== undefined) params.push(param + "=" + codec.parameters[param]);
            else params.push(param);
        });
        line += "a=fmtp:" + pt + " " + params.join(";") + "\r\n";
    }
    return line;
};
// Parses a rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
$b2727632138354b2$var$SDPUtils.parseRtcpFb = function(line) {
    var parts = line.substring(line.indexOf(" ") + 1).split(" ");
    return {
        type: parts.shift(),
        parameter: parts.join(" ")
    };
};
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
$b2727632138354b2$var$SDPUtils.writeRtcpFb = function(codec) {
    var lines = "";
    var pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
    if (codec.rtcpFeedback && codec.rtcpFeedback.length) // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach(function(fb) {
        lines += "a=rtcp-fb:" + pt + " " + fb.type + (fb.parameter && fb.parameter.length ? " " + fb.parameter : "") + "\r\n";
    });
    return lines;
};
// Parses a RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
$b2727632138354b2$var$SDPUtils.parseSsrcMedia = function(line) {
    var sp = line.indexOf(" ");
    var parts = {
        ssrc: parseInt(line.substring(7, sp), 10)
    };
    var colon = line.indexOf(":", sp);
    if (colon > -1) {
        parts.attribute = line.substring(sp + 1, colon);
        parts.value = line.substring(colon + 1);
    } else parts.attribute = line.substring(sp + 1);
    return parts;
};
// Parse a ssrc-group line (see RFC 5576). Sample input:
// a=ssrc-group:semantics 12 34
$b2727632138354b2$var$SDPUtils.parseSsrcGroup = function(line) {
    var parts = line.substring(13).split(" ");
    return {
        semantics: parts.shift(),
        ssrcs: parts.map(function(ssrc) {
            return parseInt(ssrc, 10);
        })
    };
};
// Extracts the MID (RFC 5888) from a media section.
// Returns the MID or undefined if no mid line was found.
$b2727632138354b2$var$SDPUtils.getMid = function(mediaSection) {
    var mid = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=mid:")[0];
    if (mid) return mid.substring(6);
};
// Parses a fingerprint line for DTLS-SRTP.
$b2727632138354b2$var$SDPUtils.parseFingerprint = function(line) {
    var parts = line.substring(14).split(" ");
    return {
        algorithm: parts[0].toLowerCase(),
        value: parts[1].toUpperCase()
    };
};
// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
$b2727632138354b2$var$SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
    var lines = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection + sessionpart, "a=fingerprint:");
    // Note: a=setup line is ignored since we use the 'auto' role in Edge.
    return {
        role: "auto",
        fingerprints: lines.map($b2727632138354b2$var$SDPUtils.parseFingerprint)
    };
};
// Serializes DTLS parameters to SDP.
$b2727632138354b2$var$SDPUtils.writeDtlsParameters = function(params, setupType) {
    var sdp = "a=setup:" + setupType + "\r\n";
    params.fingerprints.forEach(function(fp) {
        sdp += "a=fingerprint:" + fp.algorithm + " " + fp.value + "\r\n";
    });
    return sdp;
};
// Parses a=crypto lines into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
$b2727632138354b2$var$SDPUtils.parseCryptoLine = function(line) {
    var parts = line.substring(9).split(" ");
    return {
        tag: parseInt(parts[0], 10),
        cryptoSuite: parts[1],
        keyParams: parts[2],
        sessionParams: parts.slice(3)
    };
};
$b2727632138354b2$var$SDPUtils.writeCryptoLine = function(parameters) {
    return "a=crypto:" + parameters.tag + " " + parameters.cryptoSuite + " " + (typeof parameters.keyParams === "object" ? $b2727632138354b2$var$SDPUtils.writeCryptoKeyParams(parameters.keyParams) : parameters.keyParams) + (parameters.sessionParams ? " " + parameters.sessionParams.join(" ") : "") + "\r\n";
};
// Parses the crypto key parameters into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
$b2727632138354b2$var$SDPUtils.parseCryptoKeyParams = function(keyParams) {
    if (keyParams.indexOf("inline:") !== 0) return null;
    var parts = keyParams.substring(7).split("|");
    return {
        keyMethod: "inline",
        keySalt: parts[0],
        lifeTime: parts[1],
        mkiValue: parts[2] ? parts[2].split(":")[0] : undefined,
        mkiLength: parts[2] ? parts[2].split(":")[1] : undefined
    };
};
$b2727632138354b2$var$SDPUtils.writeCryptoKeyParams = function(keyParams) {
    return keyParams.keyMethod + ":" + keyParams.keySalt + (keyParams.lifeTime ? "|" + keyParams.lifeTime : "") + (keyParams.mkiValue && keyParams.mkiLength ? "|" + keyParams.mkiValue + ":" + keyParams.mkiLength : "");
};
// Extracts all SDES parameters.
$b2727632138354b2$var$SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
    var lines = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection + sessionpart, "a=crypto:");
    return lines.map($b2727632138354b2$var$SDPUtils.parseCryptoLine);
};
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
$b2727632138354b2$var$SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
    var ufrag = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection + sessionpart, "a=ice-ufrag:")[0];
    var pwd = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection + sessionpart, "a=ice-pwd:")[0];
    if (!(ufrag && pwd)) return null;
    return {
        usernameFragment: ufrag.substring(12),
        password: pwd.substring(10)
    };
};
// Serializes ICE parameters to SDP.
$b2727632138354b2$var$SDPUtils.writeIceParameters = function(params) {
    var sdp = "a=ice-ufrag:" + params.usernameFragment + "\r\n" + "a=ice-pwd:" + params.password + "\r\n";
    if (params.iceLite) sdp += "a=ice-lite\r\n";
    return sdp;
};
// Parses the SDP media section and returns RTCRtpParameters.
$b2727632138354b2$var$SDPUtils.parseRtpParameters = function(mediaSection) {
    var description = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: [],
        rtcp: []
    };
    var lines = $b2727632138354b2$var$SDPUtils.splitLines(mediaSection);
    var mline = lines[0].split(" ");
    for(var i = 3; i < mline.length; i++){
        var pt = mline[i];
        var rtpmapline = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=rtpmap:" + pt + " ")[0];
        if (rtpmapline) {
            var codec = $b2727632138354b2$var$SDPUtils.parseRtpMap(rtpmapline);
            var fmtps = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=fmtp:" + pt + " ");
            // Only the first a=fmtp:<pt> is considered.
            codec.parameters = fmtps.length ? $b2727632138354b2$var$SDPUtils.parseFmtp(fmtps[0]) : {};
            codec.rtcpFeedback = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=rtcp-fb:" + pt + " ").map($b2727632138354b2$var$SDPUtils.parseRtcpFb);
            description.codecs.push(codec);
            // parse FEC mechanisms from rtpmap lines.
            switch(codec.name.toUpperCase()){
                case "RED":
                case "ULPFEC":
                    description.fecMechanisms.push(codec.name.toUpperCase());
                    break;
                default:
                    break;
            }
        }
    }
    $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=extmap:").forEach(function(line) {
        description.headerExtensions.push($b2727632138354b2$var$SDPUtils.parseExtmap(line));
    });
    var wildcardRtcpFb = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=rtcp-fb:* ").map($b2727632138354b2$var$SDPUtils.parseRtcpFb);
    description.codecs.forEach(function(codec) {
        wildcardRtcpFb.forEach(function(fb) {
            var duplicate = codec.rtcpFeedback.find(function(existingFeedback) {
                return existingFeedback.type === fb.type && existingFeedback.parameter === fb.parameter;
            });
            if (!duplicate) codec.rtcpFeedback.push(fb);
        });
    });
    // FIXME: parse rtcp.
    return description;
};
// Generates parts of the SDP media section describing the capabilities /
// parameters.
$b2727632138354b2$var$SDPUtils.writeRtpDescription = function(kind, caps) {
    var sdp = "";
    // Build the mline.
    sdp += "m=" + kind + " ";
    sdp += caps.codecs.length > 0 ? "9" : "0"; // reject if no codecs.
    sdp += " UDP/TLS/RTP/SAVPF ";
    sdp += caps.codecs.map(function(codec) {
        if (codec.preferredPayloadType !== undefined) return codec.preferredPayloadType;
        return codec.payloadType;
    }).join(" ") + "\r\n";
    sdp += "c=IN IP4 0.0.0.0\r\n";
    sdp += "a=rtcp:9 IN IP4 0.0.0.0\r\n";
    // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
    caps.codecs.forEach(function(codec) {
        sdp += $b2727632138354b2$var$SDPUtils.writeRtpMap(codec);
        sdp += $b2727632138354b2$var$SDPUtils.writeFmtp(codec);
        sdp += $b2727632138354b2$var$SDPUtils.writeRtcpFb(codec);
    });
    var maxptime = 0;
    caps.codecs.forEach(function(codec) {
        if (codec.maxptime > maxptime) maxptime = codec.maxptime;
    });
    if (maxptime > 0) sdp += "a=maxptime:" + maxptime + "\r\n";
    if (caps.headerExtensions) caps.headerExtensions.forEach(function(extension) {
        sdp += $b2727632138354b2$var$SDPUtils.writeExtmap(extension);
    });
    // FIXME: write fecMechanisms.
    return sdp;
};
// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
$b2727632138354b2$var$SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
    var encodingParameters = [];
    var description = $b2727632138354b2$var$SDPUtils.parseRtpParameters(mediaSection);
    var hasRed = description.fecMechanisms.indexOf("RED") !== -1;
    var hasUlpfec = description.fecMechanisms.indexOf("ULPFEC") !== -1;
    // filter a=ssrc:... cname:, ignore PlanB-msid
    var ssrcs = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=ssrc:").map(function(line) {
        return $b2727632138354b2$var$SDPUtils.parseSsrcMedia(line);
    }).filter(function(parts) {
        return parts.attribute === "cname";
    });
    var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
    var secondarySsrc;
    var flows = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=ssrc-group:FID").map(function(line) {
        var parts = line.substring(17).split(" ");
        return parts.map(function(part) {
            return parseInt(part, 10);
        });
    });
    if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) secondarySsrc = flows[0][1];
    description.codecs.forEach(function(codec) {
        if (codec.name.toUpperCase() === "RTX" && codec.parameters.apt) {
            var encParam = {
                ssrc: primarySsrc,
                codecPayloadType: parseInt(codec.parameters.apt, 10)
            };
            if (primarySsrc && secondarySsrc) encParam.rtx = {
                ssrc: secondarySsrc
            };
            encodingParameters.push(encParam);
            if (hasRed) {
                encParam = JSON.parse(JSON.stringify(encParam));
                encParam.fec = {
                    ssrc: primarySsrc,
                    mechanism: hasUlpfec ? "red+ulpfec" : "red"
                };
                encodingParameters.push(encParam);
            }
        }
    });
    if (encodingParameters.length === 0 && primarySsrc) encodingParameters.push({
        ssrc: primarySsrc
    });
    // we support both b=AS and b=TIAS but interpret AS as TIAS.
    var bandwidth = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "b=");
    if (bandwidth.length) {
        if (bandwidth[0].indexOf("b=TIAS:") === 0) bandwidth = parseInt(bandwidth[0].substring(7), 10);
        else if (bandwidth[0].indexOf("b=AS:") === 0) // use formula from JSEP to convert b=AS to TIAS value.
        bandwidth = parseInt(bandwidth[0].substring(5), 10) * 950 - 16000;
        else bandwidth = undefined;
        encodingParameters.forEach(function(params) {
            params.maxBitrate = bandwidth;
        });
    }
    return encodingParameters;
};
// parses http://draft.ortc.org/#rtcrtcpparameters*
$b2727632138354b2$var$SDPUtils.parseRtcpParameters = function(mediaSection) {
    var rtcpParameters = {};
    // Gets the first SSRC. Note that with RTX there might be multiple
    // SSRCs.
    var remoteSsrc = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=ssrc:").map(function(line) {
        return $b2727632138354b2$var$SDPUtils.parseSsrcMedia(line);
    }).filter(function(obj) {
        return obj.attribute === "cname";
    })[0];
    if (remoteSsrc) {
        rtcpParameters.cname = remoteSsrc.value;
        rtcpParameters.ssrc = remoteSsrc.ssrc;
    }
    // Edge uses the compound attribute instead of reducedSize
    // compound is !reducedSize
    var rsize = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=rtcp-rsize");
    rtcpParameters.reducedSize = rsize.length > 0;
    rtcpParameters.compound = rsize.length === 0;
    // parses the rtcp-mux attrіbute.
    // Note that Edge does not support unmuxed RTCP.
    var mux = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=rtcp-mux");
    rtcpParameters.mux = mux.length > 0;
    return rtcpParameters;
};
$b2727632138354b2$var$SDPUtils.writeRtcpParameters = function(rtcpParameters) {
    var sdp = "";
    if (rtcpParameters.reducedSize) sdp += "a=rtcp-rsize\r\n";
    if (rtcpParameters.mux) sdp += "a=rtcp-mux\r\n";
    if (rtcpParameters.ssrc !== undefined && rtcpParameters.cname) sdp += "a=ssrc:" + rtcpParameters.ssrc + " cname:" + rtcpParameters.cname + "\r\n";
    return sdp;
};
// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
$b2727632138354b2$var$SDPUtils.parseMsid = function(mediaSection) {
    var parts;
    var spec = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=msid:");
    if (spec.length === 1) {
        parts = spec[0].substring(7).split(" ");
        return {
            stream: parts[0],
            track: parts[1]
        };
    }
    var planB = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=ssrc:").map(function(line) {
        return $b2727632138354b2$var$SDPUtils.parseSsrcMedia(line);
    }).filter(function(msidParts) {
        return msidParts.attribute === "msid";
    });
    if (planB.length > 0) {
        parts = planB[0].value.split(" ");
        return {
            stream: parts[0],
            track: parts[1]
        };
    }
};
// SCTP
// parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
// to draft-ietf-mmusic-sctp-sdp-05
$b2727632138354b2$var$SDPUtils.parseSctpDescription = function(mediaSection) {
    var mline = $b2727632138354b2$var$SDPUtils.parseMLine(mediaSection);
    var maxSizeLine = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=max-message-size:");
    var maxMessageSize;
    if (maxSizeLine.length > 0) maxMessageSize = parseInt(maxSizeLine[0].substring(19), 10);
    if (isNaN(maxMessageSize)) maxMessageSize = 65536;
    var sctpPort = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=sctp-port:");
    if (sctpPort.length > 0) return {
        port: parseInt(sctpPort[0].substring(12), 10),
        protocol: mline.fmt,
        maxMessageSize: maxMessageSize
    };
    var sctpMapLines = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "a=sctpmap:");
    if (sctpMapLines.length > 0) {
        var parts = sctpMapLines[0].substring(10).split(" ");
        return {
            port: parseInt(parts[0], 10),
            protocol: parts[1],
            maxMessageSize: maxMessageSize
        };
    }
};
// SCTP
// outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
// support by now receiving in this format, unless we originally parsed
// as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
// protocol of DTLS/SCTP -- without UDP/ or TCP/)
$b2727632138354b2$var$SDPUtils.writeSctpDescription = function(media, sctp) {
    var output = [];
    if (media.protocol !== "DTLS/SCTP") output = [
        "m=" + media.kind + " 9 " + media.protocol + " " + sctp.protocol + "\r\n",
        "c=IN IP4 0.0.0.0\r\n",
        "a=sctp-port:" + sctp.port + "\r\n"
    ];
    else output = [
        "m=" + media.kind + " 9 " + media.protocol + " " + sctp.port + "\r\n",
        "c=IN IP4 0.0.0.0\r\n",
        "a=sctpmap:" + sctp.port + " " + sctp.protocol + " 65535\r\n"
    ];
    if (sctp.maxMessageSize !== undefined) output.push("a=max-message-size:" + sctp.maxMessageSize + "\r\n");
    return output.join("");
};
// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
$b2727632138354b2$var$SDPUtils.generateSessionId = function() {
    return Math.random().toString().substr(2, 22);
};
// Write boiler plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
// sessUser is optional and defaults to 'thisisadapterortc'
$b2727632138354b2$var$SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
    var sessionId;
    var version = sessVer !== undefined ? sessVer : 2;
    if (sessId) sessionId = sessId;
    else sessionId = $b2727632138354b2$var$SDPUtils.generateSessionId();
    var user = sessUser || "thisisadapterortc";
    // FIXME: sess-id should be an NTP timestamp.
    return "v=0\r\no=" + user + " " + sessionId + " " + version + " IN IP4 127.0.0.1\r\n" + "s=-\r\n" + "t=0 0\r\n";
};
// Gets the direction from the mediaSection or the sessionpart.
$b2727632138354b2$var$SDPUtils.getDirection = function(mediaSection, sessionpart) {
    // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
    var lines = $b2727632138354b2$var$SDPUtils.splitLines(mediaSection);
    for(var i = 0; i < lines.length; i++)switch(lines[i]){
        case "a=sendrecv":
        case "a=sendonly":
        case "a=recvonly":
        case "a=inactive":
            return lines[i].substring(2);
        default:
    }
    if (sessionpart) return $b2727632138354b2$var$SDPUtils.getDirection(sessionpart);
    return "sendrecv";
};
$b2727632138354b2$var$SDPUtils.getKind = function(mediaSection) {
    var lines = $b2727632138354b2$var$SDPUtils.splitLines(mediaSection);
    var mline = lines[0].split(" ");
    return mline[0].substring(2);
};
$b2727632138354b2$var$SDPUtils.isRejected = function(mediaSection) {
    return mediaSection.split(" ", 2)[1] === "0";
};
$b2727632138354b2$var$SDPUtils.parseMLine = function(mediaSection) {
    var lines = $b2727632138354b2$var$SDPUtils.splitLines(mediaSection);
    var parts = lines[0].substring(2).split(" ");
    return {
        kind: parts[0],
        port: parseInt(parts[1], 10),
        protocol: parts[2],
        fmt: parts.slice(3).join(" ")
    };
};
$b2727632138354b2$var$SDPUtils.parseOLine = function(mediaSection) {
    var line = $b2727632138354b2$var$SDPUtils.matchPrefix(mediaSection, "o=")[0];
    var parts = line.substring(2).split(" ");
    return {
        username: parts[0],
        sessionId: parts[1],
        sessionVersion: parseInt(parts[2], 10),
        netType: parts[3],
        addressType: parts[4],
        address: parts[5]
    };
};
// a very naive interpretation of a valid SDP.
$b2727632138354b2$var$SDPUtils.isValidSDP = function(blob) {
    if (typeof blob !== "string" || blob.length === 0) return false;
    var lines = $b2727632138354b2$var$SDPUtils.splitLines(blob);
    for(var i = 0; i < lines.length; i++){
        if (lines[i].length < 2 || lines[i].charAt(1) !== "=") return false;
    // TODO: check the modifier a bit more.
    }
    return true;
};
$b2727632138354b2$exports = $b2727632138354b2$var$SDPUtils;



"use strict";
function $1e725cbbdf747411$export$cf133661e444ccfe(window) {
    // foundation is arbitrarily chosen as an indicator for full support for
    // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
    if (!window.RTCIceCandidate || window.RTCIceCandidate && "foundation" in window.RTCIceCandidate.prototype) return;
    var NativeRTCIceCandidate = window.RTCIceCandidate;
    window.RTCIceCandidate = function RTCIceCandidate(args) {
        // Remove the a= which shouldn't be part of the candidate string.
        if (typeof args === "object" && args.candidate && args.candidate.indexOf("a=") === 0) {
            args = JSON.parse(JSON.stringify(args));
            args.candidate = args.candidate.substr(2);
        }
        if (args.candidate && args.candidate.length) {
            // Augment the native candidate with the parsed fields.
            var nativeCandidate = new NativeRTCIceCandidate(args);
            var parsedCandidate = (0, (/*@__PURE__*/$parcel$interopDefault($b2727632138354b2$exports))).parseCandidate(args.candidate);
            var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);
            // Add a serializer that does not serialize the extra attributes.
            augmentedCandidate.toJSON = function toJSON() {
                return {
                    candidate: augmentedCandidate.candidate,
                    sdpMid: augmentedCandidate.sdpMid,
                    sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                    usernameFragment: augmentedCandidate.usernameFragment
                };
            };
            return augmentedCandidate;
        }
        return new NativeRTCIceCandidate(args);
    };
    window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;
    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    $993722e8c7a9e5a7$export$1f48841962b828b1(window, "icecandidate", function(e) {
        if (e.candidate) Object.defineProperty(e, "candidate", {
            value: new window.RTCIceCandidate(e.candidate),
            writable: "false"
        });
        return e;
    });
}
function $1e725cbbdf747411$export$fdafb8d8280e29b5(window) {
    if (!window.RTCIceCandidate || window.RTCIceCandidate && "relayProtocol" in window.RTCIceCandidate.prototype) return;
    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    $993722e8c7a9e5a7$export$1f48841962b828b1(window, "icecandidate", function(e) {
        if (e.candidate) {
            var parsedCandidate = (0, (/*@__PURE__*/$parcel$interopDefault($b2727632138354b2$exports))).parseCandidate(e.candidate.candidate);
            if (parsedCandidate.type === "relay") // This is a libwebrtc-specific mapping of local type preference
            // to relayProtocol.
            e.candidate.relayProtocol = ({
                0: "tls",
                1: "tcp",
                2: "udp"
            })[parsedCandidate.priority >> 24];
        }
        return e;
    });
}
function $1e725cbbdf747411$export$a99147c78a56edc4(window, browserDetails) {
    if (!window.RTCPeerConnection) return;
    if (!("sctp" in window.RTCPeerConnection.prototype)) Object.defineProperty(window.RTCPeerConnection.prototype, "sctp", {
        get: function() {
            return typeof this._sctp === "undefined" ? null : this._sctp;
        }
    });
    var sctpInDescription = function sctpInDescription(description) {
        if (!description || !description.sdp) return false;
        var sections = (0, (/*@__PURE__*/$parcel$interopDefault($b2727632138354b2$exports))).splitSections(description.sdp);
        sections.shift();
        return sections.some(function(mediaSection) {
            var mLine = (0, (/*@__PURE__*/$parcel$interopDefault($b2727632138354b2$exports))).parseMLine(mediaSection);
            return mLine && mLine.kind === "application" && mLine.protocol.indexOf("SCTP") !== -1;
        });
    };
    var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
        // TODO: Is there a better solution for detecting Firefox?
        var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
        if (match === null || match.length < 2) return -1;
        var version = parseInt(match[1], 10);
        // Test for NaN (yes, this is ugly)
        return version !== version ? -1 : version;
    };
    var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
        // Every implementation we know can send at least 64 KiB.
        // Note: Although Chrome is technically able to send up to 256 KiB, the
        //       data does not reach the other peer reliably.
        //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
        var canSendMaxMessageSize = 65536;
        if (browserDetails.browser === "firefox") {
            if (browserDetails.version < 57) {
                if (remoteIsFirefox === -1) // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                // fragmentation.
                canSendMaxMessageSize = 16384;
                else // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                // messages. Thus, supporting ~2 GiB when sending.
                canSendMaxMessageSize = 2147483637;
            } else if (browserDetails.version < 60) // Currently, all FF >= 57 will reset the remote maximum message size
            // to the default value when a data channel is created at a later
            // stage. :(
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
            canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
            else // FF >= 60 supports sending ~2 GiB
            canSendMaxMessageSize = 2147483637;
        }
        return canSendMaxMessageSize;
    };
    var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
        // Note: 65536 bytes is the default value from the SDP spec. Also,
        //       every implementation we know supports receiving 65536 bytes.
        var maxMessageSize = 65536;
        // FF 57 has a slightly incorrect default remote max message size, so
        // we need to adjust it here to avoid a failure when sending.
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
        if (browserDetails.browser === "firefox" && browserDetails.version === 57) maxMessageSize = 65535;
        var match = (0, (/*@__PURE__*/$parcel$interopDefault($b2727632138354b2$exports))).matchPrefix(description.sdp, "a=max-message-size:");
        if (match.length > 0) maxMessageSize = parseInt(match[0].substr(19), 10);
        else if (browserDetails.browser === "firefox" && remoteIsFirefox !== -1) // If the maximum message size is not present in the remote SDP and
        // both local and remote are Firefox, the remote peer can receive
        // ~2 GiB.
        maxMessageSize = 2147483637;
        return maxMessageSize;
    };
    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
        this._sctp = null;
        // Chrome decided to not expose .sctp in plan-b mode.
        // As usual, adapter.js has to do an 'ugly worakaround'
        // to cover up the mess.
        if (browserDetails.browser === "chrome" && browserDetails.version >= 76) {
            var sdpSemantics = this.getConfiguration().sdpSemantics;
            if (sdpSemantics === "plan-b") Object.defineProperty(this, "sctp", {
                get: function() {
                    return typeof this._sctp === "undefined" ? null : this._sctp;
                },
                enumerable: true,
                configurable: true
            });
        }
        if (sctpInDescription(arguments[0])) {
            // Check if the remote is FF.
            var isFirefox = getRemoteFirefoxVersion(arguments[0]);
            // Get the maximum message size the local peer is capable of sending
            var canSendMMS = getCanSendMaxMessageSize(isFirefox);
            // Get the maximum message size of the remote peer.
            var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);
            // Determine final maximum message size
            var maxMessageSize;
            if (canSendMMS === 0 && remoteMMS === 0) maxMessageSize = Number.POSITIVE_INFINITY;
            else if (canSendMMS === 0 || remoteMMS === 0) maxMessageSize = Math.max(canSendMMS, remoteMMS);
            else maxMessageSize = Math.min(canSendMMS, remoteMMS);
            // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
            // attribute.
            var sctp = {};
            Object.defineProperty(sctp, "maxMessageSize", {
                get: function() {
                    return maxMessageSize;
                }
            });
            this._sctp = sctp;
        }
        return origSetRemoteDescription.apply(this, arguments);
    };
}
function $1e725cbbdf747411$export$d461c8d5c5db5da7(window) {
    var wrapDcSend = // Note: Although Firefox >= 57 has a native implementation, the maximum
    //       message size can be reset for all data channels at a later stage.
    //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
    function wrapDcSend(dc, pc) {
        var origDataChannelSend = dc.send;
        dc.send = function send() {
            var data = arguments[0];
            var length = data.length || data.size || data.byteLength;
            if (dc.readyState === "open" && pc.sctp && length > pc.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + pc.sctp.maxMessageSize + " bytes)");
            return origDataChannelSend.apply(dc, arguments);
        };
    };
    if (!(window.RTCPeerConnection && "createDataChannel" in window.RTCPeerConnection.prototype)) return;
    var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
    window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
        var dataChannel = origCreateDataChannel.apply(this, arguments);
        wrapDcSend(dataChannel, this);
        return dataChannel;
    };
    $993722e8c7a9e5a7$export$1f48841962b828b1(window, "datachannel", function(e) {
        wrapDcSend(e.channel, e.target);
        return e;
    });
}
function $1e725cbbdf747411$export$63bb816cc75460(window) {
    if (!window.RTCPeerConnection || "connectionState" in window.RTCPeerConnection.prototype) return;
    var proto = window.RTCPeerConnection.prototype;
    Object.defineProperty(proto, "connectionState", {
        get: function() {
            return ({
                completed: "connected",
                checking: "connecting"
            })[this.iceConnectionState] || this.iceConnectionState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto, "onconnectionstatechange", {
        get: function() {
            return this._onconnectionstatechange || null;
        },
        set: function(cb) {
            if (this._onconnectionstatechange) {
                this.removeEventListener("connectionstatechange", this._onconnectionstatechange);
                delete this._onconnectionstatechange;
            }
            if (cb) this.addEventListener("connectionstatechange", this._onconnectionstatechange = cb);
        },
        enumerable: true,
        configurable: true
    });
    [
        "setLocalDescription",
        "setRemoteDescription"
    ].forEach(function(method) {
        var origMethod = proto[method];
        proto[method] = function() {
            if (!this._connectionstatechangepoly) {
                this._connectionstatechangepoly = function(e) {
                    var pc = e.target;
                    if (pc._lastConnectionState !== pc.connectionState) {
                        pc._lastConnectionState = pc.connectionState;
                        var newEvent = new Event("connectionstatechange", e);
                        pc.dispatchEvent(newEvent);
                    }
                    return e;
                };
                this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly);
            }
            return origMethod.apply(this, arguments);
        };
    });
}
function $1e725cbbdf747411$export$a57d114344295149(window, browserDetails) {
    /* remove a=extmap-allow-mixed for webrtc.org < M71 */ if (!window.RTCPeerConnection) return;
    if (browserDetails.browser === "chrome" && browserDetails.version >= 71) return;
    if (browserDetails.browser === "safari" && browserDetails.version >= 605) return;
    var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
        if (desc && desc.sdp && desc.sdp.indexOf("\na=extmap-allow-mixed") !== -1) {
            var sdp = desc.sdp.split("\n").filter(function(line) {
                return line.trim() !== "a=extmap-allow-mixed";
            }).join("\n");
            // Safari enforces read-only-ness of RTCSessionDescription fields.
            if (window.RTCSessionDescription && desc instanceof window.RTCSessionDescription) arguments[0] = new window.RTCSessionDescription({
                type: desc.type,
                sdp: sdp
            });
            else desc.sdp = sdp;
        }
        return nativeSRD.apply(this, arguments);
    };
}
function $1e725cbbdf747411$export$51d5e40b48c771c7(window, browserDetails) {
    // Support for addIceCandidate(null or undefined)
    // as well as addIceCandidate({candidate: "", ...})
    // https://bugs.chromium.org/p/chromium/issues/detail?id=978582
    // Note: must be called before other polyfills which change the signature.
    if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) return;
    var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
    if (!nativeAddIceCandidate || nativeAddIceCandidate.length === 0) return;
    window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
        if (!arguments[0]) {
            if (arguments[1]) arguments[1].apply(null);
            return Promise.resolve();
        }
        // Firefox 68+ emits and processes {candidate: "", ...}, ignore
        // in older versions.
        // Native support for ignoring exists for Chrome M77+.
        // Safari ignores as well, exact version unknown but works in the same
        // version that also ignores addIceCandidate(null).
        if ((browserDetails.browser === "chrome" && browserDetails.version < 78 || browserDetails.browser === "firefox" && browserDetails.version < 68 || browserDetails.browser === "safari") && arguments[0] && arguments[0].candidate === "") return Promise.resolve();
        return nativeAddIceCandidate.apply(this, arguments);
    };
}
function $1e725cbbdf747411$export$7170d04e59f9d553(window, browserDetails) {
    if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) return;
    var nativeSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
    if (!nativeSetLocalDescription || nativeSetLocalDescription.length === 0) return;
    window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
        var _this = this;
        var desc = arguments[0] || {};
        if (typeof desc !== "object" || desc.type && desc.sdp) return nativeSetLocalDescription.apply(this, arguments);
        // The remaining steps should technically happen when SLD comes off the
        // RTCPeerConnection's operations chain (not ahead of going on it), but
        // this is too difficult to shim. Instead, this shim only covers the
        // common case where the operations chain is empty. This is imperfect, but
        // should cover many cases. Rationale: Even if we can't reduce the glare
        // window to zero on imperfect implementations, there's value in tapping
        // into the perfect negotiation pattern that several browsers support.
        desc = {
            type: desc.type,
            sdp: desc.sdp
        };
        if (!desc.type) switch(this.signalingState){
            case "stable":
            case "have-local-offer":
            case "have-remote-pranswer":
                desc.type = "offer";
                break;
            default:
                desc.type = "answer";
                break;
        }
        if (desc.sdp || desc.type !== "offer" && desc.type !== "answer") return nativeSetLocalDescription.apply(this, [
            desc
        ]);
        var func = desc.type === "offer" ? this.createOffer : this.createAnswer;
        return func.apply(this).then(function(d) {
            return nativeSetLocalDescription.apply(_this, [
                d
            ]);
        });
    };
}



function $b1450a2ae8cc7983$export$e77bf46c04ac7d12() {
    var window = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).window, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        shimChrome: true,
        shimFirefox: true,
        shimSafari: true
    };
    // Utils.
    var logging = $993722e8c7a9e5a7$export$bef1f36f5486a6a3;
    var browserDetails = $993722e8c7a9e5a7$export$2d31490a0c05f094(window);
    var adapter = {
        browserDetails: browserDetails,
        commonShim: $1e725cbbdf747411$exports,
        extractVersion: $993722e8c7a9e5a7$export$e3c02be309be1f23,
        disableLog: $993722e8c7a9e5a7$export$afbfee8cc06fd3e4,
        disableWarnings: $993722e8c7a9e5a7$export$51516be4b019e41e,
        // Expose sdp as a convenience. For production apps include directly.
        sdp: $b2727632138354b2$exports
    };
    // Shim browser if found.
    switch(browserDetails.browser){
        case "chrome":
            if (!$ef7fa8125ed93bad$exports || !$ef7fa8125ed93bad$exports.shimPeerConnection || !options.shimChrome) {
                logging("Chrome shim is not included in this adapter release.");
                return adapter;
            }
            if (browserDetails.version === null) {
                logging("Chrome shim can not determine version, not shimming.");
                return adapter;
            }
            logging("adapter.js shimming chrome.");
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = $ef7fa8125ed93bad$exports;
            // Must be called before shimPeerConnection.
            $1e725cbbdf747411$exports.shimAddIceCandidateNullOrEmpty(window, browserDetails);
            $1e725cbbdf747411$exports.shimParameterlessSetLocalDescription(window, browserDetails);
            $ef7fa8125ed93bad$exports.shimGetUserMedia(window, browserDetails);
            $ef7fa8125ed93bad$exports.shimMediaStream(window, browserDetails);
            $ef7fa8125ed93bad$exports.shimPeerConnection(window, browserDetails);
            $ef7fa8125ed93bad$exports.shimOnTrack(window, browserDetails);
            $ef7fa8125ed93bad$exports.shimAddTrackRemoveTrack(window, browserDetails);
            $ef7fa8125ed93bad$exports.shimGetSendersWithDtmf(window, browserDetails);
            $ef7fa8125ed93bad$exports.shimGetStats(window, browserDetails);
            $ef7fa8125ed93bad$exports.shimSenderReceiverGetStats(window, browserDetails);
            $ef7fa8125ed93bad$exports.fixNegotiationNeeded(window, browserDetails);
            $1e725cbbdf747411$exports.shimRTCIceCandidate(window, browserDetails);
            $1e725cbbdf747411$exports.shimRTCIceCandidateRelayProtocol(window, browserDetails);
            $1e725cbbdf747411$exports.shimConnectionState(window, browserDetails);
            $1e725cbbdf747411$exports.shimMaxMessageSize(window, browserDetails);
            $1e725cbbdf747411$exports.shimSendThrowTypeError(window, browserDetails);
            $1e725cbbdf747411$exports.removeExtmapAllowMixed(window, browserDetails);
            break;
        case "firefox":
            if (!$f7879eae6ce316c3$exports || !$f7879eae6ce316c3$exports.shimPeerConnection || !options.shimFirefox) {
                logging("Firefox shim is not included in this adapter release.");
                return adapter;
            }
            logging("adapter.js shimming firefox.");
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = $f7879eae6ce316c3$exports;
            // Must be called before shimPeerConnection.
            $1e725cbbdf747411$exports.shimAddIceCandidateNullOrEmpty(window, browserDetails);
            $1e725cbbdf747411$exports.shimParameterlessSetLocalDescription(window, browserDetails);
            $f7879eae6ce316c3$exports.shimGetUserMedia(window, browserDetails);
            $f7879eae6ce316c3$exports.shimPeerConnection(window, browserDetails);
            $f7879eae6ce316c3$exports.shimOnTrack(window, browserDetails);
            $f7879eae6ce316c3$exports.shimRemoveStream(window, browserDetails);
            $f7879eae6ce316c3$exports.shimSenderGetStats(window, browserDetails);
            $f7879eae6ce316c3$exports.shimReceiverGetStats(window, browserDetails);
            $f7879eae6ce316c3$exports.shimRTCDataChannel(window, browserDetails);
            $f7879eae6ce316c3$exports.shimAddTransceiver(window, browserDetails);
            $f7879eae6ce316c3$exports.shimGetParameters(window, browserDetails);
            $f7879eae6ce316c3$exports.shimCreateOffer(window, browserDetails);
            $f7879eae6ce316c3$exports.shimCreateAnswer(window, browserDetails);
            $1e725cbbdf747411$exports.shimRTCIceCandidate(window, browserDetails);
            $1e725cbbdf747411$exports.shimConnectionState(window, browserDetails);
            $1e725cbbdf747411$exports.shimMaxMessageSize(window, browserDetails);
            $1e725cbbdf747411$exports.shimSendThrowTypeError(window, browserDetails);
            break;
        case "safari":
            if (!$b5603e2a25579e83$exports || !options.shimSafari) {
                logging("Safari shim is not included in this adapter release.");
                return adapter;
            }
            logging("adapter.js shimming safari.");
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = $b5603e2a25579e83$exports;
            // Must be called before shimCallbackAPI.
            $1e725cbbdf747411$exports.shimAddIceCandidateNullOrEmpty(window, browserDetails);
            $1e725cbbdf747411$exports.shimParameterlessSetLocalDescription(window, browserDetails);
            $b5603e2a25579e83$exports.shimRTCIceServerUrls(window, browserDetails);
            $b5603e2a25579e83$exports.shimCreateOfferLegacy(window, browserDetails);
            $b5603e2a25579e83$exports.shimCallbacksAPI(window, browserDetails);
            $b5603e2a25579e83$exports.shimLocalStreamsAPI(window, browserDetails);
            $b5603e2a25579e83$exports.shimRemoteStreamsAPI(window, browserDetails);
            $b5603e2a25579e83$exports.shimTrackEventTransceiver(window, browserDetails);
            $b5603e2a25579e83$exports.shimGetUserMedia(window, browserDetails);
            $b5603e2a25579e83$exports.shimAudioContext(window, browserDetails);
            $1e725cbbdf747411$exports.shimRTCIceCandidate(window, browserDetails);
            $1e725cbbdf747411$exports.shimRTCIceCandidateRelayProtocol(window, browserDetails);
            $1e725cbbdf747411$exports.shimMaxMessageSize(window, browserDetails);
            $1e725cbbdf747411$exports.shimSendThrowTypeError(window, browserDetails);
            $1e725cbbdf747411$exports.removeExtmapAllowMixed(window, browserDetails);
            break;
        default:
            logging("Unsupported browser!");
            break;
    }
    return adapter;
}


"use strict";
var $3ddb6603d0385efa$var$adapter = (0, $b1450a2ae8cc7983$export$e77bf46c04ac7d12)({
    window: typeof window === "undefined" ? undefined : window
});
var $3ddb6603d0385efa$export$2e2bcd8739ae039 = $3ddb6603d0385efa$var$adapter;


var $0ba6beccc495b2a1$var$webRTCAdapter = //@ts-ignore
(0, $3ddb6603d0385efa$export$2e2bcd8739ae039)["default"] || (0, $3ddb6603d0385efa$export$2e2bcd8739ae039);
var $0ba6beccc495b2a1$export$25be9502477c137d = new /** @class */ (function() {
    var class_1 = function class_1() {
        this.isIOS = [
            "iPad",
            "iPhone",
            "iPod"
        ].includes(navigator.platform);
        this.supportedBrowsers = [
            "firefox",
            "chrome",
            "safari"
        ];
        this.minFirefoxVersion = 59;
        this.minChromeVersion = 72;
        this.minSafariVersion = 605;
    };
    class_1.prototype.isWebRTCSupported = function() {
        return typeof RTCPeerConnection !== "undefined";
    };
    class_1.prototype.isBrowserSupported = function() {
        var browser = this.getBrowser();
        var version = this.getVersion();
        var validBrowser = this.supportedBrowsers.includes(browser);
        if (!validBrowser) return false;
        if (browser === "chrome") return version >= this.minChromeVersion;
        if (browser === "firefox") return version >= this.minFirefoxVersion;
        if (browser === "safari") return !this.isIOS && version >= this.minSafariVersion;
        return false;
    };
    class_1.prototype.getBrowser = function() {
        return $0ba6beccc495b2a1$var$webRTCAdapter.browserDetails.browser;
    };
    class_1.prototype.getVersion = function() {
        return $0ba6beccc495b2a1$var$webRTCAdapter.browserDetails.version || 0;
    };
    class_1.prototype.isUnifiedPlanSupported = function() {
        var browser = this.getBrowser();
        var version = $0ba6beccc495b2a1$var$webRTCAdapter.browserDetails.version || 0;
        if (browser === "chrome" && version < this.minChromeVersion) return false;
        if (browser === "firefox" && version >= this.minFirefoxVersion) return true;
        if (!window.RTCRtpTransceiver || !("currentDirection" in RTCRtpTransceiver.prototype)) return false;
        var tempPc;
        var supported = false;
        try {
            tempPc = new RTCPeerConnection();
            tempPc.addTransceiver("audio");
            supported = true;
        } catch (e) {} finally{
            if (tempPc) tempPc.close();
        }
        return supported;
    };
    class_1.prototype.toString = function() {
        return "Supports:\n    browser:".concat(this.getBrowser(), "\n    version:").concat(this.getVersion(), "\n    isIOS:").concat(this.isIOS, "\n    isWebRTCSupported:").concat(this.isWebRTCSupported(), "\n    isBrowserSupported:").concat(this.isBrowserSupported(), "\n    isUnifiedPlanSupported:").concat(this.isUnifiedPlanSupported());
    };
    return class_1;
}())();


var $7dc43ad2ffa25036$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $7dc43ad2ffa25036$var$DEFAULT_CONFIG = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: [
                "turn:eu-0.turn.peerjs.com:3478",
                "turn:us-0.turn.peerjs.com:3478"
            ],
            username: "peerjs",
            credential: "peerjsp"
        }
    ],
    sdpSemantics: "unified-plan"
};
var $7dc43ad2ffa25036$var$Util = /** @class */ function() {
    var Util = function Util() {
        this.CLOUD_HOST = "0.peerjs.com";
        this.CLOUD_PORT = 443;
        // Browsers that need chunking:
        this.chunkedBrowsers = {
            Chrome: 1,
            chrome: 1
        };
        this.chunkedMTU = 16300; // The original 60000 bytes setting does not work when sending data from Firefox to Chrome, which is "cut off" after 16384 bytes and delivered individually.
        // Returns browser-agnostic default config
        this.defaultConfig = $7dc43ad2ffa25036$var$DEFAULT_CONFIG;
        this.browser = (0, $0ba6beccc495b2a1$export$25be9502477c137d).getBrowser();
        this.browserVersion = (0, $0ba6beccc495b2a1$export$25be9502477c137d).getVersion();
        // Lists which features are supported
        this.supports = function() {
            var supported = {
                browser: (0, $0ba6beccc495b2a1$export$25be9502477c137d).isBrowserSupported(),
                webRTC: (0, $0ba6beccc495b2a1$export$25be9502477c137d).isWebRTCSupported(),
                audioVideo: false,
                data: false,
                binaryBlob: false,
                reliable: false
            };
            if (!supported.webRTC) return supported;
            var pc;
            try {
                pc = new RTCPeerConnection($7dc43ad2ffa25036$var$DEFAULT_CONFIG);
                supported.audioVideo = true;
                var dc = void 0;
                try {
                    dc = pc.createDataChannel("_PEERJSTEST", {
                        ordered: true
                    });
                    supported.data = true;
                    supported.reliable = !!dc.ordered;
                    // Binary test
                    try {
                        dc.binaryType = "blob";
                        supported.binaryBlob = !(0, $0ba6beccc495b2a1$export$25be9502477c137d).isIOS;
                    } catch (e) {}
                } catch (e) {} finally{
                    if (dc) dc.close();
                }
            } catch (e) {} finally{
                if (pc) pc.close();
            }
            return supported;
        }();
        this.pack = $ead48d121739fa4c$export$2a703dbb0cb35339;
        this.unpack = $ead48d121739fa4c$export$417857010dc9287f;
        // Binary stuff
        this._dataCount = 1;
    };
    Util.prototype.noop = function() {};
    // Ensure alphanumeric ids
    Util.prototype.validateId = function(id) {
        // Allow empty ids
        return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(id);
    };
    Util.prototype.chunk = function(blob) {
        var chunks = [];
        var size = blob.byteLength;
        var total = Math.ceil(size / $7dc43ad2ffa25036$export$7debb50ef11d5e0b.chunkedMTU);
        var index = 0;
        var start = 0;
        while(start < size){
            var end = Math.min(size, start + $7dc43ad2ffa25036$export$7debb50ef11d5e0b.chunkedMTU);
            var b = blob.slice(start, end);
            var chunk = {
                __peerData: this._dataCount,
                n: index,
                data: b,
                total: total
            };
            chunks.push(chunk);
            start = end;
            index++;
        }
        this._dataCount++;
        return chunks;
    };
    Util.prototype.blobToArrayBuffer = function(blob, cb) {
        var fr = new FileReader();
        fr.onload = function(evt) {
            if (evt.target) cb(evt.target.result);
        };
        fr.readAsArrayBuffer(blob);
        return fr;
    };
    Util.prototype.binaryStringToArrayBuffer = function(binary) {
        var byteArray = new Uint8Array(binary.length);
        for(var i = 0; i < binary.length; i++)byteArray[i] = binary.charCodeAt(i) & 0xff;
        return byteArray.buffer;
    };
    Util.prototype.randomToken = function() {
        return Math.random().toString(36).slice(2);
    };
    Util.prototype.isSecure = function() {
        return location.protocol === "https:";
    };
    return Util;
}();
var $7dc43ad2ffa25036$export$7debb50ef11d5e0b = new $7dc43ad2ffa25036$var$Util();
function $7dc43ad2ffa25036$export$52c89ebcdc4f53f2(bufs) {
    var e_1, _a, e_2, _b;
    var size = 0;
    try {
        for(var bufs_1 = $7dc43ad2ffa25036$var$__values(bufs), bufs_1_1 = bufs_1.next(); !bufs_1_1.done; bufs_1_1 = bufs_1.next()){
            var buf = bufs_1_1.value;
            size += buf.byteLength;
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (bufs_1_1 && !bufs_1_1.done && (_a = bufs_1["return"])) _a.call(bufs_1);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
    var result = new Uint8Array(size);
    var offset = 0;
    try {
        for(var bufs_2 = $7dc43ad2ffa25036$var$__values(bufs), bufs_2_1 = bufs_2.next(); !bufs_2_1.done; bufs_2_1 = bufs_2.next()){
            var buf = bufs_2_1.value;
            result.set(buf, offset);
            offset += buf.byteLength;
        }
    } catch (e_2_1) {
        e_2 = {
            error: e_2_1
        };
    } finally{
        try {
            if (bufs_2_1 && !bufs_2_1.done && (_b = bufs_2["return"])) _b.call(bufs_2);
        } finally{
            if (e_2) throw e_2.error;
        }
    }
    return result;
}


var $17252116aa2ef1fb$exports = {};

$parcel$export($17252116aa2ef1fb$exports, "Peer", function () { return $17252116aa2ef1fb$export$ecd1fc136c422448; }, function (v) { return $17252116aa2ef1fb$export$ecd1fc136c422448 = v; });
var $b43bf3d87e5977ce$exports = {};
"use strict";
var $b43bf3d87e5977ce$var$has = Object.prototype.hasOwnProperty, $b43bf3d87e5977ce$var$prefix = "~";
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */ function $b43bf3d87e5977ce$var$Events() {}
//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
    $b43bf3d87e5977ce$var$Events.prototype = Object.create(null);
    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new $b43bf3d87e5977ce$var$Events().__proto__) $b43bf3d87e5977ce$var$prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */ function $b43bf3d87e5977ce$var$EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */ function $b43bf3d87e5977ce$var$addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") throw new TypeError("The listener must be a function");
    var listener = new $b43bf3d87e5977ce$var$EE(fn, context || emitter, once), evt = $b43bf3d87e5977ce$var$prefix ? $b43bf3d87e5977ce$var$prefix + event : event;
    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [
        emitter._events[evt],
        listener
    ];
    return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */ function $b43bf3d87e5977ce$var$clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new $b43bf3d87e5977ce$var$Events();
    else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */ function $b43bf3d87e5977ce$var$EventEmitter() {
    this._events = new $b43bf3d87e5977ce$var$Events();
    this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */ $b43bf3d87e5977ce$var$EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0) return names;
    for(name in events = this._events)if ($b43bf3d87e5977ce$var$has.call(events, name)) names.push($b43bf3d87e5977ce$var$prefix ? name.slice(1) : name);
    if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
    return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */ $b43bf3d87e5977ce$var$EventEmitter.prototype.listeners = function listeners(event) {
    var evt = $b43bf3d87e5977ce$var$prefix ? $b43bf3d87e5977ce$var$prefix + event : event, handlers = this._events[evt];
    if (!handlers) return [];
    if (handlers.fn) return [
        handlers.fn
    ];
    for(var i = 0, l = handlers.length, ee = new Array(l); i < l; i++)ee[i] = handlers[i].fn;
    return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */ $b43bf3d87e5977ce$var$EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = $b43bf3d87e5977ce$var$prefix ? $b43bf3d87e5977ce$var$prefix + event : event, listeners = this._events[evt];
    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */ $b43bf3d87e5977ce$var$EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = $b43bf3d87e5977ce$var$prefix ? $b43bf3d87e5977ce$var$prefix + event : event;
    if (!this._events[evt]) return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
        switch(len){
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
        for(i = 1, args = new Array(len - 1); i < len; i++)args[i - 1] = arguments[i];
        listeners.fn.apply(listeners.context, args);
    } else {
        var length = listeners.length, j;
        for(i = 0; i < length; i++){
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
            switch(len){
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
                    if (!args) for(j = 1, args = new Array(len - 1); j < len; j++)args[j - 1] = arguments[j];
                    listeners[i].fn.apply(listeners[i].context, args);
            }
        }
    }
    return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ $b43bf3d87e5977ce$var$EventEmitter.prototype.on = function on(event, fn, context) {
    return $b43bf3d87e5977ce$var$addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ $b43bf3d87e5977ce$var$EventEmitter.prototype.once = function once(event, fn, context) {
    return $b43bf3d87e5977ce$var$addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */ $b43bf3d87e5977ce$var$EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = $b43bf3d87e5977ce$var$prefix ? $b43bf3d87e5977ce$var$prefix + event : event;
    if (!this._events[evt]) return this;
    if (!fn) {
        $b43bf3d87e5977ce$var$clearEvent(this, evt);
        return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) $b43bf3d87e5977ce$var$clearEvent(this, evt);
    } else {
        for(var i = 0, events = [], length = listeners.length; i < length; i++)if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else $b43bf3d87e5977ce$var$clearEvent(this, evt);
    }
    return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */ $b43bf3d87e5977ce$var$EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
        evt = $b43bf3d87e5977ce$var$prefix ? $b43bf3d87e5977ce$var$prefix + event : event;
        if (this._events[evt]) $b43bf3d87e5977ce$var$clearEvent(this, evt);
    } else {
        this._events = new $b43bf3d87e5977ce$var$Events();
        this._eventsCount = 0;
    }
    return this;
};
//
// Alias methods names because people roll like that.
//
$b43bf3d87e5977ce$var$EventEmitter.prototype.off = $b43bf3d87e5977ce$var$EventEmitter.prototype.removeListener;
$b43bf3d87e5977ce$var$EventEmitter.prototype.addListener = $b43bf3d87e5977ce$var$EventEmitter.prototype.on;
//
// Expose the prefix.
//
$b43bf3d87e5977ce$var$EventEmitter.prefixed = $b43bf3d87e5977ce$var$prefix;
//
// Allow `EventEmitter` to be imported as module namespace.
//
$b43bf3d87e5977ce$var$EventEmitter.EventEmitter = $b43bf3d87e5977ce$var$EventEmitter;
$b43bf3d87e5977ce$exports = $b43bf3d87e5977ce$var$EventEmitter;



var $96fb85a532fc3748$exports = {};

$parcel$export($96fb85a532fc3748$exports, "LogLevel", function () { return $96fb85a532fc3748$export$243e62d78d3b544d; }, function (v) { return $96fb85a532fc3748$export$243e62d78d3b544d = v; });
$parcel$export($96fb85a532fc3748$exports, "default", function () { return $96fb85a532fc3748$export$2e2bcd8739ae039; }, function (v) { return $96fb85a532fc3748$export$2e2bcd8739ae039 = v; });
var $96fb85a532fc3748$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $96fb85a532fc3748$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $96fb85a532fc3748$var$LOG_PREFIX = "PeerJS: ";
var $96fb85a532fc3748$export$243e62d78d3b544d;
(function(LogLevel) {
    LogLevel[LogLevel["Disabled"] = 0] = "Disabled";
    LogLevel[LogLevel["Errors"] = 1] = "Errors";
    LogLevel[LogLevel["Warnings"] = 2] = "Warnings";
    LogLevel[LogLevel["All"] = 3] = "All";
})($96fb85a532fc3748$export$243e62d78d3b544d || ($96fb85a532fc3748$export$243e62d78d3b544d = {}));
var $96fb85a532fc3748$var$Logger = /** @class */ function() {
    var Logger = function Logger() {
        this._logLevel = $96fb85a532fc3748$export$243e62d78d3b544d.Disabled;
    };
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function get() {
            return this._logLevel;
        },
        set: function set(logLevel) {
            this._logLevel = logLevel;
        },
        enumerable: false,
        configurable: true
    });
    Logger.prototype.log = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (this._logLevel >= $96fb85a532fc3748$export$243e62d78d3b544d.All) this._print.apply(this, $96fb85a532fc3748$var$__spreadArray([
            $96fb85a532fc3748$export$243e62d78d3b544d.All
        ], $96fb85a532fc3748$var$__read(args), false));
    };
    Logger.prototype.warn = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (this._logLevel >= $96fb85a532fc3748$export$243e62d78d3b544d.Warnings) this._print.apply(this, $96fb85a532fc3748$var$__spreadArray([
            $96fb85a532fc3748$export$243e62d78d3b544d.Warnings
        ], $96fb85a532fc3748$var$__read(args), false));
    };
    Logger.prototype.error = function() {
        var args = [];
        for(var _i = 0; _i < arguments.length; _i++)args[_i] = arguments[_i];
        if (this._logLevel >= $96fb85a532fc3748$export$243e62d78d3b544d.Errors) this._print.apply(this, $96fb85a532fc3748$var$__spreadArray([
            $96fb85a532fc3748$export$243e62d78d3b544d.Errors
        ], $96fb85a532fc3748$var$__read(args), false));
    };
    Logger.prototype.setLogFunction = function(fn) {
        this._print = fn;
    };
    Logger.prototype._print = function(logLevel) {
        var rest = [];
        for(var _i = 1; _i < arguments.length; _i++)rest[_i - 1] = arguments[_i];
        var copy = $96fb85a532fc3748$var$__spreadArray([
            $96fb85a532fc3748$var$LOG_PREFIX
        ], $96fb85a532fc3748$var$__read(rest), false);
        for(var i in copy)if (copy[i] instanceof Error) copy[i] = "(" + copy[i].name + ") " + copy[i].message;
        if (logLevel >= $96fb85a532fc3748$export$243e62d78d3b544d.All) console.log.apply(console, $96fb85a532fc3748$var$__spreadArray([], $96fb85a532fc3748$var$__read(copy), false));
        else if (logLevel >= $96fb85a532fc3748$export$243e62d78d3b544d.Warnings) console.warn.apply(console, $96fb85a532fc3748$var$__spreadArray([
            "WARNING"
        ], $96fb85a532fc3748$var$__read(copy), false));
        else if (logLevel >= $96fb85a532fc3748$export$243e62d78d3b544d.Errors) console.error.apply(console, $96fb85a532fc3748$var$__spreadArray([
            "ERROR"
        ], $96fb85a532fc3748$var$__read(copy), false));
    };
    return Logger;
}();
var $96fb85a532fc3748$export$2e2bcd8739ae039 = new $96fb85a532fc3748$var$Logger();


var $b2ce1b9c02009c9c$exports = {};

$parcel$export($b2ce1b9c02009c9c$exports, "Socket", function () { return $b2ce1b9c02009c9c$export$4798917dbf149b79; }, function (v) { return $b2ce1b9c02009c9c$export$4798917dbf149b79 = v; });


var $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc;
(function(ConnectionType) {
    ConnectionType["Data"] = "data";
    ConnectionType["Media"] = "media";
})($8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc || ($8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc = {}));
var $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff;
(function(PeerErrorType) {
    PeerErrorType["BrowserIncompatible"] = "browser-incompatible";
    PeerErrorType["Disconnected"] = "disconnected";
    PeerErrorType["InvalidID"] = "invalid-id";
    PeerErrorType["InvalidKey"] = "invalid-key";
    PeerErrorType["Network"] = "network";
    PeerErrorType["PeerUnavailable"] = "peer-unavailable";
    PeerErrorType["SslUnavailable"] = "ssl-unavailable";
    PeerErrorType["ServerError"] = "server-error";
    PeerErrorType["SocketError"] = "socket-error";
    PeerErrorType["SocketClosed"] = "socket-closed";
    PeerErrorType["UnavailableID"] = "unavailable-id";
    PeerErrorType["WebRTC"] = "webrtc";
})($8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff || ($8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff = {}));
var $8b9dc3e5f2ea4cc9$export$89f507cf986a947;
(function(SerializationType) {
    SerializationType["Binary"] = "binary";
    SerializationType["BinaryUTF8"] = "binary-utf8";
    SerializationType["JSON"] = "json";
})($8b9dc3e5f2ea4cc9$export$89f507cf986a947 || ($8b9dc3e5f2ea4cc9$export$89f507cf986a947 = {}));
var $8b9dc3e5f2ea4cc9$export$3b5c4a4b6354f023;
(function(SocketEventType) {
    SocketEventType["Message"] = "message";
    SocketEventType["Disconnected"] = "disconnected";
    SocketEventType["Error"] = "error";
    SocketEventType["Close"] = "close";
})($8b9dc3e5f2ea4cc9$export$3b5c4a4b6354f023 || ($8b9dc3e5f2ea4cc9$export$3b5c4a4b6354f023 = {}));
var $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d;
(function(ServerMessageType) {
    ServerMessageType["Heartbeat"] = "HEARTBEAT";
    ServerMessageType["Candidate"] = "CANDIDATE";
    ServerMessageType["Offer"] = "OFFER";
    ServerMessageType["Answer"] = "ANSWER";
    ServerMessageType["Open"] = "OPEN";
    ServerMessageType["Error"] = "ERROR";
    ServerMessageType["IdTaken"] = "ID-TAKEN";
    ServerMessageType["InvalidKey"] = "INVALID-KEY";
    ServerMessageType["Leave"] = "LEAVE";
    ServerMessageType["Expire"] = "EXPIRE";
})($8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d || ($8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d = {}));


var $face5264434edf64$exports = {};
$face5264434edf64$exports = JSON.parse('{"name":"peerjs","version":"1.4.8-rc.1","keywords":["peerjs","webrtc","p2p","rtc"],"description":"PeerJS client","homepage":"https://peerjs.com","bugs":{"url":"https://github.com/peers/peerjs/issues"},"repository":{"type":"git","url":"https://github.com/peers/peerjs"},"license":"MIT","contributors":["Michelle Bu <michelle@michellebu.com>","afrokick <devbyru@gmail.com>","ericz <really.ez@gmail.com>","Jairo <kidandcat@gmail.com>","Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>","Jairo Caro-Accino Viciana <jairo@galax.be>","Carlos Caballero <carlos.caballero.gonzalez@gmail.com>","hc <hheennrryy@gmail.com>","Muhammad Asif <capripio@gmail.com>","PrashoonB <prashoonbhattacharjee@gmail.com>","Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>","akotynski <aleksanderkotbury@gmail.com>","lmb <i@lmb.io>","Jairooo <jairocaro@msn.com>","Moritz St\xfcckler <moritz.stueckler@gmail.com>","Simon <crydotsnakegithub@gmail.com>","Denis Lukov <denismassters@gmail.com>","Philipp Hancke <fippo@andyet.net>","Hans Oksendahl <hansoksendahl@gmail.com>","Jess <jessachandler@gmail.com>","khankuan <khankuan@gmail.com>","DUODVK <kurmanov.work@gmail.com>","XiZhao <kwang1imsa@gmail.com>","Matthias Lohr <matthias@lohr.me>","=frank tree <=frnktrb@googlemail.com>","Andre Eckardt <aeckardt@outlook.com>","Chris Cowan <agentme49@gmail.com>","Alex Chuev <alex@chuev.com>","alxnull <alxnull@e.mail.de>","Yemel Jardi <angel.jardi@gmail.com>","Ben Parnell <benjaminparnell.94@gmail.com>","Benny Lichtner <bennlich@gmail.com>","fresheneesz <bitetrudpublic@gmail.com>","bob.barstead@exaptive.com <bob.barstead@exaptive.com>","chandika <chandika@gmail.com>","emersion <contact@emersion.fr>","Christopher Van <cvan@users.noreply.github.com>","eddieherm <edhermoso@gmail.com>","Eduardo Pinho <enet4mikeenet@gmail.com>","Evandro Zanatta <ezanatta@tray.net.br>","Gardner Bickford <gardner@users.noreply.github.com>","Gian Luca <gianluca.cecchi@cynny.com>","PatrickJS <github@gdi2290.com>","jonnyf <github@jonathanfoss.co.uk>","Hizkia Felix <hizkifw@gmail.com>","Hristo Oskov <hristo.oskov@gmail.com>","Isaac Madwed <i.madwed@gmail.com>","Ilya Konanykhin <ilya.konanykhin@gmail.com>","jasonbarry <jasbarry@me.com>","Jonathan Burke <jonathan.burke.1311@googlemail.com>","Josh Hamit <josh.hamit@gmail.com>","Jordan Austin <jrax86@gmail.com>","Joel Wetzell <jwetzell@yahoo.com>","xizhao <kevin.wang@cloudera.com>","Alberto Torres <kungfoobar@gmail.com>","Jonathan Mayol <mayoljonathan@gmail.com>","Jefferson Felix <me@jsfelix.dev>","Rolf Erik Lekang <me@rolflekang.com>","Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>","Pepijn de Vos <pepijndevos@gmail.com>","JooYoung <qkdlql@naver.com>","Tobias Speicher <rootcommander@gmail.com>","Steve Blaurock <sblaurock@gmail.com>","Kyrylo Shegeda <shegeda@ualberta.ca>","Diwank Singh Tomer <singh@diwank.name>","Sören Balko <Soeren.Balko@gmail.com>","Arpit Solanki <solankiarpit1997@gmail.com>","Yuki Ito <yuki@gnnk.net>","Artur Zayats <zag2art@gmail.com>"],"funding":{"type":"opencollective","url":"https://opencollective.com/peer"},"collective":{"type":"opencollective","url":"https://opencollective.com/peer"},"files":["dist/*"],"sideEffects":["lib/global.ts","lib/supports.ts"],"main":"dist/bundler.cjs","module":"dist/bundler.mjs","browser-minified":"dist/peerjs.min.js","browser-unminified":"dist/peerjs.js","types":"dist/types.d.ts","engines":{"node":">= 10"},"targets":{"types":{"source":"lib/exports.ts"},"main":{"source":"lib/exports.ts","sourceMap":{"inlineSources":true}},"module":{"source":"lib/exports.ts","includeNodeModules":["eventemitter3"],"sourceMap":{"inlineSources":true}},"browser-minified":{"context":"browser","outputFormat":"global","optimize":true,"engines":{"browsers":"cover 99%, not dead"},"source":"lib/global.ts"},"browser-unminified":{"context":"browser","outputFormat":"global","optimize":false,"engines":{"browsers":"cover 99%, not dead"},"source":"lib/global.ts"}},"scripts":{"contributors":"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\"chore(contributors): update and sort contributors list\\"","check":"tsc --noEmit","watch":"parcel watch","build":"rm -rf dist && parcel build","prepublishOnly":"npm run build","test":"mocha -r ts-node/register -r jsdom-global/register test/**/*.ts","format":"prettier --write .","semantic-release":"semantic-release"},"devDependencies":{"@parcel/config-default":"^2.8.1","@parcel/packager-ts":"^2.8.1","@parcel/transformer-typescript-tsc":"^2.8.1","@parcel/transformer-typescript-types":"^2.8.1","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@types/chai":"^4.3.0","@types/mocha":"^9.1.0","@types/node":"^17.0.18","chai":"^4.3.6","jsdom":"^19.0.0","jsdom-global":"^3.0.2","mocha":"^9.2.0","mock-socket":"8.1.1","parcel":"^2.8.1","parcel-transformer-tsc-sourcemaps":"^1.0.2","prettier":"^2.6.2","semantic-release":"^19.0.2","ts-node":"^10.5.0","typescript":"^4.5.5"},"dependencies":{"@swc/helpers":"^0.4.0","eventemitter3":"^4.0.7","peerjs-js-binarypack":"^2.0.0-rc.1","webrtc-adapter":"^8.0.0"}}');


var $b2ce1b9c02009c9c$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function extendStatics1(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        var __ = function __() {
            this.constructor = d;
        };
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $b2ce1b9c02009c9c$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $b2ce1b9c02009c9c$var$__spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var $b2ce1b9c02009c9c$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * An abstraction on top of WebSockets to provide fastest
 * possible connection for peers.
 */ var $b2ce1b9c02009c9c$export$4798917dbf149b79 = /** @class */ function(_super) {
    var Socket = function Socket(secure, host, port, path, key, pingInterval) {
        if (pingInterval === void 0) pingInterval = 5000;
        var _this = _super.call(this) || this;
        _this.pingInterval = pingInterval;
        _this._disconnected = true;
        _this._messagesQueue = [];
        var wsProtocol = secure ? "wss://" : "ws://";
        _this._baseUrl = wsProtocol + host + ":" + port + path + "peerjs?key=" + key;
        return _this;
    };
    $b2ce1b9c02009c9c$var$__extends(Socket, _super);
    Socket.prototype.start = function(id, token) {
        var _this = this;
        this._id = id;
        var wsUrl = "".concat(this._baseUrl, "&id=").concat(id, "&token=").concat(token);
        if (!!this._socket || !this._disconnected) return;
        this._socket = new WebSocket(wsUrl + "&version=" + (0, $face5264434edf64$exports.version));
        this._disconnected = false;
        this._socket.onmessage = function(event) {
            var data;
            try {
                data = JSON.parse(event.data);
                (0, $96fb85a532fc3748$exports.default).log("Server message received:", data);
            } catch (e) {
                (0, $96fb85a532fc3748$exports.default).log("Invalid server message", event.data);
                return;
            }
            _this.emit((0, $8b9dc3e5f2ea4cc9$export$3b5c4a4b6354f023).Message, data);
        };
        this._socket.onclose = function(event) {
            if (_this._disconnected) return;
            (0, $96fb85a532fc3748$exports.default).log("Socket closed.", event);
            _this._cleanup();
            _this._disconnected = true;
            _this.emit((0, $8b9dc3e5f2ea4cc9$export$3b5c4a4b6354f023).Disconnected);
        };
        // Take care of the queue of connections if necessary and make sure Peer knows
        // socket is open.
        this._socket.onopen = function() {
            if (_this._disconnected) return;
            _this._sendQueuedMessages();
            (0, $96fb85a532fc3748$exports.default).log("Socket open");
            _this._scheduleHeartbeat();
        };
    };
    Socket.prototype._scheduleHeartbeat = function() {
        var _this = this;
        this._wsPingTimer = setTimeout(function() {
            _this._sendHeartbeat();
        }, this.pingInterval);
    };
    Socket.prototype._sendHeartbeat = function() {
        if (!this._wsOpen()) {
            (0, $96fb85a532fc3748$exports.default).log("Cannot send heartbeat, because socket closed");
            return;
        }
        var message = JSON.stringify({
            type: (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Heartbeat
        });
        this._socket.send(message);
        this._scheduleHeartbeat();
    };
    /** Is the websocket currently open? */ Socket.prototype._wsOpen = function() {
        return !!this._socket && this._socket.readyState === 1;
    };
    /** Send queued messages. */ Socket.prototype._sendQueuedMessages = function() {
        var e_1, _a;
        //Create copy of queue and clear it,
        //because send method push the message back to queue if smth will go wrong
        var copiedQueue = $b2ce1b9c02009c9c$var$__spreadArray([], $b2ce1b9c02009c9c$var$__read(this._messagesQueue), false);
        this._messagesQueue = [];
        try {
            for(var copiedQueue_1 = $b2ce1b9c02009c9c$var$__values(copiedQueue), copiedQueue_1_1 = copiedQueue_1.next(); !copiedQueue_1_1.done; copiedQueue_1_1 = copiedQueue_1.next()){
                var message = copiedQueue_1_1.value;
                this.send(message);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (copiedQueue_1_1 && !copiedQueue_1_1.done && (_a = copiedQueue_1["return"])) _a.call(copiedQueue_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    /** Exposed send for DC & Peer. */ Socket.prototype.send = function(data) {
        if (this._disconnected) return;
        // If we didn't get an ID yet, we can't yet send anything so we should queue
        // up these messages.
        if (!this._id) {
            this._messagesQueue.push(data);
            return;
        }
        if (!data.type) {
            this.emit((0, $8b9dc3e5f2ea4cc9$export$3b5c4a4b6354f023).Error, "Invalid message");
            return;
        }
        if (!this._wsOpen()) return;
        var message = JSON.stringify(data);
        this._socket.send(message);
    };
    Socket.prototype.close = function() {
        if (this._disconnected) return;
        this._cleanup();
        this._disconnected = true;
    };
    Socket.prototype._cleanup = function() {
        if (this._socket) {
            this._socket.onopen = this._socket.onmessage = this._socket.onclose = null;
            this._socket.close();
            this._socket = undefined;
        }
        clearTimeout(this._wsPingTimer);
    };
    return Socket;
}((0, $b43bf3d87e5977ce$exports.EventEmitter));


var $2dee96d763ef5e84$exports = {};

$parcel$export($2dee96d763ef5e84$exports, "MediaConnection", function () { return $2dee96d763ef5e84$export$4a84e95a2324ac29; }, function (v) { return $2dee96d763ef5e84$export$4a84e95a2324ac29 = v; });


var $daff3b483806ca69$exports = {};

$parcel$export($daff3b483806ca69$exports, "Negotiator", function () { return $daff3b483806ca69$export$89e6bb5ad64bf4a; }, function (v) { return $daff3b483806ca69$export$89e6bb5ad64bf4a = v; });



var $daff3b483806ca69$var$__assign = undefined && undefined.__assign || function() {
    $daff3b483806ca69$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $daff3b483806ca69$var$__assign.apply(this, arguments);
};
var $daff3b483806ca69$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    var adopt = function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    };
    return new (P || (P = Promise))(function(resolve, reject) {
        var fulfilled = function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $daff3b483806ca69$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var verb = function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    };
    var step = function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    };
    var _ = {
        label: 0,
        sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
};
/**
 * Manages all negotiations between Peers.
 */ var $daff3b483806ca69$export$89e6bb5ad64bf4a = /** @class */ function() {
    var Negotiator = function Negotiator(connection) {
        this.connection = connection;
    };
    /** Returns a PeerConnection object set up correctly (for data, media). */ Negotiator.prototype.startConnection = function(options) {
        var peerConnection = this._startPeerConnection();
        // Set the connection's PC.
        this.connection.peerConnection = peerConnection;
        if (this.connection.type === (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Media && options._stream) this._addTracksToConnection(options._stream, peerConnection);
        // What do we need to do now?
        if (options.originator) {
            if (this.connection.type === (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Data) {
                var dataConnection = this.connection;
                var config = {
                    ordered: !!options.reliable
                };
                var dataChannel = peerConnection.createDataChannel(dataConnection.label, config);
                dataConnection.initialize(dataChannel);
            } else if (this.connection.type === (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Media) {
                var mediaConnection = this.connection;
                var dataChannel = peerConnection.createDataChannel(mediaConnection.connectionId);
                mediaConnection.initialize(dataChannel);
            }
            this._makeOffer();
        } else this.handleSDP("OFFER", options.sdp);
    };
    /** Start a PC. */ Negotiator.prototype._startPeerConnection = function() {
        (0, $96fb85a532fc3748$exports.default).log("Creating RTCPeerConnection.");
        var peerConnection = new RTCPeerConnection(this.connection.provider.options.config);
        this._setupListeners(peerConnection);
        return peerConnection;
    };
    /** Set up various WebRTC listeners. */ Negotiator.prototype._setupListeners = function(peerConnection) {
        var _this = this;
        var peerId = this.connection.peer;
        var connectionId = this.connection.connectionId;
        var connectionType = this.connection.type;
        var provider = this.connection.provider;
        // ICE CANDIDATES.
        (0, $96fb85a532fc3748$exports.default).log("Listening for ICE candidates.");
        peerConnection.onicecandidate = function(evt) {
            if (!evt.candidate || !evt.candidate.candidate) return;
            (0, $96fb85a532fc3748$exports.default).log("Received ICE candidates for ".concat(peerId, ":"), evt.candidate);
            provider.socket.send({
                type: (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Candidate,
                payload: {
                    candidate: evt.candidate,
                    type: connectionType,
                    connectionId: connectionId
                },
                dst: peerId
            });
        };
        peerConnection.oniceconnectionstatechange = function() {
            switch(peerConnection.iceConnectionState){
                case "failed":
                    (0, $96fb85a532fc3748$exports.default).log("iceConnectionState is failed, closing connections to " + peerId);
                    _this.connection.emit("error", new Error("Negotiation of connection to " + peerId + " failed."));
                    _this.connection.close();
                    break;
                case "closed":
                    (0, $96fb85a532fc3748$exports.default).log("iceConnectionState is closed, closing connections to " + peerId);
                    _this.connection.emit("error", new Error("Connection to " + peerId + " closed."));
                    _this.connection.close();
                    break;
                case "disconnected":
                    (0, $96fb85a532fc3748$exports.default).log("iceConnectionState changed to disconnected on the connection with " + peerId);
                    break;
                case "completed":
                    peerConnection.onicecandidate = (0, $7dc43ad2ffa25036$exports.util).noop;
                    break;
            }
            _this.connection.emit("iceStateChanged", peerConnection.iceConnectionState);
        };
        // DATACONNECTION.
        (0, $96fb85a532fc3748$exports.default).log("Listening for data channel");
        // Fired between offer and answer, so options should already be saved
        // in the options hash.
        peerConnection.ondatachannel = function(evt) {
            (0, $96fb85a532fc3748$exports.default).log("Received data channel");
            var dataChannel = evt.channel;
            var connection = provider.getConnection(peerId, connectionId);
            connection.initialize(dataChannel);
        };
        // MEDIACONNECTION.
        (0, $96fb85a532fc3748$exports.default).log("Listening for remote stream");
        peerConnection.ontrack = function(evt) {
            (0, $96fb85a532fc3748$exports.default).log("Received remote stream");
            var stream = evt.streams[0];
            var connection = provider.getConnection(peerId, connectionId);
            if (connection.type === (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Media) {
                var mediaConnection = connection;
                _this._addStreamToMediaConnection(stream, mediaConnection);
            }
        };
    };
    Negotiator.prototype.cleanup = function() {
        (0, $96fb85a532fc3748$exports.default).log("Cleaning up PeerConnection to " + this.connection.peer);
        var peerConnection = this.connection.peerConnection;
        if (!peerConnection) return;
        this.connection.peerConnection = null;
        //unsubscribe from all PeerConnection's events
        peerConnection.onicecandidate = peerConnection.oniceconnectionstatechange = peerConnection.ondatachannel = peerConnection.ontrack = function() {};
        var peerConnectionNotClosed = peerConnection.signalingState !== "closed";
        var dataChannelNotClosed = false;
        if (this.connection.type === (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Data) {
            var dataConnection = this.connection;
            var dataChannel = dataConnection.dataChannel;
            if (dataChannel) dataChannelNotClosed = !!dataChannel.readyState && dataChannel.readyState !== "closed";
        } else if (this.connection.type === (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Media) {
            var mediaConnection = this.connection;
            var dataChannel = mediaConnection.dataChannel;
            if (dataChannel) dataChannelNotClosed = !!dataChannel.readyState && dataChannel.readyState !== "closed";
        }
        if (peerConnectionNotClosed || dataChannelNotClosed) peerConnection.close();
    };
    Negotiator.prototype._makeOffer = function() {
        return $daff3b483806ca69$var$__awaiter(this, void 0, Promise, function() {
            var peerConnection, provider, offer, payload, dataConnection, err_2, err_1_1;
            return $daff3b483806ca69$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            7,
                            ,
                            8
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.createOffer(this.connection.options.constraints)
                        ];
                    case 2:
                        offer = _a.sent();
                        (0, $96fb85a532fc3748$exports.default).log("Created offer.");
                        if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") offer.sdp = this.connection.options.sdpTransform(offer.sdp) || offer.sdp;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([
                            3,
                            5,
                            ,
                            6
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.setLocalDescription(offer)
                        ];
                    case 4:
                        _a.sent();
                        (0, $96fb85a532fc3748$exports.default).log("Set localDescription:", offer, "for:".concat(this.connection.peer));
                        payload = {
                            sdp: offer,
                            type: this.connection.type,
                            connectionId: this.connection.connectionId,
                            metadata: this.connection.metadata,
                            browser: (0, $7dc43ad2ffa25036$exports.util).browser
                        };
                        if (this.connection.type === (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Data) {
                            dataConnection = this.connection;
                            payload = $daff3b483806ca69$var$__assign($daff3b483806ca69$var$__assign({}, payload), {
                                label: dataConnection.label,
                                reliable: dataConnection.reliable,
                                serialization: dataConnection.serialization
                            });
                        }
                        provider.socket.send({
                            type: (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Offer,
                            payload: payload,
                            dst: this.connection.peer
                        });
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 5:
                        err_2 = _a.sent();
                        // TODO: investigate why _makeOffer is being called from the answer
                        if (err_2 != "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer") {
                            provider.emitError((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).WebRTC, err_2);
                            (0, $96fb85a532fc3748$exports.default).log("Failed to setLocalDescription, ", err_2);
                        }
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 6:
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 7:
                        err_1_1 = _a.sent();
                        provider.emitError((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).WebRTC, err_1_1);
                        (0, $96fb85a532fc3748$exports.default).log("Failed to createOffer, ", err_1_1);
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 8:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    Negotiator.prototype._makeAnswer = function() {
        return $daff3b483806ca69$var$__awaiter(this, void 0, Promise, function() {
            var peerConnection, provider, answer, err_3, err_1_2;
            return $daff3b483806ca69$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            7,
                            ,
                            8
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.createAnswer()
                        ];
                    case 2:
                        answer = _a.sent();
                        (0, $96fb85a532fc3748$exports.default).log("Created answer.");
                        if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") answer.sdp = this.connection.options.sdpTransform(answer.sdp) || answer.sdp;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([
                            3,
                            5,
                            ,
                            6
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.setLocalDescription(answer)
                        ];
                    case 4:
                        _a.sent();
                        (0, $96fb85a532fc3748$exports.default).log("Set localDescription:", answer, "for:".concat(this.connection.peer));
                        provider.socket.send({
                            type: (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Answer,
                            payload: {
                                sdp: answer,
                                type: this.connection.type,
                                connectionId: this.connection.connectionId,
                                browser: (0, $7dc43ad2ffa25036$exports.util).browser
                            },
                            dst: this.connection.peer
                        });
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 5:
                        err_3 = _a.sent();
                        provider.emitError((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).WebRTC, err_3);
                        (0, $96fb85a532fc3748$exports.default).log("Failed to setLocalDescription, ", err_3);
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 6:
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 7:
                        err_1_2 = _a.sent();
                        provider.emitError((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).WebRTC, err_1_2);
                        (0, $96fb85a532fc3748$exports.default).log("Failed to create answer, ", err_1_2);
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 8:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /** Handle an SDP. */ Negotiator.prototype.handleSDP = function(type, sdp) {
        return $daff3b483806ca69$var$__awaiter(this, void 0, Promise, function() {
            var peerConnection, provider, self, err_4;
            return $daff3b483806ca69$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        sdp = new RTCSessionDescription(sdp);
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        (0, $96fb85a532fc3748$exports.default).log("Setting remote description", sdp);
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            5,
                            ,
                            6
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.setRemoteDescription(sdp)
                        ];
                    case 2:
                        _a.sent();
                        (0, $96fb85a532fc3748$exports.default).log("Set remoteDescription:".concat(type, " for:").concat(this.connection.peer));
                        if (!(type === "OFFER")) return [
                            3 /*break*/ ,
                            4
                        ];
                        return [
                            4 /*yield*/ ,
                            self._makeAnswer()
                        ];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 5:
                        err_4 = _a.sent();
                        provider.emitError((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).WebRTC, err_4);
                        (0, $96fb85a532fc3748$exports.default).log("Failed to setRemoteDescription, ", err_4);
                        return [
                            3 /*break*/ ,
                            6
                        ];
                    case 6:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /** Handle a candidate. */ Negotiator.prototype.handleCandidate = function(ice) {
        return $daff3b483806ca69$var$__awaiter(this, void 0, Promise, function() {
            var candidate, sdpMLineIndex, sdpMid, peerConnection, provider, err_5;
            return $daff3b483806ca69$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        (0, $96fb85a532fc3748$exports.default).log("handleCandidate:", ice);
                        candidate = ice.candidate;
                        sdpMLineIndex = ice.sdpMLineIndex;
                        sdpMid = ice.sdpMid;
                        peerConnection = this.connection.peerConnection;
                        provider = this.connection.provider;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([
                            1,
                            3,
                            ,
                            4
                        ]);
                        return [
                            4 /*yield*/ ,
                            peerConnection.addIceCandidate(new RTCIceCandidate({
                                sdpMid: sdpMid,
                                sdpMLineIndex: sdpMLineIndex,
                                candidate: candidate
                            }))
                        ];
                    case 2:
                        _a.sent();
                        (0, $96fb85a532fc3748$exports.default).log("Added ICE candidate for:".concat(this.connection.peer));
                        return [
                            3 /*break*/ ,
                            4
                        ];
                    case 3:
                        err_5 = _a.sent();
                        provider.emitError((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).WebRTC, err_5);
                        (0, $96fb85a532fc3748$exports.default).log("Failed to handleCandidate, ", err_5);
                        return [
                            3 /*break*/ ,
                            4
                        ];
                    case 4:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    Negotiator.prototype._addTracksToConnection = function(stream, peerConnection) {
        (0, $96fb85a532fc3748$exports.default).log("add tracks from stream ".concat(stream.id, " to peer connection"));
        if (!peerConnection.addTrack) return (0, $96fb85a532fc3748$exports.default).error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
        stream.getTracks().forEach(function(track) {
            peerConnection.addTrack(track, stream);
        });
    };
    Negotiator.prototype._addStreamToMediaConnection = function(stream, mediaConnection) {
        (0, $96fb85a532fc3748$exports.default).log("add stream ".concat(stream.id, " to media connection ").concat(mediaConnection.connectionId));
        mediaConnection.addStream(stream);
    };
    return Negotiator;
}();



var $5d892295c5b1457a$exports = {};

$parcel$export($5d892295c5b1457a$exports, "BaseConnection", function () { return $5d892295c5b1457a$export$23a2a68283c24d80; }, function (v) { return $5d892295c5b1457a$export$23a2a68283c24d80 = v; });

var $5d892295c5b1457a$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function extendStatics1(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        var __ = function __() {
            this.constructor = d;
        };
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $5d892295c5b1457a$export$23a2a68283c24d80 = /** @class */ function(_super) {
    var BaseConnection = function BaseConnection(peer, provider, options) {
        var _this = _super.call(this) || this;
        _this.peer = peer;
        _this.provider = provider;
        _this.options = options;
        _this._open = false;
        _this.metadata = options.metadata;
        return _this;
    };
    $5d892295c5b1457a$var$__extends(BaseConnection, _super);
    Object.defineProperty(BaseConnection.prototype, "open", {
        get: function get() {
            return this._open;
        },
        enumerable: false,
        configurable: true
    });
    return BaseConnection;
}((0, $b43bf3d87e5977ce$exports.EventEmitter));


var $2dee96d763ef5e84$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function extendStatics1(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        var __ = function __() {
            this.constructor = d;
        };
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $2dee96d763ef5e84$var$__assign = undefined && undefined.__assign || function() {
    $2dee96d763ef5e84$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $2dee96d763ef5e84$var$__assign.apply(this, arguments);
};
var $2dee96d763ef5e84$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Wraps the streaming interface between two Peers.
 */ var $2dee96d763ef5e84$export$4a84e95a2324ac29 = /** @class */ function(_super) {
    $2dee96d763ef5e84$var$__extends(MediaConnection, _super);
    function MediaConnection(peerId, provider, options) {
        var _this = _super.call(this, peerId, provider, options) || this;
        _this._localStream = _this.options._stream;
        _this.connectionId = _this.options.connectionId || MediaConnection.ID_PREFIX + (0, $7dc43ad2ffa25036$exports.util).randomToken();
        _this._negotiator = new (0, $daff3b483806ca69$exports.Negotiator)(_this);
        if (_this._localStream) _this._negotiator.startConnection({
            _stream: _this._localStream,
            originator: true
        });
        return _this;
    }
    Object.defineProperty(MediaConnection.prototype, "type", {
        get: function get() {
            return (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Media;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaConnection.prototype, "localStream", {
        get: function get() {
            return this._localStream;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaConnection.prototype, "remoteStream", {
        get: function get() {
            return this._remoteStream;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaConnection.prototype, "dataChannel", {
        get: function get() {
            return this._dc;
        },
        enumerable: false,
        configurable: true
    });
    /** Called by the Negotiator when the DataChannel is ready. */ MediaConnection.prototype.initialize = function(dc) {
        this._dc = dc;
        this._configureDataChannel();
    };
    MediaConnection.prototype._configureDataChannel = function() {
        var _this = this;
        if (!(0, $7dc43ad2ffa25036$exports.util).supports.binaryBlob || (0, $7dc43ad2ffa25036$exports.util).supports.reliable) this.dataChannel.binaryType = "arraybuffer";
        this.dataChannel.onopen = function() {
            (0, $96fb85a532fc3748$exports.default).log("DC#".concat(_this.connectionId, " dc connection success"));
        };
        this.dataChannel.onmessage = function(e) {
            (0, $96fb85a532fc3748$exports.default).log("DC#".concat(_this.connectionId, " dc onmessage:"), e.data);
        };
        this.dataChannel.onclose = function() {
            (0, $96fb85a532fc3748$exports.default).log("DC#".concat(_this.connectionId, " dc closed for:"), _this.peer);
            _this.close();
        };
    };
    MediaConnection.prototype.addStream = function(remoteStream) {
        (0, $96fb85a532fc3748$exports.default).log("Receiving stream", remoteStream);
        this._remoteStream = remoteStream;
        _super.prototype.emit.call(this, "stream", remoteStream); // Should we call this `open`?
    };
    MediaConnection.prototype.handleMessage = function(message) {
        var type = message.type;
        var payload = message.payload;
        switch(message.type){
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Answer:
                // Forward to negotiator
                this._negotiator.handleSDP(type, payload.sdp);
                this._open = true;
                break;
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Candidate:
                this._negotiator.handleCandidate(payload.candidate);
                break;
            default:
                (0, $96fb85a532fc3748$exports.default).warn("Unrecognized message type:".concat(type, " from peer:").concat(this.peer));
                break;
        }
    };
    MediaConnection.prototype.answer = function(stream, options) {
        var e_1, _a;
        if (options === void 0) options = {};
        if (this._localStream) {
            (0, $96fb85a532fc3748$exports.default).warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
            return;
        }
        this._localStream = stream;
        if (options && options.sdpTransform) this.options.sdpTransform = options.sdpTransform;
        this._negotiator.startConnection($2dee96d763ef5e84$var$__assign($2dee96d763ef5e84$var$__assign({}, this.options._payload), {
            _stream: stream
        }));
        // Retrieve lost messages stored because PeerConnection not set up.
        var messages = this.provider._getMessages(this.connectionId);
        try {
            for(var messages_1 = $2dee96d763ef5e84$var$__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()){
                var message = messages_1_1.value;
                this.handleMessage(message);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (messages_1_1 && !messages_1_1.done && (_a = messages_1["return"])) _a.call(messages_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
        this._open = true;
    };
    /**
     * Exposed functionality for users.
     */ /** Allows user to close connection. */ MediaConnection.prototype.close = function() {
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
        if (this.options && this.options._stream) this.options._stream = null;
        if (!this.open) return;
        this._open = false;
        _super.prototype.emit.call(this, "close");
    };
    MediaConnection.ID_PREFIX = "mc_";
    return MediaConnection;
}((0, $5d892295c5b1457a$exports.BaseConnection));


var $4b24811a876734be$exports = {};

$parcel$export($4b24811a876734be$exports, "DataConnection", function () { return $4b24811a876734be$export$d365f7ad9d7df9c9; }, function (v) { return $4b24811a876734be$export$d365f7ad9d7df9c9 = v; });





var $c9c05de86256a90f$exports = {};

$parcel$export($c9c05de86256a90f$exports, "EncodingQueue", function () { return $c9c05de86256a90f$export$c6913ae0ed687038; }, function (v) { return $c9c05de86256a90f$export$c6913ae0ed687038 = v; });


var $c9c05de86256a90f$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function extendStatics1(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        var __ = function __() {
            this.constructor = d;
        };
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $c9c05de86256a90f$export$c6913ae0ed687038 = /** @class */ function(_super) {
    var EncodingQueue = function EncodingQueue() {
        var _this = _super.call(this) || this;
        _this.fileReader = new FileReader();
        _this._queue = [];
        _this._processing = false;
        _this.fileReader.onload = function(evt) {
            _this._processing = false;
            if (evt.target) _this.emit("done", evt.target.result);
            _this.doNextTask();
        };
        _this.fileReader.onerror = function(evt) {
            (0, $96fb85a532fc3748$exports.default).error("EncodingQueue error:", evt);
            _this._processing = false;
            _this.destroy();
            _this.emit("error", evt);
        };
        return _this;
    };
    $c9c05de86256a90f$var$__extends(EncodingQueue, _super);
    Object.defineProperty(EncodingQueue.prototype, "queue", {
        get: function get() {
            return this._queue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EncodingQueue.prototype, "size", {
        get: function get() {
            return this.queue.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EncodingQueue.prototype, "processing", {
        get: function get() {
            return this._processing;
        },
        enumerable: false,
        configurable: true
    });
    EncodingQueue.prototype.enque = function(blob) {
        this.queue.push(blob);
        if (this.processing) return;
        this.doNextTask();
    };
    EncodingQueue.prototype.destroy = function() {
        this.fileReader.abort();
        this._queue = [];
    };
    EncodingQueue.prototype.doNextTask = function() {
        if (this.size === 0) return;
        if (this.processing) return;
        this._processing = true;
        this.fileReader.readAsArrayBuffer(this.queue.shift());
    };
    return EncodingQueue;
}((0, $b43bf3d87e5977ce$exports.EventEmitter));


var $4b24811a876734be$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function extendStatics1(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        var __ = function __() {
            this.constructor = d;
        };
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $4b24811a876734be$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Wraps a DataChannel between two Peers.
 */ var $4b24811a876734be$export$d365f7ad9d7df9c9 = /** @class */ function(_super) {
    $4b24811a876734be$var$__extends(DataConnection, _super);
    function DataConnection(peerId, provider, options) {
        var _this = _super.call(this, peerId, provider, options) || this;
        _this.stringify = JSON.stringify;
        _this.parse = JSON.parse;
        _this._buffer = [];
        _this._bufferSize = 0;
        _this._buffering = false;
        _this._chunkedData = {};
        _this._encodingQueue = new (0, $c9c05de86256a90f$exports.EncodingQueue)();
        _this.connectionId = _this.options.connectionId || DataConnection.ID_PREFIX + (0, $7dc43ad2ffa25036$exports.util).randomToken();
        _this.label = _this.options.label || _this.connectionId;
        _this.serialization = _this.options.serialization || (0, $8b9dc3e5f2ea4cc9$export$89f507cf986a947).Binary;
        _this.reliable = !!_this.options.reliable;
        _this._encodingQueue.on("done", function(ab) {
            _this._bufferedSend(ab);
        });
        _this._encodingQueue.on("error", function() {
            (0, $96fb85a532fc3748$exports.default).error("DC#".concat(_this.connectionId, ": Error occured in encoding from blob to arraybuffer, close DC"));
            _this.close();
        });
        _this._negotiator = new (0, $daff3b483806ca69$exports.Negotiator)(_this);
        _this._negotiator.startConnection(_this.options._payload || {
            originator: true
        });
        return _this;
    }
    Object.defineProperty(DataConnection.prototype, "type", {
        get: function get() {
            return (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConnection.prototype, "dataChannel", {
        get: function get() {
            return this._dc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConnection.prototype, "bufferSize", {
        get: function get() {
            return this._bufferSize;
        },
        enumerable: false,
        configurable: true
    });
    /** Called by the Negotiator when the DataChannel is ready. */ DataConnection.prototype.initialize = function(dc) {
        this._dc = dc;
        this._configureDataChannel();
    };
    DataConnection.prototype._configureDataChannel = function() {
        var _this = this;
        if (!(0, $7dc43ad2ffa25036$exports.util).supports.binaryBlob || (0, $7dc43ad2ffa25036$exports.util).supports.reliable) this.dataChannel.binaryType = "arraybuffer";
        this.dataChannel.onopen = function() {
            (0, $96fb85a532fc3748$exports.default).log("DC#".concat(_this.connectionId, " dc connection success"));
            _this._open = true;
            _this.emit("open");
        };
        this.dataChannel.onmessage = function(e) {
            (0, $96fb85a532fc3748$exports.default).log("DC#".concat(_this.connectionId, " dc onmessage:"), e.data);
            _this._handleDataMessage(e);
        };
        this.dataChannel.onclose = function() {
            (0, $96fb85a532fc3748$exports.default).log("DC#".concat(_this.connectionId, " dc closed for:"), _this.peer);
            _this.close();
        };
    };
    // Handles a DataChannel message.
    DataConnection.prototype._handleDataMessage = function(_a) {
        var _this = this;
        var data = _a.data;
        var datatype = data.constructor;
        var isBinarySerialization = this.serialization === (0, $8b9dc3e5f2ea4cc9$export$89f507cf986a947).Binary || this.serialization === (0, $8b9dc3e5f2ea4cc9$export$89f507cf986a947).BinaryUTF8;
        var deserializedData = data;
        if (isBinarySerialization) {
            if (datatype === Blob) {
                // Datatype should never be blob
                (0, $7dc43ad2ffa25036$exports.util).blobToArrayBuffer(data, function(ab) {
                    var unpackedData = (0, $7dc43ad2ffa25036$exports.util).unpack(ab);
                    _this.emit("data", unpackedData);
                });
                return;
            } else if (datatype === ArrayBuffer) deserializedData = (0, $7dc43ad2ffa25036$exports.util).unpack(data);
            else if (datatype === String) {
                // String fallback for binary data for browsers that don't support binary yet
                var ab = (0, $7dc43ad2ffa25036$exports.util).binaryStringToArrayBuffer(data);
                deserializedData = (0, $7dc43ad2ffa25036$exports.util).unpack(ab);
            }
        } else if (this.serialization === (0, $8b9dc3e5f2ea4cc9$export$89f507cf986a947).JSON) deserializedData = this.parse(data);
        // Check if we've chunked--if so, piece things back together.
        // We're guaranteed that this isn't 0.
        if (deserializedData.__peerData) {
            this._handleChunk(deserializedData);
            return;
        }
        _super.prototype.emit.call(this, "data", deserializedData);
    };
    DataConnection.prototype._handleChunk = function(data) {
        var id = data.__peerData;
        var chunkInfo = this._chunkedData[id] || {
            data: [],
            count: 0,
            total: data.total
        };
        chunkInfo.data[data.n] = new Uint8Array(data.data);
        chunkInfo.count++;
        this._chunkedData[id] = chunkInfo;
        if (chunkInfo.total === chunkInfo.count) {
            // Clean up before making the recursive call to `_handleDataMessage`.
            delete this._chunkedData[id];
            // We've received all the chunks--time to construct the complete data.
            var data_1 = (0, $7dc43ad2ffa25036$exports.concatArrayBuffers)(chunkInfo.data);
            this.emit("data", (0, $7dc43ad2ffa25036$exports.util).unpack(data_1));
        }
    };
    /**
     * Exposed functionality for users.
     */ /** Allows user to close connection. */ DataConnection.prototype.close = function() {
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
        if (!this.open) return;
        this._open = false;
        _super.prototype.emit.call(this, "close");
    };
    /** Allows user to send data. */ DataConnection.prototype.send = function(data, chunked) {
        var _this = this;
        if (!this.open) {
            _super.prototype.emit.call(this, "error", new Error("Connection is not open. You should listen for the `open` event before sending messages."));
            return;
        }
        if (data instanceof Blob) {
            data.arrayBuffer().then(function(ab) {
                return _this.send(ab);
            });
            return;
        }
        if (this.serialization === (0, $8b9dc3e5f2ea4cc9$export$89f507cf986a947).JSON) this._bufferedSend(this.stringify(data));
        else if (this.serialization === (0, $8b9dc3e5f2ea4cc9$export$89f507cf986a947).Binary || this.serialization === (0, $8b9dc3e5f2ea4cc9$export$89f507cf986a947).BinaryUTF8) {
            var blob = (0, $7dc43ad2ffa25036$exports.util).pack(data);
            if (!chunked && blob.byteLength > (0, $7dc43ad2ffa25036$exports.util).chunkedMTU) {
                this._sendChunks(blob);
                return;
            }
            this._bufferedSend(blob);
        } else this._bufferedSend(data);
    };
    DataConnection.prototype._bufferedSend = function(msg) {
        if (this._buffering || !this._trySend(msg)) {
            this._buffer.push(msg);
            this._bufferSize = this._buffer.length;
        }
    };
    // Returns true if the send succeeds.
    DataConnection.prototype._trySend = function(msg) {
        var _this = this;
        if (!this.open) return false;
        if (this.dataChannel.bufferedAmount > DataConnection.MAX_BUFFERED_AMOUNT) {
            this._buffering = true;
            setTimeout(function() {
                _this._buffering = false;
                _this._tryBuffer();
            }, 50);
            return false;
        }
        try {
            this.dataChannel.send(msg);
        } catch (e) {
            (0, $96fb85a532fc3748$exports.default).error("DC#:".concat(this.connectionId, " Error when sending:"), e);
            this._buffering = true;
            this.close();
            return false;
        }
        return true;
    };
    // Try to send the first message in the buffer.
    DataConnection.prototype._tryBuffer = function() {
        if (!this.open) return;
        if (this._buffer.length === 0) return;
        var msg = this._buffer[0];
        if (this._trySend(msg)) {
            this._buffer.shift();
            this._bufferSize = this._buffer.length;
            this._tryBuffer();
        }
    };
    DataConnection.prototype._sendChunks = function(blob) {
        var e_1, _a;
        var blobs = (0, $7dc43ad2ffa25036$exports.util).chunk(blob);
        (0, $96fb85a532fc3748$exports.default).log("DC#".concat(this.connectionId, " Try to send ").concat(blobs.length, " chunks..."));
        try {
            for(var blobs_1 = $4b24811a876734be$var$__values(blobs), blobs_1_1 = blobs_1.next(); !blobs_1_1.done; blobs_1_1 = blobs_1.next()){
                var blob_1 = blobs_1_1.value;
                this.send(blob_1, true);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (blobs_1_1 && !blobs_1_1.done && (_a = blobs_1["return"])) _a.call(blobs_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    DataConnection.prototype.handleMessage = function(message) {
        var payload = message.payload;
        switch(message.type){
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Answer:
                this._negotiator.handleSDP(message.type, payload.sdp);
                break;
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Candidate:
                this._negotiator.handleCandidate(payload.candidate);
                break;
            default:
                (0, $96fb85a532fc3748$exports.default).warn("Unrecognized message type:", message.type, "from peer:", this.peer);
                break;
        }
    };
    DataConnection.ID_PREFIX = "dc_";
    DataConnection.MAX_BUFFERED_AMOUNT = 8388608;
    return DataConnection;
}((0, $5d892295c5b1457a$exports.BaseConnection));



var $cc553450d0fad698$exports = {};

$parcel$export($cc553450d0fad698$exports, "API", function () { return $cc553450d0fad698$export$2c4e825dc9120f87; }, function (v) { return $cc553450d0fad698$export$2c4e825dc9120f87 = v; });



var $cc553450d0fad698$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    var adopt = function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    };
    return new (P || (P = Promise))(function(resolve, reject) {
        var fulfilled = function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $cc553450d0fad698$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var verb = function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    };
    var step = function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    };
    var _ = {
        label: 0,
        sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
};
var $cc553450d0fad698$export$2c4e825dc9120f87 = /** @class */ function() {
    var API = function API(_options) {
        this._options = _options;
    };
    API.prototype._buildRequest = function(method) {
        var protocol = this._options.secure ? "https" : "http";
        var _a = this._options, host = _a.host, port = _a.port, path = _a.path, key = _a.key;
        var url = new URL("".concat(protocol, "://").concat(host, ":").concat(port).concat(path).concat(key, "/").concat(method));
        // TODO: Why timestamp, why random?
        url.searchParams.set("ts", "".concat(Date.now()).concat(Math.random()));
        url.searchParams.set("version", (0, $face5264434edf64$exports.version));
        return fetch(url.href, {
            referrerPolicy: this._options.referrerPolicy
        });
    };
    /** Get a unique ID from the server via XHR and initialize with it. */ API.prototype.retrieveId = function() {
        return $cc553450d0fad698$var$__awaiter(this, void 0, Promise, function() {
            var response, error_1, pathError;
            return $cc553450d0fad698$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        _a.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4 /*yield*/ ,
                            this._buildRequest("id")
                        ];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) throw new Error("Error. Status:".concat(response.status));
                        return [
                            2 /*return*/ ,
                            response.text()
                        ];
                    case 2:
                        error_1 = _a.sent();
                        (0, $96fb85a532fc3748$exports.default).error("Error retrieving ID", error_1);
                        pathError = "";
                        if (this._options.path === "/" && this._options.host !== (0, $7dc43ad2ffa25036$exports.util).CLOUD_HOST) pathError = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer.";
                        throw new Error("Could not get an ID from the server." + pathError);
                    case 3:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /** @deprecated */ API.prototype.listAllPeers = function() {
        return $cc553450d0fad698$var$__awaiter(this, void 0, Promise, function() {
            var response, helpfulError, error_2;
            return $cc553450d0fad698$var$__generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        _a.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4 /*yield*/ ,
                            this._buildRequest("peers")
                        ];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            if (response.status === 401) {
                                helpfulError = "";
                                if (this._options.host === (0, $7dc43ad2ffa25036$exports.util).CLOUD_HOST) helpfulError = "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.";
                                else helpfulError = "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.";
                                throw new Error("It doesn't look like you have permission to list peers IDs. " + helpfulError);
                            }
                            throw new Error("Error. Status:".concat(response.status));
                        }
                        return [
                            2 /*return*/ ,
                            response.json()
                        ];
                    case 2:
                        error_2 = _a.sent();
                        (0, $96fb85a532fc3748$exports.default).error("Error retrieving list peers", error_2);
                        throw new Error("Could not get list peers from the server." + error_2);
                    case 3:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    return API;
}();


var $17252116aa2ef1fb$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function extendStatics1(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        var __ = function __() {
            this.constructor = d;
        };
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $17252116aa2ef1fb$var$__assign = undefined && undefined.__assign || function() {
    $17252116aa2ef1fb$var$__assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $17252116aa2ef1fb$var$__assign.apply(this, arguments);
};
var $17252116aa2ef1fb$var$__values = undefined && undefined.__values || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $17252116aa2ef1fb$var$__read = undefined && undefined.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
};
var $17252116aa2ef1fb$var$PeerOptions = /** @class */ function() {
    var PeerOptions = function PeerOptions() {};
    return PeerOptions;
}();
/**
 * A peer who can initiate connections with other peers.
 */ var $17252116aa2ef1fb$export$ecd1fc136c422448 = /** @class */ function(_super) {
    $17252116aa2ef1fb$var$__extends(Peer, _super);
    function Peer(id, options) {
        var _this = _super.call(this) || this;
        _this._id = null;
        _this._lastServerId = null;
        // States.
        _this._destroyed = false; // Connections have been killed
        _this._disconnected = false; // Connection to PeerServer killed but P2P connections still active
        _this._open = false; // Sockets and such are not yet open.
        _this._connections = new Map(); // All connections for this peer.
        _this._lostMessages = new Map(); // src => [list of messages]
        var userId;
        // Deal with overloading
        if (id && id.constructor == Object) options = id;
        else if (id) userId = id.toString();
        // Configurize options
        options = $17252116aa2ef1fb$var$__assign({
            debug: 0,
            host: (0, $7dc43ad2ffa25036$exports.util).CLOUD_HOST,
            port: (0, $7dc43ad2ffa25036$exports.util).CLOUD_PORT,
            path: "/",
            key: Peer.DEFAULT_KEY,
            token: (0, $7dc43ad2ffa25036$exports.util).randomToken(),
            config: (0, $7dc43ad2ffa25036$exports.util).defaultConfig,
            referrerPolicy: "strict-origin-when-cross-origin"
        }, options);
        _this._options = options;
        // Detect relative URL host.
        if (_this._options.host === "/") _this._options.host = window.location.hostname;
        // Set path correctly.
        if (_this._options.path) {
            if (_this._options.path[0] !== "/") _this._options.path = "/" + _this._options.path;
            if (_this._options.path[_this._options.path.length - 1] !== "/") _this._options.path += "/";
        }
        // Set whether we use SSL to same as current host
        if (_this._options.secure === undefined && _this._options.host !== (0, $7dc43ad2ffa25036$exports.util).CLOUD_HOST) _this._options.secure = (0, $7dc43ad2ffa25036$exports.util).isSecure();
        else if (_this._options.host == (0, $7dc43ad2ffa25036$exports.util).CLOUD_HOST) _this._options.secure = true;
        // Set a custom log function if present
        if (_this._options.logFunction) (0, $96fb85a532fc3748$exports.default).setLogFunction(_this._options.logFunction);
        (0, $96fb85a532fc3748$exports.default).logLevel = _this._options.debug || 0;
        _this._api = new (0, $cc553450d0fad698$exports.API)(options);
        _this._socket = _this._createServerConnection();
        // Sanity checks
        // Ensure WebRTC supported
        if (!(0, $7dc43ad2ffa25036$exports.util).supports.audioVideo && !(0, $7dc43ad2ffa25036$exports.util).supports.data) {
            _this._delayedAbort((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).BrowserIncompatible, "The current browser does not support WebRTC");
            return _this;
        }
        // Ensure alphanumeric id
        if (!!userId && !(0, $7dc43ad2ffa25036$exports.util).validateId(userId)) {
            _this._delayedAbort((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).InvalidID, 'ID "'.concat(userId, '" is invalid'));
            return _this;
        }
        if (userId) _this._initialize(userId);
        else _this._api.retrieveId().then(function(id) {
            return _this._initialize(id);
        })["catch"](function(error) {
            return _this._abort((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).ServerError, error);
        });
        return _this;
    }
    Object.defineProperty(Peer.prototype, "id", {
        /**
         * The brokering ID of this peer
         */ get: function get() {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Peer.prototype, "options", {
        get: function get() {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Peer.prototype, "open", {
        get: function get() {
            return this._open;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Peer.prototype, "socket", {
        get: function get() {
            return this._socket;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Peer.prototype, "connections", {
        /**
         * A hash of all connections associated with this peer, keyed by the remote peer's ID.
         * @deprecated
         * Return type will change from Object to Map<string,[]>
         */ get: function get() {
            var e_1, _a;
            var plainConnections = Object.create(null);
            try {
                for(var _b = $17252116aa2ef1fb$var$__values(this._connections), _c = _b.next(); !_c.done; _c = _b.next()){
                    var _d = $17252116aa2ef1fb$var$__read(_c.value, 2), k = _d[0], v = _d[1];
                    plainConnections[k] = v;
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally{
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                } finally{
                    if (e_1) throw e_1.error;
                }
            }
            return plainConnections;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Peer.prototype, "destroyed", {
        /**
         * true if this peer and all of its connections can no longer be used.
         */ get: function get() {
            return this._destroyed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Peer.prototype, "disconnected", {
        /**
         * false if there is an active connection to the PeerServer.
         */ get: function get() {
            return this._disconnected;
        },
        enumerable: false,
        configurable: true
    });
    Peer.prototype._createServerConnection = function() {
        var _this = this;
        var socket = new (0, $b2ce1b9c02009c9c$exports.Socket)(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
        socket.on((0, $8b9dc3e5f2ea4cc9$export$3b5c4a4b6354f023).Message, function(data) {
            _this._handleMessage(data);
        });
        socket.on((0, $8b9dc3e5f2ea4cc9$export$3b5c4a4b6354f023).Error, function(error) {
            _this._abort((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).SocketError, error);
        });
        socket.on((0, $8b9dc3e5f2ea4cc9$export$3b5c4a4b6354f023).Disconnected, function() {
            if (_this.disconnected) return;
            _this.emitError((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).Network, "Lost connection to server.");
            _this.disconnect();
        });
        socket.on((0, $8b9dc3e5f2ea4cc9$export$3b5c4a4b6354f023).Close, function() {
            if (_this.disconnected) return;
            _this._abort((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).SocketClosed, "Underlying socket is already closed.");
        });
        return socket;
    };
    /** Initialize a connection with the server. */ Peer.prototype._initialize = function(id) {
        this._id = id;
        this.socket.start(id, this._options.token);
    };
    /** Handles messages from the server. */ Peer.prototype._handleMessage = function(message) {
        var e_2, _a;
        var type = message.type;
        var payload = message.payload;
        var peerId = message.src;
        switch(type){
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Open:
                this._lastServerId = this.id;
                this._open = true;
                this.emit("open", this.id);
                break;
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Error:
                this._abort((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).ServerError, payload.msg);
                break;
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).IdTaken:
                this._abort((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).UnavailableID, 'ID "'.concat(this.id, '" is taken'));
                break;
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).InvalidKey:
                this._abort((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).InvalidKey, 'API KEY "'.concat(this._options.key, '" is invalid'));
                break;
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Leave:
                (0, $96fb85a532fc3748$exports.default).log("Received leave message from ".concat(peerId));
                this._cleanupPeer(peerId);
                this._connections["delete"](peerId);
                break;
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Expire:
                this.emitError((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).PeerUnavailable, "Could not connect to peer ".concat(peerId));
                break;
            case (0, $8b9dc3e5f2ea4cc9$export$adb4a1754da6f10d).Offer:
                // we should consider switching this to CALL/CONNECT, but this is the least breaking option.
                var connectionId = payload.connectionId;
                var connection = this.getConnection(peerId, connectionId);
                if (connection) {
                    connection.close();
                    (0, $96fb85a532fc3748$exports.default).warn("Offer received for existing Connection ID:".concat(connectionId));
                }
                // Create a new connection.
                if (payload.type === (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Media) {
                    var mediaConnection = new (0, $2dee96d763ef5e84$exports.MediaConnection)(peerId, this, {
                        connectionId: connectionId,
                        _payload: payload,
                        metadata: payload.metadata
                    });
                    connection = mediaConnection;
                    this._addConnection(peerId, connection);
                    this.emit("call", mediaConnection);
                } else if (payload.type === (0, $8b9dc3e5f2ea4cc9$export$3157d57b4135e3bc).Data) {
                    var dataConnection = new (0, $4b24811a876734be$exports.DataConnection)(peerId, this, {
                        connectionId: connectionId,
                        _payload: payload,
                        metadata: payload.metadata,
                        label: payload.label,
                        serialization: payload.serialization,
                        reliable: payload.reliable
                    });
                    connection = dataConnection;
                    this._addConnection(peerId, connection);
                    this.emit("connection", dataConnection);
                } else {
                    (0, $96fb85a532fc3748$exports.default).warn("Received malformed connection type:".concat(payload.type));
                    return;
                }
                // Find messages.
                var messages = this._getMessages(connectionId);
                try {
                    for(var messages_1 = $17252116aa2ef1fb$var$__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()){
                        var message_1 = messages_1_1.value;
                        connection.handleMessage(message_1);
                    }
                } catch (e_2_1) {
                    e_2 = {
                        error: e_2_1
                    };
                } finally{
                    try {
                        if (messages_1_1 && !messages_1_1.done && (_a = messages_1["return"])) _a.call(messages_1);
                    } finally{
                        if (e_2) throw e_2.error;
                    }
                }
                break;
            default:
                if (!payload) {
                    (0, $96fb85a532fc3748$exports.default).warn("You received a malformed message from ".concat(peerId, " of type ").concat(type));
                    return;
                }
                var connectionId = payload.connectionId;
                var connection = this.getConnection(peerId, connectionId);
                if (connection && connection.peerConnection) // Pass it on.
                connection.handleMessage(message);
                else if (connectionId) // Store for possible later use
                this._storeMessage(connectionId, message);
                else (0, $96fb85a532fc3748$exports.default).warn("You received an unrecognized message:", message);
                break;
        }
    };
    /** Stores messages without a set up connection, to be claimed later. */ Peer.prototype._storeMessage = function(connectionId, message) {
        if (!this._lostMessages.has(connectionId)) this._lostMessages.set(connectionId, []);
        this._lostMessages.get(connectionId).push(message);
    };
    /** Retrieve messages from lost message store */ //TODO Change it to private
    Peer.prototype._getMessages = function(connectionId) {
        var messages = this._lostMessages.get(connectionId);
        if (messages) {
            this._lostMessages["delete"](connectionId);
            return messages;
        }
        return [];
    };
    /**
     * Connects to the remote peer specified by id and returns a data connection.
     * @param peer The brokering ID of the remote peer (their peer.id).
     * @param options for specifying details about Peer Connection
     */ Peer.prototype.connect = function(peer, options) {
        if (options === void 0) options = {};
        if (this.disconnected) {
            (0, $96fb85a532fc3748$exports.default).warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available.");
            this.emitError((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).Disconnected, "Cannot connect to new Peer after disconnecting from server.");
            return;
        }
        var dataConnection = new (0, $4b24811a876734be$exports.DataConnection)(peer, this, options);
        this._addConnection(peer, dataConnection);
        return dataConnection;
    };
    /**
     * Calls the remote peer specified by id and returns a media connection.
     * @param peer The brokering ID of the remote peer (their peer.id).
     * @param stream The caller's media stream
     * @param options Metadata associated with the connection, passed in by whoever initiated the connection.
     */ Peer.prototype.call = function(peer, stream, options) {
        if (options === void 0) options = {};
        if (this.disconnected) {
            (0, $96fb85a532fc3748$exports.default).warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect.");
            this.emitError((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).Disconnected, "Cannot connect to new Peer after disconnecting from server.");
            return;
        }
        if (!stream) {
            (0, $96fb85a532fc3748$exports.default).error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
            return;
        }
        var mediaConnection = new (0, $2dee96d763ef5e84$exports.MediaConnection)(peer, this, $17252116aa2ef1fb$var$__assign($17252116aa2ef1fb$var$__assign({}, options), {
            _stream: stream
        }));
        this._addConnection(peer, mediaConnection);
        return mediaConnection;
    };
    /** Add a data/media connection to this peer. */ Peer.prototype._addConnection = function(peerId, connection) {
        (0, $96fb85a532fc3748$exports.default).log("add connection ".concat(connection.type, ":").concat(connection.connectionId, " to peerId:").concat(peerId));
        if (!this._connections.has(peerId)) this._connections.set(peerId, []);
        this._connections.get(peerId).push(connection);
    };
    //TODO should be private
    Peer.prototype._removeConnection = function(connection) {
        var connections = this._connections.get(connection.peer);
        if (connections) {
            var index = connections.indexOf(connection);
            if (index !== -1) connections.splice(index, 1);
        }
        //remove from lost messages
        this._lostMessages["delete"](connection.connectionId);
    };
    /** Retrieve a data/media connection for this peer. */ Peer.prototype.getConnection = function(peerId, connectionId) {
        var e_3, _a;
        var connections = this._connections.get(peerId);
        if (!connections) return null;
        try {
            for(var connections_1 = $17252116aa2ef1fb$var$__values(connections), connections_1_1 = connections_1.next(); !connections_1_1.done; connections_1_1 = connections_1.next()){
                var connection = connections_1_1.value;
                if (connection.connectionId === connectionId) return connection;
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (connections_1_1 && !connections_1_1.done && (_a = connections_1["return"])) _a.call(connections_1);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
        return null;
    };
    Peer.prototype._delayedAbort = function(type, message) {
        var _this = this;
        setTimeout(function() {
            _this._abort(type, message);
        }, 0);
    };
    /**
     * Emits an error message and destroys the Peer.
     * The Peer is not destroyed if it's in a disconnected state, in which case
     * it retains its disconnected state and its existing connections.
     */ Peer.prototype._abort = function(type, message) {
        (0, $96fb85a532fc3748$exports.default).error("Aborting!");
        this.emitError(type, message);
        if (!this._lastServerId) this.destroy();
        else this.disconnect();
    };
    /** Emits a typed error message. */ Peer.prototype.emitError = function(type, err) {
        (0, $96fb85a532fc3748$exports.default).error("Error:", err);
        var error;
        if (typeof err === "string") error = new Error(err);
        else error = err;
        error.type = type;
        this.emit("error", error);
    };
    /**
     * Destroys the Peer: closes all active connections as well as the connection
     *  to the server.
     * Warning: The peer can no longer create or accept connections after being
     *  destroyed.
     */ Peer.prototype.destroy = function() {
        if (this.destroyed) return;
        (0, $96fb85a532fc3748$exports.default).log("Destroy peer with ID:".concat(this.id));
        this.disconnect();
        this._cleanup();
        this._destroyed = true;
        this.emit("close");
    };
    /** Disconnects every connection on this peer. */ Peer.prototype._cleanup = function() {
        var e_4, _a;
        try {
            for(var _b = $17252116aa2ef1fb$var$__values(this._connections.keys()), _c = _b.next(); !_c.done; _c = _b.next()){
                var peerId = _c.value;
                this._cleanupPeer(peerId);
                this._connections["delete"](peerId);
            }
        } catch (e_4_1) {
            e_4 = {
                error: e_4_1
            };
        } finally{
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            } finally{
                if (e_4) throw e_4.error;
            }
        }
        this.socket.removeAllListeners();
    };
    /** Closes all connections to this peer. */ Peer.prototype._cleanupPeer = function(peerId) {
        var e_5, _a;
        var connections = this._connections.get(peerId);
        if (!connections) return;
        try {
            for(var connections_2 = $17252116aa2ef1fb$var$__values(connections), connections_2_1 = connections_2.next(); !connections_2_1.done; connections_2_1 = connections_2.next()){
                var connection = connections_2_1.value;
                connection.close();
            }
        } catch (e_5_1) {
            e_5 = {
                error: e_5_1
            };
        } finally{
            try {
                if (connections_2_1 && !connections_2_1.done && (_a = connections_2["return"])) _a.call(connections_2);
            } finally{
                if (e_5) throw e_5.error;
            }
        }
    };
    /**
     * Disconnects the Peer's connection to the PeerServer. Does not close any
     *  active connections.
     * Warning: The peer can no longer create or accept connections after being
     *  disconnected. It also cannot reconnect to the server.
     */ Peer.prototype.disconnect = function() {
        if (this.disconnected) return;
        var currentId = this.id;
        (0, $96fb85a532fc3748$exports.default).log("Disconnect peer with ID:".concat(currentId));
        this._disconnected = true;
        this._open = false;
        this.socket.close();
        this._lastServerId = currentId;
        this._id = null;
        this.emit("disconnected", currentId);
    };
    /** Attempts to reconnect with the same ID. */ Peer.prototype.reconnect = function() {
        if (this.disconnected && !this.destroyed) {
            (0, $96fb85a532fc3748$exports.default).log("Attempting reconnection to server with ID ".concat(this._lastServerId));
            this._disconnected = false;
            this._initialize(this._lastServerId);
        } else if (this.destroyed) throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
        else if (!this.disconnected && !this.open) // Do nothing. We're still connecting the first time.
        (0, $96fb85a532fc3748$exports.default).error("In a hurry? We're still trying to make the initial connection!");
        else throw new Error("Peer ".concat(this.id, " cannot reconnect because it is not disconnected from the server!"));
    };
    /**
     * Get a list of available peer IDs. If you're running your own server, you'll
     * want to set allow_discovery: true in the PeerServer options. If you're using
     * the cloud server, email team@peerjs.com to get the functionality enabled for
     * your key.
     */ Peer.prototype.listAllPeers = function(cb) {
        var _this = this;
        if (cb === void 0) cb = function cb(_) {};
        this._api.listAllPeers().then(function(peers) {
            return cb(peers);
        })["catch"](function(error) {
            return _this._abort((0, $8b9dc3e5f2ea4cc9$export$9547aaa2e39030ff).ServerError, error);
        });
    };
    Peer.DEFAULT_KEY = "peerjs";
    return Peer;
}((0, $b43bf3d87e5977ce$exports.EventEmitter));


window.peerjs = {
    Peer: (0, $17252116aa2ef1fb$exports.Peer),
    util: (0, $7dc43ad2ffa25036$exports.util)
};
/** @deprecated Should use peerjs namespace */ window.Peer = (0, $17252116aa2ef1fb$exports.Peer);

})();
//# sourceMappingURL=peerjs.js.map
