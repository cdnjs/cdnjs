var Uu = Object.defineProperty;
var Gu = (e, t, n) => t in e ? Uu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var S = (e, t, n) => (Gu(e, typeof t != "symbol" ? t + "" : t, n), n), zs = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var gt = (e, t, n) => (zs(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Wt = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Rn = (e, t, n, r) => (zs(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var Hs = (e, t, n) => (zs(e, t, "access private method"), n);
function ic() {
  return {
    FORC: "0.58.0",
    FUEL_CORE: "0.26.0",
    FUELS: "0.86.0"
  };
}
function Oo(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function Di(e, t) {
  const n = Oo(e), r = Oo(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function Xu(e, t) {
  const { major: n } = Di(e, t);
  return n === 0;
}
function Yu(e, t) {
  const { minor: n } = Di(e, t);
  return n === 0;
}
function Vu(e, t) {
  const { patch: n } = Di(e, t);
  return n === 0;
}
function zu(e) {
  const { FUEL_CORE: t } = ic();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: Xu(e, t),
    isMinorSupported: Yu(e, t),
    isPatchSupported: Vu(e, t)
  };
}
var Hu = ic(), Zu = Object.defineProperty, Ju = (e, t, n) => t in e ? Zu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Wu = (e, t, n) => (Ju(e, typeof t != "symbol" ? t + "" : t, n), n), N = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e))(N || {}), Pr = class extends Error {
  constructor(t, n, r = {}) {
    super(n);
    S(this, "VERSIONS", Hu);
    S(this, "metadata");
    S(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = r;
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new Pr(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(N);
    if (!r.includes(n.code))
      throw new Pr(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new Pr(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, metadata: s, VERSIONS: i } = this;
    return { code: t, name: n, message: r, metadata: s, VERSIONS: i };
  }
}, v = Pr;
Wu(v, "CODES", N);
var Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ti(e) {
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
var Fi = { exports: {} };
const ju = {}, $u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ju
}, Symbol.toStringTag, { value: "Module" })), Ku = /* @__PURE__ */ Ti($u);
Fi.exports;
(function(e) {
  (function(t, n) {
    function r(E, a) {
      if (!E)
        throw new Error(a || "Assertion failed");
    }
    function s(E, a) {
      E.super_ = a;
      var c = function() {
      };
      c.prototype = a.prototype, E.prototype = new c(), E.prototype.constructor = E;
    }
    function i(E, a, c) {
      if (i.isBN(E))
        return E;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, E !== null && ((a === "le" || a === "be") && (c = a, a = 10), this._init(E || 0, a || 10, c || "be"));
    }
    typeof t == "object" ? t.exports = i : n.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = Ku.Buffer;
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
    function d(E, a) {
      var c = E.charCodeAt(a);
      if (c >= 48 && c <= 57)
        return c - 48;
      if (c >= 65 && c <= 70)
        return c - 55;
      if (c >= 97 && c <= 102)
        return c - 87;
      r(!1, "Invalid character in " + E);
    }
    function A(E, a, c) {
      var l = d(E, c);
      return c - 1 >= a && (l |= d(E, c - 1) << 4), l;
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
    function h(E, a, c, l) {
      for (var p = 0, f = 0, w = Math.min(E.length, c), y = a; y < w; y++) {
        var g = E.charCodeAt(y) - 48;
        p *= l, g >= 49 ? f = g - 49 + 10 : g >= 17 ? f = g - 17 + 10 : f = g, r(g >= 0 && f < l, "Invalid character"), p += f;
      }
      return p;
    }
    i.prototype._parseBase = function(a, c, l) {
      this.words = [0], this.length = 1;
      for (var p = 0, f = 1; f <= 67108863; f *= c)
        p++;
      p--, f = f / c | 0;
      for (var w = a.length - l, y = w % p, g = Math.min(w, w - y) + l, u = 0, m = l; m < g; m += p)
        u = h(a, m, m + p, c), this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (y !== 0) {
        var J = 1;
        for (u = h(a, m, a.length, c), m = 0; m < y; m++)
          J *= c;
        this.imuln(J), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      }
      this._strip();
    }, i.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        a.words[c] = this.words[c];
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
        var u = x[a], m = R[a];
        l = "";
        var J = this.clone();
        for (J.negative = 0; !J.isZero(); ) {
          var W = J.modrn(m).toString(a);
          J = J.idivn(m), J.isZero() ? l = W + l : l = _[u - W.length] + W + l;
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
    function M(E) {
      for (var a = new Array(E.bitLength()), c = 0; c < a.length; c++) {
        var l = c / 26 | 0, p = c % 26;
        a[c] = E.words[l] >>> p & 1;
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
    function F(E, a, c) {
      c.negative = a.negative ^ E.negative;
      var l = E.length + a.length | 0;
      c.length = l, l = l - 1 | 0;
      var p = E.words[0] | 0, f = a.words[0] | 0, w = p * f, y = w & 67108863, g = w / 67108864 | 0;
      c.words[0] = y;
      for (var u = 1; u < l; u++) {
        for (var m = g >>> 26, J = g & 67108863, W = Math.min(u, a.length - 1), K = Math.max(0, u - E.length + 1); K <= W; K++) {
          var j = u - K | 0;
          p = E.words[j] | 0, f = a.words[K] | 0, w = p * f + J, m += w / 67108864 | 0, J = w & 67108863;
        }
        c.words[u] = J | 0, g = m | 0;
      }
      return g !== 0 ? c.words[u] = g | 0 : c.length--, c._strip();
    }
    var X = function(a, c, l) {
      var p = a.words, f = c.words, w = l.words, y = 0, g, u, m, J = p[0] | 0, W = J & 8191, K = J >>> 13, j = p[1] | 0, re = j & 8191, se = j >>> 13, Se = p[2] | 0, he = Se & 8191, oe = Se >>> 13, xe = p[3] | 0, Ae = xe & 8191, ge = xe >>> 13, Dt = p[4] | 0, ve = Dt & 8191, Ie = Dt >>> 13, nr = p[5] | 0, Qe = nr & 8191, Te = nr >>> 13, Rr = p[6] | 0, ke = Rr & 8191, Pe = Rr >>> 13, Co = p[7] | 0, Ue = Co & 8191, Ge = Co >>> 13, Bo = p[8] | 0, Xe = Bo & 8191, Ye = Bo >>> 13, _o = p[9] | 0, Ve = _o & 8191, ze = _o >>> 13, xo = f[0] | 0, He = xo & 8191, Ze = xo >>> 13, vo = f[1] | 0, Je = vo & 8191, We = vo >>> 13, Ro = f[2] | 0, qe = Ro & 8191, je = Ro >>> 13, So = f[3] | 0, $e = So & 8191, Ke = So >>> 13, Qo = f[4] | 0, et = Qo & 8191, tt = Qo >>> 13, No = f[5] | 0, nt = No & 8191, rt = No >>> 13, Do = f[6] | 0, st = Do & 8191, it = Do >>> 13, To = f[7] | 0, ot = To & 8191, at = To >>> 13, Fo = f[8] | 0, ct = Fo & 8191, dt = Fo >>> 13, Mo = f[9] | 0, ut = Mo & 8191, At = Mo >>> 13;
      l.negative = a.negative ^ c.negative, l.length = 19, g = Math.imul(W, He), u = Math.imul(W, Ze), u = u + Math.imul(K, He) | 0, m = Math.imul(K, Ze);
      var xs = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (xs >>> 26) | 0, xs &= 67108863, g = Math.imul(re, He), u = Math.imul(re, Ze), u = u + Math.imul(se, He) | 0, m = Math.imul(se, Ze), g = g + Math.imul(W, Je) | 0, u = u + Math.imul(W, We) | 0, u = u + Math.imul(K, Je) | 0, m = m + Math.imul(K, We) | 0;
      var vs = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (vs >>> 26) | 0, vs &= 67108863, g = Math.imul(he, He), u = Math.imul(he, Ze), u = u + Math.imul(oe, He) | 0, m = Math.imul(oe, Ze), g = g + Math.imul(re, Je) | 0, u = u + Math.imul(re, We) | 0, u = u + Math.imul(se, Je) | 0, m = m + Math.imul(se, We) | 0, g = g + Math.imul(W, qe) | 0, u = u + Math.imul(W, je) | 0, u = u + Math.imul(K, qe) | 0, m = m + Math.imul(K, je) | 0;
      var Rs = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Rs >>> 26) | 0, Rs &= 67108863, g = Math.imul(Ae, He), u = Math.imul(Ae, Ze), u = u + Math.imul(ge, He) | 0, m = Math.imul(ge, Ze), g = g + Math.imul(he, Je) | 0, u = u + Math.imul(he, We) | 0, u = u + Math.imul(oe, Je) | 0, m = m + Math.imul(oe, We) | 0, g = g + Math.imul(re, qe) | 0, u = u + Math.imul(re, je) | 0, u = u + Math.imul(se, qe) | 0, m = m + Math.imul(se, je) | 0, g = g + Math.imul(W, $e) | 0, u = u + Math.imul(W, Ke) | 0, u = u + Math.imul(K, $e) | 0, m = m + Math.imul(K, Ke) | 0;
      var Ss = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ss >>> 26) | 0, Ss &= 67108863, g = Math.imul(ve, He), u = Math.imul(ve, Ze), u = u + Math.imul(Ie, He) | 0, m = Math.imul(Ie, Ze), g = g + Math.imul(Ae, Je) | 0, u = u + Math.imul(Ae, We) | 0, u = u + Math.imul(ge, Je) | 0, m = m + Math.imul(ge, We) | 0, g = g + Math.imul(he, qe) | 0, u = u + Math.imul(he, je) | 0, u = u + Math.imul(oe, qe) | 0, m = m + Math.imul(oe, je) | 0, g = g + Math.imul(re, $e) | 0, u = u + Math.imul(re, Ke) | 0, u = u + Math.imul(se, $e) | 0, m = m + Math.imul(se, Ke) | 0, g = g + Math.imul(W, et) | 0, u = u + Math.imul(W, tt) | 0, u = u + Math.imul(K, et) | 0, m = m + Math.imul(K, tt) | 0;
      var Qs = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Qs >>> 26) | 0, Qs &= 67108863, g = Math.imul(Qe, He), u = Math.imul(Qe, Ze), u = u + Math.imul(Te, He) | 0, m = Math.imul(Te, Ze), g = g + Math.imul(ve, Je) | 0, u = u + Math.imul(ve, We) | 0, u = u + Math.imul(Ie, Je) | 0, m = m + Math.imul(Ie, We) | 0, g = g + Math.imul(Ae, qe) | 0, u = u + Math.imul(Ae, je) | 0, u = u + Math.imul(ge, qe) | 0, m = m + Math.imul(ge, je) | 0, g = g + Math.imul(he, $e) | 0, u = u + Math.imul(he, Ke) | 0, u = u + Math.imul(oe, $e) | 0, m = m + Math.imul(oe, Ke) | 0, g = g + Math.imul(re, et) | 0, u = u + Math.imul(re, tt) | 0, u = u + Math.imul(se, et) | 0, m = m + Math.imul(se, tt) | 0, g = g + Math.imul(W, nt) | 0, u = u + Math.imul(W, rt) | 0, u = u + Math.imul(K, nt) | 0, m = m + Math.imul(K, rt) | 0;
      var Ns = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ns >>> 26) | 0, Ns &= 67108863, g = Math.imul(ke, He), u = Math.imul(ke, Ze), u = u + Math.imul(Pe, He) | 0, m = Math.imul(Pe, Ze), g = g + Math.imul(Qe, Je) | 0, u = u + Math.imul(Qe, We) | 0, u = u + Math.imul(Te, Je) | 0, m = m + Math.imul(Te, We) | 0, g = g + Math.imul(ve, qe) | 0, u = u + Math.imul(ve, je) | 0, u = u + Math.imul(Ie, qe) | 0, m = m + Math.imul(Ie, je) | 0, g = g + Math.imul(Ae, $e) | 0, u = u + Math.imul(Ae, Ke) | 0, u = u + Math.imul(ge, $e) | 0, m = m + Math.imul(ge, Ke) | 0, g = g + Math.imul(he, et) | 0, u = u + Math.imul(he, tt) | 0, u = u + Math.imul(oe, et) | 0, m = m + Math.imul(oe, tt) | 0, g = g + Math.imul(re, nt) | 0, u = u + Math.imul(re, rt) | 0, u = u + Math.imul(se, nt) | 0, m = m + Math.imul(se, rt) | 0, g = g + Math.imul(W, st) | 0, u = u + Math.imul(W, it) | 0, u = u + Math.imul(K, st) | 0, m = m + Math.imul(K, it) | 0;
      var Ds = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ds >>> 26) | 0, Ds &= 67108863, g = Math.imul(Ue, He), u = Math.imul(Ue, Ze), u = u + Math.imul(Ge, He) | 0, m = Math.imul(Ge, Ze), g = g + Math.imul(ke, Je) | 0, u = u + Math.imul(ke, We) | 0, u = u + Math.imul(Pe, Je) | 0, m = m + Math.imul(Pe, We) | 0, g = g + Math.imul(Qe, qe) | 0, u = u + Math.imul(Qe, je) | 0, u = u + Math.imul(Te, qe) | 0, m = m + Math.imul(Te, je) | 0, g = g + Math.imul(ve, $e) | 0, u = u + Math.imul(ve, Ke) | 0, u = u + Math.imul(Ie, $e) | 0, m = m + Math.imul(Ie, Ke) | 0, g = g + Math.imul(Ae, et) | 0, u = u + Math.imul(Ae, tt) | 0, u = u + Math.imul(ge, et) | 0, m = m + Math.imul(ge, tt) | 0, g = g + Math.imul(he, nt) | 0, u = u + Math.imul(he, rt) | 0, u = u + Math.imul(oe, nt) | 0, m = m + Math.imul(oe, rt) | 0, g = g + Math.imul(re, st) | 0, u = u + Math.imul(re, it) | 0, u = u + Math.imul(se, st) | 0, m = m + Math.imul(se, it) | 0, g = g + Math.imul(W, ot) | 0, u = u + Math.imul(W, at) | 0, u = u + Math.imul(K, ot) | 0, m = m + Math.imul(K, at) | 0;
      var Ts = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ts >>> 26) | 0, Ts &= 67108863, g = Math.imul(Xe, He), u = Math.imul(Xe, Ze), u = u + Math.imul(Ye, He) | 0, m = Math.imul(Ye, Ze), g = g + Math.imul(Ue, Je) | 0, u = u + Math.imul(Ue, We) | 0, u = u + Math.imul(Ge, Je) | 0, m = m + Math.imul(Ge, We) | 0, g = g + Math.imul(ke, qe) | 0, u = u + Math.imul(ke, je) | 0, u = u + Math.imul(Pe, qe) | 0, m = m + Math.imul(Pe, je) | 0, g = g + Math.imul(Qe, $e) | 0, u = u + Math.imul(Qe, Ke) | 0, u = u + Math.imul(Te, $e) | 0, m = m + Math.imul(Te, Ke) | 0, g = g + Math.imul(ve, et) | 0, u = u + Math.imul(ve, tt) | 0, u = u + Math.imul(Ie, et) | 0, m = m + Math.imul(Ie, tt) | 0, g = g + Math.imul(Ae, nt) | 0, u = u + Math.imul(Ae, rt) | 0, u = u + Math.imul(ge, nt) | 0, m = m + Math.imul(ge, rt) | 0, g = g + Math.imul(he, st) | 0, u = u + Math.imul(he, it) | 0, u = u + Math.imul(oe, st) | 0, m = m + Math.imul(oe, it) | 0, g = g + Math.imul(re, ot) | 0, u = u + Math.imul(re, at) | 0, u = u + Math.imul(se, ot) | 0, m = m + Math.imul(se, at) | 0, g = g + Math.imul(W, ct) | 0, u = u + Math.imul(W, dt) | 0, u = u + Math.imul(K, ct) | 0, m = m + Math.imul(K, dt) | 0;
      var Fs = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Fs >>> 26) | 0, Fs &= 67108863, g = Math.imul(Ve, He), u = Math.imul(Ve, Ze), u = u + Math.imul(ze, He) | 0, m = Math.imul(ze, Ze), g = g + Math.imul(Xe, Je) | 0, u = u + Math.imul(Xe, We) | 0, u = u + Math.imul(Ye, Je) | 0, m = m + Math.imul(Ye, We) | 0, g = g + Math.imul(Ue, qe) | 0, u = u + Math.imul(Ue, je) | 0, u = u + Math.imul(Ge, qe) | 0, m = m + Math.imul(Ge, je) | 0, g = g + Math.imul(ke, $e) | 0, u = u + Math.imul(ke, Ke) | 0, u = u + Math.imul(Pe, $e) | 0, m = m + Math.imul(Pe, Ke) | 0, g = g + Math.imul(Qe, et) | 0, u = u + Math.imul(Qe, tt) | 0, u = u + Math.imul(Te, et) | 0, m = m + Math.imul(Te, tt) | 0, g = g + Math.imul(ve, nt) | 0, u = u + Math.imul(ve, rt) | 0, u = u + Math.imul(Ie, nt) | 0, m = m + Math.imul(Ie, rt) | 0, g = g + Math.imul(Ae, st) | 0, u = u + Math.imul(Ae, it) | 0, u = u + Math.imul(ge, st) | 0, m = m + Math.imul(ge, it) | 0, g = g + Math.imul(he, ot) | 0, u = u + Math.imul(he, at) | 0, u = u + Math.imul(oe, ot) | 0, m = m + Math.imul(oe, at) | 0, g = g + Math.imul(re, ct) | 0, u = u + Math.imul(re, dt) | 0, u = u + Math.imul(se, ct) | 0, m = m + Math.imul(se, dt) | 0, g = g + Math.imul(W, ut) | 0, u = u + Math.imul(W, At) | 0, u = u + Math.imul(K, ut) | 0, m = m + Math.imul(K, At) | 0;
      var Ms = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ms >>> 26) | 0, Ms &= 67108863, g = Math.imul(Ve, Je), u = Math.imul(Ve, We), u = u + Math.imul(ze, Je) | 0, m = Math.imul(ze, We), g = g + Math.imul(Xe, qe) | 0, u = u + Math.imul(Xe, je) | 0, u = u + Math.imul(Ye, qe) | 0, m = m + Math.imul(Ye, je) | 0, g = g + Math.imul(Ue, $e) | 0, u = u + Math.imul(Ue, Ke) | 0, u = u + Math.imul(Ge, $e) | 0, m = m + Math.imul(Ge, Ke) | 0, g = g + Math.imul(ke, et) | 0, u = u + Math.imul(ke, tt) | 0, u = u + Math.imul(Pe, et) | 0, m = m + Math.imul(Pe, tt) | 0, g = g + Math.imul(Qe, nt) | 0, u = u + Math.imul(Qe, rt) | 0, u = u + Math.imul(Te, nt) | 0, m = m + Math.imul(Te, rt) | 0, g = g + Math.imul(ve, st) | 0, u = u + Math.imul(ve, it) | 0, u = u + Math.imul(Ie, st) | 0, m = m + Math.imul(Ie, it) | 0, g = g + Math.imul(Ae, ot) | 0, u = u + Math.imul(Ae, at) | 0, u = u + Math.imul(ge, ot) | 0, m = m + Math.imul(ge, at) | 0, g = g + Math.imul(he, ct) | 0, u = u + Math.imul(he, dt) | 0, u = u + Math.imul(oe, ct) | 0, m = m + Math.imul(oe, dt) | 0, g = g + Math.imul(re, ut) | 0, u = u + Math.imul(re, At) | 0, u = u + Math.imul(se, ut) | 0, m = m + Math.imul(se, At) | 0;
      var Os = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Os >>> 26) | 0, Os &= 67108863, g = Math.imul(Ve, qe), u = Math.imul(Ve, je), u = u + Math.imul(ze, qe) | 0, m = Math.imul(ze, je), g = g + Math.imul(Xe, $e) | 0, u = u + Math.imul(Xe, Ke) | 0, u = u + Math.imul(Ye, $e) | 0, m = m + Math.imul(Ye, Ke) | 0, g = g + Math.imul(Ue, et) | 0, u = u + Math.imul(Ue, tt) | 0, u = u + Math.imul(Ge, et) | 0, m = m + Math.imul(Ge, tt) | 0, g = g + Math.imul(ke, nt) | 0, u = u + Math.imul(ke, rt) | 0, u = u + Math.imul(Pe, nt) | 0, m = m + Math.imul(Pe, rt) | 0, g = g + Math.imul(Qe, st) | 0, u = u + Math.imul(Qe, it) | 0, u = u + Math.imul(Te, st) | 0, m = m + Math.imul(Te, it) | 0, g = g + Math.imul(ve, ot) | 0, u = u + Math.imul(ve, at) | 0, u = u + Math.imul(Ie, ot) | 0, m = m + Math.imul(Ie, at) | 0, g = g + Math.imul(Ae, ct) | 0, u = u + Math.imul(Ae, dt) | 0, u = u + Math.imul(ge, ct) | 0, m = m + Math.imul(ge, dt) | 0, g = g + Math.imul(he, ut) | 0, u = u + Math.imul(he, At) | 0, u = u + Math.imul(oe, ut) | 0, m = m + Math.imul(oe, At) | 0;
      var Ls = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ls >>> 26) | 0, Ls &= 67108863, g = Math.imul(Ve, $e), u = Math.imul(Ve, Ke), u = u + Math.imul(ze, $e) | 0, m = Math.imul(ze, Ke), g = g + Math.imul(Xe, et) | 0, u = u + Math.imul(Xe, tt) | 0, u = u + Math.imul(Ye, et) | 0, m = m + Math.imul(Ye, tt) | 0, g = g + Math.imul(Ue, nt) | 0, u = u + Math.imul(Ue, rt) | 0, u = u + Math.imul(Ge, nt) | 0, m = m + Math.imul(Ge, rt) | 0, g = g + Math.imul(ke, st) | 0, u = u + Math.imul(ke, it) | 0, u = u + Math.imul(Pe, st) | 0, m = m + Math.imul(Pe, it) | 0, g = g + Math.imul(Qe, ot) | 0, u = u + Math.imul(Qe, at) | 0, u = u + Math.imul(Te, ot) | 0, m = m + Math.imul(Te, at) | 0, g = g + Math.imul(ve, ct) | 0, u = u + Math.imul(ve, dt) | 0, u = u + Math.imul(Ie, ct) | 0, m = m + Math.imul(Ie, dt) | 0, g = g + Math.imul(Ae, ut) | 0, u = u + Math.imul(Ae, At) | 0, u = u + Math.imul(ge, ut) | 0, m = m + Math.imul(ge, At) | 0;
      var ks = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (ks >>> 26) | 0, ks &= 67108863, g = Math.imul(Ve, et), u = Math.imul(Ve, tt), u = u + Math.imul(ze, et) | 0, m = Math.imul(ze, tt), g = g + Math.imul(Xe, nt) | 0, u = u + Math.imul(Xe, rt) | 0, u = u + Math.imul(Ye, nt) | 0, m = m + Math.imul(Ye, rt) | 0, g = g + Math.imul(Ue, st) | 0, u = u + Math.imul(Ue, it) | 0, u = u + Math.imul(Ge, st) | 0, m = m + Math.imul(Ge, it) | 0, g = g + Math.imul(ke, ot) | 0, u = u + Math.imul(ke, at) | 0, u = u + Math.imul(Pe, ot) | 0, m = m + Math.imul(Pe, at) | 0, g = g + Math.imul(Qe, ct) | 0, u = u + Math.imul(Qe, dt) | 0, u = u + Math.imul(Te, ct) | 0, m = m + Math.imul(Te, dt) | 0, g = g + Math.imul(ve, ut) | 0, u = u + Math.imul(ve, At) | 0, u = u + Math.imul(Ie, ut) | 0, m = m + Math.imul(Ie, At) | 0;
      var Ps = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ps >>> 26) | 0, Ps &= 67108863, g = Math.imul(Ve, nt), u = Math.imul(Ve, rt), u = u + Math.imul(ze, nt) | 0, m = Math.imul(ze, rt), g = g + Math.imul(Xe, st) | 0, u = u + Math.imul(Xe, it) | 0, u = u + Math.imul(Ye, st) | 0, m = m + Math.imul(Ye, it) | 0, g = g + Math.imul(Ue, ot) | 0, u = u + Math.imul(Ue, at) | 0, u = u + Math.imul(Ge, ot) | 0, m = m + Math.imul(Ge, at) | 0, g = g + Math.imul(ke, ct) | 0, u = u + Math.imul(ke, dt) | 0, u = u + Math.imul(Pe, ct) | 0, m = m + Math.imul(Pe, dt) | 0, g = g + Math.imul(Qe, ut) | 0, u = u + Math.imul(Qe, At) | 0, u = u + Math.imul(Te, ut) | 0, m = m + Math.imul(Te, At) | 0;
      var Us = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Us >>> 26) | 0, Us &= 67108863, g = Math.imul(Ve, st), u = Math.imul(Ve, it), u = u + Math.imul(ze, st) | 0, m = Math.imul(ze, it), g = g + Math.imul(Xe, ot) | 0, u = u + Math.imul(Xe, at) | 0, u = u + Math.imul(Ye, ot) | 0, m = m + Math.imul(Ye, at) | 0, g = g + Math.imul(Ue, ct) | 0, u = u + Math.imul(Ue, dt) | 0, u = u + Math.imul(Ge, ct) | 0, m = m + Math.imul(Ge, dt) | 0, g = g + Math.imul(ke, ut) | 0, u = u + Math.imul(ke, At) | 0, u = u + Math.imul(Pe, ut) | 0, m = m + Math.imul(Pe, At) | 0;
      var Gs = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Gs >>> 26) | 0, Gs &= 67108863, g = Math.imul(Ve, ot), u = Math.imul(Ve, at), u = u + Math.imul(ze, ot) | 0, m = Math.imul(ze, at), g = g + Math.imul(Xe, ct) | 0, u = u + Math.imul(Xe, dt) | 0, u = u + Math.imul(Ye, ct) | 0, m = m + Math.imul(Ye, dt) | 0, g = g + Math.imul(Ue, ut) | 0, u = u + Math.imul(Ue, At) | 0, u = u + Math.imul(Ge, ut) | 0, m = m + Math.imul(Ge, At) | 0;
      var Xs = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Xs >>> 26) | 0, Xs &= 67108863, g = Math.imul(Ve, ct), u = Math.imul(Ve, dt), u = u + Math.imul(ze, ct) | 0, m = Math.imul(ze, dt), g = g + Math.imul(Xe, ut) | 0, u = u + Math.imul(Xe, At) | 0, u = u + Math.imul(Ye, ut) | 0, m = m + Math.imul(Ye, At) | 0;
      var Ys = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ys >>> 26) | 0, Ys &= 67108863, g = Math.imul(Ve, ut), u = Math.imul(Ve, At), u = u + Math.imul(ze, ut) | 0, m = Math.imul(ze, At);
      var Vs = (y + g | 0) + ((u & 8191) << 13) | 0;
      return y = (m + (u >>> 13) | 0) + (Vs >>> 26) | 0, Vs &= 67108863, w[0] = xs, w[1] = vs, w[2] = Rs, w[3] = Ss, w[4] = Qs, w[5] = Ns, w[6] = Ds, w[7] = Ts, w[8] = Fs, w[9] = Ms, w[10] = Os, w[11] = Ls, w[12] = ks, w[13] = Ps, w[14] = Us, w[15] = Gs, w[16] = Xs, w[17] = Ys, w[18] = Vs, y !== 0 && (w[19] = y, l.length++), l;
    };
    Math.imul || (X = F);
    function k(E, a, c) {
      c.negative = a.negative ^ E.negative, c.length = E.length + a.length;
      for (var l = 0, p = 0, f = 0; f < c.length - 1; f++) {
        var w = p;
        p = 0;
        for (var y = l & 67108863, g = Math.min(f, a.length - 1), u = Math.max(0, f - E.length + 1); u <= g; u++) {
          var m = f - u, J = E.words[m] | 0, W = a.words[u] | 0, K = J * W, j = K & 67108863;
          w = w + (K / 67108864 | 0) | 0, j = j + y | 0, y = j & 67108863, w = w + (j >>> 26) | 0, p += w >>> 26, w &= 67108863;
        }
        c.words[f] = y, l = w, w = p;
      }
      return l !== 0 ? c.words[f] = l : c.length--, c._strip();
    }
    function Z(E, a, c) {
      return k(E, a, c);
    }
    i.prototype.mulTo = function(a, c) {
      var l, p = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = X(this, a, c) : p < 63 ? l = F(this, a, c) : p < 1024 ? l = k(this, a, c) : l = Z(this, a, c), l;
    }, i.prototype.mul = function(a) {
      var c = new i(null);
      return c.words = new Array(this.length + a.length), this.mulTo(a, c);
    }, i.prototype.mulf = function(a) {
      var c = new i(null);
      return c.words = new Array(this.length + a.length), Z(this, a, c);
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
      var c = M(a);
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
        for (var u = 0; u < w; u++)
          g.words[u] = this.words[u];
        g.length = w;
      }
      if (w !== 0)
        if (this.length > w)
          for (this.length -= w, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + w];
        else
          this.words[0] = 0, this.length = 1;
      var m = 0;
      for (u = this.length - 1; u >= 0 && (m !== 0 || u >= p); u--) {
        var J = this.words[u] | 0;
        this.words[u] = m << 26 - f | J >>> f, m = J & y;
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
      var g = p.length - f.length, u;
      if (c !== "mod") {
        u = new i(null), u.length = g + 1, u.words = new Array(u.length);
        for (var m = 0; m < u.length; m++)
          u.words[m] = 0;
      }
      var J = p.clone()._ishlnsubmul(f, 1, g);
      J.negative === 0 && (p = J, u && (u.words[g] = 1));
      for (var W = g - 1; W >= 0; W--) {
        var K = (p.words[f.length + W] | 0) * 67108864 + (p.words[f.length + W - 1] | 0);
        for (K = Math.min(K / w | 0, 67108863), p._ishlnsubmul(f, K, W); p.negative !== 0; )
          K--, p.negative = 0, p._ishlnsubmul(f, 1, W), p.isZero() || (p.negative ^= 1);
        u && (u.words[W] = K);
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
      for (var u = l.clone(), m = c.clone(); !c.isZero(); ) {
        for (var J = 0, W = 1; !(c.words[0] & W) && J < 26; ++J, W <<= 1)
          ;
        if (J > 0)
          for (c.iushrn(J); J-- > 0; )
            (p.isOdd() || f.isOdd()) && (p.iadd(u), f.isub(m)), p.iushrn(1), f.iushrn(1);
        for (var K = 0, j = 1; !(l.words[0] & j) && K < 26; ++K, j <<= 1)
          ;
        if (K > 0)
          for (l.iushrn(K); K-- > 0; )
            (w.isOdd() || y.isOdd()) && (w.iadd(u), y.isub(m)), w.iushrn(1), y.iushrn(1);
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
        for (var u = 0, m = 1; !(l.words[0] & m) && u < 26; ++u, m <<= 1)
          ;
        if (u > 0)
          for (l.iushrn(u); u-- > 0; )
            f.isOdd() && f.iadd(w), f.iushrn(1);
        c.cmp(l) >= 0 ? (c.isub(l), p.isub(f)) : (l.isub(c), f.isub(p));
      }
      var J;
      return c.cmpn(1) === 0 ? J = p : J = f, J.cmpn(0) < 0 && J.iadd(a), J;
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
    function T(E, a) {
      this.name = E, this.p = new i(a, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
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
    function L() {
      T.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(L, T), L.prototype.split = function(a, c) {
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
    }, L.prototype.imulK = function(a) {
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
    function V() {
      T.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(V, T), V.prototype.imulK = function(a) {
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
        c = new L();
      else if (a === "p224")
        c = new U();
      else if (a === "p192")
        c = new q();
      else if (a === "p25519")
        c = new V();
      else
        throw new Error("Unknown prime " + a);
      return O[a] = c, c;
    };
    function H(E) {
      if (typeof E == "string") {
        var a = i._prime(E);
        this.m = a.p, this.prime = a;
      } else
        r(E.gtn(1), "modulus must be greater than 1"), this.m = E, this.prime = null;
    }
    H.prototype._verify1 = function(a) {
      r(a.negative === 0, "red works only with positives"), r(a.red, "red works only with red numbers");
    }, H.prototype._verify2 = function(a, c) {
      r((a.negative | c.negative) === 0, "red works only with positives"), r(
        a.red && a.red === c.red,
        "red works only with red numbers"
      );
    }, H.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (b(a, a.umod(this.m)._forceRed(this)), a);
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
      var w = new i(1).toRed(this), y = w.redNeg(), g = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, g).cmp(y) !== 0; )
        u.redIAdd(y);
      for (var m = this.pow(u, p), J = this.pow(a, p.addn(1).iushrn(1)), W = this.pow(a, p), K = f; W.cmp(w) !== 0; ) {
        for (var j = W, re = 0; j.cmp(w) !== 0; re++)
          j = j.redSqr();
        r(re < K);
        var se = this.pow(m, new i(1).iushln(K - re - 1));
        J = J.redMul(se), m = se.redSqr(), W = W.redMul(m), K = re;
      }
      return J;
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
      var w = p[0], y = 0, g = 0, u = c.bitLength() % 26;
      for (u === 0 && (u = 26), f = c.length - 1; f >= 0; f--) {
        for (var m = c.words[f], J = u - 1; J >= 0; J--) {
          var W = m >> J & 1;
          if (w !== p[0] && (w = this.sqr(w)), W === 0 && y === 0) {
            g = 0;
            continue;
          }
          y <<= 1, y |= W, g++, !(g !== l && (f !== 0 || J !== 0)) && (w = this.mul(w, p[y]), g = 0, y = 0);
        }
        u = 26;
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
    function ee(E) {
      H.call(this, E), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
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
})(Fi);
var eA = Fi.exports;
const Sr = /* @__PURE__ */ qu(eA);
var oc = 9, ac = 3, ii = 9;
function tA(e, t) {
  const { precision: n = oc, minPrecision: r = ac } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, d = s.replace(o, "$1,");
  let A = i.slice(0, n);
  if (r < n) {
    const b = A.match(/.*[1-9]{1}/), I = (b == null ? void 0 : b[0].length) || 0, _ = Math.max(r, I);
    A = A.slice(0, _);
  }
  const h = A ? `.${A}` : "";
  return `${d}${h}`;
}
var Fe = class extends Sr {
  constructor(t, n, r) {
    let s = t, i = n;
    Fe.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
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
      units: n = ii,
      precision: r = oc,
      minPrecision: s = ac
    } = t || {}, i = this.formatUnits(n), o = tA(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, d = "0"] = i.split("."), A = d.match(/[1-9]/);
      if (A && A.index && A.index + 1 > r) {
        const [h = "0"] = o.split(".");
        return `${h}.${d.slice(0, A.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = ii) {
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
    return new Fe(super.sqr().toArray());
  }
  neg() {
    return new Fe(super.neg().toArray());
  }
  abs() {
    return new Fe(super.abs().toArray());
  }
  toTwos(t) {
    return new Fe(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new Fe(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, n) {
    const r = super[n](new Fe(t));
    return Fe.isBN(r) ? new Fe(r.toArray()) : r;
  }
  clone() {
    return new Fe(this.toArray());
  }
  mulTo(t, n) {
    const r = new Sr(this.toArray()).mulTo(t, n);
    return new Fe(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new Sr(this.toArray()).egcd(t);
    return {
      a: new Fe(n.toArray()),
      b: new Fe(r.toArray()),
      gcd: new Fe(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new Sr(this.toArray()).divmod(new Fe(t), n, r);
    return {
      div: new Fe(s == null ? void 0 : s.toArray()),
      mod: new Fe(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Fe(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Fe(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, B = (e, t, n) => new Fe(e, t, n);
B.parseUnits = (e, t = ii) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new v(
      N.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const d = `${r.replaceAll(",", "")}${o.join("")}`;
  return B(d);
};
function rn(e) {
  return B(e).toNumber();
}
function Mi(e, t) {
  return B(e).toHex(t);
}
function Ht(e, t) {
  return B(e).toBytes(t);
}
function Dw(e, t) {
  return B(e).formatUnits(t);
}
function Tw(e, t) {
  return B(e).format(t);
}
function Fw(...e) {
  return e.reduce((t, n) => B(n).gt(t) ? B(n) : t, B(0));
}
function Mw(...e) {
  return B(Math.ceil(e.reduce((t, n) => B(t).mul(n), B(1)).toNumber()));
}
var nA = Object.defineProperty, rA = (e, t, n) => t in e ? nA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, sA = (e, t, n) => (rA(e, typeof t != "symbol" ? t + "" : t, n), n), Ow = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, cc = (e, t) => {
  const n = [];
  for (let d = 0; d < e.length; d += t) {
    const A = new Uint8Array(t);
    A.set(e.slice(d, d + t)), n.push(A);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, Y = (e, t, n = !0) => {
  if (e instanceof Uint8Array)
    return n ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((e.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(e.substring(s, s + 2), 16), s += 2;
    return r;
  }
  throw new v(N.INVALID_DATA, `invalid data - ${t || ""}`);
}, ls = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, ie = (e) => {
  const t = e.map((n) => Y(n));
  return ls(t);
}, Lo = "0123456789abcdef";
function z(e) {
  const t = Y(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Lo[(s & 240) >> 4] + Lo[s & 15];
  }
  return n;
}
var Lw = (e) => {
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
}, iA = 37, dc = BigInt(2 ** 62) + BigInt(iA), oA = (e) => Math.floor(e / 1e3), uc = (e) => e * 1e3, aA = (e) => Number(BigInt(e) - dc), cA = (e) => String(BigInt(e) + dc), dA = (e) => uc(aA(e)), Ur = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Ur(dA(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Ur(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Ur(uc(e));
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
    return cA(this.toUnixSeconds());
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
    return oA(this.getTime());
  }
}, Oi = Ur;
sA(Oi, "TAI64_NULL", "");
var uA = {
  chain_name: "local_testnet",
  consensus_parameters: {
    V1: {
      tx_params: {
        V1: {
          max_inputs: 255,
          max_outputs: 255,
          max_witnesses: 255,
          max_gas_per_tx: 3e7,
          max_size: 112640,
          max_bytecode_subsections: 256
        }
      },
      predicate_params: {
        V1: {
          max_predicate_length: 102400,
          max_predicate_data_length: 102400,
          max_message_data_length: 102400,
          max_gas_per_predicate: 3e7
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
          contract_max_size: 102400,
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
          aloc: 1,
          and: 2,
          andi: 2,
          bal: 366,
          bhei: 2,
          bhsh: 2,
          burn: 33949,
          cb: 2,
          cfei: 2,
          cfsi: 2,
          div: 2,
          divi: 2,
          eck1: 3347,
          ecr1: 46165,
          ed19: 4210,
          eq: 2,
          exp: 2,
          expi: 2,
          flag: 1,
          gm: 2,
          gt: 2,
          gtf: 16,
          ji: 2,
          jmp: 2,
          jne: 2,
          jnei: 2,
          jnzi: 2,
          jmpf: 2,
          jmpb: 2,
          jnzf: 2,
          jnzb: 2,
          jnef: 2,
          jneb: 2,
          lb: 2,
          log: 754,
          lt: 2,
          lw: 2,
          mint: 35718,
          mlog: 2,
          mod: 2,
          modi: 2,
          move: 2,
          movi: 2,
          mroo: 5,
          mul: 2,
          muli: 2,
          mldv: 4,
          noop: 1,
          not: 2,
          or: 2,
          ori: 2,
          poph: 3,
          popl: 3,
          pshh: 4,
          pshl: 4,
          ret_contract: 733,
          rvrt_contract: 722,
          sb: 2,
          sll: 2,
          slli: 2,
          srl: 2,
          srli: 2,
          srw: 253,
          sub: 2,
          subi: 2,
          sw: 2,
          sww: 29053,
          time: 79,
          tr: 46242,
          tro: 33251,
          wdcm: 3,
          wqcm: 3,
          wdop: 3,
          wqop: 3,
          wdml: 3,
          wqml: 4,
          wddv: 5,
          wqdv: 7,
          wdmd: 11,
          wqmd: 18,
          wdam: 9,
          wqam: 12,
          wdmm: 11,
          wqmm: 11,
          xor: 2,
          xori: 2,
          call: {
            LightOperation: {
              base: 21687,
              units_per_gas: 4
            }
          },
          ccp: {
            LightOperation: {
              base: 59,
              units_per_gas: 20
            }
          },
          croo: {
            LightOperation: {
              base: 1,
              units_per_gas: 1
            }
          },
          csiz: {
            LightOperation: {
              base: 59,
              units_per_gas: 195
            }
          },
          k256: {
            LightOperation: {
              base: 282,
              units_per_gas: 3
            }
          },
          ldc: {
            LightOperation: {
              base: 45,
              units_per_gas: 65
            }
          },
          logd: {
            LightOperation: {
              base: 1134,
              units_per_gas: 2
            }
          },
          mcl: {
            LightOperation: {
              base: 3,
              units_per_gas: 523
            }
          },
          mcli: {
            LightOperation: {
              base: 3,
              units_per_gas: 526
            }
          },
          mcp: {
            LightOperation: {
              base: 3,
              units_per_gas: 448
            }
          },
          mcpi: {
            LightOperation: {
              base: 7,
              units_per_gas: 585
            }
          },
          meq: {
            LightOperation: {
              base: 11,
              units_per_gas: 1097
            }
          },
          retd_contract: {
            LightOperation: {
              base: 1086,
              units_per_gas: 2
            }
          },
          s256: {
            LightOperation: {
              base: 45,
              units_per_gas: 3
            }
          },
          scwq: {
            HeavyOperation: {
              base: 30375,
              gas_per_unit: 28628
            }
          },
          smo: {
            LightOperation: {
              base: 64196,
              units_per_gas: 1
            }
          },
          srwq: {
            HeavyOperation: {
              base: 262,
              gas_per_unit: 249
            }
          },
          swwq: {
            HeavyOperation: {
              base: 28484,
              gas_per_unit: 26613
            }
          },
          contract_root: {
            LightOperation: {
              base: 45,
              units_per_gas: 1
            }
          },
          state_root: {
            HeavyOperation: {
              base: 350,
              gas_per_unit: 176
            }
          },
          new_storage_per_byte: 63,
          vm_initialization: {
            LightOperation: {
              base: 1645,
              units_per_gas: 14
            }
          }
        }
      },
      base_asset_id: "0000000000000000000000000000000000000000000000000000000000000000",
      block_gas_limit: 3e7,
      privileged_address: "0000000000000000000000000000000000000000000000000000000000000000"
    }
  },
  consensus: {
    PoA: {
      signing_key: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"
    }
  }
}, AA = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, lA = {
  coins: [
    {
      tx_id: "0x260eabfd50937e92939fd92687e9302a72e91c5065f64f853f2ccbe02396fe09d665",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x2a757c2317236f7883ac9bbbf7d402f034e0b725c544ef1c8725b1d2bd960f8c690f",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x634ef6cda00bac63992bbde80c6d694d484d58025a5ca0c9c848f0d35a5a3eee74b2",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xd3543bb1da137a7987a96a1bb71681fdd195ff25318c0d4a923aa30eb27ffa80bc7b",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0xa4d42cbb02adb32f5f3a9eab33a0ee7bdab8910ad9f615dfc86a7bb9e49a732bc58c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xc197cb09b1d89a7862b238e9500631bd43f291aadb7ff55c8129335349634e9fde3f",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x4c4fc2451b9a9b16c520c1b89ec8968ce46823dd0396d84f7e3155861352fdce12c5",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x68df8f08555086a1ab45591e6fe4bf2f538bcb80dd519108030b7e886d6a230c2531",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x1b9bdaa290518373eb905e45ce7fcb89acedd24341ca7749ad47a938e4bf3ca9b7ce",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xa5a2e9db3d1285337fe1183dc1eabe8f9cdcd470daf95cd5c522bbae292f53977f26",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x13b685a1ea7c56309a92d69dd7e4808987ec90d62a1f9c9f2ec18e54746855c8c93c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xf8f00a234cf3fbab86befc3fd9346d7fd1ac085233c9cb58c7447f30c75cbf87ed38",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x2a36c870f624b60fbd6f2b71332ca7f704c69296ceae4ddbf3a8ede79408088934be",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x9cd180d41e67a422da8a7683f036b463a7ed7efc0de31c1692adac90decbfebce78c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xfeb4f2388fa22e6613ff85cf4e655f58acdfaa6299eba7f93b812cd1f0d7bbac48f0",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xc4d20299f43358dc32ab853f6631340b09278511b6adbaf34597ade6ef37efd018f1",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x437291414110b0aebaa8be5c0d9ff1e97d1130a24a6c9e028f2b1f6b0576be6aa961",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x28131b9acc90c2058ee14f4094a474146ba5b779cb9021867164b3d41abad3d047a7",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x033bb5f9b0e4f530d50af3a0f12dd510f799af495ef88baea3cf854a37da728d214b",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x460591398552eca338dd9577f362b91b0f9297f308258734870350004dcc303c67e9",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x447a7c37aee972dcba72f05255c5145dd63125f0fc46ef98c216f775ee0421e23d2b",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xf4a5d727606260c7ac6333fa89e7aef474df8a13326716d4d02f6392ebb7b997d268",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x25a49b0731bf610f6706aa9e9e96e5967f7c50f4302a3c75d7c8141595896551c18d",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x0a6e3585881ef2edf3f7727762799089dc0b5923e8b3718b49044dd9ddcb33b68459",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xf73bbe0635f7b6d59a090a21d87288b82164d0f6101da830ce64eff64a2d2ff2ac37",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x6cc44cb8d2a6462a591a77b6b9917eb6b22ad80d23d3cfd4f94c9da49c14b3cbac6e",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xbf2305d284ea95227040df4cc727156cccc2ca6aa3b92ed86fea4db1c37e5905f926",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xf4e1c76c72ecae699696f5e7a62ccf1425f7395080d0ca7b25ab63d1f841f425b807",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x619c80ee9f4c27c2e134cec6c67bdb268ce7fb1d2ac229ca2a44ec7ac88b2da99669",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x978d5b6be047ffbf1474dc376a6baa33264629b809e4a8210d11aaa805ec6451585d",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x673ba12fca6e52429896096262b8c59b61751976e552649fb1fe7369488fc10aa83c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0xc42a165104b9fcfa4a9ebffc707781ace233f1c0609c24c36a5c4bfcd407480ddb6c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xb353fbcd94abba347f3ba25e17744e98da26e608ebccbbbd2e9d004997644bdf993c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xc34a6fcb241dec82f885019caf5e14bb6708b435afebfef0037ac447fbb6d30378a3",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x421dfb5811c905724f2f4c6370cd15eaeb590ddeb966f9a4b9f8d65991dfe5142e12",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xa952c0487eefac5dda612011c4c82554c8660834461b9b815c6ae257b56b68005235",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xebaccf91b3b213341d047b6e6af214f1f9729b3d6dadf9c1918a9fe412486af871db",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0xda6d61c153e7d735954408274f4ffe8459c2dbab720ce22a1ae9ffedd33077b5b19d",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x508871600ef68c4f1e021dd0db219c733107151338aa95de530bd10dc61f6a69c144",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x509994738b4973e2dbbff9596b176a89fb07ee95f0ed575a4fe07a735a2a181f3200",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x6cc0cb58df0e0606fc85481aaaf5f47e145a67240b298c184bcb7fd7367c3bbf9453",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x9ddea761afc31516307e1553647ac6cc26d4a82fed9a9e6a03b994cdbf2293b3e3b6",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x82dbc478ba63abf28b92d9dce0cb8c2e6c02833d436fe812a33cf78417e4a80c1306",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0xc3b0cb232c74009fd226a6246403f78bcc33d116579f41d9387c0d76c76942749c7c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x708ee45d18f94ab06458712745c92c7b9b6049ba345219d6697eae5208ec0328aeaf",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xfe26968c44ac5becc608ce543075ae9e677b7631f3beb7a11ba20703fdca3c0e3569",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0xe0ec1d2c991feac69be4d0e84ad7c964616de08e16dccc4d2000b1900ba31082b993",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xfa82dbdd72252d1e6c76ee818bbac0441c3a705aff447f041c8b9fc3cb03f9ccd7e2",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x324f45e47cef892ac3e0759f3b72207c77046f9938267af4bd4af2ae031b97cb36c8",
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
}, kw = {
  chainConfigJson: uA,
  metadataJson: AA,
  stateConfigJson: lA
}, Pw = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function _n(e) {
  return e !== void 0;
}
var Ac = B(0), oi = B(58), Kr = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", Qr = null;
function fA(e) {
  if (Qr == null) {
    Qr = {};
    for (let n = 0; n < Kr.length; n++)
      Qr[Kr[n]] = B(n);
  }
  const t = Qr[e];
  if (t == null)
    throw new v(N.INVALID_DATA, `invalid base58 value ${e}`);
  return B(t);
}
function lc(e) {
  const t = Y(e);
  let n = B(t), r = "";
  for (; n.gt(Ac); )
    r = Kr[Number(n.mod(oi))] + r, n = n.div(oi);
  for (let s = 0; s < t.length && !t[s]; s++)
    r = Kr[0] + r;
  return r;
}
function hA(e) {
  let t = Ac;
  for (let n = 0; n < e.length; n++)
    t = t.mul(oi), t = t.add(fA(e[n].toString()));
  return t;
}
function Li(e, t, n) {
  const r = Y(e);
  if (n != null && n > r.length)
    throw new v(N.INVALID_DATA, "cannot slice beyond data bounds");
  return z(r.slice(t ?? 0, n ?? r.length));
}
function Xn(e, t = !0) {
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
      const d = 65536 + ((i & 1023) << 10) + (o & 1023);
      r.push(d >> 18 | 240), r.push(d >> 12 & 63 | 128), r.push(d >> 6 & 63 | 128), r.push(d & 63 | 128);
    } else
      r.push(i >> 12 | 224), r.push(i >> 6 & 63 | 128), r.push(i & 63 | 128);
  }
  return new Uint8Array(r);
}
function mn(e, t, n, r, s) {
  return console.log(`invalid codepoint at offset ${t}; ${e}, bytes: ${n}`), t;
}
function gA(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function pA(e) {
  const t = Y(e, "bytes"), n = [];
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
      (s & 192) === 128 ? r += mn("UNEXPECTED_CONTINUE", r - 1, t) : r += mn("BAD_PREFIX", r - 1, t);
      continue;
    }
    if (r - 1 + i >= t.length) {
      r += mn("OVERRUN", r - 1, t);
      continue;
    }
    let d = s & (1 << 8 - i - 1) - 1;
    for (let A = 0; A < i; A++) {
      const h = t[r];
      if ((h & 192) !== 128) {
        r += mn("MISSING_CONTINUE", r, t), d = null;
        break;
      }
      d = d << 6 | h & 63, r++;
    }
    if (d !== null) {
      if (d > 1114111) {
        r += mn("OUT_OF_RANGE", r - 1 - i, t);
        continue;
      }
      if (d >= 55296 && d <= 57343) {
        r += mn("UTF16_SURROGATE", r - 1 - i, t);
        continue;
      }
      if (d <= o) {
        r += mn("OVERLONG", r - 1 - i, t);
        continue;
      }
      n.push(d);
    }
  }
  return n;
}
function ki(e) {
  return gA(pA(e));
}
function _t(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function mA(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Pi(e, ...t) {
  if (!mA(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function fc(e) {
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
function hc(e, t) {
  Pi(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Zs = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Gr = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function gc(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Xr = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Tt = (e, t) => e << 32 - t | e >>> t, wA = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!wA)
  throw new Error("Non little-endian hardware is not supported");
function yA(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Vn(e) {
  if (typeof e == "string" && (e = yA(e)), !gc(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function IA(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!gc(s))
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
class Ui {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const bA = {}.toString;
function pc(e, t) {
  if (t !== void 0 && bA.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function fs(e) {
  const t = (r) => e().update(Vn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function EA(e = 32) {
  if (Zs && typeof Zs.getRandomValues == "function")
    return Zs.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function CA(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), d = Number(n & i), A = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + A, o, r), e.setUint32(t + h, d, r);
}
class Gi extends Ui {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Xr(this.buffer);
  }
  update(t) {
    Yn(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Vn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const d = Math.min(s - this.pos, i - o);
      if (d === s) {
        const A = Xr(t);
        for (; s <= i - o; o += s)
          this.process(A, o);
        continue;
      }
      r.set(t.subarray(o, o + d), this.pos), this.pos += d, o += d, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Yn(this), hc(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let I = o; I < s; I++)
      n[I] = 0;
    CA(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const d = Xr(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = A / 4, b = this.get();
    if (h > b.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let I = 0; I < h; I++)
      d.setUint32(4 * I, b[I], i);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: d } = this;
    return t.length = s, t.pos = d, t.finished = i, t.destroyed = o, s % n && t.buffer.set(r), t;
  }
}
const BA = (e, t, n) => e & t ^ ~e & n, _A = (e, t, n) => e & t ^ e & n ^ t & n, xA = /* @__PURE__ */ new Uint32Array([
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
]), qt = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), jt = /* @__PURE__ */ new Uint32Array(64);
class vA extends Gi {
  constructor() {
    super(64, 32, 8, !1), this.A = qt[0] | 0, this.B = qt[1] | 0, this.C = qt[2] | 0, this.D = qt[3] | 0, this.E = qt[4] | 0, this.F = qt[5] | 0, this.G = qt[6] | 0, this.H = qt[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: d, H: A } = this;
    return [t, n, r, s, i, o, d, A];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, d, A) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = d | 0, this.H = A | 0;
  }
  process(t, n) {
    for (let I = 0; I < 16; I++, n += 4)
      jt[I] = t.getUint32(n, !1);
    for (let I = 16; I < 64; I++) {
      const _ = jt[I - 15], x = jt[I - 2], R = Tt(_, 7) ^ Tt(_, 18) ^ _ >>> 3, C = Tt(x, 17) ^ Tt(x, 19) ^ x >>> 10;
      jt[I] = C + jt[I - 7] + R + jt[I - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: d, F: A, G: h, H: b } = this;
    for (let I = 0; I < 64; I++) {
      const _ = Tt(d, 6) ^ Tt(d, 11) ^ Tt(d, 25), x = b + _ + BA(d, A, h) + xA[I] + jt[I] | 0, C = (Tt(r, 2) ^ Tt(r, 13) ^ Tt(r, 22)) + _A(r, s, i) | 0;
      b = h, h = A, A = d, d = o + x | 0, o = i, i = s, s = r, r = x + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, d = d + this.E | 0, A = A + this.F | 0, h = h + this.G | 0, b = b + this.H | 0, this.set(r, s, i, o, d, A, h, b);
  }
  roundClean() {
    jt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const vn = /* @__PURE__ */ fs(() => new vA());
class mc extends Ui {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, fc(t);
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
    Yn(this), Pi(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: d } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = d, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const hs = (e, t, n) => new mc(e, t).update(n).digest();
hs.create = (e, t) => new mc(e, t);
function RA(e, t, n, r) {
  fc(e);
  const s = pc({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: d } = s;
  if (_t(i), _t(o), _t(d), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const A = Vn(t), h = Vn(n), b = new Uint8Array(o), I = hs.create(e, A), _ = I._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: d, DK: b, PRF: I, PRFSalt: _ };
}
function SA(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Xi(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: d, PRFSalt: A } = RA(e, t, n, r);
  let h;
  const b = new Uint8Array(4), I = Xr(b), _ = new Uint8Array(d.outputLen);
  for (let x = 1, R = 0; R < i; x++, R += d.outputLen) {
    const C = o.subarray(R, R + d.outputLen);
    I.setInt32(0, x, !1), (h = A._cloneInto(h)).update(b).digestInto(_), C.set(_.subarray(0, C.length));
    for (let M = 1; M < s; M++) {
      d._cloneInto(h).update(_).digestInto(_);
      for (let F = 0; F < C.length; F++)
        C[F] ^= _[F];
    }
  }
  return SA(d, A, o, h, _);
}
const we = (e, t) => e << t | e >>> 32 - t;
function ko(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], d = e[t++] ^ n[r++], A = e[t++] ^ n[r++], h = e[t++] ^ n[r++], b = e[t++] ^ n[r++], I = e[t++] ^ n[r++], _ = e[t++] ^ n[r++], x = e[t++] ^ n[r++], R = e[t++] ^ n[r++], C = e[t++] ^ n[r++], M = e[t++] ^ n[r++], F = e[t++] ^ n[r++], X = e[t++] ^ n[r++], k = e[t++] ^ n[r++], Z = e[t++] ^ n[r++], O = e[t++] ^ n[r++], T = o, L = d, U = A, q = h, V = b, H = I, ee = _, E = x, a = R, c = C, l = M, p = F, f = X, w = k, y = Z, g = O;
  for (let u = 0; u < 8; u += 2)
    V ^= we(T + f | 0, 7), a ^= we(V + T | 0, 9), f ^= we(a + V | 0, 13), T ^= we(f + a | 0, 18), c ^= we(H + L | 0, 7), w ^= we(c + H | 0, 9), L ^= we(w + c | 0, 13), H ^= we(L + w | 0, 18), y ^= we(l + ee | 0, 7), U ^= we(y + l | 0, 9), ee ^= we(U + y | 0, 13), l ^= we(ee + U | 0, 18), q ^= we(g + p | 0, 7), E ^= we(q + g | 0, 9), p ^= we(E + q | 0, 13), g ^= we(p + E | 0, 18), L ^= we(T + q | 0, 7), U ^= we(L + T | 0, 9), q ^= we(U + L | 0, 13), T ^= we(q + U | 0, 18), ee ^= we(H + V | 0, 7), E ^= we(ee + H | 0, 9), V ^= we(E + ee | 0, 13), H ^= we(V + E | 0, 18), p ^= we(l + c | 0, 7), a ^= we(p + l | 0, 9), c ^= we(a + p | 0, 13), l ^= we(c + a | 0, 18), f ^= we(g + y | 0, 7), w ^= we(f + g | 0, 9), y ^= we(w + f | 0, 13), g ^= we(y + w | 0, 18);
  s[i++] = o + T | 0, s[i++] = d + L | 0, s[i++] = A + U | 0, s[i++] = h + q | 0, s[i++] = b + V | 0, s[i++] = I + H | 0, s[i++] = _ + ee | 0, s[i++] = x + E | 0, s[i++] = R + a | 0, s[i++] = C + c | 0, s[i++] = M + l | 0, s[i++] = F + p | 0, s[i++] = X + f | 0, s[i++] = k + w | 0, s[i++] = Z + y | 0, s[i++] = O + g | 0;
}
function Js(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let d = 0; d < 16; d++)
    n[o + d] = e[t + (2 * s - 1) * 16 + d];
  for (let d = 0; d < s; d++, i += 16, t += 16)
    ko(n, o, e, t, n, i), d > 0 && (o += 16), ko(n, i, e, t += 16, n, o);
}
function QA(e, t, n) {
  const r = pc({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: d, asyncTick: A, maxmem: h, onProgress: b } = r;
  if (_t(s), _t(i), _t(o), _t(d), _t(A), _t(h), b !== void 0 && typeof b != "function")
    throw new Error("progressCb should be function");
  const I = 128 * i, _ = I / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (I / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / I)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (d < 0 || d > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const x = I * (s + o);
  if (x > h)
    throw new Error(`Scrypt: parameters too large, ${x} (128 * r * (N + p)) > ${h} (maxmem)`);
  const R = Xi(vn, e, t, { c: 1, dkLen: I * o }), C = Gr(R), M = Gr(new Uint8Array(I * s)), F = Gr(new Uint8Array(I));
  let X = () => {
  };
  if (b) {
    const k = 2 * s * o, Z = Math.max(Math.floor(k / 1e4), 1);
    let O = 0;
    X = () => {
      O++, b && (!(O % Z) || O === k) && b(O / k);
    };
  }
  return { N: s, r: i, p: o, dkLen: d, blockSize32: _, V: M, B32: C, B: R, tmp: F, blockMixCb: X, asyncTick: A };
}
function NA(e, t, n, r, s) {
  const i = Xi(vn, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function DA(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: d, V: A, B32: h, B: b, tmp: I, blockMixCb: _ } = QA(e, t, n);
  for (let x = 0; x < i; x++) {
    const R = d * x;
    for (let C = 0; C < d; C++)
      A[C] = h[R + C];
    for (let C = 0, M = 0; C < r - 1; C++)
      Js(A, M, A, M += d, s), _();
    Js(A, (r - 1) * d, h, R, s), _();
    for (let C = 0; C < r; C++) {
      const M = h[R + d - 16] % r;
      for (let F = 0; F < d; F++)
        I[F] = h[R + F] ^ A[M * d + F];
      Js(I, 0, h, R, s), _();
    }
  }
  return NA(e, o, b, A, I);
}
const Nr = /* @__PURE__ */ BigInt(2 ** 32 - 1), ai = /* @__PURE__ */ BigInt(32);
function wc(e, t = !1) {
  return t ? { h: Number(e & Nr), l: Number(e >> ai & Nr) } : { h: Number(e >> ai & Nr) | 0, l: Number(e & Nr) | 0 };
}
function yc(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = wc(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const TA = (e, t) => BigInt(e >>> 0) << ai | BigInt(t >>> 0), FA = (e, t, n) => e >>> n, MA = (e, t, n) => e << 32 - n | t >>> n, OA = (e, t, n) => e >>> n | t << 32 - n, LA = (e, t, n) => e << 32 - n | t >>> n, kA = (e, t, n) => e << 64 - n | t >>> n - 32, PA = (e, t, n) => e >>> n - 32 | t << 64 - n, UA = (e, t) => t, GA = (e, t) => e, Ic = (e, t, n) => e << n | t >>> 32 - n, bc = (e, t, n) => t << n | e >>> 32 - n, Ec = (e, t, n) => t << n - 32 | e >>> 64 - n, Cc = (e, t, n) => e << n - 32 | t >>> 64 - n;
function XA(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const YA = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), VA = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, zA = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), HA = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, ZA = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), JA = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, le = {
  fromBig: wc,
  split: yc,
  toBig: TA,
  shrSH: FA,
  shrSL: MA,
  rotrSH: OA,
  rotrSL: LA,
  rotrBH: kA,
  rotrBL: PA,
  rotr32H: UA,
  rotr32L: GA,
  rotlSH: Ic,
  rotlSL: bc,
  rotlBH: Ec,
  rotlBL: Cc,
  add: XA,
  add3L: YA,
  add3H: VA,
  add4L: zA,
  add4H: HA,
  add5H: JA,
  add5L: ZA
}, [Bc, _c, xc] = [[], [], []], WA = /* @__PURE__ */ BigInt(0), rr = /* @__PURE__ */ BigInt(1), qA = /* @__PURE__ */ BigInt(2), jA = /* @__PURE__ */ BigInt(7), $A = /* @__PURE__ */ BigInt(256), KA = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = rr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Bc.push(2 * (5 * r + n)), _c.push((e + 1) * (e + 2) / 2 % 64);
  let s = WA;
  for (let i = 0; i < 7; i++)
    t = (t << rr ^ (t >> jA) * KA) % $A, t & qA && (s ^= rr << (rr << /* @__PURE__ */ BigInt(i)) - rr);
  xc.push(s);
}
const [e0, t0] = /* @__PURE__ */ yc(xc, !0), Po = (e, t, n) => n > 32 ? Ec(e, t, n) : Ic(e, t, n), Uo = (e, t, n) => n > 32 ? Cc(e, t, n) : bc(e, t, n);
function n0(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const d = (o + 8) % 10, A = (o + 2) % 10, h = n[A], b = n[A + 1], I = Po(h, b, 1) ^ n[d], _ = Uo(h, b, 1) ^ n[d + 1];
      for (let x = 0; x < 50; x += 10)
        e[o + x] ^= I, e[o + x + 1] ^= _;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const d = _c[o], A = Po(s, i, d), h = Uo(s, i, d), b = Bc[o];
      s = e[b], i = e[b + 1], e[b] = A, e[b + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let d = 0; d < 10; d++)
        n[d] = e[o + d];
      for (let d = 0; d < 10; d++)
        e[o + d] ^= ~n[(d + 2) % 10] & n[(d + 4) % 10];
    }
    e[0] ^= e0[r], e[1] ^= t0[r];
  }
  n.fill(0);
}
class Yi extends Ui {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, _t(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Gr(this.state);
  }
  keccak() {
    n0(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Yn(this);
    const { blockLen: n, state: r } = this;
    t = Vn(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(n - this.pos, s - i);
      for (let d = 0; d < o; d++)
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
    Yn(this, !1), Pi(t), this.finish();
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
    if (hc(t, this), this.finished)
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
    return t || (t = new Yi(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const r0 = (e, t, n) => fs(() => new Yi(t, e, n)), s0 = /* @__PURE__ */ r0(1, 136, 256 / 8), i0 = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), vc = /* @__PURE__ */ Uint8Array.from({ length: 16 }, (e, t) => t), o0 = /* @__PURE__ */ vc.map((e) => (9 * e + 5) % 16);
let Vi = [vc], zi = [o0];
for (let e = 0; e < 4; e++)
  for (let t of [Vi, zi])
    t.push(t[e].map((n) => i0[n]));
const Rc = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), a0 = /* @__PURE__ */ Vi.map((e, t) => e.map((n) => Rc[t][n])), c0 = /* @__PURE__ */ zi.map((e, t) => e.map((n) => Rc[t][n])), d0 = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), u0 = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]), Dr = (e, t) => e << t | e >>> 32 - t;
function Go(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const Tr = /* @__PURE__ */ new Uint32Array(16);
class A0 extends Gi {
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
      Tr[x] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, d = this.h2 | 0, A = d, h = this.h3 | 0, b = h, I = this.h4 | 0, _ = I;
    for (let x = 0; x < 5; x++) {
      const R = 4 - x, C = d0[x], M = u0[x], F = Vi[x], X = zi[x], k = a0[x], Z = c0[x];
      for (let O = 0; O < 16; O++) {
        const T = Dr(r + Go(x, i, d, h) + Tr[F[O]] + C, k[O]) + I | 0;
        r = I, I = h, h = Dr(d, 10) | 0, d = i, i = T;
      }
      for (let O = 0; O < 16; O++) {
        const T = Dr(s + Go(R, o, A, b) + Tr[X[O]] + M, Z[O]) + _ | 0;
        s = _, _ = b, b = Dr(A, 10) | 0, A = o, o = T;
      }
    }
    this.set(this.h1 + d + b | 0, this.h2 + h + _ | 0, this.h3 + I + s | 0, this.h4 + r + o | 0, this.h0 + i + A | 0);
  }
  roundClean() {
    Tr.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const l0 = /* @__PURE__ */ fs(() => new A0()), [f0, h0] = le.split([
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
].map((e) => BigInt(e))), $t = /* @__PURE__ */ new Uint32Array(80), Kt = /* @__PURE__ */ new Uint32Array(80);
class g0 extends Gi {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: d, Dl: A, Eh: h, El: b, Fh: I, Fl: _, Gh: x, Gl: R, Hh: C, Hl: M } = this;
    return [t, n, r, s, i, o, d, A, h, b, I, _, x, R, C, M];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, d, A, h, b, I, _, x, R, C, M) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = d | 0, this.Dl = A | 0, this.Eh = h | 0, this.El = b | 0, this.Fh = I | 0, this.Fl = _ | 0, this.Gh = x | 0, this.Gl = R | 0, this.Hh = C | 0, this.Hl = M | 0;
  }
  process(t, n) {
    for (let k = 0; k < 16; k++, n += 4)
      $t[k] = t.getUint32(n), Kt[k] = t.getUint32(n += 4);
    for (let k = 16; k < 80; k++) {
      const Z = $t[k - 15] | 0, O = Kt[k - 15] | 0, T = le.rotrSH(Z, O, 1) ^ le.rotrSH(Z, O, 8) ^ le.shrSH(Z, O, 7), L = le.rotrSL(Z, O, 1) ^ le.rotrSL(Z, O, 8) ^ le.shrSL(Z, O, 7), U = $t[k - 2] | 0, q = Kt[k - 2] | 0, V = le.rotrSH(U, q, 19) ^ le.rotrBH(U, q, 61) ^ le.shrSH(U, q, 6), H = le.rotrSL(U, q, 19) ^ le.rotrBL(U, q, 61) ^ le.shrSL(U, q, 6), ee = le.add4L(L, H, Kt[k - 7], Kt[k - 16]), E = le.add4H(ee, T, V, $t[k - 7], $t[k - 16]);
      $t[k] = E | 0, Kt[k] = ee | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: d, Cl: A, Dh: h, Dl: b, Eh: I, El: _, Fh: x, Fl: R, Gh: C, Gl: M, Hh: F, Hl: X } = this;
    for (let k = 0; k < 80; k++) {
      const Z = le.rotrSH(I, _, 14) ^ le.rotrSH(I, _, 18) ^ le.rotrBH(I, _, 41), O = le.rotrSL(I, _, 14) ^ le.rotrSL(I, _, 18) ^ le.rotrBL(I, _, 41), T = I & x ^ ~I & C, L = _ & R ^ ~_ & M, U = le.add5L(X, O, L, h0[k], Kt[k]), q = le.add5H(U, F, Z, T, f0[k], $t[k]), V = U | 0, H = le.rotrSH(r, s, 28) ^ le.rotrBH(r, s, 34) ^ le.rotrBH(r, s, 39), ee = le.rotrSL(r, s, 28) ^ le.rotrBL(r, s, 34) ^ le.rotrBL(r, s, 39), E = r & i ^ r & d ^ i & d, a = s & o ^ s & A ^ o & A;
      F = C | 0, X = M | 0, C = x | 0, M = R | 0, x = I | 0, R = _ | 0, { h: I, l: _ } = le.add(h | 0, b | 0, q | 0, V | 0), h = d | 0, b = A | 0, d = i | 0, A = o | 0, i = r | 0, o = s | 0;
      const c = le.add3L(V, ee, a);
      r = le.add3H(c, q, H, E), s = c | 0;
    }
    ({ h: r, l: s } = le.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = le.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: d, l: A } = le.add(this.Ch | 0, this.Cl | 0, d | 0, A | 0), { h, l: b } = le.add(this.Dh | 0, this.Dl | 0, h | 0, b | 0), { h: I, l: _ } = le.add(this.Eh | 0, this.El | 0, I | 0, _ | 0), { h: x, l: R } = le.add(this.Fh | 0, this.Fl | 0, x | 0, R | 0), { h: C, l: M } = le.add(this.Gh | 0, this.Gl | 0, C | 0, M | 0), { h: F, l: X } = le.add(this.Hh | 0, this.Hl | 0, F | 0, X | 0), this.set(r, s, i, o, d, A, h, b, I, _, x, R, C, M, F, X);
  }
  roundClean() {
    $t.fill(0), Kt.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Sc = /* @__PURE__ */ fs(() => new g0());
var p0 = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return DA(t, n, { N: r, r: i, p: s, dkLen: o });
}, m0 = (e) => s0(e), Qc = !1, Nc = (e) => l0(e), Dc = Nc;
function Ir(e) {
  const t = Y(e, "data");
  return Dc(t);
}
Ir._ = Nc;
Ir.lock = () => {
  Qc = !0;
};
Ir.register = (e) => {
  if (Qc)
    throw new v(N.HASHER_LOCKED, "ripemd160 is locked");
  Dc = e;
};
Object.freeze(Ir);
var Mn = (e, t = "base64") => {
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
}, Tc = (e, t, n, r, s) => {
  const i = { sha256: vn, sha512: Sc }[s];
  return z(Xi(i, e, t, { c: n, dkLen: r }));
}, { crypto: gs, btoa: Fc } = globalThis;
if (!gs)
  throw new v(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!Fc)
  throw new v(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var ci = (e) => gs.getRandomValues(new Uint8Array(e)), Yr = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return Fc(n);
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
}, Mc = "AES-CTR", Hi = (e, t) => {
  const n = Mn(String(e).normalize("NFKC"), "utf-8"), r = Tc(n, t, 1e5, 32, "sha256");
  return Y(r);
}, w0 = async (e, t) => {
  const n = ci(16), r = ci(32), s = Hi(e, r), i = JSON.stringify(t), o = Mn(i, "utf-8"), d = {
    name: Mc,
    counter: n,
    length: 64
  }, A = await crypto.subtle.importKey("raw", s, d, !1, ["encrypt"]), h = await crypto.subtle.encrypt(d, A, o);
  return {
    data: Yr(h),
    iv: Yr(n),
    salt: Yr(r)
  };
}, y0 = async (e, t) => {
  const n = Mn(t.iv), r = Mn(t.salt), s = Hi(e, r), i = Mn(t.data), o = {
    name: Mc,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), A = await crypto.subtle.decrypt(o, d, i), h = new TextDecoder().decode(A);
  try {
    return JSON.parse(h);
  } catch {
    throw new v(N.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, I0 = async (e, t, n) => {
  const r = gs.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, d = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), A = await r.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    d,
    o
  );
  return new Uint8Array(A);
}, b0 = async (e, t, n) => {
  const r = gs.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, d = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), A = await r.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    d,
    o
  );
  return new Uint8Array(A);
}, E0 = (e, t, n) => {
  const r = e === "sha256" ? vn : Sc, s = hs.create(r, t).update(n).digest();
  return z(s);
}, C0 = {
  bufferFromString: Mn,
  stringFromBuffer: Yr,
  decrypt: y0,
  encrypt: w0,
  keyFromPassword: Hi,
  randomBytes: ci,
  scrypt: p0,
  keccak256: m0,
  decryptJsonWalletData: b0,
  encryptJsonWalletData: I0,
  computeHmac: E0,
  pbkdf2: Tc,
  ripemd160: Ir
}, B0 = C0, {
  bufferFromString: dn,
  decrypt: _0,
  encrypt: x0,
  keyFromPassword: Uw,
  randomBytes: kt,
  stringFromBuffer: ar,
  scrypt: Oc,
  keccak256: Lc,
  decryptJsonWalletData: v0,
  encryptJsonWalletData: R0,
  pbkdf2: S0,
  computeHmac: kc,
  ripemd160: Q0
} = B0;
function mt(e) {
  return z(vn(Y(e)));
}
function Zt(e) {
  return mt(e);
}
function N0(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function D0(e) {
  return Zt(dn(e, "utf-8"));
}
var T0 = Object.defineProperty, F0 = (e, t, n) => t in e ? T0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Zi = (e, t, n) => (F0(e, typeof t != "symbol" ? t + "" : t, n), n), ce = class {
  constructor(e, t, n) {
    S(this, "name");
    S(this, "type");
    S(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, M0 = "u8", O0 = "u16", L0 = "u32", k0 = "u64", P0 = "u256", U0 = "raw untyped ptr", G0 = "raw untyped slice", X0 = "bool", Y0 = "b256", V0 = "struct B512", Pc = "enum Option", z0 = "struct Vec", H0 = "struct Bytes", Z0 = "struct String", J0 = "str", Uc = /str\[(?<length>[0-9]+)\]/, di = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Gc = /^struct (?<name>\w+)$/, Xc = /^enum (?<name>\w+)$/, W0 = /^\((?<items>.*)\)$/, q0 = /^generic (?<name>\w+)$/, es = "1", fe = 8, An = 32, ui = An + 2, ts = An, j0 = An, $0 = An, K0 = fe * 4, el = fe * 2, Yc = 2 ** 32 - 1, Vc = ({ maxInputs: e }) => An + // Tx ID
ts + // Base asset ID
// Asset ID/Balance coin input pairs
e * (ts + fe) + fe, zc = fe + // Identifier
fe + // Gas limit
fe + // Script size
fe + // Script data size
fe + // Policies
fe + // Inputs size
fe + // Outputs size
fe + // Witnesses size
An, Gw = fe + // Identifier
K0 + // Utxo Length
fe + // Output Index
$0 + // Owner
fe + // Amount
ts + // Asset id
el + // TxPointer
fe + // Witnesses index
fe + // Predicate size
fe + // Predicate data size
fe, ye = class extends ce {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    S(this, "coder");
    S(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(N.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new v(N.ENCODE_ERROR, "Types/values length mismatch.");
    return ie(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > Yc)
      throw new v(N.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, G = class extends ce {
  constructor() {
    super("b256", "b256", fe * 4);
  }
  encode(e) {
    let t;
    try {
      t = Y(e);
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
    return [Mi(n, 32), t + 32];
  }
}, tl = class extends ce {
  constructor() {
    super("b512", "struct B512", fe * 8);
  }
  encode(e) {
    let t;
    try {
      t = Y(e);
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
    return [Mi(n, this.encodedLength), t + this.encodedLength];
  }
}, nl = {
  u64: fe,
  u256: fe * 4
}, D = class extends ce {
  constructor(e) {
    super("bigNumber", e, nl[e]);
  }
  encode(e) {
    let t;
    try {
      t = Ht(e, this.encodedLength);
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
}, rl = class extends ce {
  constructor(t = {
    padToWordSize: !1
  }) {
    const n = t.padToWordSize ? fe : 1;
    super("boolean", "boolean", n);
    S(this, "options");
    this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new v(N.ENCODE_ERROR, "Invalid boolean value.");
    return Ht(t ? 1 : 0, this.encodedLength);
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
}, Hc = class extends ce {
  constructor() {
    super("struct", "struct Bytes", fe);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), n = new D("u64").encode(t.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < fe)
      throw new v(N.DECODE_ERROR, "Invalid byte data size.");
    const n = t + fe, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
Zi(Hc, "memorySize", 1);
var sl = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), Pn, Un, us, Jc, As, Wc, ec, Zc = (ec = class extends ce {
  constructor(t, n) {
    const r = new D("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    Wt(this, us);
    Wt(this, As);
    S(this, "name");
    S(this, "coders");
    Wt(this, Pn, void 0);
    Wt(this, Un, void 0);
    this.name = t, this.coders = n, Rn(this, Pn, r), Rn(this, Un, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return Hs(this, us, Jc).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(N.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(N.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]);
    return new Uint8Array([...gt(this, Pn).encode(i), ...o]);
  }
  decode(t, n) {
    if (t.length < gt(this, Un))
      throw new v(N.DECODE_ERROR, "Invalid enum data size.");
    const r = new D("u64").decode(t, n)[0], s = rn(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new v(
        N.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], d = n + fe, [A, h] = o.decode(t, d);
    return sl(this.coders) ? Hs(this, As, Wc).call(this, i, h) : [{ [i]: A }, h];
  }
}, Pn = new WeakMap(), Un = new WeakMap(), us = new WeakSet(), Jc = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(gt(this, Un) - n.encodedLength);
  return ie([gt(this, Pn).encode(s), i, r]);
}, As = new WeakSet(), Wc = function(t, n) {
  return [t, n];
}, ec), il = (e) => {
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
    const r = n.padToWordSize ? fe : il(t);
    super("number", t, r);
    S(this, "baseType");
    S(this, "options");
    this.baseType = t, this.options = n;
  }
  encode(t) {
    let n;
    try {
      n = Ht(t);
    } catch {
      throw new v(N.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.encodedLength)
      throw new v(N.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Ht(n, this.encodedLength);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid number byte data size.");
    return [rn(r), n + this.encodedLength];
  }
}, Ji = class extends Zc {
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
}, ol = class extends ce {
  constructor() {
    super("raw untyped slice", "raw untyped slice", fe);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(N.ENCODE_ERROR, "Expected array value.");
    const n = new ye(new $("u8"), e.length).encode(e), r = new D("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + fe, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new ye(new $("u8"), s), [d] = o.decode(i, 0);
    return [d, n + s];
  }
}, Wi = class extends ce {
  constructor() {
    super("struct", "struct String", fe);
  }
  encode(e) {
    const t = Xn(e), n = new D("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid std string data size.");
    const n = t + fe, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid std string byte data size.");
    return [ki(i), n + s];
  }
};
Zi(Wi, "memorySize", 1);
var qc = class extends ce {
  constructor() {
    super("strSlice", "str", fe);
  }
  encode(e) {
    const t = Xn(e), n = new D("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid string slice data size.");
    const n = t + fe, r = e.slice(t, n), s = B(new D("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid string slice byte data size.");
    return [ki(i), n + s];
  }
};
Zi(qc, "memorySize", 1);
var al = class extends ce {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new v(N.ENCODE_ERROR, "Value length mismatch during encode.");
    return Xn(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid string byte data size.");
    return [ki(n), t + this.encodedLength];
  }
}, ps = class extends ce {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    S(this, "name");
    S(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    return ls(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof Ji) && s == null)
          throw new v(
            N.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const d = this.coders[o];
      let A;
      return [A, r] = d.decode(t, r), i[o] = A, i;
    }, {}), r];
  }
}, jc = class extends ce {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    S(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(N.ENCODE_ERROR, "Types/values length mismatch.");
    return ls(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, Xo = (e) => e instanceof Uint8Array, Gn, tc, cl = (tc = class extends ce {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + fe);
    S(this, "coder");
    Wt(this, Gn, void 0);
    this.coder = t, Rn(this, Gn, this.coder instanceof Ji);
  }
  encode(t) {
    if (!Array.isArray(t) && !Xo(t))
      throw new v(
        N.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = new D("u64");
    if (Xo(t))
      return new Uint8Array([...n.encode(t.length), ...t]);
    const r = t.map((i) => this.coder.encode(i)), s = n.encode(t.length);
    return new Uint8Array([...s, ...ls(r)]);
  }
  decode(t, n) {
    if (!gt(this, Gn) && (t.length < this.encodedLength || t.length > Yc))
      throw new v(N.DECODE_ERROR, "Invalid vec data size.");
    const r = n + fe, s = t.slice(n, r), i = B(new D("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, d = t.slice(r, r + o);
    if (!gt(this, Gn) && d.length !== o)
      throw new v(N.DECODE_ERROR, "Invalid vec byte data size.");
    let A = r;
    const h = [];
    for (let b = 0; b < i; b++) {
      const [I, _] = this.coder.decode(t, A);
      h.push(I), A = _;
    }
    return [h, A];
  }
}, Gn = new WeakMap(), tc), $c = (e) => {
  switch (e) {
    case void 0:
    case es:
      return es;
    default:
      throw new v(
        N.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, dl = (e, t) => {
  const n = e.functions.find((r) => r.name === t);
  if (!n)
    throw new v(
      N.FUNCTION_NOT_FOUND,
      `Function with name '${t}' doesn't exist in the ABI`
    );
  return n;
}, Cn = (e, t) => {
  const n = e.types.find((r) => r.typeId === t);
  if (!n)
    throw new v(
      N.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return n;
}, Yo = (e, t) => t.filter((n) => Cn(e, n.type).type !== "()"), ul = (e) => {
  var r;
  const t = e.find((s) => s.name === "buf"), n = (r = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : r[0];
  if (!t || !n)
    throw new v(
      N.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return n;
}, sn = class {
  constructor(e, t) {
    S(this, "abi");
    S(this, "name");
    S(this, "type");
    S(this, "originalTypeArguments");
    S(this, "components");
    this.abi = e, this.name = t.name;
    const n = Cn(e, t.type);
    this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = sn.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? sn.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new sn(e, o));
    const s = r.reduce(
      (o, d, A) => {
        var b;
        const h = { ...o };
        return h[d] = structuredClone(
          (b = t.typeArguments) == null ? void 0 : b[A]
        ), h;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new sn(e, o));
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
      const s = Cn(e, r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = Cn(e, s.type);
      if (q0.test(i.type)) {
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
    return Gc.test(this.type) ? "s" : di.test(this.type) ? "a" : Xc.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = Uc.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = di.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new sn(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function Vo(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Qn = (e, t) => {
  var A, h, b, I, _;
  switch (e.type) {
    case M0:
    case O0:
    case L0:
      return new $(e.type);
    case k0:
    case U0:
      return new D("u64");
    case P0:
      return new D("u256");
    case G0:
      return new ol();
    case X0:
      return new rl();
    case Y0:
      return new G();
    case V0:
      return new tl();
    case H0:
      return new Hc();
    case Z0:
      return new Wi();
    case J0:
      return new qc();
  }
  const n = (A = Uc.exec(e.type)) == null ? void 0 : A.groups;
  if (n) {
    const x = parseInt(n.length, 10);
    return new al(x);
  }
  const r = e.components, s = (h = di.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const x = parseInt(s.length, 10), R = r[0];
    if (!R)
      throw new v(
        N.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const C = Qn(R);
    return new ye(C, x);
  }
  if (e.type === z0) {
    const x = ul(r), R = new sn(e.abi, x), C = Qn(R);
    return new cl(C);
  }
  const i = (b = Gc.exec(e.type)) == null ? void 0 : b.groups;
  if (i) {
    const x = Vo(r, { getCoder: Qn });
    return new ps(i.name, x);
  }
  const o = (I = Xc.exec(e.type)) == null ? void 0 : I.groups;
  if (o) {
    const x = Vo(r, { getCoder: Qn });
    return e.type === Pc ? new Ji(o.name, x) : new Zc(o.name, x);
  }
  if ((_ = W0.exec(e.type)) == null ? void 0 : _.groups) {
    const x = r.map((R) => Qn(R));
    return new jc(x);
  }
  throw new v(
    N.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function Al(e = es) {
  switch (e) {
    case es:
      return Qn;
    default:
      throw new v(
        N.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var fr = class {
  static getCoder(e, t, n = {
    padToWordSize: !1
  }) {
    const r = new sn(e, t);
    return Al(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, Vr = class {
  constructor(e, t) {
    S(this, "signature");
    S(this, "selector");
    S(this, "selectorBytes");
    S(this, "encoding");
    S(this, "name");
    S(this, "jsonFn");
    S(this, "attributes");
    S(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = dl(this.jsonAbi, t), this.name = t, this.signature = Vr.getSignature(this.jsonAbi, this.jsonFn), this.selector = Vr.getFunctionSelector(this.signature), this.selectorBytes = new Wi().encode(t), this.encoding = $c(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new sn(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = mt(dn(e, "utf-8"));
    return B(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e) {
    Vr.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const t = e.slice(), n = Yo(this.jsonAbi, this.jsonFn.inputs);
    Array.isArray(e) && n.length !== e.length && (t.length = this.jsonFn.inputs.length, t.fill(void 0, e.length));
    const r = n.map(
      (s) => fr.getCoder(this.jsonAbi, s, {
        encoding: this.encoding
      })
    );
    return new jc(r).encode(t);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => Cn(n, o.type)), s = r.filter(
      (o) => o.type === Pc || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new v(N.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = Y(e), n = Yo(this.jsonAbi, this.jsonFn.inputs);
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
        const o = fr.getCoder(this.jsonAbi, i, { encoding: this.encoding }), [d, A] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, d],
          offset: s.offset + A
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (Cn(this.jsonAbi, this.jsonFn.output.type).type === "()")
      return [void 0, 0];
    const n = Y(e);
    return fr.getCoder(this.jsonAbi, this.jsonFn.output, {
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
}, Jt = class {
  constructor(e) {
    S(this, "functions");
    S(this, "configurables");
    S(this, "jsonAbi");
    S(this, "encoding");
    this.jsonAbi = e, this.encoding = $c(e.encoding), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new Vr(this.jsonAbi, t.name)])
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
      throw new v(
        N.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return fr.decode(this.jsonAbi, n.loggedType, Y(e), 0, {
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
    return fr.encode(this.jsonAbi, n.configurableType, t, {
      encoding: this.encoding
    });
  }
  getTypeById(e) {
    return Cn(this.jsonAbi, e);
  }
}, Xw = class {
}, ll = class {
}, Kc = class {
}, ed = class {
}, fl = class extends ed {
}, hl = class extends ed {
}, hr = {};
Object.defineProperty(hr, "__esModule", { value: !0 });
var zn = hr.bech32m = hr.bech32 = void 0;
const ns = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", td = {};
for (let e = 0; e < ns.length; e++) {
  const t = ns.charAt(e);
  td[t] = e;
}
function On(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function zo(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = On(t) ^ r >> 5;
  }
  t = On(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = On(t) ^ r & 31;
  }
  return t;
}
function qi(e, t, n, r) {
  let s = 0, i = 0;
  const o = (1 << n) - 1, d = [];
  for (let A = 0; A < e.length; ++A)
    for (s = s << t | e[A], i += t; i >= n; )
      i -= n, d.push(s >> i & o);
  if (r)
    i > 0 && d.push(s << n - i & o);
  else {
    if (i >= t)
      return "Excess padding";
    if (s << n - i & o)
      return "Non-zero padding";
  }
  return d;
}
function gl(e) {
  return qi(e, 8, 5, !0);
}
function pl(e) {
  const t = qi(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function ml(e) {
  const t = qi(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function nd(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, d, A) {
    if (A = A || 90, o.length + 7 + d.length > A)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let h = zo(o);
    if (typeof h == "string")
      throw new Error(h);
    let b = o + "1";
    for (let I = 0; I < d.length; ++I) {
      const _ = d[I];
      if (_ >> 5)
        throw new Error("Non 5-bit word");
      h = On(h) ^ _, b += ns.charAt(_);
    }
    for (let I = 0; I < 6; ++I)
      h = On(h);
    h ^= t;
    for (let I = 0; I < 6; ++I) {
      const _ = h >> (5 - I) * 5 & 31;
      b += ns.charAt(_);
    }
    return b;
  }
  function r(o, d) {
    if (d = d || 90, o.length < 8)
      return o + " too short";
    if (o.length > d)
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
    const I = o.slice(0, b), _ = o.slice(b + 1);
    if (_.length < 6)
      return "Data too short";
    let x = zo(I);
    if (typeof x == "string")
      return x;
    const R = [];
    for (let C = 0; C < _.length; ++C) {
      const M = _.charAt(C), F = td[M];
      if (F === void 0)
        return "Unknown character " + M;
      x = On(x) ^ F, !(C + 6 >= _.length) && R.push(F);
    }
    return x !== t ? "Invalid checksum for " + o : { prefix: I, words: R };
  }
  function s(o, d) {
    const A = r(o, d);
    if (typeof A == "object")
      return A;
  }
  function i(o, d) {
    const A = r(o, d);
    if (typeof A == "object")
      return A;
    throw new Error(A);
  }
  return {
    decodeUnsafe: s,
    decode: i,
    encode: n,
    toWords: gl,
    fromWordsUnsafe: pl,
    fromWords: ml
  };
}
hr.bech32 = nd("bech32");
zn = hr.bech32m = nd("bech32m");
var rs = "fuel";
function ji(e) {
  return zn.decode(e);
}
function zr(e) {
  return zn.encode(
    rs,
    zn.toWords(Y(z(e)))
  );
}
function Hr(e) {
  return typeof e == "string" && e.indexOf(rs + 1) === 0 && ji(e).prefix === rs;
}
function Ai(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Ho(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function li(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function $i(e) {
  return new Uint8Array(zn.fromWords(ji(e).words));
}
function Zo(e) {
  if (!Hr(e))
    throw new v(
      v.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return z($i(e));
}
function wl(e) {
  const { words: t } = ji(e);
  return zn.encode(rs, t);
}
var cr = (e) => e instanceof Kc ? e.address : e instanceof fl ? e.id : e, yl = () => z(kt(32)), Il = (e) => {
  let t;
  try {
    if (!Ai(e))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = $i(zr(e)), t = z(t.fill(0, 0, 12));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, bl = (e) => {
  if (!li(e))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, ue = class extends ll {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    S(this, "bech32Address");
    if (this.bech32Address = wl(t), !Hr(this.bech32Address))
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
    return Zo(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return $i(this.bech32Address);
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
    const t = Zo(this.bech32Address);
    return {
      bits: Il(t)
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
    if (!Ho(t))
      throw new v(v.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = z(vn(Y(t)));
    return new ue(zr(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!Ai(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new ue(zr(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(yl());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Hr(t) ? new ue(t) : this.fromB256(t);
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
    if (Ho(t))
      return ue.fromPublicKey(t);
    if (Hr(t))
      return new ue(t);
    if (Ai(t))
      return ue.fromB256(t);
    if (li(t))
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
    if (!li(t))
      throw new v(
        v.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = bl(t);
    return new ue(zr(n));
  }
};
function El(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function rd(e) {
  return function t(n) {
    return arguments.length === 0 || El(n) ? t : e.apply(this, arguments);
  };
}
var Cl = /* @__PURE__ */ rd(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Bl(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function sd(e, t, n) {
  if (n || (n = new xl()), _l(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var d in e)
      Object.prototype.hasOwnProperty.call(e, d) && (i[d] = t ? sd(e[d], !0, n) : e[d]);
    return i;
  };
  switch (Cl(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Bl(e);
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
function _l(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var xl = /* @__PURE__ */ function() {
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
          const d = i[o];
          if (d[0] === t)
            return d[1];
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
}(), Lt = /* @__PURE__ */ rd(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : sd(t, !0);
}), cn, nc, Ce = (nc = class extends ce {
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
    Wt(this, cn, void 0);
    this.length = t, Rn(this, cn, n);
  }
  encode(t) {
    const n = [], r = Y(t);
    return n.push(r), gt(this, cn) && n.push(new Uint8Array(gt(this, cn))), ie(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [z(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return gt(this, cn) && ([r, s] = [null, s + gt(this, cn)]), [i, s];
  }
}, cn = new WeakMap(), nc), Hn = class extends ps {
  constructor() {
    super("TxPointer", {
      blockHeight: new $("u32", { padToWordSize: !0 }),
      txIndex: new $("u16", { padToWordSize: !0 })
    });
  }
}, me = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(me || {}), Jo = class extends ce {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new G().encode(e.owner)), t.push(new D("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new Hn().encode(e.txPointer)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new D("u64").encode(e.predicateGasUsed)), t.push(new D("u64").encode(e.predicateLength)), t.push(new D("u64").encode(e.predicateDataLength)), t.push(new Ce(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ce(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new G().decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const d = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    [n, r] = new Hn().decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const b = Number(n);
    [n, r] = new D("u64").decode(e, r);
    const I = n;
    [n, r] = new D("u64").decode(e, r);
    const _ = n;
    [n, r] = new D("u64").decode(e, r);
    const x = n;
    [n, r] = new Ce(_.toNumber()).decode(e, r);
    const R = n;
    return [n, r] = new Ce(x.toNumber()).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: d,
        assetId: A,
        txPointer: h,
        witnessIndex: b,
        predicateGasUsed: I,
        predicateLength: _,
        predicateDataLength: x,
        predicate: R,
        predicateData: n
      },
      r
    ];
  }
}, ss = class extends ce {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), t.push(new Hn().encode(e.txPointer)), t.push(new G().encode(e.contractID)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new G().decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new Hn().decode(e, r);
    const A = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: o,
        stateRoot: d,
        txPointer: A,
        contractID: n
      },
      r
    ];
  }
}, gr = class extends ce {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ce(32).encode(e.sender)), t.push(new Ce(32).encode(e.recipient)), t.push(new Ce(32).encode(e.nonce)), t.push(new D("u64").encode(e.amount)), t.push(Y(e.data || "0x")), mt(ie(t));
  }
  static encodeData(e) {
    const t = Y(e || "0x"), n = t.length;
    return new Ce(n).encode(t);
  }
  encode(e) {
    const t = [], n = gr.encodeData(e.data);
    return t.push(new Ce(32).encode(e.sender)), t.push(new Ce(32).encode(e.recipient)), t.push(new D("u64").encode(e.amount)), t.push(new Ce(32).encode(e.nonce)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new D("u64").encode(e.predicateGasUsed)), t.push(new D("u64").encode(n.length)), t.push(new D("u64").encode(e.predicateLength)), t.push(new D("u64").encode(e.predicateDataLength)), t.push(new Ce(n.length).encode(n)), t.push(new Ce(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ce(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ie(t);
  }
  static decodeData(e) {
    const t = Y(e), n = t.length, [r] = new Ce(n).decode(t, 0);
    return Y(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = Number(n);
    [n, r] = new D("u64").decode(e, r);
    const h = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const b = n;
    [n, r] = new D("u64").decode(e, r);
    const I = n;
    [n, r] = new D("u64").decode(e, r);
    const _ = n;
    [n, r] = new Ce(b).decode(e, r);
    const x = n;
    [n, r] = new Ce(I.toNumber()).decode(e, r);
    const R = n;
    return [n, r] = new Ce(_.toNumber()).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: A,
        nonce: d,
        predicateGasUsed: h,
        dataLength: b,
        predicateLength: I,
        predicateDataLength: _,
        data: x,
        predicate: R,
        predicateData: n
      },
      r
    ];
  }
}, ln = class extends ce {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Jo().encode(e));
        break;
      }
      case 1: {
        t.push(new ss().encode(e));
        break;
      }
      case 2: {
        t.push(new gr().encode(e));
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
        return [n, r] = new Jo().decode(e, r), [n, r];
      case 1:
        return [n, r] = new ss().decode(e, r), [n, r];
      case 2:
        return [n, r] = new gr().decode(e, r), [n, r];
      default:
        throw new v(
          N.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, be = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(be || {}), Wo = class extends ce {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, is = class extends ce {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new $("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: n
      },
      r
    ];
  }
}, qo = class extends ce {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, jo = class extends ce {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, $o = class extends ce {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.contractId)), t.push(new G().encode(e.stateRoot)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 4,
        contractId: s,
        stateRoot: n
      },
      r
    ];
  }
}, fn = class extends ce {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Wo().encode(e));
        break;
      }
      case 1: {
        t.push(new is().encode(e));
        break;
      }
      case 2: {
        t.push(new qo().encode(e));
        break;
      }
      case 3: {
        t.push(new jo().encode(e));
        break;
      }
      case 4: {
        t.push(new $o().encode(e));
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
        return [n, r] = new Wo().decode(e, r), [n, r];
      case 1:
        return [n, r] = new is().decode(e, r), [n, r];
      case 2:
        return [n, r] = new qo().decode(e, r), [n, r];
      case 3:
        return [n, r] = new jo().decode(e, r), [n, r];
      case 4:
        return [n, r] = new $o().decode(e, r), [n, r];
      default:
        throw new v(
          N.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, St = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(St || {}), vl = (e) => e.sort((t, n) => t.type - n.type);
function Rl(e) {
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
var hn = class extends ce {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Rl(e);
    const t = vl(e), n = [];
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
}, de = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(de || {}), Ko = class extends ce {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new D("u64").encode(e.gas)), t.push(new D("u64").encode(e.param1)), t.push(new D("u64").encode(e.param2)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    [n, r] = new D("u64").decode(e, r);
    const h = n;
    [n, r] = new D("u64").decode(e, r);
    const b = n;
    [n, r] = new D("u64").decode(e, r);
    const I = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: d,
        gas: A,
        param1: h,
        param2: b,
        pc: I,
        is: n
      },
      r
    ];
  }
}, ea = class extends ce {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
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
}, ta = class extends ce {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new D("u64").encode(e.ptr)), t.push(new D("u64").encode(e.len)), t.push(new G().encode(e.digest)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: d,
        pc: A,
        is: n
      },
      r
    ];
  }
}, na = class extends ce {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new D("u64").encode(e.reason)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), t.push(new G().encode(e.contractId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const d = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 3,
        id: s,
        reason: i,
        pc: o,
        is: d,
        contractId: n
      },
      r
    ];
  }
}, ra = class extends ce {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
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
}, sa = class extends ce {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new D("u64").encode(e.val0)), t.push(new D("u64").encode(e.val1)), t.push(new D("u64").encode(e.val2)), t.push(new D("u64").encode(e.val3)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const d = n;
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
        val2: d,
        val3: A,
        pc: h,
        is: n
      },
      r
    ];
  }
}, ia = class extends ce {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new D("u64").encode(e.val0)), t.push(new D("u64").encode(e.val1)), t.push(new D("u64").encode(e.ptr)), t.push(new D("u64").encode(e.len)), t.push(new G().encode(e.digest)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new D("u64").decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const d = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    [n, r] = new G().decode(e, r);
    const h = n;
    [n, r] = new D("u64").decode(e, r);
    const b = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: d,
        len: A,
        digest: h,
        pc: b,
        is: n
      },
      r
    ];
  }
}, oa = class extends ce {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 7,
        from: s,
        to: i,
        amount: o,
        assetId: d,
        pc: A,
        is: n
      },
      r
    ];
  }
}, aa = class extends ce {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new D("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 8,
        from: s,
        to: i,
        amount: o,
        assetId: d,
        pc: A,
        is: n
      },
      r
    ];
  }
}, ca = class extends ce {
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
}, os = class extends ce {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ce(32).encode(e.sender)), t.push(new Ce(32).encode(e.recipient)), t.push(new Ce(32).encode(e.nonce)), t.push(new D("u64").encode(e.amount)), t.push(Y(e.data || "0x")), mt(ie(t));
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.sender)), t.push(new G().encode(e.recipient)), t.push(new D("u64").encode(e.amount)), t.push(new G().encode(e.nonce)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.data.length)), t.push(new G().encode(e.digest)), t.push(new Ce(e.data.length).encode(e.data)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new G().decode(e, r);
    const h = n;
    [n, r] = new Ce(A).decode(e, r);
    const b = Y(n), I = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: d,
      digest: h,
      data: b
    };
    return I.messageId = os.getMessageId(I), [I, r];
  }
}, id = (e, t) => {
  const n = Y(e), r = Y(t);
  return mt(ie([n, r]));
}, pr = class extends ce {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return id(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const d = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n, h = pr.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: d,
      is: A,
      assetId: h
    }, r];
  }
}, fi = class extends ce {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return id(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new D("u64").encode(e.val)), t.push(new D("u64").encode(e.pc)), t.push(new D("u64").encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const d = n;
    [n, r] = new D("u64").decode(e, r);
    const A = n, h = pr.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: d,
      is: A,
      assetId: h
    }, r];
  }
}, Yw = class extends ce {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new Ko().encode(e));
        break;
      }
      case 1: {
        t.push(new ea().encode(e));
        break;
      }
      case 2: {
        t.push(new ta().encode(e));
        break;
      }
      case 3: {
        t.push(new na().encode(e));
        break;
      }
      case 4: {
        t.push(new ra().encode(e));
        break;
      }
      case 5: {
        t.push(new sa().encode(e));
        break;
      }
      case 6: {
        t.push(new ia().encode(e));
        break;
      }
      case 7: {
        t.push(new oa().encode(e));
        break;
      }
      case 8: {
        t.push(new aa().encode(e));
        break;
      }
      case 9: {
        t.push(new ca().encode(e));
        break;
      }
      case 10: {
        t.push(new os().encode(e));
        break;
      }
      case 11: {
        t.push(new pr().encode(e));
        break;
      }
      case 12: {
        t.push(new fi().encode(e));
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
        return [n, r] = new Ko().decode(e, r), [n, r];
      case 1:
        return [n, r] = new ea().decode(e, r), [n, r];
      case 2:
        return [n, r] = new ta().decode(e, r), [n, r];
      case 3:
        return [n, r] = new na().decode(e, r), [n, r];
      case 4:
        return [n, r] = new ra().decode(e, r), [n, r];
      case 5:
        return [n, r] = new sa().decode(e, r), [n, r];
      case 6:
        return [n, r] = new ia().decode(e, r), [n, r];
      case 7:
        return [n, r] = new oa().decode(e, r), [n, r];
      case 8:
        return [n, r] = new aa().decode(e, r), [n, r];
      case 9:
        return [n, r] = new ca().decode(e, r), [n, r];
      case 10:
        return [n, r] = new os().decode(e, r), [n, r];
      case 11:
        return [n, r] = new pr().decode(e, r), [n, r];
      case 12:
        return [n, r] = new fi().decode(e, r), [n, r];
      default:
        throw new v(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, da = class extends ps {
  constructor() {
    super("StorageSlot", {
      key: new G(),
      value: new G()
    });
  }
}, ua = class extends ce {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: n } = e;
    switch (t.push(new $("u8", { padToWordSize: !0 }).encode(n)), n) {
      case 0: {
        const r = e.data;
        t.push(new $("u16", { padToWordSize: !0 }).encode(r.witnessIndex)), t.push(new G().encode(r.checksum));
        break;
      }
      case 1: {
        const r = e.data;
        t.push(new G().encode(r.bytecodeRoot));
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
        return [r, n] = new G().decode(e, n), [{ type: s, data: { witnessIndex: i, checksum: r } }, n];
      }
      case 1:
        return [r, n] = new G().decode(e, n), [{ type: s, data: { bytecodeRoot: r } }, n];
      default:
        throw new v(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, gn = class extends ce {
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
    return t.push(new $("u32", { padToWordSize: !0 }).encode(e.dataLength)), t.push(new Ce(e.dataLength).encode(e.data)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    return [n, r] = new Ce(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, Oe = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e))(Oe || {}), Aa = class extends ce {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new D("u64").encode(e.scriptGasLimit)), t.push(new G().encode(e.receiptsRoot)), t.push(new D("u64").encode(e.scriptLength)), t.push(new D("u64").encode(e.scriptDataLength)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new Ce(e.scriptLength.toNumber()).encode(e.script)), t.push(new Ce(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new hn().encode(e.policies)), t.push(new ye(new ln(), e.inputsCount).encode(e.inputs)), t.push(new ye(new fn(), e.outputsCount).encode(e.outputs)), t.push(new ye(new gn(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new D("u64").decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const d = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const b = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const I = n;
    [n, r] = new Ce(o.toNumber()).decode(e, r);
    const _ = n;
    [n, r] = new Ce(d.toNumber()).decode(e, r);
    const x = n;
    [n, r] = new hn().decode(e, r, A);
    const R = n;
    [n, r] = new ye(new ln(), h).decode(e, r);
    const C = n;
    [n, r] = new ye(new fn(), b).decode(e, r);
    const M = n;
    return [n, r] = new ye(new gn(), I).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: d,
        policyTypes: A,
        inputsCount: h,
        outputsCount: b,
        witnessesCount: I,
        receiptsRoot: i,
        script: _,
        scriptData: x,
        policies: R,
        inputs: C,
        outputs: M,
        witnesses: n
      },
      r
    ];
  }
}, la = class extends ce {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new $("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new G().encode(e.salt)), t.push(new D("u64").encode(e.storageSlotsCount)), t.push(new $("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new $("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new ye(new da(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new hn().encode(e.policies)), t.push(new ye(new ln(), e.inputsCount).encode(e.inputs)), t.push(new ye(new fn(), e.outputsCount).encode(e.outputs)), t.push(new ye(new gn(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new D("u64").decode(e, r);
    const o = n;
    [n, r] = new $("u32", { padToWordSize: !0 }).decode(e, r);
    const d = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const h = n;
    [n, r] = new $("u16", { padToWordSize: !0 }).decode(e, r);
    const b = n;
    [n, r] = new ye(new da(), o.toNumber()).decode(
      e,
      r
    );
    const I = n;
    [n, r] = new hn().decode(e, r, d);
    const _ = n;
    [n, r] = new ye(new ln(), A).decode(e, r);
    const x = n;
    [n, r] = new ye(new fn(), h).decode(e, r);
    const R = n;
    return [n, r] = new ye(new gn(), b).decode(e, r), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: d,
        storageSlotsCount: o,
        inputsCount: A,
        outputsCount: h,
        witnessesCount: b,
        salt: i,
        policies: _,
        storageSlots: I,
        inputs: x,
        outputs: R,
        witnesses: n
      },
      r
    ];
  }
}, fa = class extends ce {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Hn().encode(e.txPointer)), t.push(new ss().encode(e.inputContract)), t.push(new is().encode(e.outputContract)), t.push(new D("u64").encode(e.mintAmount)), t.push(new G().encode(e.mintAssetId)), t.push(new D("u64").encode(e.gasPrice)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Hn().decode(e, r);
    const s = n;
    [n, r] = new ss().decode(e, r);
    const i = n;
    [n, r] = new is().decode(e, r);
    const o = n;
    [n, r] = new D("u64").decode(e, r);
    const d = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    return [n, r] = new D("u64").decode(e, r), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: d,
        mintAssetId: A,
        gasPrice: n
      },
      r
    ];
  }
}, ha = class extends ce {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new ua().encode(e.upgradePurpose)), t.push(new $("u32").encode(e.policyTypes)), t.push(new $("u16").encode(e.inputsCount)), t.push(new $("u16").encode(e.outputsCount)), t.push(new $("u16").encode(e.witnessesCount)), t.push(new hn().encode(e.policies)), t.push(new ye(new ln(), e.inputsCount).encode(e.inputs)), t.push(new ye(new fn(), e.outputsCount).encode(e.outputs)), t.push(new ye(new gn(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ua().decode(e, r);
    const s = n;
    [n, r] = new $("u32").decode(e, r);
    const i = n;
    [n, r] = new $("u16").decode(e, r);
    const o = n;
    [n, r] = new $("u16").decode(e, r);
    const d = n;
    [n, r] = new $("u16").decode(e, r);
    const A = n;
    [n, r] = new hn().decode(e, r, i);
    const h = n;
    [n, r] = new ye(new ln(), o).decode(e, r);
    const b = n;
    [n, r] = new ye(new fn(), d).decode(e, r);
    const I = n;
    return [n, r] = new ye(new gn(), A).decode(e, r), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: o,
        outputsCount: d,
        witnessesCount: A,
        policies: h,
        inputs: b,
        outputs: I,
        witnesses: n
      },
      r
    ];
  }
}, ga = class extends ce {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.root)), t.push(new $("u16").encode(e.witnessIndex)), t.push(new $("u16").encode(e.subsectionIndex)), t.push(new $("u16").encode(e.subsectionsNumber)), t.push(new $("u16").encode(e.proofSetCount)), t.push(new $("u32").encode(e.policyTypes)), t.push(new $("u16").encode(e.inputsCount)), t.push(new $("u16").encode(e.outputsCount)), t.push(new $("u16").encode(e.witnessesCount)), t.push(new ye(new G(), e.proofSetCount).encode(e.proofSet)), t.push(new hn().encode(e.policies)), t.push(new ye(new ln(), e.inputsCount).encode(e.inputs)), t.push(new ye(new fn(), e.outputsCount).encode(e.outputs)), t.push(new ye(new gn(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new $("u16").decode(e, r);
    const i = n;
    [n, r] = new $("u16").decode(e, r);
    const o = n;
    [n, r] = new $("u16").decode(e, r);
    const d = n;
    [n, r] = new $("u16").decode(e, r);
    const A = n;
    [n, r] = new $("u32").decode(e, r);
    const h = n;
    [n, r] = new $("u16").decode(e, r);
    const b = n;
    [n, r] = new $("u16").decode(e, r);
    const I = n;
    [n, r] = new $("u16").decode(e, r);
    const _ = n;
    [n, r] = new ye(new G(), A).decode(e, r);
    const x = n;
    [n, r] = new hn().decode(e, r, h);
    const R = n;
    [n, r] = new ye(new ln(), b).decode(e, r);
    const C = n;
    [n, r] = new ye(new fn(), I).decode(e, r);
    const M = n;
    return [n, r] = new ye(new gn(), _).decode(e, r), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: o,
        subsectionsNumber: d,
        proofSetCount: A,
        policyTypes: h,
        inputsCount: b,
        outputsCount: I,
        witnessesCount: _,
        proofSet: x,
        policies: R,
        inputs: C,
        outputs: M,
        witnesses: n
      },
      r
    ];
  }
}, pn = class extends ce {
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
          new Aa().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new la().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new fa().encode(e));
        break;
      }
      case 3: {
        t.push(
          new ha().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new ga().encode(e)
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
        return [n, r] = new Aa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new la().decode(e, r), [n, r];
      case 2:
        return [n, r] = new fa().decode(e, r), [n, r];
      case 3:
        return [n, r] = new ha().decode(e, r), [n, r];
      case 4:
        return [n, r] = new ga().decode(e, r), [n, r];
      default:
        throw new v(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, Vw = class extends ps {
  constructor() {
    super("UtxoId", {
      transactionId: new G(),
      outputIndex: new $("u8", { padToWordSize: !0 })
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const od = BigInt(0), ms = BigInt(1), Sl = BigInt(2);
function Pt(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Ql = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Zn(e) {
  if (!Pt(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += Ql[e[n]];
  return t;
}
function ad(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Ki(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const Gt = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function pa(e) {
  if (e >= Gt._0 && e <= Gt._9)
    return e - Gt._0;
  if (e >= Gt._A && e <= Gt._F)
    return e - (Gt._A - 10);
  if (e >= Gt._a && e <= Gt._f)
    return e - (Gt._a - 10);
}
function Jn(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = pa(e.charCodeAt(i)), d = pa(e.charCodeAt(i + 1));
    if (o === void 0 || d === void 0) {
      const A = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + A + '" at index ' + i);
    }
    r[s] = o * 16 + d;
  }
  return r;
}
function Bn(e) {
  return Ki(Zn(e));
}
function eo(e) {
  if (!Pt(e))
    throw new Error("Uint8Array expected");
  return Ki(Zn(Uint8Array.from(e).reverse()));
}
function Wn(e, t) {
  return Jn(e.toString(16).padStart(t * 2, "0"));
}
function to(e, t) {
  return Wn(e, t).reverse();
}
function Nl(e) {
  return Jn(ad(e));
}
function Qt(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = Jn(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Pt(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function mr(...e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (!Pt(i))
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
function cd(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function Dl(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Tl(e) {
  let t;
  for (t = 0; e > od; e >>= ms, t += 1)
    ;
  return t;
}
function Fl(e, t) {
  return e >> BigInt(t) & ms;
}
const Ml = (e, t, n) => e | (n ? ms : od) << BigInt(t), no = (e) => (Sl << BigInt(e - 1)) - ms, Ws = (e) => new Uint8Array(e), ma = (e) => Uint8Array.from(e);
function dd(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = Ws(e), s = Ws(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, d = (...I) => n(s, r, ...I), A = (I = Ws()) => {
    s = d(ma([0]), I), r = d(), I.length !== 0 && (s = d(ma([1]), I), r = d());
  }, h = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let I = 0;
    const _ = [];
    for (; I < t; ) {
      r = d();
      const x = r.slice();
      _.push(x), I += r.length;
    }
    return mr(..._);
  };
  return (I, _) => {
    o(), A(I);
    let x;
    for (; !(x = _(h())); )
      A();
    return o(), x;
  };
}
const Ol = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || Pt(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function br(e, t, n = {}) {
  const r = (s, i, o) => {
    const d = Ol[i];
    if (typeof d != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const A = e[s];
    if (!(o && A === void 0) && !d(A, e))
      throw new Error(`Invalid param ${String(s)}=${A} (${typeof A}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(n))
    r(s, i, !0);
  return e;
}
const Ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: Fl,
  bitLen: Tl,
  bitMask: no,
  bitSet: Ml,
  bytesToHex: Zn,
  bytesToNumberBE: Bn,
  bytesToNumberLE: eo,
  concatBytes: mr,
  createHmacDrbg: dd,
  ensureBytes: Qt,
  equalBytes: cd,
  hexToBytes: Jn,
  hexToNumber: Ki,
  isBytes: Pt,
  numberToBytesBE: Wn,
  numberToBytesLE: to,
  numberToHexUnpadded: ad,
  numberToVarBytesBE: Nl,
  utf8ToBytes: Dl,
  validateObject: br
}, Symbol.toStringTag, { value: "Module" }));
var qs = {}, hi = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Ee < "u" && Ee, r = function() {
    function i() {
      this.fetch = !1, this.DOMException = n.DOMException;
    }
    return i.prototype = n, new i();
  }();
  (function(i) {
    (function(o) {
      var d = typeof i < "u" && i || typeof self < "u" && self || typeof d < "u" && d, A = {
        searchParams: "URLSearchParams" in d,
        iterable: "Symbol" in d && "iterator" in Symbol,
        blob: "FileReader" in d && "Blob" in d && function() {
          try {
            return new Blob(), !0;
          } catch {
            return !1;
          }
        }(),
        formData: "FormData" in d,
        arrayBuffer: "ArrayBuffer" in d
      };
      function h(c) {
        return c && DataView.prototype.isPrototypeOf(c);
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
        ], I = ArrayBuffer.isView || function(c) {
          return c && b.indexOf(Object.prototype.toString.call(c)) > -1;
        };
      function _(c) {
        if (typeof c != "string" && (c = String(c)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(c) || c === "")
          throw new TypeError('Invalid character in header field name: "' + c + '"');
        return c.toLowerCase();
      }
      function x(c) {
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
        c = _(c), l = x(l);
        var p = this.map[c];
        this.map[c] = p ? p + ", " + l : l;
      }, C.prototype.delete = function(c) {
        delete this.map[_(c)];
      }, C.prototype.get = function(c) {
        return c = _(c), this.has(c) ? this.map[c] : null;
      }, C.prototype.has = function(c) {
        return this.map.hasOwnProperty(_(c));
      }, C.prototype.set = function(c, l) {
        this.map[_(c)] = x(l);
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
      function M(c) {
        if (c.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        c.bodyUsed = !0;
      }
      function F(c) {
        return new Promise(function(l, p) {
          c.onload = function() {
            l(c.result);
          }, c.onerror = function() {
            p(c.error);
          };
        });
      }
      function X(c) {
        var l = new FileReader(), p = F(l);
        return l.readAsArrayBuffer(c), p;
      }
      function k(c) {
        var l = new FileReader(), p = F(l);
        return l.readAsText(c), p;
      }
      function Z(c) {
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
          var c = M(this);
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
            var c = M(this);
            return c || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(X);
        }), this.text = function() {
          var c = M(this);
          if (c)
            return c;
          if (this._bodyBlob)
            return k(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(Z(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, A.formData && (this.formData = function() {
          return this.text().then(V);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var L = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function U(c) {
        var l = c.toUpperCase();
        return L.indexOf(l) > -1 ? l : c;
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
      function V(c) {
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
      var E = [301, 302, 303, 307, 308];
      ee.redirect = function(c, l) {
        if (E.indexOf(l) === -1)
          throw new RangeError("Invalid status code");
        return new ee(null, { status: l, headers: { location: c } });
      }, o.DOMException = d.DOMException;
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
            var J = "response" in y ? y.response : y.responseText;
            setTimeout(function() {
              p(new ee(J, m));
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
          function u(m) {
            try {
              return m === "" && d.location.href ? d.location.href : m;
            } catch {
              return m;
            }
          }
          y.open(w.method, u(w.url), !0), w.credentials === "include" ? y.withCredentials = !0 : w.credentials === "omit" && (y.withCredentials = !1), "responseType" in y && (A.blob ? y.responseType = "blob" : A.arrayBuffer && w.headers.get("Content-Type") && w.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (y.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof C) ? Object.getOwnPropertyNames(l.headers).forEach(function(m) {
            y.setRequestHeader(m, x(l.headers[m]));
          }) : w.headers.forEach(function(m, J) {
            y.setRequestHeader(J, m);
          }), w.signal && (w.signal.addEventListener("abort", g), y.onreadystatechange = function() {
            y.readyState === 4 && w.signal.removeEventListener("abort", g);
          }), y.send(typeof w._bodyInit > "u" ? null : w._bodyInit);
        });
      }
      return a.polyfill = !0, d.fetch || (d.fetch = a, d.Headers = C, d.Request = q, d.Response = ee), o.Headers = C, o.Request = q, o.Response = ee, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(hi, hi.exports);
var kl = hi.exports;
function Pl(e) {
  return typeof e == "object" && e !== null;
}
function Ul(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const Gl = /\r\n|[\n\r]/g;
function gi(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(Gl)) {
    if (typeof s.index == "number" || Ul(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function Xl(e) {
  return ud(
    e.source,
    gi(e.source, e.start)
  );
}
function ud(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, d = t.line === 1 ? n : 0, A = t.column + d, h = `${e.name}:${o}:${A}
`, b = r.split(/\r\n|[\n\r]/g), I = b[s];
  if (I.length > 120) {
    const _ = Math.floor(A / 80), x = A % 80, R = [];
    for (let C = 0; C < I.length; C += 80)
      R.push(I.slice(C, C + 80));
    return h + wa([
      [`${o} |`, R[0]],
      ...R.slice(1, _ + 1).map((C) => ["|", C]),
      ["|", "^".padStart(x)],
      ["|", R[_ + 1]]
    ]);
  }
  return h + wa([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, b[s - 1]],
    [`${o} |`, I],
    ["|", "^".padStart(A)],
    [`${o + 1} |`, b[s + 1]]
  ]);
}
function wa(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function Yl(e) {
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
class ro extends Error {
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
    const { nodes: o, source: d, positions: A, path: h, originalError: b, extensions: I } = Yl(n);
    super(t), this.name = "GraphQLError", this.path = h ?? void 0, this.originalError = b ?? void 0, this.nodes = ya(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const _ = ya(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((R) => R.loc).filter((R) => R != null)
    );
    this.source = d ?? (_ == null || (s = _[0]) === null || s === void 0 ? void 0 : s.source), this.positions = A ?? (_ == null ? void 0 : _.map((R) => R.start)), this.locations = A && d ? A.map((R) => gi(d, R)) : _ == null ? void 0 : _.map((R) => gi(R.source, R.start));
    const x = Pl(
      b == null ? void 0 : b.extensions
    ) ? b == null ? void 0 : b.extensions : void 0;
    this.extensions = (i = I ?? x) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, ro) : Object.defineProperty(this, "stack", {
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

` + Xl(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + ud(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function ya(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function ft(e, t, n) {
  return new ro(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class Vl {
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
class Ad {
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
const ld = {
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
}, zl = new Set(Object.keys(ld));
function Ia(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && zl.has(t);
}
var Dn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(Dn || (Dn = {}));
var pi;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(pi || (pi = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function mi(e) {
  return e === 9 || e === 32;
}
function wr(e) {
  return e >= 48 && e <= 57;
}
function fd(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function hd(e) {
  return fd(e) || e === 95;
}
function Hl(e) {
  return fd(e) || wr(e) || e === 95;
}
function Zl(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const d = e[o], A = Jl(d);
    A !== d.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && A < n && (n = A));
  }
  return e.map((o, d) => d === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function Jl(e) {
  let t = 0;
  for (; t < e.length && mi(e.charCodeAt(t)); )
    ++t;
  return t;
}
function Wl(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((x) => x.length === 0 || mi(x.charCodeAt(0))), o = n.endsWith('\\"""'), d = e.endsWith('"') && !o, A = e.endsWith("\\"), h = d || A, b = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || h || i || o);
  let I = "";
  const _ = s && mi(e.charCodeAt(0));
  return (b && !_ || i) && (I += `
`), I += n, (b || h) && (I += `
`), '"""' + I + '"""';
}
var P;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(P || (P = {}));
class ql {
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
    const n = new Ad(P.SOF, 0, 0, 0, 0);
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
          const n = $l(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === P.COMMENT);
    return t;
  }
}
function jl(e) {
  return e === P.BANG || e === P.DOLLAR || e === P.AMP || e === P.PAREN_L || e === P.PAREN_R || e === P.SPREAD || e === P.COLON || e === P.EQUALS || e === P.AT || e === P.BRACKET_L || e === P.BRACKET_R || e === P.BRACE_L || e === P.PIPE || e === P.BRACE_R;
}
function er(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function ws(e, t) {
  return gd(e.charCodeAt(t)) && pd(e.charCodeAt(t + 1));
}
function gd(e) {
  return e >= 55296 && e <= 56319;
}
function pd(e) {
  return e >= 56320 && e <= 57343;
}
function xn(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return P.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function lt(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new Ad(t, n, r, i, o, s);
}
function $l(e, t) {
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
        return Kl(e, s);
      case 33:
        return lt(e, P.BANG, s, s + 1);
      case 36:
        return lt(e, P.DOLLAR, s, s + 1);
      case 38:
        return lt(e, P.AMP, s, s + 1);
      case 40:
        return lt(e, P.PAREN_L, s, s + 1);
      case 41:
        return lt(e, P.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return lt(e, P.SPREAD, s, s + 3);
        break;
      case 58:
        return lt(e, P.COLON, s, s + 1);
      case 61:
        return lt(e, P.EQUALS, s, s + 1);
      case 64:
        return lt(e, P.AT, s, s + 1);
      case 91:
        return lt(e, P.BRACKET_L, s, s + 1);
      case 93:
        return lt(e, P.BRACKET_R, s, s + 1);
      case 123:
        return lt(e, P.BRACE_L, s, s + 1);
      case 124:
        return lt(e, P.PIPE, s, s + 1);
      case 125:
        return lt(e, P.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? of(e, s) : tf(e, s);
    }
    if (wr(i) || i === 45)
      return ef(e, s, i);
    if (hd(i))
      return af(e, s);
    throw ft(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : er(i) || ws(n, s) ? `Unexpected character: ${xn(e, s)}.` : `Invalid character: ${xn(e, s)}.`
    );
  }
  return lt(e, P.EOF, r, r);
}
function Kl(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (er(i))
      ++s;
    else if (ws(n, s))
      s += 2;
    else
      break;
  }
  return lt(
    e,
    P.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function ef(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), wr(i))
      throw ft(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${xn(
          e,
          s
        )}.`
      );
  } else
    s = js(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = js(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = js(e, s, i), i = r.charCodeAt(s)), i === 46 || hd(i))
    throw ft(
      e.source,
      s,
      `Invalid number, expected digit but got: ${xn(
        e,
        s
      )}.`
    );
  return lt(
    e,
    o ? P.FLOAT : P.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function js(e, t, n) {
  if (!wr(n))
    throw ft(
      e.source,
      t,
      `Invalid number, expected digit but got: ${xn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; wr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function tf(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const d = n.charCodeAt(s);
    if (d === 34)
      return o += n.slice(i, s), lt(e, P.STRING, t, s + 1, o);
    if (d === 92) {
      o += n.slice(i, s);
      const A = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? nf(e, s) : rf(e, s) : sf(e, s);
      o += A.value, s += A.size, i = s;
      continue;
    }
    if (d === 10 || d === 13)
      break;
    if (er(d))
      ++s;
    else if (ws(n, s))
      s += 2;
    else
      throw ft(
        e.source,
        s,
        `Invalid character within String: ${xn(
          e,
          s
        )}.`
      );
  }
  throw ft(e.source, s, "Unterminated string.");
}
function nf(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !er(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | dr(i), r < 0)
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
function rf(e, t) {
  const n = e.source.body, r = ba(n, t + 2);
  if (er(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (gd(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = ba(n, t + 8);
    if (pd(s))
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
function ba(e, t) {
  return dr(e.charCodeAt(t)) << 12 | dr(e.charCodeAt(t + 1)) << 8 | dr(e.charCodeAt(t + 2)) << 4 | dr(e.charCodeAt(t + 3));
}
function dr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function sf(e, t) {
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
function of(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, d = "";
  const A = [];
  for (; i < r; ) {
    const h = n.charCodeAt(i);
    if (h === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      d += n.slice(o, i), A.push(d);
      const b = lt(
        e,
        P.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Zl(A).join(`
`)
      );
      return e.line += A.length - 1, e.lineStart = s, b;
    }
    if (h === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      d += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (h === 10 || h === 13) {
      d += n.slice(o, i), A.push(d), h === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, d = "", o = i, s = i;
      continue;
    }
    if (er(h))
      ++i;
    else if (ws(n, i))
      i += 2;
    else
      throw ft(
        e.source,
        i,
        `Invalid character within String: ${xn(
          e,
          i
        )}.`
      );
  }
  throw ft(e.source, i, "Unterminated string.");
}
function af(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (Hl(i))
      ++s;
    else
      break;
  }
  return lt(
    e,
    P.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function Zr(e, t) {
  if (!!!e)
    throw new Error(t);
}
const cf = 10, md = 2;
function so(e) {
  return ys(e, []);
}
function ys(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return df(e, t);
    default:
      return String(e);
  }
}
function df(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (uf(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : ys(r, n);
  } else if (Array.isArray(e))
    return lf(e, n);
  return Af(e, n);
}
function uf(e) {
  return typeof e.toJSON == "function";
}
function Af(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > md ? "[" + ff(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + ys(i, t)
  ).join(", ") + " }";
}
function lf(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > md)
    return "[Array]";
  const n = Math.min(cf, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(ys(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function ff(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const hf = (
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
        const o = so(t);
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
class wd {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Zr(!1, `Body must be a string. Received: ${so(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || Zr(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Zr(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function gf(e) {
  return hf(e, wd);
}
function yd(e, t) {
  return new Er(e, t).parseDocument();
}
function pf(e, t) {
  const n = new Er(e, t);
  n.expectToken(P.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(P.EOF), r;
}
function mf(e, t) {
  const n = new Er(e, t);
  n.expectToken(P.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(P.EOF), r;
}
function wf(e, t) {
  const n = new Er(e, t);
  n.expectToken(P.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(P.EOF), r;
}
class Er {
  constructor(t, n = {}) {
    const r = gf(t) ? t : new wd(t);
    this._lexer = new ql(r), this._options = n, this._tokenCounter = 0;
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
    if (this.peek(P.BRACE_L))
      return this.node(t, {
        kind: ae.OPERATION_DEFINITION,
        operation: Dn.QUERY,
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
        return Dn.QUERY;
      case "mutation":
        return Dn.MUTATION;
      case "subscription":
        return Dn.SUBSCRIPTION;
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
      throw ft(
        this._lexer.source,
        this._lexer.token.start,
        `${Fr(
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
    if (Object.prototype.hasOwnProperty.call(pi, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new Vl(
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
      `Expected ${Id(t)}, found ${Fr(n)}.`
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
      throw ft(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${Fr(n)}.`
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
    return ft(
      this._lexer.source,
      n.start,
      `Unexpected ${Fr(n)}.`
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
      throw ft(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function Fr(e) {
  const t = e.value;
  return Id(e.kind) + (t != null ? ` "${t}"` : "");
}
function Id(e) {
  return jl(e) ? `"${e}"` : e;
}
const yf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: Er,
  parse: yd,
  parseConstValue: mf,
  parseType: wf,
  parseValue: pf
}, Symbol.toStringTag, { value: "Module" })), If = /* @__PURE__ */ Ti(yf);
function bf(e) {
  return `"${e.replace(Ef, Cf)}"`;
}
const Ef = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Cf(e) {
  return Bf[e.charCodeAt(0)];
}
const Bf = [
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
], _f = Object.freeze({});
function xf(e, t, n = ld) {
  const r = /* @__PURE__ */ new Map();
  for (const F of Object.values(ae))
    r.set(F, vf(t, F));
  let s, i = Array.isArray(e), o = [e], d = -1, A = [], h = e, b, I;
  const _ = [], x = [];
  do {
    d++;
    const F = d === o.length, X = F && A.length !== 0;
    if (F) {
      if (b = x.length === 0 ? void 0 : _[_.length - 1], h = I, I = x.pop(), X)
        if (i) {
          h = h.slice();
          let Z = 0;
          for (const [O, T] of A) {
            const L = O - Z;
            T === null ? (h.splice(L, 1), Z++) : h[L] = T;
          }
        } else {
          h = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(h)
          );
          for (const [Z, O] of A)
            h[Z] = O;
        }
      d = s.index, o = s.keys, A = s.edits, i = s.inArray, s = s.prev;
    } else if (I) {
      if (b = i ? d : o[d], h = I[b], h == null)
        continue;
      _.push(b);
    }
    let k;
    if (!Array.isArray(h)) {
      var R, C;
      Ia(h) || Zr(!1, `Invalid AST Node: ${so(h)}.`);
      const Z = F ? (R = r.get(h.kind)) === null || R === void 0 ? void 0 : R.leave : (C = r.get(h.kind)) === null || C === void 0 ? void 0 : C.enter;
      if (k = Z == null ? void 0 : Z.call(t, h, b, I, _, x), k === _f)
        break;
      if (k === !1) {
        if (!F) {
          _.pop();
          continue;
        }
      } else if (k !== void 0 && (A.push([b, k]), !F))
        if (Ia(k))
          h = k;
        else {
          _.pop();
          continue;
        }
    }
    if (k === void 0 && X && A.push([b, h]), F)
      _.pop();
    else {
      var M;
      s = {
        inArray: i,
        index: d,
        keys: o,
        edits: A,
        prev: s
      }, i = Array.isArray(h), o = i ? h : (M = n[h.kind]) !== null && M !== void 0 ? M : [], d = -1, A = [], I && x.push(I), I = h;
    }
  } while (s !== void 0);
  return A.length !== 0 ? A[A.length - 1][1] : e;
}
function vf(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function bd(e) {
  return xf(e, Sf);
}
const Rf = 80, Sf = {
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
    leave: ({ selections: e }) => Rt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", te(n, ", "), ")");
      return o.length > Rf && (o = i + pe(`(
`, Jr(te(n, `
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
    leave: ({ value: e, block: t }) => t ? Wl(e) : bf(e)
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
`) + te(["schema", te(t, " "), Rt(n)], " ")
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
        Rt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (Ea(n) ? pe(`(
`, Jr(te(n, `
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
        Rt(s)
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
`) + te(["enum", t, te(n, " "), Rt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + te([t, te(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + te(["input", t, te(n, " "), Rt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (Ea(n) ? pe(`(
`, Jr(te(n, `
`)), `
)`) : pe("(", te(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + te(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => te(
      ["extend schema", te(e, " "), Rt(t)],
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
        Rt(r)
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
        Rt(r)
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
    leave: ({ name: e, directives: t, values: n }) => te(["extend enum", e, te(t, " "), Rt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => te(["extend input", e, te(t, " "), Rt(n)], " ")
  }
};
function te(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Rt(e) {
  return pe(`{
`, Jr(te(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function Jr(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function Ea(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const Qf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: bd
}, Symbol.toStringTag, { value: "Module" })), Nf = /* @__PURE__ */ Ti(Qf);
var io = {}, Is = {}, Ed = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, Df = Ed, Cd = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Df;
}, Tf = Cd, Ff = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = Tf);
  var s, i = /* @__PURE__ */ new Map();
  function o(b, I) {
    var _ = i.get(I);
    _ ? _.push.apply(_, b) : i.set(I, b);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var d = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(b, I) {
        return o(["" + d + I], b), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(b, I) {
        var _ = e(b, "" + d + I, r);
        return _.files.forEach(o), _.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var A in t) {
        var h = e(t[A], "" + d + A, r);
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
Is.ReactNativeFile = Ed;
Is.extractFiles = Ff;
Is.isExtractableFile = Cd;
var Mf = typeof self == "object" ? self.FormData : window.FormData, Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.defaultJsonSerializer = void 0;
Cr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var Of = Ee && Ee.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(io, "__esModule", { value: !0 });
var Bd = Is, Lf = Of(Mf), kf = Cr, Pf = function(e) {
  return Bd.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Uf(e, t, n, r) {
  r === void 0 && (r = kf.defaultJsonSerializer);
  var s = Bd.extractFiles({ query: e, variables: t, operationName: n }, "", Pf), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var d = e.reduce(function(_, x, R) {
      return _.push({ query: x, variables: t ? t[R] : void 0 }), _;
    }, []);
    return r.stringify(d);
  }
  var A = typeof FormData > "u" ? Lf.default : FormData, h = new A();
  h.append("operations", r.stringify(i));
  var b = {}, I = 0;
  return o.forEach(function(_) {
    b[++I] = _;
  }), h.append("map", r.stringify(b)), I = 0, o.forEach(function(_, x) {
    h.append("" + ++I, x);
  }), h;
}
io.default = Uf;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.parseBatchRequestsExtendedArgs = Et.parseRawRequestExtendedArgs = Et.parseRequestExtendedArgs = Et.parseBatchRequestArgs = Et.parseRawRequestArgs = Et.parseRequestArgs = void 0;
function Gf(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Et.parseRequestArgs = Gf;
function Xf(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Et.parseRawRequestArgs = Xf;
function Yf(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Et.parseBatchRequestArgs = Yf;
function Vf(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Et.parseRequestExtendedArgs = Vf;
function zf(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Et.parseRawRequestExtendedArgs = zf;
function Hf(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
Et.parseBatchRequestsExtendedArgs = Hf;
var Br = {}, Zf = Ee && Ee.__extends || /* @__PURE__ */ function() {
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
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.ClientError = void 0;
var Jf = (
  /** @class */
  function(e) {
    Zf(t, e);
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
Br.ClientError = Jf;
var sr = {}, Ca;
function Wf() {
  if (Ca)
    return sr;
  Ca = 1;
  var e = Ee && Ee.__assign || function() {
    return e = Object.assign || function(O) {
      for (var T, L = 1, U = arguments.length; L < U; L++) {
        T = arguments[L];
        for (var q in T)
          Object.prototype.hasOwnProperty.call(T, q) && (O[q] = T[q]);
      }
      return O;
    }, e.apply(this, arguments);
  }, t = Ee && Ee.__awaiter || function(O, T, L, U) {
    function q(V) {
      return V instanceof L ? V : new L(function(H) {
        H(V);
      });
    }
    return new (L || (L = Promise))(function(V, H) {
      function ee(c) {
        try {
          a(U.next(c));
        } catch (l) {
          H(l);
        }
      }
      function E(c) {
        try {
          a(U.throw(c));
        } catch (l) {
          H(l);
        }
      }
      function a(c) {
        c.done ? V(c.value) : q(c.value).then(ee, E);
      }
      a((U = U.apply(O, T || [])).next());
    });
  }, n = Ee && Ee.__generator || function(O, T) {
    var L = { label: 0, sent: function() {
      if (V[0] & 1)
        throw V[1];
      return V[1];
    }, trys: [], ops: [] }, U, q, V, H;
    return H = { next: ee(0), throw: ee(1), return: ee(2) }, typeof Symbol == "function" && (H[Symbol.iterator] = function() {
      return this;
    }), H;
    function ee(a) {
      return function(c) {
        return E([a, c]);
      };
    }
    function E(a) {
      if (U)
        throw new TypeError("Generator is already executing.");
      for (; L; )
        try {
          if (U = 1, q && (V = a[0] & 2 ? q.return : a[0] ? q.throw || ((V = q.return) && V.call(q), 0) : q.next) && !(V = V.call(q, a[1])).done)
            return V;
          switch (q = 0, V && (a = [a[0] & 2, V.value]), a[0]) {
            case 0:
            case 1:
              V = a;
              break;
            case 4:
              return L.label++, { value: a[1], done: !1 };
            case 5:
              L.label++, q = a[1], a = [0];
              continue;
            case 7:
              a = L.ops.pop(), L.trys.pop();
              continue;
            default:
              if (V = L.trys, !(V = V.length > 0 && V[V.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                L = 0;
                continue;
              }
              if (a[0] === 3 && (!V || a[1] > V[0] && a[1] < V[3])) {
                L.label = a[1];
                break;
              }
              if (a[0] === 6 && L.label < V[1]) {
                L.label = V[1], V = a;
                break;
              }
              if (V && L.label < V[2]) {
                L.label = V[2], L.ops.push(a);
                break;
              }
              V[2] && L.ops.pop(), L.trys.pop();
              continue;
          }
          a = T.call(O, L);
        } catch (c) {
          a = [6, c], q = 0;
        } finally {
          U = V = 0;
        }
      if (a[0] & 5)
        throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(sr, "__esModule", { value: !0 }), sr.GraphQLWebSocketClient = void 0;
  var r = Br, s = _d(), i = "connection_init", o = "connection_ack", d = "ping", A = "pong", h = "subscribe", b = "next", I = "error", _ = "complete", x = (
    /** @class */
    function() {
      function O(T, L, U) {
        this._type = T, this._payload = L, this._id = U;
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
      }), O.parse = function(T, L) {
        var U = JSON.parse(T), q = U.type, V = U.payload, H = U.id;
        return new O(q, L(V), H);
      }, O;
    }()
  ), R = (
    /** @class */
    function() {
      function O(T, L) {
        var U = this, q = L.onInit, V = L.onAcknowledged, H = L.onPing, ee = L.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = T, T.onopen = function(E) {
          return t(U, void 0, void 0, function() {
            var a, c, l, p;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, c = (a = T).send, l = M, q ? [4, q()] : [3, 2];
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
        }, T.onclose = function(E) {
          U.socketState.acknowledged = !1, U.socketState.subscriptions = {};
        }, T.onerror = function(E) {
          console.error(E);
        }, T.onmessage = function(E) {
          try {
            var a = C(E.data);
            switch (a.type) {
              case o: {
                U.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (U.socketState.acknowledged = !0, V && V(a.payload));
                return;
              }
              case d: {
                H ? H(a.payload).then(function(w) {
                  return T.send(X(w).text);
                }) : T.send(X(null).text);
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
              case b: {
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
      return O.prototype.makeSubscribe = function(T, L, U, q) {
        var V = this, H = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[H] = { query: T, variables: U, subscriber: q }, this.socket.send(k(H, { query: T, operationName: L, variables: U }).text), function() {
          V.socket.send(Z(H).text), delete V.socketState.subscriptions[H];
        };
      }, O.prototype.rawRequest = function(T, L) {
        var U = this;
        return new Promise(function(q, V) {
          var H;
          U.rawSubscribe(T, {
            next: function(ee, E) {
              return H = { data: ee, extensions: E };
            },
            error: V,
            complete: function() {
              return q(H);
            }
          }, L);
        });
      }, O.prototype.request = function(T, L) {
        var U = this;
        return new Promise(function(q, V) {
          var H;
          U.subscribe(T, {
            next: function(ee) {
              return H = ee;
            },
            error: V,
            complete: function() {
              return q(H);
            }
          }, L);
        });
      }, O.prototype.subscribe = function(T, L, U) {
        var q = s.resolveRequestDocument(T), V = q.query, H = q.operationName;
        return this.makeSubscribe(V, H, U, L);
      }, O.prototype.rawSubscribe = function(T, L, U) {
        return this.makeSubscribe(T, void 0, U, L);
      }, O.prototype.ping = function(T) {
        this.socket.send(F(T).text);
      }, O.prototype.close = function() {
        this.socket.close(1e3);
      }, O.PROTOCOL = "graphql-transport-ws", O;
    }()
  );
  sr.GraphQLWebSocketClient = R;
  function C(O, T) {
    T === void 0 && (T = function(U) {
      return U;
    });
    var L = x.parse(O, T);
    return L;
  }
  function M(O) {
    return new x(i, O);
  }
  function F(O) {
    return new x(d, O, void 0);
  }
  function X(O) {
    return new x(A, O, void 0);
  }
  function k(O, T) {
    return new x(h, T, O);
  }
  function Z(O) {
    return new x(_, void 0, O);
  }
  return sr;
}
var Ba;
function _d() {
  return Ba || (Ba = 1, function(e) {
    var t = Ee && Ee.__assign || function() {
      return t = Object.assign || function(f) {
        for (var w, y = 1, g = arguments.length; y < g; y++) {
          w = arguments[y];
          for (var u in w)
            Object.prototype.hasOwnProperty.call(w, u) && (f[u] = w[u]);
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
      function u(m) {
        return m instanceof y ? m : new y(function(J) {
          J(m);
        });
      }
      return new (y || (y = Promise))(function(m, J) {
        function W(re) {
          try {
            j(g.next(re));
          } catch (se) {
            J(se);
          }
        }
        function K(re) {
          try {
            j(g.throw(re));
          } catch (se) {
            J(se);
          }
        }
        function j(re) {
          re.done ? m(re.value) : u(re.value).then(W, K);
        }
        j((g = g.apply(f, w || [])).next());
      });
    }, o = Ee && Ee.__generator || function(f, w) {
      var y = { label: 0, sent: function() {
        if (m[0] & 1)
          throw m[1];
        return m[1];
      }, trys: [], ops: [] }, g, u, m, J;
      return J = { next: W(0), throw: W(1), return: W(2) }, typeof Symbol == "function" && (J[Symbol.iterator] = function() {
        return this;
      }), J;
      function W(j) {
        return function(re) {
          return K([j, re]);
        };
      }
      function K(j) {
        if (g)
          throw new TypeError("Generator is already executing.");
        for (; y; )
          try {
            if (g = 1, u && (m = j[0] & 2 ? u.return : j[0] ? u.throw || ((m = u.return) && m.call(u), 0) : u.next) && !(m = m.call(u, j[1])).done)
              return m;
            switch (u = 0, m && (j = [j[0] & 2, m.value]), j[0]) {
              case 0:
              case 1:
                m = j;
                break;
              case 4:
                return y.label++, { value: j[1], done: !1 };
              case 5:
                y.label++, u = j[1], j = [0];
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
            j = [6, re], u = 0;
          } finally {
            g = m = 0;
          }
        if (j[0] & 5)
          throw j[1];
        return { value: j[0] ? j[1] : void 0, done: !0 };
      }
    }, d = Ee && Ee.__rest || function(f, w) {
      var y = {};
      for (var g in f)
        Object.prototype.hasOwnProperty.call(f, g) && w.indexOf(g) < 0 && (y[g] = f[g]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, g = Object.getOwnPropertySymbols(f); u < g.length; u++)
          w.indexOf(g[u]) < 0 && Object.prototype.propertyIsEnumerable.call(f, g[u]) && (y[g[u]] = f[g[u]]);
      return y;
    }, A = Ee && Ee.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var h = s(kl), b = h, I = If, _ = Nf, x = A(io), R = Cr, C = Et, M = Br;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return M.ClientError;
    } });
    var F = function(f) {
      var w = {};
      return f && (typeof Headers < "u" && f instanceof Headers || b && b.Headers && f instanceof b.Headers ? w = l(f) : Array.isArray(f) ? f.forEach(function(y) {
        var g = y[0], u = y[1];
        w[g] = u;
      }) : w = f), w;
    }, X = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, k = function(f) {
      var w = f.query, y = f.variables, g = f.operationName, u = f.jsonSerializer;
      if (!Array.isArray(w)) {
        var m = ["query=" + encodeURIComponent(X(w))];
        return y && m.push("variables=" + encodeURIComponent(u.stringify(y))), g && m.push("operationName=" + encodeURIComponent(g)), m.join("&");
      }
      if (typeof y < "u" && !Array.isArray(y))
        throw new Error("Cannot create query with given variable type, array expected");
      var J = w.reduce(function(W, K, j) {
        return W.push({
          query: X(K),
          variables: y ? u.stringify(y[j]) : void 0
        }), W;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(J));
    }, Z = function(f) {
      var w = f.url, y = f.query, g = f.variables, u = f.operationName, m = f.headers, J = f.fetch, W = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var j, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return j = x.default(y, g, u, W.jsonSerializer), re = t({ method: "POST", headers: t(t({}, typeof j == "string" ? { "Content-Type": "application/json" } : {}), m), body: j }, W), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, J(w, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, O = function(f) {
      var w = f.url, y = f.query, g = f.variables, u = f.operationName, m = f.headers, J = f.fetch, W = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var j, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return j = k({
                query: y,
                variables: g,
                operationName: u,
                jsonSerializer: W.jsonSerializer
              }), re = t({ method: "GET", headers: m }, W), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, J(w + "?" + j, re)];
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
            var u, m, J, W, K, j, re, se, Se, he, oe, xe;
            return o(this, function(Ae) {
              return u = C.parseRawRequestArgs(w, y, g), m = this.options, J = m.headers, W = m.fetch, K = W === void 0 ? h.default : W, j = m.method, re = j === void 0 ? "POST" : j, se = m.requestMiddleware, Se = m.responseMiddleware, he = d(m, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, u.signal !== void 0 && (he.signal = u.signal), xe = E(u.query).operationName, [2, L({
                url: oe,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, F(a(J))), F(u.requestHeaders)),
                operationName: xe,
                fetch: K,
                method: re,
                fetchOptions: he,
                middleware: se
              }).then(function(ge) {
                return Se && Se(ge), ge;
              }).catch(function(ge) {
                throw Se && Se(ge), ge;
              })];
            });
          });
        }, f.prototype.request = function(w) {
          for (var y = [], g = 1; g < arguments.length; g++)
            y[g - 1] = arguments[g];
          var u = y[0], m = y[1], J = C.parseRequestArgs(w, u, m), W = this.options, K = W.headers, j = W.fetch, re = j === void 0 ? h.default : j, se = W.method, Se = se === void 0 ? "POST" : se, he = W.requestMiddleware, oe = W.responseMiddleware, xe = d(W, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), Ae = this.url;
          J.signal !== void 0 && (xe.signal = J.signal);
          var ge = E(J.document), Dt = ge.query, ve = ge.operationName;
          return L({
            url: Ae,
            query: Dt,
            variables: J.variables,
            headers: t(t({}, F(a(K))), F(J.requestHeaders)),
            operationName: ve,
            fetch: re,
            method: Se,
            fetchOptions: xe,
            middleware: he
          }).then(function(Ie) {
            return oe && oe(Ie), Ie.data;
          }).catch(function(Ie) {
            throw oe && oe(Ie), Ie;
          });
        }, f.prototype.batchRequests = function(w, y) {
          var g = C.parseBatchRequestArgs(w, y), u = this.options, m = u.headers, J = u.fetch, W = J === void 0 ? h.default : J, K = u.method, j = K === void 0 ? "POST" : K, re = u.requestMiddleware, se = u.responseMiddleware, Se = d(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), he = this.url;
          g.signal !== void 0 && (Se.signal = g.signal);
          var oe = g.documents.map(function(Ae) {
            var ge = Ae.document;
            return E(ge).query;
          }), xe = g.documents.map(function(Ae) {
            var ge = Ae.variables;
            return ge;
          });
          return L({
            url: he,
            query: oe,
            variables: xe,
            headers: t(t({}, F(a(m))), F(g.requestHeaders)),
            operationName: void 0,
            fetch: W,
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
          var g, u = this.options.headers;
          return u ? u[w] = y : this.options.headers = (g = {}, g[w] = y, g), this;
        }, f.prototype.setEndpoint = function(w) {
          return this.url = w, this;
        }, f;
      }()
    );
    e.GraphQLClient = T;
    function L(f) {
      var w = f.url, y = f.query, g = f.variables, u = f.headers, m = f.operationName, J = f.fetch, W = f.method, K = W === void 0 ? "POST" : W, j = f.fetchOptions, re = f.middleware;
      return i(this, void 0, void 0, function() {
        var se, Se, he, oe, xe, Ae, ge, Dt, ve, Ie, nr;
        return o(this, function(Qe) {
          switch (Qe.label) {
            case 0:
              return se = K.toUpperCase() === "POST" ? Z : O, Se = Array.isArray(y), [4, se({
                url: w,
                query: y,
                variables: g,
                operationName: m,
                headers: u,
                fetch: J,
                fetchOptions: j,
                middleware: re
              })];
            case 1:
              return he = Qe.sent(), [4, H(he, j.jsonSerializer)];
            case 2:
              if (oe = Qe.sent(), xe = Se && Array.isArray(oe) ? !oe.some(function(Te) {
                var Rr = Te.data;
                return !Rr;
              }) : !!oe.data, Ae = !oe.errors || j.errorPolicy === "all" || j.errorPolicy === "ignore", he.ok && Ae && xe)
                return ge = he.headers, Dt = he.status, oe.errors, ve = d(oe, ["errors"]), Ie = j.errorPolicy === "ignore" ? ve : oe, [2, t(t({}, Se ? { data: Ie } : Ie), { headers: ge, status: Dt })];
              throw nr = typeof oe == "string" ? { error: oe } : oe, new M.ClientError(t(t({}, nr), { status: he.status, headers: he.headers }), { query: y, variables: g });
          }
        });
      });
    }
    function U(f, w, y, g) {
      return i(this, void 0, void 0, function() {
        var u, m;
        return o(this, function(J) {
          return u = C.parseRawRequestExtendedArgs(f, w, y, g), m = new T(u.url), [2, m.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = U;
    function q(f, w) {
      for (var y = [], g = 2; g < arguments.length; g++)
        y[g - 2] = arguments[g];
      return i(this, void 0, void 0, function() {
        var u, m, J, W;
        return o(this, function(K) {
          return u = y[0], m = y[1], J = C.parseRequestExtendedArgs(f, w, u, m), W = new T(J.url), [2, W.request(t({}, J))];
        });
      });
    }
    e.request = q;
    function V(f, w, y) {
      return i(this, void 0, void 0, function() {
        var g, u;
        return o(this, function(m) {
          return g = C.parseBatchRequestsExtendedArgs(f, w, y), u = new T(g.url), [2, u.batchRequests(t({}, g))];
        });
      });
    }
    e.batchRequests = V, e.default = q;
    function H(f, w) {
      return w === void 0 && (w = R.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var y, g, u;
        return o(this, function(m) {
          switch (m.label) {
            case 0:
              return f.headers.forEach(function(J, W) {
                W.toLowerCase() === "content-type" && (y = J);
              }), y && y.toLowerCase().startsWith("application/json") ? (u = (g = w).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, u.apply(g, [m.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function ee(f) {
      var w, y = void 0, g = f.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return g.length === 1 && (y = (w = g[0].name) === null || w === void 0 ? void 0 : w.value), y;
    }
    function E(f) {
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
    e.resolveRequestDocument = E;
    function a(f) {
      return typeof f == "function" ? f() : f;
    }
    function c(f) {
      for (var w = [], y = 1; y < arguments.length; y++)
        w[y - 1] = arguments[y];
      return f.reduce(function(g, u, m) {
        return "" + g + u + (m in w ? w[m] : "");
      }, "");
    }
    e.gql = c;
    function l(f) {
      var w = {};
      return f.forEach(function(y, g) {
        w[g] = y;
      }), w;
    }
    var p = Wf();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return p.GraphQLWebSocketClient;
    } });
  }(qs)), qs;
}
var qf = _d(), as = function() {
  return as = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, as.apply(this, arguments);
};
var Wr = /* @__PURE__ */ new Map(), wi = /* @__PURE__ */ new Map(), xd = !0, cs = !1;
function vd(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function jf(e) {
  return vd(e.source.body.substring(e.start, e.end));
}
function $f(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = jf(r.loc), o = wi.get(s);
      o && !o.has(i) ? xd && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || wi.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), as(as({}, e), { definitions: n });
}
function Kf(e) {
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
function eh(e) {
  var t = vd(e);
  if (!Wr.has(t)) {
    var n = yd(e, {
      experimentalFragmentVariables: cs,
      allowLegacyFragmentVariables: cs
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Wr.set(t, Kf($f(n)));
  }
  return Wr.get(t);
}
function qn(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), eh(r);
}
function th() {
  Wr.clear(), wi.clear();
}
function nh() {
  xd = !1;
}
function rh() {
  cs = !0;
}
function sh() {
  cs = !1;
}
var ir = {
  gql: qn,
  resetCaches: th,
  disableFragmentWarnings: nh,
  enableExperimentalFragmentVariables: rh,
  disableExperimentalFragmentVariables: sh
};
(function(e) {
  e.gql = ir.gql, e.resetCaches = ir.resetCaches, e.disableFragmentWarnings = ir.disableFragmentWarnings, e.enableExperimentalFragmentVariables = ir.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = ir.disableExperimentalFragmentVariables;
})(qn || (qn = {}));
qn.default = qn;
const ne = qn;
var Ne = "0x0000000000000000000000000000000000000000000000000000000000000000", zw = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Hw = 16 * 1024, Zw = 16, Jw = 1024 * 1024 * 1024, Ww = 1024 * 1024 * 1024, qw = 255, jw = 1024 * 1024, $w = 1024 * 1024, ih = "0xffffffffffff0000", Rd = "0xffffffffffff0001", oh = "0xffffffffffff0003", ah = "0xffffffffffff0004", ch = "0xffffffffffff0005", Kw = "0x0", dh = [
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
], uh = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let Q;
const Sd = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Sd.decode();
let ur = null;
function Qd() {
  return (ur === null || ur.byteLength === 0) && (ur = new Uint8Array(Q.memory.buffer)), ur;
}
function Ah(e, t) {
  return e = e >>> 0, Sd.decode(Qd().subarray(e, e + t));
}
function Nd(e) {
  const t = Q.ret(e);
  return Ut.__wrap(t);
}
function _a(e, t, n, r) {
  const s = Q.call(e, t, n, r);
  return Ut.__wrap(s);
}
function lh(e, t, n) {
  const r = Q.tr(e, t, n);
  return Ut.__wrap(r);
}
function xa(e, t, n) {
  const r = Q.addi(e, t, n);
  return Ut.__wrap(r);
}
function yi(e, t, n) {
  const r = Q.lw(e, t, n);
  return Ut.__wrap(r);
}
function fh(e, t, n) {
  const r = Q.gtf(e, t, n);
  return Ut.__wrap(r);
}
function Mr(e, t) {
  const n = Q.movi(e, t);
  return Ut.__wrap(n);
}
let Ar = null;
function va() {
  return (Ar === null || Ar.byteLength === 0) && (Ar = new Int32Array(Q.memory.buffer)), Ar;
}
function hh(e, t) {
  return e = e >>> 0, Qd().subarray(e / 1, e / 1 + t);
}
const gh = Object.freeze({
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
const Ra = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => Q.__wbg_instruction_free(e >>> 0));
class Ut {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Ut.prototype);
    return n.__wbg_ptr = t, Ra.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ra.unregister(this), t;
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
      var t = va()[s / 4 + 0], n = va()[s / 4 + 1], r = hh(t, n).slice();
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
const Sa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => Q.__wbg_regid_free(e >>> 0));
class Me {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Me.prototype);
    return n.__wbg_ptr = t, Sa.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sa.unregister(this), t;
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
    return n === 0 ? void 0 : Me.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = Q.regid_bal();
    return Me.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = Q.regid_cgas();
    return Me.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = Q.regid_err();
    return Me.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = Q.regid_flag();
    return Me.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = Q.regid_fp();
    return Me.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = Q.regid_ggas();
    return Me.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = Q.regid_hp();
    return Me.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = Q.regid_is();
    return Me.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = Q.regid_of();
    return Me.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = Q.regid_one();
    return Me.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = Q.regid_pc();
    return Me.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = Q.regid_ret();
    return Me.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = Q.regid_retl();
    return Me.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = Q.regid_sp();
    return Me.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = Q.regid_spp();
    return Me.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = Q.regid_writable();
    return Me.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = Q.regid_zero();
    return Me.__wrap(t);
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
async function ph(e, t) {
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
function mh() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(Ah(t, n));
  }, e;
}
function wh(e, t) {
  return Q = e.exports, Dd.__wbindgen_wasm_module = t, Ar = null, ur = null, Q;
}
async function Dd(e) {
  if (Q !== void 0)
    return Q;
  const t = mh(), { instance: n, module: r } = await ph(await e, t);
  return wh(n, r);
}
function yh(e, t, n, r) {
  function s(I, _, x) {
    var R = x ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, C = x ? WebAssembly.compileStreaming : WebAssembly.compile;
    return _ ? R(I, _) : C(I);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var d = globalThis.atob(n), A = d.length;
    i = new Uint8Array(new ArrayBuffer(A));
    for (var h = 0; h < A; h++)
      i[h] = d.charCodeAt(h);
  }
  if (e) {
    var b = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(b, r) : b;
  } else
    return s(i, r, !1);
}
function Ih(e) {
  return yh(1, null, "AGFzbQEAAAABQAtgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38Bf2AAAX9gAn9/AGABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX8CGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABQP7AfkBAQMKBgEFBQUBBQEBAQEBAQECBQICAQEDAgICAgUCAwMDAwMDAwIBBQEFAAMDAwMDAwMDAwMDAQABAQUFAQEBAQEBAQEBAQIBBQUFAwIBAAABAQEFAgIBAQYABgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGAwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEDBgADAQEBBwICAAIABgEEAwEDBQgBCQkDAwMFAQEBBgYGBgQEBAQEBAQEBAQEBAQEBAQEBAQGBwcCAgIDBwcACAADBAUBcAEHBwUDAQARBgkBfwFBgIDAAAsHxEvBBQZtZW1vcnkCABZfX3diZ19jb21wYXJlYXJnc19mcmVlAHcaX193YmdfZ2V0X2NvbXBhcmVhcmdzX21vZGUAORpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQAoIl9fd2JnX2dldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMAOiJfX3diZ19zZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzADsSY29tcGFyZWFyZ3NfdG9faW1tAEgUY29tcGFyZWFyZ3NfZnJvbV9pbW0AKRVfX3diZ19nZXRfbWF0aGFyZ3Nfb3AAORVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AAKhJfX3diZ19tdWxhcmdzX2ZyZWUAeB5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAOR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAPBJfX3diZ19kaXZhcmdzX2ZyZWUA1gEeX193YmdfZ2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK0BIXBhbmljaW5zdHJ1Y3Rpb25fZXJyb3JfdHlwZXNjcmlwdABMF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAD4ccGFuaWNpbnN0cnVjdGlvbl9pbnN0cnVjdGlvbgA/DGdtX2Zyb21fYXJncwDJAQ1ndGZfZnJvbV9hcmdzAMEBB2dtX2FyZ3MAeQhndGZfYXJncwBaDndkY21fZnJvbV9hcmdzACYOd2RvcF9mcm9tX2FyZ3MAJg53ZG1sX2Zyb21fYXJncwAeDndkZHZfZnJvbV9hcmdzAL8BCXdkY21fYXJncwAZCXdxY21fYXJncwAaCXdkb3BfYXJncwAbCXdxb3BfYXJncwAcCXdkbWxfYXJncwAUCXdxbWxfYXJncwAVCXdkZHZfYXJncwBVCXdxZHZfYXJncwBWEF9fd2JnX2ltbTA2X2ZyZWUA1wEQX193YmdfaW1tMTJfZnJlZQDYARBfX3diZ19pbW0xOF9mcmVlANkBDl9fd2JnX2FkZF9mcmVlALgBD19fd2JnX25vb3BfZnJlZQBbEmFkZF9uZXdfdHlwZXNjcmlwdABPBmFkZF9yYQAWBmFkZF9yYgALBmFkZF9yYwAPA2FkZAC5AQNhbmQAewNkaXYAfAJlcQB9A2V4cAB+Amd0AH8CbHQAgAEEbWxvZwCBAQRtcm9vAIIBBG1vZF8AgwEFbW92ZV8ALANtdWwAhAEDbm90AC0Cb3IAhQEDc2xsAIYBA3NybACHAQNzdWIAiAEDeG9yAIkBBG1sZHYAXANyZXQArgEEcmV0ZAAuE2Fsb2NfbmV3X3R5cGVzY3JpcHQAVwdhbG9jX3JhAE4EYWxvYwCvAQNtY2wALwNtY3AAigEDbWVxAF0TYmhzaF9uZXdfdHlwZXNjcmlwdAAfBGJoc2gAMARiaGVpALABBGJ1cm4AMRNjYWxsX25ld190eXBlc2NyaXB0AE0HY2FsbF9yZAAXBGNhbGwAXgNjY3AAXwRjcm9vADIEY3NpegAzAmNiALEBA2xkYwCLAQNsb2cAYARsb2dkAGEEbWludAA0BHJ2cnQAsgEEc2N3cQCMAQNzcncAjQEEc3J3cQBiA3N3dwCOAQRzd3dxAGMCdHIAjwEDdHJvAGQEZWNrMQCQAQRlY3IxAJEBBGVkMTkAkgEEazI1NgCTAQRzMjU2AJQBBHRpbWUANRNub29wX25ld190eXBlc2NyaXB0AMYBBG5vb3AA2gEEZmxhZwCzAQNiYWwAlQEDam1wALQBA2puZQCWAQNzbW8AZRNhZGRpX25ld190eXBlc2NyaXB0AFAKYWRkaV9pbW0xMgAMBGFkZGkAlwEEYW5kaQCYAQRkaXZpAJkBBGV4cGkAmgEEbW9kaQCbAQRtdWxpAJwBA29yaQCdAQRzbGxpAJ4BBHNybGkAnwEEc3ViaQCgAQR4b3JpAKEBBGpuZWkAogECbGIAowECbHcApAECc2IApQECc3cApgEEbWNwaQCnARJndGZfbmV3X3R5cGVzY3JpcHQAwwEDZ3RmAKgBBG1jbGkAIBFnbV9uZXdfdHlwZXNjcmlwdAA2CGdtX2ltbTE4AAkCZ20AIQRtb3ZpACIEam56aQAjBGptcGYAJBNqbXBiX25ld190eXBlc2NyaXB0ABgEam1wYgAlBGpuemYAqQEEam56YgCqAQRqbmVmAGYKam5lYl9pbW0wNgAXBGpuZWIAZwJqaQBAE2NmZWlfbmV3X3R5cGVzY3JpcHQANwpjZmVpX2ltbTI0ACcEY2ZlaQBBBGNmc2kAQgNjZmUAtQEDY2ZzALYBBHBzaGwAQwRwc2hoAEQEcG9wbABFBHBvcGgARhN3ZGNtX25ld190eXBlc2NyaXB0AMABBHdkY20AaAR3cWNtAGkEd2RvcABqBHdxb3AAawR3ZG1sAGwEd3FtbABtBHdkZHYAbgR3cWR2AG8Ed2RtZABwBHdxbWQAcQR3ZGFtAHIEd3FhbQBzBHdkbW0AdAR3cW1tAHUEZWNhbAB2Fl9fd2JnX2luc3RydWN0aW9uX2ZyZWUAWRRpbnN0cnVjdGlvbl90b19ieXRlcwAKEGluc3RydWN0aW9uX3NpemUA7AERcmVnaWRfbmV3X2NoZWNrZWQAqwEJcmVnaWRfYmFsANsBCnJlZ2lkX2NnYXMA3AEJcmVnaWRfZXJyAN0BCnJlZ2lkX2ZsYWcA3gEIcmVnaWRfZnAA3wEKcmVnaWRfZ2dhcwDgAQhyZWdpZF9ocADhAQhyZWdpZF9pcwDiAQhyZWdpZF9vZgDjAQlyZWdpZF9vbmUA5AEIcmVnaWRfcGMA5QEJcmVnaWRfcmV0AOYBCnJlZ2lkX3JldGwA5wEIcmVnaWRfc3AA6AEJcmVnaWRfc3BwAOkBDnJlZ2lkX3dyaXRhYmxlAOoBCnJlZ2lkX3plcm8A6wEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA0wELcmVnaWRfdG9fdTgA1AETbW92aV9uZXdfdHlwZXNjcmlwdAAYE21jbGlfbmV3X3R5cGVzY3JpcHQAGBNqbnppX25ld190eXBlc2NyaXB0ABgTam1wZl9uZXdfdHlwZXNjcmlwdAAYEm5vdF9uZXdfdHlwZXNjcmlwdAAfE3JldGRfbmV3X3R5cGVzY3JpcHQAHxNtb3ZlX25ld190eXBlc2NyaXB0AB8SbWNsX25ld190eXBlc2NyaXB0AB8TYnVybl9uZXdfdHlwZXNjcmlwdAAfE2Nyb29fbmV3X3R5cGVzY3JpcHQAHxNjc2l6X25ld190eXBlc2NyaXB0AB8TbWludF9uZXdfdHlwZXNjcmlwdAAfE3RpbWVfbmV3X3R5cGVzY3JpcHQAHxJyZXRfbmV3X3R5cGVzY3JpcHQAVxNiaGVpX25ld190eXBlc2NyaXB0AFcRY2JfbmV3X3R5cGVzY3JpcHQAVxNydnJ0X25ld190eXBlc2NyaXB0AFcTZmxhZ19uZXdfdHlwZXNjcmlwdABXEmptcF9uZXdfdHlwZXNjcmlwdABXEmNmZV9uZXdfdHlwZXNjcmlwdABXEmNmc19uZXdfdHlwZXNjcmlwdABXE21sZHZfbmV3X3R5cGVzY3JpcHQATRJtZXFfbmV3X3R5cGVzY3JpcHQATRJjY3BfbmV3X3R5cGVzY3JpcHQATRJsb2dfbmV3X3R5cGVzY3JpcHQATRNsb2dkX25ld190eXBlc2NyaXB0AE0Tc3J3cV9uZXdfdHlwZXNjcmlwdABNE3N3d3FfbmV3X3R5cGVzY3JpcHQATRJ0cm9fbmV3X3R5cGVzY3JpcHQATRJzbW9fbmV3X3R5cGVzY3JpcHQATRNqbmVmX25ld190eXBlc2NyaXB0AE0Td2RtZF9uZXdfdHlwZXNjcmlwdABNE3dxbWRfbmV3X3R5cGVzY3JpcHQATRN3ZGFtX25ld190eXBlc2NyaXB0AE0Td3FhbV9uZXdfdHlwZXNjcmlwdABNE3dkbW1fbmV3X3R5cGVzY3JpcHQATRN3cW1tX25ld190eXBlc2NyaXB0AE0TZWNhbF9uZXdfdHlwZXNjcmlwdABNEmFuZF9uZXdfdHlwZXNjcmlwdABPEmRpdl9uZXdfdHlwZXNjcmlwdABPEWVxX25ld190eXBlc2NyaXB0AE8SZXhwX25ld190eXBlc2NyaXB0AE8RZ3RfbmV3X3R5cGVzY3JpcHQATxFsdF9uZXdfdHlwZXNjcmlwdABPE21sb2dfbmV3X3R5cGVzY3JpcHQATxNtcm9vX25ld190eXBlc2NyaXB0AE8SbW9kX25ld190eXBlc2NyaXB0AE8SbXVsX25ld190eXBlc2NyaXB0AE8Rb3JfbmV3X3R5cGVzY3JpcHQATxJzbGxfbmV3X3R5cGVzY3JpcHQATxJzcmxfbmV3X3R5cGVzY3JpcHQATxJzdWJfbmV3X3R5cGVzY3JpcHQATxJ4b3JfbmV3X3R5cGVzY3JpcHQATxJtY3BfbmV3X3R5cGVzY3JpcHQATxJsZGNfbmV3X3R5cGVzY3JpcHQATxNzY3dxX25ld190eXBlc2NyaXB0AE8Sc3J3X25ld190eXBlc2NyaXB0AE8Sc3d3X25ld190eXBlc2NyaXB0AE8RdHJfbmV3X3R5cGVzY3JpcHQATxNlY2sxX25ld190eXBlc2NyaXB0AE8TZWNyMV9uZXdfdHlwZXNjcmlwdABPE2VkMTlfbmV3X3R5cGVzY3JpcHQATxNrMjU2X25ld190eXBlc2NyaXB0AE8TczI1Nl9uZXdfdHlwZXNjcmlwdABPEmJhbF9uZXdfdHlwZXNjcmlwdABPEmpuZV9uZXdfdHlwZXNjcmlwdABPE2FuZGlfbmV3X3R5cGVzY3JpcHQAUBNkaXZpX25ld190eXBlc2NyaXB0AFATZXhwaV9uZXdfdHlwZXNjcmlwdABQE21vZGlfbmV3X3R5cGVzY3JpcHQAUBNtdWxpX25ld190eXBlc2NyaXB0AFASb3JpX25ld190eXBlc2NyaXB0AFATc2xsaV9uZXdfdHlwZXNjcmlwdABQE3NybGlfbmV3X3R5cGVzY3JpcHQAUBNzdWJpX25ld190eXBlc2NyaXB0AFATeG9yaV9uZXdfdHlwZXNjcmlwdABQE2puZWlfbmV3X3R5cGVzY3JpcHQAUBFsYl9uZXdfdHlwZXNjcmlwdABQEWx3X25ld190eXBlc2NyaXB0AFARc2JfbmV3X3R5cGVzY3JpcHQAUBFzd19uZXdfdHlwZXNjcmlwdABQE21jcGlfbmV3X3R5cGVzY3JpcHQAUBNqbnpmX25ld190eXBlc2NyaXB0AFATam56Yl9uZXdfdHlwZXNjcmlwdABQDndxY21fZnJvbV9hcmdzACYOd3FvcF9mcm9tX2FyZ3MAJh9fX3diZ19zZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzADseX193Ymdfc2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzADseX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzADsRamlfbmV3X3R5cGVzY3JpcHQANxNjZnNpX25ld190eXBlc2NyaXB0ADcTcHNobF9uZXdfdHlwZXNjcmlwdAA3E3BzaGhfbmV3X3R5cGVzY3JpcHQANxNwb3BsX25ld190eXBlc2NyaXB0ADcTcG9waF9uZXdfdHlwZXNjcmlwdAA3E3dxZHZfbmV3X3R5cGVzY3JpcHQAwAEOd3Fkdl9mcm9tX2FyZ3MAvwETd3FvcF9uZXdfdHlwZXNjcmlwdADAARN3ZG9wX25ld190eXBlc2NyaXB0AMABE3dkZHZfbmV3X3R5cGVzY3JpcHQAwAETd3FjbV9uZXdfdHlwZXNjcmlwdADAARN3ZG1sX25ld190eXBlc2NyaXB0AMABDndxbWxfZnJvbV9hcmdzAB4Td3FtbF9uZXdfdHlwZXNjcmlwdADAARBfX3diZ19yZWdpZF9mcmVlANcBEF9fd2JnX2ltbTI0X2ZyZWUA2QEPX193Ymdfc3JsaV9mcmVlALgBDl9fd2JnX21jbF9mcmVlALgBDl9fd2JnX2xkY19mcmVlALgBDV9fd2JnX3N3X2ZyZWUAuAEOX193YmdfbW9kX2ZyZWUAuAEPX193Ymdfc3J3cV9mcmVlALgBD19fd2JnX2ZsYWdfZnJlZQC4AQ5fX3diZ19leHBfZnJlZQC4AQ9fX3diZ19lZDE5X2ZyZWUAuAEPX193YmdfZWNhbF9mcmVlALgBDl9fd2JnX3Ntb19mcmVlALgBD19fd2JnX2RpdmlfZnJlZQC4AQ9fX3diZ19qbmVmX2ZyZWUAuAEPX193Ymdfd2RtbV9mcmVlALgBD19fd2JnX2V4cGlfZnJlZQC4AQ9fX3diZ19taW50X2ZyZWUAuAEPX193YmdfcG9wbF9mcmVlALgBDl9fd2JnX25vdF9mcmVlALgBDV9fd2JnX2VxX2ZyZWUAuAENX193Ymdfc2JfZnJlZQC4AQ9fX3diZ193cW1tX2ZyZWUAuAEPX193YmdfYmhzaF9mcmVlALgBD19fd2JnX21vdmlfZnJlZQC4AQ5fX3diZ19tY3BfZnJlZQC4AQ5fX3diZ19jY3BfZnJlZQC4AQ9fX3diZ193ZG1kX2ZyZWUAuAEOX193YmdfZ3RmX2ZyZWUAuAEOX193YmdfdHJvX2ZyZWUAuAEPX193YmdfbXVsaV9mcmVlALgBDl9fd2JnX29yaV9mcmVlALgBD19fd2JnX3dkZHZfZnJlZQC4AQ9fX3diZ19qbXBiX2ZyZWUAuAENX193YmdfbGJfZnJlZQC4AQ9fX3diZ19jcm9vX2ZyZWUAuAEPX193Ymdfd3FhbV9mcmVlALgBD19fd2JnX2puZWJfZnJlZQC4AQdmbGFnX3JhAE4OX193YmdfY2ZlX2ZyZWUAuAEPX193Ymdfd2RvcF9mcmVlALgBD19fd2JnX2NzaXpfZnJlZQC4AQ9fX3diZ19tcm9vX2ZyZWUAuAEPX193Ymdfam56Zl9mcmVlALgBCnBvcGxfaW1tMjQAJw9fX3diZ19jZnNpX2ZyZWUAuAEPX193YmdfYW5kaV9mcmVlALgBD19fd2JnX3RpbWVfZnJlZQC4AQ9fX3diZ19tY2xpX2ZyZWUAuAEKcHNoaF9pbW0yNAAnD19fd2JnX3BzaGhfZnJlZQC4AQ9fX3diZ194b3JpX2ZyZWUAuAEPX193YmdfcmV0ZF9mcmVlALgBD19fd2JnX3dxb3BfZnJlZQC4AQ9fX3diZ19rMjU2X2ZyZWUAuAEPX193Ymdfc3ViaV9mcmVlALgBBnJldF9yYQBODl9fd2JnX3JldF9mcmVlALgBDl9fd2JnX2puZV9mcmVlALgBDl9fd2JnX3N3d19mcmVlALgBD19fd2JnX2xvZ2RfZnJlZQC4AQ5fX3diZ19tZXFfZnJlZQC4AQZjZmVfcmEATg9fX3diZ19iaGVpX2ZyZWUAuAEPX193YmdfbWxkdl9mcmVlALgBDl9fd2JnX2Rpdl9mcmVlALgBD19fd2JnX3dxbWxfZnJlZQC4AQ9fX3diZ19tbG9nX2ZyZWUAuAENX193YmdfdHJfZnJlZQC4AQ9fX3diZ193cWR2X2ZyZWUAuAENX193YmdfbHdfZnJlZQC4AQVjYl9yYQBODV9fd2JnX2NiX2ZyZWUAuAEGam1wX3JhAE4OX193Ymdfam1wX2ZyZWUAuAEOX193YmdfYW5kX2ZyZWUAuAEOX193YmdfbXVsX2ZyZWUAuAEKY2ZzaV9pbW0yNAAnD19fd2JnX2NmZWlfZnJlZQC4AQZjZnNfcmEATg5fX3diZ19jZnNfZnJlZQC4AQ9fX3diZ19idXJuX2ZyZWUAuAEOX193YmdfbG9nX2ZyZWUAuAEPX193YmdfczI1Nl9mcmVlALgBD19fd2JnX21jcGlfZnJlZQC4AQ5fX3diZ19zbGxfZnJlZQC4AQ9fX3diZ19tb3ZlX2ZyZWUAuAENX193YmdfbHRfZnJlZQC4AQpwb3BoX2ltbTI0ACcPX193YmdfcG9waF9mcmVlALgBDV9fd2JnX2d0X2ZyZWUAuAEOX193Ymdfc3ViX2ZyZWUAuAEPX193Ymdfd3FtZF9mcmVlALgBD19fd2JnX21vZGlfZnJlZQC4AQ9fX3diZ19lY3IxX2ZyZWUAuAEPX193Ymdfc2xsaV9mcmVlALgBB2JoZWlfcmEATg9fX3diZ19hbG9jX2ZyZWUAuAENX193YmdfZ21fZnJlZQC4AQ5fX3diZ194b3JfZnJlZQC4AQ5fX3diZ19zcmxfZnJlZQC4AQ5fX3diZ19iYWxfZnJlZQC4AQ9fX3diZ19qbmVpX2ZyZWUAuAEPX193YmdfZWNrMV9mcmVlALgBCnBzaGxfaW1tMjQAJw9fX3diZ19wc2hsX2ZyZWUAuAENX193Ymdfb3JfZnJlZQC4AQ5fX3diZ19zcndfZnJlZQC4AQhqaV9pbW0yNAAnDV9fd2JnX2ppX2ZyZWUAuAEPX193Ymdfd3FjbV9mcmVlALgBD19fd2JnX2FkZGlfZnJlZQC4AR5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9saHMAOg9fX3diZ19zY3dxX2ZyZWUAuAEHcnZydF9yYQBOD19fd2JnX3J2cnRfZnJlZQC4AQ9fX3diZ19zd3dxX2ZyZWUAuAEPX193Ymdfam56Yl9mcmVlALgBH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAOg9fX3diZ193ZGNtX2ZyZWUAuAEPX193Ymdfd2RtbF9mcmVlALgBD19fd2JnX2ptcGZfZnJlZQC4AQ9fX3diZ193ZGFtX2ZyZWUAuAEPX193Ymdfam56aV9mcmVlALgBD19fd2JnX2NhbGxfZnJlZQC4ARNqbmViX25ld190eXBlc2NyaXB0AE0Kd3Fkdl9pbW0wNgAXCndxbWxfaW1tMDYAFwp3ZG1sX2ltbTA2ABcKd3FvcF9pbW0wNgAXCndkb3BfaW1tMDYAFwp3cWNtX2ltbTA2ABcKd2Rkdl9pbW0wNgAXCndkY21faW1tMDYAFwpqbmVmX2ltbTA2ABcHc3JsaV9yYgALB3NybGlfcmEAFgZtY2xfcmIACwZtY2xfcmEAFgZsZGNfcmMADwZsZGNfcmIACwZsZGNfcmEAFgZtb2RfcmMADwZtb2RfcmIACwZtb2RfcmEAFgdzcndxX3JjAA8Hc3J3cV9yYgALB3Nyd3FfcmEAFgZleHBfcmMADwZleHBfcmIACwZleHBfcmEAFgdlZDE5X3JjAA8HZWQxOV9yYgALB2VkMTlfcmEAFgdzcndxX3JkABcHZWNhbF9yYwAPB2VjYWxfcmIACwdlY2FsX3JhABYGc21vX3JkABcGc21vX3JjAA8Gc21vX3JiAAsGc21vX3JhABYKc3JsaV9pbW0xMgAMB2RpdmlfcmIACwdkaXZpX3JhABYHam5lZl9yYwAPB2puZWZfcmIACwdqbmVmX3JhABYHd2RtbV9yZAAXB3dkbW1fcmMADwd3ZG1tX3JiAAsHd2RtbV9yYQAWCmV4cGlfaW1tMTIADAdleHBpX3JiAAsHZXhwaV9yYQAWB21pbnRfcmIACwdtaW50X3JhABYGbm90X3JiAAsGbm90X3JhABYIc3dfaW1tMTIADAVzd19yYgALBXN3X3JhABYIc2JfaW1tMTIADAVzYl9yYgALBXNiX3JhABYHd3FtbV9yZAAXB3dxbW1fcmMADwd3cW1tX3JiAAsHd3FtbV9yYQAWB2Joc2hfcmIACwdiaHNoX3JhABYHbW92aV9yYQAWBm1jcF9yYwAPBm1jcF9yYgALBm1jcF9yYQAWB2VjYWxfcmQAFwZjY3BfcmMADwZjY3BfcmIACwZjY3BfcmEAFgd3ZG1kX3JkABcHd2RtZF9yYwAPB3dkbWRfcmIACwd3ZG1kX3JhABYJZ3RmX2ltbTEyAAwGZ3RmX3JiAAsGZ3RmX3JhABYGdHJvX3JkABcGdHJvX3JjAA8GdHJvX3JiAAsGdHJvX3JhABYKbXVsaV9pbW0xMgAMB211bGlfcmIACwdtdWxpX3JhABYJb3JpX2ltbTEyAAwGb3JpX3JiAAsGb3JpX3JhABYHd2Rkdl9yYwAPB3dkZHZfcmIACwd3ZGR2X3JhABYKbW92aV9pbW0xOAAJB2ptcGJfcmEAFghsYl9pbW0xMgAMBWxiX3JiAAsFbGJfcmEAFgdjcm9vX3JiAAsHY3Jvb19yYQAWB3dxYW1fcmQAFwd3cWFtX3JjAA8Hd3FhbV9yYgALB3dxYW1fcmEAFgdqbmViX3JjAA8Ham5lYl9yYgALB2puZWJfcmEAFgd3ZG9wX3JjAA8Hd2RvcF9yYgALB3dkb3BfcmEAFgdjc2l6X3JiAAsHY3Npel9yYQAWB21yb29fcmMADwdtcm9vX3JiAAsHbXJvb19yYQAWCmpuemZfaW1tMTIADAdqbnpmX3JiAAsHam56Zl9yYQAWCmRpdmlfaW1tMTIADAdhbmRpX3JiAAsHYW5kaV9yYQAWB3RpbWVfcmIACwd0aW1lX3JhABYKbWNsaV9pbW0xOAAJB21jbGlfcmEAFgp4b3JpX2ltbTEyAAwHeG9yaV9yYgALB3hvcmlfcmEAFgdyZXRkX3JiAAsHcmV0ZF9yYQAWB3dxb3BfcmMADwd3cW9wX3JiAAsHd3FvcF9yYQAWB2syNTZfcmMADwdrMjU2X3JiAAsHazI1Nl9yYQAWCnN1YmlfaW1tMTIADAdzdWJpX3JiAAsHc3ViaV9yYQAWBmpuZV9yYwAPBmpuZV9yYgALBmpuZV9yYQAWBnN3d19yYwAPBnN3d19yYgALBnN3d19yYQAWB2xvZ2RfcmQAFwdsb2dkX3JjAA8HbG9nZF9yYgALB2xvZ2RfcmEAFgZtZXFfcmQAFwZtZXFfcmMADwZtZXFfcmIACwZtZXFfcmEAFgdtbGR2X3JkABcHbWxkdl9yYwAPB21sZHZfcmIACwdtbGR2X3JhABYGZGl2X3JjAA8GZGl2X3JiAAsGZGl2X3JhABYHd3FtbF9yYwAPB3dxbWxfcmIACwd3cW1sX3JhABYHbWxvZ19yYwAPB21sb2dfcmIACwdtbG9nX3JhABYFdHJfcmMADwV0cl9yYgALBXRyX3JhABYHd3Fkdl9yYwAPB3dxZHZfcmIACwd3cWR2X3JhABYIbHdfaW1tMTIADAVsd19yYgALBWx3X3JhABYKYW5kaV9pbW0xMgAMBmFuZF9yYgALBmFuZF9yYQAWBm11bF9yYwAPBm11bF9yYgALBm11bF9yYQAWB2J1cm5fcmIACwdidXJuX3JhABYGbG9nX3JkABcGbG9nX3JjAA8GbG9nX3JiAAsGbG9nX3JhABYHczI1Nl9yYwAPB3MyNTZfcmIACwdzMjU2X3JhABYFZXFfcmMADwVlcV9yYgALBWVxX3JhABYKbWNwaV9pbW0xMgAMB21jcGlfcmIACwdtY3BpX3JhABYGc2xsX3JjAA8Gc2xsX3JiAAsGc2xsX3JhABYHbW92ZV9yYgALB21vdmVfcmEAFgVsdF9yYwAPBWx0X3JiAAsFbHRfcmEAFgVndF9yYwAPBWd0X3JiAAsFZ3RfcmEAFgZzdWJfcmMADwZzdWJfcmIACwZzdWJfcmEAFgd3cW1kX3JkABcHd3FtZF9yYwAPB3dxbWRfcmIACwd3cW1kX3JhABYKbW9kaV9pbW0xMgAMB21vZGlfcmIACwdtb2RpX3JhABYHZWNyMV9yYwAPB2VjcjFfcmIACwdlY3IxX3JhABYKc2xsaV9pbW0xMgAMB3NsbGlfcmIACwdzbGxpX3JhABYKam1wYl9pbW0xOAAJBWdtX3JhABYGeG9yX3JjAA8GeG9yX3JiAAsGeG9yX3JhABYGc3JsX3JjAA8Gc3JsX3JiAAsGc3JsX3JhABYGYmFsX3JjAA8GYmFsX3JiAAsGYmFsX3JhABYKam5laV9pbW0xMgAMB2puZWlfcmIACwdqbmVpX3JhABYHZWNrMV9yYwAPB2VjazFfcmIACwdlY2sxX3JhABYFb3JfcmMADwVvcl9yYgALBW9yX3JhABYGc3J3X3JjAA8Gc3J3X3JiAAsGc3J3X3JhABYHd3FjbV9yYwAPB3dxY21fcmIACwd3cWNtX3JhABYGYW5kX3JjAA8HYWRkaV9yYgALB2FkZGlfcmEAFgdzY3dxX3JjAA8Hc2N3cV9yYgALB3Njd3FfcmEAFgdzd3dxX3JkABcHc3d3cV9yYwAPB3N3d3FfcmIACwdzd3dxX3JhABYKam56Yl9pbW0xMgAMB2puemJfcmIACwdqbnpiX3JhABYTX193YmdfbWF0aGFyZ3NfZnJlZQB3B3dkY21fcmMADwd3ZGNtX3JiAAsHd2RjbV9yYQAWB3dkbWxfcmMADwd3ZG1sX3JiAAsHd2RtbF9yYQAWCmptcGZfaW1tMTgACQdqbXBmX3JhABYHd2RhbV9yZAAXB3dkYW1fcmMADwd3ZGFtX3JiAAsHd2RhbV9yYQAWCmpuemlfaW1tMTgACQdqbnppX3JhABYGY2NwX3JkABcHY2FsbF9yYwAPB2NhbGxfcmIACwdjYWxsX3JhABYbX193YmdfcGFuaWNpbnN0cnVjdGlvbl9mcmVlALgBH19fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIAzAETX193YmluZGdlbl9leHBvcnRfMADLAQkRAQBBAQsGAs8B0AHRAe0BygEK1oEB+QGJIwIIfwF+AkACQAJAAkACQAJAAkACQCAAQfUBTwRAIABBzf97Tw0FIABBC2oiAEF4cSEFQfiMwAAoAgAiCEUNBEEAIAVrIQQCf0EAIAVBgAJJDQAaQR8gBUH///8HSw0AGiAFQQYgAEEIdmciAGt2QQFxIABBAXRrQT5qCyIHQQJ0QdyJwABqKAIAIgFFBEBBACEADAILQQAhACAFQRkgB0EBdmtBACAHQR9HG3QhAwNAAkAgASgCBEF4cSIGIAVJDQAgBiAFayIGIARPDQAgASECIAYiBA0AQQAhBCABIQAMBAsgAUEUaigCACIGIAAgBiABIANBHXZBBHFqQRBqKAIAIgFHGyAAIAYbIQAgA0EBdCEDIAENAAsMAQtB9IzAACgCACICQRAgAEELakF4cSAAQQtJGyIFQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAUEDdCIAQeyKwABqIgMgAEH0isAAaigCACIAKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiABd3E2AgALIAAgAUEDdCIBQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAgLIAVB/IzAACgCAE0NAwJAAkAgAUUEQEH4jMAAKAIAIgBFDQYgAGhBAnRB3InAAGooAgAiASgCBEF4cSAFayEEIAEhAgNAAkAgASgCECIADQAgAUEUaigCACIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACQRRqIgAoAgAiAxtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAAgAkEQaiADGyEDA0AgAyEGIAEiAEEUaiIBIABBEGogASgCACIBGyEDIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNBCACIAIoAhxBAnRB3InAAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0FDAQLIAEgADYCACAADQNB+IzAAEH4jMAAKAIAQX4gAigCHHdxNgIADAQLIAAoAgRBeHEgBWsiASAEIAEgBEkiARshBCAAIAIgARshAiAAIQEMAAsACwJAQQIgAHQiA0EAIANrciABIAB0cWgiAEEDdCIBQeyKwABqIgMgAUH0isAAaigCACIBKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiAAd3E2AgALIAEgBUEDcjYCBCABIAVqIgYgAEEDdCIAIAVrIgRBAXI2AgQgACABaiAENgIAQfyMwAAoAgAiAgRAIAJBeHFB7IrAAGohAEGEjcAAKAIAIQMCf0H0jMAAKAIAIgVBASACQQN2dCICcUUEQEH0jMAAIAIgBXI2AgAgAAwBCyAAKAIICyECIAAgAzYCCCACIAM2AgwgAyAANgIMIAMgAjYCCAtBhI3AACAGNgIAQfyMwAAgBDYCACABQQhqDwsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAJBFGooAgAiAUUNACAAQRRqIAE2AgAgASAANgIYCwJAAkAgBEEQTwRAIAIgBUEDcjYCBCACIAVqIgUgBEEBcjYCBCAEIAVqIAQ2AgBB/IzAACgCACIDRQ0BIANBeHFB7IrAAGohAEGEjcAAKAIAIQECf0H0jMAAKAIAIgZBASADQQN2dCIDcUUEQEH0jMAAIAMgBnI2AgAgAAwBCyAAKAIICyEDIAAgATYCCCADIAE2AgwgASAANgIMIAEgAzYCCAwBCyACIAQgBWoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBC0GEjcAAIAU2AgBB/IzAACAENgIACyACQQhqDwsgACACckUEQEEAIQJBAiAHdCIAQQAgAGtyIAhxIgBFDQMgAGhBAnRB3InAAGooAgAhAAsgAEUNAQsDQCAAIAIgACgCBEF4cSIDIAVrIgYgBEkiBxshCCAAKAIQIgFFBEAgAEEUaigCACEBCyACIAggAyAFSSIAGyECIAQgBiAEIAcbIAAbIQQgASIADQALCyACRQ0AIAVB/IzAACgCACIATSAEIAAgBWtPcQ0AIAIoAhghBwJAAkAgAiACKAIMIgBGBEAgAkEUQRAgAkEUaiIAKAIAIgMbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyAAIAJBEGogAxshAwNAIAMhBiABIgBBFGoiASAAQRBqIAEoAgAiARshAyAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQMgAiACKAIcQQJ0QdyJwABqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNBAwDCyABIAA2AgAgAA0CQfiMwABB+IzAACgCAEF+IAIoAhx3cTYCAAwDCwJAAkACQAJAAkAgBUH8jMAAKAIAIgFLBEAgBUGAjcAAKAIAIgBPBEBBACEEIAVBr4AEaiIAQRB2QAAiAUF/RiIDDQcgAUEQdCICRQ0HQYyNwABBACAAQYCAfHEgAxsiBEGMjcAAKAIAaiIANgIAQZCNwABBkI3AACgCACIBIAAgACABSRs2AgACQAJAQYiNwAAoAgAiAwRAQdyKwAAhAANAIAAoAgAiASAAKAIEIgZqIAJGDQIgACgCCCIADQALDAILQZiNwAAoAgAiAEEAIAAgAk0bRQRAQZiNwAAgAjYCAAtBnI3AAEH/HzYCAEHgisAAIAQ2AgBB3IrAACACNgIAQfiKwABB7IrAADYCAEGAi8AAQfSKwAA2AgBB9IrAAEHsisAANgIAQYiLwABB/IrAADYCAEH8isAAQfSKwAA2AgBBkIvAAEGEi8AANgIAQYSLwABB/IrAADYCAEGYi8AAQYyLwAA2AgBBjIvAAEGEi8AANgIAQaCLwABBlIvAADYCAEGUi8AAQYyLwAA2AgBBqIvAAEGci8AANgIAQZyLwABBlIvAADYCAEGwi8AAQaSLwAA2AgBBpIvAAEGci8AANgIAQeiKwABBADYCAEG4i8AAQayLwAA2AgBBrIvAAEGki8AANgIAQbSLwABBrIvAADYCAEHAi8AAQbSLwAA2AgBBvIvAAEG0i8AANgIAQciLwABBvIvAADYCAEHEi8AAQbyLwAA2AgBB0IvAAEHEi8AANgIAQcyLwABBxIvAADYCAEHYi8AAQcyLwAA2AgBB1IvAAEHMi8AANgIAQeCLwABB1IvAADYCAEHci8AAQdSLwAA2AgBB6IvAAEHci8AANgIAQeSLwABB3IvAADYCAEHwi8AAQeSLwAA2AgBB7IvAAEHki8AANgIAQfiLwABB7IvAADYCAEGAjMAAQfSLwAA2AgBB9IvAAEHsi8AANgIAQYiMwABB/IvAADYCAEH8i8AAQfSLwAA2AgBBkIzAAEGEjMAANgIAQYSMwABB/IvAADYCAEGYjMAAQYyMwAA2AgBBjIzAAEGEjMAANgIAQaCMwABBlIzAADYCAEGUjMAAQYyMwAA2AgBBqIzAAEGcjMAANgIAQZyMwABBlIzAADYCAEGwjMAAQaSMwAA2AgBBpIzAAEGcjMAANgIAQbiMwABBrIzAADYCAEGsjMAAQaSMwAA2AgBBwIzAAEG0jMAANgIAQbSMwABBrIzAADYCAEHIjMAAQbyMwAA2AgBBvIzAAEG0jMAANgIAQdCMwABBxIzAADYCAEHEjMAAQbyMwAA2AgBB2IzAAEHMjMAANgIAQcyMwABBxIzAADYCAEHgjMAAQdSMwAA2AgBB1IzAAEHMjMAANgIAQeiMwABB3IzAADYCAEHcjMAAQdSMwAA2AgBB8IzAAEHkjMAANgIAQeSMwABB3IzAADYCAEGIjcAAIAI2AgBB7IzAAEHkjMAANgIAQYCNwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBlI3AAEGAgIABNgIADAgLIAIgA00gASADS3INACAAKAIMRQ0DC0GYjcAAQZiNwAAoAgAiACACIAAgAkkbNgIAIAIgBGohAUHcisAAIQACQAJAA0AgASAAKAIARwRAIAAoAggiAA0BDAILCyAAKAIMRQ0BC0HcisAAIQADQAJAIAMgACgCACIBTwRAIAEgACgCBGoiBiADSw0BCyAAKAIIIQAMAQsLQYiNwAAgAjYCAEGAjcAAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQZSNwABBgICAATYCACADIAZBIGtBeHFBCGsiACAAIANBEGpJGyIBQRs2AgRB3IrAACkCACEJIAFBEGpB5IrAACkCADcCACABIAk3AghB4IrAACAENgIAQdyKwAAgAjYCAEHkisAAIAFBCGo2AgBB6IrAAEEANgIAIAFBHGohAANAIABBBzYCACAAQQRqIgAgBkkNAAsgASADRg0HIAEgASgCBEF+cTYCBCADIAEgA2siAEEBcjYCBCABIAA2AgAgAEGAAk8EQCADIAAQCAwICyAAQXhxQeyKwABqIQECf0H0jMAAKAIAIgJBASAAQQN2dCIAcUUEQEH0jMAAIAAgAnI2AgAgAQwBCyABKAIICyEAIAEgAzYCCCAAIAM2AgwgAyABNgIMIAMgADYCCAwHCyAAIAI2AgAgACAAKAIEIARqNgIEIAIgBUEDcjYCBCABIAIgBWoiA2shBSABQYiNwAAoAgBGDQMgAUGEjcAAKAIARg0EIAEoAgQiBEEDcUEBRgRAIAEgBEF4cSIAEAcgACAFaiEFIAAgAWoiASgCBCEECyABIARBfnE2AgQgAyAFQQFyNgIEIAMgBWogBTYCACAFQYACTwRAIAMgBRAIDAYLIAVBeHFB7IrAAGohAAJ/QfSMwAAoAgAiAUEBIAVBA3Z0IgRxRQRAQfSMwAAgASAEcjYCACAADAELIAAoAggLIQUgACADNgIIIAUgAzYCDCADIAA2AgwgAyAFNgIIDAULQYCNwAAgACAFayIBNgIAQYiNwABBiI3AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBCAAQQhqIQQMBgtBhI3AACgCACEAAkAgASAFayICQQ9NBEBBhI3AAEEANgIAQfyMwABBADYCACAAIAFBA3I2AgQgACABaiIBIAEoAgRBAXI2AgQMAQtB/IzAACACNgIAQYSNwAAgACAFaiIDNgIAIAMgAkEBcjYCBCAAIAFqIAI2AgAgACAFQQNyNgIECwwICyAAIAQgBmo2AgRBiI3AAEGIjcAAKAIAIgBBD2pBeHEiAUEIayICNgIAQYCNwABBgI3AACgCACAEaiIDIAAgAWtqQQhqIgE2AgAgAiABQQFyNgIEIAAgA2pBKDYCBEGUjcAAQYCAgAE2AgAMAwtBiI3AACADNgIAQYCNwABBgI3AACgCACAFaiIANgIAIAMgAEEBcjYCBAwBC0GEjcAAIAM2AgBB/IzAAEH8jMAAKAIAIAVqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAAsgAkEIag8LQQAhBEGAjcAAKAIAIgAgBU0NAEGAjcAAIAAgBWsiATYCAEGIjcAAQYiNwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQMAwsgBA8LIAAgBzYCGCACKAIQIgEEQCAAIAE2AhAgASAANgIYCyACQRRqKAIAIgFFDQAgAEEUaiABNgIAIAEgADYCGAsCQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiASAEQQFyNgIEIAEgBGogBDYCACAEQYACTwRAIAEgBBAIDAILIARBeHFB7IrAAGohAAJ/QfSMwAAoAgAiA0EBIARBA3Z0IgRxRQRAQfSMwAAgAyAEcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIECyACQQhqDwsgAEEIagvtCwELfyAAKAIEIQcgACgCACEFAkACQAJAIAEoAgAiCiABKAIIIgByBEACQCAARQ0AIAUgB2ohCSABQQxqKAIAQQFqIQYgBSECA0ACQCACIQAgBkEBayIGRQ0AIAAgCUYNAgJ/IAAsAAAiBEEATgRAIARB/wFxIQQgAEEBagwBCyAALQABQT9xIQggBEEfcSECIARBX00EQCACQQZ0IAhyIQQgAEECagwBCyAALQACQT9xIAhBBnRyIQggBEFwSQRAIAggAkEMdHIhBCAAQQNqDAELIAJBEnRBgIDwAHEgAC0AA0E/cSAIQQZ0cnIiBEGAgMQARg0DIABBBGoLIgIgAyAAa2ohAyAEQYCAxABHDQEMAgsLIAAgCUYNACAALAAAIgJBAE4gAkFgSXIgAkFwSXJFBEAgAkH/AXFBEnRBgIDwAHEgAC0AA0E/cSAALQACQT9xQQZ0IAAtAAFBP3FBDHRycnJBgIDEAEYNAQsCQAJAIANFDQAgAyAHTwRAQQAhACADIAdGDQEMAgtBACEAIAMgBWosAABBQEgNAQsgBSEACyADIAcgABshByAAIAUgABshBQsgCkUNAyABKAIEIQsgB0EQTwRAIAcgBSAFQQNqQXxxIgRrIgZqIgpBA3EhCEEAIQlBACEAIAQgBUcEQCAEIAVBf3NqQQNPBEBBACEDA0AgACADIAVqIgIsAABBv39KaiACQQFqLAAAQb9/SmogAkECaiwAAEG/f0pqIAJBA2osAABBv39KaiEAIANBBGoiAw0ACwsgBSECA0AgACACLAAAQb9/SmohACACQQFqIQIgBkEBaiIGDQALCwJAIAhFDQAgBCAKQXxxaiICLAAAQb9/SiEJIAhBAUYNACAJIAIsAAFBv39KaiEJIAhBAkYNACAJIAIsAAJBv39KaiEJCyAKQQJ2IQggACAJaiEDA0AgBCEGIAhFDQRBwAEgCCAIQcABTxsiCUEDcSEKIAlBAnQhBEEAIQIgCUEETwRAIAYgBEHwB3FqIQwgBiEAA0AgAiAAKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIABBBGooAgAiAkF/c0EHdiACQQZ2ckGBgoQIcWogAEEIaigCACICQX9zQQd2IAJBBnZyQYGChAhxaiAAQQxqKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIQIgAEEQaiIAIAxHDQALCyAIIAlrIQggBCAGaiEEIAJBCHZB/4H8B3EgAkH/gfwHcWpBgYAEbEEQdiADaiEDIApFDQALIAYgCUH8AXFBAnRqIgIoAgAiAEF/c0EHdiAAQQZ2ckGBgoQIcSEAIApBAUYNAiAAIAIoAgQiAEF/c0EHdiAAQQZ2ckGBgoQIcWohACAKQQJGDQIgACACKAIIIgBBf3NBB3YgAEEGdnJBgYKECHFqIQAMAgsgB0UEQEEAIQMMAwsgB0EDcSECAkAgB0EESQRAQQAhA0EAIQYMAQtBACEDIAUhACAHQXxxIgYhBANAIAMgACwAAEG/f0pqIABBAWosAABBv39KaiAAQQJqLAAAQb9/SmogAEEDaiwAAEG/f0pqIQMgAEEEaiEAIARBBGsiBA0ACwsgAkUNAiAFIAZqIQADQCADIAAsAABBv39KaiEDIABBAWohACACQQFrIgINAAsMAgsMAgsgAEEIdkH/gRxxIABB/4H8B3FqQYGABGxBEHYgA2ohAwsCQCADIAtJBEAgCyADayEDQQAhAAJAAkACQCABLQAgQQFrDgIAAQILIAMhAEEAIQMMAQsgA0EBdiEAIANBAWpBAXYhAwsgAEEBaiEAIAFBGGooAgAhAiABKAIQIQYgASgCFCEBA0AgAEEBayIARQ0CIAEgBiACKAIQEQMARQ0AC0EBDwsMAQtBASEAIAEgBSAHIAIoAgwRAAAEf0EBBUEAIQACfwNAIAMgACADRg0BGiAAQQFqIQAgASAGIAIoAhARAwBFDQALIABBAWsLIANJCw8LIAEoAhQgBSAHIAFBGGooAgAoAgwRAAALpgYCDX8BfiMAQTBrIgckAEEnIQICQCAAQpDOAFQEQCAAIQ8MAQsDQCAHQQlqIAJqIgZBBGsgAEKQzgCAIg9C8LEDfiAAfKciBEH//wNxQeQAbiIDQQF0QciGwABqLwAAOwAAIAZBAmsgA0Gcf2wgBGpB//8DcUEBdEHIhsAAai8AADsAACACQQRrIQIgAEL/wdcvViAPIQANAAsLIA+nIgRB4wBLBEAgAkECayICIAdBCWpqIA+nIgNB//8DcUHkAG4iBEGcf2wgA2pB//8DcUEBdEHIhsAAai8AADsAAAsCQCAEQQpPBEAgAkECayICIAdBCWpqIARBAXRByIbAAGovAAA7AAAMAQsgAkEBayICIAdBCWpqIARBMGo6AAALQScgAmshCEEBIQVBK0GAgMQAIAEoAhwiBEEBcSIMGyEJIARBHXRBH3VB6IjAAHEhCiAHQQlqIAJqIQsCQCABKAIARQRAIAEoAhQiAyABKAIYIgEgCSAKEEcNASADIAsgCCABKAIMEQAAIQUMAQsgASgCBCINIAggDGoiA00EQCABKAIUIgMgASgCGCIBIAkgChBHDQEgAyALIAggASgCDBEAACEFDAELIARBCHEEQCABKAIQIQQgAUEwNgIQIAEtACAhAyABQQE6ACAgASgCFCIOIAEoAhgiBiAJIAoQRw0BIAIgDWogDGtBJmshAgNAIAJBAWsiAgRAIA5BMCAGKAIQEQMARQ0BDAMLCyAOIAsgCCAGKAIMEQAADQEgASADOgAgIAEgBDYCEEEAIQUMAQsgDSADayEDAkACQAJAIAEtACAiAkEBaw4DAAEAAgsgAyECQQAhAwwBCyADQQF2IQIgA0EBakEBdiEDCyACQQFqIQIgAUEYaigCACEGIAEoAhAhBCABKAIUIQECQANAIAJBAWsiAkUNASABIAQgBigCEBEDAEUNAAsMAQsgASAGIAkgChBHDQAgASALIAggBigCDBEAAA0AQQAhAgNAIAIgA0YEQEEAIQUMAgsgAkEBaiECIAEgBCAGKAIQEQMARQ0ACyACQQFrIANJIQULIAdBMGokACAFC/wFAQV/IABBCGsiASAAQQRrKAIAIgNBeHEiAGohAgJAAkACQAJAIANBAXENACADQQNxRQ0BIAEoAgAiAyAAaiEAIAEgA2siAUGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAA2AgAgAiACKAIEQX5xNgIEIAEgAEEBcjYCBCACIAA2AgAPCyABIAMQBwsCQAJAIAIoAgQiA0ECcUUEQCACQYiNwAAoAgBGDQIgAkGEjcAAKAIARg0FIAIgA0F4cSICEAcgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFBhI3AACgCAEcNAUH8jMAAIAA2AgAPCyACIANBfnE2AgQgASAAQQFyNgIEIAAgAWogADYCAAsgAEGAAkkNAiABIAAQCEEAIQFBnI3AAEGcjcAAKAIAQQFrIgA2AgAgAA0BQeSKwAAoAgAiAARAA0AgAUEBaiEBIAAoAggiAA0ACwtBnI3AAEH/HyABIAFB/x9NGzYCAA8LQYiNwAAgATYCAEGAjcAAQYCNwAAoAgAgAGoiADYCACABIABBAXI2AgRBhI3AACgCACABRgRAQfyMwABBADYCAEGEjcAAQQA2AgALIABBlI3AACgCACIDTQ0AQYiNwAAoAgAiAkUNAEEAIQECQEGAjcAAKAIAIgRBKUkNAEHcisAAIQADQCACIAAoAgAiBU8EQCAFIAAoAgRqIAJLDQILIAAoAggiAA0ACwtB5IrAACgCACIABEADQCABQQFqIQEgACgCCCIADQALC0GcjcAAQf8fIAEgAUH/H00bNgIAIAMgBE8NAEGUjcAAQX82AgALDwsgAEF4cUHsisAAaiECAn9B9IzAACgCACIDQQEgAEEDdnQiAHFFBEBB9IzAACAAIANyNgIAIAIMAQsgAigCCAshACACIAE2AgggACABNgIMIAEgAjYCDCABIAA2AggPC0GEjcAAIAE2AgBB/IzAAEH8jMAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAuBBQEBfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQYAEaw4mAQIDBAUGBwgsCQoLDA0sLCwsLCwsLCwsLCwsLCwsLCwODywsLBAAC0EBIQECQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEEBaw4OQgECAwQFBgcICQoLDA0ACwJAIABBwARrDgwoKSorLC0uLzAxMjMACwJAIABBgQJrDgoODxAREhMUFRYXAAsCQCAAQYAGaw4JNDU2NzhDQzk6AAsCQCAAQYAKaw4FPT4/QEEACyAAQYAIaw4COjtCC0ECDwtBAw8LQQQPC0EFDwtBBg8LQQcPC0EIDwtBCQ8LQQoPC0ELDwtBDA8LQQ0PC0EODwtBgQIPC0GCAg8LQYMCDwtBhAIPC0GFAg8LQYYCDwtBhwIPC0GIAg8LQYkCDwtBigIPC0GABA8LQYEEDwtBggQPC0GDBA8LQYQEDwtBhQQPC0GGBA8LQYcEDwtBiQQPC0GKBA8LQYsEDwtBjAQPC0GNBA8LQaAEDwtBoQQPC0GlBA8LQcAEDwtBwQQPC0HCBA8LQcMEDwtBxAQPC0HFBA8LQcYEDwtBxwQPC0HIBA8LQckEDwtBygQPC0HLBA8LQYAGDwtBgQYPC0GCBg8LQYMGDwtBhAYPC0GHBg8LQYgGDwtBgAgPC0GBCA8LQYAKDwtBgQoPC0GCCg8LQYMKDwtBhAohAQsgAQ8LQeCCwABBGRDSAQAL+AMBAn8gACABaiECAkACQCAAKAIEIgNBAXENACADQQNxRQ0BIAAoAgAiAyABaiEBIAAgA2siAEGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAE2AgAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCACIAE2AgAPCyAAIAMQBwsCQAJAAkAgAigCBCIDQQJxRQRAIAJBiI3AACgCAEYNAiACQYSNwAAoAgBGDQMgAiADQXhxIgIQByAAIAEgAmoiAUEBcjYCBCAAIAFqIAE2AgAgAEGEjcAAKAIARw0BQfyMwAAgATYCAA8LIAIgA0F+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACyABQYACTwRAIAAgARAIDAMLIAFBeHFB7IrAAGohAgJ/QfSMwAAoAgAiA0EBIAFBA3Z0IgFxRQRAQfSMwAAgASADcjYCACACDAELIAIoAggLIQEgAiAANgIIIAEgADYCDCAAIAI2AgwgACABNgIIDwtBiI3AACAANgIAQYCNwABBgI3AACgCACABaiIBNgIAIAAgAUEBcjYCBCAAQYSNwAAoAgBHDQFB/IzAAEEANgIAQYSNwABBADYCAA8LQYSNwAAgADYCAEH8jMAAQfyMwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgACABaiABNgIACwv7AgEEfyAAKAIMIQICQAJAIAFBgAJPBEAgACgCGCEDAkACQCAAIAJGBEAgAEEUQRAgAEEUaiICKAIAIgQbaigCACIBDQFBACECDAILIAAoAggiASACNgIMIAIgATYCCAwBCyACIABBEGogBBshBANAIAQhBSABIgJBFGoiASACQRBqIAEoAgAiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QdyJwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQfiMwABB+IzAACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB9IzAAEH0jMAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIABBFGooAgAiAEUNACACQRRqIAA2AgAgACACNgIYCwusAgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QdyJwABqIQQCQEH4jMAAKAIAIgVBASACdCIDcUUEQEH4jMAAIAMgBXI2AgAgBCAANgIAIAAgBDYCGAwBCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEEA0AgAyAEQR12QQRxakEQaiIFKAIAIgJFDQIgBEEBdCEEIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAFIAA2AgAgACADNgIYCyAAIAA2AgwgACAANgIIC2kBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYD+A3EgAEEYdnJyELwBIAFBEGokAAt5AQN/IAEQxAECQCABKAIAIgJBf0cEQCABIAJBAWo2AgAgASgCBCgAACIDQRh0QRZ1QfyCwABqKAIAIQRBAUEEEMcBIgJFDQEgAiAEIANBgH5xcjYAACABIAEoAgBBAWs2AgAgAEEENgIEIAAgAjYCAA8LEM4BAAsAC2YBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYDgA3FyQQx2ELsBIAFBEGokAAtuAQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggiAC8AACAAQQJqLQAAQRB0chDVASEAIAEoAgwiAiACKAIAQQFrNgIAQQhBBBC6ASICIABBCHZBgB5xIABBGHZyOwEEIAJBADYCACABQRBqJAAgAgttAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQRxqQgE3AgAgAUECNgIUIAFB9IDAADYCECABQQI2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQSQALIAFBMGokACAAC24BAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQRxqQgE3AgAgAUECNgIUIAFBuIHAADYCECABQQM2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQSQALIAFBMGokACAAC10BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQR52IABBDnZBPHFyELsBIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ8gELFgAgAEHQgsAAQcCCwABBgICACBDyAQtMACADQf8BcSABQf8BcUEMdCAAQf8BcUESdHIiACACQf8BcUEGdHJyIgFBEHRBgID8B3EgAEEIdkGA/gNxIAFBgP4DcUEIdHJBCHZyC1UCAX8BfiMAQRBrIgIkACABEMQBIAJBCGogARBUIAIoAgxBADYCACABKQIAIQMgARAEIAAgA0IoiKdBAXE6AAEgACADQiCIp0EBcToAACACQRBqJAALEAAgACABIAIgA0HiABD0AQsQACAAIAEgAiADQeMAEPQBC08BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDIARC7ASABQRBqJAALVQEDfyMAQRBrIgEkACABQQhqIAAQSiABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENUBQRh2QT9xELsBIAFBEGokAAtSAQF/IAAQUSECIAEQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgACACQf8BcUESdHIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyrUIghjcCACABCxAAIAAgASACIANB3gAQ9QELEAAgACABIAIgA0HfABD1AQsQACAAIAEgAiADQeAAEPUBCxAAIAAgASACIANB4QAQ9QELUQIBfwF+IwBBEGsiAiQAIAEQxAEgAkEIaiABEFQgAigCDEEANgIAIAEpAgAhAyABEAQgACADQiiIPAABIAAgA0IgiKdBAXE6AAAgAkEQaiQACz4BAX8jAEEQayIEJAAgABBRIAEQUSACEFEgBEEIaiADEBMgBC0ACEEBcSAELQAJQQFxEHoQrAEgBEEQaiQAC0kBAX8gABBRIQAgARBRIQFBCEEEELoBIgIgAUH/AXFBDHQgAEESdHIiAEGA4ANxQQh0IABBCHZBgP4DcXJBCHatQiCGNwIAIAILDAAgACABQcsAEPYBCwwAIAAgAUHMABD2AQsMACAAIAFBzQAQ9gELDAAgACABQc4AEPYBCwwAIAAgAUHPABD2AQsMACAAIAFB0AAQ9gELPAEBfyMAQRBrIgQkACAAEFEgARBRIAIQUSAEQQhqIAMQHSAELQAIQQFxIAQtAAkQvgEQrAEgBEEQaiQAC0gAIAAQxAEgACgCAEF/RgRAEM4BAAsgAC8ABCAAQQZqLQAAQRB0chDVASIAQYD+A3FBCHQgAEEIdkGA/gNxIABBGHZychC8AQsLACAAIAFBBxD3AQs/AQJ/AkAgABBRIgBBGHENACAAQQdxIgJBB0YNAEEIQQQQugEiASAAQQV2QQFxrUIghiACrUIohoQ3AgALIAELCwAgACABQQgQ9wELPwAgAkEWdEGAgIAGcSABQf8BcUEMdCIBIAJB/AFxQQZ0ckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCwsAIAAgAUEKEPgBCwsAIAAgAUEMEPgBCwsAIAAgAUEUEPgBCwsAIAAgAUEWEPgBCwsAIAAgAUEZEPgBCwsAIAAgAUEbEPgBCwsAIAAgAUEeEPgBCwsAIAAgAUEfEPgBCwsAIAAgAUEkEPgBCwsAIAAgAUEyEPgBCz8AIAAQUSEAIAEQUyIBQRB0QYCA/AdxIABB/wFxQRJ0IAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2chCsAQtAAQF/IAAQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyrUIghjcCACABCzgAIAJBEHRBgID8B3EgAUH/AXFBDHQiASACckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCzwBAn8jAEEQayIBJAAgABDEASABQQhqIAAQSyABKAIILQABIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAs8AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEEsgASgCCC0AACABKAIMIgIgAigCAEEBazYCACABQRBqJAALOQEBfyMAQRBrIgIkACAAEMQBIAJBCGogABBUIAIoAgwgAigCCCABQQBHOgAAQQA2AgAgAkEQaiQACzkBAX8jAEEQayICJAAgABDEASACQQhqIAAQVCACKAIMIAIoAgggAUEARzoAAUEANgIAIAJBEGokAAs4AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEFQgASgCDEEANgIAIAAtAAQgABAEIAFBEGokAEEBcQs3AQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggtAAQgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzcBAn8jAEEQayIBJAAgAUEIaiAAEEogASgCCCgCACABKAIMIgIgAigCAEEBazYCACABQRBqJAALCgAgAEHVABD5AQsKACAAQdYAEPkBCwoAIABB1wAQ+QELCgAgAEHaABD5AQsKACAAQdsAEPkBCwoAIABB3AAQ+QELCgAgAEHdABD5AQs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAwANARoLIAMNAUEACw8LIAAgA0EAIAEoAgwRAAALMQEBfyMAQRBrIgEkACABQQhqIAAQHSABLQAJIAEtAAhBBXRBIHFyELsBIAFBEGokAAuhAgEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQbiGwAA2AhAgAkHoiMAANgIMIAJBDGoiACgCCCIBRQRAIwBBIGsiACQAIABBDGpCADcCACAAQQE2AgQgAEHoiMAANgIIIABBKzYCHCAAQZCIwAA2AhggACAAQRhqNgIAIABB2IjAABBJAAsgAUEMaigCACECAkACQCABKAIEDgIAAAELIAINAAsgAC0AECEBIAAtABEaQdiJwABB2InAACgCACIAQQFqNgIAAkAgAEEASA0AQaSNwAAtAABBAXENAEGkjcAAQQE6AABBoI3AAEGgjcAAKAIAQQFqNgIAQdSJwAAoAgBBAEgNAEGkjcAAQQA6AAAgAUUNAAALAAs1AQF/IAEQxAEgASgCACICQX9GBEAQzgEACyABIAJBAWo2AgAgACABNgIEIAAgAUEEajYCAAsxAQF/IAEoAgAiAkF/RwRAIAEgAkEBajYCACAAIAE2AgQgACABQQRqNgIADwsQzgEACzUBAX8gAEE2TwRAQeCCwABBGRDSAQALQQxBBBC6ASICIAA6AAggAiABNgIEIAJBADYCACACCzAAIAAQUSABEFEgAhBRIAMQURASIQBBCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQstACAAEMQBIAAoAgBBf0YEQBDOAQALIAAvAAQgAEEGai0AAEEQdHIQyAEQuwELLAAgABBRIAEQUSACEFEQKyEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELLAAgABBRIAEQUSACEFIQOCEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELJQEBfwJAIAAEQCAAKAIADQEgAC0ABCAAEAQPCxDNAQALEM4BAAslAQF/AkAgAARAIAAoAgANASAALwEEIAAQBA8LEM0BAAsQzgEACyUBAX8CQCAABEAgACgCAA0BIAAoAgQgABAEDwsQzQEACxDOAQALKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LEM4BAAspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeQAchDFARC8AQspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeUAchDFARC8AQslAQF/IAAQUSEAQQhBBBC6ASIBIABBAnRB/AFxrUIghjcCACABCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ0gEACyABAX8gABDEASAAKAIABEAQzgEACyAAKAIEIAAQBBAECyMAIAIQBSECIAAQvQEgARC9ASACEDhBCHRBygByEMUBELwBCx4AAkAgAARAIAAoAgANASAAEAQPCxDNAQALEM4BAAsPACAAIAEgAiADQRIQ7gELDwAgACABIAIgA0EYEO4BCw8AIAAgASACIANBHBDuAQsPACAAIAEgAiADQR0Q7gELDwAgACABIAIgA0EiEO4BCw8AIAAgASACIANBIxDuAQsPACAAIAEgAiADQSgQ7gELDwAgACABIAIgA0EqEO4BCw8AIAAgASACIANBLBDuAQsPACAAIAEgAiADQTgQ7gELEAAgACABIAIgA0HTABDvAQsQACAAIAEgAiADQdQAEO8BCxAAIAAgASACIANB3gAQ7wELEAAgACABIAIgA0HfABDvAQsQACAAIAEgAiADQeAAEO8BCxAAIAAgASACIANB4QAQ7wELEAAgACABIAIgA0HiABDvAQsQACAAIAEgAiADQeMAEO8BCxAAIAAgASACIANB5AAQ7wELEAAgACABIAIgA0HlABDvAQsQACAAIAEgAiADQeYAEO4BCxAAIAAgASACIANB5wAQ7gELEAAgACABIAIgA0HoABDuAQsQACAAIAEgAiADQekAEO4BCxAAIAAgASACIANB6gAQ7gELEAAgACABIAIgA0HrABDuAQsQACAAIAEgAiADQewAEO4BCx0BAX8jAEEQayIBJAAgAUEIaiAAEB0gAUEQaiQACx0BAX8jAEEQayIBJAAgAUEIaiAAEBMgAUEQaiQACx8AIAEQWCEBIAAQvQEgARC3AUEIdEHMAHIQxQEQvAELGQAgACABIAJBIEEAIAQbQRBBACADG3IQEgsNACAAIAEgAkEBEPABCw0AIAAgASACQQIQ8AELDQAgACABIAJBAxDwAQsNACAAIAEgAkEEEPABCw0AIAAgASACQQUQ8AELDQAgACABIAJBBhDwAQsNACAAIAEgAkEHEPABCw0AIAAgASACQQgQ8AELDQAgACABIAJBCRDwAQsNACAAIAEgAkELEPABCw0AIAAgASACQQ0Q8AELDQAgACABIAJBDhDwAQsNACAAIAEgAkEPEPABCw0AIAAgASACQRAQ8AELDQAgACABIAJBERDwAQsNACAAIAEgAkEXEPABCw0AIAAgASACQSEQ8AELDQAgACABIAJBJhDwAQsNACAAIAEgAkEnEPABCw0AIAAgASACQSkQ8AELDQAgACABIAJBKxDwAQsNACAAIAEgAkEtEPABCw0AIAAgASACQS4Q8AELDQAgACABIAJBLxDwAQsNACAAIAEgAkEwEPABCw0AIAAgASACQTEQ8AELDQAgACABIAJBNRDwAQsNACAAIAEgAkE3EPABCw0AIAAgASACQTkQ8QELDQAgACABIAJBOhDxAQsNACAAIAEgAkE7EPEBCw0AIAAgASACQTwQ8QELDQAgACABIAJBPRDxAQsNACAAIAEgAkE+EPEBCw0AIAAgASACQT8Q8QELDgAgACABIAJBwAAQ8QELDgAgACABIAJBwQAQ8QELDgAgACABIAJBwgAQ8QELDgAgACABIAJBwwAQ8QELDgAgACABIAJBxAAQ8QELDgAgACABIAJBxQAQ8QELDgAgACABIAJBxgAQ8QELDgAgACABIAJBxwAQ8QELDgAgACABIAJByAAQ8QELDgAgACABIAJByQAQ8QELDgAgACABIAJBygAQ8QELDgAgACABIAJB0QAQ8QELDgAgACABIAJB0gAQ8QELGAEBfyAAQf8BcUE/TQR/IAAQuwEFQQALCx4BAX9BCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQsbACAAEMQBIAAoAgBBf0YEQBDOAQALIAAtAAQLCQAgAEETEPMBCwkAIABBFRDzAQsJACAAQRoQ8wELCQAgAEEgEPMBCwkAIABBJRDzAQsJACAAQTQQ8wELCQAgAEE2EPMBCwoAIABB2AAQ8wELCgAgAEHZABDzAQsXACABQRB0QYCA/AdxIABBAnRB/AFxcgsXACAAEMQBIAAoAgAEQBDOAQALIAAQBAscACAAEL0BIAEQvQEgAhC9ARArQQh0EMUBELwBCxIAIAEgABDHASIABEAgAA8LAAsbAQF/QQhBBBC6ASIBIAA6AAQgAUEANgIAIAELGwEBf0EIQQQQugEiASAANgIEIAFBADYCACABC24AIABB/wFxQcAATwRAIwBBMGsiACQAIABBIjYCDCAAQYCAwAA2AgggAEEcakIBNwIAIABBATYCFCAAQbCGwAA2AhAgAEEBNgIsIAAgAEEoajYCGCAAIABBCGo2AiggAEEQakG4gMAAEEkACyAACxQAIAAgASACQSBBACADGyAEchASCxgAIAAQUSABEFEgAhBRIAMQPRDCARCsAQsXACAAEFEgARBRIAIQUSADEFEQEhCsAQsTACAAEFEgARBRIAIQBRA4EKwBCxEAIAAgASACQSBBACADGxASCxMAIAAQUSABEFEgAhBSEDgQrAELDAAgAARADwsQzQEACxQBAX9BBEEBELoBIgEgADYAACABCxQBAX9BCEEEELoBIgBCADcCACAAC4EDAQV/QaWNwAAtAAAaAn8gAEEJTwRAAkBBzf97QRAgACAAQRBNGyIAayABTQ0AIABBECABQQtqQXhxIAFBC0kbIgRqQQxqEAEiAkUNACACQQhrIQECQCAAQQFrIgMgAnFFBEAgASEADAELIAJBBGsiBSgCACIGQXhxIAIgA2pBACAAa3FBCGsiAiAAQQAgAiABa0EQTRtqIgAgAWsiAmshAyAGQQNxBEAgACADIAAoAgRBAXFyQQJyNgIEIAAgA2oiAyADKAIEQQFyNgIEIAUgAiAFKAIAQQFxckECcjYCACABIAJqIgMgAygCBEEBcjYCBCABIAIQBgwBCyABKAIAIQEgACADNgIEIAAgASACajYCAAsCQCAAKAIEIgFBA3FFDQAgAUF4cSICIARBEGpNDQAgACAEIAFBAXFyQQJyNgIEIAAgBGoiASACIARrIgRBA3I2AgQgACACaiICIAIoAgRBAXI2AgQgASAEEAYLIABBCGohAwsgAwwBCyABEAELCw0AIAAQ1QFBCnZBP3ELEAAgABBRIAEQWBC3ARCsAQsgACAAQsWAsKa9qOHJSzcDCCAAQpXM9oWR7LDtHzcDAAsLACABBEAgABAECwsLACAAIwBqJAAjAAsNAEHoiMAAQRsQ0gEACw4AQYOJwABBzwAQ0gEACwsAIAAxAAAgARADCwsAIAAzAQAgARADCwsAIAA1AgAgARADCwkAIAAgARAAAAsKACAAQT9xELsBCwoAIAAQUUH/AXELBwAgAEEIdAsHACAAED0aCwcAIAAQURoLBwAgABBSGgsHACAAEFMaCwoAQTMQxQEQvAELBwBBCxC7AQsHAEEKELsBCwcAQQgQuwELBwBBDxC7AQsHAEEGELsBCwcAQQkQuwELBwBBBxC7AQsHAEEMELsBCwcAQQIQuwELBwBBARC7AQsHAEEDELsBCwcAQQ0QuwELBwBBDhC7AQsHAEEFELsBCwcAQQQQuwELBwBBEBC7AQsHAEEAELsBCwQAQQQLAgALJAAgABC9ASABEL0BIAIQvQEgAxC9ARASQQh0IARyEMUBELwBCyMAIAAQvQEgARC9ASACEL0BIAMQDRASQQh0IARyEMUBELwBCx8AIAAQvQEgARC9ASACEL0BECtBCHQgA3IQxQEQvAELHgAgABC9ASABEL0BIAIQDhA4QQh0IANyEMUBELwBC2IBAX8jAEEwayIEJAAgBCAANgIMIAAgA08EQCAEQRxqQgE3AgAgBEECNgIUIAQgAjYCECAEQQQ2AiwgBCAEQShqNgIYIAQgBEEMajYCKCAEQRBqIAEQSQALIARBMGokACAACxsAIAAQvQEaIABBCnRBgPgDcSABchDFARC8AQtSAQJ/IwBBEGsiBSQAIAVBCGogAxATIAUtAAkhAyAFLQAIIQYgABC9ASABEL0BIAIQvQEgBkEBcSADQQFxEHpBCHQgBHIQxQEQvAEgBUEQaiQAC1ABAn8jAEEQayIFJAAgBUEIaiADEB0gBS0ACCEDIAUtAAkhBiAAEL0BIAEQvQEgAhC9ASADQQFxIAYQvgFBCHQgBHIQxQEQvAEgBUEQaiQAC0oAIAAQvQEaIAEQECIBQRB0QYCA/AdxIABBEnRBgIDwH3EgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyQQh0IAJyEMUBELwBC0kBAX8jAEEQayIDJAAgABDEASABIAJPBEBB4ILAAEEZENIBAAsgA0EIaiAAEFQgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQgAgABC9ARogARC9ARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyEMUBELwBCzYAIAAQESIAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2ckEIdCABchDFARC8AQsL3AkBAEGAgMAAC9IJQ2hlY2tSZWdJZCB3YXMgZ2l2ZW4gaW52YWxpZCBSZWdJZGZ1ZWwtYXNtL3NyYy9saWIucnMAAAAiABAAEwAAAGgAAAAiAAAAVmFsdWUgYGAgb3V0IG9mIHJhbmdlIGZvciA2LWJpdCBpbW1lZGlhdGUAAABIABAABwAAAE8AEAAiAAAAIgAQABMAAACjAwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxMi1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAlAAQACMAAAAiABAAEwAAAKgDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDE4LWJpdCBpbW1lZGlhdGUASAAQAAcAAADYABAAIwAAACIAEAATAAAArQMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMjQtYml0IGltbWVkaWF0ZQBIABAABwAAABwBEAAjAAAAIgAQABMAAACyAwAAHAAAAGludmFsaWQgZW51bSB2YWx1ZSBwYXNzZWQAAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAkAAAAJEAAACSAAAAkwAAAJQAAACVAAAAlgAAAJcAAACYAAAAoAAAAKEAAACiAAAAowAAAKQAAAClAAAApgAAAKcAAACoAAAAqQAAAKoAAACrAAAArAAAAK0AAACwAAAAaAQQAAAAAAAFAAAAAAAAAAEAAAAGAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTljYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlbGlicmFyeS9zdGQvc3JjL3Bhbmlja2luZy5ycwA7BBAAHAAAAIQCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMC4zDHdhc20tYmluZGdlbgYwLjIuOTI=", e);
}
async function oo() {
  return await Dd(Ih());
}
oo();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ht = BigInt(0), Le = BigInt(1), bn = BigInt(2), bh = BigInt(3), Ii = BigInt(4), Qa = BigInt(5), Na = BigInt(8);
BigInt(9);
BigInt(16);
function It(e, t) {
  const n = e % t;
  return n >= ht ? n : t + n;
}
function Eh(e, t, n) {
  if (n <= ht || t < ht)
    throw new Error("Expected power/modulo > 0");
  if (n === Le)
    return ht;
  let r = Le;
  for (; t > ht; )
    t & Le && (r = r * e % n), e = e * e % n, t >>= Le;
  return r;
}
function xt(e, t, n) {
  let r = e;
  for (; t-- > ht; )
    r *= r, r %= n;
  return r;
}
function bi(e, t) {
  if (e === ht || t <= ht)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = It(e, t), r = t, s = ht, i = Le;
  for (; n !== ht; ) {
    const d = r / n, A = r % n, h = s - i * d;
    r = n, n = A, s = i, i = h;
  }
  if (r !== Le)
    throw new Error("invert: does not exist");
  return It(s, t);
}
function Ch(e) {
  const t = (e - Le) / bn;
  let n, r, s;
  for (n = e - Le, r = 0; n % bn === ht; n /= bn, r++)
    ;
  for (s = bn; s < e && Eh(s, t, e) !== e - Le; s++)
    ;
  if (r === 1) {
    const o = (e + Le) / Ii;
    return function(A, h) {
      const b = A.pow(h, o);
      if (!A.eql(A.sqr(b), h))
        throw new Error("Cannot find square root");
      return b;
    };
  }
  const i = (n + Le) / bn;
  return function(d, A) {
    if (d.pow(A, t) === d.neg(d.ONE))
      throw new Error("Cannot find square root");
    let h = r, b = d.pow(d.mul(d.ONE, s), n), I = d.pow(A, i), _ = d.pow(A, n);
    for (; !d.eql(_, d.ONE); ) {
      if (d.eql(_, d.ZERO))
        return d.ZERO;
      let x = 1;
      for (let C = d.sqr(_); x < h && !d.eql(C, d.ONE); x++)
        C = d.sqr(C);
      const R = d.pow(b, Le << BigInt(h - x - 1));
      b = d.sqr(R), I = d.mul(I, R), _ = d.mul(_, b), h = x;
    }
    return I;
  };
}
function Bh(e) {
  if (e % Ii === bh) {
    const t = (e + Le) / Ii;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % Na === Qa) {
    const t = (e - Qa) / Na;
    return function(r, s) {
      const i = r.mul(s, bn), o = r.pow(i, t), d = r.mul(s, o), A = r.mul(r.mul(d, bn), o), h = r.mul(d, r.sub(A, r.ONE));
      if (!r.eql(r.sqr(h), s))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  return Ch(e);
}
const _h = [
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
function xh(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = _h.reduce((r, s) => (r[s] = "function", r), t);
  return br(e, n);
}
function vh(e, t, n) {
  if (n < ht)
    throw new Error("Expected power > 0");
  if (n === ht)
    return e.ONE;
  if (n === Le)
    return t;
  let r = e.ONE, s = t;
  for (; n > ht; )
    n & Le && (r = e.mul(r, s)), s = e.sqr(s), n >>= Le;
  return r;
}
function Rh(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, d) => e.is0(o) ? i : (n[d] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, d) => e.is0(o) ? i : (n[d] = e.mul(i, n[d]), e.mul(i, o)), s), n;
}
function Td(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function Sh(e, t, n = !1, r = {}) {
  if (e <= ht)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = Td(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Bh(e), d = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: no(s),
    ZERO: ht,
    ONE: Le,
    create: (A) => It(A, e),
    isValid: (A) => {
      if (typeof A != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof A}`);
      return ht <= A && A < e;
    },
    is0: (A) => A === ht,
    isOdd: (A) => (A & Le) === Le,
    neg: (A) => It(-A, e),
    eql: (A, h) => A === h,
    sqr: (A) => It(A * A, e),
    add: (A, h) => It(A + h, e),
    sub: (A, h) => It(A - h, e),
    mul: (A, h) => It(A * h, e),
    pow: (A, h) => vh(d, A, h),
    div: (A, h) => It(A * bi(h, e), e),
    // Same as above, but doesn't normalize
    sqrN: (A) => A * A,
    addN: (A, h) => A + h,
    subN: (A, h) => A - h,
    mulN: (A, h) => A * h,
    inv: (A) => bi(A, e),
    sqrt: r.sqrt || ((A) => o(d, A)),
    invertBatch: (A) => Rh(d, A),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (A, h, b) => b ? h : A,
    toBytes: (A) => n ? to(A, i) : Wn(A, i),
    fromBytes: (A) => {
      if (A.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${A.length}`);
      return n ? eo(A) : Bn(A);
    }
  });
  return Object.freeze(d);
}
function Fd(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Md(e) {
  const t = Fd(e);
  return t + Math.ceil(t / 2);
}
function Qh(e, t, n = !1) {
  const r = e.length, s = Fd(t), i = Md(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Bn(e) : eo(e), d = It(o, t - Le) + Le;
  return n ? to(d, s) : Wn(d, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Nh = BigInt(0), $s = BigInt(1);
function Dh(e, t) {
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
      let o = e.ZERO, d = s;
      for (; i > Nh; )
        i & $s && (o = o.add(d)), d = d.double(), i >>= $s;
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
      const { windows: o, windowSize: d } = r(i), A = [];
      let h = s, b = h;
      for (let I = 0; I < o; I++) {
        b = h, A.push(b);
        for (let _ = 1; _ < d; _++)
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
      const { windows: d, windowSize: A } = r(s);
      let h = e.ZERO, b = e.BASE;
      const I = BigInt(2 ** s - 1), _ = 2 ** s, x = BigInt(s);
      for (let R = 0; R < d; R++) {
        const C = R * A;
        let M = Number(o & I);
        o >>= x, M > A && (M -= _, o += $s);
        const F = C, X = C + Math.abs(M) - 1, k = R % 2 !== 0, Z = M < 0;
        M === 0 ? b = b.add(n(k, i[F])) : h = h.add(n(Z, i[X]));
      }
      return { p: h, f: b };
    },
    wNAFCached(s, i, o, d) {
      const A = s._WINDOW_SIZE || 1;
      let h = i.get(s);
      return h || (h = this.precomputeWindow(s, A), A !== 1 && i.set(s, d(h))), this.wNAF(A, h, o);
    }
  };
}
function Od(e) {
  return xh(e.Fp), br(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Td(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Th(e) {
  const t = Od(e);
  br(t, {
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
const { bytesToNumberBE: Fh, hexToBytes: Mh } = Ll, En = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = En;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: Fh(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = En, n = typeof e == "string" ? Mh(e) : e;
    if (!Pt(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = En._parseInt(n.subarray(2)), { d: o, l: d } = En._parseInt(i);
    if (d.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (h) => Number.parseInt(h[0], 16) & 8 ? "00" + h : h, n = (h) => {
      const b = h.toString(16);
      return b.length & 1 ? `0${b}` : b;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, d = n(i), A = n(o);
    return `30${n(o + i + 4)}02${A}${s}02${d}${r}`;
  }
}, zt = BigInt(0), vt = BigInt(1);
BigInt(2);
const Da = BigInt(3);
BigInt(4);
function Oh(e) {
  const t = Th(e), { Fp: n } = t, r = t.toBytes || ((R, C, M) => {
    const F = C.toAffine();
    return mr(Uint8Array.from([4]), n.toBytes(F.x), n.toBytes(F.y));
  }), s = t.fromBytes || ((R) => {
    const C = R.subarray(1), M = n.fromBytes(C.subarray(0, n.BYTES)), F = n.fromBytes(C.subarray(n.BYTES, 2 * n.BYTES));
    return { x: M, y: F };
  });
  function i(R) {
    const { a: C, b: M } = t, F = n.sqr(R), X = n.mul(F, R);
    return n.add(n.add(X, n.mul(R, C)), M);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(R) {
    return typeof R == "bigint" && zt < R && R < t.n;
  }
  function d(R) {
    if (!o(R))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function A(R) {
    const { allowedPrivateKeyLengths: C, nByteLength: M, wrapPrivateKey: F, n: X } = t;
    if (C && typeof R != "bigint") {
      if (Pt(R) && (R = Zn(R)), typeof R != "string" || !C.includes(R.length))
        throw new Error("Invalid key");
      R = R.padStart(M * 2, "0");
    }
    let k;
    try {
      k = typeof R == "bigint" ? R : Bn(Qt("private key", R, M));
    } catch {
      throw new Error(`private key must be ${M} bytes, hex or bigint, not ${typeof R}`);
    }
    return F && (k = It(k, X)), d(k), k;
  }
  const h = /* @__PURE__ */ new Map();
  function b(R) {
    if (!(R instanceof I))
      throw new Error("ProjectivePoint expected");
  }
  class I {
    constructor(C, M, F) {
      if (this.px = C, this.py = M, this.pz = F, C == null || !n.isValid(C))
        throw new Error("x required");
      if (M == null || !n.isValid(M))
        throw new Error("y required");
      if (F == null || !n.isValid(F))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(C) {
      const { x: M, y: F } = C || {};
      if (!C || !n.isValid(M) || !n.isValid(F))
        throw new Error("invalid affine point");
      if (C instanceof I)
        throw new Error("projective point not allowed");
      const X = (k) => n.eql(k, n.ZERO);
      return X(M) && X(F) ? I.ZERO : new I(M, F, n.ONE);
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
      const M = n.invertBatch(C.map((F) => F.pz));
      return C.map((F, X) => F.toAffine(M[X])).map(I.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(C) {
      const M = I.fromAffine(s(Qt("pointHex", C)));
      return M.assertValidity(), M;
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
      const { x: C, y: M } = this.toAffine();
      if (!n.isValid(C) || !n.isValid(M))
        throw new Error("bad point: x or y not FE");
      const F = n.sqr(M), X = i(C);
      if (!n.eql(F, X))
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
      const { px: M, py: F, pz: X } = this, { px: k, py: Z, pz: O } = C, T = n.eql(n.mul(M, O), n.mul(k, X)), L = n.eql(n.mul(F, O), n.mul(Z, X));
      return T && L;
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
      const { a: C, b: M } = t, F = n.mul(M, Da), { px: X, py: k, pz: Z } = this;
      let O = n.ZERO, T = n.ZERO, L = n.ZERO, U = n.mul(X, X), q = n.mul(k, k), V = n.mul(Z, Z), H = n.mul(X, k);
      return H = n.add(H, H), L = n.mul(X, Z), L = n.add(L, L), O = n.mul(C, L), T = n.mul(F, V), T = n.add(O, T), O = n.sub(q, T), T = n.add(q, T), T = n.mul(O, T), O = n.mul(H, O), L = n.mul(F, L), V = n.mul(C, V), H = n.sub(U, V), H = n.mul(C, H), H = n.add(H, L), L = n.add(U, U), U = n.add(L, U), U = n.add(U, V), U = n.mul(U, H), T = n.add(T, U), V = n.mul(k, Z), V = n.add(V, V), U = n.mul(V, H), O = n.sub(O, U), L = n.mul(V, q), L = n.add(L, L), L = n.add(L, L), new I(O, T, L);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(C) {
      b(C);
      const { px: M, py: F, pz: X } = this, { px: k, py: Z, pz: O } = C;
      let T = n.ZERO, L = n.ZERO, U = n.ZERO;
      const q = t.a, V = n.mul(t.b, Da);
      let H = n.mul(M, k), ee = n.mul(F, Z), E = n.mul(X, O), a = n.add(M, F), c = n.add(k, Z);
      a = n.mul(a, c), c = n.add(H, ee), a = n.sub(a, c), c = n.add(M, X);
      let l = n.add(k, O);
      return c = n.mul(c, l), l = n.add(H, E), c = n.sub(c, l), l = n.add(F, X), T = n.add(Z, O), l = n.mul(l, T), T = n.add(ee, E), l = n.sub(l, T), U = n.mul(q, c), T = n.mul(V, E), U = n.add(T, U), T = n.sub(ee, U), U = n.add(ee, U), L = n.mul(T, U), ee = n.add(H, H), ee = n.add(ee, H), E = n.mul(q, E), c = n.mul(V, c), ee = n.add(ee, E), E = n.sub(H, E), E = n.mul(q, E), c = n.add(c, E), H = n.mul(ee, c), L = n.add(L, H), H = n.mul(l, c), T = n.mul(a, T), T = n.sub(T, H), H = n.mul(a, ee), U = n.mul(l, U), U = n.add(U, H), new I(T, L, U);
    }
    subtract(C) {
      return this.add(C.negate());
    }
    is0() {
      return this.equals(I.ZERO);
    }
    wNAF(C) {
      return x.wNAFCached(this, h, C, (M) => {
        const F = n.invertBatch(M.map((X) => X.pz));
        return M.map((X, k) => X.toAffine(F[k])).map(I.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(C) {
      const M = I.ZERO;
      if (C === zt)
        return M;
      if (d(C), C === vt)
        return this;
      const { endo: F } = t;
      if (!F)
        return x.unsafeLadder(this, C);
      let { k1neg: X, k1: k, k2neg: Z, k2: O } = F.splitScalar(C), T = M, L = M, U = this;
      for (; k > zt || O > zt; )
        k & vt && (T = T.add(U)), O & vt && (L = L.add(U)), U = U.double(), k >>= vt, O >>= vt;
      return X && (T = T.negate()), Z && (L = L.negate()), L = new I(n.mul(L.px, F.beta), L.py, L.pz), T.add(L);
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
      d(C);
      let M = C, F, X;
      const { endo: k } = t;
      if (k) {
        const { k1neg: Z, k1: O, k2neg: T, k2: L } = k.splitScalar(M);
        let { p: U, f: q } = this.wNAF(O), { p: V, f: H } = this.wNAF(L);
        U = x.constTimeNegate(Z, U), V = x.constTimeNegate(T, V), V = new I(n.mul(V.px, k.beta), V.py, V.pz), F = U.add(V), X = q.add(H);
      } else {
        const { p: Z, f: O } = this.wNAF(M);
        F = Z, X = O;
      }
      return I.normalizeZ([F, X])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(C, M, F) {
      const X = I.BASE, k = (O, T) => T === zt || T === vt || !O.equals(X) ? O.multiplyUnsafe(T) : O.multiply(T), Z = k(this, M).add(k(C, F));
      return Z.is0() ? void 0 : Z;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(C) {
      const { px: M, py: F, pz: X } = this, k = this.is0();
      C == null && (C = k ? n.ONE : n.inv(X));
      const Z = n.mul(M, C), O = n.mul(F, C), T = n.mul(X, C);
      if (k)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(T, n.ONE))
        throw new Error("invZ was invalid");
      return { x: Z, y: O };
    }
    isTorsionFree() {
      const { h: C, isTorsionFree: M } = t;
      if (C === vt)
        return !0;
      if (M)
        return M(I, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: C, clearCofactor: M } = t;
      return C === vt ? this : M ? M(I, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(C = !0) {
      return this.assertValidity(), r(I, this, C);
    }
    toHex(C = !0) {
      return Zn(this.toRawBytes(C));
    }
  }
  I.BASE = new I(t.Gx, t.Gy, n.ONE), I.ZERO = new I(n.ZERO, n.ONE, n.ZERO);
  const _ = t.nBitLength, x = Dh(I, t.endo ? Math.ceil(_ / 2) : _);
  return {
    CURVE: t,
    ProjectivePoint: I,
    normPrivateKeyToScalar: A,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Lh(e) {
  const t = Od(e);
  return br(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function kh(e) {
  const t = Lh(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(c) {
    return zt < c && c < n.ORDER;
  }
  function d(c) {
    return It(c, r);
  }
  function A(c) {
    return bi(c, r);
  }
  const { ProjectivePoint: h, normPrivateKeyToScalar: b, weierstrassEquation: I, isWithinCurveOrder: _ } = Oh({
    ...t,
    toBytes(c, l, p) {
      const f = l.toAffine(), w = n.toBytes(f.x), y = mr;
      return p ? y(Uint8Array.from([l.hasEvenY() ? 2 : 3]), w) : y(Uint8Array.from([4]), w, n.toBytes(f.y));
    },
    fromBytes(c) {
      const l = c.length, p = c[0], f = c.subarray(1);
      if (l === s && (p === 2 || p === 3)) {
        const w = Bn(f);
        if (!o(w))
          throw new Error("Point is not on curve");
        const y = I(w);
        let g = n.sqrt(y);
        const u = (g & vt) === vt;
        return (p & 1) === 1 !== u && (g = n.neg(g)), { x: w, y: g };
      } else if (l === i && p === 4) {
        const w = n.fromBytes(f.subarray(0, n.BYTES)), y = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: w, y };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), x = (c) => Zn(Wn(c, t.nByteLength));
  function R(c) {
    const l = r >> vt;
    return c > l;
  }
  function C(c) {
    return R(c) ? d(-c) : c;
  }
  const M = (c, l, p) => Bn(c.slice(l, p));
  class F {
    constructor(l, p, f) {
      this.r = l, this.s = p, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(l) {
      const p = t.nByteLength;
      return l = Qt("compactSignature", l, p * 2), new F(M(l, 0, p), M(l, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(l) {
      const { r: p, s: f } = En.toSig(Qt("DER", l));
      return new F(p, f);
    }
    assertValidity() {
      if (!_(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!_(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(l) {
      return new F(this.r, this.s, l);
    }
    recoverPublicKey(l) {
      const { r: p, s: f, recovery: w } = this, y = L(Qt("msgHash", l));
      if (w == null || ![0, 1, 2, 3].includes(w))
        throw new Error("recovery id invalid");
      const g = w === 2 || w === 3 ? p + t.n : p;
      if (g >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = w & 1 ? "03" : "02", m = h.fromHex(u + x(g)), J = A(g), W = d(-y * J), K = d(f * J), j = h.BASE.multiplyAndAddUnsafe(m, W, K);
      if (!j)
        throw new Error("point at infinify");
      return j.assertValidity(), j;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return R(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new F(this.r, d(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Jn(this.toDERHex());
    }
    toDERHex() {
      return En.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Jn(this.toCompactHex());
    }
    toCompactHex() {
      return x(this.r) + x(this.s);
    }
  }
  const X = {
    isValidPrivateKey(c) {
      try {
        return b(c), !0;
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
      const c = Md(t.n);
      return Qh(t.randomBytes(c), t.n);
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
  function k(c, l = !0) {
    return h.fromPrivateKey(c).toRawBytes(l);
  }
  function Z(c) {
    const l = Pt(c), p = typeof c == "string", f = (l || p) && c.length;
    return l ? f === s || f === i : p ? f === 2 * s || f === 2 * i : c instanceof h;
  }
  function O(c, l, p = !0) {
    if (Z(c))
      throw new Error("first arg must be private key");
    if (!Z(l))
      throw new Error("second arg must be public key");
    return h.fromHex(l).multiply(b(c)).toRawBytes(p);
  }
  const T = t.bits2int || function(c) {
    const l = Bn(c), p = c.length * 8 - t.nBitLength;
    return p > 0 ? l >> BigInt(p) : l;
  }, L = t.bits2int_modN || function(c) {
    return d(T(c));
  }, U = no(t.nBitLength);
  function q(c) {
    if (typeof c != "bigint")
      throw new Error("bigint expected");
    if (!(zt <= c && c < U))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return Wn(c, t.nByteLength);
  }
  function V(c, l, p = H) {
    if (["recovered", "canonical"].some((se) => se in p))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: w } = t;
    let { lowS: y, prehash: g, extraEntropy: u } = p;
    y == null && (y = !0), c = Qt("msgHash", c), g && (c = Qt("prehashed msgHash", f(c)));
    const m = L(c), J = b(l), W = [q(J), q(m)];
    if (u != null) {
      const se = u === !0 ? w(n.BYTES) : u;
      W.push(Qt("extraEntropy", se));
    }
    const K = mr(...W), j = m;
    function re(se) {
      const Se = T(se);
      if (!_(Se))
        return;
      const he = A(Se), oe = h.BASE.multiply(Se).toAffine(), xe = d(oe.x);
      if (xe === zt)
        return;
      const Ae = d(he * d(j + xe * J));
      if (Ae === zt)
        return;
      let ge = (oe.x === xe ? 0 : 2) | Number(oe.y & vt), Dt = Ae;
      return y && R(Ae) && (Dt = C(Ae), ge ^= 1), new F(xe, Dt, ge);
    }
    return { seed: K, k2sig: re };
  }
  const H = { lowS: t.lowS, prehash: !1 }, ee = { lowS: t.lowS, prehash: !1 };
  function E(c, l, p = H) {
    const { seed: f, k2sig: w } = V(c, l, p), y = t;
    return dd(y.hash.outputLen, y.nByteLength, y.hmac)(f, w);
  }
  h.BASE._setWindowSize(8);
  function a(c, l, p, f = ee) {
    var oe;
    const w = c;
    if (l = Qt("msgHash", l), p = Qt("publicKey", p), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: y, prehash: g } = f;
    let u, m;
    try {
      if (typeof w == "string" || Pt(w))
        try {
          u = F.fromDER(w);
        } catch (xe) {
          if (!(xe instanceof En.Err))
            throw xe;
          u = F.fromCompact(w);
        }
      else if (typeof w == "object" && typeof w.r == "bigint" && typeof w.s == "bigint") {
        const { r: xe, s: Ae } = w;
        u = new F(xe, Ae);
      } else
        throw new Error("PARSE");
      m = h.fromHex(p);
    } catch (xe) {
      if (xe.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (y && u.hasHighS())
      return !1;
    g && (l = t.hash(l));
    const { r: J, s: W } = u, K = L(l), j = A(W), re = d(K * j), se = d(J * j), Se = (oe = h.BASE.multiplyAndAddUnsafe(m, re, se)) == null ? void 0 : oe.toAffine();
    return Se ? d(Se.x) === J : !1;
  }
  return {
    CURVE: t,
    getPublicKey: k,
    getSharedSecret: O,
    sign: E,
    verify: a,
    ProjectivePoint: h,
    Signature: F,
    utils: X
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Ph(e) {
  return {
    hash: e,
    hmac: (t, ...n) => hs(e, t, IA(...n)),
    randomBytes: EA
  };
}
function Uh(e, t) {
  const n = (r) => kh({ ...e, ...Ph(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ld = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Ta = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Gh = BigInt(1), Ei = BigInt(2), Fa = (e, t) => (e + t / Ei) / t;
function Xh(e) {
  const t = Ld, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), d = BigInt(44), A = BigInt(88), h = e * e * e % t, b = h * h * e % t, I = xt(b, n, t) * b % t, _ = xt(I, n, t) * b % t, x = xt(_, Ei, t) * h % t, R = xt(x, s, t) * x % t, C = xt(R, i, t) * R % t, M = xt(C, d, t) * C % t, F = xt(M, A, t) * M % t, X = xt(F, d, t) * C % t, k = xt(X, n, t) * b % t, Z = xt(k, o, t) * R % t, O = xt(Z, r, t) * h % t, T = xt(O, Ei, t);
  if (!Ci.eql(Ci.sqr(T), e))
    throw new Error("Cannot find square root");
  return T;
}
const Ci = Sh(Ld, void 0, void 0, { sqrt: Xh }), en = Uh({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Ci,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: Ta,
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
      const t = Ta, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -Gh * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), d = Fa(i * e, t), A = Fa(-r * e, t);
      let h = It(e - d * n - A * s, t), b = It(-d * r - A * i, t);
      const I = h > o, _ = b > o;
      if (I && (h = t - h), _ && (b = t - b), h > o || b > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: I, k1: h, k2neg: _, k2: b };
    }
  }
}, vn);
BigInt(0);
en.ProjectivePoint;
let Or;
const Yh = new Uint8Array(16);
function Vh() {
  if (!Or && (Or = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Or))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Or(Yh);
}
const pt = [];
for (let e = 0; e < 256; ++e)
  pt.push((e + 256).toString(16).slice(1));
function zh(e, t = 0) {
  return (pt[e[t + 0]] + pt[e[t + 1]] + pt[e[t + 2]] + pt[e[t + 3]] + "-" + pt[e[t + 4]] + pt[e[t + 5]] + "-" + pt[e[t + 6]] + pt[e[t + 7]] + "-" + pt[e[t + 8]] + pt[e[t + 9]] + "-" + pt[e[t + 10]] + pt[e[t + 11]] + pt[e[t + 12]] + pt[e[t + 13]] + pt[e[t + 14]] + pt[e[t + 15]]).toLowerCase();
}
const Hh = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Ma = {
  randomUUID: Hh
};
function Zh(e, t, n) {
  if (Ma.randomUUID && !t && !e)
    return Ma.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || Vh)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return zh(r);
}
var ao = { exports: {} }, Ln = typeof Reflect == "object" ? Reflect : null, Oa = Ln && typeof Ln.apply == "function" ? Ln.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, qr;
Ln && typeof Ln.ownKeys == "function" ? qr = Ln.ownKeys : Object.getOwnPropertySymbols ? qr = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : qr = function(t) {
  return Object.getOwnPropertyNames(t);
};
function Jh(e) {
  console && console.warn && console.warn(e);
}
var kd = Number.isNaN || function(t) {
  return t !== t;
};
function Be() {
  Be.init.call(this);
}
ao.exports = Be;
ao.exports.once = $h;
Be.EventEmitter = Be;
Be.prototype._events = void 0;
Be.prototype._eventsCount = 0;
Be.prototype._maxListeners = void 0;
var La = 10;
function bs(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Be, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return La;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || kd(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    La = e;
  }
});
Be.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Be.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || kd(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Pd(e) {
  return e._maxListeners === void 0 ? Be.defaultMaxListeners : e._maxListeners;
}
Be.prototype.getMaxListeners = function() {
  return Pd(this);
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
    var d = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw d.context = o, d;
  }
  var A = i[t];
  if (A === void 0)
    return !1;
  if (typeof A == "function")
    Oa(A, this, n);
  else
    for (var h = A.length, b = Vd(A, h), r = 0; r < h; ++r)
      Oa(b[r], this, n);
  return !0;
};
function Ud(e, t, n, r) {
  var s, i, o;
  if (bs(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = Pd(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var d = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    d.name = "MaxListenersExceededWarning", d.emitter = e, d.type = t, d.count = o.length, Jh(d);
  }
  return e;
}
Be.prototype.addListener = function(t, n) {
  return Ud(this, t, n, !1);
};
Be.prototype.on = Be.prototype.addListener;
Be.prototype.prependListener = function(t, n) {
  return Ud(this, t, n, !0);
};
function Wh() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Gd(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = Wh.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Be.prototype.once = function(t, n) {
  return bs(n), this.on(t, Gd(this, t, n)), this;
};
Be.prototype.prependOnceListener = function(t, n) {
  return bs(n), this.prependListener(t, Gd(this, t, n)), this;
};
Be.prototype.removeListener = function(t, n) {
  var r, s, i, o, d;
  if (bs(n), s = this._events, s === void 0)
    return this;
  if (r = s[t], r === void 0)
    return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete s[t], s.removeListener && this.emit("removeListener", t, r.listener || n));
  else if (typeof r != "function") {
    for (i = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === n || r[o].listener === n) {
        d = r[o].listener, i = o;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? r.shift() : qh(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, d || n);
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
function Xd(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? jh(s) : Vd(s, s.length);
}
Be.prototype.listeners = function(t) {
  return Xd(this, t, !0);
};
Be.prototype.rawListeners = function(t) {
  return Xd(this, t, !1);
};
Be.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : Yd.call(e, t);
};
Be.prototype.listenerCount = Yd;
function Yd(e) {
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
  return this._eventsCount > 0 ? qr(this._events) : [];
};
function Vd(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function qh(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function jh(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function $h(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    zd(e, t, i, { once: !0 }), t !== "error" && Kh(e, s, { once: !0 });
  });
}
function Kh(e, t, n) {
  typeof e.on == "function" && zd(e, "error", t, n);
}
function zd(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var Hd = ao.exports, eg = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", tg = class {
  constructor(e, t, n, r, s, i = 0) {
    S(this, "left");
    S(this, "right");
    S(this, "parent");
    S(this, "hash");
    S(this, "data");
    S(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, ka = tg;
function ng(e) {
  return Zt("0x00".concat(e.slice(2)));
}
function rg(e, t) {
  return Zt("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function Zd(e) {
  if (!e.length)
    return eg;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = ng(e[i]);
    t.push(new ka(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, d = rg(n[o].hash, n[o + 1].hash);
      t[i] = new ka(n[o].index, n[o + 1].index, -1, d, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var sg = "0x00", Jd = "0x01";
function ig(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(Zt(t).slice(2));
  return [Zt(n), n];
}
function Sn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [Zt(n), n];
}
function Ks(e) {
  const t = Jd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function og(e) {
  const t = Jd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function ei(e) {
  return e.slice(0, 4) === sg;
}
var ag = class {
  constructor(e, t, n, r, s) {
    S(this, "SideNodes");
    S(this, "NonMembershipLeafData");
    S(this, "BitMask");
    S(this, "NumSideNodes");
    S(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, cg = ag, dg = class {
  constructor(e, t, n) {
    S(this, "SideNodes");
    S(this, "NonMembershipLeafData");
    S(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, ug = dg, Bt = "0x0000000000000000000000000000000000000000000000000000000000000000", Vt = 256;
function Tn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function Ag(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function lg(e, t) {
  let n = 0;
  for (let r = 0; r < Vt && Tn(e, r) === Tn(t, r); r += 1)
    n += 1;
  return n;
}
function fg(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === Bt ? t.push(0) : (n.push(r), t.push(1));
  return new cg(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var hg = class {
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
    if (ei(r))
      return [n, t, r, ""];
    let s, i, o = "", d = "";
    for (let h = 0; h < Vt; h += 1) {
      if ([s, i] = og(r), Tn(e, h) === 1 ? (d = s, o = i) : (d = i, o = s), n.push(d), o === Bt) {
        r = "";
        break;
      }
      if (r = this.get(o), ei(r))
        break;
    }
    const A = this.get(d);
    return [Ag(n), o, r, A];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === Bt)
      return this.root;
    const [s] = Ks(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", d = "", A = "", h = !1;
    for (let b = 0; b < t.length; b += 1)
      if (t[b] !== "") {
        if (d = t[b], o === "")
          if (A = this.get(d), ei(A)) {
            i = d, o = d;
            continue;
          } else
            o = Bt, h = !0;
        !h && d === Bt || (h || (h = !0), Tn(e, t.length - 1 - b) === 1 ? [i, o] = Sn(d, o) : [i, o] = Sn(o, d), this.set(i, o), o = i);
      }
    return i === "" && (i = Bt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(Zt(t), t), [i, o] = ig(e, t), this.set(i, o), o = i;
    let d;
    if (r === Bt)
      d = Vt;
    else {
      const [A] = Ks(s);
      d = lg(e, A);
    }
    d !== Vt && (Tn(e, d) === 1 ? [i, o] = Sn(r, o) : [i, o] = Sn(o, r), this.set(i, o), o = i);
    for (let A = 0; A < Vt; A += 1) {
      let h;
      const b = Vt - n.length;
      if (A - b < 0 || n[A - b] === "")
        if (d !== Vt && d > Vt - 1 - A)
          h = Bt;
        else
          continue;
      else
        h = n[A - b];
      Tn(e, Vt - 1 - A) === 1 ? [i, o] = Sn(h, o) : [i, o] = Sn(o, h), this.set(i, o), o = i;
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
      const [A] = Ks(r);
      A !== e && (o = r);
    }
    return new ug(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return fg(t);
  }
}, gg = Object.defineProperty, pg = (e, t, n) => t in e ? gg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, De = (e, t, n) => (pg(e, typeof t != "symbol" ? t + "" : t, n), n), co = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Re = (e, t, n) => (co(e, t, "read from private field"), n ? n.call(e) : t.get(e)), on = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Nt = (e, t, n, r) => (co(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Bi = (e, t, n) => (co(e, t, "access private method"), n), uo = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1], r = e[2] ?? void 0) : (n = e.amount, t = e.assetId, r = e.max ?? void 0);
  const s = B(n);
  return {
    assetId: z(t),
    amount: s.lt(1) ? B(1) : s,
    max: r ? B(r) : void 0
  };
}, mg = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, Wd = ne`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  type: __typename
  ... on SqueezedOutStatus {
    reason
  }
}
    `, wg = ne`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, Ao = ne`
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
    `, yg = ne`
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
    ${Ao}`, Ig = ne`
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
    ${Ao}`, bg = ne`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, Eg = ne`
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
    ${wg}
${yg}
${Ig}
${bg}`, _r = ne`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${Eg}`, Cg = ne`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, Bg = ne`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${Cg}`, _g = ne`
    fragment dryRunFailureStatusFragment on DryRunFailureStatus {
  totalGas
  totalFee
  reason
  programState {
    returnType
    data
  }
}
    `, xg = ne`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, vg = ne`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${_g}
${xg}`, Rg = ne`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${vg}
${Ao}`, lo = ne`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, Sg = ne`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, qd = ne`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, Qg = ne`
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
    `, jd = ne`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Es = ne`
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
    `, Ng = ne`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, Dg = ne`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, Tg = ne`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, Fg = ne`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, Mg = ne`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, Og = ne`
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
    `, Lg = ne`
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
    ${Og}`, kg = ne`
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
    ${Ng}
${Dg}
${Tg}
${Fg}
${Mg}
${Lg}`, Pg = ne`
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
    ${Es}
${kg}`, Ug = ne`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Gg = ne`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, Xg = ne`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, Yg = ne`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, Vg = ne`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, zg = ne`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${Xg}`, Hg = ne`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${Pg}`, Zg = ne`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${_r}`, Jg = ne`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${_r}`, Wg = ne`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${_r}`, qg = ne`
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
    ${Gg}
${_r}`, jg = ne`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${Bg}`, $g = ne`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Es}`, Kg = ne`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Es}
${_r}`, ep = ne`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${Es}`, tp = ne`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${lo}`, np = ne`
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
    ${lo}`, rp = ne`
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
    ${lo}
${Sg}`, sp = ne`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, ip = ne`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${Ug}`, op = ne`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${jd}`, ap = ne`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, cp = ne`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, dp = ne`
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
    ${jd}`, up = ne`
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
    ${qd}`, Ap = ne`
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
    ${Qg}`, lp = ne`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, fp = ne`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${Yg}`, hp = ne`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean) {
  dryRun(txs: $encodedTransactions, utxoValidation: $utxoValidation) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${Rg}`, gp = ne`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, pp = ne`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, mp = ne`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${qd}`, wp = ne`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Wd}`, yp = ne`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Wd}`;
function Ip(e) {
  return {
    getVersion(t, n) {
      return e(Vg, t, n);
    },
    getNodeInfo(t, n) {
      return e(zg, t, n);
    },
    getChain(t, n) {
      return e(Hg, t, n);
    },
    getTransaction(t, n) {
      return e(Zg, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(Jg, t, n);
    },
    getTransactions(t, n) {
      return e(Wg, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(qg, t, n);
    },
    estimatePredicates(t, n) {
      return e(jg, t, n);
    },
    getBlock(t, n) {
      return e($g, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(Kg, t, n);
    },
    getBlocks(t, n) {
      return e(ep, t, n);
    },
    getCoin(t, n) {
      return e(tp, t, n);
    },
    getCoins(t, n) {
      return e(np, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(rp, t, n);
    },
    getContract(t, n) {
      return e(sp, t, n);
    },
    getContractBalance(t, n) {
      return e(ip, t, n);
    },
    getBalance(t, n) {
      return e(op, t, n);
    },
    getLatestGasPrice(t, n) {
      return e(ap, t, n);
    },
    estimateGasPrice(t, n) {
      return e(cp, t, n);
    },
    getBalances(t, n) {
      return e(dp, t, n);
    },
    getMessages(t, n) {
      return e(up, t, n);
    },
    getMessageProof(t, n) {
      return e(Ap, t, n);
    },
    getMessageStatus(t, n) {
      return e(lp, t, n);
    },
    getRelayedTransactionStatus(t, n) {
      return e(fp, t, n);
    },
    dryRun(t, n) {
      return e(hp, t, n);
    },
    submit(t, n) {
      return e(gp, t, n);
    },
    produceBlocks(t, n) {
      return e(pp, t, n);
    },
    getMessageByNonce(t, n) {
      return e(mp, t, n);
    },
    submitAndAwait(t, n) {
      return e(wp, t, n);
    },
    statusChange(t, n) {
      return e(yp, t, n);
    }
  };
}
var $d = class {
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
        query: bd(t),
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
        const { data: o, errors: d } = this.events.shift();
        if (Array.isArray(d))
          throw new v(
            v.CODES.INVALID_REQUEST,
            d.map((A) => A.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const n = $d.textDecoder.decode(e).replace(`:keep-alive-text

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
}, Kd = $d;
De(Kd, "textDecoder", new TextDecoder());
var wn = {}, bp = 30 * 1e3, Ep = class {
  constructor(e = bp) {
    S(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new v(
        N.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = z(e);
    if (wn[n]) {
      if (!t || wn[n].expires > Date.now())
        return wn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = z(e);
    return wn[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(wn).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(wn).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = z(e);
    delete wn[t];
  }
}, Cp = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case me.Coin: {
      const n = Y(e.predicate ?? "0x"), r = Y(e.predicateData ?? "0x");
      return {
        type: me.Coin,
        txID: z(Y(e.id).slice(0, An)),
        outputIndex: rn(Y(e.id).slice(An, ui)),
        owner: z(e.owner),
        amount: B(e.amount),
        assetId: z(e.assetId),
        txPointer: {
          blockHeight: rn(Y(e.txPointer).slice(0, 8)),
          txIndex: rn(Y(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: B(e.predicateGasUsed),
        predicateLength: B(n.length),
        predicateDataLength: B(r.length),
        predicate: z(n),
        predicateData: z(r)
      };
    }
    case me.Contract:
      return {
        type: me.Contract,
        txID: Ne,
        outputIndex: 0,
        balanceRoot: Ne,
        stateRoot: Ne,
        txPointer: {
          blockHeight: rn(Y(e.txPointer).slice(0, 8)),
          txIndex: rn(Y(e.txPointer).slice(8, 16))
        },
        contractID: z(e.contractId)
      };
    case me.Message: {
      const n = Y(e.predicate ?? "0x"), r = Y(e.predicateData ?? "0x"), s = Y(e.data ?? "0x");
      return {
        type: me.Message,
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
}, Bp = (e) => {
  const { type: t } = e;
  switch (t) {
    case be.Coin:
      return {
        type: be.Coin,
        to: z(e.to),
        amount: B(e.amount),
        assetId: z(e.assetId)
      };
    case be.Contract:
      return {
        type: be.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Ne,
        stateRoot: Ne
      };
    case be.Change:
      return {
        type: be.Change,
        to: z(e.to),
        amount: B(0),
        assetId: z(e.assetId)
      };
    case be.Variable:
      return {
        type: be.Variable,
        to: Ne,
        amount: B(0),
        assetId: Ne
      };
    case be.ContractCreated:
      return {
        type: be.ContractCreated,
        contractId: z(e.contractId),
        stateRoot: z(e.stateRoot)
      };
    default:
      throw new v(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, ty = (e) => "utxoId" in e, ny = (e) => "recipient" in e, _p = (e) => "id" in e, ry = (e) => "recipient" in e, xp = (e) => e.type === de.Revert && e.val.toString("hex") === Rd, vp = (e) => e.type === de.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", Pa = (e) => e.reduce(
  (t, n) => (xp(n) && t.missingOutputVariables.push(n), vp(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), _e = (e) => e || Ne;
function Rp(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: de.Call,
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
        type: de.Return,
        id: _e(e.id || e.contractId),
        val: B(e.val),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "RETURN_DATA":
      return {
        type: de.ReturnData,
        id: _e(e.id || e.contractId),
        ptr: B(e.ptr),
        len: B(e.len),
        digest: _e(e.digest),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "PANIC":
      return {
        type: de.Panic,
        id: _e(e.id),
        reason: B(e.reason),
        pc: B(e.pc),
        is: B(e.is),
        contractId: _e(e.contractId)
      };
    case "REVERT":
      return {
        type: de.Revert,
        id: _e(e.id || e.contractId),
        val: B(e.ra),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "LOG":
      return {
        type: de.Log,
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
        type: de.LogData,
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
        type: de.Transfer,
        from: _e(e.id || e.contractId),
        to: _e(e.toAddress || (e == null ? void 0 : e.to)),
        amount: B(e.amount),
        assetId: _e(e.assetId),
        pc: B(e.pc),
        is: B(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: de.TransferOut,
        from: _e(e.id || e.contractId),
        to: _e(e.toAddress || e.to),
        amount: B(e.amount),
        assetId: _e(e.assetId),
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
      const n = _e(e.sender), r = _e(e.recipient), s = _e(e.nonce), i = B(e.amount), o = e.data ? Y(e.data) : Uint8Array.from([]), d = _e(e.digest), A = os.getMessageId({
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
        digest: d,
        messageId: A
      };
    }
    case "MINT": {
      const n = _e(e.id || e.contractId), r = _e(e.subId), s = pr.getAssetId(n, r);
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
      const n = _e(e.id || e.contractId), r = _e(e.subId), s = fi.getAssetId(n, r);
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
      throw new v(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var Sp = "https://fuellabs.github.io/block-explorer-v2", Qp = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, sy = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, d = t || Sp, A = [
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
  ], h = A.filter((Z) => !!Z.value).map(({ key: Z, value: O }) => ({
    key: Z,
    value: O
  })), b = h.length > 0;
  if (h.length > 1)
    throw new v(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${A.map((Z) => Z.key).join(", ")}.`
    );
  if (n && h.length > 0) {
    const Z = A.map(({ key: O }) => O).join(", ");
    throw new v(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${Z}.`
    );
  }
  const I = b ? Qp(
    h[0].key,
    h[0].value
  ) : "", _ = /^\/|\/$/gm, x = n ? n.replace(_, "") : I, R = d.replace(_, ""), C = r == null ? void 0 : r.replace(_, ""), M = C ? encodeURIComponent(C) : void 0, F = R.match(/^https?:\/\//) ? "" : "https://", X = C != null && C.match(/^https?:\/\//) ? "" : "https://";
  return `${F}${R}/${x}${M ? `?providerUrl=${X}${M}` : ""}`;
}, eu = (e) => e.filter(
  (r) => r.type === de.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), B(0));
function un(e, t) {
  const n = B(t.base);
  let r = B(0);
  return "unitsPerGas" in t ? r = B(e).div(B(t.unitsPerGas)) : r = B(e).mul(B(t.gasPerUnit)), n.add(r);
}
function Np(e, t, n) {
  const r = [], s = e.filter((d) => {
    if ("owner" in d || "sender" in d) {
      if ("predicate" in d && d.predicate && d.predicate !== "0x")
        return !0;
      if (!r.includes(d.witnessIndex))
        return r.push(d.witnessIndex), !0;
    }
    return !1;
  }), i = un(t, n.vmInitialization);
  return s.reduce((d, A) => "predicate" in A && A.predicate && A.predicate !== "0x" ? d.add(
    i.add(un(Y(A.predicate).length, n.contractRoot)).add(B(A.predicateGasUsed))
  ) : d.add(n.ecr1), B(0));
}
function tu(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = un(i, t.vmInitialization), d = B(i).mul(n), A = Np(r, i, t);
  return o.add(d).add(A).add(s).maxU64();
}
function fo(e) {
  const {
    gasPerByte: t,
    witnessesLength: n,
    witnessLimit: r,
    minGas: s,
    gasLimit: i = B(0),
    maxGasPerTx: o
  } = e;
  let d = B(0);
  r != null && r.gt(0) && r.gte(n) && (d = B(r).sub(n).mul(t));
  const A = d.add(s).add(i);
  return A.gte(o) ? o : A;
}
function nu({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = un(r, e.contractRoot), i = un(t, e.stateRoot), o = un(n, e.s256), d = B(100), A = un(d, e.s256);
  return s.add(i).add(o).add(A).maxU64();
}
function ru({
  gasCosts: e,
  txBytesSize: t
}) {
  return un(t, e.s256);
}
var _i = (e) => {
  const { gas: t, gasPrice: n, priceFactor: r, tip: s } = e;
  return t.mul(n).div(r).add(B(s));
};
function xi(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = z(e[t]);
        break;
      case "Array":
        e[t] = xi(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = xi(e[t]);
        break;
    }
  }), e;
}
function Dp(e) {
  return xi(Lt(e));
}
function Tp(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var Fp = (e) => {
  let t = `The transaction reverted with reason: "${e.reason}".`;
  const n = e.reason;
  return dh.includes(e.reason) && (t = `${t}

You can read more about this error at:

${uh}#variant.${e.reason}`), { errorMessage: t, reason: n };
}, or = (e) => JSON.stringify(e, null, 2), Mp = (e, t) => {
  let n = "The transaction reverted with an unknown reason.";
  const r = e.find(({ type: i }) => i === de.Revert);
  let s = "";
  if (r)
    switch (B(r.val).toHex()) {
      case ih: {
        s = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? or(t[0]) : "an error."}.`;
        break;
      }
      case oh: {
        const o = t.length >= 2 ? ` comparing ${or(t[1])} and ${or(t[0])}.` : ".";
        s = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${o}`;
        break;
      }
      case ch: {
        const o = t.length >= 2 ? ` comparing ${or(t[1])} and ${or(t[0])}.` : ".";
        s = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${o}`;
        break;
      }
      case ah:
        s = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case Rd:
        s = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        s = "unknown", n = `The transaction reverted with an unknown reason: ${r.val}`;
    }
  return { errorMessage: n, reason: s };
}, su = (e) => {
  const { receipts: t, status: n, logs: r } = e, s = t.some(({ type: h }) => h === de.Panic), i = t.some(({ type: h }) => h === de.Revert), { errorMessage: o, reason: d } = (n == null ? void 0 : n.type) === "FailureStatus" && s ? Fp(n) : Mp(t, r), A = {
    logs: r,
    receipts: t,
    panic: s,
    revert: i,
    reason: d
  };
  return new v(N.SCRIPT_REVERTED, o, A);
}, iy = class extends Error {
  constructor() {
    super(...arguments);
    S(this, "name", "ChangeOutputCollisionError");
    S(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, Op = class extends Error {
  constructor(t) {
    super();
    S(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, oy = class extends Error {
  constructor(t) {
    super();
    S(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, tr = (e) => e.type === me.Coin, ho = (e) => e.type === me.Message, jn = (e) => tr(e) || ho(e), Lp = (e) => tr(e) ? e.owner : e.recipient, Ua = (e, t) => Lp(e) === t.toB256(), kp = (e, t, n) => e.filter(jn).reduce((r, s) => tr(s) && s.assetId === t || ho(s) && t === n ? r.add(s.amount) : r, B(0)), ay = (e) => e.filter(jn).reduce(
  (t, n) => (tr(n) ? t.utxos.push(n.id) : t.messages.push(n.nonce), t),
  {
    utxos: [],
    messages: []
  }
), Pp = (e, t) => e.reduce(
  (n, r) => (tr(r) && r.owner === t.toB256() ? n.utxos.push(r.id) : ho(r) && r.recipient === t.toB256() && n.messages.push(r.nonce), n),
  {
    utxos: [],
    messages: []
  }
), Up = (e) => {
  const t = Y(e);
  return {
    data: z(t),
    dataLength: t.length
  };
}, go = class {
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
    this.tip = e ? B(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = _n(r) ? B(r) : void 0, this.maxFee = B(n), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [], { tip: r, witnessLimit: s, maturity: i } = e;
    return B(r).gt(0) && (t += St.Tip, n.push({ data: B(r), type: St.Tip })), _n(s) && B(s).gte(0) && (t += St.WitnessLimit, n.push({ data: B(s), type: St.WitnessLimit })), i && i > 0 && (t += St.Maturity, n.push({ data: i, type: St.Maturity })), t += St.MaxFee, n.push({ data: e.maxFee, type: St.MaxFee }), {
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
    var i, o, d;
    const e = ((i = this.inputs) == null ? void 0 : i.map(Cp)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(Bp)) ?? [], n = ((d = this.witnesses) == null ? void 0 : d.map(Up)) ?? [], { policyTypes: r, policies: s } = go.getPolicyMeta(this);
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
    return new pn().encode(this.toTransaction());
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
      throw new Op(e);
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
      (e) => e.type === me.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (e) => e.type === be.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === be.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = cr(e), n = this.inputs.find((r) => {
      switch (r.type) {
        case me.Coin:
          return z(r.owner) === t.toB256();
        case me.Message:
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
    const { assetId: t, owner: n, amount: r, id: s, predicate: i } = e;
    let o;
    e.predicate ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(n), typeof o != "number" && (o = this.addEmptyWitness()));
    const d = {
      id: s,
      type: me.Coin,
      owner: n.toB256(),
      amount: r,
      assetId: t,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: o,
      predicate: i
    };
    this.pushInput(d), this.addChangeOutput(n, t);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * asset against the message
   *
   * @param message - Message resource.
   */
  addMessageInput(e) {
    const { recipient: t, sender: n, amount: r, predicate: s, nonce: i, assetId: o } = e;
    let d;
    e.predicate ? d = 0 : (d = this.getCoinInputWitnessIndexByOwner(t), typeof d != "number" && (d = this.addEmptyWitness()));
    const A = {
      nonce: i,
      type: me.Message,
      sender: n.toB256(),
      recipient: t.toB256(),
      amount: r,
      witnessIndex: d,
      predicate: s
    };
    this.pushInput(A), this.addChangeOutput(t, o);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return _p(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
      type: be.Coin,
      to: cr(e).toB256(),
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
    return t.map(uo).forEach((n) => {
      this.pushOutput({
        type: be.Coin,
        to: cr(e).toB256(),
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
      type: be.Change,
      to: cr(e).toB256(),
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
    return tu({
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
      (o, d) => o + d.dataLength,
      0
    );
    return fo({
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
      const d = r(i);
      let A = o;
      i === t && (A = B("1000000000000000000")), d && "assetId" in d ? (d.id = z(kt(ui)), d.amount = A) : this.addResources([
        {
          id: z(kt(ui)),
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
    return Dp(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(jn).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(e) {
    this.inputs.forEach((t) => {
      let n;
      switch (t.type) {
        case me.Coin:
          n = e.find((r) => r.type === me.Coin && r.owner === t.owner);
          break;
        case me.Message:
          n = e.find(
            (r) => r.type === me.Message && r.sender === t.sender
          );
          break;
        default:
          return;
      }
      n && "predicateGasUsed" in n && B(n.predicateGasUsed).gt(0) && (t.predicate = n.predicate, t.predicateData = n.predicateData, t.predicateGasUsed = n.predicateGasUsed);
    });
  }
};
function iu(e, t) {
  const n = e.toTransaction();
  n.type === Oe.Script && (n.receiptsRoot = Ne), n.inputs = n.inputs.map((i) => {
    const o = Lt(i);
    switch (o.type) {
      case me.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = B(0), o;
      case me.Message:
        return o.predicateGasUsed = B(0), o;
      case me.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = Ne, o.outputIndex = 0, o.balanceRoot = Ne, o.stateRoot = Ne, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = Lt(i);
    switch (o.type) {
      case be.Contract:
        return o.balanceRoot = Ne, o.stateRoot = Ne, o;
      case be.Change:
        return o.amount = B(0), o;
      case be.Variable:
        return o.to = Ne, o.amount = B(0), o.assetId = Ne, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = N0(t), s = ie([r, new pn().encode(n)]);
  return mt(s);
}
var Gp = (e) => {
  const t = new Uint8Array(32);
  return t.set(Y(e)), t;
}, Xp = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: z(t),
    value: z(Gp(n))
  };
}, vi = class extends go {
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(Xp)) ?? [];
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
      (t) => t.type === be.ContractCreated
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
    return iu(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, n) {
    this.pushOutput({
      type: be.ContractCreated,
      contractId: t,
      stateRoot: n
    });
  }
  metadataGas(t) {
    return nu({
      contractBytesSize: B(Y(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Ga = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Y("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Yp = {
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
  bytes: Y("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, kn = class extends go {
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
    this.gasLimit = B(r), this.script = Y(t ?? Ga.bytes), this.scriptData = Y(n ?? Ga.encodeScriptData()), this.abis = s.abis;
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
    const t = Y(this.script ?? "0x"), n = Y(this.scriptData ?? "0x");
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
      (t) => t.type === me.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (t) => t.type === be.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === be.Variable
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
        type: be.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  calculateMaxGas(t, n) {
    const { consensusParameters: r } = t, {
      feeParameters: { gasPerByte: s },
      txParameters: { maxGasPerTx: i }
    } = r, o = this.toTransaction().witnesses.reduce(
      (d, A) => d + A.dataLength,
      0
    );
    return fo({
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
    const n = cr(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: me.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: be.Contract,
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
    return iu(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new Jt(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return ru({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, wt = (e) => {
  if (e instanceof kn || e instanceof vi)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case Oe.Script:
      return kn.from(e);
    case Oe.Create:
      return vi.from(e);
    default:
      throw new v(N.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, Vp = (e) => {
  var L;
  const {
    gasPrice: t,
    rawPayload: n,
    tip: r,
    totalFee: s,
    consensusParameters: { gasCosts: i, feeParams: o, maxGasPerTx: d }
  } = e;
  if (s)
    return s;
  const A = B(o.gasPerByte), h = B(o.gasPriceFactor), b = Y(n), [I] = new pn().decode(b, 0), { type: _, witnesses: x, inputs: R, policies: C } = I;
  let M = B(0), F = B(0);
  if (_ !== Oe.Create && _ !== Oe.Script)
    return B(0);
  if (_ === Oe.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: q } = I, V = B(Y(x[U].data).length);
    M = nu({
      contractBytesSize: V,
      gasCosts: i,
      stateRootSize: q.length || 0,
      txBytesSize: b.length
    });
  } else {
    const { scriptGasLimit: U } = I;
    U && (F = U), M = ru({
      gasCosts: i,
      txBytesSize: b.length
    });
  }
  const X = tu({
    gasCosts: i,
    gasPerByte: B(A),
    inputs: R,
    metadataGas: M,
    txBytesSize: b.length
  }), k = (L = C.find((U) => U.type === St.WitnessLimit)) == null ? void 0 : L.data, Z = x.reduce((U, q) => U + q.dataLength, 0), O = fo({
    gasPerByte: A,
    minGas: X,
    witnessesLength: Z,
    gasLimit: F,
    witnessLimit: k,
    maxGasPerTx: d
  });
  return _i({
    gasPrice: t,
    gas: O,
    priceFactor: h,
    tip: r
  });
}, zp = ({ abi: e, receipt: t }) => {
  var b;
  const n = new Jt(e), r = t.param1.toHex(8), s = n.getFunction(r), i = s.jsonFn.inputs, o = t.param2.toHex();
  let d;
  const A = s.decodeArguments(o);
  return A && (d = i.reduce((I, _, x) => {
    const R = A[x], C = _.name;
    return C ? {
      ...I,
      // reparse to remove bn
      [C]: JSON.parse(JSON.stringify(R))
    } : I;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: d,
    ...(b = t.amount) != null && b.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function Hp(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function po(e, t) {
  return e.filter((n) => n.type === t);
}
function Zp(e) {
  return po(e, me.Coin);
}
function Jp(e) {
  return po(e, me.Message);
}
function Wp(e) {
  return Hp(e, [me.Coin, me.Message]);
}
function qp(e) {
  return po(e, me.Contract);
}
function ou(e, t) {
  const n = Zp(e), r = Jp(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function jp(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== me.Contract)
      throw new v(
        N.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function mo(e) {
  return e.type === me.Coin ? e.owner.toString() : e.type === me.Message ? e.recipient.toString() : "";
}
function xr(e, t) {
  return e.filter((n) => n.type === t);
}
function $p(e) {
  return xr(e, be.ContractCreated);
}
function au(e) {
  return xr(e, be.Coin);
}
function Kp(e) {
  return xr(e, be.Change);
}
function em(e) {
  return xr(e, be.Contract);
}
function cy(e) {
  return xr(e, be.Variable);
}
var tm = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e))(tm || {}), nm = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(nm || {}), rm = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(rm || {}), sm = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(sm || {}), im = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(im || {});
function yr(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function cu(e) {
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
function vr(e, t) {
  return cu(e) === t;
}
function om(e) {
  return vr(
    e,
    "Mint"
    /* Mint */
  );
}
function du(e) {
  return vr(
    e,
    "Create"
    /* Create */
  );
}
function uu(e) {
  return vr(
    e,
    "Script"
    /* Script */
  );
}
function am(e) {
  return vr(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function cm(e) {
  return vr(
    e,
    "Upload"
    /* Upload */
  );
}
function dy(e) {
  return (t) => e.assetId === t.assetId;
}
function dm(e) {
  return yr(e, de.Call);
}
function um(e) {
  return yr(e, de.MessageOut);
}
var Am = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((d) => d.assetId === o.assetId)
  );
  return n.map((o) => {
    const d = r.find((h) => h.assetId === o.assetId);
    if (!d)
      return o;
    const A = B(o.amount).add(d.amount);
    return { ...o, amount: A };
  }).concat(s);
};
function lm(e, t) {
  var n, r, s, i, o, d, A, h;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((d = t.from) == null ? void 0 : d.type) && ((A = e.to) == null ? void 0 : A.type) === ((h = t.to) == null ? void 0 : h.type);
}
function $n(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((d) => lm(d, t));
  if (n[r]) {
    const d = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (d.assetsSent = (i = d.assetsSent) != null && i.length ? Am(d, t) : t.assetsSent), (o = t.calls) != null && o.length && (d.calls = [...d.calls || [], ...t.calls]), n[r] = d;
  } else
    n.push(t);
  return n;
}
function uy(e) {
  return yr(e, de.TransferOut);
}
function fm({
  inputs: e,
  receipts: t
}) {
  return um(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", d = ou(e, o);
      if (d) {
        const A = mo(d);
        return $n(s, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: A
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
function hm({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = dm(n);
  return em(t).reduce((h, b) => {
    const I = jp(e, b.inputIndex);
    return I ? o.reduce((x, R) => {
      var C;
      if (R.to === I.contractID) {
        const M = ou(e, R.assetId);
        if (M) {
          const F = mo(M), X = [], k = r == null ? void 0 : r[I.contractID];
          return k && X.push(
            zp({
              abi: k,
              receipt: R,
              rawPayload: s,
              maxInputs: i
            })
          ), $n(x, {
            name: "Contract call",
            from: {
              type: 1,
              address: F
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
            calls: X
          });
        }
      }
      return x;
    }, h) : h;
  }, []);
}
function gm(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const d = t.some((h) => h.contractID === r) ? 0 : 1;
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
      type: d,
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
function Xa({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = au(t), i = qp(e), o = Kp(t);
  s.forEach((h) => {
    const { amount: b, assetId: I, to: _ } = h, x = o.find((R) => R.assetId === I);
    x && (r = $n(r, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: x.to
      },
      to: {
        type: 1,
        address: _
      },
      assetsSent: [
        {
          assetId: I,
          amount: b
        }
      ]
    }));
  });
  const d = yr(
    n,
    de.Transfer
  ), A = yr(
    n,
    de.TransferOut
  );
  return [...d, ...A].forEach((h) => {
    const b = gm(h, i, o);
    r = $n(r, b);
  }), r;
}
function pm(e) {
  return au(e).reduce((r, s) => $n(r, {
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
function mm({ inputs: e, outputs: t }) {
  const n = $p(t), r = Wp(e)[0], s = mo(r);
  return n.reduce((o, d) => $n(o, {
    name: "Contract created",
    from: {
      type: 1,
      address: s
    },
    to: {
      type: 0,
      address: (d == null ? void 0 : d.contractId) || ""
    }
  }), []);
}
function wm({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return du(e) ? [
    ...mm({ inputs: t, outputs: n }),
    ...Xa({ inputs: t, outputs: n, receipts: r })
  ] : uu(e) ? [
    ...Xa({ inputs: t, outputs: n, receipts: r }),
    ...hm({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...fm({ inputs: t, receipts: r })
  ] : [...pm(n)];
}
var an = (e) => {
  const t = Rp(e);
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
}, ym = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, Im = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, bm = (e) => {
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
}, Em = (e) => {
  let t, n, r, s, i, o = !1, d = !1, A = !1;
  if (e != null && e.type)
    switch (r = bm(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, n = e.block.id, d = !0, s = B(e.totalFee), i = B(e.totalGas);
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
    isStatusSuccess: d,
    isStatusPending: A
  };
};
function Cs(e) {
  var a, c;
  const {
    id: t,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: d,
    abiMap: A = {},
    maxInputs: h,
    gasCosts: b,
    maxGasPerTx: I,
    gasPrice: _
  } = e, x = eu(n), R = z(o), C = wm({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: R,
    abiMap: A,
    maxInputs: h
  }), M = cu(i.type), F = B((c = (a = i.policies) == null ? void 0 : a.find((l) => l.type === St.Tip)) == null ? void 0 : c.data), { isStatusFailure: X, isStatusPending: k, isStatusSuccess: Z, blockId: O, status: T, time: L, totalFee: U } = Em(d), q = Vp({
    totalFee: U,
    gasPrice: _,
    rawPayload: R,
    tip: F,
    consensusParameters: {
      gasCosts: b,
      maxGasPerTx: I,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), V = ym(n), H = Im(n);
  let ee;
  return L && (ee = Oi.fromTai64(L)), {
    id: t,
    tip: F,
    fee: q,
    gasUsed: x,
    operations: C,
    type: M,
    blockId: O,
    time: L,
    status: T,
    receipts: n,
    mintedAssets: V,
    burnedAssets: H,
    isTypeMint: om(i.type),
    isTypeCreate: du(i.type),
    isTypeScript: uu(i.type),
    isTypeUpgrade: am(i.type),
    isTypeUpload: cm(i.type),
    isStatusFailure: X,
    isStatusSuccess: Z,
    isStatusPending: k,
    date: ee,
    transaction: i
  };
}
function Au(e, t, n = {}) {
  return e.reduce((r, s) => {
    if (s.type === de.LogData || s.type === de.Log) {
      const i = new Jt(n[s.id] || t), o = s.type === de.Log ? new D("u64").encode(s.val0) : s.data, [d] = i.decodeLog(o, s.val1.toNumber());
      r.push(d);
    }
    return r;
  }, []);
}
var jr = class {
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
    const r = new jr(e, t, n);
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
    return (t = new pn().decode(
      Y(e.rawPayload),
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
    const s = r.map(an) || [], { gasPerByte: i, gasPriceFactor: o, gasCosts: d, maxGasPerTx: A } = this.provider.getGasConfig(), h = await this.provider.getLatestGasPrice(), b = this.provider.getChain().consensusParameters.txParameters.maxInputs;
    return Cs({
      id: this.id,
      receipts: s,
      transaction: n,
      transactionBytes: Y(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: i,
      gasPriceFactor: o,
      abiMap: e,
      maxInputs: b,
      gasCosts: d,
      maxGasPerTx: A,
      gasPrice: h
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
    await this.waitForStatusChange();
    const t = await this.getTransactionSummary(e), n = {
      gqlTransaction: this.gqlTransaction,
      ...t
    };
    let r = [];
    if (this.abis && (r = Au(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), n.logs = r), n.isStatusFailure) {
      const {
        receipts: s,
        gqlTransaction: { status: i }
      } = n;
      throw su({
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
function Cm(e, t) {
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
function lu(e, t, n = 0) {
  return t === void 0 ? e : async (...r) => {
    var s;
    try {
      return await e(...r);
    } catch (i) {
      const o = i;
      if (((s = o.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw o;
      const d = n + 1;
      if (d > t.maxRetries)
        throw o;
      const A = Cm(t, d);
      return await Tp(A), lu(e, t, d)(...r);
    }
  };
}
var Bm = (...e) => {
  const t = {};
  function n({ amount: r, assetId: s }) {
    t[s] ? t[s] = t[s].add(r) : t[s] = r;
  }
  return e.forEach((r) => r.forEach(n)), Object.entries(t).map(([r, s]) => ({ assetId: r, amount: s }));
}, Ya = 10, _m = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, {
    contractParams: i,
    feeParams: o,
    predicateParams: d,
    scriptParams: A,
    txParams: h,
    gasCosts: b,
    baseAssetId: I,
    chainId: _,
    version: x
  } = r;
  return {
    name: t,
    baseChainHeight: B(n),
    consensusParameters: {
      version: x,
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
        version: d.version,
        maxPredicateLength: B(d.maxPredicateLength),
        maxPredicateDataLength: B(d.maxPredicateDataLength),
        maxGasPerPredicate: B(d.maxGasPerPredicate),
        maxMessageDataLength: B(d.maxMessageDataLength)
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
}, Ri, fu, Ft = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, on(this, Ri), De(this, "operations"), De(this, "cache"), De(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new Ep(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    Ft.nodeInfoCache = {}, Ft.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return lu(async (...r) => {
      const s = r[0], i = r[1], o = n ? AbortSignal.timeout(n) : void 0;
      let d = { ...i, signal: o };
      return e.requestMiddleware && (d = await e.requestMiddleware(d)), e.fetch ? e.fetch(s, d, e) : fetch(s, d);
    }, t);
  }
  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   */
  static async create(e, t = {}) {
    const n = new Ft(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const e = Ft.chainInfoCache[this.url];
    if (!e)
      throw new v(
        N.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const e = Ft.nodeInfoCache[this.url];
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
    return Ft.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = zu(e.nodeVersion);
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
   */
  createOperations() {
    const e = Ft.getFetchFn(this.options), t = new qf.GraphQLClient(this.url, {
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
    return Ip((r, s) => {
      const i = r.definitions.find((d) => d.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new Kd({
        url: this.url,
        query: r,
        fetchFn: (d, A) => e(d, A, this.options),
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
    return B(e.latestBlock.height, 10);
  }
  /**
   * Returns the chain information.
   * @param url - The URL of the Fuel node
   * @returns NodeInfo object
   */
  async fetchNode() {
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = {
      maxDepth: B(e.maxDepth),
      maxTx: B(e.maxTx),
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace
    };
    return Ft.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = _m(e);
    return Ft.chainInfoCache[this.url] = t, t;
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
   * Returns the base asset ID for the current provider network
   *
   * @returns the base asset ID
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
   * @returns A promise that resolves to the transaction response object.
   */
  // #region Provider-sendTransaction
  async sendTransaction(e, { estimateTxDependencies: t = !0, awaitExecution: n = !1 } = {}) {
    const r = wt(e);
    Bi(this, Ri, fu).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = z(r.toTransactionBytes());
    let i;
    if (r.type === Oe.Script && (i = r.abis), n) {
      const d = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: b } of d) {
        if (b.type === "SqueezedOutStatus")
          throw new v(
            N.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${b.reason}`
          );
        if (b.type !== "SubmittedStatus")
          break;
      }
      const A = r.getTransactionId(this.getChainId()), h = new jr(A, this, i);
      return await h.fetch(), h;
    }
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: s });
    return new jr(o, this, i);
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
    const r = wt(e);
    if (n)
      return this.estimateTxDependencies(r);
    const s = z(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: t || !1
    }), [{ receipts: o, status: d }] = i;
    return { receipts: o.map(an), dryRunStatus: d };
  }
  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(e) {
    if (!!!e.inputs.find(
      (i) => "predicate" in i && i.predicate && !cd(Y(i.predicate), Y("0x")) && new Fe(i.predicateGasUsed).isZero()
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
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise.
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
    for (let i = 0; i < Ya; i++) {
      const {
        dryRun: [{ receipts: o, status: d }]
      } = await this.operations.dryRun({
        encodedTransactions: [z(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(an), s = d;
      const { missingOutputVariables: A, missingOutputContractIds: h } = Pa(t);
      if (A.length !== 0 || h.length !== 0) {
        r += A.length, e.addVariableOutputs(A.length), h.forEach(({ contractId: _ }) => {
          e.addContractInputAndOutput(ue.fromString(_)), n.push(_);
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
    })), n = Lt(e), r = /* @__PURE__ */ new Map();
    n.forEach((o, d) => {
      o.type === Oe.Script && r.set(d, z(o.toTransactionBytes()));
    });
    let s = Array.from(r.keys()), i = 0;
    for (; s.length > 0 && i < Ya; ) {
      const o = s.map(
        (h) => r.get(h)
      ), d = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), A = [];
      for (let h = 0; h < d.dryRun.length; h++) {
        const b = s[h], { receipts: I, status: _ } = d.dryRun[h], x = t[b];
        x.receipts = I.map(an), x.dryRunStatus = _;
        const { missingOutputVariables: R, missingOutputContractIds: C } = Pa(
          x.receipts
        ), M = R.length > 0 || C.length > 0, F = n[b];
        if (M && (F == null ? void 0 : F.type) === Oe.Script) {
          x.outputVariables += R.length, F.addVariableOutputs(R.length), C.forEach(({ contractId: k }) => {
            F.addContractInputAndOutput(ue.fromString(k)), x.missingContractIds.push(k);
          });
          const { maxFee: X } = await this.estimateTxGasAndFee({
            transactionRequest: F
          });
          F.maxFee = X, r.set(b, z(F.toTransactionBytes())), A.push(b);
        }
      }
      s = A, i += 1;
    }
    return t;
  }
  async dryRunMultipleTransactions(e, { utxoValidation: t, estimateTxDependencies: n = !0 } = {}) {
    if (n)
      return this.estimateMultipleTxDependencies(e);
    const r = e.map((o) => z(o.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: r,
      utxoValidation: t || !1
    });
    return s.map(({ receipts: o, status: d }) => ({ receipts: o.map(an), dryRunStatus: d }));
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
    const d = _i({
      gasPrice: B(n),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let A = B(0);
    t.type === Oe.Script && (A = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(r, o)
    ), A = t.gasLimit));
    const h = t.calculateMaxGas(r, o), b = _i({
      gasPrice: B(n),
      gas: h,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: d,
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
      const { id: d, receipts: A, status: h } = o, b = A.map(an);
      return { id: d, receipts: b, status: h };
    })[0].receipts };
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
  async getTransactionCost(e, { resourcesOwner: t, signatureCallback: n, quantitiesToContract: r = [] } = {}) {
    const s = Lt(wt(e)), i = s.type === Oe.Script, o = this.getBaseAssetId(), d = s.maxFee.eq(0), A = s.getCoinOutputsQuantities(), h = Bm(A, r);
    s.fundWithFakeUtxos(h, o, t == null ? void 0 : t.address), i && (s.gasLimit = B(0)), t && "populateTransactionPredicateData" in t && t.populateTransactionPredicateData(s);
    const b = Lt(s);
    let I = 0;
    if (n && i) {
      const L = b.witnesses.length;
      await n(b), I = b.witnesses.length - L;
    }
    await this.estimatePredicates(b), s.updatePredicateGasUsed(b.inputs);
    let { maxFee: _, maxGas: x, minFee: R, minGas: C, gasPrice: M, gasLimit: F } = await this.estimateTxGasAndFee({
      transactionRequest: b
    }), X = [], k, Z = [], O = 0, T = B(0);
    return s.maxFee = _, i && (s.gasLimit = F, n && await n(s), { receipts: X, missingContractIds: Z, outputVariables: O, dryRunStatus: k } = await this.estimateTxDependencies(s), T = i ? eu(X) : T, s.gasLimit = T, { maxFee: _, maxGas: x, minFee: R, minGas: C, gasPrice: M } = await this.estimateTxGasAndFee({
      transactionRequest: s,
      gasPrice: M
    })), {
      requiredQuantities: h,
      receipts: X,
      gasUsed: T,
      gasPrice: M,
      minGas: C,
      maxGas: x,
      minFee: R,
      maxFee: _,
      outputVariables: O,
      missingContractIds: Z,
      addedSignatures: I,
      estimatedPredicates: s.inputs,
      dryRunStatus: k,
      updateMaxFee: d
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = ue.fromAddressOrString(e), s = wt(Lt(t)), i = await this.getTransactionCost(s, {
      quantitiesToContract: n
    });
    s.addResources(
      await this.getResourcesToSpend(r, i.requiredQuantities)
    );
    const { requiredQuantities: o, ...d } = await this.getTransactionCost(s, {
      quantitiesToContract: n
    });
    return {
      resources: await this.getResourcesToSpend(r, o),
      requiredQuantities: o,
      ...d
    };
  }
  /**
   * Returns coins for the given owner.
   */
  async getCoins(e, t, n) {
    const r = ue.fromAddressOrString(e);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: t && z(t) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: B(o.amount),
      owner: ue.fromAddressOrString(o.owner),
      blockCreated: B(o.blockCreated),
      txCreatedIdx: B(o.txCreatedIdx)
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
    var A, h, b;
    const r = ue.fromAddressOrString(e), s = {
      messages: ((A = n == null ? void 0 : n.messages) == null ? void 0 : A.map((I) => z(I))) || [],
      utxos: ((h = n == null ? void 0 : n.utxos) == null ? void 0 : h.map((I) => z(I))) || []
    };
    if (this.cache) {
      const I = new Set(
        s.utxos.concat((b = this.cache) == null ? void 0 : b.getActiveData().map((_) => z(_)))
      );
      s.utxos = Array.from(I);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(uo).map(({ assetId: I, amount: _, max: x }) => ({
        assetId: z(I),
        amount: _.toString(10),
        max: x ? x.toString(10) : void 0
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
            sender: ue.fromAddressOrString(I.sender),
            recipient: ue.fromAddressOrString(I.recipient),
            nonce: I.nonce
          };
        case "Coin":
          return {
            id: I.utxoId,
            amount: B(I.amount),
            assetId: I.assetId,
            owner: ue.fromAddressOrString(I.owner),
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
   * @returns A promise that resolves to the block.
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
          return (s = new pn().decode(Y(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new pn().decode(
      Y(t.rawPayload),
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
      contract: ue.fromAddressOrString(e).toB256(),
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
      owner: ue.fromAddressOrString(e).toB256(),
      assetId: z(t)
    });
    return B(n.amount, 10);
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
      filter: { owner: ue.fromAddressOrString(e).toB256() }
    })).balances.edges.map((s) => s.node).map((s) => ({
      assetId: s.assetId,
      amount: B(s.amount)
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
      owner: ue.fromAddressOrString(e).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: gr.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: B(s.amount),
        data: s.data
      }),
      sender: ue.fromAddressOrString(s.sender),
      recipient: ue.fromAddressOrString(s.recipient),
      nonce: s.nonce,
      amount: B(s.amount),
      data: gr.decodeData(s.data),
      daHeight: B(s.daHeight)
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
      messageBlockHeader: d,
      commitBlockHeader: A,
      blockProof: h,
      sender: b,
      recipient: I,
      amount: _,
      data: x
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
        id: d.id,
        daHeight: B(d.daHeight),
        transactionsCount: Number(d.transactionsCount),
        transactionsRoot: d.transactionsRoot,
        height: B(d.height),
        prevRoot: d.prevRoot,
        time: d.time,
        applicationHash: d.applicationHash,
        messageReceiptCount: Number(d.messageReceiptCount),
        messageOutboxRoot: d.messageOutboxRoot,
        consensusParametersVersion: Number(d.consensusParametersVersion),
        eventInboxRoot: d.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(d.stateTransitionBytecodeVersion)
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
      sender: ue.fromAddressOrString(b),
      recipient: ue.fromAddressOrString(I),
      nonce: t,
      amount: B(_),
      data: x
    };
  }
  async getLatestGasPrice() {
    const { latestGasPrice: e } = await this.operations.getLatestGasPrice();
    return B(e.gasPrice);
  }
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
   * @param amount - The amount of blocks to produce
   * @param startTime - The UNIX timestamp (milliseconds) to set for the first produced block
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(e, t) {
    const { produceBlocks: n } = await this.operations.produceBlocks({
      blocksToProduce: B(e).toString(10),
      startTimestamp: t ? Oi.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return B(n);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new jr(e, this);
  }
  /**
   * Returns Message for given nonce.
   *
   * @param nonce - The nonce of the message to retrieve.
   * @returns A promise that resolves to the Message object.
   */
  async getMessageByNonce(e) {
    const { message: t } = await this.operations.getMessageByNonce({ nonce: e });
    return t || null;
  }
  async getRelayedTransactionStatus(e) {
    const { relayedTransactionStatus: t } = await this.operations.getRelayedTransactionStatus({
      relayedTransactionId: e
    });
    return t || null;
  }
}, ds = Ft;
Ri = /* @__PURE__ */ new WeakSet();
fu = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === me.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
De(ds, "chainInfoCache", {});
De(ds, "nodeInfoCache", {});
async function Ay(e) {
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new v(
      N.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new pn().decode(
    Y(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const d = o.map(an), {
    consensusParameters: {
      feeParameters: { gasPerByte: A, gasPriceFactor: h },
      txParameters: { maxInputs: b, maxGasPerTx: I },
      gasCosts: _
    }
  } = n.getChain(), x = await n.getLatestGasPrice(), R = Cs({
    id: s.id,
    receipts: d,
    transaction: i,
    transactionBytes: Y(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: B(A),
    gasPriceFactor: B(h),
    abiMap: r,
    maxInputs: b,
    gasCosts: _,
    maxGasPerTx: I,
    gasPrice: x
  });
  return {
    gqlTransaction: s,
    ...R
  };
}
async function ly(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: d, maxGasPerTx: A } = t.getGasConfig(), h = t.getChain().consensusParameters.txParameters.maxInputs, b = n.toTransaction(), I = n.toTransactionBytes(), _ = await t.getLatestGasPrice();
  return Cs({
    receipts: s,
    transaction: b,
    transactionBytes: I,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: h,
    gasCosts: d,
    maxGasPerTx: A,
    gasPrice: _
  });
}
async function fy(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: {
      feeParameters: { gasPerByte: d, gasPriceFactor: A },
      txParameters: { maxInputs: h, maxGasPerTx: b },
      gasCosts: I
    }
  } = n.getChain(), _ = await n.getLatestGasPrice();
  return {
    transactions: i.map((R) => {
      const { node: C } = R, { id: M, rawPayload: F, status: X } = C, [k] = new pn().decode(Y(F), 0);
      let Z = [];
      C != null && C.status && "receipts" in C.status && (Z = C.status.receipts);
      const O = Z.map(an), T = Cs({
        id: M,
        receipts: O,
        transaction: k,
        transactionBytes: Y(F),
        gqlTransactionStatus: X,
        abiMap: r,
        gasPerByte: d,
        gasPriceFactor: A,
        maxInputs: h,
        gasCosts: I,
        maxGasPerTx: b,
        gasPrice: _
      });
      return {
        gqlTransaction: C,
        ...T
      };
    }),
    pageInfo: o
  };
}
var Fn = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    beta5: 0,
    devnet: 10
  }
}, xm = (e) => {
  if (e === "ethereum")
    return Fn.eth.sepolia;
  if (e === "fuel")
    return Fn.fuel.beta5;
}, vm = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), hu = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? xm(n);
  if (i === void 0)
    return;
  const o = vm({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, hy = (e, t) => hu({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), gy = (e, t) => hu({
  asset: e,
  networkType: "fuel",
  chainId: t
}), Rm = "/", Sm = /^\/|\/$/g, Qm = (e = "") => e.replace(Sm, "");
function Nm(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(Qm);
  return r && n && s.unshift(""), s.join(Rm);
}
function Dm(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: Nm(t, n.icon)
  }));
}
var Tm = "https://cdn.fuel.network/assets/", Fm = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: Fn.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: Fn.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: Fn.fuel.beta5,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        type: "fuel",
        chainId: Fn.fuel.devnet,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
], py = Dm(Fm, Tm), Mm = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new D("u64").encode(new Fe(n).toNumber());
  return Uint8Array.from([
    ...Y(r),
    ...i,
    ...Y(t)
  ]);
}, Om = async (e) => {
  const t = Mm(e);
  await oo();
  const n = fh(16, 0, gh.ScriptData), r = xa(17, 16, 32), s = yi(18, 17, 0), i = xa(19, 17, 8), o = lh(16, 18, 19), d = Nd(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...d.to_bytes()
  ]), scriptData: t };
}, Lm = 2, Bs = class extends Kc {
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
    S(this, "address");
    /**
     * The provider used to interact with the network.
     */
    S(this, "_provider");
    S(this, "_connector");
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
      throw new v(
        N.NOT_SUPPORTED,
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
      throw new v(
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
   * @returns The funded transaction request.
   */
  async fund(t, n) {
    var F;
    const { addedSignatures: r, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: o } = n, d = t.maxFee, A = this.provider.getBaseAssetId(), h = ((F = i.find((X) => X.assetId === A)) == null ? void 0 : F.amount) || B(0), b = mg({
      amount: B(d),
      assetId: A,
      coinQuantities: i
    }), I = {};
    b.forEach(({ amount: X, assetId: k }) => {
      I[k] = {
        required: X,
        owned: B(0)
      };
    }), t.inputs.filter(jn).forEach((X) => {
      const Z = tr(X) ? String(X.assetId) : A;
      I[Z] && (I[Z].owned = I[Z].owned.add(X.amount));
    });
    let _ = [];
    Object.entries(I).forEach(([X, { owned: k, required: Z }]) => {
      k.lt(Z) && _.push({
        assetId: X,
        amount: Z.sub(k)
      });
    });
    let x = _.length > 0, R = 0;
    for (; x && R < Lm; ) {
      const X = await this.getResourcesToSpend(
        _,
        Pp(t.inputs, this.address)
      );
      t.addResources(X), t.updatePredicateGasUsed(s);
      const k = Lt(t);
      if (r && Array.from({ length: r }).forEach(
        () => k.addEmptyWitness()
      ), !o)
        break;
      const { maxFee: Z } = await this.provider.estimateTxGasAndFee({
        transactionRequest: k
      }), O = kp(
        t.inputs,
        A,
        A
      ), T = h.add(Z);
      O.gt(T) ? x = !1 : _ = [
        {
          amount: T.sub(O),
          assetId: A
        }
      ], R += 1;
    }
    t.updatePredicateGasUsed(s);
    const C = Lt(t);
    if (r && Array.from({ length: r }).forEach(() => C.addEmptyWitness()), !o)
      return t;
    const { maxFee: M } = await this.provider.estimateTxGasAndFee({
      transactionRequest: C
    });
    return t.maxFee = M, t;
  }
  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, tip, maturity, maxFee, witnessLimit).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(t, n, r, s = {}) {
    let i = new kn(s);
    const o = r ?? this.provider.getBaseAssetId();
    i.addCoinOutput(ue.fromAddressOrString(t), n, o);
    const d = await this.provider.getTransactionCost(i, {
      estimateTxDependencies: !0,
      resourcesOwner: this
    });
    return i = this.validateGasLimitAndMaxFee({
      transactionRequest: i,
      gasUsed: d.gasUsed,
      maxFee: d.maxFee,
      txParams: s
    }), await this.fund(i, d), i;
  }
  /**
   * Transfers coins to a destination address.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, maturity).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(t, n, r, s = {}) {
    if (B(n).lte(0))
      throw new v(
        N.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = r ?? this.provider.getBaseAssetId(), o = await this.createTransfer(t, n, i, s);
    return this.sendTransaction(o, { estimateTxDependencies: !1 });
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
  async transferToContract(t, n, r, s = {}) {
    if (B(n).lte(0))
      throw new v(
        N.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = ue.fromAddressOrString(t), o = r ?? this.provider.getBaseAssetId(), { script: d, scriptData: A } = await Om({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: B(n),
      assetId: o
    });
    let h = new kn({
      ...s,
      script: d,
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
   * @param txParams - The optional transaction parameters.
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(t, n, r = {}) {
    const s = ue.fromAddressOrString(t), i = Y(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = Y(
      "0x".concat(B(n).toHex().substring(2).padStart(16, "0"))
    ), A = { script: new Uint8Array([
      ...Y(Yp.bytes),
      ...i,
      ...o
    ]), ...r }, h = this.provider.getBaseAssetId();
    let b = new kn(A);
    const I = [{ amount: B(n), assetId: h }], _ = await this.provider.getTransactionCost(b, { quantitiesToContract: I });
    return b = this.validateGasLimitAndMaxFee({
      transactionRequest: b,
      gasUsed: _.gasUsed,
      maxFee: _.maxFee,
      txParams: r
    }), await this.fund(b, _), this.sendTransaction(b);
  }
  async signMessage(t) {
    if (!this._connector)
      throw new v(N.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
        N.MISSING_CONNECTOR,
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
   * @returns A promise that resolves to the call result.
   */
  async simulateTransaction(t, { estimateTxDependencies: n = !0 } = {}) {
    const r = wt(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.simulate(r, { estimateTxDependencies: !1 });
  }
  validateGasLimitAndMaxFee({
    gasUsed: t,
    maxFee: n,
    transactionRequest: r,
    txParams: { gasLimit: s, maxFee: i }
  }) {
    const o = wt(r);
    if (!_n(s))
      o.gasLimit = t;
    else if (t.gt(s))
      throw new v(
        N.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!_n(i))
      o.maxFee = n;
    else if (n.gt(i))
      throw new v(
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
    const t = Ht(e, 32);
    this.privateKey = z(t), this.publicKey = z(en.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = z(en.getPublicKey(t, !0)), this.address = ue.fromPublicKey(this.publicKey);
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
    const t = en.sign(Y(e), Y(this.privateKey)), n = Ht(`0x${t.r.toString(16)}`, 32), r = Ht(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, z(ie([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = en.ProjectivePoint.fromHex(Y(this.compressedPublicKey)), n = en.ProjectivePoint.fromHex(Y(e));
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
    const n = Y(t), r = n.slice(0, 32), s = n.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const d = new en.Signature(BigInt(z(r)), BigInt(z(s))).addRecoveryBit(
      i
    ).recoverPublicKey(Y(e)).toRawBytes(!1).slice(1);
    return z(d);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return ue.fromPublicKey(Kn.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? Zt(ie([kt(32), Y(e)])) : kt(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = en.ProjectivePoint.fromHex(Y(e));
    return z(t.toRawBytes(!1).slice(1));
  }
}, Va = 13, za = 8, Ha = 1, ti = 32, km = 16, Za = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function Pm(e, t, n) {
  const r = dn(Za(e), "hex"), s = ue.fromAddressOrString(t), i = kt(ti), o = Oc({
    password: dn(n),
    salt: i,
    dklen: ti,
    n: 2 ** Va,
    r: za,
    p: Ha
  }), d = kt(km), A = await R0(r, o, d), h = Uint8Array.from([...o.subarray(16, 32), ...A]), b = Lc(h), I = ar(b, "hex"), _ = {
    id: Zh(),
    version: 3,
    address: Za(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: I,
      cipherparams: { iv: ar(d, "hex") },
      ciphertext: ar(A, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: ti,
        n: 2 ** Va,
        p: Ha,
        r: za,
        salt: ar(i, "hex")
      }
    }
  };
  return JSON.stringify(_);
}
async function Um(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: d, r: A, p: h, salt: b }
    }
  } = n, I = dn(s, "hex"), _ = dn(i, "hex"), x = dn(b, "hex"), R = dn(t), C = Oc({
    password: R,
    salt: x,
    n: d,
    p: h,
    r: A,
    dklen: o
  }), M = Uint8Array.from([...C.subarray(16, 32), ...I]), F = Lc(M), X = ar(F, "hex");
  if (r !== X)
    throw new v(
      N.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const k = await v0(I, C, _);
  return z(k);
}
var gu = class extends Bs {
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
    const n = await this.signer().sign(D0(t));
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
  async encrypt(t) {
    return Pm(this.privateKey, this.address, t);
  }
};
De(gu, "defaultPath", "m/44'/1179993420'/0'/0/0");
var Lr = [
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
], Gm = /* @__PURE__ */ ((e) => (e.english = "english", e))(Gm || {});
function Xm(e) {
  return (1 << e) - 1;
}
function pu(e) {
  return (1 << e) - 1 << 8 - e;
}
function ni(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function Ym(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function Vm(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & Xm(8 - n)), n += 3);
  const r = e.length / 4, s = Y(mt(e))[0] & pu(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function zm(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = Y(new Uint8Array(n));
  let s = 0;
  for (let h = 0; h < e.length; h += 1) {
    const b = t.indexOf(e[h].normalize("NFKD"));
    if (b === -1)
      throw new v(
        N.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[h]}' is not found in the provided wordlist.`
      );
    for (let I = 0; I < 11; I += 1)
      b & 1 << 10 - I && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, d = pu(o);
  if ((Y(mt(r.slice(0, i / 8)))[0] & d) !== (r[r.length - 1] & d))
    throw new v(
      N.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var Hm = Xn("Bitcoin seed"), Zm = "0x0488ade4", Jm = "0x04358394", Ja = [12, 15, 18, 21, 24];
function Wa(e) {
  if (e.length !== 2048)
    throw new v(
      N.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function Wm(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new v(
      N.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function ri(e) {
  if (!Ja.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${Ja.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new v(N.INVALID_MNEMONIC, t);
  }
}
var tn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = Lr) {
    S(this, "wordlist");
    this.wordlist = e, Wa(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return tn.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return tn.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = Lr) {
    const n = ni(e);
    return ri(n), z(zm(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = Lr) {
    const n = Y(e);
    return Wa(t), Wm(n), Vm(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    ri(ni(e));
    const n = Xn(Ym(e)), r = Xn(`mnemonic${t}`);
    return S0(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const n = tn.mnemonicToSeed(e, t);
    return tn.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = ni(e);
    let n = 0;
    try {
      ri(t);
    } catch {
      return !1;
    }
    for (; n < t.length; ) {
      if (tn.binarySearch(t[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = Lr;
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
    const t = Y(e);
    if (t.length < 16 || t.length > 64)
      throw new v(
        N.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return Y(kc("sha512", Hm, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = tn.masterKeysFromSeed(e), r = Y(t ? Jm : Zm), s = "0x00", i = "0x00000000", o = "0x00000000", d = n.slice(32), A = n.slice(0, 32), h = ie([
      r,
      s,
      i,
      o,
      d,
      ie(["0x00", A])
    ]), b = Li(mt(mt(h)), 0, 4);
    return lc(ie([h, b]));
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
    const n = t ? mt(ie([kt(e), Y(t)])) : kt(e);
    return tn.entropyToMnemonic(n);
  }
}, wo = tn, mu = 2147483648, wu = z("0x0488ade4"), yo = z("0x0488b21e"), yu = z("0x04358394"), Io = z("0x043587cf");
function qa(e) {
  return lc(ie([e, Li(mt(mt(e)), 0, 4)]));
}
function qm(e = !1, t = !1) {
  return e ? t ? Io : yo : t ? yu : wu;
}
function jm(e) {
  return [yo, Io].includes(z(e.slice(0, 4)));
}
function $m(e) {
  return [wu, yu, yo, Io].includes(
    z(e.slice(0, 4))
  );
}
function Km(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new v(N.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + mu : parseInt(r, 10)
  );
}
var Nn = class {
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
      const t = new Kn(e.privateKey);
      this.publicKey = z(t.compressedPublicKey), this.privateKey = z(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new v(
          N.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = z(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = Li(Q0(mt(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && Y(this.privateKey), n = Y(this.publicKey), r = Y(this.chainCode), s = new Uint8Array(37);
    if (e & mu) {
      if (!t)
        throw new v(
          N.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(Y(this.publicKey));
    s.set(Ht(e, 4), 33);
    const i = Y(kc("sha512", r, s)), o = i.slice(0, 32), d = i.slice(32);
    if (t) {
      const I = B(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new Nn({
        privateKey: I,
        chainCode: d,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const h = new Kn(z(o)).addPoint(n);
    return new Nn({
      publicKey: h,
      chainCode: d,
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
    return Km(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
    const n = qm(this.privateKey == null || e, t), r = z(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = Mi(this.index, 4), o = this.chainCode, d = this.privateKey != null && !e ? ie(["0x00", this.privateKey]) : this.publicKey, A = Y(ie([n, r, s, i, o, d]));
    return qa(A);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = wo.masterKeysFromSeed(e);
    return new Nn({
      chainCode: Y(t.slice(32)),
      privateKey: Y(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = z(Ht(hA(e))), n = Y(t), r = qa(n.slice(0, 78)) === e;
    if (n.length !== 82 || !$m(n))
      throw new v(N.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new v(N.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = z(n.slice(5, 9)), o = parseInt(z(n.slice(9, 13)).substring(2), 16), d = z(n.slice(13, 45)), A = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new v(
        N.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (jm(n)) {
      if (A[0] !== 3)
        throw new v(N.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Nn({
        publicKey: A,
        chainCode: d,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (A[0] !== 0)
      throw new v(N.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Nn({
      privateKey: A.slice(1),
      chainCode: d,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, si = Nn, Iu = class extends Bs {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new bt(e, this._provider);
  }
}, bt = class extends gu {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new Kn("0x00"), new Iu(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = Kn.generatePrivateKey(e == null ? void 0 : e.entropy);
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
    const s = si.fromSeed(e).derivePath(t || bt.defaultPath);
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
    const s = wo.mnemonicToSeed(e, n), o = si.fromSeed(s).derivePath(t || bt.defaultPath);
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
    const n = si.fromExtendedKey(e);
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
    const r = await Um(e, t);
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
    return new Iu(e, t);
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
var ew = class {
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
}, yn, bu = class {
  constructor(e) {
    on(this, yn, void 0), De(this, "pathKey", "{}"), De(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), De(this, "numberOfAccounts", 0), Nt(this, yn, e.secret || wo.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Re(this, yn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = Ct.fromMnemonic(Re(this, yn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Ct.fromMnemonic(Re(this, yn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = ue.fromAddressOrString(e);
    do {
      const r = Ct.fromMnemonic(Re(this, yn), this.getDerivePath(t));
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
yn = /* @__PURE__ */ new WeakMap();
De(bu, "type", "mnemonic");
var nn, Eu = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    on(this, nn, []), e.secret ? Nt(this, nn, [e.secret]) : Nt(this, nn, e.accounts || [Ct.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Re(this, nn)
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
    return Re(this, nn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Ct.generate();
    return Re(this, nn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = ue.fromAddressOrString(e), n = Re(this, nn).find(
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
nn = /* @__PURE__ */ new WeakMap();
De(Eu, "type", "privateKey");
var Xt = {
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
var yt, In, Mt, Si, Cu, Qi, Bu, _u = class extends Hd.EventEmitter {
  constructor(e) {
    super(), on(this, Si), on(this, Qi), De(this, "storage", new ew()), De(this, "STORAGE_KEY", "WalletManager"), on(this, yt, []), on(this, In, ""), on(this, Mt, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Re(this, Mt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    Yt(!Re(this, Mt), Xt.wallet_not_unlocked);
    const t = Re(this, yt).find((n, r) => r === e);
    return Yt(t, Xt.vault_not_found), t.vault.serialize();
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
    return Yt(n, Xt.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = ue.fromAddressOrString(e);
    Yt(!Re(this, Mt), Xt.wallet_not_unlocked);
    const n = Re(this, yt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return Yt(n, Xt.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Re(this, yt)[(e == null ? void 0 : e.vaultId) || 0];
    await Yt(t, Xt.vault_not_found);
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
    Nt(this, yt, Re(this, yt).concat({
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
    Nt(this, Mt, !0), Nt(this, yt, []), Nt(this, In, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Nt(this, In, e), Nt(this, Mt, !1);
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
    const n = Re(this, Mt);
    await this.unlock(e), Nt(this, In, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await Yt(!Re(this, Mt), Xt.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await _0(Re(this, In), JSON.parse(e));
      Nt(this, yt, Bi(this, Qi, Bu).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await Yt(!Re(this, Mt), Xt.wallet_not_unlocked);
    const e = await x0(Re(this, In), {
      vaults: Bi(this, Si, Cu).call(this, Re(this, yt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = _u.Vaults.find((n) => n.type === e);
    return Yt(t, Xt.invalid_vault_type), t;
  }
}, tw = _u;
yt = /* @__PURE__ */ new WeakMap();
In = /* @__PURE__ */ new WeakMap();
Mt = /* @__PURE__ */ new WeakMap();
Si = /* @__PURE__ */ new WeakSet();
Cu = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
Qi = /* @__PURE__ */ new WeakSet();
Bu = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
De(tw, "Vaults", [bu, Eu]);
var nw = class {
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
De(nw, "type");
var my = class {
}, rw = (e) => {
  const n = Y(e), r = cc(n, 16384), s = Zd(r.map((o) => z(o)));
  return Zt(ie(["0x4655454C", s]));
}, ja = class extends Bs {
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
    const { predicateBytes: o, predicateInterface: d } = ja.processPredicateData(
      t,
      n,
      i
    ), A = ue.fromB256(rw(o));
    super(A, r);
    S(this, "bytes");
    S(this, "predicateData", []);
    S(this, "interface");
    this.bytes = o, this.interface = d, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    const n = wt(t), r = this.getIndexFromPlaceholderWitness(n);
    return r !== -1 && n.removeWitness(r), n.inputs.filter(jn).forEach((s) => {
      Ua(s, this.address) && (s.predicate = z(this.bytes), s.predicateData = z(this.getPredicateData()), s.witnessIndex = 0);
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
    let s = Y(t), i;
    if (n && (i = new Jt(n), i.functions.main === void 0))
      throw new v(
        N.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = ja.setConfigurableConstants(
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
      predicate: z(this.bytes)
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
        const { offset: d } = r.configurables[i], A = r.encodeConfigurable(i, o);
        s.set(A, d);
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
    const n = t.inputs.filter(jn).filter((o) => Ua(o, this.address));
    let r = -1;
    const s = n.find((o) => !o.predicate);
    return s && (r = s.witnessIndex, n.every((d) => !d.predicate) || (i = n[0]) != null && i.predicate && (r = -1)), r;
  }
}, xu = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(xu || {}), bo = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(bo || {}), vu = "FuelConnector", sw = class {
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
}, iw = class extends Hd.EventEmitter {
  constructor() {
    super(...arguments);
    S(this, "name", "");
    S(this, "metadata", {});
    S(this, "connected", !1);
    S(this, "installed", !1);
    S(this, "events", bo);
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
function ow(e, { cache: t, cacheTime: n, key: r }) {
  return async (...s) => {
    var o, d, A;
    if (t[r] && ((o = t[r]) != null && o.value))
      return (d = t[r]) == null ? void 0 : d.value;
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
function wy(e) {
  window.dispatchEvent(
    new CustomEvent(vu, {
      detail: e
    })
  );
}
function aw() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function kr(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var cw = 2e3, dw = 5e3, { warn: uw } = console, lr = class extends iw {
  constructor(t = lr.defaultConfig) {
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
      const { _targetObject: t } = this, n = vu;
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
      return new sw(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(lr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(xu).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      kr(t.isConnected()),
      kr(this.pingConnector(t))
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
      return await ow(async () => kr(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: dw
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(bo)), await ((o = this._storage) == null ? void 0 : o.setItem(lr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = aw();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), kr(t.promise, cw).then(() => !0).catch(() => !1);
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
    return uw(
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
      n = await ds.create(t.url);
    else {
      if (t)
        throw new v(N.INVALID_PROVIDER, "Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await ds.create(r.url);
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
    return new Bs(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(lr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, Ru = lr;
De(Ru, "STORAGE_KEY", "fuel-current-connector");
De(Ru, "defaultConfig", {});
function $a(e, t) {
  if (!e)
    throw new v(N.TRANSACTION_ERROR, t);
}
function Su(e) {
  return e.reduce((t, n, r) => {
    const { program: s, externalAbis: i } = n.getCallConfig();
    return r === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var Ot, rc, Qu = (rc = class {
  constructor(...e) {
    Wt(this, Ot, void 0);
    Rn(this, Ot, e || []);
  }
  entries() {
    return gt(this, Ot);
  }
  push(...e) {
    gt(this, Ot).push(...e);
  }
  concat(e) {
    return gt(this, Ot).concat(e);
  }
  extend(e) {
    gt(this, Ot).push(...e);
  }
  toBytes() {
    return ie(
      gt(this, Ot).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return z(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(gt(this, Ot), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Ot = new WeakMap(), rc), Aw = (e) => zc + Vc({ maxInputs: e });
function lw(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === de.ScriptResult ? n = i : (i.type === de.Return || i.type === de.ReturnData || i.type === de.Revert) && (r = i);
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
function Eo(e, t, n = []) {
  var r;
  try {
    const s = lw(e);
    return t(s);
  } catch (s) {
    throw s.code === N.SCRIPT_REVERTED ? su({
      logs: n,
      receipts: e.receipts,
      status: (r = e.gqlTransaction) == null ? void 0 : r.status
    }) : s;
  }
}
function fw(e, t, n) {
  return Eo(
    e,
    (r) => {
      if (r.returnReceipt.type === de.Revert)
        throw new v(
          N.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== de.Return && r.returnReceipt.type !== de.ReturnData) {
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
      return r.returnReceipt.type === de.Return && (s = r.returnReceipt.val), r.returnReceipt.type === de.ReturnData && (s = t.func.decodeOutput(r.returnReceipt.data)[0]), s;
    },
    n
  );
}
var _s = class {
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
    this.bytes = Y(e), this.scriptDataEncoder = t, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return Vc({ maxInputs: t }) + zc + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return _s.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = Y(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return Eo(e, this.scriptResultDecoder, t);
  }
}, Nu = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, hw = Ne, Du = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: n,
  assetIdOffset: r
}) => {
  const s = new Qu(
    Mr(16, e),
    Mr(17, n),
    yi(17, 17, 0),
    Mr(18, r)
  );
  return t ? s.push(
    Mr(19, t),
    yi(19, 19, 0),
    _a(16, 17, 18, 19)
  ) : s.push(_a(16, 17, 18, Me.cgas().to_u8())), s;
};
function Ka(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new Qu();
  for (let n = 0; n < e.length; n += 1)
    t.extend(Du(e[n]).entries());
  return t.push(Nd(1)), t.toBytes();
}
var gw = (e) => e === de.Return || e === de.ReturnData, pw = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === de.Call && r === hw && s === t
), mw = (e) => (t) => {
  if (rn(t.code) !== 0)
    throw new v(N.SCRIPT_REVERTED, "Transaction reverted.");
  const n = pw(
    t.receipts,
    e.toB256()
  ), r = B(n == null ? void 0 : n.is);
  return t.receipts.filter(({ type: i }) => gw(i)).flatMap((i) => r.eq(B(i.is)) ? i.type === de.Return ? [new D("u64").encode(i.val)] : i.type === de.ReturnData ? [Y(i.data)] : [new Uint8Array()] : []);
}, ww = (e, t, n = []) => Eo(e, mw(t), n), yw = (e) => e.reduce(
  (t, n) => {
    const r = { ...Nu };
    return n.gas && (r.gasForwardedOffset = 1), t + Du(r).byteLength();
  },
  Ut.size()
  // placeholder for single RET instruction which is added later
), Iw = (e, t) => new _s(
  // Script to call the contract, start with stub size matching length of calls
  Ka(new Array(e.length).fill(Nu)),
  (n) => {
    var x;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = yw(n), i = (8 - s % 8) % 8, o = s + i, d = Aw(t.toNumber()) + o, A = [];
    let h = d;
    const b = [];
    for (let R = 0; R < r; R += 1) {
      const C = n[R], M = h, F = M + fe, X = F + ts, k = X + j0 + fe + fe, Z = k + C.fnSelectorBytes.byteLength, O = Y(C.data);
      let T = 0;
      b.push(new D("u64").encode(C.amount || 0)), b.push(new G().encode(((x = C.assetId) == null ? void 0 : x.toString()) || Ne)), b.push(C.contractId.toBytes()), b.push(new D("u64").encode(k)), b.push(new D("u64").encode(Z)), b.push(C.fnSelectorBytes), b.push(O), C.gas && (b.push(new D("u64").encode(C.gas)), T = Z + O.byteLength);
      const L = {
        amountOffset: M,
        assetIdOffset: F,
        gasForwardedOffset: T,
        callDataOffset: X
      };
      A.push(L), h = d + ie(b).byteLength;
    }
    const I = Ka(A);
    return { data: ie(b), script: I };
  },
  () => [new Uint8Array()]
);
function bw(e) {
  const t = e.receipts.find((n) => n.type === de.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || B(0);
}
var Tu = class {
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
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = bw(t);
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
    return Su(this.functionScopes);
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
      return fw(e, n, t);
    const s = ww(
      e,
      (n == null ? void 0 : n.program).id,
      t
    ).map((i, o) => {
      var A;
      const { func: d } = this.functionScopes[o].getCallConfig();
      return (A = d.decodeOutput(i)) == null ? void 0 : A[0];
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
    return Au(e, n, r);
  }
}, Fu = class extends Tu {
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
    return new Fu(
      t,
      n,
      i,
      s,
      r
    );
  }
}, $r = class extends Tu {
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
    return await new $r(t, n, r);
  }
};
function Ew(e) {
  const { program: t, args: n, forward: r, func: s, callParameters: i, externalAbis: o } = e.getCallConfig(), d = s.encodeArguments(n);
  return {
    contractId: t.id,
    fnSelector: s.selector,
    fnSelectorBytes: s.selectorBytes,
    encoding: s.encoding,
    data: d,
    assetId: r == null ? void 0 : r.assetId,
    amount: r == null ? void 0 : r.amount,
    gas: i == null ? void 0 : i.gasLimit,
    externalContractsAbis: o
  };
}
var Mu = class {
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
    this.program = e, this.isMultiCall = t, this.transactionRequest = new kn();
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
    return this.functionInvocationScopes.map((n) => Ew(n));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), n = Iw(this.functionInvocationScopes, t);
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
    await oo(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === Oe.Script && (this.transactionRequest.abis = Su(this.functionInvocationScopes));
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
    e = Lt(e);
    const t = await this.getTransactionCost(), { gasUsed: n, missingContractIds: r, outputVariables: s, maxFee: i } = t;
    return this.setDefaultTxParams(e, n, i), e.inputs = e.inputs.filter((d) => d.type !== me.Coin), r.forEach((d) => {
      e.addContractInputAndOutput(ue.fromString(d));
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
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @returns The current instance of the class.
   */
  addTransfer(e, t, n) {
    return this.transactionRequest = this.transactionRequest.addCoinOutput(
      ue.fromAddressOrString(e),
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
    $a(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      awaitExecution: !0,
      estimateTxDependencies: !1
    });
    return Fu.build(
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
    if ($a(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new v(
        N.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return $r.build(this.functionInvocationScopes, t, this.isMultiCall);
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
    return $r.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall
    );
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return $r.build(
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
    var d, A;
    const r = _n((d = this.txParameters) == null ? void 0 : d.gasLimit) || this.hasCallParamsGasLimit, s = _n((A = this.txParameters) == null ? void 0 : A.maxFee), { gasLimit: i, maxFee: o } = e;
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
}, Ou = class extends Mu {
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
      this.forward = uo(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, Cw = class extends Mu {
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
}, Bw = class {
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
    this.interface = t instanceof Jt ? t : new Jt(t), this.id = ue.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
      const t = (...n) => new Ou(this, e, n);
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
    return new Cw(this, e);
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
}, _w = class extends Ou {
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
    this.scriptRequest = new _s(
      t,
      (r) => this.func.encodeArguments(r),
      () => []
    );
  }
}, yy = class extends hl {
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
    this.bytes = Y(t), this.interface = new Jt(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new _w(this, this.interface.getFunction("main"), s)
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
new _s(
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
function Iy(e) {
  return e;
}
var xw = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e))(xw || {}), vw = Object.defineProperty, Rw = (e, t) => {
  for (var n in t)
    vw(e, n, { get: t[n], enumerable: !0 });
}, Sw = {};
Rw(Sw, {
  getContractId: () => Pu,
  getContractRoot: () => Lu,
  getContractStorageRoot: () => ku,
  hexlifyWithPrefix: () => Ni
});
var Lu = (e) => {
  const n = Y(e), r = cc(n, 16384);
  return Zd(r.map((s) => z(s)));
}, ku = (e) => {
  const t = new hg();
  return e.forEach(({ key: n, value: r }) => t.update(mt(n), r)), t.root;
}, Pu = (e, t, n) => {
  const r = Lu(Y(e));
  return mt(ie(["0x4655454C", t, r, n]));
}, Ni = (e) => z(e.startsWith("0x") ? e : `0x${e}`), Qw = class {
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
    this.bytecode = Y(e), t instanceof Jt ? this.interface = t : this.interface = new Jt(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new Qw(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    var o;
    const t = (o = e == null ? void 0 : e.storageSlots) == null ? void 0 : o.map(({ key: d, value: A }) => ({
      key: Ni(d),
      value: Ni(A)
    })).sort(({ key: d }, { key: A }) => d.localeCompare(A)), n = {
      salt: kt(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new v(
        N.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || ku(n.storageSlots), s = Pu(this.bytecode, n.salt, r), i = new vi({
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
    if (_n(i) && s.maxFee.gt(i))
      throw new v(
        N.MAX_FEE_TOO_LOW,
        `Max fee '${e.maxFee}' is lower than the required: '${s.maxFee}'.`
      );
    return r.maxFee = s.maxFee, await this.account.fund(r, s), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new Bw(n, this.interface, this.account);
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
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r), o = Y(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new v(
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, by = 9, Ey = 3, Cy = 9, By = 9, _y = 18, xy = 15, vy = 12, Ry = 9, sc, Sy = typeof process < "u" && ((sc = process == null ? void 0 : process.env) == null ? void 0 : sc.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/v1/graphql", Qy = "https://beta-5.fuel.network/graphql";
export {
  ts as ASSET_ID_LEN,
  Kc as AbstractAccount,
  ll as AbstractAddress,
  fl as AbstractContract,
  ed as AbstractProgram,
  hl as AbstractScript,
  Xw as AbstractScriptRequest,
  Bs as Account,
  ue as Address,
  sm as AddressType,
  ye as ArrayCoder,
  G as B256Coder,
  tl as B512Coder,
  Fe as BN,
  An as BYTES_32,
  go as BaseTransactionRequest,
  gu as BaseWalletUnlocked,
  D as BigNumberCoder,
  rl as BooleanCoder,
  Ce as ByteArrayCoder,
  Hc as ByteCoder,
  Fn as CHAIN_IDS,
  j0 as CONTRACT_ID_LEN,
  Hw as CONTRACT_MAX_SIZE,
  im as ChainName,
  iy as ChangeOutputCollisionError,
  ce as Coder,
  xw as Commands,
  Bw as Contract,
  Qw as ContractFactory,
  Sw as ContractUtils,
  vi as CreateTransactionRequest,
  By as DECIMAL_FUEL,
  Ry as DECIMAL_GWEI,
  xy as DECIMAL_KWEI,
  vy as DECIMAL_MWEI,
  _y as DECIMAL_WEI,
  Cy as DEFAULT_DECIMAL_UNITS,
  Ey as DEFAULT_MIN_PRECISION,
  by as DEFAULT_PRECISION,
  Oi as DateTime,
  es as ENCODING_V1,
  zw as EmptyRoot,
  Zc as EnumCoder,
  oh as FAILED_ASSERT_EQ_SIGNAL,
  ch as FAILED_ASSERT_NE_SIGNAL,
  ah as FAILED_ASSERT_SIGNAL,
  ih as FAILED_REQUIRE_SIGNAL,
  Rd as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  Kw as FAILED_UNKNOWN_SIGNAL,
  rs as FUEL_BECH32_HRP_PREFIX,
  Qy as FUEL_BETA_5_NETWORK_URL,
  Sy as FUEL_NETWORK_URL,
  Ru as Fuel,
  iw as FuelConnector,
  vu as FuelConnectorEventType,
  bo as FuelConnectorEventTypes,
  xu as FuelConnectorMethods,
  Fu as FunctionInvocationResult,
  Ou as FunctionInvocationScope,
  si as HDWallet,
  Gw as INPUT_COIN_FIXED_SIZE,
  ln as InputCoder,
  Jo as InputCoinCoder,
  ss as InputContractCoder,
  gr as InputMessageCoder,
  me as InputType,
  Qu as InstructionSet,
  Jt as Interface,
  $r as InvocationCallResult,
  Tu as InvocationResult,
  Gm as Language,
  sw as LocalStorage,
  $w as MAX_PREDICATE_DATA_LENGTH,
  jw as MAX_PREDICATE_LENGTH,
  Ww as MAX_SCRIPT_DATA_LENGTH,
  Jw as MAX_SCRIPT_LENGTH,
  qw as MAX_STATIC_CONTRACTS,
  Zw as MAX_WITNESSES,
  Ja as MNEMONIC_SIZES,
  ew as MemoryStorage,
  wo as Mnemonic,
  bu as MnemonicVault,
  Cw as MultiCallInvocationScope,
  Op as NoWitnessAtIndexError,
  oy as NoWitnessByOwnerError,
  $ as NumberCoder,
  rm as OperationName,
  Ji as OptionCoder,
  qo as OutputChangeCoder,
  fn as OutputCoder,
  Wo as OutputCoinCoder,
  is as OutputContractCoder,
  $o as OutputContractCreatedCoder,
  be as OutputType,
  jo as OutputVariableCoder,
  uh as PANIC_DOC_URL,
  dh as PANIC_REASONS,
  hn as PoliciesCoder,
  St as PolicyType,
  ja as Predicate,
  Eu as PrivateKeyVault,
  ds as Provider,
  ol as RawSliceCoder,
  fi as ReceiptBurnCoder,
  Ko as ReceiptCallCoder,
  Yw as ReceiptCoder,
  sa as ReceiptLogCoder,
  ia as ReceiptLogDataCoder,
  os as ReceiptMessageOutCoder,
  pr as ReceiptMintCoder,
  na as ReceiptPanicCoder,
  ea as ReceiptReturnCoder,
  ta as ReceiptReturnDataCoder,
  ra as ReceiptRevertCoder,
  ca as ReceiptScriptResultCoder,
  oa as ReceiptTransferCoder,
  aa as ReceiptTransferOutCoder,
  de as ReceiptType,
  zc as SCRIPT_FIXED_SIZE,
  yy as Script,
  _s as ScriptRequest,
  kn as ScriptTransactionRequest,
  Kn as Signer,
  Wi as StdStringCoder,
  my as StorageAbstract,
  da as StorageSlotCoder,
  qc as StrSliceCoder,
  al as StringCoder,
  ps as StructCoder,
  pn as TransactionCoder,
  la as TransactionCreateCoder,
  fa as TransactionMintCoder,
  jr as TransactionResponse,
  Aa as TransactionScriptCoder,
  nm as TransactionStatus,
  Oe as TransactionType,
  tm as TransactionTypeName,
  ha as TransactionUpgradeCoder,
  ga as TransactionUploadCoder,
  jc as TupleCoder,
  Hn as TxPointerCoder,
  ui as UTXO_ID_LEN,
  Vw as UtxoIdCoder,
  nw as Vault,
  cl as VecCoder,
  fe as WORD_SIZE,
  Ct as Wallet,
  Iu as WalletLocked,
  tw as WalletManager,
  bt as WalletUnlocked,
  gn as WitnessCoder,
  Ne as ZeroBytes32,
  mg as addAmountToCoinQuantities,
  $n as addOperation,
  cr as addressify,
  Y as arrayify,
  Fp as assemblePanicError,
  Rp as assembleReceiptByType,
  Mp as assembleRevertError,
  Cs as assembleTransactionSummary,
  $a as assert,
  py as assets,
  B as bn,
  dn as bufferFromString,
  sy as buildBlockExplorerUrl,
  ow as cacheFor,
  ay as cacheRequestInputsResources,
  Pp as cacheRequestInputsResourcesFromOwner,
  _i as calculateGasFee,
  nu as calculateMetadataGasForTxCreate,
  ru as calculateMetadataGasForTxScript,
  Vp as calculateTXFeeForSummary,
  Vc as calculateVmTxMemory,
  Ow as capitalizeString,
  cc as chunkAndPadBytes,
  Il as clearFirst12BytesFromB256,
  uo as coinQuantityfy,
  kc as computeHmac,
  ie as concat,
  ls as concatBytes,
  Iy as createConfig,
  Li as dataSlice,
  hA as decodeBase58,
  _0 as decrypt,
  v0 as decryptJsonWalletData,
  Pw as defaultConsensusKey,
  kw as defaultSnapshotConfigs,
  aw as deferPromise,
  wy as dispatchFuelConnectorEvent,
  lc as encodeBase58,
  x0 as encrypt,
  R0 as encryptJsonWalletData,
  Lr as english,
  Im as extractBurnedAssetsFromReceipts,
  ym as extractMintedAssetsFromReceipts,
  su as extractTxError,
  Tw as format,
  Dw as formatUnits,
  ji as fromBech32,
  Tm as fuelAssetsBaseUrl,
  Np as gasUsedByInputs,
  Su as getAbisFromAllCalls,
  kp as getAssetAmountInRequestInputs,
  hy as getAssetEth,
  gy as getAssetFuel,
  vm as getAssetNetwork,
  hu as getAssetWithNetwork,
  $i as getBytesFromBech32,
  hm as getContractCallOperations,
  mm as getContractCreatedOperations,
  Au as getDecodedLogs,
  xm as getDefaultChainId,
  eu as getGasUsedFromReceipts,
  mo as getInputAccountAddress,
  jp as getInputContractFromIndex,
  ou as getInputFromAssetId,
  po as getInputsByType,
  Hp as getInputsByTypes,
  Zp as getInputsCoin,
  Wp as getInputsCoinAndMessage,
  qp as getInputsContract,
  Jp as getInputsMessage,
  fo as getMaxGas,
  tu as getMinGas,
  id as getMintedAssetId,
  wm as getOperations,
  xr as getOutputsByType,
  Kp as getOutputsChange,
  au as getOutputsCoin,
  em as getOutputsContract,
  $p as getOutputsContractCreated,
  cy as getOutputsVariable,
  pm as getPayProducerOperations,
  rw as getPredicateRoot,
  yl as getRandomB256,
  yr as getReceiptsByType,
  dm as getReceiptsCall,
  um as getReceiptsMessageOut,
  uy as getReceiptsTransferOut,
  Pa as getReceiptsWithMissingData,
  Lp as getRequestInputResourceOwner,
  bm as getTransactionStatusName,
  Ay as getTransactionSummary,
  ly as getTransactionSummaryFromRequest,
  cu as getTransactionTypeName,
  fy as getTransactionsSummaries,
  Xa as getTransferOperations,
  fm as getWithdrawFromFuelOperations,
  dy as hasSameAssetId,
  Zt as hash,
  D0 as hashMessage,
  z as hexlify,
  Cp as inputify,
  Ai as isB256,
  Hr as isBech32,
  _p as isCoin,
  _n as isDefined,
  li as isEvmAddress,
  ry as isMessage,
  Ho as isPublicKey,
  ty as isRawCoin,
  ny as isRawMessage,
  tr as isRequestInputCoin,
  ho as isRequestInputMessage,
  jn as isRequestInputResource,
  Ua as isRequestInputResourceFromOwner,
  vr as isType,
  du as isTypeCreate,
  om as isTypeMint,
  uu as isTypeScript,
  am as isTypeUpgrade,
  cm as isTypeUpload,
  Lc as keccak256,
  Uw as keyFromPassword,
  Fw as max,
  Mw as multiply,
  wl as normalizeBech32,
  Dp as normalizeJSON,
  Lw as normalizeString,
  Bp as outputify,
  bl as padFirst12BytesOfEvmAddress,
  S0 as pbkdf2,
  an as processGqlReceipt,
  Em as processGraphqlStatus,
  kt as randomBytes,
  Fm as rawAssets,
  un as resolveGasDependentCosts,
  Dm as resolveIconPaths,
  Ga as returnZeroScript,
  Q0 as ripemd160,
  Oc as scrypt,
  mt as sha256,
  Tp as sleep,
  vl as sortPolicies,
  ar as stringFromBuffer,
  Zo as toB256,
  zr as toBech32,
  Ht as toBytes,
  tA as toFixed,
  Mi as toHex,
  rn as toNumber,
  Xn as toUtf8Bytes,
  ki as toUtf8String,
  wt as transactionRequestify,
  N0 as uint64ToBytesBE,
  Nm as urlJoin,
  kr as withTimeout,
  Yp as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
