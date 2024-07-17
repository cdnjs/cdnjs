var Ad = Object.defineProperty;
var ld = (e, t, n) => t in e ? Ad(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var S = (e, t, n) => (ld(e, typeof t != "symbol" ? t + "" : t, n), n), oi = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var Fe = (e, t, n) => (oi(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Bt = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Mt = (e, t, n, r) => (oi(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var Ur = (e, t, n) => (oi(e, t, "access private method"), n);
function Rc() {
  return {
    FORC: "0.60.0",
    FUEL_CORE: "0.30.0",
    FUELS: "0.90.0"
  };
}
function ta(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function Zi(e, t) {
  const n = ta(e), r = ta(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function fd(e, t) {
  const { major: n } = Zi(e, t);
  return n === 0;
}
function hd(e, t) {
  const { minor: n } = Zi(e, t);
  return n === 0;
}
function gd(e, t) {
  const { patch: n } = Zi(e, t);
  return n === 0;
}
function pd(e) {
  const { FUEL_CORE: t } = Rc();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: fd(e, t),
    isMinorSupported: hd(e, t),
    isPatchSupported: gd(e, t)
  };
}
var md = Rc(), wd = Object.defineProperty, yd = (e, t, n) => t in e ? wd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Id = (e, t, n) => (yd(e, typeof t != "symbol" ? t + "" : t, n), n), N = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e))(N || {}), jr = class extends Error {
  constructor(t, n, r = {}) {
    super(n);
    S(this, "VERSIONS", md);
    S(this, "metadata");
    S(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = r;
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new jr(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(N);
    if (!r.includes(n.code))
      throw new jr(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new jr(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, metadata: s, VERSIONS: i } = this;
    return { code: t, name: n, message: r, metadata: s, VERSIONS: i };
  }
}, v = jr;
Id(v, "CODES", N);
var be = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function bd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ji(e) {
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
var qi = { exports: {} };
const Ed = {}, Cd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ed
}, Symbol.toStringTag, { value: "Module" })), Bd = /* @__PURE__ */ Ji(Cd);
qi.exports;
(function(e) {
  (function(t, n) {
    function r(E, a) {
      if (!E)
        throw new Error(a || "Assertion failed");
    }
    function s(E, a) {
      E.super_ = a;
      var u = function() {
      };
      u.prototype = a.prototype, E.prototype = new u(), E.prototype.constructor = E;
    }
    function i(E, a, u) {
      if (i.isBN(E))
        return E;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, E !== null && ((a === "le" || a === "be") && (u = a, a = 10), this._init(E || 0, a || 10, u || "be"));
    }
    typeof t == "object" ? t.exports = i : n.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = Bd.Buffer;
    } catch {
    }
    i.isBN = function(a) {
      return a instanceof i ? !0 : a !== null && typeof a == "object" && a.constructor.wordSize === i.wordSize && Array.isArray(a.words);
    }, i.max = function(a, u) {
      return a.cmp(u) > 0 ? a : u;
    }, i.min = function(a, u) {
      return a.cmp(u) < 0 ? a : u;
    }, i.prototype._init = function(a, u, l) {
      if (typeof a == "number")
        return this._initNumber(a, u, l);
      if (typeof a == "object")
        return this._initArray(a, u, l);
      u === "hex" && (u = 16), r(u === (u | 0) && u >= 2 && u <= 36), a = a.toString().replace(/\s+/g, "");
      var p = 0;
      a[0] === "-" && (p++, this.negative = 1), p < a.length && (u === 16 ? this._parseHex(a, p, l) : (this._parseBase(a, u, p), l === "le" && this._initArray(this.toArray(), u, l)));
    }, i.prototype._initNumber = function(a, u, l) {
      a < 0 && (this.negative = 1, a = -a), a < 67108864 ? (this.words = [a & 67108863], this.length = 1) : a < 4503599627370496 ? (this.words = [
        a & 67108863,
        a / 67108864 & 67108863
      ], this.length = 2) : (r(a < 9007199254740992), this.words = [
        a & 67108863,
        a / 67108864 & 67108863,
        1
      ], this.length = 3), l === "le" && this._initArray(this.toArray(), u, l);
    }, i.prototype._initArray = function(a, u, l) {
      if (r(typeof a.length == "number"), a.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(a.length / 3), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var f, y, I = 0;
      if (l === "be")
        for (p = a.length - 1, f = 0; p >= 0; p -= 3)
          y = a[p] | a[p - 1] << 8 | a[p - 2] << 16, this.words[f] |= y << I & 67108863, this.words[f + 1] = y >>> 26 - I & 67108863, I += 24, I >= 26 && (I -= 26, f++);
      else if (l === "le")
        for (p = 0, f = 0; p < a.length; p += 3)
          y = a[p] | a[p + 1] << 8 | a[p + 2] << 16, this.words[f] |= y << I & 67108863, this.words[f + 1] = y >>> 26 - I & 67108863, I += 24, I >= 26 && (I -= 26, f++);
      return this._strip();
    };
    function c(E, a) {
      var u = E.charCodeAt(a);
      if (u >= 48 && u <= 57)
        return u - 48;
      if (u >= 65 && u <= 70)
        return u - 55;
      if (u >= 97 && u <= 102)
        return u - 87;
      r(!1, "Invalid character in " + E);
    }
    function A(E, a, u) {
      var l = c(E, u);
      return u - 1 >= a && (l |= c(E, u - 1) << 4), l;
    }
    i.prototype._parseHex = function(a, u, l) {
      this.length = Math.ceil((a.length - u) / 6), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var f = 0, y = 0, I;
      if (l === "be")
        for (p = a.length - 1; p >= u; p -= 2)
          I = A(a, u, p) << f, this.words[y] |= I & 67108863, f >= 18 ? (f -= 18, y += 1, this.words[y] |= I >>> 26) : f += 8;
      else {
        var g = a.length - u;
        for (p = g % 2 === 0 ? u + 1 : u; p < a.length; p += 2)
          I = A(a, u, p) << f, this.words[y] |= I & 67108863, f >= 18 ? (f -= 18, y += 1, this.words[y] |= I >>> 26) : f += 8;
      }
      this._strip();
    };
    function h(E, a, u, l) {
      for (var p = 0, f = 0, y = Math.min(E.length, u), I = a; I < y; I++) {
        var g = E.charCodeAt(I) - 48;
        p *= l, g >= 49 ? f = g - 49 + 10 : g >= 17 ? f = g - 17 + 10 : f = g, r(g >= 0 && f < l, "Invalid character"), p += f;
      }
      return p;
    }
    i.prototype._parseBase = function(a, u, l) {
      this.words = [0], this.length = 1;
      for (var p = 0, f = 1; f <= 67108863; f *= u)
        p++;
      p--, f = f / u | 0;
      for (var y = a.length - l, I = y % p, g = Math.min(y, y - I) + l, d = 0, m = l; m < g; m += p)
        d = h(a, m, m + p, u), this.imuln(f), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
      if (I !== 0) {
        var X = 1;
        for (d = h(a, m, a.length, u), m = 0; m < I; m++)
          X *= u;
        this.imuln(X), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
      }
      this._strip();
    }, i.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var u = 0; u < this.length; u++)
        a.words[u] = this.words[u];
      a.length = this.length, a.negative = this.negative, a.red = this.red;
    };
    function b(E, a) {
      E.words = a.words, E.length = a.length, E.negative = a.negative, E.red = a.red;
    }
    if (i.prototype._move = function(a) {
      b(a, this);
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
    var x = [
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
    ], _ = [
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
    i.prototype.toString = function(a, u) {
      a = a || 10, u = u | 0 || 1;
      var l;
      if (a === 16 || a === "hex") {
        l = "";
        for (var p = 0, f = 0, y = 0; y < this.length; y++) {
          var I = this.words[y], g = ((I << p | f) & 16777215).toString(16);
          f = I >>> 24 - p & 16777215, p += 2, p >= 26 && (p -= 26, y--), f !== 0 || y !== this.length - 1 ? l = x[6 - g.length] + g + l : l = g + l;
        }
        for (f !== 0 && (l = f.toString(16) + l); l.length % u !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var d = _[a], m = R[a];
        l = "";
        var X = this.clone();
        for (X.negative = 0; !X.isZero(); ) {
          var J = X.modrn(m).toString(a);
          X = X.idivn(m), X.isZero() ? l = J + l : l = x[d - J.length] + J + l;
        }
        for (this.isZero() && (l = "0" + l); l.length % u !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      r(!1, "Base should be between 2 and 36");
    }, i.prototype.toNumber = function() {
      var a = this.words[0];
      return this.length === 2 ? a += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? a += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -a : a;
    }, i.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, o && (i.prototype.toBuffer = function(a, u) {
      return this.toArrayLike(o, a, u);
    }), i.prototype.toArray = function(a, u) {
      return this.toArrayLike(Array, a, u);
    };
    var C = function(a, u) {
      return a.allocUnsafe ? a.allocUnsafe(u) : new a(u);
    };
    i.prototype.toArrayLike = function(a, u, l) {
      this._strip();
      var p = this.byteLength(), f = l || Math.max(1, p);
      r(p <= f, "byte array longer than desired length"), r(f > 0, "Requested array length <= 0");
      var y = C(a, f), I = u === "le" ? "LE" : "BE";
      return this["_toArrayLike" + I](y, p), y;
    }, i.prototype._toArrayLikeLE = function(a, u) {
      for (var l = 0, p = 0, f = 0, y = 0; f < this.length; f++) {
        var I = this.words[f] << y | p;
        a[l++] = I & 255, l < a.length && (a[l++] = I >> 8 & 255), l < a.length && (a[l++] = I >> 16 & 255), y === 6 ? (l < a.length && (a[l++] = I >> 24 & 255), p = 0, y = 0) : (p = I >>> 24, y += 2);
      }
      if (l < a.length)
        for (a[l++] = p; l < a.length; )
          a[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, u) {
      for (var l = a.length - 1, p = 0, f = 0, y = 0; f < this.length; f++) {
        var I = this.words[f] << y | p;
        a[l--] = I & 255, l >= 0 && (a[l--] = I >> 8 & 255), l >= 0 && (a[l--] = I >> 16 & 255), y === 6 ? (l >= 0 && (a[l--] = I >> 24 & 255), p = 0, y = 0) : (p = I >>> 24, y += 2);
      }
      if (l >= 0)
        for (a[l--] = p; l >= 0; )
          a[l--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(a) {
      return 32 - Math.clz32(a);
    } : i.prototype._countBits = function(a) {
      var u = a, l = 0;
      return u >= 4096 && (l += 13, u >>>= 13), u >= 64 && (l += 7, u >>>= 7), u >= 8 && (l += 4, u >>>= 4), u >= 2 && (l += 2, u >>>= 2), l + u;
    }, i.prototype._zeroBits = function(a) {
      if (a === 0)
        return 26;
      var u = a, l = 0;
      return u & 8191 || (l += 13, u >>>= 13), u & 127 || (l += 7, u >>>= 7), u & 15 || (l += 4, u >>>= 4), u & 3 || (l += 2, u >>>= 2), u & 1 || l++, l;
    }, i.prototype.bitLength = function() {
      var a = this.words[this.length - 1], u = this._countBits(a);
      return (this.length - 1) * 26 + u;
    };
    function F(E) {
      for (var a = new Array(E.bitLength()), u = 0; u < a.length; u++) {
        var l = u / 26 | 0, p = u % 26;
        a[u] = E.words[l] >>> p & 1;
      }
      return a;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var a = 0, u = 0; u < this.length; u++) {
        var l = this._zeroBits(this.words[u]);
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
      for (var u = 0; u < a.length; u++)
        this.words[u] = this.words[u] | a.words[u];
      return this._strip();
    }, i.prototype.ior = function(a) {
      return r((this.negative | a.negative) === 0), this.iuor(a);
    }, i.prototype.or = function(a) {
      return this.length > a.length ? this.clone().ior(a) : a.clone().ior(this);
    }, i.prototype.uor = function(a) {
      return this.length > a.length ? this.clone().iuor(a) : a.clone().iuor(this);
    }, i.prototype.iuand = function(a) {
      var u;
      this.length > a.length ? u = a : u = this;
      for (var l = 0; l < u.length; l++)
        this.words[l] = this.words[l] & a.words[l];
      return this.length = u.length, this._strip();
    }, i.prototype.iand = function(a) {
      return r((this.negative | a.negative) === 0), this.iuand(a);
    }, i.prototype.and = function(a) {
      return this.length > a.length ? this.clone().iand(a) : a.clone().iand(this);
    }, i.prototype.uand = function(a) {
      return this.length > a.length ? this.clone().iuand(a) : a.clone().iuand(this);
    }, i.prototype.iuxor = function(a) {
      var u, l;
      this.length > a.length ? (u = this, l = a) : (u = a, l = this);
      for (var p = 0; p < l.length; p++)
        this.words[p] = u.words[p] ^ l.words[p];
      if (this !== u)
        for (; p < u.length; p++)
          this.words[p] = u.words[p];
      return this.length = u.length, this._strip();
    }, i.prototype.ixor = function(a) {
      return r((this.negative | a.negative) === 0), this.iuxor(a);
    }, i.prototype.xor = function(a) {
      return this.length > a.length ? this.clone().ixor(a) : a.clone().ixor(this);
    }, i.prototype.uxor = function(a) {
      return this.length > a.length ? this.clone().iuxor(a) : a.clone().iuxor(this);
    }, i.prototype.inotn = function(a) {
      r(typeof a == "number" && a >= 0);
      var u = Math.ceil(a / 26) | 0, l = a % 26;
      this._expand(u), l > 0 && u--;
      for (var p = 0; p < u; p++)
        this.words[p] = ~this.words[p] & 67108863;
      return l > 0 && (this.words[p] = ~this.words[p] & 67108863 >> 26 - l), this._strip();
    }, i.prototype.notn = function(a) {
      return this.clone().inotn(a);
    }, i.prototype.setn = function(a, u) {
      r(typeof a == "number" && a >= 0);
      var l = a / 26 | 0, p = a % 26;
      return this._expand(l + 1), u ? this.words[l] = this.words[l] | 1 << p : this.words[l] = this.words[l] & ~(1 << p), this._strip();
    }, i.prototype.iadd = function(a) {
      var u;
      if (this.negative !== 0 && a.negative === 0)
        return this.negative = 0, u = this.isub(a), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && a.negative !== 0)
        return a.negative = 0, u = this.isub(a), a.negative = 1, u._normSign();
      var l, p;
      this.length > a.length ? (l = this, p = a) : (l = a, p = this);
      for (var f = 0, y = 0; y < p.length; y++)
        u = (l.words[y] | 0) + (p.words[y] | 0) + f, this.words[y] = u & 67108863, f = u >>> 26;
      for (; f !== 0 && y < l.length; y++)
        u = (l.words[y] | 0) + f, this.words[y] = u & 67108863, f = u >>> 26;
      if (this.length = l.length, f !== 0)
        this.words[this.length] = f, this.length++;
      else if (l !== this)
        for (; y < l.length; y++)
          this.words[y] = l.words[y];
      return this;
    }, i.prototype.add = function(a) {
      var u;
      return a.negative !== 0 && this.negative === 0 ? (a.negative = 0, u = this.sub(a), a.negative ^= 1, u) : a.negative === 0 && this.negative !== 0 ? (this.negative = 0, u = a.sub(this), this.negative = 1, u) : this.length > a.length ? this.clone().iadd(a) : a.clone().iadd(this);
    }, i.prototype.isub = function(a) {
      if (a.negative !== 0) {
        a.negative = 0;
        var u = this.iadd(a);
        return a.negative = 1, u._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(a), this.negative = 1, this._normSign();
      var l = this.cmp(a);
      if (l === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var p, f;
      l > 0 ? (p = this, f = a) : (p = a, f = this);
      for (var y = 0, I = 0; I < f.length; I++)
        u = (p.words[I] | 0) - (f.words[I] | 0) + y, y = u >> 26, this.words[I] = u & 67108863;
      for (; y !== 0 && I < p.length; I++)
        u = (p.words[I] | 0) + y, y = u >> 26, this.words[I] = u & 67108863;
      if (y === 0 && I < p.length && p !== this)
        for (; I < p.length; I++)
          this.words[I] = p.words[I];
      return this.length = Math.max(this.length, I), p !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function M(E, a, u) {
      u.negative = a.negative ^ E.negative;
      var l = E.length + a.length | 0;
      u.length = l, l = l - 1 | 0;
      var p = E.words[0] | 0, f = a.words[0] | 0, y = p * f, I = y & 67108863, g = y / 67108864 | 0;
      u.words[0] = I;
      for (var d = 1; d < l; d++) {
        for (var m = g >>> 26, X = g & 67108863, J = Math.min(d, a.length - 1), K = Math.max(0, d - E.length + 1); K <= J; K++) {
          var j = d - K | 0;
          p = E.words[j] | 0, f = a.words[K] | 0, y = p * f + X, m += y / 67108864 | 0, X = y & 67108863;
        }
        u.words[d] = X | 0, g = m | 0;
      }
      return g !== 0 ? u.words[d] = g | 0 : u.length--, u._strip();
    }
    var G = function(a, u, l) {
      var p = a.words, f = u.words, y = l.words, I = 0, g, d, m, X = p[0] | 0, J = X & 8191, K = X >>> 13, j = p[1] | 0, re = j & 8191, se = j >>> 13, Se = p[2] | 0, fe = Se & 8191, oe = Se >>> 13, _e = p[3] | 0, Ae = _e & 8191, he = _e >>> 13, Ft = p[4] | 0, ve = Ft & 8191, ye = Ft >>> 13, ar = p[5] | 0, Qe = ar & 8191, Te = ar >>> 13, Pr = p[6] | 0, Pe = Pr & 8191, Ue = Pr >>> 13, Vo = p[7] | 0, Ge = Vo & 8191, Ve = Vo >>> 13, zo = p[8] | 0, ze = zo & 8191, He = zo >>> 13, Ho = p[9] | 0, Ye = Ho & 8191, Xe = Ho >>> 13, Yo = f[0] | 0, We = Yo & 8191, Ze = Yo >>> 13, Xo = f[1] | 0, Je = Xo & 8191, qe = Xo >>> 13, Wo = f[2] | 0, je = Wo & 8191, $e = Wo >>> 13, Zo = f[3] | 0, Ke = Zo & 8191, et = Zo >>> 13, Jo = f[4] | 0, tt = Jo & 8191, nt = Jo >>> 13, qo = f[5] | 0, rt = qo & 8191, st = qo >>> 13, jo = f[6] | 0, it = jo & 8191, ot = jo >>> 13, $o = f[7] | 0, at = $o & 8191, ct = $o >>> 13, Ko = f[8] | 0, ut = Ko & 8191, dt = Ko >>> 13, ea = f[9] | 0, At = ea & 8191, lt = ea >>> 13;
      l.negative = a.negative ^ u.negative, l.length = 19, g = Math.imul(J, We), d = Math.imul(J, Ze), d = d + Math.imul(K, We) | 0, m = Math.imul(K, Ze);
      var Gs = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (Gs >>> 26) | 0, Gs &= 67108863, g = Math.imul(re, We), d = Math.imul(re, Ze), d = d + Math.imul(se, We) | 0, m = Math.imul(se, Ze), g = g + Math.imul(J, Je) | 0, d = d + Math.imul(J, qe) | 0, d = d + Math.imul(K, Je) | 0, m = m + Math.imul(K, qe) | 0;
      var Vs = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (Vs >>> 26) | 0, Vs &= 67108863, g = Math.imul(fe, We), d = Math.imul(fe, Ze), d = d + Math.imul(oe, We) | 0, m = Math.imul(oe, Ze), g = g + Math.imul(re, Je) | 0, d = d + Math.imul(re, qe) | 0, d = d + Math.imul(se, Je) | 0, m = m + Math.imul(se, qe) | 0, g = g + Math.imul(J, je) | 0, d = d + Math.imul(J, $e) | 0, d = d + Math.imul(K, je) | 0, m = m + Math.imul(K, $e) | 0;
      var zs = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (zs >>> 26) | 0, zs &= 67108863, g = Math.imul(Ae, We), d = Math.imul(Ae, Ze), d = d + Math.imul(he, We) | 0, m = Math.imul(he, Ze), g = g + Math.imul(fe, Je) | 0, d = d + Math.imul(fe, qe) | 0, d = d + Math.imul(oe, Je) | 0, m = m + Math.imul(oe, qe) | 0, g = g + Math.imul(re, je) | 0, d = d + Math.imul(re, $e) | 0, d = d + Math.imul(se, je) | 0, m = m + Math.imul(se, $e) | 0, g = g + Math.imul(J, Ke) | 0, d = d + Math.imul(J, et) | 0, d = d + Math.imul(K, Ke) | 0, m = m + Math.imul(K, et) | 0;
      var Hs = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (Hs >>> 26) | 0, Hs &= 67108863, g = Math.imul(ve, We), d = Math.imul(ve, Ze), d = d + Math.imul(ye, We) | 0, m = Math.imul(ye, Ze), g = g + Math.imul(Ae, Je) | 0, d = d + Math.imul(Ae, qe) | 0, d = d + Math.imul(he, Je) | 0, m = m + Math.imul(he, qe) | 0, g = g + Math.imul(fe, je) | 0, d = d + Math.imul(fe, $e) | 0, d = d + Math.imul(oe, je) | 0, m = m + Math.imul(oe, $e) | 0, g = g + Math.imul(re, Ke) | 0, d = d + Math.imul(re, et) | 0, d = d + Math.imul(se, Ke) | 0, m = m + Math.imul(se, et) | 0, g = g + Math.imul(J, tt) | 0, d = d + Math.imul(J, nt) | 0, d = d + Math.imul(K, tt) | 0, m = m + Math.imul(K, nt) | 0;
      var Ys = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (Ys >>> 26) | 0, Ys &= 67108863, g = Math.imul(Qe, We), d = Math.imul(Qe, Ze), d = d + Math.imul(Te, We) | 0, m = Math.imul(Te, Ze), g = g + Math.imul(ve, Je) | 0, d = d + Math.imul(ve, qe) | 0, d = d + Math.imul(ye, Je) | 0, m = m + Math.imul(ye, qe) | 0, g = g + Math.imul(Ae, je) | 0, d = d + Math.imul(Ae, $e) | 0, d = d + Math.imul(he, je) | 0, m = m + Math.imul(he, $e) | 0, g = g + Math.imul(fe, Ke) | 0, d = d + Math.imul(fe, et) | 0, d = d + Math.imul(oe, Ke) | 0, m = m + Math.imul(oe, et) | 0, g = g + Math.imul(re, tt) | 0, d = d + Math.imul(re, nt) | 0, d = d + Math.imul(se, tt) | 0, m = m + Math.imul(se, nt) | 0, g = g + Math.imul(J, rt) | 0, d = d + Math.imul(J, st) | 0, d = d + Math.imul(K, rt) | 0, m = m + Math.imul(K, st) | 0;
      var Xs = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (Xs >>> 26) | 0, Xs &= 67108863, g = Math.imul(Pe, We), d = Math.imul(Pe, Ze), d = d + Math.imul(Ue, We) | 0, m = Math.imul(Ue, Ze), g = g + Math.imul(Qe, Je) | 0, d = d + Math.imul(Qe, qe) | 0, d = d + Math.imul(Te, Je) | 0, m = m + Math.imul(Te, qe) | 0, g = g + Math.imul(ve, je) | 0, d = d + Math.imul(ve, $e) | 0, d = d + Math.imul(ye, je) | 0, m = m + Math.imul(ye, $e) | 0, g = g + Math.imul(Ae, Ke) | 0, d = d + Math.imul(Ae, et) | 0, d = d + Math.imul(he, Ke) | 0, m = m + Math.imul(he, et) | 0, g = g + Math.imul(fe, tt) | 0, d = d + Math.imul(fe, nt) | 0, d = d + Math.imul(oe, tt) | 0, m = m + Math.imul(oe, nt) | 0, g = g + Math.imul(re, rt) | 0, d = d + Math.imul(re, st) | 0, d = d + Math.imul(se, rt) | 0, m = m + Math.imul(se, st) | 0, g = g + Math.imul(J, it) | 0, d = d + Math.imul(J, ot) | 0, d = d + Math.imul(K, it) | 0, m = m + Math.imul(K, ot) | 0;
      var Ws = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (Ws >>> 26) | 0, Ws &= 67108863, g = Math.imul(Ge, We), d = Math.imul(Ge, Ze), d = d + Math.imul(Ve, We) | 0, m = Math.imul(Ve, Ze), g = g + Math.imul(Pe, Je) | 0, d = d + Math.imul(Pe, qe) | 0, d = d + Math.imul(Ue, Je) | 0, m = m + Math.imul(Ue, qe) | 0, g = g + Math.imul(Qe, je) | 0, d = d + Math.imul(Qe, $e) | 0, d = d + Math.imul(Te, je) | 0, m = m + Math.imul(Te, $e) | 0, g = g + Math.imul(ve, Ke) | 0, d = d + Math.imul(ve, et) | 0, d = d + Math.imul(ye, Ke) | 0, m = m + Math.imul(ye, et) | 0, g = g + Math.imul(Ae, tt) | 0, d = d + Math.imul(Ae, nt) | 0, d = d + Math.imul(he, tt) | 0, m = m + Math.imul(he, nt) | 0, g = g + Math.imul(fe, rt) | 0, d = d + Math.imul(fe, st) | 0, d = d + Math.imul(oe, rt) | 0, m = m + Math.imul(oe, st) | 0, g = g + Math.imul(re, it) | 0, d = d + Math.imul(re, ot) | 0, d = d + Math.imul(se, it) | 0, m = m + Math.imul(se, ot) | 0, g = g + Math.imul(J, at) | 0, d = d + Math.imul(J, ct) | 0, d = d + Math.imul(K, at) | 0, m = m + Math.imul(K, ct) | 0;
      var Zs = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (Zs >>> 26) | 0, Zs &= 67108863, g = Math.imul(ze, We), d = Math.imul(ze, Ze), d = d + Math.imul(He, We) | 0, m = Math.imul(He, Ze), g = g + Math.imul(Ge, Je) | 0, d = d + Math.imul(Ge, qe) | 0, d = d + Math.imul(Ve, Je) | 0, m = m + Math.imul(Ve, qe) | 0, g = g + Math.imul(Pe, je) | 0, d = d + Math.imul(Pe, $e) | 0, d = d + Math.imul(Ue, je) | 0, m = m + Math.imul(Ue, $e) | 0, g = g + Math.imul(Qe, Ke) | 0, d = d + Math.imul(Qe, et) | 0, d = d + Math.imul(Te, Ke) | 0, m = m + Math.imul(Te, et) | 0, g = g + Math.imul(ve, tt) | 0, d = d + Math.imul(ve, nt) | 0, d = d + Math.imul(ye, tt) | 0, m = m + Math.imul(ye, nt) | 0, g = g + Math.imul(Ae, rt) | 0, d = d + Math.imul(Ae, st) | 0, d = d + Math.imul(he, rt) | 0, m = m + Math.imul(he, st) | 0, g = g + Math.imul(fe, it) | 0, d = d + Math.imul(fe, ot) | 0, d = d + Math.imul(oe, it) | 0, m = m + Math.imul(oe, ot) | 0, g = g + Math.imul(re, at) | 0, d = d + Math.imul(re, ct) | 0, d = d + Math.imul(se, at) | 0, m = m + Math.imul(se, ct) | 0, g = g + Math.imul(J, ut) | 0, d = d + Math.imul(J, dt) | 0, d = d + Math.imul(K, ut) | 0, m = m + Math.imul(K, dt) | 0;
      var Js = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (Js >>> 26) | 0, Js &= 67108863, g = Math.imul(Ye, We), d = Math.imul(Ye, Ze), d = d + Math.imul(Xe, We) | 0, m = Math.imul(Xe, Ze), g = g + Math.imul(ze, Je) | 0, d = d + Math.imul(ze, qe) | 0, d = d + Math.imul(He, Je) | 0, m = m + Math.imul(He, qe) | 0, g = g + Math.imul(Ge, je) | 0, d = d + Math.imul(Ge, $e) | 0, d = d + Math.imul(Ve, je) | 0, m = m + Math.imul(Ve, $e) | 0, g = g + Math.imul(Pe, Ke) | 0, d = d + Math.imul(Pe, et) | 0, d = d + Math.imul(Ue, Ke) | 0, m = m + Math.imul(Ue, et) | 0, g = g + Math.imul(Qe, tt) | 0, d = d + Math.imul(Qe, nt) | 0, d = d + Math.imul(Te, tt) | 0, m = m + Math.imul(Te, nt) | 0, g = g + Math.imul(ve, rt) | 0, d = d + Math.imul(ve, st) | 0, d = d + Math.imul(ye, rt) | 0, m = m + Math.imul(ye, st) | 0, g = g + Math.imul(Ae, it) | 0, d = d + Math.imul(Ae, ot) | 0, d = d + Math.imul(he, it) | 0, m = m + Math.imul(he, ot) | 0, g = g + Math.imul(fe, at) | 0, d = d + Math.imul(fe, ct) | 0, d = d + Math.imul(oe, at) | 0, m = m + Math.imul(oe, ct) | 0, g = g + Math.imul(re, ut) | 0, d = d + Math.imul(re, dt) | 0, d = d + Math.imul(se, ut) | 0, m = m + Math.imul(se, dt) | 0, g = g + Math.imul(J, At) | 0, d = d + Math.imul(J, lt) | 0, d = d + Math.imul(K, At) | 0, m = m + Math.imul(K, lt) | 0;
      var qs = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (qs >>> 26) | 0, qs &= 67108863, g = Math.imul(Ye, Je), d = Math.imul(Ye, qe), d = d + Math.imul(Xe, Je) | 0, m = Math.imul(Xe, qe), g = g + Math.imul(ze, je) | 0, d = d + Math.imul(ze, $e) | 0, d = d + Math.imul(He, je) | 0, m = m + Math.imul(He, $e) | 0, g = g + Math.imul(Ge, Ke) | 0, d = d + Math.imul(Ge, et) | 0, d = d + Math.imul(Ve, Ke) | 0, m = m + Math.imul(Ve, et) | 0, g = g + Math.imul(Pe, tt) | 0, d = d + Math.imul(Pe, nt) | 0, d = d + Math.imul(Ue, tt) | 0, m = m + Math.imul(Ue, nt) | 0, g = g + Math.imul(Qe, rt) | 0, d = d + Math.imul(Qe, st) | 0, d = d + Math.imul(Te, rt) | 0, m = m + Math.imul(Te, st) | 0, g = g + Math.imul(ve, it) | 0, d = d + Math.imul(ve, ot) | 0, d = d + Math.imul(ye, it) | 0, m = m + Math.imul(ye, ot) | 0, g = g + Math.imul(Ae, at) | 0, d = d + Math.imul(Ae, ct) | 0, d = d + Math.imul(he, at) | 0, m = m + Math.imul(he, ct) | 0, g = g + Math.imul(fe, ut) | 0, d = d + Math.imul(fe, dt) | 0, d = d + Math.imul(oe, ut) | 0, m = m + Math.imul(oe, dt) | 0, g = g + Math.imul(re, At) | 0, d = d + Math.imul(re, lt) | 0, d = d + Math.imul(se, At) | 0, m = m + Math.imul(se, lt) | 0;
      var js = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (js >>> 26) | 0, js &= 67108863, g = Math.imul(Ye, je), d = Math.imul(Ye, $e), d = d + Math.imul(Xe, je) | 0, m = Math.imul(Xe, $e), g = g + Math.imul(ze, Ke) | 0, d = d + Math.imul(ze, et) | 0, d = d + Math.imul(He, Ke) | 0, m = m + Math.imul(He, et) | 0, g = g + Math.imul(Ge, tt) | 0, d = d + Math.imul(Ge, nt) | 0, d = d + Math.imul(Ve, tt) | 0, m = m + Math.imul(Ve, nt) | 0, g = g + Math.imul(Pe, rt) | 0, d = d + Math.imul(Pe, st) | 0, d = d + Math.imul(Ue, rt) | 0, m = m + Math.imul(Ue, st) | 0, g = g + Math.imul(Qe, it) | 0, d = d + Math.imul(Qe, ot) | 0, d = d + Math.imul(Te, it) | 0, m = m + Math.imul(Te, ot) | 0, g = g + Math.imul(ve, at) | 0, d = d + Math.imul(ve, ct) | 0, d = d + Math.imul(ye, at) | 0, m = m + Math.imul(ye, ct) | 0, g = g + Math.imul(Ae, ut) | 0, d = d + Math.imul(Ae, dt) | 0, d = d + Math.imul(he, ut) | 0, m = m + Math.imul(he, dt) | 0, g = g + Math.imul(fe, At) | 0, d = d + Math.imul(fe, lt) | 0, d = d + Math.imul(oe, At) | 0, m = m + Math.imul(oe, lt) | 0;
      var $s = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + ($s >>> 26) | 0, $s &= 67108863, g = Math.imul(Ye, Ke), d = Math.imul(Ye, et), d = d + Math.imul(Xe, Ke) | 0, m = Math.imul(Xe, et), g = g + Math.imul(ze, tt) | 0, d = d + Math.imul(ze, nt) | 0, d = d + Math.imul(He, tt) | 0, m = m + Math.imul(He, nt) | 0, g = g + Math.imul(Ge, rt) | 0, d = d + Math.imul(Ge, st) | 0, d = d + Math.imul(Ve, rt) | 0, m = m + Math.imul(Ve, st) | 0, g = g + Math.imul(Pe, it) | 0, d = d + Math.imul(Pe, ot) | 0, d = d + Math.imul(Ue, it) | 0, m = m + Math.imul(Ue, ot) | 0, g = g + Math.imul(Qe, at) | 0, d = d + Math.imul(Qe, ct) | 0, d = d + Math.imul(Te, at) | 0, m = m + Math.imul(Te, ct) | 0, g = g + Math.imul(ve, ut) | 0, d = d + Math.imul(ve, dt) | 0, d = d + Math.imul(ye, ut) | 0, m = m + Math.imul(ye, dt) | 0, g = g + Math.imul(Ae, At) | 0, d = d + Math.imul(Ae, lt) | 0, d = d + Math.imul(he, At) | 0, m = m + Math.imul(he, lt) | 0;
      var Ks = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (Ks >>> 26) | 0, Ks &= 67108863, g = Math.imul(Ye, tt), d = Math.imul(Ye, nt), d = d + Math.imul(Xe, tt) | 0, m = Math.imul(Xe, nt), g = g + Math.imul(ze, rt) | 0, d = d + Math.imul(ze, st) | 0, d = d + Math.imul(He, rt) | 0, m = m + Math.imul(He, st) | 0, g = g + Math.imul(Ge, it) | 0, d = d + Math.imul(Ge, ot) | 0, d = d + Math.imul(Ve, it) | 0, m = m + Math.imul(Ve, ot) | 0, g = g + Math.imul(Pe, at) | 0, d = d + Math.imul(Pe, ct) | 0, d = d + Math.imul(Ue, at) | 0, m = m + Math.imul(Ue, ct) | 0, g = g + Math.imul(Qe, ut) | 0, d = d + Math.imul(Qe, dt) | 0, d = d + Math.imul(Te, ut) | 0, m = m + Math.imul(Te, dt) | 0, g = g + Math.imul(ve, At) | 0, d = d + Math.imul(ve, lt) | 0, d = d + Math.imul(ye, At) | 0, m = m + Math.imul(ye, lt) | 0;
      var ei = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (ei >>> 26) | 0, ei &= 67108863, g = Math.imul(Ye, rt), d = Math.imul(Ye, st), d = d + Math.imul(Xe, rt) | 0, m = Math.imul(Xe, st), g = g + Math.imul(ze, it) | 0, d = d + Math.imul(ze, ot) | 0, d = d + Math.imul(He, it) | 0, m = m + Math.imul(He, ot) | 0, g = g + Math.imul(Ge, at) | 0, d = d + Math.imul(Ge, ct) | 0, d = d + Math.imul(Ve, at) | 0, m = m + Math.imul(Ve, ct) | 0, g = g + Math.imul(Pe, ut) | 0, d = d + Math.imul(Pe, dt) | 0, d = d + Math.imul(Ue, ut) | 0, m = m + Math.imul(Ue, dt) | 0, g = g + Math.imul(Qe, At) | 0, d = d + Math.imul(Qe, lt) | 0, d = d + Math.imul(Te, At) | 0, m = m + Math.imul(Te, lt) | 0;
      var ti = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (ti >>> 26) | 0, ti &= 67108863, g = Math.imul(Ye, it), d = Math.imul(Ye, ot), d = d + Math.imul(Xe, it) | 0, m = Math.imul(Xe, ot), g = g + Math.imul(ze, at) | 0, d = d + Math.imul(ze, ct) | 0, d = d + Math.imul(He, at) | 0, m = m + Math.imul(He, ct) | 0, g = g + Math.imul(Ge, ut) | 0, d = d + Math.imul(Ge, dt) | 0, d = d + Math.imul(Ve, ut) | 0, m = m + Math.imul(Ve, dt) | 0, g = g + Math.imul(Pe, At) | 0, d = d + Math.imul(Pe, lt) | 0, d = d + Math.imul(Ue, At) | 0, m = m + Math.imul(Ue, lt) | 0;
      var ni = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (ni >>> 26) | 0, ni &= 67108863, g = Math.imul(Ye, at), d = Math.imul(Ye, ct), d = d + Math.imul(Xe, at) | 0, m = Math.imul(Xe, ct), g = g + Math.imul(ze, ut) | 0, d = d + Math.imul(ze, dt) | 0, d = d + Math.imul(He, ut) | 0, m = m + Math.imul(He, dt) | 0, g = g + Math.imul(Ge, At) | 0, d = d + Math.imul(Ge, lt) | 0, d = d + Math.imul(Ve, At) | 0, m = m + Math.imul(Ve, lt) | 0;
      var ri = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (ri >>> 26) | 0, ri &= 67108863, g = Math.imul(Ye, ut), d = Math.imul(Ye, dt), d = d + Math.imul(Xe, ut) | 0, m = Math.imul(Xe, dt), g = g + Math.imul(ze, At) | 0, d = d + Math.imul(ze, lt) | 0, d = d + Math.imul(He, At) | 0, m = m + Math.imul(He, lt) | 0;
      var si = (I + g | 0) + ((d & 8191) << 13) | 0;
      I = (m + (d >>> 13) | 0) + (si >>> 26) | 0, si &= 67108863, g = Math.imul(Ye, At), d = Math.imul(Ye, lt), d = d + Math.imul(Xe, At) | 0, m = Math.imul(Xe, lt);
      var ii = (I + g | 0) + ((d & 8191) << 13) | 0;
      return I = (m + (d >>> 13) | 0) + (ii >>> 26) | 0, ii &= 67108863, y[0] = Gs, y[1] = Vs, y[2] = zs, y[3] = Hs, y[4] = Ys, y[5] = Xs, y[6] = Ws, y[7] = Zs, y[8] = Js, y[9] = qs, y[10] = js, y[11] = $s, y[12] = Ks, y[13] = ei, y[14] = ti, y[15] = ni, y[16] = ri, y[17] = si, y[18] = ii, I !== 0 && (y[19] = I, l.length++), l;
    };
    Math.imul || (G = M);
    function O(E, a, u) {
      u.negative = a.negative ^ E.negative, u.length = E.length + a.length;
      for (var l = 0, p = 0, f = 0; f < u.length - 1; f++) {
        var y = p;
        p = 0;
        for (var I = l & 67108863, g = Math.min(f, a.length - 1), d = Math.max(0, f - E.length + 1); d <= g; d++) {
          var m = f - d, X = E.words[m] | 0, J = a.words[d] | 0, K = X * J, j = K & 67108863;
          y = y + (K / 67108864 | 0) | 0, j = j + I | 0, I = j & 67108863, y = y + (j >>> 26) | 0, p += y >>> 26, y &= 67108863;
        }
        u.words[f] = I, l = y, y = p;
      }
      return l !== 0 ? u.words[f] = l : u.length--, u._strip();
    }
    function Z(E, a, u) {
      return O(E, a, u);
    }
    i.prototype.mulTo = function(a, u) {
      var l, p = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = G(this, a, u) : p < 63 ? l = M(this, a, u) : p < 1024 ? l = O(this, a, u) : l = Z(this, a, u), l;
    }, i.prototype.mul = function(a) {
      var u = new i(null);
      return u.words = new Array(this.length + a.length), this.mulTo(a, u);
    }, i.prototype.mulf = function(a) {
      var u = new i(null);
      return u.words = new Array(this.length + a.length), Z(this, a, u);
    }, i.prototype.imul = function(a) {
      return this.clone().mulTo(a, this);
    }, i.prototype.imuln = function(a) {
      var u = a < 0;
      u && (a = -a), r(typeof a == "number"), r(a < 67108864);
      for (var l = 0, p = 0; p < this.length; p++) {
        var f = (this.words[p] | 0) * a, y = (f & 67108863) + (l & 67108863);
        l >>= 26, l += f / 67108864 | 0, l += y >>> 26, this.words[p] = y & 67108863;
      }
      return l !== 0 && (this.words[p] = l, this.length++), u ? this.ineg() : this;
    }, i.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(a) {
      var u = F(a);
      if (u.length === 0)
        return new i(1);
      for (var l = this, p = 0; p < u.length && u[p] === 0; p++, l = l.sqr())
        ;
      if (++p < u.length)
        for (var f = l.sqr(); p < u.length; p++, f = f.sqr())
          u[p] !== 0 && (l = l.mul(f));
      return l;
    }, i.prototype.iushln = function(a) {
      r(typeof a == "number" && a >= 0);
      var u = a % 26, l = (a - u) / 26, p = 67108863 >>> 26 - u << 26 - u, f;
      if (u !== 0) {
        var y = 0;
        for (f = 0; f < this.length; f++) {
          var I = this.words[f] & p, g = (this.words[f] | 0) - I << u;
          this.words[f] = g | y, y = I >>> 26 - u;
        }
        y && (this.words[f] = y, this.length++);
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
    }, i.prototype.iushrn = function(a, u, l) {
      r(typeof a == "number" && a >= 0);
      var p;
      u ? p = (u - u % 26) / 26 : p = 0;
      var f = a % 26, y = Math.min((a - f) / 26, this.length), I = 67108863 ^ 67108863 >>> f << f, g = l;
      if (p -= y, p = Math.max(0, p), g) {
        for (var d = 0; d < y; d++)
          g.words[d] = this.words[d];
        g.length = y;
      }
      if (y !== 0)
        if (this.length > y)
          for (this.length -= y, d = 0; d < this.length; d++)
            this.words[d] = this.words[d + y];
        else
          this.words[0] = 0, this.length = 1;
      var m = 0;
      for (d = this.length - 1; d >= 0 && (m !== 0 || d >= p); d--) {
        var X = this.words[d] | 0;
        this.words[d] = m << 26 - f | X >>> f, m = X & I;
      }
      return g && m !== 0 && (g.words[g.length++] = m), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(a, u, l) {
      return r(this.negative === 0), this.iushrn(a, u, l);
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
      var u = a % 26, l = (a - u) / 26, p = 1 << u;
      if (this.length <= l)
        return !1;
      var f = this.words[l];
      return !!(f & p);
    }, i.prototype.imaskn = function(a) {
      r(typeof a == "number" && a >= 0);
      var u = a % 26, l = (a - u) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= l)
        return this;
      if (u !== 0 && l++, this.length = Math.min(l, this.length), u !== 0) {
        var p = 67108863 ^ 67108863 >>> u << u;
        this.words[this.length - 1] &= p;
      }
      return this._strip();
    }, i.prototype.maskn = function(a) {
      return this.clone().imaskn(a);
    }, i.prototype.iaddn = function(a) {
      return r(typeof a == "number"), r(a < 67108864), a < 0 ? this.isubn(-a) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= a ? (this.words[0] = a - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(a), this.negative = 1, this) : this._iaddn(a);
    }, i.prototype._iaddn = function(a) {
      this.words[0] += a;
      for (var u = 0; u < this.length && this.words[u] >= 67108864; u++)
        this.words[u] -= 67108864, u === this.length - 1 ? this.words[u + 1] = 1 : this.words[u + 1]++;
      return this.length = Math.max(this.length, u + 1), this;
    }, i.prototype.isubn = function(a) {
      if (r(typeof a == "number"), r(a < 67108864), a < 0)
        return this.iaddn(-a);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(a), this.negative = 1, this;
      if (this.words[0] -= a, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var u = 0; u < this.length && this.words[u] < 0; u++)
          this.words[u] += 67108864, this.words[u + 1] -= 1;
      return this._strip();
    }, i.prototype.addn = function(a) {
      return this.clone().iaddn(a);
    }, i.prototype.subn = function(a) {
      return this.clone().isubn(a);
    }, i.prototype.iabs = function() {
      return this.negative = 0, this;
    }, i.prototype.abs = function() {
      return this.clone().iabs();
    }, i.prototype._ishlnsubmul = function(a, u, l) {
      var p = a.length + l, f;
      this._expand(p);
      var y, I = 0;
      for (f = 0; f < a.length; f++) {
        y = (this.words[f + l] | 0) + I;
        var g = (a.words[f] | 0) * u;
        y -= g & 67108863, I = (y >> 26) - (g / 67108864 | 0), this.words[f + l] = y & 67108863;
      }
      for (; f < this.length - l; f++)
        y = (this.words[f + l] | 0) + I, I = y >> 26, this.words[f + l] = y & 67108863;
      if (I === 0)
        return this._strip();
      for (r(I === -1), I = 0, f = 0; f < this.length; f++)
        y = -(this.words[f] | 0) + I, I = y >> 26, this.words[f] = y & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, u) {
      var l = this.length - a.length, p = this.clone(), f = a, y = f.words[f.length - 1] | 0, I = this._countBits(y);
      l = 26 - I, l !== 0 && (f = f.ushln(l), p.iushln(l), y = f.words[f.length - 1] | 0);
      var g = p.length - f.length, d;
      if (u !== "mod") {
        d = new i(null), d.length = g + 1, d.words = new Array(d.length);
        for (var m = 0; m < d.length; m++)
          d.words[m] = 0;
      }
      var X = p.clone()._ishlnsubmul(f, 1, g);
      X.negative === 0 && (p = X, d && (d.words[g] = 1));
      for (var J = g - 1; J >= 0; J--) {
        var K = (p.words[f.length + J] | 0) * 67108864 + (p.words[f.length + J - 1] | 0);
        for (K = Math.min(K / y | 0, 67108863), p._ishlnsubmul(f, K, J); p.negative !== 0; )
          K--, p.negative = 0, p._ishlnsubmul(f, 1, J), p.isZero() || (p.negative ^= 1);
        d && (d.words[J] = K);
      }
      return d && d._strip(), p._strip(), u !== "div" && l !== 0 && p.iushrn(l), {
        div: d || null,
        mod: p
      };
    }, i.prototype.divmod = function(a, u, l) {
      if (r(!a.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var p, f, y;
      return this.negative !== 0 && a.negative === 0 ? (y = this.neg().divmod(a, u), u !== "mod" && (p = y.div.neg()), u !== "div" && (f = y.mod.neg(), l && f.negative !== 0 && f.iadd(a)), {
        div: p,
        mod: f
      }) : this.negative === 0 && a.negative !== 0 ? (y = this.divmod(a.neg(), u), u !== "mod" && (p = y.div.neg()), {
        div: p,
        mod: y.mod
      }) : this.negative & a.negative ? (y = this.neg().divmod(a.neg(), u), u !== "div" && (f = y.mod.neg(), l && f.negative !== 0 && f.isub(a)), {
        div: y.div,
        mod: f
      }) : a.length > this.length || this.cmp(a) < 0 ? {
        div: new i(0),
        mod: this
      } : a.length === 1 ? u === "div" ? {
        div: this.divn(a.words[0]),
        mod: null
      } : u === "mod" ? {
        div: null,
        mod: new i(this.modrn(a.words[0]))
      } : {
        div: this.divn(a.words[0]),
        mod: new i(this.modrn(a.words[0]))
      } : this._wordDiv(a, u);
    }, i.prototype.div = function(a) {
      return this.divmod(a, "div", !1).div;
    }, i.prototype.mod = function(a) {
      return this.divmod(a, "mod", !1).mod;
    }, i.prototype.umod = function(a) {
      return this.divmod(a, "mod", !0).mod;
    }, i.prototype.divRound = function(a) {
      var u = this.divmod(a);
      if (u.mod.isZero())
        return u.div;
      var l = u.div.negative !== 0 ? u.mod.isub(a) : u.mod, p = a.ushrn(1), f = a.andln(1), y = l.cmp(p);
      return y < 0 || f === 1 && y === 0 ? u.div : u.div.negative !== 0 ? u.div.isubn(1) : u.div.iaddn(1);
    }, i.prototype.modrn = function(a) {
      var u = a < 0;
      u && (a = -a), r(a <= 67108863);
      for (var l = (1 << 26) % a, p = 0, f = this.length - 1; f >= 0; f--)
        p = (l * p + (this.words[f] | 0)) % a;
      return u ? -p : p;
    }, i.prototype.modn = function(a) {
      return this.modrn(a);
    }, i.prototype.idivn = function(a) {
      var u = a < 0;
      u && (a = -a), r(a <= 67108863);
      for (var l = 0, p = this.length - 1; p >= 0; p--) {
        var f = (this.words[p] | 0) + l * 67108864;
        this.words[p] = f / a | 0, l = f % a;
      }
      return this._strip(), u ? this.ineg() : this;
    }, i.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, i.prototype.egcd = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var u = this, l = a.clone();
      u.negative !== 0 ? u = u.umod(a) : u = u.clone();
      for (var p = new i(1), f = new i(0), y = new i(0), I = new i(1), g = 0; u.isEven() && l.isEven(); )
        u.iushrn(1), l.iushrn(1), ++g;
      for (var d = l.clone(), m = u.clone(); !u.isZero(); ) {
        for (var X = 0, J = 1; !(u.words[0] & J) && X < 26; ++X, J <<= 1)
          ;
        if (X > 0)
          for (u.iushrn(X); X-- > 0; )
            (p.isOdd() || f.isOdd()) && (p.iadd(d), f.isub(m)), p.iushrn(1), f.iushrn(1);
        for (var K = 0, j = 1; !(l.words[0] & j) && K < 26; ++K, j <<= 1)
          ;
        if (K > 0)
          for (l.iushrn(K); K-- > 0; )
            (y.isOdd() || I.isOdd()) && (y.iadd(d), I.isub(m)), y.iushrn(1), I.iushrn(1);
        u.cmp(l) >= 0 ? (u.isub(l), p.isub(y), f.isub(I)) : (l.isub(u), y.isub(p), I.isub(f));
      }
      return {
        a: y,
        b: I,
        gcd: l.iushln(g)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var u = this, l = a.clone();
      u.negative !== 0 ? u = u.umod(a) : u = u.clone();
      for (var p = new i(1), f = new i(0), y = l.clone(); u.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var I = 0, g = 1; !(u.words[0] & g) && I < 26; ++I, g <<= 1)
          ;
        if (I > 0)
          for (u.iushrn(I); I-- > 0; )
            p.isOdd() && p.iadd(y), p.iushrn(1);
        for (var d = 0, m = 1; !(l.words[0] & m) && d < 26; ++d, m <<= 1)
          ;
        if (d > 0)
          for (l.iushrn(d); d-- > 0; )
            f.isOdd() && f.iadd(y), f.iushrn(1);
        u.cmp(l) >= 0 ? (u.isub(l), p.isub(f)) : (l.isub(u), f.isub(p));
      }
      var X;
      return u.cmpn(1) === 0 ? X = p : X = f, X.cmpn(0) < 0 && X.iadd(a), X;
    }, i.prototype.gcd = function(a) {
      if (this.isZero())
        return a.abs();
      if (a.isZero())
        return this.abs();
      var u = this.clone(), l = a.clone();
      u.negative = 0, l.negative = 0;
      for (var p = 0; u.isEven() && l.isEven(); p++)
        u.iushrn(1), l.iushrn(1);
      do {
        for (; u.isEven(); )
          u.iushrn(1);
        for (; l.isEven(); )
          l.iushrn(1);
        var f = u.cmp(l);
        if (f < 0) {
          var y = u;
          u = l, l = y;
        } else if (f === 0 || l.cmpn(1) === 0)
          break;
        u.isub(l);
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
      var u = a % 26, l = (a - u) / 26, p = 1 << u;
      if (this.length <= l)
        return this._expand(l + 1), this.words[l] |= p, this;
      for (var f = p, y = l; f !== 0 && y < this.length; y++) {
        var I = this.words[y] | 0;
        I += f, f = I >>> 26, I &= 67108863, this.words[y] = I;
      }
      return f !== 0 && (this.words[y] = f, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(a) {
      var u = a < 0;
      if (this.negative !== 0 && !u)
        return -1;
      if (this.negative === 0 && u)
        return 1;
      this._strip();
      var l;
      if (this.length > 1)
        l = 1;
      else {
        u && (a = -a), r(a <= 67108863, "Number is too big");
        var p = this.words[0] | 0;
        l = p === a ? 0 : p < a ? -1 : 1;
      }
      return this.negative !== 0 ? -l | 0 : l;
    }, i.prototype.cmp = function(a) {
      if (this.negative !== 0 && a.negative === 0)
        return -1;
      if (this.negative === 0 && a.negative !== 0)
        return 1;
      var u = this.ucmp(a);
      return this.negative !== 0 ? -u | 0 : u;
    }, i.prototype.ucmp = function(a) {
      if (this.length > a.length)
        return 1;
      if (this.length < a.length)
        return -1;
      for (var u = 0, l = this.length - 1; l >= 0; l--) {
        var p = this.words[l] | 0, f = a.words[l] | 0;
        if (p !== f) {
          p < f ? u = -1 : p > f && (u = 1);
          break;
        }
      }
      return u;
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
      return new W(a);
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
    var L = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function T(E, a) {
      this.name = E, this.p = new i(a, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    T.prototype._tmp = function() {
      var a = new i(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, T.prototype.ireduce = function(a) {
      var u = a, l;
      do
        this.split(u, this.tmp), u = this.imulK(u), u = u.iadd(this.tmp), l = u.bitLength();
      while (l > this.n);
      var p = l < this.n ? -1 : u.ucmp(this.p);
      return p === 0 ? (u.words[0] = 0, u.length = 1) : p > 0 ? u.isub(this.p) : u.strip !== void 0 ? u.strip() : u._strip(), u;
    }, T.prototype.split = function(a, u) {
      a.iushrn(this.n, 0, u);
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
    s(k, T), k.prototype.split = function(a, u) {
      for (var l = 4194303, p = Math.min(a.length, 9), f = 0; f < p; f++)
        u.words[f] = a.words[f];
      if (u.length = p, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var y = a.words[9];
      for (u.words[u.length++] = y & l, f = 10; f < a.length; f++) {
        var I = a.words[f] | 0;
        a.words[f - 10] = (I & l) << 4 | y >>> 22, y = I;
      }
      y >>>= 22, a.words[f - 10] = y, y === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, k.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var u = 0, l = 0; l < a.length; l++) {
        var p = a.words[l] | 0;
        u += p * 977, a.words[l] = u & 67108863, u = p * 64 + (u / 67108864 | 0);
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
      for (var u = 0, l = 0; l < a.length; l++) {
        var p = (a.words[l] | 0) * 19 + u, f = p & 67108863;
        p >>>= 26, a.words[l] = f, u = p;
      }
      return u !== 0 && (a.words[a.length++] = u), a;
    }, i._prime = function(a) {
      if (L[a])
        return L[a];
      var u;
      if (a === "k256")
        u = new k();
      else if (a === "p224")
        u = new U();
      else if (a === "p192")
        u = new q();
      else if (a === "p25519")
        u = new Y();
      else
        throw new Error("Unknown prime " + a);
      return L[a] = u, u;
    };
    function W(E) {
      if (typeof E == "string") {
        var a = i._prime(E);
        this.m = a.p, this.prime = a;
      } else
        r(E.gtn(1), "modulus must be greater than 1"), this.m = E, this.prime = null;
    }
    W.prototype._verify1 = function(a) {
      r(a.negative === 0, "red works only with positives"), r(a.red, "red works only with red numbers");
    }, W.prototype._verify2 = function(a, u) {
      r((a.negative | u.negative) === 0, "red works only with positives"), r(
        a.red && a.red === u.red,
        "red works only with red numbers"
      );
    }, W.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (b(a, a.umod(this.m)._forceRed(this)), a);
    }, W.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, W.prototype.add = function(a, u) {
      this._verify2(a, u);
      var l = a.add(u);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, W.prototype.iadd = function(a, u) {
      this._verify2(a, u);
      var l = a.iadd(u);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, W.prototype.sub = function(a, u) {
      this._verify2(a, u);
      var l = a.sub(u);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, W.prototype.isub = function(a, u) {
      this._verify2(a, u);
      var l = a.isub(u);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, W.prototype.shl = function(a, u) {
      return this._verify1(a), this.imod(a.ushln(u));
    }, W.prototype.imul = function(a, u) {
      return this._verify2(a, u), this.imod(a.imul(u));
    }, W.prototype.mul = function(a, u) {
      return this._verify2(a, u), this.imod(a.mul(u));
    }, W.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, W.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, W.prototype.sqrt = function(a) {
      if (a.isZero())
        return a.clone();
      var u = this.m.andln(3);
      if (r(u % 2 === 1), u === 3) {
        var l = this.m.add(new i(1)).iushrn(2);
        return this.pow(a, l);
      }
      for (var p = this.m.subn(1), f = 0; !p.isZero() && p.andln(1) === 0; )
        f++, p.iushrn(1);
      r(!p.isZero());
      var y = new i(1).toRed(this), I = y.redNeg(), g = this.m.subn(1).iushrn(1), d = this.m.bitLength();
      for (d = new i(2 * d * d).toRed(this); this.pow(d, g).cmp(I) !== 0; )
        d.redIAdd(I);
      for (var m = this.pow(d, p), X = this.pow(a, p.addn(1).iushrn(1)), J = this.pow(a, p), K = f; J.cmp(y) !== 0; ) {
        for (var j = J, re = 0; j.cmp(y) !== 0; re++)
          j = j.redSqr();
        r(re < K);
        var se = this.pow(m, new i(1).iushln(K - re - 1));
        X = X.redMul(se), m = se.redSqr(), J = J.redMul(m), K = re;
      }
      return X;
    }, W.prototype.invm = function(a) {
      var u = a._invmp(this.m);
      return u.negative !== 0 ? (u.negative = 0, this.imod(u).redNeg()) : this.imod(u);
    }, W.prototype.pow = function(a, u) {
      if (u.isZero())
        return new i(1).toRed(this);
      if (u.cmpn(1) === 0)
        return a.clone();
      var l = 4, p = new Array(1 << l);
      p[0] = new i(1).toRed(this), p[1] = a;
      for (var f = 2; f < p.length; f++)
        p[f] = this.mul(p[f - 1], a);
      var y = p[0], I = 0, g = 0, d = u.bitLength() % 26;
      for (d === 0 && (d = 26), f = u.length - 1; f >= 0; f--) {
        for (var m = u.words[f], X = d - 1; X >= 0; X--) {
          var J = m >> X & 1;
          if (y !== p[0] && (y = this.sqr(y)), J === 0 && I === 0) {
            g = 0;
            continue;
          }
          I <<= 1, I |= J, g++, !(g !== l && (f !== 0 || X !== 0)) && (y = this.mul(y, p[I]), g = 0, I = 0);
        }
        d = 26;
      }
      return y;
    }, W.prototype.convertTo = function(a) {
      var u = a.umod(this.m);
      return u === a ? u.clone() : u;
    }, W.prototype.convertFrom = function(a) {
      var u = a.clone();
      return u.red = null, u;
    }, i.mont = function(a) {
      return new ee(a);
    };
    function ee(E) {
      W.call(this, E), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(ee, W), ee.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, ee.prototype.convertFrom = function(a) {
      var u = this.imod(a.mul(this.rinv));
      return u.red = null, u;
    }, ee.prototype.imul = function(a, u) {
      if (a.isZero() || u.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var l = a.imul(u), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), y = f;
      return f.cmp(this.m) >= 0 ? y = f.isub(this.m) : f.cmpn(0) < 0 && (y = f.iadd(this.m)), y._forceRed(this);
    }, ee.prototype.mul = function(a, u) {
      if (a.isZero() || u.isZero())
        return new i(0)._forceRed(this);
      var l = a.mul(u), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), y = f;
      return f.cmp(this.m) >= 0 ? y = f.isub(this.m) : f.cmpn(0) < 0 && (y = f.iadd(this.m)), y._forceRed(this);
    }, ee.prototype.invm = function(a) {
      var u = this.imod(a._invmp(this.m).mul(this.r2));
      return u._forceRed(this);
    };
  })(e, be);
})(qi);
var xd = qi.exports;
const Gr = /* @__PURE__ */ bd(xd);
var Sc = 9, Qc = 3, bi = 9;
function _d(e, t) {
  const { precision: n = Sc, minPrecision: r = Qc } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let A = i.slice(0, n);
  if (r < n) {
    const b = A.match(/.*[1-9]{1}/), w = (b == null ? void 0 : b[0].length) || 0, x = Math.max(r, w);
    A = A.slice(0, x);
  }
  const h = A ? `.${A}` : "";
  return `${c}${h}`;
}
var Me = class extends Gr {
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
      throw new v(N.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new v(
        N.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new v(N.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: n = bi,
      precision: r = Sc,
      minPrecision: s = Qc
    } = t || {}, i = this.formatUnits(n), o = _d(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), A = c.match(/[1-9]/);
      if (A && A.index && A.index + 1 > r) {
        const [h = "0"] = o.split(".");
        return `${h}.${c.slice(0, A.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = bi) {
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
    const r = new Gr(this.toArray()).mulTo(t, n);
    return new Me(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new Gr(this.toArray()).egcd(t);
    return {
      a: new Me(n.toArray()),
      b: new Me(r.toArray()),
      gcd: new Me(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new Gr(this.toArray()).divmod(new Me(t), n, r);
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
B.parseUnits = (e, t = bi) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new v(
      N.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const c = `${r.replaceAll(",", "")}${o.join("")}`;
  return B(c);
};
function cn(e) {
  return B(e).toNumber();
}
function ji(e, t) {
  return B(e).toHex(t);
}
function Zt(e, t) {
  return B(e).toBytes(t);
}
function fy(e, t) {
  return B(e).formatUnits(t);
}
function hy(e, t) {
  return B(e).format(t);
}
function gy(...e) {
  return e.reduce((t, n) => B(n).gt(t) ? B(n) : t, B(0));
}
function py(...e) {
  return B(Math.ceil(e.reduce((t, n) => B(t).mul(n), B(1)).toNumber()));
}
var vd = Object.defineProperty, Rd = (e, t, n) => t in e ? vd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Sd = (e, t, n) => (Rd(e, typeof t != "symbol" ? t + "" : t, n), n), my = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, Nc = (e, t) => {
  const n = [];
  for (let c = 0; c < e.length; c += t) {
    const A = new Uint8Array(t);
    A.set(e.slice(c, c + t)), n.push(A);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, H = (e, t, n = !0) => {
  if (e instanceof Uint8Array)
    return n ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const i = new Uint8Array((e.length - 2) / 2);
    let o = 2;
    for (let c = 0; c < i.length; c++)
      i[c] = parseInt(e.substring(o, o + 2), 16), o += 2;
    return i;
  }
  const s = `invalid data:${t ? ` ${t} -` : ""} ${e}
If you are attempting to transform a hex value, please make sure it is being passed as a string and wrapped in quotes.`;
  throw new v(N.INVALID_DATA, s);
}, vs = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, ie = (e) => {
  const t = e.map((n) => H(n));
  return vs(t);
}, na = "0123456789abcdef";
function z(e) {
  const t = H(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += na[(s & 240) >> 4] + na[s & 15];
  }
  return n;
}
var wy = (e) => {
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
    throw new v(N.PARSE_FAILED, r);
  }
  return n;
}, Qd = 37, Dc = BigInt(2 ** 62) + BigInt(Qd), Nd = (e) => Math.floor(e / 1e3), Tc = (e) => e * 1e3, Dd = (e) => Number(BigInt(e) - Dc), Td = (e) => String(BigInt(e) + Dc), Fd = (e) => Tc(Dd(e)), $r = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new $r(Fd(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new $r(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new $r(Tc(e));
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
    return Td(this.toUnixSeconds());
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
    return Nd(this.getTime());
  }
}, $i = $r;
Sd($i, "TAI64_NULL", "");
function Md(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var Ld = {
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
          alocDependentCost: {
            LightOperation: {
              base: "2",
              unitsPerGas: "214"
            }
          },
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
}, Od = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, kd = {
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
    },
    {
      sender: "0xbb18456fef301df282ee9311b25f31315a563eb901255207f43c5d39b85f4047",
      recipient: "0x88a3467430f8971c6acda91a0f48a82d6a57ef288e4972db0e455fb3100e7cc8",
      nonce: "0x3217a0408218725bf3ac744c99cb73b3b3b386c7d3b723b744f30fd83e28bebd",
      amount: 18446744073709552e3,
      data: "",
      da_height: 0
    },
    {
      sender: "0xd761d0612bc8125f59cd84d5e1db66342932f2f3cb684a3a1a3501b49fdc0656",
      recipient: "0x88a3467430f8971c6acda91a0f48a82d6a57ef288e4972db0e455fb3100e7cc8",
      nonce: "0x235beb4d685377b67dc915de8a1bab443aab48a47819b203dd709ce34fb62106",
      amount: 18446744073709552e3,
      data: "",
      da_height: 0
    },
    {
      sender: "0xf99941a4ef44577a87027af7a3d655c6e182cd6d4580347dc4cc4a1a4f5bd07d",
      recipient: "0x88a3467430f8971c6acda91a0f48a82d6a57ef288e4972db0e455fb3100e7cc8",
      nonce: "0x03d7ad03b6a14262fc7efc59a9b95afb43af702f4becdaba866364b438b0ebd3",
      amount: 18446744073709552e3,
      data: "",
      da_height: 0
    }
  ],
  contracts: [],
  block_height: 0,
  da_block_height: 0
}, yy = {
  chainConfig: Ld,
  metadata: Od,
  stateConfig: kd
}, Iy = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function Nn(e) {
  return e !== void 0;
}
var Fc = B(0), Ei = B(58), As = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", Vr = null;
function Pd(e) {
  if (Vr == null) {
    Vr = {};
    for (let n = 0; n < As.length; n++)
      Vr[As[n]] = B(n);
  }
  const t = Vr[e];
  if (t == null)
    throw new v(N.INVALID_DATA, `invalid base58 value ${e}`);
  return B(t);
}
function Mc(e) {
  const t = H(e);
  let n = B(t), r = "";
  for (; n.gt(Fc); )
    r = As[Number(n.mod(Ei))] + r, n = n.div(Ei);
  for (let s = 0; s < t.length && !t[s]; s++)
    r = As[0] + r;
  return r;
}
function Ud(e) {
  let t = Fc;
  for (let n = 0; n < e.length; n++)
    t = t.mul(Ei), t = t.add(Pd(e[n].toString()));
  return t;
}
function Ki(e, t, n) {
  const r = H(e);
  if (n != null && n > r.length)
    throw new v(N.INVALID_DATA, "cannot slice beyond data bounds");
  return z(r.slice(t ?? 0, n ?? r.length));
}
function Yn(e, t = !0) {
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
        throw new v(
          N.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const c = 65536 + ((i & 1023) << 10) + (o & 1023);
      r.push(c >> 18 | 240), r.push(c >> 12 & 63 | 128), r.push(c >> 6 & 63 | 128), r.push(c & 63 | 128);
    } else
      r.push(i >> 12 | 224), r.push(i >> 6 & 63 | 128), r.push(i & 63 | 128);
  }
  return new Uint8Array(r);
}
function bn(e, t, n, r, s) {
  return console.log(`invalid codepoint at offset ${t}; ${e}, bytes: ${n}`), t;
}
function Gd(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function Vd(e) {
  const t = H(e, "bytes"), n = [];
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
      (s & 192) === 128 ? r += bn("UNEXPECTED_CONTINUE", r - 1, t) : r += bn("BAD_PREFIX", r - 1, t);
      continue;
    }
    if (r - 1 + i >= t.length) {
      r += bn("OVERRUN", r - 1, t);
      continue;
    }
    let c = s & (1 << 8 - i - 1) - 1;
    for (let A = 0; A < i; A++) {
      const h = t[r];
      if ((h & 192) !== 128) {
        r += bn("MISSING_CONTINUE", r, t), c = null;
        break;
      }
      c = c << 6 | h & 63, r++;
    }
    if (c !== null) {
      if (c > 1114111) {
        r += bn("OUT_OF_RANGE", r - 1 - i, t);
        continue;
      }
      if (c >= 55296 && c <= 57343) {
        r += bn("UTF16_SURROGATE", r - 1 - i, t);
        continue;
      }
      if (c <= o) {
        r += bn("OVERLONG", r - 1 - i, t);
        continue;
      }
      n.push(c);
    }
  }
  return n;
}
function eo(e) {
  return Gd(Vd(e));
}
function _t(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function zd(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function to(e, ...t) {
  if (!zd(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Lc(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  _t(e.outputLen), _t(e.blockLen);
}
function Xn(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Oc(e, t) {
  to(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Kr = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function Hd(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const es = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Lt = (e, t) => e << 32 - t | e >>> t, Yd = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Yd)
  throw new Error("Non little-endian hardware is not supported");
function Xd(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Wn(e) {
  if (typeof e == "string" && (e = Xd(e)), !Hd(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
let no = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Wd = {}.toString;
function kc(e, t) {
  if (t !== void 0 && Wd.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function Rs(e) {
  const t = (r) => e().update(Wn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Zd(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), A = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + A, o, r), e.setUint32(t + h, c, r);
}
class ro extends no {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = es(this.buffer);
  }
  update(t) {
    Xn(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Wn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const A = es(t);
        for (; s <= i - o; o += s)
          this.process(A, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Xn(this), Oc(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let w = o; w < s; w++)
      n[w] = 0;
    Zd(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = es(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = A / 4, b = this.get();
    if (h > b.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let w = 0; w < h; w++)
      c.setUint32(4 * w, b[w], i);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: c } = this;
    return t.length = s, t.pos = c, t.finished = i, t.destroyed = o, s % n && t.buffer.set(r), t;
  }
}
const Jd = (e, t, n) => e & t ^ ~e & n, qd = (e, t, n) => e & t ^ e & n ^ t & n, jd = /* @__PURE__ */ new Uint32Array([
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
]), $t = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Kt = /* @__PURE__ */ new Uint32Array(64);
let $d = class extends ro {
  constructor() {
    super(64, 32, 8, !1), this.A = $t[0] | 0, this.B = $t[1] | 0, this.C = $t[2] | 0, this.D = $t[3] | 0, this.E = $t[4] | 0, this.F = $t[5] | 0, this.G = $t[6] | 0, this.H = $t[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: c, H: A } = this;
    return [t, n, r, s, i, o, c, A];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, A) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = A | 0;
  }
  process(t, n) {
    for (let w = 0; w < 16; w++, n += 4)
      Kt[w] = t.getUint32(n, !1);
    for (let w = 16; w < 64; w++) {
      const x = Kt[w - 15], _ = Kt[w - 2], R = Lt(x, 7) ^ Lt(x, 18) ^ x >>> 3, C = Lt(_, 17) ^ Lt(_, 19) ^ _ >>> 10;
      Kt[w] = C + Kt[w - 7] + R + Kt[w - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: A, G: h, H: b } = this;
    for (let w = 0; w < 64; w++) {
      const x = Lt(c, 6) ^ Lt(c, 11) ^ Lt(c, 25), _ = b + x + Jd(c, A, h) + jd[w] + Kt[w] | 0, C = (Lt(r, 2) ^ Lt(r, 13) ^ Lt(r, 22)) + qd(r, s, i) | 0;
      b = h, h = A, A = c, c = o + _ | 0, o = i, i = s, s = r, r = _ + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, A = A + this.F | 0, h = h + this.G | 0, b = b + this.H | 0, this.set(r, s, i, o, c, A, h, b);
  }
  roundClean() {
    Kt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const rr = /* @__PURE__ */ Rs(() => new $d());
let Pc = class extends no {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Lc(t);
    const r = Wn(n);
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
    return Xn(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Xn(this), to(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: c } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = c, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const so = (e, t, n) => new Pc(e, t).update(n).digest();
so.create = (e, t) => new Pc(e, t);
function Kd(e, t, n, r) {
  Lc(e);
  const s = kc({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (_t(i), _t(o), _t(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const A = Wn(t), h = Wn(n), b = new Uint8Array(o), w = so.create(e, A), x = w._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: c, DK: b, PRF: w, PRFSalt: x };
}
function eA(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function io(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: A } = Kd(e, t, n, r);
  let h;
  const b = new Uint8Array(4), w = es(b), x = new Uint8Array(c.outputLen);
  for (let _ = 1, R = 0; R < i; _++, R += c.outputLen) {
    const C = o.subarray(R, R + c.outputLen);
    w.setInt32(0, _, !1), (h = A._cloneInto(h)).update(b).digestInto(x), C.set(x.subarray(0, C.length));
    for (let F = 1; F < s; F++) {
      c._cloneInto(h).update(x).digestInto(x);
      for (let M = 0; M < C.length; M++)
        C[M] ^= x[M];
    }
  }
  return eA(c, A, o, h, x);
}
const me = (e, t) => e << t | e >>> 32 - t;
function ra(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], c = e[t++] ^ n[r++], A = e[t++] ^ n[r++], h = e[t++] ^ n[r++], b = e[t++] ^ n[r++], w = e[t++] ^ n[r++], x = e[t++] ^ n[r++], _ = e[t++] ^ n[r++], R = e[t++] ^ n[r++], C = e[t++] ^ n[r++], F = e[t++] ^ n[r++], M = e[t++] ^ n[r++], G = e[t++] ^ n[r++], O = e[t++] ^ n[r++], Z = e[t++] ^ n[r++], L = e[t++] ^ n[r++], T = o, k = c, U = A, q = h, Y = b, W = w, ee = x, E = _, a = R, u = C, l = F, p = M, f = G, y = O, I = Z, g = L;
  for (let d = 0; d < 8; d += 2)
    Y ^= me(T + f | 0, 7), a ^= me(Y + T | 0, 9), f ^= me(a + Y | 0, 13), T ^= me(f + a | 0, 18), u ^= me(W + k | 0, 7), y ^= me(u + W | 0, 9), k ^= me(y + u | 0, 13), W ^= me(k + y | 0, 18), I ^= me(l + ee | 0, 7), U ^= me(I + l | 0, 9), ee ^= me(U + I | 0, 13), l ^= me(ee + U | 0, 18), q ^= me(g + p | 0, 7), E ^= me(q + g | 0, 9), p ^= me(E + q | 0, 13), g ^= me(p + E | 0, 18), k ^= me(T + q | 0, 7), U ^= me(k + T | 0, 9), q ^= me(U + k | 0, 13), T ^= me(q + U | 0, 18), ee ^= me(W + Y | 0, 7), E ^= me(ee + W | 0, 9), Y ^= me(E + ee | 0, 13), W ^= me(Y + E | 0, 18), p ^= me(l + u | 0, 7), a ^= me(p + l | 0, 9), u ^= me(a + p | 0, 13), l ^= me(u + a | 0, 18), f ^= me(g + I | 0, 7), y ^= me(f + g | 0, 9), I ^= me(y + f | 0, 13), g ^= me(I + y | 0, 18);
  s[i++] = o + T | 0, s[i++] = c + k | 0, s[i++] = A + U | 0, s[i++] = h + q | 0, s[i++] = b + Y | 0, s[i++] = w + W | 0, s[i++] = x + ee | 0, s[i++] = _ + E | 0, s[i++] = R + a | 0, s[i++] = C + u | 0, s[i++] = F + l | 0, s[i++] = M + p | 0, s[i++] = G + f | 0, s[i++] = O + y | 0, s[i++] = Z + I | 0, s[i++] = L + g | 0;
}
function ai(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = e[t + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, t += 16)
    ra(n, o, e, t, n, i), c > 0 && (o += 16), ra(n, i, e, t += 16, n, o);
}
function tA(e, t, n) {
  const r = kc({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: A, maxmem: h, onProgress: b } = r;
  if (_t(s), _t(i), _t(o), _t(c), _t(A), _t(h), b !== void 0 && typeof b != "function")
    throw new Error("progressCb should be function");
  const w = 128 * i, x = w / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (w / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / w)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (c < 0 || c > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const _ = w * (s + o);
  if (_ > h)
    throw new Error(`Scrypt: parameters too large, ${_} (128 * r * (N + p)) > ${h} (maxmem)`);
  const R = io(rr, e, t, { c: 1, dkLen: w * o }), C = Kr(R), F = Kr(new Uint8Array(w * s)), M = Kr(new Uint8Array(w));
  let G = () => {
  };
  if (b) {
    const O = 2 * s * o, Z = Math.max(Math.floor(O / 1e4), 1);
    let L = 0;
    G = () => {
      L++, b && (!(L % Z) || L === O) && b(L / O);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: x, V: F, B32: C, B: R, tmp: M, blockMixCb: G, asyncTick: A };
}
function nA(e, t, n, r, s) {
  const i = io(rr, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function rA(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: A, B32: h, B: b, tmp: w, blockMixCb: x } = tA(e, t, n);
  for (let _ = 0; _ < i; _++) {
    const R = c * _;
    for (let C = 0; C < c; C++)
      A[C] = h[R + C];
    for (let C = 0, F = 0; C < r - 1; C++)
      ai(A, F, A, F += c, s), x();
    ai(A, (r - 1) * c, h, R, s), x();
    for (let C = 0; C < r; C++) {
      const F = h[R + c - 16] % r;
      for (let M = 0; M < c; M++)
        w[M] = h[R + M] ^ A[F * c + M];
      ai(w, 0, h, R, s), x();
    }
  }
  return nA(e, o, b, A, w);
}
const zr = /* @__PURE__ */ BigInt(2 ** 32 - 1), Ci = /* @__PURE__ */ BigInt(32);
function Uc(e, t = !1) {
  return t ? { h: Number(e & zr), l: Number(e >> Ci & zr) } : { h: Number(e >> Ci & zr) | 0, l: Number(e & zr) | 0 };
}
function Gc(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = Uc(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const sA = (e, t) => BigInt(e >>> 0) << Ci | BigInt(t >>> 0), iA = (e, t, n) => e >>> n, oA = (e, t, n) => e << 32 - n | t >>> n, aA = (e, t, n) => e >>> n | t << 32 - n, cA = (e, t, n) => e << 32 - n | t >>> n, uA = (e, t, n) => e << 64 - n | t >>> n - 32, dA = (e, t, n) => e >>> n - 32 | t << 64 - n, AA = (e, t) => t, lA = (e, t) => e, Vc = (e, t, n) => e << n | t >>> 32 - n, zc = (e, t, n) => t << n | e >>> 32 - n, Hc = (e, t, n) => t << n - 32 | e >>> 64 - n, Yc = (e, t, n) => e << n - 32 | t >>> 64 - n;
function fA(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const hA = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), gA = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, pA = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), mA = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, wA = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), yA = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, le = {
  fromBig: Uc,
  split: Gc,
  toBig: sA,
  shrSH: iA,
  shrSL: oA,
  rotrSH: aA,
  rotrSL: cA,
  rotrBH: uA,
  rotrBL: dA,
  rotr32H: AA,
  rotr32L: lA,
  rotlSH: Vc,
  rotlSL: zc,
  rotlBH: Hc,
  rotlBL: Yc,
  add: fA,
  add3L: hA,
  add3H: gA,
  add4L: pA,
  add4H: mA,
  add5H: yA,
  add5L: wA
}, [Xc, Wc, Zc] = [[], [], []], IA = /* @__PURE__ */ BigInt(0), cr = /* @__PURE__ */ BigInt(1), bA = /* @__PURE__ */ BigInt(2), EA = /* @__PURE__ */ BigInt(7), CA = /* @__PURE__ */ BigInt(256), BA = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = cr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Xc.push(2 * (5 * r + n)), Wc.push((e + 1) * (e + 2) / 2 % 64);
  let s = IA;
  for (let i = 0; i < 7; i++)
    t = (t << cr ^ (t >> EA) * BA) % CA, t & bA && (s ^= cr << (cr << /* @__PURE__ */ BigInt(i)) - cr);
  Zc.push(s);
}
const [xA, _A] = /* @__PURE__ */ Gc(Zc, !0), sa = (e, t, n) => n > 32 ? Hc(e, t, n) : Vc(e, t, n), ia = (e, t, n) => n > 32 ? Yc(e, t, n) : zc(e, t, n);
function vA(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, A = (o + 2) % 10, h = n[A], b = n[A + 1], w = sa(h, b, 1) ^ n[c], x = ia(h, b, 1) ^ n[c + 1];
      for (let _ = 0; _ < 50; _ += 10)
        e[o + _] ^= w, e[o + _ + 1] ^= x;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = Wc[o], A = sa(s, i, c), h = ia(s, i, c), b = Xc[o];
      s = e[b], i = e[b + 1], e[b] = A, e[b + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= xA[r], e[1] ^= _A[r];
  }
  n.fill(0);
}
class oo extends no {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, _t(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Kr(this.state);
  }
  keccak() {
    vA(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Xn(this);
    const { blockLen: n, state: r } = this;
    t = Wn(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(n - this.pos, s - i);
      for (let c = 0; c < o; c++)
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
    Xn(this, !1), to(t), this.finish();
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
    if (Oc(t, this), this.finished)
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
    return t || (t = new oo(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const RA = (e, t, n) => Rs(() => new oo(t, e, n)), SA = /* @__PURE__ */ RA(1, 136, 256 / 8), QA = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), Jc = /* @__PURE__ */ Uint8Array.from({ length: 16 }, (e, t) => t), NA = /* @__PURE__ */ Jc.map((e) => (9 * e + 5) % 16);
let ao = [Jc], co = [NA];
for (let e = 0; e < 4; e++)
  for (let t of [ao, co])
    t.push(t[e].map((n) => QA[n]));
const qc = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), DA = /* @__PURE__ */ ao.map((e, t) => e.map((n) => qc[t][n])), TA = /* @__PURE__ */ co.map((e, t) => e.map((n) => qc[t][n])), FA = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), MA = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]), Hr = (e, t) => e << t | e >>> 32 - t;
function oa(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const Yr = /* @__PURE__ */ new Uint32Array(16);
class LA extends ro {
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
    for (let _ = 0; _ < 16; _++, n += 4)
      Yr[_] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, A = c, h = this.h3 | 0, b = h, w = this.h4 | 0, x = w;
    for (let _ = 0; _ < 5; _++) {
      const R = 4 - _, C = FA[_], F = MA[_], M = ao[_], G = co[_], O = DA[_], Z = TA[_];
      for (let L = 0; L < 16; L++) {
        const T = Hr(r + oa(_, i, c, h) + Yr[M[L]] + C, O[L]) + w | 0;
        r = w, w = h, h = Hr(c, 10) | 0, c = i, i = T;
      }
      for (let L = 0; L < 16; L++) {
        const T = Hr(s + oa(R, o, A, b) + Yr[G[L]] + F, Z[L]) + x | 0;
        s = x, x = b, b = Hr(A, 10) | 0, A = o, o = T;
      }
    }
    this.set(this.h1 + c + b | 0, this.h2 + h + x | 0, this.h3 + w + s | 0, this.h4 + r + o | 0, this.h0 + i + A | 0);
  }
  roundClean() {
    Yr.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const OA = /* @__PURE__ */ Rs(() => new LA()), [kA, PA] = le.split([
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
].map((e) => BigInt(e))), en = /* @__PURE__ */ new Uint32Array(80), tn = /* @__PURE__ */ new Uint32Array(80);
class UA extends ro {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: A, Eh: h, El: b, Fh: w, Fl: x, Gh: _, Gl: R, Hh: C, Hl: F } = this;
    return [t, n, r, s, i, o, c, A, h, b, w, x, _, R, C, F];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, A, h, b, w, x, _, R, C, F) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = A | 0, this.Eh = h | 0, this.El = b | 0, this.Fh = w | 0, this.Fl = x | 0, this.Gh = _ | 0, this.Gl = R | 0, this.Hh = C | 0, this.Hl = F | 0;
  }
  process(t, n) {
    for (let O = 0; O < 16; O++, n += 4)
      en[O] = t.getUint32(n), tn[O] = t.getUint32(n += 4);
    for (let O = 16; O < 80; O++) {
      const Z = en[O - 15] | 0, L = tn[O - 15] | 0, T = le.rotrSH(Z, L, 1) ^ le.rotrSH(Z, L, 8) ^ le.shrSH(Z, L, 7), k = le.rotrSL(Z, L, 1) ^ le.rotrSL(Z, L, 8) ^ le.shrSL(Z, L, 7), U = en[O - 2] | 0, q = tn[O - 2] | 0, Y = le.rotrSH(U, q, 19) ^ le.rotrBH(U, q, 61) ^ le.shrSH(U, q, 6), W = le.rotrSL(U, q, 19) ^ le.rotrBL(U, q, 61) ^ le.shrSL(U, q, 6), ee = le.add4L(k, W, tn[O - 7], tn[O - 16]), E = le.add4H(ee, T, Y, en[O - 7], en[O - 16]);
      en[O] = E | 0, tn[O] = ee | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: A, Dh: h, Dl: b, Eh: w, El: x, Fh: _, Fl: R, Gh: C, Gl: F, Hh: M, Hl: G } = this;
    for (let O = 0; O < 80; O++) {
      const Z = le.rotrSH(w, x, 14) ^ le.rotrSH(w, x, 18) ^ le.rotrBH(w, x, 41), L = le.rotrSL(w, x, 14) ^ le.rotrSL(w, x, 18) ^ le.rotrBL(w, x, 41), T = w & _ ^ ~w & C, k = x & R ^ ~x & F, U = le.add5L(G, L, k, PA[O], tn[O]), q = le.add5H(U, M, Z, T, kA[O], en[O]), Y = U | 0, W = le.rotrSH(r, s, 28) ^ le.rotrBH(r, s, 34) ^ le.rotrBH(r, s, 39), ee = le.rotrSL(r, s, 28) ^ le.rotrBL(r, s, 34) ^ le.rotrBL(r, s, 39), E = r & i ^ r & c ^ i & c, a = s & o ^ s & A ^ o & A;
      M = C | 0, G = F | 0, C = _ | 0, F = R | 0, _ = w | 0, R = x | 0, { h: w, l: x } = le.add(h | 0, b | 0, q | 0, Y | 0), h = c | 0, b = A | 0, c = i | 0, A = o | 0, i = r | 0, o = s | 0;
      const u = le.add3L(Y, ee, a);
      r = le.add3H(u, q, W, E), s = u | 0;
    }
    ({ h: r, l: s } = le.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = le.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: A } = le.add(this.Ch | 0, this.Cl | 0, c | 0, A | 0), { h, l: b } = le.add(this.Dh | 0, this.Dl | 0, h | 0, b | 0), { h: w, l: x } = le.add(this.Eh | 0, this.El | 0, w | 0, x | 0), { h: _, l: R } = le.add(this.Fh | 0, this.Fl | 0, _ | 0, R | 0), { h: C, l: F } = le.add(this.Gh | 0, this.Gl | 0, C | 0, F | 0), { h: M, l: G } = le.add(this.Hh | 0, this.Hl | 0, M | 0, G | 0), this.set(r, s, i, o, c, A, h, b, w, x, _, R, C, F, M, G);
  }
  roundClean() {
    en.fill(0), tn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const jc = /* @__PURE__ */ Rs(() => new UA());
var GA = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return rA(t, n, { N: r, r: i, p: s, dkLen: o });
}, VA = (e) => SA(e), $c = !1, Kc = (e) => OA(e), e0 = Kc;
function Sr(e) {
  const t = H(e, "data");
  return e0(t);
}
Sr._ = Kc;
Sr.lock = () => {
  $c = !0;
};
Sr.register = (e) => {
  if ($c)
    throw new v(N.HASHER_LOCKED, "ripemd160 is locked");
  e0 = e;
};
Object.freeze(Sr);
var Un = (e, t = "base64") => {
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
}, t0 = (e, t, n, r, s) => {
  const i = { sha256: rr, sha512: jc }[s];
  return z(io(i, e, t, { c: n, dkLen: r }));
}, { crypto: Ss, btoa: n0 } = globalThis;
if (!Ss)
  throw new v(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!n0)
  throw new v(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Bi = (e) => Ss.getRandomValues(new Uint8Array(e)), ts = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return n0(n);
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
}, r0 = "AES-CTR", uo = (e, t) => {
  const n = Un(String(e).normalize("NFKC"), "utf-8"), r = t0(n, t, 1e5, 32, "sha256");
  return H(r);
}, zA = async (e, t) => {
  const n = Bi(16), r = Bi(32), s = uo(e, r), i = JSON.stringify(t), o = Un(i, "utf-8"), c = {
    name: r0,
    counter: n,
    length: 64
  }, A = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), h = await crypto.subtle.encrypt(c, A, o);
  return {
    data: ts(h),
    iv: ts(n),
    salt: ts(r)
  };
}, HA = async (e, t) => {
  const n = Un(t.iv), r = Un(t.salt), s = uo(e, r), i = Un(t.data), o = {
    name: r0,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), A = await crypto.subtle.decrypt(o, c, i), h = new TextDecoder().decode(A);
  try {
    return JSON.parse(h);
  } catch {
    throw new v(N.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, YA = async (e, t, n) => {
  const r = Ss.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, c = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), A = await r.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    c,
    o
  );
  return new Uint8Array(A);
}, XA = async (e, t, n) => {
  const r = Ss.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, c = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), A = await r.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    c,
    o
  );
  return new Uint8Array(A);
}, WA = (e, t, n) => {
  const r = e === "sha256" ? rr : jc, s = so.create(r, t).update(n).digest();
  return z(s);
}, ZA = {
  bufferFromString: Un,
  stringFromBuffer: ts,
  decrypt: HA,
  encrypt: zA,
  keyFromPassword: uo,
  randomBytes: Bi,
  scrypt: GA,
  keccak256: VA,
  decryptJsonWalletData: XA,
  encryptJsonWalletData: YA,
  computeHmac: WA,
  pbkdf2: t0,
  ripemd160: Sr
}, JA = ZA, {
  bufferFromString: fn,
  decrypt: qA,
  encrypt: jA,
  keyFromPassword: By,
  randomBytes: Tt,
  stringFromBuffer: lr,
  scrypt: s0,
  keccak256: i0,
  decryptJsonWalletData: $A,
  encryptJsonWalletData: KA,
  pbkdf2: el,
  computeHmac: o0,
  ripemd160: tl
} = JA;
function mt(e) {
  return z(rr(H(e)));
}
function qt(e) {
  return mt(e);
}
function nl(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function rl(e) {
  return qt(fn(e, "utf-8"));
}
var sl = Object.defineProperty, il = (e, t, n) => t in e ? sl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ao = (e, t, n) => (il(e, typeof t != "symbol" ? t + "" : t, n), n), ce = class {
  constructor(e, t, n) {
    S(this, "name");
    S(this, "type");
    S(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, ol = "u8", al = "u16", cl = "u32", ul = "u64", dl = "u256", Al = "raw untyped ptr", ll = "raw untyped slice", fl = "bool", hl = "b256", gl = "struct B512", Zn = "enum Option", pl = "struct Vec", ml = "struct Bytes", wl = "struct String", yl = "str", a0 = /str\[(?<length>[0-9]+)\]/, xi = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, c0 = /^struct (?<name>\w+)$/, u0 = /^enum (?<name>\w+)$/, Il = /^\((?<items>.*)\)$/, bl = /^generic (?<name>\w+)$/, ls = "1", ge = 8, pn = 32, fs = pn + 2, hs = pn, El = pn, Cl = pn, Bl = ge * 4, xl = ge * 2, d0 = 2 ** 32 - 1, A0 = ({ maxInputs: e }) => pn + // Tx ID
hs + // Base asset ID
// Asset ID/Balance coin input pairs
e * (hs + ge) + ge, l0 = ge + // Identifier
ge + // Gas limit
ge + // Script size
ge + // Script data size
ge + // Policies
ge + // Inputs size
ge + // Outputs size
ge + // Witnesses size
pn, xy = ge + // Identifier
Bl + // Utxo Length
ge + // Output Index
Cl + // Owner
ge + // Amount
hs + // Asset id
xl + // TxPointer
ge + // Witnesses index
ge + // Predicate size
ge + // Predicate data size
ge, aa = (e) => e instanceof Uint8Array, sr = (e) => {
  const t = Array.isArray(e) ? e : Object.values(e);
  for (const n of t)
    if (n.type === Zn || "coder" in n && n.coder.type === Zn || "coders" in n && sr(n.coders))
      return !0;
  return !1;
}, xr, Ic, we = (Ic = class extends ce {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    S(this, "coder");
    S(this, "length");
    Bt(this, xr, void 0);
    this.coder = t, this.length = n, Mt(this, xr, sr([t]));
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(N.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new v(N.ENCODE_ERROR, "Types/values length mismatch.");
    return ie(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (!Fe(this, xr) && t.length < this.encodedLength || t.length > d0)
      throw new v(N.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, xr = new WeakMap(), Ic), V = class extends ce {
  constructor() {
    super("b256", "b256", ge * 4);
  }
  encode(e) {
    let t;
    try {
      t = H(e);
    } catch {
      throw new v(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (B(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid b256 byte data size.");
    return [ji(n, 32), t + 32];
  }
}, _l = class extends ce {
  constructor() {
    super("b512", "struct B512", ge * 8);
  }
  encode(e) {
    let t;
    try {
      t = H(e);
    } catch {
      throw new v(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (B(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid b512 byte data size.");
    return [ji(n, this.encodedLength), t + this.encodedLength];
  }
}, vl = {
  u64: ge,
  u256: ge * 4
}, D = class extends ce {
  constructor(e) {
    super("bigNumber", e, vl[e]);
  }
  encode(e) {
    let t;
    try {
      t = Zt(e, this.encodedLength);
    } catch {
      throw new v(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [B(n), t + this.encodedLength];
  }
}, Rl = class extends ce {
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
      throw new v(N.ENCODE_ERROR, "Invalid boolean value.");
    return Zt(t ? 1 : 0, this.encodedLength);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid boolean data size.");
    const r = B(t.slice(n, n + this.encodedLength));
    if (r.isZero())
      return [!1, n + this.encodedLength];
    if (!r.eq(B(1)))
      throw new v(N.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.encodedLength];
  }
}, f0 = class extends ce {
  constructor() {
    super("struct", "struct Bytes", ge);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), n = new D("u64").encode(t.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < ge)
      throw new v(N.DECODE_ERROR, "Invalid byte data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
Ao(f0, "memorySize", 1);
var Rn, _r, zn, Bs, g0, xs, p0, _s, m0, bc, h0 = (bc = class extends ce {
  constructor(t, n) {
    const r = new D("u64"), s = Object.values(n).reduce(
      (i, o) => Math.min(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    // We parse a native enum as an empty tuple, so we are looking for a tuple with no child coders.
    // The '()' is enough but the child coders is a stricter check.
    Bt(this, Bs);
    Bt(this, xs);
    Bt(this, _s);
    S(this, "name");
    S(this, "coders");
    Bt(this, Rn, void 0);
    Bt(this, _r, void 0);
    Bt(this, zn, void 0);
    this.name = t, this.coders = n, Mt(this, Rn, r), Mt(this, _r, s), Mt(this, zn, !(this.type === Zn || sr(n)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return Ur(this, xs, p0).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(N.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(N.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n);
    if (i === -1) {
      const c = Object.keys(this.coders).map((A) => `'${A}'`).join(", ");
      throw new v(
        N.INVALID_DECODE_VALUE,
        `Invalid case '${n}'. Valid cases: ${c}.`
      );
    }
    const o = s.encode(t[n]);
    return new Uint8Array([...Fe(this, Rn).encode(i), ...o]);
  }
  decode(t, n) {
    if (Fe(this, zn) && t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid enum data size.");
    const r = new D("u64").decode(t, n)[0], s = cn(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new v(
        N.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], c = n + Fe(this, Rn).encodedLength;
    if (Fe(this, zn) && t.length < c + o.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid enum data size.");
    const [A, h] = o.decode(t, c);
    return Ur(this, Bs, g0).call(this, this.coders[i]) ? Ur(this, _s, m0).call(this, i, h) : [{ [i]: A }, h];
  }
}, Rn = new WeakMap(), _r = new WeakMap(), zn = new WeakMap(), Bs = new WeakSet(), g0 = function(t) {
  return this.type !== Zn && t.type === "()" ? t.coders.length === 0 : !1;
}, xs = new WeakSet(), p0 = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Fe(this, _r) - n.encodedLength);
  return ie([Fe(this, Rn).encode(s), i, r]);
}, _s = new WeakSet(), m0 = function(t, n) {
  return [t, n];
}, bc), Sl = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new v(N.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, $ = class extends ce {
  constructor(t, n = {
    padToWordSize: !1
  }) {
    const r = n.padToWordSize ? ge : Sl(t);
    super("number", t, r);
    S(this, "baseType");
    S(this, "options");
    this.baseType = t, this.options = n;
  }
  encode(t) {
    let n;
    try {
      n = Zt(t);
    } catch {
      throw new v(N.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.encodedLength)
      throw new v(N.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Zt(n, this.encodedLength);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid number byte data size.");
    return [cn(r), n + this.encodedLength];
  }
}, w0 = class extends h0 {
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
}, Ql = class extends ce {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ge);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(N.ENCODE_ERROR, "Expected array value.");
    const n = new we(new $("u8"), e.length).encode(e), r = new D("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new we(new $("u8"), s), [c] = o.decode(i, 0);
    return [c, n + s];
  }
}, lo = class extends ce {
  constructor() {
    super("struct", "struct String", ge);
  }
  encode(e) {
    const t = Yn(e), n = new D("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid std string data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid std string byte data size.");
    return [eo(i), n + s];
  }
};
Ao(lo, "memorySize", 1);
var y0 = class extends ce {
  constructor() {
    super("strSlice", "str", ge);
  }
  encode(e) {
    const t = Yn(e), n = new D("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid string slice data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid string slice byte data size.");
    return [eo(i), n + s];
  }
};
Ao(y0, "memorySize", 1);
var Nl = class extends ce {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new v(N.ENCODE_ERROR, "Value length mismatch during encode.");
    return Yn(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid string byte data size.");
    return [eo(n), t + this.encodedLength];
  }
}, vr, Ec, Qs = (Ec = class extends ce {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    S(this, "name");
    S(this, "coders");
    Bt(this, vr, void 0);
    this.name = t, this.coders = n, Mt(this, vr, sr(n));
  }
  encode(t) {
    return vs(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof w0) && s == null)
          throw new v(
            N.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (!Fe(this, vr) && t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let A;
      return [A, r] = c.decode(t, r), i[o] = A, i;
    }, {}), r];
  }
}, vr = new WeakMap(), Ec), Rr, Cc, I0 = (Cc = class extends ce {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    S(this, "coders");
    Bt(this, Rr, void 0);
    this.coders = t, Mt(this, Rr, sr(t));
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(N.ENCODE_ERROR, "Types/values length mismatch.");
    return vs(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (!Fe(this, Rr) && t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, Rr = new WeakMap(), Cc), Hn, Bc, Dl = (Bc = class extends ce {
  constructor(t) {
    super("struct", "struct Vec", ge);
    S(this, "coder");
    Bt(this, Hn, void 0);
    this.coder = t, Mt(this, Hn, sr([t]));
  }
  encode(t) {
    if (!Array.isArray(t) && !aa(t))
      throw new v(
        N.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = new D("u64");
    if (aa(t))
      return new Uint8Array([...n.encode(t.length), ...t]);
    const r = t.map((i) => this.coder.encode(i)), s = n.encode(t.length);
    return new Uint8Array([...s, ...vs(r)]);
  }
  decode(t, n) {
    if (!Fe(this, Hn) && t.length < this.encodedLength || t.length > d0)
      throw new v(N.DECODE_ERROR, "Invalid vec data size.");
    const r = n + ge, s = t.slice(n, r), i = B(new D("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, c = t.slice(r, r + o);
    if (!Fe(this, Hn) && c.length !== o)
      throw new v(N.DECODE_ERROR, "Invalid vec byte data size.");
    let A = r;
    const h = [];
    for (let b = 0; b < i; b++) {
      const [w, x] = this.coder.decode(t, A);
      h.push(w), A = x;
    }
    return [h, A];
  }
}, Hn = new WeakMap(), Bc), b0 = (e) => {
  switch (e) {
    case void 0:
    case ls:
      return ls;
    default:
      throw new v(
        N.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, Tl = (e, t) => {
  const n = e.functions.find((r) => r.name === t);
  if (!n)
    throw new v(
      N.FUNCTION_NOT_FOUND,
      `Function with name '${t}' doesn't exist in the ABI`
    );
  return n;
}, Sn = (e, t) => {
  const n = e.types.find((r) => r.typeId === t);
  if (!n)
    throw new v(
      N.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return n;
}, ca = (e, t) => t.filter((n) => Sn(e, n.type).type !== "()"), Fl = (e) => {
  var r;
  const t = e.find((s) => s.name === "buf"), n = (r = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : r[0];
  if (!t || !n)
    throw new v(
      N.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return n;
}, un = class {
  constructor(e, t) {
    S(this, "abi");
    S(this, "name");
    S(this, "type");
    S(this, "originalTypeArguments");
    S(this, "components");
    this.abi = e, this.name = t.name;
    const n = Sn(e, t.type);
    if (n.type.length > 256)
      throw new v(
        N.INVALID_COMPONENT,
        `The provided ABI type is too long: ${n.type}.`
      );
    this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = un.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? un.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new un(e, o));
    const s = r.reduce(
      (o, c, A) => {
        var b;
        const h = { ...o };
        return h[c] = structuredClone(
          (b = t.typeArguments) == null ? void 0 : b[A]
        ), h;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new un(e, o));
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
      const s = Sn(e, r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = Sn(e, s.type);
      if (bl.test(i.type)) {
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
    return c0.test(this.type) ? "s" : xi.test(this.type) ? "a" : u0.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = a0.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = xi.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new un(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function ua(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Mn = (e, t) => {
  var A, h, b, w, x;
  switch (e.type) {
    case ol:
    case al:
    case cl:
      return new $(e.type);
    case ul:
    case Al:
      return new D("u64");
    case dl:
      return new D("u256");
    case ll:
      return new Ql();
    case fl:
      return new Rl();
    case hl:
      return new V();
    case gl:
      return new _l();
    case ml:
      return new f0();
    case wl:
      return new lo();
    case yl:
      return new y0();
  }
  const n = (A = a0.exec(e.type)) == null ? void 0 : A.groups;
  if (n) {
    const _ = parseInt(n.length, 10);
    return new Nl(_);
  }
  const r = e.components, s = (h = xi.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const _ = parseInt(s.length, 10), R = r[0];
    if (!R)
      throw new v(
        N.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const C = Mn(R);
    return new we(C, _);
  }
  if (e.type === pl) {
    const _ = Fl(r), R = new un(e.abi, _), C = Mn(R);
    return new Dl(C);
  }
  const i = (b = c0.exec(e.type)) == null ? void 0 : b.groups;
  if (i) {
    const _ = ua(r, { getCoder: Mn });
    return new Qs(i.name, _);
  }
  const o = (w = u0.exec(e.type)) == null ? void 0 : w.groups;
  if (o) {
    const _ = ua(r, { getCoder: Mn });
    return e.type === Zn ? new w0(o.name, _) : new h0(o.name, _);
  }
  if ((x = Il.exec(e.type)) == null ? void 0 : x.groups) {
    const _ = r.map((R) => Mn(R));
    return new I0(_);
  }
  throw new v(
    N.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function Ml(e = ls) {
  switch (e) {
    case ls:
      return Mn;
    default:
      throw new v(
        N.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var wr = class {
  static getCoder(e, t, n = {
    padToWordSize: !1
  }) {
    const r = new un(e, t);
    return Ml(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, ns = class {
  constructor(e, t) {
    S(this, "signature");
    S(this, "selector");
    S(this, "selectorBytes");
    S(this, "encoding");
    S(this, "name");
    S(this, "jsonFn");
    S(this, "attributes");
    S(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = Tl(this.jsonAbi, t), this.name = t, this.signature = ns.getSignature(this.jsonAbi, this.jsonFn), this.selector = ns.getFunctionSelector(this.signature), this.selectorBytes = new lo().encode(t), this.encoding = b0(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new un(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = mt(fn(e, "utf-8"));
    return B(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e) {
    ns.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const t = e.slice(), n = ca(this.jsonAbi, this.jsonFn.inputs);
    Array.isArray(e) && n.length !== e.length && (t.length = this.jsonFn.inputs.length, t.fill(void 0, e.length));
    const r = n.map(
      (s) => wr.getCoder(this.jsonAbi, s, {
        encoding: this.encoding
      })
    );
    return new I0(r).encode(t);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => Sn(n, o.type)), s = r.filter(
      (o) => o.type === Zn || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new v(N.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = H(e), n = ca(this.jsonAbi, this.jsonFn.inputs);
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new v(
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
        const o = wr.getCoder(this.jsonAbi, i, { encoding: this.encoding }), [c, A] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + A
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (Sn(this.jsonAbi, this.jsonFn.output.type).type === "()")
      return [void 0, 0];
    const n = H(e);
    return wr.getCoder(this.jsonAbi, this.jsonFn.output, {
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
}, jt = class {
  constructor(e) {
    S(this, "functions");
    S(this, "configurables");
    S(this, "jsonAbi");
    S(this, "encoding");
    this.jsonAbi = e, this.encoding = b0(e.encoding), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new ns(this.jsonAbi, t.name)])
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
      N.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t) {
    const n = this.jsonAbi.loggedTypes.find((r) => r.logId === t);
    if (!n)
      throw new v(
        N.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return wr.decode(this.jsonAbi, n.loggedType, H(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const n = this.jsonAbi.configurables.find((r) => r.name === e);
    if (!n)
      throw new v(
        N.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return wr.encode(this.jsonAbi, n.configurableType, t, {
      encoding: this.encoding
    });
  }
  getTypeById(e) {
    return Sn(this.jsonAbi, e);
  }
}, _y = class {
}, Ll = class {
}, E0 = class {
}, C0 = class {
}, Ol = class extends C0 {
}, kl = class extends C0 {
}, yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
var Jn = yr.bech32m = yr.bech32 = void 0;
const gs = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", B0 = {};
for (let e = 0; e < gs.length; e++) {
  const t = gs.charAt(e);
  B0[t] = e;
}
function Gn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function da(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = Gn(t) ^ r >> 5;
  }
  t = Gn(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = Gn(t) ^ r & 31;
  }
  return t;
}
function fo(e, t, n, r) {
  let s = 0, i = 0;
  const o = (1 << n) - 1, c = [];
  for (let A = 0; A < e.length; ++A)
    for (s = s << t | e[A], i += t; i >= n; )
      i -= n, c.push(s >> i & o);
  if (r)
    i > 0 && c.push(s << n - i & o);
  else {
    if (i >= t)
      return "Excess padding";
    if (s << n - i & o)
      return "Non-zero padding";
  }
  return c;
}
function Pl(e) {
  return fo(e, 8, 5, !0);
}
function Ul(e) {
  const t = fo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function Gl(e) {
  const t = fo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function x0(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, c, A) {
    if (A = A || 90, o.length + 7 + c.length > A)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let h = da(o);
    if (typeof h == "string")
      throw new Error(h);
    let b = o + "1";
    for (let w = 0; w < c.length; ++w) {
      const x = c[w];
      if (x >> 5)
        throw new Error("Non 5-bit word");
      h = Gn(h) ^ x, b += gs.charAt(x);
    }
    for (let w = 0; w < 6; ++w)
      h = Gn(h);
    h ^= t;
    for (let w = 0; w < 6; ++w) {
      const x = h >> (5 - w) * 5 & 31;
      b += gs.charAt(x);
    }
    return b;
  }
  function r(o, c) {
    if (c = c || 90, o.length < 8)
      return o + " too short";
    if (o.length > c)
      return "Exceeds length limit";
    const A = o.toLowerCase(), h = o.toUpperCase();
    if (o !== A && o !== h)
      return "Mixed-case string " + o;
    o = A;
    const b = o.lastIndexOf("1");
    if (b === -1)
      return "No separator character for " + o;
    if (b === 0)
      return "Missing prefix for " + o;
    const w = o.slice(0, b), x = o.slice(b + 1);
    if (x.length < 6)
      return "Data too short";
    let _ = da(w);
    if (typeof _ == "string")
      return _;
    const R = [];
    for (let C = 0; C < x.length; ++C) {
      const F = x.charAt(C), M = B0[F];
      if (M === void 0)
        return "Unknown character " + F;
      _ = Gn(_) ^ M, !(C + 6 >= x.length) && R.push(M);
    }
    return _ !== t ? "Invalid checksum for " + o : { prefix: w, words: R };
  }
  function s(o, c) {
    const A = r(o, c);
    if (typeof A == "object")
      return A;
  }
  function i(o, c) {
    const A = r(o, c);
    if (typeof A == "object")
      return A;
    throw new Error(A);
  }
  return {
    decodeUnsafe: s,
    decode: i,
    encode: n,
    toWords: Pl,
    fromWordsUnsafe: Ul,
    fromWords: Gl
  };
}
yr.bech32 = x0("bech32");
Jn = yr.bech32m = x0("bech32m");
var ps = "fuel";
function ho(e) {
  return Jn.decode(e);
}
function rs(e) {
  return Jn.encode(
    ps,
    Jn.toWords(H(z(e)))
  );
}
function ss(e) {
  return typeof e == "string" && e.indexOf(ps + 1) === 0 && ho(e).prefix === ps;
}
function _i(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Aa(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function vi(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function go(e) {
  return new Uint8Array(Jn.fromWords(ho(e).words));
}
function la(e) {
  if (!ss(e))
    throw new v(
      v.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return z(go(e));
}
function Vl(e) {
  const { words: t } = ho(e);
  return Jn.encode(ps, t);
}
var fr = (e) => e instanceof E0 ? e.address : e instanceof Ol ? e.id : e, zl = () => z(Tt(32)), Hl = (e) => {
  let t;
  try {
    if (!_i(e))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = go(rs(e)), t = z(t.fill(0, 0, 12));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, Yl = (e) => {
  if (!vi(e))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, de = class extends Ll {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    S(this, "bech32Address");
    if (this.bech32Address = Vl(t), !ss(this.bech32Address))
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
    return la(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return go(this.bech32Address);
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
    const t = la(this.bech32Address);
    return {
      bits: Hl(t)
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
    if (!Aa(t))
      throw new v(v.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = z(rr(H(t)));
    return new de(rs(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!_i(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new de(rs(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(zl());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return ss(t) ? new de(t) : this.fromB256(t);
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
    if (Aa(t))
      return de.fromPublicKey(t);
    if (ss(t))
      return new de(t);
    if (_i(t))
      return de.fromB256(t);
    if (vi(t))
      return de.fromEvmAddress(t);
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
    if (!vi(t))
      throw new v(
        v.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = Yl(t);
    return new de(rs(n));
  }
};
function Xl(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function _0(e) {
  return function t(n) {
    return arguments.length === 0 || Xl(n) ? t : e.apply(this, arguments);
  };
}
var Wl = /* @__PURE__ */ _0(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Zl(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function v0(e, t, n) {
  if (n || (n = new ql()), Jl(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var c in e)
      Object.prototype.hasOwnProperty.call(e, c) && (i[c] = t ? v0(e[c], !0, n) : e[c]);
    return i;
  };
  switch (Wl(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Zl(e);
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
function Jl(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var ql = /* @__PURE__ */ function() {
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
          const c = i[o];
          if (c[0] === t)
            return c[1];
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
}(), Gt = /* @__PURE__ */ _0(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : v0(t, !0);
}), ln, xc, Ee = (xc = class extends ce {
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
    Bt(this, ln, void 0);
    this.length = t, Mt(this, ln, n);
  }
  encode(t) {
    const n = [], r = H(t);
    return n.push(r), Fe(this, ln) && n.push(new Uint8Array(Fe(this, ln))), ie(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [z(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return Fe(this, ln) && ([r, s] = [null, s + Fe(this, ln)]), [i, s];
  }
}, ln = new WeakMap(), xc), qn = class extends Qs {
  constructor() {
    super("TxPointer", {
      blockHeight: new $("u32", { padToWordSize: !0 }),
      txIndex: new $("u16", { padToWordSize: !0 })
    });
  }
}, Ce = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Ce || {}), fa = class extends ce {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.txID)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new V().encode(e.owner)), t.push(new D("u64").encode(e.amount)), t.push(new V().encode(e.assetId)), t.push(new qn().encode(e.txPointer)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new D("u64").encode(e.predicateGasUsed)), t.push(new D("u64").encode(e.predicateLength)), t.push(new D("u64").encode(e.predicateDataLength)), t.push(new Ee(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ee(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new V().decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const c = n;
    [n, r] = new V().decode(e, r);
    const A = n;
    [n, r] = new qn().decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const b = Number(n);
    [n, r] = new D("u64").decode(e, r);
    const w = n;
    [n, r] = new D("u64").decode(e, r);
    const x = n;
    [n, r] = new D("u64").decode(e, r);
    const _ = n;
    [n, r] = new Ee(x.toNumber()).decode(e, r);
    const R = n;
    return [n, r] = new Ee(_.toNumber()).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: c,
        assetId: A,
        txPointer: h,
        witnessIndex: b,
        predicateGasUsed: w,
        predicateLength: x,
        predicateDataLength: _,
        predicate: R,
        predicateData: n
      },
      r
    ];
  }
}, ms = class extends ce {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.txID)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new V().encode(e.balanceRoot)), t.push(new V().encode(e.stateRoot)), t.push(new qn().encode(e.txPointer)), t.push(new V().encode(e.contractID)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new V().decode(e, r);
    const o = n;
    [n, r] = new V().decode(e, r);
    const c = n;
    [n, r] = new qn().decode(e, r);
    const A = n;
    return [n, r] = new V().decode(e, r), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: o,
        stateRoot: c,
        txPointer: A,
        contractID: n
      },
      r
    ];
  }
}, Ir = class extends ce {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ee(32).encode(e.sender)), t.push(new Ee(32).encode(e.recipient)), t.push(new Ee(32).encode(e.nonce)), t.push(new D("u64").encode(e.amount)), t.push(H(e.data || "0x")), mt(ie(t));
  }
  static encodeData(e) {
    const t = H(e || "0x"), n = t.length;
    return new Ee(n).encode(t);
  }
  encode(e) {
    const t = [], n = Ir.encodeData(e.data);
    return t.push(new Ee(32).encode(e.sender)), t.push(new Ee(32).encode(e.recipient)), t.push(new D("u64").encode(e.amount)), t.push(new Ee(32).encode(e.nonce)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new D("u64").encode(e.predicateGasUsed)), t.push(new D("u64").encode(n.length)), t.push(new D("u64").encode(e.predicateLength)), t.push(new D("u64").encode(e.predicateDataLength)), t.push(new Ee(n.length).encode(n)), t.push(new Ee(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ee(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ie(t);
  }
  static decodeData(e) {
    const t = H(e), n = t.length, [r] = new Ee(n).decode(t, 0);
    return H(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new V().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new V().decode(e, r);
    const c = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = Number(n);
    [n, r] = new D("u64").decode(e, r);
    const h = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const b = n;
    [n, r] = new D("u64").decode(e, r);
    const w = n;
    [n, r] = new D("u64").decode(e, r);
    const x = n;
    [n, r] = new Ee(b).decode(e, r);
    const _ = n;
    [n, r] = new Ee(w.toNumber()).decode(e, r);
    const R = n;
    return [n, r] = new Ee(x.toNumber()).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: A,
        nonce: c,
        predicateGasUsed: h,
        dataLength: b,
        predicateLength: w,
        predicateDataLength: x,
        data: _,
        predicate: R,
        predicateData: n
      },
      r
    ];
  }
}, mn = class extends ce {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new fa().encode(e));
        break;
      }
      case 1: {
        t.push(new ms().encode(e));
        break;
      }
      case 2: {
        t.push(new Ir().encode(e));
        break;
      }
      default:
        throw new v(
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
        return [n, r] = new fa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new ms().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Ir().decode(e, r), [n, r];
      default:
        throw new v(
          N.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Ie = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Ie || {}), ha = class extends ce {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new V().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    return [n, r] = new V().decode(e, r), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, ws = class extends ce {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new $("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new V().encode(e.balanceRoot)), t.push(new V().encode(e.stateRoot)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    [n, r] = new V().decode(e, r);
    const i = n;
    return [n, r] = new V().decode(e, r), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: n
      },
      r
    ];
  }
}, ga = class extends ce {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new V().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    return [n, r] = new V().decode(e, r), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, pa = class extends ce {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new V().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    return [n, r] = new V().decode(e, r), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, ma = class extends ce {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.contractId)), t.push(new V().encode(e.stateRoot)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    return [n, r] = new V().decode(e, r), [
      {
        type: 4,
        contractId: s,
        stateRoot: n
      },
      r
    ];
  }
}, wn = class extends ce {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new ha().encode(e));
        break;
      }
      case 1: {
        t.push(new ws().encode(e));
        break;
      }
      case 2: {
        t.push(new ga().encode(e));
        break;
      }
      case 3: {
        t.push(new pa().encode(e));
        break;
      }
      case 4: {
        t.push(new ma().encode(e));
        break;
      }
      default:
        throw new v(
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
        return [n, r] = new ha().decode(e, r), [n, r];
      case 1:
        return [n, r] = new ws().decode(e, r), [n, r];
      case 2:
        return [n, r] = new ga().decode(e, r), [n, r];
      case 3:
        return [n, r] = new pa().decode(e, r), [n, r];
      case 4:
        return [n, r] = new ma().decode(e, r), [n, r];
      default:
        throw new v(
          N.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Qt = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Qt || {}), jl = (e) => e.sort((t, n) => t.type - n.type);
function $l(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new v(
        N.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(n.type);
  });
}
var yn = class extends ce {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    $l(e);
    const t = jl(e), n = [];
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
          throw new v(N.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
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
}, ue = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(ue || {}), wa = class extends ce {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.from)), t.push(new V().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new V().encode(e.assetId)), t.push(new D("u64").encode(e.gas)), t.push(new D("u64").encode(e.param1)), t.push(new D("u64").encode(e.param2)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new V().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new V().decode(e, r);
    const c = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    [n, r] = new D("u64").decode(e, r);
    const h = n;
    [n, r] = new D("u64").decode(e, r);
    const b = n;
    [n, r] = new D("u64").decode(e, r);
    const w = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        gas: A,
        param1: h,
        param2: b,
        pc: w,
        is: n
      },
      r
    ];
  }
}, ya = class extends ce {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.id)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
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
}, Ia = class extends ce {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.id)), t.push(new D("u64").encode(e.ptr)), t.push(new D("u64").encode(e.len)), t.push(new V().encode(e.digest)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new V().decode(e, r);
    const c = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: c,
        pc: A,
        is: n
      },
      r
    ];
  }
}, ba = class extends ce {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.id)), t.push(new D("u64").encode(e.reason)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), t.push(new V().encode(e.contractId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const c = n;
    return [n, r] = new V().decode(e, r), [
      {
        type: 3,
        id: s,
        reason: i,
        pc: o,
        is: c,
        contractId: n
      },
      r
    ];
  }
}, Ea = class extends ce {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.id)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
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
}, Ca = class extends ce {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.id)), t.push(new D("u64").encode(e.val0)), t.push(new D("u64").encode(e.val1)), t.push(new D("u64").encode(e.val2)), t.push(new D("u64").encode(e.val3)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const c = n;
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
        val2: c,
        val3: A,
        pc: h,
        is: n
      },
      r
    ];
  }
}, Ba = class extends ce {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.id)), t.push(new D("u64").encode(e.val0)), t.push(new D("u64").encode(e.val1)), t.push(new D("u64").encode(e.ptr)), t.push(new D("u64").encode(e.len)), t.push(new V().encode(e.digest)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const c = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    [n, r] = new V().decode(e, r);
    const h = n;
    [n, r] = new D("u64").decode(e, r);
    const b = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: c,
        len: A,
        digest: h,
        pc: b,
        is: n
      },
      r
    ];
  }
}, xa = class extends ce {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.from)), t.push(new V().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new V().encode(e.assetId)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new V().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new V().decode(e, r);
    const c = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 7,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        pc: A,
        is: n
      },
      r
    ];
  }
}, _a = class extends ce {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.from)), t.push(new V().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new V().encode(e.assetId)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new V().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new V().decode(e, r);
    const c = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 8,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        pc: A,
        is: n
      },
      r
    ];
  }
}, va = class extends ce {
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
}, ys = class extends ce {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ee(32).encode(e.sender)), t.push(new Ee(32).encode(e.recipient)), t.push(new Ee(32).encode(e.nonce)), t.push(new D("u64").encode(e.amount)), t.push(H(e.data || "0x")), mt(ie(t));
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.sender)), t.push(new V().encode(e.recipient)), t.push(new D("u64").encode(e.amount)), t.push(new V().encode(e.nonce)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.data.length)), t.push(new V().encode(e.digest)), t.push(new Ee(e.data.length).encode(e.data)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new V().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new V().decode(e, r);
    const c = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new V().decode(e, r);
    const h = n;
    [n, r] = new Ee(A).decode(e, r);
    const b = H(n), w = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: c,
      digest: h,
      data: b
    };
    return w.messageId = ys.getMessageId(w), [w, r];
  }
}, R0 = (e, t) => {
  const n = H(e), r = H(t);
  return mt(ie([n, r]));
}, br = class extends ce {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return R0(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.subId)), t.push(new V().encode(e.contractId)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new V().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const c = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n, h = br.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: A,
      assetId: h
    }, r];
  }
}, Ri = class extends ce {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return R0(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.subId)), t.push(new V().encode(e.contractId)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new V().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const c = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n, h = br.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: A,
      assetId: h
    }, r];
  }
}, vy = class extends ce {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new wa().encode(e));
        break;
      }
      case 1: {
        t.push(new ya().encode(e));
        break;
      }
      case 2: {
        t.push(new Ia().encode(e));
        break;
      }
      case 3: {
        t.push(new ba().encode(e));
        break;
      }
      case 4: {
        t.push(new Ea().encode(e));
        break;
      }
      case 5: {
        t.push(new Ca().encode(e));
        break;
      }
      case 6: {
        t.push(new Ba().encode(e));
        break;
      }
      case 7: {
        t.push(new xa().encode(e));
        break;
      }
      case 8: {
        t.push(new _a().encode(e));
        break;
      }
      case 9: {
        t.push(new va().encode(e));
        break;
      }
      case 10: {
        t.push(new ys().encode(e));
        break;
      }
      case 11: {
        t.push(new br().encode(e));
        break;
      }
      case 12: {
        t.push(new Ri().encode(e));
        break;
      }
      default:
        throw new v(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new wa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new ya().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Ia().decode(e, r), [n, r];
      case 3:
        return [n, r] = new ba().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Ea().decode(e, r), [n, r];
      case 5:
        return [n, r] = new Ca().decode(e, r), [n, r];
      case 6:
        return [n, r] = new Ba().decode(e, r), [n, r];
      case 7:
        return [n, r] = new xa().decode(e, r), [n, r];
      case 8:
        return [n, r] = new _a().decode(e, r), [n, r];
      case 9:
        return [n, r] = new va().decode(e, r), [n, r];
      case 10:
        return [n, r] = new ys().decode(e, r), [n, r];
      case 11:
        return [n, r] = new br().decode(e, r), [n, r];
      case 12:
        return [n, r] = new Ri().decode(e, r), [n, r];
      default:
        throw new v(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, Ra = class extends Qs {
  constructor() {
    super("StorageSlot", {
      key: new V(),
      value: new V()
    });
  }
}, Sa = class extends ce {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: n } = e;
    switch (t.push(new $("u8", { padToWordSize: !0 }).encode(n)), n) {
      case 0: {
        const r = e.data;
        t.push(new $("u16", { padToWordSize: !0 }).encode(r.witnessIndex)), t.push(new V().encode(r.checksum));
        break;
      }
      case 1: {
        const r = e.data;
        t.push(new V().encode(r.bytecodeRoot));
        break;
      }
      default:
        throw new v(
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
        return [r, n] = new V().decode(e, n), [{ type: s, data: { witnessIndex: i, checksum: r } }, n];
      }
      case 1:
        return [r, n] = new V().decode(e, n), [{ type: s, data: { bytecodeRoot: r } }, n];
      default:
        throw new v(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, In = class extends ce {
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
    return t.push(new $("u32", { padToWordSize: !0 }).encode(e.dataLength)), t.push(new Ee(e.dataLength).encode(e.data)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    return [n, r] = new Ee(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, Oe = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e))(Oe || {}), Qa = class extends ce {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new D("u64").encode(e.scriptGasLimit)), t.push(new V().encode(e.receiptsRoot)), t.push(new D("u64").encode(e.scriptLength)), t.push(new D("u64").encode(e.scriptDataLength)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new Ee(e.scriptLength.toNumber()).encode(e.script)), t.push(new Ee(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new yn().encode(e.policies)), t.push(new we(new mn(), e.inputsCount).encode(e.inputs)), t.push(new we(new wn(), e.outputsCount).encode(e.outputs)), t.push(new we(new In(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new D("u64").decode(e, r);
    const s = n;
    [n, r] = new V().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const c = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const b = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const w = n;
    [n, r] = new Ee(o.toNumber()).decode(e, r);
    const x = n;
    [n, r] = new Ee(c.toNumber()).decode(e, r);
    const _ = n;
    [n, r] = new yn().decode(e, r, A);
    const R = n;
    [n, r] = new we(new mn(), h).decode(e, r);
    const C = n;
    [n, r] = new we(new wn(), b).decode(e, r);
    const F = n;
    return [n, r] = new we(new In(), w).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: c,
        policyTypes: A,
        inputsCount: h,
        outputsCount: b,
        witnessesCount: w,
        receiptsRoot: i,
        script: x,
        scriptData: _,
        policies: R,
        inputs: C,
        outputs: F,
        witnesses: n
      },
      r
    ];
  }
}, Na = class extends ce {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new $("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new V().encode(e.salt)), t.push(new D("u64").encode(e.storageSlotsCount)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new we(new Ra(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new yn().encode(e.policies)), t.push(new we(new mn(), e.inputsCount).encode(e.inputs)), t.push(new we(new wn(), e.outputsCount).encode(e.outputs)), t.push(new we(new In(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    [n, r] = new V().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const c = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const b = n;
    [n, r] = new we(new Ra(), o.toNumber()).decode(
      e,
      r
    );
    const w = n;
    [n, r] = new yn().decode(e, r, c);
    const x = n;
    [n, r] = new we(new mn(), A).decode(e, r);
    const _ = n;
    [n, r] = new we(new wn(), h).decode(e, r);
    const R = n;
    return [n, r] = new we(new In(), b).decode(e, r), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: c,
        storageSlotsCount: o,
        inputsCount: A,
        outputsCount: h,
        witnessesCount: b,
        salt: i,
        policies: x,
        storageSlots: w,
        inputs: _,
        outputs: R,
        witnesses: n
      },
      r
    ];
  }
}, Da = class extends ce {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new qn().encode(e.txPointer)), t.push(new ms().encode(e.inputContract)), t.push(new ws().encode(e.outputContract)), t.push(new D("u64").encode(e.mintAmount)), t.push(new V().encode(e.mintAssetId)), t.push(new D("u64").encode(e.gasPrice)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new qn().decode(e, r);
    const s = n;
    [n, r] = new ms().decode(e, r);
    const i = n;
    [n, r] = new ws().decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const c = n;
    [n, r] = new V().decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: c,
        mintAssetId: A,
        gasPrice: n
      },
      r
    ];
  }
}, Ta = class extends ce {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Sa().encode(e.upgradePurpose)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new yn().encode(e.policies)), t.push(new we(new mn(), e.inputsCount).encode(e.inputs)), t.push(new we(new wn(), e.outputsCount).encode(e.outputs)), t.push(new we(new In(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Sa().decode(e, r);
    const s = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const o = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const c = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new yn().decode(e, r, i);
    const h = n;
    [n, r] = new we(new mn(), o).decode(e, r);
    const b = n;
    [n, r] = new we(new wn(), c).decode(e, r);
    const w = n;
    return [n, r] = new we(new In(), A).decode(e, r), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: o,
        outputsCount: c,
        witnessesCount: A,
        policies: h,
        inputs: b,
        outputs: w,
        witnesses: n
      },
      r
    ];
  }
}, Fa = class extends ce {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new V().encode(e.root)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.subsectionIndex)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.subsectionsNumber)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.proofSetCount)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new we(new V(), e.proofSetCount).encode(e.proofSet)), t.push(new yn().encode(e.policies)), t.push(new we(new mn(), e.inputsCount).encode(e.inputs)), t.push(new we(new wn(), e.outputsCount).encode(e.outputs)), t.push(new we(new In(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new V().decode(e, r);
    const s = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const o = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const c = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const b = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const w = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const x = n;
    [n, r] = new we(new V(), A).decode(e, r);
    const _ = n;
    [n, r] = new yn().decode(e, r, h);
    const R = n;
    [n, r] = new we(new mn(), b).decode(e, r);
    const C = n;
    [n, r] = new we(new wn(), w).decode(e, r);
    const F = n;
    return [n, r] = new we(new In(), x).decode(e, r), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: o,
        subsectionsNumber: c,
        proofSetCount: A,
        policyTypes: h,
        inputsCount: b,
        outputsCount: w,
        witnessesCount: x,
        proofSet: _,
        policies: R,
        inputs: C,
        outputs: F,
        witnesses: n
      },
      r
    ];
  }
}, Jt = class extends ce {
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
          new Qa().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Na().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new Da().encode(e));
        break;
      }
      case 3: {
        t.push(
          new Ta().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new Fa().encode(e)
        );
        break;
      }
      default:
        throw new v(
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
        return [n, r] = new Qa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Na().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Da().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Ta().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Fa().decode(e, r), [n, r];
      default:
        throw new v(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, Ry = class extends Qs {
  constructor() {
    super("UtxoId", {
      transactionId: new V(),
      outputIndex: new $("u8", { padToWordSize: !0 })
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const S0 = BigInt(0), Ns = BigInt(1), Kl = BigInt(2);
function Dn(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Qr(e) {
  if (!Dn(e))
    throw new Error("Uint8Array expected");
}
const ef = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function jn(e) {
  Qr(e);
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += ef[e[n]];
  return t;
}
function Q0(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function po(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const zt = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Ma(e) {
  if (e >= zt._0 && e <= zt._9)
    return e - zt._0;
  if (e >= zt._A && e <= zt._F)
    return e - (zt._A - 10);
  if (e >= zt._a && e <= zt._f)
    return e - (zt._a - 10);
}
function $n(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = Ma(e.charCodeAt(i)), c = Ma(e.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const A = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + A + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function Qn(e) {
  return po(jn(e));
}
function mo(e) {
  return Qr(e), po(jn(Uint8Array.from(e).reverse()));
}
function Kn(e, t) {
  return $n(e.toString(16).padStart(t * 2, "0"));
}
function wo(e, t) {
  return Kn(e, t).reverse();
}
function tf(e) {
  return $n(Q0(e));
}
function Nt(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = $n(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Dn(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function Er(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    Qr(s), t += s.length;
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, s), s += i.length;
  }
  return n;
}
function N0(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function nf(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function rf(e) {
  let t;
  for (t = 0; e > S0; e >>= Ns, t += 1)
    ;
  return t;
}
function sf(e, t) {
  return e >> BigInt(t) & Ns;
}
function of(e, t, n) {
  return e | (n ? Ns : S0) << BigInt(t);
}
const yo = (e) => (Kl << BigInt(e - 1)) - Ns, ci = (e) => new Uint8Array(e), La = (e) => Uint8Array.from(e);
function D0(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = ci(e), s = ci(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...w) => n(s, r, ...w), A = (w = ci()) => {
    s = c(La([0]), w), r = c(), w.length !== 0 && (s = c(La([1]), w), r = c());
  }, h = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let w = 0;
    const x = [];
    for (; w < t; ) {
      r = c();
      const _ = r.slice();
      x.push(_), w += r.length;
    }
    return Er(...x);
  };
  return (w, x) => {
    o(), A(w);
    let _;
    for (; !(_ = x(h())); )
      A();
    return o(), _;
  };
}
const af = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || Dn(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function Nr(e, t, n = {}) {
  const r = (s, i, o) => {
    const c = af[i];
    if (typeof c != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const A = e[s];
    if (!(o && A === void 0) && !c(A, e))
      throw new Error(`Invalid param ${String(s)}=${A} (${typeof A}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(n))
    r(s, i, !0);
  return e;
}
const cf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abytes: Qr,
  bitGet: sf,
  bitLen: rf,
  bitMask: yo,
  bitSet: of,
  bytesToHex: jn,
  bytesToNumberBE: Qn,
  bytesToNumberLE: mo,
  concatBytes: Er,
  createHmacDrbg: D0,
  ensureBytes: Nt,
  equalBytes: N0,
  hexToBytes: $n,
  hexToNumber: po,
  isBytes: Dn,
  numberToBytesBE: Kn,
  numberToBytesLE: wo,
  numberToHexUnpadded: Q0,
  numberToVarBytesBE: tf,
  utf8ToBytes: nf,
  validateObject: Nr
}, Symbol.toStringTag, { value: "Module" }));
var ui = {}, Si = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof be < "u" && be, r = function() {
    function i() {
      this.fetch = !1, this.DOMException = n.DOMException;
    }
    return i.prototype = n, new i();
  }();
  (function(i) {
    (function(o) {
      var c = typeof i < "u" && i || typeof self < "u" && self || typeof c < "u" && c, A = {
        searchParams: "URLSearchParams" in c,
        iterable: "Symbol" in c && "iterator" in Symbol,
        blob: "FileReader" in c && "Blob" in c && function() {
          try {
            return new Blob(), !0;
          } catch {
            return !1;
          }
        }(),
        formData: "FormData" in c,
        arrayBuffer: "ArrayBuffer" in c
      };
      function h(u) {
        return u && DataView.prototype.isPrototypeOf(u);
      }
      if (A.arrayBuffer)
        var b = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], w = ArrayBuffer.isView || function(u) {
          return u && b.indexOf(Object.prototype.toString.call(u)) > -1;
        };
      function x(u) {
        if (typeof u != "string" && (u = String(u)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(u) || u === "")
          throw new TypeError('Invalid character in header field name: "' + u + '"');
        return u.toLowerCase();
      }
      function _(u) {
        return typeof u != "string" && (u = String(u)), u;
      }
      function R(u) {
        var l = {
          next: function() {
            var p = u.shift();
            return { done: p === void 0, value: p };
          }
        };
        return A.iterable && (l[Symbol.iterator] = function() {
          return l;
        }), l;
      }
      function C(u) {
        this.map = {}, u instanceof C ? u.forEach(function(l, p) {
          this.append(p, l);
        }, this) : Array.isArray(u) ? u.forEach(function(l) {
          this.append(l[0], l[1]);
        }, this) : u && Object.getOwnPropertyNames(u).forEach(function(l) {
          this.append(l, u[l]);
        }, this);
      }
      C.prototype.append = function(u, l) {
        u = x(u), l = _(l);
        var p = this.map[u];
        this.map[u] = p ? p + ", " + l : l;
      }, C.prototype.delete = function(u) {
        delete this.map[x(u)];
      }, C.prototype.get = function(u) {
        return u = x(u), this.has(u) ? this.map[u] : null;
      }, C.prototype.has = function(u) {
        return this.map.hasOwnProperty(x(u));
      }, C.prototype.set = function(u, l) {
        this.map[x(u)] = _(l);
      }, C.prototype.forEach = function(u, l) {
        for (var p in this.map)
          this.map.hasOwnProperty(p) && u.call(l, this.map[p], p, this);
      }, C.prototype.keys = function() {
        var u = [];
        return this.forEach(function(l, p) {
          u.push(p);
        }), R(u);
      }, C.prototype.values = function() {
        var u = [];
        return this.forEach(function(l) {
          u.push(l);
        }), R(u);
      }, C.prototype.entries = function() {
        var u = [];
        return this.forEach(function(l, p) {
          u.push([p, l]);
        }), R(u);
      }, A.iterable && (C.prototype[Symbol.iterator] = C.prototype.entries);
      function F(u) {
        if (u.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        u.bodyUsed = !0;
      }
      function M(u) {
        return new Promise(function(l, p) {
          u.onload = function() {
            l(u.result);
          }, u.onerror = function() {
            p(u.error);
          };
        });
      }
      function G(u) {
        var l = new FileReader(), p = M(l);
        return l.readAsArrayBuffer(u), p;
      }
      function O(u) {
        var l = new FileReader(), p = M(l);
        return l.readAsText(u), p;
      }
      function Z(u) {
        for (var l = new Uint8Array(u), p = new Array(l.length), f = 0; f < l.length; f++)
          p[f] = String.fromCharCode(l[f]);
        return p.join("");
      }
      function L(u) {
        if (u.slice)
          return u.slice(0);
        var l = new Uint8Array(u.byteLength);
        return l.set(new Uint8Array(u)), l.buffer;
      }
      function T() {
        return this.bodyUsed = !1, this._initBody = function(u) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = u, u ? typeof u == "string" ? this._bodyText = u : A.blob && Blob.prototype.isPrototypeOf(u) ? this._bodyBlob = u : A.formData && FormData.prototype.isPrototypeOf(u) ? this._bodyFormData = u : A.searchParams && URLSearchParams.prototype.isPrototypeOf(u) ? this._bodyText = u.toString() : A.arrayBuffer && A.blob && h(u) ? (this._bodyArrayBuffer = L(u.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : A.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(u) || w(u)) ? this._bodyArrayBuffer = L(u) : this._bodyText = u = Object.prototype.toString.call(u) : this._bodyText = "", this.headers.get("content-type") || (typeof u == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : A.searchParams && URLSearchParams.prototype.isPrototypeOf(u) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, A.blob && (this.blob = function() {
          var u = F(this);
          if (u)
            return u;
          if (this._bodyBlob)
            return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }, this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var u = F(this);
            return u || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(G);
        }), this.text = function() {
          var u = F(this);
          if (u)
            return u;
          if (this._bodyBlob)
            return O(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(Z(this._bodyArrayBuffer));
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
      function U(u) {
        var l = u.toUpperCase();
        return k.indexOf(l) > -1 ? l : u;
      }
      function q(u, l) {
        if (!(this instanceof q))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l = l || {};
        var p = l.body;
        if (u instanceof q) {
          if (u.bodyUsed)
            throw new TypeError("Already read");
          this.url = u.url, this.credentials = u.credentials, l.headers || (this.headers = new C(u.headers)), this.method = u.method, this.mode = u.mode, this.signal = u.signal, !p && u._bodyInit != null && (p = u._bodyInit, u.bodyUsed = !0);
        } else
          this.url = String(u);
        if (this.credentials = l.credentials || this.credentials || "same-origin", (l.headers || !this.headers) && (this.headers = new C(l.headers)), this.method = U(l.method || this.method || "GET"), this.mode = l.mode || this.mode || null, this.signal = l.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && p)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(p), (this.method === "GET" || this.method === "HEAD") && (l.cache === "no-store" || l.cache === "no-cache")) {
          var f = /([?&])_=[^&]*/;
          if (f.test(this.url))
            this.url = this.url.replace(f, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var y = /\?/;
            this.url += (y.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      q.prototype.clone = function() {
        return new q(this, { body: this._bodyInit });
      };
      function Y(u) {
        var l = new FormData();
        return u.trim().split("&").forEach(function(p) {
          if (p) {
            var f = p.split("="), y = f.shift().replace(/\+/g, " "), I = f.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(y), decodeURIComponent(I));
          }
        }), l;
      }
      function W(u) {
        var l = new C(), p = u.replace(/\r?\n[\t ]+/g, " ");
        return p.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var y = f.split(":"), I = y.shift().trim();
          if (I) {
            var g = y.join(":").trim();
            l.append(I, g);
          }
        }), l;
      }
      T.call(q.prototype);
      function ee(u, l) {
        if (!(this instanceof ee))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l || (l = {}), this.type = "default", this.status = l.status === void 0 ? 200 : l.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = l.statusText === void 0 ? "" : "" + l.statusText, this.headers = new C(l.headers), this.url = l.url || "", this._initBody(u);
      }
      T.call(ee.prototype), ee.prototype.clone = function() {
        return new ee(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new C(this.headers),
          url: this.url
        });
      }, ee.error = function() {
        var u = new ee(null, { status: 0, statusText: "" });
        return u.type = "error", u;
      };
      var E = [301, 302, 303, 307, 308];
      ee.redirect = function(u, l) {
        if (E.indexOf(l) === -1)
          throw new RangeError("Invalid status code");
        return new ee(null, { status: l, headers: { location: u } });
      }, o.DOMException = c.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(l, p) {
          this.message = l, this.name = p;
          var f = Error(l);
          this.stack = f.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function a(u, l) {
        return new Promise(function(p, f) {
          var y = new q(u, l);
          if (y.signal && y.signal.aborted)
            return f(new o.DOMException("Aborted", "AbortError"));
          var I = new XMLHttpRequest();
          function g() {
            I.abort();
          }
          I.onload = function() {
            var m = {
              status: I.status,
              statusText: I.statusText,
              headers: W(I.getAllResponseHeaders() || "")
            };
            m.url = "responseURL" in I ? I.responseURL : m.headers.get("X-Request-URL");
            var X = "response" in I ? I.response : I.responseText;
            setTimeout(function() {
              p(new ee(X, m));
            }, 0);
          }, I.onerror = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, I.ontimeout = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, I.onabort = function() {
            setTimeout(function() {
              f(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function d(m) {
            try {
              return m === "" && c.location.href ? c.location.href : m;
            } catch {
              return m;
            }
          }
          I.open(y.method, d(y.url), !0), y.credentials === "include" ? I.withCredentials = !0 : y.credentials === "omit" && (I.withCredentials = !1), "responseType" in I && (A.blob ? I.responseType = "blob" : A.arrayBuffer && y.headers.get("Content-Type") && y.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (I.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof C) ? Object.getOwnPropertyNames(l.headers).forEach(function(m) {
            I.setRequestHeader(m, _(l.headers[m]));
          }) : y.headers.forEach(function(m, X) {
            I.setRequestHeader(X, m);
          }), y.signal && (y.signal.addEventListener("abort", g), I.onreadystatechange = function() {
            I.readyState === 4 && y.signal.removeEventListener("abort", g);
          }), I.send(typeof y._bodyInit > "u" ? null : y._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = C, c.Request = q, c.Response = ee), o.Headers = C, o.Request = q, o.Response = ee, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Si, Si.exports);
var uf = Si.exports;
function df(e) {
  return typeof e == "object" && e !== null;
}
function Af(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const lf = /\r\n|[\n\r]/g;
function Qi(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(lf)) {
    if (typeof s.index == "number" || Af(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function ff(e) {
  return T0(
    e.source,
    Qi(e.source, e.start)
  );
}
function T0(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, c = t.line === 1 ? n : 0, A = t.column + c, h = `${e.name}:${o}:${A}
`, b = r.split(/\r\n|[\n\r]/g), w = b[s];
  if (w.length > 120) {
    const x = Math.floor(A / 80), _ = A % 80, R = [];
    for (let C = 0; C < w.length; C += 80)
      R.push(w.slice(C, C + 80));
    return h + Oa([
      [`${o} |`, R[0]],
      ...R.slice(1, x + 1).map((C) => ["|", C]),
      ["|", "^".padStart(_)],
      ["|", R[x + 1]]
    ]);
  }
  return h + Oa([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, b[s - 1]],
    [`${o} |`, w],
    ["|", "^".padStart(A)],
    [`${o + 1} |`, b[s + 1]]
  ]);
}
function Oa(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function hf(e) {
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
class Io extends Error {
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
    const { nodes: o, source: c, positions: A, path: h, originalError: b, extensions: w } = hf(n);
    super(t), this.name = "GraphQLError", this.path = h ?? void 0, this.originalError = b ?? void 0, this.nodes = ka(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const x = ka(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((R) => R.loc).filter((R) => R != null)
    );
    this.source = c ?? (x == null || (s = x[0]) === null || s === void 0 ? void 0 : s.source), this.positions = A ?? (x == null ? void 0 : x.map((R) => R.start)), this.locations = A && c ? A.map((R) => Qi(c, R)) : x == null ? void 0 : x.map((R) => Qi(R.source, R.start));
    const _ = df(
      b == null ? void 0 : b.extensions
    ) ? b == null ? void 0 : b.extensions : void 0;
    this.extensions = (i = w ?? _) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), b != null && b.stack ? Object.defineProperty(this, "stack", {
      value: b.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Io) : Object.defineProperty(this, "stack", {
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

` + ff(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + T0(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function ka(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function ht(e, t, n) {
  return new Io(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class gf {
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
class F0 {
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
const M0 = {
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
}, pf = new Set(Object.keys(M0));
function Pa(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && pf.has(t);
}
var On;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(On || (On = {}));
var Ni;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Ni || (Ni = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function Di(e) {
  return e === 9 || e === 32;
}
function Cr(e) {
  return e >= 48 && e <= 57;
}
function L0(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function O0(e) {
  return L0(e) || e === 95;
}
function mf(e) {
  return L0(e) || Cr(e) || e === 95;
}
function wf(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const c = e[o], A = yf(c);
    A !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && A < n && (n = A));
  }
  return e.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function yf(e) {
  let t = 0;
  for (; t < e.length && Di(e.charCodeAt(t)); )
    ++t;
  return t;
}
function If(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((_) => _.length === 0 || Di(_.charCodeAt(0))), o = n.endsWith('\\"""'), c = e.endsWith('"') && !o, A = e.endsWith("\\"), h = c || A, b = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || h || i || o);
  let w = "";
  const x = s && Di(e.charCodeAt(0));
  return (b && !x || i) && (w += `
`), w += n, (b || h) && (w += `
`), '"""' + w + '"""';
}
var P;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(P || (P = {}));
class bf {
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
    const n = new F0(P.SOF, 0, 0, 0, 0);
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
          const n = Cf(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === P.COMMENT);
    return t;
  }
}
function Ef(e) {
  return e === P.BANG || e === P.DOLLAR || e === P.AMP || e === P.PAREN_L || e === P.PAREN_R || e === P.SPREAD || e === P.COLON || e === P.EQUALS || e === P.AT || e === P.BRACKET_L || e === P.BRACKET_R || e === P.BRACE_L || e === P.PIPE || e === P.BRACE_R;
}
function ir(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Ds(e, t) {
  return k0(e.charCodeAt(t)) && P0(e.charCodeAt(t + 1));
}
function k0(e) {
  return e >= 55296 && e <= 56319;
}
function P0(e) {
  return e >= 56320 && e <= 57343;
}
function Tn(e, t) {
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
  return new F0(t, n, r, i, o, s);
}
function Cf(e, t) {
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
        return Bf(e, s);
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
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? Qf(e, s) : _f(e, s);
    }
    if (Cr(i) || i === 45)
      return xf(e, s, i);
    if (O0(i))
      return Nf(e, s);
    throw ht(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : ir(i) || Ds(n, s) ? `Unexpected character: ${Tn(e, s)}.` : `Invalid character: ${Tn(e, s)}.`
    );
  }
  return ft(e, P.EOF, r, r);
}
function Bf(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (ir(i))
      ++s;
    else if (Ds(n, s))
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
function xf(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Cr(i))
      throw ht(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Tn(
          e,
          s
        )}.`
      );
  } else
    s = di(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = di(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = di(e, s, i), i = r.charCodeAt(s)), i === 46 || O0(i))
    throw ht(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Tn(
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
function di(e, t, n) {
  if (!Cr(n))
    throw ht(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Tn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; Cr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function _f(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), ft(e, P.STRING, t, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const A = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? vf(e, s) : Rf(e, s) : Sf(e, s);
      o += A.value, s += A.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (ir(c))
      ++s;
    else if (Ds(n, s))
      s += 2;
    else
      throw ht(
        e.source,
        s,
        `Invalid character within String: ${Tn(
          e,
          s
        )}.`
      );
  }
  throw ht(e.source, s, "Unterminated string.");
}
function vf(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !ir(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | hr(i), r < 0)
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
function Rf(e, t) {
  const n = e.source.body, r = Ua(n, t + 2);
  if (ir(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (k0(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Ua(n, t + 8);
    if (P0(s))
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
function Ua(e, t) {
  return hr(e.charCodeAt(t)) << 12 | hr(e.charCodeAt(t + 1)) << 8 | hr(e.charCodeAt(t + 2)) << 4 | hr(e.charCodeAt(t + 3));
}
function hr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Sf(e, t) {
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
function Qf(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, c = "";
  const A = [];
  for (; i < r; ) {
    const h = n.charCodeAt(i);
    if (h === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), A.push(c);
      const b = ft(
        e,
        P.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        wf(A).join(`
`)
      );
      return e.line += A.length - 1, e.lineStart = s, b;
    }
    if (h === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      c += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (h === 10 || h === 13) {
      c += n.slice(o, i), A.push(c), h === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, c = "", o = i, s = i;
      continue;
    }
    if (ir(h))
      ++i;
    else if (Ds(n, i))
      i += 2;
    else
      throw ht(
        e.source,
        i,
        `Invalid character within String: ${Tn(
          e,
          i
        )}.`
      );
  }
  throw ht(e.source, i, "Unterminated string.");
}
function Nf(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (mf(i))
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
function is(e, t) {
  if (!!!e)
    throw new Error(t);
}
const Df = 10, U0 = 2;
function bo(e) {
  return Ts(e, []);
}
function Ts(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Tf(e, t);
    default:
      return String(e);
  }
}
function Tf(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (Ff(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : Ts(r, n);
  } else if (Array.isArray(e))
    return Lf(e, n);
  return Mf(e, n);
}
function Ff(e) {
  return typeof e.toJSON == "function";
}
function Mf(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > U0 ? "[" + Of(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + Ts(i, t)
  ).join(", ") + " }";
}
function Lf(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > U0)
    return "[Array]";
  const n = Math.min(Df, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(Ts(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function Of(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const kf = (
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
        const o = bo(t);
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
class G0 {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || is(!1, `Body must be a string. Received: ${bo(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || is(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || is(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Pf(e) {
  return kf(e, G0);
}
function V0(e, t) {
  return new Dr(e, t).parseDocument();
}
function Uf(e, t) {
  const n = new Dr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(P.EOF), r;
}
function Gf(e, t) {
  const n = new Dr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(P.EOF), r;
}
function Vf(e, t) {
  const n = new Dr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(P.EOF), r;
}
class Dr {
  constructor(t, n = {}) {
    const r = Pf(t) ? t : new G0(t);
    this._lexer = new bf(r), this._options = n, this._tokenCounter = 0;
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
        operation: On.QUERY,
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
        return On.QUERY;
      case "mutation":
        return On.MUTATION;
      case "subscription":
        return On.SUBSCRIPTION;
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
        `${Xr(
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
    if (Object.prototype.hasOwnProperty.call(Ni, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new gf(
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
      `Expected ${z0(t)}, found ${Xr(n)}.`
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
        `Expected "${t}", found ${Xr(n)}.`
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
      `Unexpected ${Xr(n)}.`
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
function Xr(e) {
  const t = e.value;
  return z0(e.kind) + (t != null ? ` "${t}"` : "");
}
function z0(e) {
  return Ef(e) ? `"${e}"` : e;
}
const zf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: Dr,
  parse: V0,
  parseConstValue: Gf,
  parseType: Vf,
  parseValue: Uf
}, Symbol.toStringTag, { value: "Module" })), Hf = /* @__PURE__ */ Ji(zf);
function Yf(e) {
  return `"${e.replace(Xf, Wf)}"`;
}
const Xf = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Wf(e) {
  return Zf[e.charCodeAt(0)];
}
const Zf = [
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
], Jf = Object.freeze({});
function qf(e, t, n = M0) {
  const r = /* @__PURE__ */ new Map();
  for (const M of Object.values(ae))
    r.set(M, jf(t, M));
  let s, i = Array.isArray(e), o = [e], c = -1, A = [], h = e, b, w;
  const x = [], _ = [];
  do {
    c++;
    const M = c === o.length, G = M && A.length !== 0;
    if (M) {
      if (b = _.length === 0 ? void 0 : x[x.length - 1], h = w, w = _.pop(), G)
        if (i) {
          h = h.slice();
          let Z = 0;
          for (const [L, T] of A) {
            const k = L - Z;
            T === null ? (h.splice(k, 1), Z++) : h[k] = T;
          }
        } else {
          h = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(h)
          );
          for (const [Z, L] of A)
            h[Z] = L;
        }
      c = s.index, o = s.keys, A = s.edits, i = s.inArray, s = s.prev;
    } else if (w) {
      if (b = i ? c : o[c], h = w[b], h == null)
        continue;
      x.push(b);
    }
    let O;
    if (!Array.isArray(h)) {
      var R, C;
      Pa(h) || is(!1, `Invalid AST Node: ${bo(h)}.`);
      const Z = M ? (R = r.get(h.kind)) === null || R === void 0 ? void 0 : R.leave : (C = r.get(h.kind)) === null || C === void 0 ? void 0 : C.enter;
      if (O = Z == null ? void 0 : Z.call(t, h, b, w, x, _), O === Jf)
        break;
      if (O === !1) {
        if (!M) {
          x.pop();
          continue;
        }
      } else if (O !== void 0 && (A.push([b, O]), !M))
        if (Pa(O))
          h = O;
        else {
          x.pop();
          continue;
        }
    }
    if (O === void 0 && G && A.push([b, h]), M)
      x.pop();
    else {
      var F;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: A,
        prev: s
      }, i = Array.isArray(h), o = i ? h : (F = n[h.kind]) !== null && F !== void 0 ? F : [], c = -1, A = [], w && _.push(w), w = h;
    }
  } while (s !== void 0);
  return A.length !== 0 ? A[A.length - 1][1] : e;
}
function jf(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function H0(e) {
  return qf(e, Kf);
}
const $f = 80, Kf = {
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
      return o.length > $f && (o = i + pe(`(
`, os(te(n, `
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
    leave: ({ value: e, block: t }) => t ? If(e) : Yf(e)
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
`) + t + (Ga(n) ? pe(`(
`, os(te(n, `
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
`) + "directive @" + t + (Ga(n) ? pe(`(
`, os(te(n, `
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
`, os(te(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function os(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function Ga(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const eh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: H0
}, Symbol.toStringTag, { value: "Module" })), th = /* @__PURE__ */ Ji(eh);
var Eo = {}, Fs = {}, Y0 = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, nh = Y0, X0 = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof nh;
}, rh = X0, sh = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = rh);
  var s, i = /* @__PURE__ */ new Map();
  function o(b, w) {
    var x = i.get(w);
    x ? x.push.apply(x, b) : i.set(w, b);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var c = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(b, w) {
        return o(["" + c + w], b), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(b, w) {
        var x = e(b, "" + c + w, r);
        return x.files.forEach(o), x.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var A in t) {
        var h = e(t[A], "" + c + A, r);
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
Fs.ReactNativeFile = Y0;
Fs.extractFiles = sh;
Fs.isExtractableFile = X0;
var ih = typeof self == "object" ? self.FormData : window.FormData, Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.defaultJsonSerializer = void 0;
Tr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var oh = be && be.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Eo, "__esModule", { value: !0 });
var W0 = Fs, ah = oh(ih), ch = Tr, uh = function(e) {
  return W0.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function dh(e, t, n, r) {
  r === void 0 && (r = ch.defaultJsonSerializer);
  var s = W0.extractFiles({ query: e, variables: t, operationName: n }, "", uh), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var c = e.reduce(function(x, _, R) {
      return x.push({ query: _, variables: t ? t[R] : void 0 }), x;
    }, []);
    return r.stringify(c);
  }
  var A = typeof FormData > "u" ? ah.default : FormData, h = new A();
  h.append("operations", r.stringify(i));
  var b = {}, w = 0;
  return o.forEach(function(x) {
    b[++w] = x;
  }), h.append("map", r.stringify(b)), w = 0, o.forEach(function(x, _) {
    h.append("" + ++w, _);
  }), h;
}
Eo.default = dh;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.parseBatchRequestsExtendedArgs = Et.parseRawRequestExtendedArgs = Et.parseRequestExtendedArgs = Et.parseBatchRequestArgs = Et.parseRawRequestArgs = Et.parseRequestArgs = void 0;
function Ah(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Et.parseRequestArgs = Ah;
function lh(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Et.parseRawRequestArgs = lh;
function fh(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Et.parseBatchRequestArgs = fh;
function hh(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Et.parseRequestExtendedArgs = hh;
function gh(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Et.parseRawRequestExtendedArgs = gh;
function ph(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
Et.parseBatchRequestsExtendedArgs = ph;
var Fr = {}, mh = be && be.__extends || /* @__PURE__ */ function() {
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
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.ClientError = void 0;
var wh = (
  /** @class */
  function(e) {
    mh(t, e);
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
Fr.ClientError = wh;
var ur = {}, Va;
function yh() {
  if (Va)
    return ur;
  Va = 1;
  var e = be && be.__assign || function() {
    return e = Object.assign || function(L) {
      for (var T, k = 1, U = arguments.length; k < U; k++) {
        T = arguments[k];
        for (var q in T)
          Object.prototype.hasOwnProperty.call(T, q) && (L[q] = T[q]);
      }
      return L;
    }, e.apply(this, arguments);
  }, t = be && be.__awaiter || function(L, T, k, U) {
    function q(Y) {
      return Y instanceof k ? Y : new k(function(W) {
        W(Y);
      });
    }
    return new (k || (k = Promise))(function(Y, W) {
      function ee(u) {
        try {
          a(U.next(u));
        } catch (l) {
          W(l);
        }
      }
      function E(u) {
        try {
          a(U.throw(u));
        } catch (l) {
          W(l);
        }
      }
      function a(u) {
        u.done ? Y(u.value) : q(u.value).then(ee, E);
      }
      a((U = U.apply(L, T || [])).next());
    });
  }, n = be && be.__generator || function(L, T) {
    var k = { label: 0, sent: function() {
      if (Y[0] & 1)
        throw Y[1];
      return Y[1];
    }, trys: [], ops: [] }, U, q, Y, W;
    return W = { next: ee(0), throw: ee(1), return: ee(2) }, typeof Symbol == "function" && (W[Symbol.iterator] = function() {
      return this;
    }), W;
    function ee(a) {
      return function(u) {
        return E([a, u]);
      };
    }
    function E(a) {
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
          a = T.call(L, k);
        } catch (u) {
          a = [6, u], q = 0;
        } finally {
          U = Y = 0;
        }
      if (a[0] & 5)
        throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(ur, "__esModule", { value: !0 }), ur.GraphQLWebSocketClient = void 0;
  var r = Fr, s = Z0(), i = "connection_init", o = "connection_ack", c = "ping", A = "pong", h = "subscribe", b = "next", w = "error", x = "complete", _ = (
    /** @class */
    function() {
      function L(T, k, U) {
        this._type = T, this._payload = k, this._id = U;
      }
      return Object.defineProperty(L.prototype, "type", {
        get: function() {
          return this._type;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(L.prototype, "id", {
        get: function() {
          return this._id;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(L.prototype, "payload", {
        get: function() {
          return this._payload;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(L.prototype, "text", {
        get: function() {
          var T = { type: this.type };
          return this.id != null && this.id != null && (T.id = this.id), this.payload != null && this.payload != null && (T.payload = this.payload), JSON.stringify(T);
        },
        enumerable: !1,
        configurable: !0
      }), L.parse = function(T, k) {
        var U = JSON.parse(T), q = U.type, Y = U.payload, W = U.id;
        return new L(q, k(Y), W);
      }, L;
    }()
  ), R = (
    /** @class */
    function() {
      function L(T, k) {
        var U = this, q = k.onInit, Y = k.onAcknowledged, W = k.onPing, ee = k.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = T, T.onopen = function(E) {
          return t(U, void 0, void 0, function() {
            var a, u, l, p;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, u = (a = T).send, l = F, q ? [4, q()] : [3, 2];
                case 1:
                  return p = f.sent(), [3, 3];
                case 2:
                  p = null, f.label = 3;
                case 3:
                  return u.apply(a, [l.apply(void 0, [p]).text]), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, T.onclose = function(E) {
          U.socketState.acknowledged = !1, U.socketState.subscriptions = {};
        }, T.onerror = function(E) {
          console.error(E);
        }, T.onmessage = function(E) {
          try {
            var a = C(E.data);
            switch (a.type) {
              case o: {
                U.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (U.socketState.acknowledged = !0, Y && Y(a.payload));
                return;
              }
              case c: {
                W ? W(a.payload).then(function(y) {
                  return T.send(G(y).text);
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
            var u = U.socketState.subscriptions[a.id], l = u.query, p = u.variables, f = u.subscriber;
            switch (a.type) {
              case b: {
                !a.payload.errors && a.payload.data && f.next && f.next(a.payload.data), a.payload.errors && f.error && f.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: l, variables: p }));
                return;
              }
              case w: {
                f.error && f.error(new r.ClientError({ errors: a.payload, status: 200 }, { query: l, variables: p }));
                return;
              }
              case x: {
                f.complete && f.complete(), delete U.socketState.subscriptions[a.id];
                return;
              }
            }
          } catch (y) {
            console.error(y), T.close(1006);
          }
          T.close(4400, "Unknown graphql-ws message.");
        };
      }
      return L.prototype.makeSubscribe = function(T, k, U, q) {
        var Y = this, W = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[W] = { query: T, variables: U, subscriber: q }, this.socket.send(O(W, { query: T, operationName: k, variables: U }).text), function() {
          Y.socket.send(Z(W).text), delete Y.socketState.subscriptions[W];
        };
      }, L.prototype.rawRequest = function(T, k) {
        var U = this;
        return new Promise(function(q, Y) {
          var W;
          U.rawSubscribe(T, {
            next: function(ee, E) {
              return W = { data: ee, extensions: E };
            },
            error: Y,
            complete: function() {
              return q(W);
            }
          }, k);
        });
      }, L.prototype.request = function(T, k) {
        var U = this;
        return new Promise(function(q, Y) {
          var W;
          U.subscribe(T, {
            next: function(ee) {
              return W = ee;
            },
            error: Y,
            complete: function() {
              return q(W);
            }
          }, k);
        });
      }, L.prototype.subscribe = function(T, k, U) {
        var q = s.resolveRequestDocument(T), Y = q.query, W = q.operationName;
        return this.makeSubscribe(Y, W, U, k);
      }, L.prototype.rawSubscribe = function(T, k, U) {
        return this.makeSubscribe(T, void 0, U, k);
      }, L.prototype.ping = function(T) {
        this.socket.send(M(T).text);
      }, L.prototype.close = function() {
        this.socket.close(1e3);
      }, L.PROTOCOL = "graphql-transport-ws", L;
    }()
  );
  ur.GraphQLWebSocketClient = R;
  function C(L, T) {
    T === void 0 && (T = function(U) {
      return U;
    });
    var k = _.parse(L, T);
    return k;
  }
  function F(L) {
    return new _(i, L);
  }
  function M(L) {
    return new _(c, L, void 0);
  }
  function G(L) {
    return new _(A, L, void 0);
  }
  function O(L, T) {
    return new _(h, T, L);
  }
  function Z(L) {
    return new _(x, void 0, L);
  }
  return ur;
}
var za;
function Z0() {
  return za || (za = 1, function(e) {
    var t = be && be.__assign || function() {
      return t = Object.assign || function(f) {
        for (var y, I = 1, g = arguments.length; I < g; I++) {
          y = arguments[I];
          for (var d in y)
            Object.prototype.hasOwnProperty.call(y, d) && (f[d] = y[d]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = be && be.__createBinding || (Object.create ? function(f, y, I, g) {
      g === void 0 && (g = I), Object.defineProperty(f, g, { enumerable: !0, get: function() {
        return y[I];
      } });
    } : function(f, y, I, g) {
      g === void 0 && (g = I), f[g] = y[I];
    }), r = be && be.__setModuleDefault || (Object.create ? function(f, y) {
      Object.defineProperty(f, "default", { enumerable: !0, value: y });
    } : function(f, y) {
      f.default = y;
    }), s = be && be.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var y = {};
      if (f != null)
        for (var I in f)
          I !== "default" && Object.prototype.hasOwnProperty.call(f, I) && n(y, f, I);
      return r(y, f), y;
    }, i = be && be.__awaiter || function(f, y, I, g) {
      function d(m) {
        return m instanceof I ? m : new I(function(X) {
          X(m);
        });
      }
      return new (I || (I = Promise))(function(m, X) {
        function J(re) {
          try {
            j(g.next(re));
          } catch (se) {
            X(se);
          }
        }
        function K(re) {
          try {
            j(g.throw(re));
          } catch (se) {
            X(se);
          }
        }
        function j(re) {
          re.done ? m(re.value) : d(re.value).then(J, K);
        }
        j((g = g.apply(f, y || [])).next());
      });
    }, o = be && be.__generator || function(f, y) {
      var I = { label: 0, sent: function() {
        if (m[0] & 1)
          throw m[1];
        return m[1];
      }, trys: [], ops: [] }, g, d, m, X;
      return X = { next: J(0), throw: J(1), return: J(2) }, typeof Symbol == "function" && (X[Symbol.iterator] = function() {
        return this;
      }), X;
      function J(j) {
        return function(re) {
          return K([j, re]);
        };
      }
      function K(j) {
        if (g)
          throw new TypeError("Generator is already executing.");
        for (; I; )
          try {
            if (g = 1, d && (m = j[0] & 2 ? d.return : j[0] ? d.throw || ((m = d.return) && m.call(d), 0) : d.next) && !(m = m.call(d, j[1])).done)
              return m;
            switch (d = 0, m && (j = [j[0] & 2, m.value]), j[0]) {
              case 0:
              case 1:
                m = j;
                break;
              case 4:
                return I.label++, { value: j[1], done: !1 };
              case 5:
                I.label++, d = j[1], j = [0];
                continue;
              case 7:
                j = I.ops.pop(), I.trys.pop();
                continue;
              default:
                if (m = I.trys, !(m = m.length > 0 && m[m.length - 1]) && (j[0] === 6 || j[0] === 2)) {
                  I = 0;
                  continue;
                }
                if (j[0] === 3 && (!m || j[1] > m[0] && j[1] < m[3])) {
                  I.label = j[1];
                  break;
                }
                if (j[0] === 6 && I.label < m[1]) {
                  I.label = m[1], m = j;
                  break;
                }
                if (m && I.label < m[2]) {
                  I.label = m[2], I.ops.push(j);
                  break;
                }
                m[2] && I.ops.pop(), I.trys.pop();
                continue;
            }
            j = y.call(f, I);
          } catch (re) {
            j = [6, re], d = 0;
          } finally {
            g = m = 0;
          }
        if (j[0] & 5)
          throw j[1];
        return { value: j[0] ? j[1] : void 0, done: !0 };
      }
    }, c = be && be.__rest || function(f, y) {
      var I = {};
      for (var g in f)
        Object.prototype.hasOwnProperty.call(f, g) && y.indexOf(g) < 0 && (I[g] = f[g]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var d = 0, g = Object.getOwnPropertySymbols(f); d < g.length; d++)
          y.indexOf(g[d]) < 0 && Object.prototype.propertyIsEnumerable.call(f, g[d]) && (I[g[d]] = f[g[d]]);
      return I;
    }, A = be && be.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var h = s(uf), b = h, w = Hf, x = th, _ = A(Eo), R = Tr, C = Et, F = Fr;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return F.ClientError;
    } });
    var M = function(f) {
      var y = {};
      return f && (typeof Headers < "u" && f instanceof Headers || b && b.Headers && f instanceof b.Headers ? y = l(f) : Array.isArray(f) ? f.forEach(function(I) {
        var g = I[0], d = I[1];
        y[g] = d;
      }) : y = f), y;
    }, G = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, O = function(f) {
      var y = f.query, I = f.variables, g = f.operationName, d = f.jsonSerializer;
      if (!Array.isArray(y)) {
        var m = ["query=" + encodeURIComponent(G(y))];
        return I && m.push("variables=" + encodeURIComponent(d.stringify(I))), g && m.push("operationName=" + encodeURIComponent(g)), m.join("&");
      }
      if (typeof I < "u" && !Array.isArray(I))
        throw new Error("Cannot create query with given variable type, array expected");
      var X = y.reduce(function(J, K, j) {
        return J.push({
          query: G(K),
          variables: I ? d.stringify(I[j]) : void 0
        }), J;
      }, []);
      return "query=" + encodeURIComponent(d.stringify(X));
    }, Z = function(f) {
      var y = f.url, I = f.query, g = f.variables, d = f.operationName, m = f.headers, X = f.fetch, J = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var j, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return j = _.default(I, g, d, J.jsonSerializer), re = t({ method: "POST", headers: t(t({}, typeof j == "string" ? { "Content-Type": "application/json" } : {}), m), body: j }, J), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, X(y, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, L = function(f) {
      var y = f.url, I = f.query, g = f.variables, d = f.operationName, m = f.headers, X = f.fetch, J = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var j, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return j = O({
                query: I,
                variables: g,
                operationName: d,
                jsonSerializer: J.jsonSerializer
              }), re = t({ method: "GET", headers: m }, J), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, X(y + "?" + j, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, T = (
      /** @class */
      function() {
        function f(y, I) {
          I === void 0 && (I = {}), this.url = y, this.options = I;
        }
        return f.prototype.rawRequest = function(y, I, g) {
          return i(this, void 0, void 0, function() {
            var d, m, X, J, K, j, re, se, Se, fe, oe, _e;
            return o(this, function(Ae) {
              return d = C.parseRawRequestArgs(y, I, g), m = this.options, X = m.headers, J = m.fetch, K = J === void 0 ? h.default : J, j = m.method, re = j === void 0 ? "POST" : j, se = m.requestMiddleware, Se = m.responseMiddleware, fe = c(m, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, d.signal !== void 0 && (fe.signal = d.signal), _e = E(d.query).operationName, [2, k({
                url: oe,
                query: d.query,
                variables: d.variables,
                headers: t(t({}, M(a(X))), M(d.requestHeaders)),
                operationName: _e,
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
        }, f.prototype.request = function(y) {
          for (var I = [], g = 1; g < arguments.length; g++)
            I[g - 1] = arguments[g];
          var d = I[0], m = I[1], X = C.parseRequestArgs(y, d, m), J = this.options, K = J.headers, j = J.fetch, re = j === void 0 ? h.default : j, se = J.method, Se = se === void 0 ? "POST" : se, fe = J.requestMiddleware, oe = J.responseMiddleware, _e = c(J, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), Ae = this.url;
          X.signal !== void 0 && (_e.signal = X.signal);
          var he = E(X.document), Ft = he.query, ve = he.operationName;
          return k({
            url: Ae,
            query: Ft,
            variables: X.variables,
            headers: t(t({}, M(a(K))), M(X.requestHeaders)),
            operationName: ve,
            fetch: re,
            method: Se,
            fetchOptions: _e,
            middleware: fe
          }).then(function(ye) {
            return oe && oe(ye), ye.data;
          }).catch(function(ye) {
            throw oe && oe(ye), ye;
          });
        }, f.prototype.batchRequests = function(y, I) {
          var g = C.parseBatchRequestArgs(y, I), d = this.options, m = d.headers, X = d.fetch, J = X === void 0 ? h.default : X, K = d.method, j = K === void 0 ? "POST" : K, re = d.requestMiddleware, se = d.responseMiddleware, Se = c(d, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), fe = this.url;
          g.signal !== void 0 && (Se.signal = g.signal);
          var oe = g.documents.map(function(Ae) {
            var he = Ae.document;
            return E(he).query;
          }), _e = g.documents.map(function(Ae) {
            var he = Ae.variables;
            return he;
          });
          return k({
            url: fe,
            query: oe,
            variables: _e,
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
        }, f.prototype.setHeaders = function(y) {
          return this.options.headers = y, this;
        }, f.prototype.setHeader = function(y, I) {
          var g, d = this.options.headers;
          return d ? d[y] = I : this.options.headers = (g = {}, g[y] = I, g), this;
        }, f.prototype.setEndpoint = function(y) {
          return this.url = y, this;
        }, f;
      }()
    );
    e.GraphQLClient = T;
    function k(f) {
      var y = f.url, I = f.query, g = f.variables, d = f.headers, m = f.operationName, X = f.fetch, J = f.method, K = J === void 0 ? "POST" : J, j = f.fetchOptions, re = f.middleware;
      return i(this, void 0, void 0, function() {
        var se, Se, fe, oe, _e, Ae, he, Ft, ve, ye, ar;
        return o(this, function(Qe) {
          switch (Qe.label) {
            case 0:
              return se = K.toUpperCase() === "POST" ? Z : L, Se = Array.isArray(I), [4, se({
                url: y,
                query: I,
                variables: g,
                operationName: m,
                headers: d,
                fetch: X,
                fetchOptions: j,
                middleware: re
              })];
            case 1:
              return fe = Qe.sent(), [4, W(fe, j.jsonSerializer)];
            case 2:
              if (oe = Qe.sent(), _e = Se && Array.isArray(oe) ? !oe.some(function(Te) {
                var Pr = Te.data;
                return !Pr;
              }) : !!oe.data, Ae = !oe.errors || j.errorPolicy === "all" || j.errorPolicy === "ignore", fe.ok && Ae && _e)
                return he = fe.headers, Ft = fe.status, oe.errors, ve = c(oe, ["errors"]), ye = j.errorPolicy === "ignore" ? ve : oe, [2, t(t({}, Se ? { data: ye } : ye), { headers: he, status: Ft })];
              throw ar = typeof oe == "string" ? { error: oe } : oe, new F.ClientError(t(t({}, ar), { status: fe.status, headers: fe.headers }), { query: I, variables: g });
          }
        });
      });
    }
    function U(f, y, I, g) {
      return i(this, void 0, void 0, function() {
        var d, m;
        return o(this, function(X) {
          return d = C.parseRawRequestExtendedArgs(f, y, I, g), m = new T(d.url), [2, m.rawRequest(t({}, d))];
        });
      });
    }
    e.rawRequest = U;
    function q(f, y) {
      for (var I = [], g = 2; g < arguments.length; g++)
        I[g - 2] = arguments[g];
      return i(this, void 0, void 0, function() {
        var d, m, X, J;
        return o(this, function(K) {
          return d = I[0], m = I[1], X = C.parseRequestExtendedArgs(f, y, d, m), J = new T(X.url), [2, J.request(t({}, X))];
        });
      });
    }
    e.request = q;
    function Y(f, y, I) {
      return i(this, void 0, void 0, function() {
        var g, d;
        return o(this, function(m) {
          return g = C.parseBatchRequestsExtendedArgs(f, y, I), d = new T(g.url), [2, d.batchRequests(t({}, g))];
        });
      });
    }
    e.batchRequests = Y, e.default = q;
    function W(f, y) {
      return y === void 0 && (y = R.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var I, g, d;
        return o(this, function(m) {
          switch (m.label) {
            case 0:
              return f.headers.forEach(function(X, J) {
                J.toLowerCase() === "content-type" && (I = X);
              }), I && I.toLowerCase().startsWith("application/json") ? (d = (g = y).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, d.apply(g, [m.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function ee(f) {
      var y, I = void 0, g = f.definitions.filter(function(d) {
        return d.kind === "OperationDefinition";
      });
      return g.length === 1 && (I = (y = g[0].name) === null || y === void 0 ? void 0 : y.value), I;
    }
    function E(f) {
      if (typeof f == "string") {
        var y = void 0;
        try {
          var I = w.parse(f);
          y = ee(I);
        } catch {
        }
        return { query: f, operationName: y };
      }
      var g = ee(f);
      return { query: x.print(f), operationName: g };
    }
    e.resolveRequestDocument = E;
    function a(f) {
      return typeof f == "function" ? f() : f;
    }
    function u(f) {
      for (var y = [], I = 1; I < arguments.length; I++)
        y[I - 1] = arguments[I];
      return f.reduce(function(g, d, m) {
        return "" + g + d + (m in y ? y[m] : "");
      }, "");
    }
    e.gql = u;
    function l(f) {
      var y = {};
      return f.forEach(function(I, g) {
        y[g] = I;
      }), y;
    }
    var p = yh();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return p.GraphQLWebSocketClient;
    } });
  }(ui)), ui;
}
var Ih = Z0(), Is = function() {
  return Is = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Is.apply(this, arguments);
};
var as = /* @__PURE__ */ new Map(), Ti = /* @__PURE__ */ new Map(), J0 = !0, bs = !1;
function q0(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function bh(e) {
  return q0(e.source.body.substring(e.start, e.end));
}
function Eh(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = bh(r.loc), o = Ti.get(s);
      o && !o.has(i) ? J0 && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Ti.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), Is(Is({}, e), { definitions: n });
}
function Ch(e) {
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
function Bh(e) {
  var t = q0(e);
  if (!as.has(t)) {
    var n = V0(e, {
      experimentalFragmentVariables: bs,
      allowLegacyFragmentVariables: bs
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    as.set(t, Ch(Eh(n)));
  }
  return as.get(t);
}
function er(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), Bh(r);
}
function xh() {
  as.clear(), Ti.clear();
}
function _h() {
  J0 = !1;
}
function vh() {
  bs = !0;
}
function Rh() {
  bs = !1;
}
var dr = {
  gql: er,
  resetCaches: xh,
  disableFragmentWarnings: _h,
  enableExperimentalFragmentVariables: vh,
  disableExperimentalFragmentVariables: Rh
};
(function(e) {
  e.gql = dr.gql, e.resetCaches = dr.resetCaches, e.disableFragmentWarnings = dr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = dr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = dr.disableExperimentalFragmentVariables;
})(er || (er = {}));
er.default = er;
const ne = er;
var Ne = "0x0000000000000000000000000000000000000000000000000000000000000000", Sy = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Qy = 16 * 1024, Ny = 16, Dy = 1024 * 1024 * 1024, Ty = 1024 * 1024 * 1024, Fy = 255, My = 1024 * 1024, Ly = 1024 * 1024, Sh = "0xffffffffffff0000", j0 = "0xffffffffffff0001", Qh = "0xffffffffffff0003", Nh = "0xffffffffffff0004", Dh = "0xffffffffffff0005", Oy = "0x0", Th = [
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
], Fh = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let Q;
const $0 = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && $0.decode();
let gr = null;
function K0() {
  return (gr === null || gr.byteLength === 0) && (gr = new Uint8Array(Q.memory.buffer)), gr;
}
function Mh(e, t) {
  return e = e >>> 0, $0.decode(K0().subarray(e, e + t));
}
function eu(e) {
  const t = Q.ret(e);
  return Vt.__wrap(t);
}
function Ha(e, t, n, r) {
  const s = Q.call(e, t, n, r);
  return Vt.__wrap(s);
}
function Lh(e, t, n) {
  const r = Q.tr(e, t, n);
  return Vt.__wrap(r);
}
function Ya(e, t, n) {
  const r = Q.addi(e, t, n);
  return Vt.__wrap(r);
}
function Fi(e, t, n) {
  const r = Q.lw(e, t, n);
  return Vt.__wrap(r);
}
function Oh(e, t, n) {
  const r = Q.gtf(e, t, n);
  return Vt.__wrap(r);
}
function Wr(e, t) {
  const n = Q.movi(e, t);
  return Vt.__wrap(n);
}
let pr = null;
function Xa() {
  return (pr === null || pr.byteLength === 0) && (pr = new Int32Array(Q.memory.buffer)), pr;
}
function kh(e, t) {
  return e = e >>> 0, K0().subarray(e / 1, e / 1 + t);
}
const Ph = Object.freeze({
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
const Wa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => Q.__wbg_instruction_free(e >>> 0));
class Vt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Vt.prototype);
    return n.__wbg_ptr = t, Wa.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wa.unregister(this), t;
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
      var t = Xa()[s / 4 + 0], n = Xa()[s / 4 + 1], r = kh(t, n).slice();
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
const Za = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => Q.__wbg_regid_free(e >>> 0));
class Le {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Le.prototype);
    return n.__wbg_ptr = t, Za.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Za.unregister(this), t;
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
    return n === 0 ? void 0 : Le.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = Q.regid_bal();
    return Le.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = Q.regid_cgas();
    return Le.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = Q.regid_err();
    return Le.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = Q.regid_flag();
    return Le.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = Q.regid_fp();
    return Le.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = Q.regid_ggas();
    return Le.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = Q.regid_hp();
    return Le.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = Q.regid_is();
    return Le.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = Q.regid_of();
    return Le.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = Q.regid_one();
    return Le.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = Q.regid_pc();
    return Le.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = Q.regid_ret();
    return Le.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = Q.regid_retl();
    return Le.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = Q.regid_sp();
    return Le.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = Q.regid_spp();
    return Le.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = Q.regid_writable();
    return Le.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = Q.regid_zero();
    return Le.__wrap(t);
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
async function Uh(e, t) {
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
function Gh() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(Mh(t, n));
  }, e;
}
function Vh(e, t) {
  return Q = e.exports, tu.__wbindgen_wasm_module = t, pr = null, gr = null, Q;
}
async function tu(e) {
  if (Q !== void 0)
    return Q;
  const t = Gh(), { instance: n, module: r } = await Uh(await e, t);
  return Vh(n, r);
}
function zh(e, t, n, r) {
  function s(w, x, _) {
    var R = _ ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, C = _ ? WebAssembly.compileStreaming : WebAssembly.compile;
    return x ? R(w, x) : C(w);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var c = globalThis.atob(n), A = c.length;
    i = new Uint8Array(new ArrayBuffer(A));
    for (var h = 0; h < A; h++)
      i[h] = c.charCodeAt(h);
  }
  if (e) {
    var b = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(b, r) : b;
  } else
    return s(i, r, !1);
}
function Hh(e) {
  return zh(1, null, "AGFzbQEAAAABQAtgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38Bf2AAAX9gAn9/AGABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX8CGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABQP7AfkBAQMKBgEFBQUBBQEBAQEBAQECBQICAQEDAgICAgUCAwMDAwMDAwIBBQEFAAMDAwMDAwMDAwMDAQABAQUFAQEBAQEBAQEBAQIBBQUFAwIBAAABAQEFAgIBAQYABgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGAwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEDBgADAQEBBwICAAIABgEEAwEDBQgBCQkDAwMFAQEBBgYGBgQEBAQEBAQEBAQEBAQEBAQEBAQGBwcCAgIDBwcACAADBAUBcAEHBwUDAQARBgkBfwFBgIDAAAsHxEvBBQZtZW1vcnkCABZfX3diZ19jb21wYXJlYXJnc19mcmVlAHcaX193YmdfZ2V0X2NvbXBhcmVhcmdzX21vZGUAORpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQAoIl9fd2JnX2dldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMAOiJfX3diZ19zZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzADsSY29tcGFyZWFyZ3NfdG9faW1tAEgUY29tcGFyZWFyZ3NfZnJvbV9pbW0AKRVfX3diZ19nZXRfbWF0aGFyZ3Nfb3AAORVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AAKhJfX3diZ19tdWxhcmdzX2ZyZWUAeB5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAOR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAPBJfX3diZ19kaXZhcmdzX2ZyZWUA1gEeX193YmdfZ2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK0BIXBhbmljaW5zdHJ1Y3Rpb25fZXJyb3JfdHlwZXNjcmlwdABMF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAD4ccGFuaWNpbnN0cnVjdGlvbl9pbnN0cnVjdGlvbgA/DGdtX2Zyb21fYXJncwDJAQ1ndGZfZnJvbV9hcmdzAMEBB2dtX2FyZ3MAeQhndGZfYXJncwBaDndkY21fZnJvbV9hcmdzACYOd2RvcF9mcm9tX2FyZ3MAJg53ZG1sX2Zyb21fYXJncwAeDndkZHZfZnJvbV9hcmdzAL8BCXdkY21fYXJncwAZCXdxY21fYXJncwAaCXdkb3BfYXJncwAbCXdxb3BfYXJncwAcCXdkbWxfYXJncwAUCXdxbWxfYXJncwAVCXdkZHZfYXJncwBVCXdxZHZfYXJncwBWEF9fd2JnX2ltbTA2X2ZyZWUA1wEQX193YmdfaW1tMTJfZnJlZQDYARBfX3diZ19pbW0xOF9mcmVlANkBDl9fd2JnX2FkZF9mcmVlALgBD19fd2JnX25vb3BfZnJlZQBbEmFkZF9uZXdfdHlwZXNjcmlwdABPBmFkZF9yYQAWBmFkZF9yYgALBmFkZF9yYwAPA2FkZAC5AQNhbmQAewNkaXYAfAJlcQB9A2V4cAB+Amd0AH8CbHQAgAEEbWxvZwCBAQRtcm9vAIIBBG1vZF8AgwEFbW92ZV8ALANtdWwAhAEDbm90AC0Cb3IAhQEDc2xsAIYBA3NybACHAQNzdWIAiAEDeG9yAIkBBG1sZHYAXANyZXQArgEEcmV0ZAAuE2Fsb2NfbmV3X3R5cGVzY3JpcHQAVwdhbG9jX3JhAE4EYWxvYwCvAQNtY2wALwNtY3AAigEDbWVxAF0TYmhzaF9uZXdfdHlwZXNjcmlwdAAfBGJoc2gAMARiaGVpALABBGJ1cm4AMRNjYWxsX25ld190eXBlc2NyaXB0AE0HY2FsbF9yZAAXBGNhbGwAXgNjY3AAXwRjcm9vADIEY3NpegAzAmNiALEBA2xkYwCLAQNsb2cAYARsb2dkAGEEbWludAA0BHJ2cnQAsgEEc2N3cQCMAQNzcncAjQEEc3J3cQBiA3N3dwCOAQRzd3dxAGMCdHIAjwEDdHJvAGQEZWNrMQCQAQRlY3IxAJEBBGVkMTkAkgEEazI1NgCTAQRzMjU2AJQBBHRpbWUANRNub29wX25ld190eXBlc2NyaXB0AMYBBG5vb3AA2gEEZmxhZwCzAQNiYWwAlQEDam1wALQBA2puZQCWAQNzbW8AZRNhZGRpX25ld190eXBlc2NyaXB0AFAKYWRkaV9pbW0xMgAMBGFkZGkAlwEEYW5kaQCYAQRkaXZpAJkBBGV4cGkAmgEEbW9kaQCbAQRtdWxpAJwBA29yaQCdAQRzbGxpAJ4BBHNybGkAnwEEc3ViaQCgAQR4b3JpAKEBBGpuZWkAogECbGIAowECbHcApAECc2IApQECc3cApgEEbWNwaQCnARJndGZfbmV3X3R5cGVzY3JpcHQAwwEDZ3RmAKgBBG1jbGkAIBFnbV9uZXdfdHlwZXNjcmlwdAA2CGdtX2ltbTE4AAkCZ20AIQRtb3ZpACIEam56aQAjBGptcGYAJBNqbXBiX25ld190eXBlc2NyaXB0ABgEam1wYgAlBGpuemYAqQEEam56YgCqAQRqbmVmAGYKam5lYl9pbW0wNgAXBGpuZWIAZwJqaQBAE2NmZWlfbmV3X3R5cGVzY3JpcHQANwpjZmVpX2ltbTI0ACcEY2ZlaQBBBGNmc2kAQgNjZmUAtQEDY2ZzALYBBHBzaGwAQwRwc2hoAEQEcG9wbABFBHBvcGgARhN3ZGNtX25ld190eXBlc2NyaXB0AMABBHdkY20AaAR3cWNtAGkEd2RvcABqBHdxb3AAawR3ZG1sAGwEd3FtbABtBHdkZHYAbgR3cWR2AG8Ed2RtZABwBHdxbWQAcQR3ZGFtAHIEd3FhbQBzBHdkbW0AdAR3cW1tAHUEZWNhbAB2Fl9fd2JnX2luc3RydWN0aW9uX2ZyZWUAWRRpbnN0cnVjdGlvbl90b19ieXRlcwAKEGluc3RydWN0aW9uX3NpemUA7AERcmVnaWRfbmV3X2NoZWNrZWQAqwEJcmVnaWRfYmFsANsBCnJlZ2lkX2NnYXMA3AEJcmVnaWRfZXJyAN0BCnJlZ2lkX2ZsYWcA3gEIcmVnaWRfZnAA3wEKcmVnaWRfZ2dhcwDgAQhyZWdpZF9ocADhAQhyZWdpZF9pcwDiAQhyZWdpZF9vZgDjAQlyZWdpZF9vbmUA5AEIcmVnaWRfcGMA5QEJcmVnaWRfcmV0AOYBCnJlZ2lkX3JldGwA5wEIcmVnaWRfc3AA6AEJcmVnaWRfc3BwAOkBDnJlZ2lkX3dyaXRhYmxlAOoBCnJlZ2lkX3plcm8A6wEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA0wELcmVnaWRfdG9fdTgA1AETbW92aV9uZXdfdHlwZXNjcmlwdAAYE21jbGlfbmV3X3R5cGVzY3JpcHQAGBNqbnppX25ld190eXBlc2NyaXB0ABgTam1wZl9uZXdfdHlwZXNjcmlwdAAYEm5vdF9uZXdfdHlwZXNjcmlwdAAfE3JldGRfbmV3X3R5cGVzY3JpcHQAHxNtb3ZlX25ld190eXBlc2NyaXB0AB8SbWNsX25ld190eXBlc2NyaXB0AB8TYnVybl9uZXdfdHlwZXNjcmlwdAAfE2Nyb29fbmV3X3R5cGVzY3JpcHQAHxNjc2l6X25ld190eXBlc2NyaXB0AB8TbWludF9uZXdfdHlwZXNjcmlwdAAfE3RpbWVfbmV3X3R5cGVzY3JpcHQAHxJyZXRfbmV3X3R5cGVzY3JpcHQAVxNiaGVpX25ld190eXBlc2NyaXB0AFcRY2JfbmV3X3R5cGVzY3JpcHQAVxNydnJ0X25ld190eXBlc2NyaXB0AFcTZmxhZ19uZXdfdHlwZXNjcmlwdABXEmptcF9uZXdfdHlwZXNjcmlwdABXEmNmZV9uZXdfdHlwZXNjcmlwdABXEmNmc19uZXdfdHlwZXNjcmlwdABXE21sZHZfbmV3X3R5cGVzY3JpcHQATRJtZXFfbmV3X3R5cGVzY3JpcHQATRJjY3BfbmV3X3R5cGVzY3JpcHQATRJsb2dfbmV3X3R5cGVzY3JpcHQATRNsb2dkX25ld190eXBlc2NyaXB0AE0Tc3J3cV9uZXdfdHlwZXNjcmlwdABNE3N3d3FfbmV3X3R5cGVzY3JpcHQATRJ0cm9fbmV3X3R5cGVzY3JpcHQATRJzbW9fbmV3X3R5cGVzY3JpcHQATRNqbmVmX25ld190eXBlc2NyaXB0AE0Td2RtZF9uZXdfdHlwZXNjcmlwdABNE3dxbWRfbmV3X3R5cGVzY3JpcHQATRN3ZGFtX25ld190eXBlc2NyaXB0AE0Td3FhbV9uZXdfdHlwZXNjcmlwdABNE3dkbW1fbmV3X3R5cGVzY3JpcHQATRN3cW1tX25ld190eXBlc2NyaXB0AE0TZWNhbF9uZXdfdHlwZXNjcmlwdABNEmFuZF9uZXdfdHlwZXNjcmlwdABPEmRpdl9uZXdfdHlwZXNjcmlwdABPEWVxX25ld190eXBlc2NyaXB0AE8SZXhwX25ld190eXBlc2NyaXB0AE8RZ3RfbmV3X3R5cGVzY3JpcHQATxFsdF9uZXdfdHlwZXNjcmlwdABPE21sb2dfbmV3X3R5cGVzY3JpcHQATxNtcm9vX25ld190eXBlc2NyaXB0AE8SbW9kX25ld190eXBlc2NyaXB0AE8SbXVsX25ld190eXBlc2NyaXB0AE8Rb3JfbmV3X3R5cGVzY3JpcHQATxJzbGxfbmV3X3R5cGVzY3JpcHQATxJzcmxfbmV3X3R5cGVzY3JpcHQATxJzdWJfbmV3X3R5cGVzY3JpcHQATxJ4b3JfbmV3X3R5cGVzY3JpcHQATxJtY3BfbmV3X3R5cGVzY3JpcHQATxJsZGNfbmV3X3R5cGVzY3JpcHQATxNzY3dxX25ld190eXBlc2NyaXB0AE8Sc3J3X25ld190eXBlc2NyaXB0AE8Sc3d3X25ld190eXBlc2NyaXB0AE8RdHJfbmV3X3R5cGVzY3JpcHQATxNlY2sxX25ld190eXBlc2NyaXB0AE8TZWNyMV9uZXdfdHlwZXNjcmlwdABPE2VkMTlfbmV3X3R5cGVzY3JpcHQATxNrMjU2X25ld190eXBlc2NyaXB0AE8TczI1Nl9uZXdfdHlwZXNjcmlwdABPEmJhbF9uZXdfdHlwZXNjcmlwdABPEmpuZV9uZXdfdHlwZXNjcmlwdABPE2FuZGlfbmV3X3R5cGVzY3JpcHQAUBNkaXZpX25ld190eXBlc2NyaXB0AFATZXhwaV9uZXdfdHlwZXNjcmlwdABQE21vZGlfbmV3X3R5cGVzY3JpcHQAUBNtdWxpX25ld190eXBlc2NyaXB0AFASb3JpX25ld190eXBlc2NyaXB0AFATc2xsaV9uZXdfdHlwZXNjcmlwdABQE3NybGlfbmV3X3R5cGVzY3JpcHQAUBNzdWJpX25ld190eXBlc2NyaXB0AFATeG9yaV9uZXdfdHlwZXNjcmlwdABQE2puZWlfbmV3X3R5cGVzY3JpcHQAUBFsYl9uZXdfdHlwZXNjcmlwdABQEWx3X25ld190eXBlc2NyaXB0AFARc2JfbmV3X3R5cGVzY3JpcHQAUBFzd19uZXdfdHlwZXNjcmlwdABQE21jcGlfbmV3X3R5cGVzY3JpcHQAUBNqbnpmX25ld190eXBlc2NyaXB0AFATam56Yl9uZXdfdHlwZXNjcmlwdABQDndxY21fZnJvbV9hcmdzACYOd3FvcF9mcm9tX2FyZ3MAJh9fX3diZ19zZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzADseX193Ymdfc2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzADseX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzADsRamlfbmV3X3R5cGVzY3JpcHQANxNjZnNpX25ld190eXBlc2NyaXB0ADcTcHNobF9uZXdfdHlwZXNjcmlwdAA3E3BzaGhfbmV3X3R5cGVzY3JpcHQANxNwb3BsX25ld190eXBlc2NyaXB0ADcTcG9waF9uZXdfdHlwZXNjcmlwdAA3E3dxbWxfbmV3X3R5cGVzY3JpcHQAwAETd3FjbV9uZXdfdHlwZXNjcmlwdADAARN3ZG9wX25ld190eXBlc2NyaXB0AMABE3dkZHZfbmV3X3R5cGVzY3JpcHQAwAETd2RtbF9uZXdfdHlwZXNjcmlwdADAAQ53cW1sX2Zyb21fYXJncwAeE3dxZHZfbmV3X3R5cGVzY3JpcHQAwAEOd3Fkdl9mcm9tX2FyZ3MAvwETd3FvcF9uZXdfdHlwZXNjcmlwdADAARBfX3diZ19yZWdpZF9mcmVlANcBEF9fd2JnX2ltbTI0X2ZyZWUA2QENX193Ymdfc3dfZnJlZQC4AQ9fX3diZ19rMjU2X2ZyZWUAuAEPX193YmdfcHNobF9mcmVlALgBDV9fd2JnX2xiX2ZyZWUAuAEPX193YmdfYnVybl9mcmVlALgBCnBzaGxfaW1tMjQAJw9fX3diZ19jZmVpX2ZyZWUAuAEOX193Ymdfc3ViX2ZyZWUAuAEPX193YmdfcmV0ZF9mcmVlALgBD19fd2JnX3dxbW1fZnJlZQC4AQ5fX3diZ19iYWxfZnJlZQC4AQ9fX3diZ19sb2dkX2ZyZWUAuAEOX193Ymdfbm90X2ZyZWUAuAEOX193YmdfbWNsX2ZyZWUAuAEOX193YmdfZXhwX2ZyZWUAuAEPX193YmdfcnZydF9mcmVlALgBB3J2cnRfcmEATg5fX3diZ19yZXRfZnJlZQC4AQ1fX3diZ19nbV9mcmVlALgBD19fd2JnX21vdmlfZnJlZQC4AQ9fX3diZ19tbG9nX2ZyZWUAuAEOX193YmdfbXVsX2ZyZWUAuAEKcG9waF9pbW0yNAAnD19fd2JnX3BvcGhfZnJlZQC4AQ1fX3diZ19lcV9mcmVlALgBDl9fd2JnX2Rpdl9mcmVlALgBD19fd2JnX3dkbWxfZnJlZQC4AQ5fX3diZ19tY3BfZnJlZQC4AQ9fX3diZ19qbnpiX2ZyZWUAuAEPX193Ymdfd2Rkdl9mcmVlALgBD19fd2JnX21vdmVfZnJlZQC4AQ9fX3diZ194b3JpX2ZyZWUAuAEPX193YmdfczI1Nl9mcmVlALgBDl9fd2JnX3hvcl9mcmVlALgBD19fd2JnX2RpdmlfZnJlZQC4AQ9fX3diZ193cW1kX2ZyZWUAuAEPX193Ymdfc3ViaV9mcmVlALgBD19fd2JnX2puZWJfZnJlZQC4AQ9fX3diZ193cWFtX2ZyZWUAuAEPX193Ymdfc3d3cV9mcmVlALgBD19fd2JnX3NsbGlfZnJlZQC4AQ5fX3diZ19zbGxfZnJlZQC4AQ9fX3diZ19qbmVpX2ZyZWUAuAEPX193YmdfZWNhbF9mcmVlALgBD19fd2JnX2puZWZfZnJlZQC4AQ5fX3diZ19zbW9fZnJlZQC4AQ5fX3diZ19qbmVfZnJlZQC4AQ5fX3diZ19zcndfZnJlZQC4AQ9fX3diZ19hbmRpX2ZyZWUAuAEPX193Ymdfam56aV9mcmVlALgBD19fd2JnX3dxY21fZnJlZQC4AQ1fX3diZ190cl9mcmVlALgBD19fd2JnX21yb29fZnJlZQC4AQ1fX3diZ19sd19mcmVlALgBHl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X2xocwA6DV9fd2JnX2d0X2ZyZWUAuAEPX193YmdfdGltZV9mcmVlALgBD19fd2JnX3dkbWRfZnJlZQC4AQ1fX3diZ19zYl9mcmVlALgBCmNmc2lfaW1tMjQAJw9fX3diZ19jZnNpX2ZyZWUAuAEfX193YmdfZ2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwA6D19fd2JnX2ptcGZfZnJlZQC4AQ9fX3diZ19qbXBiX2ZyZWUAuAEOX193YmdfZ3RmX2ZyZWUAuAEPX193YmdfbWNsaV9mcmVlALgBD19fd2JnX21pbnRfZnJlZQC4AQ9fX3diZ19leHBpX2ZyZWUAuAEGcmV0X3JhAE4OX193YmdfYW5kX2ZyZWUAuAEOX193YmdfbWVxX2ZyZWUAuAEPX193Ymdfd3FvcF9mcmVlALgBDl9fd2JnX2xkY19mcmVlALgBB2JoZWlfcmEATg9fX3diZ19iaGVpX2ZyZWUAuAEOX193YmdfY2NwX2ZyZWUAuAEPX193Ymdfd2RtbV9mcmVlALgBB2ZsYWdfcmEATg9fX3diZ19mbGFnX2ZyZWUAuAEPX193YmdfYWxvY19mcmVlALgBD19fd2JnX2NhbGxfZnJlZQC4AQZqbXBfcmEATg5fX3diZ19qbXBfZnJlZQC4AQ9fX3diZ193ZG9wX2ZyZWUAuAEPX193YmdfZWQxOV9mcmVlALgBD19fd2JnX21sZHZfZnJlZQC4AQ9fX3diZ193cWR2X2ZyZWUAuAENX193Ymdfb3JfZnJlZQC4AQ9fX3diZ19zcndxX2ZyZWUAuAENX193YmdfbHRfZnJlZQC4AQ9fX3diZ19iaHNoX2ZyZWUAuAEOX193YmdfbG9nX2ZyZWUAuAEPX193Ymdfc2N3cV9mcmVlALgBDl9fd2JnX29yaV9mcmVlALgBBmNmZV9yYQBODl9fd2JnX2NmZV9mcmVlALgBDl9fd2JnX3NybF9mcmVlALgBD19fd2JnX2VjcjFfZnJlZQC4AQ9fX3diZ19qbnpmX2ZyZWUAuAEPX193Ymdfd3FtbF9mcmVlALgBD19fd2JnX3dkY21fZnJlZQC4AQVjYl9yYQBODV9fd2JnX2NiX2ZyZWUAuAEKcG9wbF9pbW0yNAAnD19fd2JnX3BvcGxfZnJlZQC4AQ9fX3diZ19tdWxpX2ZyZWUAuAEPX193YmdfbWNwaV9mcmVlALgBCnBzaGhfaW1tMjQAJw9fX3diZ19wc2hoX2ZyZWUAuAEPX193YmdfZWNrMV9mcmVlALgBD19fd2JnX2FkZGlfZnJlZQC4AQ5fX3diZ19tb2RfZnJlZQC4AQ9fX3diZ19zcmxpX2ZyZWUAuAEOX193YmdfdHJvX2ZyZWUAuAEPX193YmdfbW9kaV9mcmVlALgBBmNmc19yYQBODl9fd2JnX2Nmc19mcmVlALgBDl9fd2JnX3N3d19mcmVlALgBD19fd2JnX3dkYW1fZnJlZQC4AQ9fX3diZ19jc2l6X2ZyZWUAuAEIamlfaW1tMjQAJw1fX3diZ19qaV9mcmVlALgBD19fd2JnX2Nyb29fZnJlZQC4ARNqbmViX25ld190eXBlc2NyaXB0AE0Kd3Fkdl9pbW0wNgAXCndxbWxfaW1tMDYAFwp3ZG1sX2ltbTA2ABcKd3FvcF9pbW0wNgAXCndkb3BfaW1tMDYAFwp3cWNtX2ltbTA2ABcKd2Rkdl9pbW0wNgAXCndkY21faW1tMDYAFwpqbmVmX2ltbTA2ABcHazI1Nl9yYwAPB2syNTZfcmIACwdrMjU2X3JhABYFc3dfcmIACwVzd19yYQAWB2J1cm5fcmIACwdidXJuX3JhABYGc3ViX3JjAA8Gc3ViX3JiAAsGc3ViX3JhABYHcmV0ZF9yYgALB3JldGRfcmEAFgd3cW1tX3JjAA8Hd3FtbV9yYgALB3dxbW1fcmEAFgZiYWxfcmMADwZiYWxfcmIACwZiYWxfcmEAFgd3cW1tX3JkABcHbG9nZF9yYwAPB2xvZ2RfcmIACwdsb2dkX3JhABYGbm90X3JiAAsGbm90X3JhABYGbWNsX3JiAAsGbWNsX3JhABYGZXhwX3JjAA8GZXhwX3JiAAsGZXhwX3JhABYIc3dfaW1tMTIADAVsYl9yYgALBWxiX3JhABYHbW92aV9yYQAWB21sb2dfcmMADwdtbG9nX3JiAAsHbWxvZ19yYQAWBm11bF9yYwAPBm11bF9yYgALBm11bF9yYQAWCm1vdmlfaW1tMTgACQVnbV9yYQAWBmRpdl9yYwAPBmRpdl9yYgALBmRpdl9yYQAWB3dkbWxfcmMADwd3ZG1sX3JiAAsHd2RtbF9yYQAWBm1jcF9yYwAPBm1jcF9yYgALBm1jcF9yYQAWCGxiX2ltbTEyAAwHam56Yl9yYgALB2puemJfcmEAFgd3ZGR2X3JjAA8Hd2Rkdl9yYgALB3dkZHZfcmEAFgdtb3ZlX3JiAAsHbW92ZV9yYQAWCnhvcmlfaW1tMTIADAd4b3JpX3JiAAsHeG9yaV9yYQAWB3MyNTZfcmMADwdzMjU2X3JiAAsHczI1Nl9yYQAWBnhvcl9yYwAPBnhvcl9yYgALBnhvcl9yYQAWCmpuemJfaW1tMTIADAdkaXZpX3JiAAsHZGl2aV9yYQAWB3dxbWRfcmQAFwd3cW1kX3JjAA8Hd3FtZF9yYgALB3dxbWRfcmEAFgpzdWJpX2ltbTEyAAwHc3ViaV9yYgALB3N1YmlfcmEAFgdqbmViX3JjAA8Ham5lYl9yYgALB2puZWJfcmEAFgd3cWFtX3JkABcHd3FhbV9yYwAPB3dxYW1fcmIACwd3cWFtX3JhABYHc3d3cV9yZAAXB3N3d3FfcmMADwdzd3dxX3JiAAsHc3d3cV9yYQAWCnNsbGlfaW1tMTIADAdzbGxpX3JiAAsHc2xsaV9yYQAWBnNsbF9yYwAPBnNsbF9yYgALBnNsbF9yYQAWCmpuZWlfaW1tMTIADAdqbmVpX3JiAAsHam5laV9yYQAWB2xvZ2RfcmQAFwdlY2FsX3JjAA8HZWNhbF9yYgALB2VjYWxfcmEAFgdqbmVmX3JjAA8Ham5lZl9yYgALB2puZWZfcmEAFgZzbW9fcmQAFwZzbW9fcmMADwZzbW9fcmIACwZzbW9fcmEAFgZqbmVfcmMADwZqbmVfcmIACwZqbmVfcmEAFgZzcndfcmMADwZzcndfcmIACwZzcndfcmEAFgpkaXZpX2ltbTEyAAwHYW5kaV9yYgALB2FuZGlfcmEAFgpqbnppX2ltbTE4AAkHam56aV9yYQAWB3dxY21fcmMADwd3cWNtX3JiAAsHd3FjbV9yYQAWBXRyX3JjAA8FdHJfcmIACwV0cl9yYQAWB21yb29fcmMADwdtcm9vX3JiAAsHbXJvb19yYQAWCGx3X2ltbTEyAAwFbHdfcmIACwVsd19yYQAWBWd0X3JjAA8FZ3RfcmIACwVndF9yYQAWB3RpbWVfcmIACwd0aW1lX3JhABYHd2RtZF9yZAAXB3dkbWRfcmMADwd3ZG1kX3JiAAsHd2RtZF9yYQAWCHNiX2ltbTEyAAwFc2JfcmIACwVzYl9yYQAWE19fd2JnX21hdGhhcmdzX2ZyZWUAdwpqbXBmX2ltbTE4AAkHam1wZl9yYQAWCmptcGJfaW1tMTgACQdqbXBiX3JhABYJZ3RmX2ltbTEyAAwGZ3RmX3JiAAsGZ3RmX3JhABYKbWNsaV9pbW0xOAAJB21jbGlfcmEAFgdtaW50X3JiAAsHbWludF9yYQAWCmV4cGlfaW1tMTIADAdleHBpX3JiAAsHZXhwaV9yYQAWBWVxX3JjAA8FZXFfcmIACwVlcV9yYQAWBm1lcV9yZAAXBm1lcV9yYwAPBm1lcV9yYgALBm1lcV9yYQAWB3dxb3BfcmMADwd3cW9wX3JiAAsHd3FvcF9yYQAWBmxkY19yYwAPBmxkY19yYgALBmxkY19yYQAWB2VjYWxfcmQAFwZjY3BfcmMADwZjY3BfcmIACwZjY3BfcmEAFgd3ZG1tX3JkABcHd2RtbV9yYwAPB3dkbW1fcmIACwd3ZG1tX3JhABYKYW5kaV9pbW0xMgAMBmFuZF9yYgALBmFuZF9yYQAWBmNjcF9yZAAXB2NhbGxfcmMADwdjYWxsX3JiAAsHY2FsbF9yYQAWB3dkb3BfcmMADwd3ZG9wX3JiAAsHd2RvcF9yYQAWB2VkMTlfcmMADwdlZDE5X3JiAAsHZWQxOV9yYQAWB21sZHZfcmQAFwdtbGR2X3JjAA8HbWxkdl9yYgALB21sZHZfcmEAFgd3cWR2X3JjAA8Hd3Fkdl9yYgALB3dxZHZfcmEAFgVvcl9yYwAPBW9yX3JiAAsFb3JfcmEAFgdzcndxX3JkABcHc3J3cV9yYwAPB3Nyd3FfcmIACwdzcndxX3JhABYFbHRfcmMADwVsdF9yYgALBWx0X3JhABYHYmhzaF9yYgALB2Joc2hfcmEAFgZsb2dfcmQAFwZsb2dfcmMADwZsb2dfcmIACwZsb2dfcmEAFgdzY3dxX3JjAA8Hc2N3cV9yYgALB3Njd3FfcmEAFglvcmlfaW1tMTIADAZvcmlfcmIACwZvcmlfcmEAFgZzcmxfcmMADwZzcmxfcmIACwZzcmxfcmEAFgdlY3IxX3JjAA8HZWNyMV9yYgALB2VjcjFfcmEAFgpqbnpmX2ltbTEyAAwHam56Zl9yYgALB2puemZfcmEAFgd3cW1sX3JjAA8Hd3FtbF9yYgALB3dxbWxfcmEAFgd3ZGNtX3JjAA8Hd2RjbV9yYgALB3dkY21fcmEAFgptdWxpX2ltbTEyAAwHbXVsaV9yYgALB211bGlfcmEAFgptY3BpX2ltbTEyAAwHbWNwaV9yYgALB21jcGlfcmEAFgdlY2sxX3JjAA8HZWNrMV9yYgALB2VjazFfcmEAFgZhbmRfcmMADwdhZGRpX3JiAAsHYWRkaV9yYQAWBm1vZF9yYwAPBm1vZF9yYgALBm1vZF9yYQAWCnNybGlfaW1tMTIADAdzcmxpX3JiAAsHc3JsaV9yYQAWBnRyb19yZAAXBnRyb19yYwAPBnRyb19yYgALBnRyb19yYQAWCm1vZGlfaW1tMTIADAdtb2RpX3JiAAsHbW9kaV9yYQAWBnN3d19yYwAPBnN3d19yYgALBnN3d19yYQAWB3dkYW1fcmQAFwd3ZGFtX3JjAA8Hd2RhbV9yYgALB3dkYW1fcmEAFgdjc2l6X3JiAAsHY3Npel9yYQAWB2Nyb29fcmIACwdjcm9vX3JhABYbX193YmdfcGFuaWNpbnN0cnVjdGlvbl9mcmVlALgBH19fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIAzAETX193YmluZGdlbl9leHBvcnRfMADLAQkRAQBBAQsGAs8B0AHRAe0BygEK0IEB+QGJIwIIfwF+AkACQAJAAkACQAJAAkACQCAAQfUBTwRAIABBzf97Tw0FIABBC2oiAEF4cSEFQfiMwAAoAgAiCEUNBEEAIAVrIQQCf0EAIAVBgAJJDQAaQR8gBUH///8HSw0AGiAFQQYgAEEIdmciAGt2QQFxIABBAXRrQT5qCyIHQQJ0QdyJwABqKAIAIgFFBEBBACEADAILQQAhACAFQRkgB0EBdmtBACAHQR9HG3QhAwNAAkAgASgCBEF4cSIGIAVJDQAgBiAFayIGIARPDQAgASECIAYiBA0AQQAhBCABIQAMBAsgAUEUaigCACIGIAAgBiABIANBHXZBBHFqQRBqKAIAIgFHGyAAIAYbIQAgA0EBdCEDIAENAAsMAQtB9IzAACgCACICQRAgAEELakF4cSAAQQtJGyIFQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAUEDdCIAQeyKwABqIgMgAEH0isAAaigCACIAKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiABd3E2AgALIAAgAUEDdCIBQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAgLIAVB/IzAACgCAE0NAwJAAkAgAUUEQEH4jMAAKAIAIgBFDQYgAGhBAnRB3InAAGooAgAiASgCBEF4cSAFayEEIAEhAgNAAkAgASgCECIADQAgAUEUaigCACIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACQRRqIgAoAgAiAxtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAAgAkEQaiADGyEDA0AgAyEGIAEiAEEUaiIBIABBEGogASgCACIBGyEDIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNBCACIAIoAhxBAnRB3InAAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0FDAQLIAEgADYCACAADQNB+IzAAEH4jMAAKAIAQX4gAigCHHdxNgIADAQLIAAoAgRBeHEgBWsiASAEIAEgBEkiARshBCAAIAIgARshAiAAIQEMAAsACwJAQQIgAHQiA0EAIANrciABIAB0cWgiAEEDdCIBQeyKwABqIgMgAUH0isAAaigCACIBKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiAAd3E2AgALIAEgBUEDcjYCBCABIAVqIgYgAEEDdCIAIAVrIgRBAXI2AgQgACABaiAENgIAQfyMwAAoAgAiAgRAIAJBeHFB7IrAAGohAEGEjcAAKAIAIQMCf0H0jMAAKAIAIgVBASACQQN2dCICcUUEQEH0jMAAIAIgBXI2AgAgAAwBCyAAKAIICyECIAAgAzYCCCACIAM2AgwgAyAANgIMIAMgAjYCCAtBhI3AACAGNgIAQfyMwAAgBDYCACABQQhqDwsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAJBFGooAgAiAUUNACAAQRRqIAE2AgAgASAANgIYCwJAAkAgBEEQTwRAIAIgBUEDcjYCBCACIAVqIgUgBEEBcjYCBCAEIAVqIAQ2AgBB/IzAACgCACIDRQ0BIANBeHFB7IrAAGohAEGEjcAAKAIAIQECf0H0jMAAKAIAIgZBASADQQN2dCIDcUUEQEH0jMAAIAMgBnI2AgAgAAwBCyAAKAIICyEDIAAgATYCCCADIAE2AgwgASAANgIMIAEgAzYCCAwBCyACIAQgBWoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBC0GEjcAAIAU2AgBB/IzAACAENgIACyACQQhqDwsgACACckUEQEEAIQJBAiAHdCIAQQAgAGtyIAhxIgBFDQMgAGhBAnRB3InAAGooAgAhAAsgAEUNAQsDQCAAIAIgACgCBEF4cSIDIAVrIgYgBEkiBxshCCAAKAIQIgFFBEAgAEEUaigCACEBCyACIAggAyAFSSIAGyECIAQgBiAEIAcbIAAbIQQgASIADQALCyACRQ0AIAVB/IzAACgCACIATSAEIAAgBWtPcQ0AIAIoAhghBwJAAkAgAiACKAIMIgBGBEAgAkEUQRAgAkEUaiIAKAIAIgMbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyAAIAJBEGogAxshAwNAIAMhBiABIgBBFGoiASAAQRBqIAEoAgAiARshAyAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQMgAiACKAIcQQJ0QdyJwABqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNBAwDCyABIAA2AgAgAA0CQfiMwABB+IzAACgCAEF+IAIoAhx3cTYCAAwDCwJAAkACQAJAAkAgBUH8jMAAKAIAIgFLBEAgBUGAjcAAKAIAIgBPBEBBACEEIAVBr4AEaiIAQRB2QAAiAUF/RiIDDQcgAUEQdCICRQ0HQYyNwABBACAAQYCAfHEgAxsiBEGMjcAAKAIAaiIANgIAQZCNwABBkI3AACgCACIBIAAgACABSRs2AgACQAJAQYiNwAAoAgAiAwRAQdyKwAAhAANAIAAoAgAiASAAKAIEIgZqIAJGDQIgACgCCCIADQALDAILQZiNwAAoAgAiAEEAIAAgAk0bRQRAQZiNwAAgAjYCAAtBnI3AAEH/HzYCAEHgisAAIAQ2AgBB3IrAACACNgIAQfiKwABB7IrAADYCAEGAi8AAQfSKwAA2AgBB9IrAAEHsisAANgIAQYiLwABB/IrAADYCAEH8isAAQfSKwAA2AgBBkIvAAEGEi8AANgIAQYSLwABB/IrAADYCAEGYi8AAQYyLwAA2AgBBjIvAAEGEi8AANgIAQaCLwABBlIvAADYCAEGUi8AAQYyLwAA2AgBBqIvAAEGci8AANgIAQZyLwABBlIvAADYCAEGwi8AAQaSLwAA2AgBBpIvAAEGci8AANgIAQeiKwABBADYCAEG4i8AAQayLwAA2AgBBrIvAAEGki8AANgIAQbSLwABBrIvAADYCAEHAi8AAQbSLwAA2AgBBvIvAAEG0i8AANgIAQciLwABBvIvAADYCAEHEi8AAQbyLwAA2AgBB0IvAAEHEi8AANgIAQcyLwABBxIvAADYCAEHYi8AAQcyLwAA2AgBB1IvAAEHMi8AANgIAQeCLwABB1IvAADYCAEHci8AAQdSLwAA2AgBB6IvAAEHci8AANgIAQeSLwABB3IvAADYCAEHwi8AAQeSLwAA2AgBB7IvAAEHki8AANgIAQfiLwABB7IvAADYCAEGAjMAAQfSLwAA2AgBB9IvAAEHsi8AANgIAQYiMwABB/IvAADYCAEH8i8AAQfSLwAA2AgBBkIzAAEGEjMAANgIAQYSMwABB/IvAADYCAEGYjMAAQYyMwAA2AgBBjIzAAEGEjMAANgIAQaCMwABBlIzAADYCAEGUjMAAQYyMwAA2AgBBqIzAAEGcjMAANgIAQZyMwABBlIzAADYCAEGwjMAAQaSMwAA2AgBBpIzAAEGcjMAANgIAQbiMwABBrIzAADYCAEGsjMAAQaSMwAA2AgBBwIzAAEG0jMAANgIAQbSMwABBrIzAADYCAEHIjMAAQbyMwAA2AgBBvIzAAEG0jMAANgIAQdCMwABBxIzAADYCAEHEjMAAQbyMwAA2AgBB2IzAAEHMjMAANgIAQcyMwABBxIzAADYCAEHgjMAAQdSMwAA2AgBB1IzAAEHMjMAANgIAQeiMwABB3IzAADYCAEHcjMAAQdSMwAA2AgBB8IzAAEHkjMAANgIAQeSMwABB3IzAADYCAEGIjcAAIAI2AgBB7IzAAEHkjMAANgIAQYCNwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBlI3AAEGAgIABNgIADAgLIAIgA00gASADS3INACAAKAIMRQ0DC0GYjcAAQZiNwAAoAgAiACACIAAgAkkbNgIAIAIgBGohAUHcisAAIQACQAJAA0AgASAAKAIARwRAIAAoAggiAA0BDAILCyAAKAIMRQ0BC0HcisAAIQADQAJAIAMgACgCACIBTwRAIAEgACgCBGoiBiADSw0BCyAAKAIIIQAMAQsLQYiNwAAgAjYCAEGAjcAAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQZSNwABBgICAATYCACADIAZBIGtBeHFBCGsiACAAIANBEGpJGyIBQRs2AgRB3IrAACkCACEJIAFBEGpB5IrAACkCADcCACABIAk3AghB4IrAACAENgIAQdyKwAAgAjYCAEHkisAAIAFBCGo2AgBB6IrAAEEANgIAIAFBHGohAANAIABBBzYCACAAQQRqIgAgBkkNAAsgASADRg0HIAEgASgCBEF+cTYCBCADIAEgA2siAEEBcjYCBCABIAA2AgAgAEGAAk8EQCADIAAQCAwICyAAQXhxQeyKwABqIQECf0H0jMAAKAIAIgJBASAAQQN2dCIAcUUEQEH0jMAAIAAgAnI2AgAgAQwBCyABKAIICyEAIAEgAzYCCCAAIAM2AgwgAyABNgIMIAMgADYCCAwHCyAAIAI2AgAgACAAKAIEIARqNgIEIAIgBUEDcjYCBCABIAIgBWoiA2shBSABQYiNwAAoAgBGDQMgAUGEjcAAKAIARg0EIAEoAgQiBEEDcUEBRgRAIAEgBEF4cSIAEAcgACAFaiEFIAAgAWoiASgCBCEECyABIARBfnE2AgQgAyAFQQFyNgIEIAMgBWogBTYCACAFQYACTwRAIAMgBRAIDAYLIAVBeHFB7IrAAGohAAJ/QfSMwAAoAgAiAUEBIAVBA3Z0IgRxRQRAQfSMwAAgASAEcjYCACAADAELIAAoAggLIQUgACADNgIIIAUgAzYCDCADIAA2AgwgAyAFNgIIDAULQYCNwAAgACAFayIBNgIAQYiNwABBiI3AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBCAAQQhqIQQMBgtBhI3AACgCACEAAkAgASAFayICQQ9NBEBBhI3AAEEANgIAQfyMwABBADYCACAAIAFBA3I2AgQgACABaiIBIAEoAgRBAXI2AgQMAQtB/IzAACACNgIAQYSNwAAgACAFaiIDNgIAIAMgAkEBcjYCBCAAIAFqIAI2AgAgACAFQQNyNgIECwwICyAAIAQgBmo2AgRBiI3AAEGIjcAAKAIAIgBBD2pBeHEiAUEIayICNgIAQYCNwABBgI3AACgCACAEaiIDIAAgAWtqQQhqIgE2AgAgAiABQQFyNgIEIAAgA2pBKDYCBEGUjcAAQYCAgAE2AgAMAwtBiI3AACADNgIAQYCNwABBgI3AACgCACAFaiIANgIAIAMgAEEBcjYCBAwBC0GEjcAAIAM2AgBB/IzAAEH8jMAAKAIAIAVqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAAsgAkEIag8LQQAhBEGAjcAAKAIAIgAgBU0NAEGAjcAAIAAgBWsiATYCAEGIjcAAQYiNwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQMAwsgBA8LIAAgBzYCGCACKAIQIgEEQCAAIAE2AhAgASAANgIYCyACQRRqKAIAIgFFDQAgAEEUaiABNgIAIAEgADYCGAsCQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiASAEQQFyNgIEIAEgBGogBDYCACAEQYACTwRAIAEgBBAIDAILIARBeHFB7IrAAGohAAJ/QfSMwAAoAgAiA0EBIARBA3Z0IgRxRQRAQfSMwAAgAyAEcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIECyACQQhqDwsgAEEIagvtCwELfyAAKAIEIQcgACgCACEFAkACQAJAIAEoAgAiCiABKAIIIgByBEACQCAARQ0AIAUgB2ohCSABQQxqKAIAQQFqIQYgBSECA0ACQCACIQAgBkEBayIGRQ0AIAAgCUYNAgJ/IAAsAAAiBEEATgRAIARB/wFxIQQgAEEBagwBCyAALQABQT9xIQggBEEfcSECIARBX00EQCACQQZ0IAhyIQQgAEECagwBCyAALQACQT9xIAhBBnRyIQggBEFwSQRAIAggAkEMdHIhBCAAQQNqDAELIAJBEnRBgIDwAHEgAC0AA0E/cSAIQQZ0cnIiBEGAgMQARg0DIABBBGoLIgIgAyAAa2ohAyAEQYCAxABHDQEMAgsLIAAgCUYNACAALAAAIgJBAE4gAkFgSXIgAkFwSXJFBEAgAkH/AXFBEnRBgIDwAHEgAC0AA0E/cSAALQACQT9xQQZ0IAAtAAFBP3FBDHRycnJBgIDEAEYNAQsCQAJAIANFDQAgAyAHTwRAQQAhACADIAdGDQEMAgtBACEAIAMgBWosAABBQEgNAQsgBSEACyADIAcgABshByAAIAUgABshBQsgCkUNAyABKAIEIQsgB0EQTwRAIAcgBSAFQQNqQXxxIgRrIgZqIgpBA3EhCEEAIQlBACEAIAQgBUcEQCAEIAVBf3NqQQNPBEBBACEDA0AgACADIAVqIgIsAABBv39KaiACQQFqLAAAQb9/SmogAkECaiwAAEG/f0pqIAJBA2osAABBv39KaiEAIANBBGoiAw0ACwsgBSECA0AgACACLAAAQb9/SmohACACQQFqIQIgBkEBaiIGDQALCwJAIAhFDQAgBCAKQXxxaiICLAAAQb9/SiEJIAhBAUYNACAJIAIsAAFBv39KaiEJIAhBAkYNACAJIAIsAAJBv39KaiEJCyAKQQJ2IQggACAJaiEDA0AgBCEGIAhFDQRBwAEgCCAIQcABTxsiCUEDcSEKIAlBAnQhBEEAIQIgCUEETwRAIAYgBEHwB3FqIQwgBiEAA0AgAiAAKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIABBBGooAgAiAkF/c0EHdiACQQZ2ckGBgoQIcWogAEEIaigCACICQX9zQQd2IAJBBnZyQYGChAhxaiAAQQxqKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIQIgAEEQaiIAIAxHDQALCyAIIAlrIQggBCAGaiEEIAJBCHZB/4H8B3EgAkH/gfwHcWpBgYAEbEEQdiADaiEDIApFDQALIAYgCUH8AXFBAnRqIgIoAgAiAEF/c0EHdiAAQQZ2ckGBgoQIcSEAIApBAUYNAiAAIAIoAgQiAEF/c0EHdiAAQQZ2ckGBgoQIcWohACAKQQJGDQIgACACKAIIIgBBf3NBB3YgAEEGdnJBgYKECHFqIQAMAgsgB0UEQEEAIQMMAwsgB0EDcSECAkAgB0EESQRAQQAhA0EAIQYMAQtBACEDIAUhACAHQXxxIgYhBANAIAMgACwAAEG/f0pqIABBAWosAABBv39KaiAAQQJqLAAAQb9/SmogAEEDaiwAAEG/f0pqIQMgAEEEaiEAIARBBGsiBA0ACwsgAkUNAiAFIAZqIQADQCADIAAsAABBv39KaiEDIABBAWohACACQQFrIgINAAsMAgsMAgsgAEEIdkH/gRxxIABB/4H8B3FqQYGABGxBEHYgA2ohAwsCQCADIAtJBEAgCyADayEDQQAhAAJAAkACQCABLQAgQQFrDgIAAQILIAMhAEEAIQMMAQsgA0EBdiEAIANBAWpBAXYhAwsgAEEBaiEAIAFBGGooAgAhAiABKAIQIQYgASgCFCEBA0AgAEEBayIARQ0CIAEgBiACKAIQEQMARQ0AC0EBDwsMAQtBASEAIAEgBSAHIAIoAgwRAAAEf0EBBUEAIQACfwNAIAMgACADRg0BGiAAQQFqIQAgASAGIAIoAhARAwBFDQALIABBAWsLIANJCw8LIAEoAhQgBSAHIAFBGGooAgAoAgwRAAALpgYCDX8BfiMAQTBrIgckAEEnIQICQCAAQpDOAFQEQCAAIQ8MAQsDQCAHQQlqIAJqIgZBBGsgAEKQzgCAIg9C8LEDfiAAfKciBEH//wNxQeQAbiIDQQF0QciGwABqLwAAOwAAIAZBAmsgA0Gcf2wgBGpB//8DcUEBdEHIhsAAai8AADsAACACQQRrIQIgAEL/wdcvViAPIQANAAsLIA+nIgRB4wBLBEAgAkECayICIAdBCWpqIA+nIgNB//8DcUHkAG4iBEGcf2wgA2pB//8DcUEBdEHIhsAAai8AADsAAAsCQCAEQQpPBEAgAkECayICIAdBCWpqIARBAXRByIbAAGovAAA7AAAMAQsgAkEBayICIAdBCWpqIARBMGo6AAALQScgAmshCEEBIQVBK0GAgMQAIAEoAhwiBEEBcSIMGyEJIARBHXRBH3VB6IjAAHEhCiAHQQlqIAJqIQsCQCABKAIARQRAIAEoAhQiAyABKAIYIgEgCSAKEEcNASADIAsgCCABKAIMEQAAIQUMAQsgASgCBCINIAggDGoiA00EQCABKAIUIgMgASgCGCIBIAkgChBHDQEgAyALIAggASgCDBEAACEFDAELIARBCHEEQCABKAIQIQQgAUEwNgIQIAEtACAhAyABQQE6ACAgASgCFCIOIAEoAhgiBiAJIAoQRw0BIAIgDWogDGtBJmshAgNAIAJBAWsiAgRAIA5BMCAGKAIQEQMARQ0BDAMLCyAOIAsgCCAGKAIMEQAADQEgASADOgAgIAEgBDYCEEEAIQUMAQsgDSADayEDAkACQAJAIAEtACAiAkEBaw4DAAEAAgsgAyECQQAhAwwBCyADQQF2IQIgA0EBakEBdiEDCyACQQFqIQIgAUEYaigCACEGIAEoAhAhBCABKAIUIQECQANAIAJBAWsiAkUNASABIAQgBigCEBEDAEUNAAsMAQsgASAGIAkgChBHDQAgASALIAggBigCDBEAAA0AQQAhAgNAIAIgA0YEQEEAIQUMAgsgAkEBaiECIAEgBCAGKAIQEQMARQ0ACyACQQFrIANJIQULIAdBMGokACAFC/wFAQV/IABBCGsiASAAQQRrKAIAIgNBeHEiAGohAgJAAkACQAJAIANBAXENACADQQNxRQ0BIAEoAgAiAyAAaiEAIAEgA2siAUGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAA2AgAgAiACKAIEQX5xNgIEIAEgAEEBcjYCBCACIAA2AgAPCyABIAMQBwsCQAJAIAIoAgQiA0ECcUUEQCACQYiNwAAoAgBGDQIgAkGEjcAAKAIARg0FIAIgA0F4cSICEAcgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFBhI3AACgCAEcNAUH8jMAAIAA2AgAPCyACIANBfnE2AgQgASAAQQFyNgIEIAAgAWogADYCAAsgAEGAAkkNAiABIAAQCEEAIQFBnI3AAEGcjcAAKAIAQQFrIgA2AgAgAA0BQeSKwAAoAgAiAARAA0AgAUEBaiEBIAAoAggiAA0ACwtBnI3AAEH/HyABIAFB/x9NGzYCAA8LQYiNwAAgATYCAEGAjcAAQYCNwAAoAgAgAGoiADYCACABIABBAXI2AgRBhI3AACgCACABRgRAQfyMwABBADYCAEGEjcAAQQA2AgALIABBlI3AACgCACIDTQ0AQYiNwAAoAgAiAkUNAEEAIQECQEGAjcAAKAIAIgRBKUkNAEHcisAAIQADQCACIAAoAgAiBU8EQCAFIAAoAgRqIAJLDQILIAAoAggiAA0ACwtB5IrAACgCACIABEADQCABQQFqIQEgACgCCCIADQALC0GcjcAAQf8fIAEgAUH/H00bNgIAIAMgBE8NAEGUjcAAQX82AgALDwsgAEF4cUHsisAAaiECAn9B9IzAACgCACIDQQEgAEEDdnQiAHFFBEBB9IzAACAAIANyNgIAIAIMAQsgAigCCAshACACIAE2AgggACABNgIMIAEgAjYCDCABIAA2AggPC0GEjcAAIAE2AgBB/IzAAEH8jMAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAv7BAEBfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQYAEaw4mAQIDBAUGBwgsCQoLDA0sLCwsLCwsLCwsLCwsLCwsLCwODywsLBAAC0EBIQECQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABBAWsODkEBAgMEBQZCBwgJCgsMAAsCQCAAQcAEaw4MJygpKissLS4vMDEyAAsCQCAAQYECaw4KDQ4PEBESExQVFgALAkAgAEGABmsOCTM0NTY3QkI4OQALAkAgAEGACmsOBTw9Pj9AAAsgAEGACGsOAjk6QQtBAg8LQQMPC0EEDwtBBQ8LQQYPC0EHDwtBCQ8LQQoPC0ELDwtBDA8LQQ0PC0EODwtBgQIPC0GCAg8LQYMCDwtBhAIPC0GFAg8LQYYCDwtBhwIPC0GIAg8LQYkCDwtBigIPC0GABA8LQYEEDwtBggQPC0GDBA8LQYQEDwtBhQQPC0GGBA8LQYcEDwtBiQQPC0GKBA8LQYsEDwtBjAQPC0GNBA8LQaAEDwtBoQQPC0GlBA8LQcAEDwtBwQQPC0HCBA8LQcMEDwtBxAQPC0HFBA8LQcYEDwtBxwQPC0HIBA8LQckEDwtBygQPC0HLBA8LQYAGDwtBgQYPC0GCBg8LQYMGDwtBhAYPC0GHBg8LQYgGDwtBgAgPC0GBCA8LQYAKDwtBgQoPC0GCCg8LQYMKDwtBhAohAQsgAQ8LQeCCwABBGRDSAQAL+AMBAn8gACABaiECAkACQCAAKAIEIgNBAXENACADQQNxRQ0BIAAoAgAiAyABaiEBIAAgA2siAEGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAE2AgAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCACIAE2AgAPCyAAIAMQBwsCQAJAAkAgAigCBCIDQQJxRQRAIAJBiI3AACgCAEYNAiACQYSNwAAoAgBGDQMgAiADQXhxIgIQByAAIAEgAmoiAUEBcjYCBCAAIAFqIAE2AgAgAEGEjcAAKAIARw0BQfyMwAAgATYCAA8LIAIgA0F+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACyABQYACTwRAIAAgARAIDAMLIAFBeHFB7IrAAGohAgJ/QfSMwAAoAgAiA0EBIAFBA3Z0IgFxRQRAQfSMwAAgASADcjYCACACDAELIAIoAggLIQEgAiAANgIIIAEgADYCDCAAIAI2AgwgACABNgIIDwtBiI3AACAANgIAQYCNwABBgI3AACgCACABaiIBNgIAIAAgAUEBcjYCBCAAQYSNwAAoAgBHDQFB/IzAAEEANgIAQYSNwABBADYCAA8LQYSNwAAgADYCAEH8jMAAQfyMwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgACABaiABNgIACwv7AgEEfyAAKAIMIQICQAJAIAFBgAJPBEAgACgCGCEDAkACQCAAIAJGBEAgAEEUQRAgAEEUaiICKAIAIgQbaigCACIBDQFBACECDAILIAAoAggiASACNgIMIAIgATYCCAwBCyACIABBEGogBBshBANAIAQhBSABIgJBFGoiASACQRBqIAEoAgAiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QdyJwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQfiMwABB+IzAACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB9IzAAEH0jMAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIABBFGooAgAiAEUNACACQRRqIAA2AgAgACACNgIYCwusAgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QdyJwABqIQQCQEH4jMAAKAIAIgVBASACdCIDcUUEQEH4jMAAIAMgBXI2AgAgBCAANgIAIAAgBDYCGAwBCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEEA0AgAyAEQR12QQRxakEQaiIFKAIAIgJFDQIgBEEBdCEEIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAFIAA2AgAgACADNgIYCyAAIAA2AgwgACAANgIIC2kBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYD+A3EgAEEYdnJyELsBIAFBEGokAAt5AQN/IAEQxAECQCABKAIAIgJBf0cEQCABIAJBAWo2AgAgASgCBCgAACIDQRh0QRZ1QfyCwABqKAIAIQRBAUEEEMcBIgJFDQEgAiAEIANBgH5xcjYAACABIAEoAgBBAWs2AgAgAEEENgIEIAAgAjYCAA8LEM4BAAsAC2YBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYDgA3FyQQx2ELwBIAFBEGokAAtuAQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggiAC8AACAAQQJqLQAAQRB0chDVASEAIAEoAgwiAiACKAIAQQFrNgIAQQhBBBC6ASICIABBCHZBgB5xIABBGHZyOwEEIAJBADYCACABQRBqJAAgAgttAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQRxqQgE3AgAgAUECNgIUIAFB9IDAADYCECABQQI2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQSQALIAFBMGokACAAC24BAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQRxqQgE3AgAgAUECNgIUIAFBuIHAADYCECABQQM2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQSQALIAFBMGokACAAC10BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQR52IABBDnZBPHFyELwBIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ8gELFgAgAEHQgsAAQcCCwABBgICACBDyAQtMACADQf8BcSABQf8BcUEMdCAAQf8BcUESdHIiACACQf8BcUEGdHJyIgFBEHRBgID8B3EgAEEIdkGA/gNxIAFBgP4DcUEIdHJBCHZyC1UCAX8BfiMAQRBrIgIkACABEMQBIAJBCGogARBUIAIoAgxBADYCACABKQIAIQMgARAEIAAgA0IoiKdBAXE6AAEgACADQiCIp0EBcToAACACQRBqJAALEAAgACABIAIgA0HiABD0AQsQACAAIAEgAiADQeMAEPQBC08BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDIARC8ASABQRBqJAALVQEDfyMAQRBrIgEkACABQQhqIAAQSiABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENUBQRh2QT9xELwBIAFBEGokAAtSAQF/IAAQUSECIAEQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgACACQf8BcUESdHIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyrUIghjcCACABCxAAIAAgASACIANB3gAQ9QELEAAgACABIAIgA0HfABD1AQsQACAAIAEgAiADQeAAEPUBCxAAIAAgASACIANB4QAQ9QELUQIBfwF+IwBBEGsiAiQAIAEQxAEgAkEIaiABEFQgAigCDEEANgIAIAEpAgAhAyABEAQgACADQiiIPAABIAAgA0IgiKdBAXE6AAAgAkEQaiQACz4BAX8jAEEQayIEJAAgABBRIAEQUSACEFEgBEEIaiADEBMgBC0ACEEBcSAELQAJQQFxEHoQrAEgBEEQaiQAC0kBAX8gABBRIQAgARBRIQFBCEEEELoBIgIgAUH/AXFBDHQgAEESdHIiAEGA4ANxQQh0IABBCHZBgP4DcXJBCHatQiCGNwIAIAILDAAgACABQcsAEPYBCwwAIAAgAUHMABD2AQsMACAAIAFBzQAQ9gELDAAgACABQc4AEPYBCwwAIAAgAUHPABD2AQsMACAAIAFB0AAQ9gELPAEBfyMAQRBrIgQkACAAEFEgARBRIAIQUSAEQQhqIAMQHSAELQAIQQFxIAQtAAkQvgEQrAEgBEEQaiQAC0gAIAAQxAEgACgCAEF/RgRAEM4BAAsgAC8ABCAAQQZqLQAAQRB0chDVASIAQYD+A3FBCHQgAEEIdkGA/gNxIABBGHZychC7AQsLACAAIAFBBxD3AQs/AQJ/AkAgABBRIgBBGHENACAAQQdxIgJBB0YNAEEIQQQQugEiASAAQQV2QQFxrUIghiACrUIohoQ3AgALIAELCwAgACABQQgQ9wELPwAgAkEWdEGAgIAGcSABQf8BcUEMdCIBIAJB/AFxQQZ0ckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCwsAIAAgAUEKEPgBCwsAIAAgAUEMEPgBCwsAIAAgAUEUEPgBCwsAIAAgAUEWEPgBCwsAIAAgAUEZEPgBCwsAIAAgAUEbEPgBCwsAIAAgAUEeEPgBCwsAIAAgAUEfEPgBCwsAIAAgAUEkEPgBCwsAIAAgAUEyEPgBCz8AIAAQUSEAIAEQUyIBQRB0QYCA/AdxIABB/wFxQRJ0IAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2chCsAQtAAQF/IAAQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyrUIghjcCACABCzgAIAJBEHRBgID8B3EgAUH/AXFBDHQiASACckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCzwBAn8jAEEQayIBJAAgABDEASABQQhqIAAQSyABKAIILQABIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAs8AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEEsgASgCCC0AACABKAIMIgIgAigCAEEBazYCACABQRBqJAALOQEBfyMAQRBrIgIkACAAEMQBIAJBCGogABBUIAIoAgwgAigCCCABQQBHOgAAQQA2AgAgAkEQaiQACzkBAX8jAEEQayICJAAgABDEASACQQhqIAAQVCACKAIMIAIoAgggAUEARzoAAUEANgIAIAJBEGokAAs4AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEFQgASgCDEEANgIAIAAtAAQgABAEIAFBEGokAEEBcQs3AQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggtAAQgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzcBAn8jAEEQayIBJAAgAUEIaiAAEEogASgCCCgCACABKAIMIgIgAigCAEEBazYCACABQRBqJAALCgAgAEHVABD5AQsKACAAQdYAEPkBCwoAIABB1wAQ+QELCgAgAEHaABD5AQsKACAAQdsAEPkBCwoAIABB3AAQ+QELCgAgAEHdABD5AQs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAwANARoLIAMNAUEACw8LIAAgA0EAIAEoAgwRAAALMQEBfyMAQRBrIgEkACABQQhqIAAQHSABLQAJIAEtAAhBBXRBIHFyELwBIAFBEGokAAuhAgEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQbiGwAA2AhAgAkHoiMAANgIMIAJBDGoiACgCCCIBRQRAIwBBIGsiACQAIABBDGpCADcCACAAQQE2AgQgAEHoiMAANgIIIABBKzYCHCAAQZCIwAA2AhggACAAQRhqNgIAIABB2IjAABBJAAsgAUEMaigCACECAkACQCABKAIEDgIAAAELIAINAAsgAC0AECEBIAAtABEaQdiJwABB2InAACgCACIAQQFqNgIAAkAgAEEASA0AQaSNwAAtAABBAXENAEGkjcAAQQE6AABBoI3AAEGgjcAAKAIAQQFqNgIAQdSJwAAoAgBBAEgNAEGkjcAAQQA6AAAgAUUNAAALAAs1AQF/IAEQxAEgASgCACICQX9GBEAQzgEACyABIAJBAWo2AgAgACABNgIEIAAgAUEEajYCAAsxAQF/IAEoAgAiAkF/RwRAIAEgAkEBajYCACAAIAE2AgQgACABQQRqNgIADwsQzgEACzUBAX8gAEE2TwRAQeCCwABBGRDSAQALQQxBBBC6ASICIAA6AAggAiABNgIEIAJBADYCACACCzAAIAAQUSABEFEgAhBRIAMQURASIQBBCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQstACAAEMQBIAAoAgBBf0YEQBDOAQALIAAvAAQgAEEGai0AAEEQdHIQyAEQvAELLAAgABBRIAEQUSACEFEQKyEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELLAAgABBRIAEQUSACEFIQOCEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELJQEBfwJAIAAEQCAAKAIADQEgAC0ABCAAEAQPCxDNAQALEM4BAAslAQF/AkAgAARAIAAoAgANASAALwEEIAAQBA8LEM0BAAsQzgEACyUBAX8CQCAABEAgACgCAA0BIAAoAgQgABAEDwsQzQEACxDOAQALKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LEM4BAAspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeQAchDFARC7AQspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeUAchDFARC7AQslAQF/IAAQUSEAQQhBBBC6ASIBIABBAnRB/AFxrUIghjcCACABCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ0gEACyABAX8gABDEASAAKAIABEAQzgEACyAAKAIEIAAQBBAECyMAIAIQBSECIAAQvQEgARC9ASACEDhBCHRBygByEMUBELsBCx4AAkAgAARAIAAoAgANASAAEAQPCxDNAQALEM4BAAsPACAAIAEgAiADQRIQ7gELDwAgACABIAIgA0EYEO4BCw8AIAAgASACIANBHBDuAQsPACAAIAEgAiADQR0Q7gELDwAgACABIAIgA0EiEO4BCw8AIAAgASACIANBIxDuAQsPACAAIAEgAiADQSgQ7gELDwAgACABIAIgA0EqEO4BCw8AIAAgASACIANBLBDuAQsPACAAIAEgAiADQTgQ7gELEAAgACABIAIgA0HTABDvAQsQACAAIAEgAiADQdQAEO8BCxAAIAAgASACIANB3gAQ7wELEAAgACABIAIgA0HfABDvAQsQACAAIAEgAiADQeAAEO8BCxAAIAAgASACIANB4QAQ7wELEAAgACABIAIgA0HiABDvAQsQACAAIAEgAiADQeMAEO8BCxAAIAAgASACIANB5AAQ7wELEAAgACABIAIgA0HlABDvAQsQACAAIAEgAiADQeYAEO4BCxAAIAAgASACIANB5wAQ7gELEAAgACABIAIgA0HoABDuAQsQACAAIAEgAiADQekAEO4BCxAAIAAgASACIANB6gAQ7gELEAAgACABIAIgA0HrABDuAQsQACAAIAEgAiADQewAEO4BCx0BAX8jAEEQayIBJAAgAUEIaiAAEB0gAUEQaiQACx0BAX8jAEEQayIBJAAgAUEIaiAAEBMgAUEQaiQACx8AIAEQWCEBIAAQvQEgARC3AUEIdEHMAHIQxQEQuwELGQAgACABIAJBIEEAIAQbQRBBACADG3IQEgsNACAAIAEgAkEBEPABCw0AIAAgASACQQIQ8AELDQAgACABIAJBAxDwAQsNACAAIAEgAkEEEPABCw0AIAAgASACQQUQ8AELDQAgACABIAJBBhDwAQsNACAAIAEgAkEHEPABCw0AIAAgASACQQgQ8AELDQAgACABIAJBCRDwAQsNACAAIAEgAkELEPABCw0AIAAgASACQQ0Q8AELDQAgACABIAJBDhDwAQsNACAAIAEgAkEPEPABCw0AIAAgASACQRAQ8AELDQAgACABIAJBERDwAQsNACAAIAEgAkEXEPABCw0AIAAgASACQSEQ8AELDQAgACABIAJBJhDwAQsNACAAIAEgAkEnEPABCw0AIAAgASACQSkQ8AELDQAgACABIAJBKxDwAQsNACAAIAEgAkEtEPABCw0AIAAgASACQS4Q8AELDQAgACABIAJBLxDwAQsNACAAIAEgAkEwEPABCw0AIAAgASACQTEQ8AELDQAgACABIAJBNRDwAQsNACAAIAEgAkE3EPABCw0AIAAgASACQTkQ8QELDQAgACABIAJBOhDxAQsNACAAIAEgAkE7EPEBCw0AIAAgASACQTwQ8QELDQAgACABIAJBPRDxAQsNACAAIAEgAkE+EPEBCw0AIAAgASACQT8Q8QELDgAgACABIAJBwAAQ8QELDgAgACABIAJBwQAQ8QELDgAgACABIAJBwgAQ8QELDgAgACABIAJBwwAQ8QELDgAgACABIAJBxAAQ8QELDgAgACABIAJBxQAQ8QELDgAgACABIAJBxgAQ8QELDgAgACABIAJBxwAQ8QELDgAgACABIAJByAAQ8QELDgAgACABIAJByQAQ8QELDgAgACABIAJBygAQ8QELDgAgACABIAJB0QAQ8QELDgAgACABIAJB0gAQ8QELGAEBfyAAQf8BcUE/TQR/IAAQvAEFQQALCx4BAX9BCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQsbACAAEMQBIAAoAgBBf0YEQBDOAQALIAAtAAQLCQAgAEETEPMBCwkAIABBFRDzAQsJACAAQRoQ8wELCQAgAEEgEPMBCwkAIABBJRDzAQsJACAAQTQQ8wELCQAgAEE2EPMBCwoAIABB2AAQ8wELCgAgAEHZABDzAQsXACABQRB0QYCA/AdxIABBAnRB/AFxcgsXACAAEMQBIAAoAgAEQBDOAQALIAAQBAscACAAEL0BIAEQvQEgAhC9ARArQQh0EMUBELsBCxIAIAEgABDHASIABEAgAA8LAAsbAQF/QQhBBBC6ASIBIAA2AgQgAUEANgIAIAELGwEBf0EIQQQQugEiASAAOgAEIAFBADYCACABC24AIABB/wFxQcAATwRAIwBBMGsiACQAIABBIjYCDCAAQYCAwAA2AgggAEEcakIBNwIAIABBATYCFCAAQbCGwAA2AhAgAEEBNgIsIAAgAEEoajYCGCAAIABBCGo2AiggAEEQakG4gMAAEEkACyAACxQAIAAgASACQSBBACADGyAEchASCxgAIAAQUSABEFEgAhBRIAMQPRDCARCsAQsXACAAEFEgARBRIAIQUSADEFEQEhCsAQsTACAAEFEgARBRIAIQBRA4EKwBCxEAIAAgASACQSBBACADGxASCxMAIAAQUSABEFEgAhBSEDgQrAELDAAgAARADwsQzQEACxQBAX9BBEEBELoBIgEgADYAACABCxQBAX9BCEEEELoBIgBCADcCACAAC4EDAQV/QaWNwAAtAAAaAn8gAEEJTwRAAkBBzf97QRAgACAAQRBNGyIAayABTQ0AIABBECABQQtqQXhxIAFBC0kbIgRqQQxqEAEiAkUNACACQQhrIQECQCAAQQFrIgMgAnFFBEAgASEADAELIAJBBGsiBSgCACIGQXhxIAIgA2pBACAAa3FBCGsiAiAAQQAgAiABa0EQTRtqIgAgAWsiAmshAyAGQQNxBEAgACADIAAoAgRBAXFyQQJyNgIEIAAgA2oiAyADKAIEQQFyNgIEIAUgAiAFKAIAQQFxckECcjYCACABIAJqIgMgAygCBEEBcjYCBCABIAIQBgwBCyABKAIAIQEgACADNgIEIAAgASACajYCAAsCQCAAKAIEIgFBA3FFDQAgAUF4cSICIARBEGpNDQAgACAEIAFBAXFyQQJyNgIEIAAgBGoiASACIARrIgRBA3I2AgQgACACaiICIAIoAgRBAXI2AgQgASAEEAYLIABBCGohAwsgAwwBCyABEAELCw0AIAAQ1QFBCnZBP3ELEAAgABBRIAEQWBC3ARCsAQsgACAAQsWAsKa9qOHJSzcDCCAAQpXM9oWR7LDtHzcDAAsLACABBEAgABAECwsLACAAIwBqJAAjAAsNAEHoiMAAQRsQ0gEACw4AQYOJwABBzwAQ0gEACwsAIAAxAAAgARADCwsAIAAzAQAgARADCwsAIAA1AgAgARADCwkAIAAgARAAAAsKACAAQT9xELwBCwoAIAAQUUH/AXELBwAgAEEIdAsHACAAED0aCwcAIAAQURoLBwAgABBSGgsHACAAEFMaCwoAQTMQxQEQuwELBwBBCxC8AQsHAEEKELwBCwcAQQgQvAELBwBBDxC8AQsHAEEGELwBCwcAQQkQvAELBwBBBxC8AQsHAEEMELwBCwcAQQIQvAELBwBBARC8AQsHAEEDELwBCwcAQQ0QvAELBwBBDhC8AQsHAEEFELwBCwcAQQQQvAELBwBBEBC8AQsHAEEAELwBCwQAQQQLAgALJAAgABC9ASABEL0BIAIQvQEgAxC9ARASQQh0IARyEMUBELsBCyMAIAAQvQEgARC9ASACEL0BIAMQDRASQQh0IARyEMUBELsBCx8AIAAQvQEgARC9ASACEL0BECtBCHQgA3IQxQEQuwELHgAgABC9ASABEL0BIAIQDhA4QQh0IANyEMUBELsBC2IBAX8jAEEwayIEJAAgBCAANgIMIAAgA08EQCAEQRxqQgE3AgAgBEECNgIUIAQgAjYCECAEQQQ2AiwgBCAEQShqNgIYIAQgBEEMajYCKCAEQRBqIAEQSQALIARBMGokACAACxsAIAAQvQEaIABBCnRBgPgDcSABchDFARC7AQtSAQJ/IwBBEGsiBSQAIAVBCGogAxATIAUtAAkhAyAFLQAIIQYgABC9ASABEL0BIAIQvQEgBkEBcSADQQFxEHpBCHQgBHIQxQEQuwEgBUEQaiQAC1ABAn8jAEEQayIFJAAgBUEIaiADEB0gBS0ACCEDIAUtAAkhBiAAEL0BIAEQvQEgAhC9ASADQQFxIAYQvgFBCHQgBHIQxQEQuwEgBUEQaiQAC0oAIAAQvQEaIAEQECIBQRB0QYCA/AdxIABBEnRBgIDwH3EgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyQQh0IAJyEMUBELsBC0kBAX8jAEEQayIDJAAgABDEASABIAJPBEBB4ILAAEEZENIBAAsgA0EIaiAAEFQgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQgAgABC9ARogARC9ARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyEMUBELsBCzYAIAAQESIAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2ckEIdCABchDFARC7AQsL3AkBAEGAgMAAC9IJQ2hlY2tSZWdJZCB3YXMgZ2l2ZW4gaW52YWxpZCBSZWdJZGZ1ZWwtYXNtL3NyYy9saWIucnMAAAAiABAAEwAAAG4AAAAiAAAAVmFsdWUgYGAgb3V0IG9mIHJhbmdlIGZvciA2LWJpdCBpbW1lZGlhdGUAAABIABAABwAAAE8AEAAiAAAAIgAQABMAAACpAwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxMi1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAlAAQACMAAAAiABAAEwAAAK4DAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDE4LWJpdCBpbW1lZGlhdGUASAAQAAcAAADYABAAIwAAACIAEAATAAAAswMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMjQtYml0IGltbWVkaWF0ZQBIABAABwAAABwBEAAjAAAAIgAQABMAAAC4AwAAHAAAAGludmFsaWQgZW51bSB2YWx1ZSBwYXNzZWQAAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAkAAAAJEAAACSAAAAkwAAAJQAAACVAAAAlgAAAJcAAACYAAAAoAAAAKEAAACiAAAAowAAAKQAAAClAAAApgAAAKcAAACoAAAAqQAAAKoAAACrAAAArAAAAK0AAACwAAAAaAQQAAAAAAAFAAAAAAAAAAEAAAAGAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTljYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlbGlicmFyeS9zdGQvc3JjL3Bhbmlja2luZy5ycwA7BBAAHAAAAIQCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMC4zDHdhc20tYmluZGdlbgYwLjIuOTI=", e);
}
async function Co() {
  return await tu(Hh());
}
Co();
function Ja(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function Yh(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Ms(e, ...t) {
  if (!Yh(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function Xh(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ja(e.outputLen), Ja(e.blockLen);
}
function Es(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Wh(e, t) {
  Ms(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Ai = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const li = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Ot = (e, t) => e << 32 - t | e >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function Zh(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Bo(e) {
  return typeof e == "string" && (e = Zh(e)), Ms(e), e;
}
function Jh(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    Ms(s), t += s.length;
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, s), s += i.length;
  }
  return n;
}
class nu {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function qh(e) {
  const t = (r) => e().update(Bo(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function jh(e = 32) {
  if (Ai && typeof Ai.getRandomValues == "function")
    return Ai.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function $h(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), A = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + A, o, r), e.setUint32(t + h, c, r);
}
const Kh = (e, t, n) => e & t ^ ~e & n, eg = (e, t, n) => e & t ^ e & n ^ t & n;
class tg extends nu {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = li(this.buffer);
  }
  update(t) {
    Es(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Bo(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const A = li(t);
        for (; s <= i - o; o += s)
          this.process(A, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Es(this), Wh(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let w = o; w < s; w++)
      n[w] = 0;
    $h(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = li(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = A / 4, b = this.get();
    if (h > b.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let w = 0; w < h; w++)
      c.setUint32(4 * w, b[w], i);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: c } = this;
    return t.length = s, t.pos = c, t.finished = i, t.destroyed = o, s % n && t.buffer.set(r), t;
  }
}
const ng = /* @__PURE__ */ new Uint32Array([
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
]), nn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), rn = /* @__PURE__ */ new Uint32Array(64);
class rg extends tg {
  constructor() {
    super(64, 32, 8, !1), this.A = nn[0] | 0, this.B = nn[1] | 0, this.C = nn[2] | 0, this.D = nn[3] | 0, this.E = nn[4] | 0, this.F = nn[5] | 0, this.G = nn[6] | 0, this.H = nn[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: c, H: A } = this;
    return [t, n, r, s, i, o, c, A];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, A) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = A | 0;
  }
  process(t, n) {
    for (let w = 0; w < 16; w++, n += 4)
      rn[w] = t.getUint32(n, !1);
    for (let w = 16; w < 64; w++) {
      const x = rn[w - 15], _ = rn[w - 2], R = Ot(x, 7) ^ Ot(x, 18) ^ x >>> 3, C = Ot(_, 17) ^ Ot(_, 19) ^ _ >>> 10;
      rn[w] = C + rn[w - 7] + R + rn[w - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: A, G: h, H: b } = this;
    for (let w = 0; w < 64; w++) {
      const x = Ot(c, 6) ^ Ot(c, 11) ^ Ot(c, 25), _ = b + x + Kh(c, A, h) + ng[w] + rn[w] | 0, C = (Ot(r, 2) ^ Ot(r, 13) ^ Ot(r, 22)) + eg(r, s, i) | 0;
      b = h, h = A, A = c, c = o + _ | 0, o = i, i = s, s = r, r = _ + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, A = A + this.F | 0, h = h + this.G | 0, b = b + this.H | 0, this.set(r, s, i, o, c, A, h, b);
  }
  roundClean() {
    rn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const sg = /* @__PURE__ */ qh(() => new rg());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const gt = BigInt(0), ke = BigInt(1), xn = BigInt(2), ig = BigInt(3), Mi = BigInt(4), qa = BigInt(5), ja = BigInt(8);
BigInt(9);
BigInt(16);
function It(e, t) {
  const n = e % t;
  return n >= gt ? n : t + n;
}
function og(e, t, n) {
  if (n <= gt || t < gt)
    throw new Error("Expected power/modulo > 0");
  if (n === ke)
    return gt;
  let r = ke;
  for (; t > gt; )
    t & ke && (r = r * e % n), e = e * e % n, t >>= ke;
  return r;
}
function vt(e, t, n) {
  let r = e;
  for (; t-- > gt; )
    r *= r, r %= n;
  return r;
}
function Li(e, t) {
  if (e === gt || t <= gt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = It(e, t), r = t, s = gt, i = ke;
  for (; n !== gt; ) {
    const c = r / n, A = r % n, h = s - i * c;
    r = n, n = A, s = i, i = h;
  }
  if (r !== ke)
    throw new Error("invert: does not exist");
  return It(s, t);
}
function ag(e) {
  const t = (e - ke) / xn;
  let n, r, s;
  for (n = e - ke, r = 0; n % xn === gt; n /= xn, r++)
    ;
  for (s = xn; s < e && og(s, t, e) !== e - ke; s++)
    ;
  if (r === 1) {
    const o = (e + ke) / Mi;
    return function(A, h) {
      const b = A.pow(h, o);
      if (!A.eql(A.sqr(b), h))
        throw new Error("Cannot find square root");
      return b;
    };
  }
  const i = (n + ke) / xn;
  return function(c, A) {
    if (c.pow(A, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let h = r, b = c.pow(c.mul(c.ONE, s), n), w = c.pow(A, i), x = c.pow(A, n);
    for (; !c.eql(x, c.ONE); ) {
      if (c.eql(x, c.ZERO))
        return c.ZERO;
      let _ = 1;
      for (let C = c.sqr(x); _ < h && !c.eql(C, c.ONE); _++)
        C = c.sqr(C);
      const R = c.pow(b, ke << BigInt(h - _ - 1));
      b = c.sqr(R), w = c.mul(w, R), x = c.mul(x, b), h = _;
    }
    return w;
  };
}
function cg(e) {
  if (e % Mi === ig) {
    const t = (e + ke) / Mi;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % ja === qa) {
    const t = (e - qa) / ja;
    return function(r, s) {
      const i = r.mul(s, xn), o = r.pow(i, t), c = r.mul(s, o), A = r.mul(r.mul(c, xn), o), h = r.mul(c, r.sub(A, r.ONE));
      if (!r.eql(r.sqr(h), s))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  return ag(e);
}
const ug = [
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
function dg(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = ug.reduce((r, s) => (r[s] = "function", r), t);
  return Nr(e, n);
}
function Ag(e, t, n) {
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
function lg(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, c) => e.is0(o) ? i : (n[c] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, c) => e.is0(o) ? i : (n[c] = e.mul(i, n[c]), e.mul(i, o)), s), n;
}
function ru(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function fg(e, t, n = !1, r = {}) {
  if (e <= gt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = ru(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = cg(e), c = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: yo(s),
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
    pow: (A, h) => Ag(c, A, h),
    div: (A, h) => It(A * Li(h, e), e),
    // Same as above, but doesn't normalize
    sqrN: (A) => A * A,
    addN: (A, h) => A + h,
    subN: (A, h) => A - h,
    mulN: (A, h) => A * h,
    inv: (A) => Li(A, e),
    sqrt: r.sqrt || ((A) => o(c, A)),
    invertBatch: (A) => lg(c, A),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (A, h, b) => b ? h : A,
    toBytes: (A) => n ? wo(A, i) : Kn(A, i),
    fromBytes: (A) => {
      if (A.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${A.length}`);
      return n ? mo(A) : Qn(A);
    }
  });
  return Object.freeze(c);
}
function su(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function iu(e) {
  const t = su(e);
  return t + Math.ceil(t / 2);
}
function hg(e, t, n = !1) {
  const r = e.length, s = su(t), i = iu(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Qn(e) : mo(e), c = It(o, t - ke) + ke;
  return n ? wo(c, s) : Kn(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const gg = BigInt(0), fi = BigInt(1);
function pg(e, t) {
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
      let o = e.ZERO, c = s;
      for (; i > gg; )
        i & fi && (o = o.add(c)), c = c.double(), i >>= fi;
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
      const { windows: o, windowSize: c } = r(i), A = [];
      let h = s, b = h;
      for (let w = 0; w < o; w++) {
        b = h, A.push(b);
        for (let x = 1; x < c; x++)
          b = b.add(h), A.push(b);
        h = b.double();
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
      const { windows: c, windowSize: A } = r(s);
      let h = e.ZERO, b = e.BASE;
      const w = BigInt(2 ** s - 1), x = 2 ** s, _ = BigInt(s);
      for (let R = 0; R < c; R++) {
        const C = R * A;
        let F = Number(o & w);
        o >>= _, F > A && (F -= x, o += fi);
        const M = C, G = C + Math.abs(F) - 1, O = R % 2 !== 0, Z = F < 0;
        F === 0 ? b = b.add(n(O, i[M])) : h = h.add(n(Z, i[G]));
      }
      return { p: h, f: b };
    },
    wNAFCached(s, i, o, c) {
      const A = s._WINDOW_SIZE || 1;
      let h = i.get(s);
      return h || (h = this.precomputeWindow(s, A), A !== 1 && i.set(s, c(h))), this.wNAF(A, h, o);
    }
  };
}
function ou(e) {
  return dg(e.Fp), Nr(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...ru(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function mg(e) {
  const t = ou(e);
  Nr(t, {
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
const { bytesToNumberBE: wg, hexToBytes: yg } = cf, _n = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = _n;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: wg(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = _n, n = typeof e == "string" ? yg(e) : e;
    Qr(n);
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = _n._parseInt(n.subarray(2)), { d: o, l: c } = _n._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (h) => Number.parseInt(h[0], 16) & 8 ? "00" + h : h, n = (h) => {
      const b = h.toString(16);
      return b.length & 1 ? `0${b}` : b;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, c = n(i), A = n(o);
    return `30${n(o + i + 4)}02${A}${s}02${c}${r}`;
  }
}, Wt = BigInt(0), Rt = BigInt(1);
BigInt(2);
const $a = BigInt(3);
BigInt(4);
function Ig(e) {
  const t = mg(e), { Fp: n } = t, r = t.toBytes || ((R, C, F) => {
    const M = C.toAffine();
    return Er(Uint8Array.from([4]), n.toBytes(M.x), n.toBytes(M.y));
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
    return typeof R == "bigint" && Wt < R && R < t.n;
  }
  function c(R) {
    if (!o(R))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function A(R) {
    const { allowedPrivateKeyLengths: C, nByteLength: F, wrapPrivateKey: M, n: G } = t;
    if (C && typeof R != "bigint") {
      if (Dn(R) && (R = jn(R)), typeof R != "string" || !C.includes(R.length))
        throw new Error("Invalid key");
      R = R.padStart(F * 2, "0");
    }
    let O;
    try {
      O = typeof R == "bigint" ? R : Qn(Nt("private key", R, F));
    } catch {
      throw new Error(`private key must be ${F} bytes, hex or bigint, not ${typeof R}`);
    }
    return M && (O = It(O, G)), c(O), O;
  }
  const h = /* @__PURE__ */ new Map();
  function b(R) {
    if (!(R instanceof w))
      throw new Error("ProjectivePoint expected");
  }
  class w {
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
      if (C instanceof w)
        throw new Error("projective point not allowed");
      const G = (O) => n.eql(O, n.ZERO);
      return G(F) && G(M) ? w.ZERO : new w(F, M, n.ONE);
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
      return C.map((M, G) => M.toAffine(F[G])).map(w.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(C) {
      const F = w.fromAffine(s(Nt("pointHex", C)));
      return F.assertValidity(), F;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(C) {
      return w.BASE.multiply(A(C));
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
      b(C);
      const { px: F, py: M, pz: G } = this, { px: O, py: Z, pz: L } = C, T = n.eql(n.mul(F, L), n.mul(O, G)), k = n.eql(n.mul(M, L), n.mul(Z, G));
      return T && k;
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
      const { a: C, b: F } = t, M = n.mul(F, $a), { px: G, py: O, pz: Z } = this;
      let L = n.ZERO, T = n.ZERO, k = n.ZERO, U = n.mul(G, G), q = n.mul(O, O), Y = n.mul(Z, Z), W = n.mul(G, O);
      return W = n.add(W, W), k = n.mul(G, Z), k = n.add(k, k), L = n.mul(C, k), T = n.mul(M, Y), T = n.add(L, T), L = n.sub(q, T), T = n.add(q, T), T = n.mul(L, T), L = n.mul(W, L), k = n.mul(M, k), Y = n.mul(C, Y), W = n.sub(U, Y), W = n.mul(C, W), W = n.add(W, k), k = n.add(U, U), U = n.add(k, U), U = n.add(U, Y), U = n.mul(U, W), T = n.add(T, U), Y = n.mul(O, Z), Y = n.add(Y, Y), U = n.mul(Y, W), L = n.sub(L, U), k = n.mul(Y, q), k = n.add(k, k), k = n.add(k, k), new w(L, T, k);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(C) {
      b(C);
      const { px: F, py: M, pz: G } = this, { px: O, py: Z, pz: L } = C;
      let T = n.ZERO, k = n.ZERO, U = n.ZERO;
      const q = t.a, Y = n.mul(t.b, $a);
      let W = n.mul(F, O), ee = n.mul(M, Z), E = n.mul(G, L), a = n.add(F, M), u = n.add(O, Z);
      a = n.mul(a, u), u = n.add(W, ee), a = n.sub(a, u), u = n.add(F, G);
      let l = n.add(O, L);
      return u = n.mul(u, l), l = n.add(W, E), u = n.sub(u, l), l = n.add(M, G), T = n.add(Z, L), l = n.mul(l, T), T = n.add(ee, E), l = n.sub(l, T), U = n.mul(q, u), T = n.mul(Y, E), U = n.add(T, U), T = n.sub(ee, U), U = n.add(ee, U), k = n.mul(T, U), ee = n.add(W, W), ee = n.add(ee, W), E = n.mul(q, E), u = n.mul(Y, u), ee = n.add(ee, E), E = n.sub(W, E), E = n.mul(q, E), u = n.add(u, E), W = n.mul(ee, u), k = n.add(k, W), W = n.mul(l, u), T = n.mul(a, T), T = n.sub(T, W), W = n.mul(a, ee), U = n.mul(l, U), U = n.add(U, W), new w(T, k, U);
    }
    subtract(C) {
      return this.add(C.negate());
    }
    is0() {
      return this.equals(w.ZERO);
    }
    wNAF(C) {
      return _.wNAFCached(this, h, C, (F) => {
        const M = n.invertBatch(F.map((G) => G.pz));
        return F.map((G, O) => G.toAffine(M[O])).map(w.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(C) {
      const F = w.ZERO;
      if (C === Wt)
        return F;
      if (c(C), C === Rt)
        return this;
      const { endo: M } = t;
      if (!M)
        return _.unsafeLadder(this, C);
      let { k1neg: G, k1: O, k2neg: Z, k2: L } = M.splitScalar(C), T = F, k = F, U = this;
      for (; O > Wt || L > Wt; )
        O & Rt && (T = T.add(U)), L & Rt && (k = k.add(U)), U = U.double(), O >>= Rt, L >>= Rt;
      return G && (T = T.negate()), Z && (k = k.negate()), k = new w(n.mul(k.px, M.beta), k.py, k.pz), T.add(k);
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
      c(C);
      let F = C, M, G;
      const { endo: O } = t;
      if (O) {
        const { k1neg: Z, k1: L, k2neg: T, k2: k } = O.splitScalar(F);
        let { p: U, f: q } = this.wNAF(L), { p: Y, f: W } = this.wNAF(k);
        U = _.constTimeNegate(Z, U), Y = _.constTimeNegate(T, Y), Y = new w(n.mul(Y.px, O.beta), Y.py, Y.pz), M = U.add(Y), G = q.add(W);
      } else {
        const { p: Z, f: L } = this.wNAF(F);
        M = Z, G = L;
      }
      return w.normalizeZ([M, G])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(C, F, M) {
      const G = w.BASE, O = (L, T) => T === Wt || T === Rt || !L.equals(G) ? L.multiplyUnsafe(T) : L.multiply(T), Z = O(this, F).add(O(C, M));
      return Z.is0() ? void 0 : Z;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(C) {
      const { px: F, py: M, pz: G } = this, O = this.is0();
      C == null && (C = O ? n.ONE : n.inv(G));
      const Z = n.mul(F, C), L = n.mul(M, C), T = n.mul(G, C);
      if (O)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(T, n.ONE))
        throw new Error("invZ was invalid");
      return { x: Z, y: L };
    }
    isTorsionFree() {
      const { h: C, isTorsionFree: F } = t;
      if (C === Rt)
        return !0;
      if (F)
        return F(w, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: C, clearCofactor: F } = t;
      return C === Rt ? this : F ? F(w, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(C = !0) {
      return this.assertValidity(), r(w, this, C);
    }
    toHex(C = !0) {
      return jn(this.toRawBytes(C));
    }
  }
  w.BASE = new w(t.Gx, t.Gy, n.ONE), w.ZERO = new w(n.ZERO, n.ONE, n.ZERO);
  const x = t.nBitLength, _ = pg(w, t.endo ? Math.ceil(x / 2) : x);
  return {
    CURVE: t,
    ProjectivePoint: w,
    normPrivateKeyToScalar: A,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function bg(e) {
  const t = ou(e);
  return Nr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Eg(e) {
  const t = bg(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(u) {
    return Wt < u && u < n.ORDER;
  }
  function c(u) {
    return It(u, r);
  }
  function A(u) {
    return Li(u, r);
  }
  const { ProjectivePoint: h, normPrivateKeyToScalar: b, weierstrassEquation: w, isWithinCurveOrder: x } = Ig({
    ...t,
    toBytes(u, l, p) {
      const f = l.toAffine(), y = n.toBytes(f.x), I = Er;
      return p ? I(Uint8Array.from([l.hasEvenY() ? 2 : 3]), y) : I(Uint8Array.from([4]), y, n.toBytes(f.y));
    },
    fromBytes(u) {
      const l = u.length, p = u[0], f = u.subarray(1);
      if (l === s && (p === 2 || p === 3)) {
        const y = Qn(f);
        if (!o(y))
          throw new Error("Point is not on curve");
        const I = w(y);
        let g;
        try {
          g = n.sqrt(I);
        } catch (X) {
          const J = X instanceof Error ? ": " + X.message : "";
          throw new Error("Point is not on curve" + J);
        }
        const d = (g & Rt) === Rt;
        return (p & 1) === 1 !== d && (g = n.neg(g)), { x: y, y: g };
      } else if (l === i && p === 4) {
        const y = n.fromBytes(f.subarray(0, n.BYTES)), I = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: y, y: I };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), _ = (u) => jn(Kn(u, t.nByteLength));
  function R(u) {
    const l = r >> Rt;
    return u > l;
  }
  function C(u) {
    return R(u) ? c(-u) : u;
  }
  const F = (u, l, p) => Qn(u.slice(l, p));
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
      const { r: p, s: f } = _n.toSig(Nt("DER", l));
      return new M(p, f);
    }
    assertValidity() {
      if (!x(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!x(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(l) {
      return new M(this.r, this.s, l);
    }
    recoverPublicKey(l) {
      const { r: p, s: f, recovery: y } = this, I = k(Nt("msgHash", l));
      if (y == null || ![0, 1, 2, 3].includes(y))
        throw new Error("recovery id invalid");
      const g = y === 2 || y === 3 ? p + t.n : p;
      if (g >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const d = y & 1 ? "03" : "02", m = h.fromHex(d + _(g)), X = A(g), J = c(-I * X), K = c(f * X), j = h.BASE.multiplyAndAddUnsafe(m, J, K);
      if (!j)
        throw new Error("point at infinify");
      return j.assertValidity(), j;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return R(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new M(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return $n(this.toDERHex());
    }
    toDERHex() {
      return _n.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return $n(this.toCompactHex());
    }
    toCompactHex() {
      return _(this.r) + _(this.s);
    }
  }
  const G = {
    isValidPrivateKey(u) {
      try {
        return b(u), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: b,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const u = iu(t.n);
      return hg(t.randomBytes(u), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(u = 8, l = h.BASE) {
      return l._setWindowSize(u), l.multiply(BigInt(3)), l;
    }
  };
  function O(u, l = !0) {
    return h.fromPrivateKey(u).toRawBytes(l);
  }
  function Z(u) {
    const l = Dn(u), p = typeof u == "string", f = (l || p) && u.length;
    return l ? f === s || f === i : p ? f === 2 * s || f === 2 * i : u instanceof h;
  }
  function L(u, l, p = !0) {
    if (Z(u))
      throw new Error("first arg must be private key");
    if (!Z(l))
      throw new Error("second arg must be public key");
    return h.fromHex(l).multiply(b(u)).toRawBytes(p);
  }
  const T = t.bits2int || function(u) {
    const l = Qn(u), p = u.length * 8 - t.nBitLength;
    return p > 0 ? l >> BigInt(p) : l;
  }, k = t.bits2int_modN || function(u) {
    return c(T(u));
  }, U = yo(t.nBitLength);
  function q(u) {
    if (typeof u != "bigint")
      throw new Error("bigint expected");
    if (!(Wt <= u && u < U))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return Kn(u, t.nByteLength);
  }
  function Y(u, l, p = W) {
    if (["recovered", "canonical"].some((se) => se in p))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: y } = t;
    let { lowS: I, prehash: g, extraEntropy: d } = p;
    I == null && (I = !0), u = Nt("msgHash", u), g && (u = Nt("prehashed msgHash", f(u)));
    const m = k(u), X = b(l), J = [q(X), q(m)];
    if (d != null && d !== !1) {
      const se = d === !0 ? y(n.BYTES) : d;
      J.push(Nt("extraEntropy", se));
    }
    const K = Er(...J), j = m;
    function re(se) {
      const Se = T(se);
      if (!x(Se))
        return;
      const fe = A(Se), oe = h.BASE.multiply(Se).toAffine(), _e = c(oe.x);
      if (_e === Wt)
        return;
      const Ae = c(fe * c(j + _e * X));
      if (Ae === Wt)
        return;
      let he = (oe.x === _e ? 0 : 2) | Number(oe.y & Rt), Ft = Ae;
      return I && R(Ae) && (Ft = C(Ae), he ^= 1), new M(_e, Ft, he);
    }
    return { seed: K, k2sig: re };
  }
  const W = { lowS: t.lowS, prehash: !1 }, ee = { lowS: t.lowS, prehash: !1 };
  function E(u, l, p = W) {
    const { seed: f, k2sig: y } = Y(u, l, p), I = t;
    return D0(I.hash.outputLen, I.nByteLength, I.hmac)(f, y);
  }
  h.BASE._setWindowSize(8);
  function a(u, l, p, f = ee) {
    var oe;
    const y = u;
    if (l = Nt("msgHash", l), p = Nt("publicKey", p), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: I, prehash: g } = f;
    let d, m;
    try {
      if (typeof y == "string" || Dn(y))
        try {
          d = M.fromDER(y);
        } catch (_e) {
          if (!(_e instanceof _n.Err))
            throw _e;
          d = M.fromCompact(y);
        }
      else if (typeof y == "object" && typeof y.r == "bigint" && typeof y.s == "bigint") {
        const { r: _e, s: Ae } = y;
        d = new M(_e, Ae);
      } else
        throw new Error("PARSE");
      m = h.fromHex(p);
    } catch (_e) {
      if (_e.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (I && d.hasHighS())
      return !1;
    g && (l = t.hash(l));
    const { r: X, s: J } = d, K = k(l), j = A(J), re = c(K * j), se = c(X * j), Se = (oe = h.BASE.multiplyAndAddUnsafe(m, re, se)) == null ? void 0 : oe.toAffine();
    return Se ? c(Se.x) === X : !1;
  }
  return {
    CURVE: t,
    getPublicKey: O,
    getSharedSecret: L,
    sign: E,
    verify: a,
    ProjectivePoint: h,
    Signature: M,
    utils: G
  };
}
class au extends nu {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Xh(t);
    const r = Bo(n);
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
    return Es(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Es(this), Ms(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: c } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = c, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const cu = (e, t, n) => new au(e, t).update(n).digest();
cu.create = (e, t) => new au(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Cg(e) {
  return {
    hash: e,
    hmac: (t, ...n) => cu(e, t, Jh(...n)),
    randomBytes: jh
  };
}
function Bg(e, t) {
  const n = (r) => Eg({ ...e, ...Cg(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const uu = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Ka = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), xg = BigInt(1), Oi = BigInt(2), ec = (e, t) => (e + t / Oi) / t;
function _g(e) {
  const t = uu, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), A = BigInt(88), h = e * e * e % t, b = h * h * e % t, w = vt(b, n, t) * b % t, x = vt(w, n, t) * b % t, _ = vt(x, Oi, t) * h % t, R = vt(_, s, t) * _ % t, C = vt(R, i, t) * R % t, F = vt(C, c, t) * C % t, M = vt(F, A, t) * F % t, G = vt(M, c, t) * C % t, O = vt(G, n, t) * b % t, Z = vt(O, o, t) * R % t, L = vt(Z, r, t) * h % t, T = vt(L, Oi, t);
  if (!ki.eql(ki.sqr(T), e))
    throw new Error("Cannot find square root");
  return T;
}
const ki = fg(uu, void 0, void 0, { sqrt: _g }), sn = Bg({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: ki,
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
      const t = Ka, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -xg * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = ec(i * e, t), A = ec(-r * e, t);
      let h = It(e - c * n - A * s, t), b = It(-c * r - A * i, t);
      const w = h > o, x = b > o;
      if (w && (h = t - h), x && (b = t - b), h > o || b > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: w, k1: h, k2neg: x, k2: b };
    }
  }
}, sg);
BigInt(0);
sn.ProjectivePoint;
var pt = [];
for (var hi = 0; hi < 256; ++hi)
  pt.push((hi + 256).toString(16).slice(1));
function vg(e, t = 0) {
  return (pt[e[t + 0]] + pt[e[t + 1]] + pt[e[t + 2]] + pt[e[t + 3]] + "-" + pt[e[t + 4]] + pt[e[t + 5]] + "-" + pt[e[t + 6]] + pt[e[t + 7]] + "-" + pt[e[t + 8]] + pt[e[t + 9]] + "-" + pt[e[t + 10]] + pt[e[t + 11]] + pt[e[t + 12]] + pt[e[t + 13]] + pt[e[t + 14]] + pt[e[t + 15]]).toLowerCase();
}
var Zr, Rg = new Uint8Array(16);
function Sg() {
  if (!Zr && (Zr = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Zr))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Zr(Rg);
}
var Qg = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const tc = {
  randomUUID: Qg
};
function Ng(e, t, n) {
  if (tc.randomUUID && !t && !e)
    return tc.randomUUID();
  e = e || {};
  var r = e.random || (e.rng || Sg)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (var s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return vg(r);
}
var xo = { exports: {} }, Vn = typeof Reflect == "object" ? Reflect : null, nc = Vn && typeof Vn.apply == "function" ? Vn.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, cs;
Vn && typeof Vn.ownKeys == "function" ? cs = Vn.ownKeys : Object.getOwnPropertySymbols ? cs = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : cs = function(t) {
  return Object.getOwnPropertyNames(t);
};
function Dg(e) {
  console && console.warn && console.warn(e);
}
var du = Number.isNaN || function(t) {
  return t !== t;
};
function Be() {
  Be.init.call(this);
}
xo.exports = Be;
xo.exports.once = Lg;
Be.EventEmitter = Be;
Be.prototype._events = void 0;
Be.prototype._eventsCount = 0;
Be.prototype._maxListeners = void 0;
var rc = 10;
function Ls(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Be, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return rc;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || du(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    rc = e;
  }
});
Be.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Be.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || du(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Au(e) {
  return e._maxListeners === void 0 ? Be.defaultMaxListeners : e._maxListeners;
}
Be.prototype.getMaxListeners = function() {
  return Au(this);
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
    var c = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw c.context = o, c;
  }
  var A = i[t];
  if (A === void 0)
    return !1;
  if (typeof A == "function")
    nc(A, this, n);
  else
    for (var h = A.length, b = pu(A, h), r = 0; r < h; ++r)
      nc(b[r], this, n);
  return !0;
};
function lu(e, t, n, r) {
  var s, i, o;
  if (Ls(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = Au(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = o.length, Dg(c);
  }
  return e;
}
Be.prototype.addListener = function(t, n) {
  return lu(this, t, n, !1);
};
Be.prototype.on = Be.prototype.addListener;
Be.prototype.prependListener = function(t, n) {
  return lu(this, t, n, !0);
};
function Tg() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function fu(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = Tg.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Be.prototype.once = function(t, n) {
  return Ls(n), this.on(t, fu(this, t, n)), this;
};
Be.prototype.prependOnceListener = function(t, n) {
  return Ls(n), this.prependListener(t, fu(this, t, n)), this;
};
Be.prototype.removeListener = function(t, n) {
  var r, s, i, o, c;
  if (Ls(n), s = this._events, s === void 0)
    return this;
  if (r = s[t], r === void 0)
    return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete s[t], s.removeListener && this.emit("removeListener", t, r.listener || n));
  else if (typeof r != "function") {
    for (i = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === n || r[o].listener === n) {
        c = r[o].listener, i = o;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? r.shift() : Fg(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, c || n);
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
function hu(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? Mg(s) : pu(s, s.length);
}
Be.prototype.listeners = function(t) {
  return hu(this, t, !0);
};
Be.prototype.rawListeners = function(t) {
  return hu(this, t, !1);
};
Be.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : gu.call(e, t);
};
Be.prototype.listenerCount = gu;
function gu(e) {
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
  return this._eventsCount > 0 ? cs(this._events) : [];
};
function pu(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function Fg(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function Mg(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function Lg(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    mu(e, t, i, { once: !0 }), t !== "error" && Og(e, s, { once: !0 });
  });
}
function Og(e, t, n) {
  typeof e.on == "function" && mu(e, "error", t, n);
}
function mu(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var wu = xo.exports, kg = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Pg = class {
  constructor(e, t, n, r, s, i = 0) {
    S(this, "left");
    S(this, "right");
    S(this, "parent");
    S(this, "hash");
    S(this, "data");
    S(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, sc = Pg;
function Ug(e) {
  return qt("0x00".concat(e.slice(2)));
}
function Gg(e, t) {
  return qt("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function yu(e) {
  if (!e.length)
    return kg;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = Ug(e[i]);
    t.push(new sc(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = Gg(n[o].hash, n[o + 1].hash);
      t[i] = new sc(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var Vg = "0x00", Iu = "0x01";
function zg(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(qt(t).slice(2));
  return [qt(n), n];
}
function Fn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [qt(n), n];
}
function gi(e) {
  const t = Iu.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Hg(e) {
  const t = Iu.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function pi(e) {
  return e.slice(0, 4) === Vg;
}
var Yg = class {
  constructor(e, t, n, r, s) {
    S(this, "SideNodes");
    S(this, "NonMembershipLeafData");
    S(this, "BitMask");
    S(this, "NumSideNodes");
    S(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, Xg = Yg, Wg = class {
  constructor(e, t, n) {
    S(this, "SideNodes");
    S(this, "NonMembershipLeafData");
    S(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, Zg = Wg, xt = "0x0000000000000000000000000000000000000000000000000000000000000000", Xt = 256;
function kn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function Jg(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function qg(e, t) {
  let n = 0;
  for (let r = 0; r < Xt && kn(e, r) === kn(t, r); r += 1)
    n += 1;
  return n;
}
function jg(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === xt ? t.push(0) : (n.push(r), t.push(1));
  return new Xg(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var $g = class {
  constructor() {
    S(this, "ms");
    S(this, "root");
    const e = {};
    this.ms = e, this.root = xt, this.ms[this.root] = xt;
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
    if (t === xt)
      return [n, xt, "", ""];
    let r = this.get(t);
    if (pi(r))
      return [n, t, r, ""];
    let s, i, o = "", c = "";
    for (let h = 0; h < Xt; h += 1) {
      if ([s, i] = Hg(r), kn(e, h) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === xt) {
        r = "";
        break;
      }
      if (r = this.get(o), pi(r))
        break;
    }
    const A = this.get(c);
    return [Jg(n), o, r, A];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === xt)
      return this.root;
    const [s] = gi(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", c = "", A = "", h = !1;
    for (let b = 0; b < t.length; b += 1)
      if (t[b] !== "") {
        if (c = t[b], o === "")
          if (A = this.get(c), pi(A)) {
            i = c, o = c;
            continue;
          } else
            o = xt, h = !0;
        !h && c === xt || (h || (h = !0), kn(e, t.length - 1 - b) === 1 ? [i, o] = Fn(c, o) : [i, o] = Fn(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = xt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(qt(t), t), [i, o] = zg(e, t), this.set(i, o), o = i;
    let c;
    if (r === xt)
      c = Xt;
    else {
      const [A] = gi(s);
      c = qg(e, A);
    }
    c !== Xt && (kn(e, c) === 1 ? [i, o] = Fn(r, o) : [i, o] = Fn(o, r), this.set(i, o), o = i);
    for (let A = 0; A < Xt; A += 1) {
      let h;
      const b = Xt - n.length;
      if (A - b < 0 || n[A - b] === "")
        if (c !== Xt && c > Xt - 1 - A)
          h = xt;
        else
          continue;
      else
        h = n[A - b];
      kn(e, Xt - 1 - A) === 1 ? [i, o] = Fn(h, o) : [i, o] = Fn(o, h), this.set(i, o), o = i;
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
    if (n !== xt) {
      const [A] = gi(r);
      A !== e && (o = r);
    }
    return new Zg(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return jg(t);
  }
}, Kg = Object.defineProperty, ep = (e, t, n) => t in e ? Kg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, De = (e, t, n) => (ep(e, typeof t != "symbol" ? t + "" : t, n), n), _o = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Re = (e, t, n) => (_o(e, t, "read from private field"), n ? n.call(e) : t.get(e)), dn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Dt = (e, t, n, r) => (_o(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Pi = (e, t, n) => (_o(e, t, "access private method"), n), vo = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1], r = e[2] ?? void 0) : (n = e.amount, t = e.assetId, r = e.max ?? void 0);
  const s = B(n);
  return {
    assetId: z(t),
    amount: s.lt(1) ? B(1) : s,
    max: r ? B(r) : void 0
  };
}, tp = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, bu = ne`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  type: __typename
  ... on SqueezedOutStatus {
    reason
  }
}
    `, np = ne`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, Ro = ne`
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
    `, rp = ne`
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
    ${Ro}`, sp = ne`
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
    ${Ro}`, ip = ne`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, op = ne`
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
    ${np}
${rp}
${sp}
${ip}`, Mr = ne`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${op}`, ap = ne`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, cp = ne`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${ap}`, up = ne`
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
    `, dp = ne`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, Ap = ne`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${up}
${dp}`, lp = ne`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${Ap}
${Ro}`, So = ne`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, fp = ne`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, Eu = ne`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, hp = ne`
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
    version
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
    version
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
    `, Cu = ne`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Os = ne`
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
    `, gp = ne`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, pp = ne`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, mp = ne`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, wp = ne`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, yp = ne`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, Ip = ne`
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
    `, bp = ne`
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
  alocDependentCost {
    ...DependentCostFragment
  }
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
    ${Ip}`, Ep = ne`
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
    ${gp}
${pp}
${mp}
${wp}
${yp}
${bp}`, Cp = ne`
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
    ${Os}
${Ep}`, Bp = ne`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Lr = ne`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, xp = ne`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, _p = ne`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, vp = ne`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, Rp = ne`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${xp}`, Sp = ne`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${Cp}`, Qp = ne`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Mr}`, Np = ne`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Mr}`, Dp = ne`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
    pageInfo {
      ...pageInfoFragment
    }
  }
}
    ${Mr}
${Lr}`, Tp = ne`
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
    ${Lr}
${Mr}`, Fp = ne`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${cp}`, Mp = ne`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Os}`, Lp = ne`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Os}
${Mr}`, Op = ne`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${Os}`, kp = ne`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${So}`, Pp = ne`
    query getCoins($filter: CoinFilterInput!, $after: String, $before: String, $first: Int, $last: Int) {
  coins(
    filter: $filter
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
        ...coinFragment
      }
    }
  }
}
    ${Lr}
${So}`, Up = ne`
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
    ${So}
${fp}`, Gp = ne`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, Vp = ne`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${Bp}`, zp = ne`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${Cu}`, Hp = ne`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, Yp = ne`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, Xp = ne`
    query getBalances($filter: BalanceFilterInput!, $after: String, $before: String, $first: Int, $last: Int) {
  balances(
    filter: $filter
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
        ...balanceFragment
      }
    }
  }
}
    ${Lr}
${Cu}`, Wp = ne`
    query getMessages($owner: Address!, $after: String, $before: String, $first: Int, $last: Int) {
  messages(
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
        ...messageFragment
      }
    }
  }
}
    ${Lr}
${Eu}`, Zp = ne`
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
    ${hp}`, Jp = ne`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, qp = ne`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${_p}`, jp = ne`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${lp}`, $p = ne`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, Kp = ne`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, em = ne`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${Eu}`, tm = ne`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${bu}`, nm = ne`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${bu}`;
function rm(e) {
  return {
    getVersion(t, n) {
      return e(vp, t, n);
    },
    getNodeInfo(t, n) {
      return e(Rp, t, n);
    },
    getChain(t, n) {
      return e(Sp, t, n);
    },
    getTransaction(t, n) {
      return e(Qp, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(Np, t, n);
    },
    getTransactions(t, n) {
      return e(Dp, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(Tp, t, n);
    },
    estimatePredicates(t, n) {
      return e(Fp, t, n);
    },
    getBlock(t, n) {
      return e(Mp, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(Lp, t, n);
    },
    getBlocks(t, n) {
      return e(Op, t, n);
    },
    getCoin(t, n) {
      return e(kp, t, n);
    },
    getCoins(t, n) {
      return e(Pp, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(Up, t, n);
    },
    getContract(t, n) {
      return e(Gp, t, n);
    },
    getContractBalance(t, n) {
      return e(Vp, t, n);
    },
    getBalance(t, n) {
      return e(zp, t, n);
    },
    getLatestGasPrice(t, n) {
      return e(Hp, t, n);
    },
    estimateGasPrice(t, n) {
      return e(Yp, t, n);
    },
    getBalances(t, n) {
      return e(Xp, t, n);
    },
    getMessages(t, n) {
      return e(Wp, t, n);
    },
    getMessageProof(t, n) {
      return e(Zp, t, n);
    },
    getMessageStatus(t, n) {
      return e(Jp, t, n);
    },
    getRelayedTransactionStatus(t, n) {
      return e(qp, t, n);
    },
    dryRun(t, n) {
      return e(jp, t, n);
    },
    submit(t, n) {
      return e($p, t, n);
    },
    produceBlocks(t, n) {
      return e(Kp, t, n);
    },
    getMessageByNonce(t, n) {
      return e(em, t, n);
    },
    submitAndAwait(t, n) {
      return e(tm, t, n);
    },
    statusChange(t, n) {
      return e(nm, t, n);
    }
  };
}
var Bu = class {
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
        query: H0(t),
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
        const { data: o, errors: c } = this.events.shift();
        if (Array.isArray(c))
          throw new v(
            v.CODES.INVALID_REQUEST,
            c.map((A) => A.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const n = Bu.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (n === "")
        continue;
      const r = `${this.parsingLeftover}${n}`, s = /data:.*\n\n/g, i = [...r.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new v(
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
}, xu = Bu;
De(xu, "textDecoder", new TextDecoder());
var En = {}, sm = 30 * 1e3, im = class {
  constructor(e = sm) {
    S(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new v(
        N.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = z(e);
    if (En[n]) {
      if (!t || En[n].expires > Date.now())
        return En[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = z(e);
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
    const t = z(e);
    delete En[t];
  }
}, om = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Ce.Coin: {
      const n = H(e.predicate ?? "0x"), r = H(e.predicateData ?? "0x");
      return {
        type: Ce.Coin,
        txID: z(H(e.id).slice(0, pn)),
        outputIndex: cn(H(e.id).slice(pn, fs)),
        owner: z(e.owner),
        amount: B(e.amount),
        assetId: z(e.assetId),
        txPointer: {
          blockHeight: cn(H(e.txPointer).slice(0, 8)),
          txIndex: cn(H(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: B(e.predicateGasUsed),
        predicateLength: B(n.length),
        predicateDataLength: B(r.length),
        predicate: z(n),
        predicateData: z(r)
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
          blockHeight: cn(H(e.txPointer).slice(0, 8)),
          txIndex: cn(H(e.txPointer).slice(8, 16))
        },
        contractID: z(e.contractId)
      };
    case Ce.Message: {
      const n = H(e.predicate ?? "0x"), r = H(e.predicateData ?? "0x"), s = H(e.data ?? "0x");
      return {
        type: Ce.Message,
        sender: z(e.sender),
        recipient: z(e.recipient),
        amount: B(e.amount),
        nonce: z(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: B(e.predicateGasUsed),
        predicateLength: B(n.length),
        predicateDataLength: B(r.length),
        predicate: z(n),
        predicateData: z(r),
        data: z(s),
        dataLength: s.length
      };
    }
    default:
      throw new v(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, am = (e) => {
  const { type: t } = e;
  switch (t) {
    case Ie.Coin:
      return {
        type: Ie.Coin,
        to: z(e.to),
        amount: B(e.amount),
        assetId: z(e.assetId)
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
        to: z(e.to),
        amount: B(0),
        assetId: z(e.assetId)
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
        contractId: z(e.contractId),
        stateRoot: z(e.stateRoot)
      };
    default:
      throw new v(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, Py = (e) => "utxoId" in e, Uy = (e) => "recipient" in e, cm = (e) => "id" in e, Gy = (e) => "recipient" in e, um = (e) => e.type === ue.Revert && e.val.toString("hex") === j0, dm = (e) => e.type === ue.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", ic = (e) => e.reduce(
  (t, n) => (um(n) && t.missingOutputVariables.push(n), dm(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), xe = (e) => e || Ne;
function Am(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: ue.Call,
        from: xe(e.id || e.contractId),
        to: xe(e == null ? void 0 : e.to),
        amount: B(e.amount),
        assetId: xe(e.assetId),
        gas: B(e.gas),
        param1: B(e.param1),
        param2: B(e.param2),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "RETURN":
      return {
        type: ue.Return,
        id: xe(e.id || e.contractId),
        val: B(e.val),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "RETURN_DATA":
      return {
        type: ue.ReturnData,
        id: xe(e.id || e.contractId),
        ptr: B(e.ptr),
        len: B(e.len),
        digest: xe(e.digest),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "PANIC":
      return {
        type: ue.Panic,
        id: xe(e.id),
        reason: B(e.reason),
        pc: B(e.pc),
        is: B(e.is),
        contractId: xe(e.contractId)
      };
    case "REVERT":
      return {
        type: ue.Revert,
        id: xe(e.id || e.contractId),
        val: B(e.ra),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "LOG":
      return {
        type: ue.Log,
        id: xe(e.id || e.contractId),
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
        id: xe(e.id || e.contractId),
        val0: B(e.ra),
        val1: B(e.rb),
        ptr: B(e.ptr),
        len: B(e.len),
        digest: xe(e.digest),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "TRANSFER":
      return {
        type: ue.Transfer,
        from: xe(e.id || e.contractId),
        to: xe(e.toAddress || (e == null ? void 0 : e.to)),
        amount: B(e.amount),
        assetId: xe(e.assetId),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: ue.TransferOut,
        from: xe(e.id || e.contractId),
        to: xe(e.toAddress || e.to),
        amount: B(e.amount),
        assetId: xe(e.assetId),
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
      const n = xe(e.sender), r = xe(e.recipient), s = xe(e.nonce), i = B(e.amount), o = e.data ? H(e.data) : Uint8Array.from([]), c = xe(e.digest), A = ys.getMessageId({
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
        digest: c,
        messageId: A
      };
    }
    case "MINT": {
      const n = xe(e.id || e.contractId), r = xe(e.subId), s = br.getAssetId(n, r);
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
      const n = xe(e.id || e.contractId), r = xe(e.subId), s = Ri.getAssetId(n, r);
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
      throw new v(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var lm = "https://fuellabs.github.io/block-explorer-v2", fm = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, Vy = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, c = t || lm, A = [
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
  ], h = A.filter((Z) => !!Z.value).map(({ key: Z, value: L }) => ({
    key: Z,
    value: L
  })), b = h.length > 0;
  if (h.length > 1)
    throw new v(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${A.map((Z) => Z.key).join(", ")}.`
    );
  if (n && h.length > 0) {
    const Z = A.map(({ key: L }) => L).join(", ");
    throw new v(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${Z}.`
    );
  }
  const w = b ? fm(
    h[0].key,
    h[0].value
  ) : "", x = /^\/|\/$/gm, _ = n ? n.replace(x, "") : w, R = c.replace(x, ""), C = r == null ? void 0 : r.replace(x, ""), F = C ? encodeURIComponent(C) : void 0, M = R.match(/^https?:\/\//) ? "" : "https://", G = C != null && C.match(/^https?:\/\//) ? "" : "https://";
  return `${M}${R}/${_}${F ? `?providerUrl=${G}${F}` : ""}`;
}, _u = (e) => e.filter(
  (r) => r.type === ue.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), B(0));
function hn(e, t) {
  const n = B(t.base);
  let r = B(0);
  return "unitsPerGas" in t ? r = B(e).div(B(t.unitsPerGas)) : r = B(e).mul(B(t.gasPerUnit)), n.add(r);
}
function hm(e, t, n) {
  const r = [], s = e.filter((c) => {
    if ("owner" in c || "sender" in c) {
      if ("predicate" in c && c.predicate && c.predicate !== "0x")
        return !0;
      if (!r.includes(c.witnessIndex))
        return r.push(c.witnessIndex), !0;
    }
    return !1;
  }), i = hn(t, n.vmInitialization);
  return s.reduce((c, A) => "predicate" in A && A.predicate && A.predicate !== "0x" ? c.add(
    i.add(hn(H(A.predicate).length, n.contractRoot)).add(B(A.predicateGasUsed))
  ) : c.add(n.ecr1), B(0));
}
function vu(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = hn(i, t.vmInitialization), c = B(i).mul(n), A = hm(r, i, t);
  return o.add(c).add(A).add(s).maxU64();
}
function Qo(e) {
  const {
    gasPerByte: t,
    witnessesLength: n,
    witnessLimit: r,
    minGas: s,
    gasLimit: i = B(0),
    maxGasPerTx: o
  } = e;
  let c = B(0);
  r != null && r.gt(0) && r.gte(n) && (c = B(r).sub(n).mul(t));
  const A = c.add(s).add(i);
  return A.gte(o) ? o : A;
}
function Ru({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = hn(r, e.contractRoot), i = hn(t, e.stateRoot), o = hn(n, e.s256), c = B(100), A = hn(c, e.s256);
  return s.add(i).add(o).add(A).maxU64();
}
function Su({
  gasCosts: e,
  txBytesSize: t
}) {
  return hn(t, e.s256);
}
var Ui = (e) => {
  const { gas: t, gasPrice: n, priceFactor: r, tip: s } = e;
  return t.mul(n).div(r).add(B(s));
};
function Gi(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = z(e[t]);
        break;
      case "Array":
        e[t] = Gi(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = Gi(e[t]);
        break;
    }
  }), e;
}
function gm(e) {
  return Gi(Gt(e));
}
var pm = (e) => {
  let t = `The transaction reverted with reason: "${e}".`;
  return Th.includes(e) && (t = `${t}

You can read more about this error at:

${Fh}#variant.${e}`), { errorMessage: t, reason: e };
}, Ar = (e) => JSON.stringify(e, null, 2), mm = (e, t) => {
  let n = "The transaction reverted with an unknown reason.";
  const r = e.find(({ type: i }) => i === ue.Revert);
  let s = "";
  if (r)
    switch (B(r.val).toHex()) {
      case Sh: {
        s = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? Ar(t[0]) : "an error."}.`;
        break;
      }
      case Qh: {
        const o = t.length >= 2 ? ` comparing ${Ar(t[1])} and ${Ar(t[0])}.` : ".";
        s = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${o}`;
        break;
      }
      case Dh: {
        const o = t.length >= 2 ? ` comparing ${Ar(t[1])} and ${Ar(t[0])}.` : ".";
        s = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${o}`;
        break;
      }
      case Nh:
        s = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case j0:
        s = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        s = "unknown", n = `The transaction reverted with an unknown reason: ${r.val}`;
    }
  return { errorMessage: n, reason: s };
}, No = (e) => {
  const { receipts: t, statusReason: n, logs: r } = e, s = t.some(({ type: h }) => h === ue.Panic), i = t.some(({ type: h }) => h === ue.Revert), { errorMessage: o, reason: c } = s ? pm(n) : mm(t, r), A = {
    logs: r,
    receipts: t,
    panic: s,
    revert: i,
    reason: c
  };
  return new v(N.SCRIPT_REVERTED, o, A);
}, zy = class extends Error {
  constructor() {
    super(...arguments);
    S(this, "name", "ChangeOutputCollisionError");
    S(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, wm = class extends Error {
  constructor(t) {
    super();
    S(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, Hy = class extends Error {
  constructor(t) {
    super();
    S(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, or = (e) => e.type === Ce.Coin, Do = (e) => e.type === Ce.Message, gn = (e) => or(e) || Do(e), Qu = (e) => or(e) ? e.owner : e.recipient, Vi = (e, t) => Qu(e) === t.toB256(), ym = (e, t, n) => e.filter(gn).reduce((r, s) => or(s) && s.assetId === t || Do(s) && t === n ? r.add(s.amount) : r, B(0)), Yy = (e) => e.filter(gn).reduce(
  (t, n) => (or(n) ? t.utxos.push(n.id) : t.messages.push(n.nonce), t),
  {
    utxos: [],
    messages: []
  }
), Im = (e, t) => e.reduce(
  (n, r) => (or(r) && r.owner === t.toB256() ? n.utxos.push(r.id) : Do(r) && r.recipient === t.toB256() && n.messages.push(r.nonce), n),
  {
    utxos: [],
    messages: []
  }
), bm = (e) => {
  const t = H(e);
  return {
    data: z(t),
    dataLength: t.length
  };
}, To = class {
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
    this.tip = e ? B(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = Nn(r) ? B(r) : void 0, this.maxFee = B(n), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [], { tip: r, witnessLimit: s, maturity: i } = e;
    return B(r).gt(0) && (t += Qt.Tip, n.push({ data: B(r), type: Qt.Tip })), Nn(s) && B(s).gte(0) && (t += Qt.WitnessLimit, n.push({ data: B(s), type: Qt.WitnessLimit })), i && i > 0 && (t += Qt.Maturity, n.push({ data: i, type: Qt.Maturity })), t += Qt.MaxFee, n.push({ data: e.maxFee, type: Qt.MaxFee }), {
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
    var i, o, c;
    const e = ((i = this.inputs) == null ? void 0 : i.map(om)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(am)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(bm)) ?? [], { policyTypes: r, policies: s } = To.getPolicyMeta(this);
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
    return new Jt().encode(this.toTransaction());
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
      throw new wm(e);
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
    const t = fr(e), n = this.inputs.find((r) => {
      switch (r.type) {
        case Ce.Coin:
          return z(r.owner) === t.toB256();
        case Ce.Message:
          return z(r.recipient) === t.toB256();
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
    let c;
    e.predicate ? c = 0 : (c = this.getCoinInputWitnessIndexByOwner(n), typeof c != "number" && (c = this.addEmptyWitness()));
    const A = {
      id: s,
      type: Ce.Coin,
      owner: n.toB256(),
      amount: r,
      assetId: t,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: c,
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
    const { recipient: t, sender: n, amount: r, predicate: s, nonce: i, assetId: o, predicateData: c } = e;
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
      predicateData: c
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
    return cm(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
      to: fr(e).toB256(),
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
    return t.map(vo).forEach((n) => {
      this.pushOutput({
        type: Ie.Coin,
        to: fr(e).toB256(),
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
      (r) => z(r.assetId) === t
    ) || this.pushOutput({
      type: Ie.Change,
      to: fr(e).toB256(),
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
    return vu({
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
      (o, c) => o + c.dataLength,
      0
    );
    return Qo({
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
      const c = r(i);
      let A = o;
      i === t && (A = B("1000000000000000000")), c && "assetId" in c ? (c.id = z(Tt(fs)), c.amount = A) : this.addResources([
        {
          id: z(Tt(fs)),
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
    return gm(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(gn).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(e) {
    const t = e.filter(gn);
    this.inputs.filter(gn).forEach((n) => {
      const r = Qu(n), s = t.find(
        (i) => Vi(i, de.fromString(String(r)))
      );
      s && "predicateGasUsed" in s && B(s.predicateGasUsed).gt(0) && (n.predicateGasUsed = s.predicateGasUsed);
    });
  }
};
function Nu(e, t) {
  const n = e.toTransaction();
  n.type === Oe.Script && (n.receiptsRoot = Ne), n.inputs = n.inputs.map((i) => {
    const o = Gt(i);
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
    const o = Gt(i);
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
  const r = nl(t), s = ie([r, new Jt().encode(n)]);
  return mt(s);
}
var Em = (e) => {
  const t = new Uint8Array(32);
  return t.set(H(e)), t;
}, Cm = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: z(t),
    value: z(Em(n))
  };
}, zi = class extends To {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: n, storageSlots: r, ...s }) {
    super(s);
    /** Type of the transaction */
    S(this, "type", Oe.Create);
    /** Witness index of contract bytecode to create */
    S(this, "bytecodeWitnessIndex");
    /** Salt */
    S(this, "salt");
    /** List of storage slots to initialize */
    S(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = z(n ?? Ne), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(Cm)) ?? [];
    return {
      type: Oe.Create,
      ...t,
      bytecodeWitnessIndex: n,
      storageSlotsCount: B(r.length),
      salt: this.salt ? z(this.salt) : Ne,
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
    return Nu(this, t);
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
    return Ru({
      contractBytesSize: B(H(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
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
}, Bm = {
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
}, vn = class extends To {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    S(this, "type", Oe.Script);
    /** Gas limit for transaction */
    S(this, "gasLimit");
    /** Script to execute */
    S(this, "script");
    /** Script input data (parameters) */
    S(this, "scriptData");
    S(this, "abis");
    this.gasLimit = B(r), this.script = H(t ?? oc.bytes), this.scriptData = H(n ?? oc.encodeScriptData()), this.abis = s.abis;
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
      type: Oe.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: B(t.length),
      scriptDataLength: B(n.length),
      receiptsRoot: Ne,
      script: z(t),
      scriptData: z(n)
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
      (c, A) => c + A.dataLength,
      0
    );
    return Qo({
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
    const n = fr(t);
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
    return Nu(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new jt(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return Su({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, wt = (e) => {
  if (e instanceof vn || e instanceof zi)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case Oe.Script:
      return vn.from(e);
    case Oe.Create:
      return zi.from(e);
    default:
      throw new v(N.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, xm = (e) => {
  var k;
  const {
    gasPrice: t,
    rawPayload: n,
    tip: r,
    totalFee: s,
    consensusParameters: { gasCosts: i, feeParams: o, maxGasPerTx: c }
  } = e;
  if (s)
    return s;
  const A = B(o.gasPerByte), h = B(o.gasPriceFactor), b = H(n), [w] = new Jt().decode(b, 0), { type: x, witnesses: _, inputs: R, policies: C } = w;
  let F = B(0), M = B(0);
  if (x !== Oe.Create && x !== Oe.Script)
    return B(0);
  if (x === Oe.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: q } = w, Y = B(H(_[U].data).length);
    F = Ru({
      contractBytesSize: Y,
      gasCosts: i,
      stateRootSize: q.length || 0,
      txBytesSize: b.length
    });
  } else {
    const { scriptGasLimit: U } = w;
    U && (M = U), F = Su({
      gasCosts: i,
      txBytesSize: b.length
    });
  }
  const G = vu({
    gasCosts: i,
    gasPerByte: B(A),
    inputs: R,
    metadataGas: F,
    txBytesSize: b.length
  }), O = (k = C.find((U) => U.type === Qt.WitnessLimit)) == null ? void 0 : k.data, Z = _.reduce((U, q) => U + q.dataLength, 0), L = Qo({
    gasPerByte: A,
    minGas: G,
    witnessesLength: Z,
    gasLimit: M,
    witnessLimit: O,
    maxGasPerTx: c
  });
  return Ui({
    gasPrice: t,
    gas: L,
    priceFactor: h,
    tip: r
  });
}, _m = ({ abi: e, receipt: t }) => {
  var b;
  const n = new jt(e), r = t.param1.toHex(8), s = n.getFunction(r), i = s.jsonFn.inputs, o = t.param2.toHex();
  let c;
  const A = s.decodeArguments(o);
  return A && (c = i.reduce((w, x, _) => {
    const R = A[_], C = x.name;
    return C ? {
      ...w,
      // reparse to remove bn
      [C]: JSON.parse(JSON.stringify(R))
    } : w;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: c,
    ...(b = t.amount) != null && b.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function vm(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function Fo(e, t) {
  return e.filter((n) => n.type === t);
}
function Rm(e) {
  return Fo(e, Ce.Coin);
}
function Sm(e) {
  return Fo(e, Ce.Message);
}
function Qm(e) {
  return vm(e, [Ce.Coin, Ce.Message]);
}
function Nm(e) {
  return Fo(e, Ce.Contract);
}
function Du(e, t) {
  const n = Rm(e), r = Sm(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function Dm(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== Ce.Contract)
      throw new v(
        N.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function Mo(e) {
  return e.type === Ce.Coin ? e.owner.toString() : e.type === Ce.Message ? e.recipient.toString() : "";
}
function Or(e, t) {
  return e.filter((n) => n.type === t);
}
function Tm(e) {
  return Or(e, Ie.ContractCreated);
}
function Tu(e) {
  return Or(e, Ie.Coin);
}
function Fm(e) {
  return Or(e, Ie.Change);
}
function Mm(e) {
  return Or(e, Ie.Contract);
}
function Xy(e) {
  return Or(e, Ie.Variable);
}
var Lm = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e))(Lm || {}), Om = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(Om || {}), km = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(km || {}), Pm = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(Pm || {}), Um = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(Um || {});
function Br(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function Fu(e) {
  switch (e) {
    case Oe.Mint:
      return "Mint";
    case Oe.Create:
      return "Create";
    case Oe.Script:
      return "Script";
    default:
      throw new v(
        N.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function kr(e, t) {
  return Fu(e) === t;
}
function Gm(e) {
  return kr(
    e,
    "Mint"
    /* Mint */
  );
}
function Mu(e) {
  return kr(
    e,
    "Create"
    /* Create */
  );
}
function Lu(e) {
  return kr(
    e,
    "Script"
    /* Script */
  );
}
function Vm(e) {
  return kr(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function zm(e) {
  return kr(
    e,
    "Upload"
    /* Upload */
  );
}
function Wy(e) {
  return (t) => e.assetId === t.assetId;
}
function Hm(e) {
  return Br(e, ue.Call);
}
function Ym(e) {
  return Br(e, ue.MessageOut);
}
var Xm = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((c) => c.assetId === o.assetId)
  );
  return n.map((o) => {
    const c = r.find((h) => h.assetId === o.assetId);
    if (!c)
      return o;
    const A = B(o.amount).add(c.amount);
    return { ...o, amount: A };
  }).concat(s);
};
function Wm(e, t) {
  var n, r, s, i, o, c, A, h;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((c = t.from) == null ? void 0 : c.type) && ((A = e.to) == null ? void 0 : A.type) === ((h = t.to) == null ? void 0 : h.type);
}
function tr(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((c) => Wm(c, t));
  if (n[r]) {
    const c = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? Xm(c, t) : t.assetsSent), (o = t.calls) != null && o.length && (c.calls = [...c.calls || [], ...t.calls]), n[r] = c;
  } else
    n.push(t);
  return n;
}
function Zy(e) {
  return Br(e, ue.TransferOut);
}
function Zm({
  inputs: e,
  receipts: t,
  baseAssetId: n
}) {
  return Ym(t).reduce(
    (i, o) => {
      const c = Du(e, n);
      if (c) {
        const A = Mo(c);
        return tr(i, {
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
function Jm({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = Hm(n);
  return Mm(t).reduce((h, b) => {
    const w = Dm(e, b.inputIndex);
    return w ? o.reduce((_, R) => {
      var C;
      if (R.to === w.contractID) {
        const F = Du(e, R.assetId);
        if (F) {
          const M = Mo(F), G = [], O = r == null ? void 0 : r[w.contractID];
          return O && G.push(
            _m({
              abi: O,
              receipt: R,
              rawPayload: s,
              maxInputs: i
            })
          ), tr(_, {
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
      return _;
    }, h) : h;
  }, []);
}
function qm(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const c = t.some((h) => h.contractID === r) ? 0 : 1;
  if (Ne === o) {
    const h = n.find((b) => b.assetId === s);
    o = (h == null ? void 0 : h.to) || o;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((h) => h.contractID === o) ? 0 : 1,
      address: o
    },
    to: {
      type: c,
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
  const s = Tu(t), i = Nm(e), o = Fm(t);
  s.forEach((h) => {
    const { amount: b, assetId: w, to: x } = h, _ = o.find((R) => R.assetId === w);
    _ && (r = tr(r, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: _.to
      },
      to: {
        type: 1,
        address: x
      },
      assetsSent: [
        {
          assetId: w,
          amount: b
        }
      ]
    }));
  });
  const c = Br(
    n,
    ue.Transfer
  ), A = Br(
    n,
    ue.TransferOut
  );
  return [...c, ...A].forEach((h) => {
    const b = qm(h, i, o);
    r = tr(r, b);
  }), r;
}
function jm(e) {
  return Tu(e).reduce((r, s) => tr(r, {
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
function $m({ inputs: e, outputs: t }) {
  const n = Tm(t), r = Qm(e)[0], s = Mo(r);
  return n.reduce((o, c) => tr(o, {
    name: "Contract created",
    from: {
      type: 1,
      address: s
    },
    to: {
      type: 0,
      address: (c == null ? void 0 : c.contractId) || ""
    }
  }), []);
}
function Km({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o,
  baseAssetId: c
}) {
  return Mu(e) ? [
    ...$m({ inputs: t, outputs: n }),
    ...ac({ inputs: t, outputs: n, receipts: r })
  ] : Lu(e) ? [
    ...ac({ inputs: t, outputs: n, receipts: r }),
    ...Jm({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...Zm({ inputs: t, receipts: r, baseAssetId: c })
  ] : [...jm(n)];
}
var An = (e) => {
  const t = Am(e);
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
}, ew = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, tw = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, nw = (e) => {
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
        N.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, rw = (e) => {
  let t, n, r, s, i, o = !1, c = !1, A = !1;
  if (e != null && e.type)
    switch (r = nw(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, n = e.block.id, c = !0, s = B(e.totalFee), i = B(e.totalGas);
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
    isStatusSuccess: c,
    isStatusPending: A
  };
};
function ks(e) {
  var u, l;
  const {
    id: t,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: c,
    abiMap: A = {},
    maxInputs: h,
    gasCosts: b,
    maxGasPerTx: w,
    gasPrice: x,
    baseAssetId: _
  } = e, R = _u(n), C = z(o), F = Km({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: C,
    abiMap: A,
    maxInputs: h,
    baseAssetId: _
  }), M = Fu(i.type), G = B((l = (u = i.policies) == null ? void 0 : u.find((p) => p.type === Qt.Tip)) == null ? void 0 : l.data), { isStatusFailure: O, isStatusPending: Z, isStatusSuccess: L, blockId: T, status: k, time: U, totalFee: q } = rw(c), Y = xm({
    totalFee: q,
    gasPrice: x,
    rawPayload: C,
    tip: G,
    consensusParameters: {
      gasCosts: b,
      maxGasPerTx: w,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), W = ew(n), ee = tw(n);
  let E;
  return U && (E = $i.fromTai64(U)), {
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
    mintedAssets: W,
    burnedAssets: ee,
    isTypeMint: Gm(i.type),
    isTypeCreate: Mu(i.type),
    isTypeScript: Lu(i.type),
    isTypeUpgrade: Vm(i.type),
    isTypeUpload: zm(i.type),
    isStatusFailure: O,
    isStatusSuccess: L,
    isStatusPending: Z,
    date: E,
    transaction: i
  };
}
function Lo(e, t, n = {}) {
  return e.reduce((r, s) => {
    if (s.type === ue.LogData || s.type === ue.Log) {
      const i = new jt(n[s.id] || t), o = s.type === ue.Log ? new D("u64").encode(s.val0) : s.data, [c] = i.decodeLog(o, s.val1.toString());
      r.push(c);
    }
    return r;
  }, []);
}
var us = class {
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
    const r = new us(e, t, n);
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
    return (t = new Jt().decode(
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
    let t = this.gqlTransaction;
    t || (t = await this.fetch());
    const n = this.decodeTransaction(
      t
    );
    let r = [];
    t != null && t.status && "receipts" in t.status && (r = t.status.receipts);
    const s = r.map(An) || [], { gasPerByte: i, gasPriceFactor: o, gasCosts: c, maxGasPerTx: A } = this.provider.getGasConfig(), h = await this.provider.getLatestGasPrice(), b = this.provider.getChain().consensusParameters.txParameters.maxInputs, w = this.provider.getBaseAssetId();
    return ks({
      id: this.id,
      receipts: s,
      transaction: n,
      transactionBytes: H(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: i,
      gasPriceFactor: o,
      abiMap: e,
      maxInputs: b,
      gasCosts: c,
      maxGasPerTx: A,
      gasPrice: h,
      baseAssetId: w
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
    this.abis && (r = Lo(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), n.logs = r);
    const { gqlTransaction: s, receipts: i } = n;
    if (((o = s.status) == null ? void 0 : o.type) === "FailureStatus") {
      const { reason: c } = s.status;
      throw No({
        receipts: i,
        statusReason: c,
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
function sw(e, t) {
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
function Ou(e, t, n = 0) {
  return t === void 0 ? e : async (...r) => {
    var s;
    try {
      return await e(...r);
    } catch (i) {
      const o = i;
      if (((s = o.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw o;
      const c = n + 1;
      if (c > t.maxRetries)
        throw o;
      const A = sw(t, c);
      return await Md(A), Ou(e, t, c)(...r);
    }
  };
}
var iw = (...e) => {
  const t = {};
  function n({ amount: r, assetId: s }) {
    t[s] ? t[s] = t[s].add(r) : t[s] = r;
  }
  return e.forEach((r) => r.forEach(n)), Object.entries(t).map(([r, s]) => ({ assetId: r, amount: s }));
}, cc = 10, ow = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, {
    contractParams: i,
    feeParams: o,
    predicateParams: c,
    scriptParams: A,
    txParams: h,
    gasCosts: b,
    baseAssetId: w,
    chainId: x,
    version: _
  } = r;
  return {
    name: t,
    baseChainHeight: B(n),
    consensusParameters: {
      version: _,
      chainId: B(x),
      baseAssetId: w,
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
        version: c.version,
        maxPredicateLength: B(c.maxPredicateLength),
        maxPredicateDataLength: B(c.maxPredicateDataLength),
        maxGasPerPredicate: B(c.maxGasPerPredicate),
        maxMessageDataLength: B(c.maxMessageDataLength)
      },
      scriptParameters: {
        version: A.version,
        maxScriptLength: B(A.maxScriptLength),
        maxScriptDataLength: B(A.maxScriptDataLength)
      },
      gasCosts: b
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
}, Hi, ku, kt = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, dn(this, Hi), De(this, "operations"), De(this, "cache"), De(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new im(t.cacheUtxo) : void 0;
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    kt.nodeInfoCache = {}, kt.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return Ou(async (...r) => {
      const s = r[0], i = r[1], o = n ? AbortSignal.timeout(n) : void 0;
      let c = { ...i, signal: o };
      return e.requestMiddleware && (c = await e.requestMiddleware(c)), e.fetch ? e.fetch(s, c, e) : fetch(s, c);
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
    const n = new kt(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   *
   * @returns the chain information configuration.
   */
  getChain() {
    const e = kt.chainInfoCache[this.url];
    if (!e)
      throw new v(
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
    const e = kt.nodeInfoCache[this.url];
    if (!e)
      throw new v(
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
    return kt.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  /**
   * @hidden
   */
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = pd(e.nodeVersion);
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
    const e = kt.getFetchFn(this.options), t = new Ih.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options),
      responseMiddleware: (r) => {
        if ("response" in r) {
          const s = r.response;
          if (Array.isArray(s == null ? void 0 : s.errors))
            throw new v(
              v.CODES.INVALID_REQUEST,
              s.errors.map((i) => i.message).join(`

`)
            );
        }
      }
    });
    return rm((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new xu({
        url: this.url,
        query: r,
        fetchFn: (c, A) => e(c, A, this.options),
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
    return kt.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = ow(e);
    return kt.chainInfoCache[this.url] = t, t;
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
    Pi(this, Hi, ku).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = z(r.toTransactionBytes());
    let i;
    if (r.type === Oe.Script && (i = r.abis), n) {
      const c = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: b } of c) {
        if (b.type === "SqueezedOutStatus")
          throw new v(
            N.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${b.reason}`
          );
        if (b.type !== "SubmittedStatus")
          break;
      }
      const A = r.getTransactionId(this.getChainId()), h = new us(A, this, i);
      return await h.fetch(), h;
    }
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: s });
    return new us(o, this, i);
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
  async dryRun(e, { utxoValidation: t, estimateTxDependencies: n = !0 } = {}) {
    const r = wt(e);
    if (n)
      return this.estimateTxDependencies(r);
    const s = z(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: t || !1
    }), [{ receipts: o, status: c }] = i;
    return { receipts: o.map(An), dryRunStatus: c };
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
      (i) => "predicate" in i && i.predicate && !N0(H(i.predicate), H("0x")) && new Me(i.predicateGasUsed).isZero()
    ))
      return e;
    const n = z(e.toTransactionBytes()), r = await this.operations.estimatePredicates({
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
    if (e.type === Oe.Create)
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let t = [];
    const n = [];
    let r = 0, s;
    for (let i = 0; i < cc; i++) {
      const {
        dryRun: [{ receipts: o, status: c }]
      } = await this.operations.dryRun({
        encodedTransactions: [z(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(An), s = c;
      const { missingOutputVariables: A, missingOutputContractIds: h } = ic(t);
      if (A.length !== 0 || h.length !== 0) {
        r += A.length, e.addVariableOutputs(A.length), h.forEach(({ contractId: x }) => {
          e.addContractInputAndOutput(de.fromString(x)), n.push(x);
        });
        const { maxFee: w } = await this.estimateTxGasAndFee({
          transactionRequest: e
        });
        e.maxFee = w;
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
    })), n = Gt(e), r = /* @__PURE__ */ new Map();
    n.forEach((o, c) => {
      o.type === Oe.Script && r.set(c, z(o.toTransactionBytes()));
    });
    let s = Array.from(r.keys()), i = 0;
    for (; s.length > 0 && i < cc; ) {
      const o = s.map(
        (h) => r.get(h)
      ), c = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), A = [];
      for (let h = 0; h < c.dryRun.length; h++) {
        const b = s[h], { receipts: w, status: x } = c.dryRun[h], _ = t[b];
        _.receipts = w.map(An), _.dryRunStatus = x;
        const { missingOutputVariables: R, missingOutputContractIds: C } = ic(
          _.receipts
        ), F = R.length > 0 || C.length > 0, M = n[b];
        if (F && (M == null ? void 0 : M.type) === Oe.Script) {
          _.outputVariables += R.length, M.addVariableOutputs(R.length), C.forEach(({ contractId: O }) => {
            M.addContractInputAndOutput(de.fromString(O)), _.missingContractIds.push(O);
          });
          const { maxFee: G } = await this.estimateTxGasAndFee({
            transactionRequest: M
          });
          M.maxFee = G, r.set(b, z(M.toTransactionBytes())), A.push(b);
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
    const r = e.map((o) => z(o.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: r,
      utxoValidation: t || !1
    });
    return s.map(({ receipts: o, status: c }) => ({ receipts: o.map(An), dryRunStatus: c }));
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
    const c = Ui({
      gasPrice: B(n),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let A = B(0);
    t.type === Oe.Script && (A = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(r, o)
    ), A = t.gasLimit));
    const h = t.calculateMaxGas(r, o), b = Ui({
      gasPrice: B(n),
      gas: h,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: c,
      maxGas: h,
      maxFee: b,
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
    const r = [z(n.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: r,
      utxoValidation: !0
    });
    return { receipts: s.map((o) => {
      const { id: c, receipts: A, status: h } = o, b = A.map(An);
      return { id: c, receipts: b, status: h };
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
    const s = Gt(wt(e)), i = s.type === Oe.Script, o = this.getBaseAssetId(), c = s.maxFee.eq(0), A = s.getCoinOutputsQuantities(), h = iw(A, r);
    s.fundWithFakeUtxos(h, o, t == null ? void 0 : t.address), i && (s.gasLimit = B(0)), t && "populateTransactionPredicateData" in t && t.populateTransactionPredicateData(s);
    const b = Gt(s);
    let w = 0;
    if (n && i) {
      const k = b.witnesses.length;
      await n(b), w = b.witnesses.length - k;
    }
    await this.estimatePredicates(b), s.updatePredicateGasUsed(b.inputs);
    let { maxFee: x, maxGas: _, minFee: R, minGas: C, gasPrice: F, gasLimit: M } = await this.estimateTxGasAndFee({
      transactionRequest: b
    }), G = [], O, Z = [], L = 0, T = B(0);
    if (s.maxFee = x, i) {
      if (s.gasLimit = M, n && await n(s), { receipts: G, missingContractIds: Z, outputVariables: L, dryRunStatus: O } = await this.estimateTxDependencies(s), O && "reason" in O)
        throw this.extractDryRunError(s, G, O);
      T = _u(G), s.gasLimit = T, { maxFee: x, maxGas: _, minFee: R, minGas: C, gasPrice: F } = await this.estimateTxGasAndFee({
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
      maxGas: _,
      minFee: R,
      maxFee: x,
      outputVariables: L,
      missingContractIds: Z,
      addedSignatures: w,
      estimatedPredicates: s.inputs,
      dryRunStatus: O,
      updateMaxFee: c
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
    const r = de.fromAddressOrString(e), s = wt(Gt(t)), i = await this.getTransactionCost(s, {
      quantitiesToContract: n
    });
    s.addResources(
      await this.getResourcesToSpend(r, i.requiredQuantities)
    );
    const { requiredQuantities: o, ...c } = await this.getTransactionCost(s, {
      quantitiesToContract: n
    });
    return {
      resources: await this.getResourcesToSpend(r, o),
      requiredQuantities: o,
      ...c
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
    this.validatePaginationArgs(n);
    const r = de.fromAddressOrString(e), {
      coins: { edges: s, pageInfo: i }
    } = await this.operations.getCoins({
      first: 100,
      ...n,
      filter: { owner: r.toB256(), assetId: t && z(t) }
    });
    return {
      coins: s.map(({ node: c }) => ({
        id: c.utxoId,
        assetId: c.assetId,
        amount: B(c.amount),
        owner: de.fromAddressOrString(c.owner),
        blockCreated: B(c.blockCreated),
        txCreatedIdx: B(c.txCreatedIdx)
      })),
      pageInfo: i
    };
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
    var A, h, b;
    const r = de.fromAddressOrString(e), s = {
      messages: ((A = n == null ? void 0 : n.messages) == null ? void 0 : A.map((w) => z(w))) || [],
      utxos: ((h = n == null ? void 0 : n.utxos) == null ? void 0 : h.map((w) => z(w))) || []
    };
    if (this.cache) {
      const w = new Set(
        s.utxos.concat((b = this.cache) == null ? void 0 : b.getActiveData().map((x) => z(x)))
      );
      s.utxos = Array.from(w);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(vo).map(({ assetId: w, amount: x, max: _ }) => ({
        assetId: z(w),
        amount: x.toString(10),
        max: _ ? _.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((w) => {
      switch (w.type) {
        case "MessageCoin":
          return {
            amount: B(w.amount),
            assetId: w.assetId,
            daHeight: B(w.daHeight),
            sender: de.fromAddressOrString(w.sender),
            recipient: de.fromAddressOrString(w.recipient),
            nonce: w.nonce
          };
        case "Coin":
          return {
            id: w.utxoId,
            amount: B(w.amount),
            assetId: w.assetId,
            owner: de.fromAddressOrString(w.owner),
            blockCreated: B(w.blockCreated),
            txCreatedIdx: B(w.txCreatedIdx)
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
          return (s = new Jt().decode(H(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new Jt().decode(
      H(t.rawPayload),
      0
    )) == null ? void 0 : n[0] : null;
  }
  /**
   * Retrieves transactions based on the provided pagination arguments.
   * @param paginationArgs - The pagination arguments for retrieving transactions.
   * @returns A promise that resolves to an object containing the retrieved transactions and pagination information.
   */
  async getTransactions(e) {
    const {
      transactions: { edges: t, pageInfo: n }
    } = await this.operations.getTransactions(e), r = new Jt();
    return { transactions: t.map(
      ({ node: { rawPayload: i } }) => r.decode(H(i), 0)[0]
    ), pageInfo: n };
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
      asset: z(t)
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
      assetId: z(t)
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
  async getBalances(e) {
    const {
      balances: { edges: t }
    } = await this.operations.getBalances({
      /**
       * The query parameters for this method were designed to support pagination,
       * but the current Fuel-Core implementation does not support pagination yet.
       */
      first: 1e4,
      filter: { owner: de.fromAddressOrString(e).toB256() }
    });
    return { balances: t.map(({ node: r }) => ({
      assetId: r.assetId,
      amount: B(r.amount)
    })) };
  }
  /**
   * Returns message for the given address.
   *
   * @param address - The address to get message from.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the messages.
   */
  async getMessages(e, t) {
    this.validatePaginationArgs(t);
    const {
      messages: { edges: n, pageInfo: r }
    } = await this.operations.getMessages({
      first: 100,
      ...t,
      owner: de.fromAddressOrString(e).toB256()
    });
    return {
      messages: n.map(({ node: i }) => ({
        messageId: Ir.getMessageId({
          sender: i.sender,
          recipient: i.recipient,
          nonce: i.nonce,
          amount: B(i.amount),
          data: i.data
        }),
        sender: de.fromAddressOrString(i.sender),
        recipient: de.fromAddressOrString(i.recipient),
        nonce: i.nonce,
        amount: B(i.amount),
        data: Ir.decodeData(i.data),
        daHeight: B(i.daHeight)
      })),
      pageInfo: r
    };
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
      throw new v(
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
      messageBlockHeader: c,
      commitBlockHeader: A,
      blockProof: h,
      sender: b,
      recipient: w,
      amount: x,
      data: _
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
        id: c.id,
        daHeight: B(c.daHeight),
        transactionsCount: Number(c.transactionsCount),
        transactionsRoot: c.transactionsRoot,
        height: B(c.height),
        prevRoot: c.prevRoot,
        time: c.time,
        applicationHash: c.applicationHash,
        messageReceiptCount: Number(c.messageReceiptCount),
        messageOutboxRoot: c.messageOutboxRoot,
        consensusParametersVersion: Number(c.consensusParametersVersion),
        eventInboxRoot: c.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(c.stateTransitionBytecodeVersion)
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
      sender: de.fromAddressOrString(b),
      recipient: de.fromAddressOrString(w),
      nonce: t,
      amount: B(x),
      data: _
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
      startTimestamp: t ? $i.fromUnixMilliseconds(t).toTai64() : void 0
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
    return new us(e, this);
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
  validatePaginationArgs({ first: e, last: t } = {}) {
    if ((e || 0) > 1e3 || (t || 0) > 1e3)
      throw new v(
        N.INVALID_INPUT_PARAMETERS,
        "Pagination limit cannot exceed 1000 items"
      );
  }
  /**
   * @hidden
   */
  extractDryRunError(e, t, n) {
    const r = n;
    let s = [];
    return e.abis && (s = Lo(
      t,
      e.abis.main,
      e.abis.otherContractsAbis
    )), No({
      logs: s,
      receipts: t,
      statusReason: r.reason
    });
  }
}, Cs = kt;
Hi = /* @__PURE__ */ new WeakSet();
ku = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === Ce.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
De(Cs, "chainInfoCache", {});
De(Cs, "nodeInfoCache", {});
async function Jy(e) {
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new v(
      N.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Jt().decode(
    H(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const c = o.map(An), {
    consensusParameters: {
      feeParameters: { gasPerByte: A, gasPriceFactor: h },
      txParameters: { maxInputs: b, maxGasPerTx: w },
      gasCosts: x
    }
  } = n.getChain(), _ = await n.getLatestGasPrice(), R = n.getBaseAssetId(), C = ks({
    id: s.id,
    receipts: c,
    transaction: i,
    transactionBytes: H(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: B(A),
    gasPriceFactor: B(h),
    abiMap: r,
    maxInputs: b,
    gasCosts: x,
    maxGasPerTx: w,
    gasPrice: _,
    baseAssetId: R
  });
  return {
    gqlTransaction: s,
    ...C
  };
}
async function qy(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.dryRun(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c, maxGasPerTx: A } = t.getGasConfig(), h = t.getChain().consensusParameters.txParameters.maxInputs, b = n.toTransaction(), w = n.toTransactionBytes(), x = await t.getLatestGasPrice(), _ = t.getBaseAssetId();
  return ks({
    receipts: s,
    transaction: b,
    transactionBytes: w,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: h,
    gasCosts: c,
    maxGasPerTx: A,
    gasPrice: x,
    baseAssetId: _
  });
}
async function jy(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: {
      feeParameters: { gasPerByte: c, gasPriceFactor: A },
      txParameters: { maxInputs: h, maxGasPerTx: b },
      gasCosts: w
    }
  } = n.getChain(), x = await n.getLatestGasPrice(), _ = n.getBaseAssetId();
  return {
    transactions: i.map((C) => {
      const { node: F } = C, { id: M, rawPayload: G, status: O } = F, [Z] = new Jt().decode(H(G), 0);
      let L = [];
      F != null && F.status && "receipts" in F.status && (L = F.status.receipts);
      const T = L.map(An), k = ks({
        id: M,
        receipts: T,
        transaction: Z,
        transactionBytes: H(G),
        gqlTransactionStatus: O,
        abiMap: r,
        gasPerByte: c,
        gasPriceFactor: A,
        maxInputs: h,
        gasCosts: w,
        maxGasPerTx: b,
        gasPrice: x,
        baseAssetId: _
      });
      return {
        gqlTransaction: F,
        ...k
      };
    }),
    pageInfo: o
  };
}
var Pn = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    devnet: 0,
    testnet: 0
  }
}, aw = (e) => {
  if (e === "ethereum")
    return Pn.eth.sepolia;
  if (e === "fuel")
    return Pn.fuel.testnet;
}, cw = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), Pu = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? aw(n);
  if (i === void 0)
    return;
  const o = cw({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, $y = (e, t) => Pu({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), Ky = (e, t) => Pu({
  asset: e,
  networkType: "fuel",
  chainId: t
}), uw = "/", dw = /^\/|\/$/g, Aw = (e = "") => e.replace(dw, "");
function lw(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(Aw);
  return r && n && s.unshift(""), s.join(uw);
}
function fw(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: lw(t, n.icon)
  }));
}
var hw = "https://cdn.fuel.network/assets/", gw = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: Pn.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: Pn.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: Pn.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: Pn.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      }
    ]
  }
], eI = fw(gw, hw), pw = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new D("u64").encode(new Me(n).toNumber());
  return Uint8Array.from([
    ...H(r),
    ...i,
    ...H(t)
  ]);
}, mw = async (e) => {
  const t = pw(e);
  await Co();
  const n = Oh(16, 0, Ph.ScriptData), r = Ya(17, 16, 32), s = Fi(18, 17, 0), i = Ya(19, 17, 8), o = Lh(16, 18, 19), c = eu(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...c.to_bytes()
  ]), scriptData: t };
}, ww = 2, Ps = class extends E0 {
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
      throw new v(N.MISSING_PROVIDER, "Provider not set");
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
  async getCoins(t, n) {
    return this.provider.getCoins(this.address, t, n);
  }
  /**
   * Retrieves messages owned by the account.
   *
   * @returns A promise that resolves to an array of Messages.
   */
  async getMessages(t) {
    return this.provider.getMessages(this.address, t);
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
    return this.provider.getBalances(this.address);
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
    const { addedSignatures: r, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: o } = n, c = t.maxFee, A = this.provider.getBaseAssetId(), h = ((M = i.find((G) => G.assetId === A)) == null ? void 0 : M.amount) || B(0), b = tp({
      amount: B(c),
      assetId: A,
      coinQuantities: i
    }), w = {};
    b.forEach(({ amount: G, assetId: O }) => {
      w[O] = {
        required: G,
        owned: B(0)
      };
    }), t.inputs.filter(gn).forEach((G) => {
      const Z = or(G) ? String(G.assetId) : A;
      w[Z] && (w[Z].owned = w[Z].owned.add(G.amount));
    });
    let x = [];
    Object.entries(w).forEach(([G, { owned: O, required: Z }]) => {
      O.lt(Z) && x.push({
        assetId: G,
        amount: Z.sub(O)
      });
    });
    let _ = x.length > 0, R = 0;
    for (; _ && R < ww; ) {
      const G = await this.getResourcesToSpend(
        x,
        Im(t.inputs, this.address)
      );
      t.addResources(G), t.updatePredicateGasUsed(s);
      const O = Gt(t);
      if (r && Array.from({ length: r }).forEach(
        () => O.addEmptyWitness()
      ), !o)
        break;
      const { maxFee: Z } = await this.provider.estimateTxGasAndFee({
        transactionRequest: O
      }), L = ym(
        t.inputs,
        A,
        A
      ), T = h.add(Z);
      L.gt(T) ? _ = !1 : x = [
        {
          amount: T.sub(L),
          assetId: A
        }
      ], R += 1;
    }
    t.updatePredicateGasUsed(s);
    const C = Gt(t);
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
    let i = new vn(s);
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
    let r = new vn(n);
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
      throw new v(
        N.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = de.fromAddressOrString(t), o = r ?? this.provider.getBaseAssetId(), { script: c, scriptData: A } = await mw({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: B(n),
      assetId: o
    });
    let h = new vn({
      ...s,
      script: c,
      scriptData: A
    });
    h.addContractInputAndOutput(i);
    const b = await this.provider.getTransactionCost(h, {
      resourcesOwner: this,
      quantitiesToContract: [{ amount: B(n), assetId: String(o) }]
    });
    return h = this.validateGasLimitAndMaxFee({
      transactionRequest: h,
      gasUsed: b.gasUsed,
      maxFee: b.maxFee,
      txParams: s
    }), await this.fund(h, b), this.sendTransaction(h);
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
    const s = de.fromAddressOrString(t), i = H(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = H(
      "0x".concat(B(n).toHex().substring(2).padStart(16, "0"))
    ), A = { script: new Uint8Array([
      ...H(Bm.bytes),
      ...i,
      ...o
    ]), ...r }, h = this.provider.getBaseAssetId();
    let b = new vn(A);
    const w = [{ amount: B(n), assetId: h }], x = await this.provider.getTransactionCost(b, { quantitiesToContract: w });
    return b = this.validateGasLimitAndMaxFee({
      transactionRequest: b,
      gasUsed: x.gasUsed,
      maxFee: x.maxFee,
      txParams: r
    }), await this.fund(b, x), this.sendTransaction(b);
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
      throw new v(N.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
      throw new v(
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
  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(t) {
    return t.map((n) => ({
      id: z(Tt(fs)),
      owner: this.address,
      blockCreated: B(1),
      txCreatedIdx: B(1),
      ...n
    }));
  }
  /** @hidden * */
  validateTransferAmount(t) {
    if (B(t).lte(0))
      throw new v(
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
    if (!Nn(s))
      o.gasLimit = t;
    else if (t.gt(s))
      throw new v(
        N.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!Nn(i))
      o.maxFee = n;
    else if (n.gt(i))
      throw new v(
        N.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${n}'.`
      );
    return o;
  }
}, nr = class {
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
    const t = Zt(e, 32);
    this.privateKey = z(t), this.publicKey = z(sn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = z(sn.getPublicKey(t, !0)), this.address = de.fromPublicKey(this.publicKey);
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
    const t = sn.sign(H(e), H(this.privateKey)), n = Zt(`0x${t.r.toString(16)}`, 32), r = Zt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, z(ie([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = sn.ProjectivePoint.fromHex(H(this.compressedPublicKey)), n = sn.ProjectivePoint.fromHex(H(e));
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
    const c = new sn.Signature(BigInt(z(r)), BigInt(z(s))).addRecoveryBit(
      i
    ).recoverPublicKey(H(e)).toRawBytes(!1).slice(1);
    return z(c);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return de.fromPublicKey(nr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? qt(ie([Tt(32), H(e)])) : Tt(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = sn.ProjectivePoint.fromHex(H(e));
    return z(t.toRawBytes(!1).slice(1));
  }
}, uc = 13, dc = 8, Ac = 1, mi = 32, yw = 16, lc = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function Iw(e, t, n) {
  const r = fn(lc(e), "hex"), s = de.fromAddressOrString(t), i = Tt(mi), o = s0({
    password: fn(n),
    salt: i,
    dklen: mi,
    n: 2 ** uc,
    r: dc,
    p: Ac
  }), c = Tt(yw), A = await KA(r, o, c), h = Uint8Array.from([...o.subarray(16, 32), ...A]), b = i0(h), w = lr(b, "hex"), x = {
    id: Ng(),
    version: 3,
    address: lc(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: w,
      cipherparams: { iv: lr(c, "hex") },
      ciphertext: lr(A, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: mi,
        n: 2 ** uc,
        p: Ac,
        r: dc,
        salt: lr(i, "hex")
      }
    }
  };
  return JSON.stringify(x);
}
async function bw(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: A, p: h, salt: b }
    }
  } = n, w = fn(s, "hex"), x = fn(i, "hex"), _ = fn(b, "hex"), R = fn(t), C = s0({
    password: R,
    salt: _,
    n: c,
    p: h,
    r: A,
    dklen: o
  }), F = Uint8Array.from([...C.subarray(16, 32), ...w]), M = i0(F), G = lr(M, "hex");
  if (r !== G)
    throw new v(
      N.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const O = await $A(w, C, x);
  return z(O);
}
var Uu = class extends Ps {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new nr(t);
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
    const n = await this.signer().sign(rl(t));
    return z(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = wt(t), r = this.provider.getChainId(), s = n.getTransactionId(r), i = await this.signer().sign(s);
    return z(i);
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
   * Populates the witness signature for a transaction and sends a call to the network using `provider.dryRun`.
   *
   * @param transactionRequestLike - The transaction request to simulate.
   * @returns A promise that resolves to the CallResult object.
   */
  async simulateTransaction(t, { estimateTxDependencies: n = !0 } = {}) {
    const r = wt(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.dryRun(
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
    return Iw(this.privateKey, this.address, t);
  }
};
De(Uu, "defaultPath", "m/44'/1179993420'/0'/0/0");
var Jr = [
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
], Ew = /* @__PURE__ */ ((e) => (e.english = "english", e))(Ew || {});
function Cw(e) {
  return (1 << e) - 1;
}
function Gu(e) {
  return (1 << e) - 1 << 8 - e;
}
function wi(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function Bw(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function xw(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & Cw(8 - n)), n += 3);
  const r = e.length / 4, s = H(mt(e))[0] & Gu(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function _w(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = H(new Uint8Array(n));
  let s = 0;
  for (let h = 0; h < e.length; h += 1) {
    const b = t.indexOf(e[h].normalize("NFKD"));
    if (b === -1)
      throw new v(
        N.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[h]}' is not found in the provided wordlist.`
      );
    for (let w = 0; w < 11; w += 1)
      b & 1 << 10 - w && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, c = Gu(o);
  if ((H(mt(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new v(
      N.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var vw = Yn("Bitcoin seed"), Rw = "0x0488ade4", Sw = "0x04358394", fc = [12, 15, 18, 21, 24];
function hc(e) {
  if (e.length !== 2048)
    throw new v(
      N.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function Qw(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new v(
      N.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function yi(e) {
  if (!fc.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${fc.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new v(N.INVALID_MNEMONIC, t);
  }
}
var on = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = Jr) {
    S(this, "wordlist");
    this.wordlist = e, hc(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return on.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return on.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = Jr) {
    const n = wi(e);
    return yi(n), z(_w(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = Jr) {
    const n = H(e);
    return hc(t), Qw(n), xw(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    yi(wi(e));
    const n = Yn(Bw(e)), r = Yn(`mnemonic${t}`);
    return el(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const n = on.mnemonicToSeed(e, t);
    return on.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = wi(e);
    let n = 0;
    try {
      yi(t);
    } catch {
      return !1;
    }
    for (; n < t.length; ) {
      if (on.binarySearch(t[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = Jr;
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
        N.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return H(o0("sha512", vw, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = on.masterKeysFromSeed(e), r = H(t ? Sw : Rw), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), A = n.slice(0, 32), h = ie([
      r,
      s,
      i,
      o,
      c,
      ie(["0x00", A])
    ]), b = Ki(mt(mt(h)), 0, 4);
    return Mc(ie([h, b]));
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
    const n = t ? mt(ie([Tt(e), H(t)])) : Tt(e);
    return on.entropyToMnemonic(n);
  }
}, Oo = on, Vu = 2147483648, zu = z("0x0488ade4"), ko = z("0x0488b21e"), Hu = z("0x04358394"), Po = z("0x043587cf");
function gc(e) {
  return Mc(ie([e, Ki(mt(mt(e)), 0, 4)]));
}
function Nw(e = !1, t = !1) {
  return e ? t ? Po : ko : t ? Hu : zu;
}
function Dw(e) {
  return [ko, Po].includes(z(e.slice(0, 4)));
}
function Tw(e) {
  return [zu, Hu, ko, Po].includes(
    z(e.slice(0, 4))
  );
}
function Fw(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new v(N.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + Vu : parseInt(r, 10)
  );
}
var Ln = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    S(this, "depth", 0);
    S(this, "index", 0);
    S(this, "fingerprint", z("0x00000000"));
    S(this, "parentFingerprint", z("0x00000000"));
    S(this, "privateKey");
    S(this, "publicKey");
    S(this, "chainCode");
    if (e.privateKey) {
      const t = new nr(e.privateKey);
      this.publicKey = z(t.compressedPublicKey), this.privateKey = z(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new v(
          N.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = z(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = Ki(tl(mt(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    if (e & Vu) {
      if (!t)
        throw new v(
          N.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(H(this.publicKey));
    s.set(Zt(e, 4), 33);
    const i = H(o0("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
    if (t) {
      const w = B(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new Ln({
        privateKey: w,
        chainCode: c,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const h = new nr(z(o)).addPoint(n);
    return new Ln({
      publicKey: h,
      chainCode: c,
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
    return Fw(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
        N.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = Nw(this.privateKey == null || e, t), r = z(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = ji(this.index, 4), o = this.chainCode, c = this.privateKey != null && !e ? ie(["0x00", this.privateKey]) : this.publicKey, A = H(ie([n, r, s, i, o, c]));
    return gc(A);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = Oo.masterKeysFromSeed(e);
    return new Ln({
      chainCode: H(t.slice(32)),
      privateKey: H(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = z(Zt(Ud(e))), n = H(t), r = gc(n.slice(0, 78)) === e;
    if (n.length !== 82 || !Tw(n))
      throw new v(N.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new v(N.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = z(n.slice(5, 9)), o = parseInt(z(n.slice(9, 13)).substring(2), 16), c = z(n.slice(13, 45)), A = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new v(
        N.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (Dw(n)) {
      if (A[0] !== 3)
        throw new v(N.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Ln({
        publicKey: A,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (A[0] !== 0)
      throw new v(N.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Ln({
      privateKey: A.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, Ii = Ln, Yu = class extends Ps {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new bt(e, this._provider);
  }
}, bt = class extends Uu {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new nr("0x00"), new Yu(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = nr.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new bt(t, e == null ? void 0 : e.provider);
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
    const s = Ii.fromSeed(e).derivePath(t || bt.defaultPath);
    return new bt(s.privateKey, n);
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
    const s = Oo.mnemonicToSeed(e, n), o = Ii.fromSeed(s).derivePath(t || bt.defaultPath);
    return new bt(o.privateKey, r);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const n = Ii.fromExtendedKey(e);
    return new bt(n.privateKey, t);
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
    const r = await bw(e, t);
    return new bt(r, n);
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
    return new Yu(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new bt(e, t);
  }
};
De(Ct, "generate", bt.generate);
De(Ct, "fromSeed", bt.fromSeed);
De(Ct, "fromMnemonic", bt.fromMnemonic);
De(Ct, "fromExtendedKey", bt.fromExtendedKey);
De(Ct, "fromEncryptedJson", bt.fromEncryptedJson);
var Mw = class {
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
}, Cn, Xu = class {
  constructor(e) {
    dn(this, Cn, void 0), De(this, "pathKey", "{}"), De(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), De(this, "numberOfAccounts", 0), Dt(this, Cn, e.secret || Oo.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Re(this, Cn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = Ct.fromMnemonic(Re(this, Cn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Ct.fromMnemonic(Re(this, Cn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = de.fromAddressOrString(e);
    do {
      const r = Ct.fromMnemonic(Re(this, Cn), this.getDerivePath(t));
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new v(
      N.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Ct.fromPrivateKey(t);
  }
};
Cn = /* @__PURE__ */ new WeakMap();
De(Xu, "type", "mnemonic");
var an, Wu = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    dn(this, an, []), e.secret ? Dt(this, an, [e.secret]) : Dt(this, an, e.accounts || [Ct.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Re(this, an)
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
    return Re(this, an).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Ct.generate();
    return Re(this, an).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = de.fromAddressOrString(e), n = Re(this, an).find(
      (r) => Ct.fromPrivateKey(r).address.equals(t)
    );
    if (!n)
      throw new v(
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
an = /* @__PURE__ */ new WeakMap();
De(Wu, "type", "privateKey");
var Ht = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function Yt(e, t) {
  if (!e)
    throw new v(N.WALLET_MANAGER_ERROR, t);
}
var yt, Bn, Pt, Yi, Zu, Xi, Ju, qu = class extends wu.EventEmitter {
  constructor(e) {
    super(), dn(this, Yi), dn(this, Xi), De(this, "storage", new Mw()), De(this, "STORAGE_KEY", "WalletManager"), dn(this, yt, []), dn(this, Bn, ""), dn(this, Pt, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Re(this, Pt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    Yt(!Re(this, Pt), Ht.wallet_not_unlocked);
    const t = Re(this, yt).find((n, r) => r === e);
    return Yt(t, Ht.vault_not_found), t.vault.serialize();
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
    return Yt(n, Ht.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = de.fromAddressOrString(e);
    Yt(!Re(this, Pt), Ht.wallet_not_unlocked);
    const n = Re(this, yt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return Yt(n, Ht.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Re(this, yt)[(e == null ? void 0 : e.vaultId) || 0];
    await Yt(t, Ht.vault_not_found);
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
    Dt(this, Pt, !0), Dt(this, yt, []), Dt(this, Bn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Dt(this, Bn, e), Dt(this, Pt, !1);
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
    const n = Re(this, Pt);
    await this.unlock(e), Dt(this, Bn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await Yt(!Re(this, Pt), Ht.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await qA(Re(this, Bn), JSON.parse(e));
      Dt(this, yt, Pi(this, Xi, Ju).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await Yt(!Re(this, Pt), Ht.wallet_not_unlocked);
    const e = await jA(Re(this, Bn), {
      vaults: Pi(this, Yi, Zu).call(this, Re(this, yt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = qu.Vaults.find((n) => n.type === e);
    return Yt(t, Ht.invalid_vault_type), t;
  }
}, Lw = qu;
yt = /* @__PURE__ */ new WeakMap();
Bn = /* @__PURE__ */ new WeakMap();
Pt = /* @__PURE__ */ new WeakMap();
Yi = /* @__PURE__ */ new WeakSet();
Zu = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
Xi = /* @__PURE__ */ new WeakSet();
Ju = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
De(Lw, "Vaults", [Xu, Wu]);
var Ow = class {
  constructor(e) {
    throw new v(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new v(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new v(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new v(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new v(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new v(N.NOT_IMPLEMENTED, "Not implemented.");
  }
};
De(Ow, "type");
var tI = class {
}, kw = (e) => {
  const n = H(e), r = Nc(n, 16384), s = yu(r.map((o) => z(o)));
  return qt(ie(["0x4655454C", s]));
}, pc = class extends Ps {
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
    const { predicateBytes: o, predicateInterface: c } = pc.processPredicateData(
      t,
      n,
      i
    ), A = de.fromB256(kw(o));
    super(A, r);
    S(this, "bytes");
    S(this, "predicateData", []);
    S(this, "interface");
    this.bytes = o, this.interface = c, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    const n = wt(t), r = this.getIndexFromPlaceholderWitness(n);
    return r !== -1 && n.removeWitness(r), n.inputs.filter(gn).forEach((s) => {
      Vi(s, this.address) && (s.predicate = z(this.bytes), s.predicateData = z(this.getPredicateData()), s.witnessIndex = 0);
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
    let s = H(t), i;
    if (n && (i = new jt(n), i.functions.main === void 0))
      throw new v(
        N.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = pc.setConfigurableConstants(
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
      predicate: z(this.bytes),
      predicateData: z(this.getPredicateData())
    }));
  }
  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(t) {
    return super.generateFakeResources(t).map((n) => ({
      ...n,
      predicate: z(this.bytes),
      predicateData: z(this.getPredicateData())
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
        const { offset: c } = r.configurables[i], A = r.encodeConfigurable(i, o);
        s.set(A, c);
      });
    } catch (i) {
      throw new v(
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
    const n = t.inputs.filter(gn).filter((o) => Vi(o, this.address));
    let r = -1;
    const s = n.find((o) => !o.predicate);
    return s && (r = s.witnessIndex, n.every((c) => !c.predicate) || (i = n[0]) != null && i.predicate && (r = -1)), r;
  }
}, ju = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(ju || {}), Uo = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(Uo || {}), $u = "FuelConnector", Pw = class {
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
}, Uw = class extends wu.EventEmitter {
  constructor() {
    super(...arguments);
    S(this, "name", "");
    S(this, "metadata", {});
    S(this, "connected", !1);
    S(this, "installed", !1);
    S(this, "events", Uo);
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
function Gw(e, { cache: t, cacheTime: n, key: r }) {
  return async (...s) => {
    var o, c, A;
    if (t[r] && ((o = t[r]) != null && o.value))
      return (c = t[r]) == null ? void 0 : c.value;
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
function nI(e) {
  window.dispatchEvent(
    new CustomEvent($u, {
      detail: e
    })
  );
}
function Vw() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function qr(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var zw = 2e3, Hw = 5e3, { warn: Yw } = console, mr = class extends Uw {
  constructor(t = mr.defaultConfig) {
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
      const { _targetObject: t } = this, n = $u;
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
      return new Pw(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(mr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(ju).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      qr(t.isConnected()),
      qr(this.pingConnector(t))
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
      return await Gw(async () => qr(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: Hw
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(Uo)), await ((o = this._storage) == null ? void 0 : o.setItem(mr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = Vw();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), qr(t.promise, zw).then(() => !0).catch(() => !1);
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
    return Yw(
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
        throw new v(N.INVALID_PROVIDER, "Provider is not valid.");
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
    return new Ps(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(mr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, Ku = mr;
De(Ku, "STORAGE_KEY", "fuel-current-connector");
De(Ku, "defaultConfig", {});
function mc(e, t) {
  if (!e)
    throw new v(N.TRANSACTION_ERROR, t);
}
function ed(e) {
  return e.reduce((t, n, r) => {
    const { program: s, externalAbis: i } = n.getCallConfig();
    return r === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var Ut, _c, td = (_c = class {
  constructor(...e) {
    Bt(this, Ut, void 0);
    Mt(this, Ut, e || []);
  }
  entries() {
    return Fe(this, Ut);
  }
  push(...e) {
    Fe(this, Ut).push(...e);
  }
  concat(e) {
    return Fe(this, Ut).concat(e);
  }
  extend(e) {
    Fe(this, Ut).push(...e);
  }
  toBytes() {
    return ie(
      Fe(this, Ut).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return z(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Fe(this, Ut), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Ut = new WeakMap(), _c), Xw = (e) => l0 + A0({ maxInputs: e });
function Ww(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === ue.ScriptResult ? n = i : (i.type === ue.Return || i.type === ue.ReturnData || i.type === ue.Revert) && (r = i);
  }), !n || !r)
    throw new v(N.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: n.result,
    gasUsed: n.gasUsed,
    receipts: t,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: e
  };
}
function Go(e, t, n = []) {
  var r;
  try {
    const s = Ww(e);
    return t(s);
  } catch (s) {
    if (s.code === N.SCRIPT_REVERTED) {
      const i = (r = e == null ? void 0 : e.dryRunStatus) == null ? void 0 : r.reason;
      throw No({
        logs: n,
        receipts: e.receipts,
        statusReason: i
      });
    }
    throw s;
  }
}
function Zw(e, t, n) {
  return Go(
    e,
    (r) => {
      if (r.returnReceipt.type === ue.Revert)
        throw new v(
          N.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== ue.Return && r.returnReceipt.type !== ue.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new v(
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
var Us = class {
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
    return A0({ maxInputs: t }) + l0 + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Us.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
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
    return Go(e, this.scriptResultDecoder, t);
  }
}, nd = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, Jw = Ne, rd = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: n,
  assetIdOffset: r
}) => {
  const s = new td(
    Wr(16, e),
    Wr(17, n),
    Fi(17, 17, 0),
    Wr(18, r)
  );
  return t ? s.push(
    Wr(19, t),
    Fi(19, 19, 0),
    Ha(16, 17, 18, 19)
  ) : s.push(Ha(16, 17, 18, Le.cgas().to_u8())), s;
};
function wc(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new td();
  for (let n = 0; n < e.length; n += 1)
    t.extend(rd(e[n]).entries());
  return t.push(eu(1)), t.toBytes();
}
var qw = (e) => e === ue.Return || e === ue.ReturnData, jw = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === ue.Call && r === Jw && s === t
), $w = (e) => (t) => {
  if (cn(t.code) !== 0)
    throw new v(N.SCRIPT_REVERTED, "Transaction reverted.");
  const n = jw(
    t.receipts,
    e.toB256()
  ), r = B(n == null ? void 0 : n.is);
  return t.receipts.filter(({ type: i }) => qw(i)).flatMap((i) => r.eq(B(i.is)) ? i.type === ue.Return ? [new D("u64").encode(i.val)] : i.type === ue.ReturnData ? [H(i.data)] : [new Uint8Array()] : []);
}, Kw = (e, t, n = []) => Go(e, $w(t), n), ey = (e) => e.reduce(
  (t, n) => {
    const r = { ...nd };
    return n.gas && (r.gasForwardedOffset = 1), t + rd(r).byteLength();
  },
  Vt.size()
  // placeholder for single RET instruction which is added later
), ty = (e, t) => new Us(
  // Script to call the contract, start with stub size matching length of calls
  wc(new Array(e.length).fill(nd)),
  (n) => {
    var _;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = ey(n), i = (8 - s % 8) % 8, o = s + i, c = Xw(t.toNumber()) + o, A = [];
    let h = c;
    const b = [];
    for (let R = 0; R < r; R += 1) {
      const C = n[R], F = h, M = F + ge, G = M + hs, O = G + El + ge + ge, Z = O + C.fnSelectorBytes.byteLength, L = H(C.data);
      let T = 0;
      b.push(new D("u64").encode(C.amount || 0)), b.push(new V().encode(((_ = C.assetId) == null ? void 0 : _.toString()) || Ne)), b.push(C.contractId.toBytes()), b.push(new D("u64").encode(O)), b.push(new D("u64").encode(Z)), b.push(C.fnSelectorBytes), b.push(L), C.gas && (b.push(new D("u64").encode(C.gas)), T = Z + L.byteLength);
      const k = {
        amountOffset: F,
        assetIdOffset: M,
        gasForwardedOffset: T,
        callDataOffset: G
      };
      A.push(k), h = c + ie(b).byteLength;
    }
    const w = wc(A);
    return { data: ie(b), script: w };
  },
  () => [new Uint8Array()]
);
function ny(e) {
  const t = e.receipts.find((n) => n.type === ue.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || B(0);
}
var sd = class {
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
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = ny(t);
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
    return ed(this.functionScopes);
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
      return Zw(e, n, t);
    const s = Kw(
      e,
      (n == null ? void 0 : n.program).id,
      t
    ).map((i, o) => {
      var A;
      const { func: c } = this.functionScopes[o].getCallConfig();
      return (A = c.decodeOutput(i)) == null ? void 0 : A[0];
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
    return Lo(e, n, r);
  }
}, id = class extends sd {
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
    return new id(
      t,
      n,
      i,
      s,
      r
    );
  }
}, ds = class extends sd {
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
    return await new ds(t, n, r);
  }
};
function ry(e) {
  const { program: t, args: n, forward: r, func: s, callParameters: i, externalAbis: o } = e.getCallConfig(), c = s.encodeArguments(n);
  return {
    contractId: t.id,
    fnSelectorBytes: s.selectorBytes,
    data: c,
    assetId: r == null ? void 0 : r.assetId,
    amount: r == null ? void 0 : r.amount,
    gas: i == null ? void 0 : i.gasLimit,
    externalContractsAbis: o
  };
}
var od = class {
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
    this.program = e, this.isMultiCall = t, this.transactionRequest = new vn();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    if (!this.getProvider().getChain())
      throw new v(
        v.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``"
      );
    return this.functionInvocationScopes.map((n) => ry(n));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), n = ty(this.functionInvocationScopes, t);
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
    await Co(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === Oe.Script && (this.transactionRequest.abis = ed(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, n) => t.add(n.gas || 0), B(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new v(
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
    e = Gt(e);
    const t = await this.getTransactionCost(), { gasUsed: n, missingContractIds: r, outputVariables: s, maxFee: i } = t;
    return this.setDefaultTxParams(e, n, i), e.inputs = e.inputs.filter((c) => c.type !== Ce.Coin), r.forEach((c) => {
      e.addContractInputAndOutput(de.fromString(c));
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
    mc(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      awaitExecution: !0,
      estimateTxDependencies: !1
    });
    return id.build(
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
    if (mc(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new v(
        N.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return ds.build(this.functionInvocationScopes, t, this.isMultiCall);
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
    return ds.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall
    );
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return ds.build(
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
    var c, A;
    const r = Nn((c = this.txParameters) == null ? void 0 : c.gasLimit) || this.hasCallParamsGasLimit, s = Nn((A = this.txParameters) == null ? void 0 : A.maxFee), { gasLimit: i, maxFee: o } = e;
    if (!r)
      e.gasLimit = t;
    else if (i.lt(t))
      throw new v(
        N.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${t}'.`
      );
    if (!s)
      e.maxFee = n;
    else if (n.gt(o))
      throw new v(
        N.MAX_FEE_TOO_LOW,
        `Max fee '${o}' is lower than the required: '${n}'.`
      );
  }
}, ad = class extends od {
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
        throw new v(
          N.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = vo(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, sy = class extends od {
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
}, iy = class {
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
    this.interface = t instanceof jt ? t : new jt(t), this.id = de.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
      const t = (...n) => new ad(this, e, n);
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
    return new sy(this, e);
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
}, oy = class extends ad {
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
      throw new v(
        v.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    this.scriptRequest = new Us(
      t,
      (r) => this.func.encodeArguments(r),
      () => []
    );
  }
}, rI = class extends kl {
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
    this.bytes = H(t), this.interface = new jt(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new oy(this, this.interface.getFunction("main"), s)
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
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new Us(
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
function sI(e) {
  return e;
}
var ay = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(ay || {}), cy = Object.defineProperty, uy = (e, t) => {
  for (var n in t)
    cy(e, n, { get: t[n], enumerable: !0 });
}, dy = {};
uy(dy, {
  getContractId: () => dd,
  getContractRoot: () => cd,
  getContractStorageRoot: () => ud,
  hexlifyWithPrefix: () => Wi
});
var cd = (e) => {
  const n = H(e), r = Nc(n, 16384);
  return yu(r.map((s) => z(s)));
}, ud = (e) => {
  const t = new $g();
  return e.forEach(({ key: n, value: r }) => t.update(mt(n), r)), t.root;
}, dd = (e, t, n) => {
  const r = cd(H(e));
  return mt(ie(["0x4655454C", t, r, n]));
}, Wi = (e) => z(e.startsWith("0x") ? e : `0x${e}`), Ay = class {
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
    this.bytecode = H(e), t instanceof jt ? this.interface = t : this.interface = new jt(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new Ay(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    var o;
    const t = (o = e == null ? void 0 : e.storageSlots) == null ? void 0 : o.map(({ key: c, value: A }) => ({
      key: Wi(c),
      value: Wi(A)
    })).sort(({ key: c }, { key: A }) => c.localeCompare(A)), n = {
      salt: Tt(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new v(
        N.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || ud(n.storageSlots), s = dd(this.bytecode, n.salt, r), i = new zi({
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
      throw new v(N.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), s = await this.account.provider.getTransactionCost(r), { maxFee: i } = e;
    if (Nn(i)) {
      if (s.maxFee.gt(i))
        throw new v(
          N.MAX_FEE_TOO_LOW,
          `Max fee '${e.maxFee}' is lower than the required: '${s.maxFee}'.`
        );
    } else
      r.maxFee = s.maxFee;
    return await this.account.fund(r, s), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new iy(n, this.interface, this.account);
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
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, iI = 9, oI = 3, aI = 9, cI = 9, uI = 18, dI = 15, AI = 12, lI = 9, yc = "http://127.0.0.1:4000/v1/graphql", fI = "https://devnet.fuel.network/v1/graphql", hI = "https://testnet.fuel.network/v1/graphql", vc, gI = typeof process < "u" && ((vc = process == null ? void 0 : process.env) == null ? void 0 : vc.FUEL_NETWORK_URL) || yc;
export {
  hs as ASSET_ID_LEN,
  wr as AbiCoder,
  E0 as AbstractAccount,
  Ll as AbstractAddress,
  Ol as AbstractContract,
  C0 as AbstractProgram,
  kl as AbstractScript,
  _y as AbstractScriptRequest,
  Ps as Account,
  de as Address,
  Pm as AddressType,
  we as ArrayCoder,
  V as B256Coder,
  _l as B512Coder,
  Me as BN,
  pn as BYTES_32,
  To as BaseTransactionRequest,
  Uu as BaseWalletUnlocked,
  D as BigNumberCoder,
  Rl as BooleanCoder,
  Ee as ByteArrayCoder,
  f0 as ByteCoder,
  Pn as CHAIN_IDS,
  El as CONTRACT_ID_LEN,
  Qy as CONTRACT_MAX_SIZE,
  Um as ChainName,
  zy as ChangeOutputCollisionError,
  ce as Coder,
  ay as Commands,
  iy as Contract,
  Ay as ContractFactory,
  dy as ContractUtils,
  zi as CreateTransactionRequest,
  cI as DECIMAL_FUEL,
  lI as DECIMAL_GWEI,
  dI as DECIMAL_KWEI,
  AI as DECIMAL_MWEI,
  uI as DECIMAL_WEI,
  aI as DEFAULT_DECIMAL_UNITS,
  oI as DEFAULT_MIN_PRECISION,
  iI as DEFAULT_PRECISION,
  fI as DEVNET_NETWORK_URL,
  $i as DateTime,
  ls as ENCODING_V1,
  Sy as EmptyRoot,
  h0 as EnumCoder,
  N as ErrorCode,
  Qh as FAILED_ASSERT_EQ_SIGNAL,
  Dh as FAILED_ASSERT_NE_SIGNAL,
  Nh as FAILED_ASSERT_SIGNAL,
  Sh as FAILED_REQUIRE_SIGNAL,
  j0 as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  Oy as FAILED_UNKNOWN_SIGNAL,
  ps as FUEL_BECH32_HRP_PREFIX,
  gI as FUEL_NETWORK_URL,
  Ku as Fuel,
  Uw as FuelConnector,
  $u as FuelConnectorEventType,
  Uo as FuelConnectorEventTypes,
  ju as FuelConnectorMethods,
  v as FuelError,
  id as FunctionInvocationResult,
  ad as FunctionInvocationScope,
  Ii as HDWallet,
  xy as INPUT_COIN_FIXED_SIZE,
  mn as InputCoder,
  fa as InputCoinCoder,
  ms as InputContractCoder,
  Ir as InputMessageCoder,
  Ce as InputType,
  td as InstructionSet,
  jt as Interface,
  ds as InvocationCallResult,
  sd as InvocationResult,
  yc as LOCAL_NETWORK_URL,
  Ew as Language,
  Pw as LocalStorage,
  Ly as MAX_PREDICATE_DATA_LENGTH,
  My as MAX_PREDICATE_LENGTH,
  Ty as MAX_SCRIPT_DATA_LENGTH,
  Dy as MAX_SCRIPT_LENGTH,
  Fy as MAX_STATIC_CONTRACTS,
  Ny as MAX_WITNESSES,
  fc as MNEMONIC_SIZES,
  Mw as MemoryStorage,
  Oo as Mnemonic,
  Xu as MnemonicVault,
  sy as MultiCallInvocationScope,
  wm as NoWitnessAtIndexError,
  Hy as NoWitnessByOwnerError,
  $ as NumberCoder,
  km as OperationName,
  w0 as OptionCoder,
  ga as OutputChangeCoder,
  wn as OutputCoder,
  ha as OutputCoinCoder,
  ws as OutputContractCoder,
  ma as OutputContractCreatedCoder,
  Ie as OutputType,
  pa as OutputVariableCoder,
  Fh as PANIC_DOC_URL,
  Th as PANIC_REASONS,
  yn as PoliciesCoder,
  Qt as PolicyType,
  pc as Predicate,
  Wu as PrivateKeyVault,
  Cs as Provider,
  Ql as RawSliceCoder,
  Ri as ReceiptBurnCoder,
  wa as ReceiptCallCoder,
  vy as ReceiptCoder,
  Ca as ReceiptLogCoder,
  Ba as ReceiptLogDataCoder,
  ys as ReceiptMessageOutCoder,
  br as ReceiptMintCoder,
  ba as ReceiptPanicCoder,
  ya as ReceiptReturnCoder,
  Ia as ReceiptReturnDataCoder,
  Ea as ReceiptRevertCoder,
  va as ReceiptScriptResultCoder,
  xa as ReceiptTransferCoder,
  _a as ReceiptTransferOutCoder,
  ue as ReceiptType,
  l0 as SCRIPT_FIXED_SIZE,
  rI as Script,
  Us as ScriptRequest,
  vn as ScriptTransactionRequest,
  nr as Signer,
  lo as StdStringCoder,
  tI as StorageAbstract,
  Ra as StorageSlotCoder,
  y0 as StrSliceCoder,
  Nl as StringCoder,
  Qs as StructCoder,
  hI as TESTNET_NETWORK_URL,
  Jt as TransactionCoder,
  Na as TransactionCreateCoder,
  Da as TransactionMintCoder,
  us as TransactionResponse,
  Qa as TransactionScriptCoder,
  Om as TransactionStatus,
  Oe as TransactionType,
  Lm as TransactionTypeName,
  Ta as TransactionUpgradeCoder,
  Fa as TransactionUploadCoder,
  I0 as TupleCoder,
  qn as TxPointerCoder,
  fs as UTXO_ID_LEN,
  Ry as UtxoIdCoder,
  Ow as Vault,
  Dl as VecCoder,
  ge as WORD_SIZE,
  Ct as Wallet,
  Yu as WalletLocked,
  Lw as WalletManager,
  bt as WalletUnlocked,
  In as WitnessCoder,
  Ne as ZeroBytes32,
  tp as addAmountToCoinQuantities,
  tr as addOperation,
  fr as addressify,
  H as arrayify,
  pm as assemblePanicError,
  Am as assembleReceiptByType,
  mm as assembleRevertError,
  ks as assembleTransactionSummary,
  mc as assert,
  eI as assets,
  B as bn,
  fn as bufferFromString,
  Vy as buildBlockExplorerUrl,
  Gw as cacheFor,
  Yy as cacheRequestInputsResources,
  Im as cacheRequestInputsResourcesFromOwner,
  Ui as calculateGasFee,
  Ru as calculateMetadataGasForTxCreate,
  Su as calculateMetadataGasForTxScript,
  xm as calculateTXFeeForSummary,
  A0 as calculateVmTxMemory,
  my as capitalizeString,
  Nc as chunkAndPadBytes,
  Hl as clearFirst12BytesFromB256,
  vo as coinQuantityfy,
  o0 as computeHmac,
  ie as concat,
  vs as concatBytes,
  sI as createConfig,
  Ki as dataSlice,
  Ud as decodeBase58,
  qA as decrypt,
  $A as decryptJsonWalletData,
  Iy as defaultConsensusKey,
  yy as defaultSnapshotConfigs,
  Vw as deferPromise,
  nI as dispatchFuelConnectorEvent,
  Mc as encodeBase58,
  jA as encrypt,
  KA as encryptJsonWalletData,
  Jr as english,
  tw as extractBurnedAssetsFromReceipts,
  ew as extractMintedAssetsFromReceipts,
  No as extractTxError,
  hy as format,
  fy as formatUnits,
  ho as fromBech32,
  hw as fuelAssetsBaseUrl,
  hm as gasUsedByInputs,
  ed as getAbisFromAllCalls,
  ym as getAssetAmountInRequestInputs,
  $y as getAssetEth,
  Ky as getAssetFuel,
  cw as getAssetNetwork,
  Pu as getAssetWithNetwork,
  go as getBytesFromBech32,
  Jm as getContractCallOperations,
  $m as getContractCreatedOperations,
  Lo as getDecodedLogs,
  aw as getDefaultChainId,
  _u as getGasUsedFromReceipts,
  Mo as getInputAccountAddress,
  Dm as getInputContractFromIndex,
  Du as getInputFromAssetId,
  Fo as getInputsByType,
  vm as getInputsByTypes,
  Rm as getInputsCoin,
  Qm as getInputsCoinAndMessage,
  Nm as getInputsContract,
  Sm as getInputsMessage,
  Qo as getMaxGas,
  vu as getMinGas,
  R0 as getMintedAssetId,
  Km as getOperations,
  Or as getOutputsByType,
  Fm as getOutputsChange,
  Tu as getOutputsCoin,
  Mm as getOutputsContract,
  Tm as getOutputsContractCreated,
  Xy as getOutputsVariable,
  jm as getPayProducerOperations,
  kw as getPredicateRoot,
  zl as getRandomB256,
  Br as getReceiptsByType,
  Hm as getReceiptsCall,
  Ym as getReceiptsMessageOut,
  Zy as getReceiptsTransferOut,
  ic as getReceiptsWithMissingData,
  Qu as getRequestInputResourceOwner,
  nw as getTransactionStatusName,
  Jy as getTransactionSummary,
  qy as getTransactionSummaryFromRequest,
  Fu as getTransactionTypeName,
  jy as getTransactionsSummaries,
  ac as getTransferOperations,
  Zm as getWithdrawFromFuelOperations,
  Wy as hasSameAssetId,
  qt as hash,
  rl as hashMessage,
  z as hexlify,
  om as inputify,
  _i as isB256,
  ss as isBech32,
  cm as isCoin,
  Nn as isDefined,
  vi as isEvmAddress,
  Gy as isMessage,
  Aa as isPublicKey,
  Py as isRawCoin,
  Uy as isRawMessage,
  or as isRequestInputCoin,
  Do as isRequestInputMessage,
  gn as isRequestInputResource,
  Vi as isRequestInputResourceFromOwner,
  kr as isType,
  Mu as isTypeCreate,
  Gm as isTypeMint,
  Lu as isTypeScript,
  Vm as isTypeUpgrade,
  zm as isTypeUpload,
  i0 as keccak256,
  By as keyFromPassword,
  gy as max,
  py as multiply,
  Vl as normalizeBech32,
  gm as normalizeJSON,
  wy as normalizeString,
  am as outputify,
  Yl as padFirst12BytesOfEvmAddress,
  el as pbkdf2,
  An as processGqlReceipt,
  rw as processGraphqlStatus,
  Tt as randomBytes,
  gw as rawAssets,
  hn as resolveGasDependentCosts,
  fw as resolveIconPaths,
  oc as returnZeroScript,
  tl as ripemd160,
  s0 as scrypt,
  mt as sha256,
  Md as sleep,
  jl as sortPolicies,
  lr as stringFromBuffer,
  la as toB256,
  rs as toBech32,
  Zt as toBytes,
  _d as toFixed,
  ji as toHex,
  cn as toNumber,
  Yn as toUtf8Bytes,
  eo as toUtf8String,
  wt as transactionRequestify,
  nl as uint64ToBytesBE,
  lw as urlJoin,
  qr as withTimeout,
  Bm as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
