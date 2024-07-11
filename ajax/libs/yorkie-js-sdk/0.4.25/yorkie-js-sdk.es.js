var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var Code$1;
(function(Code2) {
  Code2[Code2["Canceled"] = 1] = "Canceled";
  Code2[Code2["Unknown"] = 2] = "Unknown";
  Code2[Code2["InvalidArgument"] = 3] = "InvalidArgument";
  Code2[Code2["DeadlineExceeded"] = 4] = "DeadlineExceeded";
  Code2[Code2["NotFound"] = 5] = "NotFound";
  Code2[Code2["AlreadyExists"] = 6] = "AlreadyExists";
  Code2[Code2["PermissionDenied"] = 7] = "PermissionDenied";
  Code2[Code2["ResourceExhausted"] = 8] = "ResourceExhausted";
  Code2[Code2["FailedPrecondition"] = 9] = "FailedPrecondition";
  Code2[Code2["Aborted"] = 10] = "Aborted";
  Code2[Code2["OutOfRange"] = 11] = "OutOfRange";
  Code2[Code2["Unimplemented"] = 12] = "Unimplemented";
  Code2[Code2["Internal"] = 13] = "Internal";
  Code2[Code2["Unavailable"] = 14] = "Unavailable";
  Code2[Code2["DataLoss"] = 15] = "DataLoss";
  Code2[Code2["Unauthenticated"] = 16] = "Unauthenticated";
})(Code$1 || (Code$1 = {}));
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg);
  }
}
const FLOAT32_MAX = 34028234663852886e22, FLOAT32_MIN = -34028234663852886e22, UINT32_MAX = 4294967295, INT32_MAX = 2147483647, INT32_MIN = -2147483648;
function assertInt32(arg) {
  if (typeof arg !== "number")
    throw new Error("invalid int 32: " + typeof arg);
  if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
    throw new Error("invalid int 32: " + arg);
}
function assertUInt32(arg) {
  if (typeof arg !== "number")
    throw new Error("invalid uint 32: " + typeof arg);
  if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
    throw new Error("invalid uint 32: " + arg);
}
function assertFloat32(arg) {
  if (typeof arg !== "number")
    throw new Error("invalid float 32: " + typeof arg);
  if (!Number.isFinite(arg))
    return;
  if (arg > FLOAT32_MAX || arg < FLOAT32_MIN)
    throw new Error("invalid float 32: " + arg);
}
const enumTypeSymbol = Symbol("@bufbuild/protobuf/enum-type");
function getEnumType(enumObject) {
  const t = enumObject[enumTypeSymbol];
  assert(t, "missing enum type on enum object");
  return t;
}
function setEnumType(enumObject, typeName, values, opt) {
  enumObject[enumTypeSymbol] = makeEnumType(typeName, values.map((v) => ({
    no: v.no,
    name: v.name,
    localName: enumObject[v.no]
  })));
}
function makeEnumType(typeName, values, _opt) {
  const names = /* @__PURE__ */ Object.create(null);
  const numbers = /* @__PURE__ */ Object.create(null);
  const normalValues = [];
  for (const value of values) {
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
    findName(name2) {
      return names[name2];
    },
    findNumber(no) {
      return numbers[no];
    }
  };
}
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
  return Object.assign(Object.assign({}, value), { localName: value.name });
}
class Message {
  /**
   * Compare with a message of the same type.
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
    const type = this.getType(), format = type.runtime.bin, opt = format.makeReadOptions(options);
    format.readMessage(this, opt.readerFactory(bytes), bytes.byteLength, opt);
    return this;
  }
  /**
   * Parse a message from a JSON value.
   */
  fromJson(jsonValue, options) {
    const type = this.getType(), format = type.runtime.json, opt = format.makeReadOptions(options);
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
      throw new Error(`cannot decode ${this.getType().typeName} from JSON: ${e instanceof Error ? e.message : String(e)}`);
    }
    return this.fromJson(json, options);
  }
  /**
   * Serialize the message to binary data.
   */
  toBinary(options) {
    const type = this.getType(), bin = type.runtime.bin, opt = bin.makeWriteOptions(options), writer = opt.writerFactory();
    bin.writeMessage(this, writer, opt);
    return writer.finish();
  }
  /**
   * Serialize the message to a JSON value, a JavaScript value that can be
   * passed to JSON.stringify().
   */
  toJson(options) {
    const type = this.getType(), json = type.runtime.json, opt = json.makeWriteOptions(options);
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
    return Object.getPrototypeOf(this).constructor;
  }
}
function makeMessageType(runtime, typeName, fields, opt) {
  var _a;
  const localName = (_a = opt === null || opt === void 0 ? void 0 : opt.localName) !== null && _a !== void 0 ? _a : typeName.substring(typeName.lastIndexOf(".") + 1);
  const type = {
    [localName]: function(data) {
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
function makeProtoRuntime(syntax, json, bin, util) {
  return {
    syntax,
    json,
    bin,
    util,
    makeMessageType(typeName, fields, opt) {
      return makeMessageType(this, typeName, fields, opt);
    },
    makeEnum,
    makeEnumType,
    getEnumType
  };
}
var ScalarType;
(function(ScalarType2) {
  ScalarType2[ScalarType2["DOUBLE"] = 1] = "DOUBLE";
  ScalarType2[ScalarType2["FLOAT"] = 2] = "FLOAT";
  ScalarType2[ScalarType2["INT64"] = 3] = "INT64";
  ScalarType2[ScalarType2["UINT64"] = 4] = "UINT64";
  ScalarType2[ScalarType2["INT32"] = 5] = "INT32";
  ScalarType2[ScalarType2["FIXED64"] = 6] = "FIXED64";
  ScalarType2[ScalarType2["FIXED32"] = 7] = "FIXED32";
  ScalarType2[ScalarType2["BOOL"] = 8] = "BOOL";
  ScalarType2[ScalarType2["STRING"] = 9] = "STRING";
  ScalarType2[ScalarType2["BYTES"] = 12] = "BYTES";
  ScalarType2[ScalarType2["UINT32"] = 13] = "UINT32";
  ScalarType2[ScalarType2["SFIXED32"] = 15] = "SFIXED32";
  ScalarType2[ScalarType2["SFIXED64"] = 16] = "SFIXED64";
  ScalarType2[ScalarType2["SINT32"] = 17] = "SINT32";
  ScalarType2[ScalarType2["SINT64"] = 18] = "SINT64";
})(ScalarType || (ScalarType = {}));
var LongType;
(function(LongType2) {
  LongType2[LongType2["BIGINT"] = 0] = "BIGINT";
  LongType2[LongType2["STRING"] = 1] = "STRING";
})(LongType || (LongType = {}));
function varint64read() {
  let lowBits = 0;
  let highBits = 0;
  for (let shift = 0; shift < 28; shift += 7) {
    let b = this.buf[this.pos++];
    lowBits |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  let middleByte = this.buf[this.pos++];
  lowBits |= (middleByte & 15) << 28;
  highBits = (middleByte & 112) >> 4;
  if ((middleByte & 128) == 0) {
    this.assertBounds();
    return [lowBits, highBits];
  }
  for (let shift = 3; shift <= 31; shift += 7) {
    let b = this.buf[this.pos++];
    highBits |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  throw new Error("invalid varint");
}
function varint64write(lo, hi, bytes) {
  for (let i = 0; i < 28; i = i + 7) {
    const shift = lo >>> i;
    const hasNext = !(shift >>> 7 == 0 && hi == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  const splitBits = lo >>> 28 & 15 | (hi & 7) << 4;
  const hasMoreBits = !(hi >> 3 == 0);
  bytes.push((hasMoreBits ? splitBits | 128 : splitBits) & 255);
  if (!hasMoreBits) {
    return;
  }
  for (let i = 3; i < 31; i = i + 7) {
    const shift = hi >>> i;
    const hasNext = !(shift >>> 7 == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  bytes.push(hi >>> 31 & 1);
}
const TWO_PWR_32_DBL$1 = 4294967296;
function int64FromString(dec) {
  const minus = dec[0] === "-";
  if (minus) {
    dec = dec.slice(1);
  }
  const base = 1e6;
  let lowBits = 0;
  let highBits = 0;
  function add1e6digit(begin, end) {
    const digit1e6 = Number(dec.slice(begin, end));
    highBits *= base;
    lowBits = lowBits * base + digit1e6;
    if (lowBits >= TWO_PWR_32_DBL$1) {
      highBits = highBits + (lowBits / TWO_PWR_32_DBL$1 | 0);
      lowBits = lowBits % TWO_PWR_32_DBL$1;
    }
  }
  add1e6digit(-24, -18);
  add1e6digit(-18, -12);
  add1e6digit(-12, -6);
  add1e6digit(-6);
  return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
}
function int64ToString(lo, hi) {
  let bits = newBits(lo, hi);
  const negative = bits.hi & 2147483648;
  if (negative) {
    bits = negate(bits.lo, bits.hi);
  }
  const result = uInt64ToString(bits.lo, bits.hi);
  return negative ? "-" + result : result;
}
function uInt64ToString(lo, hi) {
  ({ lo, hi } = toUnsigned(lo, hi));
  if (hi <= 2097151) {
    return String(TWO_PWR_32_DBL$1 * hi + lo);
  }
  const low = lo & 16777215;
  const mid = (lo >>> 24 | hi << 8) & 16777215;
  const high = hi >> 16 & 65535;
  let digitA = low + mid * 6777216 + high * 6710656;
  let digitB = mid + high * 8147497;
  let digitC = high * 2;
  const base = 1e7;
  if (digitA >= base) {
    digitB += Math.floor(digitA / base);
    digitA %= base;
  }
  if (digitB >= base) {
    digitC += Math.floor(digitB / base);
    digitB %= base;
  }
  return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
}
function toUnsigned(lo, hi) {
  return { lo: lo >>> 0, hi: hi >>> 0 };
}
function newBits(lo, hi) {
  return { lo: lo | 0, hi: hi | 0 };
}
function negate(lowBits, highBits) {
  highBits = ~highBits;
  if (lowBits) {
    lowBits = ~lowBits + 1;
  } else {
    highBits += 1;
  }
  return newBits(lowBits, highBits);
}
const decimalFrom1e7WithLeadingZeros = (digit1e7) => {
  const partial = String(digit1e7);
  return "0000000".slice(partial.length) + partial;
};
function varint32write(value, bytes) {
  if (value >= 0) {
    while (value > 127) {
      bytes.push(value & 127 | 128);
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
function varint32read() {
  let b = this.buf[this.pos++];
  let result = b & 127;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 7;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 14;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 21;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 15) << 28;
  for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++)
    b = this.buf[this.pos++];
  if ((b & 128) != 0)
    throw new Error("invalid varint");
  this.assertBounds();
  return result >>> 0;
}
function makeInt64Support() {
  const dv = new DataView(new ArrayBuffer(8));
  const ok = typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1");
  if (ok) {
    const MIN = BigInt("-9223372036854775808"), MAX = BigInt("9223372036854775807"), UMIN = BigInt("0"), UMAX = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: true,
      parse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > MAX || bi < MIN) {
          throw new Error(`int64 invalid: ${value}`);
        }
        return bi;
      },
      uParse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > UMAX || bi < UMIN) {
          throw new Error(`uint64 invalid: ${value}`);
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
  const assertInt64String = (value) => assert(/^-?[0-9]+$/.test(value), `int64 invalid: ${value}`);
  const assertUInt64String = (value) => assert(/^[0-9]+$/.test(value), `uint64 invalid: ${value}`);
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
var WireType;
(function(WireType2) {
  WireType2[WireType2["Varint"] = 0] = "Varint";
  WireType2[WireType2["Bit64"] = 1] = "Bit64";
  WireType2[WireType2["LengthDelimited"] = 2] = "LengthDelimited";
  WireType2[WireType2["StartGroup"] = 3] = "StartGroup";
  WireType2[WireType2["EndGroup"] = 4] = "EndGroup";
  WireType2[WireType2["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));
class BinaryWriter {
  constructor(textEncoder) {
    this.stack = [];
    this.textEncoder = textEncoder !== null && textEncoder !== void 0 ? textEncoder : new TextEncoder();
    this.chunks = [];
    this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.chunks.push(new Uint8Array(this.buf));
    let len = 0;
    for (let i = 0; i < this.chunks.length; i++)
      len += this.chunks[i].length;
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
    this.stack.push({ chunks: this.chunks, buf: this.buf });
    this.chunks = [];
    this.buf = [];
    return this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    let chunk = this.finish();
    let prev = this.stack.pop();
    if (!prev)
      throw new Error("invalid state, fork stack empty");
    this.chunks = prev.chunks;
    this.buf = prev.buf;
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
    while (value > 127) {
      this.buf.push(value & 127 | 128);
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
    this.uint32(value.byteLength);
    return this.raw(value);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value) {
    let chunk = this.textEncoder.encode(value);
    this.uint32(chunk.byteLength);
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
    value = (value << 1 ^ value >> 31) >>> 0;
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.enc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.uEnc(value);
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
    let tc = protoInt64.enc(value), sign = tc.hi >> 31, lo = tc.lo << 1 ^ sign, hi = (tc.hi << 1 | tc.lo >>> 31) ^ sign;
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
    this.varint64 = varint64read;
    this.uint32 = varint32read;
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
    let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
    if (fieldNo <= 0 || wireType < 0 || wireType > 5)
      throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
    return [fieldNo, wireType];
  }
  /**
   * Skip one element on the wire and return the skipped data.
   * Supports WireType.StartGroup since v2.0.0-alpha.23.
   */
  skip(wireType) {
    let start = this.pos;
    switch (wireType) {
      case WireType.Varint:
        while (this.buf[this.pos++] & 128) {
        }
        break;
      case WireType.Bit64:
        this.pos += 4;
      case WireType.Bit32:
        this.pos += 4;
        break;
      case WireType.LengthDelimited:
        let len = this.uint32();
        this.pos += len;
        break;
      case WireType.StartGroup:
        let t;
        while ((t = this.tag()[1]) !== WireType.EndGroup) {
          this.skip(t);
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
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
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
    let len = this.uint32(), start = this.pos;
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
function wrapField(type, value) {
  if (value instanceof Message || !type.fieldWrapper) {
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
function scalarEquals(type, a, b) {
  if (a === b) {
    return true;
  }
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
  switch (type) {
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return a == b;
  }
  return false;
}
function scalarDefaultValue(type, longType) {
  switch (type) {
    case ScalarType.BOOL:
      return false;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return longType == 0 ? protoInt64.zero : "0";
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return 0;
    case ScalarType.BYTES:
      return new Uint8Array(0);
    case ScalarType.STRING:
      return "";
    default:
      return 0;
  }
}
function scalarTypeInfo(type, value) {
  const isUndefined = value === void 0;
  let wireType = WireType.Varint;
  let isIntrinsicDefault = value === 0;
  switch (type) {
    case ScalarType.STRING:
      isIntrinsicDefault = isUndefined || !value.length;
      wireType = WireType.LengthDelimited;
      break;
    case ScalarType.BOOL:
      isIntrinsicDefault = value === false;
      break;
    case ScalarType.DOUBLE:
      wireType = WireType.Bit64;
      break;
    case ScalarType.FLOAT:
      wireType = WireType.Bit32;
      break;
    case ScalarType.INT64:
      isIntrinsicDefault = isUndefined || value == 0;
      break;
    case ScalarType.UINT64:
      isIntrinsicDefault = isUndefined || value == 0;
      break;
    case ScalarType.FIXED64:
      isIntrinsicDefault = isUndefined || value == 0;
      wireType = WireType.Bit64;
      break;
    case ScalarType.BYTES:
      isIntrinsicDefault = isUndefined || !value.byteLength;
      wireType = WireType.LengthDelimited;
      break;
    case ScalarType.FIXED32:
      wireType = WireType.Bit32;
      break;
    case ScalarType.SFIXED32:
      wireType = WireType.Bit32;
      break;
    case ScalarType.SFIXED64:
      isIntrinsicDefault = isUndefined || value == 0;
      wireType = WireType.Bit64;
      break;
    case ScalarType.SINT64:
      isIntrinsicDefault = isUndefined || value == 0;
      break;
  }
  const method = ScalarType[type].toLowerCase();
  return [wireType, method, isUndefined || isIntrinsicDefault];
}
const unknownFieldsSymbol = Symbol("@bufbuild/protobuf/unknown-fields");
const readDefaults = {
  readUnknownFields: true,
  readerFactory: (bytes) => new BinaryReader(bytes)
};
const writeDefaults = {
  writeUnknownFields: true,
  writerFactory: () => new BinaryWriter()
};
function makeReadOptions$1(options) {
  return options ? Object.assign(Object.assign({}, readDefaults), options) : readDefaults;
}
function makeWriteOptions$1(options) {
  return options ? Object.assign(Object.assign({}, writeDefaults), options) : writeDefaults;
}
function makeBinaryFormatCommon() {
  return {
    makeReadOptions: makeReadOptions$1,
    makeWriteOptions: makeWriteOptions$1,
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
      m[unknownFieldsSymbol].push({ no, wireType, data });
    },
    readMessage(message, reader, lengthOrEndTagFieldNo, options, delimitedMessageEncoding) {
      const type = message.getType();
      const end = delimitedMessageEncoding ? reader.len : reader.pos + lengthOrEndTagFieldNo;
      let fieldNo, wireType;
      while (reader.pos < end) {
        [fieldNo, wireType] = reader.tag();
        if (wireType == WireType.EndGroup) {
          break;
        }
        const field = type.fields.find(fieldNo);
        if (!field) {
          const data = reader.skip(wireType);
          if (options.readUnknownFields) {
            this.onUnknownField(message, fieldNo, wireType, data);
          }
          continue;
        }
        let target = message, repeated = field.repeated, localName = field.localName;
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
            let read = readScalar$1;
            if (field.kind == "scalar" && field.L > 0) {
              read = readScalarLTString;
            }
            if (repeated) {
              let arr = target[localName];
              if (wireType == WireType.LengthDelimited && scalarType != ScalarType.STRING && scalarType != ScalarType.BYTES) {
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
              target[localName].push(readMessageField(reader, new messageType(), options, field));
            } else {
              if (target[localName] instanceof Message) {
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
            target[localName][mapKey] = mapVal;
            break;
        }
      }
      if (delimitedMessageEncoding && // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      (wireType != WireType.EndGroup || fieldNo !== lengthOrEndTagFieldNo)) {
        throw new Error(`invalid end group tag`);
      }
    }
  };
}
function readMessageField(reader, message, options, field) {
  const format = message.getType().runtime.bin;
  const delimited = field === null || field === void 0 ? void 0 : field.delimited;
  format.readMessage(
    message,
    reader,
    delimited ? field === null || field === void 0 ? void 0 : field.no : reader.uint32(),
    // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    options,
    delimited
  );
  return message;
}
function readMapEntry(field, reader, options) {
  const length = reader.uint32(), end = reader.pos + length;
  let key, val;
  while (reader.pos < end) {
    let [fieldNo] = reader.tag();
    switch (fieldNo) {
      case 1:
        key = readScalar$1(reader, field.K);
        break;
      case 2:
        switch (field.V.kind) {
          case "scalar":
            val = readScalar$1(reader, field.V.T);
            break;
          case "enum":
            val = reader.int32();
            break;
          case "message":
            val = readMessageField(reader, new field.V.T(), options, void 0);
            break;
        }
        break;
    }
  }
  if (key === void 0) {
    let keyRaw = scalarDefaultValue(field.K, LongType.BIGINT);
    key = field.K == ScalarType.BOOL ? keyRaw.toString() : keyRaw;
  }
  if (typeof key != "string" && typeof key != "number") {
    key = key.toString();
  }
  if (val === void 0) {
    switch (field.V.kind) {
      case "scalar":
        val = scalarDefaultValue(field.V.T, LongType.BIGINT);
        break;
      case "enum":
        val = 0;
        break;
      case "message":
        val = new field.V.T();
        break;
    }
  }
  return [key, val];
}
function readScalarLTString(reader, type) {
  const v = readScalar$1(reader, type);
  return typeof v == "bigint" ? v.toString() : v;
}
function readScalar$1(reader, type) {
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
function writeMapEntry(writer, options, field, key, value) {
  writer.tag(field.no, WireType.LengthDelimited);
  writer.fork();
  let keyValue = key;
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
  writeScalar$1(writer, field.K, 1, keyValue, true);
  switch (field.V.kind) {
    case "scalar":
      writeScalar$1(writer, field.V.T, 2, value, true);
      break;
    case "enum":
      writeScalar$1(writer, ScalarType.INT32, 2, value, true);
      break;
    case "message":
      writer.tag(2, WireType.LengthDelimited).bytes(value.toBinary(options));
      break;
  }
  writer.join();
}
function writeMessageField(writer, options, field, value) {
  if (value !== void 0) {
    const message = wrapField(field.T, value);
    if (field === null || field === void 0 ? void 0 : field.delimited)
      writer.tag(field.no, WireType.StartGroup).raw(message.toBinary(options)).tag(field.no, WireType.EndGroup);
    else
      writer.tag(field.no, WireType.LengthDelimited).bytes(message.toBinary(options));
  }
}
function writeScalar$1(writer, type, fieldNo, value, emitIntrinsicDefault) {
  let [wireType, method, isIntrinsicDefault] = scalarTypeInfo(type, value);
  if (!isIntrinsicDefault || emitIntrinsicDefault) {
    writer.tag(fieldNo, wireType)[method](value);
  }
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
function makeBinaryFormatProto3() {
  return Object.assign(Object.assign({}, makeBinaryFormatCommon()), { writeMessage(message, writer, options) {
    const type = message.getType();
    for (const field of type.fields.byNumber()) {
      let value, repeated = field.repeated, localName = field.localName;
      if (field.oneof) {
        const oneof = message[field.oneof.localName];
        if (oneof.case !== localName) {
          continue;
        }
        value = oneof.value;
      } else {
        value = message[localName];
      }
      switch (field.kind) {
        case "scalar":
        case "enum":
          let scalarType = field.kind == "enum" ? ScalarType.INT32 : field.T;
          if (repeated) {
            if (field.packed) {
              writePacked(writer, scalarType, field.no, value);
            } else {
              for (const item of value) {
                writeScalar$1(writer, scalarType, field.no, item, true);
              }
            }
          } else {
            if (value !== void 0) {
              writeScalar$1(writer, scalarType, field.no, value, !!field.oneof || field.opt);
            }
          }
          break;
        case "message":
          if (repeated) {
            for (const item of value) {
              writeMessageField(writer, options, field, item);
            }
          } else {
            writeMessageField(writer, options, field, value);
          }
          break;
        case "map":
          for (const [key, val] of Object.entries(value)) {
            writeMapEntry(writer, options, field, key, val);
          }
          break;
      }
    }
    if (options.writeUnknownFields) {
      this.writeUnknownFields(message, writer);
    }
    return writer;
  } });
}
let encTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
let decTable = [];
for (let i = 0; i < encTable.length; i++)
  decTable[encTable[i].charCodeAt(0)] = i;
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
    let es = base64Str.length * 3 / 4;
    if (base64Str[base64Str.length - 2] == "=")
      es -= 2;
    else if (base64Str[base64Str.length - 1] == "=")
      es -= 1;
    let bytes = new Uint8Array(es), bytePos = 0, groupPos = 0, b, p = 0;
    for (let i = 0; i < base64Str.length; i++) {
      b = decTable[base64Str.charCodeAt(i)];
      if (b === void 0) {
        switch (base64Str[i]) {
          case "=":
            groupPos = 0;
          case "\n":
          case "\r":
          case "	":
          case " ":
            continue;
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
    if (groupPos == 1)
      throw Error("invalid base64 string.");
    return bytes.subarray(0, bytePos);
  },
  /**
   * Encode a byte array to a base64 string.
   */
  enc(bytes) {
    let base64 = "", groupPos = 0, b, p = 0;
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
    if (groupPos) {
      base64 += encTable[p];
      base64 += "=";
      if (groupPos == 1)
        base64 += "=";
    }
    return base64;
  }
};
const jsonReadDefaults = {
  ignoreUnknownFields: false
};
const jsonWriteDefaults = {
  emitDefaultValues: false,
  enumAsInteger: false,
  useProtoFieldName: false,
  prettySpaces: 0
};
function makeReadOptions(options) {
  return options ? Object.assign(Object.assign({}, jsonReadDefaults), options) : jsonReadDefaults;
}
function makeWriteOptions(options) {
  return options ? Object.assign(Object.assign({}, jsonWriteDefaults), options) : jsonWriteDefaults;
}
function makeJsonFormatCommon(makeWriteField) {
  const writeField = makeWriteField(writeEnum, writeScalar);
  return {
    makeReadOptions,
    makeWriteOptions,
    readMessage(type, json, options, message) {
      if (json == null || Array.isArray(json) || typeof json != "object") {
        throw new Error(`cannot decode message ${type.typeName} from JSON: ${this.debug(json)}`);
      }
      message = message !== null && message !== void 0 ? message : new type();
      const oneofSeen = {};
      for (const [jsonKey, jsonValue] of Object.entries(json)) {
        const field = type.fields.findJsonName(jsonKey);
        if (!field) {
          if (!options.ignoreUnknownFields) {
            throw new Error(`cannot decode message ${type.typeName} from JSON: key "${jsonKey}" is unknown`);
          }
          continue;
        }
        let localName = field.localName;
        let target = message;
        if (field.oneof) {
          if (jsonValue === null && field.kind == "scalar") {
            continue;
          }
          const seen = oneofSeen[field.oneof.localName];
          if (seen) {
            throw new Error(`cannot decode message ${type.typeName} from JSON: multiple keys for oneof "${field.oneof.name}" present: "${seen}", "${jsonKey}"`);
          }
          oneofSeen[field.oneof.localName] = jsonKey;
          target = target[field.oneof.localName] = { case: localName };
          localName = "value";
        }
        if (field.repeated) {
          if (jsonValue === null) {
            continue;
          }
          if (!Array.isArray(jsonValue)) {
            throw new Error(`cannot decode field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonValue)}`);
          }
          const targetArray = target[localName];
          for (const jsonItem of jsonValue) {
            if (jsonItem === null) {
              throw new Error(`cannot decode field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonItem)}`);
            }
            let val;
            switch (field.kind) {
              case "message":
                val = field.T.fromJson(jsonItem, options);
                break;
              case "enum":
                val = readEnum(field.T, jsonItem, options.ignoreUnknownFields);
                if (val === void 0)
                  continue;
                break;
              case "scalar":
                try {
                  val = readScalar(field.T, jsonItem, field.L);
                } catch (e) {
                  let m = `cannot decode field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonItem)}`;
                  if (e instanceof Error && e.message.length > 0) {
                    m += `: ${e.message}`;
                  }
                  throw new Error(m);
                }
                break;
            }
            targetArray.push(val);
          }
        } else if (field.kind == "map") {
          if (jsonValue === null) {
            continue;
          }
          if (Array.isArray(jsonValue) || typeof jsonValue != "object") {
            throw new Error(`cannot decode field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonValue)}`);
          }
          const targetMap = target[localName];
          for (const [jsonMapKey, jsonMapValue] of Object.entries(jsonValue)) {
            if (jsonMapValue === null) {
              throw new Error(`cannot decode field ${type.typeName}.${field.name} from JSON: map value null`);
            }
            let val;
            switch (field.V.kind) {
              case "message":
                val = field.V.T.fromJson(jsonMapValue, options);
                break;
              case "enum":
                val = readEnum(field.V.T, jsonMapValue, options.ignoreUnknownFields);
                if (val === void 0)
                  continue;
                break;
              case "scalar":
                try {
                  val = readScalar(field.V.T, jsonMapValue, LongType.BIGINT);
                } catch (e) {
                  let m = `cannot decode map value for field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonValue)}`;
                  if (e instanceof Error && e.message.length > 0) {
                    m += `: ${e.message}`;
                  }
                  throw new Error(m);
                }
                break;
            }
            try {
              targetMap[readScalar(field.K, field.K == ScalarType.BOOL ? jsonMapKey == "true" ? true : jsonMapKey == "false" ? false : jsonMapKey : jsonMapKey, LongType.BIGINT).toString()] = val;
            } catch (e) {
              let m = `cannot decode map key for field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonValue)}`;
              if (e instanceof Error && e.message.length > 0) {
                m += `: ${e.message}`;
              }
              throw new Error(m);
            }
          }
        } else {
          switch (field.kind) {
            case "message":
              const messageType = field.T;
              if (jsonValue === null && messageType.typeName != "google.protobuf.Value") {
                if (field.oneof) {
                  throw new Error(`cannot decode field ${type.typeName}.${field.name} from JSON: null is invalid for oneof field "${jsonKey}"`);
                }
                continue;
              }
              if (target[localName] instanceof Message) {
                target[localName].fromJson(jsonValue, options);
              } else {
                target[localName] = messageType.fromJson(jsonValue, options);
                if (messageType.fieldWrapper && !field.oneof) {
                  target[localName] = messageType.fieldWrapper.unwrapField(target[localName]);
                }
              }
              break;
            case "enum":
              const enumValue = readEnum(field.T, jsonValue, options.ignoreUnknownFields);
              if (enumValue !== void 0) {
                target[localName] = enumValue;
              }
              break;
            case "scalar":
              try {
                target[localName] = readScalar(field.T, jsonValue, field.L);
              } catch (e) {
                let m = `cannot decode field ${type.typeName}.${field.name} from JSON: ${this.debug(jsonValue)}`;
                if (e instanceof Error && e.message.length > 0) {
                  m += `: ${e.message}`;
                }
                throw new Error(m);
              }
              break;
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
        for (const member of type.fields.byMember()) {
          let jsonValue;
          if (member.kind == "oneof") {
            const oneof = message[member.localName];
            if (oneof.value === void 0) {
              continue;
            }
            field = member.findField(oneof.case);
            if (!field) {
              throw "oneof case not found: " + oneof.case;
            }
            jsonValue = writeField(field, oneof.value, options);
          } else {
            field = member;
            jsonValue = writeField(field, message[field.localName], options);
          }
          if (jsonValue !== void 0) {
            json[options.useProtoFieldName ? field.name : field.jsonName] = jsonValue;
          }
        }
      } catch (e) {
        const m = field ? `cannot encode field ${type.typeName}.${field.name} to JSON` : `cannot encode message ${type.typeName} to JSON`;
        const r = e instanceof Error ? e.message : String(e);
        throw new Error(m + (r.length > 0 ? `: ${r}` : ""));
      }
      return json;
    },
    readScalar,
    writeScalar,
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
      return json.length > 100 ? "string" : `"${json.split('"').join('\\"')}"`;
    default:
      return String(json);
  }
}
function readScalar(type, json, longType) {
  switch (type) {
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      if (json === null)
        return 0;
      if (json === "NaN")
        return Number.NaN;
      if (json === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (json === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (json === "") {
        break;
      }
      if (typeof json == "string" && json.trim().length !== json.length) {
        break;
      }
      if (typeof json != "string" && typeof json != "number") {
        break;
      }
      const float = Number(json);
      if (Number.isNaN(float)) {
        break;
      }
      if (!Number.isFinite(float)) {
        break;
      }
      if (type == ScalarType.FLOAT)
        assertFloat32(float);
      return float;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.UINT32:
      if (json === null)
        return 0;
      let int32;
      if (typeof json == "number")
        int32 = json;
      else if (typeof json == "string" && json.length > 0) {
        if (json.trim().length === json.length)
          int32 = Number(json);
      }
      if (int32 === void 0)
        break;
      if (type == ScalarType.UINT32)
        assertUInt32(int32);
      else
        assertInt32(int32);
      return int32;
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (json === null)
        return protoInt64.zero;
      if (typeof json != "number" && typeof json != "string")
        break;
      const long = protoInt64.parse(json);
      return longType ? long.toString() : long;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if (json === null)
        return protoInt64.zero;
      if (typeof json != "number" && typeof json != "string")
        break;
      const uLong = protoInt64.uParse(json);
      return longType ? uLong.toString() : uLong;
    case ScalarType.BOOL:
      if (json === null)
        return false;
      if (typeof json !== "boolean")
        break;
      return json;
    case ScalarType.STRING:
      if (json === null)
        return "";
      if (typeof json !== "string") {
        break;
      }
      try {
        encodeURIComponent(json);
      } catch (e) {
        throw new Error("invalid UTF8");
      }
      return json;
    case ScalarType.BYTES:
      if (json === null || json === "")
        return new Uint8Array(0);
      if (typeof json !== "string")
        break;
      return protoBase64.dec(json);
  }
  throw new Error();
}
function readEnum(type, json, ignoreUnknownFields) {
  if (json === null) {
    return 0;
  }
  switch (typeof json) {
    case "number":
      if (Number.isInteger(json)) {
        return json;
      }
      break;
    case "string":
      const value = type.findName(json);
      if (value || ignoreUnknownFields) {
        return value === null || value === void 0 ? void 0 : value.no;
      }
      break;
  }
  throw new Error(`cannot decode enum ${type.typeName} from JSON: ${debugJsonValue(json)}`);
}
function writeEnum(type, value, emitIntrinsicDefault, enumAsInteger) {
  var _a;
  if (value === void 0) {
    return value;
  }
  if (value === 0 && !emitIntrinsicDefault) {
    return void 0;
  }
  if (enumAsInteger) {
    return value;
  }
  if (type.typeName == "google.protobuf.NullValue") {
    return null;
  }
  const val = type.findNumber(value);
  return (_a = val === null || val === void 0 ? void 0 : val.name) !== null && _a !== void 0 ? _a : value;
}
function writeScalar(type, value, emitIntrinsicDefault) {
  if (value === void 0) {
    return void 0;
  }
  switch (type) {
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      assert(typeof value == "number");
      return value != 0 || emitIntrinsicDefault ? value : void 0;
    case ScalarType.FLOAT:
    case ScalarType.DOUBLE:
      assert(typeof value == "number");
      if (Number.isNaN(value))
        return "NaN";
      if (value === Number.POSITIVE_INFINITY)
        return "Infinity";
      if (value === Number.NEGATIVE_INFINITY)
        return "-Infinity";
      return value !== 0 || emitIntrinsicDefault ? value : void 0;
    case ScalarType.STRING:
      assert(typeof value == "string");
      return value.length > 0 || emitIntrinsicDefault ? value : void 0;
    case ScalarType.BOOL:
      assert(typeof value == "boolean");
      return value || emitIntrinsicDefault ? value : void 0;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      assert(typeof value == "bigint" || typeof value == "string" || typeof value == "number");
      return emitIntrinsicDefault || value != 0 ? value.toString(10) : void 0;
    case ScalarType.BYTES:
      assert(value instanceof Uint8Array);
      return emitIntrinsicDefault || value.byteLength > 0 ? protoBase64.enc(value) : void 0;
  }
}
function makeJsonFormatProto3() {
  return makeJsonFormatCommon((writeEnum2, writeScalar2) => {
    return function writeField(field, value, options) {
      if (field.kind == "map") {
        const jsonObj = {};
        switch (field.V.kind) {
          case "scalar":
            for (const [entryKey, entryValue] of Object.entries(value)) {
              const val = writeScalar2(field.V.T, entryValue, true);
              assert(val !== void 0);
              jsonObj[entryKey.toString()] = val;
            }
            break;
          case "message":
            for (const [entryKey, entryValue] of Object.entries(value)) {
              jsonObj[entryKey.toString()] = entryValue.toJson(options);
            }
            break;
          case "enum":
            const enumType = field.V.T;
            for (const [entryKey, entryValue] of Object.entries(value)) {
              assert(entryValue === void 0 || typeof entryValue == "number");
              const val = writeEnum2(enumType, entryValue, true, options.enumAsInteger);
              assert(val !== void 0);
              jsonObj[entryKey.toString()] = val;
            }
            break;
        }
        return options.emitDefaultValues || Object.keys(jsonObj).length > 0 ? jsonObj : void 0;
      } else if (field.repeated) {
        const jsonArr = [];
        switch (field.kind) {
          case "scalar":
            for (let i = 0; i < value.length; i++) {
              jsonArr.push(writeScalar2(field.T, value[i], true));
            }
            break;
          case "enum":
            for (let i = 0; i < value.length; i++) {
              jsonArr.push(writeEnum2(field.T, value[i], true, options.enumAsInteger));
            }
            break;
          case "message":
            for (let i = 0; i < value.length; i++) {
              jsonArr.push(wrapField(field.T, value[i]).toJson(options));
            }
            break;
        }
        return options.emitDefaultValues || jsonArr.length > 0 ? jsonArr : void 0;
      } else {
        switch (field.kind) {
          case "scalar":
            return writeScalar2(field.T, value, !!field.oneof || field.opt || options.emitDefaultValues);
          case "enum":
            return writeEnum2(field.T, value, !!field.oneof || field.opt || options.emitDefaultValues, options.enumAsInteger);
          case "message":
            return value !== void 0 ? wrapField(field.T, value).toJson(options) : void 0;
        }
      }
    };
  });
}
function makeUtilCommon() {
  return {
    setEnumType,
    initPartial(source, target) {
      if (source === void 0) {
        return;
      }
      const type = target.getType();
      for (const member of type.fields.byMember()) {
        const localName = member.localName, t = target, s = source;
        if (s[localName] === void 0) {
          continue;
        }
        switch (member.kind) {
          case "oneof":
            const sk = s[localName].case;
            if (sk === void 0) {
              continue;
            }
            const sourceField = member.findField(sk);
            let val = s[localName].value;
            if (sourceField && sourceField.kind == "message" && !(val instanceof sourceField.T)) {
              val = new sourceField.T(val);
            } else if (sourceField && sourceField.kind === "scalar" && sourceField.T === ScalarType.BYTES) {
              val = toU8Arr(val);
            }
            t[localName] = { case: sk, value: val };
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
                  let val2 = s[localName][k];
                  if (!messageType.fieldWrapper) {
                    val2 = new messageType(val2);
                  }
                  t[localName][k] = val2;
                }
                break;
            }
            break;
          case "message":
            const mt = member.T;
            if (member.repeated) {
              t[localName] = s[localName].map((val2) => val2 instanceof mt ? val2 : new mt(val2));
            } else if (s[localName] !== void 0) {
              const val2 = s[localName];
              if (mt.fieldWrapper) {
                if (
                  // We can't use BytesValue.typeName as that will create a circular import
                  mt.typeName === "google.protobuf.BytesValue"
                ) {
                  t[localName] = toU8Arr(val2);
                } else {
                  t[localName] = val2;
                }
              } else {
                t[localName] = val2 instanceof mt ? val2 : new mt(val2);
              }
            }
            break;
        }
      }
    },
    equals(type, a, b) {
      if (a === b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      return type.fields.byMember().every((m) => {
        const va = a[m.localName];
        const vb = b[m.localName];
        if (m.repeated) {
          if (va.length !== vb.length) {
            return false;
          }
          switch (m.kind) {
            case "message":
              return va.every((a2, i) => m.T.equals(a2, vb[i]));
            case "scalar":
              return va.every((a2, i) => scalarEquals(m.T, a2, vb[i]));
            case "enum":
              return va.every((a2, i) => scalarEquals(ScalarType.INT32, a2, vb[i]));
          }
          throw new Error(`repeated cannot contain ${m.kind}`);
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
            if (s === void 0) {
              return true;
            }
            switch (s.kind) {
              case "message":
                return s.T.equals(va.value, vb.value);
              case "enum":
                return scalarEquals(ScalarType.INT32, va.value, vb.value);
              case "scalar":
                return scalarEquals(s.T, va.value, vb.value);
            }
            throw new Error(`oneof cannot contain ${s.kind}`);
          case "map":
            const keys = Object.keys(va).concat(Object.keys(vb));
            switch (m.V.kind) {
              case "message":
                const messageType = m.V.T;
                return keys.every((k) => messageType.equals(va[k], vb[k]));
              case "enum":
                return keys.every((k) => scalarEquals(ScalarType.INT32, va[k], vb[k]));
              case "scalar":
                const scalarType = m.V.T;
                return keys.every((k) => scalarEquals(scalarType, va[k], vb[k]));
            }
            break;
        }
      });
    },
    clone(message) {
      const type = message.getType(), target = new type(), any = target;
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
          copy = f ? { case: source.case, value: cloneSingularField(source.value) } : { case: void 0 };
        } else {
          copy = cloneSingularField(source);
        }
        any[member.localName] = copy;
      }
      return target;
    }
  };
}
function cloneSingularField(value) {
  if (value === void 0) {
    return value;
  }
  if (value instanceof Message) {
    return value.clone();
  }
  if (value instanceof Uint8Array) {
    const c = new Uint8Array(value.byteLength);
    c.set(value);
    return c;
  }
  return value;
}
function toU8Arr(input) {
  return input instanceof Uint8Array ? input : new Uint8Array(input);
}
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
function localFieldName(protoName, inOneof) {
  const name2 = protoCamelCase(protoName);
  if (inOneof) {
    return name2;
  }
  return safeObjectProperty(safeMessageProperty(name2));
}
function localOneofName(protoName) {
  return localFieldName(protoName, false);
}
const fieldJsonName = protoCamelCase;
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
const reservedObjectProperties = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
const reservedMessageProperties = /* @__PURE__ */ new Set([
  // names reserved by the runtime
  "getType",
  "clone",
  "equals",
  "fromBinary",
  "fromJson",
  "fromJsonString",
  "toBinary",
  "toJson",
  "toJsonString",
  // names reserved by the runtime for the future
  "toObject"
]);
const fallback = (name2) => `${name2}$`;
const safeMessageProperty = (name2) => {
  if (reservedMessageProperties.has(name2)) {
    return fallback(name2);
  }
  return name2;
};
const safeObjectProperty = (name2) => {
  if (reservedObjectProperties.has(name2)) {
    return fallback(name2);
  }
  return name2;
};
class InternalOneofInfo {
  constructor(name2) {
    this.kind = "oneof";
    this.repeated = false;
    this.packed = false;
    this.opt = false;
    this.default = void 0;
    this.fields = [];
    this.name = name2;
    this.localName = localOneofName(name2);
  }
  addField(field) {
    assert(field.oneof === this, `field ${field.name} not one of ${this.name}`);
    this.fields.push(field);
  }
  findField(localName) {
    if (!this._lookup) {
      this._lookup = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < this.fields.length; i++) {
        this._lookup[this.fields[i].localName] = this.fields[i];
      }
    }
    return this._lookup[localName];
  }
}
const proto3 = makeProtoRuntime("proto3", makeJsonFormatProto3(), makeBinaryFormatProto3(), Object.assign(Object.assign({}, makeUtilCommon()), {
  newFieldList(fields) {
    return new InternalFieldList(fields, normalizeFieldInfosProto3);
  },
  initFields(target) {
    for (const member of target.getType().fields.byMember()) {
      if (member.opt) {
        continue;
      }
      const name2 = member.localName, t = target;
      if (member.repeated) {
        t[name2] = [];
        continue;
      }
      switch (member.kind) {
        case "oneof":
          t[name2] = { case: void 0 };
          break;
        case "enum":
          t[name2] = 0;
          break;
        case "map":
          t[name2] = {};
          break;
        case "scalar":
          t[name2] = scalarDefaultValue(member.T, member.L);
          break;
      }
    }
  }
}));
function normalizeFieldInfosProto3(fieldInfos) {
  var _a, _b, _c, _d;
  const r = [];
  let o;
  for (const field of typeof fieldInfos == "function" ? fieldInfos() : fieldInfos) {
    const f = field;
    f.localName = localFieldName(field.name, field.oneof !== void 0);
    f.jsonName = (_a = field.jsonName) !== null && _a !== void 0 ? _a : fieldJsonName(field.name);
    f.repeated = (_b = field.repeated) !== null && _b !== void 0 ? _b : false;
    if (field.kind == "scalar") {
      f.L = (_c = field.L) !== null && _c !== void 0 ? _c : LongType.BIGINT;
    }
    if (field.oneof !== void 0) {
      const ooname = typeof field.oneof == "string" ? field.oneof : field.oneof.name;
      if (!o || o.name != ooname) {
        o = new InternalOneofInfo(ooname);
      }
      f.oneof = o;
      o.addField(f);
    }
    if (field.kind == "message") {
      f.delimited = false;
    }
    f.packed = (_d = field.packed) !== null && _d !== void 0 ? _d : field.kind == "enum" || field.kind == "scalar" && field.T != ScalarType.BYTES && field.T != ScalarType.STRING;
    r.push(f);
  }
  return r;
}
var MethodKind;
(function(MethodKind2) {
  MethodKind2[MethodKind2["Unary"] = 0] = "Unary";
  MethodKind2[MethodKind2["ServerStreaming"] = 1] = "ServerStreaming";
  MethodKind2[MethodKind2["ClientStreaming"] = 2] = "ClientStreaming";
  MethodKind2[MethodKind2["BiDiStreaming"] = 3] = "BiDiStreaming";
})(MethodKind || (MethodKind = {}));
var MethodIdempotency;
(function(MethodIdempotency2) {
  MethodIdempotency2[MethodIdempotency2["NoSideEffects"] = 1] = "NoSideEffects";
  MethodIdempotency2[MethodIdempotency2["Idempotent"] = 2] = "Idempotent";
})(MethodIdempotency || (MethodIdempotency = {}));
class Timestamp extends Message {
  constructor(data) {
    super();
    this.seconds = protoInt64.zero;
    this.nanos = 0;
    proto3.util.initPartial(data, this);
  }
  fromJson(json, options) {
    if (typeof json !== "string") {
      throw new Error(`cannot decode google.protobuf.Timestamp from JSON: ${proto3.json.debug(json)}`);
    }
    const matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
    if (!matches) {
      throw new Error(`cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string`);
    }
    const ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));
    if (Number.isNaN(ms)) {
      throw new Error(`cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string`);
    }
    if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
      throw new Error(`cannot decode message google.protobuf.Timestamp from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
    }
    this.seconds = protoInt64.parse(ms / 1e3);
    this.nanos = 0;
    if (matches[7]) {
      this.nanos = parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1e9;
    }
    return this;
  }
  toJson(options) {
    const ms = Number(this.seconds) * 1e3;
    if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
      throw new Error(`cannot encode google.protobuf.Timestamp to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
    }
    if (this.nanos < 0) {
      throw new Error(`cannot encode google.protobuf.Timestamp to JSON: nanos must not be negative`);
    }
    let z = "Z";
    if (this.nanos > 0) {
      const nanosStr = (this.nanos + 1e9).toString().substring(1);
      if (nanosStr.substring(3) === "000000") {
        z = "." + nanosStr.substring(0, 3) + "Z";
      } else if (nanosStr.substring(6) === "000") {
        z = "." + nanosStr.substring(0, 6) + "Z";
      } else {
        z = "." + nanosStr + "Z";
      }
    }
    return new Date(ms).toISOString().replace(".000Z", z);
  }
  toDate() {
    return new Date(Number(this.seconds) * 1e3 + Math.ceil(this.nanos / 1e6));
  }
  static now() {
    return Timestamp.fromDate(/* @__PURE__ */ new Date());
  }
  static fromDate(date) {
    const ms = date.getTime();
    return new Timestamp({
      seconds: protoInt64.parse(Math.floor(ms / 1e3)),
      nanos: ms % 1e3 * 1e6
    });
  }
  static fromBinary(bytes, options) {
    return new Timestamp().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Timestamp().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Timestamp().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Timestamp, a, b);
  }
}
Timestamp.runtime = proto3;
Timestamp.typeName = "google.protobuf.Timestamp";
Timestamp.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "seconds",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 2,
    name: "nanos",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class Any extends Message {
  constructor(data) {
    super();
    this.typeUrl = "";
    this.value = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    var _a;
    if (this.typeUrl === "") {
      return {};
    }
    const typeName = this.typeUrlToName(this.typeUrl);
    const messageType = (_a = options === null || options === void 0 ? void 0 : options.typeRegistry) === null || _a === void 0 ? void 0 : _a.findMessage(typeName);
    if (!messageType) {
      throw new Error(`cannot encode message google.protobuf.Any to JSON: "${this.typeUrl}" is not in the type registry`);
    }
    const message = messageType.fromBinary(this.value);
    let json = message.toJson(options);
    if (typeName.startsWith("google.protobuf.") || (json === null || Array.isArray(json) || typeof json !== "object")) {
      json = { value: json };
    }
    json["@type"] = this.typeUrl;
    return json;
  }
  fromJson(json, options) {
    var _a;
    if (json === null || Array.isArray(json) || typeof json != "object") {
      throw new Error(`cannot decode message google.protobuf.Any from JSON: expected object but got ${json === null ? "null" : Array.isArray(json) ? "array" : typeof json}`);
    }
    if (Object.keys(json).length == 0) {
      return this;
    }
    const typeUrl = json["@type"];
    if (typeof typeUrl != "string" || typeUrl == "") {
      throw new Error(`cannot decode message google.protobuf.Any from JSON: "@type" is empty`);
    }
    const typeName = this.typeUrlToName(typeUrl), messageType = (_a = options === null || options === void 0 ? void 0 : options.typeRegistry) === null || _a === void 0 ? void 0 : _a.findMessage(typeName);
    if (!messageType) {
      throw new Error(`cannot decode message google.protobuf.Any from JSON: ${typeUrl} is not in the type registry`);
    }
    let message;
    if (typeName.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(json, "value")) {
      message = messageType.fromJson(json["value"], options);
    } else {
      const copy = Object.assign({}, json);
      delete copy["@type"];
      message = messageType.fromJson(copy, options);
    }
    this.packFrom(message);
    return this;
  }
  packFrom(message) {
    this.value = message.toBinary();
    this.typeUrl = this.typeNameToUrl(message.getType().typeName);
  }
  unpackTo(target) {
    if (!this.is(target.getType())) {
      return false;
    }
    target.fromBinary(this.value);
    return true;
  }
  unpack(registry) {
    if (this.typeUrl === "") {
      return void 0;
    }
    const messageType = registry.findMessage(this.typeUrlToName(this.typeUrl));
    if (!messageType) {
      return void 0;
    }
    return messageType.fromBinary(this.value);
  }
  is(type) {
    if (this.typeUrl === "") {
      return false;
    }
    const name2 = this.typeUrlToName(this.typeUrl);
    let typeName = "";
    if (typeof type === "string") {
      typeName = type;
    } else {
      typeName = type.typeName;
    }
    return name2 === typeName;
  }
  typeNameToUrl(name2) {
    return `type.googleapis.com/${name2}`;
  }
  typeUrlToName(url) {
    if (!url.length) {
      throw new Error(`invalid type url: ${url}`);
    }
    const slash = url.lastIndexOf("/");
    const name2 = slash >= 0 ? url.substring(slash + 1) : url;
    if (!name2.length) {
      throw new Error(`invalid type url: ${url}`);
    }
    return name2;
  }
  static pack(message) {
    const any = new Any();
    any.packFrom(message);
    return any;
  }
  static fromBinary(bytes, options) {
    return new Any().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Any().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Any().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Any, a, b);
  }
}
Any.runtime = proto3;
Any.typeName = "google.protobuf.Any";
Any.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "type_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "value",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class DoubleValue extends Message {
  constructor(data) {
    super();
    this.value = 0;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.DOUBLE, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.DOUBLE, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.DoubleValue from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new DoubleValue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DoubleValue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DoubleValue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DoubleValue, a, b);
  }
}
DoubleValue.runtime = proto3;
DoubleValue.typeName = "google.protobuf.DoubleValue";
DoubleValue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  }
]);
DoubleValue.fieldWrapper = {
  wrapField(value) {
    return new DoubleValue({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class FloatValue extends Message {
  constructor(data) {
    super();
    this.value = 0;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.FLOAT, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.FLOAT, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.FloatValue from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new FloatValue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new FloatValue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new FloatValue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(FloatValue, a, b);
  }
}
FloatValue.runtime = proto3;
FloatValue.typeName = "google.protobuf.FloatValue";
FloatValue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]);
FloatValue.fieldWrapper = {
  wrapField(value) {
    return new FloatValue({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class Int64Value extends Message {
  constructor(data) {
    super();
    this.value = protoInt64.zero;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.INT64, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.INT64, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.Int64Value from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new Int64Value().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Int64Value().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Int64Value().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Int64Value, a, b);
  }
}
Int64Value.runtime = proto3;
Int64Value.typeName = "google.protobuf.Int64Value";
Int64Value.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }
]);
Int64Value.fieldWrapper = {
  wrapField(value) {
    return new Int64Value({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class UInt64Value extends Message {
  constructor(data) {
    super();
    this.value = protoInt64.zero;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.UINT64, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.UINT64, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.UInt64Value from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new UInt64Value().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UInt64Value().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UInt64Value().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UInt64Value, a, b);
  }
}
UInt64Value.runtime = proto3;
UInt64Value.typeName = "google.protobuf.UInt64Value";
UInt64Value.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 4
    /* ScalarType.UINT64 */
  }
]);
UInt64Value.fieldWrapper = {
  wrapField(value) {
    return new UInt64Value({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class Int32Value extends Message {
  constructor(data) {
    super();
    this.value = 0;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.INT32, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.INT32, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.Int32Value from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new Int32Value().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Int32Value().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Int32Value().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Int32Value, a, b);
  }
}
Int32Value.runtime = proto3;
Int32Value.typeName = "google.protobuf.Int32Value";
Int32Value.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
Int32Value.fieldWrapper = {
  wrapField(value) {
    return new Int32Value({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class UInt32Value extends Message {
  constructor(data) {
    super();
    this.value = 0;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.UINT32, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.UINT32, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.UInt32Value from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new UInt32Value().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UInt32Value().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UInt32Value().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UInt32Value, a, b);
  }
}
UInt32Value.runtime = proto3;
UInt32Value.typeName = "google.protobuf.UInt32Value";
UInt32Value.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]);
UInt32Value.fieldWrapper = {
  wrapField(value) {
    return new UInt32Value({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class BoolValue extends Message {
  constructor(data) {
    super();
    this.value = false;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.BOOL, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.BOOL, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.BoolValue from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new BoolValue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new BoolValue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new BoolValue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(BoolValue, a, b);
  }
}
BoolValue.runtime = proto3;
BoolValue.typeName = "google.protobuf.BoolValue";
BoolValue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
BoolValue.fieldWrapper = {
  wrapField(value) {
    return new BoolValue({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class StringValue extends Message {
  constructor(data) {
    super();
    this.value = "";
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.STRING, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.STRING, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.StringValue from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new StringValue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new StringValue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new StringValue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(StringValue, a, b);
  }
}
StringValue.runtime = proto3;
StringValue.typeName = "google.protobuf.StringValue";
StringValue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
StringValue.fieldWrapper = {
  wrapField(value) {
    return new StringValue({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class BytesValue extends Message {
  constructor(data) {
    super();
    this.value = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.BYTES, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.BYTES, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.BytesValue from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new BytesValue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new BytesValue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new BytesValue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(BytesValue, a, b);
  }
}
BytesValue.runtime = proto3;
BytesValue.typeName = "google.protobuf.BytesValue";
BytesValue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
BytesValue.fieldWrapper = {
  wrapField(value) {
    return new BytesValue({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
function codeToString(value) {
  const name2 = Code$1[value];
  if (typeof name2 != "string") {
    return value.toString();
  }
  return name2[0].toLowerCase() + name2.substring(1).replace(/[A-Z]/g, (c) => "_" + c.toLowerCase());
}
class ConnectError extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with error.
   */
  constructor(message, code = Code$1.Unknown, metadata, outgoingDetails, cause) {
    super(createMessage(message, code));
    this.name = "ConnectError";
    Object.setPrototypeOf(this, new.target.prototype);
    this.rawMessage = message;
    this.code = code;
    this.metadata = new Headers(metadata !== null && metadata !== void 0 ? metadata : {});
    this.details = outgoingDetails !== null && outgoingDetails !== void 0 ? outgoingDetails : [];
    this.cause = cause;
  }
  /**
   * Convert any value - typically a caught error into a ConnectError,
   * following these rules:
   * - If the value is already a ConnectError, return it as is.
   * - If the value is an AbortError from the fetch API, return the message
   *   of the AbortError with code Canceled.
   * - For other Errors, return the error message with code Unknown by default.
   * - For other values, return the values String representation as a message,
   *   with the code Unknown by default.
   * The original value will be used for the "cause" property for the new
   * ConnectError.
   */
  static from(reason, code = Code$1.Unknown) {
    if (reason instanceof ConnectError) {
      return reason;
    }
    if (reason instanceof Error) {
      if (reason.name == "AbortError") {
        return new ConnectError(reason.message, Code$1.Canceled);
      }
      return new ConnectError(reason.message, code, void 0, void 0, reason);
    }
    return new ConnectError(String(reason), code, void 0, void 0, reason);
  }
  findDetails(typeOrRegistry) {
    const registry = "typeName" in typeOrRegistry ? {
      findMessage: (typeName) => typeName === typeOrRegistry.typeName ? typeOrRegistry : void 0
    } : typeOrRegistry;
    const details = [];
    for (const data of this.details) {
      if (data instanceof Message) {
        if (registry.findMessage(data.getType().typeName)) {
          details.push(data);
        }
        continue;
      }
      const type = registry.findMessage(data.type);
      if (type) {
        try {
          details.push(type.fromBinary(data.value));
        } catch (_) {
        }
      }
    }
    return details;
  }
}
function createMessage(message, code) {
  return message.length ? `[${codeToString(code)}] ${message}` : `[${codeToString(code)}]`;
}
function decodeBinaryHeader(value, type, options) {
  try {
    const bytes = protoBase64.dec(value);
    if (type) {
      return type.fromBinary(bytes, options);
    }
    return bytes;
  } catch (e) {
    throw ConnectError.from(e, Code$1.DataLoss);
  }
}
function makeAnyClient(service, createMethod) {
  const client = {};
  for (const [localName, methodInfo] of Object.entries(service.methods)) {
    const method = createMethod(Object.assign(Object.assign({}, methodInfo), {
      localName,
      service
    }));
    if (method != null) {
      client[localName] = method;
    }
  }
  return client;
}
function createEnvelopeReadableStream(stream) {
  let reader;
  let buffer = new Uint8Array(0);
  function append(chunk) {
    const n = new Uint8Array(buffer.length + chunk.length);
    n.set(buffer);
    n.set(chunk, buffer.length);
    buffer = n;
  }
  return new ReadableStream({
    start() {
      reader = stream.getReader();
    },
    async pull(controller) {
      let header = void 0;
      for (; ; ) {
        if (header === void 0 && buffer.byteLength >= 5) {
          let length = 0;
          for (let i = 1; i < 5; i++) {
            length = (length << 8) + buffer[i];
          }
          header = { flags: buffer[0], length };
        }
        if (header !== void 0 && buffer.byteLength >= header.length + 5) {
          break;
        }
        const result = await reader.read();
        if (result.done) {
          break;
        }
        append(result.value);
      }
      if (header === void 0) {
        if (buffer.byteLength == 0) {
          controller.close();
          return;
        }
        controller.error(new ConnectError("premature end of stream", Code$1.DataLoss));
        return;
      }
      const data = buffer.subarray(5, 5 + header.length);
      buffer = buffer.subarray(5 + header.length);
      controller.enqueue({
        flags: header.flags,
        data
      });
    }
  });
}
function encodeEnvelope(flags, data) {
  const bytes = new Uint8Array(data.length + 5);
  bytes.set(data, 5);
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  v.setUint8(0, flags);
  v.setUint32(1, data.length);
  return bytes;
}
var __asyncValues$1 = globalThis && globalThis.__asyncValues || function(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
var __await$2 = globalThis && globalThis.__await || function(v) {
  return this instanceof __await$2 ? (this.v = v, this) : new __await$2(v);
};
var __asyncGenerator$2 = globalThis && globalThis.__asyncGenerator || function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await$2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
};
var __asyncDelegator$1 = globalThis && globalThis.__asyncDelegator || function(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await$2(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
};
function createAsyncIterable(items) {
  return __asyncGenerator$2(this, arguments, function* createAsyncIterable_1() {
    yield __await$2(yield* __asyncDelegator$1(__asyncValues$1(items)));
  });
}
var __asyncValues = globalThis && globalThis.__asyncValues || function(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
var __await$1 = globalThis && globalThis.__await || function(v) {
  return this instanceof __await$1 ? (this.v = v, this) : new __await$1(v);
};
var __asyncDelegator = globalThis && globalThis.__asyncDelegator || function(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await$1(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
};
var __asyncGenerator$1 = globalThis && globalThis.__asyncGenerator || function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await$1 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
};
function createPromiseClient(service, transport) {
  return makeAnyClient(service, (method) => {
    switch (method.kind) {
      case MethodKind.Unary:
        return createUnaryFn(transport, service, method);
      case MethodKind.ServerStreaming:
        return createServerStreamingFn(transport, service, method);
      case MethodKind.ClientStreaming:
        return createClientStreamingFn(transport, service, method);
      case MethodKind.BiDiStreaming:
        return createBiDiStreamingFn(transport, service, method);
      default:
        return null;
    }
  });
}
function createUnaryFn(transport, service, method) {
  return async function(input, options) {
    var _a, _b;
    const response = await transport.unary(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, input, options === null || options === void 0 ? void 0 : options.contextValues);
    (_a = options === null || options === void 0 ? void 0 : options.onHeader) === null || _a === void 0 ? void 0 : _a.call(options, response.header);
    (_b = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _b === void 0 ? void 0 : _b.call(options, response.trailer);
    return response.message;
  };
}
function createServerStreamingFn(transport, service, method) {
  return function(input, options) {
    return handleStreamResponse(transport.stream(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, createAsyncIterable([input]), options === null || options === void 0 ? void 0 : options.contextValues), options);
  };
}
function createClientStreamingFn(transport, service, method) {
  return async function(request, options) {
    var _a, e_1, _b, _c;
    var _d, _e;
    const response = await transport.stream(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, request, options === null || options === void 0 ? void 0 : options.contextValues);
    (_d = options === null || options === void 0 ? void 0 : options.onHeader) === null || _d === void 0 ? void 0 : _d.call(options, response.header);
    let singleMessage;
    try {
      for (var _f = true, _g = __asyncValues(response.message), _h; _h = await _g.next(), _a = _h.done, !_a; _f = true) {
        _c = _h.value;
        _f = false;
        const message = _c;
        singleMessage = message;
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (!_f && !_a && (_b = _g.return))
          await _b.call(_g);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    if (!singleMessage) {
      throw new ConnectError("protocol error: missing response message", Code$1.Internal);
    }
    (_e = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _e === void 0 ? void 0 : _e.call(options, response.trailer);
    return singleMessage;
  };
}
function createBiDiStreamingFn(transport, service, method) {
  return function(request, options) {
    return handleStreamResponse(transport.stream(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, request, options === null || options === void 0 ? void 0 : options.contextValues), options);
  };
}
function handleStreamResponse(stream, options) {
  const it = function() {
    var _a, _b;
    return __asyncGenerator$1(this, arguments, function* () {
      const response = yield __await$1(stream);
      (_a = options === null || options === void 0 ? void 0 : options.onHeader) === null || _a === void 0 ? void 0 : _a.call(options, response.header);
      yield __await$1(yield* __asyncDelegator(__asyncValues(response.message)));
      (_b = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _b === void 0 ? void 0 : _b.call(options, response.trailer);
    });
  }()[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => it.next()
    })
  };
}
function createLinkedAbortController(...signals) {
  const controller = new AbortController();
  const sa = signals.filter((s) => s !== void 0).concat(controller.signal);
  for (const signal of sa) {
    if (signal.aborted) {
      onAbort.apply(signal);
      break;
    }
    signal.addEventListener("abort", onAbort);
  }
  function onAbort() {
    if (!controller.signal.aborted) {
      controller.abort(getAbortSignalReason(this));
    }
    for (const signal of sa) {
      signal.removeEventListener("abort", onAbort);
    }
  }
  return controller;
}
function createDeadlineSignal(timeoutMs) {
  const controller = new AbortController();
  const listener = () => {
    controller.abort(new ConnectError("the operation timed out", Code$1.DeadlineExceeded));
  };
  let timeoutId;
  if (timeoutMs !== void 0) {
    if (timeoutMs <= 0)
      listener();
    else
      timeoutId = setTimeout(listener, timeoutMs);
  }
  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(timeoutId)
  };
}
function getAbortSignalReason(signal) {
  if (!signal.aborted) {
    return void 0;
  }
  if (signal.reason !== void 0) {
    return signal.reason;
  }
  const e = new Error("This operation was aborted");
  e.name = "AbortError";
  return e;
}
function createContextValues() {
  return {
    get(key) {
      return key.id in this ? this[key.id] : key.defaultValue;
    },
    set(key, value) {
      this[key.id] = value;
      return this;
    },
    delete(key) {
      delete this[key.id];
      return this;
    }
  };
}
const trailerFlag = 128;
function trailerParse(data) {
  const headers = new Headers();
  const lines = new TextDecoder().decode(data).split("\r\n");
  for (const line of lines) {
    if (line === "") {
      continue;
    }
    const i = line.indexOf(":");
    if (i > 0) {
      const name2 = line.substring(0, i).trim();
      const value = line.substring(i + 1).trim();
      headers.append(name2, value);
    }
  }
  return headers;
}
const headerContentType = "Content-Type";
const headerTimeout = "Grpc-Timeout";
const headerGrpcStatus = "Grpc-Status";
const headerGrpcMessage = "Grpc-Message";
const headerStatusDetailsBin = "Grpc-Status-Details-Bin";
const headerUserAgent = "User-Agent";
const headerXUserAgent = "X-User-Agent";
const headerXGrpcWeb = "X-Grpc-Web";
const contentTypeProto = "application/grpc-web+proto";
const contentTypeJson = "application/grpc-web+json";
class Status extends Message {
  constructor(data) {
    super();
    this.code = 0;
    this.message = "";
    this.details = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new Status().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Status().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Status().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Status, a, b);
  }
}
Status.runtime = proto3;
Status.typeName = "google.rpc.Status";
Status.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "code",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 2,
    name: "message",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "details", kind: "message", T: Any, repeated: true }
]);
const grpcStatusOk = "0";
function findTrailerError(headerOrTrailer) {
  var _a;
  const statusBytes = headerOrTrailer.get(headerStatusDetailsBin);
  if (statusBytes != null) {
    const status = decodeBinaryHeader(statusBytes, Status);
    if (status.code == 0) {
      return void 0;
    }
    const error = new ConnectError(status.message, status.code, headerOrTrailer);
    error.details = status.details.map((any) => ({
      type: any.typeUrl.substring(any.typeUrl.lastIndexOf("/") + 1),
      value: any.value
    }));
    return error;
  }
  const grpcStatus = headerOrTrailer.get(headerGrpcStatus);
  if (grpcStatus != null) {
    if (grpcStatus === grpcStatusOk) {
      return void 0;
    }
    const code = parseInt(grpcStatus, 10);
    if (code in Code$1) {
      return new ConnectError(decodeURIComponent((_a = headerOrTrailer.get(headerGrpcMessage)) !== null && _a !== void 0 ? _a : ""), code, headerOrTrailer);
    }
    return new ConnectError(`invalid grpc-status: ${grpcStatus}`, Code$1.Internal, headerOrTrailer);
  }
  return void 0;
}
function createMethodUrl(baseUrl, service, method) {
  const s = typeof service == "string" ? service : service.typeName;
  const m = typeof method == "string" ? method : method.name;
  return baseUrl.toString().replace(/\/?$/, `/${s}/${m}`);
}
function normalize(type, message) {
  return message instanceof Message ? message : new type(message);
}
function normalizeIterable(messageType, input) {
  function transform(result) {
    if (result.done === true) {
      return result;
    }
    return {
      done: result.done,
      value: normalize(messageType, result.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const it = input[Symbol.asyncIterator]();
      const res = {
        next: () => it.next().then(transform)
      };
      if (it.throw !== void 0) {
        res.throw = (e) => it.throw(e).then(transform);
      }
      if (it.return !== void 0) {
        res.return = (v) => it.return(v).then(transform);
      }
      return res;
    }
  };
}
function getJsonOptions(options) {
  var _a;
  const o = Object.assign({}, options);
  (_a = o.ignoreUnknownFields) !== null && _a !== void 0 ? _a : o.ignoreUnknownFields = true;
  return o;
}
function createClientMethodSerializers(method, useBinaryFormat, jsonOptions, binaryOptions) {
  const input = useBinaryFormat ? createBinarySerialization(method.I, binaryOptions) : createJsonSerialization(method.I, jsonOptions);
  const output = useBinaryFormat ? createBinarySerialization(method.O, binaryOptions) : createJsonSerialization(method.O, jsonOptions);
  return { parse: output.parse, serialize: input.serialize };
}
function createBinarySerialization(messageType, options) {
  return {
    parse(data) {
      try {
        return messageType.fromBinary(data, options);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`parse binary: ${m}`, Code$1.InvalidArgument);
      }
    },
    serialize(data) {
      try {
        return data.toBinary(options);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`serialize binary: ${m}`, Code$1.Internal);
      }
    }
  };
}
function createJsonSerialization(messageType, options) {
  var _a, _b;
  const textEncoder = (_a = options === null || options === void 0 ? void 0 : options.textEncoder) !== null && _a !== void 0 ? _a : new TextEncoder();
  const textDecoder = (_b = options === null || options === void 0 ? void 0 : options.textDecoder) !== null && _b !== void 0 ? _b : new TextDecoder();
  const o = getJsonOptions(options);
  return {
    parse(data) {
      try {
        const json = textDecoder.decode(data);
        return messageType.fromJsonString(json, o);
      } catch (e) {
        throw ConnectError.from(e, Code$1.InvalidArgument);
      }
    },
    serialize(data) {
      try {
        const json = data.toJsonString(o);
        return textEncoder.encode(json);
      } catch (e) {
        throw ConnectError.from(e, Code$1.Internal);
      }
    }
  };
}
function runUnaryCall(opt) {
  const next = applyInterceptors(opt.next, opt.interceptors);
  const [signal, abort, done] = setupSignal(opt);
  const req = Object.assign(Object.assign({}, opt.req), { message: normalize(opt.req.method.I, opt.req.message), signal });
  return next(req).then((res) => {
    done();
    return res;
  }, abort);
}
function runStreamingCall(opt) {
  const next = applyInterceptors(opt.next, opt.interceptors);
  const [signal, abort, done] = setupSignal(opt);
  const req = Object.assign(Object.assign({}, opt.req), { message: normalizeIterable(opt.req.method.I, opt.req.message), signal });
  let doneCalled = false;
  signal.addEventListener("abort", function() {
    var _a, _b;
    const it = opt.req.message[Symbol.asyncIterator]();
    if (!doneCalled) {
      (_a = it.throw) === null || _a === void 0 ? void 0 : _a.call(it, this.reason).catch(() => {
      });
    }
    (_b = it.return) === null || _b === void 0 ? void 0 : _b.call(it).catch(() => {
    });
  });
  return next(req).then((res) => {
    return Object.assign(Object.assign({}, res), { message: {
      [Symbol.asyncIterator]() {
        const it = res.message[Symbol.asyncIterator]();
        return {
          next() {
            return it.next().then((r) => {
              if (r.done == true) {
                doneCalled = true;
                done();
              }
              return r;
            }, abort);
          }
          // We deliberately omit throw/return.
        };
      }
    } });
  }, abort);
}
function setupSignal(opt) {
  const { signal, cleanup } = createDeadlineSignal(opt.timeoutMs);
  const controller = createLinkedAbortController(opt.signal, signal);
  return [
    controller.signal,
    function abort(reason) {
      const e = ConnectError.from(signal.aborted ? getAbortSignalReason(signal) : reason);
      controller.abort(e);
      cleanup();
      return Promise.reject(e);
    },
    function done() {
      cleanup();
      controller.abort();
    }
  ];
}
function applyInterceptors(next, interceptors) {
  var _a;
  return (_a = interceptors === null || interceptors === void 0 ? void 0 : interceptors.concat().reverse().reduce(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (n, i) => i(n),
    next
  )) !== null && _a !== void 0 ? _a : next;
}
function assertFetchApi() {
  try {
    new Headers();
  } catch (_) {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}
function validateTrailer(trailer, header) {
  const err = findTrailerError(trailer);
  if (err) {
    header.forEach((value, key) => {
      err.metadata.append(key, value);
    });
    throw err;
  }
}
function requestHeader(useBinaryFormat, timeoutMs, userProvidedHeaders, setUserAgent) {
  const result = new Headers(userProvidedHeaders !== null && userProvidedHeaders !== void 0 ? userProvidedHeaders : {});
  result.set(headerContentType, useBinaryFormat ? contentTypeProto : contentTypeJson);
  result.set(headerXGrpcWeb, "1");
  result.set(headerXUserAgent, "connect-es/1.2.0");
  if (setUserAgent) {
    result.set(headerUserAgent, "connect-es/1.2.0");
  }
  if (timeoutMs !== void 0) {
    result.set(headerTimeout, `${timeoutMs}m`);
  }
  return result;
}
function codeFromHttpStatus(httpStatus) {
  switch (httpStatus) {
    case 400:
      return Code$1.Internal;
    case 401:
      return Code$1.Unauthenticated;
    case 403:
      return Code$1.PermissionDenied;
    case 404:
      return Code$1.Unimplemented;
    case 429:
      return Code$1.Unavailable;
    case 502:
      return Code$1.Unavailable;
    case 503:
      return Code$1.Unavailable;
    case 504:
      return Code$1.Unavailable;
    default:
      return Code$1.Unknown;
  }
}
function validateResponse(status, headers) {
  var _a;
  if (status >= 200 && status < 300) {
    const err = findTrailerError(headers);
    if (err) {
      throw err;
    }
    return { foundStatus: headers.has(headerGrpcStatus) };
  }
  throw new ConnectError(decodeURIComponent((_a = headers.get(headerGrpcMessage)) !== null && _a !== void 0 ? _a : `HTTP ${status}`), codeFromHttpStatus(status), headers);
}
var __await = globalThis && globalThis.__await || function(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
};
var __asyncGenerator = globalThis && globalThis.__asyncGenerator || function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
};
function createGrpcWebTransport(options) {
  var _a;
  assertFetchApi();
  const useBinaryFormat = (_a = options.useBinaryFormat) !== null && _a !== void 0 ? _a : true;
  return {
    async unary(service, method, signal, timeoutMs, header, message, contextValues) {
      var _a2;
      const { serialize, parse } = createClientMethodSerializers(method, useBinaryFormat, options.jsonOptions, options.binaryOptions);
      timeoutMs = timeoutMs === void 0 ? options.defaultTimeoutMs : timeoutMs <= 0 ? void 0 : timeoutMs;
      return await runUnaryCall({
        interceptors: options.interceptors,
        signal,
        timeoutMs,
        req: {
          stream: false,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method),
          init: {
            method: "POST",
            credentials: (_a2 = options.credentials) !== null && _a2 !== void 0 ? _a2 : "same-origin",
            redirect: "error",
            mode: "cors"
          },
          header: requestHeader(useBinaryFormat, timeoutMs, header, false),
          contextValues: contextValues !== null && contextValues !== void 0 ? contextValues : createContextValues(),
          message
        },
        next: async (req) => {
          var _a3;
          const fetch = (_a3 = options.fetch) !== null && _a3 !== void 0 ? _a3 : globalThis.fetch;
          const response = await fetch(req.url, Object.assign(Object.assign({}, req.init), { headers: req.header, signal: req.signal, body: encodeEnvelope(0, serialize(req.message)) }));
          validateResponse(response.status, response.headers);
          if (!response.body) {
            throw "missing response body";
          }
          const reader = createEnvelopeReadableStream(response.body).getReader();
          let trailer;
          let message2;
          for (; ; ) {
            const r = await reader.read();
            if (r.done) {
              break;
            }
            const { flags, data } = r.value;
            if (flags === trailerFlag) {
              if (trailer !== void 0) {
                throw "extra trailer";
              }
              trailer = trailerParse(data);
              continue;
            }
            if (message2 !== void 0) {
              throw "extra message";
            }
            message2 = parse(data);
          }
          if (trailer === void 0) {
            throw "missing trailer";
          }
          validateTrailer(trailer, response.headers);
          if (message2 === void 0) {
            throw "missing message";
          }
          return {
            stream: false,
            header: response.headers,
            message: message2,
            trailer
          };
        }
      });
    },
    async stream(service, method, signal, timeoutMs, header, input, contextValues) {
      var _a2;
      const { serialize, parse } = createClientMethodSerializers(method, useBinaryFormat, options.jsonOptions, options.binaryOptions);
      function parseResponseBody(body, foundStatus, trailerTarget, header2) {
        return __asyncGenerator(this, arguments, function* parseResponseBody_1() {
          const reader = createEnvelopeReadableStream(body).getReader();
          if (foundStatus) {
            if (!(yield __await(reader.read())).done) {
              throw "extra data for trailers-only";
            }
            return yield __await(void 0);
          }
          let trailerReceived = false;
          for (; ; ) {
            const result = yield __await(reader.read());
            if (result.done) {
              break;
            }
            const { flags, data } = result.value;
            if ((flags & trailerFlag) === trailerFlag) {
              if (trailerReceived) {
                throw "extra trailer";
              }
              trailerReceived = true;
              const trailer = trailerParse(data);
              validateTrailer(trailer, header2);
              trailer.forEach((value, key) => trailerTarget.set(key, value));
              continue;
            }
            if (trailerReceived) {
              throw "extra message";
            }
            yield yield __await(parse(data));
            continue;
          }
          if (!trailerReceived) {
            throw "missing trailer";
          }
        });
      }
      async function createRequestBody(input2) {
        if (method.kind != MethodKind.ServerStreaming) {
          throw "The fetch API does not support streaming request bodies";
        }
        const r = await input2[Symbol.asyncIterator]().next();
        if (r.done == true) {
          throw "missing request message";
        }
        return encodeEnvelope(0, serialize(r.value));
      }
      timeoutMs = timeoutMs === void 0 ? options.defaultTimeoutMs : timeoutMs <= 0 ? void 0 : timeoutMs;
      return runStreamingCall({
        interceptors: options.interceptors,
        signal,
        timeoutMs,
        req: {
          stream: true,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method),
          init: {
            method: "POST",
            credentials: (_a2 = options.credentials) !== null && _a2 !== void 0 ? _a2 : "same-origin",
            redirect: "error",
            mode: "cors"
          },
          header: requestHeader(useBinaryFormat, timeoutMs, header, false),
          contextValues: contextValues !== null && contextValues !== void 0 ? contextValues : createContextValues(),
          message: input
        },
        next: async (req) => {
          var _a3;
          const fetch = (_a3 = options.fetch) !== null && _a3 !== void 0 ? _a3 : globalThis.fetch;
          const fRes = await fetch(req.url, Object.assign(Object.assign({}, req.init), { headers: req.header, signal: req.signal, body: await createRequestBody(req.message) }));
          const { foundStatus } = validateResponse(fRes.status, fRes.headers);
          if (!fRes.body) {
            throw "missing response body";
          }
          const trailer = new Headers();
          const res = Object.assign(Object.assign({}, req), { header: fRes.headers, trailer, message: parseResponseBody(fRes.body, foundStatus, trailer, fRes.headers) });
          return res;
        }
      });
    }
  };
}
const ValueType = proto3.makeEnum(
  "yorkie.v1.ValueType",
  [
    { no: 0, name: "VALUE_TYPE_NULL", localName: "NULL" },
    { no: 1, name: "VALUE_TYPE_BOOLEAN", localName: "BOOLEAN" },
    { no: 2, name: "VALUE_TYPE_INTEGER", localName: "INTEGER" },
    { no: 3, name: "VALUE_TYPE_LONG", localName: "LONG" },
    { no: 4, name: "VALUE_TYPE_DOUBLE", localName: "DOUBLE" },
    { no: 5, name: "VALUE_TYPE_STRING", localName: "STRING" },
    { no: 6, name: "VALUE_TYPE_BYTES", localName: "BYTES" },
    { no: 7, name: "VALUE_TYPE_DATE", localName: "DATE" },
    { no: 8, name: "VALUE_TYPE_JSON_OBJECT", localName: "JSON_OBJECT" },
    { no: 9, name: "VALUE_TYPE_JSON_ARRAY", localName: "JSON_ARRAY" },
    { no: 10, name: "VALUE_TYPE_TEXT", localName: "TEXT" },
    { no: 11, name: "VALUE_TYPE_INTEGER_CNT", localName: "INTEGER_CNT" },
    { no: 12, name: "VALUE_TYPE_LONG_CNT", localName: "LONG_CNT" },
    { no: 13, name: "VALUE_TYPE_TREE", localName: "TREE" }
  ]
);
const DocEventType$1 = proto3.makeEnum(
  "yorkie.v1.DocEventType",
  [
    { no: 0, name: "DOC_EVENT_TYPE_DOCUMENT_CHANGED", localName: "DOCUMENT_CHANGED" },
    { no: 1, name: "DOC_EVENT_TYPE_DOCUMENT_WATCHED", localName: "DOCUMENT_WATCHED" },
    { no: 2, name: "DOC_EVENT_TYPE_DOCUMENT_UNWATCHED", localName: "DOCUMENT_UNWATCHED" },
    { no: 3, name: "DOC_EVENT_TYPE_DOCUMENT_BROADCAST", localName: "DOCUMENT_BROADCAST" }
  ]
);
const Snapshot = proto3.makeMessageType(
  "yorkie.v1.Snapshot",
  () => [
    { no: 1, name: "root", kind: "message", T: JSONElement },
    { no: 2, name: "presences", kind: "map", K: 9, V: { kind: "message", T: Presence$1 } }
  ]
);
const ChangePack$1 = proto3.makeMessageType(
  "yorkie.v1.ChangePack",
  () => [
    {
      no: 1,
      name: "document_key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "checkpoint", kind: "message", T: Checkpoint$1 },
    {
      no: 3,
      name: "snapshot",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    },
    { no: 4, name: "changes", kind: "message", T: Change$1, repeated: true },
    { no: 5, name: "min_synced_ticket", kind: "message", T: TimeTicket$1 },
    {
      no: 6,
      name: "is_removed",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
);
const Change$1 = proto3.makeMessageType(
  "yorkie.v1.Change",
  () => [
    { no: 1, name: "id", kind: "message", T: ChangeID$1 },
    {
      no: 2,
      name: "message",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "operations", kind: "message", T: Operation$1, repeated: true },
    { no: 4, name: "presence_change", kind: "message", T: PresenceChange }
  ]
);
const ChangeID$1 = proto3.makeMessageType(
  "yorkie.v1.ChangeID",
  () => [
    {
      no: 1,
      name: "client_seq",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    {
      no: 2,
      name: "server_seq",
      kind: "scalar",
      T: 3,
      L: 1
      /* LongType.STRING */
    },
    {
      no: 3,
      name: "lamport",
      kind: "scalar",
      T: 3,
      L: 1
      /* LongType.STRING */
    },
    {
      no: 4,
      name: "actor_id",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
);
const Operation$1 = proto3.makeMessageType(
  "yorkie.v1.Operation",
  () => [
    { no: 1, name: "set", kind: "message", T: Operation_Set, oneof: "body" },
    { no: 2, name: "add", kind: "message", T: Operation_Add, oneof: "body" },
    { no: 3, name: "move", kind: "message", T: Operation_Move, oneof: "body" },
    { no: 4, name: "remove", kind: "message", T: Operation_Remove, oneof: "body" },
    { no: 5, name: "edit", kind: "message", T: Operation_Edit, oneof: "body" },
    { no: 6, name: "select", kind: "message", T: Operation_Select, oneof: "body" },
    { no: 7, name: "style", kind: "message", T: Operation_Style, oneof: "body" },
    { no: 8, name: "increase", kind: "message", T: Operation_Increase, oneof: "body" },
    { no: 9, name: "tree_edit", kind: "message", T: Operation_TreeEdit, oneof: "body" },
    { no: 10, name: "tree_style", kind: "message", T: Operation_TreeStyle, oneof: "body" }
  ]
);
const Operation_Set = proto3.makeMessageType(
  "yorkie.v1.Operation.Set",
  () => [
    { no: 1, name: "parent_created_at", kind: "message", T: TimeTicket$1 },
    {
      no: 2,
      name: "key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "value", kind: "message", T: JSONElementSimple },
    { no: 4, name: "executed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "Operation_Set" }
);
const Operation_Add = proto3.makeMessageType(
  "yorkie.v1.Operation.Add",
  () => [
    { no: 1, name: "parent_created_at", kind: "message", T: TimeTicket$1 },
    { no: 2, name: "prev_created_at", kind: "message", T: TimeTicket$1 },
    { no: 3, name: "value", kind: "message", T: JSONElementSimple },
    { no: 4, name: "executed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "Operation_Add" }
);
const Operation_Move = proto3.makeMessageType(
  "yorkie.v1.Operation.Move",
  () => [
    { no: 1, name: "parent_created_at", kind: "message", T: TimeTicket$1 },
    { no: 2, name: "prev_created_at", kind: "message", T: TimeTicket$1 },
    { no: 3, name: "created_at", kind: "message", T: TimeTicket$1 },
    { no: 4, name: "executed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "Operation_Move" }
);
const Operation_Remove = proto3.makeMessageType(
  "yorkie.v1.Operation.Remove",
  () => [
    { no: 1, name: "parent_created_at", kind: "message", T: TimeTicket$1 },
    { no: 2, name: "created_at", kind: "message", T: TimeTicket$1 },
    { no: 3, name: "executed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "Operation_Remove" }
);
const Operation_Edit = proto3.makeMessageType(
  "yorkie.v1.Operation.Edit",
  () => [
    { no: 1, name: "parent_created_at", kind: "message", T: TimeTicket$1 },
    { no: 2, name: "from", kind: "message", T: TextNodePos },
    { no: 3, name: "to", kind: "message", T: TextNodePos },
    { no: 4, name: "created_at_map_by_actor", kind: "map", K: 9, V: { kind: "message", T: TimeTicket$1 } },
    {
      no: 5,
      name: "content",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 6, name: "executed_at", kind: "message", T: TimeTicket$1 },
    { no: 7, name: "attributes", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    } }
  ],
  { localName: "Operation_Edit" }
);
const Operation_Select = proto3.makeMessageType(
  "yorkie.v1.Operation.Select",
  () => [
    { no: 1, name: "parent_created_at", kind: "message", T: TimeTicket$1 },
    { no: 2, name: "from", kind: "message", T: TextNodePos },
    { no: 3, name: "to", kind: "message", T: TextNodePos },
    { no: 4, name: "executed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "Operation_Select" }
);
const Operation_Style = proto3.makeMessageType(
  "yorkie.v1.Operation.Style",
  () => [
    { no: 1, name: "parent_created_at", kind: "message", T: TimeTicket$1 },
    { no: 2, name: "from", kind: "message", T: TextNodePos },
    { no: 3, name: "to", kind: "message", T: TextNodePos },
    { no: 4, name: "attributes", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    } },
    { no: 5, name: "executed_at", kind: "message", T: TimeTicket$1 },
    { no: 6, name: "created_at_map_by_actor", kind: "map", K: 9, V: { kind: "message", T: TimeTicket$1 } }
  ],
  { localName: "Operation_Style" }
);
const Operation_Increase = proto3.makeMessageType(
  "yorkie.v1.Operation.Increase",
  () => [
    { no: 1, name: "parent_created_at", kind: "message", T: TimeTicket$1 },
    { no: 2, name: "value", kind: "message", T: JSONElementSimple },
    { no: 3, name: "executed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "Operation_Increase" }
);
const Operation_TreeEdit = proto3.makeMessageType(
  "yorkie.v1.Operation.TreeEdit",
  () => [
    { no: 1, name: "parent_created_at", kind: "message", T: TimeTicket$1 },
    { no: 2, name: "from", kind: "message", T: TreePos },
    { no: 3, name: "to", kind: "message", T: TreePos },
    { no: 4, name: "created_at_map_by_actor", kind: "map", K: 9, V: { kind: "message", T: TimeTicket$1 } },
    { no: 5, name: "contents", kind: "message", T: TreeNodes, repeated: true },
    {
      no: 7,
      name: "split_level",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    { no: 6, name: "executed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "Operation_TreeEdit" }
);
const Operation_TreeStyle = proto3.makeMessageType(
  "yorkie.v1.Operation.TreeStyle",
  () => [
    { no: 1, name: "parent_created_at", kind: "message", T: TimeTicket$1 },
    { no: 2, name: "from", kind: "message", T: TreePos },
    { no: 3, name: "to", kind: "message", T: TreePos },
    { no: 4, name: "attributes", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    } },
    { no: 5, name: "executed_at", kind: "message", T: TimeTicket$1 },
    { no: 6, name: "attributes_to_remove", kind: "scalar", T: 9, repeated: true },
    { no: 7, name: "created_at_map_by_actor", kind: "map", K: 9, V: { kind: "message", T: TimeTicket$1 } }
  ],
  { localName: "Operation_TreeStyle" }
);
const JSONElementSimple = proto3.makeMessageType(
  "yorkie.v1.JSONElementSimple",
  () => [
    { no: 1, name: "created_at", kind: "message", T: TimeTicket$1 },
    { no: 2, name: "moved_at", kind: "message", T: TimeTicket$1 },
    { no: 3, name: "removed_at", kind: "message", T: TimeTicket$1 },
    { no: 4, name: "type", kind: "enum", T: proto3.getEnumType(ValueType) },
    {
      no: 5,
      name: "value",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
);
const JSONElement = proto3.makeMessageType(
  "yorkie.v1.JSONElement",
  () => [
    { no: 1, name: "json_object", kind: "message", T: JSONElement_JSONObject, oneof: "body" },
    { no: 2, name: "json_array", kind: "message", T: JSONElement_JSONArray, oneof: "body" },
    { no: 3, name: "primitive", kind: "message", T: JSONElement_Primitive, oneof: "body" },
    { no: 5, name: "text", kind: "message", T: JSONElement_Text, oneof: "body" },
    { no: 6, name: "counter", kind: "message", T: JSONElement_Counter, oneof: "body" },
    { no: 7, name: "tree", kind: "message", T: JSONElement_Tree, oneof: "body" }
  ]
);
const JSONElement_JSONObject = proto3.makeMessageType(
  "yorkie.v1.JSONElement.JSONObject",
  () => [
    { no: 1, name: "nodes", kind: "message", T: RHTNode$1, repeated: true },
    { no: 2, name: "created_at", kind: "message", T: TimeTicket$1 },
    { no: 3, name: "moved_at", kind: "message", T: TimeTicket$1 },
    { no: 4, name: "removed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "JSONElement_JSONObject" }
);
const JSONElement_JSONArray = proto3.makeMessageType(
  "yorkie.v1.JSONElement.JSONArray",
  () => [
    { no: 1, name: "nodes", kind: "message", T: RGANode, repeated: true },
    { no: 2, name: "created_at", kind: "message", T: TimeTicket$1 },
    { no: 3, name: "moved_at", kind: "message", T: TimeTicket$1 },
    { no: 4, name: "removed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "JSONElement_JSONArray" }
);
const JSONElement_Primitive = proto3.makeMessageType(
  "yorkie.v1.JSONElement.Primitive",
  () => [
    { no: 1, name: "type", kind: "enum", T: proto3.getEnumType(ValueType) },
    {
      no: 2,
      name: "value",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    },
    { no: 3, name: "created_at", kind: "message", T: TimeTicket$1 },
    { no: 4, name: "moved_at", kind: "message", T: TimeTicket$1 },
    { no: 5, name: "removed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "JSONElement_Primitive" }
);
const JSONElement_Text = proto3.makeMessageType(
  "yorkie.v1.JSONElement.Text",
  () => [
    { no: 1, name: "nodes", kind: "message", T: TextNode, repeated: true },
    { no: 2, name: "created_at", kind: "message", T: TimeTicket$1 },
    { no: 3, name: "moved_at", kind: "message", T: TimeTicket$1 },
    { no: 4, name: "removed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "JSONElement_Text" }
);
const JSONElement_Counter = proto3.makeMessageType(
  "yorkie.v1.JSONElement.Counter",
  () => [
    { no: 1, name: "type", kind: "enum", T: proto3.getEnumType(ValueType) },
    {
      no: 2,
      name: "value",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    },
    { no: 3, name: "created_at", kind: "message", T: TimeTicket$1 },
    { no: 4, name: "moved_at", kind: "message", T: TimeTicket$1 },
    { no: 5, name: "removed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "JSONElement_Counter" }
);
const JSONElement_Tree = proto3.makeMessageType(
  "yorkie.v1.JSONElement.Tree",
  () => [
    { no: 1, name: "nodes", kind: "message", T: TreeNode, repeated: true },
    { no: 2, name: "created_at", kind: "message", T: TimeTicket$1 },
    { no: 3, name: "moved_at", kind: "message", T: TimeTicket$1 },
    { no: 4, name: "removed_at", kind: "message", T: TimeTicket$1 }
  ],
  { localName: "JSONElement_Tree" }
);
const RHTNode$1 = proto3.makeMessageType(
  "yorkie.v1.RHTNode",
  () => [
    {
      no: 1,
      name: "key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "element", kind: "message", T: JSONElement }
  ]
);
const RGANode = proto3.makeMessageType(
  "yorkie.v1.RGANode",
  () => [
    { no: 1, name: "next", kind: "message", T: RGANode },
    { no: 2, name: "element", kind: "message", T: JSONElement }
  ]
);
const NodeAttr = proto3.makeMessageType(
  "yorkie.v1.NodeAttr",
  () => [
    {
      no: 1,
      name: "value",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "updated_at", kind: "message", T: TimeTicket$1 },
    {
      no: 3,
      name: "is_removed",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
);
const TextNode = proto3.makeMessageType(
  "yorkie.v1.TextNode",
  () => [
    { no: 1, name: "id", kind: "message", T: TextNodeID },
    {
      no: 2,
      name: "value",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "removed_at", kind: "message", T: TimeTicket$1 },
    { no: 4, name: "ins_prev_id", kind: "message", T: TextNodeID },
    { no: 5, name: "attributes", kind: "map", K: 9, V: { kind: "message", T: NodeAttr } }
  ]
);
const TextNodeID = proto3.makeMessageType(
  "yorkie.v1.TextNodeID",
  () => [
    { no: 1, name: "created_at", kind: "message", T: TimeTicket$1 },
    {
      no: 2,
      name: "offset",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    }
  ]
);
const TreeNode = proto3.makeMessageType(
  "yorkie.v1.TreeNode",
  () => [
    { no: 1, name: "id", kind: "message", T: TreeNodeID },
    {
      no: 2,
      name: "type",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "value",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "removed_at", kind: "message", T: TimeTicket$1 },
    { no: 5, name: "ins_prev_id", kind: "message", T: TreeNodeID },
    { no: 6, name: "ins_next_id", kind: "message", T: TreeNodeID },
    {
      no: 7,
      name: "depth",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    { no: 8, name: "attributes", kind: "map", K: 9, V: { kind: "message", T: NodeAttr } }
  ]
);
const TreeNodes = proto3.makeMessageType(
  "yorkie.v1.TreeNodes",
  () => [
    { no: 1, name: "content", kind: "message", T: TreeNode, repeated: true }
  ]
);
const TreeNodeID = proto3.makeMessageType(
  "yorkie.v1.TreeNodeID",
  () => [
    { no: 1, name: "created_at", kind: "message", T: TimeTicket$1 },
    {
      no: 2,
      name: "offset",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    }
  ]
);
const TreePos = proto3.makeMessageType(
  "yorkie.v1.TreePos",
  () => [
    { no: 1, name: "parent_id", kind: "message", T: TreeNodeID },
    { no: 2, name: "left_sibling_id", kind: "message", T: TreeNodeID }
  ]
);
proto3.makeMessageType(
  "yorkie.v1.User",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "username",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "created_at", kind: "message", T: Timestamp }
  ]
);
proto3.makeMessageType(
  "yorkie.v1.Project",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "name",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "public_key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "secret_key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 5,
      name: "auth_webhook_url",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 6, name: "auth_webhook_methods", kind: "scalar", T: 9, repeated: true },
    {
      no: 7,
      name: "client_deactivate_threshold",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 8, name: "created_at", kind: "message", T: Timestamp },
    { no: 9, name: "updated_at", kind: "message", T: Timestamp }
  ]
);
proto3.makeMessageType(
  "yorkie.v1.UpdatableProjectFields",
  () => [
    { no: 1, name: "name", kind: "message", T: StringValue },
    { no: 2, name: "auth_webhook_url", kind: "message", T: StringValue },
    { no: 3, name: "auth_webhook_methods", kind: "message", T: UpdatableProjectFields_AuthWebhookMethods },
    { no: 4, name: "client_deactivate_threshold", kind: "message", T: StringValue }
  ]
);
const UpdatableProjectFields_AuthWebhookMethods = proto3.makeMessageType(
  "yorkie.v1.UpdatableProjectFields.AuthWebhookMethods",
  () => [
    { no: 1, name: "methods", kind: "scalar", T: 9, repeated: true }
  ],
  { localName: "UpdatableProjectFields_AuthWebhookMethods" }
);
proto3.makeMessageType(
  "yorkie.v1.DocumentSummary",
  () => [
    {
      no: 1,
      name: "id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "snapshot",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 4, name: "created_at", kind: "message", T: Timestamp },
    { no: 5, name: "accessed_at", kind: "message", T: Timestamp },
    { no: 6, name: "updated_at", kind: "message", T: Timestamp }
  ]
);
const PresenceChange = proto3.makeMessageType(
  "yorkie.v1.PresenceChange",
  () => [
    { no: 1, name: "type", kind: "enum", T: proto3.getEnumType(PresenceChange_ChangeType) },
    { no: 2, name: "presence", kind: "message", T: Presence$1 }
  ]
);
const PresenceChange_ChangeType = proto3.makeEnum(
  "yorkie.v1.PresenceChange.ChangeType",
  [
    { no: 0, name: "CHANGE_TYPE_UNSPECIFIED", localName: "UNSPECIFIED" },
    { no: 1, name: "CHANGE_TYPE_PUT", localName: "PUT" },
    { no: 2, name: "CHANGE_TYPE_DELETE", localName: "DELETE" },
    { no: 3, name: "CHANGE_TYPE_CLEAR", localName: "CLEAR" }
  ]
);
const Presence$1 = proto3.makeMessageType(
  "yorkie.v1.Presence",
  () => [
    { no: 1, name: "data", kind: "map", K: 9, V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    } }
  ]
);
const Checkpoint$1 = proto3.makeMessageType(
  "yorkie.v1.Checkpoint",
  () => [
    {
      no: 1,
      name: "server_seq",
      kind: "scalar",
      T: 3,
      L: 1
      /* LongType.STRING */
    },
    {
      no: 2,
      name: "client_seq",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    }
  ]
);
const TextNodePos = proto3.makeMessageType(
  "yorkie.v1.TextNodePos",
  () => [
    { no: 1, name: "created_at", kind: "message", T: TimeTicket$1 },
    {
      no: 2,
      name: "offset",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    },
    {
      no: 3,
      name: "relative_offset",
      kind: "scalar",
      T: 5
      /* ScalarType.INT32 */
    }
  ]
);
const TimeTicket$1 = proto3.makeMessageType(
  "yorkie.v1.TimeTicket",
  () => [
    {
      no: 1,
      name: "lamport",
      kind: "scalar",
      T: 3,
      L: 1
      /* LongType.STRING */
    },
    {
      no: 2,
      name: "delimiter",
      kind: "scalar",
      T: 13
      /* ScalarType.UINT32 */
    },
    {
      no: 3,
      name: "actor_id",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
);
const DocEventBody = proto3.makeMessageType(
  "yorkie.v1.DocEventBody",
  () => [
    {
      no: 1,
      name: "topic",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "payload",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
);
const DocEvent = proto3.makeMessageType(
  "yorkie.v1.DocEvent",
  () => [
    { no: 1, name: "type", kind: "enum", T: proto3.getEnumType(DocEventType$1) },
    {
      no: 2,
      name: "publisher",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "body", kind: "message", T: DocEventBody }
  ]
);
const ActivateClientRequest = proto3.makeMessageType(
  "yorkie.v1.ActivateClientRequest",
  () => [
    {
      no: 1,
      name: "client_key",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
);
const ActivateClientResponse = proto3.makeMessageType(
  "yorkie.v1.ActivateClientResponse",
  () => [
    {
      no: 1,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
);
const DeactivateClientRequest = proto3.makeMessageType(
  "yorkie.v1.DeactivateClientRequest",
  () => [
    {
      no: 1,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
);
const DeactivateClientResponse = proto3.makeMessageType(
  "yorkie.v1.DeactivateClientResponse",
  []
);
const AttachDocumentRequest = proto3.makeMessageType(
  "yorkie.v1.AttachDocumentRequest",
  () => [
    {
      no: 1,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "change_pack", kind: "message", T: ChangePack$1 }
  ]
);
const AttachDocumentResponse = proto3.makeMessageType(
  "yorkie.v1.AttachDocumentResponse",
  () => [
    {
      no: 1,
      name: "document_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 2, name: "change_pack", kind: "message", T: ChangePack$1 }
  ]
);
const DetachDocumentRequest = proto3.makeMessageType(
  "yorkie.v1.DetachDocumentRequest",
  () => [
    {
      no: 1,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "document_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "change_pack", kind: "message", T: ChangePack$1 },
    {
      no: 4,
      name: "remove_if_not_attached",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
);
const DetachDocumentResponse = proto3.makeMessageType(
  "yorkie.v1.DetachDocumentResponse",
  () => [
    { no: 2, name: "change_pack", kind: "message", T: ChangePack$1 }
  ]
);
const WatchDocumentRequest = proto3.makeMessageType(
  "yorkie.v1.WatchDocumentRequest",
  () => [
    {
      no: 1,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "document_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  ]
);
const WatchDocumentResponse = proto3.makeMessageType(
  "yorkie.v1.WatchDocumentResponse",
  () => [
    { no: 1, name: "initialization", kind: "message", T: WatchDocumentResponse_Initialization, oneof: "body" },
    { no: 2, name: "event", kind: "message", T: DocEvent, oneof: "body" }
  ]
);
const WatchDocumentResponse_Initialization = proto3.makeMessageType(
  "yorkie.v1.WatchDocumentResponse.Initialization",
  () => [
    { no: 1, name: "client_ids", kind: "scalar", T: 9, repeated: true }
  ],
  { localName: "WatchDocumentResponse_Initialization" }
);
const RemoveDocumentRequest = proto3.makeMessageType(
  "yorkie.v1.RemoveDocumentRequest",
  () => [
    {
      no: 1,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "document_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "change_pack", kind: "message", T: ChangePack$1 }
  ]
);
const RemoveDocumentResponse = proto3.makeMessageType(
  "yorkie.v1.RemoveDocumentResponse",
  () => [
    { no: 1, name: "change_pack", kind: "message", T: ChangePack$1 }
  ]
);
const PushPullChangesRequest = proto3.makeMessageType(
  "yorkie.v1.PushPullChangesRequest",
  () => [
    {
      no: 1,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "document_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    { no: 3, name: "change_pack", kind: "message", T: ChangePack$1 },
    {
      no: 4,
      name: "push_only",
      kind: "scalar",
      T: 8
      /* ScalarType.BOOL */
    }
  ]
);
const PushPullChangesResponse = proto3.makeMessageType(
  "yorkie.v1.PushPullChangesResponse",
  () => [
    { no: 1, name: "change_pack", kind: "message", T: ChangePack$1 }
  ]
);
const BroadcastRequest = proto3.makeMessageType(
  "yorkie.v1.BroadcastRequest",
  () => [
    {
      no: 1,
      name: "client_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 2,
      name: "document_id",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 3,
      name: "topic",
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    },
    {
      no: 4,
      name: "payload",
      kind: "scalar",
      T: 12
      /* ScalarType.BYTES */
    }
  ]
);
const BroadcastResponse = proto3.makeMessageType(
  "yorkie.v1.BroadcastResponse",
  []
);
const YorkieService = {
  typeName: "yorkie.v1.YorkieService",
  methods: {
    /**
     * @generated from rpc yorkie.v1.YorkieService.ActivateClient
     */
    activateClient: {
      name: "ActivateClient",
      I: ActivateClientRequest,
      O: ActivateClientResponse,
      kind: MethodKind.Unary
    },
    /**
     * @generated from rpc yorkie.v1.YorkieService.DeactivateClient
     */
    deactivateClient: {
      name: "DeactivateClient",
      I: DeactivateClientRequest,
      O: DeactivateClientResponse,
      kind: MethodKind.Unary
    },
    /**
     * @generated from rpc yorkie.v1.YorkieService.AttachDocument
     */
    attachDocument: {
      name: "AttachDocument",
      I: AttachDocumentRequest,
      O: AttachDocumentResponse,
      kind: MethodKind.Unary
    },
    /**
     * @generated from rpc yorkie.v1.YorkieService.DetachDocument
     */
    detachDocument: {
      name: "DetachDocument",
      I: DetachDocumentRequest,
      O: DetachDocumentResponse,
      kind: MethodKind.Unary
    },
    /**
     * @generated from rpc yorkie.v1.YorkieService.RemoveDocument
     */
    removeDocument: {
      name: "RemoveDocument",
      I: RemoveDocumentRequest,
      O: RemoveDocumentResponse,
      kind: MethodKind.Unary
    },
    /**
     * @generated from rpc yorkie.v1.YorkieService.PushPullChanges
     */
    pushPullChanges: {
      name: "PushPullChanges",
      I: PushPullChangesRequest,
      O: PushPullChangesResponse,
      kind: MethodKind.Unary
    },
    /**
     * @generated from rpc yorkie.v1.YorkieService.WatchDocument
     */
    watchDocument: {
      name: "WatchDocument",
      I: WatchDocumentRequest,
      O: WatchDocumentResponse,
      kind: MethodKind.ServerStreaming
    },
    /**
     * @generated from rpc yorkie.v1.YorkieService.Broadcast
     */
    broadcast: {
      name: "Broadcast",
      I: BroadcastRequest,
      O: BroadcastResponse,
      kind: MethodKind.Unary
    }
  }
};
/**
 * @license
 * Copyright 2009 The Closure Library Authors
 * Copyright 2020 Daniel Wirtz / The long.js Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var wasm = null;
try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    13,
    2,
    96,
    0,
    1,
    127,
    96,
    4,
    127,
    127,
    127,
    127,
    1,
    127,
    3,
    7,
    6,
    0,
    1,
    1,
    1,
    1,
    1,
    6,
    6,
    1,
    127,
    1,
    65,
    0,
    11,
    7,
    50,
    6,
    3,
    109,
    117,
    108,
    0,
    1,
    5,
    100,
    105,
    118,
    95,
    115,
    0,
    2,
    5,
    100,
    105,
    118,
    95,
    117,
    0,
    3,
    5,
    114,
    101,
    109,
    95,
    115,
    0,
    4,
    5,
    114,
    101,
    109,
    95,
    117,
    0,
    5,
    8,
    103,
    101,
    116,
    95,
    104,
    105,
    103,
    104,
    0,
    0,
    10,
    191,
    1,
    6,
    4,
    0,
    35,
    0,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    126,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    127,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    128,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    129,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    130,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11
  ])), {}).exports;
} catch (e) {
}
function Long(low, high, unsigned) {
  this.low = low | 0;
  this.high = high | 0;
  this.unsigned = !!unsigned;
}
Long.prototype.__isLong__;
Object.defineProperty(Long.prototype, "__isLong__", { value: true });
function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}
function ctz32(value) {
  var c = Math.clz32(value & -value);
  return value ? 31 - c : c;
}
Long.isLong = isLong;
var INT_CACHE = {};
var UINT_CACHE = {};
function fromInt(value, unsigned) {
  var obj, cachedObj, cache;
  if (unsigned) {
    value >>>= 0;
    if (cache = 0 <= value && value < 256) {
      cachedObj = UINT_CACHE[value];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value, 0, true);
    if (cache)
      UINT_CACHE[value] = obj;
    return obj;
  } else {
    value |= 0;
    if (cache = -128 <= value && value < 128) {
      cachedObj = INT_CACHE[value];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value, value < 0 ? -1 : 0, false);
    if (cache)
      INT_CACHE[value] = obj;
    return obj;
  }
}
Long.fromInt = fromInt;
function fromNumber(value, unsigned) {
  if (isNaN(value))
    return unsigned ? UZERO : ZERO;
  if (unsigned) {
    if (value < 0)
      return UZERO;
    if (value >= TWO_PWR_64_DBL)
      return MAX_UNSIGNED_VALUE;
  } else {
    if (value <= -TWO_PWR_63_DBL)
      return MIN_VALUE;
    if (value + 1 >= TWO_PWR_63_DBL)
      return MAX_VALUE;
  }
  if (value < 0)
    return fromNumber(-value, unsigned).neg();
  return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}
Long.fromNumber = fromNumber;
function fromBits(lowBits, highBits, unsigned) {
  return new Long(lowBits, highBits, unsigned);
}
Long.fromBits = fromBits;
var pow_dbl = Math.pow;
function fromString(str, unsigned, radix) {
  if (str.length === 0)
    throw Error("empty string");
  if (typeof unsigned === "number") {
    radix = unsigned;
    unsigned = false;
  } else {
    unsigned = !!unsigned;
  }
  if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
    return unsigned ? UZERO : ZERO;
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  var p;
  if ((p = str.indexOf("-")) > 0)
    throw Error("interior hyphen");
  else if (p === 0) {
    return fromString(str.substring(1), unsigned, radix).neg();
  }
  var radixToPower = fromNumber(pow_dbl(radix, 8));
  var result = ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = result.mul(power).add(fromNumber(value));
    } else {
      result = result.mul(radixToPower);
      result = result.add(fromNumber(value));
    }
  }
  result.unsigned = unsigned;
  return result;
}
Long.fromString = fromString;
function fromValue(val, unsigned) {
  if (typeof val === "number")
    return fromNumber(val, unsigned);
  if (typeof val === "string")
    return fromString(val, unsigned);
  return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
}
Long.fromValue = fromValue;
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
var ZERO = fromInt(0);
Long.ZERO = ZERO;
var UZERO = fromInt(0, true);
Long.UZERO = UZERO;
var ONE = fromInt(1);
Long.ONE = ONE;
var UONE = fromInt(1, true);
Long.UONE = UONE;
var NEG_ONE = fromInt(-1);
Long.NEG_ONE = NEG_ONE;
var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
Long.MAX_VALUE = MAX_VALUE;
var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
Long.MIN_VALUE = MIN_VALUE;
var LongPrototype = Long.prototype;
LongPrototype.toInt = function toInt() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
LongPrototype.toNumber = function toNumber() {
  if (this.unsigned)
    return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
  return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};
LongPrototype.toString = function toString(radix) {
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative()) {
    if (this.eq(MIN_VALUE)) {
      var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
      return div.toString(radix) + rem1.toInt().toString(radix);
    } else
      return "-" + this.neg().toString(radix);
  }
  var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
  var result = "";
  while (true) {
    var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
    rem = remDiv;
    if (rem.isZero())
      return digits + result;
    else {
      while (digits.length < 6)
        digits = "0" + digits;
      result = "" + digits + result;
    }
  }
};
LongPrototype.getHighBits = function getHighBits() {
  return this.high;
};
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
  return this.high >>> 0;
};
LongPrototype.getLowBits = function getLowBits() {
  return this.low;
};
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
  return this.low >>> 0;
};
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
  if (this.isNegative())
    return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
  var val = this.high != 0 ? this.high : this.low;
  for (var bit = 31; bit > 0; bit--)
    if ((val & 1 << bit) != 0)
      break;
  return this.high != 0 ? bit + 33 : bit + 1;
};
LongPrototype.isZero = function isZero() {
  return this.high === 0 && this.low === 0;
};
LongPrototype.eqz = LongPrototype.isZero;
LongPrototype.isNegative = function isNegative() {
  return !this.unsigned && this.high < 0;
};
LongPrototype.isPositive = function isPositive() {
  return this.unsigned || this.high >= 0;
};
LongPrototype.isOdd = function isOdd() {
  return (this.low & 1) === 1;
};
LongPrototype.isEven = function isEven() {
  return (this.low & 1) === 0;
};
LongPrototype.equals = function equals(other) {
  if (!isLong(other))
    other = fromValue(other);
  if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
    return false;
  return this.high === other.high && this.low === other.low;
};
LongPrototype.eq = LongPrototype.equals;
LongPrototype.notEquals = function notEquals(other) {
  return !this.eq(
    /* validates */
    other
  );
};
LongPrototype.neq = LongPrototype.notEquals;
LongPrototype.ne = LongPrototype.notEquals;
LongPrototype.lessThan = function lessThan(other) {
  return this.comp(
    /* validates */
    other
  ) < 0;
};
LongPrototype.lt = LongPrototype.lessThan;
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
  return this.comp(
    /* validates */
    other
  ) <= 0;
};
LongPrototype.lte = LongPrototype.lessThanOrEqual;
LongPrototype.le = LongPrototype.lessThanOrEqual;
LongPrototype.greaterThan = function greaterThan(other) {
  return this.comp(
    /* validates */
    other
  ) > 0;
};
LongPrototype.gt = LongPrototype.greaterThan;
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
  return this.comp(
    /* validates */
    other
  ) >= 0;
};
LongPrototype.gte = LongPrototype.greaterThanOrEqual;
LongPrototype.ge = LongPrototype.greaterThanOrEqual;
LongPrototype.compare = function compare(other) {
  if (!isLong(other))
    other = fromValue(other);
  if (this.eq(other))
    return 0;
  var thisNeg = this.isNegative(), otherNeg = other.isNegative();
  if (thisNeg && !otherNeg)
    return -1;
  if (!thisNeg && otherNeg)
    return 1;
  if (!this.unsigned)
    return this.sub(other).isNegative() ? -1 : 1;
  return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
};
LongPrototype.comp = LongPrototype.compare;
LongPrototype.negate = function negate2() {
  if (!this.unsigned && this.eq(MIN_VALUE))
    return MIN_VALUE;
  return this.not().add(ONE);
};
LongPrototype.neg = LongPrototype.negate;
LongPrototype.add = function add(addend) {
  if (!isLong(addend))
    addend = fromValue(addend);
  var a48 = this.high >>> 16;
  var a32 = this.high & 65535;
  var a16 = this.low >>> 16;
  var a00 = this.low & 65535;
  var b48 = addend.high >>> 16;
  var b32 = addend.high & 65535;
  var b16 = addend.low >>> 16;
  var b00 = addend.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 + b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
LongPrototype.subtract = function subtract(subtrahend) {
  if (!isLong(subtrahend))
    subtrahend = fromValue(subtrahend);
  return this.add(subtrahend.neg());
};
LongPrototype.sub = LongPrototype.subtract;
LongPrototype.multiply = function multiply(multiplier) {
  if (this.isZero())
    return this;
  if (!isLong(multiplier))
    multiplier = fromValue(multiplier);
  if (wasm) {
    var low = wasm["mul"](
      this.low,
      this.high,
      multiplier.low,
      multiplier.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  if (multiplier.isZero())
    return this.unsigned ? UZERO : ZERO;
  if (this.eq(MIN_VALUE))
    return multiplier.isOdd() ? MIN_VALUE : ZERO;
  if (multiplier.eq(MIN_VALUE))
    return this.isOdd() ? MIN_VALUE : ZERO;
  if (this.isNegative()) {
    if (multiplier.isNegative())
      return this.neg().mul(multiplier.neg());
    else
      return this.neg().mul(multiplier).neg();
  } else if (multiplier.isNegative())
    return this.mul(multiplier.neg()).neg();
  if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
    return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
  var a48 = this.high >>> 16;
  var a32 = this.high & 65535;
  var a16 = this.low >>> 16;
  var a00 = this.low & 65535;
  var b48 = multiplier.high >>> 16;
  var b32 = multiplier.high & 65535;
  var b16 = multiplier.low >>> 16;
  var b00 = multiplier.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
LongPrototype.mul = LongPrototype.multiply;
LongPrototype.divide = function divide(divisor) {
  if (!isLong(divisor))
    divisor = fromValue(divisor);
  if (divisor.isZero())
    throw Error("division by zero");
  if (wasm) {
    if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
      return this;
    }
    var low = (this.unsigned ? wasm["div_u"] : wasm["div_s"])(
      this.low,
      this.high,
      divisor.low,
      divisor.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? UZERO : ZERO;
  var approx, rem, res;
  if (!this.unsigned) {
    if (this.eq(MIN_VALUE)) {
      if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
        return MIN_VALUE;
      else if (divisor.eq(MIN_VALUE))
        return ONE;
      else {
        var halfThis = this.shr(1);
        approx = halfThis.div(divisor).shl(1);
        if (approx.eq(ZERO)) {
          return divisor.isNegative() ? ONE : NEG_ONE;
        } else {
          rem = this.sub(divisor.mul(approx));
          res = approx.add(rem.div(divisor));
          return res;
        }
      }
    } else if (divisor.eq(MIN_VALUE))
      return this.unsigned ? UZERO : ZERO;
    if (this.isNegative()) {
      if (divisor.isNegative())
        return this.neg().div(divisor.neg());
      return this.neg().div(divisor).neg();
    } else if (divisor.isNegative())
      return this.div(divisor.neg()).neg();
    res = ZERO;
  } else {
    if (!divisor.unsigned)
      divisor = divisor.toUnsigned();
    if (divisor.gt(this))
      return UZERO;
    if (divisor.gt(this.shru(1)))
      return UONE;
    res = UZERO;
  }
  rem = this;
  while (rem.gte(divisor)) {
    approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
    var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
    while (approxRem.isNegative() || approxRem.gt(rem)) {
      approx -= delta;
      approxRes = fromNumber(approx, this.unsigned);
      approxRem = approxRes.mul(divisor);
    }
    if (approxRes.isZero())
      approxRes = ONE;
    res = res.add(approxRes);
    rem = rem.sub(approxRem);
  }
  return res;
};
LongPrototype.div = LongPrototype.divide;
LongPrototype.modulo = function modulo(divisor) {
  if (!isLong(divisor))
    divisor = fromValue(divisor);
  if (wasm) {
    var low = (this.unsigned ? wasm["rem_u"] : wasm["rem_s"])(
      this.low,
      this.high,
      divisor.low,
      divisor.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  return this.sub(this.div(divisor).mul(divisor));
};
LongPrototype.mod = LongPrototype.modulo;
LongPrototype.rem = LongPrototype.modulo;
LongPrototype.not = function not() {
  return fromBits(~this.low, ~this.high, this.unsigned);
};
LongPrototype.countLeadingZeros = function countLeadingZeros() {
  return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
};
LongPrototype.clz = LongPrototype.countLeadingZeros;
LongPrototype.countTrailingZeros = function countTrailingZeros() {
  return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
};
LongPrototype.ctz = LongPrototype.countTrailingZeros;
LongPrototype.and = function and(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};
LongPrototype.or = function or(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};
LongPrototype.xor = function xor(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};
LongPrototype.shiftLeft = function shiftLeft(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  else if (numBits < 32)
    return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
  else
    return fromBits(0, this.low << numBits - 32, this.unsigned);
};
LongPrototype.shl = LongPrototype.shiftLeft;
LongPrototype.shiftRight = function shiftRight(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  else if (numBits < 32)
    return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
  else
    return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
LongPrototype.shr = LongPrototype.shiftRight;
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits < 32)
    return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >>> numBits, this.unsigned);
  if (numBits === 32)
    return fromBits(this.high, 0, this.unsigned);
  return fromBits(this.high >>> numBits - 32, 0, this.unsigned);
};
LongPrototype.shru = LongPrototype.shiftRightUnsigned;
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
LongPrototype.rotateLeft = function rotateLeft(numBits) {
  var b;
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits === 32)
    return fromBits(this.high, this.low, this.unsigned);
  if (numBits < 32) {
    b = 32 - numBits;
    return fromBits(this.low << numBits | this.high >>> b, this.high << numBits | this.low >>> b, this.unsigned);
  }
  numBits -= 32;
  b = 32 - numBits;
  return fromBits(this.high << numBits | this.low >>> b, this.low << numBits | this.high >>> b, this.unsigned);
};
LongPrototype.rotl = LongPrototype.rotateLeft;
LongPrototype.rotateRight = function rotateRight(numBits) {
  var b;
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits === 32)
    return fromBits(this.high, this.low, this.unsigned);
  if (numBits < 32) {
    b = 32 - numBits;
    return fromBits(this.high << b | this.low >>> numBits, this.low << b | this.high >>> numBits, this.unsigned);
  }
  numBits -= 32;
  b = 32 - numBits;
  return fromBits(this.low << b | this.high >>> numBits, this.high << b | this.low >>> numBits, this.unsigned);
};
LongPrototype.rotr = LongPrototype.rotateRight;
LongPrototype.toSigned = function toSigned() {
  if (!this.unsigned)
    return this;
  return fromBits(this.low, this.high, false);
};
LongPrototype.toUnsigned = function toUnsigned2() {
  if (this.unsigned)
    return this;
  return fromBits(this.low, this.high, true);
};
LongPrototype.toBytes = function toBytes(le) {
  return le ? this.toBytesLE() : this.toBytesBE();
};
LongPrototype.toBytesLE = function toBytesLE() {
  var hi = this.high, lo = this.low;
  return [
    lo & 255,
    lo >>> 8 & 255,
    lo >>> 16 & 255,
    lo >>> 24,
    hi & 255,
    hi >>> 8 & 255,
    hi >>> 16 & 255,
    hi >>> 24
  ];
};
LongPrototype.toBytesBE = function toBytesBE() {
  var hi = this.high, lo = this.low;
  return [
    hi >>> 24,
    hi >>> 16 & 255,
    hi >>> 8 & 255,
    hi & 255,
    lo >>> 24,
    lo >>> 16 & 255,
    lo >>> 8 & 255,
    lo & 255
  ];
};
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
  return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
  return new Long(
    bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
    bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
    unsigned
  );
};
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
  return new Long(
    bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
    bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
    unsigned
  );
};
var Code = /* @__PURE__ */ ((Code2) => {
  Code2["Ok"] = "ok";
  Code2["ClientNotActive"] = "client-not-active";
  Code2["Unimplemented"] = "unimplemented";
  Code2["Unsupported"] = "unsupported";
  Code2["DocumentNotAttached"] = "document-not-attached";
  Code2["DocumentNotDetached"] = "document-not-detached";
  Code2["DocumentRemoved"] = "document-removed";
  Code2["InvalidObjectKey"] = "invalid-object-key";
  Code2["InvalidArgument"] = "invalid-argument";
  return Code2;
})(Code || {});
class YorkieError extends Error {
  constructor(code, message) {
    super(message);
    __publicField(this, "name", "YorkieError");
    __publicField(this, "stack");
    this.code = code;
    this.message = message;
    this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
  }
}
function deepcopy(object) {
  if (object instanceof Map) {
    const pairs = Array.from(object);
    return new Map(JSON.parse(JSON.stringify(pairs)));
  }
  return JSON.parse(JSON.stringify(object));
}
const isEmpty = (object) => {
  if (!object) {
    return true;
  }
  return Object.entries(object).length === 0;
};
const stringifyObjectValues = (attributes) => {
  const attrs = {};
  for (const [key, value] of Object.entries(attributes)) {
    attrs[key] = JSON.stringify(value);
  }
  return attrs;
};
const parseObjectValues = (attrs) => {
  const attributes = {};
  for (const [key, value] of Object.entries(attrs)) {
    attributes[key] = JSON.parse(value);
  }
  return attributes;
};
var PresenceChangeType = /* @__PURE__ */ ((PresenceChangeType2) => {
  PresenceChangeType2["Put"] = "put";
  PresenceChangeType2["Clear"] = "clear";
  return PresenceChangeType2;
})(PresenceChangeType || {});
class Presence {
  constructor(changeContext, presence) {
    __publicField(this, "context");
    __publicField(this, "presence");
    this.context = changeContext;
    this.presence = presence;
  }
  /**
   * `set` updates the presence based on the partial presence.
   */
  set(presence, option) {
    for (const key of Object.keys(presence)) {
      this.presence[key] = presence[key];
    }
    this.context.setPresenceChange({
      type: "put",
      presence: deepcopy(this.presence)
    });
    this.context.setReversePresence(presence, option);
  }
  /**
   * `get` returns the presence value of the given key.
   */
  get(key) {
    return this.presence[key];
  }
  /**
   * `clear` clears the presence.
   * @internal
   */
  clear() {
    this.presence = {};
    this.context.setPresenceChange({
      type: "clear"
      /* Clear */
    });
  }
}
const InitialActorID = "000000000000000000000000";
const MaxActorID = "FFFFFFFFFFFFFFFFFFFFFFFF";
class TimeTicket {
  constructor(lamport, delimiter, actorID) {
    __publicField(this, "lamport");
    __publicField(this, "delimiter");
    __publicField(this, "actorID");
    this.lamport = lamport;
    this.delimiter = delimiter;
    this.actorID = actorID;
  }
  /**
   * `of` creates an instance of Ticket.
   */
  static of(lamport, delimiter, actorID) {
    return new TimeTicket(lamport, delimiter, actorID);
  }
  /**
   * `fromStruct` creates an instance of Ticket from the struct.
   */
  static fromStruct(struct) {
    return TimeTicket.of(
      Long.fromString(struct.lamport, true),
      struct.delimiter,
      struct.actorID
    );
  }
  /**
   * `toIDString` returns the lamport string for this Ticket.
   */
  toIDString() {
    return `${this.lamport.toString()}:${this.actorID}:${this.delimiter}`;
  }
  /**
   * `toStruct` returns the structure of this Ticket.
   */
  toStruct() {
    return {
      lamport: this.getLamportAsString(),
      delimiter: this.getDelimiter(),
      actorID: this.getActorID()
    };
  }
  /**
   * `toTestString` returns a string containing the meta data of the ticket
   * for debugging purpose.
   */
  toTestString() {
    return `${this.lamport.toString()}:${this.actorID.slice(-2)}:${this.delimiter}`;
  }
  /**
   * `setActor` creates a new instance of Ticket with the given actorID.
   */
  setActor(actorID) {
    return new TimeTicket(this.lamport, this.delimiter, actorID);
  }
  /**
   * `getLamportAsString` returns the lamport string.
   */
  getLamportAsString() {
    return this.lamport.toString();
  }
  /**
   * `getLamport` returns the lamport.
   */
  getLamport() {
    return this.lamport;
  }
  /**
   * `getDelimiter` returns delimiter.
   */
  getDelimiter() {
    return this.delimiter;
  }
  /**
   * `getActorID` returns actorID.
   */
  getActorID() {
    return this.actorID;
  }
  /**
   * `after` returns whether the given ticket was created later.
   */
  after(other) {
    return this.compare(other) > 0;
  }
  /**
   * `equals` returns whether the given ticket was created.
   */
  equals(other) {
    return this.compare(other) === 0;
  }
  /**
   * `compare` returns an integer comparing two Ticket.
   *  The result will be 0 if id==other, -1 if `id < other`, and +1 if `id > other`.
   *  If the receiver or argument is nil, it would panic at runtime.
   */
  compare(other) {
    if (this.lamport.greaterThan(other.lamport)) {
      return 1;
    } else if (other.lamport.greaterThan(this.lamport)) {
      return -1;
    }
    const compare2 = this.actorID.localeCompare(other.actorID);
    if (compare2 !== 0) {
      return compare2;
    }
    if (this.delimiter > other.delimiter) {
      return 1;
    } else if (other.delimiter > this.delimiter) {
      return -1;
    }
    return 0;
  }
}
const InitialDelimiter = 0;
const MaxDelemiter = 4294967295;
const MaxLamport = Long.MAX_VALUE;
const InitialTimeTicket = new TimeTicket(
  Long.fromNumber(0),
  InitialDelimiter,
  InitialActorID
);
new TimeTicket(
  Long.fromNumber(1),
  InitialDelimiter + 1,
  InitialActorID
);
const MaxTimeTicket = new TimeTicket(
  MaxLamport,
  MaxDelemiter,
  MaxActorID
);
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["Trivial"] = 0] = "Trivial";
  LogLevel2[LogLevel2["Debug"] = 1] = "Debug";
  LogLevel2[LogLevel2["Info"] = 2] = "Info";
  LogLevel2[LogLevel2["Warn"] = 3] = "Warn";
  LogLevel2[LogLevel2["Error"] = 4] = "Error";
  LogLevel2[LogLevel2["Fatal"] = 5] = "Fatal";
  return LogLevel2;
})(LogLevel || {});
let level = 2;
function setLogLevel(l) {
  level = l;
}
const logger = {
  trivial: (...messages) => {
    if (level > 0) {
      return;
    }
    if (typeof console != "undefined") {
      console.log("YORKIE T:", ...messages);
    }
  },
  debug: (...messages) => {
    if (level > 1) {
      return;
    }
    if (typeof console != "undefined") {
      console.log("YORKIE D:", ...messages);
    }
  },
  info: (...messages) => {
    if (level > 2) {
      return;
    }
    if (typeof console != "undefined") {
      console.log("YORKIE I:", ...messages);
    }
  },
  warn: (...messages) => {
    if (level > 3) {
      return;
    }
    if (typeof console != "undefined") {
      if (typeof console.warn !== "undefined") {
        console.warn("YORKIE W:", ...messages);
      } else {
        console.log("YORKIE W:", ...messages);
      }
    }
  },
  error: (...messages) => {
    if (level > 4) {
      return;
    }
    if (typeof console != "undefined") {
      if (typeof console.error !== "undefined") {
        console.error("YORKIE E:", ...messages);
      } else {
        console.log("YORKIE E:", ...messages);
      }
    }
  },
  fatal: (message, ...messages) => {
    if (typeof console != "undefined") {
      if (typeof console.error !== "undefined") {
        console.error("YORKIE F:", ...messages);
      } else {
        console.log("YORKIE F:", ...messages);
      }
    }
    throw new Error(`YORKIE F: ${message}`);
  },
  isEnabled: (l) => {
    return level <= l;
  }
};
function escapeString(str) {
  return str.replace(/["'\\\n\r\f\b\t\u2028\u2029]/g, function(character) {
    switch (character) {
      case '"':
      case "\\":
        return "\\" + character;
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\f":
        return "\\f";
      case "\b":
        return "\\b";
      case "	":
        return "\\t";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        return character;
    }
  });
}
class CRDTElement {
  constructor(createdAt) {
    __publicField(this, "createdAt");
    __publicField(this, "movedAt");
    __publicField(this, "removedAt");
    this.createdAt = createdAt;
  }
  /**
   * `getCreatedAt` returns the creation time of this element.
   */
  getCreatedAt() {
    return this.createdAt;
  }
  /**
   * `getID` returns the creation time of this element.
   */
  getID() {
    return this.createdAt;
  }
  /**
   * `getMovedAt` returns the move time of this element.
   */
  getMovedAt() {
    return this.movedAt;
  }
  /**
   * `getRemovedAt` returns the removal time of this element.
   */
  getRemovedAt() {
    return this.removedAt;
  }
  /**
   * `getPositionedAt` returns the time of this element when it was positioned
   * in the document by undo/redo or move operation.
   */
  getPositionedAt() {
    if (!this.movedAt) {
      return this.createdAt;
    }
    return this.movedAt;
  }
  /**
   * `setMovedAt` sets the move time of this element.
   */
  setMovedAt(movedAt) {
    if (!this.movedAt || movedAt && movedAt.after(this.movedAt)) {
      this.movedAt = movedAt;
      return true;
    }
    return false;
  }
  /**
   * `setRemovedAt` sets the remove time of this element.
   */
  setRemovedAt(removedAt) {
    this.removedAt = removedAt;
  }
  /**
   * `remove` removes this element.
   */
  remove(removedAt) {
    if (removedAt && removedAt.after(this.getPositionedAt()) && (!this.removedAt || removedAt.after(this.removedAt))) {
      this.removedAt = removedAt;
      return true;
    }
    return false;
  }
  /**
   * `isRemoved` check if this element was removed.
   */
  isRemoved() {
    return !!this.removedAt;
  }
}
class CRDTContainer extends CRDTElement {
  constructor(createdAt) {
    super(createdAt);
  }
}
class ElementRHTNode {
  constructor(strKey, value) {
    __publicField(this, "strKey");
    __publicField(this, "value");
    this.strKey = strKey;
    this.value = value;
  }
  /**
   * `of` creates a instance of ElementRHTNode.
   */
  static of(strKey, value) {
    return new ElementRHTNode(strKey, value);
  }
  /**
   * `isRemoved` checks whether this value was removed.
   */
  isRemoved() {
    return this.value.isRemoved();
  }
  /**
   * `getStrKey` returns the key of this node.
   */
  getStrKey() {
    return this.strKey;
  }
  /**
   * `getValue` return the value(element) of this node
   */
  getValue() {
    return this.value;
  }
  /**
   * `remove` removes a value base on removing time.
   */
  remove(removedAt) {
    return this.value.remove(removedAt);
  }
}
class ElementRHT {
  constructor() {
    __publicField(this, "nodeMapByKey");
    __publicField(this, "nodeMapByCreatedAt");
    this.nodeMapByKey = /* @__PURE__ */ new Map();
    this.nodeMapByCreatedAt = /* @__PURE__ */ new Map();
  }
  /**
   * `create` creates an instance of ElementRHT.
   */
  static create() {
    return new ElementRHT();
  }
  /**
   * `set` sets the value of the given key.
   */
  set(key, value, executedAt) {
    let removed;
    const node = this.nodeMapByKey.get(key);
    if (node != null && !node.isRemoved() && node.remove(executedAt)) {
      removed = node.getValue();
    }
    const newNode = ElementRHTNode.of(key, value);
    this.nodeMapByCreatedAt.set(value.getCreatedAt().toIDString(), newNode);
    if (node == null || executedAt.after(node.getValue().getPositionedAt())) {
      this.nodeMapByKey.set(key, newNode);
      value.setMovedAt(executedAt);
    }
    return removed;
  }
  /**
   * `delete` deletes the Element of the given key.
   */
  delete(createdAt, executedAt) {
    if (!this.nodeMapByCreatedAt.has(createdAt.toIDString())) {
      logger.fatal(`fail to find ${createdAt.toIDString()}`);
    }
    const node = this.nodeMapByCreatedAt.get(createdAt.toIDString());
    node.remove(executedAt);
    return node.getValue();
  }
  /**
   * `subPathOf` returns the sub path of the given element.
   */
  subPathOf(createdAt) {
    const node = this.nodeMapByCreatedAt.get(createdAt.toIDString());
    if (!node) {
      return;
    }
    return node.getStrKey();
  }
  /**
   * `purge` physically purge child element.
   */
  purge(element) {
    const node = this.nodeMapByCreatedAt.get(
      element.getCreatedAt().toIDString()
    );
    if (!node) {
      logger.fatal(`fail to find ${element.getCreatedAt().toIDString()}`);
      return;
    }
    const nodeByKey = this.nodeMapByKey.get(node.getStrKey());
    if (node === nodeByKey) {
      this.nodeMapByKey.delete(nodeByKey.getStrKey());
    }
    this.nodeMapByCreatedAt.delete(node.getValue().getCreatedAt().toIDString());
  }
  /**
   * `deleteByKey` deletes the Element of the given key and removed time.
   */
  deleteByKey(key, removedAt) {
    const node = this.nodeMapByKey.get(key);
    if (node == null) {
      return;
    }
    if (!node.remove(removedAt)) {
      return;
    }
    return node.getValue();
  }
  /**
   * `has` returns whether the element exists of the given key or not.
   */
  has(key) {
    const node = this.nodeMapByKey.get(key);
    if (node == null) {
      return false;
    }
    return !node.isRemoved();
  }
  /**
   * `getByID` returns the node of the given createdAt.
   */
  getByID(createdAt) {
    return this.nodeMapByCreatedAt.get(createdAt.toIDString());
  }
  /**
   * `get` returns the node of the given key.
   */
  get(key) {
    const node = this.nodeMapByKey.get(key);
    if (!node || node.isRemoved()) {
      return;
    }
    return node;
  }
  // eslint-disable-next-line jsdoc/require-jsdoc
  *[Symbol.iterator]() {
    for (const [, node] of this.nodeMapByKey) {
      yield node;
    }
  }
}
class CRDTObject extends CRDTContainer {
  constructor(createdAt, memberNodes) {
    super(createdAt);
    __publicField(this, "memberNodes");
    this.memberNodes = memberNodes;
  }
  /**
   * `create` creates a new instance of CRDTObject.
   */
  static create(createdAt, value) {
    if (!value) {
      return new CRDTObject(createdAt, ElementRHT.create());
    }
    const memberNodes = ElementRHT.create();
    for (const [k, v] of Object.entries(value)) {
      memberNodes.set(k, v.deepcopy(), v.getCreatedAt());
    }
    return new CRDTObject(createdAt, memberNodes);
  }
  /**
   * `subPathOf` returns the sub path of the given element.
   */
  subPathOf(createdAt) {
    return this.memberNodes.subPathOf(createdAt);
  }
  /**
   * `purge` physically purges the given element.
   */
  purge(value) {
    this.memberNodes.purge(value);
  }
  /**
   * `set` sets the given element of the given key.
   */
  set(key, value, executedAt) {
    return this.memberNodes.set(key, value, executedAt);
  }
  /**
   * `delete` deletes the element of the given key.
   */
  delete(createdAt, executedAt) {
    return this.memberNodes.delete(createdAt, executedAt);
  }
  /**
   * `deleteByKey` deletes the element of the given key and execution time.
   */
  deleteByKey(key, executedAt) {
    return this.memberNodes.deleteByKey(key, executedAt);
  }
  /**
   * `get` returns the value of the given key.
   */
  get(key) {
    const node = this.memberNodes.get(key);
    return node == null ? void 0 : node.getValue();
  }
  /**
   * `getByID` returns the element of the given createAt.
   */
  getByID(createdAt) {
    const node = this.memberNodes.getByID(createdAt);
    return node == null ? void 0 : node.getValue();
  }
  /**
   * `has` returns whether the element exists of the given key or not.
   */
  has(key) {
    return this.memberNodes.has(key);
  }
  /**
   * `toJSON` returns the JSON encoding of this object.
   */
  toJSON() {
    const json = [];
    for (const [key, value] of this) {
      json.push(`"${escapeString(key)}":${value.toJSON()}`);
    }
    return `{${json.join(",")}}`;
  }
  /**
   * `toJS` returns the JavaScript object of this object.
   */
  toJS() {
    return JSON.parse(this.toJSON());
  }
  /**
   * `toJSForTest` returns value with meta data for testing.
   */
  toJSForTest() {
    const values = {};
    for (const [key, elem] of this) {
      const { createdAt, value, type } = elem.toJSForTest();
      values[key] = {
        key,
        createdAt,
        value,
        type
      };
    }
    return {
      createdAt: this.getCreatedAt().toTestString(),
      value: values,
      type: "YORKIE_OBJECT"
    };
  }
  /**
   * `getKeys` returns array of keys in this object.
   */
  getKeys() {
    const keys = Array();
    for (const [key] of this) {
      keys.push(key);
    }
    return keys;
  }
  /**
   * `toSortedJSON` returns the sorted JSON encoding of this object.
   */
  toSortedJSON() {
    var _a;
    const keys = Array();
    for (const [key] of this) {
      keys.push(key);
    }
    const json = [];
    for (const key of keys.sort()) {
      const node = (_a = this.memberNodes.get(key)) == null ? void 0 : _a.getValue();
      json.push(`"${escapeString(key)}":${node.toSortedJSON()}`);
    }
    return `{${json.join(",")}}`;
  }
  /**
   * `getRHT` RHTNodes returns the RHTPQMap nodes.
   */
  getRHT() {
    return this.memberNodes;
  }
  /**
   * `deepcopy` copies itself deeply.
   */
  deepcopy() {
    const clone = CRDTObject.create(this.getCreatedAt());
    for (const node of this.memberNodes) {
      clone.memberNodes.set(
        node.getStrKey(),
        node.getValue().deepcopy(),
        this.getPositionedAt()
      );
    }
    clone.remove(this.getRemovedAt());
    return clone;
  }
  /**
   * `getDescendants` returns the descendants of this object by traversing.
   */
  getDescendants(callback) {
    for (const node of this.memberNodes) {
      const element = node.getValue();
      if (callback(element, this)) {
        return;
      }
      if (element instanceof CRDTContainer) {
        element.getDescendants(callback);
      }
    }
  }
  /**
   * eslint-disable-next-line jsdoc/require-jsdoc
   * @internal
   */
  *[Symbol.iterator]() {
    const keySet = /* @__PURE__ */ new Set();
    for (const node of this.memberNodes) {
      if (!keySet.has(node.getStrKey())) {
        keySet.add(node.getStrKey());
        if (!node.isRemoved()) {
          yield [node.getStrKey(), node.getValue()];
        }
      }
    }
  }
}
var OpSource = /* @__PURE__ */ ((OpSource2) => {
  OpSource2["Local"] = "local";
  OpSource2["Remote"] = "remote";
  OpSource2["UndoRedo"] = "undoredo";
  return OpSource2;
})(OpSource || {});
class Operation {
  constructor(parentCreatedAt, executedAt) {
    __publicField(this, "parentCreatedAt");
    // NOTE(Hyemmie): `executedAt` variable is undefined if this operation is not executed yet.
    __publicField(this, "executedAt");
    this.parentCreatedAt = parentCreatedAt;
    this.executedAt = executedAt;
  }
  /**
   * `getParentCreatedAt` returns the creation time of the target element to
   * execute the operation.
   */
  getParentCreatedAt() {
    return this.parentCreatedAt;
  }
  /**
   * `getExecutedAt` returns execution time of this operation.
   */
  getExecutedAt() {
    if (!this.executedAt) {
      throw new Error(`executedAt has not been set yet`);
    }
    return this.executedAt;
  }
  /**
   * `setActor` sets the given actor to this operation.
   */
  setActor(actorID) {
    if (this.executedAt) {
      this.executedAt = this.executedAt.setActor(actorID);
    }
  }
  /**
   * `setExecutedAt` sets the executedAt.
   */
  setExecutedAt(executedAt) {
    this.executedAt = executedAt;
  }
}
class SplayNode {
  constructor(value) {
    __publicField(this, "value");
    __publicField(this, "left");
    __publicField(this, "right");
    __publicField(this, "parent");
    __publicField(this, "weight");
    this.value = value;
    this.initWeight();
  }
  /**
   * `getNodeString` returns a string of weight and value of this node.
   */
  getNodeString() {
    return `${this.weight}${this.value}`;
  }
  /**
   * `getValue` returns value of this node.
   */
  getValue() {
    return this.value;
  }
  /**
   * `getLeftWeight` returns left weight of this node.
   */
  getLeftWeight() {
    return !this.hasLeft() ? 0 : this.left.getWeight();
  }
  /**
   * `getRightWeight` returns right weight of this node.
   */
  getRightWeight() {
    return !this.hasRight() ? 0 : this.right.getWeight();
  }
  /**
   * `getWeight` returns weight of this node.
   */
  getWeight() {
    return this.weight;
  }
  /**
   * `getLeft` returns a left node.
   */
  getLeft() {
    return this.left;
  }
  /**
   * `getRight` returns a right node.
   */
  getRight() {
    return this.right;
  }
  /**
   * `getParent` returns parent of this node.
   */
  getParent() {
    return this.parent;
  }
  /**
   * `hasLeft` check if the left node exists
   */
  hasLeft() {
    return !!this.left;
  }
  /**
   * `hasRight` check if the right node exists
   */
  hasRight() {
    return !!this.right;
  }
  /**
   * `hasParent` check if the parent node exists
   */
  hasParent() {
    return !!this.parent;
  }
  /**
   * `setLeft` sets a left node.
   */
  setLeft(left) {
    this.left = left;
  }
  /**
   * `setRight` sets a right node.
   */
  setRight(right) {
    this.right = right;
  }
  /**
   * `setParent` sets a parent node.
   */
  setParent(parent) {
    this.parent = parent;
  }
  /**
   * `unlink` unlink parent, right and left node.
   */
  unlink() {
    this.parent = void 0;
    this.right = void 0;
    this.left = void 0;
  }
  /**
   * `hasLinks` checks if parent, right and left node exists.
   */
  hasLinks() {
    return this.hasParent() || this.hasLeft() || this.hasRight();
  }
  /**
   * `increaseWeight` increases weight.
   */
  increaseWeight(weight) {
    this.weight += weight;
  }
  /**
   * `initWeight` sets initial weight of this node.
   */
  initWeight() {
    this.weight = this.getLength();
  }
}
class SplayTree {
  constructor(root) {
    __publicField(this, "root");
    this.root = root;
  }
  /**
   * `length` returns the size of this tree.
   */
  get length() {
    return this.root ? this.root.getWeight() : 0;
  }
  /**
   * `find` returns the Node and offset of the given index.
   */
  find(pos) {
    if (!this.root || pos < 0) {
      return [void 0, 0];
    }
    let node = this.root;
    for (; ; ) {
      if (node.hasLeft() && pos <= node.getLeftWeight()) {
        node = node.getLeft();
      } else if (node.hasRight() && node.getLeftWeight() + node.getLength() < pos) {
        pos -= node.getLeftWeight() + node.getLength();
        node = node.getRight();
      } else {
        pos -= node.getLeftWeight();
        break;
      }
    }
    if (pos > node.getLength()) {
      logger.fatal(
        `out of index range: pos: ${pos} > node.length: ${node.getLength()}`
      );
    }
    return [node, pos];
  }
  /**
   * Find the index of the given node in BST.
   *
   * @param node - the given node
   * @returns the index of given node
   */
  indexOf(node) {
    if (!node || node !== this.root && !node.hasLinks()) {
      return -1;
    }
    let index = 0;
    let current = node;
    let prev;
    while (current) {
      if (!prev || prev === current.getRight()) {
        index += current.getLength() + (current.hasLeft() ? current.getLeftWeight() : 0);
      }
      prev = current;
      current = current.getParent();
    }
    return index - node.getLength();
  }
  /**
   * `getRoot` returns root of this tree.
   */
  getRoot() {
    return this.root;
  }
  /**
   * `insert` inserts the node at the last.
   */
  insert(newNode) {
    return this.insertAfter(this.root, newNode);
  }
  /**
   * `insertAfter` inserts the node after the given previous node.
   */
  insertAfter(target, newNode) {
    if (!target) {
      this.root = newNode;
      return newNode;
    }
    this.splayNode(target);
    this.root = newNode;
    newNode.setRight(target.getRight());
    if (target.hasRight()) {
      target.getRight().setParent(newNode);
    }
    newNode.setLeft(target);
    target.setParent(newNode);
    target.setRight();
    this.updateWeight(target);
    this.updateWeight(newNode);
    return newNode;
  }
  /**
   * `updateWeight` recalculates the weight of this node with the value and children.
   */
  updateWeight(node) {
    node.initWeight();
    if (node.hasLeft()) {
      node.increaseWeight(node.getLeftWeight());
    }
    if (node.hasRight()) {
      node.increaseWeight(node.getRightWeight());
    }
  }
  updateTreeWeight(node) {
    while (node) {
      this.updateWeight(node);
      node = node.getParent();
    }
  }
  /**
   * `splayNode` moves the given node to the root.
   */
  splayNode(node) {
    if (!node) {
      return;
    }
    for (; ; ) {
      if (this.isLeftChild(node.getParent()) && this.isRightChild(node)) {
        this.rotateLeft(node);
        this.rotateRight(node);
      } else if (this.isRightChild(node.getParent()) && this.isLeftChild(node)) {
        this.rotateRight(node);
        this.rotateLeft(node);
      } else if (this.isLeftChild(node.getParent()) && this.isLeftChild(node)) {
        this.rotateRight(node.getParent());
        this.rotateRight(node);
      } else if (this.isRightChild(node.getParent()) && this.isRightChild(node)) {
        this.rotateLeft(node.getParent());
        this.rotateLeft(node);
      } else {
        if (this.isLeftChild(node)) {
          this.rotateRight(node);
        } else if (this.isRightChild(node)) {
          this.rotateLeft(node);
        }
        this.updateWeight(node);
        return;
      }
    }
  }
  /**
   * `delete` deletes target node of this tree.
   */
  delete(node) {
    this.splayNode(node);
    const leftTree = new SplayTree(node.getLeft());
    if (leftTree.root) {
      leftTree.root.setParent();
    }
    const rightTree = new SplayTree(node.getRight());
    if (rightTree.root) {
      rightTree.root.setParent();
    }
    if (leftTree.root) {
      const rightmostNode = leftTree.getRightmost();
      leftTree.splayNode(rightmostNode);
      leftTree.root.setRight(rightTree.root);
      if (rightTree.root) {
        rightTree.root.setParent(leftTree.root);
      }
      this.root = leftTree.root;
    } else {
      this.root = rightTree.root;
    }
    node.unlink();
    if (this.root) {
      this.updateWeight(this.root);
    }
  }
  /**
   * `deleteRange` separates the range between given 2 boundaries from this Tree.
   * This function separates the range to delete as a subtree
   * by splaying outer boundary nodes.
   * leftBoundary must exist because of 0-indexed initial dummy node of tree,
   * but rightBoundary can be nil means range to delete includes the end of tree.
   * Refer to the design document in https://github.com/yorkie-team/yorkie/tree/main/design
   */
  deleteRange(leftBoundary, rightBoundary) {
    if (!rightBoundary) {
      this.splayNode(leftBoundary);
      this.cutOffRight(leftBoundary);
      return;
    }
    this.splayNode(leftBoundary);
    this.splayNode(rightBoundary);
    if (rightBoundary.getLeft() != leftBoundary) {
      this.rotateRight(leftBoundary);
    }
    this.cutOffRight(leftBoundary);
  }
  cutOffRight(root) {
    const nodesToFreeWeight = [];
    this.traversePostorder(root.getRight(), nodesToFreeWeight);
    for (const node of nodesToFreeWeight) {
      node.initWeight();
    }
    this.updateTreeWeight(root);
  }
  /**
   * `toTestString` returns a string containing the meta data of the Node
   * for debugging purpose.
   */
  toTestString() {
    const metaString = [];
    this.traverseInorder(this.root, metaString);
    return metaString.map((n) => `[${n.getWeight()},${n.getLength()}]${n.getValue() || ""}`).join("");
  }
  /**
   * `checkWeight` returns false when there is an incorrect weight node.
   * for debugging purpose.
   */
  checkWeight() {
    const nodes = [];
    this.traverseInorder(this.root, nodes);
    for (const node of nodes) {
      if (node.getWeight() != node.getLength() + node.getLeftWeight() + node.getRightWeight()) {
        return false;
      }
    }
    return true;
  }
  getRightmost() {
    let node = this.root;
    while (node.hasRight()) {
      node = node.getRight();
    }
    return node;
  }
  traverseInorder(node, stack) {
    if (!node) {
      return;
    }
    this.traverseInorder(node.getLeft(), stack);
    stack.push(node);
    this.traverseInorder(node.getRight(), stack);
  }
  traversePostorder(node, stack) {
    if (!node) {
      return;
    }
    this.traversePostorder(node.getLeft(), stack);
    this.traversePostorder(node.getRight(), stack);
    stack.push(node);
  }
  rotateLeft(pivot) {
    const root = pivot.getParent();
    if (root.hasParent()) {
      if (root === root.getParent().getLeft()) {
        root.getParent().setLeft(pivot);
      } else {
        root.getParent().setRight(pivot);
      }
    } else {
      this.root = pivot;
    }
    pivot.setParent(root.getParent());
    root.setRight(pivot.getLeft());
    if (root.hasRight()) {
      root.getRight().setParent(root);
    }
    pivot.setLeft(root);
    pivot.getLeft().setParent(pivot);
    this.updateWeight(root);
    this.updateWeight(pivot);
  }
  rotateRight(pivot) {
    const root = pivot.getParent();
    if (root.hasParent()) {
      if (root === root.getParent().getLeft()) {
        root.getParent().setLeft(pivot);
      } else {
        root.getParent().setRight(pivot);
      }
    } else {
      this.root = pivot;
    }
    pivot.setParent(root.getParent());
    root.setLeft(pivot.getRight());
    if (root.hasLeft()) {
      root.getLeft().setParent(root);
    }
    pivot.setRight(root);
    pivot.getRight().setParent(pivot);
    this.updateWeight(root);
    this.updateWeight(pivot);
  }
  isLeftChild(node) {
    if (node && node.hasParent()) {
      return node.getParent().getLeft() === node;
    }
    return false;
  }
  isRightChild(node) {
    if (node && node.hasParent()) {
      return node.getParent().getRight() === node;
    }
    return false;
  }
}
var PrimitiveType = /* @__PURE__ */ ((PrimitiveType2) => {
  PrimitiveType2[PrimitiveType2["Null"] = 0] = "Null";
  PrimitiveType2[PrimitiveType2["Boolean"] = 1] = "Boolean";
  PrimitiveType2[PrimitiveType2["Integer"] = 2] = "Integer";
  PrimitiveType2[PrimitiveType2["Long"] = 3] = "Long";
  PrimitiveType2[PrimitiveType2["Double"] = 4] = "Double";
  PrimitiveType2[PrimitiveType2["String"] = 5] = "String";
  PrimitiveType2[PrimitiveType2["Bytes"] = 6] = "Bytes";
  PrimitiveType2[PrimitiveType2["Date"] = 7] = "Date";
  return PrimitiveType2;
})(PrimitiveType || {});
class Primitive extends CRDTElement {
  constructor(value, createdAt) {
    super(createdAt);
    __publicField(this, "valueType");
    __publicField(this, "value");
    this.valueType = Primitive.getPrimitiveType(value);
    this.value = value === void 0 ? null : value;
  }
  /**
   * `of` creates a new instance of Primitive.
   */
  static of(value, createdAt) {
    return new Primitive(value, createdAt);
  }
  /**
   * `valueFromBytes` parses the given bytes into value.
   */
  static valueFromBytes(primitiveType, bytes) {
    switch (primitiveType) {
      case 0:
        return null;
      case 1:
        return bytes[0] ? true : false;
      case 2:
        return bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24;
      case 4: {
        const view = new DataView(bytes.buffer);
        bytes.forEach(function(b, i) {
          view.setUint8(i, b);
        });
        return view.getFloat64(0, true);
      }
      case 5:
        return new TextDecoder("utf-8").decode(bytes);
      case 3:
        return Long.fromBytesLE(Array.from(bytes));
      case 6:
        return bytes;
      case 7:
        return new Date(Long.fromBytesLE(Array.from(bytes), true).toNumber());
      default:
        throw new YorkieError(
          Code.Unimplemented,
          `unimplemented type: ${primitiveType}`
        );
    }
  }
  /**
   * `toJSON` returns the JSON encoding of the value.
   */
  toJSON() {
    if (this.valueType === 5) {
      return `"${escapeString(this.value)}"`;
    }
    return `${this.value}`;
  }
  /**
   * `toSortedJSON` returns the sorted JSON encoding of the value.
   */
  toSortedJSON() {
    return this.toJSON();
  }
  /**
   * `toJSForTest` returns value with meta data for testing.
   */
  toJSForTest() {
    return {
      createdAt: this.getCreatedAt().toTestString(),
      value: this.value,
      type: "YORKIE_PRIMITIVE"
    };
  }
  /**
   * `deepcopy` copies itself deeply.
   */
  deepcopy() {
    const primitive = Primitive.of(this.value, this.getCreatedAt());
    primitive.setMovedAt(this.getMovedAt());
    primitive.setRemovedAt(this.getRemovedAt());
    return primitive;
  }
  /**
   * `getType` returns the type of the value.
   */
  getType() {
    return this.valueType;
  }
  /**
   * `getPrimitiveType` returns the primitive type of the value.
   */
  static getPrimitiveType(value) {
    switch (typeof value) {
      case "undefined":
        return 0;
      case "boolean":
        return 1;
      case "number":
        if (this.isInteger(value)) {
          return 2;
        } else {
          return 4;
        }
      case "string":
        return 5;
      case "object":
        if (value === null) {
          return 0;
        } else if (value instanceof Long) {
          return 3;
        } else if (value instanceof Uint8Array) {
          return 6;
        } else if (value instanceof Date) {
          return 7;
        }
    }
    return;
  }
  /**
   * `isSupport` check if the given value is supported type.
   */
  static isSupport(value) {
    const primitiveType = Primitive.getPrimitiveType(value);
    if (primitiveType === void 0) {
      return false;
    }
    return true;
  }
  /**
   * `isInteger` checks if the given number is integer.
   */
  static isInteger(num) {
    return num % 1 === 0;
  }
  /**
   * `isNumericType` checks numeric type by JSONPrimitive
   */
  isNumericType() {
    const t = this.valueType;
    return t === 2 || t === 3 || t === 4;
  }
  /**
   * `getValue` returns the value of Primitive.
   */
  getValue() {
    return this.value;
  }
  /**
   * `toBytes` creates an array representing the value.
   */
  toBytes() {
    switch (this.valueType) {
      case 0: {
        return new Uint8Array();
      }
      case 1: {
        const boolVal = this.value;
        return boolVal ? new Uint8Array([1]) : new Uint8Array([0]);
      }
      case 2: {
        const intVal = this.value;
        return new Uint8Array([
          intVal & 255,
          intVal >> 8 & 255,
          intVal >> 16 & 255,
          intVal >> 24 & 255
        ]);
      }
      case 4: {
        const doubleVal = this.value;
        const uint8Array = new Uint8Array(8);
        const view = new DataView(uint8Array.buffer);
        view.setFloat64(0, doubleVal, true);
        return uint8Array;
      }
      case 5: {
        return new TextEncoder().encode(this.value);
      }
      case 3: {
        const longVal = this.value;
        const longToBytes = longVal.toBytesLE();
        return Uint8Array.from(longToBytes);
      }
      case 6: {
        const bytesVal = this.value;
        return bytesVal;
      }
      case 7: {
        const dateVal = this.value;
        const dateToBytes = Long.fromNumber(
          dateVal.getTime(),
          true
        ).toBytesLE();
        return Uint8Array.from(dateToBytes);
      }
      default:
        throw new YorkieError(
          Code.Unimplemented,
          `unimplemented type: ${this.valueType}`
        );
    }
  }
}
class RGATreeListNode extends SplayNode {
  constructor(value) {
    super(value);
    __publicField(this, "prev");
    __publicField(this, "next");
    this.value = value;
  }
  /**
   * `createAfter` creates a new node after the given node.
   */
  static createAfter(prev, value) {
    const newNode = new RGATreeListNode(value);
    const prevNext = prev.next;
    prev.next = newNode;
    newNode.prev = prev;
    newNode.next = prevNext;
    if (prevNext) {
      prevNext.prev = newNode;
    }
    return newNode;
  }
  /**
   * `remove` removes value based on removing time.
   */
  remove(removedAt) {
    return this.value.remove(removedAt);
  }
  /**
   * `getCreatedAt` returns creation time of this value
   */
  getCreatedAt() {
    return this.value.getCreatedAt();
  }
  /**
   * `getPositionedAt` returns the time of this element when it was positioned
   * in the array.
   */
  getPositionedAt() {
    return this.value.getPositionedAt();
  }
  /**
   * `release` releases prev and next node.
   */
  release() {
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }
    this.prev = void 0;
    this.next = void 0;
  }
  /**
   * `getLength` returns the length of this node.
   */
  getLength() {
    return this.value.isRemoved() ? 0 : 1;
  }
  /**
   * `getPrev` returns a previous node.
   */
  getPrev() {
    return this.prev;
  }
  /**
   * `getNext` returns a next node.
   */
  getNext() {
    return this.next;
  }
  /**
   * `getValue` returns a element value.
   */
  getValue() {
    return this.value;
  }
  /**
   * `isRemoved` checks if the value was removed.
   */
  isRemoved() {
    return this.value.isRemoved();
  }
}
class RGATreeList {
  constructor() {
    __publicField(this, "dummyHead");
    __publicField(this, "last");
    __publicField(this, "nodeMapByIndex");
    __publicField(this, "nodeMapByCreatedAt");
    const dummyValue = Primitive.of(0, InitialTimeTicket);
    dummyValue.setRemovedAt(InitialTimeTicket);
    this.dummyHead = new RGATreeListNode(dummyValue);
    this.last = this.dummyHead;
    this.nodeMapByIndex = new SplayTree();
    this.nodeMapByCreatedAt = /* @__PURE__ */ new Map();
    this.nodeMapByIndex.insert(this.dummyHead);
    this.nodeMapByCreatedAt.set(
      this.dummyHead.getCreatedAt().toIDString(),
      this.dummyHead
    );
  }
  /**
   * `create` creates instance of RGATreeList.
   */
  static create() {
    return new RGATreeList();
  }
  /**
   * `length` returns size of RGATreeList.
   */
  get length() {
    return this.nodeMapByIndex.length;
  }
  /**
   * `findNextBeforeExecutedAt` returns the node by the given createdAt and
   * executedAt. It passes through nodes created after executedAt from the
   * given node and returns the next node.
   * @param createdAt - created time
   * @param executedAt - executed time
   * @returns next node
   */
  findNextBeforeExecutedAt(createdAt, executedAt) {
    let node = this.nodeMapByCreatedAt.get(createdAt.toIDString());
    if (!node) {
      logger.fatal(`cant find the given node: ${createdAt.toIDString()}`);
    }
    while (node.getNext() && node.getNext().getPositionedAt().after(executedAt)) {
      node = node.getNext();
    }
    return node;
  }
  release(node) {
    if (this.last === node) {
      this.last = node.getPrev();
    }
    node.release();
    this.nodeMapByIndex.delete(node);
    this.nodeMapByCreatedAt.delete(node.getValue().getCreatedAt().toIDString());
  }
  /**
   * `insertAfter` adds a new node with the value after the given node.
   */
  insertAfter(prevCreatedAt, value, executedAt = value.getCreatedAt()) {
    const prevNode = this.findNextBeforeExecutedAt(prevCreatedAt, executedAt);
    const newNode = RGATreeListNode.createAfter(prevNode, value);
    if (prevNode === this.last) {
      this.last = newNode;
    }
    this.nodeMapByIndex.insertAfter(prevNode, newNode);
    this.nodeMapByCreatedAt.set(newNode.getCreatedAt().toIDString(), newNode);
  }
  /**
   * `moveAfter` moves the given `createdAt` element
   * after the `prevCreatedAt` element.
   */
  moveAfter(prevCreatedAt, createdAt, executedAt) {
    const prevNode = this.nodeMapByCreatedAt.get(prevCreatedAt.toIDString());
    if (!prevNode) {
      logger.fatal(`cant find the given node: ${prevCreatedAt.toIDString()}`);
    }
    const node = this.nodeMapByCreatedAt.get(createdAt.toIDString());
    if (!node) {
      logger.fatal(`cant find the given node: ${createdAt.toIDString()}`);
    }
    if (prevNode !== node && (!node.getValue().getMovedAt() || executedAt.after(node.getValue().getMovedAt()))) {
      this.release(node);
      this.insertAfter(prevNode.getCreatedAt(), node.getValue(), executedAt);
      node.getValue().setMovedAt(executedAt);
    }
  }
  /**
   * `insert` adds the given element after the last node.
   */
  insert(value) {
    this.insertAfter(this.last.getCreatedAt(), value);
  }
  /**
   * `getByID` returns the element of the given creation time.
   */
  getByID(createdAt) {
    return this.nodeMapByCreatedAt.get(createdAt.toIDString());
  }
  /**
   * `subPathOf` returns the sub path of the given element.
   */
  subPathOf(createdAt) {
    const node = this.nodeMapByCreatedAt.get(createdAt.toIDString());
    if (!node) {
      return;
    }
    return String(this.nodeMapByIndex.indexOf(node));
  }
  /**
   * `purge` physically purges element.
   */
  purge(element) {
    const node = this.nodeMapByCreatedAt.get(
      element.getCreatedAt().toIDString()
    );
    if (!node) {
      logger.fatal(
        `fail to find the given createdAt: ${element.getCreatedAt().toIDString()}`
      );
    }
    this.release(node);
  }
  /**
   * `getByIndex` returns node of the given index.
   */
  getByIndex(idx) {
    if (idx >= this.length) {
      return;
    }
    const [node, offset] = this.nodeMapByIndex.find(idx);
    let rgaNode = node;
    if (idx === 0 && node === this.dummyHead || offset > 0) {
      do {
        if (rgaNode) {
          rgaNode = rgaNode.getNext();
        }
      } while (rgaNode && rgaNode.isRemoved());
    }
    return rgaNode;
  }
  /**
   * `getPrevCreatedAt` returns a creation time of the previous node.
   */
  getPrevCreatedAt(createdAt) {
    let node = this.nodeMapByCreatedAt.get(createdAt.toIDString());
    do {
      node = node.getPrev();
    } while (this.dummyHead !== node && node.isRemoved());
    return node.getValue().getCreatedAt();
  }
  /**
   * `delete` deletes the node of the given creation time.
   */
  delete(createdAt, editedAt) {
    const node = this.nodeMapByCreatedAt.get(createdAt.toIDString());
    const alreadyRemoved = node.isRemoved();
    if (node.remove(editedAt) && !alreadyRemoved) {
      this.nodeMapByIndex.splayNode(node);
    }
    return node.getValue();
  }
  /**
   * `deleteByIndex` deletes the node of the given index.
   */
  deleteByIndex(index, editedAt) {
    const node = this.getByIndex(index);
    if (!node) {
      return;
    }
    if (node.remove(editedAt)) {
      this.nodeMapByIndex.splayNode(node);
    }
    return node.getValue();
  }
  /**
   * `getHead` returns the value of head elements.
   */
  getHead() {
    return this.dummyHead.getValue();
  }
  /**
   * `getLast` returns the value of last elements.
   */
  getLast() {
    return this.last.getValue();
  }
  /**
   * `getLastCreatedAt` returns the creation time of last element.
   */
  getLastCreatedAt() {
    return this.last.getCreatedAt();
  }
  /**
   * `toTestString` returns a String containing the meta data of the node id
   * for debugging purpose.
   */
  toTestString() {
    const json = [];
    for (const node of this) {
      const elem = `${node.getCreatedAt().toIDString()}:${node.getValue().toJSON()}`;
      if (node.isRemoved()) {
        json.push(`{${elem}}`);
      } else {
        json.push(`[${elem}]`);
      }
    }
    return json.join("");
  }
  // eslint-disable-next-line jsdoc/require-jsdoc
  *[Symbol.iterator]() {
    let node = this.dummyHead.getNext();
    while (node) {
      yield node;
      node = node.getNext();
    }
  }
}
class CRDTArray extends CRDTContainer {
  constructor(createdAt, elements) {
    super(createdAt);
    __publicField(this, "elements");
    this.elements = elements;
  }
  /**
   * `create` creates a new instance of Array.
   */
  static create(createdAt, value) {
    if (!value) {
      return new CRDTArray(createdAt, RGATreeList.create());
    }
    const elements = RGATreeList.create();
    for (const v of value) {
      elements.insertAfter(elements.getLastCreatedAt(), v.deepcopy());
    }
    return new CRDTArray(createdAt, elements);
  }
  /**
   * `subPathOf` returns the sub path of the given element.
   */
  subPathOf(createdAt) {
    return this.elements.subPathOf(createdAt);
  }
  /**
   * `purge` physically purge the given element.
   */
  purge(element) {
    this.elements.purge(element);
  }
  /**
   * `insertAfter` adds a new node after the the given node.
   */
  insertAfter(prevCreatedAt, value) {
    this.elements.insertAfter(prevCreatedAt, value);
  }
  /**
   * `moveAfter` moves the given `createdAt` element after the `prevCreatedAt`.
   */
  moveAfter(prevCreatedAt, createdAt, executedAt) {
    this.elements.moveAfter(prevCreatedAt, createdAt, executedAt);
  }
  /**
   * `get` returns the element of the given index.
   */
  get(index) {
    const node = this.elements.getByIndex(index);
    return node == null ? void 0 : node.getValue();
  }
  /**
   * `getByID` returns the element of the given createAt.
   */
  getByID(createdAt) {
    const node = this.elements.getByID(createdAt);
    return node == null ? void 0 : node.getValue();
  }
  /**
   * `getHead` returns dummy head element.
   */
  getHead() {
    return this.elements.getHead();
  }
  /**
   * `getLast` returns last element.
   */
  getLast() {
    return this.elements.getLast();
  }
  /**
   * `getPrevCreatedAt` returns the creation time of the previous node.
   */
  getPrevCreatedAt(createdAt) {
    return this.elements.getPrevCreatedAt(createdAt);
  }
  /**
   * `delete` deletes the element of the given creation time.
   */
  delete(createdAt, editedAt) {
    return this.elements.delete(createdAt, editedAt);
  }
  /**
   * `deleteByIndex` deletes the element of given index and editedAt.
   */
  deleteByIndex(index, editedAt) {
    return this.elements.deleteByIndex(index, editedAt);
  }
  /**
   * `getLastCreatedAt` get last created element.
   */
  getLastCreatedAt() {
    return this.elements.getLastCreatedAt();
  }
  /**
   * `length` returns length of this elements.
   */
  get length() {
    return this.elements.length;
  }
  /**
   * eslint-disable-next-line jsdoc/require-jsdoc
   * @internal
   */
  *[Symbol.iterator]() {
    for (const node of this.elements) {
      if (!node.isRemoved()) {
        yield node.getValue();
      }
    }
  }
  /**
   * `toTestString` returns a String containing the meta data of this value
   * for debugging purpose.
   */
  toTestString() {
    return this.elements.toTestString();
  }
  /**
   * `getDescendants` traverse the descendants of this array.
   */
  getDescendants(callback) {
    for (const node of this.elements) {
      const element = node.getValue();
      if (callback(element, this)) {
        return;
      }
      if (element instanceof CRDTContainer) {
        element.getDescendants(callback);
      }
    }
  }
  /**
   * `toJSON` returns the JSON encoding of this array.
   */
  toJSON() {
    const json = [];
    for (const value of this) {
      json.push(value.toJSON());
    }
    return `[${json.join(",")}]`;
  }
  /**
   * `toJS` return the javascript object of this array.
   */
  toJS() {
    return JSON.parse(this.toJSON());
  }
  /**
   * `toJSForTest` returns value with meta data for testing.
   */
  toJSForTest() {
    const values = {};
    for (let i = 0; i < this.length; i++) {
      const { createdAt, value, type } = this.get(i).toJSForTest();
      values[i] = {
        key: String(i),
        createdAt,
        value,
        type
      };
    }
    return {
      createdAt: this.getCreatedAt().toTestString(),
      value: values,
      type: "YORKIE_ARRAY"
    };
  }
  /**
   * `toSortedJSON` returns the sorted JSON encoding of this array.
   */
  toSortedJSON() {
    return this.toJSON();
  }
  /**
   * `getElements` returns an array of elements contained in this RGATreeList.
   */
  getElements() {
    return this.elements;
  }
  /**
   * `deepcopy` copies itself deeply.
   */
  deepcopy() {
    const clone = CRDTArray.create(this.getCreatedAt());
    for (const node of this.elements) {
      clone.elements.insertAfter(
        clone.getLastCreatedAt(),
        node.getValue().deepcopy()
      );
    }
    clone.remove(this.getRemovedAt());
    return clone;
  }
}
class RemoveOperation extends Operation {
  constructor(parentCreatedAt, createdAt, executedAt) {
    super(parentCreatedAt, executedAt);
    __publicField(this, "createdAt");
    this.createdAt = createdAt;
  }
  /**
   * `create` creates a new instance of RemoveOperation.
   */
  static create(parentCreatedAt, createdAt, executedAt) {
    return new RemoveOperation(parentCreatedAt, createdAt, executedAt);
  }
  /**
   * `execute` executes this operation on the given `CRDTRoot`.
   */
  execute(root, source) {
    var _a;
    const container = root.findByCreatedAt(
      this.getParentCreatedAt()
    );
    if (!container) {
      logger.fatal(`fail to find ${this.getParentCreatedAt()}`);
    }
    if (!(container instanceof CRDTContainer)) {
      logger.fatal(`only object and array can execute remove: ${container}`);
    }
    if (source === OpSource.UndoRedo) {
      let parent = container.getByID(this.createdAt);
      while (parent) {
        if (parent.getRemovedAt()) {
          return;
        }
        parent = (_a = root.findElementPairByCreatedAt(parent.getCreatedAt())) == null ? void 0 : _a.parent;
      }
    }
    const key = container.subPathOf(this.createdAt);
    const reverseOp = this.toReverseOperation(container);
    const elem = container.delete(this.createdAt, this.getExecutedAt());
    root.registerRemovedElement(elem);
    const opInfos = container instanceof CRDTArray ? [
      {
        type: "remove",
        path: root.createPath(this.getParentCreatedAt()),
        index: Number(key)
      }
    ] : [
      {
        type: "remove",
        path: root.createPath(this.getParentCreatedAt()),
        key
      }
    ];
    return { opInfos, reverseOp };
  }
  /**
   * `toReverseOperation` returns the reverse operation of this operation.
   */
  toReverseOperation(parentObject) {
    if (parentObject instanceof CRDTObject) {
      const key = parentObject.subPathOf(this.createdAt);
      if (key !== void 0) {
        const value = parentObject.get(key);
        if (value !== void 0) {
          return SetOperation.create(
            key,
            value.deepcopy(),
            this.getParentCreatedAt()
          );
        }
      }
    }
  }
  /**
   * `getEffectedCreatedAt` returns the creation time of the effected element.
   */
  getEffectedCreatedAt() {
    return this.getParentCreatedAt();
  }
  /**
   * `toTestString` returns a string containing the meta data.
   */
  toTestString() {
    return `${this.getParentCreatedAt().toTestString()}.REMOVE.${this.createdAt.toTestString()}`;
  }
  /**
   * `getCreatedAt` returns the creation time of the target element.
   */
  getCreatedAt() {
    return this.createdAt;
  }
}
class SetOperation extends Operation {
  constructor(key, value, parentCreatedAt, executedAt) {
    super(parentCreatedAt, executedAt);
    __publicField(this, "key");
    __publicField(this, "value");
    this.key = key;
    this.value = value;
  }
  /**
   * `create` creates a new instance of SetOperation.
   */
  static create(key, value, parentCreatedAt, executedAt) {
    return new SetOperation(key, value, parentCreatedAt, executedAt);
  }
  /**
   * `execute` executes this operation on the given `CRDTRoot`.
   */
  execute(root, source) {
    var _a;
    const obj = root.findByCreatedAt(this.getParentCreatedAt());
    if (!obj) {
      logger.fatal(`fail to find ${this.getParentCreatedAt()}`);
    }
    if (!(obj instanceof CRDTObject)) {
      logger.fatal(`fail to execute, only object can execute set`);
    }
    if (source === OpSource.UndoRedo) {
      let parent = obj;
      while (parent) {
        if (parent.getRemovedAt()) {
          return;
        }
        parent = (_a = root.findElementPairByCreatedAt(parent.getCreatedAt())) == null ? void 0 : _a.parent;
      }
    }
    const previousValue = obj.get(this.key);
    const reverseOp = this.toReverseOperation(previousValue);
    const value = this.value.deepcopy();
    const removed = obj.set(this.key, value, this.getExecutedAt());
    if (source === OpSource.UndoRedo && root.findByCreatedAt(value.getCreatedAt())) {
      root.deregisterElement(value);
    }
    root.registerElement(value, obj);
    if (removed) {
      root.registerRemovedElement(removed);
    }
    return {
      opInfos: [
        {
          type: "set",
          path: root.createPath(this.getParentCreatedAt()),
          key: this.key
        }
      ],
      reverseOp
    };
  }
  /**
   * `toReverseOperation` returns the reverse operation of this operation.
   */
  toReverseOperation(value) {
    let reverseOp = RemoveOperation.create(
      this.getParentCreatedAt(),
      this.value.getCreatedAt()
    );
    if (value !== void 0 && !value.isRemoved()) {
      reverseOp = SetOperation.create(
        this.key,
        value.deepcopy(),
        this.getParentCreatedAt()
      );
    }
    return reverseOp;
  }
  /**
   * `getEffectedCreatedAt` returns the creation time of the effected element.
   */
  getEffectedCreatedAt() {
    return this.value.getCreatedAt();
  }
  /**
   * `toTestString` returns a string containing the meta data.
   */
  toTestString() {
    return `${this.getParentCreatedAt().toTestString()}.SET.${this.key}=${this.value.toSortedJSON()}`;
  }
  /**
   * `getKey` returns the key of this operation.
   */
  getKey() {
    return this.key;
  }
  /**
   * `getValue` returns the value of this operation.
   */
  getValue() {
    return this.value;
  }
}
class AddOperation extends Operation {
  constructor(parentCreatedAt, prevCreatedAt, value, executedAt) {
    super(parentCreatedAt, executedAt);
    __publicField(this, "prevCreatedAt");
    __publicField(this, "value");
    this.prevCreatedAt = prevCreatedAt;
    this.value = value;
  }
  /**
   * `create` creates a new instance of AddOperation.
   */
  static create(parentCreatedAt, prevCreatedAt, value, executedAt) {
    return new AddOperation(parentCreatedAt, prevCreatedAt, value, executedAt);
  }
  /**
   * `execute` executes this operation on the given `CRDTRoot`.
   */
  execute(root) {
    const parentObject = root.findByCreatedAt(this.getParentCreatedAt());
    if (!parentObject) {
      logger.fatal(`fail to find ${this.getParentCreatedAt()}`);
    }
    if (!(parentObject instanceof CRDTArray)) {
      logger.fatal(`fail to execute, only array can execute add`);
    }
    const array = parentObject;
    const value = this.value.deepcopy();
    array.insertAfter(this.prevCreatedAt, value);
    root.registerElement(value, array);
    return {
      opInfos: [
        {
          type: "add",
          path: root.createPath(this.getParentCreatedAt()),
          index: Number(array.subPathOf(this.getEffectedCreatedAt()))
        }
      ]
    };
  }
  /**
   * `getEffectedCreatedAt` returns the creation time of the effected element.
   */
  getEffectedCreatedAt() {
    return this.value.getCreatedAt();
  }
  /**
   * `toTestString` returns a string containing the meta data.
   */
  toTestString() {
    return `${this.getParentCreatedAt().toTestString()}.ADD.${this.value.toJSON()}`;
  }
  /**
   * `getPrevCreatedAt` returns the creation time of previous element.
   */
  getPrevCreatedAt() {
    return this.prevCreatedAt;
  }
  /**
   * `getValue` returns the value of this operation.
   */
  getValue() {
    return this.value;
  }
}
class MoveOperation extends Operation {
  constructor(parentCreatedAt, prevCreatedAt, createdAt, executedAt) {
    super(parentCreatedAt, executedAt);
    __publicField(this, "prevCreatedAt");
    __publicField(this, "createdAt");
    this.prevCreatedAt = prevCreatedAt;
    this.createdAt = createdAt;
  }
  /**
   * `create` creates a new instance of MoveOperation.
   */
  static create(parentCreatedAt, prevCreatedAt, createdAt, executedAt) {
    return new MoveOperation(
      parentCreatedAt,
      prevCreatedAt,
      createdAt,
      executedAt
    );
  }
  /**
   * `execute` executes this operation on the given `CRDTRoot`.
   */
  execute(root) {
    const parentObject = root.findByCreatedAt(this.getParentCreatedAt());
    if (!parentObject) {
      logger.fatal(`fail to find ${this.getParentCreatedAt()}`);
    }
    if (!(parentObject instanceof CRDTArray)) {
      logger.fatal(`fail to execute, only array can execute move`);
    }
    const array = parentObject;
    const previousIndex = Number(array.subPathOf(this.createdAt));
    array.moveAfter(this.prevCreatedAt, this.createdAt, this.getExecutedAt());
    const index = Number(array.subPathOf(this.createdAt));
    return {
      opInfos: [
        {
          type: "move",
          path: root.createPath(this.getParentCreatedAt()),
          index,
          previousIndex
        }
      ]
    };
  }
  /**
   * `getEffectedCreatedAt` returns the creation time of the effected element.
   */
  getEffectedCreatedAt() {
    return this.createdAt;
  }
  /**
   * `toTestString` returns a string containing the meta data.
   */
  toTestString() {
    return `${this.getParentCreatedAt().toTestString()}.MOVE`;
  }
  /**
   * `getPrevCreatedAt` returns the creation time of previous element.
   */
  getPrevCreatedAt() {
    return this.prevCreatedAt;
  }
  /**
   * `getCreatedAt` returns the creation time of the target element.
   */
  getCreatedAt() {
    return this.createdAt;
  }
}
class RHTNode {
  constructor(key, value, updatedAt, isRemoved) {
    __publicField(this, "key");
    __publicField(this, "value");
    __publicField(this, "updatedAt");
    __publicField(this, "_isRemoved");
    this.key = key;
    this.value = value;
    this.updatedAt = updatedAt;
    this._isRemoved = isRemoved;
  }
  /**
   * `of` creates a new instance of RHTNode.
   */
  static of(key, value, createdAt, isRemoved) {
    return new RHTNode(key, value, createdAt, isRemoved);
  }
  /**
   * `getKey` returns a key of node.
   */
  getKey() {
    return this.key;
  }
  /**
   * `getValue` returns a value of node.
   */
  getValue() {
    return this.value;
  }
  /**
   * `getUpdatedAt` returns updated time of node.
   */
  getUpdatedAt() {
    return this.updatedAt;
  }
  /**
   * `isRemoved` returns whether the node has been removed or not.
   */
  isRemoved() {
    return this._isRemoved;
  }
  /**
   * `toIDString` returns the IDString of this node.
   */
  toIDString() {
    return `${this.updatedAt.toIDString()}:${this.key}`;
  }
  /**
   * `getRemovedAt` returns the time when this node was removed.
   */
  getRemovedAt() {
    if (this._isRemoved) {
      return this.updatedAt;
    }
    return void 0;
  }
}
class RHT {
  constructor() {
    __publicField(this, "nodeMapByKey");
    __publicField(this, "numberOfRemovedElement");
    this.nodeMapByKey = /* @__PURE__ */ new Map();
    this.numberOfRemovedElement = 0;
  }
  /**
   * `create` creates a new instance of RHT.
   */
  static create() {
    return new RHT();
  }
  /**
   * `getNodeMapByKey` returns the hashtable of RHT.
   */
  getNodeMapByKey() {
    return this.nodeMapByKey;
  }
  /**
   * `set` sets the value of the given key.
   */
  set(key, value, executedAt) {
    const prev = this.nodeMapByKey.get(key);
    if (prev && prev.isRemoved() && executedAt.after(prev.getUpdatedAt())) {
      this.numberOfRemovedElement -= 1;
    }
    if (prev === void 0 || executedAt.after(prev.getUpdatedAt())) {
      const node = RHTNode.of(key, value, executedAt, false);
      this.nodeMapByKey.set(key, node);
      if (prev !== void 0 && prev.isRemoved()) {
        return [prev, node];
      }
      return [void 0, node];
    }
    if (prev.isRemoved()) {
      return [prev, void 0];
    }
    return [void 0, void 0];
  }
  /**
   * SetInternal sets the value of the given key internally.
   */
  setInternal(key, value, executedAt, removed) {
    const node = RHTNode.of(key, value, executedAt, removed);
    this.nodeMapByKey.set(key, node);
    if (removed) {
      this.numberOfRemovedElement++;
    }
  }
  /**
   * `remove` removes the Element of the given key.
   */
  remove(key, executedAt) {
    const prev = this.nodeMapByKey.get(key);
    const gcNodes = [];
    if (prev === void 0 || executedAt.after(prev.getUpdatedAt())) {
      if (prev === void 0) {
        this.numberOfRemovedElement += 1;
        const node2 = RHTNode.of(key, "", executedAt, true);
        this.nodeMapByKey.set(key, node2);
        gcNodes.push(node2);
        return gcNodes;
      }
      const alreadyRemoved = prev.isRemoved();
      if (!alreadyRemoved) {
        this.numberOfRemovedElement += 1;
      }
      if (alreadyRemoved) {
        gcNodes.push(prev);
      }
      const node = RHTNode.of(key, prev.getValue(), executedAt, true);
      this.nodeMapByKey.set(key, node);
      gcNodes.push(node);
      return gcNodes;
    }
    return gcNodes;
  }
  /**
   * `has` returns whether the element exists of the given key or not.
   */
  has(key) {
    if (this.nodeMapByKey.has(key)) {
      const node = this.nodeMapByKey.get(key);
      return node !== void 0 && !node.isRemoved();
    }
    return false;
  }
  /**
   * `get` returns the value of the given key.
   */
  get(key) {
    if (!this.nodeMapByKey.has(key)) {
      return;
    }
    return this.nodeMapByKey.get(key).getValue();
  }
  /**
   * `deepcopy` copies itself deeply.
   */
  deepcopy() {
    const rht = new RHT();
    for (const [, node] of this.nodeMapByKey) {
      rht.setInternal(
        node.getKey(),
        node.getValue(),
        node.getUpdatedAt(),
        node.isRemoved()
      );
    }
    return rht;
  }
  /**
   * `toJSON` returns the JSON encoding of this hashtable.
   */
  toJSON() {
    if (!this.size()) {
      return "{}";
    }
    const items = [];
    for (const [key, node] of this.nodeMapByKey) {
      if (!node.isRemoved()) {
        items.push(`"${escapeString(key)}":"${escapeString(node.getValue())}"`);
      }
    }
    return `{${items.join(",")}}`;
  }
  /**
   * `size` returns the size of RHT
   */
  size() {
    return this.nodeMapByKey.size - this.numberOfRemovedElement;
  }
  /**
   * `toObject` returns the object of this hashtable.
   */
  toObject() {
    const obj = {};
    for (const [key, node] of this.nodeMapByKey) {
      if (!node.isRemoved()) {
        obj[key] = node.getValue();
      }
    }
    return obj;
  }
  // eslint-disable-next-line jsdoc/require-jsdoc
  *[Symbol.iterator]() {
    for (const [, node] of this.nodeMapByKey) {
      yield node;
    }
  }
  /**
   * `purge` purges the given child node.
   */
  purge(child) {
    const node = this.nodeMapByKey.get(child.getKey());
    if (node == void 0 || node.toIDString() != child.toIDString()) {
      return;
    }
    this.nodeMapByKey.delete(child.getKey());
    this.numberOfRemovedElement--;
  }
}
class CRDTTextValue {
  constructor(content) {
    __publicField(this, "attributes");
    __publicField(this, "content");
    this.attributes = RHT.create();
    this.content = content;
  }
  /**
   * `create` creates a instance of CRDTTextValue.
   */
  static create(content) {
    return new CRDTTextValue(content);
  }
  /**
   * `length` returns the length of value.
   */
  get length() {
    return this.content.length;
  }
  /**
   * `substring` returns a sub-string value of the given range.
   */
  substring(indexStart, indexEnd) {
    const value = new CRDTTextValue(
      this.content.substring(indexStart, indexEnd)
    );
    value.attributes = this.attributes.deepcopy();
    return value;
  }
  /**
   * `setAttr` sets attribute of the given key, updated time and value.
   */
  setAttr(key, content, updatedAt) {
    return this.attributes.set(key, content, updatedAt);
  }
  /**
   * `getAttr` returns the attributes of this value.
   */
  getAttrs() {
    return this.attributes;
  }
  /**
   * `toString` returns the string representation of this value.
   */
  toString() {
    return this.content;
  }
  /**
   * `toJSON` returns the JSON encoding of this value.
   */
  toJSON() {
    const content = escapeString(this.content);
    const attrsObj = this.attributes.toObject();
    const attrs = [];
    for (const [key, v] of Object.entries(attrsObj)) {
      const value = JSON.parse(v);
      const item = typeof value === "string" ? `"${escapeString(key)}":"${escapeString(value)}"` : `"${escapeString(key)}":${String(value)}`;
      attrs.push(item);
    }
    attrs.sort();
    if (attrs.length === 0) {
      return `{"val":"${content}"}`;
    }
    return `{"attrs":{${attrs.join(",")}},"val":"${content}"}`;
  }
  /**
   * `getAttributes` returns the attributes of this value.
   */
  getAttributes() {
    return this.attributes.toObject();
  }
  /**
   * `getContent` returns the internal content.
   */
  getContent() {
    return this.content;
  }
  /**
   * `purge` purges the given child node.
   */
  purge(node) {
    if (this.attributes && node instanceof RHTNode) {
      this.attributes.purge(node);
    }
  }
  /**
   * `getGCPairs` returns the pairs of GC.
   */
  getGCPairs() {
    const pairs = [];
    for (const node of this.attributes) {
      if (node.getRemovedAt()) {
        pairs.push({ parent: this, child: node });
      }
    }
    return pairs;
  }
}
class CRDTText extends CRDTElement {
  constructor(rgaTreeSplit, createdAt) {
    super(createdAt);
    __publicField(this, "rgaTreeSplit");
    this.rgaTreeSplit = rgaTreeSplit;
  }
  /**
   * `create` a instance of Text.
   */
  static create(rgaTreeSplit, createdAt) {
    return new CRDTText(rgaTreeSplit, createdAt);
  }
  /**
   * `edit` edits the given range with the given value and attributes.
   *
   * @internal
   */
  edit(range, content, editedAt, attributes, maxCreatedAtMapByActor) {
    const crdtTextValue = content ? CRDTTextValue.create(content) : void 0;
    if (crdtTextValue && attributes) {
      for (const [k, v] of Object.entries(attributes)) {
        crdtTextValue.setAttr(k, v, editedAt);
      }
    }
    const [caretPos, maxCreatedAtMap, pairs, valueChanges] = this.rgaTreeSplit.edit(
      range,
      editedAt,
      crdtTextValue,
      maxCreatedAtMapByActor
    );
    const changes = valueChanges.map((change) => ({
      ...change,
      value: change.value ? {
        attributes: parseObjectValues(change.value.getAttributes()),
        content: change.value.getContent()
      } : {
        attributes: void 0,
        content: ""
      },
      type: "content"
      /* Content */
    }));
    return [maxCreatedAtMap, changes, pairs, [caretPos, caretPos]];
  }
  /**
   * `setStyle` applies the style of the given range.
   * 01. split nodes with from and to
   * 02. style nodes between from and to
   *
   * @param range - range of RGATreeSplitNode
   * @param attributes - style attributes
   * @param editedAt - edited time
   * @param maxCreatedAtMapByActor - maxCreatedAtMapByActor
   * @internal
   */
  setStyle(range, attributes, editedAt, maxCreatedAtMapByActor) {
    const [, toRight] = this.rgaTreeSplit.findNodeWithSplit(range[1], editedAt);
    const [, fromRight] = this.rgaTreeSplit.findNodeWithSplit(
      range[0],
      editedAt
    );
    const changes = [];
    const nodes = this.rgaTreeSplit.findBetween(fromRight, toRight);
    const createdAtMapByActor = /* @__PURE__ */ new Map();
    const toBeStyleds = [];
    for (const node of nodes) {
      const actorID = node.getCreatedAt().getActorID();
      const maxCreatedAt = (maxCreatedAtMapByActor == null ? void 0 : maxCreatedAtMapByActor.size) ? maxCreatedAtMapByActor.has(actorID) ? maxCreatedAtMapByActor.get(actorID) : InitialTimeTicket : MaxTimeTicket;
      if (node.canStyle(editedAt, maxCreatedAt)) {
        const maxCreatedAt2 = createdAtMapByActor.get(actorID);
        const createdAt = node.getCreatedAt();
        if (!maxCreatedAt2 || createdAt.after(maxCreatedAt2)) {
          createdAtMapByActor.set(actorID, createdAt);
        }
        toBeStyleds.push(node);
      }
    }
    const pairs = [];
    for (const node of toBeStyleds) {
      if (node.isRemoved()) {
        continue;
      }
      const [fromIdx, toIdx] = this.rgaTreeSplit.findIndexesFromRange(
        node.createPosRange()
      );
      changes.push({
        type: "style",
        actor: editedAt.getActorID(),
        from: fromIdx,
        to: toIdx,
        value: {
          attributes: parseObjectValues(attributes)
        }
      });
      for (const [key, value] of Object.entries(attributes)) {
        const [prev] = node.getValue().setAttr(key, value, editedAt);
        if (prev !== void 0) {
          pairs.push({ parent: node.getValue(), child: prev });
        }
      }
    }
    return [createdAtMapByActor, pairs, changes];
  }
  /**
   * `indexRangeToPosRange` returns the position range of the given index range.
   */
  indexRangeToPosRange(fromIdx, toIdx) {
    const fromPos = this.rgaTreeSplit.indexToPos(fromIdx);
    if (fromIdx === toIdx) {
      return [fromPos, fromPos];
    }
    return [fromPos, this.rgaTreeSplit.indexToPos(toIdx)];
  }
  /**
   * `length` returns size of RGATreeList.
   */
  get length() {
    return this.rgaTreeSplit.length;
  }
  /**
   * `checkWeight` returns false when there is an incorrect weight node.
   * for debugging purpose.
   */
  checkWeight() {
    return this.rgaTreeSplit.checkWeight();
  }
  /**
   * `toJSON` returns the JSON encoding of this text.
   */
  toJSON() {
    const json = [];
    for (const node of this.rgaTreeSplit) {
      if (!node.isRemoved()) {
        json.push(node.getValue().toJSON());
      }
    }
    return `[${json.join(",")}]`;
  }
  /**
   * `toSortedJSON` returns the sorted JSON encoding of this text.
   */
  toSortedJSON() {
    return this.toJSON();
  }
  /**
   * `toJSForTest` returns value with meta data for testing.
   */
  toJSForTest() {
    return {
      createdAt: this.getCreatedAt().toTestString(),
      value: JSON.parse(this.toJSON()),
      type: "YORKIE_TEXT"
    };
  }
  /**
   * `toString` returns the string representation of this text.
   */
  toString() {
    return this.rgaTreeSplit.toString();
  }
  /**
   * `values` returns the content-attributes pair array of this text.
   */
  values() {
    const values = [];
    for (const node of this.rgaTreeSplit) {
      if (!node.isRemoved()) {
        const value = node.getValue();
        values.push({
          attributes: parseObjectValues(value.getAttributes()),
          content: value.getContent()
        });
      }
    }
    return values;
  }
  /**
   * `getRGATreeSplit` returns rgaTreeSplit.
   *
   * @internal
   */
  getRGATreeSplit() {
    return this.rgaTreeSplit;
  }
  /**
   * `toTestString` returns a String containing the meta data of this value
   * for debugging purpose.
   */
  toTestString() {
    return this.rgaTreeSplit.toTestString();
  }
  /**
   * `deepcopy` copies itself deeply.
   */
  deepcopy() {
    const text = new CRDTText(
      this.rgaTreeSplit.deepcopy(),
      this.getCreatedAt()
    );
    text.remove(this.getRemovedAt());
    return text;
  }
  /**
   * `findIndexesFromRange` returns pair of integer offsets of the given range.
   */
  findIndexesFromRange(range) {
    return this.rgaTreeSplit.findIndexesFromRange(range);
  }
  /**
   * `getGCPairs` returns the pairs of GC.
   */
  getGCPairs() {
    const pairs = [];
    for (const node of this.rgaTreeSplit) {
      if (node.getRemovedAt()) {
        pairs.push({ parent: this.rgaTreeSplit, child: node });
      }
      for (const p of node.getValue().getGCPairs()) {
        pairs.push(p);
      }
    }
    return pairs;
  }
}
class EditOperation extends Operation {
  constructor(parentCreatedAt, fromPos, toPos, maxCreatedAtMapByActor, content, attributes, executedAt) {
    super(parentCreatedAt, executedAt);
    __publicField(this, "fromPos");
    __publicField(this, "toPos");
    __publicField(this, "maxCreatedAtMapByActor");
    __publicField(this, "content");
    __publicField(this, "attributes");
    this.fromPos = fromPos;
    this.toPos = toPos;
    this.maxCreatedAtMapByActor = maxCreatedAtMapByActor;
    this.content = content;
    this.attributes = attributes;
  }
  /**
   * `create` creates a new instance of EditOperation.
   */
  static create(parentCreatedAt, fromPos, toPos, maxCreatedAtMapByActor, content, attributes, executedAt) {
    return new EditOperation(
      parentCreatedAt,
      fromPos,
      toPos,
      maxCreatedAtMapByActor,
      content,
      attributes,
      executedAt
    );
  }
  /**
   * `execute` executes this operation on the given `CRDTRoot`.
   */
  execute(root) {
    const parentObject = root.findByCreatedAt(this.getParentCreatedAt());
    if (!parentObject) {
      logger.fatal(`fail to find ${this.getParentCreatedAt()}`);
    }
    if (!(parentObject instanceof CRDTText)) {
      logger.fatal(`fail to execute, only Text can execute edit`);
    }
    const text = parentObject;
    const [, changes, pairs] = text.edit(
      [this.fromPos, this.toPos],
      this.content,
      this.getExecutedAt(),
      Object.fromEntries(this.attributes),
      this.maxCreatedAtMapByActor
    );
    for (const pair of pairs) {
      root.registerGCPair(pair);
    }
    return {
      opInfos: changes.map(({ from, to, value }) => {
        return {
          type: "edit",
          from,
          to,
          value,
          path: root.createPath(this.getParentCreatedAt())
        };
      })
    };
  }
  /**
   * `getEffectedCreatedAt` returns the creation time of the effected element.
   */
  getEffectedCreatedAt() {
    return this.getParentCreatedAt();
  }
  /**
   * `toTestString` returns a string containing the meta data.
   */
  toTestString() {
    const parent = this.getParentCreatedAt().toTestString();
    const fromPos = this.fromPos.toTestString();
    const toPos = this.toPos.toTestString();
    const content = this.content;
    return `${parent}.EDIT(${fromPos},${toPos},${content})`;
  }
  /**
   * `getFromPos` returns the start point of the editing range.
   */
  getFromPos() {
    return this.fromPos;
  }
  /**
   * `getToPos` returns the end point of the editing range.
   */
  getToPos() {
    return this.toPos;
  }
  /**
   * `getContent` returns the content of Edit.
   */
  getContent() {
    return this.content;
  }
  /**
   * `getAttributes` returns the attributes of this Edit.
   */
  getAttributes() {
    return this.attributes || /* @__PURE__ */ new Map();
  }
  /**
   * `getMaxCreatedAtMapByActor` returns the map that stores the latest creation time
   * by actor for the nodes included in the editing range.
   */
  getMaxCreatedAtMapByActor() {
    return this.maxCreatedAtMapByActor;
  }
}
class StyleOperation extends Operation {
  constructor(parentCreatedAt, fromPos, toPos, maxCreatedAtMapByActor, attributes, executedAt) {
    super(parentCreatedAt, executedAt);
    __publicField(this, "fromPos");
    __publicField(this, "toPos");
    __publicField(this, "maxCreatedAtMapByActor");
    __publicField(this, "attributes");
    this.fromPos = fromPos;
    this.toPos = toPos;
    this.maxCreatedAtMapByActor = maxCreatedAtMapByActor;
    this.attributes = attributes;
  }
  /**
   * `create` creates a new instance of StyleOperation.
   */
  static create(parentCreatedAt, fromPos, toPos, maxCreatedAtMapByActor, attributes, executedAt) {
    return new StyleOperation(
      parentCreatedAt,
      fromPos,
      toPos,
      maxCreatedAtMapByActor,
      attributes,
      executedAt
    );
  }
  /**
   * `execute` executes this operation on the given `CRDTRoot`.
   */
  execute(root) {
    const parentObject = root.findByCreatedAt(this.getParentCreatedAt());
    if (!parentObject) {
      logger.fatal(`fail to find ${this.getParentCreatedAt()}`);
    }
    if (!(parentObject instanceof CRDTText)) {
      logger.fatal(`fail to execute, only Text can execute edit`);
    }
    const text = parentObject;
    const [, pairs, changes] = text.setStyle(
      [this.fromPos, this.toPos],
      this.attributes ? Object.fromEntries(this.attributes) : {},
      this.getExecutedAt(),
      this.maxCreatedAtMapByActor
    );
    for (const pair of pairs) {
      root.registerGCPair(pair);
    }
    return {
      opInfos: changes.map(({ from, to, value }) => {
        return {
          type: "style",
          from,
          to,
          value,
          path: root.createPath(this.getParentCreatedAt())
        };
      })
    };
  }
  /**
   * `getEffectedCreatedAt` returns the creation time of the effected element.
   */
  getEffectedCreatedAt() {
    return this.getParentCreatedAt();
  }
  /**
   * `toTestString` returns a string containing the meta data.
   */
  toTestString() {
    const parent = this.getParentCreatedAt().toTestString();
    const fromPos = this.fromPos.toTestString();
    const toPos = this.toPos.toTestString();
    const attributes = this.attributes;
    return `${parent}.STYL(${fromPos},${toPos},${JSON.stringify(attributes)})`;
  }
  /**
   * `getFromPos` returns the start point of the editing range.
   */
  getFromPos() {
    return this.fromPos;
  }
  /**
   * `getToPos` returns the end point of the editing range.
   */
  getToPos() {
    return this.toPos;
  }
  /**
   * `getAttributes` returns the attributes of this operation.
   */
  getAttributes() {
    return this.attributes;
  }
  /**
   * `getMaxCreatedAtMapByActor` returns the map that stores the latest creation time
   * by actor for the nodes included in the editing range.
   */
  getMaxCreatedAtMapByActor() {
    return this.maxCreatedAtMapByActor;
  }
}
const ElementPaddingSize = 2;
const DefaultRootType = "root";
const DefaultTextType = "text";
function addSizeOfLeftSiblings(parent, offset) {
  let acc = 0;
  const siblings = parent.children;
  for (let i = 0; i < offset; i++) {
    const leftSibling = siblings[i];
    if (!leftSibling || leftSibling.isRemoved) {
      continue;
    }
    acc += leftSibling.paddedSize;
  }
  return acc;
}
class IndexTreeNode {
  constructor(type, children = []) {
    __publicField(this, "type");
    __publicField(this, "parent");
    __publicField(this, "_children");
    __publicField(this, "size");
    this.type = type;
    this.size = 0;
    this._children = children;
    if (this.isText && this._children.length > 0) {
      throw new Error(`Text node cannot have children: ${this.type}`);
    }
  }
  /**
   * `updateAncestorsSize` updates the size of the ancestors. It is used when
   * the size of the node is changed.
   */
  updateAncestorsSize() {
    let parent = this.parent;
    const sign = this.isRemoved ? -1 : 1;
    while (parent) {
      parent.size += this.paddedSize * sign;
      if (parent.isRemoved) {
        break;
      }
      parent = parent.parent;
    }
  }
  /**
   * `updateDescendantsSize` updates the size of the descendants. It is used when
   * the tree is newly created and the size of the descendants is not calculated.
   */
  updateDescendantsSize() {
    let size = 0;
    for (const child of this._children) {
      const childSize = child.updateDescendantsSize();
      if (child.isRemoved) {
        continue;
      }
      size += childSize;
    }
    this.size += size;
    return this.paddedSize;
  }
  /**
   * `isText` returns true if the node is a text node.
   */
  get isText() {
    return this.type === DefaultTextType;
  }
  /**
   * `paddedSize` returns the size of the node including padding size.
   */
  get paddedSize() {
    return this.size + (this.isText ? 0 : ElementPaddingSize);
  }
  /**
   * `isAncenstorOf` returns true if the node is an ancestor of the given node.
   */
  isAncestorOf(node) {
    return ancestorOf(this, node);
  }
  /**
   * `nextSibling` returns the next sibling of the node.
   */
  get nextSibling() {
    const offset = this.parent.findOffset(this);
    const sibling = this.parent.children[offset + 1];
    if (sibling) {
      return sibling;
    }
    return void 0;
  }
  /**
   * `prevSibling` returns the previous sibling of the node.
   */
  get prevSibling() {
    const offset = this.parent.findOffset(this);
    const sibling = this.parent.children[offset - 1];
    if (sibling) {
      return sibling;
    }
    return void 0;
  }
  /**
   * `splitText` splits the given node at the given offset.
   */
  splitText(offset, absOffset) {
    if (offset === 0 || offset === this.size) {
      return;
    }
    const leftValue = this.value.slice(0, offset);
    const rightValue = this.value.slice(offset);
    if (!rightValue.length) {
      return;
    }
    this.value = leftValue;
    const rightNode = this.cloneText(offset + absOffset);
    rightNode.value = rightValue;
    this.parent.insertAfterInternal(rightNode, this);
    return rightNode;
  }
  /**
   * `children` returns the children of the node.
   */
  get children() {
    return this._children.filter((child) => !child.isRemoved);
  }
  /**
   * `allChildren` returns all the children of the node including tombstone nodes.
   * It returns the shallow copy of the children.
   */
  get allChildren() {
    return [...this._children];
  }
  /**
   * `hasTextChild` returns true if the node's children consist of only text children.
   */
  hasTextChild() {
    return this.children.length > 0 && this.children.every((child) => child.isText);
  }
  /**
   * `append` appends the given nodes to the children.
   */
  append(...newNode) {
    if (this.isText) {
      throw new Error("Text node cannot have children");
    }
    this._children.push(...newNode);
    for (const node of newNode) {
      node.parent = this;
      node.updateAncestorsSize();
    }
  }
  /**
   * `prepend` prepends the given nodes to the children. It is only used
   * for creating a new node from snapshot.
   */
  prepend(...newNode) {
    if (this.isText) {
      throw new Error("Text node cannot have children");
    }
    this._children.unshift(...newNode);
    for (const node of newNode) {
      node.parent = this;
    }
  }
  /**
   * `insertBefore` inserts the given node before the given child.
   */
  insertBefore(newNode, referenceNode) {
    if (this.isText) {
      throw new Error("Text node cannot have children");
    }
    const offset = this._children.indexOf(referenceNode);
    if (offset === -1) {
      throw new Error("child not found");
    }
    this.insertAtInternal(newNode, offset);
    newNode.updateAncestorsSize();
  }
  /**
   * `insertAfter` inserts the given node after the given child.
   */
  insertAfter(newNode, referenceNode) {
    if (this.isText) {
      throw new Error("Text node cannot have children");
    }
    const offset = this._children.indexOf(referenceNode);
    if (offset === -1) {
      throw new Error("child not found");
    }
    this.insertAtInternal(newNode, offset + 1);
    newNode.updateAncestorsSize();
  }
  /**
   * `insertAt` inserts the given node at the given offset.
   */
  insertAt(newNode, offset) {
    if (this.isText) {
      throw new Error("Text node cannot have children");
    }
    this.insertAtInternal(newNode, offset);
    newNode.updateAncestorsSize();
  }
  /**
   * `removeChild` removes the given child.
   */
  removeChild(child) {
    if (this.isText) {
      throw new Error("Text node cannot have children");
    }
    const offset = this._children.indexOf(child);
    if (offset === -1) {
      throw new Error("child not found");
    }
    this._children.splice(offset, 1);
    child.parent = void 0;
  }
  /**
   * `splitElement` splits the given element at the given offset.
   */
  splitElement(offset, issueTimeTicket) {
    const clone = this.cloneElement(issueTimeTicket);
    this.parent.insertAfterInternal(clone, this);
    clone.updateAncestorsSize();
    const leftChildren = this.children.slice(0, offset);
    const rightChildren = this.children.slice(offset);
    this._children = leftChildren;
    clone._children = rightChildren;
    this.size = this._children.reduce(
      (acc, child) => acc + child.paddedSize,
      0
    );
    clone.size = clone._children.reduce(
      (acc, child) => acc + child.paddedSize,
      0
    );
    for (const child of clone._children) {
      child.parent = clone;
    }
    return clone;
  }
  /**
   * `insertAfterInternal` inserts the given node after the given child.
   * This method does not update the size of the ancestors.
   */
  insertAfterInternal(newNode, referenceNode) {
    if (this.isText) {
      throw new Error("Text node cannot have children");
    }
    const offset = this._children.indexOf(referenceNode);
    if (offset === -1) {
      throw new Error("child not found");
    }
    this.insertAtInternal(newNode, offset + 1);
  }
  /**
   * `insertAtInternal` inserts the given node at the given index.
   * This method does not update the size of the ancestors.
   */
  insertAtInternal(newNode, offset) {
    if (this.isText) {
      throw new Error("Text node cannot have children");
    }
    this._children.splice(offset, 0, newNode);
    newNode.parent = this;
  }
  /**
   * findOffset returns the offset of the given node in the children.
   * It excludes the removed nodes.
   */
  findOffset(node) {
    if (this.isText) {
      throw new Error("Text node cannot have children");
    }
    if (node.isRemoved) {
      const index = this._children.indexOf(node);
      const refined = this.allChildren.splice(0, index).filter((node2) => !node2.isRemoved).length;
      return refined;
    }
    return this.children.indexOf(node);
  }
  /**
   * `findBranchOffset` returns offset of the given descendant node in this node.
   * If the given node is not a descendant of this node, it returns -1.
   */
  findBranchOffset(node) {
    if (this.isText) {
      throw new Error("Text node cannot have children");
    }
    let current = node;
    while (current) {
      const offset = this._children.indexOf(current);
      if (offset !== -1) {
        return offset;
      }
      current = current.parent;
    }
    return -1;
  }
}
function ancestorOf(ancestor, node) {
  if (ancestor === node) {
    return false;
  }
  while (node.parent) {
    if (node.parent === ancestor) {
      return true;
    }
    node = node.parent;
  }
  return false;
}
var TokenType = /* @__PURE__ */ ((TokenType2) => {
  TokenType2["Start"] = "Start";
  TokenType2["End"] = "End";
  TokenType2["Text"] = "Text";
  return TokenType2;
})(TokenType || {});
function tokensBetween(root, from, to, callback) {
  if (from > to) {
    throw new Error(`from is greater than to: ${from} > ${to}`);
  }
  if (from > root.size) {
    throw new Error(`from is out of range: ${from} > ${root.size}`);
  }
  if (to > root.size) {
    throw new Error(`to is out of range: ${to} > ${root.size}`);
  }
  if (from === to) {
    return;
  }
  let pos = 0;
  for (const child of root.children) {
    if (from - child.paddedSize < pos && pos < to) {
      const fromChild = child.isText ? from - pos : from - pos - 1;
      const toChild = child.isText ? to - pos : to - pos - 1;
      const startContained = !child.isText && fromChild < 0;
      const endContained = !child.isText && toChild > child.size;
      if (child.isText || startContained) {
        callback(
          [
            child,
            child.isText ? "Text" : "Start"
            /* Start */
          ],
          endContained
        );
      }
      tokensBetween(
        child,
        Math.max(0, fromChild),
        Math.min(toChild, child.size),
        callback
      );
      if (endContained) {
        callback([
          child,
          "End"
          /* End */
        ], endContained);
      }
    }
    pos += child.paddedSize;
  }
}
function traverse(node, callback, depth = 0) {
  for (const child of node.children) {
    traverse(child, callback, depth + 1);
  }
  callback(node, depth);
}
function traverseAll(node, callback, depth = 0) {
  for (const child of node._children) {
    traverseAll(child, callback, depth + 1);
  }
  callback(node, depth);
}
function findTreePos(node, index, preferText = true) {
  if (index > node.size) {
    throw new Error(`index is out of range: ${index} > ${node.size}`);
  }
  if (node.isText) {
    return { node, offset: index };
  }
  let offset = 0;
  let pos = 0;
  for (const child of node.children) {
    if (preferText && child.isText && child.size >= index - pos) {
      return findTreePos(child, index - pos, preferText);
    }
    if (index === pos) {
      return { node, offset };
    }
    if (!preferText && child.paddedSize === index - pos) {
      return { node, offset: offset + 1 };
    }
    if (child.paddedSize > index - pos) {
      const skipOpenSize = 1;
      return findTreePos(child, index - pos - skipOpenSize, preferText);
    }
    pos += child.paddedSize;
    offset += 1;
  }
  return { node, offset };
}
function findLeftmost(node) {
  if (node.isText || node.children.length === 0) {
    return node;
  }
  return findLeftmost(node.children[0]);
}
function findTextPos(node, pathElement) {
  if (node.size < pathElement) {
    throw new Error("unacceptable path");
  }
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.size < pathElement) {
      pathElement -= child.size;
    } else {
      node = child;
      break;
    }
  }
  return { node, offset: pathElement };
}
class IndexTree {
  constructor(root) {
    __publicField(this, "root");
    this.root = root;
  }
  /**
   * `tokensBetween` returns the tokens between the given range.
   */
  tokensBetween(from, to, callback) {
    tokensBetween(this.root, from, to, callback);
  }
  /**
   * `traverse` traverses the tree with postorder traversal.
   */
  traverse(callback) {
    traverse(this.root, callback, 0);
  }
  /**
   * `traverseAll` traverses the whole tree (include tombstones) with postorder traversal.
   */
  traverseAll(callback) {
    traverseAll(this.root, callback, 0);
  }
  /**
   * findTreePos finds the position of the given index in the tree.
   */
  findTreePos(index, preferText = true) {
    return findTreePos(this.root, index, preferText);
  }
  /**
   * `treePosToPath` returns path from given treePos
   */
  treePosToPath(treePos) {
    const path = [];
    let node = treePos.node;
    if (node.isText) {
      const offset = node.parent.findOffset(node);
      if (offset === -1) {
        throw new Error("invalid treePos");
      }
      const sizeOfLeftSiblings = addSizeOfLeftSiblings(
        node.parent,
        offset
      );
      path.push(sizeOfLeftSiblings + treePos.offset);
      node = node.parent;
    } else if (node.hasTextChild()) {
      const sizeOfLeftSiblings = addSizeOfLeftSiblings(
        node,
        treePos.offset
      );
      path.push(sizeOfLeftSiblings);
    } else {
      path.push(treePos.offset);
    }
    while (node.parent) {
      const offset = node.parent.findOffset(node);
      if (offset === -1) {
        throw new Error("invalid treePos");
      }
      path.push(offset);
      node = node.parent;
    }
    return path.reverse();
  }
  /**
   * `pathToIndex` returns index from given path
   */
  pathToIndex(path) {
    const treePos = this.pathToTreePos(path);
    return this.indexOf(treePos);
  }
  /**
   * `pathToTreePos` returns treePos from given path
   */
  pathToTreePos(path) {
    if (!path.length) {
      throw new Error("unacceptable path");
    }
    let node = this.root;
    for (let i = 0; i < path.length - 1; i++) {
      const pathElement = path[i];
      node = node.children[pathElement];
      if (!node) {
        throw new Error("unacceptable path");
      }
    }
    if (node.hasTextChild()) {
      return findTextPos(node, path[path.length - 1]);
    }
    if (node.children.length < path[path.length - 1]) {
      throw new Error("unacceptable path");
    }
    return {
      node,
      offset: path[path.length - 1]
    };
  }
  /**
   * `getRoot` returns the root node of the tree.
   */
  getRoot() {
    return this.root;
  }
  /**
   * `getSize` returns the size of the tree.
   */
  get size() {
    return this.root.size;
  }
  /**
   * `findPostorderRight` finds right node of the given tree position with
   *  postorder traversal.
   */
  findPostorderRight(treePos) {
    const { node, offset } = treePos;
    if (node.isText) {
      if (node.size === offset) {
        const nextSibling = node.nextSibling;
        if (nextSibling) {
          return nextSibling;
        }
        return node.parent;
      }
      return node;
    }
    if (node.children.length === offset) {
      return node;
    }
    return findLeftmost(node.children[offset]);
  }
  /**
   * `indexOf` returns the index of the given tree position.
   */
  indexOf(pos) {
    let { node } = pos;
    const { offset } = pos;
    let size = 0;
    let depth = 1;
    if (node.isText) {
      size += offset;
      const parent = node.parent;
      const offsetOfNode = parent.findOffset(node);
      if (offsetOfNode === -1) {
        throw new Error("invalid pos");
      }
      size += addSizeOfLeftSiblings(parent, offsetOfNode);
      node = node.parent;
    } else {
      size += addSizeOfLeftSiblings(node, offset);
    }
    while (node == null ? void 0 : node.parent) {
      const parent = node.parent;
      const offsetOfNode = parent.findOffset(node);
      if (offsetOfNode === -1) {
        throw new Error("invalid pos");
      }
      size += addSizeOfLeftSiblings(parent, offsetOfNode);
      depth++;
      node = node.parent;
    }
    return size + depth - 1;
  }
  /**
   * `indexToPath` returns the path of the given index.
   */
  indexToPath(index) {
    const treePos = this.findTreePos(index);
    return this.treePosToPath(treePos);
  }
}
const DefaultComparator = (a, b) => {
  if (a === b) {
    return 0;
  } else if (a < b) {
    return -1;
  } else {
    return 1;
  }
};
class LLRBNode {
  constructor(key, value, isRed) {
    __publicField(this, "key");
    __publicField(this, "value");
    __publicField(this, "parent");
    __publicField(this, "left");
    __publicField(this, "right");
    __publicField(this, "isRed");
    this.key = key;
    this.value = value;
    this.isRed = isRed;
  }
}
class SortedMapIterator {
  constructor(root) {
    __publicField(this, "stack");
    this.stack = [];
    this.traverseInorder(root);
  }
  // TODO: Replace with iterative approach, if we encounter performance problem.
  traverseInorder(node) {
    if (!node) {
      return;
    }
    this.traverseInorder(node.left);
    this.stack.push({
      key: node.key,
      value: node.value
    });
    this.traverseInorder(node.right);
  }
}
class LLRBTree {
  constructor(comparator) {
    __publicField(this, "root");
    __publicField(this, "comparator");
    __publicField(this, "counter");
    this.comparator = typeof comparator !== "undefined" ? comparator : DefaultComparator;
    this.counter = 0;
  }
  /**
   * `put` puts the value of the given key.
   */
  put(key, value) {
    this.root = this.putInternal(key, value, this.root);
    this.root.isRed = false;
    return value;
  }
  /**
   * `get` gets a value of the given key.
   */
  get(key) {
    const node = this.getInternal(key, this.root);
    return node ? node.value : void 0;
  }
  /**
   * `remove` removes a element of key.
   */
  remove(key) {
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.isRed = true;
    }
    this.root = this.removeInternal(this.root, key);
    if (this.root) {
      this.root.isRed = false;
    }
  }
  /**
   * `getIterator` returns a new instance of SortedMapIterator.
   */
  getIterator() {
    return new SortedMapIterator(this.root);
  }
  /**
   * `values` returns value array of LLRBTree.
   */
  values() {
    const values = [];
    for (const entry of this.getIterator().stack) {
      values.push(entry.value);
    }
    return values;
  }
  /**
   * `floorEntry` returns the entry for the greatest key less than or equal to the
   *  given key. If there is no such key, returns `undefined`.
   */
  floorEntry(key) {
    let node = this.root;
    while (node) {
      const compare2 = this.comparator(key, node.key);
      if (compare2 > 0) {
        if (node.right) {
          node.right.parent = node;
          node = node.right;
        } else {
          return node;
        }
      } else if (compare2 < 0) {
        if (node.left) {
          node.left.parent = node;
          node = node.left;
        } else {
          let parent = node.parent;
          let childNode = node;
          while (parent && childNode === parent.left) {
            childNode = parent;
            parent = parent.parent;
          }
          return parent;
        }
      } else {
        return node;
      }
    }
    return;
  }
  /**
   * `lastEntry` returns last entry of LLRBTree.
   */
  lastEntry() {
    if (!this.root) {
      return this.root;
    }
    let node = this.root;
    while (node.right) {
      node = node.right;
    }
    return node;
  }
  /**
   * `size` is a size of LLRBTree.
   */
  size() {
    return this.counter;
  }
  /**
   * `isEmpty` checks if size is empty.
   */
  isEmpty() {
    return this.counter === 0;
  }
  getInternal(key, node) {
    while (node) {
      const compare2 = this.comparator(key, node.key);
      if (compare2 === 0) {
        return node;
      } else if (compare2 < 0) {
        node = node.left;
      } else if (compare2 > 0) {
        node = node.right;
      }
    }
    return;
  }
  putInternal(key, value, node) {
    if (!node) {
      this.counter += 1;
      return new LLRBNode(key, value, true);
    }
    const compare2 = this.comparator(key, node.key);
    if (compare2 < 0) {
      node.left = this.putInternal(key, value, node.left);
    } else if (compare2 > 0) {
      node.right = this.putInternal(key, value, node.right);
    } else {
      node.value = value;
    }
    if (this.isRed(node.right) && !this.isRed(node.left)) {
      node = this.rotateLeft(node);
    }
    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node);
    }
    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node);
    }
    return node;
  }
  removeInternal(node, key) {
    if (this.comparator(key, node.key) < 0) {
      if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
        node = this.moveRedLeft(node);
      }
      node.left = this.removeInternal(node.left, key);
    } else {
      if (this.isRed(node.left)) {
        node = this.rotateRight(node);
      }
      if (this.comparator(key, node.key) === 0 && !node.right) {
        this.counter -= 1;
        return;
      }
      if (!this.isRed(node.right) && !this.isRed(node.right.left)) {
        node = this.moveRedRight(node);
      }
      if (this.comparator(key, node.key) === 0) {
        this.counter -= 1;
        const smallest = this.min(node.right);
        node.value = smallest.value;
        node.key = smallest.key;
        node.right = this.removeMin(node.right);
      } else {
        node.right = this.removeInternal(node.right, key);
      }
    }
    return this.fixUp(node);
  }
  min(node) {
    if (!node.left) {
      return node;
    } else {
      return this.min(node.left);
    }
  }
  removeMin(node) {
    if (!node.left) {
      return;
    }
    if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
      node = this.moveRedLeft(node);
    }
    node.left = this.removeMin(node.left);
    return this.fixUp(node);
  }
  fixUp(node) {
    if (this.isRed(node.right)) {
      node = this.rotateLeft(node);
    }
    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node);
    }
    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node);
    }
    return node;
  }
  moveRedLeft(node) {
    this.flipColors(node);
    if (this.isRed(node.right.left)) {
      node.right = this.rotateRight(node.right);
      node = this.rotateLeft(node);
      this.flipColors(node);
    }
    return node;
  }
  moveRedRight(node) {
    this.flipColors(node);
    if (this.isRed(node.left.left)) {
      node = this.rotateRight(node);
      this.flipColors(node);
    }
    return node;
  }
  isRed(node) {
    return node && node.isRed;
  }
  rotateLeft(node) {
    const x = node.right;
    node.right = x.left;
    x.left = node;
    x.isRed = x.left.isRed;
    x.left.isRed = true;
    return x;
  }
  rotateRight(node) {
    const x = node.left;
    node.left = x.right;
    x.right = node;
    x.isRed = x.right.isRed;
    x.right.isRed = true;
    return x;
  }
  flipColors(node) {
    node.isRed = !node.isRed;
    node.left.isRed = !node.left.isRed;
    node.right.isRed = !node.right.isRed;
  }
}
class CRDTTreePos {
  constructor(parentID, leftSiblingID) {
    __publicField(this, "parentID");
    __publicField(this, "leftSiblingID");
    this.parentID = parentID;
    this.leftSiblingID = leftSiblingID;
  }
  /**
   * `of` creates a new instance of CRDTTreePos.
   */
  static of(parentID, leftSiblingID) {
    return new CRDTTreePos(parentID, leftSiblingID);
  }
  /**
   * `fromTreePos` creates a new instance of CRDTTreePos from the given TreePos.
   */
  static fromTreePos(pos) {
    const { offset } = pos;
    let { node } = pos;
    let leftNode;
    if (node.isText) {
      if (node.parent.children[0] === node && offset === 0) {
        leftNode = node.parent;
      } else {
        leftNode = node;
      }
      node = node.parent;
    } else {
      if (offset === 0) {
        leftNode = node;
      } else {
        leftNode = node.children[offset - 1];
      }
    }
    return CRDTTreePos.of(
      node.id,
      CRDTTreeNodeID.of(leftNode.getCreatedAt(), leftNode.getOffset() + offset)
    );
  }
  /**
   * `getParentID` returns the parent ID.
   */
  getParentID() {
    return this.parentID;
  }
  /**
   * `fromStruct` creates a new instance of CRDTTreeNodeID from the given struct.
   */
  static fromStruct(struct) {
    return CRDTTreePos.of(
      CRDTTreeNodeID.of(
        TimeTicket.fromStruct(struct.parentID.createdAt),
        struct.parentID.offset
      ),
      CRDTTreeNodeID.of(
        TimeTicket.fromStruct(struct.leftSiblingID.createdAt),
        struct.leftSiblingID.offset
      )
    );
  }
  /**
   * `toStruct` returns the structure of this position.
   */
  toStruct() {
    return {
      parentID: {
        createdAt: this.getParentID().getCreatedAt().toStruct(),
        offset: this.getParentID().getOffset()
      },
      leftSiblingID: {
        createdAt: this.getLeftSiblingID().getCreatedAt().toStruct(),
        offset: this.getLeftSiblingID().getOffset()
      }
    };
  }
  /**
   * `toTreeNodePair` converts the pos to parent and left sibling nodes.
   * If the position points to the middle of a node, then the left sibling node
   * is the node that contains the position. Otherwise, the left sibling node is
   * the node that is located at the left of the position.
   */
  toTreeNodePair(tree) {
    const parentID = this.getParentID();
    const leftSiblingID = this.getLeftSiblingID();
    const parentNode = tree.findFloorNode(parentID);
    let leftNode = tree.findFloorNode(leftSiblingID);
    if (!parentNode || !leftNode) {
      throw new Error(
        `cannot find node of CRDTTreePos(${parentID.toTestString()}, ${leftSiblingID.toTestString()})`
      );
    }
    if (!leftSiblingID.equals(parentID) && leftSiblingID.getOffset() > 0 && leftSiblingID.getOffset() === leftNode.id.getOffset() && leftNode.insPrevID) {
      leftNode = tree.findFloorNode(leftNode.insPrevID);
    }
    return [parentNode, leftNode];
  }
  /**
   * `getLeftSiblingID` returns the left sibling ID.
   */
  getLeftSiblingID() {
    return this.leftSiblingID;
  }
  /**
   * `equals` returns whether the given pos equals to this or not.
   */
  equals(other) {
    return this.getParentID().getCreatedAt().equals(other.getParentID().getCreatedAt()) && this.getParentID().getOffset() === other.getParentID().getOffset() && this.getLeftSiblingID().getCreatedAt().equals(other.getLeftSiblingID().getCreatedAt()) && this.getLeftSiblingID().getOffset() === other.getLeftSiblingID().getOffset();
  }
}
class CRDTTreeNodeID {
  constructor(createdAt, offset) {
    /**
     * `createdAt` is the creation time of the node.
     */
    __publicField(this, "createdAt");
    /**
     * `offset` is the distance from the beginning of the node if the node is
     * split.
     */
    __publicField(this, "offset");
    this.createdAt = createdAt;
    this.offset = offset;
  }
  /**
   * `of` creates a new instance of CRDTTreeNodeID.
   */
  static of(createdAt, offset) {
    return new CRDTTreeNodeID(createdAt, offset);
  }
  /**
   * `fromStruct` creates a new instance of CRDTTreeNodeID from the given struct.
   */
  static fromStruct(struct) {
    return CRDTTreeNodeID.of(
      TimeTicket.fromStruct(struct.createdAt),
      struct.offset
    );
  }
  /**
   * `createComparator` creates a comparator for CRDTTreeNodeID.
   */
  static createComparator() {
    return (idA, idB) => {
      const compare2 = idA.getCreatedAt().compare(idB.getCreatedAt());
      if (compare2 !== 0) {
        return compare2;
      }
      if (idA.getOffset() > idB.getOffset()) {
        return 1;
      } else if (idA.getOffset() < idB.getOffset()) {
        return -1;
      }
      return 0;
    };
  }
  /**
   * `getCreatedAt` returns the creation time of the node.
   */
  getCreatedAt() {
    return this.createdAt;
  }
  /**
   * `equals` returns whether given ID equals to this ID or not.
   */
  equals(other) {
    return this.createdAt.compare(other.createdAt) === 0 && this.offset === other.offset;
  }
  /**
   * `getOffset` returns returns the offset of the node.
   */
  getOffset() {
    return this.offset;
  }
  /**
   * `setOffset` sets the offset of the node.
   */
  setOffset(offset) {
    this.offset = offset;
  }
  /**
   * `toStruct` returns the structure of this position.
   */
  toStruct() {
    return {
      createdAt: this.createdAt.toStruct(),
      offset: this.offset
    };
  }
  /**
   * `toIDString` returns a string that can be used as an ID for this position.
   */
  toIDString() {
    return `${this.createdAt.toIDString()}:${this.offset}`;
  }
  /**
   * `toTestString` returns a string containing the meta data of the ticket
   * for debugging purpose.
   */
  toTestString() {
    return `${this.createdAt.toTestString()}/${this.offset}`;
  }
}
class CRDTTreeNode extends IndexTreeNode {
  constructor(id, type, opts, attributes, removedAt) {
    super(type);
    __publicField(this, "id");
    __publicField(this, "removedAt");
    __publicField(this, "attrs");
    /**
     * `insPrevID` is the previous node id of this node after the node is split.
     */
    __publicField(this, "insPrevID");
    /**
     * `insNextID` is the previous node id of this node after the node is split.
     */
    __publicField(this, "insNextID");
    __publicField(this, "_value", "");
    this.id = id;
    this.removedAt = removedAt;
    attributes && (this.attrs = attributes);
    if (typeof opts === "string") {
      this.value = opts;
    } else if (Array.isArray(opts)) {
      this._children = opts;
    }
  }
  /**
   * `toIDString` returns the IDString of this node.
   */
  toIDString() {
    return this.id.toIDString();
  }
  /**
   * `getRemovedAt` returns the time when this node was removed.
   */
  getRemovedAt() {
    return this.removedAt;
  }
  /**
   * `create` creates a new instance of CRDTTreeNode.
   */
  static create(id, type, opts, attributes) {
    return new CRDTTreeNode(id, type, opts, attributes);
  }
  /**
   * `deepcopy` copies itself deeply.
   */
  deepcopy() {
    var _a;
    const clone = new CRDTTreeNode(this.id, this.type);
    clone.removedAt = this.removedAt;
    clone._value = this._value;
    clone.size = this.size;
    clone.attrs = (_a = this.attrs) == null ? void 0 : _a.deepcopy();
    clone._children = this._children.map((child) => {
      const childClone = child.deepcopy();
      childClone.parent = clone;
      return childClone;
    });
    clone.insPrevID = this.insPrevID;
    clone.insNextID = this.insNextID;
    return clone;
  }
  /**
   * `value` returns the value of the node.
   */
  get value() {
    if (!this.isText) {
      throw new Error(`cannot get value of element node: ${this.type}`);
    }
    return this._value;
  }
  /**
   * `value` sets the value of the node.
   */
  set value(v) {
    if (!this.isText) {
      throw new Error(`cannot set value of element node: ${this.type}`);
    }
    this._value = v;
    this.size = v.length;
  }
  /**
   * `isRemoved` returns whether the node is removed or not.
   */
  get isRemoved() {
    return !!this.removedAt;
  }
  /**
   * `remove` marks the node as removed.
   */
  remove(removedAt) {
    const alived = !this.removedAt;
    if (!this.removedAt || this.removedAt.compare(removedAt) > 0) {
      this.removedAt = removedAt;
    }
    if (alived) {
      this.updateAncestorsSize();
    }
  }
  /**
   * `cloneText` clones this text node with the given offset.
   */
  cloneText(offset) {
    return new CRDTTreeNode(
      CRDTTreeNodeID.of(this.id.getCreatedAt(), offset),
      this.type,
      void 0,
      void 0,
      this.removedAt
    );
  }
  /**
   * `cloneElement` clones this element node with the given issueTimeTicket function.
   */
  cloneElement(issueTimeTicket) {
    return new CRDTTreeNode(
      CRDTTreeNodeID.of(issueTimeTicket(), 0),
      this.type,
      void 0,
      void 0,
      this.removedAt
    );
  }
  /**
   * `split` splits the given offset of this node.
   */
  split(tree, offset, issueTimeTicket) {
    const split = this.isText ? this.splitText(offset, this.id.getOffset()) : this.splitElement(offset, issueTimeTicket);
    if (split) {
      split.insPrevID = this.id;
      if (this.insNextID) {
        const insNext = tree.findFloorNode(this.insNextID);
        insNext.insPrevID = split.id;
        split.insNextID = this.insNextID;
      }
      this.insNextID = split.id;
      tree.registerNode(split);
    }
    return split;
  }
  /**
   * `getCreatedAt` returns the creation time of this element.
   */
  getCreatedAt() {
    return this.id.getCreatedAt();
  }
  /**
   * `getOffset` returns the offset of a pos.
   */
  getOffset() {
    return this.id.getOffset();
  }
  /**
   * `canDelete` checks if node is able to delete.
   */
  canDelete(editedAt, maxCreatedAt) {
    return !this.getCreatedAt().after(maxCreatedAt) && (!this.removedAt || editedAt.after(this.removedAt));
  }
  /**
   * `canStyle` checks if node is able to style.
   */
  canStyle(editedAt, maxCreatedAt) {
    if (this.isText) {
      return false;
    }
    return !this.getCreatedAt().after(maxCreatedAt) && (!this.removedAt || editedAt.after(this.removedAt));
  }
  /**
   * `setAttrs` sets the attributes of the node.
   */
  setAttrs(attrs, editedAt) {
    if (!this.attrs) {
      this.attrs = new RHT();
    }
    const pairs = new Array();
    for (const [key, value] of Object.entries(attrs)) {
      pairs.push(this.attrs.set(key, value, editedAt));
    }
    return pairs;
  }
  /**
   * `purge` purges the given child node.
   */
  purge(node) {
    if (this.attrs) {
      this.attrs.purge(node);
    }
  }
  /**
   * `getGCPairs` returns the pairs of GC.
   */
  getGCPairs() {
    const pairs = [];
    if (!this.attrs) {
      return pairs;
    }
    for (const node of this.attrs) {
      if (node.getRemovedAt()) {
        pairs.push({ parent: this, child: node });
      }
    }
    return pairs;
  }
}
function toTreeNode(node) {
  var _a;
  if (node.isText) {
    const currentNode = node;
    return {
      type: currentNode.type,
      value: currentNode.value
    };
  }
  const treeNode = {
    type: node.type,
    children: node.children.map(toTreeNode)
  };
  if (node.attrs) {
    treeNode.attributes = parseObjectValues((_a = node.attrs) == null ? void 0 : _a.toObject());
  }
  return treeNode;
}
function toXML(node) {
  if (node.isText) {
    const currentNode = node;
    return currentNode.value;
  }
  let attrs = "";
  if (node.attrs && node.attrs.size()) {
    attrs = " " + Array.from(node.attrs).filter((n) => !n.isRemoved()).sort((a, b) => a.getKey().localeCompare(b.getKey())).map((n) => {
      const obj = JSON.parse(n.getValue());
      if (typeof obj === "string") {
        return `${n.getKey()}="${obj}"`;
      }
      return `${n.getKey()}="${escapeString(n.getValue())}"`;
    }).join(" ");
  }
  return `<${node.type}${attrs}>${node.children.map((child) => toXML(child)).join("")}</${node.type}>`;
}
function toTestTreeNode(node) {
  if (node.isText) {
    const currentNode = node;
    return {
      type: currentNode.type,
      value: currentNode.value,
      size: currentNode.size,
      isRemoved: currentNode.isRemoved
    };
  }
  return {
    type: node.type,
    children: node.children.map(toTestTreeNode),
    size: node.size,
    isRemoved: node.isRemoved
  };
}
class CRDTTree extends CRDTElement {
  constructor(root, createdAt) {
    super(createdAt);
    __publicField(this, "indexTree");
    __publicField(this, "nodeMapByID");
    this.indexTree = new IndexTree(root);
    this.nodeMapByID = new LLRBTree(CRDTTreeNodeID.createComparator());
    this.indexTree.traverseAll((node) => {
      this.nodeMapByID.put(node.id, node);
    });
  }
  /**
   * `create` creates a new instance of `CRDTTree`.
   */
  static create(root, ticket) {
    return new CRDTTree(root, ticket);
  }
  /**
   * `findFloorNode` finds node of given id.
   */
  findFloorNode(id) {
    const entry = this.nodeMapByID.floorEntry(id);
    if (!entry || !entry.key.getCreatedAt().equals(id.getCreatedAt())) {
      return;
    }
    return entry.value;
  }
  /**
   * `registerNode` registers the given node to the tree.
   */
  registerNode(node) {
    this.nodeMapByID.put(node.id, node);
  }
  /**
   * `findNodesAndSplitText` finds `TreePos` of the given `CRDTTreeNodeID` and
   * splits nodes if the position is in the middle of a text node.
   *
   * The ids of the given `pos` are the ids of the node in the CRDT perspective.
   * This is different from `TreePos` which is a position of the tree in the
   * physical perspective.
   *
   * If `editedAt` is given, then it is used to find the appropriate left node
   * for concurrent insertion.
   */
  findNodesAndSplitText(pos, editedAt) {
    const [parent, leftSibling] = pos.toTreeNodePair(this);
    let leftNode = leftSibling;
    const isLeftMost = parent === leftNode;
    const realParent = leftNode.parent && !isLeftMost ? leftNode.parent : parent;
    if (leftNode.isText) {
      leftNode.split(
        this,
        pos.getLeftSiblingID().getOffset() - leftNode.id.getOffset()
      );
    }
    if (editedAt) {
      const allChildren = realParent.allChildren;
      const index = isLeftMost ? 0 : allChildren.indexOf(leftNode) + 1;
      for (let i = index; i < allChildren.length; i++) {
        const next = allChildren[i];
        if (!next.id.getCreatedAt().after(editedAt)) {
          break;
        }
        leftNode = next;
      }
    }
    return [realParent, leftNode];
  }
  /**
   * `style` applies the given attributes of the given range.
   */
  style(range, attributes, editedAt, maxCreatedAtMapByActor) {
    const [fromParent, fromLeft] = this.findNodesAndSplitText(
      range[0],
      editedAt
    );
    const [toParent, toLeft] = this.findNodesAndSplitText(range[1], editedAt);
    const changes = [];
    const attrs = attributes ? parseObjectValues(attributes) : {};
    const createdAtMapByActor = /* @__PURE__ */ new Map();
    const pairs = [];
    this.traverseInPosRange(
      fromParent,
      fromLeft,
      toParent,
      toLeft,
      ([node]) => {
        const actorID = node.getCreatedAt().getActorID();
        const maxCreatedAt = maxCreatedAtMapByActor ? maxCreatedAtMapByActor.has(actorID) ? maxCreatedAtMapByActor.get(actorID) : InitialTimeTicket : MaxTimeTicket;
        if (node.canStyle(editedAt, maxCreatedAt) && attributes) {
          const maxCreatedAt2 = createdAtMapByActor.get(actorID);
          const createdAt = node.getCreatedAt();
          if (!maxCreatedAt2 || createdAt.after(maxCreatedAt2)) {
            createdAtMapByActor.set(actorID, createdAt);
          }
          const updatedAttrPairs = node.setAttrs(attributes, editedAt);
          const affectedAttrs = updatedAttrPairs.reduce(
            (acc, [, curr]) => {
              if (!curr) {
                return acc;
              }
              acc[curr.getKey()] = attrs[curr.getKey()];
              return acc;
            },
            {}
          );
          const parentOfNode = node.parent;
          const previousNode = node.prevSibling || node.parent;
          if (Object.keys(affectedAttrs).length > 0) {
            changes.push({
              type: "style",
              from: this.toIndex(parentOfNode, previousNode),
              to: this.toIndex(node, node),
              fromPath: this.toPath(parentOfNode, previousNode),
              toPath: this.toPath(node, node),
              actor: editedAt.getActorID(),
              value: affectedAttrs
            });
          }
          for (const [prev] of updatedAttrPairs) {
            if (prev) {
              pairs.push({ parent: node, child: prev });
            }
          }
        }
      }
    );
    return [createdAtMapByActor, pairs, changes];
  }
  /**
   * `removeStyle` removes the given attributes of the given range.
   */
  removeStyle(range, attributesToRemove, editedAt, maxCreatedAtMapByActor) {
    const [fromParent, fromLeft] = this.findNodesAndSplitText(
      range[0],
      editedAt
    );
    const [toParent, toLeft] = this.findNodesAndSplitText(range[1], editedAt);
    const changes = [];
    const createdAtMapByActor = /* @__PURE__ */ new Map();
    const pairs = [];
    this.traverseInPosRange(
      fromParent,
      fromLeft,
      toParent,
      toLeft,
      ([node]) => {
        const actorID = node.getCreatedAt().getActorID();
        const maxCreatedAt = maxCreatedAtMapByActor ? maxCreatedAtMapByActor.has(actorID) ? maxCreatedAtMapByActor.get(actorID) : InitialTimeTicket : MaxTimeTicket;
        if (node.canStyle(editedAt, maxCreatedAt) && attributesToRemove) {
          const maxCreatedAt2 = createdAtMapByActor.get(actorID);
          const createdAt = node.getCreatedAt();
          if (!maxCreatedAt2 || createdAt.after(maxCreatedAt2)) {
            createdAtMapByActor.set(actorID, createdAt);
          }
          if (!node.attrs) {
            node.attrs = new RHT();
          }
          for (const value of attributesToRemove) {
            const nodesTobeRemoved = node.attrs.remove(value, editedAt);
            for (const rhtNode of nodesTobeRemoved) {
              pairs.push({ parent: node, child: rhtNode });
            }
          }
          const parentOfNode = node.parent;
          const previousNode = node.prevSibling || node.parent;
          changes.push({
            actor: editedAt.getActorID(),
            type: "removeStyle",
            from: this.toIndex(parentOfNode, previousNode),
            to: this.toIndex(node, node),
            fromPath: this.toPath(parentOfNode, previousNode),
            toPath: this.toPath(node, node),
            value: attributesToRemove
          });
        }
      }
    );
    return [createdAtMapByActor, pairs, changes];
  }
  /**
   * `edit` edits the tree with the given range and content.
   * If the content is undefined, the range will be removed.
   */
  edit(range, contents, splitLevel, editedAt, issueTimeTicket, maxCreatedAtMapByActor) {
    const [fromParent, fromLeft] = this.findNodesAndSplitText(
      range[0],
      editedAt
    );
    const [toParent, toLeft] = this.findNodesAndSplitText(range[1], editedAt);
    const fromIdx = this.toIndex(fromParent, fromLeft);
    const fromPath = this.toPath(fromParent, fromLeft);
    const nodesToBeRemoved = [];
    const tokensToBeRemoved = [];
    const toBeMovedToFromParents = [];
    const maxCreatedAtMap = /* @__PURE__ */ new Map();
    this.traverseInPosRange(
      fromParent,
      fromLeft,
      toParent,
      toLeft,
      ([node, tokenType], ended) => {
        if (tokenType === TokenType.Start && !ended) {
          for (const child of node.children) {
            toBeMovedToFromParents.push(child);
          }
        }
        const actorID = node.getCreatedAt().getActorID();
        const maxCreatedAt = maxCreatedAtMapByActor ? maxCreatedAtMapByActor.has(actorID) ? maxCreatedAtMapByActor.get(actorID) : InitialTimeTicket : MaxTimeTicket;
        if (node.canDelete(editedAt, maxCreatedAt) || nodesToBeRemoved.includes(node.parent)) {
          const maxCreatedAt2 = maxCreatedAtMap.get(actorID);
          const createdAt = node.getCreatedAt();
          if (!maxCreatedAt2 || createdAt.after(maxCreatedAt2)) {
            maxCreatedAtMap.set(actorID, createdAt);
          }
          if (tokenType === TokenType.Text || tokenType === TokenType.Start) {
            nodesToBeRemoved.push(node);
          }
          tokensToBeRemoved.push([node, tokenType]);
        }
      }
    );
    const changes = this.makeDeletionChanges(
      tokensToBeRemoved,
      editedAt
    );
    const pairs = [];
    for (const node of nodesToBeRemoved) {
      node.remove(editedAt);
      if (node.isRemoved) {
        pairs.push({ parent: this, child: node });
      }
    }
    for (const node of toBeMovedToFromParents) {
      if (!node.removedAt) {
        fromParent.append(node);
      }
    }
    if (splitLevel > 0) {
      let splitCount = 0;
      let parent = fromParent;
      let left = fromLeft;
      while (splitCount < splitLevel) {
        parent.split(this, parent.findOffset(left) + 1, issueTimeTicket);
        left = parent;
        parent = parent.parent;
        splitCount++;
      }
      changes.push({
        type: "content",
        from: fromIdx,
        to: fromIdx,
        fromPath,
        toPath: fromPath,
        actor: editedAt.getActorID()
      });
    }
    if (contents == null ? void 0 : contents.length) {
      const aliveContents = [];
      let leftInChildren = fromLeft;
      for (const content of contents) {
        if (leftInChildren === fromParent) {
          fromParent.insertAt(content, 0);
        } else {
          fromParent.insertAfter(content, leftInChildren);
        }
        leftInChildren = content;
        traverseAll(content, (node) => {
          if (fromParent.isRemoved) {
            node.remove(editedAt);
            pairs.push({ parent: this, child: node });
          }
          this.nodeMapByID.put(node.id, node);
        });
        if (!content.isRemoved) {
          aliveContents.push(content);
        }
      }
      if (aliveContents.length) {
        const value = aliveContents.map((content) => toTreeNode(content));
        if (changes.length && changes[changes.length - 1].from === fromIdx) {
          changes[changes.length - 1].value = value;
        } else {
          changes.push({
            type: "content",
            from: fromIdx,
            to: fromIdx,
            fromPath,
            toPath: fromPath,
            actor: editedAt.getActorID(),
            value
          });
        }
      }
    }
    return [changes, pairs, maxCreatedAtMap];
  }
  /**
   * `editT` edits the given range with the given value.
   * This method uses indexes instead of a pair of TreePos for testing.
   */
  editT(range, contents, splitLevel, editedAt, issueTimeTicket) {
    const fromPos = this.findPos(range[0]);
    const toPos = this.findPos(range[1]);
    this.edit(
      [fromPos, toPos],
      contents,
      splitLevel,
      editedAt,
      issueTimeTicket
    );
  }
  /**
   * `move` move the given source range to the given target range.
   */
  move(target, source, ticket) {
    throw new Error(`not implemented: ${target}, ${source}, ${ticket}`);
  }
  /**
   * `purge` physically purges the given node.
   */
  purge(node) {
    var _a;
    (_a = node.parent) == null ? void 0 : _a.removeChild(node);
    this.nodeMapByID.remove(node.id);
    const insPrevID = node.insPrevID;
    const insNextID = node.insNextID;
    if (insPrevID) {
      const insPrev = this.findFloorNode(insPrevID);
      insPrev.insNextID = insNextID;
    }
    if (insNextID) {
      const insNext = this.findFloorNode(insNextID);
      insNext.insPrevID = insPrevID;
    }
    node.insPrevID = void 0;
    node.insNextID = void 0;
  }
  /**
   * `getGCPairs` returns the pairs of GC.
   */
  getGCPairs() {
    const pairs = [];
    this.indexTree.traverse((node) => {
      if (node.getRemovedAt()) {
        pairs.push({ parent: this, child: node });
      }
      for (const p of node.getGCPairs()) {
        pairs.push(p);
      }
    });
    return pairs;
  }
  /**
   * `findPos` finds the position of the given index in the tree.
   */
  findPos(index, preferText = true) {
    const treePos = this.indexTree.findTreePos(index, preferText);
    return CRDTTreePos.fromTreePos(treePos);
  }
  /**
   * `pathToPosRange` converts the given path of the node to the range of the position.
   */
  pathToPosRange(path) {
    const fromIdx = this.pathToIndex(path);
    return [this.findPos(fromIdx), this.findPos(fromIdx + 1)];
  }
  /**
   * `pathToPos` finds the position of the given index in the tree by path.
   */
  pathToPos(path) {
    const index = this.indexTree.pathToIndex(path);
    return this.findPos(index);
  }
  /**
   * `getRoot` returns the root node of the tree.
   */
  getRoot() {
    return this.indexTree.getRoot();
  }
  /**
   * `getSize` returns the size of the tree.
   */
  getSize() {
    return this.indexTree.size;
  }
  /**
   * `getNodeSize` returns the size of the LLRBTree.
   */
  getNodeSize() {
    return this.nodeMapByID.size();
  }
  /**
   * `getIndexTree` returns the index tree.
   */
  getIndexTree() {
    return this.indexTree;
  }
  /**
   * toXML returns the XML encoding of this tree.
   */
  toXML() {
    return toXML(this.indexTree.getRoot());
  }
  /**
   * `toJSON` returns the JSON encoding of this tree.
   */
  toJSON() {
    return JSON.stringify(this.getRootTreeNode());
  }
  /**
   * `toJSForTest` returns value with meta data for testing.
   *
   * @internal
   */
  toJSForTest() {
    return {
      createdAt: this.getCreatedAt().toTestString(),
      value: JSON.parse(this.toJSON()),
      type: "YORKIE_TREE"
    };
  }
  /**
   * `toJSInfoForTest` returns detailed TreeNode information for use in Devtools.
   *
   * @internal
   */
  toJSInfoForTest() {
    const rootNode = this.indexTree.getRoot();
    const toTreeNodeInfo = (node, parentNode = void 0, leftChildNode = void 0, depth = 0) => {
      var _a, _b, _c, _d;
      let index, path, pos;
      const treePos = node.isText ? { node, offset: 0 } : parentNode && leftChildNode ? this.toTreePos(parentNode, leftChildNode) : null;
      if (treePos) {
        index = this.indexTree.indexOf(treePos);
        path = this.indexTree.treePosToPath(treePos);
        pos = CRDTTreePos.fromTreePos(treePos).toStruct();
      }
      const nodeInfo = {
        type: node.type,
        parent: parentNode == null ? void 0 : parentNode.id.toTestString(),
        size: node.size,
        id: node.id.toTestString(),
        removedAt: (_a = node.removedAt) == null ? void 0 : _a.toTestString(),
        insPrev: (_b = node.insPrevID) == null ? void 0 : _b.toTestString(),
        insNext: (_c = node.insNextID) == null ? void 0 : _c.toTestString(),
        value: node.isText ? node.value : void 0,
        isRemoved: node.isRemoved,
        children: [],
        depth,
        attributes: node.attrs ? parseObjectValues((_d = node.attrs) == null ? void 0 : _d.toObject()) : void 0,
        index,
        path,
        pos
      };
      for (let i = 0; i < node.allChildren.length; i++) {
        const leftChildNode2 = i === 0 ? node : node.allChildren[i - 1];
        nodeInfo.children.push(
          toTreeNodeInfo(node.allChildren[i], node, leftChildNode2, depth + 1)
        );
      }
      return nodeInfo;
    };
    return toTreeNodeInfo(rootNode);
  }
  /**
   * `getRootTreeNode` returns the converted value of this tree to TreeNode.
   */
  getRootTreeNode() {
    return toTreeNode(this.indexTree.getRoot());
  }
  /**
   * `toTestTreeNode` returns the JSON of this tree for debugging.
   */
  toTestTreeNode() {
    return toTestTreeNode(this.indexTree.getRoot());
  }
  /**
   * `toSortedJSON` returns the sorted JSON encoding of this tree.
   */
  toSortedJSON() {
    return this.toJSON();
  }
  /**
   * `deepcopy` copies itself deeply.
   */
  deepcopy() {
    const root = this.getRoot();
    return new CRDTTree(root.deepcopy(), this.getCreatedAt());
  }
  /**
   * `toPath` converts the given CRDTTreeNodeID to the path of the tree.
   */
  toPath(parentNode, leftNode) {
    const treePos = this.toTreePos(parentNode, leftNode);
    if (!treePos) {
      return [];
    }
    return this.indexTree.treePosToPath(treePos);
  }
  /**
   * `toIndex` converts the given CRDTTreeNodeID to the index of the tree.
   */
  toIndex(parentNode, leftNode) {
    const treePos = this.toTreePos(parentNode, leftNode);
    if (!treePos) {
      return -1;
    }
    return this.indexTree.indexOf(treePos);
  }
  /**
   * `indexToPath` converts the given tree index to path.
   */
  indexToPath(index) {
    return this.indexTree.indexToPath(index);
  }
  /**
   * `pathToIndex` converts the given path to index.
   */
  pathToIndex(path) {
    return this.indexTree.pathToIndex(path);
  }
  /**
   * `indexRangeToPosRange` returns the position range from the given index range.
   */
  indexRangeToPosRange(range) {
    const fromPos = this.findPos(range[0]);
    if (range[0] === range[1]) {
      return [fromPos, fromPos];
    }
    return [fromPos, this.findPos(range[1])];
  }
  /**
   * `indexRangeToPosStructRange` converts the integer index range into the Tree position range structure.
   */
  indexRangeToPosStructRange(range) {
    const [fromIdx, toIdx] = range;
    const fromPos = this.findPos(fromIdx);
    if (fromIdx === toIdx) {
      return [fromPos.toStruct(), fromPos.toStruct()];
    }
    return [fromPos.toStruct(), this.findPos(toIdx).toStruct()];
  }
  /**
   * `posRangeToPathRange` converts the given position range to the path range.
   */
  posRangeToPathRange(range) {
    const [fromParent, fromLeft] = this.findNodesAndSplitText(range[0]);
    const [toParent, toLeft] = this.findNodesAndSplitText(range[1]);
    return [this.toPath(fromParent, fromLeft), this.toPath(toParent, toLeft)];
  }
  /**
   * `posRangeToIndexRange` converts the given position range to the path range.
   */
  posRangeToIndexRange(range) {
    const [fromParent, fromLeft] = this.findNodesAndSplitText(range[0]);
    const [toParent, toLeft] = this.findNodesAndSplitText(range[1]);
    return [this.toIndex(fromParent, fromLeft), this.toIndex(toParent, toLeft)];
  }
  /**
   * `traverseInPosRange` traverses the tree in the given position range.
   */
  traverseInPosRange(fromParent, fromLeft, toParent, toLeft, callback) {
    const fromIdx = this.toIndex(fromParent, fromLeft);
    const toIdx = this.toIndex(toParent, toLeft);
    return this.indexTree.tokensBetween(fromIdx, toIdx, callback);
  }
  /**
   * `toTreePos` converts the given nodes to the position of the IndexTree.
   */
  toTreePos(parentNode, leftNode) {
    if (!parentNode || !leftNode) {
      return;
    }
    if (parentNode.isRemoved) {
      let childNode;
      while (parentNode.isRemoved) {
        childNode = parentNode;
        parentNode = childNode.parent;
      }
      const offset2 = parentNode.findOffset(childNode);
      return {
        node: parentNode,
        offset: offset2
      };
    }
    if (parentNode === leftNode) {
      return {
        node: parentNode,
        offset: 0
      };
    }
    let offset = parentNode.findOffset(leftNode);
    if (!leftNode.isRemoved) {
      if (leftNode.isText) {
        return {
          node: leftNode,
          offset: leftNode.paddedSize
        };
      }
      offset++;
    }
    return {
      node: parentNode,
      offset
    };
  }
  /**
   * `makeDeletionChanges` converts nodes to be deleted to deletion changes.
   */
  makeDeletionChanges(candidates, editedAt) {
    const changes = [];
    const ranges = [];
    let start = null;
    let end = null;
    for (let i = 0; i < candidates.length; i++) {
      const cur = candidates[i];
      const next = candidates[i + 1];
      if (!start) {
        start = cur;
      }
      end = cur;
      const rightToken = this.findRightToken(cur);
      if (!rightToken || !next || rightToken[0] !== next[0] || rightToken[1] !== next[1]) {
        ranges.push([start, end]);
        start = null;
        end = null;
      }
    }
    for (const range of ranges) {
      const [start2, end2] = range;
      const [fromLeft, fromLeftTokenType] = this.findLeftToken(start2);
      const [toLeft, toLeftTokenType] = end2;
      const fromParent = fromLeftTokenType === TokenType.Start ? fromLeft : fromLeft.parent;
      const toParent = toLeftTokenType === TokenType.Start ? toLeft : toLeft.parent;
      const fromIdx = this.toIndex(fromParent, fromLeft);
      const toIdx = this.toIndex(toParent, toLeft);
      if (fromIdx < toIdx) {
        if (changes.length > 0 && fromIdx === changes[changes.length - 1].to) {
          changes[changes.length - 1].to = toIdx;
          changes[changes.length - 1].toPath = this.toPath(toParent, toLeft);
        } else {
          changes.push({
            type: "content",
            from: fromIdx,
            to: toIdx,
            fromPath: this.toPath(fromParent, fromLeft),
            toPath: this.toPath(toParent, toLeft),
            actor: editedAt.getActorID()
          });
        }
      }
    }
    return changes.reverse();
  }
  /**
   * `findRightToken` returns the token to the right of the given token in the tree.
   */
  findRightToken([
    node,
    tokenType
  ]) {
    if (tokenType === TokenType.Start) {
      const children = node.allChildren;
      if (children.length > 0) {
        return [
          children[0],
          children[0].isText ? TokenType.Text : TokenType.Start
        ];
      }
      return [node, TokenType.End];
    }
    const parent = node.parent;
    const siblings = parent.allChildren;
    const offset = siblings.indexOf(node);
    if (parent && offset === siblings.length - 1) {
      return [parent, TokenType.End];
    }
    const next = siblings[offset + 1];
    return [next, next.isText ? TokenType.Text : TokenType.Start];
  }
  /**
   * `findLeftToken` returns the token to the left of the given token in the tree.
   */
  findLeftToken([
    node,
    tokenType
  ]) {
    if (tokenType === TokenType.End) {
      const children = node.allChildren;
      if (children.length > 0) {
        const lastChild = children[children.length - 1];
        return [lastChild, lastChild.isText ? TokenType.Text : TokenType.End];
      }
      return [node, TokenType.Start];
    }
    const parent = node.parent;
    const siblings = parent.allChildren;
    const offset = siblings.indexOf(node);
    if (parent && offset === 0) {
      return [parent, TokenType.Start];
    }
    const prev = siblings[offset - 1];
    return [prev, prev.isText ? TokenType.Text : TokenType.End];
  }
}
class TreeEditOperation extends Operation {
  constructor(parentCreatedAt, fromPos, toPos, contents, splitLevel, maxCreatedAtMapByActor, executedAt) {
    super(parentCreatedAt, executedAt);
    __publicField(this, "fromPos");
    __publicField(this, "toPos");
    __publicField(this, "contents");
    __publicField(this, "splitLevel");
    __publicField(this, "maxCreatedAtMapByActor");
    this.fromPos = fromPos;
    this.toPos = toPos;
    this.contents = contents;
    this.splitLevel = splitLevel;
    this.maxCreatedAtMapByActor = maxCreatedAtMapByActor;
  }
  /**
   * `create` creates a new instance of EditOperation.
   */
  static create(parentCreatedAt, fromPos, toPos, contents, splitLevel, maxCreatedAtMapByActor, executedAt) {
    return new TreeEditOperation(
      parentCreatedAt,
      fromPos,
      toPos,
      contents,
      splitLevel,
      maxCreatedAtMapByActor,
      executedAt
    );
  }
  /**
   * `execute` executes this operation on the given `CRDTRoot`.
   */
  execute(root) {
    var _a;
    const parentObject = root.findByCreatedAt(this.getParentCreatedAt());
    if (!parentObject) {
      logger.fatal(`fail to find ${this.getParentCreatedAt()}`);
    }
    if (!(parentObject instanceof CRDTTree)) {
      logger.fatal(`fail to execute, only Tree can execute edit`);
    }
    const editedAt = this.getExecutedAt();
    const tree = parentObject;
    const [changes, pairs] = tree.edit(
      [this.fromPos, this.toPos],
      (_a = this.contents) == null ? void 0 : _a.map((content) => content.deepcopy()),
      this.splitLevel,
      editedAt,
      /**
       * TODO(sejongk): When splitting element nodes, a new nodeID is assigned with a different timeTicket.
       * In the same change context, the timeTickets share the same lamport and actorID but have different delimiters,
       * incremented by one for each.
       * Therefore, it is possible to simulate later timeTickets using `editedAt` and the length of `contents`.
       * This logic might be unclear; consider refactoring for multi-level concurrent editing in the Tree implementation.
       */
      (() => {
        let delimiter = editedAt.getDelimiter();
        if (this.contents !== void 0) {
          delimiter += this.contents.length;
        }
        const issueTimeTicket = () => TimeTicket.of(
          editedAt.getLamport(),
          ++delimiter,
          editedAt.getActorID()
        );
        return issueTimeTicket;
      })(),
      this.maxCreatedAtMapByActor
    );
    for (const pair of pairs) {
      root.registerGCPair(pair);
    }
    return {
      opInfos: changes.map(
        ({ from, to, value, splitLevel, fromPath, toPath }) => {
          return {
            type: "tree-edit",
            path: root.createPath(this.getParentCreatedAt()),
            from,
            to,
            value,
            splitLevel,
            fromPath,
            toPath
          };
        }
      )
    };
  }
  /**
   * `getEffectedCreatedAt` returns the creation time of the effected element.
   */
  getEffectedCreatedAt() {
    return this.getParentCreatedAt();
  }
  /**
   * `toTestString` returns a string containing the meta data.
   */
  toTestString() {
    const parent = this.getParentCreatedAt().toTestString();
    const fromPos = `${this.fromPos.getLeftSiblingID().getCreatedAt().toTestString()}/${this.fromPos.getLeftSiblingID().getOffset()}`;
    const toPos = `${this.toPos.getLeftSiblingID().getCreatedAt().toTestString()}/${this.toPos.getLeftSiblingID().getOffset()}`;
    const contents = this.contents || [];
    return `${parent}.EDIT(${fromPos},${toPos},${contents.map((v) => toXML(v)).join("")})`;
  }
  /**
   * `getFromPos` returns the start point of the editing range.
   */
  getFromPos() {
    return this.fromPos;
  }
  /**
   * `getToPos` returns the end point of the editing range.
   */
  getToPos() {
    return this.toPos;
  }
  /**
   * `getContent` returns the content of Edit.
   */
  getContents() {
    return this.contents;
  }
  /**
   * `getSplitLevel` returns the split level of Edit.
   */
  getSplitLevel() {
    return this.splitLevel;
  }
  /**
   * `getMaxCreatedAtMapByActor` returns the map that stores the latest creation time
   * by actor for the nodes included in the editing range.
   */
  getMaxCreatedAtMapByActor() {
    return this.maxCreatedAtMapByActor;
  }
}
class ChangeID {
  constructor(clientSeq, lamport, actor, serverSeq) {
    __publicField(this, "clientSeq");
    // `serverSeq` is optional and only present for changes stored on the server.
    __publicField(this, "serverSeq");
    __publicField(this, "lamport");
    __publicField(this, "actor");
    this.clientSeq = clientSeq;
    this.serverSeq = serverSeq;
    this.lamport = lamport;
    this.actor = actor;
  }
  /**
   * `of` creates a new instance of ChangeID.
   */
  static of(clientSeq, lamport, actor, serverSeq) {
    return new ChangeID(clientSeq, lamport, actor, serverSeq);
  }
  /**
   * `next` creates a next ID of this ID.
   */
  next() {
    return new ChangeID(this.clientSeq + 1, this.lamport.add(1), this.actor);
  }
  /**
   * `syncLamport` syncs lamport timestamp with the given ID.
   *
   * {@link https://en.wikipedia.org/wiki/Lamport_timestamps#Algorithm}
   */
  syncLamport(otherLamport) {
    if (otherLamport.greaterThan(this.lamport)) {
      return new ChangeID(this.clientSeq, otherLamport, this.actor);
    }
    return new ChangeID(this.clientSeq, this.lamport.add(1), this.actor);
  }
  /**
   * `createTimeTicket` creates a ticket of the given delimiter.
   */
  createTimeTicket(delimiter) {
    return TimeTicket.of(this.lamport, delimiter, this.actor);
  }
  /**
   * `setActor` sets the given actor.
   */
  setActor(actorID) {
    return new ChangeID(this.clientSeq, this.lamport, actorID, this.serverSeq);
  }
  /**
   * `getClientSeq` returns the client sequence of this ID.
   */
  getClientSeq() {
    return this.clientSeq;
  }
  /**
   * `getServerSeq` returns the server sequence of this ID.
   */
  getServerSeq() {
    if (this.serverSeq) {
      return this.serverSeq.toString();
    }
    return "";
  }
  /**
   * `getLamport` returns the lamport clock of this ID.
   */
  getLamport() {
    return this.lamport;
  }
  /**
   * `getLamportAsString` returns the lamport clock of this ID as a string.
   */
  getLamportAsString() {
    return this.lamport.toString();
  }
  /**
   * `getActorID` returns the actor of this ID.
   */
  getActorID() {
    return this.actor;
  }
  /**
   * `toTestString` returns a string containing the meta data of this ID.
   */
  toTestString() {
    return `${this.lamport.toString()}:${this.actor.slice(-2)}:${this.clientSeq}`;
  }
}
const InitialChangeID = new ChangeID(
  0,
  Long.fromInt(0, true),
  InitialActorID
);
class Change {
  constructor({
    id,
    operations,
    presenceChange,
    message
  }) {
    __publicField(this, "id");
    // `operations` represent a series of user edits.
    __publicField(this, "operations");
    // `presenceChange` represents the presenceChange of the user who made the change.
    __publicField(this, "presenceChange");
    // `message` is used to save a description of the change.
    __publicField(this, "message");
    this.id = id;
    this.operations = operations || [];
    this.presenceChange = presenceChange;
    this.message = message;
  }
  /**
   * `create` creates a new instance of Change.
   */
  static create({
    id,
    operations,
    presenceChange,
    message
  }) {
    return new Change({ id, operations, presenceChange, message });
  }
  /**
   * `getID` returns the ID of this change.
   */
  getID() {
    return this.id;
  }
  /**
   * `getMessage` returns the message of this change.
   */
  getMessage() {
    return this.message;
  }
  /**
   * `hasOperations` returns whether this change has operations or not.
   */
  hasOperations() {
    return this.operations.length > 0;
  }
  /**
   * `getOperations` returns the operations of this change.
   */
  getOperations() {
    return this.operations;
  }
  /**
   * `setActor` sets the given actor.
   */
  setActor(actorID) {
    for (const operation of this.operations) {
      operation.setActor(actorID);
    }
    this.id = this.id.setActor(actorID);
  }
  /**
   * `hasPresenceChange` returns whether this change has presence change or not.
   */
  hasPresenceChange() {
    return this.presenceChange !== void 0;
  }
  /**
   * `getPresenceChange` returns the presence change of this change.
   */
  getPresenceChange() {
    return this.presenceChange;
  }
  /**
   * `execute` executes the operations of this change to the given root.
   */
  execute(root, presences, source) {
    const changeOpInfos = [];
    const reverseOps = [];
    for (const operation of this.operations) {
      const executionResult = operation.execute(root, source);
      if (!executionResult)
        continue;
      const { opInfos, reverseOp } = executionResult;
      changeOpInfos.push(...opInfos);
      if (reverseOp) {
        reverseOps.unshift(reverseOp);
      }
    }
    if (this.presenceChange) {
      if (this.presenceChange.type === PresenceChangeType.Put) {
        presences.set(
          this.id.getActorID(),
          deepcopy(this.presenceChange.presence)
        );
      } else {
        presences.delete(this.id.getActorID());
      }
    }
    return { opInfos: changeOpInfos, reverseOps };
  }
  /**
   * `toTestString` returns a string containing the meta data of this change.
   */
  toTestString() {
    return `${this.operations.map((operation) => operation.toTestString()).join(",")}`;
  }
  /**
   * `toStruct` returns the structure of this change.
   */
  toStruct() {
    return {
      changeID: converter.bytesToHex(
        converter.toChangeID(this.getID()).toBinary()
      ),
      message: this.getMessage(),
      operations: this.getOperations().map(
        (op) => converter.bytesToHex(converter.toOperation(op).toBinary())
      ),
      presenceChange: this.getPresenceChange()
    };
  }
  /**
   * `fromStruct` creates a instance of Change from the struct.
   */
  static fromStruct(struct) {
    const { changeID, operations, presenceChange, message } = struct;
    return Change.create({
      id: converter.bytesToChangeID(converter.hexToBytes(changeID)),
      operations: operations == null ? void 0 : operations.map((op) => {
        return converter.bytesToOperation(converter.hexToBytes(op));
      }),
      presenceChange,
      message
    });
  }
}
class ChangePack {
  constructor(key, checkpoint, isRemoved, changes, snapshot, minSyncedTicket) {
    /**
     * `documentKey` is the key of the document.
     */
    __publicField(this, "documentKey");
    /**
     * `Checkpoint` is used to determine the client received changes.
     */
    __publicField(this, "checkpoint");
    /**
     * `isRemoved` is a flag that indicates whether the document is removed.
     */
    __publicField(this, "isRemoved");
    __publicField(this, "changes");
    /**
     * `snapshot` is a byte array that encodes the document.
     */
    __publicField(this, "snapshot");
    /**
     * `minSyncedTicket` is the minimum logical time taken by clients who attach
     * to the document. It is used to collect garbage on the replica on the
     * client.
     */
    __publicField(this, "minSyncedTicket");
    this.documentKey = key;
    this.checkpoint = checkpoint;
    this.isRemoved = isRemoved;
    this.changes = changes;
    this.snapshot = snapshot;
    this.minSyncedTicket = minSyncedTicket;
  }
  /**
   * `create` creates a new instance of ChangePack.
   */
  static create(key, checkpoint, isRemoved, changes, snapshot, minSyncedTicket) {
    return new ChangePack(
      key,
      checkpoint,
      isRemoved,
      changes,
      snapshot,
      minSyncedTicket
    );
  }
  /**
   * `getKey` returns the document key of this pack.
   */
  getDocumentKey() {
    return this.documentKey;
  }
  /**
   * `getCheckpoint` returns the checkpoint of this pack.
   */
  getCheckpoint() {
    return this.checkpoint;
  }
  /**
   * `getIsRemoved` returns the whether this document is removed.
   */
  getIsRemoved() {
    return this.isRemoved;
  }
  /**
   * `getChanges` returns the changes of this pack.
   */
  getChanges() {
    return this.changes;
  }
  /**
   * `hasChanges` returns the whether this pack has changes or not.
   */
  hasChanges() {
    return this.changes.length > 0;
  }
  /**
   * `getChangeSize` returns the size of changes this pack has.
   */
  getChangeSize() {
    return this.changes.length;
  }
  /**
   * `hasSnapshot` returns the whether this pack has a snapshot or not.
   */
  hasSnapshot() {
    return !!this.snapshot && !!this.snapshot.length;
  }
  /**
   * `getSnapshot` returns the snapshot of this pack.
   */
  getSnapshot() {
    return this.snapshot;
  }
  /**
   * `getMinSyncedTicket` returns the minimum synced ticket of this pack.
   */
  getMinSyncedTicket() {
    return this.minSyncedTicket;
  }
}
class Checkpoint {
  constructor(serverSeq, clientSeq) {
    __publicField(this, "serverSeq");
    __publicField(this, "clientSeq");
    this.serverSeq = serverSeq;
    this.clientSeq = clientSeq;
  }
  /**
   * `of` creates a new instance of Checkpoint.
   */
  static of(serverSeq, clientSeq) {
    return new Checkpoint(serverSeq, clientSeq);
  }
  /**
   * `increaseClientSeq` creates a new instance with increased client sequence.
   */
  increaseClientSeq(inc) {
    if (inc === 0) {
      return this;
    }
    return new Checkpoint(this.serverSeq, this.clientSeq + inc);
  }
  /**
   * `forward` creates a new instance with the given checkpoint if it is
   * greater than the values of internal properties.
   */
  forward(other) {
    if (this.equals(other)) {
      return this;
    }
    const serverSeq = this.serverSeq.greaterThan(other.serverSeq) ? this.serverSeq : other.serverSeq;
    const clientSeq = Math.max(this.clientSeq, other.clientSeq);
    return Checkpoint.of(serverSeq, clientSeq);
  }
  /**
   * `getServerSeqAsString` returns the server seq of this checkpoint as a
   * string.
   */
  getServerSeqAsString() {
    return this.serverSeq.toString();
  }
  /**
   * `getClientSeq` returns the client seq of this checkpoint.
   */
  getClientSeq() {
    return this.clientSeq;
  }
  /**
   * `getServerSeq` returns the server seq of this checkpoint.
   */
  getServerSeq() {
    return this.serverSeq;
  }
  /**
   * `equals` returns whether the given checkpoint is equal to this checkpoint
   * or not.
   */
  equals(other) {
    return this.clientSeq === other.clientSeq && this.serverSeq.equals(other.serverSeq);
  }
  /**
   * `toTestString` returns a string containing the meta data of this
   * checkpoint.
   */
  toTestString() {
    return `serverSeq=${this.serverSeq}, clientSeq=${this.clientSeq}`;
  }
}
const InitialCheckpoint = new Checkpoint(Long.fromInt(0, true), 0);
class RGATreeSplitNodeID {
  constructor(createdAt, offset) {
    __publicField(this, "createdAt");
    __publicField(this, "offset");
    this.createdAt = createdAt;
    this.offset = offset;
  }
  /**
   * `of` creates a instance of RGATreeSplitNodeID.
   */
  static of(createdAt, offset) {
    return new RGATreeSplitNodeID(createdAt, offset);
  }
  /**
   * `fromStruct` creates a instance of RGATreeSplitNodeID from the struct.
   */
  static fromStruct(struct) {
    return RGATreeSplitNodeID.of(
      TimeTicket.fromStruct(struct.createdAt),
      struct.offset
    );
  }
  /**
   * `getCreatedAt` returns the creation time of this ID.
   */
  getCreatedAt() {
    return this.createdAt;
  }
  /**
   * `getOffset` returns returns the offset of this ID.
   */
  getOffset() {
    return this.offset;
  }
  /**
   * `equals` returns whether given ID equals to this ID or not.
   */
  equals(other) {
    return this.createdAt.compare(other.createdAt) === 0 && this.offset === other.offset;
  }
  /**
   * `hasSameCreatedAt` returns whether given ID has same creation time with this ID.
   */
  hasSameCreatedAt(other) {
    return this.createdAt.compare(other.createdAt) === 0;
  }
  /**
   * `split` creates a new ID with an offset from this ID.
   */
  split(offset) {
    return new RGATreeSplitNodeID(this.createdAt, this.offset + offset);
  }
  /**
   * `toStruct` returns the structure of this node id.
   */
  toStruct() {
    return {
      createdAt: this.createdAt.toStruct(),
      offset: this.offset
    };
  }
  /**
   * `toTestString` returns a String containing
   * the meta data of the node id for debugging purpose.
   */
  toTestString() {
    return `${this.createdAt.toTestString()}:${this.offset}`;
  }
  /**
   * `toIDString` returns a string that can be used as an ID for this node id.
   */
  toIDString() {
    return `${this.createdAt.toIDString()}:${this.offset}`;
  }
}
const InitialRGATreeSplitNodeID = RGATreeSplitNodeID.of(InitialTimeTicket, 0);
class RGATreeSplitPos {
  constructor(id, relativeOffset) {
    __publicField(this, "id");
    __publicField(this, "relativeOffset");
    this.id = id;
    this.relativeOffset = relativeOffset;
  }
  /**
   * `of` creates a instance of RGATreeSplitPos.
   */
  static of(id, relativeOffset) {
    return new RGATreeSplitPos(id, relativeOffset);
  }
  /**
   * `fromStruct` creates a instance of RGATreeSplitPos from the struct.
   */
  static fromStruct(struct) {
    const id = RGATreeSplitNodeID.fromStruct(struct.id);
    return RGATreeSplitPos.of(id, struct.relativeOffset);
  }
  /**
   * `getID` returns the ID of this RGATreeSplitPos.
   */
  getID() {
    return this.id;
  }
  /**
   * `getRelativeOffset` returns the relative offset of this RGATreeSplitPos.
   */
  getRelativeOffset() {
    return this.relativeOffset;
  }
  /**
   * `getAbsoluteID` returns the absolute id of this RGATreeSplitPos.
   */
  getAbsoluteID() {
    return RGATreeSplitNodeID.of(
      this.id.getCreatedAt(),
      this.id.getOffset() + this.relativeOffset
    );
  }
  /**
   *`toTestString` returns a String containing
   * the meta data of the position for debugging purpose.
   */
  toTestString() {
    return `${this.id.toTestString()}:${this.relativeOffset}`;
  }
  /**
   * `toStruct` returns the structure of this node pos.
   */
  toStruct() {
    return {
      id: this.id.toStruct(),
      relativeOffset: this.relativeOffset
    };
  }
  /**
   * `equals` returns whether given pos equal to this pos or not.
   */
  equals(other) {
    if (!this.id.equals(other.id)) {
      return false;
    }
    return this.relativeOffset === other.relativeOffset;
  }
}
class RGATreeSplitNode extends SplayNode {
  constructor(id, value, removedAt) {
    super(value);
    __publicField(this, "id");
    __publicField(this, "removedAt");
    __publicField(this, "prev");
    __publicField(this, "next");
    __publicField(this, "insPrev");
    __publicField(this, "insNext");
    this.id = id;
    this.removedAt = removedAt;
  }
  /**
   * `create` creates a instance of RGATreeSplitNode.
   */
  static create(id, value) {
    return new RGATreeSplitNode(id, value);
  }
  /**
   * `createComparator` creates a function to compare two RGATreeSplitNodeID.
   */
  static createComparator() {
    return (p1, p2) => {
      const compare2 = p1.getCreatedAt().compare(p2.getCreatedAt());
      if (compare2 !== 0) {
        return compare2;
      }
      if (p1.getOffset() > p2.getOffset()) {
        return 1;
      } else if (p1.getOffset() < p2.getOffset()) {
        return -1;
      }
      return 0;
    };
  }
  /**
   * `getID` returns the ID of this RGATreeSplitNode.
   */
  getID() {
    return this.id;
  }
  /**
   * `getCreatedAt` returns creation time of the Id of RGATreeSplitNode.
   */
  getCreatedAt() {
    return this.id.getCreatedAt();
  }
  /**
   * `getLength` returns the length of this node.
   */
  getLength() {
    if (this.removedAt) {
      return 0;
    }
    return this.getContentLength();
  }
  /**
   * `getContentLength` returns the length of this value.
   */
  getContentLength() {
    return this.value && this.value.length || 0;
  }
  /**
   * `getPrev` returns a previous node of this node.
   */
  getPrev() {
    return this.prev;
  }
  /**
   * `getNext` returns a next node of this node.
   */
  getNext() {
    return this.next;
  }
  /**
   * `getInsPrev` returns a previous node of this node insertion.
   */
  getInsPrev() {
    return this.insPrev;
  }
  /**
   * `getInsNext` returns a next node of this node insertion.
   */
  getInsNext() {
    return this.insNext;
  }
  /**
   * `getInsPrevID` returns a ID of previous node insertion.
   */
  getInsPrevID() {
    return this.insPrev.getID();
  }
  /**
   * `setPrev` sets previous node of this node.
   */
  setPrev(node) {
    this.prev = node;
    if (node) {
      node.next = this;
    }
  }
  /**
   * `setNext` sets next node of this node.
   */
  setNext(node) {
    this.next = node;
    if (node) {
      node.prev = this;
    }
  }
  /**
   * `setInsPrev` sets previous node of this node insertion.
   */
  setInsPrev(node) {
    this.insPrev = node;
    if (node) {
      node.insNext = this;
    }
  }
  /**
   * `setInsNext` sets next node of this node insertion.
   */
  setInsNext(node) {
    this.insNext = node;
    if (node) {
      node.insPrev = this;
    }
  }
  /**
   * `hasNext` checks if next node exists.
   */
  hasNext() {
    return !!this.next;
  }
  /**
   * `hasInsPrev` checks if previous insertion node exists.
   */
  hasInsPrev() {
    return !!this.insPrev;
  }
  /**
   * `isRemoved` checks if removed time exists.
   */
  isRemoved() {
    return !!this.removedAt;
  }
  /**
   * `getRemovedAt` returns the remove time of this node.
   */
  getRemovedAt() {
    return this.removedAt;
  }
  /**
   * `split` creates a new split node of the given offset.
   */
  split(offset) {
    return new RGATreeSplitNode(
      this.id.split(offset),
      this.splitValue(offset),
      this.removedAt
    );
  }
  /**
   * `canDelete` checks if node is able to delete.
   */
  canDelete(editedAt, maxCreatedAt) {
    const justRemoved = !this.removedAt;
    if (!this.getCreatedAt().after(maxCreatedAt) && (!this.removedAt || editedAt.after(this.removedAt))) {
      return justRemoved;
    }
    return false;
  }
  /**
   * `canStyle` checks if node is able to set style.
   */
  canStyle(editedAt, maxCreatedAt) {
    return !this.getCreatedAt().after(maxCreatedAt) && (!this.removedAt || editedAt.after(this.removedAt));
  }
  /**
   * `remove` removes node of given edited time.
   */
  remove(editedAt) {
    this.removedAt = editedAt;
  }
  /**
   * `createRange` creates ranges of RGATreeSplitPos.
   */
  createPosRange() {
    return [
      RGATreeSplitPos.of(this.id, 0),
      RGATreeSplitPos.of(this.id, this.getLength())
    ];
  }
  /**
   * `deepcopy` returns a new instance of this RGATreeSplitNode without structural info.
   */
  deepcopy() {
    return new RGATreeSplitNode(this.id, this.value, this.removedAt);
  }
  /**
   * `toTestString` returns a String containing
   * the meta data of the node for debugging purpose.
   */
  toTestString() {
    return `${this.id.toTestString()} ${this.value ? this.value : ""}`;
  }
  splitValue(offset) {
    const value = this.value;
    this.value = value.substring(0, offset);
    return value.substring(offset, value.length);
  }
  /**
   * `toIDString` returns a string that can be used as an ID for this position.
   */
  toIDString() {
    return this.id.toIDString();
  }
}
class RGATreeSplit {
  constructor() {
    __publicField(this, "head");
    __publicField(this, "treeByIndex");
    __publicField(this, "treeByID");
    this.head = RGATreeSplitNode.create(InitialRGATreeSplitNodeID);
    this.treeByIndex = new SplayTree();
    this.treeByID = new LLRBTree(RGATreeSplitNode.createComparator());
    this.treeByIndex.insert(this.head);
    this.treeByID.put(this.head.getID(), this.head);
  }
  /**
   * `create` creates a instance RGATreeSplit.
   */
  static create() {
    return new RGATreeSplit();
  }
  /**
   * `edit` does following steps
   * 1. split nodes with from and to
   * 2. delete between from and to
   * 3. insert a new node
   * 4. add removed node
   * @param range - range of RGATreeSplitNode
   * @param editedAt - edited time
   * @param value - value
   * @param maxCreatedAtMapByActor - maxCreatedAtMapByActor
   * @returns `[RGATreeSplitPos, Map<string, TimeTicket>, Array<GCPair>, Array<Change>]`
   */
  edit(range, editedAt, value, maxCreatedAtMapByActor) {
    const [toLeft, toRight] = this.findNodeWithSplit(range[1], editedAt);
    const [fromLeft, fromRight] = this.findNodeWithSplit(range[0], editedAt);
    const nodesToDelete = this.findBetween(fromRight, toRight);
    const [changes, maxCreatedAtMap, removedNodes] = this.deleteNodes(
      nodesToDelete,
      editedAt,
      maxCreatedAtMapByActor
    );
    const caretID = toRight ? toRight.getID() : toLeft.getID();
    let caretPos = RGATreeSplitPos.of(caretID, 0);
    if (value) {
      const idx = this.posToIndex(fromLeft.createPosRange()[1], true);
      const inserted = this.insertAfter(
        fromLeft,
        RGATreeSplitNode.create(RGATreeSplitNodeID.of(editedAt, 0), value)
      );
      if (changes.length && changes[changes.length - 1].from === idx) {
        changes[changes.length - 1].value = value;
      } else {
        changes.push({
          actor: editedAt.getActorID(),
          from: idx,
          to: idx,
          value
        });
      }
      caretPos = RGATreeSplitPos.of(
        inserted.getID(),
        inserted.getContentLength()
      );
    }
    const pairs = [];
    for (const [, removedNode] of removedNodes) {
      pairs.push({ parent: this, child: removedNode });
    }
    return [caretPos, maxCreatedAtMap, pairs, changes];
  }
  /**
   * `indexToPos` finds RGATreeSplitPos of given offset.
   */
  indexToPos(idx) {
    const [node, offset] = this.treeByIndex.find(idx);
    const splitNode = node;
    return RGATreeSplitPos.of(splitNode.getID(), offset);
  }
  /**
   * `findIndexesFromRange` finds indexes based on range.
   */
  findIndexesFromRange(range) {
    const [fromPos, toPos] = range;
    return [this.posToIndex(fromPos, false), this.posToIndex(toPos, true)];
  }
  /**
   * `posToIndex` converts the given position to index.
   */
  posToIndex(pos, preferToLeft) {
    const absoluteID = pos.getAbsoluteID();
    const node = preferToLeft ? this.findFloorNodePreferToLeft(absoluteID) : this.findFloorNode(absoluteID);
    if (!node) {
      logger.fatal(
        `the node of the given id should be found: ${absoluteID.toTestString()}`
      );
    }
    const index = this.treeByIndex.indexOf(node);
    const offset = node.isRemoved() ? 0 : absoluteID.getOffset() - node.getID().getOffset();
    return index + offset;
  }
  /**
   * `findNode` finds node of given id.
   */
  findNode(id) {
    return this.findFloorNode(id);
  }
  /**
   * `length` returns size of RGATreeSplit.
   */
  get length() {
    return this.treeByIndex.length;
  }
  /**
   * `checkWeight` returns false when there is an incorrect weight node.
   * for debugging purpose.
   */
  checkWeight() {
    return this.treeByIndex.checkWeight();
  }
  /**
   * `toString` returns the string encoding of this RGATreeSplit.
   */
  toString() {
    const str = [];
    for (const node of this) {
      if (!node.isRemoved()) {
        str.push(node.getValue());
      }
    }
    return str.join("");
  }
  // eslint-disable-next-line jsdoc/require-jsdoc
  *[Symbol.iterator]() {
    let node = this.head.getNext();
    while (node) {
      yield node;
      node = node.getNext();
    }
  }
  /**
   * `getHead` returns head of RGATreeSplitNode.
   */
  getHead() {
    return this.head;
  }
  /**
   * `deepcopy` copies itself deeply.
   */
  deepcopy() {
    const clone = new RGATreeSplit();
    let node = this.head.getNext();
    let prev = clone.head;
    let current;
    while (node) {
      current = clone.insertAfter(prev, node.deepcopy());
      if (node.hasInsPrev()) {
        const insPrevNode = clone.findNode(node.getInsPrevID());
        current.setInsPrev(insPrevNode);
      }
      prev = current;
      node = node.getNext();
    }
    return clone;
  }
  /**
   * `toTestString` returns a String containing the meta data of the node
   * for debugging purpose.
   */
  toTestString() {
    const result = [];
    let node = this.head;
    while (node) {
      if (node.isRemoved()) {
        result.push(`{${node.toTestString()}}`);
      } else {
        result.push(`[${node.toTestString()}]`);
      }
      node = node.getNext();
    }
    return result.join("");
  }
  /**
   * `insertAfter` inserts the given node after the given previous node.
   */
  insertAfter(prevNode, newNode) {
    const next = prevNode.getNext();
    newNode.setPrev(prevNode);
    if (next) {
      next.setPrev(newNode);
    }
    this.treeByID.put(newNode.getID(), newNode);
    this.treeByIndex.insertAfter(prevNode, newNode);
    return newNode;
  }
  /**
   * `findNodeWithSplit` splits and return nodes of the given position.
   */
  findNodeWithSplit(pos, editedAt) {
    const absoluteID = pos.getAbsoluteID();
    let node = this.findFloorNodePreferToLeft(absoluteID);
    const relativeOffset = absoluteID.getOffset() - node.getID().getOffset();
    this.splitNode(node, relativeOffset);
    while (node.hasNext() && node.getNext().getCreatedAt().after(editedAt)) {
      node = node.getNext();
    }
    return [node, node.getNext()];
  }
  findFloorNodePreferToLeft(id) {
    let node = this.findFloorNode(id);
    if (!node) {
      logger.fatal(
        `the node of the given id should be found: ${id.toTestString()}`
      );
    }
    if (id.getOffset() > 0 && node.getID().getOffset() == id.getOffset()) {
      if (!node.hasInsPrev()) {
        return node;
      }
      node = node.getInsPrev();
    }
    return node;
  }
  findFloorNode(id) {
    const entry = this.treeByID.floorEntry(id);
    if (!entry) {
      return;
    }
    if (!entry.key.equals(id) && !entry.key.hasSameCreatedAt(id)) {
      return;
    }
    return entry.value;
  }
  /**
   * `findBetween` returns nodes between fromNode and toNode.
   */
  findBetween(fromNode, toNode) {
    const nodes = [];
    let current = fromNode;
    while (current && current !== toNode) {
      nodes.push(current);
      current = current.getNext();
    }
    return nodes;
  }
  splitNode(node, offset) {
    if (offset > node.getContentLength()) {
      logger.fatal("offset should be less than or equal to length");
    }
    if (offset === 0) {
      return node;
    } else if (offset === node.getContentLength()) {
      return node.getNext();
    }
    const splitNode = node.split(offset);
    this.treeByIndex.updateWeight(splitNode);
    this.insertAfter(node, splitNode);
    const insNext = node.getInsNext();
    if (insNext) {
      insNext.setInsPrev(splitNode);
    }
    splitNode.setInsPrev(node);
    return splitNode;
  }
  deleteNodes(candidates, editedAt, maxCreatedAtMapByActor) {
    if (!candidates.length) {
      return [[], /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
    }
    const [nodesToDelete, nodesToKeep] = this.filterNodes(
      candidates,
      editedAt,
      maxCreatedAtMapByActor
    );
    const createdAtMapByActor = /* @__PURE__ */ new Map();
    const removedNodes = /* @__PURE__ */ new Map();
    const changes = this.makeChanges(nodesToKeep, editedAt);
    for (const node of nodesToDelete) {
      const actorID = node.getCreatedAt().getActorID();
      if (!createdAtMapByActor.has(actorID) || node.getID().getCreatedAt().after(createdAtMapByActor.get(actorID))) {
        createdAtMapByActor.set(actorID, node.getID().getCreatedAt());
      }
      removedNodes.set(node.getID().toIDString(), node);
      node.remove(editedAt);
    }
    this.deleteIndexNodes(nodesToKeep);
    return [changes, createdAtMapByActor, removedNodes];
  }
  filterNodes(candidates, editedAt, maxCreatedAtMapByActor) {
    const isRemote = !!maxCreatedAtMapByActor;
    const nodesToDelete = [];
    const nodesToKeep = [];
    const [leftEdge, rightEdge] = this.findEdgesOfCandidates(candidates);
    nodesToKeep.push(leftEdge);
    for (const node of candidates) {
      const actorID = node.getCreatedAt().getActorID();
      const maxCreatedAt = isRemote ? maxCreatedAtMapByActor.has(actorID) ? maxCreatedAtMapByActor.get(actorID) : InitialTimeTicket : MaxTimeTicket;
      if (node.canDelete(editedAt, maxCreatedAt)) {
        nodesToDelete.push(node);
      } else {
        nodesToKeep.push(node);
      }
    }
    nodesToKeep.push(rightEdge);
    return [nodesToDelete, nodesToKeep];
  }
  /**
   * `findEdgesOfCandidates` finds the edges outside `candidates`,
   * (which has not already been deleted, or be undefined but not yet implemented)
   * right edge is undefined means `candidates` contains the end of text.
   */
  findEdgesOfCandidates(candidates) {
    return [
      candidates[0].getPrev(),
      candidates[candidates.length - 1].getNext()
    ];
  }
  makeChanges(boundaries, editedAt) {
    const changes = [];
    let fromIdx, toIdx;
    for (let i = 0; i < boundaries.length - 1; i++) {
      const leftBoundary = boundaries[i];
      const rightBoundary = boundaries[i + 1];
      if (leftBoundary.getNext() == rightBoundary) {
        continue;
      }
      [fromIdx] = this.findIndexesFromRange(
        leftBoundary.getNext().createPosRange()
      );
      if (rightBoundary) {
        [, toIdx] = this.findIndexesFromRange(
          rightBoundary.getPrev().createPosRange()
        );
      } else {
        toIdx = this.treeByIndex.length;
      }
      if (fromIdx < toIdx) {
        changes.push({
          actor: editedAt.getActorID(),
          from: fromIdx,
          to: toIdx
        });
      }
    }
    return changes.reverse();
  }
  /**
   * `deleteIndexNodes` clears the index nodes of the given deletion boundaries.
   * The boundaries mean the nodes that will not be deleted in the range.
   */
  deleteIndexNodes(boundaries) {
    for (let i = 0; i < boundaries.length - 1; i++) {
      const leftBoundary = boundaries[i];
      const rightBoundary = boundaries[i + 1];
      if (leftBoundary.getNext() != rightBoundary) {
        this.treeByIndex.deleteRange(leftBoundary, rightBoundary);
      }
    }
  }
  /**
   * `purge` physically purges the given node from RGATreeSplit.
   */
  purge(node) {
    const prev = node.getPrev();
    const next = node.getNext();
    const insPrev = node.getInsPrev();
    const insNext = node.getInsNext();
    if (prev) {
      prev.setNext(next);
    }
    if (next) {
      next.setPrev(prev);
    }
    node.setPrev(void 0);
    node.setNext(void 0);
    if (insPrev) {
      insPrev.setInsNext(insNext);
    }
    if (insNext) {
      insNext.setInsPrev(insPrev);
    }
    node.setInsPrev(void 0);
    node.setInsNext(void 0);
  }
}
const removeDecimal = (number) => number < 0 ? Math.ceil(number) : Math.floor(number);
var CounterType = /* @__PURE__ */ ((CounterType2) => {
  CounterType2[CounterType2["IntegerCnt"] = 0] = "IntegerCnt";
  CounterType2[CounterType2["LongCnt"] = 1] = "LongCnt";
  return CounterType2;
})(CounterType || {});
class CRDTCounter extends CRDTElement {
  constructor(valueType, value, createdAt) {
    super(createdAt);
    __publicField(this, "valueType");
    __publicField(this, "value");
    this.valueType = valueType;
    switch (valueType) {
      case 0:
        if (typeof value === "number") {
          if (value > Math.pow(2, 31) - 1 || value < -Math.pow(2, 31)) {
            this.value = Long.fromNumber(value).toInt();
          } else {
            this.value = removeDecimal(value);
          }
        } else {
          this.value = value.toInt();
        }
        break;
      case 1:
        if (typeof value === "number") {
          this.value = Long.fromNumber(value);
        } else {
          this.value = value;
        }
        break;
      default:
        throw new YorkieError(
          Code.Unimplemented,
          `unimplemented type: ${valueType}`
        );
    }
  }
  /**
   * `of` creates a new instance of Counter.
   */
  static create(valueType, value, createdAt) {
    return new CRDTCounter(valueType, value, createdAt);
  }
  /**
   * `valueFromBytes` parses the given bytes into value.
   */
  static valueFromBytes(counterType, bytes) {
    switch (counterType) {
      case 0:
        return bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24;
      case 1:
        return Long.fromBytesLE(Array.from(bytes));
      default:
        throw new YorkieError(
          Code.Unimplemented,
          `unimplemented type: ${counterType}`
        );
    }
  }
  /**
   * `toJSON` returns the JSON encoding of the value.
   */
  toJSON() {
    return `${this.value}`;
  }
  /**
   * `toSortedJSON` returns the sorted JSON encoding of the value.
   */
  toSortedJSON() {
    return this.toJSON();
  }
  /**
   * `toJSForTest` returns value with meta data for testing.
   */
  toJSForTest() {
    return {
      createdAt: this.getCreatedAt().toTestString(),
      value: this.value,
      type: "YORKIE_COUNTER"
    };
  }
  /**
   * `deepcopy` copies itself deeply.
   */
  deepcopy() {
    const counter = CRDTCounter.create(
      this.valueType,
      this.value,
      this.getCreatedAt()
    );
    counter.setMovedAt(this.getMovedAt());
    return counter;
  }
  /**
   * `getType` returns the type of the value.
   */
  getType() {
    return this.valueType;
  }
  /**
   * `getCounterType` returns counter type of given value.
   */
  static getCounterType(value) {
    switch (typeof value) {
      case "object":
        if (value instanceof Long) {
          return 1;
        } else {
          return;
        }
      case "number":
        if (value > Math.pow(2, 31) - 1 || value < -Math.pow(2, 31)) {
          return 1;
        } else {
          return 0;
        }
      default:
        return;
    }
  }
  /**
   * `isSupport` check if there is a counter type of given value.
   */
  static isSupport(value) {
    return !!CRDTCounter.getCounterType(value);
  }
  /**
   * `isInteger` checks if the num is integer.
   */
  static isInteger(num) {
    return num % 1 === 0;
  }
  /**
   * `isNumericType` check numeric type by JSONCounter.
   */
  isNumericType() {
    const t = this.valueType;
    return t === 0 || t === 1;
  }
  /**
   * `getValueType` get counter value type.
   */
  getValueType() {
    return this.valueType;
  }
  /**
   * `getValue` get counter value.
   */
  getValue() {
    return this.value;
  }
  /**
   * `toBytes` creates an array representing the value.
   */
  toBytes() {
    switch (this.valueType) {
      case 0: {
        const intVal = this.value;
        return new Uint8Array([
          intVal & 255,
          intVal >> 8 & 255,
          intVal >> 16 & 255,
          intVal >> 24 & 255
        ]);
      }
      case 1: {
        const longVal = this.value;
        const longToBytes = longVal.toBytesLE();
        return Uint8Array.from(longToBytes);
      }
      default:
        throw new YorkieError(
          Code.Unimplemented,
          `unimplemented type: ${this.valueType}`
        );
    }
  }
  /**
   * `increase` increases numeric data.
   */
  increase(v) {
    function checkNumericType(target) {
      if (!target.isNumericType()) {
        throw new TypeError(
          `Unsupported type of value: ${typeof target.getValue()}`
        );
      }
    }
    checkNumericType(this);
    checkNumericType(v);
    if (this.valueType === 1) {
      this.value = this.value.add(v.getValue());
    } else {
      if (v.getType() === PrimitiveType.Long) {
        this.value = this.value + v.getValue().toInt();
      } else {
        this.value = Long.fromNumber(
          this.value + removeDecimal(v.getValue())
        ).toInt();
      }
    }
    return this;
  }
}
class IncreaseOperation extends Operation {
  constructor(parentCreatedAt, value, executedAt) {
    super(parentCreatedAt, executedAt);
    __publicField(this, "value");
    this.value = value;
  }
  /**
   * `create` creates a new instance of IncreaseOperation.
   */
  static create(parentCreatedAt, value, executedAt) {
    return new IncreaseOperation(parentCreatedAt, value, executedAt);
  }
  /**
   * `execute` executes this operation on the given `CRDTRoot`.
   */
  execute(root) {
    const parentObject = root.findByCreatedAt(this.getParentCreatedAt());
    if (!parentObject) {
      logger.fatal(`fail to find ${this.getParentCreatedAt()}`);
    }
    if (!(parentObject instanceof CRDTCounter)) {
      logger.fatal(`fail to execute, only Counter can execute increase`);
    }
    const counter = parentObject;
    const value = this.value.deepcopy();
    counter.increase(value);
    return {
      opInfos: [
        {
          type: "increase",
          path: root.createPath(this.getParentCreatedAt()),
          value: value.getValue()
        }
      ],
      reverseOp: this.toReverseOperation()
    };
  }
  /**
   * `toReverseOperation` returns the reverse operation of this operation.
   */
  toReverseOperation() {
    const primitiveValue = this.value.deepcopy();
    const valueType = primitiveValue.getType();
    const value = valueType === PrimitiveType.Long ? primitiveValue.getValue().multiply(-1) : primitiveValue.getValue() * -1;
    const reverseOp = IncreaseOperation.create(
      this.getParentCreatedAt(),
      Primitive.of(value, primitiveValue.getCreatedAt())
    );
    return reverseOp;
  }
  /**
   * `getEffectedCreatedAt` returns the creation time of the effected element.
   */
  getEffectedCreatedAt() {
    return this.getParentCreatedAt();
  }
  /**
   * `toTestString` returns a string containing the meta data.
   */
  toTestString() {
    return `${this.getParentCreatedAt().toTestString()}.INCREASE.${this.value.toJSON()}`;
  }
  /**
   * `getValue` returns the value of this operation.
   */
  getValue() {
    return this.value;
  }
}
class TreeStyleOperation extends Operation {
  constructor(parentCreatedAt, fromPos, toPos, maxCreatedAtMapByActor, attributes, attributesToRemove, executedAt) {
    super(parentCreatedAt, executedAt);
    __publicField(this, "fromPos");
    __publicField(this, "toPos");
    __publicField(this, "maxCreatedAtMapByActor");
    __publicField(this, "attributes");
    __publicField(this, "attributesToRemove");
    this.fromPos = fromPos;
    this.toPos = toPos;
    this.maxCreatedAtMapByActor = maxCreatedAtMapByActor;
    this.attributes = attributes;
    this.attributesToRemove = attributesToRemove;
  }
  /**
   * `create` creates a new instance of TreeStyleOperation.
   */
  static create(parentCreatedAt, fromPos, toPos, maxCreatedAtMapByActor, attributes, executedAt) {
    return new TreeStyleOperation(
      parentCreatedAt,
      fromPos,
      toPos,
      maxCreatedAtMapByActor,
      attributes,
      new Array(),
      executedAt
    );
  }
  /**
   * `createTreeRemoveStyleOperation` creates a new instance of TreeStyleOperation for style deletion.
   */
  static createTreeRemoveStyleOperation(parentCreatedAt, fromPos, toPos, maxCreatedAtMapByActor, attributesToRemove, executedAt) {
    return new TreeStyleOperation(
      parentCreatedAt,
      fromPos,
      toPos,
      maxCreatedAtMapByActor,
      /* @__PURE__ */ new Map(),
      attributesToRemove,
      executedAt
    );
  }
  /**
   * `execute` executes this operation on the given `CRDTRoot`.
   */
  execute(root) {
    const parentObject = root.findByCreatedAt(this.getParentCreatedAt());
    if (!parentObject) {
      logger.fatal(`fail to find ${this.getParentCreatedAt()}`);
    }
    if (!(parentObject instanceof CRDTTree)) {
      logger.fatal(`fail to execute, only Tree can execute edit`);
    }
    const tree = parentObject;
    let changes;
    let pairs;
    if (this.attributes.size) {
      const attributes = {};
      [...this.attributes].forEach(([key, value]) => attributes[key] = value);
      [, pairs, changes] = tree.style(
        [this.fromPos, this.toPos],
        attributes,
        this.getExecutedAt(),
        this.maxCreatedAtMapByActor
      );
    } else {
      const attributesToRemove = this.attributesToRemove;
      [, pairs, changes] = tree.removeStyle(
        [this.fromPos, this.toPos],
        attributesToRemove,
        this.getExecutedAt(),
        this.maxCreatedAtMapByActor
      );
    }
    for (const pair of pairs) {
      root.registerGCPair(pair);
    }
    return {
      opInfos: changes.map(({ from, to, value, fromPath, toPath }) => {
        return {
          type: "tree-style",
          from,
          to,
          value: this.attributes.size ? { attributes: value } : { attributesToRemove: value },
          fromPath,
          toPath,
          path: root.createPath(this.getParentCreatedAt())
        };
      })
    };
  }
  /**
   * `getEffectedCreatedAt` returns the creation time of the effected element.
   */
  getEffectedCreatedAt() {
    return this.getParentCreatedAt();
  }
  /**
   * `toTestString` returns a string containing the meta data.
   */
  toTestString() {
    const parent = this.getParentCreatedAt().toTestString();
    const fromPos = `${this.fromPos.getLeftSiblingID().getCreatedAt().toTestString()}:${this.fromPos.getLeftSiblingID().getOffset()}`;
    const toPos = `${this.toPos.getLeftSiblingID().getCreatedAt().toTestString()}:${this.toPos.getLeftSiblingID().getOffset()}`;
    return `${parent}.STYLE(${fromPos},${toPos},${Object.entries(
      this.attributes || {}
    ).map(([k, v]) => `${k}:"${v}"`).join(" ")})`;
  }
  /**
   * `getFromPos` returns the start point of the editing range.
   */
  getFromPos() {
    return this.fromPos;
  }
  /**
   * `getToPos` returns the end point of the editing range.
   */
  getToPos() {
    return this.toPos;
  }
  /**
   * `getAttributes` returns the attributes of Style.
   */
  getAttributes() {
    return this.attributes;
  }
  /**
   * `getAttributesToRemove` returns the attributes of Style to remove.
   */
  getAttributesToRemove() {
    return this.attributesToRemove;
  }
  /**
   * `getMaxCreatedAtMapByActor` returns the map that stores the latest creation time
   * by actor for the nodes included in the styling range.
   */
  getMaxCreatedAtMapByActor() {
    return this.maxCreatedAtMapByActor;
  }
}
function toPresence(presence) {
  const pbPresence = new Presence$1();
  const pbDataMap = pbPresence.data;
  for (const [key, value] of Object.entries(presence)) {
    pbDataMap[key] = JSON.stringify(value);
  }
  return pbPresence;
}
function toPresenceChange(presenceChange) {
  if (presenceChange.type === PresenceChangeType.Put) {
    return new PresenceChange({
      type: PresenceChange_ChangeType.PUT,
      presence: toPresence(presenceChange.presence)
    });
  }
  if (presenceChange.type === PresenceChangeType.Clear) {
    return new PresenceChange({
      type: PresenceChange_ChangeType.CLEAR
    });
  }
  throw new YorkieError(Code.Unimplemented, `unimplemented type`);
}
function toCheckpoint(checkpoint) {
  return new Checkpoint$1({
    serverSeq: checkpoint.getServerSeqAsString(),
    clientSeq: checkpoint.getClientSeq()
  });
}
function toChangeID(changeID) {
  return new ChangeID$1({
    clientSeq: changeID.getClientSeq(),
    lamport: changeID.getLamportAsString(),
    actorId: toUint8Array(changeID.getActorID())
  });
}
function toTimeTicket(ticket) {
  if (!ticket) {
    return;
  }
  return new TimeTicket$1({
    lamport: ticket.getLamportAsString(),
    delimiter: ticket.getDelimiter(),
    actorId: toUint8Array(ticket.getActorID())
  });
}
function toValueType(valueType) {
  switch (valueType) {
    case PrimitiveType.Null:
      return ValueType.NULL;
    case PrimitiveType.Boolean:
      return ValueType.BOOLEAN;
    case PrimitiveType.Integer:
      return ValueType.INTEGER;
    case PrimitiveType.Long:
      return ValueType.LONG;
    case PrimitiveType.Double:
      return ValueType.DOUBLE;
    case PrimitiveType.String:
      return ValueType.STRING;
    case PrimitiveType.Bytes:
      return ValueType.BYTES;
    case PrimitiveType.Date:
      return ValueType.DATE;
    default:
      throw new YorkieError(Code.Unsupported, `unsupported type: ${valueType}`);
  }
}
function toCounterType(valueType) {
  switch (valueType) {
    case CounterType.IntegerCnt:
      return ValueType.INTEGER_CNT;
    case CounterType.LongCnt:
      return ValueType.LONG_CNT;
    default:
      throw new YorkieError(Code.Unsupported, `unsupported type: ${valueType}`);
  }
}
function toElementSimple(element) {
  if (element instanceof CRDTObject) {
    return new JSONElementSimple({
      type: ValueType.JSON_OBJECT,
      createdAt: toTimeTicket(element.getCreatedAt()),
      value: objectToBytes(element)
    });
  }
  if (element instanceof CRDTArray) {
    return new JSONElementSimple({
      type: ValueType.JSON_ARRAY,
      createdAt: toTimeTicket(element.getCreatedAt()),
      value: arrayToBytes(element)
    });
  }
  if (element instanceof CRDTText) {
    return new JSONElementSimple({
      type: ValueType.TEXT,
      createdAt: toTimeTicket(element.getCreatedAt())
    });
  }
  if (element instanceof Primitive) {
    return new JSONElementSimple({
      type: toValueType(element.getType()),
      createdAt: toTimeTicket(element.getCreatedAt()),
      value: element.toBytes()
    });
  }
  if (element instanceof CRDTCounter) {
    return new JSONElementSimple({
      type: toCounterType(element.getType()),
      createdAt: toTimeTicket(element.getCreatedAt()),
      value: element.toBytes()
    });
  }
  if (element instanceof CRDTTree) {
    return new JSONElementSimple({
      type: ValueType.TREE,
      createdAt: toTimeTicket(element.getCreatedAt()),
      value: treeToBytes(element)
    });
  }
  throw new YorkieError(Code.Unimplemented, `unimplemented element`);
}
function toTextNodeID(id) {
  return new TextNodeID({
    createdAt: toTimeTicket(id.getCreatedAt()),
    offset: id.getOffset()
  });
}
function toTextNodePos(pos) {
  return new TextNodePos({
    createdAt: toTimeTicket(pos.getID().getCreatedAt()),
    offset: pos.getID().getOffset(),
    relativeOffset: pos.getRelativeOffset()
  });
}
function toTreePos(pos) {
  return new TreePos({
    parentId: toTreeNodeID(pos.getParentID()),
    leftSiblingId: toTreeNodeID(pos.getLeftSiblingID())
  });
}
function toTreeNodeID(treeNodeID) {
  return new TreeNodeID({
    createdAt: toTimeTicket(treeNodeID.getCreatedAt()),
    offset: treeNodeID.getOffset()
  });
}
function toOperation(operation) {
  const pbOperation = new Operation$1();
  if (operation instanceof SetOperation) {
    const setOperation = operation;
    const pbSetOperation = new Operation_Set();
    pbSetOperation.parentCreatedAt = toTimeTicket(
      setOperation.getParentCreatedAt()
    );
    pbSetOperation.key = setOperation.getKey();
    pbSetOperation.value = toElementSimple(setOperation.getValue());
    pbSetOperation.executedAt = toTimeTicket(setOperation.getExecutedAt());
    pbOperation.body.case = "set";
    pbOperation.body.value = pbSetOperation;
  } else if (operation instanceof AddOperation) {
    const addOperation = operation;
    const pbAddOperation = new Operation_Add();
    pbAddOperation.parentCreatedAt = toTimeTicket(
      addOperation.getParentCreatedAt()
    );
    pbAddOperation.prevCreatedAt = toTimeTicket(
      addOperation.getPrevCreatedAt()
    );
    pbAddOperation.value = toElementSimple(addOperation.getValue());
    pbAddOperation.executedAt = toTimeTicket(addOperation.getExecutedAt());
    pbOperation.body.case = "add";
    pbOperation.body.value = pbAddOperation;
  } else if (operation instanceof MoveOperation) {
    const moveOperation = operation;
    const pbMoveOperation = new Operation_Move();
    pbMoveOperation.parentCreatedAt = toTimeTicket(
      moveOperation.getParentCreatedAt()
    );
    pbMoveOperation.prevCreatedAt = toTimeTicket(
      moveOperation.getPrevCreatedAt()
    );
    pbMoveOperation.createdAt = toTimeTicket(moveOperation.getCreatedAt());
    pbMoveOperation.executedAt = toTimeTicket(moveOperation.getExecutedAt());
    pbOperation.body.case = "move";
    pbOperation.body.value = pbMoveOperation;
  } else if (operation instanceof RemoveOperation) {
    const removeOperation = operation;
    const pbRemoveOperation = new Operation_Remove();
    pbRemoveOperation.parentCreatedAt = toTimeTicket(
      removeOperation.getParentCreatedAt()
    );
    pbRemoveOperation.createdAt = toTimeTicket(removeOperation.getCreatedAt());
    pbRemoveOperation.executedAt = toTimeTicket(
      removeOperation.getExecutedAt()
    );
    pbOperation.body.case = "remove";
    pbOperation.body.value = pbRemoveOperation;
  } else if (operation instanceof EditOperation) {
    const editOperation = operation;
    const pbEditOperation = new Operation_Edit();
    pbEditOperation.parentCreatedAt = toTimeTicket(
      editOperation.getParentCreatedAt()
    );
    pbEditOperation.from = toTextNodePos(editOperation.getFromPos());
    pbEditOperation.to = toTextNodePos(editOperation.getToPos());
    const pbCreatedAtMapByActor = pbEditOperation.createdAtMapByActor;
    for (const [key, value] of editOperation.getMaxCreatedAtMapByActor()) {
      pbCreatedAtMapByActor[key] = toTimeTicket(value);
    }
    pbEditOperation.content = editOperation.getContent();
    const pbAttributes = pbEditOperation.attributes;
    for (const [key, value] of editOperation.getAttributes()) {
      pbAttributes[key] = value;
    }
    pbEditOperation.executedAt = toTimeTicket(editOperation.getExecutedAt());
    pbOperation.body.case = "edit";
    pbOperation.body.value = pbEditOperation;
  } else if (operation instanceof StyleOperation) {
    const styleOperation = operation;
    const pbStyleOperation = new Operation_Style();
    pbStyleOperation.parentCreatedAt = toTimeTicket(
      styleOperation.getParentCreatedAt()
    );
    pbStyleOperation.from = toTextNodePos(styleOperation.getFromPos());
    pbStyleOperation.to = toTextNodePos(styleOperation.getToPos());
    const pbCreatedAtMapByActor = pbStyleOperation.createdAtMapByActor;
    for (const [key, value] of styleOperation.getMaxCreatedAtMapByActor()) {
      pbCreatedAtMapByActor[key] = toTimeTicket(value);
    }
    const pbAttributes = pbStyleOperation.attributes;
    for (const [key, value] of styleOperation.getAttributes()) {
      pbAttributes[key] = value;
    }
    pbStyleOperation.executedAt = toTimeTicket(styleOperation.getExecutedAt());
    pbOperation.body.case = "style";
    pbOperation.body.value = pbStyleOperation;
  } else if (operation instanceof IncreaseOperation) {
    const increaseOperation = operation;
    const pbIncreaseOperation = new Operation_Increase();
    pbIncreaseOperation.parentCreatedAt = toTimeTicket(
      increaseOperation.getParentCreatedAt()
    );
    pbIncreaseOperation.value = toElementSimple(increaseOperation.getValue());
    pbIncreaseOperation.executedAt = toTimeTicket(
      increaseOperation.getExecutedAt()
    );
    pbOperation.body.case = "increase";
    pbOperation.body.value = pbIncreaseOperation;
  } else if (operation instanceof TreeEditOperation) {
    const treeEditOperation = operation;
    const pbTreeEditOperation = new Operation_TreeEdit();
    const pbCreatedAtMapByActor = pbTreeEditOperation.createdAtMapByActor;
    for (const [key, value] of treeEditOperation.getMaxCreatedAtMapByActor()) {
      pbCreatedAtMapByActor[key] = toTimeTicket(value);
    }
    pbTreeEditOperation.parentCreatedAt = toTimeTicket(
      treeEditOperation.getParentCreatedAt()
    );
    pbTreeEditOperation.from = toTreePos(treeEditOperation.getFromPos());
    pbTreeEditOperation.to = toTreePos(treeEditOperation.getToPos());
    pbTreeEditOperation.contents = toTreeNodesWhenEdit(
      treeEditOperation.getContents()
    );
    pbTreeEditOperation.splitLevel = treeEditOperation.getSplitLevel();
    pbTreeEditOperation.executedAt = toTimeTicket(
      treeEditOperation.getExecutedAt()
    );
    pbOperation.body.case = "treeEdit";
    pbOperation.body.value = pbTreeEditOperation;
  } else if (operation instanceof TreeStyleOperation) {
    const treeStyleOperation = operation;
    const pbTreeStyleOperation = new Operation_TreeStyle();
    pbTreeStyleOperation.parentCreatedAt = toTimeTicket(
      treeStyleOperation.getParentCreatedAt()
    );
    pbTreeStyleOperation.from = toTreePos(treeStyleOperation.getFromPos());
    pbTreeStyleOperation.to = toTreePos(treeStyleOperation.getToPos());
    const pbCreatedAtMapByActor = pbTreeStyleOperation.createdAtMapByActor;
    for (const [key, value] of treeStyleOperation.getMaxCreatedAtMapByActor()) {
      pbCreatedAtMapByActor[key] = toTimeTicket(value);
    }
    const attributesToRemove = treeStyleOperation.getAttributesToRemove();
    if (attributesToRemove.length > 0) {
      pbTreeStyleOperation.attributesToRemove = attributesToRemove;
    } else {
      const attributesMap = pbTreeStyleOperation.attributes;
      for (const [key, value] of treeStyleOperation.getAttributes()) {
        attributesMap[key] = value;
      }
    }
    pbTreeStyleOperation.executedAt = toTimeTicket(
      treeStyleOperation.getExecutedAt()
    );
    pbOperation.body.case = "treeStyle";
    pbOperation.body.value = pbTreeStyleOperation;
  } else {
    throw new YorkieError(Code.Unimplemented, "unimplemented operation");
  }
  return pbOperation;
}
function toOperations(operations) {
  const pbOperations = [];
  for (const operation of operations) {
    pbOperations.push(toOperation(operation));
  }
  return pbOperations;
}
function toChange(change) {
  const pbChange = new Change$1({
    id: toChangeID(change.getID()),
    message: change.getMessage()
  });
  if (change.hasOperations()) {
    pbChange.operations = toOperations(change.getOperations());
  }
  if (change.hasPresenceChange()) {
    pbChange.presenceChange = toPresenceChange(change.getPresenceChange());
  }
  return pbChange;
}
function toChanges(changes) {
  const pbChanges = [];
  for (const change of changes) {
    pbChanges.push(toChange(change));
  }
  return pbChanges;
}
function toRHTNodes(rht) {
  const pbRHTNodes = [];
  for (const rhtNode of rht) {
    pbRHTNodes.push(
      new RHTNode$1({
        key: rhtNode.getStrKey(),
        element: toElement(rhtNode.getValue())
      })
    );
  }
  return pbRHTNodes;
}
function toRGANodes(rgaTreeList) {
  const pbRGANodes = [];
  for (const rgaTreeListNode of rgaTreeList) {
    pbRGANodes.push(
      new RGANode({
        element: toElement(rgaTreeListNode.getValue())
      })
    );
  }
  return pbRGANodes;
}
function toTextNodes(rgaTreeSplit) {
  const pbTextNodes = [];
  for (const textNode of rgaTreeSplit) {
    const pbTextNode = new TextNode();
    pbTextNode.id = toTextNodeID(textNode.getID());
    pbTextNode.value = textNode.getValue().getContent();
    pbTextNode.removedAt = toTimeTicket(textNode.getRemovedAt());
    const pbNodeAttrsMap = pbTextNode.attributes;
    const attrs = textNode.getValue().getAttrs();
    for (const attr of attrs) {
      const pbNodeAttr = new NodeAttr();
      pbNodeAttr.value = attr.getValue();
      pbNodeAttr.updatedAt = toTimeTicket(attr.getUpdatedAt());
      pbNodeAttrsMap[attr.getKey()] = pbNodeAttr;
    }
    pbTextNodes.push(pbTextNode);
  }
  return pbTextNodes;
}
function toTreeNodesWhenEdit(nodes) {
  const pbTreeNodesList = [];
  if (!nodes || !nodes.length) {
    return pbTreeNodesList;
  }
  for (const node of nodes) {
    pbTreeNodesList.push(
      new TreeNodes({
        content: toTreeNodes(node)
      })
    );
  }
  return pbTreeNodesList;
}
function toRHT(rht) {
  const pbRHT = {};
  for (const node of rht) {
    pbRHT[node.getKey()] = new NodeAttr({
      value: node.getValue(),
      updatedAt: toTimeTicket(node.getUpdatedAt()),
      isRemoved: node.isRemoved()
    });
  }
  return pbRHT;
}
function toTreeNodes(node) {
  if (!node) {
    return [];
  }
  const pbTreeNodes = [];
  traverseAll(node, (n, depth) => {
    const pbTreeNode = new TreeNode({
      id: toTreeNodeID(n.id),
      type: n.type,
      removedAt: toTimeTicket(n.removedAt),
      depth
    });
    if (n.isText) {
      pbTreeNode.value = n.value;
    }
    if (n.insPrevID) {
      pbTreeNode.insPrevId = toTreeNodeID(n.insPrevID);
    }
    if (n.insNextID) {
      pbTreeNode.insNextId = toTreeNodeID(n.insNextID);
    }
    if (n.attrs) {
      pbTreeNode.attributes = toRHT(n.attrs);
    }
    pbTreeNodes.push(pbTreeNode);
  });
  return pbTreeNodes;
}
function toObject(obj) {
  const pbElement = new JSONElement();
  pbElement.body.case = "jsonObject";
  pbElement.body.value = new JSONElement_JSONObject({
    nodes: toRHTNodes(obj.getRHT()),
    createdAt: toTimeTicket(obj.getCreatedAt()),
    movedAt: toTimeTicket(obj.getMovedAt()),
    removedAt: toTimeTicket(obj.getRemovedAt())
  });
  return pbElement;
}
function toArray(arr) {
  const pbElement = new JSONElement();
  pbElement.body.case = "jsonArray";
  pbElement.body.value = new JSONElement_JSONArray({
    nodes: toRGANodes(arr.getElements()),
    createdAt: toTimeTicket(arr.getCreatedAt()),
    movedAt: toTimeTicket(arr.getMovedAt()),
    removedAt: toTimeTicket(arr.getRemovedAt())
  });
  return pbElement;
}
function toPrimitive(primitive) {
  const pbElement = new JSONElement();
  pbElement.body.case = "primitive";
  pbElement.body.value = new JSONElement_Primitive({
    type: toValueType(primitive.getType()),
    value: primitive.toBytes(),
    createdAt: toTimeTicket(primitive.getCreatedAt()),
    movedAt: toTimeTicket(primitive.getMovedAt()),
    removedAt: toTimeTicket(primitive.getRemovedAt())
  });
  return pbElement;
}
function toText(text) {
  const pbElement = new JSONElement();
  pbElement.body.case = "text";
  pbElement.body.value = new JSONElement_Text({
    nodes: toTextNodes(text.getRGATreeSplit()),
    createdAt: toTimeTicket(text.getCreatedAt()),
    movedAt: toTimeTicket(text.getMovedAt()),
    removedAt: toTimeTicket(text.getRemovedAt())
  });
  return pbElement;
}
function toCounter(counter) {
  const pbElement = new JSONElement();
  pbElement.body.case = "counter";
  pbElement.body.value = new JSONElement_Counter({
    type: toCounterType(counter.getType()),
    value: counter.toBytes(),
    createdAt: toTimeTicket(counter.getCreatedAt()),
    movedAt: toTimeTicket(counter.getMovedAt()),
    removedAt: toTimeTicket(counter.getRemovedAt())
  });
  return pbElement;
}
function toTree(tree) {
  const pbElement = new JSONElement();
  pbElement.body.case = "tree";
  pbElement.body.value = new JSONElement_Tree({
    nodes: toTreeNodes(tree.getRoot()),
    createdAt: toTimeTicket(tree.getCreatedAt()),
    movedAt: toTimeTicket(tree.getMovedAt()),
    removedAt: toTimeTicket(tree.getRemovedAt())
  });
  return pbElement;
}
function toElement(element) {
  if (element instanceof CRDTObject) {
    return toObject(element);
  }
  if (element instanceof CRDTArray) {
    return toArray(element);
  }
  if (element instanceof Primitive) {
    return toPrimitive(element);
  }
  if (element instanceof CRDTText) {
    return toText(element);
  }
  if (element instanceof CRDTCounter) {
    return toCounter(element);
  }
  if (element instanceof CRDTTree) {
    return toTree(element);
  }
  throw new YorkieError(Code.Unimplemented, `unimplemented element`);
}
function toChangePack(pack) {
  return new ChangePack$1({
    documentKey: pack.getDocumentKey(),
    checkpoint: toCheckpoint(pack.getCheckpoint()),
    isRemoved: pack.getIsRemoved(),
    changes: toChanges(pack.getChanges()),
    snapshot: pack.getSnapshot(),
    minSyncedTicket: toTimeTicket(pack.getMinSyncedTicket())
  });
}
function fromChangeID(pbChangeID) {
  let serverSeq;
  if (pbChangeID.serverSeq) {
    serverSeq = Long.fromString(pbChangeID.serverSeq, true);
  }
  return ChangeID.of(
    pbChangeID.clientSeq,
    Long.fromString(pbChangeID.lamport, true),
    toHexString(pbChangeID.actorId),
    serverSeq
  );
}
function fromTimeTicket(pbTimeTicket) {
  if (!pbTimeTicket) {
    return;
  }
  return TimeTicket.of(
    Long.fromString(pbTimeTicket.lamport, true),
    pbTimeTicket.delimiter,
    toHexString(pbTimeTicket.actorId)
  );
}
function fromPresence(pbPresence) {
  const data = {};
  Object.entries(pbPresence.data).forEach(([key, value]) => {
    data[key] = JSON.parse(value);
  });
  return data;
}
function fromPresenceChange(pbPresenceChange) {
  const type = pbPresenceChange.type;
  if (type === PresenceChange_ChangeType.PUT) {
    const presence = fromPresence(pbPresenceChange.presence);
    return {
      type: PresenceChangeType.Put,
      presence
    };
  }
  if (type === PresenceChange_ChangeType.CLEAR) {
    return {
      type: PresenceChangeType.Clear
    };
  }
  throw new YorkieError(Code.Unsupported, `unsupported type: ${type}`);
}
function fromPresences(pbPresences) {
  const presences = /* @__PURE__ */ new Map();
  Object.entries(pbPresences).forEach(([actorID, pbPresence]) => {
    presences.set(actorID, fromPresence(pbPresence));
  });
  return presences;
}
function fromValueType(pbValueType) {
  switch (pbValueType) {
    case ValueType.NULL:
      return PrimitiveType.Null;
    case ValueType.BOOLEAN:
      return PrimitiveType.Boolean;
    case ValueType.INTEGER:
      return PrimitiveType.Integer;
    case ValueType.LONG:
      return PrimitiveType.Long;
    case ValueType.DOUBLE:
      return PrimitiveType.Double;
    case ValueType.STRING:
      return PrimitiveType.String;
    case ValueType.BYTES:
      return PrimitiveType.Bytes;
    case ValueType.DATE:
      return PrimitiveType.Date;
  }
  throw new YorkieError(
    Code.Unimplemented,
    `unimplemented value type: ${pbValueType}`
  );
}
function fromCounterType(pbValueType) {
  switch (pbValueType) {
    case ValueType.INTEGER_CNT:
      return CounterType.IntegerCnt;
    case ValueType.LONG_CNT:
      return CounterType.LongCnt;
  }
  throw new YorkieError(
    Code.Unimplemented,
    `unimplemented value type: ${pbValueType}`
  );
}
function fromElementSimple(pbElementSimple) {
  switch (pbElementSimple.type) {
    case ValueType.JSON_OBJECT:
      if (!pbElementSimple.value) {
        return CRDTObject.create(fromTimeTicket(pbElementSimple.createdAt));
      }
      return bytesToObject(pbElementSimple.value);
    case ValueType.JSON_ARRAY:
      if (!pbElementSimple.value) {
        return CRDTArray.create(fromTimeTicket(pbElementSimple.createdAt));
      }
      return bytesToArray(pbElementSimple.value);
    case ValueType.TEXT:
      return CRDTText.create(
        RGATreeSplit.create(),
        fromTimeTicket(pbElementSimple.createdAt)
      );
    case ValueType.TREE:
      return bytesToTree(pbElementSimple.value);
    case ValueType.NULL:
    case ValueType.BOOLEAN:
    case ValueType.INTEGER:
    case ValueType.LONG:
    case ValueType.DOUBLE:
    case ValueType.STRING:
    case ValueType.BYTES:
    case ValueType.DATE:
      return Primitive.of(
        Primitive.valueFromBytes(
          fromValueType(pbElementSimple.type),
          pbElementSimple.value
        ),
        fromTimeTicket(pbElementSimple.createdAt)
      );
    case ValueType.INTEGER_CNT:
    case ValueType.LONG_CNT:
      return CRDTCounter.create(
        fromCounterType(pbElementSimple.type),
        CRDTCounter.valueFromBytes(
          fromCounterType(pbElementSimple.type),
          pbElementSimple.value
        ),
        fromTimeTicket(pbElementSimple.createdAt)
      );
  }
}
function fromTextNodePos(pbTextNodePos) {
  return RGATreeSplitPos.of(
    RGATreeSplitNodeID.of(
      fromTimeTicket(pbTextNodePos.createdAt),
      pbTextNodePos.offset
    ),
    pbTextNodePos.relativeOffset
  );
}
function fromTextNodeID(pbTextNodeID) {
  return RGATreeSplitNodeID.of(
    fromTimeTicket(pbTextNodeID.createdAt),
    pbTextNodeID.offset
  );
}
function fromTextNode(pbTextNode) {
  const textValue = CRDTTextValue.create(pbTextNode.value);
  Object.entries(pbTextNode.attributes).forEach(([key, value]) => {
    textValue.setAttr(key, value.value, fromTimeTicket(value.updatedAt));
  });
  const textNode = RGATreeSplitNode.create(
    fromTextNodeID(pbTextNode.id),
    textValue
  );
  textNode.remove(fromTimeTicket(pbTextNode.removedAt));
  return textNode;
}
function fromTreePos(pbTreePos) {
  return CRDTTreePos.of(
    fromTreeNodeID(pbTreePos.parentId),
    fromTreeNodeID(pbTreePos.leftSiblingId)
  );
}
function fromTreeNodeID(pbTreeNodeID) {
  return CRDTTreeNodeID.of(
    fromTimeTicket(pbTreeNodeID.createdAt),
    pbTreeNodeID.offset
  );
}
function fromTreeNodesWhenEdit(pbTreeNodes) {
  if (!pbTreeNodes.length) {
    return;
  }
  const treeNodes = [];
  pbTreeNodes.forEach((node) => {
    const treeNode = fromTreeNodes(node.content);
    treeNodes.push(treeNode);
  });
  return treeNodes;
}
function fromTreeNodes(pbTreeNodes) {
  if (pbTreeNodes.length === 0) {
    return;
  }
  const nodes = [];
  for (const pbTreeNode of pbTreeNodes) {
    nodes.push(fromTreeNode(pbTreeNode));
  }
  const root = nodes[nodes.length - 1];
  for (let i = nodes.length - 2; i >= 0; i--) {
    let parent;
    for (let j = i + 1; j < nodes.length; j++) {
      if (pbTreeNodes[i].depth - 1 === pbTreeNodes[j].depth) {
        parent = nodes[j];
        break;
      }
    }
    parent.prepend(nodes[i]);
  }
  root.updateDescendantsSize();
  return CRDTTree.create(root, InitialTimeTicket).getRoot();
}
function fromRHT(pbRHT) {
  const rht = RHT.create();
  for (const [key, pbRHTNode] of Object.entries(pbRHT)) {
    rht.setInternal(
      key,
      pbRHTNode.value,
      fromTimeTicket(pbRHTNode.updatedAt),
      pbRHTNode.isRemoved
    );
  }
  return rht;
}
function fromTreeNode(pbTreeNode) {
  const id = fromTreeNodeID(pbTreeNode.id);
  const node = CRDTTreeNode.create(id, pbTreeNode.type);
  const pbAttrs = Object.entries(pbTreeNode.attributes);
  if (node.isText) {
    node.value = pbTreeNode.value;
  } else if (pbAttrs.length) {
    node.attrs = fromRHT(pbTreeNode.attributes);
  }
  if (pbTreeNode.insPrevId) {
    node.insPrevID = fromTreeNodeID(pbTreeNode.insPrevId);
  }
  if (pbTreeNode.insNextId) {
    node.insNextID = fromTreeNodeID(pbTreeNode.insNextId);
  }
  node.removedAt = fromTimeTicket(pbTreeNode.removedAt);
  return node;
}
function fromOperation(pbOperation) {
  if (pbOperation.body.case === "set") {
    const pbSetOperation = pbOperation.body.value;
    return SetOperation.create(
      pbSetOperation.key,
      fromElementSimple(pbSetOperation.value),
      fromTimeTicket(pbSetOperation.parentCreatedAt),
      fromTimeTicket(pbSetOperation.executedAt)
    );
  } else if (pbOperation.body.case === "add") {
    const pbAddOperation = pbOperation.body.value;
    return AddOperation.create(
      fromTimeTicket(pbAddOperation.parentCreatedAt),
      fromTimeTicket(pbAddOperation.prevCreatedAt),
      fromElementSimple(pbAddOperation.value),
      fromTimeTicket(pbAddOperation.executedAt)
    );
  } else if (pbOperation.body.case === "move") {
    const pbMoveOperation = pbOperation.body.value;
    return MoveOperation.create(
      fromTimeTicket(pbMoveOperation.parentCreatedAt),
      fromTimeTicket(pbMoveOperation.prevCreatedAt),
      fromTimeTicket(pbMoveOperation.createdAt),
      fromTimeTicket(pbMoveOperation.executedAt)
    );
  } else if (pbOperation.body.case === "remove") {
    const pbRemoveOperation = pbOperation.body.value;
    return RemoveOperation.create(
      fromTimeTicket(pbRemoveOperation.parentCreatedAt),
      fromTimeTicket(pbRemoveOperation.createdAt),
      fromTimeTicket(pbRemoveOperation.executedAt)
    );
  } else if (pbOperation.body.case === "edit") {
    const pbEditOperation = pbOperation.body.value;
    const createdAtMapByActor = /* @__PURE__ */ new Map();
    Object.entries(pbEditOperation.createdAtMapByActor).forEach(
      ([key, value]) => {
        createdAtMapByActor.set(key, fromTimeTicket(value));
      }
    );
    const attributes = /* @__PURE__ */ new Map();
    Object.entries(pbEditOperation.attributes).forEach(([key, value]) => {
      attributes.set(key, value);
    });
    return EditOperation.create(
      fromTimeTicket(pbEditOperation.parentCreatedAt),
      fromTextNodePos(pbEditOperation.from),
      fromTextNodePos(pbEditOperation.to),
      createdAtMapByActor,
      pbEditOperation.content,
      attributes,
      fromTimeTicket(pbEditOperation.executedAt)
    );
  } else if (pbOperation.body.case === "style") {
    const pbStyleOperation = pbOperation.body.value;
    const createdAtMapByActor = /* @__PURE__ */ new Map();
    Object.entries(pbStyleOperation.createdAtMapByActor).forEach(
      ([key, value]) => {
        createdAtMapByActor.set(key, fromTimeTicket(value));
      }
    );
    const attributes = /* @__PURE__ */ new Map();
    Object.entries(pbStyleOperation.attributes).forEach(([key, value]) => {
      attributes.set(key, value);
    });
    return StyleOperation.create(
      fromTimeTicket(pbStyleOperation.parentCreatedAt),
      fromTextNodePos(pbStyleOperation.from),
      fromTextNodePos(pbStyleOperation.to),
      createdAtMapByActor,
      attributes,
      fromTimeTicket(pbStyleOperation.executedAt)
    );
  } else if (pbOperation.body.case === "select") {
    return;
  } else if (pbOperation.body.case === "increase") {
    const pbIncreaseOperation = pbOperation.body.value;
    return IncreaseOperation.create(
      fromTimeTicket(pbIncreaseOperation.parentCreatedAt),
      fromElementSimple(pbIncreaseOperation.value),
      fromTimeTicket(pbIncreaseOperation.executedAt)
    );
  } else if (pbOperation.body.case === "treeEdit") {
    const pbTreeEditOperation = pbOperation.body.value;
    const createdAtMapByActor = /* @__PURE__ */ new Map();
    Object.entries(pbTreeEditOperation.createdAtMapByActor).forEach(
      ([key, value]) => {
        createdAtMapByActor.set(key, fromTimeTicket(value));
      }
    );
    return TreeEditOperation.create(
      fromTimeTicket(pbTreeEditOperation.parentCreatedAt),
      fromTreePos(pbTreeEditOperation.from),
      fromTreePos(pbTreeEditOperation.to),
      fromTreeNodesWhenEdit(pbTreeEditOperation.contents),
      pbTreeEditOperation.splitLevel,
      createdAtMapByActor,
      fromTimeTicket(pbTreeEditOperation.executedAt)
    );
  } else if (pbOperation.body.case === "treeStyle") {
    const pbTreeStyleOperation = pbOperation.body.value;
    const attributes = /* @__PURE__ */ new Map();
    const attributesToRemove = pbTreeStyleOperation.attributesToRemove;
    const createdAtMapByActor = /* @__PURE__ */ new Map();
    if (pbTreeStyleOperation == null ? void 0 : pbTreeStyleOperation.createdAtMapByActor) {
      Object.entries(pbTreeStyleOperation.createdAtMapByActor).forEach(
        ([key, value]) => {
          createdAtMapByActor.set(key, fromTimeTicket(value));
        }
      );
    }
    if ((attributesToRemove == null ? void 0 : attributesToRemove.length) > 0) {
      return TreeStyleOperation.createTreeRemoveStyleOperation(
        fromTimeTicket(pbTreeStyleOperation.parentCreatedAt),
        fromTreePos(pbTreeStyleOperation.from),
        fromTreePos(pbTreeStyleOperation.to),
        createdAtMapByActor,
        attributesToRemove,
        fromTimeTicket(pbTreeStyleOperation.executedAt)
      );
    } else {
      Object.entries(pbTreeStyleOperation.attributes).forEach(
        ([key, value]) => {
          attributes.set(key, value);
        }
      );
      return TreeStyleOperation.create(
        fromTimeTicket(pbTreeStyleOperation.parentCreatedAt),
        fromTreePos(pbTreeStyleOperation.from),
        fromTreePos(pbTreeStyleOperation.to),
        createdAtMapByActor,
        attributes,
        fromTimeTicket(pbTreeStyleOperation.executedAt)
      );
    }
  } else {
    throw new YorkieError(Code.Unimplemented, `unimplemented operation`);
  }
}
function fromOperations(pbOperations) {
  const operations = [];
  for (const pbOperation of pbOperations) {
    const operation = fromOperation(pbOperation);
    if (operation) {
      operations.push(operation);
    }
  }
  return operations;
}
function fromChanges(pbChanges) {
  const changes = [];
  for (const pbChange of pbChanges) {
    changes.push(
      Change.create({
        id: fromChangeID(pbChange.id),
        operations: fromOperations(pbChange.operations),
        presenceChange: pbChange.presenceChange ? fromPresenceChange(pbChange.presenceChange) : void 0,
        message: pbChange.message
      })
    );
  }
  return changes;
}
function fromCheckpoint(pbCheckpoint) {
  return Checkpoint.of(
    Long.fromString(pbCheckpoint.serverSeq, true),
    pbCheckpoint.clientSeq
  );
}
function fromChangePack(pbPack) {
  return ChangePack.create(
    pbPack.documentKey,
    fromCheckpoint(pbPack.checkpoint),
    pbPack.isRemoved,
    fromChanges(pbPack.changes),
    pbPack.snapshot,
    fromTimeTicket(pbPack.minSyncedTicket)
  );
}
function fromObject(pbObject) {
  const rht = new ElementRHT();
  for (const pbRHTNode of pbObject.nodes) {
    const value = fromElement(pbRHTNode.element);
    rht.set(pbRHTNode.key, value, value.getPositionedAt());
  }
  const obj = new CRDTObject(fromTimeTicket(pbObject.createdAt), rht);
  obj.setMovedAt(fromTimeTicket(pbObject.movedAt));
  obj.setRemovedAt(fromTimeTicket(pbObject.removedAt));
  return obj;
}
function fromArray(pbArray) {
  const rgaTreeList = new RGATreeList();
  for (const pbRGANode of pbArray.nodes) {
    rgaTreeList.insert(fromElement(pbRGANode.element));
  }
  const arr = new CRDTArray(fromTimeTicket(pbArray.createdAt), rgaTreeList);
  arr.setMovedAt(fromTimeTicket(pbArray.movedAt));
  arr.setRemovedAt(fromTimeTicket(pbArray.removedAt));
  return arr;
}
function fromPrimitive(pbPrimitive) {
  const primitive = Primitive.of(
    Primitive.valueFromBytes(
      fromValueType(pbPrimitive.type),
      pbPrimitive.value
    ),
    fromTimeTicket(pbPrimitive.createdAt)
  );
  primitive.setMovedAt(fromTimeTicket(pbPrimitive.movedAt));
  primitive.setRemovedAt(fromTimeTicket(pbPrimitive.removedAt));
  return primitive;
}
function fromText(pbText) {
  const rgaTreeSplit = new RGATreeSplit();
  let prev = rgaTreeSplit.getHead();
  for (const pbNode of pbText.nodes) {
    const current = rgaTreeSplit.insertAfter(prev, fromTextNode(pbNode));
    if (pbNode.insPrevId) {
      current.setInsPrev(
        rgaTreeSplit.findNode(fromTextNodeID(pbNode.insPrevId))
      );
    }
    prev = current;
  }
  const text = new CRDTText(rgaTreeSplit, fromTimeTicket(pbText.createdAt));
  text.setMovedAt(fromTimeTicket(pbText.movedAt));
  text.setRemovedAt(fromTimeTicket(pbText.removedAt));
  return text;
}
function fromCounter(pbCounter) {
  const counter = CRDTCounter.create(
    fromCounterType(pbCounter.type),
    CRDTCounter.valueFromBytes(
      fromCounterType(pbCounter.type),
      pbCounter.value
    ),
    fromTimeTicket(pbCounter.createdAt)
  );
  counter.setMovedAt(fromTimeTicket(pbCounter.movedAt));
  counter.setRemovedAt(fromTimeTicket(pbCounter.removedAt));
  return counter;
}
function fromTree(pbTree) {
  const root = fromTreeNodes(pbTree.nodes);
  return CRDTTree.create(root, fromTimeTicket(pbTree.createdAt));
}
function fromElement(pbElement) {
  if (pbElement.body.case === "jsonObject") {
    return fromObject(pbElement.body.value);
  } else if (pbElement.body.case === "jsonArray") {
    return fromArray(pbElement.body.value);
  } else if (pbElement.body.case === "primitive") {
    return fromPrimitive(pbElement.body.value);
  } else if (pbElement.body.case === "text") {
    return fromText(pbElement.body.value);
  } else if (pbElement.body.case === "counter") {
    return fromCounter(pbElement.body.value);
  } else if (pbElement.body.case === "tree") {
    return fromTree(pbElement.body.value);
  } else {
    throw new YorkieError(Code.Unimplemented, `unimplemented element`);
  }
}
function bytesToSnapshot(bytes) {
  if (!bytes) {
    return {
      root: CRDTObject.create(InitialTimeTicket),
      presences: /* @__PURE__ */ new Map()
    };
  }
  const snapshot = Snapshot.fromBinary(bytes);
  return {
    root: fromElement(snapshot.root),
    presences: fromPresences(snapshot.presences)
  };
}
function bytesToObject(bytes) {
  if (!bytes) {
    throw new Error("bytes is empty");
  }
  const pbElement = JSONElement.fromBinary(bytes);
  return fromObject(pbElement.body.value);
}
function objectToBytes(obj) {
  return toElement(obj).toBinary();
}
function bytesToArray(bytes) {
  if (!bytes) {
    throw new Error("bytes is empty");
  }
  const pbElement = JSONElement.fromBinary(bytes);
  return fromArray(pbElement.body.value);
}
function arrayToBytes(array) {
  return toArray(array).toBinary();
}
function bytesToTree(bytes) {
  if (!bytes) {
    throw new Error("bytes is empty");
  }
  const pbElement = JSONElement.fromBinary(bytes);
  return fromTree(pbElement.body.value);
}
function treeToBytes(tree) {
  return toTree(tree).toBinary();
}
function bytesToHex(bytes) {
  if (!bytes) {
    return "";
  }
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function toHexString(bytes) {
  return bytesToHex(bytes);
}
function hexToBytes(hex) {
  return new Uint8Array(
    hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );
}
function toUint8Array(hex) {
  return hexToBytes(hex);
}
function bytesToChangeID(bytes) {
  const pbChangeID = ChangeID$1.fromBinary(bytes);
  return fromChangeID(pbChangeID);
}
function bytesToOperation(bytes) {
  const pbOperation = Operation$1.fromBinary(bytes);
  return fromOperation(pbOperation);
}
const converter = {
  fromPresence,
  toChangePack,
  fromChangePack,
  fromChanges,
  objectToBytes,
  bytesToObject,
  bytesToSnapshot,
  bytesToHex,
  hexToBytes,
  toHexString,
  toUint8Array,
  toOperation,
  toChangeID,
  PbChangeID: ChangeID$1,
  bytesToChangeID,
  bytesToOperation
};
function uuid() {
  return "xxxxxxxx-xxxx-4xxxy-xxxx-xxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
class Attachment {
  constructor(reconnectStreamDelay, doc, docID, syncMode) {
    // TODO(hackerwins): Consider to changing the modifiers of the following properties to private.
    __publicField(this, "reconnectStreamDelay");
    __publicField(this, "doc");
    __publicField(this, "docID");
    __publicField(this, "syncMode");
    __publicField(this, "remoteChangeEventReceived");
    __publicField(this, "watchStream");
    __publicField(this, "watchLoopTimerID");
    __publicField(this, "watchAbortController");
    this.reconnectStreamDelay = reconnectStreamDelay;
    this.doc = doc;
    this.docID = docID;
    this.syncMode = syncMode;
    this.remoteChangeEventReceived = false;
  }
  /**
   * `changeSyncMode` changes the sync mode of the document.
   */
  changeSyncMode(syncMode) {
    this.syncMode = syncMode;
  }
  /**
   * `needRealtimeSync` returns whether the document needs to be synced in real time.
   */
  needRealtimeSync() {
    if (this.syncMode === SyncMode.RealtimeSyncOff) {
      return false;
    }
    if (this.syncMode === SyncMode.RealtimePushOnly) {
      return this.doc.hasLocalChanges();
    }
    return this.syncMode !== SyncMode.Manual && (this.doc.hasLocalChanges() || this.remoteChangeEventReceived);
  }
  /**
   * `runWatchLoop` runs the watch loop.
   */
  async runWatchLoop(watchStreamCreator) {
    const doLoop = async () => {
      if (this.watchStream) {
        return Promise.resolve();
      }
      if (this.watchLoopTimerID) {
        clearTimeout(this.watchLoopTimerID);
        this.watchLoopTimerID = void 0;
      }
      try {
        [this.watchStream, this.watchAbortController] = await watchStreamCreator(() => {
          this.watchStream = void 0;
          this.watchAbortController = void 0;
          this.watchLoopTimerID = setTimeout(
            doLoop,
            this.reconnectStreamDelay
          );
        });
      } catch (err) {
      }
    };
    await doLoop();
  }
  /**
   * `cancelWatchStream` cancels the watch stream.
   */
  cancelWatchStream() {
    if (this.watchStream && this.watchAbortController) {
      this.watchAbortController.abort();
      this.watchStream = void 0;
      this.watchAbortController = void 0;
    }
    clearTimeout(this.watchLoopTimerID);
    this.watchLoopTimerID = void 0;
  }
}
const Noop = () => {
};
class ObserverProxy {
  constructor(executor) {
    __publicField(this, "finalized", false);
    __publicField(this, "observers", []);
    __publicField(this, "finalError");
    try {
      executor(this);
    } catch (error) {
      this.error(error);
    }
  }
  /**
   * `next` iterates next observer synchronously.
   */
  next(value) {
    this.forEachObserver((observer) => {
      observer.next(value);
    });
  }
  /**
   * `error` invoke error.
   */
  error(error) {
    this.forEachObserver((observer) => {
      observer.error(error);
    });
    this.close(error);
  }
  /**
   * `complete` completes observer.
   */
  complete() {
    this.forEachObserver((observer) => {
      observer.complete();
    });
    this.close();
  }
  /**
   * `subscribe` is a function for subscribing observer.
   */
  subscribe(nextOrObserver, error, complete) {
    let observer;
    if (!nextOrObserver) {
      logger.fatal("missing observer");
    }
    if (this.finalized) {
      logger.fatal("observable is finalized due to previous error");
    }
    if (typeof nextOrObserver === "object") {
      observer = nextOrObserver;
    } else {
      observer = {
        next: nextOrObserver,
        error,
        complete
      };
    }
    if (observer.next === void 0) {
      observer.next = Noop;
    }
    if (observer.error === void 0) {
      observer.error = Noop;
    }
    if (observer.complete === void 0) {
      observer.complete = Noop;
    }
    const id = uuid();
    const unsub = this.unsubscribeOne.bind(this, id);
    this.observers.push({
      subscriptionID: id,
      observer
    });
    if (this.finalized) {
      try {
        if (this.finalError) {
          observer.error(this.finalError);
        } else {
          observer.complete();
        }
      } catch (err) {
        logger.warn(err);
      }
    }
    return unsub;
  }
  unsubscribeOne(id) {
    var _a;
    this.observers = (_a = this.observers) == null ? void 0 : _a.filter((it) => it.subscriptionID !== id);
  }
  forEachObserver(fn) {
    if (this.finalized) {
      return;
    }
    for (let i = 0; i < this.observers.length; i++) {
      this.sendOne(i, fn);
    }
  }
  sendOne(i, fn) {
    if (this.observers !== void 0 && this.observers[i] !== void 0) {
      try {
        fn(this.observers[i].observer);
      } catch (err) {
        logger.error(err);
      }
    }
  }
  close(err) {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    if (err !== void 0) {
      this.finalError = err;
    }
    this.observers = void 0;
  }
}
function createObservable(executor) {
  const proxy = new ObserverProxy(executor);
  return {
    subscribe: proxy.subscribe.bind(proxy),
    getProxy: () => {
      return proxy;
    }
  };
}
class ChangeContext {
  constructor(id, root, presence, message) {
    __publicField(this, "id");
    __publicField(this, "delimiter");
    __publicField(this, "message");
    __publicField(this, "root");
    __publicField(this, "operations");
    __publicField(this, "presenceChange");
    /**
     * `previousPresence` stores the previous presence to be used for undoing
     * presence changes.
     */
    __publicField(this, "previousPresence");
    /**
     * `reversePresenceKeys` stores the keys of the presence to be used for undoing
     * presence changes.
     */
    __publicField(this, "reversePresenceKeys");
    this.id = id;
    this.delimiter = InitialDelimiter;
    this.root = root;
    this.operations = [];
    this.previousPresence = deepcopy(presence);
    this.presenceChange = void 0;
    this.reversePresenceKeys = /* @__PURE__ */ new Set();
    this.message = message;
  }
  /**
   * `create` creates a new instance of ChangeContext.
   */
  static create(id, root, presence, message) {
    return new ChangeContext(id, root, presence, message);
  }
  /**
   * `push` pushes the given operation to this context.
   */
  push(operation) {
    this.operations.push(operation);
  }
  /**
   * `registerElement` registers the given element to the root.
   */
  registerElement(element, parent) {
    this.root.registerElement(element, parent);
  }
  /**
   * `registerRemovedElement` register removed element for garbage collection.
   */
  registerRemovedElement(deleted) {
    this.root.registerRemovedElement(deleted);
  }
  /**
   * `registerGCPair` registers the given pair to hash table.
   */
  registerGCPair(pair) {
    this.root.registerGCPair(pair);
  }
  /**
   * `getChange` creates a new instance of Change in this context.
   */
  getChange() {
    return Change.create({
      id: this.id,
      operations: this.operations,
      presenceChange: this.presenceChange,
      message: this.message
    });
  }
  /**
   * `hasChange` returns whether this context has change or not.
   */
  hasChange() {
    return this.operations.length > 0 || this.presenceChange !== void 0;
  }
  /**
   * `setPresenceChange` registers the presence change to this context.
   */
  setPresenceChange(presenceChange) {
    this.presenceChange = presenceChange;
  }
  /**
   * `setReversePresence` registers the previous presence to undo presence updates.
   */
  setReversePresence(presence, option) {
    for (const key of Object.keys(presence)) {
      if (option == null ? void 0 : option.addToHistory) {
        this.reversePresenceKeys.add(key);
      } else {
        this.reversePresenceKeys.delete(key);
      }
    }
  }
  /**
   * `toReversePresence` returns the reverse presence of this context.
   */
  getReversePresence() {
    if (this.reversePresenceKeys.size === 0)
      return void 0;
    const reversePresence = {};
    for (const key of this.reversePresenceKeys) {
      reversePresence[key] = this.previousPresence[key];
    }
    return reversePresence;
  }
  /**
   * `issueTimeTicket` creates a time ticket to be used to create a new operation.
   */
  issueTimeTicket() {
    this.delimiter += 1;
    return this.id.createTimeTicket(this.delimiter);
  }
  /**
   * `getLastTimeTicket` returns the last time ticket issued in this context.
   */
  getLastTimeTicket() {
    return this.id.createTimeTicket(this.delimiter);
  }
}
class CRDTRoot {
  constructor(rootObject) {
    /**
     * `rootObject` is the root object of the document.
     */
    __publicField(this, "rootObject");
    /**
     * `elementPairMapByCreatedAt` is a hash table that maps the creation time of
     * an element to the element itself and its parent.
     */
    __publicField(this, "elementPairMapByCreatedAt");
    /**
     * `gcElementSetByCreatedAt` is a hash set that contains the creation
     * time of the removed element. It is used to find the removed element when
     * executing garbage collection.
     */
    __publicField(this, "gcElementSetByCreatedAt");
    /**
     * `gcPairMap` is a hash table that maps the IDString of GCChild to the
     * element itself and its parent.
     */
    __publicField(this, "gcPairMap");
    this.rootObject = rootObject;
    this.elementPairMapByCreatedAt = /* @__PURE__ */ new Map();
    this.gcElementSetByCreatedAt = /* @__PURE__ */ new Set();
    this.gcPairMap = /* @__PURE__ */ new Map();
    this.registerElement(rootObject, void 0);
    rootObject.getDescendants((elem) => {
      if (elem.getRemovedAt()) {
        this.registerRemovedElement(elem);
      }
      if (elem instanceof CRDTText || elem instanceof CRDTTree) {
        for (const pair of elem.getGCPairs()) {
          this.registerGCPair(pair);
        }
      }
      return false;
    });
  }
  /**
   * `create` creates a new instance of Root.
   */
  static create() {
    return new CRDTRoot(CRDTObject.create(InitialTimeTicket));
  }
  /**
   * `findByCreatedAt` returns the element of given creation time.
   */
  findByCreatedAt(createdAt) {
    const pair = this.elementPairMapByCreatedAt.get(createdAt.toIDString());
    if (!pair) {
      return;
    }
    return pair.element;
  }
  /**
   * `findElementPairByCreatedAt` returns the element and parent pair
   * of given creation time.
   */
  findElementPairByCreatedAt(createdAt) {
    return this.elementPairMapByCreatedAt.get(createdAt.toIDString());
  }
  /**
   * `createSubPaths` creates an array of the sub paths for the given element.
   */
  createSubPaths(createdAt) {
    let pair = this.elementPairMapByCreatedAt.get(createdAt.toIDString());
    if (!pair) {
      return [];
    }
    const subPaths = [];
    while (pair.parent) {
      const createdAt2 = pair.element.getCreatedAt();
      const subPath = pair.parent.subPathOf(createdAt2);
      if (subPath === void 0) {
        logger.fatal(`cant find the given element: ${createdAt2.toIDString()}`);
      }
      subPaths.unshift(subPath);
      pair = this.elementPairMapByCreatedAt.get(
        pair.parent.getCreatedAt().toIDString()
      );
    }
    subPaths.unshift("$");
    return subPaths;
  }
  /**
   * `createPath` creates path of the given element.
   */
  createPath(createdAt) {
    return this.createSubPaths(createdAt).join(".");
  }
  /**
   * `registerElement` registers the given element and its descendants to hash table.
   */
  registerElement(element, parent) {
    this.elementPairMapByCreatedAt.set(element.getCreatedAt().toIDString(), {
      parent,
      element
    });
    if (element instanceof CRDTContainer) {
      element.getDescendants((elem, parent2) => {
        this.registerElement(elem, parent2);
        return false;
      });
    }
  }
  /**
   * `deregisterElement` deregister the given element and its descendants from hash table.
   */
  deregisterElement(element) {
    let count = 0;
    const deregisterElementInternal = (elem) => {
      const createdAt = elem.getCreatedAt().toIDString();
      this.elementPairMapByCreatedAt.delete(createdAt);
      this.gcElementSetByCreatedAt.delete(createdAt);
      count++;
    };
    deregisterElementInternal(element);
    if (element instanceof CRDTContainer) {
      element.getDescendants((e) => {
        deregisterElementInternal(e);
        return false;
      });
    }
    return count;
  }
  /**
   * `registerRemovedElement` registers the given element to the hash set.
   */
  registerRemovedElement(element) {
    this.gcElementSetByCreatedAt.add(element.getCreatedAt().toIDString());
  }
  /**
   * `registerGCPair` registers the given pair to hash table.
   */
  registerGCPair(pair) {
    const prev = this.gcPairMap.get(pair.child.toIDString());
    if (prev) {
      this.gcPairMap.delete(pair.child.toIDString());
      return;
    }
    this.gcPairMap.set(pair.child.toIDString(), pair);
  }
  /**
   * `getElementMapSize` returns the size of element map.
   */
  getElementMapSize() {
    return this.elementPairMapByCreatedAt.size;
  }
  /**
   * `getGarbageElementSetSize()` returns the size of removed element set.
   */
  getGarbageElementSetSize() {
    const seen = /* @__PURE__ */ new Set();
    for (const createdAt of this.gcElementSetByCreatedAt) {
      seen.add(createdAt);
      const pair = this.elementPairMapByCreatedAt.get(createdAt);
      if (pair.element instanceof CRDTContainer) {
        pair.element.getDescendants((el) => {
          seen.add(el.getCreatedAt().toIDString());
          return false;
        });
      }
    }
    return seen.size;
  }
  /**
   * `getObject` returns root object.
   */
  getObject() {
    return this.rootObject;
  }
  /**
   * `getGarbageLen` returns length of nodes which can be garbage collected.
   */
  getGarbageLen() {
    return this.getGarbageElementSetSize() + this.gcPairMap.size;
  }
  /**
   * `deepcopy` copies itself deeply.
   */
  deepcopy() {
    return new CRDTRoot(this.rootObject.deepcopy());
  }
  /**
   * `garbageCollect` purges elements that were removed before the given time.
   */
  garbageCollect(ticket) {
    let count = 0;
    for (const createdAt of this.gcElementSetByCreatedAt) {
      const pair = this.elementPairMapByCreatedAt.get(createdAt);
      if (pair.element.getRemovedAt() && ticket.compare(pair.element.getRemovedAt()) >= 0) {
        pair.parent.purge(pair.element);
        count += this.deregisterElement(pair.element);
      }
    }
    for (const [, pair] of this.gcPairMap) {
      const removedAt = pair.child.getRemovedAt();
      if (removedAt !== void 0 && ticket.compare(removedAt) >= 0) {
        pair.parent.purge(pair.child);
        this.gcPairMap.delete(pair.child.toIDString());
        count += 1;
      }
    }
    return count;
  }
  /**
   * `toJSON` returns the JSON encoding of this root object.
   */
  toJSON() {
    return this.rootObject.toJSON();
  }
  /**
   * `toSortedJSON` returns the sorted JSON encoding of this root object.
   */
  toSortedJSON() {
    return this.rootObject.toSortedJSON();
  }
}
function createJSONObject(context, target) {
  const objectProxy = new ObjectProxy(context);
  return new Proxy(target, objectProxy.getHandlers());
}
class ObjectProxy {
  constructor(context) {
    __publicField(this, "context");
    __publicField(this, "handlers");
    this.context = context;
    this.handlers = {
      set: (target, key, value) => {
        if (logger.isEnabled(LogLevel.Trivial)) {
          logger.trivial(`obj[${key}]=${JSON.stringify(value)}`);
        }
        ObjectProxy.setInternal(context, target, key, value);
        return true;
      },
      get: (target, keyOrMethod) => {
        if (logger.isEnabled(LogLevel.Trivial)) {
          logger.trivial(`obj[${keyOrMethod}]`);
        }
        if (keyOrMethod === "getID") {
          return () => {
            return target.getCreatedAt();
          };
        } else if (keyOrMethod === "toJSON" || keyOrMethod === "toString") {
          return () => {
            return target.toJSON();
          };
        } else if (keyOrMethod === "toJS") {
          return () => {
            return target.toJS();
          };
        } else if (keyOrMethod === "toJSForTest") {
          return () => {
            return target.toJSForTest();
          };
        }
        return toJSONElement(context, target.get(keyOrMethod));
      },
      ownKeys: (target) => {
        return target.getKeys();
      },
      getOwnPropertyDescriptor: () => {
        return {
          enumerable: true,
          configurable: true
        };
      },
      deleteProperty: (target, key) => {
        if (logger.isEnabled(LogLevel.Trivial)) {
          logger.trivial(`obj[${key}]`);
        }
        ObjectProxy.deleteInternal(context, target, key);
        return true;
      }
    };
  }
  /**
   * `setInternal` sets a new Object for the given key
   */
  static setInternal(context, target, key, value) {
    if (key.includes(".")) {
      throw new YorkieError(
        Code.InvalidObjectKey,
        `key must not contain the '.'.`
      );
    }
    const createdAt = context.issueTimeTicket();
    const element = buildCRDTElement(context, value, createdAt);
    const removed = target.set(key, element, createdAt);
    context.registerElement(element, target);
    if (removed) {
      context.registerRemovedElement(removed);
    }
    context.push(
      SetOperation.create(
        key,
        element.deepcopy(),
        target.getCreatedAt(),
        createdAt
      )
    );
  }
  /**
   * `buildObjectMembers` constructs an object where all values from the
   * user-provided object are transformed into CRDTElements.
   * This function takes an object and iterates through its values,
   * converting each value into a corresponding CRDTElement.
   */
  static buildObjectMembers(context, value) {
    const members = {};
    for (const [k, v] of Object.entries(value)) {
      if (k.includes(".")) {
        throw new YorkieError(
          Code.InvalidObjectKey,
          `key must not contain the '.'.`
        );
      }
      const createdAt = context.issueTimeTicket();
      const elem = buildCRDTElement(context, v, createdAt);
      members[k] = elem;
    }
    return members;
  }
  /**
   * `deleteInternal` deletes the value of the given key.
   */
  static deleteInternal(context, target, key) {
    const ticket = context.issueTimeTicket();
    const deleted = target.deleteByKey(key, ticket);
    if (!deleted) {
      return;
    }
    context.push(
      RemoveOperation.create(
        target.getCreatedAt(),
        deleted.getCreatedAt(),
        ticket
      )
    );
    context.registerRemovedElement(deleted);
  }
  /**
   * `getHandlers` gets handlers.
   */
  getHandlers() {
    return this.handlers;
  }
}
function createJSONArray(context, target) {
  const arrayProxy = new ArrayProxy(context, target);
  return new Proxy(target, arrayProxy.getHandlers());
}
function isNumericString(val) {
  if (typeof val === "string" || val instanceof String) {
    return !isNaN(val);
  }
  return false;
}
function isReadOnlyArrayMethod(method) {
  return [
    "concat",
    "entries",
    "every",
    "filter",
    "find",
    "findIndex",
    "forEach",
    "join",
    "keys",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some",
    "toLocaleString",
    "toString",
    "values"
  ].includes(method);
}
class ArrayProxy {
  constructor(context, array) {
    __publicField(this, "context");
    __publicField(this, "handlers");
    __publicField(this, "array");
    this.context = context;
    this.array = array;
    this.handlers = {
      get: (target, method, receiver) => {
        if (method === "getID") {
          return () => {
            return target.getCreatedAt();
          };
        } else if (method === "getElementByID") {
          return (createdAt) => {
            const elem = target.getByID(createdAt);
            if (!elem || elem.isRemoved()) {
              return;
            }
            return toWrappedElement(context, elem);
          };
        } else if (method === "getElementByIndex") {
          return (index) => {
            const elem = target.get(index);
            return toWrappedElement(context, elem);
          };
        } else if (method === "getLast") {
          return () => {
            return toWrappedElement(context, target.getLast());
          };
        } else if (method === "deleteByID") {
          return (createdAt) => {
            const deleted = ArrayProxy.deleteInternalByID(
              context,
              target,
              createdAt
            );
            return toWrappedElement(context, deleted);
          };
        } else if (method === "insertAfter") {
          return (prevID, value) => {
            const inserted = ArrayProxy.insertAfterInternal(
              context,
              target,
              prevID,
              value
            );
            return toWrappedElement(context, inserted);
          };
        } else if (method === "insertBefore") {
          return (nextID, value) => {
            const inserted = ArrayProxy.insertBeforeInternal(
              context,
              target,
              nextID,
              value
            );
            return toWrappedElement(context, inserted);
          };
        } else if (method === "moveBefore") {
          return (nextID, id) => {
            ArrayProxy.moveBeforeInternal(context, target, nextID, id);
          };
        } else if (method === "moveAfter") {
          return (prevID, id) => {
            ArrayProxy.moveAfterInternal(context, target, prevID, id);
          };
        } else if (method === "moveFront") {
          return (id) => {
            ArrayProxy.moveFrontInternal(context, target, id);
          };
        } else if (method === "moveLast") {
          return (id) => {
            ArrayProxy.moveLastInternal(context, target, id);
          };
        } else if (isNumericString(method)) {
          return toJSONElement(context, target.get(Number(method)));
        } else if (method === "push") {
          return (value) => {
            return ArrayProxy.pushInternal(context, target, value);
          };
        } else if (method === "splice") {
          return (start, deleteCount, ...items) => {
            return ArrayProxy.splice(
              context,
              target,
              start,
              deleteCount,
              ...items
            );
          };
        } else if (method === "length") {
          return target.length;
        } else if (typeof method === "symbol" && method === Symbol.iterator) {
          return ArrayProxy.iteratorInternal.bind(this, context, target);
        } else if (method === "includes") {
          return (searchElement, fromIndex) => {
            return ArrayProxy.includes(
              context,
              target,
              searchElement,
              fromIndex
            );
          };
        } else if (method === "indexOf") {
          return (searchElement, fromIndex) => {
            return ArrayProxy.indexOf(
              context,
              target,
              searchElement,
              fromIndex
            );
          };
        } else if (method === "lastIndexOf") {
          return (searchElement, fromIndex) => {
            return ArrayProxy.lastIndexOf(
              context,
              target,
              searchElement,
              fromIndex
            );
          };
        } else if (method === "toJSForTest") {
          return () => {
            return target.toJSForTest();
          };
        } else if (method === "toTestString") {
          return () => ArrayProxy.toTestString(target);
        } else if (typeof method === "string" && isReadOnlyArrayMethod(method)) {
          return (...args) => {
            const arr = Array.from(target).map(
              (elem) => toJSONElement(context, elem)
            );
            return Array.prototype[method].apply(arr, args);
          };
        }
        return Reflect.get(target, method, receiver);
      },
      deleteProperty: (target, key) => {
        if (logger.isEnabled(LogLevel.Trivial)) {
          logger.trivial(`array[${key}]`);
        }
        ArrayProxy.deleteInternalByIndex(context, target, Number.parseInt(key));
        return true;
      }
    };
  }
  // eslint-disable-next-line jsdoc/require-jsdoc
  static *iteratorInternal(change, target) {
    for (const elem of target) {
      yield toWrappedElement(change, elem);
    }
  }
  /**
   * `buildArrayElements` constructs array elements based on the user-provided array.
   */
  static buildArrayElements(context, value) {
    const elements = [];
    for (const v of value) {
      const createdAt = context.issueTimeTicket();
      const elem = buildCRDTElement(context, v, createdAt);
      elements.push(elem);
    }
    return elements;
  }
  /**
   * `pushInternal` pushes the value to the target array.
   */
  static pushInternal(context, target, value) {
    ArrayProxy.insertAfterInternal(
      context,
      target,
      target.getLastCreatedAt(),
      value
    );
    return target.length;
  }
  /**
   * `moveBeforeInternal` moves the given `createdAt` element
   * after the previously created element.
   */
  static moveBeforeInternal(context, target, nextCreatedAt, createdAt) {
    const ticket = context.issueTimeTicket();
    const prevCreatedAt = target.getPrevCreatedAt(nextCreatedAt);
    target.moveAfter(prevCreatedAt, createdAt, ticket);
    context.push(
      MoveOperation.create(
        target.getCreatedAt(),
        prevCreatedAt,
        createdAt,
        ticket
      )
    );
  }
  /**
   * `moveAfterInternal` moves the given `createdAt` element
   * after the specific element.
   */
  static moveAfterInternal(context, target, prevCreatedAt, createdAt) {
    const ticket = context.issueTimeTicket();
    target.moveAfter(prevCreatedAt, createdAt, ticket);
    context.push(
      MoveOperation.create(
        target.getCreatedAt(),
        prevCreatedAt,
        createdAt,
        ticket
      )
    );
  }
  /**
   * `moveFrontInternal` moves the given `createdAt` element
   * at the first of array.
   */
  static moveFrontInternal(context, target, createdAt) {
    const ticket = context.issueTimeTicket();
    const head = target.getHead();
    target.moveAfter(head.getCreatedAt(), createdAt, ticket);
    context.push(
      MoveOperation.create(
        target.getCreatedAt(),
        head.getCreatedAt(),
        createdAt,
        ticket
      )
    );
  }
  /**
   * `moveLastInternal` moves the given `createdAt` element
   * at the last of array.
   */
  static moveLastInternal(context, target, createdAt) {
    const ticket = context.issueTimeTicket();
    const last = target.getLastCreatedAt();
    target.moveAfter(last, createdAt, ticket);
    context.push(
      MoveOperation.create(target.getCreatedAt(), last, createdAt, ticket)
    );
  }
  /**
   * `insertAfterInternal` inserts the value after the previously created element.
   */
  static insertAfterInternal(context, target, prevCreatedAt, value) {
    const createdAt = context.issueTimeTicket();
    const element = buildCRDTElement(context, value, createdAt);
    target.insertAfter(prevCreatedAt, element);
    context.registerElement(element, target);
    context.push(
      AddOperation.create(
        target.getCreatedAt(),
        prevCreatedAt,
        element.deepcopy(),
        createdAt
      )
    );
    return element;
  }
  /**
   * `insertBeforeInternal` inserts the value before the previously created element.
   */
  static insertBeforeInternal(context, target, nextCreatedAt, value) {
    return ArrayProxy.insertAfterInternal(
      context,
      target,
      target.getPrevCreatedAt(nextCreatedAt),
      value
    );
  }
  /**
   * `deleteInternalByIndex` deletes target element of given index.
   */
  static deleteInternalByIndex(context, target, index) {
    const ticket = context.issueTimeTicket();
    const deleted = target.deleteByIndex(index, ticket);
    if (!deleted) {
      return;
    }
    context.push(
      RemoveOperation.create(
        target.getCreatedAt(),
        deleted.getCreatedAt(),
        ticket
      )
    );
    context.registerRemovedElement(deleted);
    return deleted;
  }
  /**
   * `deleteInternalByID` deletes the element of the given ID.
   */
  static deleteInternalByID(context, target, createdAt) {
    const ticket = context.issueTimeTicket();
    const deleted = target.delete(createdAt, ticket);
    context.push(
      RemoveOperation.create(
        target.getCreatedAt(),
        deleted.getCreatedAt(),
        ticket
      )
    );
    context.registerRemovedElement(deleted);
    return deleted;
  }
  /**
   * `splice` is a method to remove elements from the array.
   */
  static splice(context, target, start, deleteCount, ...items) {
    const length = target.length;
    const from = start >= 0 ? Math.min(start, length) : Math.max(length + start, 0);
    const to = deleteCount === void 0 ? length : deleteCount < 0 ? from : Math.min(from + deleteCount, length);
    const removeds = [];
    for (let i = from; i < to; i++) {
      const removed = ArrayProxy.deleteInternalByIndex(context, target, from);
      if (removed) {
        const removedElem = removed.deepcopy();
        removedElem.setRemovedAt();
        removeds.push(toJSONElement(context, removedElem));
      }
    }
    if (items) {
      let previousID = from === 0 ? target.getHead().getID() : target.get(from - 1).getID();
      for (const item of items) {
        const newElem = ArrayProxy.insertAfterInternal(
          context,
          target,
          previousID,
          item
        );
        previousID = newElem.getID();
      }
    }
    return removeds;
  }
  /**
   * `includes` returns true if the given element is in the array.
   */
  static includes(context, target, searchElement, fromIndex) {
    var _a;
    const length = target.length;
    const from = fromIndex === void 0 ? 0 : fromIndex < 0 ? Math.max(fromIndex + length, 0) : fromIndex;
    if (from >= length)
      return false;
    if (Primitive.isSupport(searchElement)) {
      const arr = Array.from(target).map(
        (elem) => toJSONElement(context, elem)
      );
      return arr.includes(searchElement, from);
    }
    for (let i = from; i < length; i++) {
      if (((_a = target.get(i)) == null ? void 0 : _a.getID()) === searchElement.getID()) {
        return true;
      }
    }
    return false;
  }
  /**
   * `indexOf` returns the index of the given element.
   */
  static indexOf(context, target, searchElement, fromIndex) {
    var _a;
    const length = target.length;
    const from = fromIndex === void 0 ? 0 : fromIndex < 0 ? Math.max(fromIndex + length, 0) : fromIndex;
    if (from >= length)
      return -1;
    if (Primitive.isSupport(searchElement)) {
      const arr = Array.from(target).map(
        (elem) => toJSONElement(context, elem)
      );
      return arr.indexOf(searchElement, from);
    }
    for (let i = from; i < length; i++) {
      if (((_a = target.get(i)) == null ? void 0 : _a.getID()) === searchElement.getID()) {
        return i;
      }
    }
    return -1;
  }
  /**
   * `lastIndexOf` returns the last index of the given element.
   */
  static lastIndexOf(context, target, searchElement, fromIndex) {
    var _a;
    const length = target.length;
    const from = fromIndex === void 0 || fromIndex >= length ? length - 1 : fromIndex < 0 ? fromIndex + length : fromIndex;
    if (from < 0)
      return -1;
    if (Primitive.isSupport(searchElement)) {
      const arr = Array.from(target).map(
        (elem) => toJSONElement(context, elem)
      );
      return arr.lastIndexOf(searchElement, from);
    }
    for (let i = from; i > 0; i--) {
      if (((_a = target.get(i)) == null ? void 0 : _a.getID()) === searchElement.getID()) {
        return i;
      }
    }
    return -1;
  }
  /**
   * `toTestString` returns a String containing the meta data of the node
   * for debugging purpose.
   */
  static toTestString(target) {
    return target.toTestString();
  }
  /**
   * `getHandlers` gets handlers.
   */
  getHandlers() {
    return this.handlers;
  }
}
class Text {
  constructor(context, text) {
    __publicField(this, "context");
    __publicField(this, "text");
    this.context = context;
    this.text = text;
  }
  /**
   * `initialize` initialize this text with context and internal text.
   * @internal
   */
  initialize(context, text) {
    this.context = context;
    this.text = text;
  }
  /**
   * `getID` returns the ID of this text.
   */
  getID() {
    return this.text.getID();
  }
  /**
   * `edit` edits this text with the given content.
   */
  edit(fromIdx, toIdx, content, attributes) {
    if (!this.context || !this.text) {
      logger.fatal("it is not initialized yet");
      return;
    }
    if (fromIdx > toIdx) {
      logger.fatal("from should be less than or equal to to");
      return;
    }
    const range = this.text.indexRangeToPosRange(fromIdx, toIdx);
    if (logger.isEnabled(LogLevel.Debug)) {
      logger.debug(
        `EDIT: f:${fromIdx}->${range[0].toTestString()}, t:${toIdx}->${range[1].toTestString()} c:${content}`
      );
    }
    const attrs = attributes ? stringifyObjectValues(attributes) : void 0;
    const ticket = this.context.issueTimeTicket();
    const [maxCreatedAtMapByActor, , pairs, rangeAfterEdit] = this.text.edit(
      range,
      content,
      ticket,
      attrs
    );
    for (const pair of pairs) {
      this.context.registerGCPair(pair);
    }
    this.context.push(
      new EditOperation(
        this.text.getCreatedAt(),
        range[0],
        range[1],
        maxCreatedAtMapByActor,
        content,
        attrs ? new Map(Object.entries(attrs)) : /* @__PURE__ */ new Map(),
        ticket
      )
    );
    return this.text.findIndexesFromRange(rangeAfterEdit);
  }
  /**
   * `delete` deletes the text in the given range.
   */
  delete(fromIdx, toIdx) {
    return this.edit(fromIdx, toIdx, "");
  }
  /**
   * `empty` makes the text empty.
   */
  empty() {
    return this.edit(0, this.length, "");
  }
  /**
   * `setStyle` styles this text with the given attributes.
   */
  setStyle(fromIdx, toIdx, attributes) {
    if (!this.context || !this.text) {
      logger.fatal("it is not initialized yet");
      return false;
    }
    if (fromIdx > toIdx) {
      logger.fatal("from should be less than or equal to to");
      return false;
    }
    const range = this.text.indexRangeToPosRange(fromIdx, toIdx);
    if (logger.isEnabled(LogLevel.Debug)) {
      logger.debug(
        `STYL: f:${fromIdx}->${range[0].toTestString()}, t:${toIdx}->${range[1].toTestString()} a:${JSON.stringify(
          attributes
        )}`
      );
    }
    const attrs = stringifyObjectValues(attributes);
    const ticket = this.context.issueTimeTicket();
    const [maxCreatedAtMapByActor, pairs] = this.text.setStyle(
      range,
      attrs,
      ticket
    );
    for (const pair of pairs) {
      this.context.registerGCPair(pair);
    }
    this.context.push(
      new StyleOperation(
        this.text.getCreatedAt(),
        range[0],
        range[1],
        maxCreatedAtMapByActor,
        new Map(Object.entries(attrs)),
        ticket
      )
    );
    return true;
  }
  /**
   * `indexRangeToPosRange` returns TextRangeStruct of the given index range.
   */
  indexRangeToPosRange(range) {
    if (!this.context || !this.text) {
      logger.fatal("it is not initialized yet");
      return;
    }
    const textRange = this.text.indexRangeToPosRange(range[0], range[1]);
    return [textRange[0].toStruct(), textRange[1].toStruct()];
  }
  /**
   * `posRangeToIndexRange` returns indexes of the given TextRangeStruct.
   */
  posRangeToIndexRange(range) {
    if (!this.context || !this.text) {
      logger.fatal("it is not initialized yet");
      return;
    }
    const textRange = this.text.findIndexesFromRange([
      RGATreeSplitPos.fromStruct(range[0]),
      RGATreeSplitPos.fromStruct(range[1])
    ]);
    return [textRange[0], textRange[1]];
  }
  /**
   * `toTestString` returns a String containing the meta data of the node
   * for debugging purpose.
   */
  toTestString() {
    if (!this.context || !this.text) {
      logger.fatal("it is not initialized yet");
      return;
    }
    return this.text.toTestString();
  }
  /**
   * `values` returns values of this text.
   */
  values() {
    if (!this.context || !this.text) {
      logger.fatal("it is not initialized yet");
      return;
    }
    return this.text.values();
  }
  /**
   * `length` returns size of RGATreeList.
   */
  get length() {
    return this.text.length;
  }
  /**
   * `checkWeight` returns false when there is an incorrect weight node.
   * for debugging purpose.
   */
  checkWeight() {
    return this.text.checkWeight();
  }
  /**
   * `toString` returns the string representation of this text.
   */
  toString() {
    if (!this.context || !this.text) {
      logger.fatal("it is not initialized yet");
      return "";
    }
    return this.text.toString();
  }
  /**
   * `toJSON` returns the JSON string of this tree.
   */
  toJSON() {
    if (!this.context || !this.text) {
      throw new Error("it is not initialized yet");
    }
    return this.text.toJSON();
  }
  /**
   * `toJSForTest` returns value with meta data for testing.
   * @internal
   */
  toJSForTest() {
    if (!this.context || !this.text) {
      throw new Error("it is not initialized yet");
    }
    return this.text.toJSForTest();
  }
  /**
   * `createRangeForTest` returns pair of RGATreeSplitNodePos of the given indexes
   * for testing purpose.
   */
  createRangeForTest(fromIdx, toIdx) {
    if (!this.context || !this.text) {
      logger.fatal("it is not initialized yet");
      return;
    }
    return this.text.indexRangeToPosRange(fromIdx, toIdx);
  }
}
class Counter {
  constructor(valueType, value) {
    __publicField(this, "valueType");
    __publicField(this, "value");
    __publicField(this, "context");
    __publicField(this, "counter");
    this.valueType = valueType;
    this.value = value;
  }
  /**
   * `initialize` initialize this text with context and internal text.
   * @internal
   */
  initialize(context, counter) {
    this.valueType = counter.getValueType();
    this.context = context;
    this.counter = counter;
    this.value = counter.getValue();
  }
  /**
   * `getID` returns the ID of this text.
   */
  getID() {
    return this.counter.getID();
  }
  /**
   * `getValue` returns the value of this counter;
   * @internal
   */
  getValue() {
    return this.value;
  }
  /**
   * `getValueType` returns the value type of this counter.
   */
  getValueType() {
    return this.valueType;
  }
  /**
   * `increase` increases numeric data.
   */
  increase(v) {
    if (!this.context || !this.counter) {
      logger.fatal("it is not initialized yet");
      return;
    }
    const ticket = this.context.issueTimeTicket();
    const value = Primitive.of(v, ticket);
    if (!value.isNumericType()) {
      throw new TypeError(
        `Unsupported type of value: ${typeof value.getValue()}`
      );
    }
    this.counter.increase(value);
    this.context.push(
      IncreaseOperation.create(this.counter.getCreatedAt(), value, ticket)
    );
    return this;
  }
  /**
   * `toJSForTest` returns value with meta data for testing.
   * @internal
   */
  toJSForTest() {
    if (!this.context || !this.counter) {
      throw new Error("it is not initialized yet");
    }
    return this.counter.toJSForTest();
  }
}
function buildDescendants(treeNode, parent, context) {
  const { type } = treeNode;
  const ticket = context.issueTimeTicket();
  if (type === DefaultTextType) {
    validateTextNode(treeNode);
    const { value } = treeNode;
    const textNode = CRDTTreeNode.create(
      CRDTTreeNodeID.of(ticket, 0),
      type,
      value
    );
    parent.append(textNode);
  } else {
    const { children = [] } = treeNode;
    let { attributes } = treeNode;
    let attrs;
    if (typeof attributes === "object" && !isEmpty(attributes)) {
      attributes = stringifyObjectValues(attributes);
      attrs = new RHT();
      for (const [key, value] of Object.entries(attributes)) {
        attrs.set(key, value, ticket);
      }
    }
    const elementNode = CRDTTreeNode.create(
      CRDTTreeNodeID.of(ticket, 0),
      type,
      void 0,
      attrs
    );
    parent.append(elementNode);
    for (const child of children) {
      buildDescendants(child, elementNode, context);
    }
  }
}
function createCRDTTreeNode(context, content) {
  const { type } = content;
  const ticket = context.issueTimeTicket();
  let root;
  if (content.type === DefaultTextType) {
    const { value } = content;
    root = CRDTTreeNode.create(CRDTTreeNodeID.of(ticket, 0), type, value);
  } else if (content) {
    const { children = [] } = content;
    let { attributes } = content;
    let attrs;
    if (typeof attributes === "object" && !isEmpty(attributes)) {
      attributes = stringifyObjectValues(attributes);
      attrs = new RHT();
      for (const [key, value] of Object.entries(attributes)) {
        attrs.set(key, value, ticket);
      }
    }
    root = CRDTTreeNode.create(
      CRDTTreeNodeID.of(context.issueTimeTicket(), 0),
      type,
      void 0,
      attrs
    );
    for (const child of children) {
      buildDescendants(child, root, context);
    }
  }
  return root;
}
function validateTextNode(textNode) {
  if (!textNode.value.length) {
    throw new Error("text node cannot have empty value");
  }
  return true;
}
function validateTreeNodes(treeNodes) {
  if (!treeNodes.length) {
    return true;
  }
  const firstTreeNodeType = treeNodes[0].type;
  if (firstTreeNodeType === DefaultTextType) {
    for (const treeNode of treeNodes) {
      const { type } = treeNode;
      if (type !== DefaultTextType) {
        throw new Error("element node and text node cannot be passed together");
      }
      validateTextNode(treeNode);
    }
  } else {
    for (const treeNode of treeNodes) {
      const { type } = treeNode;
      if (type === DefaultTextType) {
        throw new Error("element node and text node cannot be passed together");
      }
    }
  }
  return true;
}
class Tree {
  constructor(initialRoot) {
    __publicField(this, "initialRoot");
    __publicField(this, "context");
    __publicField(this, "tree");
    this.initialRoot = initialRoot;
  }
  /**
   * `initialize` initialize this tree with context and internal tree.
   * @internal
   */
  initialize(context, tree) {
    this.context = context;
    this.tree = tree;
  }
  /**
   * `getID` returns the ID of this tree.
   */
  getID() {
    return this.tree.getID();
  }
  /**
   * `buildRoot` builds the root of this tree with the given initial root
   * which set by the user.
   */
  buildRoot(context) {
    if (!this.initialRoot) {
      return CRDTTreeNode.create(
        CRDTTreeNodeID.of(context.issueTimeTicket(), 0),
        DefaultRootType
      );
    }
    const root = CRDTTreeNode.create(
      CRDTTreeNodeID.of(context.issueTimeTicket(), 0),
      this.initialRoot.type
    );
    for (const child of this.initialRoot.children) {
      buildDescendants(child, root, context);
    }
    return root;
  }
  /**
   * `getSize` returns the size of this tree.
   */
  getSize() {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    return this.tree.getSize();
  }
  /**
   * `getNodeSize` returns the node size of this tree.
   */
  getNodeSize() {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    return this.tree.getNodeSize();
  }
  /**
   * `getIndexTree` returns the index tree of this tree.
   */
  getIndexTree() {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    return this.tree.getIndexTree();
  }
  /**
   * `styleByPath` sets the attributes to the elements of the given path.
   */
  styleByPath(path, attributes) {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    if (!path.length) {
      throw new Error("path should not be empty");
    }
    const [fromPos, toPos] = this.tree.pathToPosRange(path);
    const ticket = this.context.issueTimeTicket();
    const attrs = attributes ? stringifyObjectValues(attributes) : void 0;
    const [maxCreationMapByActor] = this.tree.style(
      [fromPos, toPos],
      attrs,
      ticket
    );
    this.context.push(
      TreeStyleOperation.create(
        this.tree.getCreatedAt(),
        fromPos,
        toPos,
        maxCreationMapByActor,
        attrs ? new Map(Object.entries(attrs)) : /* @__PURE__ */ new Map(),
        ticket
      )
    );
  }
  /**
   * `style` sets the attributes to the elements of the given range.
   */
  style(fromIdx, toIdx, attributes) {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    if (fromIdx > toIdx) {
      throw new Error("from should be less than or equal to to");
    }
    const fromPos = this.tree.findPos(fromIdx);
    const toPos = this.tree.findPos(toIdx);
    const ticket = this.context.issueTimeTicket();
    const attrs = attributes ? stringifyObjectValues(attributes) : void 0;
    const [maxCreationMapByActor, pairs] = this.tree.style(
      [fromPos, toPos],
      attrs,
      ticket
    );
    for (const pair of pairs) {
      this.context.registerGCPair(pair);
    }
    this.context.push(
      TreeStyleOperation.create(
        this.tree.getCreatedAt(),
        fromPos,
        toPos,
        maxCreationMapByActor,
        attrs ? new Map(Object.entries(attrs)) : /* @__PURE__ */ new Map(),
        ticket
      )
    );
  }
  /**
   * `removeStyle` removes the attributes to the elements of the given range.
   */
  removeStyle(fromIdx, toIdx, attributesToRemove) {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    if (fromIdx > toIdx) {
      throw new Error("from should be less than or equal to to");
    }
    const fromPos = this.tree.findPos(fromIdx);
    const toPos = this.tree.findPos(toIdx);
    const ticket = this.context.issueTimeTicket();
    const [maxCreationMapByActor, pairs] = this.tree.removeStyle(
      [fromPos, toPos],
      attributesToRemove,
      ticket
    );
    for (const pair of pairs) {
      this.context.registerGCPair(pair);
    }
    this.context.push(
      TreeStyleOperation.createTreeRemoveStyleOperation(
        this.tree.getCreatedAt(),
        fromPos,
        toPos,
        maxCreationMapByActor,
        attributesToRemove,
        ticket
      )
    );
  }
  editInternal(fromPos, toPos, contents, splitLevel = 0) {
    var _a;
    if (contents.length !== 0 && contents[0]) {
      validateTreeNodes(contents);
      if (contents[0].type !== DefaultTextType) {
        for (const content of contents) {
          const { children = [] } = content;
          validateTreeNodes(children);
        }
      }
    }
    const ticket = this.context.getLastTimeTicket();
    let crdtNodes = new Array();
    if (((_a = contents[0]) == null ? void 0 : _a.type) === DefaultTextType) {
      let compVal = "";
      for (const content of contents) {
        const { value } = content;
        compVal += value;
      }
      crdtNodes.push(
        CRDTTreeNode.create(
          CRDTTreeNodeID.of(this.context.issueTimeTicket(), 0),
          DefaultTextType,
          compVal
        )
      );
    } else {
      crdtNodes = contents.map((content) => content && createCRDTTreeNode(this.context, content)).filter((a) => a);
    }
    const [, pairs, maxCreatedAtMapByActor] = this.tree.edit(
      [fromPos, toPos],
      crdtNodes.length ? crdtNodes.map((crdtNode) => crdtNode == null ? void 0 : crdtNode.deepcopy()) : void 0,
      splitLevel,
      ticket,
      () => this.context.issueTimeTicket()
    );
    for (const pair of pairs) {
      this.context.registerGCPair(pair);
    }
    this.context.push(
      TreeEditOperation.create(
        this.tree.getCreatedAt(),
        fromPos,
        toPos,
        crdtNodes.length ? crdtNodes : void 0,
        splitLevel,
        maxCreatedAtMapByActor,
        ticket
      )
    );
    return true;
  }
  /**
   * `editByPath` edits this tree with the given node and path.
   */
  editByPath(fromPath, toPath, content, splitLevel = 0) {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    if (fromPath.length !== toPath.length) {
      throw new Error("path length should be equal");
    }
    if (!fromPath.length || !toPath.length) {
      throw new Error("path should not be empty");
    }
    const fromPos = this.tree.pathToPos(fromPath);
    const toPos = this.tree.pathToPos(toPath);
    return this.editInternal(
      fromPos,
      toPos,
      content ? [content] : [],
      splitLevel
    );
  }
  /**
   * `editBulkByPath` edits this tree with the given node and path.
   */
  editBulkByPath(fromPath, toPath, contents, splitLevel = 0) {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    if (fromPath.length !== toPath.length) {
      throw new Error("path length should be equal");
    }
    if (!fromPath.length || !toPath.length) {
      throw new Error("path should not be empty");
    }
    const fromPos = this.tree.pathToPos(fromPath);
    const toPos = this.tree.pathToPos(toPath);
    return this.editInternal(fromPos, toPos, contents, splitLevel);
  }
  /**
   * `edit` edits this tree with the given nodes.
   */
  edit(fromIdx, toIdx, content, splitLevel = 0) {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    if (fromIdx > toIdx) {
      throw new Error("from should be less than or equal to to");
    }
    const fromPos = this.tree.findPos(fromIdx);
    const toPos = this.tree.findPos(toIdx);
    return this.editInternal(
      fromPos,
      toPos,
      content ? [content] : [],
      splitLevel
    );
  }
  /**
   * `editBulk` edits this tree with the given nodes.
   */
  editBulk(fromIdx, toIdx, contents, splitLevel = 0) {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    if (fromIdx > toIdx) {
      throw new Error("from should be less than or equal to to");
    }
    const fromPos = this.tree.findPos(fromIdx);
    const toPos = this.tree.findPos(toIdx);
    return this.editInternal(fromPos, toPos, contents, splitLevel);
  }
  /**
   * `toXML` returns the XML string of this tree.
   */
  toXML() {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    return this.tree.toXML();
  }
  /**
   * `toJSON` returns the JSON string of this tree.
   */
  toJSON() {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    return this.tree.toJSON();
  }
  /**
   * `toJSForTest` returns value with meta data for testing.
   * @internal
   */
  toJSForTest() {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    return this.tree.toJSForTest();
  }
  /**
   * `toJSInfoForTest` returns detailed TreeNode information for use in Devtools.
   *
   * @internal
   */
  toJSInfoForTest() {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    return this.tree.toJSInfoForTest();
  }
  /**
   * `getRootTreeNode` returns TreeNode of this tree.
   */
  getRootTreeNode() {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    return this.tree.getRootTreeNode();
  }
  /**
   * `indexToPath` returns the path of the given index.
   */
  indexToPath(index) {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    return this.tree.indexToPath(index);
  }
  /**
   * `pathToIndex` returns the index of given path.
   */
  pathToIndex(path) {
    if (!this.context || !this.tree) {
      throw new Error("it is not initialized yet");
    }
    return this.tree.pathToIndex(path);
  }
  /**
   * `pathRangeToPosRange` converts the path range into the position range.
   */
  pathRangeToPosRange(range) {
    if (!this.context || !this.tree) {
      logger.fatal("it is not initialized yet");
      return;
    }
    const indexRange = [
      this.tree.pathToIndex(range[0]),
      this.tree.pathToIndex(range[1])
    ];
    const posRange = this.tree.indexRangeToPosRange(indexRange);
    return [posRange[0].toStruct(), posRange[1].toStruct()];
  }
  /**
   * `indexRangeToPosRange` converts the index range into the position range.
   */
  indexRangeToPosRange(range) {
    if (!this.context || !this.tree) {
      logger.fatal("it is not initialized yet");
      return;
    }
    return this.tree.indexRangeToPosStructRange(range);
  }
  /**
   * `posRangeToIndexRange` converts the position range into the index range.
   */
  posRangeToIndexRange(range) {
    if (!this.context || !this.tree) {
      logger.fatal("it is not initialized yet");
      return;
    }
    const posRange = [
      CRDTTreePos.fromStruct(range[0]),
      CRDTTreePos.fromStruct(range[1])
    ];
    return this.tree.posRangeToIndexRange(posRange);
  }
  /**
   * `posRangeToPathRange` converts the position range into the path range.
   */
  posRangeToPathRange(range) {
    if (!this.context || !this.tree) {
      logger.fatal("it is not initialized yet");
      return;
    }
    const posRange = [
      CRDTTreePos.fromStruct(range[0]),
      CRDTTreePos.fromStruct(range[1])
    ];
    return this.tree.posRangeToPathRange(posRange);
  }
}
function createJSON(context, target) {
  return createJSONObject(context, target);
}
function toWrappedElement(context, elem) {
  if (!elem) {
    return;
  } else if (elem instanceof Primitive) {
    return elem;
  } else if (elem instanceof CRDTObject) {
    return createJSONObject(context, elem);
  } else if (elem instanceof CRDTArray) {
    return createJSONArray(context, elem);
  } else if (elem instanceof CRDTText) {
    return new Text(context, elem);
  } else if (elem instanceof CRDTCounter) {
    const counter = new Counter(CounterType.IntegerCnt, 0);
    counter.initialize(context, elem);
    return counter;
  } else if (elem instanceof CRDTTree) {
    const tree = new Tree();
    tree.initialize(context, elem);
    return tree;
  }
  throw new TypeError(`Unsupported type of element: ${typeof elem}`);
}
function toJSONElement(context, elem) {
  const wrappedElement = toWrappedElement(context, elem);
  if (wrappedElement instanceof Primitive) {
    return wrappedElement.getValue();
  }
  return wrappedElement;
}
function buildCRDTElement(context, value, createdAt) {
  let element;
  if (Primitive.isSupport(value)) {
    element = Primitive.of(value, createdAt);
  } else if (Array.isArray(value)) {
    element = CRDTArray.create(
      createdAt,
      ArrayProxy.buildArrayElements(context, value)
    );
  } else if (typeof value === "object") {
    if (value instanceof Text) {
      element = CRDTText.create(RGATreeSplit.create(), createdAt);
      value.initialize(context, element);
    } else if (value instanceof Counter) {
      element = CRDTCounter.create(
        value.getValueType(),
        value.getValue(),
        createdAt
      );
      value.initialize(context, element);
    } else if (value instanceof Tree) {
      element = CRDTTree.create(value.buildRoot(context), createdAt);
      value.initialize(context, element);
    } else {
      element = CRDTObject.create(
        createdAt,
        ObjectProxy.buildObjectMembers(context, value)
      );
    }
  } else {
    throw new TypeError(`Unsupported type of value: ${typeof value}`);
  }
  return element;
}
const MaxUndoRedoStackDepth = 50;
class History {
  constructor() {
    __publicField(this, "undoStack", []);
    __publicField(this, "redoStack", []);
  }
  /**
   * `hasUndo` returns true if there are undo operations.
   */
  hasUndo() {
    return this.undoStack.length > 0;
  }
  /**
   * `hasRedo` returns true if there are redo operations.
   */
  hasRedo() {
    return this.redoStack.length > 0;
  }
  /**
   * `pushUndo` pushes new undo operations of a change to undo stack.
   */
  pushUndo(undoOps) {
    if (this.undoStack.length >= MaxUndoRedoStackDepth) {
      this.undoStack.shift();
    }
    this.undoStack.push(undoOps);
  }
  /**
   * `popUndo` pops the last undo operations of a change from undo stack.
   */
  popUndo() {
    return this.undoStack.pop();
  }
  /**
   * `pushRedo` pushes new redo operations of a change to redo stack.
   */
  pushRedo(redoOps) {
    if (this.redoStack.length >= MaxUndoRedoStackDepth) {
      this.redoStack.shift();
    }
    this.redoStack.push(redoOps);
  }
  /**
   * `popRedo` pops the last redo operations of a change from redo stack.
   */
  popRedo() {
    return this.redoStack.pop();
  }
  /**
   * `clearRedo` flushes remaining redo operations.
   */
  clearRedo() {
    this.redoStack = [];
  }
  /**
   * `getUndoStackForTest` returns the undo stack for test.
   */
  getUndoStackForTest() {
    return this.undoStack;
  }
  /**
   * `getRedoStackForTest` returns the redo stack for test.
   */
  getRedoStackForTest() {
    return this.redoStack;
  }
}
const EventSourceDevPanel = "yorkie-devtools-panel";
const EventSourceSDK = "yorkie-devtools-sdk";
let devtoolsStatus = "disconnected";
const unsubsByDocKey = /* @__PURE__ */ new Map();
const transactionEventsByDocKey = /* @__PURE__ */ new Map();
if (typeof window !== "undefined") {
  window.transactionEventsByDocKey = transactionEventsByDocKey;
}
function sendToPanel(message, options) {
  if (!((options == null ? void 0 : options.force) || devtoolsStatus !== "disconnected")) {
    return;
  }
  window.postMessage(
    {
      source: EventSourceSDK,
      ...message
    },
    "*"
  );
}
function setupDevtools(doc) {
  if (!doc.isEnableDevtools() || typeof window === "undefined" || unsubsByDocKey.has(doc.getKey())) {
    return;
  }
  transactionEventsByDocKey.set(doc.getKey(), []);
  const unsub = doc.subscribe("all", (event) => {
    if (event.some(
      (docEvent) => docEvent.type !== DocEventType.StatusChanged && docEvent.type !== DocEventType.Snapshot && docEvent.type !== DocEventType.LocalChange && docEvent.type !== DocEventType.RemoteChange && docEvent.type !== DocEventType.Initialized && docEvent.type !== DocEventType.Watched && docEvent.type !== DocEventType.Unwatched && docEvent.type !== DocEventType.PresenceChanged
    )) {
      return;
    }
    transactionEventsByDocKey.get(doc.getKey()).push(event);
    if (devtoolsStatus === "synced") {
      sendToPanel({
        msg: "doc::sync::partial",
        docKey: doc.getKey(),
        event
      });
    }
  });
  unsubsByDocKey.set(doc.getKey(), [unsub]);
  sendToPanel(
    {
      msg: "refresh-devtools"
    },
    { force: true }
  );
  window.addEventListener(
    "message",
    (event) => {
      var _a;
      if (((_a = event.data) == null ? void 0 : _a.source) !== EventSourceDevPanel) {
        return;
      }
      const message = event.data;
      switch (message.msg) {
        case "devtools::connect":
          if (devtoolsStatus !== "disconnected") {
            break;
          }
          devtoolsStatus = "connected";
          sendToPanel({
            msg: "doc::available",
            docKey: doc.getKey()
          });
          logger.info(`[YD] Devtools connected. Doc: ${doc.getKey()}`);
          break;
        case "devtools::disconnect":
          devtoolsStatus = "disconnected";
          logger.info(`[YD] Devtools disconnected. Doc: ${doc.getKey()}`);
          break;
        case "devtools::subscribe":
          devtoolsStatus = "synced";
          sendToPanel({
            msg: "doc::sync::full",
            docKey: doc.getKey(),
            events: transactionEventsByDocKey.get(doc.getKey())
          });
          logger.info(`[YD] Devtools subscribed. Doc: ${doc.getKey()}`);
          break;
      }
    }
  );
}
var DocumentStatus = /* @__PURE__ */ ((DocumentStatus2) => {
  DocumentStatus2["Detached"] = "detached";
  DocumentStatus2["Attached"] = "attached";
  DocumentStatus2["Removed"] = "removed";
  return DocumentStatus2;
})(DocumentStatus || {});
var DocEventType = /* @__PURE__ */ ((DocEventType2) => {
  DocEventType2["StatusChanged"] = "status-changed";
  DocEventType2["ConnectionChanged"] = "connection-changed";
  DocEventType2["SyncStatusChanged"] = "sync-status-changed";
  DocEventType2["Snapshot"] = "snapshot";
  DocEventType2["LocalChange"] = "local-change";
  DocEventType2["RemoteChange"] = "remote-change";
  DocEventType2["Initialized"] = "initialized";
  DocEventType2["Watched"] = "watched";
  DocEventType2["Unwatched"] = "unwatched";
  DocEventType2["PresenceChanged"] = "presence-changed";
  return DocEventType2;
})(DocEventType || {});
var StreamConnectionStatus = /* @__PURE__ */ ((StreamConnectionStatus2) => {
  StreamConnectionStatus2["Connected"] = "connected";
  StreamConnectionStatus2["Disconnected"] = "disconnected";
  return StreamConnectionStatus2;
})(StreamConnectionStatus || {});
var DocumentSyncStatus = /* @__PURE__ */ ((DocumentSyncStatus2) => {
  DocumentSyncStatus2["Synced"] = "synced";
  DocumentSyncStatus2["SyncFailed"] = "sync-failed";
  return DocumentSyncStatus2;
})(DocumentSyncStatus || {});
class Document {
  constructor(key, opts) {
    __publicField(this, "key");
    __publicField(this, "status");
    __publicField(this, "opts");
    __publicField(this, "changeID");
    __publicField(this, "checkpoint");
    __publicField(this, "localChanges");
    __publicField(this, "root");
    __publicField(this, "clone");
    __publicField(this, "eventStream");
    __publicField(this, "eventStreamObserver");
    /**
     * `onlineClients` is a set of client IDs that are currently online.
     */
    __publicField(this, "onlineClients");
    /**
     * `presences` is a map of client IDs to their presence information.
     */
    __publicField(this, "presences");
    /**
     * `history` is exposed to the user to manage undo/redo operations.
     */
    __publicField(this, "history");
    /**
     * `internalHistory` is used to manage undo/redo operations internally.
     */
    __publicField(this, "internalHistory");
    /**
     * `isUpdating` is whether the document is updating by updater or not. It is
     * used to prevent the updater from calling undo/redo.
     */
    __publicField(this, "isUpdating");
    this.opts = opts || {};
    this.key = key;
    this.status = "detached";
    this.root = CRDTRoot.create();
    this.changeID = InitialChangeID;
    this.checkpoint = InitialCheckpoint;
    this.localChanges = [];
    this.eventStream = createObservable((observer) => {
      this.eventStreamObserver = observer;
    });
    this.onlineClients = /* @__PURE__ */ new Set();
    this.presences = /* @__PURE__ */ new Map();
    this.isUpdating = false;
    this.internalHistory = new History();
    this.history = {
      canUndo: this.canUndo.bind(this),
      canRedo: this.canRedo.bind(this),
      undo: this.undo.bind(this),
      redo: this.redo.bind(this)
    };
    setupDevtools(this);
  }
  /**
   * `update` executes the given updater to update this document.
   */
  update(updater, message) {
    if (this.getStatus() === "removed") {
      throw new YorkieError(Code.DocumentRemoved, `${this.key} is removed`);
    }
    this.ensureClone();
    const actorID = this.changeID.getActorID();
    const context = ChangeContext.create(
      this.changeID.next(),
      this.clone.root,
      this.clone.presences.get(actorID) || {},
      message
    );
    try {
      const proxy = createJSON(
        context,
        this.clone.root.getObject()
      );
      if (!this.presences.has(actorID)) {
        this.clone.presences.set(actorID, {});
      }
      this.isUpdating = true;
      updater(
        proxy,
        new Presence(context, this.clone.presences.get(actorID))
      );
    } catch (err) {
      this.clone = void 0;
      logger.error(err);
      throw err;
    } finally {
      this.isUpdating = false;
    }
    if (context.hasChange()) {
      if (logger.isEnabled(LogLevel.Trivial)) {
        logger.trivial(`trying to update a local change: ${this.toJSON()}`);
      }
      const change = context.getChange();
      const { opInfos, reverseOps } = change.execute(
        this.root,
        this.presences,
        OpSource.Local
      );
      const reversePresence = context.getReversePresence();
      if (reversePresence) {
        reverseOps.push({
          type: "presence",
          value: reversePresence
        });
      }
      this.localChanges.push(change);
      if (reverseOps.length > 0) {
        this.internalHistory.pushUndo(reverseOps);
      }
      if (opInfos.length > 0) {
        this.internalHistory.clearRedo();
      }
      this.changeID = change.getID();
      const event = [];
      if (opInfos.length > 0) {
        event.push({
          type: "local-change",
          source: OpSource.Local,
          value: {
            message: change.getMessage() || "",
            operations: opInfos,
            actor: actorID,
            clientSeq: change.getID().getClientSeq(),
            serverSeq: change.getID().getServerSeq()
          },
          rawChange: this.isEnableDevtools() ? change.toStruct() : void 0
        });
      }
      if (change.hasPresenceChange()) {
        event.push({
          type: "presence-changed",
          source: OpSource.Local,
          value: {
            clientID: actorID,
            presence: this.getPresence(actorID)
          }
        });
      }
      this.publish(event);
      if (logger.isEnabled(LogLevel.Trivial)) {
        logger.trivial(`after update a local change: ${this.toJSON()}`);
      }
    }
  }
  /**
   * `subscribe` registers a callback to subscribe to events on the document.
   */
  subscribe(arg1, arg2, arg3, arg4) {
    if (typeof arg1 === "string") {
      if (typeof arg2 !== "function") {
        throw new Error("Second argument must be a callback function");
      }
      if (arg1 === "presence") {
        const callback2 = arg2;
        return this.eventStream.subscribe(
          (event) => {
            for (const docEvent of event) {
              if (docEvent.type !== "initialized" && docEvent.type !== "watched" && docEvent.type !== "unwatched" && docEvent.type !== "presence-changed") {
                continue;
              }
              callback2(docEvent);
            }
          },
          arg3,
          arg4
        );
      }
      if (arg1 === "my-presence") {
        const callback2 = arg2;
        return this.eventStream.subscribe(
          (event) => {
            for (const docEvent of event) {
              if (docEvent.type !== "initialized" && docEvent.type !== "presence-changed") {
                continue;
              }
              if (docEvent.type === "presence-changed" && docEvent.value.clientID !== this.changeID.getActorID()) {
                continue;
              }
              callback2(docEvent);
            }
          },
          arg3,
          arg4
        );
      }
      if (arg1 === "others") {
        const callback2 = arg2;
        return this.eventStream.subscribe(
          (event) => {
            for (const docEvent of event) {
              if (docEvent.type !== "watched" && docEvent.type !== "unwatched" && docEvent.type !== "presence-changed") {
                continue;
              }
              if (docEvent.value.clientID !== this.changeID.getActorID()) {
                callback2(docEvent);
              }
            }
          },
          arg3,
          arg4
        );
      }
      if (arg1 === "connection") {
        const callback2 = arg2;
        return this.eventStream.subscribe(
          (event) => {
            for (const docEvent of event) {
              if (docEvent.type !== "connection-changed") {
                continue;
              }
              callback2(docEvent);
            }
          },
          arg3,
          arg4
        );
      }
      if (arg1 === "status") {
        const callback2 = arg2;
        return this.eventStream.subscribe(
          (event) => {
            for (const docEvent of event) {
              if (docEvent.type !== "status-changed") {
                continue;
              }
              callback2(docEvent);
            }
          },
          arg3,
          arg4
        );
      }
      if (arg1 === "sync") {
        const callback2 = arg2;
        return this.eventStream.subscribe(
          (event) => {
            for (const docEvent of event) {
              if (docEvent.type !== "sync-status-changed") {
                continue;
              }
              callback2(docEvent);
            }
          },
          arg3,
          arg4
        );
      }
      if (arg1 === "all") {
        const callback2 = arg2;
        return this.eventStream.subscribe(callback2, arg3, arg4);
      }
      const target = arg1;
      const callback = arg2;
      return this.eventStream.subscribe(
        (event) => {
          for (const docEvent of event) {
            if (docEvent.type !== "local-change" && docEvent.type !== "remote-change") {
              continue;
            }
            const targetOps = [];
            for (const op of docEvent.value.operations) {
              if (this.isSameElementOrChildOf(op.path, target)) {
                targetOps.push(op);
              }
            }
            targetOps.length && callback({
              ...docEvent,
              value: { ...docEvent.value, operations: targetOps }
            });
          }
        },
        arg3,
        arg4
      );
    }
    if (typeof arg1 === "function") {
      const callback = arg1;
      const error = arg2;
      const complete = arg3;
      return this.eventStream.subscribe(
        (event) => {
          for (const docEvent of event) {
            if (docEvent.type !== "snapshot" && docEvent.type !== "local-change" && docEvent.type !== "remote-change") {
              continue;
            }
            callback(docEvent);
          }
        },
        error,
        complete
      );
    }
    throw new Error(`"${arg1}" is not a valid`);
  }
  /**
   * `publish` triggers an event in this document, which can be received by
   * callback functions from document.subscribe().
   */
  publish(event) {
    if (this.eventStreamObserver) {
      this.eventStreamObserver.next(event);
    }
  }
  isSameElementOrChildOf(elem, parent) {
    if (parent === elem) {
      return true;
    }
    const nodePath = elem.split(".");
    const targetPath = parent.split(".");
    return targetPath.every((path, index) => path === nodePath[index]);
  }
  /**
   * `applyChangePack` applies the given change pack into this document.
   * 1. Remove local changes applied to server.
   * 2. Update the checkpoint.
   * 3. Do Garbage collection.
   *
   * @param pack - change pack
   * @internal
   */
  applyChangePack(pack) {
    if (pack.hasSnapshot()) {
      this.applySnapshot(
        pack.getCheckpoint().getServerSeq(),
        pack.getSnapshot()
      );
    } else if (pack.hasChanges()) {
      this.applyChanges(pack.getChanges(), OpSource.Remote);
    }
    while (this.localChanges.length) {
      const change = this.localChanges[0];
      if (change.getID().getClientSeq() > pack.getCheckpoint().getClientSeq()) {
        break;
      }
      this.localChanges.shift();
    }
    this.checkpoint = this.checkpoint.forward(pack.getCheckpoint());
    this.garbageCollect(pack.getMinSyncedTicket());
    if (pack.getIsRemoved()) {
      this.applyStatus(
        "removed"
        /* Removed */
      );
    }
    if (logger.isEnabled(LogLevel.Trivial)) {
      logger.trivial(`${this.root.toJSON()}`);
    }
  }
  /**
   * `getCheckpoint` returns the checkpoint of this document.
   *
   * @internal
   */
  getCheckpoint() {
    return this.checkpoint;
  }
  /**
   * `getChangeID` returns the change id of this document.
   *
   * @internal
   */
  getChangeID() {
    return this.changeID;
  }
  /**
   * `hasLocalChanges` returns whether this document has local changes or not.
   */
  hasLocalChanges() {
    return this.localChanges.length > 0;
  }
  /**
   * `ensureClone` make a clone of root.
   *
   * @internal
   */
  ensureClone() {
    if (this.clone) {
      return;
    }
    this.clone = {
      root: this.root.deepcopy(),
      presences: deepcopy(this.presences)
    };
  }
  /**
   * `createChangePack` create change pack of the local changes to send to the
   * remote server.
   *
   * @internal
   */
  createChangePack() {
    const changes = Array.from(this.localChanges);
    const checkpoint = this.checkpoint.increaseClientSeq(changes.length);
    return ChangePack.create(this.key, checkpoint, false, changes);
  }
  /**
   * `setActor` sets actor into this document. This is also applied in the local
   * changes the document has.
   *
   * @internal
   */
  setActor(actorID) {
    for (const change of this.localChanges) {
      change.setActor(actorID);
    }
    this.changeID = this.changeID.setActor(actorID);
  }
  /**
   * `isEnableDevtools` returns whether devtools is enabled or not.
   */
  isEnableDevtools() {
    return !!this.opts.enableDevtools;
  }
  /**
   * `getKey` returns the key of this document.
   */
  getKey() {
    return this.key;
  }
  /**
   * `getStatus` returns the status of this document.
   */
  getStatus() {
    return this.status;
  }
  /**
   * `getClone` return clone object.
   *
   * @internal
   */
  getCloneRoot() {
    if (!this.clone) {
      return;
    }
    return this.clone.root.getObject();
  }
  /**
   * `getRoot` returns a new proxy of cloned root.
   */
  getRoot() {
    this.ensureClone();
    const context = ChangeContext.create(
      this.changeID.next(),
      this.clone.root,
      this.clone.presences.get(this.changeID.getActorID()) || {}
    );
    return createJSON(context, this.clone.root.getObject());
  }
  /**
   * `garbageCollect` purges elements that were removed before the given time.
   *
   * @internal
   */
  garbageCollect(ticket) {
    if (this.opts.disableGC) {
      return 0;
    }
    if (this.clone) {
      this.clone.root.garbageCollect(ticket);
    }
    return this.root.garbageCollect(ticket);
  }
  /**
   * `getRootObject` returns root object.
   *
   * @internal
   */
  getRootObject() {
    return this.root.getObject();
  }
  /**
   * `getGarbageLen` returns the length of elements should be purged.
   *
   * @internal
   */
  getGarbageLen() {
    return this.root.getGarbageLen();
  }
  /**
   * `getGarbageLenFromClone` returns the length of elements should be purged from clone.
   */
  getGarbageLenFromClone() {
    return this.clone.root.getGarbageLen();
  }
  /**
   * `toJSON` returns the JSON encoding of this document.
   */
  toJSON() {
    return this.root.toJSON();
  }
  /**
   * `toSortedJSON` returns the sorted JSON encoding of this document.
   */
  toSortedJSON() {
    return this.root.toSortedJSON();
  }
  /**
   * `toJSForTest` returns value with meta data for testing.
   */
  toJSForTest() {
    return {
      ...this.getRoot().toJSForTest(),
      key: "root"
    };
  }
  /**
   * `applySnapshot` applies the given snapshot into this document.
   */
  applySnapshot(serverSeq, snapshot) {
    const { root, presences } = converter.bytesToSnapshot(snapshot);
    this.root = new CRDTRoot(root);
    this.presences = presences;
    this.changeID = this.changeID.syncLamport(serverSeq);
    this.clone = void 0;
    this.publish([
      {
        type: "snapshot",
        source: OpSource.Remote,
        value: {
          snapshot: this.isEnableDevtools() ? converter.bytesToHex(snapshot) : void 0,
          serverSeq: serverSeq.toString()
        }
      }
    ]);
  }
  /**
   * `applyChanges` applies the given changes into this document.
   */
  applyChanges(changes, source) {
    if (logger.isEnabled(LogLevel.Debug)) {
      logger.debug(
        `trying to apply ${changes.length} remote changes.elements:${this.root.getElementMapSize()}, removeds:${this.root.getGarbageElementSetSize()}`
      );
    }
    if (logger.isEnabled(LogLevel.Trivial)) {
      logger.trivial(
        changes.map(
          (change) => `${change.getID().toTestString()}	${change.toTestString()}`
        ).join("\n")
      );
    }
    for (const change of changes) {
      this.applyChange(change, source);
    }
    if (logger.isEnabled(LogLevel.Debug)) {
      logger.debug(
        `after appling ${changes.length} remote changes.elements:${this.root.getElementMapSize()},  removeds:${this.root.getGarbageElementSetSize()}`
      );
    }
  }
  /**
   * `applyChange` applies the given change into this document.
   */
  applyChange(change, source) {
    this.ensureClone();
    change.execute(this.clone.root, this.clone.presences, source);
    const event = [];
    const actorID = change.getID().getActorID();
    if (change.hasPresenceChange() && this.onlineClients.has(actorID)) {
      const presenceChange = change.getPresenceChange();
      switch (presenceChange.type) {
        case PresenceChangeType.Put:
          event.push(
            this.presences.has(actorID) ? {
              type: "presence-changed",
              source,
              value: {
                clientID: actorID,
                presence: presenceChange.presence
              }
            } : {
              type: "watched",
              source: OpSource.Remote,
              value: {
                clientID: actorID,
                presence: presenceChange.presence
              }
            }
          );
          break;
        case PresenceChangeType.Clear:
          event.push({
            type: "unwatched",
            source: OpSource.Remote,
            value: {
              clientID: actorID,
              presence: this.getPresence(actorID)
            }
          });
          this.removeOnlineClient(actorID);
          break;
      }
    }
    const { opInfos } = change.execute(this.root, this.presences, source);
    this.changeID = this.changeID.syncLamport(change.getID().getLamport());
    if (opInfos.length > 0) {
      const rawChange = this.isEnableDevtools() ? change.toStruct() : void 0;
      event.push(
        source === OpSource.Remote ? {
          type: "remote-change",
          source,
          value: {
            actor: actorID,
            clientSeq: change.getID().getClientSeq(),
            serverSeq: change.getID().getServerSeq(),
            message: change.getMessage() || "",
            operations: opInfos
          },
          rawChange
        } : {
          type: "local-change",
          source,
          value: {
            actor: actorID,
            clientSeq: change.getID().getClientSeq(),
            serverSeq: change.getID().getServerSeq(),
            message: change.getMessage() || "",
            operations: opInfos
          },
          rawChange
        }
      );
    }
    if (event.length > 0) {
      this.publish(event);
    }
  }
  /**
   * `applyWatchStream` applies the given watch stream response into this document.
   */
  applyWatchStream(resp) {
    if (resp.body.case === "initialization") {
      const clientIDs = resp.body.value.clientIds;
      const onlineClients = /* @__PURE__ */ new Set();
      for (const clientID of clientIDs) {
        if (clientID === this.changeID.getActorID()) {
          continue;
        }
        onlineClients.add(clientID);
      }
      this.setOnlineClients(onlineClients);
      this.publish([
        {
          type: "initialized",
          source: OpSource.Local,
          value: this.getPresences()
        }
      ]);
      return;
    }
    if (resp.body.case === "event") {
      const { type, publisher } = resp.body.value;
      const event = [];
      if (type === DocEventType$1.DOCUMENT_WATCHED) {
        this.addOnlineClient(publisher);
        if (this.hasPresence(publisher)) {
          event.push({
            type: "watched",
            source: OpSource.Remote,
            value: {
              clientID: publisher,
              presence: this.getPresence(publisher)
            }
          });
        }
      } else if (type === DocEventType$1.DOCUMENT_UNWATCHED) {
        const presence = this.getPresence(publisher);
        this.removeOnlineClient(publisher);
        if (presence) {
          event.push({
            type: "unwatched",
            source: OpSource.Remote,
            value: { clientID: publisher, presence }
          });
        }
      }
      if (event.length > 0) {
        this.publish(event);
      }
    }
  }
  /**
   * `applyStatus` applies the document status into this document.
   */
  applyStatus(status) {
    this.status = status;
    if (status === "detached") {
      this.setActor(InitialActorID);
    }
    this.publish([
      {
        source: status === "removed" ? OpSource.Remote : OpSource.Local,
        type: "status-changed",
        value: status === "attached" ? { status, actorID: this.changeID.getActorID() } : { status }
      }
    ]);
  }
  /**
   * `applyDocEvent` applies the docEvent into this document.
   */
  applyDocEvent(event) {
    if (event.type === "status-changed") {
      this.applyStatus(event.value.status);
      if (event.value.status === "attached") {
        this.setActor(event.value.actorID);
      }
      return;
    }
    if (event.type === "snapshot") {
      const { snapshot, serverSeq } = event.value;
      if (!snapshot)
        return;
      this.applySnapshot(
        Long.fromString(serverSeq),
        converter.hexToBytes(snapshot)
      );
      return;
    }
    if (event.type === "local-change" || event.type === "remote-change") {
      if (!event.rawChange)
        return;
      const change = Change.fromStruct(event.rawChange);
      this.applyChange(change, event.source);
    }
    if (event.type === "initialized") {
      const onlineClients = /* @__PURE__ */ new Set();
      for (const { clientID, presence } of event.value) {
        onlineClients.add(clientID);
        this.presences.set(clientID, presence);
      }
      this.setOnlineClients(onlineClients);
      return;
    }
    if (event.type === "watched") {
      const { clientID, presence } = event.value;
      this.addOnlineClient(clientID);
      this.presences.set(clientID, presence);
      return;
    }
    if (event.type === "unwatched") {
      const { clientID } = event.value;
      this.removeOnlineClient(clientID);
      this.presences.delete(clientID);
    }
    if (event.type === "presence-changed") {
      const { clientID, presence } = event.value;
      this.presences.set(clientID, presence);
    }
  }
  /**
   * `applyTransactionEvent` applies the given TransactionEvent into this document.
   */
  applyTransactionEvent(event) {
    for (const docEvent of event) {
      this.applyDocEvent(docEvent);
    }
  }
  /**
   * `getValueByPath` returns the JSONElement corresponding to the given path.
   */
  getValueByPath(path) {
    if (!path.startsWith("$")) {
      throw new YorkieError(Code.InvalidArgument, `path must start with "$"`);
    }
    const pathArr = path.split(".");
    pathArr.shift();
    let value = this.getRoot();
    for (const key of pathArr) {
      value = value[key];
      if (value === void 0)
        return void 0;
    }
    return value;
  }
  /**
   * `setOnlineClients` sets the given online client set.
   *
   * @internal
   */
  setOnlineClients(onlineClients) {
    this.onlineClients = onlineClients;
  }
  /**
   * `resetOnlineClients` resets the online client set.
   *
   * @internal
   */
  resetOnlineClients() {
    this.onlineClients = /* @__PURE__ */ new Set();
  }
  /**
   * `addOnlineClient` adds the given clientID into the online client set.
   *
   * @internal
   */
  addOnlineClient(clientID) {
    this.onlineClients.add(clientID);
  }
  /**
   * `removeOnlineClient` removes the clientID from the online client set.
   *
   * @internal
   */
  removeOnlineClient(clientID) {
    this.onlineClients.delete(clientID);
  }
  /**
   * `hasPresence` returns whether the given clientID has a presence or not.
   *
   * @internal
   */
  hasPresence(clientID) {
    return this.presences.has(clientID);
  }
  /**
   * `getMyPresence` returns the presence of the current client.
   */
  getMyPresence() {
    if (this.status !== "attached") {
      return {};
    }
    const p = this.presences.get(this.changeID.getActorID());
    return p ? deepcopy(p) : {};
  }
  /**
   * `getPresence` returns the presence of the given clientID.
   */
  getPresence(clientID) {
    if (clientID === this.changeID.getActorID()) {
      return this.getMyPresence();
    }
    if (!this.onlineClients.has(clientID))
      return;
    const p = this.presences.get(clientID);
    return p ? deepcopy(p) : void 0;
  }
  /**
   * `getPresenceForTest` returns the presence of the given clientID
   * regardless of whether the client is online or not.
   *
   * @internal
   */
  getPresenceForTest(clientID) {
    const p = this.presences.get(clientID);
    return p ? deepcopy(p) : void 0;
  }
  /**
   * `getPresences` returns the presences of online clients.
   */
  getPresences() {
    const presences = [];
    presences.push({
      clientID: this.changeID.getActorID(),
      presence: deepcopy(this.getMyPresence())
    });
    for (const clientID of this.onlineClients) {
      if (this.presences.has(clientID)) {
        presences.push({
          clientID,
          presence: deepcopy(this.presences.get(clientID))
        });
      }
    }
    return presences;
  }
  /**
   * `getSelfForTest` returns the client that has attached this document.
   *
   * @internal
   */
  getSelfForTest() {
    return {
      clientID: this.getChangeID().getActorID(),
      presence: this.getMyPresence()
    };
  }
  /**
   * `getOthersForTest` returns all the other clients in online, sorted by clientID.
   *
   * @internal
   */
  getOthersForTest() {
    const myClientID = this.getChangeID().getActorID();
    return this.getPresences().filter((a) => a.clientID !== myClientID).sort((a, b) => a.clientID > b.clientID ? 1 : -1);
  }
  /**
   * `canUndo` returns whether there are any operations to undo.
   */
  canUndo() {
    return this.internalHistory.hasUndo() && !this.isUpdating;
  }
  /**
   * `canRedo` returns whether there are any operations to redo.
   */
  canRedo() {
    return this.internalHistory.hasRedo() && !this.isUpdating;
  }
  /**
   * `undo` undoes the last operation executed by the current client.
   * It does not impact operations made by other clients.
   */
  undo() {
    if (this.isUpdating) {
      throw new Error("Undo is not allowed during an update");
    }
    const undoOps = this.internalHistory.popUndo();
    if (undoOps === void 0) {
      throw new Error("There is no operation to be undone");
    }
    this.ensureClone();
    const context = ChangeContext.create(
      this.changeID.next(),
      this.clone.root,
      this.clone.presences.get(this.changeID.getActorID()) || {}
    );
    for (const undoOp of undoOps) {
      if (!(undoOp instanceof Operation)) {
        const presence = new Presence(
          context,
          deepcopy(this.clone.presences.get(this.changeID.getActorID()))
        );
        presence.set(undoOp.value, { addToHistory: true });
        continue;
      }
      const ticket = context.issueTimeTicket();
      undoOp.setExecutedAt(ticket);
      context.push(undoOp);
    }
    const change = context.getChange();
    change.execute(this.clone.root, this.clone.presences, OpSource.UndoRedo);
    const { opInfos, reverseOps } = change.execute(
      this.root,
      this.presences,
      OpSource.UndoRedo
    );
    const reversePresence = context.getReversePresence();
    if (reversePresence) {
      reverseOps.push({
        type: "presence",
        value: reversePresence
      });
    }
    if (reverseOps.length > 0) {
      this.internalHistory.pushRedo(reverseOps);
    }
    if (!change.hasPresenceChange() && opInfos.length === 0) {
      return;
    }
    this.localChanges.push(change);
    this.changeID = change.getID();
    const actorID = this.changeID.getActorID();
    const event = [];
    if (opInfos.length > 0) {
      event.push({
        type: "local-change",
        source: OpSource.UndoRedo,
        value: {
          message: change.getMessage() || "",
          operations: opInfos,
          actor: actorID,
          clientSeq: change.getID().getClientSeq(),
          serverSeq: change.getID().getServerSeq()
        },
        rawChange: this.isEnableDevtools() ? change.toStruct() : void 0
      });
    }
    if (change.hasPresenceChange()) {
      event.push({
        type: "presence-changed",
        source: OpSource.UndoRedo,
        value: {
          clientID: actorID,
          presence: this.getPresence(actorID)
        }
      });
    }
    this.publish(event);
  }
  /**
   * `redo` redoes the last operation executed by the current client.
   * It does not impact operations made by other clients.
   */
  redo() {
    if (this.isUpdating) {
      throw new Error("Redo is not allowed during an update");
    }
    const redoOps = this.internalHistory.popRedo();
    if (redoOps === void 0) {
      throw new Error("There is no operation to be redone");
    }
    this.ensureClone();
    const context = ChangeContext.create(
      this.changeID.next(),
      this.clone.root,
      this.clone.presences.get(this.changeID.getActorID()) || {}
    );
    for (const redoOp of redoOps) {
      if (!(redoOp instanceof Operation)) {
        const presence = new Presence(
          context,
          deepcopy(this.clone.presences.get(this.changeID.getActorID()))
        );
        presence.set(redoOp.value, { addToHistory: true });
        continue;
      }
      const ticket = context.issueTimeTicket();
      redoOp.setExecutedAt(ticket);
      context.push(redoOp);
    }
    const change = context.getChange();
    change.execute(this.clone.root, this.clone.presences, OpSource.UndoRedo);
    const { opInfos, reverseOps } = change.execute(
      this.root,
      this.presences,
      OpSource.UndoRedo
    );
    const reversePresence = context.getReversePresence();
    if (reversePresence) {
      reverseOps.push({
        type: "presence",
        value: reversePresence
      });
    }
    if (reverseOps.length > 0) {
      this.internalHistory.pushUndo(reverseOps);
    }
    if (!change.hasPresenceChange() && opInfos.length === 0) {
      return;
    }
    this.localChanges.push(change);
    this.changeID = change.getID();
    const actorID = this.changeID.getActorID();
    const event = [];
    if (opInfos.length > 0) {
      event.push({
        type: "local-change",
        source: OpSource.UndoRedo,
        value: {
          message: change.getMessage() || "",
          operations: opInfos,
          actor: actorID,
          clientSeq: change.getID().getClientSeq(),
          serverSeq: change.getID().getServerSeq()
        },
        rawChange: this.isEnableDevtools() ? change.toStruct() : void 0
      });
    }
    if (change.hasPresenceChange()) {
      event.push({
        type: "presence-changed",
        source: OpSource.UndoRedo,
        value: {
          clientID: actorID,
          presence: this.getPresence(actorID)
        }
      });
    }
    this.publish(event);
  }
  /**
   * `getUndoStackForTest` returns the undo stack for test.
   */
  getUndoStackForTest() {
    return this.internalHistory.getUndoStackForTest();
  }
  /**
   * `getRedoStackForTest` returns the redo stack for test.
   */
  getRedoStackForTest() {
    return this.internalHistory.getRedoStackForTest();
  }
}
function createAuthInterceptor(apiKey, token) {
  return (next) => async (req) => {
    if (apiKey) {
      req.header.set("x-api-key", apiKey);
    }
    if (token) {
      req.header.set("authorization", token);
    }
    return await next(req);
  };
}
const name = "yorkie-js-sdk";
const version = "0.4.25";
const description = "Yorkie JS SDK";
const main = "./dist/yorkie-js-sdk.js";
const typings = "./dist/yorkie-js-sdk.d.ts";
const files = [
  "dist"
];
const scripts = {
  build: "tsc && vite build",
  "build:proto": "npx buf generate",
  "build:docs": "typedoc",
  "build:examples": "npm run build --workspace examples",
  "build:ghpages": "mkdir -p ghpages/examples && cp -r docs ghpages/api-reference && find examples -name 'dist' -type d -exec sh -c 'cp -r {} ghpages/examples/$(basename $(dirname {}))' \\;",
  dev: "vite build -c vite.preview.ts && vite preview",
  test: "vitest run",
  "test:watch": "vitest",
  "test:bench": "vitest bench",
  "test:ci": "vitest run --coverage",
  "test:yorkie.dev": "TEST_RPC_ADDR=https://api.yorkie.dev vitest run --coverage",
  lint: "eslint . --fix --max-warnings=0 --ext .ts",
  prepare: "npm run build"
};
const engines = {
  node: ">=18.0.0",
  npm: ">=7.1.0"
};
const repository = {
  type: "git",
  url: "git+https://github.com/yorkie-team/yorkie-js-sdk.git"
};
const author = {
  name: "hackerwins",
  email: "susukang98@gmail.com"
};
const license = "Apache-2.0";
const bugs = {
  url: "https://github.com/yorkie-team/yorkie-js-sdk/issues"
};
const homepage = "https://github.com/yorkie-team/yorkie-js-sdk#readme";
const devDependencies = {
  "@bufbuild/buf": "^1.28.1",
  "@bufbuild/protoc-gen-es": "^1.6.0",
  "@connectrpc/protoc-gen-connect-es": "^1.2.0",
  "@types/google-protobuf": "^3.15.5",
  "@types/jsdom": "^21.1.3",
  "@types/long": "^4.0.1",
  "@typescript-eslint/eslint-plugin": "^5.30.6",
  "@typescript-eslint/parser": "^5.30.6",
  "@vitest/coverage-istanbul": "^0.34.5",
  "@vitest/coverage-v8": "^0.34.5",
  eslint: "^8.19.0",
  "eslint-plugin-jsdoc": "^39.3.3",
  "eslint-plugin-prettier": "^4.2.1",
  "eslint-plugin-tsdoc": "^0.2.16",
  husky: "^8.0.3",
  jsdom: "^22.1.0",
  prettier: "^2.7.1",
  "ts-node": "^10.9.1",
  typedoc: "^0.25.13",
  typescript: "^4.7.4",
  "typescript-transform-paths": "^3.3.1",
  vite: "^4.4.9",
  "vite-plugin-commonjs": "^0.10.1",
  "vite-plugin-dts": "^3.9.1",
  "vite-tsconfig-paths": "^4.2.1",
  vitest: "^0.34.5",
  "vitest-environment-custom-jsdom": "file:test/vitest/env"
};
const dependencies = {
  "@bufbuild/protobuf": "^1.6.0",
  "@connectrpc/connect": "^1.2.0",
  "@connectrpc/connect-web": "^1.2.0",
  long: "^5.2.0"
};
const husky = {
  hooks: {
    "pre-commit": "npm run lint"
  }
};
const workspaces = [
  "examples/*"
];
const pkg = {
  name,
  version,
  description,
  main,
  typings,
  files,
  scripts,
  engines,
  repository,
  author,
  license,
  bugs,
  homepage,
  devDependencies,
  dependencies,
  husky,
  workspaces
};
function createMetricInterceptor() {
  return (next) => async (req) => {
    req.header.set("x-yorkie-user-agent", pkg.name + "/" + pkg.version);
    return await next(req);
  };
}
var SyncMode = /* @__PURE__ */ ((SyncMode2) => {
  SyncMode2["Manual"] = "manual";
  SyncMode2["Realtime"] = "realtime";
  SyncMode2["RealtimePushOnly"] = "realtime-pushonly";
  SyncMode2["RealtimeSyncOff"] = "realtime-syncoff";
  return SyncMode2;
})(SyncMode || {});
var ClientStatus = /* @__PURE__ */ ((ClientStatus2) => {
  ClientStatus2["Deactivated"] = "deactivated";
  ClientStatus2["Activated"] = "activated";
  return ClientStatus2;
})(ClientStatus || {});
const DefaultClientOptions = {
  syncLoopDuration: 50,
  retrySyncLoopDelay: 1e3,
  reconnectStreamDelay: 1e3
};
class Client {
  /**
   * @param rpcAddr - the address of the RPC server.
   * @param opts - the options of the client.
   */
  constructor(rpcAddr, opts) {
    __publicField(this, "id");
    __publicField(this, "key");
    __publicField(this, "status");
    __publicField(this, "attachmentMap");
    __publicField(this, "apiKey");
    __publicField(this, "syncLoopDuration");
    __publicField(this, "reconnectStreamDelay");
    __publicField(this, "retrySyncLoopDelay");
    __publicField(this, "rpcClient");
    opts = opts || DefaultClientOptions;
    this.key = opts.key ? opts.key : uuid();
    this.status = "deactivated";
    this.attachmentMap = /* @__PURE__ */ new Map();
    this.apiKey = opts.apiKey || "";
    this.syncLoopDuration = opts.syncLoopDuration || DefaultClientOptions.syncLoopDuration;
    this.reconnectStreamDelay = opts.reconnectStreamDelay || DefaultClientOptions.reconnectStreamDelay;
    this.retrySyncLoopDelay = opts.retrySyncLoopDelay || DefaultClientOptions.retrySyncLoopDelay;
    this.rpcClient = createPromiseClient(
      YorkieService,
      createGrpcWebTransport({
        baseUrl: rpcAddr,
        interceptors: [
          createAuthInterceptor(opts.apiKey, opts.token),
          createMetricInterceptor()
        ]
      })
    );
  }
  /**
   * `activate` activates this client. That is, it registers itself to the server
   * and receives a unique ID from the server. The given ID is used to
   * distinguish different clients.
   */
  activate() {
    if (this.isActive()) {
      return Promise.resolve();
    }
    return this.rpcClient.activateClient(
      {
        clientKey: this.key
      },
      { headers: { "x-shard-key": this.apiKey } }
    ).then((res) => {
      this.id = res.clientId;
      this.status = "activated";
      this.runSyncLoop();
      logger.info(`[AC] c:"${this.getKey()}" activated, id:"${this.id}"`);
    }).catch((err) => {
      logger.error(`[AC] c:"${this.getKey()}" err :`, err);
      throw err;
    });
  }
  /**
   * `deactivate` deactivates this client.
   */
  deactivate() {
    if (this.status === "deactivated") {
      return Promise.resolve();
    }
    return this.rpcClient.deactivateClient(
      {
        clientId: this.id
      },
      { headers: { "x-shard-key": this.apiKey } }
    ).then(() => {
      for (const [key, attachment] of this.attachmentMap) {
        attachment.doc.applyStatus(DocumentStatus.Detached);
        this.detachInternal(key);
      }
      this.status = "deactivated";
      logger.info(`[DC] c"${this.getKey()}" deactivated`);
    }).catch((err) => {
      logger.error(`[DC] c:"${this.getKey()}" err :`, err);
      throw err;
    });
  }
  /**
   * `attach` attaches the given document to this client. It tells the server that
   * this client will synchronize the given document.
   */
  attach(doc, options = {}) {
    if (!this.isActive()) {
      throw new YorkieError(Code.ClientNotActive, `${this.key} is not active`);
    }
    if (doc.getStatus() !== DocumentStatus.Detached) {
      throw new YorkieError(
        Code.DocumentNotDetached,
        `${doc.getKey()} is not detached`
      );
    }
    doc.setActor(this.id);
    doc.update((_, p) => p.set(options.initialPresence || {}));
    const syncMode = options.syncMode ?? "realtime";
    return this.rpcClient.attachDocument(
      {
        clientId: this.id,
        changePack: converter.toChangePack(doc.createChangePack())
      },
      {
        headers: { "x-shard-key": `${this.apiKey}/${doc.getKey()}` }
      }
    ).then(async (res) => {
      const pack = converter.fromChangePack(res.changePack);
      doc.applyChangePack(pack);
      if (doc.getStatus() === DocumentStatus.Removed) {
        return doc;
      }
      doc.applyStatus(DocumentStatus.Attached);
      this.attachmentMap.set(
        doc.getKey(),
        new Attachment(
          this.reconnectStreamDelay,
          doc,
          res.documentId,
          syncMode
        )
      );
      if (syncMode !== "manual") {
        await this.runWatchLoop(doc.getKey());
      }
      logger.info(`[AD] c:"${this.getKey()}" attaches d:"${doc.getKey()}"`);
      return doc;
    }).catch((err) => {
      logger.error(`[AD] c:"${this.getKey()}" err :`, err);
      throw err;
    });
  }
  /**
   * `detach` detaches the given document from this client. It tells the
   * server that this client will no longer synchronize the given document.
   *
   * To collect garbage things like CRDT tombstones left on the document, all
   * the changes should be applied to other replicas before GC time. For this,
   * if the document is no longer used by this client, it should be detached.
   */
  detach(doc, options = {}) {
    if (!this.isActive()) {
      throw new YorkieError(Code.ClientNotActive, `${this.key} is not active`);
    }
    const attachment = this.attachmentMap.get(doc.getKey());
    if (!attachment) {
      throw new YorkieError(
        Code.DocumentNotAttached,
        `${doc.getKey()} is not attached`
      );
    }
    doc.update((_, p) => p.clear());
    return this.rpcClient.detachDocument(
      {
        clientId: this.id,
        documentId: attachment.docID,
        changePack: converter.toChangePack(doc.createChangePack()),
        removeIfNotAttached: options.removeIfNotAttached ?? false
      },
      {
        headers: { "x-shard-key": `${this.apiKey}/${doc.getKey()}` }
      }
    ).then((res) => {
      const pack = converter.fromChangePack(res.changePack);
      doc.applyChangePack(pack);
      if (doc.getStatus() !== DocumentStatus.Removed) {
        doc.applyStatus(DocumentStatus.Detached);
      }
      this.detachInternal(doc.getKey());
      logger.info(`[DD] c:"${this.getKey()}" detaches d:"${doc.getKey()}"`);
      return doc;
    }).catch((err) => {
      logger.error(`[DD] c:"${this.getKey()}" err :`, err);
      throw err;
    });
  }
  /**
   * `changeRealtimeSync` changes the synchronization mode of the given document.
   */
  async changeSyncMode(doc, syncMode) {
    if (!this.isActive()) {
      throw new YorkieError(Code.ClientNotActive, `${this.key} is not active`);
    }
    const attachment = this.attachmentMap.get(doc.getKey());
    if (!attachment) {
      throw new YorkieError(
        Code.DocumentNotAttached,
        `${doc.getKey()} is not attached`
      );
    }
    const prevSyncMode = attachment.syncMode;
    if (prevSyncMode === syncMode) {
      return doc;
    }
    attachment.changeSyncMode(syncMode);
    if (syncMode === "manual") {
      attachment.cancelWatchStream();
      return doc;
    }
    if (syncMode === "realtime") {
      attachment.remoteChangeEventReceived = true;
    }
    if (prevSyncMode === "manual") {
      await this.runWatchLoop(doc.getKey());
    }
    return doc;
  }
  /**
   * `sync` pushes local changes of the attached documents to the server and
   * receives changes of the remote replica from the server then apply them to
   * local documents.
   */
  sync(doc) {
    if (!this.isActive()) {
      throw new YorkieError(Code.ClientNotActive, `${this.key} is not active`);
    }
    const promises = [];
    if (doc) {
      const attachment = this.attachmentMap.get(doc.getKey());
      if (!attachment) {
        throw new YorkieError(
          Code.DocumentNotAttached,
          `${doc.getKey()} is not attached`
        );
      }
      promises.push(this.syncInternal(
        attachment,
        "realtime"
        /* Realtime */
      ));
    } else {
      this.attachmentMap.forEach((attachment) => {
        promises.push(this.syncInternal(attachment, attachment.syncMode));
      });
    }
    return Promise.all(promises);
  }
  /**
   * `remove` removes the given document.
   */
  remove(doc) {
    if (!this.isActive()) {
      throw new YorkieError(Code.ClientNotActive, `${this.key} is not active`);
    }
    const attachment = this.attachmentMap.get(doc.getKey());
    if (!attachment) {
      throw new YorkieError(
        Code.DocumentNotAttached,
        `${doc.getKey()} is not attached`
      );
    }
    doc.setActor(this.id);
    const pbChangePack = converter.toChangePack(doc.createChangePack());
    pbChangePack.isRemoved = true;
    return this.rpcClient.removeDocument(
      {
        clientId: this.id,
        documentId: attachment.docID,
        changePack: pbChangePack
      },
      {
        headers: { "x-shard-key": `${this.apiKey}/${doc.getKey()}` }
      }
    ).then((res) => {
      const pack = converter.fromChangePack(res.changePack);
      doc.applyChangePack(pack);
      this.detachInternal(doc.getKey());
      logger.info(`[RD] c:"${this.getKey()}" removes d:"${doc.getKey()}"`);
    }).catch((err) => {
      logger.error(`[RD] c:"${this.getKey()}" err :`, err);
      throw err;
    });
  }
  /**
   * `getID` returns a ActorID of client.
   */
  getID() {
    return this.id;
  }
  /**
   * `getKey` returns a key of client.
   */
  getKey() {
    return this.key;
  }
  /**
   * `isActive` checks if the client is active.
   */
  isActive() {
    return this.status === "activated";
  }
  /**
   * `getStatus` returns the status of this client.
   */
  getStatus() {
    return this.status;
  }
  runSyncLoop() {
    const doLoop = () => {
      if (!this.isActive()) {
        logger.debug(`[SL] c:"${this.getKey()}" exit sync loop`);
        return;
      }
      const syncJobs = [];
      for (const [, attachment] of this.attachmentMap) {
        if (attachment.needRealtimeSync()) {
          attachment.remoteChangeEventReceived = false;
          syncJobs.push(this.syncInternal(attachment, attachment.syncMode));
        }
      }
      Promise.all(syncJobs).then(() => setTimeout(doLoop, this.syncLoopDuration)).catch((err) => {
        logger.error(`[SL] c:"${this.getKey()}" sync failed:`, err);
        setTimeout(doLoop, this.retrySyncLoopDelay);
      });
    };
    logger.debug(`[SL] c:"${this.getKey()}" run sync loop`);
    doLoop();
  }
  async runWatchLoop(docKey) {
    const attachment = this.attachmentMap.get(docKey);
    if (!attachment) {
      throw new YorkieError(
        Code.DocumentNotAttached,
        `${docKey} is not attached`
      );
    }
    return attachment.runWatchLoop(
      (onDisconnect) => {
        if (!this.isActive()) {
          return Promise.reject(
            new YorkieError(Code.ClientNotActive, `${this.key} is not active`)
          );
        }
        const ac = new AbortController();
        const stream = this.rpcClient.watchDocument(
          {
            clientId: this.id,
            documentId: attachment.docID
          },
          {
            headers: { "x-shard-key": `${this.apiKey}/${docKey}` },
            signal: ac.signal
          }
        );
        attachment.doc.publish([
          {
            type: DocEventType.ConnectionChanged,
            value: StreamConnectionStatus.Connected
          }
        ]);
        logger.info(`[WD] c:"${this.getKey()}" watches d:"${docKey}"`);
        return new Promise((resolve, reject) => {
          const handleStream = async () => {
            try {
              for await (const resp of stream) {
                this.handleWatchDocumentsResponse(attachment, resp);
                if (resp.body.case === "initialization") {
                  resolve([stream, ac]);
                }
              }
            } catch (err) {
              attachment.doc.resetOnlineClients();
              attachment.doc.publish([
                {
                  type: DocEventType.Initialized,
                  source: OpSource.Local,
                  value: attachment.doc.getPresences()
                }
              ]);
              attachment.doc.publish([
                {
                  type: DocEventType.ConnectionChanged,
                  value: StreamConnectionStatus.Disconnected
                }
              ]);
              logger.debug(`[WD] c:"${this.getKey()}" unwatches`);
              if (err instanceof ConnectError && err.code != Code$1.Canceled) {
                onDisconnect();
              }
              reject(err);
            }
          };
          handleStream();
        });
      }
    );
  }
  handleWatchDocumentsResponse(attachment, resp) {
    if (resp.body.case === "event" && resp.body.value.type === DocEventType$1.DOCUMENT_CHANGED) {
      attachment.remoteChangeEventReceived = true;
      return;
    }
    attachment.doc.applyWatchStream(resp);
  }
  detachInternal(docKey) {
    const attachment = this.attachmentMap.get(docKey);
    if (!attachment) {
      return;
    }
    attachment.cancelWatchStream();
    logger.debug(`[WD] c:"${this.getKey()}" unwatches`);
    this.attachmentMap.delete(docKey);
  }
  syncInternal(attachment, syncMode) {
    const { doc, docID } = attachment;
    const reqPack = doc.createChangePack();
    return this.rpcClient.pushPullChanges(
      {
        clientId: this.id,
        documentId: docID,
        changePack: converter.toChangePack(reqPack),
        pushOnly: syncMode === "realtime-pushonly"
        /* RealtimePushOnly */
      },
      {
        headers: { "x-shard-key": `${this.apiKey}/${doc.getKey()}` }
      }
    ).then((res) => {
      const respPack = converter.fromChangePack(res.changePack);
      if (respPack.hasChanges() && (attachment.syncMode === "realtime-pushonly" || attachment.syncMode === "realtime-syncoff")) {
        return doc;
      }
      doc.applyChangePack(respPack);
      attachment.doc.publish([
        {
          type: DocEventType.SyncStatusChanged,
          value: DocumentSyncStatus.Synced
        }
      ]);
      if (doc.getStatus() === DocumentStatus.Removed) {
        this.detachInternal(doc.getKey());
      }
      const docKey = doc.getKey();
      const remoteSize = respPack.getChangeSize();
      logger.info(
        `[PP] c:"${this.getKey()}" sync d:"${docKey}", push:${reqPack.getChangeSize()} pull:${remoteSize} cp:${respPack.getCheckpoint().toTestString()}`
      );
      return doc;
    }).catch((err) => {
      doc.publish([
        {
          type: DocEventType.SyncStatusChanged,
          value: DocumentSyncStatus.SyncFailed
        }
      ]);
      logger.error(`[PP] c:"${this.getKey()}" err :`, err);
      throw err;
    });
  }
}
const types = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const yorkie = {
  Client,
  Document,
  Primitive,
  Text,
  Counter,
  Tree,
  IntType: CounterType.IntegerCnt,
  LongType: CounterType.LongCnt
};
if (typeof globalThis !== "undefined") {
  globalThis.yorkie = {
    Client,
    Document,
    Primitive,
    Text,
    Counter,
    Tree,
    IntType: CounterType.IntegerCnt,
    LongType: CounterType.LongCnt
  };
}
export {
  Change,
  Client,
  ClientStatus,
  Counter,
  types as Devtools,
  DocEventType,
  Document,
  DocumentStatus,
  DocumentSyncStatus,
  EventSourceDevPanel,
  EventSourceSDK,
  OpSource,
  Primitive,
  StreamConnectionStatus,
  SyncMode,
  Text,
  TimeTicket,
  Tree,
  converter,
  yorkie as default,
  setLogLevel
};
//# sourceMappingURL=yorkie-js-sdk.es.js.map
