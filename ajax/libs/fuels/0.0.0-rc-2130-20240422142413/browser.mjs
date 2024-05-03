var Od = Object.defineProperty;
var Td = (e, t, n) => t in e ? Od(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var R = (e, t, n) => (Td(e, typeof t != "symbol" ? t + "" : t, n), n), di = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var Ne = (e, t, n) => (di(e, t, "read from private field"), n ? n.call(e) : t.get(e)), It = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, tn = (e, t, n, r) => (di(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var nn = (e, t, n) => (di(e, t, "access private method"), n);
function xc() {
  return {
    FORC: "0.49.3",
    FUEL_CORE: "0.22.1",
    FUELS: "0.81.0"
  };
}
function ca(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function zi(e, t) {
  const n = ca(e), r = ca(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function Ld(e, t) {
  const { major: n } = zi(e, t);
  return n === 0;
}
function Pd(e, t) {
  const { minor: n } = zi(e, t);
  return n === 0;
}
function Gd(e, t) {
  const { patch: n } = zi(e, t);
  return n === 0;
}
function Ud(e) {
  const { FUEL_CORE: t } = xc();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: Ld(e, t),
    isMinorSupported: Pd(e, t),
    isPatchSupported: Gd(e, t)
  };
}
var Jd = xc(), Hd = Object.defineProperty, Yd = (e, t, n) => t in e ? Hd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Zd = (e, t, n) => (Yd(e, typeof t != "symbol" ? t + "" : t, n), n), F = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e.BUFFER_OVERRUN = "buffer-overrun", e))(F || {}), Xr = class extends Error {
  constructor(t, n, r = {}) {
    super(n);
    R(this, "VERSIONS", Jd);
    R(this, "metadata");
    R(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = r;
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new Xr(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(F);
    if (!r.includes(n.code))
      throw new Xr(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new Xr(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, metadata: s, VERSIONS: i } = this;
    return { code: t, name: n, message: r, metadata: s, VERSIONS: i };
  }
}, v = Xr;
Zd(v, "CODES", F);
var Be = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Vd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ki(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      if (this instanceof r) {
        var s = [null];
        s.push.apply(s, arguments);
        var i = Function.bind.apply(t, s);
        return new i();
      }
      return t.apply(this, arguments);
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
var eo = { exports: {} };
const Xd = {}, jd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xd
}, Symbol.toStringTag, { value: "Module" })), qd = /* @__PURE__ */ Ki(jd);
eo.exports;
(function(e) {
  (function(t, n) {
    function r(B, a) {
      if (!B)
        throw new Error(a || "Assertion failed");
    }
    function s(B, a) {
      B.super_ = a;
      var c = function() {
      };
      c.prototype = a.prototype, B.prototype = new c(), B.prototype.constructor = B;
    }
    function i(B, a, c) {
      if (i.isBN(B))
        return B;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, B !== null && ((a === "le" || a === "be") && (c = a, a = 10), this._init(B || 0, a || 10, c || "be"));
    }
    typeof t == "object" ? t.exports = i : n.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = qd.Buffer;
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
      var h, E, I = 0;
      if (l === "be")
        for (p = a.length - 1, h = 0; p >= 0; p -= 3)
          E = a[p] | a[p - 1] << 8 | a[p - 2] << 16, this.words[h] |= E << I & 67108863, this.words[h + 1] = E >>> 26 - I & 67108863, I += 24, I >= 26 && (I -= 26, h++);
      else if (l === "le")
        for (p = 0, h = 0; p < a.length; p += 3)
          E = a[p] | a[p + 1] << 8 | a[p + 2] << 16, this.words[h] |= E << I & 67108863, this.words[h + 1] = E >>> 26 - I & 67108863, I += 24, I >= 26 && (I -= 26, h++);
      return this._strip();
    };
    function A(B, a) {
      var c = B.charCodeAt(a);
      if (c >= 48 && c <= 57)
        return c - 48;
      if (c >= 65 && c <= 70)
        return c - 55;
      if (c >= 97 && c <= 102)
        return c - 87;
      r(!1, "Invalid character in " + B);
    }
    function d(B, a, c) {
      var l = A(B, c);
      return c - 1 >= a && (l |= A(B, c - 1) << 4), l;
    }
    i.prototype._parseHex = function(a, c, l) {
      this.length = Math.ceil((a.length - c) / 6), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var h = 0, E = 0, I;
      if (l === "be")
        for (p = a.length - 1; p >= c; p -= 2)
          I = d(a, c, p) << h, this.words[E] |= I & 67108863, h >= 18 ? (h -= 18, E += 1, this.words[E] |= I >>> 26) : h += 8;
      else {
        var g = a.length - c;
        for (p = g % 2 === 0 ? c + 1 : c; p < a.length; p += 2)
          I = d(a, c, p) << h, this.words[E] |= I & 67108863, h >= 18 ? (h -= 18, E += 1, this.words[E] |= I >>> 26) : h += 8;
      }
      this._strip();
    };
    function f(B, a, c, l) {
      for (var p = 0, h = 0, E = Math.min(B.length, c), I = a; I < E; I++) {
        var g = B.charCodeAt(I) - 48;
        p *= l, g >= 49 ? h = g - 49 + 10 : g >= 17 ? h = g - 17 + 10 : h = g, r(g >= 0 && h < l, "Invalid character"), p += h;
      }
      return p;
    }
    i.prototype._parseBase = function(a, c, l) {
      this.words = [0], this.length = 1;
      for (var p = 0, h = 1; h <= 67108863; h *= c)
        p++;
      p--, h = h / c | 0;
      for (var E = a.length - l, I = E % p, g = Math.min(E, E - I) + l, u = 0, m = l; m < g; m += p)
        u = f(a, m, m + p, c), this.imuln(h), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (I !== 0) {
        var Y = 1;
        for (u = f(a, m, a.length, c), m = 0; m < I; m++)
          Y *= c;
        this.imuln(Y), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      }
      this._strip();
    }, i.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        a.words[c] = this.words[c];
      a.length = this.length, a.negative = this.negative, a.red = this.red;
    };
    function y(B, a) {
      B.words = a.words, B.length = a.length, B.negative = a.negative, B.red = a.red;
    }
    if (i.prototype._move = function(a) {
      y(a, this);
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
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = w;
      } catch {
        i.prototype.inspect = w;
      }
    else
      i.prototype.inspect = w;
    function w() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var b = [
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
    ], x = [
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
    ], D = [
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
        for (var p = 0, h = 0, E = 0; E < this.length; E++) {
          var I = this.words[E], g = ((I << p | h) & 16777215).toString(16);
          h = I >>> 24 - p & 16777215, p += 2, p >= 26 && (p -= 26, E--), h !== 0 || E !== this.length - 1 ? l = b[6 - g.length] + g + l : l = g + l;
        }
        for (h !== 0 && (l = h.toString(16) + l); l.length % c !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var u = x[a], m = D[a];
        l = "";
        var Y = this.clone();
        for (Y.negative = 0; !Y.isZero(); ) {
          var X = Y.modrn(m).toString(a);
          Y = Y.idivn(m), Y.isZero() ? l = X + l : l = b[u - X.length] + X + l;
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
    var Q = function(a, c) {
      return a.allocUnsafe ? a.allocUnsafe(c) : new a(c);
    };
    i.prototype.toArrayLike = function(a, c, l) {
      this._strip();
      var p = this.byteLength(), h = l || Math.max(1, p);
      r(p <= h, "byte array longer than desired length"), r(h > 0, "Requested array length <= 0");
      var E = Q(a, h), I = c === "le" ? "LE" : "BE";
      return this["_toArrayLike" + I](E, p), E;
    }, i.prototype._toArrayLikeLE = function(a, c) {
      for (var l = 0, p = 0, h = 0, E = 0; h < this.length; h++) {
        var I = this.words[h] << E | p;
        a[l++] = I & 255, l < a.length && (a[l++] = I >> 8 & 255), l < a.length && (a[l++] = I >> 16 & 255), E === 6 ? (l < a.length && (a[l++] = I >> 24 & 255), p = 0, E = 0) : (p = I >>> 24, E += 2);
      }
      if (l < a.length)
        for (a[l++] = p; l < a.length; )
          a[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, c) {
      for (var l = a.length - 1, p = 0, h = 0, E = 0; h < this.length; h++) {
        var I = this.words[h] << E | p;
        a[l--] = I & 255, l >= 0 && (a[l--] = I >> 8 & 255), l >= 0 && (a[l--] = I >> 16 & 255), E === 6 ? (l >= 0 && (a[l--] = I >> 24 & 255), p = 0, E = 0) : (p = I >>> 24, E += 2);
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
    function S(B) {
      for (var a = new Array(B.bitLength()), c = 0; c < a.length; c++) {
        var l = c / 26 | 0, p = c % 26;
        a[c] = B.words[l] >>> p & 1;
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
      for (var h = 0, E = 0; E < p.length; E++)
        c = (l.words[E] | 0) + (p.words[E] | 0) + h, this.words[E] = c & 67108863, h = c >>> 26;
      for (; h !== 0 && E < l.length; E++)
        c = (l.words[E] | 0) + h, this.words[E] = c & 67108863, h = c >>> 26;
      if (this.length = l.length, h !== 0)
        this.words[this.length] = h, this.length++;
      else if (l !== this)
        for (; E < l.length; E++)
          this.words[E] = l.words[E];
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
      var p, h;
      l > 0 ? (p = this, h = a) : (p = a, h = this);
      for (var E = 0, I = 0; I < h.length; I++)
        c = (p.words[I] | 0) - (h.words[I] | 0) + E, E = c >> 26, this.words[I] = c & 67108863;
      for (; E !== 0 && I < p.length; I++)
        c = (p.words[I] | 0) + E, E = c >> 26, this.words[I] = c & 67108863;
      if (E === 0 && I < p.length && p !== this)
        for (; I < p.length; I++)
          this.words[I] = p.words[I];
      return this.length = Math.max(this.length, I), p !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function _(B, a, c) {
      c.negative = a.negative ^ B.negative;
      var l = B.length + a.length | 0;
      c.length = l, l = l - 1 | 0;
      var p = B.words[0] | 0, h = a.words[0] | 0, E = p * h, I = E & 67108863, g = E / 67108864 | 0;
      c.words[0] = I;
      for (var u = 1; u < l; u++) {
        for (var m = g >>> 26, Y = g & 67108863, X = Math.min(u, a.length - 1), $ = Math.max(0, u - B.length + 1); $ <= X; $++) {
          var q = u - $ | 0;
          p = B.words[q] | 0, h = a.words[$] | 0, E = p * h + Y, m += E / 67108864 | 0, Y = E & 67108863;
        }
        c.words[u] = Y | 0, g = m | 0;
      }
      return g !== 0 ? c.words[u] = g | 0 : c.length--, c._strip();
    }
    var Z = function(a, c, l) {
      var p = a.words, h = c.words, E = l.words, I = 0, g, u, m, Y = p[0] | 0, X = Y & 8191, $ = Y >>> 13, q = p[1] | 0, ne = q & 8191, re = q >>> 13, Fe = p[2] | 0, fe = Fe & 8191, oe = Fe >>> 13, be = p[3] | 0, ue = be & 8191, ge = be >>> 13, Pt = p[4] | 0, ve = Pt & 8191, Ie = Pt >>> 13, rr = p[5] | 0, De = rr & 8191, Me = rr >>> 13, Or = p[6] | 0, Te = Or & 8191, Le = Or >>> 13, qo = p[7] | 0, Pe = qo & 8191, Ge = qo >>> 13, Wo = p[8] | 0, Ue = Wo & 8191, Je = Wo >>> 13, $o = p[9] | 0, He = $o & 8191, Ye = $o >>> 13, zo = h[0] | 0, Ze = zo & 8191, Ve = zo >>> 13, Ko = h[1] | 0, Xe = Ko & 8191, je = Ko >>> 13, ea = h[2] | 0, qe = ea & 8191, We = ea >>> 13, ta = h[3] | 0, $e = ta & 8191, ze = ta >>> 13, na = h[4] | 0, Ke = na & 8191, et = na >>> 13, ra = h[5] | 0, tt = ra & 8191, nt = ra >>> 13, sa = h[6] | 0, rt = sa & 8191, st = sa >>> 13, ia = h[7] | 0, it = ia & 8191, ot = ia >>> 13, oa = h[8] | 0, at = oa & 8191, ct = oa >>> 13, aa = h[9] | 0, At = aa & 8191, ut = aa >>> 13;
      l.negative = a.negative ^ c.negative, l.length = 19, g = Math.imul(X, Ze), u = Math.imul(X, Ve), u = u + Math.imul($, Ze) | 0, m = Math.imul($, Ve);
      var Vs = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Vs >>> 26) | 0, Vs &= 67108863, g = Math.imul(ne, Ze), u = Math.imul(ne, Ve), u = u + Math.imul(re, Ze) | 0, m = Math.imul(re, Ve), g = g + Math.imul(X, Xe) | 0, u = u + Math.imul(X, je) | 0, u = u + Math.imul($, Xe) | 0, m = m + Math.imul($, je) | 0;
      var Xs = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Xs >>> 26) | 0, Xs &= 67108863, g = Math.imul(fe, Ze), u = Math.imul(fe, Ve), u = u + Math.imul(oe, Ze) | 0, m = Math.imul(oe, Ve), g = g + Math.imul(ne, Xe) | 0, u = u + Math.imul(ne, je) | 0, u = u + Math.imul(re, Xe) | 0, m = m + Math.imul(re, je) | 0, g = g + Math.imul(X, qe) | 0, u = u + Math.imul(X, We) | 0, u = u + Math.imul($, qe) | 0, m = m + Math.imul($, We) | 0;
      var js = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (js >>> 26) | 0, js &= 67108863, g = Math.imul(ue, Ze), u = Math.imul(ue, Ve), u = u + Math.imul(ge, Ze) | 0, m = Math.imul(ge, Ve), g = g + Math.imul(fe, Xe) | 0, u = u + Math.imul(fe, je) | 0, u = u + Math.imul(oe, Xe) | 0, m = m + Math.imul(oe, je) | 0, g = g + Math.imul(ne, qe) | 0, u = u + Math.imul(ne, We) | 0, u = u + Math.imul(re, qe) | 0, m = m + Math.imul(re, We) | 0, g = g + Math.imul(X, $e) | 0, u = u + Math.imul(X, ze) | 0, u = u + Math.imul($, $e) | 0, m = m + Math.imul($, ze) | 0;
      var qs = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (qs >>> 26) | 0, qs &= 67108863, g = Math.imul(ve, Ze), u = Math.imul(ve, Ve), u = u + Math.imul(Ie, Ze) | 0, m = Math.imul(Ie, Ve), g = g + Math.imul(ue, Xe) | 0, u = u + Math.imul(ue, je) | 0, u = u + Math.imul(ge, Xe) | 0, m = m + Math.imul(ge, je) | 0, g = g + Math.imul(fe, qe) | 0, u = u + Math.imul(fe, We) | 0, u = u + Math.imul(oe, qe) | 0, m = m + Math.imul(oe, We) | 0, g = g + Math.imul(ne, $e) | 0, u = u + Math.imul(ne, ze) | 0, u = u + Math.imul(re, $e) | 0, m = m + Math.imul(re, ze) | 0, g = g + Math.imul(X, Ke) | 0, u = u + Math.imul(X, et) | 0, u = u + Math.imul($, Ke) | 0, m = m + Math.imul($, et) | 0;
      var Ws = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Ws >>> 26) | 0, Ws &= 67108863, g = Math.imul(De, Ze), u = Math.imul(De, Ve), u = u + Math.imul(Me, Ze) | 0, m = Math.imul(Me, Ve), g = g + Math.imul(ve, Xe) | 0, u = u + Math.imul(ve, je) | 0, u = u + Math.imul(Ie, Xe) | 0, m = m + Math.imul(Ie, je) | 0, g = g + Math.imul(ue, qe) | 0, u = u + Math.imul(ue, We) | 0, u = u + Math.imul(ge, qe) | 0, m = m + Math.imul(ge, We) | 0, g = g + Math.imul(fe, $e) | 0, u = u + Math.imul(fe, ze) | 0, u = u + Math.imul(oe, $e) | 0, m = m + Math.imul(oe, ze) | 0, g = g + Math.imul(ne, Ke) | 0, u = u + Math.imul(ne, et) | 0, u = u + Math.imul(re, Ke) | 0, m = m + Math.imul(re, et) | 0, g = g + Math.imul(X, tt) | 0, u = u + Math.imul(X, nt) | 0, u = u + Math.imul($, tt) | 0, m = m + Math.imul($, nt) | 0;
      var $s = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + ($s >>> 26) | 0, $s &= 67108863, g = Math.imul(Te, Ze), u = Math.imul(Te, Ve), u = u + Math.imul(Le, Ze) | 0, m = Math.imul(Le, Ve), g = g + Math.imul(De, Xe) | 0, u = u + Math.imul(De, je) | 0, u = u + Math.imul(Me, Xe) | 0, m = m + Math.imul(Me, je) | 0, g = g + Math.imul(ve, qe) | 0, u = u + Math.imul(ve, We) | 0, u = u + Math.imul(Ie, qe) | 0, m = m + Math.imul(Ie, We) | 0, g = g + Math.imul(ue, $e) | 0, u = u + Math.imul(ue, ze) | 0, u = u + Math.imul(ge, $e) | 0, m = m + Math.imul(ge, ze) | 0, g = g + Math.imul(fe, Ke) | 0, u = u + Math.imul(fe, et) | 0, u = u + Math.imul(oe, Ke) | 0, m = m + Math.imul(oe, et) | 0, g = g + Math.imul(ne, tt) | 0, u = u + Math.imul(ne, nt) | 0, u = u + Math.imul(re, tt) | 0, m = m + Math.imul(re, nt) | 0, g = g + Math.imul(X, rt) | 0, u = u + Math.imul(X, st) | 0, u = u + Math.imul($, rt) | 0, m = m + Math.imul($, st) | 0;
      var zs = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (zs >>> 26) | 0, zs &= 67108863, g = Math.imul(Pe, Ze), u = Math.imul(Pe, Ve), u = u + Math.imul(Ge, Ze) | 0, m = Math.imul(Ge, Ve), g = g + Math.imul(Te, Xe) | 0, u = u + Math.imul(Te, je) | 0, u = u + Math.imul(Le, Xe) | 0, m = m + Math.imul(Le, je) | 0, g = g + Math.imul(De, qe) | 0, u = u + Math.imul(De, We) | 0, u = u + Math.imul(Me, qe) | 0, m = m + Math.imul(Me, We) | 0, g = g + Math.imul(ve, $e) | 0, u = u + Math.imul(ve, ze) | 0, u = u + Math.imul(Ie, $e) | 0, m = m + Math.imul(Ie, ze) | 0, g = g + Math.imul(ue, Ke) | 0, u = u + Math.imul(ue, et) | 0, u = u + Math.imul(ge, Ke) | 0, m = m + Math.imul(ge, et) | 0, g = g + Math.imul(fe, tt) | 0, u = u + Math.imul(fe, nt) | 0, u = u + Math.imul(oe, tt) | 0, m = m + Math.imul(oe, nt) | 0, g = g + Math.imul(ne, rt) | 0, u = u + Math.imul(ne, st) | 0, u = u + Math.imul(re, rt) | 0, m = m + Math.imul(re, st) | 0, g = g + Math.imul(X, it) | 0, u = u + Math.imul(X, ot) | 0, u = u + Math.imul($, it) | 0, m = m + Math.imul($, ot) | 0;
      var Ks = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Ks >>> 26) | 0, Ks &= 67108863, g = Math.imul(Ue, Ze), u = Math.imul(Ue, Ve), u = u + Math.imul(Je, Ze) | 0, m = Math.imul(Je, Ve), g = g + Math.imul(Pe, Xe) | 0, u = u + Math.imul(Pe, je) | 0, u = u + Math.imul(Ge, Xe) | 0, m = m + Math.imul(Ge, je) | 0, g = g + Math.imul(Te, qe) | 0, u = u + Math.imul(Te, We) | 0, u = u + Math.imul(Le, qe) | 0, m = m + Math.imul(Le, We) | 0, g = g + Math.imul(De, $e) | 0, u = u + Math.imul(De, ze) | 0, u = u + Math.imul(Me, $e) | 0, m = m + Math.imul(Me, ze) | 0, g = g + Math.imul(ve, Ke) | 0, u = u + Math.imul(ve, et) | 0, u = u + Math.imul(Ie, Ke) | 0, m = m + Math.imul(Ie, et) | 0, g = g + Math.imul(ue, tt) | 0, u = u + Math.imul(ue, nt) | 0, u = u + Math.imul(ge, tt) | 0, m = m + Math.imul(ge, nt) | 0, g = g + Math.imul(fe, rt) | 0, u = u + Math.imul(fe, st) | 0, u = u + Math.imul(oe, rt) | 0, m = m + Math.imul(oe, st) | 0, g = g + Math.imul(ne, it) | 0, u = u + Math.imul(ne, ot) | 0, u = u + Math.imul(re, it) | 0, m = m + Math.imul(re, ot) | 0, g = g + Math.imul(X, at) | 0, u = u + Math.imul(X, ct) | 0, u = u + Math.imul($, at) | 0, m = m + Math.imul($, ct) | 0;
      var ei = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ei >>> 26) | 0, ei &= 67108863, g = Math.imul(He, Ze), u = Math.imul(He, Ve), u = u + Math.imul(Ye, Ze) | 0, m = Math.imul(Ye, Ve), g = g + Math.imul(Ue, Xe) | 0, u = u + Math.imul(Ue, je) | 0, u = u + Math.imul(Je, Xe) | 0, m = m + Math.imul(Je, je) | 0, g = g + Math.imul(Pe, qe) | 0, u = u + Math.imul(Pe, We) | 0, u = u + Math.imul(Ge, qe) | 0, m = m + Math.imul(Ge, We) | 0, g = g + Math.imul(Te, $e) | 0, u = u + Math.imul(Te, ze) | 0, u = u + Math.imul(Le, $e) | 0, m = m + Math.imul(Le, ze) | 0, g = g + Math.imul(De, Ke) | 0, u = u + Math.imul(De, et) | 0, u = u + Math.imul(Me, Ke) | 0, m = m + Math.imul(Me, et) | 0, g = g + Math.imul(ve, tt) | 0, u = u + Math.imul(ve, nt) | 0, u = u + Math.imul(Ie, tt) | 0, m = m + Math.imul(Ie, nt) | 0, g = g + Math.imul(ue, rt) | 0, u = u + Math.imul(ue, st) | 0, u = u + Math.imul(ge, rt) | 0, m = m + Math.imul(ge, st) | 0, g = g + Math.imul(fe, it) | 0, u = u + Math.imul(fe, ot) | 0, u = u + Math.imul(oe, it) | 0, m = m + Math.imul(oe, ot) | 0, g = g + Math.imul(ne, at) | 0, u = u + Math.imul(ne, ct) | 0, u = u + Math.imul(re, at) | 0, m = m + Math.imul(re, ct) | 0, g = g + Math.imul(X, At) | 0, u = u + Math.imul(X, ut) | 0, u = u + Math.imul($, At) | 0, m = m + Math.imul($, ut) | 0;
      var ti = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ti >>> 26) | 0, ti &= 67108863, g = Math.imul(He, Xe), u = Math.imul(He, je), u = u + Math.imul(Ye, Xe) | 0, m = Math.imul(Ye, je), g = g + Math.imul(Ue, qe) | 0, u = u + Math.imul(Ue, We) | 0, u = u + Math.imul(Je, qe) | 0, m = m + Math.imul(Je, We) | 0, g = g + Math.imul(Pe, $e) | 0, u = u + Math.imul(Pe, ze) | 0, u = u + Math.imul(Ge, $e) | 0, m = m + Math.imul(Ge, ze) | 0, g = g + Math.imul(Te, Ke) | 0, u = u + Math.imul(Te, et) | 0, u = u + Math.imul(Le, Ke) | 0, m = m + Math.imul(Le, et) | 0, g = g + Math.imul(De, tt) | 0, u = u + Math.imul(De, nt) | 0, u = u + Math.imul(Me, tt) | 0, m = m + Math.imul(Me, nt) | 0, g = g + Math.imul(ve, rt) | 0, u = u + Math.imul(ve, st) | 0, u = u + Math.imul(Ie, rt) | 0, m = m + Math.imul(Ie, st) | 0, g = g + Math.imul(ue, it) | 0, u = u + Math.imul(ue, ot) | 0, u = u + Math.imul(ge, it) | 0, m = m + Math.imul(ge, ot) | 0, g = g + Math.imul(fe, at) | 0, u = u + Math.imul(fe, ct) | 0, u = u + Math.imul(oe, at) | 0, m = m + Math.imul(oe, ct) | 0, g = g + Math.imul(ne, At) | 0, u = u + Math.imul(ne, ut) | 0, u = u + Math.imul(re, At) | 0, m = m + Math.imul(re, ut) | 0;
      var ni = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ni >>> 26) | 0, ni &= 67108863, g = Math.imul(He, qe), u = Math.imul(He, We), u = u + Math.imul(Ye, qe) | 0, m = Math.imul(Ye, We), g = g + Math.imul(Ue, $e) | 0, u = u + Math.imul(Ue, ze) | 0, u = u + Math.imul(Je, $e) | 0, m = m + Math.imul(Je, ze) | 0, g = g + Math.imul(Pe, Ke) | 0, u = u + Math.imul(Pe, et) | 0, u = u + Math.imul(Ge, Ke) | 0, m = m + Math.imul(Ge, et) | 0, g = g + Math.imul(Te, tt) | 0, u = u + Math.imul(Te, nt) | 0, u = u + Math.imul(Le, tt) | 0, m = m + Math.imul(Le, nt) | 0, g = g + Math.imul(De, rt) | 0, u = u + Math.imul(De, st) | 0, u = u + Math.imul(Me, rt) | 0, m = m + Math.imul(Me, st) | 0, g = g + Math.imul(ve, it) | 0, u = u + Math.imul(ve, ot) | 0, u = u + Math.imul(Ie, it) | 0, m = m + Math.imul(Ie, ot) | 0, g = g + Math.imul(ue, at) | 0, u = u + Math.imul(ue, ct) | 0, u = u + Math.imul(ge, at) | 0, m = m + Math.imul(ge, ct) | 0, g = g + Math.imul(fe, At) | 0, u = u + Math.imul(fe, ut) | 0, u = u + Math.imul(oe, At) | 0, m = m + Math.imul(oe, ut) | 0;
      var ri = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ri >>> 26) | 0, ri &= 67108863, g = Math.imul(He, $e), u = Math.imul(He, ze), u = u + Math.imul(Ye, $e) | 0, m = Math.imul(Ye, ze), g = g + Math.imul(Ue, Ke) | 0, u = u + Math.imul(Ue, et) | 0, u = u + Math.imul(Je, Ke) | 0, m = m + Math.imul(Je, et) | 0, g = g + Math.imul(Pe, tt) | 0, u = u + Math.imul(Pe, nt) | 0, u = u + Math.imul(Ge, tt) | 0, m = m + Math.imul(Ge, nt) | 0, g = g + Math.imul(Te, rt) | 0, u = u + Math.imul(Te, st) | 0, u = u + Math.imul(Le, rt) | 0, m = m + Math.imul(Le, st) | 0, g = g + Math.imul(De, it) | 0, u = u + Math.imul(De, ot) | 0, u = u + Math.imul(Me, it) | 0, m = m + Math.imul(Me, ot) | 0, g = g + Math.imul(ve, at) | 0, u = u + Math.imul(ve, ct) | 0, u = u + Math.imul(Ie, at) | 0, m = m + Math.imul(Ie, ct) | 0, g = g + Math.imul(ue, At) | 0, u = u + Math.imul(ue, ut) | 0, u = u + Math.imul(ge, At) | 0, m = m + Math.imul(ge, ut) | 0;
      var si = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (si >>> 26) | 0, si &= 67108863, g = Math.imul(He, Ke), u = Math.imul(He, et), u = u + Math.imul(Ye, Ke) | 0, m = Math.imul(Ye, et), g = g + Math.imul(Ue, tt) | 0, u = u + Math.imul(Ue, nt) | 0, u = u + Math.imul(Je, tt) | 0, m = m + Math.imul(Je, nt) | 0, g = g + Math.imul(Pe, rt) | 0, u = u + Math.imul(Pe, st) | 0, u = u + Math.imul(Ge, rt) | 0, m = m + Math.imul(Ge, st) | 0, g = g + Math.imul(Te, it) | 0, u = u + Math.imul(Te, ot) | 0, u = u + Math.imul(Le, it) | 0, m = m + Math.imul(Le, ot) | 0, g = g + Math.imul(De, at) | 0, u = u + Math.imul(De, ct) | 0, u = u + Math.imul(Me, at) | 0, m = m + Math.imul(Me, ct) | 0, g = g + Math.imul(ve, At) | 0, u = u + Math.imul(ve, ut) | 0, u = u + Math.imul(Ie, At) | 0, m = m + Math.imul(Ie, ut) | 0;
      var ii = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ii >>> 26) | 0, ii &= 67108863, g = Math.imul(He, tt), u = Math.imul(He, nt), u = u + Math.imul(Ye, tt) | 0, m = Math.imul(Ye, nt), g = g + Math.imul(Ue, rt) | 0, u = u + Math.imul(Ue, st) | 0, u = u + Math.imul(Je, rt) | 0, m = m + Math.imul(Je, st) | 0, g = g + Math.imul(Pe, it) | 0, u = u + Math.imul(Pe, ot) | 0, u = u + Math.imul(Ge, it) | 0, m = m + Math.imul(Ge, ot) | 0, g = g + Math.imul(Te, at) | 0, u = u + Math.imul(Te, ct) | 0, u = u + Math.imul(Le, at) | 0, m = m + Math.imul(Le, ct) | 0, g = g + Math.imul(De, At) | 0, u = u + Math.imul(De, ut) | 0, u = u + Math.imul(Me, At) | 0, m = m + Math.imul(Me, ut) | 0;
      var oi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (oi >>> 26) | 0, oi &= 67108863, g = Math.imul(He, rt), u = Math.imul(He, st), u = u + Math.imul(Ye, rt) | 0, m = Math.imul(Ye, st), g = g + Math.imul(Ue, it) | 0, u = u + Math.imul(Ue, ot) | 0, u = u + Math.imul(Je, it) | 0, m = m + Math.imul(Je, ot) | 0, g = g + Math.imul(Pe, at) | 0, u = u + Math.imul(Pe, ct) | 0, u = u + Math.imul(Ge, at) | 0, m = m + Math.imul(Ge, ct) | 0, g = g + Math.imul(Te, At) | 0, u = u + Math.imul(Te, ut) | 0, u = u + Math.imul(Le, At) | 0, m = m + Math.imul(Le, ut) | 0;
      var ai = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ai >>> 26) | 0, ai &= 67108863, g = Math.imul(He, it), u = Math.imul(He, ot), u = u + Math.imul(Ye, it) | 0, m = Math.imul(Ye, ot), g = g + Math.imul(Ue, at) | 0, u = u + Math.imul(Ue, ct) | 0, u = u + Math.imul(Je, at) | 0, m = m + Math.imul(Je, ct) | 0, g = g + Math.imul(Pe, At) | 0, u = u + Math.imul(Pe, ut) | 0, u = u + Math.imul(Ge, At) | 0, m = m + Math.imul(Ge, ut) | 0;
      var ci = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ci >>> 26) | 0, ci &= 67108863, g = Math.imul(He, at), u = Math.imul(He, ct), u = u + Math.imul(Ye, at) | 0, m = Math.imul(Ye, ct), g = g + Math.imul(Ue, At) | 0, u = u + Math.imul(Ue, ut) | 0, u = u + Math.imul(Je, At) | 0, m = m + Math.imul(Je, ut) | 0;
      var Ai = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Ai >>> 26) | 0, Ai &= 67108863, g = Math.imul(He, At), u = Math.imul(He, ut), u = u + Math.imul(Ye, At) | 0, m = Math.imul(Ye, ut);
      var ui = (I + g | 0) + ((u & 8191) << 13) | 0;
      return I = (m + (u >>> 13) | 0) + (ui >>> 26) | 0, ui &= 67108863, E[0] = Vs, E[1] = Xs, E[2] = js, E[3] = qs, E[4] = Ws, E[5] = $s, E[6] = zs, E[7] = Ks, E[8] = ei, E[9] = ti, E[10] = ni, E[11] = ri, E[12] = si, E[13] = ii, E[14] = oi, E[15] = ai, E[16] = ci, E[17] = Ai, E[18] = ui, I !== 0 && (E[19] = I, l.length++), l;
    };
    Math.imul || (Z = _);
    function L(B, a, c) {
      c.negative = a.negative ^ B.negative, c.length = B.length + a.length;
      for (var l = 0, p = 0, h = 0; h < c.length - 1; h++) {
        var E = p;
        p = 0;
        for (var I = l & 67108863, g = Math.min(h, a.length - 1), u = Math.max(0, h - B.length + 1); u <= g; u++) {
          var m = h - u, Y = B.words[m] | 0, X = a.words[u] | 0, $ = Y * X, q = $ & 67108863;
          E = E + ($ / 67108864 | 0) | 0, q = q + I | 0, I = q & 67108863, E = E + (q >>> 26) | 0, p += E >>> 26, E &= 67108863;
        }
        c.words[h] = I, l = E, E = p;
      }
      return l !== 0 ? c.words[h] = l : c.length--, c._strip();
    }
    function j(B, a, c) {
      return L(B, a, c);
    }
    i.prototype.mulTo = function(a, c) {
      var l, p = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = Z(this, a, c) : p < 63 ? l = _(this, a, c) : p < 1024 ? l = L(this, a, c) : l = j(this, a, c), l;
    }, i.prototype.mul = function(a) {
      var c = new i(null);
      return c.words = new Array(this.length + a.length), this.mulTo(a, c);
    }, i.prototype.mulf = function(a) {
      var c = new i(null);
      return c.words = new Array(this.length + a.length), j(this, a, c);
    }, i.prototype.imul = function(a) {
      return this.clone().mulTo(a, this);
    }, i.prototype.imuln = function(a) {
      var c = a < 0;
      c && (a = -a), r(typeof a == "number"), r(a < 67108864);
      for (var l = 0, p = 0; p < this.length; p++) {
        var h = (this.words[p] | 0) * a, E = (h & 67108863) + (l & 67108863);
        l >>= 26, l += h / 67108864 | 0, l += E >>> 26, this.words[p] = E & 67108863;
      }
      return l !== 0 && (this.words[p] = l, this.length++), c ? this.ineg() : this;
    }, i.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(a) {
      var c = S(a);
      if (c.length === 0)
        return new i(1);
      for (var l = this, p = 0; p < c.length && c[p] === 0; p++, l = l.sqr())
        ;
      if (++p < c.length)
        for (var h = l.sqr(); p < c.length; p++, h = h.sqr())
          c[p] !== 0 && (l = l.mul(h));
      return l;
    }, i.prototype.iushln = function(a) {
      r(typeof a == "number" && a >= 0);
      var c = a % 26, l = (a - c) / 26, p = 67108863 >>> 26 - c << 26 - c, h;
      if (c !== 0) {
        var E = 0;
        for (h = 0; h < this.length; h++) {
          var I = this.words[h] & p, g = (this.words[h] | 0) - I << c;
          this.words[h] = g | E, E = I >>> 26 - c;
        }
        E && (this.words[h] = E, this.length++);
      }
      if (l !== 0) {
        for (h = this.length - 1; h >= 0; h--)
          this.words[h + l] = this.words[h];
        for (h = 0; h < l; h++)
          this.words[h] = 0;
        this.length += l;
      }
      return this._strip();
    }, i.prototype.ishln = function(a) {
      return r(this.negative === 0), this.iushln(a);
    }, i.prototype.iushrn = function(a, c, l) {
      r(typeof a == "number" && a >= 0);
      var p;
      c ? p = (c - c % 26) / 26 : p = 0;
      var h = a % 26, E = Math.min((a - h) / 26, this.length), I = 67108863 ^ 67108863 >>> h << h, g = l;
      if (p -= E, p = Math.max(0, p), g) {
        for (var u = 0; u < E; u++)
          g.words[u] = this.words[u];
        g.length = E;
      }
      if (E !== 0)
        if (this.length > E)
          for (this.length -= E, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + E];
        else
          this.words[0] = 0, this.length = 1;
      var m = 0;
      for (u = this.length - 1; u >= 0 && (m !== 0 || u >= p); u--) {
        var Y = this.words[u] | 0;
        this.words[u] = m << 26 - h | Y >>> h, m = Y & I;
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
      var h = this.words[l];
      return !!(h & p);
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
      var p = a.length + l, h;
      this._expand(p);
      var E, I = 0;
      for (h = 0; h < a.length; h++) {
        E = (this.words[h + l] | 0) + I;
        var g = (a.words[h] | 0) * c;
        E -= g & 67108863, I = (E >> 26) - (g / 67108864 | 0), this.words[h + l] = E & 67108863;
      }
      for (; h < this.length - l; h++)
        E = (this.words[h + l] | 0) + I, I = E >> 26, this.words[h + l] = E & 67108863;
      if (I === 0)
        return this._strip();
      for (r(I === -1), I = 0, h = 0; h < this.length; h++)
        E = -(this.words[h] | 0) + I, I = E >> 26, this.words[h] = E & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, c) {
      var l = this.length - a.length, p = this.clone(), h = a, E = h.words[h.length - 1] | 0, I = this._countBits(E);
      l = 26 - I, l !== 0 && (h = h.ushln(l), p.iushln(l), E = h.words[h.length - 1] | 0);
      var g = p.length - h.length, u;
      if (c !== "mod") {
        u = new i(null), u.length = g + 1, u.words = new Array(u.length);
        for (var m = 0; m < u.length; m++)
          u.words[m] = 0;
      }
      var Y = p.clone()._ishlnsubmul(h, 1, g);
      Y.negative === 0 && (p = Y, u && (u.words[g] = 1));
      for (var X = g - 1; X >= 0; X--) {
        var $ = (p.words[h.length + X] | 0) * 67108864 + (p.words[h.length + X - 1] | 0);
        for ($ = Math.min($ / E | 0, 67108863), p._ishlnsubmul(h, $, X); p.negative !== 0; )
          $--, p.negative = 0, p._ishlnsubmul(h, 1, X), p.isZero() || (p.negative ^= 1);
        u && (u.words[X] = $);
      }
      return u && u._strip(), p._strip(), c !== "div" && l !== 0 && p.iushrn(l), {
        div: u || null,
        mod: p
      };
    }, i.prototype.divmod = function(a, c, l) {
      if (r(!a.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var p, h, E;
      return this.negative !== 0 && a.negative === 0 ? (E = this.neg().divmod(a, c), c !== "mod" && (p = E.div.neg()), c !== "div" && (h = E.mod.neg(), l && h.negative !== 0 && h.iadd(a)), {
        div: p,
        mod: h
      }) : this.negative === 0 && a.negative !== 0 ? (E = this.divmod(a.neg(), c), c !== "mod" && (p = E.div.neg()), {
        div: p,
        mod: E.mod
      }) : this.negative & a.negative ? (E = this.neg().divmod(a.neg(), c), c !== "div" && (h = E.mod.neg(), l && h.negative !== 0 && h.isub(a)), {
        div: E.div,
        mod: h
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
      var l = c.div.negative !== 0 ? c.mod.isub(a) : c.mod, p = a.ushrn(1), h = a.andln(1), E = l.cmp(p);
      return E < 0 || h === 1 && E === 0 ? c.div : c.div.negative !== 0 ? c.div.isubn(1) : c.div.iaddn(1);
    }, i.prototype.modrn = function(a) {
      var c = a < 0;
      c && (a = -a), r(a <= 67108863);
      for (var l = (1 << 26) % a, p = 0, h = this.length - 1; h >= 0; h--)
        p = (l * p + (this.words[h] | 0)) % a;
      return c ? -p : p;
    }, i.prototype.modn = function(a) {
      return this.modrn(a);
    }, i.prototype.idivn = function(a) {
      var c = a < 0;
      c && (a = -a), r(a <= 67108863);
      for (var l = 0, p = this.length - 1; p >= 0; p--) {
        var h = (this.words[p] | 0) + l * 67108864;
        this.words[p] = h / a | 0, l = h % a;
      }
      return this._strip(), c ? this.ineg() : this;
    }, i.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, i.prototype.egcd = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var c = this, l = a.clone();
      c.negative !== 0 ? c = c.umod(a) : c = c.clone();
      for (var p = new i(1), h = new i(0), E = new i(0), I = new i(1), g = 0; c.isEven() && l.isEven(); )
        c.iushrn(1), l.iushrn(1), ++g;
      for (var u = l.clone(), m = c.clone(); !c.isZero(); ) {
        for (var Y = 0, X = 1; !(c.words[0] & X) && Y < 26; ++Y, X <<= 1)
          ;
        if (Y > 0)
          for (c.iushrn(Y); Y-- > 0; )
            (p.isOdd() || h.isOdd()) && (p.iadd(u), h.isub(m)), p.iushrn(1), h.iushrn(1);
        for (var $ = 0, q = 1; !(l.words[0] & q) && $ < 26; ++$, q <<= 1)
          ;
        if ($ > 0)
          for (l.iushrn($); $-- > 0; )
            (E.isOdd() || I.isOdd()) && (E.iadd(u), I.isub(m)), E.iushrn(1), I.iushrn(1);
        c.cmp(l) >= 0 ? (c.isub(l), p.isub(E), h.isub(I)) : (l.isub(c), E.isub(p), I.isub(h));
      }
      return {
        a: E,
        b: I,
        gcd: l.iushln(g)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var c = this, l = a.clone();
      c.negative !== 0 ? c = c.umod(a) : c = c.clone();
      for (var p = new i(1), h = new i(0), E = l.clone(); c.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var I = 0, g = 1; !(c.words[0] & g) && I < 26; ++I, g <<= 1)
          ;
        if (I > 0)
          for (c.iushrn(I); I-- > 0; )
            p.isOdd() && p.iadd(E), p.iushrn(1);
        for (var u = 0, m = 1; !(l.words[0] & m) && u < 26; ++u, m <<= 1)
          ;
        if (u > 0)
          for (l.iushrn(u); u-- > 0; )
            h.isOdd() && h.iadd(E), h.iushrn(1);
        c.cmp(l) >= 0 ? (c.isub(l), p.isub(h)) : (l.isub(c), h.isub(p));
      }
      var Y;
      return c.cmpn(1) === 0 ? Y = p : Y = h, Y.cmpn(0) < 0 && Y.iadd(a), Y;
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
        var h = c.cmp(l);
        if (h < 0) {
          var E = c;
          c = l, l = E;
        } else if (h === 0 || l.cmpn(1) === 0)
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
      for (var h = p, E = l; h !== 0 && E < this.length; E++) {
        var I = this.words[E] | 0;
        I += h, h = I >>> 26, I &= 67108863, this.words[E] = I;
      }
      return h !== 0 && (this.words[E] = h, this.length++), this;
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
        var p = this.words[l] | 0, h = a.words[l] | 0;
        if (p !== h) {
          p < h ? c = -1 : p > h && (c = 1);
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
      return new J(a);
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
    var k = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function M(B, a) {
      this.name = B, this.p = new i(a, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    M.prototype._tmp = function() {
      var a = new i(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, M.prototype.ireduce = function(a) {
      var c = a, l;
      do
        this.split(c, this.tmp), c = this.imulK(c), c = c.iadd(this.tmp), l = c.bitLength();
      while (l > this.n);
      var p = l < this.n ? -1 : c.ucmp(this.p);
      return p === 0 ? (c.words[0] = 0, c.length = 1) : p > 0 ? c.isub(this.p) : c.strip !== void 0 ? c.strip() : c._strip(), c;
    }, M.prototype.split = function(a, c) {
      a.iushrn(this.n, 0, c);
    }, M.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function O() {
      M.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(O, M), O.prototype.split = function(a, c) {
      for (var l = 4194303, p = Math.min(a.length, 9), h = 0; h < p; h++)
        c.words[h] = a.words[h];
      if (c.length = p, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var E = a.words[9];
      for (c.words[c.length++] = E & l, h = 10; h < a.length; h++) {
        var I = a.words[h] | 0;
        a.words[h - 10] = (I & l) << 4 | E >>> 22, E = I;
      }
      E >>>= 22, a.words[h - 10] = E, E === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, O.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var c = 0, l = 0; l < a.length; l++) {
        var p = a.words[l] | 0;
        c += p * 977, a.words[l] = c & 67108863, c = p * 64 + (c / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function P() {
      M.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(P, M);
    function W() {
      M.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(W, M);
    function G() {
      M.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(G, M), G.prototype.imulK = function(a) {
      for (var c = 0, l = 0; l < a.length; l++) {
        var p = (a.words[l] | 0) * 19 + c, h = p & 67108863;
        p >>>= 26, a.words[l] = h, c = p;
      }
      return c !== 0 && (a.words[a.length++] = c), a;
    }, i._prime = function(a) {
      if (k[a])
        return k[a];
      var c;
      if (a === "k256")
        c = new O();
      else if (a === "p224")
        c = new P();
      else if (a === "p192")
        c = new W();
      else if (a === "p25519")
        c = new G();
      else
        throw new Error("Unknown prime " + a);
      return k[a] = c, c;
    };
    function J(B) {
      if (typeof B == "string") {
        var a = i._prime(B);
        this.m = a.p, this.prime = a;
      } else
        r(B.gtn(1), "modulus must be greater than 1"), this.m = B, this.prime = null;
    }
    J.prototype._verify1 = function(a) {
      r(a.negative === 0, "red works only with positives"), r(a.red, "red works only with red numbers");
    }, J.prototype._verify2 = function(a, c) {
      r((a.negative | c.negative) === 0, "red works only with positives"), r(
        a.red && a.red === c.red,
        "red works only with red numbers"
      );
    }, J.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (y(a, a.umod(this.m)._forceRed(this)), a);
    }, J.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, J.prototype.add = function(a, c) {
      this._verify2(a, c);
      var l = a.add(c);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, J.prototype.iadd = function(a, c) {
      this._verify2(a, c);
      var l = a.iadd(c);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, J.prototype.sub = function(a, c) {
      this._verify2(a, c);
      var l = a.sub(c);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, J.prototype.isub = function(a, c) {
      this._verify2(a, c);
      var l = a.isub(c);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, J.prototype.shl = function(a, c) {
      return this._verify1(a), this.imod(a.ushln(c));
    }, J.prototype.imul = function(a, c) {
      return this._verify2(a, c), this.imod(a.imul(c));
    }, J.prototype.mul = function(a, c) {
      return this._verify2(a, c), this.imod(a.mul(c));
    }, J.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, J.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, J.prototype.sqrt = function(a) {
      if (a.isZero())
        return a.clone();
      var c = this.m.andln(3);
      if (r(c % 2 === 1), c === 3) {
        var l = this.m.add(new i(1)).iushrn(2);
        return this.pow(a, l);
      }
      for (var p = this.m.subn(1), h = 0; !p.isZero() && p.andln(1) === 0; )
        h++, p.iushrn(1);
      r(!p.isZero());
      var E = new i(1).toRed(this), I = E.redNeg(), g = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, g).cmp(I) !== 0; )
        u.redIAdd(I);
      for (var m = this.pow(u, p), Y = this.pow(a, p.addn(1).iushrn(1)), X = this.pow(a, p), $ = h; X.cmp(E) !== 0; ) {
        for (var q = X, ne = 0; q.cmp(E) !== 0; ne++)
          q = q.redSqr();
        r(ne < $);
        var re = this.pow(m, new i(1).iushln($ - ne - 1));
        Y = Y.redMul(re), m = re.redSqr(), X = X.redMul(m), $ = ne;
      }
      return Y;
    }, J.prototype.invm = function(a) {
      var c = a._invmp(this.m);
      return c.negative !== 0 ? (c.negative = 0, this.imod(c).redNeg()) : this.imod(c);
    }, J.prototype.pow = function(a, c) {
      if (c.isZero())
        return new i(1).toRed(this);
      if (c.cmpn(1) === 0)
        return a.clone();
      var l = 4, p = new Array(1 << l);
      p[0] = new i(1).toRed(this), p[1] = a;
      for (var h = 2; h < p.length; h++)
        p[h] = this.mul(p[h - 1], a);
      var E = p[0], I = 0, g = 0, u = c.bitLength() % 26;
      for (u === 0 && (u = 26), h = c.length - 1; h >= 0; h--) {
        for (var m = c.words[h], Y = u - 1; Y >= 0; Y--) {
          var X = m >> Y & 1;
          if (E !== p[0] && (E = this.sqr(E)), X === 0 && I === 0) {
            g = 0;
            continue;
          }
          I <<= 1, I |= X, g++, !(g !== l && (h !== 0 || Y !== 0)) && (E = this.mul(E, p[I]), g = 0, I = 0);
        }
        u = 26;
      }
      return E;
    }, J.prototype.convertTo = function(a) {
      var c = a.umod(this.m);
      return c === a ? c.clone() : c;
    }, J.prototype.convertFrom = function(a) {
      var c = a.clone();
      return c.red = null, c;
    }, i.mont = function(a) {
      return new ee(a);
    };
    function ee(B) {
      J.call(this, B), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(ee, J), ee.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, ee.prototype.convertFrom = function(a) {
      var c = this.imod(a.mul(this.rinv));
      return c.red = null, c;
    }, ee.prototype.imul = function(a, c) {
      if (a.isZero() || c.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var l = a.imul(c), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = l.isub(p).iushrn(this.shift), E = h;
      return h.cmp(this.m) >= 0 ? E = h.isub(this.m) : h.cmpn(0) < 0 && (E = h.iadd(this.m)), E._forceRed(this);
    }, ee.prototype.mul = function(a, c) {
      if (a.isZero() || c.isZero())
        return new i(0)._forceRed(this);
      var l = a.mul(c), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = l.isub(p).iushrn(this.shift), E = h;
      return h.cmp(this.m) >= 0 ? E = h.isub(this.m) : h.cmpn(0) < 0 && (E = h.iadd(this.m)), E._forceRed(this);
    }, ee.prototype.invm = function(a) {
      var c = this.imod(a._invmp(this.m).mul(this.r2));
      return c._forceRed(this);
    };
  })(e, Be);
})(eo);
var Wd = eo.exports;
const Tr = /* @__PURE__ */ Vd(Wd);
var Fc = 9, Dc = 3, Qi = 9;
function $d(e, t) {
  const { precision: n = Fc, minPrecision: r = Dc } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, A = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const y = d.match(/.*[1-9]{1}/), w = (y == null ? void 0 : y[0].length) || 0, b = Math.max(r, w);
    d = d.slice(0, b);
  }
  const f = d ? `.${d}` : "";
  return `${A}${f}`;
}
var ke = class extends Tr {
  constructor(t, n, r) {
    let s = t, i = n;
    ke.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
    super(s ?? 0, i, r);
    R(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      throw new v(F.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new v(
        F.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new v(F.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: n = Qi,
      precision: r = Fc,
      minPrecision: s = Dc
    } = t || {}, i = this.formatUnits(n), o = $d(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, A = "0"] = i.split("."), d = A.match(/[1-9]/);
      if (d && d.index && d.index + 1 > r) {
        const [f = "0"] = o.split(".");
        return `${f}.${A.slice(0, d.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = Qi) {
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
    return new ke(super.sqr().toArray());
  }
  neg() {
    return new ke(super.neg().toArray());
  }
  abs() {
    return new ke(super.abs().toArray());
  }
  toTwos(t) {
    return new ke(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new ke(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, n) {
    const r = super[n](new ke(t));
    return ke.isBN(r) ? new ke(r.toArray()) : r;
  }
  clone() {
    return new ke(this.toArray());
  }
  mulTo(t, n) {
    const r = new Tr(this.toArray()).mulTo(t, n);
    return new ke(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new Tr(this.toArray()).egcd(t);
    return {
      a: new ke(n.toArray()),
      b: new ke(r.toArray()),
      gcd: new ke(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new Tr(this.toArray()).divmod(new ke(t), n, r);
    return {
      div: new ke(s == null ? void 0 : s.toArray()),
      mod: new ke(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new ke(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new ke(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, C = (e, t, n) => new ke(e, t, n);
C.parseUnits = (e, t = Qi) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new v(
      F.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const A = `${r.replaceAll(",", "")}${o.join("")}`;
  return C(A);
};
function Ft(e) {
  return C(e).toNumber();
}
function as(e, t) {
  return C(e).toHex(t);
}
function Lt(e, t) {
  return C(e).toBytes(t);
}
function mw(e, t) {
  return C(e).formatUnits(t);
}
function Ew(e, t) {
  return C(e).format(t);
}
function zd(...e) {
  return e.reduce((t, n) => C(n).gt(t) ? C(n) : t, C(0));
}
function ww(...e) {
  return C(Math.ceil(e.reduce((t, n) => C(t).mul(n), C(1)).toNumber()));
}
var Kd = Object.defineProperty, e0 = (e, t, n) => t in e ? Kd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, t0 = (e, t, n) => (e0(e, typeof t != "symbol" ? t + "" : t, n), n), Iw = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, Rc = (e, t) => {
  const n = [];
  for (let A = 0; A < e.length; A += t) {
    const d = new Uint8Array(t);
    d.set(e.slice(A, A + t)), n.push(d);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, H = (e) => {
  if (e instanceof Uint8Array)
    return new Uint8Array(e);
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const t = new Uint8Array((e.length - 2) / 2);
    let n = 2;
    for (let r = 0; r < t.length; r++)
      t[r] = parseInt(e.substring(n, n + 2), 16), n += 2;
    return t;
  }
  throw new v(F.PARSE_FAILED, "invalid BytesLike value");
}, br = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, se = (e) => {
  const t = e.map((n) => H(n));
  return br(t);
}, Aa = "0123456789abcdef";
function V(e) {
  const t = H(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Aa[(s & 240) >> 4] + Aa[s & 15];
  }
  return n;
}
var yw = (e) => {
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
    throw new v(F.PARSE_FAILED, r);
  }
  return n;
}, n0 = 37, Nc = BigInt(2 ** 62) + BigInt(n0), r0 = (e) => Math.floor(e / 1e3), Sc = (e) => e * 1e3, s0 = (e) => Number(BigInt(e) - Nc), i0 = (e) => String(BigInt(e) + Nc), o0 = (e) => Sc(s0(e)), jr = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new jr(o0(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new jr(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new jr(Sc(e));
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
    return i0(this.toUnixSeconds());
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
    return r0(this.getTime());
  }
}, to = jr;
t0(to, "TAI64_NULL", "");
var a0 = {
  chain_name: "local_testnet",
  block_gas_limit: 5e9,
  initial_state: {
    coins: [
      {
        owner: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      }
    ],
    messages: [
      {
        sender: "0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f",
        recipient: "0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba",
        nonce: "0101010101010101010101010101010101010101010101010101010101010101",
        amount: "0x000000000000FFFF",
        data: "",
        da_height: "0x00"
      },
      {
        sender: "0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba",
        recipient: "0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f",
        nonce: "0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b",
        amount: "0xb04f3c08f59b309e",
        data: "",
        da_height: "0x00"
      }
    ]
  },
  consensus_parameters: {
    tx_params: {
      max_inputs: 255,
      max_outputs: 255,
      max_witnesses: 255,
      max_gas_per_tx: 1e7,
      max_size: 17825792
    },
    predicate_params: {
      max_predicate_length: 1048576,
      max_predicate_data_length: 1048576,
      max_gas_per_predicate: 1e7,
      max_message_data_length: 1048576
    },
    script_params: {
      max_script_length: 1048576,
      max_script_data_length: 1048576
    },
    contract_params: {
      contract_max_size: 16777216,
      max_storage_slots: 255
    },
    fee_params: {
      gas_price_factor: 92,
      gas_per_byte: 4
    }
  },
  gas_costs: {
    add: 1,
    addi: 1,
    aloc: 1,
    and: 1,
    andi: 1,
    bal: 13,
    bhei: 1,
    bhsh: 1,
    burn: 132,
    cb: 1,
    cfei: 1,
    cfsi: 1,
    croo: 16,
    div: 1,
    divi: 1,
    ecr1: 3e3,
    eck1: 951,
    ed19: 3e3,
    eq: 1,
    exp: 1,
    expi: 1,
    flag: 1,
    gm: 1,
    gt: 1,
    gtf: 1,
    ji: 1,
    jmp: 1,
    jne: 1,
    jnei: 1,
    jnzi: 1,
    jmpf: 1,
    jmpb: 1,
    jnzf: 1,
    jnzb: 1,
    jnef: 1,
    jneb: 1,
    lb: 1,
    log: 9,
    lt: 1,
    lw: 1,
    mint: 135,
    mlog: 1,
    modOp: 1,
    modi: 1,
    moveOp: 1,
    movi: 1,
    mroo: 2,
    mul: 1,
    muli: 1,
    mldv: 1,
    noop: 1,
    not: 1,
    or: 1,
    ori: 1,
    poph: 2,
    popl: 2,
    pshh: 2,
    pshl: 2,
    ret: 13,
    rvrt: 13,
    sb: 1,
    sll: 1,
    slli: 1,
    srl: 1,
    srli: 1,
    srw: 12,
    sub: 1,
    subi: 1,
    sw: 1,
    sww: 67,
    time: 1,
    tr: 105,
    tro: 60,
    wdcm: 1,
    wqcm: 1,
    wdop: 1,
    wqop: 1,
    wdml: 1,
    wqml: 1,
    wddv: 1,
    wqdv: 2,
    wdmd: 3,
    wqmd: 4,
    wdam: 2,
    wqam: 3,
    wdmm: 3,
    wqmm: 3,
    xor: 1,
    xori: 1,
    call: {
      LightOperation: {
        base: 144,
        units_per_gas: 214
      }
    },
    ccp: {
      LightOperation: {
        base: 15,
        units_per_gas: 103
      }
    },
    csiz: {
      LightOperation: {
        base: 17,
        units_per_gas: 790
      }
    },
    k256: {
      LightOperation: {
        base: 11,
        units_per_gas: 214
      }
    },
    ldc: {
      LightOperation: {
        base: 15,
        units_per_gas: 272
      }
    },
    logd: {
      LightOperation: {
        base: 26,
        units_per_gas: 64
      }
    },
    mcl: {
      LightOperation: {
        base: 1,
        units_per_gas: 3333
      }
    },
    mcli: {
      LightOperation: {
        base: 1,
        units_per_gas: 3333
      }
    },
    mcp: {
      LightOperation: {
        base: 1,
        units_per_gas: 2e3
      }
    },
    mcpi: {
      LightOperation: {
        base: 3,
        units_per_gas: 2e3
      }
    },
    meq: {
      LightOperation: {
        base: 1,
        units_per_gas: 2500
      }
    },
    retd: {
      LightOperation: {
        base: 29,
        units_per_gas: 62
      }
    },
    s256: {
      LightOperation: {
        base: 2,
        units_per_gas: 214
      }
    },
    scwq: {
      LightOperation: {
        base: 13,
        units_per_gas: 5
      }
    },
    smo: {
      LightOperation: {
        base: 209,
        units_per_gas: 55
      }
    },
    srwq: {
      LightOperation: {
        base: 47,
        units_per_gas: 5
      }
    },
    swwq: {
      LightOperation: {
        base: 44,
        units_per_gas: 5
      }
    },
    contract_root: {
      LightOperation: {
        base: 75,
        units_per_gas: 1
      }
    },
    state_root: {
      LightOperation: {
        base: 412,
        units_per_gas: 1
      }
    },
    vm_initialization: {
      HeavyOperation: {
        base: 2e3,
        gas_per_unit: 0
      }
    },
    new_storage_per_byte: 1
  },
  consensus: {
    PoA: {
      signing_key: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"
    }
  }
}, Bw = a0, Cw = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function no(e, t, n) {
  if (e instanceof Uint8Array)
    return n ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((e.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(e.substring(s, s + 2), 16), s += 2;
    return r;
  }
  throw new v(F.INVALID_DATA, `invalid data - ${t || ""}`);
}
var _c = C(0), bi = C(58), cs = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", Lr = null;
function c0(e) {
  if (Lr == null) {
    Lr = {};
    for (let n = 0; n < cs.length; n++)
      Lr[cs[n]] = C(n);
  }
  const t = Lr[e];
  if (t == null)
    throw new v(F.INVALID_DATA, `invalid base58 value ${e}`);
  return C(t);
}
function Mc(e) {
  const t = no(e);
  let n = C(t), r = "";
  for (; n.gt(_c); )
    r = cs[Number(n.mod(bi))] + r, n = n.div(bi);
  for (let s = 0; s < t.length && !t[s]; s++)
    r = cs[0] + r;
  return r;
}
function A0(e) {
  let t = _c;
  for (let n = 0; n < e.length; n++)
    t = t.mul(bi), t = t.add(c0(e[n].toString()));
  return t;
}
function ro(e, t, n) {
  const r = no(e);
  if (n != null && n > r.length)
    throw new v(F.BUFFER_OVERRUN, "cannot slice beyond data bounds");
  return V(r.slice(t ?? 0, n ?? r.length));
}
const u0 = "6.7.1";
function d0(e, t, n) {
  const r = t.split("|").map((i) => i.trim());
  for (let i = 0; i < r.length; i++)
    switch (t) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof e === t)
          return;
    }
  const s = new Error(`invalid value for type ${t}`);
  throw s.code = "INVALID_ARGUMENT", s.argument = `value.${n}`, s.value = e, s;
}
function l0(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && d0(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function Nn(e) {
  if (e == null)
    return "null";
  if (Array.isArray(e))
    return "[ " + e.map(Nn).join(", ") + " ]";
  if (e instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < e.length; r++)
      n += t[e[r] >> 4], n += t[e[r] & 15];
    return n;
  }
  if (typeof e == "object" && typeof e.toJSON == "function")
    return Nn(e.toJSON());
  switch (typeof e) {
    case "boolean":
    case "symbol":
      return e.toString();
    case "bigint":
      return BigInt(e).toString();
    case "number":
      return e.toString();
    case "string":
      return JSON.stringify(e);
    case "object": {
      const t = Object.keys(e);
      return t.sort(), "{ " + t.map((n) => `${Nn(n)}: ${Nn(e[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function h0(e, t, n) {
  {
    const s = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${Nn(n)}`);
      for (const i in n) {
        const o = n[i];
        s.push(i + "=" + Nn(o));
      }
    }
    s.push(`code=${t}`), s.push(`version=${u0}`), s.length && (e += " (" + s.join(", ") + ")");
  }
  let r;
  switch (t) {
    case "INVALID_ARGUMENT":
      r = new TypeError(e);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      r = new RangeError(e);
      break;
    default:
      r = new Error(e);
  }
  return l0(r, { code: t }), n && Object.assign(r, n), r;
}
function kc(e, t, n, r) {
  if (!e)
    throw h0(t, n, r);
}
function Ns(e, t, n, r) {
  kc(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const f0 = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
  try {
    if ("test".normalize(t) !== "test")
      throw new Error("bad");
    if (t === "NFD") {
      const n = String.fromCharCode(233).normalize("NFD"), r = String.fromCharCode(101, 769);
      if (n !== r)
        throw new Error("broken");
    }
    e.push(t);
  } catch {
  }
  return e;
}, []);
function g0(e) {
  kc(f0.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function p0(e, t, n) {
  if (e instanceof Uint8Array)
    return n ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((e.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(e.substring(s, s + 2), 16), s += 2;
    return r;
  }
  Ns(!1, "invalid BytesLike value", t || "value", e);
}
function m0(e, t) {
  return p0(e, t, !1);
}
function E0(e, t, n, r, s) {
  Ns(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function Oc(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function w0(e, t, n, r, s) {
  return e === "OVERLONG" ? (Ns(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), Oc(e, t, n));
}
const I0 = Object.freeze({
  error: E0,
  ignore: Oc,
  replace: w0
});
function y0(e, t) {
  t == null && (t = I0.error);
  const n = m0(e, "bytes"), r = [];
  let s = 0;
  for (; s < n.length; ) {
    const i = n[s++];
    if (!(i >> 7)) {
      r.push(i);
      continue;
    }
    let o = null, A = null;
    if ((i & 224) === 192)
      o = 1, A = 127;
    else if ((i & 240) === 224)
      o = 2, A = 2047;
    else if ((i & 248) === 240)
      o = 3, A = 65535;
    else {
      (i & 192) === 128 ? s += t("UNEXPECTED_CONTINUE", s - 1, n, r) : s += t("BAD_PREFIX", s - 1, n, r);
      continue;
    }
    if (s - 1 + o >= n.length) {
      s += t("OVERRUN", s - 1, n, r);
      continue;
    }
    let d = i & (1 << 8 - o - 1) - 1;
    for (let f = 0; f < o; f++) {
      let y = n[s];
      if ((y & 192) != 128) {
        s += t("MISSING_CONTINUE", s, n, r), d = null;
        break;
      }
      d = d << 6 | y & 63, s++;
    }
    if (d !== null) {
      if (d > 1114111) {
        s += t("OUT_OF_RANGE", s - 1 - o, n, r, d);
        continue;
      }
      if (d >= 55296 && d <= 57343) {
        s += t("UTF16_SURROGATE", s - 1 - o, n, r, d);
        continue;
      }
      if (d <= A) {
        s += t("OVERLONG", s - 1 - o, n, r, d);
        continue;
      }
      r.push(d);
    }
  }
  return r;
}
function vr(e, t) {
  t != null && (g0(t), e = e.normalize(t));
  let n = [];
  for (let r = 0; r < e.length; r++) {
    const s = e.charCodeAt(r);
    if (s < 128)
      n.push(s);
    else if (s < 2048)
      n.push(s >> 6 | 192), n.push(s & 63 | 128);
    else if ((s & 64512) == 55296) {
      r++;
      const i = e.charCodeAt(r);
      Ns(r < e.length && (i & 64512) === 56320, "invalid surrogate pair", "str", e);
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return new Uint8Array(n);
}
function B0(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function xr(e, t) {
  return B0(y0(e, t));
}
function xt(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function C0(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function so(e, ...t) {
  if (!C0(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Tc(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  xt(e.outputLen), xt(e.blockLen);
}
function Zn(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Lc(e, t) {
  so(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const li = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const qr = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function Pc(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Wr = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Gt = (e, t) => e << 32 - t | e >>> t, Q0 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Q0)
  throw new Error("Non little-endian hardware is not supported");
function b0(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Vn(e) {
  if (typeof e == "string" && (e = b0(e)), !Pc(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function v0(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!Pc(s))
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
class io {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const x0 = {}.toString;
function Gc(e, t) {
  if (t !== void 0 && x0.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function Ss(e) {
  const t = (r) => e().update(Vn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function F0(e = 32) {
  if (li && typeof li.getRandomValues == "function")
    return li.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function D0(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), A = Number(n & i), d = r ? 4 : 0, f = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + f, A, r);
}
class oo extends io {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Wr(this.buffer);
  }
  update(t) {
    Zn(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Vn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const A = Math.min(s - this.pos, i - o);
      if (A === s) {
        const d = Wr(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + A), this.pos), this.pos += A, o += A, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Zn(this), Lc(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let w = o; w < s; w++)
      n[w] = 0;
    D0(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const A = Wr(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const f = d / 4, y = this.get();
    if (f > y.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let w = 0; w < f; w++)
      A.setUint32(4 * w, y[w], i);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: A } = this;
    return t.length = s, t.pos = A, t.finished = i, t.destroyed = o, s % n && t.buffer.set(r), t;
  }
}
const R0 = (e, t, n) => e & t ^ ~e & n, N0 = (e, t, n) => e & t ^ e & n ^ t & n, S0 = /* @__PURE__ */ new Uint32Array([
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
]), rn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), sn = /* @__PURE__ */ new Uint32Array(64);
class _0 extends oo {
  constructor() {
    super(64, 32, 8, !1), this.A = rn[0] | 0, this.B = rn[1] | 0, this.C = rn[2] | 0, this.D = rn[3] | 0, this.E = rn[4] | 0, this.F = rn[5] | 0, this.G = rn[6] | 0, this.H = rn[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: A, H: d } = this;
    return [t, n, r, s, i, o, A, d];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, A, d) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = A | 0, this.H = d | 0;
  }
  process(t, n) {
    for (let w = 0; w < 16; w++, n += 4)
      sn[w] = t.getUint32(n, !1);
    for (let w = 16; w < 64; w++) {
      const b = sn[w - 15], x = sn[w - 2], D = Gt(b, 7) ^ Gt(b, 18) ^ b >>> 3, Q = Gt(x, 17) ^ Gt(x, 19) ^ x >>> 10;
      sn[w] = Q + sn[w - 7] + D + sn[w - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: A, F: d, G: f, H: y } = this;
    for (let w = 0; w < 64; w++) {
      const b = Gt(A, 6) ^ Gt(A, 11) ^ Gt(A, 25), x = y + b + R0(A, d, f) + S0[w] + sn[w] | 0, Q = (Gt(r, 2) ^ Gt(r, 13) ^ Gt(r, 22)) + N0(r, s, i) | 0;
      y = f, f = d, d = A, A = o + x | 0, o = i, i = s, s = r, r = x + Q | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, A = A + this.E | 0, d = d + this.F | 0, f = f + this.G | 0, y = y + this.H | 0, this.set(r, s, i, o, A, d, f, y);
  }
  roundClean() {
    sn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const vn = /* @__PURE__ */ Ss(() => new _0());
class Uc extends io {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Tc(t);
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
    return Zn(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Zn(this), so(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: A } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = A, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const _s = (e, t, n) => new Uc(e, t).update(n).digest();
_s.create = (e, t) => new Uc(e, t);
function M0(e, t, n, r) {
  Tc(e);
  const s = Gc({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: A } = s;
  if (xt(i), xt(o), xt(A), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = Vn(t), f = Vn(n), y = new Uint8Array(o), w = _s.create(e, d), b = w._cloneInto().update(f);
  return { c: i, dkLen: o, asyncTick: A, DK: y, PRF: w, PRFSalt: b };
}
function k0(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function ao(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: A, PRFSalt: d } = M0(e, t, n, r);
  let f;
  const y = new Uint8Array(4), w = Wr(y), b = new Uint8Array(A.outputLen);
  for (let x = 1, D = 0; D < i; x++, D += A.outputLen) {
    const Q = o.subarray(D, D + A.outputLen);
    w.setInt32(0, x, !1), (f = d._cloneInto(f)).update(y).digestInto(b), Q.set(b.subarray(0, Q.length));
    for (let S = 1; S < s; S++) {
      A._cloneInto(f).update(b).digestInto(b);
      for (let _ = 0; _ < Q.length; _++)
        Q[_] ^= b[_];
    }
  }
  return k0(A, d, o, f, b);
}
const me = (e, t) => e << t | e >>> 32 - t;
function ua(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], A = e[t++] ^ n[r++], d = e[t++] ^ n[r++], f = e[t++] ^ n[r++], y = e[t++] ^ n[r++], w = e[t++] ^ n[r++], b = e[t++] ^ n[r++], x = e[t++] ^ n[r++], D = e[t++] ^ n[r++], Q = e[t++] ^ n[r++], S = e[t++] ^ n[r++], _ = e[t++] ^ n[r++], Z = e[t++] ^ n[r++], L = e[t++] ^ n[r++], j = e[t++] ^ n[r++], k = e[t++] ^ n[r++], M = o, O = A, P = d, W = f, G = y, J = w, ee = b, B = x, a = D, c = Q, l = S, p = _, h = Z, E = L, I = j, g = k;
  for (let u = 0; u < 8; u += 2)
    G ^= me(M + h | 0, 7), a ^= me(G + M | 0, 9), h ^= me(a + G | 0, 13), M ^= me(h + a | 0, 18), c ^= me(J + O | 0, 7), E ^= me(c + J | 0, 9), O ^= me(E + c | 0, 13), J ^= me(O + E | 0, 18), I ^= me(l + ee | 0, 7), P ^= me(I + l | 0, 9), ee ^= me(P + I | 0, 13), l ^= me(ee + P | 0, 18), W ^= me(g + p | 0, 7), B ^= me(W + g | 0, 9), p ^= me(B + W | 0, 13), g ^= me(p + B | 0, 18), O ^= me(M + W | 0, 7), P ^= me(O + M | 0, 9), W ^= me(P + O | 0, 13), M ^= me(W + P | 0, 18), ee ^= me(J + G | 0, 7), B ^= me(ee + J | 0, 9), G ^= me(B + ee | 0, 13), J ^= me(G + B | 0, 18), p ^= me(l + c | 0, 7), a ^= me(p + l | 0, 9), c ^= me(a + p | 0, 13), l ^= me(c + a | 0, 18), h ^= me(g + I | 0, 7), E ^= me(h + g | 0, 9), I ^= me(E + h | 0, 13), g ^= me(I + E | 0, 18);
  s[i++] = o + M | 0, s[i++] = A + O | 0, s[i++] = d + P | 0, s[i++] = f + W | 0, s[i++] = y + G | 0, s[i++] = w + J | 0, s[i++] = b + ee | 0, s[i++] = x + B | 0, s[i++] = D + a | 0, s[i++] = Q + c | 0, s[i++] = S + l | 0, s[i++] = _ + p | 0, s[i++] = Z + h | 0, s[i++] = L + E | 0, s[i++] = j + I | 0, s[i++] = k + g | 0;
}
function hi(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let A = 0; A < 16; A++)
    n[o + A] = e[t + (2 * s - 1) * 16 + A];
  for (let A = 0; A < s; A++, i += 16, t += 16)
    ua(n, o, e, t, n, i), A > 0 && (o += 16), ua(n, i, e, t += 16, n, o);
}
function O0(e, t, n) {
  const r = Gc({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: A, asyncTick: d, maxmem: f, onProgress: y } = r;
  if (xt(s), xt(i), xt(o), xt(A), xt(d), xt(f), y !== void 0 && typeof y != "function")
    throw new Error("progressCb should be function");
  const w = 128 * i, b = w / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (w / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / w)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (A < 0 || A > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const x = w * (s + o);
  if (x > f)
    throw new Error(`Scrypt: parameters too large, ${x} (128 * r * (N + p)) > ${f} (maxmem)`);
  const D = ao(vn, e, t, { c: 1, dkLen: w * o }), Q = qr(D), S = qr(new Uint8Array(w * s)), _ = qr(new Uint8Array(w));
  let Z = () => {
  };
  if (y) {
    const L = 2 * s * o, j = Math.max(Math.floor(L / 1e4), 1);
    let k = 0;
    Z = () => {
      k++, y && (!(k % j) || k === L) && y(k / L);
    };
  }
  return { N: s, r: i, p: o, dkLen: A, blockSize32: b, V: S, B32: Q, B: D, tmp: _, blockMixCb: Z, asyncTick: d };
}
function T0(e, t, n, r, s) {
  const i = ao(vn, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function L0(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: A, V: d, B32: f, B: y, tmp: w, blockMixCb: b } = O0(e, t, n);
  for (let x = 0; x < i; x++) {
    const D = A * x;
    for (let Q = 0; Q < A; Q++)
      d[Q] = f[D + Q];
    for (let Q = 0, S = 0; Q < r - 1; Q++)
      hi(d, S, d, S += A, s), b();
    hi(d, (r - 1) * A, f, D, s), b();
    for (let Q = 0; Q < r; Q++) {
      const S = f[D + A - 16] % r;
      for (let _ = 0; _ < A; _++)
        w[_] = f[D + _] ^ d[S * A + _];
      hi(w, 0, f, D, s), b();
    }
  }
  return T0(e, o, y, d, w);
}
const Pr = /* @__PURE__ */ BigInt(2 ** 32 - 1), vi = /* @__PURE__ */ BigInt(32);
function Jc(e, t = !1) {
  return t ? { h: Number(e & Pr), l: Number(e >> vi & Pr) } : { h: Number(e >> vi & Pr) | 0, l: Number(e & Pr) | 0 };
}
function Hc(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = Jc(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const P0 = (e, t) => BigInt(e >>> 0) << vi | BigInt(t >>> 0), G0 = (e, t, n) => e >>> n, U0 = (e, t, n) => e << 32 - n | t >>> n, J0 = (e, t, n) => e >>> n | t << 32 - n, H0 = (e, t, n) => e << 32 - n | t >>> n, Y0 = (e, t, n) => e << 64 - n | t >>> n - 32, Z0 = (e, t, n) => e >>> n - 32 | t << 64 - n, V0 = (e, t) => t, X0 = (e, t) => e, Yc = (e, t, n) => e << n | t >>> 32 - n, Zc = (e, t, n) => t << n | e >>> 32 - n, Vc = (e, t, n) => t << n - 32 | e >>> 64 - n, Xc = (e, t, n) => e << n - 32 | t >>> 64 - n;
function j0(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const q0 = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), W0 = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, $0 = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), z0 = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, K0 = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), el = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, tl = {
  fromBig: Jc,
  split: Hc,
  toBig: P0,
  shrSH: G0,
  shrSL: U0,
  rotrSH: J0,
  rotrSL: H0,
  rotrBH: Y0,
  rotrBL: Z0,
  rotr32H: V0,
  rotr32L: X0,
  rotlSH: Yc,
  rotlSL: Zc,
  rotlBH: Vc,
  rotlBL: Xc,
  add: j0,
  add3L: q0,
  add3H: W0,
  add4L: $0,
  add4H: z0,
  add5H: el,
  add5L: K0
}, he = tl, [jc, qc, Wc] = [[], [], []], nl = /* @__PURE__ */ BigInt(0), sr = /* @__PURE__ */ BigInt(1), rl = /* @__PURE__ */ BigInt(2), sl = /* @__PURE__ */ BigInt(7), il = /* @__PURE__ */ BigInt(256), ol = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = sr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], jc.push(2 * (5 * r + n)), qc.push((e + 1) * (e + 2) / 2 % 64);
  let s = nl;
  for (let i = 0; i < 7; i++)
    t = (t << sr ^ (t >> sl) * ol) % il, t & rl && (s ^= sr << (sr << /* @__PURE__ */ BigInt(i)) - sr);
  Wc.push(s);
}
const [al, cl] = /* @__PURE__ */ Hc(Wc, !0), da = (e, t, n) => n > 32 ? Vc(e, t, n) : Yc(e, t, n), la = (e, t, n) => n > 32 ? Xc(e, t, n) : Zc(e, t, n);
function Al(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const A = (o + 8) % 10, d = (o + 2) % 10, f = n[d], y = n[d + 1], w = da(f, y, 1) ^ n[A], b = la(f, y, 1) ^ n[A + 1];
      for (let x = 0; x < 50; x += 10)
        e[o + x] ^= w, e[o + x + 1] ^= b;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const A = qc[o], d = da(s, i, A), f = la(s, i, A), y = jc[o];
      s = e[y], i = e[y + 1], e[y] = d, e[y + 1] = f;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let A = 0; A < 10; A++)
        n[A] = e[o + A];
      for (let A = 0; A < 10; A++)
        e[o + A] ^= ~n[(A + 2) % 10] & n[(A + 4) % 10];
    }
    e[0] ^= al[r], e[1] ^= cl[r];
  }
  n.fill(0);
}
class co extends io {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, xt(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = qr(this.state);
  }
  keccak() {
    Al(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Zn(this);
    const { blockLen: n, state: r } = this;
    t = Vn(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(n - this.pos, s - i);
      for (let A = 0; A < o; A++)
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
    Zn(this, !1), so(t), this.finish();
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
    return xt(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (Lc(t, this), this.finished)
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
    return t || (t = new co(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const ul = (e, t, n) => Ss(() => new co(t, e, n)), dl = /* @__PURE__ */ ul(1, 136, 256 / 8), ll = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), $c = /* @__PURE__ */ Uint8Array.from({ length: 16 }, (e, t) => t), hl = /* @__PURE__ */ $c.map((e) => (9 * e + 5) % 16);
let Ao = [$c], uo = [hl];
for (let e = 0; e < 4; e++)
  for (let t of [Ao, uo])
    t.push(t[e].map((n) => ll[n]));
const zc = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), fl = /* @__PURE__ */ Ao.map((e, t) => e.map((n) => zc[t][n])), gl = /* @__PURE__ */ uo.map((e, t) => e.map((n) => zc[t][n])), pl = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), ml = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]), Gr = (e, t) => e << t | e >>> 32 - t;
function ha(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const Ur = /* @__PURE__ */ new Uint32Array(16);
class El extends oo {
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
    for (let x = 0; x < 16; x++, n += 4)
      Ur[x] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, A = this.h2 | 0, d = A, f = this.h3 | 0, y = f, w = this.h4 | 0, b = w;
    for (let x = 0; x < 5; x++) {
      const D = 4 - x, Q = pl[x], S = ml[x], _ = Ao[x], Z = uo[x], L = fl[x], j = gl[x];
      for (let k = 0; k < 16; k++) {
        const M = Gr(r + ha(x, i, A, f) + Ur[_[k]] + Q, L[k]) + w | 0;
        r = w, w = f, f = Gr(A, 10) | 0, A = i, i = M;
      }
      for (let k = 0; k < 16; k++) {
        const M = Gr(s + ha(D, o, d, y) + Ur[Z[k]] + S, j[k]) + b | 0;
        s = b, b = y, y = Gr(d, 10) | 0, d = o, o = M;
      }
    }
    this.set(this.h1 + A + y | 0, this.h2 + f + b | 0, this.h3 + w + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    Ur.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const wl = /* @__PURE__ */ Ss(() => new El()), [Il, yl] = /* @__PURE__ */ (() => he.split([
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
].map((e) => BigInt(e))))(), on = /* @__PURE__ */ new Uint32Array(80), an = /* @__PURE__ */ new Uint32Array(80);
class Bl extends oo {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: A, Dl: d, Eh: f, El: y, Fh: w, Fl: b, Gh: x, Gl: D, Hh: Q, Hl: S } = this;
    return [t, n, r, s, i, o, A, d, f, y, w, b, x, D, Q, S];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, A, d, f, y, w, b, x, D, Q, S) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = A | 0, this.Dl = d | 0, this.Eh = f | 0, this.El = y | 0, this.Fh = w | 0, this.Fl = b | 0, this.Gh = x | 0, this.Gl = D | 0, this.Hh = Q | 0, this.Hl = S | 0;
  }
  process(t, n) {
    for (let L = 0; L < 16; L++, n += 4)
      on[L] = t.getUint32(n), an[L] = t.getUint32(n += 4);
    for (let L = 16; L < 80; L++) {
      const j = on[L - 15] | 0, k = an[L - 15] | 0, M = he.rotrSH(j, k, 1) ^ he.rotrSH(j, k, 8) ^ he.shrSH(j, k, 7), O = he.rotrSL(j, k, 1) ^ he.rotrSL(j, k, 8) ^ he.shrSL(j, k, 7), P = on[L - 2] | 0, W = an[L - 2] | 0, G = he.rotrSH(P, W, 19) ^ he.rotrBH(P, W, 61) ^ he.shrSH(P, W, 6), J = he.rotrSL(P, W, 19) ^ he.rotrBL(P, W, 61) ^ he.shrSL(P, W, 6), ee = he.add4L(O, J, an[L - 7], an[L - 16]), B = he.add4H(ee, M, G, on[L - 7], on[L - 16]);
      on[L] = B | 0, an[L] = ee | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: A, Cl: d, Dh: f, Dl: y, Eh: w, El: b, Fh: x, Fl: D, Gh: Q, Gl: S, Hh: _, Hl: Z } = this;
    for (let L = 0; L < 80; L++) {
      const j = he.rotrSH(w, b, 14) ^ he.rotrSH(w, b, 18) ^ he.rotrBH(w, b, 41), k = he.rotrSL(w, b, 14) ^ he.rotrSL(w, b, 18) ^ he.rotrBL(w, b, 41), M = w & x ^ ~w & Q, O = b & D ^ ~b & S, P = he.add5L(Z, k, O, yl[L], an[L]), W = he.add5H(P, _, j, M, Il[L], on[L]), G = P | 0, J = he.rotrSH(r, s, 28) ^ he.rotrBH(r, s, 34) ^ he.rotrBH(r, s, 39), ee = he.rotrSL(r, s, 28) ^ he.rotrBL(r, s, 34) ^ he.rotrBL(r, s, 39), B = r & i ^ r & A ^ i & A, a = s & o ^ s & d ^ o & d;
      _ = Q | 0, Z = S | 0, Q = x | 0, S = D | 0, x = w | 0, D = b | 0, { h: w, l: b } = he.add(f | 0, y | 0, W | 0, G | 0), f = A | 0, y = d | 0, A = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const c = he.add3L(G, ee, a);
      r = he.add3H(c, W, J, B), s = c | 0;
    }
    ({ h: r, l: s } = he.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = he.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: A, l: d } = he.add(this.Ch | 0, this.Cl | 0, A | 0, d | 0), { h: f, l: y } = he.add(this.Dh | 0, this.Dl | 0, f | 0, y | 0), { h: w, l: b } = he.add(this.Eh | 0, this.El | 0, w | 0, b | 0), { h: x, l: D } = he.add(this.Fh | 0, this.Fl | 0, x | 0, D | 0), { h: Q, l: S } = he.add(this.Gh | 0, this.Gl | 0, Q | 0, S | 0), { h: _, l: Z } = he.add(this.Hh | 0, this.Hl | 0, _ | 0, Z | 0), this.set(r, s, i, o, A, d, f, y, w, b, x, D, Q, S, _, Z);
  }
  roundClean() {
    on.fill(0), an.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Kc = /* @__PURE__ */ Ss(() => new Bl());
var Cl = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return L0(t, n, { N: r, r: i, p: s, dkLen: o });
}, Ql = (e) => dl(e), eA = !1, tA = (e) => wl(e), nA = tA;
function Fr(e) {
  const t = no(e, "data");
  return nA(t);
}
Fr._ = tA;
Fr.lock = () => {
  eA = !0;
};
Fr.register = (e) => {
  if (eA)
    throw new TypeError("ripemd160 is locked");
  nA = e;
};
Object.freeze(Fr);
var On = (e, t = "base64") => {
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
}, rA = (e, t, n, r, s) => {
  const i = { sha256: vn, sha512: Kc }[s];
  return V(ao(i, e, t, { c: n, dkLen: r }));
}, { crypto: Ms, btoa: sA } = globalThis;
if (!Ms)
  throw new v(
    F.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!sA)
  throw new v(
    F.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var xi = (e) => Ms.getRandomValues(new Uint8Array(e)), $r = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return sA(n);
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
}, iA = "AES-CTR", lo = (e, t) => {
  const n = On(String(e).normalize("NFKC"), "utf-8"), r = rA(n, t, 1e5, 32, "sha256");
  return H(r);
}, bl = async (e, t) => {
  const n = xi(16), r = xi(32), s = lo(e, r), i = JSON.stringify(t), o = On(i, "utf-8"), A = {
    name: iA,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, A, !1, ["encrypt"]), f = await crypto.subtle.encrypt(A, d, o);
  return {
    data: $r(f),
    iv: $r(n),
    salt: $r(r)
  };
}, vl = async (e, t) => {
  const n = On(t.iv), r = On(t.salt), s = lo(e, r), i = On(t.data), o = {
    name: iA,
    counter: n,
    length: 64
  }, A = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, A, i), f = new TextDecoder().decode(d);
  try {
    return JSON.parse(f);
  } catch {
    throw new v(F.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, xl = async (e, t, n) => {
  const r = Ms.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, A = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await r.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    A,
    o
  );
  return new Uint8Array(d);
}, Fl = async (e, t, n) => {
  const r = Ms.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, A = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await r.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    A,
    o
  );
  return new Uint8Array(d);
}, Dl = (e, t, n) => {
  const r = e === "sha256" ? vn : Kc, s = _s.create(r, t).update(n).digest();
  return V(s);
}, Rl = {
  bufferFromString: On,
  stringFromBuffer: $r,
  decrypt: vl,
  encrypt: bl,
  keyFromPassword: lo,
  randomBytes: xi,
  scrypt: Cl,
  keccak256: Ql,
  decryptJsonWalletData: Fl,
  encryptJsonWalletData: xl,
  computeHmac: Dl,
  pbkdf2: rA,
  ripemd160: Fr
}, Nl = Rl, {
  bufferFromString: fn,
  decrypt: Sl,
  encrypt: _l,
  keyFromPassword: Qw,
  randomBytes: Yt,
  stringFromBuffer: cr,
  scrypt: oA,
  keccak256: aA,
  decryptJsonWalletData: Ml,
  encryptJsonWalletData: kl,
  pbkdf2: Ol,
  computeHmac: cA,
  ripemd160: Tl
} = Nl;
function wt(e) {
  return V(vn(H(e)));
}
function Kt(e) {
  return wt(e);
}
function Ll(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function Pl(e) {
  return Kt(fn(e, "utf-8"));
}
var Gl = Object.defineProperty, Ul = (e, t, n) => t in e ? Gl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Dr = (e, t, n) => (Ul(e, typeof t != "symbol" ? t + "" : t, n), n), Jl = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, AA = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, uA = (e, t, n) => (Jl(e, t, "access private method"), n), ie = class {
  constructor(e, t, n) {
    R(this, "name");
    R(this, "type");
    R(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, dA = "u8", lA = "u16", hA = "u32", fA = "u64", gA = "u256", pA = "raw untyped ptr", mA = "raw untyped slice", EA = "bool", wA = "b256", IA = "struct B512", ho = "enum Option", fo = "struct Vec", go = "struct Bytes", po = "struct String", yA = "str", mo = /str\[(?<length>[0-9]+)\]/, As = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Eo = /^struct (?<name>\w+)$/, wo = /^enum (?<name>\w+)$/, BA = /^\((?<items>.*)\)$/, Hl = /^generic (?<name>\w+)$/, Xn = "0", Io = "1", K = 8, pn = 32, Fi = pn + 1, Qn = pn, CA = pn, Yl = pn, Zl = K * 4, Vl = K * 2, yo = 2 ** 32 - 1, ks = ({ maxInputs: e }) => pn + // Tx ID
K + // Tx size
// Asset ID/Balance coin input pairs
e * (Qn + K), Bo = K + // Identifier
K + // Gas limit
K + // Script size
K + // Script data size
K + // Policies
K + // Inputs size
K + // Outputs size
K + // Witnesses size
pn, Xl = K + // Identifier
Zl + // Utxo Length
K + // Output Index
Yl + // Owner
K + // Amount
Qn + // Asset id
Vl + // TxPointer
K + // Witnesses index
K + // Maturity
K + // Predicate size
K + // Predicate data size
K, jl = {
  u64: K,
  u256: K * 4
}, N = class extends ie {
  constructor(e) {
    super("bigNumber", e, jl[e]);
  }
  encode(e) {
    let t;
    try {
      t = Lt(e, this.encodedLength);
    } catch {
      throw new v(F.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new v(F.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [C(n), t + this.encodedLength];
  }
}, ql = 3, Et = ql * K, Wl = 2, fa = Wl * K;
function Dt(e) {
  const t = {};
  let n = 0;
  const r = e.map((o) => {
    const A = o.dynamicData;
    A && Object.entries(A).forEach(([f, y]) => {
      t[parseInt(f, 10) + n] = y;
    });
    const d = H(o);
    return n += d.byteLength / K, d;
  }), s = r.reduce((o, A) => o + A.length, 0), i = new Uint8Array(s);
  return r.reduce((o, A) => (i.set(A, o), o + A.length), 0), Object.keys(t).length && (i.dynamicData = t), i;
}
function QA(e, t, n) {
  if (!e.dynamicData)
    return se([e]);
  let r = 0, s = e;
  return Object.entries(e.dynamicData).forEach(([i, o]) => {
    const A = parseInt(i, 10) * K, d = new N("u64").encode(
      n + t + r
    );
    s.set(d, A);
    const f = o.dynamicData ? (
      // unpack child dynamic data
      QA(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = se([s, f]), r += f.byteLength;
  }), s;
}
var bA = (e, t = K) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, $l = (e) => {
  switch (e) {
    case "u8":
    case "u16":
    case "u32":
    case "u64":
    case "bool":
      return !1;
    default:
      return !0;
  }
}, zl = (e) => e === fo || e === go || e === po, pr = (e) => e % K === 0, vA = (e) => K - e % K, xA = (e) => {
  if (pr(e.length))
    return e;
  const t = new Uint8Array(K - e.length % K);
  return br([e, t]);
}, Kl = (e) => e instanceof Uint8Array, lt = class extends ie {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    R(this, "coder");
    R(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(F.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new v(F.ENCODE_ERROR, "Types/values length mismatch.");
    return Dt(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > yo)
      throw new v(F.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, U = class extends ie {
  constructor() {
    super("b256", "b256", K * 4);
  }
  encode(e) {
    let t;
    try {
      t = H(e);
    } catch {
      throw new v(F.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(F.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (C(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid b256 byte data size.");
    return [as(n, 32), t + 32];
  }
}, FA = class extends ie {
  constructor() {
    super("b512", "struct B512", K * 8);
  }
  encode(e) {
    let t;
    try {
      t = H(e);
    } catch {
      throw new v(F.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(F.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (C(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid b512 byte data size.");
    return [as(n, this.encodedLength), t + this.encodedLength];
  }
}, eh = class extends ie {
  constructor(t = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const n = t.isSmallBytes ? 1 : 8;
    super("boolean", "boolean", n);
    R(this, "paddingLength");
    R(this, "options");
    this.paddingLength = n, this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new v(F.ENCODE_ERROR, "Invalid boolean value.");
    const r = Lt(t ? 1 : 0, this.paddingLength);
    return this.options.isRightPadded ? r.reverse() : r;
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new v(F.DECODE_ERROR, "Invalid boolean data size.");
    let r;
    this.options.isRightPadded ? r = t.slice(n, n + 1) : r = t.slice(n, n + this.paddingLength);
    const s = C(r);
    if (s.isZero())
      return [!1, n + this.paddingLength];
    if (!s.eq(C(1)))
      throw new v(F.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.paddingLength];
  }
}, Di, DA, us = class extends ie {
  constructor() {
    super("struct", "struct Bytes", Et), AA(this, Di);
  }
  encode(e) {
    const t = [], n = new N("u64").encode(Et), r = uA(this, Di, DA).call(this, e);
    return n.dynamicData = {
      0: Dt([r])
    }, t.push(n), t.push(new N("u64").encode(r.byteLength)), t.push(new N("u64").encode(e.length)), Dt(t);
  }
  decode(e, t) {
    if (e.length < Et)
      throw new v(F.DECODE_ERROR, "Invalid byte data size.");
    const n = e.slice(16, 24), r = C(new N("u64").decode(n, 0)[0]).toNumber(), s = e.slice(Et, Et + r);
    if (s.length !== r)
      throw new v(F.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, t + Et];
  }
};
Di = /* @__PURE__ */ new WeakSet();
DA = function(e) {
  const t = e instanceof Uint8Array ? [e] : [new Uint8Array(e)], n = (K - e.length % K) % K;
  return n && t.push(new Uint8Array(n)), se(t);
};
Dr(us, "memorySize", 1);
var th = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), Un, ln, Qs, NA, bs, SA, Ic, RA = (Ic = class extends ie {
  constructor(t, n) {
    const r = new N("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    It(this, Qs);
    It(this, bs);
    R(this, "name");
    R(this, "coders");
    It(this, Un, void 0);
    It(this, ln, void 0);
    this.name = t, this.coders = n, tn(this, Un, r), tn(this, ln, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return nn(this, Qs, NA).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(F.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(F.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), A = new Uint8Array(Ne(this, ln) - s.encodedLength);
    return Dt([Ne(this, Un).encode(i), A, o]);
  }
  decode(t, n) {
    if (t.length < Ne(this, ln))
      throw new v(F.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new N("u64").decode(t, r);
    const i = Ft(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new v(
        F.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const A = this.coders[o], d = Ne(this, ln) - A.encodedLength;
    return r += d, [s, r] = A.decode(t, r), th(this.coders) ? nn(this, bs, SA).call(this, o, r) : [{ [o]: s }, r];
  }
}, Un = new WeakMap(), ln = new WeakMap(), Qs = new WeakSet(), NA = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Ne(this, ln) - n.encodedLength);
  return se([Ne(this, Un).encode(s), i, r]);
}, bs = new WeakSet(), SA = function(t, n) {
  return [t, n];
}, Ic), _A = class extends RA {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid option data size.");
    const [n, r] = super.decode(e, t);
    return [this.toOption(n), r];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, z = class extends ie {
  constructor(t, n = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const r = n.isSmallBytes && t === "u8" ? 1 : 8;
    super("number", t, r);
    // This is to align the bits to the total bytes
    // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
    R(this, "length");
    R(this, "paddingLength");
    R(this, "baseType");
    R(this, "options");
    switch (this.baseType = t, t) {
      case "u8":
        this.length = 1;
        break;
      case "u16":
        this.length = 2;
        break;
      case "u32":
      default:
        this.length = 4;
        break;
    }
    this.paddingLength = r, this.options = n;
  }
  encode(t) {
    let n;
    try {
      n = Lt(t);
    } catch {
      throw new v(F.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(F.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = Lt(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [Ft(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new v(F.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new v(F.DECODE_ERROR, "Invalid number byte data size.");
    return [Ft(r), n + 8];
  }
}, nh = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", fa);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(F.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new z("u8", { isSmallBytes: !0 }), r = new N("u64").encode(
      fa
    );
    return r.dynamicData = {
      0: Dt(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new N("u64").encode(e.length)), Dt(t);
  }
  decode(e, t) {
    const n = e.slice(t), r = new lt(
      new z("u8", { isSmallBytes: !0 }),
      n.length
    ), [s] = r.decode(n, 0);
    return [s, t + n.length];
  }
}, Ri, MA, kA = class extends ie {
  constructor() {
    super("struct", "struct String", 1), AA(this, Ri);
  }
  encode(e) {
    const t = [], n = new N("u64").encode(Et), r = uA(this, Ri, MA).call(this, e);
    return n.dynamicData = {
      0: Dt([r])
    }, t.push(n), t.push(new N("u64").encode(r.byteLength)), t.push(new N("u64").encode(e.length)), Dt(t);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid std string data size.");
    const n = e.slice(16, 24), r = C(new N("u64").decode(n, 0)[0]).toNumber(), s = e.slice(Et, Et + r);
    if (s.length !== r)
      throw new v(F.DECODE_ERROR, "Invalid std string byte data size.");
    return [xr(s), t + Et];
  }
};
Ri = /* @__PURE__ */ new WeakSet();
MA = function(e) {
  const t = [vr(e)], n = (K - e.length % K) % K;
  return n && t.push(new Uint8Array(n)), se(t);
};
Dr(kA, "memorySize", 1);
var Jn, yc, rh = (yc = class extends ie {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    R(this, "length");
    It(this, Jn, void 0);
    this.length = t, tn(this, Jn, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new v(F.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = vr(t), r = new Uint8Array(Ne(this, Jn));
    return se([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new v(F.DECODE_ERROR, "Invalid string byte data size.");
    const s = xr(r), i = Ne(this, Jn);
    return [s, n + this.length + i];
  }
}, Jn = new WeakMap(), yc), Os = class extends ie {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    R(this, "name");
    R(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    const n = Object.keys(this.coders).map((r) => {
      const s = this.coders[r], i = t[r];
      if (!(s instanceof _A) && i == null)
        throw new v(
          F.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return pr(o.length) ? o : xA(o);
    });
    return Dt([Dt(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const A = this.coders[o];
      let d;
      return [d, r] = A.decode(t, r), pr(r) || (r += vA(r)), i[o] = d, i;
    }, {}), r];
  }
}, OA = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    R(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(F.ENCODE_ERROR, "Types/values length mismatch.");
    return Dt(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return pr(s.length) ? s : xA(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), pr(r) || (r += vA(r)), o;
    }), r];
  }
}, TA = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + Et);
    R(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t) && !Kl(t))
      throw new v(
        F.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = [], r = new N("u64").encode(Et);
    return r.dynamicData = {
      0: Dt(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new N("u64").encode(t.length)), n.push(new N("u64").encode(t.length)), Dt(n);
  }
  decode(t, n) {
    if (t.length < Et || t.length > yo)
      throw new v(F.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = C(new N("u64").decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(Et, Et + i);
    if (o.length !== i)
      throw new v(F.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      bA(o, this.coder.encodedLength).map(
        (A) => this.coder.decode(A, 0)[0]
      ),
      n + Et
    ];
  }
}, sh = (e, t) => {
  const n = e.functions.find((r) => r.name === t);
  if (!n)
    throw new v(
      F.FUNCTION_NOT_FOUND,
      `Function with name '${t}' doesn't exist in the ABI`
    );
  return n;
}, zt = (e, t) => {
  const n = e.types.find((r) => r.typeId === t);
  if (!n)
    throw new v(
      F.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return n;
}, ga = (e, t) => t.filter((n) => zt(e, n.type).type !== "()"), LA = (e) => {
  var r;
  const t = e.find((s) => s.name === "buf"), n = (r = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : r[0];
  if (!t || !n)
    throw new v(
      F.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return n;
}, Wt = class {
  constructor(e, t) {
    R(this, "abi");
    R(this, "name");
    R(this, "type");
    R(this, "originalTypeArguments");
    R(this, "components");
    this.abi = e, this.name = t.name;
    const n = zt(e, t.type);
    this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = Wt.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? Wt.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new Wt(e, o));
    const s = r.reduce(
      (o, A, d) => {
        var y;
        const f = { ...o };
        return f[A] = structuredClone(
          (y = t.typeArguments) == null ? void 0 : y[d]
        ), f;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new Wt(e, o));
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
      const s = zt(e, r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = zt(e, s.type);
      if (Hl.test(i.type)) {
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
    return Eo.test(this.type) ? "s" : As.test(this.type) ? "a" : wo.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = mo.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = As.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new Wt(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function ds(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Fn = (e, t) => {
  var d, f, y, w, b;
  switch (e.type) {
    case dA:
    case lA:
    case hA:
      return new z(e.type, t);
    case fA:
    case pA:
      return new N("u64");
    case gA:
      return new N("u256");
    case mA:
      return new nh();
    case EA:
      return new eh(t);
    case wA:
      return new U();
    case IA:
      return new FA();
    case go:
      return new us();
    case po:
      return new kA();
  }
  const n = (d = mo.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const x = parseInt(n.length, 10);
    return new rh(x);
  }
  const r = e.components, s = (f = As.exec(e.type)) == null ? void 0 : f.groups;
  if (s) {
    const x = parseInt(s.length, 10), D = r[0];
    if (!D)
      throw new v(
        F.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const Q = Fn(D, { isSmallBytes: !0 });
    return new lt(Q, x);
  }
  if (e.type === fo) {
    const x = LA(r), D = new Wt(e.abi, x), Q = Fn(D, { isSmallBytes: !0, encoding: Xn });
    return new TA(Q);
  }
  const i = (y = Eo.exec(e.type)) == null ? void 0 : y.groups;
  if (i) {
    const x = ds(r, { isRightPadded: !0, getCoder: Fn });
    return new Os(i.name, x);
  }
  const o = (w = wo.exec(e.type)) == null ? void 0 : w.groups;
  if (o) {
    const x = ds(r, { getCoder: Fn });
    return e.type === ho ? new _A(o.name, x) : new RA(o.name, x);
  }
  if ((b = BA.exec(e.type)) == null ? void 0 : b.groups) {
    const x = r.map(
      (D) => Fn(D, { isRightPadded: !0, encoding: Xn })
    );
    return new OA(x);
  }
  throw e.type === yA ? new v(
    F.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new v(
    F.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
}, ih = class extends ie {
  constructor() {
    super("boolean", "boolean", 1);
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new v(F.ENCODE_ERROR, "Invalid boolean value.");
    return Lt(e ? 1 : 0, this.encodedLength);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid boolean data size.");
    const n = C(e.slice(t, t + this.encodedLength));
    if (n.isZero())
      return [!1, t + this.encodedLength];
    if (!n.eq(C(1)))
      throw new v(F.DECODE_ERROR, "Invalid boolean value.");
    return [!0, t + this.encodedLength];
  }
}, PA = class extends ie {
  constructor() {
    super("struct", "struct Bytes", K);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), n = new N("u64").encode(t.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < K)
      throw new v(F.DECODE_ERROR, "Invalid byte data size.");
    const n = t + K, r = e.slice(t, n), s = C(new N("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(F.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
Dr(PA, "memorySize", 1);
var oh = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), Hn, Yn, vs, UA, xs, JA, Bc, GA = (Bc = class extends ie {
  constructor(t, n) {
    const r = new N("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    It(this, vs);
    It(this, xs);
    R(this, "name");
    R(this, "coders");
    It(this, Hn, void 0);
    It(this, Yn, void 0);
    this.name = t, this.coders = n, tn(this, Hn, r), tn(this, Yn, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return nn(this, vs, UA).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(F.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(F.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]);
    return new Uint8Array([...Ne(this, Hn).encode(i), ...o]);
  }
  decode(t, n) {
    if (t.length < Ne(this, Yn))
      throw new v(F.DECODE_ERROR, "Invalid enum data size.");
    const r = new N("u64").decode(t, n)[0], s = Ft(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new v(
        F.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], A = n + K, [d, f] = o.decode(t, A);
    return oh(this.coders) ? nn(this, xs, JA).call(this, i, f) : [{ [i]: d }, f];
  }
}, Hn = new WeakMap(), Yn = new WeakMap(), vs = new WeakSet(), UA = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Ne(this, Yn) - n.encodedLength);
  return se([Ne(this, Hn).encode(s), i, r]);
}, xs = new WeakSet(), JA = function(t, n) {
  return [t, n];
}, Bc), ah = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new v(F.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, Ni = class extends ie {
  constructor(t) {
    const n = ah(t);
    super("number", t, n);
    R(this, "length");
    R(this, "baseType");
    this.baseType = t, this.length = n;
  }
  encode(t) {
    let n;
    try {
      n = Lt(t);
    } catch {
      throw new v(F.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(F.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Lt(n, this.length);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid number byte data size.");
    return [Ft(r), n + this.length];
  }
}, HA = class extends GA {
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
}, ch = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", K);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(F.ENCODE_ERROR, "Expected array value.");
    const n = new lt(new Ni("u8"), e.length).encode(e), r = new N("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + K, r = e.slice(t, n), s = C(new N("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(F.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new lt(new Ni("u8"), s), [A] = o.decode(i, 0);
    return [A, n + s];
  }
}, Co = class extends ie {
  constructor() {
    super("struct", "struct String", K);
  }
  encode(e) {
    const t = vr(e), n = new N("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid std string data size.");
    const n = t + K, r = e.slice(t, n), s = C(new N("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(F.DECODE_ERROR, "Invalid std string byte data size.");
    return [xr(i), n + s];
  }
};
Dr(Co, "memorySize", 1);
var YA = class extends ie {
  constructor() {
    super("strSlice", "str", K);
  }
  encode(e) {
    const t = vr(e), n = new N("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid string slice data size.");
    const n = t + K, r = e.slice(t, n), s = C(new N("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(F.DECODE_ERROR, "Invalid string slice byte data size.");
    return [xr(i), n + s];
  }
};
Dr(YA, "memorySize", 1);
var Ah = class extends ie {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new v(F.ENCODE_ERROR, "Value length mismatch during encode.");
    return vr(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid string byte data size.");
    return [xr(n), t + this.encodedLength];
  }
}, uh = class extends ie {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    R(this, "name");
    R(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    return br(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof HA) && s == null)
          throw new v(
            F.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const A = this.coders[o];
      let d;
      return [d, r] = A.decode(t, r), i[o] = d, i;
    }, {}), r];
  }
}, ZA = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    R(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(F.ENCODE_ERROR, "Types/values length mismatch.");
    return br(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(F.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, dh = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + K);
    R(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(F.ENCODE_ERROR, "Expected array value.");
    const n = t.map((s) => this.coder.encode(s)), r = new N("u64").encode(t.length);
    return new Uint8Array([...r, ...br(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > yo)
      throw new v(F.DECODE_ERROR, "Invalid vec data size.");
    const r = n + K, s = t.slice(n, r), o = C(new N("u64").decode(s, 0)[0]).toNumber() * this.coder.encodedLength, A = t.slice(r, r + o);
    if (A.length !== o)
      throw new v(F.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      bA(A, this.coder.encodedLength).map(
        (d) => this.coder.decode(d, 0)[0]
      ),
      r + o
    ];
  }
}, Dn = (e, t) => {
  var d, f, y, w, b;
  switch (e.type) {
    case dA:
    case lA:
    case hA:
      return new Ni(e.type);
    case fA:
    case pA:
      return new N("u64");
    case gA:
      return new N("u256");
    case mA:
      return new ch();
    case EA:
      return new ih();
    case wA:
      return new U();
    case IA:
      return new FA();
    case go:
      return new PA();
    case po:
      return new Co();
    case yA:
      return new YA();
  }
  const n = (d = mo.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const x = parseInt(n.length, 10);
    return new Ah(x);
  }
  const r = e.components, s = (f = As.exec(e.type)) == null ? void 0 : f.groups;
  if (s) {
    const x = parseInt(s.length, 10), D = r[0];
    if (!D)
      throw new v(
        F.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const Q = Dn(D);
    return new lt(Q, x);
  }
  if (e.type === fo) {
    const x = LA(r), D = new Wt(e.abi, x), Q = Dn(D);
    return new dh(Q);
  }
  const i = (y = Eo.exec(e.type)) == null ? void 0 : y.groups;
  if (i) {
    const x = ds(r, { isRightPadded: !0, getCoder: Dn });
    return new uh(i.name, x);
  }
  const o = (w = wo.exec(e.type)) == null ? void 0 : w.groups;
  if (o) {
    const x = ds(r, { getCoder: Dn });
    return e.type === ho ? new HA(o.name, x) : new GA(o.name, x);
  }
  if ((b = BA.exec(e.type)) == null ? void 0 : b.groups) {
    const x = r.map(
      (D) => Dn(D)
    );
    return new ZA(x);
  }
  throw new v(
    F.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function lh(e = Xn) {
  switch (e) {
    case Io:
      return Dn;
    case Xn:
      return Fn;
    default:
      throw new v(
        F.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Sn = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new Wt(e, t);
    return lh(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, Fs, VA, Ds, XA, Rs, jA, Cc, zr = (Cc = class {
  constructor(e, t) {
    It(this, Fs);
    It(this, Ds);
    It(this, Rs);
    R(this, "signature");
    R(this, "selector");
    R(this, "selectorBytes");
    R(this, "encoding");
    R(this, "name");
    R(this, "jsonFn");
    R(this, "attributes");
    R(this, "isInputDataPointer");
    R(this, "outputMetadata");
    R(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = sh(this.jsonAbi, t), this.name = t, this.signature = zr.getSignature(this.jsonAbi, this.jsonFn), this.selector = zr.getFunctionSelector(this.signature), this.selectorBytes = new Co().encode(t), this.encoding = this.jsonAbi.encoding ?? Xn, this.isInputDataPointer = nn(this, Fs, VA).call(this), this.outputMetadata = {
      isHeapType: nn(this, Ds, XA).call(this),
      encodedLength: nn(this, Rs, jA).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new Wt(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = wt(fn(e, "utf-8"));
    return C(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e, t = 0) {
    zr.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const n = e.slice(), r = ga(this.jsonAbi, this.jsonFn.inputs);
    Array.isArray(e) && r.length !== e.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, e.length));
    const s = r.map(
      (o) => Sn.getCoder(this.jsonAbi, o, {
        isRightPadded: r.length > 1,
        encoding: this.encoding
      })
    );
    if (this.encoding === Io)
      return new ZA(s).encode(n);
    const i = new OA(s).encode(n);
    return QA(i, t, i.byteLength);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => zt(n, o.type)), s = r.filter(
      (o) => o.type === ho || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new v(F.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = H(e), n = ga(this.jsonAbi, this.jsonFn.inputs);
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new v(
        F.DECODE_ERROR,
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
        const o = Sn.getCoder(this.jsonAbi, i, { encoding: this.encoding }), [A, d] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, A],
          offset: s.offset + d
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (zt(this.jsonAbi, this.jsonFn.output.type).type === "()")
      return [void 0, 0];
    const n = H(e);
    return Sn.getCoder(this.jsonAbi, this.jsonFn.output, {
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
}, Fs = new WeakSet(), VA = function() {
  var t;
  const e = this.jsonFn.inputs.map((n) => zt(this.jsonAbi, n.type));
  return this.jsonFn.inputs.length > 1 || $l(((t = e[0]) == null ? void 0 : t.type) || "");
}, Ds = new WeakSet(), XA = function() {
  const e = zt(this.jsonAbi, this.jsonFn.output.type);
  return zl((e == null ? void 0 : e.type) || "");
}, Rs = new WeakSet(), jA = function() {
  try {
    const e = Sn.getCoder(this.jsonAbi, this.jsonFn.output);
    return e instanceof TA ? e.coder.encodedLength : e instanceof us ? us.memorySize : e.encodedLength;
  } catch {
    return 0;
  }
}, Cc), en = class {
  constructor(e) {
    R(this, "functions");
    R(this, "configurables");
    R(this, "jsonAbi");
    this.jsonAbi = e, this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new zr(this.jsonAbi, t.name)])
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
    throw new v(
      F.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  decodeFunctionData(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeArguments(t);
  }
  encodeFunctionData(e, t, n = 0) {
    return (typeof e == "string" ? this.getFunction(e) : e).encodeArguments(t, n);
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t) {
    const n = this.jsonAbi.loggedTypes.find((r) => r.logId === t);
    if (!n)
      throw new v(
        F.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Sn.decode(this.jsonAbi, n.loggedType, H(e), 0, {
      encoding: this.jsonAbi.encoding
    });
  }
  encodeConfigurable(e, t) {
    const n = this.jsonAbi.configurables.find((r) => r.name === e);
    if (!n)
      throw new v(
        F.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Sn.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0,
      // TODO: Review support for configurables in v1 encoding when it becomes available
      encoding: Xn
    });
  }
  getTypeById(e) {
    return zt(this.jsonAbi, e);
  }
}, bw = class {
}, hh = class {
}, qA = class {
}, WA = class {
}, fh = class extends WA {
}, gh = class extends WA {
}, mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
var jn = mr.bech32m = mr.bech32 = void 0;
const ls = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", $A = {};
for (let e = 0; e < ls.length; e++) {
  const t = ls.charAt(e);
  $A[t] = e;
}
function Tn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function pa(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = Tn(t) ^ r >> 5;
  }
  t = Tn(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = Tn(t) ^ r & 31;
  }
  return t;
}
function Qo(e, t, n, r) {
  let s = 0, i = 0;
  const o = (1 << n) - 1, A = [];
  for (let d = 0; d < e.length; ++d)
    for (s = s << t | e[d], i += t; i >= n; )
      i -= n, A.push(s >> i & o);
  if (r)
    i > 0 && A.push(s << n - i & o);
  else {
    if (i >= t)
      return "Excess padding";
    if (s << n - i & o)
      return "Non-zero padding";
  }
  return A;
}
function ph(e) {
  return Qo(e, 8, 5, !0);
}
function mh(e) {
  const t = Qo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function Eh(e) {
  const t = Qo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function zA(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, A, d) {
    if (d = d || 90, o.length + 7 + A.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let f = pa(o);
    if (typeof f == "string")
      throw new Error(f);
    let y = o + "1";
    for (let w = 0; w < A.length; ++w) {
      const b = A[w];
      if (b >> 5)
        throw new Error("Non 5-bit word");
      f = Tn(f) ^ b, y += ls.charAt(b);
    }
    for (let w = 0; w < 6; ++w)
      f = Tn(f);
    f ^= t;
    for (let w = 0; w < 6; ++w) {
      const b = f >> (5 - w) * 5 & 31;
      y += ls.charAt(b);
    }
    return y;
  }
  function r(o, A) {
    if (A = A || 90, o.length < 8)
      return o + " too short";
    if (o.length > A)
      return "Exceeds length limit";
    const d = o.toLowerCase(), f = o.toUpperCase();
    if (o !== d && o !== f)
      return "Mixed-case string " + o;
    o = d;
    const y = o.lastIndexOf("1");
    if (y === -1)
      return "No separator character for " + o;
    if (y === 0)
      return "Missing prefix for " + o;
    const w = o.slice(0, y), b = o.slice(y + 1);
    if (b.length < 6)
      return "Data too short";
    let x = pa(w);
    if (typeof x == "string")
      return x;
    const D = [];
    for (let Q = 0; Q < b.length; ++Q) {
      const S = b.charAt(Q), _ = $A[S];
      if (_ === void 0)
        return "Unknown character " + S;
      x = Tn(x) ^ _, !(Q + 6 >= b.length) && D.push(_);
    }
    return x !== t ? "Invalid checksum for " + o : { prefix: w, words: D };
  }
  function s(o, A) {
    const d = r(o, A);
    if (typeof d == "object")
      return d;
  }
  function i(o, A) {
    const d = r(o, A);
    if (typeof d == "object")
      return d;
    throw new Error(d);
  }
  return {
    decodeUnsafe: s,
    decode: i,
    encode: n,
    toWords: ph,
    fromWordsUnsafe: mh,
    fromWords: Eh
  };
}
mr.bech32 = zA("bech32");
jn = mr.bech32m = zA("bech32m");
var hs = "fuel";
function bo(e) {
  return jn.decode(e);
}
function Kr(e) {
  return jn.encode(
    hs,
    jn.toWords(H(V(e)))
  );
}
function es(e) {
  return typeof e == "string" && e.indexOf(hs + 1) === 0 && bo(e).prefix === hs;
}
function Si(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function ma(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function _i(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function vo(e) {
  return new Uint8Array(jn.fromWords(bo(e).words));
}
function Ea(e) {
  if (!es(e))
    throw new v(
      v.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return V(vo(e));
}
function wh(e) {
  const { words: t } = bo(e);
  return jn.encode(hs, t);
}
var Ar = (e) => e instanceof qA ? e.address : e instanceof fh ? e.id : e, Ih = () => V(Yt(32)), yh = (e) => {
  let t;
  try {
    if (!Si(e))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = vo(Kr(e)), t = V(t.fill(0, 0, 12));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, Bh = (e) => {
  if (!_i(e))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, le = class extends hh {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    R(this, "bech32Address");
    if (this.bech32Address = wh(t), !es(this.bech32Address))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
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
    return Ea(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return vo(this.bech32Address);
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
    const t = Ea(this.bech32Address);
    return {
      value: yh(t)
    };
  }
  /**
   * Wraps the `bech32Address` property and returns as an `AssetId`.
   *
   * @returns The `bech32Address` property as an {@link AssetId | `AssetId`}
   */
  toAssetId() {
    return {
      value: this.toB256()
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
    if (!ma(t))
      throw new v(v.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = V(vn(H(t)));
    return new le(Kr(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!Si(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new le(Kr(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(Ih());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return es(t) ? new le(t) : this.fromB256(t);
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
      return le.fromB256(t.toB256());
    if (ma(t))
      return le.fromPublicKey(t);
    if (es(t))
      return new le(t);
    if (Si(t))
      return le.fromB256(t);
    if (_i(t))
      return le.fromEvmAddress(t);
    throw new v(
      v.CODES.PARSE_FAILED,
      "Unknown address format: only 'Bech32', 'B256', or 'Public Key (512)' are supported."
    );
  }
  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   */
  static fromEvmAddress(t) {
    if (!_i(t))
      throw new v(
        v.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = Bh(t);
    return new le(Kr(n));
  }
}, Re = "0x0000000000000000000000000000000000000000000000000000000000000000", ht = Re, vw = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", hn, Qc, we = (Qc = class extends ie {
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
    R(this, "length");
    It(this, hn, void 0);
    this.length = t, tn(this, hn, n);
  }
  encode(t) {
    const n = [], r = H(t);
    return n.push(r), Ne(this, hn) && n.push(new Uint8Array(Ne(this, hn))), se(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [V(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return Ne(this, hn) && ([r, s] = [null, s + Ne(this, hn)]), [i, s];
  }
}, hn = new WeakMap(), Qc), qn = class extends Os {
  constructor() {
    super("TxPointer", {
      blockHeight: new z("u32"),
      txIndex: new z("u16")
    });
  }
}, Ee = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Ee || {}), wa = class extends ie {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.txID)), t.push(new z("u8").encode(e.outputIndex)), t.push(new U().encode(e.owner)), t.push(new N("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), t.push(new qn().encode(e.txPointer)), t.push(new z("u8").encode(e.witnessIndex)), t.push(new z("u32").encode(e.maturity)), t.push(new N("u64").encode(e.predicateGasUsed)), t.push(new z("u32").encode(e.predicateLength)), t.push(new z("u32").encode(e.predicateDataLength)), t.push(new we(e.predicateLength).encode(e.predicate)), t.push(new we(e.predicateDataLength).encode(e.predicateData)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new z("u8").decode(e, r);
    const i = n;
    [n, r] = new U().decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    [n, r] = new U().decode(e, r);
    const d = n;
    [n, r] = new qn().decode(e, r);
    const f = n;
    [n, r] = new z("u8").decode(e, r);
    const y = Number(n);
    [n, r] = new z("u32").decode(e, r);
    const w = n;
    [n, r] = new N("u64").decode(e, r);
    const b = n;
    [n, r] = new z("u32").decode(e, r);
    const x = n;
    [n, r] = new z("u32").decode(e, r);
    const D = n;
    [n, r] = new we(x).decode(e, r);
    const Q = n;
    return [n, r] = new we(D).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: A,
        assetId: d,
        txPointer: f,
        witnessIndex: y,
        maturity: w,
        predicateGasUsed: b,
        predicateLength: x,
        predicateDataLength: D,
        predicate: Q,
        predicateData: n
      },
      r
    ];
  }
}, fs = class extends ie {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.txID)), t.push(new z("u8").encode(e.outputIndex)), t.push(new U().encode(e.balanceRoot)), t.push(new U().encode(e.stateRoot)), t.push(new qn().encode(e.txPointer)), t.push(new U().encode(e.contractID)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new z("u8").decode(e, r);
    const i = n;
    [n, r] = new U().decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const A = n;
    [n, r] = new qn().decode(e, r);
    const d = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: o,
        stateRoot: A,
        txPointer: d,
        contractID: n
      },
      r
    ];
  }
}, Er = class extends ie {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new we(32).encode(e.sender)), t.push(new we(32).encode(e.recipient)), t.push(new we(32).encode(e.nonce)), t.push(new N("u64").encode(e.amount)), t.push(H(e.data || "0x")), wt(se(t));
  }
  static encodeData(e) {
    const t = H(e || "0x"), n = t.length;
    return new we(n).encode(t);
  }
  encode(e) {
    const t = [], n = Er.encodeData(e.data);
    return t.push(new we(32).encode(e.sender)), t.push(new we(32).encode(e.recipient)), t.push(new N("u64").encode(e.amount)), t.push(new we(32).encode(e.nonce)), t.push(new z("u8").encode(e.witnessIndex)), t.push(new N("u64").encode(e.predicateGasUsed)), t.push(new z("u32").encode(n.length)), t.push(new z("u32").encode(e.predicateLength)), t.push(new z("u32").encode(e.predicateDataLength)), t.push(new we(n.length).encode(n)), t.push(new we(e.predicateLength).encode(e.predicate)), t.push(new we(e.predicateDataLength).encode(e.predicateData)), se(t);
  }
  static decodeData(e) {
    const t = H(e), n = t.length, [r] = new we(n).decode(t, 0);
    return H(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const A = n;
    [n, r] = new z("u8").decode(e, r);
    const d = Number(n);
    [n, r] = new N("u64").decode(e, r);
    const f = n;
    [n, r] = new z("u32").decode(e, r);
    const y = n;
    [n, r] = new z("u32").decode(e, r);
    const w = n;
    [n, r] = new z("u32").decode(e, r);
    const b = n;
    [n, r] = new we(y).decode(e, r);
    const x = n;
    [n, r] = new we(w).decode(e, r);
    const D = n;
    return [n, r] = new we(b).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: d,
        nonce: A,
        predicateGasUsed: f,
        dataLength: y,
        predicateLength: w,
        predicateDataLength: b,
        data: x,
        predicate: D,
        predicateData: n
      },
      r
    ];
  }
}, gs = class extends ie {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new wa().encode(e));
        break;
      }
      case 1: {
        t.push(new fs().encode(e));
        break;
      }
      case 2: {
        t.push(new Er().encode(e));
        break;
      }
      default:
        throw new v(
          F.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new wa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new fs().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Er().decode(e, r), [n, r];
      default:
        throw new v(
          F.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, ye = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(ye || {}), Ia = class extends ie {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, ps = class extends ie {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z("u8").encode(e.inputIndex)), t.push(new U().encode(e.balanceRoot)), t.push(new U().encode(e.stateRoot)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: n
      },
      r
    ];
  }
}, ya = class extends ie {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, Ba = class extends ie {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, Ca = class extends ie {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.contractId)), t.push(new U().encode(e.stateRoot)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 4,
        contractId: s,
        stateRoot: n
      },
      r
    ];
  }
}, ms = class extends ie {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Ia().encode(e));
        break;
      }
      case 1: {
        t.push(new ps().encode(e));
        break;
      }
      case 2: {
        t.push(new ya().encode(e));
        break;
      }
      case 3: {
        t.push(new Ba().encode(e));
        break;
      }
      case 4: {
        t.push(new Ca().encode(e));
        break;
      }
      default:
        throw new v(
          F.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Ia().decode(e, r), [n, r];
      case 1:
        return [n, r] = new ps().decode(e, r), [n, r];
      case 2:
        return [n, r] = new ya().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Ba().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Ca().decode(e, r), [n, r];
      default:
        throw new v(
          F.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, kt = /* @__PURE__ */ ((e) => (e[e.GasPrice = 1] = "GasPrice", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(kt || {}), Ch = (e) => e.sort((t, n) => t.type - n.type);
function Qh(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new v(
        F.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(n.type);
  });
}
var Es = class extends ie {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Qh(e);
    const t = Ch(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new N("u64").encode(r));
          break;
        case 4:
          n.push(new z("u32").encode(r));
          break;
        default:
          throw new v(F.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), se(n);
  }
  decode(e, t, n) {
    let r = t;
    const s = [];
    if (n & 1) {
      const [i, o] = new N("u64").decode(e, r);
      r = o, s.push({ type: 1, data: i });
    }
    if (n & 2) {
      const [i, o] = new N("u64").decode(e, r);
      r = o, s.push({ type: 2, data: i });
    }
    if (n & 4) {
      const [i, o] = new z("u32").decode(e, r);
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new N("u64").decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, Ae = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(Ae || {}), Qa = class extends ie {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.from)), t.push(new U().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), t.push(new N("u64").encode(e.gas)), t.push(new N("u64").encode(e.param1)), t.push(new N("u64").encode(e.param2)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const A = n;
    [n, r] = new N("u64").decode(e, r);
    const d = n;
    [n, r] = new N("u64").decode(e, r);
    const f = n;
    [n, r] = new N("u64").decode(e, r);
    const y = n;
    [n, r] = new N("u64").decode(e, r);
    const w = n;
    return [n, r] = new N("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: A,
        gas: d,
        param1: f,
        param2: y,
        pc: w,
        is: n
      },
      r
    ];
  }
}, ba = class extends ie {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new N("u64").encode(e.val)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    return [n, r] = new N("u64").decode(e, r), [
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
}, va = class extends ie {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new N("u64").encode(e.ptr)), t.push(new N("u64").encode(e.len)), t.push(new U().encode(e.digest)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const A = n;
    [n, r] = new N("u64").decode(e, r);
    const d = n;
    return [n, r] = new N("u64").decode(e, r), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: A,
        pc: d,
        is: n
      },
      r
    ];
  }
}, xa = class extends ie {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new N("u64").encode(e.reason)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), t.push(new U().encode(e.contractId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 3,
        id: s,
        reason: i,
        pc: o,
        is: A,
        contractId: n
      },
      r
    ];
  }
}, Fa = class extends ie {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new N("u64").encode(e.val)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    return [n, r] = new N("u64").decode(e, r), [
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
}, Da = class extends ie {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new N("u64").encode(e.val0)), t.push(new N("u64").encode(e.val1)), t.push(new N("u64").encode(e.val2)), t.push(new N("u64").encode(e.val3)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    [n, r] = new N("u64").decode(e, r);
    const d = n;
    [n, r] = new N("u64").decode(e, r);
    const f = n;
    return [n, r] = new N("u64").decode(e, r), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: A,
        val3: d,
        pc: f,
        is: n
      },
      r
    ];
  }
}, Ra = class extends ie {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new N("u64").encode(e.val0)), t.push(new N("u64").encode(e.val1)), t.push(new N("u64").encode(e.ptr)), t.push(new N("u64").encode(e.len)), t.push(new U().encode(e.digest)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    [n, r] = new N("u64").decode(e, r);
    const d = n;
    [n, r] = new U().decode(e, r);
    const f = n;
    [n, r] = new N("u64").decode(e, r);
    const y = n;
    return [n, r] = new N("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: A,
        len: d,
        digest: f,
        pc: y,
        is: n
      },
      r
    ];
  }
}, Na = class extends ie {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.from)), t.push(new U().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const A = n;
    [n, r] = new N("u64").decode(e, r);
    const d = n;
    return [n, r] = new N("u64").decode(e, r), [
      {
        type: 7,
        from: s,
        to: i,
        amount: o,
        assetId: A,
        pc: d,
        is: n
      },
      r
    ];
  }
}, Sa = class extends ie {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.from)), t.push(new U().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const A = n;
    [n, r] = new N("u64").decode(e, r);
    const d = n;
    return [n, r] = new N("u64").decode(e, r), [
      {
        type: 8,
        from: s,
        to: i,
        amount: o,
        assetId: A,
        pc: d,
        is: n
      },
      r
    ];
  }
}, _a = class extends ie {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new N("u64").encode(e.result)), t.push(new N("u64").encode(e.gasUsed)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new N("u64").decode(e, r);
    const s = n;
    return [n, r] = new N("u64").decode(e, r), [
      {
        type: 9,
        result: s,
        gasUsed: n
      },
      r
    ];
  }
}, ws = class extends ie {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new we(32).encode(e.sender)), t.push(new we(32).encode(e.recipient)), t.push(new we(32).encode(e.nonce)), t.push(new N("u64").encode(e.amount)), t.push(H(e.data || "0x")), wt(se(t));
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.sender)), t.push(new U().encode(e.recipient)), t.push(new N("u64").encode(e.amount)), t.push(new U().encode(e.nonce)), t.push(new z("u16").encode(e.data.length)), t.push(new U().encode(e.digest)), t.push(new we(e.data.length).encode(e.data)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const A = n;
    [n, r] = new z("u16").decode(e, r);
    const d = n;
    [n, r] = new U().decode(e, r);
    const f = n;
    [n, r] = new we(d).decode(e, r);
    const y = H(n), w = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: A,
      digest: f,
      data: y
    };
    return w.messageId = ws.getMessageId(w), [w, r];
  }
}, KA = (e, t) => {
  const n = H(e), r = H(t);
  return wt(se([n, r]));
}, wr = class extends ie {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return KA(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.subId)), t.push(new U().encode(e.contractId)), t.push(new N("u64").encode(e.val)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    [n, r] = new N("u64").decode(e, r);
    const d = n, f = wr.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: A,
      is: d,
      assetId: f
    }, r];
  }
}, Mi = class extends ie {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return KA(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.subId)), t.push(new U().encode(e.contractId)), t.push(new N("u64").encode(e.val)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    [n, r] = new N("u64").decode(e, r);
    const d = n, f = wr.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: A,
      is: d,
      assetId: f
    }, r];
  }
}, xw = class extends ie {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new Qa().encode(e));
        break;
      }
      case 1: {
        t.push(new ba().encode(e));
        break;
      }
      case 2: {
        t.push(new va().encode(e));
        break;
      }
      case 3: {
        t.push(new xa().encode(e));
        break;
      }
      case 4: {
        t.push(new Fa().encode(e));
        break;
      }
      case 5: {
        t.push(new Da().encode(e));
        break;
      }
      case 6: {
        t.push(new Ra().encode(e));
        break;
      }
      case 7: {
        t.push(new Na().encode(e));
        break;
      }
      case 8: {
        t.push(new Sa().encode(e));
        break;
      }
      case 9: {
        t.push(new _a().encode(e));
        break;
      }
      case 10: {
        t.push(new ws().encode(e));
        break;
      }
      case 11: {
        t.push(new wr().encode(e));
        break;
      }
      case 12: {
        t.push(new Mi().encode(e));
        break;
      }
      default:
        throw new v(F.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Qa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new ba().decode(e, r), [n, r];
      case 2:
        return [n, r] = new va().decode(e, r), [n, r];
      case 3:
        return [n, r] = new xa().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Fa().decode(e, r), [n, r];
      case 5:
        return [n, r] = new Da().decode(e, r), [n, r];
      case 6:
        return [n, r] = new Ra().decode(e, r), [n, r];
      case 7:
        return [n, r] = new Na().decode(e, r), [n, r];
      case 8:
        return [n, r] = new Sa().decode(e, r), [n, r];
      case 9:
        return [n, r] = new _a().decode(e, r), [n, r];
      case 10:
        return [n, r] = new ws().decode(e, r), [n, r];
      case 11:
        return [n, r] = new wr().decode(e, r), [n, r];
      case 12:
        return [n, r] = new Mi().decode(e, r), [n, r];
      default:
        throw new v(F.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, Ma = class extends Os {
  constructor() {
    super("StorageSlot", {
      key: new U(),
      value: new U()
    });
  }
}, Is = class extends ie {
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
    return t.push(new z("u32").encode(e.dataLength)), t.push(new we(e.dataLength).encode(e.data)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u32").decode(e, r);
    const s = n;
    return [n, r] = new we(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, gt = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e))(gt || {}), ka = class extends ie {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new N("u64").encode(e.scriptGasLimit)), t.push(new z("u32").encode(e.scriptLength)), t.push(new z("u32").encode(e.scriptDataLength)), t.push(new z("u32").encode(e.policyTypes)), t.push(new z("u8").encode(e.inputsCount)), t.push(new z("u8").encode(e.outputsCount)), t.push(new z("u8").encode(e.witnessesCount)), t.push(new U().encode(e.receiptsRoot)), t.push(new we(e.scriptLength).encode(e.script)), t.push(new we(e.scriptDataLength).encode(e.scriptData)), t.push(new Es().encode(e.policies)), t.push(new lt(new gs(), e.inputsCount).encode(e.inputs)), t.push(new lt(new ms(), e.outputsCount).encode(e.outputs)), t.push(new lt(new Is(), e.witnessesCount).encode(e.witnesses)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new N("u64").decode(e, r);
    const s = n;
    [n, r] = new z("u32").decode(e, r);
    const i = n;
    [n, r] = new z("u32").decode(e, r);
    const o = n;
    [n, r] = new z("u32").decode(e, r);
    const A = n;
    [n, r] = new z("u8").decode(e, r);
    const d = n;
    [n, r] = new z("u8").decode(e, r);
    const f = n;
    [n, r] = new z("u8").decode(e, r);
    const y = n;
    [n, r] = new U().decode(e, r);
    const w = n;
    [n, r] = new we(i).decode(e, r);
    const b = n;
    [n, r] = new we(o).decode(e, r);
    const x = n;
    [n, r] = new Es().decode(e, r, A);
    const D = n;
    [n, r] = new lt(new gs(), d).decode(e, r);
    const Q = n;
    [n, r] = new lt(new ms(), f).decode(e, r);
    const S = n;
    return [n, r] = new lt(new Is(), y).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: i,
        scriptDataLength: o,
        policyTypes: A,
        inputsCount: d,
        outputsCount: f,
        witnessesCount: y,
        receiptsRoot: w,
        script: b,
        scriptData: x,
        policies: D,
        inputs: Q,
        outputs: S,
        witnesses: n
      },
      r
    ];
  }
}, Oa = class extends ie {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z("u32").encode(e.bytecodeLength)), t.push(new z("u8").encode(e.bytecodeWitnessIndex)), t.push(new z("u32").encode(e.policyTypes)), t.push(new z("u16").encode(e.storageSlotsCount)), t.push(new z("u8").encode(e.inputsCount)), t.push(new z("u8").encode(e.outputsCount)), t.push(new z("u8").encode(e.witnessesCount)), t.push(new U().encode(e.salt)), t.push(new Es().encode(e.policies)), t.push(
      new lt(new Ma(), e.storageSlotsCount).encode(e.storageSlots)
    ), t.push(new lt(new gs(), e.inputsCount).encode(e.inputs)), t.push(new lt(new ms(), e.outputsCount).encode(e.outputs)), t.push(new lt(new Is(), e.witnessesCount).encode(e.witnesses)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u32").decode(e, r);
    const s = n;
    [n, r] = new z("u8").decode(e, r);
    const i = n;
    [n, r] = new z("u32").decode(e, r);
    const o = n;
    [n, r] = new z("u16").decode(e, r);
    const A = n;
    [n, r] = new z("u8").decode(e, r);
    const d = n;
    [n, r] = new z("u8").decode(e, r);
    const f = n;
    [n, r] = new z("u8").decode(e, r);
    const y = n;
    [n, r] = new U().decode(e, r);
    const w = n;
    [n, r] = new Es().decode(e, r, o);
    const b = n;
    [n, r] = new lt(new Ma(), A).decode(e, r);
    const x = n;
    [n, r] = new lt(new gs(), d).decode(e, r);
    const D = n;
    [n, r] = new lt(new ms(), f).decode(e, r);
    const Q = n;
    return [n, r] = new lt(new Is(), y).decode(e, r), [
      {
        type: 1,
        bytecodeLength: s,
        bytecodeWitnessIndex: i,
        policyTypes: o,
        storageSlotsCount: A,
        inputsCount: d,
        outputsCount: f,
        witnessesCount: y,
        salt: w,
        policies: b,
        storageSlots: x,
        inputs: D,
        outputs: Q,
        witnesses: n
      },
      r
    ];
  }
}, Ta = class extends ie {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new qn().encode(e.txPointer)), t.push(new fs().encode(e.inputContract)), t.push(new ps().encode(e.outputContract)), t.push(new N("u64").encode(e.mintAmount)), t.push(new U().encode(e.mintAssetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new qn().decode(e, r);
    const s = n;
    [n, r] = new fs().decode(e, r);
    const i = n;
    [n, r] = new ps().decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: A,
        mintAssetId: n
      },
      r
    ];
  }
}, mn = class extends ie {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new ka().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Oa().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new Ta().encode(e));
        break;
      }
      default:
        throw new v(
          F.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new ka().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Oa().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Ta().decode(e, r), [n, r];
      default:
        throw new v(
          F.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, Fw = class extends Os {
  constructor() {
    super("UtxoId", {
      transactionId: new U(),
      outputIndex: new z("u8")
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const eu = BigInt(0), Ts = BigInt(1), bh = BigInt(2);
function Zt(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const vh = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Wn(e) {
  if (!Zt(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += vh[e[n]];
  return t;
}
function tu(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function xo(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const Vt = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function La(e) {
  if (e >= Vt._0 && e <= Vt._9)
    return e - Vt._0;
  if (e >= Vt._A && e <= Vt._F)
    return e - (Vt._A - 10);
  if (e >= Vt._a && e <= Vt._f)
    return e - (Vt._a - 10);
}
function $n(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = La(e.charCodeAt(i)), A = La(e.charCodeAt(i + 1));
    if (o === void 0 || A === void 0) {
      const d = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + A;
  }
  return r;
}
function Cn(e) {
  return xo(Wn(e));
}
function Fo(e) {
  if (!Zt(e))
    throw new Error("Uint8Array expected");
  return xo(Wn(Uint8Array.from(e).reverse()));
}
function zn(e, t) {
  return $n(e.toString(16).padStart(t * 2, "0"));
}
function Do(e, t) {
  return zn(e, t).reverse();
}
function xh(e) {
  return $n(tu(e));
}
function Ot(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = $n(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Zt(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function Ir(...e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (!Zt(i))
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
function nu(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function Fh(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Dh(e) {
  let t;
  for (t = 0; e > eu; e >>= Ts, t += 1)
    ;
  return t;
}
function Rh(e, t) {
  return e >> BigInt(t) & Ts;
}
const Nh = (e, t, n) => e | (n ? Ts : eu) << BigInt(t), Ro = (e) => (bh << BigInt(e - 1)) - Ts, fi = (e) => new Uint8Array(e), Pa = (e) => Uint8Array.from(e);
function ru(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = fi(e), s = fi(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, A = (...w) => n(s, r, ...w), d = (w = fi()) => {
    s = A(Pa([0]), w), r = A(), w.length !== 0 && (s = A(Pa([1]), w), r = A());
  }, f = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let w = 0;
    const b = [];
    for (; w < t; ) {
      r = A();
      const x = r.slice();
      b.push(x), w += r.length;
    }
    return Ir(...b);
  };
  return (w, b) => {
    o(), d(w);
    let x;
    for (; !(x = b(f())); )
      d();
    return o(), x;
  };
}
const Sh = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || Zt(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function Rr(e, t, n = {}) {
  const r = (s, i, o) => {
    const A = Sh[i];
    if (typeof A != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const d = e[s];
    if (!(o && d === void 0) && !A(d, e))
      throw new Error(`Invalid param ${String(s)}=${d} (${typeof d}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(n))
    r(s, i, !0);
  return e;
}
const _h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: Rh,
  bitLen: Dh,
  bitMask: Ro,
  bitSet: Nh,
  bytesToHex: Wn,
  bytesToNumberBE: Cn,
  bytesToNumberLE: Fo,
  concatBytes: Ir,
  createHmacDrbg: ru,
  ensureBytes: Ot,
  equalBytes: nu,
  hexToBytes: $n,
  hexToNumber: xo,
  isBytes: Zt,
  numberToBytesBE: zn,
  numberToBytesLE: Do,
  numberToHexUnpadded: tu,
  numberToVarBytesBE: xh,
  utf8ToBytes: Fh,
  validateObject: Rr
}, Symbol.toStringTag, { value: "Module" }));
var gi = {}, ki = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Be < "u" && Be, r = function() {
    function i() {
      this.fetch = !1, this.DOMException = n.DOMException;
    }
    return i.prototype = n, new i();
  }();
  (function(i) {
    (function(o) {
      var A = typeof i < "u" && i || typeof self < "u" && self || typeof A < "u" && A, d = {
        searchParams: "URLSearchParams" in A,
        iterable: "Symbol" in A && "iterator" in Symbol,
        blob: "FileReader" in A && "Blob" in A && function() {
          try {
            return new Blob(), !0;
          } catch {
            return !1;
          }
        }(),
        formData: "FormData" in A,
        arrayBuffer: "ArrayBuffer" in A
      };
      function f(c) {
        return c && DataView.prototype.isPrototypeOf(c);
      }
      if (d.arrayBuffer)
        var y = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], w = ArrayBuffer.isView || function(c) {
          return c && y.indexOf(Object.prototype.toString.call(c)) > -1;
        };
      function b(c) {
        if (typeof c != "string" && (c = String(c)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(c) || c === "")
          throw new TypeError('Invalid character in header field name: "' + c + '"');
        return c.toLowerCase();
      }
      function x(c) {
        return typeof c != "string" && (c = String(c)), c;
      }
      function D(c) {
        var l = {
          next: function() {
            var p = c.shift();
            return { done: p === void 0, value: p };
          }
        };
        return d.iterable && (l[Symbol.iterator] = function() {
          return l;
        }), l;
      }
      function Q(c) {
        this.map = {}, c instanceof Q ? c.forEach(function(l, p) {
          this.append(p, l);
        }, this) : Array.isArray(c) ? c.forEach(function(l) {
          this.append(l[0], l[1]);
        }, this) : c && Object.getOwnPropertyNames(c).forEach(function(l) {
          this.append(l, c[l]);
        }, this);
      }
      Q.prototype.append = function(c, l) {
        c = b(c), l = x(l);
        var p = this.map[c];
        this.map[c] = p ? p + ", " + l : l;
      }, Q.prototype.delete = function(c) {
        delete this.map[b(c)];
      }, Q.prototype.get = function(c) {
        return c = b(c), this.has(c) ? this.map[c] : null;
      }, Q.prototype.has = function(c) {
        return this.map.hasOwnProperty(b(c));
      }, Q.prototype.set = function(c, l) {
        this.map[b(c)] = x(l);
      }, Q.prototype.forEach = function(c, l) {
        for (var p in this.map)
          this.map.hasOwnProperty(p) && c.call(l, this.map[p], p, this);
      }, Q.prototype.keys = function() {
        var c = [];
        return this.forEach(function(l, p) {
          c.push(p);
        }), D(c);
      }, Q.prototype.values = function() {
        var c = [];
        return this.forEach(function(l) {
          c.push(l);
        }), D(c);
      }, Q.prototype.entries = function() {
        var c = [];
        return this.forEach(function(l, p) {
          c.push([p, l]);
        }), D(c);
      }, d.iterable && (Q.prototype[Symbol.iterator] = Q.prototype.entries);
      function S(c) {
        if (c.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        c.bodyUsed = !0;
      }
      function _(c) {
        return new Promise(function(l, p) {
          c.onload = function() {
            l(c.result);
          }, c.onerror = function() {
            p(c.error);
          };
        });
      }
      function Z(c) {
        var l = new FileReader(), p = _(l);
        return l.readAsArrayBuffer(c), p;
      }
      function L(c) {
        var l = new FileReader(), p = _(l);
        return l.readAsText(c), p;
      }
      function j(c) {
        for (var l = new Uint8Array(c), p = new Array(l.length), h = 0; h < l.length; h++)
          p[h] = String.fromCharCode(l[h]);
        return p.join("");
      }
      function k(c) {
        if (c.slice)
          return c.slice(0);
        var l = new Uint8Array(c.byteLength);
        return l.set(new Uint8Array(c)), l.buffer;
      }
      function M() {
        return this.bodyUsed = !1, this._initBody = function(c) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = c, c ? typeof c == "string" ? this._bodyText = c : d.blob && Blob.prototype.isPrototypeOf(c) ? this._bodyBlob = c : d.formData && FormData.prototype.isPrototypeOf(c) ? this._bodyFormData = c : d.searchParams && URLSearchParams.prototype.isPrototypeOf(c) ? this._bodyText = c.toString() : d.arrayBuffer && d.blob && f(c) ? (this._bodyArrayBuffer = k(c.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(c) || w(c)) ? this._bodyArrayBuffer = k(c) : this._bodyText = c = Object.prototype.toString.call(c) : this._bodyText = "", this.headers.get("content-type") || (typeof c == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(c) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, d.blob && (this.blob = function() {
          var c = S(this);
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
            var c = S(this);
            return c || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(Z);
        }), this.text = function() {
          var c = S(this);
          if (c)
            return c;
          if (this._bodyBlob)
            return L(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(j(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, d.formData && (this.formData = function() {
          return this.text().then(G);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var O = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function P(c) {
        var l = c.toUpperCase();
        return O.indexOf(l) > -1 ? l : c;
      }
      function W(c, l) {
        if (!(this instanceof W))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l = l || {};
        var p = l.body;
        if (c instanceof W) {
          if (c.bodyUsed)
            throw new TypeError("Already read");
          this.url = c.url, this.credentials = c.credentials, l.headers || (this.headers = new Q(c.headers)), this.method = c.method, this.mode = c.mode, this.signal = c.signal, !p && c._bodyInit != null && (p = c._bodyInit, c.bodyUsed = !0);
        } else
          this.url = String(c);
        if (this.credentials = l.credentials || this.credentials || "same-origin", (l.headers || !this.headers) && (this.headers = new Q(l.headers)), this.method = P(l.method || this.method || "GET"), this.mode = l.mode || this.mode || null, this.signal = l.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && p)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(p), (this.method === "GET" || this.method === "HEAD") && (l.cache === "no-store" || l.cache === "no-cache")) {
          var h = /([?&])_=[^&]*/;
          if (h.test(this.url))
            this.url = this.url.replace(h, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var E = /\?/;
            this.url += (E.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      W.prototype.clone = function() {
        return new W(this, { body: this._bodyInit });
      };
      function G(c) {
        var l = new FormData();
        return c.trim().split("&").forEach(function(p) {
          if (p) {
            var h = p.split("="), E = h.shift().replace(/\+/g, " "), I = h.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(E), decodeURIComponent(I));
          }
        }), l;
      }
      function J(c) {
        var l = new Q(), p = c.replace(/\r?\n[\t ]+/g, " ");
        return p.split("\r").map(function(h) {
          return h.indexOf(`
`) === 0 ? h.substr(1, h.length) : h;
        }).forEach(function(h) {
          var E = h.split(":"), I = E.shift().trim();
          if (I) {
            var g = E.join(":").trim();
            l.append(I, g);
          }
        }), l;
      }
      M.call(W.prototype);
      function ee(c, l) {
        if (!(this instanceof ee))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l || (l = {}), this.type = "default", this.status = l.status === void 0 ? 200 : l.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = l.statusText === void 0 ? "" : "" + l.statusText, this.headers = new Q(l.headers), this.url = l.url || "", this._initBody(c);
      }
      M.call(ee.prototype), ee.prototype.clone = function() {
        return new ee(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Q(this.headers),
          url: this.url
        });
      }, ee.error = function() {
        var c = new ee(null, { status: 0, statusText: "" });
        return c.type = "error", c;
      };
      var B = [301, 302, 303, 307, 308];
      ee.redirect = function(c, l) {
        if (B.indexOf(l) === -1)
          throw new RangeError("Invalid status code");
        return new ee(null, { status: l, headers: { location: c } });
      }, o.DOMException = A.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(l, p) {
          this.message = l, this.name = p;
          var h = Error(l);
          this.stack = h.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function a(c, l) {
        return new Promise(function(p, h) {
          var E = new W(c, l);
          if (E.signal && E.signal.aborted)
            return h(new o.DOMException("Aborted", "AbortError"));
          var I = new XMLHttpRequest();
          function g() {
            I.abort();
          }
          I.onload = function() {
            var m = {
              status: I.status,
              statusText: I.statusText,
              headers: J(I.getAllResponseHeaders() || "")
            };
            m.url = "responseURL" in I ? I.responseURL : m.headers.get("X-Request-URL");
            var Y = "response" in I ? I.response : I.responseText;
            setTimeout(function() {
              p(new ee(Y, m));
            }, 0);
          }, I.onerror = function() {
            setTimeout(function() {
              h(new TypeError("Network request failed"));
            }, 0);
          }, I.ontimeout = function() {
            setTimeout(function() {
              h(new TypeError("Network request failed"));
            }, 0);
          }, I.onabort = function() {
            setTimeout(function() {
              h(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function u(m) {
            try {
              return m === "" && A.location.href ? A.location.href : m;
            } catch {
              return m;
            }
          }
          I.open(E.method, u(E.url), !0), E.credentials === "include" ? I.withCredentials = !0 : E.credentials === "omit" && (I.withCredentials = !1), "responseType" in I && (d.blob ? I.responseType = "blob" : d.arrayBuffer && E.headers.get("Content-Type") && E.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (I.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof Q) ? Object.getOwnPropertyNames(l.headers).forEach(function(m) {
            I.setRequestHeader(m, x(l.headers[m]));
          }) : E.headers.forEach(function(m, Y) {
            I.setRequestHeader(Y, m);
          }), E.signal && (E.signal.addEventListener("abort", g), I.onreadystatechange = function() {
            I.readyState === 4 && E.signal.removeEventListener("abort", g);
          }), I.send(typeof E._bodyInit > "u" ? null : E._bodyInit);
        });
      }
      return a.polyfill = !0, A.fetch || (A.fetch = a, A.Headers = Q, A.Request = W, A.Response = ee), o.Headers = Q, o.Request = W, o.Response = ee, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(ki, ki.exports);
var Mh = ki.exports;
function kh(e) {
  return typeof e == "object" && e !== null;
}
function Oh(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const Th = /\r\n|[\n\r]/g;
function Oi(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(Th)) {
    if (typeof s.index == "number" || Oh(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function Lh(e) {
  return su(
    e.source,
    Oi(e.source, e.start)
  );
}
function su(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, A = t.line === 1 ? n : 0, d = t.column + A, f = `${e.name}:${o}:${d}
`, y = r.split(/\r\n|[\n\r]/g), w = y[s];
  if (w.length > 120) {
    const b = Math.floor(d / 80), x = d % 80, D = [];
    for (let Q = 0; Q < w.length; Q += 80)
      D.push(w.slice(Q, Q + 80));
    return f + Ga([
      [`${o} |`, D[0]],
      ...D.slice(1, b + 1).map((Q) => ["|", Q]),
      ["|", "^".padStart(x)],
      ["|", D[b + 1]]
    ]);
  }
  return f + Ga([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, y[s - 1]],
    [`${o} |`, w],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, y[s + 1]]
  ]);
}
function Ga(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function Ph(e) {
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
class No extends Error {
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
    const { nodes: o, source: A, positions: d, path: f, originalError: y, extensions: w } = Ph(n);
    super(t), this.name = "GraphQLError", this.path = f ?? void 0, this.originalError = y ?? void 0, this.nodes = Ua(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const b = Ua(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((D) => D.loc).filter((D) => D != null)
    );
    this.source = A ?? (b == null || (s = b[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (b == null ? void 0 : b.map((D) => D.start)), this.locations = d && A ? d.map((D) => Oi(A, D)) : b == null ? void 0 : b.map((D) => Oi(D.source, D.start));
    const x = kh(
      y == null ? void 0 : y.extensions
    ) ? y == null ? void 0 : y.extensions : void 0;
    this.extensions = (i = w ?? x) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), y != null && y.stack ? Object.defineProperty(this, "stack", {
      value: y.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, No) : Object.defineProperty(this, "stack", {
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

` + Lh(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + su(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function Ua(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function ft(e, t, n) {
  return new No(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class Gh {
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
class iu {
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
const ou = {
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
}, Uh = new Set(Object.keys(ou));
function Ja(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Uh.has(t);
}
var _n;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(_n || (_n = {}));
var Ti;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Ti || (Ti = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function Li(e) {
  return e === 9 || e === 32;
}
function yr(e) {
  return e >= 48 && e <= 57;
}
function au(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function cu(e) {
  return au(e) || e === 95;
}
function Jh(e) {
  return au(e) || yr(e) || e === 95;
}
function Hh(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const A = e[o], d = Yh(A);
    d !== A.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return e.map((o, A) => A === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function Yh(e) {
  let t = 0;
  for (; t < e.length && Li(e.charCodeAt(t)); )
    ++t;
  return t;
}
function Zh(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((x) => x.length === 0 || Li(x.charCodeAt(0))), o = n.endsWith('\\"""'), A = e.endsWith('"') && !o, d = e.endsWith("\\"), f = A || d, y = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || f || i || o);
  let w = "";
  const b = s && Li(e.charCodeAt(0));
  return (y && !b || i) && (w += `
`), w += n, (y || f) && (w += `
`), '"""' + w + '"""';
}
var T;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(T || (T = {}));
class Vh {
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
    const n = new iu(T.SOF, 0, 0, 0, 0);
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
    if (t.kind !== T.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const n = jh(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === T.COMMENT);
    return t;
  }
}
function Xh(e) {
  return e === T.BANG || e === T.DOLLAR || e === T.AMP || e === T.PAREN_L || e === T.PAREN_R || e === T.SPREAD || e === T.COLON || e === T.EQUALS || e === T.AT || e === T.BRACKET_L || e === T.BRACKET_R || e === T.BRACE_L || e === T.PIPE || e === T.BRACE_R;
}
function nr(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Ls(e, t) {
  return Au(e.charCodeAt(t)) && uu(e.charCodeAt(t + 1));
}
function Au(e) {
  return e >= 55296 && e <= 56319;
}
function uu(e) {
  return e >= 56320 && e <= 57343;
}
function bn(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return T.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function dt(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new iu(t, n, r, i, o, s);
}
function jh(e, t) {
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
        return qh(e, s);
      case 33:
        return dt(e, T.BANG, s, s + 1);
      case 36:
        return dt(e, T.DOLLAR, s, s + 1);
      case 38:
        return dt(e, T.AMP, s, s + 1);
      case 40:
        return dt(e, T.PAREN_L, s, s + 1);
      case 41:
        return dt(e, T.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return dt(e, T.SPREAD, s, s + 3);
        break;
      case 58:
        return dt(e, T.COLON, s, s + 1);
      case 61:
        return dt(e, T.EQUALS, s, s + 1);
      case 64:
        return dt(e, T.AT, s, s + 1);
      case 91:
        return dt(e, T.BRACKET_L, s, s + 1);
      case 93:
        return dt(e, T.BRACKET_R, s, s + 1);
      case 123:
        return dt(e, T.BRACE_L, s, s + 1);
      case 124:
        return dt(e, T.PIPE, s, s + 1);
      case 125:
        return dt(e, T.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? tf(e, s) : $h(e, s);
    }
    if (yr(i) || i === 45)
      return Wh(e, s, i);
    if (cu(i))
      return nf(e, s);
    throw ft(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : nr(i) || Ls(n, s) ? `Unexpected character: ${bn(e, s)}.` : `Invalid character: ${bn(e, s)}.`
    );
  }
  return dt(e, T.EOF, r, r);
}
function qh(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (nr(i))
      ++s;
    else if (Ls(n, s))
      s += 2;
    else
      break;
  }
  return dt(
    e,
    T.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function Wh(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), yr(i))
      throw ft(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${bn(
          e,
          s
        )}.`
      );
  } else
    s = pi(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = pi(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = pi(e, s, i), i = r.charCodeAt(s)), i === 46 || cu(i))
    throw ft(
      e.source,
      s,
      `Invalid number, expected digit but got: ${bn(
        e,
        s
      )}.`
    );
  return dt(
    e,
    o ? T.FLOAT : T.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function pi(e, t, n) {
  if (!yr(n))
    throw ft(
      e.source,
      t,
      `Invalid number, expected digit but got: ${bn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; yr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function $h(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const A = n.charCodeAt(s);
    if (A === 34)
      return o += n.slice(i, s), dt(e, T.STRING, t, s + 1, o);
    if (A === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? zh(e, s) : Kh(e, s) : ef(e, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (A === 10 || A === 13)
      break;
    if (nr(A))
      ++s;
    else if (Ls(n, s))
      s += 2;
    else
      throw ft(
        e.source,
        s,
        `Invalid character within String: ${bn(
          e,
          s
        )}.`
      );
  }
  throw ft(e.source, s, "Unterminated string.");
}
function zh(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !nr(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | ur(i), r < 0)
      break;
  }
  throw ft(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(
      t,
      t + s
    )}".`
  );
}
function Kh(e, t) {
  const n = e.source.body, r = Ha(n, t + 2);
  if (nr(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Au(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Ha(n, t + 8);
    if (uu(s))
      return {
        value: String.fromCodePoint(r, s),
        size: 12
      };
  }
  throw ft(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function Ha(e, t) {
  return ur(e.charCodeAt(t)) << 12 | ur(e.charCodeAt(t + 1)) << 8 | ur(e.charCodeAt(t + 2)) << 4 | ur(e.charCodeAt(t + 3));
}
function ur(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function ef(e, t) {
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
  throw ft(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(
      t,
      t + 2
    )}".`
  );
}
function tf(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, A = "";
  const d = [];
  for (; i < r; ) {
    const f = n.charCodeAt(i);
    if (f === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      A += n.slice(o, i), d.push(A);
      const y = dt(
        e,
        T.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Hh(d).join(`
`)
      );
      return e.line += d.length - 1, e.lineStart = s, y;
    }
    if (f === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      A += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (f === 10 || f === 13) {
      A += n.slice(o, i), d.push(A), f === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, A = "", o = i, s = i;
      continue;
    }
    if (nr(f))
      ++i;
    else if (Ls(n, i))
      i += 2;
    else
      throw ft(
        e.source,
        i,
        `Invalid character within String: ${bn(
          e,
          i
        )}.`
      );
  }
  throw ft(e.source, i, "Unterminated string.");
}
function nf(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (Jh(i))
      ++s;
    else
      break;
  }
  return dt(
    e,
    T.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function ts(e, t) {
  if (!!!e)
    throw new Error(t);
}
const rf = 10, du = 2;
function lu(e) {
  return Ps(e, []);
}
function Ps(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return sf(e, t);
    default:
      return String(e);
  }
}
function sf(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (of(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : Ps(r, n);
  } else if (Array.isArray(e))
    return cf(e, n);
  return af(e, n);
}
function of(e) {
  return typeof e.toJSON == "function";
}
function af(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > du ? "[" + Af(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + Ps(i, t)
  ).join(", ") + " }";
}
function cf(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > du)
    return "[Array]";
  const n = Math.min(rf, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(Ps(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function Af(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const uf = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  function(t, n) {
    return t instanceof n;
  }
);
class hu {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || ts(!1, `Body must be a string. Received: ${lu(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || ts(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || ts(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function df(e) {
  return uf(e, hu);
}
function fu(e, t) {
  return new Nr(e, t).parseDocument();
}
function lf(e, t) {
  const n = new Nr(e, t);
  n.expectToken(T.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(T.EOF), r;
}
function hf(e, t) {
  const n = new Nr(e, t);
  n.expectToken(T.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(T.EOF), r;
}
function ff(e, t) {
  const n = new Nr(e, t);
  n.expectToken(T.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(T.EOF), r;
}
class Nr {
  constructor(t, n = {}) {
    const r = df(t) ? t : new hu(t);
    this._lexer = new Vh(r), this._options = n, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(T.NAME);
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
        T.SOF,
        this.parseDefinition,
        T.EOF
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
    if (this.peek(T.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), n = t ? this._lexer.lookahead() : this._lexer.token;
    if (n.kind === T.NAME) {
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
        throw ft(
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
    if (this.peek(T.BRACE_L))
      return this.node(t, {
        kind: ae.OPERATION_DEFINITION,
        operation: _n.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(T.NAME) && (r = this.parseName()), this.node(t, {
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
    const t = this.expectToken(T.NAME);
    switch (t.value) {
      case "query":
        return _n.QUERY;
      case "mutation":
        return _n.MUTATION;
      case "subscription":
        return _n.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      T.PAREN_L,
      this.parseVariableDefinition,
      T.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ae.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(T.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(T.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(T.DOLLAR), this.node(t, {
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
        T.BRACE_L,
        this.parseSelection,
        T.BRACE_R
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
    return this.peek(T.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, n = this.parseName();
    let r, s;
    return this.expectOptionalToken(T.COLON) ? (r = n, s = this.parseName()) : s = n, this.node(t, {
      kind: ae.FIELD,
      alias: r,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(T.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const n = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(T.PAREN_L, n, T.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(T.COLON), this.node(n, {
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
    this.expectToken(T.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(T.NAME) ? this.node(t, {
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
      case T.BRACKET_L:
        return this.parseList(t);
      case T.BRACE_L:
        return this.parseObject(t);
      case T.INT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.INT,
          value: n.value
        });
      case T.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.FLOAT,
          value: n.value
        });
      case T.STRING:
      case T.BLOCK_STRING:
        return this.parseStringLiteral();
      case T.NAME:
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
      case T.DOLLAR:
        if (t)
          if (this.expectToken(T.DOLLAR), this._lexer.token.kind === T.NAME) {
            const r = this._lexer.token.value;
            throw ft(
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
      block: t.kind === T.BLOCK_STRING
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
      values: this.any(T.BRACKET_L, n, T.BRACKET_R)
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
      fields: this.any(T.BRACE_L, n, T.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(T.COLON), this.node(n, {
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
    for (; this.peek(T.AT); )
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
    return this.expectToken(T.AT), this.node(n, {
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
    if (this.expectOptionalToken(T.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(T.BRACKET_R), n = this.node(t, {
        kind: ae.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(T.BANG) ? this.node(t, {
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
    return this.peek(T.STRING) || this.peek(T.BLOCK_STRING);
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
      T.BRACE_L,
      this.parseOperationTypeDefinition,
      T.BRACE_R
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
    this.expectToken(T.COLON);
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(T.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      T.BRACE_L,
      this.parseFieldDefinition,
      T.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(T.COLON);
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
      T.PAREN_L,
      this.parseInputValueDef,
      T.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(T.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(T.EQUALS) && (i = this.parseConstValueLiteral());
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
    return this.expectOptionalToken(T.EQUALS) ? this.delimitedMany(T.PIPE, this.parseNamedType) : [];
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
      T.BRACE_L,
      this.parseEnumValueDefinition,
      T.BRACE_R
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
      throw ft(
        this._lexer.source,
        this._lexer.token.start,
        `${Jr(
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
      T.BRACE_L,
      this.parseInputValueDef,
      T.BRACE_R
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
    if (t.kind === T.NAME)
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
      T.BRACE_L,
      this.parseOperationTypeDefinition,
      T.BRACE_R
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
    this.expectKeyword("directive"), this.expectToken(T.AT);
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
    return this.delimitedMany(T.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call(Ti, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new Gh(
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
    throw ft(
      this._lexer.source,
      n.start,
      `Expected ${gu(t)}, found ${Jr(n)}.`
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
    if (n.kind === T.NAME && n.value === t)
      this.advanceLexer();
    else
      throw ft(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${Jr(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const n = this._lexer.token;
    return n.kind === T.NAME && n.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const n = t ?? this._lexer.token;
    return ft(
      this._lexer.source,
      n.start,
      `Unexpected ${Jr(n)}.`
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
    if (t !== void 0 && n.kind !== T.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw ft(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function Jr(e) {
  const t = e.value;
  return gu(e.kind) + (t != null ? ` "${t}"` : "");
}
function gu(e) {
  return Xh(e) ? `"${e}"` : e;
}
const gf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: Nr,
  parse: fu,
  parseConstValue: hf,
  parseType: ff,
  parseValue: lf
}, Symbol.toStringTag, { value: "Module" })), pf = /* @__PURE__ */ Ki(gf);
function mf(e) {
  return `"${e.replace(Ef, wf)}"`;
}
const Ef = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function wf(e) {
  return If[e.charCodeAt(0)];
}
const If = [
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
], yf = Object.freeze({});
function Bf(e, t, n = ou) {
  const r = /* @__PURE__ */ new Map();
  for (const _ of Object.values(ae))
    r.set(_, Cf(t, _));
  let s, i = Array.isArray(e), o = [e], A = -1, d = [], f = e, y, w;
  const b = [], x = [];
  do {
    A++;
    const _ = A === o.length, Z = _ && d.length !== 0;
    if (_) {
      if (y = x.length === 0 ? void 0 : b[b.length - 1], f = w, w = x.pop(), Z)
        if (i) {
          f = f.slice();
          let j = 0;
          for (const [k, M] of d) {
            const O = k - j;
            M === null ? (f.splice(O, 1), j++) : f[O] = M;
          }
        } else {
          f = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(f)
          );
          for (const [j, k] of d)
            f[j] = k;
        }
      A = s.index, o = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (w) {
      if (y = i ? A : o[A], f = w[y], f == null)
        continue;
      b.push(y);
    }
    let L;
    if (!Array.isArray(f)) {
      var D, Q;
      Ja(f) || ts(!1, `Invalid AST Node: ${lu(f)}.`);
      const j = _ ? (D = r.get(f.kind)) === null || D === void 0 ? void 0 : D.leave : (Q = r.get(f.kind)) === null || Q === void 0 ? void 0 : Q.enter;
      if (L = j == null ? void 0 : j.call(t, f, y, w, b, x), L === yf)
        break;
      if (L === !1) {
        if (!_) {
          b.pop();
          continue;
        }
      } else if (L !== void 0 && (d.push([y, L]), !_))
        if (Ja(L))
          f = L;
        else {
          b.pop();
          continue;
        }
    }
    if (L === void 0 && Z && d.push([y, f]), _)
      b.pop();
    else {
      var S;
      s = {
        inArray: i,
        index: A,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(f), o = i ? f : (S = n[f.kind]) !== null && S !== void 0 ? S : [], A = -1, d = [], w && x.push(w), w = f;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : e;
}
function Cf(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function pu(e) {
  return Bf(e, bf);
}
const Qf = 80, bf = {
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
    leave: ({ selections: e }) => Mt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", te(n, ", "), ")");
      return o.length > Qf && (o = i + pe(`(
`, ns(te(n, `
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
    leave: ({ value: e, block: t }) => t ? Zh(e) : mf(e)
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
`) + te(["schema", te(t, " "), Mt(n)], " ")
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
        Mt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (Ya(n) ? pe(`(
`, ns(te(n, `
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
        Mt(s)
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
`) + te(["enum", t, te(n, " "), Mt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + te([t, te(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + te(["input", t, te(n, " "), Mt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (Ya(n) ? pe(`(
`, ns(te(n, `
`)), `
)`) : pe("(", te(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + te(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => te(
      ["extend schema", te(e, " "), Mt(t)],
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
        Mt(r)
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
        Mt(r)
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
    leave: ({ name: e, directives: t, values: n }) => te(["extend enum", e, te(t, " "), Mt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => te(["extend input", e, te(t, " "), Mt(n)], " ")
  }
};
function te(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Mt(e) {
  return pe(`{
`, ns(te(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function ns(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function Ya(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const vf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: pu
}, Symbol.toStringTag, { value: "Module" })), xf = /* @__PURE__ */ Ki(vf);
var So = {}, Gs = {}, mu = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, Ff = mu, Eu = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Ff;
}, Df = Eu, Rf = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = Df);
  var s, i = /* @__PURE__ */ new Map();
  function o(y, w) {
    var b = i.get(w);
    b ? b.push.apply(b, y) : i.set(w, y);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var A = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(y, w) {
        return o(["" + A + w], y), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(y, w) {
        var b = e(y, "" + A + w, r);
        return b.files.forEach(o), b.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var d in t) {
        var f = e(t[d], "" + A + d, r);
        f.files.forEach(o), s[d] = f.clone;
      }
    } else
      s = t;
  }
  return {
    clone: s,
    files: i
  };
};
Gs.ReactNativeFile = mu;
Gs.extractFiles = Rf;
Gs.isExtractableFile = Eu;
var Nf = typeof self == "object" ? self.FormData : window.FormData, Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.defaultJsonSerializer = void 0;
Sr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var Sf = Be && Be.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(So, "__esModule", { value: !0 });
var wu = Gs, _f = Sf(Nf), Mf = Sr, kf = function(e) {
  return wu.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Of(e, t, n, r) {
  r === void 0 && (r = Mf.defaultJsonSerializer);
  var s = wu.extractFiles({ query: e, variables: t, operationName: n }, "", kf), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var A = e.reduce(function(b, x, D) {
      return b.push({ query: x, variables: t ? t[D] : void 0 }), b;
    }, []);
    return r.stringify(A);
  }
  var d = typeof FormData > "u" ? _f.default : FormData, f = new d();
  f.append("operations", r.stringify(i));
  var y = {}, w = 0;
  return o.forEach(function(b) {
    y[++w] = b;
  }), f.append("map", r.stringify(y)), w = 0, o.forEach(function(b, x) {
    f.append("" + ++w, x);
  }), f;
}
So.default = Of;
var Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.parseBatchRequestsExtendedArgs = Qt.parseRawRequestExtendedArgs = Qt.parseRequestExtendedArgs = Qt.parseBatchRequestArgs = Qt.parseRawRequestArgs = Qt.parseRequestArgs = void 0;
function Tf(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Qt.parseRequestArgs = Tf;
function Lf(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Qt.parseRawRequestArgs = Lf;
function Pf(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Qt.parseBatchRequestArgs = Pf;
function Gf(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Qt.parseRequestExtendedArgs = Gf;
function Uf(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Qt.parseRawRequestExtendedArgs = Uf;
function Jf(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
Qt.parseBatchRequestsExtendedArgs = Jf;
var _r = {}, Hf = Be && Be.__extends || function() {
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
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.ClientError = void 0;
var Yf = (
  /** @class */
  function(e) {
    Hf(t, e);
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
_r.ClientError = Yf;
var ir = {}, Za;
function Zf() {
  if (Za)
    return ir;
  Za = 1;
  var e = Be && Be.__assign || function() {
    return e = Object.assign || function(k) {
      for (var M, O = 1, P = arguments.length; O < P; O++) {
        M = arguments[O];
        for (var W in M)
          Object.prototype.hasOwnProperty.call(M, W) && (k[W] = M[W]);
      }
      return k;
    }, e.apply(this, arguments);
  }, t = Be && Be.__awaiter || function(k, M, O, P) {
    function W(G) {
      return G instanceof O ? G : new O(function(J) {
        J(G);
      });
    }
    return new (O || (O = Promise))(function(G, J) {
      function ee(c) {
        try {
          a(P.next(c));
        } catch (l) {
          J(l);
        }
      }
      function B(c) {
        try {
          a(P.throw(c));
        } catch (l) {
          J(l);
        }
      }
      function a(c) {
        c.done ? G(c.value) : W(c.value).then(ee, B);
      }
      a((P = P.apply(k, M || [])).next());
    });
  }, n = Be && Be.__generator || function(k, M) {
    var O = { label: 0, sent: function() {
      if (G[0] & 1)
        throw G[1];
      return G[1];
    }, trys: [], ops: [] }, P, W, G, J;
    return J = { next: ee(0), throw: ee(1), return: ee(2) }, typeof Symbol == "function" && (J[Symbol.iterator] = function() {
      return this;
    }), J;
    function ee(a) {
      return function(c) {
        return B([a, c]);
      };
    }
    function B(a) {
      if (P)
        throw new TypeError("Generator is already executing.");
      for (; O; )
        try {
          if (P = 1, W && (G = a[0] & 2 ? W.return : a[0] ? W.throw || ((G = W.return) && G.call(W), 0) : W.next) && !(G = G.call(W, a[1])).done)
            return G;
          switch (W = 0, G && (a = [a[0] & 2, G.value]), a[0]) {
            case 0:
            case 1:
              G = a;
              break;
            case 4:
              return O.label++, { value: a[1], done: !1 };
            case 5:
              O.label++, W = a[1], a = [0];
              continue;
            case 7:
              a = O.ops.pop(), O.trys.pop();
              continue;
            default:
              if (G = O.trys, !(G = G.length > 0 && G[G.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                O = 0;
                continue;
              }
              if (a[0] === 3 && (!G || a[1] > G[0] && a[1] < G[3])) {
                O.label = a[1];
                break;
              }
              if (a[0] === 6 && O.label < G[1]) {
                O.label = G[1], G = a;
                break;
              }
              if (G && O.label < G[2]) {
                O.label = G[2], O.ops.push(a);
                break;
              }
              G[2] && O.ops.pop(), O.trys.pop();
              continue;
          }
          a = M.call(k, O);
        } catch (c) {
          a = [6, c], W = 0;
        } finally {
          P = G = 0;
        }
      if (a[0] & 5)
        throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(ir, "__esModule", { value: !0 }), ir.GraphQLWebSocketClient = void 0;
  var r = _r, s = Iu(), i = "connection_init", o = "connection_ack", A = "ping", d = "pong", f = "subscribe", y = "next", w = "error", b = "complete", x = (
    /** @class */
    function() {
      function k(M, O, P) {
        this._type = M, this._payload = O, this._id = P;
      }
      return Object.defineProperty(k.prototype, "type", {
        get: function() {
          return this._type;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(k.prototype, "id", {
        get: function() {
          return this._id;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(k.prototype, "payload", {
        get: function() {
          return this._payload;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(k.prototype, "text", {
        get: function() {
          var M = { type: this.type };
          return this.id != null && this.id != null && (M.id = this.id), this.payload != null && this.payload != null && (M.payload = this.payload), JSON.stringify(M);
        },
        enumerable: !1,
        configurable: !0
      }), k.parse = function(M, O) {
        var P = JSON.parse(M), W = P.type, G = P.payload, J = P.id;
        return new k(W, O(G), J);
      }, k;
    }()
  ), D = (
    /** @class */
    function() {
      function k(M, O) {
        var P = this, W = O.onInit, G = O.onAcknowledged, J = O.onPing, ee = O.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = M, M.onopen = function(B) {
          return t(P, void 0, void 0, function() {
            var a, c, l, p;
            return n(this, function(h) {
              switch (h.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, c = (a = M).send, l = S, W ? [4, W()] : [3, 2];
                case 1:
                  return p = h.sent(), [3, 3];
                case 2:
                  p = null, h.label = 3;
                case 3:
                  return c.apply(a, [l.apply(void 0, [p]).text]), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, M.onclose = function(B) {
          P.socketState.acknowledged = !1, P.socketState.subscriptions = {};
        }, M.onerror = function(B) {
          console.error(B);
        }, M.onmessage = function(B) {
          try {
            var a = Q(B.data);
            switch (a.type) {
              case o: {
                P.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (P.socketState.acknowledged = !0, G && G(a.payload));
                return;
              }
              case A: {
                J ? J(a.payload).then(function(E) {
                  return M.send(Z(E).text);
                }) : M.send(Z(null).text);
                return;
              }
              case d: {
                ee && ee(a.payload);
                return;
              }
            }
            if (!P.socketState.acknowledged || a.id === void 0 || a.id === null || !P.socketState.subscriptions[a.id])
              return;
            var c = P.socketState.subscriptions[a.id], l = c.query, p = c.variables, h = c.subscriber;
            switch (a.type) {
              case y: {
                !a.payload.errors && a.payload.data && h.next && h.next(a.payload.data), a.payload.errors && h.error && h.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: l, variables: p }));
                return;
              }
              case w: {
                h.error && h.error(new r.ClientError({ errors: a.payload, status: 200 }, { query: l, variables: p }));
                return;
              }
              case b: {
                h.complete && h.complete(), delete P.socketState.subscriptions[a.id];
                return;
              }
            }
          } catch (E) {
            console.error(E), M.close(1006);
          }
          M.close(4400, "Unknown graphql-ws message.");
        };
      }
      return k.prototype.makeSubscribe = function(M, O, P, W) {
        var G = this, J = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[J] = { query: M, variables: P, subscriber: W }, this.socket.send(L(J, { query: M, operationName: O, variables: P }).text), function() {
          G.socket.send(j(J).text), delete G.socketState.subscriptions[J];
        };
      }, k.prototype.rawRequest = function(M, O) {
        var P = this;
        return new Promise(function(W, G) {
          var J;
          P.rawSubscribe(M, {
            next: function(ee, B) {
              return J = { data: ee, extensions: B };
            },
            error: G,
            complete: function() {
              return W(J);
            }
          }, O);
        });
      }, k.prototype.request = function(M, O) {
        var P = this;
        return new Promise(function(W, G) {
          var J;
          P.subscribe(M, {
            next: function(ee) {
              return J = ee;
            },
            error: G,
            complete: function() {
              return W(J);
            }
          }, O);
        });
      }, k.prototype.subscribe = function(M, O, P) {
        var W = s.resolveRequestDocument(M), G = W.query, J = W.operationName;
        return this.makeSubscribe(G, J, P, O);
      }, k.prototype.rawSubscribe = function(M, O, P) {
        return this.makeSubscribe(M, void 0, P, O);
      }, k.prototype.ping = function(M) {
        this.socket.send(_(M).text);
      }, k.prototype.close = function() {
        this.socket.close(1e3);
      }, k.PROTOCOL = "graphql-transport-ws", k;
    }()
  );
  ir.GraphQLWebSocketClient = D;
  function Q(k, M) {
    M === void 0 && (M = function(P) {
      return P;
    });
    var O = x.parse(k, M);
    return O;
  }
  function S(k) {
    return new x(i, k);
  }
  function _(k) {
    return new x(A, k, void 0);
  }
  function Z(k) {
    return new x(d, k, void 0);
  }
  function L(k, M) {
    return new x(f, M, k);
  }
  function j(k) {
    return new x(b, void 0, k);
  }
  return ir;
}
var Va;
function Iu() {
  return Va || (Va = 1, function(e) {
    var t = Be && Be.__assign || function() {
      return t = Object.assign || function(h) {
        for (var E, I = 1, g = arguments.length; I < g; I++) {
          E = arguments[I];
          for (var u in E)
            Object.prototype.hasOwnProperty.call(E, u) && (h[u] = E[u]);
        }
        return h;
      }, t.apply(this, arguments);
    }, n = Be && Be.__createBinding || (Object.create ? function(h, E, I, g) {
      g === void 0 && (g = I), Object.defineProperty(h, g, { enumerable: !0, get: function() {
        return E[I];
      } });
    } : function(h, E, I, g) {
      g === void 0 && (g = I), h[g] = E[I];
    }), r = Be && Be.__setModuleDefault || (Object.create ? function(h, E) {
      Object.defineProperty(h, "default", { enumerable: !0, value: E });
    } : function(h, E) {
      h.default = E;
    }), s = Be && Be.__importStar || function(h) {
      if (h && h.__esModule)
        return h;
      var E = {};
      if (h != null)
        for (var I in h)
          I !== "default" && Object.prototype.hasOwnProperty.call(h, I) && n(E, h, I);
      return r(E, h), E;
    }, i = Be && Be.__awaiter || function(h, E, I, g) {
      function u(m) {
        return m instanceof I ? m : new I(function(Y) {
          Y(m);
        });
      }
      return new (I || (I = Promise))(function(m, Y) {
        function X(ne) {
          try {
            q(g.next(ne));
          } catch (re) {
            Y(re);
          }
        }
        function $(ne) {
          try {
            q(g.throw(ne));
          } catch (re) {
            Y(re);
          }
        }
        function q(ne) {
          ne.done ? m(ne.value) : u(ne.value).then(X, $);
        }
        q((g = g.apply(h, E || [])).next());
      });
    }, o = Be && Be.__generator || function(h, E) {
      var I = { label: 0, sent: function() {
        if (m[0] & 1)
          throw m[1];
        return m[1];
      }, trys: [], ops: [] }, g, u, m, Y;
      return Y = { next: X(0), throw: X(1), return: X(2) }, typeof Symbol == "function" && (Y[Symbol.iterator] = function() {
        return this;
      }), Y;
      function X(q) {
        return function(ne) {
          return $([q, ne]);
        };
      }
      function $(q) {
        if (g)
          throw new TypeError("Generator is already executing.");
        for (; I; )
          try {
            if (g = 1, u && (m = q[0] & 2 ? u.return : q[0] ? u.throw || ((m = u.return) && m.call(u), 0) : u.next) && !(m = m.call(u, q[1])).done)
              return m;
            switch (u = 0, m && (q = [q[0] & 2, m.value]), q[0]) {
              case 0:
              case 1:
                m = q;
                break;
              case 4:
                return I.label++, { value: q[1], done: !1 };
              case 5:
                I.label++, u = q[1], q = [0];
                continue;
              case 7:
                q = I.ops.pop(), I.trys.pop();
                continue;
              default:
                if (m = I.trys, !(m = m.length > 0 && m[m.length - 1]) && (q[0] === 6 || q[0] === 2)) {
                  I = 0;
                  continue;
                }
                if (q[0] === 3 && (!m || q[1] > m[0] && q[1] < m[3])) {
                  I.label = q[1];
                  break;
                }
                if (q[0] === 6 && I.label < m[1]) {
                  I.label = m[1], m = q;
                  break;
                }
                if (m && I.label < m[2]) {
                  I.label = m[2], I.ops.push(q);
                  break;
                }
                m[2] && I.ops.pop(), I.trys.pop();
                continue;
            }
            q = E.call(h, I);
          } catch (ne) {
            q = [6, ne], u = 0;
          } finally {
            g = m = 0;
          }
        if (q[0] & 5)
          throw q[1];
        return { value: q[0] ? q[1] : void 0, done: !0 };
      }
    }, A = Be && Be.__rest || function(h, E) {
      var I = {};
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && E.indexOf(g) < 0 && (I[g] = h[g]);
      if (h != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, g = Object.getOwnPropertySymbols(h); u < g.length; u++)
          E.indexOf(g[u]) < 0 && Object.prototype.propertyIsEnumerable.call(h, g[u]) && (I[g[u]] = h[g[u]]);
      return I;
    }, d = Be && Be.__importDefault || function(h) {
      return h && h.__esModule ? h : { default: h };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var f = s(Mh), y = f, w = pf, b = xf, x = d(So), D = Sr, Q = Qt, S = _r;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return S.ClientError;
    } });
    var _ = function(h) {
      var E = {};
      return h && (typeof Headers < "u" && h instanceof Headers || y && y.Headers && h instanceof y.Headers ? E = l(h) : Array.isArray(h) ? h.forEach(function(I) {
        var g = I[0], u = I[1];
        E[g] = u;
      }) : E = h), E;
    }, Z = function(h) {
      return h.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, L = function(h) {
      var E = h.query, I = h.variables, g = h.operationName, u = h.jsonSerializer;
      if (!Array.isArray(E)) {
        var m = ["query=" + encodeURIComponent(Z(E))];
        return I && m.push("variables=" + encodeURIComponent(u.stringify(I))), g && m.push("operationName=" + encodeURIComponent(g)), m.join("&");
      }
      if (typeof I < "u" && !Array.isArray(I))
        throw new Error("Cannot create query with given variable type, array expected");
      var Y = E.reduce(function(X, $, q) {
        return X.push({
          query: Z($),
          variables: I ? u.stringify(I[q]) : void 0
        }), X;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(Y));
    }, j = function(h) {
      var E = h.url, I = h.query, g = h.variables, u = h.operationName, m = h.headers, Y = h.fetch, X = h.fetchOptions, $ = h.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, ne;
        return o(this, function(re) {
          switch (re.label) {
            case 0:
              return q = x.default(I, g, u, X.jsonSerializer), ne = t({ method: "POST", headers: t(t({}, typeof q == "string" ? { "Content-Type": "application/json" } : {}), m), body: q }, X), $ ? [4, Promise.resolve($(ne))] : [3, 2];
            case 1:
              ne = re.sent(), re.label = 2;
            case 2:
              return [4, Y(E, ne)];
            case 3:
              return [2, re.sent()];
          }
        });
      });
    }, k = function(h) {
      var E = h.url, I = h.query, g = h.variables, u = h.operationName, m = h.headers, Y = h.fetch, X = h.fetchOptions, $ = h.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, ne;
        return o(this, function(re) {
          switch (re.label) {
            case 0:
              return q = L({
                query: I,
                variables: g,
                operationName: u,
                jsonSerializer: X.jsonSerializer
              }), ne = t({ method: "GET", headers: m }, X), $ ? [4, Promise.resolve($(ne))] : [3, 2];
            case 1:
              ne = re.sent(), re.label = 2;
            case 2:
              return [4, Y(E + "?" + q, ne)];
            case 3:
              return [2, re.sent()];
          }
        });
      });
    }, M = (
      /** @class */
      function() {
        function h(E, I) {
          I === void 0 && (I = {}), this.url = E, this.options = I;
        }
        return h.prototype.rawRequest = function(E, I, g) {
          return i(this, void 0, void 0, function() {
            var u, m, Y, X, $, q, ne, re, Fe, fe, oe, be;
            return o(this, function(ue) {
              return u = Q.parseRawRequestArgs(E, I, g), m = this.options, Y = m.headers, X = m.fetch, $ = X === void 0 ? f.default : X, q = m.method, ne = q === void 0 ? "POST" : q, re = m.requestMiddleware, Fe = m.responseMiddleware, fe = A(m, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, u.signal !== void 0 && (fe.signal = u.signal), be = B(u.query).operationName, [2, O({
                url: oe,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, _(a(Y))), _(u.requestHeaders)),
                operationName: be,
                fetch: $,
                method: ne,
                fetchOptions: fe,
                middleware: re
              }).then(function(ge) {
                return Fe && Fe(ge), ge;
              }).catch(function(ge) {
                throw Fe && Fe(ge), ge;
              })];
            });
          });
        }, h.prototype.request = function(E) {
          for (var I = [], g = 1; g < arguments.length; g++)
            I[g - 1] = arguments[g];
          var u = I[0], m = I[1], Y = Q.parseRequestArgs(E, u, m), X = this.options, $ = X.headers, q = X.fetch, ne = q === void 0 ? f.default : q, re = X.method, Fe = re === void 0 ? "POST" : re, fe = X.requestMiddleware, oe = X.responseMiddleware, be = A(X, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ue = this.url;
          Y.signal !== void 0 && (be.signal = Y.signal);
          var ge = B(Y.document), Pt = ge.query, ve = ge.operationName;
          return O({
            url: ue,
            query: Pt,
            variables: Y.variables,
            headers: t(t({}, _(a($))), _(Y.requestHeaders)),
            operationName: ve,
            fetch: ne,
            method: Fe,
            fetchOptions: be,
            middleware: fe
          }).then(function(Ie) {
            return oe && oe(Ie), Ie.data;
          }).catch(function(Ie) {
            throw oe && oe(Ie), Ie;
          });
        }, h.prototype.batchRequests = function(E, I) {
          var g = Q.parseBatchRequestArgs(E, I), u = this.options, m = u.headers, Y = u.fetch, X = Y === void 0 ? f.default : Y, $ = u.method, q = $ === void 0 ? "POST" : $, ne = u.requestMiddleware, re = u.responseMiddleware, Fe = A(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), fe = this.url;
          g.signal !== void 0 && (Fe.signal = g.signal);
          var oe = g.documents.map(function(ue) {
            var ge = ue.document;
            return B(ge).query;
          }), be = g.documents.map(function(ue) {
            var ge = ue.variables;
            return ge;
          });
          return O({
            url: fe,
            query: oe,
            variables: be,
            headers: t(t({}, _(a(m))), _(g.requestHeaders)),
            operationName: void 0,
            fetch: X,
            method: q,
            fetchOptions: Fe,
            middleware: ne
          }).then(function(ue) {
            return re && re(ue), ue.data;
          }).catch(function(ue) {
            throw re && re(ue), ue;
          });
        }, h.prototype.setHeaders = function(E) {
          return this.options.headers = E, this;
        }, h.prototype.setHeader = function(E, I) {
          var g, u = this.options.headers;
          return u ? u[E] = I : this.options.headers = (g = {}, g[E] = I, g), this;
        }, h.prototype.setEndpoint = function(E) {
          return this.url = E, this;
        }, h;
      }()
    );
    e.GraphQLClient = M;
    function O(h) {
      var E = h.url, I = h.query, g = h.variables, u = h.headers, m = h.operationName, Y = h.fetch, X = h.method, $ = X === void 0 ? "POST" : X, q = h.fetchOptions, ne = h.middleware;
      return i(this, void 0, void 0, function() {
        var re, Fe, fe, oe, be, ue, ge, Pt, ve, Ie, rr;
        return o(this, function(De) {
          switch (De.label) {
            case 0:
              return re = $.toUpperCase() === "POST" ? j : k, Fe = Array.isArray(I), [4, re({
                url: E,
                query: I,
                variables: g,
                operationName: m,
                headers: u,
                fetch: Y,
                fetchOptions: q,
                middleware: ne
              })];
            case 1:
              return fe = De.sent(), [4, J(fe, q.jsonSerializer)];
            case 2:
              if (oe = De.sent(), be = Fe && Array.isArray(oe) ? !oe.some(function(Me) {
                var Or = Me.data;
                return !Or;
              }) : !!oe.data, ue = !oe.errors || q.errorPolicy === "all" || q.errorPolicy === "ignore", fe.ok && ue && be)
                return ge = fe.headers, Pt = fe.status, oe.errors, ve = A(oe, ["errors"]), Ie = q.errorPolicy === "ignore" ? ve : oe, [2, t(t({}, Fe ? { data: Ie } : Ie), { headers: ge, status: Pt })];
              throw rr = typeof oe == "string" ? { error: oe } : oe, new S.ClientError(t(t({}, rr), { status: fe.status, headers: fe.headers }), { query: I, variables: g });
          }
        });
      });
    }
    function P(h, E, I, g) {
      return i(this, void 0, void 0, function() {
        var u, m;
        return o(this, function(Y) {
          return u = Q.parseRawRequestExtendedArgs(h, E, I, g), m = new M(u.url), [2, m.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = P;
    function W(h, E) {
      for (var I = [], g = 2; g < arguments.length; g++)
        I[g - 2] = arguments[g];
      return i(this, void 0, void 0, function() {
        var u, m, Y, X;
        return o(this, function($) {
          return u = I[0], m = I[1], Y = Q.parseRequestExtendedArgs(h, E, u, m), X = new M(Y.url), [2, X.request(t({}, Y))];
        });
      });
    }
    e.request = W;
    function G(h, E, I) {
      return i(this, void 0, void 0, function() {
        var g, u;
        return o(this, function(m) {
          return g = Q.parseBatchRequestsExtendedArgs(h, E, I), u = new M(g.url), [2, u.batchRequests(t({}, g))];
        });
      });
    }
    e.batchRequests = G, e.default = W;
    function J(h, E) {
      return E === void 0 && (E = D.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var I, g, u;
        return o(this, function(m) {
          switch (m.label) {
            case 0:
              return h.headers.forEach(function(Y, X) {
                X.toLowerCase() === "content-type" && (I = Y);
              }), I && I.toLowerCase().startsWith("application/json") ? (u = (g = E).parse, [4, h.text()]) : [3, 2];
            case 1:
              return [2, u.apply(g, [m.sent()])];
            case 2:
              return [2, h.text()];
          }
        });
      });
    }
    function ee(h) {
      var E, I = void 0, g = h.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return g.length === 1 && (I = (E = g[0].name) === null || E === void 0 ? void 0 : E.value), I;
    }
    function B(h) {
      if (typeof h == "string") {
        var E = void 0;
        try {
          var I = w.parse(h);
          E = ee(I);
        } catch {
        }
        return { query: h, operationName: E };
      }
      var g = ee(h);
      return { query: b.print(h), operationName: g };
    }
    e.resolveRequestDocument = B;
    function a(h) {
      return typeof h == "function" ? h() : h;
    }
    function c(h) {
      for (var E = [], I = 1; I < arguments.length; I++)
        E[I - 1] = arguments[I];
      return h.reduce(function(g, u, m) {
        return "" + g + u + (m in E ? E[m] : "");
      }, "");
    }
    e.gql = c;
    function l(h) {
      var E = {};
      return h.forEach(function(I, g) {
        E[g] = I;
      }), E;
    }
    var p = Zf();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return p.GraphQLWebSocketClient;
    } });
  }(gi)), gi;
}
var Vf = Iu();
function Xf(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function yu(e) {
  return function t(n) {
    return arguments.length === 0 || Xf(n) ? t : e.apply(this, arguments);
  };
}
var jf = /* @__PURE__ */ yu(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function qf(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function Bu(e, t, n) {
  if (n || (n = new $f()), Wf(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var A in e)
      Object.prototype.hasOwnProperty.call(e, A) && (i[A] = t ? Bu(e[A], !0, n) : e[A]);
    return i;
  };
  switch (jf(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return qf(e);
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
function Wf(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var $f = /* @__PURE__ */ function() {
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
          const A = i[o];
          if (A[0] === t)
            return A[1];
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
}(), zf = /* @__PURE__ */ yu(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : Bu(t, !0);
});
const Br = zf;
var ys = function() {
  return ys = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, ys.apply(this, arguments);
};
var rs = /* @__PURE__ */ new Map(), Pi = /* @__PURE__ */ new Map(), Cu = !0, Bs = !1;
function Qu(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function Kf(e) {
  return Qu(e.source.body.substring(e.start, e.end));
}
function eg(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = Kf(r.loc), o = Pi.get(s);
      o && !o.has(i) ? Cu && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Pi.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), ys(ys({}, e), { definitions: n });
}
function tg(e) {
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
function ng(e) {
  var t = Qu(e);
  if (!rs.has(t)) {
    var n = fu(e, {
      experimentalFragmentVariables: Bs,
      allowLegacyFragmentVariables: Bs
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    rs.set(t, tg(eg(n)));
  }
  return rs.get(t);
}
function Kn(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), ng(r);
}
function rg() {
  rs.clear(), Pi.clear();
}
function sg() {
  Cu = !1;
}
function ig() {
  Bs = !0;
}
function og() {
  Bs = !1;
}
var or = {
  gql: Kn,
  resetCaches: rg,
  disableFragmentWarnings: sg,
  enableExperimentalFragmentVariables: ig,
  disableExperimentalFragmentVariables: og
};
(function(e) {
  e.gql = or.gql, e.resetCaches = or.resetCaches, e.disableFragmentWarnings = or.disableFragmentWarnings, e.enableExperimentalFragmentVariables = or.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = or.disableExperimentalFragmentVariables;
})(Kn || (Kn = {}));
Kn.default = Kn;
const ce = Kn;
var Dw = 16 * 1024, Rw = 16, Nw = 1024 * 1024 * 1024, Sw = 1024 * 1024 * 1024, _w = 255, Mw = 1024 * 1024, kw = 1024 * 1024, ag = "0xffffffffffff0000", bu = "0xffffffffffff0001", cg = "0xffffffffffff0003", Ag = "0xffffffffffff0004", ug = "0xffffffffffff0005", Ow = "0x0", dg = [
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
], lg = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let de;
const vu = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && vu.decode();
let dr = null;
function xu() {
  return (dr === null || dr.byteLength === 0) && (dr = new Uint8Array(de.memory.buffer)), dr;
}
function hg(e, t) {
  return e = e >>> 0, vu.decode(xu().subarray(e, e + t));
}
function Fu(e) {
  const t = de.ret(e);
  return _t.__wrap(t);
}
function fg(e, t) {
  const n = de.retd(e, t);
  return _t.__wrap(n);
}
function Xa(e, t, n, r) {
  const s = de.call(e, t, n, r);
  return _t.__wrap(s);
}
function gg(e, t, n) {
  const r = de.tr(e, t, n);
  return _t.__wrap(r);
}
function ja(e, t, n) {
  const r = de.addi(e, t, n);
  return _t.__wrap(r);
}
function pg(e, t, n) {
  const r = de.muli(e, t, n);
  return _t.__wrap(r);
}
function lr(e, t, n) {
  const r = de.lw(e, t, n);
  return _t.__wrap(r);
}
function mg(e, t, n) {
  const r = de.gtf(e, t, n);
  return _t.__wrap(r);
}
function Hr(e, t) {
  const n = de.movi(e, t);
  return _t.__wrap(n);
}
let hr = null;
function qa() {
  return (hr === null || hr.byteLength === 0) && (hr = new Int32Array(de.memory.buffer)), hr;
}
function Eg(e, t) {
  return e = e >>> 0, xu().subarray(e / 1, e / 1 + t);
}
const wg = Object.freeze({
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
  *r" Set `$rA` to `tx.bytecodeLength`
  */
  CreateBytecodeLength: 256,
  256: "CreateBytecodeLength",
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
  *r" Set `$rA` to `tx.inputs[$rB].maturity`
  */
  InputCoinMaturity: 520,
  520: "InputCoinMaturity",
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
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].balanceRoot`
  */
  InputContractBalanceRoot: 546,
  546: "InputContractBalanceRoot",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].stateRoot`
  */
  InputContractStateRoot: 547,
  547: "InputContractStateRoot",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
  */
  InputContractTxPointer: 548,
  548: "InputContractTxPointer",
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
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].balanceRoot`
  */
  OutputContractBalanceRoot: 773,
  773: "OutputContractBalanceRoot",
  /**
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
  */
  OutputContractStateRoot: 774,
  774: "OutputContractStateRoot",
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
  PolicyGasPrice: 1281,
  1281: "PolicyGasPrice",
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
class _t {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(_t.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    const t = this.__destroy_into_raw();
    de.__wbg_instruction_free(t);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = de.__wbindgen_add_to_stack_pointer(-16);
      de.instruction_to_bytes(s, this.__wbg_ptr);
      var t = qa()[s / 4 + 0], n = qa()[s / 4 + 1], r = Eg(t, n).slice();
      return de.__wbindgen_free(t, n * 1, 1), r;
    } finally {
      de.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * Size of an instruction in bytes
  * @returns {number}
  */
  static size() {
    return de.instruction_size() >>> 0;
  }
}
class Se {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Se.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    const t = this.__destroy_into_raw();
    de.__wbg_regid_free(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * Returns `None` if the value is outside the 6-bit value range.
  * @param {number} u
  * @returns {RegId | undefined}
  */
  static new_checked(t) {
    const n = de.regid_new_checked(t);
    return n === 0 ? void 0 : Se.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = de.regid_bal();
    return Se.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = de.regid_cgas();
    return Se.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = de.regid_err();
    return Se.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = de.regid_flag();
    return Se.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = de.regid_fp();
    return Se.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = de.regid_ggas();
    return Se.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = de.regid_hp();
    return Se.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = de.regid_is();
    return Se.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = de.regid_of();
    return Se.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = de.regid_one();
    return Se.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = de.regid_pc();
    return Se.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = de.regid_ret();
    return Se.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = de.regid_retl();
    return Se.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = de.regid_sp();
    return Se.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = de.regid_spp();
    return Se.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = de.regid_writable();
    return Se.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = de.regid_zero();
    return Se.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const n = de.regid_new_typescript(t);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * A const alternative to the `Into<u8>` implementation.
  * @returns {number}
  */
  to_u8() {
    const t = this.__destroy_into_raw();
    return de.regid_to_u8(t);
  }
}
async function Ig(e, t) {
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
function yg() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(hg(t, n));
  }, e;
}
function Bg(e, t) {
  return de = e.exports, Du.__wbindgen_wasm_module = t, hr = null, dr = null, de;
}
async function Du(e) {
  if (de !== void 0)
    return de;
  const t = yg(), { instance: n, module: r } = await Ig(await e, t);
  return Bg(n, r);
}
function Cg(e, t, n, r) {
  function s(w, b, x) {
    var D = x ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, Q = x ? WebAssembly.compileStreaming : WebAssembly.compile;
    return b ? D(w, b) : Q(w);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var A = globalThis.atob(n), d = A.length;
    i = new Uint8Array(new ArrayBuffer(d));
    for (var f = 0; f < d; f++)
      i[f] = A.charCodeAt(f);
  }
  if (e) {
    var y = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(y, r) : y;
  } else
    return s(i, r, !1);
}
function Qg(e) {
  return Cg(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", e);
}
async function _o() {
  return await Du(Qg());
}
_o();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const pt = BigInt(0), Oe = BigInt(1), yn = BigInt(2), bg = BigInt(3), Gi = BigInt(4), Wa = BigInt(5), $a = BigInt(8);
BigInt(9);
BigInt(16);
function Bt(e, t) {
  const n = e % t;
  return n >= pt ? n : t + n;
}
function vg(e, t, n) {
  if (n <= pt || t < pt)
    throw new Error("Expected power/modulo > 0");
  if (n === Oe)
    return pt;
  let r = Oe;
  for (; t > pt; )
    t & Oe && (r = r * e % n), e = e * e % n, t >>= Oe;
  return r;
}
function Rt(e, t, n) {
  let r = e;
  for (; t-- > pt; )
    r *= r, r %= n;
  return r;
}
function Ui(e, t) {
  if (e === pt || t <= pt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = Bt(e, t), r = t, s = pt, i = Oe;
  for (; n !== pt; ) {
    const A = r / n, d = r % n, f = s - i * A;
    r = n, n = d, s = i, i = f;
  }
  if (r !== Oe)
    throw new Error("invert: does not exist");
  return Bt(s, t);
}
function xg(e) {
  const t = (e - Oe) / yn;
  let n, r, s;
  for (n = e - Oe, r = 0; n % yn === pt; n /= yn, r++)
    ;
  for (s = yn; s < e && vg(s, t, e) !== e - Oe; s++)
    ;
  if (r === 1) {
    const o = (e + Oe) / Gi;
    return function(d, f) {
      const y = d.pow(f, o);
      if (!d.eql(d.sqr(y), f))
        throw new Error("Cannot find square root");
      return y;
    };
  }
  const i = (n + Oe) / yn;
  return function(A, d) {
    if (A.pow(d, t) === A.neg(A.ONE))
      throw new Error("Cannot find square root");
    let f = r, y = A.pow(A.mul(A.ONE, s), n), w = A.pow(d, i), b = A.pow(d, n);
    for (; !A.eql(b, A.ONE); ) {
      if (A.eql(b, A.ZERO))
        return A.ZERO;
      let x = 1;
      for (let Q = A.sqr(b); x < f && !A.eql(Q, A.ONE); x++)
        Q = A.sqr(Q);
      const D = A.pow(y, Oe << BigInt(f - x - 1));
      y = A.sqr(D), w = A.mul(w, D), b = A.mul(b, y), f = x;
    }
    return w;
  };
}
function Fg(e) {
  if (e % Gi === bg) {
    const t = (e + Oe) / Gi;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % $a === Wa) {
    const t = (e - Wa) / $a;
    return function(r, s) {
      const i = r.mul(s, yn), o = r.pow(i, t), A = r.mul(s, o), d = r.mul(r.mul(A, yn), o), f = r.mul(A, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(f), s))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  return xg(e);
}
const Dg = [
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
function Rg(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = Dg.reduce((r, s) => (r[s] = "function", r), t);
  return Rr(e, n);
}
function Ng(e, t, n) {
  if (n < pt)
    throw new Error("Expected power > 0");
  if (n === pt)
    return e.ONE;
  if (n === Oe)
    return t;
  let r = e.ONE, s = t;
  for (; n > pt; )
    n & Oe && (r = e.mul(r, s)), s = e.sqr(s), n >>= Oe;
  return r;
}
function Sg(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, A) => e.is0(o) ? i : (n[A] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, A) => e.is0(o) ? i : (n[A] = e.mul(i, n[A]), e.mul(i, o)), s), n;
}
function Ru(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function _g(e, t, n = !1, r = {}) {
  if (e <= pt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = Ru(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Fg(e), A = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: Ro(s),
    ZERO: pt,
    ONE: Oe,
    create: (d) => Bt(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return pt <= d && d < e;
    },
    is0: (d) => d === pt,
    isOdd: (d) => (d & Oe) === Oe,
    neg: (d) => Bt(-d, e),
    eql: (d, f) => d === f,
    sqr: (d) => Bt(d * d, e),
    add: (d, f) => Bt(d + f, e),
    sub: (d, f) => Bt(d - f, e),
    mul: (d, f) => Bt(d * f, e),
    pow: (d, f) => Ng(A, d, f),
    div: (d, f) => Bt(d * Ui(f, e), e),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, f) => d + f,
    subN: (d, f) => d - f,
    mulN: (d, f) => d * f,
    inv: (d) => Ui(d, e),
    sqrt: r.sqrt || ((d) => o(A, d)),
    invertBatch: (d) => Sg(A, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, f, y) => y ? f : d,
    toBytes: (d) => n ? Do(d, i) : zn(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? Fo(d) : Cn(d);
    }
  });
  return Object.freeze(A);
}
function Nu(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Su(e) {
  const t = Nu(e);
  return t + Math.ceil(t / 2);
}
function Mg(e, t, n = !1) {
  const r = e.length, s = Nu(t), i = Su(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Cn(e) : Fo(e), A = Bt(o, t - Oe) + Oe;
  return n ? Do(A, s) : zn(A, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const kg = BigInt(0), mi = BigInt(1);
function Og(e, t) {
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
      let o = e.ZERO, A = s;
      for (; i > kg; )
        i & mi && (o = o.add(A)), A = A.double(), i >>= mi;
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
      const { windows: o, windowSize: A } = r(i), d = [];
      let f = s, y = f;
      for (let w = 0; w < o; w++) {
        y = f, d.push(y);
        for (let b = 1; b < A; b++)
          y = y.add(f), d.push(y);
        f = y.double();
      }
      return d;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, o) {
      const { windows: A, windowSize: d } = r(s);
      let f = e.ZERO, y = e.BASE;
      const w = BigInt(2 ** s - 1), b = 2 ** s, x = BigInt(s);
      for (let D = 0; D < A; D++) {
        const Q = D * d;
        let S = Number(o & w);
        o >>= x, S > d && (S -= b, o += mi);
        const _ = Q, Z = Q + Math.abs(S) - 1, L = D % 2 !== 0, j = S < 0;
        S === 0 ? y = y.add(n(L, i[_])) : f = f.add(n(j, i[Z]));
      }
      return { p: f, f: y };
    },
    wNAFCached(s, i, o, A) {
      const d = s._WINDOW_SIZE || 1;
      let f = i.get(s);
      return f || (f = this.precomputeWindow(s, d), d !== 1 && i.set(s, A(f))), this.wNAF(d, f, o);
    }
  };
}
function _u(e) {
  return Rg(e.Fp), Rr(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Ru(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Tg(e) {
  const t = _u(e);
  Rr(t, {
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
const { bytesToNumberBE: Lg, hexToBytes: Pg } = _h, Bn = {
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
    return { d: Lg(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Bn, n = typeof e == "string" ? Pg(e) : e;
    if (!Zt(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Bn._parseInt(n.subarray(2)), { d: o, l: A } = Bn._parseInt(i);
    if (A.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (f) => Number.parseInt(f[0], 16) & 8 ? "00" + f : f, n = (f) => {
      const y = f.toString(16);
      return y.length & 1 ? `0${y}` : y;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, A = n(i), d = n(o);
    return `30${n(o + i + 4)}02${d}${s}02${A}${r}`;
  }
}, $t = BigInt(0), Nt = BigInt(1);
BigInt(2);
const za = BigInt(3);
BigInt(4);
function Gg(e) {
  const t = Tg(e), { Fp: n } = t, r = t.toBytes || ((D, Q, S) => {
    const _ = Q.toAffine();
    return Ir(Uint8Array.from([4]), n.toBytes(_.x), n.toBytes(_.y));
  }), s = t.fromBytes || ((D) => {
    const Q = D.subarray(1), S = n.fromBytes(Q.subarray(0, n.BYTES)), _ = n.fromBytes(Q.subarray(n.BYTES, 2 * n.BYTES));
    return { x: S, y: _ };
  });
  function i(D) {
    const { a: Q, b: S } = t, _ = n.sqr(D), Z = n.mul(_, D);
    return n.add(n.add(Z, n.mul(D, Q)), S);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(D) {
    return typeof D == "bigint" && $t < D && D < t.n;
  }
  function A(D) {
    if (!o(D))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(D) {
    const { allowedPrivateKeyLengths: Q, nByteLength: S, wrapPrivateKey: _, n: Z } = t;
    if (Q && typeof D != "bigint") {
      if (Zt(D) && (D = Wn(D)), typeof D != "string" || !Q.includes(D.length))
        throw new Error("Invalid key");
      D = D.padStart(S * 2, "0");
    }
    let L;
    try {
      L = typeof D == "bigint" ? D : Cn(Ot("private key", D, S));
    } catch {
      throw new Error(`private key must be ${S} bytes, hex or bigint, not ${typeof D}`);
    }
    return _ && (L = Bt(L, Z)), A(L), L;
  }
  const f = /* @__PURE__ */ new Map();
  function y(D) {
    if (!(D instanceof w))
      throw new Error("ProjectivePoint expected");
  }
  class w {
    constructor(Q, S, _) {
      if (this.px = Q, this.py = S, this.pz = _, Q == null || !n.isValid(Q))
        throw new Error("x required");
      if (S == null || !n.isValid(S))
        throw new Error("y required");
      if (_ == null || !n.isValid(_))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(Q) {
      const { x: S, y: _ } = Q || {};
      if (!Q || !n.isValid(S) || !n.isValid(_))
        throw new Error("invalid affine point");
      if (Q instanceof w)
        throw new Error("projective point not allowed");
      const Z = (L) => n.eql(L, n.ZERO);
      return Z(S) && Z(_) ? w.ZERO : new w(S, _, n.ONE);
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
    static normalizeZ(Q) {
      const S = n.invertBatch(Q.map((_) => _.pz));
      return Q.map((_, Z) => _.toAffine(S[Z])).map(w.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(Q) {
      const S = w.fromAffine(s(Ot("pointHex", Q)));
      return S.assertValidity(), S;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(Q) {
      return w.BASE.multiply(d(Q));
    }
    // "Private method", don't use it directly
    _setWindowSize(Q) {
      this._WINDOW_SIZE = Q, f.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !n.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: Q, y: S } = this.toAffine();
      if (!n.isValid(Q) || !n.isValid(S))
        throw new Error("bad point: x or y not FE");
      const _ = n.sqr(S), Z = i(Q);
      if (!n.eql(_, Z))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: Q } = this.toAffine();
      if (n.isOdd)
        return !n.isOdd(Q);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(Q) {
      y(Q);
      const { px: S, py: _, pz: Z } = this, { px: L, py: j, pz: k } = Q, M = n.eql(n.mul(S, k), n.mul(L, Z)), O = n.eql(n.mul(_, k), n.mul(j, Z));
      return M && O;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new w(this.px, n.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: Q, b: S } = t, _ = n.mul(S, za), { px: Z, py: L, pz: j } = this;
      let k = n.ZERO, M = n.ZERO, O = n.ZERO, P = n.mul(Z, Z), W = n.mul(L, L), G = n.mul(j, j), J = n.mul(Z, L);
      return J = n.add(J, J), O = n.mul(Z, j), O = n.add(O, O), k = n.mul(Q, O), M = n.mul(_, G), M = n.add(k, M), k = n.sub(W, M), M = n.add(W, M), M = n.mul(k, M), k = n.mul(J, k), O = n.mul(_, O), G = n.mul(Q, G), J = n.sub(P, G), J = n.mul(Q, J), J = n.add(J, O), O = n.add(P, P), P = n.add(O, P), P = n.add(P, G), P = n.mul(P, J), M = n.add(M, P), G = n.mul(L, j), G = n.add(G, G), P = n.mul(G, J), k = n.sub(k, P), O = n.mul(G, W), O = n.add(O, O), O = n.add(O, O), new w(k, M, O);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(Q) {
      y(Q);
      const { px: S, py: _, pz: Z } = this, { px: L, py: j, pz: k } = Q;
      let M = n.ZERO, O = n.ZERO, P = n.ZERO;
      const W = t.a, G = n.mul(t.b, za);
      let J = n.mul(S, L), ee = n.mul(_, j), B = n.mul(Z, k), a = n.add(S, _), c = n.add(L, j);
      a = n.mul(a, c), c = n.add(J, ee), a = n.sub(a, c), c = n.add(S, Z);
      let l = n.add(L, k);
      return c = n.mul(c, l), l = n.add(J, B), c = n.sub(c, l), l = n.add(_, Z), M = n.add(j, k), l = n.mul(l, M), M = n.add(ee, B), l = n.sub(l, M), P = n.mul(W, c), M = n.mul(G, B), P = n.add(M, P), M = n.sub(ee, P), P = n.add(ee, P), O = n.mul(M, P), ee = n.add(J, J), ee = n.add(ee, J), B = n.mul(W, B), c = n.mul(G, c), ee = n.add(ee, B), B = n.sub(J, B), B = n.mul(W, B), c = n.add(c, B), J = n.mul(ee, c), O = n.add(O, J), J = n.mul(l, c), M = n.mul(a, M), M = n.sub(M, J), J = n.mul(a, ee), P = n.mul(l, P), P = n.add(P, J), new w(M, O, P);
    }
    subtract(Q) {
      return this.add(Q.negate());
    }
    is0() {
      return this.equals(w.ZERO);
    }
    wNAF(Q) {
      return x.wNAFCached(this, f, Q, (S) => {
        const _ = n.invertBatch(S.map((Z) => Z.pz));
        return S.map((Z, L) => Z.toAffine(_[L])).map(w.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(Q) {
      const S = w.ZERO;
      if (Q === $t)
        return S;
      if (A(Q), Q === Nt)
        return this;
      const { endo: _ } = t;
      if (!_)
        return x.unsafeLadder(this, Q);
      let { k1neg: Z, k1: L, k2neg: j, k2: k } = _.splitScalar(Q), M = S, O = S, P = this;
      for (; L > $t || k > $t; )
        L & Nt && (M = M.add(P)), k & Nt && (O = O.add(P)), P = P.double(), L >>= Nt, k >>= Nt;
      return Z && (M = M.negate()), j && (O = O.negate()), O = new w(n.mul(O.px, _.beta), O.py, O.pz), M.add(O);
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
    multiply(Q) {
      A(Q);
      let S = Q, _, Z;
      const { endo: L } = t;
      if (L) {
        const { k1neg: j, k1: k, k2neg: M, k2: O } = L.splitScalar(S);
        let { p: P, f: W } = this.wNAF(k), { p: G, f: J } = this.wNAF(O);
        P = x.constTimeNegate(j, P), G = x.constTimeNegate(M, G), G = new w(n.mul(G.px, L.beta), G.py, G.pz), _ = P.add(G), Z = W.add(J);
      } else {
        const { p: j, f: k } = this.wNAF(S);
        _ = j, Z = k;
      }
      return w.normalizeZ([_, Z])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(Q, S, _) {
      const Z = w.BASE, L = (k, M) => M === $t || M === Nt || !k.equals(Z) ? k.multiplyUnsafe(M) : k.multiply(M), j = L(this, S).add(L(Q, _));
      return j.is0() ? void 0 : j;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(Q) {
      const { px: S, py: _, pz: Z } = this, L = this.is0();
      Q == null && (Q = L ? n.ONE : n.inv(Z));
      const j = n.mul(S, Q), k = n.mul(_, Q), M = n.mul(Z, Q);
      if (L)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(M, n.ONE))
        throw new Error("invZ was invalid");
      return { x: j, y: k };
    }
    isTorsionFree() {
      const { h: Q, isTorsionFree: S } = t;
      if (Q === Nt)
        return !0;
      if (S)
        return S(w, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: Q, clearCofactor: S } = t;
      return Q === Nt ? this : S ? S(w, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(Q = !0) {
      return this.assertValidity(), r(w, this, Q);
    }
    toHex(Q = !0) {
      return Wn(this.toRawBytes(Q));
    }
  }
  w.BASE = new w(t.Gx, t.Gy, n.ONE), w.ZERO = new w(n.ZERO, n.ONE, n.ZERO);
  const b = t.nBitLength, x = Og(w, t.endo ? Math.ceil(b / 2) : b);
  return {
    CURVE: t,
    ProjectivePoint: w,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Ug(e) {
  const t = _u(e);
  return Rr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Jg(e) {
  const t = Ug(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(c) {
    return $t < c && c < n.ORDER;
  }
  function A(c) {
    return Bt(c, r);
  }
  function d(c) {
    return Ui(c, r);
  }
  const { ProjectivePoint: f, normPrivateKeyToScalar: y, weierstrassEquation: w, isWithinCurveOrder: b } = Gg({
    ...t,
    toBytes(c, l, p) {
      const h = l.toAffine(), E = n.toBytes(h.x), I = Ir;
      return p ? I(Uint8Array.from([l.hasEvenY() ? 2 : 3]), E) : I(Uint8Array.from([4]), E, n.toBytes(h.y));
    },
    fromBytes(c) {
      const l = c.length, p = c[0], h = c.subarray(1);
      if (l === s && (p === 2 || p === 3)) {
        const E = Cn(h);
        if (!o(E))
          throw new Error("Point is not on curve");
        const I = w(E);
        let g = n.sqrt(I);
        const u = (g & Nt) === Nt;
        return (p & 1) === 1 !== u && (g = n.neg(g)), { x: E, y: g };
      } else if (l === i && p === 4) {
        const E = n.fromBytes(h.subarray(0, n.BYTES)), I = n.fromBytes(h.subarray(n.BYTES, 2 * n.BYTES));
        return { x: E, y: I };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), x = (c) => Wn(zn(c, t.nByteLength));
  function D(c) {
    const l = r >> Nt;
    return c > l;
  }
  function Q(c) {
    return D(c) ? A(-c) : c;
  }
  const S = (c, l, p) => Cn(c.slice(l, p));
  class _ {
    constructor(l, p, h) {
      this.r = l, this.s = p, this.recovery = h, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(l) {
      const p = t.nByteLength;
      return l = Ot("compactSignature", l, p * 2), new _(S(l, 0, p), S(l, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(l) {
      const { r: p, s: h } = Bn.toSig(Ot("DER", l));
      return new _(p, h);
    }
    assertValidity() {
      if (!b(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!b(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(l) {
      return new _(this.r, this.s, l);
    }
    recoverPublicKey(l) {
      const { r: p, s: h, recovery: E } = this, I = O(Ot("msgHash", l));
      if (E == null || ![0, 1, 2, 3].includes(E))
        throw new Error("recovery id invalid");
      const g = E === 2 || E === 3 ? p + t.n : p;
      if (g >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = E & 1 ? "03" : "02", m = f.fromHex(u + x(g)), Y = d(g), X = A(-I * Y), $ = A(h * Y), q = f.BASE.multiplyAndAddUnsafe(m, X, $);
      if (!q)
        throw new Error("point at infinify");
      return q.assertValidity(), q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return D(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new _(this.r, A(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return $n(this.toDERHex());
    }
    toDERHex() {
      return Bn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return $n(this.toCompactHex());
    }
    toCompactHex() {
      return x(this.r) + x(this.s);
    }
  }
  const Z = {
    isValidPrivateKey(c) {
      try {
        return y(c), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: y,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const c = Su(t.n);
      return Mg(t.randomBytes(c), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(c = 8, l = f.BASE) {
      return l._setWindowSize(c), l.multiply(BigInt(3)), l;
    }
  };
  function L(c, l = !0) {
    return f.fromPrivateKey(c).toRawBytes(l);
  }
  function j(c) {
    const l = Zt(c), p = typeof c == "string", h = (l || p) && c.length;
    return l ? h === s || h === i : p ? h === 2 * s || h === 2 * i : c instanceof f;
  }
  function k(c, l, p = !0) {
    if (j(c))
      throw new Error("first arg must be private key");
    if (!j(l))
      throw new Error("second arg must be public key");
    return f.fromHex(l).multiply(y(c)).toRawBytes(p);
  }
  const M = t.bits2int || function(c) {
    const l = Cn(c), p = c.length * 8 - t.nBitLength;
    return p > 0 ? l >> BigInt(p) : l;
  }, O = t.bits2int_modN || function(c) {
    return A(M(c));
  }, P = Ro(t.nBitLength);
  function W(c) {
    if (typeof c != "bigint")
      throw new Error("bigint expected");
    if (!($t <= c && c < P))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return zn(c, t.nByteLength);
  }
  function G(c, l, p = J) {
    if (["recovered", "canonical"].some((re) => re in p))
      throw new Error("sign() legacy options not supported");
    const { hash: h, randomBytes: E } = t;
    let { lowS: I, prehash: g, extraEntropy: u } = p;
    I == null && (I = !0), c = Ot("msgHash", c), g && (c = Ot("prehashed msgHash", h(c)));
    const m = O(c), Y = y(l), X = [W(Y), W(m)];
    if (u != null) {
      const re = u === !0 ? E(n.BYTES) : u;
      X.push(Ot("extraEntropy", re));
    }
    const $ = Ir(...X), q = m;
    function ne(re) {
      const Fe = M(re);
      if (!b(Fe))
        return;
      const fe = d(Fe), oe = f.BASE.multiply(Fe).toAffine(), be = A(oe.x);
      if (be === $t)
        return;
      const ue = A(fe * A(q + be * Y));
      if (ue === $t)
        return;
      let ge = (oe.x === be ? 0 : 2) | Number(oe.y & Nt), Pt = ue;
      return I && D(ue) && (Pt = Q(ue), ge ^= 1), new _(be, Pt, ge);
    }
    return { seed: $, k2sig: ne };
  }
  const J = { lowS: t.lowS, prehash: !1 }, ee = { lowS: t.lowS, prehash: !1 };
  function B(c, l, p = J) {
    const { seed: h, k2sig: E } = G(c, l, p), I = t;
    return ru(I.hash.outputLen, I.nByteLength, I.hmac)(h, E);
  }
  f.BASE._setWindowSize(8);
  function a(c, l, p, h = ee) {
    var oe;
    const E = c;
    if (l = Ot("msgHash", l), p = Ot("publicKey", p), "strict" in h)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: I, prehash: g } = h;
    let u, m;
    try {
      if (typeof E == "string" || Zt(E))
        try {
          u = _.fromDER(E);
        } catch (be) {
          if (!(be instanceof Bn.Err))
            throw be;
          u = _.fromCompact(E);
        }
      else if (typeof E == "object" && typeof E.r == "bigint" && typeof E.s == "bigint") {
        const { r: be, s: ue } = E;
        u = new _(be, ue);
      } else
        throw new Error("PARSE");
      m = f.fromHex(p);
    } catch (be) {
      if (be.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (I && u.hasHighS())
      return !1;
    g && (l = t.hash(l));
    const { r: Y, s: X } = u, $ = O(l), q = d(X), ne = A($ * q), re = A(Y * q), Fe = (oe = f.BASE.multiplyAndAddUnsafe(m, ne, re)) == null ? void 0 : oe.toAffine();
    return Fe ? A(Fe.x) === Y : !1;
  }
  return {
    CURVE: t,
    getPublicKey: L,
    getSharedSecret: k,
    sign: B,
    verify: a,
    ProjectivePoint: f,
    Signature: _,
    utils: Z
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Hg(e) {
  return {
    hash: e,
    hmac: (t, ...n) => _s(e, t, v0(...n)),
    randomBytes: F0
  };
}
function Yg(e, t) {
  const n = (r) => Jg({ ...e, ...Hg(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Mu = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Ka = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Zg = BigInt(1), Ji = BigInt(2), ec = (e, t) => (e + t / Ji) / t;
function Vg(e) {
  const t = Mu, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), A = BigInt(44), d = BigInt(88), f = e * e * e % t, y = f * f * e % t, w = Rt(y, n, t) * y % t, b = Rt(w, n, t) * y % t, x = Rt(b, Ji, t) * f % t, D = Rt(x, s, t) * x % t, Q = Rt(D, i, t) * D % t, S = Rt(Q, A, t) * Q % t, _ = Rt(S, d, t) * S % t, Z = Rt(_, A, t) * Q % t, L = Rt(Z, n, t) * y % t, j = Rt(L, o, t) * D % t, k = Rt(j, r, t) * f % t, M = Rt(k, Ji, t);
  if (!Hi.eql(Hi.sqr(M), e))
    throw new Error("Cannot find square root");
  return M;
}
const Hi = _g(Mu, void 0, void 0, { sqrt: Vg }), cn = Yg({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Hi,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: Ka,
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
      const t = Ka, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -Zg * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), A = ec(i * e, t), d = ec(-r * e, t);
      let f = Bt(e - A * n - d * s, t), y = Bt(-A * r - d * i, t);
      const w = f > o, b = y > o;
      if (w && (f = t - f), b && (y = t - y), f > o || y > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: w, k1: f, k2neg: b, k2: y };
    }
  }
}, vn);
BigInt(0);
cn.ProjectivePoint;
let Yr;
const Xg = new Uint8Array(16);
function jg() {
  if (!Yr && (Yr = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Yr))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Yr(Xg);
}
const mt = [];
for (let e = 0; e < 256; ++e)
  mt.push((e + 256).toString(16).slice(1));
function qg(e, t = 0) {
  return (mt[e[t + 0]] + mt[e[t + 1]] + mt[e[t + 2]] + mt[e[t + 3]] + "-" + mt[e[t + 4]] + mt[e[t + 5]] + "-" + mt[e[t + 6]] + mt[e[t + 7]] + "-" + mt[e[t + 8]] + mt[e[t + 9]] + "-" + mt[e[t + 10]] + mt[e[t + 11]] + mt[e[t + 12]] + mt[e[t + 13]] + mt[e[t + 14]] + mt[e[t + 15]]).toLowerCase();
}
const Wg = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), tc = {
  randomUUID: Wg
};
function $g(e, t, n) {
  if (tc.randomUUID && !t && !e)
    return tc.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || jg)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return qg(r);
}
var Mo = { exports: {} }, Ln = typeof Reflect == "object" ? Reflect : null, nc = Ln && typeof Ln.apply == "function" ? Ln.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, ss;
Ln && typeof Ln.ownKeys == "function" ? ss = Ln.ownKeys : Object.getOwnPropertySymbols ? ss = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : ss = function(t) {
  return Object.getOwnPropertyNames(t);
};
function zg(e) {
  console && console.warn && console.warn(e);
}
var ku = Number.isNaN || function(t) {
  return t !== t;
};
function Ce() {
  Ce.init.call(this);
}
Mo.exports = Ce;
Mo.exports.once = np;
Ce.EventEmitter = Ce;
Ce.prototype._events = void 0;
Ce.prototype._eventsCount = 0;
Ce.prototype._maxListeners = void 0;
var rc = 10;
function Us(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Ce, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return rc;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || ku(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    rc = e;
  }
});
Ce.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Ce.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || ku(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Ou(e) {
  return e._maxListeners === void 0 ? Ce.defaultMaxListeners : e._maxListeners;
}
Ce.prototype.getMaxListeners = function() {
  return Ou(this);
};
Ce.prototype.emit = function(t) {
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
    var A = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw A.context = o, A;
  }
  var d = i[t];
  if (d === void 0)
    return !1;
  if (typeof d == "function")
    nc(d, this, n);
  else
    for (var f = d.length, y = Uu(d, f), r = 0; r < f; ++r)
      nc(y[r], this, n);
  return !0;
};
function Tu(e, t, n, r) {
  var s, i, o;
  if (Us(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = Ou(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var A = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    A.name = "MaxListenersExceededWarning", A.emitter = e, A.type = t, A.count = o.length, zg(A);
  }
  return e;
}
Ce.prototype.addListener = function(t, n) {
  return Tu(this, t, n, !1);
};
Ce.prototype.on = Ce.prototype.addListener;
Ce.prototype.prependListener = function(t, n) {
  return Tu(this, t, n, !0);
};
function Kg() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Lu(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = Kg.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Ce.prototype.once = function(t, n) {
  return Us(n), this.on(t, Lu(this, t, n)), this;
};
Ce.prototype.prependOnceListener = function(t, n) {
  return Us(n), this.prependListener(t, Lu(this, t, n)), this;
};
Ce.prototype.removeListener = function(t, n) {
  var r, s, i, o, A;
  if (Us(n), s = this._events, s === void 0)
    return this;
  if (r = s[t], r === void 0)
    return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete s[t], s.removeListener && this.emit("removeListener", t, r.listener || n));
  else if (typeof r != "function") {
    for (i = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === n || r[o].listener === n) {
        A = r[o].listener, i = o;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? r.shift() : ep(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, A || n);
  }
  return this;
};
Ce.prototype.off = Ce.prototype.removeListener;
Ce.prototype.removeAllListeners = function(t) {
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
function Pu(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? tp(s) : Uu(s, s.length);
}
Ce.prototype.listeners = function(t) {
  return Pu(this, t, !0);
};
Ce.prototype.rawListeners = function(t) {
  return Pu(this, t, !1);
};
Ce.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : Gu.call(e, t);
};
Ce.prototype.listenerCount = Gu;
function Gu(e) {
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
Ce.prototype.eventNames = function() {
  return this._eventsCount > 0 ? ss(this._events) : [];
};
function Uu(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function ep(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function tp(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function np(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    Ju(e, t, i, { once: !0 }), t !== "error" && rp(e, s, { once: !0 });
  });
}
function rp(e, t, n) {
  typeof e.on == "function" && Ju(e, "error", t, n);
}
function Ju(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var Hu = Mo.exports, sp = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", ip = class {
  constructor(e, t, n, r, s, i = 0) {
    R(this, "left");
    R(this, "right");
    R(this, "parent");
    R(this, "hash");
    R(this, "data");
    R(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, sc = ip;
function op(e) {
  return Kt("0x00".concat(e.slice(2)));
}
function ap(e, t) {
  return Kt("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function Yu(e) {
  if (!e.length)
    return sp;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = op(e[i]);
    t.push(new sc(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, A = ap(n[o].hash, n[o + 1].hash);
      t[i] = new sc(n[o].index, n[o + 1].index, -1, A, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var cp = "0x00", Zu = "0x01";
function Ap(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(Kt(t).slice(2));
  return [Kt(n), n];
}
function xn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [Kt(n), n];
}
function Ei(e) {
  const t = Zu.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function up(e) {
  const t = Zu.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function wi(e) {
  return e.slice(0, 4) === cp;
}
var dp = class {
  constructor(e, t, n, r, s) {
    R(this, "SideNodes");
    R(this, "NonMembershipLeafData");
    R(this, "BitMask");
    R(this, "NumSideNodes");
    R(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, lp = dp, hp = class {
  constructor(e, t, n) {
    R(this, "SideNodes");
    R(this, "NonMembershipLeafData");
    R(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, fp = hp, vt = "0x0000000000000000000000000000000000000000000000000000000000000000", qt = 256;
function Mn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - t % 8) > 0 ? 1 : 0;
}
function gp(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function pp(e, t) {
  let n = 0;
  for (let r = 0; r < qt && Mn(e, r) === Mn(t, r); r += 1)
    n += 1;
  return n;
}
function mp(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === vt ? t.push(0) : (n.push(r), t.push(1));
  return new lp(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var Ep = class {
  constructor() {
    R(this, "ms");
    R(this, "root");
    const e = {};
    this.ms = e, this.root = vt, this.ms[this.root] = vt;
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
    if (t === vt)
      return [n, vt, "", ""];
    let r = this.get(t);
    if (wi(r))
      return [n, t, r, ""];
    let s, i, o = "", A = "";
    for (let f = 0; f < qt; f += 1) {
      if ([s, i] = up(r), Mn(e, f) === 1 ? (A = s, o = i) : (A = i, o = s), n.push(A), o === vt) {
        r = "";
        break;
      }
      if (r = this.get(o), wi(r))
        break;
    }
    const d = this.get(A);
    return [gp(n), o, r, d];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === vt)
      return this.root;
    const [s] = Ei(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", A = "", d = "", f = !1;
    for (let y = 0; y < t.length; y += 1)
      if (t[y] !== "") {
        if (A = t[y], o === "")
          if (d = this.get(A), wi(d)) {
            i = A, o = A;
            continue;
          } else
            o = vt, f = !0;
        !f && A === vt || (f || (f = !0), Mn(e, t.length - 1 - y) === 1 ? [i, o] = xn(A, o) : [i, o] = xn(o, A), this.set(i, o), o = i);
      }
    return i === "" && (i = vt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(Kt(t), t), [i, o] = Ap(e, t), this.set(i, o), o = i;
    let A;
    if (r === vt)
      A = qt;
    else {
      const [d] = Ei(s);
      A = pp(e, d);
    }
    A !== qt && (Mn(e, A) === 1 ? [i, o] = xn(r, o) : [i, o] = xn(o, r), this.set(i, o), o = i);
    for (let d = 0; d < qt; d += 1) {
      let f;
      const y = qt - n.length;
      if (d - y < 0 || n[d - y] === "")
        if (A !== qt && A > qt - 1 - d)
          f = vt;
        else
          continue;
      else
        f = n[d - y];
      Mn(e, qt - 1 - d) === 1 ? [i, o] = xn(f, o) : [i, o] = xn(o, f), this.set(i, o), o = i;
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
    for (let d = 0; d < t.length; d += 1)
      t[d] !== "" && i.push(t[d]);
    let o = "";
    if (n !== vt) {
      const [d] = Ei(r);
      d !== e && (o = r);
    }
    return new fp(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return mp(t);
  }
}, wp = Object.defineProperty, Ip = (e, t, n) => t in e ? wp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, _e = (e, t, n) => (Ip(e, typeof t != "symbol" ? t + "" : t, n), n), ko = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, xe = (e, t, n) => (ko(e, t, "read from private field"), n ? n.call(e) : t.get(e)), dn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Tt = (e, t, n, r) => (ko(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Yi = (e, t, n) => (ko(e, t, "access private method"), n), Oo = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1] ?? ht, r = e[2] ?? void 0) : (n = e.amount, t = e.assetId ?? ht, r = e.max ?? void 0);
  const s = C(n);
  return {
    assetId: V(t),
    amount: s.lt(1) ? C(1) : s,
    max: r ? C(r) : void 0
  };
}, yp = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, To = ce`
    fragment receiptFragment on Receipt {
  contract {
    id
  }
  pc
  is
  to {
    id
  }
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
    `, Lo = ce`
    fragment transactionStatusFragment on TransactionStatus {
  type: __typename
  ... on SubmittedStatus {
    time
  }
  ... on SuccessStatus {
    block {
      id
    }
    time
    programState {
      returnType
      data
    }
  }
  ... on FailureStatus {
    block {
      id
    }
    time
    reason
  }
  ... on SqueezedOutStatus {
    reason
  }
}
    `, Mr = ce`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  gasPrice
  receipts {
    ...receiptFragment
  }
  status {
    ...transactionStatusFragment
  }
}
    ${To}
${Lo}`, Bp = ce`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, Cp = ce`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${Bp}`, Po = ce`
    fragment coinFragment on Coin {
  __typename
  utxoId
  owner
  amount
  assetId
  maturity
  blockCreated
  txCreatedIdx
}
    `, Qp = ce`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, bp = ce`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, vp = ce`
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
    transactionsCount
    transactionsRoot
    height
    prevRoot
    time
    applicationHash
    messageReceiptRoot
    messageReceiptCount
  }
  commitBlockHeader {
    id
    daHeight
    transactionsCount
    transactionsRoot
    height
    prevRoot
    time
    applicationHash
    messageReceiptRoot
    messageReceiptCount
  }
  sender
  recipient
  nonce
  amount
  data
}
    `, Vu = ce`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Js = ce`
    fragment blockFragment on Block {
  id
  header {
    height
    time
  }
  transactions {
    id
  }
}
    `, xp = ce`
    fragment TxParametersFragment on TxParameters {
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, Fp = ce`
    fragment PredicateParametersFragment on PredicateParameters {
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, Dp = ce`
    fragment ScriptParametersFragment on ScriptParameters {
  maxScriptLength
  maxScriptDataLength
}
    `, Rp = ce`
    fragment ContractParametersFragment on ContractParameters {
  contractMaxSize
  maxStorageSlots
}
    `, Np = ce`
    fragment FeeParametersFragment on FeeParameters {
  gasPriceFactor
  gasPerByte
}
    `, Sp = ce`
    fragment DependentCostFragment on DependentCost {
  __typename
  ... on LightOperation {
    base
    unitsPerGas
  }
  ... on HeavyOperation {
    base
    gasPerUnit
  }
}
    `, _p = ce`
    fragment GasCostsFragment on GasCosts {
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
  croo
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
    ${Sp}`, Mp = ce`
    fragment consensusParametersFragment on ConsensusParameters {
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
    ${xp}
${Fp}
${Dp}
${Rp}
${Np}
${_p}`, kp = ce`
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
    ${Js}
${Mp}`, Op = ce`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Tp = ce`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, Lp = ce`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  minGasPrice
  maxTx
  maxDepth
  nodeVersion
  peers {
    id
    addresses
    clientVersion
    blockHeight
    lastHeartbeatMs
    appScore
  }
}
    `, Pp = ce`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, Gp = ce`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${Lp}`, Up = ce`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${kp}`, Jp = ce`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Mr}`, Hp = ce`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      ...receiptFragment
    }
  }
}
    ${Mr}
${To}`, Yp = ce`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${Mr}`, Zp = ce`
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
    ${Tp}
${Mr}`, Vp = ce`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${Cp}`, Xp = ce`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Js}`, jp = ce`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Js}
${Mr}`, qp = ce`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${Js}`, Wp = ce`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${Po}`, $p = ce`
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
    ${Po}`, zp = ce`
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
    ${Po}
${Qp}`, Kp = ce`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, em = ce`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${Op}`, tm = ce`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${Vu}`, nm = ce`
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
    ${Vu}`, rm = ce`
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
    ${bp}`, sm = ce`
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
    ${vp}`, im = ce`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, om = ce`
    mutation dryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    ...receiptFragment
  }
}
    ${To}`, am = ce`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, cm = ce`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, Am = ce`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusFragment
  }
}
    ${Lo}`, um = ce`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusFragment
  }
}
    ${Lo}`;
function dm(e) {
  return {
    getVersion(t, n) {
      return e(Pp, t, n);
    },
    getNodeInfo(t, n) {
      return e(Gp, t, n);
    },
    getChain(t, n) {
      return e(Up, t, n);
    },
    getTransaction(t, n) {
      return e(Jp, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(Hp, t, n);
    },
    getTransactions(t, n) {
      return e(Yp, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(Zp, t, n);
    },
    estimatePredicates(t, n) {
      return e(Vp, t, n);
    },
    getBlock(t, n) {
      return e(Xp, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(jp, t, n);
    },
    getBlocks(t, n) {
      return e(qp, t, n);
    },
    getCoin(t, n) {
      return e(Wp, t, n);
    },
    getCoins(t, n) {
      return e($p, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(zp, t, n);
    },
    getContract(t, n) {
      return e(Kp, t, n);
    },
    getContractBalance(t, n) {
      return e(em, t, n);
    },
    getBalance(t, n) {
      return e(tm, t, n);
    },
    getBalances(t, n) {
      return e(nm, t, n);
    },
    getMessages(t, n) {
      return e(rm, t, n);
    },
    getMessageProof(t, n) {
      return e(sm, t, n);
    },
    getMessageStatus(t, n) {
      return e(im, t, n);
    },
    dryRun(t, n) {
      return e(om, t, n);
    },
    submit(t, n) {
      return e(am, t, n);
    },
    produceBlocks(t, n) {
      return e(cm, t, n);
    },
    submitAndAwait(t, n) {
      return e(Am, t, n);
    },
    statusChange(t, n) {
      return e(um, t, n);
    }
  };
}
var Xu = class {
  constructor(e) {
    R(this, "stream");
    R(this, "events", []);
    R(this, "parsingLeftover", "");
    this.options = e;
  }
  async setStream() {
    const { url: e, query: t, variables: n, fetchFn: r } = this.options, s = await r(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: pu(t),
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
        const { data: o, errors: A } = this.events.shift();
        if (Array.isArray(A))
          throw new v(
            v.CODES.INVALID_REQUEST,
            A.map((d) => d.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const n = Xu.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (n === "")
        continue;
      const r = `${this.parsingLeftover}${n}`, s = /data:.*\n\n/g, i = [...r.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new v(
            F.STREAM_PARSING_ERROR,
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
}, ju = Xu;
_e(ju, "textDecoder", new TextDecoder());
var En = {}, lm = 30 * 1e3, hm = class {
  constructor(e = lm) {
    R(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new v(
        F.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = V(e);
    if (En[n]) {
      if (!t || En[n].expires > Date.now())
        return En[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = V(e);
    return En[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(En).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(En).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = V(e);
    delete En[t];
  }
}, fm = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Ee.Coin: {
      const n = H(e.predicate ?? "0x"), r = H(e.predicateData ?? "0x");
      return {
        type: Ee.Coin,
        txID: V(H(e.id).slice(0, pn)),
        outputIndex: Ft(H(e.id).slice(pn, Fi)),
        owner: V(e.owner),
        amount: C(e.amount),
        assetId: V(e.assetId),
        txPointer: {
          blockHeight: Ft(H(e.txPointer).slice(0, 8)),
          txIndex: Ft(H(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        maturity: e.maturity ?? 0,
        predicateGasUsed: C(e.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: V(n),
        predicateData: V(r)
      };
    }
    case Ee.Contract:
      return {
        type: Ee.Contract,
        txID: Re,
        outputIndex: 0,
        balanceRoot: Re,
        stateRoot: Re,
        txPointer: {
          blockHeight: Ft(H(e.txPointer).slice(0, 8)),
          txIndex: Ft(H(e.txPointer).slice(8, 16))
        },
        contractID: V(e.contractId)
      };
    case Ee.Message: {
      const n = H(e.predicate ?? "0x"), r = H(e.predicateData ?? "0x"), s = H(e.data ?? "0x");
      return {
        type: Ee.Message,
        sender: V(e.sender),
        recipient: V(e.recipient),
        amount: C(e.amount),
        nonce: V(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: C(e.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: V(n),
        predicateData: V(r),
        data: V(s),
        dataLength: s.length
      };
    }
    default:
      throw new v(
        F.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, gm = (e) => {
  const { type: t } = e;
  switch (t) {
    case ye.Coin:
      return {
        type: ye.Coin,
        to: V(e.to),
        amount: C(e.amount),
        assetId: V(e.assetId)
      };
    case ye.Contract:
      return {
        type: ye.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Re,
        stateRoot: Re
      };
    case ye.Change:
      return {
        type: ye.Change,
        to: V(e.to),
        amount: C(0),
        assetId: V(e.assetId)
      };
    case ye.Variable:
      return {
        type: ye.Variable,
        to: Re,
        amount: C(0),
        assetId: Re
      };
    case ye.ContractCreated:
      return {
        type: ye.ContractCreated,
        contractId: V(e.contractId),
        stateRoot: V(e.stateRoot)
      };
    default:
      throw new v(
        F.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, Lw = (e) => "utxoId" in e, Pw = (e) => "recipient" in e, ic = (e) => "id" in e, Gw = (e) => "recipient" in e, pm = (e) => e.type === Ae.Revert && e.val.toString("hex") === bu, mm = (e) => e.type === Ae.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", Em = (e) => e.reduce(
  (t, n) => (pm(n) && t.missingOutputVariables.push(n), mm(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), Qe = (e) => e || Re;
function wm(e) {
  var n, r, s, i, o, A, d, f, y, w, b, x, D, Q;
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: Ae.Call,
        from: Qe((n = e.contract) == null ? void 0 : n.id),
        to: Qe((r = e == null ? void 0 : e.to) == null ? void 0 : r.id),
        amount: C(e.amount),
        assetId: Qe(e.assetId),
        gas: C(e.gas),
        param1: C(e.param1),
        param2: C(e.param2),
        pc: C(e.pc),
        is: C(e.is)
      };
    case "RETURN":
      return {
        type: Ae.Return,
        id: Qe((s = e.contract) == null ? void 0 : s.id),
        val: C(e.val),
        pc: C(e.pc),
        is: C(e.is)
      };
    case "RETURN_DATA":
      return {
        type: Ae.ReturnData,
        id: Qe((i = e.contract) == null ? void 0 : i.id),
        ptr: C(e.ptr),
        len: C(e.len),
        digest: Qe(e.digest),
        pc: C(e.pc),
        is: C(e.is)
      };
    case "PANIC":
      return {
        type: Ae.Panic,
        id: Qe((o = e.contract) == null ? void 0 : o.id),
        reason: C(e.reason),
        pc: C(e.pc),
        is: C(e.is),
        contractId: Qe(e.contractId)
      };
    case "REVERT":
      return {
        type: Ae.Revert,
        id: Qe((A = e.contract) == null ? void 0 : A.id),
        val: C(e.ra),
        pc: C(e.pc),
        is: C(e.is)
      };
    case "LOG":
      return {
        type: Ae.Log,
        id: Qe((d = e.contract) == null ? void 0 : d.id),
        val0: C(e.ra),
        val1: C(e.rb),
        val2: C(e.rc),
        val3: C(e.rd),
        pc: C(e.pc),
        is: C(e.is)
      };
    case "LOG_DATA":
      return {
        type: Ae.LogData,
        id: Qe((f = e.contract) == null ? void 0 : f.id),
        val0: C(e.ra),
        val1: C(e.rb),
        ptr: C(e.ptr),
        len: C(e.len),
        digest: Qe(e.digest),
        pc: C(e.pc),
        is: C(e.is)
      };
    case "TRANSFER":
      return {
        type: Ae.Transfer,
        from: Qe((y = e.contract) == null ? void 0 : y.id),
        to: Qe(e.toAddress || ((w = e == null ? void 0 : e.to) == null ? void 0 : w.id)),
        amount: C(e.amount),
        assetId: Qe(e.assetId),
        pc: C(e.pc),
        is: C(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: Ae.TransferOut,
        from: Qe((b = e.contract) == null ? void 0 : b.id),
        to: Qe(e.toAddress || ((x = e.to) == null ? void 0 : x.id)),
        amount: C(e.amount),
        assetId: Qe(e.assetId),
        pc: C(e.pc),
        is: C(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: Ae.ScriptResult,
        result: C(e.result),
        gasUsed: C(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const S = Qe(e.sender), _ = Qe(e.recipient), Z = Qe(e.nonce), L = C(e.amount), j = e.data ? H(e.data) : Uint8Array.from([]), k = Qe(e.digest), M = ws.getMessageId({
        sender: S,
        recipient: _,
        nonce: Z,
        amount: L,
        data: j
      });
      return {
        type: Ae.MessageOut,
        sender: S,
        recipient: _,
        amount: L,
        nonce: Z,
        data: j,
        digest: k,
        messageId: M
      };
    }
    case "MINT": {
      const S = Qe((D = e.contract) == null ? void 0 : D.id), _ = Qe(e.subId), Z = wr.getAssetId(S, _);
      return {
        type: Ae.Mint,
        subId: _,
        contractId: S,
        assetId: Z,
        val: C(e.val),
        pc: C(e.pc),
        is: C(e.is)
      };
    }
    case "BURN": {
      const S = Qe((Q = e.contract) == null ? void 0 : Q.id), _ = Qe(e.subId), Z = Mi.getAssetId(S, _);
      return {
        type: Ae.Burn,
        subId: _,
        contractId: S,
        assetId: Z,
        val: C(e.val),
        pc: C(e.pc),
        is: C(e.is)
      };
    }
    default:
      throw new v(F.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var Im = "https://fuellabs.github.io/block-explorer-v2", ym = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, Uw = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, A = t || Im, d = [
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
  ], f = d.filter((j) => !!j.value).map(({ key: j, value: k }) => ({
    key: j,
    value: k
  })), y = f.length > 0;
  if (f.length > 1)
    throw new v(
      F.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((j) => j.key).join(", ")}.`
    );
  if (n && f.length > 0) {
    const j = d.map(({ key: k }) => k).join(", ");
    throw new v(
      F.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${j}.`
    );
  }
  const w = y ? ym(
    f[0].key,
    f[0].value
  ) : "", b = /^\/|\/$/gm, x = n ? n.replace(b, "") : w, D = A.replace(b, ""), Q = r == null ? void 0 : r.replace(b, ""), S = Q ? encodeURIComponent(Q) : void 0, _ = D.match(/^https?:\/\//) ? "" : "https://", Z = Q != null && Q.match(/^https?:\/\//) ? "" : "https://";
  return `${_}${D}/${x}${S ? `?providerUrl=${Z}${S}` : ""}`;
}, gr = (e, t, n) => C(Math.ceil(e.mul(t).toNumber() / n.toNumber())), qu = (e) => e.filter(
  (r) => r.type === Ae.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), C(0));
function gn(e, t) {
  const n = C(t.base);
  let r = C(0);
  return t.__typename === "LightOperation" && (r = C(e).div(C(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = C(e).mul(C(t.gasPerUnit))), n.add(r);
}
function Bm(e, t, n) {
  const r = [];
  return e.reduce((i, o) => "predicate" in o && o.predicate && o.predicate !== "0x" ? i.add(
    gn(t, n.vmInitialization).add(gn(H(o.predicate).length, n.contractRoot)).add(C(o.predicateGasUsed))
  ) : "witnessIndex" in o && !r.includes(o.witnessIndex) ? (r.push(o.witnessIndex), i.add(n.ecr1)) : i, C());
}
function Wu(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = gn(i, t.vmInitialization), A = C(i).mul(n), d = Bm(r, i, t);
  return o.add(A).add(d).add(s).maxU64();
}
function Go(e) {
  const { gasPerByte: t, witnessesLength: n, witnessLimit: r, minGas: s, gasLimit: i = C(0) } = e;
  let o = C(0);
  return r != null && r.gt(0) && r.gte(n) && (o = C(r).sub(n).mul(t)), o.add(s).add(i);
}
function $u({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = gn(r, e.contractRoot), i = gn(t, e.stateRoot), o = gn(n, e.s256), A = C(4 + 32 + 32 + 32), d = gn(A, e.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function zu({
  gasCosts: e,
  txBytesSize: t
}) {
  return gn(t, e.s256);
}
function Zi(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = V(e[t]);
        break;
      case "Array":
        e[t] = Zi(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = Zi(e[t]);
        break;
    }
  }), e;
}
function Cm(e) {
  return Zi(Br(e));
}
function Qm(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var bm = (e) => {
  let t = `The transaction reverted with reason: "${e.reason}".`;
  const n = e.reason;
  return dg.includes(e.reason) && (t = `${t}

You can read more about this error at:

${lg}#variant.${e.reason}`), { errorMessage: t, reason: n };
}, ar = (e) => JSON.stringify(e, null, 2), vm = (e, t) => {
  let n = "The transaction reverted with an unknown reason.";
  const r = e.find(({ type: i }) => i === Ae.Revert);
  let s = "";
  if (r)
    switch (C(r.val).toHex()) {
      case ag: {
        s = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? ar(t[0]) : "an error."}.`;
        break;
      }
      case cg: {
        const o = t.length >= 2 ? ` comparing ${ar(t[1])} and ${ar(t[0])}.` : ".";
        s = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${o}`;
        break;
      }
      case ug: {
        const o = t.length >= 2 ? ` comparing ${ar(t[1])} and ${ar(t[0])}.` : ".";
        s = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${o}`;
        break;
      }
      case Ag:
        s = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case bu:
        s = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        s = "unknown", n = `The transaction reverted with an unknown reason: ${r.val}`;
    }
  return { errorMessage: n, reason: s };
}, Ku = (e) => {
  const { receipts: t, status: n, logs: r } = e, s = t.some(({ type: f }) => f === Ae.Panic), i = t.some(({ type: f }) => f === Ae.Revert), { errorMessage: o, reason: A } = (n == null ? void 0 : n.type) === "FailureStatus" && s ? bm(n) : vm(t, r), d = {
    logs: r,
    receipts: t,
    panic: s,
    revert: i,
    reason: A
  };
  return new v(F.SCRIPT_REVERTED, o, d);
}, Jw = class extends Error {
  constructor() {
    super(...arguments);
    R(this, "name", "ChangeOutputCollisionError");
    R(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, xm = class extends Error {
  constructor(t) {
    super();
    R(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, Hw = class extends Error {
  constructor(t) {
    super();
    R(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, Fm = (e) => {
  const t = H(e);
  return {
    data: V(t),
    dataLength: t.length
  };
}, Hs = class {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    gasPrice: e,
    maturity: t,
    maxFee: n,
    witnessLimit: r,
    inputs: s,
    outputs: i,
    witnesses: o
  } = {}) {
    /** Gas price for transaction */
    R(this, "gasPrice");
    /** Block until which tx cannot be included */
    R(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    R(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    R(this, "witnessLimit");
    /** List of inputs */
    R(this, "inputs", []);
    /** List of outputs */
    R(this, "outputs", []);
    /** List of witnesses */
    R(this, "witnesses", []);
    this.gasPrice = C(e), this.maturity = t ?? 0, this.witnessLimit = r ? C(r) : void 0, this.maxFee = n ? C(n) : void 0, this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [];
    return e.gasPrice && (t += kt.GasPrice, n.push({ data: e.gasPrice, type: kt.GasPrice })), e.witnessLimit && (t += kt.WitnessLimit, n.push({ data: e.witnessLimit, type: kt.WitnessLimit })), e.maturity > 0 && (t += kt.Maturity, n.push({ data: e.maturity, type: kt.Maturity })), e.maxFee && (t += kt.MaxFee, n.push({ data: e.maxFee, type: kt.MaxFee })), {
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
    var i, o, A;
    const e = ((i = this.inputs) == null ? void 0 : i.map(fm)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(gm)) ?? [], n = ((A = this.witnesses) == null ? void 0 : A.map(Fm)) ?? [], { policyTypes: r, policies: s } = Hs.getPolicyMeta(this);
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
    return new mn().encode(this.toTransaction());
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
    return this.addWitness(se([Re, Re])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const n = le.fromAddressOrString(e), r = this.getCoinInputWitnessIndexByOwner(n);
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
      throw new xm(e);
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
      (e) => e.type === Ee.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (e) => e.type === ye.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === ye.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = Ar(e), n = this.inputs.find((r) => {
      switch (r.type) {
        case Ee.Coin:
          return V(r.owner) === t.toB256();
        case Ee.Message:
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
   * @param predicate - Predicate bytes.
   * @param predicateData - Predicate data bytes.
   */
  addCoinInput(e, t) {
    const { assetId: n, owner: r, amount: s } = e;
    let i;
    t ? i = 0 : (i = this.getCoinInputWitnessIndexByOwner(r), typeof i != "number" && (i = this.addEmptyWitness()));
    const o = {
      ...e,
      type: Ee.Coin,
      owner: r.toB256(),
      amount: s,
      assetId: n,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: i,
      predicate: t == null ? void 0 : t.bytes
    };
    this.pushInput(o), this.addChangeOutput(r, n);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * baseAssetId, if one it was not added yet.
   *
   * @param message - Message resource.
   * @param predicate - Predicate bytes.
   * @param predicateData - Predicate data bytes.
   */
  addMessageInput(e, t) {
    const { recipient: n, sender: r, amount: s } = e, i = ht;
    let o;
    t ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(n), typeof o != "number" && (o = this.addEmptyWitness()));
    const A = {
      ...e,
      type: Ee.Message,
      sender: r.toB256(),
      recipient: n.toB256(),
      amount: s,
      witnessIndex: o,
      predicate: t == null ? void 0 : t.bytes
    };
    this.pushInput(A), this.addChangeOutput(n, i);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return ic(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addPredicateResource(e, t) {
    return ic(e) ? this.addCoinInput(e, t) : this.addMessageInput(e, t), this;
  }
  /**
   * Adds multiple predicate coin/message inputs to the transaction and change outputs
   * from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addPredicateResources(e, t) {
    return e.forEach((n) => this.addPredicateResource(n, t)), this;
  }
  /**
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(e, t, n = ht) {
    return this.pushOutput({
      type: ye.Coin,
      to: Ar(e).toB256(),
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
    return t.map(Oo).forEach((n) => {
      this.pushOutput({
        type: ye.Coin,
        to: Ar(e).toB256(),
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
  addChangeOutput(e, t = ht) {
    this.getChangeOutputs().find(
      (r) => V(r.assetId) === t
    ) || this.pushOutput({
      type: ye.Change,
      to: Ar(e).toB256(),
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
    const { gasCosts: t, consensusParameters: n } = e, { gasPerByte: r } = n;
    return Wu({
      gasPerByte: r,
      gasCosts: t,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(t)
    });
  }
  calculateMaxGas(e, t) {
    const { consensusParameters: n } = e, { gasPerByte: r } = n, s = this.toTransaction().witnesses.reduce(
      (i, o) => i + o.dataLength,
      0
    );
    return Go({
      gasPerByte: r,
      minGas: t,
      witnessesLength: s,
      witnessLimit: this.witnessLimit
    });
  }
  /**
   * Funds the transaction with fake UTXOs for each assetId and amount in the
   * quantities array.
   *
   * @param quantities - CoinQuantity Array.
   */
  fundWithFakeUtxos(e, t) {
    const n = (s) => this.inputs.find((i) => "assetId" in i ? i.assetId === s : !1), r = (s, i) => {
      const o = n(s);
      o && "assetId" in o ? (o.id = V(Yt(Fi)), o.amount = i) : this.addResources([
        {
          id: V(Yt(Fi)),
          amount: i,
          assetId: s,
          owner: t || le.fromRandom(),
          maturity: 0,
          blockCreated: C(1),
          txCreatedIdx: C(1)
        }
      ]);
    };
    r(ht, C(1e11)), e.forEach((s) => r(s.assetId, s.amount));
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: t, assetId: n }) => ({
      amount: C(t),
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
    return Cm(this);
  }
  updatePredicateInputs(e) {
    this.inputs.forEach((t) => {
      let n;
      switch (t.type) {
        case Ee.Coin:
          n = e.find((r) => r.type === Ee.Coin && r.owner === t.owner);
          break;
        case Ee.Message:
          n = e.find(
            (r) => r.type === Ee.Message && r.sender === t.sender
          );
          break;
        default:
          return;
      }
      n && "predicateGasUsed" in n && C(n.predicateGasUsed).gt(0) && (t.predicate = n.predicate, t.predicateData = n.predicateData, t.predicateGasUsed = n.predicateGasUsed);
    });
  }
};
function ed(e, t) {
  const n = e.toTransaction();
  n.type === gt.Script && (n.receiptsRoot = Re), n.inputs = n.inputs.map((i) => {
    const o = Br(i);
    switch (o.type) {
      case Ee.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = C(0), o;
      case Ee.Message:
        return o.predicateGasUsed = C(0), o;
      case Ee.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = Re, o.outputIndex = 0, o.balanceRoot = Re, o.stateRoot = Re, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = Br(i);
    switch (o.type) {
      case ye.Contract:
        return o.balanceRoot = Re, o.stateRoot = Re, o;
      case ye.Change:
        return o.amount = C(0), o;
      case ye.Variable:
        return o.to = Re, o.amount = C(0), o.assetId = Re, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = Ll(t), s = se([r, new mn().encode(n)]);
  return wt(s);
}
var Dm = (e) => {
  const t = new Uint8Array(32);
  return t.set(H(e)), t;
}, Rm = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: V(t),
    value: V(Dm(n))
  };
}, Vi = class extends Hs {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({
    bytecodeWitnessIndex: t,
    salt: n,
    storageSlots: r,
    ...s
  } = {}) {
    super(s);
    /** Type of the transaction */
    R(this, "type", gt.Create);
    /** Witness index of contract bytecode to create */
    R(this, "bytecodeWitnessIndex");
    /** Salt */
    R(this, "salt");
    /** List of storage slots to initialize */
    R(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = V(n ?? Re), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(Rm)) ?? [];
    return {
      type: gt.Create,
      ...t,
      bytecodeLength: t.witnesses[n].dataLength / 4,
      bytecodeWitnessIndex: n,
      storageSlotsCount: r.length,
      salt: this.salt ? V(this.salt) : Re,
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
      (t) => t.type === ye.ContractCreated
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
    return ed(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, n) {
    this.pushOutput({
      type: ye.ContractCreated,
      contractId: t,
      stateRoot: n
    });
  }
  metadataGas(t) {
    return $u({
      contractBytesSize: C(H(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, oc = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: H("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Nm = {
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
  bytes: H("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Pn = class extends Hs {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    R(this, "type", gt.Script);
    /** Gas limit for transaction */
    R(this, "gasLimit");
    /** Script to execute */
    R(this, "script");
    /** Script input data (parameters) */
    R(this, "scriptData");
    R(this, "abis");
    this.gasLimit = C(r), this.script = H(t ?? oc.bytes), this.scriptData = H(n ?? oc.encodeScriptData()), this.abis = s.abis;
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
    const t = H(this.script ?? "0x"), n = H(this.scriptData ?? "0x");
    return {
      type: gt.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: t.length,
      scriptDataLength: n.length,
      receiptsRoot: Re,
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
      (t) => t.type === Ee.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (t) => t.type === ye.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === ye.Variable
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
        type: ye.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  calculateMaxGas(t, n) {
    const { consensusParameters: r } = t, { gasPerByte: s } = r, i = this.toTransaction().witnesses.reduce(
      (o, A) => o + A.dataLength,
      0
    );
    return Go({
      gasPerByte: s,
      minGas: n,
      witnessesLength: i,
      witnessLimit: this.witnessLimit,
      gasLimit: this.gasLimit
    });
  }
  /**
   * Adds a contract input and output to the transaction request.
   *
   * @param contract - The contract ID.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  addContractInputAndOutput(t) {
    const n = Ar(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: Ee.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: ye.Contract,
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
    return ed(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new en(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return zu({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, St = (e) => {
  if (e instanceof Pn || e instanceof Vi)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case gt.Script:
      return Pn.from(e);
    case gt.Create:
      return Vi.from(e);
    default:
      throw new v(F.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, Sm = (e) => {
  var P, W;
  const {
    gasUsed: t,
    rawPayload: n,
    consensusParameters: { gasCosts: r, feeParams: s }
  } = e, i = C(s.gasPerByte), o = C(s.gasPriceFactor), A = H(n), [d] = new mn().decode(A, 0);
  if (d.type === gt.Mint)
    return {
      fee: C(0),
      minFee: C(0),
      maxFee: C(0),
      feeFromGasUsed: C(0)
    };
  const { type: f, witnesses: y, inputs: w, policies: b } = d;
  let x = C(0), D = C(0);
  if (f === gt.Create) {
    const { bytecodeWitnessIndex: G, storageSlots: J } = d, ee = C(H(y[G].data).length);
    x = $u({
      contractBytesSize: ee,
      gasCosts: r,
      stateRootSize: J.length || 0,
      txBytesSize: A.length
    });
  } else {
    const { scriptGasLimit: G } = d;
    G && (D = G), x = zu({
      gasCosts: r,
      txBytesSize: A.length
    });
  }
  const Q = Wu({
    gasCosts: r,
    gasPerByte: C(i),
    inputs: w,
    metadataGas: x,
    txBytesSize: A.length
  }), S = C((P = b.find((G) => G.type === kt.GasPrice)) == null ? void 0 : P.data), _ = (W = b.find((G) => G.type === kt.WitnessLimit)) == null ? void 0 : W.data, Z = y.reduce((G, J) => G + J.dataLength, 0), L = Go({
    gasPerByte: i,
    minGas: Q,
    witnessesLength: Z,
    gasLimit: D,
    witnessLimit: _
  }), j = gr(t, S, o), k = gr(Q, S, o), M = gr(L, S, o);
  return {
    fee: k.add(j),
    minFee: k,
    maxFee: M,
    feeFromGasUsed: j
  };
}, _m = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var w;
  const s = new en(e), i = t.param1.toHex(8), o = s.getFunction(i), A = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const b = C(t.param2).sub(ks({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(b * 2)}`;
    }
  } else
    d = t.param2.toHex();
  let f;
  if (d) {
    const b = o.decodeArguments(d);
    b && (f = A.reduce((x, D, Q) => {
      const S = b[Q], _ = D.name;
      return _ ? {
        ...x,
        // reparse to remove bn
        [_]: JSON.parse(JSON.stringify(S))
      } : x;
    }, {}));
  }
  return {
    functionSignature: o.signature,
    functionName: o.name,
    argumentsProvided: f,
    ...(w = t.amount) != null && w.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function Mm(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function Uo(e, t) {
  return e.filter((n) => n.type === t);
}
function km(e) {
  return Uo(e, Ee.Coin);
}
function Om(e) {
  return Uo(e, Ee.Message);
}
function Tm(e) {
  return Mm(e, [Ee.Coin, Ee.Message]);
}
function Lm(e) {
  return Uo(e, Ee.Contract);
}
function td(e, t) {
  const n = km(e), r = Om(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function Pm(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== Ee.Contract)
      throw new v(
        F.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function Jo(e) {
  return e.type === Ee.Coin ? e.owner.toString() : e.type === Ee.Message ? e.recipient.toString() : "";
}
function kr(e, t) {
  return e.filter((n) => n.type === t);
}
function Gm(e) {
  return kr(e, ye.ContractCreated);
}
function nd(e) {
  return kr(e, ye.Coin);
}
function Um(e) {
  return kr(e, ye.Change);
}
function Jm(e) {
  return kr(e, ye.Contract);
}
function Yw(e) {
  return kr(e, ye.Variable);
}
var Hm = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e))(Hm || {}), Ym = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(Ym || {}), Zm = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(Zm || {}), Vm = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(Vm || {}), Xm = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(Xm || {});
function Cr(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function rd(e) {
  switch (e) {
    case gt.Mint:
      return "Mint";
    case gt.Create:
      return "Create";
    case gt.Script:
      return "Script";
    default:
      throw new v(
        F.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function Ho(e, t) {
  return rd(e) === t;
}
function jm(e) {
  return Ho(
    e,
    "Mint"
    /* Mint */
  );
}
function sd(e) {
  return Ho(
    e,
    "Create"
    /* Create */
  );
}
function id(e) {
  return Ho(
    e,
    "Script"
    /* Script */
  );
}
function Zw(e) {
  return (t) => e.assetId === t.assetId;
}
function qm(e) {
  return Cr(e, Ae.Call);
}
function Wm(e) {
  return Cr(e, Ae.MessageOut);
}
var $m = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((A) => A.assetId === o.assetId)
  );
  return n.map((o) => {
    const A = r.find((f) => f.assetId === o.assetId);
    if (!A)
      return o;
    const d = C(o.amount).add(A.amount);
    return { ...o, amount: d };
  }).concat(s);
};
function zm(e, t) {
  var n, r, s, i, o, A, d, f;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((A = t.from) == null ? void 0 : A.type) && ((d = e.to) == null ? void 0 : d.type) === ((f = t.to) == null ? void 0 : f.type);
}
function er(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((A) => zm(A, t));
  if (n[r]) {
    const A = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (A.assetsSent = (i = A.assetsSent) != null && i.length ? $m(A, t) : t.assetsSent), (o = t.calls) != null && o.length && (A.calls = [...A.calls || [], ...t.calls]), n[r] = A;
  } else
    n.push(t);
  return n;
}
function Vw(e) {
  return Cr(e, Ae.TransferOut);
}
function Km({
  inputs: e,
  receipts: t
}) {
  return Wm(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", A = td(e, o);
      if (A) {
        const d = Jo(A);
        return er(s, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: d
          },
          to: {
            type: 1,
            address: i.recipient.toString(),
            chain: "ethereum"
            /* ethereum */
          },
          assetsSent: [
            {
              amount: i.amount,
              assetId: o
            }
          ]
        });
      }
      return s;
    },
    []
  );
}
function eE({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = qm(n);
  return Jm(t).reduce((f, y) => {
    const w = Pm(e, y.inputIndex);
    return w ? o.reduce((x, D) => {
      var Q;
      if (D.to === w.contractID) {
        const S = td(e, D.assetId);
        if (S) {
          const _ = Jo(S), Z = [], L = r == null ? void 0 : r[w.contractID];
          return L && Z.push(
            _m({
              abi: L,
              receipt: D,
              rawPayload: s,
              maxInputs: i
            })
          ), er(x, {
            name: "Contract call",
            from: {
              type: 1,
              address: _
            },
            to: {
              type: 0,
              address: D.to
            },
            // if no amount is forwarded to the contract, skip showing assetsSent
            assetsSent: (Q = D.amount) != null && Q.isZero() ? void 0 : [
              {
                amount: D.amount,
                assetId: D.assetId
              }
            ],
            calls: Z
          });
        }
      }
      return x;
    }, f) : f;
  }, []);
}
function tE(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const A = t.some((f) => f.contractID === r) ? 0 : 1;
  if (Re === o) {
    const f = n.find((y) => y.assetId === s);
    o = (f == null ? void 0 : f.to) || o;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((f) => f.contractID === o) ? 0 : 1,
      address: o
    },
    to: {
      type: A,
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
function ac({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = nd(t), i = Lm(e), o = Um(t);
  s.forEach((f) => {
    const { amount: y, assetId: w, to: b } = f, x = o.find((D) => D.assetId === w);
    x && (r = er(r, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: x.to
      },
      to: {
        type: 1,
        address: b
      },
      assetsSent: [
        {
          assetId: w,
          amount: y
        }
      ]
    }));
  });
  const A = Cr(
    n,
    Ae.Transfer
  ), d = Cr(
    n,
    Ae.TransferOut
  );
  return [...A, ...d].forEach((f) => {
    const y = tE(f, i, o);
    r = er(r, y);
  }), r;
}
function nE(e) {
  return nd(e).reduce((r, s) => er(r, {
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
function rE({ inputs: e, outputs: t }) {
  const n = Gm(t), r = Tm(e)[0], s = Jo(r);
  return n.reduce((o, A) => er(o, {
    name: "Contract created",
    from: {
      type: 1,
      address: s
    },
    to: {
      type: 0,
      address: (A == null ? void 0 : A.contractId) || ""
    }
  }), []);
}
function sE({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return sd(e) ? [
    ...rE({ inputs: t, outputs: n }),
    ...ac({ inputs: t, outputs: n, receipts: r })
  ] : id(e) ? [
    ...ac({ inputs: t, outputs: n, receipts: r }),
    ...eE({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...Km({ inputs: t, receipts: r })
  ] : [...nE(n)];
}
var Gn = (e) => {
  const t = wm(e);
  switch (t.type) {
    case Ae.ReturnData:
      return {
        ...t,
        data: e.data || "0x"
      };
    case Ae.LogData:
      return {
        ...t,
        data: e.data || "0x"
      };
    default:
      return t;
  }
}, iE = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === Ae.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, oE = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === Ae.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, aE = (e) => {
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
      throw new v(
        F.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, cE = (e) => {
  let t, n, r, s = !1, i = !1, o = !1;
  if (e != null && e.type)
    switch (r = aE(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, n = e.block.id, i = !0;
        break;
      case "FailureStatus":
        t = e.time, n = e.block.id, s = !0;
        break;
      case "SubmittedStatus":
        t = e.time, o = !0;
        break;
    }
  return {
    time: t,
    blockId: n,
    status: r,
    isStatusFailure: s,
    isStatusSuccess: i,
    isStatusPending: o
  };
};
function Ys(e) {
  const {
    id: t,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: A,
    abiMap: d = {},
    maxInputs: f,
    gasCosts: y
  } = e, w = qu(n), b = V(o), x = sE({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: b,
    abiMap: d,
    maxInputs: f
  }), D = rd(i.type), { fee: Q } = Sm({
    gasUsed: w,
    rawPayload: b,
    consensusParameters: {
      gasCosts: y,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: S, isStatusPending: _, isStatusSuccess: Z, blockId: L, status: j, time: k } = cE(A), M = iE(n), O = oE(n);
  let P;
  return k && (P = to.fromTai64(k)), {
    id: t,
    fee: Q,
    gasUsed: w,
    operations: x,
    type: D,
    blockId: L,
    time: k,
    status: j,
    receipts: n,
    mintedAssets: M,
    burnedAssets: O,
    isTypeMint: jm(i.type),
    isTypeCreate: sd(i.type),
    isTypeScript: id(i.type),
    isStatusFailure: S,
    isStatusSuccess: Z,
    isStatusPending: _,
    date: P,
    transaction: i
  };
}
function od(e, t, n = {}) {
  return e.reduce((r, s) => {
    if (s.type === Ae.LogData || s.type === Ae.Log) {
      const i = new en(n[s.id] || t), o = s.type === Ae.Log ? new N("u64").encode(s.val0) : s.data, [A] = i.decodeLog(o, s.val1.toNumber());
      r.push(A);
    }
    return r;
  }, []);
}
var is = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t, n) {
    /** Transaction ID */
    R(this, "id");
    /** Current provider */
    R(this, "provider");
    /** Gas used on the transaction */
    R(this, "gasUsed", C(0));
    /** The graphql Transaction with receipts object. */
    R(this, "gqlTransaction");
    R(this, "abis");
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
    const r = new is(e, t, n);
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
    return (t = new mn().decode(
      H(e.rawPayload),
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
    var f;
    let t = this.gqlTransaction;
    t || (t = await this.fetch());
    const n = this.decodeTransaction(
      t
    ), r = ((f = t.receipts) == null ? void 0 : f.map(Gn)) || [], { gasPerByte: s, gasPriceFactor: i, gasCosts: o } = this.provider.getGasConfig(), A = this.provider.getChain().consensusParameters.maxInputs;
    return Ys({
      id: this.id,
      receipts: r,
      transaction: n,
      transactionBytes: H(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: s,
      gasPriceFactor: i,
      abiMap: e,
      maxInputs: A,
      gasCosts: o
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
        throw new v(
          F.TRANSACTION_SQUEEZED_OUT,
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
    await this.waitForStatusChange();
    const t = await this.getTransactionSummary(e), n = {
      gqlTransaction: this.gqlTransaction,
      ...t
    };
    let r = [];
    if (this.abis && (r = od(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), n.logs = r), n.isStatusFailure) {
      const {
        receipts: s,
        gqlTransaction: { status: i }
      } = n;
      throw Ku({
        receipts: s,
        status: i,
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
function AE(e, t) {
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
function ad(e, t, n = 0) {
  return t === void 0 ? e : async (...r) => {
    var s;
    try {
      return await e(...r);
    } catch (i) {
      const o = i;
      if (((s = o.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw o;
      const A = n + 1;
      if (A > t.maxRetries)
        throw o;
      const d = AE(t, A);
      return await Qm(d), ad(e, t, A)(...r);
    }
  };
}
var uE = (e, t) => {
  const n = {};
  function r({ amount: s, assetId: i }) {
    n[i] ? n[i] = n[i].add(s) : n[i] = s;
  }
  return e.forEach(r), t.forEach(r), Object.entries(n).map(([s, i]) => ({ assetId: s, amount: i }));
}, dE = 10, lE = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, { contractParams: i, feeParams: o, predicateParams: A, scriptParams: d, txParams: f, gasCosts: y } = r;
  return {
    name: t,
    baseChainHeight: C(n),
    consensusParameters: {
      contractMaxSize: C(i.contractMaxSize),
      maxInputs: C(f.maxInputs),
      maxOutputs: C(f.maxOutputs),
      maxWitnesses: C(f.maxWitnesses),
      maxGasPerTx: C(f.maxGasPerTx),
      maxScriptLength: C(d.maxScriptLength),
      maxScriptDataLength: C(d.maxScriptDataLength),
      maxStorageSlots: C(i.maxStorageSlots),
      maxPredicateLength: C(A.maxPredicateLength),
      maxPredicateDataLength: C(A.maxPredicateDataLength),
      maxGasPerPredicate: C(A.maxGasPerPredicate),
      gasPriceFactor: C(o.gasPriceFactor),
      gasPerByte: C(o.gasPerByte),
      maxMessageDataLength: C(A.maxMessageDataLength),
      chainId: C(r.chainId),
      gasCosts: y
    },
    gasCosts: y,
    latestBlock: {
      id: s.id,
      height: C(s.header.height),
      time: s.header.time,
      transactions: s.transactions.map((w) => ({
        id: w.id
      }))
    }
  };
}, Xi, cd, Ut = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, dn(this, Xi), _e(this, "operations"), _e(this, "cache"), _e(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new hm(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    Ut.nodeInfoCache = {}, Ut.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return ad(async (...r) => {
      const s = r[0], i = r[1], o = n ? AbortSignal.timeout(n) : void 0;
      let A = { ...i, signal: o };
      return e.requestMiddleware && (A = await e.requestMiddleware(A)), e.fetch ? e.fetch(s, A, e) : fetch(s, A);
    }, t);
  }
  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   */
  static async create(e, t = {}) {
    const n = new Ut(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const e = Ut.chainInfoCache[this.url];
    if (!e)
      throw new v(
        F.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const e = Ut.nodeInfoCache[this.url];
    if (!e)
      throw new v(
        F.NODE_INFO_CACHE_EMPTY,
        "Node info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns some helpful parameters related to gas fees.
   */
  getGasConfig() {
    const { minGasPrice: e } = this.getNode(), { maxGasPerTx: t, maxGasPerPredicate: n, gasPriceFactor: r, gasPerByte: s, gasCosts: i } = this.getChain().consensusParameters;
    return {
      minGasPrice: e,
      maxGasPerTx: t,
      maxGasPerPredicate: n,
      gasPriceFactor: r,
      gasPerByte: s,
      gasCosts: i
    };
  }
  /**
   * Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.
   */
  async connect(e, t) {
    this.url = e, this.options = t ?? this.options, this.operations = this.createOperations(), await this.fetchChainAndNodeInfo();
  }
  /**
   * Fetches both the chain and node information, saves it to the cache, and return it.
   *
   * @returns NodeInfo and Chain
   */
  async fetchChainAndNodeInfo() {
    const e = await this.fetchChain(), t = await this.fetchNode();
    return Ut.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = Ud(e.nodeVersion);
    if (!t || !n)
      throw new v(
        v.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `Fuel client version: ${e.nodeVersion}, Supported version: ${r}`
      );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   */
  createOperations() {
    const e = Ut.getFetchFn(this.options), t = new Vf.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options)
    });
    return dm((r, s) => {
      const i = r.definitions.find((A) => A.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new ju({
        url: this.url,
        query: r,
        fetchFn: (A, d) => e(A, d, this.options),
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
   * Returns the block number.
   *
   * @returns A promise that resolves to the block number
   */
  async getBlockNumber() {
    const { chain: e } = await this.operations.getChain();
    return C(e.latestBlock.header.height, 10);
  }
  /**
   * Returns the chain information.
   * @param url - The URL of the Fuel node
   * @returns NodeInfo object
   */
  async fetchNode() {
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = {
      maxDepth: C(e.maxDepth),
      maxTx: C(e.maxTx),
      minGasPrice: C(e.minGasPrice),
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace,
      peers: e.peers
    };
    return Ut.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = lE(e);
    return Ut.chainInfoCache[this.url] = t, t;
  }
  /**
   * Returns the chain ID
   * @returns A promise that resolves to the chain ID number
   */
  getChainId() {
    const {
      consensusParameters: { chainId: e }
    } = this.getChain();
    return e.toNumber();
  }
  /**
   * Submits a transaction to the chain to be executed.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @returns A promise that resolves to the transaction response object.
   */
  // #region Provider-sendTransaction
  async sendTransaction(e, { estimateTxDependencies: t = !0, awaitExecution: n = !1 } = {}) {
    const r = St(e);
    Yi(this, Xi, cd).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = V(r.toTransactionBytes());
    let i;
    if (r.type === gt.Script && (i = r.abis), n) {
      const A = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: y } of A) {
        if (y.type === "SqueezedOutStatus")
          throw new v(
            F.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${y.reason}`
          );
        if (y.type !== "SubmittedStatus")
          break;
      }
      const d = r.getTransactionId(this.getChainId()), f = new is(d, this, i);
      return await f.fetch(), f;
    }
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: s });
    return new is(o, this, i);
  }
  /**
   * Executes a transaction without actually submitting it to the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param utxoValidation - Additional provider call parameters.
   * @returns A promise that resolves to the call result object.
   */
  async call(e, { utxoValidation: t, estimateTxDependencies: n = !0 } = {}) {
    const r = St(e);
    if (n)
      return this.estimateTxDependencies(r);
    const s = V(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransaction: s,
      utxoValidation: t || !1
    });
    return {
      receipts: i.map(Gn)
    };
  }
  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(e) {
    if (!!!e.inputs.find(
      (i) => "predicate" in i && i.predicate && !nu(H(i.predicate), H("0x")) && new ke(i.predicateGasUsed).isZero()
    ))
      return e;
    const n = V(e.toTransactionBytes()), r = await this.operations.estimatePredicates({
      encodedTransaction: n
    }), {
      estimatePredicates: { inputs: s }
    } = r;
    return s && s.forEach((i, o) => {
      "predicateGasUsed" in i && C(i.predicateGasUsed).gt(0) && (e.inputs[o].predicateGasUsed = i.predicateGasUsed);
    }), e;
  }
  /**
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   * @privateRemarks
   * TODO: Investigate support for missing contract IDs
   * TODO: Add support for missing output messages
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise.
   */
  async estimateTxDependencies(e) {
    if (e.type === gt.Create)
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    await this.estimatePredicates(e);
    let t = [];
    const n = [];
    let r = 0;
    for (let s = 0; s < dE; s++) {
      const { dryRun: i } = await this.operations.dryRun({
        encodedTransaction: V(e.toTransactionBytes()),
        utxoValidation: !1
      });
      t = i.map(Gn);
      const { missingOutputVariables: o, missingOutputContractIds: A } = Em(t);
      if (o.length !== 0 || A.length !== 0)
        r += o.length, e.addVariableOutputs(o.length), A.forEach(({ contractId: f }) => {
          e.addContractInputAndOutput(le.fromString(f)), n.push(f);
        });
      else
        break;
    }
    return {
      receipts: t,
      outputVariables: r,
      missingContractIds: n
    };
  }
  /**
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param transactionRequest - The transaction request object.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  estimateTxGasAndFee(e) {
    const { transactionRequest: t } = e, { gasPriceFactor: n, minGasPrice: r, maxGasPerTx: s } = this.getGasConfig(), i = this.getChain(), o = t.gasPrice.eq(0) ? r : t.gasPrice;
    t.gasPrice = o;
    const A = t.calculateMinGas(i), d = gr(A, o, n).normalizeZeroToOne();
    t.type === gt.Script && t.gasLimit.eq(0) && (t.gasLimit = A, t.gasLimit = s.sub(
      t.calculateMaxGas(i, A)
    ));
    const f = t.calculateMaxGas(i, A), y = gr(f, o, n).normalizeZeroToOne();
    return {
      minGas: A,
      minFee: d,
      maxGas: f,
      maxFee: y
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
   * @returns A promise that resolves to the call result object.
   */
  async simulate(e, { estimateTxDependencies: t = !0 } = {}) {
    const n = St(e);
    if (t)
      return this.estimateTxDependencies(n);
    const r = V(n.toTransactionBytes()), { dryRun: s } = await this.operations.dryRun({
      encodedTransaction: r,
      utxoValidation: !0
    });
    return {
      receipts: s.map(Gn)
    };
  }
  /**
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the the transaction.
   *
   * @privateRemarks
   * The tolerance is add on top of the gasUsed calculated
   * from the node, this create a safe margin costs like
   * change states on transfer that don't occur on the dryRun
   * transaction. The default value is 0.2 or 20%
   *
   * @param transactionRequestLike - The transaction request object.
   * @param tolerance - The tolerance to add on top of the gasUsed.
   * @returns A promise that resolves to the transaction cost object.
   */
  async getTransactionCost(e, t = [], {
    estimateTxDependencies: n = !0,
    estimatePredicates: r = !0,
    resourcesOwner: s,
    signatureCallback: i
  } = {}) {
    const o = Br(St(e)), { minGasPrice: A } = this.getGasConfig(), d = zd(o.gasPrice, A), f = o.type === gt.Script, y = o.getCoinOutputsQuantities(), w = uE(y, t);
    o.fundWithFakeUtxos(w, s == null ? void 0 : s.address), f && (o.gasLimit = C(0)), r && (s && "populateTransactionPredicateData" in s && s.populateTransactionPredicateData(o), await this.estimatePredicates(o)), i && f && await i(o);
    let { maxFee: b, maxGas: x, minFee: D, minGas: Q } = this.estimateTxGasAndFee({
      transactionRequest: o
    }), S = [], _ = [], Z = 0, L = C(0);
    if (f && n) {
      o.gasPrice = C(0);
      const j = await this.estimateTxDependencies(o);
      S = j.receipts, Z = j.outputVariables, _ = j.missingContractIds, L = f ? qu(S) : L, o.gasLimit = L, o.gasPrice = d, { maxFee: b, maxGas: x, minFee: D, minGas: Q } = this.estimateTxGasAndFee({
        transactionRequest: o
      });
    }
    return {
      requiredQuantities: w,
      receipts: S,
      gasUsed: L,
      minGasPrice: A,
      gasPrice: d,
      minGas: Q,
      maxGas: x,
      minFee: D,
      maxFee: b,
      estimatedInputs: o.inputs,
      outputVariables: Z,
      missingContractIds: _
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = le.fromAddressOrString(e), s = St(Br(t)), i = await this.getTransactionCost(s, n);
    s.addResources(
      await this.getResourcesToSpend(r, i.requiredQuantities)
    );
    const { requiredQuantities: o, ...A } = await this.getTransactionCost(
      s,
      n
    );
    return {
      resources: await this.getResourcesToSpend(r, o),
      requiredQuantities: o,
      ...A
    };
  }
  /**
   * Returns coins for the given owner.
   */
  async getCoins(e, t, n) {
    const r = le.fromAddressOrString(e);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: t && V(t) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: C(o.amount),
      owner: le.fromAddressOrString(o.owner),
      maturity: C(o.maturity).toNumber(),
      blockCreated: C(o.blockCreated),
      txCreatedIdx: C(o.txCreatedIdx)
    }));
  }
  /**
   * Returns resources for the given owner satisfying the spend query.
   *
   * @param owner - The address to get resources for.
   * @param quantities - The quantities to get.
   * @param excludedIds - IDs of excluded resources from the selection.
   * @returns A promise that resolves to the resources.
   */
  async getResourcesToSpend(e, t, n) {
    var d, f, y;
    const r = le.fromAddressOrString(e), s = {
      messages: ((d = n == null ? void 0 : n.messages) == null ? void 0 : d.map((w) => V(w))) || [],
      utxos: ((f = n == null ? void 0 : n.utxos) == null ? void 0 : f.map((w) => V(w))) || []
    };
    if (this.cache) {
      const w = new Set(
        s.utxos.concat((y = this.cache) == null ? void 0 : y.getActiveData().map((b) => V(b)))
      );
      s.utxos = Array.from(w);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(Oo).map(({ assetId: w, amount: b, max: x }) => ({
        assetId: V(w),
        amount: b.toString(10),
        max: x ? x.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((w) => {
      switch (w.__typename) {
        case "MessageCoin":
          return {
            amount: C(w.amount),
            assetId: w.assetId,
            daHeight: C(w.daHeight),
            sender: le.fromAddressOrString(w.sender),
            recipient: le.fromAddressOrString(w.recipient),
            nonce: w.nonce
          };
        case "Coin":
          return {
            id: w.utxoId,
            amount: C(w.amount),
            assetId: w.assetId,
            owner: le.fromAddressOrString(w.owner),
            maturity: C(w.maturity).toNumber(),
            blockCreated: C(w.blockCreated),
            txCreatedIdx: C(w.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((w) => !!w);
  }
  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlock(e) {
    let t;
    typeof e == "number" ? t = { height: C(e).toString(10) } : e === "latest" ? t = { height: (await this.getBlockNumber()).toString(10) } : e.length === 66 ? t = { blockId: e } : t = { blockId: C(e).toString(10) };
    const { block: n } = await this.operations.getBlock(t);
    return n ? {
      id: n.id,
      height: C(n.header.height),
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
      height: C(r.header.height),
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
    typeof e == "number" ? t = { blockHeight: C(e).toString(10) } : e === "latest" ? t = { blockHeight: (await this.getBlockNumber()).toString() } : t = { blockId: e };
    const { block: n } = await this.operations.getBlockWithTransactions(t);
    return n ? {
      id: n.id,
      height: C(n.header.height, 10),
      time: n.header.time,
      transactionIds: n.transactions.map((r) => r.id),
      transactions: n.transactions.map(
        (r) => {
          var s;
          return (s = new mn().decode(H(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new mn().decode(
      H(t.rawPayload),
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
      contract: le.fromAddressOrString(e).toB256(),
      asset: V(t)
    });
    return C(n.amount, 10);
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
      owner: le.fromAddressOrString(e).toB256(),
      assetId: V(t)
    });
    return C(n.amount, 10);
  }
  /**
   * Returns balances for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param paginationArgs - Pagination arguments.
   * @returns A promise that resolves to the balances.
   */
  async getBalances(e, t) {
    return (await this.operations.getBalances({
      first: 10,
      ...t,
      filter: { owner: le.fromAddressOrString(e).toB256() }
    })).balances.edges.map((s) => s.node).map((s) => ({
      assetId: s.assetId,
      amount: C(s.amount)
    }));
  }
  /**
   * Returns message for the given address.
   *
   * @param address - The address to get message from.
   * @param paginationArgs - Pagination arguments.
   * @returns A promise that resolves to the messages.
   */
  async getMessages(e, t) {
    return (await this.operations.getMessages({
      first: 10,
      ...t,
      owner: le.fromAddressOrString(e).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: Er.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: C(s.amount),
        data: s.data
      }),
      sender: le.fromAddressOrString(s.sender),
      recipient: le.fromAddressOrString(s.recipient),
      nonce: s.nonce,
      amount: C(s.amount),
      data: Er.decodeData(s.data),
      daHeight: C(s.daHeight)
    }));
  }
  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param transactionId - The transaction to get message from.
   * @param messageId - The message id from MessageOut receipt.
   * @param commitBlockId - The commit block id.
   * @param commitBlockHeight - The commit block height.
   * @returns A promise that resolves to the message proof.
   */
  async getMessageProof(e, t, n, r) {
    let s = {
      transactionId: e,
      nonce: t
    };
    if (n && r)
      throw new v(
        F.INVALID_INPUT_PARAMETERS,
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
      messageBlockHeader: A,
      commitBlockHeader: d,
      blockProof: f,
      sender: y,
      recipient: w,
      amount: b,
      data: x
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: C(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: C(f.proofIndex),
        proofSet: f.proofSet
      },
      messageBlockHeader: {
        id: A.id,
        daHeight: C(A.daHeight),
        transactionsCount: C(A.transactionsCount),
        transactionsRoot: A.transactionsRoot,
        height: C(A.height),
        prevRoot: A.prevRoot,
        time: A.time,
        applicationHash: A.applicationHash,
        messageReceiptRoot: A.messageReceiptRoot,
        messageReceiptCount: C(A.messageReceiptCount)
      },
      commitBlockHeader: {
        id: d.id,
        daHeight: C(d.daHeight),
        transactionsCount: C(d.transactionsCount),
        transactionsRoot: d.transactionsRoot,
        height: C(d.height),
        prevRoot: d.prevRoot,
        time: d.time,
        applicationHash: d.applicationHash,
        messageReceiptRoot: d.messageReceiptRoot,
        messageReceiptCount: C(d.messageReceiptCount)
      },
      sender: le.fromAddressOrString(y),
      recipient: le.fromAddressOrString(w),
      nonce: t,
      amount: C(b),
      data: x
    };
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
   * @param amount - The amount of blocks to produce
   * @param startTime - The UNIX timestamp (milliseconds) to set for the first produced block
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(e, t) {
    const { produceBlocks: n } = await this.operations.produceBlocks({
      blocksToProduce: C(e).toString(10),
      startTimestamp: t ? to.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return C(n);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new is(e, this);
  }
}, Cs = Ut;
Xi = /* @__PURE__ */ new WeakSet();
cd = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === Ee.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
_e(Cs, "chainInfoCache", {});
_e(Cs, "nodeInfoCache", {});
async function Xw(e) {
  var b;
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new v(
      F.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new mn().decode(
    H(s.rawPayload),
    0
  ), o = ((b = s.receipts) == null ? void 0 : b.map(Gn)) || [], {
    consensusParameters: { gasPerByte: A, gasPriceFactor: d, maxInputs: f, gasCosts: y }
  } = n.getChain(), w = Ys({
    id: s.id,
    receipts: o,
    transaction: i,
    transactionBytes: H(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: C(A),
    gasPriceFactor: C(d),
    abiMap: r,
    maxInputs: f,
    gasCosts: y
  });
  return {
    gqlTransaction: s,
    ...w
  };
}
async function jw(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: A } = t.getGasConfig(), d = t.getChain().consensusParameters.maxInputs, f = n.toTransaction(), y = n.toTransactionBytes();
  return Ys({
    receipts: s,
    transaction: f,
    transactionBytes: y,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: d,
    gasCosts: A
  });
}
async function qw(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: A, gasPriceFactor: d, maxInputs: f, gasCosts: y }
  } = n.getChain();
  return {
    transactions: i.map((b) => {
      const { node: x } = b, { id: D, rawPayload: Q, receipts: S, status: _ } = x, [Z] = new mn().decode(H(Q), 0), L = (S == null ? void 0 : S.map(Gn)) || [], j = Ys({
        id: D,
        receipts: L,
        transaction: Z,
        transactionBytes: H(Q),
        gqlTransactionStatus: _,
        abiMap: r,
        gasPerByte: A,
        gasPriceFactor: d,
        maxInputs: f,
        gasCosts: y
      });
      return {
        gqlTransaction: x,
        ...j
      };
    }),
    pageInfo: o
  };
}
var kn = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    beta5: 0,
    devnet: 10
  }
}, hE = (e) => {
  if (e === "ethereum")
    return kn.eth.sepolia;
  if (e === "fuel")
    return kn.fuel.beta5;
}, fE = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), Ad = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? hE(n);
  if (i === void 0)
    return;
  const o = fE({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, Ww = (e, t) => Ad({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), $w = (e, t) => Ad({
  asset: e,
  networkType: "fuel",
  chainId: t
}), gE = "/", pE = /^\/|\/$/g, mE = (e = "") => e.replace(pE, "");
function EE(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(mE);
  return r && n && s.unshift(""), s.join(gE);
}
function zw(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: EE(t, n.icon)
  }));
}
var Kw = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: kn.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: kn.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: kn.fuel.beta5,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        type: "fuel",
        chainId: kn.fuel.devnet,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
], wE = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new N("u64").encode(new ke(n).toNumber());
  return Uint8Array.from([
    ...H(r),
    ...i,
    ...H(t)
  ]);
}, IE = async (e) => {
  const t = wE(e);
  await _o();
  const n = mg(16, 0, wg.ScriptData), r = ja(17, 16, 32), s = lr(18, 17, 0), i = ja(19, 17, 8), o = gg(16, 18, 19), A = Fu(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...A.to_bytes()
  ]), scriptData: t };
}, Zs = class extends qA {
  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance  (optional).
   */
  constructor(t, n, r) {
    super();
    /**
     * The address associated with the account.
     */
    R(this, "address");
    /**
     * The provider used to interact with the network.
     */
    R(this, "_provider");
    R(this, "_connector");
    this._provider = n, this._connector = r, this.address = le.fromDynamicInput(t);
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
      throw new v(F.MISSING_PROVIDER, "Provider not set");
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
   * @param quantities - IDs of coins to exclude.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(t, n) {
    return this.provider.getResourcesToSpend(this.address, t, n);
  }
  /**
   * Retrieves coins owned by the account.
   *
   * @param assetId - The asset ID of the coins to retrieve.
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
      throw new v(
        F.NOT_SUPPORTED,
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
      throw new v(
        F.NOT_SUPPORTED,
        "Wallets containing more than 9999 messages exceed the current supported limit."
      );
    }
    return t;
  }
  /**
   * Retrieves the balance of the account for the given asset.
   *
   * @param assetId - The asset ID to check the balance for.
   * @returns A promise that resolves to the balance amount.
   */
  async getBalance(t = ht) {
    return await this.provider.getBalance(this.address, t);
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
      throw new v(
        F.NOT_SUPPORTED,
        "Wallets containing more than 9999 balances exceed the current supported limit."
      );
    }
    return t;
  }
  /**
   * Adds resources to the transaction enough to fund it.
   *
   * @param request - The transaction request.
   * @param coinQuantities - The coin quantities required to execute the transaction.
   * @param fee - The estimated transaction fee.
   * @returns A promise that resolves when the resources are added to the transaction.
   */
  async fund(t, n, r) {
    const s = yp({
      amount: C(r),
      assetId: ht,
      coinQuantities: n
    }), i = {};
    s.forEach(({ amount: w, assetId: b }) => {
      i[b] = {
        required: w,
        owned: C(0)
      };
    });
    const o = [], A = [], d = this.address.toB256();
    t.inputs.forEach((w) => {
      if ("amount" in w)
        if ("owner" in w) {
          const D = String(w.assetId);
          if (w.owner === d && i[D]) {
            const Q = C(w.amount);
            i[D].owned = i[D].owned.add(Q), o.push(w.id);
          }
        } else
          w.recipient === d && w.amount && i[ht] && (i[ht].owned = i[ht].owned.add(w.amount), A.push(w.nonce));
    });
    const f = [];
    if (Object.entries(i).forEach(([w, { owned: b, required: x }]) => {
      b.lt(x) && f.push({
        assetId: w,
        amount: x.sub(b)
      });
    }), f.length) {
      const w = await this.getResourcesToSpend(f, {
        messages: A,
        utxos: o
      });
      t.addResources(w);
    }
  }
  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(t, n, r = ht, s = {}) {
    const { minGasPrice: i } = this.provider.getGasConfig(), o = { gasPrice: i, ...s }, A = new Pn(o);
    A.addCoinOutput(le.fromAddressOrString(t), n, r);
    const { maxFee: d, requiredQuantities: f, gasUsed: y, estimatedInputs: w } = await this.provider.getTransactionCost(A, [], {
      estimateTxDependencies: !0,
      resourcesOwner: this
    });
    return A.gasPrice = C(s.gasPrice ?? i), A.gasLimit = C(s.gasLimit ?? y), this.validateGas({
      gasUsed: y,
      gasPrice: A.gasPrice,
      gasLimit: A.gasLimit,
      minGasPrice: i
    }), await this.fund(A, f, d), A.updatePredicateInputs(w), A;
  }
  /**
   * Transfers coins to a destination address.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(t, n, r = ht, s = {}) {
    if (C(n).lte(0))
      throw new v(
        F.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = await this.createTransfer(t, n, r, s);
    return this.sendTransaction(i, { estimateTxDependencies: !1 });
  }
  /**
   * Transfers coins to a contract address.
   *
   * @param contractId - The address of the contract.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The optional transaction parameters.
   * @returns A promise that resolves to the transaction response.
   */
  async transferToContract(t, n, r = ht, s = {}) {
    if (C(n).lte(0))
      throw new v(
        F.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = le.fromAddressOrString(t), { minGasPrice: o } = this.provider.getGasConfig(), A = { gasPrice: o, ...s }, { script: d, scriptData: f } = await IE({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: C(n),
      assetId: r
    }), y = new Pn({
      ...A,
      script: d,
      scriptData: f
    });
    y.addContractInputAndOutput(i);
    const { maxFee: w, requiredQuantities: b, gasUsed: x } = await this.provider.getTransactionCost(
      y,
      [{ amount: C(n), assetId: String(r) }]
    );
    return y.gasLimit = C(A.gasLimit ?? x), this.validateGas({
      gasUsed: x,
      gasPrice: y.gasPrice,
      gasLimit: y.gasLimit,
      minGasPrice: o
    }), await this.fund(y, b, w), this.sendTransaction(y);
  }
  /**
   * Withdraws an amount of the base asset to the base chain.
   *
   * @param recipient - Address of the recipient on the base chain.
   * @param amount - Amount of base asset.
   * @param txParams - The optional transaction parameters.
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(t, n, r = {}) {
    const { minGasPrice: s } = this.provider.getGasConfig(), i = le.fromAddressOrString(t), o = H(
      "0x".concat(i.toHexString().substring(2).padStart(64, "0"))
    ), A = H(
      "0x".concat(C(n).toHex().substring(2).padStart(16, "0"))
    ), f = { script: new Uint8Array([
      ...H(Nm.bytes),
      ...o,
      ...A
    ]), gasPrice: s, ...r }, y = new Pn(f), w = [{ amount: C(n), assetId: ht }], { requiredQuantities: b, maxFee: x, gasUsed: D } = await this.provider.getTransactionCost(
      y,
      w
    );
    return y.gasLimit = C(f.gasLimit ?? D), this.validateGas({
      gasUsed: D,
      gasPrice: y.gasPrice,
      gasLimit: y.gasLimit,
      minGasPrice: s
    }), await this.fund(y, b, x), this.sendTransaction(y);
  }
  async signMessage(t) {
    if (!this._connector)
      throw new v(F.MISSING_CONNECTOR, "A connector is required to sign messages.");
    return this._connector.signMessage(this.address.toString(), t);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature of the transaction.
   */
  async signTransaction(t) {
    if (!this._connector)
      throw new v(
        F.MISSING_CONNECTOR,
        "A connector is required to sign transactions."
      );
    return this._connector.signTransaction(this.address.toString(), t);
  }
  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(t, { estimateTxDependencies: n = !0, awaitExecution: r } = {}) {
    if (this._connector)
      return this.provider.getTransactionResponse(
        await this._connector.sendTransaction(this.address.toString(), t)
      );
    const s = St(t);
    return n && await this.provider.estimateTxDependencies(s), this.provider.sendTransaction(s, {
      awaitExecution: r,
      estimateTxDependencies: !1
    });
  }
  /**
   * Simulates a transaction.
   *
   * @param transactionRequestLike - The transaction request to be simulated.
   * @returns A promise that resolves to the call result.
   */
  async simulateTransaction(t, { estimateTxDependencies: n = !0 } = {}) {
    const r = St(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.simulate(r, { estimateTxDependencies: !1 });
  }
  validateGas({
    gasUsed: t,
    gasPrice: n,
    gasLimit: r,
    minGasPrice: s
  }) {
    if (s.gt(n))
      throw new v(
        F.GAS_PRICE_TOO_LOW,
        `Gas price '${n}' is lower than the required: '${s}'.`
      );
    if (t.gt(r))
      throw new v(
        F.GAS_LIMIT_TOO_LOW,
        `Gas limit '${r}' is lower than the required: '${t}'.`
      );
  }
}, tr = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    R(this, "address");
    R(this, "publicKey");
    R(this, "compressedPublicKey");
    R(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = Lt(e, 32);
    this.privateKey = V(t), this.publicKey = V(cn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = V(cn.getPublicKey(t, !0)), this.address = le.fromPublicKey(this.publicKey);
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
    const t = cn.sign(H(e), H(this.privateKey)), n = Lt(`0x${t.r.toString(16)}`, 32), r = Lt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, V(se([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = cn.ProjectivePoint.fromHex(H(this.compressedPublicKey)), n = cn.ProjectivePoint.fromHex(H(e));
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
    const n = H(t), r = n.slice(0, 32), s = n.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const A = new cn.Signature(BigInt(V(r)), BigInt(V(s))).addRecoveryBit(
      i
    ).recoverPublicKey(H(e)).toRawBytes(!1).slice(1);
    return V(A);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return le.fromPublicKey(tr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? Kt(se([Yt(32), H(e)])) : Yt(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = cn.ProjectivePoint.fromHex(H(e));
    return V(t.toRawBytes(!1).slice(1));
  }
}, cc = 13, Ac = 8, uc = 1, Ii = 32, yE = 16, dc = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function BE(e, t, n) {
  const r = fn(dc(e), "hex"), s = le.fromAddressOrString(t), i = Yt(Ii), o = oA({
    password: fn(n),
    salt: i,
    dklen: Ii,
    n: 2 ** cc,
    r: Ac,
    p: uc
  }), A = Yt(yE), d = await kl(r, o, A), f = Uint8Array.from([...o.subarray(16, 32), ...d]), y = aA(f), w = cr(y, "hex"), b = {
    id: $g(),
    version: 3,
    address: dc(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: w,
      cipherparams: { iv: cr(A, "hex") },
      ciphertext: cr(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Ii,
        n: 2 ** cc,
        p: uc,
        r: Ac,
        salt: cr(i, "hex")
      }
    }
  };
  return JSON.stringify(b);
}
async function CE(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: A, r: d, p: f, salt: y }
    }
  } = n, w = fn(s, "hex"), b = fn(i, "hex"), x = fn(y, "hex"), D = fn(t), Q = oA({
    password: D,
    salt: x,
    n: A,
    p: f,
    r: d,
    dklen: o
  }), S = Uint8Array.from([...Q.subarray(16, 32), ...w]), _ = aA(S), Z = cr(_, "hex");
  if (r !== Z)
    throw new v(
      F.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const L = await Ml(w, Q, b);
  return V(L);
}
var ud = class extends Zs {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new tr(t);
    super(r.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    R(this, "signer");
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
    const n = await this.signer().sign(Pl(t));
    return V(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = St(t), r = this.provider.getChainId(), s = n.getTransactionId(r), i = await this.signer().sign(s);
    return V(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = St(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, { estimateTxDependencies: n = !0, awaitExecution: r } = {}) {
    const s = St(t);
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
    const r = St(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.call(
      await this.populateTransactionWitnessesSignature(r),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  async encrypt(t) {
    return BE(this.privateKey, this.address, t);
  }
};
_e(ud, "defaultPath", "m/44'/1179993420'/0'/0/0");
var Zr = [
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
], QE = /* @__PURE__ */ ((e) => (e.english = "english", e))(QE || {});
function ji(e) {
  const t = e.normalize("NFKD"), n = [];
  for (let r = 0; r < t.length; r += 1) {
    const s = t.charCodeAt(r);
    if (s < 128)
      n.push(s);
    else if (s < 2048)
      n.push(s >> 6 | 192), n.push(s & 63 | 128);
    else if ((s & 64512) === 55296) {
      r += 1;
      const i = t.charCodeAt(r);
      if (r >= t.length || (i & 64512) !== 56320)
        throw new v(
          F.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return Uint8Array.from(n);
}
function bE(e) {
  return (1 << e) - 1;
}
function dd(e) {
  return (1 << e) - 1 << 8 - e;
}
function yi(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function vE(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function xE(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & bE(8 - n)), n += 3);
  const r = e.length / 4, s = H(wt(e))[0] & dd(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function FE(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = H(new Uint8Array(n));
  let s = 0;
  for (let f = 0; f < e.length; f += 1) {
    const y = t.indexOf(e[f].normalize("NFKD"));
    if (y === -1)
      throw new v(
        F.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[f]}' is not found in the provided wordlist.`
      );
    for (let w = 0; w < 11; w += 1)
      y & 1 << 10 - w && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, A = dd(o);
  if ((H(wt(r.slice(0, i / 8)))[0] & A) !== (r[r.length - 1] & A))
    throw new v(
      F.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var DE = ji("Bitcoin seed"), RE = "0x0488ade4", NE = "0x04358394", lc = [12, 15, 18, 21, 24];
function hc(e) {
  if (e.length !== 2048)
    throw new v(
      F.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function SE(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new v(
      F.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function Bi(e) {
  if (!lc.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${lc.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new v(F.INVALID_MNEMONIC, t);
  }
}
var An = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = Zr) {
    R(this, "wordlist");
    this.wordlist = e, hc(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return An.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return An.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = Zr) {
    const n = yi(e);
    return Bi(n), V(FE(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = Zr) {
    const n = H(e);
    return hc(t), SE(n), xE(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    Bi(yi(e));
    const n = ji(vE(e)), r = ji(`mnemonic${t}`);
    return Ol(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const n = An.mnemonicToSeed(e, t);
    return An.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = yi(e);
    let n = 0;
    try {
      Bi(t);
    } catch {
      return !1;
    }
    for (; n < t.length; ) {
      if (An.binarySearch(t[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = Zr;
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
    const t = H(e);
    if (t.length < 16 || t.length > 64)
      throw new v(
        F.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return H(cA("sha512", DE, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = An.masterKeysFromSeed(e), r = H(t ? NE : RE), s = "0x00", i = "0x00000000", o = "0x00000000", A = n.slice(32), d = n.slice(0, 32), f = se([
      r,
      s,
      i,
      o,
      A,
      se(["0x00", d])
    ]), y = ro(wt(wt(f)), 0, 4);
    return Mc(se([f, y]));
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
    const n = t ? wt(se([Yt(e), H(t)])) : Yt(e);
    return An.entropyToMnemonic(n);
  }
}, Yo = An, ld = 2147483648, hd = V("0x0488ade4"), Zo = V("0x0488b21e"), fd = V("0x04358394"), Vo = V("0x043587cf");
function fc(e) {
  return Mc(se([e, ro(wt(wt(e)), 0, 4)]));
}
function _E(e = !1, t = !1) {
  return e ? t ? Vo : Zo : t ? fd : hd;
}
function ME(e) {
  return [Zo, Vo].includes(V(e.slice(0, 4)));
}
function kE(e) {
  return [hd, fd, Zo, Vo].includes(
    V(e.slice(0, 4))
  );
}
function OE(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new v(F.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + ld : parseInt(r, 10)
  );
}
var Rn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    R(this, "depth", 0);
    R(this, "index", 0);
    R(this, "fingerprint", V("0x00000000"));
    R(this, "parentFingerprint", V("0x00000000"));
    R(this, "privateKey");
    R(this, "publicKey");
    R(this, "chainCode");
    if (e.privateKey) {
      const t = new tr(e.privateKey);
      this.publicKey = V(t.compressedPublicKey), this.privateKey = V(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new v(
          F.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = V(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = ro(Tl(wt(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && H(this.privateKey), n = H(this.publicKey), r = H(this.chainCode), s = new Uint8Array(37);
    if (e & ld) {
      if (!t)
        throw new v(
          F.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(H(this.publicKey));
    s.set(Lt(e, 4), 33);
    const i = H(cA("sha512", r, s)), o = i.slice(0, 32), A = i.slice(32);
    if (t) {
      const y = "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", w = C(o).add(t).mod(y).toBytes(32);
      return new Rn({
        privateKey: w,
        chainCode: A,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const f = new tr(V(o)).addPoint(n);
    return new Rn({
      publicKey: f,
      chainCode: A,
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
    return OE(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
      throw new v(
        F.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = _E(this.privateKey == null || e, t), r = V(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = as(this.index, 4), o = this.chainCode, A = this.privateKey != null && !e ? se(["0x00", this.privateKey]) : this.publicKey, d = H(se([n, r, s, i, o, A]));
    return fc(d);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = Yo.masterKeysFromSeed(e);
    return new Rn({
      chainCode: H(t.slice(32)),
      privateKey: H(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    let t = as(A0(e));
    t = `${t.substring(0, 2)}0${t.substring(2)}`;
    const n = H(t), r = fc(n.slice(0, 78)) === e;
    if (n.length !== 82 || !kE(n))
      throw new v(F.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new v(F.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = V(n.slice(5, 9)), o = parseInt(V(n.slice(9, 13)).substring(2), 16), A = V(n.slice(13, 45)), d = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new v(
        F.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (ME(n)) {
      if (d[0] !== 3)
        throw new v(F.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Rn({
        publicKey: d,
        chainCode: A,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (d[0] !== 0)
      throw new v(F.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Rn({
      privateKey: d.slice(1),
      chainCode: A,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, Ci = Rn, gd = class extends Zs {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Ct(e, this._provider);
  }
}, Ct = class extends ud {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new tr("0x00"), new gd(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = tr.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new Ct(t, e == null ? void 0 : e.provider);
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
    const s = Ci.fromSeed(e).derivePath(t || Ct.defaultPath);
    return new Ct(s.privateKey, n);
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
    const s = Yo.mnemonicToSeed(e, n), o = Ci.fromSeed(s).derivePath(t || Ct.defaultPath);
    return new Ct(o.privateKey, r);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const n = Ci.fromExtendedKey(e);
    return new Ct(n.privateKey, t);
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
    const r = await CE(e, t);
    return new Ct(r, n);
  }
}, bt = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new gd(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Ct(e, t);
  }
};
_e(bt, "generate", Ct.generate);
_e(bt, "fromSeed", Ct.fromSeed);
_e(bt, "fromMnemonic", Ct.fromMnemonic);
_e(bt, "fromExtendedKey", Ct.fromExtendedKey);
_e(bt, "fromEncryptedJson", Ct.fromEncryptedJson);
var TE = class {
  constructor() {
    R(this, "storage", /* @__PURE__ */ new Map());
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
}, wn, pd = class {
  constructor(e) {
    dn(this, wn, void 0), _e(this, "pathKey", "{}"), _e(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), _e(this, "numberOfAccounts", 0), Tt(this, wn, e.secret || Yo.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: xe(this, wn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = bt.fromMnemonic(xe(this, wn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = bt.fromMnemonic(xe(this, wn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = le.fromAddressOrString(e);
    do {
      const r = bt.fromMnemonic(xe(this, wn), this.getDerivePath(t));
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new v(
      F.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return bt.fromPrivateKey(t);
  }
};
wn = /* @__PURE__ */ new WeakMap();
_e(pd, "type", "mnemonic");
var un, md = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    dn(this, un, []), e.secret ? Tt(this, un, [e.secret]) : Tt(this, un, e.accounts || [bt.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: xe(this, un)
    };
  }
  getPublicAccount(e) {
    const t = bt.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return xe(this, un).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = bt.generate();
    return xe(this, un).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = le.fromAddressOrString(e), n = xe(this, un).find(
      (r) => bt.fromPrivateKey(r).address.equals(t)
    );
    if (!n)
      throw new v(
        F.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return n;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return bt.fromPrivateKey(t);
  }
};
un = /* @__PURE__ */ new WeakMap();
_e(md, "type", "privateKey");
var Xt = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function jt(e, t) {
  if (!e)
    throw new v(F.WALLET_MANAGER_ERROR, t);
}
var yt, In, Jt, qi, Ed, Wi, wd, Id = class extends Hu.EventEmitter {
  constructor(e) {
    super(), dn(this, qi), dn(this, Wi), _e(this, "storage", new TE()), _e(this, "STORAGE_KEY", "WalletManager"), dn(this, yt, []), dn(this, In, ""), dn(this, Jt, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return xe(this, Jt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    jt(!xe(this, Jt), Xt.wallet_not_unlocked);
    const t = xe(this, yt).find((n, r) => r === e);
    return jt(t, Xt.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return xe(this, yt).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return xe(this, yt).flatMap(
      (e, t) => e.vault.getAccounts().map((n) => ({ ...n, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = le.fromAddressOrString(e), n = xe(this, yt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return jt(n, Xt.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = le.fromAddressOrString(e);
    jt(!xe(this, Jt), Xt.wallet_not_unlocked);
    const n = xe(this, yt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return jt(n, Xt.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = xe(this, yt)[(e == null ? void 0 : e.vaultId) || 0];
    await jt(t, Xt.vault_not_found);
    const n = t.vault.addAccount();
    return await this.saveState(), n;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    xe(this, yt).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), n = new t(e);
    Tt(this, yt, xe(this, yt).concat({
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
    Tt(this, Jt, !0), Tt(this, yt, []), Tt(this, In, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Tt(this, In, e), Tt(this, Jt, !1);
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
    const n = xe(this, Jt);
    await this.unlock(e), Tt(this, In, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await jt(!xe(this, Jt), Xt.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await Sl(xe(this, In), JSON.parse(e));
      Tt(this, yt, Yi(this, Wi, wd).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await jt(!xe(this, Jt), Xt.wallet_not_unlocked);
    const e = await _l(xe(this, In), {
      vaults: Yi(this, qi, Ed).call(this, xe(this, yt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = Id.Vaults.find((n) => n.type === e);
    return jt(t, Xt.invalid_vault_type), t;
  }
}, LE = Id;
yt = /* @__PURE__ */ new WeakMap();
In = /* @__PURE__ */ new WeakMap();
Jt = /* @__PURE__ */ new WeakMap();
qi = /* @__PURE__ */ new WeakSet();
Ed = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
Wi = /* @__PURE__ */ new WeakSet();
wd = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
_e(LE, "Vaults", [pd, md]);
var PE = class {
  constructor(e) {
    throw new v(F.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new v(F.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new v(F.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new v(F.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new v(F.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new v(F.NOT_IMPLEMENTED, "Not implemented.");
  }
};
_e(PE, "type");
var eI = class {
}, GE = (e) => {
  const n = H(e), r = Rc(n, 16384), s = Yu(r.map((o) => V(o)));
  return Kt(se(["0x4655454C", s]));
}, gc = class extends Zs {
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
    const { predicateBytes: o, predicateInterface: A } = gc.processPredicateData(
      t,
      n,
      i
    ), d = le.fromB256(GE(o));
    super(d, r);
    R(this, "bytes");
    R(this, "predicateData", []);
    R(this, "interface");
    this.bytes = o, this.interface = A, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    var s;
    const n = St(t), { policies: r } = Hs.getPolicyMeta(n);
    return (s = n.inputs) == null || s.forEach((i) => {
      i.type === Ee.Coin && V(i.owner) === this.address.toB256() && (i.predicate = this.bytes, i.predicateData = this.getPredicateData(r.length));
    }), n;
  }
  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(t, n, r = ht, s = {}) {
    const i = await super.createTransfer(t, n, r, s);
    return this.populateTransactionPredicateData(i);
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(t, n) {
    const r = this.populateTransactionPredicateData(t);
    return super.sendTransaction(r, n);
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(t) {
    const n = this.populateTransactionPredicateData(t);
    return super.simulateTransaction(n);
  }
  getPredicateData(t) {
    var o;
    if (!this.predicateData.length)
      return new Uint8Array();
    const n = (o = this.interface) == null ? void 0 : o.functions.main, r = new we(this.bytes.length).encode(this.bytes), i = ks({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber()
    }) + Bo + Xl + K + r.byteLength + t * K;
    return (n == null ? void 0 : n.encodeArguments(this.predicateData, i)) || new Uint8Array();
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
    let s = H(t), i;
    if (n && (i = new en(n), i.functions.main === void 0))
      throw new v(
        F.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = gc.setConfigurableConstants(
      s,
      r,
      i
    )), {
      predicateBytes: s,
      predicateInterface: i
    };
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
        const { offset: A } = r.configurables[i], d = r.encodeConfigurable(i, o);
        s.set(d, A);
      });
    } catch (i) {
      throw new v(
        F.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
}, yd = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(yd || {}), Xo = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(Xo || {}), Bd = "FuelConnector", UE = class {
  constructor(e) {
    R(this, "storage");
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
}, JE = class extends Hu.EventEmitter {
  constructor() {
    super(...arguments);
    R(this, "name", "");
    R(this, "metadata", {});
    R(this, "connected", !1);
    R(this, "installed", !1);
    R(this, "events", Xo);
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
function HE(e, { cache: t, cacheTime: n, key: r }) {
  return async (...s) => {
    var o, A, d;
    if (t[r] && ((o = t[r]) != null && o.value))
      return (A = t[r]) == null ? void 0 : A.value;
    clearTimeout((d = t[r]) == null ? void 0 : d.timeout);
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
function tI(e) {
  window.dispatchEvent(
    new CustomEvent(Bd, {
      detail: e
    })
  );
}
function YE() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function Vr(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var ZE = 2e3, VE = 5e3, { warn: XE } = console, fr = class extends JE {
  constructor(t = fr.defaultConfig) {
    super();
    R(this, "_storage", null);
    R(this, "_connectors", []);
    R(this, "_targetObject", null);
    R(this, "_unsubscribes", []);
    R(this, "_targetUnsubscribe");
    R(this, "_pingCache", {});
    R(this, "_currentConnector");
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    R(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, n = Bd;
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
    R(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    R(this, "triggerConnectorEvents", async () => {
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
    R(this, "getConnector", (t) => this._connectors.find((n) => {
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
      return new UE(window.localStorage);
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
    Object.values(yd).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      Vr(t.isConnected()),
      Vr(this.pingConnector(t))
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
      return await HE(async () => Vr(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: VE
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(Xo)), await ((o = this._storage) == null ? void 0 : o.setItem(fr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = YE();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), Vr(t.promise, ZE).then(() => !0).catch(() => !1);
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
    return XE(
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
      n = await Cs.create(t.url);
    else {
      if (t)
        throw new v(F.INVALID_PROVIDER, "Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await Cs.create(r.url);
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
    return new Zs(t, r, this);
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
}, Cd = fr;
_e(Cd, "STORAGE_KEY", "fuel-current-connector");
_e(Cd, "defaultConfig", {});
function pc(e, t) {
  if (!e)
    throw new v(F.TRANSACTION_ERROR, t);
}
function Qd(e) {
  return e.reduce((t, n, r) => {
    const { program: s, externalAbis: i } = n.getCallConfig();
    return r === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var Ht, bc, bd = (bc = class {
  constructor(...e) {
    It(this, Ht, void 0);
    tn(this, Ht, e || []);
  }
  entries() {
    return Ne(this, Ht);
  }
  push(...e) {
    Ne(this, Ht).push(...e);
  }
  concat(e) {
    return Ne(this, Ht).concat(e);
  }
  extend(e) {
    Ne(this, Ht).push(...e);
  }
  toBytes() {
    return se(
      Ne(this, Ht).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return V(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Ne(this, Ht), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Ht = new WeakMap(), bc), jE = (e) => Bo + ks({ maxInputs: e }), vd = K + Qn + CA + K + K;
function qE(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === Ae.ScriptResult ? n = i : (i.type === Ae.Return || i.type === Ae.ReturnData || i.type === Ae.Revert) && (r = i);
  }), !n || !r)
    throw new v(F.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: n.result,
    gasUsed: n.gasUsed,
    receipts: t,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: e
  };
}
function jo(e, t, n = []) {
  var r;
  try {
    const s = qE(e);
    return t(s);
  } catch (s) {
    throw s.code === F.SCRIPT_REVERTED ? Ku({
      logs: n,
      receipts: e.receipts,
      status: (r = e.gqlTransaction) == null ? void 0 : r.status
    }) : s;
  }
}
function WE(e, t, n) {
  return jo(
    e,
    (r) => {
      if (r.returnReceipt.type === Ae.Revert)
        throw new v(
          F.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== Ae.Return && r.returnReceipt.type !== Ae.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new v(
          F.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: n,
            receipt: r.returnReceipt
          })}`
        );
      }
      let s;
      return r.returnReceipt.type === Ae.Return && (s = r.returnReceipt.val), r.returnReceipt.type === Ae.ReturnData && (s = t.func.decodeOutput(r.returnReceipt.data)[0]), s;
    },
    n
  );
}
var Qr = class {
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
    R(this, "bytes");
    /**
     * A function to encode the script data.
     */
    R(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    R(this, "scriptResultDecoder");
    this.bytes = H(e), this.scriptDataEncoder = t, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return ks({ maxInputs: t }) + Bo + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Qr.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = H(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return jo(e, this.scriptResultDecoder, t);
  }
}, xd = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, $E = Re, Fd = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new bd(
    Hr(16, e),
    Hr(17, n),
    lr(17, 17, 0),
    Hr(18, r)
  );
  return t ? i.push(
    Hr(19, t),
    lr(19, 19, 0),
    Xa(16, 17, 18, 19)
  ) : i.push(Xa(16, 17, 18, Se.cgas().to_u8())), s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    lr(21, Se.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    lr(22, Se.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    pg(22, 22, s.encodedLength),
    fg(21, 22)
  ]), i;
};
function mc(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new bd();
  for (let r = 0; r < e.length; r += 1)
    n.extend(Fd(e[r], t[r]).entries());
  return n.push(Fu(1)), n.toBytes();
}
var Ec = (e) => e === Ae.Return || e === Ae.ReturnData, zE = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === Ae.Call && r === $E && s === t
), KE = (e, t) => (n) => {
  if (Ft(n.code) !== 0)
    throw new v(F.SCRIPT_REVERTED, "Transaction reverted.");
  const r = zE(
    n.receipts,
    e.toB256()
  ), s = C(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => Ec(o)).flatMap((o, A, d) => {
    var f;
    if (!s.eq(C(o.is)))
      return [];
    if (o.type === Ae.Return)
      return [
        new N("u64").encode(o.val)
      ];
    if (o.type === Ae.ReturnData) {
      const y = H(o.data);
      if (t && Ec((f = d[A + 1]) == null ? void 0 : f.type)) {
        const w = d[A + 1];
        return se([y, H(w.data)]);
      }
      return [y];
    }
    return [new Uint8Array()];
  });
}, ew = (e, t, n, r = []) => jo(e, KE(t, n), r), tw = (e) => e.reduce(
  (t, n) => {
    const r = { ...xd };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength
    };
    return t + Fd(r, s).byteLength();
  },
  _t.size()
  // placeholder for single RET instruction which is added later
), nw = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength
  };
}), rw = (e, t) => {
  var o;
  const n = [];
  let r = 0;
  const s = {
    amountOffset: t,
    assetIdOffset: t + K,
    gasForwardedOffset: e.gas ? t + K + Qn : 0,
    callDataOffset: t + K + Qn + r
  };
  if (n.push(new N("u64").encode(e.amount || 0)), n.push(new U().encode(((o = e.assetId) == null ? void 0 : o.toString()) || ht)), n.push(e.contractId.toBytes()), n.push(new N("u64").encode(e.fnSelector)), e.gas && (n.push(new N("u64").encode(e.gas)), r = K), e.isInputDataPointer) {
    const A = t + vd + r;
    n.push(new N("u64").encode(A));
  }
  const i = H(e.data);
  return n.push(i), {
    scriptData: n,
    callParamOffsets: s
  };
}, sw = (e, t) => {
  var f;
  const n = [], r = t + K;
  let s = 0;
  n.push(new N("u64").encode(e.amount || 0)), n.push(new U().encode(((f = e.assetId) == null ? void 0 : f.toString()) || ht)), e.gas && (n.push(new N("u64").encode(e.gas)), s = K);
  const i = {
    amountOffset: r,
    assetIdOffset: r + K,
    gasForwardedOffset: r + K + Qn,
    callDataOffset: r + K + Qn + s
  }, o = i.callDataOffset + CA + K + K, A = o + e.fnSelectorBytes.length, d = H(e.data);
  return n.push(e.contractId.toBytes()), n.push(new N("u64").encode(o)), n.push(new N("u64").encode(A)), n.push(e.fnSelectorBytes), n.push(d), {
    scriptData: n,
    callParamOffsets: i
  };
}, iw = (e) => e === Io ? sw : rw, wc = (e, t) => new Qr(
  // Script to call the contract, start with stub size matching length of calls
  mc(
    new Array(e.length).fill(xd),
    nw(e)
  ),
  (n) => {
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = tw(n), i = (8 - s % 8) % 8, o = s + i, A = jE(t.toNumber()) + o, d = [], f = [];
    let y = A;
    const w = [];
    for (let D = 0; D < r; D += 1) {
      const Q = n[D], { scriptData: S, callParamOffsets: _ } = iw(
        Q.encoding
      )(Q, y);
      f.push({
        isHeap: Q.isOutputDataHeap,
        encodedLength: Q.outputEncodedLength
      }), w.push(se(S)), d.push(_), y = A + se(w).byteLength;
    }
    const b = mc(d, f);
    return { data: se(w), script: b };
  },
  () => [new Uint8Array()]
);
function ow(e) {
  const t = e.receipts.find((n) => n.type === Ae.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || C(0);
}
var Dd = class {
  /**
   * Constructs an instance of InvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(e, t, n) {
    R(this, "functionScopes");
    R(this, "isMultiCall");
    R(this, "gasUsed");
    R(this, "value");
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = ow(t);
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
    return Qd(this.functionScopes);
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
      return WE(e, n, t);
    const s = ew(
      e,
      (n == null ? void 0 : n.program).id,
      (n == null ? void 0 : n.func.outputMetadata.isHeapType) || !1,
      t
    ).map((i, o) => {
      var d;
      const { func: A } = this.functionScopes[o].getCallConfig();
      return (d = A.decodeOutput(i)) == null ? void 0 : d[0];
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
    return od(e, n, r);
  }
}, Rd = class extends Dd {
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
    R(this, "transactionId");
    R(this, "transactionResponse");
    R(this, "transactionResult");
    R(this, "program");
    R(this, "logs");
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
    return new Rd(
      t,
      n,
      i,
      s,
      r
    );
  }
}, os = class extends Dd {
  /**
   * Constructs an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(t, n, r) {
    super(t, n, r);
    R(this, "callResult");
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
    return await new os(t, n, r);
  }
};
function aw(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o } = e.getCallConfig(), A = e.getCallConfig().func.isInputDataPointer ? vd : 0, d = i.encodeArguments(r, t + A);
  return {
    contractId: n.id,
    fnSelector: i.selector,
    fnSelectorBytes: i.selectorBytes,
    encoding: i.encoding,
    data: d,
    isInputDataPointer: i.isInputDataPointer,
    isOutputDataHeap: i.outputMetadata.isHeapType,
    outputEncodedLength: i.outputMetadata.encodedLength,
    assetId: s == null ? void 0 : s.assetId,
    amount: s == null ? void 0 : s.amount,
    gas: o == null ? void 0 : o.gasLimit
  };
}
var Nd = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    R(this, "transactionRequest");
    R(this, "program");
    R(this, "functionInvocationScopes", []);
    R(this, "txParameters");
    R(this, "requiredCoins", []);
    R(this, "isMultiCall", !1);
    R(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    R(this, "externalAbis", {});
    R(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new Pn();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    const t = this.getProvider().getChain().consensusParameters;
    if (!t)
      throw new v(
        v.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``"
      );
    const n = t.maxInputs, r = wc(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => aw(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.program.provider.getChain().consensusParameters.maxInputs, t = wc(this.functionInvocationScopes, e);
    this.transactionRequest.setScript(t, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId);
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
      amount: C(t.amount || 0)
    })).filter(({ assetId: t, amount: n }) => t && !C(n).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const e = this.getRequiredCoins(), t = (n, { assetId: r, amount: s }) => {
      var o;
      const i = ((o = n.get(r)) == null ? void 0 : o.amount) || C(0);
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
    await _o(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === gt.Script && (this.transactionRequest.abis = Qd(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, n) => t.add(n.gas || 0), C(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new v(
        F.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
  }
  /**
   * Gets the transaction cost ny dry running the transaction.
   *
   * @param options - Optional transaction cost options.
   * @returns The transaction cost details.
   */
  async getTransactionCost(e) {
    const t = this.getProvider(), n = await this.getTransactionRequest();
    return n.gasPrice = C(Ft(n.gasPrice) || Ft((e == null ? void 0 : e.gasPrice) || 0)), await t.getTransactionCost(n, this.getRequiredCoins(), {
      resourcesOwner: this.program.account,
      signatureCallback: this.addSignersCallback
    });
  }
  /**
   * Funds the transaction with the required coins.
   *
   * @returns The current instance of the class.
   */
  async fundWithRequiredCoins() {
    var d;
    const e = await this.getTransactionRequest(), {
      maxFee: t,
      gasUsed: n,
      minGasPrice: r,
      estimatedInputs: s,
      outputVariables: i,
      missingContractIds: o,
      requiredQuantities: A
    } = await this.getTransactionCost();
    return this.setDefaultTxParams(e, r, n), this.transactionRequest.inputs = this.transactionRequest.inputs.filter(
      (f) => f.type !== Ee.Coin
    ), await ((d = this.program.account) == null ? void 0 : d.fund(this.transactionRequest, A, t)), this.transactionRequest.updatePredicateInputs(s), o.forEach((f) => {
      this.transactionRequest.addContractInputAndOutput(le.fromString(f));
    }), this.transactionRequest.addVariableOutputs(i), this.addSignersCallback && await this.addSignersCallback(this.transactionRequest), this;
  }
  /**
   * Sets the transaction parameters.
   *
   * @param txParams - The transaction parameters to set.
   * @returns The current instance of the class.
   */
  txParams(e) {
    var r;
    this.txParameters = e;
    const t = this.transactionRequest, { minGasPrice: n } = this.getProvider().getGasConfig();
    return t.gasPrice = C(e.gasPrice || t.gasPrice || n), t.gasLimit = C(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? C(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? C(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((r = this.txParameters) == null ? void 0 : r.variableOutputs) || 0), this;
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
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @returns The current instance of the class.
   */
  addTransfer(e, t, n) {
    return this.transactionRequest = this.transactionRequest.addCoinOutput(
      le.fromAddressOrString(e),
      t,
      n
    ), this;
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
    pc(this.program.account, "Wallet is required!"), await this.fundWithRequiredCoins();
    const e = await this.program.account.sendTransaction(
      await this.getTransactionRequest(),
      {
        awaitExecution: !0,
        estimateTxDependencies: !1
      }
    );
    return Rd.build(
      this.functionInvocationScopes,
      e,
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
    if (pc(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new v(
        F.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    await this.fundWithRequiredCoins();
    const e = await this.program.account.simulateTransaction(
      await this.getTransactionRequest(),
      {
        estimateTxDependencies: !1
      }
    );
    return os.build(this.functionInvocationScopes, e, this.isMultiCall);
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
    return os.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall
    );
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return os.build(
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
   * In case the gasLimit and gasPrice are *not* set by the user, this method sets some default values.
   */
  setDefaultTxParams(e, t, n) {
    var A, d;
    const r = !!((A = this.txParameters) != null && A.gasLimit) || this.hasCallParamsGasLimit, s = !!((d = this.txParameters) != null && d.gasPrice), { gasLimit: i, gasPrice: o } = e;
    if (!r)
      e.gasLimit = n;
    else if (i.lt(n))
      throw new v(
        F.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${n}'.`
      );
    if (!s)
      e.gasPrice = t;
    else if (o.lt(t))
      throw new v(
        F.GAS_PRICE_TOO_LOW,
        `Gas price '${o}' is lower than the required: '${t}'.`
      );
  }
}, Sd = class extends Nd {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, n, r) {
    super(t, !1);
    R(this, "func");
    R(this, "callParameters");
    R(this, "forward");
    R(this, "args");
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
        throw new v(
          F.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = Oo(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, cw = class extends Nd {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(e, t) {
    super(e, !0), this.addCalls(t), this.validateHeapTypeReturnCalls();
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
  validateHeapTypeReturnCalls() {
    let e = -1, t = 0;
    this.calls.forEach((s, i) => {
      const { isOutputDataHeap: o } = s;
      if (o && (e = i, ++t > 1))
        throw new v(
          F.INVALID_MULTICALL,
          "A multicall can have only one call that returns a heap type."
        );
    });
    const n = e !== -1, r = e === this.calls.length - 1;
    if (n && !r)
      throw new v(
        F.INVALID_MULTICALL,
        "In a multicall, the contract call returning a heap type must be the last call."
      );
  }
}, Aw = class {
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
    R(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    R(this, "provider");
    /**
     * The contract's ABI interface.
     */
    R(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    R(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    R(this, "functions", {});
    this.interface = t instanceof en ? t : new en(t), this.id = le.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
      const t = (...n) => new Sd(this, e, n);
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
    return new cw(this, e);
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
}, uw = class extends Sd {
  constructor() {
    super(...arguments);
    R(this, "scriptRequest");
  }
  updateScriptRequest() {
    this.scriptRequest || this.buildScriptRequest(), this.transactionRequest.setScript(this.scriptRequest, this.args);
  }
  buildScriptRequest() {
    const t = this.program.bytes, n = this.program.provider.getChain();
    if (!n)
      throw new v(
        v.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    const r = n.consensusParameters.maxInputs.toNumber(), s = new we(t.length).encodedLength;
    this.scriptRequest = new Qr(
      t,
      (i) => this.func.encodeArguments(
        i,
        Qr.getScriptDataOffsetWithScriptBytes(s, r)
      ),
      () => []
    );
  }
}, nI = class extends gh {
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
    R(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    R(this, "interface");
    /**
     * The account associated with the script.
     */
    R(this, "account");
    /**
     * The script request object.
     */
    R(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    R(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    R(this, "functions");
    this.bytes = H(t), this.interface = new en(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new uw(this, this.interface.getFunction("main"), s)
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
      throw new v(
        F.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new Qr(
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
function rI(e) {
  return e;
}
var dw = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(dw || {}), lw = Object.defineProperty, hw = (e, t) => {
  for (var n in t)
    lw(e, n, { get: t[n], enumerable: !0 });
}, fw = {};
hw(fw, {
  getContractId: () => kd,
  getContractRoot: () => _d,
  getContractStorageRoot: () => Md,
  hexlifyWithPrefix: () => $i
});
var _d = (e) => {
  const n = H(e), r = Rc(n, 16384);
  return Yu(r.map((s) => V(s)));
}, Md = (e) => {
  const t = new Ep();
  return e.forEach(({ key: n, value: r }) => t.update(wt(n), r)), t.root;
}, kd = (e, t, n) => {
  const r = _d(H(e));
  return wt(se(["0x4655454C", t, r, n]));
}, $i = (e) => V(e.startsWith("0x") ? e : `0x${e}`), gw = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, n = null) {
    R(this, "bytecode");
    R(this, "interface");
    R(this, "provider");
    R(this, "account");
    this.bytecode = H(e), t instanceof en ? this.interface = t : this.interface = new en(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new gw(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    var o;
    const t = (o = e == null ? void 0 : e.storageSlots) == null ? void 0 : o.map(({ key: A, value: d }) => ({
      key: $i(A),
      value: $i(d)
    })).sort(({ key: A }, { key: d }) => A.localeCompare(d)), n = {
      salt: Yt(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new v(
        F.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || Md(n.storageSlots), s = kd(this.bytecode, n.salt, r), i = new Vi({
      gasPrice: 0,
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
      throw new v(F.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), { requiredQuantities: s, maxFee: i } = await this.account.provider.getTransactionCost(r);
    return r.gasPrice = this.account.provider.getGasConfig().minGasPrice, r.maxFee = this.account.provider.getGasConfig().maxGasPerTx, await this.account.fund(r, s, i), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new Aw(n, this.interface, this.account);
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
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r), o = H(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new v(
        F.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, sI = 9, iI = 3, oI = 9, aI = 9, cI = 18, AI = 15, uI = 12, dI = 9, vc, lI = typeof process < "u" && ((vc = process == null ? void 0 : process.env) == null ? void 0 : vc.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/graphql", hI = "https://beta-5.fuel.network/graphql";
export {
  Qn as ASSET_ID_LEN,
  qA as AbstractAccount,
  hh as AbstractAddress,
  fh as AbstractContract,
  WA as AbstractProgram,
  gh as AbstractScript,
  bw as AbstractScriptRequest,
  Zs as Account,
  le as Address,
  Vm as AddressType,
  lt as ArrayCoder,
  U as B256Coder,
  FA as B512Coder,
  ke as BN,
  pn as BYTES_32,
  ht as BaseAssetId,
  Hs as BaseTransactionRequest,
  ud as BaseWalletUnlocked,
  N as BigNumberCoder,
  eh as BooleanCoder,
  we as ByteArrayCoder,
  us as ByteCoder,
  kn as CHAIN_IDS,
  CA as CONTRACT_ID_LEN,
  Dw as CONTRACT_MAX_SIZE,
  Xm as ChainName,
  Jw as ChangeOutputCollisionError,
  ie as Coder,
  dw as Commands,
  Aw as Contract,
  gw as ContractFactory,
  fw as ContractUtils,
  Vi as CreateTransactionRequest,
  aI as DECIMAL_FUEL,
  dI as DECIMAL_GWEI,
  AI as DECIMAL_KWEI,
  uI as DECIMAL_MWEI,
  cI as DECIMAL_WEI,
  oI as DEFAULT_DECIMAL_UNITS,
  iI as DEFAULT_MIN_PRECISION,
  sI as DEFAULT_PRECISION,
  to as DateTime,
  Xn as ENCODING_V0,
  Io as ENCODING_V1,
  vw as EmptyRoot,
  RA as EnumCoder,
  cg as FAILED_ASSERT_EQ_SIGNAL,
  ug as FAILED_ASSERT_NE_SIGNAL,
  Ag as FAILED_ASSERT_SIGNAL,
  ag as FAILED_REQUIRE_SIGNAL,
  bu as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  Ow as FAILED_UNKNOWN_SIGNAL,
  hs as FUEL_BECH32_HRP_PREFIX,
  hI as FUEL_BETA_5_NETWORK_URL,
  lI as FUEL_NETWORK_URL,
  Cd as Fuel,
  JE as FuelConnector,
  Bd as FuelConnectorEventType,
  Xo as FuelConnectorEventTypes,
  yd as FuelConnectorMethods,
  Rd as FunctionInvocationResult,
  Sd as FunctionInvocationScope,
  Ci as HDWallet,
  Xl as INPUT_COIN_FIXED_SIZE,
  gs as InputCoder,
  wa as InputCoinCoder,
  fs as InputContractCoder,
  Er as InputMessageCoder,
  Ee as InputType,
  bd as InstructionSet,
  en as Interface,
  os as InvocationCallResult,
  Dd as InvocationResult,
  QE as Language,
  UE as LocalStorage,
  kw as MAX_PREDICATE_DATA_LENGTH,
  Mw as MAX_PREDICATE_LENGTH,
  Sw as MAX_SCRIPT_DATA_LENGTH,
  Nw as MAX_SCRIPT_LENGTH,
  _w as MAX_STATIC_CONTRACTS,
  Rw as MAX_WITNESSES,
  lc as MNEMONIC_SIZES,
  TE as MemoryStorage,
  Yo as Mnemonic,
  pd as MnemonicVault,
  cw as MultiCallInvocationScope,
  xm as NoWitnessAtIndexError,
  Hw as NoWitnessByOwnerError,
  z as NumberCoder,
  Zm as OperationName,
  _A as OptionCoder,
  ya as OutputChangeCoder,
  ms as OutputCoder,
  Ia as OutputCoinCoder,
  ps as OutputContractCoder,
  Ca as OutputContractCreatedCoder,
  ye as OutputType,
  Ba as OutputVariableCoder,
  lg as PANIC_DOC_URL,
  dg as PANIC_REASONS,
  Es as PoliciesCoder,
  kt as PolicyType,
  gc as Predicate,
  md as PrivateKeyVault,
  Cs as Provider,
  nh as RawSliceCoder,
  Mi as ReceiptBurnCoder,
  Qa as ReceiptCallCoder,
  xw as ReceiptCoder,
  Da as ReceiptLogCoder,
  Ra as ReceiptLogDataCoder,
  ws as ReceiptMessageOutCoder,
  wr as ReceiptMintCoder,
  xa as ReceiptPanicCoder,
  ba as ReceiptReturnCoder,
  va as ReceiptReturnDataCoder,
  Fa as ReceiptRevertCoder,
  _a as ReceiptScriptResultCoder,
  Na as ReceiptTransferCoder,
  Sa as ReceiptTransferOutCoder,
  Ae as ReceiptType,
  Bo as SCRIPT_FIXED_SIZE,
  nI as Script,
  Qr as ScriptRequest,
  Pn as ScriptTransactionRequest,
  tr as Signer,
  kA as StdStringCoder,
  eI as StorageAbstract,
  Ma as StorageSlotCoder,
  rh as StringCoder,
  Os as StructCoder,
  mn as TransactionCoder,
  Oa as TransactionCreateCoder,
  Ta as TransactionMintCoder,
  is as TransactionResponse,
  ka as TransactionScriptCoder,
  Ym as TransactionStatus,
  gt as TransactionType,
  Hm as TransactionTypeName,
  OA as TupleCoder,
  qn as TxPointerCoder,
  Fi as UTXO_ID_LEN,
  Fw as UtxoIdCoder,
  PE as Vault,
  TA as VecCoder,
  K as WORD_SIZE,
  bt as Wallet,
  gd as WalletLocked,
  LE as WalletManager,
  Ct as WalletUnlocked,
  Is as WitnessCoder,
  Re as ZeroBytes32,
  yp as addAmountToAsset,
  er as addOperation,
  Ar as addressify,
  H as arrayify,
  bm as assemblePanicError,
  wm as assembleReceiptByType,
  vm as assembleRevertError,
  Ys as assembleTransactionSummary,
  pc as assert,
  Kw as assets,
  C as bn,
  fn as bufferFromString,
  Uw as buildBlockExplorerUrl,
  HE as cacheFor,
  $u as calculateMetadataGasForTxCreate,
  zu as calculateMetadataGasForTxScript,
  gr as calculatePriceWithFactor,
  Sm as calculateTransactionFee,
  ks as calculateVmTxMemory,
  Iw as capitalizeString,
  Rc as chunkAndPadBytes,
  yh as clearFirst12BytesFromB256,
  Oo as coinQuantityfy,
  cA as computeHmac,
  se as concat,
  br as concatBytes,
  rI as createConfig,
  ro as dataSlice,
  A0 as decodeBase58,
  Sl as decrypt,
  Ml as decryptJsonWalletData,
  Bw as defaultChainConfig,
  Cw as defaultConsensusKey,
  YE as deferPromise,
  tI as dispatchFuelConnectorEvent,
  Mc as encodeBase58,
  _l as encrypt,
  kl as encryptJsonWalletData,
  Zr as english,
  oE as extractBurnedAssetsFromReceipts,
  iE as extractMintedAssetsFromReceipts,
  Ku as extractTxError,
  Ew as format,
  mw as formatUnits,
  bo as fromBech32,
  Bm as gasUsedByInputs,
  Qd as getAbisFromAllCalls,
  Ww as getAssetEth,
  $w as getAssetFuel,
  fE as getAssetNetwork,
  Ad as getAssetWithNetwork,
  no as getBytes,
  vo as getBytesFromBech32,
  eE as getContractCallOperations,
  rE as getContractCreatedOperations,
  od as getDecodedLogs,
  hE as getDefaultChainId,
  qu as getGasUsedFromReceipts,
  Jo as getInputAccountAddress,
  Pm as getInputContractFromIndex,
  td as getInputFromAssetId,
  Uo as getInputsByType,
  Mm as getInputsByTypes,
  km as getInputsCoin,
  Tm as getInputsCoinAndMessage,
  Lm as getInputsContract,
  Om as getInputsMessage,
  Go as getMaxGas,
  Wu as getMinGas,
  KA as getMintedAssetId,
  sE as getOperations,
  kr as getOutputsByType,
  Um as getOutputsChange,
  nd as getOutputsCoin,
  Jm as getOutputsContract,
  Gm as getOutputsContractCreated,
  Yw as getOutputsVariable,
  nE as getPayProducerOperations,
  GE as getPredicateRoot,
  Ih as getRandomB256,
  Cr as getReceiptsByType,
  qm as getReceiptsCall,
  Wm as getReceiptsMessageOut,
  Vw as getReceiptsTransferOut,
  Em as getReceiptsWithMissingData,
  aE as getTransactionStatusName,
  Xw as getTransactionSummary,
  jw as getTransactionSummaryFromRequest,
  rd as getTransactionTypeName,
  qw as getTransactionsSummaries,
  ac as getTransferOperations,
  Km as getWithdrawFromFuelOperations,
  Zw as hasSameAssetId,
  Kt as hash,
  Pl as hashMessage,
  V as hexlify,
  fm as inputify,
  Si as isB256,
  es as isBech32,
  ic as isCoin,
  _i as isEvmAddress,
  Gw as isMessage,
  ma as isPublicKey,
  Lw as isRawCoin,
  Pw as isRawMessage,
  Ho as isType,
  sd as isTypeCreate,
  jm as isTypeMint,
  id as isTypeScript,
  aA as keccak256,
  Qw as keyFromPassword,
  zd as max,
  ww as multiply,
  wh as normalizeBech32,
  Cm as normalizeJSON,
  yw as normalizeString,
  gm as outputify,
  Bh as padFirst12BytesOfEvmAddress,
  Ol as pbkdf2,
  Gn as processGqlReceipt,
  cE as processGraphqlStatus,
  Yt as randomBytes,
  gn as resolveGasDependentCosts,
  zw as resolveIconPaths,
  oc as returnZeroScript,
  Tl as ripemd160,
  oA as scrypt,
  wt as sha256,
  Qm as sleep,
  Ch as sortPolicies,
  cr as stringFromBuffer,
  Ea as toB256,
  Kr as toBech32,
  Lt as toBytes,
  $d as toFixed,
  as as toHex,
  Ft as toNumber,
  St as transactionRequestify,
  Ll as uint64ToBytesBE,
  EE as urlJoin,
  Vr as withTimeout,
  Nm as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
