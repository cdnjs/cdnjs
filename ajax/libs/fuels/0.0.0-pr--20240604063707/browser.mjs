var Ju = Object.defineProperty;
var qu = (e, t, n) => t in e ? Ju(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var S = (e, t, n) => (qu(e, typeof t != "symbol" ? t + "" : t, n), n), js = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var Fe = (e, t, n) => (js(e, t, "read from private field"), n ? n.call(e) : t.get(e)), vt = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Ft = (e, t, n, r) => (js(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var $s = (e, t, n) => (js(e, t, "access private method"), n);
function gc() {
  return {
    FORC: "0.60.0",
    FUEL_CORE: "0.27.0",
    FUELS: "0.89.1"
  };
}
function Yo(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function Pi(e, t) {
  const n = Yo(e), r = Yo(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function ju(e, t) {
  const { major: n } = Pi(e, t);
  return n === 0;
}
function $u(e, t) {
  const { minor: n } = Pi(e, t);
  return n === 0;
}
function Ku(e, t) {
  const { patch: n } = Pi(e, t);
  return n === 0;
}
function ed(e) {
  const { FUEL_CORE: t } = gc();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: ju(e, t),
    isMinorSupported: $u(e, t),
    isPatchSupported: Ku(e, t)
  };
}
var td = gc(), nd = Object.defineProperty, rd = (e, t, n) => t in e ? nd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, sd = (e, t, n) => (rd(e, typeof t != "symbol" ? t + "" : t, n), n), N = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e))(N || {}), Vr = class extends Error {
  constructor(t, n, r = {}) {
    super(n);
    S(this, "VERSIONS", td);
    S(this, "metadata");
    S(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = r;
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new Vr(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(N);
    if (!r.includes(n.code))
      throw new Vr(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new Vr(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, metadata: s, VERSIONS: i } = this;
    return { code: t, name: n, message: r, metadata: s, VERSIONS: i };
  }
}, x = Vr;
sd(x, "CODES", N);
var Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function id(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ui(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var Gi = { exports: {} };
const od = {}, ad = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: od
}, Symbol.toStringTag, { value: "Module" })), cd = /* @__PURE__ */ Ui(ad);
Gi.exports;
(function(e) {
  (function(t, n) {
    function r(b, a) {
      if (!b)
        throw new Error(a || "Assertion failed");
    }
    function s(b, a) {
      b.super_ = a;
      var c = function() {
      };
      c.prototype = a.prototype, b.prototype = new c(), b.prototype.constructor = b;
    }
    function i(b, a, c) {
      if (i.isBN(b))
        return b;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, b !== null && ((a === "le" || a === "be") && (c = a, a = 10), this._init(b || 0, a || 10, c || "be"));
    }
    typeof t == "object" ? t.exports = i : n.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = cd.Buffer;
    } catch {
    }
    i.isBN = function(a) {
      return a instanceof i ? !0 : a !== null && typeof a == "object" && a.constructor.wordSize === i.wordSize && Array.isArray(a.words);
    }, i.max = function(a, c) {
      return a.cmp(c) > 0 ? a : c;
    }, i.min = function(a, c) {
      return a.cmp(c) < 0 ? a : c;
    }, i.prototype._init = function(a, c, l) {
      if (typeof a == "number")
        return this._initNumber(a, c, l);
      if (typeof a == "object")
        return this._initArray(a, c, l);
      c === "hex" && (c = 16), r(c === (c | 0) && c >= 2 && c <= 36), a = a.toString().replace(/\s+/g, "");
      var p = 0;
      a[0] === "-" && (p++, this.negative = 1), p < a.length && (c === 16 ? this._parseHex(a, p, l) : (this._parseBase(a, c, p), l === "le" && this._initArray(this.toArray(), c, l)));
    }, i.prototype._initNumber = function(a, c, l) {
      a < 0 && (this.negative = 1, a = -a), a < 67108864 ? (this.words = [a & 67108863], this.length = 1) : a < 4503599627370496 ? (this.words = [
        a & 67108863,
        a / 67108864 & 67108863
      ], this.length = 2) : (r(a < 9007199254740992), this.words = [
        a & 67108863,
        a / 67108864 & 67108863,
        1
      ], this.length = 3), l === "le" && this._initArray(this.toArray(), c, l);
    }, i.prototype._initArray = function(a, c, l) {
      if (r(typeof a.length == "number"), a.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(a.length / 3), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var f, w, y = 0;
      if (l === "be")
        for (p = a.length - 1, f = 0; p >= 0; p -= 3)
          w = a[p] | a[p - 1] << 8 | a[p - 2] << 16, this.words[f] |= w << y & 67108863, this.words[f + 1] = w >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
      else if (l === "le")
        for (p = 0, f = 0; p < a.length; p += 3)
          w = a[p] | a[p + 1] << 8 | a[p + 2] << 16, this.words[f] |= w << y & 67108863, this.words[f + 1] = w >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
      return this._strip();
    };
    function u(b, a) {
      var c = b.charCodeAt(a);
      if (c >= 48 && c <= 57)
        return c - 48;
      if (c >= 65 && c <= 70)
        return c - 55;
      if (c >= 97 && c <= 102)
        return c - 87;
      r(!1, "Invalid character in " + b);
    }
    function A(b, a, c) {
      var l = u(b, c);
      return c - 1 >= a && (l |= u(b, c - 1) << 4), l;
    }
    i.prototype._parseHex = function(a, c, l) {
      this.length = Math.ceil((a.length - c) / 6), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var f = 0, w = 0, y;
      if (l === "be")
        for (p = a.length - 1; p >= c; p -= 2)
          y = A(a, c, p) << f, this.words[w] |= y & 67108863, f >= 18 ? (f -= 18, w += 1, this.words[w] |= y >>> 26) : f += 8;
      else {
        var g = a.length - c;
        for (p = g % 2 === 0 ? c + 1 : c; p < a.length; p += 2)
          y = A(a, c, p) << f, this.words[w] |= y & 67108863, f >= 18 ? (f -= 18, w += 1, this.words[w] |= y >>> 26) : f += 8;
      }
      this._strip();
    };
    function h(b, a, c, l) {
      for (var p = 0, f = 0, w = Math.min(b.length, c), y = a; y < w; y++) {
        var g = b.charCodeAt(y) - 48;
        p *= l, g >= 49 ? f = g - 49 + 10 : g >= 17 ? f = g - 17 + 10 : f = g, r(g >= 0 && f < l, "Invalid character"), p += f;
      }
      return p;
    }
    i.prototype._parseBase = function(a, c, l) {
      this.words = [0], this.length = 1;
      for (var p = 0, f = 1; f <= 67108863; f *= c)
        p++;
      p--, f = f / c | 0;
      for (var w = a.length - l, y = w % p, g = Math.min(w, w - y) + l, d = 0, m = l; m < g; m += p)
        d = h(a, m, m + p, c), this.imuln(f), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
      if (y !== 0) {
        var Z = 1;
        for (d = h(a, m, a.length, c), m = 0; m < y; m++)
          Z *= c;
        this.imuln(Z), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
      }
      this._strip();
    }, i.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        a.words[c] = this.words[c];
      a.length = this.length, a.negative = this.negative, a.red = this.red;
    };
    function E(b, a) {
      b.words = a.words, b.length = a.length, b.negative = a.negative, b.red = a.red;
    }
    if (i.prototype._move = function(a) {
      E(a, this);
    }, i.prototype.clone = function() {
      var a = new i(null);
      return this.copy(a), a;
    }, i.prototype._expand = function(a) {
      for (; this.length < a; )
        this.words[this.length++] = 0;
      return this;
    }, i.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, i.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol < "u" && typeof Symbol.for == "function")
      try {
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = I;
      } catch {
        i.prototype.inspect = I;
      }
    else
      i.prototype.inspect = I;
    function I() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var _ = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ], v = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ], R = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    i.prototype.toString = function(a, c) {
      a = a || 10, c = c | 0 || 1;
      var l;
      if (a === 16 || a === "hex") {
        l = "";
        for (var p = 0, f = 0, w = 0; w < this.length; w++) {
          var y = this.words[w], g = ((y << p | f) & 16777215).toString(16);
          f = y >>> 24 - p & 16777215, p += 2, p >= 26 && (p -= 26, w--), f !== 0 || w !== this.length - 1 ? l = _[6 - g.length] + g + l : l = g + l;
        }
        for (f !== 0 && (l = f.toString(16) + l); l.length % c !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var d = v[a], m = R[a];
        l = "";
        var Z = this.clone();
        for (Z.negative = 0; !Z.isZero(); ) {
          var J = Z.modrn(m).toString(a);
          Z = Z.idivn(m), Z.isZero() ? l = J + l : l = _[d - J.length] + J + l;
        }
        for (this.isZero() && (l = "0" + l); l.length % c !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      r(!1, "Base should be between 2 and 36");
    }, i.prototype.toNumber = function() {
      var a = this.words[0];
      return this.length === 2 ? a += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? a += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -a : a;
    }, i.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, o && (i.prototype.toBuffer = function(a, c) {
      return this.toArrayLike(o, a, c);
    }), i.prototype.toArray = function(a, c) {
      return this.toArrayLike(Array, a, c);
    };
    var C = function(a, c) {
      return a.allocUnsafe ? a.allocUnsafe(c) : new a(c);
    };
    i.prototype.toArrayLike = function(a, c, l) {
      this._strip();
      var p = this.byteLength(), f = l || Math.max(1, p);
      r(p <= f, "byte array longer than desired length"), r(f > 0, "Requested array length <= 0");
      var w = C(a, f), y = c === "le" ? "LE" : "BE";
      return this["_toArrayLike" + y](w, p), w;
    }, i.prototype._toArrayLikeLE = function(a, c) {
      for (var l = 0, p = 0, f = 0, w = 0; f < this.length; f++) {
        var y = this.words[f] << w | p;
        a[l++] = y & 255, l < a.length && (a[l++] = y >> 8 & 255), l < a.length && (a[l++] = y >> 16 & 255), w === 6 ? (l < a.length && (a[l++] = y >> 24 & 255), p = 0, w = 0) : (p = y >>> 24, w += 2);
      }
      if (l < a.length)
        for (a[l++] = p; l < a.length; )
          a[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, c) {
      for (var l = a.length - 1, p = 0, f = 0, w = 0; f < this.length; f++) {
        var y = this.words[f] << w | p;
        a[l--] = y & 255, l >= 0 && (a[l--] = y >> 8 & 255), l >= 0 && (a[l--] = y >> 16 & 255), w === 6 ? (l >= 0 && (a[l--] = y >> 24 & 255), p = 0, w = 0) : (p = y >>> 24, w += 2);
      }
      if (l >= 0)
        for (a[l--] = p; l >= 0; )
          a[l--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(a) {
      return 32 - Math.clz32(a);
    } : i.prototype._countBits = function(a) {
      var c = a, l = 0;
      return c >= 4096 && (l += 13, c >>>= 13), c >= 64 && (l += 7, c >>>= 7), c >= 8 && (l += 4, c >>>= 4), c >= 2 && (l += 2, c >>>= 2), l + c;
    }, i.prototype._zeroBits = function(a) {
      if (a === 0)
        return 26;
      var c = a, l = 0;
      return c & 8191 || (l += 13, c >>>= 13), c & 127 || (l += 7, c >>>= 7), c & 15 || (l += 4, c >>>= 4), c & 3 || (l += 2, c >>>= 2), c & 1 || l++, l;
    }, i.prototype.bitLength = function() {
      var a = this.words[this.length - 1], c = this._countBits(a);
      return (this.length - 1) * 26 + c;
    };
    function F(b) {
      for (var a = new Array(b.bitLength()), c = 0; c < a.length; c++) {
        var l = c / 26 | 0, p = c % 26;
        a[c] = b.words[l] >>> p & 1;
      }
      return a;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var a = 0, c = 0; c < this.length; c++) {
        var l = this._zeroBits(this.words[c]);
        if (a += l, l !== 26)
          break;
      }
      return a;
    }, i.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, i.prototype.toTwos = function(a) {
      return this.negative !== 0 ? this.abs().inotn(a).iaddn(1) : this.clone();
    }, i.prototype.fromTwos = function(a) {
      return this.testn(a - 1) ? this.notn(a).iaddn(1).ineg() : this.clone();
    }, i.prototype.isNeg = function() {
      return this.negative !== 0;
    }, i.prototype.neg = function() {
      return this.clone().ineg();
    }, i.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, i.prototype.iuor = function(a) {
      for (; this.length < a.length; )
        this.words[this.length++] = 0;
      for (var c = 0; c < a.length; c++)
        this.words[c] = this.words[c] | a.words[c];
      return this._strip();
    }, i.prototype.ior = function(a) {
      return r((this.negative | a.negative) === 0), this.iuor(a);
    }, i.prototype.or = function(a) {
      return this.length > a.length ? this.clone().ior(a) : a.clone().ior(this);
    }, i.prototype.uor = function(a) {
      return this.length > a.length ? this.clone().iuor(a) : a.clone().iuor(this);
    }, i.prototype.iuand = function(a) {
      var c;
      this.length > a.length ? c = a : c = this;
      for (var l = 0; l < c.length; l++)
        this.words[l] = this.words[l] & a.words[l];
      return this.length = c.length, this._strip();
    }, i.prototype.iand = function(a) {
      return r((this.negative | a.negative) === 0), this.iuand(a);
    }, i.prototype.and = function(a) {
      return this.length > a.length ? this.clone().iand(a) : a.clone().iand(this);
    }, i.prototype.uand = function(a) {
      return this.length > a.length ? this.clone().iuand(a) : a.clone().iuand(this);
    }, i.prototype.iuxor = function(a) {
      var c, l;
      this.length > a.length ? (c = this, l = a) : (c = a, l = this);
      for (var p = 0; p < l.length; p++)
        this.words[p] = c.words[p] ^ l.words[p];
      if (this !== c)
        for (; p < c.length; p++)
          this.words[p] = c.words[p];
      return this.length = c.length, this._strip();
    }, i.prototype.ixor = function(a) {
      return r((this.negative | a.negative) === 0), this.iuxor(a);
    }, i.prototype.xor = function(a) {
      return this.length > a.length ? this.clone().ixor(a) : a.clone().ixor(this);
    }, i.prototype.uxor = function(a) {
      return this.length > a.length ? this.clone().iuxor(a) : a.clone().iuxor(this);
    }, i.prototype.inotn = function(a) {
      r(typeof a == "number" && a >= 0);
      var c = Math.ceil(a / 26) | 0, l = a % 26;
      this._expand(c), l > 0 && c--;
      for (var p = 0; p < c; p++)
        this.words[p] = ~this.words[p] & 67108863;
      return l > 0 && (this.words[p] = ~this.words[p] & 67108863 >> 26 - l), this._strip();
    }, i.prototype.notn = function(a) {
      return this.clone().inotn(a);
    }, i.prototype.setn = function(a, c) {
      r(typeof a == "number" && a >= 0);
      var l = a / 26 | 0, p = a % 26;
      return this._expand(l + 1), c ? this.words[l] = this.words[l] | 1 << p : this.words[l] = this.words[l] & ~(1 << p), this._strip();
    }, i.prototype.iadd = function(a) {
      var c;
      if (this.negative !== 0 && a.negative === 0)
        return this.negative = 0, c = this.isub(a), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && a.negative !== 0)
        return a.negative = 0, c = this.isub(a), a.negative = 1, c._normSign();
      var l, p;
      this.length > a.length ? (l = this, p = a) : (l = a, p = this);
      for (var f = 0, w = 0; w < p.length; w++)
        c = (l.words[w] | 0) + (p.words[w] | 0) + f, this.words[w] = c & 67108863, f = c >>> 26;
      for (; f !== 0 && w < l.length; w++)
        c = (l.words[w] | 0) + f, this.words[w] = c & 67108863, f = c >>> 26;
      if (this.length = l.length, f !== 0)
        this.words[this.length] = f, this.length++;
      else if (l !== this)
        for (; w < l.length; w++)
          this.words[w] = l.words[w];
      return this;
    }, i.prototype.add = function(a) {
      var c;
      return a.negative !== 0 && this.negative === 0 ? (a.negative = 0, c = this.sub(a), a.negative ^= 1, c) : a.negative === 0 && this.negative !== 0 ? (this.negative = 0, c = a.sub(this), this.negative = 1, c) : this.length > a.length ? this.clone().iadd(a) : a.clone().iadd(this);
    }, i.prototype.isub = function(a) {
      if (a.negative !== 0) {
        a.negative = 0;
        var c = this.iadd(a);
        return a.negative = 1, c._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(a), this.negative = 1, this._normSign();
      var l = this.cmp(a);
      if (l === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var p, f;
      l > 0 ? (p = this, f = a) : (p = a, f = this);
      for (var w = 0, y = 0; y < f.length; y++)
        c = (p.words[y] | 0) - (f.words[y] | 0) + w, w = c >> 26, this.words[y] = c & 67108863;
      for (; w !== 0 && y < p.length; y++)
        c = (p.words[y] | 0) + w, w = c >> 26, this.words[y] = c & 67108863;
      if (w === 0 && y < p.length && p !== this)
        for (; y < p.length; y++)
          this.words[y] = p.words[y];
      return this.length = Math.max(this.length, y), p !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function M(b, a, c) {
      c.negative = a.negative ^ b.negative;
      var l = b.length + a.length | 0;
      c.length = l, l = l - 1 | 0;
      var p = b.words[0] | 0, f = a.words[0] | 0, w = p * f, y = w & 67108863, g = w / 67108864 | 0;
      c.words[0] = y;
      for (var d = 1; d < l; d++) {
        for (var m = g >>> 26, Z = g & 67108863, J = Math.min(d, a.length - 1), K = Math.max(0, d - b.length + 1); K <= J; K++) {
          var j = d - K | 0;
          p = b.words[j] | 0, f = a.words[K] | 0, w = p * f + Z, m += w / 67108864 | 0, Z = w & 67108863;
        }
        c.words[d] = Z | 0, g = m | 0;
      }
      return g !== 0 ? c.words[d] = g | 0 : c.length--, c._strip();
    }
    var G = function(a, c, l) {
      var p = a.words, f = c.words, w = l.words, y = 0, g, d, m, Z = p[0] | 0, J = Z & 8191, K = Z >>> 13, j = p[1] | 0, re = j & 8191, se = j >>> 13, Se = p[2] | 0, fe = Se & 8191, oe = Se >>> 13, ve = p[3] | 0, Ae = ve & 8191, he = ve >>> 13, Tt = p[4] | 0, xe = Tt & 8191, ye = Tt >>> 13, rr = p[5] | 0, Qe = rr & 8191, Te = rr >>> 13, Fr = p[6] | 0, Pe = Fr & 8191, Ue = Fr >>> 13, No = p[7] | 0, Ge = No & 8191, Xe = No >>> 13, Do = p[8] | 0, ze = Do & 8191, Ye = Do >>> 13, To = p[9] | 0, Ve = To & 8191, He = To >>> 13, Fo = f[0] | 0, Ze = Fo & 8191, We = Fo >>> 13, Mo = f[1] | 0, Je = Mo & 8191, qe = Mo >>> 13, Oo = f[2] | 0, je = Oo & 8191, $e = Oo >>> 13, Lo = f[3] | 0, Ke = Lo & 8191, et = Lo >>> 13, ko = f[4] | 0, tt = ko & 8191, nt = ko >>> 13, Po = f[5] | 0, rt = Po & 8191, st = Po >>> 13, Uo = f[6] | 0, it = Uo & 8191, ot = Uo >>> 13, Go = f[7] | 0, at = Go & 8191, ct = Go >>> 13, Xo = f[8] | 0, ut = Xo & 8191, dt = Xo >>> 13, zo = f[9] | 0, At = zo & 8191, lt = zo >>> 13;
      l.negative = a.negative ^ c.negative, l.length = 19, g = Math.imul(J, Ze), d = Math.imul(J, We), d = d + Math.imul(K, Ze) | 0, m = Math.imul(K, We);
      var Ds = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Ds >>> 26) | 0, Ds &= 67108863, g = Math.imul(re, Ze), d = Math.imul(re, We), d = d + Math.imul(se, Ze) | 0, m = Math.imul(se, We), g = g + Math.imul(J, Je) | 0, d = d + Math.imul(J, qe) | 0, d = d + Math.imul(K, Je) | 0, m = m + Math.imul(K, qe) | 0;
      var Ts = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Ts >>> 26) | 0, Ts &= 67108863, g = Math.imul(fe, Ze), d = Math.imul(fe, We), d = d + Math.imul(oe, Ze) | 0, m = Math.imul(oe, We), g = g + Math.imul(re, Je) | 0, d = d + Math.imul(re, qe) | 0, d = d + Math.imul(se, Je) | 0, m = m + Math.imul(se, qe) | 0, g = g + Math.imul(J, je) | 0, d = d + Math.imul(J, $e) | 0, d = d + Math.imul(K, je) | 0, m = m + Math.imul(K, $e) | 0;
      var Fs = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Fs >>> 26) | 0, Fs &= 67108863, g = Math.imul(Ae, Ze), d = Math.imul(Ae, We), d = d + Math.imul(he, Ze) | 0, m = Math.imul(he, We), g = g + Math.imul(fe, Je) | 0, d = d + Math.imul(fe, qe) | 0, d = d + Math.imul(oe, Je) | 0, m = m + Math.imul(oe, qe) | 0, g = g + Math.imul(re, je) | 0, d = d + Math.imul(re, $e) | 0, d = d + Math.imul(se, je) | 0, m = m + Math.imul(se, $e) | 0, g = g + Math.imul(J, Ke) | 0, d = d + Math.imul(J, et) | 0, d = d + Math.imul(K, Ke) | 0, m = m + Math.imul(K, et) | 0;
      var Ms = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Ms >>> 26) | 0, Ms &= 67108863, g = Math.imul(xe, Ze), d = Math.imul(xe, We), d = d + Math.imul(ye, Ze) | 0, m = Math.imul(ye, We), g = g + Math.imul(Ae, Je) | 0, d = d + Math.imul(Ae, qe) | 0, d = d + Math.imul(he, Je) | 0, m = m + Math.imul(he, qe) | 0, g = g + Math.imul(fe, je) | 0, d = d + Math.imul(fe, $e) | 0, d = d + Math.imul(oe, je) | 0, m = m + Math.imul(oe, $e) | 0, g = g + Math.imul(re, Ke) | 0, d = d + Math.imul(re, et) | 0, d = d + Math.imul(se, Ke) | 0, m = m + Math.imul(se, et) | 0, g = g + Math.imul(J, tt) | 0, d = d + Math.imul(J, nt) | 0, d = d + Math.imul(K, tt) | 0, m = m + Math.imul(K, nt) | 0;
      var Os = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Os >>> 26) | 0, Os &= 67108863, g = Math.imul(Qe, Ze), d = Math.imul(Qe, We), d = d + Math.imul(Te, Ze) | 0, m = Math.imul(Te, We), g = g + Math.imul(xe, Je) | 0, d = d + Math.imul(xe, qe) | 0, d = d + Math.imul(ye, Je) | 0, m = m + Math.imul(ye, qe) | 0, g = g + Math.imul(Ae, je) | 0, d = d + Math.imul(Ae, $e) | 0, d = d + Math.imul(he, je) | 0, m = m + Math.imul(he, $e) | 0, g = g + Math.imul(fe, Ke) | 0, d = d + Math.imul(fe, et) | 0, d = d + Math.imul(oe, Ke) | 0, m = m + Math.imul(oe, et) | 0, g = g + Math.imul(re, tt) | 0, d = d + Math.imul(re, nt) | 0, d = d + Math.imul(se, tt) | 0, m = m + Math.imul(se, nt) | 0, g = g + Math.imul(J, rt) | 0, d = d + Math.imul(J, st) | 0, d = d + Math.imul(K, rt) | 0, m = m + Math.imul(K, st) | 0;
      var Ls = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Ls >>> 26) | 0, Ls &= 67108863, g = Math.imul(Pe, Ze), d = Math.imul(Pe, We), d = d + Math.imul(Ue, Ze) | 0, m = Math.imul(Ue, We), g = g + Math.imul(Qe, Je) | 0, d = d + Math.imul(Qe, qe) | 0, d = d + Math.imul(Te, Je) | 0, m = m + Math.imul(Te, qe) | 0, g = g + Math.imul(xe, je) | 0, d = d + Math.imul(xe, $e) | 0, d = d + Math.imul(ye, je) | 0, m = m + Math.imul(ye, $e) | 0, g = g + Math.imul(Ae, Ke) | 0, d = d + Math.imul(Ae, et) | 0, d = d + Math.imul(he, Ke) | 0, m = m + Math.imul(he, et) | 0, g = g + Math.imul(fe, tt) | 0, d = d + Math.imul(fe, nt) | 0, d = d + Math.imul(oe, tt) | 0, m = m + Math.imul(oe, nt) | 0, g = g + Math.imul(re, rt) | 0, d = d + Math.imul(re, st) | 0, d = d + Math.imul(se, rt) | 0, m = m + Math.imul(se, st) | 0, g = g + Math.imul(J, it) | 0, d = d + Math.imul(J, ot) | 0, d = d + Math.imul(K, it) | 0, m = m + Math.imul(K, ot) | 0;
      var ks = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (ks >>> 26) | 0, ks &= 67108863, g = Math.imul(Ge, Ze), d = Math.imul(Ge, We), d = d + Math.imul(Xe, Ze) | 0, m = Math.imul(Xe, We), g = g + Math.imul(Pe, Je) | 0, d = d + Math.imul(Pe, qe) | 0, d = d + Math.imul(Ue, Je) | 0, m = m + Math.imul(Ue, qe) | 0, g = g + Math.imul(Qe, je) | 0, d = d + Math.imul(Qe, $e) | 0, d = d + Math.imul(Te, je) | 0, m = m + Math.imul(Te, $e) | 0, g = g + Math.imul(xe, Ke) | 0, d = d + Math.imul(xe, et) | 0, d = d + Math.imul(ye, Ke) | 0, m = m + Math.imul(ye, et) | 0, g = g + Math.imul(Ae, tt) | 0, d = d + Math.imul(Ae, nt) | 0, d = d + Math.imul(he, tt) | 0, m = m + Math.imul(he, nt) | 0, g = g + Math.imul(fe, rt) | 0, d = d + Math.imul(fe, st) | 0, d = d + Math.imul(oe, rt) | 0, m = m + Math.imul(oe, st) | 0, g = g + Math.imul(re, it) | 0, d = d + Math.imul(re, ot) | 0, d = d + Math.imul(se, it) | 0, m = m + Math.imul(se, ot) | 0, g = g + Math.imul(J, at) | 0, d = d + Math.imul(J, ct) | 0, d = d + Math.imul(K, at) | 0, m = m + Math.imul(K, ct) | 0;
      var Ps = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Ps >>> 26) | 0, Ps &= 67108863, g = Math.imul(ze, Ze), d = Math.imul(ze, We), d = d + Math.imul(Ye, Ze) | 0, m = Math.imul(Ye, We), g = g + Math.imul(Ge, Je) | 0, d = d + Math.imul(Ge, qe) | 0, d = d + Math.imul(Xe, Je) | 0, m = m + Math.imul(Xe, qe) | 0, g = g + Math.imul(Pe, je) | 0, d = d + Math.imul(Pe, $e) | 0, d = d + Math.imul(Ue, je) | 0, m = m + Math.imul(Ue, $e) | 0, g = g + Math.imul(Qe, Ke) | 0, d = d + Math.imul(Qe, et) | 0, d = d + Math.imul(Te, Ke) | 0, m = m + Math.imul(Te, et) | 0, g = g + Math.imul(xe, tt) | 0, d = d + Math.imul(xe, nt) | 0, d = d + Math.imul(ye, tt) | 0, m = m + Math.imul(ye, nt) | 0, g = g + Math.imul(Ae, rt) | 0, d = d + Math.imul(Ae, st) | 0, d = d + Math.imul(he, rt) | 0, m = m + Math.imul(he, st) | 0, g = g + Math.imul(fe, it) | 0, d = d + Math.imul(fe, ot) | 0, d = d + Math.imul(oe, it) | 0, m = m + Math.imul(oe, ot) | 0, g = g + Math.imul(re, at) | 0, d = d + Math.imul(re, ct) | 0, d = d + Math.imul(se, at) | 0, m = m + Math.imul(se, ct) | 0, g = g + Math.imul(J, ut) | 0, d = d + Math.imul(J, dt) | 0, d = d + Math.imul(K, ut) | 0, m = m + Math.imul(K, dt) | 0;
      var Us = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Us >>> 26) | 0, Us &= 67108863, g = Math.imul(Ve, Ze), d = Math.imul(Ve, We), d = d + Math.imul(He, Ze) | 0, m = Math.imul(He, We), g = g + Math.imul(ze, Je) | 0, d = d + Math.imul(ze, qe) | 0, d = d + Math.imul(Ye, Je) | 0, m = m + Math.imul(Ye, qe) | 0, g = g + Math.imul(Ge, je) | 0, d = d + Math.imul(Ge, $e) | 0, d = d + Math.imul(Xe, je) | 0, m = m + Math.imul(Xe, $e) | 0, g = g + Math.imul(Pe, Ke) | 0, d = d + Math.imul(Pe, et) | 0, d = d + Math.imul(Ue, Ke) | 0, m = m + Math.imul(Ue, et) | 0, g = g + Math.imul(Qe, tt) | 0, d = d + Math.imul(Qe, nt) | 0, d = d + Math.imul(Te, tt) | 0, m = m + Math.imul(Te, nt) | 0, g = g + Math.imul(xe, rt) | 0, d = d + Math.imul(xe, st) | 0, d = d + Math.imul(ye, rt) | 0, m = m + Math.imul(ye, st) | 0, g = g + Math.imul(Ae, it) | 0, d = d + Math.imul(Ae, ot) | 0, d = d + Math.imul(he, it) | 0, m = m + Math.imul(he, ot) | 0, g = g + Math.imul(fe, at) | 0, d = d + Math.imul(fe, ct) | 0, d = d + Math.imul(oe, at) | 0, m = m + Math.imul(oe, ct) | 0, g = g + Math.imul(re, ut) | 0, d = d + Math.imul(re, dt) | 0, d = d + Math.imul(se, ut) | 0, m = m + Math.imul(se, dt) | 0, g = g + Math.imul(J, At) | 0, d = d + Math.imul(J, lt) | 0, d = d + Math.imul(K, At) | 0, m = m + Math.imul(K, lt) | 0;
      var Gs = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Gs >>> 26) | 0, Gs &= 67108863, g = Math.imul(Ve, Je), d = Math.imul(Ve, qe), d = d + Math.imul(He, Je) | 0, m = Math.imul(He, qe), g = g + Math.imul(ze, je) | 0, d = d + Math.imul(ze, $e) | 0, d = d + Math.imul(Ye, je) | 0, m = m + Math.imul(Ye, $e) | 0, g = g + Math.imul(Ge, Ke) | 0, d = d + Math.imul(Ge, et) | 0, d = d + Math.imul(Xe, Ke) | 0, m = m + Math.imul(Xe, et) | 0, g = g + Math.imul(Pe, tt) | 0, d = d + Math.imul(Pe, nt) | 0, d = d + Math.imul(Ue, tt) | 0, m = m + Math.imul(Ue, nt) | 0, g = g + Math.imul(Qe, rt) | 0, d = d + Math.imul(Qe, st) | 0, d = d + Math.imul(Te, rt) | 0, m = m + Math.imul(Te, st) | 0, g = g + Math.imul(xe, it) | 0, d = d + Math.imul(xe, ot) | 0, d = d + Math.imul(ye, it) | 0, m = m + Math.imul(ye, ot) | 0, g = g + Math.imul(Ae, at) | 0, d = d + Math.imul(Ae, ct) | 0, d = d + Math.imul(he, at) | 0, m = m + Math.imul(he, ct) | 0, g = g + Math.imul(fe, ut) | 0, d = d + Math.imul(fe, dt) | 0, d = d + Math.imul(oe, ut) | 0, m = m + Math.imul(oe, dt) | 0, g = g + Math.imul(re, At) | 0, d = d + Math.imul(re, lt) | 0, d = d + Math.imul(se, At) | 0, m = m + Math.imul(se, lt) | 0;
      var Xs = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Xs >>> 26) | 0, Xs &= 67108863, g = Math.imul(Ve, je), d = Math.imul(Ve, $e), d = d + Math.imul(He, je) | 0, m = Math.imul(He, $e), g = g + Math.imul(ze, Ke) | 0, d = d + Math.imul(ze, et) | 0, d = d + Math.imul(Ye, Ke) | 0, m = m + Math.imul(Ye, et) | 0, g = g + Math.imul(Ge, tt) | 0, d = d + Math.imul(Ge, nt) | 0, d = d + Math.imul(Xe, tt) | 0, m = m + Math.imul(Xe, nt) | 0, g = g + Math.imul(Pe, rt) | 0, d = d + Math.imul(Pe, st) | 0, d = d + Math.imul(Ue, rt) | 0, m = m + Math.imul(Ue, st) | 0, g = g + Math.imul(Qe, it) | 0, d = d + Math.imul(Qe, ot) | 0, d = d + Math.imul(Te, it) | 0, m = m + Math.imul(Te, ot) | 0, g = g + Math.imul(xe, at) | 0, d = d + Math.imul(xe, ct) | 0, d = d + Math.imul(ye, at) | 0, m = m + Math.imul(ye, ct) | 0, g = g + Math.imul(Ae, ut) | 0, d = d + Math.imul(Ae, dt) | 0, d = d + Math.imul(he, ut) | 0, m = m + Math.imul(he, dt) | 0, g = g + Math.imul(fe, At) | 0, d = d + Math.imul(fe, lt) | 0, d = d + Math.imul(oe, At) | 0, m = m + Math.imul(oe, lt) | 0;
      var zs = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (zs >>> 26) | 0, zs &= 67108863, g = Math.imul(Ve, Ke), d = Math.imul(Ve, et), d = d + Math.imul(He, Ke) | 0, m = Math.imul(He, et), g = g + Math.imul(ze, tt) | 0, d = d + Math.imul(ze, nt) | 0, d = d + Math.imul(Ye, tt) | 0, m = m + Math.imul(Ye, nt) | 0, g = g + Math.imul(Ge, rt) | 0, d = d + Math.imul(Ge, st) | 0, d = d + Math.imul(Xe, rt) | 0, m = m + Math.imul(Xe, st) | 0, g = g + Math.imul(Pe, it) | 0, d = d + Math.imul(Pe, ot) | 0, d = d + Math.imul(Ue, it) | 0, m = m + Math.imul(Ue, ot) | 0, g = g + Math.imul(Qe, at) | 0, d = d + Math.imul(Qe, ct) | 0, d = d + Math.imul(Te, at) | 0, m = m + Math.imul(Te, ct) | 0, g = g + Math.imul(xe, ut) | 0, d = d + Math.imul(xe, dt) | 0, d = d + Math.imul(ye, ut) | 0, m = m + Math.imul(ye, dt) | 0, g = g + Math.imul(Ae, At) | 0, d = d + Math.imul(Ae, lt) | 0, d = d + Math.imul(he, At) | 0, m = m + Math.imul(he, lt) | 0;
      var Ys = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Ys >>> 26) | 0, Ys &= 67108863, g = Math.imul(Ve, tt), d = Math.imul(Ve, nt), d = d + Math.imul(He, tt) | 0, m = Math.imul(He, nt), g = g + Math.imul(ze, rt) | 0, d = d + Math.imul(ze, st) | 0, d = d + Math.imul(Ye, rt) | 0, m = m + Math.imul(Ye, st) | 0, g = g + Math.imul(Ge, it) | 0, d = d + Math.imul(Ge, ot) | 0, d = d + Math.imul(Xe, it) | 0, m = m + Math.imul(Xe, ot) | 0, g = g + Math.imul(Pe, at) | 0, d = d + Math.imul(Pe, ct) | 0, d = d + Math.imul(Ue, at) | 0, m = m + Math.imul(Ue, ct) | 0, g = g + Math.imul(Qe, ut) | 0, d = d + Math.imul(Qe, dt) | 0, d = d + Math.imul(Te, ut) | 0, m = m + Math.imul(Te, dt) | 0, g = g + Math.imul(xe, At) | 0, d = d + Math.imul(xe, lt) | 0, d = d + Math.imul(ye, At) | 0, m = m + Math.imul(ye, lt) | 0;
      var Vs = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Vs >>> 26) | 0, Vs &= 67108863, g = Math.imul(Ve, rt), d = Math.imul(Ve, st), d = d + Math.imul(He, rt) | 0, m = Math.imul(He, st), g = g + Math.imul(ze, it) | 0, d = d + Math.imul(ze, ot) | 0, d = d + Math.imul(Ye, it) | 0, m = m + Math.imul(Ye, ot) | 0, g = g + Math.imul(Ge, at) | 0, d = d + Math.imul(Ge, ct) | 0, d = d + Math.imul(Xe, at) | 0, m = m + Math.imul(Xe, ct) | 0, g = g + Math.imul(Pe, ut) | 0, d = d + Math.imul(Pe, dt) | 0, d = d + Math.imul(Ue, ut) | 0, m = m + Math.imul(Ue, dt) | 0, g = g + Math.imul(Qe, At) | 0, d = d + Math.imul(Qe, lt) | 0, d = d + Math.imul(Te, At) | 0, m = m + Math.imul(Te, lt) | 0;
      var Hs = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Hs >>> 26) | 0, Hs &= 67108863, g = Math.imul(Ve, it), d = Math.imul(Ve, ot), d = d + Math.imul(He, it) | 0, m = Math.imul(He, ot), g = g + Math.imul(ze, at) | 0, d = d + Math.imul(ze, ct) | 0, d = d + Math.imul(Ye, at) | 0, m = m + Math.imul(Ye, ct) | 0, g = g + Math.imul(Ge, ut) | 0, d = d + Math.imul(Ge, dt) | 0, d = d + Math.imul(Xe, ut) | 0, m = m + Math.imul(Xe, dt) | 0, g = g + Math.imul(Pe, At) | 0, d = d + Math.imul(Pe, lt) | 0, d = d + Math.imul(Ue, At) | 0, m = m + Math.imul(Ue, lt) | 0;
      var Zs = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Zs >>> 26) | 0, Zs &= 67108863, g = Math.imul(Ve, at), d = Math.imul(Ve, ct), d = d + Math.imul(He, at) | 0, m = Math.imul(He, ct), g = g + Math.imul(ze, ut) | 0, d = d + Math.imul(ze, dt) | 0, d = d + Math.imul(Ye, ut) | 0, m = m + Math.imul(Ye, dt) | 0, g = g + Math.imul(Ge, At) | 0, d = d + Math.imul(Ge, lt) | 0, d = d + Math.imul(Xe, At) | 0, m = m + Math.imul(Xe, lt) | 0;
      var Ws = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Ws >>> 26) | 0, Ws &= 67108863, g = Math.imul(Ve, ut), d = Math.imul(Ve, dt), d = d + Math.imul(He, ut) | 0, m = Math.imul(He, dt), g = g + Math.imul(ze, At) | 0, d = d + Math.imul(ze, lt) | 0, d = d + Math.imul(Ye, At) | 0, m = m + Math.imul(Ye, lt) | 0;
      var Js = (y + g | 0) + ((d & 8191) << 13) | 0;
      y = (m + (d >>> 13) | 0) + (Js >>> 26) | 0, Js &= 67108863, g = Math.imul(Ve, At), d = Math.imul(Ve, lt), d = d + Math.imul(He, At) | 0, m = Math.imul(He, lt);
      var qs = (y + g | 0) + ((d & 8191) << 13) | 0;
      return y = (m + (d >>> 13) | 0) + (qs >>> 26) | 0, qs &= 67108863, w[0] = Ds, w[1] = Ts, w[2] = Fs, w[3] = Ms, w[4] = Os, w[5] = Ls, w[6] = ks, w[7] = Ps, w[8] = Us, w[9] = Gs, w[10] = Xs, w[11] = zs, w[12] = Ys, w[13] = Vs, w[14] = Hs, w[15] = Zs, w[16] = Ws, w[17] = Js, w[18] = qs, y !== 0 && (w[19] = y, l.length++), l;
    };
    Math.imul || (G = M);
    function L(b, a, c) {
      c.negative = a.negative ^ b.negative, c.length = b.length + a.length;
      for (var l = 0, p = 0, f = 0; f < c.length - 1; f++) {
        var w = p;
        p = 0;
        for (var y = l & 67108863, g = Math.min(f, a.length - 1), d = Math.max(0, f - b.length + 1); d <= g; d++) {
          var m = f - d, Z = b.words[m] | 0, J = a.words[d] | 0, K = Z * J, j = K & 67108863;
          w = w + (K / 67108864 | 0) | 0, j = j + y | 0, y = j & 67108863, w = w + (j >>> 26) | 0, p += w >>> 26, w &= 67108863;
        }
        c.words[f] = y, l = w, w = p;
      }
      return l !== 0 ? c.words[f] = l : c.length--, c._strip();
    }
    function W(b, a, c) {
      return L(b, a, c);
    }
    i.prototype.mulTo = function(a, c) {
      var l, p = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = G(this, a, c) : p < 63 ? l = M(this, a, c) : p < 1024 ? l = L(this, a, c) : l = W(this, a, c), l;
    }, i.prototype.mul = function(a) {
      var c = new i(null);
      return c.words = new Array(this.length + a.length), this.mulTo(a, c);
    }, i.prototype.mulf = function(a) {
      var c = new i(null);
      return c.words = new Array(this.length + a.length), W(this, a, c);
    }, i.prototype.imul = function(a) {
      return this.clone().mulTo(a, this);
    }, i.prototype.imuln = function(a) {
      var c = a < 0;
      c && (a = -a), r(typeof a == "number"), r(a < 67108864);
      for (var l = 0, p = 0; p < this.length; p++) {
        var f = (this.words[p] | 0) * a, w = (f & 67108863) + (l & 67108863);
        l >>= 26, l += f / 67108864 | 0, l += w >>> 26, this.words[p] = w & 67108863;
      }
      return l !== 0 && (this.words[p] = l, this.length++), c ? this.ineg() : this;
    }, i.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(a) {
      var c = F(a);
      if (c.length === 0)
        return new i(1);
      for (var l = this, p = 0; p < c.length && c[p] === 0; p++, l = l.sqr())
        ;
      if (++p < c.length)
        for (var f = l.sqr(); p < c.length; p++, f = f.sqr())
          c[p] !== 0 && (l = l.mul(f));
      return l;
    }, i.prototype.iushln = function(a) {
      r(typeof a == "number" && a >= 0);
      var c = a % 26, l = (a - c) / 26, p = 67108863 >>> 26 - c << 26 - c, f;
      if (c !== 0) {
        var w = 0;
        for (f = 0; f < this.length; f++) {
          var y = this.words[f] & p, g = (this.words[f] | 0) - y << c;
          this.words[f] = g | w, w = y >>> 26 - c;
        }
        w && (this.words[f] = w, this.length++);
      }
      if (l !== 0) {
        for (f = this.length - 1; f >= 0; f--)
          this.words[f + l] = this.words[f];
        for (f = 0; f < l; f++)
          this.words[f] = 0;
        this.length += l;
      }
      return this._strip();
    }, i.prototype.ishln = function(a) {
      return r(this.negative === 0), this.iushln(a);
    }, i.prototype.iushrn = function(a, c, l) {
      r(typeof a == "number" && a >= 0);
      var p;
      c ? p = (c - c % 26) / 26 : p = 0;
      var f = a % 26, w = Math.min((a - f) / 26, this.length), y = 67108863 ^ 67108863 >>> f << f, g = l;
      if (p -= w, p = Math.max(0, p), g) {
        for (var d = 0; d < w; d++)
          g.words[d] = this.words[d];
        g.length = w;
      }
      if (w !== 0)
        if (this.length > w)
          for (this.length -= w, d = 0; d < this.length; d++)
            this.words[d] = this.words[d + w];
        else
          this.words[0] = 0, this.length = 1;
      var m = 0;
      for (d = this.length - 1; d >= 0 && (m !== 0 || d >= p); d--) {
        var Z = this.words[d] | 0;
        this.words[d] = m << 26 - f | Z >>> f, m = Z & y;
      }
      return g && m !== 0 && (g.words[g.length++] = m), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(a, c, l) {
      return r(this.negative === 0), this.iushrn(a, c, l);
    }, i.prototype.shln = function(a) {
      return this.clone().ishln(a);
    }, i.prototype.ushln = function(a) {
      return this.clone().iushln(a);
    }, i.prototype.shrn = function(a) {
      return this.clone().ishrn(a);
    }, i.prototype.ushrn = function(a) {
      return this.clone().iushrn(a);
    }, i.prototype.testn = function(a) {
      r(typeof a == "number" && a >= 0);
      var c = a % 26, l = (a - c) / 26, p = 1 << c;
      if (this.length <= l)
        return !1;
      var f = this.words[l];
      return !!(f & p);
    }, i.prototype.imaskn = function(a) {
      r(typeof a == "number" && a >= 0);
      var c = a % 26, l = (a - c) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= l)
        return this;
      if (c !== 0 && l++, this.length = Math.min(l, this.length), c !== 0) {
        var p = 67108863 ^ 67108863 >>> c << c;
        this.words[this.length - 1] &= p;
      }
      return this._strip();
    }, i.prototype.maskn = function(a) {
      return this.clone().imaskn(a);
    }, i.prototype.iaddn = function(a) {
      return r(typeof a == "number"), r(a < 67108864), a < 0 ? this.isubn(-a) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= a ? (this.words[0] = a - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(a), this.negative = 1, this) : this._iaddn(a);
    }, i.prototype._iaddn = function(a) {
      this.words[0] += a;
      for (var c = 0; c < this.length && this.words[c] >= 67108864; c++)
        this.words[c] -= 67108864, c === this.length - 1 ? this.words[c + 1] = 1 : this.words[c + 1]++;
      return this.length = Math.max(this.length, c + 1), this;
    }, i.prototype.isubn = function(a) {
      if (r(typeof a == "number"), r(a < 67108864), a < 0)
        return this.iaddn(-a);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(a), this.negative = 1, this;
      if (this.words[0] -= a, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var c = 0; c < this.length && this.words[c] < 0; c++)
          this.words[c] += 67108864, this.words[c + 1] -= 1;
      return this._strip();
    }, i.prototype.addn = function(a) {
      return this.clone().iaddn(a);
    }, i.prototype.subn = function(a) {
      return this.clone().isubn(a);
    }, i.prototype.iabs = function() {
      return this.negative = 0, this;
    }, i.prototype.abs = function() {
      return this.clone().iabs();
    }, i.prototype._ishlnsubmul = function(a, c, l) {
      var p = a.length + l, f;
      this._expand(p);
      var w, y = 0;
      for (f = 0; f < a.length; f++) {
        w = (this.words[f + l] | 0) + y;
        var g = (a.words[f] | 0) * c;
        w -= g & 67108863, y = (w >> 26) - (g / 67108864 | 0), this.words[f + l] = w & 67108863;
      }
      for (; f < this.length - l; f++)
        w = (this.words[f + l] | 0) + y, y = w >> 26, this.words[f + l] = w & 67108863;
      if (y === 0)
        return this._strip();
      for (r(y === -1), y = 0, f = 0; f < this.length; f++)
        w = -(this.words[f] | 0) + y, y = w >> 26, this.words[f] = w & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, c) {
      var l = this.length - a.length, p = this.clone(), f = a, w = f.words[f.length - 1] | 0, y = this._countBits(w);
      l = 26 - y, l !== 0 && (f = f.ushln(l), p.iushln(l), w = f.words[f.length - 1] | 0);
      var g = p.length - f.length, d;
      if (c !== "mod") {
        d = new i(null), d.length = g + 1, d.words = new Array(d.length);
        for (var m = 0; m < d.length; m++)
          d.words[m] = 0;
      }
      var Z = p.clone()._ishlnsubmul(f, 1, g);
      Z.negative === 0 && (p = Z, d && (d.words[g] = 1));
      for (var J = g - 1; J >= 0; J--) {
        var K = (p.words[f.length + J] | 0) * 67108864 + (p.words[f.length + J - 1] | 0);
        for (K = Math.min(K / w | 0, 67108863), p._ishlnsubmul(f, K, J); p.negative !== 0; )
          K--, p.negative = 0, p._ishlnsubmul(f, 1, J), p.isZero() || (p.negative ^= 1);
        d && (d.words[J] = K);
      }
      return d && d._strip(), p._strip(), c !== "div" && l !== 0 && p.iushrn(l), {
        div: d || null,
        mod: p
      };
    }, i.prototype.divmod = function(a, c, l) {
      if (r(!a.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var p, f, w;
      return this.negative !== 0 && a.negative === 0 ? (w = this.neg().divmod(a, c), c !== "mod" && (p = w.div.neg()), c !== "div" && (f = w.mod.neg(), l && f.negative !== 0 && f.iadd(a)), {
        div: p,
        mod: f
      }) : this.negative === 0 && a.negative !== 0 ? (w = this.divmod(a.neg(), c), c !== "mod" && (p = w.div.neg()), {
        div: p,
        mod: w.mod
      }) : this.negative & a.negative ? (w = this.neg().divmod(a.neg(), c), c !== "div" && (f = w.mod.neg(), l && f.negative !== 0 && f.isub(a)), {
        div: w.div,
        mod: f
      }) : a.length > this.length || this.cmp(a) < 0 ? {
        div: new i(0),
        mod: this
      } : a.length === 1 ? c === "div" ? {
        div: this.divn(a.words[0]),
        mod: null
      } : c === "mod" ? {
        div: null,
        mod: new i(this.modrn(a.words[0]))
      } : {
        div: this.divn(a.words[0]),
        mod: new i(this.modrn(a.words[0]))
      } : this._wordDiv(a, c);
    }, i.prototype.div = function(a) {
      return this.divmod(a, "div", !1).div;
    }, i.prototype.mod = function(a) {
      return this.divmod(a, "mod", !1).mod;
    }, i.prototype.umod = function(a) {
      return this.divmod(a, "mod", !0).mod;
    }, i.prototype.divRound = function(a) {
      var c = this.divmod(a);
      if (c.mod.isZero())
        return c.div;
      var l = c.div.negative !== 0 ? c.mod.isub(a) : c.mod, p = a.ushrn(1), f = a.andln(1), w = l.cmp(p);
      return w < 0 || f === 1 && w === 0 ? c.div : c.div.negative !== 0 ? c.div.isubn(1) : c.div.iaddn(1);
    }, i.prototype.modrn = function(a) {
      var c = a < 0;
      c && (a = -a), r(a <= 67108863);
      for (var l = (1 << 26) % a, p = 0, f = this.length - 1; f >= 0; f--)
        p = (l * p + (this.words[f] | 0)) % a;
      return c ? -p : p;
    }, i.prototype.modn = function(a) {
      return this.modrn(a);
    }, i.prototype.idivn = function(a) {
      var c = a < 0;
      c && (a = -a), r(a <= 67108863);
      for (var l = 0, p = this.length - 1; p >= 0; p--) {
        var f = (this.words[p] | 0) + l * 67108864;
        this.words[p] = f / a | 0, l = f % a;
      }
      return this._strip(), c ? this.ineg() : this;
    }, i.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, i.prototype.egcd = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var c = this, l = a.clone();
      c.negative !== 0 ? c = c.umod(a) : c = c.clone();
      for (var p = new i(1), f = new i(0), w = new i(0), y = new i(1), g = 0; c.isEven() && l.isEven(); )
        c.iushrn(1), l.iushrn(1), ++g;
      for (var d = l.clone(), m = c.clone(); !c.isZero(); ) {
        for (var Z = 0, J = 1; !(c.words[0] & J) && Z < 26; ++Z, J <<= 1)
          ;
        if (Z > 0)
          for (c.iushrn(Z); Z-- > 0; )
            (p.isOdd() || f.isOdd()) && (p.iadd(d), f.isub(m)), p.iushrn(1), f.iushrn(1);
        for (var K = 0, j = 1; !(l.words[0] & j) && K < 26; ++K, j <<= 1)
          ;
        if (K > 0)
          for (l.iushrn(K); K-- > 0; )
            (w.isOdd() || y.isOdd()) && (w.iadd(d), y.isub(m)), w.iushrn(1), y.iushrn(1);
        c.cmp(l) >= 0 ? (c.isub(l), p.isub(w), f.isub(y)) : (l.isub(c), w.isub(p), y.isub(f));
      }
      return {
        a: w,
        b: y,
        gcd: l.iushln(g)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var c = this, l = a.clone();
      c.negative !== 0 ? c = c.umod(a) : c = c.clone();
      for (var p = new i(1), f = new i(0), w = l.clone(); c.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var y = 0, g = 1; !(c.words[0] & g) && y < 26; ++y, g <<= 1)
          ;
        if (y > 0)
          for (c.iushrn(y); y-- > 0; )
            p.isOdd() && p.iadd(w), p.iushrn(1);
        for (var d = 0, m = 1; !(l.words[0] & m) && d < 26; ++d, m <<= 1)
          ;
        if (d > 0)
          for (l.iushrn(d); d-- > 0; )
            f.isOdd() && f.iadd(w), f.iushrn(1);
        c.cmp(l) >= 0 ? (c.isub(l), p.isub(f)) : (l.isub(c), f.isub(p));
      }
      var Z;
      return c.cmpn(1) === 0 ? Z = p : Z = f, Z.cmpn(0) < 0 && Z.iadd(a), Z;
    }, i.prototype.gcd = function(a) {
      if (this.isZero())
        return a.abs();
      if (a.isZero())
        return this.abs();
      var c = this.clone(), l = a.clone();
      c.negative = 0, l.negative = 0;
      for (var p = 0; c.isEven() && l.isEven(); p++)
        c.iushrn(1), l.iushrn(1);
      do {
        for (; c.isEven(); )
          c.iushrn(1);
        for (; l.isEven(); )
          l.iushrn(1);
        var f = c.cmp(l);
        if (f < 0) {
          var w = c;
          c = l, l = w;
        } else if (f === 0 || l.cmpn(1) === 0)
          break;
        c.isub(l);
      } while (!0);
      return l.iushln(p);
    }, i.prototype.invm = function(a) {
      return this.egcd(a).a.umod(a);
    }, i.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, i.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, i.prototype.andln = function(a) {
      return this.words[0] & a;
    }, i.prototype.bincn = function(a) {
      r(typeof a == "number");
      var c = a % 26, l = (a - c) / 26, p = 1 << c;
      if (this.length <= l)
        return this._expand(l + 1), this.words[l] |= p, this;
      for (var f = p, w = l; f !== 0 && w < this.length; w++) {
        var y = this.words[w] | 0;
        y += f, f = y >>> 26, y &= 67108863, this.words[w] = y;
      }
      return f !== 0 && (this.words[w] = f, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(a) {
      var c = a < 0;
      if (this.negative !== 0 && !c)
        return -1;
      if (this.negative === 0 && c)
        return 1;
      this._strip();
      var l;
      if (this.length > 1)
        l = 1;
      else {
        c && (a = -a), r(a <= 67108863, "Number is too big");
        var p = this.words[0] | 0;
        l = p === a ? 0 : p < a ? -1 : 1;
      }
      return this.negative !== 0 ? -l | 0 : l;
    }, i.prototype.cmp = function(a) {
      if (this.negative !== 0 && a.negative === 0)
        return -1;
      if (this.negative === 0 && a.negative !== 0)
        return 1;
      var c = this.ucmp(a);
      return this.negative !== 0 ? -c | 0 : c;
    }, i.prototype.ucmp = function(a) {
      if (this.length > a.length)
        return 1;
      if (this.length < a.length)
        return -1;
      for (var c = 0, l = this.length - 1; l >= 0; l--) {
        var p = this.words[l] | 0, f = a.words[l] | 0;
        if (p !== f) {
          p < f ? c = -1 : p > f && (c = 1);
          break;
        }
      }
      return c;
    }, i.prototype.gtn = function(a) {
      return this.cmpn(a) === 1;
    }, i.prototype.gt = function(a) {
      return this.cmp(a) === 1;
    }, i.prototype.gten = function(a) {
      return this.cmpn(a) >= 0;
    }, i.prototype.gte = function(a) {
      return this.cmp(a) >= 0;
    }, i.prototype.ltn = function(a) {
      return this.cmpn(a) === -1;
    }, i.prototype.lt = function(a) {
      return this.cmp(a) === -1;
    }, i.prototype.lten = function(a) {
      return this.cmpn(a) <= 0;
    }, i.prototype.lte = function(a) {
      return this.cmp(a) <= 0;
    }, i.prototype.eqn = function(a) {
      return this.cmpn(a) === 0;
    }, i.prototype.eq = function(a) {
      return this.cmp(a) === 0;
    }, i.red = function(a) {
      return new H(a);
    }, i.prototype.toRed = function(a) {
      return r(!this.red, "Already a number in reduction context"), r(this.negative === 0, "red works only with positives"), a.convertTo(this)._forceRed(a);
    }, i.prototype.fromRed = function() {
      return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, i.prototype._forceRed = function(a) {
      return this.red = a, this;
    }, i.prototype.forceRed = function(a) {
      return r(!this.red, "Already a number in reduction context"), this._forceRed(a);
    }, i.prototype.redAdd = function(a) {
      return r(this.red, "redAdd works only with red numbers"), this.red.add(this, a);
    }, i.prototype.redIAdd = function(a) {
      return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, a);
    }, i.prototype.redSub = function(a) {
      return r(this.red, "redSub works only with red numbers"), this.red.sub(this, a);
    }, i.prototype.redISub = function(a) {
      return r(this.red, "redISub works only with red numbers"), this.red.isub(this, a);
    }, i.prototype.redShl = function(a) {
      return r(this.red, "redShl works only with red numbers"), this.red.shl(this, a);
    }, i.prototype.redMul = function(a) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.mul(this, a);
    }, i.prototype.redIMul = function(a) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.imul(this, a);
    }, i.prototype.redSqr = function() {
      return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, i.prototype.redISqr = function() {
      return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, i.prototype.redSqrt = function() {
      return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, i.prototype.redInvm = function() {
      return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, i.prototype.redNeg = function() {
      return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, i.prototype.redPow = function(a) {
      return r(this.red && !a.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, a);
    };
    var O = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function T(b, a) {
      this.name = b, this.p = new i(a, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    T.prototype._tmp = function() {
      var a = new i(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, T.prototype.ireduce = function(a) {
      var c = a, l;
      do
        this.split(c, this.tmp), c = this.imulK(c), c = c.iadd(this.tmp), l = c.bitLength();
      while (l > this.n);
      var p = l < this.n ? -1 : c.ucmp(this.p);
      return p === 0 ? (c.words[0] = 0, c.length = 1) : p > 0 ? c.isub(this.p) : c.strip !== void 0 ? c.strip() : c._strip(), c;
    }, T.prototype.split = function(a, c) {
      a.iushrn(this.n, 0, c);
    }, T.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function k() {
      T.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(k, T), k.prototype.split = function(a, c) {
      for (var l = 4194303, p = Math.min(a.length, 9), f = 0; f < p; f++)
        c.words[f] = a.words[f];
      if (c.length = p, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var w = a.words[9];
      for (c.words[c.length++] = w & l, f = 10; f < a.length; f++) {
        var y = a.words[f] | 0;
        a.words[f - 10] = (y & l) << 4 | w >>> 22, w = y;
      }
      w >>>= 22, a.words[f - 10] = w, w === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, k.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var c = 0, l = 0; l < a.length; l++) {
        var p = a.words[l] | 0;
        c += p * 977, a.words[l] = c & 67108863, c = p * 64 + (c / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function U() {
      T.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(U, T);
    function q() {
      T.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(q, T);
    function Y() {
      T.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(Y, T), Y.prototype.imulK = function(a) {
      for (var c = 0, l = 0; l < a.length; l++) {
        var p = (a.words[l] | 0) * 19 + c, f = p & 67108863;
        p >>>= 26, a.words[l] = f, c = p;
      }
      return c !== 0 && (a.words[a.length++] = c), a;
    }, i._prime = function(a) {
      if (O[a])
        return O[a];
      var c;
      if (a === "k256")
        c = new k();
      else if (a === "p224")
        c = new U();
      else if (a === "p192")
        c = new q();
      else if (a === "p25519")
        c = new Y();
      else
        throw new Error("Unknown prime " + a);
      return O[a] = c, c;
    };
    function H(b) {
      if (typeof b == "string") {
        var a = i._prime(b);
        this.m = a.p, this.prime = a;
      } else
        r(b.gtn(1), "modulus must be greater than 1"), this.m = b, this.prime = null;
    }
    H.prototype._verify1 = function(a) {
      r(a.negative === 0, "red works only with positives"), r(a.red, "red works only with red numbers");
    }, H.prototype._verify2 = function(a, c) {
      r((a.negative | c.negative) === 0, "red works only with positives"), r(
        a.red && a.red === c.red,
        "red works only with red numbers"
      );
    }, H.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (E(a, a.umod(this.m)._forceRed(this)), a);
    }, H.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, H.prototype.add = function(a, c) {
      this._verify2(a, c);
      var l = a.add(c);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, H.prototype.iadd = function(a, c) {
      this._verify2(a, c);
      var l = a.iadd(c);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, H.prototype.sub = function(a, c) {
      this._verify2(a, c);
      var l = a.sub(c);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, H.prototype.isub = function(a, c) {
      this._verify2(a, c);
      var l = a.isub(c);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, H.prototype.shl = function(a, c) {
      return this._verify1(a), this.imod(a.ushln(c));
    }, H.prototype.imul = function(a, c) {
      return this._verify2(a, c), this.imod(a.imul(c));
    }, H.prototype.mul = function(a, c) {
      return this._verify2(a, c), this.imod(a.mul(c));
    }, H.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, H.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, H.prototype.sqrt = function(a) {
      if (a.isZero())
        return a.clone();
      var c = this.m.andln(3);
      if (r(c % 2 === 1), c === 3) {
        var l = this.m.add(new i(1)).iushrn(2);
        return this.pow(a, l);
      }
      for (var p = this.m.subn(1), f = 0; !p.isZero() && p.andln(1) === 0; )
        f++, p.iushrn(1);
      r(!p.isZero());
      var w = new i(1).toRed(this), y = w.redNeg(), g = this.m.subn(1).iushrn(1), d = this.m.bitLength();
      for (d = new i(2 * d * d).toRed(this); this.pow(d, g).cmp(y) !== 0; )
        d.redIAdd(y);
      for (var m = this.pow(d, p), Z = this.pow(a, p.addn(1).iushrn(1)), J = this.pow(a, p), K = f; J.cmp(w) !== 0; ) {
        for (var j = J, re = 0; j.cmp(w) !== 0; re++)
          j = j.redSqr();
        r(re < K);
        var se = this.pow(m, new i(1).iushln(K - re - 1));
        Z = Z.redMul(se), m = se.redSqr(), J = J.redMul(m), K = re;
      }
      return Z;
    }, H.prototype.invm = function(a) {
      var c = a._invmp(this.m);
      return c.negative !== 0 ? (c.negative = 0, this.imod(c).redNeg()) : this.imod(c);
    }, H.prototype.pow = function(a, c) {
      if (c.isZero())
        return new i(1).toRed(this);
      if (c.cmpn(1) === 0)
        return a.clone();
      var l = 4, p = new Array(1 << l);
      p[0] = new i(1).toRed(this), p[1] = a;
      for (var f = 2; f < p.length; f++)
        p[f] = this.mul(p[f - 1], a);
      var w = p[0], y = 0, g = 0, d = c.bitLength() % 26;
      for (d === 0 && (d = 26), f = c.length - 1; f >= 0; f--) {
        for (var m = c.words[f], Z = d - 1; Z >= 0; Z--) {
          var J = m >> Z & 1;
          if (w !== p[0] && (w = this.sqr(w)), J === 0 && y === 0) {
            g = 0;
            continue;
          }
          y <<= 1, y |= J, g++, !(g !== l && (f !== 0 || Z !== 0)) && (w = this.mul(w, p[y]), g = 0, y = 0);
        }
        d = 26;
      }
      return w;
    }, H.prototype.convertTo = function(a) {
      var c = a.umod(this.m);
      return c === a ? c.clone() : c;
    }, H.prototype.convertFrom = function(a) {
      var c = a.clone();
      return c.red = null, c;
    }, i.mont = function(a) {
      return new ee(a);
    };
    function ee(b) {
      H.call(this, b), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(ee, H), ee.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, ee.prototype.convertFrom = function(a) {
      var c = this.imod(a.mul(this.rinv));
      return c.red = null, c;
    }, ee.prototype.imul = function(a, c) {
      if (a.isZero() || c.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var l = a.imul(c), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), w = f;
      return f.cmp(this.m) >= 0 ? w = f.isub(this.m) : f.cmpn(0) < 0 && (w = f.iadd(this.m)), w._forceRed(this);
    }, ee.prototype.mul = function(a, c) {
      if (a.isZero() || c.isZero())
        return new i(0)._forceRed(this);
      var l = a.mul(c), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), w = f;
      return f.cmp(this.m) >= 0 ? w = f.isub(this.m) : f.cmpn(0) < 0 && (w = f.iadd(this.m)), w._forceRed(this);
    }, ee.prototype.invm = function(a) {
      var c = this.imod(a._invmp(this.m).mul(this.r2));
      return c._forceRed(this);
    };
  })(e, Ee);
})(Gi);
var ud = Gi.exports;
const Mr = /* @__PURE__ */ id(ud);
var pc = 9, mc = 3, Ai = 9;
function dd(e, t) {
  const { precision: n = pc, minPrecision: r = mc } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, u = s.replace(o, "$1,");
  let A = i.slice(0, n);
  if (r < n) {
    const E = A.match(/.*[1-9]{1}/), I = (E == null ? void 0 : E[0].length) || 0, _ = Math.max(r, I);
    A = A.slice(0, _);
  }
  const h = A ? `.${A}` : "";
  return `${u}${h}`;
}
var Me = class extends Mr {
  constructor(t, n, r) {
    let s = t, i = n;
    Me.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
    super(s ?? 0, i, r);
    S(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
  }
  // ANCHOR: HELPERS
  // make sure we always include `0x` in hex strings
  toString(t, n) {
    const r = super.toString(t, n);
    return t === 16 || t === "hex" ? `0x${r}` : r;
  }
  toHex(t) {
    const r = (t || 0) * 2;
    if (this.isNeg())
      throw new x(N.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new x(
        N.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new x(N.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
    return Uint8Array.from(this.toArray(void 0, t));
  }
  toJSON() {
    return this.toString(16);
  }
  valueOf() {
    return this.toString();
  }
  format(t) {
    const {
      units: n = Ai,
      precision: r = pc,
      minPrecision: s = mc
    } = t || {}, i = this.formatUnits(n), o = dd(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, u = "0"] = i.split("."), A = u.match(/[1-9]/);
      if (A && A.index && A.index + 1 > r) {
        const [h = "0"] = o.split(".");
        return `${h}.${u.slice(0, A.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = Ai) {
    const n = this.toString().slice(0, t * -1), r = this.toString().slice(t * -1), s = r.length, i = Array.from({ length: t - s }).fill("0").join("");
    return `${n ? `${n}.` : "0."}${i}${r}`;
  }
  // END ANCHOR: HELPERS
  // ANCHOR: OVERRIDES to accept better inputs
  add(t) {
    return this.caller(t, "add");
  }
  pow(t) {
    return this.caller(t, "pow");
  }
  sub(t) {
    return this.caller(t, "sub");
  }
  div(t) {
    return this.caller(t, "div");
  }
  mul(t) {
    return this.caller(t, "mul");
  }
  mod(t) {
    return this.caller(t, "mod");
  }
  divRound(t) {
    return this.caller(t, "divRound");
  }
  lt(t) {
    return this.caller(t, "lt");
  }
  lte(t) {
    return this.caller(t, "lte");
  }
  gt(t) {
    return this.caller(t, "gt");
  }
  gte(t) {
    return this.caller(t, "gte");
  }
  eq(t) {
    return this.caller(t, "eq");
  }
  cmp(t) {
    return this.caller(t, "cmp");
  }
  // END ANCHOR: OVERRIDES to accept better inputs
  // ANCHOR: OVERRIDES to output our BN type
  sqr() {
    return new Me(super.sqr().toArray());
  }
  neg() {
    return new Me(super.neg().toArray());
  }
  abs() {
    return new Me(super.abs().toArray());
  }
  toTwos(t) {
    return new Me(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new Me(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, n) {
    const r = super[n](new Me(t));
    return Me.isBN(r) ? new Me(r.toArray()) : r;
  }
  clone() {
    return new Me(this.toArray());
  }
  mulTo(t, n) {
    const r = new Mr(this.toArray()).mulTo(t, n);
    return new Me(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new Mr(this.toArray()).egcd(t);
    return {
      a: new Me(n.toArray()),
      b: new Me(r.toArray()),
      gcd: new Me(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new Mr(this.toArray()).divmod(new Me(t), n, r);
    return {
      div: new Me(s == null ? void 0 : s.toArray()),
      mod: new Me(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Me(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Me(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, B = (e, t, n) => new Me(e, t, n);
B.parseUnits = (e, t = Ai) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new x(
      N.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const u = `${r.replaceAll(",", "")}${o.join("")}`;
  return B(u);
};
function sn(e) {
  return B(e).toNumber();
}
function Xi(e, t) {
  return B(e).toHex(t);
}
function Wt(e, t) {
  return B(e).toBytes(t);
}
function Uw(e, t) {
  return B(e).formatUnits(t);
}
function Gw(e, t) {
  return B(e).format(t);
}
function Xw(...e) {
  return e.reduce((t, n) => B(n).gt(t) ? B(n) : t, B(0));
}
function zw(...e) {
  return B(Math.ceil(e.reduce((t, n) => B(t).mul(n), B(1)).toNumber()));
}
var Ad = Object.defineProperty, ld = (e, t, n) => t in e ? Ad(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, fd = (e, t, n) => (ld(e, typeof t != "symbol" ? t + "" : t, n), n), Yw = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, wc = (e, t) => {
  const n = [];
  for (let u = 0; u < e.length; u += t) {
    const A = new Uint8Array(t);
    A.set(e.slice(u, u + t)), n.push(A);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, z = (e, t, n = !0) => {
  if (e instanceof Uint8Array)
    return n ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const i = new Uint8Array((e.length - 2) / 2);
    let o = 2;
    for (let u = 0; u < i.length; u++)
      i[u] = parseInt(e.substring(o, o + 2), 16), o += 2;
    return i;
  }
  const s = `invalid data:${t ? ` ${t} -` : ""} ${e}
If you are attempting to transform a hex value, please make sure it is being passed as a string and wrapped in quotes.`;
  throw new x(N.INVALID_DATA, s);
}, ws = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, ie = (e) => {
  const t = e.map((n) => z(n));
  return ws(t);
}, Vo = "0123456789abcdef";
function V(e) {
  const t = z(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Vo[(s & 240) >> 4] + Vo[s & 15];
  }
  return n;
}
var Vw = (e) => {
  const n = [
    (r) => r.replace(/\s+/g, "-"),
    // spaces to -
    (r) => r.replace(/\./g, "-"),
    // dots to -
    (r) => r.replace(/_/g, "-"),
    // underscore to -
    (r) => r.replace(/-[a-z]/g, (s) => s.slice(-1).toUpperCase()),
    // delete '-' and capitalize the letter after them
    (r) => r.replace(/-/g, ""),
    // delete any '-' left
    (r) => r.replace(/^\d+/, ""),
    // removes leading digits
    (r) => r[0].toUpperCase() + r.slice(1)
    // capitalize first letter
  ].reduce((r, s) => s(r), e);
  if (n === "") {
    const r = `The provided string '${e}' results in an empty output after`.concat(
      " normalization, therefore, it can't normalize string."
    );
    throw new x(N.PARSE_FAILED, r);
  }
  return n;
}, hd = 37, yc = BigInt(2 ** 62) + BigInt(hd), gd = (e) => Math.floor(e / 1e3), Ic = (e) => e * 1e3, pd = (e) => Number(BigInt(e) - yc), md = (e) => String(BigInt(e) + yc), wd = (e) => Ic(pd(e)), Hr = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Hr(wd(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Hr(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Hr(Ic(e));
  }
  /**
   * Hide the constructor to prevent direct instantiation.
   */
  constructor(e) {
    super(e);
  }
  /**
   * Returns the Tai64 timestamp.
   *
   * @returns the Tai64 timestamp
   */
  toTai64() {
    return md(this.toUnixSeconds());
  }
  /**
   * @returns the unix milliseconds timestamp
   */
  toUnixMilliseconds() {
    return this.getTime();
  }
  /**
   * @returns the unix seconds timestamp
   */
  toUnixSeconds() {
    return gd(this.getTime());
  }
}, zi = Hr;
fd(zi, "TAI64_NULL", "");
var yd = {
  chain_name: "local_testnet",
  consensus_parameters: {
    V1: {
      tx_params: {
        V1: {
          max_inputs: 255,
          max_outputs: 255,
          max_witnesses: 255,
          max_gas_per_tx: 1e8,
          max_size: 262144,
          max_bytecode_subsections: 256
        }
      },
      predicate_params: {
        V1: {
          max_predicate_length: 102400,
          max_predicate_data_length: 102400,
          max_message_data_length: 102400,
          max_gas_per_predicate: 1e8
        }
      },
      script_params: {
        V1: {
          max_script_length: 102400,
          max_script_data_length: 102400
        }
      },
      contract_params: {
        V1: {
          contract_max_size: 262144,
          max_storage_slots: 1760
        }
      },
      fee_params: {
        V1: {
          gas_price_factor: 92,
          gas_per_byte: 63
        }
      },
      chain_id: 0,
      gas_costs: {
        V1: {
          add: 2,
          addi: 2,
          aloc: 2,
          and: 2,
          andi: 2,
          bal: 86,
          bhei: 2,
          bhsh: 2,
          burn: 25770,
          cb: 2,
          cfei: 2,
          cfsi: 2,
          div: 2,
          divi: 2,
          eck1: 3114,
          ecr1: 42270,
          ed19: 2878,
          eq: 2,
          exp: 2,
          expi: 2,
          flag: 1,
          gm: 2,
          gt: 2,
          gtf: 12,
          ji: 2,
          jmp: 2,
          jne: 2,
          jnei: 2,
          jnzi: 2,
          jmpf: 1,
          jmpb: 1,
          jnzf: 1,
          jnzb: 1,
          jnef: 1,
          jneb: 1,
          lb: 2,
          log: 165,
          lt: 2,
          lw: 2,
          mint: 29024,
          mlog: 2,
          mod_op: 2,
          modi: 2,
          move_op: 2,
          movi: 2,
          mroo: 4,
          mul: 2,
          muli: 2,
          mldv: 3,
          noop: 1,
          not: 2,
          or: 2,
          ori: 2,
          poph: 3,
          popl: 3,
          pshh: 4,
          pshl: 4,
          ret: 134,
          rvrt: 153,
          sb: 2,
          sll: 2,
          slli: 2,
          srl: 2,
          srli: 2,
          srw: 209,
          sub: 2,
          subi: 2,
          sw: 2,
          sww: 22501,
          time: 50,
          tr: 33912,
          tro: 24294,
          wdcm: 2,
          wqcm: 3,
          wdop: 3,
          wqop: 3,
          wdml: 3,
          wqml: 4,
          wddv: 5,
          wqdv: 6,
          wdmd: 10,
          wqmd: 17,
          wdam: 9,
          wqam: 11,
          wdmm: 10,
          wqmm: 10,
          xor: 2,
          xori: 2,
          call: {
            LightOperation: {
              base: 18190,
              units_per_gas: 5
            }
          },
          ccp: {
            LightOperation: {
              base: 48,
              units_per_gas: 22
            }
          },
          croo: {
            LightOperation: {
              base: 131,
              units_per_gas: 2
            }
          },
          csiz: {
            LightOperation: {
              base: 45,
              units_per_gas: 237
            }
          },
          k256: {
            LightOperation: {
              base: 37,
              units_per_gas: 3
            }
          },
          ldc: {
            LightOperation: {
              base: 39,
              units_per_gas: 68
            }
          },
          logd: {
            LightOperation: {
              base: 565,
              units_per_gas: 2
            }
          },
          mcl: {
            LightOperation: {
              base: 3,
              units_per_gas: 564
            }
          },
          mcli: {
            LightOperation: {
              base: 3,
              units_per_gas: 560
            }
          },
          mcp: {
            LightOperation: {
              base: 4,
              units_per_gas: 185
            }
          },
          mcpi: {
            LightOperation: {
              base: 9,
              units_per_gas: 455
            }
          },
          meq: {
            LightOperation: {
              base: 3,
              units_per_gas: 766
            }
          },
          retd: {
            LightOperation: {
              base: 485,
              units_per_gas: 3
            }
          },
          s256: {
            LightOperation: {
              base: 42,
              units_per_gas: 3
            }
          },
          scwq: {
            HeavyOperation: {
              base: 21672,
              gas_per_unit: 22146
            }
          },
          smo: {
            LightOperation: {
              base: 44437,
              units_per_gas: 1
            }
          },
          srwq: {
            HeavyOperation: {
              base: 239,
              gas_per_unit: 234
            }
          },
          swwq: {
            HeavyOperation: {
              base: 22724,
              gas_per_unit: 21231
            }
          },
          contract_root: {
            LightOperation: {
              base: 42,
              units_per_gas: 2
            }
          },
          state_root: {
            HeavyOperation: {
              base: 323,
              gas_per_unit: 169
            }
          },
          new_storage_per_byte: 63,
          vm_initialization: {
            HeavyOperation: {
              base: 5254820,
              gas_per_unit: 0
            }
          }
        }
      },
      base_asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07",
      block_gas_limit: 1e8,
      privileged_address: "0000000000000000000000000000000000000000000000000000000000000000"
    }
  },
  consensus: {
    PoA: {
      signing_key: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"
    }
  }
}, Id = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, Ed = {
  coins: [
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000001",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000002",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000003",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000004",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000005",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000006",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000007",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000008",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000009",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000010",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000011",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000012",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000013",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000014",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000015",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000016",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000017",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000018",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000019",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000020",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000021",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000022",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000023",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000024",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000025",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000026",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000027",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000028",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000029",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000030",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000031",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000032",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000033",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000034",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000035",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000036",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000037",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000038",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000039",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000040",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000041",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000042",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000043",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000044",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000045",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000046",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000047",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
      amount: 18446744073709552e3,
      asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000048",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x0000000000000000000000000000000000000000000000000000000000000049",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    }
  ],
  messages: [
    {
      sender: "0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f",
      recipient: "0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba",
      nonce: "0101010101010101010101010101010101010101010101010101010101010101",
      amount: 18446744073709552e3,
      data: "",
      da_height: 0
    },
    {
      sender: "0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba",
      recipient: "0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f",
      nonce: "0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b",
      amount: 12704439083013452e3,
      data: "",
      da_height: 0
    },
    {
      sender: "0x22cae5308938e8b4caf217b6464884f6331eff05e81468df8ccd08126effc8d0",
      recipient: "0x8d2af98a4198732a46bf65d87a73427dd7608acaad2414585d8ccdd6f59c437b",
      nonce: "0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0",
      amount: 18446744073709552e3,
      data: "",
      da_height: 0
    }
  ],
  contracts: [],
  block_height: 0,
  da_block_height: 0
}, Hw = {
  chainConfigJson: yd,
  metadataJson: Id,
  stateConfigJson: Ed
}, Zw = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function Sn(e) {
  return e !== void 0;
}
var Ec = B(0), li = B(58), is = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", Or = null;
function bd(e) {
  if (Or == null) {
    Or = {};
    for (let n = 0; n < is.length; n++)
      Or[is[n]] = B(n);
  }
  const t = Or[e];
  if (t == null)
    throw new x(N.INVALID_DATA, `invalid base58 value ${e}`);
  return B(t);
}
function bc(e) {
  const t = z(e);
  let n = B(t), r = "";
  for (; n.gt(Ec); )
    r = is[Number(n.mod(li))] + r, n = n.div(li);
  for (let s = 0; s < t.length && !t[s]; s++)
    r = is[0] + r;
  return r;
}
function Cd(e) {
  let t = Ec;
  for (let n = 0; n < e.length; n++)
    t = t.mul(li), t = t.add(bd(e[n].toString()));
  return t;
}
function Yi(e, t, n) {
  const r = z(e);
  if (n != null && n > r.length)
    throw new x(N.INVALID_DATA, "cannot slice beyond data bounds");
  return V(r.slice(t ?? 0, n ?? r.length));
}
function zn(e, t = !0) {
  let n = e;
  t && (n = e.normalize("NFC"));
  const r = [];
  for (let s = 0; s < n.length; s += 1) {
    const i = n.charCodeAt(s);
    if (i < 128)
      r.push(i);
    else if (i < 2048)
      r.push(i >> 6 | 192), r.push(i & 63 | 128);
    else if ((i & 64512) === 55296) {
      s += 1;
      const o = n.charCodeAt(s);
      if (s >= n.length || (o & 64512) !== 56320)
        throw new x(
          N.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const u = 65536 + ((i & 1023) << 10) + (o & 1023);
      r.push(u >> 18 | 240), r.push(u >> 12 & 63 | 128), r.push(u >> 6 & 63 | 128), r.push(u & 63 | 128);
    } else
      r.push(i >> 12 | 224), r.push(i >> 6 & 63 | 128), r.push(i & 63 | 128);
  }
  return new Uint8Array(r);
}
function yn(e, t, n, r, s) {
  return console.log(`invalid codepoint at offset ${t}; ${e}, bytes: ${n}`), t;
}
function Bd(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function _d(e) {
  const t = z(e, "bytes"), n = [];
  let r = 0;
  for (; r < t.length; ) {
    const s = t[r++];
    if (!(s >> 7)) {
      n.push(s);
      continue;
    }
    let i = null, o = null;
    if ((s & 224) === 192)
      i = 1, o = 127;
    else if ((s & 240) === 224)
      i = 2, o = 2047;
    else if ((s & 248) === 240)
      i = 3, o = 65535;
    else {
      (s & 192) === 128 ? r += yn("UNEXPECTED_CONTINUE", r - 1, t) : r += yn("BAD_PREFIX", r - 1, t);
      continue;
    }
    if (r - 1 + i >= t.length) {
      r += yn("OVERRUN", r - 1, t);
      continue;
    }
    let u = s & (1 << 8 - i - 1) - 1;
    for (let A = 0; A < i; A++) {
      const h = t[r];
      if ((h & 192) !== 128) {
        r += yn("MISSING_CONTINUE", r, t), u = null;
        break;
      }
      u = u << 6 | h & 63, r++;
    }
    if (u !== null) {
      if (u > 1114111) {
        r += yn("OUT_OF_RANGE", r - 1 - i, t);
        continue;
      }
      if (u >= 55296 && u <= 57343) {
        r += yn("UTF16_SURROGATE", r - 1 - i, t);
        continue;
      }
      if (u <= o) {
        r += yn("OVERLONG", r - 1 - i, t);
        continue;
      }
      n.push(u);
    }
  }
  return n;
}
function Vi(e) {
  return Bd(_d(e));
}
function _t(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function vd(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Hi(e, ...t) {
  if (!vd(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Cc(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  _t(e.outputLen), _t(e.blockLen);
}
function Yn(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Bc(e, t) {
  Hi(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Ks = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Zr = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function _c(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Wr = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Mt = (e, t) => e << 32 - t | e >>> t, xd = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!xd)
  throw new Error("Non little-endian hardware is not supported");
function Rd(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Vn(e) {
  if (typeof e == "string" && (e = Rd(e)), !_c(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function Sd(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!_c(s))
      throw new Error("Uint8Array expected");
    t += s.length;
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, s), s += i.length;
  }
  return n;
}
class Zi {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const Qd = {}.toString;
function vc(e, t) {
  if (t !== void 0 && Qd.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function ys(e) {
  const t = (r) => e().update(Vn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Nd(e = 32) {
  if (Ks && typeof Ks.getRandomValues == "function")
    return Ks.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function Dd(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), u = Number(n & i), A = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + A, o, r), e.setUint32(t + h, u, r);
}
class Wi extends Zi {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Wr(this.buffer);
  }
  update(t) {
    Yn(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Vn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const u = Math.min(s - this.pos, i - o);
      if (u === s) {
        const A = Wr(t);
        for (; s <= i - o; o += s)
          this.process(A, o);
        continue;
      }
      r.set(t.subarray(o, o + u), this.pos), this.pos += u, o += u, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Yn(this), Bc(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let I = o; I < s; I++)
      n[I] = 0;
    Dd(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const u = Wr(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = A / 4, E = this.get();
    if (h > E.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let I = 0; I < h; I++)
      u.setUint32(4 * I, E[I], i);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: u } = this;
    return t.length = s, t.pos = u, t.finished = i, t.destroyed = o, s % n && t.buffer.set(r), t;
  }
}
const Td = (e, t, n) => e & t ^ ~e & n, Fd = (e, t, n) => e & t ^ e & n ^ t & n, Md = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), jt = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), $t = /* @__PURE__ */ new Uint32Array(64);
class Od extends Wi {
  constructor() {
    super(64, 32, 8, !1), this.A = jt[0] | 0, this.B = jt[1] | 0, this.C = jt[2] | 0, this.D = jt[3] | 0, this.E = jt[4] | 0, this.F = jt[5] | 0, this.G = jt[6] | 0, this.H = jt[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: u, H: A } = this;
    return [t, n, r, s, i, o, u, A];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, u, A) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = u | 0, this.H = A | 0;
  }
  process(t, n) {
    for (let I = 0; I < 16; I++, n += 4)
      $t[I] = t.getUint32(n, !1);
    for (let I = 16; I < 64; I++) {
      const _ = $t[I - 15], v = $t[I - 2], R = Mt(_, 7) ^ Mt(_, 18) ^ _ >>> 3, C = Mt(v, 17) ^ Mt(v, 19) ^ v >>> 10;
      $t[I] = C + $t[I - 7] + R + $t[I - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: u, F: A, G: h, H: E } = this;
    for (let I = 0; I < 64; I++) {
      const _ = Mt(u, 6) ^ Mt(u, 11) ^ Mt(u, 25), v = E + _ + Td(u, A, h) + Md[I] + $t[I] | 0, C = (Mt(r, 2) ^ Mt(r, 13) ^ Mt(r, 22)) + Fd(r, s, i) | 0;
      E = h, h = A, A = u, u = o + v | 0, o = i, i = s, s = r, r = v + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, u = u + this.E | 0, A = A + this.F | 0, h = h + this.G | 0, E = E + this.H | 0, this.set(r, s, i, o, u, A, h, E);
  }
  roundClean() {
    $t.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Nn = /* @__PURE__ */ ys(() => new Od());
class xc extends Zi {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Cc(t);
    const r = Vn(n);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(r.length > s ? t.create().update(r).digest() : r);
    for (let o = 0; o < i.length; o++)
      i[o] ^= 54;
    this.iHash.update(i), this.oHash = t.create();
    for (let o = 0; o < i.length; o++)
      i[o] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return Yn(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Yn(this), Hi(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: u } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = u, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const Is = (e, t, n) => new xc(e, t).update(n).digest();
Is.create = (e, t) => new xc(e, t);
function Ld(e, t, n, r) {
  Cc(e);
  const s = vc({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: u } = s;
  if (_t(i), _t(o), _t(u), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const A = Vn(t), h = Vn(n), E = new Uint8Array(o), I = Is.create(e, A), _ = I._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: u, DK: E, PRF: I, PRFSalt: _ };
}
function kd(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Ji(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: u, PRFSalt: A } = Ld(e, t, n, r);
  let h;
  const E = new Uint8Array(4), I = Wr(E), _ = new Uint8Array(u.outputLen);
  for (let v = 1, R = 0; R < i; v++, R += u.outputLen) {
    const C = o.subarray(R, R + u.outputLen);
    I.setInt32(0, v, !1), (h = A._cloneInto(h)).update(E).digestInto(_), C.set(_.subarray(0, C.length));
    for (let F = 1; F < s; F++) {
      u._cloneInto(h).update(_).digestInto(_);
      for (let M = 0; M < C.length; M++)
        C[M] ^= _[M];
    }
  }
  return kd(u, A, o, h, _);
}
const me = (e, t) => e << t | e >>> 32 - t;
function Ho(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], u = e[t++] ^ n[r++], A = e[t++] ^ n[r++], h = e[t++] ^ n[r++], E = e[t++] ^ n[r++], I = e[t++] ^ n[r++], _ = e[t++] ^ n[r++], v = e[t++] ^ n[r++], R = e[t++] ^ n[r++], C = e[t++] ^ n[r++], F = e[t++] ^ n[r++], M = e[t++] ^ n[r++], G = e[t++] ^ n[r++], L = e[t++] ^ n[r++], W = e[t++] ^ n[r++], O = e[t++] ^ n[r++], T = o, k = u, U = A, q = h, Y = E, H = I, ee = _, b = v, a = R, c = C, l = F, p = M, f = G, w = L, y = W, g = O;
  for (let d = 0; d < 8; d += 2)
    Y ^= me(T + f | 0, 7), a ^= me(Y + T | 0, 9), f ^= me(a + Y | 0, 13), T ^= me(f + a | 0, 18), c ^= me(H + k | 0, 7), w ^= me(c + H | 0, 9), k ^= me(w + c | 0, 13), H ^= me(k + w | 0, 18), y ^= me(l + ee | 0, 7), U ^= me(y + l | 0, 9), ee ^= me(U + y | 0, 13), l ^= me(ee + U | 0, 18), q ^= me(g + p | 0, 7), b ^= me(q + g | 0, 9), p ^= me(b + q | 0, 13), g ^= me(p + b | 0, 18), k ^= me(T + q | 0, 7), U ^= me(k + T | 0, 9), q ^= me(U + k | 0, 13), T ^= me(q + U | 0, 18), ee ^= me(H + Y | 0, 7), b ^= me(ee + H | 0, 9), Y ^= me(b + ee | 0, 13), H ^= me(Y + b | 0, 18), p ^= me(l + c | 0, 7), a ^= me(p + l | 0, 9), c ^= me(a + p | 0, 13), l ^= me(c + a | 0, 18), f ^= me(g + y | 0, 7), w ^= me(f + g | 0, 9), y ^= me(w + f | 0, 13), g ^= me(y + w | 0, 18);
  s[i++] = o + T | 0, s[i++] = u + k | 0, s[i++] = A + U | 0, s[i++] = h + q | 0, s[i++] = E + Y | 0, s[i++] = I + H | 0, s[i++] = _ + ee | 0, s[i++] = v + b | 0, s[i++] = R + a | 0, s[i++] = C + c | 0, s[i++] = F + l | 0, s[i++] = M + p | 0, s[i++] = G + f | 0, s[i++] = L + w | 0, s[i++] = W + y | 0, s[i++] = O + g | 0;
}
function ei(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let u = 0; u < 16; u++)
    n[o + u] = e[t + (2 * s - 1) * 16 + u];
  for (let u = 0; u < s; u++, i += 16, t += 16)
    Ho(n, o, e, t, n, i), u > 0 && (o += 16), Ho(n, i, e, t += 16, n, o);
}
function Pd(e, t, n) {
  const r = vc({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: u, asyncTick: A, maxmem: h, onProgress: E } = r;
  if (_t(s), _t(i), _t(o), _t(u), _t(A), _t(h), E !== void 0 && typeof E != "function")
    throw new Error("progressCb should be function");
  const I = 128 * i, _ = I / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (I / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / I)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (u < 0 || u > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const v = I * (s + o);
  if (v > h)
    throw new Error(`Scrypt: parameters too large, ${v} (128 * r * (N + p)) > ${h} (maxmem)`);
  const R = Ji(Nn, e, t, { c: 1, dkLen: I * o }), C = Zr(R), F = Zr(new Uint8Array(I * s)), M = Zr(new Uint8Array(I));
  let G = () => {
  };
  if (E) {
    const L = 2 * s * o, W = Math.max(Math.floor(L / 1e4), 1);
    let O = 0;
    G = () => {
      O++, E && (!(O % W) || O === L) && E(O / L);
    };
  }
  return { N: s, r: i, p: o, dkLen: u, blockSize32: _, V: F, B32: C, B: R, tmp: M, blockMixCb: G, asyncTick: A };
}
function Ud(e, t, n, r, s) {
  const i = Ji(Nn, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function Gd(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: u, V: A, B32: h, B: E, tmp: I, blockMixCb: _ } = Pd(e, t, n);
  for (let v = 0; v < i; v++) {
    const R = u * v;
    for (let C = 0; C < u; C++)
      A[C] = h[R + C];
    for (let C = 0, F = 0; C < r - 1; C++)
      ei(A, F, A, F += u, s), _();
    ei(A, (r - 1) * u, h, R, s), _();
    for (let C = 0; C < r; C++) {
      const F = h[R + u - 16] % r;
      for (let M = 0; M < u; M++)
        I[M] = h[R + M] ^ A[F * u + M];
      ei(I, 0, h, R, s), _();
    }
  }
  return Ud(e, o, E, A, I);
}
const Lr = /* @__PURE__ */ BigInt(2 ** 32 - 1), fi = /* @__PURE__ */ BigInt(32);
function Rc(e, t = !1) {
  return t ? { h: Number(e & Lr), l: Number(e >> fi & Lr) } : { h: Number(e >> fi & Lr) | 0, l: Number(e & Lr) | 0 };
}
function Sc(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = Rc(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const Xd = (e, t) => BigInt(e >>> 0) << fi | BigInt(t >>> 0), zd = (e, t, n) => e >>> n, Yd = (e, t, n) => e << 32 - n | t >>> n, Vd = (e, t, n) => e >>> n | t << 32 - n, Hd = (e, t, n) => e << 32 - n | t >>> n, Zd = (e, t, n) => e << 64 - n | t >>> n - 32, Wd = (e, t, n) => e >>> n - 32 | t << 64 - n, Jd = (e, t) => t, qd = (e, t) => e, Qc = (e, t, n) => e << n | t >>> 32 - n, Nc = (e, t, n) => t << n | e >>> 32 - n, Dc = (e, t, n) => t << n - 32 | e >>> 64 - n, Tc = (e, t, n) => e << n - 32 | t >>> 64 - n;
function jd(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const $d = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), Kd = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, eA = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), tA = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, nA = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), rA = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, le = {
  fromBig: Rc,
  split: Sc,
  toBig: Xd,
  shrSH: zd,
  shrSL: Yd,
  rotrSH: Vd,
  rotrSL: Hd,
  rotrBH: Zd,
  rotrBL: Wd,
  rotr32H: Jd,
  rotr32L: qd,
  rotlSH: Qc,
  rotlSL: Nc,
  rotlBH: Dc,
  rotlBL: Tc,
  add: jd,
  add3L: $d,
  add3H: Kd,
  add4L: eA,
  add4H: tA,
  add5H: rA,
  add5L: nA
}, [Fc, Mc, Oc] = [[], [], []], sA = /* @__PURE__ */ BigInt(0), sr = /* @__PURE__ */ BigInt(1), iA = /* @__PURE__ */ BigInt(2), oA = /* @__PURE__ */ BigInt(7), aA = /* @__PURE__ */ BigInt(256), cA = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = sr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Fc.push(2 * (5 * r + n)), Mc.push((e + 1) * (e + 2) / 2 % 64);
  let s = sA;
  for (let i = 0; i < 7; i++)
    t = (t << sr ^ (t >> oA) * cA) % aA, t & iA && (s ^= sr << (sr << /* @__PURE__ */ BigInt(i)) - sr);
  Oc.push(s);
}
const [uA, dA] = /* @__PURE__ */ Sc(Oc, !0), Zo = (e, t, n) => n > 32 ? Dc(e, t, n) : Qc(e, t, n), Wo = (e, t, n) => n > 32 ? Tc(e, t, n) : Nc(e, t, n);
function AA(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const u = (o + 8) % 10, A = (o + 2) % 10, h = n[A], E = n[A + 1], I = Zo(h, E, 1) ^ n[u], _ = Wo(h, E, 1) ^ n[u + 1];
      for (let v = 0; v < 50; v += 10)
        e[o + v] ^= I, e[o + v + 1] ^= _;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const u = Mc[o], A = Zo(s, i, u), h = Wo(s, i, u), E = Fc[o];
      s = e[E], i = e[E + 1], e[E] = A, e[E + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let u = 0; u < 10; u++)
        n[u] = e[o + u];
      for (let u = 0; u < 10; u++)
        e[o + u] ^= ~n[(u + 2) % 10] & n[(u + 4) % 10];
    }
    e[0] ^= uA[r], e[1] ^= dA[r];
  }
  n.fill(0);
}
class qi extends Zi {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, _t(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Zr(this.state);
  }
  keccak() {
    AA(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Yn(this);
    const { blockLen: n, state: r } = this;
    t = Vn(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(n - this.pos, s - i);
      for (let u = 0; u < o; u++)
        r[this.pos++] ^= t[i++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: n, pos: r, blockLen: s } = this;
    t[r] ^= n, n & 128 && r === s - 1 && this.keccak(), t[s - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    Yn(this, !1), Hi(t), this.finish();
    const n = this.state, { blockLen: r } = this;
    for (let s = 0, i = t.length; s < i; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, i - s);
      t.set(n.subarray(this.posOut, this.posOut + o), s), this.posOut += o, s += o;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return _t(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (Bc(t, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(t) {
    const { blockLen: n, suffix: r, outputLen: s, rounds: i, enableXOF: o } = this;
    return t || (t = new qi(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const lA = (e, t, n) => ys(() => new qi(t, e, n)), fA = /* @__PURE__ */ lA(1, 136, 256 / 8), hA = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), Lc = /* @__PURE__ */ Uint8Array.from({ length: 16 }, (e, t) => t), gA = /* @__PURE__ */ Lc.map((e) => (9 * e + 5) % 16);
let ji = [Lc], $i = [gA];
for (let e = 0; e < 4; e++)
  for (let t of [ji, $i])
    t.push(t[e].map((n) => hA[n]));
const kc = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), pA = /* @__PURE__ */ ji.map((e, t) => e.map((n) => kc[t][n])), mA = /* @__PURE__ */ $i.map((e, t) => e.map((n) => kc[t][n])), wA = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), yA = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]), kr = (e, t) => e << t | e >>> 32 - t;
function Jo(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const Pr = /* @__PURE__ */ new Uint32Array(16);
class IA extends Wi {
  constructor() {
    super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
  }
  get() {
    const { h0: t, h1: n, h2: r, h3: s, h4: i } = this;
    return [t, n, r, s, i];
  }
  set(t, n, r, s, i) {
    this.h0 = t | 0, this.h1 = n | 0, this.h2 = r | 0, this.h3 = s | 0, this.h4 = i | 0;
  }
  process(t, n) {
    for (let v = 0; v < 16; v++, n += 4)
      Pr[v] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, u = this.h2 | 0, A = u, h = this.h3 | 0, E = h, I = this.h4 | 0, _ = I;
    for (let v = 0; v < 5; v++) {
      const R = 4 - v, C = wA[v], F = yA[v], M = ji[v], G = $i[v], L = pA[v], W = mA[v];
      for (let O = 0; O < 16; O++) {
        const T = kr(r + Jo(v, i, u, h) + Pr[M[O]] + C, L[O]) + I | 0;
        r = I, I = h, h = kr(u, 10) | 0, u = i, i = T;
      }
      for (let O = 0; O < 16; O++) {
        const T = kr(s + Jo(R, o, A, E) + Pr[G[O]] + F, W[O]) + _ | 0;
        s = _, _ = E, E = kr(A, 10) | 0, A = o, o = T;
      }
    }
    this.set(this.h1 + u + E | 0, this.h2 + h + _ | 0, this.h3 + I + s | 0, this.h4 + r + o | 0, this.h0 + i + A | 0);
  }
  roundClean() {
    Pr.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const EA = /* @__PURE__ */ ys(() => new IA()), [bA, CA] = le.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((e) => BigInt(e))), Kt = /* @__PURE__ */ new Uint32Array(80), en = /* @__PURE__ */ new Uint32Array(80);
class BA extends Wi {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: u, Dl: A, Eh: h, El: E, Fh: I, Fl: _, Gh: v, Gl: R, Hh: C, Hl: F } = this;
    return [t, n, r, s, i, o, u, A, h, E, I, _, v, R, C, F];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, u, A, h, E, I, _, v, R, C, F) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = u | 0, this.Dl = A | 0, this.Eh = h | 0, this.El = E | 0, this.Fh = I | 0, this.Fl = _ | 0, this.Gh = v | 0, this.Gl = R | 0, this.Hh = C | 0, this.Hl = F | 0;
  }
  process(t, n) {
    for (let L = 0; L < 16; L++, n += 4)
      Kt[L] = t.getUint32(n), en[L] = t.getUint32(n += 4);
    for (let L = 16; L < 80; L++) {
      const W = Kt[L - 15] | 0, O = en[L - 15] | 0, T = le.rotrSH(W, O, 1) ^ le.rotrSH(W, O, 8) ^ le.shrSH(W, O, 7), k = le.rotrSL(W, O, 1) ^ le.rotrSL(W, O, 8) ^ le.shrSL(W, O, 7), U = Kt[L - 2] | 0, q = en[L - 2] | 0, Y = le.rotrSH(U, q, 19) ^ le.rotrBH(U, q, 61) ^ le.shrSH(U, q, 6), H = le.rotrSL(U, q, 19) ^ le.rotrBL(U, q, 61) ^ le.shrSL(U, q, 6), ee = le.add4L(k, H, en[L - 7], en[L - 16]), b = le.add4H(ee, T, Y, Kt[L - 7], Kt[L - 16]);
      Kt[L] = b | 0, en[L] = ee | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: u, Cl: A, Dh: h, Dl: E, Eh: I, El: _, Fh: v, Fl: R, Gh: C, Gl: F, Hh: M, Hl: G } = this;
    for (let L = 0; L < 80; L++) {
      const W = le.rotrSH(I, _, 14) ^ le.rotrSH(I, _, 18) ^ le.rotrBH(I, _, 41), O = le.rotrSL(I, _, 14) ^ le.rotrSL(I, _, 18) ^ le.rotrBL(I, _, 41), T = I & v ^ ~I & C, k = _ & R ^ ~_ & F, U = le.add5L(G, O, k, CA[L], en[L]), q = le.add5H(U, M, W, T, bA[L], Kt[L]), Y = U | 0, H = le.rotrSH(r, s, 28) ^ le.rotrBH(r, s, 34) ^ le.rotrBH(r, s, 39), ee = le.rotrSL(r, s, 28) ^ le.rotrBL(r, s, 34) ^ le.rotrBL(r, s, 39), b = r & i ^ r & u ^ i & u, a = s & o ^ s & A ^ o & A;
      M = C | 0, G = F | 0, C = v | 0, F = R | 0, v = I | 0, R = _ | 0, { h: I, l: _ } = le.add(h | 0, E | 0, q | 0, Y | 0), h = u | 0, E = A | 0, u = i | 0, A = o | 0, i = r | 0, o = s | 0;
      const c = le.add3L(Y, ee, a);
      r = le.add3H(c, q, H, b), s = c | 0;
    }
    ({ h: r, l: s } = le.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = le.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: u, l: A } = le.add(this.Ch | 0, this.Cl | 0, u | 0, A | 0), { h, l: E } = le.add(this.Dh | 0, this.Dl | 0, h | 0, E | 0), { h: I, l: _ } = le.add(this.Eh | 0, this.El | 0, I | 0, _ | 0), { h: v, l: R } = le.add(this.Fh | 0, this.Fl | 0, v | 0, R | 0), { h: C, l: F } = le.add(this.Gh | 0, this.Gl | 0, C | 0, F | 0), { h: M, l: G } = le.add(this.Hh | 0, this.Hl | 0, M | 0, G | 0), this.set(r, s, i, o, u, A, h, E, I, _, v, R, C, F, M, G);
  }
  roundClean() {
    Kt.fill(0), en.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Pc = /* @__PURE__ */ ys(() => new BA());
var _A = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return Gd(t, n, { N: r, r: i, p: s, dkLen: o });
}, vA = (e) => fA(e), Uc = !1, Gc = (e) => EA(e), Xc = Gc;
function vr(e) {
  const t = z(e, "data");
  return Xc(t);
}
vr._ = Gc;
vr.lock = () => {
  Uc = !0;
};
vr.register = (e) => {
  if (Uc)
    throw new x(N.HASHER_LOCKED, "ripemd160 is locked");
  Xc = e;
};
Object.freeze(vr);
var kn = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextEncoder().encode(e);
    case "base64": {
      const n = atob(e), r = n.length;
      return new Uint8Array(r).map((i, o) => n.charCodeAt(o));
    }
    case "hex":
    default: {
      const n = e.length / 2;
      return new Uint8Array(n).map((s, i) => {
        const o = i * 2;
        return parseInt(e.substring(o, o + 2), 16);
      });
    }
  }
}, zc = (e, t, n, r, s) => {
  const i = { sha256: Nn, sha512: Pc }[s];
  return V(Ji(i, e, t, { c: n, dkLen: r }));
}, { crypto: Es, btoa: Yc } = globalThis;
if (!Es)
  throw new x(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!Yc)
  throw new x(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var hi = (e) => Es.getRandomValues(new Uint8Array(e)), Jr = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return Yc(n);
    }
    case "hex":
    default: {
      let n = "";
      for (let r = 0; r < e.length; r += 1) {
        const s = e[r].toString(16);
        n += s.length === 1 ? `0${s}` : s;
      }
      return n;
    }
  }
}, Vc = "AES-CTR", Ki = (e, t) => {
  const n = kn(String(e).normalize("NFKC"), "utf-8"), r = zc(n, t, 1e5, 32, "sha256");
  return z(r);
}, xA = async (e, t) => {
  const n = hi(16), r = hi(32), s = Ki(e, r), i = JSON.stringify(t), o = kn(i, "utf-8"), u = {
    name: Vc,
    counter: n,
    length: 64
  }, A = await crypto.subtle.importKey("raw", s, u, !1, ["encrypt"]), h = await crypto.subtle.encrypt(u, A, o);
  return {
    data: Jr(h),
    iv: Jr(n),
    salt: Jr(r)
  };
}, RA = async (e, t) => {
  const n = kn(t.iv), r = kn(t.salt), s = Ki(e, r), i = kn(t.data), o = {
    name: Vc,
    counter: n,
    length: 64
  }, u = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), A = await crypto.subtle.decrypt(o, u, i), h = new TextDecoder().decode(A);
  try {
    return JSON.parse(h);
  } catch {
    throw new x(N.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, SA = async (e, t, n) => {
  const r = Es.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, u = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), A = await r.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    u,
    o
  );
  return new Uint8Array(A);
}, QA = async (e, t, n) => {
  const r = Es.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, u = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), A = await r.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    u,
    o
  );
  return new Uint8Array(A);
}, NA = (e, t, n) => {
  const r = e === "sha256" ? Nn : Pc, s = Is.create(r, t).update(n).digest();
  return V(s);
}, DA = {
  bufferFromString: kn,
  stringFromBuffer: Jr,
  decrypt: RA,
  encrypt: xA,
  keyFromPassword: Ki,
  randomBytes: hi,
  scrypt: _A,
  keccak256: vA,
  decryptJsonWalletData: QA,
  encryptJsonWalletData: SA,
  computeHmac: NA,
  pbkdf2: zc,
  ripemd160: vr
}, TA = DA, {
  bufferFromString: dn,
  decrypt: FA,
  encrypt: MA,
  keyFromPassword: Ww,
  randomBytes: Ut,
  stringFromBuffer: cr,
  scrypt: Hc,
  keccak256: Zc,
  decryptJsonWalletData: OA,
  encryptJsonWalletData: LA,
  pbkdf2: kA,
  computeHmac: Wc,
  ripemd160: PA
} = TA;
function mt(e) {
  return V(Nn(z(e)));
}
function Jt(e) {
  return mt(e);
}
function UA(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function GA(e) {
  return Jt(dn(e, "utf-8"));
}
var XA = Object.defineProperty, zA = (e, t, n) => t in e ? XA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, eo = (e, t, n) => (zA(e, typeof t != "symbol" ? t + "" : t, n), n), ce = class {
  constructor(e, t, n) {
    S(this, "name");
    S(this, "type");
    S(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, YA = "u8", VA = "u16", HA = "u32", ZA = "u64", WA = "u256", JA = "raw untyped ptr", qA = "raw untyped slice", jA = "bool", $A = "b256", KA = "struct B512", gr = "enum Option", el = "struct Vec", tl = "struct Bytes", nl = "struct String", rl = "str", Jc = /str\[(?<length>[0-9]+)\]/, gi = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, qc = /^struct (?<name>\w+)$/, jc = /^enum (?<name>\w+)$/, sl = /^\((?<items>.*)\)$/, il = /^generic (?<name>\w+)$/, os = "1", ge = 8, fn = 32, pi = fn + 2, as = fn, ol = fn, al = fn, cl = ge * 4, ul = ge * 2, $c = 2 ** 32 - 1, Kc = ({ maxInputs: e }) => fn + // Tx ID
as + // Base asset ID
// Asset ID/Balance coin input pairs
e * (as + ge) + ge, e0 = ge + // Identifier
ge + // Gas limit
ge + // Script size
ge + // Script data size
ge + // Policies
ge + // Inputs size
ge + // Outputs size
ge + // Witnesses size
fn, Jw = ge + // Identifier
cl + // Utxo Length
ge + // Output Index
al + // Owner
ge + // Amount
as + // Asset id
ul + // TxPointer
ge + // Witnesses index
ge + // Predicate size
ge + // Predicate data size
ge, qo = (e) => e instanceof Uint8Array, er = (e) => {
  const t = Array.isArray(e) ? e : Object.values(e);
  for (const n of t)
    if (n.type === gr || "coder" in n && n.coder.type === gr || "coders" in n && er(n.coders))
      return !0;
  return !1;
}, br, ac, we = (ac = class extends ce {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    S(this, "coder");
    S(this, "length");
    vt(this, br, void 0);
    this.coder = t, this.length = n, Ft(this, br, er([t]));
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new x(N.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new x(N.ENCODE_ERROR, "Types/values length mismatch.");
    return ie(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (!Fe(this, br) && t.length < this.encodedLength || t.length > $c)
      throw new x(N.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, br = new WeakMap(), ac), X = class extends ce {
  constructor() {
    super("b256", "b256", ge * 4);
  }
  encode(e) {
    let t;
    try {
      t = z(e);
    } catch {
      throw new x(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new x(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (B(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid b256 byte data size.");
    return [Xi(n, 32), t + 32];
  }
}, dl = class extends ce {
  constructor() {
    super("b512", "struct B512", ge * 8);
  }
  encode(e) {
    let t;
    try {
      t = z(e);
    } catch {
      throw new x(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new x(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (B(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid b512 byte data size.");
    return [Xi(n, this.encodedLength), t + this.encodedLength];
  }
}, Al = {
  u64: ge,
  u256: ge * 4
}, D = class extends ce {
  constructor(e) {
    super("bigNumber", e, Al[e]);
  }
  encode(e) {
    let t;
    try {
      t = Wt(e, this.encodedLength);
    } catch {
      throw new x(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new x(N.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [B(n), t + this.encodedLength];
  }
}, ll = class extends ce {
  constructor(t = {
    padToWordSize: !1
  }) {
    const n = t.padToWordSize ? ge : 1;
    super("boolean", "boolean", n);
    S(this, "options");
    this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new x(N.ENCODE_ERROR, "Invalid boolean value.");
    return Wt(t ? 1 : 0, this.encodedLength);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid boolean data size.");
    const r = B(t.slice(n, n + this.encodedLength));
    if (r.isZero())
      return [!1, n + this.encodedLength];
    if (!r.eq(B(1)))
      throw new x(N.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.encodedLength];
  }
}, t0 = class extends ce {
  constructor() {
    super("struct", "struct Bytes", ge);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), n = new D("u64").encode(t.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < ge)
      throw new x(N.DECODE_ERROR, "Invalid byte data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(N.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
eo(t0, "memorySize", 1);
var fl = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), vn, Cr, Gn, ps, r0, ms, s0, cc, n0 = (cc = class extends ce {
  constructor(t, n) {
    const r = new D("u64"), s = Object.values(n).reduce(
      (i, o) => Math.min(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    vt(this, ps);
    vt(this, ms);
    S(this, "name");
    S(this, "coders");
    vt(this, vn, void 0);
    vt(this, Cr, void 0);
    vt(this, Gn, void 0);
    this.name = t, this.coders = n, Ft(this, vn, r), Ft(this, Cr, s), Ft(this, Gn, !(this.type === gr || er(n)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return $s(this, ps, r0).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new x(N.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new x(N.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]);
    return new Uint8Array([...Fe(this, vn).encode(i), ...o]);
  }
  decode(t, n) {
    if (Fe(this, Gn) && t.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid enum data size.");
    const r = new D("u64").decode(t, n)[0], s = sn(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new x(
        N.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], u = n + Fe(this, vn).encodedLength;
    if (Fe(this, Gn) && t.length < u + o.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid enum data size.");
    const [A, h] = o.decode(t, u);
    return fl(this.coders) ? $s(this, ms, s0).call(this, i, h) : [{ [i]: A }, h];
  }
}, vn = new WeakMap(), Cr = new WeakMap(), Gn = new WeakMap(), ps = new WeakSet(), r0 = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Fe(this, Cr) - n.encodedLength);
  return ie([Fe(this, vn).encode(s), i, r]);
}, ms = new WeakSet(), s0 = function(t, n) {
  return [t, n];
}, cc), hl = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new x(N.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, $ = class extends ce {
  constructor(t, n = {
    padToWordSize: !1
  }) {
    const r = n.padToWordSize ? ge : hl(t);
    super("number", t, r);
    S(this, "baseType");
    S(this, "options");
    this.baseType = t, this.options = n;
  }
  encode(t) {
    let n;
    try {
      n = Wt(t);
    } catch {
      throw new x(N.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.encodedLength)
      throw new x(N.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Wt(n, this.encodedLength);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid number byte data size.");
    return [sn(r), n + this.encodedLength];
  }
}, i0 = class extends n0 {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    const [n, r] = super.decode(e, t);
    return [this.toOption(n), r];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, gl = class extends ce {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ge);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new x(N.ENCODE_ERROR, "Expected array value.");
    const n = new we(new $("u8"), e.length).encode(e), r = new D("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(N.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new we(new $("u8"), s), [u] = o.decode(i, 0);
    return [u, n + s];
  }
}, to = class extends ce {
  constructor() {
    super("struct", "struct String", ge);
  }
  encode(e) {
    const t = zn(e), n = new D("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid std string data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(N.DECODE_ERROR, "Invalid std string byte data size.");
    return [Vi(i), n + s];
  }
};
eo(to, "memorySize", 1);
var o0 = class extends ce {
  constructor() {
    super("strSlice", "str", ge);
  }
  encode(e) {
    const t = zn(e), n = new D("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid string slice data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(N.DECODE_ERROR, "Invalid string slice byte data size.");
    return [Vi(i), n + s];
  }
};
eo(o0, "memorySize", 1);
var pl = class extends ce {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new x(N.ENCODE_ERROR, "Value length mismatch during encode.");
    return zn(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid string byte data size.");
    return [Vi(n), t + this.encodedLength];
  }
}, Br, uc, bs = (uc = class extends ce {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    S(this, "name");
    S(this, "coders");
    vt(this, Br, void 0);
    this.name = t, this.coders = n, Ft(this, Br, er(n));
  }
  encode(t) {
    return ws(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof i0) && s == null)
          throw new x(
            N.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (!Fe(this, Br) && t.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const u = this.coders[o];
      let A;
      return [A, r] = u.decode(t, r), i[o] = A, i;
    }, {}), r];
  }
}, Br = new WeakMap(), uc), _r, dc, a0 = (dc = class extends ce {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    S(this, "coders");
    vt(this, _r, void 0);
    this.coders = t, Ft(this, _r, er(t));
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new x(N.ENCODE_ERROR, "Types/values length mismatch.");
    return ws(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (!Fe(this, _r) && t.length < this.encodedLength)
      throw new x(N.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, _r = new WeakMap(), dc), Xn, Ac, ml = (Ac = class extends ce {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + ge);
    S(this, "coder");
    vt(this, Xn, void 0);
    this.coder = t, Ft(this, Xn, er([t]));
  }
  encode(t) {
    if (!Array.isArray(t) && !qo(t))
      throw new x(
        N.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = new D("u64");
    if (qo(t))
      return new Uint8Array([...n.encode(t.length), ...t]);
    const r = t.map((i) => this.coder.encode(i)), s = n.encode(t.length);
    return new Uint8Array([...s, ...ws(r)]);
  }
  decode(t, n) {
    if (!Fe(this, Xn) && t.length < this.encodedLength || t.length > $c)
      throw new x(N.DECODE_ERROR, "Invalid vec data size.");
    const r = n + ge, s = t.slice(n, r), i = B(new D("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, u = t.slice(r, r + o);
    if (!Fe(this, Xn) && u.length !== o)
      throw new x(N.DECODE_ERROR, "Invalid vec byte data size.");
    let A = r;
    const h = [];
    for (let E = 0; E < i; E++) {
      const [I, _] = this.coder.decode(t, A);
      h.push(I), A = _;
    }
    return [h, A];
  }
}, Xn = new WeakMap(), Ac), c0 = (e) => {
  switch (e) {
    case void 0:
    case os:
      return os;
    default:
      throw new x(
        N.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, wl = (e, t) => {
  const n = e.functions.find((r) => r.name === t);
  if (!n)
    throw new x(
      N.FUNCTION_NOT_FOUND,
      `Function with name '${t}' doesn't exist in the ABI`
    );
  return n;
}, xn = (e, t) => {
  const n = e.types.find((r) => r.typeId === t);
  if (!n)
    throw new x(
      N.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return n;
}, jo = (e, t) => t.filter((n) => xn(e, n.type).type !== "()"), yl = (e) => {
  var r;
  const t = e.find((s) => s.name === "buf"), n = (r = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : r[0];
  if (!t || !n)
    throw new x(
      N.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return n;
}, on = class {
  constructor(e, t) {
    S(this, "abi");
    S(this, "name");
    S(this, "type");
    S(this, "originalTypeArguments");
    S(this, "components");
    this.abi = e, this.name = t.name;
    const n = xn(e, t.type);
    if (n.type.length > 256)
      throw new x(
        N.INVALID_COMPONENT,
        `The provided ABI type is too long: ${n.type}.`
      );
    this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = on.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? on.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new on(e, o));
    const s = r.reduce(
      (o, u, A) => {
        var E;
        const h = { ...o };
        return h[u] = structuredClone(
          (E = t.typeArguments) == null ? void 0 : E[A]
        ), h;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new on(e, o));
  }
  static resolveGenericArgTypes(e, t, n) {
    return t.map((r) => {
      if (n[r.type] !== void 0)
        return {
          ...n[r.type],
          name: r.name
        };
      if (r.typeArguments)
        return {
          ...structuredClone(r),
          typeArguments: this.resolveGenericArgTypes(
            e,
            r.typeArguments,
            n
          )
        };
      const s = xn(e, r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
      return i && i.length > 0 ? {
        ...structuredClone(r),
        typeArguments: i.map((o) => n[o])
      } : r;
    });
  }
  static getImplicitGenericTypeParameters(e, t, n) {
    if (!Array.isArray(t))
      return null;
    const r = n ?? [];
    return t.forEach((s) => {
      const i = xn(e, s.type);
      if (il.test(i.type)) {
        r.push(i.typeId);
        return;
      }
      Array.isArray(s.typeArguments) && this.getImplicitGenericTypeParameters(e, s.typeArguments, r);
    }), r.length > 0 ? r : null;
  }
  getSignature() {
    const e = this.getArgSignaturePrefix(), t = this.getArgSignatureContent();
    return `${e}${t}`;
  }
  getArgSignaturePrefix() {
    return qc.test(this.type) ? "s" : gi.test(this.type) ? "a" : jc.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = Jc.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = gi.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new on(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function $o(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Tn = (e, t) => {
  var A, h, E, I, _;
  switch (e.type) {
    case YA:
    case VA:
    case HA:
      return new $(e.type);
    case ZA:
    case JA:
      return new D("u64");
    case WA:
      return new D("u256");
    case qA:
      return new gl();
    case jA:
      return new ll();
    case $A:
      return new X();
    case KA:
      return new dl();
    case tl:
      return new t0();
    case nl:
      return new to();
    case rl:
      return new o0();
  }
  const n = (A = Jc.exec(e.type)) == null ? void 0 : A.groups;
  if (n) {
    const v = parseInt(n.length, 10);
    return new pl(v);
  }
  const r = e.components, s = (h = gi.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const v = parseInt(s.length, 10), R = r[0];
    if (!R)
      throw new x(
        N.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const C = Tn(R);
    return new we(C, v);
  }
  if (e.type === el) {
    const v = yl(r), R = new on(e.abi, v), C = Tn(R);
    return new ml(C);
  }
  const i = (E = qc.exec(e.type)) == null ? void 0 : E.groups;
  if (i) {
    const v = $o(r, { getCoder: Tn });
    return new bs(i.name, v);
  }
  const o = (I = jc.exec(e.type)) == null ? void 0 : I.groups;
  if (o) {
    const v = $o(r, { getCoder: Tn });
    return e.type === gr ? new i0(o.name, v) : new n0(o.name, v);
  }
  if ((_ = sl.exec(e.type)) == null ? void 0 : _.groups) {
    const v = r.map((R) => Tn(R));
    return new a0(v);
  }
  throw new x(
    N.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function Il(e = os) {
  switch (e) {
    case os:
      return Tn;
    default:
      throw new x(
        N.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var hr = class {
  static getCoder(e, t, n = {
    padToWordSize: !1
  }) {
    const r = new on(e, t);
    return Il(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, qr = class {
  constructor(e, t) {
    S(this, "signature");
    S(this, "selector");
    S(this, "selectorBytes");
    S(this, "encoding");
    S(this, "name");
    S(this, "jsonFn");
    S(this, "attributes");
    S(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = wl(this.jsonAbi, t), this.name = t, this.signature = qr.getSignature(this.jsonAbi, this.jsonFn), this.selector = qr.getFunctionSelector(this.signature), this.selectorBytes = new to().encode(t), this.encoding = c0(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new on(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = mt(dn(e, "utf-8"));
    return B(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e) {
    qr.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const t = e.slice(), n = jo(this.jsonAbi, this.jsonFn.inputs);
    Array.isArray(e) && n.length !== e.length && (t.length = this.jsonFn.inputs.length, t.fill(void 0, e.length));
    const r = n.map(
      (s) => hr.getCoder(this.jsonAbi, s, {
        encoding: this.encoding
      })
    );
    return new a0(r).encode(t);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => xn(n, o.type)), s = r.filter(
      (o) => o.type === gr || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new x(N.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = z(e), n = jo(this.jsonAbi, this.jsonFn.inputs);
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new x(
        N.DECODE_ERROR,
        `Types/values length mismatch during decode. ${JSON.stringify({
          count: {
            types: this.jsonFn.inputs.length,
            nonEmptyInputs: n.length,
            values: t.length
          },
          value: {
            args: this.jsonFn.inputs,
            nonEmptyInputs: n,
            values: t
          }
        })}`
      );
    }
    return n.reduce(
      (s, i) => {
        const o = hr.getCoder(this.jsonAbi, i, { encoding: this.encoding }), [u, A] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, u],
          offset: s.offset + A
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (xn(this.jsonAbi, this.jsonFn.output.type).type === "()")
      return [void 0, 0];
    const n = z(e);
    return hr.getCoder(this.jsonAbi, this.jsonFn.output, {
      encoding: this.encoding
    }).decode(n, 0);
  }
  /**
   * Checks if the function is read-only i.e. it only reads from storage, does not write to it.
   *
   * @returns True if the function is read-only or pure, false otherwise.
   */
  isReadOnly() {
    const e = this.attributes.find((t) => t.name === "storage");
    return !(e != null && e.arguments.includes("write"));
  }
}, qt = class {
  constructor(e) {
    S(this, "functions");
    S(this, "configurables");
    S(this, "jsonAbi");
    S(this, "encoding");
    this.jsonAbi = e, this.encoding = c0(e.encoding), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new qr(this.jsonAbi, t.name)])
    ), this.configurables = Object.fromEntries(this.jsonAbi.configurables.map((t) => [t.name, t]));
  }
  /**
   * Returns function fragment for a dynamic input.
   * @param nameOrSignatureOrSelector - name (e.g. 'transfer'), signature (e.g. 'transfer(address,uint256)') or selector (e.g. '0x00000000a9059cbb') of the function fragment
   */
  getFunction(e) {
    const t = Object.values(this.functions).find(
      (n) => n.name === e || n.signature === e || n.selector === e
    );
    if (t !== void 0)
      return t;
    throw new x(
      N.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  decodeFunctionData(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeArguments(t);
  }
  encodeFunctionData(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).encodeArguments(t);
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t) {
    const n = this.jsonAbi.loggedTypes.find((r) => r.logId === t);
    if (!n)
      throw new x(
        N.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return hr.decode(this.jsonAbi, n.loggedType, z(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const n = this.jsonAbi.configurables.find((r) => r.name === e);
    if (!n)
      throw new x(
        N.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return hr.encode(this.jsonAbi, n.configurableType, t, {
      encoding: this.encoding
    });
  }
  getTypeById(e) {
    return xn(this.jsonAbi, e);
  }
}, qw = class {
}, El = class {
}, u0 = class {
}, d0 = class {
}, bl = class extends d0 {
}, Cl = class extends d0 {
}, pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
var Hn = pr.bech32m = pr.bech32 = void 0;
const cs = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", A0 = {};
for (let e = 0; e < cs.length; e++) {
  const t = cs.charAt(e);
  A0[t] = e;
}
function Pn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Ko(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = Pn(t) ^ r >> 5;
  }
  t = Pn(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = Pn(t) ^ r & 31;
  }
  return t;
}
function no(e, t, n, r) {
  let s = 0, i = 0;
  const o = (1 << n) - 1, u = [];
  for (let A = 0; A < e.length; ++A)
    for (s = s << t | e[A], i += t; i >= n; )
      i -= n, u.push(s >> i & o);
  if (r)
    i > 0 && u.push(s << n - i & o);
  else {
    if (i >= t)
      return "Excess padding";
    if (s << n - i & o)
      return "Non-zero padding";
  }
  return u;
}
function Bl(e) {
  return no(e, 8, 5, !0);
}
function _l(e) {
  const t = no(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function vl(e) {
  const t = no(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function l0(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, u, A) {
    if (A = A || 90, o.length + 7 + u.length > A)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let h = Ko(o);
    if (typeof h == "string")
      throw new Error(h);
    let E = o + "1";
    for (let I = 0; I < u.length; ++I) {
      const _ = u[I];
      if (_ >> 5)
        throw new Error("Non 5-bit word");
      h = Pn(h) ^ _, E += cs.charAt(_);
    }
    for (let I = 0; I < 6; ++I)
      h = Pn(h);
    h ^= t;
    for (let I = 0; I < 6; ++I) {
      const _ = h >> (5 - I) * 5 & 31;
      E += cs.charAt(_);
    }
    return E;
  }
  function r(o, u) {
    if (u = u || 90, o.length < 8)
      return o + " too short";
    if (o.length > u)
      return "Exceeds length limit";
    const A = o.toLowerCase(), h = o.toUpperCase();
    if (o !== A && o !== h)
      return "Mixed-case string " + o;
    o = A;
    const E = o.lastIndexOf("1");
    if (E === -1)
      return "No separator character for " + o;
    if (E === 0)
      return "Missing prefix for " + o;
    const I = o.slice(0, E), _ = o.slice(E + 1);
    if (_.length < 6)
      return "Data too short";
    let v = Ko(I);
    if (typeof v == "string")
      return v;
    const R = [];
    for (let C = 0; C < _.length; ++C) {
      const F = _.charAt(C), M = A0[F];
      if (M === void 0)
        return "Unknown character " + F;
      v = Pn(v) ^ M, !(C + 6 >= _.length) && R.push(M);
    }
    return v !== t ? "Invalid checksum for " + o : { prefix: I, words: R };
  }
  function s(o, u) {
    const A = r(o, u);
    if (typeof A == "object")
      return A;
  }
  function i(o, u) {
    const A = r(o, u);
    if (typeof A == "object")
      return A;
    throw new Error(A);
  }
  return {
    decodeUnsafe: s,
    decode: i,
    encode: n,
    toWords: Bl,
    fromWordsUnsafe: _l,
    fromWords: vl
  };
}
pr.bech32 = l0("bech32");
Hn = pr.bech32m = l0("bech32m");
var us = "fuel";
function ro(e) {
  return Hn.decode(e);
}
function jr(e) {
  return Hn.encode(
    us,
    Hn.toWords(z(V(e)))
  );
}
function $r(e) {
  return typeof e == "string" && e.indexOf(us + 1) === 0 && ro(e).prefix === us;
}
function mi(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function ea(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function wi(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function so(e) {
  return new Uint8Array(Hn.fromWords(ro(e).words));
}
function ta(e) {
  if (!$r(e))
    throw new x(
      x.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return V(so(e));
}
function xl(e) {
  const { words: t } = ro(e);
  return Hn.encode(us, t);
}
var ur = (e) => e instanceof u0 ? e.address : e instanceof bl ? e.id : e, Rl = () => V(Ut(32)), Sl = (e) => {
  let t;
  try {
    if (!mi(e))
      throw new x(
        x.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = so(jr(e)), t = V(t.fill(0, 0, 12));
  } catch {
    throw new x(
      x.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, Ql = (e) => {
  if (!wi(e))
    throw new x(x.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, de = class extends El {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    S(this, "bech32Address");
    if (this.bech32Address = xl(t), !$r(this.bech32Address))
      throw new x(
        x.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${t}.`
      );
  }
  /**
   * Returns the `bech32Address` property
   *
   * @returns The `bech32Address` property
   */
  toAddress() {
    return this.bech32Address;
  }
  /**
   * Converts and returns the `bech32Address` property to a 256 bit hash string
   *
   * @returns The `bech32Address` property as a 256 bit hash string
   */
  toB256() {
    return ta(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return so(this.bech32Address);
  }
  /**
   * Converts
   *
   * @returns The `bech32Address` property as a 256 bit hash string
   */
  toHexString() {
    return this.toB256();
  }
  /**
   * Converts and returns the `bech32Address` property as a string
   *
   * @returns The `bech32Address` property as a string
   */
  toString() {
    return this.bech32Address;
  }
  /**
   * Converts and returns the `bech32Address` property as a string
   *
   * @returns The `bech32Address` property as a string
   */
  toJSON() {
    return this.bech32Address;
  }
  /**
   * Clears the first 12 bytes of the `bech32Address` property and returns it as a `EvmAddress`
   *
   * @returns The `bech32Address` property as an {@link EvmAddress | `EvmAddress`}
   */
  toEvmAddress() {
    const t = ta(this.bech32Address);
    return {
      bits: Sl(t)
    };
  }
  /**
   * Wraps the `bech32Address` property and returns as an `AssetId`.
   *
   * @returns The `bech32Address` property as an {@link AssetId | `AssetId`}
   */
  toAssetId() {
    return {
      bits: this.toB256()
    };
  }
  /**
   * Returns the value of the `bech32Address` property
   *
   * @returns The value of `bech32Address` property
   */
  valueOf() {
    return this.bech32Address;
  }
  /**
   * Compares this the `bech32Address` property to another for direct equality
   *
   * @param other - Another address to compare against
   * @returns The equality of the comparison
   */
  equals(t) {
    return this.bech32Address === t.bech32Address;
  }
  /**
   * Takes a Public Key, hashes it, and creates an `Address`
   *
   * @param publicKey - A wallets public key
   * @returns A new `Address` instance
   */
  static fromPublicKey(t) {
    if (!ea(t))
      throw new x(x.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = V(Nn(z(t)));
    return new de(jr(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!mi(t))
      throw new x(
        x.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new de(jr(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(Rl());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return $r(t) ? new de(t) : this.fromB256(t);
  }
  /**
   * Takes an ambiguous string or address and creates an `Address`
   *
   * @returns a new `Address` instance
   */
  static fromAddressOrString(t) {
    return typeof t == "string" ? this.fromString(t) : t;
  }
  /**
   * Takes a dynamic string or `AbstractAddress` and creates an `Address`
   *
   * @param addressId - A string containing Bech32, B256, or Public Key
   * @throws Error - Unknown address if the format is not recognised
   * @returns A new `Address` instance
   */
  static fromDynamicInput(t) {
    if (typeof t != "string" && "toB256" in t)
      return de.fromB256(t.toB256());
    if (ea(t))
      return de.fromPublicKey(t);
    if ($r(t))
      return new de(t);
    if (mi(t))
      return de.fromB256(t);
    if (wi(t))
      return de.fromEvmAddress(t);
    throw new x(
      x.CODES.PARSE_FAILED,
      "Unknown address format: only 'Bech32', 'B256', or 'Public Key (512)' are supported."
    );
  }
  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   */
  static fromEvmAddress(t) {
    if (!wi(t))
      throw new x(
        x.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = Ql(t);
    return new de(jr(n));
  }
};
function Nl(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function f0(e) {
  return function t(n) {
    return arguments.length === 0 || Nl(n) ? t : e.apply(this, arguments);
  };
}
var Dl = /* @__PURE__ */ f0(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Tl(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function h0(e, t, n) {
  if (n || (n = new Ml()), Fl(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var u in e)
      Object.prototype.hasOwnProperty.call(e, u) && (i[u] = t ? h0(e[u], !0, n) : e[u]);
    return i;
  };
  switch (Dl(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Tl(e);
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "BigInt64Array":
    case "BigUint64Array":
      return e.slice();
    default:
      return e;
  }
}
function Fl(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var Ml = /* @__PURE__ */ function() {
  function e() {
    this.map = {}, this.length = 0;
  }
  return e.prototype.set = function(t, n) {
    const r = this.hash(t);
    let s = this.map[r];
    s || (this.map[r] = s = []), s.push([t, n]), this.length += 1;
  }, e.prototype.hash = function(t) {
    let n = [];
    for (var r in t)
      n.push(Object.prototype.toString.call(t[r]));
    return n.join();
  }, e.prototype.get = function(t) {
    if (this.length <= 180) {
      for (const s in this.map) {
        const i = this.map[s];
        for (let o = 0; o < i.length; o += 1) {
          const u = i[o];
          if (u[0] === t)
            return u[1];
        }
      }
      return;
    }
    const n = this.hash(t), r = this.map[n];
    if (r)
      for (let s = 0; s < r.length; s += 1) {
        const i = r[s];
        if (i[0] === t)
          return i[1];
      }
  }, e;
}(), Pt = /* @__PURE__ */ f0(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : h0(t, !0);
}), un, lc, be = (lc = class extends ce {
  constructor(t) {
    const n = (8 - t % 8) % 8, r = t + n;
    super(
      "ByteArray",
      // While this might sound like a [u8; N] coder it's actually not.
      // A [u8; N] coder would pad every u8 to 8 bytes which would
      // make every u8 have the same size as a u64.
      // We are packing four u8s into u64s here, avoiding this padding.
      `[u64; ${r / 4}]`,
      r
    );
    S(this, "length");
    vt(this, un, void 0);
    this.length = t, Ft(this, un, n);
  }
  encode(t) {
    const n = [], r = z(t);
    return n.push(r), Fe(this, un) && n.push(new Uint8Array(Fe(this, un))), ie(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [V(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return Fe(this, un) && ([r, s] = [null, s + Fe(this, un)]), [i, s];
  }
}, un = new WeakMap(), lc), Zn = class extends bs {
  constructor() {
    super("TxPointer", {
      blockHeight: new $("u32", { padToWordSize: !0 }),
      txIndex: new $("u16", { padToWordSize: !0 })
    });
  }
}, Ce = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Ce || {}), na = class extends ce {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.txID)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new X().encode(e.owner)), t.push(new D("u64").encode(e.amount)), t.push(new X().encode(e.assetId)), t.push(new Zn().encode(e.txPointer)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new D("u64").encode(e.predicateGasUsed)), t.push(new D("u64").encode(e.predicateLength)), t.push(new D("u64").encode(e.predicateDataLength)), t.push(new be(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new be(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new X().decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const u = n;
    [n, r] = new X().decode(e, r);
    const A = n;
    [n, r] = new Zn().decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const E = Number(n);
    [n, r] = new D("u64").decode(e, r);
    const I = n;
    [n, r] = new D("u64").decode(e, r);
    const _ = n;
    [n, r] = new D("u64").decode(e, r);
    const v = n;
    [n, r] = new be(_.toNumber()).decode(e, r);
    const R = n;
    return [n, r] = new be(v.toNumber()).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: u,
        assetId: A,
        txPointer: h,
        witnessIndex: E,
        predicateGasUsed: I,
        predicateLength: _,
        predicateDataLength: v,
        predicate: R,
        predicateData: n
      },
      r
    ];
  }
}, ds = class extends ce {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.txID)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new X().encode(e.balanceRoot)), t.push(new X().encode(e.stateRoot)), t.push(new Zn().encode(e.txPointer)), t.push(new X().encode(e.contractID)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new X().decode(e, r);
    const o = n;
    [n, r] = new X().decode(e, r);
    const u = n;
    [n, r] = new Zn().decode(e, r);
    const A = n;
    return [n, r] = new X().decode(e, r), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: o,
        stateRoot: u,
        txPointer: A,
        contractID: n
      },
      r
    ];
  }
}, mr = class extends ce {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new be(32).encode(e.sender)), t.push(new be(32).encode(e.recipient)), t.push(new be(32).encode(e.nonce)), t.push(new D("u64").encode(e.amount)), t.push(z(e.data || "0x")), mt(ie(t));
  }
  static encodeData(e) {
    const t = z(e || "0x"), n = t.length;
    return new be(n).encode(t);
  }
  encode(e) {
    const t = [], n = mr.encodeData(e.data);
    return t.push(new be(32).encode(e.sender)), t.push(new be(32).encode(e.recipient)), t.push(new D("u64").encode(e.amount)), t.push(new be(32).encode(e.nonce)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new D("u64").encode(e.predicateGasUsed)), t.push(new D("u64").encode(n.length)), t.push(new D("u64").encode(e.predicateLength)), t.push(new D("u64").encode(e.predicateDataLength)), t.push(new be(n.length).encode(n)), t.push(new be(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new be(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ie(t);
  }
  static decodeData(e) {
    const t = z(e), n = t.length, [r] = new be(n).decode(t, 0);
    return z(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new X().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new X().decode(e, r);
    const u = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = Number(n);
    [n, r] = new D("u64").decode(e, r);
    const h = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const E = n;
    [n, r] = new D("u64").decode(e, r);
    const I = n;
    [n, r] = new D("u64").decode(e, r);
    const _ = n;
    [n, r] = new be(E).decode(e, r);
    const v = n;
    [n, r] = new be(I.toNumber()).decode(e, r);
    const R = n;
    return [n, r] = new be(_.toNumber()).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: A,
        nonce: u,
        predicateGasUsed: h,
        dataLength: E,
        predicateLength: I,
        predicateDataLength: _,
        data: v,
        predicate: R,
        predicateData: n
      },
      r
    ];
  }
}, hn = class extends ce {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new na().encode(e));
        break;
      }
      case 1: {
        t.push(new ds().encode(e));
        break;
      }
      case 2: {
        t.push(new mr().encode(e));
        break;
      }
      default:
        throw new x(
          N.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new na().decode(e, r), [n, r];
      case 1:
        return [n, r] = new ds().decode(e, r), [n, r];
      case 2:
        return [n, r] = new mr().decode(e, r), [n, r];
      default:
        throw new x(
          N.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Ie = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Ie || {}), ra = class extends ce {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new X().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    return [n, r] = new X().decode(e, r), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, As = class extends ce {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new $("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new X().encode(e.balanceRoot)), t.push(new X().encode(e.stateRoot)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    [n, r] = new X().decode(e, r);
    const i = n;
    return [n, r] = new X().decode(e, r), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: n
      },
      r
    ];
  }
}, sa = class extends ce {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new X().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    return [n, r] = new X().decode(e, r), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, ia = class extends ce {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new X().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    return [n, r] = new X().decode(e, r), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, oa = class extends ce {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.contractId)), t.push(new X().encode(e.stateRoot)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    return [n, r] = new X().decode(e, r), [
      {
        type: 4,
        contractId: s,
        stateRoot: n
      },
      r
    ];
  }
}, gn = class extends ce {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new ra().encode(e));
        break;
      }
      case 1: {
        t.push(new As().encode(e));
        break;
      }
      case 2: {
        t.push(new sa().encode(e));
        break;
      }
      case 3: {
        t.push(new ia().encode(e));
        break;
      }
      case 4: {
        t.push(new oa().encode(e));
        break;
      }
      default:
        throw new x(
          N.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new ra().decode(e, r), [n, r];
      case 1:
        return [n, r] = new As().decode(e, r), [n, r];
      case 2:
        return [n, r] = new sa().decode(e, r), [n, r];
      case 3:
        return [n, r] = new ia().decode(e, r), [n, r];
      case 4:
        return [n, r] = new oa().decode(e, r), [n, r];
      default:
        throw new x(
          N.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Qt = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Qt || {}), Ol = (e) => e.sort((t, n) => t.type - n.type);
function Ll(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new x(
        N.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(n.type);
  });
}
var pn = class extends ce {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Ll(e);
    const t = Ol(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new D("u64").encode(r));
          break;
        case 4:
          n.push(new $("u32", { padToWordSize: !0 }).encode(r));
          break;
        default:
          throw new x(N.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), ie(n);
  }
  decode(e, t, n) {
    let r = t;
    const s = [];
    if (n & 1) {
      const [i, o] = new D("u64").decode(e, r);
      r = o, s.push({ type: 1, data: i });
    }
    if (n & 2) {
      const [i, o] = new D("u64").decode(e, r);
      r = o, s.push({ type: 2, data: i });
    }
    if (n & 4) {
      const [i, o] = new $("u32", { padToWordSize: !0 }).decode(
        e,
        r
      );
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new D("u64").decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, ue = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(ue || {}), aa = class extends ce {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.from)), t.push(new X().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new X().encode(e.assetId)), t.push(new D("u64").encode(e.gas)), t.push(new D("u64").encode(e.param1)), t.push(new D("u64").encode(e.param2)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new X().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new X().decode(e, r);
    const u = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    [n, r] = new D("u64").decode(e, r);
    const h = n;
    [n, r] = new D("u64").decode(e, r);
    const E = n;
    [n, r] = new D("u64").decode(e, r);
    const I = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: u,
        gas: A,
        param1: h,
        param2: E,
        pc: I,
        is: n
      },
      r
    ];
  }
}, ca = class extends ce {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.id)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 1,
        id: s,
        val: i,
        pc: o,
        is: n
      },
      r
    ];
  }
}, ua = class extends ce {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.id)), t.push(new D("u64").encode(e.ptr)), t.push(new D("u64").encode(e.len)), t.push(new X().encode(e.digest)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new X().decode(e, r);
    const u = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: u,
        pc: A,
        is: n
      },
      r
    ];
  }
}, da = class extends ce {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.id)), t.push(new D("u64").encode(e.reason)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), t.push(new X().encode(e.contractId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const u = n;
    return [n, r] = new X().decode(e, r), [
      {
        type: 3,
        id: s,
        reason: i,
        pc: o,
        is: u,
        contractId: n
      },
      r
    ];
  }
}, Aa = class extends ce {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.id)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 4,
        id: s,
        val: i,
        pc: o,
        is: n
      },
      r
    ];
  }
}, la = class extends ce {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.id)), t.push(new D("u64").encode(e.val0)), t.push(new D("u64").encode(e.val1)), t.push(new D("u64").encode(e.val2)), t.push(new D("u64").encode(e.val3)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const u = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    [n, r] = new D("u64").decode(e, r);
    const h = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: u,
        val3: A,
        pc: h,
        is: n
      },
      r
    ];
  }
}, fa = class extends ce {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.id)), t.push(new D("u64").encode(e.val0)), t.push(new D("u64").encode(e.val1)), t.push(new D("u64").encode(e.ptr)), t.push(new D("u64").encode(e.len)), t.push(new X().encode(e.digest)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const u = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    [n, r] = new X().decode(e, r);
    const h = n;
    [n, r] = new D("u64").decode(e, r);
    const E = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: u,
        len: A,
        digest: h,
        pc: E,
        is: n
      },
      r
    ];
  }
}, ha = class extends ce {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.from)), t.push(new X().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new X().encode(e.assetId)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new X().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new X().decode(e, r);
    const u = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 7,
        from: s,
        to: i,
        amount: o,
        assetId: u,
        pc: A,
        is: n
      },
      r
    ];
  }
}, ga = class extends ce {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.from)), t.push(new X().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new X().encode(e.assetId)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new X().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new X().decode(e, r);
    const u = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 8,
        from: s,
        to: i,
        amount: o,
        assetId: u,
        pc: A,
        is: n
      },
      r
    ];
  }
}, pa = class extends ce {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new D("u64").encode(e.result)), t.push(new D("u64").encode(e.gasUsed)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new D("u64").decode(e, r);
    const s = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 9,
        result: s,
        gasUsed: n
      },
      r
    ];
  }
}, ls = class extends ce {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new be(32).encode(e.sender)), t.push(new be(32).encode(e.recipient)), t.push(new be(32).encode(e.nonce)), t.push(new D("u64").encode(e.amount)), t.push(z(e.data || "0x")), mt(ie(t));
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.sender)), t.push(new X().encode(e.recipient)), t.push(new D("u64").encode(e.amount)), t.push(new X().encode(e.nonce)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.data.length)), t.push(new X().encode(e.digest)), t.push(new be(e.data.length).encode(e.data)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new X().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new X().decode(e, r);
    const u = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new X().decode(e, r);
    const h = n;
    [n, r] = new be(A).decode(e, r);
    const E = z(n), I = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: u,
      digest: h,
      data: E
    };
    return I.messageId = ls.getMessageId(I), [I, r];
  }
}, g0 = (e, t) => {
  const n = z(e), r = z(t);
  return mt(ie([n, r]));
}, wr = class extends ce {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return g0(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.subId)), t.push(new X().encode(e.contractId)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new X().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const u = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n, h = wr.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: u,
      is: A,
      assetId: h
    }, r];
  }
}, yi = class extends ce {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return g0(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.subId)), t.push(new X().encode(e.contractId)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new X().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const u = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n, h = wr.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: u,
      is: A,
      assetId: h
    }, r];
  }
}, jw = class extends ce {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new aa().encode(e));
        break;
      }
      case 1: {
        t.push(new ca().encode(e));
        break;
      }
      case 2: {
        t.push(new ua().encode(e));
        break;
      }
      case 3: {
        t.push(new da().encode(e));
        break;
      }
      case 4: {
        t.push(new Aa().encode(e));
        break;
      }
      case 5: {
        t.push(new la().encode(e));
        break;
      }
      case 6: {
        t.push(new fa().encode(e));
        break;
      }
      case 7: {
        t.push(new ha().encode(e));
        break;
      }
      case 8: {
        t.push(new ga().encode(e));
        break;
      }
      case 9: {
        t.push(new pa().encode(e));
        break;
      }
      case 10: {
        t.push(new ls().encode(e));
        break;
      }
      case 11: {
        t.push(new wr().encode(e));
        break;
      }
      case 12: {
        t.push(new yi().encode(e));
        break;
      }
      default:
        throw new x(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new aa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new ca().decode(e, r), [n, r];
      case 2:
        return [n, r] = new ua().decode(e, r), [n, r];
      case 3:
        return [n, r] = new da().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Aa().decode(e, r), [n, r];
      case 5:
        return [n, r] = new la().decode(e, r), [n, r];
      case 6:
        return [n, r] = new fa().decode(e, r), [n, r];
      case 7:
        return [n, r] = new ha().decode(e, r), [n, r];
      case 8:
        return [n, r] = new ga().decode(e, r), [n, r];
      case 9:
        return [n, r] = new pa().decode(e, r), [n, r];
      case 10:
        return [n, r] = new ls().decode(e, r), [n, r];
      case 11:
        return [n, r] = new wr().decode(e, r), [n, r];
      case 12:
        return [n, r] = new yi().decode(e, r), [n, r];
      default:
        throw new x(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, ma = class extends bs {
  constructor() {
    super("StorageSlot", {
      key: new X(),
      value: new X()
    });
  }
}, wa = class extends ce {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: n } = e;
    switch (t.push(new $("u8", { padToWordSize: !0 }).encode(n)), n) {
      case 0: {
        const r = e.data;
        t.push(new $("u16", { padToWordSize: !0 }).encode(r.witnessIndex)), t.push(new X().encode(r.checksum));
        break;
      }
      case 1: {
        const r = e.data;
        t.push(new X().encode(r.bytecodeRoot));
        break;
      }
      default:
        throw new x(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return ie(t);
  }
  decode(e, t) {
    let n = t, r;
    [r, n] = new $("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0: {
        [r, n] = new $("u16", { padToWordSize: !0 }).decode(e, n);
        const i = r;
        return [r, n] = new X().decode(e, n), [{ type: s, data: { witnessIndex: i, checksum: r } }, n];
      }
      case 1:
        return [r, n] = new X().decode(e, n), [{ type: s, data: { bytecodeRoot: r } }, n];
      default:
        throw new x(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, mn = class extends ce {
  constructor() {
    super(
      "Witness",
      // Types of dynamic length are not supported in the ABI
      "unknown",
      0
    );
  }
  encode(e) {
    const t = [];
    return t.push(new $("u32", { padToWordSize: !0 }).encode(e.dataLength)), t.push(new be(e.dataLength).encode(e.data)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    return [n, r] = new be(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, Le = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e))(Le || {}), ya = class extends ce {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new D("u64").encode(e.scriptGasLimit)), t.push(new X().encode(e.receiptsRoot)), t.push(new D("u64").encode(e.scriptLength)), t.push(new D("u64").encode(e.scriptDataLength)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new be(e.scriptLength.toNumber()).encode(e.script)), t.push(new be(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new pn().encode(e.policies)), t.push(new we(new hn(), e.inputsCount).encode(e.inputs)), t.push(new we(new gn(), e.outputsCount).encode(e.outputs)), t.push(new we(new mn(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new D("u64").decode(e, r);
    const s = n;
    [n, r] = new X().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const u = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const E = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const I = n;
    [n, r] = new be(o.toNumber()).decode(e, r);
    const _ = n;
    [n, r] = new be(u.toNumber()).decode(e, r);
    const v = n;
    [n, r] = new pn().decode(e, r, A);
    const R = n;
    [n, r] = new we(new hn(), h).decode(e, r);
    const C = n;
    [n, r] = new we(new gn(), E).decode(e, r);
    const F = n;
    return [n, r] = new we(new mn(), I).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: u,
        policyTypes: A,
        inputsCount: h,
        outputsCount: E,
        witnessesCount: I,
        receiptsRoot: i,
        script: _,
        scriptData: v,
        policies: R,
        inputs: C,
        outputs: F,
        witnesses: n
      },
      r
    ];
  }
}, Ia = class extends ce {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new $("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new X().encode(e.salt)), t.push(new D("u64").encode(e.storageSlotsCount)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new we(new ma(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new pn().encode(e.policies)), t.push(new we(new hn(), e.inputsCount).encode(e.inputs)), t.push(new we(new gn(), e.outputsCount).encode(e.outputs)), t.push(new we(new mn(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    [n, r] = new X().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const u = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const E = n;
    [n, r] = new we(new ma(), o.toNumber()).decode(
      e,
      r
    );
    const I = n;
    [n, r] = new pn().decode(e, r, u);
    const _ = n;
    [n, r] = new we(new hn(), A).decode(e, r);
    const v = n;
    [n, r] = new we(new gn(), h).decode(e, r);
    const R = n;
    return [n, r] = new we(new mn(), E).decode(e, r), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: u,
        storageSlotsCount: o,
        inputsCount: A,
        outputsCount: h,
        witnessesCount: E,
        salt: i,
        policies: _,
        storageSlots: I,
        inputs: v,
        outputs: R,
        witnesses: n
      },
      r
    ];
  }
}, Ea = class extends ce {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Zn().encode(e.txPointer)), t.push(new ds().encode(e.inputContract)), t.push(new As().encode(e.outputContract)), t.push(new D("u64").encode(e.mintAmount)), t.push(new X().encode(e.mintAssetId)), t.push(new D("u64").encode(e.gasPrice)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Zn().decode(e, r);
    const s = n;
    [n, r] = new ds().decode(e, r);
    const i = n;
    [n, r] = new As().decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const u = n;
    [n, r] = new X().decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: u,
        mintAssetId: A,
        gasPrice: n
      },
      r
    ];
  }
}, ba = class extends ce {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new wa().encode(e.upgradePurpose)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new pn().encode(e.policies)), t.push(new we(new hn(), e.inputsCount).encode(e.inputs)), t.push(new we(new gn(), e.outputsCount).encode(e.outputs)), t.push(new we(new mn(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new wa().decode(e, r);
    const s = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const o = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const u = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new pn().decode(e, r, i);
    const h = n;
    [n, r] = new we(new hn(), o).decode(e, r);
    const E = n;
    [n, r] = new we(new gn(), u).decode(e, r);
    const I = n;
    return [n, r] = new we(new mn(), A).decode(e, r), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: o,
        outputsCount: u,
        witnessesCount: A,
        policies: h,
        inputs: E,
        outputs: I,
        witnesses: n
      },
      r
    ];
  }
}, Ca = class extends ce {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new X().encode(e.root)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.subsectionIndex)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.subsectionsNumber)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.proofSetCount)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new we(new X(), e.proofSetCount).encode(e.proofSet)), t.push(new pn().encode(e.policies)), t.push(new we(new hn(), e.inputsCount).encode(e.inputs)), t.push(new we(new gn(), e.outputsCount).encode(e.outputs)), t.push(new we(new mn(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new X().decode(e, r);
    const s = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const o = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const u = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const E = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const I = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const _ = n;
    [n, r] = new we(new X(), A).decode(e, r);
    const v = n;
    [n, r] = new pn().decode(e, r, h);
    const R = n;
    [n, r] = new we(new hn(), E).decode(e, r);
    const C = n;
    [n, r] = new we(new gn(), I).decode(e, r);
    const F = n;
    return [n, r] = new we(new mn(), _).decode(e, r), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: o,
        subsectionsNumber: u,
        proofSetCount: A,
        policyTypes: h,
        inputsCount: E,
        outputsCount: I,
        witnessesCount: _,
        proofSet: v,
        policies: R,
        inputs: C,
        outputs: F,
        witnesses: n
      },
      r
    ];
  }
}, wn = class extends ce {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new ya().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Ia().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new Ea().encode(e));
        break;
      }
      case 3: {
        t.push(
          new ba().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new Ca().encode(e)
        );
        break;
      }
      default:
        throw new x(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new ya().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Ia().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Ea().decode(e, r), [n, r];
      case 3:
        return [n, r] = new ba().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Ca().decode(e, r), [n, r];
      default:
        throw new x(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, $w = class extends bs {
  constructor() {
    super("UtxoId", {
      transactionId: new X(),
      outputIndex: new $("u8", { padToWordSize: !0 })
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const p0 = BigInt(0), Cs = BigInt(1), kl = BigInt(2);
function Gt(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Pl = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Wn(e) {
  if (!Gt(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += Pl[e[n]];
  return t;
}
function m0(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function io(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const zt = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Ba(e) {
  if (e >= zt._0 && e <= zt._9)
    return e - zt._0;
  if (e >= zt._A && e <= zt._F)
    return e - (zt._A - 10);
  if (e >= zt._a && e <= zt._f)
    return e - (zt._a - 10);
}
function Jn(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = Ba(e.charCodeAt(i)), u = Ba(e.charCodeAt(i + 1));
    if (o === void 0 || u === void 0) {
      const A = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + A + '" at index ' + i);
    }
    r[s] = o * 16 + u;
  }
  return r;
}
function Rn(e) {
  return io(Wn(e));
}
function oo(e) {
  if (!Gt(e))
    throw new Error("Uint8Array expected");
  return io(Wn(Uint8Array.from(e).reverse()));
}
function qn(e, t) {
  return Jn(e.toString(16).padStart(t * 2, "0"));
}
function ao(e, t) {
  return qn(e, t).reverse();
}
function Ul(e) {
  return Jn(m0(e));
}
function Nt(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = Jn(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Gt(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function yr(...e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (!Gt(i))
      throw new Error("Uint8Array expected");
    t += i.length;
  }
  let n = new Uint8Array(t), r = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    n.set(i, r), r += i.length;
  }
  return n;
}
function w0(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function Gl(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Xl(e) {
  let t;
  for (t = 0; e > p0; e >>= Cs, t += 1)
    ;
  return t;
}
function zl(e, t) {
  return e >> BigInt(t) & Cs;
}
const Yl = (e, t, n) => e | (n ? Cs : p0) << BigInt(t), co = (e) => (kl << BigInt(e - 1)) - Cs, ti = (e) => new Uint8Array(e), _a = (e) => Uint8Array.from(e);
function y0(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = ti(e), s = ti(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, u = (...I) => n(s, r, ...I), A = (I = ti()) => {
    s = u(_a([0]), I), r = u(), I.length !== 0 && (s = u(_a([1]), I), r = u());
  }, h = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let I = 0;
    const _ = [];
    for (; I < t; ) {
      r = u();
      const v = r.slice();
      _.push(v), I += r.length;
    }
    return yr(..._);
  };
  return (I, _) => {
    o(), A(I);
    let v;
    for (; !(v = _(h())); )
      A();
    return o(), v;
  };
}
const Vl = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || Gt(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function xr(e, t, n = {}) {
  const r = (s, i, o) => {
    const u = Vl[i];
    if (typeof u != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const A = e[s];
    if (!(o && A === void 0) && !u(A, e))
      throw new Error(`Invalid param ${String(s)}=${A} (${typeof A}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(n))
    r(s, i, !0);
  return e;
}
const Hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: zl,
  bitLen: Xl,
  bitMask: co,
  bitSet: Yl,
  bytesToHex: Wn,
  bytesToNumberBE: Rn,
  bytesToNumberLE: oo,
  concatBytes: yr,
  createHmacDrbg: y0,
  ensureBytes: Nt,
  equalBytes: w0,
  hexToBytes: Jn,
  hexToNumber: io,
  isBytes: Gt,
  numberToBytesBE: qn,
  numberToBytesLE: ao,
  numberToHexUnpadded: m0,
  numberToVarBytesBE: Ul,
  utf8ToBytes: Gl,
  validateObject: xr
}, Symbol.toStringTag, { value: "Module" }));
var ni = {}, Ii = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Ee < "u" && Ee, r = function() {
    function i() {
      this.fetch = !1, this.DOMException = n.DOMException;
    }
    return i.prototype = n, new i();
  }();
  (function(i) {
    (function(o) {
      var u = typeof i < "u" && i || typeof self < "u" && self || typeof u < "u" && u, A = {
        searchParams: "URLSearchParams" in u,
        iterable: "Symbol" in u && "iterator" in Symbol,
        blob: "FileReader" in u && "Blob" in u && function() {
          try {
            return new Blob(), !0;
          } catch {
            return !1;
          }
        }(),
        formData: "FormData" in u,
        arrayBuffer: "ArrayBuffer" in u
      };
      function h(c) {
        return c && DataView.prototype.isPrototypeOf(c);
      }
      if (A.arrayBuffer)
        var E = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], I = ArrayBuffer.isView || function(c) {
          return c && E.indexOf(Object.prototype.toString.call(c)) > -1;
        };
      function _(c) {
        if (typeof c != "string" && (c = String(c)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(c) || c === "")
          throw new TypeError('Invalid character in header field name: "' + c + '"');
        return c.toLowerCase();
      }
      function v(c) {
        return typeof c != "string" && (c = String(c)), c;
      }
      function R(c) {
        var l = {
          next: function() {
            var p = c.shift();
            return { done: p === void 0, value: p };
          }
        };
        return A.iterable && (l[Symbol.iterator] = function() {
          return l;
        }), l;
      }
      function C(c) {
        this.map = {}, c instanceof C ? c.forEach(function(l, p) {
          this.append(p, l);
        }, this) : Array.isArray(c) ? c.forEach(function(l) {
          this.append(l[0], l[1]);
        }, this) : c && Object.getOwnPropertyNames(c).forEach(function(l) {
          this.append(l, c[l]);
        }, this);
      }
      C.prototype.append = function(c, l) {
        c = _(c), l = v(l);
        var p = this.map[c];
        this.map[c] = p ? p + ", " + l : l;
      }, C.prototype.delete = function(c) {
        delete this.map[_(c)];
      }, C.prototype.get = function(c) {
        return c = _(c), this.has(c) ? this.map[c] : null;
      }, C.prototype.has = function(c) {
        return this.map.hasOwnProperty(_(c));
      }, C.prototype.set = function(c, l) {
        this.map[_(c)] = v(l);
      }, C.prototype.forEach = function(c, l) {
        for (var p in this.map)
          this.map.hasOwnProperty(p) && c.call(l, this.map[p], p, this);
      }, C.prototype.keys = function() {
        var c = [];
        return this.forEach(function(l, p) {
          c.push(p);
        }), R(c);
      }, C.prototype.values = function() {
        var c = [];
        return this.forEach(function(l) {
          c.push(l);
        }), R(c);
      }, C.prototype.entries = function() {
        var c = [];
        return this.forEach(function(l, p) {
          c.push([p, l]);
        }), R(c);
      }, A.iterable && (C.prototype[Symbol.iterator] = C.prototype.entries);
      function F(c) {
        if (c.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        c.bodyUsed = !0;
      }
      function M(c) {
        return new Promise(function(l, p) {
          c.onload = function() {
            l(c.result);
          }, c.onerror = function() {
            p(c.error);
          };
        });
      }
      function G(c) {
        var l = new FileReader(), p = M(l);
        return l.readAsArrayBuffer(c), p;
      }
      function L(c) {
        var l = new FileReader(), p = M(l);
        return l.readAsText(c), p;
      }
      function W(c) {
        for (var l = new Uint8Array(c), p = new Array(l.length), f = 0; f < l.length; f++)
          p[f] = String.fromCharCode(l[f]);
        return p.join("");
      }
      function O(c) {
        if (c.slice)
          return c.slice(0);
        var l = new Uint8Array(c.byteLength);
        return l.set(new Uint8Array(c)), l.buffer;
      }
      function T() {
        return this.bodyUsed = !1, this._initBody = function(c) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = c, c ? typeof c == "string" ? this._bodyText = c : A.blob && Blob.prototype.isPrototypeOf(c) ? this._bodyBlob = c : A.formData && FormData.prototype.isPrototypeOf(c) ? this._bodyFormData = c : A.searchParams && URLSearchParams.prototype.isPrototypeOf(c) ? this._bodyText = c.toString() : A.arrayBuffer && A.blob && h(c) ? (this._bodyArrayBuffer = O(c.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : A.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(c) || I(c)) ? this._bodyArrayBuffer = O(c) : this._bodyText = c = Object.prototype.toString.call(c) : this._bodyText = "", this.headers.get("content-type") || (typeof c == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : A.searchParams && URLSearchParams.prototype.isPrototypeOf(c) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, A.blob && (this.blob = function() {
          var c = F(this);
          if (c)
            return c;
          if (this._bodyBlob)
            return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }, this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var c = F(this);
            return c || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(G);
        }), this.text = function() {
          var c = F(this);
          if (c)
            return c;
          if (this._bodyBlob)
            return L(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(W(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, A.formData && (this.formData = function() {
          return this.text().then(Y);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var k = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function U(c) {
        var l = c.toUpperCase();
        return k.indexOf(l) > -1 ? l : c;
      }
      function q(c, l) {
        if (!(this instanceof q))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l = l || {};
        var p = l.body;
        if (c instanceof q) {
          if (c.bodyUsed)
            throw new TypeError("Already read");
          this.url = c.url, this.credentials = c.credentials, l.headers || (this.headers = new C(c.headers)), this.method = c.method, this.mode = c.mode, this.signal = c.signal, !p && c._bodyInit != null && (p = c._bodyInit, c.bodyUsed = !0);
        } else
          this.url = String(c);
        if (this.credentials = l.credentials || this.credentials || "same-origin", (l.headers || !this.headers) && (this.headers = new C(l.headers)), this.method = U(l.method || this.method || "GET"), this.mode = l.mode || this.mode || null, this.signal = l.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && p)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(p), (this.method === "GET" || this.method === "HEAD") && (l.cache === "no-store" || l.cache === "no-cache")) {
          var f = /([?&])_=[^&]*/;
          if (f.test(this.url))
            this.url = this.url.replace(f, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var w = /\?/;
            this.url += (w.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      q.prototype.clone = function() {
        return new q(this, { body: this._bodyInit });
      };
      function Y(c) {
        var l = new FormData();
        return c.trim().split("&").forEach(function(p) {
          if (p) {
            var f = p.split("="), w = f.shift().replace(/\+/g, " "), y = f.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(w), decodeURIComponent(y));
          }
        }), l;
      }
      function H(c) {
        var l = new C(), p = c.replace(/\r?\n[\t ]+/g, " ");
        return p.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var w = f.split(":"), y = w.shift().trim();
          if (y) {
            var g = w.join(":").trim();
            l.append(y, g);
          }
        }), l;
      }
      T.call(q.prototype);
      function ee(c, l) {
        if (!(this instanceof ee))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l || (l = {}), this.type = "default", this.status = l.status === void 0 ? 200 : l.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = l.statusText === void 0 ? "" : "" + l.statusText, this.headers = new C(l.headers), this.url = l.url || "", this._initBody(c);
      }
      T.call(ee.prototype), ee.prototype.clone = function() {
        return new ee(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new C(this.headers),
          url: this.url
        });
      }, ee.error = function() {
        var c = new ee(null, { status: 0, statusText: "" });
        return c.type = "error", c;
      };
      var b = [301, 302, 303, 307, 308];
      ee.redirect = function(c, l) {
        if (b.indexOf(l) === -1)
          throw new RangeError("Invalid status code");
        return new ee(null, { status: l, headers: { location: c } });
      }, o.DOMException = u.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(l, p) {
          this.message = l, this.name = p;
          var f = Error(l);
          this.stack = f.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function a(c, l) {
        return new Promise(function(p, f) {
          var w = new q(c, l);
          if (w.signal && w.signal.aborted)
            return f(new o.DOMException("Aborted", "AbortError"));
          var y = new XMLHttpRequest();
          function g() {
            y.abort();
          }
          y.onload = function() {
            var m = {
              status: y.status,
              statusText: y.statusText,
              headers: H(y.getAllResponseHeaders() || "")
            };
            m.url = "responseURL" in y ? y.responseURL : m.headers.get("X-Request-URL");
            var Z = "response" in y ? y.response : y.responseText;
            setTimeout(function() {
              p(new ee(Z, m));
            }, 0);
          }, y.onerror = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, y.ontimeout = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, y.onabort = function() {
            setTimeout(function() {
              f(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function d(m) {
            try {
              return m === "" && u.location.href ? u.location.href : m;
            } catch {
              return m;
            }
          }
          y.open(w.method, d(w.url), !0), w.credentials === "include" ? y.withCredentials = !0 : w.credentials === "omit" && (y.withCredentials = !1), "responseType" in y && (A.blob ? y.responseType = "blob" : A.arrayBuffer && w.headers.get("Content-Type") && w.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (y.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof C) ? Object.getOwnPropertyNames(l.headers).forEach(function(m) {
            y.setRequestHeader(m, v(l.headers[m]));
          }) : w.headers.forEach(function(m, Z) {
            y.setRequestHeader(Z, m);
          }), w.signal && (w.signal.addEventListener("abort", g), y.onreadystatechange = function() {
            y.readyState === 4 && w.signal.removeEventListener("abort", g);
          }), y.send(typeof w._bodyInit > "u" ? null : w._bodyInit);
        });
      }
      return a.polyfill = !0, u.fetch || (u.fetch = a, u.Headers = C, u.Request = q, u.Response = ee), o.Headers = C, o.Request = q, o.Response = ee, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Ii, Ii.exports);
var Zl = Ii.exports;
function Wl(e) {
  return typeof e == "object" && e !== null;
}
function Jl(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const ql = /\r\n|[\n\r]/g;
function Ei(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(ql)) {
    if (typeof s.index == "number" || Jl(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function jl(e) {
  return I0(
    e.source,
    Ei(e.source, e.start)
  );
}
function I0(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, u = t.line === 1 ? n : 0, A = t.column + u, h = `${e.name}:${o}:${A}
`, E = r.split(/\r\n|[\n\r]/g), I = E[s];
  if (I.length > 120) {
    const _ = Math.floor(A / 80), v = A % 80, R = [];
    for (let C = 0; C < I.length; C += 80)
      R.push(I.slice(C, C + 80));
    return h + va([
      [`${o} |`, R[0]],
      ...R.slice(1, _ + 1).map((C) => ["|", C]),
      ["|", "^".padStart(v)],
      ["|", R[_ + 1]]
    ]);
  }
  return h + va([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, E[s - 1]],
    [`${o} |`, I],
    ["|", "^".padStart(A)],
    [`${o + 1} |`, E[s + 1]]
  ]);
}
function va(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function $l(e) {
  const t = e[0];
  return t == null || "kind" in t || "length" in t ? {
    nodes: t,
    source: e[1],
    positions: e[2],
    path: e[3],
    originalError: e[4],
    extensions: e[5]
  } : t;
}
class uo extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  /**
   * The original error thrown from a field resolver during execution.
   */
  /**
   * Extension fields to add to the formatted error.
   */
  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(t, ...n) {
    var r, s, i;
    const { nodes: o, source: u, positions: A, path: h, originalError: E, extensions: I } = $l(n);
    super(t), this.name = "GraphQLError", this.path = h ?? void 0, this.originalError = E ?? void 0, this.nodes = xa(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const _ = xa(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((R) => R.loc).filter((R) => R != null)
    );
    this.source = u ?? (_ == null || (s = _[0]) === null || s === void 0 ? void 0 : s.source), this.positions = A ?? (_ == null ? void 0 : _.map((R) => R.start)), this.locations = A && u ? A.map((R) => Ei(u, R)) : _ == null ? void 0 : _.map((R) => Ei(R.source, R.start));
    const v = Wl(
      E == null ? void 0 : E.extensions
    ) ? E == null ? void 0 : E.extensions : void 0;
    this.extensions = (i = I ?? v) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
      message: {
        writable: !0,
        enumerable: !0
      },
      name: {
        enumerable: !1
      },
      nodes: {
        enumerable: !1
      },
      source: {
        enumerable: !1
      },
      positions: {
        enumerable: !1
      },
      originalError: {
        enumerable: !1
      }
    }), E != null && E.stack ? Object.defineProperty(this, "stack", {
      value: E.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, uo) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let t = this.message;
    if (this.nodes)
      for (const n of this.nodes)
        n.loc && (t += `

` + jl(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + I0(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function xa(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function ht(e, t, n) {
  return new uo(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class Kl {
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The Token at which this Node begins.
   */
  /**
   * The Token at which this Node ends.
   */
  /**
   * The Source document the AST represents.
   */
  constructor(t, n, r) {
    this.start = t.start, this.end = n.end, this.startToken = t, this.endToken = n, this.source = r;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
}
class E0 {
  /**
   * The kind of Token.
   */
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The 1-indexed line number on which this Token appears.
   */
  /**
   * The 1-indexed column number at which this Token begins.
   */
  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */
  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(t, n, r, s, i, o) {
    this.kind = t, this.start = n, this.end = r, this.line = s, this.column = i, this.value = o, this.prev = null, this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
const b0 = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
}, ef = new Set(Object.keys(b0));
function Ra(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && ef.has(t);
}
var Mn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(Mn || (Mn = {}));
var bi;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(bi || (bi = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function Ci(e) {
  return e === 9 || e === 32;
}
function Ir(e) {
  return e >= 48 && e <= 57;
}
function C0(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function B0(e) {
  return C0(e) || e === 95;
}
function tf(e) {
  return C0(e) || Ir(e) || e === 95;
}
function nf(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const u = e[o], A = rf(u);
    A !== u.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && A < n && (n = A));
  }
  return e.map((o, u) => u === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function rf(e) {
  let t = 0;
  for (; t < e.length && Ci(e.charCodeAt(t)); )
    ++t;
  return t;
}
function sf(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((v) => v.length === 0 || Ci(v.charCodeAt(0))), o = n.endsWith('\\"""'), u = e.endsWith('"') && !o, A = e.endsWith("\\"), h = u || A, E = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || h || i || o);
  let I = "";
  const _ = s && Ci(e.charCodeAt(0));
  return (E && !_ || i) && (I += `
`), I += n, (E || h) && (I += `
`), '"""' + I + '"""';
}
var P;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(P || (P = {}));
class of {
  /**
   * The previously focused non-ignored token.
   */
  /**
   * The currently focused non-ignored token.
   */
  /**
   * The (1-indexed) line containing the current token.
   */
  /**
   * The character offset at which the current line begins.
   */
  constructor(t) {
    const n = new E0(P.SOF, 0, 0, 0, 0);
    this.source = t, this.lastToken = n, this.token = n, this.line = 1, this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance() {
    return this.lastToken = this.token, this.token = this.lookahead();
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  lookahead() {
    let t = this.token;
    if (t.kind !== P.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const n = cf(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === P.COMMENT);
    return t;
  }
}
function af(e) {
  return e === P.BANG || e === P.DOLLAR || e === P.AMP || e === P.PAREN_L || e === P.PAREN_R || e === P.SPREAD || e === P.COLON || e === P.EQUALS || e === P.AT || e === P.BRACKET_L || e === P.BRACKET_R || e === P.BRACE_L || e === P.PIPE || e === P.BRACE_R;
}
function tr(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Bs(e, t) {
  return _0(e.charCodeAt(t)) && v0(e.charCodeAt(t + 1));
}
function _0(e) {
  return e >= 55296 && e <= 56319;
}
function v0(e) {
  return e >= 56320 && e <= 57343;
}
function Qn(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return P.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function ft(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new E0(t, n, r, i, o, s);
}
function cf(e, t) {
  const n = e.source.body, r = n.length;
  let s = t;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    switch (i) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++s;
        continue;
      case 10:
        ++s, ++e.line, e.lineStart = s;
        continue;
      case 13:
        n.charCodeAt(s + 1) === 10 ? s += 2 : ++s, ++e.line, e.lineStart = s;
        continue;
      case 35:
        return uf(e, s);
      case 33:
        return ft(e, P.BANG, s, s + 1);
      case 36:
        return ft(e, P.DOLLAR, s, s + 1);
      case 38:
        return ft(e, P.AMP, s, s + 1);
      case 40:
        return ft(e, P.PAREN_L, s, s + 1);
      case 41:
        return ft(e, P.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return ft(e, P.SPREAD, s, s + 3);
        break;
      case 58:
        return ft(e, P.COLON, s, s + 1);
      case 61:
        return ft(e, P.EQUALS, s, s + 1);
      case 64:
        return ft(e, P.AT, s, s + 1);
      case 91:
        return ft(e, P.BRACKET_L, s, s + 1);
      case 93:
        return ft(e, P.BRACKET_R, s, s + 1);
      case 123:
        return ft(e, P.BRACE_L, s, s + 1);
      case 124:
        return ft(e, P.PIPE, s, s + 1);
      case 125:
        return ft(e, P.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? gf(e, s) : Af(e, s);
    }
    if (Ir(i) || i === 45)
      return df(e, s, i);
    if (B0(i))
      return pf(e, s);
    throw ht(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : tr(i) || Bs(n, s) ? `Unexpected character: ${Qn(e, s)}.` : `Invalid character: ${Qn(e, s)}.`
    );
  }
  return ft(e, P.EOF, r, r);
}
function uf(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (tr(i))
      ++s;
    else if (Bs(n, s))
      s += 2;
    else
      break;
  }
  return ft(
    e,
    P.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function df(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Ir(i))
      throw ht(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Qn(
          e,
          s
        )}.`
      );
  } else
    s = ri(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = ri(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = ri(e, s, i), i = r.charCodeAt(s)), i === 46 || B0(i))
    throw ht(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Qn(
        e,
        s
      )}.`
    );
  return ft(
    e,
    o ? P.FLOAT : P.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function ri(e, t, n) {
  if (!Ir(n))
    throw ht(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Qn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; Ir(r.charCodeAt(s)); )
    ++s;
  return s;
}
function Af(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const u = n.charCodeAt(s);
    if (u === 34)
      return o += n.slice(i, s), ft(e, P.STRING, t, s + 1, o);
    if (u === 92) {
      o += n.slice(i, s);
      const A = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? lf(e, s) : ff(e, s) : hf(e, s);
      o += A.value, s += A.size, i = s;
      continue;
    }
    if (u === 10 || u === 13)
      break;
    if (tr(u))
      ++s;
    else if (Bs(n, s))
      s += 2;
    else
      throw ht(
        e.source,
        s,
        `Invalid character within String: ${Qn(
          e,
          s
        )}.`
      );
  }
  throw ht(e.source, s, "Unterminated string.");
}
function lf(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !tr(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | dr(i), r < 0)
      break;
  }
  throw ht(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(
      t,
      t + s
    )}".`
  );
}
function ff(e, t) {
  const n = e.source.body, r = Sa(n, t + 2);
  if (tr(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (_0(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Sa(n, t + 8);
    if (v0(s))
      return {
        value: String.fromCodePoint(r, s),
        size: 12
      };
  }
  throw ht(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function Sa(e, t) {
  return dr(e.charCodeAt(t)) << 12 | dr(e.charCodeAt(t + 1)) << 8 | dr(e.charCodeAt(t + 2)) << 4 | dr(e.charCodeAt(t + 3));
}
function dr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function hf(e, t) {
  const n = e.source.body;
  switch (n.charCodeAt(t + 1)) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw ht(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(
      t,
      t + 2
    )}".`
  );
}
function gf(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, u = "";
  const A = [];
  for (; i < r; ) {
    const h = n.charCodeAt(i);
    if (h === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      u += n.slice(o, i), A.push(u);
      const E = ft(
        e,
        P.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        nf(A).join(`
`)
      );
      return e.line += A.length - 1, e.lineStart = s, E;
    }
    if (h === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      u += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (h === 10 || h === 13) {
      u += n.slice(o, i), A.push(u), h === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, u = "", o = i, s = i;
      continue;
    }
    if (tr(h))
      ++i;
    else if (Bs(n, i))
      i += 2;
    else
      throw ht(
        e.source,
        i,
        `Invalid character within String: ${Qn(
          e,
          i
        )}.`
      );
  }
  throw ht(e.source, i, "Unterminated string.");
}
function pf(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (tf(i))
      ++s;
    else
      break;
  }
  return ft(
    e,
    P.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function Kr(e, t) {
  if (!!!e)
    throw new Error(t);
}
const mf = 10, x0 = 2;
function Ao(e) {
  return _s(e, []);
}
function _s(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return wf(e, t);
    default:
      return String(e);
  }
}
function wf(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (yf(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : _s(r, n);
  } else if (Array.isArray(e))
    return Ef(e, n);
  return If(e, n);
}
function yf(e) {
  return typeof e.toJSON == "function";
}
function If(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > x0 ? "[" + bf(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + _s(i, t)
  ).join(", ") + " }";
}
function Ef(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > x0)
    return "[Array]";
  const n = Math.min(mf, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(_s(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function bf(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const Cf = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  globalThis.process && globalThis.process.env.NODE_ENV === "production" ? function(t, n) {
    return t instanceof n;
  } : function(t, n) {
    if (t instanceof n)
      return !0;
    if (typeof t == "object" && t !== null) {
      var r;
      const s = n.prototype[Symbol.toStringTag], i = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in t ? t[Symbol.toStringTag] : (r = t.constructor) === null || r === void 0 ? void 0 : r.name
      );
      if (s === i) {
        const o = Ao(t);
        throw new Error(`Cannot use ${s} "${o}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return !1;
  }
);
class R0 {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Kr(!1, `Body must be a string. Received: ${Ao(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || Kr(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Kr(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Bf(e) {
  return Cf(e, R0);
}
function S0(e, t) {
  return new Rr(e, t).parseDocument();
}
function _f(e, t) {
  const n = new Rr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(P.EOF), r;
}
function vf(e, t) {
  const n = new Rr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(P.EOF), r;
}
function xf(e, t) {
  const n = new Rr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(P.EOF), r;
}
class Rr {
  constructor(t, n = {}) {
    const r = Bf(t) ? t : new R0(t);
    this._lexer = new of(r), this._options = n, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(P.NAME);
    return this.node(t, {
      kind: ae.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: ae.DOCUMENT,
      definitions: this.many(
        P.SOF,
        this.parseDefinition,
        P.EOF
      )
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  parseDefinition() {
    if (this.peek(P.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), n = t ? this._lexer.lookahead() : this._lexer.token;
    if (n.kind === P.NAME) {
      switch (n.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (t)
        throw ht(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (n.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(n);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const t = this._lexer.token;
    if (this.peek(P.BRACE_L))
      return this.node(t, {
        kind: ae.OPERATION_DEFINITION,
        operation: Mn.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(P.NAME) && (r = this.parseName()), this.node(t, {
      kind: ae.OPERATION_DEFINITION,
      operation: n,
      name: r,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const t = this.expectToken(P.NAME);
    switch (t.value) {
      case "query":
        return Mn.QUERY;
      case "mutation":
        return Mn.MUTATION;
      case "subscription":
        return Mn.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      P.PAREN_L,
      this.parseVariableDefinition,
      P.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ae.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(P.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(P.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(P.DOLLAR), this.node(t, {
      kind: ae.VARIABLE,
      name: this.parseName()
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: ae.SELECTION_SET,
      selections: this.many(
        P.BRACE_L,
        this.parseSelection,
        P.BRACE_R
      )
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  parseSelection() {
    return this.peek(P.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, n = this.parseName();
    let r, s;
    return this.expectOptionalToken(P.COLON) ? (r = n, s = this.parseName()) : s = n, this.node(t, {
      kind: ae.FIELD,
      alias: r,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(P.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const n = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(P.PAREN_L, n, P.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(P.COLON), this.node(n, {
      kind: ae.ARGUMENT,
      name: r,
      value: this.parseValueLiteral(t)
    });
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  // Implements the parsing rules in the Fragments section.
  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  parseFragment() {
    const t = this._lexer.token;
    this.expectToken(P.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(P.NAME) ? this.node(t, {
      kind: ae.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: ae.INLINE_FRAGMENT,
      typeCondition: n ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  parseFragmentDefinition() {
    const t = this._lexer.token;
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(t, {
      kind: ae.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: ae.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentName : Name but not `on`
   */
  parseFragmentName() {
    if (this._lexer.token.value === "on")
      throw this.unexpected();
    return this.parseName();
  }
  // Implements the parsing rules in the Values section.
  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseValueLiteral(t) {
    const n = this._lexer.token;
    switch (n.kind) {
      case P.BRACKET_L:
        return this.parseList(t);
      case P.BRACE_L:
        return this.parseObject(t);
      case P.INT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.INT,
          value: n.value
        });
      case P.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.FLOAT,
          value: n.value
        });
      case P.STRING:
      case P.BLOCK_STRING:
        return this.parseStringLiteral();
      case P.NAME:
        switch (this.advanceLexer(), n.value) {
          case "true":
            return this.node(n, {
              kind: ae.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(n, {
              kind: ae.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(n, {
              kind: ae.NULL
            });
          default:
            return this.node(n, {
              kind: ae.ENUM,
              value: n.value
            });
        }
      case P.DOLLAR:
        if (t)
          if (this.expectToken(P.DOLLAR), this._lexer.token.kind === P.NAME) {
            const r = this._lexer.token.value;
            throw ht(
              this._lexer.source,
              n.start,
              `Unexpected variable "$${r}" in constant value.`
            );
          } else
            throw this.unexpected(n);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const t = this._lexer.token;
    return this.advanceLexer(), this.node(t, {
      kind: ae.STRING,
      value: t.value,
      block: t.kind === P.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(t) {
    const n = () => this.parseValueLiteral(t);
    return this.node(this._lexer.token, {
      kind: ae.LIST,
      values: this.any(P.BRACKET_L, n, P.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(t) {
    const n = () => this.parseObjectField(t);
    return this.node(this._lexer.token, {
      kind: ae.OBJECT,
      fields: this.any(P.BRACE_L, n, P.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(P.COLON), this.node(n, {
      kind: ae.OBJECT_FIELD,
      name: r,
      value: this.parseValueLiteral(t)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(t) {
    const n = [];
    for (; this.peek(P.AT); )
      n.push(this.parseDirective(t));
    return n;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(t) {
    const n = this._lexer.token;
    return this.expectToken(P.AT), this.node(n, {
      kind: ae.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(t)
    });
  }
  // Implements the parsing rules in the Types section.
  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  parseTypeReference() {
    const t = this._lexer.token;
    let n;
    if (this.expectOptionalToken(P.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(P.BRACKET_R), n = this.node(t, {
        kind: ae.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(P.BANG) ? this.node(t, {
      kind: ae.NON_NULL_TYPE,
      type: n
    }) : n;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: ae.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(P.STRING) || this.peek(P.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  parseDescription() {
    if (this.peekDescription())
      return this.parseStringLiteral();
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */
  parseSchemaDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("schema");
    const r = this.parseConstDirectives(), s = this.many(
      P.BRACE_L,
      this.parseOperationTypeDefinition,
      P.BRACE_R
    );
    return this.node(t, {
      kind: ae.SCHEMA_DEFINITION,
      description: n,
      directives: r,
      operationTypes: s
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const t = this._lexer.token, n = this.parseOperationType();
    this.expectToken(P.COLON);
    const r = this.parseNamedType();
    return this.node(t, {
      kind: ae.OPERATION_TYPE_DEFINITION,
      operation: n,
      type: r
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("scalar");
    const r = this.parseName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: ae.SCALAR_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: s
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("type");
    const r = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    return this.node(t, {
      kind: ae.OBJECT_TYPE_DEFINITION,
      description: n,
      name: r,
      interfaces: s,
      directives: i,
      fields: o
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(P.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      P.BRACE_L,
      this.parseFieldDefinition,
      P.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(P.COLON);
    const i = this.parseTypeReference(), o = this.parseConstDirectives();
    return this.node(t, {
      kind: ae.FIELD_DEFINITION,
      description: n,
      name: r,
      arguments: s,
      type: i,
      directives: o
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  parseArgumentDefs() {
    return this.optionalMany(
      P.PAREN_L,
      this.parseInputValueDef,
      P.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(P.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(P.EQUALS) && (i = this.parseConstValueLiteral());
    const o = this.parseConstDirectives();
    return this.node(t, {
      kind: ae.INPUT_VALUE_DEFINITION,
      description: n,
      name: r,
      type: s,
      defaultValue: i,
      directives: o
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("interface");
    const r = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    return this.node(t, {
      kind: ae.INTERFACE_TYPE_DEFINITION,
      description: n,
      name: r,
      interfaces: s,
      directives: i,
      fields: o
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  parseUnionTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("union");
    const r = this.parseName(), s = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    return this.node(t, {
      kind: ae.UNION_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: s,
      types: i
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  parseUnionMemberTypes() {
    return this.expectOptionalToken(P.EQUALS) ? this.delimitedMany(P.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("enum");
    const r = this.parseName(), s = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    return this.node(t, {
      kind: ae.ENUM_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: s,
      values: i
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */
  parseEnumValuesDefinition() {
    return this.optionalMany(
      P.BRACE_L,
      this.parseEnumValueDefinition,
      P.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseEnumValueName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: ae.ENUM_VALUE_DEFINITION,
      description: n,
      name: r,
      directives: s
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw ht(
        this._lexer.source,
        this._lexer.token.start,
        `${Ur(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  parseInputObjectTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("input");
    const r = this.parseName(), s = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    return this.node(t, {
      kind: ae.INPUT_OBJECT_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: s,
      fields: i
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */
  parseInputFieldsDefinition() {
    return this.optionalMany(
      P.BRACE_L,
      this.parseInputValueDef,
      P.BRACE_R
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  parseTypeSystemExtension() {
    const t = this._lexer.lookahead();
    if (t.kind === P.NAME)
      switch (t.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(t);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const n = this.parseConstDirectives(), r = this.optionalMany(
      P.BRACE_L,
      this.parseOperationTypeDefinition,
      P.BRACE_R
    );
    if (n.length === 0 && r.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ae.SCHEMA_EXTENSION,
      directives: n,
      operationTypes: r
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const n = this.parseName(), r = this.parseConstDirectives();
    if (r.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ae.SCALAR_TYPE_EXTENSION,
      name: n,
      directives: r
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  parseObjectTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const n = this.parseName(), r = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (r.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ae.OBJECT_TYPE_EXTENSION,
      name: n,
      interfaces: r,
      directives: s,
      fields: i
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  parseInterfaceTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const n = this.parseName(), r = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (r.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ae.INTERFACE_TYPE_EXTENSION,
      name: n,
      interfaces: r,
      directives: s,
      fields: i
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  parseUnionTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const n = this.parseName(), r = this.parseConstDirectives(), s = this.parseUnionMemberTypes();
    if (r.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ae.UNION_TYPE_EXTENSION,
      name: n,
      directives: r,
      types: s
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  parseEnumTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const n = this.parseName(), r = this.parseConstDirectives(), s = this.parseEnumValuesDefinition();
    if (r.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ae.ENUM_TYPE_EXTENSION,
      name: n,
      directives: r,
      values: s
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  parseInputObjectTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const n = this.parseName(), r = this.parseConstDirectives(), s = this.parseInputFieldsDefinition();
    if (r.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ae.INPUT_OBJECT_TYPE_EXTENSION,
      name: n,
      directives: r,
      fields: s
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */
  parseDirectiveDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(P.AT);
    const r = this.parseName(), s = this.parseArgumentDefs(), i = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const o = this.parseDirectiveLocations();
    return this.node(t, {
      kind: ae.DIRECTIVE_DEFINITION,
      description: n,
      name: r,
      arguments: s,
      repeatable: i,
      locations: o
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  parseDirectiveLocations() {
    return this.delimitedMany(P.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  parseDirectiveLocation() {
    const t = this._lexer.token, n = this.parseName();
    if (Object.prototype.hasOwnProperty.call(bi, n.value))
      return n;
    throw this.unexpected(t);
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(t, n) {
    return this._options.noLocation !== !0 && (n.loc = new Kl(
      t,
      this._lexer.lastToken,
      this._lexer.source
    )), n;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(t) {
    return this._lexer.token.kind === t;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(t) {
    const n = this._lexer.token;
    if (n.kind === t)
      return this.advanceLexer(), n;
    throw ht(
      this._lexer.source,
      n.start,
      `Expected ${Q0(t)}, found ${Ur(n)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(t) {
    return this._lexer.token.kind === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(t) {
    const n = this._lexer.token;
    if (n.kind === P.NAME && n.value === t)
      this.advanceLexer();
    else
      throw ht(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${Ur(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const n = this._lexer.token;
    return n.kind === P.NAME && n.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const n = t ?? this._lexer.token;
    return ht(
      this._lexer.source,
      n.start,
      `Unexpected ${Ur(n)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(t, n, r) {
    this.expectToken(t);
    const s = [];
    for (; !this.expectOptionalToken(r); )
      s.push(n.call(this));
    return s;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(t, n, r) {
    if (this.expectOptionalToken(t)) {
      const s = [];
      do
        s.push(n.call(this));
      while (!this.expectOptionalToken(r));
      return s;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(t, n, r) {
    this.expectToken(t);
    const s = [];
    do
      s.push(n.call(this));
    while (!this.expectOptionalToken(r));
    return s;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(t, n) {
    this.expectOptionalToken(t);
    const r = [];
    do
      r.push(n.call(this));
    while (this.expectOptionalToken(t));
    return r;
  }
  advanceLexer() {
    const { maxTokens: t } = this._options, n = this._lexer.advance();
    if (t !== void 0 && n.kind !== P.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw ht(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function Ur(e) {
  const t = e.value;
  return Q0(e.kind) + (t != null ? ` "${t}"` : "");
}
function Q0(e) {
  return af(e) ? `"${e}"` : e;
}
const Rf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: Rr,
  parse: S0,
  parseConstValue: vf,
  parseType: xf,
  parseValue: _f
}, Symbol.toStringTag, { value: "Module" })), Sf = /* @__PURE__ */ Ui(Rf);
function Qf(e) {
  return `"${e.replace(Nf, Df)}"`;
}
const Nf = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Df(e) {
  return Tf[e.charCodeAt(0)];
}
const Tf = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  // 5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
], Ff = Object.freeze({});
function Mf(e, t, n = b0) {
  const r = /* @__PURE__ */ new Map();
  for (const M of Object.values(ae))
    r.set(M, Of(t, M));
  let s, i = Array.isArray(e), o = [e], u = -1, A = [], h = e, E, I;
  const _ = [], v = [];
  do {
    u++;
    const M = u === o.length, G = M && A.length !== 0;
    if (M) {
      if (E = v.length === 0 ? void 0 : _[_.length - 1], h = I, I = v.pop(), G)
        if (i) {
          h = h.slice();
          let W = 0;
          for (const [O, T] of A) {
            const k = O - W;
            T === null ? (h.splice(k, 1), W++) : h[k] = T;
          }
        } else {
          h = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(h)
          );
          for (const [W, O] of A)
            h[W] = O;
        }
      u = s.index, o = s.keys, A = s.edits, i = s.inArray, s = s.prev;
    } else if (I) {
      if (E = i ? u : o[u], h = I[E], h == null)
        continue;
      _.push(E);
    }
    let L;
    if (!Array.isArray(h)) {
      var R, C;
      Ra(h) || Kr(!1, `Invalid AST Node: ${Ao(h)}.`);
      const W = M ? (R = r.get(h.kind)) === null || R === void 0 ? void 0 : R.leave : (C = r.get(h.kind)) === null || C === void 0 ? void 0 : C.enter;
      if (L = W == null ? void 0 : W.call(t, h, E, I, _, v), L === Ff)
        break;
      if (L === !1) {
        if (!M) {
          _.pop();
          continue;
        }
      } else if (L !== void 0 && (A.push([E, L]), !M))
        if (Ra(L))
          h = L;
        else {
          _.pop();
          continue;
        }
    }
    if (L === void 0 && G && A.push([E, h]), M)
      _.pop();
    else {
      var F;
      s = {
        inArray: i,
        index: u,
        keys: o,
        edits: A,
        prev: s
      }, i = Array.isArray(h), o = i ? h : (F = n[h.kind]) !== null && F !== void 0 ? F : [], u = -1, A = [], I && v.push(I), I = h;
    }
  } while (s !== void 0);
  return A.length !== 0 ? A[A.length - 1][1] : e;
}
function Of(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function N0(e) {
  return Mf(e, kf);
}
const Lf = 80, kf = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => te(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = pe("(", te(e.variableDefinitions, ", "), ")"), n = te(
        [
          e.operation,
          te([e.name, t]),
          te(e.directives, " ")
        ],
        " "
      );
      return (n === "query" ? "" : n + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: n, directives: r }) => e + ": " + t + pe(" = ", n) + pe(" ", te(r, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => St(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", te(n, ", "), ")");
      return o.length > Lf && (o = i + pe(`(
`, es(te(n, `
`)), `
)`)), te([o, te(r, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + pe(" ", te(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: n }) => te(
      [
        "...",
        pe("on ", e),
        te(t, " "),
        n
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: n, directives: r, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${pe("(", te(n, ", "), ")")} on ${t} ${pe("", te(r, " "), " ")}` + s
    )
  },
  // Value
  IntValue: {
    leave: ({ value: e }) => e
  },
  FloatValue: {
    leave: ({ value: e }) => e
  },
  StringValue: {
    leave: ({ value: e, block: t }) => t ? sf(e) : Qf(e)
  },
  BooleanValue: {
    leave: ({ value: e }) => e ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: e }) => e
  },
  ListValue: {
    leave: ({ values: e }) => "[" + te(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + te(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + pe("(", te(t, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name: e }) => e
  },
  ListType: {
    leave: ({ type: e }) => "[" + e + "]"
  },
  NonNullType: {
    leave: ({ type: e }) => e + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description: e, directives: t, operationTypes: n }) => pe("", e, `
`) + te(["schema", te(t, " "), St(n)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + te(["scalar", t, te(n, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => pe("", e, `
`) + te(
      [
        "type",
        t,
        pe("implements ", te(n, " & ")),
        te(r, " "),
        St(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (Qa(n) ? pe(`(
`, es(te(n, `
`)), `
)`) : pe("(", te(n, ", "), ")")) + ": " + r + pe(" ", te(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: n, defaultValue: r, directives: s }) => pe("", e, `
`) + te(
      [t + ": " + n, pe("= ", r), te(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => pe("", e, `
`) + te(
      [
        "interface",
        t,
        pe("implements ", te(n, " & ")),
        te(r, " "),
        St(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, types: r }) => pe("", e, `
`) + te(
      ["union", t, te(n, " "), pe("= ", te(r, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, values: r }) => pe("", e, `
`) + te(["enum", t, te(n, " "), St(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + te([t, te(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + te(["input", t, te(n, " "), St(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (Qa(n) ? pe(`(
`, es(te(n, `
`)), `
)`) : pe("(", te(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + te(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => te(
      ["extend schema", te(e, " "), St(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => te(["extend scalar", e, te(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => te(
      [
        "extend type",
        e,
        pe("implements ", te(t, " & ")),
        te(n, " "),
        St(r)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => te(
      [
        "extend interface",
        e,
        pe("implements ", te(t, " & ")),
        te(n, " "),
        St(r)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: n }) => te(
      [
        "extend union",
        e,
        te(t, " "),
        pe("= ", te(n, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: n }) => te(["extend enum", e, te(t, " "), St(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => te(["extend input", e, te(t, " "), St(n)], " ")
  }
};
function te(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function St(e) {
  return pe(`{
`, es(te(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function es(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function Qa(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const Pf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: N0
}, Symbol.toStringTag, { value: "Module" })), Uf = /* @__PURE__ */ Ui(Pf);
var lo = {}, vs = {}, D0 = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, Gf = D0, T0 = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Gf;
}, Xf = T0, zf = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = Xf);
  var s, i = /* @__PURE__ */ new Map();
  function o(E, I) {
    var _ = i.get(I);
    _ ? _.push.apply(_, E) : i.set(I, E);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var u = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(E, I) {
        return o(["" + u + I], E), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(E, I) {
        var _ = e(E, "" + u + I, r);
        return _.files.forEach(o), _.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var A in t) {
        var h = e(t[A], "" + u + A, r);
        h.files.forEach(o), s[A] = h.clone;
      }
    } else
      s = t;
  }
  return {
    clone: s,
    files: i
  };
};
vs.ReactNativeFile = D0;
vs.extractFiles = zf;
vs.isExtractableFile = T0;
var Yf = typeof self == "object" ? self.FormData : window.FormData, Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.defaultJsonSerializer = void 0;
Sr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var Vf = Ee && Ee.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(lo, "__esModule", { value: !0 });
var F0 = vs, Hf = Vf(Yf), Zf = Sr, Wf = function(e) {
  return F0.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Jf(e, t, n, r) {
  r === void 0 && (r = Zf.defaultJsonSerializer);
  var s = F0.extractFiles({ query: e, variables: t, operationName: n }, "", Wf), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var u = e.reduce(function(_, v, R) {
      return _.push({ query: v, variables: t ? t[R] : void 0 }), _;
    }, []);
    return r.stringify(u);
  }
  var A = typeof FormData > "u" ? Hf.default : FormData, h = new A();
  h.append("operations", r.stringify(i));
  var E = {}, I = 0;
  return o.forEach(function(_) {
    E[++I] = _;
  }), h.append("map", r.stringify(E)), I = 0, o.forEach(function(_, v) {
    h.append("" + ++I, v);
  }), h;
}
lo.default = Jf;
var bt = {};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.parseBatchRequestsExtendedArgs = bt.parseRawRequestExtendedArgs = bt.parseRequestExtendedArgs = bt.parseBatchRequestArgs = bt.parseRawRequestArgs = bt.parseRequestArgs = void 0;
function qf(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
bt.parseRequestArgs = qf;
function jf(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
bt.parseRawRequestArgs = jf;
function $f(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
bt.parseBatchRequestArgs = $f;
function Kf(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
bt.parseRequestExtendedArgs = Kf;
function eh(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
bt.parseRawRequestExtendedArgs = eh;
function th(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
bt.parseBatchRequestsExtendedArgs = th;
var Qr = {}, nh = Ee && Ee.__extends || /* @__PURE__ */ function() {
  var e = function(t, n) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, s) {
      r.__proto__ = s;
    } || function(r, s) {
      for (var i in s)
        Object.prototype.hasOwnProperty.call(s, i) && (r[i] = s[i]);
    }, e(t, n);
  };
  return function(t, n) {
    if (typeof n != "function" && n !== null)
      throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
    e(t, n);
    function r() {
      this.constructor = t;
    }
    t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}();
Object.defineProperty(Qr, "__esModule", { value: !0 });
Qr.ClientError = void 0;
var rh = (
  /** @class */
  function(e) {
    nh(t, e);
    function t(n, r) {
      var s = this, i = t.extractMessage(n) + ": " + JSON.stringify({
        response: n,
        request: r
      });
      return s = e.call(this, i) || this, Object.setPrototypeOf(s, t.prototype), s.response = n, s.request = r, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(s, t), s;
    }
    return t.extractMessage = function(n) {
      try {
        return n.errors[0].message;
      } catch {
        return "GraphQL Error (Code: " + n.status + ")";
      }
    }, t;
  }(Error)
);
Qr.ClientError = rh;
var ir = {}, Na;
function sh() {
  if (Na)
    return ir;
  Na = 1;
  var e = Ee && Ee.__assign || function() {
    return e = Object.assign || function(O) {
      for (var T, k = 1, U = arguments.length; k < U; k++) {
        T = arguments[k];
        for (var q in T)
          Object.prototype.hasOwnProperty.call(T, q) && (O[q] = T[q]);
      }
      return O;
    }, e.apply(this, arguments);
  }, t = Ee && Ee.__awaiter || function(O, T, k, U) {
    function q(Y) {
      return Y instanceof k ? Y : new k(function(H) {
        H(Y);
      });
    }
    return new (k || (k = Promise))(function(Y, H) {
      function ee(c) {
        try {
          a(U.next(c));
        } catch (l) {
          H(l);
        }
      }
      function b(c) {
        try {
          a(U.throw(c));
        } catch (l) {
          H(l);
        }
      }
      function a(c) {
        c.done ? Y(c.value) : q(c.value).then(ee, b);
      }
      a((U = U.apply(O, T || [])).next());
    });
  }, n = Ee && Ee.__generator || function(O, T) {
    var k = { label: 0, sent: function() {
      if (Y[0] & 1)
        throw Y[1];
      return Y[1];
    }, trys: [], ops: [] }, U, q, Y, H;
    return H = { next: ee(0), throw: ee(1), return: ee(2) }, typeof Symbol == "function" && (H[Symbol.iterator] = function() {
      return this;
    }), H;
    function ee(a) {
      return function(c) {
        return b([a, c]);
      };
    }
    function b(a) {
      if (U)
        throw new TypeError("Generator is already executing.");
      for (; k; )
        try {
          if (U = 1, q && (Y = a[0] & 2 ? q.return : a[0] ? q.throw || ((Y = q.return) && Y.call(q), 0) : q.next) && !(Y = Y.call(q, a[1])).done)
            return Y;
          switch (q = 0, Y && (a = [a[0] & 2, Y.value]), a[0]) {
            case 0:
            case 1:
              Y = a;
              break;
            case 4:
              return k.label++, { value: a[1], done: !1 };
            case 5:
              k.label++, q = a[1], a = [0];
              continue;
            case 7:
              a = k.ops.pop(), k.trys.pop();
              continue;
            default:
              if (Y = k.trys, !(Y = Y.length > 0 && Y[Y.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                k = 0;
                continue;
              }
              if (a[0] === 3 && (!Y || a[1] > Y[0] && a[1] < Y[3])) {
                k.label = a[1];
                break;
              }
              if (a[0] === 6 && k.label < Y[1]) {
                k.label = Y[1], Y = a;
                break;
              }
              if (Y && k.label < Y[2]) {
                k.label = Y[2], k.ops.push(a);
                break;
              }
              Y[2] && k.ops.pop(), k.trys.pop();
              continue;
          }
          a = T.call(O, k);
        } catch (c) {
          a = [6, c], q = 0;
        } finally {
          U = Y = 0;
        }
      if (a[0] & 5)
        throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(ir, "__esModule", { value: !0 }), ir.GraphQLWebSocketClient = void 0;
  var r = Qr, s = M0(), i = "connection_init", o = "connection_ack", u = "ping", A = "pong", h = "subscribe", E = "next", I = "error", _ = "complete", v = (
    /** @class */
    function() {
      function O(T, k, U) {
        this._type = T, this._payload = k, this._id = U;
      }
      return Object.defineProperty(O.prototype, "type", {
        get: function() {
          return this._type;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(O.prototype, "id", {
        get: function() {
          return this._id;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(O.prototype, "payload", {
        get: function() {
          return this._payload;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(O.prototype, "text", {
        get: function() {
          var T = { type: this.type };
          return this.id != null && this.id != null && (T.id = this.id), this.payload != null && this.payload != null && (T.payload = this.payload), JSON.stringify(T);
        },
        enumerable: !1,
        configurable: !0
      }), O.parse = function(T, k) {
        var U = JSON.parse(T), q = U.type, Y = U.payload, H = U.id;
        return new O(q, k(Y), H);
      }, O;
    }()
  ), R = (
    /** @class */
    function() {
      function O(T, k) {
        var U = this, q = k.onInit, Y = k.onAcknowledged, H = k.onPing, ee = k.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = T, T.onopen = function(b) {
          return t(U, void 0, void 0, function() {
            var a, c, l, p;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, c = (a = T).send, l = F, q ? [4, q()] : [3, 2];
                case 1:
                  return p = f.sent(), [3, 3];
                case 2:
                  p = null, f.label = 3;
                case 3:
                  return c.apply(a, [l.apply(void 0, [p]).text]), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, T.onclose = function(b) {
          U.socketState.acknowledged = !1, U.socketState.subscriptions = {};
        }, T.onerror = function(b) {
          console.error(b);
        }, T.onmessage = function(b) {
          try {
            var a = C(b.data);
            switch (a.type) {
              case o: {
                U.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (U.socketState.acknowledged = !0, Y && Y(a.payload));
                return;
              }
              case u: {
                H ? H(a.payload).then(function(w) {
                  return T.send(G(w).text);
                }) : T.send(G(null).text);
                return;
              }
              case A: {
                ee && ee(a.payload);
                return;
              }
            }
            if (!U.socketState.acknowledged || a.id === void 0 || a.id === null || !U.socketState.subscriptions[a.id])
              return;
            var c = U.socketState.subscriptions[a.id], l = c.query, p = c.variables, f = c.subscriber;
            switch (a.type) {
              case E: {
                !a.payload.errors && a.payload.data && f.next && f.next(a.payload.data), a.payload.errors && f.error && f.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: l, variables: p }));
                return;
              }
              case I: {
                f.error && f.error(new r.ClientError({ errors: a.payload, status: 200 }, { query: l, variables: p }));
                return;
              }
              case _: {
                f.complete && f.complete(), delete U.socketState.subscriptions[a.id];
                return;
              }
            }
          } catch (w) {
            console.error(w), T.close(1006);
          }
          T.close(4400, "Unknown graphql-ws message.");
        };
      }
      return O.prototype.makeSubscribe = function(T, k, U, q) {
        var Y = this, H = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[H] = { query: T, variables: U, subscriber: q }, this.socket.send(L(H, { query: T, operationName: k, variables: U }).text), function() {
          Y.socket.send(W(H).text), delete Y.socketState.subscriptions[H];
        };
      }, O.prototype.rawRequest = function(T, k) {
        var U = this;
        return new Promise(function(q, Y) {
          var H;
          U.rawSubscribe(T, {
            next: function(ee, b) {
              return H = { data: ee, extensions: b };
            },
            error: Y,
            complete: function() {
              return q(H);
            }
          }, k);
        });
      }, O.prototype.request = function(T, k) {
        var U = this;
        return new Promise(function(q, Y) {
          var H;
          U.subscribe(T, {
            next: function(ee) {
              return H = ee;
            },
            error: Y,
            complete: function() {
              return q(H);
            }
          }, k);
        });
      }, O.prototype.subscribe = function(T, k, U) {
        var q = s.resolveRequestDocument(T), Y = q.query, H = q.operationName;
        return this.makeSubscribe(Y, H, U, k);
      }, O.prototype.rawSubscribe = function(T, k, U) {
        return this.makeSubscribe(T, void 0, U, k);
      }, O.prototype.ping = function(T) {
        this.socket.send(M(T).text);
      }, O.prototype.close = function() {
        this.socket.close(1e3);
      }, O.PROTOCOL = "graphql-transport-ws", O;
    }()
  );
  ir.GraphQLWebSocketClient = R;
  function C(O, T) {
    T === void 0 && (T = function(U) {
      return U;
    });
    var k = v.parse(O, T);
    return k;
  }
  function F(O) {
    return new v(i, O);
  }
  function M(O) {
    return new v(u, O, void 0);
  }
  function G(O) {
    return new v(A, O, void 0);
  }
  function L(O, T) {
    return new v(h, T, O);
  }
  function W(O) {
    return new v(_, void 0, O);
  }
  return ir;
}
var Da;
function M0() {
  return Da || (Da = 1, function(e) {
    var t = Ee && Ee.__assign || function() {
      return t = Object.assign || function(f) {
        for (var w, y = 1, g = arguments.length; y < g; y++) {
          w = arguments[y];
          for (var d in w)
            Object.prototype.hasOwnProperty.call(w, d) && (f[d] = w[d]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = Ee && Ee.__createBinding || (Object.create ? function(f, w, y, g) {
      g === void 0 && (g = y), Object.defineProperty(f, g, { enumerable: !0, get: function() {
        return w[y];
      } });
    } : function(f, w, y, g) {
      g === void 0 && (g = y), f[g] = w[y];
    }), r = Ee && Ee.__setModuleDefault || (Object.create ? function(f, w) {
      Object.defineProperty(f, "default", { enumerable: !0, value: w });
    } : function(f, w) {
      f.default = w;
    }), s = Ee && Ee.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var w = {};
      if (f != null)
        for (var y in f)
          y !== "default" && Object.prototype.hasOwnProperty.call(f, y) && n(w, f, y);
      return r(w, f), w;
    }, i = Ee && Ee.__awaiter || function(f, w, y, g) {
      function d(m) {
        return m instanceof y ? m : new y(function(Z) {
          Z(m);
        });
      }
      return new (y || (y = Promise))(function(m, Z) {
        function J(re) {
          try {
            j(g.next(re));
          } catch (se) {
            Z(se);
          }
        }
        function K(re) {
          try {
            j(g.throw(re));
          } catch (se) {
            Z(se);
          }
        }
        function j(re) {
          re.done ? m(re.value) : d(re.value).then(J, K);
        }
        j((g = g.apply(f, w || [])).next());
      });
    }, o = Ee && Ee.__generator || function(f, w) {
      var y = { label: 0, sent: function() {
        if (m[0] & 1)
          throw m[1];
        return m[1];
      }, trys: [], ops: [] }, g, d, m, Z;
      return Z = { next: J(0), throw: J(1), return: J(2) }, typeof Symbol == "function" && (Z[Symbol.iterator] = function() {
        return this;
      }), Z;
      function J(j) {
        return function(re) {
          return K([j, re]);
        };
      }
      function K(j) {
        if (g)
          throw new TypeError("Generator is already executing.");
        for (; y; )
          try {
            if (g = 1, d && (m = j[0] & 2 ? d.return : j[0] ? d.throw || ((m = d.return) && m.call(d), 0) : d.next) && !(m = m.call(d, j[1])).done)
              return m;
            switch (d = 0, m && (j = [j[0] & 2, m.value]), j[0]) {
              case 0:
              case 1:
                m = j;
                break;
              case 4:
                return y.label++, { value: j[1], done: !1 };
              case 5:
                y.label++, d = j[1], j = [0];
                continue;
              case 7:
                j = y.ops.pop(), y.trys.pop();
                continue;
              default:
                if (m = y.trys, !(m = m.length > 0 && m[m.length - 1]) && (j[0] === 6 || j[0] === 2)) {
                  y = 0;
                  continue;
                }
                if (j[0] === 3 && (!m || j[1] > m[0] && j[1] < m[3])) {
                  y.label = j[1];
                  break;
                }
                if (j[0] === 6 && y.label < m[1]) {
                  y.label = m[1], m = j;
                  break;
                }
                if (m && y.label < m[2]) {
                  y.label = m[2], y.ops.push(j);
                  break;
                }
                m[2] && y.ops.pop(), y.trys.pop();
                continue;
            }
            j = w.call(f, y);
          } catch (re) {
            j = [6, re], d = 0;
          } finally {
            g = m = 0;
          }
        if (j[0] & 5)
          throw j[1];
        return { value: j[0] ? j[1] : void 0, done: !0 };
      }
    }, u = Ee && Ee.__rest || function(f, w) {
      var y = {};
      for (var g in f)
        Object.prototype.hasOwnProperty.call(f, g) && w.indexOf(g) < 0 && (y[g] = f[g]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var d = 0, g = Object.getOwnPropertySymbols(f); d < g.length; d++)
          w.indexOf(g[d]) < 0 && Object.prototype.propertyIsEnumerable.call(f, g[d]) && (y[g[d]] = f[g[d]]);
      return y;
    }, A = Ee && Ee.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var h = s(Zl), E = h, I = Sf, _ = Uf, v = A(lo), R = Sr, C = bt, F = Qr;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return F.ClientError;
    } });
    var M = function(f) {
      var w = {};
      return f && (typeof Headers < "u" && f instanceof Headers || E && E.Headers && f instanceof E.Headers ? w = l(f) : Array.isArray(f) ? f.forEach(function(y) {
        var g = y[0], d = y[1];
        w[g] = d;
      }) : w = f), w;
    }, G = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, L = function(f) {
      var w = f.query, y = f.variables, g = f.operationName, d = f.jsonSerializer;
      if (!Array.isArray(w)) {
        var m = ["query=" + encodeURIComponent(G(w))];
        return y && m.push("variables=" + encodeURIComponent(d.stringify(y))), g && m.push("operationName=" + encodeURIComponent(g)), m.join("&");
      }
      if (typeof y < "u" && !Array.isArray(y))
        throw new Error("Cannot create query with given variable type, array expected");
      var Z = w.reduce(function(J, K, j) {
        return J.push({
          query: G(K),
          variables: y ? d.stringify(y[j]) : void 0
        }), J;
      }, []);
      return "query=" + encodeURIComponent(d.stringify(Z));
    }, W = function(f) {
      var w = f.url, y = f.query, g = f.variables, d = f.operationName, m = f.headers, Z = f.fetch, J = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var j, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return j = v.default(y, g, d, J.jsonSerializer), re = t({ method: "POST", headers: t(t({}, typeof j == "string" ? { "Content-Type": "application/json" } : {}), m), body: j }, J), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, Z(w, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, O = function(f) {
      var w = f.url, y = f.query, g = f.variables, d = f.operationName, m = f.headers, Z = f.fetch, J = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var j, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return j = L({
                query: y,
                variables: g,
                operationName: d,
                jsonSerializer: J.jsonSerializer
              }), re = t({ method: "GET", headers: m }, J), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, Z(w + "?" + j, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, T = (
      /** @class */
      function() {
        function f(w, y) {
          y === void 0 && (y = {}), this.url = w, this.options = y;
        }
        return f.prototype.rawRequest = function(w, y, g) {
          return i(this, void 0, void 0, function() {
            var d, m, Z, J, K, j, re, se, Se, fe, oe, ve;
            return o(this, function(Ae) {
              return d = C.parseRawRequestArgs(w, y, g), m = this.options, Z = m.headers, J = m.fetch, K = J === void 0 ? h.default : J, j = m.method, re = j === void 0 ? "POST" : j, se = m.requestMiddleware, Se = m.responseMiddleware, fe = u(m, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, d.signal !== void 0 && (fe.signal = d.signal), ve = b(d.query).operationName, [2, k({
                url: oe,
                query: d.query,
                variables: d.variables,
                headers: t(t({}, M(a(Z))), M(d.requestHeaders)),
                operationName: ve,
                fetch: K,
                method: re,
                fetchOptions: fe,
                middleware: se
              }).then(function(he) {
                return Se && Se(he), he;
              }).catch(function(he) {
                throw Se && Se(he), he;
              })];
            });
          });
        }, f.prototype.request = function(w) {
          for (var y = [], g = 1; g < arguments.length; g++)
            y[g - 1] = arguments[g];
          var d = y[0], m = y[1], Z = C.parseRequestArgs(w, d, m), J = this.options, K = J.headers, j = J.fetch, re = j === void 0 ? h.default : j, se = J.method, Se = se === void 0 ? "POST" : se, fe = J.requestMiddleware, oe = J.responseMiddleware, ve = u(J, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), Ae = this.url;
          Z.signal !== void 0 && (ve.signal = Z.signal);
          var he = b(Z.document), Tt = he.query, xe = he.operationName;
          return k({
            url: Ae,
            query: Tt,
            variables: Z.variables,
            headers: t(t({}, M(a(K))), M(Z.requestHeaders)),
            operationName: xe,
            fetch: re,
            method: Se,
            fetchOptions: ve,
            middleware: fe
          }).then(function(ye) {
            return oe && oe(ye), ye.data;
          }).catch(function(ye) {
            throw oe && oe(ye), ye;
          });
        }, f.prototype.batchRequests = function(w, y) {
          var g = C.parseBatchRequestArgs(w, y), d = this.options, m = d.headers, Z = d.fetch, J = Z === void 0 ? h.default : Z, K = d.method, j = K === void 0 ? "POST" : K, re = d.requestMiddleware, se = d.responseMiddleware, Se = u(d, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), fe = this.url;
          g.signal !== void 0 && (Se.signal = g.signal);
          var oe = g.documents.map(function(Ae) {
            var he = Ae.document;
            return b(he).query;
          }), ve = g.documents.map(function(Ae) {
            var he = Ae.variables;
            return he;
          });
          return k({
            url: fe,
            query: oe,
            variables: ve,
            headers: t(t({}, M(a(m))), M(g.requestHeaders)),
            operationName: void 0,
            fetch: J,
            method: j,
            fetchOptions: Se,
            middleware: re
          }).then(function(Ae) {
            return se && se(Ae), Ae.data;
          }).catch(function(Ae) {
            throw se && se(Ae), Ae;
          });
        }, f.prototype.setHeaders = function(w) {
          return this.options.headers = w, this;
        }, f.prototype.setHeader = function(w, y) {
          var g, d = this.options.headers;
          return d ? d[w] = y : this.options.headers = (g = {}, g[w] = y, g), this;
        }, f.prototype.setEndpoint = function(w) {
          return this.url = w, this;
        }, f;
      }()
    );
    e.GraphQLClient = T;
    function k(f) {
      var w = f.url, y = f.query, g = f.variables, d = f.headers, m = f.operationName, Z = f.fetch, J = f.method, K = J === void 0 ? "POST" : J, j = f.fetchOptions, re = f.middleware;
      return i(this, void 0, void 0, function() {
        var se, Se, fe, oe, ve, Ae, he, Tt, xe, ye, rr;
        return o(this, function(Qe) {
          switch (Qe.label) {
            case 0:
              return se = K.toUpperCase() === "POST" ? W : O, Se = Array.isArray(y), [4, se({
                url: w,
                query: y,
                variables: g,
                operationName: m,
                headers: d,
                fetch: Z,
                fetchOptions: j,
                middleware: re
              })];
            case 1:
              return fe = Qe.sent(), [4, H(fe, j.jsonSerializer)];
            case 2:
              if (oe = Qe.sent(), ve = Se && Array.isArray(oe) ? !oe.some(function(Te) {
                var Fr = Te.data;
                return !Fr;
              }) : !!oe.data, Ae = !oe.errors || j.errorPolicy === "all" || j.errorPolicy === "ignore", fe.ok && Ae && ve)
                return he = fe.headers, Tt = fe.status, oe.errors, xe = u(oe, ["errors"]), ye = j.errorPolicy === "ignore" ? xe : oe, [2, t(t({}, Se ? { data: ye } : ye), { headers: he, status: Tt })];
              throw rr = typeof oe == "string" ? { error: oe } : oe, new F.ClientError(t(t({}, rr), { status: fe.status, headers: fe.headers }), { query: y, variables: g });
          }
        });
      });
    }
    function U(f, w, y, g) {
      return i(this, void 0, void 0, function() {
        var d, m;
        return o(this, function(Z) {
          return d = C.parseRawRequestExtendedArgs(f, w, y, g), m = new T(d.url), [2, m.rawRequest(t({}, d))];
        });
      });
    }
    e.rawRequest = U;
    function q(f, w) {
      for (var y = [], g = 2; g < arguments.length; g++)
        y[g - 2] = arguments[g];
      return i(this, void 0, void 0, function() {
        var d, m, Z, J;
        return o(this, function(K) {
          return d = y[0], m = y[1], Z = C.parseRequestExtendedArgs(f, w, d, m), J = new T(Z.url), [2, J.request(t({}, Z))];
        });
      });
    }
    e.request = q;
    function Y(f, w, y) {
      return i(this, void 0, void 0, function() {
        var g, d;
        return o(this, function(m) {
          return g = C.parseBatchRequestsExtendedArgs(f, w, y), d = new T(g.url), [2, d.batchRequests(t({}, g))];
        });
      });
    }
    e.batchRequests = Y, e.default = q;
    function H(f, w) {
      return w === void 0 && (w = R.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var y, g, d;
        return o(this, function(m) {
          switch (m.label) {
            case 0:
              return f.headers.forEach(function(Z, J) {
                J.toLowerCase() === "content-type" && (y = Z);
              }), y && y.toLowerCase().startsWith("application/json") ? (d = (g = w).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, d.apply(g, [m.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function ee(f) {
      var w, y = void 0, g = f.definitions.filter(function(d) {
        return d.kind === "OperationDefinition";
      });
      return g.length === 1 && (y = (w = g[0].name) === null || w === void 0 ? void 0 : w.value), y;
    }
    function b(f) {
      if (typeof f == "string") {
        var w = void 0;
        try {
          var y = I.parse(f);
          w = ee(y);
        } catch {
        }
        return { query: f, operationName: w };
      }
      var g = ee(f);
      return { query: _.print(f), operationName: g };
    }
    e.resolveRequestDocument = b;
    function a(f) {
      return typeof f == "function" ? f() : f;
    }
    function c(f) {
      for (var w = [], y = 1; y < arguments.length; y++)
        w[y - 1] = arguments[y];
      return f.reduce(function(g, d, m) {
        return "" + g + d + (m in w ? w[m] : "");
      }, "");
    }
    e.gql = c;
    function l(f) {
      var w = {};
      return f.forEach(function(y, g) {
        w[g] = y;
      }), w;
    }
    var p = sh();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return p.GraphQLWebSocketClient;
    } });
  }(ni)), ni;
}
var ih = M0(), fs = function() {
  return fs = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, fs.apply(this, arguments);
};
var ts = /* @__PURE__ */ new Map(), Bi = /* @__PURE__ */ new Map(), O0 = !0, hs = !1;
function L0(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function oh(e) {
  return L0(e.source.body.substring(e.start, e.end));
}
function ah(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = oh(r.loc), o = Bi.get(s);
      o && !o.has(i) ? O0 && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Bi.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), fs(fs({}, e), { definitions: n });
}
function ch(e) {
  var t = new Set(e.definitions);
  t.forEach(function(r) {
    r.loc && delete r.loc, Object.keys(r).forEach(function(s) {
      var i = r[s];
      i && typeof i == "object" && t.add(i);
    });
  });
  var n = e.loc;
  return n && (delete n.startToken, delete n.endToken), e;
}
function uh(e) {
  var t = L0(e);
  if (!ts.has(t)) {
    var n = S0(e, {
      experimentalFragmentVariables: hs,
      allowLegacyFragmentVariables: hs
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    ts.set(t, ch(ah(n)));
  }
  return ts.get(t);
}
function jn(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), uh(r);
}
function dh() {
  ts.clear(), Bi.clear();
}
function Ah() {
  O0 = !1;
}
function lh() {
  hs = !0;
}
function fh() {
  hs = !1;
}
var or = {
  gql: jn,
  resetCaches: dh,
  disableFragmentWarnings: Ah,
  enableExperimentalFragmentVariables: lh,
  disableExperimentalFragmentVariables: fh
};
(function(e) {
  e.gql = or.gql, e.resetCaches = or.resetCaches, e.disableFragmentWarnings = or.disableFragmentWarnings, e.enableExperimentalFragmentVariables = or.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = or.disableExperimentalFragmentVariables;
})(jn || (jn = {}));
jn.default = jn;
const ne = jn;
var Ne = "0x0000000000000000000000000000000000000000000000000000000000000000", Kw = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", ey = 16 * 1024, ty = 16, ny = 1024 * 1024 * 1024, ry = 1024 * 1024 * 1024, sy = 255, iy = 1024 * 1024, oy = 1024 * 1024, hh = "0xffffffffffff0000", k0 = "0xffffffffffff0001", gh = "0xffffffffffff0003", ph = "0xffffffffffff0004", mh = "0xffffffffffff0005", ay = "0x0", wh = [
  "UnknownPanicReason",
  "Revert",
  "OutOfGas",
  "TransactionValidity",
  "MemoryOverflow",
  "ArithmeticOverflow",
  "ContractNotFound",
  "MemoryOwnership",
  "NotEnoughBalance",
  "ExpectedInternalContext",
  "AssetIdNotFound",
  "InputNotFound",
  "OutputNotFound",
  "WitnessNotFound",
  "TransactionMaturity",
  "InvalidMetadataIdentifier",
  "MalformedCallStructure",
  "ReservedRegisterNotWritable",
  "InvalidFlags",
  "InvalidImmediateValue",
  "ExpectedCoinInput",
  "EcalError",
  "MemoryWriteOverlap",
  "ContractNotInInputs",
  "InternalBalanceOverflow",
  "ContractMaxSize",
  "ExpectedUnallocatedStack",
  "MaxStaticContractsReached",
  "TransferAmountCannotBeZero",
  "ExpectedOutputVariable",
  "ExpectedParentInternalContext",
  "PredicateReturnedNonOne",
  "ContractIdAlreadyDeployed",
  "ContractMismatch",
  "MessageDataTooLong",
  "ArithmeticError",
  "ContractInstructionNotAllowed",
  "TransferZeroCoins",
  "InvalidInstruction",
  "MemoryNotExecutable",
  "PolicyIsNotSet",
  "PolicyNotFound",
  "TooManyReceipts",
  "BalanceOverflow",
  "InvalidBlockHeight",
  "TooManySlots"
], yh = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let Q;
const P0 = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && P0.decode();
let Ar = null;
function U0() {
  return (Ar === null || Ar.byteLength === 0) && (Ar = new Uint8Array(Q.memory.buffer)), Ar;
}
function Ih(e, t) {
  return e = e >>> 0, P0.decode(U0().subarray(e, e + t));
}
function G0(e) {
  const t = Q.ret(e);
  return Xt.__wrap(t);
}
function Ta(e, t, n, r) {
  const s = Q.call(e, t, n, r);
  return Xt.__wrap(s);
}
function Eh(e, t, n) {
  const r = Q.tr(e, t, n);
  return Xt.__wrap(r);
}
function Fa(e, t, n) {
  const r = Q.addi(e, t, n);
  return Xt.__wrap(r);
}
function _i(e, t, n) {
  const r = Q.lw(e, t, n);
  return Xt.__wrap(r);
}
function bh(e, t, n) {
  const r = Q.gtf(e, t, n);
  return Xt.__wrap(r);
}
function Gr(e, t) {
  const n = Q.movi(e, t);
  return Xt.__wrap(n);
}
let lr = null;
function Ma() {
  return (lr === null || lr.byteLength === 0) && (lr = new Int32Array(Q.memory.buffer)), lr;
}
function Ch(e, t) {
  return e = e >>> 0, U0().subarray(e / 1, e / 1 + t);
}
const Bh = Object.freeze({
  /**
  *r" Set `$rA` to `tx.type`
  */
  Type: 1,
  1: "Type",
  /**
  *r" Set `$rA` to `tx.scriptGasLimit`
  */
  ScriptGasLimit: 2,
  2: "ScriptGasLimit",
  /**
  *r" Set `$rA` to `tx.scriptLength`
  */
  ScriptLength: 3,
  3: "ScriptLength",
  /**
  *r" Set `$rA` to `tx.scriptDataLength`
  */
  ScriptDataLength: 4,
  4: "ScriptDataLength",
  /**
  *r" Set `$rA` to `tx.inputsCount`
  */
  ScriptInputsCount: 5,
  5: "ScriptInputsCount",
  /**
  *r" Set `$rA` to `tx.outputsCount`
  */
  ScriptOutputsCount: 6,
  6: "ScriptOutputsCount",
  /**
  *r" Set `$rA` to `tx.witnessesCount`
  */
  ScriptWitnessesCount: 7,
  7: "ScriptWitnessesCount",
  /**
  *r" Set `$rA` to `Memory address of tx.receiptsRoot`
  */
  ScriptReceiptsRoot: 8,
  8: "ScriptReceiptsRoot",
  /**
  *r" Set `$rA` to `Memory address of tx.script`
  */
  Script: 9,
  9: "Script",
  /**
  *r" Set `$rA` to `Memory address of tx.scriptData`
  */
  ScriptData: 10,
  10: "ScriptData",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB]`
  */
  ScriptInputAtIndex: 11,
  11: "ScriptInputAtIndex",
  /**
  *r" Set `$rA` to `Memory address of t.outputs[$rB]`
  */
  ScriptOutputAtIndex: 12,
  12: "ScriptOutputAtIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
  */
  ScriptWitnessAtIndex: 13,
  13: "ScriptWitnessAtIndex",
  /**
  *r" Set `$rA` to size of the transaction in memory, in bytes
  */
  TxLength: 14,
  14: "TxLength",
  /**
  *r" Set `$rA` to `tx.bytecodeWitnessIndex`
  */
  CreateBytecodeWitnessIndex: 257,
  257: "CreateBytecodeWitnessIndex",
  /**
  *r" Set `$rA` to `tx.storageSlotsCount`
  */
  CreateStorageSlotsCount: 258,
  258: "CreateStorageSlotsCount",
  /**
  *r" Set `$rA` to `tx.inputsCount`
  */
  CreateInputsCount: 259,
  259: "CreateInputsCount",
  /**
  *r" Set `$rA` to `tx.outputsCount`
  */
  CreateOutputsCount: 260,
  260: "CreateOutputsCount",
  /**
  *r" Set `$rA` to `tx.witnessesCount`
  */
  CreateWitnessesCount: 261,
  261: "CreateWitnessesCount",
  /**
  *r" Set `$rA` to `Memory address of tx.salt`
  */
  CreateSalt: 262,
  262: "CreateSalt",
  /**
  *r" Set `$rA` to `Memory address of tx.storageSlots[$rB]`
  */
  CreateStorageSlotAtIndex: 263,
  263: "CreateStorageSlotAtIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB]`
  */
  CreateInputAtIndex: 264,
  264: "CreateInputAtIndex",
  /**
  *r" Set `$rA` to `Memory address of t.outputs[$rB]`
  */
  CreateOutputAtIndex: 265,
  265: "CreateOutputAtIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
  */
  CreateWitnessAtIndex: 266,
  266: "CreateWitnessAtIndex",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].type`
  */
  InputType: 512,
  512: "InputType",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].txID`
  */
  InputCoinTxId: 513,
  513: "InputCoinTxId",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].outputIndex`
  */
  InputCoinOutputIndex: 514,
  514: "InputCoinOutputIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].owner`
  */
  InputCoinOwner: 515,
  515: "InputCoinOwner",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].amount`
  */
  InputCoinAmount: 516,
  516: "InputCoinAmount",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].asset_id`
  */
  InputCoinAssetId: 517,
  517: "InputCoinAssetId",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
  */
  InputCoinTxPointer: 518,
  518: "InputCoinTxPointer",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].witnessIndex`
  */
  InputCoinWitnessIndex: 519,
  519: "InputCoinWitnessIndex",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].predicateLength`
  */
  InputCoinPredicateLength: 521,
  521: "InputCoinPredicateLength",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].predicateDataLength`
  */
  InputCoinPredicateDataLength: 522,
  522: "InputCoinPredicateDataLength",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
  */
  InputCoinPredicate: 523,
  523: "InputCoinPredicate",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
  */
  InputCoinPredicateData: 524,
  524: "InputCoinPredicateData",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
  */
  InputCoinPredicateGasUsed: 525,
  525: "InputCoinPredicateGasUsed",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].txID`
  */
  InputContractTxId: 544,
  544: "InputContractTxId",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].outputIndex`
  */
  InputContractOutputIndex: 545,
  545: "InputContractOutputIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].contractID`
  */
  InputContractId: 549,
  549: "InputContractId",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].sender`
  */
  InputMessageSender: 576,
  576: "InputMessageSender",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].recipient`
  */
  InputMessageRecipient: 577,
  577: "InputMessageRecipient",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].amount`
  */
  InputMessageAmount: 578,
  578: "InputMessageAmount",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].nonce`
  */
  InputMessageNonce: 579,
  579: "InputMessageNonce",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].witnessIndex`
  */
  InputMessageWitnessIndex: 580,
  580: "InputMessageWitnessIndex",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].dataLength`
  */
  InputMessageDataLength: 581,
  581: "InputMessageDataLength",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].predicateLength`
  */
  InputMessagePredicateLength: 582,
  582: "InputMessagePredicateLength",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].predicateDataLength`
  */
  InputMessagePredicateDataLength: 583,
  583: "InputMessagePredicateDataLength",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].data`
  */
  InputMessageData: 584,
  584: "InputMessageData",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
  */
  InputMessagePredicate: 585,
  585: "InputMessagePredicate",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
  */
  InputMessagePredicateData: 586,
  586: "InputMessagePredicateData",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
  */
  InputMessagePredicateGasUsed: 587,
  587: "InputMessagePredicateGasUsed",
  /**
  *r" Set `$rA` to `tx.outputs[$rB].type`
  */
  OutputType: 768,
  768: "OutputType",
  /**
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].to`
  */
  OutputCoinTo: 769,
  769: "OutputCoinTo",
  /**
  *r" Set `$rA` to `tx.outputs[$rB].amount`
  */
  OutputCoinAmount: 770,
  770: "OutputCoinAmount",
  /**
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].asset_id`
  */
  OutputCoinAssetId: 771,
  771: "OutputCoinAssetId",
  /**
  *r" Set `$rA` to `tx.outputs[$rB].inputIndex`
  */
  OutputContractInputIndex: 772,
  772: "OutputContractInputIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].contractID`
  */
  OutputContractCreatedContractId: 775,
  775: "OutputContractCreatedContractId",
  /**
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
  */
  OutputContractCreatedStateRoot: 776,
  776: "OutputContractCreatedStateRoot",
  /**
  *r" Set `$rA` to `tx.witnesses[$rB].dataLength`
  */
  WitnessDataLength: 1024,
  1024: "WitnessDataLength",
  /**
  *r" Set `$rA` to `Memory address of tx.witnesses[$rB].data`
  */
  WitnessData: 1025,
  1025: "WitnessData",
  /**
  *r" Set `$rA` to `tx.policyTypes`
  */
  PolicyTypes: 1280,
  1280: "PolicyTypes",
  /**
  *r" Set `$rA` to `tx.policies[0x00].gasPrice`
  */
  PolicyTip: 1281,
  1281: "PolicyTip",
  /**
  *r" Set `$rA` to `tx.policies[count_ones(0b11 & tx.policyTypes) - 1].witnessLimit`
  */
  PolicyWitnessLimit: 1282,
  1282: "PolicyWitnessLimit",
  /**
  *r" Set `$rA` to `tx.policies[count_ones(0b111 & tx.policyTypes) - 1].maturity`
  */
  PolicyMaturity: 1283,
  1283: "PolicyMaturity",
  /**
  *r" Set `$rA` to `tx.policies[count_ones(0b1111 & tx.policyTypes) - 1].maxFee`
  */
  PolicyMaxFee: 1284,
  1284: "PolicyMaxFee"
});
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_add_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_addi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_aloc_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_and_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_andi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_bal_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_bhei_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_bhsh_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_burn_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_call_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_cb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ccp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_cfe_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_cfei_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_cfs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_cfsi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_croo_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_csiz_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_compareargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_div_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_divi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_divargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ecal_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_eck1_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ecr1_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ed19_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_eq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_exp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_expi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_flag_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_gm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_gt_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_gtf_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_imm06_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_imm12_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_imm18_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_imm24_free(e >>> 0));
const Oa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => Q.__wbg_instruction_free(e >>> 0));
class Xt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Xt.prototype);
    return n.__wbg_ptr = t, Oa.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Oa.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    Q.__wbg_instruction_free(t);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = Q.__wbindgen_add_to_stack_pointer(-16);
      Q.instruction_to_bytes(s, this.__wbg_ptr);
      var t = Ma()[s / 4 + 0], n = Ma()[s / 4 + 1], r = Ch(t, n).slice();
      return Q.__wbindgen_export_0(t, n * 1, 1), r;
    } finally {
      Q.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * Size of an instruction in bytes
  * @returns {number}
  */
  static size() {
    return Q.instruction_size() >>> 0;
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ji_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jmp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jmpb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jmpf_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jne_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jneb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jnef_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jnei_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jnzb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jnzf_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jnzi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_k256_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_lb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ldc_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_log_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_logd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_lt_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_lw_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mcl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mcli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mcp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mcpi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_meq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mint_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mldv_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mlog_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mod_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_modi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_move_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_movi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mroo_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mul_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_muli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mathargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mulargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_noop_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_not_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_or_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ori_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_poph_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_popl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_pshh_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_pshl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_panicinstruction_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ret_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_retd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_rvrt_free(e >>> 0));
const La = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => Q.__wbg_regid_free(e >>> 0));
class Oe {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Oe.prototype);
    return n.__wbg_ptr = t, La.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, La.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    Q.__wbg_regid_free(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * Returns `None` if the value is outside the 6-bit value range.
  * @param {number} u
  * @returns {RegId | undefined}
  */
  static new_checked(t) {
    const n = Q.regid_new_checked(t);
    return n === 0 ? void 0 : Oe.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = Q.regid_bal();
    return Oe.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = Q.regid_cgas();
    return Oe.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = Q.regid_err();
    return Oe.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = Q.regid_flag();
    return Oe.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = Q.regid_fp();
    return Oe.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = Q.regid_ggas();
    return Oe.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = Q.regid_hp();
    return Oe.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = Q.regid_is();
    return Oe.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = Q.regid_of();
    return Oe.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = Q.regid_one();
    return Oe.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = Q.regid_pc();
    return Oe.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = Q.regid_ret();
    return Oe.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = Q.regid_retl();
    return Oe.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = Q.regid_sp();
    return Oe.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = Q.regid_spp();
    return Oe.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = Q.regid_writable();
    return Oe.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = Q.regid_zero();
    return Oe.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const n = Q.regid_new_typescript(t);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * A const alternative to the `Into<u8>` implementation.
  * @returns {number}
  */
  to_u8() {
    const t = this.__destroy_into_raw();
    return Q.regid_to_u8(t);
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_s256_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_sb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_scwq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_sll_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_slli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_smo_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_srl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_srli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_srw_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_srwq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_sub_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_subi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_sw_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_sww_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_swwq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_time_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_tr_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_tro_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdam_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdcm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wddv_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdmd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdml_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdmm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdop_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqam_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqcm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqdv_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqmd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqml_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqmm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqop_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_xor_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_xori_free(e >>> 0));
async function _h(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (r) {
        if (e.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", r);
        else
          throw r;
      }
    const n = await e.arrayBuffer();
    return await WebAssembly.instantiate(n, t);
  } else {
    const n = await WebAssembly.instantiate(e, t);
    return n instanceof WebAssembly.Instance ? { instance: n, module: e } : n;
  }
}
function vh() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(Ih(t, n));
  }, e;
}
function xh(e, t) {
  return Q = e.exports, X0.__wbindgen_wasm_module = t, lr = null, Ar = null, Q;
}
async function X0(e) {
  if (Q !== void 0)
    return Q;
  const t = vh(), { instance: n, module: r } = await _h(await e, t);
  return xh(n, r);
}
function Rh(e, t, n, r) {
  function s(I, _, v) {
    var R = v ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, C = v ? WebAssembly.compileStreaming : WebAssembly.compile;
    return _ ? R(I, _) : C(I);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var u = globalThis.atob(n), A = u.length;
    i = new Uint8Array(new ArrayBuffer(A));
    for (var h = 0; h < A; h++)
      i[h] = u.charCodeAt(h);
  }
  if (e) {
    var E = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(E, r) : E;
  } else
    return s(i, r, !1);
}
function Sh(e) {
  return Rh(1, null, "AGFzbQEAAAABQAtgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38Bf2AAAX9gAn9/AGABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX8CGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABQP7AfkBAQMKBgEFBQUBBQEBAQEBAQECBQICAQEDAgICAgUCAwMDAwMDAwIBBQEFAAMDAwMDAwMDAwMDAQABAQUFAQEBAQEBAQEBAQIBBQUFAwIBAAABAQEFAgIBAQYABgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGAwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEDBgADAQEBBwICAAIABgEEAwEDBQgBCQkDAwMFAQEBBgYGBgQEBAQEBAQEBAQEBAQEBAQEBAQGBwcCAgIDBwcACAADBAUBcAEHBwUDAQARBgkBfwFBgIDAAAsHxEvBBQZtZW1vcnkCABZfX3diZ19jb21wYXJlYXJnc19mcmVlAHcaX193YmdfZ2V0X2NvbXBhcmVhcmdzX21vZGUAORpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQAoIl9fd2JnX2dldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMAOiJfX3diZ19zZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzADsSY29tcGFyZWFyZ3NfdG9faW1tAEgUY29tcGFyZWFyZ3NfZnJvbV9pbW0AKRVfX3diZ19nZXRfbWF0aGFyZ3Nfb3AAORVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AAKhJfX3diZ19tdWxhcmdzX2ZyZWUAeB5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAOR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAPBJfX3diZ19kaXZhcmdzX2ZyZWUA1gEeX193YmdfZ2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK0BIXBhbmljaW5zdHJ1Y3Rpb25fZXJyb3JfdHlwZXNjcmlwdABMF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAD4ccGFuaWNpbnN0cnVjdGlvbl9pbnN0cnVjdGlvbgA/DGdtX2Zyb21fYXJncwDJAQ1ndGZfZnJvbV9hcmdzAMEBB2dtX2FyZ3MAeQhndGZfYXJncwBaDndkY21fZnJvbV9hcmdzACYOd2RvcF9mcm9tX2FyZ3MAJg53ZG1sX2Zyb21fYXJncwAeDndkZHZfZnJvbV9hcmdzAL8BCXdkY21fYXJncwAZCXdxY21fYXJncwAaCXdkb3BfYXJncwAbCXdxb3BfYXJncwAcCXdkbWxfYXJncwAUCXdxbWxfYXJncwAVCXdkZHZfYXJncwBVCXdxZHZfYXJncwBWEF9fd2JnX2ltbTA2X2ZyZWUA1wEQX193YmdfaW1tMTJfZnJlZQDYARBfX3diZ19pbW0xOF9mcmVlANkBDl9fd2JnX2FkZF9mcmVlALgBD19fd2JnX25vb3BfZnJlZQBbEmFkZF9uZXdfdHlwZXNjcmlwdABPBmFkZF9yYQAWBmFkZF9yYgALBmFkZF9yYwAPA2FkZAC5AQNhbmQAewNkaXYAfAJlcQB9A2V4cAB+Amd0AH8CbHQAgAEEbWxvZwCBAQRtcm9vAIIBBG1vZF8AgwEFbW92ZV8ALANtdWwAhAEDbm90AC0Cb3IAhQEDc2xsAIYBA3NybACHAQNzdWIAiAEDeG9yAIkBBG1sZHYAXANyZXQArgEEcmV0ZAAuE2Fsb2NfbmV3X3R5cGVzY3JpcHQAVwdhbG9jX3JhAE4EYWxvYwCvAQNtY2wALwNtY3AAigEDbWVxAF0TYmhzaF9uZXdfdHlwZXNjcmlwdAAfBGJoc2gAMARiaGVpALABBGJ1cm4AMRNjYWxsX25ld190eXBlc2NyaXB0AE0HY2FsbF9yZAAXBGNhbGwAXgNjY3AAXwRjcm9vADIEY3NpegAzAmNiALEBA2xkYwCLAQNsb2cAYARsb2dkAGEEbWludAA0BHJ2cnQAsgEEc2N3cQCMAQNzcncAjQEEc3J3cQBiA3N3dwCOAQRzd3dxAGMCdHIAjwEDdHJvAGQEZWNrMQCQAQRlY3IxAJEBBGVkMTkAkgEEazI1NgCTAQRzMjU2AJQBBHRpbWUANRNub29wX25ld190eXBlc2NyaXB0AMYBBG5vb3AA2gEEZmxhZwCzAQNiYWwAlQEDam1wALQBA2puZQCWAQNzbW8AZRNhZGRpX25ld190eXBlc2NyaXB0AFAKYWRkaV9pbW0xMgAMBGFkZGkAlwEEYW5kaQCYAQRkaXZpAJkBBGV4cGkAmgEEbW9kaQCbAQRtdWxpAJwBA29yaQCdAQRzbGxpAJ4BBHNybGkAnwEEc3ViaQCgAQR4b3JpAKEBBGpuZWkAogECbGIAowECbHcApAECc2IApQECc3cApgEEbWNwaQCnARJndGZfbmV3X3R5cGVzY3JpcHQAwwEDZ3RmAKgBBG1jbGkAIBFnbV9uZXdfdHlwZXNjcmlwdAA2CGdtX2ltbTE4AAkCZ20AIQRtb3ZpACIEam56aQAjBGptcGYAJBNqbXBiX25ld190eXBlc2NyaXB0ABgEam1wYgAlBGpuemYAqQEEam56YgCqAQRqbmVmAGYKam5lYl9pbW0wNgAXBGpuZWIAZwJqaQBAE2NmZWlfbmV3X3R5cGVzY3JpcHQANwpjZmVpX2ltbTI0ACcEY2ZlaQBBBGNmc2kAQgNjZmUAtQEDY2ZzALYBBHBzaGwAQwRwc2hoAEQEcG9wbABFBHBvcGgARhN3ZGNtX25ld190eXBlc2NyaXB0AMABBHdkY20AaAR3cWNtAGkEd2RvcABqBHdxb3AAawR3ZG1sAGwEd3FtbABtBHdkZHYAbgR3cWR2AG8Ed2RtZABwBHdxbWQAcQR3ZGFtAHIEd3FhbQBzBHdkbW0AdAR3cW1tAHUEZWNhbAB2Fl9fd2JnX2luc3RydWN0aW9uX2ZyZWUAWRRpbnN0cnVjdGlvbl90b19ieXRlcwAKEGluc3RydWN0aW9uX3NpemUA7AERcmVnaWRfbmV3X2NoZWNrZWQAqwEJcmVnaWRfYmFsANsBCnJlZ2lkX2NnYXMA3AEJcmVnaWRfZXJyAN0BCnJlZ2lkX2ZsYWcA3gEIcmVnaWRfZnAA3wEKcmVnaWRfZ2dhcwDgAQhyZWdpZF9ocADhAQhyZWdpZF9pcwDiAQhyZWdpZF9vZgDjAQlyZWdpZF9vbmUA5AEIcmVnaWRfcGMA5QEJcmVnaWRfcmV0AOYBCnJlZ2lkX3JldGwA5wEIcmVnaWRfc3AA6AEJcmVnaWRfc3BwAOkBDnJlZ2lkX3dyaXRhYmxlAOoBCnJlZ2lkX3plcm8A6wEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA0wELcmVnaWRfdG9fdTgA1AETbW92aV9uZXdfdHlwZXNjcmlwdAAYE21jbGlfbmV3X3R5cGVzY3JpcHQAGBNqbnppX25ld190eXBlc2NyaXB0ABgTam1wZl9uZXdfdHlwZXNjcmlwdAAYEm5vdF9uZXdfdHlwZXNjcmlwdAAfE3JldGRfbmV3X3R5cGVzY3JpcHQAHxNtb3ZlX25ld190eXBlc2NyaXB0AB8SbWNsX25ld190eXBlc2NyaXB0AB8TYnVybl9uZXdfdHlwZXNjcmlwdAAfE2Nyb29fbmV3X3R5cGVzY3JpcHQAHxNjc2l6X25ld190eXBlc2NyaXB0AB8TbWludF9uZXdfdHlwZXNjcmlwdAAfE3RpbWVfbmV3X3R5cGVzY3JpcHQAHxJyZXRfbmV3X3R5cGVzY3JpcHQAVxNiaGVpX25ld190eXBlc2NyaXB0AFcRY2JfbmV3X3R5cGVzY3JpcHQAVxNydnJ0X25ld190eXBlc2NyaXB0AFcTZmxhZ19uZXdfdHlwZXNjcmlwdABXEmptcF9uZXdfdHlwZXNjcmlwdABXEmNmZV9uZXdfdHlwZXNjcmlwdABXEmNmc19uZXdfdHlwZXNjcmlwdABXE21sZHZfbmV3X3R5cGVzY3JpcHQATRJtZXFfbmV3X3R5cGVzY3JpcHQATRJjY3BfbmV3X3R5cGVzY3JpcHQATRJsb2dfbmV3X3R5cGVzY3JpcHQATRNsb2dkX25ld190eXBlc2NyaXB0AE0Tc3J3cV9uZXdfdHlwZXNjcmlwdABNE3N3d3FfbmV3X3R5cGVzY3JpcHQATRJ0cm9fbmV3X3R5cGVzY3JpcHQATRJzbW9fbmV3X3R5cGVzY3JpcHQATRNqbmVmX25ld190eXBlc2NyaXB0AE0Td2RtZF9uZXdfdHlwZXNjcmlwdABNE3dxbWRfbmV3X3R5cGVzY3JpcHQATRN3ZGFtX25ld190eXBlc2NyaXB0AE0Td3FhbV9uZXdfdHlwZXNjcmlwdABNE3dkbW1fbmV3X3R5cGVzY3JpcHQATRN3cW1tX25ld190eXBlc2NyaXB0AE0TZWNhbF9uZXdfdHlwZXNjcmlwdABNEmFuZF9uZXdfdHlwZXNjcmlwdABPEmRpdl9uZXdfdHlwZXNjcmlwdABPEWVxX25ld190eXBlc2NyaXB0AE8SZXhwX25ld190eXBlc2NyaXB0AE8RZ3RfbmV3X3R5cGVzY3JpcHQATxFsdF9uZXdfdHlwZXNjcmlwdABPE21sb2dfbmV3X3R5cGVzY3JpcHQATxNtcm9vX25ld190eXBlc2NyaXB0AE8SbW9kX25ld190eXBlc2NyaXB0AE8SbXVsX25ld190eXBlc2NyaXB0AE8Rb3JfbmV3X3R5cGVzY3JpcHQATxJzbGxfbmV3X3R5cGVzY3JpcHQATxJzcmxfbmV3X3R5cGVzY3JpcHQATxJzdWJfbmV3X3R5cGVzY3JpcHQATxJ4b3JfbmV3X3R5cGVzY3JpcHQATxJtY3BfbmV3X3R5cGVzY3JpcHQATxJsZGNfbmV3X3R5cGVzY3JpcHQATxNzY3dxX25ld190eXBlc2NyaXB0AE8Sc3J3X25ld190eXBlc2NyaXB0AE8Sc3d3X25ld190eXBlc2NyaXB0AE8RdHJfbmV3X3R5cGVzY3JpcHQATxNlY2sxX25ld190eXBlc2NyaXB0AE8TZWNyMV9uZXdfdHlwZXNjcmlwdABPE2VkMTlfbmV3X3R5cGVzY3JpcHQATxNrMjU2X25ld190eXBlc2NyaXB0AE8TczI1Nl9uZXdfdHlwZXNjcmlwdABPEmJhbF9uZXdfdHlwZXNjcmlwdABPEmpuZV9uZXdfdHlwZXNjcmlwdABPE2FuZGlfbmV3X3R5cGVzY3JpcHQAUBNkaXZpX25ld190eXBlc2NyaXB0AFATZXhwaV9uZXdfdHlwZXNjcmlwdABQE21vZGlfbmV3X3R5cGVzY3JpcHQAUBNtdWxpX25ld190eXBlc2NyaXB0AFASb3JpX25ld190eXBlc2NyaXB0AFATc2xsaV9uZXdfdHlwZXNjcmlwdABQE3NybGlfbmV3X3R5cGVzY3JpcHQAUBNzdWJpX25ld190eXBlc2NyaXB0AFATeG9yaV9uZXdfdHlwZXNjcmlwdABQE2puZWlfbmV3X3R5cGVzY3JpcHQAUBFsYl9uZXdfdHlwZXNjcmlwdABQEWx3X25ld190eXBlc2NyaXB0AFARc2JfbmV3X3R5cGVzY3JpcHQAUBFzd19uZXdfdHlwZXNjcmlwdABQE21jcGlfbmV3X3R5cGVzY3JpcHQAUBNqbnpmX25ld190eXBlc2NyaXB0AFATam56Yl9uZXdfdHlwZXNjcmlwdABQDndxY21fZnJvbV9hcmdzACYOd3FvcF9mcm9tX2FyZ3MAJh9fX3diZ19zZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzADseX193Ymdfc2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzADseX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzADsRamlfbmV3X3R5cGVzY3JpcHQANxNjZnNpX25ld190eXBlc2NyaXB0ADcTcHNobF9uZXdfdHlwZXNjcmlwdAA3E3BzaGhfbmV3X3R5cGVzY3JpcHQANxNwb3BsX25ld190eXBlc2NyaXB0ADcTcG9waF9uZXdfdHlwZXNjcmlwdAA3E3dxb3BfbmV3X3R5cGVzY3JpcHQAwAETd2Rkdl9uZXdfdHlwZXNjcmlwdADAARN3ZG1sX25ld190eXBlc2NyaXB0AMABE3dxY21fbmV3X3R5cGVzY3JpcHQAwAETd3Fkdl9uZXdfdHlwZXNjcmlwdADAAQ53cWR2X2Zyb21fYXJncwC/ARN3ZG9wX25ld190eXBlc2NyaXB0AMABDndxbWxfZnJvbV9hcmdzAB4Td3FtbF9uZXdfdHlwZXNjcmlwdADAARBfX3diZ19yZWdpZF9mcmVlANcBEF9fd2JnX2ltbTI0X2ZyZWUA2QEOX193YmdfbXVsX2ZyZWUAuAEPX193Ymdfam5lYl9mcmVlALgBDl9fd2JnX21jbF9mcmVlALgBDV9fd2JnX2xiX2ZyZWUAuAEKcHNobF9pbW0yNAAnD19fd2JnX3BzaGxfZnJlZQC4AQ9fX3diZ19tdWxpX2ZyZWUAuAEPX193YmdfZXhwaV9mcmVlALgBD19fd2JnX3dkbWRfZnJlZQC4AQ5fX3diZ19tb2RfZnJlZQC4AQ1fX3diZ19vcl9mcmVlALgBD19fd2JnX2Nmc2lfZnJlZQC4AQ9fX3diZ194b3JpX2ZyZWUAuAEPX193YmdfbW92aV9mcmVlALgBD19fd2JnX2puZWZfZnJlZQC4AQ9fX3diZ19zcmxpX2ZyZWUAuAEPX193YmdfbWxvZ19mcmVlALgBDV9fd2JnX3N3X2ZyZWUAuAEPX193YmdfbWNsaV9mcmVlALgBD19fd2JnX2NhbGxfZnJlZQC4AQ9fX3diZ19iaHNoX2ZyZWUAuAEPX193YmdfazI1Nl9mcmVlALgBD19fd2JnX2J1cm5fZnJlZQC4AQ9fX3diZ19qbnppX2ZyZWUAuAEPX193YmdfZWQxOV9mcmVlALgBD19fd2JnX3dkYW1fZnJlZQC4AQ9fX3diZ19hbmRpX2ZyZWUAuAENX193Ymdfc2JfZnJlZQC4AQpwb3BsX2ltbTI0ACcPX193YmdfcG9wbF9mcmVlALgBDl9fd2JnX3Nyd19mcmVlALgBD19fd2JnX3dxbW1fZnJlZQC4AQ9fX3diZ193ZGR2X2ZyZWUAuAEPX193Ymdfam1wYl9mcmVlALgBDl9fd2JnX2puZV9mcmVlALgBBmNmZV9yYQBODl9fd2JnX2NmZV9mcmVlALgBD19fd2JnX2Fsb2NfZnJlZQC4AQ9fX3diZ19zMjU2X2ZyZWUAuAEPX193YmdfbXJvb19mcmVlALgBDV9fd2JnX2x0X2ZyZWUAuAEOX193YmdfZGl2X2ZyZWUAuAEPX193Ymdfd3FvcF9mcmVlALgBDV9fd2JnX3RyX2ZyZWUAuAEPX193YmdfcmV0ZF9mcmVlALgBDV9fd2JnX2x3X2ZyZWUAuAEPX193Ymdfd2RtbV9mcmVlALgBB2ZsYWdfcmEATg9fX3diZ19mbGFnX2ZyZWUAuAENX193YmdfZ3RfZnJlZQC4AQZyZXRfcmEATg5fX3diZ19yZXRfZnJlZQC4AQ1fX3diZ19lcV9mcmVlALgBDl9fd2JnX21lcV9mcmVlALgBHl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X2xocwA6Dl9fd2JnX3Ntb19mcmVlALgBCGppX2ltbTI0ACcNX193YmdfamlfZnJlZQC4AQ5fX3diZ19zcmxfZnJlZQC4AQ5fX3diZ19zbGxfZnJlZQC4AQ9fX3diZ190aW1lX2ZyZWUAuAEPX193Ymdfc2N3cV9mcmVlALgBD19fd2JnX3dxbWxfZnJlZQC4AQ9fX3diZ19kaXZpX2ZyZWUAuAEOX193YmdfbWNwX2ZyZWUAuAEOX193Ymdfbm90X2ZyZWUAuAEGam1wX3JhAE4OX193Ymdfam1wX2ZyZWUAuAEOX193YmdfYmFsX2ZyZWUAuAEPX193YmdfbG9nZF9mcmVlALgBB2JoZWlfcmEATg9fX3diZ19iaGVpX2ZyZWUAuAEPX193Ymdfam5laV9mcmVlALgBD19fd2JnX2ptcGZfZnJlZQC4AQ9fX3diZ19qbnpmX2ZyZWUAuAEfX193YmdfZ2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwA6D19fd2JnX21vZGlfZnJlZQC4AQ5fX3diZ19vcmlfZnJlZQC4AQ9fX3diZ19lY2sxX2ZyZWUAuAEPX193YmdfZWNhbF9mcmVlALgBD19fd2JnX3Nyd3FfZnJlZQC4AQ5fX3diZ194b3JfZnJlZQC4AQ9fX3diZ19jc2l6X2ZyZWUAuAEPX193YmdfbWludF9mcmVlALgBBmNmc19yYQBODl9fd2JnX2Nmc19mcmVlALgBD19fd2JnX3NsbGlfZnJlZQC4AQ5fX3diZ19sb2dfZnJlZQC4AQ9fX3diZ19tb3ZlX2ZyZWUAuAEOX193YmdfbGRjX2ZyZWUAuAEPX193Ymdfd2RtbF9mcmVlALgBDV9fd2JnX2dtX2ZyZWUAuAEPX193Ymdfd2RjbV9mcmVlALgBD19fd2JnX3N1YmlfZnJlZQC4AQ5fX3diZ190cm9fZnJlZQC4AQ5fX3diZ19ndGZfZnJlZQC4AQdydnJ0X3JhAE4PX193YmdfcnZydF9mcmVlALgBDl9fd2JnX2V4cF9mcmVlALgBD19fd2JnX3dxYW1fZnJlZQC4AQ9fX3diZ193cWR2X2ZyZWUAuAEKcHNoaF9pbW0yNAAnD19fd2JnX3BzaGhfZnJlZQC4AQ9fX3diZ19hZGRpX2ZyZWUAuAEPX193Ymdfd3FtZF9mcmVlALgBD19fd2JnX2VjcjFfZnJlZQC4AQ9fX3diZ19jcm9vX2ZyZWUAuAEKY2ZzaV9pbW0yNAAnD19fd2JnX2NmZWlfZnJlZQC4AQ9fX3diZ19tY3BpX2ZyZWUAuAEPX193Ymdfd2RvcF9mcmVlALgBDl9fd2JnX3N1Yl9mcmVlALgBD19fd2JnX2puemJfZnJlZQC4AQVjYl9yYQBODV9fd2JnX2NiX2ZyZWUAuAEOX193Ymdfc3d3X2ZyZWUAuAEPX193Ymdfc3d3cV9mcmVlALgBD19fd2JnX21sZHZfZnJlZQC4AQ5fX3diZ19jY3BfZnJlZQC4AQ9fX3diZ193cWNtX2ZyZWUAuAEKcG9waF9pbW0yNAAnD19fd2JnX3BvcGhfZnJlZQC4AQ5fX3diZ19hbmRfZnJlZQC4AQpqbXBmX2ltbTE4AAkKam56aV9pbW0xOAAJCm1vdmlfaW1tMTgACQpqbXBiX2ltbTE4AAkKbWNsaV9pbW0xOAAJE2puZWJfbmV3X3R5cGVzY3JpcHQATQp3cWR2X2ltbTA2ABcKd3FtbF9pbW0wNgAXCndkbWxfaW1tMDYAFwp3cW9wX2ltbTA2ABcKd2RvcF9pbW0wNgAXCndxY21faW1tMDYAFwp3ZGR2X2ltbTA2ABcKd2RjbV9pbW0wNgAXCmpuZWZfaW1tMDYAFwZtdWxfcmMADwZtdWxfcmIACwZtdWxfcmEAFgZtY2xfcmIACwZtY2xfcmEAFgdtdWxpX3JiAAsHbXVsaV9yYQAWCm11bGlfaW1tMTIADAdqbmViX3JiAAsHam5lYl9yYQAWB3dkbWRfcmMADwd3ZG1kX3JiAAsHd2RtZF9yYQAWBm1vZF9yYwAPBm1vZF9yYgALBm1vZF9yYQAWBW9yX3JjAA8Fb3JfcmIACwVvcl9yYQAWCmV4cGlfaW1tMTIADAdleHBpX3JiAAsHZXhwaV9yYQAWCnhvcmlfaW1tMTIADAd4b3JpX3JiAAsHeG9yaV9yYQAWB21vdmlfcmEAFgdqbmVmX3JjAA8Ham5lZl9yYgALB2puZWZfcmEAFgpzcmxpX2ltbTEyAAwHc3JsaV9yYgALB3NybGlfcmEAFgdtbG9nX3JjAA8HbWxvZ19yYgALB21sb2dfcmEAFghzd19pbW0xMgAMBXN3X3JiAAsFc3dfcmEAFgdtY2xpX3JhABYHd2RtZF9yZAAXB2puZWJfcmMADwdjYWxsX3JiAAsHY2FsbF9yYQAWB2Joc2hfcmIACwdiaHNoX3JhABYHazI1Nl9yYwAPB2syNTZfcmIACwdrMjU2X3JhABYHYnVybl9yYgALB2J1cm5fcmEAFgdqbnppX3JhABYHZWQxOV9yYwAPB2VkMTlfcmIACwdlZDE5X3JhABYHd2RhbV9yZAAXB3dkYW1fcmMADwd3ZGFtX3JiAAsHd2RhbV9yYQAWCHNiX2ltbTEyAAwFc2JfcmIACwVzYl9yYQAWBnNyd19yYwAPBnNyd19yYgALBnNyd19yYQAWB3dxbW1fcmQAFwd3cW1tX3JjAA8Hd3FtbV9yYgALB3dxbW1fcmEAFgd3ZGR2X3JjAA8Hd2Rkdl9yYgALB3dkZHZfcmEAFgdqbXBiX3JhABYGam5lX3JjAA8Gam5lX3JiAAsGam5lX3JhABYHY2FsbF9yYwAPB2FuZGlfcmIACwdhbmRpX3JhABYHczI1Nl9yYwAPB3MyNTZfcmIACwdzMjU2X3JhABYHbXJvb19yYwAPB21yb29fcmIACwdtcm9vX3JhABYFbHRfcmMADwVsdF9yYgALBWx0X3JhABYGZGl2X3JjAA8GZGl2X3JiAAsGZGl2X3JhABYHd3FvcF9yYwAPB3dxb3BfcmIACwd3cW9wX3JhABYIbGJfaW1tMTIADAVsYl9yYgALBWxiX3JhABYFdHJfcmMADwV0cl9yYgALBXRyX3JhABYHcmV0ZF9yYgALB3JldGRfcmEAFghsd19pbW0xMgAMBWx3X3JiAAsFbHdfcmEAFgd3ZG1tX3JkABcHd2RtbV9yYwAPB3dkbW1fcmIACwd3ZG1tX3JhABYFZ3RfcmMADwVndF9yYgALBWd0X3JhABYFZXFfcmMADwVlcV9yYgALBWVxX3JhABYGbWVxX3JkABcGbWVxX3JjAA8GbWVxX3JiAAsGbWVxX3JhABYGc21vX3JkABcGc21vX3JjAA8Gc21vX3JiAAsGc21vX3JhABYGc3JsX3JjAA8Gc3JsX3JiAAsGc3JsX3JhABYGc2xsX3JjAA8Gc2xsX3JiAAsGc2xsX3JhABYHdGltZV9yYgALB3RpbWVfcmEAFgdzY3dxX3JjAA8Hc2N3cV9yYgALB3Njd3FfcmEAFgd3cW1sX3JjAA8Hd3FtbF9yYgALB3dxbWxfcmEAFgpkaXZpX2ltbTEyAAwHZGl2aV9yYgALB2RpdmlfcmEAFgZtY3BfcmMADwZtY3BfcmIACwZtY3BfcmEAFgZub3RfcmIACwZub3RfcmEAFgZiYWxfcmMADwZiYWxfcmIACwZiYWxfcmEAFgdsb2dkX3JkABcHbG9nZF9yYwAPB2xvZ2RfcmIACwdsb2dkX3JhABYKam5laV9pbW0xMgAMB2puZWlfcmIACwdqbmVpX3JhABYHam1wZl9yYQAWCmpuemZfaW1tMTIADAdqbnpmX3JiAAsHam56Zl9yYQAWE19fd2JnX21hdGhhcmdzX2ZyZWUAdwptb2RpX2ltbTEyAAwHbW9kaV9yYgALB21vZGlfcmEAFglvcmlfaW1tMTIADAZvcmlfcmIACwZvcmlfcmEAFgdlY2sxX3JjAA8HZWNrMV9yYgALB2VjazFfcmEAFgdlY2FsX3JkABcHZWNhbF9yYwAPB2VjYWxfcmIACwdlY2FsX3JhABYHc3J3cV9yZAAXB3Nyd3FfcmMADwdzcndxX3JiAAsHc3J3cV9yYQAWBnhvcl9yYwAPBnhvcl9yYgALBnhvcl9yYQAWB2NzaXpfcmIACwdjc2l6X3JhABYHbWludF9yYgALB21pbnRfcmEAFgpzbGxpX2ltbTEyAAwHc2xsaV9yYgALB3NsbGlfcmEAFgZsb2dfcmQAFwZsb2dfcmMADwZsb2dfcmIACwZsb2dfcmEAFgdtb3ZlX3JiAAsHbW92ZV9yYQAWBmxkY19yYwAPBmxkY19yYgALBmxkY19yYQAWB3dkbWxfcmMADwd3ZG1sX3JiAAsHd2RtbF9yYQAWBWdtX3JhABYHd2RjbV9yYwAPB3dkY21fcmIACwd3ZGNtX3JhABYKc3ViaV9pbW0xMgAMB3N1YmlfcmIACwdzdWJpX3JhABYGdHJvX3JkABcGdHJvX3JjAA8GdHJvX3JiAAsGdHJvX3JhABYJZ3RmX2ltbTEyAAwGZ3RmX3JiAAsGZ3RmX3JhABYGZXhwX3JjAA8GZXhwX3JiAAsGZXhwX3JhABYHd3FhbV9yZAAXB3dxYW1fcmMADwd3cWFtX3JiAAsHd3FhbV9yYQAWB3dxZHZfcmMADwd3cWR2X3JiAAsHd3Fkdl9yYQAWCmFuZGlfaW1tMTIADAdhZGRpX3JiAAsHYWRkaV9yYQAWB3dxbWRfcmQAFwd3cW1kX3JjAA8Hd3FtZF9yYgALB3dxbWRfcmEAFgdlY3IxX3JjAA8HZWNyMV9yYgALB2VjcjFfcmEAFgdjcm9vX3JiAAsHY3Jvb19yYQAWCm1jcGlfaW1tMTIADAdtY3BpX3JiAAsHbWNwaV9yYQAWB3dkb3BfcmMADwd3ZG9wX3JiAAsHd2RvcF9yYQAWBnN1Yl9yYwAPBnN1Yl9yYgALBnN1Yl9yYQAWCmpuemJfaW1tMTIADAdqbnpiX3JiAAsHam56Yl9yYQAWBnN3d19yYwAPBnN3d19yYgALBnN3d19yYQAWB3N3d3FfcmQAFwdzd3dxX3JjAA8Hc3d3cV9yYgALB3N3d3FfcmEAFgdtbGR2X3JkABcHbWxkdl9yYwAPB21sZHZfcmIACwdtbGR2X3JhABYGY2NwX3JkABcGY2NwX3JjAA8GY2NwX3JiAAsGY2NwX3JhABYHd3FjbV9yYwAPB3dxY21fcmIACwd3cWNtX3JhABYGYW5kX3JjAA8GYW5kX3JiAAsGYW5kX3JhABYbX193YmdfcGFuaWNpbnN0cnVjdGlvbl9mcmVlALgBH19fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIAzAETX193YmluZGdlbl9leHBvcnRfMADLAQkRAQBBAQsGAs8B0AHRAe0BygEK1oEB+QGJIwIIfwF+AkACQAJAAkACQAJAAkACQCAAQfUBTwRAIABBzf97Tw0FIABBC2oiAEF4cSEFQfiMwAAoAgAiCEUNBEEAIAVrIQQCf0EAIAVBgAJJDQAaQR8gBUH///8HSw0AGiAFQQYgAEEIdmciAGt2QQFxIABBAXRrQT5qCyIHQQJ0QdyJwABqKAIAIgFFBEBBACEADAILQQAhACAFQRkgB0EBdmtBACAHQR9HG3QhAwNAAkAgASgCBEF4cSIGIAVJDQAgBiAFayIGIARPDQAgASECIAYiBA0AQQAhBCABIQAMBAsgAUEUaigCACIGIAAgBiABIANBHXZBBHFqQRBqKAIAIgFHGyAAIAYbIQAgA0EBdCEDIAENAAsMAQtB9IzAACgCACICQRAgAEELakF4cSAAQQtJGyIFQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAUEDdCIAQeyKwABqIgMgAEH0isAAaigCACIAKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiABd3E2AgALIAAgAUEDdCIBQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAgLIAVB/IzAACgCAE0NAwJAAkAgAUUEQEH4jMAAKAIAIgBFDQYgAGhBAnRB3InAAGooAgAiASgCBEF4cSAFayEEIAEhAgNAAkAgASgCECIADQAgAUEUaigCACIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACQRRqIgAoAgAiAxtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAAgAkEQaiADGyEDA0AgAyEGIAEiAEEUaiIBIABBEGogASgCACIBGyEDIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNBCACIAIoAhxBAnRB3InAAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0FDAQLIAEgADYCACAADQNB+IzAAEH4jMAAKAIAQX4gAigCHHdxNgIADAQLIAAoAgRBeHEgBWsiASAEIAEgBEkiARshBCAAIAIgARshAiAAIQEMAAsACwJAQQIgAHQiA0EAIANrciABIAB0cWgiAEEDdCIBQeyKwABqIgMgAUH0isAAaigCACIBKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiAAd3E2AgALIAEgBUEDcjYCBCABIAVqIgYgAEEDdCIAIAVrIgRBAXI2AgQgACABaiAENgIAQfyMwAAoAgAiAgRAIAJBeHFB7IrAAGohAEGEjcAAKAIAIQMCf0H0jMAAKAIAIgVBASACQQN2dCICcUUEQEH0jMAAIAIgBXI2AgAgAAwBCyAAKAIICyECIAAgAzYCCCACIAM2AgwgAyAANgIMIAMgAjYCCAtBhI3AACAGNgIAQfyMwAAgBDYCACABQQhqDwsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAJBFGooAgAiAUUNACAAQRRqIAE2AgAgASAANgIYCwJAAkAgBEEQTwRAIAIgBUEDcjYCBCACIAVqIgUgBEEBcjYCBCAEIAVqIAQ2AgBB/IzAACgCACIDRQ0BIANBeHFB7IrAAGohAEGEjcAAKAIAIQECf0H0jMAAKAIAIgZBASADQQN2dCIDcUUEQEH0jMAAIAMgBnI2AgAgAAwBCyAAKAIICyEDIAAgATYCCCADIAE2AgwgASAANgIMIAEgAzYCCAwBCyACIAQgBWoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBC0GEjcAAIAU2AgBB/IzAACAENgIACyACQQhqDwsgACACckUEQEEAIQJBAiAHdCIAQQAgAGtyIAhxIgBFDQMgAGhBAnRB3InAAGooAgAhAAsgAEUNAQsDQCAAIAIgACgCBEF4cSIDIAVrIgYgBEkiBxshCCAAKAIQIgFFBEAgAEEUaigCACEBCyACIAggAyAFSSIAGyECIAQgBiAEIAcbIAAbIQQgASIADQALCyACRQ0AIAVB/IzAACgCACIATSAEIAAgBWtPcQ0AIAIoAhghBwJAAkAgAiACKAIMIgBGBEAgAkEUQRAgAkEUaiIAKAIAIgMbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyAAIAJBEGogAxshAwNAIAMhBiABIgBBFGoiASAAQRBqIAEoAgAiARshAyAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQMgAiACKAIcQQJ0QdyJwABqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNBAwDCyABIAA2AgAgAA0CQfiMwABB+IzAACgCAEF+IAIoAhx3cTYCAAwDCwJAAkACQAJAAkAgBUH8jMAAKAIAIgFLBEAgBUGAjcAAKAIAIgBPBEBBACEEIAVBr4AEaiIAQRB2QAAiAUF/RiIDDQcgAUEQdCICRQ0HQYyNwABBACAAQYCAfHEgAxsiBEGMjcAAKAIAaiIANgIAQZCNwABBkI3AACgCACIBIAAgACABSRs2AgACQAJAQYiNwAAoAgAiAwRAQdyKwAAhAANAIAAoAgAiASAAKAIEIgZqIAJGDQIgACgCCCIADQALDAILQZiNwAAoAgAiAEEAIAAgAk0bRQRAQZiNwAAgAjYCAAtBnI3AAEH/HzYCAEHgisAAIAQ2AgBB3IrAACACNgIAQfiKwABB7IrAADYCAEGAi8AAQfSKwAA2AgBB9IrAAEHsisAANgIAQYiLwABB/IrAADYCAEH8isAAQfSKwAA2AgBBkIvAAEGEi8AANgIAQYSLwABB/IrAADYCAEGYi8AAQYyLwAA2AgBBjIvAAEGEi8AANgIAQaCLwABBlIvAADYCAEGUi8AAQYyLwAA2AgBBqIvAAEGci8AANgIAQZyLwABBlIvAADYCAEGwi8AAQaSLwAA2AgBBpIvAAEGci8AANgIAQeiKwABBADYCAEG4i8AAQayLwAA2AgBBrIvAAEGki8AANgIAQbSLwABBrIvAADYCAEHAi8AAQbSLwAA2AgBBvIvAAEG0i8AANgIAQciLwABBvIvAADYCAEHEi8AAQbyLwAA2AgBB0IvAAEHEi8AANgIAQcyLwABBxIvAADYCAEHYi8AAQcyLwAA2AgBB1IvAAEHMi8AANgIAQeCLwABB1IvAADYCAEHci8AAQdSLwAA2AgBB6IvAAEHci8AANgIAQeSLwABB3IvAADYCAEHwi8AAQeSLwAA2AgBB7IvAAEHki8AANgIAQfiLwABB7IvAADYCAEGAjMAAQfSLwAA2AgBB9IvAAEHsi8AANgIAQYiMwABB/IvAADYCAEH8i8AAQfSLwAA2AgBBkIzAAEGEjMAANgIAQYSMwABB/IvAADYCAEGYjMAAQYyMwAA2AgBBjIzAAEGEjMAANgIAQaCMwABBlIzAADYCAEGUjMAAQYyMwAA2AgBBqIzAAEGcjMAANgIAQZyMwABBlIzAADYCAEGwjMAAQaSMwAA2AgBBpIzAAEGcjMAANgIAQbiMwABBrIzAADYCAEGsjMAAQaSMwAA2AgBBwIzAAEG0jMAANgIAQbSMwABBrIzAADYCAEHIjMAAQbyMwAA2AgBBvIzAAEG0jMAANgIAQdCMwABBxIzAADYCAEHEjMAAQbyMwAA2AgBB2IzAAEHMjMAANgIAQcyMwABBxIzAADYCAEHgjMAAQdSMwAA2AgBB1IzAAEHMjMAANgIAQeiMwABB3IzAADYCAEHcjMAAQdSMwAA2AgBB8IzAAEHkjMAANgIAQeSMwABB3IzAADYCAEGIjcAAIAI2AgBB7IzAAEHkjMAANgIAQYCNwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBlI3AAEGAgIABNgIADAgLIAIgA00gASADS3INACAAKAIMRQ0DC0GYjcAAQZiNwAAoAgAiACACIAAgAkkbNgIAIAIgBGohAUHcisAAIQACQAJAA0AgASAAKAIARwRAIAAoAggiAA0BDAILCyAAKAIMRQ0BC0HcisAAIQADQAJAIAMgACgCACIBTwRAIAEgACgCBGoiBiADSw0BCyAAKAIIIQAMAQsLQYiNwAAgAjYCAEGAjcAAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQZSNwABBgICAATYCACADIAZBIGtBeHFBCGsiACAAIANBEGpJGyIBQRs2AgRB3IrAACkCACEJIAFBEGpB5IrAACkCADcCACABIAk3AghB4IrAACAENgIAQdyKwAAgAjYCAEHkisAAIAFBCGo2AgBB6IrAAEEANgIAIAFBHGohAANAIABBBzYCACAAQQRqIgAgBkkNAAsgASADRg0HIAEgASgCBEF+cTYCBCADIAEgA2siAEEBcjYCBCABIAA2AgAgAEGAAk8EQCADIAAQCAwICyAAQXhxQeyKwABqIQECf0H0jMAAKAIAIgJBASAAQQN2dCIAcUUEQEH0jMAAIAAgAnI2AgAgAQwBCyABKAIICyEAIAEgAzYCCCAAIAM2AgwgAyABNgIMIAMgADYCCAwHCyAAIAI2AgAgACAAKAIEIARqNgIEIAIgBUEDcjYCBCABIAIgBWoiA2shBSABQYiNwAAoAgBGDQMgAUGEjcAAKAIARg0EIAEoAgQiBEEDcUEBRgRAIAEgBEF4cSIAEAcgACAFaiEFIAAgAWoiASgCBCEECyABIARBfnE2AgQgAyAFQQFyNgIEIAMgBWogBTYCACAFQYACTwRAIAMgBRAIDAYLIAVBeHFB7IrAAGohAAJ/QfSMwAAoAgAiAUEBIAVBA3Z0IgRxRQRAQfSMwAAgASAEcjYCACAADAELIAAoAggLIQUgACADNgIIIAUgAzYCDCADIAA2AgwgAyAFNgIIDAULQYCNwAAgACAFayIBNgIAQYiNwABBiI3AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBCAAQQhqIQQMBgtBhI3AACgCACEAAkAgASAFayICQQ9NBEBBhI3AAEEANgIAQfyMwABBADYCACAAIAFBA3I2AgQgACABaiIBIAEoAgRBAXI2AgQMAQtB/IzAACACNgIAQYSNwAAgACAFaiIDNgIAIAMgAkEBcjYCBCAAIAFqIAI2AgAgACAFQQNyNgIECwwICyAAIAQgBmo2AgRBiI3AAEGIjcAAKAIAIgBBD2pBeHEiAUEIayICNgIAQYCNwABBgI3AACgCACAEaiIDIAAgAWtqQQhqIgE2AgAgAiABQQFyNgIEIAAgA2pBKDYCBEGUjcAAQYCAgAE2AgAMAwtBiI3AACADNgIAQYCNwABBgI3AACgCACAFaiIANgIAIAMgAEEBcjYCBAwBC0GEjcAAIAM2AgBB/IzAAEH8jMAAKAIAIAVqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAAsgAkEIag8LQQAhBEGAjcAAKAIAIgAgBU0NAEGAjcAAIAAgBWsiATYCAEGIjcAAQYiNwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQMAwsgBA8LIAAgBzYCGCACKAIQIgEEQCAAIAE2AhAgASAANgIYCyACQRRqKAIAIgFFDQAgAEEUaiABNgIAIAEgADYCGAsCQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiASAEQQFyNgIEIAEgBGogBDYCACAEQYACTwRAIAEgBBAIDAILIARBeHFB7IrAAGohAAJ/QfSMwAAoAgAiA0EBIARBA3Z0IgRxRQRAQfSMwAAgAyAEcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIECyACQQhqDwsgAEEIagvtCwELfyAAKAIEIQcgACgCACEFAkACQAJAIAEoAgAiCiABKAIIIgByBEACQCAARQ0AIAUgB2ohCSABQQxqKAIAQQFqIQYgBSECA0ACQCACIQAgBkEBayIGRQ0AIAAgCUYNAgJ/IAAsAAAiBEEATgRAIARB/wFxIQQgAEEBagwBCyAALQABQT9xIQggBEEfcSECIARBX00EQCACQQZ0IAhyIQQgAEECagwBCyAALQACQT9xIAhBBnRyIQggBEFwSQRAIAggAkEMdHIhBCAAQQNqDAELIAJBEnRBgIDwAHEgAC0AA0E/cSAIQQZ0cnIiBEGAgMQARg0DIABBBGoLIgIgAyAAa2ohAyAEQYCAxABHDQEMAgsLIAAgCUYNACAALAAAIgJBAE4gAkFgSXIgAkFwSXJFBEAgAkH/AXFBEnRBgIDwAHEgAC0AA0E/cSAALQACQT9xQQZ0IAAtAAFBP3FBDHRycnJBgIDEAEYNAQsCQAJAIANFDQAgAyAHTwRAQQAhACADIAdGDQEMAgtBACEAIAMgBWosAABBQEgNAQsgBSEACyADIAcgABshByAAIAUgABshBQsgCkUNAyABKAIEIQsgB0EQTwRAIAcgBSAFQQNqQXxxIgRrIgZqIgpBA3EhCEEAIQlBACEAIAQgBUcEQCAEIAVBf3NqQQNPBEBBACEDA0AgACADIAVqIgIsAABBv39KaiACQQFqLAAAQb9/SmogAkECaiwAAEG/f0pqIAJBA2osAABBv39KaiEAIANBBGoiAw0ACwsgBSECA0AgACACLAAAQb9/SmohACACQQFqIQIgBkEBaiIGDQALCwJAIAhFDQAgBCAKQXxxaiICLAAAQb9/SiEJIAhBAUYNACAJIAIsAAFBv39KaiEJIAhBAkYNACAJIAIsAAJBv39KaiEJCyAKQQJ2IQggACAJaiEDA0AgBCEGIAhFDQRBwAEgCCAIQcABTxsiCUEDcSEKIAlBAnQhBEEAIQIgCUEETwRAIAYgBEHwB3FqIQwgBiEAA0AgAiAAKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIABBBGooAgAiAkF/c0EHdiACQQZ2ckGBgoQIcWogAEEIaigCACICQX9zQQd2IAJBBnZyQYGChAhxaiAAQQxqKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIQIgAEEQaiIAIAxHDQALCyAIIAlrIQggBCAGaiEEIAJBCHZB/4H8B3EgAkH/gfwHcWpBgYAEbEEQdiADaiEDIApFDQALIAYgCUH8AXFBAnRqIgIoAgAiAEF/c0EHdiAAQQZ2ckGBgoQIcSEAIApBAUYNAiAAIAIoAgQiAEF/c0EHdiAAQQZ2ckGBgoQIcWohACAKQQJGDQIgACACKAIIIgBBf3NBB3YgAEEGdnJBgYKECHFqIQAMAgsgB0UEQEEAIQMMAwsgB0EDcSECAkAgB0EESQRAQQAhA0EAIQYMAQtBACEDIAUhACAHQXxxIgYhBANAIAMgACwAAEG/f0pqIABBAWosAABBv39KaiAAQQJqLAAAQb9/SmogAEEDaiwAAEG/f0pqIQMgAEEEaiEAIARBBGsiBA0ACwsgAkUNAiAFIAZqIQADQCADIAAsAABBv39KaiEDIABBAWohACACQQFrIgINAAsMAgsMAgsgAEEIdkH/gRxxIABB/4H8B3FqQYGABGxBEHYgA2ohAwsCQCADIAtJBEAgCyADayEDQQAhAAJAAkACQCABLQAgQQFrDgIAAQILIAMhAEEAIQMMAQsgA0EBdiEAIANBAWpBAXYhAwsgAEEBaiEAIAFBGGooAgAhAiABKAIQIQYgASgCFCEBA0AgAEEBayIARQ0CIAEgBiACKAIQEQMARQ0AC0EBDwsMAQtBASEAIAEgBSAHIAIoAgwRAAAEf0EBBUEAIQACfwNAIAMgACADRg0BGiAAQQFqIQAgASAGIAIoAhARAwBFDQALIABBAWsLIANJCw8LIAEoAhQgBSAHIAFBGGooAgAoAgwRAAALpgYCDX8BfiMAQTBrIgckAEEnIQICQCAAQpDOAFQEQCAAIQ8MAQsDQCAHQQlqIAJqIgZBBGsgAEKQzgCAIg9C8LEDfiAAfKciBEH//wNxQeQAbiIDQQF0QciGwABqLwAAOwAAIAZBAmsgA0Gcf2wgBGpB//8DcUEBdEHIhsAAai8AADsAACACQQRrIQIgAEL/wdcvViAPIQANAAsLIA+nIgRB4wBLBEAgAkECayICIAdBCWpqIA+nIgNB//8DcUHkAG4iBEGcf2wgA2pB//8DcUEBdEHIhsAAai8AADsAAAsCQCAEQQpPBEAgAkECayICIAdBCWpqIARBAXRByIbAAGovAAA7AAAMAQsgAkEBayICIAdBCWpqIARBMGo6AAALQScgAmshCEEBIQVBK0GAgMQAIAEoAhwiBEEBcSIMGyEJIARBHXRBH3VB6IjAAHEhCiAHQQlqIAJqIQsCQCABKAIARQRAIAEoAhQiAyABKAIYIgEgCSAKEEcNASADIAsgCCABKAIMEQAAIQUMAQsgASgCBCINIAggDGoiA00EQCABKAIUIgMgASgCGCIBIAkgChBHDQEgAyALIAggASgCDBEAACEFDAELIARBCHEEQCABKAIQIQQgAUEwNgIQIAEtACAhAyABQQE6ACAgASgCFCIOIAEoAhgiBiAJIAoQRw0BIAIgDWogDGtBJmshAgNAIAJBAWsiAgRAIA5BMCAGKAIQEQMARQ0BDAMLCyAOIAsgCCAGKAIMEQAADQEgASADOgAgIAEgBDYCEEEAIQUMAQsgDSADayEDAkACQAJAIAEtACAiAkEBaw4DAAEAAgsgAyECQQAhAwwBCyADQQF2IQIgA0EBakEBdiEDCyACQQFqIQIgAUEYaigCACEGIAEoAhAhBCABKAIUIQECQANAIAJBAWsiAkUNASABIAQgBigCEBEDAEUNAAsMAQsgASAGIAkgChBHDQAgASALIAggBigCDBEAAA0AQQAhAgNAIAIgA0YEQEEAIQUMAgsgAkEBaiECIAEgBCAGKAIQEQMARQ0ACyACQQFrIANJIQULIAdBMGokACAFC/wFAQV/IABBCGsiASAAQQRrKAIAIgNBeHEiAGohAgJAAkACQAJAIANBAXENACADQQNxRQ0BIAEoAgAiAyAAaiEAIAEgA2siAUGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAA2AgAgAiACKAIEQX5xNgIEIAEgAEEBcjYCBCACIAA2AgAPCyABIAMQBwsCQAJAIAIoAgQiA0ECcUUEQCACQYiNwAAoAgBGDQIgAkGEjcAAKAIARg0FIAIgA0F4cSICEAcgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFBhI3AACgCAEcNAUH8jMAAIAA2AgAPCyACIANBfnE2AgQgASAAQQFyNgIEIAAgAWogADYCAAsgAEGAAkkNAiABIAAQCEEAIQFBnI3AAEGcjcAAKAIAQQFrIgA2AgAgAA0BQeSKwAAoAgAiAARAA0AgAUEBaiEBIAAoAggiAA0ACwtBnI3AAEH/HyABIAFB/x9NGzYCAA8LQYiNwAAgATYCAEGAjcAAQYCNwAAoAgAgAGoiADYCACABIABBAXI2AgRBhI3AACgCACABRgRAQfyMwABBADYCAEGEjcAAQQA2AgALIABBlI3AACgCACIDTQ0AQYiNwAAoAgAiAkUNAEEAIQECQEGAjcAAKAIAIgRBKUkNAEHcisAAIQADQCACIAAoAgAiBU8EQCAFIAAoAgRqIAJLDQILIAAoAggiAA0ACwtB5IrAACgCACIABEADQCABQQFqIQEgACgCCCIADQALC0GcjcAAQf8fIAEgAUH/H00bNgIAIAMgBE8NAEGUjcAAQX82AgALDwsgAEF4cUHsisAAaiECAn9B9IzAACgCACIDQQEgAEEDdnQiAHFFBEBB9IzAACAAIANyNgIAIAIMAQsgAigCCAshACACIAE2AgggACABNgIMIAEgAjYCDCABIAA2AggPC0GEjcAAIAE2AgBB/IzAAEH8jMAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAuBBQEBfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQYAEaw4mAQIDBAUGBwgsCQoLDA0sLCwsLCwsLCwsLCwsLCwsLCwODywsLBAAC0EBIQECQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEEBaw4OQgECAwQFBgcICQoLDA0ACwJAIABBwARrDgwoKSorLC0uLzAxMjMACwJAIABBgQJrDgoODxAREhMUFRYXAAsCQCAAQYAGaw4JNDU2NzhDQzk6AAsCQCAAQYAKaw4FPT4/QEEACyAAQYAIaw4COjtCC0ECDwtBAw8LQQQPC0EFDwtBBg8LQQcPC0EIDwtBCQ8LQQoPC0ELDwtBDA8LQQ0PC0EODwtBgQIPC0GCAg8LQYMCDwtBhAIPC0GFAg8LQYYCDwtBhwIPC0GIAg8LQYkCDwtBigIPC0GABA8LQYEEDwtBggQPC0GDBA8LQYQEDwtBhQQPC0GGBA8LQYcEDwtBiQQPC0GKBA8LQYsEDwtBjAQPC0GNBA8LQaAEDwtBoQQPC0GlBA8LQcAEDwtBwQQPC0HCBA8LQcMEDwtBxAQPC0HFBA8LQcYEDwtBxwQPC0HIBA8LQckEDwtBygQPC0HLBA8LQYAGDwtBgQYPC0GCBg8LQYMGDwtBhAYPC0GHBg8LQYgGDwtBgAgPC0GBCA8LQYAKDwtBgQoPC0GCCg8LQYMKDwtBhAohAQsgAQ8LQeCCwABBGRDSAQAL+AMBAn8gACABaiECAkACQCAAKAIEIgNBAXENACADQQNxRQ0BIAAoAgAiAyABaiEBIAAgA2siAEGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAE2AgAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCACIAE2AgAPCyAAIAMQBwsCQAJAAkAgAigCBCIDQQJxRQRAIAJBiI3AACgCAEYNAiACQYSNwAAoAgBGDQMgAiADQXhxIgIQByAAIAEgAmoiAUEBcjYCBCAAIAFqIAE2AgAgAEGEjcAAKAIARw0BQfyMwAAgATYCAA8LIAIgA0F+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACyABQYACTwRAIAAgARAIDAMLIAFBeHFB7IrAAGohAgJ/QfSMwAAoAgAiA0EBIAFBA3Z0IgFxRQRAQfSMwAAgASADcjYCACACDAELIAIoAggLIQEgAiAANgIIIAEgADYCDCAAIAI2AgwgACABNgIIDwtBiI3AACAANgIAQYCNwABBgI3AACgCACABaiIBNgIAIAAgAUEBcjYCBCAAQYSNwAAoAgBHDQFB/IzAAEEANgIAQYSNwABBADYCAA8LQYSNwAAgADYCAEH8jMAAQfyMwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgACABaiABNgIACwv7AgEEfyAAKAIMIQICQAJAIAFBgAJPBEAgACgCGCEDAkACQCAAIAJGBEAgAEEUQRAgAEEUaiICKAIAIgQbaigCACIBDQFBACECDAILIAAoAggiASACNgIMIAIgATYCCAwBCyACIABBEGogBBshBANAIAQhBSABIgJBFGoiASACQRBqIAEoAgAiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QdyJwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQfiMwABB+IzAACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB9IzAAEH0jMAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIABBFGooAgAiAEUNACACQRRqIAA2AgAgACACNgIYCwusAgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QdyJwABqIQQCQEH4jMAAKAIAIgVBASACdCIDcUUEQEH4jMAAIAMgBXI2AgAgBCAANgIAIAAgBDYCGAwBCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEEA0AgAyAEQR12QQRxakEQaiIFKAIAIgJFDQIgBEEBdCEEIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAFIAA2AgAgACADNgIYCyAAIAA2AgwgACAANgIIC2kBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYD+A3EgAEEYdnJyELsBIAFBEGokAAt5AQN/IAEQxAECQCABKAIAIgJBf0cEQCABIAJBAWo2AgAgASgCBCgAACIDQRh0QRZ1QfyCwABqKAIAIQRBAUEEEMcBIgJFDQEgAiAEIANBgH5xcjYAACABIAEoAgBBAWs2AgAgAEEENgIEIAAgAjYCAA8LEM4BAAsAC2YBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYDgA3FyQQx2ELwBIAFBEGokAAtuAQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggiAC8AACAAQQJqLQAAQRB0chDVASEAIAEoAgwiAiACKAIAQQFrNgIAQQhBBBC6ASICIABBCHZBgB5xIABBGHZyOwEEIAJBADYCACABQRBqJAAgAgttAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQRxqQgE3AgAgAUECNgIUIAFB9IDAADYCECABQQI2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQSQALIAFBMGokACAAC24BAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQRxqQgE3AgAgAUECNgIUIAFBuIHAADYCECABQQM2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQSQALIAFBMGokACAAC10BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQR52IABBDnZBPHFyELwBIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ8gELFgAgAEHQgsAAQcCCwABBgICACBDyAQtMACADQf8BcSABQf8BcUEMdCAAQf8BcUESdHIiACACQf8BcUEGdHJyIgFBEHRBgID8B3EgAEEIdkGA/gNxIAFBgP4DcUEIdHJBCHZyC1UCAX8BfiMAQRBrIgIkACABEMQBIAJBCGogARBUIAIoAgxBADYCACABKQIAIQMgARAEIAAgA0IoiKdBAXE6AAEgACADQiCIp0EBcToAACACQRBqJAALEAAgACABIAIgA0HiABD0AQsQACAAIAEgAiADQeMAEPQBC08BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDIARC8ASABQRBqJAALVQEDfyMAQRBrIgEkACABQQhqIAAQSiABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENUBQRh2QT9xELwBIAFBEGokAAtSAQF/IAAQUSECIAEQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgACACQf8BcUESdHIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyrUIghjcCACABCxAAIAAgASACIANB3gAQ9QELEAAgACABIAIgA0HfABD1AQsQACAAIAEgAiADQeAAEPUBCxAAIAAgASACIANB4QAQ9QELUQIBfwF+IwBBEGsiAiQAIAEQxAEgAkEIaiABEFQgAigCDEEANgIAIAEpAgAhAyABEAQgACADQiiIPAABIAAgA0IgiKdBAXE6AAAgAkEQaiQACz4BAX8jAEEQayIEJAAgABBRIAEQUSACEFEgBEEIaiADEBMgBC0ACEEBcSAELQAJQQFxEHoQrAEgBEEQaiQAC0kBAX8gABBRIQAgARBRIQFBCEEEELoBIgIgAUH/AXFBDHQgAEESdHIiAEGA4ANxQQh0IABBCHZBgP4DcXJBCHatQiCGNwIAIAILDAAgACABQcsAEPYBCwwAIAAgAUHMABD2AQsMACAAIAFBzQAQ9gELDAAgACABQc4AEPYBCwwAIAAgAUHPABD2AQsMACAAIAFB0AAQ9gELPAEBfyMAQRBrIgQkACAAEFEgARBRIAIQUSAEQQhqIAMQHSAELQAIQQFxIAQtAAkQvgEQrAEgBEEQaiQAC0gAIAAQxAEgACgCAEF/RgRAEM4BAAsgAC8ABCAAQQZqLQAAQRB0chDVASIAQYD+A3FBCHQgAEEIdkGA/gNxIABBGHZychC7AQsLACAAIAFBBxD3AQs/AQJ/AkAgABBRIgBBGHENACAAQQdxIgJBB0YNAEEIQQQQugEiASAAQQV2QQFxrUIghiACrUIohoQ3AgALIAELCwAgACABQQgQ9wELPwAgAkEWdEGAgIAGcSABQf8BcUEMdCIBIAJB/AFxQQZ0ckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCwsAIAAgAUEKEPgBCwsAIAAgAUEMEPgBCwsAIAAgAUEUEPgBCwsAIAAgAUEWEPgBCwsAIAAgAUEZEPgBCwsAIAAgAUEbEPgBCwsAIAAgAUEeEPgBCwsAIAAgAUEfEPgBCwsAIAAgAUEkEPgBCwsAIAAgAUEyEPgBCz8AIAAQUSEAIAEQUyIBQRB0QYCA/AdxIABB/wFxQRJ0IAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2chCsAQtAAQF/IAAQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyrUIghjcCACABCzgAIAJBEHRBgID8B3EgAUH/AXFBDHQiASACckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCzwBAn8jAEEQayIBJAAgABDEASABQQhqIAAQSyABKAIILQABIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAs8AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEEsgASgCCC0AACABKAIMIgIgAigCAEEBazYCACABQRBqJAALOQEBfyMAQRBrIgIkACAAEMQBIAJBCGogABBUIAIoAgwgAigCCCABQQBHOgAAQQA2AgAgAkEQaiQACzkBAX8jAEEQayICJAAgABDEASACQQhqIAAQVCACKAIMIAIoAgggAUEARzoAAUEANgIAIAJBEGokAAs4AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEFQgASgCDEEANgIAIAAtAAQgABAEIAFBEGokAEEBcQs3AQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggtAAQgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzcBAn8jAEEQayIBJAAgAUEIaiAAEEogASgCCCgCACABKAIMIgIgAigCAEEBazYCACABQRBqJAALCgAgAEHVABD5AQsKACAAQdYAEPkBCwoAIABB1wAQ+QELCgAgAEHaABD5AQsKACAAQdsAEPkBCwoAIABB3AAQ+QELCgAgAEHdABD5AQs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAwANARoLIAMNAUEACw8LIAAgA0EAIAEoAgwRAAALMQEBfyMAQRBrIgEkACABQQhqIAAQHSABLQAJIAEtAAhBBXRBIHFyELwBIAFBEGokAAuhAgEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQbiGwAA2AhAgAkHoiMAANgIMIAJBDGoiACgCCCIBRQRAIwBBIGsiACQAIABBDGpCADcCACAAQQE2AgQgAEHoiMAANgIIIABBKzYCHCAAQZCIwAA2AhggACAAQRhqNgIAIABB2IjAABBJAAsgAUEMaigCACECAkACQCABKAIEDgIAAAELIAINAAsgAC0AECEBIAAtABEaQdiJwABB2InAACgCACIAQQFqNgIAAkAgAEEASA0AQaSNwAAtAABBAXENAEGkjcAAQQE6AABBoI3AAEGgjcAAKAIAQQFqNgIAQdSJwAAoAgBBAEgNAEGkjcAAQQA6AAAgAUUNAAALAAs1AQF/IAEQxAEgASgCACICQX9GBEAQzgEACyABIAJBAWo2AgAgACABNgIEIAAgAUEEajYCAAsxAQF/IAEoAgAiAkF/RwRAIAEgAkEBajYCACAAIAE2AgQgACABQQRqNgIADwsQzgEACzUBAX8gAEE2TwRAQeCCwABBGRDSAQALQQxBBBC6ASICIAA6AAggAiABNgIEIAJBADYCACACCzAAIAAQUSABEFEgAhBRIAMQURASIQBBCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQstACAAEMQBIAAoAgBBf0YEQBDOAQALIAAvAAQgAEEGai0AAEEQdHIQyAEQvAELLAAgABBRIAEQUSACEFEQKyEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELLAAgABBRIAEQUSACEFIQOCEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELJQEBfwJAIAAEQCAAKAIADQEgAC0ABCAAEAQPCxDNAQALEM4BAAslAQF/AkAgAARAIAAoAgANASAALwEEIAAQBA8LEM0BAAsQzgEACyUBAX8CQCAABEAgACgCAA0BIAAoAgQgABAEDwsQzQEACxDOAQALKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LEM4BAAspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeQAchDFARC7AQspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeUAchDFARC7AQslAQF/IAAQUSEAQQhBBBC6ASIBIABBAnRB/AFxrUIghjcCACABCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ0gEACyABAX8gABDEASAAKAIABEAQzgEACyAAKAIEIAAQBBAECyMAIAIQBSECIAAQvQEgARC9ASACEDhBCHRBygByEMUBELsBCx4AAkAgAARAIAAoAgANASAAEAQPCxDNAQALEM4BAAsPACAAIAEgAiADQRIQ7gELDwAgACABIAIgA0EYEO4BCw8AIAAgASACIANBHBDuAQsPACAAIAEgAiADQR0Q7gELDwAgACABIAIgA0EiEO4BCw8AIAAgASACIANBIxDuAQsPACAAIAEgAiADQSgQ7gELDwAgACABIAIgA0EqEO4BCw8AIAAgASACIANBLBDuAQsPACAAIAEgAiADQTgQ7gELEAAgACABIAIgA0HTABDvAQsQACAAIAEgAiADQdQAEO8BCxAAIAAgASACIANB3gAQ7wELEAAgACABIAIgA0HfABDvAQsQACAAIAEgAiADQeAAEO8BCxAAIAAgASACIANB4QAQ7wELEAAgACABIAIgA0HiABDvAQsQACAAIAEgAiADQeMAEO8BCxAAIAAgASACIANB5AAQ7wELEAAgACABIAIgA0HlABDvAQsQACAAIAEgAiADQeYAEO4BCxAAIAAgASACIANB5wAQ7gELEAAgACABIAIgA0HoABDuAQsQACAAIAEgAiADQekAEO4BCxAAIAAgASACIANB6gAQ7gELEAAgACABIAIgA0HrABDuAQsQACAAIAEgAiADQewAEO4BCx0BAX8jAEEQayIBJAAgAUEIaiAAEB0gAUEQaiQACx0BAX8jAEEQayIBJAAgAUEIaiAAEBMgAUEQaiQACx8AIAEQWCEBIAAQvQEgARC3AUEIdEHMAHIQxQEQuwELGQAgACABIAJBIEEAIAQbQRBBACADG3IQEgsNACAAIAEgAkEBEPABCw0AIAAgASACQQIQ8AELDQAgACABIAJBAxDwAQsNACAAIAEgAkEEEPABCw0AIAAgASACQQUQ8AELDQAgACABIAJBBhDwAQsNACAAIAEgAkEHEPABCw0AIAAgASACQQgQ8AELDQAgACABIAJBCRDwAQsNACAAIAEgAkELEPABCw0AIAAgASACQQ0Q8AELDQAgACABIAJBDhDwAQsNACAAIAEgAkEPEPABCw0AIAAgASACQRAQ8AELDQAgACABIAJBERDwAQsNACAAIAEgAkEXEPABCw0AIAAgASACQSEQ8AELDQAgACABIAJBJhDwAQsNACAAIAEgAkEnEPABCw0AIAAgASACQSkQ8AELDQAgACABIAJBKxDwAQsNACAAIAEgAkEtEPABCw0AIAAgASACQS4Q8AELDQAgACABIAJBLxDwAQsNACAAIAEgAkEwEPABCw0AIAAgASACQTEQ8AELDQAgACABIAJBNRDwAQsNACAAIAEgAkE3EPABCw0AIAAgASACQTkQ8QELDQAgACABIAJBOhDxAQsNACAAIAEgAkE7EPEBCw0AIAAgASACQTwQ8QELDQAgACABIAJBPRDxAQsNACAAIAEgAkE+EPEBCw0AIAAgASACQT8Q8QELDgAgACABIAJBwAAQ8QELDgAgACABIAJBwQAQ8QELDgAgACABIAJBwgAQ8QELDgAgACABIAJBwwAQ8QELDgAgACABIAJBxAAQ8QELDgAgACABIAJBxQAQ8QELDgAgACABIAJBxgAQ8QELDgAgACABIAJBxwAQ8QELDgAgACABIAJByAAQ8QELDgAgACABIAJByQAQ8QELDgAgACABIAJBygAQ8QELDgAgACABIAJB0QAQ8QELDgAgACABIAJB0gAQ8QELGAEBfyAAQf8BcUE/TQR/IAAQvAEFQQALCx4BAX9BCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQsbACAAEMQBIAAoAgBBf0YEQBDOAQALIAAtAAQLCQAgAEETEPMBCwkAIABBFRDzAQsJACAAQRoQ8wELCQAgAEEgEPMBCwkAIABBJRDzAQsJACAAQTQQ8wELCQAgAEE2EPMBCwoAIABB2AAQ8wELCgAgAEHZABDzAQsXACABQRB0QYCA/AdxIABBAnRB/AFxcgsXACAAEMQBIAAoAgAEQBDOAQALIAAQBAscACAAEL0BIAEQvQEgAhC9ARArQQh0EMUBELsBCxIAIAEgABDHASIABEAgAA8LAAsbAQF/QQhBBBC6ASIBIAA2AgQgAUEANgIAIAELGwEBf0EIQQQQugEiASAAOgAEIAFBADYCACABC24AIABB/wFxQcAATwRAIwBBMGsiACQAIABBIjYCDCAAQYCAwAA2AgggAEEcakIBNwIAIABBATYCFCAAQbCGwAA2AhAgAEEBNgIsIAAgAEEoajYCGCAAIABBCGo2AiggAEEQakG4gMAAEEkACyAACxQAIAAgASACQSBBACADGyAEchASCxgAIAAQUSABEFEgAhBRIAMQPRDCARCsAQsXACAAEFEgARBRIAIQUSADEFEQEhCsAQsTACAAEFEgARBRIAIQBRA4EKwBCxEAIAAgASACQSBBACADGxASCxMAIAAQUSABEFEgAhBSEDgQrAELDAAgAARADwsQzQEACxQBAX9BBEEBELoBIgEgADYAACABCxQBAX9BCEEEELoBIgBCADcCACAAC4EDAQV/QaWNwAAtAAAaAn8gAEEJTwRAAkBBzf97QRAgACAAQRBNGyIAayABTQ0AIABBECABQQtqQXhxIAFBC0kbIgRqQQxqEAEiAkUNACACQQhrIQECQCAAQQFrIgMgAnFFBEAgASEADAELIAJBBGsiBSgCACIGQXhxIAIgA2pBACAAa3FBCGsiAiAAQQAgAiABa0EQTRtqIgAgAWsiAmshAyAGQQNxBEAgACADIAAoAgRBAXFyQQJyNgIEIAAgA2oiAyADKAIEQQFyNgIEIAUgAiAFKAIAQQFxckECcjYCACABIAJqIgMgAygCBEEBcjYCBCABIAIQBgwBCyABKAIAIQEgACADNgIEIAAgASACajYCAAsCQCAAKAIEIgFBA3FFDQAgAUF4cSICIARBEGpNDQAgACAEIAFBAXFyQQJyNgIEIAAgBGoiASACIARrIgRBA3I2AgQgACACaiICIAIoAgRBAXI2AgQgASAEEAYLIABBCGohAwsgAwwBCyABEAELCw0AIAAQ1QFBCnZBP3ELEAAgABBRIAEQWBC3ARCsAQsgACAAQsWAsKa9qOHJSzcDCCAAQpXM9oWR7LDtHzcDAAsLACABBEAgABAECwsLACAAIwBqJAAjAAsNAEHoiMAAQRsQ0gEACw4AQYOJwABBzwAQ0gEACwsAIAAxAAAgARADCwsAIAAzAQAgARADCwsAIAA1AgAgARADCwkAIAAgARAAAAsKACAAQT9xELwBCwoAIAAQUUH/AXELBwAgAEEIdAsHACAAED0aCwcAIAAQURoLBwAgABBSGgsHACAAEFMaCwoAQTMQxQEQuwELBwBBCxC8AQsHAEEKELwBCwcAQQgQvAELBwBBDxC8AQsHAEEGELwBCwcAQQkQvAELBwBBBxC8AQsHAEEMELwBCwcAQQIQvAELBwBBARC8AQsHAEEDELwBCwcAQQ0QvAELBwBBDhC8AQsHAEEFELwBCwcAQQQQvAELBwBBEBC8AQsHAEEAELwBCwQAQQQLAgALJAAgABC9ASABEL0BIAIQvQEgAxC9ARASQQh0IARyEMUBELsBCyMAIAAQvQEgARC9ASACEL0BIAMQDRASQQh0IARyEMUBELsBCx8AIAAQvQEgARC9ASACEL0BECtBCHQgA3IQxQEQuwELHgAgABC9ASABEL0BIAIQDhA4QQh0IANyEMUBELsBC2IBAX8jAEEwayIEJAAgBCAANgIMIAAgA08EQCAEQRxqQgE3AgAgBEECNgIUIAQgAjYCECAEQQQ2AiwgBCAEQShqNgIYIAQgBEEMajYCKCAEQRBqIAEQSQALIARBMGokACAACxsAIAAQvQEaIABBCnRBgPgDcSABchDFARC7AQtSAQJ/IwBBEGsiBSQAIAVBCGogAxATIAUtAAkhAyAFLQAIIQYgABC9ASABEL0BIAIQvQEgBkEBcSADQQFxEHpBCHQgBHIQxQEQuwEgBUEQaiQAC1ABAn8jAEEQayIFJAAgBUEIaiADEB0gBS0ACCEDIAUtAAkhBiAAEL0BIAEQvQEgAhC9ASADQQFxIAYQvgFBCHQgBHIQxQEQuwEgBUEQaiQAC0oAIAAQvQEaIAEQECIBQRB0QYCA/AdxIABBEnRBgIDwH3EgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyQQh0IAJyEMUBELsBC0kBAX8jAEEQayIDJAAgABDEASABIAJPBEBB4ILAAEEZENIBAAsgA0EIaiAAEFQgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQgAgABC9ARogARC9ARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyEMUBELsBCzYAIAAQESIAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2ckEIdCABchDFARC7AQsL3AkBAEGAgMAAC9IJQ2hlY2tSZWdJZCB3YXMgZ2l2ZW4gaW52YWxpZCBSZWdJZGZ1ZWwtYXNtL3NyYy9saWIucnMAAAAiABAAEwAAAG0AAAAiAAAAVmFsdWUgYGAgb3V0IG9mIHJhbmdlIGZvciA2LWJpdCBpbW1lZGlhdGUAAABIABAABwAAAE8AEAAiAAAAIgAQABMAAACoAwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxMi1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAlAAQACMAAAAiABAAEwAAAK0DAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDE4LWJpdCBpbW1lZGlhdGUASAAQAAcAAADYABAAIwAAACIAEAATAAAAsgMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMjQtYml0IGltbWVkaWF0ZQBIABAABwAAABwBEAAjAAAAIgAQABMAAAC3AwAAHAAAAGludmFsaWQgZW51bSB2YWx1ZSBwYXNzZWQAAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAkAAAAJEAAACSAAAAkwAAAJQAAACVAAAAlgAAAJcAAACYAAAAoAAAAKEAAACiAAAAowAAAKQAAAClAAAApgAAAKcAAACoAAAAqQAAAKoAAACrAAAArAAAAK0AAACwAAAAaAQQAAAAAAAFAAAAAAAAAAEAAAAGAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTljYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlbGlicmFyeS9zdGQvc3JjL3Bhbmlja2luZy5ycwA7BBAAHAAAAIQCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMC4zDHdhc20tYmluZGdlbgYwLjIuOTI=", e);
}
async function fo() {
  return await X0(Sh());
}
fo();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const gt = BigInt(0), ke = BigInt(1), Cn = BigInt(2), Qh = BigInt(3), vi = BigInt(4), ka = BigInt(5), Pa = BigInt(8);
BigInt(9);
BigInt(16);
function It(e, t) {
  const n = e % t;
  return n >= gt ? n : t + n;
}
function Nh(e, t, n) {
  if (n <= gt || t < gt)
    throw new Error("Expected power/modulo > 0");
  if (n === ke)
    return gt;
  let r = ke;
  for (; t > gt; )
    t & ke && (r = r * e % n), e = e * e % n, t >>= ke;
  return r;
}
function xt(e, t, n) {
  let r = e;
  for (; t-- > gt; )
    r *= r, r %= n;
  return r;
}
function xi(e, t) {
  if (e === gt || t <= gt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = It(e, t), r = t, s = gt, i = ke;
  for (; n !== gt; ) {
    const u = r / n, A = r % n, h = s - i * u;
    r = n, n = A, s = i, i = h;
  }
  if (r !== ke)
    throw new Error("invert: does not exist");
  return It(s, t);
}
function Dh(e) {
  const t = (e - ke) / Cn;
  let n, r, s;
  for (n = e - ke, r = 0; n % Cn === gt; n /= Cn, r++)
    ;
  for (s = Cn; s < e && Nh(s, t, e) !== e - ke; s++)
    ;
  if (r === 1) {
    const o = (e + ke) / vi;
    return function(A, h) {
      const E = A.pow(h, o);
      if (!A.eql(A.sqr(E), h))
        throw new Error("Cannot find square root");
      return E;
    };
  }
  const i = (n + ke) / Cn;
  return function(u, A) {
    if (u.pow(A, t) === u.neg(u.ONE))
      throw new Error("Cannot find square root");
    let h = r, E = u.pow(u.mul(u.ONE, s), n), I = u.pow(A, i), _ = u.pow(A, n);
    for (; !u.eql(_, u.ONE); ) {
      if (u.eql(_, u.ZERO))
        return u.ZERO;
      let v = 1;
      for (let C = u.sqr(_); v < h && !u.eql(C, u.ONE); v++)
        C = u.sqr(C);
      const R = u.pow(E, ke << BigInt(h - v - 1));
      E = u.sqr(R), I = u.mul(I, R), _ = u.mul(_, E), h = v;
    }
    return I;
  };
}
function Th(e) {
  if (e % vi === Qh) {
    const t = (e + ke) / vi;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % Pa === ka) {
    const t = (e - ka) / Pa;
    return function(r, s) {
      const i = r.mul(s, Cn), o = r.pow(i, t), u = r.mul(s, o), A = r.mul(r.mul(u, Cn), o), h = r.mul(u, r.sub(A, r.ONE));
      if (!r.eql(r.sqr(h), s))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  return Dh(e);
}
const Fh = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function Mh(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = Fh.reduce((r, s) => (r[s] = "function", r), t);
  return xr(e, n);
}
function Oh(e, t, n) {
  if (n < gt)
    throw new Error("Expected power > 0");
  if (n === gt)
    return e.ONE;
  if (n === ke)
    return t;
  let r = e.ONE, s = t;
  for (; n > gt; )
    n & ke && (r = e.mul(r, s)), s = e.sqr(s), n >>= ke;
  return r;
}
function Lh(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, u) => e.is0(o) ? i : (n[u] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, u) => e.is0(o) ? i : (n[u] = e.mul(i, n[u]), e.mul(i, o)), s), n;
}
function z0(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function kh(e, t, n = !1, r = {}) {
  if (e <= gt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = z0(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Th(e), u = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: co(s),
    ZERO: gt,
    ONE: ke,
    create: (A) => It(A, e),
    isValid: (A) => {
      if (typeof A != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof A}`);
      return gt <= A && A < e;
    },
    is0: (A) => A === gt,
    isOdd: (A) => (A & ke) === ke,
    neg: (A) => It(-A, e),
    eql: (A, h) => A === h,
    sqr: (A) => It(A * A, e),
    add: (A, h) => It(A + h, e),
    sub: (A, h) => It(A - h, e),
    mul: (A, h) => It(A * h, e),
    pow: (A, h) => Oh(u, A, h),
    div: (A, h) => It(A * xi(h, e), e),
    // Same as above, but doesn't normalize
    sqrN: (A) => A * A,
    addN: (A, h) => A + h,
    subN: (A, h) => A - h,
    mulN: (A, h) => A * h,
    inv: (A) => xi(A, e),
    sqrt: r.sqrt || ((A) => o(u, A)),
    invertBatch: (A) => Lh(u, A),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (A, h, E) => E ? h : A,
    toBytes: (A) => n ? ao(A, i) : qn(A, i),
    fromBytes: (A) => {
      if (A.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${A.length}`);
      return n ? oo(A) : Rn(A);
    }
  });
  return Object.freeze(u);
}
function Y0(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function V0(e) {
  const t = Y0(e);
  return t + Math.ceil(t / 2);
}
function Ph(e, t, n = !1) {
  const r = e.length, s = Y0(t), i = V0(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Rn(e) : oo(e), u = It(o, t - ke) + ke;
  return n ? ao(u, s) : qn(u, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Uh = BigInt(0), si = BigInt(1);
function Gh(e, t) {
  const n = (s, i) => {
    const o = i.negate();
    return s ? o : i;
  }, r = (s) => {
    const i = Math.ceil(t / s) + 1, o = 2 ** (s - 1);
    return { windows: i, windowSize: o };
  };
  return {
    constTimeNegate: n,
    // non-const time multiplication ladder
    unsafeLadder(s, i) {
      let o = e.ZERO, u = s;
      for (; i > Uh; )
        i & si && (o = o.add(u)), u = u.double(), i >>= si;
      return o;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(s, i) {
      const { windows: o, windowSize: u } = r(i), A = [];
      let h = s, E = h;
      for (let I = 0; I < o; I++) {
        E = h, A.push(E);
        for (let _ = 1; _ < u; _++)
          E = E.add(h), A.push(E);
        h = E.double();
      }
      return A;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, o) {
      const { windows: u, windowSize: A } = r(s);
      let h = e.ZERO, E = e.BASE;
      const I = BigInt(2 ** s - 1), _ = 2 ** s, v = BigInt(s);
      for (let R = 0; R < u; R++) {
        const C = R * A;
        let F = Number(o & I);
        o >>= v, F > A && (F -= _, o += si);
        const M = C, G = C + Math.abs(F) - 1, L = R % 2 !== 0, W = F < 0;
        F === 0 ? E = E.add(n(L, i[M])) : h = h.add(n(W, i[G]));
      }
      return { p: h, f: E };
    },
    wNAFCached(s, i, o, u) {
      const A = s._WINDOW_SIZE || 1;
      let h = i.get(s);
      return h || (h = this.precomputeWindow(s, A), A !== 1 && i.set(s, u(h))), this.wNAF(A, h, o);
    }
  };
}
function H0(e) {
  return Mh(e.Fp), xr(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...z0(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Xh(e) {
  const t = H0(e);
  xr(t, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: n, Fp: r, a: s } = t;
  if (n) {
    if (!r.eql(s, r.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof n != "object" || typeof n.beta != "bigint" || typeof n.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: zh, hexToBytes: Yh } = Hl, Bn = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = Bn;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: zh(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Bn, n = typeof e == "string" ? Yh(e) : e;
    if (!Gt(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Bn._parseInt(n.subarray(2)), { d: o, l: u } = Bn._parseInt(i);
    if (u.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (h) => Number.parseInt(h[0], 16) & 8 ? "00" + h : h, n = (h) => {
      const E = h.toString(16);
      return E.length & 1 ? `0${E}` : E;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, u = n(i), A = n(o);
    return `30${n(o + i + 4)}02${A}${s}02${u}${r}`;
  }
}, Zt = BigInt(0), Rt = BigInt(1);
BigInt(2);
const Ua = BigInt(3);
BigInt(4);
function Vh(e) {
  const t = Xh(e), { Fp: n } = t, r = t.toBytes || ((R, C, F) => {
    const M = C.toAffine();
    return yr(Uint8Array.from([4]), n.toBytes(M.x), n.toBytes(M.y));
  }), s = t.fromBytes || ((R) => {
    const C = R.subarray(1), F = n.fromBytes(C.subarray(0, n.BYTES)), M = n.fromBytes(C.subarray(n.BYTES, 2 * n.BYTES));
    return { x: F, y: M };
  });
  function i(R) {
    const { a: C, b: F } = t, M = n.sqr(R), G = n.mul(M, R);
    return n.add(n.add(G, n.mul(R, C)), F);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(R) {
    return typeof R == "bigint" && Zt < R && R < t.n;
  }
  function u(R) {
    if (!o(R))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function A(R) {
    const { allowedPrivateKeyLengths: C, nByteLength: F, wrapPrivateKey: M, n: G } = t;
    if (C && typeof R != "bigint") {
      if (Gt(R) && (R = Wn(R)), typeof R != "string" || !C.includes(R.length))
        throw new Error("Invalid key");
      R = R.padStart(F * 2, "0");
    }
    let L;
    try {
      L = typeof R == "bigint" ? R : Rn(Nt("private key", R, F));
    } catch {
      throw new Error(`private key must be ${F} bytes, hex or bigint, not ${typeof R}`);
    }
    return M && (L = It(L, G)), u(L), L;
  }
  const h = /* @__PURE__ */ new Map();
  function E(R) {
    if (!(R instanceof I))
      throw new Error("ProjectivePoint expected");
  }
  class I {
    constructor(C, F, M) {
      if (this.px = C, this.py = F, this.pz = M, C == null || !n.isValid(C))
        throw new Error("x required");
      if (F == null || !n.isValid(F))
        throw new Error("y required");
      if (M == null || !n.isValid(M))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(C) {
      const { x: F, y: M } = C || {};
      if (!C || !n.isValid(F) || !n.isValid(M))
        throw new Error("invalid affine point");
      if (C instanceof I)
        throw new Error("projective point not allowed");
      const G = (L) => n.eql(L, n.ZERO);
      return G(F) && G(M) ? I.ZERO : new I(F, M, n.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(C) {
      const F = n.invertBatch(C.map((M) => M.pz));
      return C.map((M, G) => M.toAffine(F[G])).map(I.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(C) {
      const F = I.fromAffine(s(Nt("pointHex", C)));
      return F.assertValidity(), F;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(C) {
      return I.BASE.multiply(A(C));
    }
    // "Private method", don't use it directly
    _setWindowSize(C) {
      this._WINDOW_SIZE = C, h.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !n.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: C, y: F } = this.toAffine();
      if (!n.isValid(C) || !n.isValid(F))
        throw new Error("bad point: x or y not FE");
      const M = n.sqr(F), G = i(C);
      if (!n.eql(M, G))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: C } = this.toAffine();
      if (n.isOdd)
        return !n.isOdd(C);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(C) {
      E(C);
      const { px: F, py: M, pz: G } = this, { px: L, py: W, pz: O } = C, T = n.eql(n.mul(F, O), n.mul(L, G)), k = n.eql(n.mul(M, O), n.mul(W, G));
      return T && k;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new I(this.px, n.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: C, b: F } = t, M = n.mul(F, Ua), { px: G, py: L, pz: W } = this;
      let O = n.ZERO, T = n.ZERO, k = n.ZERO, U = n.mul(G, G), q = n.mul(L, L), Y = n.mul(W, W), H = n.mul(G, L);
      return H = n.add(H, H), k = n.mul(G, W), k = n.add(k, k), O = n.mul(C, k), T = n.mul(M, Y), T = n.add(O, T), O = n.sub(q, T), T = n.add(q, T), T = n.mul(O, T), O = n.mul(H, O), k = n.mul(M, k), Y = n.mul(C, Y), H = n.sub(U, Y), H = n.mul(C, H), H = n.add(H, k), k = n.add(U, U), U = n.add(k, U), U = n.add(U, Y), U = n.mul(U, H), T = n.add(T, U), Y = n.mul(L, W), Y = n.add(Y, Y), U = n.mul(Y, H), O = n.sub(O, U), k = n.mul(Y, q), k = n.add(k, k), k = n.add(k, k), new I(O, T, k);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(C) {
      E(C);
      const { px: F, py: M, pz: G } = this, { px: L, py: W, pz: O } = C;
      let T = n.ZERO, k = n.ZERO, U = n.ZERO;
      const q = t.a, Y = n.mul(t.b, Ua);
      let H = n.mul(F, L), ee = n.mul(M, W), b = n.mul(G, O), a = n.add(F, M), c = n.add(L, W);
      a = n.mul(a, c), c = n.add(H, ee), a = n.sub(a, c), c = n.add(F, G);
      let l = n.add(L, O);
      return c = n.mul(c, l), l = n.add(H, b), c = n.sub(c, l), l = n.add(M, G), T = n.add(W, O), l = n.mul(l, T), T = n.add(ee, b), l = n.sub(l, T), U = n.mul(q, c), T = n.mul(Y, b), U = n.add(T, U), T = n.sub(ee, U), U = n.add(ee, U), k = n.mul(T, U), ee = n.add(H, H), ee = n.add(ee, H), b = n.mul(q, b), c = n.mul(Y, c), ee = n.add(ee, b), b = n.sub(H, b), b = n.mul(q, b), c = n.add(c, b), H = n.mul(ee, c), k = n.add(k, H), H = n.mul(l, c), T = n.mul(a, T), T = n.sub(T, H), H = n.mul(a, ee), U = n.mul(l, U), U = n.add(U, H), new I(T, k, U);
    }
    subtract(C) {
      return this.add(C.negate());
    }
    is0() {
      return this.equals(I.ZERO);
    }
    wNAF(C) {
      return v.wNAFCached(this, h, C, (F) => {
        const M = n.invertBatch(F.map((G) => G.pz));
        return F.map((G, L) => G.toAffine(M[L])).map(I.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(C) {
      const F = I.ZERO;
      if (C === Zt)
        return F;
      if (u(C), C === Rt)
        return this;
      const { endo: M } = t;
      if (!M)
        return v.unsafeLadder(this, C);
      let { k1neg: G, k1: L, k2neg: W, k2: O } = M.splitScalar(C), T = F, k = F, U = this;
      for (; L > Zt || O > Zt; )
        L & Rt && (T = T.add(U)), O & Rt && (k = k.add(U)), U = U.double(), L >>= Rt, O >>= Rt;
      return G && (T = T.negate()), W && (k = k.negate()), k = new I(n.mul(k.px, M.beta), k.py, k.pz), T.add(k);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(C) {
      u(C);
      let F = C, M, G;
      const { endo: L } = t;
      if (L) {
        const { k1neg: W, k1: O, k2neg: T, k2: k } = L.splitScalar(F);
        let { p: U, f: q } = this.wNAF(O), { p: Y, f: H } = this.wNAF(k);
        U = v.constTimeNegate(W, U), Y = v.constTimeNegate(T, Y), Y = new I(n.mul(Y.px, L.beta), Y.py, Y.pz), M = U.add(Y), G = q.add(H);
      } else {
        const { p: W, f: O } = this.wNAF(F);
        M = W, G = O;
      }
      return I.normalizeZ([M, G])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(C, F, M) {
      const G = I.BASE, L = (O, T) => T === Zt || T === Rt || !O.equals(G) ? O.multiplyUnsafe(T) : O.multiply(T), W = L(this, F).add(L(C, M));
      return W.is0() ? void 0 : W;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(C) {
      const { px: F, py: M, pz: G } = this, L = this.is0();
      C == null && (C = L ? n.ONE : n.inv(G));
      const W = n.mul(F, C), O = n.mul(M, C), T = n.mul(G, C);
      if (L)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(T, n.ONE))
        throw new Error("invZ was invalid");
      return { x: W, y: O };
    }
    isTorsionFree() {
      const { h: C, isTorsionFree: F } = t;
      if (C === Rt)
        return !0;
      if (F)
        return F(I, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: C, clearCofactor: F } = t;
      return C === Rt ? this : F ? F(I, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(C = !0) {
      return this.assertValidity(), r(I, this, C);
    }
    toHex(C = !0) {
      return Wn(this.toRawBytes(C));
    }
  }
  I.BASE = new I(t.Gx, t.Gy, n.ONE), I.ZERO = new I(n.ZERO, n.ONE, n.ZERO);
  const _ = t.nBitLength, v = Gh(I, t.endo ? Math.ceil(_ / 2) : _);
  return {
    CURVE: t,
    ProjectivePoint: I,
    normPrivateKeyToScalar: A,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Hh(e) {
  const t = H0(e);
  return xr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Zh(e) {
  const t = Hh(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(c) {
    return Zt < c && c < n.ORDER;
  }
  function u(c) {
    return It(c, r);
  }
  function A(c) {
    return xi(c, r);
  }
  const { ProjectivePoint: h, normPrivateKeyToScalar: E, weierstrassEquation: I, isWithinCurveOrder: _ } = Vh({
    ...t,
    toBytes(c, l, p) {
      const f = l.toAffine(), w = n.toBytes(f.x), y = yr;
      return p ? y(Uint8Array.from([l.hasEvenY() ? 2 : 3]), w) : y(Uint8Array.from([4]), w, n.toBytes(f.y));
    },
    fromBytes(c) {
      const l = c.length, p = c[0], f = c.subarray(1);
      if (l === s && (p === 2 || p === 3)) {
        const w = Rn(f);
        if (!o(w))
          throw new Error("Point is not on curve");
        const y = I(w);
        let g = n.sqrt(y);
        const d = (g & Rt) === Rt;
        return (p & 1) === 1 !== d && (g = n.neg(g)), { x: w, y: g };
      } else if (l === i && p === 4) {
        const w = n.fromBytes(f.subarray(0, n.BYTES)), y = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: w, y };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), v = (c) => Wn(qn(c, t.nByteLength));
  function R(c) {
    const l = r >> Rt;
    return c > l;
  }
  function C(c) {
    return R(c) ? u(-c) : c;
  }
  const F = (c, l, p) => Rn(c.slice(l, p));
  class M {
    constructor(l, p, f) {
      this.r = l, this.s = p, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(l) {
      const p = t.nByteLength;
      return l = Nt("compactSignature", l, p * 2), new M(F(l, 0, p), F(l, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(l) {
      const { r: p, s: f } = Bn.toSig(Nt("DER", l));
      return new M(p, f);
    }
    assertValidity() {
      if (!_(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!_(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(l) {
      return new M(this.r, this.s, l);
    }
    recoverPublicKey(l) {
      const { r: p, s: f, recovery: w } = this, y = k(Nt("msgHash", l));
      if (w == null || ![0, 1, 2, 3].includes(w))
        throw new Error("recovery id invalid");
      const g = w === 2 || w === 3 ? p + t.n : p;
      if (g >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const d = w & 1 ? "03" : "02", m = h.fromHex(d + v(g)), Z = A(g), J = u(-y * Z), K = u(f * Z), j = h.BASE.multiplyAndAddUnsafe(m, J, K);
      if (!j)
        throw new Error("point at infinify");
      return j.assertValidity(), j;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return R(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new M(this.r, u(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Jn(this.toDERHex());
    }
    toDERHex() {
      return Bn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Jn(this.toCompactHex());
    }
    toCompactHex() {
      return v(this.r) + v(this.s);
    }
  }
  const G = {
    isValidPrivateKey(c) {
      try {
        return E(c), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: E,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const c = V0(t.n);
      return Ph(t.randomBytes(c), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(c = 8, l = h.BASE) {
      return l._setWindowSize(c), l.multiply(BigInt(3)), l;
    }
  };
  function L(c, l = !0) {
    return h.fromPrivateKey(c).toRawBytes(l);
  }
  function W(c) {
    const l = Gt(c), p = typeof c == "string", f = (l || p) && c.length;
    return l ? f === s || f === i : p ? f === 2 * s || f === 2 * i : c instanceof h;
  }
  function O(c, l, p = !0) {
    if (W(c))
      throw new Error("first arg must be private key");
    if (!W(l))
      throw new Error("second arg must be public key");
    return h.fromHex(l).multiply(E(c)).toRawBytes(p);
  }
  const T = t.bits2int || function(c) {
    const l = Rn(c), p = c.length * 8 - t.nBitLength;
    return p > 0 ? l >> BigInt(p) : l;
  }, k = t.bits2int_modN || function(c) {
    return u(T(c));
  }, U = co(t.nBitLength);
  function q(c) {
    if (typeof c != "bigint")
      throw new Error("bigint expected");
    if (!(Zt <= c && c < U))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return qn(c, t.nByteLength);
  }
  function Y(c, l, p = H) {
    if (["recovered", "canonical"].some((se) => se in p))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: w } = t;
    let { lowS: y, prehash: g, extraEntropy: d } = p;
    y == null && (y = !0), c = Nt("msgHash", c), g && (c = Nt("prehashed msgHash", f(c)));
    const m = k(c), Z = E(l), J = [q(Z), q(m)];
    if (d != null) {
      const se = d === !0 ? w(n.BYTES) : d;
      J.push(Nt("extraEntropy", se));
    }
    const K = yr(...J), j = m;
    function re(se) {
      const Se = T(se);
      if (!_(Se))
        return;
      const fe = A(Se), oe = h.BASE.multiply(Se).toAffine(), ve = u(oe.x);
      if (ve === Zt)
        return;
      const Ae = u(fe * u(j + ve * Z));
      if (Ae === Zt)
        return;
      let he = (oe.x === ve ? 0 : 2) | Number(oe.y & Rt), Tt = Ae;
      return y && R(Ae) && (Tt = C(Ae), he ^= 1), new M(ve, Tt, he);
    }
    return { seed: K, k2sig: re };
  }
  const H = { lowS: t.lowS, prehash: !1 }, ee = { lowS: t.lowS, prehash: !1 };
  function b(c, l, p = H) {
    const { seed: f, k2sig: w } = Y(c, l, p), y = t;
    return y0(y.hash.outputLen, y.nByteLength, y.hmac)(f, w);
  }
  h.BASE._setWindowSize(8);
  function a(c, l, p, f = ee) {
    var oe;
    const w = c;
    if (l = Nt("msgHash", l), p = Nt("publicKey", p), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: y, prehash: g } = f;
    let d, m;
    try {
      if (typeof w == "string" || Gt(w))
        try {
          d = M.fromDER(w);
        } catch (ve) {
          if (!(ve instanceof Bn.Err))
            throw ve;
          d = M.fromCompact(w);
        }
      else if (typeof w == "object" && typeof w.r == "bigint" && typeof w.s == "bigint") {
        const { r: ve, s: Ae } = w;
        d = new M(ve, Ae);
      } else
        throw new Error("PARSE");
      m = h.fromHex(p);
    } catch (ve) {
      if (ve.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (y && d.hasHighS())
      return !1;
    g && (l = t.hash(l));
    const { r: Z, s: J } = d, K = k(l), j = A(J), re = u(K * j), se = u(Z * j), Se = (oe = h.BASE.multiplyAndAddUnsafe(m, re, se)) == null ? void 0 : oe.toAffine();
    return Se ? u(Se.x) === Z : !1;
  }
  return {
    CURVE: t,
    getPublicKey: L,
    getSharedSecret: O,
    sign: b,
    verify: a,
    ProjectivePoint: h,
    Signature: M,
    utils: G
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Wh(e) {
  return {
    hash: e,
    hmac: (t, ...n) => Is(e, t, Sd(...n)),
    randomBytes: Nd
  };
}
function Jh(e, t) {
  const n = (r) => Zh({ ...e, ...Wh(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Z0 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Ga = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), qh = BigInt(1), Ri = BigInt(2), Xa = (e, t) => (e + t / Ri) / t;
function jh(e) {
  const t = Z0, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), u = BigInt(44), A = BigInt(88), h = e * e * e % t, E = h * h * e % t, I = xt(E, n, t) * E % t, _ = xt(I, n, t) * E % t, v = xt(_, Ri, t) * h % t, R = xt(v, s, t) * v % t, C = xt(R, i, t) * R % t, F = xt(C, u, t) * C % t, M = xt(F, A, t) * F % t, G = xt(M, u, t) * C % t, L = xt(G, n, t) * E % t, W = xt(L, o, t) * R % t, O = xt(W, r, t) * h % t, T = xt(O, Ri, t);
  if (!Si.eql(Si.sqr(T), e))
    throw new Error("Cannot find square root");
  return T;
}
const Si = kh(Z0, void 0, void 0, { sqrt: jh }), tn = Jh({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Si,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: Ga,
  // Curve order, total count of valid points in the field
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: !0,
  // Allow only low-S signatures by default in sign() and verify()
  /**
   * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
   * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
   * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
   * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
   */
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (e) => {
      const t = Ga, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -qh * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), u = Xa(i * e, t), A = Xa(-r * e, t);
      let h = It(e - u * n - A * s, t), E = It(-u * r - A * i, t);
      const I = h > o, _ = E > o;
      if (I && (h = t - h), _ && (E = t - E), h > o || E > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: I, k1: h, k2neg: _, k2: E };
    }
  }
}, Nn);
BigInt(0);
tn.ProjectivePoint;
let Xr;
const $h = new Uint8Array(16);
function Kh() {
  if (!Xr && (Xr = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Xr))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Xr($h);
}
const pt = [];
for (let e = 0; e < 256; ++e)
  pt.push((e + 256).toString(16).slice(1));
function eg(e, t = 0) {
  return (pt[e[t + 0]] + pt[e[t + 1]] + pt[e[t + 2]] + pt[e[t + 3]] + "-" + pt[e[t + 4]] + pt[e[t + 5]] + "-" + pt[e[t + 6]] + pt[e[t + 7]] + "-" + pt[e[t + 8]] + pt[e[t + 9]] + "-" + pt[e[t + 10]] + pt[e[t + 11]] + pt[e[t + 12]] + pt[e[t + 13]] + pt[e[t + 14]] + pt[e[t + 15]]).toLowerCase();
}
const tg = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), za = {
  randomUUID: tg
};
function ng(e, t, n) {
  if (za.randomUUID && !t && !e)
    return za.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || Kh)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return eg(r);
}
var ho = { exports: {} }, Un = typeof Reflect == "object" ? Reflect : null, Ya = Un && typeof Un.apply == "function" ? Un.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, ns;
Un && typeof Un.ownKeys == "function" ? ns = Un.ownKeys : Object.getOwnPropertySymbols ? ns = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : ns = function(t) {
  return Object.getOwnPropertyNames(t);
};
function rg(e) {
  console && console.warn && console.warn(e);
}
var W0 = Number.isNaN || function(t) {
  return t !== t;
};
function Be() {
  Be.init.call(this);
}
ho.exports = Be;
ho.exports.once = ag;
Be.EventEmitter = Be;
Be.prototype._events = void 0;
Be.prototype._eventsCount = 0;
Be.prototype._maxListeners = void 0;
var Va = 10;
function xs(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Be, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Va;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || W0(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Va = e;
  }
});
Be.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Be.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || W0(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function J0(e) {
  return e._maxListeners === void 0 ? Be.defaultMaxListeners : e._maxListeners;
}
Be.prototype.getMaxListeners = function() {
  return J0(this);
};
Be.prototype.emit = function(t) {
  for (var n = [], r = 1; r < arguments.length; r++)
    n.push(arguments[r]);
  var s = t === "error", i = this._events;
  if (i !== void 0)
    s = s && i.error === void 0;
  else if (!s)
    return !1;
  if (s) {
    var o;
    if (n.length > 0 && (o = n[0]), o instanceof Error)
      throw o;
    var u = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw u.context = o, u;
  }
  var A = i[t];
  if (A === void 0)
    return !1;
  if (typeof A == "function")
    Ya(A, this, n);
  else
    for (var h = A.length, E = eu(A, h), r = 0; r < h; ++r)
      Ya(E[r], this, n);
  return !0;
};
function q0(e, t, n, r) {
  var s, i, o;
  if (xs(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = J0(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var u = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    u.name = "MaxListenersExceededWarning", u.emitter = e, u.type = t, u.count = o.length, rg(u);
  }
  return e;
}
Be.prototype.addListener = function(t, n) {
  return q0(this, t, n, !1);
};
Be.prototype.on = Be.prototype.addListener;
Be.prototype.prependListener = function(t, n) {
  return q0(this, t, n, !0);
};
function sg() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function j0(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = sg.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Be.prototype.once = function(t, n) {
  return xs(n), this.on(t, j0(this, t, n)), this;
};
Be.prototype.prependOnceListener = function(t, n) {
  return xs(n), this.prependListener(t, j0(this, t, n)), this;
};
Be.prototype.removeListener = function(t, n) {
  var r, s, i, o, u;
  if (xs(n), s = this._events, s === void 0)
    return this;
  if (r = s[t], r === void 0)
    return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete s[t], s.removeListener && this.emit("removeListener", t, r.listener || n));
  else if (typeof r != "function") {
    for (i = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === n || r[o].listener === n) {
        u = r[o].listener, i = o;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? r.shift() : ig(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, u || n);
  }
  return this;
};
Be.prototype.off = Be.prototype.removeListener;
Be.prototype.removeAllListeners = function(t) {
  var n, r, s;
  if (r = this._events, r === void 0)
    return this;
  if (r.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : r[t] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete r[t]), this;
  if (arguments.length === 0) {
    var i = Object.keys(r), o;
    for (s = 0; s < i.length; ++s)
      o = i[s], o !== "removeListener" && this.removeAllListeners(o);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (n = r[t], typeof n == "function")
    this.removeListener(t, n);
  else if (n !== void 0)
    for (s = n.length - 1; s >= 0; s--)
      this.removeListener(t, n[s]);
  return this;
};
function $0(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? og(s) : eu(s, s.length);
}
Be.prototype.listeners = function(t) {
  return $0(this, t, !0);
};
Be.prototype.rawListeners = function(t) {
  return $0(this, t, !1);
};
Be.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : K0.call(e, t);
};
Be.prototype.listenerCount = K0;
function K0(e) {
  var t = this._events;
  if (t !== void 0) {
    var n = t[e];
    if (typeof n == "function")
      return 1;
    if (n !== void 0)
      return n.length;
  }
  return 0;
}
Be.prototype.eventNames = function() {
  return this._eventsCount > 0 ? ns(this._events) : [];
};
function eu(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function ig(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function og(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function ag(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    tu(e, t, i, { once: !0 }), t !== "error" && cg(e, s, { once: !0 });
  });
}
function cg(e, t, n) {
  typeof e.on == "function" && tu(e, "error", t, n);
}
function tu(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var nu = ho.exports, ug = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", dg = class {
  constructor(e, t, n, r, s, i = 0) {
    S(this, "left");
    S(this, "right");
    S(this, "parent");
    S(this, "hash");
    S(this, "data");
    S(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, Ha = dg;
function Ag(e) {
  return Jt("0x00".concat(e.slice(2)));
}
function lg(e, t) {
  return Jt("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function ru(e) {
  if (!e.length)
    return ug;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = Ag(e[i]);
    t.push(new Ha(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, u = lg(n[o].hash, n[o + 1].hash);
      t[i] = new Ha(n[o].index, n[o + 1].index, -1, u, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var fg = "0x00", su = "0x01";
function hg(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(Jt(t).slice(2));
  return [Jt(n), n];
}
function Dn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [Jt(n), n];
}
function ii(e) {
  const t = su.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function gg(e) {
  const t = su.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function oi(e) {
  return e.slice(0, 4) === fg;
}
var pg = class {
  constructor(e, t, n, r, s) {
    S(this, "SideNodes");
    S(this, "NonMembershipLeafData");
    S(this, "BitMask");
    S(this, "NumSideNodes");
    S(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, mg = pg, wg = class {
  constructor(e, t, n) {
    S(this, "SideNodes");
    S(this, "NonMembershipLeafData");
    S(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, yg = wg, Bt = "0x0000000000000000000000000000000000000000000000000000000000000000", Ht = 256;
function On(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function Ig(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function Eg(e, t) {
  let n = 0;
  for (let r = 0; r < Ht && On(e, r) === On(t, r); r += 1)
    n += 1;
  return n;
}
function bg(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === Bt ? t.push(0) : (n.push(r), t.push(1));
  return new mg(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var Cg = class {
  constructor() {
    S(this, "ms");
    S(this, "root");
    const e = {};
    this.ms = e, this.root = Bt, this.ms[this.root] = Bt;
  }
  get(e) {
    return this.ms[e];
  }
  set(e, t) {
    this.ms[e] = t;
  }
  setRoot(e) {
    this.root = e;
  }
  sideNodesForRoot(e, t) {
    const n = [];
    if (t === Bt)
      return [n, Bt, "", ""];
    let r = this.get(t);
    if (oi(r))
      return [n, t, r, ""];
    let s, i, o = "", u = "";
    for (let h = 0; h < Ht; h += 1) {
      if ([s, i] = gg(r), On(e, h) === 1 ? (u = s, o = i) : (u = i, o = s), n.push(u), o === Bt) {
        r = "";
        break;
      }
      if (r = this.get(o), oi(r))
        break;
    }
    const A = this.get(u);
    return [Ig(n), o, r, A];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === Bt)
      return this.root;
    const [s] = ii(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", u = "", A = "", h = !1;
    for (let E = 0; E < t.length; E += 1)
      if (t[E] !== "") {
        if (u = t[E], o === "")
          if (A = this.get(u), oi(A)) {
            i = u, o = u;
            continue;
          } else
            o = Bt, h = !0;
        !h && u === Bt || (h || (h = !0), On(e, t.length - 1 - E) === 1 ? [i, o] = Dn(u, o) : [i, o] = Dn(o, u), this.set(i, o), o = i);
      }
    return i === "" && (i = Bt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(Jt(t), t), [i, o] = hg(e, t), this.set(i, o), o = i;
    let u;
    if (r === Bt)
      u = Ht;
    else {
      const [A] = ii(s);
      u = Eg(e, A);
    }
    u !== Ht && (On(e, u) === 1 ? [i, o] = Dn(r, o) : [i, o] = Dn(o, r), this.set(i, o), o = i);
    for (let A = 0; A < Ht; A += 1) {
      let h;
      const E = Ht - n.length;
      if (A - E < 0 || n[A - E] === "")
        if (u !== Ht && u > Ht - 1 - A)
          h = Bt;
        else
          continue;
      else
        h = n[A - E];
      On(e, Ht - 1 - A) === 1 ? [i, o] = Dn(h, o) : [i, o] = Dn(o, h), this.set(i, o), o = i;
    }
    return i;
  }
  update(e, t) {
    const [n, r, s] = this.sideNodesForRoot(e, this.root), i = this.updateWithSideNodes(e, t, n, r, s);
    this.setRoot(i);
  }
  delete(e) {
    const [t, n, r] = this.sideNodesForRoot(e, this.root), s = this.deleteWithSideNodes(e, t, n, r);
    this.setRoot(s);
  }
  prove(e) {
    const [t, n, r, s] = this.sideNodesForRoot(e, this.root), i = [];
    for (let A = 0; A < t.length; A += 1)
      t[A] !== "" && i.push(t[A]);
    let o = "";
    if (n !== Bt) {
      const [A] = ii(r);
      A !== e && (o = r);
    }
    return new yg(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return bg(t);
  }
}, Bg = Object.defineProperty, _g = (e, t, n) => t in e ? Bg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, De = (e, t, n) => (_g(e, typeof t != "symbol" ? t + "" : t, n), n), go = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Re = (e, t, n) => (go(e, t, "read from private field"), n ? n.call(e) : t.get(e)), an = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Dt = (e, t, n, r) => (go(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Qi = (e, t, n) => (go(e, t, "access private method"), n), po = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1], r = e[2] ?? void 0) : (n = e.amount, t = e.assetId, r = e.max ?? void 0);
  const s = B(n);
  return {
    assetId: V(t),
    amount: s.lt(1) ? B(1) : s,
    max: r ? B(r) : void 0
  };
}, vg = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, iu = ne`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  type: __typename
  ... on SqueezedOutStatus {
    reason
  }
}
    `, xg = ne`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, mo = ne`
    fragment receiptFragment on Receipt {
  id
  pc
  is
  to
  toAddress
  amount
  assetId
  gas
  param1
  param2
  val
  ptr
  digest
  reason
  ra
  rb
  rc
  rd
  len
  receiptType
  result
  gasUsed
  data
  sender
  recipient
  nonce
  contractId
  subId
}
    `, Rg = ne`
    fragment SuccessStatusFragment on SuccessStatus {
  type: __typename
  block {
    id
  }
  time
  programState {
    returnType
    data
  }
  receipts {
    ...receiptFragment
  }
  totalGas
  totalFee
}
    ${mo}`, Sg = ne`
    fragment FailureStatusFragment on FailureStatus {
  type: __typename
  block {
    id
  }
  totalGas
  totalFee
  time
  reason
  receipts {
    ...receiptFragment
  }
}
    ${mo}`, Qg = ne`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, Ng = ne`
    fragment transactionStatusFragment on TransactionStatus {
  ... on SubmittedStatus {
    ...SubmittedStatusFragment
  }
  ... on SuccessStatus {
    ...SuccessStatusFragment
  }
  ... on FailureStatus {
    ...FailureStatusFragment
  }
  ... on SqueezedOutStatus {
    ...SqueezedOutStatusFragment
  }
}
    ${xg}
${Rg}
${Sg}
${Qg}`, Nr = ne`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${Ng}`, Dg = ne`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, Tg = ne`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${Dg}`, Fg = ne`
    fragment dryRunFailureStatusFragment on DryRunFailureStatus {
  type: __typename
  totalGas
  totalFee
  reason
  programState {
    returnType
    data
  }
}
    `, Mg = ne`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, Og = ne`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${Fg}
${Mg}`, Lg = ne`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${Og}
${mo}`, wo = ne`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, kg = ne`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, ou = ne`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, Pg = ne`
    fragment messageProofFragment on MessageProof {
  messageProof {
    proofSet
    proofIndex
  }
  blockProof {
    proofSet
    proofIndex
  }
  messageBlockHeader {
    id
    daHeight
    consensusParametersVersion
    stateTransitionBytecodeVersion
    transactionsCount
    messageReceiptCount
    transactionsRoot
    messageOutboxRoot
    eventInboxRoot
    height
    prevRoot
    time
    applicationHash
  }
  commitBlockHeader {
    id
    daHeight
    consensusParametersVersion
    stateTransitionBytecodeVersion
    transactionsCount
    messageReceiptCount
    transactionsRoot
    messageOutboxRoot
    eventInboxRoot
    height
    prevRoot
    time
    applicationHash
  }
  sender
  recipient
  nonce
  amount
  data
}
    `, au = ne`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Rs = ne`
    fragment blockFragment on Block {
  id
  height
  header {
    time
  }
  transactions {
    id
  }
}
    `, Ug = ne`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, Gg = ne`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, Xg = ne`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, zg = ne`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, Yg = ne`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, Vg = ne`
    fragment DependentCostFragment on DependentCost {
  ... on LightOperation {
    type: __typename
    base
    unitsPerGas
  }
  ... on HeavyOperation {
    type: __typename
    base
    gasPerUnit
  }
}
    `, Hg = ne`
    fragment GasCostsFragment on GasCosts {
  version
  add
  addi
  aloc
  and
  andi
  bal
  bhei
  bhsh
  burn
  cb
  cfei
  cfsi
  div
  divi
  ecr1
  eck1
  ed19
  eq
  exp
  expi
  flag
  gm
  gt
  gtf
  ji
  jmp
  jne
  jnei
  jnzi
  jmpf
  jmpb
  jnzf
  jnzb
  jnef
  jneb
  lb
  log
  lt
  lw
  mint
  mlog
  modOp
  modi
  moveOp
  movi
  mroo
  mul
  muli
  mldv
  noop
  not
  or
  ori
  poph
  popl
  pshh
  pshl
  ret
  rvrt
  sb
  sll
  slli
  srl
  srli
  srw
  sub
  subi
  sw
  sww
  time
  tr
  tro
  wdcm
  wqcm
  wdop
  wqop
  wdml
  wqml
  wddv
  wqdv
  wdmd
  wqmd
  wdam
  wqam
  wdmm
  wqmm
  xor
  xori
  call {
    ...DependentCostFragment
  }
  ccp {
    ...DependentCostFragment
  }
  croo {
    ...DependentCostFragment
  }
  csiz {
    ...DependentCostFragment
  }
  k256 {
    ...DependentCostFragment
  }
  ldc {
    ...DependentCostFragment
  }
  logd {
    ...DependentCostFragment
  }
  mcl {
    ...DependentCostFragment
  }
  mcli {
    ...DependentCostFragment
  }
  mcp {
    ...DependentCostFragment
  }
  mcpi {
    ...DependentCostFragment
  }
  meq {
    ...DependentCostFragment
  }
  retd {
    ...DependentCostFragment
  }
  s256 {
    ...DependentCostFragment
  }
  scwq {
    ...DependentCostFragment
  }
  smo {
    ...DependentCostFragment
  }
  srwq {
    ...DependentCostFragment
  }
  swwq {
    ...DependentCostFragment
  }
  contractRoot {
    ...DependentCostFragment
  }
  stateRoot {
    ...DependentCostFragment
  }
  vmInitialization {
    ...DependentCostFragment
  }
  newStoragePerByte
}
    ${Vg}`, Zg = ne`
    fragment consensusParametersFragment on ConsensusParameters {
  version
  txParams {
    ...TxParametersFragment
  }
  predicateParams {
    ...PredicateParametersFragment
  }
  scriptParams {
    ...ScriptParametersFragment
  }
  contractParams {
    ...ContractParametersFragment
  }
  feeParams {
    ...FeeParametersFragment
  }
  gasCosts {
    ...GasCostsFragment
  }
  baseAssetId
  chainId
}
    ${Ug}
${Gg}
${Xg}
${zg}
${Yg}
${Hg}`, Wg = ne`
    fragment chainInfoFragment on ChainInfo {
  name
  latestBlock {
    ...blockFragment
  }
  daHeight
  consensusParameters {
    ...consensusParametersFragment
  }
}
    ${Rs}
${Zg}`, Jg = ne`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, qg = ne`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, jg = ne`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, $g = ne`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, Kg = ne`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, ep = ne`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${jg}`, tp = ne`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${Wg}`, np = ne`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Nr}`, rp = ne`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Nr}`, sp = ne`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${Nr}`, ip = ne`
    query getTransactionsByOwner($owner: Address!, $after: String, $before: String, $first: Int, $last: Int) {
  transactionsByOwner(
    owner: $owner
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    pageInfo {
      ...pageInfoFragment
    }
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${qg}
${Nr}`, op = ne`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${Tg}`, ap = ne`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Rs}`, cp = ne`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Rs}
${Nr}`, up = ne`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${Rs}`, dp = ne`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${wo}`, Ap = ne`
    query getCoins($filter: CoinFilterInput!, $after: String, $before: String, $first: Int, $last: Int) {
  coins(
    filter: $filter
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...coinFragment
      }
    }
  }
}
    ${wo}`, lp = ne`
    query getCoinsToSpend($owner: Address!, $queryPerAsset: [SpendQueryElementInput!]!, $excludedIds: ExcludeInput) {
  coinsToSpend(
    owner: $owner
    queryPerAsset: $queryPerAsset
    excludedIds: $excludedIds
  ) {
    ...coinFragment
    ...messageCoinFragment
  }
}
    ${wo}
${kg}`, fp = ne`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, hp = ne`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${Jg}`, gp = ne`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${au}`, pp = ne`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, mp = ne`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, wp = ne`
    query getBalances($filter: BalanceFilterInput!, $after: String, $before: String, $first: Int, $last: Int) {
  balances(
    filter: $filter
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...balanceFragment
      }
    }
  }
}
    ${au}`, yp = ne`
    query getMessages($owner: Address!, $after: String, $before: String, $first: Int, $last: Int) {
  messages(
    owner: $owner
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    edges {
      node {
        ...messageFragment
      }
    }
  }
}
    ${ou}`, Ip = ne`
    query getMessageProof($transactionId: TransactionId!, $nonce: Nonce!, $commitBlockId: BlockId, $commitBlockHeight: U32) {
  messageProof(
    transactionId: $transactionId
    nonce: $nonce
    commitBlockId: $commitBlockId
    commitBlockHeight: $commitBlockHeight
  ) {
    ...messageProofFragment
  }
}
    ${Pg}`, Ep = ne`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, bp = ne`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${$g}`, Cp = ne`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean) {
  dryRun(txs: $encodedTransactions, utxoValidation: $utxoValidation) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${Lg}`, Bp = ne`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, _p = ne`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, vp = ne`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${ou}`, xp = ne`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${iu}`, Rp = ne`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${iu}`;
function Sp(e) {
  return {
    getVersion(t, n) {
      return e(Kg, t, n);
    },
    getNodeInfo(t, n) {
      return e(ep, t, n);
    },
    getChain(t, n) {
      return e(tp, t, n);
    },
    getTransaction(t, n) {
      return e(np, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(rp, t, n);
    },
    getTransactions(t, n) {
      return e(sp, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(ip, t, n);
    },
    estimatePredicates(t, n) {
      return e(op, t, n);
    },
    getBlock(t, n) {
      return e(ap, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(cp, t, n);
    },
    getBlocks(t, n) {
      return e(up, t, n);
    },
    getCoin(t, n) {
      return e(dp, t, n);
    },
    getCoins(t, n) {
      return e(Ap, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(lp, t, n);
    },
    getContract(t, n) {
      return e(fp, t, n);
    },
    getContractBalance(t, n) {
      return e(hp, t, n);
    },
    getBalance(t, n) {
      return e(gp, t, n);
    },
    getLatestGasPrice(t, n) {
      return e(pp, t, n);
    },
    estimateGasPrice(t, n) {
      return e(mp, t, n);
    },
    getBalances(t, n) {
      return e(wp, t, n);
    },
    getMessages(t, n) {
      return e(yp, t, n);
    },
    getMessageProof(t, n) {
      return e(Ip, t, n);
    },
    getMessageStatus(t, n) {
      return e(Ep, t, n);
    },
    getRelayedTransactionStatus(t, n) {
      return e(bp, t, n);
    },
    dryRun(t, n) {
      return e(Cp, t, n);
    },
    submit(t, n) {
      return e(Bp, t, n);
    },
    produceBlocks(t, n) {
      return e(_p, t, n);
    },
    getMessageByNonce(t, n) {
      return e(vp, t, n);
    },
    submitAndAwait(t, n) {
      return e(xp, t, n);
    },
    statusChange(t, n) {
      return e(Rp, t, n);
    }
  };
}
var cu = class {
  constructor(e) {
    S(this, "stream");
    S(this, "events", []);
    S(this, "parsingLeftover", "");
    this.options = e;
  }
  async setStream() {
    const { url: e, query: t, variables: n, fetchFn: r } = this.options, s = await r(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: N0(t),
        variables: n
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream"
      }
    });
    this.stream = s.body.getReader();
  }
  async next() {
    for (this.stream || await this.setStream(); ; ) {
      if (this.events.length > 0) {
        const { data: o, errors: u } = this.events.shift();
        if (Array.isArray(u))
          throw new x(
            x.CODES.INVALID_REQUEST,
            u.map((A) => A.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const n = cu.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (n === "")
        continue;
      const r = `${this.parsingLeftover}${n}`, s = /data:.*\n\n/g, i = [...r.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new x(
            N.STREAM_PARSING_ERROR,
            `Error while parsing stream data response: ${r}`
          );
        }
      }), this.parsingLeftover = r.replace(i.join(), "");
    }
  }
  /**
   * Gets called when `break` is called in a `for-await-of` loop.
   */
  async return() {
    return await this.stream.cancel(), this.stream.releaseLock(), { done: !0, value: void 0 };
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}, uu = cu;
De(uu, "textDecoder", new TextDecoder());
var In = {}, Qp = 30 * 1e3, Np = class {
  constructor(e = Qp) {
    S(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new x(
        N.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = V(e);
    if (In[n]) {
      if (!t || In[n].expires > Date.now())
        return In[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = V(e);
    return In[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(In).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(In).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = V(e);
    delete In[t];
  }
}, Dp = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Ce.Coin: {
      const n = z(e.predicate ?? "0x"), r = z(e.predicateData ?? "0x");
      return {
        type: Ce.Coin,
        txID: V(z(e.id).slice(0, fn)),
        outputIndex: sn(z(e.id).slice(fn, pi)),
        owner: V(e.owner),
        amount: B(e.amount),
        assetId: V(e.assetId),
        txPointer: {
          blockHeight: sn(z(e.txPointer).slice(0, 8)),
          txIndex: sn(z(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: B(e.predicateGasUsed),
        predicateLength: B(n.length),
        predicateDataLength: B(r.length),
        predicate: V(n),
        predicateData: V(r)
      };
    }
    case Ce.Contract:
      return {
        type: Ce.Contract,
        txID: Ne,
        outputIndex: 0,
        balanceRoot: Ne,
        stateRoot: Ne,
        txPointer: {
          blockHeight: sn(z(e.txPointer).slice(0, 8)),
          txIndex: sn(z(e.txPointer).slice(8, 16))
        },
        contractID: V(e.contractId)
      };
    case Ce.Message: {
      const n = z(e.predicate ?? "0x"), r = z(e.predicateData ?? "0x"), s = z(e.data ?? "0x");
      return {
        type: Ce.Message,
        sender: V(e.sender),
        recipient: V(e.recipient),
        amount: B(e.amount),
        nonce: V(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: B(e.predicateGasUsed),
        predicateLength: B(n.length),
        predicateDataLength: B(r.length),
        predicate: V(n),
        predicateData: V(r),
        data: V(s),
        dataLength: s.length
      };
    }
    default:
      throw new x(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, Tp = (e) => {
  const { type: t } = e;
  switch (t) {
    case Ie.Coin:
      return {
        type: Ie.Coin,
        to: V(e.to),
        amount: B(e.amount),
        assetId: V(e.assetId)
      };
    case Ie.Contract:
      return {
        type: Ie.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Ne,
        stateRoot: Ne
      };
    case Ie.Change:
      return {
        type: Ie.Change,
        to: V(e.to),
        amount: B(0),
        assetId: V(e.assetId)
      };
    case Ie.Variable:
      return {
        type: Ie.Variable,
        to: Ne,
        amount: B(0),
        assetId: Ne
      };
    case Ie.ContractCreated:
      return {
        type: Ie.ContractCreated,
        contractId: V(e.contractId),
        stateRoot: V(e.stateRoot)
      };
    default:
      throw new x(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, uy = (e) => "utxoId" in e, dy = (e) => "recipient" in e, Fp = (e) => "id" in e, Ay = (e) => "recipient" in e, Mp = (e) => e.type === ue.Revert && e.val.toString("hex") === k0, Op = (e) => e.type === ue.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", Za = (e) => e.reduce(
  (t, n) => (Mp(n) && t.missingOutputVariables.push(n), Op(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), _e = (e) => e || Ne;
function Lp(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: ue.Call,
        from: _e(e.id || e.contractId),
        to: _e(e == null ? void 0 : e.to),
        amount: B(e.amount),
        assetId: _e(e.assetId),
        gas: B(e.gas),
        param1: B(e.param1),
        param2: B(e.param2),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "RETURN":
      return {
        type: ue.Return,
        id: _e(e.id || e.contractId),
        val: B(e.val),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "RETURN_DATA":
      return {
        type: ue.ReturnData,
        id: _e(e.id || e.contractId),
        ptr: B(e.ptr),
        len: B(e.len),
        digest: _e(e.digest),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "PANIC":
      return {
        type: ue.Panic,
        id: _e(e.id),
        reason: B(e.reason),
        pc: B(e.pc),
        is: B(e.is),
        contractId: _e(e.contractId)
      };
    case "REVERT":
      return {
        type: ue.Revert,
        id: _e(e.id || e.contractId),
        val: B(e.ra),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "LOG":
      return {
        type: ue.Log,
        id: _e(e.id || e.contractId),
        val0: B(e.ra),
        val1: B(e.rb),
        val2: B(e.rc),
        val3: B(e.rd),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "LOG_DATA":
      return {
        type: ue.LogData,
        id: _e(e.id || e.contractId),
        val0: B(e.ra),
        val1: B(e.rb),
        ptr: B(e.ptr),
        len: B(e.len),
        digest: _e(e.digest),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "TRANSFER":
      return {
        type: ue.Transfer,
        from: _e(e.id || e.contractId),
        to: _e(e.toAddress || (e == null ? void 0 : e.to)),
        amount: B(e.amount),
        assetId: _e(e.assetId),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: ue.TransferOut,
        from: _e(e.id || e.contractId),
        to: _e(e.toAddress || e.to),
        amount: B(e.amount),
        assetId: _e(e.assetId),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: ue.ScriptResult,
        result: B(e.result),
        gasUsed: B(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const n = _e(e.sender), r = _e(e.recipient), s = _e(e.nonce), i = B(e.amount), o = e.data ? z(e.data) : Uint8Array.from([]), u = _e(e.digest), A = ls.getMessageId({
        sender: n,
        recipient: r,
        nonce: s,
        amount: i,
        data: o
      });
      return {
        type: ue.MessageOut,
        sender: n,
        recipient: r,
        amount: i,
        nonce: s,
        data: o,
        digest: u,
        messageId: A
      };
    }
    case "MINT": {
      const n = _e(e.id || e.contractId), r = _e(e.subId), s = wr.getAssetId(n, r);
      return {
        type: ue.Mint,
        subId: r,
        contractId: n,
        assetId: s,
        val: B(e.val),
        pc: B(e.pc),
        is: B(e.is)
      };
    }
    case "BURN": {
      const n = _e(e.id || e.contractId), r = _e(e.subId), s = yi.getAssetId(n, r);
      return {
        type: ue.Burn,
        subId: r,
        contractId: n,
        assetId: s,
        val: B(e.val),
        pc: B(e.pc),
        is: B(e.is)
      };
    }
    default:
      throw new x(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var kp = "https://fuellabs.github.io/block-explorer-v2", Pp = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, ly = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, u = t || kp, A = [
    {
      key: "address",
      value: s
    },
    {
      key: "txId",
      value: i
    },
    {
      key: "blockNumber",
      value: o
    }
  ], h = A.filter((W) => !!W.value).map(({ key: W, value: O }) => ({
    key: W,
    value: O
  })), E = h.length > 0;
  if (h.length > 1)
    throw new x(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${A.map((W) => W.key).join(", ")}.`
    );
  if (n && h.length > 0) {
    const W = A.map(({ key: O }) => O).join(", ");
    throw new x(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${W}.`
    );
  }
  const I = E ? Pp(
    h[0].key,
    h[0].value
  ) : "", _ = /^\/|\/$/gm, v = n ? n.replace(_, "") : I, R = u.replace(_, ""), C = r == null ? void 0 : r.replace(_, ""), F = C ? encodeURIComponent(C) : void 0, M = R.match(/^https?:\/\//) ? "" : "https://", G = C != null && C.match(/^https?:\/\//) ? "" : "https://";
  return `${M}${R}/${v}${F ? `?providerUrl=${G}${F}` : ""}`;
}, du = (e) => e.filter(
  (r) => r.type === ue.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), B(0));
function An(e, t) {
  const n = B(t.base);
  let r = B(0);
  return "unitsPerGas" in t ? r = B(e).div(B(t.unitsPerGas)) : r = B(e).mul(B(t.gasPerUnit)), n.add(r);
}
function Up(e, t, n) {
  const r = [], s = e.filter((u) => {
    if ("owner" in u || "sender" in u) {
      if ("predicate" in u && u.predicate && u.predicate !== "0x")
        return !0;
      if (!r.includes(u.witnessIndex))
        return r.push(u.witnessIndex), !0;
    }
    return !1;
  }), i = An(t, n.vmInitialization);
  return s.reduce((u, A) => "predicate" in A && A.predicate && A.predicate !== "0x" ? u.add(
    i.add(An(z(A.predicate).length, n.contractRoot)).add(B(A.predicateGasUsed))
  ) : u.add(n.ecr1), B(0));
}
function Au(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = An(i, t.vmInitialization), u = B(i).mul(n), A = Up(r, i, t);
  return o.add(u).add(A).add(s).maxU64();
}
function yo(e) {
  const {
    gasPerByte: t,
    witnessesLength: n,
    witnessLimit: r,
    minGas: s,
    gasLimit: i = B(0),
    maxGasPerTx: o
  } = e;
  let u = B(0);
  r != null && r.gt(0) && r.gte(n) && (u = B(r).sub(n).mul(t));
  const A = u.add(s).add(i);
  return A.gte(o) ? o : A;
}
function lu({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = An(r, e.contractRoot), i = An(t, e.stateRoot), o = An(n, e.s256), u = B(100), A = An(u, e.s256);
  return s.add(i).add(o).add(A).maxU64();
}
function fu({
  gasCosts: e,
  txBytesSize: t
}) {
  return An(t, e.s256);
}
var Ni = (e) => {
  const { gas: t, gasPrice: n, priceFactor: r, tip: s } = e;
  return t.mul(n).div(r).add(B(s));
};
function Di(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = V(e[t]);
        break;
      case "Array":
        e[t] = Di(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = Di(e[t]);
        break;
    }
  }), e;
}
function Gp(e) {
  return Di(Pt(e));
}
function Xp(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var zp = (e) => {
  let t = `The transaction reverted with reason: "${e}".`;
  return wh.includes(e) && (t = `${t}

You can read more about this error at:

${yh}#variant.${e}`), { errorMessage: t, reason: e };
}, ar = (e) => JSON.stringify(e, null, 2), Yp = (e, t) => {
  let n = "The transaction reverted with an unknown reason.";
  const r = e.find(({ type: i }) => i === ue.Revert);
  let s = "";
  if (r)
    switch (B(r.val).toHex()) {
      case hh: {
        s = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? ar(t[0]) : "an error."}.`;
        break;
      }
      case gh: {
        const o = t.length >= 2 ? ` comparing ${ar(t[1])} and ${ar(t[0])}.` : ".";
        s = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${o}`;
        break;
      }
      case mh: {
        const o = t.length >= 2 ? ` comparing ${ar(t[1])} and ${ar(t[0])}.` : ".";
        s = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${o}`;
        break;
      }
      case ph:
        s = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case k0:
        s = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        s = "unknown", n = `The transaction reverted with an unknown reason: ${r.val}`;
    }
  return { errorMessage: n, reason: s };
}, Io = (e) => {
  const { receipts: t, statusReason: n, logs: r } = e, s = t.some(({ type: h }) => h === ue.Panic), i = t.some(({ type: h }) => h === ue.Revert), { errorMessage: o, reason: u } = s ? zp(n) : Yp(t, r), A = {
    logs: r,
    receipts: t,
    panic: s,
    revert: i,
    reason: u
  };
  return new x(N.SCRIPT_REVERTED, o, A);
}, fy = class extends Error {
  constructor() {
    super(...arguments);
    S(this, "name", "ChangeOutputCollisionError");
    S(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, Vp = class extends Error {
  constructor(t) {
    super();
    S(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, hy = class extends Error {
  constructor(t) {
    super();
    S(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, nr = (e) => e.type === Ce.Coin, Eo = (e) => e.type === Ce.Message, ln = (e) => nr(e) || Eo(e), hu = (e) => nr(e) ? e.owner : e.recipient, Ti = (e, t) => hu(e) === t.toB256(), Hp = (e, t, n) => e.filter(ln).reduce((r, s) => nr(s) && s.assetId === t || Eo(s) && t === n ? r.add(s.amount) : r, B(0)), gy = (e) => e.filter(ln).reduce(
  (t, n) => (nr(n) ? t.utxos.push(n.id) : t.messages.push(n.nonce), t),
  {
    utxos: [],
    messages: []
  }
), Zp = (e, t) => e.reduce(
  (n, r) => (nr(r) && r.owner === t.toB256() ? n.utxos.push(r.id) : Eo(r) && r.recipient === t.toB256() && n.messages.push(r.nonce), n),
  {
    utxos: [],
    messages: []
  }
), Wp = (e) => {
  const t = z(e);
  return {
    data: V(t),
    dataLength: t.length
  };
}, bo = class {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    tip: e,
    maturity: t,
    maxFee: n,
    witnessLimit: r,
    inputs: s,
    outputs: i,
    witnesses: o
  } = {}) {
    /** Gas price for transaction */
    S(this, "tip");
    /** Block until which tx cannot be included */
    S(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    S(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    S(this, "witnessLimit");
    /** List of inputs */
    S(this, "inputs", []);
    /** List of outputs */
    S(this, "outputs", []);
    /** List of witnesses */
    S(this, "witnesses", []);
    this.tip = e ? B(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = Sn(r) ? B(r) : void 0, this.maxFee = B(n), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [], { tip: r, witnessLimit: s, maturity: i } = e;
    return B(r).gt(0) && (t += Qt.Tip, n.push({ data: B(r), type: Qt.Tip })), Sn(s) && B(s).gte(0) && (t += Qt.WitnessLimit, n.push({ data: B(s), type: Qt.WitnessLimit })), i && i > 0 && (t += Qt.Maturity, n.push({ data: i, type: Qt.Maturity })), t += Qt.MaxFee, n.push({ data: e.maxFee, type: Qt.MaxFee }), {
      policyTypes: t,
      policies: n
    };
  }
  /**
   * Method to obtain the base transaction details.
   *
   * @returns The base transaction details.
   */
  getBaseTransaction() {
    var i, o, u;
    const e = ((i = this.inputs) == null ? void 0 : i.map(Dp)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(Tp)) ?? [], n = ((u = this.witnesses) == null ? void 0 : u.map(Wp)) ?? [], { policyTypes: r, policies: s } = bo.getPolicyMeta(this);
    return {
      policyTypes: r,
      inputs: e,
      outputs: t,
      policies: s,
      witnesses: n,
      inputsCount: e.length,
      outputsCount: t.length,
      witnessesCount: n.length
    };
  }
  /**
   * Converts the transaction request to a byte array.
   *
   * @returns The transaction bytes.
   */
  toTransactionBytes() {
    return new wn().encode(this.toTransaction());
  }
  /**
   * @hidden
   *
   * Pushes an input to the list without any side effects and returns the index
   */
  pushInput(e) {
    return this.inputs.push(e), this.inputs.length - 1;
  }
  /**
   * @hidden
   *
   * Pushes an output to the list without any side effects and returns the index
   */
  pushOutput(e) {
    return this.outputs.push(e), this.outputs.length - 1;
  }
  /**
   * @hidden
   *
   * Pushes a witness to the list and returns the index
   *
   * @param signature - The signature to add to the witness.
   * @returns The index of the created witness.
   */
  addWitness(e) {
    return this.witnesses.push(e), this.witnesses.length - 1;
  }
  /**
   * @hidden
   *
   * Creates an empty witness without any side effects and returns the index
   *
   * @returns The index of the created witness.
   */
  addEmptyWitness() {
    return this.addWitness(ie([Ne, Ne])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const n = de.fromAddressOrString(e), r = this.getCoinInputWitnessIndexByOwner(n);
    typeof r == "number" && this.updateWitness(r, t);
  }
  /**
   * Updates an existing witness without any side effects.
   *
   * @param index - The index of the witness to update.
   * @param witness - The new witness.
   * @throws If the witness does not exist.
   */
  updateWitness(e, t) {
    if (!this.witnesses[e])
      throw new Vp(e);
    this.witnesses[e] = t;
  }
  /**
   * Helper function to add an external signature to the transaction.
   *
   * @param account - The account/s to sign to the transaction.
   * @returns The transaction with the signature witness added.
   */
  async addAccountWitnesses(e) {
    const t = Array.isArray(e) ? e : [e];
    return await Promise.all(
      t.map(async (n) => {
        this.addWitness(await n.signTransaction(this));
      })
    ), this;
  }
  /**
   * Gets the coin inputs for a transaction.
   *
   * @returns The coin inputs.
   */
  getCoinInputs() {
    return this.inputs.filter(
      (e) => e.type === Ce.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (e) => e.type === Ie.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === Ie.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = ur(e), n = this.inputs.find((r) => {
      switch (r.type) {
        case Ce.Coin:
          return V(r.owner) === t.toB256();
        case Ce.Message:
          return V(r.recipient) === t.toB256();
        default:
          return !1;
      }
    });
    return n == null ? void 0 : n.witnessIndex;
  }
  /**
   * Adds a single coin input to the transaction and a change output for the related
   * assetId, if one it was not added yet.
   *
   * @param coin - Coin resource.
   */
  addCoinInput(e) {
    const { assetId: t, owner: n, amount: r, id: s, predicate: i, predicateData: o } = e;
    let u;
    e.predicate ? u = 0 : (u = this.getCoinInputWitnessIndexByOwner(n), typeof u != "number" && (u = this.addEmptyWitness()));
    const A = {
      id: s,
      type: Ce.Coin,
      owner: n.toB256(),
      amount: r,
      assetId: t,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: u,
      predicate: i,
      predicateData: o
    };
    this.pushInput(A), this.addChangeOutput(n, t);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * asset against the message
   *
   * @param message - Message resource.
   */
  addMessageInput(e) {
    const { recipient: t, sender: n, amount: r, predicate: s, nonce: i, assetId: o, predicateData: u } = e;
    let A;
    e.predicate ? A = 0 : (A = this.getCoinInputWitnessIndexByOwner(t), typeof A != "number" && (A = this.addEmptyWitness()));
    const h = {
      nonce: i,
      type: Ce.Message,
      sender: n.toB256(),
      recipient: t.toB256(),
      amount: r,
      witnessIndex: A,
      predicate: s,
      predicateData: u
    };
    this.pushInput(h), this.addChangeOutput(t, o);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return Fp(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
  }
  /**
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addResources(e) {
    return e.forEach((t) => this.addResource(t)), this;
  }
  /**
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(e, t, n) {
    return this.pushOutput({
      type: Ie.Coin,
      to: ur(e).toB256(),
      amount: t,
      assetId: n
    }), this;
  }
  /**
   * Adds multiple coin outputs to the transaction.
   *
   * @param to - Address of the destination.
   * @param quantities - Quantities of coins.
   */
  addCoinOutputs(e, t) {
    return t.map(po).forEach((n) => {
      this.pushOutput({
        type: Ie.Coin,
        to: ur(e).toB256(),
        amount: n.amount,
        assetId: n.assetId
      });
    }), this;
  }
  /**
   * Adds a change output to the transaction.
   *
   * @param to - Address of the owner.
   * @param assetId - Asset ID of coin.
   */
  addChangeOutput(e, t) {
    this.getChangeOutputs().find(
      (r) => V(r.assetId) === t
    ) || this.pushOutput({
      type: Ie.Change,
      to: ur(e).toB256(),
      assetId: t
    });
  }
  /**
   * @hidden
   */
  byteSize() {
    return this.toTransactionBytes().length;
  }
  /**
   * @hidden
   */
  metadataGas(e) {
    throw new Error("Not implemented");
  }
  /**
   * @hidden
   */
  calculateMinGas(e) {
    const { consensusParameters: t } = e, {
      gasCosts: n,
      feeParameters: { gasPerByte: r }
    } = t;
    return Au({
      gasPerByte: r,
      gasCosts: n,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(n)
    });
  }
  calculateMaxGas(e, t) {
    const { consensusParameters: n } = e, {
      feeParameters: { gasPerByte: r },
      txParameters: { maxGasPerTx: s }
    } = n, i = this.toTransaction().witnesses.reduce(
      (o, u) => o + u.dataLength,
      0
    );
    return yo({
      gasPerByte: r,
      minGas: t,
      witnessesLength: i,
      witnessLimit: this.witnessLimit,
      maxGasPerTx: s
    });
  }
  /**
   * Funds the transaction with fake UTXOs for each assetId and amount in the
   * quantities array.
   *
   * @param quantities - CoinQuantity Array.
   * @param baseAssetId - The base asset to fund the transaction.
   */
  fundWithFakeUtxos(e, t, n) {
    const r = (i) => this.inputs.find((o) => "assetId" in o ? o.assetId === i : !1), s = (i, o) => {
      const u = r(i);
      let A = o;
      i === t && (A = B("1000000000000000000")), u && "assetId" in u ? (u.id = V(Ut(pi)), u.amount = A) : this.addResources([
        {
          id: V(Ut(pi)),
          amount: A,
          assetId: i,
          owner: n || de.fromRandom(),
          blockCreated: B(1),
          txCreatedIdx: B(1)
        }
      ]);
    };
    s(t, B(1e11)), e.forEach((i) => s(i.assetId, i.amount));
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: t, assetId: n }) => ({
      amount: B(t),
      assetId: n.toString()
    }));
  }
  /**
   * Return the minimum amount in native coins required to create
   * a transaction.
   *
   * @returns The transaction as a JSON object.
   */
  toJSON() {
    return Gp(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(ln).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(e) {
    const t = e.filter(ln);
    this.inputs.filter(ln).forEach((n) => {
      const r = hu(n), s = t.find(
        (i) => Ti(i, de.fromString(String(r)))
      );
      s && "predicateGasUsed" in s && B(s.predicateGasUsed).gt(0) && (n.predicateGasUsed = s.predicateGasUsed);
    });
  }
};
function gu(e, t) {
  const n = e.toTransaction();
  n.type === Le.Script && (n.receiptsRoot = Ne), n.inputs = n.inputs.map((i) => {
    const o = Pt(i);
    switch (o.type) {
      case Ce.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = B(0), o;
      case Ce.Message:
        return o.predicateGasUsed = B(0), o;
      case Ce.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = Ne, o.outputIndex = 0, o.balanceRoot = Ne, o.stateRoot = Ne, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = Pt(i);
    switch (o.type) {
      case Ie.Contract:
        return o.balanceRoot = Ne, o.stateRoot = Ne, o;
      case Ie.Change:
        return o.amount = B(0), o;
      case Ie.Variable:
        return o.to = Ne, o.amount = B(0), o.assetId = Ne, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = UA(t), s = ie([r, new wn().encode(n)]);
  return mt(s);
}
var Jp = (e) => {
  const t = new Uint8Array(32);
  return t.set(z(e)), t;
}, qp = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: V(t),
    value: V(Jp(n))
  };
}, Fi = class extends bo {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: n, storageSlots: r, ...s }) {
    super(s);
    /** Type of the transaction */
    S(this, "type", Le.Create);
    /** Witness index of contract bytecode to create */
    S(this, "bytecodeWitnessIndex");
    /** Salt */
    S(this, "salt");
    /** List of storage slots to initialize */
    S(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = V(n ?? Ne), this.storageSlots = [...r ?? []];
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  /**
   * Converts the transaction request to a `TransactionCreate`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    var s;
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(qp)) ?? [];
    return {
      type: Le.Create,
      ...t,
      bytecodeWitnessIndex: n,
      storageSlotsCount: B(r.length),
      salt: this.salt ? V(this.salt) : Ne,
      storageSlots: r
    };
  }
  /**
   * Get contract created outputs for the transaction.
   *
   * @returns An array of contract created transaction request outputs.
   */
  getContractCreatedOutputs() {
    return this.outputs.filter(
      (t) => t.type === Ie.ContractCreated
    );
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(t) {
    return gu(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, n) {
    this.pushOutput({
      type: Ie.ContractCreated,
      contractId: t,
      stateRoot: n
    });
  }
  metadataGas(t) {
    return lu({
      contractBytesSize: B(z(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Wa = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: z("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, jp = {
  /*
          The following code loads some basic values into registers and calls SMO to create an output message
          5040C010 	- ADDI r16 $is i16   [r16 now points to memory 16 bytes from the start of this program (start of receiver data)]
          5D44C006	- LW r17 $is i6      [r17 set to the 6th word in this program (6*8=48 bytes from the start of this program)]
          4C400011	- SMO r16 r0 r0 r17  [send message out to address starting at memory position r16 with amount in r17]
          24000000	- RET                [return 0]
          00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 [recipient address]
          00000000 00000000 [amount value]
      */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: z("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, _n = class extends bo {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    S(this, "type", Le.Script);
    /** Gas limit for transaction */
    S(this, "gasLimit");
    /** Script to execute */
    S(this, "script");
    /** Script input data (parameters) */
    S(this, "scriptData");
    S(this, "abis");
    this.gasLimit = B(r), this.script = z(t ?? Wa.bytes), this.scriptData = z(n ?? Wa.encodeScriptData()), this.abis = s.abis;
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  /**
   * Converts the transaction request to a `TransactionScript`.
   *
   * @returns The transaction script object.
   */
  toTransaction() {
    const t = z(this.script ?? "0x"), n = z(this.scriptData ?? "0x");
    return {
      type: Le.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: B(t.length),
      scriptDataLength: B(n.length),
      receiptsRoot: Ne,
      script: V(t),
      scriptData: V(n)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (t) => t.type === Ce.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (t) => t.type === Ie.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === Ie.Variable
    );
  }
  /**
   * Set the script and its data.
   *
   * @param script - The abstract script request.
   * @param data - The script data.
   */
  setScript(t, n) {
    this.scriptData = t.encodeScriptData(n), this.script = t.bytes;
  }
  /**
   * Adds variable outputs to the transaction request.
   *
   * @param numberOfVariables - The number of variables to add.
   * @returns The new length of the outputs array.
   */
  addVariableOutputs(t = 1) {
    let n = t;
    for (; n; )
      this.pushOutput({
        type: Ie.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  /**
   * Calculates the maximum gas for the transaction.
   *
   * @param chainInfo - The chain information.
   * @param minGas - The minimum gas.
   * @returns the maximum gas.
   */
  calculateMaxGas(t, n) {
    const { consensusParameters: r } = t, {
      feeParameters: { gasPerByte: s },
      txParameters: { maxGasPerTx: i }
    } = r, o = this.toTransaction().witnesses.reduce(
      (u, A) => u + A.dataLength,
      0
    );
    return yo({
      gasPerByte: s,
      minGas: n,
      witnessesLength: o,
      witnessLimit: this.witnessLimit,
      gasLimit: this.gasLimit,
      maxGasPerTx: i
    });
  }
  /**
   * Adds a contract input and output to the transaction request.
   *
   * @param contract - The contract ID.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  addContractInputAndOutput(t) {
    const n = ur(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: Ce.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: Ie.Contract,
      inputIndex: r
    }), this;
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(t) {
    return gu(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new qt(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return fu({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, wt = (e) => {
  if (e instanceof _n || e instanceof Fi)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case Le.Script:
      return _n.from(e);
    case Le.Create:
      return Fi.from(e);
    default:
      throw new x(N.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, $p = (e) => {
  var k;
  const {
    gasPrice: t,
    rawPayload: n,
    tip: r,
    totalFee: s,
    consensusParameters: { gasCosts: i, feeParams: o, maxGasPerTx: u }
  } = e;
  if (s)
    return s;
  const A = B(o.gasPerByte), h = B(o.gasPriceFactor), E = z(n), [I] = new wn().decode(E, 0), { type: _, witnesses: v, inputs: R, policies: C } = I;
  let F = B(0), M = B(0);
  if (_ !== Le.Create && _ !== Le.Script)
    return B(0);
  if (_ === Le.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: q } = I, Y = B(z(v[U].data).length);
    F = lu({
      contractBytesSize: Y,
      gasCosts: i,
      stateRootSize: q.length || 0,
      txBytesSize: E.length
    });
  } else {
    const { scriptGasLimit: U } = I;
    U && (M = U), F = fu({
      gasCosts: i,
      txBytesSize: E.length
    });
  }
  const G = Au({
    gasCosts: i,
    gasPerByte: B(A),
    inputs: R,
    metadataGas: F,
    txBytesSize: E.length
  }), L = (k = C.find((U) => U.type === Qt.WitnessLimit)) == null ? void 0 : k.data, W = v.reduce((U, q) => U + q.dataLength, 0), O = yo({
    gasPerByte: A,
    minGas: G,
    witnessesLength: W,
    gasLimit: M,
    witnessLimit: L,
    maxGasPerTx: u
  });
  return Ni({
    gasPrice: t,
    gas: O,
    priceFactor: h,
    tip: r
  });
}, Kp = ({ abi: e, receipt: t }) => {
  var E;
  const n = new qt(e), r = t.param1.toHex(8), s = n.getFunction(r), i = s.jsonFn.inputs, o = t.param2.toHex();
  let u;
  const A = s.decodeArguments(o);
  return A && (u = i.reduce((I, _, v) => {
    const R = A[v], C = _.name;
    return C ? {
      ...I,
      // reparse to remove bn
      [C]: JSON.parse(JSON.stringify(R))
    } : I;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: u,
    ...(E = t.amount) != null && E.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function em(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function Co(e, t) {
  return e.filter((n) => n.type === t);
}
function tm(e) {
  return Co(e, Ce.Coin);
}
function nm(e) {
  return Co(e, Ce.Message);
}
function rm(e) {
  return em(e, [Ce.Coin, Ce.Message]);
}
function sm(e) {
  return Co(e, Ce.Contract);
}
function pu(e, t) {
  const n = tm(e), r = nm(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function im(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== Ce.Contract)
      throw new x(
        N.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function Bo(e) {
  return e.type === Ce.Coin ? e.owner.toString() : e.type === Ce.Message ? e.recipient.toString() : "";
}
function Dr(e, t) {
  return e.filter((n) => n.type === t);
}
function om(e) {
  return Dr(e, Ie.ContractCreated);
}
function mu(e) {
  return Dr(e, Ie.Coin);
}
function am(e) {
  return Dr(e, Ie.Change);
}
function cm(e) {
  return Dr(e, Ie.Contract);
}
function py(e) {
  return Dr(e, Ie.Variable);
}
var um = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e))(um || {}), dm = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(dm || {}), Am = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(Am || {}), lm = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(lm || {}), fm = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(fm || {});
function Er(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function wu(e) {
  switch (e) {
    case Le.Mint:
      return "Mint";
    case Le.Create:
      return "Create";
    case Le.Script:
      return "Script";
    default:
      throw new x(
        N.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function Tr(e, t) {
  return wu(e) === t;
}
function hm(e) {
  return Tr(
    e,
    "Mint"
    /* Mint */
  );
}
function yu(e) {
  return Tr(
    e,
    "Create"
    /* Create */
  );
}
function Iu(e) {
  return Tr(
    e,
    "Script"
    /* Script */
  );
}
function gm(e) {
  return Tr(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function pm(e) {
  return Tr(
    e,
    "Upload"
    /* Upload */
  );
}
function my(e) {
  return (t) => e.assetId === t.assetId;
}
function mm(e) {
  return Er(e, ue.Call);
}
function wm(e) {
  return Er(e, ue.MessageOut);
}
var ym = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((u) => u.assetId === o.assetId)
  );
  return n.map((o) => {
    const u = r.find((h) => h.assetId === o.assetId);
    if (!u)
      return o;
    const A = B(o.amount).add(u.amount);
    return { ...o, amount: A };
  }).concat(s);
};
function Im(e, t) {
  var n, r, s, i, o, u, A, h;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((u = t.from) == null ? void 0 : u.type) && ((A = e.to) == null ? void 0 : A.type) === ((h = t.to) == null ? void 0 : h.type);
}
function $n(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((u) => Im(u, t));
  if (n[r]) {
    const u = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (u.assetsSent = (i = u.assetsSent) != null && i.length ? ym(u, t) : t.assetsSent), (o = t.calls) != null && o.length && (u.calls = [...u.calls || [], ...t.calls]), n[r] = u;
  } else
    n.push(t);
  return n;
}
function wy(e) {
  return Er(e, ue.TransferOut);
}
function Em({
  inputs: e,
  receipts: t,
  baseAssetId: n
}) {
  return wm(t).reduce(
    (i, o) => {
      const u = pu(e, n);
      if (u) {
        const A = Bo(u);
        return $n(i, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: A
          },
          to: {
            type: 1,
            address: o.recipient.toString(),
            chain: "ethereum"
            /* ethereum */
          },
          assetsSent: [
            {
              amount: o.amount,
              assetId: n
            }
          ]
        });
      }
      return i;
    },
    []
  );
}
function bm({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = mm(n);
  return cm(t).reduce((h, E) => {
    const I = im(e, E.inputIndex);
    return I ? o.reduce((v, R) => {
      var C;
      if (R.to === I.contractID) {
        const F = pu(e, R.assetId);
        if (F) {
          const M = Bo(F), G = [], L = r == null ? void 0 : r[I.contractID];
          return L && G.push(
            Kp({
              abi: L,
              receipt: R,
              rawPayload: s,
              maxInputs: i
            })
          ), $n(v, {
            name: "Contract call",
            from: {
              type: 1,
              address: M
            },
            to: {
              type: 0,
              address: R.to
            },
            // if no amount is forwarded to the contract, skip showing assetsSent
            assetsSent: (C = R.amount) != null && C.isZero() ? void 0 : [
              {
                amount: R.amount,
                assetId: R.assetId
              }
            ],
            calls: G
          });
        }
      }
      return v;
    }, h) : h;
  }, []);
}
function Cm(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const u = t.some((h) => h.contractID === r) ? 0 : 1;
  if (Ne === o) {
    const h = n.find((E) => E.assetId === s);
    o = (h == null ? void 0 : h.to) || o;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((h) => h.contractID === o) ? 0 : 1,
      address: o
    },
    to: {
      type: u,
      address: r
    },
    assetsSent: [
      {
        assetId: s.toString(),
        amount: i
      }
    ]
  };
}
function Ja({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = mu(t), i = sm(e), o = am(t);
  s.forEach((h) => {
    const { amount: E, assetId: I, to: _ } = h, v = o.find((R) => R.assetId === I);
    v && (r = $n(r, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: v.to
      },
      to: {
        type: 1,
        address: _
      },
      assetsSent: [
        {
          assetId: I,
          amount: E
        }
      ]
    }));
  });
  const u = Er(
    n,
    ue.Transfer
  ), A = Er(
    n,
    ue.TransferOut
  );
  return [...u, ...A].forEach((h) => {
    const E = Cm(h, i, o);
    r = $n(r, E);
  }), r;
}
function Bm(e) {
  return mu(e).reduce((r, s) => $n(r, {
    name: "Pay network fee to block producer",
    from: {
      type: 1,
      address: "Network"
    },
    to: {
      type: 1,
      address: s.to.toString()
    },
    assetsSent: [
      {
        assetId: s.assetId.toString(),
        amount: s.amount
      }
    ]
  }), []);
}
function _m({ inputs: e, outputs: t }) {
  const n = om(t), r = rm(e)[0], s = Bo(r);
  return n.reduce((o, u) => $n(o, {
    name: "Contract created",
    from: {
      type: 1,
      address: s
    },
    to: {
      type: 0,
      address: (u == null ? void 0 : u.contractId) || ""
    }
  }), []);
}
function vm({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o,
  baseAssetId: u
}) {
  return yu(e) ? [
    ..._m({ inputs: t, outputs: n }),
    ...Ja({ inputs: t, outputs: n, receipts: r })
  ] : Iu(e) ? [
    ...Ja({ inputs: t, outputs: n, receipts: r }),
    ...bm({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...Em({ inputs: t, receipts: r, baseAssetId: u })
  ] : [...Bm(n)];
}
var cn = (e) => {
  const t = Lp(e);
  switch (t.type) {
    case ue.ReturnData:
      return {
        ...t,
        data: e.data || "0x"
      };
    case ue.LogData:
      return {
        ...t,
        data: e.data || "0x"
      };
    default:
      return t;
  }
}, xm = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, Rm = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, Sm = (e) => {
  switch (e) {
    case "FailureStatus":
      return "failure";
    case "SuccessStatus":
      return "success";
    case "SubmittedStatus":
      return "submitted";
    case "SqueezedOutStatus":
      return "squeezedout";
    default:
      throw new x(
        N.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, Qm = (e) => {
  let t, n, r, s, i, o = !1, u = !1, A = !1;
  if (e != null && e.type)
    switch (r = Sm(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, n = e.block.id, u = !0, s = B(e.totalFee), i = B(e.totalGas);
        break;
      case "FailureStatus":
        t = e.time, n = e.block.id, o = !0, s = B(e.totalFee), i = B(e.totalGas);
        break;
      case "SubmittedStatus":
        t = e.time, A = !0;
        break;
    }
  return {
    time: t,
    blockId: n,
    status: r,
    totalFee: s,
    totalGas: i,
    isStatusFailure: o,
    isStatusSuccess: u,
    isStatusPending: A
  };
};
function Ss(e) {
  var c, l;
  const {
    id: t,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: u,
    abiMap: A = {},
    maxInputs: h,
    gasCosts: E,
    maxGasPerTx: I,
    gasPrice: _,
    baseAssetId: v
  } = e, R = du(n), C = V(o), F = vm({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: C,
    abiMap: A,
    maxInputs: h,
    baseAssetId: v
  }), M = wu(i.type), G = B((l = (c = i.policies) == null ? void 0 : c.find((p) => p.type === Qt.Tip)) == null ? void 0 : l.data), { isStatusFailure: L, isStatusPending: W, isStatusSuccess: O, blockId: T, status: k, time: U, totalFee: q } = Qm(u), Y = $p({
    totalFee: q,
    gasPrice: _,
    rawPayload: C,
    tip: G,
    consensusParameters: {
      gasCosts: E,
      maxGasPerTx: I,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), H = xm(n), ee = Rm(n);
  let b;
  return U && (b = zi.fromTai64(U)), {
    id: t,
    tip: G,
    fee: Y,
    gasUsed: R,
    operations: F,
    type: M,
    blockId: T,
    time: U,
    status: k,
    receipts: n,
    mintedAssets: H,
    burnedAssets: ee,
    isTypeMint: hm(i.type),
    isTypeCreate: yu(i.type),
    isTypeScript: Iu(i.type),
    isTypeUpgrade: gm(i.type),
    isTypeUpload: pm(i.type),
    isStatusFailure: L,
    isStatusSuccess: O,
    isStatusPending: W,
    date: b,
    transaction: i
  };
}
function _o(e, t, n = {}) {
  return e.reduce((r, s) => {
    if (s.type === ue.LogData || s.type === ue.Log) {
      const i = new qt(n[s.id] || t), o = s.type === ue.Log ? new D("u64").encode(s.val0) : s.data, [u] = i.decodeLog(o, s.val1.toString());
      r.push(u);
    }
    return r;
  }, []);
}
var rs = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t, n) {
    /** Transaction ID */
    S(this, "id");
    /** Current provider */
    S(this, "provider");
    /** Gas used on the transaction */
    S(this, "gasUsed", B(0));
    /** The graphql Transaction with receipts object. */
    S(this, "gqlTransaction");
    S(this, "abis");
    this.id = e, this.provider = t, this.abis = n;
  }
  /**
   * Async constructor for `TransactionResponse`. This method can be used to create
   * an instance of `TransactionResponse` and wait for the transaction to be fetched
   * from the chain, ensuring that the `gqlTransaction` property is set.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  static async create(e, t, n) {
    const r = new rs(e, t, n);
    return await r.fetch(), r;
  }
  /**
   * Fetch the transaction with receipts from the provider.
   *
   * @returns Transaction with receipts query result.
   */
  async fetch() {
    const e = await this.provider.operations.getTransactionWithReceipts({
      transactionId: this.id
    });
    if (!e.transaction) {
      const t = this.provider.operations.statusChange({
        transactionId: this.id
      });
      for await (const { statusChange: n } of t)
        if (n)
          break;
      return this.fetch();
    }
    return this.gqlTransaction = e.transaction, e.transaction;
  }
  /**
   * Decode the raw payload of the transaction.
   *
   * @param transactionWithReceipts - The transaction with receipts object.
   * @returns The decoded transaction.
   */
  decodeTransaction(e) {
    var t;
    return (t = new wn().decode(
      z(e.rawPayload),
      0
    )) == null ? void 0 : t[0];
  }
  /**
   * Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
   * fetch it from the provider
   *
   * @param contractsAbiMap - The contracts ABI map.
   * @returns
   */
  async getTransactionSummary(e) {
    let t = this.gqlTransaction;
    t || (t = await this.fetch());
    const n = this.decodeTransaction(
      t
    );
    let r = [];
    t != null && t.status && "receipts" in t.status && (r = t.status.receipts);
    const s = r.map(cn) || [], { gasPerByte: i, gasPriceFactor: o, gasCosts: u, maxGasPerTx: A } = this.provider.getGasConfig(), h = await this.provider.getLatestGasPrice(), E = this.provider.getChain().consensusParameters.txParameters.maxInputs, I = this.provider.getBaseAssetId();
    return Ss({
      id: this.id,
      receipts: s,
      transaction: n,
      transactionBytes: z(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: i,
      gasPriceFactor: o,
      abiMap: e,
      maxInputs: E,
      gasCosts: u,
      maxGasPerTx: A,
      gasPrice: h,
      baseAssetId: I
    });
  }
  async waitForStatusChange() {
    var n, r;
    const e = (r = (n = this.gqlTransaction) == null ? void 0 : n.status) == null ? void 0 : r.type;
    if (e && e !== "SubmittedStatus")
      return;
    const t = this.provider.operations.statusChange({
      transactionId: this.id
    });
    for await (const { statusChange: s } of t) {
      if (s.type === "SqueezedOutStatus")
        throw new x(
          N.TRANSACTION_SQUEEZED_OUT,
          `Transaction Squeezed Out with reason: ${s.reason}`
        );
      if (s.type !== "SubmittedStatus")
        break;
    }
    await this.fetch();
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction result
   */
  async waitForResult(e) {
    var o;
    await this.waitForStatusChange();
    const t = await this.getTransactionSummary(e), n = {
      gqlTransaction: this.gqlTransaction,
      ...t
    };
    let r = [];
    this.abis && (r = _o(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), n.logs = r);
    const { gqlTransaction: s, receipts: i } = n;
    if (((o = s.status) == null ? void 0 : o.type) === "FailureStatus") {
      const { reason: u } = s.status;
      throw Io({
        receipts: i,
        statusReason: u,
        logs: r
      });
    }
    return n;
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   */
  async wait(e) {
    return this.waitForResult(e);
  }
};
function Nm(e, t) {
  const n = e.baseDelay ?? 150;
  switch (e.backoff) {
    case "linear":
      return n * t;
    case "fixed":
      return n;
    case "exponential":
    default:
      return 2 ** (t - 1) * n;
  }
}
function Eu(e, t, n = 0) {
  return t === void 0 ? e : async (...r) => {
    var s;
    try {
      return await e(...r);
    } catch (i) {
      const o = i;
      if (((s = o.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw o;
      const u = n + 1;
      if (u > t.maxRetries)
        throw o;
      const A = Nm(t, u);
      return await Xp(A), Eu(e, t, u)(...r);
    }
  };
}
var Dm = (...e) => {
  const t = {};
  function n({ amount: r, assetId: s }) {
    t[s] ? t[s] = t[s].add(r) : t[s] = r;
  }
  return e.forEach((r) => r.forEach(n)), Object.entries(t).map(([r, s]) => ({ assetId: r, amount: s }));
}, qa = 10, Tm = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, {
    contractParams: i,
    feeParams: o,
    predicateParams: u,
    scriptParams: A,
    txParams: h,
    gasCosts: E,
    baseAssetId: I,
    chainId: _,
    version: v
  } = r;
  return {
    name: t,
    baseChainHeight: B(n),
    consensusParameters: {
      version: v,
      chainId: B(_),
      baseAssetId: I,
      feeParameters: {
        version: o.version,
        gasPerByte: B(o.gasPerByte),
        gasPriceFactor: B(o.gasPriceFactor)
      },
      contractParameters: {
        version: i.version,
        contractMaxSize: B(i.contractMaxSize),
        maxStorageSlots: B(i.maxStorageSlots)
      },
      txParameters: {
        version: h.version,
        maxInputs: B(h.maxInputs),
        maxOutputs: B(h.maxOutputs),
        maxWitnesses: B(h.maxWitnesses),
        maxGasPerTx: B(h.maxGasPerTx),
        maxSize: B(h.maxSize),
        maxBytecodeSubsections: B(h.maxBytecodeSubsections)
      },
      predicateParameters: {
        version: u.version,
        maxPredicateLength: B(u.maxPredicateLength),
        maxPredicateDataLength: B(u.maxPredicateDataLength),
        maxGasPerPredicate: B(u.maxGasPerPredicate),
        maxMessageDataLength: B(u.maxMessageDataLength)
      },
      scriptParameters: {
        version: A.version,
        maxScriptLength: B(A.maxScriptLength),
        maxScriptDataLength: B(A.maxScriptDataLength)
      },
      gasCosts: E
    },
    latestBlock: {
      id: s.id,
      height: B(s.height),
      time: s.header.time,
      transactions: s.transactions.map((R) => ({
        id: R.id
      }))
    }
  };
}, Mi, bu, Ot = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, an(this, Mi), De(this, "operations"), De(this, "cache"), De(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new Np(t.cacheUtxo) : void 0;
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    Ot.nodeInfoCache = {}, Ot.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return Eu(async (...r) => {
      const s = r[0], i = r[1], o = n ? AbortSignal.timeout(n) : void 0;
      let u = { ...i, signal: o };
      return e.requestMiddleware && (u = await e.requestMiddleware(u)), e.fetch ? e.fetch(s, u, e) : fetch(s, u);
    }, t);
  }
  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   *
   * @returns A promise that resolves to a Provider instance.
   */
  static async create(e, t = {}) {
    const n = new Ot(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   *
   * @returns the chain information configuration.
   */
  getChain() {
    const e = Ot.chainInfoCache[this.url];
    if (!e)
      throw new x(
        N.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   *
   * @returns the node information configuration.
   */
  getNode() {
    const e = Ot.nodeInfoCache[this.url];
    if (!e)
      throw new x(
        N.NODE_INFO_CACHE_EMPTY,
        "Node info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns some helpful parameters related to gas fees.
   */
  getGasConfig() {
    const {
      txParameters: { maxGasPerTx: e },
      predicateParameters: { maxGasPerPredicate: t },
      feeParameters: { gasPriceFactor: n, gasPerByte: r },
      gasCosts: s
    } = this.getChain().consensusParameters;
    return {
      maxGasPerTx: e,
      maxGasPerPredicate: t,
      gasPriceFactor: n,
      gasPerByte: r,
      gasCosts: s
    };
  }
  /**
   * Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.
   *
   * @param url - The URL to connect to.
   * @param options - Additional options for the provider.
   */
  async connect(e, t) {
    this.url = e, this.options = t ?? this.options, this.operations = this.createOperations(), await this.fetchChainAndNodeInfo();
  }
  /**
   * Return the chain and node information.
   *
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo() {
    const e = await this.fetchChain(), t = await this.fetchNode();
    return Ot.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  /**
   * @hidden
   */
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = ed(e.nodeVersion);
    (!t || !n) && console.warn(
      `The Fuel Node that you are trying to connect to is using fuel-core version ${e.nodeVersion},
which is not supported by the version of the TS SDK that you are using.
Things may not work as expected.
Supported fuel-core version: ${r}.`
    );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   * @hidden
   */
  createOperations() {
    const e = Ot.getFetchFn(this.options), t = new ih.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options),
      responseMiddleware: (r) => {
        if ("response" in r) {
          const s = r.response;
          if (Array.isArray(s == null ? void 0 : s.errors))
            throw new x(
              x.CODES.INVALID_REQUEST,
              s.errors.map((i) => i.message).join(`

`)
            );
        }
      }
    });
    return Sp((r, s) => {
      const i = r.definitions.find((u) => u.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new uu({
        url: this.url,
        query: r,
        fetchFn: (u, A) => e(u, A, this.options),
        variables: s
      }) : t.request(r, s);
    });
  }
  /**
   * Returns the version of the connected node.
   *
   * @returns A promise that resolves to the version string.
   */
  async getVersion() {
    const {
      nodeInfo: { nodeVersion: e }
    } = await this.operations.getVersion();
    return e;
  }
  /**
   * Returns the latest block number.
   *
   * @returns A promise that resolves to the latest block number.
   */
  async getBlockNumber() {
    const { chain: e } = await this.operations.getChain();
    return B(e.latestBlock.height, 10);
  }
  /**
   * Returns the node information for the current provider network.
   *
   * @returns a promise that resolves to the node information.
   */
  async fetchNode() {
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = {
      maxDepth: B(e.maxDepth),
      maxTx: B(e.maxTx),
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace
    };
    return Ot.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = Tm(e);
    return Ot.chainInfoCache[this.url] = t, t;
  }
  /**
   * Returns the chain ID for the current provider network.
   *
   * @returns A promise that resolves to the chain ID number.
   */
  getChainId() {
    const {
      consensusParameters: { chainId: e }
    } = this.getChain();
    return e.toNumber();
  }
  /**
   * Returns the base asset ID for the current provider network.
   *
   * @returns the base asset ID.
   */
  getBaseAssetId() {
    const {
      consensusParameters: { baseAssetId: e }
    } = this.getChain();
    return e;
  }
  /**
   * Submits a transaction to the chain to be executed.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param sendTransactionParams - The provider send transaction parameters (optional).
   * @returns A promise that resolves to the transaction response object.
   */
  // #region Provider-sendTransaction
  async sendTransaction(e, { estimateTxDependencies: t = !0, awaitExecution: n = !1 } = {}) {
    const r = wt(e);
    Qi(this, Mi, bu).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = V(r.toTransactionBytes());
    let i;
    if (r.type === Le.Script && (i = r.abis), n) {
      const u = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: E } of u) {
        if (E.type === "SqueezedOutStatus")
          throw new x(
            N.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${E.reason}`
          );
        if (E.type !== "SubmittedStatus")
          break;
      }
      const A = r.getTransactionId(this.getChainId()), h = new rs(A, this, i);
      return await h.fetch(), h;
    }
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: s });
    return new rs(o, this, i);
  }
  /**
   * Executes a transaction without actually submitting it to the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param sendTransactionParams - The provider call parameters (optional).
   * @returns A promise that resolves to the call result object.
   */
  async call(e, { utxoValidation: t, estimateTxDependencies: n = !0 } = {}) {
    const r = wt(e);
    if (n)
      return this.estimateTxDependencies(r);
    const s = V(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: t || !1
    }), [{ receipts: o, status: u }] = i;
    return { receipts: o.map(cn), dryRunStatus: u };
  }
  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @template T - The type of the transaction request object.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(e) {
    if (!!!e.inputs.find(
      (i) => "predicate" in i && i.predicate && !w0(z(i.predicate), z("0x")) && new Me(i.predicateGasUsed).isZero()
    ))
      return e;
    const n = V(e.toTransactionBytes()), r = await this.operations.estimatePredicates({
      encodedTransaction: n
    }), {
      estimatePredicates: { inputs: s }
    } = r;
    return s && s.forEach((i, o) => {
      "predicateGasUsed" in i && B(i.predicateGasUsed).gt(0) && (e.inputs[o].predicateGasUsed = i.predicateGasUsed);
    }), e;
  }
  /**
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimate transaction dependencies.
   */
  async estimateTxDependencies(e) {
    if (e.type === Le.Create)
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let t = [];
    const n = [];
    let r = 0, s;
    for (let i = 0; i < qa; i++) {
      const {
        dryRun: [{ receipts: o, status: u }]
      } = await this.operations.dryRun({
        encodedTransactions: [V(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(cn), s = u;
      const { missingOutputVariables: A, missingOutputContractIds: h } = Za(t);
      if (A.length !== 0 || h.length !== 0) {
        r += A.length, e.addVariableOutputs(A.length), h.forEach(({ contractId: _ }) => {
          e.addContractInputAndOutput(de.fromString(_)), n.push(_);
        });
        const { maxFee: I } = await this.estimateTxGasAndFee({
          transactionRequest: e
        });
        e.maxFee = I;
      } else
        break;
    }
    return {
      receipts: t,
      outputVariables: r,
      missingContractIds: n,
      dryRunStatus: s
    };
  }
  /**
   * Dry runs multiple transactions and checks for missing dependencies in batches.
   *
   * Transactions are dry run in batches. After each dry run, transactions requiring
   * further modifications are identified. The method iteratively updates these transactions
   * and performs subsequent dry runs until all dependencies for each transaction are satisfied.
   *
   * @param transactionRequests - Array of transaction request objects.
   * @returns A promise that resolves to an array of results for each transaction.
   */
  async estimateMultipleTxDependencies(e) {
    const t = e.map(() => ({
      receipts: [],
      outputVariables: 0,
      missingContractIds: [],
      dryRunStatus: void 0
    })), n = Pt(e), r = /* @__PURE__ */ new Map();
    n.forEach((o, u) => {
      o.type === Le.Script && r.set(u, V(o.toTransactionBytes()));
    });
    let s = Array.from(r.keys()), i = 0;
    for (; s.length > 0 && i < qa; ) {
      const o = s.map(
        (h) => r.get(h)
      ), u = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), A = [];
      for (let h = 0; h < u.dryRun.length; h++) {
        const E = s[h], { receipts: I, status: _ } = u.dryRun[h], v = t[E];
        v.receipts = I.map(cn), v.dryRunStatus = _;
        const { missingOutputVariables: R, missingOutputContractIds: C } = Za(
          v.receipts
        ), F = R.length > 0 || C.length > 0, M = n[E];
        if (F && (M == null ? void 0 : M.type) === Le.Script) {
          v.outputVariables += R.length, M.addVariableOutputs(R.length), C.forEach(({ contractId: L }) => {
            M.addContractInputAndOutput(de.fromString(L)), v.missingContractIds.push(L);
          });
          const { maxFee: G } = await this.estimateTxGasAndFee({
            transactionRequest: M
          });
          M.maxFee = G, r.set(E, V(M.toTransactionBytes())), A.push(E);
        }
      }
      s = A, i += 1;
    }
    return t;
  }
  /**
   * Dry runs multiple transactions.
   *
   * @param transactionRequests - Array of transaction request objects.
   * @param sendTransactionParams - The provider call parameters (optional).
   *
   * @returns A promise that resolves to an array of results for each transaction call.
   */
  async dryRunMultipleTransactions(e, { utxoValidation: t, estimateTxDependencies: n = !0 } = {}) {
    if (n)
      return this.estimateMultipleTxDependencies(e);
    const r = e.map((o) => V(o.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: r,
      utxoValidation: t || !1
    });
    return s.map(({ receipts: o, status: u }) => ({ receipts: o.map(cn), dryRunStatus: u }));
  }
  /**
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param transactionRequest - The transaction request object.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  async estimateTxGasAndFee(e) {
    const { transactionRequest: t } = e;
    let { gasPrice: n } = e;
    const r = this.getChain(), { gasPriceFactor: s, maxGasPerTx: i } = this.getGasConfig(), o = t.calculateMinGas(r);
    n || (n = await this.estimateGasPrice(10));
    const u = Ni({
      gasPrice: B(n),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let A = B(0);
    t.type === Le.Script && (A = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(r, o)
    ), A = t.gasLimit));
    const h = t.calculateMaxGas(r, o), E = Ni({
      gasPrice: B(n),
      gas: h,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: u,
      maxGas: h,
      maxFee: E,
      gasPrice: n,
      gasLimit: A
    };
  }
  /**
   * Executes a signed transaction without applying the states changes
   * on the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added
   *
   * @param transactionRequestLike - The transaction request object.
   * @param estimateTxParams - The estimate transaction params (optional).
   * @returns A promise that resolves to the call result object.
   */
  async simulate(e, { estimateTxDependencies: t = !0 } = {}) {
    const n = wt(e);
    if (t)
      return this.estimateTxDependencies(n);
    const r = [V(n.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: r,
      utxoValidation: !0
    });
    return { receipts: s.map((o) => {
      const { id: u, receipts: A, status: h } = o, E = A.map(cn);
      return { id: u, receipts: E, status: h };
    })[0].receipts };
  }
  /**
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the the transaction.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param transactionCostParams - The transaction cost parameters (optional).
   *
   * @returns A promise that resolves to the transaction cost object.
   */
  async getTransactionCost(e, { resourcesOwner: t, signatureCallback: n, quantitiesToContract: r = [] } = {}) {
    const s = Pt(wt(e)), i = s.type === Le.Script, o = this.getBaseAssetId(), u = s.maxFee.eq(0), A = s.getCoinOutputsQuantities(), h = Dm(A, r);
    s.fundWithFakeUtxos(h, o, t == null ? void 0 : t.address), i && (s.gasLimit = B(0)), t && "populateTransactionPredicateData" in t && t.populateTransactionPredicateData(s);
    const E = Pt(s);
    let I = 0;
    if (n && i) {
      const k = E.witnesses.length;
      await n(E), I = E.witnesses.length - k;
    }
    await this.estimatePredicates(E), s.updatePredicateGasUsed(E.inputs);
    let { maxFee: _, maxGas: v, minFee: R, minGas: C, gasPrice: F, gasLimit: M } = await this.estimateTxGasAndFee({
      transactionRequest: E
    }), G = [], L, W = [], O = 0, T = B(0);
    if (s.maxFee = _, i) {
      if (s.gasLimit = M, n && await n(s), { receipts: G, missingContractIds: W, outputVariables: O, dryRunStatus: L } = await this.estimateTxDependencies(s), L && "reason" in L)
        throw this.extractDryRunError(s, G, L);
      T = du(G), s.gasLimit = T, { maxFee: _, maxGas: v, minFee: R, minGas: C, gasPrice: F } = await this.estimateTxGasAndFee({
        transactionRequest: s,
        gasPrice: F
      });
    }
    return {
      requiredQuantities: h,
      receipts: G,
      gasUsed: T,
      gasPrice: F,
      minGas: C,
      maxGas: v,
      minFee: R,
      maxFee: _,
      outputVariables: O,
      missingContractIds: W,
      addedSignatures: I,
      estimatedPredicates: s.inputs,
      dryRunStatus: L,
      updateMaxFee: u
    };
  }
  /**
   * Get the required quantities and associated resources for a transaction.
   *
   * @param owner - address to add resources from.
   * @param transactionRequestLike - transaction request to populate resources for.
   * @param quantitiesToContract - quantities for the contract (optional).
   *
   * @returns a promise resolving to the required quantities for the transaction.
   */
  async getResourcesForTransaction(e, t, n = []) {
    const r = de.fromAddressOrString(e), s = wt(Pt(t)), i = await this.getTransactionCost(s, {
      quantitiesToContract: n
    });
    s.addResources(
      await this.getResourcesToSpend(r, i.requiredQuantities)
    );
    const { requiredQuantities: o, ...u } = await this.getTransactionCost(s, {
      quantitiesToContract: n
    });
    return {
      resources: await this.getResourcesToSpend(r, o),
      requiredQuantities: o,
      ...u
    };
  }
  /**
   * Returns coins for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get (optional).
   * @param paginationArgs - Pagination arguments (optional).
   *
   * @returns A promise that resolves to the coins.
   */
  async getCoins(e, t, n) {
    const r = de.fromAddressOrString(e);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: t && V(t) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: B(o.amount),
      owner: de.fromAddressOrString(o.owner),
      blockCreated: B(o.blockCreated),
      txCreatedIdx: B(o.txCreatedIdx)
    }));
  }
  /**
   * Returns resources for the given owner satisfying the spend query.
   *
   * @param owner - The address to get resources for.
   * @param quantities - The coin quantities to get.
   * @param excludedIds - IDs of excluded resources from the selection (optional).
   * @returns A promise that resolves to the resources.
   */
  async getResourcesToSpend(e, t, n) {
    var A, h, E;
    const r = de.fromAddressOrString(e), s = {
      messages: ((A = n == null ? void 0 : n.messages) == null ? void 0 : A.map((I) => V(I))) || [],
      utxos: ((h = n == null ? void 0 : n.utxos) == null ? void 0 : h.map((I) => V(I))) || []
    };
    if (this.cache) {
      const I = new Set(
        s.utxos.concat((E = this.cache) == null ? void 0 : E.getActiveData().map((_) => V(_)))
      );
      s.utxos = Array.from(I);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(po).map(({ assetId: I, amount: _, max: v }) => ({
        assetId: V(I),
        amount: _.toString(10),
        max: v ? v.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((I) => {
      switch (I.type) {
        case "MessageCoin":
          return {
            amount: B(I.amount),
            assetId: I.assetId,
            daHeight: B(I.daHeight),
            sender: de.fromAddressOrString(I.sender),
            recipient: de.fromAddressOrString(I.recipient),
            nonce: I.nonce
          };
        case "Coin":
          return {
            id: I.utxoId,
            amount: B(I.amount),
            assetId: I.assetId,
            owner: de.fromAddressOrString(I.owner),
            blockCreated: B(I.blockCreated),
            txCreatedIdx: B(I.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((I) => !!I);
  }
  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block or null.
   */
  async getBlock(e) {
    let t;
    typeof e == "number" ? t = { height: B(e).toString(10) } : e === "latest" ? t = { height: (await this.getBlockNumber()).toString(10) } : e.length === 66 ? t = { blockId: e } : t = { blockId: B(e).toString(10) };
    const { block: n } = await this.operations.getBlock(t);
    return n ? {
      id: n.id,
      height: B(n.height),
      time: n.header.time,
      transactionIds: n.transactions.map((r) => r.id)
    } : null;
  }
  /**
   * Returns all the blocks matching the given parameters.
   *
   * @param params - The parameters to query blocks.
   * @returns A promise that resolves to the blocks.
   */
  async getBlocks(e) {
    const { blocks: t } = await this.operations.getBlocks(e);
    return t.edges.map(({ node: r }) => ({
      id: r.id,
      height: B(r.height),
      time: r.header.time,
      transactionIds: r.transactions.map((s) => s.id)
    }));
  }
  /**
   * Returns block matching the given ID or type, including transaction data.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlockWithTransactions(e) {
    let t;
    typeof e == "number" ? t = { blockHeight: B(e).toString(10) } : e === "latest" ? t = { blockHeight: (await this.getBlockNumber()).toString() } : t = { blockId: e };
    const { block: n } = await this.operations.getBlockWithTransactions(t);
    return n ? {
      id: n.id,
      height: B(n.height, 10),
      time: n.header.time,
      transactionIds: n.transactions.map((r) => r.id),
      transactions: n.transactions.map(
        (r) => {
          var s;
          return (s = new wn().decode(z(r.rawPayload), 0)) == null ? void 0 : s[0];
        }
      )
    } : null;
  }
  /**
   * Get transaction with the given ID.
   *
   * @param transactionId - ID of the transaction.
   * @returns A promise that resolves to the transaction.
   */
  async getTransaction(e) {
    var n;
    const { transaction: t } = await this.operations.getTransaction({ transactionId: e });
    return t ? (n = new wn().decode(
      z(t.rawPayload),
      0
    )) == null ? void 0 : n[0] : null;
  }
  /**
   * Get deployed contract with the given ID.
   *
   * @param contractId - ID of the contract.
   * @returns A promise that resolves to the contract.
   */
  async getContract(e) {
    const { contract: t } = await this.operations.getContract({ contractId: e });
    return t || null;
  }
  /**
   * Returns the balance for the given contract for the given asset ID.
   *
   * @param contractId - The contract ID to get the balance for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getContractBalance(e, t) {
    const { contractBalance: n } = await this.operations.getContractBalance({
      contract: de.fromAddressOrString(e).toB256(),
      asset: V(t)
    });
    return B(n.amount, 10);
  }
  /**
   * Returns the balance for the given owner for the given asset ID.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getBalance(e, t) {
    const { balance: n } = await this.operations.getBalance({
      owner: de.fromAddressOrString(e).toB256(),
      assetId: V(t)
    });
    return B(n.amount, 10);
  }
  /**
   * Returns balances for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the balances.
   */
  async getBalances(e, t) {
    return (await this.operations.getBalances({
      first: 10,
      ...t,
      filter: { owner: de.fromAddressOrString(e).toB256() }
    })).balances.edges.map((s) => s.node).map((s) => ({
      assetId: s.assetId,
      amount: B(s.amount)
    }));
  }
  /**
   * Returns message for the given address.
   *
   * @param address - The address to get message from.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the messages.
   */
  async getMessages(e, t) {
    return (await this.operations.getMessages({
      first: 10,
      ...t,
      owner: de.fromAddressOrString(e).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: mr.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: B(s.amount),
        data: s.data
      }),
      sender: de.fromAddressOrString(s.sender),
      recipient: de.fromAddressOrString(s.recipient),
      nonce: s.nonce,
      amount: B(s.amount),
      data: mr.decodeData(s.data),
      daHeight: B(s.daHeight)
    }));
  }
  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param transactionId - The transaction to get message from.
   * @param messageId - The message id from MessageOut receipt.
   * @param commitBlockId - The commit block id (optional).
   * @param commitBlockHeight - The commit block height (optional).
   * @returns A promise that resolves to the message proof.
   */
  async getMessageProof(e, t, n, r) {
    let s = {
      transactionId: e,
      nonce: t
    };
    if (n && r)
      throw new x(
        N.INVALID_INPUT_PARAMETERS,
        "commitBlockId and commitBlockHeight cannot be used together"
      );
    n && (s = {
      ...s,
      commitBlockId: n
    }), r && (s = {
      ...s,
      // Conver BN into a number string required on the query
      // This should problably be fixed on the fuel client side
      commitBlockHeight: r.toNumber().toString()
    });
    const i = await this.operations.getMessageProof(s);
    if (!i.messageProof)
      return null;
    const {
      messageProof: o,
      messageBlockHeader: u,
      commitBlockHeader: A,
      blockProof: h,
      sender: E,
      recipient: I,
      amount: _,
      data: v
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: B(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: B(h.proofIndex),
        proofSet: h.proofSet
      },
      messageBlockHeader: {
        id: u.id,
        daHeight: B(u.daHeight),
        transactionsCount: Number(u.transactionsCount),
        transactionsRoot: u.transactionsRoot,
        height: B(u.height),
        prevRoot: u.prevRoot,
        time: u.time,
        applicationHash: u.applicationHash,
        messageReceiptCount: Number(u.messageReceiptCount),
        messageOutboxRoot: u.messageOutboxRoot,
        consensusParametersVersion: Number(u.consensusParametersVersion),
        eventInboxRoot: u.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(u.stateTransitionBytecodeVersion)
      },
      commitBlockHeader: {
        id: A.id,
        daHeight: B(A.daHeight),
        transactionsCount: Number(A.transactionsCount),
        transactionsRoot: A.transactionsRoot,
        height: B(A.height),
        prevRoot: A.prevRoot,
        time: A.time,
        applicationHash: A.applicationHash,
        messageReceiptCount: Number(A.messageReceiptCount),
        messageOutboxRoot: A.messageOutboxRoot,
        consensusParametersVersion: Number(A.consensusParametersVersion),
        eventInboxRoot: A.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(A.stateTransitionBytecodeVersion)
      },
      sender: de.fromAddressOrString(E),
      recipient: de.fromAddressOrString(I),
      nonce: t,
      amount: B(_),
      data: v
    };
  }
  /**
   * Get the latest gas price from the node.
   *
   * @returns A promise that resolves to the latest gas price.
   */
  async getLatestGasPrice() {
    const { latestGasPrice: e } = await this.operations.getLatestGasPrice();
    return B(e.gasPrice);
  }
  /**
   * Returns the estimate gas price for the given block horizon.
   *
   * @param blockHorizon - The block horizon to estimate gas price for.
   * @returns A promise that resolves to the estimated gas price.
   */
  async estimateGasPrice(e) {
    const { estimateGasPrice: t } = await this.operations.estimateGasPrice({
      blockHorizon: String(e)
    });
    return B(t.gasPrice);
  }
  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param nonce - The nonce of the message to get status from.
   * @returns A promise that resolves to the message status
   */
  async getMessageStatus(e) {
    return (await this.operations.getMessageStatus({ nonce: e })).messageStatus;
  }
  /**
   * Lets you produce blocks with custom timestamps and the block number of the last block produced.
   *
   * @param amount - The amount of blocks to produce.
   * @param startTime - The UNIX timestamp (milliseconds) to set for the first produced block (optional).
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(e, t) {
    const { produceBlocks: n } = await this.operations.produceBlocks({
      blocksToProduce: B(e).toString(10),
      startTimestamp: t ? zi.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return B(n);
  }
  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new rs(e, this);
  }
  /**
   * Returns Message for given nonce.
   *
   * @param nonce - The nonce of the message to retrieve.
   * @returns A promise that resolves to the Message object or null.
   */
  async getMessageByNonce(e) {
    const { message: t } = await this.operations.getMessageByNonce({ nonce: e });
    return t || null;
  }
  /**
   * Get the relayed transaction for the given transaction ID.
   *
   * @param relayedTransactionId - The relayed transaction ID to get the response for.
   * @returns A promise that resolves to the relayed transaction.
   */
  async getRelayedTransactionStatus(e) {
    const { relayedTransactionStatus: t } = await this.operations.getRelayedTransactionStatus({
      relayedTransactionId: e
    });
    return t || null;
  }
  /**
   * @hidden
   */
  extractDryRunError(e, t, n) {
    const r = n;
    let s = [];
    return e.abis && (s = _o(
      t,
      e.abis.main,
      e.abis.otherContractsAbis
    )), Io({
      logs: s,
      receipts: t,
      statusReason: r.reason
    });
  }
}, gs = Ot;
Mi = /* @__PURE__ */ new WeakSet();
bu = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === Ce.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
De(gs, "chainInfoCache", {});
De(gs, "nodeInfoCache", {});
async function yy(e) {
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new x(
      N.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new wn().decode(
    z(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const u = o.map(cn), {
    consensusParameters: {
      feeParameters: { gasPerByte: A, gasPriceFactor: h },
      txParameters: { maxInputs: E, maxGasPerTx: I },
      gasCosts: _
    }
  } = n.getChain(), v = await n.getLatestGasPrice(), R = n.getBaseAssetId(), C = Ss({
    id: s.id,
    receipts: u,
    transaction: i,
    transactionBytes: z(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: B(A),
    gasPriceFactor: B(h),
    abiMap: r,
    maxInputs: E,
    gasCosts: _,
    maxGasPerTx: I,
    gasPrice: v,
    baseAssetId: R
  });
  return {
    gqlTransaction: s,
    ...C
  };
}
async function Iy(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: u, maxGasPerTx: A } = t.getGasConfig(), h = t.getChain().consensusParameters.txParameters.maxInputs, E = n.toTransaction(), I = n.toTransactionBytes(), _ = await t.getLatestGasPrice(), v = t.getBaseAssetId();
  return Ss({
    receipts: s,
    transaction: E,
    transactionBytes: I,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: h,
    gasCosts: u,
    maxGasPerTx: A,
    gasPrice: _,
    baseAssetId: v
  });
}
async function Ey(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: {
      feeParameters: { gasPerByte: u, gasPriceFactor: A },
      txParameters: { maxInputs: h, maxGasPerTx: E },
      gasCosts: I
    }
  } = n.getChain(), _ = await n.getLatestGasPrice(), v = n.getBaseAssetId();
  return {
    transactions: i.map((C) => {
      const { node: F } = C, { id: M, rawPayload: G, status: L } = F, [W] = new wn().decode(z(G), 0);
      let O = [];
      F != null && F.status && "receipts" in F.status && (O = F.status.receipts);
      const T = O.map(cn), k = Ss({
        id: M,
        receipts: T,
        transaction: W,
        transactionBytes: z(G),
        gqlTransactionStatus: L,
        abiMap: r,
        gasPerByte: u,
        gasPriceFactor: A,
        maxInputs: h,
        gasCosts: I,
        maxGasPerTx: E,
        gasPrice: _,
        baseAssetId: v
      });
      return {
        gqlTransaction: F,
        ...k
      };
    }),
    pageInfo: o
  };
}
var Ln = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    beta5: 0,
    devnet: 10
  }
}, Fm = (e) => {
  if (e === "ethereum")
    return Ln.eth.sepolia;
  if (e === "fuel")
    return Ln.fuel.devnet;
}, Mm = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), Cu = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? Fm(n);
  if (i === void 0)
    return;
  const o = Mm({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, by = (e, t) => Cu({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), Cy = (e, t) => Cu({
  asset: e,
  networkType: "fuel",
  chainId: t
}), Om = "/", Lm = /^\/|\/$/g, km = (e = "") => e.replace(Lm, "");
function Pm(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(km);
  return r && n && s.unshift(""), s.join(Om);
}
function Um(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: Pm(t, n.icon)
  }));
}
var Gm = "https://cdn.fuel.network/assets/", Xm = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: Ln.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: Ln.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: Ln.fuel.beta5,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        type: "fuel",
        chainId: Ln.fuel.devnet,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
], By = Um(Xm, Gm), zm = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new D("u64").encode(new Me(n).toNumber());
  return Uint8Array.from([
    ...z(r),
    ...i,
    ...z(t)
  ]);
}, Ym = async (e) => {
  const t = zm(e);
  await fo();
  const n = bh(16, 0, Bh.ScriptData), r = Fa(17, 16, 32), s = _i(18, 17, 0), i = Fa(19, 17, 8), o = Eh(16, 18, 19), u = G0(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...u.to_bytes()
  ]), scriptData: t };
}, Vm = 2, Qs = class extends u0 {
  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance  (optional).
   * @param connector - A FuelConnector instance (optional).
   */
  constructor(t, n, r) {
    super();
    /**
     * The address associated with the account.
     */
    S(this, "address");
    /**
     * The provider used to interact with the network.
     */
    S(this, "_provider");
    /**
     * The connector for use with external wallets
     */
    S(this, "_connector");
    this._provider = n, this._connector = r, this.address = de.fromDynamicInput(t);
  }
  /**
   * The provider used to interact with the network.
   *
   * @returns A Provider instance.
   *
   * @throws `FuelError` if the provider is not set.
   */
  get provider() {
    if (!this._provider)
      throw new x(N.MISSING_PROVIDER, "Provider not set");
    return this._provider;
  }
  /**
   * Sets the provider for the account.
   *
   * @param provider - A Provider instance.
   */
  set provider(t) {
    this._provider = t;
  }
  /**
   * Changes the provider connection for the account.
   *
   * @param provider - A Provider instance.
   * @returns The updated Provider instance.
   */
  connect(t) {
    return this._provider = t, this.provider;
  }
  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - Quantities of resources to be obtained.
   * @param excludedIds - IDs of resources to be excluded from the query (optional).
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(t, n) {
    return this.provider.getResourcesToSpend(this.address, t, n);
  }
  /**
   * Retrieves coins owned by the account.
   *
   * @param assetId - The asset ID of the coins to retrieve (optional).
   * @returns A promise that resolves to an array of Coins.
   */
  async getCoins(t) {
    const n = [];
    let s;
    for (; ; ) {
      const i = await this.provider.getCoins(this.address, t, {
        first: 9999,
        after: s
      });
      if (n.push(...i), !(i.length >= 9999))
        break;
      throw new x(
        N.NOT_SUPPORTED,
        "Wallets containing more than 9999 coins exceed the current supported limit."
      );
    }
    return n;
  }
  /**
   * Retrieves messages owned by the account.
   *
   * @returns A promise that resolves to an array of Messages.
   */
  async getMessages() {
    const t = [];
    let r;
    for (; ; ) {
      const s = await this.provider.getMessages(this.address, {
        first: 9999,
        after: r
      });
      if (t.push(...s), !(s.length >= 9999))
        break;
      throw new x(
        N.NOT_SUPPORTED,
        "Wallets containing more than 9999 messages exceed the current supported limit."
      );
    }
    return t;
  }
  /**
   * Retrieves the balance of the account for the given asset.
   *
   * @param assetId - The asset ID to check the balance for (optional).
   * @returns A promise that resolves to the balance amount.
   */
  async getBalance(t) {
    const n = t ?? this.provider.getBaseAssetId();
    return await this.provider.getBalance(this.address, n);
  }
  /**
   * Retrieves all the balances for the account.
   *
   * @returns A promise that resolves to an array of Coins and their quantities.
   */
  async getBalances() {
    const t = [];
    let r;
    for (; ; ) {
      const s = await this.provider.getBalances(this.address, {
        first: 9999,
        after: r
      });
      if (t.push(...s), !(s.length >= 9999))
        break;
      throw new x(
        N.NOT_SUPPORTED,
        "Wallets containing more than 9999 balances exceed the current supported limit."
      );
    }
    return t;
  }
  /**
   * Funds a transaction request by adding the necessary resources.
   *
   * @typeParam T - The type of the TransactionRequest.
   * @param request - The transaction request to fund.
   * @param params - The estimated transaction parameters.
   * @returns A promise that resolves to the funded transaction request.
   */
  async fund(t, n) {
    var M;
    const { addedSignatures: r, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: o } = n, u = t.maxFee, A = this.provider.getBaseAssetId(), h = ((M = i.find((G) => G.assetId === A)) == null ? void 0 : M.amount) || B(0), E = vg({
      amount: B(u),
      assetId: A,
      coinQuantities: i
    }), I = {};
    E.forEach(({ amount: G, assetId: L }) => {
      I[L] = {
        required: G,
        owned: B(0)
      };
    }), t.inputs.filter(ln).forEach((G) => {
      const W = nr(G) ? String(G.assetId) : A;
      I[W] && (I[W].owned = I[W].owned.add(G.amount));
    });
    let _ = [];
    Object.entries(I).forEach(([G, { owned: L, required: W }]) => {
      L.lt(W) && _.push({
        assetId: G,
        amount: W.sub(L)
      });
    });
    let v = _.length > 0, R = 0;
    for (; v && R < Vm; ) {
      const G = await this.getResourcesToSpend(
        _,
        Zp(t.inputs, this.address)
      );
      t.addResources(G), t.updatePredicateGasUsed(s);
      const L = Pt(t);
      if (r && Array.from({ length: r }).forEach(
        () => L.addEmptyWitness()
      ), !o)
        break;
      const { maxFee: W } = await this.provider.estimateTxGasAndFee({
        transactionRequest: L
      }), O = Hp(
        t.inputs,
        A,
        A
      ), T = h.add(W);
      O.gt(T) ? v = !1 : _ = [
        {
          amount: T.sub(O),
          assetId: A
        }
      ], R += 1;
    }
    t.updatePredicateGasUsed(s);
    const C = Pt(t);
    if (r && Array.from({ length: r }).forEach(() => C.addEmptyWitness()), !o)
      return t;
    const { maxFee: F } = await this.provider.estimateTxGasAndFee({
      transactionRequest: C
    });
    return t.maxFee = F, t;
  }
  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(t, n, r, s = {}) {
    let i = new _n(s);
    return i = this.addTransfer(i, { destination: t, amount: n, assetId: r }), i = await this.estimateAndFundTransaction(i, s), i;
  }
  /**
   * Transfers coins to a destination address.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(t, n, r, s = {}) {
    const i = await this.createTransfer(t, n, r, s);
    return this.sendTransaction(i, { estimateTxDependencies: !1 });
  }
  /**
   * Transfers multiple amounts of a token to multiple recipients.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @param txParams - Optional transaction parameters.
   * @returns A promise that resolves to a `TransactionResponse` object representing the transaction result.
   */
  async batchTransfer(t, n = {}) {
    let r = new _n(n);
    return r = this.addBatchTransfer(r, t), r = await this.estimateAndFundTransaction(r, n), this.sendTransaction(r, { estimateTxDependencies: !1 });
  }
  /**
   * Adds a transfer to the given transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - The object representing the transfer to be made.
   * @returns The updated transaction request with the added transfer.
   */
  addTransfer(t, n) {
    const { destination: r, amount: s, assetId: i } = n;
    return this.validateTransferAmount(s), t.addCoinOutput(
      de.fromAddressOrString(r),
      s,
      i ?? this.provider.getBaseAssetId()
    ), t;
  }
  /**
   * Adds multiple transfers to a script transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The updated script transaction request.
   */
  addBatchTransfer(t, n) {
    const r = this.provider.getBaseAssetId();
    return n.forEach(({ destination: s, amount: i, assetId: o }) => {
      this.addTransfer(t, {
        destination: s,
        amount: i,
        assetId: o ?? r
      });
    }), t;
  }
  /**
   * Transfers coins to a contract address.
   *
   * @param contractId - The address of the contract.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async transferToContract(t, n, r, s = {}) {
    if (B(n).lte(0))
      throw new x(
        N.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = de.fromAddressOrString(t), o = r ?? this.provider.getBaseAssetId(), { script: u, scriptData: A } = await Ym({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: B(n),
      assetId: o
    });
    let h = new _n({
      ...s,
      script: u,
      scriptData: A
    });
    h.addContractInputAndOutput(i);
    const E = await this.provider.getTransactionCost(h, {
      resourcesOwner: this,
      quantitiesToContract: [{ amount: B(n), assetId: String(o) }]
    });
    return h = this.validateGasLimitAndMaxFee({
      transactionRequest: h,
      gasUsed: E.gasUsed,
      maxFee: E.maxFee,
      txParams: s
    }), await this.fund(h, E), this.sendTransaction(h);
  }
  /**
   * Withdraws an amount of the base asset to the base chain.
   *
   * @param recipient - Address of the recipient on the base chain.
   * @param amount - Amount of base asset.
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(t, n, r = {}) {
    const s = de.fromAddressOrString(t), i = z(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = z(
      "0x".concat(B(n).toHex().substring(2).padStart(16, "0"))
    ), A = { script: new Uint8Array([
      ...z(jp.bytes),
      ...i,
      ...o
    ]), ...r }, h = this.provider.getBaseAssetId();
    let E = new _n(A);
    const I = [{ amount: B(n), assetId: h }], _ = await this.provider.getTransactionCost(E, { quantitiesToContract: I });
    return E = this.validateGasLimitAndMaxFee({
      transactionRequest: E,
      gasUsed: _.gasUsed,
      maxFee: _.maxFee,
      txParams: r
    }), await this.fund(E, _), this.sendTransaction(E);
  }
  /**
   * Sign a message from the account via the connector.
   *
   * @param message - the message to sign.
   * @returns a promise that resolves to the signature.
   *
   * @hidden
   */
  async signMessage(t) {
    if (!this._connector)
      throw new x(N.MISSING_CONNECTOR, "A connector is required to sign messages.");
    return this._connector.signMessage(this.address.toString(), t);
  }
  /**
   * Signs a transaction from the account via the connector..
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature of the transaction.
   */
  async signTransaction(t) {
    if (!this._connector)
      throw new x(
        N.MISSING_CONNECTOR,
        "A connector is required to sign transactions."
      );
    return this._connector.signTransaction(this.address.toString(), t);
  }
  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @param sendTransactionParams - The provider send transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(t, { estimateTxDependencies: n = !0, awaitExecution: r } = {}) {
    if (this._connector)
      return this.provider.getTransactionResponse(
        await this._connector.sendTransaction(this.address.toString(), t)
      );
    const s = wt(t);
    return n && await this.provider.estimateTxDependencies(s), this.provider.sendTransaction(s, {
      awaitExecution: r,
      estimateTxDependencies: !1
    });
  }
  /**
   * Simulates a transaction.
   *
   * @param transactionRequestLike - The transaction request to be simulated.
   * @param estimateTxParams - The estimate transaction params (optional).
   * @returns A promise that resolves to the call result.
   */
  async simulateTransaction(t, { estimateTxDependencies: n = !0 } = {}) {
    const r = wt(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.simulate(r, { estimateTxDependencies: !1 });
  }
  /** @hidden * */
  validateTransferAmount(t) {
    if (B(t).lte(0))
      throw new x(
        N.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
  }
  /** @hidden * */
  async estimateAndFundTransaction(t, n) {
    let r = t;
    const s = await this.provider.getTransactionCost(r, {
      resourcesOwner: this
    });
    return r = this.validateGasLimitAndMaxFee({
      transactionRequest: r,
      gasUsed: s.gasUsed,
      maxFee: s.maxFee,
      txParams: n
    }), r = await this.fund(r, s), r;
  }
  /** @hidden * */
  validateGasLimitAndMaxFee({
    gasUsed: t,
    maxFee: n,
    transactionRequest: r,
    txParams: { gasLimit: s, maxFee: i }
  }) {
    const o = wt(r);
    if (!Sn(s))
      o.gasLimit = t;
    else if (t.gt(s))
      throw new x(
        N.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!Sn(i))
      o.maxFee = n;
    else if (n.gt(i))
      throw new x(
        N.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${n}'.`
      );
    return o;
  }
}, Kn = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    S(this, "address");
    S(this, "publicKey");
    S(this, "compressedPublicKey");
    S(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = Wt(e, 32);
    this.privateKey = V(t), this.publicKey = V(tn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = V(tn.getPublicKey(t, !0)), this.address = de.fromPublicKey(this.publicKey);
  }
  /**
   * Sign data using the Signer instance
   *
   * Signature is a 64 byte array of the concatenated r and s values with the compressed recoveryParam byte.
   * @ignore
   * [Read more](FuelLabs/fuel-specs/specs/protocol/cryptographic_primitives.md#public-key-cryptography)
   *
   * @param data - The data to be sign
   * @returns hashed signature
   */
  sign(e) {
    const t = tn.sign(z(e), z(this.privateKey)), n = Wt(`0x${t.r.toString(16)}`, 32), r = Wt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, V(ie([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = tn.ProjectivePoint.fromHex(z(this.compressedPublicKey)), n = tn.ProjectivePoint.fromHex(z(e));
    return `0x${t.add(n).toHex(!0)}`;
  }
  /**
   * Recover the public key from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - hashed signature
   * @returns public key from signature from the
   */
  static recoverPublicKey(e, t) {
    const n = z(t), r = n.slice(0, 32), s = n.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const u = new tn.Signature(BigInt(V(r)), BigInt(V(s))).addRecoveryBit(
      i
    ).recoverPublicKey(z(e)).toRawBytes(!1).slice(1);
    return V(u);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return de.fromPublicKey(Kn.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? Jt(ie([Ut(32), z(e)])) : Ut(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = tn.ProjectivePoint.fromHex(z(e));
    return V(t.toRawBytes(!1).slice(1));
  }
}, ja = 13, $a = 8, Ka = 1, ai = 32, Hm = 16, ec = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function Zm(e, t, n) {
  const r = dn(ec(e), "hex"), s = de.fromAddressOrString(t), i = Ut(ai), o = Hc({
    password: dn(n),
    salt: i,
    dklen: ai,
    n: 2 ** ja,
    r: $a,
    p: Ka
  }), u = Ut(Hm), A = await LA(r, o, u), h = Uint8Array.from([...o.subarray(16, 32), ...A]), E = Zc(h), I = cr(E, "hex"), _ = {
    id: ng(),
    version: 3,
    address: ec(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: I,
      cipherparams: { iv: cr(u, "hex") },
      ciphertext: cr(A, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: ai,
        n: 2 ** ja,
        p: Ka,
        r: $a,
        salt: cr(i, "hex")
      }
    }
  };
  return JSON.stringify(_);
}
async function Wm(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: u, r: A, p: h, salt: E }
    }
  } = n, I = dn(s, "hex"), _ = dn(i, "hex"), v = dn(E, "hex"), R = dn(t), C = Hc({
    password: R,
    salt: v,
    n: u,
    p: h,
    r: A,
    dklen: o
  }), F = Uint8Array.from([...C.subarray(16, 32), ...I]), M = Zc(F), G = cr(M, "hex");
  if (r !== G)
    throw new x(
      N.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const L = await OA(I, C, _);
  return V(L);
}
var Bu = class extends Qs {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new Kn(t);
    super(r.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    S(this, "signer");
    this.signer = () => r;
  }
  /**
   * Gets the private key of the wallet.
   *
   * @returns The private key of the wallet.
   */
  get privateKey() {
    return this.signer().privateKey;
  }
  /**
   * Gets the public key of the wallet.
   *
   * @returns
   */
  get publicKey() {
    return this.signer().publicKey;
  }
  /**
   * Signs a message with the wallet's private key.
   *
   * @param message - The message to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signMessage(t) {
    const n = await this.signer().sign(GA(t));
    return V(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = wt(t), r = this.provider.getChainId(), s = n.getTransactionId(r), i = await this.signer().sign(s);
    return V(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = wt(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @param estimateTxDependencies - Whether to estimate the transaction dependencies.
   * @param awaitExecution - Whether to wait for the transaction to be executed.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, { estimateTxDependencies: n = !1, awaitExecution: r } = {}) {
    const s = wt(t);
    return n && await this.provider.estimateTxDependencies(s), this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(s),
      { awaitExecution: r, estimateTxDependencies: !1 }
    );
  }
  /**
   * Populates the witness signature for a transaction and sends a call to the network using `provider.call`.
   *
   * @param transactionRequestLike - The transaction request to simulate.
   * @returns A promise that resolves to the CallResult object.
   */
  async simulateTransaction(t, { estimateTxDependencies: n = !0 } = {}) {
    const r = wt(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.call(
      await this.populateTransactionWitnessesSignature(r),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  /**
   * Encrypts an unlocked wallet with a password.
   *
   * @param password - the password to encrypt the wallet with.
   * @returns - the encrypted wallet.
   */
  async encrypt(t) {
    return Zm(this.privateKey, this.address, t);
  }
};
De(Bu, "defaultPath", "m/44'/1179993420'/0'/0/0");
var zr = [
  "abandon",
  "ability",
  "able",
  "about",
  "above",
  "absent",
  "absorb",
  "abstract",
  "absurd",
  "abuse",
  "access",
  "accident",
  "account",
  "accuse",
  "achieve",
  "acid",
  "acoustic",
  "acquire",
  "across",
  "act",
  "action",
  "actor",
  "actress",
  "actual",
  "adapt",
  "add",
  "addict",
  "address",
  "adjust",
  "admit",
  "adult",
  "advance",
  "advice",
  "aerobic",
  "affair",
  "afford",
  "afraid",
  "again",
  "age",
  "agent",
  "agree",
  "ahead",
  "aim",
  "air",
  "airport",
  "aisle",
  "alarm",
  "album",
  "alcohol",
  "alert",
  "alien",
  "all",
  "alley",
  "allow",
  "almost",
  "alone",
  "alpha",
  "already",
  "also",
  "alter",
  "always",
  "amateur",
  "amazing",
  "among",
  "amount",
  "amused",
  "analyst",
  "anchor",
  "ancient",
  "anger",
  "angle",
  "angry",
  "animal",
  "ankle",
  "announce",
  "annual",
  "another",
  "answer",
  "antenna",
  "antique",
  "anxiety",
  "any",
  "apart",
  "apology",
  "appear",
  "apple",
  "approve",
  "april",
  "arch",
  "arctic",
  "area",
  "arena",
  "argue",
  "arm",
  "armed",
  "armor",
  "army",
  "around",
  "arrange",
  "arrest",
  "arrive",
  "arrow",
  "art",
  "artefact",
  "artist",
  "artwork",
  "ask",
  "aspect",
  "assault",
  "asset",
  "assist",
  "assume",
  "asthma",
  "athlete",
  "atom",
  "attack",
  "attend",
  "attitude",
  "attract",
  "auction",
  "audit",
  "august",
  "aunt",
  "author",
  "auto",
  "autumn",
  "average",
  "avocado",
  "avoid",
  "awake",
  "aware",
  "away",
  "awesome",
  "awful",
  "awkward",
  "axis",
  "baby",
  "bachelor",
  "bacon",
  "badge",
  "bag",
  "balance",
  "balcony",
  "ball",
  "bamboo",
  "banana",
  "banner",
  "bar",
  "barely",
  "bargain",
  "barrel",
  "base",
  "basic",
  "basket",
  "battle",
  "beach",
  "bean",
  "beauty",
  "because",
  "become",
  "beef",
  "before",
  "begin",
  "behave",
  "behind",
  "believe",
  "below",
  "belt",
  "bench",
  "benefit",
  "best",
  "betray",
  "better",
  "between",
  "beyond",
  "bicycle",
  "bid",
  "bike",
  "bind",
  "biology",
  "bird",
  "birth",
  "bitter",
  "black",
  "blade",
  "blame",
  "blanket",
  "blast",
  "bleak",
  "bless",
  "blind",
  "blood",
  "blossom",
  "blouse",
  "blue",
  "blur",
  "blush",
  "board",
  "boat",
  "body",
  "boil",
  "bomb",
  "bone",
  "bonus",
  "book",
  "boost",
  "border",
  "boring",
  "borrow",
  "boss",
  "bottom",
  "bounce",
  "box",
  "boy",
  "bracket",
  "brain",
  "brand",
  "brass",
  "brave",
  "bread",
  "breeze",
  "brick",
  "bridge",
  "brief",
  "bright",
  "bring",
  "brisk",
  "broccoli",
  "broken",
  "bronze",
  "broom",
  "brother",
  "brown",
  "brush",
  "bubble",
  "buddy",
  "budget",
  "buffalo",
  "build",
  "bulb",
  "bulk",
  "bullet",
  "bundle",
  "bunker",
  "burden",
  "burger",
  "burst",
  "bus",
  "business",
  "busy",
  "butter",
  "buyer",
  "buzz",
  "cabbage",
  "cabin",
  "cable",
  "cactus",
  "cage",
  "cake",
  "call",
  "calm",
  "camera",
  "camp",
  "can",
  "canal",
  "cancel",
  "candy",
  "cannon",
  "canoe",
  "canvas",
  "canyon",
  "capable",
  "capital",
  "captain",
  "car",
  "carbon",
  "card",
  "cargo",
  "carpet",
  "carry",
  "cart",
  "case",
  "cash",
  "casino",
  "castle",
  "casual",
  "cat",
  "catalog",
  "catch",
  "category",
  "cattle",
  "caught",
  "cause",
  "caution",
  "cave",
  "ceiling",
  "celery",
  "cement",
  "census",
  "century",
  "cereal",
  "certain",
  "chair",
  "chalk",
  "champion",
  "change",
  "chaos",
  "chapter",
  "charge",
  "chase",
  "chat",
  "cheap",
  "check",
  "cheese",
  "chef",
  "cherry",
  "chest",
  "chicken",
  "chief",
  "child",
  "chimney",
  "choice",
  "choose",
  "chronic",
  "chuckle",
  "chunk",
  "churn",
  "cigar",
  "cinnamon",
  "circle",
  "citizen",
  "city",
  "civil",
  "claim",
  "clap",
  "clarify",
  "claw",
  "clay",
  "clean",
  "clerk",
  "clever",
  "click",
  "client",
  "cliff",
  "climb",
  "clinic",
  "clip",
  "clock",
  "clog",
  "close",
  "cloth",
  "cloud",
  "clown",
  "club",
  "clump",
  "cluster",
  "clutch",
  "coach",
  "coast",
  "coconut",
  "code",
  "coffee",
  "coil",
  "coin",
  "collect",
  "color",
  "column",
  "combine",
  "come",
  "comfort",
  "comic",
  "common",
  "company",
  "concert",
  "conduct",
  "confirm",
  "congress",
  "connect",
  "consider",
  "control",
  "convince",
  "cook",
  "cool",
  "copper",
  "copy",
  "coral",
  "core",
  "corn",
  "correct",
  "cost",
  "cotton",
  "couch",
  "country",
  "couple",
  "course",
  "cousin",
  "cover",
  "coyote",
  "crack",
  "cradle",
  "craft",
  "cram",
  "crane",
  "crash",
  "crater",
  "crawl",
  "crazy",
  "cream",
  "credit",
  "creek",
  "crew",
  "cricket",
  "crime",
  "crisp",
  "critic",
  "crop",
  "cross",
  "crouch",
  "crowd",
  "crucial",
  "cruel",
  "cruise",
  "crumble",
  "crunch",
  "crush",
  "cry",
  "crystal",
  "cube",
  "culture",
  "cup",
  "cupboard",
  "curious",
  "current",
  "curtain",
  "curve",
  "cushion",
  "custom",
  "cute",
  "cycle",
  "dad",
  "damage",
  "damp",
  "dance",
  "danger",
  "daring",
  "dash",
  "daughter",
  "dawn",
  "day",
  "deal",
  "debate",
  "debris",
  "decade",
  "december",
  "decide",
  "decline",
  "decorate",
  "decrease",
  "deer",
  "defense",
  "define",
  "defy",
  "degree",
  "delay",
  "deliver",
  "demand",
  "demise",
  "denial",
  "dentist",
  "deny",
  "depart",
  "depend",
  "deposit",
  "depth",
  "deputy",
  "derive",
  "describe",
  "desert",
  "design",
  "desk",
  "despair",
  "destroy",
  "detail",
  "detect",
  "develop",
  "device",
  "devote",
  "diagram",
  "dial",
  "diamond",
  "diary",
  "dice",
  "diesel",
  "diet",
  "differ",
  "digital",
  "dignity",
  "dilemma",
  "dinner",
  "dinosaur",
  "direct",
  "dirt",
  "disagree",
  "discover",
  "disease",
  "dish",
  "dismiss",
  "disorder",
  "display",
  "distance",
  "divert",
  "divide",
  "divorce",
  "dizzy",
  "doctor",
  "document",
  "dog",
  "doll",
  "dolphin",
  "domain",
  "donate",
  "donkey",
  "donor",
  "door",
  "dose",
  "double",
  "dove",
  "draft",
  "dragon",
  "drama",
  "drastic",
  "draw",
  "dream",
  "dress",
  "drift",
  "drill",
  "drink",
  "drip",
  "drive",
  "drop",
  "drum",
  "dry",
  "duck",
  "dumb",
  "dune",
  "during",
  "dust",
  "dutch",
  "duty",
  "dwarf",
  "dynamic",
  "eager",
  "eagle",
  "early",
  "earn",
  "earth",
  "easily",
  "east",
  "easy",
  "echo",
  "ecology",
  "economy",
  "edge",
  "edit",
  "educate",
  "effort",
  "egg",
  "eight",
  "either",
  "elbow",
  "elder",
  "electric",
  "elegant",
  "element",
  "elephant",
  "elevator",
  "elite",
  "else",
  "embark",
  "embody",
  "embrace",
  "emerge",
  "emotion",
  "employ",
  "empower",
  "empty",
  "enable",
  "enact",
  "end",
  "endless",
  "endorse",
  "enemy",
  "energy",
  "enforce",
  "engage",
  "engine",
  "enhance",
  "enjoy",
  "enlist",
  "enough",
  "enrich",
  "enroll",
  "ensure",
  "enter",
  "entire",
  "entry",
  "envelope",
  "episode",
  "equal",
  "equip",
  "era",
  "erase",
  "erode",
  "erosion",
  "error",
  "erupt",
  "escape",
  "essay",
  "essence",
  "estate",
  "eternal",
  "ethics",
  "evidence",
  "evil",
  "evoke",
  "evolve",
  "exact",
  "example",
  "excess",
  "exchange",
  "excite",
  "exclude",
  "excuse",
  "execute",
  "exercise",
  "exhaust",
  "exhibit",
  "exile",
  "exist",
  "exit",
  "exotic",
  "expand",
  "expect",
  "expire",
  "explain",
  "expose",
  "express",
  "extend",
  "extra",
  "eye",
  "eyebrow",
  "fabric",
  "face",
  "faculty",
  "fade",
  "faint",
  "faith",
  "fall",
  "false",
  "fame",
  "family",
  "famous",
  "fan",
  "fancy",
  "fantasy",
  "farm",
  "fashion",
  "fat",
  "fatal",
  "father",
  "fatigue",
  "fault",
  "favorite",
  "feature",
  "february",
  "federal",
  "fee",
  "feed",
  "feel",
  "female",
  "fence",
  "festival",
  "fetch",
  "fever",
  "few",
  "fiber",
  "fiction",
  "field",
  "figure",
  "file",
  "film",
  "filter",
  "final",
  "find",
  "fine",
  "finger",
  "finish",
  "fire",
  "firm",
  "first",
  "fiscal",
  "fish",
  "fit",
  "fitness",
  "fix",
  "flag",
  "flame",
  "flash",
  "flat",
  "flavor",
  "flee",
  "flight",
  "flip",
  "float",
  "flock",
  "floor",
  "flower",
  "fluid",
  "flush",
  "fly",
  "foam",
  "focus",
  "fog",
  "foil",
  "fold",
  "follow",
  "food",
  "foot",
  "force",
  "forest",
  "forget",
  "fork",
  "fortune",
  "forum",
  "forward",
  "fossil",
  "foster",
  "found",
  "fox",
  "fragile",
  "frame",
  "frequent",
  "fresh",
  "friend",
  "fringe",
  "frog",
  "front",
  "frost",
  "frown",
  "frozen",
  "fruit",
  "fuel",
  "fun",
  "funny",
  "furnace",
  "fury",
  "future",
  "gadget",
  "gain",
  "galaxy",
  "gallery",
  "game",
  "gap",
  "garage",
  "garbage",
  "garden",
  "garlic",
  "garment",
  "gas",
  "gasp",
  "gate",
  "gather",
  "gauge",
  "gaze",
  "general",
  "genius",
  "genre",
  "gentle",
  "genuine",
  "gesture",
  "ghost",
  "giant",
  "gift",
  "giggle",
  "ginger",
  "giraffe",
  "girl",
  "give",
  "glad",
  "glance",
  "glare",
  "glass",
  "glide",
  "glimpse",
  "globe",
  "gloom",
  "glory",
  "glove",
  "glow",
  "glue",
  "goat",
  "goddess",
  "gold",
  "good",
  "goose",
  "gorilla",
  "gospel",
  "gossip",
  "govern",
  "gown",
  "grab",
  "grace",
  "grain",
  "grant",
  "grape",
  "grass",
  "gravity",
  "great",
  "green",
  "grid",
  "grief",
  "grit",
  "grocery",
  "group",
  "grow",
  "grunt",
  "guard",
  "guess",
  "guide",
  "guilt",
  "guitar",
  "gun",
  "gym",
  "habit",
  "hair",
  "half",
  "hammer",
  "hamster",
  "hand",
  "happy",
  "harbor",
  "hard",
  "harsh",
  "harvest",
  "hat",
  "have",
  "hawk",
  "hazard",
  "head",
  "health",
  "heart",
  "heavy",
  "hedgehog",
  "height",
  "hello",
  "helmet",
  "help",
  "hen",
  "hero",
  "hidden",
  "high",
  "hill",
  "hint",
  "hip",
  "hire",
  "history",
  "hobby",
  "hockey",
  "hold",
  "hole",
  "holiday",
  "hollow",
  "home",
  "honey",
  "hood",
  "hope",
  "horn",
  "horror",
  "horse",
  "hospital",
  "host",
  "hotel",
  "hour",
  "hover",
  "hub",
  "huge",
  "human",
  "humble",
  "humor",
  "hundred",
  "hungry",
  "hunt",
  "hurdle",
  "hurry",
  "hurt",
  "husband",
  "hybrid",
  "ice",
  "icon",
  "idea",
  "identify",
  "idle",
  "ignore",
  "ill",
  "illegal",
  "illness",
  "image",
  "imitate",
  "immense",
  "immune",
  "impact",
  "impose",
  "improve",
  "impulse",
  "inch",
  "include",
  "income",
  "increase",
  "index",
  "indicate",
  "indoor",
  "industry",
  "infant",
  "inflict",
  "inform",
  "inhale",
  "inherit",
  "initial",
  "inject",
  "injury",
  "inmate",
  "inner",
  "innocent",
  "input",
  "inquiry",
  "insane",
  "insect",
  "inside",
  "inspire",
  "install",
  "intact",
  "interest",
  "into",
  "invest",
  "invite",
  "involve",
  "iron",
  "island",
  "isolate",
  "issue",
  "item",
  "ivory",
  "jacket",
  "jaguar",
  "jar",
  "jazz",
  "jealous",
  "jeans",
  "jelly",
  "jewel",
  "job",
  "join",
  "joke",
  "journey",
  "joy",
  "judge",
  "juice",
  "jump",
  "jungle",
  "junior",
  "junk",
  "just",
  "kangaroo",
  "keen",
  "keep",
  "ketchup",
  "key",
  "kick",
  "kid",
  "kidney",
  "kind",
  "kingdom",
  "kiss",
  "kit",
  "kitchen",
  "kite",
  "kitten",
  "kiwi",
  "knee",
  "knife",
  "knock",
  "know",
  "lab",
  "label",
  "labor",
  "ladder",
  "lady",
  "lake",
  "lamp",
  "language",
  "laptop",
  "large",
  "later",
  "latin",
  "laugh",
  "laundry",
  "lava",
  "law",
  "lawn",
  "lawsuit",
  "layer",
  "lazy",
  "leader",
  "leaf",
  "learn",
  "leave",
  "lecture",
  "left",
  "leg",
  "legal",
  "legend",
  "leisure",
  "lemon",
  "lend",
  "length",
  "lens",
  "leopard",
  "lesson",
  "letter",
  "level",
  "liar",
  "liberty",
  "library",
  "license",
  "life",
  "lift",
  "light",
  "like",
  "limb",
  "limit",
  "link",
  "lion",
  "liquid",
  "list",
  "little",
  "live",
  "lizard",
  "load",
  "loan",
  "lobster",
  "local",
  "lock",
  "logic",
  "lonely",
  "long",
  "loop",
  "lottery",
  "loud",
  "lounge",
  "love",
  "loyal",
  "lucky",
  "luggage",
  "lumber",
  "lunar",
  "lunch",
  "luxury",
  "lyrics",
  "machine",
  "mad",
  "magic",
  "magnet",
  "maid",
  "mail",
  "main",
  "major",
  "make",
  "mammal",
  "man",
  "manage",
  "mandate",
  "mango",
  "mansion",
  "manual",
  "maple",
  "marble",
  "march",
  "margin",
  "marine",
  "market",
  "marriage",
  "mask",
  "mass",
  "master",
  "match",
  "material",
  "math",
  "matrix",
  "matter",
  "maximum",
  "maze",
  "meadow",
  "mean",
  "measure",
  "meat",
  "mechanic",
  "medal",
  "media",
  "melody",
  "melt",
  "member",
  "memory",
  "mention",
  "menu",
  "mercy",
  "merge",
  "merit",
  "merry",
  "mesh",
  "message",
  "metal",
  "method",
  "middle",
  "midnight",
  "milk",
  "million",
  "mimic",
  "mind",
  "minimum",
  "minor",
  "minute",
  "miracle",
  "mirror",
  "misery",
  "miss",
  "mistake",
  "mix",
  "mixed",
  "mixture",
  "mobile",
  "model",
  "modify",
  "mom",
  "moment",
  "monitor",
  "monkey",
  "monster",
  "month",
  "moon",
  "moral",
  "more",
  "morning",
  "mosquito",
  "mother",
  "motion",
  "motor",
  "mountain",
  "mouse",
  "move",
  "movie",
  "much",
  "muffin",
  "mule",
  "multiply",
  "muscle",
  "museum",
  "mushroom",
  "music",
  "must",
  "mutual",
  "myself",
  "mystery",
  "myth",
  "naive",
  "name",
  "napkin",
  "narrow",
  "nasty",
  "nation",
  "nature",
  "near",
  "neck",
  "need",
  "negative",
  "neglect",
  "neither",
  "nephew",
  "nerve",
  "nest",
  "net",
  "network",
  "neutral",
  "never",
  "news",
  "next",
  "nice",
  "night",
  "noble",
  "noise",
  "nominee",
  "noodle",
  "normal",
  "north",
  "nose",
  "notable",
  "note",
  "nothing",
  "notice",
  "novel",
  "now",
  "nuclear",
  "number",
  "nurse",
  "nut",
  "oak",
  "obey",
  "object",
  "oblige",
  "obscure",
  "observe",
  "obtain",
  "obvious",
  "occur",
  "ocean",
  "october",
  "odor",
  "off",
  "offer",
  "office",
  "often",
  "oil",
  "okay",
  "old",
  "olive",
  "olympic",
  "omit",
  "once",
  "one",
  "onion",
  "online",
  "only",
  "open",
  "opera",
  "opinion",
  "oppose",
  "option",
  "orange",
  "orbit",
  "orchard",
  "order",
  "ordinary",
  "organ",
  "orient",
  "original",
  "orphan",
  "ostrich",
  "other",
  "outdoor",
  "outer",
  "output",
  "outside",
  "oval",
  "oven",
  "over",
  "own",
  "owner",
  "oxygen",
  "oyster",
  "ozone",
  "pact",
  "paddle",
  "page",
  "pair",
  "palace",
  "palm",
  "panda",
  "panel",
  "panic",
  "panther",
  "paper",
  "parade",
  "parent",
  "park",
  "parrot",
  "party",
  "pass",
  "patch",
  "path",
  "patient",
  "patrol",
  "pattern",
  "pause",
  "pave",
  "payment",
  "peace",
  "peanut",
  "pear",
  "peasant",
  "pelican",
  "pen",
  "penalty",
  "pencil",
  "people",
  "pepper",
  "perfect",
  "permit",
  "person",
  "pet",
  "phone",
  "photo",
  "phrase",
  "physical",
  "piano",
  "picnic",
  "picture",
  "piece",
  "pig",
  "pigeon",
  "pill",
  "pilot",
  "pink",
  "pioneer",
  "pipe",
  "pistol",
  "pitch",
  "pizza",
  "place",
  "planet",
  "plastic",
  "plate",
  "play",
  "please",
  "pledge",
  "pluck",
  "plug",
  "plunge",
  "poem",
  "poet",
  "point",
  "polar",
  "pole",
  "police",
  "pond",
  "pony",
  "pool",
  "popular",
  "portion",
  "position",
  "possible",
  "post",
  "potato",
  "pottery",
  "poverty",
  "powder",
  "power",
  "practice",
  "praise",
  "predict",
  "prefer",
  "prepare",
  "present",
  "pretty",
  "prevent",
  "price",
  "pride",
  "primary",
  "print",
  "priority",
  "prison",
  "private",
  "prize",
  "problem",
  "process",
  "produce",
  "profit",
  "program",
  "project",
  "promote",
  "proof",
  "property",
  "prosper",
  "protect",
  "proud",
  "provide",
  "public",
  "pudding",
  "pull",
  "pulp",
  "pulse",
  "pumpkin",
  "punch",
  "pupil",
  "puppy",
  "purchase",
  "purity",
  "purpose",
  "purse",
  "push",
  "put",
  "puzzle",
  "pyramid",
  "quality",
  "quantum",
  "quarter",
  "question",
  "quick",
  "quit",
  "quiz",
  "quote",
  "rabbit",
  "raccoon",
  "race",
  "rack",
  "radar",
  "radio",
  "rail",
  "rain",
  "raise",
  "rally",
  "ramp",
  "ranch",
  "random",
  "range",
  "rapid",
  "rare",
  "rate",
  "rather",
  "raven",
  "raw",
  "razor",
  "ready",
  "real",
  "reason",
  "rebel",
  "rebuild",
  "recall",
  "receive",
  "recipe",
  "record",
  "recycle",
  "reduce",
  "reflect",
  "reform",
  "refuse",
  "region",
  "regret",
  "regular",
  "reject",
  "relax",
  "release",
  "relief",
  "rely",
  "remain",
  "remember",
  "remind",
  "remove",
  "render",
  "renew",
  "rent",
  "reopen",
  "repair",
  "repeat",
  "replace",
  "report",
  "require",
  "rescue",
  "resemble",
  "resist",
  "resource",
  "response",
  "result",
  "retire",
  "retreat",
  "return",
  "reunion",
  "reveal",
  "review",
  "reward",
  "rhythm",
  "rib",
  "ribbon",
  "rice",
  "rich",
  "ride",
  "ridge",
  "rifle",
  "right",
  "rigid",
  "ring",
  "riot",
  "ripple",
  "risk",
  "ritual",
  "rival",
  "river",
  "road",
  "roast",
  "robot",
  "robust",
  "rocket",
  "romance",
  "roof",
  "rookie",
  "room",
  "rose",
  "rotate",
  "rough",
  "round",
  "route",
  "royal",
  "rubber",
  "rude",
  "rug",
  "rule",
  "run",
  "runway",
  "rural",
  "sad",
  "saddle",
  "sadness",
  "safe",
  "sail",
  "salad",
  "salmon",
  "salon",
  "salt",
  "salute",
  "same",
  "sample",
  "sand",
  "satisfy",
  "satoshi",
  "sauce",
  "sausage",
  "save",
  "say",
  "scale",
  "scan",
  "scare",
  "scatter",
  "scene",
  "scheme",
  "school",
  "science",
  "scissors",
  "scorpion",
  "scout",
  "scrap",
  "screen",
  "script",
  "scrub",
  "sea",
  "search",
  "season",
  "seat",
  "second",
  "secret",
  "section",
  "security",
  "seed",
  "seek",
  "segment",
  "select",
  "sell",
  "seminar",
  "senior",
  "sense",
  "sentence",
  "series",
  "service",
  "session",
  "settle",
  "setup",
  "seven",
  "shadow",
  "shaft",
  "shallow",
  "share",
  "shed",
  "shell",
  "sheriff",
  "shield",
  "shift",
  "shine",
  "ship",
  "shiver",
  "shock",
  "shoe",
  "shoot",
  "shop",
  "short",
  "shoulder",
  "shove",
  "shrimp",
  "shrug",
  "shuffle",
  "shy",
  "sibling",
  "sick",
  "side",
  "siege",
  "sight",
  "sign",
  "silent",
  "silk",
  "silly",
  "silver",
  "similar",
  "simple",
  "since",
  "sing",
  "siren",
  "sister",
  "situate",
  "six",
  "size",
  "skate",
  "sketch",
  "ski",
  "skill",
  "skin",
  "skirt",
  "skull",
  "slab",
  "slam",
  "sleep",
  "slender",
  "slice",
  "slide",
  "slight",
  "slim",
  "slogan",
  "slot",
  "slow",
  "slush",
  "small",
  "smart",
  "smile",
  "smoke",
  "smooth",
  "snack",
  "snake",
  "snap",
  "sniff",
  "snow",
  "soap",
  "soccer",
  "social",
  "sock",
  "soda",
  "soft",
  "solar",
  "soldier",
  "solid",
  "solution",
  "solve",
  "someone",
  "song",
  "soon",
  "sorry",
  "sort",
  "soul",
  "sound",
  "soup",
  "source",
  "south",
  "space",
  "spare",
  "spatial",
  "spawn",
  "speak",
  "special",
  "speed",
  "spell",
  "spend",
  "sphere",
  "spice",
  "spider",
  "spike",
  "spin",
  "spirit",
  "split",
  "spoil",
  "sponsor",
  "spoon",
  "sport",
  "spot",
  "spray",
  "spread",
  "spring",
  "spy",
  "square",
  "squeeze",
  "squirrel",
  "stable",
  "stadium",
  "staff",
  "stage",
  "stairs",
  "stamp",
  "stand",
  "start",
  "state",
  "stay",
  "steak",
  "steel",
  "stem",
  "step",
  "stereo",
  "stick",
  "still",
  "sting",
  "stock",
  "stomach",
  "stone",
  "stool",
  "story",
  "stove",
  "strategy",
  "street",
  "strike",
  "strong",
  "struggle",
  "student",
  "stuff",
  "stumble",
  "style",
  "subject",
  "submit",
  "subway",
  "success",
  "such",
  "sudden",
  "suffer",
  "sugar",
  "suggest",
  "suit",
  "summer",
  "sun",
  "sunny",
  "sunset",
  "super",
  "supply",
  "supreme",
  "sure",
  "surface",
  "surge",
  "surprise",
  "surround",
  "survey",
  "suspect",
  "sustain",
  "swallow",
  "swamp",
  "swap",
  "swarm",
  "swear",
  "sweet",
  "swift",
  "swim",
  "swing",
  "switch",
  "sword",
  "symbol",
  "symptom",
  "syrup",
  "system",
  "table",
  "tackle",
  "tag",
  "tail",
  "talent",
  "talk",
  "tank",
  "tape",
  "target",
  "task",
  "taste",
  "tattoo",
  "taxi",
  "teach",
  "team",
  "tell",
  "ten",
  "tenant",
  "tennis",
  "tent",
  "term",
  "test",
  "text",
  "thank",
  "that",
  "theme",
  "then",
  "theory",
  "there",
  "they",
  "thing",
  "this",
  "thought",
  "three",
  "thrive",
  "throw",
  "thumb",
  "thunder",
  "ticket",
  "tide",
  "tiger",
  "tilt",
  "timber",
  "time",
  "tiny",
  "tip",
  "tired",
  "tissue",
  "title",
  "toast",
  "tobacco",
  "today",
  "toddler",
  "toe",
  "together",
  "toilet",
  "token",
  "tomato",
  "tomorrow",
  "tone",
  "tongue",
  "tonight",
  "tool",
  "tooth",
  "top",
  "topic",
  "topple",
  "torch",
  "tornado",
  "tortoise",
  "toss",
  "total",
  "tourist",
  "toward",
  "tower",
  "town",
  "toy",
  "track",
  "trade",
  "traffic",
  "tragic",
  "train",
  "transfer",
  "trap",
  "trash",
  "travel",
  "tray",
  "treat",
  "tree",
  "trend",
  "trial",
  "tribe",
  "trick",
  "trigger",
  "trim",
  "trip",
  "trophy",
  "trouble",
  "truck",
  "true",
  "truly",
  "trumpet",
  "trust",
  "truth",
  "try",
  "tube",
  "tuition",
  "tumble",
  "tuna",
  "tunnel",
  "turkey",
  "turn",
  "turtle",
  "twelve",
  "twenty",
  "twice",
  "twin",
  "twist",
  "two",
  "type",
  "typical",
  "ugly",
  "umbrella",
  "unable",
  "unaware",
  "uncle",
  "uncover",
  "under",
  "undo",
  "unfair",
  "unfold",
  "unhappy",
  "uniform",
  "unique",
  "unit",
  "universe",
  "unknown",
  "unlock",
  "until",
  "unusual",
  "unveil",
  "update",
  "upgrade",
  "uphold",
  "upon",
  "upper",
  "upset",
  "urban",
  "urge",
  "usage",
  "use",
  "used",
  "useful",
  "useless",
  "usual",
  "utility",
  "vacant",
  "vacuum",
  "vague",
  "valid",
  "valley",
  "valve",
  "van",
  "vanish",
  "vapor",
  "various",
  "vast",
  "vault",
  "vehicle",
  "velvet",
  "vendor",
  "venture",
  "venue",
  "verb",
  "verify",
  "version",
  "very",
  "vessel",
  "veteran",
  "viable",
  "vibrant",
  "vicious",
  "victory",
  "video",
  "view",
  "village",
  "vintage",
  "violin",
  "virtual",
  "virus",
  "visa",
  "visit",
  "visual",
  "vital",
  "vivid",
  "vocal",
  "voice",
  "void",
  "volcano",
  "volume",
  "vote",
  "voyage",
  "wage",
  "wagon",
  "wait",
  "walk",
  "wall",
  "walnut",
  "want",
  "warfare",
  "warm",
  "warrior",
  "wash",
  "wasp",
  "waste",
  "water",
  "wave",
  "way",
  "wealth",
  "weapon",
  "wear",
  "weasel",
  "weather",
  "web",
  "wedding",
  "weekend",
  "weird",
  "welcome",
  "west",
  "wet",
  "whale",
  "what",
  "wheat",
  "wheel",
  "when",
  "where",
  "whip",
  "whisper",
  "wide",
  "width",
  "wife",
  "wild",
  "will",
  "win",
  "window",
  "wine",
  "wing",
  "wink",
  "winner",
  "winter",
  "wire",
  "wisdom",
  "wise",
  "wish",
  "witness",
  "wolf",
  "woman",
  "wonder",
  "wood",
  "wool",
  "word",
  "work",
  "world",
  "worry",
  "worth",
  "wrap",
  "wreck",
  "wrestle",
  "wrist",
  "write",
  "wrong",
  "yard",
  "year",
  "yellow",
  "you",
  "young",
  "youth",
  "zebra",
  "zero",
  "zone",
  "zoo"
], Jm = /* @__PURE__ */ ((e) => (e.english = "english", e))(Jm || {});
function qm(e) {
  return (1 << e) - 1;
}
function _u(e) {
  return (1 << e) - 1 << 8 - e;
}
function ci(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function jm(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function $m(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & qm(8 - n)), n += 3);
  const r = e.length / 4, s = z(mt(e))[0] & _u(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function Km(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = z(new Uint8Array(n));
  let s = 0;
  for (let h = 0; h < e.length; h += 1) {
    const E = t.indexOf(e[h].normalize("NFKD"));
    if (E === -1)
      throw new x(
        N.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[h]}' is not found in the provided wordlist.`
      );
    for (let I = 0; I < 11; I += 1)
      E & 1 << 10 - I && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, u = _u(o);
  if ((z(mt(r.slice(0, i / 8)))[0] & u) !== (r[r.length - 1] & u))
    throw new x(
      N.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var ew = zn("Bitcoin seed"), tw = "0x0488ade4", nw = "0x04358394", tc = [12, 15, 18, 21, 24];
function nc(e) {
  if (e.length !== 2048)
    throw new x(
      N.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function rw(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new x(
      N.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function ui(e) {
  if (!tc.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${tc.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new x(N.INVALID_MNEMONIC, t);
  }
}
var nn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = zr) {
    S(this, "wordlist");
    this.wordlist = e, nc(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return nn.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return nn.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = zr) {
    const n = ci(e);
    return ui(n), V(Km(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = zr) {
    const n = z(e);
    return nc(t), rw(n), $m(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    ui(ci(e));
    const n = zn(jm(e)), r = zn(`mnemonic${t}`);
    return kA(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const n = nn.mnemonicToSeed(e, t);
    return nn.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = ci(e);
    let n = 0;
    try {
      ui(t);
    } catch {
      return !1;
    }
    for (; n < t.length; ) {
      if (nn.binarySearch(t[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = zr;
    let n = 0, r = t.length - 1;
    for (; n <= r; ) {
      const s = Math.floor((n + r) / 2);
      if (t[s] === e)
        return !0;
      e < t[s] ? r = s - 1 : n = s + 1;
    }
    return !1;
  }
  /**
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, the default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static masterKeysFromSeed(e) {
    const t = z(e);
    if (t.length < 16 || t.length > 64)
      throw new x(
        N.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return z(Wc("sha512", ew, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = nn.masterKeysFromSeed(e), r = z(t ? nw : tw), s = "0x00", i = "0x00000000", o = "0x00000000", u = n.slice(32), A = n.slice(0, 32), h = ie([
      r,
      s,
      i,
      o,
      u,
      ie(["0x00", A])
    ]), E = Yi(mt(mt(h)), 0, 4);
    return bc(ie([h, E]));
  }
  /**
   *  Create a new mnemonic using a randomly generated number as entropy.
   *  As defined in BIP39, the entropy must be a multiple of 32 bits, and its size must be between 128 and 256 bits.
   *  Therefore, the possible values for `strength` are 128, 160, 192, 224, and 256.
   *  If not provided, the default entropy length will be set to 256 bits.
   *  The return is a list of words that encodes the generated entropy.
   *
   *
   * @param size - Number of bytes used as an entropy
   * @param extraEntropy - Optional extra entropy to increase randomness
   * @returns A randomly generated mnemonic
   */
  static generate(e = 32, t = "") {
    const n = t ? mt(ie([Ut(e), z(t)])) : Ut(e);
    return nn.entropyToMnemonic(n);
  }
}, vo = nn, vu = 2147483648, xu = V("0x0488ade4"), xo = V("0x0488b21e"), Ru = V("0x04358394"), Ro = V("0x043587cf");
function rc(e) {
  return bc(ie([e, Yi(mt(mt(e)), 0, 4)]));
}
function sw(e = !1, t = !1) {
  return e ? t ? Ro : xo : t ? Ru : xu;
}
function iw(e) {
  return [xo, Ro].includes(V(e.slice(0, 4)));
}
function ow(e) {
  return [xu, Ru, xo, Ro].includes(
    V(e.slice(0, 4))
  );
}
function aw(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new x(N.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + vu : parseInt(r, 10)
  );
}
var Fn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    S(this, "depth", 0);
    S(this, "index", 0);
    S(this, "fingerprint", V("0x00000000"));
    S(this, "parentFingerprint", V("0x00000000"));
    S(this, "privateKey");
    S(this, "publicKey");
    S(this, "chainCode");
    if (e.privateKey) {
      const t = new Kn(e.privateKey);
      this.publicKey = V(t.compressedPublicKey), this.privateKey = V(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new x(
          N.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = V(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = Yi(PA(mt(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
  }
  get extendedKey() {
    return this.toExtendedKey();
  }
  /**
   * Derive the current HDWallet instance navigating only on the index.
   * `Ex.: m/44'/0 -> Ex.: m/44'/1 -> m/44'/2`. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
   *
   * @param index - Index of the child HDWallet.
   * @returns A new instance of HDWallet on the derived index
   */
  deriveIndex(e) {
    const t = this.privateKey && z(this.privateKey), n = z(this.publicKey), r = z(this.chainCode), s = new Uint8Array(37);
    if (e & vu) {
      if (!t)
        throw new x(
          N.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(z(this.publicKey));
    s.set(Wt(e, 4), 33);
    const i = z(Wc("sha512", r, s)), o = i.slice(0, 32), u = i.slice(32);
    if (t) {
      const I = B(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new Fn({
        privateKey: I,
        chainCode: u,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const h = new Kn(V(o)).addPoint(n);
    return new Fn({
      publicKey: h,
      chainCode: u,
      index: e,
      depth: this.depth + 1,
      parentFingerprint: this.fingerprint
    });
  }
  /**
   * Derive the current HDWallet instance to the path. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
   *
   * @param path - The string representation of the child HDWallet. `Ex.: m/44'/0'/0'/0/0`
   * @returns A new instance of HDWallet on the derived path
   */
  derivePath(e) {
    return aw(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param isPublic - enable to export public extendedKey, it not required when HDWallet didn't have the privateKey.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  toExtendedKey(e = !1, t = !1) {
    if (this.depth >= 256)
      throw new x(
        N.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = sw(this.privateKey == null || e, t), r = V(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = Xi(this.index, 4), o = this.chainCode, u = this.privateKey != null && !e ? ie(["0x00", this.privateKey]) : this.publicKey, A = z(ie([n, r, s, i, o, u]));
    return rc(A);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = vo.masterKeysFromSeed(e);
    return new Fn({
      chainCode: z(t.slice(32)),
      privateKey: z(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = V(Wt(Cd(e))), n = z(t), r = rc(n.slice(0, 78)) === e;
    if (n.length !== 82 || !ow(n))
      throw new x(N.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new x(N.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = V(n.slice(5, 9)), o = parseInt(V(n.slice(9, 13)).substring(2), 16), u = V(n.slice(13, 45)), A = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new x(
        N.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (iw(n)) {
      if (A[0] !== 3)
        throw new x(N.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Fn({
        publicKey: A,
        chainCode: u,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (A[0] !== 0)
      throw new x(N.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Fn({
      privateKey: A.slice(1),
      chainCode: u,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, di = Fn, Su = class extends Qs {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Et(e, this._provider);
  }
}, Et = class extends Bu {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new Kn("0x00"), new Su(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = Kn.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new Et(t, e == null ? void 0 : e.provider);
  }
  /**
   * Create a Wallet Unlocked from a seed.
   *
   * @param seed - The seed phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromSeed(e, t, n) {
    const s = di.fromSeed(e).derivePath(t || Et.defaultPath);
    return new Et(s.privateKey, n);
  }
  /**
   * Create a Wallet Unlocked from a mnemonic phrase.
   *
   * @param mnemonic - The mnemonic phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @param passphrase - The passphrase for the mnemonic (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromMnemonic(e, t, n, r) {
    const s = vo.mnemonicToSeed(e, n), o = di.fromSeed(s).derivePath(t || Et.defaultPath);
    return new Et(o.privateKey, r);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const n = di.fromExtendedKey(e);
    return new Et(n.privateKey, t);
  }
  /**
   * Create a Wallet Unlocked from an encrypted JSON.
   *
   * @param jsonWallet - The encrypted JSON keystore.
   * @param password - The password to decrypt the JSON.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static async fromEncryptedJson(e, t, n) {
    const r = await Wm(e, t);
    return new Et(r, n);
  }
}, Ct = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new Su(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Et(e, t);
  }
};
De(Ct, "generate", Et.generate);
De(Ct, "fromSeed", Et.fromSeed);
De(Ct, "fromMnemonic", Et.fromMnemonic);
De(Ct, "fromExtendedKey", Et.fromExtendedKey);
De(Ct, "fromEncryptedJson", Et.fromEncryptedJson);
var cw = class {
  constructor() {
    S(this, "storage", /* @__PURE__ */ new Map());
  }
  async getItem(e) {
    return await this.storage.get(e);
  }
  async setItem(e, t) {
    await this.storage.set(e, t);
  }
  async removeItem(e) {
    await this.storage.delete(e);
  }
  async clear() {
    await this.storage.clear();
  }
}, En, Qu = class {
  constructor(e) {
    an(this, En, void 0), De(this, "pathKey", "{}"), De(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), De(this, "numberOfAccounts", 0), Dt(this, En, e.secret || vo.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Re(this, En),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = Ct.fromMnemonic(Re(this, En), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Ct.fromMnemonic(Re(this, En), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = de.fromAddressOrString(e);
    do {
      const r = Ct.fromMnemonic(Re(this, En), this.getDerivePath(t));
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new x(
      N.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Ct.fromPrivateKey(t);
  }
};
En = /* @__PURE__ */ new WeakMap();
De(Qu, "type", "mnemonic");
var rn, Nu = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    an(this, rn, []), e.secret ? Dt(this, rn, [e.secret]) : Dt(this, rn, e.accounts || [Ct.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Re(this, rn)
    };
  }
  getPublicAccount(e) {
    const t = Ct.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return Re(this, rn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Ct.generate();
    return Re(this, rn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = de.fromAddressOrString(e), n = Re(this, rn).find(
      (r) => Ct.fromPrivateKey(r).address.equals(t)
    );
    if (!n)
      throw new x(
        N.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return n;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Ct.fromPrivateKey(t);
  }
};
rn = /* @__PURE__ */ new WeakMap();
De(Nu, "type", "privateKey");
var Yt = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function Vt(e, t) {
  if (!e)
    throw new x(N.WALLET_MANAGER_ERROR, t);
}
var yt, bn, Lt, Oi, Du, Li, Tu, Fu = class extends nu.EventEmitter {
  constructor(e) {
    super(), an(this, Oi), an(this, Li), De(this, "storage", new cw()), De(this, "STORAGE_KEY", "WalletManager"), an(this, yt, []), an(this, bn, ""), an(this, Lt, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Re(this, Lt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    Vt(!Re(this, Lt), Yt.wallet_not_unlocked);
    const t = Re(this, yt).find((n, r) => r === e);
    return Vt(t, Yt.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Re(this, yt).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Re(this, yt).flatMap(
      (e, t) => e.vault.getAccounts().map((n) => ({ ...n, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = de.fromAddressOrString(e), n = Re(this, yt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return Vt(n, Yt.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = de.fromAddressOrString(e);
    Vt(!Re(this, Lt), Yt.wallet_not_unlocked);
    const n = Re(this, yt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return Vt(n, Yt.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Re(this, yt)[(e == null ? void 0 : e.vaultId) || 0];
    await Vt(t, Yt.vault_not_found);
    const n = t.vault.addAccount();
    return await this.saveState(), n;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Re(this, yt).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), n = new t(e);
    Dt(this, yt, Re(this, yt).concat({
      title: e.title,
      type: e.type,
      vault: n
    })), await this.saveState();
  }
  /**
   * Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
   * secrets.
   */
  lock() {
    Dt(this, Lt, !0), Dt(this, yt, []), Dt(this, bn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Dt(this, bn, e), Dt(this, Lt, !1);
    try {
      await this.loadState(), this.emit("unlock");
    } catch (t) {
      throw await this.lock(), t;
    }
  }
  /**
   * Update WalletManager encryption passphrase
   */
  async updatePassphrase(e, t) {
    const n = Re(this, Lt);
    await this.unlock(e), Dt(this, bn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await Vt(!Re(this, Lt), Yt.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await FA(Re(this, bn), JSON.parse(e));
      Dt(this, yt, Qi(this, Li, Tu).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await Vt(!Re(this, Lt), Yt.wallet_not_unlocked);
    const e = await MA(Re(this, bn), {
      vaults: Qi(this, Oi, Du).call(this, Re(this, yt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = Fu.Vaults.find((n) => n.type === e);
    return Vt(t, Yt.invalid_vault_type), t;
  }
}, uw = Fu;
yt = /* @__PURE__ */ new WeakMap();
bn = /* @__PURE__ */ new WeakMap();
Lt = /* @__PURE__ */ new WeakMap();
Oi = /* @__PURE__ */ new WeakSet();
Du = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
Li = /* @__PURE__ */ new WeakSet();
Tu = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
De(uw, "Vaults", [Qu, Nu]);
var dw = class {
  constructor(e) {
    throw new x(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new x(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new x(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new x(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new x(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new x(N.NOT_IMPLEMENTED, "Not implemented.");
  }
};
De(dw, "type");
var _y = class {
}, Aw = (e) => {
  const n = z(e), r = wc(n, 16384), s = ru(r.map((o) => V(o)));
  return Jt(ie(["0x4655454C", s]));
}, sc = class extends Qs {
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytecode - The bytecode of the predicate.
   * @param abi - The JSON ABI of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param inputData - The predicate input data (optional).
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor({
    bytecode: t,
    abi: n,
    provider: r,
    inputData: s,
    configurableConstants: i
  }) {
    const { predicateBytes: o, predicateInterface: u } = sc.processPredicateData(
      t,
      n,
      i
    ), A = de.fromB256(Aw(o));
    super(A, r);
    S(this, "bytes");
    S(this, "predicateData", []);
    S(this, "interface");
    this.bytes = o, this.interface = u, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    const n = wt(t), r = this.getIndexFromPlaceholderWitness(n);
    return r !== -1 && n.removeWitness(r), n.inputs.filter(ln).forEach((s) => {
      Ti(s, this.address) && (s.predicate = V(this.bytes), s.predicateData = V(this.getPredicateData()), s.witnessIndex = 0);
    }), n;
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(t) {
    const n = wt(t);
    return super.sendTransaction(n, { estimateTxDependencies: !1 });
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(t) {
    const n = wt(t);
    return super.simulateTransaction(n, { estimateTxDependencies: !1 });
  }
  getPredicateData() {
    var n;
    if (!this.predicateData.length)
      return new Uint8Array();
    const t = (n = this.interface) == null ? void 0 : n.functions.main;
    return (t == null ? void 0 : t.encodeArguments(this.predicateData)) || new Uint8Array();
  }
  /**
   * Processes the predicate data and returns the altered bytecode and interface.
   *
   * @param bytes - The bytes of the predicate.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   * @returns An object containing the new predicate bytes and interface.
   */
  static processPredicateData(t, n, r) {
    let s = z(t), i;
    if (n && (i = new qt(n), i.functions.main === void 0))
      throw new x(
        N.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = sc.setConfigurableConstants(
      s,
      r,
      i
    )), {
      predicateBytes: s,
      predicateInterface: i
    };
  }
  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - IDs of coins to exclude.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(t, n) {
    return (await this.provider.getResourcesToSpend(
      this.address,
      t,
      n
    )).map((s) => ({
      ...s,
      predicate: V(this.bytes),
      predicateData: V(this.getPredicateData())
    }));
  }
  /**
   * Sets the configurable constants for the predicate.
   *
   * @param bytes - The bytes of the predicate.
   * @param configurableConstants - Configurable constants to be set.
   * @param abiInterface - The ABI interface of the predicate.
   * @returns The mutated bytes with the configurable constants set.
   */
  static setConfigurableConstants(t, n, r) {
    const s = t;
    try {
      if (!r)
        throw new Error(
          "Cannot validate configurable constants because the Predicate was instantiated without a JSON ABI"
        );
      if (Object.keys(r.configurables).length === 0)
        throw new Error("Predicate has no configurable constants to be set");
      Object.entries(n).forEach(([i, o]) => {
        if (!(r != null && r.configurables[i]))
          throw new Error(`No configurable constant named '${i}' found in the Predicate`);
        const { offset: u } = r.configurables[i], A = r.encodeConfigurable(i, o);
        s.set(A, u);
      });
    } catch (i) {
      throw new x(
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
  /**
   * Returns the index of the witness placeholder that was added to this predicate.
   * If no witness placeholder was added, it returns -1.
   * @param request - The transaction request.
   * @returns The index of the witness placeholder, or -1 if there is no witness placeholder.
   */
  getIndexFromPlaceholderWitness(t) {
    var i;
    const n = t.inputs.filter(ln).filter((o) => Ti(o, this.address));
    let r = -1;
    const s = n.find((o) => !o.predicate);
    return s && (r = s.witnessIndex, n.every((u) => !u.predicate) || (i = n[0]) != null && i.predicate && (r = -1)), r;
  }
}, Mu = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(Mu || {}), So = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(So || {}), Ou = "FuelConnector", lw = class {
  constructor(e) {
    S(this, "storage");
    this.storage = e;
  }
  async setItem(e, t) {
    this.storage.setItem(e, t);
  }
  async getItem(e) {
    return this.storage.getItem(e);
  }
  async removeItem(e) {
    this.storage.removeItem(e);
  }
  async clear() {
    this.storage.clear();
  }
}, fw = class extends nu.EventEmitter {
  constructor() {
    super(...arguments);
    S(this, "name", "");
    S(this, "metadata", {});
    S(this, "connected", !1);
    S(this, "installed", !1);
    S(this, "events", So);
  }
  /**
   * Should return true if the connector is loaded
   * in less then one second.
   *
   * @returns Always true.
   */
  async ping() {
    throw new Error("Method not implemented.");
  }
  /**
   * Should return the current version of the connector
   * and the network version that is compatible.
   *
   * @returns boolean - connection status.
   */
  async version() {
    throw new Error("Method not implemented.");
  }
  /**
   * Should return true if the connector is connected
   * to any of the accounts available.
   *
   * @returns The connection status.
   */
  async isConnected() {
    throw new Error("Method not implemented.");
  }
  /**
   * Should return all the accounts authorized for the
   * current connection.
   *
   * @returns The accounts addresses strings
   */
  async accounts() {
    throw new Error("Method not implemented.");
  }
  /**
   * Should start the connection process and return
   * true if the account authorize the connection.
   *
   * and return false if the user reject the connection.
   *
   * @emits accounts
   * @returns boolean - connection status.
   */
  async connect() {
    throw new Error("Method not implemented.");
  }
  /**
   * Should disconnect the current connection and
   * return false if the disconnection was successful.
   *
   * @emits assets connection
   * @returns The connection status.
   */
  async disconnect() {
    throw new Error("Method not implemented.");
  }
  /**
   * Should start the sign message process and return
   * the signed message.
   *
   * @param address - The address to sign the message
   * @param message - The message to sign all text will be treated as text utf-8
   *
   * @returns Message signature
   */
  async signMessage(t, n) {
    throw new Error("Method not implemented.");
  }
  /**
   * Should start the sign transaction process and return
   * the signed transaction.
   *
   * @param address - The address to sign the transaction
   * @param transaction - The transaction to sign
   *
   * @returns Transaction signature
   */
  async signTransaction(t, n) {
    throw new Error("Method not implemented.");
  }
  /**
   * Should start the send transaction process and return
   * the transaction id submitted to the network.
   *
   * If the network is not available for the connection
   * it should throw an error to avoid the transaction
   * to be sent to the wrong network and lost.
   *
   * @param address - The address to sign the transaction
   * @param transaction - The transaction to send
   *
   * @returns The transaction id
   */
  async sendTransaction(t, n) {
    throw new Error("Method not implemented.");
  }
  /**
   * Should return the current account selected inside the connector, if the account
   * is authorized for the connection.
   *
   * If the account is not authorized it should return null.
   *
   * @returns The current account selected otherwise null.
   */
  async currentAccount() {
    throw new Error("Method not implemented.");
  }
  /**
   * Should add the the assets metadata to the connector and return true if the asset
   * was added successfully.
   *
   * If the asset already exists it should throw an error.
   *
   * @emits assets
   * @param assets - The assets to add the metadata to the connection.
   * @throws Error if the asset already exists
   * @returns True if the asset was added successfully
   */
  async addAssets(t) {
    throw new Error("Method not implemented.");
  }
  /**
   * Should add the the asset metadata to the connector and return true if the asset
   * was added successfully.
   *
   * If the asset already exists it should throw an error.
   *
   * @emits assets
   * @param asset - The asset to add the metadata to the connection.
   * @throws Error if the asset already exists
   * @returns True if the asset was added successfully
   */
  async addAsset(t) {
    throw new Error("Method not implemented.");
  }
  /**
   * Should return all the assets added to the connector. If a connection is already established.
   *
   * @returns Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.
   */
  async assets() {
    throw new Error("Method not implemented.");
  }
  /**
   * Should start the add network process and return true if the network was added successfully.
   *
   * @emits networks
   * @throws Error if the network already exists
   * @param networkUrl - The URL of the network to be added.
   * @returns Return true if the network was added successfully
   */
  async addNetwork(t) {
    throw new Error("Method not implemented.");
  }
  /**
   * Should start the select network process and return true if the network has change successfully.
   *
   * @emits networks
   * @throws Error if the network already exists
   * @param network - The network to be selected.
   * @returns Return true if the network was added successfully
   */
  async selectNetwork(t) {
    throw new Error("Method not implemented.");
  }
  /**
   * Should return all the networks available from the connector. If the connection is already established.
   *
   * @returns Return all the networks added to the connector.
   */
  async networks() {
    throw new Error("Method not implemented.");
  }
  /**
   * Should return the current network selected inside the connector. Even if the connection is not established.
   *
   * @returns Return the current network selected inside the connector.
   */
  async currentNetwork() {
    throw new Error("Method not implemented.");
  }
  /**
   * Should add the ABI to the connector and return true if the ABI was added successfully.
   *
   * @param contractId - The contract id to add the ABI.
   * @param abi - The JSON ABI that represents a contract.
   * @returns Return true if the ABI was added successfully.
   */
  async addABI(t, n) {
    throw new Error("Method not implemented.");
  }
  /**
   * Should return the ABI from the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the ABI.
   * @returns The ABI if it exists, otherwise return null.
   */
  async getABI(t) {
    throw new Error("Method not implemented.");
  }
  /**
   * Should return true if the abi exists in the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the abi
   * @returns Returns true if the abi exists or false if not.
   */
  async hasABI(t) {
    throw new Error("Method not implemented.");
  }
  /**
   * Event listener for the connector.
   *
   * @param eventName - The event name to listen
   * @param listener - The listener function
   */
  on(t, n) {
    return super.on(t, n), this;
  }
};
function hw(e, { cache: t, cacheTime: n, key: r }) {
  return async (...s) => {
    var o, u, A;
    if (t[r] && ((o = t[r]) != null && o.value))
      return (u = t[r]) == null ? void 0 : u.value;
    clearTimeout((A = t[r]) == null ? void 0 : A.timeout);
    const i = await e(...s);
    return t[r] = {
      timeout: Number(
        setTimeout(() => {
          t[r] = null;
        }, n)
      ),
      value: i
    }, i;
  };
}
function vy(e) {
  window.dispatchEvent(
    new CustomEvent(Ou, {
      detail: e
    })
  );
}
function gw() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function Yr(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var pw = 2e3, mw = 5e3, { warn: ww } = console, fr = class extends fw {
  constructor(t = fr.defaultConfig) {
    super();
    S(this, "_storage", null);
    S(this, "_connectors", []);
    S(this, "_targetObject", null);
    S(this, "_unsubscribes", []);
    S(this, "_targetUnsubscribe");
    S(this, "_pingCache", {});
    S(this, "_currentConnector");
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    S(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, n = Ou;
      if (t != null && t.on)
        return t.on(n, this.addConnector), () => {
          var r;
          (r = t.off) == null || r.call(t, n, this.addConnector);
        };
      if (t != null && t.addEventListener) {
        const r = (s) => {
          this.addConnector(s.detail);
        };
        return t.addEventListener(n, r), () => {
          var s;
          (s = t.removeEventListener) == null || s.call(t, n, r);
        };
      }
      return () => {
      };
    });
    /**
     * Add a new connector to the list of connectors.
     */
    S(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    S(this, "triggerConnectorEvents", async () => {
      const [t, n, r] = await Promise.all([
        this.isConnected(),
        this.networks(),
        this.currentNetwork()
      ]);
      if (this.emit(this.events.connection, t), this.emit(this.events.networks, n), this.emit(this.events.currentNetwork, r), t) {
        const [s, i] = await Promise.all([
          this.accounts(),
          this.currentAccount()
        ]);
        this.emit(this.events.accounts, s), this.emit(this.events.currentAccount, i);
      }
    });
    /**
     * Get a connector from the list of connectors.
     */
    S(this, "getConnector", (t) => this._connectors.find((n) => {
      const r = typeof t == "string" ? t : t.name;
      return n.name === r || n === t;
    }) || null);
    this.setMaxListeners(1e3), this._connectors = t.connectors ?? [], this._targetObject = this.getTargetObject(t.targetObject), this._storage = t.storage === void 0 ? this.getStorage() : t.storage, this.setupMethods(), this.setDefaultConnector(), this._targetUnsubscribe = this.setupConnectorListener();
  }
  /**
   * Return the target object to listen for global events.
   */
  getTargetObject(t) {
    return t || (typeof window < "u" ? window : typeof document < "u" ? document : null);
  }
  /**
   * Return the storage used.
   */
  getStorage() {
    if (typeof window < "u")
      return new lw(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(fr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
    if (t)
      return this.selectConnector(t, {
        emitEvents: !1
      });
  }
  /**
   * Start listener for all the events of the current
   * connector and emit them to the Fuel instance
   */
  setupConnectorEvents(t) {
    if (!this._currentConnector)
      return;
    const n = this._currentConnector;
    this._unsubscribes.map((r) => r()), this._unsubscribes = t.map((r) => {
      const s = (...i) => this.emit(r, ...i);
      return n.on(r, s), () => n.off(r, s);
    });
  }
  /**
   * Call method from the current connector.
   */
  async callMethod(t, ...n) {
    const r = await this.hasConnector();
    if (await this.pingConnector(), !this._currentConnector || !r)
      throw new Error(
        `No connector selected for calling ${t}. Use hasConnector before executing other methods.`
      );
    if (typeof this._currentConnector[t] == "function")
      return this._currentConnector[t](...n);
  }
  /**
   * Create a method for each method proxy that is available on the Common interface
   * and call the method from the current connector.
   */
  setupMethods() {
    Object.values(Mu).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      Yr(t.isConnected()),
      Yr(this.pingConnector(t))
    ]);
    return n < (t._latestUpdate || 0) || (t._latestUpdate = Date.now(), t.installed = s.status === "fulfilled" && s.value, t.connected = r.status === "fulfilled" && r.value), {
      installed: t.installed,
      connected: t.connected
    };
  }
  /**
   * Fetch the status of all connectors and set the installed and connected
   * status.
   */
  async fetchConnectorsStatus() {
    return Promise.all(
      this._connectors.map(async (t) => this.fetchConnectorStatus(t))
    );
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status. If no connector is provided it will ping the current connector.
   */
  async pingConnector(t) {
    const n = t || this._currentConnector;
    if (!n)
      return !1;
    try {
      return await hw(async () => Yr(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: mw
      })();
    } catch {
      throw new Error("Current connector is not available.");
    }
  }
  /**
   * Return the list of connectors with the status of installed and connected.
   */
  async connectors() {
    return await this.fetchConnectorsStatus(), this._connectors;
  }
  /**
   * Set the current connector to be used.
   */
  async selectConnector(t, n = {
    emitEvents: !0
  }) {
    var i, o;
    const r = this.getConnector(t);
    if (!r)
      return !1;
    if (((i = this._currentConnector) == null ? void 0 : i.name) === t)
      return !0;
    const { installed: s } = await this.fetchConnectorStatus(r);
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(So)), await ((o = this._storage) == null ? void 0 : o.setItem(fr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
  }
  /**
   * Return the current selected connector.
   */
  currentConnector() {
    return this._currentConnector;
  }
  /**
   * Return true if any connector is available.
   */
  async hasConnector() {
    if (this._currentConnector)
      return !0;
    const t = gw();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), Yr(t.promise, pw).then(() => !0).catch(() => !1);
  }
  async hasWallet() {
    return this.hasConnector();
  }
  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   *
   * @deprecated getProvider is deprecated and is going to be removed in the future, use getWallet instead.
   */
  async getProvider(t) {
    return ww(
      "getProvider is deprecated and is going to be removed in the future, use getWallet instead."
    ), this._getProvider(t);
  }
  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   */
  async _getProvider(t) {
    let n;
    if (t && "getTransactionResponse" in t)
      n = t;
    else if (t && "chainId" in t && "url" in t)
      n = await gs.create(t.url);
    else {
      if (t)
        throw new x(N.INVALID_PROVIDER, "Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await gs.create(r.url);
      }
    }
    return n;
  }
  /**
   * Return a Fuel Wallet Locked instance with extends features to work with
   * connectors.
   */
  async getWallet(t, n) {
    const r = await this._getProvider(n);
    return new Qs(t, r, this);
  }
  /**
   * Remove all open listeners this is useful when you want to
   * remove the Fuel instance and avoid memory leaks.
   */
  unsubscribe() {
    this._unsubscribes.map((t) => t()), this._targetUnsubscribe(), this.removeAllListeners();
  }
  /**
   * Clean all the data from the storage.
   */
  async clean() {
    var t;
    await ((t = this._storage) == null ? void 0 : t.removeItem(fr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, Lu = fr;
De(Lu, "STORAGE_KEY", "fuel-current-connector");
De(Lu, "defaultConfig", {});
function ic(e, t) {
  if (!e)
    throw new x(N.TRANSACTION_ERROR, t);
}
function ku(e) {
  return e.reduce((t, n, r) => {
    const { program: s, externalAbis: i } = n.getCallConfig();
    return r === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var kt, fc, Pu = (fc = class {
  constructor(...e) {
    vt(this, kt, void 0);
    Ft(this, kt, e || []);
  }
  entries() {
    return Fe(this, kt);
  }
  push(...e) {
    Fe(this, kt).push(...e);
  }
  concat(e) {
    return Fe(this, kt).concat(e);
  }
  extend(e) {
    Fe(this, kt).push(...e);
  }
  toBytes() {
    return ie(
      Fe(this, kt).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return V(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Fe(this, kt), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, kt = new WeakMap(), fc), yw = (e) => e0 + Kc({ maxInputs: e });
function Iw(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === ue.ScriptResult ? n = i : (i.type === ue.Return || i.type === ue.ReturnData || i.type === ue.Revert) && (r = i);
  }), !n || !r)
    throw new x(N.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: n.result,
    gasUsed: n.gasUsed,
    receipts: t,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: e
  };
}
function Qo(e, t, n = []) {
  var r;
  try {
    const s = Iw(e);
    return t(s);
  } catch (s) {
    if (s.code === N.SCRIPT_REVERTED) {
      const i = (r = e == null ? void 0 : e.dryRunStatus) == null ? void 0 : r.reason;
      throw Io({
        logs: n,
        receipts: e.receipts,
        statusReason: i
      });
    }
    throw s;
  }
}
function Ew(e, t, n) {
  return Qo(
    e,
    (r) => {
      if (r.returnReceipt.type === ue.Revert)
        throw new x(
          N.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== ue.Return && r.returnReceipt.type !== ue.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new x(
          N.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: n,
            receipt: r.returnReceipt
          })}`
        );
      }
      let s;
      return r.returnReceipt.type === ue.Return && (s = r.returnReceipt.val), r.returnReceipt.type === ue.ReturnData && (s = t.func.decodeOutput(r.returnReceipt.data)[0]), s;
    },
    n
  );
}
var Ns = class {
  /**
   * Creates an instance of the ScriptRequest class.
   *
   * @param bytes - The bytes of the script.
   * @param scriptDataEncoder - The script data encoder function.
   * @param scriptResultDecoder - The script result decoder function.
   */
  constructor(e, t, n) {
    /**
     * The bytes of the script.
     */
    S(this, "bytes");
    /**
     * A function to encode the script data.
     */
    S(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    S(this, "scriptResultDecoder");
    this.bytes = z(e), this.scriptDataEncoder = t, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return Kc({ maxInputs: t }) + e0 + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Ns.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = z(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return Qo(e, this.scriptResultDecoder, t);
  }
}, Uu = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, bw = Ne, Gu = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: n,
  assetIdOffset: r
}) => {
  const s = new Pu(
    Gr(16, e),
    Gr(17, n),
    _i(17, 17, 0),
    Gr(18, r)
  );
  return t ? s.push(
    Gr(19, t),
    _i(19, 19, 0),
    Ta(16, 17, 18, 19)
  ) : s.push(Ta(16, 17, 18, Oe.cgas().to_u8())), s;
};
function oc(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new Pu();
  for (let n = 0; n < e.length; n += 1)
    t.extend(Gu(e[n]).entries());
  return t.push(G0(1)), t.toBytes();
}
var Cw = (e) => e === ue.Return || e === ue.ReturnData, Bw = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === ue.Call && r === bw && s === t
), _w = (e) => (t) => {
  if (sn(t.code) !== 0)
    throw new x(N.SCRIPT_REVERTED, "Transaction reverted.");
  const n = Bw(
    t.receipts,
    e.toB256()
  ), r = B(n == null ? void 0 : n.is);
  return t.receipts.filter(({ type: i }) => Cw(i)).flatMap((i) => r.eq(B(i.is)) ? i.type === ue.Return ? [new D("u64").encode(i.val)] : i.type === ue.ReturnData ? [z(i.data)] : [new Uint8Array()] : []);
}, vw = (e, t, n = []) => Qo(e, _w(t), n), xw = (e) => e.reduce(
  (t, n) => {
    const r = { ...Uu };
    return n.gas && (r.gasForwardedOffset = 1), t + Gu(r).byteLength();
  },
  Xt.size()
  // placeholder for single RET instruction which is added later
), Rw = (e, t) => new Ns(
  // Script to call the contract, start with stub size matching length of calls
  oc(new Array(e.length).fill(Uu)),
  (n) => {
    var v;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = xw(n), i = (8 - s % 8) % 8, o = s + i, u = yw(t.toNumber()) + o, A = [];
    let h = u;
    const E = [];
    for (let R = 0; R < r; R += 1) {
      const C = n[R], F = h, M = F + ge, G = M + as, L = G + ol + ge + ge, W = L + C.fnSelectorBytes.byteLength, O = z(C.data);
      let T = 0;
      E.push(new D("u64").encode(C.amount || 0)), E.push(new X().encode(((v = C.assetId) == null ? void 0 : v.toString()) || Ne)), E.push(C.contractId.toBytes()), E.push(new D("u64").encode(L)), E.push(new D("u64").encode(W)), E.push(C.fnSelectorBytes), E.push(O), C.gas && (E.push(new D("u64").encode(C.gas)), T = W + O.byteLength);
      const k = {
        amountOffset: F,
        assetIdOffset: M,
        gasForwardedOffset: T,
        callDataOffset: G
      };
      A.push(k), h = u + ie(E).byteLength;
    }
    const I = oc(A);
    return { data: ie(E), script: I };
  },
  () => [new Uint8Array()]
);
function Sw(e) {
  const t = e.receipts.find((n) => n.type === ue.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || B(0);
}
var Xu = class {
  /**
   * Constructs an instance of InvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(e, t, n) {
    S(this, "functionScopes");
    S(this, "isMultiCall");
    S(this, "gasUsed");
    S(this, "value");
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = Sw(t);
  }
  /**
   * Gets the first call config.
   *
   * @returns The first call config.
   */
  getFirstCallConfig() {
    if (this.functionScopes[0])
      return this.functionScopes[0].getCallConfig();
  }
  /**
   * Gets the ABI from all calls.
   *
   * @returns The ABIs from all calls.
   */
  getAbiFromAllCalls() {
    return ku(this.functionScopes);
  }
  /**
   * Decodes the value from the call result.
   *
   * @param callResult - The call result.
   * @returns The decoded value.
   */
  getDecodedValue(e) {
    const t = this.getDecodedLogs(e.receipts), n = this.getFirstCallConfig();
    if (this.functionScopes.length === 1 && n && "bytes" in n.program)
      return Ew(e, n, t);
    const s = vw(
      e,
      (n == null ? void 0 : n.program).id,
      t
    ).map((i, o) => {
      var A;
      const { func: u } = this.functionScopes[o].getCallConfig();
      return (A = u.decodeOutput(i)) == null ? void 0 : A[0];
    });
    return this.isMultiCall ? s : s == null ? void 0 : s[0];
  }
  /**
   * Decodes the logs from the receipts.
   *
   * @param receipts - The transaction result receipts.
   * @returns The decoded logs.
   */
  getDecodedLogs(e) {
    if (!this.getFirstCallConfig())
      return [];
    const { main: n, otherContractsAbis: r } = this.getAbiFromAllCalls();
    return _o(e, n, r);
  }
}, zu = class extends Xu {
  /**
   * Constructs an instance of FunctionInvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param transactionResponse - The transaction response.
   * @param transactionResult - The transaction result.
   * @param program - The program.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(t, n, r, s, i) {
    super(t, r, i);
    S(this, "transactionId");
    S(this, "transactionResponse");
    S(this, "transactionResult");
    S(this, "program");
    S(this, "logs");
    this.transactionResponse = n, this.transactionResult = r, this.transactionId = this.transactionResponse.id, this.program = s, this.logs = this.getDecodedLogs(r.receipts);
  }
  /**
   * Builds an instance of FunctionInvocationResult.
   *
   * @param funcScope - The function scope.
   * @param transactionResponse - The transaction response.
   * @param isMultiCall - Whether it's a multi-call.
   * @param program - The program.
   * @returns The function invocation result.
   */
  static async build(t, n, r, s) {
    const i = await n.waitForResult();
    return new zu(
      t,
      n,
      i,
      s,
      r
    );
  }
}, ss = class extends Xu {
  /**
   * Constructs an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(t, n, r) {
    super(t, n, r);
    S(this, "callResult");
    this.callResult = n;
  }
  /**
   * Builds an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   * @returns The invocation call result.
   */
  static async build(t, n, r) {
    return await new ss(t, n, r);
  }
};
function Qw(e) {
  const { program: t, args: n, forward: r, func: s, callParameters: i, externalAbis: o } = e.getCallConfig(), u = s.encodeArguments(n);
  return {
    contractId: t.id,
    fnSelector: s.selector,
    fnSelectorBytes: s.selectorBytes,
    encoding: s.encoding,
    data: u,
    assetId: r == null ? void 0 : r.assetId,
    amount: r == null ? void 0 : r.amount,
    gas: i == null ? void 0 : i.gasLimit,
    externalContractsAbis: o
  };
}
var Yu = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    S(this, "transactionRequest");
    S(this, "program");
    S(this, "functionInvocationScopes", []);
    S(this, "txParameters");
    S(this, "requiredCoins", []);
    S(this, "isMultiCall", !1);
    S(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    S(this, "externalAbis", {});
    S(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new _n();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    if (!this.getProvider().getChain())
      throw new x(
        x.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``"
      );
    return this.functionInvocationScopes.map((n) => Qw(n));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), n = Rw(this.functionInvocationScopes, t);
    this.transactionRequest.setScript(n, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId), t.externalContractsAbis && Object.keys(t.externalContractsAbis).forEach(
        (n) => this.transactionRequest.addContractInputAndOutput(de.fromB256(n))
      );
    });
  }
  /**
   * Gets the required coins for the transaction.
   *
   * @returns An array of required coin quantities.
   */
  getRequiredCoins() {
    return this.calls.map((t) => ({
      assetId: String(t.assetId),
      amount: B(t.amount || 0)
    })).filter(({ assetId: t, amount: n }) => t && !B(n).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const e = this.getRequiredCoins(), t = (n, { assetId: r, amount: s }) => {
      var o;
      const i = ((o = n.get(r)) == null ? void 0 : o.amount) || B(0);
      return n.set(r, {
        assetId: String(r),
        amount: i.add(s)
      });
    };
    this.requiredCoins = Array.from(
      e.reduce(t, /* @__PURE__ */ new Map()).values()
    );
  }
  /**
   * Adds a single call to the invocation scope.
   *
   * @param funcScope - The function scope to add.
   * @returns The current instance of the class.
   */
  addCall(e) {
    return this.addCalls([e]), this;
  }
  /**
   * Adds multiple calls to the invocation scope.
   *
   * @param funcScopes - An array of function scopes to add.
   * @returns The current instance of the class.
   */
  addCalls(e) {
    return this.functionInvocationScopes.push(...e), this.updateContractInputAndOutput(), this.updateRequiredCoins(), this;
  }
  /**
   * Prepares the transaction by updating the script request, required coins, and checking the gas limit.
   */
  async prepareTransaction() {
    await fo(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === Le.Script && (this.transactionRequest.abis = ku(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, n) => t.add(n.gas || 0), B(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new x(
        N.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
  }
  /**
   * Gets the transaction cost ny dry running the transaction.
   *
   * @param options - Optional transaction cost options.
   * @returns The transaction cost details.
   */
  async getTransactionCost() {
    const e = this.getProvider(), t = await this.getTransactionRequest();
    return await e.getTransactionCost(t, {
      resourcesOwner: this.program.account,
      quantitiesToContract: this.getRequiredCoins(),
      signatureCallback: this.addSignersCallback
    });
  }
  /**
   * Funds the transaction with the required coins.
   *
   * @returns The current instance of the class.
   */
  async fundWithRequiredCoins() {
    var o;
    let e = await this.getTransactionRequest();
    e = Pt(e);
    const t = await this.getTransactionCost(), { gasUsed: n, missingContractIds: r, outputVariables: s, maxFee: i } = t;
    return this.setDefaultTxParams(e, n, i), e.inputs = e.inputs.filter((u) => u.type !== Ce.Coin), r.forEach((u) => {
      e.addContractInputAndOutput(de.fromString(u));
    }), e.addVariableOutputs(s), await ((o = this.program.account) == null ? void 0 : o.fund(e, t)), this.addSignersCallback && await this.addSignersCallback(e), e;
  }
  /**
   * Sets the transaction parameters.
   *
   * @param txParams - The transaction parameters to set.
   * @returns The current instance of the class.
   */
  txParams(e) {
    var n;
    this.txParameters = e;
    const t = this.transactionRequest;
    return t.tip = B(e.tip || t.tip), t.gasLimit = B(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? B(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? B(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((n = this.txParameters) == null ? void 0 : n.variableOutputs) || 0), this;
  }
  /**
   * Adds contracts to the invocation scope.
   *
   * @param contracts - An array of contracts to add.
   * @returns The current instance of the class.
   */
  addContracts(e) {
    return e.forEach((t) => {
      this.transactionRequest.addContractInputAndOutput(t.id), this.externalAbis[t.id.toB256()] = t.interface.jsonAbi;
    }), this;
  }
  /**
   * Adds an asset transfer to an Account on the contract call transaction request.
   *
   * @param transferParams - The object representing the transfer to be made.
   * @returns The current instance of the class.
   */
  addTransfer(e) {
    const { amount: t, destination: n, assetId: r } = e, s = this.getProvider().getBaseAssetId();
    return this.transactionRequest = this.transactionRequest.addCoinOutput(
      de.fromAddressOrString(n),
      t,
      r || s
    ), this;
  }
  /**
   * Adds multiple transfers to the contract call transaction request.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The current instance of the class.
   */
  addBatchTransfer(e) {
    const t = this.getProvider().getBaseAssetId();
    return e.forEach(({ destination: n, amount: r, assetId: s }) => {
      this.transactionRequest = this.transactionRequest.addCoinOutput(
        de.fromAddressOrString(n),
        r,
        s || t
      );
    }), this;
  }
  addSigners(e) {
    return this.addSignersCallback = async (t) => t.addAccountWitnesses(e), this;
  }
  /**
   * Prepares and returns the transaction request object.
   *
   * @returns The prepared transaction request.
   */
  async getTransactionRequest() {
    return await this.prepareTransaction(), this.transactionRequest;
  }
  /**
   * Submits a transaction.
   *
   * @returns The result of the function invocation.
   */
  async call() {
    ic(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      awaitExecution: !0,
      estimateTxDependencies: !1
    });
    return zu.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall,
      this.program
    );
  }
  /**
   * Simulates a transaction.
   *
   * @returns The result of the invocation call.
   */
  async simulate() {
    if (ic(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new x(
        N.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return ss.build(this.functionInvocationScopes, t, this.isMultiCall);
  }
  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   */
  async dryRun() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return ss.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall
    );
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return ss.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall
    );
  }
  getProvider() {
    return this.program.provider;
  }
  /**
   * Obtains the ID of a transaction.
   *
   * @param chainId - the chainId to use to hash the transaction with
   * @returns the ID of the transaction.
   */
  async getTransactionId(e) {
    const t = e ?? await this.getProvider().getChainId();
    return (await this.getTransactionRequest()).getTransactionId(t);
  }
  /**
   * In case the gasLimit is *not* set by the user, this method sets a default value.
   */
  setDefaultTxParams(e, t, n) {
    var u, A;
    const r = Sn((u = this.txParameters) == null ? void 0 : u.gasLimit) || this.hasCallParamsGasLimit, s = Sn((A = this.txParameters) == null ? void 0 : A.maxFee), { gasLimit: i, maxFee: o } = e;
    if (!r)
      e.gasLimit = t;
    else if (i.lt(t))
      throw new x(
        N.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${t}'.`
      );
    if (!s)
      e.maxFee = n;
    else if (n.gt(o))
      throw new x(
        N.MAX_FEE_TOO_LOW,
        `Max fee '${o}' is lower than the required: '${n}'.`
      );
  }
}, Vu = class extends Yu {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, n, r) {
    super(t, !1);
    S(this, "func");
    S(this, "callParameters");
    S(this, "forward");
    S(this, "args");
    this.func = n, this.args = r || [], this.setArguments(...r), super.addCall(this);
  }
  /**
   * Gets the call configuration.
   *
   * @returns The call configuration.
   */
  getCallConfig() {
    return {
      func: this.func,
      program: this.program,
      callParameters: this.callParameters,
      txParameters: this.txParameters,
      forward: this.forward,
      args: this.args,
      externalAbis: this.externalAbis
    };
  }
  /**
   * Sets the arguments for the function invocation.
   *
   * @param args - The arguments.
   * @returns The instance of FunctionInvocationScope.
   */
  setArguments(...t) {
    return this.args = t || [], this;
  }
  /**
   * Sets the call parameters for the function invocation.
   *
   * @param callParams - The call parameters.
   * @returns The instance of FunctionInvocationScope.
   * @throws If the function is not payable and forward is set.
   */
  callParams(t) {
    if (!this.hasCallParamsGasLimit && (t == null ? void 0 : t.gasLimit) !== void 0 && (this.hasCallParamsGasLimit = !0), this.callParameters = t, t != null && t.forward) {
      if (!this.func.attributes.find((n) => n.name === "payable"))
        throw new x(
          N.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = po(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, Nw = class extends Yu {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(e, t) {
    super(e, !0), this.addCalls(t);
  }
  /**
   * Adds a single function invocation scope to the multi-call invocation scope.
   *
   * @param funcScope - The function invocation scope.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCall(e) {
    return super.addCalls([e]);
  }
  /**
   * Adds multiple function invocation scopes to the multi-call invocation scope.
   *
   * @param funcScopes - An array of function invocation scopes.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCalls(e) {
    return super.addCalls(e);
  }
}, Dw = class {
  /**
   * Creates an instance of the Contract class.
   *
   * @param id - The contract's address.
   * @param abi - The contract's ABI (JSON ABI or Interface instance).
   * @param accountOrProvider - The account or provider for interaction.
   */
  constructor(e, t, n) {
    /**
     * The unique contract identifier.
     */
    S(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    S(this, "provider");
    /**
     * The contract's ABI interface.
     */
    S(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    S(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    S(this, "functions", {});
    this.interface = t instanceof qt ? t : new qt(t), this.id = de.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
      const s = this.interface.getFunction(r);
      Object.defineProperty(this.functions, s.name, {
        value: this.buildFunction(s),
        writable: !1
      });
    });
  }
  /**
   * Build a function invocation scope for the provided function fragment.
   *
   * @param func - The function fragment to build a scope for.
   * @returns A function that creates a FunctionInvocationScope.
   */
  buildFunction(e) {
    return (() => {
      const t = (...n) => new Vu(this, e, n);
      return Object.defineProperty(t, "isReadOnly", {
        value: () => e.isReadOnly(),
        writable: !1
      }), t;
    })();
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(e) {
    return new Nw(this, e);
  }
  /**
   * Get the balance for a given asset ID for this contract.
   *
   * @param assetId - The specified asset ID.
   * @returns The balance of the contract for the specified asset.
   */
  // #region contract-balance-1
  getBalance(e) {
    return this.provider.getContractBalance(this.id, e);
  }
  // #endregion contract-balance-1
}, Tw = class extends Vu {
  constructor() {
    super(...arguments);
    S(this, "scriptRequest");
  }
  updateScriptRequest() {
    this.scriptRequest || this.buildScriptRequest(), this.transactionRequest.setScript(this.scriptRequest, this.args);
  }
  buildScriptRequest() {
    const t = this.program.bytes;
    if (!this.program.provider.getChain())
      throw new x(
        x.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    this.scriptRequest = new Ns(
      t,
      (r) => this.func.encodeArguments(r),
      () => []
    );
  }
}, xy = class extends Cl {
  /**
   * Create a new instance of the Script class.
   *
   * @param bytecode - The compiled bytecode of the script.
   * @param abi - The ABI interface for the script.
   * @param account - The account associated with the script.
   */
  constructor(t, n, r) {
    super();
    /**
     * The compiled bytecode of the script.
     */
    S(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    S(this, "interface");
    /**
     * The account associated with the script.
     */
    S(this, "account");
    /**
     * The script request object.
     */
    S(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    S(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    S(this, "functions");
    this.bytes = z(t), this.interface = new qt(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new Tw(this, this.interface.getFunction("main"), s)
    };
  }
  /**
   * Set the configurable constants of the script.
   *
   * @param configurables - An object containing the configurable constants and their values.
   * @throws Will throw an error if the script has no configurable constants to be set or if an invalid constant is provided.
   * @returns This instance of the `Script`.
   */
  setConfigurableConstants(t) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new Error("The script does not have configurable constants to be set");
      Object.entries(t).forEach(([n, r]) => {
        if (!this.interface.configurables[n])
          throw new Error(`The script does not have a configurable constant named: '${n}'`);
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r);
        this.bytes.set(i, s);
      });
    } catch (n) {
      throw new x(
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new Ns(
  /*
    Opcode::RET(REG_ZERO)
    Opcode::NOOP
  */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  "0x24000000",
  () => new Uint8Array(0),
  () => {
  }
);
function Ry(e) {
  return e;
}
var Fw = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(Fw || {}), Mw = Object.defineProperty, Ow = (e, t) => {
  for (var n in t)
    Mw(e, n, { get: t[n], enumerable: !0 });
}, Lw = {};
Ow(Lw, {
  getContractId: () => Wu,
  getContractRoot: () => Hu,
  getContractStorageRoot: () => Zu,
  hexlifyWithPrefix: () => ki
});
var Hu = (e) => {
  const n = z(e), r = wc(n, 16384);
  return ru(r.map((s) => V(s)));
}, Zu = (e) => {
  const t = new Cg();
  return e.forEach(({ key: n, value: r }) => t.update(mt(n), r)), t.root;
}, Wu = (e, t, n) => {
  const r = Hu(z(e));
  return mt(ie(["0x4655454C", t, r, n]));
}, ki = (e) => V(e.startsWith("0x") ? e : `0x${e}`), kw = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, n = null) {
    S(this, "bytecode");
    S(this, "interface");
    S(this, "provider");
    S(this, "account");
    this.bytecode = z(e), t instanceof qt ? this.interface = t : this.interface = new qt(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new kw(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    var o;
    const t = (o = e == null ? void 0 : e.storageSlots) == null ? void 0 : o.map(({ key: u, value: A }) => ({
      key: ki(u),
      value: ki(A)
    })).sort(({ key: u }, { key: A }) => u.localeCompare(A)), n = {
      salt: Ut(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new x(
        N.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || Zu(n.storageSlots), s = Wu(this.bytecode, n.salt, r), i = new Fi({
      bytecodeWitnessIndex: 0,
      witnesses: [this.bytecode],
      ...n
    });
    return i.addContractCreatedOutput(s, r), {
      contractId: s,
      transactionRequest: i
    };
  }
  /**
   * Deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployContract(e = {}) {
    if (!this.account)
      throw new x(N.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), s = await this.account.provider.getTransactionCost(r), { maxFee: i } = e;
    if (Sn(i) && s.maxFee.gt(i))
      throw new x(
        N.MAX_FEE_TOO_LOW,
        `Max fee '${e.maxFee}' is lower than the required: '${s.maxFee}'.`
      );
    return r.maxFee = s.maxFee, await this.account.fund(r, s), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new Dw(n, this.interface, this.account);
  }
  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(e) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new Error("Contract does not have configurables to be set");
      Object.entries(e).forEach(([n, r]) => {
        if (!this.interface.configurables[n])
          throw new Error(`Contract does not have a configurable named: '${n}'`);
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r), o = z(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new x(
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, Sy = 9, Qy = 3, Ny = 9, Dy = 9, Ty = 18, Fy = 15, My = 12, Oy = 9, hc, Ly = typeof process < "u" && ((hc = process == null ? void 0 : process.env) == null ? void 0 : hc.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/v1/graphql", ky = "https://devnet.fuel.network/v1/graphql";
export {
  as as ASSET_ID_LEN,
  u0 as AbstractAccount,
  El as AbstractAddress,
  bl as AbstractContract,
  d0 as AbstractProgram,
  Cl as AbstractScript,
  qw as AbstractScriptRequest,
  Qs as Account,
  de as Address,
  lm as AddressType,
  we as ArrayCoder,
  X as B256Coder,
  dl as B512Coder,
  Me as BN,
  fn as BYTES_32,
  bo as BaseTransactionRequest,
  Bu as BaseWalletUnlocked,
  D as BigNumberCoder,
  ll as BooleanCoder,
  be as ByteArrayCoder,
  t0 as ByteCoder,
  Ln as CHAIN_IDS,
  ol as CONTRACT_ID_LEN,
  ey as CONTRACT_MAX_SIZE,
  fm as ChainName,
  fy as ChangeOutputCollisionError,
  ce as Coder,
  Fw as Commands,
  Dw as Contract,
  kw as ContractFactory,
  Lw as ContractUtils,
  Fi as CreateTransactionRequest,
  Dy as DECIMAL_FUEL,
  Oy as DECIMAL_GWEI,
  Fy as DECIMAL_KWEI,
  My as DECIMAL_MWEI,
  Ty as DECIMAL_WEI,
  Ny as DEFAULT_DECIMAL_UNITS,
  Qy as DEFAULT_MIN_PRECISION,
  Sy as DEFAULT_PRECISION,
  zi as DateTime,
  os as ENCODING_V1,
  Kw as EmptyRoot,
  n0 as EnumCoder,
  N as ErrorCode,
  gh as FAILED_ASSERT_EQ_SIGNAL,
  mh as FAILED_ASSERT_NE_SIGNAL,
  ph as FAILED_ASSERT_SIGNAL,
  hh as FAILED_REQUIRE_SIGNAL,
  k0 as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  ay as FAILED_UNKNOWN_SIGNAL,
  us as FUEL_BECH32_HRP_PREFIX,
  Ly as FUEL_NETWORK_URL,
  ky as FUEL_TESTNET_NETWORK_URL,
  Lu as Fuel,
  fw as FuelConnector,
  Ou as FuelConnectorEventType,
  So as FuelConnectorEventTypes,
  Mu as FuelConnectorMethods,
  x as FuelError,
  zu as FunctionInvocationResult,
  Vu as FunctionInvocationScope,
  di as HDWallet,
  Jw as INPUT_COIN_FIXED_SIZE,
  hn as InputCoder,
  na as InputCoinCoder,
  ds as InputContractCoder,
  mr as InputMessageCoder,
  Ce as InputType,
  Pu as InstructionSet,
  qt as Interface,
  ss as InvocationCallResult,
  Xu as InvocationResult,
  Jm as Language,
  lw as LocalStorage,
  oy as MAX_PREDICATE_DATA_LENGTH,
  iy as MAX_PREDICATE_LENGTH,
  ry as MAX_SCRIPT_DATA_LENGTH,
  ny as MAX_SCRIPT_LENGTH,
  sy as MAX_STATIC_CONTRACTS,
  ty as MAX_WITNESSES,
  tc as MNEMONIC_SIZES,
  cw as MemoryStorage,
  vo as Mnemonic,
  Qu as MnemonicVault,
  Nw as MultiCallInvocationScope,
  Vp as NoWitnessAtIndexError,
  hy as NoWitnessByOwnerError,
  $ as NumberCoder,
  Am as OperationName,
  i0 as OptionCoder,
  sa as OutputChangeCoder,
  gn as OutputCoder,
  ra as OutputCoinCoder,
  As as OutputContractCoder,
  oa as OutputContractCreatedCoder,
  Ie as OutputType,
  ia as OutputVariableCoder,
  yh as PANIC_DOC_URL,
  wh as PANIC_REASONS,
  pn as PoliciesCoder,
  Qt as PolicyType,
  sc as Predicate,
  Nu as PrivateKeyVault,
  gs as Provider,
  gl as RawSliceCoder,
  yi as ReceiptBurnCoder,
  aa as ReceiptCallCoder,
  jw as ReceiptCoder,
  la as ReceiptLogCoder,
  fa as ReceiptLogDataCoder,
  ls as ReceiptMessageOutCoder,
  wr as ReceiptMintCoder,
  da as ReceiptPanicCoder,
  ca as ReceiptReturnCoder,
  ua as ReceiptReturnDataCoder,
  Aa as ReceiptRevertCoder,
  pa as ReceiptScriptResultCoder,
  ha as ReceiptTransferCoder,
  ga as ReceiptTransferOutCoder,
  ue as ReceiptType,
  e0 as SCRIPT_FIXED_SIZE,
  xy as Script,
  Ns as ScriptRequest,
  _n as ScriptTransactionRequest,
  Kn as Signer,
  to as StdStringCoder,
  _y as StorageAbstract,
  ma as StorageSlotCoder,
  o0 as StrSliceCoder,
  pl as StringCoder,
  bs as StructCoder,
  wn as TransactionCoder,
  Ia as TransactionCreateCoder,
  Ea as TransactionMintCoder,
  rs as TransactionResponse,
  ya as TransactionScriptCoder,
  dm as TransactionStatus,
  Le as TransactionType,
  um as TransactionTypeName,
  ba as TransactionUpgradeCoder,
  Ca as TransactionUploadCoder,
  a0 as TupleCoder,
  Zn as TxPointerCoder,
  pi as UTXO_ID_LEN,
  $w as UtxoIdCoder,
  dw as Vault,
  ml as VecCoder,
  ge as WORD_SIZE,
  Ct as Wallet,
  Su as WalletLocked,
  uw as WalletManager,
  Et as WalletUnlocked,
  mn as WitnessCoder,
  Ne as ZeroBytes32,
  vg as addAmountToCoinQuantities,
  $n as addOperation,
  ur as addressify,
  z as arrayify,
  zp as assemblePanicError,
  Lp as assembleReceiptByType,
  Yp as assembleRevertError,
  Ss as assembleTransactionSummary,
  ic as assert,
  By as assets,
  B as bn,
  dn as bufferFromString,
  ly as buildBlockExplorerUrl,
  hw as cacheFor,
  gy as cacheRequestInputsResources,
  Zp as cacheRequestInputsResourcesFromOwner,
  Ni as calculateGasFee,
  lu as calculateMetadataGasForTxCreate,
  fu as calculateMetadataGasForTxScript,
  $p as calculateTXFeeForSummary,
  Kc as calculateVmTxMemory,
  Yw as capitalizeString,
  wc as chunkAndPadBytes,
  Sl as clearFirst12BytesFromB256,
  po as coinQuantityfy,
  Wc as computeHmac,
  ie as concat,
  ws as concatBytes,
  Ry as createConfig,
  Yi as dataSlice,
  Cd as decodeBase58,
  FA as decrypt,
  OA as decryptJsonWalletData,
  Zw as defaultConsensusKey,
  Hw as defaultSnapshotConfigs,
  gw as deferPromise,
  vy as dispatchFuelConnectorEvent,
  bc as encodeBase58,
  MA as encrypt,
  LA as encryptJsonWalletData,
  zr as english,
  Rm as extractBurnedAssetsFromReceipts,
  xm as extractMintedAssetsFromReceipts,
  Io as extractTxError,
  Gw as format,
  Uw as formatUnits,
  ro as fromBech32,
  Gm as fuelAssetsBaseUrl,
  Up as gasUsedByInputs,
  ku as getAbisFromAllCalls,
  Hp as getAssetAmountInRequestInputs,
  by as getAssetEth,
  Cy as getAssetFuel,
  Mm as getAssetNetwork,
  Cu as getAssetWithNetwork,
  so as getBytesFromBech32,
  bm as getContractCallOperations,
  _m as getContractCreatedOperations,
  _o as getDecodedLogs,
  Fm as getDefaultChainId,
  du as getGasUsedFromReceipts,
  Bo as getInputAccountAddress,
  im as getInputContractFromIndex,
  pu as getInputFromAssetId,
  Co as getInputsByType,
  em as getInputsByTypes,
  tm as getInputsCoin,
  rm as getInputsCoinAndMessage,
  sm as getInputsContract,
  nm as getInputsMessage,
  yo as getMaxGas,
  Au as getMinGas,
  g0 as getMintedAssetId,
  vm as getOperations,
  Dr as getOutputsByType,
  am as getOutputsChange,
  mu as getOutputsCoin,
  cm as getOutputsContract,
  om as getOutputsContractCreated,
  py as getOutputsVariable,
  Bm as getPayProducerOperations,
  Aw as getPredicateRoot,
  Rl as getRandomB256,
  Er as getReceiptsByType,
  mm as getReceiptsCall,
  wm as getReceiptsMessageOut,
  wy as getReceiptsTransferOut,
  Za as getReceiptsWithMissingData,
  hu as getRequestInputResourceOwner,
  Sm as getTransactionStatusName,
  yy as getTransactionSummary,
  Iy as getTransactionSummaryFromRequest,
  wu as getTransactionTypeName,
  Ey as getTransactionsSummaries,
  Ja as getTransferOperations,
  Em as getWithdrawFromFuelOperations,
  my as hasSameAssetId,
  Jt as hash,
  GA as hashMessage,
  V as hexlify,
  Dp as inputify,
  mi as isB256,
  $r as isBech32,
  Fp as isCoin,
  Sn as isDefined,
  wi as isEvmAddress,
  Ay as isMessage,
  ea as isPublicKey,
  uy as isRawCoin,
  dy as isRawMessage,
  nr as isRequestInputCoin,
  Eo as isRequestInputMessage,
  ln as isRequestInputResource,
  Ti as isRequestInputResourceFromOwner,
  Tr as isType,
  yu as isTypeCreate,
  hm as isTypeMint,
  Iu as isTypeScript,
  gm as isTypeUpgrade,
  pm as isTypeUpload,
  Zc as keccak256,
  Ww as keyFromPassword,
  Xw as max,
  zw as multiply,
  xl as normalizeBech32,
  Gp as normalizeJSON,
  Vw as normalizeString,
  Tp as outputify,
  Ql as padFirst12BytesOfEvmAddress,
  kA as pbkdf2,
  cn as processGqlReceipt,
  Qm as processGraphqlStatus,
  Ut as randomBytes,
  Xm as rawAssets,
  An as resolveGasDependentCosts,
  Um as resolveIconPaths,
  Wa as returnZeroScript,
  PA as ripemd160,
  Hc as scrypt,
  mt as sha256,
  Xp as sleep,
  Ol as sortPolicies,
  cr as stringFromBuffer,
  ta as toB256,
  jr as toBech32,
  Wt as toBytes,
  dd as toFixed,
  Xi as toHex,
  sn as toNumber,
  zn as toUtf8Bytes,
  Vi as toUtf8String,
  wt as transactionRequestify,
  UA as uint64ToBytesBE,
  Pm as urlJoin,
  Yr as withTimeout,
  jp as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
