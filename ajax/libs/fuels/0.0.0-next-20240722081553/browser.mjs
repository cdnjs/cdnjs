var ld = Object.defineProperty;
var ea = (e) => {
  throw TypeError(e);
};
var fd = (e, t, n) => t in e ? ld(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var D = (e, t, n) => fd(e, typeof t != "symbol" ? t + "" : t, n), si = (e, t, n) => t.has(e) || ea("Cannot " + n);
var Fe = (e, t, n) => (si(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Rt = (e, t, n) => t.has(e) ? ea("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Mt = (e, t, n, r) => (si(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Gr = (e, t, n) => (si(e, t, "access private method"), n);
function Sc() {
  return {
    FORC: "0.62.0",
    FUEL_CORE: "0.31.0",
    FUELS: "0.92.1"
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
function hd(e, t) {
  const { major: n } = Zi(e, t);
  return n === 0;
}
function gd(e, t) {
  const { minor: n } = Zi(e, t);
  return n === 0;
}
function pd(e, t) {
  const { patch: n } = Zi(e, t);
  return n === 0;
}
function md(e) {
  const { FUEL_CORE: t } = Sc();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: hd(e, t),
    isMinorSupported: gd(e, t),
    isPatchSupported: pd(e, t)
  };
}
var wd = Sc(), yd = Object.defineProperty, Id = (e, t, n) => t in e ? yd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ed = (e, t, n) => (Id(e, typeof t != "symbol" ? t + "" : t, n), n), S = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e.NODE_LAUNCH_FAILED = "node-launch-failed", e.UNKNOWN = "unknown", e))(S || {}), $r = class extends Error {
  constructor(t, n, r = {}, s = {}) {
    super(n);
    D(this, "VERSIONS", wd);
    D(this, "metadata");
    D(this, "rawError");
    D(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = r, this.rawError = s;
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new $r(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(S);
    if (!r.includes(n.code))
      throw new $r(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new $r(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, metadata: s, VERSIONS: i, rawError: o } = this;
    return { code: t, name: n, message: r, metadata: s, VERSIONS: i, rawError: o };
  }
}, v = $r;
Ed(v, "CODES", S);
var Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function bd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Wi(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
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
var Ji = { exports: {} };
const Cd = {}, Bd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cd
}, Symbol.toStringTag, { value: "Module" })), xd = /* @__PURE__ */ Wi(Bd);
Ji.exports;
(function(e) {
  (function(t, n) {
    function r(b, a) {
      if (!b) throw new Error(a || "Assertion failed");
    }
    function s(b, a) {
      b.super_ = a;
      var u = function() {
      };
      u.prototype = a.prototype, b.prototype = new u(), b.prototype.constructor = b;
    }
    function i(b, a, u) {
      if (i.isBN(b))
        return b;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, b !== null && ((a === "le" || a === "be") && (u = a, a = 10), this._init(b || 0, a || 10, u || "be"));
    }
    typeof t == "object" ? t.exports = i : n.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = xd.Buffer;
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
      var f, y, E = 0;
      if (l === "be")
        for (p = a.length - 1, f = 0; p >= 0; p -= 3)
          y = a[p] | a[p - 1] << 8 | a[p - 2] << 16, this.words[f] |= y << E & 67108863, this.words[f + 1] = y >>> 26 - E & 67108863, E += 24, E >= 26 && (E -= 26, f++);
      else if (l === "le")
        for (p = 0, f = 0; p < a.length; p += 3)
          y = a[p] | a[p + 1] << 8 | a[p + 2] << 16, this.words[f] |= y << E & 67108863, this.words[f + 1] = y >>> 26 - E & 67108863, E += 24, E >= 26 && (E -= 26, f++);
      return this._strip();
    };
    function c(b, a) {
      var u = b.charCodeAt(a);
      if (u >= 48 && u <= 57)
        return u - 48;
      if (u >= 65 && u <= 70)
        return u - 55;
      if (u >= 97 && u <= 102)
        return u - 87;
      r(!1, "Invalid character in " + b);
    }
    function A(b, a, u) {
      var l = c(b, u);
      return u - 1 >= a && (l |= c(b, u - 1) << 4), l;
    }
    i.prototype._parseHex = function(a, u, l) {
      this.length = Math.ceil((a.length - u) / 6), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var f = 0, y = 0, E;
      if (l === "be")
        for (p = a.length - 1; p >= u; p -= 2)
          E = A(a, u, p) << f, this.words[y] |= E & 67108863, f >= 18 ? (f -= 18, y += 1, this.words[y] |= E >>> 26) : f += 8;
      else {
        var g = a.length - u;
        for (p = g % 2 === 0 ? u + 1 : u; p < a.length; p += 2)
          E = A(a, u, p) << f, this.words[y] |= E & 67108863, f >= 18 ? (f -= 18, y += 1, this.words[y] |= E >>> 26) : f += 8;
      }
      this._strip();
    };
    function h(b, a, u, l) {
      for (var p = 0, f = 0, y = Math.min(b.length, u), E = a; E < y; E++) {
        var g = b.charCodeAt(E) - 48;
        p *= l, g >= 49 ? f = g - 49 + 10 : g >= 17 ? f = g - 17 + 10 : f = g, r(g >= 0 && f < l, "Invalid character"), p += f;
      }
      return p;
    }
    i.prototype._parseBase = function(a, u, l) {
      this.words = [0], this.length = 1;
      for (var p = 0, f = 1; f <= 67108863; f *= u)
        p++;
      p--, f = f / u | 0;
      for (var y = a.length - l, E = y % p, g = Math.min(y, y - E) + l, d = 0, w = l; w < g; w += p)
        d = h(a, w, w + p, u), this.imuln(f), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
      if (E !== 0) {
        var Y = 1;
        for (d = h(a, w, a.length, u), w = 0; w < E; w++)
          Y *= u;
        this.imuln(Y), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
      }
      this._strip();
    }, i.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var u = 0; u < this.length; u++)
        a.words[u] = this.words[u];
      a.length = this.length, a.negative = this.negative, a.red = this.red;
    };
    function I(b, a) {
      b.words = a.words, b.length = a.length, b.negative = a.negative, b.red = a.red;
    }
    if (i.prototype._move = function(a) {
      I(a, this);
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
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = m;
      } catch {
        i.prototype.inspect = m;
      }
    else
      i.prototype.inspect = m;
    function m() {
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
          var E = this.words[y], g = ((E << p | f) & 16777215).toString(16);
          f = E >>> 24 - p & 16777215, p += 2, p >= 26 && (p -= 26, y--), f !== 0 || y !== this.length - 1 ? l = x[6 - g.length] + g + l : l = g + l;
        }
        for (f !== 0 && (l = f.toString(16) + l); l.length % u !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var d = _[a], w = R[a];
        l = "";
        var Y = this.clone();
        for (Y.negative = 0; !Y.isZero(); ) {
          var J = Y.modrn(w).toString(a);
          Y = Y.idivn(w), Y.isZero() ? l = J + l : l = x[d - J.length] + J + l;
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
      var y = C(a, f), E = u === "le" ? "LE" : "BE";
      return this["_toArrayLike" + E](y, p), y;
    }, i.prototype._toArrayLikeLE = function(a, u) {
      for (var l = 0, p = 0, f = 0, y = 0; f < this.length; f++) {
        var E = this.words[f] << y | p;
        a[l++] = E & 255, l < a.length && (a[l++] = E >> 8 & 255), l < a.length && (a[l++] = E >> 16 & 255), y === 6 ? (l < a.length && (a[l++] = E >> 24 & 255), p = 0, y = 0) : (p = E >>> 24, y += 2);
      }
      if (l < a.length)
        for (a[l++] = p; l < a.length; )
          a[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, u) {
      for (var l = a.length - 1, p = 0, f = 0, y = 0; f < this.length; f++) {
        var E = this.words[f] << y | p;
        a[l--] = E & 255, l >= 0 && (a[l--] = E >> 8 & 255), l >= 0 && (a[l--] = E >> 16 & 255), y === 6 ? (l >= 0 && (a[l--] = E >> 24 & 255), p = 0, y = 0) : (p = E >>> 24, y += 2);
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
      if (a === 0) return 26;
      var u = a, l = 0;
      return u & 8191 || (l += 13, u >>>= 13), u & 127 || (l += 7, u >>>= 7), u & 15 || (l += 4, u >>>= 4), u & 3 || (l += 2, u >>>= 2), u & 1 || l++, l;
    }, i.prototype.bitLength = function() {
      var a = this.words[this.length - 1], u = this._countBits(a);
      return (this.length - 1) * 26 + u;
    };
    function F(b) {
      for (var a = new Array(b.bitLength()), u = 0; u < a.length; u++) {
        var l = u / 26 | 0, p = u % 26;
        a[u] = b.words[l] >>> p & 1;
      }
      return a;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero()) return 0;
      for (var a = 0, u = 0; u < this.length; u++) {
        var l = this._zeroBits(this.words[u]);
        if (a += l, l !== 26) break;
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
      for (var y = 0, E = 0; E < f.length; E++)
        u = (p.words[E] | 0) - (f.words[E] | 0) + y, y = u >> 26, this.words[E] = u & 67108863;
      for (; y !== 0 && E < p.length; E++)
        u = (p.words[E] | 0) + y, y = u >> 26, this.words[E] = u & 67108863;
      if (y === 0 && E < p.length && p !== this)
        for (; E < p.length; E++)
          this.words[E] = p.words[E];
      return this.length = Math.max(this.length, E), p !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function M(b, a, u) {
      u.negative = a.negative ^ b.negative;
      var l = b.length + a.length | 0;
      u.length = l, l = l - 1 | 0;
      var p = b.words[0] | 0, f = a.words[0] | 0, y = p * f, E = y & 67108863, g = y / 67108864 | 0;
      u.words[0] = E;
      for (var d = 1; d < l; d++) {
        for (var w = g >>> 26, Y = g & 67108863, J = Math.min(d, a.length - 1), K = Math.max(0, d - b.length + 1); K <= J; K++) {
          var j = d - K | 0;
          p = b.words[j] | 0, f = a.words[K] | 0, y = p * f + Y, w += y / 67108864 | 0, Y = y & 67108863;
        }
        u.words[d] = Y | 0, g = w | 0;
      }
      return g !== 0 ? u.words[d] = g | 0 : u.length--, u._strip();
    }
    var G = function(a, u, l) {
      var p = a.words, f = u.words, y = l.words, E = 0, g, d, w, Y = p[0] | 0, J = Y & 8191, K = Y >>> 13, j = p[1] | 0, re = j & 8191, se = j >>> 13, Se = p[2] | 0, fe = Se & 8191, oe = Se >>> 13, _e = p[3] | 0, Ae = _e & 8191, he = _e >>> 13, Ft = p[4] | 0, ve = Ft & 8191, ye = Ft >>> 13, ur = p[5] | 0, Qe = ur & 8191, Te = ur >>> 13, Ur = p[6] | 0, Pe = Ur & 8191, Ue = Ur >>> 13, Go = p[7] | 0, Ge = Go & 8191, ze = Go >>> 13, zo = p[8] | 0, He = zo & 8191, Xe = zo >>> 13, Ho = p[9] | 0, Ve = Ho & 8191, Ye = Ho >>> 13, Xo = f[0] | 0, Ze = Xo & 8191, We = Xo >>> 13, Vo = f[1] | 0, Je = Vo & 8191, qe = Vo >>> 13, Yo = f[2] | 0, je = Yo & 8191, $e = Yo >>> 13, Zo = f[3] | 0, Ke = Zo & 8191, et = Zo >>> 13, Wo = f[4] | 0, tt = Wo & 8191, nt = Wo >>> 13, Jo = f[5] | 0, rt = Jo & 8191, st = Jo >>> 13, qo = f[6] | 0, it = qo & 8191, ot = qo >>> 13, jo = f[7] | 0, at = jo & 8191, ct = jo >>> 13, $o = f[8] | 0, ut = $o & 8191, dt = $o >>> 13, Ko = f[9] | 0, At = Ko & 8191, lt = Ko >>> 13;
      l.negative = a.negative ^ u.negative, l.length = 19, g = Math.imul(J, Ze), d = Math.imul(J, We), d = d + Math.imul(K, Ze) | 0, w = Math.imul(K, We);
      var Ps = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Ps >>> 26) | 0, Ps &= 67108863, g = Math.imul(re, Ze), d = Math.imul(re, We), d = d + Math.imul(se, Ze) | 0, w = Math.imul(se, We), g = g + Math.imul(J, Je) | 0, d = d + Math.imul(J, qe) | 0, d = d + Math.imul(K, Je) | 0, w = w + Math.imul(K, qe) | 0;
      var Us = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Us >>> 26) | 0, Us &= 67108863, g = Math.imul(fe, Ze), d = Math.imul(fe, We), d = d + Math.imul(oe, Ze) | 0, w = Math.imul(oe, We), g = g + Math.imul(re, Je) | 0, d = d + Math.imul(re, qe) | 0, d = d + Math.imul(se, Je) | 0, w = w + Math.imul(se, qe) | 0, g = g + Math.imul(J, je) | 0, d = d + Math.imul(J, $e) | 0, d = d + Math.imul(K, je) | 0, w = w + Math.imul(K, $e) | 0;
      var Gs = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Gs >>> 26) | 0, Gs &= 67108863, g = Math.imul(Ae, Ze), d = Math.imul(Ae, We), d = d + Math.imul(he, Ze) | 0, w = Math.imul(he, We), g = g + Math.imul(fe, Je) | 0, d = d + Math.imul(fe, qe) | 0, d = d + Math.imul(oe, Je) | 0, w = w + Math.imul(oe, qe) | 0, g = g + Math.imul(re, je) | 0, d = d + Math.imul(re, $e) | 0, d = d + Math.imul(se, je) | 0, w = w + Math.imul(se, $e) | 0, g = g + Math.imul(J, Ke) | 0, d = d + Math.imul(J, et) | 0, d = d + Math.imul(K, Ke) | 0, w = w + Math.imul(K, et) | 0;
      var zs = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (zs >>> 26) | 0, zs &= 67108863, g = Math.imul(ve, Ze), d = Math.imul(ve, We), d = d + Math.imul(ye, Ze) | 0, w = Math.imul(ye, We), g = g + Math.imul(Ae, Je) | 0, d = d + Math.imul(Ae, qe) | 0, d = d + Math.imul(he, Je) | 0, w = w + Math.imul(he, qe) | 0, g = g + Math.imul(fe, je) | 0, d = d + Math.imul(fe, $e) | 0, d = d + Math.imul(oe, je) | 0, w = w + Math.imul(oe, $e) | 0, g = g + Math.imul(re, Ke) | 0, d = d + Math.imul(re, et) | 0, d = d + Math.imul(se, Ke) | 0, w = w + Math.imul(se, et) | 0, g = g + Math.imul(J, tt) | 0, d = d + Math.imul(J, nt) | 0, d = d + Math.imul(K, tt) | 0, w = w + Math.imul(K, nt) | 0;
      var Hs = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Hs >>> 26) | 0, Hs &= 67108863, g = Math.imul(Qe, Ze), d = Math.imul(Qe, We), d = d + Math.imul(Te, Ze) | 0, w = Math.imul(Te, We), g = g + Math.imul(ve, Je) | 0, d = d + Math.imul(ve, qe) | 0, d = d + Math.imul(ye, Je) | 0, w = w + Math.imul(ye, qe) | 0, g = g + Math.imul(Ae, je) | 0, d = d + Math.imul(Ae, $e) | 0, d = d + Math.imul(he, je) | 0, w = w + Math.imul(he, $e) | 0, g = g + Math.imul(fe, Ke) | 0, d = d + Math.imul(fe, et) | 0, d = d + Math.imul(oe, Ke) | 0, w = w + Math.imul(oe, et) | 0, g = g + Math.imul(re, tt) | 0, d = d + Math.imul(re, nt) | 0, d = d + Math.imul(se, tt) | 0, w = w + Math.imul(se, nt) | 0, g = g + Math.imul(J, rt) | 0, d = d + Math.imul(J, st) | 0, d = d + Math.imul(K, rt) | 0, w = w + Math.imul(K, st) | 0;
      var Xs = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Xs >>> 26) | 0, Xs &= 67108863, g = Math.imul(Pe, Ze), d = Math.imul(Pe, We), d = d + Math.imul(Ue, Ze) | 0, w = Math.imul(Ue, We), g = g + Math.imul(Qe, Je) | 0, d = d + Math.imul(Qe, qe) | 0, d = d + Math.imul(Te, Je) | 0, w = w + Math.imul(Te, qe) | 0, g = g + Math.imul(ve, je) | 0, d = d + Math.imul(ve, $e) | 0, d = d + Math.imul(ye, je) | 0, w = w + Math.imul(ye, $e) | 0, g = g + Math.imul(Ae, Ke) | 0, d = d + Math.imul(Ae, et) | 0, d = d + Math.imul(he, Ke) | 0, w = w + Math.imul(he, et) | 0, g = g + Math.imul(fe, tt) | 0, d = d + Math.imul(fe, nt) | 0, d = d + Math.imul(oe, tt) | 0, w = w + Math.imul(oe, nt) | 0, g = g + Math.imul(re, rt) | 0, d = d + Math.imul(re, st) | 0, d = d + Math.imul(se, rt) | 0, w = w + Math.imul(se, st) | 0, g = g + Math.imul(J, it) | 0, d = d + Math.imul(J, ot) | 0, d = d + Math.imul(K, it) | 0, w = w + Math.imul(K, ot) | 0;
      var Vs = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Vs >>> 26) | 0, Vs &= 67108863, g = Math.imul(Ge, Ze), d = Math.imul(Ge, We), d = d + Math.imul(ze, Ze) | 0, w = Math.imul(ze, We), g = g + Math.imul(Pe, Je) | 0, d = d + Math.imul(Pe, qe) | 0, d = d + Math.imul(Ue, Je) | 0, w = w + Math.imul(Ue, qe) | 0, g = g + Math.imul(Qe, je) | 0, d = d + Math.imul(Qe, $e) | 0, d = d + Math.imul(Te, je) | 0, w = w + Math.imul(Te, $e) | 0, g = g + Math.imul(ve, Ke) | 0, d = d + Math.imul(ve, et) | 0, d = d + Math.imul(ye, Ke) | 0, w = w + Math.imul(ye, et) | 0, g = g + Math.imul(Ae, tt) | 0, d = d + Math.imul(Ae, nt) | 0, d = d + Math.imul(he, tt) | 0, w = w + Math.imul(he, nt) | 0, g = g + Math.imul(fe, rt) | 0, d = d + Math.imul(fe, st) | 0, d = d + Math.imul(oe, rt) | 0, w = w + Math.imul(oe, st) | 0, g = g + Math.imul(re, it) | 0, d = d + Math.imul(re, ot) | 0, d = d + Math.imul(se, it) | 0, w = w + Math.imul(se, ot) | 0, g = g + Math.imul(J, at) | 0, d = d + Math.imul(J, ct) | 0, d = d + Math.imul(K, at) | 0, w = w + Math.imul(K, ct) | 0;
      var Ys = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Ys >>> 26) | 0, Ys &= 67108863, g = Math.imul(He, Ze), d = Math.imul(He, We), d = d + Math.imul(Xe, Ze) | 0, w = Math.imul(Xe, We), g = g + Math.imul(Ge, Je) | 0, d = d + Math.imul(Ge, qe) | 0, d = d + Math.imul(ze, Je) | 0, w = w + Math.imul(ze, qe) | 0, g = g + Math.imul(Pe, je) | 0, d = d + Math.imul(Pe, $e) | 0, d = d + Math.imul(Ue, je) | 0, w = w + Math.imul(Ue, $e) | 0, g = g + Math.imul(Qe, Ke) | 0, d = d + Math.imul(Qe, et) | 0, d = d + Math.imul(Te, Ke) | 0, w = w + Math.imul(Te, et) | 0, g = g + Math.imul(ve, tt) | 0, d = d + Math.imul(ve, nt) | 0, d = d + Math.imul(ye, tt) | 0, w = w + Math.imul(ye, nt) | 0, g = g + Math.imul(Ae, rt) | 0, d = d + Math.imul(Ae, st) | 0, d = d + Math.imul(he, rt) | 0, w = w + Math.imul(he, st) | 0, g = g + Math.imul(fe, it) | 0, d = d + Math.imul(fe, ot) | 0, d = d + Math.imul(oe, it) | 0, w = w + Math.imul(oe, ot) | 0, g = g + Math.imul(re, at) | 0, d = d + Math.imul(re, ct) | 0, d = d + Math.imul(se, at) | 0, w = w + Math.imul(se, ct) | 0, g = g + Math.imul(J, ut) | 0, d = d + Math.imul(J, dt) | 0, d = d + Math.imul(K, ut) | 0, w = w + Math.imul(K, dt) | 0;
      var Zs = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Zs >>> 26) | 0, Zs &= 67108863, g = Math.imul(Ve, Ze), d = Math.imul(Ve, We), d = d + Math.imul(Ye, Ze) | 0, w = Math.imul(Ye, We), g = g + Math.imul(He, Je) | 0, d = d + Math.imul(He, qe) | 0, d = d + Math.imul(Xe, Je) | 0, w = w + Math.imul(Xe, qe) | 0, g = g + Math.imul(Ge, je) | 0, d = d + Math.imul(Ge, $e) | 0, d = d + Math.imul(ze, je) | 0, w = w + Math.imul(ze, $e) | 0, g = g + Math.imul(Pe, Ke) | 0, d = d + Math.imul(Pe, et) | 0, d = d + Math.imul(Ue, Ke) | 0, w = w + Math.imul(Ue, et) | 0, g = g + Math.imul(Qe, tt) | 0, d = d + Math.imul(Qe, nt) | 0, d = d + Math.imul(Te, tt) | 0, w = w + Math.imul(Te, nt) | 0, g = g + Math.imul(ve, rt) | 0, d = d + Math.imul(ve, st) | 0, d = d + Math.imul(ye, rt) | 0, w = w + Math.imul(ye, st) | 0, g = g + Math.imul(Ae, it) | 0, d = d + Math.imul(Ae, ot) | 0, d = d + Math.imul(he, it) | 0, w = w + Math.imul(he, ot) | 0, g = g + Math.imul(fe, at) | 0, d = d + Math.imul(fe, ct) | 0, d = d + Math.imul(oe, at) | 0, w = w + Math.imul(oe, ct) | 0, g = g + Math.imul(re, ut) | 0, d = d + Math.imul(re, dt) | 0, d = d + Math.imul(se, ut) | 0, w = w + Math.imul(se, dt) | 0, g = g + Math.imul(J, At) | 0, d = d + Math.imul(J, lt) | 0, d = d + Math.imul(K, At) | 0, w = w + Math.imul(K, lt) | 0;
      var Ws = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Ws >>> 26) | 0, Ws &= 67108863, g = Math.imul(Ve, Je), d = Math.imul(Ve, qe), d = d + Math.imul(Ye, Je) | 0, w = Math.imul(Ye, qe), g = g + Math.imul(He, je) | 0, d = d + Math.imul(He, $e) | 0, d = d + Math.imul(Xe, je) | 0, w = w + Math.imul(Xe, $e) | 0, g = g + Math.imul(Ge, Ke) | 0, d = d + Math.imul(Ge, et) | 0, d = d + Math.imul(ze, Ke) | 0, w = w + Math.imul(ze, et) | 0, g = g + Math.imul(Pe, tt) | 0, d = d + Math.imul(Pe, nt) | 0, d = d + Math.imul(Ue, tt) | 0, w = w + Math.imul(Ue, nt) | 0, g = g + Math.imul(Qe, rt) | 0, d = d + Math.imul(Qe, st) | 0, d = d + Math.imul(Te, rt) | 0, w = w + Math.imul(Te, st) | 0, g = g + Math.imul(ve, it) | 0, d = d + Math.imul(ve, ot) | 0, d = d + Math.imul(ye, it) | 0, w = w + Math.imul(ye, ot) | 0, g = g + Math.imul(Ae, at) | 0, d = d + Math.imul(Ae, ct) | 0, d = d + Math.imul(he, at) | 0, w = w + Math.imul(he, ct) | 0, g = g + Math.imul(fe, ut) | 0, d = d + Math.imul(fe, dt) | 0, d = d + Math.imul(oe, ut) | 0, w = w + Math.imul(oe, dt) | 0, g = g + Math.imul(re, At) | 0, d = d + Math.imul(re, lt) | 0, d = d + Math.imul(se, At) | 0, w = w + Math.imul(se, lt) | 0;
      var Js = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Js >>> 26) | 0, Js &= 67108863, g = Math.imul(Ve, je), d = Math.imul(Ve, $e), d = d + Math.imul(Ye, je) | 0, w = Math.imul(Ye, $e), g = g + Math.imul(He, Ke) | 0, d = d + Math.imul(He, et) | 0, d = d + Math.imul(Xe, Ke) | 0, w = w + Math.imul(Xe, et) | 0, g = g + Math.imul(Ge, tt) | 0, d = d + Math.imul(Ge, nt) | 0, d = d + Math.imul(ze, tt) | 0, w = w + Math.imul(ze, nt) | 0, g = g + Math.imul(Pe, rt) | 0, d = d + Math.imul(Pe, st) | 0, d = d + Math.imul(Ue, rt) | 0, w = w + Math.imul(Ue, st) | 0, g = g + Math.imul(Qe, it) | 0, d = d + Math.imul(Qe, ot) | 0, d = d + Math.imul(Te, it) | 0, w = w + Math.imul(Te, ot) | 0, g = g + Math.imul(ve, at) | 0, d = d + Math.imul(ve, ct) | 0, d = d + Math.imul(ye, at) | 0, w = w + Math.imul(ye, ct) | 0, g = g + Math.imul(Ae, ut) | 0, d = d + Math.imul(Ae, dt) | 0, d = d + Math.imul(he, ut) | 0, w = w + Math.imul(he, dt) | 0, g = g + Math.imul(fe, At) | 0, d = d + Math.imul(fe, lt) | 0, d = d + Math.imul(oe, At) | 0, w = w + Math.imul(oe, lt) | 0;
      var qs = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (qs >>> 26) | 0, qs &= 67108863, g = Math.imul(Ve, Ke), d = Math.imul(Ve, et), d = d + Math.imul(Ye, Ke) | 0, w = Math.imul(Ye, et), g = g + Math.imul(He, tt) | 0, d = d + Math.imul(He, nt) | 0, d = d + Math.imul(Xe, tt) | 0, w = w + Math.imul(Xe, nt) | 0, g = g + Math.imul(Ge, rt) | 0, d = d + Math.imul(Ge, st) | 0, d = d + Math.imul(ze, rt) | 0, w = w + Math.imul(ze, st) | 0, g = g + Math.imul(Pe, it) | 0, d = d + Math.imul(Pe, ot) | 0, d = d + Math.imul(Ue, it) | 0, w = w + Math.imul(Ue, ot) | 0, g = g + Math.imul(Qe, at) | 0, d = d + Math.imul(Qe, ct) | 0, d = d + Math.imul(Te, at) | 0, w = w + Math.imul(Te, ct) | 0, g = g + Math.imul(ve, ut) | 0, d = d + Math.imul(ve, dt) | 0, d = d + Math.imul(ye, ut) | 0, w = w + Math.imul(ye, dt) | 0, g = g + Math.imul(Ae, At) | 0, d = d + Math.imul(Ae, lt) | 0, d = d + Math.imul(he, At) | 0, w = w + Math.imul(he, lt) | 0;
      var js = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (js >>> 26) | 0, js &= 67108863, g = Math.imul(Ve, tt), d = Math.imul(Ve, nt), d = d + Math.imul(Ye, tt) | 0, w = Math.imul(Ye, nt), g = g + Math.imul(He, rt) | 0, d = d + Math.imul(He, st) | 0, d = d + Math.imul(Xe, rt) | 0, w = w + Math.imul(Xe, st) | 0, g = g + Math.imul(Ge, it) | 0, d = d + Math.imul(Ge, ot) | 0, d = d + Math.imul(ze, it) | 0, w = w + Math.imul(ze, ot) | 0, g = g + Math.imul(Pe, at) | 0, d = d + Math.imul(Pe, ct) | 0, d = d + Math.imul(Ue, at) | 0, w = w + Math.imul(Ue, ct) | 0, g = g + Math.imul(Qe, ut) | 0, d = d + Math.imul(Qe, dt) | 0, d = d + Math.imul(Te, ut) | 0, w = w + Math.imul(Te, dt) | 0, g = g + Math.imul(ve, At) | 0, d = d + Math.imul(ve, lt) | 0, d = d + Math.imul(ye, At) | 0, w = w + Math.imul(ye, lt) | 0;
      var $s = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + ($s >>> 26) | 0, $s &= 67108863, g = Math.imul(Ve, rt), d = Math.imul(Ve, st), d = d + Math.imul(Ye, rt) | 0, w = Math.imul(Ye, st), g = g + Math.imul(He, it) | 0, d = d + Math.imul(He, ot) | 0, d = d + Math.imul(Xe, it) | 0, w = w + Math.imul(Xe, ot) | 0, g = g + Math.imul(Ge, at) | 0, d = d + Math.imul(Ge, ct) | 0, d = d + Math.imul(ze, at) | 0, w = w + Math.imul(ze, ct) | 0, g = g + Math.imul(Pe, ut) | 0, d = d + Math.imul(Pe, dt) | 0, d = d + Math.imul(Ue, ut) | 0, w = w + Math.imul(Ue, dt) | 0, g = g + Math.imul(Qe, At) | 0, d = d + Math.imul(Qe, lt) | 0, d = d + Math.imul(Te, At) | 0, w = w + Math.imul(Te, lt) | 0;
      var Ks = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (Ks >>> 26) | 0, Ks &= 67108863, g = Math.imul(Ve, it), d = Math.imul(Ve, ot), d = d + Math.imul(Ye, it) | 0, w = Math.imul(Ye, ot), g = g + Math.imul(He, at) | 0, d = d + Math.imul(He, ct) | 0, d = d + Math.imul(Xe, at) | 0, w = w + Math.imul(Xe, ct) | 0, g = g + Math.imul(Ge, ut) | 0, d = d + Math.imul(Ge, dt) | 0, d = d + Math.imul(ze, ut) | 0, w = w + Math.imul(ze, dt) | 0, g = g + Math.imul(Pe, At) | 0, d = d + Math.imul(Pe, lt) | 0, d = d + Math.imul(Ue, At) | 0, w = w + Math.imul(Ue, lt) | 0;
      var ei = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (ei >>> 26) | 0, ei &= 67108863, g = Math.imul(Ve, at), d = Math.imul(Ve, ct), d = d + Math.imul(Ye, at) | 0, w = Math.imul(Ye, ct), g = g + Math.imul(He, ut) | 0, d = d + Math.imul(He, dt) | 0, d = d + Math.imul(Xe, ut) | 0, w = w + Math.imul(Xe, dt) | 0, g = g + Math.imul(Ge, At) | 0, d = d + Math.imul(Ge, lt) | 0, d = d + Math.imul(ze, At) | 0, w = w + Math.imul(ze, lt) | 0;
      var ti = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (ti >>> 26) | 0, ti &= 67108863, g = Math.imul(Ve, ut), d = Math.imul(Ve, dt), d = d + Math.imul(Ye, ut) | 0, w = Math.imul(Ye, dt), g = g + Math.imul(He, At) | 0, d = d + Math.imul(He, lt) | 0, d = d + Math.imul(Xe, At) | 0, w = w + Math.imul(Xe, lt) | 0;
      var ni = (E + g | 0) + ((d & 8191) << 13) | 0;
      E = (w + (d >>> 13) | 0) + (ni >>> 26) | 0, ni &= 67108863, g = Math.imul(Ve, At), d = Math.imul(Ve, lt), d = d + Math.imul(Ye, At) | 0, w = Math.imul(Ye, lt);
      var ri = (E + g | 0) + ((d & 8191) << 13) | 0;
      return E = (w + (d >>> 13) | 0) + (ri >>> 26) | 0, ri &= 67108863, y[0] = Ps, y[1] = Us, y[2] = Gs, y[3] = zs, y[4] = Hs, y[5] = Xs, y[6] = Vs, y[7] = Ys, y[8] = Zs, y[9] = Ws, y[10] = Js, y[11] = qs, y[12] = js, y[13] = $s, y[14] = Ks, y[15] = ei, y[16] = ti, y[17] = ni, y[18] = ri, E !== 0 && (y[19] = E, l.length++), l;
    };
    Math.imul || (G = M);
    function L(b, a, u) {
      u.negative = a.negative ^ b.negative, u.length = b.length + a.length;
      for (var l = 0, p = 0, f = 0; f < u.length - 1; f++) {
        var y = p;
        p = 0;
        for (var E = l & 67108863, g = Math.min(f, a.length - 1), d = Math.max(0, f - b.length + 1); d <= g; d++) {
          var w = f - d, Y = b.words[w] | 0, J = a.words[d] | 0, K = Y * J, j = K & 67108863;
          y = y + (K / 67108864 | 0) | 0, j = j + E | 0, E = j & 67108863, y = y + (j >>> 26) | 0, p += y >>> 26, y &= 67108863;
        }
        u.words[f] = E, l = y, y = p;
      }
      return l !== 0 ? u.words[f] = l : u.length--, u._strip();
    }
    function W(b, a, u) {
      return L(b, a, u);
    }
    i.prototype.mulTo = function(a, u) {
      var l, p = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = G(this, a, u) : p < 63 ? l = M(this, a, u) : p < 1024 ? l = L(this, a, u) : l = W(this, a, u), l;
    }, i.prototype.mul = function(a) {
      var u = new i(null);
      return u.words = new Array(this.length + a.length), this.mulTo(a, u);
    }, i.prototype.mulf = function(a) {
      var u = new i(null);
      return u.words = new Array(this.length + a.length), W(this, a, u);
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
      if (u.length === 0) return new i(1);
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
          var E = this.words[f] & p, g = (this.words[f] | 0) - E << u;
          this.words[f] = g | y, y = E >>> 26 - u;
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
      var f = a % 26, y = Math.min((a - f) / 26, this.length), E = 67108863 ^ 67108863 >>> f << f, g = l;
      if (p -= y, p = Math.max(0, p), g) {
        for (var d = 0; d < y; d++)
          g.words[d] = this.words[d];
        g.length = y;
      }
      if (y !== 0) if (this.length > y)
        for (this.length -= y, d = 0; d < this.length; d++)
          this.words[d] = this.words[d + y];
      else
        this.words[0] = 0, this.length = 1;
      var w = 0;
      for (d = this.length - 1; d >= 0 && (w !== 0 || d >= p); d--) {
        var Y = this.words[d] | 0;
        this.words[d] = w << 26 - f | Y >>> f, w = Y & E;
      }
      return g && w !== 0 && (g.words[g.length++] = w), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
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
      if (this.length <= l) return !1;
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
      if (r(typeof a == "number"), r(a < 67108864), a < 0) return this.iaddn(-a);
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
      var y, E = 0;
      for (f = 0; f < a.length; f++) {
        y = (this.words[f + l] | 0) + E;
        var g = (a.words[f] | 0) * u;
        y -= g & 67108863, E = (y >> 26) - (g / 67108864 | 0), this.words[f + l] = y & 67108863;
      }
      for (; f < this.length - l; f++)
        y = (this.words[f + l] | 0) + E, E = y >> 26, this.words[f + l] = y & 67108863;
      if (E === 0) return this._strip();
      for (r(E === -1), E = 0, f = 0; f < this.length; f++)
        y = -(this.words[f] | 0) + E, E = y >> 26, this.words[f] = y & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, u) {
      var l = this.length - a.length, p = this.clone(), f = a, y = f.words[f.length - 1] | 0, E = this._countBits(y);
      l = 26 - E, l !== 0 && (f = f.ushln(l), p.iushln(l), y = f.words[f.length - 1] | 0);
      var g = p.length - f.length, d;
      if (u !== "mod") {
        d = new i(null), d.length = g + 1, d.words = new Array(d.length);
        for (var w = 0; w < d.length; w++)
          d.words[w] = 0;
      }
      var Y = p.clone()._ishlnsubmul(f, 1, g);
      Y.negative === 0 && (p = Y, d && (d.words[g] = 1));
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
      if (u.mod.isZero()) return u.div;
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
      for (var p = new i(1), f = new i(0), y = new i(0), E = new i(1), g = 0; u.isEven() && l.isEven(); )
        u.iushrn(1), l.iushrn(1), ++g;
      for (var d = l.clone(), w = u.clone(); !u.isZero(); ) {
        for (var Y = 0, J = 1; !(u.words[0] & J) && Y < 26; ++Y, J <<= 1) ;
        if (Y > 0)
          for (u.iushrn(Y); Y-- > 0; )
            (p.isOdd() || f.isOdd()) && (p.iadd(d), f.isub(w)), p.iushrn(1), f.iushrn(1);
        for (var K = 0, j = 1; !(l.words[0] & j) && K < 26; ++K, j <<= 1) ;
        if (K > 0)
          for (l.iushrn(K); K-- > 0; )
            (y.isOdd() || E.isOdd()) && (y.iadd(d), E.isub(w)), y.iushrn(1), E.iushrn(1);
        u.cmp(l) >= 0 ? (u.isub(l), p.isub(y), f.isub(E)) : (l.isub(u), y.isub(p), E.isub(f));
      }
      return {
        a: y,
        b: E,
        gcd: l.iushln(g)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var u = this, l = a.clone();
      u.negative !== 0 ? u = u.umod(a) : u = u.clone();
      for (var p = new i(1), f = new i(0), y = l.clone(); u.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var E = 0, g = 1; !(u.words[0] & g) && E < 26; ++E, g <<= 1) ;
        if (E > 0)
          for (u.iushrn(E); E-- > 0; )
            p.isOdd() && p.iadd(y), p.iushrn(1);
        for (var d = 0, w = 1; !(l.words[0] & w) && d < 26; ++d, w <<= 1) ;
        if (d > 0)
          for (l.iushrn(d); d-- > 0; )
            f.isOdd() && f.iadd(y), f.iushrn(1);
        u.cmp(l) >= 0 ? (u.isub(l), p.isub(f)) : (l.isub(u), f.isub(p));
      }
      var Y;
      return u.cmpn(1) === 0 ? Y = p : Y = f, Y.cmpn(0) < 0 && Y.iadd(a), Y;
    }, i.prototype.gcd = function(a) {
      if (this.isZero()) return a.abs();
      if (a.isZero()) return this.abs();
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
        var E = this.words[y] | 0;
        E += f, f = E >>> 26, E &= 67108863, this.words[y] = E;
      }
      return f !== 0 && (this.words[y] = f, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(a) {
      var u = a < 0;
      if (this.negative !== 0 && !u) return -1;
      if (this.negative === 0 && u) return 1;
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
      if (this.negative !== 0 && a.negative === 0) return -1;
      if (this.negative === 0 && a.negative !== 0) return 1;
      var u = this.ucmp(a);
      return this.negative !== 0 ? -u | 0 : u;
    }, i.prototype.ucmp = function(a) {
      if (this.length > a.length) return 1;
      if (this.length < a.length) return -1;
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
      return new Z(a);
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
        var E = a.words[f] | 0;
        a.words[f - 10] = (E & l) << 4 | y >>> 22, y = E;
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
    function V() {
      T.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(V, T), V.prototype.imulK = function(a) {
      for (var u = 0, l = 0; l < a.length; l++) {
        var p = (a.words[l] | 0) * 19 + u, f = p & 67108863;
        p >>>= 26, a.words[l] = f, u = p;
      }
      return u !== 0 && (a.words[a.length++] = u), a;
    }, i._prime = function(a) {
      if (O[a]) return O[a];
      var u;
      if (a === "k256")
        u = new k();
      else if (a === "p224")
        u = new U();
      else if (a === "p192")
        u = new q();
      else if (a === "p25519")
        u = new V();
      else
        throw new Error("Unknown prime " + a);
      return O[a] = u, u;
    };
    function Z(b) {
      if (typeof b == "string") {
        var a = i._prime(b);
        this.m = a.p, this.prime = a;
      } else
        r(b.gtn(1), "modulus must be greater than 1"), this.m = b, this.prime = null;
    }
    Z.prototype._verify1 = function(a) {
      r(a.negative === 0, "red works only with positives"), r(a.red, "red works only with red numbers");
    }, Z.prototype._verify2 = function(a, u) {
      r((a.negative | u.negative) === 0, "red works only with positives"), r(
        a.red && a.red === u.red,
        "red works only with red numbers"
      );
    }, Z.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (I(a, a.umod(this.m)._forceRed(this)), a);
    }, Z.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, Z.prototype.add = function(a, u) {
      this._verify2(a, u);
      var l = a.add(u);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, Z.prototype.iadd = function(a, u) {
      this._verify2(a, u);
      var l = a.iadd(u);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, Z.prototype.sub = function(a, u) {
      this._verify2(a, u);
      var l = a.sub(u);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, Z.prototype.isub = function(a, u) {
      this._verify2(a, u);
      var l = a.isub(u);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, Z.prototype.shl = function(a, u) {
      return this._verify1(a), this.imod(a.ushln(u));
    }, Z.prototype.imul = function(a, u) {
      return this._verify2(a, u), this.imod(a.imul(u));
    }, Z.prototype.mul = function(a, u) {
      return this._verify2(a, u), this.imod(a.mul(u));
    }, Z.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, Z.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, Z.prototype.sqrt = function(a) {
      if (a.isZero()) return a.clone();
      var u = this.m.andln(3);
      if (r(u % 2 === 1), u === 3) {
        var l = this.m.add(new i(1)).iushrn(2);
        return this.pow(a, l);
      }
      for (var p = this.m.subn(1), f = 0; !p.isZero() && p.andln(1) === 0; )
        f++, p.iushrn(1);
      r(!p.isZero());
      var y = new i(1).toRed(this), E = y.redNeg(), g = this.m.subn(1).iushrn(1), d = this.m.bitLength();
      for (d = new i(2 * d * d).toRed(this); this.pow(d, g).cmp(E) !== 0; )
        d.redIAdd(E);
      for (var w = this.pow(d, p), Y = this.pow(a, p.addn(1).iushrn(1)), J = this.pow(a, p), K = f; J.cmp(y) !== 0; ) {
        for (var j = J, re = 0; j.cmp(y) !== 0; re++)
          j = j.redSqr();
        r(re < K);
        var se = this.pow(w, new i(1).iushln(K - re - 1));
        Y = Y.redMul(se), w = se.redSqr(), J = J.redMul(w), K = re;
      }
      return Y;
    }, Z.prototype.invm = function(a) {
      var u = a._invmp(this.m);
      return u.negative !== 0 ? (u.negative = 0, this.imod(u).redNeg()) : this.imod(u);
    }, Z.prototype.pow = function(a, u) {
      if (u.isZero()) return new i(1).toRed(this);
      if (u.cmpn(1) === 0) return a.clone();
      var l = 4, p = new Array(1 << l);
      p[0] = new i(1).toRed(this), p[1] = a;
      for (var f = 2; f < p.length; f++)
        p[f] = this.mul(p[f - 1], a);
      var y = p[0], E = 0, g = 0, d = u.bitLength() % 26;
      for (d === 0 && (d = 26), f = u.length - 1; f >= 0; f--) {
        for (var w = u.words[f], Y = d - 1; Y >= 0; Y--) {
          var J = w >> Y & 1;
          if (y !== p[0] && (y = this.sqr(y)), J === 0 && E === 0) {
            g = 0;
            continue;
          }
          E <<= 1, E |= J, g++, !(g !== l && (f !== 0 || Y !== 0)) && (y = this.mul(y, p[E]), g = 0, E = 0);
        }
        d = 26;
      }
      return y;
    }, Z.prototype.convertTo = function(a) {
      var u = a.umod(this.m);
      return u === a ? u.clone() : u;
    }, Z.prototype.convertFrom = function(a) {
      var u = a.clone();
      return u.red = null, u;
    }, i.mont = function(a) {
      return new ee(a);
    };
    function ee(b) {
      Z.call(this, b), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(ee, Z), ee.prototype.convertTo = function(a) {
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
      if (a.isZero() || u.isZero()) return new i(0)._forceRed(this);
      var l = a.mul(u), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), y = f;
      return f.cmp(this.m) >= 0 ? y = f.isub(this.m) : f.cmpn(0) < 0 && (y = f.iadd(this.m)), y._forceRed(this);
    }, ee.prototype.invm = function(a) {
      var u = this.imod(a._invmp(this.m).mul(this.r2));
      return u._forceRed(this);
    };
  })(e, Ee);
})(Ji);
var _d = Ji.exports;
const zr = /* @__PURE__ */ bd(_d);
var Qc = 9, Nc = 3, Ii = 9;
function vd(e, t) {
  const { precision: n = Qc, minPrecision: r = Nc } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let A = i.slice(0, n);
  if (r < n) {
    const I = A.match(/.*[1-9]{1}/), m = (I == null ? void 0 : I[0].length) || 0, x = Math.max(r, m);
    A = A.slice(0, x);
  }
  const h = A ? `.${A}` : "";
  return `${c}${h}`;
}
var Me = class extends zr {
  constructor(t, n, r) {
    let s = t, i = n;
    Me.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
    super(s ?? 0, i, r);
    D(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      throw new v(S.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new v(
        S.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new v(S.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: n = Ii,
      precision: r = Qc,
      minPrecision: s = Nc
    } = t || {}, i = this.formatUnits(n), o = vd(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), A = c.match(/[1-9]/);
      if (A && A.index && A.index + 1 > r) {
        const [h = "0"] = o.split(".");
        return `${h}.${c.slice(0, A.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = Ii) {
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
    const r = new zr(this.toArray()).mulTo(t, n);
    return new Me(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new zr(this.toArray()).egcd(t);
    return {
      a: new Me(n.toArray()),
      b: new Me(r.toArray()),
      gcd: new Me(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new zr(this.toArray()).divmod(new Me(t), n, r);
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
B.parseUnits = (e, t = Ii) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new v(
      S.CONVERTING_FAILED,
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
function qi(e, t) {
  return B(e).toHex(t);
}
function Wt(e, t) {
  return B(e).toBytes(t);
}
function py(e, t) {
  return B(e).formatUnits(t);
}
function my(e, t) {
  return B(e).format(t);
}
function wy(...e) {
  return e.reduce((t, n) => B(n).gt(t) ? B(n) : t, B(0));
}
function yy(...e) {
  return B(Math.ceil(e.reduce((t, n) => B(t).mul(n), B(1)).toNumber()));
}
var Rd = Object.defineProperty, Sd = (e, t, n) => t in e ? Rd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Qd = (e, t, n) => (Sd(e, typeof t != "symbol" ? t + "" : t, n), n), Iy = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, Dc = (e, t) => {
  const n = [];
  for (let c = 0; c < e.length; c += t) {
    const A = new Uint8Array(t);
    A.set(e.slice(c, c + t)), n.push(A);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, X = (e, t, n = !0) => {
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
  throw new v(S.INVALID_DATA, s);
}, Bs = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, ie = (e) => {
  const t = e.map((n) => X(n));
  return Bs(t);
}, na = "0123456789abcdef";
function H(e) {
  const t = X(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += na[(s & 240) >> 4] + na[s & 15];
  }
  return n;
}
var Ey = (e) => {
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
    throw new v(S.PARSE_FAILED, r);
  }
  return n;
}, Nd = 37, Tc = BigInt(2 ** 62) + BigInt(Nd), Dd = (e) => Math.floor(e / 1e3), Fc = (e) => e * 1e3, Td = (e) => Number(BigInt(e) - Tc), Fd = (e) => String(BigInt(e) + Tc), Md = (e) => Fc(Td(e)), Kr = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Kr(Md(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Kr(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Kr(Fc(e));
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
    return Fd(this.toUnixSeconds());
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
    return Dd(this.getTime());
  }
}, ji = Kr;
Qd(ji, "TAI64_NULL", "");
function Od(e) {
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
            HeavyOperation: {
              base: 2,
              gasPerUnit: 0
            }
          },
          cfe: {
            HeavyOperation: {
              base: 2,
              gasPerUnit: 0
            }
          },
          cfeiDependentCost: {
            HeavyOperation: {
              base: 2,
              gasPerUnit: 0
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
}, kd = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, Pd = {
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
}, by = {
  chainConfig: Ld,
  metadata: kd,
  stateConfig: Pd
}, Cy = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function Dn(e) {
  return e !== void 0;
}
var Mc = B(0), Ei = B(58), As = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", Hr = null;
function Ud(e) {
  if (Hr == null) {
    Hr = {};
    for (let n = 0; n < As.length; n++)
      Hr[As[n]] = B(n);
  }
  const t = Hr[e];
  if (t == null)
    throw new v(S.INVALID_DATA, `invalid base58 value ${e}`);
  return B(t);
}
function Oc(e) {
  const t = X(e);
  let n = B(t), r = "";
  for (; n.gt(Mc); )
    r = As[Number(n.mod(Ei))] + r, n = n.div(Ei);
  for (let s = 0; s < t.length && !t[s]; s++)
    r = As[0] + r;
  return r;
}
function Gd(e) {
  let t = Mc;
  for (let n = 0; n < e.length; n++)
    t = t.mul(Ei), t = t.add(Ud(e[n].toString()));
  return t;
}
function $i(e, t, n) {
  const r = X(e);
  if (n != null && n > r.length)
    throw new v(S.INVALID_DATA, "cannot slice beyond data bounds");
  return H(r.slice(t ?? 0, n ?? r.length));
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
          S.INVALID_INPUT_PARAMETERS,
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
function zd(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function Hd(e) {
  const t = X(e, "bytes"), n = [];
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
function Ki(e) {
  return zd(Hd(e));
}
function xt(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function Xd(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function eo(e, ...t) {
  if (!Xd(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Lc(e) {
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
function kc(e, t) {
  eo(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const es = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function Vd(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const ts = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Ot = (e, t) => e << 32 - t | e >>> t, Yd = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Yd)
  throw new Error("Non little-endian hardware is not supported");
function Zd(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Wn(e) {
  if (typeof e == "string" && (e = Zd(e)), !Vd(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
let to = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Wd = {}.toString;
function Pc(e, t) {
  if (t !== void 0 && Wd.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function xs(e) {
  const t = (r) => e().update(Wn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Jd(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), A = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + A, o, r), e.setUint32(t + h, c, r);
}
class no extends to {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ts(this.buffer);
  }
  update(t) {
    Zn(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Wn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const A = ts(t);
        for (; s <= i - o; o += s)
          this.process(A, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Zn(this), kc(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let m = o; m < s; m++)
      n[m] = 0;
    Jd(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = ts(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = A / 4, I = this.get();
    if (h > I.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let m = 0; m < h; m++)
      c.setUint32(4 * m, I[m], i);
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
const qd = (e, t, n) => e & t ^ ~e & n, jd = (e, t, n) => e & t ^ e & n ^ t & n, $d = /* @__PURE__ */ new Uint32Array([
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
let Kd = class extends no {
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
    for (let m = 0; m < 16; m++, n += 4)
      Kt[m] = t.getUint32(n, !1);
    for (let m = 16; m < 64; m++) {
      const x = Kt[m - 15], _ = Kt[m - 2], R = Ot(x, 7) ^ Ot(x, 18) ^ x >>> 3, C = Ot(_, 17) ^ Ot(_, 19) ^ _ >>> 10;
      Kt[m] = C + Kt[m - 7] + R + Kt[m - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: A, G: h, H: I } = this;
    for (let m = 0; m < 64; m++) {
      const x = Ot(c, 6) ^ Ot(c, 11) ^ Ot(c, 25), _ = I + x + qd(c, A, h) + $d[m] + Kt[m] | 0, C = (Ot(r, 2) ^ Ot(r, 13) ^ Ot(r, 22)) + jd(r, s, i) | 0;
      I = h, h = A, A = c, c = o + _ | 0, o = i, i = s, s = r, r = _ + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, A = A + this.F | 0, h = h + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, A, h, I);
  }
  roundClean() {
    Kt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const sr = /* @__PURE__ */ xs(() => new Kd());
let Uc = class extends to {
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
    return Zn(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Zn(this), eo(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const ro = (e, t, n) => new Uc(e, t).update(n).digest();
ro.create = (e, t) => new Uc(e, t);
function eA(e, t, n, r) {
  Lc(e);
  const s = Pc({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (xt(i), xt(o), xt(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const A = Wn(t), h = Wn(n), I = new Uint8Array(o), m = ro.create(e, A), x = m._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: c, DK: I, PRF: m, PRFSalt: x };
}
function tA(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function so(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: A } = eA(e, t, n, r);
  let h;
  const I = new Uint8Array(4), m = ts(I), x = new Uint8Array(c.outputLen);
  for (let _ = 1, R = 0; R < i; _++, R += c.outputLen) {
    const C = o.subarray(R, R + c.outputLen);
    m.setInt32(0, _, !1), (h = A._cloneInto(h)).update(I).digestInto(x), C.set(x.subarray(0, C.length));
    for (let F = 1; F < s; F++) {
      c._cloneInto(h).update(x).digestInto(x);
      for (let M = 0; M < C.length; M++)
        C[M] ^= x[M];
    }
  }
  return tA(c, A, o, h, x);
}
const me = (e, t) => e << t | e >>> 32 - t;
function ra(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], c = e[t++] ^ n[r++], A = e[t++] ^ n[r++], h = e[t++] ^ n[r++], I = e[t++] ^ n[r++], m = e[t++] ^ n[r++], x = e[t++] ^ n[r++], _ = e[t++] ^ n[r++], R = e[t++] ^ n[r++], C = e[t++] ^ n[r++], F = e[t++] ^ n[r++], M = e[t++] ^ n[r++], G = e[t++] ^ n[r++], L = e[t++] ^ n[r++], W = e[t++] ^ n[r++], O = e[t++] ^ n[r++], T = o, k = c, U = A, q = h, V = I, Z = m, ee = x, b = _, a = R, u = C, l = F, p = M, f = G, y = L, E = W, g = O;
  for (let d = 0; d < 8; d += 2)
    V ^= me(T + f | 0, 7), a ^= me(V + T | 0, 9), f ^= me(a + V | 0, 13), T ^= me(f + a | 0, 18), u ^= me(Z + k | 0, 7), y ^= me(u + Z | 0, 9), k ^= me(y + u | 0, 13), Z ^= me(k + y | 0, 18), E ^= me(l + ee | 0, 7), U ^= me(E + l | 0, 9), ee ^= me(U + E | 0, 13), l ^= me(ee + U | 0, 18), q ^= me(g + p | 0, 7), b ^= me(q + g | 0, 9), p ^= me(b + q | 0, 13), g ^= me(p + b | 0, 18), k ^= me(T + q | 0, 7), U ^= me(k + T | 0, 9), q ^= me(U + k | 0, 13), T ^= me(q + U | 0, 18), ee ^= me(Z + V | 0, 7), b ^= me(ee + Z | 0, 9), V ^= me(b + ee | 0, 13), Z ^= me(V + b | 0, 18), p ^= me(l + u | 0, 7), a ^= me(p + l | 0, 9), u ^= me(a + p | 0, 13), l ^= me(u + a | 0, 18), f ^= me(g + E | 0, 7), y ^= me(f + g | 0, 9), E ^= me(y + f | 0, 13), g ^= me(E + y | 0, 18);
  s[i++] = o + T | 0, s[i++] = c + k | 0, s[i++] = A + U | 0, s[i++] = h + q | 0, s[i++] = I + V | 0, s[i++] = m + Z | 0, s[i++] = x + ee | 0, s[i++] = _ + b | 0, s[i++] = R + a | 0, s[i++] = C + u | 0, s[i++] = F + l | 0, s[i++] = M + p | 0, s[i++] = G + f | 0, s[i++] = L + y | 0, s[i++] = W + E | 0, s[i++] = O + g | 0;
}
function ii(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = e[t + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, t += 16)
    ra(n, o, e, t, n, i), c > 0 && (o += 16), ra(n, i, e, t += 16, n, o);
}
function nA(e, t, n) {
  const r = Pc({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: A, maxmem: h, onProgress: I } = r;
  if (xt(s), xt(i), xt(o), xt(c), xt(A), xt(h), I !== void 0 && typeof I != "function")
    throw new Error("progressCb should be function");
  const m = 128 * i, x = m / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (m / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / m)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (c < 0 || c > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const _ = m * (s + o);
  if (_ > h)
    throw new Error(`Scrypt: parameters too large, ${_} (128 * r * (N + p)) > ${h} (maxmem)`);
  const R = so(sr, e, t, { c: 1, dkLen: m * o }), C = es(R), F = es(new Uint8Array(m * s)), M = es(new Uint8Array(m));
  let G = () => {
  };
  if (I) {
    const L = 2 * s * o, W = Math.max(Math.floor(L / 1e4), 1);
    let O = 0;
    G = () => {
      O++, I && (!(O % W) || O === L) && I(O / L);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: x, V: F, B32: C, B: R, tmp: M, blockMixCb: G, asyncTick: A };
}
function rA(e, t, n, r, s) {
  const i = so(sr, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function sA(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: A, B32: h, B: I, tmp: m, blockMixCb: x } = nA(e, t, n);
  for (let _ = 0; _ < i; _++) {
    const R = c * _;
    for (let C = 0; C < c; C++)
      A[C] = h[R + C];
    for (let C = 0, F = 0; C < r - 1; C++)
      ii(A, F, A, F += c, s), x();
    ii(A, (r - 1) * c, h, R, s), x();
    for (let C = 0; C < r; C++) {
      const F = h[R + c - 16] % r;
      for (let M = 0; M < c; M++)
        m[M] = h[R + M] ^ A[F * c + M];
      ii(m, 0, h, R, s), x();
    }
  }
  return rA(e, o, I, A, m);
}
const Xr = /* @__PURE__ */ BigInt(2 ** 32 - 1), bi = /* @__PURE__ */ BigInt(32);
function Gc(e, t = !1) {
  return t ? { h: Number(e & Xr), l: Number(e >> bi & Xr) } : { h: Number(e >> bi & Xr) | 0, l: Number(e & Xr) | 0 };
}
function zc(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = Gc(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const iA = (e, t) => BigInt(e >>> 0) << bi | BigInt(t >>> 0), oA = (e, t, n) => e >>> n, aA = (e, t, n) => e << 32 - n | t >>> n, cA = (e, t, n) => e >>> n | t << 32 - n, uA = (e, t, n) => e << 32 - n | t >>> n, dA = (e, t, n) => e << 64 - n | t >>> n - 32, AA = (e, t, n) => e >>> n - 32 | t << 64 - n, lA = (e, t) => t, fA = (e, t) => e, Hc = (e, t, n) => e << n | t >>> 32 - n, Xc = (e, t, n) => t << n | e >>> 32 - n, Vc = (e, t, n) => t << n - 32 | e >>> 64 - n, Yc = (e, t, n) => e << n - 32 | t >>> 64 - n;
function hA(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const gA = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), pA = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, mA = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), wA = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, yA = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), IA = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, le = {
  fromBig: Gc,
  split: zc,
  toBig: iA,
  shrSH: oA,
  shrSL: aA,
  rotrSH: cA,
  rotrSL: uA,
  rotrBH: dA,
  rotrBL: AA,
  rotr32H: lA,
  rotr32L: fA,
  rotlSH: Hc,
  rotlSL: Xc,
  rotlBH: Vc,
  rotlBL: Yc,
  add: hA,
  add3L: gA,
  add3H: pA,
  add4L: mA,
  add4H: wA,
  add5H: IA,
  add5L: yA
}, [Zc, Wc, Jc] = [[], [], []], EA = /* @__PURE__ */ BigInt(0), dr = /* @__PURE__ */ BigInt(1), bA = /* @__PURE__ */ BigInt(2), CA = /* @__PURE__ */ BigInt(7), BA = /* @__PURE__ */ BigInt(256), xA = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = dr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Zc.push(2 * (5 * r + n)), Wc.push((e + 1) * (e + 2) / 2 % 64);
  let s = EA;
  for (let i = 0; i < 7; i++)
    t = (t << dr ^ (t >> CA) * xA) % BA, t & bA && (s ^= dr << (dr << /* @__PURE__ */ BigInt(i)) - dr);
  Jc.push(s);
}
const [_A, vA] = /* @__PURE__ */ zc(Jc, !0), sa = (e, t, n) => n > 32 ? Vc(e, t, n) : Hc(e, t, n), ia = (e, t, n) => n > 32 ? Yc(e, t, n) : Xc(e, t, n);
function RA(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, A = (o + 2) % 10, h = n[A], I = n[A + 1], m = sa(h, I, 1) ^ n[c], x = ia(h, I, 1) ^ n[c + 1];
      for (let _ = 0; _ < 50; _ += 10)
        e[o + _] ^= m, e[o + _ + 1] ^= x;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = Wc[o], A = sa(s, i, c), h = ia(s, i, c), I = Zc[o];
      s = e[I], i = e[I + 1], e[I] = A, e[I + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= _A[r], e[1] ^= vA[r];
  }
  n.fill(0);
}
class io extends to {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, xt(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = es(this.state);
  }
  keccak() {
    RA(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Zn(this);
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
    Zn(this, !1), eo(t), this.finish();
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
    if (kc(t, this), this.finished)
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
    return t || (t = new io(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const SA = (e, t, n) => xs(() => new io(t, e, n)), QA = /* @__PURE__ */ SA(1, 136, 256 / 8), NA = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), qc = /* @__PURE__ */ Uint8Array.from({ length: 16 }, (e, t) => t), DA = /* @__PURE__ */ qc.map((e) => (9 * e + 5) % 16);
let oo = [qc], ao = [DA];
for (let e = 0; e < 4; e++)
  for (let t of [oo, ao])
    t.push(t[e].map((n) => NA[n]));
const jc = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), TA = /* @__PURE__ */ oo.map((e, t) => e.map((n) => jc[t][n])), FA = /* @__PURE__ */ ao.map((e, t) => e.map((n) => jc[t][n])), MA = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), OA = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]), Vr = (e, t) => e << t | e >>> 32 - t;
function oa(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const Yr = /* @__PURE__ */ new Uint32Array(16);
class LA extends no {
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
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, A = c, h = this.h3 | 0, I = h, m = this.h4 | 0, x = m;
    for (let _ = 0; _ < 5; _++) {
      const R = 4 - _, C = MA[_], F = OA[_], M = oo[_], G = ao[_], L = TA[_], W = FA[_];
      for (let O = 0; O < 16; O++) {
        const T = Vr(r + oa(_, i, c, h) + Yr[M[O]] + C, L[O]) + m | 0;
        r = m, m = h, h = Vr(c, 10) | 0, c = i, i = T;
      }
      for (let O = 0; O < 16; O++) {
        const T = Vr(s + oa(R, o, A, I) + Yr[G[O]] + F, W[O]) + x | 0;
        s = x, x = I, I = Vr(A, 10) | 0, A = o, o = T;
      }
    }
    this.set(this.h1 + c + I | 0, this.h2 + h + x | 0, this.h3 + m + s | 0, this.h4 + r + o | 0, this.h0 + i + A | 0);
  }
  roundClean() {
    Yr.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const kA = /* @__PURE__ */ xs(() => new LA()), [PA, UA] = le.split([
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
class GA extends no {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: A, Eh: h, El: I, Fh: m, Fl: x, Gh: _, Gl: R, Hh: C, Hl: F } = this;
    return [t, n, r, s, i, o, c, A, h, I, m, x, _, R, C, F];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, A, h, I, m, x, _, R, C, F) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = A | 0, this.Eh = h | 0, this.El = I | 0, this.Fh = m | 0, this.Fl = x | 0, this.Gh = _ | 0, this.Gl = R | 0, this.Hh = C | 0, this.Hl = F | 0;
  }
  process(t, n) {
    for (let L = 0; L < 16; L++, n += 4)
      en[L] = t.getUint32(n), tn[L] = t.getUint32(n += 4);
    for (let L = 16; L < 80; L++) {
      const W = en[L - 15] | 0, O = tn[L - 15] | 0, T = le.rotrSH(W, O, 1) ^ le.rotrSH(W, O, 8) ^ le.shrSH(W, O, 7), k = le.rotrSL(W, O, 1) ^ le.rotrSL(W, O, 8) ^ le.shrSL(W, O, 7), U = en[L - 2] | 0, q = tn[L - 2] | 0, V = le.rotrSH(U, q, 19) ^ le.rotrBH(U, q, 61) ^ le.shrSH(U, q, 6), Z = le.rotrSL(U, q, 19) ^ le.rotrBL(U, q, 61) ^ le.shrSL(U, q, 6), ee = le.add4L(k, Z, tn[L - 7], tn[L - 16]), b = le.add4H(ee, T, V, en[L - 7], en[L - 16]);
      en[L] = b | 0, tn[L] = ee | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: A, Dh: h, Dl: I, Eh: m, El: x, Fh: _, Fl: R, Gh: C, Gl: F, Hh: M, Hl: G } = this;
    for (let L = 0; L < 80; L++) {
      const W = le.rotrSH(m, x, 14) ^ le.rotrSH(m, x, 18) ^ le.rotrBH(m, x, 41), O = le.rotrSL(m, x, 14) ^ le.rotrSL(m, x, 18) ^ le.rotrBL(m, x, 41), T = m & _ ^ ~m & C, k = x & R ^ ~x & F, U = le.add5L(G, O, k, UA[L], tn[L]), q = le.add5H(U, M, W, T, PA[L], en[L]), V = U | 0, Z = le.rotrSH(r, s, 28) ^ le.rotrBH(r, s, 34) ^ le.rotrBH(r, s, 39), ee = le.rotrSL(r, s, 28) ^ le.rotrBL(r, s, 34) ^ le.rotrBL(r, s, 39), b = r & i ^ r & c ^ i & c, a = s & o ^ s & A ^ o & A;
      M = C | 0, G = F | 0, C = _ | 0, F = R | 0, _ = m | 0, R = x | 0, { h: m, l: x } = le.add(h | 0, I | 0, q | 0, V | 0), h = c | 0, I = A | 0, c = i | 0, A = o | 0, i = r | 0, o = s | 0;
      const u = le.add3L(V, ee, a);
      r = le.add3H(u, q, Z, b), s = u | 0;
    }
    ({ h: r, l: s } = le.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = le.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: A } = le.add(this.Ch | 0, this.Cl | 0, c | 0, A | 0), { h, l: I } = le.add(this.Dh | 0, this.Dl | 0, h | 0, I | 0), { h: m, l: x } = le.add(this.Eh | 0, this.El | 0, m | 0, x | 0), { h: _, l: R } = le.add(this.Fh | 0, this.Fl | 0, _ | 0, R | 0), { h: C, l: F } = le.add(this.Gh | 0, this.Gl | 0, C | 0, F | 0), { h: M, l: G } = le.add(this.Hh | 0, this.Hl | 0, M | 0, G | 0), this.set(r, s, i, o, c, A, h, I, m, x, _, R, C, F, M, G);
  }
  roundClean() {
    en.fill(0), tn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const $c = /* @__PURE__ */ xs(() => new GA());
var zA = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return sA(t, n, { N: r, r: i, p: s, dkLen: o });
}, HA = (e) => QA(e), Kc = !1, e0 = (e) => kA(e), t0 = e0;
function Nr(e) {
  const t = X(e, "data");
  return t0(t);
}
Nr._ = e0;
Nr.lock = () => {
  Kc = !0;
};
Nr.register = (e) => {
  if (Kc)
    throw new v(S.HASHER_LOCKED, "ripemd160 is locked");
  t0 = e;
};
Object.freeze(Nr);
var Gn = (e, t = "base64") => {
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
}, n0 = (e, t, n, r, s) => {
  const i = { sha256: sr, sha512: $c }[s];
  return H(so(i, e, t, { c: n, dkLen: r }));
}, { crypto: _s, btoa: r0 } = globalThis;
if (!_s)
  throw new v(
    S.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!r0)
  throw new v(
    S.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Ci = (e) => _s.getRandomValues(new Uint8Array(e)), ns = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return r0(n);
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
}, s0 = "AES-CTR", co = (e, t) => {
  const n = Gn(String(e).normalize("NFKC"), "utf-8"), r = n0(n, t, 1e5, 32, "sha256");
  return X(r);
}, XA = async (e, t) => {
  const n = Ci(16), r = Ci(32), s = co(e, r), i = JSON.stringify(t), o = Gn(i, "utf-8"), c = {
    name: s0,
    counter: n,
    length: 64
  }, A = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), h = await crypto.subtle.encrypt(c, A, o);
  return {
    data: ns(new Uint8Array(h)),
    iv: ns(n),
    salt: ns(r)
  };
}, VA = async (e, t) => {
  const n = Gn(t.iv), r = Gn(t.salt), s = co(e, r), i = Gn(t.data), o = {
    name: s0,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), A = await crypto.subtle.decrypt(o, c, i), h = new TextDecoder().decode(A);
  try {
    return JSON.parse(h);
  } catch {
    throw new v(S.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, YA = async (e, t, n) => {
  const r = _s.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, c = await r.importKey(
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
}, ZA = async (e, t, n) => {
  const r = _s.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, c = await r.importKey(
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
  const r = e === "sha256" ? sr : $c, s = ro.create(r, t).update(n).digest();
  return H(s);
}, JA = {
  bufferFromString: Gn,
  stringFromBuffer: ns,
  decrypt: VA,
  encrypt: XA,
  keyFromPassword: co,
  randomBytes: Ci,
  scrypt: zA,
  keccak256: HA,
  decryptJsonWalletData: ZA,
  encryptJsonWalletData: YA,
  computeHmac: WA,
  pbkdf2: n0,
  ripemd160: Nr
}, qA = JA, {
  bufferFromString: fn,
  decrypt: jA,
  encrypt: $A,
  keyFromPassword: vy,
  randomBytes: Tt,
  stringFromBuffer: hr,
  scrypt: i0,
  keccak256: o0,
  decryptJsonWalletData: KA,
  encryptJsonWalletData: el,
  pbkdf2: tl,
  computeHmac: a0,
  ripemd160: nl
} = qA;
function mt(e) {
  return H(sr(X(e)));
}
function qt(e) {
  return mt(e);
}
function rl(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function sl(e) {
  return qt(fn(e, "utf-8"));
}
var il = Object.defineProperty, ol = (e, t, n) => t in e ? il(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, uo = (e, t, n) => (ol(e, typeof t != "symbol" ? t + "" : t, n), n), ce = class {
  constructor(e, t, n) {
    D(this, "name");
    D(this, "type");
    D(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, al = "u8", cl = "u16", ul = "u32", dl = "u64", Al = "u256", ll = "raw untyped ptr", fl = "raw untyped slice", hl = "bool", gl = "b256", pl = "struct B512", Jn = "enum Option", ml = "struct Vec", wl = "struct Bytes", yl = "struct String", Il = "str", c0 = /str\[(?<length>[0-9]+)\]/, Bi = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, u0 = /^struct (?<name>\w+)$/, d0 = /^enum (?<name>\w+)$/, El = /^\((?<items>.*)\)$/, bl = /^generic (?<name>\w+)$/, ls = "1", ge = 8, pn = 32, fs = pn + 2, hs = pn, Cl = pn, Bl = pn, xl = ge * 4, _l = ge * 2, A0 = 2 ** 32 - 1, l0 = ({ maxInputs: e }) => pn + // Tx ID
hs + // Base asset ID
// Asset ID/Balance coin input pairs
e * (hs + ge) + ge, f0 = ge + // Identifier
ge + // Gas limit
ge + // Script size
ge + // Script data size
ge + // Policies
ge + // Inputs size
ge + // Outputs size
ge + // Witnesses size
pn, Ry = ge + // Identifier
xl + // Utxo Length
ge + // Output Index
Bl + // Owner
ge + // Amount
hs + // Asset id
_l + // TxPointer
ge + // Witnesses index
ge + // Predicate size
ge + // Predicate data size
ge, aa = (e) => e instanceof Uint8Array, ir = (e) => {
  const t = Array.isArray(e) ? e : Object.values(e);
  for (const n of t)
    if (n.type === Jn || "coder" in n && n.coder.type === Jn || "coders" in n && ir(n.coders))
      return !0;
  return !1;
}, vr, Ec, we = (Ec = class extends ce {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    D(this, "coder");
    D(this, "length");
    Rt(this, vr);
    this.coder = t, this.length = n, Mt(this, vr, ir([t]));
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(S.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new v(S.ENCODE_ERROR, "Types/values length mismatch.");
    return ie(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (!Fe(this, vr) && t.length < this.encodedLength || t.length > A0)
      throw new v(S.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, vr = new WeakMap(), Ec), z = class extends ce {
  constructor() {
    super("b256", "b256", ge * 4);
  }
  encode(e) {
    let t;
    try {
      t = X(e);
    } catch {
      throw new v(S.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(S.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (B(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid b256 byte data size.");
    return [qi(n, 32), t + 32];
  }
}, vl = class extends ce {
  constructor() {
    super("b512", "struct B512", ge * 8);
  }
  encode(e) {
    let t;
    try {
      t = X(e);
    } catch {
      throw new v(S.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(S.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (B(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid b512 byte data size.");
    return [qi(n, this.encodedLength), t + this.encodedLength];
  }
}, Rl = {
  u64: ge,
  u256: ge * 4
}, N = class extends ce {
  constructor(e) {
    super("bigNumber", e, Rl[e]);
  }
  encode(e) {
    let t;
    try {
      t = Wt(e, this.encodedLength);
    } catch {
      throw new v(S.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new v(S.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [B(n), t + this.encodedLength];
  }
}, Sl = class extends ce {
  constructor(t = {
    padToWordSize: !1
  }) {
    const n = t.padToWordSize ? ge : 1;
    super("boolean", "boolean", n);
    D(this, "options");
    this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new v(S.ENCODE_ERROR, "Invalid boolean value.");
    return Wt(t ? 1 : 0, this.encodedLength);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid boolean data size.");
    const r = B(t.slice(n, n + this.encodedLength));
    if (r.isZero())
      return [!1, n + this.encodedLength];
    if (!r.eq(B(1)))
      throw new v(S.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.encodedLength];
  }
}, h0 = class extends ce {
  constructor() {
    super("struct", "struct Bytes", ge);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), n = new N("u64").encode(t.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < ge)
      throw new v(S.DECODE_ERROR, "Invalid byte data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new N("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(S.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
uo(h0, "memorySize", 1);
var Sn, Rr, Xn, En, p0, m0, w0, bc, g0 = (bc = class extends ce {
  constructor(t, n) {
    const r = new N("u64"), s = Object.values(n).reduce(
      (i, o) => Math.min(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    Rt(this, En);
    D(this, "name");
    D(this, "coders");
    Rt(this, Sn);
    Rt(this, Rr);
    Rt(this, Xn);
    this.name = t, this.coders = n, Mt(this, Sn, r), Mt(this, Rr, s), Mt(this, Xn, !(this.type === Jn || ir(n)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return Gr(this, En, m0).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(S.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(S.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n);
    if (i === -1) {
      const c = Object.keys(this.coders).map((A) => `'${A}'`).join(", ");
      throw new v(
        S.INVALID_DECODE_VALUE,
        `Invalid case '${n}'. Valid cases: ${c}.`
      );
    }
    const o = s.encode(t[n]);
    return new Uint8Array([...Fe(this, Sn).encode(i), ...o]);
  }
  decode(t, n) {
    if (Fe(this, Xn) && t.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid enum data size.");
    const r = new N("u64").decode(t, n)[0], s = cn(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new v(
        S.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], c = n + Fe(this, Sn).encodedLength;
    if (Fe(this, Xn) && t.length < c + o.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid enum data size.");
    const [A, h] = o.decode(t, c);
    return Gr(this, En, p0).call(this, this.coders[i]) ? Gr(this, En, w0).call(this, i, h) : [{ [i]: A }, h];
  }
}, Sn = new WeakMap(), Rr = new WeakMap(), Xn = new WeakMap(), En = new WeakSet(), // We parse a native enum as an empty tuple, so we are looking for a tuple with no child coders.
// The '()' is enough but the child coders is a stricter check.
p0 = function(t) {
  return this.type !== Jn && t.type === "()" ? t.coders.length === 0 : !1;
}, m0 = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Fe(this, Rr) - n.encodedLength);
  return ie([Fe(this, Sn).encode(s), i, r]);
}, w0 = function(t, n) {
  return [t, n];
}, bc), Ql = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new v(S.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, $ = class extends ce {
  constructor(t, n = {
    padToWordSize: !1
  }) {
    const r = n.padToWordSize ? ge : Ql(t);
    super("number", t, r);
    D(this, "baseType");
    D(this, "options");
    this.baseType = t, this.options = n;
  }
  encode(t) {
    let n;
    try {
      n = Wt(t);
    } catch {
      throw new v(S.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.encodedLength)
      throw new v(S.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Wt(n, this.encodedLength);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid number byte data size.");
    return [cn(r), n + this.encodedLength];
  }
}, y0 = class extends g0 {
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
}, Nl = class extends ce {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ge);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(S.ENCODE_ERROR, "Expected array value.");
    const n = new we(new $("u8"), e.length).encode(e), r = new N("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new N("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(S.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new we(new $("u8"), s), [c] = o.decode(i, 0);
    return [c, n + s];
  }
}, Ao = class extends ce {
  constructor() {
    super("struct", "struct String", ge);
  }
  encode(e) {
    const t = Yn(e), n = new N("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid std string data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new N("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(S.DECODE_ERROR, "Invalid std string byte data size.");
    return [Ki(i), n + s];
  }
};
uo(Ao, "memorySize", 1);
var I0 = class extends ce {
  constructor() {
    super("strSlice", "str", ge);
  }
  encode(e) {
    const t = Yn(e), n = new N("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid string slice data size.");
    const n = t + ge, r = e.slice(t, n), s = B(new N("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(S.DECODE_ERROR, "Invalid string slice byte data size.");
    return [Ki(i), n + s];
  }
};
uo(I0, "memorySize", 1);
var Dl = class extends ce {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new v(S.ENCODE_ERROR, "Value length mismatch during encode.");
    return Yn(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid string byte data size.");
    return [Ki(n), t + this.encodedLength];
  }
}, Sr, Cc, vs = (Cc = class extends ce {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    D(this, "name");
    D(this, "coders");
    Rt(this, Sr);
    this.name = t, this.coders = n, Mt(this, Sr, ir(n));
  }
  encode(t) {
    return Bs(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof y0) && s == null)
          throw new v(
            S.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (!Fe(this, Sr) && t.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let A;
      return [A, r] = c.decode(t, r), i[o] = A, i;
    }, {}), r];
  }
}, Sr = new WeakMap(), Cc), Qr, Bc, E0 = (Bc = class extends ce {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    D(this, "coders");
    Rt(this, Qr);
    this.coders = t, Mt(this, Qr, ir(t));
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(S.ENCODE_ERROR, "Types/values length mismatch.");
    return Bs(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (!Fe(this, Qr) && t.length < this.encodedLength)
      throw new v(S.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, Qr = new WeakMap(), Bc), Vn, xc, Tl = (xc = class extends ce {
  constructor(t) {
    super("struct", "struct Vec", ge);
    D(this, "coder");
    Rt(this, Vn);
    this.coder = t, Mt(this, Vn, ir([t]));
  }
  encode(t) {
    if (!Array.isArray(t) && !aa(t))
      throw new v(
        S.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = new N("u64");
    if (aa(t))
      return new Uint8Array([...n.encode(t.length), ...t]);
    const r = t.map((i) => this.coder.encode(i)), s = n.encode(t.length);
    return new Uint8Array([...s, ...Bs(r)]);
  }
  decode(t, n) {
    if (!Fe(this, Vn) && t.length < this.encodedLength || t.length > A0)
      throw new v(S.DECODE_ERROR, "Invalid vec data size.");
    const r = n + ge, s = t.slice(n, r), i = B(new N("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, c = t.slice(r, r + o);
    if (!Fe(this, Vn) && c.length !== o)
      throw new v(S.DECODE_ERROR, "Invalid vec byte data size.");
    let A = r;
    const h = [];
    for (let I = 0; I < i; I++) {
      const [m, x] = this.coder.decode(t, A);
      h.push(m), A = x;
    }
    return [h, A];
  }
}, Vn = new WeakMap(), xc), b0 = (e) => {
  switch (e) {
    case void 0:
    case ls:
      return ls;
    default:
      throw new v(
        S.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, Fl = (e, t) => {
  const n = e.functions.find((r) => r.name === t);
  if (!n)
    throw new v(
      S.FUNCTION_NOT_FOUND,
      `Function with name '${t}' doesn't exist in the ABI`
    );
  return n;
}, Qn = (e, t) => {
  const n = e.types.find((r) => r.typeId === t);
  if (!n)
    throw new v(
      S.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return n;
}, ca = (e, t) => t.filter((n) => Qn(e, n.type).type !== "()"), Ml = (e) => {
  var r;
  const t = e.find((s) => s.name === "buf"), n = (r = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : r[0];
  if (!t || !n)
    throw new v(
      S.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return n;
}, un = class {
  constructor(e, t) {
    D(this, "abi");
    D(this, "name");
    D(this, "type");
    D(this, "originalTypeArguments");
    D(this, "components");
    this.abi = e, this.name = t.name;
    const n = Qn(e, t.type);
    if (n.type.length > 256)
      throw new v(
        S.INVALID_COMPONENT,
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
        var I;
        const h = { ...o };
        return h[c] = structuredClone(
          (I = t.typeArguments) == null ? void 0 : I[A]
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
      const s = Qn(e, r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = Qn(e, s.type);
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
    return u0.test(this.type) ? "s" : Bi.test(this.type) ? "a" : d0.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = c0.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Bi.exec(this.type)) == null ? void 0 : i.groups;
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
var On = (e, t) => {
  var A, h, I, m, x;
  switch (e.type) {
    case al:
    case cl:
    case ul:
      return new $(e.type);
    case dl:
    case ll:
      return new N("u64");
    case Al:
      return new N("u256");
    case fl:
      return new Nl();
    case hl:
      return new Sl();
    case gl:
      return new z();
    case pl:
      return new vl();
    case wl:
      return new h0();
    case yl:
      return new Ao();
    case Il:
      return new I0();
  }
  const n = (A = c0.exec(e.type)) == null ? void 0 : A.groups;
  if (n) {
    const _ = parseInt(n.length, 10);
    return new Dl(_);
  }
  const r = e.components, s = (h = Bi.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const _ = parseInt(s.length, 10), R = r[0];
    if (!R)
      throw new v(
        S.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const C = On(R);
    return new we(C, _);
  }
  if (e.type === ml) {
    const _ = Ml(r), R = new un(e.abi, _), C = On(R);
    return new Tl(C);
  }
  const i = (I = u0.exec(e.type)) == null ? void 0 : I.groups;
  if (i) {
    const _ = ua(r, { getCoder: On });
    return new vs(i.name, _);
  }
  const o = (m = d0.exec(e.type)) == null ? void 0 : m.groups;
  if (o) {
    const _ = ua(r, { getCoder: On });
    return e.type === Jn ? new y0(o.name, _) : new g0(o.name, _);
  }
  if ((x = El.exec(e.type)) == null ? void 0 : x.groups) {
    const _ = r.map((R) => On(R));
    return new E0(_);
  }
  throw new v(
    S.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function Ol(e = ls) {
  switch (e) {
    case ls:
      return On;
    default:
      throw new v(
        S.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Ir = class {
  static getCoder(e, t, n = {
    padToWordSize: !1
  }) {
    const r = new un(e, t);
    return Ol(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, rs = class {
  constructor(e, t) {
    D(this, "signature");
    D(this, "selector");
    D(this, "selectorBytes");
    D(this, "encoding");
    D(this, "name");
    D(this, "jsonFn");
    D(this, "attributes");
    D(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = Fl(this.jsonAbi, t), this.name = t, this.signature = rs.getSignature(this.jsonAbi, this.jsonFn), this.selector = rs.getFunctionSelector(this.signature), this.selectorBytes = new Ao().encode(t), this.encoding = b0(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
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
    rs.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const t = e.slice(), n = ca(this.jsonAbi, this.jsonFn.inputs);
    Array.isArray(e) && n.length !== e.length && (t.length = this.jsonFn.inputs.length, t.fill(void 0, e.length));
    const r = n.map(
      (s) => Ir.getCoder(this.jsonAbi, s, {
        encoding: this.encoding
      })
    );
    return new E0(r).encode(t);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => Qn(n, o.type)), s = r.filter(
      (o) => o.type === Jn || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new v(S.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = X(e), n = ca(this.jsonAbi, this.jsonFn.inputs);
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new v(
        S.DECODE_ERROR,
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
        const o = Ir.getCoder(this.jsonAbi, i, { encoding: this.encoding }), [c, A] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + A
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (Qn(this.jsonAbi, this.jsonFn.output.type).type === "()")
      return [void 0, 0];
    const n = X(e);
    return Ir.getCoder(this.jsonAbi, this.jsonFn.output, {
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
    D(this, "functions");
    D(this, "configurables");
    D(this, "jsonAbi");
    D(this, "encoding");
    this.jsonAbi = e, this.encoding = b0(e.encoding), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new rs(this.jsonAbi, t.name)])
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
      S.FUNCTION_NOT_FOUND,
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
        S.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Ir.decode(this.jsonAbi, n.loggedType, X(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const n = this.jsonAbi.configurables.find((r) => r.name === e);
    if (!n)
      throw new v(
        S.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Ir.encode(this.jsonAbi, n.configurableType, t, {
      encoding: this.encoding
    });
  }
  getTypeById(e) {
    return Qn(this.jsonAbi, e);
  }
}, Sy = class {
}, Ll = class {
}, C0 = class {
}, B0 = class {
}, kl = class extends B0 {
}, Pl = class extends B0 {
}, Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
var qn = Er.bech32m = Er.bech32 = void 0;
const gs = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", x0 = {};
for (let e = 0; e < gs.length; e++) {
  const t = gs.charAt(e);
  x0[t] = e;
}
function zn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function da(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = zn(t) ^ r >> 5;
  }
  t = zn(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = zn(t) ^ r & 31;
  }
  return t;
}
function lo(e, t, n, r) {
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
function Ul(e) {
  return lo(e, 8, 5, !0);
}
function Gl(e) {
  const t = lo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function zl(e) {
  const t = lo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function _0(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, c, A) {
    if (A = A || 90, o.length + 7 + c.length > A)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let h = da(o);
    if (typeof h == "string")
      throw new Error(h);
    let I = o + "1";
    for (let m = 0; m < c.length; ++m) {
      const x = c[m];
      if (x >> 5)
        throw new Error("Non 5-bit word");
      h = zn(h) ^ x, I += gs.charAt(x);
    }
    for (let m = 0; m < 6; ++m)
      h = zn(h);
    h ^= t;
    for (let m = 0; m < 6; ++m) {
      const x = h >> (5 - m) * 5 & 31;
      I += gs.charAt(x);
    }
    return I;
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
    const I = o.lastIndexOf("1");
    if (I === -1)
      return "No separator character for " + o;
    if (I === 0)
      return "Missing prefix for " + o;
    const m = o.slice(0, I), x = o.slice(I + 1);
    if (x.length < 6)
      return "Data too short";
    let _ = da(m);
    if (typeof _ == "string")
      return _;
    const R = [];
    for (let C = 0; C < x.length; ++C) {
      const F = x.charAt(C), M = x0[F];
      if (M === void 0)
        return "Unknown character " + F;
      _ = zn(_) ^ M, !(C + 6 >= x.length) && R.push(M);
    }
    return _ !== t ? "Invalid checksum for " + o : { prefix: m, words: R };
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
    toWords: Ul,
    fromWordsUnsafe: Gl,
    fromWords: zl
  };
}
Er.bech32 = _0("bech32");
qn = Er.bech32m = _0("bech32m");
var ps = "fuel";
function fo(e) {
  return qn.decode(e);
}
function ss(e) {
  return qn.encode(
    ps,
    qn.toWords(X(H(e)))
  );
}
function is(e) {
  return typeof e == "string" && e.indexOf(ps + 1) === 0 && fo(e).prefix === ps;
}
function xi(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Aa(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function _i(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function ho(e) {
  return new Uint8Array(qn.fromWords(fo(e).words));
}
function la(e) {
  if (!is(e))
    throw new v(
      v.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return H(ho(e));
}
function Hl(e) {
  const { words: t } = fo(e);
  return qn.encode(ps, t);
}
var gr = (e) => e instanceof C0 ? e.address : e instanceof kl ? e.id : e, Xl = () => H(Tt(32)), Vl = (e) => {
  let t;
  try {
    if (!xi(e))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = ho(ss(e)), t = H(t.fill(0, 0, 12));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, Yl = (e) => {
  if (!_i(e))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, ue = class extends Ll {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    D(this, "bech32Address");
    if (this.bech32Address = Hl(t), !is(this.bech32Address))
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
    return ho(this.bech32Address);
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
      bits: Vl(t)
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
    const n = H(sr(X(t)));
    return new ue(ss(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!xi(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new ue(ss(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(Xl());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return is(t) ? new ue(t) : this.fromB256(t);
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
      return ue.fromB256(t.toB256());
    if (Aa(t))
      return ue.fromPublicKey(t);
    if (is(t))
      return new ue(t);
    if (xi(t))
      return ue.fromB256(t);
    if (_i(t))
      return ue.fromEvmAddress(t);
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
    const n = Yl(t);
    return new ue(ss(n));
  }
};
function Zl(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function v0(e) {
  return function t(n) {
    return arguments.length === 0 || Zl(n) ? t : e.apply(this, arguments);
  };
}
var Wl = /* @__PURE__ */ v0(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Jl(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function R0(e, t, n) {
  if (n || (n = new jl()), ql(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var c in e)
      Object.prototype.hasOwnProperty.call(e, c) && (i[c] = t ? R0(e[c], !0, n) : e[c]);
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
      return Jl(e);
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
function ql(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var jl = /* @__PURE__ */ function() {
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
}(), Gt = /* @__PURE__ */ v0(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : R0(t, !0);
}), ln, _c, be = (_c = class extends ce {
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
    D(this, "length");
    Rt(this, ln);
    this.length = t, Mt(this, ln, n);
  }
  encode(t) {
    const n = [], r = X(t);
    return n.push(r), Fe(this, ln) && n.push(new Uint8Array(Fe(this, ln))), ie(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [H(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return Fe(this, ln) && ([r, s] = [null, s + Fe(this, ln)]), [i, s];
  }
}, ln = new WeakMap(), _c), jn = class extends vs {
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
    return t.push(new z().encode(e.txID)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new z().encode(e.owner)), t.push(new N("u64").encode(e.amount)), t.push(new z().encode(e.assetId)), t.push(new jn().encode(e.txPointer)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new N("u64").encode(e.predicateGasUsed)), t.push(new N("u64").encode(e.predicateLength)), t.push(new N("u64").encode(e.predicateDataLength)), t.push(new be(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new be(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new z().decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const c = n;
    [n, r] = new z().decode(e, r);
    const A = n;
    [n, r] = new jn().decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const I = Number(n);
    [n, r] = new N("u64").decode(e, r);
    const m = n;
    [n, r] = new N("u64").decode(e, r);
    const x = n;
    [n, r] = new N("u64").decode(e, r);
    const _ = n;
    [n, r] = new be(x.toNumber()).decode(e, r);
    const R = n;
    return [n, r] = new be(_.toNumber()).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: c,
        assetId: A,
        txPointer: h,
        witnessIndex: I,
        predicateGasUsed: m,
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
    return t.push(new z().encode(e.txID)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new z().encode(e.balanceRoot)), t.push(new z().encode(e.stateRoot)), t.push(new jn().encode(e.txPointer)), t.push(new z().encode(e.contractID)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new z().decode(e, r);
    const o = n;
    [n, r] = new z().decode(e, r);
    const c = n;
    [n, r] = new jn().decode(e, r);
    const A = n;
    return [n, r] = new z().decode(e, r), [
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
}, br = class extends ce {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new be(32).encode(e.sender)), t.push(new be(32).encode(e.recipient)), t.push(new be(32).encode(e.nonce)), t.push(new N("u64").encode(e.amount)), t.push(X(e.data || "0x")), mt(ie(t));
  }
  static encodeData(e) {
    const t = X(e || "0x"), n = t.length;
    return new be(n).encode(t);
  }
  encode(e) {
    const t = [], n = br.encodeData(e.data);
    return t.push(new be(32).encode(e.sender)), t.push(new be(32).encode(e.recipient)), t.push(new N("u64").encode(e.amount)), t.push(new be(32).encode(e.nonce)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new N("u64").encode(e.predicateGasUsed)), t.push(new N("u64").encode(n.length)), t.push(new N("u64").encode(e.predicateLength)), t.push(new N("u64").encode(e.predicateDataLength)), t.push(new be(n.length).encode(n)), t.push(new be(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new be(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ie(t);
  }
  static decodeData(e) {
    const t = X(e), n = t.length, [r] = new be(n).decode(t, 0);
    return X(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new z().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new z().decode(e, r);
    const c = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = Number(n);
    [n, r] = new N("u64").decode(e, r);
    const h = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const I = n;
    [n, r] = new N("u64").decode(e, r);
    const m = n;
    [n, r] = new N("u64").decode(e, r);
    const x = n;
    [n, r] = new be(I).decode(e, r);
    const _ = n;
    [n, r] = new be(m.toNumber()).decode(e, r);
    const R = n;
    return [n, r] = new be(x.toNumber()).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: A,
        nonce: c,
        predicateGasUsed: h,
        dataLength: I,
        predicateLength: m,
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
        t.push(new br().encode(e));
        break;
      }
      default:
        throw new v(
          S.INVALID_TRANSACTION_INPUT,
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
        return [n, r] = new br().decode(e, r), [n, r];
      default:
        throw new v(
          S.INVALID_TRANSACTION_INPUT,
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
    return t.push(new z().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new z().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    return [n, r] = new z().decode(e, r), [
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
    return t.push(new $("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new z().encode(e.balanceRoot)), t.push(new z().encode(e.stateRoot)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    [n, r] = new z().decode(e, r);
    const i = n;
    return [n, r] = new z().decode(e, r), [
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
    return t.push(new z().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new z().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    return [n, r] = new z().decode(e, r), [
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
    return t.push(new z().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new z().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    return [n, r] = new z().decode(e, r), [
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
    return t.push(new z().encode(e.contractId)), t.push(new z().encode(e.stateRoot)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    return [n, r] = new z().decode(e, r), [
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
          S.INVALID_TRANSACTION_OUTPUT,
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
          S.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Qt = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Qt || {}), $l = (e) => e.sort((t, n) => t.type - n.type);
function Kl(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new v(
        S.DUPLICATED_POLICY,
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
    Kl(e);
    const t = $l(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new N("u64").encode(r));
          break;
        case 4:
          n.push(new $("u32", { padToWordSize: !0 }).encode(r));
          break;
        default:
          throw new v(S.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), ie(n);
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
      const [i, o] = new $("u32", { padToWordSize: !0 }).decode(
        e,
        r
      );
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new N("u64").decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, de = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(de || {}), wa = class extends ce {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z().encode(e.from)), t.push(new z().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new z().encode(e.assetId)), t.push(new N("u64").encode(e.gas)), t.push(new N("u64").encode(e.param1)), t.push(new N("u64").encode(e.param2)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new z().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new z().decode(e, r);
    const c = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    [n, r] = new N("u64").decode(e, r);
    const h = n;
    [n, r] = new N("u64").decode(e, r);
    const I = n;
    [n, r] = new N("u64").decode(e, r);
    const m = n;
    return [n, r] = new N("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        gas: A,
        param1: h,
        param2: I,
        pc: m,
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
    return t.push(new z().encode(e.id)), t.push(new N("u64").encode(e.val)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
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
}, Ia = class extends ce {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z().encode(e.id)), t.push(new N("u64").encode(e.ptr)), t.push(new N("u64").encode(e.len)), t.push(new z().encode(e.digest)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new z().decode(e, r);
    const c = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    return [n, r] = new N("u64").decode(e, r), [
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
}, Ea = class extends ce {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z().encode(e.id)), t.push(new N("u64").encode(e.reason)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), t.push(new z().encode(e.contractId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const c = n;
    return [n, r] = new z().decode(e, r), [
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
}, ba = class extends ce {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z().encode(e.id)), t.push(new N("u64").encode(e.val)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
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
}, Ca = class extends ce {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z().encode(e.id)), t.push(new N("u64").encode(e.val0)), t.push(new N("u64").encode(e.val1)), t.push(new N("u64").encode(e.val2)), t.push(new N("u64").encode(e.val3)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const c = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    [n, r] = new N("u64").decode(e, r);
    const h = n;
    return [n, r] = new N("u64").decode(e, r), [
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
    return t.push(new z().encode(e.id)), t.push(new N("u64").encode(e.val0)), t.push(new N("u64").encode(e.val1)), t.push(new N("u64").encode(e.ptr)), t.push(new N("u64").encode(e.len)), t.push(new z().encode(e.digest)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new N("u64").decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const c = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    [n, r] = new z().decode(e, r);
    const h = n;
    [n, r] = new N("u64").decode(e, r);
    const I = n;
    return [n, r] = new N("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: c,
        len: A,
        digest: h,
        pc: I,
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
    return t.push(new z().encode(e.from)), t.push(new z().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new z().encode(e.assetId)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new z().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new z().decode(e, r);
    const c = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    return [n, r] = new N("u64").decode(e, r), [
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
    return t.push(new z().encode(e.from)), t.push(new z().encode(e.to)), t.push(new N("u64").encode(e.amount)), t.push(new z().encode(e.assetId)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new z().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new z().decode(e, r);
    const c = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n;
    return [n, r] = new N("u64").decode(e, r), [
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
    return t.push(new N("u64").encode(e.result)), t.push(new N("u64").encode(e.gasUsed)), ie(t);
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
}, ys = class extends ce {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new be(32).encode(e.sender)), t.push(new be(32).encode(e.recipient)), t.push(new be(32).encode(e.nonce)), t.push(new N("u64").encode(e.amount)), t.push(X(e.data || "0x")), mt(ie(t));
  }
  encode(e) {
    const t = [];
    return t.push(new z().encode(e.sender)), t.push(new z().encode(e.recipient)), t.push(new N("u64").encode(e.amount)), t.push(new z().encode(e.nonce)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.data.length)), t.push(new z().encode(e.digest)), t.push(new be(e.data.length).encode(e.data)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new z().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new z().decode(e, r);
    const c = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new z().decode(e, r);
    const h = n;
    [n, r] = new be(A).decode(e, r);
    const I = X(n), m = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: c,
      digest: h,
      data: I
    };
    return m.messageId = ys.getMessageId(m), [m, r];
  }
}, S0 = (e, t) => {
  const n = X(e), r = X(t);
  return mt(ie([n, r]));
}, Cr = class extends ce {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return S0(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new z().encode(e.subId)), t.push(new z().encode(e.contractId)), t.push(new N("u64").encode(e.val)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new z().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const c = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n, h = Cr.getAssetId(i, s);
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
}, vi = class extends ce {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return S0(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new z().encode(e.subId)), t.push(new z().encode(e.contractId)), t.push(new N("u64").encode(e.val)), t.push(new N("u64").encode(e.pc)), t.push(new N("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
    const s = n;
    [n, r] = new z().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const c = n;
    [n, r] = new N("u64").decode(e, r);
    const A = n, h = Cr.getAssetId(i, s);
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
}, Qy = class extends ce {
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
        t.push(new Ea().encode(e));
        break;
      }
      case 4: {
        t.push(new ba().encode(e));
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
        t.push(new Cr().encode(e));
        break;
      }
      case 12: {
        t.push(new vi().encode(e));
        break;
      }
      default:
        throw new v(S.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
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
        return [n, r] = new Ea().decode(e, r), [n, r];
      case 4:
        return [n, r] = new ba().decode(e, r), [n, r];
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
        return [n, r] = new Cr().decode(e, r), [n, r];
      case 12:
        return [n, r] = new vi().decode(e, r), [n, r];
      default:
        throw new v(S.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, Ra = class extends vs {
  constructor() {
    super("StorageSlot", {
      key: new z(),
      value: new z()
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
        t.push(new $("u16", { padToWordSize: !0 }).encode(r.witnessIndex)), t.push(new z().encode(r.checksum));
        break;
      }
      case 1: {
        const r = e.data;
        t.push(new z().encode(r.bytecodeRoot));
        break;
      }
      default:
        throw new v(
          S.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${n}`
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
        return [r, n] = new z().decode(e, n), [{ type: s, data: { witnessIndex: i, checksum: r } }, n];
      }
      case 1:
        return [r, n] = new z().decode(e, n), [{ type: s, data: { bytecodeRoot: r } }, n];
      default:
        throw new v(
          S.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
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
}, Le = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e))(Le || {}), Qa = class extends ce {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new N("u64").encode(e.scriptGasLimit)), t.push(new z().encode(e.receiptsRoot)), t.push(new N("u64").encode(e.scriptLength)), t.push(new N("u64").encode(e.scriptDataLength)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new be(e.scriptLength.toNumber()).encode(e.script)), t.push(new be(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new yn().encode(e.policies)), t.push(new we(new mn(), e.inputsCount).encode(e.inputs)), t.push(new we(new wn(), e.outputsCount).encode(e.outputs)), t.push(new we(new In(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new N("u64").decode(e, r);
    const s = n;
    [n, r] = new z().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const c = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const I = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const m = n;
    [n, r] = new be(o.toNumber()).decode(e, r);
    const x = n;
    [n, r] = new be(c.toNumber()).decode(e, r);
    const _ = n;
    [n, r] = new yn().decode(e, r, A);
    const R = n;
    [n, r] = new we(new mn(), h).decode(e, r);
    const C = n;
    [n, r] = new we(new wn(), I).decode(e, r);
    const F = n;
    return [n, r] = new we(new In(), m).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: c,
        policyTypes: A,
        inputsCount: h,
        outputsCount: I,
        witnessesCount: m,
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
    return t.push(new $("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new z().encode(e.salt)), t.push(new N("u64").encode(e.storageSlotsCount)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new we(new Ra(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new yn().encode(e.policies)), t.push(new we(new mn(), e.inputsCount).encode(e.inputs)), t.push(new we(new wn(), e.outputsCount).encode(e.outputs)), t.push(new we(new In(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    [n, r] = new z().decode(e, r);
    const i = n;
    [n, r] = new N("u64").decode(e, r);
    const o = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const c = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const I = n;
    [n, r] = new we(new Ra(), o.toNumber()).decode(
      e,
      r
    );
    const m = n;
    [n, r] = new yn().decode(e, r, c);
    const x = n;
    [n, r] = new we(new mn(), A).decode(e, r);
    const _ = n;
    [n, r] = new we(new wn(), h).decode(e, r);
    const R = n;
    return [n, r] = new we(new In(), I).decode(e, r), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: c,
        storageSlotsCount: o,
        inputsCount: A,
        outputsCount: h,
        witnessesCount: I,
        salt: i,
        policies: x,
        storageSlots: m,
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
    return t.push(new jn().encode(e.txPointer)), t.push(new ms().encode(e.inputContract)), t.push(new ws().encode(e.outputContract)), t.push(new N("u64").encode(e.mintAmount)), t.push(new z().encode(e.mintAssetId)), t.push(new N("u64").encode(e.gasPrice)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new jn().decode(e, r);
    const s = n;
    [n, r] = new ms().decode(e, r);
    const i = n;
    [n, r] = new ws().decode(e, r);
    const o = n;
    [n, r] = new N("u64").decode(e, r);
    const c = n;
    [n, r] = new z().decode(e, r);
    const A = n;
    return [n, r] = new N("u64").decode(e, r), [
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
    const I = n;
    [n, r] = new we(new wn(), c).decode(e, r);
    const m = n;
    return [n, r] = new we(new In(), A).decode(e, r), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: o,
        outputsCount: c,
        witnessesCount: A,
        policies: h,
        inputs: I,
        outputs: m,
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
    return t.push(new z().encode(e.root)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.subsectionIndex)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.subsectionsNumber)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.proofSetCount)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new we(new z(), e.proofSetCount).encode(e.proofSet)), t.push(new yn().encode(e.policies)), t.push(new we(new mn(), e.inputsCount).encode(e.inputs)), t.push(new we(new wn(), e.outputsCount).encode(e.outputs)), t.push(new we(new In(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z().decode(e, r);
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
    const I = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const m = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const x = n;
    [n, r] = new we(new z(), A).decode(e, r);
    const _ = n;
    [n, r] = new yn().decode(e, r, h);
    const R = n;
    [n, r] = new we(new mn(), I).decode(e, r);
    const C = n;
    [n, r] = new we(new wn(), m).decode(e, r);
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
        inputsCount: I,
        outputsCount: m,
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
          S.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${n}`
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
          S.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, Ny = class extends vs {
  constructor() {
    super("UtxoId", {
      transactionId: new z(),
      outputIndex: new $("u8", { padToWordSize: !0 })
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Q0 = /* @__PURE__ */ BigInt(0), Rs = /* @__PURE__ */ BigInt(1), ef = /* @__PURE__ */ BigInt(2);
function Tn(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Dr(e) {
  if (!Tn(e))
    throw new Error("Uint8Array expected");
}
const tf = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function $n(e) {
  Dr(e);
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += tf[e[n]];
  return t;
}
function N0(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function go(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const Ht = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Ma(e) {
  if (e >= Ht._0 && e <= Ht._9)
    return e - Ht._0;
  if (e >= Ht._A && e <= Ht._F)
    return e - (Ht._A - 10);
  if (e >= Ht._a && e <= Ht._f)
    return e - (Ht._a - 10);
}
function Kn(e) {
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
function Nn(e) {
  return go($n(e));
}
function po(e) {
  return Dr(e), go($n(Uint8Array.from(e).reverse()));
}
function er(e, t) {
  return Kn(e.toString(16).padStart(t * 2, "0"));
}
function mo(e, t) {
  return er(e, t).reverse();
}
function nf(e) {
  return Kn(N0(e));
}
function Nt(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = Kn(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Tn(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function Br(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    Dr(s), t += s.length;
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, s), s += i.length;
  }
  return n;
}
function D0(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function rf(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function sf(e) {
  let t;
  for (t = 0; e > Q0; e >>= Rs, t += 1)
    ;
  return t;
}
function of(e, t) {
  return e >> BigInt(t) & Rs;
}
function af(e, t, n) {
  return e | (n ? Rs : Q0) << BigInt(t);
}
const wo = (e) => (ef << BigInt(e - 1)) - Rs, oi = (e) => new Uint8Array(e), Oa = (e) => Uint8Array.from(e);
function T0(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = oi(e), s = oi(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...m) => n(s, r, ...m), A = (m = oi()) => {
    s = c(Oa([0]), m), r = c(), m.length !== 0 && (s = c(Oa([1]), m), r = c());
  }, h = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let m = 0;
    const x = [];
    for (; m < t; ) {
      r = c();
      const _ = r.slice();
      x.push(_), m += r.length;
    }
    return Br(...x);
  };
  return (m, x) => {
    o(), A(m);
    let _;
    for (; !(_ = x(h())); )
      A();
    return o(), _;
  };
}
const cf = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || Tn(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function Tr(e, t, n = {}) {
  const r = (s, i, o) => {
    const c = cf[i];
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
const uf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abytes: Dr,
  bitGet: of,
  bitLen: sf,
  bitMask: wo,
  bitSet: af,
  bytesToHex: $n,
  bytesToNumberBE: Nn,
  bytesToNumberLE: po,
  concatBytes: Br,
  createHmacDrbg: T0,
  ensureBytes: Nt,
  equalBytes: D0,
  hexToBytes: Kn,
  hexToNumber: go,
  isBytes: Tn,
  numberToBytesBE: er,
  numberToBytesLE: mo,
  numberToHexUnpadded: N0,
  numberToVarBytesBE: nf,
  utf8ToBytes: rf,
  validateObject: Tr
}, Symbol.toStringTag, { value: "Module" }));
var ai = {}, Ri = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Ee < "u" && Ee, r = function() {
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
        var I = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], m = ArrayBuffer.isView || function(u) {
          return u && I.indexOf(Object.prototype.toString.call(u)) > -1;
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
      function L(u) {
        var l = new FileReader(), p = M(l);
        return l.readAsText(u), p;
      }
      function W(u) {
        for (var l = new Uint8Array(u), p = new Array(l.length), f = 0; f < l.length; f++)
          p[f] = String.fromCharCode(l[f]);
        return p.join("");
      }
      function O(u) {
        if (u.slice)
          return u.slice(0);
        var l = new Uint8Array(u.byteLength);
        return l.set(new Uint8Array(u)), l.buffer;
      }
      function T() {
        return this.bodyUsed = !1, this._initBody = function(u) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = u, u ? typeof u == "string" ? this._bodyText = u : A.blob && Blob.prototype.isPrototypeOf(u) ? this._bodyBlob = u : A.formData && FormData.prototype.isPrototypeOf(u) ? this._bodyFormData = u : A.searchParams && URLSearchParams.prototype.isPrototypeOf(u) ? this._bodyText = u.toString() : A.arrayBuffer && A.blob && h(u) ? (this._bodyArrayBuffer = O(u.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : A.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(u) || m(u)) ? this._bodyArrayBuffer = O(u) : this._bodyText = u = Object.prototype.toString.call(u) : this._bodyText = "", this.headers.get("content-type") || (typeof u == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : A.searchParams && URLSearchParams.prototype.isPrototypeOf(u) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
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
            return L(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(W(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, A.formData && (this.formData = function() {
          return this.text().then(V);
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
      function V(u) {
        var l = new FormData();
        return u.trim().split("&").forEach(function(p) {
          if (p) {
            var f = p.split("="), y = f.shift().replace(/\+/g, " "), E = f.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(y), decodeURIComponent(E));
          }
        }), l;
      }
      function Z(u) {
        var l = new C(), p = u.replace(/\r?\n[\t ]+/g, " ");
        return p.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var y = f.split(":"), E = y.shift().trim();
          if (E) {
            var g = y.join(":").trim();
            l.append(E, g);
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
      var b = [301, 302, 303, 307, 308];
      ee.redirect = function(u, l) {
        if (b.indexOf(l) === -1)
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
          var E = new XMLHttpRequest();
          function g() {
            E.abort();
          }
          E.onload = function() {
            var w = {
              status: E.status,
              statusText: E.statusText,
              headers: Z(E.getAllResponseHeaders() || "")
            };
            w.url = "responseURL" in E ? E.responseURL : w.headers.get("X-Request-URL");
            var Y = "response" in E ? E.response : E.responseText;
            setTimeout(function() {
              p(new ee(Y, w));
            }, 0);
          }, E.onerror = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, E.ontimeout = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, E.onabort = function() {
            setTimeout(function() {
              f(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function d(w) {
            try {
              return w === "" && c.location.href ? c.location.href : w;
            } catch {
              return w;
            }
          }
          E.open(y.method, d(y.url), !0), y.credentials === "include" ? E.withCredentials = !0 : y.credentials === "omit" && (E.withCredentials = !1), "responseType" in E && (A.blob ? E.responseType = "blob" : A.arrayBuffer && y.headers.get("Content-Type") && y.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (E.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof C) ? Object.getOwnPropertyNames(l.headers).forEach(function(w) {
            E.setRequestHeader(w, _(l.headers[w]));
          }) : y.headers.forEach(function(w, Y) {
            E.setRequestHeader(Y, w);
          }), y.signal && (y.signal.addEventListener("abort", g), E.onreadystatechange = function() {
            E.readyState === 4 && y.signal.removeEventListener("abort", g);
          }), E.send(typeof y._bodyInit > "u" ? null : y._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = C, c.Request = q, c.Response = ee), o.Headers = C, o.Request = q, o.Response = ee, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Ri, Ri.exports);
var df = Ri.exports;
function Af(e) {
  return typeof e == "object" && e !== null;
}
function lf(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const ff = /\r\n|[\n\r]/g;
function Si(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(ff)) {
    if (typeof s.index == "number" || lf(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function hf(e) {
  return F0(
    e.source,
    Si(e.source, e.start)
  );
}
function F0(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, c = t.line === 1 ? n : 0, A = t.column + c, h = `${e.name}:${o}:${A}
`, I = r.split(/\r\n|[\n\r]/g), m = I[s];
  if (m.length > 120) {
    const x = Math.floor(A / 80), _ = A % 80, R = [];
    for (let C = 0; C < m.length; C += 80)
      R.push(m.slice(C, C + 80));
    return h + La([
      [`${o} |`, R[0]],
      ...R.slice(1, x + 1).map((C) => ["|", C]),
      ["|", "^".padStart(_)],
      ["|", R[x + 1]]
    ]);
  }
  return h + La([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, I[s - 1]],
    [`${o} |`, m],
    ["|", "^".padStart(A)],
    [`${o + 1} |`, I[s + 1]]
  ]);
}
function La(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function gf(e) {
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
class yo extends Error {
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
    const { nodes: o, source: c, positions: A, path: h, originalError: I, extensions: m } = gf(n);
    super(t), this.name = "GraphQLError", this.path = h ?? void 0, this.originalError = I ?? void 0, this.nodes = ka(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const x = ka(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((R) => R.loc).filter((R) => R != null)
    );
    this.source = c ?? (x == null || (s = x[0]) === null || s === void 0 ? void 0 : s.source), this.positions = A ?? (x == null ? void 0 : x.map((R) => R.start)), this.locations = A && c ? A.map((R) => Si(c, R)) : x == null ? void 0 : x.map((R) => Si(R.source, R.start));
    const _ = Af(
      I == null ? void 0 : I.extensions
    ) ? I == null ? void 0 : I.extensions : void 0;
    this.extensions = (i = m ?? _) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), I != null && I.stack ? Object.defineProperty(this, "stack", {
      value: I.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, yo) : Object.defineProperty(this, "stack", {
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

` + hf(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + F0(this.source, n);
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
  return new yo(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class pf {
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
class M0 {
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
const O0 = {
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
}, mf = new Set(Object.keys(O0));
function Pa(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && mf.has(t);
}
var kn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(kn || (kn = {}));
var Qi;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Qi || (Qi = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function Ni(e) {
  return e === 9 || e === 32;
}
function xr(e) {
  return e >= 48 && e <= 57;
}
function L0(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function k0(e) {
  return L0(e) || e === 95;
}
function wf(e) {
  return L0(e) || xr(e) || e === 95;
}
function yf(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const c = e[o], A = If(c);
    A !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && A < n && (n = A));
  }
  return e.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function If(e) {
  let t = 0;
  for (; t < e.length && Ni(e.charCodeAt(t)); )
    ++t;
  return t;
}
function Ef(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((_) => _.length === 0 || Ni(_.charCodeAt(0))), o = n.endsWith('\\"""'), c = e.endsWith('"') && !o, A = e.endsWith("\\"), h = c || A, I = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || h || i || o);
  let m = "";
  const x = s && Ni(e.charCodeAt(0));
  return (I && !x || i) && (m += `
`), m += n, (I || h) && (m += `
`), '"""' + m + '"""';
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
    const n = new M0(P.SOF, 0, 0, 0, 0);
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
          const n = Bf(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === P.COMMENT);
    return t;
  }
}
function Cf(e) {
  return e === P.BANG || e === P.DOLLAR || e === P.AMP || e === P.PAREN_L || e === P.PAREN_R || e === P.SPREAD || e === P.COLON || e === P.EQUALS || e === P.AT || e === P.BRACKET_L || e === P.BRACKET_R || e === P.BRACE_L || e === P.PIPE || e === P.BRACE_R;
}
function or(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Ss(e, t) {
  return P0(e.charCodeAt(t)) && U0(e.charCodeAt(t + 1));
}
function P0(e) {
  return e >= 55296 && e <= 56319;
}
function U0(e) {
  return e >= 56320 && e <= 57343;
}
function Fn(e, t) {
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
  return new M0(t, n, r, i, o, s);
}
function Bf(e, t) {
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
        return xf(e, s);
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
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? Nf(e, s) : vf(e, s);
    }
    if (xr(i) || i === 45)
      return _f(e, s, i);
    if (k0(i))
      return Df(e, s);
    throw ht(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : or(i) || Ss(n, s) ? `Unexpected character: ${Fn(e, s)}.` : `Invalid character: ${Fn(e, s)}.`
    );
  }
  return ft(e, P.EOF, r, r);
}
function xf(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (or(i))
      ++s;
    else if (Ss(n, s))
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
function _f(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), xr(i))
      throw ht(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Fn(
          e,
          s
        )}.`
      );
  } else
    s = ci(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = ci(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = ci(e, s, i), i = r.charCodeAt(s)), i === 46 || k0(i))
    throw ht(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Fn(
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
function ci(e, t, n) {
  if (!xr(n))
    throw ht(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Fn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; xr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function vf(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), ft(e, P.STRING, t, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const A = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? Rf(e, s) : Sf(e, s) : Qf(e, s);
      o += A.value, s += A.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (or(c))
      ++s;
    else if (Ss(n, s))
      s += 2;
    else
      throw ht(
        e.source,
        s,
        `Invalid character within String: ${Fn(
          e,
          s
        )}.`
      );
  }
  throw ht(e.source, s, "Unterminated string.");
}
function Rf(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !or(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | pr(i), r < 0)
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
function Sf(e, t) {
  const n = e.source.body, r = Ua(n, t + 2);
  if (or(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (P0(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Ua(n, t + 8);
    if (U0(s))
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
  return pr(e.charCodeAt(t)) << 12 | pr(e.charCodeAt(t + 1)) << 8 | pr(e.charCodeAt(t + 2)) << 4 | pr(e.charCodeAt(t + 3));
}
function pr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Qf(e, t) {
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
function Nf(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, c = "";
  const A = [];
  for (; i < r; ) {
    const h = n.charCodeAt(i);
    if (h === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), A.push(c);
      const I = ft(
        e,
        P.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        yf(A).join(`
`)
      );
      return e.line += A.length - 1, e.lineStart = s, I;
    }
    if (h === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      c += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (h === 10 || h === 13) {
      c += n.slice(o, i), A.push(c), h === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, c = "", o = i, s = i;
      continue;
    }
    if (or(h))
      ++i;
    else if (Ss(n, i))
      i += 2;
    else
      throw ht(
        e.source,
        i,
        `Invalid character within String: ${Fn(
          e,
          i
        )}.`
      );
  }
  throw ht(e.source, i, "Unterminated string.");
}
function Df(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (wf(i))
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
function os(e, t) {
  if (!!!e)
    throw new Error(t);
}
const Tf = 10, G0 = 2;
function Io(e) {
  return Qs(e, []);
}
function Qs(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Ff(e, t);
    default:
      return String(e);
  }
}
function Ff(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (Mf(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : Qs(r, n);
  } else if (Array.isArray(e))
    return Lf(e, n);
  return Of(e, n);
}
function Mf(e) {
  return typeof e.toJSON == "function";
}
function Of(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > G0 ? "[" + kf(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + Qs(i, t)
  ).join(", ") + " }";
}
function Lf(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > G0)
    return "[Array]";
  const n = Math.min(Tf, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(Qs(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function kf(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const Pf = globalThis.process && // eslint-disable-next-line no-undef
!0, Uf = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  Pf ? function(t, n) {
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
        const o = Io(t);
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
class z0 {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || os(!1, `Body must be a string. Received: ${Io(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || os(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || os(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Gf(e) {
  return Uf(e, z0);
}
function H0(e, t) {
  return new Fr(e, t).parseDocument();
}
function zf(e, t) {
  const n = new Fr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(P.EOF), r;
}
function Hf(e, t) {
  const n = new Fr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(P.EOF), r;
}
function Xf(e, t) {
  const n = new Fr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(P.EOF), r;
}
class Fr {
  constructor(t, n = {}) {
    const r = Gf(t) ? t : new z0(t);
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
        operation: kn.QUERY,
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
        return kn.QUERY;
      case "mutation":
        return kn.MUTATION;
      case "subscription":
        return kn.SUBSCRIPTION;
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
        `${Zr(
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
    if (Object.prototype.hasOwnProperty.call(Qi, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new pf(
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
      `Expected ${X0(t)}, found ${Zr(n)}.`
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
        `Expected "${t}", found ${Zr(n)}.`
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
      `Unexpected ${Zr(n)}.`
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
function Zr(e) {
  const t = e.value;
  return X0(e.kind) + (t != null ? ` "${t}"` : "");
}
function X0(e) {
  return Cf(e) ? `"${e}"` : e;
}
const Vf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: Fr,
  parse: H0,
  parseConstValue: Hf,
  parseType: Xf,
  parseValue: zf
}, Symbol.toStringTag, { value: "Module" })), Yf = /* @__PURE__ */ Wi(Vf);
function Zf(e) {
  return `"${e.replace(Wf, Jf)}"`;
}
const Wf = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Jf(e) {
  return qf[e.charCodeAt(0)];
}
const qf = [
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
], jf = Object.freeze({});
function $f(e, t, n = O0) {
  const r = /* @__PURE__ */ new Map();
  for (const M of Object.values(ae))
    r.set(M, Kf(t, M));
  let s, i = Array.isArray(e), o = [e], c = -1, A = [], h = e, I, m;
  const x = [], _ = [];
  do {
    c++;
    const M = c === o.length, G = M && A.length !== 0;
    if (M) {
      if (I = _.length === 0 ? void 0 : x[x.length - 1], h = m, m = _.pop(), G)
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
      c = s.index, o = s.keys, A = s.edits, i = s.inArray, s = s.prev;
    } else if (m) {
      if (I = i ? c : o[c], h = m[I], h == null)
        continue;
      x.push(I);
    }
    let L;
    if (!Array.isArray(h)) {
      var R, C;
      Pa(h) || os(!1, `Invalid AST Node: ${Io(h)}.`);
      const W = M ? (R = r.get(h.kind)) === null || R === void 0 ? void 0 : R.leave : (C = r.get(h.kind)) === null || C === void 0 ? void 0 : C.enter;
      if (L = W == null ? void 0 : W.call(t, h, I, m, x, _), L === jf)
        break;
      if (L === !1) {
        if (!M) {
          x.pop();
          continue;
        }
      } else if (L !== void 0 && (A.push([I, L]), !M))
        if (Pa(L))
          h = L;
        else {
          x.pop();
          continue;
        }
    }
    if (L === void 0 && G && A.push([I, h]), M)
      x.pop();
    else {
      var F;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: A,
        prev: s
      }, i = Array.isArray(h), o = i ? h : (F = n[h.kind]) !== null && F !== void 0 ? F : [], c = -1, A = [], m && _.push(m), m = h;
    }
  } while (s !== void 0);
  return A.length !== 0 ? A[A.length - 1][1] : e;
}
function Kf(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function V0(e) {
  return $f(e, th);
}
const eh = 80, th = {
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
      return o.length > eh && (o = i + pe(`(
`, as(te(n, `
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
    leave: ({ value: e, block: t }) => t ? Ef(e) : Zf(e)
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
`, as(te(n, `
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
`, as(te(n, `
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
`, as(te(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function as(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function Ga(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const nh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: V0
}, Symbol.toStringTag, { value: "Module" })), rh = /* @__PURE__ */ Wi(nh);
var Eo = {}, Ns = {}, Y0 = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, sh = Y0, Z0 = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof sh;
}, ih = Z0, oh = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = ih);
  var s, i = /* @__PURE__ */ new Map();
  function o(I, m) {
    var x = i.get(m);
    x ? x.push.apply(x, I) : i.set(m, I);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var c = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(I, m) {
        return o(["" + c + m], I), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(I, m) {
        var x = e(I, "" + c + m, r);
        return x.files.forEach(o), x.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var A in t) {
        var h = e(t[A], "" + c + A, r);
        h.files.forEach(o), s[A] = h.clone;
      }
    } else s = t;
  }
  return {
    clone: s,
    files: i
  };
};
Ns.ReactNativeFile = Y0;
Ns.extractFiles = oh;
Ns.isExtractableFile = Z0;
var ah = typeof self == "object" ? self.FormData : window.FormData, Mr = {};
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.defaultJsonSerializer = void 0;
Mr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var ch = Ee && Ee.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Eo, "__esModule", { value: !0 });
var W0 = Ns, uh = ch(ah), dh = Mr, Ah = function(e) {
  return W0.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function lh(e, t, n, r) {
  r === void 0 && (r = dh.defaultJsonSerializer);
  var s = W0.extractFiles({ query: e, variables: t, operationName: n }, "", Ah), i = s.clone, o = s.files;
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
  var A = typeof FormData > "u" ? uh.default : FormData, h = new A();
  h.append("operations", r.stringify(i));
  var I = {}, m = 0;
  return o.forEach(function(x) {
    I[++m] = x;
  }), h.append("map", r.stringify(I)), m = 0, o.forEach(function(x, _) {
    h.append("" + ++m, _);
  }), h;
}
Eo.default = lh;
var bt = {};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.parseBatchRequestsExtendedArgs = bt.parseRawRequestExtendedArgs = bt.parseRequestExtendedArgs = bt.parseBatchRequestArgs = bt.parseRawRequestArgs = bt.parseRequestArgs = void 0;
function fh(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
bt.parseRequestArgs = fh;
function hh(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
bt.parseRawRequestArgs = hh;
function gh(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
bt.parseBatchRequestArgs = gh;
function ph(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
bt.parseRequestExtendedArgs = ph;
function mh(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
bt.parseRawRequestExtendedArgs = mh;
function wh(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
bt.parseBatchRequestsExtendedArgs = wh;
var Or = {}, yh = Ee && Ee.__extends || /* @__PURE__ */ function() {
  var e = function(t, n) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, s) {
      r.__proto__ = s;
    } || function(r, s) {
      for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (r[i] = s[i]);
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
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.ClientError = void 0;
var Ih = (
  /** @class */
  function(e) {
    yh(t, e);
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
Or.ClientError = Ih;
var Ar = {}, za;
function Eh() {
  if (za) return Ar;
  za = 1;
  var e = Ee && Ee.__assign || function() {
    return e = Object.assign || function(O) {
      for (var T, k = 1, U = arguments.length; k < U; k++) {
        T = arguments[k];
        for (var q in T) Object.prototype.hasOwnProperty.call(T, q) && (O[q] = T[q]);
      }
      return O;
    }, e.apply(this, arguments);
  }, t = Ee && Ee.__awaiter || function(O, T, k, U) {
    function q(V) {
      return V instanceof k ? V : new k(function(Z) {
        Z(V);
      });
    }
    return new (k || (k = Promise))(function(V, Z) {
      function ee(u) {
        try {
          a(U.next(u));
        } catch (l) {
          Z(l);
        }
      }
      function b(u) {
        try {
          a(U.throw(u));
        } catch (l) {
          Z(l);
        }
      }
      function a(u) {
        u.done ? V(u.value) : q(u.value).then(ee, b);
      }
      a((U = U.apply(O, T || [])).next());
    });
  }, n = Ee && Ee.__generator || function(O, T) {
    var k = { label: 0, sent: function() {
      if (V[0] & 1) throw V[1];
      return V[1];
    }, trys: [], ops: [] }, U, q, V, Z;
    return Z = { next: ee(0), throw: ee(1), return: ee(2) }, typeof Symbol == "function" && (Z[Symbol.iterator] = function() {
      return this;
    }), Z;
    function ee(a) {
      return function(u) {
        return b([a, u]);
      };
    }
    function b(a) {
      if (U) throw new TypeError("Generator is already executing.");
      for (; k; ) try {
        if (U = 1, q && (V = a[0] & 2 ? q.return : a[0] ? q.throw || ((V = q.return) && V.call(q), 0) : q.next) && !(V = V.call(q, a[1])).done) return V;
        switch (q = 0, V && (a = [a[0] & 2, V.value]), a[0]) {
          case 0:
          case 1:
            V = a;
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
            if (V = k.trys, !(V = V.length > 0 && V[V.length - 1]) && (a[0] === 6 || a[0] === 2)) {
              k = 0;
              continue;
            }
            if (a[0] === 3 && (!V || a[1] > V[0] && a[1] < V[3])) {
              k.label = a[1];
              break;
            }
            if (a[0] === 6 && k.label < V[1]) {
              k.label = V[1], V = a;
              break;
            }
            if (V && k.label < V[2]) {
              k.label = V[2], k.ops.push(a);
              break;
            }
            V[2] && k.ops.pop(), k.trys.pop();
            continue;
        }
        a = T.call(O, k);
      } catch (u) {
        a = [6, u], q = 0;
      } finally {
        U = V = 0;
      }
      if (a[0] & 5) throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Ar, "__esModule", { value: !0 }), Ar.GraphQLWebSocketClient = void 0;
  var r = Or, s = J0(), i = "connection_init", o = "connection_ack", c = "ping", A = "pong", h = "subscribe", I = "next", m = "error", x = "complete", _ = (
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
        var U = JSON.parse(T), q = U.type, V = U.payload, Z = U.id;
        return new O(q, k(V), Z);
      }, O;
    }()
  ), R = (
    /** @class */
    function() {
      function O(T, k) {
        var U = this, q = k.onInit, V = k.onAcknowledged, Z = k.onPing, ee = k.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = T, T.onopen = function(b) {
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
        }, T.onclose = function(b) {
          U.socketState.acknowledged = !1, U.socketState.subscriptions = {};
        }, T.onerror = function(b) {
          console.error(b);
        }, T.onmessage = function(b) {
          try {
            var a = C(b.data);
            switch (a.type) {
              case o: {
                U.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (U.socketState.acknowledged = !0, V && V(a.payload));
                return;
              }
              case c: {
                Z ? Z(a.payload).then(function(y) {
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
              case I: {
                !a.payload.errors && a.payload.data && f.next && f.next(a.payload.data), a.payload.errors && f.error && f.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: l, variables: p }));
                return;
              }
              case m: {
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
      return O.prototype.makeSubscribe = function(T, k, U, q) {
        var V = this, Z = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[Z] = { query: T, variables: U, subscriber: q }, this.socket.send(L(Z, { query: T, operationName: k, variables: U }).text), function() {
          V.socket.send(W(Z).text), delete V.socketState.subscriptions[Z];
        };
      }, O.prototype.rawRequest = function(T, k) {
        var U = this;
        return new Promise(function(q, V) {
          var Z;
          U.rawSubscribe(T, {
            next: function(ee, b) {
              return Z = { data: ee, extensions: b };
            },
            error: V,
            complete: function() {
              return q(Z);
            }
          }, k);
        });
      }, O.prototype.request = function(T, k) {
        var U = this;
        return new Promise(function(q, V) {
          var Z;
          U.subscribe(T, {
            next: function(ee) {
              return Z = ee;
            },
            error: V,
            complete: function() {
              return q(Z);
            }
          }, k);
        });
      }, O.prototype.subscribe = function(T, k, U) {
        var q = s.resolveRequestDocument(T), V = q.query, Z = q.operationName;
        return this.makeSubscribe(V, Z, U, k);
      }, O.prototype.rawSubscribe = function(T, k, U) {
        return this.makeSubscribe(T, void 0, U, k);
      }, O.prototype.ping = function(T) {
        this.socket.send(M(T).text);
      }, O.prototype.close = function() {
        this.socket.close(1e3);
      }, O.PROTOCOL = "graphql-transport-ws", O;
    }()
  );
  Ar.GraphQLWebSocketClient = R;
  function C(O, T) {
    T === void 0 && (T = function(U) {
      return U;
    });
    var k = _.parse(O, T);
    return k;
  }
  function F(O) {
    return new _(i, O);
  }
  function M(O) {
    return new _(c, O, void 0);
  }
  function G(O) {
    return new _(A, O, void 0);
  }
  function L(O, T) {
    return new _(h, T, O);
  }
  function W(O) {
    return new _(x, void 0, O);
  }
  return Ar;
}
var Ha;
function J0() {
  return Ha || (Ha = 1, function(e) {
    var t = Ee && Ee.__assign || function() {
      return t = Object.assign || function(f) {
        for (var y, E = 1, g = arguments.length; E < g; E++) {
          y = arguments[E];
          for (var d in y) Object.prototype.hasOwnProperty.call(y, d) && (f[d] = y[d]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = Ee && Ee.__createBinding || (Object.create ? function(f, y, E, g) {
      g === void 0 && (g = E), Object.defineProperty(f, g, { enumerable: !0, get: function() {
        return y[E];
      } });
    } : function(f, y, E, g) {
      g === void 0 && (g = E), f[g] = y[E];
    }), r = Ee && Ee.__setModuleDefault || (Object.create ? function(f, y) {
      Object.defineProperty(f, "default", { enumerable: !0, value: y });
    } : function(f, y) {
      f.default = y;
    }), s = Ee && Ee.__importStar || function(f) {
      if (f && f.__esModule) return f;
      var y = {};
      if (f != null) for (var E in f) E !== "default" && Object.prototype.hasOwnProperty.call(f, E) && n(y, f, E);
      return r(y, f), y;
    }, i = Ee && Ee.__awaiter || function(f, y, E, g) {
      function d(w) {
        return w instanceof E ? w : new E(function(Y) {
          Y(w);
        });
      }
      return new (E || (E = Promise))(function(w, Y) {
        function J(re) {
          try {
            j(g.next(re));
          } catch (se) {
            Y(se);
          }
        }
        function K(re) {
          try {
            j(g.throw(re));
          } catch (se) {
            Y(se);
          }
        }
        function j(re) {
          re.done ? w(re.value) : d(re.value).then(J, K);
        }
        j((g = g.apply(f, y || [])).next());
      });
    }, o = Ee && Ee.__generator || function(f, y) {
      var E = { label: 0, sent: function() {
        if (w[0] & 1) throw w[1];
        return w[1];
      }, trys: [], ops: [] }, g, d, w, Y;
      return Y = { next: J(0), throw: J(1), return: J(2) }, typeof Symbol == "function" && (Y[Symbol.iterator] = function() {
        return this;
      }), Y;
      function J(j) {
        return function(re) {
          return K([j, re]);
        };
      }
      function K(j) {
        if (g) throw new TypeError("Generator is already executing.");
        for (; E; ) try {
          if (g = 1, d && (w = j[0] & 2 ? d.return : j[0] ? d.throw || ((w = d.return) && w.call(d), 0) : d.next) && !(w = w.call(d, j[1])).done) return w;
          switch (d = 0, w && (j = [j[0] & 2, w.value]), j[0]) {
            case 0:
            case 1:
              w = j;
              break;
            case 4:
              return E.label++, { value: j[1], done: !1 };
            case 5:
              E.label++, d = j[1], j = [0];
              continue;
            case 7:
              j = E.ops.pop(), E.trys.pop();
              continue;
            default:
              if (w = E.trys, !(w = w.length > 0 && w[w.length - 1]) && (j[0] === 6 || j[0] === 2)) {
                E = 0;
                continue;
              }
              if (j[0] === 3 && (!w || j[1] > w[0] && j[1] < w[3])) {
                E.label = j[1];
                break;
              }
              if (j[0] === 6 && E.label < w[1]) {
                E.label = w[1], w = j;
                break;
              }
              if (w && E.label < w[2]) {
                E.label = w[2], E.ops.push(j);
                break;
              }
              w[2] && E.ops.pop(), E.trys.pop();
              continue;
          }
          j = y.call(f, E);
        } catch (re) {
          j = [6, re], d = 0;
        } finally {
          g = w = 0;
        }
        if (j[0] & 5) throw j[1];
        return { value: j[0] ? j[1] : void 0, done: !0 };
      }
    }, c = Ee && Ee.__rest || function(f, y) {
      var E = {};
      for (var g in f) Object.prototype.hasOwnProperty.call(f, g) && y.indexOf(g) < 0 && (E[g] = f[g]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var d = 0, g = Object.getOwnPropertySymbols(f); d < g.length; d++)
          y.indexOf(g[d]) < 0 && Object.prototype.propertyIsEnumerable.call(f, g[d]) && (E[g[d]] = f[g[d]]);
      return E;
    }, A = Ee && Ee.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var h = s(df), I = h, m = Yf, x = rh, _ = A(Eo), R = Mr, C = bt, F = Or;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return F.ClientError;
    } });
    var M = function(f) {
      var y = {};
      return f && (typeof Headers < "u" && f instanceof Headers || I && I.Headers && f instanceof I.Headers ? y = l(f) : Array.isArray(f) ? f.forEach(function(E) {
        var g = E[0], d = E[1];
        y[g] = d;
      }) : y = f), y;
    }, G = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, L = function(f) {
      var y = f.query, E = f.variables, g = f.operationName, d = f.jsonSerializer;
      if (!Array.isArray(y)) {
        var w = ["query=" + encodeURIComponent(G(y))];
        return E && w.push("variables=" + encodeURIComponent(d.stringify(E))), g && w.push("operationName=" + encodeURIComponent(g)), w.join("&");
      }
      if (typeof E < "u" && !Array.isArray(E))
        throw new Error("Cannot create query with given variable type, array expected");
      var Y = y.reduce(function(J, K, j) {
        return J.push({
          query: G(K),
          variables: E ? d.stringify(E[j]) : void 0
        }), J;
      }, []);
      return "query=" + encodeURIComponent(d.stringify(Y));
    }, W = function(f) {
      var y = f.url, E = f.query, g = f.variables, d = f.operationName, w = f.headers, Y = f.fetch, J = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var j, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return j = _.default(E, g, d, J.jsonSerializer), re = t({ method: "POST", headers: t(t({}, typeof j == "string" ? { "Content-Type": "application/json" } : {}), w), body: j }, J), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, Y(y, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, O = function(f) {
      var y = f.url, E = f.query, g = f.variables, d = f.operationName, w = f.headers, Y = f.fetch, J = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var j, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return j = L({
                query: E,
                variables: g,
                operationName: d,
                jsonSerializer: J.jsonSerializer
              }), re = t({ method: "GET", headers: w }, J), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, Y(y + "?" + j, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, T = (
      /** @class */
      function() {
        function f(y, E) {
          E === void 0 && (E = {}), this.url = y, this.options = E;
        }
        return f.prototype.rawRequest = function(y, E, g) {
          return i(this, void 0, void 0, function() {
            var d, w, Y, J, K, j, re, se, Se, fe, oe, _e;
            return o(this, function(Ae) {
              return d = C.parseRawRequestArgs(y, E, g), w = this.options, Y = w.headers, J = w.fetch, K = J === void 0 ? h.default : J, j = w.method, re = j === void 0 ? "POST" : j, se = w.requestMiddleware, Se = w.responseMiddleware, fe = c(w, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, d.signal !== void 0 && (fe.signal = d.signal), _e = b(d.query).operationName, [2, k({
                url: oe,
                query: d.query,
                variables: d.variables,
                headers: t(t({}, M(a(Y))), M(d.requestHeaders)),
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
          for (var E = [], g = 1; g < arguments.length; g++)
            E[g - 1] = arguments[g];
          var d = E[0], w = E[1], Y = C.parseRequestArgs(y, d, w), J = this.options, K = J.headers, j = J.fetch, re = j === void 0 ? h.default : j, se = J.method, Se = se === void 0 ? "POST" : se, fe = J.requestMiddleware, oe = J.responseMiddleware, _e = c(J, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), Ae = this.url;
          Y.signal !== void 0 && (_e.signal = Y.signal);
          var he = b(Y.document), Ft = he.query, ve = he.operationName;
          return k({
            url: Ae,
            query: Ft,
            variables: Y.variables,
            headers: t(t({}, M(a(K))), M(Y.requestHeaders)),
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
        }, f.prototype.batchRequests = function(y, E) {
          var g = C.parseBatchRequestArgs(y, E), d = this.options, w = d.headers, Y = d.fetch, J = Y === void 0 ? h.default : Y, K = d.method, j = K === void 0 ? "POST" : K, re = d.requestMiddleware, se = d.responseMiddleware, Se = c(d, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), fe = this.url;
          g.signal !== void 0 && (Se.signal = g.signal);
          var oe = g.documents.map(function(Ae) {
            var he = Ae.document;
            return b(he).query;
          }), _e = g.documents.map(function(Ae) {
            var he = Ae.variables;
            return he;
          });
          return k({
            url: fe,
            query: oe,
            variables: _e,
            headers: t(t({}, M(a(w))), M(g.requestHeaders)),
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
        }, f.prototype.setHeader = function(y, E) {
          var g, d = this.options.headers;
          return d ? d[y] = E : this.options.headers = (g = {}, g[y] = E, g), this;
        }, f.prototype.setEndpoint = function(y) {
          return this.url = y, this;
        }, f;
      }()
    );
    e.GraphQLClient = T;
    function k(f) {
      var y = f.url, E = f.query, g = f.variables, d = f.headers, w = f.operationName, Y = f.fetch, J = f.method, K = J === void 0 ? "POST" : J, j = f.fetchOptions, re = f.middleware;
      return i(this, void 0, void 0, function() {
        var se, Se, fe, oe, _e, Ae, he, Ft, ve, ye, ur;
        return o(this, function(Qe) {
          switch (Qe.label) {
            case 0:
              return se = K.toUpperCase() === "POST" ? W : O, Se = Array.isArray(E), [4, se({
                url: y,
                query: E,
                variables: g,
                operationName: w,
                headers: d,
                fetch: Y,
                fetchOptions: j,
                middleware: re
              })];
            case 1:
              return fe = Qe.sent(), [4, Z(fe, j.jsonSerializer)];
            case 2:
              if (oe = Qe.sent(), _e = Se && Array.isArray(oe) ? !oe.some(function(Te) {
                var Ur = Te.data;
                return !Ur;
              }) : !!oe.data, Ae = !oe.errors || j.errorPolicy === "all" || j.errorPolicy === "ignore", fe.ok && Ae && _e)
                return he = fe.headers, Ft = fe.status, oe.errors, ve = c(oe, ["errors"]), ye = j.errorPolicy === "ignore" ? ve : oe, [2, t(t({}, Se ? { data: ye } : ye), { headers: he, status: Ft })];
              throw ur = typeof oe == "string" ? { error: oe } : oe, new F.ClientError(t(t({}, ur), { status: fe.status, headers: fe.headers }), { query: E, variables: g });
          }
        });
      });
    }
    function U(f, y, E, g) {
      return i(this, void 0, void 0, function() {
        var d, w;
        return o(this, function(Y) {
          return d = C.parseRawRequestExtendedArgs(f, y, E, g), w = new T(d.url), [2, w.rawRequest(t({}, d))];
        });
      });
    }
    e.rawRequest = U;
    function q(f, y) {
      for (var E = [], g = 2; g < arguments.length; g++)
        E[g - 2] = arguments[g];
      return i(this, void 0, void 0, function() {
        var d, w, Y, J;
        return o(this, function(K) {
          return d = E[0], w = E[1], Y = C.parseRequestExtendedArgs(f, y, d, w), J = new T(Y.url), [2, J.request(t({}, Y))];
        });
      });
    }
    e.request = q;
    function V(f, y, E) {
      return i(this, void 0, void 0, function() {
        var g, d;
        return o(this, function(w) {
          return g = C.parseBatchRequestsExtendedArgs(f, y, E), d = new T(g.url), [2, d.batchRequests(t({}, g))];
        });
      });
    }
    e.batchRequests = V, e.default = q;
    function Z(f, y) {
      return y === void 0 && (y = R.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var E, g, d;
        return o(this, function(w) {
          switch (w.label) {
            case 0:
              return f.headers.forEach(function(Y, J) {
                J.toLowerCase() === "content-type" && (E = Y);
              }), E && E.toLowerCase().startsWith("application/json") ? (d = (g = y).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, d.apply(g, [w.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function ee(f) {
      var y, E = void 0, g = f.definitions.filter(function(d) {
        return d.kind === "OperationDefinition";
      });
      return g.length === 1 && (E = (y = g[0].name) === null || y === void 0 ? void 0 : y.value), E;
    }
    function b(f) {
      if (typeof f == "string") {
        var y = void 0;
        try {
          var E = m.parse(f);
          y = ee(E);
        } catch {
        }
        return { query: f, operationName: y };
      }
      var g = ee(f);
      return { query: x.print(f), operationName: g };
    }
    e.resolveRequestDocument = b;
    function a(f) {
      return typeof f == "function" ? f() : f;
    }
    function u(f) {
      for (var y = [], E = 1; E < arguments.length; E++)
        y[E - 1] = arguments[E];
      return f.reduce(function(g, d, w) {
        return "" + g + d + (w in y ? y[w] : "");
      }, "");
    }
    e.gql = u;
    function l(f) {
      var y = {};
      return f.forEach(function(E, g) {
        y[g] = E;
      }), y;
    }
    var p = Eh();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return p.GraphQLWebSocketClient;
    } });
  }(ai)), ai;
}
var bh = J0(), Is = function() {
  return Is = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Is.apply(this, arguments);
};
var cs = /* @__PURE__ */ new Map(), Di = /* @__PURE__ */ new Map(), q0 = !0, Es = !1;
function j0(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function Ch(e) {
  return j0(e.source.body.substring(e.start, e.end));
}
function Bh(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = Ch(r.loc), o = Di.get(s);
      o && !o.has(i) ? q0 && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Di.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), Is(Is({}, e), { definitions: n });
}
function xh(e) {
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
function _h(e) {
  var t = j0(e);
  if (!cs.has(t)) {
    var n = H0(e, {
      experimentalFragmentVariables: Es,
      allowLegacyFragmentVariables: Es
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    cs.set(t, xh(Bh(n)));
  }
  return cs.get(t);
}
function tr(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), _h(r);
}
function vh() {
  cs.clear(), Di.clear();
}
function Rh() {
  q0 = !1;
}
function Sh() {
  Es = !0;
}
function Qh() {
  Es = !1;
}
var lr = {
  gql: tr,
  resetCaches: vh,
  disableFragmentWarnings: Rh,
  enableExperimentalFragmentVariables: Sh,
  disableExperimentalFragmentVariables: Qh
};
(function(e) {
  e.gql = lr.gql, e.resetCaches = lr.resetCaches, e.disableFragmentWarnings = lr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = lr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = lr.disableExperimentalFragmentVariables;
})(tr || (tr = {}));
tr.default = tr;
const ne = tr;
var Ne = "0x0000000000000000000000000000000000000000000000000000000000000000", Dy = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Ty = 16 * 1024, Fy = 16, My = 1024 * 1024 * 1024, Oy = 1024 * 1024 * 1024, Ly = 255, ky = 1024 * 1024, Py = 1024 * 1024, Nh = "0xffffffffffff0000", $0 = "0xffffffffffff0001", Dh = "0xffffffffffff0003", Th = "0xffffffffffff0004", Fh = "0xffffffffffff0005", Uy = "0x0", Mh = [
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
], Oh = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let Q;
const K0 = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && K0.decode();
let mr = null;
function eu() {
  return (mr === null || mr.byteLength === 0) && (mr = new Uint8Array(Q.memory.buffer)), mr;
}
function Lh(e, t) {
  return e = e >>> 0, K0.decode(eu().subarray(e, e + t));
}
function tu(e) {
  const t = Q.ret(e);
  return zt.__wrap(t);
}
function Xa(e, t, n, r) {
  const s = Q.call(e, t, n, r);
  return zt.__wrap(s);
}
function kh(e, t, n) {
  const r = Q.tr(e, t, n);
  return zt.__wrap(r);
}
function Va(e, t, n) {
  const r = Q.addi(e, t, n);
  return zt.__wrap(r);
}
function Ti(e, t, n) {
  const r = Q.lw(e, t, n);
  return zt.__wrap(r);
}
function Ph(e, t, n) {
  const r = Q.gtf(e, t, n);
  return zt.__wrap(r);
}
function Wr(e, t) {
  const n = Q.movi(e, t);
  return zt.__wrap(n);
}
let wr = null;
function Ya() {
  return (wr === null || wr.byteLength === 0) && (wr = new Int32Array(Q.memory.buffer)), wr;
}
function Uh(e, t) {
  return e = e >>> 0, eu().subarray(e / 1, e / 1 + t);
}
const Gh = Object.freeze({
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
const Za = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => Q.__wbg_instruction_free(e >>> 0));
class zt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(zt.prototype);
    return n.__wbg_ptr = t, Za.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Za.unregister(this), t;
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
      var t = Ya()[s / 4 + 0], n = Ya()[s / 4 + 1], r = Uh(t, n).slice();
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
const Wa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => Q.__wbg_regid_free(e >>> 0));
class Oe {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Oe.prototype);
    return n.__wbg_ptr = t, Wa.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wa.unregister(this), t;
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
async function zh(e, t) {
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
function Hh() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(Lh(t, n));
  }, e;
}
function Xh(e, t) {
  return Q = e.exports, nu.__wbindgen_wasm_module = t, wr = null, mr = null, Q;
}
async function nu(e) {
  if (Q !== void 0) return Q;
  const t = Hh(), { instance: n, module: r } = await zh(await e, t);
  return Xh(n, r);
}
function Vh(e, t, n, r) {
  function s(m, x, _) {
    var R = _ ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, C = _ ? WebAssembly.compileStreaming : WebAssembly.compile;
    return x ? R(m, x) : C(m);
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
    var I = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(I, r) : I;
  } else
    return s(i, r, !1);
}
function Yh(e) {
  return Vh(1, null, "AGFzbQEAAAABQAtgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38Bf2AAAX9gAn9/AGABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX8CGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABQP7AfkBAQMKBgEFBQUBBQEBAQEBAQECBQICAQEDAgICAgUCAwMDAwMDAwIBBQEFAAMDAwMDAwMDAwMDAQABAQUFAQEBAQEBAQEBAQIBBQUFAwIBAAABAQEFAgIBAQYABgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGAwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEDBgADAQEBBwICAAIABgEEAwEDBQgBCQkDAwMFAQEBBgYGBgQEBAQEBAQEBAQEBAQEBAQEBAQGBwcCAgIDBwcACAADBAUBcAEHBwUDAQARBgkBfwFBgIDAAAsHxEvBBQZtZW1vcnkCABZfX3diZ19jb21wYXJlYXJnc19mcmVlAHcaX193YmdfZ2V0X2NvbXBhcmVhcmdzX21vZGUAORpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQAoIl9fd2JnX2dldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMAOiJfX3diZ19zZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzADsSY29tcGFyZWFyZ3NfdG9faW1tAEgUY29tcGFyZWFyZ3NfZnJvbV9pbW0AKRVfX3diZ19nZXRfbWF0aGFyZ3Nfb3AAORVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AAKhJfX3diZ19tdWxhcmdzX2ZyZWUAeB5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAOR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAPBJfX3diZ19kaXZhcmdzX2ZyZWUA1gEeX193YmdfZ2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK0BIXBhbmljaW5zdHJ1Y3Rpb25fZXJyb3JfdHlwZXNjcmlwdABMF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAD4ccGFuaWNpbnN0cnVjdGlvbl9pbnN0cnVjdGlvbgA/DGdtX2Zyb21fYXJncwDJAQ1ndGZfZnJvbV9hcmdzAMEBB2dtX2FyZ3MAeQhndGZfYXJncwBaDndkY21fZnJvbV9hcmdzACYOd2RvcF9mcm9tX2FyZ3MAJg53ZG1sX2Zyb21fYXJncwAeDndkZHZfZnJvbV9hcmdzAL8BCXdkY21fYXJncwAZCXdxY21fYXJncwAaCXdkb3BfYXJncwAbCXdxb3BfYXJncwAcCXdkbWxfYXJncwAUCXdxbWxfYXJncwAVCXdkZHZfYXJncwBVCXdxZHZfYXJncwBWEF9fd2JnX2ltbTA2X2ZyZWUA1wEQX193YmdfaW1tMTJfZnJlZQDYARBfX3diZ19pbW0xOF9mcmVlANkBDl9fd2JnX2FkZF9mcmVlALgBD19fd2JnX25vb3BfZnJlZQBbEmFkZF9uZXdfdHlwZXNjcmlwdABPBmFkZF9yYQAWBmFkZF9yYgALBmFkZF9yYwAPA2FkZAC5AQNhbmQAewNkaXYAfAJlcQB9A2V4cAB+Amd0AH8CbHQAgAEEbWxvZwCBAQRtcm9vAIIBBG1vZF8AgwEFbW92ZV8ALANtdWwAhAEDbm90AC0Cb3IAhQEDc2xsAIYBA3NybACHAQNzdWIAiAEDeG9yAIkBBG1sZHYAXANyZXQArgEEcmV0ZAAuE2Fsb2NfbmV3X3R5cGVzY3JpcHQAVwdhbG9jX3JhAE4EYWxvYwCvAQNtY2wALwNtY3AAigEDbWVxAF0TYmhzaF9uZXdfdHlwZXNjcmlwdAAfBGJoc2gAMARiaGVpALABBGJ1cm4AMRNjYWxsX25ld190eXBlc2NyaXB0AE0HY2FsbF9yZAAXBGNhbGwAXgNjY3AAXwRjcm9vADIEY3NpegAzAmNiALEBA2xkYwCLAQNsb2cAYARsb2dkAGEEbWludAA0BHJ2cnQAsgEEc2N3cQCMAQNzcncAjQEEc3J3cQBiA3N3dwCOAQRzd3dxAGMCdHIAjwEDdHJvAGQEZWNrMQCQAQRlY3IxAJEBBGVkMTkAkgEEazI1NgCTAQRzMjU2AJQBBHRpbWUANRNub29wX25ld190eXBlc2NyaXB0AMYBBG5vb3AA2gEEZmxhZwCzAQNiYWwAlQEDam1wALQBA2puZQCWAQNzbW8AZRNhZGRpX25ld190eXBlc2NyaXB0AFAKYWRkaV9pbW0xMgAMBGFkZGkAlwEEYW5kaQCYAQRkaXZpAJkBBGV4cGkAmgEEbW9kaQCbAQRtdWxpAJwBA29yaQCdAQRzbGxpAJ4BBHNybGkAnwEEc3ViaQCgAQR4b3JpAKEBBGpuZWkAogECbGIAowECbHcApAECc2IApQECc3cApgEEbWNwaQCnARJndGZfbmV3X3R5cGVzY3JpcHQAwwEDZ3RmAKgBBG1jbGkAIBFnbV9uZXdfdHlwZXNjcmlwdAA2CGdtX2ltbTE4AAkCZ20AIQRtb3ZpACIEam56aQAjBGptcGYAJBNqbXBiX25ld190eXBlc2NyaXB0ABgEam1wYgAlBGpuemYAqQEEam56YgCqAQRqbmVmAGYKam5lYl9pbW0wNgAXBGpuZWIAZwJqaQBAE2NmZWlfbmV3X3R5cGVzY3JpcHQANwpjZmVpX2ltbTI0ACcEY2ZlaQBBBGNmc2kAQgNjZmUAtQEDY2ZzALYBBHBzaGwAQwRwc2hoAEQEcG9wbABFBHBvcGgARhN3ZGNtX25ld190eXBlc2NyaXB0AMABBHdkY20AaAR3cWNtAGkEd2RvcABqBHdxb3AAawR3ZG1sAGwEd3FtbABtBHdkZHYAbgR3cWR2AG8Ed2RtZABwBHdxbWQAcQR3ZGFtAHIEd3FhbQBzBHdkbW0AdAR3cW1tAHUEZWNhbAB2Fl9fd2JnX2luc3RydWN0aW9uX2ZyZWUAWRRpbnN0cnVjdGlvbl90b19ieXRlcwAKEGluc3RydWN0aW9uX3NpemUA7AERcmVnaWRfbmV3X2NoZWNrZWQAqwEJcmVnaWRfYmFsANsBCnJlZ2lkX2NnYXMA3AEJcmVnaWRfZXJyAN0BCnJlZ2lkX2ZsYWcA3gEIcmVnaWRfZnAA3wEKcmVnaWRfZ2dhcwDgAQhyZWdpZF9ocADhAQhyZWdpZF9pcwDiAQhyZWdpZF9vZgDjAQlyZWdpZF9vbmUA5AEIcmVnaWRfcGMA5QEJcmVnaWRfcmV0AOYBCnJlZ2lkX3JldGwA5wEIcmVnaWRfc3AA6AEJcmVnaWRfc3BwAOkBDnJlZ2lkX3dyaXRhYmxlAOoBCnJlZ2lkX3plcm8A6wEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA0wELcmVnaWRfdG9fdTgA1AETbW92aV9uZXdfdHlwZXNjcmlwdAAYE21jbGlfbmV3X3R5cGVzY3JpcHQAGBNqbnppX25ld190eXBlc2NyaXB0ABgTam1wZl9uZXdfdHlwZXNjcmlwdAAYEm5vdF9uZXdfdHlwZXNjcmlwdAAfE3JldGRfbmV3X3R5cGVzY3JpcHQAHxNtb3ZlX25ld190eXBlc2NyaXB0AB8SbWNsX25ld190eXBlc2NyaXB0AB8TYnVybl9uZXdfdHlwZXNjcmlwdAAfE2Nyb29fbmV3X3R5cGVzY3JpcHQAHxNjc2l6X25ld190eXBlc2NyaXB0AB8TbWludF9uZXdfdHlwZXNjcmlwdAAfE3RpbWVfbmV3X3R5cGVzY3JpcHQAHxJyZXRfbmV3X3R5cGVzY3JpcHQAVxNiaGVpX25ld190eXBlc2NyaXB0AFcRY2JfbmV3X3R5cGVzY3JpcHQAVxNydnJ0X25ld190eXBlc2NyaXB0AFcTZmxhZ19uZXdfdHlwZXNjcmlwdABXEmptcF9uZXdfdHlwZXNjcmlwdABXEmNmZV9uZXdfdHlwZXNjcmlwdABXEmNmc19uZXdfdHlwZXNjcmlwdABXE21sZHZfbmV3X3R5cGVzY3JpcHQATRJtZXFfbmV3X3R5cGVzY3JpcHQATRJjY3BfbmV3X3R5cGVzY3JpcHQATRJsb2dfbmV3X3R5cGVzY3JpcHQATRNsb2dkX25ld190eXBlc2NyaXB0AE0Tc3J3cV9uZXdfdHlwZXNjcmlwdABNE3N3d3FfbmV3X3R5cGVzY3JpcHQATRJ0cm9fbmV3X3R5cGVzY3JpcHQATRJzbW9fbmV3X3R5cGVzY3JpcHQATRNqbmVmX25ld190eXBlc2NyaXB0AE0Td2RtZF9uZXdfdHlwZXNjcmlwdABNE3dxbWRfbmV3X3R5cGVzY3JpcHQATRN3ZGFtX25ld190eXBlc2NyaXB0AE0Td3FhbV9uZXdfdHlwZXNjcmlwdABNE3dkbW1fbmV3X3R5cGVzY3JpcHQATRN3cW1tX25ld190eXBlc2NyaXB0AE0TZWNhbF9uZXdfdHlwZXNjcmlwdABNEmFuZF9uZXdfdHlwZXNjcmlwdABPEmRpdl9uZXdfdHlwZXNjcmlwdABPEWVxX25ld190eXBlc2NyaXB0AE8SZXhwX25ld190eXBlc2NyaXB0AE8RZ3RfbmV3X3R5cGVzY3JpcHQATxFsdF9uZXdfdHlwZXNjcmlwdABPE21sb2dfbmV3X3R5cGVzY3JpcHQATxNtcm9vX25ld190eXBlc2NyaXB0AE8SbW9kX25ld190eXBlc2NyaXB0AE8SbXVsX25ld190eXBlc2NyaXB0AE8Rb3JfbmV3X3R5cGVzY3JpcHQATxJzbGxfbmV3X3R5cGVzY3JpcHQATxJzcmxfbmV3X3R5cGVzY3JpcHQATxJzdWJfbmV3X3R5cGVzY3JpcHQATxJ4b3JfbmV3X3R5cGVzY3JpcHQATxJtY3BfbmV3X3R5cGVzY3JpcHQATxJsZGNfbmV3X3R5cGVzY3JpcHQATxNzY3dxX25ld190eXBlc2NyaXB0AE8Sc3J3X25ld190eXBlc2NyaXB0AE8Sc3d3X25ld190eXBlc2NyaXB0AE8RdHJfbmV3X3R5cGVzY3JpcHQATxNlY2sxX25ld190eXBlc2NyaXB0AE8TZWNyMV9uZXdfdHlwZXNjcmlwdABPE2VkMTlfbmV3X3R5cGVzY3JpcHQATxNrMjU2X25ld190eXBlc2NyaXB0AE8TczI1Nl9uZXdfdHlwZXNjcmlwdABPEmJhbF9uZXdfdHlwZXNjcmlwdABPEmpuZV9uZXdfdHlwZXNjcmlwdABPE2FuZGlfbmV3X3R5cGVzY3JpcHQAUBNkaXZpX25ld190eXBlc2NyaXB0AFATZXhwaV9uZXdfdHlwZXNjcmlwdABQE21vZGlfbmV3X3R5cGVzY3JpcHQAUBNtdWxpX25ld190eXBlc2NyaXB0AFASb3JpX25ld190eXBlc2NyaXB0AFATc2xsaV9uZXdfdHlwZXNjcmlwdABQE3NybGlfbmV3X3R5cGVzY3JpcHQAUBNzdWJpX25ld190eXBlc2NyaXB0AFATeG9yaV9uZXdfdHlwZXNjcmlwdABQE2puZWlfbmV3X3R5cGVzY3JpcHQAUBFsYl9uZXdfdHlwZXNjcmlwdABQEWx3X25ld190eXBlc2NyaXB0AFARc2JfbmV3X3R5cGVzY3JpcHQAUBFzd19uZXdfdHlwZXNjcmlwdABQE21jcGlfbmV3X3R5cGVzY3JpcHQAUBNqbnpmX25ld190eXBlc2NyaXB0AFATam56Yl9uZXdfdHlwZXNjcmlwdABQDndxY21fZnJvbV9hcmdzACYOd3FvcF9mcm9tX2FyZ3MAJh9fX3diZ19zZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzADseX193Ymdfc2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzADseX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzADsRamlfbmV3X3R5cGVzY3JpcHQANxNjZnNpX25ld190eXBlc2NyaXB0ADcTcHNobF9uZXdfdHlwZXNjcmlwdAA3E3BzaGhfbmV3X3R5cGVzY3JpcHQANxNwb3BsX25ld190eXBlc2NyaXB0ADcTcG9waF9uZXdfdHlwZXNjcmlwdAA3E3dkbWxfbmV3X3R5cGVzY3JpcHQAwAETd3FtbF9uZXdfdHlwZXNjcmlwdADAAQ53cW1sX2Zyb21fYXJncwAeE3dxb3BfbmV3X3R5cGVzY3JpcHQAwAETd2Rkdl9uZXdfdHlwZXNjcmlwdADAARN3cWNtX25ld190eXBlc2NyaXB0AMABE3dkb3BfbmV3X3R5cGVzY3JpcHQAwAETd3Fkdl9uZXdfdHlwZXNjcmlwdADAARBfX3diZ19yZWdpZF9mcmVlANcBDndxZHZfZnJvbV9hcmdzAL8BEF9fd2JnX2ltbTI0X2ZyZWUA2QEPX193YmdfbW92aV9mcmVlALgBD19fd2JnX21sZHZfZnJlZQC4AQ9fX3diZ19mbGFnX2ZyZWUAuAEPX193YmdfZWNhbF9mcmVlALgBDl9fd2JnX2d0Zl9mcmVlALgBDl9fd2JnX3Nyd19mcmVlALgBDl9fd2JnX2Rpdl9mcmVlALgBD19fd2JnX3Njd3FfZnJlZQC4AQ5fX3diZ19leHBfZnJlZQC4AQZqbXBfcmEATg5fX3diZ19qbXBfZnJlZQC4AQ5fX3diZ19tdWxfZnJlZQC4AQ5fX3diZ19zcmxfZnJlZQC4AQ9fX3diZ19zd3dxX2ZyZWUAuAEOX193YmdfbWNwX2ZyZWUAuAENX193Ymdfc3dfZnJlZQC4AQ9fX3diZ19jZmVpX2ZyZWUAuAEPX193YmdfbG9nZF9mcmVlALgBDV9fd2JnX29yX2ZyZWUAuAEOX193YmdfbWVxX2ZyZWUAuAEPX193Ymdfd3FhbV9mcmVlALgBD19fd2JnX2puemJfZnJlZQC4AQ5fX3diZ19sZGNfZnJlZQC4AQ9fX3diZ19tY3BpX2ZyZWUAuAEPX193Ymdfam1wZl9mcmVlALgBDV9fd2JnX2xiX2ZyZWUAuAEPX193Ymdfd3FjbV9mcmVlALgBD19fd2JnX3dxb3BfZnJlZQC4AQ9fX3diZ19tcm9vX2ZyZWUAuAEPX193Ymdfd2RtbF9mcmVlALgBDV9fd2JnX3RyX2ZyZWUAuAEPX193Ymdfam5laV9mcmVlALgBD19fd2JnX2NhbGxfZnJlZQC4AQ9fX3diZ19hbmRpX2ZyZWUAuAEPX193YmdfYmhzaF9mcmVlALgBDl9fd2JnX3N3d19mcmVlALgBD19fd2JnX3N1YmlfZnJlZQC4AQ1fX3diZ19lcV9mcmVlALgBD19fd2JnX3dkbW1fZnJlZQC4AQ9fX3diZ19zbGxpX2ZyZWUAuAEOX193Ymdfam5lX2ZyZWUAuAEPX193YmdfbW92ZV9mcmVlALgBD19fd2JnX2RpdmlfZnJlZQC4AQ9fX3diZ19lY3IxX2ZyZWUAuAEKY2ZzaV9pbW0yNAAnD19fd2JnX2Nmc2lfZnJlZQC4AQ9fX3diZ19jc2l6X2ZyZWUAuAEPX193YmdfcmV0ZF9mcmVlALgBHl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X2xocwA6B2ZsYWdfcmEATg9fX3diZ19iaGVpX2ZyZWUAuAEPX193YmdfbW9kaV9mcmVlALgBDV9fd2JnX2d0X2ZyZWUAuAEfX193YmdfZ2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwA6Dl9fd2JnX2NjcF9mcmVlALgBD19fd2JnX2VjazFfZnJlZQC4AQdiaGVpX3JhAE4OX193YmdfYW5kX2ZyZWUAuAEPX193YmdfazI1Nl9mcmVlALgBD19fd2JnX2Fsb2NfZnJlZQC4AQ1fX3diZ19sdF9mcmVlALgBDl9fd2JnX3Ntb19mcmVlALgBD19fd2JnX2puemZfZnJlZQC4AQ5fX3diZ19tY2xfZnJlZQC4AQZyZXRfcmEATg5fX3diZ19yZXRfZnJlZQC4AQ9fX3diZ19taW50X2ZyZWUAuAEPX193Ymdfd2RvcF9mcmVlALgBD19fd2JnX2Nyb29fZnJlZQC4AQ5fX3diZ190cm9fZnJlZQC4AQ9fX3diZ193cW1kX2ZyZWUAuAEPX193Ymdfd3Fkdl9mcmVlALgBD19fd2JnX2V4cGlfZnJlZQC4AQ9fX3diZ19zcndxX2ZyZWUAuAEPX193Ymdfd3FtbF9mcmVlALgBD19fd2JnX3dkbWRfZnJlZQC4AQ5fX3diZ19tb2RfZnJlZQC4AQ9fX3diZ19qbnppX2ZyZWUAuAEPX193YmdfYnVybl9mcmVlALgBB3J2cnRfcmEATg9fX3diZ19ydnJ0X2ZyZWUAuAEOX193Ymdfb3JpX2ZyZWUAuAEKcHNobF9pbW0yNAAnD19fd2JnX3BzaGxfZnJlZQC4AQ9fX3diZ19hZGRpX2ZyZWUAuAEOX193YmdfeG9yX2ZyZWUAuAENX193YmdfbHdfZnJlZQC4AQpwb3BsX2ltbTI0ACcPX193YmdfcG9wbF9mcmVlALgBDV9fd2JnX3NiX2ZyZWUAuAEPX193YmdfbXVsaV9mcmVlALgBDl9fd2JnX2xvZ19mcmVlALgBCGppX2ltbTI0ACcNX193YmdfamlfZnJlZQC4AQ9fX3diZ19tbG9nX2ZyZWUAuAEPX193YmdfbWNsaV9mcmVlALgBDl9fd2JnX3N1Yl9mcmVlALgBDl9fd2JnX3NsbF9mcmVlALgBDl9fd2JnX25vdF9mcmVlALgBD19fd2JnX2puZWJfZnJlZQC4AQ9fX3diZ19zcmxpX2ZyZWUAuAEPX193YmdfczI1Nl9mcmVlALgBDl9fd2JnX2JhbF9mcmVlALgBD19fd2JnX2ptcGJfZnJlZQC4AQZjZnNfcmEATg5fX3diZ19jZnNfZnJlZQC4AQZjZmVfcmEATg5fX3diZ19jZmVfZnJlZQC4AQ9fX3diZ193ZGFtX2ZyZWUAuAENX193YmdfZ21fZnJlZQC4AQ9fX3diZ193cW1tX2ZyZWUAuAEKcG9waF9pbW0yNAAnD19fd2JnX3BvcGhfZnJlZQC4AQ9fX3diZ193ZGR2X2ZyZWUAuAEPX193YmdfdGltZV9mcmVlALgBD19fd2JnX3hvcmlfZnJlZQC4AQVjYl9yYQBODV9fd2JnX2NiX2ZyZWUAuAEPX193Ymdfam5lZl9mcmVlALgBD19fd2JnX2VkMTlfZnJlZQC4AQ9fX3diZ193ZGNtX2ZyZWUAuAEKcHNoaF9pbW0yNAAnD19fd2JnX3BzaGhfZnJlZQC4ARNqbmViX25ld190eXBlc2NyaXB0AE0Kd3Fkdl9pbW0wNgAXCndxbWxfaW1tMDYAFwp3ZG1sX2ltbTA2ABcKd3FvcF9pbW0wNgAXCndkb3BfaW1tMDYAFwp3cWNtX2ltbTA2ABcKd2Rkdl9pbW0wNgAXCndkY21faW1tMDYAFwpqbmVmX2ltbTA2ABcHbW92aV9yYQAWB21sZHZfcmQAFwdtbGR2X3JjAA8HbWxkdl9yYgALB21sZHZfcmEAFgZndGZfcmIACwZndGZfcmEAFgZzcndfcmMADwZzcndfcmIACwZzcndfcmEAFgdlY2FsX3JjAA8HZWNhbF9yYgALB2VjYWxfcmEAFgdzY3dxX3JjAA8Hc2N3cV9yYgALB3Njd3FfcmEAFgZleHBfcmMADwZleHBfcmIACwZleHBfcmEAFgZtdWxfcmMADwZtdWxfcmIACwZtdWxfcmEAFgZzcmxfcmMADwZzcmxfcmIACwZzcmxfcmEAFgdzd3dxX3JkABcHc3d3cV9yYwAPB3N3d3FfcmIACwdzd3dxX3JhABYGbWNwX3JjAA8GbWNwX3JiAAsGbWNwX3JhABYIc3dfaW1tMTIADAVzd19yYgALBXN3X3JhABYJZ3RmX2ltbTEyAAwGZGl2X3JiAAsGZGl2X3JhABYHbG9nZF9yZAAXB2xvZ2RfcmMADwdsb2dkX3JiAAsHbG9nZF9yYQAWBW9yX3JjAA8Fb3JfcmIACwVvcl9yYQAWBm1lcV9yZAAXBm1lcV9yYwAPBm1lcV9yYgALBm1lcV9yYQAWB3dxYW1fcmQAFwd3cWFtX3JjAA8Hd3FhbV9yYgALB3dxYW1fcmEAFgpqbnpiX2ltbTEyAAwHam56Yl9yYgALB2puemJfcmEAFgZsZGNfcmMADwZsZGNfcmIACwZsZGNfcmEAFgptY3BpX2ltbTEyAAwHbWNwaV9yYgALB21jcGlfcmEAFgptb3ZpX2ltbTE4AAkHam1wZl9yYQAWCGxiX2ltbTEyAAwFbGJfcmIACwVsYl9yYQAWB3dxY21fcmMADwd3cWNtX3JiAAsHd3FjbV9yYQAWB3dxb3BfcmMADwd3cW9wX3JiAAsHd3FvcF9yYQAWB21yb29fcmMADwdtcm9vX3JiAAsHbXJvb19yYQAWB3dkbWxfcmMADwd3ZG1sX3JiAAsHd2RtbF9yYQAWBXRyX3JjAA8FdHJfcmIACwV0cl9yYQAWCmpuZWlfaW1tMTIADAdqbmVpX3JiAAsHam5laV9yYQAWB2VjYWxfcmQAFwZkaXZfcmMADwdjYWxsX3JiAAsHY2FsbF9yYQAWB2NhbGxfcmMADwdhbmRpX3JiAAsHYW5kaV9yYQAWB2Joc2hfcmIACwdiaHNoX3JhABYGc3d3X3JjAA8Gc3d3X3JiAAsGc3d3X3JhABYKc3ViaV9pbW0xMgAMB3N1YmlfcmIACwdzdWJpX3JhABYFZXFfcmMADwVlcV9yYgALBWVxX3JhABYHd2RtbV9yZAAXB3dkbW1fcmMADwd3ZG1tX3JiAAsHd2RtbV9yYQAWCnNsbGlfaW1tMTIADAdzbGxpX3JiAAsHc2xsaV9yYQAWBmpuZV9yYwAPBmpuZV9yYgALBmpuZV9yYQAWB21vdmVfcmIACwdtb3ZlX3JhABYKZGl2aV9pbW0xMgAMB2RpdmlfcmIACwdkaXZpX3JhABYHZWNyMV9yYwAPB2VjcjFfcmIACwdlY3IxX3JhABYHY3Npel9yYgALB2NzaXpfcmEAFgdyZXRkX3JiAAsHcmV0ZF9yYQAWCm1vZGlfaW1tMTIADAdtb2RpX3JiAAsHbW9kaV9yYQAWBWd0X3JjAA8FZ3RfcmIACwVndF9yYQAWE19fd2JnX21hdGhhcmdzX2ZyZWUAdwZjY3BfcmQAFwZjY3BfcmMADwZjY3BfcmIACwZjY3BfcmEAFgdlY2sxX3JjAA8HZWNrMV9yYgALB2VjazFfcmEAFgdrMjU2X3JjAA8HazI1Nl9yYgALB2syNTZfcmEAFgphbmRpX2ltbTEyAAwGYW5kX3JiAAsGYW5kX3JhABYFbHRfcmMADwVsdF9yYgALBWx0X3JhABYGc21vX3JkABcGc21vX3JjAA8Gc21vX3JiAAsGc21vX3JhABYKam56Zl9pbW0xMgAMB2puemZfcmIACwdqbnpmX3JhABYGbWNsX3JiAAsGbWNsX3JhABYHbWludF9yYgALB21pbnRfcmEAFgd3ZG9wX3JjAA8Hd2RvcF9yYgALB3dkb3BfcmEAFgdjcm9vX3JiAAsHY3Jvb19yYQAWBnRyb19yZAAXBnRyb19yYwAPBnRyb19yYgALBnRyb19yYQAWB3dxbWRfcmQAFwd3cW1kX3JjAA8Hd3FtZF9yYgALB3dxbWRfcmEAFgd3cWR2X3JjAA8Hd3Fkdl9yYgALB3dxZHZfcmEAFgpleHBpX2ltbTEyAAwHZXhwaV9yYgALB2V4cGlfcmEAFgdzcndxX3JkABcHc3J3cV9yYwAPB3Nyd3FfcmIACwdzcndxX3JhABYHd3FtbF9yYwAPB3dxbWxfcmIACwd3cW1sX3JhABYHd2RtZF9yZAAXB3dkbWRfcmMADwd3ZG1kX3JiAAsHd2RtZF9yYQAWBm1vZF9yYwAPBm1vZF9yYgALBm1vZF9yYQAWCmpuemlfaW1tMTgACQdqbnppX3JhABYHYnVybl9yYgALB2J1cm5fcmEAFglvcmlfaW1tMTIADAZvcmlfcmIACwZvcmlfcmEAFgZhbmRfcmMADwdhZGRpX3JiAAsHYWRkaV9yYQAWBnhvcl9yYwAPBnhvcl9yYgALBnhvcl9yYQAWCGx3X2ltbTEyAAwFbHdfcmIACwVsd19yYQAWCHNiX2ltbTEyAAwFc2JfcmIACwVzYl9yYQAWCm11bGlfaW1tMTIADAdtdWxpX3JiAAsHbXVsaV9yYQAWBmxvZ19yZAAXBmxvZ19yYwAPBmxvZ19yYgALBmxvZ19yYQAWB21sb2dfcmMADwdtbG9nX3JiAAsHbWxvZ19yYQAWCm1jbGlfaW1tMTgACQdtY2xpX3JhABYGc3ViX3JjAA8Gc3ViX3JiAAsGc3ViX3JhABYGc2xsX3JjAA8Gc2xsX3JiAAsGc2xsX3JhABYGbm90X3JiAAsGbm90X3JhABYHam5lYl9yYwAPB2puZWJfcmIACwdqbmViX3JhABYKc3JsaV9pbW0xMgAMB3NybGlfcmIACwdzcmxpX3JhABYHczI1Nl9yYwAPB3MyNTZfcmIACwdzMjU2X3JhABYGYmFsX3JjAA8GYmFsX3JiAAsGYmFsX3JhABYKam1wZl9pbW0xOAAJB2ptcGJfcmEAFgd3ZGFtX3JkABcHd2RhbV9yYwAPB3dkYW1fcmIACwd3ZGFtX3JhABYKam1wYl9pbW0xOAAJBWdtX3JhABYHd3FtbV9yZAAXB3dxbW1fcmMADwd3cW1tX3JiAAsHd3FtbV9yYQAWB3dkZHZfcmMADwd3ZGR2X3JiAAsHd2Rkdl9yYQAWB3RpbWVfcmIACwd0aW1lX3JhABYKeG9yaV9pbW0xMgAMB3hvcmlfcmIACwd4b3JpX3JhABYHam5lZl9yYwAPB2puZWZfcmIACwdqbmVmX3JhABYHZWQxOV9yYwAPB2VkMTlfcmIACwdlZDE5X3JhABYHd2RjbV9yYwAPB3dkY21fcmIACwd3ZGNtX3JhABYbX193YmdfcGFuaWNpbnN0cnVjdGlvbl9mcmVlALgBH19fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIAzAETX193YmluZGdlbl9leHBvcnRfMADLAQkRAQBBAQsGAs8B0AHRAe0BygEK0IEB+QGJIwIIfwF+AkACQAJAAkACQAJAAkACQCAAQfUBTwRAIABBzf97Tw0FIABBC2oiAEF4cSEFQfiMwAAoAgAiCEUNBEEAIAVrIQQCf0EAIAVBgAJJDQAaQR8gBUH///8HSw0AGiAFQQYgAEEIdmciAGt2QQFxIABBAXRrQT5qCyIHQQJ0QdyJwABqKAIAIgFFBEBBACEADAILQQAhACAFQRkgB0EBdmtBACAHQR9HG3QhAwNAAkAgASgCBEF4cSIGIAVJDQAgBiAFayIGIARPDQAgASECIAYiBA0AQQAhBCABIQAMBAsgAUEUaigCACIGIAAgBiABIANBHXZBBHFqQRBqKAIAIgFHGyAAIAYbIQAgA0EBdCEDIAENAAsMAQtB9IzAACgCACICQRAgAEELakF4cSAAQQtJGyIFQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAUEDdCIAQeyKwABqIgMgAEH0isAAaigCACIAKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiABd3E2AgALIAAgAUEDdCIBQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAgLIAVB/IzAACgCAE0NAwJAAkAgAUUEQEH4jMAAKAIAIgBFDQYgAGhBAnRB3InAAGooAgAiASgCBEF4cSAFayEEIAEhAgNAAkAgASgCECIADQAgAUEUaigCACIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACQRRqIgAoAgAiAxtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAAgAkEQaiADGyEDA0AgAyEGIAEiAEEUaiIBIABBEGogASgCACIBGyEDIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNBCACIAIoAhxBAnRB3InAAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0FDAQLIAEgADYCACAADQNB+IzAAEH4jMAAKAIAQX4gAigCHHdxNgIADAQLIAAoAgRBeHEgBWsiASAEIAEgBEkiARshBCAAIAIgARshAiAAIQEMAAsACwJAQQIgAHQiA0EAIANrciABIAB0cWgiAEEDdCIBQeyKwABqIgMgAUH0isAAaigCACIBKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiAAd3E2AgALIAEgBUEDcjYCBCABIAVqIgYgAEEDdCIAIAVrIgRBAXI2AgQgACABaiAENgIAQfyMwAAoAgAiAgRAIAJBeHFB7IrAAGohAEGEjcAAKAIAIQMCf0H0jMAAKAIAIgVBASACQQN2dCICcUUEQEH0jMAAIAIgBXI2AgAgAAwBCyAAKAIICyECIAAgAzYCCCACIAM2AgwgAyAANgIMIAMgAjYCCAtBhI3AACAGNgIAQfyMwAAgBDYCACABQQhqDwsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAJBFGooAgAiAUUNACAAQRRqIAE2AgAgASAANgIYCwJAAkAgBEEQTwRAIAIgBUEDcjYCBCACIAVqIgUgBEEBcjYCBCAEIAVqIAQ2AgBB/IzAACgCACIDRQ0BIANBeHFB7IrAAGohAEGEjcAAKAIAIQECf0H0jMAAKAIAIgZBASADQQN2dCIDcUUEQEH0jMAAIAMgBnI2AgAgAAwBCyAAKAIICyEDIAAgATYCCCADIAE2AgwgASAANgIMIAEgAzYCCAwBCyACIAQgBWoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBC0GEjcAAIAU2AgBB/IzAACAENgIACyACQQhqDwsgACACckUEQEEAIQJBAiAHdCIAQQAgAGtyIAhxIgBFDQMgAGhBAnRB3InAAGooAgAhAAsgAEUNAQsDQCAAIAIgACgCBEF4cSIDIAVrIgYgBEkiBxshCCAAKAIQIgFFBEAgAEEUaigCACEBCyACIAggAyAFSSIAGyECIAQgBiAEIAcbIAAbIQQgASIADQALCyACRQ0AIAVB/IzAACgCACIATSAEIAAgBWtPcQ0AIAIoAhghBwJAAkAgAiACKAIMIgBGBEAgAkEUQRAgAkEUaiIAKAIAIgMbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyAAIAJBEGogAxshAwNAIAMhBiABIgBBFGoiASAAQRBqIAEoAgAiARshAyAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQMgAiACKAIcQQJ0QdyJwABqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNBAwDCyABIAA2AgAgAA0CQfiMwABB+IzAACgCAEF+IAIoAhx3cTYCAAwDCwJAAkACQAJAAkAgBUH8jMAAKAIAIgFLBEAgBUGAjcAAKAIAIgBPBEBBACEEIAVBr4AEaiIAQRB2QAAiAUF/RiIDDQcgAUEQdCICRQ0HQYyNwABBACAAQYCAfHEgAxsiBEGMjcAAKAIAaiIANgIAQZCNwABBkI3AACgCACIBIAAgACABSRs2AgACQAJAQYiNwAAoAgAiAwRAQdyKwAAhAANAIAAoAgAiASAAKAIEIgZqIAJGDQIgACgCCCIADQALDAILQZiNwAAoAgAiAEEAIAAgAk0bRQRAQZiNwAAgAjYCAAtBnI3AAEH/HzYCAEHgisAAIAQ2AgBB3IrAACACNgIAQfiKwABB7IrAADYCAEGAi8AAQfSKwAA2AgBB9IrAAEHsisAANgIAQYiLwABB/IrAADYCAEH8isAAQfSKwAA2AgBBkIvAAEGEi8AANgIAQYSLwABB/IrAADYCAEGYi8AAQYyLwAA2AgBBjIvAAEGEi8AANgIAQaCLwABBlIvAADYCAEGUi8AAQYyLwAA2AgBBqIvAAEGci8AANgIAQZyLwABBlIvAADYCAEGwi8AAQaSLwAA2AgBBpIvAAEGci8AANgIAQeiKwABBADYCAEG4i8AAQayLwAA2AgBBrIvAAEGki8AANgIAQbSLwABBrIvAADYCAEHAi8AAQbSLwAA2AgBBvIvAAEG0i8AANgIAQciLwABBvIvAADYCAEHEi8AAQbyLwAA2AgBB0IvAAEHEi8AANgIAQcyLwABBxIvAADYCAEHYi8AAQcyLwAA2AgBB1IvAAEHMi8AANgIAQeCLwABB1IvAADYCAEHci8AAQdSLwAA2AgBB6IvAAEHci8AANgIAQeSLwABB3IvAADYCAEHwi8AAQeSLwAA2AgBB7IvAAEHki8AANgIAQfiLwABB7IvAADYCAEGAjMAAQfSLwAA2AgBB9IvAAEHsi8AANgIAQYiMwABB/IvAADYCAEH8i8AAQfSLwAA2AgBBkIzAAEGEjMAANgIAQYSMwABB/IvAADYCAEGYjMAAQYyMwAA2AgBBjIzAAEGEjMAANgIAQaCMwABBlIzAADYCAEGUjMAAQYyMwAA2AgBBqIzAAEGcjMAANgIAQZyMwABBlIzAADYCAEGwjMAAQaSMwAA2AgBBpIzAAEGcjMAANgIAQbiMwABBrIzAADYCAEGsjMAAQaSMwAA2AgBBwIzAAEG0jMAANgIAQbSMwABBrIzAADYCAEHIjMAAQbyMwAA2AgBBvIzAAEG0jMAANgIAQdCMwABBxIzAADYCAEHEjMAAQbyMwAA2AgBB2IzAAEHMjMAANgIAQcyMwABBxIzAADYCAEHgjMAAQdSMwAA2AgBB1IzAAEHMjMAANgIAQeiMwABB3IzAADYCAEHcjMAAQdSMwAA2AgBB8IzAAEHkjMAANgIAQeSMwABB3IzAADYCAEGIjcAAIAI2AgBB7IzAAEHkjMAANgIAQYCNwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBlI3AAEGAgIABNgIADAgLIAIgA00gASADS3INACAAKAIMRQ0DC0GYjcAAQZiNwAAoAgAiACACIAAgAkkbNgIAIAIgBGohAUHcisAAIQACQAJAA0AgASAAKAIARwRAIAAoAggiAA0BDAILCyAAKAIMRQ0BC0HcisAAIQADQAJAIAMgACgCACIBTwRAIAEgACgCBGoiBiADSw0BCyAAKAIIIQAMAQsLQYiNwAAgAjYCAEGAjcAAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQZSNwABBgICAATYCACADIAZBIGtBeHFBCGsiACAAIANBEGpJGyIBQRs2AgRB3IrAACkCACEJIAFBEGpB5IrAACkCADcCACABIAk3AghB4IrAACAENgIAQdyKwAAgAjYCAEHkisAAIAFBCGo2AgBB6IrAAEEANgIAIAFBHGohAANAIABBBzYCACAAQQRqIgAgBkkNAAsgASADRg0HIAEgASgCBEF+cTYCBCADIAEgA2siAEEBcjYCBCABIAA2AgAgAEGAAk8EQCADIAAQCAwICyAAQXhxQeyKwABqIQECf0H0jMAAKAIAIgJBASAAQQN2dCIAcUUEQEH0jMAAIAAgAnI2AgAgAQwBCyABKAIICyEAIAEgAzYCCCAAIAM2AgwgAyABNgIMIAMgADYCCAwHCyAAIAI2AgAgACAAKAIEIARqNgIEIAIgBUEDcjYCBCABIAIgBWoiA2shBSABQYiNwAAoAgBGDQMgAUGEjcAAKAIARg0EIAEoAgQiBEEDcUEBRgRAIAEgBEF4cSIAEAcgACAFaiEFIAAgAWoiASgCBCEECyABIARBfnE2AgQgAyAFQQFyNgIEIAMgBWogBTYCACAFQYACTwRAIAMgBRAIDAYLIAVBeHFB7IrAAGohAAJ/QfSMwAAoAgAiAUEBIAVBA3Z0IgRxRQRAQfSMwAAgASAEcjYCACAADAELIAAoAggLIQUgACADNgIIIAUgAzYCDCADIAA2AgwgAyAFNgIIDAULQYCNwAAgACAFayIBNgIAQYiNwABBiI3AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBCAAQQhqIQQMBgtBhI3AACgCACEAAkAgASAFayICQQ9NBEBBhI3AAEEANgIAQfyMwABBADYCACAAIAFBA3I2AgQgACABaiIBIAEoAgRBAXI2AgQMAQtB/IzAACACNgIAQYSNwAAgACAFaiIDNgIAIAMgAkEBcjYCBCAAIAFqIAI2AgAgACAFQQNyNgIECwwICyAAIAQgBmo2AgRBiI3AAEGIjcAAKAIAIgBBD2pBeHEiAUEIayICNgIAQYCNwABBgI3AACgCACAEaiIDIAAgAWtqQQhqIgE2AgAgAiABQQFyNgIEIAAgA2pBKDYCBEGUjcAAQYCAgAE2AgAMAwtBiI3AACADNgIAQYCNwABBgI3AACgCACAFaiIANgIAIAMgAEEBcjYCBAwBC0GEjcAAIAM2AgBB/IzAAEH8jMAAKAIAIAVqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAAsgAkEIag8LQQAhBEGAjcAAKAIAIgAgBU0NAEGAjcAAIAAgBWsiATYCAEGIjcAAQYiNwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQMAwsgBA8LIAAgBzYCGCACKAIQIgEEQCAAIAE2AhAgASAANgIYCyACQRRqKAIAIgFFDQAgAEEUaiABNgIAIAEgADYCGAsCQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiASAEQQFyNgIEIAEgBGogBDYCACAEQYACTwRAIAEgBBAIDAILIARBeHFB7IrAAGohAAJ/QfSMwAAoAgAiA0EBIARBA3Z0IgRxRQRAQfSMwAAgAyAEcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIECyACQQhqDwsgAEEIagvtCwELfyAAKAIEIQcgACgCACEFAkACQAJAIAEoAgAiCiABKAIIIgByBEACQCAARQ0AIAUgB2ohCSABQQxqKAIAQQFqIQYgBSECA0ACQCACIQAgBkEBayIGRQ0AIAAgCUYNAgJ/IAAsAAAiBEEATgRAIARB/wFxIQQgAEEBagwBCyAALQABQT9xIQggBEEfcSECIARBX00EQCACQQZ0IAhyIQQgAEECagwBCyAALQACQT9xIAhBBnRyIQggBEFwSQRAIAggAkEMdHIhBCAAQQNqDAELIAJBEnRBgIDwAHEgAC0AA0E/cSAIQQZ0cnIiBEGAgMQARg0DIABBBGoLIgIgAyAAa2ohAyAEQYCAxABHDQEMAgsLIAAgCUYNACAALAAAIgJBAE4gAkFgSXIgAkFwSXJFBEAgAkH/AXFBEnRBgIDwAHEgAC0AA0E/cSAALQACQT9xQQZ0IAAtAAFBP3FBDHRycnJBgIDEAEYNAQsCQAJAIANFDQAgAyAHTwRAQQAhACADIAdGDQEMAgtBACEAIAMgBWosAABBQEgNAQsgBSEACyADIAcgABshByAAIAUgABshBQsgCkUNAyABKAIEIQsgB0EQTwRAIAcgBSAFQQNqQXxxIgRrIgZqIgpBA3EhCEEAIQlBACEAIAQgBUcEQCAEIAVBf3NqQQNPBEBBACEDA0AgACADIAVqIgIsAABBv39KaiACQQFqLAAAQb9/SmogAkECaiwAAEG/f0pqIAJBA2osAABBv39KaiEAIANBBGoiAw0ACwsgBSECA0AgACACLAAAQb9/SmohACACQQFqIQIgBkEBaiIGDQALCwJAIAhFDQAgBCAKQXxxaiICLAAAQb9/SiEJIAhBAUYNACAJIAIsAAFBv39KaiEJIAhBAkYNACAJIAIsAAJBv39KaiEJCyAKQQJ2IQggACAJaiEDA0AgBCEGIAhFDQRBwAEgCCAIQcABTxsiCUEDcSEKIAlBAnQhBEEAIQIgCUEETwRAIAYgBEHwB3FqIQwgBiEAA0AgAiAAKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIABBBGooAgAiAkF/c0EHdiACQQZ2ckGBgoQIcWogAEEIaigCACICQX9zQQd2IAJBBnZyQYGChAhxaiAAQQxqKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIQIgAEEQaiIAIAxHDQALCyAIIAlrIQggBCAGaiEEIAJBCHZB/4H8B3EgAkH/gfwHcWpBgYAEbEEQdiADaiEDIApFDQALIAYgCUH8AXFBAnRqIgIoAgAiAEF/c0EHdiAAQQZ2ckGBgoQIcSEAIApBAUYNAiAAIAIoAgQiAEF/c0EHdiAAQQZ2ckGBgoQIcWohACAKQQJGDQIgACACKAIIIgBBf3NBB3YgAEEGdnJBgYKECHFqIQAMAgsgB0UEQEEAIQMMAwsgB0EDcSECAkAgB0EESQRAQQAhA0EAIQYMAQtBACEDIAUhACAHQXxxIgYhBANAIAMgACwAAEG/f0pqIABBAWosAABBv39KaiAAQQJqLAAAQb9/SmogAEEDaiwAAEG/f0pqIQMgAEEEaiEAIARBBGsiBA0ACwsgAkUNAiAFIAZqIQADQCADIAAsAABBv39KaiEDIABBAWohACACQQFrIgINAAsMAgsMAgsgAEEIdkH/gRxxIABB/4H8B3FqQYGABGxBEHYgA2ohAwsCQCADIAtJBEAgCyADayEDQQAhAAJAAkACQCABLQAgQQFrDgIAAQILIAMhAEEAIQMMAQsgA0EBdiEAIANBAWpBAXYhAwsgAEEBaiEAIAFBGGooAgAhAiABKAIQIQYgASgCFCEBA0AgAEEBayIARQ0CIAEgBiACKAIQEQMARQ0AC0EBDwsMAQtBASEAIAEgBSAHIAIoAgwRAAAEf0EBBUEAIQACfwNAIAMgACADRg0BGiAAQQFqIQAgASAGIAIoAhARAwBFDQALIABBAWsLIANJCw8LIAEoAhQgBSAHIAFBGGooAgAoAgwRAAALpgYCDX8BfiMAQTBrIgckAEEnIQICQCAAQpDOAFQEQCAAIQ8MAQsDQCAHQQlqIAJqIgZBBGsgAEKQzgCAIg9C8LEDfiAAfKciBEH//wNxQeQAbiIDQQF0QciGwABqLwAAOwAAIAZBAmsgA0Gcf2wgBGpB//8DcUEBdEHIhsAAai8AADsAACACQQRrIQIgAEL/wdcvViAPIQANAAsLIA+nIgRB4wBLBEAgAkECayICIAdBCWpqIA+nIgNB//8DcUHkAG4iBEGcf2wgA2pB//8DcUEBdEHIhsAAai8AADsAAAsCQCAEQQpPBEAgAkECayICIAdBCWpqIARBAXRByIbAAGovAAA7AAAMAQsgAkEBayICIAdBCWpqIARBMGo6AAALQScgAmshCEEBIQVBK0GAgMQAIAEoAhwiBEEBcSIMGyEJIARBHXRBH3VB6IjAAHEhCiAHQQlqIAJqIQsCQCABKAIARQRAIAEoAhQiAyABKAIYIgEgCSAKEEcNASADIAsgCCABKAIMEQAAIQUMAQsgASgCBCINIAggDGoiA00EQCABKAIUIgMgASgCGCIBIAkgChBHDQEgAyALIAggASgCDBEAACEFDAELIARBCHEEQCABKAIQIQQgAUEwNgIQIAEtACAhAyABQQE6ACAgASgCFCIOIAEoAhgiBiAJIAoQRw0BIAIgDWogDGtBJmshAgNAIAJBAWsiAgRAIA5BMCAGKAIQEQMARQ0BDAMLCyAOIAsgCCAGKAIMEQAADQEgASADOgAgIAEgBDYCEEEAIQUMAQsgDSADayEDAkACQAJAIAEtACAiAkEBaw4DAAEAAgsgAyECQQAhAwwBCyADQQF2IQIgA0EBakEBdiEDCyACQQFqIQIgAUEYaigCACEGIAEoAhAhBCABKAIUIQECQANAIAJBAWsiAkUNASABIAQgBigCEBEDAEUNAAsMAQsgASAGIAkgChBHDQAgASALIAggBigCDBEAAA0AQQAhAgNAIAIgA0YEQEEAIQUMAgsgAkEBaiECIAEgBCAGKAIQEQMARQ0ACyACQQFrIANJIQULIAdBMGokACAFC/wFAQV/IABBCGsiASAAQQRrKAIAIgNBeHEiAGohAgJAAkACQAJAIANBAXENACADQQNxRQ0BIAEoAgAiAyAAaiEAIAEgA2siAUGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAA2AgAgAiACKAIEQX5xNgIEIAEgAEEBcjYCBCACIAA2AgAPCyABIAMQBwsCQAJAIAIoAgQiA0ECcUUEQCACQYiNwAAoAgBGDQIgAkGEjcAAKAIARg0FIAIgA0F4cSICEAcgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFBhI3AACgCAEcNAUH8jMAAIAA2AgAPCyACIANBfnE2AgQgASAAQQFyNgIEIAAgAWogADYCAAsgAEGAAkkNAiABIAAQCEEAIQFBnI3AAEGcjcAAKAIAQQFrIgA2AgAgAA0BQeSKwAAoAgAiAARAA0AgAUEBaiEBIAAoAggiAA0ACwtBnI3AAEH/HyABIAFB/x9NGzYCAA8LQYiNwAAgATYCAEGAjcAAQYCNwAAoAgAgAGoiADYCACABIABBAXI2AgRBhI3AACgCACABRgRAQfyMwABBADYCAEGEjcAAQQA2AgALIABBlI3AACgCACIDTQ0AQYiNwAAoAgAiAkUNAEEAIQECQEGAjcAAKAIAIgRBKUkNAEHcisAAIQADQCACIAAoAgAiBU8EQCAFIAAoAgRqIAJLDQILIAAoAggiAA0ACwtB5IrAACgCACIABEADQCABQQFqIQEgACgCCCIADQALC0GcjcAAQf8fIAEgAUH/H00bNgIAIAMgBE8NAEGUjcAAQX82AgALDwsgAEF4cUHsisAAaiECAn9B9IzAACgCACIDQQEgAEEDdnQiAHFFBEBB9IzAACAAIANyNgIAIAIMAQsgAigCCAshACACIAE2AgggACABNgIMIAEgAjYCDCABIAA2AggPC0GEjcAAIAE2AgBB/IzAAEH8jMAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAv7BAEBfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQYAEaw4mAQIDBAUGBwgsCQoLDA0sLCwsLCwsLCwsLCwsLCwsLCwODywsLBAAC0EBIQECQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABBAWsODkEBAgMEBQZCBwgJCgsMAAsCQCAAQcAEaw4MJygpKissLS4vMDEyAAsCQCAAQYECaw4KDQ4PEBESExQVFgALAkAgAEGABmsOCTM0NTY3QkI4OQALAkAgAEGACmsOBTw9Pj9AAAsgAEGACGsOAjk6QQtBAg8LQQMPC0EEDwtBBQ8LQQYPC0EHDwtBCQ8LQQoPC0ELDwtBDA8LQQ0PC0EODwtBgQIPC0GCAg8LQYMCDwtBhAIPC0GFAg8LQYYCDwtBhwIPC0GIAg8LQYkCDwtBigIPC0GABA8LQYEEDwtBggQPC0GDBA8LQYQEDwtBhQQPC0GGBA8LQYcEDwtBiQQPC0GKBA8LQYsEDwtBjAQPC0GNBA8LQaAEDwtBoQQPC0GlBA8LQcAEDwtBwQQPC0HCBA8LQcMEDwtBxAQPC0HFBA8LQcYEDwtBxwQPC0HIBA8LQckEDwtBygQPC0HLBA8LQYAGDwtBgQYPC0GCBg8LQYMGDwtBhAYPC0GHBg8LQYgGDwtBgAgPC0GBCA8LQYAKDwtBgQoPC0GCCg8LQYMKDwtBhAohAQsgAQ8LQeCCwABBGRDSAQAL+AMBAn8gACABaiECAkACQCAAKAIEIgNBAXENACADQQNxRQ0BIAAoAgAiAyABaiEBIAAgA2siAEGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAE2AgAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCACIAE2AgAPCyAAIAMQBwsCQAJAAkAgAigCBCIDQQJxRQRAIAJBiI3AACgCAEYNAiACQYSNwAAoAgBGDQMgAiADQXhxIgIQByAAIAEgAmoiAUEBcjYCBCAAIAFqIAE2AgAgAEGEjcAAKAIARw0BQfyMwAAgATYCAA8LIAIgA0F+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACyABQYACTwRAIAAgARAIDAMLIAFBeHFB7IrAAGohAgJ/QfSMwAAoAgAiA0EBIAFBA3Z0IgFxRQRAQfSMwAAgASADcjYCACACDAELIAIoAggLIQEgAiAANgIIIAEgADYCDCAAIAI2AgwgACABNgIIDwtBiI3AACAANgIAQYCNwABBgI3AACgCACABaiIBNgIAIAAgAUEBcjYCBCAAQYSNwAAoAgBHDQFB/IzAAEEANgIAQYSNwABBADYCAA8LQYSNwAAgADYCAEH8jMAAQfyMwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgACABaiABNgIACwv7AgEEfyAAKAIMIQICQAJAIAFBgAJPBEAgACgCGCEDAkACQCAAIAJGBEAgAEEUQRAgAEEUaiICKAIAIgQbaigCACIBDQFBACECDAILIAAoAggiASACNgIMIAIgATYCCAwBCyACIABBEGogBBshBANAIAQhBSABIgJBFGoiASACQRBqIAEoAgAiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QdyJwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQfiMwABB+IzAACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB9IzAAEH0jMAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIABBFGooAgAiAEUNACACQRRqIAA2AgAgACACNgIYCwusAgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QdyJwABqIQQCQEH4jMAAKAIAIgVBASACdCIDcUUEQEH4jMAAIAMgBXI2AgAgBCAANgIAIAAgBDYCGAwBCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEEA0AgAyAEQR12QQRxakEQaiIFKAIAIgJFDQIgBEEBdCEEIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAFIAA2AgAgACADNgIYCyAAIAA2AgwgACAANgIIC2kBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYD+A3EgAEEYdnJyELsBIAFBEGokAAt5AQN/IAEQxAECQCABKAIAIgJBf0cEQCABIAJBAWo2AgAgASgCBCgAACIDQRh0QRZ1QfyCwABqKAIAIQRBAUEEEMcBIgJFDQEgAiAEIANBgH5xcjYAACABIAEoAgBBAWs2AgAgAEEENgIEIAAgAjYCAA8LEM4BAAsAC2YBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYDgA3FyQQx2ELwBIAFBEGokAAtuAQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggiAC8AACAAQQJqLQAAQRB0chDVASEAIAEoAgwiAiACKAIAQQFrNgIAQQhBBBC6ASICIABBCHZBgB5xIABBGHZyOwEEIAJBADYCACABQRBqJAAgAgttAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQRxqQgE3AgAgAUECNgIUIAFB9IDAADYCECABQQI2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQSQALIAFBMGokACAAC24BAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQRxqQgE3AgAgAUECNgIUIAFBuIHAADYCECABQQM2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQSQALIAFBMGokACAAC10BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQR52IABBDnZBPHFyELwBIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ8gELFgAgAEHQgsAAQcCCwABBgICACBDyAQtMACADQf8BcSABQf8BcUEMdCAAQf8BcUESdHIiACACQf8BcUEGdHJyIgFBEHRBgID8B3EgAEEIdkGA/gNxIAFBgP4DcUEIdHJBCHZyC1UCAX8BfiMAQRBrIgIkACABEMQBIAJBCGogARBUIAIoAgxBADYCACABKQIAIQMgARAEIAAgA0IoiKdBAXE6AAEgACADQiCIp0EBcToAACACQRBqJAALEAAgACABIAIgA0HiABD0AQsQACAAIAEgAiADQeMAEPQBC08BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDIARC8ASABQRBqJAALVQEDfyMAQRBrIgEkACABQQhqIAAQSiABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENUBQRh2QT9xELwBIAFBEGokAAtSAQF/IAAQUSECIAEQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgACACQf8BcUESdHIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyrUIghjcCACABCxAAIAAgASACIANB3gAQ9QELEAAgACABIAIgA0HfABD1AQsQACAAIAEgAiADQeAAEPUBCxAAIAAgASACIANB4QAQ9QELUQIBfwF+IwBBEGsiAiQAIAEQxAEgAkEIaiABEFQgAigCDEEANgIAIAEpAgAhAyABEAQgACADQiiIPAABIAAgA0IgiKdBAXE6AAAgAkEQaiQACz4BAX8jAEEQayIEJAAgABBRIAEQUSACEFEgBEEIaiADEBMgBC0ACEEBcSAELQAJQQFxEHoQrAEgBEEQaiQAC0kBAX8gABBRIQAgARBRIQFBCEEEELoBIgIgAUH/AXFBDHQgAEESdHIiAEGA4ANxQQh0IABBCHZBgP4DcXJBCHatQiCGNwIAIAILDAAgACABQcsAEPYBCwwAIAAgAUHMABD2AQsMACAAIAFBzQAQ9gELDAAgACABQc4AEPYBCwwAIAAgAUHPABD2AQsMACAAIAFB0AAQ9gELPAEBfyMAQRBrIgQkACAAEFEgARBRIAIQUSAEQQhqIAMQHSAELQAIQQFxIAQtAAkQvgEQrAEgBEEQaiQAC0gAIAAQxAEgACgCAEF/RgRAEM4BAAsgAC8ABCAAQQZqLQAAQRB0chDVASIAQYD+A3FBCHQgAEEIdkGA/gNxIABBGHZychC7AQsLACAAIAFBBxD3AQs/AQJ/AkAgABBRIgBBGHENACAAQQdxIgJBB0YNAEEIQQQQugEiASAAQQV2QQFxrUIghiACrUIohoQ3AgALIAELCwAgACABQQgQ9wELPwAgAkEWdEGAgIAGcSABQf8BcUEMdCIBIAJB/AFxQQZ0ckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCwsAIAAgAUEKEPgBCwsAIAAgAUEMEPgBCwsAIAAgAUEUEPgBCwsAIAAgAUEWEPgBCwsAIAAgAUEZEPgBCwsAIAAgAUEbEPgBCwsAIAAgAUEeEPgBCwsAIAAgAUEfEPgBCwsAIAAgAUEkEPgBCwsAIAAgAUEyEPgBCz8AIAAQUSEAIAEQUyIBQRB0QYCA/AdxIABB/wFxQRJ0IAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2chCsAQtAAQF/IAAQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyrUIghjcCACABCzgAIAJBEHRBgID8B3EgAUH/AXFBDHQiASACckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCzwBAn8jAEEQayIBJAAgABDEASABQQhqIAAQSyABKAIILQABIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAs8AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEEsgASgCCC0AACABKAIMIgIgAigCAEEBazYCACABQRBqJAALOQEBfyMAQRBrIgIkACAAEMQBIAJBCGogABBUIAIoAgwgAigCCCABQQBHOgAAQQA2AgAgAkEQaiQACzkBAX8jAEEQayICJAAgABDEASACQQhqIAAQVCACKAIMIAIoAgggAUEARzoAAUEANgIAIAJBEGokAAs4AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEFQgASgCDEEANgIAIAAtAAQgABAEIAFBEGokAEEBcQs3AQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggtAAQgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzcBAn8jAEEQayIBJAAgAUEIaiAAEEogASgCCCgCACABKAIMIgIgAigCAEEBazYCACABQRBqJAALCgAgAEHVABD5AQsKACAAQdYAEPkBCwoAIABB1wAQ+QELCgAgAEHaABD5AQsKACAAQdsAEPkBCwoAIABB3AAQ+QELCgAgAEHdABD5AQs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAwANARoLIAMNAUEACw8LIAAgA0EAIAEoAgwRAAALMQEBfyMAQRBrIgEkACABQQhqIAAQHSABLQAJIAEtAAhBBXRBIHFyELwBIAFBEGokAAuhAgEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQbiGwAA2AhAgAkHoiMAANgIMIAJBDGoiACgCCCIBRQRAIwBBIGsiACQAIABBDGpCADcCACAAQQE2AgQgAEHoiMAANgIIIABBKzYCHCAAQZCIwAA2AhggACAAQRhqNgIAIABB2IjAABBJAAsgAUEMaigCACECAkACQCABKAIEDgIAAAELIAINAAsgAC0AECEBIAAtABEaQdiJwABB2InAACgCACIAQQFqNgIAAkAgAEEASA0AQaSNwAAtAABBAXENAEGkjcAAQQE6AABBoI3AAEGgjcAAKAIAQQFqNgIAQdSJwAAoAgBBAEgNAEGkjcAAQQA6AAAgAUUNAAALAAs1AQF/IAEQxAEgASgCACICQX9GBEAQzgEACyABIAJBAWo2AgAgACABNgIEIAAgAUEEajYCAAsxAQF/IAEoAgAiAkF/RwRAIAEgAkEBajYCACAAIAE2AgQgACABQQRqNgIADwsQzgEACzUBAX8gAEE2TwRAQeCCwABBGRDSAQALQQxBBBC6ASICIAA6AAggAiABNgIEIAJBADYCACACCzAAIAAQUSABEFEgAhBRIAMQURASIQBBCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQstACAAEMQBIAAoAgBBf0YEQBDOAQALIAAvAAQgAEEGai0AAEEQdHIQyAEQvAELLAAgABBRIAEQUSACEFEQKyEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELLAAgABBRIAEQUSACEFIQOCEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELJQEBfwJAIAAEQCAAKAIADQEgAC0ABCAAEAQPCxDNAQALEM4BAAslAQF/AkAgAARAIAAoAgANASAALwEEIAAQBA8LEM0BAAsQzgEACyUBAX8CQCAABEAgACgCAA0BIAAoAgQgABAEDwsQzQEACxDOAQALKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LEM4BAAspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeQAchDFARC7AQspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeUAchDFARC7AQslAQF/IAAQUSEAQQhBBBC6ASIBIABBAnRB/AFxrUIghjcCACABCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ0gEACyABAX8gABDEASAAKAIABEAQzgEACyAAKAIEIAAQBBAECyMAIAIQBSECIAAQvQEgARC9ASACEDhBCHRBygByEMUBELsBCx4AAkAgAARAIAAoAgANASAAEAQPCxDNAQALEM4BAAsPACAAIAEgAiADQRIQ7gELDwAgACABIAIgA0EYEO4BCw8AIAAgASACIANBHBDuAQsPACAAIAEgAiADQR0Q7gELDwAgACABIAIgA0EiEO4BCw8AIAAgASACIANBIxDuAQsPACAAIAEgAiADQSgQ7gELDwAgACABIAIgA0EqEO4BCw8AIAAgASACIANBLBDuAQsPACAAIAEgAiADQTgQ7gELEAAgACABIAIgA0HTABDvAQsQACAAIAEgAiADQdQAEO8BCxAAIAAgASACIANB3gAQ7wELEAAgACABIAIgA0HfABDvAQsQACAAIAEgAiADQeAAEO8BCxAAIAAgASACIANB4QAQ7wELEAAgACABIAIgA0HiABDvAQsQACAAIAEgAiADQeMAEO8BCxAAIAAgASACIANB5AAQ7wELEAAgACABIAIgA0HlABDvAQsQACAAIAEgAiADQeYAEO4BCxAAIAAgASACIANB5wAQ7gELEAAgACABIAIgA0HoABDuAQsQACAAIAEgAiADQekAEO4BCxAAIAAgASACIANB6gAQ7gELEAAgACABIAIgA0HrABDuAQsQACAAIAEgAiADQewAEO4BCx0BAX8jAEEQayIBJAAgAUEIaiAAEB0gAUEQaiQACx0BAX8jAEEQayIBJAAgAUEIaiAAEBMgAUEQaiQACx8AIAEQWCEBIAAQvQEgARC3AUEIdEHMAHIQxQEQuwELGQAgACABIAJBIEEAIAQbQRBBACADG3IQEgsNACAAIAEgAkEBEPABCw0AIAAgASACQQIQ8AELDQAgACABIAJBAxDwAQsNACAAIAEgAkEEEPABCw0AIAAgASACQQUQ8AELDQAgACABIAJBBhDwAQsNACAAIAEgAkEHEPABCw0AIAAgASACQQgQ8AELDQAgACABIAJBCRDwAQsNACAAIAEgAkELEPABCw0AIAAgASACQQ0Q8AELDQAgACABIAJBDhDwAQsNACAAIAEgAkEPEPABCw0AIAAgASACQRAQ8AELDQAgACABIAJBERDwAQsNACAAIAEgAkEXEPABCw0AIAAgASACQSEQ8AELDQAgACABIAJBJhDwAQsNACAAIAEgAkEnEPABCw0AIAAgASACQSkQ8AELDQAgACABIAJBKxDwAQsNACAAIAEgAkEtEPABCw0AIAAgASACQS4Q8AELDQAgACABIAJBLxDwAQsNACAAIAEgAkEwEPABCw0AIAAgASACQTEQ8AELDQAgACABIAJBNRDwAQsNACAAIAEgAkE3EPABCw0AIAAgASACQTkQ8QELDQAgACABIAJBOhDxAQsNACAAIAEgAkE7EPEBCw0AIAAgASACQTwQ8QELDQAgACABIAJBPRDxAQsNACAAIAEgAkE+EPEBCw0AIAAgASACQT8Q8QELDgAgACABIAJBwAAQ8QELDgAgACABIAJBwQAQ8QELDgAgACABIAJBwgAQ8QELDgAgACABIAJBwwAQ8QELDgAgACABIAJBxAAQ8QELDgAgACABIAJBxQAQ8QELDgAgACABIAJBxgAQ8QELDgAgACABIAJBxwAQ8QELDgAgACABIAJByAAQ8QELDgAgACABIAJByQAQ8QELDgAgACABIAJBygAQ8QELDgAgACABIAJB0QAQ8QELDgAgACABIAJB0gAQ8QELGAEBfyAAQf8BcUE/TQR/IAAQvAEFQQALCx4BAX9BCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQsbACAAEMQBIAAoAgBBf0YEQBDOAQALIAAtAAQLCQAgAEETEPMBCwkAIABBFRDzAQsJACAAQRoQ8wELCQAgAEEgEPMBCwkAIABBJRDzAQsJACAAQTQQ8wELCQAgAEE2EPMBCwoAIABB2AAQ8wELCgAgAEHZABDzAQsXACABQRB0QYCA/AdxIABBAnRB/AFxcgsXACAAEMQBIAAoAgAEQBDOAQALIAAQBAscACAAEL0BIAEQvQEgAhC9ARArQQh0EMUBELsBCxIAIAEgABDHASIABEAgAA8LAAsbAQF/QQhBBBC6ASIBIAA2AgQgAUEANgIAIAELGwEBf0EIQQQQugEiASAAOgAEIAFBADYCACABC24AIABB/wFxQcAATwRAIwBBMGsiACQAIABBIjYCDCAAQYCAwAA2AgggAEEcakIBNwIAIABBATYCFCAAQbCGwAA2AhAgAEEBNgIsIAAgAEEoajYCGCAAIABBCGo2AiggAEEQakG4gMAAEEkACyAACxQAIAAgASACQSBBACADGyAEchASCxgAIAAQUSABEFEgAhBRIAMQPRDCARCsAQsXACAAEFEgARBRIAIQUSADEFEQEhCsAQsTACAAEFEgARBRIAIQBRA4EKwBCxEAIAAgASACQSBBACADGxASCxMAIAAQUSABEFEgAhBSEDgQrAELDAAgAARADwsQzQEACxQBAX9BBEEBELoBIgEgADYAACABCxQBAX9BCEEEELoBIgBCADcCACAAC4EDAQV/QaWNwAAtAAAaAn8gAEEJTwRAAkBBzf97QRAgACAAQRBNGyIAayABTQ0AIABBECABQQtqQXhxIAFBC0kbIgRqQQxqEAEiAkUNACACQQhrIQECQCAAQQFrIgMgAnFFBEAgASEADAELIAJBBGsiBSgCACIGQXhxIAIgA2pBACAAa3FBCGsiAiAAQQAgAiABa0EQTRtqIgAgAWsiAmshAyAGQQNxBEAgACADIAAoAgRBAXFyQQJyNgIEIAAgA2oiAyADKAIEQQFyNgIEIAUgAiAFKAIAQQFxckECcjYCACABIAJqIgMgAygCBEEBcjYCBCABIAIQBgwBCyABKAIAIQEgACADNgIEIAAgASACajYCAAsCQCAAKAIEIgFBA3FFDQAgAUF4cSICIARBEGpNDQAgACAEIAFBAXFyQQJyNgIEIAAgBGoiASACIARrIgRBA3I2AgQgACACaiICIAIoAgRBAXI2AgQgASAEEAYLIABBCGohAwsgAwwBCyABEAELCw0AIAAQ1QFBCnZBP3ELEAAgABBRIAEQWBC3ARCsAQsgACAAQsWAsKa9qOHJSzcDCCAAQpXM9oWR7LDtHzcDAAsLACABBEAgABAECwsLACAAIwBqJAAjAAsNAEHoiMAAQRsQ0gEACw4AQYOJwABBzwAQ0gEACwsAIAAxAAAgARADCwsAIAAzAQAgARADCwsAIAA1AgAgARADCwkAIAAgARAAAAsKACAAQT9xELwBCwoAIAAQUUH/AXELBwAgAEEIdAsHACAAED0aCwcAIAAQURoLBwAgABBSGgsHACAAEFMaCwoAQTMQxQEQuwELBwBBCxC8AQsHAEEKELwBCwcAQQgQvAELBwBBDxC8AQsHAEEGELwBCwcAQQkQvAELBwBBBxC8AQsHAEEMELwBCwcAQQIQvAELBwBBARC8AQsHAEEDELwBCwcAQQ0QvAELBwBBDhC8AQsHAEEFELwBCwcAQQQQvAELBwBBEBC8AQsHAEEAELwBCwQAQQQLAgALJAAgABC9ASABEL0BIAIQvQEgAxC9ARASQQh0IARyEMUBELsBCyMAIAAQvQEgARC9ASACEL0BIAMQDRASQQh0IARyEMUBELsBCx8AIAAQvQEgARC9ASACEL0BECtBCHQgA3IQxQEQuwELHgAgABC9ASABEL0BIAIQDhA4QQh0IANyEMUBELsBC2IBAX8jAEEwayIEJAAgBCAANgIMIAAgA08EQCAEQRxqQgE3AgAgBEECNgIUIAQgAjYCECAEQQQ2AiwgBCAEQShqNgIYIAQgBEEMajYCKCAEQRBqIAEQSQALIARBMGokACAACxsAIAAQvQEaIABBCnRBgPgDcSABchDFARC7AQtSAQJ/IwBBEGsiBSQAIAVBCGogAxATIAUtAAkhAyAFLQAIIQYgABC9ASABEL0BIAIQvQEgBkEBcSADQQFxEHpBCHQgBHIQxQEQuwEgBUEQaiQAC1ABAn8jAEEQayIFJAAgBUEIaiADEB0gBS0ACCEDIAUtAAkhBiAAEL0BIAEQvQEgAhC9ASADQQFxIAYQvgFBCHQgBHIQxQEQuwEgBUEQaiQAC0oAIAAQvQEaIAEQECIBQRB0QYCA/AdxIABBEnRBgIDwH3EgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyQQh0IAJyEMUBELsBC0kBAX8jAEEQayIDJAAgABDEASABIAJPBEBB4ILAAEEZENIBAAsgA0EIaiAAEFQgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQgAgABC9ARogARC9ARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyEMUBELsBCzYAIAAQESIAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2ckEIdCABchDFARC7AQsL3AkBAEGAgMAAC9IJQ2hlY2tSZWdJZCB3YXMgZ2l2ZW4gaW52YWxpZCBSZWdJZGZ1ZWwtYXNtL3NyYy9saWIucnMAAAAiABAAEwAAAG4AAAAiAAAAVmFsdWUgYGAgb3V0IG9mIHJhbmdlIGZvciA2LWJpdCBpbW1lZGlhdGUAAABIABAABwAAAE8AEAAiAAAAIgAQABMAAACpAwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxMi1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAlAAQACMAAAAiABAAEwAAAK4DAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDE4LWJpdCBpbW1lZGlhdGUASAAQAAcAAADYABAAIwAAACIAEAATAAAAswMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMjQtYml0IGltbWVkaWF0ZQBIABAABwAAABwBEAAjAAAAIgAQABMAAAC4AwAAHAAAAGludmFsaWQgZW51bSB2YWx1ZSBwYXNzZWQAAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAkAAAAJEAAACSAAAAkwAAAJQAAACVAAAAlgAAAJcAAACYAAAAoAAAAKEAAACiAAAAowAAAKQAAAClAAAApgAAAKcAAACoAAAAqQAAAKoAAACrAAAArAAAAK0AAACwAAAAaAQQAAAAAAAFAAAAAAAAAAEAAAAGAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTljYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlbGlicmFyeS9zdGQvc3JjL3Bhbmlja2luZy5ycwA7BBAAHAAAAIQCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMC4zDHdhc20tYmluZGdlbgYwLjIuOTI=", e);
}
async function bo() {
  return await nu(Yh());
}
bo();
function Ja(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function Zh(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Ds(e, ...t) {
  if (!Zh(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function Wh(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ja(e.outputLen), Ja(e.blockLen);
}
function bs(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Jh(e, t) {
  Ds(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const ui = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const di = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Lt = (e, t) => e << 32 - t | e >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function qh(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Co(e) {
  return typeof e == "string" && (e = qh(e)), Ds(e), e;
}
function jh(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    Ds(s), t += s.length;
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, s), s += i.length;
  }
  return n;
}
class ru {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function $h(e) {
  const t = (r) => e().update(Co(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Kh(e = 32) {
  if (ui && typeof ui.getRandomValues == "function")
    return ui.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function eg(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), A = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + A, o, r), e.setUint32(t + h, c, r);
}
const tg = (e, t, n) => e & t ^ ~e & n, ng = (e, t, n) => e & t ^ e & n ^ t & n;
class rg extends ru {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = di(this.buffer);
  }
  update(t) {
    bs(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Co(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const A = di(t);
        for (; s <= i - o; o += s)
          this.process(A, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    bs(this), Jh(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let m = o; m < s; m++)
      n[m] = 0;
    eg(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = di(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = A / 4, I = this.get();
    if (h > I.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let m = 0; m < h; m++)
      c.setUint32(4 * m, I[m], i);
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
const sg = /* @__PURE__ */ new Uint32Array([
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
class ig extends rg {
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
    for (let m = 0; m < 16; m++, n += 4)
      rn[m] = t.getUint32(n, !1);
    for (let m = 16; m < 64; m++) {
      const x = rn[m - 15], _ = rn[m - 2], R = Lt(x, 7) ^ Lt(x, 18) ^ x >>> 3, C = Lt(_, 17) ^ Lt(_, 19) ^ _ >>> 10;
      rn[m] = C + rn[m - 7] + R + rn[m - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: A, G: h, H: I } = this;
    for (let m = 0; m < 64; m++) {
      const x = Lt(c, 6) ^ Lt(c, 11) ^ Lt(c, 25), _ = I + x + tg(c, A, h) + sg[m] + rn[m] | 0, C = (Lt(r, 2) ^ Lt(r, 13) ^ Lt(r, 22)) + ng(r, s, i) | 0;
      I = h, h = A, A = c, c = o + _ | 0, o = i, i = s, s = r, r = _ + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, A = A + this.F | 0, h = h + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, A, h, I);
  }
  roundClean() {
    rn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const og = /* @__PURE__ */ $h(() => new ig());
class su extends ru {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Wh(t);
    const r = Co(n);
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
    return bs(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    bs(this), Ds(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const iu = (e, t, n) => new su(e, t).update(n).digest();
iu.create = (e, t) => new su(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const gt = BigInt(0), ke = BigInt(1), _n = BigInt(2), ag = BigInt(3), Fi = BigInt(4), qa = BigInt(5), ja = BigInt(8);
BigInt(9);
BigInt(16);
function It(e, t) {
  const n = e % t;
  return n >= gt ? n : t + n;
}
function cg(e, t, n) {
  if (n <= gt || t < gt)
    throw new Error("Expected power/modulo > 0");
  if (n === ke)
    return gt;
  let r = ke;
  for (; t > gt; )
    t & ke && (r = r * e % n), e = e * e % n, t >>= ke;
  return r;
}
function _t(e, t, n) {
  let r = e;
  for (; t-- > gt; )
    r *= r, r %= n;
  return r;
}
function Mi(e, t) {
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
function ug(e) {
  const t = (e - ke) / _n;
  let n, r, s;
  for (n = e - ke, r = 0; n % _n === gt; n /= _n, r++)
    ;
  for (s = _n; s < e && cg(s, t, e) !== e - ke; s++)
    ;
  if (r === 1) {
    const o = (e + ke) / Fi;
    return function(A, h) {
      const I = A.pow(h, o);
      if (!A.eql(A.sqr(I), h))
        throw new Error("Cannot find square root");
      return I;
    };
  }
  const i = (n + ke) / _n;
  return function(c, A) {
    if (c.pow(A, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let h = r, I = c.pow(c.mul(c.ONE, s), n), m = c.pow(A, i), x = c.pow(A, n);
    for (; !c.eql(x, c.ONE); ) {
      if (c.eql(x, c.ZERO))
        return c.ZERO;
      let _ = 1;
      for (let C = c.sqr(x); _ < h && !c.eql(C, c.ONE); _++)
        C = c.sqr(C);
      const R = c.pow(I, ke << BigInt(h - _ - 1));
      I = c.sqr(R), m = c.mul(m, R), x = c.mul(x, I), h = _;
    }
    return m;
  };
}
function dg(e) {
  if (e % Fi === ag) {
    const t = (e + ke) / Fi;
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
      const i = r.mul(s, _n), o = r.pow(i, t), c = r.mul(s, o), A = r.mul(r.mul(c, _n), o), h = r.mul(c, r.sub(A, r.ONE));
      if (!r.eql(r.sqr(h), s))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  return ug(e);
}
const Ag = [
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
function lg(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = Ag.reduce((r, s) => (r[s] = "function", r), t);
  return Tr(e, n);
}
function fg(e, t, n) {
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
function hg(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, c) => e.is0(o) ? i : (n[c] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, c) => e.is0(o) ? i : (n[c] = e.mul(i, n[c]), e.mul(i, o)), s), n;
}
function ou(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function gg(e, t, n = !1, r = {}) {
  if (e <= gt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = ou(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = dg(e), c = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: wo(s),
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
    pow: (A, h) => fg(c, A, h),
    div: (A, h) => It(A * Mi(h, e), e),
    // Same as above, but doesn't normalize
    sqrN: (A) => A * A,
    addN: (A, h) => A + h,
    subN: (A, h) => A - h,
    mulN: (A, h) => A * h,
    inv: (A) => Mi(A, e),
    sqrt: r.sqrt || ((A) => o(c, A)),
    invertBatch: (A) => hg(c, A),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (A, h, I) => I ? h : A,
    toBytes: (A) => n ? mo(A, i) : er(A, i),
    fromBytes: (A) => {
      if (A.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${A.length}`);
      return n ? po(A) : Nn(A);
    }
  });
  return Object.freeze(c);
}
function au(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function cu(e) {
  const t = au(e);
  return t + Math.ceil(t / 2);
}
function pg(e, t, n = !1) {
  const r = e.length, s = au(t), i = cu(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Nn(e) : po(e), c = It(o, t - ke) + ke;
  return n ? mo(c, s) : er(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const mg = BigInt(0), Ai = BigInt(1);
function wg(e, t) {
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
      for (; i > mg; )
        i & Ai && (o = o.add(c)), c = c.double(), i >>= Ai;
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
      let h = s, I = h;
      for (let m = 0; m < o; m++) {
        I = h, A.push(I);
        for (let x = 1; x < c; x++)
          I = I.add(h), A.push(I);
        h = I.double();
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
      let h = e.ZERO, I = e.BASE;
      const m = BigInt(2 ** s - 1), x = 2 ** s, _ = BigInt(s);
      for (let R = 0; R < c; R++) {
        const C = R * A;
        let F = Number(o & m);
        o >>= _, F > A && (F -= x, o += Ai);
        const M = C, G = C + Math.abs(F) - 1, L = R % 2 !== 0, W = F < 0;
        F === 0 ? I = I.add(n(L, i[M])) : h = h.add(n(W, i[G]));
      }
      return { p: h, f: I };
    },
    wNAFCached(s, i, o, c) {
      const A = s._WINDOW_SIZE || 1;
      let h = i.get(s);
      return h || (h = this.precomputeWindow(s, A), A !== 1 && i.set(s, c(h))), this.wNAF(A, h, o);
    }
  };
}
function uu(e) {
  return lg(e.Fp), Tr(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...ou(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function yg(e) {
  const t = uu(e);
  Tr(t, {
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
const { bytesToNumberBE: Ig, hexToBytes: Eg } = uf, vn = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = vn;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: Ig(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = vn, n = typeof e == "string" ? Eg(e) : e;
    Dr(n);
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = vn._parseInt(n.subarray(2)), { d: o, l: c } = vn._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (h) => Number.parseInt(h[0], 16) & 8 ? "00" + h : h, n = (h) => {
      const I = h.toString(16);
      return I.length & 1 ? `0${I}` : I;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, c = n(i), A = n(o);
    return `30${n(o + i + 4)}02${A}${s}02${c}${r}`;
  }
}, Zt = BigInt(0), vt = BigInt(1);
BigInt(2);
const $a = BigInt(3);
BigInt(4);
function bg(e) {
  const t = yg(e), { Fp: n } = t, r = t.toBytes || ((R, C, F) => {
    const M = C.toAffine();
    return Br(Uint8Array.from([4]), n.toBytes(M.x), n.toBytes(M.y));
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
  function c(R) {
    if (!o(R))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function A(R) {
    const { allowedPrivateKeyLengths: C, nByteLength: F, wrapPrivateKey: M, n: G } = t;
    if (C && typeof R != "bigint") {
      if (Tn(R) && (R = $n(R)), typeof R != "string" || !C.includes(R.length))
        throw new Error("Invalid key");
      R = R.padStart(F * 2, "0");
    }
    let L;
    try {
      L = typeof R == "bigint" ? R : Nn(Nt("private key", R, F));
    } catch {
      throw new Error(`private key must be ${F} bytes, hex or bigint, not ${typeof R}`);
    }
    return M && (L = It(L, G)), c(L), L;
  }
  const h = /* @__PURE__ */ new Map();
  function I(R) {
    if (!(R instanceof m))
      throw new Error("ProjectivePoint expected");
  }
  class m {
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
      if (C instanceof m)
        throw new Error("projective point not allowed");
      const G = (L) => n.eql(L, n.ZERO);
      return G(F) && G(M) ? m.ZERO : new m(F, M, n.ONE);
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
      return C.map((M, G) => M.toAffine(F[G])).map(m.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(C) {
      const F = m.fromAffine(s(Nt("pointHex", C)));
      return F.assertValidity(), F;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(C) {
      return m.BASE.multiply(A(C));
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
      I(C);
      const { px: F, py: M, pz: G } = this, { px: L, py: W, pz: O } = C, T = n.eql(n.mul(F, O), n.mul(L, G)), k = n.eql(n.mul(M, O), n.mul(W, G));
      return T && k;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new m(this.px, n.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: C, b: F } = t, M = n.mul(F, $a), { px: G, py: L, pz: W } = this;
      let O = n.ZERO, T = n.ZERO, k = n.ZERO, U = n.mul(G, G), q = n.mul(L, L), V = n.mul(W, W), Z = n.mul(G, L);
      return Z = n.add(Z, Z), k = n.mul(G, W), k = n.add(k, k), O = n.mul(C, k), T = n.mul(M, V), T = n.add(O, T), O = n.sub(q, T), T = n.add(q, T), T = n.mul(O, T), O = n.mul(Z, O), k = n.mul(M, k), V = n.mul(C, V), Z = n.sub(U, V), Z = n.mul(C, Z), Z = n.add(Z, k), k = n.add(U, U), U = n.add(k, U), U = n.add(U, V), U = n.mul(U, Z), T = n.add(T, U), V = n.mul(L, W), V = n.add(V, V), U = n.mul(V, Z), O = n.sub(O, U), k = n.mul(V, q), k = n.add(k, k), k = n.add(k, k), new m(O, T, k);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(C) {
      I(C);
      const { px: F, py: M, pz: G } = this, { px: L, py: W, pz: O } = C;
      let T = n.ZERO, k = n.ZERO, U = n.ZERO;
      const q = t.a, V = n.mul(t.b, $a);
      let Z = n.mul(F, L), ee = n.mul(M, W), b = n.mul(G, O), a = n.add(F, M), u = n.add(L, W);
      a = n.mul(a, u), u = n.add(Z, ee), a = n.sub(a, u), u = n.add(F, G);
      let l = n.add(L, O);
      return u = n.mul(u, l), l = n.add(Z, b), u = n.sub(u, l), l = n.add(M, G), T = n.add(W, O), l = n.mul(l, T), T = n.add(ee, b), l = n.sub(l, T), U = n.mul(q, u), T = n.mul(V, b), U = n.add(T, U), T = n.sub(ee, U), U = n.add(ee, U), k = n.mul(T, U), ee = n.add(Z, Z), ee = n.add(ee, Z), b = n.mul(q, b), u = n.mul(V, u), ee = n.add(ee, b), b = n.sub(Z, b), b = n.mul(q, b), u = n.add(u, b), Z = n.mul(ee, u), k = n.add(k, Z), Z = n.mul(l, u), T = n.mul(a, T), T = n.sub(T, Z), Z = n.mul(a, ee), U = n.mul(l, U), U = n.add(U, Z), new m(T, k, U);
    }
    subtract(C) {
      return this.add(C.negate());
    }
    is0() {
      return this.equals(m.ZERO);
    }
    wNAF(C) {
      return _.wNAFCached(this, h, C, (F) => {
        const M = n.invertBatch(F.map((G) => G.pz));
        return F.map((G, L) => G.toAffine(M[L])).map(m.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(C) {
      const F = m.ZERO;
      if (C === Zt)
        return F;
      if (c(C), C === vt)
        return this;
      const { endo: M } = t;
      if (!M)
        return _.unsafeLadder(this, C);
      let { k1neg: G, k1: L, k2neg: W, k2: O } = M.splitScalar(C), T = F, k = F, U = this;
      for (; L > Zt || O > Zt; )
        L & vt && (T = T.add(U)), O & vt && (k = k.add(U)), U = U.double(), L >>= vt, O >>= vt;
      return G && (T = T.negate()), W && (k = k.negate()), k = new m(n.mul(k.px, M.beta), k.py, k.pz), T.add(k);
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
      const { endo: L } = t;
      if (L) {
        const { k1neg: W, k1: O, k2neg: T, k2: k } = L.splitScalar(F);
        let { p: U, f: q } = this.wNAF(O), { p: V, f: Z } = this.wNAF(k);
        U = _.constTimeNegate(W, U), V = _.constTimeNegate(T, V), V = new m(n.mul(V.px, L.beta), V.py, V.pz), M = U.add(V), G = q.add(Z);
      } else {
        const { p: W, f: O } = this.wNAF(F);
        M = W, G = O;
      }
      return m.normalizeZ([M, G])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(C, F, M) {
      const G = m.BASE, L = (O, T) => T === Zt || T === vt || !O.equals(G) ? O.multiplyUnsafe(T) : O.multiply(T), W = L(this, F).add(L(C, M));
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
      if (C === vt)
        return !0;
      if (F)
        return F(m, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: C, clearCofactor: F } = t;
      return C === vt ? this : F ? F(m, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(C = !0) {
      return this.assertValidity(), r(m, this, C);
    }
    toHex(C = !0) {
      return $n(this.toRawBytes(C));
    }
  }
  m.BASE = new m(t.Gx, t.Gy, n.ONE), m.ZERO = new m(n.ZERO, n.ONE, n.ZERO);
  const x = t.nBitLength, _ = wg(m, t.endo ? Math.ceil(x / 2) : x);
  return {
    CURVE: t,
    ProjectivePoint: m,
    normPrivateKeyToScalar: A,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Cg(e) {
  const t = uu(e);
  return Tr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Bg(e) {
  const t = Cg(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(u) {
    return Zt < u && u < n.ORDER;
  }
  function c(u) {
    return It(u, r);
  }
  function A(u) {
    return Mi(u, r);
  }
  const { ProjectivePoint: h, normPrivateKeyToScalar: I, weierstrassEquation: m, isWithinCurveOrder: x } = bg({
    ...t,
    toBytes(u, l, p) {
      const f = l.toAffine(), y = n.toBytes(f.x), E = Br;
      return p ? E(Uint8Array.from([l.hasEvenY() ? 2 : 3]), y) : E(Uint8Array.from([4]), y, n.toBytes(f.y));
    },
    fromBytes(u) {
      const l = u.length, p = u[0], f = u.subarray(1);
      if (l === s && (p === 2 || p === 3)) {
        const y = Nn(f);
        if (!o(y))
          throw new Error("Point is not on curve");
        const E = m(y);
        let g;
        try {
          g = n.sqrt(E);
        } catch (Y) {
          const J = Y instanceof Error ? ": " + Y.message : "";
          throw new Error("Point is not on curve" + J);
        }
        const d = (g & vt) === vt;
        return (p & 1) === 1 !== d && (g = n.neg(g)), { x: y, y: g };
      } else if (l === i && p === 4) {
        const y = n.fromBytes(f.subarray(0, n.BYTES)), E = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: y, y: E };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), _ = (u) => $n(er(u, t.nByteLength));
  function R(u) {
    const l = r >> vt;
    return u > l;
  }
  function C(u) {
    return R(u) ? c(-u) : u;
  }
  const F = (u, l, p) => Nn(u.slice(l, p));
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
      const { r: p, s: f } = vn.toSig(Nt("DER", l));
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
      const { r: p, s: f, recovery: y } = this, E = k(Nt("msgHash", l));
      if (y == null || ![0, 1, 2, 3].includes(y))
        throw new Error("recovery id invalid");
      const g = y === 2 || y === 3 ? p + t.n : p;
      if (g >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const d = y & 1 ? "03" : "02", w = h.fromHex(d + _(g)), Y = A(g), J = c(-E * Y), K = c(f * Y), j = h.BASE.multiplyAndAddUnsafe(w, J, K);
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
      return Kn(this.toDERHex());
    }
    toDERHex() {
      return vn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Kn(this.toCompactHex());
    }
    toCompactHex() {
      return _(this.r) + _(this.s);
    }
  }
  const G = {
    isValidPrivateKey(u) {
      try {
        return I(u), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: I,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const u = cu(t.n);
      return pg(t.randomBytes(u), t.n);
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
  function L(u, l = !0) {
    return h.fromPrivateKey(u).toRawBytes(l);
  }
  function W(u) {
    const l = Tn(u), p = typeof u == "string", f = (l || p) && u.length;
    return l ? f === s || f === i : p ? f === 2 * s || f === 2 * i : u instanceof h;
  }
  function O(u, l, p = !0) {
    if (W(u))
      throw new Error("first arg must be private key");
    if (!W(l))
      throw new Error("second arg must be public key");
    return h.fromHex(l).multiply(I(u)).toRawBytes(p);
  }
  const T = t.bits2int || function(u) {
    const l = Nn(u), p = u.length * 8 - t.nBitLength;
    return p > 0 ? l >> BigInt(p) : l;
  }, k = t.bits2int_modN || function(u) {
    return c(T(u));
  }, U = wo(t.nBitLength);
  function q(u) {
    if (typeof u != "bigint")
      throw new Error("bigint expected");
    if (!(Zt <= u && u < U))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return er(u, t.nByteLength);
  }
  function V(u, l, p = Z) {
    if (["recovered", "canonical"].some((se) => se in p))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: y } = t;
    let { lowS: E, prehash: g, extraEntropy: d } = p;
    E == null && (E = !0), u = Nt("msgHash", u), g && (u = Nt("prehashed msgHash", f(u)));
    const w = k(u), Y = I(l), J = [q(Y), q(w)];
    if (d != null && d !== !1) {
      const se = d === !0 ? y(n.BYTES) : d;
      J.push(Nt("extraEntropy", se));
    }
    const K = Br(...J), j = w;
    function re(se) {
      const Se = T(se);
      if (!x(Se))
        return;
      const fe = A(Se), oe = h.BASE.multiply(Se).toAffine(), _e = c(oe.x);
      if (_e === Zt)
        return;
      const Ae = c(fe * c(j + _e * Y));
      if (Ae === Zt)
        return;
      let he = (oe.x === _e ? 0 : 2) | Number(oe.y & vt), Ft = Ae;
      return E && R(Ae) && (Ft = C(Ae), he ^= 1), new M(_e, Ft, he);
    }
    return { seed: K, k2sig: re };
  }
  const Z = { lowS: t.lowS, prehash: !1 }, ee = { lowS: t.lowS, prehash: !1 };
  function b(u, l, p = Z) {
    const { seed: f, k2sig: y } = V(u, l, p), E = t;
    return T0(E.hash.outputLen, E.nByteLength, E.hmac)(f, y);
  }
  h.BASE._setWindowSize(8);
  function a(u, l, p, f = ee) {
    var oe;
    const y = u;
    if (l = Nt("msgHash", l), p = Nt("publicKey", p), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: E, prehash: g } = f;
    let d, w;
    try {
      if (typeof y == "string" || Tn(y))
        try {
          d = M.fromDER(y);
        } catch (_e) {
          if (!(_e instanceof vn.Err))
            throw _e;
          d = M.fromCompact(y);
        }
      else if (typeof y == "object" && typeof y.r == "bigint" && typeof y.s == "bigint") {
        const { r: _e, s: Ae } = y;
        d = new M(_e, Ae);
      } else
        throw new Error("PARSE");
      w = h.fromHex(p);
    } catch (_e) {
      if (_e.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (E && d.hasHighS())
      return !1;
    g && (l = t.hash(l));
    const { r: Y, s: J } = d, K = k(l), j = A(J), re = c(K * j), se = c(Y * j), Se = (oe = h.BASE.multiplyAndAddUnsafe(w, re, se)) == null ? void 0 : oe.toAffine();
    return Se ? c(Se.x) === Y : !1;
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
function xg(e) {
  return {
    hash: e,
    hmac: (t, ...n) => iu(e, t, jh(...n)),
    randomBytes: Kh
  };
}
function _g(e, t) {
  const n = (r) => Bg({ ...e, ...xg(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const du = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Ka = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), vg = BigInt(1), Oi = BigInt(2), ec = (e, t) => (e + t / Oi) / t;
function Rg(e) {
  const t = du, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), A = BigInt(88), h = e * e * e % t, I = h * h * e % t, m = _t(I, n, t) * I % t, x = _t(m, n, t) * I % t, _ = _t(x, Oi, t) * h % t, R = _t(_, s, t) * _ % t, C = _t(R, i, t) * R % t, F = _t(C, c, t) * C % t, M = _t(F, A, t) * F % t, G = _t(M, c, t) * C % t, L = _t(G, n, t) * I % t, W = _t(L, o, t) * R % t, O = _t(W, r, t) * h % t, T = _t(O, Oi, t);
  if (!Li.eql(Li.sqr(T), e))
    throw new Error("Cannot find square root");
  return T;
}
const Li = gg(du, void 0, void 0, { sqrt: Rg }), sn = _g({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Li,
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
      const t = Ka, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -vg * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = ec(i * e, t), A = ec(-r * e, t);
      let h = It(e - c * n - A * s, t), I = It(-c * r - A * i, t);
      const m = h > o, x = I > o;
      if (m && (h = t - h), x && (I = t - I), h > o || I > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: m, k1: h, k2neg: x, k2: I };
    }
  }
}, og);
BigInt(0);
sn.ProjectivePoint;
var pt = [];
for (var li = 0; li < 256; ++li)
  pt.push((li + 256).toString(16).slice(1));
function Sg(e, t = 0) {
  return (pt[e[t + 0]] + pt[e[t + 1]] + pt[e[t + 2]] + pt[e[t + 3]] + "-" + pt[e[t + 4]] + pt[e[t + 5]] + "-" + pt[e[t + 6]] + pt[e[t + 7]] + "-" + pt[e[t + 8]] + pt[e[t + 9]] + "-" + pt[e[t + 10]] + pt[e[t + 11]] + pt[e[t + 12]] + pt[e[t + 13]] + pt[e[t + 14]] + pt[e[t + 15]]).toLowerCase();
}
var Jr, Qg = new Uint8Array(16);
function Ng() {
  if (!Jr && (Jr = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Jr))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Jr(Qg);
}
var Dg = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const tc = {
  randomUUID: Dg
};
function Tg(e, t, n) {
  if (tc.randomUUID && !t && !e)
    return tc.randomUUID();
  e = e || {};
  var r = e.random || (e.rng || Ng)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (var s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return Sg(r);
}
var Bo = { exports: {} }, Hn = typeof Reflect == "object" ? Reflect : null, nc = Hn && typeof Hn.apply == "function" ? Hn.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, us;
Hn && typeof Hn.ownKeys == "function" ? us = Hn.ownKeys : Object.getOwnPropertySymbols ? us = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : us = function(t) {
  return Object.getOwnPropertyNames(t);
};
function Fg(e) {
  console && console.warn && console.warn(e);
}
var Au = Number.isNaN || function(t) {
  return t !== t;
};
function Be() {
  Be.init.call(this);
}
Bo.exports = Be;
Bo.exports.once = kg;
Be.EventEmitter = Be;
Be.prototype._events = void 0;
Be.prototype._eventsCount = 0;
Be.prototype._maxListeners = void 0;
var rc = 10;
function Ts(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Be, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return rc;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Au(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    rc = e;
  }
});
Be.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Be.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Au(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function lu(e) {
  return e._maxListeners === void 0 ? Be.defaultMaxListeners : e._maxListeners;
}
Be.prototype.getMaxListeners = function() {
  return lu(this);
};
Be.prototype.emit = function(t) {
  for (var n = [], r = 1; r < arguments.length; r++) n.push(arguments[r]);
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
    for (var h = A.length, I = mu(A, h), r = 0; r < h; ++r)
      nc(I[r], this, n);
  return !0;
};
function fu(e, t, n, r) {
  var s, i, o;
  if (Ts(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = lu(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = o.length, Fg(c);
  }
  return e;
}
Be.prototype.addListener = function(t, n) {
  return fu(this, t, n, !1);
};
Be.prototype.on = Be.prototype.addListener;
Be.prototype.prependListener = function(t, n) {
  return fu(this, t, n, !0);
};
function Mg() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function hu(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = Mg.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Be.prototype.once = function(t, n) {
  return Ts(n), this.on(t, hu(this, t, n)), this;
};
Be.prototype.prependOnceListener = function(t, n) {
  return Ts(n), this.prependListener(t, hu(this, t, n)), this;
};
Be.prototype.removeListener = function(t, n) {
  var r, s, i, o, c;
  if (Ts(n), s = this._events, s === void 0)
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
    i === 0 ? r.shift() : Og(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, c || n);
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
function gu(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? Lg(s) : mu(s, s.length);
}
Be.prototype.listeners = function(t) {
  return gu(this, t, !0);
};
Be.prototype.rawListeners = function(t) {
  return gu(this, t, !1);
};
Be.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : pu.call(e, t);
};
Be.prototype.listenerCount = pu;
function pu(e) {
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
  return this._eventsCount > 0 ? us(this._events) : [];
};
function mu(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function Og(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function Lg(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function kg(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    wu(e, t, i, { once: !0 }), t !== "error" && Pg(e, s, { once: !0 });
  });
}
function Pg(e, t, n) {
  typeof e.on == "function" && wu(e, "error", t, n);
}
function wu(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var yu = Bo.exports, Ug = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Gg = class {
  constructor(e, t, n, r, s, i = 0) {
    D(this, "left");
    D(this, "right");
    D(this, "parent");
    D(this, "hash");
    D(this, "data");
    D(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, sc = Gg;
function zg(e) {
  return qt("0x00".concat(e.slice(2)));
}
function Hg(e, t) {
  return qt("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function Iu(e) {
  if (!e.length)
    return Ug;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = zg(e[i]);
    t.push(new sc(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = Hg(n[o].hash, n[o + 1].hash);
      t[i] = new sc(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var Xg = "0x00", Eu = "0x01";
function Vg(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(qt(t).slice(2));
  return [qt(n), n];
}
function Mn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [qt(n), n];
}
function fi(e) {
  const t = Eu.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Yg(e) {
  const t = Eu.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function hi(e) {
  return e.slice(0, 4) === Xg;
}
var Zg = class {
  constructor(e, t, n, r, s) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "BitMask");
    D(this, "NumSideNodes");
    D(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, Wg = Zg, Jg = class {
  constructor(e, t, n) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, qg = Jg, Bt = "0x0000000000000000000000000000000000000000000000000000000000000000", Yt = 256;
function Pn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function jg(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function $g(e, t) {
  let n = 0;
  for (let r = 0; r < Yt && Pn(e, r) === Pn(t, r); r += 1)
    n += 1;
  return n;
}
function Kg(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === Bt ? t.push(0) : (n.push(r), t.push(1));
  return new Wg(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var ep = class {
  constructor() {
    D(this, "ms");
    D(this, "root");
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
    if (hi(r))
      return [n, t, r, ""];
    let s, i, o = "", c = "";
    for (let h = 0; h < Yt; h += 1) {
      if ([s, i] = Yg(r), Pn(e, h) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === Bt) {
        r = "";
        break;
      }
      if (r = this.get(o), hi(r))
        break;
    }
    const A = this.get(c);
    return [jg(n), o, r, A];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === Bt)
      return this.root;
    const [s] = fi(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", c = "", A = "", h = !1;
    for (let I = 0; I < t.length; I += 1)
      if (t[I] !== "") {
        if (c = t[I], o === "")
          if (A = this.get(c), hi(A)) {
            i = c, o = c;
            continue;
          } else
            o = Bt, h = !0;
        !h && c === Bt || (h || (h = !0), Pn(e, t.length - 1 - I) === 1 ? [i, o] = Mn(c, o) : [i, o] = Mn(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = Bt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(qt(t), t), [i, o] = Vg(e, t), this.set(i, o), o = i;
    let c;
    if (r === Bt)
      c = Yt;
    else {
      const [A] = fi(s);
      c = $g(e, A);
    }
    c !== Yt && (Pn(e, c) === 1 ? [i, o] = Mn(r, o) : [i, o] = Mn(o, r), this.set(i, o), o = i);
    for (let A = 0; A < Yt; A += 1) {
      let h;
      const I = Yt - n.length;
      if (A - I < 0 || n[A - I] === "")
        if (c !== Yt && c > Yt - 1 - A)
          h = Bt;
        else
          continue;
      else
        h = n[A - I];
      Pn(e, Yt - 1 - A) === 1 ? [i, o] = Mn(h, o) : [i, o] = Mn(o, h), this.set(i, o), o = i;
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
      const [A] = fi(r);
      A !== e && (o = r);
    }
    return new qg(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return Kg(t);
  }
}, tp = Object.defineProperty, np = (e, t, n) => t in e ? tp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, De = (e, t, n) => (np(e, typeof t != "symbol" ? t + "" : t, n), n), xo = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Re = (e, t, n) => (xo(e, t, "read from private field"), n ? n.call(e) : t.get(e)), dn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Dt = (e, t, n, r) => (xo(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), ki = (e, t, n) => (xo(e, t, "access private method"), n), _o = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1], r = e[2] ?? void 0) : (n = e.amount, t = e.assetId, r = e.max ?? void 0);
  const s = B(n);
  return {
    assetId: H(t),
    amount: s.lt(1) ? B(1) : s,
    max: r ? B(r) : void 0
  };
}, rp = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, bu = ne`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  type: __typename
  ... on SqueezedOutStatus {
    reason
  }
}
    `, sp = ne`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, vo = ne`
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
    `, ip = ne`
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
    ${vo}`, op = ne`
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
    ${vo}`, ap = ne`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, cp = ne`
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
    ${sp}
${ip}
${op}
${ap}`, Lr = ne`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${cp}`, up = ne`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, dp = ne`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${up}`, Ap = ne`
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
    `, lp = ne`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, fp = ne`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${Ap}
${lp}`, hp = ne`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${fp}
${vo}`, Ro = ne`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, gp = ne`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, Cu = ne`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, pp = ne`
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
    `, Bu = ne`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Fs = ne`
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
    `, mp = ne`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, wp = ne`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, yp = ne`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, Ip = ne`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, Ep = ne`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, bp = ne`
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
    `, Cp = ne`
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
  cfe {
    ...DependentCostFragment
  }
  cfeiDependentCost {
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
    ${bp}`, Bp = ne`
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
    ${mp}
${wp}
${yp}
${Ip}
${Ep}
${Cp}`, xp = ne`
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
    ${Fs}
${Bp}`, _p = ne`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, ar = ne`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, vp = ne`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, Rp = ne`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, Sp = ne`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, Qp = ne`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${vp}`, Np = ne`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${xp}`, Dp = ne`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Lr}`, Tp = ne`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Lr}`, Fp = ne`
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
    ${Lr}
${ar}`, Mp = ne`
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
    ${ar}
${Lr}`, Op = ne`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${dp}`, Lp = ne`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Fs}`, kp = ne`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Fs}
${Lr}`, Pp = ne`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      ...pageInfoFragment
    }
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${ar}
${Fs}`, Up = ne`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${Ro}`, Gp = ne`
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
    ${ar}
${Ro}`, zp = ne`
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
    ${Ro}
${gp}`, Hp = ne`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, Xp = ne`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${_p}`, Vp = ne`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${Bu}`, Yp = ne`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, Zp = ne`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, Wp = ne`
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
    ${ar}
${Bu}`, Jp = ne`
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
    ${ar}
${Cu}`, qp = ne`
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
    ${pp}`, jp = ne`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, $p = ne`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${Rp}`, Kp = ne`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${hp}`, em = ne`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, tm = ne`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, nm = ne`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${Cu}`, rm = ne`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${bu}`, sm = ne`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${bu}`;
function im(e) {
  return {
    getVersion(t, n) {
      return e(Sp, t, n);
    },
    getNodeInfo(t, n) {
      return e(Qp, t, n);
    },
    getChain(t, n) {
      return e(Np, t, n);
    },
    getTransaction(t, n) {
      return e(Dp, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(Tp, t, n);
    },
    getTransactions(t, n) {
      return e(Fp, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(Mp, t, n);
    },
    estimatePredicates(t, n) {
      return e(Op, t, n);
    },
    getBlock(t, n) {
      return e(Lp, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(kp, t, n);
    },
    getBlocks(t, n) {
      return e(Pp, t, n);
    },
    getCoin(t, n) {
      return e(Up, t, n);
    },
    getCoins(t, n) {
      return e(Gp, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(zp, t, n);
    },
    getContract(t, n) {
      return e(Hp, t, n);
    },
    getContractBalance(t, n) {
      return e(Xp, t, n);
    },
    getBalance(t, n) {
      return e(Vp, t, n);
    },
    getLatestGasPrice(t, n) {
      return e(Yp, t, n);
    },
    estimateGasPrice(t, n) {
      return e(Zp, t, n);
    },
    getBalances(t, n) {
      return e(Wp, t, n);
    },
    getMessages(t, n) {
      return e(Jp, t, n);
    },
    getMessageProof(t, n) {
      return e(qp, t, n);
    },
    getMessageStatus(t, n) {
      return e(jp, t, n);
    },
    getRelayedTransactionStatus(t, n) {
      return e($p, t, n);
    },
    dryRun(t, n) {
      return e(Kp, t, n);
    },
    submit(t, n) {
      return e(em, t, n);
    },
    produceBlocks(t, n) {
      return e(tm, t, n);
    },
    getMessageByNonce(t, n) {
      return e(nm, t, n);
    },
    submitAndAwait(t, n) {
      return e(rm, t, n);
    },
    statusChange(t, n) {
      return e(sm, t, n);
    }
  };
}
var xu = class {
  constructor(e) {
    D(this, "stream");
    D(this, "events", []);
    D(this, "parsingLeftover", "");
    this.options = e;
  }
  async setStream() {
    const { url: e, query: t, variables: n, fetchFn: r } = this.options, s = await r(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: V0(t),
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
      const n = xu.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (n === "")
        continue;
      const r = `${this.parsingLeftover}${n}`, s = /data:.*\n\n/g, i = [...r.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new v(
            S.STREAM_PARSING_ERROR,
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
}, _u = xu;
De(_u, "textDecoder", new TextDecoder());
var Cn = {}, om = 30 * 1e3, am = class {
  constructor(e = om) {
    D(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new v(
        S.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = H(e);
    if (Cn[n]) {
      if (!t || Cn[n].expires > Date.now())
        return Cn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = H(e);
    return Cn[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(Cn).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(Cn).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = H(e);
    delete Cn[t];
  }
}, cm = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Ce.Coin: {
      const n = X(e.predicate ?? "0x"), r = X(e.predicateData ?? "0x");
      return {
        type: Ce.Coin,
        txID: H(X(e.id).slice(0, pn)),
        outputIndex: cn(X(e.id).slice(pn, fs)),
        owner: H(e.owner),
        amount: B(e.amount),
        assetId: H(e.assetId),
        txPointer: {
          blockHeight: cn(X(e.txPointer).slice(0, 8)),
          txIndex: cn(X(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: B(e.predicateGasUsed),
        predicateLength: B(n.length),
        predicateDataLength: B(r.length),
        predicate: H(n),
        predicateData: H(r)
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
          blockHeight: cn(X(e.txPointer).slice(0, 8)),
          txIndex: cn(X(e.txPointer).slice(8, 16))
        },
        contractID: H(e.contractId)
      };
    case Ce.Message: {
      const n = X(e.predicate ?? "0x"), r = X(e.predicateData ?? "0x"), s = X(e.data ?? "0x");
      return {
        type: Ce.Message,
        sender: H(e.sender),
        recipient: H(e.recipient),
        amount: B(e.amount),
        nonce: H(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: B(e.predicateGasUsed),
        predicateLength: B(n.length),
        predicateDataLength: B(r.length),
        predicate: H(n),
        predicateData: H(r),
        data: H(s),
        dataLength: s.length
      };
    }
    default:
      throw new v(
        S.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, um = (e) => {
  const { type: t } = e;
  switch (t) {
    case Ie.Coin:
      return {
        type: Ie.Coin,
        to: H(e.to),
        amount: B(e.amount),
        assetId: H(e.assetId)
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
        to: H(e.to),
        amount: B(0),
        assetId: H(e.assetId)
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
        contractId: H(e.contractId),
        stateRoot: H(e.stateRoot)
      };
    default:
      throw new v(
        S.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, zy = (e) => "utxoId" in e, Hy = (e) => "recipient" in e, dm = (e) => "id" in e, Xy = (e) => "recipient" in e, Am = (e) => e.type === de.Revert && e.val.toString("hex") === $0, lm = (e) => e.type === de.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", ic = (e) => e.reduce(
  (t, n) => (Am(n) && t.missingOutputVariables.push(n), lm(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), xe = (e) => e || Ne;
function fm(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: de.Call,
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
        type: de.Return,
        id: xe(e.id || e.contractId),
        val: B(e.val),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "RETURN_DATA":
      return {
        type: de.ReturnData,
        id: xe(e.id || e.contractId),
        ptr: B(e.ptr),
        len: B(e.len),
        digest: xe(e.digest),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "PANIC":
      return {
        type: de.Panic,
        id: xe(e.id),
        reason: B(e.reason),
        pc: B(e.pc),
        is: B(e.is),
        contractId: xe(e.contractId)
      };
    case "REVERT":
      return {
        type: de.Revert,
        id: xe(e.id || e.contractId),
        val: B(e.ra),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "LOG":
      return {
        type: de.Log,
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
        type: de.LogData,
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
        type: de.Transfer,
        from: xe(e.id || e.contractId),
        to: xe(e.toAddress || (e == null ? void 0 : e.to)),
        amount: B(e.amount),
        assetId: xe(e.assetId),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: de.TransferOut,
        from: xe(e.id || e.contractId),
        to: xe(e.toAddress || e.to),
        amount: B(e.amount),
        assetId: xe(e.assetId),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: de.ScriptResult,
        result: B(e.result),
        gasUsed: B(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const n = xe(e.sender), r = xe(e.recipient), s = xe(e.nonce), i = B(e.amount), o = e.data ? X(e.data) : Uint8Array.from([]), c = xe(e.digest), A = ys.getMessageId({
        sender: n,
        recipient: r,
        nonce: s,
        amount: i,
        data: o
      });
      return {
        type: de.MessageOut,
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
      const n = xe(e.id || e.contractId), r = xe(e.subId), s = Cr.getAssetId(n, r);
      return {
        type: de.Mint,
        subId: r,
        contractId: n,
        assetId: s,
        val: B(e.val),
        pc: B(e.pc),
        is: B(e.is)
      };
    }
    case "BURN": {
      const n = xe(e.id || e.contractId), r = xe(e.subId), s = vi.getAssetId(n, r);
      return {
        type: de.Burn,
        subId: r,
        contractId: n,
        assetId: s,
        val: B(e.val),
        pc: B(e.pc),
        is: B(e.is)
      };
    }
    default:
      throw new v(S.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var hm = "https://fuellabs.github.io/block-explorer-v2", gm = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, Vy = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, c = t || hm, A = [
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
  })), I = h.length > 0;
  if (h.length > 1)
    throw new v(
      S.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${A.map((W) => W.key).join(", ")}.`
    );
  if (n && h.length > 0) {
    const W = A.map(({ key: O }) => O).join(", ");
    throw new v(
      S.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${W}.`
    );
  }
  const m = I ? gm(
    h[0].key,
    h[0].value
  ) : "", x = /^\/|\/$/gm, _ = n ? n.replace(x, "") : m, R = c.replace(x, ""), C = r == null ? void 0 : r.replace(x, ""), F = C ? encodeURIComponent(C) : void 0, M = R.match(/^https?:\/\//) ? "" : "https://", G = C != null && C.match(/^https?:\/\//) ? "" : "https://";
  return `${M}${R}/${_}${F ? `?providerUrl=${G}${F}` : ""}`;
}, Ms = (e) => e.filter(
  (r) => r.type === de.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), B(0));
function hn(e, t) {
  const n = B(t.base);
  let r = B(0);
  return "unitsPerGas" in t ? r = B(e).div(B(t.unitsPerGas)) : r = B(e).mul(B(t.gasPerUnit)), n.add(r);
}
function pm(e, t, n) {
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
    i.add(hn(X(A.predicate).length, n.contractRoot)).add(B(A.predicateGasUsed))
  ) : c.add(n.ecr1), B(0));
}
function vu(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = hn(i, t.vmInitialization), c = B(i).mul(n), A = pm(r, i, t);
  return o.add(c).add(A).add(s).maxU64();
}
function So(e) {
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
var Pi = (e) => {
  const { gas: t, gasPrice: n, priceFactor: r, tip: s } = e;
  return t.mul(n).div(r).add(B(s));
};
function Ui(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = H(e[t]);
        break;
      case "Array":
        e[t] = Ui(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = Ui(e[t]);
        break;
    }
  }), e;
}
function mm(e) {
  return Ui(Gt(e));
}
var wm = (e, t) => {
  let n = `The transaction reverted with reason: "${e}".`;
  return Mh.includes(e) && (n = `${n}

You can read more about this error at:

${Oh}#variant.${e}`), new v(S.SCRIPT_REVERTED, n, {
    ...t,
    reason: e
  });
}, fr = (e) => JSON.stringify(e, null, 2), ym = (e, t, n) => {
  let r = "The transaction reverted with an unknown reason.";
  const s = e.find(({ type: o }) => o === de.Revert);
  let i = "";
  if (s)
    switch (B(s.val).toHex()) {
      case Nh: {
        i = "require", r = `The transaction reverted because a "require" statement has thrown ${t.length ? fr(t[0]) : "an error."}.`;
        break;
      }
      case Dh: {
        const c = t.length >= 2 ? ` comparing ${fr(t[1])} and ${fr(t[0])}.` : ".";
        i = "assert_eq", r = `The transaction reverted because of an "assert_eq" statement${c}`;
        break;
      }
      case Fh: {
        const c = t.length >= 2 ? ` comparing ${fr(t[1])} and ${fr(t[0])}.` : ".";
        i = "assert_ne", r = `The transaction reverted because of an "assert_ne" statement${c}`;
        break;
      }
      case Th:
        i = "assert", r = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case $0:
        i = "MissingOutputChange", r = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        throw new v(
          S.UNKNOWN,
          `The transaction reverted with an unknown reason: ${s.val}`,
          {
            ...n,
            reason: "unknown"
          }
        );
    }
  return new v(S.SCRIPT_REVERTED, r, {
    ...n,
    reason: i
  });
}, Qo = (e) => {
  const { receipts: t, statusReason: n, logs: r } = e, s = t.some(({ type: c }) => c === de.Panic), i = t.some(({ type: c }) => c === de.Revert), o = {
    logs: r,
    receipts: t,
    panic: s,
    revert: i,
    reason: ""
  };
  return s ? wm(n, o) : ym(t, r, o);
}, Yy = class extends Error {
  constructor() {
    super(...arguments);
    D(this, "name", "ChangeOutputCollisionError");
    D(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, Im = class extends Error {
  constructor(t) {
    super();
    D(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, Zy = class extends Error {
  constructor(t) {
    super();
    D(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, cr = (e) => e.type === Ce.Coin, No = (e) => e.type === Ce.Message, gn = (e) => cr(e) || No(e), Qu = (e) => cr(e) ? e.owner : e.recipient, Gi = (e, t) => Qu(e) === t.toB256(), Em = (e, t, n) => e.filter(gn).reduce((r, s) => cr(s) && s.assetId === t || No(s) && t === n ? r.add(s.amount) : r, B(0)), Wy = (e) => e.filter(gn).reduce(
  (t, n) => (cr(n) ? t.utxos.push(n.id) : t.messages.push(n.nonce), t),
  {
    utxos: [],
    messages: []
  }
), bm = (e, t) => e.reduce(
  (n, r) => (cr(r) && r.owner === t.toB256() ? n.utxos.push(r.id) : No(r) && r.recipient === t.toB256() && n.messages.push(r.nonce), n),
  {
    utxos: [],
    messages: []
  }
), Cm = (e) => {
  const t = X(e);
  return {
    data: H(t),
    dataLength: t.length
  };
}, Do = class {
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
    D(this, "tip");
    /** Block until which tx cannot be included */
    D(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    D(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    D(this, "witnessLimit");
    /** List of inputs */
    D(this, "inputs", []);
    /** List of outputs */
    D(this, "outputs", []);
    /** List of witnesses */
    D(this, "witnesses", []);
    this.tip = e ? B(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = Dn(r) ? B(r) : void 0, this.maxFee = B(n), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [], { tip: r, witnessLimit: s, maturity: i } = e;
    return B(r).gt(0) && (t += Qt.Tip, n.push({ data: B(r), type: Qt.Tip })), Dn(s) && B(s).gte(0) && (t += Qt.WitnessLimit, n.push({ data: B(s), type: Qt.WitnessLimit })), i && i > 0 && (t += Qt.Maturity, n.push({ data: i, type: Qt.Maturity })), t += Qt.MaxFee, n.push({ data: e.maxFee, type: Qt.MaxFee }), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(cm)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(um)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(Cm)) ?? [], { policyTypes: r, policies: s } = Do.getPolicyMeta(this);
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
    const n = ue.fromAddressOrString(e), r = this.getCoinInputWitnessIndexByOwner(n);
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
      throw new Im(e);
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
    const t = gr(e), n = this.inputs.find((r) => {
      switch (r.type) {
        case Ce.Coin:
          return H(r.owner) === t.toB256();
        case Ce.Message:
          return H(r.recipient) === t.toB256();
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
    return dm(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
      to: gr(e).toB256(),
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
    return t.map(_o).forEach((n) => {
      this.pushOutput({
        type: Ie.Coin,
        to: gr(e).toB256(),
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
      (r) => H(r.assetId) === t
    ) || this.pushOutput({
      type: Ie.Change,
      to: gr(e).toB256(),
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
    return So({
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
      i === t && (A = B("1000000000000000000")), c && "assetId" in c ? (c.id = H(Tt(fs)), c.amount = A) : this.addResources([
        {
          id: H(Tt(fs)),
          amount: A,
          assetId: i,
          owner: n || ue.fromRandom(),
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
    return mm(this);
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
        (i) => Gi(i, ue.fromString(String(r)))
      );
      s && "predicateGasUsed" in s && B(s.predicateGasUsed).gt(0) && (n.predicateGasUsed = s.predicateGasUsed);
    });
  }
};
function Nu(e, t) {
  const n = e.toTransaction();
  n.type === Le.Script && (n.receiptsRoot = Ne), n.inputs = n.inputs.map((i) => {
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
  const r = rl(t), s = ie([r, new Jt().encode(n)]);
  return mt(s);
}
var Bm = (e) => {
  const t = new Uint8Array(32);
  return t.set(X(e)), t;
}, xm = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: H(t),
    value: H(Bm(n))
  };
}, zi = class extends Do {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: n, storageSlots: r, ...s }) {
    super(s);
    /** Type of the transaction */
    D(this, "type", Le.Create);
    /** Witness index of contract bytecode to create */
    D(this, "bytecodeWitnessIndex");
    /** Salt */
    D(this, "salt");
    /** List of storage slots to initialize */
    D(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = H(n ?? Ne), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(xm)) ?? [];
    return {
      type: Le.Create,
      ...t,
      bytecodeWitnessIndex: n,
      storageSlotsCount: B(r.length),
      salt: this.salt ? H(this.salt) : Ne,
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
      contractBytesSize: B(X(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
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
  bytes: X("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, _m = {
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
  bytes: X("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Rn = class extends Do {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    D(this, "type", Le.Script);
    /** Gas limit for transaction */
    D(this, "gasLimit");
    /** Script to execute */
    D(this, "script");
    /** Script input data (parameters) */
    D(this, "scriptData");
    D(this, "abis");
    this.gasLimit = B(r), this.script = X(t ?? oc.bytes), this.scriptData = X(n ?? oc.encodeScriptData()), this.abis = s.abis;
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
    const t = X(this.script ?? "0x"), n = X(this.scriptData ?? "0x");
    return {
      type: Le.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: B(t.length),
      scriptDataLength: B(n.length),
      receiptsRoot: Ne,
      script: H(t),
      scriptData: H(n)
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
    return So({
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
    const n = gr(t);
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
  if (e instanceof Rn || e instanceof zi)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case Le.Script:
      return Rn.from(e);
    case Le.Create:
      return zi.from(e);
    default:
      throw new v(
        S.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${t}.`
      );
  }
}, vm = (e) => {
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
  const A = B(o.gasPerByte), h = B(o.gasPriceFactor), I = X(n), [m] = new Jt().decode(I, 0), { type: x, witnesses: _, inputs: R, policies: C } = m;
  let F = B(0), M = B(0);
  if (x !== Le.Create && x !== Le.Script)
    return B(0);
  if (x === Le.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: q } = m, V = B(X(_[U].data).length);
    F = Ru({
      contractBytesSize: V,
      gasCosts: i,
      stateRootSize: q.length || 0,
      txBytesSize: I.length
    });
  } else {
    const { scriptGasLimit: U } = m;
    U && (M = U), F = Su({
      gasCosts: i,
      txBytesSize: I.length
    });
  }
  const G = vu({
    gasCosts: i,
    gasPerByte: B(A),
    inputs: R,
    metadataGas: F,
    txBytesSize: I.length
  }), L = (k = C.find((U) => U.type === Qt.WitnessLimit)) == null ? void 0 : k.data, W = _.reduce((U, q) => U + q.dataLength, 0), O = So({
    gasPerByte: A,
    minGas: G,
    witnessesLength: W,
    gasLimit: M,
    witnessLimit: L,
    maxGasPerTx: c
  });
  return Pi({
    gasPrice: t,
    gas: O,
    priceFactor: h,
    tip: r
  });
}, Rm = ({ abi: e, receipt: t }) => {
  var I;
  const n = new jt(e), r = t.param1.toHex(8), s = n.getFunction(r), i = s.jsonFn.inputs, o = t.param2.toHex();
  let c;
  const A = s.decodeArguments(o);
  return A && (c = i.reduce((m, x, _) => {
    const R = A[_], C = x.name;
    return C ? {
      ...m,
      // reparse to remove bn
      [C]: JSON.parse(JSON.stringify(R))
    } : m;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: c,
    ...(I = t.amount) != null && I.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function Sm(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function To(e, t) {
  return e.filter((n) => n.type === t);
}
function Qm(e) {
  return To(e, Ce.Coin);
}
function Nm(e) {
  return To(e, Ce.Message);
}
function Dm(e) {
  return Sm(e, [Ce.Coin, Ce.Message]);
}
function Tm(e) {
  return To(e, Ce.Contract);
}
function Du(e, t) {
  const n = Qm(e), r = Nm(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function Fm(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== Ce.Contract)
      throw new v(
        S.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function Fo(e) {
  return e.type === Ce.Coin ? e.owner.toString() : e.type === Ce.Message ? e.recipient.toString() : "";
}
function kr(e, t) {
  return e.filter((n) => n.type === t);
}
function Mm(e) {
  return kr(e, Ie.ContractCreated);
}
function Tu(e) {
  return kr(e, Ie.Coin);
}
function Om(e) {
  return kr(e, Ie.Change);
}
function Lm(e) {
  return kr(e, Ie.Contract);
}
function Jy(e) {
  return kr(e, Ie.Variable);
}
var km = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e))(km || {}), Pm = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(Pm || {}), Um = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(Um || {}), Gm = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(Gm || {}), zm = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(zm || {});
function _r(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function Fu(e) {
  switch (e) {
    case Le.Mint:
      return "Mint";
    case Le.Create:
      return "Create";
    case Le.Script:
      return "Script";
    default:
      throw new v(
        S.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${e}.`
      );
  }
}
function Pr(e, t) {
  return Fu(e) === t;
}
function Hm(e) {
  return Pr(
    e,
    "Mint"
    /* Mint */
  );
}
function Mu(e) {
  return Pr(
    e,
    "Create"
    /* Create */
  );
}
function Ou(e) {
  return Pr(
    e,
    "Script"
    /* Script */
  );
}
function Xm(e) {
  return Pr(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function Vm(e) {
  return Pr(
    e,
    "Upload"
    /* Upload */
  );
}
function qy(e) {
  return (t) => e.assetId === t.assetId;
}
function Ym(e) {
  return _r(e, de.Call);
}
function Zm(e) {
  return _r(e, de.MessageOut);
}
var Wm = (e, t) => {
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
function Jm(e, t) {
  var n, r, s, i, o, c, A, h;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((c = t.from) == null ? void 0 : c.type) && ((A = e.to) == null ? void 0 : A.type) === ((h = t.to) == null ? void 0 : h.type);
}
function nr(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((c) => Jm(c, t));
  if (n[r]) {
    const c = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? Wm(c, t) : t.assetsSent), (o = t.calls) != null && o.length && (c.calls = [...c.calls || [], ...t.calls]), n[r] = c;
  } else
    n.push(t);
  return n;
}
function jy(e) {
  return _r(e, de.TransferOut);
}
function qm({
  inputs: e,
  receipts: t,
  baseAssetId: n
}) {
  return Zm(t).reduce(
    (i, o) => {
      const c = Du(e, n);
      if (c) {
        const A = Fo(c);
        return nr(i, {
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
function jm({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = Ym(n);
  return Lm(t).reduce((h, I) => {
    const m = Fm(e, I.inputIndex);
    return m ? o.reduce((_, R) => {
      var C;
      if (R.to === m.contractID) {
        const F = Du(e, R.assetId);
        if (F) {
          const M = Fo(F), G = [], L = r == null ? void 0 : r[m.contractID];
          return L && G.push(
            Rm({
              abi: L,
              receipt: R,
              rawPayload: s,
              maxInputs: i
            })
          ), nr(_, {
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
function $m(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const c = t.some((h) => h.contractID === r) ? 0 : 1;
  if (Ne === o) {
    const h = n.find((I) => I.assetId === s);
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
  const s = Tu(t), i = Tm(e), o = Om(t);
  s.forEach((h) => {
    const { amount: I, assetId: m, to: x } = h, _ = o.find((R) => R.assetId === m);
    _ && (r = nr(r, {
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
          assetId: m,
          amount: I
        }
      ]
    }));
  });
  const c = _r(
    n,
    de.Transfer
  ), A = _r(
    n,
    de.TransferOut
  );
  return [...c, ...A].forEach((h) => {
    const I = $m(h, i, o);
    r = nr(r, I);
  }), r;
}
function Km(e) {
  return Tu(e).reduce((r, s) => nr(r, {
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
function ew({ inputs: e, outputs: t }) {
  const n = Mm(t), r = Dm(e)[0], s = Fo(r);
  return n.reduce((o, c) => nr(o, {
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
function tw({
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
    ...ew({ inputs: t, outputs: n }),
    ...ac({ inputs: t, outputs: n, receipts: r })
  ] : Ou(e) ? [
    ...ac({ inputs: t, outputs: n, receipts: r }),
    ...jm({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...qm({ inputs: t, receipts: r, baseAssetId: c })
  ] : [...Km(n)];
}
var An = (e) => {
  const t = fm(e);
  switch (t.type) {
    case de.ReturnData:
      return {
        ...t,
        data: e.data || "0x"
      };
    case de.LogData:
      return {
        ...t,
        data: e.data || "0x"
      };
    default:
      return t;
  }
}, nw = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, rw = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, sw = (e) => {
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
        S.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, iw = (e) => {
  let t, n, r, s, i, o = !1, c = !1, A = !1;
  if (e != null && e.type)
    switch (r = sw(e.type), e.type) {
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
function Os(e) {
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
    gasCosts: I,
    maxGasPerTx: m,
    gasPrice: x,
    baseAssetId: _
  } = e, R = Ms(n), C = H(o), F = tw({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: C,
    abiMap: A,
    maxInputs: h,
    baseAssetId: _
  }), M = Fu(i.type), G = B((l = (u = i.policies) == null ? void 0 : u.find((p) => p.type === Qt.Tip)) == null ? void 0 : l.data), { isStatusFailure: L, isStatusPending: W, isStatusSuccess: O, blockId: T, status: k, time: U, totalFee: q } = iw(c), V = vm({
    totalFee: q,
    gasPrice: x,
    rawPayload: C,
    tip: G,
    consensusParameters: {
      gasCosts: I,
      maxGasPerTx: m,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), Z = nw(n), ee = rw(n);
  let b;
  return U && (b = ji.fromTai64(U)), {
    id: t,
    tip: G,
    fee: V,
    gasUsed: R,
    operations: F,
    type: M,
    blockId: T,
    time: U,
    status: k,
    receipts: n,
    mintedAssets: Z,
    burnedAssets: ee,
    isTypeMint: Hm(i.type),
    isTypeCreate: Mu(i.type),
    isTypeScript: Ou(i.type),
    isTypeUpgrade: Xm(i.type),
    isTypeUpload: Vm(i.type),
    isStatusFailure: L,
    isStatusSuccess: O,
    isStatusPending: W,
    date: b,
    transaction: i
  };
}
function Mo(e, t, n = {}) {
  return e.reduce((r, s) => {
    if (s.type === de.LogData || s.type === de.Log) {
      const i = new jt(n[s.id] || t), o = s.type === de.Log ? new N("u64").encode(s.val0) : s.data, [c] = i.decodeLog(o, s.val1.toString());
      r.push(c);
    }
    return r;
  }, []);
}
var ds = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t, n) {
    /** Transaction ID */
    D(this, "id");
    /** Current provider */
    D(this, "provider");
    /** Gas used on the transaction */
    D(this, "gasUsed", B(0));
    /** The graphql Transaction with receipts object. */
    D(this, "gqlTransaction");
    D(this, "abis");
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
    const r = new ds(e, t, n);
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
      X(e.rawPayload),
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
    const s = r.map(An) || [], { gasPerByte: i, gasPriceFactor: o, gasCosts: c, maxGasPerTx: A } = this.provider.getGasConfig(), h = await this.provider.getLatestGasPrice(), I = this.provider.getChain().consensusParameters.txParameters.maxInputs, m = this.provider.getBaseAssetId();
    return Os({
      id: this.id,
      receipts: s,
      transaction: n,
      transactionBytes: X(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: i,
      gasPriceFactor: o,
      abiMap: e,
      maxInputs: I,
      gasCosts: c,
      maxGasPerTx: A,
      gasPrice: h,
      baseAssetId: m
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
          S.TRANSACTION_SQUEEZED_OUT,
          `Transaction Squeezed Out with reason: ${s.reason}`
        );
      if (s.type !== "SubmittedStatus")
        break;
    }
    await this.fetch();
  }
  /**
   * Assembles the result of a transaction by retrieving the transaction summary,
   * decoding logs (if available), and handling transaction failure.
   *
   * This method can be used to obtain the result of a transaction that has just
   * been submitted or one that has already been processed.
   *
   * @template TTransactionType - The type of the transaction.
   * @param contractsAbiMap - The map of contract ABIs.
   * @returns - The assembled transaction result.
   * @throws If the transaction status is a failure.
   */
  async assembleResult(e) {
    var o;
    const t = await this.getTransactionSummary(e), n = {
      gqlTransaction: this.gqlTransaction,
      ...t
    };
    let r = [];
    this.abis && (r = Mo(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), n.logs = r);
    const { gqlTransaction: s, receipts: i } = n;
    if (((o = s.status) == null ? void 0 : o.type) === "FailureStatus") {
      const { reason: c } = s.status;
      throw Qo({
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
   * @returns The completed transaction result
   */
  async waitForResult(e) {
    return await this.waitForStatusChange(), this.assembleResult(e);
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
function ow(e, t) {
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
function Lu(e, t, n = 0) {
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
      const A = ow(t, c);
      return await Od(A), Lu(e, t, c)(...r);
    }
  };
}
var aw = (...e) => {
  const t = {};
  function n({ amount: r, assetId: s }) {
    t[s] ? t[s] = t[s].add(r) : t[s] = r;
  }
  return e.forEach((r) => r.forEach(n)), Object.entries(t).map(([r, s]) => ({ assetId: r, amount: s }));
}, cc = 10, uc = 512, cw = 5, uw = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, {
    contractParams: i,
    feeParams: o,
    predicateParams: c,
    scriptParams: A,
    txParams: h,
    gasCosts: I,
    baseAssetId: m,
    chainId: x,
    version: _
  } = r;
  return {
    name: t,
    baseChainHeight: B(n),
    consensusParameters: {
      version: _,
      chainId: B(x),
      baseAssetId: m,
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
      gasCosts: I
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
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new am(t.cacheUtxo) : void 0;
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
    return Lu(async (...r) => {
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
        S.CHAIN_INFO_CACHE_EMPTY,
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
        S.NODE_INFO_CACHE_EMPTY,
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
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = md(e.nodeVersion);
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
    const e = kt.getFetchFn(this.options), t = new bh.GraphQLClient(this.url, {
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
    return im((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new _u({
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
    const { chain: e } = await this.operations.getChain(), t = uw(e);
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
    ki(this, Hi, ku).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = H(r.toTransactionBytes());
    let i;
    if (r.type === Le.Script && (i = r.abis), n) {
      const c = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: I } of c) {
        if (I.type === "SqueezedOutStatus")
          throw new v(
            S.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${I.reason}`
          );
        if (I.type !== "SubmittedStatus")
          break;
      }
      const A = r.getTransactionId(this.getChainId()), h = new ds(A, this, i);
      return await h.fetch(), h;
    }
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: s });
    return new ds(o, this, i);
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
    const s = H(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
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
      (i) => "predicate" in i && i.predicate && !D0(X(i.predicate), X("0x")) && new Me(i.predicateGasUsed).isZero()
    ))
      return e;
    const n = H(e.toTransactionBytes()), r = await this.operations.estimatePredicates({
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
    for (let i = 0; i < cc; i++) {
      const {
        dryRun: [{ receipts: o, status: c }]
      } = await this.operations.dryRun({
        encodedTransactions: [H(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(An), s = c;
      const { missingOutputVariables: A, missingOutputContractIds: h } = ic(t);
      if (A.length !== 0 || h.length !== 0) {
        r += A.length, e.addVariableOutputs(A.length), h.forEach(({ contractId: x }) => {
          e.addContractInputAndOutput(ue.fromString(x)), n.push(x);
        });
        const { maxFee: m } = await this.estimateTxGasAndFee({
          transactionRequest: e
        });
        e.maxFee = m;
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
      o.type === Le.Script && r.set(c, H(o.toTransactionBytes()));
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
        const I = s[h], { receipts: m, status: x } = c.dryRun[h], _ = t[I];
        _.receipts = m.map(An), _.dryRunStatus = x;
        const { missingOutputVariables: R, missingOutputContractIds: C } = ic(
          _.receipts
        ), F = R.length > 0 || C.length > 0, M = n[I];
        if (F && (M == null ? void 0 : M.type) === Le.Script) {
          _.outputVariables += R.length, M.addVariableOutputs(R.length), C.forEach(({ contractId: L }) => {
            M.addContractInputAndOutput(ue.fromString(L)), _.missingContractIds.push(L);
          });
          const { maxFee: G } = await this.estimateTxGasAndFee({
            transactionRequest: M
          });
          M.maxFee = G, r.set(I, H(M.toTransactionBytes())), A.push(I);
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
    const r = e.map((o) => H(o.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
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
    const c = Pi({
      gasPrice: B(n),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let A = B(0);
    t.type === Le.Script && (A = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(r, o)
    ), A = t.gasLimit));
    const h = t.calculateMaxGas(r, o), I = Pi({
      gasPrice: B(n),
      gas: h,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: c,
      maxGas: h,
      maxFee: I,
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
    const r = [H(n.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: r,
      utxoValidation: !0
    });
    return { receipts: s.map((o) => {
      const { id: c, receipts: A, status: h } = o, I = A.map(An);
      return { id: c, receipts: I, status: h };
    })[0].receipts };
  }
  /**
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the transaction.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param transactionCostParams - The transaction cost parameters (optional).
   *
   * @returns A promise that resolves to the transaction cost object.
   */
  async getTransactionCost(e, { resourcesOwner: t, signatureCallback: n, quantitiesToContract: r = [] } = {}) {
    const s = Gt(wt(e)), i = s.type === Le.Script, o = this.getBaseAssetId(), c = s.maxFee.eq(0), A = s.getCoinOutputsQuantities(), h = aw(A, r);
    s.fundWithFakeUtxos(h, o, t == null ? void 0 : t.address), i && (s.gasLimit = B(0)), t && "populateTransactionPredicateData" in t && t.populateTransactionPredicateData(s);
    const I = Gt(s);
    let m = 0;
    if (n && i) {
      const k = I.witnesses.length;
      await n(I), m = I.witnesses.length - k;
    }
    await this.estimatePredicates(I), s.updatePredicateGasUsed(I.inputs);
    let { maxFee: x, maxGas: _, minFee: R, minGas: C, gasPrice: F, gasLimit: M } = await this.estimateTxGasAndFee({
      transactionRequest: I
    }), G = [], L, W = [], O = 0, T = B(0);
    if (s.maxFee = x, i) {
      if (s.gasLimit = M, n && await n(s), { receipts: G, missingContractIds: W, outputVariables: O, dryRunStatus: L } = await this.estimateTxDependencies(s), L && "reason" in L)
        throw this.extractDryRunError(s, G, L);
      T = Ms(G), s.gasLimit = T, { maxFee: x, maxGas: _, minFee: R, minGas: C, gasPrice: F } = await this.estimateTxGasAndFee({
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
      outputVariables: O,
      missingContractIds: W,
      addedSignatures: m,
      estimatedPredicates: s.inputs,
      dryRunStatus: L,
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
    const r = ue.fromAddressOrString(e), s = wt(Gt(t)), i = await this.getTransactionCost(s, {
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
    const r = ue.fromAddressOrString(e), {
      coins: { edges: s, pageInfo: i }
    } = await this.operations.getCoins({
      ...this.validatePaginationArgs({
        paginationLimit: uc,
        inputArgs: n
      }),
      filter: { owner: r.toB256(), assetId: t && H(t) }
    });
    return {
      coins: s.map(({ node: c }) => ({
        id: c.utxoId,
        assetId: c.assetId,
        amount: B(c.amount),
        owner: ue.fromAddressOrString(c.owner),
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
    var A, h, I;
    const r = ue.fromAddressOrString(e), s = {
      messages: ((A = n == null ? void 0 : n.messages) == null ? void 0 : A.map((m) => H(m))) || [],
      utxos: ((h = n == null ? void 0 : n.utxos) == null ? void 0 : h.map((m) => H(m))) || []
    };
    if (this.cache) {
      const m = new Set(
        s.utxos.concat((I = this.cache) == null ? void 0 : I.getActiveData().map((x) => H(x)))
      );
      s.utxos = Array.from(m);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(_o).map(({ assetId: m, amount: x, max: _ }) => ({
        assetId: H(m),
        amount: x.toString(10),
        max: _ ? _.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((m) => {
      switch (m.type) {
        case "MessageCoin":
          return {
            amount: B(m.amount),
            assetId: m.assetId,
            daHeight: B(m.daHeight),
            sender: ue.fromAddressOrString(m.sender),
            recipient: ue.fromAddressOrString(m.recipient),
            nonce: m.nonce
          };
        case "Coin":
          return {
            id: m.utxoId,
            amount: B(m.amount),
            assetId: m.assetId,
            owner: ue.fromAddressOrString(m.owner),
            blockCreated: B(m.blockCreated),
            txCreatedIdx: B(m.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((m) => !!m);
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
    const {
      blocks: { edges: t, pageInfo: n }
    } = await this.operations.getBlocks({
      ...this.validatePaginationArgs({
        paginationLimit: cw,
        inputArgs: e
      })
    });
    return { blocks: t.map(({ node: s }) => ({
      id: s.id,
      height: B(s.height),
      time: s.header.time,
      transactionIds: s.transactions.map((i) => i.id)
    })), pageInfo: n };
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
          return (s = new Jt().decode(X(r.rawPayload), 0)) == null ? void 0 : s[0];
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
      X(t.rawPayload),
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
      ({ node: { rawPayload: i } }) => r.decode(X(i), 0)[0]
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
      contract: ue.fromAddressOrString(e).toB256(),
      asset: H(t)
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
      owner: ue.fromAddressOrString(e).toB256(),
      assetId: H(t)
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
      filter: { owner: ue.fromAddressOrString(e).toB256() }
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
    const {
      messages: { edges: n, pageInfo: r }
    } = await this.operations.getMessages({
      ...this.validatePaginationArgs({
        inputArgs: t,
        paginationLimit: uc
      }),
      owner: ue.fromAddressOrString(e).toB256()
    });
    return {
      messages: n.map(({ node: i }) => ({
        messageId: br.getMessageId({
          sender: i.sender,
          recipient: i.recipient,
          nonce: i.nonce,
          amount: B(i.amount),
          data: i.data
        }),
        sender: ue.fromAddressOrString(i.sender),
        recipient: ue.fromAddressOrString(i.recipient),
        nonce: i.nonce,
        amount: B(i.amount),
        data: br.decodeData(i.data),
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
        S.INVALID_INPUT_PARAMETERS,
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
      sender: I,
      recipient: m,
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
      sender: ue.fromAddressOrString(I),
      recipient: ue.fromAddressOrString(m),
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
      startTimestamp: t ? ji.fromUnixMilliseconds(t).toTai64() : void 0
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
    return new ds(e, this);
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
  validatePaginationArgs(e) {
    const { paginationLimit: t, inputArgs: n = {} } = e, { first: r, last: s, after: i, before: o } = n;
    if (i && o)
      throw new v(
        S.INVALID_INPUT_PARAMETERS,
        'Pagination arguments "after" and "before" cannot be used together'
      );
    if ((r || 0) > t || (s || 0) > t)
      throw new v(
        S.INVALID_INPUT_PARAMETERS,
        `Pagination limit for this query cannot exceed ${t} items`
      );
    if (r && o)
      throw new v(
        S.INVALID_INPUT_PARAMETERS,
        'The use of pagination argument "first" with "before" is not supported'
      );
    if (s && i)
      throw new v(
        S.INVALID_INPUT_PARAMETERS,
        'The use of pagination argument "last" with "after" is not supported'
      );
    return !r && !s && (n.first = t), n;
  }
  /**
   * @hidden
   */
  extractDryRunError(e, t, n) {
    const r = n;
    let s = [];
    return e.abis && (s = Mo(
      t,
      e.abis.main,
      e.abis.otherContractsAbis
    )), Qo({
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
async function $y(e) {
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new v(
      S.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Jt().decode(
    X(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const c = o.map(An), {
    consensusParameters: {
      feeParameters: { gasPerByte: A, gasPriceFactor: h },
      txParameters: { maxInputs: I, maxGasPerTx: m },
      gasCosts: x
    }
  } = n.getChain(), _ = await n.getLatestGasPrice(), R = n.getBaseAssetId(), C = Os({
    id: s.id,
    receipts: c,
    transaction: i,
    transactionBytes: X(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: B(A),
    gasPriceFactor: B(h),
    abiMap: r,
    maxInputs: I,
    gasCosts: x,
    maxGasPerTx: m,
    gasPrice: _,
    baseAssetId: R
  });
  return {
    gqlTransaction: s,
    ...C
  };
}
async function Ky(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.dryRun(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c, maxGasPerTx: A } = t.getGasConfig(), h = t.getChain().consensusParameters.txParameters.maxInputs, I = n.toTransaction(), m = n.toTransactionBytes(), x = await t.getLatestGasPrice(), _ = t.getBaseAssetId();
  return Os({
    receipts: s,
    transaction: I,
    transactionBytes: m,
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
async function eI(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: {
      feeParameters: { gasPerByte: c, gasPriceFactor: A },
      txParameters: { maxInputs: h, maxGasPerTx: I },
      gasCosts: m
    }
  } = n.getChain(), x = await n.getLatestGasPrice(), _ = n.getBaseAssetId();
  return {
    transactions: i.map((C) => {
      const { node: F } = C, { id: M, rawPayload: G, status: L } = F, [W] = new Jt().decode(X(G), 0);
      let O = [];
      F != null && F.status && "receipts" in F.status && (O = F.status.receipts);
      const T = O.map(An), k = Os({
        id: M,
        receipts: T,
        transaction: W,
        transactionBytes: X(G),
        gqlTransactionStatus: L,
        abiMap: r,
        gasPerByte: c,
        gasPriceFactor: A,
        maxInputs: h,
        gasCosts: m,
        maxGasPerTx: I,
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
var Un = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    devnet: 0,
    testnet: 0
  }
}, dw = (e) => {
  if (e === "ethereum")
    return Un.eth.sepolia;
  if (e === "fuel")
    return Un.fuel.testnet;
}, Aw = ({
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
  const { networks: r, ...s } = e, i = t ?? dw(n);
  if (i === void 0)
    return;
  const o = Aw({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, tI = (e, t) => Pu({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), nI = (e, t) => Pu({
  asset: e,
  networkType: "fuel",
  chainId: t
}), lw = "/", fw = /^\/|\/$/g, hw = (e = "") => e.replace(fw, "");
function gw(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(hw);
  return r && n && s.unshift(""), s.join(lw);
}
function pw(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: gw(t, n.icon)
  }));
}
var mw = "https://cdn.fuel.network/assets/", ww = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: Un.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: Un.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: Un.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: Un.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      }
    ]
  }
], rI = pw(ww, mw), yw = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new N("u64").encode(new Me(n).toNumber());
  return Uint8Array.from([
    ...X(r),
    ...i,
    ...X(t)
  ]);
}, Iw = async (e) => {
  const t = yw(e);
  await bo();
  const n = Ph(16, 0, Gh.ScriptData), r = Va(17, 16, 32), s = Ti(18, 17, 0), i = Va(19, 17, 8), o = kh(16, 18, 19), c = tu(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...c.to_bytes()
  ]), scriptData: t };
}, Ew = 2, Ls = class extends C0 {
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
    D(this, "address");
    /**
     * The provider used to interact with the network.
     */
    D(this, "_provider");
    /**
     * The connector for use with external wallets
     */
    D(this, "_connector");
    this._provider = n, this._connector = r, this.address = ue.fromDynamicInput(t);
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
      throw new v(S.MISSING_PROVIDER, "Provider not set");
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
    const { addedSignatures: r, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: o } = n, c = t.maxFee, A = this.provider.getBaseAssetId(), h = ((M = i.find((G) => G.assetId === A)) == null ? void 0 : M.amount) || B(0), I = rp({
      amount: B(c),
      assetId: A,
      coinQuantities: i
    }), m = {};
    I.forEach(({ amount: G, assetId: L }) => {
      m[L] = {
        required: G,
        owned: B(0)
      };
    }), t.inputs.filter(gn).forEach((G) => {
      const W = cr(G) ? String(G.assetId) : A;
      m[W] && (m[W].owned = m[W].owned.add(G.amount));
    });
    let x = [];
    Object.entries(m).forEach(([G, { owned: L, required: W }]) => {
      L.lt(W) && x.push({
        assetId: G,
        amount: W.sub(L)
      });
    });
    let _ = x.length > 0, R = 0;
    for (; _ && R < Ew; ) {
      const G = await this.getResourcesToSpend(
        x,
        bm(t.inputs, this.address)
      );
      t.addResources(G), t.updatePredicateGasUsed(s);
      const L = Gt(t);
      if (r && Array.from({ length: r }).forEach(
        () => L.addEmptyWitness()
      ), !o)
        break;
      const { maxFee: W } = await this.provider.estimateTxGasAndFee({
        transactionRequest: L
      }), O = Em(
        t.inputs,
        A,
        A
      ), T = h.add(W);
      O.gt(T) ? _ = !1 : x = [
        {
          amount: T.sub(O),
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
    let i = new Rn(s);
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
    let r = new Rn(n);
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
      ue.fromAddressOrString(r),
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
        S.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = ue.fromAddressOrString(t), o = r ?? this.provider.getBaseAssetId(), { script: c, scriptData: A } = await Iw({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: B(n),
      assetId: o
    });
    let h = new Rn({
      ...s,
      script: c,
      scriptData: A
    });
    h.addContractInputAndOutput(i);
    const I = await this.provider.getTransactionCost(h, {
      resourcesOwner: this,
      quantitiesToContract: [{ amount: B(n), assetId: String(o) }]
    });
    return h = this.validateGasLimitAndMaxFee({
      transactionRequest: h,
      gasUsed: I.gasUsed,
      maxFee: I.maxFee,
      txParams: s
    }), await this.fund(h, I), this.sendTransaction(h);
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
    const s = ue.fromAddressOrString(t), i = X(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = X(
      "0x".concat(B(n).toHex().substring(2).padStart(16, "0"))
    ), A = { script: new Uint8Array([
      ...X(_m.bytes),
      ...i,
      ...o
    ]), ...r }, h = this.provider.getBaseAssetId();
    let I = new Rn(A);
    const m = [{ amount: B(n), assetId: h }], x = await this.provider.getTransactionCost(I, { quantitiesToContract: m });
    return I = this.validateGasLimitAndMaxFee({
      transactionRequest: I,
      gasUsed: x.gasUsed,
      maxFee: x.maxFee,
      txParams: r
    }), await this.fund(I, x), this.sendTransaction(I);
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
      throw new v(S.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
        S.MISSING_CONNECTOR,
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
      id: H(Tt(fs)),
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
        S.INVALID_TRANSFER_AMOUNT,
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
    if (!Dn(s))
      o.gasLimit = t;
    else if (t.gt(s))
      throw new v(
        S.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!Dn(i))
      o.maxFee = n;
    else if (n.gt(i))
      throw new v(
        S.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${n}'.`
      );
    return o;
  }
}, rr = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    D(this, "address");
    D(this, "publicKey");
    D(this, "compressedPublicKey");
    D(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = Wt(e, 32);
    this.privateKey = H(t), this.publicKey = H(sn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = H(sn.getPublicKey(t, !0)), this.address = ue.fromPublicKey(this.publicKey);
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
    const t = sn.sign(X(e), X(this.privateKey)), n = Wt(`0x${t.r.toString(16)}`, 32), r = Wt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, H(ie([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = sn.ProjectivePoint.fromHex(X(this.compressedPublicKey)), n = sn.ProjectivePoint.fromHex(X(e));
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
    const n = X(t), r = n.slice(0, 32), s = n.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const c = new sn.Signature(BigInt(H(r)), BigInt(H(s))).addRecoveryBit(
      i
    ).recoverPublicKey(X(e)).toRawBytes(!1).slice(1);
    return H(c);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return ue.fromPublicKey(rr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? qt(ie([Tt(32), X(e)])) : Tt(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = sn.ProjectivePoint.fromHex(X(e));
    return H(t.toRawBytes(!1).slice(1));
  }
}, dc = 13, Ac = 8, lc = 1, gi = 32, bw = 16, fc = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function Cw(e, t, n) {
  const r = fn(fc(e), "hex"), s = ue.fromAddressOrString(t), i = Tt(gi), o = i0({
    password: fn(n),
    salt: i,
    dklen: gi,
    n: 2 ** dc,
    r: Ac,
    p: lc
  }), c = Tt(bw), A = await el(r, o, c), h = Uint8Array.from([...o.subarray(16, 32), ...A]), I = o0(h), m = hr(I, "hex"), x = {
    id: Tg(),
    version: 3,
    address: fc(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: m,
      cipherparams: { iv: hr(c, "hex") },
      ciphertext: hr(A, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: gi,
        n: 2 ** dc,
        p: lc,
        r: Ac,
        salt: hr(i, "hex")
      }
    }
  };
  return JSON.stringify(x);
}
async function Bw(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: A, p: h, salt: I }
    }
  } = n, m = fn(s, "hex"), x = fn(i, "hex"), _ = fn(I, "hex"), R = fn(t), C = i0({
    password: R,
    salt: _,
    n: c,
    p: h,
    r: A,
    dklen: o
  }), F = Uint8Array.from([...C.subarray(16, 32), ...m]), M = o0(F), G = hr(M, "hex");
  if (r !== G)
    throw new v(
      S.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const L = await KA(m, C, x);
  return H(L);
}
var Uu = class extends Ls {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new rr(t);
    super(r.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    D(this, "signer");
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
    const n = await this.signer().sign(sl(t));
    return H(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = wt(t), r = this.provider.getChainId(), s = n.getTransactionId(r), i = await this.signer().sign(s);
    return H(i);
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
    return Cw(this.privateKey, this.address, t);
  }
};
De(Uu, "defaultPath", "m/44'/1179993420'/0'/0/0");
var qr = [
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
], xw = /* @__PURE__ */ ((e) => (e.english = "english", e))(xw || {});
function _w(e) {
  return (1 << e) - 1;
}
function Gu(e) {
  return (1 << e) - 1 << 8 - e;
}
function pi(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function vw(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function Rw(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & _w(8 - n)), n += 3);
  const r = e.length / 4, s = X(mt(e))[0] & Gu(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function Sw(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = X(new Uint8Array(n));
  let s = 0;
  for (let h = 0; h < e.length; h += 1) {
    const I = t.indexOf(e[h].normalize("NFKD"));
    if (I === -1)
      throw new v(
        S.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[h]}' is not found in the provided wordlist.`
      );
    for (let m = 0; m < 11; m += 1)
      I & 1 << 10 - m && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, c = Gu(o);
  if ((X(mt(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new v(
      S.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var Qw = Yn("Bitcoin seed"), Nw = "0x0488ade4", Dw = "0x04358394", hc = [12, 15, 18, 21, 24];
function gc(e) {
  if (e.length !== 2048)
    throw new v(
      S.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function Tw(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new v(
      S.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function mi(e) {
  if (!hc.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${hc.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new v(S.INVALID_MNEMONIC, t);
  }
}
var on = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = qr) {
    D(this, "wordlist");
    this.wordlist = e, gc(this.wordlist);
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
  static mnemonicToEntropy(e, t = qr) {
    const n = pi(e);
    return mi(n), H(Sw(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = qr) {
    const n = X(e);
    return gc(t), Tw(n), Rw(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    mi(pi(e));
    const n = Yn(vw(e)), r = Yn(`mnemonic${t}`);
    return tl(n, r, 2048, 64, "sha512");
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
    const t = pi(e);
    let n = 0;
    try {
      mi(t);
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
    const t = qr;
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
    const t = X(e);
    if (t.length < 16 || t.length > 64)
      throw new v(
        S.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return X(a0("sha512", Qw, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = on.masterKeysFromSeed(e), r = X(t ? Dw : Nw), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), A = n.slice(0, 32), h = ie([
      r,
      s,
      i,
      o,
      c,
      ie(["0x00", A])
    ]), I = $i(mt(mt(h)), 0, 4);
    return Oc(ie([h, I]));
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
    const n = t ? mt(ie([Tt(e), X(t)])) : Tt(e);
    return on.entropyToMnemonic(n);
  }
}, Oo = on, zu = 2147483648, Hu = H("0x0488ade4"), Lo = H("0x0488b21e"), Xu = H("0x04358394"), ko = H("0x043587cf");
function pc(e) {
  return Oc(ie([e, $i(mt(mt(e)), 0, 4)]));
}
function Fw(e = !1, t = !1) {
  return e ? t ? ko : Lo : t ? Xu : Hu;
}
function Mw(e) {
  return [Lo, ko].includes(H(e.slice(0, 4)));
}
function Ow(e) {
  return [Hu, Xu, Lo, ko].includes(
    H(e.slice(0, 4))
  );
}
function Lw(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new v(S.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + zu : parseInt(r, 10)
  );
}
var Ln = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    D(this, "depth", 0);
    D(this, "index", 0);
    D(this, "fingerprint", H("0x00000000"));
    D(this, "parentFingerprint", H("0x00000000"));
    D(this, "privateKey");
    D(this, "publicKey");
    D(this, "chainCode");
    if (e.privateKey) {
      const t = new rr(e.privateKey);
      this.publicKey = H(t.compressedPublicKey), this.privateKey = H(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new v(
          S.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = H(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = $i(nl(mt(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && X(this.privateKey), n = X(this.publicKey), r = X(this.chainCode), s = new Uint8Array(37);
    if (e & zu) {
      if (!t)
        throw new v(
          S.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(X(this.publicKey));
    s.set(Wt(e, 4), 33);
    const i = X(a0("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
    if (t) {
      const m = B(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new Ln({
        privateKey: m,
        chainCode: c,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const h = new rr(H(o)).addPoint(n);
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
    return Lw(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
        S.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = Fw(this.privateKey == null || e, t), r = H(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = qi(this.index, 4), o = this.chainCode, c = this.privateKey != null && !e ? ie(["0x00", this.privateKey]) : this.publicKey, A = X(ie([n, r, s, i, o, c]));
    return pc(A);
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
      chainCode: X(t.slice(32)),
      privateKey: X(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = H(Wt(Gd(e))), n = X(t), r = pc(n.slice(0, 78)) === e;
    if (n.length !== 82 || !Ow(n))
      throw new v(S.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new v(S.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = H(n.slice(5, 9)), o = parseInt(H(n.slice(9, 13)).substring(2), 16), c = H(n.slice(13, 45)), A = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new v(
        S.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (Mw(n)) {
      if (A[0] !== 3)
        throw new v(S.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Ln({
        publicKey: A,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (A[0] !== 0)
      throw new v(S.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Ln({
      privateKey: A.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, wi = Ln, Vu = class extends Ls {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Et(e, this._provider);
  }
}, Et = class extends Uu {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new rr("0x00"), new Vu(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = rr.generatePrivateKey(e == null ? void 0 : e.entropy);
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
    const s = wi.fromSeed(e).derivePath(t || Et.defaultPath);
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
    const s = Oo.mnemonicToSeed(e, n), o = wi.fromSeed(s).derivePath(t || Et.defaultPath);
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
    const n = wi.fromExtendedKey(e);
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
    const r = await Bw(e, t);
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
    return new Vu(e, t);
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
var kw = class {
  constructor() {
    D(this, "storage", /* @__PURE__ */ new Map());
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
}, Bn, Yu = class {
  constructor(e) {
    dn(this, Bn, void 0), De(this, "pathKey", "{}"), De(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), De(this, "numberOfAccounts", 0), Dt(this, Bn, e.secret || Oo.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Re(this, Bn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = Ct.fromMnemonic(Re(this, Bn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Ct.fromMnemonic(Re(this, Bn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = ue.fromAddressOrString(e);
    do {
      const r = Ct.fromMnemonic(Re(this, Bn), this.getDerivePath(t));
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new v(
      S.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Ct.fromPrivateKey(t);
  }
};
Bn = /* @__PURE__ */ new WeakMap();
De(Yu, "type", "mnemonic");
var an, Zu = class {
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
    const t = ue.fromAddressOrString(e), n = Re(this, an).find(
      (r) => Ct.fromPrivateKey(r).address.equals(t)
    );
    if (!n)
      throw new v(
        S.WALLET_MANAGER_ERROR,
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
De(Zu, "type", "privateKey");
var Xt = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function Vt(e, t) {
  if (!e)
    throw new v(S.WALLET_MANAGER_ERROR, t);
}
var yt, xn, Pt, Xi, Wu, Vi, Ju, qu = class extends yu.EventEmitter {
  constructor(e) {
    super(), dn(this, Xi), dn(this, Vi), De(this, "storage", new kw()), De(this, "STORAGE_KEY", "WalletManager"), dn(this, yt, []), dn(this, xn, ""), dn(this, Pt, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Re(this, Pt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    Vt(!Re(this, Pt), Xt.wallet_not_unlocked);
    const t = Re(this, yt).find((n, r) => r === e);
    return Vt(t, Xt.vault_not_found), t.vault.serialize();
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
    const t = ue.fromAddressOrString(e), n = Re(this, yt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return Vt(n, Xt.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = ue.fromAddressOrString(e);
    Vt(!Re(this, Pt), Xt.wallet_not_unlocked);
    const n = Re(this, yt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return Vt(n, Xt.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Re(this, yt)[(e == null ? void 0 : e.vaultId) || 0];
    await Vt(t, Xt.vault_not_found);
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
    Dt(this, Pt, !0), Dt(this, yt, []), Dt(this, xn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Dt(this, xn, e), Dt(this, Pt, !1);
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
    await this.unlock(e), Dt(this, xn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await Vt(!Re(this, Pt), Xt.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await jA(Re(this, xn), JSON.parse(e));
      Dt(this, yt, ki(this, Vi, Ju).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await Vt(!Re(this, Pt), Xt.wallet_not_unlocked);
    const e = await $A(Re(this, xn), {
      vaults: ki(this, Xi, Wu).call(this, Re(this, yt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = qu.Vaults.find((n) => n.type === e);
    return Vt(t, Xt.invalid_vault_type), t;
  }
}, Pw = qu;
yt = /* @__PURE__ */ new WeakMap();
xn = /* @__PURE__ */ new WeakMap();
Pt = /* @__PURE__ */ new WeakMap();
Xi = /* @__PURE__ */ new WeakSet();
Wu = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
Vi = /* @__PURE__ */ new WeakSet();
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
De(Pw, "Vaults", [Yu, Zu]);
var Uw = class {
  constructor(e) {
    throw new v(S.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new v(S.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new v(S.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new v(S.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new v(S.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new v(S.NOT_IMPLEMENTED, "Not implemented.");
  }
};
De(Uw, "type");
var sI = class {
}, Gw = (e) => {
  const n = X(e), r = Dc(n, 16384), s = Iu(r.map((o) => H(o)));
  return qt(ie(["0x4655454C", s]));
}, mc = class extends Ls {
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
    const { predicateBytes: o, predicateInterface: c } = mc.processPredicateData(
      t,
      n,
      i
    ), A = ue.fromB256(Gw(o));
    super(A, r);
    D(this, "bytes");
    D(this, "predicateData", []);
    D(this, "interface");
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
      Gi(s, this.address) && (s.predicate = H(this.bytes), s.predicateData = H(this.getPredicateData()), s.witnessIndex = 0);
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
    let s = X(t), i;
    if (n && (i = new jt(n), i.functions.main === void 0))
      throw new v(
        S.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = mc.setConfigurableConstants(
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
      predicate: H(this.bytes),
      predicateData: H(this.getPredicateData())
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
      predicate: H(this.bytes),
      predicateData: H(this.getPredicateData())
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
        S.INVALID_CONFIGURABLE_CONSTANTS,
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
    const n = t.inputs.filter(gn).filter((o) => Gi(o, this.address));
    let r = -1;
    const s = n.find((o) => !o.predicate);
    return s && (r = s.witnessIndex, n.every((c) => !c.predicate) || (i = n[0]) != null && i.predicate && (r = -1)), r;
  }
}, ju = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(ju || {}), Po = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(Po || {}), $u = "FuelConnector", zw = class {
  constructor(e) {
    D(this, "storage");
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
}, Hw = class extends yu.EventEmitter {
  constructor() {
    super(...arguments);
    D(this, "name", "");
    D(this, "metadata", {});
    D(this, "connected", !1);
    D(this, "installed", !1);
    D(this, "events", Po);
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
   * Should add the assets metadata to the connector and return true if the asset
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
   * Should add the asset metadata to the connector and return true if the asset
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
function Xw(e, { cache: t, cacheTime: n, key: r }) {
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
function iI(e) {
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
async function jr(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var Yw = 2e3, Zw = 5e3, { warn: Ww } = console, yr = class extends Hw {
  constructor(t = yr.defaultConfig) {
    super();
    D(this, "_storage", null);
    D(this, "_connectors", []);
    D(this, "_targetObject", null);
    D(this, "_unsubscribes", []);
    D(this, "_targetUnsubscribe");
    D(this, "_pingCache", {});
    D(this, "_currentConnector");
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    D(this, "setupConnectorListener", () => {
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
    D(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    D(this, "triggerConnectorEvents", async () => {
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
    D(this, "getConnector", (t) => this._connectors.find((n) => {
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
      return new zw(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(yr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
      jr(t.isConnected()),
      jr(this.pingConnector(t))
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
      return await Xw(async () => jr(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: Zw
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(Po)), await ((o = this._storage) == null ? void 0 : o.setItem(yr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    }), jr(t.promise, Yw).then(() => !0).catch(() => !1);
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
    return Ww(
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
        throw new v(S.INVALID_PROVIDER, "Provider is not valid.");
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
    return new Ls(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(yr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, Ku = yr;
De(Ku, "STORAGE_KEY", "fuel-current-connector");
De(Ku, "defaultConfig", {});
function wc(e, t) {
  if (!e)
    throw new v(S.TRANSACTION_ERROR, t);
}
function ed(e) {
  return e.reduce((t, n, r) => {
    const { program: s, externalAbis: i } = n.getCallConfig();
    return r === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var td = (e, t, n) => {
  if (!t)
    return [];
  const { main: r, otherContractsAbis: s } = ed(n);
  return Mo(e, r, s);
}, Ut, vc, nd = (vc = class {
  constructor(...e) {
    Rt(this, Ut);
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
    return H(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Fe(this, Ut), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Ut = new WeakMap(), vc), Jw = (e) => f0 + l0({ maxInputs: e });
function qw(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === de.ScriptResult ? n = i : (i.type === de.Return || i.type === de.ReturnData || i.type === de.Revert) && (r = i);
  }), !n || !r)
    throw new v(S.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: n.result,
    gasUsed: n.gasUsed,
    receipts: t,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: e
  };
}
function Uo(e, t, n = []) {
  var r;
  try {
    const s = qw(e);
    return t(s);
  } catch (s) {
    if (s.code === S.SCRIPT_REVERTED) {
      const i = (r = e == null ? void 0 : e.dryRunStatus) == null ? void 0 : r.reason;
      throw Qo({
        logs: n,
        receipts: e.receipts,
        statusReason: i
      });
    }
    throw s;
  }
}
function jw(e, t, n) {
  return Uo(
    e,
    (r) => {
      if (r.returnReceipt.type === de.Revert)
        throw new v(
          S.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== de.Return && r.returnReceipt.type !== de.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new v(
          S.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: n,
            receipt: r.returnReceipt
          })}`
        );
      }
      let s;
      return r.returnReceipt.type === de.Return && (s = r.returnReceipt.val), r.returnReceipt.type === de.ReturnData && (s = t.func.decodeOutput(r.returnReceipt.data)[0]), s;
    },
    n
  );
}
var ks = class {
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
    D(this, "bytes");
    /**
     * A function to encode the script data.
     */
    D(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    D(this, "scriptResultDecoder");
    this.bytes = X(e), this.scriptDataEncoder = t, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return l0({ maxInputs: t }) + f0 + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return ks.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = X(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return Uo(e, this.scriptResultDecoder, t);
  }
}, rd = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, $w = Ne, sd = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: n,
  assetIdOffset: r
}) => {
  const s = new nd(
    Wr(16, e),
    Wr(17, n),
    Ti(17, 17, 0),
    Wr(18, r)
  );
  return t ? s.push(
    Wr(19, t),
    Ti(19, 19, 0),
    Xa(16, 17, 18, 19)
  ) : s.push(Xa(16, 17, 18, Oe.cgas().to_u8())), s;
};
function yc(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new nd();
  for (let n = 0; n < e.length; n += 1)
    t.extend(sd(e[n]).entries());
  return t.push(tu(1)), t.toBytes();
}
var Kw = (e) => e === de.Return || e === de.ReturnData, ey = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === de.Call && r === $w && s === t
), ty = (e) => (t) => {
  if (cn(t.code) !== 0)
    throw new v(S.SCRIPT_REVERTED, "Transaction reverted.");
  const n = ey(
    t.receipts,
    e.toB256()
  ), r = B(n == null ? void 0 : n.is);
  return t.receipts.filter(({ type: i }) => Kw(i)).flatMap((i) => r.eq(B(i.is)) ? i.type === de.Return ? [new N("u64").encode(i.val)] : i.type === de.ReturnData ? [X(i.data)] : [new Uint8Array()] : []);
}, ny = (e, t, n = []) => Uo(e, ty(t), n), ry = (e) => e.reduce(
  (t, n) => {
    const r = { ...rd };
    return n.gas && (r.gasForwardedOffset = 1), t + sd(r).byteLength();
  },
  zt.size()
  // placeholder for single RET instruction which is added later
), sy = (e, t) => new ks(
  // Script to call the contract, start with stub size matching length of calls
  yc(new Array(e.length).fill(rd)),
  (n) => {
    var _;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = ry(n), i = (8 - s % 8) % 8, o = s + i, c = Jw(t.toNumber()) + o, A = [];
    let h = c;
    const I = [];
    for (let R = 0; R < r; R += 1) {
      const C = n[R], F = h, M = F + ge, G = M + hs, L = G + Cl + ge + ge, W = L + C.fnSelectorBytes.byteLength, O = X(C.data);
      let T = 0;
      I.push(new N("u64").encode(C.amount || 0)), I.push(new z().encode(((_ = C.assetId) == null ? void 0 : _.toString()) || Ne)), I.push(C.contractId.toBytes()), I.push(new N("u64").encode(L)), I.push(new N("u64").encode(W)), I.push(C.fnSelectorBytes), I.push(O), C.gas && (I.push(new N("u64").encode(C.gas)), T = W + O.byteLength);
      const k = {
        amountOffset: F,
        assetIdOffset: M,
        gasForwardedOffset: T,
        callDataOffset: G
      };
      A.push(k), h = c + ie(I).byteLength;
    }
    const m = yc(A);
    return { data: ie(I), script: m };
  },
  () => [new Uint8Array()]
), id = (e, t, n, r) => {
  var c;
  const s = (c = e[0]) == null ? void 0 : c.getCallConfig();
  if (e.length === 1 && s && "bytes" in s.program)
    return jw({ receipts: t }, s, r);
  const o = ny(
    { receipts: t },
    (s == null ? void 0 : s.program).id,
    r
  ).map((A, h) => {
    var m;
    const { func: I } = e[h].getCallConfig();
    return (m = I.decodeOutput(A)) == null ? void 0 : m[0];
  });
  return n ? o : o == null ? void 0 : o[0];
}, iy = async (e) => {
  var _;
  const { funcScope: t, isMultiCall: n, program: r, transactionResponse: s } = e, i = await s.waitForResult(), { receipts: o } = i, c = Array.isArray(t) ? t : [t], A = (_ = c[0]) == null ? void 0 : _.getCallConfig(), h = td(o, A, c), I = id(c, o, n, h), m = Ms(o);
  return {
    isMultiCall: n,
    functionScopes: c,
    value: I,
    program: r,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: h,
    gasUsed: m
  };
}, yi = (e) => {
  var m;
  const { funcScopes: t, callResult: n, isMultiCall: r } = e, { receipts: s } = n, i = Array.isArray(t) ? t : [t], o = (m = i[0]) == null ? void 0 : m.getCallConfig(), c = td(s, o, i), A = id(i, s, r, c), h = Ms(s);
  return {
    functionScopes: i,
    callResult: n,
    isMultiCall: r,
    gasUsed: h,
    value: A
  };
};
function oy(e) {
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
    D(this, "transactionRequest");
    D(this, "program");
    D(this, "functionInvocationScopes", []);
    D(this, "txParameters");
    D(this, "requiredCoins", []);
    D(this, "isMultiCall", !1);
    D(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    D(this, "externalAbis", {});
    D(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new Rn();
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
    return this.functionInvocationScopes.map((n) => oy(n));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), n = sy(this.functionInvocationScopes, t);
    this.transactionRequest.setScript(n, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId), t.externalContractsAbis && Object.keys(t.externalContractsAbis).forEach(
        (n) => this.transactionRequest.addContractInputAndOutput(ue.fromB256(n))
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
    await bo(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === Le.Script && (this.transactionRequest.abis = ed(this.functionInvocationScopes));
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
        S.TRANSACTION_ERROR,
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
      e.addContractInputAndOutput(ue.fromString(c));
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
      ue.fromAddressOrString(n),
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
        ue.fromAddressOrString(n),
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
   * Submits the contract call transaction and returns a promise that resolves to an object
   * containing the transaction ID and a function to wait for the result. The promise will resolve
   * as soon as the transaction is submitted to the node.
   *
   * @returns A promise that resolves to an object containing:
   * - `transactionId`: The ID of the submitted transaction.
   * - `waitForResult`: A function that waits for the transaction result.
   * @template T - The type of the return value.
   */
  async call() {
    wc(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      awaitExecution: !1,
      estimateTxDependencies: !1
    });
    return {
      transactionId: t.id,
      waitForResult: async () => iy({
        funcScope: this.functionInvocationScopes,
        isMultiCall: this.isMultiCall,
        program: this.program,
        transactionResponse: t
      })
    };
  }
  /**
   * Simulates a transaction.
   *
   * @returns The result of the invocation call.
   */
  async simulate() {
    if (wc(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new v(
        S.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return yi({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
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
    return yi({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return yi({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
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
    const r = Dn((c = this.txParameters) == null ? void 0 : c.gasLimit) || this.hasCallParamsGasLimit, s = Dn((A = this.txParameters) == null ? void 0 : A.maxFee), { gasLimit: i, maxFee: o } = e;
    if (!r)
      e.gasLimit = t;
    else if (i.lt(t))
      throw new v(
        S.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${t}'.`
      );
    if (!s)
      e.maxFee = n;
    else if (n.gt(o))
      throw new v(
        S.MAX_FEE_TOO_LOW,
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
    D(this, "func");
    D(this, "callParameters");
    D(this, "forward");
    D(this, "args");
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
          S.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = _o(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, ay = class extends od {
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
}, cy = class {
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
    D(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    D(this, "provider");
    /**
     * The contract's ABI interface.
     */
    D(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    D(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    D(this, "functions", {});
    this.interface = t instanceof jt ? t : new jt(t), this.id = ue.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
    return new ay(this, e);
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
}, uy = class extends ad {
  constructor() {
    super(...arguments);
    D(this, "scriptRequest");
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
    this.scriptRequest = new ks(
      t,
      (r) => this.func.encodeArguments(r),
      () => []
    );
  }
}, oI = class extends Pl {
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
    D(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    D(this, "interface");
    /**
     * The account associated with the script.
     */
    D(this, "account");
    /**
     * The script request object.
     */
    D(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    D(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    D(this, "functions");
    this.bytes = X(t), this.interface = new jt(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new uy(this, this.interface.getFunction("main"), s)
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
        S.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new ks(
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
function aI(e) {
  return e;
}
var dy = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(dy || {}), Ay = Object.defineProperty, ly = (e, t) => {
  for (var n in t)
    Ay(e, n, { get: t[n], enumerable: !0 });
}, fy = {};
ly(fy, {
  MAX_CONTRACT_SIZE: () => cd,
  getContractId: () => Ad,
  getContractRoot: () => ud,
  getContractStorageRoot: () => dd,
  hexlifyWithPrefix: () => Yi
});
var cd = 102400, ud = (e) => {
  const n = X(e), r = Dc(n, 16384);
  return Iu(r.map((s) => H(s)));
}, dd = (e) => {
  const t = new ep();
  return e.forEach(({ key: n, value: r }) => t.update(mt(n), r)), t.root;
}, Ad = (e, t, n) => {
  const r = ud(X(e));
  return mt(ie(["0x4655454C", t, r, n]));
}, Yi = (e) => H(e.startsWith("0x") ? e : `0x${e}`), hy = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, n = null) {
    D(this, "bytecode");
    D(this, "interface");
    D(this, "provider");
    D(this, "account");
    this.bytecode = X(e), t instanceof jt ? this.interface = t : this.interface = new jt(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new hy(this.bytecode, this.interface, e);
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
      key: Yi(c),
      value: Yi(A)
    })).sort(({ key: c }, { key: A }) => c.localeCompare(A)), n = {
      salt: Tt(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new v(
        S.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || dd(n.storageSlots), s = Ad(this.bytecode, n.salt, r), i = new zi({
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
    if (this.bytecode.length > cd)
      throw new v(
        S.CONTRACT_SIZE_EXCEEDS_LIMIT,
        "Contract bytecode is too large. Max contract size is 100KB"
      );
    const { contractId: t, transactionRequest: n } = await this.prepareDeploy(e), r = this.getAccount(), s = await r.sendTransaction(n, {
      awaitExecution: !1
    });
    return { waitForResult: async () => {
      const o = await s.waitForResult();
      return { contract: new cy(t, this.interface, r), transactionResult: o };
    }, contractId: t, transactionId: s.id };
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
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r), o = X(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new v(
        S.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
  getAccount() {
    if (!this.account)
      throw new v(S.ACCOUNT_REQUIRED, "Account not assigned to contract.");
    return this.account;
  }
  async prepareDeploy(e) {
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), s = this.getAccount(), i = await s.provider.getTransactionCost(r), { maxFee: o } = e;
    if (Dn(o)) {
      if (i.maxFee.gt(o))
        throw new v(
          S.MAX_FEE_TOO_LOW,
          `Max fee '${e.maxFee}' is lower than the required: '${i.maxFee}'.`
        );
    } else
      r.maxFee = i.maxFee;
    return await s.fund(r, i), {
      contractId: n,
      transactionRequest: r
    };
  }
}, cI = 9, uI = 3, dI = 9, AI = 9, lI = 18, fI = 15, hI = 12, gI = 9, Ic = "http://127.0.0.1:4000/v1/graphql", pI = "https://devnet.fuel.network/v1/graphql", mI = "https://testnet.fuel.network/v1/graphql", Rc, wI = typeof process < "u" && ((Rc = process == null ? void 0 : process.env) == null ? void 0 : Rc.FUEL_NETWORK_URL) || Ic;
export {
  hs as ASSET_ID_LEN,
  Ir as AbiCoder,
  C0 as AbstractAccount,
  Ll as AbstractAddress,
  kl as AbstractContract,
  B0 as AbstractProgram,
  Pl as AbstractScript,
  Sy as AbstractScriptRequest,
  Ls as Account,
  ue as Address,
  Gm as AddressType,
  we as ArrayCoder,
  z as B256Coder,
  vl as B512Coder,
  cw as BLOCKS_PAGE_SIZE_LIMIT,
  Me as BN,
  pn as BYTES_32,
  Do as BaseTransactionRequest,
  Uu as BaseWalletUnlocked,
  N as BigNumberCoder,
  Sl as BooleanCoder,
  be as ByteArrayCoder,
  h0 as ByteCoder,
  Un as CHAIN_IDS,
  Cl as CONTRACT_ID_LEN,
  Ty as CONTRACT_MAX_SIZE,
  zm as ChainName,
  Yy as ChangeOutputCollisionError,
  ce as Coder,
  dy as Commands,
  cy as Contract,
  hy as ContractFactory,
  fy as ContractUtils,
  zi as CreateTransactionRequest,
  AI as DECIMAL_FUEL,
  gI as DECIMAL_GWEI,
  fI as DECIMAL_KWEI,
  hI as DECIMAL_MWEI,
  lI as DECIMAL_WEI,
  dI as DEFAULT_DECIMAL_UNITS,
  uI as DEFAULT_MIN_PRECISION,
  cI as DEFAULT_PRECISION,
  pI as DEVNET_NETWORK_URL,
  ji as DateTime,
  ls as ENCODING_V1,
  Dy as EmptyRoot,
  g0 as EnumCoder,
  S as ErrorCode,
  Dh as FAILED_ASSERT_EQ_SIGNAL,
  Fh as FAILED_ASSERT_NE_SIGNAL,
  Th as FAILED_ASSERT_SIGNAL,
  Nh as FAILED_REQUIRE_SIGNAL,
  $0 as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  Uy as FAILED_UNKNOWN_SIGNAL,
  ps as FUEL_BECH32_HRP_PREFIX,
  wI as FUEL_NETWORK_URL,
  Ku as Fuel,
  Hw as FuelConnector,
  $u as FuelConnectorEventType,
  Po as FuelConnectorEventTypes,
  ju as FuelConnectorMethods,
  v as FuelError,
  ad as FunctionInvocationScope,
  wi as HDWallet,
  Ry as INPUT_COIN_FIXED_SIZE,
  mn as InputCoder,
  fa as InputCoinCoder,
  ms as InputContractCoder,
  br as InputMessageCoder,
  Ce as InputType,
  nd as InstructionSet,
  jt as Interface,
  Ic as LOCAL_NETWORK_URL,
  xw as Language,
  zw as LocalStorage,
  Py as MAX_PREDICATE_DATA_LENGTH,
  ky as MAX_PREDICATE_LENGTH,
  Oy as MAX_SCRIPT_DATA_LENGTH,
  My as MAX_SCRIPT_LENGTH,
  Ly as MAX_STATIC_CONTRACTS,
  Fy as MAX_WITNESSES,
  hc as MNEMONIC_SIZES,
  kw as MemoryStorage,
  Oo as Mnemonic,
  Yu as MnemonicVault,
  ay as MultiCallInvocationScope,
  Im as NoWitnessAtIndexError,
  Zy as NoWitnessByOwnerError,
  $ as NumberCoder,
  Um as OperationName,
  y0 as OptionCoder,
  ga as OutputChangeCoder,
  wn as OutputCoder,
  ha as OutputCoinCoder,
  ws as OutputContractCoder,
  ma as OutputContractCreatedCoder,
  Ie as OutputType,
  pa as OutputVariableCoder,
  Oh as PANIC_DOC_URL,
  Mh as PANIC_REASONS,
  yn as PoliciesCoder,
  Qt as PolicyType,
  mc as Predicate,
  Zu as PrivateKeyVault,
  Cs as Provider,
  uc as RESOURCES_PAGE_SIZE_LIMIT,
  Nl as RawSliceCoder,
  vi as ReceiptBurnCoder,
  wa as ReceiptCallCoder,
  Qy as ReceiptCoder,
  Ca as ReceiptLogCoder,
  Ba as ReceiptLogDataCoder,
  ys as ReceiptMessageOutCoder,
  Cr as ReceiptMintCoder,
  Ea as ReceiptPanicCoder,
  ya as ReceiptReturnCoder,
  Ia as ReceiptReturnDataCoder,
  ba as ReceiptRevertCoder,
  va as ReceiptScriptResultCoder,
  xa as ReceiptTransferCoder,
  _a as ReceiptTransferOutCoder,
  de as ReceiptType,
  f0 as SCRIPT_FIXED_SIZE,
  oI as Script,
  ks as ScriptRequest,
  Rn as ScriptTransactionRequest,
  rr as Signer,
  Ao as StdStringCoder,
  sI as StorageAbstract,
  Ra as StorageSlotCoder,
  I0 as StrSliceCoder,
  Dl as StringCoder,
  vs as StructCoder,
  mI as TESTNET_NETWORK_URL,
  Jt as TransactionCoder,
  Na as TransactionCreateCoder,
  Da as TransactionMintCoder,
  ds as TransactionResponse,
  Qa as TransactionScriptCoder,
  Pm as TransactionStatus,
  Le as TransactionType,
  km as TransactionTypeName,
  Ta as TransactionUpgradeCoder,
  Fa as TransactionUploadCoder,
  E0 as TupleCoder,
  jn as TxPointerCoder,
  fs as UTXO_ID_LEN,
  Ny as UtxoIdCoder,
  Uw as Vault,
  Tl as VecCoder,
  ge as WORD_SIZE,
  Ct as Wallet,
  Vu as WalletLocked,
  Pw as WalletManager,
  Et as WalletUnlocked,
  In as WitnessCoder,
  Ne as ZeroBytes32,
  rp as addAmountToCoinQuantities,
  nr as addOperation,
  gr as addressify,
  X as arrayify,
  wm as assemblePanicError,
  fm as assembleReceiptByType,
  ym as assembleRevertError,
  Os as assembleTransactionSummary,
  wc as assert,
  rI as assets,
  B as bn,
  fn as bufferFromString,
  Vy as buildBlockExplorerUrl,
  yi as buildDryRunResult,
  iy as buildFunctionResult,
  Xw as cacheFor,
  Wy as cacheRequestInputsResources,
  bm as cacheRequestInputsResourcesFromOwner,
  Pi as calculateGasFee,
  Ru as calculateMetadataGasForTxCreate,
  Su as calculateMetadataGasForTxScript,
  vm as calculateTXFeeForSummary,
  l0 as calculateVmTxMemory,
  Iy as capitalizeString,
  Dc as chunkAndPadBytes,
  Vl as clearFirst12BytesFromB256,
  _o as coinQuantityfy,
  a0 as computeHmac,
  ie as concat,
  Bs as concatBytes,
  aI as createConfig,
  $i as dataSlice,
  Gd as decodeBase58,
  jA as decrypt,
  KA as decryptJsonWalletData,
  Cy as defaultConsensusKey,
  by as defaultSnapshotConfigs,
  Vw as deferPromise,
  iI as dispatchFuelConnectorEvent,
  Oc as encodeBase58,
  $A as encrypt,
  el as encryptJsonWalletData,
  qr as english,
  rw as extractBurnedAssetsFromReceipts,
  id as extractInvocationResult,
  nw as extractMintedAssetsFromReceipts,
  Qo as extractTxError,
  my as format,
  py as formatUnits,
  fo as fromBech32,
  mw as fuelAssetsBaseUrl,
  pm as gasUsedByInputs,
  ed as getAbisFromAllCalls,
  Em as getAssetAmountInRequestInputs,
  tI as getAssetEth,
  nI as getAssetFuel,
  Aw as getAssetNetwork,
  Pu as getAssetWithNetwork,
  ho as getBytesFromBech32,
  jm as getContractCallOperations,
  ew as getContractCreatedOperations,
  Mo as getDecodedLogs,
  dw as getDefaultChainId,
  Ms as getGasUsedFromReceipts,
  Fo as getInputAccountAddress,
  Fm as getInputContractFromIndex,
  Du as getInputFromAssetId,
  To as getInputsByType,
  Sm as getInputsByTypes,
  Qm as getInputsCoin,
  Dm as getInputsCoinAndMessage,
  Tm as getInputsContract,
  Nm as getInputsMessage,
  So as getMaxGas,
  vu as getMinGas,
  S0 as getMintedAssetId,
  tw as getOperations,
  kr as getOutputsByType,
  Om as getOutputsChange,
  Tu as getOutputsCoin,
  Lm as getOutputsContract,
  Mm as getOutputsContractCreated,
  Jy as getOutputsVariable,
  Km as getPayProducerOperations,
  Gw as getPredicateRoot,
  Xl as getRandomB256,
  _r as getReceiptsByType,
  Ym as getReceiptsCall,
  Zm as getReceiptsMessageOut,
  jy as getReceiptsTransferOut,
  ic as getReceiptsWithMissingData,
  Qu as getRequestInputResourceOwner,
  td as getResultLogs,
  sw as getTransactionStatusName,
  $y as getTransactionSummary,
  Ky as getTransactionSummaryFromRequest,
  Fu as getTransactionTypeName,
  eI as getTransactionsSummaries,
  ac as getTransferOperations,
  qm as getWithdrawFromFuelOperations,
  qy as hasSameAssetId,
  qt as hash,
  sl as hashMessage,
  H as hexlify,
  cm as inputify,
  xi as isB256,
  is as isBech32,
  dm as isCoin,
  Dn as isDefined,
  _i as isEvmAddress,
  Xy as isMessage,
  Aa as isPublicKey,
  zy as isRawCoin,
  Hy as isRawMessage,
  cr as isRequestInputCoin,
  No as isRequestInputMessage,
  gn as isRequestInputResource,
  Gi as isRequestInputResourceFromOwner,
  Pr as isType,
  Mu as isTypeCreate,
  Hm as isTypeMint,
  Ou as isTypeScript,
  Xm as isTypeUpgrade,
  Vm as isTypeUpload,
  o0 as keccak256,
  vy as keyFromPassword,
  wy as max,
  yy as multiply,
  Hl as normalizeBech32,
  mm as normalizeJSON,
  Ey as normalizeString,
  um as outputify,
  Yl as padFirst12BytesOfEvmAddress,
  tl as pbkdf2,
  An as processGqlReceipt,
  iw as processGraphqlStatus,
  Tt as randomBytes,
  ww as rawAssets,
  hn as resolveGasDependentCosts,
  pw as resolveIconPaths,
  oc as returnZeroScript,
  nl as ripemd160,
  i0 as scrypt,
  mt as sha256,
  Od as sleep,
  $l as sortPolicies,
  hr as stringFromBuffer,
  la as toB256,
  ss as toBech32,
  Wt as toBytes,
  vd as toFixed,
  qi as toHex,
  cn as toNumber,
  Yn as toUtf8Bytes,
  Ki as toUtf8String,
  wt as transactionRequestify,
  rl as uint64ToBytesBE,
  gw as urlJoin,
  jr as withTimeout,
  _m as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
