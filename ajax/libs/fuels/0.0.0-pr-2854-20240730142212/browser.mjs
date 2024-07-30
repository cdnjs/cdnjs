var Zd = Object.defineProperty;
var Ca = (e) => {
  throw TypeError(e);
};
var Wd = (e, t, n) => t in e ? Zd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var M = (e, t, n) => Wd(e, typeof t != "symbol" ? t + "" : t, n), pi = (e, t, n) => t.has(e) || Ca("Cannot " + n);
var Me = (e, t, n) => (pi(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Nt = (e, t, n) => t.has(e) ? Ca("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Gt = (e, t, n, r) => (pi(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), $r = (e, t, n) => (pi(e, t, "access private method"), n);
function r0() {
  return {
    FORC: "0.62.0",
    FUEL_CORE: "0.31.0",
    FUELS: "0.93.0"
  };
}
function Ba(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function go(e, t) {
  const n = Ba(e), r = Ba(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function Jd(e, t) {
  const { major: n } = go(e, t);
  return n === 0;
}
function qd(e, t) {
  const { minor: n } = go(e, t);
  return n === 0;
}
function jd(e, t) {
  const { patch: n } = go(e, t);
  return n === 0;
}
function $d(e) {
  const { FUEL_CORE: t } = r0();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: Jd(e, t),
    isMinorSupported: qd(e, t),
    isPatchSupported: jd(e, t)
  };
}
var Kd = r0(), eA = Object.defineProperty, tA = (e, t, n) => t in e ? eA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, nA = (e, t, n) => (tA(e, t + "", n), n), S = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e.NODE_LAUNCH_FAILED = "node-launch-failed", e.UNKNOWN = "unknown", e))(S || {}), us = class extends Error {
  constructor(t, n, r = {}, s = {}) {
    super(n);
    M(this, "VERSIONS", Kd);
    M(this, "metadata");
    M(this, "rawError");
    M(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = r, this.rawError = s;
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new us(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(S);
    if (!r.includes(n.code))
      throw new us(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new us(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, metadata: s, VERSIONS: i, rawError: o } = this;
    return { code: t, name: n, message: r, metadata: s, VERSIONS: i, rawError: o };
  }
}, R = us;
nA(R, "CODES", S);
var Ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function rA(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function po(e) {
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
var mo = { exports: {} };
const sA = {}, iA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sA
}, Symbol.toStringTag, { value: "Module" })), oA = /* @__PURE__ */ po(iA);
mo.exports;
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
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = oA.Buffer;
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
      var m = 0;
      a[0] === "-" && (m++, this.negative = 1), m < a.length && (u === 16 ? this._parseHex(a, m, l) : (this._parseBase(a, u, m), l === "le" && this._initArray(this.toArray(), u, l)));
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
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var h, I, E = 0;
      if (l === "be")
        for (m = a.length - 1, h = 0; m >= 0; m -= 3)
          I = a[m] | a[m - 1] << 8 | a[m - 2] << 16, this.words[h] |= I << E & 67108863, this.words[h + 1] = I >>> 26 - E & 67108863, E += 24, E >= 26 && (E -= 26, h++);
      else if (l === "le")
        for (m = 0, h = 0; m < a.length; m += 3)
          I = a[m] | a[m + 1] << 8 | a[m + 2] << 16, this.words[h] |= I << E & 67108863, this.words[h + 1] = I >>> 26 - E & 67108863, E += 24, E >= 26 && (E -= 26, h++);
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
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var h = 0, I = 0, E;
      if (l === "be")
        for (m = a.length - 1; m >= u; m -= 2)
          E = A(a, u, m) << h, this.words[I] |= E & 67108863, h >= 18 ? (h -= 18, I += 1, this.words[I] |= E >>> 26) : h += 8;
      else {
        var p = a.length - u;
        for (m = p % 2 === 0 ? u + 1 : u; m < a.length; m += 2)
          E = A(a, u, m) << h, this.words[I] |= E & 67108863, h >= 18 ? (h -= 18, I += 1, this.words[I] |= E >>> 26) : h += 8;
      }
      this._strip();
    };
    function f(b, a, u, l) {
      for (var m = 0, h = 0, I = Math.min(b.length, u), E = a; E < I; E++) {
        var p = b.charCodeAt(E) - 48;
        m *= l, p >= 49 ? h = p - 49 + 10 : p >= 17 ? h = p - 17 + 10 : h = p, r(p >= 0 && h < l, "Invalid character"), m += h;
      }
      return m;
    }
    i.prototype._parseBase = function(a, u, l) {
      this.words = [0], this.length = 1;
      for (var m = 0, h = 1; h <= 67108863; h *= u)
        m++;
      m--, h = h / u | 0;
      for (var I = a.length - l, E = I % m, p = Math.min(I, I - E) + l, d = 0, y = l; y < p; y += m)
        d = f(a, y, y + m, u), this.imuln(h), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
      if (E !== 0) {
        var Y = 1;
        for (d = f(a, y, a.length, u), y = 0; y < E; y++)
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
    function w(b, a) {
      b.words = a.words, b.length = a.length, b.negative = a.negative, b.red = a.red;
    }
    if (i.prototype._move = function(a) {
      w(a, this);
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
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = g;
      } catch {
        i.prototype.inspect = g;
      }
    else
      i.prototype.inspect = g;
    function g() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var C = [
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
    ], _ = [
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
        for (var m = 0, h = 0, I = 0; I < this.length; I++) {
          var E = this.words[I], p = ((E << m | h) & 16777215).toString(16);
          h = E >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, I--), h !== 0 || I !== this.length - 1 ? l = C[6 - p.length] + p + l : l = p + l;
        }
        for (h !== 0 && (l = h.toString(16) + l); l.length % u !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var d = x[a], y = _[a];
        l = "";
        var Y = this.clone();
        for (Y.negative = 0; !Y.isZero(); ) {
          var V = Y.modrn(y).toString(a);
          Y = Y.idivn(y), Y.isZero() ? l = V + l : l = C[d - V.length] + V + l;
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
    var B = function(a, u) {
      return a.allocUnsafe ? a.allocUnsafe(u) : new a(u);
    };
    i.prototype.toArrayLike = function(a, u, l) {
      this._strip();
      var m = this.byteLength(), h = l || Math.max(1, m);
      r(m <= h, "byte array longer than desired length"), r(h > 0, "Requested array length <= 0");
      var I = B(a, h), E = u === "le" ? "LE" : "BE";
      return this["_toArrayLike" + E](I, m), I;
    }, i.prototype._toArrayLikeLE = function(a, u) {
      for (var l = 0, m = 0, h = 0, I = 0; h < this.length; h++) {
        var E = this.words[h] << I | m;
        a[l++] = E & 255, l < a.length && (a[l++] = E >> 8 & 255), l < a.length && (a[l++] = E >> 16 & 255), I === 6 ? (l < a.length && (a[l++] = E >> 24 & 255), m = 0, I = 0) : (m = E >>> 24, I += 2);
      }
      if (l < a.length)
        for (a[l++] = m; l < a.length; )
          a[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, u) {
      for (var l = a.length - 1, m = 0, h = 0, I = 0; h < this.length; h++) {
        var E = this.words[h] << I | m;
        a[l--] = E & 255, l >= 0 && (a[l--] = E >> 8 & 255), l >= 0 && (a[l--] = E >> 16 & 255), I === 6 ? (l >= 0 && (a[l--] = E >> 24 & 255), m = 0, I = 0) : (m = E >>> 24, I += 2);
      }
      if (l >= 0)
        for (a[l--] = m; l >= 0; )
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
    function D(b) {
      for (var a = new Array(b.bitLength()), u = 0; u < a.length; u++) {
        var l = u / 26 | 0, m = u % 26;
        a[u] = b.words[l] >>> m & 1;
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
      for (var m = 0; m < l.length; m++)
        this.words[m] = u.words[m] ^ l.words[m];
      if (this !== u)
        for (; m < u.length; m++)
          this.words[m] = u.words[m];
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
      for (var m = 0; m < u; m++)
        this.words[m] = ~this.words[m] & 67108863;
      return l > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - l), this._strip();
    }, i.prototype.notn = function(a) {
      return this.clone().inotn(a);
    }, i.prototype.setn = function(a, u) {
      r(typeof a == "number" && a >= 0);
      var l = a / 26 | 0, m = a % 26;
      return this._expand(l + 1), u ? this.words[l] = this.words[l] | 1 << m : this.words[l] = this.words[l] & ~(1 << m), this._strip();
    }, i.prototype.iadd = function(a) {
      var u;
      if (this.negative !== 0 && a.negative === 0)
        return this.negative = 0, u = this.isub(a), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && a.negative !== 0)
        return a.negative = 0, u = this.isub(a), a.negative = 1, u._normSign();
      var l, m;
      this.length > a.length ? (l = this, m = a) : (l = a, m = this);
      for (var h = 0, I = 0; I < m.length; I++)
        u = (l.words[I] | 0) + (m.words[I] | 0) + h, this.words[I] = u & 67108863, h = u >>> 26;
      for (; h !== 0 && I < l.length; I++)
        u = (l.words[I] | 0) + h, this.words[I] = u & 67108863, h = u >>> 26;
      if (this.length = l.length, h !== 0)
        this.words[this.length] = h, this.length++;
      else if (l !== this)
        for (; I < l.length; I++)
          this.words[I] = l.words[I];
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
      var m, h;
      l > 0 ? (m = this, h = a) : (m = a, h = this);
      for (var I = 0, E = 0; E < h.length; E++)
        u = (m.words[E] | 0) - (h.words[E] | 0) + I, I = u >> 26, this.words[E] = u & 67108863;
      for (; I !== 0 && E < m.length; E++)
        u = (m.words[E] | 0) + I, I = u >> 26, this.words[E] = u & 67108863;
      if (I === 0 && E < m.length && m !== this)
        for (; E < m.length; E++)
          this.words[E] = m.words[E];
      return this.length = Math.max(this.length, E), m !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function T(b, a, u) {
      u.negative = a.negative ^ b.negative;
      var l = b.length + a.length | 0;
      u.length = l, l = l - 1 | 0;
      var m = b.words[0] | 0, h = a.words[0] | 0, I = m * h, E = I & 67108863, p = I / 67108864 | 0;
      u.words[0] = E;
      for (var d = 1; d < l; d++) {
        for (var y = p >>> 26, Y = p & 67108863, V = Math.min(d, a.length - 1), $ = Math.max(0, d - b.length + 1); $ <= V; $++) {
          var j = d - $ | 0;
          m = b.words[j] | 0, h = a.words[$] | 0, I = m * h + Y, y += I / 67108864 | 0, Y = I & 67108863;
        }
        u.words[d] = Y | 0, p = y | 0;
      }
      return p !== 0 ? u.words[d] = p | 0 : u.length--, u._strip();
    }
    var G = function(a, u, l) {
      var m = a.words, h = u.words, I = l.words, E = 0, p, d, y, Y = m[0] | 0, V = Y & 8191, $ = Y >>> 13, j = m[1] | 0, ne = j & 8191, re = j >>> 13, be = m[2] | 0, Ae = be & 8191, ie = be >>> 13, me = m[3] | 0, ue = me & 8191, he = me >>> 13, Ut = m[4] | 0, Re = Ut & 8191, Ie = Ut >>> 13, mr = m[5] | 0, Ne = mr & 8191, Fe = mr >>> 13, jr = m[6] | 0, Ue = jr & 8191, Ge = jr >>> 13, da = m[7] | 0, ze = da & 8191, He = da >>> 13, Aa = m[8] | 0, Xe = Aa & 8191, Ve = Aa >>> 13, la = m[9] | 0, Ye = la & 8191, Ze = la >>> 13, fa = h[0] | 0, We = fa & 8191, Je = fa >>> 13, ha = h[1] | 0, qe = ha & 8191, je = ha >>> 13, ga = h[2] | 0, $e = ga & 8191, Ke = ga >>> 13, pa = h[3] | 0, et = pa & 8191, tt = pa >>> 13, ma = h[4] | 0, nt = ma & 8191, rt = ma >>> 13, wa = h[5] | 0, st = wa & 8191, it = wa >>> 13, ya = h[6] | 0, ot = ya & 8191, at = ya >>> 13, Ia = h[7] | 0, ct = Ia & 8191, ut = Ia >>> 13, Ea = h[8] | 0, dt = Ea & 8191, At = Ea >>> 13, ba = h[9] | 0, lt = ba & 8191, ft = ba >>> 13;
      l.negative = a.negative ^ u.negative, l.length = 19, p = Math.imul(V, We), d = Math.imul(V, Je), d = d + Math.imul($, We) | 0, y = Math.imul($, Je);
      var js = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (js >>> 26) | 0, js &= 67108863, p = Math.imul(ne, We), d = Math.imul(ne, Je), d = d + Math.imul(re, We) | 0, y = Math.imul(re, Je), p = p + Math.imul(V, qe) | 0, d = d + Math.imul(V, je) | 0, d = d + Math.imul($, qe) | 0, y = y + Math.imul($, je) | 0;
      var $s = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + ($s >>> 26) | 0, $s &= 67108863, p = Math.imul(Ae, We), d = Math.imul(Ae, Je), d = d + Math.imul(ie, We) | 0, y = Math.imul(ie, Je), p = p + Math.imul(ne, qe) | 0, d = d + Math.imul(ne, je) | 0, d = d + Math.imul(re, qe) | 0, y = y + Math.imul(re, je) | 0, p = p + Math.imul(V, $e) | 0, d = d + Math.imul(V, Ke) | 0, d = d + Math.imul($, $e) | 0, y = y + Math.imul($, Ke) | 0;
      var Ks = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (Ks >>> 26) | 0, Ks &= 67108863, p = Math.imul(ue, We), d = Math.imul(ue, Je), d = d + Math.imul(he, We) | 0, y = Math.imul(he, Je), p = p + Math.imul(Ae, qe) | 0, d = d + Math.imul(Ae, je) | 0, d = d + Math.imul(ie, qe) | 0, y = y + Math.imul(ie, je) | 0, p = p + Math.imul(ne, $e) | 0, d = d + Math.imul(ne, Ke) | 0, d = d + Math.imul(re, $e) | 0, y = y + Math.imul(re, Ke) | 0, p = p + Math.imul(V, et) | 0, d = d + Math.imul(V, tt) | 0, d = d + Math.imul($, et) | 0, y = y + Math.imul($, tt) | 0;
      var ei = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (ei >>> 26) | 0, ei &= 67108863, p = Math.imul(Re, We), d = Math.imul(Re, Je), d = d + Math.imul(Ie, We) | 0, y = Math.imul(Ie, Je), p = p + Math.imul(ue, qe) | 0, d = d + Math.imul(ue, je) | 0, d = d + Math.imul(he, qe) | 0, y = y + Math.imul(he, je) | 0, p = p + Math.imul(Ae, $e) | 0, d = d + Math.imul(Ae, Ke) | 0, d = d + Math.imul(ie, $e) | 0, y = y + Math.imul(ie, Ke) | 0, p = p + Math.imul(ne, et) | 0, d = d + Math.imul(ne, tt) | 0, d = d + Math.imul(re, et) | 0, y = y + Math.imul(re, tt) | 0, p = p + Math.imul(V, nt) | 0, d = d + Math.imul(V, rt) | 0, d = d + Math.imul($, nt) | 0, y = y + Math.imul($, rt) | 0;
      var ti = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (ti >>> 26) | 0, ti &= 67108863, p = Math.imul(Ne, We), d = Math.imul(Ne, Je), d = d + Math.imul(Fe, We) | 0, y = Math.imul(Fe, Je), p = p + Math.imul(Re, qe) | 0, d = d + Math.imul(Re, je) | 0, d = d + Math.imul(Ie, qe) | 0, y = y + Math.imul(Ie, je) | 0, p = p + Math.imul(ue, $e) | 0, d = d + Math.imul(ue, Ke) | 0, d = d + Math.imul(he, $e) | 0, y = y + Math.imul(he, Ke) | 0, p = p + Math.imul(Ae, et) | 0, d = d + Math.imul(Ae, tt) | 0, d = d + Math.imul(ie, et) | 0, y = y + Math.imul(ie, tt) | 0, p = p + Math.imul(ne, nt) | 0, d = d + Math.imul(ne, rt) | 0, d = d + Math.imul(re, nt) | 0, y = y + Math.imul(re, rt) | 0, p = p + Math.imul(V, st) | 0, d = d + Math.imul(V, it) | 0, d = d + Math.imul($, st) | 0, y = y + Math.imul($, it) | 0;
      var ni = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (ni >>> 26) | 0, ni &= 67108863, p = Math.imul(Ue, We), d = Math.imul(Ue, Je), d = d + Math.imul(Ge, We) | 0, y = Math.imul(Ge, Je), p = p + Math.imul(Ne, qe) | 0, d = d + Math.imul(Ne, je) | 0, d = d + Math.imul(Fe, qe) | 0, y = y + Math.imul(Fe, je) | 0, p = p + Math.imul(Re, $e) | 0, d = d + Math.imul(Re, Ke) | 0, d = d + Math.imul(Ie, $e) | 0, y = y + Math.imul(Ie, Ke) | 0, p = p + Math.imul(ue, et) | 0, d = d + Math.imul(ue, tt) | 0, d = d + Math.imul(he, et) | 0, y = y + Math.imul(he, tt) | 0, p = p + Math.imul(Ae, nt) | 0, d = d + Math.imul(Ae, rt) | 0, d = d + Math.imul(ie, nt) | 0, y = y + Math.imul(ie, rt) | 0, p = p + Math.imul(ne, st) | 0, d = d + Math.imul(ne, it) | 0, d = d + Math.imul(re, st) | 0, y = y + Math.imul(re, it) | 0, p = p + Math.imul(V, ot) | 0, d = d + Math.imul(V, at) | 0, d = d + Math.imul($, ot) | 0, y = y + Math.imul($, at) | 0;
      var ri = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (ri >>> 26) | 0, ri &= 67108863, p = Math.imul(ze, We), d = Math.imul(ze, Je), d = d + Math.imul(He, We) | 0, y = Math.imul(He, Je), p = p + Math.imul(Ue, qe) | 0, d = d + Math.imul(Ue, je) | 0, d = d + Math.imul(Ge, qe) | 0, y = y + Math.imul(Ge, je) | 0, p = p + Math.imul(Ne, $e) | 0, d = d + Math.imul(Ne, Ke) | 0, d = d + Math.imul(Fe, $e) | 0, y = y + Math.imul(Fe, Ke) | 0, p = p + Math.imul(Re, et) | 0, d = d + Math.imul(Re, tt) | 0, d = d + Math.imul(Ie, et) | 0, y = y + Math.imul(Ie, tt) | 0, p = p + Math.imul(ue, nt) | 0, d = d + Math.imul(ue, rt) | 0, d = d + Math.imul(he, nt) | 0, y = y + Math.imul(he, rt) | 0, p = p + Math.imul(Ae, st) | 0, d = d + Math.imul(Ae, it) | 0, d = d + Math.imul(ie, st) | 0, y = y + Math.imul(ie, it) | 0, p = p + Math.imul(ne, ot) | 0, d = d + Math.imul(ne, at) | 0, d = d + Math.imul(re, ot) | 0, y = y + Math.imul(re, at) | 0, p = p + Math.imul(V, ct) | 0, d = d + Math.imul(V, ut) | 0, d = d + Math.imul($, ct) | 0, y = y + Math.imul($, ut) | 0;
      var si = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (si >>> 26) | 0, si &= 67108863, p = Math.imul(Xe, We), d = Math.imul(Xe, Je), d = d + Math.imul(Ve, We) | 0, y = Math.imul(Ve, Je), p = p + Math.imul(ze, qe) | 0, d = d + Math.imul(ze, je) | 0, d = d + Math.imul(He, qe) | 0, y = y + Math.imul(He, je) | 0, p = p + Math.imul(Ue, $e) | 0, d = d + Math.imul(Ue, Ke) | 0, d = d + Math.imul(Ge, $e) | 0, y = y + Math.imul(Ge, Ke) | 0, p = p + Math.imul(Ne, et) | 0, d = d + Math.imul(Ne, tt) | 0, d = d + Math.imul(Fe, et) | 0, y = y + Math.imul(Fe, tt) | 0, p = p + Math.imul(Re, nt) | 0, d = d + Math.imul(Re, rt) | 0, d = d + Math.imul(Ie, nt) | 0, y = y + Math.imul(Ie, rt) | 0, p = p + Math.imul(ue, st) | 0, d = d + Math.imul(ue, it) | 0, d = d + Math.imul(he, st) | 0, y = y + Math.imul(he, it) | 0, p = p + Math.imul(Ae, ot) | 0, d = d + Math.imul(Ae, at) | 0, d = d + Math.imul(ie, ot) | 0, y = y + Math.imul(ie, at) | 0, p = p + Math.imul(ne, ct) | 0, d = d + Math.imul(ne, ut) | 0, d = d + Math.imul(re, ct) | 0, y = y + Math.imul(re, ut) | 0, p = p + Math.imul(V, dt) | 0, d = d + Math.imul(V, At) | 0, d = d + Math.imul($, dt) | 0, y = y + Math.imul($, At) | 0;
      var ii = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (ii >>> 26) | 0, ii &= 67108863, p = Math.imul(Ye, We), d = Math.imul(Ye, Je), d = d + Math.imul(Ze, We) | 0, y = Math.imul(Ze, Je), p = p + Math.imul(Xe, qe) | 0, d = d + Math.imul(Xe, je) | 0, d = d + Math.imul(Ve, qe) | 0, y = y + Math.imul(Ve, je) | 0, p = p + Math.imul(ze, $e) | 0, d = d + Math.imul(ze, Ke) | 0, d = d + Math.imul(He, $e) | 0, y = y + Math.imul(He, Ke) | 0, p = p + Math.imul(Ue, et) | 0, d = d + Math.imul(Ue, tt) | 0, d = d + Math.imul(Ge, et) | 0, y = y + Math.imul(Ge, tt) | 0, p = p + Math.imul(Ne, nt) | 0, d = d + Math.imul(Ne, rt) | 0, d = d + Math.imul(Fe, nt) | 0, y = y + Math.imul(Fe, rt) | 0, p = p + Math.imul(Re, st) | 0, d = d + Math.imul(Re, it) | 0, d = d + Math.imul(Ie, st) | 0, y = y + Math.imul(Ie, it) | 0, p = p + Math.imul(ue, ot) | 0, d = d + Math.imul(ue, at) | 0, d = d + Math.imul(he, ot) | 0, y = y + Math.imul(he, at) | 0, p = p + Math.imul(Ae, ct) | 0, d = d + Math.imul(Ae, ut) | 0, d = d + Math.imul(ie, ct) | 0, y = y + Math.imul(ie, ut) | 0, p = p + Math.imul(ne, dt) | 0, d = d + Math.imul(ne, At) | 0, d = d + Math.imul(re, dt) | 0, y = y + Math.imul(re, At) | 0, p = p + Math.imul(V, lt) | 0, d = d + Math.imul(V, ft) | 0, d = d + Math.imul($, lt) | 0, y = y + Math.imul($, ft) | 0;
      var oi = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (oi >>> 26) | 0, oi &= 67108863, p = Math.imul(Ye, qe), d = Math.imul(Ye, je), d = d + Math.imul(Ze, qe) | 0, y = Math.imul(Ze, je), p = p + Math.imul(Xe, $e) | 0, d = d + Math.imul(Xe, Ke) | 0, d = d + Math.imul(Ve, $e) | 0, y = y + Math.imul(Ve, Ke) | 0, p = p + Math.imul(ze, et) | 0, d = d + Math.imul(ze, tt) | 0, d = d + Math.imul(He, et) | 0, y = y + Math.imul(He, tt) | 0, p = p + Math.imul(Ue, nt) | 0, d = d + Math.imul(Ue, rt) | 0, d = d + Math.imul(Ge, nt) | 0, y = y + Math.imul(Ge, rt) | 0, p = p + Math.imul(Ne, st) | 0, d = d + Math.imul(Ne, it) | 0, d = d + Math.imul(Fe, st) | 0, y = y + Math.imul(Fe, it) | 0, p = p + Math.imul(Re, ot) | 0, d = d + Math.imul(Re, at) | 0, d = d + Math.imul(Ie, ot) | 0, y = y + Math.imul(Ie, at) | 0, p = p + Math.imul(ue, ct) | 0, d = d + Math.imul(ue, ut) | 0, d = d + Math.imul(he, ct) | 0, y = y + Math.imul(he, ut) | 0, p = p + Math.imul(Ae, dt) | 0, d = d + Math.imul(Ae, At) | 0, d = d + Math.imul(ie, dt) | 0, y = y + Math.imul(ie, At) | 0, p = p + Math.imul(ne, lt) | 0, d = d + Math.imul(ne, ft) | 0, d = d + Math.imul(re, lt) | 0, y = y + Math.imul(re, ft) | 0;
      var ai = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (ai >>> 26) | 0, ai &= 67108863, p = Math.imul(Ye, $e), d = Math.imul(Ye, Ke), d = d + Math.imul(Ze, $e) | 0, y = Math.imul(Ze, Ke), p = p + Math.imul(Xe, et) | 0, d = d + Math.imul(Xe, tt) | 0, d = d + Math.imul(Ve, et) | 0, y = y + Math.imul(Ve, tt) | 0, p = p + Math.imul(ze, nt) | 0, d = d + Math.imul(ze, rt) | 0, d = d + Math.imul(He, nt) | 0, y = y + Math.imul(He, rt) | 0, p = p + Math.imul(Ue, st) | 0, d = d + Math.imul(Ue, it) | 0, d = d + Math.imul(Ge, st) | 0, y = y + Math.imul(Ge, it) | 0, p = p + Math.imul(Ne, ot) | 0, d = d + Math.imul(Ne, at) | 0, d = d + Math.imul(Fe, ot) | 0, y = y + Math.imul(Fe, at) | 0, p = p + Math.imul(Re, ct) | 0, d = d + Math.imul(Re, ut) | 0, d = d + Math.imul(Ie, ct) | 0, y = y + Math.imul(Ie, ut) | 0, p = p + Math.imul(ue, dt) | 0, d = d + Math.imul(ue, At) | 0, d = d + Math.imul(he, dt) | 0, y = y + Math.imul(he, At) | 0, p = p + Math.imul(Ae, lt) | 0, d = d + Math.imul(Ae, ft) | 0, d = d + Math.imul(ie, lt) | 0, y = y + Math.imul(ie, ft) | 0;
      var ci = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (ci >>> 26) | 0, ci &= 67108863, p = Math.imul(Ye, et), d = Math.imul(Ye, tt), d = d + Math.imul(Ze, et) | 0, y = Math.imul(Ze, tt), p = p + Math.imul(Xe, nt) | 0, d = d + Math.imul(Xe, rt) | 0, d = d + Math.imul(Ve, nt) | 0, y = y + Math.imul(Ve, rt) | 0, p = p + Math.imul(ze, st) | 0, d = d + Math.imul(ze, it) | 0, d = d + Math.imul(He, st) | 0, y = y + Math.imul(He, it) | 0, p = p + Math.imul(Ue, ot) | 0, d = d + Math.imul(Ue, at) | 0, d = d + Math.imul(Ge, ot) | 0, y = y + Math.imul(Ge, at) | 0, p = p + Math.imul(Ne, ct) | 0, d = d + Math.imul(Ne, ut) | 0, d = d + Math.imul(Fe, ct) | 0, y = y + Math.imul(Fe, ut) | 0, p = p + Math.imul(Re, dt) | 0, d = d + Math.imul(Re, At) | 0, d = d + Math.imul(Ie, dt) | 0, y = y + Math.imul(Ie, At) | 0, p = p + Math.imul(ue, lt) | 0, d = d + Math.imul(ue, ft) | 0, d = d + Math.imul(he, lt) | 0, y = y + Math.imul(he, ft) | 0;
      var ui = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (ui >>> 26) | 0, ui &= 67108863, p = Math.imul(Ye, nt), d = Math.imul(Ye, rt), d = d + Math.imul(Ze, nt) | 0, y = Math.imul(Ze, rt), p = p + Math.imul(Xe, st) | 0, d = d + Math.imul(Xe, it) | 0, d = d + Math.imul(Ve, st) | 0, y = y + Math.imul(Ve, it) | 0, p = p + Math.imul(ze, ot) | 0, d = d + Math.imul(ze, at) | 0, d = d + Math.imul(He, ot) | 0, y = y + Math.imul(He, at) | 0, p = p + Math.imul(Ue, ct) | 0, d = d + Math.imul(Ue, ut) | 0, d = d + Math.imul(Ge, ct) | 0, y = y + Math.imul(Ge, ut) | 0, p = p + Math.imul(Ne, dt) | 0, d = d + Math.imul(Ne, At) | 0, d = d + Math.imul(Fe, dt) | 0, y = y + Math.imul(Fe, At) | 0, p = p + Math.imul(Re, lt) | 0, d = d + Math.imul(Re, ft) | 0, d = d + Math.imul(Ie, lt) | 0, y = y + Math.imul(Ie, ft) | 0;
      var di = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (di >>> 26) | 0, di &= 67108863, p = Math.imul(Ye, st), d = Math.imul(Ye, it), d = d + Math.imul(Ze, st) | 0, y = Math.imul(Ze, it), p = p + Math.imul(Xe, ot) | 0, d = d + Math.imul(Xe, at) | 0, d = d + Math.imul(Ve, ot) | 0, y = y + Math.imul(Ve, at) | 0, p = p + Math.imul(ze, ct) | 0, d = d + Math.imul(ze, ut) | 0, d = d + Math.imul(He, ct) | 0, y = y + Math.imul(He, ut) | 0, p = p + Math.imul(Ue, dt) | 0, d = d + Math.imul(Ue, At) | 0, d = d + Math.imul(Ge, dt) | 0, y = y + Math.imul(Ge, At) | 0, p = p + Math.imul(Ne, lt) | 0, d = d + Math.imul(Ne, ft) | 0, d = d + Math.imul(Fe, lt) | 0, y = y + Math.imul(Fe, ft) | 0;
      var Ai = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (Ai >>> 26) | 0, Ai &= 67108863, p = Math.imul(Ye, ot), d = Math.imul(Ye, at), d = d + Math.imul(Ze, ot) | 0, y = Math.imul(Ze, at), p = p + Math.imul(Xe, ct) | 0, d = d + Math.imul(Xe, ut) | 0, d = d + Math.imul(Ve, ct) | 0, y = y + Math.imul(Ve, ut) | 0, p = p + Math.imul(ze, dt) | 0, d = d + Math.imul(ze, At) | 0, d = d + Math.imul(He, dt) | 0, y = y + Math.imul(He, At) | 0, p = p + Math.imul(Ue, lt) | 0, d = d + Math.imul(Ue, ft) | 0, d = d + Math.imul(Ge, lt) | 0, y = y + Math.imul(Ge, ft) | 0;
      var li = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (li >>> 26) | 0, li &= 67108863, p = Math.imul(Ye, ct), d = Math.imul(Ye, ut), d = d + Math.imul(Ze, ct) | 0, y = Math.imul(Ze, ut), p = p + Math.imul(Xe, dt) | 0, d = d + Math.imul(Xe, At) | 0, d = d + Math.imul(Ve, dt) | 0, y = y + Math.imul(Ve, At) | 0, p = p + Math.imul(ze, lt) | 0, d = d + Math.imul(ze, ft) | 0, d = d + Math.imul(He, lt) | 0, y = y + Math.imul(He, ft) | 0;
      var fi = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (fi >>> 26) | 0, fi &= 67108863, p = Math.imul(Ye, dt), d = Math.imul(Ye, At), d = d + Math.imul(Ze, dt) | 0, y = Math.imul(Ze, At), p = p + Math.imul(Xe, lt) | 0, d = d + Math.imul(Xe, ft) | 0, d = d + Math.imul(Ve, lt) | 0, y = y + Math.imul(Ve, ft) | 0;
      var hi = (E + p | 0) + ((d & 8191) << 13) | 0;
      E = (y + (d >>> 13) | 0) + (hi >>> 26) | 0, hi &= 67108863, p = Math.imul(Ye, lt), d = Math.imul(Ye, ft), d = d + Math.imul(Ze, lt) | 0, y = Math.imul(Ze, ft);
      var gi = (E + p | 0) + ((d & 8191) << 13) | 0;
      return E = (y + (d >>> 13) | 0) + (gi >>> 26) | 0, gi &= 67108863, I[0] = js, I[1] = $s, I[2] = Ks, I[3] = ei, I[4] = ti, I[5] = ni, I[6] = ri, I[7] = si, I[8] = ii, I[9] = oi, I[10] = ai, I[11] = ci, I[12] = ui, I[13] = di, I[14] = Ai, I[15] = li, I[16] = fi, I[17] = hi, I[18] = gi, E !== 0 && (I[19] = E, l.length++), l;
    };
    Math.imul || (G = T);
    function P(b, a, u) {
      u.negative = a.negative ^ b.negative, u.length = b.length + a.length;
      for (var l = 0, m = 0, h = 0; h < u.length - 1; h++) {
        var I = m;
        m = 0;
        for (var E = l & 67108863, p = Math.min(h, a.length - 1), d = Math.max(0, h - b.length + 1); d <= p; d++) {
          var y = h - d, Y = b.words[y] | 0, V = a.words[d] | 0, $ = Y * V, j = $ & 67108863;
          I = I + ($ / 67108864 | 0) | 0, j = j + E | 0, E = j & 67108863, I = I + (j >>> 26) | 0, m += I >>> 26, I &= 67108863;
        }
        u.words[h] = E, l = I, I = m;
      }
      return l !== 0 ? u.words[h] = l : u.length--, u._strip();
    }
    function W(b, a, u) {
      return P(b, a, u);
    }
    i.prototype.mulTo = function(a, u) {
      var l, m = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = G(this, a, u) : m < 63 ? l = T(this, a, u) : m < 1024 ? l = P(this, a, u) : l = W(this, a, u), l;
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
      for (var l = 0, m = 0; m < this.length; m++) {
        var h = (this.words[m] | 0) * a, I = (h & 67108863) + (l & 67108863);
        l >>= 26, l += h / 67108864 | 0, l += I >>> 26, this.words[m] = I & 67108863;
      }
      return l !== 0 && (this.words[m] = l, this.length++), u ? this.ineg() : this;
    }, i.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(a) {
      var u = D(a);
      if (u.length === 0) return new i(1);
      for (var l = this, m = 0; m < u.length && u[m] === 0; m++, l = l.sqr())
        ;
      if (++m < u.length)
        for (var h = l.sqr(); m < u.length; m++, h = h.sqr())
          u[m] !== 0 && (l = l.mul(h));
      return l;
    }, i.prototype.iushln = function(a) {
      r(typeof a == "number" && a >= 0);
      var u = a % 26, l = (a - u) / 26, m = 67108863 >>> 26 - u << 26 - u, h;
      if (u !== 0) {
        var I = 0;
        for (h = 0; h < this.length; h++) {
          var E = this.words[h] & m, p = (this.words[h] | 0) - E << u;
          this.words[h] = p | I, I = E >>> 26 - u;
        }
        I && (this.words[h] = I, this.length++);
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
    }, i.prototype.iushrn = function(a, u, l) {
      r(typeof a == "number" && a >= 0);
      var m;
      u ? m = (u - u % 26) / 26 : m = 0;
      var h = a % 26, I = Math.min((a - h) / 26, this.length), E = 67108863 ^ 67108863 >>> h << h, p = l;
      if (m -= I, m = Math.max(0, m), p) {
        for (var d = 0; d < I; d++)
          p.words[d] = this.words[d];
        p.length = I;
      }
      if (I !== 0) if (this.length > I)
        for (this.length -= I, d = 0; d < this.length; d++)
          this.words[d] = this.words[d + I];
      else
        this.words[0] = 0, this.length = 1;
      var y = 0;
      for (d = this.length - 1; d >= 0 && (y !== 0 || d >= m); d--) {
        var Y = this.words[d] | 0;
        this.words[d] = y << 26 - h | Y >>> h, y = Y & E;
      }
      return p && y !== 0 && (p.words[p.length++] = y), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
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
      var u = a % 26, l = (a - u) / 26, m = 1 << u;
      if (this.length <= l) return !1;
      var h = this.words[l];
      return !!(h & m);
    }, i.prototype.imaskn = function(a) {
      r(typeof a == "number" && a >= 0);
      var u = a % 26, l = (a - u) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= l)
        return this;
      if (u !== 0 && l++, this.length = Math.min(l, this.length), u !== 0) {
        var m = 67108863 ^ 67108863 >>> u << u;
        this.words[this.length - 1] &= m;
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
      var m = a.length + l, h;
      this._expand(m);
      var I, E = 0;
      for (h = 0; h < a.length; h++) {
        I = (this.words[h + l] | 0) + E;
        var p = (a.words[h] | 0) * u;
        I -= p & 67108863, E = (I >> 26) - (p / 67108864 | 0), this.words[h + l] = I & 67108863;
      }
      for (; h < this.length - l; h++)
        I = (this.words[h + l] | 0) + E, E = I >> 26, this.words[h + l] = I & 67108863;
      if (E === 0) return this._strip();
      for (r(E === -1), E = 0, h = 0; h < this.length; h++)
        I = -(this.words[h] | 0) + E, E = I >> 26, this.words[h] = I & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, u) {
      var l = this.length - a.length, m = this.clone(), h = a, I = h.words[h.length - 1] | 0, E = this._countBits(I);
      l = 26 - E, l !== 0 && (h = h.ushln(l), m.iushln(l), I = h.words[h.length - 1] | 0);
      var p = m.length - h.length, d;
      if (u !== "mod") {
        d = new i(null), d.length = p + 1, d.words = new Array(d.length);
        for (var y = 0; y < d.length; y++)
          d.words[y] = 0;
      }
      var Y = m.clone()._ishlnsubmul(h, 1, p);
      Y.negative === 0 && (m = Y, d && (d.words[p] = 1));
      for (var V = p - 1; V >= 0; V--) {
        var $ = (m.words[h.length + V] | 0) * 67108864 + (m.words[h.length + V - 1] | 0);
        for ($ = Math.min($ / I | 0, 67108863), m._ishlnsubmul(h, $, V); m.negative !== 0; )
          $--, m.negative = 0, m._ishlnsubmul(h, 1, V), m.isZero() || (m.negative ^= 1);
        d && (d.words[V] = $);
      }
      return d && d._strip(), m._strip(), u !== "div" && l !== 0 && m.iushrn(l), {
        div: d || null,
        mod: m
      };
    }, i.prototype.divmod = function(a, u, l) {
      if (r(!a.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var m, h, I;
      return this.negative !== 0 && a.negative === 0 ? (I = this.neg().divmod(a, u), u !== "mod" && (m = I.div.neg()), u !== "div" && (h = I.mod.neg(), l && h.negative !== 0 && h.iadd(a)), {
        div: m,
        mod: h
      }) : this.negative === 0 && a.negative !== 0 ? (I = this.divmod(a.neg(), u), u !== "mod" && (m = I.div.neg()), {
        div: m,
        mod: I.mod
      }) : this.negative & a.negative ? (I = this.neg().divmod(a.neg(), u), u !== "div" && (h = I.mod.neg(), l && h.negative !== 0 && h.isub(a)), {
        div: I.div,
        mod: h
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
      var l = u.div.negative !== 0 ? u.mod.isub(a) : u.mod, m = a.ushrn(1), h = a.andln(1), I = l.cmp(m);
      return I < 0 || h === 1 && I === 0 ? u.div : u.div.negative !== 0 ? u.div.isubn(1) : u.div.iaddn(1);
    }, i.prototype.modrn = function(a) {
      var u = a < 0;
      u && (a = -a), r(a <= 67108863);
      for (var l = (1 << 26) % a, m = 0, h = this.length - 1; h >= 0; h--)
        m = (l * m + (this.words[h] | 0)) % a;
      return u ? -m : m;
    }, i.prototype.modn = function(a) {
      return this.modrn(a);
    }, i.prototype.idivn = function(a) {
      var u = a < 0;
      u && (a = -a), r(a <= 67108863);
      for (var l = 0, m = this.length - 1; m >= 0; m--) {
        var h = (this.words[m] | 0) + l * 67108864;
        this.words[m] = h / a | 0, l = h % a;
      }
      return this._strip(), u ? this.ineg() : this;
    }, i.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, i.prototype.egcd = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var u = this, l = a.clone();
      u.negative !== 0 ? u = u.umod(a) : u = u.clone();
      for (var m = new i(1), h = new i(0), I = new i(0), E = new i(1), p = 0; u.isEven() && l.isEven(); )
        u.iushrn(1), l.iushrn(1), ++p;
      for (var d = l.clone(), y = u.clone(); !u.isZero(); ) {
        for (var Y = 0, V = 1; !(u.words[0] & V) && Y < 26; ++Y, V <<= 1) ;
        if (Y > 0)
          for (u.iushrn(Y); Y-- > 0; )
            (m.isOdd() || h.isOdd()) && (m.iadd(d), h.isub(y)), m.iushrn(1), h.iushrn(1);
        for (var $ = 0, j = 1; !(l.words[0] & j) && $ < 26; ++$, j <<= 1) ;
        if ($ > 0)
          for (l.iushrn($); $-- > 0; )
            (I.isOdd() || E.isOdd()) && (I.iadd(d), E.isub(y)), I.iushrn(1), E.iushrn(1);
        u.cmp(l) >= 0 ? (u.isub(l), m.isub(I), h.isub(E)) : (l.isub(u), I.isub(m), E.isub(h));
      }
      return {
        a: I,
        b: E,
        gcd: l.iushln(p)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var u = this, l = a.clone();
      u.negative !== 0 ? u = u.umod(a) : u = u.clone();
      for (var m = new i(1), h = new i(0), I = l.clone(); u.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var E = 0, p = 1; !(u.words[0] & p) && E < 26; ++E, p <<= 1) ;
        if (E > 0)
          for (u.iushrn(E); E-- > 0; )
            m.isOdd() && m.iadd(I), m.iushrn(1);
        for (var d = 0, y = 1; !(l.words[0] & y) && d < 26; ++d, y <<= 1) ;
        if (d > 0)
          for (l.iushrn(d); d-- > 0; )
            h.isOdd() && h.iadd(I), h.iushrn(1);
        u.cmp(l) >= 0 ? (u.isub(l), m.isub(h)) : (l.isub(u), h.isub(m));
      }
      var Y;
      return u.cmpn(1) === 0 ? Y = m : Y = h, Y.cmpn(0) < 0 && Y.iadd(a), Y;
    }, i.prototype.gcd = function(a) {
      if (this.isZero()) return a.abs();
      if (a.isZero()) return this.abs();
      var u = this.clone(), l = a.clone();
      u.negative = 0, l.negative = 0;
      for (var m = 0; u.isEven() && l.isEven(); m++)
        u.iushrn(1), l.iushrn(1);
      do {
        for (; u.isEven(); )
          u.iushrn(1);
        for (; l.isEven(); )
          l.iushrn(1);
        var h = u.cmp(l);
        if (h < 0) {
          var I = u;
          u = l, l = I;
        } else if (h === 0 || l.cmpn(1) === 0)
          break;
        u.isub(l);
      } while (!0);
      return l.iushln(m);
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
      var u = a % 26, l = (a - u) / 26, m = 1 << u;
      if (this.length <= l)
        return this._expand(l + 1), this.words[l] |= m, this;
      for (var h = m, I = l; h !== 0 && I < this.length; I++) {
        var E = this.words[I] | 0;
        E += h, h = E >>> 26, E &= 67108863, this.words[I] = E;
      }
      return h !== 0 && (this.words[I] = h, this.length++), this;
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
        var m = this.words[0] | 0;
        l = m === a ? 0 : m < a ? -1 : 1;
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
        var m = this.words[l] | 0, h = a.words[l] | 0;
        if (m !== h) {
          m < h ? u = -1 : m > h && (u = 1);
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
      return new X(a);
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
    function Q(b, a) {
      this.name = b, this.p = new i(a, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    Q.prototype._tmp = function() {
      var a = new i(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, Q.prototype.ireduce = function(a) {
      var u = a, l;
      do
        this.split(u, this.tmp), u = this.imulK(u), u = u.iadd(this.tmp), l = u.bitLength();
      while (l > this.n);
      var m = l < this.n ? -1 : u.ucmp(this.p);
      return m === 0 ? (u.words[0] = 0, u.length = 1) : m > 0 ? u.isub(this.p) : u.strip !== void 0 ? u.strip() : u._strip(), u;
    }, Q.prototype.split = function(a, u) {
      a.iushrn(this.n, 0, u);
    }, Q.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function k() {
      Q.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(k, Q), k.prototype.split = function(a, u) {
      for (var l = 4194303, m = Math.min(a.length, 9), h = 0; h < m; h++)
        u.words[h] = a.words[h];
      if (u.length = m, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var I = a.words[9];
      for (u.words[u.length++] = I & l, h = 10; h < a.length; h++) {
        var E = a.words[h] | 0;
        a.words[h - 10] = (E & l) << 4 | I >>> 22, I = E;
      }
      I >>>= 22, a.words[h - 10] = I, I === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, k.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var u = 0, l = 0; l < a.length; l++) {
        var m = a.words[l] | 0;
        u += m * 977, a.words[l] = u & 67108863, u = m * 64 + (u / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function O() {
      Q.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(O, Q);
    function U() {
      Q.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(U, Q);
    function H() {
      Q.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(H, Q), H.prototype.imulK = function(a) {
      for (var u = 0, l = 0; l < a.length; l++) {
        var m = (a.words[l] | 0) * 19 + u, h = m & 67108863;
        m >>>= 26, a.words[l] = h, u = m;
      }
      return u !== 0 && (a.words[a.length++] = u), a;
    }, i._prime = function(a) {
      if (L[a]) return L[a];
      var u;
      if (a === "k256")
        u = new k();
      else if (a === "p224")
        u = new O();
      else if (a === "p192")
        u = new U();
      else if (a === "p25519")
        u = new H();
      else
        throw new Error("Unknown prime " + a);
      return L[a] = u, u;
    };
    function X(b) {
      if (typeof b == "string") {
        var a = i._prime(b);
        this.m = a.p, this.prime = a;
      } else
        r(b.gtn(1), "modulus must be greater than 1"), this.m = b, this.prime = null;
    }
    X.prototype._verify1 = function(a) {
      r(a.negative === 0, "red works only with positives"), r(a.red, "red works only with red numbers");
    }, X.prototype._verify2 = function(a, u) {
      r((a.negative | u.negative) === 0, "red works only with positives"), r(
        a.red && a.red === u.red,
        "red works only with red numbers"
      );
    }, X.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (w(a, a.umod(this.m)._forceRed(this)), a);
    }, X.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, X.prototype.add = function(a, u) {
      this._verify2(a, u);
      var l = a.add(u);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, X.prototype.iadd = function(a, u) {
      this._verify2(a, u);
      var l = a.iadd(u);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, X.prototype.sub = function(a, u) {
      this._verify2(a, u);
      var l = a.sub(u);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, X.prototype.isub = function(a, u) {
      this._verify2(a, u);
      var l = a.isub(u);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, X.prototype.shl = function(a, u) {
      return this._verify1(a), this.imod(a.ushln(u));
    }, X.prototype.imul = function(a, u) {
      return this._verify2(a, u), this.imod(a.imul(u));
    }, X.prototype.mul = function(a, u) {
      return this._verify2(a, u), this.imod(a.mul(u));
    }, X.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, X.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, X.prototype.sqrt = function(a) {
      if (a.isZero()) return a.clone();
      var u = this.m.andln(3);
      if (r(u % 2 === 1), u === 3) {
        var l = this.m.add(new i(1)).iushrn(2);
        return this.pow(a, l);
      }
      for (var m = this.m.subn(1), h = 0; !m.isZero() && m.andln(1) === 0; )
        h++, m.iushrn(1);
      r(!m.isZero());
      var I = new i(1).toRed(this), E = I.redNeg(), p = this.m.subn(1).iushrn(1), d = this.m.bitLength();
      for (d = new i(2 * d * d).toRed(this); this.pow(d, p).cmp(E) !== 0; )
        d.redIAdd(E);
      for (var y = this.pow(d, m), Y = this.pow(a, m.addn(1).iushrn(1)), V = this.pow(a, m), $ = h; V.cmp(I) !== 0; ) {
        for (var j = V, ne = 0; j.cmp(I) !== 0; ne++)
          j = j.redSqr();
        r(ne < $);
        var re = this.pow(y, new i(1).iushln($ - ne - 1));
        Y = Y.redMul(re), y = re.redSqr(), V = V.redMul(y), $ = ne;
      }
      return Y;
    }, X.prototype.invm = function(a) {
      var u = a._invmp(this.m);
      return u.negative !== 0 ? (u.negative = 0, this.imod(u).redNeg()) : this.imod(u);
    }, X.prototype.pow = function(a, u) {
      if (u.isZero()) return new i(1).toRed(this);
      if (u.cmpn(1) === 0) return a.clone();
      var l = 4, m = new Array(1 << l);
      m[0] = new i(1).toRed(this), m[1] = a;
      for (var h = 2; h < m.length; h++)
        m[h] = this.mul(m[h - 1], a);
      var I = m[0], E = 0, p = 0, d = u.bitLength() % 26;
      for (d === 0 && (d = 26), h = u.length - 1; h >= 0; h--) {
        for (var y = u.words[h], Y = d - 1; Y >= 0; Y--) {
          var V = y >> Y & 1;
          if (I !== m[0] && (I = this.sqr(I)), V === 0 && E === 0) {
            p = 0;
            continue;
          }
          E <<= 1, E |= V, p++, !(p !== l && (h !== 0 || Y !== 0)) && (I = this.mul(I, m[E]), p = 0, E = 0);
        }
        d = 26;
      }
      return I;
    }, X.prototype.convertTo = function(a) {
      var u = a.umod(this.m);
      return u === a ? u.clone() : u;
    }, X.prototype.convertFrom = function(a) {
      var u = a.clone();
      return u.red = null, u;
    }, i.mont = function(a) {
      return new K(a);
    };
    function K(b) {
      X.call(this, b), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(K, X), K.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, K.prototype.convertFrom = function(a) {
      var u = this.imod(a.mul(this.rinv));
      return u.red = null, u;
    }, K.prototype.imul = function(a, u) {
      if (a.isZero() || u.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var l = a.imul(u), m = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = l.isub(m).iushrn(this.shift), I = h;
      return h.cmp(this.m) >= 0 ? I = h.isub(this.m) : h.cmpn(0) < 0 && (I = h.iadd(this.m)), I._forceRed(this);
    }, K.prototype.mul = function(a, u) {
      if (a.isZero() || u.isZero()) return new i(0)._forceRed(this);
      var l = a.mul(u), m = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = l.isub(m).iushrn(this.shift), I = h;
      return h.cmp(this.m) >= 0 ? I = h.isub(this.m) : h.cmpn(0) < 0 && (I = h.iadd(this.m)), I._forceRed(this);
    }, K.prototype.invm = function(a) {
      var u = this.imod(a._invmp(this.m).mul(this.r2));
      return u._forceRed(this);
    };
  })(e, Ce);
})(mo);
var aA = mo.exports;
const Kr = /* @__PURE__ */ rA(aA);
var s0 = 9, i0 = 3, Mi = 9;
function cA(e, t) {
  const { precision: n = s0, minPrecision: r = i0 } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let A = i.slice(0, n);
  if (r < n) {
    const w = A.match(/.*[1-9]{1}/), g = (w == null ? void 0 : w[0].length) || 0, C = Math.max(r, g);
    A = A.slice(0, C);
  }
  const f = A ? `.${A}` : "";
  return `${c}${f}`;
}
var Oe = class extends Kr {
  constructor(t, n, r) {
    let s = t, i = n;
    Oe.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
    super(s ?? 0, i, r);
    M(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      throw new R(S.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new R(
        S.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new R(S.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: n = Mi,
      precision: r = s0,
      minPrecision: s = i0
    } = t || {}, i = this.formatUnits(n), o = cA(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), A = c.match(/[1-9]/);
      if (A && A.index && A.index + 1 > r) {
        const [f = "0"] = o.split(".");
        return `${f}.${c.slice(0, A.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = Mi) {
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
    return new Oe(super.sqr().toArray());
  }
  neg() {
    return new Oe(super.neg().toArray());
  }
  abs() {
    return new Oe(super.abs().toArray());
  }
  toTwos(t) {
    return new Oe(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new Oe(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, n) {
    const r = super[n](new Oe(t));
    return Oe.isBN(r) ? new Oe(r.toArray()) : r;
  }
  clone() {
    return new Oe(this.toArray());
  }
  mulTo(t, n) {
    const r = new Kr(this.toArray()).mulTo(t, n);
    return new Oe(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new Kr(this.toArray()).egcd(t);
    return {
      a: new Oe(n.toArray()),
      b: new Oe(r.toArray()),
      gcd: new Oe(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new Kr(this.toArray()).divmod(new Oe(t), n, r);
    return {
      div: new Oe(s == null ? void 0 : s.toArray()),
      mod: new Oe(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Oe(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Oe(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, v = (e, t, n) => new Oe(e, t, n);
v.parseUnits = (e, t = Mi) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new R(
      S.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const c = `${r.replaceAll(",", "")}${o.join("")}`;
  return v(c);
};
function pn(e) {
  return v(e).toNumber();
}
function wo(e, t) {
  return v(e).toHex(t);
}
function tn(e, t) {
  return v(e).toBytes(t);
}
function pI(e, t) {
  return v(e).formatUnits(t);
}
function mI(e, t) {
  return v(e).format(t);
}
function wI(...e) {
  return e.reduce((t, n) => v(n).gt(t) ? v(n) : t, v(0));
}
function yI(...e) {
  return v(Math.ceil(e.reduce((t, n) => v(t).mul(n), v(1)).toNumber()));
}
var wt = Uint8Array, Rt = Uint16Array, yo = Int32Array, Fs = new wt([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), Ms = new wt([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), Oi = new wt([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), o0 = function(e, t) {
  for (var n = new Rt(31), r = 0; r < 31; ++r)
    n[r] = t += 1 << e[r - 1];
  for (var s = new yo(n[30]), r = 1; r < 30; ++r)
    for (var i = n[r]; i < n[r + 1]; ++i)
      s[i] = i - n[r] << 5 | r;
  return { b: n, r: s };
}, a0 = o0(Fs, 2), c0 = a0.b, Li = a0.r;
c0[28] = 258, Li[258] = 28;
var u0 = o0(Ms, 0), uA = u0.b, va = u0.r, ki = new Rt(32768);
for (var Qe = 0; Qe < 32768; ++Qe) {
  var on = (Qe & 43690) >> 1 | (Qe & 21845) << 1;
  on = (on & 52428) >> 2 | (on & 13107) << 2, on = (on & 61680) >> 4 | (on & 3855) << 4, ki[Qe] = ((on & 65280) >> 8 | (on & 255) << 8) >> 1;
}
var Zt = function(e, t, n) {
  for (var r = e.length, s = 0, i = new Rt(t); s < r; ++s)
    e[s] && ++i[e[s] - 1];
  var o = new Rt(t);
  for (s = 1; s < t; ++s)
    o[s] = o[s - 1] + i[s - 1] << 1;
  var c;
  if (n) {
    c = new Rt(1 << t);
    var A = 15 - t;
    for (s = 0; s < r; ++s)
      if (e[s])
        for (var f = s << 4 | e[s], w = t - e[s], g = o[e[s] - 1]++ << w, C = g | (1 << w) - 1; g <= C; ++g)
          c[ki[g] >> A] = f;
  } else
    for (c = new Rt(r), s = 0; s < r; ++s)
      e[s] && (c[s] = ki[o[e[s] - 1]++] >> 15 - e[s]);
  return c;
}, Bn = new wt(288);
for (var Qe = 0; Qe < 144; ++Qe)
  Bn[Qe] = 8;
for (var Qe = 144; Qe < 256; ++Qe)
  Bn[Qe] = 9;
for (var Qe = 256; Qe < 280; ++Qe)
  Bn[Qe] = 7;
for (var Qe = 280; Qe < 288; ++Qe)
  Bn[Qe] = 8;
var Nr = new wt(32);
for (var Qe = 0; Qe < 32; ++Qe)
  Nr[Qe] = 5;
var dA = /* @__PURE__ */ Zt(Bn, 9, 0), AA = /* @__PURE__ */ Zt(Bn, 9, 1), lA = /* @__PURE__ */ Zt(Nr, 5, 0), fA = /* @__PURE__ */ Zt(Nr, 5, 1), mi = function(e) {
  for (var t = e[0], n = 1; n < e.length; ++n)
    e[n] > t && (t = e[n]);
  return t;
}, Dt = function(e, t, n) {
  var r = t / 8 | 0;
  return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, wi = function(e, t) {
  var n = t / 8 | 0;
  return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, Io = function(e) {
  return (e + 7) / 8 | 0;
}, d0 = function(e, t, n) {
  return (n == null || n > e.length) && (n = e.length), new wt(e.subarray(t, n));
}, hA = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], Ft = function(e, t, n) {
  var r = new Error(t || hA[e]);
  if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, Ft), !n)
    throw r;
  return r;
}, gA = function(e, t, n, r) {
  var s = e.length, i = 0;
  if (!s || t.f && !t.l)
    return n || new wt(0);
  var o = !n, c = o || t.i != 2, A = t.i;
  o && (n = new wt(s * 3));
  var f = function(Ae) {
    var ie = n.length;
    if (Ae > ie) {
      var me = new wt(Math.max(ie * 2, Ae));
      me.set(n), n = me;
    }
  }, w = t.f || 0, g = t.p || 0, C = t.b || 0, x = t.l, _ = t.d, B = t.m, D = t.n, T = s * 8;
  do {
    if (!x) {
      w = Dt(e, g, 1);
      var G = Dt(e, g + 1, 3);
      if (g += 3, G)
        if (G == 1)
          x = AA, _ = fA, B = 9, D = 5;
        else if (G == 2) {
          var Q = Dt(e, g, 31) + 257, k = Dt(e, g + 10, 15) + 4, O = Q + Dt(e, g + 5, 31) + 1;
          g += 14;
          for (var U = new wt(O), H = new wt(19), X = 0; X < k; ++X)
            H[Oi[X]] = Dt(e, g + X * 3, 7);
          g += k * 3;
          for (var K = mi(H), b = (1 << K) - 1, a = Zt(H, K, 1), X = 0; X < O; ) {
            var u = a[Dt(e, g, b)];
            g += u & 15;
            var P = u >> 4;
            if (P < 16)
              U[X++] = P;
            else {
              var l = 0, m = 0;
              for (P == 16 ? (m = 3 + Dt(e, g, 3), g += 2, l = U[X - 1]) : P == 17 ? (m = 3 + Dt(e, g, 7), g += 3) : P == 18 && (m = 11 + Dt(e, g, 127), g += 7); m--; )
                U[X++] = l;
            }
          }
          var h = U.subarray(0, Q), I = U.subarray(Q);
          B = mi(h), D = mi(I), x = Zt(h, B, 1), _ = Zt(I, D, 1);
        } else
          Ft(1);
      else {
        var P = Io(g) + 4, W = e[P - 4] | e[P - 3] << 8, L = P + W;
        if (L > s) {
          A && Ft(0);
          break;
        }
        c && f(C + W), n.set(e.subarray(P, L), C), t.b = C += W, t.p = g = L * 8, t.f = w;
        continue;
      }
      if (g > T) {
        A && Ft(0);
        break;
      }
    }
    c && f(C + 131072);
    for (var E = (1 << B) - 1, p = (1 << D) - 1, d = g; ; d = g) {
      var l = x[wi(e, g) & E], y = l >> 4;
      if (g += l & 15, g > T) {
        A && Ft(0);
        break;
      }
      if (l || Ft(2), y < 256)
        n[C++] = y;
      else if (y == 256) {
        d = g, x = null;
        break;
      } else {
        var Y = y - 254;
        if (y > 264) {
          var X = y - 257, V = Fs[X];
          Y = Dt(e, g, (1 << V) - 1) + c0[X], g += V;
        }
        var $ = _[wi(e, g) & p], j = $ >> 4;
        $ || Ft(3), g += $ & 15;
        var I = uA[j];
        if (j > 3) {
          var V = Ms[j];
          I += wi(e, g) & (1 << V) - 1, g += V;
        }
        if (g > T) {
          A && Ft(0);
          break;
        }
        c && f(C + 131072);
        var ne = C + Y;
        if (C < I) {
          var re = i - I, be = Math.min(I, ne);
          for (re + C < 0 && Ft(3); C < be; ++C)
            n[C] = r[re + C];
        }
        for (; C < ne; ++C)
          n[C] = n[C - I];
      }
    }
    t.l = x, t.p = d, t.b = C, t.f = w, x && (w = 1, t.m = B, t.d = _, t.n = D);
  } while (!w);
  return C != n.length && o ? d0(n, 0, C) : n.subarray(0, C);
}, Jt = function(e, t, n) {
  n <<= t & 7;
  var r = t / 8 | 0;
  e[r] |= n, e[r + 1] |= n >> 8;
}, wr = function(e, t, n) {
  n <<= t & 7;
  var r = t / 8 | 0;
  e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, yi = function(e, t) {
  for (var n = [], r = 0; r < e.length; ++r)
    e[r] && n.push({ s: r, f: e[r] });
  var s = n.length, i = n.slice();
  if (!s)
    return { t: l0, l: 0 };
  if (s == 1) {
    var o = new wt(n[0].s + 1);
    return o[n[0].s] = 1, { t: o, l: 1 };
  }
  n.sort(function(L, Q) {
    return L.f - Q.f;
  }), n.push({ s: -1, f: 25001 });
  var c = n[0], A = n[1], f = 0, w = 1, g = 2;
  for (n[0] = { s: -1, f: c.f + A.f, l: c, r: A }; w != s - 1; )
    c = n[n[f].f < n[g].f ? f++ : g++], A = n[f != w && n[f].f < n[g].f ? f++ : g++], n[w++] = { s: -1, f: c.f + A.f, l: c, r: A };
  for (var C = i[0].s, r = 1; r < s; ++r)
    i[r].s > C && (C = i[r].s);
  var x = new Rt(C + 1), _ = Pi(n[w - 1], x, 0);
  if (_ > t) {
    var r = 0, B = 0, D = _ - t, T = 1 << D;
    for (i.sort(function(Q, k) {
      return x[k.s] - x[Q.s] || Q.f - k.f;
    }); r < s; ++r) {
      var G = i[r].s;
      if (x[G] > t)
        B += T - (1 << _ - x[G]), x[G] = t;
      else
        break;
    }
    for (B >>= D; B > 0; ) {
      var P = i[r].s;
      x[P] < t ? B -= 1 << t - x[P]++ - 1 : ++r;
    }
    for (; r >= 0 && B; --r) {
      var W = i[r].s;
      x[W] == t && (--x[W], ++B);
    }
    _ = t;
  }
  return { t: new wt(x), l: _ };
}, Pi = function(e, t, n) {
  return e.s == -1 ? Math.max(Pi(e.l, t, n + 1), Pi(e.r, t, n + 1)) : t[e.s] = n;
}, xa = function(e) {
  for (var t = e.length; t && !e[--t]; )
    ;
  for (var n = new Rt(++t), r = 0, s = e[0], i = 1, o = function(A) {
    n[r++] = A;
  }, c = 1; c <= t; ++c)
    if (e[c] == s && c != t)
      ++i;
    else {
      if (!s && i > 2) {
        for (; i > 138; i -= 138)
          o(32754);
        i > 2 && (o(i > 10 ? i - 11 << 5 | 28690 : i - 3 << 5 | 12305), i = 0);
      } else if (i > 3) {
        for (o(s), --i; i > 6; i -= 6)
          o(8304);
        i > 2 && (o(i - 3 << 5 | 8208), i = 0);
      }
      for (; i--; )
        o(s);
      i = 1, s = e[c];
    }
  return { c: n.subarray(0, r), n: t };
}, yr = function(e, t) {
  for (var n = 0, r = 0; r < t.length; ++r)
    n += e[r] * t[r];
  return n;
}, A0 = function(e, t, n) {
  var r = n.length, s = Io(t + 2);
  e[s] = r & 255, e[s + 1] = r >> 8, e[s + 2] = e[s] ^ 255, e[s + 3] = e[s + 1] ^ 255;
  for (var i = 0; i < r; ++i)
    e[s + i + 4] = n[i];
  return (s + 4 + r) * 8;
}, _a = function(e, t, n, r, s, i, o, c, A, f, w) {
  Jt(t, w++, n), ++s[256];
  for (var g = yi(s, 15), C = g.t, x = g.l, _ = yi(i, 15), B = _.t, D = _.l, T = xa(C), G = T.c, P = T.n, W = xa(B), L = W.c, Q = W.n, k = new Rt(19), O = 0; O < G.length; ++O)
    ++k[G[O] & 31];
  for (var O = 0; O < L.length; ++O)
    ++k[L[O] & 31];
  for (var U = yi(k, 7), H = U.t, X = U.l, K = 19; K > 4 && !H[Oi[K - 1]]; --K)
    ;
  var b = f + 5 << 3, a = yr(s, Bn) + yr(i, Nr) + o, u = yr(s, C) + yr(i, B) + o + 14 + 3 * K + yr(k, H) + 2 * k[16] + 3 * k[17] + 7 * k[18];
  if (A >= 0 && b <= a && b <= u)
    return A0(t, w, e.subarray(A, A + f));
  var l, m, h, I;
  if (Jt(t, w, 1 + (u < a)), w += 2, u < a) {
    l = Zt(C, x, 0), m = C, h = Zt(B, D, 0), I = B;
    var E = Zt(H, X, 0);
    Jt(t, w, P - 257), Jt(t, w + 5, Q - 1), Jt(t, w + 10, K - 4), w += 14;
    for (var O = 0; O < K; ++O)
      Jt(t, w + 3 * O, H[Oi[O]]);
    w += 3 * K;
    for (var p = [G, L], d = 0; d < 2; ++d)
      for (var y = p[d], O = 0; O < y.length; ++O) {
        var Y = y[O] & 31;
        Jt(t, w, E[Y]), w += H[Y], Y > 15 && (Jt(t, w, y[O] >> 5 & 127), w += y[O] >> 12);
      }
  } else
    l = dA, m = Bn, h = lA, I = Nr;
  for (var O = 0; O < c; ++O) {
    var V = r[O];
    if (V > 255) {
      var Y = V >> 18 & 31;
      wr(t, w, l[Y + 257]), w += m[Y + 257], Y > 7 && (Jt(t, w, V >> 23 & 31), w += Fs[Y]);
      var $ = V & 31;
      wr(t, w, h[$]), w += I[$], $ > 3 && (wr(t, w, V >> 5 & 8191), w += Ms[$]);
    } else
      wr(t, w, l[V]), w += m[V];
  }
  return wr(t, w, l[256]), w + m[256];
}, pA = /* @__PURE__ */ new yo([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), l0 = /* @__PURE__ */ new wt(0), mA = function(e, t, n, r, s, i) {
  var o = i.z || e.length, c = new wt(r + o + 5 * (1 + Math.ceil(o / 7e3)) + s), A = c.subarray(r, c.length - s), f = i.l, w = (i.r || 0) & 7;
  if (t) {
    w && (A[0] = i.r >> 3);
    for (var g = pA[t - 1], C = g >> 13, x = g & 8191, _ = (1 << n) - 1, B = i.p || new Rt(32768), D = i.h || new Rt(_ + 1), T = Math.ceil(n / 3), G = 2 * T, P = function(ue) {
      return (e[ue] ^ e[ue + 1] << T ^ e[ue + 2] << G) & _;
    }, W = new yo(25e3), L = new Rt(288), Q = new Rt(32), k = 0, O = 0, U = i.i || 0, H = 0, X = i.w || 0, K = 0; U + 2 < o; ++U) {
      var b = P(U), a = U & 32767, u = D[b];
      if (B[a] = u, D[b] = a, X <= U) {
        var l = o - U;
        if ((k > 7e3 || H > 24576) && (l > 423 || !f)) {
          w = _a(e, A, 0, W, L, Q, O, H, K, U - K, w), H = k = O = 0, K = U;
          for (var m = 0; m < 286; ++m)
            L[m] = 0;
          for (var m = 0; m < 30; ++m)
            Q[m] = 0;
        }
        var h = 2, I = 0, E = x, p = a - u & 32767;
        if (l > 2 && b == P(U - p))
          for (var d = Math.min(C, l) - 1, y = Math.min(32767, U), Y = Math.min(258, l); p <= y && --E && a != u; ) {
            if (e[U + h] == e[U + h - p]) {
              for (var V = 0; V < Y && e[U + V] == e[U + V - p]; ++V)
                ;
              if (V > h) {
                if (h = V, I = p, V > d)
                  break;
                for (var $ = Math.min(p, V - 2), j = 0, m = 0; m < $; ++m) {
                  var ne = U - p + m & 32767, re = B[ne], be = ne - re & 32767;
                  be > j && (j = be, u = ne);
                }
              }
            }
            a = u, u = B[a], p += a - u & 32767;
          }
        if (I) {
          W[H++] = 268435456 | Li[h] << 18 | va[I];
          var Ae = Li[h] & 31, ie = va[I] & 31;
          O += Fs[Ae] + Ms[ie], ++L[257 + Ae], ++Q[ie], X = U + h, ++k;
        } else
          W[H++] = e[U], ++L[e[U]];
      }
    }
    for (U = Math.max(U, X); U < o; ++U)
      W[H++] = e[U], ++L[e[U]];
    w = _a(e, A, f, W, L, Q, O, H, K, U - K, w), f || (i.r = w & 7 | A[w / 8 | 0] << 3, w -= 7, i.h = D, i.p = B, i.i = U, i.w = X);
  } else {
    for (var U = i.w || 0; U < o + f; U += 65535) {
      var me = U + 65535;
      me >= o && (A[w / 8 | 0] = f, me = o), w = A0(A, w + 1, e.subarray(U, me));
    }
    i.i = o;
  }
  return d0(c, 0, r + Io(w) + s);
}, wA = /* @__PURE__ */ function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var n = t, r = 9; --r; )
      n = (n & 1 && -306674912) ^ n >>> 1;
    e[t] = n;
  }
  return e;
}(), yA = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var n = e, r = 0; r < t.length; ++r)
        n = wA[n & 255 ^ t[r]] ^ n >>> 8;
      e = n;
    },
    d: function() {
      return ~e;
    }
  };
}, IA = function(e, t, n, r, s) {
  if (!s && (s = { l: 1 }, t.dictionary)) {
    var i = t.dictionary.subarray(-32768), o = new wt(i.length + e.length);
    o.set(i), o.set(e, i.length), e = o, s.w = i.length;
  }
  return mA(e, t.level == null ? 6 : t.level, t.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, r, s);
}, Ui = function(e, t, n) {
  for (; n; ++t)
    e[t] = n, n >>>= 8;
}, EA = function(e, t) {
  var n = t.filename;
  if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, e[9] = 3, t.mtime != 0 && Ui(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), n) {
    e[3] = 8;
    for (var r = 0; r <= n.length; ++r)
      e[r + 10] = n.charCodeAt(r);
  }
}, bA = function(e) {
  (e[0] != 31 || e[1] != 139 || e[2] != 8) && Ft(6, "invalid gzip data");
  var t = e[3], n = 10;
  t & 4 && (n += (e[10] | e[11] << 8) + 2);
  for (var r = (t >> 3 & 1) + (t >> 4 & 1); r > 0; r -= !e[n++])
    ;
  return n + (t & 2);
}, CA = function(e) {
  var t = e.length;
  return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}, BA = function(e) {
  return 10 + (e.filename ? e.filename.length + 1 : 0);
};
function vA(e, t) {
  t || (t = {});
  var n = yA(), r = e.length;
  n.p(e);
  var s = IA(e, t, BA(t), 8), i = s.length;
  return EA(s, t), Ui(s, i - 8, n.d()), Ui(s, i - 4, r), s;
}
function xA(e, t) {
  var n = bA(e);
  return n + 8 > e.length && Ft(6, "invalid gzip data"), gA(e.subarray(n, -8), { i: 2 }, new wt(CA(e)), t);
}
var _A = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), RA = 0;
try {
  _A.decode(l0, { stream: !0 }), RA = 1;
} catch {
}
var SA = Object.defineProperty, QA = (e, t, n) => t in e ? SA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, NA = (e, t, n) => (QA(e, t + "", n), n), II = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, f0 = (e, t) => {
  const n = [];
  for (let c = 0; c < e.length; c += t) {
    const A = new Uint8Array(t);
    A.set(e.slice(c, c + t)), n.push(A);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, q = (e, t, n = !0) => {
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
  throw new R(S.INVALID_DATA, s);
}, Os = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, oe = (e) => {
  const t = e.map((n) => q(n));
  return Os(t);
}, Ra = "0123456789abcdef";
function J(e) {
  const t = q(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Ra[(s & 240) >> 4] + Ra[s & 15];
  }
  return n;
}
var EI = (e) => {
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
    throw new R(S.PARSE_FAILED, r);
  }
  return n;
}, DA = 37, h0 = BigInt(2 ** 62) + BigInt(DA), TA = (e) => Math.floor(e / 1e3), g0 = (e) => e * 1e3, FA = (e) => Number(BigInt(e) - h0), MA = (e) => String(BigInt(e) + h0), OA = (e) => g0(FA(e)), ds = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new ds(OA(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new ds(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new ds(g0(e));
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
    return MA(this.toUnixSeconds());
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
    return TA(this.getTime());
  }
}, Eo = ds;
NA(Eo, "TAI64_NULL", "");
function LA(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var kA = {
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
}, PA = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, UA = {
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
}, bI = {
  chainConfig: kA,
  metadata: PA,
  stateConfig: UA
}, CI = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function vn(e) {
  return e !== void 0;
}
var p0 = v(0), Gi = v(58), Es = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", es = null;
function GA(e) {
  if (es == null) {
    es = {};
    for (let n = 0; n < Es.length; n++)
      es[Es[n]] = v(n);
  }
  const t = es[e];
  if (t == null)
    throw new R(S.INVALID_DATA, `invalid base58 value ${e}`);
  return v(t);
}
function m0(e) {
  const t = q(e);
  let n = v(t), r = "";
  for (; n.gt(p0); )
    r = Es[Number(n.mod(Gi))] + r, n = n.div(Gi);
  for (let s = 0; s < t.length && !t[s]; s++)
    r = Es[0] + r;
  return r;
}
function zA(e) {
  let t = p0;
  for (let n = 0; n < e.length; n++)
    t = t.mul(Gi), t = t.add(GA(e[n].toString()));
  return t;
}
function bo(e, t, n) {
  const r = q(e);
  if (n != null && n > r.length)
    throw new R(S.INVALID_DATA, "cannot slice beyond data bounds");
  return J(r.slice(t ?? 0, n ?? r.length));
}
function tr(e, t = !0) {
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
        throw new R(
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
function Dn(e, t, n, r, s) {
  return console.log(`invalid codepoint at offset ${t}; ${e}, bytes: ${n}`), t;
}
function HA(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function XA(e) {
  const t = q(e, "bytes"), n = [];
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
      (s & 192) === 128 ? r += Dn("UNEXPECTED_CONTINUE", r - 1, t) : r += Dn("BAD_PREFIX", r - 1, t);
      continue;
    }
    if (r - 1 + i >= t.length) {
      r += Dn("OVERRUN", r - 1, t);
      continue;
    }
    let c = s & (1 << 8 - i - 1) - 1;
    for (let A = 0; A < i; A++) {
      const f = t[r];
      if ((f & 192) !== 128) {
        r += Dn("MISSING_CONTINUE", r, t), c = null;
        break;
      }
      c = c << 6 | f & 63, r++;
    }
    if (c !== null) {
      if (c > 1114111) {
        r += Dn("OUT_OF_RANGE", r - 1 - i, t);
        continue;
      }
      if (c >= 55296 && c <= 57343) {
        r += Dn("UTF16_SURROGATE", r - 1 - i, t);
        continue;
      }
      if (c <= o) {
        r += Dn("OVERLONG", r - 1 - i, t);
        continue;
      }
      n.push(c);
    }
  }
  return n;
}
function Co(e) {
  return HA(XA(e));
}
var BI = (e) => {
  const t = q(e), n = vA(t);
  return Buffer.from(n).toString("base64");
}, vI = (e) => {
  const t = Buffer.from(e, "base64").toString("binary"), n = Buffer.from(t, "binary");
  return xA(n);
};
function _t(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function VA(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Bo(e, ...t) {
  if (!VA(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function w0(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  _t(e.outputLen), _t(e.blockLen);
}
function nr(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function y0(e, t) {
  Bo(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const As = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function YA(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const ls = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), zt = (e, t) => e << 32 - t | e >>> t, ZA = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!ZA)
  throw new Error("Non little-endian hardware is not supported");
function WA(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function rr(e) {
  if (typeof e == "string" && (e = WA(e)), !YA(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
let vo = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const JA = {}.toString;
function I0(e, t) {
  if (t !== void 0 && JA.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function Ls(e) {
  const t = (r) => e().update(rr(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function qA(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), A = r ? 4 : 0, f = r ? 0 : 4;
  e.setUint32(t + A, o, r), e.setUint32(t + f, c, r);
}
class xo extends vo {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ls(this.buffer);
  }
  update(t) {
    nr(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = rr(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const A = ls(t);
        for (; s <= i - o; o += s)
          this.process(A, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    nr(this), y0(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    qA(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = ls(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const f = A / 4, w = this.get();
    if (f > w.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < f; g++)
      c.setUint32(4 * g, w[g], i);
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
const jA = (e, t, n) => e & t ^ ~e & n, $A = (e, t, n) => e & t ^ e & n ^ t & n, KA = /* @__PURE__ */ new Uint32Array([
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
]), an = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), cn = /* @__PURE__ */ new Uint32Array(64);
let el = class extends xo {
  constructor() {
    super(64, 32, 8, !1), this.A = an[0] | 0, this.B = an[1] | 0, this.C = an[2] | 0, this.D = an[3] | 0, this.E = an[4] | 0, this.F = an[5] | 0, this.G = an[6] | 0, this.H = an[7] | 0;
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
    for (let g = 0; g < 16; g++, n += 4)
      cn[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const C = cn[g - 15], x = cn[g - 2], _ = zt(C, 7) ^ zt(C, 18) ^ C >>> 3, B = zt(x, 17) ^ zt(x, 19) ^ x >>> 10;
      cn[g] = B + cn[g - 7] + _ + cn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: A, G: f, H: w } = this;
    for (let g = 0; g < 64; g++) {
      const C = zt(c, 6) ^ zt(c, 11) ^ zt(c, 25), x = w + C + jA(c, A, f) + KA[g] + cn[g] | 0, B = (zt(r, 2) ^ zt(r, 13) ^ zt(r, 22)) + $A(r, s, i) | 0;
      w = f, f = A, A = c, c = o + x | 0, o = i, i = s, s = r, r = x + B | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, A = A + this.F | 0, f = f + this.G | 0, w = w + this.H | 0, this.set(r, s, i, o, c, A, f, w);
  }
  roundClean() {
    cn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const lr = /* @__PURE__ */ Ls(() => new el());
let E0 = class extends vo {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, w0(t);
    const r = rr(n);
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
    return nr(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    nr(this), Bo(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const _o = (e, t, n) => new E0(e, t).update(n).digest();
_o.create = (e, t) => new E0(e, t);
function tl(e, t, n, r) {
  w0(e);
  const s = I0({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (_t(i), _t(o), _t(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const A = rr(t), f = rr(n), w = new Uint8Array(o), g = _o.create(e, A), C = g._cloneInto().update(f);
  return { c: i, dkLen: o, asyncTick: c, DK: w, PRF: g, PRFSalt: C };
}
function nl(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Ro(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: A } = tl(e, t, n, r);
  let f;
  const w = new Uint8Array(4), g = ls(w), C = new Uint8Array(c.outputLen);
  for (let x = 1, _ = 0; _ < i; x++, _ += c.outputLen) {
    const B = o.subarray(_, _ + c.outputLen);
    g.setInt32(0, x, !1), (f = A._cloneInto(f)).update(w).digestInto(C), B.set(C.subarray(0, B.length));
    for (let D = 1; D < s; D++) {
      c._cloneInto(f).update(C).digestInto(C);
      for (let T = 0; T < B.length; T++)
        B[T] ^= C[T];
    }
  }
  return nl(c, A, o, f, C);
}
const we = (e, t) => e << t | e >>> 32 - t;
function Sa(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], c = e[t++] ^ n[r++], A = e[t++] ^ n[r++], f = e[t++] ^ n[r++], w = e[t++] ^ n[r++], g = e[t++] ^ n[r++], C = e[t++] ^ n[r++], x = e[t++] ^ n[r++], _ = e[t++] ^ n[r++], B = e[t++] ^ n[r++], D = e[t++] ^ n[r++], T = e[t++] ^ n[r++], G = e[t++] ^ n[r++], P = e[t++] ^ n[r++], W = e[t++] ^ n[r++], L = e[t++] ^ n[r++], Q = o, k = c, O = A, U = f, H = w, X = g, K = C, b = x, a = _, u = B, l = D, m = T, h = G, I = P, E = W, p = L;
  for (let d = 0; d < 8; d += 2)
    H ^= we(Q + h | 0, 7), a ^= we(H + Q | 0, 9), h ^= we(a + H | 0, 13), Q ^= we(h + a | 0, 18), u ^= we(X + k | 0, 7), I ^= we(u + X | 0, 9), k ^= we(I + u | 0, 13), X ^= we(k + I | 0, 18), E ^= we(l + K | 0, 7), O ^= we(E + l | 0, 9), K ^= we(O + E | 0, 13), l ^= we(K + O | 0, 18), U ^= we(p + m | 0, 7), b ^= we(U + p | 0, 9), m ^= we(b + U | 0, 13), p ^= we(m + b | 0, 18), k ^= we(Q + U | 0, 7), O ^= we(k + Q | 0, 9), U ^= we(O + k | 0, 13), Q ^= we(U + O | 0, 18), K ^= we(X + H | 0, 7), b ^= we(K + X | 0, 9), H ^= we(b + K | 0, 13), X ^= we(H + b | 0, 18), m ^= we(l + u | 0, 7), a ^= we(m + l | 0, 9), u ^= we(a + m | 0, 13), l ^= we(u + a | 0, 18), h ^= we(p + E | 0, 7), I ^= we(h + p | 0, 9), E ^= we(I + h | 0, 13), p ^= we(E + I | 0, 18);
  s[i++] = o + Q | 0, s[i++] = c + k | 0, s[i++] = A + O | 0, s[i++] = f + U | 0, s[i++] = w + H | 0, s[i++] = g + X | 0, s[i++] = C + K | 0, s[i++] = x + b | 0, s[i++] = _ + a | 0, s[i++] = B + u | 0, s[i++] = D + l | 0, s[i++] = T + m | 0, s[i++] = G + h | 0, s[i++] = P + I | 0, s[i++] = W + E | 0, s[i++] = L + p | 0;
}
function Ii(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = e[t + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, t += 16)
    Sa(n, o, e, t, n, i), c > 0 && (o += 16), Sa(n, i, e, t += 16, n, o);
}
function rl(e, t, n) {
  const r = I0({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: A, maxmem: f, onProgress: w } = r;
  if (_t(s), _t(i), _t(o), _t(c), _t(A), _t(f), w !== void 0 && typeof w != "function")
    throw new Error("progressCb should be function");
  const g = 128 * i, C = g / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (g / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / g)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (c < 0 || c > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const x = g * (s + o);
  if (x > f)
    throw new Error(`Scrypt: parameters too large, ${x} (128 * r * (N + p)) > ${f} (maxmem)`);
  const _ = Ro(lr, e, t, { c: 1, dkLen: g * o }), B = As(_), D = As(new Uint8Array(g * s)), T = As(new Uint8Array(g));
  let G = () => {
  };
  if (w) {
    const P = 2 * s * o, W = Math.max(Math.floor(P / 1e4), 1);
    let L = 0;
    G = () => {
      L++, w && (!(L % W) || L === P) && w(L / P);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: C, V: D, B32: B, B: _, tmp: T, blockMixCb: G, asyncTick: A };
}
function sl(e, t, n, r, s) {
  const i = Ro(lr, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function il(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: A, B32: f, B: w, tmp: g, blockMixCb: C } = rl(e, t, n);
  for (let x = 0; x < i; x++) {
    const _ = c * x;
    for (let B = 0; B < c; B++)
      A[B] = f[_ + B];
    for (let B = 0, D = 0; B < r - 1; B++)
      Ii(A, D, A, D += c, s), C();
    Ii(A, (r - 1) * c, f, _, s), C();
    for (let B = 0; B < r; B++) {
      const D = f[_ + c - 16] % r;
      for (let T = 0; T < c; T++)
        g[T] = f[_ + T] ^ A[D * c + T];
      Ii(g, 0, f, _, s), C();
    }
  }
  return sl(e, o, w, A, g);
}
const ts = /* @__PURE__ */ BigInt(2 ** 32 - 1), zi = /* @__PURE__ */ BigInt(32);
function b0(e, t = !1) {
  return t ? { h: Number(e & ts), l: Number(e >> zi & ts) } : { h: Number(e >> zi & ts) | 0, l: Number(e & ts) | 0 };
}
function C0(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = b0(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const ol = (e, t) => BigInt(e >>> 0) << zi | BigInt(t >>> 0), al = (e, t, n) => e >>> n, cl = (e, t, n) => e << 32 - n | t >>> n, ul = (e, t, n) => e >>> n | t << 32 - n, dl = (e, t, n) => e << 32 - n | t >>> n, Al = (e, t, n) => e << 64 - n | t >>> n - 32, ll = (e, t, n) => e >>> n - 32 | t << 64 - n, fl = (e, t) => t, hl = (e, t) => e, B0 = (e, t, n) => e << n | t >>> 32 - n, v0 = (e, t, n) => t << n | e >>> 32 - n, x0 = (e, t, n) => t << n - 32 | e >>> 64 - n, _0 = (e, t, n) => e << n - 32 | t >>> 64 - n;
function gl(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const pl = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), ml = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, wl = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), yl = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, Il = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), El = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, fe = {
  fromBig: b0,
  split: C0,
  toBig: ol,
  shrSH: al,
  shrSL: cl,
  rotrSH: ul,
  rotrSL: dl,
  rotrBH: Al,
  rotrBL: ll,
  rotr32H: fl,
  rotr32L: hl,
  rotlSH: B0,
  rotlSL: v0,
  rotlBH: x0,
  rotlBL: _0,
  add: gl,
  add3L: pl,
  add3H: ml,
  add4L: wl,
  add4H: yl,
  add5H: El,
  add5L: Il
}, [R0, S0, Q0] = [[], [], []], bl = /* @__PURE__ */ BigInt(0), Ir = /* @__PURE__ */ BigInt(1), Cl = /* @__PURE__ */ BigInt(2), Bl = /* @__PURE__ */ BigInt(7), vl = /* @__PURE__ */ BigInt(256), xl = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = Ir, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], R0.push(2 * (5 * r + n)), S0.push((e + 1) * (e + 2) / 2 % 64);
  let s = bl;
  for (let i = 0; i < 7; i++)
    t = (t << Ir ^ (t >> Bl) * xl) % vl, t & Cl && (s ^= Ir << (Ir << /* @__PURE__ */ BigInt(i)) - Ir);
  Q0.push(s);
}
const [_l, Rl] = /* @__PURE__ */ C0(Q0, !0), Qa = (e, t, n) => n > 32 ? x0(e, t, n) : B0(e, t, n), Na = (e, t, n) => n > 32 ? _0(e, t, n) : v0(e, t, n);
function Sl(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, A = (o + 2) % 10, f = n[A], w = n[A + 1], g = Qa(f, w, 1) ^ n[c], C = Na(f, w, 1) ^ n[c + 1];
      for (let x = 0; x < 50; x += 10)
        e[o + x] ^= g, e[o + x + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = S0[o], A = Qa(s, i, c), f = Na(s, i, c), w = R0[o];
      s = e[w], i = e[w + 1], e[w] = A, e[w + 1] = f;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= _l[r], e[1] ^= Rl[r];
  }
  n.fill(0);
}
class So extends vo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, _t(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = As(this.state);
  }
  keccak() {
    Sl(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    nr(this);
    const { blockLen: n, state: r } = this;
    t = rr(t);
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
    nr(this, !1), Bo(t), this.finish();
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
    if (y0(t, this), this.finished)
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
    return t || (t = new So(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const Ql = (e, t, n) => Ls(() => new So(t, e, n)), Nl = /* @__PURE__ */ Ql(1, 136, 256 / 8), Dl = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), N0 = /* @__PURE__ */ Uint8Array.from({ length: 16 }, (e, t) => t), Tl = /* @__PURE__ */ N0.map((e) => (9 * e + 5) % 16);
let Qo = [N0], No = [Tl];
for (let e = 0; e < 4; e++)
  for (let t of [Qo, No])
    t.push(t[e].map((n) => Dl[n]));
const D0 = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Fl = /* @__PURE__ */ Qo.map((e, t) => e.map((n) => D0[t][n])), Ml = /* @__PURE__ */ No.map((e, t) => e.map((n) => D0[t][n])), Ol = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), Ll = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]), ns = (e, t) => e << t | e >>> 32 - t;
function Da(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const rs = /* @__PURE__ */ new Uint32Array(16);
class kl extends xo {
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
      rs[x] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, A = c, f = this.h3 | 0, w = f, g = this.h4 | 0, C = g;
    for (let x = 0; x < 5; x++) {
      const _ = 4 - x, B = Ol[x], D = Ll[x], T = Qo[x], G = No[x], P = Fl[x], W = Ml[x];
      for (let L = 0; L < 16; L++) {
        const Q = ns(r + Da(x, i, c, f) + rs[T[L]] + B, P[L]) + g | 0;
        r = g, g = f, f = ns(c, 10) | 0, c = i, i = Q;
      }
      for (let L = 0; L < 16; L++) {
        const Q = ns(s + Da(_, o, A, w) + rs[G[L]] + D, W[L]) + C | 0;
        s = C, C = w, w = ns(A, 10) | 0, A = o, o = Q;
      }
    }
    this.set(this.h1 + c + w | 0, this.h2 + f + C | 0, this.h3 + g + s | 0, this.h4 + r + o | 0, this.h0 + i + A | 0);
  }
  roundClean() {
    rs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Pl = /* @__PURE__ */ Ls(() => new kl()), [Ul, Gl] = fe.split([
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
].map((e) => BigInt(e))), un = /* @__PURE__ */ new Uint32Array(80), dn = /* @__PURE__ */ new Uint32Array(80);
class zl extends xo {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: A, Eh: f, El: w, Fh: g, Fl: C, Gh: x, Gl: _, Hh: B, Hl: D } = this;
    return [t, n, r, s, i, o, c, A, f, w, g, C, x, _, B, D];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, A, f, w, g, C, x, _, B, D) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = A | 0, this.Eh = f | 0, this.El = w | 0, this.Fh = g | 0, this.Fl = C | 0, this.Gh = x | 0, this.Gl = _ | 0, this.Hh = B | 0, this.Hl = D | 0;
  }
  process(t, n) {
    for (let P = 0; P < 16; P++, n += 4)
      un[P] = t.getUint32(n), dn[P] = t.getUint32(n += 4);
    for (let P = 16; P < 80; P++) {
      const W = un[P - 15] | 0, L = dn[P - 15] | 0, Q = fe.rotrSH(W, L, 1) ^ fe.rotrSH(W, L, 8) ^ fe.shrSH(W, L, 7), k = fe.rotrSL(W, L, 1) ^ fe.rotrSL(W, L, 8) ^ fe.shrSL(W, L, 7), O = un[P - 2] | 0, U = dn[P - 2] | 0, H = fe.rotrSH(O, U, 19) ^ fe.rotrBH(O, U, 61) ^ fe.shrSH(O, U, 6), X = fe.rotrSL(O, U, 19) ^ fe.rotrBL(O, U, 61) ^ fe.shrSL(O, U, 6), K = fe.add4L(k, X, dn[P - 7], dn[P - 16]), b = fe.add4H(K, Q, H, un[P - 7], un[P - 16]);
      un[P] = b | 0, dn[P] = K | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: A, Dh: f, Dl: w, Eh: g, El: C, Fh: x, Fl: _, Gh: B, Gl: D, Hh: T, Hl: G } = this;
    for (let P = 0; P < 80; P++) {
      const W = fe.rotrSH(g, C, 14) ^ fe.rotrSH(g, C, 18) ^ fe.rotrBH(g, C, 41), L = fe.rotrSL(g, C, 14) ^ fe.rotrSL(g, C, 18) ^ fe.rotrBL(g, C, 41), Q = g & x ^ ~g & B, k = C & _ ^ ~C & D, O = fe.add5L(G, L, k, Gl[P], dn[P]), U = fe.add5H(O, T, W, Q, Ul[P], un[P]), H = O | 0, X = fe.rotrSH(r, s, 28) ^ fe.rotrBH(r, s, 34) ^ fe.rotrBH(r, s, 39), K = fe.rotrSL(r, s, 28) ^ fe.rotrBL(r, s, 34) ^ fe.rotrBL(r, s, 39), b = r & i ^ r & c ^ i & c, a = s & o ^ s & A ^ o & A;
      T = B | 0, G = D | 0, B = x | 0, D = _ | 0, x = g | 0, _ = C | 0, { h: g, l: C } = fe.add(f | 0, w | 0, U | 0, H | 0), f = c | 0, w = A | 0, c = i | 0, A = o | 0, i = r | 0, o = s | 0;
      const u = fe.add3L(H, K, a);
      r = fe.add3H(u, U, X, b), s = u | 0;
    }
    ({ h: r, l: s } = fe.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = fe.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: A } = fe.add(this.Ch | 0, this.Cl | 0, c | 0, A | 0), { h: f, l: w } = fe.add(this.Dh | 0, this.Dl | 0, f | 0, w | 0), { h: g, l: C } = fe.add(this.Eh | 0, this.El | 0, g | 0, C | 0), { h: x, l: _ } = fe.add(this.Fh | 0, this.Fl | 0, x | 0, _ | 0), { h: B, l: D } = fe.add(this.Gh | 0, this.Gl | 0, B | 0, D | 0), { h: T, l: G } = fe.add(this.Hh | 0, this.Hl | 0, T | 0, G | 0), this.set(r, s, i, o, c, A, f, w, g, C, x, _, B, D, T, G);
  }
  roundClean() {
    un.fill(0), dn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const T0 = /* @__PURE__ */ Ls(() => new zl());
var Hl = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return il(t, n, { N: r, r: i, p: s, dkLen: o });
}, Xl = (e) => Nl(e), F0 = !1, M0 = (e) => Pl(e), O0 = M0;
function zr(e) {
  const t = q(e, "data");
  return O0(t);
}
zr._ = M0;
zr.lock = () => {
  F0 = !0;
};
zr.register = (e) => {
  if (F0)
    throw new R(S.HASHER_LOCKED, "ripemd160 is locked");
  O0 = e;
};
Object.freeze(zr);
var qn = (e, t = "base64") => {
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
}, L0 = (e, t, n, r, s) => {
  const i = { sha256: lr, sha512: T0 }[s];
  return J(Ro(i, e, t, { c: n, dkLen: r }));
}, { crypto: ks, btoa: k0 } = globalThis;
if (!ks)
  throw new R(
    S.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!k0)
  throw new R(
    S.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Hi = (e) => ks.getRandomValues(new Uint8Array(e)), fs = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return k0(n);
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
}, P0 = "AES-CTR", Do = (e, t) => {
  const n = qn(String(e).normalize("NFKC"), "utf-8"), r = L0(n, t, 1e5, 32, "sha256");
  return q(r);
}, Vl = async (e, t) => {
  const n = Hi(16), r = Hi(32), s = Do(e, r), i = JSON.stringify(t), o = qn(i, "utf-8"), c = {
    name: P0,
    counter: n,
    length: 64
  }, A = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), f = await crypto.subtle.encrypt(c, A, o);
  return {
    data: fs(new Uint8Array(f)),
    iv: fs(n),
    salt: fs(r)
  };
}, Yl = async (e, t) => {
  const n = qn(t.iv), r = qn(t.salt), s = Do(e, r), i = qn(t.data), o = {
    name: P0,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), A = await crypto.subtle.decrypt(o, c, i), f = new TextDecoder().decode(A);
  try {
    return JSON.parse(f);
  } catch {
    throw new R(S.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, Zl = async (e, t, n) => {
  const r = ks.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, c = await r.importKey(
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
}, Wl = async (e, t, n) => {
  const r = ks.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, c = await r.importKey(
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
}, Jl = (e, t, n) => {
  const r = e === "sha256" ? lr : T0, s = _o.create(r, t).update(n).digest();
  return J(s);
}, ql = {
  bufferFromString: qn,
  stringFromBuffer: fs,
  decrypt: Yl,
  encrypt: Vl,
  keyFromPassword: Do,
  randomBytes: Hi,
  scrypt: Hl,
  keccak256: Xl,
  decryptJsonWalletData: Wl,
  encryptJsonWalletData: Zl,
  computeHmac: Jl,
  pbkdf2: L0,
  ripemd160: zr
}, jl = ql, {
  bufferFromString: En,
  decrypt: $l,
  encrypt: Kl,
  keyFromPassword: SI,
  randomBytes: Pt,
  stringFromBuffer: Br,
  scrypt: U0,
  keccak256: G0,
  decryptJsonWalletData: ef,
  encryptJsonWalletData: tf,
  pbkdf2: nf,
  computeHmac: z0,
  ripemd160: rf
} = jl;
function yt(e) {
  return J(lr(q(e)));
}
function rn(e) {
  return yt(e);
}
function sf(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function of(e) {
  return rn(En(e, "utf-8"));
}
var af = Object.defineProperty, cf = (e, t, n) => t in e ? af(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, To = (e, t, n) => (cf(e, t + "", n), n), ce = class {
  constructor(e, t, n) {
    M(this, "name");
    M(this, "type");
    M(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, uf = "u8", df = "u16", Af = "u32", lf = "u64", ff = "u256", hf = "raw untyped ptr", gf = "raw untyped slice", pf = "bool", mf = "b256", wf = "struct B512", sr = "enum Option", yf = "struct Vec", If = "struct Bytes", Ef = "struct String", bf = "str", H0 = /str\[(?<length>[0-9]+)\]/, Xi = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, X0 = /^struct (?<name>\w+)$/, V0 = /^enum (?<name>\w+)$/, Cf = /^\((?<items>.*)\)$/, Bf = /^generic (?<name>\w+)$/, bs = "1", ge = 8, xn = 32, Cs = xn + 2, Bs = xn, vf = xn, xf = xn, _f = ge * 4, Rf = ge * 2, Y0 = 2 ** 32 - 1, Z0 = ({ maxInputs: e }) => xn + // Tx ID
Bs + // Base asset ID
// Asset ID/Balance coin input pairs
e * (Bs + ge) + ge, W0 = ge + // Identifier
ge + // Gas limit
ge + // Script size
ge + // Script data size
ge + // Policies
ge + // Inputs size
ge + // Outputs size
ge + // Witnesses size
xn, QI = ge + // Identifier
_f + // Utxo Length
ge + // Output Index
xf + // Owner
ge + // Amount
Bs + // Asset id
Rf + // TxPointer
ge + // Witnesses index
ge + // Predicate size
ge + // Predicate data size
ge, Ta = (e) => e instanceof Uint8Array, fr = (e) => {
  const t = Array.isArray(e) ? e : Object.values(e);
  for (const n of t)
    if (n.type === sr || "coder" in n && n.coder.type === sr || "coders" in n && fr(n.coders))
      return !0;
  return !1;
}, kr, Jc, ye = (Jc = class extends ce {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    M(this, "coder");
    M(this, "length");
    Nt(this, kr);
    this.coder = t, this.length = n, Gt(this, kr, fr([t]));
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new R(S.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new R(S.ENCODE_ERROR, "Types/values length mismatch.");
    return oe(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (!Me(this, kr) && t.length < this.encodedLength || t.length > Y0)
      throw new R(S.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, kr = new WeakMap(), Jc), Z = class extends ce {
  constructor() {
    super("b256", "b256", ge * 4);
  }
  encode(e) {
    let t;
    try {
      t = q(e);
    } catch {
      throw new R(S.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new R(S.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (v(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid b256 byte data size.");
    return [wo(n, 32), t + 32];
  }
}, Sf = class extends ce {
  constructor() {
    super("b512", "struct B512", ge * 8);
  }
  encode(e) {
    let t;
    try {
      t = q(e);
    } catch {
      throw new R(S.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new R(S.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (v(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid b512 byte data size.");
    return [wo(n, this.encodedLength), t + this.encodedLength];
  }
}, Qf = {
  u64: ge,
  u256: ge * 4
}, F = class extends ce {
  constructor(e) {
    super("bigNumber", e, Qf[e]);
  }
  encode(e) {
    let t;
    try {
      t = tn(e, this.encodedLength);
    } catch {
      throw new R(S.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new R(S.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [v(n), t + this.encodedLength];
  }
}, Nf = class extends ce {
  constructor(t = {
    padToWordSize: !1
  }) {
    const n = t.padToWordSize ? ge : 1;
    super("boolean", "boolean", n);
    M(this, "options");
    this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new R(S.ENCODE_ERROR, "Invalid boolean value.");
    return tn(t ? 1 : 0, this.encodedLength);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid boolean data size.");
    const r = v(t.slice(n, n + this.encodedLength));
    if (r.isZero())
      return [!1, n + this.encodedLength];
    if (!r.eq(v(1)))
      throw new R(S.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.encodedLength];
  }
}, J0 = class extends ce {
  constructor() {
    super("struct", "struct Bytes", ge);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), n = new F("u64").encode(t.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < ge)
      throw new R(S.DECODE_ERROR, "Invalid byte data size.");
    const n = t + ge, r = e.slice(t, n), s = v(new F("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new R(S.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
To(J0, "memorySize", 1);
var Pn, Pr, Kn, Nn, j0, $0, K0, qc, q0 = (qc = class extends ce {
  constructor(t, n) {
    const r = new F("u64"), s = Object.values(n).reduce(
      (i, o) => Math.min(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    Nt(this, Nn);
    M(this, "name");
    M(this, "coders");
    Nt(this, Pn);
    Nt(this, Pr);
    Nt(this, Kn);
    this.name = t, this.coders = n, Gt(this, Pn, r), Gt(this, Pr, s), Gt(this, Kn, !(this.type === sr || fr(n)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return $r(this, Nn, $0).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new R(S.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new R(S.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n);
    if (i === -1) {
      const c = Object.keys(this.coders).map((A) => `'${A}'`).join(", ");
      throw new R(
        S.INVALID_DECODE_VALUE,
        `Invalid case '${n}'. Valid cases: ${c}.`
      );
    }
    const o = s.encode(t[n]);
    return new Uint8Array([...Me(this, Pn).encode(i), ...o]);
  }
  decode(t, n) {
    if (Me(this, Kn) && t.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid enum data size.");
    const r = new F("u64").decode(t, n)[0], s = pn(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new R(
        S.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], c = n + Me(this, Pn).encodedLength;
    if (Me(this, Kn) && t.length < c + o.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid enum data size.");
    const [A, f] = o.decode(t, c);
    return $r(this, Nn, j0).call(this, this.coders[i]) ? $r(this, Nn, K0).call(this, i, f) : [{ [i]: A }, f];
  }
}, Pn = new WeakMap(), Pr = new WeakMap(), Kn = new WeakMap(), Nn = new WeakSet(), // We parse a native enum as an empty tuple, so we are looking for a tuple with no child coders.
// The '()' is enough but the child coders is a stricter check.
j0 = function(t) {
  return this.type !== sr && t.type === "()" ? t.coders.length === 0 : !1;
}, $0 = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Me(this, Pr) - n.encodedLength);
  return oe([Me(this, Pn).encode(s), i, r]);
}, K0 = function(t, n) {
  return [t, n];
}, qc), Df = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new R(S.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, ee = class extends ce {
  constructor(t, n = {
    padToWordSize: !1
  }) {
    const r = n.padToWordSize ? ge : Df(t);
    super("number", t, r);
    M(this, "baseType");
    M(this, "options");
    this.baseType = t, this.options = n;
  }
  encode(t) {
    let n;
    try {
      n = tn(t);
    } catch {
      throw new R(S.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.encodedLength)
      throw new R(S.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return tn(n, this.encodedLength);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid number byte data size.");
    return [pn(r), n + this.encodedLength];
  }
}, eu = class extends q0 {
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
}, Tf = class extends ce {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ge);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new R(S.ENCODE_ERROR, "Expected array value.");
    const n = new ye(new ee("u8"), e.length).encode(e), r = new F("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + ge, r = e.slice(t, n), s = v(new F("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new R(S.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new ye(new ee("u8"), s), [c] = o.decode(i, 0);
    return [c, n + s];
  }
}, Fo = class extends ce {
  constructor() {
    super("struct", "struct String", ge);
  }
  encode(e) {
    const t = tr(e), n = new F("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid std string data size.");
    const n = t + ge, r = e.slice(t, n), s = v(new F("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new R(S.DECODE_ERROR, "Invalid std string byte data size.");
    return [Co(i), n + s];
  }
};
To(Fo, "memorySize", 1);
var tu = class extends ce {
  constructor() {
    super("strSlice", "str", ge);
  }
  encode(e) {
    const t = tr(e), n = new F("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid string slice data size.");
    const n = t + ge, r = e.slice(t, n), s = v(new F("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new R(S.DECODE_ERROR, "Invalid string slice byte data size.");
    return [Co(i), n + s];
  }
};
To(tu, "memorySize", 1);
var Ff = class extends ce {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new R(S.ENCODE_ERROR, "Value length mismatch during encode.");
    return tr(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid string byte data size.");
    return [Co(n), t + this.encodedLength];
  }
}, Ur, jc, Ps = (jc = class extends ce {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    M(this, "name");
    M(this, "coders");
    Nt(this, Ur);
    this.name = t, this.coders = n, Gt(this, Ur, fr(n));
  }
  encode(t) {
    return Os(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof eu) && s == null)
          throw new R(
            S.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (!Me(this, Ur) && t.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let A;
      return [A, r] = c.decode(t, r), i[o] = A, i;
    }, {}), r];
  }
}, Ur = new WeakMap(), jc), Gr, $c, nu = ($c = class extends ce {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    M(this, "coders");
    Nt(this, Gr);
    this.coders = t, Gt(this, Gr, fr(t));
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new R(S.ENCODE_ERROR, "Types/values length mismatch.");
    return Os(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (!Me(this, Gr) && t.length < this.encodedLength)
      throw new R(S.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, Gr = new WeakMap(), $c), er, Kc, Mf = (Kc = class extends ce {
  constructor(t) {
    super("struct", "struct Vec", ge);
    M(this, "coder");
    Nt(this, er);
    this.coder = t, Gt(this, er, fr([t]));
  }
  encode(t) {
    if (!Array.isArray(t) && !Ta(t))
      throw new R(
        S.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = new F("u64");
    if (Ta(t))
      return new Uint8Array([...n.encode(t.length), ...t]);
    const r = t.map((i) => this.coder.encode(i)), s = n.encode(t.length);
    return new Uint8Array([...s, ...Os(r)]);
  }
  decode(t, n) {
    if (!Me(this, er) && t.length < this.encodedLength || t.length > Y0)
      throw new R(S.DECODE_ERROR, "Invalid vec data size.");
    const r = n + ge, s = t.slice(n, r), i = v(new F("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, c = t.slice(r, r + o);
    if (!Me(this, er) && c.length !== o)
      throw new R(S.DECODE_ERROR, "Invalid vec byte data size.");
    let A = r;
    const f = [];
    for (let w = 0; w < i; w++) {
      const [g, C] = this.coder.decode(t, A);
      f.push(g), A = C;
    }
    return [f, A];
  }
}, er = new WeakMap(), Kc), ru = (e) => {
  switch (e) {
    case void 0:
    case bs:
      return bs;
    default:
      throw new R(
        S.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, Of = (e, t) => {
  const n = e.functions.find((r) => r.name === t);
  if (!n)
    throw new R(
      S.FUNCTION_NOT_FOUND,
      `Function with name '${t}' doesn't exist in the ABI`
    );
  return n;
}, Un = (e, t) => {
  const n = e.types.find((r) => r.typeId === t);
  if (!n)
    throw new R(
      S.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return n;
}, Fa = (e, t) => t.filter((n) => Un(e, n.type).type !== "()"), Lf = (e) => {
  var r;
  const t = e.find((s) => s.name === "buf"), n = (r = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : r[0];
  if (!t || !n)
    throw new R(
      S.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return n;
}, mn = class {
  constructor(e, t) {
    M(this, "abi");
    M(this, "name");
    M(this, "type");
    M(this, "originalTypeArguments");
    M(this, "components");
    this.abi = e, this.name = t.name;
    const n = Un(e, t.type);
    if (n.type.length > 256)
      throw new R(
        S.INVALID_COMPONENT,
        `The provided ABI type is too long: ${n.type}.`
      );
    this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = mn.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? mn.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new mn(e, o));
    const s = r.reduce(
      (o, c, A) => {
        var w;
        const f = { ...o };
        return f[c] = structuredClone(
          (w = t.typeArguments) == null ? void 0 : w[A]
        ), f;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new mn(e, o));
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
      const s = Un(e, r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = Un(e, s.type);
      if (Bf.test(i.type)) {
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
    return X0.test(this.type) ? "s" : Xi.test(this.type) ? "a" : V0.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = H0.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Xi.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new mn(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function Ma(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Vn = (e, t) => {
  var A, f, w, g, C;
  switch (e.type) {
    case uf:
    case df:
    case Af:
      return new ee(e.type);
    case lf:
    case hf:
      return new F("u64");
    case ff:
      return new F("u256");
    case gf:
      return new Tf();
    case pf:
      return new Nf();
    case mf:
      return new Z();
    case wf:
      return new Sf();
    case If:
      return new J0();
    case Ef:
      return new Fo();
    case bf:
      return new tu();
  }
  const n = (A = H0.exec(e.type)) == null ? void 0 : A.groups;
  if (n) {
    const x = parseInt(n.length, 10);
    return new Ff(x);
  }
  const r = e.components, s = (f = Xi.exec(e.type)) == null ? void 0 : f.groups;
  if (s) {
    const x = parseInt(s.length, 10), _ = r[0];
    if (!_)
      throw new R(
        S.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const B = Vn(_);
    return new ye(B, x);
  }
  if (e.type === yf) {
    const x = Lf(r), _ = new mn(e.abi, x), B = Vn(_);
    return new Mf(B);
  }
  const i = (w = X0.exec(e.type)) == null ? void 0 : w.groups;
  if (i) {
    const x = Ma(r, { getCoder: Vn });
    return new Ps(i.name, x);
  }
  const o = (g = V0.exec(e.type)) == null ? void 0 : g.groups;
  if (o) {
    const x = Ma(r, { getCoder: Vn });
    return e.type === sr ? new eu(o.name, x) : new q0(o.name, x);
  }
  if ((C = Cf.exec(e.type)) == null ? void 0 : C.groups) {
    const x = r.map((_) => Vn(_));
    return new nu(x);
  }
  throw new R(
    S.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function kf(e = bs) {
  switch (e) {
    case bs:
      return Vn;
    default:
      throw new R(
        S.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Qr = class {
  static getCoder(e, t, n = {
    padToWordSize: !1
  }) {
    const r = new mn(e, t);
    return kf(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, hs = class {
  constructor(e, t) {
    M(this, "signature");
    M(this, "selector");
    M(this, "selectorBytes");
    M(this, "encoding");
    M(this, "name");
    M(this, "jsonFn");
    M(this, "attributes");
    M(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = Of(this.jsonAbi, t), this.name = t, this.signature = hs.getSignature(this.jsonAbi, this.jsonFn), this.selector = hs.getFunctionSelector(this.signature), this.selectorBytes = new Fo().encode(t), this.encoding = ru(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new mn(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = yt(En(e, "utf-8"));
    return v(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e) {
    hs.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const t = e.slice(), n = Fa(this.jsonAbi, this.jsonFn.inputs);
    Array.isArray(e) && n.length !== e.length && (t.length = this.jsonFn.inputs.length, t.fill(void 0, e.length));
    const r = n.map(
      (s) => Qr.getCoder(this.jsonAbi, s, {
        encoding: this.encoding
      })
    );
    return new nu(r).encode(t);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => Un(n, o.type)), s = r.filter(
      (o) => o.type === sr || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new R(S.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = q(e), n = Fa(this.jsonAbi, this.jsonFn.inputs);
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new R(
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
        const o = Qr.getCoder(this.jsonAbi, i, { encoding: this.encoding }), [c, A] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + A
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (Un(this.jsonAbi, this.jsonFn.output.type).type === "()")
      return [void 0, 0];
    const n = q(e);
    return Qr.getCoder(this.jsonAbi, this.jsonFn.output, {
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
}, sn = class {
  constructor(e) {
    M(this, "functions");
    M(this, "configurables");
    M(this, "jsonAbi");
    M(this, "encoding");
    this.jsonAbi = e, this.encoding = ru(e.encoding), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new hs(this.jsonAbi, t.name)])
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
    throw new R(
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
      throw new R(
        S.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Qr.decode(this.jsonAbi, n.loggedType, q(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const n = this.jsonAbi.configurables.find((r) => r.name === e);
    if (!n)
      throw new R(
        S.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Qr.encode(this.jsonAbi, n.configurableType, t, {
      encoding: this.encoding
    });
  }
  getTypeById(e) {
    return Un(this.jsonAbi, e);
  }
}, NI = class {
}, Pf = class {
}, su = class {
}, iu = class {
}, Uf = class extends iu {
}, Gf = class extends iu {
}, Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
var ir = Dr.bech32m = Dr.bech32 = void 0;
const vs = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", ou = {};
for (let e = 0; e < vs.length; e++) {
  const t = vs.charAt(e);
  ou[t] = e;
}
function jn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Oa(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = jn(t) ^ r >> 5;
  }
  t = jn(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = jn(t) ^ r & 31;
  }
  return t;
}
function Mo(e, t, n, r) {
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
function zf(e) {
  return Mo(e, 8, 5, !0);
}
function Hf(e) {
  const t = Mo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function Xf(e) {
  const t = Mo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function au(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, c, A) {
    if (A = A || 90, o.length + 7 + c.length > A)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let f = Oa(o);
    if (typeof f == "string")
      throw new Error(f);
    let w = o + "1";
    for (let g = 0; g < c.length; ++g) {
      const C = c[g];
      if (C >> 5)
        throw new Error("Non 5-bit word");
      f = jn(f) ^ C, w += vs.charAt(C);
    }
    for (let g = 0; g < 6; ++g)
      f = jn(f);
    f ^= t;
    for (let g = 0; g < 6; ++g) {
      const C = f >> (5 - g) * 5 & 31;
      w += vs.charAt(C);
    }
    return w;
  }
  function r(o, c) {
    if (c = c || 90, o.length < 8)
      return o + " too short";
    if (o.length > c)
      return "Exceeds length limit";
    const A = o.toLowerCase(), f = o.toUpperCase();
    if (o !== A && o !== f)
      return "Mixed-case string " + o;
    o = A;
    const w = o.lastIndexOf("1");
    if (w === -1)
      return "No separator character for " + o;
    if (w === 0)
      return "Missing prefix for " + o;
    const g = o.slice(0, w), C = o.slice(w + 1);
    if (C.length < 6)
      return "Data too short";
    let x = Oa(g);
    if (typeof x == "string")
      return x;
    const _ = [];
    for (let B = 0; B < C.length; ++B) {
      const D = C.charAt(B), T = ou[D];
      if (T === void 0)
        return "Unknown character " + D;
      x = jn(x) ^ T, !(B + 6 >= C.length) && _.push(T);
    }
    return x !== t ? "Invalid checksum for " + o : { prefix: g, words: _ };
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
    toWords: zf,
    fromWordsUnsafe: Hf,
    fromWords: Xf
  };
}
Dr.bech32 = au("bech32");
ir = Dr.bech32m = au("bech32m");
var xs = "fuel";
function Oo(e) {
  return ir.decode(e);
}
function gs(e) {
  return ir.encode(
    xs,
    ir.toWords(q(J(e)))
  );
}
function ps(e) {
  return typeof e == "string" && e.indexOf(xs + 1) === 0 && Oo(e).prefix === xs;
}
function Vi(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function La(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Yi(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function Lo(e) {
  return new Uint8Array(ir.fromWords(Oo(e).words));
}
function ka(e) {
  if (!ps(e))
    throw new R(
      R.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return J(Lo(e));
}
function Vf(e) {
  const { words: t } = Oo(e);
  return ir.encode(xs, t);
}
var vr = (e) => e instanceof su ? e.address : e instanceof Uf ? e.id : e, Yf = () => J(Pt(32)), Zf = (e) => {
  let t;
  try {
    if (!Vi(e))
      throw new R(
        R.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = Lo(gs(e)), t = J(t.fill(0, 0, 12));
  } catch {
    throw new R(
      R.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, Wf = (e) => {
  if (!Yi(e))
    throw new R(R.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, le = class extends Pf {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    M(this, "bech32Address");
    if (this.bech32Address = Vf(t), !ps(this.bech32Address))
      throw new R(
        R.CODES.INVALID_BECH32_ADDRESS,
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
    return ka(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return Lo(this.bech32Address);
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
    const t = ka(this.bech32Address);
    return {
      bits: Zf(t)
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
    if (!La(t))
      throw new R(R.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = J(lr(q(t)));
    return new le(gs(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!Vi(t))
      throw new R(
        R.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new le(gs(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(Yf());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return ps(t) ? new le(t) : this.fromB256(t);
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
    if (La(t))
      return le.fromPublicKey(t);
    if (ps(t))
      return new le(t);
    if (Vi(t))
      return le.fromB256(t);
    if (Yi(t))
      return le.fromEvmAddress(t);
    throw new R(
      R.CODES.PARSE_FAILED,
      "Unknown address format: only 'Bech32', 'B256', or 'Public Key (512)' are supported."
    );
  }
  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   */
  static fromEvmAddress(t) {
    if (!Yi(t))
      throw new R(
        R.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = Wf(t);
    return new le(gs(n));
  }
};
function Jf(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function cu(e) {
  return function t(n) {
    return arguments.length === 0 || Jf(n) ? t : e.apply(this, arguments);
  };
}
var qf = /* @__PURE__ */ cu(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function jf(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function uu(e, t, n) {
  if (n || (n = new Kf()), $f(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var c in e)
      Object.prototype.hasOwnProperty.call(e, c) && (i[c] = uu(e[c], !0, n));
    return i;
  };
  switch (qf(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r(Array(e.length));
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return jf(e);
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
function $f(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var Kf = /* @__PURE__ */ function() {
  function e() {
    this.map = {}, this.length = 0;
  }
  return e.prototype.set = function(t, n) {
    var r = this.hash(t), s = this.map[r];
    s || (this.map[r] = s = []), s.push([t, n]), this.length += 1;
  }, e.prototype.hash = function(t) {
    var n = [];
    for (var r in t)
      n.push(Object.prototype.toString.call(t[r]));
    return n.join();
  }, e.prototype.get = function(t) {
    if (this.length <= 180) {
      for (var n in this.map)
        for (var o = this.map[n], r = 0; r < o.length; r += 1) {
          var s = o[r];
          if (s[0] === t)
            return s[1];
        }
      return;
    }
    var i = this.hash(t), o = this.map[i];
    if (o)
      for (var r = 0; r < o.length; r += 1) {
        var s = o[r];
        if (s[0] === t)
          return s[1];
      }
  }, e;
}(), kt = /* @__PURE__ */ cu(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : uu(t);
}), In, e0, Be = (e0 = class extends ce {
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
    M(this, "length");
    Nt(this, In);
    this.length = t, Gt(this, In, n);
  }
  encode(t) {
    const n = [], r = q(t);
    return n.push(r), Me(this, In) && n.push(new Uint8Array(Me(this, In))), oe(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [J(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return Me(this, In) && ([r, s] = [null, s + Me(this, In)]), [i, s];
  }
}, In = new WeakMap(), e0), or = class extends Ps {
  constructor() {
    super("TxPointer", {
      blockHeight: new ee("u32", { padToWordSize: !0 }),
      txIndex: new ee("u16", { padToWordSize: !0 })
    });
  }
}, ve = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(ve || {}), Pa = class extends ce {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.txID)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new Z().encode(e.owner)), t.push(new F("u64").encode(e.amount)), t.push(new Z().encode(e.assetId)), t.push(new or().encode(e.txPointer)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new F("u64").encode(e.predicateGasUsed)), t.push(new F("u64").encode(e.predicateLength)), t.push(new F("u64").encode(e.predicateDataLength)), t.push(new Be(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Be(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new Z().decode(e, r);
    const o = n;
    [n, r] = new F("u64").decode(e, r);
    const c = n;
    [n, r] = new Z().decode(e, r);
    const A = n;
    [n, r] = new or().decode(e, r);
    const f = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const w = Number(n);
    [n, r] = new F("u64").decode(e, r);
    const g = n;
    [n, r] = new F("u64").decode(e, r);
    const C = n;
    [n, r] = new F("u64").decode(e, r);
    const x = n;
    [n, r] = new Be(C.toNumber()).decode(e, r);
    const _ = n;
    return [n, r] = new Be(x.toNumber()).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: c,
        assetId: A,
        txPointer: f,
        witnessIndex: w,
        predicateGasUsed: g,
        predicateLength: C,
        predicateDataLength: x,
        predicate: _,
        predicateData: n
      },
      r
    ];
  }
}, _s = class extends ce {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.txID)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new Z().encode(e.balanceRoot)), t.push(new Z().encode(e.stateRoot)), t.push(new or().encode(e.txPointer)), t.push(new Z().encode(e.contractID)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new Z().decode(e, r);
    const o = n;
    [n, r] = new Z().decode(e, r);
    const c = n;
    [n, r] = new or().decode(e, r);
    const A = n;
    return [n, r] = new Z().decode(e, r), [
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
}, Tr = class extends ce {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Be(32).encode(e.sender)), t.push(new Be(32).encode(e.recipient)), t.push(new Be(32).encode(e.nonce)), t.push(new F("u64").encode(e.amount)), t.push(q(e.data || "0x")), yt(oe(t));
  }
  static encodeData(e) {
    const t = q(e || "0x"), n = t.length;
    return new Be(n).encode(t);
  }
  encode(e) {
    const t = [], n = Tr.encodeData(e.data);
    return t.push(new Be(32).encode(e.sender)), t.push(new Be(32).encode(e.recipient)), t.push(new F("u64").encode(e.amount)), t.push(new Be(32).encode(e.nonce)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new F("u64").encode(e.predicateGasUsed)), t.push(new F("u64").encode(n.length)), t.push(new F("u64").encode(e.predicateLength)), t.push(new F("u64").encode(e.predicateDataLength)), t.push(new Be(n.length).encode(n)), t.push(new Be(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Be(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), oe(t);
  }
  static decodeData(e) {
    const t = q(e), n = t.length, [r] = new Be(n).decode(t, 0);
    return q(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new Z().decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new Z().decode(e, r);
    const c = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const A = Number(n);
    [n, r] = new F("u64").decode(e, r);
    const f = n;
    [n, r] = new ee("u32", { padToWordSize: !0 }).decode(e, r);
    const w = n;
    [n, r] = new F("u64").decode(e, r);
    const g = n;
    [n, r] = new F("u64").decode(e, r);
    const C = n;
    [n, r] = new Be(w).decode(e, r);
    const x = n;
    [n, r] = new Be(g.toNumber()).decode(e, r);
    const _ = n;
    return [n, r] = new Be(C.toNumber()).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: A,
        nonce: c,
        predicateGasUsed: f,
        dataLength: w,
        predicateLength: g,
        predicateDataLength: C,
        data: x,
        predicate: _,
        predicateData: n
      },
      r
    ];
  }
}, _n = class extends ce {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new ee("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Pa().encode(e));
        break;
      }
      case 1: {
        t.push(new _s().encode(e));
        break;
      }
      case 2: {
        t.push(new Tr().encode(e));
        break;
      }
      default:
        throw new R(
          S.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ee("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Pa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new _s().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Tr().decode(e, r), [n, r];
      default:
        throw new R(
          S.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Ee = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Ee || {}), Ua = class extends ce {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.to)), t.push(new F("u64").encode(e.amount)), t.push(new Z().encode(e.assetId)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new F("u64").decode(e, r);
    const i = n;
    return [n, r] = new Z().decode(e, r), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, Rs = class extends ce {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new ee("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new Z().encode(e.balanceRoot)), t.push(new Z().encode(e.stateRoot)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ee("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    [n, r] = new Z().decode(e, r);
    const i = n;
    return [n, r] = new Z().decode(e, r), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: n
      },
      r
    ];
  }
}, Ga = class extends ce {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.to)), t.push(new F("u64").encode(e.amount)), t.push(new Z().encode(e.assetId)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new F("u64").decode(e, r);
    const i = n;
    return [n, r] = new Z().decode(e, r), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, za = class extends ce {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.to)), t.push(new F("u64").encode(e.amount)), t.push(new Z().encode(e.assetId)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new F("u64").decode(e, r);
    const i = n;
    return [n, r] = new Z().decode(e, r), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, Ha = class extends ce {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.contractId)), t.push(new Z().encode(e.stateRoot)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    return [n, r] = new Z().decode(e, r), [
      {
        type: 4,
        contractId: s,
        stateRoot: n
      },
      r
    ];
  }
}, Rn = class extends ce {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new ee("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Ua().encode(e));
        break;
      }
      case 1: {
        t.push(new Rs().encode(e));
        break;
      }
      case 2: {
        t.push(new Ga().encode(e));
        break;
      }
      case 3: {
        t.push(new za().encode(e));
        break;
      }
      case 4: {
        t.push(new Ha().encode(e));
        break;
      }
      default:
        throw new R(
          S.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ee("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Ua().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Rs().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Ga().decode(e, r), [n, r];
      case 3:
        return [n, r] = new za().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Ha().decode(e, r), [n, r];
      default:
        throw new R(
          S.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Mt = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Mt || {}), eh = (e) => e.sort((t, n) => t.type - n.type);
function th(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new R(
        S.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(n.type);
  });
}
var Sn = class extends ce {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    th(e);
    const t = eh(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new F("u64").encode(r));
          break;
        case 4:
          n.push(new ee("u32", { padToWordSize: !0 }).encode(r));
          break;
        default:
          throw new R(S.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), oe(n);
  }
  decode(e, t, n) {
    let r = t;
    const s = [];
    if (n & 1) {
      const [i, o] = new F("u64").decode(e, r);
      r = o, s.push({ type: 1, data: i });
    }
    if (n & 2) {
      const [i, o] = new F("u64").decode(e, r);
      r = o, s.push({ type: 2, data: i });
    }
    if (n & 4) {
      const [i, o] = new ee("u32", { padToWordSize: !0 }).decode(
        e,
        r
      );
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new F("u64").decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, de = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(de || {}), Xa = class extends ce {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.from)), t.push(new Z().encode(e.to)), t.push(new F("u64").encode(e.amount)), t.push(new Z().encode(e.assetId)), t.push(new F("u64").encode(e.gas)), t.push(new F("u64").encode(e.param1)), t.push(new F("u64").encode(e.param2)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new Z().decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new Z().decode(e, r);
    const c = n;
    [n, r] = new F("u64").decode(e, r);
    const A = n;
    [n, r] = new F("u64").decode(e, r);
    const f = n;
    [n, r] = new F("u64").decode(e, r);
    const w = n;
    [n, r] = new F("u64").decode(e, r);
    const g = n;
    return [n, r] = new F("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        gas: A,
        param1: f,
        param2: w,
        pc: g,
        is: n
      },
      r
    ];
  }
}, Va = class extends ce {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.id)), t.push(new F("u64").encode(e.val)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new F("u64").decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    return [n, r] = new F("u64").decode(e, r), [
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
}, Ya = class extends ce {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.id)), t.push(new F("u64").encode(e.ptr)), t.push(new F("u64").encode(e.len)), t.push(new Z().encode(e.digest)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new F("u64").decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new Z().decode(e, r);
    const c = n;
    [n, r] = new F("u64").decode(e, r);
    const A = n;
    return [n, r] = new F("u64").decode(e, r), [
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
}, Za = class extends ce {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.id)), t.push(new F("u64").encode(e.reason)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), t.push(new Z().encode(e.contractId)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new F("u64").decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new F("u64").decode(e, r);
    const c = n;
    return [n, r] = new Z().decode(e, r), [
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
}, Wa = class extends ce {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.id)), t.push(new F("u64").encode(e.val)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new F("u64").decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    return [n, r] = new F("u64").decode(e, r), [
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
}, Ja = class extends ce {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.id)), t.push(new F("u64").encode(e.val0)), t.push(new F("u64").encode(e.val1)), t.push(new F("u64").encode(e.val2)), t.push(new F("u64").encode(e.val3)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new F("u64").decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new F("u64").decode(e, r);
    const c = n;
    [n, r] = new F("u64").decode(e, r);
    const A = n;
    [n, r] = new F("u64").decode(e, r);
    const f = n;
    return [n, r] = new F("u64").decode(e, r), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: c,
        val3: A,
        pc: f,
        is: n
      },
      r
    ];
  }
}, qa = class extends ce {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.id)), t.push(new F("u64").encode(e.val0)), t.push(new F("u64").encode(e.val1)), t.push(new F("u64").encode(e.ptr)), t.push(new F("u64").encode(e.len)), t.push(new Z().encode(e.digest)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new F("u64").decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new F("u64").decode(e, r);
    const c = n;
    [n, r] = new F("u64").decode(e, r);
    const A = n;
    [n, r] = new Z().decode(e, r);
    const f = n;
    [n, r] = new F("u64").decode(e, r);
    const w = n;
    return [n, r] = new F("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: c,
        len: A,
        digest: f,
        pc: w,
        is: n
      },
      r
    ];
  }
}, ja = class extends ce {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.from)), t.push(new Z().encode(e.to)), t.push(new F("u64").encode(e.amount)), t.push(new Z().encode(e.assetId)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new Z().decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new Z().decode(e, r);
    const c = n;
    [n, r] = new F("u64").decode(e, r);
    const A = n;
    return [n, r] = new F("u64").decode(e, r), [
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
}, $a = class extends ce {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.from)), t.push(new Z().encode(e.to)), t.push(new F("u64").encode(e.amount)), t.push(new Z().encode(e.assetId)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new Z().decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new Z().decode(e, r);
    const c = n;
    [n, r] = new F("u64").decode(e, r);
    const A = n;
    return [n, r] = new F("u64").decode(e, r), [
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
}, Ka = class extends ce {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new F("u64").encode(e.result)), t.push(new F("u64").encode(e.gasUsed)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new F("u64").decode(e, r);
    const s = n;
    return [n, r] = new F("u64").decode(e, r), [
      {
        type: 9,
        result: s,
        gasUsed: n
      },
      r
    ];
  }
}, Ss = class extends ce {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Be(32).encode(e.sender)), t.push(new Be(32).encode(e.recipient)), t.push(new Be(32).encode(e.nonce)), t.push(new F("u64").encode(e.amount)), t.push(q(e.data || "0x")), yt(oe(t));
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.sender)), t.push(new Z().encode(e.recipient)), t.push(new F("u64").encode(e.amount)), t.push(new Z().encode(e.nonce)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.data.length)), t.push(new Z().encode(e.digest)), t.push(new Be(e.data.length).encode(e.data)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new Z().decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new Z().decode(e, r);
    const c = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new Z().decode(e, r);
    const f = n;
    [n, r] = new Be(A).decode(e, r);
    const w = q(n), g = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: c,
      digest: f,
      data: w
    };
    return g.messageId = Ss.getMessageId(g), [g, r];
  }
}, du = (e, t) => {
  const n = q(e), r = q(t);
  return yt(oe([n, r]));
}, Fr = class extends ce {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return du(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.subId)), t.push(new Z().encode(e.contractId)), t.push(new F("u64").encode(e.val)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new Z().decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new F("u64").decode(e, r);
    const c = n;
    [n, r] = new F("u64").decode(e, r);
    const A = n, f = Fr.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: A,
      assetId: f
    }, r];
  }
}, Zi = class extends ce {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return du(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.subId)), t.push(new Z().encode(e.contractId)), t.push(new F("u64").encode(e.val)), t.push(new F("u64").encode(e.pc)), t.push(new F("u64").encode(e.is)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new Z().decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new F("u64").decode(e, r);
    const c = n;
    [n, r] = new F("u64").decode(e, r);
    const A = n, f = Fr.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: A,
      assetId: f
    }, r];
  }
}, DI = class extends ce {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new ee("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new Xa().encode(e));
        break;
      }
      case 1: {
        t.push(new Va().encode(e));
        break;
      }
      case 2: {
        t.push(new Ya().encode(e));
        break;
      }
      case 3: {
        t.push(new Za().encode(e));
        break;
      }
      case 4: {
        t.push(new Wa().encode(e));
        break;
      }
      case 5: {
        t.push(new Ja().encode(e));
        break;
      }
      case 6: {
        t.push(new qa().encode(e));
        break;
      }
      case 7: {
        t.push(new ja().encode(e));
        break;
      }
      case 8: {
        t.push(new $a().encode(e));
        break;
      }
      case 9: {
        t.push(new Ka().encode(e));
        break;
      }
      case 10: {
        t.push(new Ss().encode(e));
        break;
      }
      case 11: {
        t.push(new Fr().encode(e));
        break;
      }
      case 12: {
        t.push(new Zi().encode(e));
        break;
      }
      default:
        throw new R(S.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ee("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Xa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Va().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Ya().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Za().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Wa().decode(e, r), [n, r];
      case 5:
        return [n, r] = new Ja().decode(e, r), [n, r];
      case 6:
        return [n, r] = new qa().decode(e, r), [n, r];
      case 7:
        return [n, r] = new ja().decode(e, r), [n, r];
      case 8:
        return [n, r] = new $a().decode(e, r), [n, r];
      case 9:
        return [n, r] = new Ka().decode(e, r), [n, r];
      case 10:
        return [n, r] = new Ss().decode(e, r), [n, r];
      case 11:
        return [n, r] = new Fr().decode(e, r), [n, r];
      case 12:
        return [n, r] = new Zi().decode(e, r), [n, r];
      default:
        throw new R(S.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, ec = class extends Ps {
  constructor() {
    super("StorageSlot", {
      key: new Z(),
      value: new Z()
    });
  }
}, tc = class extends ce {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: n } = e;
    switch (t.push(new ee("u8", { padToWordSize: !0 }).encode(n)), n) {
      case 0: {
        const r = e.data;
        t.push(new ee("u16", { padToWordSize: !0 }).encode(r.witnessIndex)), t.push(new Z().encode(r.checksum));
        break;
      }
      case 1: {
        const r = e.data;
        t.push(new Z().encode(r.bytecodeRoot));
        break;
      }
      default:
        throw new R(
          S.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${n}`
        );
    }
    return oe(t);
  }
  decode(e, t) {
    let n = t, r;
    [r, n] = new ee("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0: {
        [r, n] = new ee("u16", { padToWordSize: !0 }).decode(e, n);
        const i = r;
        return [r, n] = new Z().decode(e, n), [{ type: s, data: { witnessIndex: i, checksum: r } }, n];
      }
      case 1:
        return [r, n] = new Z().decode(e, n), [{ type: s, data: { bytecodeRoot: r } }, n];
      default:
        throw new R(
          S.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, Qn = class extends ce {
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
    return t.push(new ee("u32", { padToWordSize: !0 }).encode(e.dataLength)), t.push(new Be(e.dataLength).encode(e.data)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ee("u32", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    return [n, r] = new Be(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, ke = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e))(ke || {}), nc = class extends ce {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new F("u64").encode(e.scriptGasLimit)), t.push(new Z().encode(e.receiptsRoot)), t.push(new F("u64").encode(e.scriptLength)), t.push(new F("u64").encode(e.scriptDataLength)), t.push(new ee("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new Be(e.scriptLength.toNumber()).encode(e.script)), t.push(new Be(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new Sn().encode(e.policies)), t.push(new ye(new _n(), e.inputsCount).encode(e.inputs)), t.push(new ye(new Rn(), e.outputsCount).encode(e.outputs)), t.push(new ye(new Qn(), e.witnessesCount).encode(e.witnesses)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new F("u64").decode(e, r);
    const s = n;
    [n, r] = new Z().decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new F("u64").decode(e, r);
    const c = n;
    [n, r] = new ee("u32", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const f = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const w = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const g = n;
    [n, r] = new Be(o.toNumber()).decode(e, r);
    const C = n;
    [n, r] = new Be(c.toNumber()).decode(e, r);
    const x = n;
    [n, r] = new Sn().decode(e, r, A);
    const _ = n;
    [n, r] = new ye(new _n(), f).decode(e, r);
    const B = n;
    [n, r] = new ye(new Rn(), w).decode(e, r);
    const D = n;
    return [n, r] = new ye(new Qn(), g).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: c,
        policyTypes: A,
        inputsCount: f,
        outputsCount: w,
        witnessesCount: g,
        receiptsRoot: i,
        script: C,
        scriptData: x,
        policies: _,
        inputs: B,
        outputs: D,
        witnesses: n
      },
      r
    ];
  }
}, rc = class extends ce {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new ee("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new Z().encode(e.salt)), t.push(new F("u64").encode(e.storageSlotsCount)), t.push(new ee("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new ye(new ec(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new Sn().encode(e.policies)), t.push(new ye(new _n(), e.inputsCount).encode(e.inputs)), t.push(new ye(new Rn(), e.outputsCount).encode(e.outputs)), t.push(new ye(new Qn(), e.witnessesCount).encode(e.witnesses)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    [n, r] = new Z().decode(e, r);
    const i = n;
    [n, r] = new F("u64").decode(e, r);
    const o = n;
    [n, r] = new ee("u32", { padToWordSize: !0 }).decode(e, r);
    const c = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const f = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const w = n;
    [n, r] = new ye(new ec(), o.toNumber()).decode(
      e,
      r
    );
    const g = n;
    [n, r] = new Sn().decode(e, r, c);
    const C = n;
    [n, r] = new ye(new _n(), A).decode(e, r);
    const x = n;
    [n, r] = new ye(new Rn(), f).decode(e, r);
    const _ = n;
    return [n, r] = new ye(new Qn(), w).decode(e, r), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: c,
        storageSlotsCount: o,
        inputsCount: A,
        outputsCount: f,
        witnessesCount: w,
        salt: i,
        policies: C,
        storageSlots: g,
        inputs: x,
        outputs: _,
        witnesses: n
      },
      r
    ];
  }
}, sc = class extends ce {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new or().encode(e.txPointer)), t.push(new _s().encode(e.inputContract)), t.push(new Rs().encode(e.outputContract)), t.push(new F("u64").encode(e.mintAmount)), t.push(new Z().encode(e.mintAssetId)), t.push(new F("u64").encode(e.gasPrice)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new or().decode(e, r);
    const s = n;
    [n, r] = new _s().decode(e, r);
    const i = n;
    [n, r] = new Rs().decode(e, r);
    const o = n;
    [n, r] = new F("u64").decode(e, r);
    const c = n;
    [n, r] = new Z().decode(e, r);
    const A = n;
    return [n, r] = new F("u64").decode(e, r), [
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
}, ic = class extends ce {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new tc().encode(e.upgradePurpose)), t.push(new ee("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new Sn().encode(e.policies)), t.push(new ye(new _n(), e.inputsCount).encode(e.inputs)), t.push(new ye(new Rn(), e.outputsCount).encode(e.outputs)), t.push(new ye(new Qn(), e.witnessesCount).encode(e.witnesses)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new tc().decode(e, r);
    const s = n;
    [n, r] = new ee("u32", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const o = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const c = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new Sn().decode(e, r, i);
    const f = n;
    [n, r] = new ye(new _n(), o).decode(e, r);
    const w = n;
    [n, r] = new ye(new Rn(), c).decode(e, r);
    const g = n;
    return [n, r] = new ye(new Qn(), A).decode(e, r), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: o,
        outputsCount: c,
        witnessesCount: A,
        policies: f,
        inputs: w,
        outputs: g,
        witnesses: n
      },
      r
    ];
  }
}, oc = class extends ce {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Z().encode(e.root)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.subsectionIndex)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.subsectionsNumber)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.proofSetCount)), t.push(new ee("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new ee("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new ye(new Z(), e.proofSetCount).encode(e.proofSet)), t.push(new Sn().encode(e.policies)), t.push(new ye(new _n(), e.inputsCount).encode(e.inputs)), t.push(new ye(new Rn(), e.outputsCount).encode(e.outputs)), t.push(new ye(new Qn(), e.witnessesCount).encode(e.witnesses)), oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Z().decode(e, r);
    const s = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const i = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const o = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const c = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const A = n;
    [n, r] = new ee("u32", { padToWordSize: !0 }).decode(e, r);
    const f = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const w = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const g = n;
    [n, r] = new ee("u16", { padToWordSize: !0 }).decode(e, r);
    const C = n;
    [n, r] = new ye(new Z(), A).decode(e, r);
    const x = n;
    [n, r] = new Sn().decode(e, r, f);
    const _ = n;
    [n, r] = new ye(new _n(), w).decode(e, r);
    const B = n;
    [n, r] = new ye(new Rn(), g).decode(e, r);
    const D = n;
    return [n, r] = new ye(new Qn(), C).decode(e, r), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: o,
        subsectionsNumber: c,
        proofSetCount: A,
        policyTypes: f,
        inputsCount: w,
        outputsCount: g,
        witnessesCount: C,
        proofSet: x,
        policies: _,
        inputs: B,
        outputs: D,
        witnesses: n
      },
      r
    ];
  }
}, nn = class extends ce {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new ee("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new nc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new rc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new sc().encode(e));
        break;
      }
      case 3: {
        t.push(
          new ic().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new oc().encode(e)
        );
        break;
      }
      default:
        throw new R(
          S.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${n}`
        );
    }
    return oe(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ee("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new nc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new rc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new sc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new ic().decode(e, r), [n, r];
      case 4:
        return [n, r] = new oc().decode(e, r), [n, r];
      default:
        throw new R(
          S.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, TI = class extends Ps {
  constructor() {
    super("UtxoId", {
      transactionId: new Z(),
      outputIndex: new ee("u8", { padToWordSize: !0 })
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Au = /* @__PURE__ */ BigInt(0), Us = /* @__PURE__ */ BigInt(1), nh = /* @__PURE__ */ BigInt(2);
function zn(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Hr(e) {
  if (!zn(e))
    throw new Error("Uint8Array expected");
}
const rh = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function ar(e) {
  Hr(e);
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += rh[e[n]];
  return t;
}
function lu(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function ko(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const qt = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function ac(e) {
  if (e >= qt._0 && e <= qt._9)
    return e - qt._0;
  if (e >= qt._A && e <= qt._F)
    return e - (qt._A - 10);
  if (e >= qt._a && e <= qt._f)
    return e - (qt._a - 10);
}
function cr(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = ac(e.charCodeAt(i)), c = ac(e.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const A = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + A + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function Gn(e) {
  return ko(ar(e));
}
function Po(e) {
  return Hr(e), ko(ar(Uint8Array.from(e).reverse()));
}
function ur(e, t) {
  return cr(e.toString(16).padStart(t * 2, "0"));
}
function Uo(e, t) {
  return ur(e, t).reverse();
}
function sh(e) {
  return cr(lu(e));
}
function Ot(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = cr(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (zn(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function Mr(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    Hr(s), t += s.length;
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, s), s += i.length;
  }
  return n;
}
function fu(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function ih(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function oh(e) {
  let t;
  for (t = 0; e > Au; e >>= Us, t += 1)
    ;
  return t;
}
function ah(e, t) {
  return e >> BigInt(t) & Us;
}
function ch(e, t, n) {
  return e | (n ? Us : Au) << BigInt(t);
}
const Go = (e) => (nh << BigInt(e - 1)) - Us, Ei = (e) => new Uint8Array(e), cc = (e) => Uint8Array.from(e);
function hu(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = Ei(e), s = Ei(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...g) => n(s, r, ...g), A = (g = Ei()) => {
    s = c(cc([0]), g), r = c(), g.length !== 0 && (s = c(cc([1]), g), r = c());
  }, f = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let g = 0;
    const C = [];
    for (; g < t; ) {
      r = c();
      const x = r.slice();
      C.push(x), g += r.length;
    }
    return Mr(...C);
  };
  return (g, C) => {
    o(), A(g);
    let x;
    for (; !(x = C(f())); )
      A();
    return o(), x;
  };
}
const uh = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || zn(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function Xr(e, t, n = {}) {
  const r = (s, i, o) => {
    const c = uh[i];
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
const dh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abytes: Hr,
  bitGet: ah,
  bitLen: oh,
  bitMask: Go,
  bitSet: ch,
  bytesToHex: ar,
  bytesToNumberBE: Gn,
  bytesToNumberLE: Po,
  concatBytes: Mr,
  createHmacDrbg: hu,
  ensureBytes: Ot,
  equalBytes: fu,
  hexToBytes: cr,
  hexToNumber: ko,
  isBytes: zn,
  numberToBytesBE: ur,
  numberToBytesLE: Uo,
  numberToHexUnpadded: lu,
  numberToVarBytesBE: sh,
  utf8ToBytes: ih,
  validateObject: Xr
}, Symbol.toStringTag, { value: "Module" }));
var bi = {}, Wi = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Ce < "u" && Ce, r = function() {
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
      function f(u) {
        return u && DataView.prototype.isPrototypeOf(u);
      }
      if (A.arrayBuffer)
        var w = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], g = ArrayBuffer.isView || function(u) {
          return u && w.indexOf(Object.prototype.toString.call(u)) > -1;
        };
      function C(u) {
        if (typeof u != "string" && (u = String(u)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(u) || u === "")
          throw new TypeError('Invalid character in header field name: "' + u + '"');
        return u.toLowerCase();
      }
      function x(u) {
        return typeof u != "string" && (u = String(u)), u;
      }
      function _(u) {
        var l = {
          next: function() {
            var m = u.shift();
            return { done: m === void 0, value: m };
          }
        };
        return A.iterable && (l[Symbol.iterator] = function() {
          return l;
        }), l;
      }
      function B(u) {
        this.map = {}, u instanceof B ? u.forEach(function(l, m) {
          this.append(m, l);
        }, this) : Array.isArray(u) ? u.forEach(function(l) {
          this.append(l[0], l[1]);
        }, this) : u && Object.getOwnPropertyNames(u).forEach(function(l) {
          this.append(l, u[l]);
        }, this);
      }
      B.prototype.append = function(u, l) {
        u = C(u), l = x(l);
        var m = this.map[u];
        this.map[u] = m ? m + ", " + l : l;
      }, B.prototype.delete = function(u) {
        delete this.map[C(u)];
      }, B.prototype.get = function(u) {
        return u = C(u), this.has(u) ? this.map[u] : null;
      }, B.prototype.has = function(u) {
        return this.map.hasOwnProperty(C(u));
      }, B.prototype.set = function(u, l) {
        this.map[C(u)] = x(l);
      }, B.prototype.forEach = function(u, l) {
        for (var m in this.map)
          this.map.hasOwnProperty(m) && u.call(l, this.map[m], m, this);
      }, B.prototype.keys = function() {
        var u = [];
        return this.forEach(function(l, m) {
          u.push(m);
        }), _(u);
      }, B.prototype.values = function() {
        var u = [];
        return this.forEach(function(l) {
          u.push(l);
        }), _(u);
      }, B.prototype.entries = function() {
        var u = [];
        return this.forEach(function(l, m) {
          u.push([m, l]);
        }), _(u);
      }, A.iterable && (B.prototype[Symbol.iterator] = B.prototype.entries);
      function D(u) {
        if (u.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        u.bodyUsed = !0;
      }
      function T(u) {
        return new Promise(function(l, m) {
          u.onload = function() {
            l(u.result);
          }, u.onerror = function() {
            m(u.error);
          };
        });
      }
      function G(u) {
        var l = new FileReader(), m = T(l);
        return l.readAsArrayBuffer(u), m;
      }
      function P(u) {
        var l = new FileReader(), m = T(l);
        return l.readAsText(u), m;
      }
      function W(u) {
        for (var l = new Uint8Array(u), m = new Array(l.length), h = 0; h < l.length; h++)
          m[h] = String.fromCharCode(l[h]);
        return m.join("");
      }
      function L(u) {
        if (u.slice)
          return u.slice(0);
        var l = new Uint8Array(u.byteLength);
        return l.set(new Uint8Array(u)), l.buffer;
      }
      function Q() {
        return this.bodyUsed = !1, this._initBody = function(u) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = u, u ? typeof u == "string" ? this._bodyText = u : A.blob && Blob.prototype.isPrototypeOf(u) ? this._bodyBlob = u : A.formData && FormData.prototype.isPrototypeOf(u) ? this._bodyFormData = u : A.searchParams && URLSearchParams.prototype.isPrototypeOf(u) ? this._bodyText = u.toString() : A.arrayBuffer && A.blob && f(u) ? (this._bodyArrayBuffer = L(u.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : A.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(u) || g(u)) ? this._bodyArrayBuffer = L(u) : this._bodyText = u = Object.prototype.toString.call(u) : this._bodyText = "", this.headers.get("content-type") || (typeof u == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : A.searchParams && URLSearchParams.prototype.isPrototypeOf(u) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, A.blob && (this.blob = function() {
          var u = D(this);
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
            var u = D(this);
            return u || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(G);
        }), this.text = function() {
          var u = D(this);
          if (u)
            return u;
          if (this._bodyBlob)
            return P(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(W(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, A.formData && (this.formData = function() {
          return this.text().then(H);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var k = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function O(u) {
        var l = u.toUpperCase();
        return k.indexOf(l) > -1 ? l : u;
      }
      function U(u, l) {
        if (!(this instanceof U))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l = l || {};
        var m = l.body;
        if (u instanceof U) {
          if (u.bodyUsed)
            throw new TypeError("Already read");
          this.url = u.url, this.credentials = u.credentials, l.headers || (this.headers = new B(u.headers)), this.method = u.method, this.mode = u.mode, this.signal = u.signal, !m && u._bodyInit != null && (m = u._bodyInit, u.bodyUsed = !0);
        } else
          this.url = String(u);
        if (this.credentials = l.credentials || this.credentials || "same-origin", (l.headers || !this.headers) && (this.headers = new B(l.headers)), this.method = O(l.method || this.method || "GET"), this.mode = l.mode || this.mode || null, this.signal = l.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && m)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(m), (this.method === "GET" || this.method === "HEAD") && (l.cache === "no-store" || l.cache === "no-cache")) {
          var h = /([?&])_=[^&]*/;
          if (h.test(this.url))
            this.url = this.url.replace(h, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var I = /\?/;
            this.url += (I.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      U.prototype.clone = function() {
        return new U(this, { body: this._bodyInit });
      };
      function H(u) {
        var l = new FormData();
        return u.trim().split("&").forEach(function(m) {
          if (m) {
            var h = m.split("="), I = h.shift().replace(/\+/g, " "), E = h.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(I), decodeURIComponent(E));
          }
        }), l;
      }
      function X(u) {
        var l = new B(), m = u.replace(/\r?\n[\t ]+/g, " ");
        return m.split("\r").map(function(h) {
          return h.indexOf(`
`) === 0 ? h.substr(1, h.length) : h;
        }).forEach(function(h) {
          var I = h.split(":"), E = I.shift().trim();
          if (E) {
            var p = I.join(":").trim();
            l.append(E, p);
          }
        }), l;
      }
      Q.call(U.prototype);
      function K(u, l) {
        if (!(this instanceof K))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l || (l = {}), this.type = "default", this.status = l.status === void 0 ? 200 : l.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = l.statusText === void 0 ? "" : "" + l.statusText, this.headers = new B(l.headers), this.url = l.url || "", this._initBody(u);
      }
      Q.call(K.prototype), K.prototype.clone = function() {
        return new K(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new B(this.headers),
          url: this.url
        });
      }, K.error = function() {
        var u = new K(null, { status: 0, statusText: "" });
        return u.type = "error", u;
      };
      var b = [301, 302, 303, 307, 308];
      K.redirect = function(u, l) {
        if (b.indexOf(l) === -1)
          throw new RangeError("Invalid status code");
        return new K(null, { status: l, headers: { location: u } });
      }, o.DOMException = c.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(l, m) {
          this.message = l, this.name = m;
          var h = Error(l);
          this.stack = h.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function a(u, l) {
        return new Promise(function(m, h) {
          var I = new U(u, l);
          if (I.signal && I.signal.aborted)
            return h(new o.DOMException("Aborted", "AbortError"));
          var E = new XMLHttpRequest();
          function p() {
            E.abort();
          }
          E.onload = function() {
            var y = {
              status: E.status,
              statusText: E.statusText,
              headers: X(E.getAllResponseHeaders() || "")
            };
            y.url = "responseURL" in E ? E.responseURL : y.headers.get("X-Request-URL");
            var Y = "response" in E ? E.response : E.responseText;
            setTimeout(function() {
              m(new K(Y, y));
            }, 0);
          }, E.onerror = function() {
            setTimeout(function() {
              h(new TypeError("Network request failed"));
            }, 0);
          }, E.ontimeout = function() {
            setTimeout(function() {
              h(new TypeError("Network request failed"));
            }, 0);
          }, E.onabort = function() {
            setTimeout(function() {
              h(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function d(y) {
            try {
              return y === "" && c.location.href ? c.location.href : y;
            } catch {
              return y;
            }
          }
          E.open(I.method, d(I.url), !0), I.credentials === "include" ? E.withCredentials = !0 : I.credentials === "omit" && (E.withCredentials = !1), "responseType" in E && (A.blob ? E.responseType = "blob" : A.arrayBuffer && I.headers.get("Content-Type") && I.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (E.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof B) ? Object.getOwnPropertyNames(l.headers).forEach(function(y) {
            E.setRequestHeader(y, x(l.headers[y]));
          }) : I.headers.forEach(function(y, Y) {
            E.setRequestHeader(Y, y);
          }), I.signal && (I.signal.addEventListener("abort", p), E.onreadystatechange = function() {
            E.readyState === 4 && I.signal.removeEventListener("abort", p);
          }), E.send(typeof I._bodyInit > "u" ? null : I._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = B, c.Request = U, c.Response = K), o.Headers = B, o.Request = U, o.Response = K, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Wi, Wi.exports);
var Ah = Wi.exports;
function lh(e) {
  return typeof e == "object" && e !== null;
}
function fh(e, t) {
  if (!!!e)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const hh = /\r\n|[\n\r]/g;
function Ji(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(hh)) {
    if (typeof s.index == "number" || fh(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function gh(e) {
  return gu(
    e.source,
    Ji(e.source, e.start)
  );
}
function gu(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, c = t.line === 1 ? n : 0, A = t.column + c, f = `${e.name}:${o}:${A}
`, w = r.split(/\r\n|[\n\r]/g), g = w[s];
  if (g.length > 120) {
    const C = Math.floor(A / 80), x = A % 80, _ = [];
    for (let B = 0; B < g.length; B += 80)
      _.push(g.slice(B, B + 80));
    return f + uc([
      [`${o} |`, _[0]],
      ..._.slice(1, C + 1).map((B) => ["|", B]),
      ["|", "^".padStart(x)],
      ["|", _[C + 1]]
    ]);
  }
  return f + uc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, w[s - 1]],
    [`${o} |`, g],
    ["|", "^".padStart(A)],
    [`${o + 1} |`, w[s + 1]]
  ]);
}
function uc(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function ph(e) {
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
class zo extends Error {
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
    const { nodes: o, source: c, positions: A, path: f, originalError: w, extensions: g } = ph(n);
    super(t), this.name = "GraphQLError", this.path = f ?? void 0, this.originalError = w ?? void 0, this.nodes = dc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const C = dc(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((_) => _.loc).filter((_) => _ != null)
    );
    this.source = c ?? (C == null || (s = C[0]) === null || s === void 0 ? void 0 : s.source), this.positions = A ?? (C == null ? void 0 : C.map((_) => _.start)), this.locations = A && c ? A.map((_) => Ji(c, _)) : C == null ? void 0 : C.map((_) => Ji(_.source, _.start));
    const x = lh(
      w == null ? void 0 : w.extensions
    ) ? w == null ? void 0 : w.extensions : void 0;
    this.extensions = (i = g ?? x) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), w != null && w.stack ? Object.defineProperty(this, "stack", {
      value: w.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, zo) : Object.defineProperty(this, "stack", {
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

` + gh(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + gu(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function dc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function gt(e, t, n) {
  return new zo(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class mh {
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
class pu {
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
const mu = {
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
}, wh = new Set(Object.keys(mu));
function Ac(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && wh.has(t);
}
var Zn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(Zn || (Zn = {}));
var qi;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(qi || (qi = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function ji(e) {
  return e === 9 || e === 32;
}
function Or(e) {
  return e >= 48 && e <= 57;
}
function wu(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function yu(e) {
  return wu(e) || e === 95;
}
function yh(e) {
  return wu(e) || Or(e) || e === 95;
}
function Ih(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const c = e[o], A = Eh(c);
    A !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && A < n && (n = A));
  }
  return e.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function Eh(e) {
  let t = 0;
  for (; t < e.length && ji(e.charCodeAt(t)); )
    ++t;
  return t;
}
function bh(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((x) => x.length === 0 || ji(x.charCodeAt(0))), o = n.endsWith('\\"""'), c = e.endsWith('"') && !o, A = e.endsWith("\\"), f = c || A, w = (
    // add leading and trailing new lines only if it improves readability
    !s || e.length > 70 || f || i || o
  );
  let g = "";
  const C = s && ji(e.charCodeAt(0));
  return (w && !C || i) && (g += `
`), g += n, (w || f) && (g += `
`), '"""' + g + '"""';
}
var z;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(z || (z = {}));
class Ch {
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
    const n = new pu(z.SOF, 0, 0, 0, 0);
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
    if (t.kind !== z.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const n = vh(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === z.COMMENT);
    return t;
  }
}
function Bh(e) {
  return e === z.BANG || e === z.DOLLAR || e === z.AMP || e === z.PAREN_L || e === z.PAREN_R || e === z.SPREAD || e === z.COLON || e === z.EQUALS || e === z.AT || e === z.BRACKET_L || e === z.BRACKET_R || e === z.BRACE_L || e === z.PIPE || e === z.BRACE_R;
}
function hr(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Gs(e, t) {
  return Iu(e.charCodeAt(t)) && Eu(e.charCodeAt(t + 1));
}
function Iu(e) {
  return e >= 55296 && e <= 56319;
}
function Eu(e) {
  return e >= 56320 && e <= 57343;
}
function Hn(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return z.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function ht(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new pu(t, n, r, i, o, s);
}
function vh(e, t) {
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
        return xh(e, s);
      case 33:
        return ht(e, z.BANG, s, s + 1);
      case 36:
        return ht(e, z.DOLLAR, s, s + 1);
      case 38:
        return ht(e, z.AMP, s, s + 1);
      case 40:
        return ht(e, z.PAREN_L, s, s + 1);
      case 41:
        return ht(e, z.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return ht(e, z.SPREAD, s, s + 3);
        break;
      case 58:
        return ht(e, z.COLON, s, s + 1);
      case 61:
        return ht(e, z.EQUALS, s, s + 1);
      case 64:
        return ht(e, z.AT, s, s + 1);
      case 91:
        return ht(e, z.BRACKET_L, s, s + 1);
      case 93:
        return ht(e, z.BRACKET_R, s, s + 1);
      case 123:
        return ht(e, z.BRACE_L, s, s + 1);
      case 124:
        return ht(e, z.PIPE, s, s + 1);
      case 125:
        return ht(e, z.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? Dh(e, s) : Rh(e, s);
    }
    if (Or(i) || i === 45)
      return _h(e, s, i);
    if (yu(i))
      return Th(e, s);
    throw gt(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : hr(i) || Gs(n, s) ? `Unexpected character: ${Hn(e, s)}.` : `Invalid character: ${Hn(e, s)}.`
    );
  }
  return ht(e, z.EOF, r, r);
}
function xh(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (hr(i))
      ++s;
    else if (Gs(n, s))
      s += 2;
    else
      break;
  }
  return ht(
    e,
    z.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function _h(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Or(i))
      throw gt(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Hn(
          e,
          s
        )}.`
      );
  } else
    s = Ci(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = Ci(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = Ci(e, s, i), i = r.charCodeAt(s)), i === 46 || yu(i))
    throw gt(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Hn(
        e,
        s
      )}.`
    );
  return ht(
    e,
    o ? z.FLOAT : z.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function Ci(e, t, n) {
  if (!Or(n))
    throw gt(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Hn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; Or(r.charCodeAt(s)); )
    ++s;
  return s;
}
function Rh(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), ht(e, z.STRING, t, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const A = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? Sh(e, s) : Qh(e, s) : Nh(e, s);
      o += A.value, s += A.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (hr(c))
      ++s;
    else if (Gs(n, s))
      s += 2;
    else
      throw gt(
        e.source,
        s,
        `Invalid character within String: ${Hn(
          e,
          s
        )}.`
      );
  }
  throw gt(e.source, s, "Unterminated string.");
}
function Sh(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !hr(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | xr(i), r < 0)
      break;
  }
  throw gt(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(
      t,
      t + s
    )}".`
  );
}
function Qh(e, t) {
  const n = e.source.body, r = lc(n, t + 2);
  if (hr(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Iu(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = lc(n, t + 8);
    if (Eu(s))
      return {
        value: String.fromCodePoint(r, s),
        size: 12
      };
  }
  throw gt(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function lc(e, t) {
  return xr(e.charCodeAt(t)) << 12 | xr(e.charCodeAt(t + 1)) << 8 | xr(e.charCodeAt(t + 2)) << 4 | xr(e.charCodeAt(t + 3));
}
function xr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Nh(e, t) {
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
  throw gt(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(
      t,
      t + 2
    )}".`
  );
}
function Dh(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, c = "";
  const A = [];
  for (; i < r; ) {
    const f = n.charCodeAt(i);
    if (f === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), A.push(c);
      const w = ht(
        e,
        z.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Ih(A).join(`
`)
      );
      return e.line += A.length - 1, e.lineStart = s, w;
    }
    if (f === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      c += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (f === 10 || f === 13) {
      c += n.slice(o, i), A.push(c), f === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, c = "", o = i, s = i;
      continue;
    }
    if (hr(f))
      ++i;
    else if (Gs(n, i))
      i += 2;
    else
      throw gt(
        e.source,
        i,
        `Invalid character within String: ${Hn(
          e,
          i
        )}.`
      );
  }
  throw gt(e.source, i, "Unterminated string.");
}
function Th(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (yh(i))
      ++s;
    else
      break;
  }
  return ht(
    e,
    z.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function ms(e, t) {
  if (!!!e)
    throw new Error(t);
}
const Fh = 10, bu = 2;
function Ho(e) {
  return zs(e, []);
}
function zs(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Mh(e, t);
    default:
      return String(e);
  }
}
function Mh(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (Oh(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : zs(r, n);
  } else if (Array.isArray(e))
    return kh(e, n);
  return Lh(e, n);
}
function Oh(e) {
  return typeof e.toJSON == "function";
}
function Lh(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > bu ? "[" + Ph(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + zs(i, t)
  ).join(", ") + " }";
}
function kh(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > bu)
    return "[Array]";
  const n = Math.min(Fh, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(zs(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function Ph(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const Uh = globalThis.process && // eslint-disable-next-line no-undef
!0, Gh = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  Uh ? function(t, n) {
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
        const o = Ho(t);
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
class Cu {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || ms(!1, `Body must be a string. Received: ${Ho(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || ms(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || ms(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function zh(e) {
  return Gh(e, Cu);
}
function Bu(e, t) {
  return new Vr(e, t).parseDocument();
}
function Hh(e, t) {
  const n = new Vr(e, t);
  n.expectToken(z.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(z.EOF), r;
}
function Xh(e, t) {
  const n = new Vr(e, t);
  n.expectToken(z.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(z.EOF), r;
}
function Vh(e, t) {
  const n = new Vr(e, t);
  n.expectToken(z.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(z.EOF), r;
}
class Vr {
  constructor(t, n = {}) {
    const r = zh(t) ? t : new Cu(t);
    this._lexer = new Ch(r), this._options = n, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(z.NAME);
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
        z.SOF,
        this.parseDefinition,
        z.EOF
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
    if (this.peek(z.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), n = t ? this._lexer.lookahead() : this._lexer.token;
    if (n.kind === z.NAME) {
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
        throw gt(
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
    if (this.peek(z.BRACE_L))
      return this.node(t, {
        kind: ae.OPERATION_DEFINITION,
        operation: Zn.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(z.NAME) && (r = this.parseName()), this.node(t, {
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
    const t = this.expectToken(z.NAME);
    switch (t.value) {
      case "query":
        return Zn.QUERY;
      case "mutation":
        return Zn.MUTATION;
      case "subscription":
        return Zn.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      z.PAREN_L,
      this.parseVariableDefinition,
      z.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ae.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(z.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(z.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(z.DOLLAR), this.node(t, {
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
        z.BRACE_L,
        this.parseSelection,
        z.BRACE_R
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
    return this.peek(z.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, n = this.parseName();
    let r, s;
    return this.expectOptionalToken(z.COLON) ? (r = n, s = this.parseName()) : s = n, this.node(t, {
      kind: ae.FIELD,
      alias: r,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(z.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const n = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(z.PAREN_L, n, z.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(z.COLON), this.node(n, {
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
    this.expectToken(z.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(z.NAME) ? this.node(t, {
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
      case z.BRACKET_L:
        return this.parseList(t);
      case z.BRACE_L:
        return this.parseObject(t);
      case z.INT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.INT,
          value: n.value
        });
      case z.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.FLOAT,
          value: n.value
        });
      case z.STRING:
      case z.BLOCK_STRING:
        return this.parseStringLiteral();
      case z.NAME:
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
      case z.DOLLAR:
        if (t)
          if (this.expectToken(z.DOLLAR), this._lexer.token.kind === z.NAME) {
            const r = this._lexer.token.value;
            throw gt(
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
      block: t.kind === z.BLOCK_STRING
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
      values: this.any(z.BRACKET_L, n, z.BRACKET_R)
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
      fields: this.any(z.BRACE_L, n, z.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(z.COLON), this.node(n, {
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
    for (; this.peek(z.AT); )
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
    return this.expectToken(z.AT), this.node(n, {
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
    if (this.expectOptionalToken(z.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(z.BRACKET_R), n = this.node(t, {
        kind: ae.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(z.BANG) ? this.node(t, {
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
    return this.peek(z.STRING) || this.peek(z.BLOCK_STRING);
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
      z.BRACE_L,
      this.parseOperationTypeDefinition,
      z.BRACE_R
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
    this.expectToken(z.COLON);
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(z.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      z.BRACE_L,
      this.parseFieldDefinition,
      z.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(z.COLON);
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
      z.PAREN_L,
      this.parseInputValueDef,
      z.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(z.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(z.EQUALS) && (i = this.parseConstValueLiteral());
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
    return this.expectOptionalToken(z.EQUALS) ? this.delimitedMany(z.PIPE, this.parseNamedType) : [];
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
      z.BRACE_L,
      this.parseEnumValueDefinition,
      z.BRACE_R
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
      throw gt(
        this._lexer.source,
        this._lexer.token.start,
        `${ss(
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
      z.BRACE_L,
      this.parseInputValueDef,
      z.BRACE_R
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
    if (t.kind === z.NAME)
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
      z.BRACE_L,
      this.parseOperationTypeDefinition,
      z.BRACE_R
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
    this.expectKeyword("directive"), this.expectToken(z.AT);
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
    return this.delimitedMany(z.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call(qi, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new mh(
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
    throw gt(
      this._lexer.source,
      n.start,
      `Expected ${vu(t)}, found ${ss(n)}.`
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
    if (n.kind === z.NAME && n.value === t)
      this.advanceLexer();
    else
      throw gt(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${ss(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const n = this._lexer.token;
    return n.kind === z.NAME && n.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const n = t ?? this._lexer.token;
    return gt(
      this._lexer.source,
      n.start,
      `Unexpected ${ss(n)}.`
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
    if (t !== void 0 && n.kind !== z.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw gt(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function ss(e) {
  const t = e.value;
  return vu(e.kind) + (t != null ? ` "${t}"` : "");
}
function vu(e) {
  return Bh(e) ? `"${e}"` : e;
}
const Yh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: Vr,
  parse: Bu,
  parseConstValue: Xh,
  parseType: Vh,
  parseValue: Hh
}, Symbol.toStringTag, { value: "Module" })), Zh = /* @__PURE__ */ po(Yh);
function Wh(e) {
  return `"${e.replace(Jh, qh)}"`;
}
const Jh = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function qh(e) {
  return jh[e.charCodeAt(0)];
}
const jh = [
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
], $h = Object.freeze({});
function Kh(e, t, n = mu) {
  const r = /* @__PURE__ */ new Map();
  for (const T of Object.values(ae))
    r.set(T, eg(t, T));
  let s, i = Array.isArray(e), o = [e], c = -1, A = [], f = e, w, g;
  const C = [], x = [];
  do {
    c++;
    const T = c === o.length, G = T && A.length !== 0;
    if (T) {
      if (w = x.length === 0 ? void 0 : C[C.length - 1], f = g, g = x.pop(), G)
        if (i) {
          f = f.slice();
          let W = 0;
          for (const [L, Q] of A) {
            const k = L - W;
            Q === null ? (f.splice(k, 1), W++) : f[k] = Q;
          }
        } else {
          f = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(f)
          );
          for (const [W, L] of A)
            f[W] = L;
        }
      c = s.index, o = s.keys, A = s.edits, i = s.inArray, s = s.prev;
    } else if (g) {
      if (w = i ? c : o[c], f = g[w], f == null)
        continue;
      C.push(w);
    }
    let P;
    if (!Array.isArray(f)) {
      var _, B;
      Ac(f) || ms(!1, `Invalid AST Node: ${Ho(f)}.`);
      const W = T ? (_ = r.get(f.kind)) === null || _ === void 0 ? void 0 : _.leave : (B = r.get(f.kind)) === null || B === void 0 ? void 0 : B.enter;
      if (P = W == null ? void 0 : W.call(t, f, w, g, C, x), P === $h)
        break;
      if (P === !1) {
        if (!T) {
          C.pop();
          continue;
        }
      } else if (P !== void 0 && (A.push([w, P]), !T))
        if (Ac(P))
          f = P;
        else {
          C.pop();
          continue;
        }
    }
    if (P === void 0 && G && A.push([w, f]), T)
      C.pop();
    else {
      var D;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: A,
        prev: s
      }, i = Array.isArray(f), o = i ? f : (D = n[f.kind]) !== null && D !== void 0 ? D : [], c = -1, A = [], g && x.push(g), g = f;
    }
  } while (s !== void 0);
  return A.length !== 0 ? A[A.length - 1][1] : e;
}
function eg(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function xu(e) {
  return Kh(e, ng);
}
const tg = 80, ng = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => se(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = pe("(", se(e.variableDefinitions, ", "), ")"), n = se(
        [
          e.operation,
          se([e.name, t]),
          se(e.directives, " ")
        ],
        " "
      );
      return (n === "query" ? "" : n + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: n, directives: r }) => e + ": " + t + pe(" = ", n) + pe(" ", se(r, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => Tt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", se(n, ", "), ")");
      return o.length > tg && (o = i + pe(`(
`, ws(se(n, `
`)), `
)`)), se([o, se(r, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + pe(" ", se(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: n }) => se(
      [
        "...",
        pe("on ", e),
        se(t, " "),
        n
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: n, directives: r, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${pe("(", se(n, ", "), ")")} on ${t} ${pe("", se(r, " "), " ")}` + s
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
    leave: ({ value: e, block: t }) => t ? bh(e) : Wh(e)
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
    leave: ({ values: e }) => "[" + se(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + se(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + pe("(", se(t, ", "), ")")
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
`) + se(["schema", se(t, " "), Tt(n)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + se(["scalar", t, se(n, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => pe("", e, `
`) + se(
      [
        "type",
        t,
        pe("implements ", se(n, " & ")),
        se(r, " "),
        Tt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (fc(n) ? pe(`(
`, ws(se(n, `
`)), `
)`) : pe("(", se(n, ", "), ")")) + ": " + r + pe(" ", se(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: n, defaultValue: r, directives: s }) => pe("", e, `
`) + se(
      [t + ": " + n, pe("= ", r), se(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => pe("", e, `
`) + se(
      [
        "interface",
        t,
        pe("implements ", se(n, " & ")),
        se(r, " "),
        Tt(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, types: r }) => pe("", e, `
`) + se(
      ["union", t, se(n, " "), pe("= ", se(r, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, values: r }) => pe("", e, `
`) + se(["enum", t, se(n, " "), Tt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + se([t, se(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + se(["input", t, se(n, " "), Tt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (fc(n) ? pe(`(
`, ws(se(n, `
`)), `
)`) : pe("(", se(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + se(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => se(
      ["extend schema", se(e, " "), Tt(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => se(["extend scalar", e, se(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => se(
      [
        "extend type",
        e,
        pe("implements ", se(t, " & ")),
        se(n, " "),
        Tt(r)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => se(
      [
        "extend interface",
        e,
        pe("implements ", se(t, " & ")),
        se(n, " "),
        Tt(r)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: n }) => se(
      [
        "extend union",
        e,
        se(t, " "),
        pe("= ", se(n, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: n }) => se(["extend enum", e, se(t, " "), Tt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => se(["extend input", e, se(t, " "), Tt(n)], " ")
  }
};
function se(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Tt(e) {
  return pe(`{
`, ws(se(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function ws(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function fc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const rg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: xu
}, Symbol.toStringTag, { value: "Module" })), sg = /* @__PURE__ */ po(rg);
var Xo = {}, Hs = {}, _u = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, ig = _u, Ru = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof ig;
}, og = Ru, ag = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = og);
  var s, i = /* @__PURE__ */ new Map();
  function o(w, g) {
    var C = i.get(g);
    C ? C.push.apply(C, w) : i.set(g, w);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var c = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(w, g) {
        return o(["" + c + g], w), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(w, g) {
        var C = e(w, "" + c + g, r);
        return C.files.forEach(o), C.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var A in t) {
        var f = e(t[A], "" + c + A, r);
        f.files.forEach(o), s[A] = f.clone;
      }
    } else s = t;
  }
  return {
    clone: s,
    files: i
  };
};
Hs.ReactNativeFile = _u;
Hs.extractFiles = ag;
Hs.isExtractableFile = Ru;
var cg = typeof self == "object" ? self.FormData : window.FormData, Yr = {};
Object.defineProperty(Yr, "__esModule", { value: !0 });
Yr.defaultJsonSerializer = void 0;
Yr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var ug = Ce && Ce.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Xo, "__esModule", { value: !0 });
var Su = Hs, dg = ug(cg), Ag = Yr, lg = function(e) {
  return Su.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function fg(e, t, n, r) {
  r === void 0 && (r = Ag.defaultJsonSerializer);
  var s = Su.extractFiles({ query: e, variables: t, operationName: n }, "", lg), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var c = e.reduce(function(C, x, _) {
      return C.push({ query: x, variables: t ? t[_] : void 0 }), C;
    }, []);
    return r.stringify(c);
  }
  var A = typeof FormData > "u" ? dg.default : FormData, f = new A();
  f.append("operations", r.stringify(i));
  var w = {}, g = 0;
  return o.forEach(function(C) {
    w[++g] = C;
  }), f.append("map", r.stringify(w)), g = 0, o.forEach(function(C, x) {
    f.append("" + ++g, x);
  }), f;
}
Xo.default = fg;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.parseBatchRequestsExtendedArgs = vt.parseRawRequestExtendedArgs = vt.parseRequestExtendedArgs = vt.parseBatchRequestArgs = vt.parseRawRequestArgs = vt.parseRequestArgs = void 0;
function hg(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
vt.parseRequestArgs = hg;
function gg(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
vt.parseRawRequestArgs = gg;
function pg(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
vt.parseBatchRequestArgs = pg;
function mg(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
vt.parseRequestExtendedArgs = mg;
function wg(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
vt.parseRawRequestExtendedArgs = wg;
function yg(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
vt.parseBatchRequestsExtendedArgs = yg;
var Zr = {}, Ig = Ce && Ce.__extends || /* @__PURE__ */ function() {
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
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.ClientError = void 0;
var Eg = (
  /** @class */
  function(e) {
    Ig(t, e);
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
Zr.ClientError = Eg;
var Er = {}, hc;
function bg() {
  if (hc) return Er;
  hc = 1;
  var e = Ce && Ce.__assign || function() {
    return e = Object.assign || function(L) {
      for (var Q, k = 1, O = arguments.length; k < O; k++) {
        Q = arguments[k];
        for (var U in Q) Object.prototype.hasOwnProperty.call(Q, U) && (L[U] = Q[U]);
      }
      return L;
    }, e.apply(this, arguments);
  }, t = Ce && Ce.__awaiter || function(L, Q, k, O) {
    function U(H) {
      return H instanceof k ? H : new k(function(X) {
        X(H);
      });
    }
    return new (k || (k = Promise))(function(H, X) {
      function K(u) {
        try {
          a(O.next(u));
        } catch (l) {
          X(l);
        }
      }
      function b(u) {
        try {
          a(O.throw(u));
        } catch (l) {
          X(l);
        }
      }
      function a(u) {
        u.done ? H(u.value) : U(u.value).then(K, b);
      }
      a((O = O.apply(L, Q || [])).next());
    });
  }, n = Ce && Ce.__generator || function(L, Q) {
    var k = { label: 0, sent: function() {
      if (H[0] & 1) throw H[1];
      return H[1];
    }, trys: [], ops: [] }, O, U, H, X;
    return X = { next: K(0), throw: K(1), return: K(2) }, typeof Symbol == "function" && (X[Symbol.iterator] = function() {
      return this;
    }), X;
    function K(a) {
      return function(u) {
        return b([a, u]);
      };
    }
    function b(a) {
      if (O) throw new TypeError("Generator is already executing.");
      for (; k; ) try {
        if (O = 1, U && (H = a[0] & 2 ? U.return : a[0] ? U.throw || ((H = U.return) && H.call(U), 0) : U.next) && !(H = H.call(U, a[1])).done) return H;
        switch (U = 0, H && (a = [a[0] & 2, H.value]), a[0]) {
          case 0:
          case 1:
            H = a;
            break;
          case 4:
            return k.label++, { value: a[1], done: !1 };
          case 5:
            k.label++, U = a[1], a = [0];
            continue;
          case 7:
            a = k.ops.pop(), k.trys.pop();
            continue;
          default:
            if (H = k.trys, !(H = H.length > 0 && H[H.length - 1]) && (a[0] === 6 || a[0] === 2)) {
              k = 0;
              continue;
            }
            if (a[0] === 3 && (!H || a[1] > H[0] && a[1] < H[3])) {
              k.label = a[1];
              break;
            }
            if (a[0] === 6 && k.label < H[1]) {
              k.label = H[1], H = a;
              break;
            }
            if (H && k.label < H[2]) {
              k.label = H[2], k.ops.push(a);
              break;
            }
            H[2] && k.ops.pop(), k.trys.pop();
            continue;
        }
        a = Q.call(L, k);
      } catch (u) {
        a = [6, u], U = 0;
      } finally {
        O = H = 0;
      }
      if (a[0] & 5) throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Er, "__esModule", { value: !0 }), Er.GraphQLWebSocketClient = void 0;
  var r = Zr, s = Qu(), i = "connection_init", o = "connection_ack", c = "ping", A = "pong", f = "subscribe", w = "next", g = "error", C = "complete", x = (
    /** @class */
    function() {
      function L(Q, k, O) {
        this._type = Q, this._payload = k, this._id = O;
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
          var Q = { type: this.type };
          return this.id != null && this.id != null && (Q.id = this.id), this.payload != null && this.payload != null && (Q.payload = this.payload), JSON.stringify(Q);
        },
        enumerable: !1,
        configurable: !0
      }), L.parse = function(Q, k) {
        var O = JSON.parse(Q), U = O.type, H = O.payload, X = O.id;
        return new L(U, k(H), X);
      }, L;
    }()
  ), _ = (
    /** @class */
    function() {
      function L(Q, k) {
        var O = this, U = k.onInit, H = k.onAcknowledged, X = k.onPing, K = k.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = Q, Q.onopen = function(b) {
          return t(O, void 0, void 0, function() {
            var a, u, l, m;
            return n(this, function(h) {
              switch (h.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, u = (a = Q).send, l = D, U ? [4, U()] : [3, 2];
                case 1:
                  return m = h.sent(), [3, 3];
                case 2:
                  m = null, h.label = 3;
                case 3:
                  return u.apply(a, [l.apply(void 0, [m]).text]), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, Q.onclose = function(b) {
          O.socketState.acknowledged = !1, O.socketState.subscriptions = {};
        }, Q.onerror = function(b) {
          console.error(b);
        }, Q.onmessage = function(b) {
          try {
            var a = B(b.data);
            switch (a.type) {
              case o: {
                O.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (O.socketState.acknowledged = !0, H && H(a.payload));
                return;
              }
              case c: {
                X ? X(a.payload).then(function(I) {
                  return Q.send(G(I).text);
                }) : Q.send(G(null).text);
                return;
              }
              case A: {
                K && K(a.payload);
                return;
              }
            }
            if (!O.socketState.acknowledged || a.id === void 0 || a.id === null || !O.socketState.subscriptions[a.id])
              return;
            var u = O.socketState.subscriptions[a.id], l = u.query, m = u.variables, h = u.subscriber;
            switch (a.type) {
              case w: {
                !a.payload.errors && a.payload.data && h.next && h.next(a.payload.data), a.payload.errors && h.error && h.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: l, variables: m }));
                return;
              }
              case g: {
                h.error && h.error(new r.ClientError({ errors: a.payload, status: 200 }, { query: l, variables: m }));
                return;
              }
              case C: {
                h.complete && h.complete(), delete O.socketState.subscriptions[a.id];
                return;
              }
            }
          } catch (I) {
            console.error(I), Q.close(1006);
          }
          Q.close(4400, "Unknown graphql-ws message.");
        };
      }
      return L.prototype.makeSubscribe = function(Q, k, O, U) {
        var H = this, X = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[X] = { query: Q, variables: O, subscriber: U }, this.socket.send(P(X, { query: Q, operationName: k, variables: O }).text), function() {
          H.socket.send(W(X).text), delete H.socketState.subscriptions[X];
        };
      }, L.prototype.rawRequest = function(Q, k) {
        var O = this;
        return new Promise(function(U, H) {
          var X;
          O.rawSubscribe(Q, {
            next: function(K, b) {
              return X = { data: K, extensions: b };
            },
            error: H,
            complete: function() {
              return U(X);
            }
          }, k);
        });
      }, L.prototype.request = function(Q, k) {
        var O = this;
        return new Promise(function(U, H) {
          var X;
          O.subscribe(Q, {
            next: function(K) {
              return X = K;
            },
            error: H,
            complete: function() {
              return U(X);
            }
          }, k);
        });
      }, L.prototype.subscribe = function(Q, k, O) {
        var U = s.resolveRequestDocument(Q), H = U.query, X = U.operationName;
        return this.makeSubscribe(H, X, O, k);
      }, L.prototype.rawSubscribe = function(Q, k, O) {
        return this.makeSubscribe(Q, void 0, O, k);
      }, L.prototype.ping = function(Q) {
        this.socket.send(T(Q).text);
      }, L.prototype.close = function() {
        this.socket.close(1e3);
      }, L.PROTOCOL = "graphql-transport-ws", L;
    }()
  );
  Er.GraphQLWebSocketClient = _;
  function B(L, Q) {
    Q === void 0 && (Q = function(O) {
      return O;
    });
    var k = x.parse(L, Q);
    return k;
  }
  function D(L) {
    return new x(i, L);
  }
  function T(L) {
    return new x(c, L, void 0);
  }
  function G(L) {
    return new x(A, L, void 0);
  }
  function P(L, Q) {
    return new x(f, Q, L);
  }
  function W(L) {
    return new x(C, void 0, L);
  }
  return Er;
}
var gc;
function Qu() {
  return gc || (gc = 1, function(e) {
    var t = Ce && Ce.__assign || function() {
      return t = Object.assign || function(h) {
        for (var I, E = 1, p = arguments.length; E < p; E++) {
          I = arguments[E];
          for (var d in I) Object.prototype.hasOwnProperty.call(I, d) && (h[d] = I[d]);
        }
        return h;
      }, t.apply(this, arguments);
    }, n = Ce && Ce.__createBinding || (Object.create ? function(h, I, E, p) {
      p === void 0 && (p = E), Object.defineProperty(h, p, { enumerable: !0, get: function() {
        return I[E];
      } });
    } : function(h, I, E, p) {
      p === void 0 && (p = E), h[p] = I[E];
    }), r = Ce && Ce.__setModuleDefault || (Object.create ? function(h, I) {
      Object.defineProperty(h, "default", { enumerable: !0, value: I });
    } : function(h, I) {
      h.default = I;
    }), s = Ce && Ce.__importStar || function(h) {
      if (h && h.__esModule) return h;
      var I = {};
      if (h != null) for (var E in h) E !== "default" && Object.prototype.hasOwnProperty.call(h, E) && n(I, h, E);
      return r(I, h), I;
    }, i = Ce && Ce.__awaiter || function(h, I, E, p) {
      function d(y) {
        return y instanceof E ? y : new E(function(Y) {
          Y(y);
        });
      }
      return new (E || (E = Promise))(function(y, Y) {
        function V(ne) {
          try {
            j(p.next(ne));
          } catch (re) {
            Y(re);
          }
        }
        function $(ne) {
          try {
            j(p.throw(ne));
          } catch (re) {
            Y(re);
          }
        }
        function j(ne) {
          ne.done ? y(ne.value) : d(ne.value).then(V, $);
        }
        j((p = p.apply(h, I || [])).next());
      });
    }, o = Ce && Ce.__generator || function(h, I) {
      var E = { label: 0, sent: function() {
        if (y[0] & 1) throw y[1];
        return y[1];
      }, trys: [], ops: [] }, p, d, y, Y;
      return Y = { next: V(0), throw: V(1), return: V(2) }, typeof Symbol == "function" && (Y[Symbol.iterator] = function() {
        return this;
      }), Y;
      function V(j) {
        return function(ne) {
          return $([j, ne]);
        };
      }
      function $(j) {
        if (p) throw new TypeError("Generator is already executing.");
        for (; E; ) try {
          if (p = 1, d && (y = j[0] & 2 ? d.return : j[0] ? d.throw || ((y = d.return) && y.call(d), 0) : d.next) && !(y = y.call(d, j[1])).done) return y;
          switch (d = 0, y && (j = [j[0] & 2, y.value]), j[0]) {
            case 0:
            case 1:
              y = j;
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
              if (y = E.trys, !(y = y.length > 0 && y[y.length - 1]) && (j[0] === 6 || j[0] === 2)) {
                E = 0;
                continue;
              }
              if (j[0] === 3 && (!y || j[1] > y[0] && j[1] < y[3])) {
                E.label = j[1];
                break;
              }
              if (j[0] === 6 && E.label < y[1]) {
                E.label = y[1], y = j;
                break;
              }
              if (y && E.label < y[2]) {
                E.label = y[2], E.ops.push(j);
                break;
              }
              y[2] && E.ops.pop(), E.trys.pop();
              continue;
          }
          j = I.call(h, E);
        } catch (ne) {
          j = [6, ne], d = 0;
        } finally {
          p = y = 0;
        }
        if (j[0] & 5) throw j[1];
        return { value: j[0] ? j[1] : void 0, done: !0 };
      }
    }, c = Ce && Ce.__rest || function(h, I) {
      var E = {};
      for (var p in h) Object.prototype.hasOwnProperty.call(h, p) && I.indexOf(p) < 0 && (E[p] = h[p]);
      if (h != null && typeof Object.getOwnPropertySymbols == "function")
        for (var d = 0, p = Object.getOwnPropertySymbols(h); d < p.length; d++)
          I.indexOf(p[d]) < 0 && Object.prototype.propertyIsEnumerable.call(h, p[d]) && (E[p[d]] = h[p[d]]);
      return E;
    }, A = Ce && Ce.__importDefault || function(h) {
      return h && h.__esModule ? h : { default: h };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var f = s(Ah), w = f, g = Zh, C = sg, x = A(Xo), _ = Yr, B = vt, D = Zr;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return D.ClientError;
    } });
    var T = function(h) {
      var I = {};
      return h && (typeof Headers < "u" && h instanceof Headers || w && w.Headers && h instanceof w.Headers ? I = l(h) : Array.isArray(h) ? h.forEach(function(E) {
        var p = E[0], d = E[1];
        I[p] = d;
      }) : I = h), I;
    }, G = function(h) {
      return h.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, P = function(h) {
      var I = h.query, E = h.variables, p = h.operationName, d = h.jsonSerializer;
      if (!Array.isArray(I)) {
        var y = ["query=" + encodeURIComponent(G(I))];
        return E && y.push("variables=" + encodeURIComponent(d.stringify(E))), p && y.push("operationName=" + encodeURIComponent(p)), y.join("&");
      }
      if (typeof E < "u" && !Array.isArray(E))
        throw new Error("Cannot create query with given variable type, array expected");
      var Y = I.reduce(function(V, $, j) {
        return V.push({
          query: G($),
          variables: E ? d.stringify(E[j]) : void 0
        }), V;
      }, []);
      return "query=" + encodeURIComponent(d.stringify(Y));
    }, W = function(h) {
      var I = h.url, E = h.query, p = h.variables, d = h.operationName, y = h.headers, Y = h.fetch, V = h.fetchOptions, $ = h.middleware;
      return i(void 0, void 0, void 0, function() {
        var j, ne;
        return o(this, function(re) {
          switch (re.label) {
            case 0:
              return j = x.default(E, p, d, V.jsonSerializer), ne = t({ method: "POST", headers: t(t({}, typeof j == "string" ? { "Content-Type": "application/json" } : {}), y), body: j }, V), $ ? [4, Promise.resolve($(ne))] : [3, 2];
            case 1:
              ne = re.sent(), re.label = 2;
            case 2:
              return [4, Y(I, ne)];
            case 3:
              return [2, re.sent()];
          }
        });
      });
    }, L = function(h) {
      var I = h.url, E = h.query, p = h.variables, d = h.operationName, y = h.headers, Y = h.fetch, V = h.fetchOptions, $ = h.middleware;
      return i(void 0, void 0, void 0, function() {
        var j, ne;
        return o(this, function(re) {
          switch (re.label) {
            case 0:
              return j = P({
                query: E,
                variables: p,
                operationName: d,
                jsonSerializer: V.jsonSerializer
              }), ne = t({ method: "GET", headers: y }, V), $ ? [4, Promise.resolve($(ne))] : [3, 2];
            case 1:
              ne = re.sent(), re.label = 2;
            case 2:
              return [4, Y(I + "?" + j, ne)];
            case 3:
              return [2, re.sent()];
          }
        });
      });
    }, Q = (
      /** @class */
      function() {
        function h(I, E) {
          E === void 0 && (E = {}), this.url = I, this.options = E;
        }
        return h.prototype.rawRequest = function(I, E, p) {
          return i(this, void 0, void 0, function() {
            var d, y, Y, V, $, j, ne, re, be, Ae, ie, me;
            return o(this, function(ue) {
              return d = B.parseRawRequestArgs(I, E, p), y = this.options, Y = y.headers, V = y.fetch, $ = V === void 0 ? f.default : V, j = y.method, ne = j === void 0 ? "POST" : j, re = y.requestMiddleware, be = y.responseMiddleware, Ae = c(y, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ie = this.url, d.signal !== void 0 && (Ae.signal = d.signal), me = b(d.query).operationName, [2, k({
                url: ie,
                query: d.query,
                variables: d.variables,
                headers: t(t({}, T(a(Y))), T(d.requestHeaders)),
                operationName: me,
                fetch: $,
                method: ne,
                fetchOptions: Ae,
                middleware: re
              }).then(function(he) {
                return be && be(he), he;
              }).catch(function(he) {
                throw be && be(he), he;
              })];
            });
          });
        }, h.prototype.request = function(I) {
          for (var E = [], p = 1; p < arguments.length; p++)
            E[p - 1] = arguments[p];
          var d = E[0], y = E[1], Y = B.parseRequestArgs(I, d, y), V = this.options, $ = V.headers, j = V.fetch, ne = j === void 0 ? f.default : j, re = V.method, be = re === void 0 ? "POST" : re, Ae = V.requestMiddleware, ie = V.responseMiddleware, me = c(V, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ue = this.url;
          Y.signal !== void 0 && (me.signal = Y.signal);
          var he = b(Y.document), Ut = he.query, Re = he.operationName;
          return k({
            url: ue,
            query: Ut,
            variables: Y.variables,
            headers: t(t({}, T(a($))), T(Y.requestHeaders)),
            operationName: Re,
            fetch: ne,
            method: be,
            fetchOptions: me,
            middleware: Ae
          }).then(function(Ie) {
            return ie && ie(Ie), Ie.data;
          }).catch(function(Ie) {
            throw ie && ie(Ie), Ie;
          });
        }, h.prototype.batchRequests = function(I, E) {
          var p = B.parseBatchRequestArgs(I, E), d = this.options, y = d.headers, Y = d.fetch, V = Y === void 0 ? f.default : Y, $ = d.method, j = $ === void 0 ? "POST" : $, ne = d.requestMiddleware, re = d.responseMiddleware, be = c(d, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), Ae = this.url;
          p.signal !== void 0 && (be.signal = p.signal);
          var ie = p.documents.map(function(ue) {
            var he = ue.document;
            return b(he).query;
          }), me = p.documents.map(function(ue) {
            var he = ue.variables;
            return he;
          });
          return k({
            url: Ae,
            query: ie,
            variables: me,
            headers: t(t({}, T(a(y))), T(p.requestHeaders)),
            operationName: void 0,
            fetch: V,
            method: j,
            fetchOptions: be,
            middleware: ne
          }).then(function(ue) {
            return re && re(ue), ue.data;
          }).catch(function(ue) {
            throw re && re(ue), ue;
          });
        }, h.prototype.setHeaders = function(I) {
          return this.options.headers = I, this;
        }, h.prototype.setHeader = function(I, E) {
          var p, d = this.options.headers;
          return d ? d[I] = E : this.options.headers = (p = {}, p[I] = E, p), this;
        }, h.prototype.setEndpoint = function(I) {
          return this.url = I, this;
        }, h;
      }()
    );
    e.GraphQLClient = Q;
    function k(h) {
      var I = h.url, E = h.query, p = h.variables, d = h.headers, y = h.operationName, Y = h.fetch, V = h.method, $ = V === void 0 ? "POST" : V, j = h.fetchOptions, ne = h.middleware;
      return i(this, void 0, void 0, function() {
        var re, be, Ae, ie, me, ue, he, Ut, Re, Ie, mr;
        return o(this, function(Ne) {
          switch (Ne.label) {
            case 0:
              return re = $.toUpperCase() === "POST" ? W : L, be = Array.isArray(E), [4, re({
                url: I,
                query: E,
                variables: p,
                operationName: y,
                headers: d,
                fetch: Y,
                fetchOptions: j,
                middleware: ne
              })];
            case 1:
              return Ae = Ne.sent(), [4, X(Ae, j.jsonSerializer)];
            case 2:
              if (ie = Ne.sent(), me = be && Array.isArray(ie) ? !ie.some(function(Fe) {
                var jr = Fe.data;
                return !jr;
              }) : !!ie.data, ue = !ie.errors || j.errorPolicy === "all" || j.errorPolicy === "ignore", Ae.ok && ue && me)
                return he = Ae.headers, Ut = Ae.status, ie.errors, Re = c(ie, ["errors"]), Ie = j.errorPolicy === "ignore" ? Re : ie, [2, t(t({}, be ? { data: Ie } : Ie), { headers: he, status: Ut })];
              throw mr = typeof ie == "string" ? { error: ie } : ie, new D.ClientError(t(t({}, mr), { status: Ae.status, headers: Ae.headers }), { query: E, variables: p });
          }
        });
      });
    }
    function O(h, I, E, p) {
      return i(this, void 0, void 0, function() {
        var d, y;
        return o(this, function(Y) {
          return d = B.parseRawRequestExtendedArgs(h, I, E, p), y = new Q(d.url), [2, y.rawRequest(t({}, d))];
        });
      });
    }
    e.rawRequest = O;
    function U(h, I) {
      for (var E = [], p = 2; p < arguments.length; p++)
        E[p - 2] = arguments[p];
      return i(this, void 0, void 0, function() {
        var d, y, Y, V;
        return o(this, function($) {
          return d = E[0], y = E[1], Y = B.parseRequestExtendedArgs(h, I, d, y), V = new Q(Y.url), [2, V.request(t({}, Y))];
        });
      });
    }
    e.request = U;
    function H(h, I, E) {
      return i(this, void 0, void 0, function() {
        var p, d;
        return o(this, function(y) {
          return p = B.parseBatchRequestsExtendedArgs(h, I, E), d = new Q(p.url), [2, d.batchRequests(t({}, p))];
        });
      });
    }
    e.batchRequests = H, e.default = U;
    function X(h, I) {
      return I === void 0 && (I = _.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var E, p, d;
        return o(this, function(y) {
          switch (y.label) {
            case 0:
              return h.headers.forEach(function(Y, V) {
                V.toLowerCase() === "content-type" && (E = Y);
              }), E && E.toLowerCase().startsWith("application/json") ? (d = (p = I).parse, [4, h.text()]) : [3, 2];
            case 1:
              return [2, d.apply(p, [y.sent()])];
            case 2:
              return [2, h.text()];
          }
        });
      });
    }
    function K(h) {
      var I, E = void 0, p = h.definitions.filter(function(d) {
        return d.kind === "OperationDefinition";
      });
      return p.length === 1 && (E = (I = p[0].name) === null || I === void 0 ? void 0 : I.value), E;
    }
    function b(h) {
      if (typeof h == "string") {
        var I = void 0;
        try {
          var E = g.parse(h);
          I = K(E);
        } catch {
        }
        return { query: h, operationName: I };
      }
      var p = K(h);
      return { query: C.print(h), operationName: p };
    }
    e.resolveRequestDocument = b;
    function a(h) {
      return typeof h == "function" ? h() : h;
    }
    function u(h) {
      for (var I = [], E = 1; E < arguments.length; E++)
        I[E - 1] = arguments[E];
      return h.reduce(function(p, d, y) {
        return "" + p + d + (y in I ? I[y] : "");
      }, "");
    }
    e.gql = u;
    function l(h) {
      var I = {};
      return h.forEach(function(E, p) {
        I[p] = E;
      }), I;
    }
    var m = bg();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return m.GraphQLWebSocketClient;
    } });
  }(bi)), bi;
}
var Cg = Qu(), Qs = function() {
  return Qs = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Qs.apply(this, arguments);
};
var ys = /* @__PURE__ */ new Map(), $i = /* @__PURE__ */ new Map(), Nu = !0, Ns = !1;
function Du(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function Bg(e) {
  return Du(e.source.body.substring(e.start, e.end));
}
function vg(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = Bg(r.loc), o = $i.get(s);
      o && !o.has(i) ? Nu && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || $i.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), Qs(Qs({}, e), { definitions: n });
}
function xg(e) {
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
function _g(e) {
  var t = Du(e);
  if (!ys.has(t)) {
    var n = Bu(e, {
      experimentalFragmentVariables: Ns,
      allowLegacyFragmentVariables: Ns
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    ys.set(t, xg(vg(n)));
  }
  return ys.get(t);
}
function te(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), _g(r);
}
function Rg() {
  ys.clear(), $i.clear();
}
function Sg() {
  Nu = !1;
}
function Qg() {
  Ns = !0;
}
function Ng() {
  Ns = !1;
}
var br = {
  gql: te,
  resetCaches: Rg,
  disableFragmentWarnings: Sg,
  enableExperimentalFragmentVariables: Qg,
  disableExperimentalFragmentVariables: Ng
};
(function(e) {
  e.gql = br.gql, e.resetCaches = br.resetCaches, e.disableFragmentWarnings = br.disableFragmentWarnings, e.enableExperimentalFragmentVariables = br.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = br.disableExperimentalFragmentVariables;
})(te || (te = {}));
te.default = te;
var De = "0x0000000000000000000000000000000000000000000000000000000000000000", FI = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", MI = 16 * 1024, OI = 16, LI = 1024 * 1024 * 1024, kI = 1024 * 1024 * 1024, PI = 255, UI = 1024 * 1024, GI = 1024 * 1024, Dg = "0xffffffffffff0000", Tu = "0xffffffffffff0001", Tg = "0xffffffffffff0003", Fg = "0xffffffffffff0004", Mg = "0xffffffffffff0005", zI = "0x0", Og = [
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
], Lg = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let N;
const Fu = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Fu.decode();
let _r = null;
function Mu() {
  return (_r === null || _r.byteLength === 0) && (_r = new Uint8Array(N.memory.buffer)), _r;
}
function kg(e, t) {
  return e = e >>> 0, Fu.decode(Mu().subarray(e, e + t));
}
function Ou(e) {
  const t = N.ret(e);
  return Wt.__wrap(t);
}
function pc(e, t, n, r) {
  const s = N.call(e, t, n, r);
  return Wt.__wrap(s);
}
function Pg(e, t, n) {
  const r = N.tr(e, t, n);
  return Wt.__wrap(r);
}
function mc(e, t, n) {
  const r = N.addi(e, t, n);
  return Wt.__wrap(r);
}
function Ki(e, t, n) {
  const r = N.lw(e, t, n);
  return Wt.__wrap(r);
}
function Ug(e, t, n) {
  const r = N.gtf(e, t, n);
  return Wt.__wrap(r);
}
function is(e, t) {
  const n = N.movi(e, t);
  return Wt.__wrap(n);
}
let Rr = null;
function wc() {
  return (Rr === null || Rr.byteLength === 0) && (Rr = new Int32Array(N.memory.buffer)), Rr;
}
function Gg(e, t) {
  return e = e >>> 0, Mu().subarray(e / 1, e / 1 + t);
}
const zg = Object.freeze({
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
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_add_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_addi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_aloc_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_and_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_andi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_bal_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_bhei_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_bhsh_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_burn_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_call_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_cb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_ccp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_cfe_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_cfei_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_cfs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_cfsi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_croo_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_csiz_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_compareargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_div_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_divi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_divargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_ecal_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_eck1_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_ecr1_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_ed19_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_eq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_exp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_expi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_flag_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_gm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_gt_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_gtf_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_imm06_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_imm12_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_imm18_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_imm24_free(e >>> 0));
const yc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => N.__wbg_instruction_free(e >>> 0));
class Wt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Wt.prototype);
    return n.__wbg_ptr = t, yc.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    N.__wbg_instruction_free(t);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = N.__wbindgen_add_to_stack_pointer(-16);
      N.instruction_to_bytes(s, this.__wbg_ptr);
      var t = wc()[s / 4 + 0], n = wc()[s / 4 + 1], r = Gg(t, n).slice();
      return N.__wbindgen_export_0(t, n * 1, 1), r;
    } finally {
      N.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * Size of an instruction in bytes
  * @returns {number}
  */
  static size() {
    return N.instruction_size() >>> 0;
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_ji_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_jmp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_jmpb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_jmpf_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_jne_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_jneb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_jnef_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_jnei_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_jnzb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_jnzf_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_jnzi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_k256_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_lb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_ldc_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_log_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_logd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_lt_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_lw_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mcl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mcli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mcp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mcpi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_meq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mint_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mldv_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mlog_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mod_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_modi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_move_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_movi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mroo_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mul_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_muli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mathargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_mulargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_noop_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_not_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_or_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_ori_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_poph_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_popl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_pshh_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_pshl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_panicinstruction_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_ret_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_retd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_rvrt_free(e >>> 0));
const Ic = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => N.__wbg_regid_free(e >>> 0));
class Le {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Le.prototype);
    return n.__wbg_ptr = t, Ic.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ic.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    N.__wbg_regid_free(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * Returns `None` if the value is outside the 6-bit value range.
  * @param {number} u
  * @returns {RegId | undefined}
  */
  static new_checked(t) {
    const n = N.regid_new_checked(t);
    return n === 0 ? void 0 : Le.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = N.regid_bal();
    return Le.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = N.regid_cgas();
    return Le.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = N.regid_err();
    return Le.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = N.regid_flag();
    return Le.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = N.regid_fp();
    return Le.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = N.regid_ggas();
    return Le.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = N.regid_hp();
    return Le.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = N.regid_is();
    return Le.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = N.regid_of();
    return Le.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = N.regid_one();
    return Le.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = N.regid_pc();
    return Le.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = N.regid_ret();
    return Le.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = N.regid_retl();
    return Le.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = N.regid_sp();
    return Le.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = N.regid_spp();
    return Le.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = N.regid_writable();
    return Le.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = N.regid_zero();
    return Le.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const n = N.regid_new_typescript(t);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * A const alternative to the `Into<u8>` implementation.
  * @returns {number}
  */
  to_u8() {
    const t = this.__destroy_into_raw();
    return N.regid_to_u8(t);
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_s256_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_sb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_scwq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_sll_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_slli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_smo_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_srl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_srli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_srw_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_srwq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_sub_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_subi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_sw_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_sww_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_swwq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_time_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_tr_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_tro_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wdam_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wdcm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wddv_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wdmd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wdml_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wdmm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wdop_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wqam_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wqcm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wqdv_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wqmd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wqml_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wqmm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_wqop_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_xor_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => N.__wbg_xori_free(e >>> 0));
async function Hg(e, t) {
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
function Xg() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(kg(t, n));
  }, e;
}
function Vg(e, t) {
  return N = e.exports, Lu.__wbindgen_wasm_module = t, Rr = null, _r = null, N;
}
async function Lu(e) {
  if (N !== void 0) return N;
  const t = Xg(), { instance: n, module: r } = await Hg(await e, t);
  return Vg(n, r);
}
function Yg(e, t, n, r) {
  var s = null, i = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (i)
    s = Buffer.from(n, "base64");
  else {
    var o = globalThis.atob(n), c = o.length;
    s = new Uint8Array(new ArrayBuffer(c));
    for (var A = 0; A < c; A++)
      s[A] = o.charCodeAt(A);
  }
  {
    var f = new WebAssembly.Module(s);
    return r ? new WebAssembly.Instance(f, r) : f;
  }
}
function Zg(e) {
  return Yg(1, null, "AGFzbQEAAAABQAtgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38Bf2AAAX9gAn9/AGABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX8CGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABQP7AfkBAQMKBgEFBQUBBQEBAQEBAQECBQICAQEDAgICAgUCAwMDAwMDAwIBBQEFAAMDAwMDAwMDAwMDAQABAQUFAQEBAQEBAQEBAQIBBQUFAwIBAAABAQEFAgIBAQYABgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGAwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEDBgADAQEBBwICAAIABgEEAwEDBQgBCQkDAwMFAQEBBgYGBgQEBAQEBAQEBAQEBAQEBAQEBAQGBwcCAgIDBwcACAADBAUBcAEHBwUDAQARBgkBfwFBgIDAAAsHxEvBBQZtZW1vcnkCABZfX3diZ19jb21wYXJlYXJnc19mcmVlAHcaX193YmdfZ2V0X2NvbXBhcmVhcmdzX21vZGUAORpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQAoIl9fd2JnX2dldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMAOiJfX3diZ19zZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzADsSY29tcGFyZWFyZ3NfdG9faW1tAEgUY29tcGFyZWFyZ3NfZnJvbV9pbW0AKRVfX3diZ19nZXRfbWF0aGFyZ3Nfb3AAORVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AAKhJfX3diZ19tdWxhcmdzX2ZyZWUAeB5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAOR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAPBJfX3diZ19kaXZhcmdzX2ZyZWUA1gEeX193YmdfZ2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK0BIXBhbmljaW5zdHJ1Y3Rpb25fZXJyb3JfdHlwZXNjcmlwdABMF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAD4ccGFuaWNpbnN0cnVjdGlvbl9pbnN0cnVjdGlvbgA/DGdtX2Zyb21fYXJncwDJAQ1ndGZfZnJvbV9hcmdzAMEBB2dtX2FyZ3MAeQhndGZfYXJncwBaDndkY21fZnJvbV9hcmdzACYOd2RvcF9mcm9tX2FyZ3MAJg53ZG1sX2Zyb21fYXJncwAeDndkZHZfZnJvbV9hcmdzAL8BCXdkY21fYXJncwAZCXdxY21fYXJncwAaCXdkb3BfYXJncwAbCXdxb3BfYXJncwAcCXdkbWxfYXJncwAUCXdxbWxfYXJncwAVCXdkZHZfYXJncwBVCXdxZHZfYXJncwBWEF9fd2JnX2ltbTA2X2ZyZWUA1wEQX193YmdfaW1tMTJfZnJlZQDYARBfX3diZ19pbW0xOF9mcmVlANkBDl9fd2JnX2FkZF9mcmVlALgBD19fd2JnX25vb3BfZnJlZQBbEmFkZF9uZXdfdHlwZXNjcmlwdABPBmFkZF9yYQAWBmFkZF9yYgALBmFkZF9yYwAPA2FkZAC5AQNhbmQAewNkaXYAfAJlcQB9A2V4cAB+Amd0AH8CbHQAgAEEbWxvZwCBAQRtcm9vAIIBBG1vZF8AgwEFbW92ZV8ALANtdWwAhAEDbm90AC0Cb3IAhQEDc2xsAIYBA3NybACHAQNzdWIAiAEDeG9yAIkBBG1sZHYAXANyZXQArgEEcmV0ZAAuE2Fsb2NfbmV3X3R5cGVzY3JpcHQAVwdhbG9jX3JhAE4EYWxvYwCvAQNtY2wALwNtY3AAigEDbWVxAF0TYmhzaF9uZXdfdHlwZXNjcmlwdAAfBGJoc2gAMARiaGVpALABBGJ1cm4AMRNjYWxsX25ld190eXBlc2NyaXB0AE0HY2FsbF9yZAAXBGNhbGwAXgNjY3AAXwRjcm9vADIEY3NpegAzAmNiALEBA2xkYwCLAQNsb2cAYARsb2dkAGEEbWludAA0BHJ2cnQAsgEEc2N3cQCMAQNzcncAjQEEc3J3cQBiA3N3dwCOAQRzd3dxAGMCdHIAjwEDdHJvAGQEZWNrMQCQAQRlY3IxAJEBBGVkMTkAkgEEazI1NgCTAQRzMjU2AJQBBHRpbWUANRNub29wX25ld190eXBlc2NyaXB0AMYBBG5vb3AA2gEEZmxhZwCzAQNiYWwAlQEDam1wALQBA2puZQCWAQNzbW8AZRNhZGRpX25ld190eXBlc2NyaXB0AFAKYWRkaV9pbW0xMgAMBGFkZGkAlwEEYW5kaQCYAQRkaXZpAJkBBGV4cGkAmgEEbW9kaQCbAQRtdWxpAJwBA29yaQCdAQRzbGxpAJ4BBHNybGkAnwEEc3ViaQCgAQR4b3JpAKEBBGpuZWkAogECbGIAowECbHcApAECc2IApQECc3cApgEEbWNwaQCnARJndGZfbmV3X3R5cGVzY3JpcHQAwwEDZ3RmAKgBBG1jbGkAIBFnbV9uZXdfdHlwZXNjcmlwdAA2CGdtX2ltbTE4AAkCZ20AIQRtb3ZpACIEam56aQAjBGptcGYAJBNqbXBiX25ld190eXBlc2NyaXB0ABgEam1wYgAlBGpuemYAqQEEam56YgCqAQRqbmVmAGYKam5lYl9pbW0wNgAXBGpuZWIAZwJqaQBAE2NmZWlfbmV3X3R5cGVzY3JpcHQANwpjZmVpX2ltbTI0ACcEY2ZlaQBBBGNmc2kAQgNjZmUAtQEDY2ZzALYBBHBzaGwAQwRwc2hoAEQEcG9wbABFBHBvcGgARhN3ZGNtX25ld190eXBlc2NyaXB0AMABBHdkY20AaAR3cWNtAGkEd2RvcABqBHdxb3AAawR3ZG1sAGwEd3FtbABtBHdkZHYAbgR3cWR2AG8Ed2RtZABwBHdxbWQAcQR3ZGFtAHIEd3FhbQBzBHdkbW0AdAR3cW1tAHUEZWNhbAB2Fl9fd2JnX2luc3RydWN0aW9uX2ZyZWUAWRRpbnN0cnVjdGlvbl90b19ieXRlcwAKEGluc3RydWN0aW9uX3NpemUA7AERcmVnaWRfbmV3X2NoZWNrZWQAqwEJcmVnaWRfYmFsANsBCnJlZ2lkX2NnYXMA3AEJcmVnaWRfZXJyAN0BCnJlZ2lkX2ZsYWcA3gEIcmVnaWRfZnAA3wEKcmVnaWRfZ2dhcwDgAQhyZWdpZF9ocADhAQhyZWdpZF9pcwDiAQhyZWdpZF9vZgDjAQlyZWdpZF9vbmUA5AEIcmVnaWRfcGMA5QEJcmVnaWRfcmV0AOYBCnJlZ2lkX3JldGwA5wEIcmVnaWRfc3AA6AEJcmVnaWRfc3BwAOkBDnJlZ2lkX3dyaXRhYmxlAOoBCnJlZ2lkX3plcm8A6wEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA0wELcmVnaWRfdG9fdTgA1AETbW92aV9uZXdfdHlwZXNjcmlwdAAYE21jbGlfbmV3X3R5cGVzY3JpcHQAGBNqbnppX25ld190eXBlc2NyaXB0ABgTam1wZl9uZXdfdHlwZXNjcmlwdAAYEm5vdF9uZXdfdHlwZXNjcmlwdAAfE3JldGRfbmV3X3R5cGVzY3JpcHQAHxNtb3ZlX25ld190eXBlc2NyaXB0AB8SbWNsX25ld190eXBlc2NyaXB0AB8TYnVybl9uZXdfdHlwZXNjcmlwdAAfE2Nyb29fbmV3X3R5cGVzY3JpcHQAHxNjc2l6X25ld190eXBlc2NyaXB0AB8TbWludF9uZXdfdHlwZXNjcmlwdAAfE3RpbWVfbmV3X3R5cGVzY3JpcHQAHxJyZXRfbmV3X3R5cGVzY3JpcHQAVxNiaGVpX25ld190eXBlc2NyaXB0AFcRY2JfbmV3X3R5cGVzY3JpcHQAVxNydnJ0X25ld190eXBlc2NyaXB0AFcTZmxhZ19uZXdfdHlwZXNjcmlwdABXEmptcF9uZXdfdHlwZXNjcmlwdABXEmNmZV9uZXdfdHlwZXNjcmlwdABXEmNmc19uZXdfdHlwZXNjcmlwdABXE21sZHZfbmV3X3R5cGVzY3JpcHQATRJtZXFfbmV3X3R5cGVzY3JpcHQATRJjY3BfbmV3X3R5cGVzY3JpcHQATRJsb2dfbmV3X3R5cGVzY3JpcHQATRNsb2dkX25ld190eXBlc2NyaXB0AE0Tc3J3cV9uZXdfdHlwZXNjcmlwdABNE3N3d3FfbmV3X3R5cGVzY3JpcHQATRJ0cm9fbmV3X3R5cGVzY3JpcHQATRJzbW9fbmV3X3R5cGVzY3JpcHQATRNqbmVmX25ld190eXBlc2NyaXB0AE0Td2RtZF9uZXdfdHlwZXNjcmlwdABNE3dxbWRfbmV3X3R5cGVzY3JpcHQATRN3ZGFtX25ld190eXBlc2NyaXB0AE0Td3FhbV9uZXdfdHlwZXNjcmlwdABNE3dkbW1fbmV3X3R5cGVzY3JpcHQATRN3cW1tX25ld190eXBlc2NyaXB0AE0TZWNhbF9uZXdfdHlwZXNjcmlwdABNEmFuZF9uZXdfdHlwZXNjcmlwdABPEmRpdl9uZXdfdHlwZXNjcmlwdABPEWVxX25ld190eXBlc2NyaXB0AE8SZXhwX25ld190eXBlc2NyaXB0AE8RZ3RfbmV3X3R5cGVzY3JpcHQATxFsdF9uZXdfdHlwZXNjcmlwdABPE21sb2dfbmV3X3R5cGVzY3JpcHQATxNtcm9vX25ld190eXBlc2NyaXB0AE8SbW9kX25ld190eXBlc2NyaXB0AE8SbXVsX25ld190eXBlc2NyaXB0AE8Rb3JfbmV3X3R5cGVzY3JpcHQATxJzbGxfbmV3X3R5cGVzY3JpcHQATxJzcmxfbmV3X3R5cGVzY3JpcHQATxJzdWJfbmV3X3R5cGVzY3JpcHQATxJ4b3JfbmV3X3R5cGVzY3JpcHQATxJtY3BfbmV3X3R5cGVzY3JpcHQATxJsZGNfbmV3X3R5cGVzY3JpcHQATxNzY3dxX25ld190eXBlc2NyaXB0AE8Sc3J3X25ld190eXBlc2NyaXB0AE8Sc3d3X25ld190eXBlc2NyaXB0AE8RdHJfbmV3X3R5cGVzY3JpcHQATxNlY2sxX25ld190eXBlc2NyaXB0AE8TZWNyMV9uZXdfdHlwZXNjcmlwdABPE2VkMTlfbmV3X3R5cGVzY3JpcHQATxNrMjU2X25ld190eXBlc2NyaXB0AE8TczI1Nl9uZXdfdHlwZXNjcmlwdABPEmJhbF9uZXdfdHlwZXNjcmlwdABPEmpuZV9uZXdfdHlwZXNjcmlwdABPE2FuZGlfbmV3X3R5cGVzY3JpcHQAUBNkaXZpX25ld190eXBlc2NyaXB0AFATZXhwaV9uZXdfdHlwZXNjcmlwdABQE21vZGlfbmV3X3R5cGVzY3JpcHQAUBNtdWxpX25ld190eXBlc2NyaXB0AFASb3JpX25ld190eXBlc2NyaXB0AFATc2xsaV9uZXdfdHlwZXNjcmlwdABQE3NybGlfbmV3X3R5cGVzY3JpcHQAUBNzdWJpX25ld190eXBlc2NyaXB0AFATeG9yaV9uZXdfdHlwZXNjcmlwdABQE2puZWlfbmV3X3R5cGVzY3JpcHQAUBFsYl9uZXdfdHlwZXNjcmlwdABQEWx3X25ld190eXBlc2NyaXB0AFARc2JfbmV3X3R5cGVzY3JpcHQAUBFzd19uZXdfdHlwZXNjcmlwdABQE21jcGlfbmV3X3R5cGVzY3JpcHQAUBNqbnpmX25ld190eXBlc2NyaXB0AFATam56Yl9uZXdfdHlwZXNjcmlwdABQDndxY21fZnJvbV9hcmdzACYOd3FvcF9mcm9tX2FyZ3MAJh9fX3diZ19zZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzADseX193Ymdfc2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzADseX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzADsRamlfbmV3X3R5cGVzY3JpcHQANxNjZnNpX25ld190eXBlc2NyaXB0ADcTcHNobF9uZXdfdHlwZXNjcmlwdAA3E3BzaGhfbmV3X3R5cGVzY3JpcHQANxNwb3BsX25ld190eXBlc2NyaXB0ADcTcG9waF9uZXdfdHlwZXNjcmlwdAA3E3dkbWxfbmV3X3R5cGVzY3JpcHQAwAETd3FtbF9uZXdfdHlwZXNjcmlwdADAAQ53cW1sX2Zyb21fYXJncwAeE3dxb3BfbmV3X3R5cGVzY3JpcHQAwAETd2Rkdl9uZXdfdHlwZXNjcmlwdADAARN3cWNtX25ld190eXBlc2NyaXB0AMABE3dkb3BfbmV3X3R5cGVzY3JpcHQAwAETd3Fkdl9uZXdfdHlwZXNjcmlwdADAARBfX3diZ19yZWdpZF9mcmVlANcBDndxZHZfZnJvbV9hcmdzAL8BEF9fd2JnX2ltbTI0X2ZyZWUA2QEPX193YmdfbW92aV9mcmVlALgBD19fd2JnX21sZHZfZnJlZQC4AQ9fX3diZ19mbGFnX2ZyZWUAuAEPX193YmdfZWNhbF9mcmVlALgBDl9fd2JnX2d0Zl9mcmVlALgBDl9fd2JnX3Nyd19mcmVlALgBDl9fd2JnX2Rpdl9mcmVlALgBD19fd2JnX3Njd3FfZnJlZQC4AQ5fX3diZ19leHBfZnJlZQC4AQZqbXBfcmEATg5fX3diZ19qbXBfZnJlZQC4AQ5fX3diZ19tdWxfZnJlZQC4AQ5fX3diZ19zcmxfZnJlZQC4AQ9fX3diZ19zd3dxX2ZyZWUAuAEOX193YmdfbWNwX2ZyZWUAuAENX193Ymdfc3dfZnJlZQC4AQ9fX3diZ19jZmVpX2ZyZWUAuAEPX193YmdfbG9nZF9mcmVlALgBDV9fd2JnX29yX2ZyZWUAuAEOX193YmdfbWVxX2ZyZWUAuAEPX193Ymdfd3FhbV9mcmVlALgBD19fd2JnX2puemJfZnJlZQC4AQ5fX3diZ19sZGNfZnJlZQC4AQ9fX3diZ19tY3BpX2ZyZWUAuAEPX193Ymdfam1wZl9mcmVlALgBDV9fd2JnX2xiX2ZyZWUAuAEPX193Ymdfd3FjbV9mcmVlALgBD19fd2JnX3dxb3BfZnJlZQC4AQ9fX3diZ19tcm9vX2ZyZWUAuAEPX193Ymdfd2RtbF9mcmVlALgBDV9fd2JnX3RyX2ZyZWUAuAEPX193Ymdfam5laV9mcmVlALgBD19fd2JnX2NhbGxfZnJlZQC4AQ9fX3diZ19hbmRpX2ZyZWUAuAEPX193YmdfYmhzaF9mcmVlALgBDl9fd2JnX3N3d19mcmVlALgBD19fd2JnX3N1YmlfZnJlZQC4AQ1fX3diZ19lcV9mcmVlALgBD19fd2JnX3dkbW1fZnJlZQC4AQ9fX3diZ19zbGxpX2ZyZWUAuAEOX193Ymdfam5lX2ZyZWUAuAEPX193YmdfbW92ZV9mcmVlALgBD19fd2JnX2RpdmlfZnJlZQC4AQ9fX3diZ19lY3IxX2ZyZWUAuAEKY2ZzaV9pbW0yNAAnD19fd2JnX2Nmc2lfZnJlZQC4AQ9fX3diZ19jc2l6X2ZyZWUAuAEPX193YmdfcmV0ZF9mcmVlALgBHl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X2xocwA6B2ZsYWdfcmEATg9fX3diZ19iaGVpX2ZyZWUAuAEPX193YmdfbW9kaV9mcmVlALgBDV9fd2JnX2d0X2ZyZWUAuAEfX193YmdfZ2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwA6Dl9fd2JnX2NjcF9mcmVlALgBD19fd2JnX2VjazFfZnJlZQC4AQdiaGVpX3JhAE4OX193YmdfYW5kX2ZyZWUAuAEPX193YmdfazI1Nl9mcmVlALgBD19fd2JnX2Fsb2NfZnJlZQC4AQ1fX3diZ19sdF9mcmVlALgBDl9fd2JnX3Ntb19mcmVlALgBD19fd2JnX2puemZfZnJlZQC4AQ5fX3diZ19tY2xfZnJlZQC4AQZyZXRfcmEATg5fX3diZ19yZXRfZnJlZQC4AQ9fX3diZ19taW50X2ZyZWUAuAEPX193Ymdfd2RvcF9mcmVlALgBD19fd2JnX2Nyb29fZnJlZQC4AQ5fX3diZ190cm9fZnJlZQC4AQ9fX3diZ193cW1kX2ZyZWUAuAEPX193Ymdfd3Fkdl9mcmVlALgBD19fd2JnX2V4cGlfZnJlZQC4AQ9fX3diZ19zcndxX2ZyZWUAuAEPX193Ymdfd3FtbF9mcmVlALgBD19fd2JnX3dkbWRfZnJlZQC4AQ5fX3diZ19tb2RfZnJlZQC4AQ9fX3diZ19qbnppX2ZyZWUAuAEPX193YmdfYnVybl9mcmVlALgBB3J2cnRfcmEATg9fX3diZ19ydnJ0X2ZyZWUAuAEOX193Ymdfb3JpX2ZyZWUAuAEKcHNobF9pbW0yNAAnD19fd2JnX3BzaGxfZnJlZQC4AQ9fX3diZ19hZGRpX2ZyZWUAuAEOX193YmdfeG9yX2ZyZWUAuAENX193YmdfbHdfZnJlZQC4AQpwb3BsX2ltbTI0ACcPX193YmdfcG9wbF9mcmVlALgBDV9fd2JnX3NiX2ZyZWUAuAEPX193YmdfbXVsaV9mcmVlALgBDl9fd2JnX2xvZ19mcmVlALgBCGppX2ltbTI0ACcNX193YmdfamlfZnJlZQC4AQ9fX3diZ19tbG9nX2ZyZWUAuAEPX193YmdfbWNsaV9mcmVlALgBDl9fd2JnX3N1Yl9mcmVlALgBDl9fd2JnX3NsbF9mcmVlALgBDl9fd2JnX25vdF9mcmVlALgBD19fd2JnX2puZWJfZnJlZQC4AQ9fX3diZ19zcmxpX2ZyZWUAuAEPX193YmdfczI1Nl9mcmVlALgBDl9fd2JnX2JhbF9mcmVlALgBD19fd2JnX2ptcGJfZnJlZQC4AQZjZnNfcmEATg5fX3diZ19jZnNfZnJlZQC4AQZjZmVfcmEATg5fX3diZ19jZmVfZnJlZQC4AQ9fX3diZ193ZGFtX2ZyZWUAuAENX193YmdfZ21fZnJlZQC4AQ9fX3diZ193cW1tX2ZyZWUAuAEKcG9waF9pbW0yNAAnD19fd2JnX3BvcGhfZnJlZQC4AQ9fX3diZ193ZGR2X2ZyZWUAuAEPX193YmdfdGltZV9mcmVlALgBD19fd2JnX3hvcmlfZnJlZQC4AQVjYl9yYQBODV9fd2JnX2NiX2ZyZWUAuAEPX193Ymdfam5lZl9mcmVlALgBD19fd2JnX2VkMTlfZnJlZQC4AQ9fX3diZ193ZGNtX2ZyZWUAuAEKcHNoaF9pbW0yNAAnD19fd2JnX3BzaGhfZnJlZQC4ARNqbmViX25ld190eXBlc2NyaXB0AE0Kd3Fkdl9pbW0wNgAXCndxbWxfaW1tMDYAFwp3ZG1sX2ltbTA2ABcKd3FvcF9pbW0wNgAXCndkb3BfaW1tMDYAFwp3cWNtX2ltbTA2ABcKd2Rkdl9pbW0wNgAXCndkY21faW1tMDYAFwpqbmVmX2ltbTA2ABcHbW92aV9yYQAWB21sZHZfcmQAFwdtbGR2X3JjAA8HbWxkdl9yYgALB21sZHZfcmEAFgZndGZfcmIACwZndGZfcmEAFgZzcndfcmMADwZzcndfcmIACwZzcndfcmEAFgdlY2FsX3JjAA8HZWNhbF9yYgALB2VjYWxfcmEAFgdzY3dxX3JjAA8Hc2N3cV9yYgALB3Njd3FfcmEAFgZleHBfcmMADwZleHBfcmIACwZleHBfcmEAFgZtdWxfcmMADwZtdWxfcmIACwZtdWxfcmEAFgZzcmxfcmMADwZzcmxfcmIACwZzcmxfcmEAFgdzd3dxX3JkABcHc3d3cV9yYwAPB3N3d3FfcmIACwdzd3dxX3JhABYGbWNwX3JjAA8GbWNwX3JiAAsGbWNwX3JhABYIc3dfaW1tMTIADAVzd19yYgALBXN3X3JhABYJZ3RmX2ltbTEyAAwGZGl2X3JiAAsGZGl2X3JhABYHbG9nZF9yZAAXB2xvZ2RfcmMADwdsb2dkX3JiAAsHbG9nZF9yYQAWBW9yX3JjAA8Fb3JfcmIACwVvcl9yYQAWBm1lcV9yZAAXBm1lcV9yYwAPBm1lcV9yYgALBm1lcV9yYQAWB3dxYW1fcmQAFwd3cWFtX3JjAA8Hd3FhbV9yYgALB3dxYW1fcmEAFgpqbnpiX2ltbTEyAAwHam56Yl9yYgALB2puemJfcmEAFgZsZGNfcmMADwZsZGNfcmIACwZsZGNfcmEAFgptY3BpX2ltbTEyAAwHbWNwaV9yYgALB21jcGlfcmEAFgptb3ZpX2ltbTE4AAkHam1wZl9yYQAWCGxiX2ltbTEyAAwFbGJfcmIACwVsYl9yYQAWB3dxY21fcmMADwd3cWNtX3JiAAsHd3FjbV9yYQAWB3dxb3BfcmMADwd3cW9wX3JiAAsHd3FvcF9yYQAWB21yb29fcmMADwdtcm9vX3JiAAsHbXJvb19yYQAWB3dkbWxfcmMADwd3ZG1sX3JiAAsHd2RtbF9yYQAWBXRyX3JjAA8FdHJfcmIACwV0cl9yYQAWCmpuZWlfaW1tMTIADAdqbmVpX3JiAAsHam5laV9yYQAWB2VjYWxfcmQAFwZkaXZfcmMADwdjYWxsX3JiAAsHY2FsbF9yYQAWB2NhbGxfcmMADwdhbmRpX3JiAAsHYW5kaV9yYQAWB2Joc2hfcmIACwdiaHNoX3JhABYGc3d3X3JjAA8Gc3d3X3JiAAsGc3d3X3JhABYKc3ViaV9pbW0xMgAMB3N1YmlfcmIACwdzdWJpX3JhABYFZXFfcmMADwVlcV9yYgALBWVxX3JhABYHd2RtbV9yZAAXB3dkbW1fcmMADwd3ZG1tX3JiAAsHd2RtbV9yYQAWCnNsbGlfaW1tMTIADAdzbGxpX3JiAAsHc2xsaV9yYQAWBmpuZV9yYwAPBmpuZV9yYgALBmpuZV9yYQAWB21vdmVfcmIACwdtb3ZlX3JhABYKZGl2aV9pbW0xMgAMB2RpdmlfcmIACwdkaXZpX3JhABYHZWNyMV9yYwAPB2VjcjFfcmIACwdlY3IxX3JhABYHY3Npel9yYgALB2NzaXpfcmEAFgdyZXRkX3JiAAsHcmV0ZF9yYQAWCm1vZGlfaW1tMTIADAdtb2RpX3JiAAsHbW9kaV9yYQAWBWd0X3JjAA8FZ3RfcmIACwVndF9yYQAWE19fd2JnX21hdGhhcmdzX2ZyZWUAdwZjY3BfcmQAFwZjY3BfcmMADwZjY3BfcmIACwZjY3BfcmEAFgdlY2sxX3JjAA8HZWNrMV9yYgALB2VjazFfcmEAFgdrMjU2X3JjAA8HazI1Nl9yYgALB2syNTZfcmEAFgphbmRpX2ltbTEyAAwGYW5kX3JiAAsGYW5kX3JhABYFbHRfcmMADwVsdF9yYgALBWx0X3JhABYGc21vX3JkABcGc21vX3JjAA8Gc21vX3JiAAsGc21vX3JhABYKam56Zl9pbW0xMgAMB2puemZfcmIACwdqbnpmX3JhABYGbWNsX3JiAAsGbWNsX3JhABYHbWludF9yYgALB21pbnRfcmEAFgd3ZG9wX3JjAA8Hd2RvcF9yYgALB3dkb3BfcmEAFgdjcm9vX3JiAAsHY3Jvb19yYQAWBnRyb19yZAAXBnRyb19yYwAPBnRyb19yYgALBnRyb19yYQAWB3dxbWRfcmQAFwd3cW1kX3JjAA8Hd3FtZF9yYgALB3dxbWRfcmEAFgd3cWR2X3JjAA8Hd3Fkdl9yYgALB3dxZHZfcmEAFgpleHBpX2ltbTEyAAwHZXhwaV9yYgALB2V4cGlfcmEAFgdzcndxX3JkABcHc3J3cV9yYwAPB3Nyd3FfcmIACwdzcndxX3JhABYHd3FtbF9yYwAPB3dxbWxfcmIACwd3cW1sX3JhABYHd2RtZF9yZAAXB3dkbWRfcmMADwd3ZG1kX3JiAAsHd2RtZF9yYQAWBm1vZF9yYwAPBm1vZF9yYgALBm1vZF9yYQAWCmpuemlfaW1tMTgACQdqbnppX3JhABYHYnVybl9yYgALB2J1cm5fcmEAFglvcmlfaW1tMTIADAZvcmlfcmIACwZvcmlfcmEAFgZhbmRfcmMADwdhZGRpX3JiAAsHYWRkaV9yYQAWBnhvcl9yYwAPBnhvcl9yYgALBnhvcl9yYQAWCGx3X2ltbTEyAAwFbHdfcmIACwVsd19yYQAWCHNiX2ltbTEyAAwFc2JfcmIACwVzYl9yYQAWCm11bGlfaW1tMTIADAdtdWxpX3JiAAsHbXVsaV9yYQAWBmxvZ19yZAAXBmxvZ19yYwAPBmxvZ19yYgALBmxvZ19yYQAWB21sb2dfcmMADwdtbG9nX3JiAAsHbWxvZ19yYQAWCm1jbGlfaW1tMTgACQdtY2xpX3JhABYGc3ViX3JjAA8Gc3ViX3JiAAsGc3ViX3JhABYGc2xsX3JjAA8Gc2xsX3JiAAsGc2xsX3JhABYGbm90X3JiAAsGbm90X3JhABYHam5lYl9yYwAPB2puZWJfcmIACwdqbmViX3JhABYKc3JsaV9pbW0xMgAMB3NybGlfcmIACwdzcmxpX3JhABYHczI1Nl9yYwAPB3MyNTZfcmIACwdzMjU2X3JhABYGYmFsX3JjAA8GYmFsX3JiAAsGYmFsX3JhABYKam1wZl9pbW0xOAAJB2ptcGJfcmEAFgd3ZGFtX3JkABcHd2RhbV9yYwAPB3dkYW1fcmIACwd3ZGFtX3JhABYKam1wYl9pbW0xOAAJBWdtX3JhABYHd3FtbV9yZAAXB3dxbW1fcmMADwd3cW1tX3JiAAsHd3FtbV9yYQAWB3dkZHZfcmMADwd3ZGR2X3JiAAsHd2Rkdl9yYQAWB3RpbWVfcmIACwd0aW1lX3JhABYKeG9yaV9pbW0xMgAMB3hvcmlfcmIACwd4b3JpX3JhABYHam5lZl9yYwAPB2puZWZfcmIACwdqbmVmX3JhABYHZWQxOV9yYwAPB2VkMTlfcmIACwdlZDE5X3JhABYHd2RjbV9yYwAPB3dkY21fcmIACwd3ZGNtX3JhABYbX193YmdfcGFuaWNpbnN0cnVjdGlvbl9mcmVlALgBH19fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIAzAETX193YmluZGdlbl9leHBvcnRfMADLAQkRAQBBAQsGAs8B0AHRAe0BygEK0IEB+QGJIwIIfwF+AkACQAJAAkACQAJAAkACQCAAQfUBTwRAIABBzf97Tw0FIABBC2oiAEF4cSEFQfiMwAAoAgAiCEUNBEEAIAVrIQQCf0EAIAVBgAJJDQAaQR8gBUH///8HSw0AGiAFQQYgAEEIdmciAGt2QQFxIABBAXRrQT5qCyIHQQJ0QdyJwABqKAIAIgFFBEBBACEADAILQQAhACAFQRkgB0EBdmtBACAHQR9HG3QhAwNAAkAgASgCBEF4cSIGIAVJDQAgBiAFayIGIARPDQAgASECIAYiBA0AQQAhBCABIQAMBAsgAUEUaigCACIGIAAgBiABIANBHXZBBHFqQRBqKAIAIgFHGyAAIAYbIQAgA0EBdCEDIAENAAsMAQtB9IzAACgCACICQRAgAEELakF4cSAAQQtJGyIFQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAUEDdCIAQeyKwABqIgMgAEH0isAAaigCACIAKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiABd3E2AgALIAAgAUEDdCIBQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAgLIAVB/IzAACgCAE0NAwJAAkAgAUUEQEH4jMAAKAIAIgBFDQYgAGhBAnRB3InAAGooAgAiASgCBEF4cSAFayEEIAEhAgNAAkAgASgCECIADQAgAUEUaigCACIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACQRRqIgAoAgAiAxtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAAgAkEQaiADGyEDA0AgAyEGIAEiAEEUaiIBIABBEGogASgCACIBGyEDIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNBCACIAIoAhxBAnRB3InAAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0FDAQLIAEgADYCACAADQNB+IzAAEH4jMAAKAIAQX4gAigCHHdxNgIADAQLIAAoAgRBeHEgBWsiASAEIAEgBEkiARshBCAAIAIgARshAiAAIQEMAAsACwJAQQIgAHQiA0EAIANrciABIAB0cWgiAEEDdCIBQeyKwABqIgMgAUH0isAAaigCACIBKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiAAd3E2AgALIAEgBUEDcjYCBCABIAVqIgYgAEEDdCIAIAVrIgRBAXI2AgQgACABaiAENgIAQfyMwAAoAgAiAgRAIAJBeHFB7IrAAGohAEGEjcAAKAIAIQMCf0H0jMAAKAIAIgVBASACQQN2dCICcUUEQEH0jMAAIAIgBXI2AgAgAAwBCyAAKAIICyECIAAgAzYCCCACIAM2AgwgAyAANgIMIAMgAjYCCAtBhI3AACAGNgIAQfyMwAAgBDYCACABQQhqDwsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAJBFGooAgAiAUUNACAAQRRqIAE2AgAgASAANgIYCwJAAkAgBEEQTwRAIAIgBUEDcjYCBCACIAVqIgUgBEEBcjYCBCAEIAVqIAQ2AgBB/IzAACgCACIDRQ0BIANBeHFB7IrAAGohAEGEjcAAKAIAIQECf0H0jMAAKAIAIgZBASADQQN2dCIDcUUEQEH0jMAAIAMgBnI2AgAgAAwBCyAAKAIICyEDIAAgATYCCCADIAE2AgwgASAANgIMIAEgAzYCCAwBCyACIAQgBWoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBC0GEjcAAIAU2AgBB/IzAACAENgIACyACQQhqDwsgACACckUEQEEAIQJBAiAHdCIAQQAgAGtyIAhxIgBFDQMgAGhBAnRB3InAAGooAgAhAAsgAEUNAQsDQCAAIAIgACgCBEF4cSIDIAVrIgYgBEkiBxshCCAAKAIQIgFFBEAgAEEUaigCACEBCyACIAggAyAFSSIAGyECIAQgBiAEIAcbIAAbIQQgASIADQALCyACRQ0AIAVB/IzAACgCACIATSAEIAAgBWtPcQ0AIAIoAhghBwJAAkAgAiACKAIMIgBGBEAgAkEUQRAgAkEUaiIAKAIAIgMbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyAAIAJBEGogAxshAwNAIAMhBiABIgBBFGoiASAAQRBqIAEoAgAiARshAyAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQMgAiACKAIcQQJ0QdyJwABqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNBAwDCyABIAA2AgAgAA0CQfiMwABB+IzAACgCAEF+IAIoAhx3cTYCAAwDCwJAAkACQAJAAkAgBUH8jMAAKAIAIgFLBEAgBUGAjcAAKAIAIgBPBEBBACEEIAVBr4AEaiIAQRB2QAAiAUF/RiIDDQcgAUEQdCICRQ0HQYyNwABBACAAQYCAfHEgAxsiBEGMjcAAKAIAaiIANgIAQZCNwABBkI3AACgCACIBIAAgACABSRs2AgACQAJAQYiNwAAoAgAiAwRAQdyKwAAhAANAIAAoAgAiASAAKAIEIgZqIAJGDQIgACgCCCIADQALDAILQZiNwAAoAgAiAEEAIAAgAk0bRQRAQZiNwAAgAjYCAAtBnI3AAEH/HzYCAEHgisAAIAQ2AgBB3IrAACACNgIAQfiKwABB7IrAADYCAEGAi8AAQfSKwAA2AgBB9IrAAEHsisAANgIAQYiLwABB/IrAADYCAEH8isAAQfSKwAA2AgBBkIvAAEGEi8AANgIAQYSLwABB/IrAADYCAEGYi8AAQYyLwAA2AgBBjIvAAEGEi8AANgIAQaCLwABBlIvAADYCAEGUi8AAQYyLwAA2AgBBqIvAAEGci8AANgIAQZyLwABBlIvAADYCAEGwi8AAQaSLwAA2AgBBpIvAAEGci8AANgIAQeiKwABBADYCAEG4i8AAQayLwAA2AgBBrIvAAEGki8AANgIAQbSLwABBrIvAADYCAEHAi8AAQbSLwAA2AgBBvIvAAEG0i8AANgIAQciLwABBvIvAADYCAEHEi8AAQbyLwAA2AgBB0IvAAEHEi8AANgIAQcyLwABBxIvAADYCAEHYi8AAQcyLwAA2AgBB1IvAAEHMi8AANgIAQeCLwABB1IvAADYCAEHci8AAQdSLwAA2AgBB6IvAAEHci8AANgIAQeSLwABB3IvAADYCAEHwi8AAQeSLwAA2AgBB7IvAAEHki8AANgIAQfiLwABB7IvAADYCAEGAjMAAQfSLwAA2AgBB9IvAAEHsi8AANgIAQYiMwABB/IvAADYCAEH8i8AAQfSLwAA2AgBBkIzAAEGEjMAANgIAQYSMwABB/IvAADYCAEGYjMAAQYyMwAA2AgBBjIzAAEGEjMAANgIAQaCMwABBlIzAADYCAEGUjMAAQYyMwAA2AgBBqIzAAEGcjMAANgIAQZyMwABBlIzAADYCAEGwjMAAQaSMwAA2AgBBpIzAAEGcjMAANgIAQbiMwABBrIzAADYCAEGsjMAAQaSMwAA2AgBBwIzAAEG0jMAANgIAQbSMwABBrIzAADYCAEHIjMAAQbyMwAA2AgBBvIzAAEG0jMAANgIAQdCMwABBxIzAADYCAEHEjMAAQbyMwAA2AgBB2IzAAEHMjMAANgIAQcyMwABBxIzAADYCAEHgjMAAQdSMwAA2AgBB1IzAAEHMjMAANgIAQeiMwABB3IzAADYCAEHcjMAAQdSMwAA2AgBB8IzAAEHkjMAANgIAQeSMwABB3IzAADYCAEGIjcAAIAI2AgBB7IzAAEHkjMAANgIAQYCNwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBlI3AAEGAgIABNgIADAgLIAIgA00gASADS3INACAAKAIMRQ0DC0GYjcAAQZiNwAAoAgAiACACIAAgAkkbNgIAIAIgBGohAUHcisAAIQACQAJAA0AgASAAKAIARwRAIAAoAggiAA0BDAILCyAAKAIMRQ0BC0HcisAAIQADQAJAIAMgACgCACIBTwRAIAEgACgCBGoiBiADSw0BCyAAKAIIIQAMAQsLQYiNwAAgAjYCAEGAjcAAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQZSNwABBgICAATYCACADIAZBIGtBeHFBCGsiACAAIANBEGpJGyIBQRs2AgRB3IrAACkCACEJIAFBEGpB5IrAACkCADcCACABIAk3AghB4IrAACAENgIAQdyKwAAgAjYCAEHkisAAIAFBCGo2AgBB6IrAAEEANgIAIAFBHGohAANAIABBBzYCACAAQQRqIgAgBkkNAAsgASADRg0HIAEgASgCBEF+cTYCBCADIAEgA2siAEEBcjYCBCABIAA2AgAgAEGAAk8EQCADIAAQCAwICyAAQXhxQeyKwABqIQECf0H0jMAAKAIAIgJBASAAQQN2dCIAcUUEQEH0jMAAIAAgAnI2AgAgAQwBCyABKAIICyEAIAEgAzYCCCAAIAM2AgwgAyABNgIMIAMgADYCCAwHCyAAIAI2AgAgACAAKAIEIARqNgIEIAIgBUEDcjYCBCABIAIgBWoiA2shBSABQYiNwAAoAgBGDQMgAUGEjcAAKAIARg0EIAEoAgQiBEEDcUEBRgRAIAEgBEF4cSIAEAcgACAFaiEFIAAgAWoiASgCBCEECyABIARBfnE2AgQgAyAFQQFyNgIEIAMgBWogBTYCACAFQYACTwRAIAMgBRAIDAYLIAVBeHFB7IrAAGohAAJ/QfSMwAAoAgAiAUEBIAVBA3Z0IgRxRQRAQfSMwAAgASAEcjYCACAADAELIAAoAggLIQUgACADNgIIIAUgAzYCDCADIAA2AgwgAyAFNgIIDAULQYCNwAAgACAFayIBNgIAQYiNwABBiI3AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBCAAQQhqIQQMBgtBhI3AACgCACEAAkAgASAFayICQQ9NBEBBhI3AAEEANgIAQfyMwABBADYCACAAIAFBA3I2AgQgACABaiIBIAEoAgRBAXI2AgQMAQtB/IzAACACNgIAQYSNwAAgACAFaiIDNgIAIAMgAkEBcjYCBCAAIAFqIAI2AgAgACAFQQNyNgIECwwICyAAIAQgBmo2AgRBiI3AAEGIjcAAKAIAIgBBD2pBeHEiAUEIayICNgIAQYCNwABBgI3AACgCACAEaiIDIAAgAWtqQQhqIgE2AgAgAiABQQFyNgIEIAAgA2pBKDYCBEGUjcAAQYCAgAE2AgAMAwtBiI3AACADNgIAQYCNwABBgI3AACgCACAFaiIANgIAIAMgAEEBcjYCBAwBC0GEjcAAIAM2AgBB/IzAAEH8jMAAKAIAIAVqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAAsgAkEIag8LQQAhBEGAjcAAKAIAIgAgBU0NAEGAjcAAIAAgBWsiATYCAEGIjcAAQYiNwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQMAwsgBA8LIAAgBzYCGCACKAIQIgEEQCAAIAE2AhAgASAANgIYCyACQRRqKAIAIgFFDQAgAEEUaiABNgIAIAEgADYCGAsCQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiASAEQQFyNgIEIAEgBGogBDYCACAEQYACTwRAIAEgBBAIDAILIARBeHFB7IrAAGohAAJ/QfSMwAAoAgAiA0EBIARBA3Z0IgRxRQRAQfSMwAAgAyAEcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIECyACQQhqDwsgAEEIagvtCwELfyAAKAIEIQcgACgCACEFAkACQAJAIAEoAgAiCiABKAIIIgByBEACQCAARQ0AIAUgB2ohCSABQQxqKAIAQQFqIQYgBSECA0ACQCACIQAgBkEBayIGRQ0AIAAgCUYNAgJ/IAAsAAAiBEEATgRAIARB/wFxIQQgAEEBagwBCyAALQABQT9xIQggBEEfcSECIARBX00EQCACQQZ0IAhyIQQgAEECagwBCyAALQACQT9xIAhBBnRyIQggBEFwSQRAIAggAkEMdHIhBCAAQQNqDAELIAJBEnRBgIDwAHEgAC0AA0E/cSAIQQZ0cnIiBEGAgMQARg0DIABBBGoLIgIgAyAAa2ohAyAEQYCAxABHDQEMAgsLIAAgCUYNACAALAAAIgJBAE4gAkFgSXIgAkFwSXJFBEAgAkH/AXFBEnRBgIDwAHEgAC0AA0E/cSAALQACQT9xQQZ0IAAtAAFBP3FBDHRycnJBgIDEAEYNAQsCQAJAIANFDQAgAyAHTwRAQQAhACADIAdGDQEMAgtBACEAIAMgBWosAABBQEgNAQsgBSEACyADIAcgABshByAAIAUgABshBQsgCkUNAyABKAIEIQsgB0EQTwRAIAcgBSAFQQNqQXxxIgRrIgZqIgpBA3EhCEEAIQlBACEAIAQgBUcEQCAEIAVBf3NqQQNPBEBBACEDA0AgACADIAVqIgIsAABBv39KaiACQQFqLAAAQb9/SmogAkECaiwAAEG/f0pqIAJBA2osAABBv39KaiEAIANBBGoiAw0ACwsgBSECA0AgACACLAAAQb9/SmohACACQQFqIQIgBkEBaiIGDQALCwJAIAhFDQAgBCAKQXxxaiICLAAAQb9/SiEJIAhBAUYNACAJIAIsAAFBv39KaiEJIAhBAkYNACAJIAIsAAJBv39KaiEJCyAKQQJ2IQggACAJaiEDA0AgBCEGIAhFDQRBwAEgCCAIQcABTxsiCUEDcSEKIAlBAnQhBEEAIQIgCUEETwRAIAYgBEHwB3FqIQwgBiEAA0AgAiAAKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIABBBGooAgAiAkF/c0EHdiACQQZ2ckGBgoQIcWogAEEIaigCACICQX9zQQd2IAJBBnZyQYGChAhxaiAAQQxqKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIQIgAEEQaiIAIAxHDQALCyAIIAlrIQggBCAGaiEEIAJBCHZB/4H8B3EgAkH/gfwHcWpBgYAEbEEQdiADaiEDIApFDQALIAYgCUH8AXFBAnRqIgIoAgAiAEF/c0EHdiAAQQZ2ckGBgoQIcSEAIApBAUYNAiAAIAIoAgQiAEF/c0EHdiAAQQZ2ckGBgoQIcWohACAKQQJGDQIgACACKAIIIgBBf3NBB3YgAEEGdnJBgYKECHFqIQAMAgsgB0UEQEEAIQMMAwsgB0EDcSECAkAgB0EESQRAQQAhA0EAIQYMAQtBACEDIAUhACAHQXxxIgYhBANAIAMgACwAAEG/f0pqIABBAWosAABBv39KaiAAQQJqLAAAQb9/SmogAEEDaiwAAEG/f0pqIQMgAEEEaiEAIARBBGsiBA0ACwsgAkUNAiAFIAZqIQADQCADIAAsAABBv39KaiEDIABBAWohACACQQFrIgINAAsMAgsMAgsgAEEIdkH/gRxxIABB/4H8B3FqQYGABGxBEHYgA2ohAwsCQCADIAtJBEAgCyADayEDQQAhAAJAAkACQCABLQAgQQFrDgIAAQILIAMhAEEAIQMMAQsgA0EBdiEAIANBAWpBAXYhAwsgAEEBaiEAIAFBGGooAgAhAiABKAIQIQYgASgCFCEBA0AgAEEBayIARQ0CIAEgBiACKAIQEQMARQ0AC0EBDwsMAQtBASEAIAEgBSAHIAIoAgwRAAAEf0EBBUEAIQACfwNAIAMgACADRg0BGiAAQQFqIQAgASAGIAIoAhARAwBFDQALIABBAWsLIANJCw8LIAEoAhQgBSAHIAFBGGooAgAoAgwRAAALpgYCDX8BfiMAQTBrIgckAEEnIQICQCAAQpDOAFQEQCAAIQ8MAQsDQCAHQQlqIAJqIgZBBGsgAEKQzgCAIg9C8LEDfiAAfKciBEH//wNxQeQAbiIDQQF0QciGwABqLwAAOwAAIAZBAmsgA0Gcf2wgBGpB//8DcUEBdEHIhsAAai8AADsAACACQQRrIQIgAEL/wdcvViAPIQANAAsLIA+nIgRB4wBLBEAgAkECayICIAdBCWpqIA+nIgNB//8DcUHkAG4iBEGcf2wgA2pB//8DcUEBdEHIhsAAai8AADsAAAsCQCAEQQpPBEAgAkECayICIAdBCWpqIARBAXRByIbAAGovAAA7AAAMAQsgAkEBayICIAdBCWpqIARBMGo6AAALQScgAmshCEEBIQVBK0GAgMQAIAEoAhwiBEEBcSIMGyEJIARBHXRBH3VB6IjAAHEhCiAHQQlqIAJqIQsCQCABKAIARQRAIAEoAhQiAyABKAIYIgEgCSAKEEcNASADIAsgCCABKAIMEQAAIQUMAQsgASgCBCINIAggDGoiA00EQCABKAIUIgMgASgCGCIBIAkgChBHDQEgAyALIAggASgCDBEAACEFDAELIARBCHEEQCABKAIQIQQgAUEwNgIQIAEtACAhAyABQQE6ACAgASgCFCIOIAEoAhgiBiAJIAoQRw0BIAIgDWogDGtBJmshAgNAIAJBAWsiAgRAIA5BMCAGKAIQEQMARQ0BDAMLCyAOIAsgCCAGKAIMEQAADQEgASADOgAgIAEgBDYCEEEAIQUMAQsgDSADayEDAkACQAJAIAEtACAiAkEBaw4DAAEAAgsgAyECQQAhAwwBCyADQQF2IQIgA0EBakEBdiEDCyACQQFqIQIgAUEYaigCACEGIAEoAhAhBCABKAIUIQECQANAIAJBAWsiAkUNASABIAQgBigCEBEDAEUNAAsMAQsgASAGIAkgChBHDQAgASALIAggBigCDBEAAA0AQQAhAgNAIAIgA0YEQEEAIQUMAgsgAkEBaiECIAEgBCAGKAIQEQMARQ0ACyACQQFrIANJIQULIAdBMGokACAFC/wFAQV/IABBCGsiASAAQQRrKAIAIgNBeHEiAGohAgJAAkACQAJAIANBAXENACADQQNxRQ0BIAEoAgAiAyAAaiEAIAEgA2siAUGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAA2AgAgAiACKAIEQX5xNgIEIAEgAEEBcjYCBCACIAA2AgAPCyABIAMQBwsCQAJAIAIoAgQiA0ECcUUEQCACQYiNwAAoAgBGDQIgAkGEjcAAKAIARg0FIAIgA0F4cSICEAcgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFBhI3AACgCAEcNAUH8jMAAIAA2AgAPCyACIANBfnE2AgQgASAAQQFyNgIEIAAgAWogADYCAAsgAEGAAkkNAiABIAAQCEEAIQFBnI3AAEGcjcAAKAIAQQFrIgA2AgAgAA0BQeSKwAAoAgAiAARAA0AgAUEBaiEBIAAoAggiAA0ACwtBnI3AAEH/HyABIAFB/x9NGzYCAA8LQYiNwAAgATYCAEGAjcAAQYCNwAAoAgAgAGoiADYCACABIABBAXI2AgRBhI3AACgCACABRgRAQfyMwABBADYCAEGEjcAAQQA2AgALIABBlI3AACgCACIDTQ0AQYiNwAAoAgAiAkUNAEEAIQECQEGAjcAAKAIAIgRBKUkNAEHcisAAIQADQCACIAAoAgAiBU8EQCAFIAAoAgRqIAJLDQILIAAoAggiAA0ACwtB5IrAACgCACIABEADQCABQQFqIQEgACgCCCIADQALC0GcjcAAQf8fIAEgAUH/H00bNgIAIAMgBE8NAEGUjcAAQX82AgALDwsgAEF4cUHsisAAaiECAn9B9IzAACgCACIDQQEgAEEDdnQiAHFFBEBB9IzAACAAIANyNgIAIAIMAQsgAigCCAshACACIAE2AgggACABNgIMIAEgAjYCDCABIAA2AggPC0GEjcAAIAE2AgBB/IzAAEH8jMAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAv7BAEBfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQYAEaw4mAQIDBAUGBwgsCQoLDA0sLCwsLCwsLCwsLCwsLCwsLCwODywsLBAAC0EBIQECQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABBAWsODkEBAgMEBQZCBwgJCgsMAAsCQCAAQcAEaw4MJygpKissLS4vMDEyAAsCQCAAQYECaw4KDQ4PEBESExQVFgALAkAgAEGABmsOCTM0NTY3QkI4OQALAkAgAEGACmsOBTw9Pj9AAAsgAEGACGsOAjk6QQtBAg8LQQMPC0EEDwtBBQ8LQQYPC0EHDwtBCQ8LQQoPC0ELDwtBDA8LQQ0PC0EODwtBgQIPC0GCAg8LQYMCDwtBhAIPC0GFAg8LQYYCDwtBhwIPC0GIAg8LQYkCDwtBigIPC0GABA8LQYEEDwtBggQPC0GDBA8LQYQEDwtBhQQPC0GGBA8LQYcEDwtBiQQPC0GKBA8LQYsEDwtBjAQPC0GNBA8LQaAEDwtBoQQPC0GlBA8LQcAEDwtBwQQPC0HCBA8LQcMEDwtBxAQPC0HFBA8LQcYEDwtBxwQPC0HIBA8LQckEDwtBygQPC0HLBA8LQYAGDwtBgQYPC0GCBg8LQYMGDwtBhAYPC0GHBg8LQYgGDwtBgAgPC0GBCA8LQYAKDwtBgQoPC0GCCg8LQYMKDwtBhAohAQsgAQ8LQeCCwABBGRDSAQAL+AMBAn8gACABaiECAkACQCAAKAIEIgNBAXENACADQQNxRQ0BIAAoAgAiAyABaiEBIAAgA2siAEGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAE2AgAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCACIAE2AgAPCyAAIAMQBwsCQAJAAkAgAigCBCIDQQJxRQRAIAJBiI3AACgCAEYNAiACQYSNwAAoAgBGDQMgAiADQXhxIgIQByAAIAEgAmoiAUEBcjYCBCAAIAFqIAE2AgAgAEGEjcAAKAIARw0BQfyMwAAgATYCAA8LIAIgA0F+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACyABQYACTwRAIAAgARAIDAMLIAFBeHFB7IrAAGohAgJ/QfSMwAAoAgAiA0EBIAFBA3Z0IgFxRQRAQfSMwAAgASADcjYCACACDAELIAIoAggLIQEgAiAANgIIIAEgADYCDCAAIAI2AgwgACABNgIIDwtBiI3AACAANgIAQYCNwABBgI3AACgCACABaiIBNgIAIAAgAUEBcjYCBCAAQYSNwAAoAgBHDQFB/IzAAEEANgIAQYSNwABBADYCAA8LQYSNwAAgADYCAEH8jMAAQfyMwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgACABaiABNgIACwv7AgEEfyAAKAIMIQICQAJAIAFBgAJPBEAgACgCGCEDAkACQCAAIAJGBEAgAEEUQRAgAEEUaiICKAIAIgQbaigCACIBDQFBACECDAILIAAoAggiASACNgIMIAIgATYCCAwBCyACIABBEGogBBshBANAIAQhBSABIgJBFGoiASACQRBqIAEoAgAiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QdyJwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQfiMwABB+IzAACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB9IzAAEH0jMAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIABBFGooAgAiAEUNACACQRRqIAA2AgAgACACNgIYCwusAgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QdyJwABqIQQCQEH4jMAAKAIAIgVBASACdCIDcUUEQEH4jMAAIAMgBXI2AgAgBCAANgIAIAAgBDYCGAwBCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEEA0AgAyAEQR12QQRxakEQaiIFKAIAIgJFDQIgBEEBdCEEIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAFIAA2AgAgACADNgIYCyAAIAA2AgwgACAANgIIC2kBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYD+A3EgAEEYdnJyELsBIAFBEGokAAt5AQN/IAEQxAECQCABKAIAIgJBf0cEQCABIAJBAWo2AgAgASgCBCgAACIDQRh0QRZ1QfyCwABqKAIAIQRBAUEEEMcBIgJFDQEgAiAEIANBgH5xcjYAACABIAEoAgBBAWs2AgAgAEEENgIEIAAgAjYCAA8LEM4BAAsAC2YBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYDgA3FyQQx2ELwBIAFBEGokAAtuAQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggiAC8AACAAQQJqLQAAQRB0chDVASEAIAEoAgwiAiACKAIAQQFrNgIAQQhBBBC6ASICIABBCHZBgB5xIABBGHZyOwEEIAJBADYCACABQRBqJAAgAgttAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQRxqQgE3AgAgAUECNgIUIAFB9IDAADYCECABQQI2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQSQALIAFBMGokACAAC24BAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQRxqQgE3AgAgAUECNgIUIAFBuIHAADYCECABQQM2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQSQALIAFBMGokACAAC10BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQR52IABBDnZBPHFyELwBIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ8gELFgAgAEHQgsAAQcCCwABBgICACBDyAQtMACADQf8BcSABQf8BcUEMdCAAQf8BcUESdHIiACACQf8BcUEGdHJyIgFBEHRBgID8B3EgAEEIdkGA/gNxIAFBgP4DcUEIdHJBCHZyC1UCAX8BfiMAQRBrIgIkACABEMQBIAJBCGogARBUIAIoAgxBADYCACABKQIAIQMgARAEIAAgA0IoiKdBAXE6AAEgACADQiCIp0EBcToAACACQRBqJAALEAAgACABIAIgA0HiABD0AQsQACAAIAEgAiADQeMAEPQBC08BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDIARC8ASABQRBqJAALVQEDfyMAQRBrIgEkACABQQhqIAAQSiABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENUBQRh2QT9xELwBIAFBEGokAAtSAQF/IAAQUSECIAEQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgACACQf8BcUESdHIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyrUIghjcCACABCxAAIAAgASACIANB3gAQ9QELEAAgACABIAIgA0HfABD1AQsQACAAIAEgAiADQeAAEPUBCxAAIAAgASACIANB4QAQ9QELUQIBfwF+IwBBEGsiAiQAIAEQxAEgAkEIaiABEFQgAigCDEEANgIAIAEpAgAhAyABEAQgACADQiiIPAABIAAgA0IgiKdBAXE6AAAgAkEQaiQACz4BAX8jAEEQayIEJAAgABBRIAEQUSACEFEgBEEIaiADEBMgBC0ACEEBcSAELQAJQQFxEHoQrAEgBEEQaiQAC0kBAX8gABBRIQAgARBRIQFBCEEEELoBIgIgAUH/AXFBDHQgAEESdHIiAEGA4ANxQQh0IABBCHZBgP4DcXJBCHatQiCGNwIAIAILDAAgACABQcsAEPYBCwwAIAAgAUHMABD2AQsMACAAIAFBzQAQ9gELDAAgACABQc4AEPYBCwwAIAAgAUHPABD2AQsMACAAIAFB0AAQ9gELPAEBfyMAQRBrIgQkACAAEFEgARBRIAIQUSAEQQhqIAMQHSAELQAIQQFxIAQtAAkQvgEQrAEgBEEQaiQAC0gAIAAQxAEgACgCAEF/RgRAEM4BAAsgAC8ABCAAQQZqLQAAQRB0chDVASIAQYD+A3FBCHQgAEEIdkGA/gNxIABBGHZychC7AQsLACAAIAFBBxD3AQs/AQJ/AkAgABBRIgBBGHENACAAQQdxIgJBB0YNAEEIQQQQugEiASAAQQV2QQFxrUIghiACrUIohoQ3AgALIAELCwAgACABQQgQ9wELPwAgAkEWdEGAgIAGcSABQf8BcUEMdCIBIAJB/AFxQQZ0ckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCwsAIAAgAUEKEPgBCwsAIAAgAUEMEPgBCwsAIAAgAUEUEPgBCwsAIAAgAUEWEPgBCwsAIAAgAUEZEPgBCwsAIAAgAUEbEPgBCwsAIAAgAUEeEPgBCwsAIAAgAUEfEPgBCwsAIAAgAUEkEPgBCwsAIAAgAUEyEPgBCz8AIAAQUSEAIAEQUyIBQRB0QYCA/AdxIABB/wFxQRJ0IAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2chCsAQtAAQF/IAAQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyrUIghjcCACABCzgAIAJBEHRBgID8B3EgAUH/AXFBDHQiASACckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCzwBAn8jAEEQayIBJAAgABDEASABQQhqIAAQSyABKAIILQABIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAs8AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEEsgASgCCC0AACABKAIMIgIgAigCAEEBazYCACABQRBqJAALOQEBfyMAQRBrIgIkACAAEMQBIAJBCGogABBUIAIoAgwgAigCCCABQQBHOgAAQQA2AgAgAkEQaiQACzkBAX8jAEEQayICJAAgABDEASACQQhqIAAQVCACKAIMIAIoAgggAUEARzoAAUEANgIAIAJBEGokAAs4AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEFQgASgCDEEANgIAIAAtAAQgABAEIAFBEGokAEEBcQs3AQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggtAAQgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzcBAn8jAEEQayIBJAAgAUEIaiAAEEogASgCCCgCACABKAIMIgIgAigCAEEBazYCACABQRBqJAALCgAgAEHVABD5AQsKACAAQdYAEPkBCwoAIABB1wAQ+QELCgAgAEHaABD5AQsKACAAQdsAEPkBCwoAIABB3AAQ+QELCgAgAEHdABD5AQs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAwANARoLIAMNAUEACw8LIAAgA0EAIAEoAgwRAAALMQEBfyMAQRBrIgEkACABQQhqIAAQHSABLQAJIAEtAAhBBXRBIHFyELwBIAFBEGokAAuhAgEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQbiGwAA2AhAgAkHoiMAANgIMIAJBDGoiACgCCCIBRQRAIwBBIGsiACQAIABBDGpCADcCACAAQQE2AgQgAEHoiMAANgIIIABBKzYCHCAAQZCIwAA2AhggACAAQRhqNgIAIABB2IjAABBJAAsgAUEMaigCACECAkACQCABKAIEDgIAAAELIAINAAsgAC0AECEBIAAtABEaQdiJwABB2InAACgCACIAQQFqNgIAAkAgAEEASA0AQaSNwAAtAABBAXENAEGkjcAAQQE6AABBoI3AAEGgjcAAKAIAQQFqNgIAQdSJwAAoAgBBAEgNAEGkjcAAQQA6AAAgAUUNAAALAAs1AQF/IAEQxAEgASgCACICQX9GBEAQzgEACyABIAJBAWo2AgAgACABNgIEIAAgAUEEajYCAAsxAQF/IAEoAgAiAkF/RwRAIAEgAkEBajYCACAAIAE2AgQgACABQQRqNgIADwsQzgEACzUBAX8gAEE2TwRAQeCCwABBGRDSAQALQQxBBBC6ASICIAA6AAggAiABNgIEIAJBADYCACACCzAAIAAQUSABEFEgAhBRIAMQURASIQBBCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQstACAAEMQBIAAoAgBBf0YEQBDOAQALIAAvAAQgAEEGai0AAEEQdHIQyAEQvAELLAAgABBRIAEQUSACEFEQKyEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELLAAgABBRIAEQUSACEFIQOCEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELJQEBfwJAIAAEQCAAKAIADQEgAC0ABCAAEAQPCxDNAQALEM4BAAslAQF/AkAgAARAIAAoAgANASAALwEEIAAQBA8LEM0BAAsQzgEACyUBAX8CQCAABEAgACgCAA0BIAAoAgQgABAEDwsQzQEACxDOAQALKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LEM4BAAspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeQAchDFARC7AQspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeUAchDFARC7AQslAQF/IAAQUSEAQQhBBBC6ASIBIABBAnRB/AFxrUIghjcCACABCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ0gEACyABAX8gABDEASAAKAIABEAQzgEACyAAKAIEIAAQBBAECyMAIAIQBSECIAAQvQEgARC9ASACEDhBCHRBygByEMUBELsBCx4AAkAgAARAIAAoAgANASAAEAQPCxDNAQALEM4BAAsPACAAIAEgAiADQRIQ7gELDwAgACABIAIgA0EYEO4BCw8AIAAgASACIANBHBDuAQsPACAAIAEgAiADQR0Q7gELDwAgACABIAIgA0EiEO4BCw8AIAAgASACIANBIxDuAQsPACAAIAEgAiADQSgQ7gELDwAgACABIAIgA0EqEO4BCw8AIAAgASACIANBLBDuAQsPACAAIAEgAiADQTgQ7gELEAAgACABIAIgA0HTABDvAQsQACAAIAEgAiADQdQAEO8BCxAAIAAgASACIANB3gAQ7wELEAAgACABIAIgA0HfABDvAQsQACAAIAEgAiADQeAAEO8BCxAAIAAgASACIANB4QAQ7wELEAAgACABIAIgA0HiABDvAQsQACAAIAEgAiADQeMAEO8BCxAAIAAgASACIANB5AAQ7wELEAAgACABIAIgA0HlABDvAQsQACAAIAEgAiADQeYAEO4BCxAAIAAgASACIANB5wAQ7gELEAAgACABIAIgA0HoABDuAQsQACAAIAEgAiADQekAEO4BCxAAIAAgASACIANB6gAQ7gELEAAgACABIAIgA0HrABDuAQsQACAAIAEgAiADQewAEO4BCx0BAX8jAEEQayIBJAAgAUEIaiAAEB0gAUEQaiQACx0BAX8jAEEQayIBJAAgAUEIaiAAEBMgAUEQaiQACx8AIAEQWCEBIAAQvQEgARC3AUEIdEHMAHIQxQEQuwELGQAgACABIAJBIEEAIAQbQRBBACADG3IQEgsNACAAIAEgAkEBEPABCw0AIAAgASACQQIQ8AELDQAgACABIAJBAxDwAQsNACAAIAEgAkEEEPABCw0AIAAgASACQQUQ8AELDQAgACABIAJBBhDwAQsNACAAIAEgAkEHEPABCw0AIAAgASACQQgQ8AELDQAgACABIAJBCRDwAQsNACAAIAEgAkELEPABCw0AIAAgASACQQ0Q8AELDQAgACABIAJBDhDwAQsNACAAIAEgAkEPEPABCw0AIAAgASACQRAQ8AELDQAgACABIAJBERDwAQsNACAAIAEgAkEXEPABCw0AIAAgASACQSEQ8AELDQAgACABIAJBJhDwAQsNACAAIAEgAkEnEPABCw0AIAAgASACQSkQ8AELDQAgACABIAJBKxDwAQsNACAAIAEgAkEtEPABCw0AIAAgASACQS4Q8AELDQAgACABIAJBLxDwAQsNACAAIAEgAkEwEPABCw0AIAAgASACQTEQ8AELDQAgACABIAJBNRDwAQsNACAAIAEgAkE3EPABCw0AIAAgASACQTkQ8QELDQAgACABIAJBOhDxAQsNACAAIAEgAkE7EPEBCw0AIAAgASACQTwQ8QELDQAgACABIAJBPRDxAQsNACAAIAEgAkE+EPEBCw0AIAAgASACQT8Q8QELDgAgACABIAJBwAAQ8QELDgAgACABIAJBwQAQ8QELDgAgACABIAJBwgAQ8QELDgAgACABIAJBwwAQ8QELDgAgACABIAJBxAAQ8QELDgAgACABIAJBxQAQ8QELDgAgACABIAJBxgAQ8QELDgAgACABIAJBxwAQ8QELDgAgACABIAJByAAQ8QELDgAgACABIAJByQAQ8QELDgAgACABIAJBygAQ8QELDgAgACABIAJB0QAQ8QELDgAgACABIAJB0gAQ8QELGAEBfyAAQf8BcUE/TQR/IAAQvAEFQQALCx4BAX9BCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQsbACAAEMQBIAAoAgBBf0YEQBDOAQALIAAtAAQLCQAgAEETEPMBCwkAIABBFRDzAQsJACAAQRoQ8wELCQAgAEEgEPMBCwkAIABBJRDzAQsJACAAQTQQ8wELCQAgAEE2EPMBCwoAIABB2AAQ8wELCgAgAEHZABDzAQsXACABQRB0QYCA/AdxIABBAnRB/AFxcgsXACAAEMQBIAAoAgAEQBDOAQALIAAQBAscACAAEL0BIAEQvQEgAhC9ARArQQh0EMUBELsBCxIAIAEgABDHASIABEAgAA8LAAsbAQF/QQhBBBC6ASIBIAA2AgQgAUEANgIAIAELGwEBf0EIQQQQugEiASAAOgAEIAFBADYCACABC24AIABB/wFxQcAATwRAIwBBMGsiACQAIABBIjYCDCAAQYCAwAA2AgggAEEcakIBNwIAIABBATYCFCAAQbCGwAA2AhAgAEEBNgIsIAAgAEEoajYCGCAAIABBCGo2AiggAEEQakG4gMAAEEkACyAACxQAIAAgASACQSBBACADGyAEchASCxgAIAAQUSABEFEgAhBRIAMQPRDCARCsAQsXACAAEFEgARBRIAIQUSADEFEQEhCsAQsTACAAEFEgARBRIAIQBRA4EKwBCxEAIAAgASACQSBBACADGxASCxMAIAAQUSABEFEgAhBSEDgQrAELDAAgAARADwsQzQEACxQBAX9BBEEBELoBIgEgADYAACABCxQBAX9BCEEEELoBIgBCADcCACAAC4EDAQV/QaWNwAAtAAAaAn8gAEEJTwRAAkBBzf97QRAgACAAQRBNGyIAayABTQ0AIABBECABQQtqQXhxIAFBC0kbIgRqQQxqEAEiAkUNACACQQhrIQECQCAAQQFrIgMgAnFFBEAgASEADAELIAJBBGsiBSgCACIGQXhxIAIgA2pBACAAa3FBCGsiAiAAQQAgAiABa0EQTRtqIgAgAWsiAmshAyAGQQNxBEAgACADIAAoAgRBAXFyQQJyNgIEIAAgA2oiAyADKAIEQQFyNgIEIAUgAiAFKAIAQQFxckECcjYCACABIAJqIgMgAygCBEEBcjYCBCABIAIQBgwBCyABKAIAIQEgACADNgIEIAAgASACajYCAAsCQCAAKAIEIgFBA3FFDQAgAUF4cSICIARBEGpNDQAgACAEIAFBAXFyQQJyNgIEIAAgBGoiASACIARrIgRBA3I2AgQgACACaiICIAIoAgRBAXI2AgQgASAEEAYLIABBCGohAwsgAwwBCyABEAELCw0AIAAQ1QFBCnZBP3ELEAAgABBRIAEQWBC3ARCsAQsgACAAQsWAsKa9qOHJSzcDCCAAQpXM9oWR7LDtHzcDAAsLACABBEAgABAECwsLACAAIwBqJAAjAAsNAEHoiMAAQRsQ0gEACw4AQYOJwABBzwAQ0gEACwsAIAAxAAAgARADCwsAIAAzAQAgARADCwsAIAA1AgAgARADCwkAIAAgARAAAAsKACAAQT9xELwBCwoAIAAQUUH/AXELBwAgAEEIdAsHACAAED0aCwcAIAAQURoLBwAgABBSGgsHACAAEFMaCwoAQTMQxQEQuwELBwBBCxC8AQsHAEEKELwBCwcAQQgQvAELBwBBDxC8AQsHAEEGELwBCwcAQQkQvAELBwBBBxC8AQsHAEEMELwBCwcAQQIQvAELBwBBARC8AQsHAEEDELwBCwcAQQ0QvAELBwBBDhC8AQsHAEEFELwBCwcAQQQQvAELBwBBEBC8AQsHAEEAELwBCwQAQQQLAgALJAAgABC9ASABEL0BIAIQvQEgAxC9ARASQQh0IARyEMUBELsBCyMAIAAQvQEgARC9ASACEL0BIAMQDRASQQh0IARyEMUBELsBCx8AIAAQvQEgARC9ASACEL0BECtBCHQgA3IQxQEQuwELHgAgABC9ASABEL0BIAIQDhA4QQh0IANyEMUBELsBC2IBAX8jAEEwayIEJAAgBCAANgIMIAAgA08EQCAEQRxqQgE3AgAgBEECNgIUIAQgAjYCECAEQQQ2AiwgBCAEQShqNgIYIAQgBEEMajYCKCAEQRBqIAEQSQALIARBMGokACAACxsAIAAQvQEaIABBCnRBgPgDcSABchDFARC7AQtSAQJ/IwBBEGsiBSQAIAVBCGogAxATIAUtAAkhAyAFLQAIIQYgABC9ASABEL0BIAIQvQEgBkEBcSADQQFxEHpBCHQgBHIQxQEQuwEgBUEQaiQAC1ABAn8jAEEQayIFJAAgBUEIaiADEB0gBS0ACCEDIAUtAAkhBiAAEL0BIAEQvQEgAhC9ASADQQFxIAYQvgFBCHQgBHIQxQEQuwEgBUEQaiQAC0oAIAAQvQEaIAEQECIBQRB0QYCA/AdxIABBEnRBgIDwH3EgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyQQh0IAJyEMUBELsBC0kBAX8jAEEQayIDJAAgABDEASABIAJPBEBB4ILAAEEZENIBAAsgA0EIaiAAEFQgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQgAgABC9ARogARC9ARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyEMUBELsBCzYAIAAQESIAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2ckEIdCABchDFARC7AQsL3AkBAEGAgMAAC9IJQ2hlY2tSZWdJZCB3YXMgZ2l2ZW4gaW52YWxpZCBSZWdJZGZ1ZWwtYXNtL3NyYy9saWIucnMAAAAiABAAEwAAAG4AAAAiAAAAVmFsdWUgYGAgb3V0IG9mIHJhbmdlIGZvciA2LWJpdCBpbW1lZGlhdGUAAABIABAABwAAAE8AEAAiAAAAIgAQABMAAACpAwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxMi1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAlAAQACMAAAAiABAAEwAAAK4DAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDE4LWJpdCBpbW1lZGlhdGUASAAQAAcAAADYABAAIwAAACIAEAATAAAAswMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMjQtYml0IGltbWVkaWF0ZQBIABAABwAAABwBEAAjAAAAIgAQABMAAAC4AwAAHAAAAGludmFsaWQgZW51bSB2YWx1ZSBwYXNzZWQAAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAkAAAAJEAAACSAAAAkwAAAJQAAACVAAAAlgAAAJcAAACYAAAAoAAAAKEAAACiAAAAowAAAKQAAAClAAAApgAAAKcAAACoAAAAqQAAAKoAAACrAAAArAAAAK0AAACwAAAAaAQQAAAAAAAFAAAAAAAAAAEAAAAGAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTljYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlbGlicmFyeS9zdGQvc3JjL3Bhbmlja2luZy5ycwA7BBAAHAAAAIQCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMC4zDHdhc20tYmluZGdlbgYwLjIuOTI=", e);
}
async function Vo() {
  return await Lu(Zg());
}
Vo();
function Ec(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function Wg(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Xs(e, ...t) {
  if (!Wg(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function Jg(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ec(e.outputLen), Ec(e.blockLen);
}
function Ds(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function qg(e, t) {
  Xs(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Bi = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const vi = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Ht = (e, t) => e << 32 - t | e >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function jg(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Yo(e) {
  return typeof e == "string" && (e = jg(e)), Xs(e), e;
}
function $g(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    Xs(s), t += s.length;
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, s), s += i.length;
  }
  return n;
}
class ku {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function Kg(e) {
  const t = (r) => e().update(Yo(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function ep(e = 32) {
  if (Bi && typeof Bi.getRandomValues == "function")
    return Bi.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function tp(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), A = r ? 4 : 0, f = r ? 0 : 4;
  e.setUint32(t + A, o, r), e.setUint32(t + f, c, r);
}
const np = (e, t, n) => e & t ^ ~e & n, rp = (e, t, n) => e & t ^ e & n ^ t & n;
class sp extends ku {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = vi(this.buffer);
  }
  update(t) {
    Ds(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Yo(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const A = vi(t);
        for (; s <= i - o; o += s)
          this.process(A, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Ds(this), qg(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    tp(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = vi(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const f = A / 4, w = this.get();
    if (f > w.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < f; g++)
      c.setUint32(4 * g, w[g], i);
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
const ip = /* @__PURE__ */ new Uint32Array([
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
]), An = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), ln = /* @__PURE__ */ new Uint32Array(64);
class op extends sp {
  constructor() {
    super(64, 32, 8, !1), this.A = An[0] | 0, this.B = An[1] | 0, this.C = An[2] | 0, this.D = An[3] | 0, this.E = An[4] | 0, this.F = An[5] | 0, this.G = An[6] | 0, this.H = An[7] | 0;
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
    for (let g = 0; g < 16; g++, n += 4)
      ln[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const C = ln[g - 15], x = ln[g - 2], _ = Ht(C, 7) ^ Ht(C, 18) ^ C >>> 3, B = Ht(x, 17) ^ Ht(x, 19) ^ x >>> 10;
      ln[g] = B + ln[g - 7] + _ + ln[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: A, G: f, H: w } = this;
    for (let g = 0; g < 64; g++) {
      const C = Ht(c, 6) ^ Ht(c, 11) ^ Ht(c, 25), x = w + C + np(c, A, f) + ip[g] + ln[g] | 0, B = (Ht(r, 2) ^ Ht(r, 13) ^ Ht(r, 22)) + rp(r, s, i) | 0;
      w = f, f = A, A = c, c = o + x | 0, o = i, i = s, s = r, r = x + B | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, A = A + this.F | 0, f = f + this.G | 0, w = w + this.H | 0, this.set(r, s, i, o, c, A, f, w);
  }
  roundClean() {
    ln.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const ap = /* @__PURE__ */ Kg(() => new op());
class Pu extends ku {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Jg(t);
    const r = Yo(n);
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
    return Ds(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Ds(this), Xs(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const Uu = (e, t, n) => new Pu(e, t).update(n).digest();
Uu.create = (e, t) => new Pu(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const pt = BigInt(0), Pe = BigInt(1), On = BigInt(2), cp = BigInt(3), eo = BigInt(4), bc = BigInt(5), Cc = BigInt(8);
BigInt(9);
BigInt(16);
function Ct(e, t) {
  const n = e % t;
  return n >= pt ? n : t + n;
}
function up(e, t, n) {
  if (n <= pt || t < pt)
    throw new Error("Expected power/modulo > 0");
  if (n === Pe)
    return pt;
  let r = Pe;
  for (; t > pt; )
    t & Pe && (r = r * e % n), e = e * e % n, t >>= Pe;
  return r;
}
function St(e, t, n) {
  let r = e;
  for (; t-- > pt; )
    r *= r, r %= n;
  return r;
}
function to(e, t) {
  if (e === pt || t <= pt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = Ct(e, t), r = t, s = pt, i = Pe;
  for (; n !== pt; ) {
    const c = r / n, A = r % n, f = s - i * c;
    r = n, n = A, s = i, i = f;
  }
  if (r !== Pe)
    throw new Error("invert: does not exist");
  return Ct(s, t);
}
function dp(e) {
  const t = (e - Pe) / On;
  let n, r, s;
  for (n = e - Pe, r = 0; n % On === pt; n /= On, r++)
    ;
  for (s = On; s < e && up(s, t, e) !== e - Pe; s++)
    ;
  if (r === 1) {
    const o = (e + Pe) / eo;
    return function(A, f) {
      const w = A.pow(f, o);
      if (!A.eql(A.sqr(w), f))
        throw new Error("Cannot find square root");
      return w;
    };
  }
  const i = (n + Pe) / On;
  return function(c, A) {
    if (c.pow(A, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let f = r, w = c.pow(c.mul(c.ONE, s), n), g = c.pow(A, i), C = c.pow(A, n);
    for (; !c.eql(C, c.ONE); ) {
      if (c.eql(C, c.ZERO))
        return c.ZERO;
      let x = 1;
      for (let B = c.sqr(C); x < f && !c.eql(B, c.ONE); x++)
        B = c.sqr(B);
      const _ = c.pow(w, Pe << BigInt(f - x - 1));
      w = c.sqr(_), g = c.mul(g, _), C = c.mul(C, w), f = x;
    }
    return g;
  };
}
function Ap(e) {
  if (e % eo === cp) {
    const t = (e + Pe) / eo;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % Cc === bc) {
    const t = (e - bc) / Cc;
    return function(r, s) {
      const i = r.mul(s, On), o = r.pow(i, t), c = r.mul(s, o), A = r.mul(r.mul(c, On), o), f = r.mul(c, r.sub(A, r.ONE));
      if (!r.eql(r.sqr(f), s))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  return dp(e);
}
const lp = [
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
function fp(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = lp.reduce((r, s) => (r[s] = "function", r), t);
  return Xr(e, n);
}
function hp(e, t, n) {
  if (n < pt)
    throw new Error("Expected power > 0");
  if (n === pt)
    return e.ONE;
  if (n === Pe)
    return t;
  let r = e.ONE, s = t;
  for (; n > pt; )
    n & Pe && (r = e.mul(r, s)), s = e.sqr(s), n >>= Pe;
  return r;
}
function gp(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, c) => e.is0(o) ? i : (n[c] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, c) => e.is0(o) ? i : (n[c] = e.mul(i, n[c]), e.mul(i, o)), s), n;
}
function Gu(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function pp(e, t, n = !1, r = {}) {
  if (e <= pt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = Gu(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Ap(e), c = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: Go(s),
    ZERO: pt,
    ONE: Pe,
    create: (A) => Ct(A, e),
    isValid: (A) => {
      if (typeof A != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof A}`);
      return pt <= A && A < e;
    },
    is0: (A) => A === pt,
    isOdd: (A) => (A & Pe) === Pe,
    neg: (A) => Ct(-A, e),
    eql: (A, f) => A === f,
    sqr: (A) => Ct(A * A, e),
    add: (A, f) => Ct(A + f, e),
    sub: (A, f) => Ct(A - f, e),
    mul: (A, f) => Ct(A * f, e),
    pow: (A, f) => hp(c, A, f),
    div: (A, f) => Ct(A * to(f, e), e),
    // Same as above, but doesn't normalize
    sqrN: (A) => A * A,
    addN: (A, f) => A + f,
    subN: (A, f) => A - f,
    mulN: (A, f) => A * f,
    inv: (A) => to(A, e),
    sqrt: r.sqrt || ((A) => o(c, A)),
    invertBatch: (A) => gp(c, A),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (A, f, w) => w ? f : A,
    toBytes: (A) => n ? Uo(A, i) : ur(A, i),
    fromBytes: (A) => {
      if (A.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${A.length}`);
      return n ? Po(A) : Gn(A);
    }
  });
  return Object.freeze(c);
}
function zu(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Hu(e) {
  const t = zu(e);
  return t + Math.ceil(t / 2);
}
function mp(e, t, n = !1) {
  const r = e.length, s = zu(t), i = Hu(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Gn(e) : Po(e), c = Ct(o, t - Pe) + Pe;
  return n ? Uo(c, s) : ur(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const wp = BigInt(0), xi = BigInt(1);
function yp(e, t) {
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
      for (; i > wp; )
        i & xi && (o = o.add(c)), c = c.double(), i >>= xi;
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
      let f = s, w = f;
      for (let g = 0; g < o; g++) {
        w = f, A.push(w);
        for (let C = 1; C < c; C++)
          w = w.add(f), A.push(w);
        f = w.double();
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
      let f = e.ZERO, w = e.BASE;
      const g = BigInt(2 ** s - 1), C = 2 ** s, x = BigInt(s);
      for (let _ = 0; _ < c; _++) {
        const B = _ * A;
        let D = Number(o & g);
        o >>= x, D > A && (D -= C, o += xi);
        const T = B, G = B + Math.abs(D) - 1, P = _ % 2 !== 0, W = D < 0;
        D === 0 ? w = w.add(n(P, i[T])) : f = f.add(n(W, i[G]));
      }
      return { p: f, f: w };
    },
    wNAFCached(s, i, o, c) {
      const A = s._WINDOW_SIZE || 1;
      let f = i.get(s);
      return f || (f = this.precomputeWindow(s, A), A !== 1 && i.set(s, c(f))), this.wNAF(A, f, o);
    }
  };
}
function Xu(e) {
  return fp(e.Fp), Xr(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Gu(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Ip(e) {
  const t = Xu(e);
  Xr(t, {
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
const { bytesToNumberBE: Ep, hexToBytes: bp } = dh, Ln = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = Ln;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: Ep(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Ln, n = typeof e == "string" ? bp(e) : e;
    Hr(n);
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Ln._parseInt(n.subarray(2)), { d: o, l: c } = Ln._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (f) => Number.parseInt(f[0], 16) & 8 ? "00" + f : f, n = (f) => {
      const w = f.toString(16);
      return w.length & 1 ? `0${w}` : w;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, c = n(i), A = n(o);
    return `30${n(o + i + 4)}02${A}${s}02${c}${r}`;
  }
}, en = BigInt(0), Qt = BigInt(1);
BigInt(2);
const Bc = BigInt(3);
BigInt(4);
function Cp(e) {
  const t = Ip(e), { Fp: n } = t, r = t.toBytes || ((_, B, D) => {
    const T = B.toAffine();
    return Mr(Uint8Array.from([4]), n.toBytes(T.x), n.toBytes(T.y));
  }), s = t.fromBytes || ((_) => {
    const B = _.subarray(1), D = n.fromBytes(B.subarray(0, n.BYTES)), T = n.fromBytes(B.subarray(n.BYTES, 2 * n.BYTES));
    return { x: D, y: T };
  });
  function i(_) {
    const { a: B, b: D } = t, T = n.sqr(_), G = n.mul(T, _);
    return n.add(n.add(G, n.mul(_, B)), D);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(_) {
    return typeof _ == "bigint" && en < _ && _ < t.n;
  }
  function c(_) {
    if (!o(_))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function A(_) {
    const { allowedPrivateKeyLengths: B, nByteLength: D, wrapPrivateKey: T, n: G } = t;
    if (B && typeof _ != "bigint") {
      if (zn(_) && (_ = ar(_)), typeof _ != "string" || !B.includes(_.length))
        throw new Error("Invalid key");
      _ = _.padStart(D * 2, "0");
    }
    let P;
    try {
      P = typeof _ == "bigint" ? _ : Gn(Ot("private key", _, D));
    } catch {
      throw new Error(`private key must be ${D} bytes, hex or bigint, not ${typeof _}`);
    }
    return T && (P = Ct(P, G)), c(P), P;
  }
  const f = /* @__PURE__ */ new Map();
  function w(_) {
    if (!(_ instanceof g))
      throw new Error("ProjectivePoint expected");
  }
  class g {
    constructor(B, D, T) {
      if (this.px = B, this.py = D, this.pz = T, B == null || !n.isValid(B))
        throw new Error("x required");
      if (D == null || !n.isValid(D))
        throw new Error("y required");
      if (T == null || !n.isValid(T))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(B) {
      const { x: D, y: T } = B || {};
      if (!B || !n.isValid(D) || !n.isValid(T))
        throw new Error("invalid affine point");
      if (B instanceof g)
        throw new Error("projective point not allowed");
      const G = (P) => n.eql(P, n.ZERO);
      return G(D) && G(T) ? g.ZERO : new g(D, T, n.ONE);
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
    static normalizeZ(B) {
      const D = n.invertBatch(B.map((T) => T.pz));
      return B.map((T, G) => T.toAffine(D[G])).map(g.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(B) {
      const D = g.fromAffine(s(Ot("pointHex", B)));
      return D.assertValidity(), D;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(B) {
      return g.BASE.multiply(A(B));
    }
    // "Private method", don't use it directly
    _setWindowSize(B) {
      this._WINDOW_SIZE = B, f.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !n.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: B, y: D } = this.toAffine();
      if (!n.isValid(B) || !n.isValid(D))
        throw new Error("bad point: x or y not FE");
      const T = n.sqr(D), G = i(B);
      if (!n.eql(T, G))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: B } = this.toAffine();
      if (n.isOdd)
        return !n.isOdd(B);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(B) {
      w(B);
      const { px: D, py: T, pz: G } = this, { px: P, py: W, pz: L } = B, Q = n.eql(n.mul(D, L), n.mul(P, G)), k = n.eql(n.mul(T, L), n.mul(W, G));
      return Q && k;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new g(this.px, n.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: B, b: D } = t, T = n.mul(D, Bc), { px: G, py: P, pz: W } = this;
      let L = n.ZERO, Q = n.ZERO, k = n.ZERO, O = n.mul(G, G), U = n.mul(P, P), H = n.mul(W, W), X = n.mul(G, P);
      return X = n.add(X, X), k = n.mul(G, W), k = n.add(k, k), L = n.mul(B, k), Q = n.mul(T, H), Q = n.add(L, Q), L = n.sub(U, Q), Q = n.add(U, Q), Q = n.mul(L, Q), L = n.mul(X, L), k = n.mul(T, k), H = n.mul(B, H), X = n.sub(O, H), X = n.mul(B, X), X = n.add(X, k), k = n.add(O, O), O = n.add(k, O), O = n.add(O, H), O = n.mul(O, X), Q = n.add(Q, O), H = n.mul(P, W), H = n.add(H, H), O = n.mul(H, X), L = n.sub(L, O), k = n.mul(H, U), k = n.add(k, k), k = n.add(k, k), new g(L, Q, k);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(B) {
      w(B);
      const { px: D, py: T, pz: G } = this, { px: P, py: W, pz: L } = B;
      let Q = n.ZERO, k = n.ZERO, O = n.ZERO;
      const U = t.a, H = n.mul(t.b, Bc);
      let X = n.mul(D, P), K = n.mul(T, W), b = n.mul(G, L), a = n.add(D, T), u = n.add(P, W);
      a = n.mul(a, u), u = n.add(X, K), a = n.sub(a, u), u = n.add(D, G);
      let l = n.add(P, L);
      return u = n.mul(u, l), l = n.add(X, b), u = n.sub(u, l), l = n.add(T, G), Q = n.add(W, L), l = n.mul(l, Q), Q = n.add(K, b), l = n.sub(l, Q), O = n.mul(U, u), Q = n.mul(H, b), O = n.add(Q, O), Q = n.sub(K, O), O = n.add(K, O), k = n.mul(Q, O), K = n.add(X, X), K = n.add(K, X), b = n.mul(U, b), u = n.mul(H, u), K = n.add(K, b), b = n.sub(X, b), b = n.mul(U, b), u = n.add(u, b), X = n.mul(K, u), k = n.add(k, X), X = n.mul(l, u), Q = n.mul(a, Q), Q = n.sub(Q, X), X = n.mul(a, K), O = n.mul(l, O), O = n.add(O, X), new g(Q, k, O);
    }
    subtract(B) {
      return this.add(B.negate());
    }
    is0() {
      return this.equals(g.ZERO);
    }
    wNAF(B) {
      return x.wNAFCached(this, f, B, (D) => {
        const T = n.invertBatch(D.map((G) => G.pz));
        return D.map((G, P) => G.toAffine(T[P])).map(g.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(B) {
      const D = g.ZERO;
      if (B === en)
        return D;
      if (c(B), B === Qt)
        return this;
      const { endo: T } = t;
      if (!T)
        return x.unsafeLadder(this, B);
      let { k1neg: G, k1: P, k2neg: W, k2: L } = T.splitScalar(B), Q = D, k = D, O = this;
      for (; P > en || L > en; )
        P & Qt && (Q = Q.add(O)), L & Qt && (k = k.add(O)), O = O.double(), P >>= Qt, L >>= Qt;
      return G && (Q = Q.negate()), W && (k = k.negate()), k = new g(n.mul(k.px, T.beta), k.py, k.pz), Q.add(k);
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
    multiply(B) {
      c(B);
      let D = B, T, G;
      const { endo: P } = t;
      if (P) {
        const { k1neg: W, k1: L, k2neg: Q, k2: k } = P.splitScalar(D);
        let { p: O, f: U } = this.wNAF(L), { p: H, f: X } = this.wNAF(k);
        O = x.constTimeNegate(W, O), H = x.constTimeNegate(Q, H), H = new g(n.mul(H.px, P.beta), H.py, H.pz), T = O.add(H), G = U.add(X);
      } else {
        const { p: W, f: L } = this.wNAF(D);
        T = W, G = L;
      }
      return g.normalizeZ([T, G])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(B, D, T) {
      const G = g.BASE, P = (L, Q) => Q === en || Q === Qt || !L.equals(G) ? L.multiplyUnsafe(Q) : L.multiply(Q), W = P(this, D).add(P(B, T));
      return W.is0() ? void 0 : W;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(B) {
      const { px: D, py: T, pz: G } = this, P = this.is0();
      B == null && (B = P ? n.ONE : n.inv(G));
      const W = n.mul(D, B), L = n.mul(T, B), Q = n.mul(G, B);
      if (P)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(Q, n.ONE))
        throw new Error("invZ was invalid");
      return { x: W, y: L };
    }
    isTorsionFree() {
      const { h: B, isTorsionFree: D } = t;
      if (B === Qt)
        return !0;
      if (D)
        return D(g, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: B, clearCofactor: D } = t;
      return B === Qt ? this : D ? D(g, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(B = !0) {
      return this.assertValidity(), r(g, this, B);
    }
    toHex(B = !0) {
      return ar(this.toRawBytes(B));
    }
  }
  g.BASE = new g(t.Gx, t.Gy, n.ONE), g.ZERO = new g(n.ZERO, n.ONE, n.ZERO);
  const C = t.nBitLength, x = yp(g, t.endo ? Math.ceil(C / 2) : C);
  return {
    CURVE: t,
    ProjectivePoint: g,
    normPrivateKeyToScalar: A,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Bp(e) {
  const t = Xu(e);
  return Xr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function vp(e) {
  const t = Bp(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(u) {
    return en < u && u < n.ORDER;
  }
  function c(u) {
    return Ct(u, r);
  }
  function A(u) {
    return to(u, r);
  }
  const { ProjectivePoint: f, normPrivateKeyToScalar: w, weierstrassEquation: g, isWithinCurveOrder: C } = Cp({
    ...t,
    toBytes(u, l, m) {
      const h = l.toAffine(), I = n.toBytes(h.x), E = Mr;
      return m ? E(Uint8Array.from([l.hasEvenY() ? 2 : 3]), I) : E(Uint8Array.from([4]), I, n.toBytes(h.y));
    },
    fromBytes(u) {
      const l = u.length, m = u[0], h = u.subarray(1);
      if (l === s && (m === 2 || m === 3)) {
        const I = Gn(h);
        if (!o(I))
          throw new Error("Point is not on curve");
        const E = g(I);
        let p;
        try {
          p = n.sqrt(E);
        } catch (Y) {
          const V = Y instanceof Error ? ": " + Y.message : "";
          throw new Error("Point is not on curve" + V);
        }
        const d = (p & Qt) === Qt;
        return (m & 1) === 1 !== d && (p = n.neg(p)), { x: I, y: p };
      } else if (l === i && m === 4) {
        const I = n.fromBytes(h.subarray(0, n.BYTES)), E = n.fromBytes(h.subarray(n.BYTES, 2 * n.BYTES));
        return { x: I, y: E };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), x = (u) => ar(ur(u, t.nByteLength));
  function _(u) {
    const l = r >> Qt;
    return u > l;
  }
  function B(u) {
    return _(u) ? c(-u) : u;
  }
  const D = (u, l, m) => Gn(u.slice(l, m));
  class T {
    constructor(l, m, h) {
      this.r = l, this.s = m, this.recovery = h, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(l) {
      const m = t.nByteLength;
      return l = Ot("compactSignature", l, m * 2), new T(D(l, 0, m), D(l, m, 2 * m));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(l) {
      const { r: m, s: h } = Ln.toSig(Ot("DER", l));
      return new T(m, h);
    }
    assertValidity() {
      if (!C(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!C(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(l) {
      return new T(this.r, this.s, l);
    }
    recoverPublicKey(l) {
      const { r: m, s: h, recovery: I } = this, E = k(Ot("msgHash", l));
      if (I == null || ![0, 1, 2, 3].includes(I))
        throw new Error("recovery id invalid");
      const p = I === 2 || I === 3 ? m + t.n : m;
      if (p >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const d = I & 1 ? "03" : "02", y = f.fromHex(d + x(p)), Y = A(p), V = c(-E * Y), $ = c(h * Y), j = f.BASE.multiplyAndAddUnsafe(y, V, $);
      if (!j)
        throw new Error("point at infinify");
      return j.assertValidity(), j;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return _(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new T(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return cr(this.toDERHex());
    }
    toDERHex() {
      return Ln.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return cr(this.toCompactHex());
    }
    toCompactHex() {
      return x(this.r) + x(this.s);
    }
  }
  const G = {
    isValidPrivateKey(u) {
      try {
        return w(u), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: w,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const u = Hu(t.n);
      return mp(t.randomBytes(u), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(u = 8, l = f.BASE) {
      return l._setWindowSize(u), l.multiply(BigInt(3)), l;
    }
  };
  function P(u, l = !0) {
    return f.fromPrivateKey(u).toRawBytes(l);
  }
  function W(u) {
    const l = zn(u), m = typeof u == "string", h = (l || m) && u.length;
    return l ? h === s || h === i : m ? h === 2 * s || h === 2 * i : u instanceof f;
  }
  function L(u, l, m = !0) {
    if (W(u))
      throw new Error("first arg must be private key");
    if (!W(l))
      throw new Error("second arg must be public key");
    return f.fromHex(l).multiply(w(u)).toRawBytes(m);
  }
  const Q = t.bits2int || function(u) {
    const l = Gn(u), m = u.length * 8 - t.nBitLength;
    return m > 0 ? l >> BigInt(m) : l;
  }, k = t.bits2int_modN || function(u) {
    return c(Q(u));
  }, O = Go(t.nBitLength);
  function U(u) {
    if (typeof u != "bigint")
      throw new Error("bigint expected");
    if (!(en <= u && u < O))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return ur(u, t.nByteLength);
  }
  function H(u, l, m = X) {
    if (["recovered", "canonical"].some((re) => re in m))
      throw new Error("sign() legacy options not supported");
    const { hash: h, randomBytes: I } = t;
    let { lowS: E, prehash: p, extraEntropy: d } = m;
    E == null && (E = !0), u = Ot("msgHash", u), p && (u = Ot("prehashed msgHash", h(u)));
    const y = k(u), Y = w(l), V = [U(Y), U(y)];
    if (d != null && d !== !1) {
      const re = d === !0 ? I(n.BYTES) : d;
      V.push(Ot("extraEntropy", re));
    }
    const $ = Mr(...V), j = y;
    function ne(re) {
      const be = Q(re);
      if (!C(be))
        return;
      const Ae = A(be), ie = f.BASE.multiply(be).toAffine(), me = c(ie.x);
      if (me === en)
        return;
      const ue = c(Ae * c(j + me * Y));
      if (ue === en)
        return;
      let he = (ie.x === me ? 0 : 2) | Number(ie.y & Qt), Ut = ue;
      return E && _(ue) && (Ut = B(ue), he ^= 1), new T(me, Ut, he);
    }
    return { seed: $, k2sig: ne };
  }
  const X = { lowS: t.lowS, prehash: !1 }, K = { lowS: t.lowS, prehash: !1 };
  function b(u, l, m = X) {
    const { seed: h, k2sig: I } = H(u, l, m), E = t;
    return hu(E.hash.outputLen, E.nByteLength, E.hmac)(h, I);
  }
  f.BASE._setWindowSize(8);
  function a(u, l, m, h = K) {
    var ie;
    const I = u;
    if (l = Ot("msgHash", l), m = Ot("publicKey", m), "strict" in h)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: E, prehash: p } = h;
    let d, y;
    try {
      if (typeof I == "string" || zn(I))
        try {
          d = T.fromDER(I);
        } catch (me) {
          if (!(me instanceof Ln.Err))
            throw me;
          d = T.fromCompact(I);
        }
      else if (typeof I == "object" && typeof I.r == "bigint" && typeof I.s == "bigint") {
        const { r: me, s: ue } = I;
        d = new T(me, ue);
      } else
        throw new Error("PARSE");
      y = f.fromHex(m);
    } catch (me) {
      if (me.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (E && d.hasHighS())
      return !1;
    p && (l = t.hash(l));
    const { r: Y, s: V } = d, $ = k(l), j = A(V), ne = c($ * j), re = c(Y * j), be = (ie = f.BASE.multiplyAndAddUnsafe(y, ne, re)) == null ? void 0 : ie.toAffine();
    return be ? c(be.x) === Y : !1;
  }
  return {
    CURVE: t,
    getPublicKey: P,
    getSharedSecret: L,
    sign: b,
    verify: a,
    ProjectivePoint: f,
    Signature: T,
    utils: G
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function xp(e) {
  return {
    hash: e,
    hmac: (t, ...n) => Uu(e, t, $g(...n)),
    randomBytes: ep
  };
}
function _p(e, t) {
  const n = (r) => vp({ ...e, ...xp(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Vu = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), vc = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Rp = BigInt(1), no = BigInt(2), xc = (e, t) => (e + t / no) / t;
function Sp(e) {
  const t = Vu, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), A = BigInt(88), f = e * e * e % t, w = f * f * e % t, g = St(w, n, t) * w % t, C = St(g, n, t) * w % t, x = St(C, no, t) * f % t, _ = St(x, s, t) * x % t, B = St(_, i, t) * _ % t, D = St(B, c, t) * B % t, T = St(D, A, t) * D % t, G = St(T, c, t) * B % t, P = St(G, n, t) * w % t, W = St(P, o, t) * _ % t, L = St(W, r, t) * f % t, Q = St(L, no, t);
  if (!ro.eql(ro.sqr(Q), e))
    throw new Error("Cannot find square root");
  return Q;
}
const ro = pp(Vu, void 0, void 0, { sqrt: Sp }), fn = _p({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: ro,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: vc,
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
      const t = vc, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -Rp * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = xc(i * e, t), A = xc(-r * e, t);
      let f = Ct(e - c * n - A * s, t), w = Ct(-c * r - A * i, t);
      const g = f > o, C = w > o;
      if (g && (f = t - f), C && (w = t - w), f > o || w > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: g, k1: f, k2neg: C, k2: w };
    }
  }
}, ap);
BigInt(0);
fn.ProjectivePoint;
var mt = [];
for (var _i = 0; _i < 256; ++_i)
  mt.push((_i + 256).toString(16).slice(1));
function Qp(e, t = 0) {
  return (mt[e[t + 0]] + mt[e[t + 1]] + mt[e[t + 2]] + mt[e[t + 3]] + "-" + mt[e[t + 4]] + mt[e[t + 5]] + "-" + mt[e[t + 6]] + mt[e[t + 7]] + "-" + mt[e[t + 8]] + mt[e[t + 9]] + "-" + mt[e[t + 10]] + mt[e[t + 11]] + mt[e[t + 12]] + mt[e[t + 13]] + mt[e[t + 14]] + mt[e[t + 15]]).toLowerCase();
}
var os, Np = new Uint8Array(16);
function Dp() {
  if (!os && (os = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !os))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return os(Np);
}
var Tp = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const _c = {
  randomUUID: Tp
};
function Fp(e, t, n) {
  if (_c.randomUUID && !t && !e)
    return _c.randomUUID();
  e = e || {};
  var r = e.random || (e.rng || Dp)();
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, Qp(r);
}
var Zo = { exports: {} }, $n = typeof Reflect == "object" ? Reflect : null, Rc = $n && typeof $n.apply == "function" ? $n.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, Is;
$n && typeof $n.ownKeys == "function" ? Is = $n.ownKeys : Object.getOwnPropertySymbols ? Is = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Is = function(t) {
  return Object.getOwnPropertyNames(t);
};
function Mp(e) {
  console && console.warn && console.warn(e);
}
var Yu = Number.isNaN || function(t) {
  return t !== t;
};
function xe() {
  xe.init.call(this);
}
Zo.exports = xe;
Zo.exports.once = Pp;
xe.EventEmitter = xe;
xe.prototype._events = void 0;
xe.prototype._eventsCount = 0;
xe.prototype._maxListeners = void 0;
var Sc = 10;
function Vs(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(xe, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Sc;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Yu(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Sc = e;
  }
});
xe.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
xe.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Yu(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Zu(e) {
  return e._maxListeners === void 0 ? xe.defaultMaxListeners : e._maxListeners;
}
xe.prototype.getMaxListeners = function() {
  return Zu(this);
};
xe.prototype.emit = function(t) {
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
    Rc(A, this, n);
  else
    for (var f = A.length, w = $u(A, f), r = 0; r < f; ++r)
      Rc(w[r], this, n);
  return !0;
};
function Wu(e, t, n, r) {
  var s, i, o;
  if (Vs(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = Zu(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = o.length, Mp(c);
  }
  return e;
}
xe.prototype.addListener = function(t, n) {
  return Wu(this, t, n, !1);
};
xe.prototype.on = xe.prototype.addListener;
xe.prototype.prependListener = function(t, n) {
  return Wu(this, t, n, !0);
};
function Op() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Ju(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = Op.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
xe.prototype.once = function(t, n) {
  return Vs(n), this.on(t, Ju(this, t, n)), this;
};
xe.prototype.prependOnceListener = function(t, n) {
  return Vs(n), this.prependListener(t, Ju(this, t, n)), this;
};
xe.prototype.removeListener = function(t, n) {
  var r, s, i, o, c;
  if (Vs(n), s = this._events, s === void 0)
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
    i === 0 ? r.shift() : Lp(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, c || n);
  }
  return this;
};
xe.prototype.off = xe.prototype.removeListener;
xe.prototype.removeAllListeners = function(t) {
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
function qu(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? kp(s) : $u(s, s.length);
}
xe.prototype.listeners = function(t) {
  return qu(this, t, !0);
};
xe.prototype.rawListeners = function(t) {
  return qu(this, t, !1);
};
xe.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : ju.call(e, t);
};
xe.prototype.listenerCount = ju;
function ju(e) {
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
xe.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Is(this._events) : [];
};
function $u(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function Lp(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function kp(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function Pp(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    Ku(e, t, i, { once: !0 }), t !== "error" && Up(e, s, { once: !0 });
  });
}
function Up(e, t, n) {
  typeof e.on == "function" && Ku(e, "error", t, n);
}
function Ku(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var ed = Zo.exports, Gp = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", zp = class {
  constructor(e, t, n, r, s, i = 0) {
    M(this, "left");
    M(this, "right");
    M(this, "parent");
    M(this, "hash");
    M(this, "data");
    M(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, Qc = zp;
function Hp(e) {
  return rn("0x00".concat(e.slice(2)));
}
function Xp(e, t) {
  return rn("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function td(e) {
  if (!e.length)
    return Gp;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = Hp(e[i]);
    t.push(new Qc(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = Xp(n[o].hash, n[o + 1].hash);
      t[i] = new Qc(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var Vp = "0x00", nd = "0x01";
function Yp(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(rn(t).slice(2));
  return [rn(n), n];
}
function Xn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [rn(n), n];
}
function Ri(e) {
  const t = nd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Zp(e) {
  const t = nd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Si(e) {
  return e.slice(0, 4) === Vp;
}
var Wp = class {
  constructor(e, t, n, r, s) {
    M(this, "SideNodes");
    M(this, "NonMembershipLeafData");
    M(this, "BitMask");
    M(this, "NumSideNodes");
    M(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, Jp = Wp, qp = class {
  constructor(e, t, n) {
    M(this, "SideNodes");
    M(this, "NonMembershipLeafData");
    M(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, jp = qp, xt = "0x0000000000000000000000000000000000000000000000000000000000000000", Kt = 256;
function Wn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function $p(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function Kp(e, t) {
  let n = 0;
  for (let r = 0; r < Kt && Wn(e, r) === Wn(t, r); r += 1)
    n += 1;
  return n;
}
function em(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === xt ? t.push(0) : (n.push(r), t.push(1));
  return new Jp(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var tm = class {
  constructor() {
    M(this, "ms");
    M(this, "root");
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
    if (Si(r))
      return [n, t, r, ""];
    let s, i, o = "", c = "";
    for (let f = 0; f < Kt; f += 1) {
      if ([s, i] = Zp(r), Wn(e, f) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === xt) {
        r = "";
        break;
      }
      if (r = this.get(o), Si(r))
        break;
    }
    const A = this.get(c);
    return [$p(n), o, r, A];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === xt)
      return this.root;
    const [s] = Ri(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", c = "", A = "", f = !1;
    for (let w = 0; w < t.length; w += 1)
      if (t[w] !== "") {
        if (c = t[w], o === "")
          if (A = this.get(c), Si(A)) {
            i = c, o = c;
            continue;
          } else
            o = xt, f = !0;
        !f && c === xt || (f || (f = !0), Wn(e, t.length - 1 - w) === 1 ? [i, o] = Xn(c, o) : [i, o] = Xn(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = xt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(rn(t), t), [i, o] = Yp(e, t), this.set(i, o), o = i;
    let c;
    if (r === xt)
      c = Kt;
    else {
      const [A] = Ri(s);
      c = Kp(e, A);
    }
    c !== Kt && (Wn(e, c) === 1 ? [i, o] = Xn(r, o) : [i, o] = Xn(o, r), this.set(i, o), o = i);
    for (let A = 0; A < Kt; A += 1) {
      let f;
      const w = Kt - n.length;
      if (A - w < 0 || n[A - w] === "")
        if (c !== Kt && c > Kt - 1 - A)
          f = xt;
        else
          continue;
      else
        f = n[A - w];
      Wn(e, Kt - 1 - A) === 1 ? [i, o] = Xn(f, o) : [i, o] = Xn(o, f), this.set(i, o), o = i;
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
      const [A] = Ri(r);
      A !== e && (o = r);
    }
    return new jp(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return em(t);
  }
}, nm = Object.defineProperty, rm = (e, t, n) => t in e ? nm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Te = (e, t, n) => (rm(e, typeof t != "symbol" ? t + "" : t, n), n), Wo = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Se = (e, t, n) => (Wo(e, t, "read from private field"), n ? n.call(e) : t.get(e)), wn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Lt = (e, t, n, r) => (Wo(e, t, "write to private field"), t.set(e, n), n), so = (e, t, n) => (Wo(e, t, "access private method"), n), Jo = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1], r = e[2] ?? void 0) : (n = e.amount, t = e.assetId, r = e.max ?? void 0);
  const s = v(n);
  return {
    assetId: J(t),
    amount: s.lt(1) ? v(1) : s,
    max: r ? v(r) : void 0
  };
}, sm = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, rd = te`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  type: __typename
  ... on SqueezedOutStatus {
    reason
  }
}
    `, im = te`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, qo = te`
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
    `, om = te`
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
    ${qo}`, am = te`
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
    ${qo}`, cm = te`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, um = te`
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
    ${im}
${om}
${am}
${cm}`, Wr = te`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${um}`, dm = te`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, Am = te`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${dm}`, lm = te`
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
    `, fm = te`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, hm = te`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${lm}
${fm}`, gm = te`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${hm}
${qo}`, jo = te`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, pm = te`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, sd = te`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, mm = te`
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
    `, id = te`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Ys = te`
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
    `, wm = te`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, ym = te`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, Im = te`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, Em = te`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, bm = te`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, Cm = te`
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
    `, Bm = te`
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
    ${Cm}`, vm = te`
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
    ${wm}
${ym}
${Im}
${Em}
${bm}
${Bm}`, xm = te`
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
    ${Ys}
${vm}`, _m = te`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, gr = te`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, Rm = te`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, Sm = te`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, Qm = te`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, Nm = te`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${Rm}`, Dm = te`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${xm}`, Tm = te`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Wr}`, Fm = te`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Wr}`, Mm = te`
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
    ${Wr}
${gr}`, Om = te`
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
    ${gr}
${Wr}`, Lm = te`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${Am}`, km = te`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Ys}`, Pm = te`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Ys}
${Wr}`, Um = te`
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
    ${gr}
${Ys}`, Gm = te`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${jo}`, zm = te`
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
    ${gr}
${jo}`, Hm = te`
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
    ${jo}
${pm}`, Xm = te`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, Vm = te`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${_m}`, Ym = te`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${id}`, Zm = te`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, Wm = te`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, Jm = te`
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
    ${gr}
${id}`, qm = te`
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
    ${gr}
${sd}`, jm = te`
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
    ${mm}`, $m = te`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, Km = te`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${Sm}`, ew = te`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${gm}`, tw = te`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, nw = te`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, rw = te`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${sd}`, sw = te`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${rd}`, iw = te`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${rd}`;
function ow(e) {
  return {
    getVersion(t, n) {
      return e(Qm, t, n);
    },
    getNodeInfo(t, n) {
      return e(Nm, t, n);
    },
    getChain(t, n) {
      return e(Dm, t, n);
    },
    getTransaction(t, n) {
      return e(Tm, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(Fm, t, n);
    },
    getTransactions(t, n) {
      return e(Mm, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(Om, t, n);
    },
    estimatePredicates(t, n) {
      return e(Lm, t, n);
    },
    getBlock(t, n) {
      return e(km, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(Pm, t, n);
    },
    getBlocks(t, n) {
      return e(Um, t, n);
    },
    getCoin(t, n) {
      return e(Gm, t, n);
    },
    getCoins(t, n) {
      return e(zm, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(Hm, t, n);
    },
    getContract(t, n) {
      return e(Xm, t, n);
    },
    getContractBalance(t, n) {
      return e(Vm, t, n);
    },
    getBalance(t, n) {
      return e(Ym, t, n);
    },
    getLatestGasPrice(t, n) {
      return e(Zm, t, n);
    },
    estimateGasPrice(t, n) {
      return e(Wm, t, n);
    },
    getBalances(t, n) {
      return e(Jm, t, n);
    },
    getMessages(t, n) {
      return e(qm, t, n);
    },
    getMessageProof(t, n) {
      return e(jm, t, n);
    },
    getMessageStatus(t, n) {
      return e($m, t, n);
    },
    getRelayedTransactionStatus(t, n) {
      return e(Km, t, n);
    },
    dryRun(t, n) {
      return e(ew, t, n);
    },
    submit(t, n) {
      return e(tw, t, n);
    },
    produceBlocks(t, n) {
      return e(nw, t, n);
    },
    getMessageByNonce(t, n) {
      return e(rw, t, n);
    },
    submitAndAwait(t, n) {
      return e(sw, t, n);
    },
    statusChange(t, n) {
      return e(iw, t, n);
    }
  };
}
var od = class {
  constructor(e) {
    M(this, "stream");
    M(this, "events", []);
    M(this, "parsingLeftover", "");
    this.options = e;
  }
  async setStream() {
    const { url: e, query: t, variables: n, fetchFn: r } = this.options, s = await r(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: xu(t),
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
          throw new R(
            R.CODES.INVALID_REQUEST,
            c.map((A) => A.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const n = od.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (n === "")
        continue;
      const r = `${this.parsingLeftover}${n}`, s = /data:.*\n\n/g, i = [...r.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new R(
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
}, ad = od;
Te(ad, "textDecoder", new TextDecoder());
var Tn = {}, aw = 30 * 1e3, Nc = class {
  constructor(e = aw) {
    M(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new R(
        S.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = J(e);
    if (Tn[n]) {
      if (!t || Tn[n].expires > Date.now())
        return Tn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = J(e);
    return Tn[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(Tn).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(Tn).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = J(e);
    delete Tn[t];
  }
}, cw = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case ve.Coin: {
      const n = q(e.predicate ?? "0x"), r = q(e.predicateData ?? "0x");
      return {
        type: ve.Coin,
        txID: J(q(e.id).slice(0, xn)),
        outputIndex: pn(q(e.id).slice(xn, Cs)),
        owner: J(e.owner),
        amount: v(e.amount),
        assetId: J(e.assetId),
        txPointer: {
          blockHeight: pn(q(e.txPointer).slice(0, 8)),
          txIndex: pn(q(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: v(e.predicateGasUsed),
        predicateLength: v(n.length),
        predicateDataLength: v(r.length),
        predicate: J(n),
        predicateData: J(r)
      };
    }
    case ve.Contract:
      return {
        type: ve.Contract,
        txID: De,
        outputIndex: 0,
        balanceRoot: De,
        stateRoot: De,
        txPointer: {
          blockHeight: pn(q(e.txPointer).slice(0, 8)),
          txIndex: pn(q(e.txPointer).slice(8, 16))
        },
        contractID: J(e.contractId)
      };
    case ve.Message: {
      const n = q(e.predicate ?? "0x"), r = q(e.predicateData ?? "0x"), s = q(e.data ?? "0x");
      return {
        type: ve.Message,
        sender: J(e.sender),
        recipient: J(e.recipient),
        amount: v(e.amount),
        nonce: J(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: v(e.predicateGasUsed),
        predicateLength: v(n.length),
        predicateDataLength: v(r.length),
        predicate: J(n),
        predicateData: J(r),
        data: J(s),
        dataLength: s.length
      };
    }
    default:
      throw new R(
        S.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, uw = (e) => {
  const { type: t } = e;
  switch (t) {
    case Ee.Coin:
      return {
        type: Ee.Coin,
        to: J(e.to),
        amount: v(e.amount),
        assetId: J(e.assetId)
      };
    case Ee.Contract:
      return {
        type: Ee.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: De,
        stateRoot: De
      };
    case Ee.Change:
      return {
        type: Ee.Change,
        to: J(e.to),
        amount: v(0),
        assetId: J(e.assetId)
      };
    case Ee.Variable:
      return {
        type: Ee.Variable,
        to: De,
        amount: v(0),
        assetId: De
      };
    case Ee.ContractCreated:
      return {
        type: Ee.ContractCreated,
        contractId: J(e.contractId),
        stateRoot: J(e.stateRoot)
      };
    default:
      throw new R(
        S.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, XI = (e) => "utxoId" in e, VI = (e) => "recipient" in e, dw = (e) => "id" in e, YI = (e) => "recipient" in e, Aw = (e) => e.type === de.Revert && e.val.toString("hex") === Tu, lw = (e) => e.type === de.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", Dc = (e) => e.reduce(
  (t, n) => (Aw(n) && t.missingOutputVariables.push(n), lw(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), _e = (e) => e || De;
function fw(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: de.Call,
        from: _e(e.id || e.contractId),
        to: _e(e == null ? void 0 : e.to),
        amount: v(e.amount),
        assetId: _e(e.assetId),
        gas: v(e.gas),
        param1: v(e.param1),
        param2: v(e.param2),
        pc: v(e.pc),
        is: v(e.is)
      };
    case "RETURN":
      return {
        type: de.Return,
        id: _e(e.id || e.contractId),
        val: v(e.val),
        pc: v(e.pc),
        is: v(e.is)
      };
    case "RETURN_DATA":
      return {
        type: de.ReturnData,
        id: _e(e.id || e.contractId),
        ptr: v(e.ptr),
        len: v(e.len),
        digest: _e(e.digest),
        pc: v(e.pc),
        is: v(e.is)
      };
    case "PANIC":
      return {
        type: de.Panic,
        id: _e(e.id),
        reason: v(e.reason),
        pc: v(e.pc),
        is: v(e.is),
        contractId: _e(e.contractId)
      };
    case "REVERT":
      return {
        type: de.Revert,
        id: _e(e.id || e.contractId),
        val: v(e.ra),
        pc: v(e.pc),
        is: v(e.is)
      };
    case "LOG":
      return {
        type: de.Log,
        id: _e(e.id || e.contractId),
        val0: v(e.ra),
        val1: v(e.rb),
        val2: v(e.rc),
        val3: v(e.rd),
        pc: v(e.pc),
        is: v(e.is)
      };
    case "LOG_DATA":
      return {
        type: de.LogData,
        id: _e(e.id || e.contractId),
        val0: v(e.ra),
        val1: v(e.rb),
        ptr: v(e.ptr),
        len: v(e.len),
        digest: _e(e.digest),
        pc: v(e.pc),
        is: v(e.is)
      };
    case "TRANSFER":
      return {
        type: de.Transfer,
        from: _e(e.id || e.contractId),
        to: _e(e.toAddress || (e == null ? void 0 : e.to)),
        amount: v(e.amount),
        assetId: _e(e.assetId),
        pc: v(e.pc),
        is: v(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: de.TransferOut,
        from: _e(e.id || e.contractId),
        to: _e(e.toAddress || e.to),
        amount: v(e.amount),
        assetId: _e(e.assetId),
        pc: v(e.pc),
        is: v(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: de.ScriptResult,
        result: v(e.result),
        gasUsed: v(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const n = _e(e.sender), r = _e(e.recipient), s = _e(e.nonce), i = v(e.amount), o = e.data ? q(e.data) : Uint8Array.from([]), c = _e(e.digest), A = Ss.getMessageId({
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
      const n = _e(e.id || e.contractId), r = _e(e.subId), s = Fr.getAssetId(n, r);
      return {
        type: de.Mint,
        subId: r,
        contractId: n,
        assetId: s,
        val: v(e.val),
        pc: v(e.pc),
        is: v(e.is)
      };
    }
    case "BURN": {
      const n = _e(e.id || e.contractId), r = _e(e.subId), s = Zi.getAssetId(n, r);
      return {
        type: de.Burn,
        subId: r,
        contractId: n,
        assetId: s,
        val: v(e.val),
        pc: v(e.pc),
        is: v(e.is)
      };
    }
    default:
      throw new R(S.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var hw = "https://fuellabs.github.io/block-explorer-v2", gw = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, ZI = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, c = t || hw, A = [
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
  ], f = A.filter((W) => !!W.value).map(({ key: W, value: L }) => ({
    key: W,
    value: L
  })), w = f.length > 0;
  if (f.length > 1)
    throw new R(
      S.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${A.map((W) => W.key).join(", ")}.`
    );
  if (n && f.length > 0) {
    const W = A.map(({ key: L }) => L).join(", ");
    throw new R(
      S.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${W}.`
    );
  }
  const g = w ? gw(
    f[0].key,
    f[0].value
  ) : "", C = /^\/|\/$/gm, x = n ? n.replace(C, "") : g, _ = c.replace(C, ""), B = r == null ? void 0 : r.replace(C, ""), D = B ? encodeURIComponent(B) : void 0, T = _.match(/^https?:\/\//) ? "" : "https://", G = B != null && B.match(/^https?:\/\//) ? "" : "https://";
  return `${T}${_}/${x}${D ? `?providerUrl=${G}${D}` : ""}`;
}, Zs = (e) => e.filter(
  (r) => r.type === de.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), v(0));
function bn(e, t) {
  const n = v(t.base);
  let r = v(0);
  return "unitsPerGas" in t ? r = v(e).div(v(t.unitsPerGas)) : r = v(e).mul(v(t.gasPerUnit)), n.add(r);
}
function pw(e, t, n) {
  const r = [], s = e.filter((c) => {
    if ("owner" in c || "sender" in c) {
      if ("predicate" in c && c.predicate && c.predicate !== "0x")
        return !0;
      if (!r.includes(c.witnessIndex))
        return r.push(c.witnessIndex), !0;
    }
    return !1;
  }), i = bn(t, n.vmInitialization);
  return s.reduce((c, A) => "predicate" in A && A.predicate && A.predicate !== "0x" ? c.add(
    i.add(bn(q(A.predicate).length, n.contractRoot)).add(v(A.predicateGasUsed))
  ) : c.add(n.ecr1), v(0));
}
function cd(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = bn(i, t.vmInitialization), c = v(i).mul(n), A = pw(r, i, t);
  return o.add(c).add(A).add(s).maxU64();
}
function $o(e) {
  const {
    gasPerByte: t,
    witnessesLength: n,
    witnessLimit: r,
    minGas: s,
    gasLimit: i = v(0),
    maxGasPerTx: o
  } = e;
  let c = v(0);
  r != null && r.gt(0) && r.gte(n) && (c = v(r).sub(n).mul(t));
  const A = c.add(s).add(i);
  return A.gte(o) ? o : A;
}
function ud({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = bn(r, e.contractRoot), i = bn(t, e.stateRoot), o = bn(n, e.s256), c = v(100), A = bn(c, e.s256);
  return s.add(i).add(o).add(A).maxU64();
}
function dd({
  gasCosts: e,
  txBytesSize: t
}) {
  return bn(t, e.s256);
}
var io = (e) => {
  const { gas: t, gasPrice: n, priceFactor: r, tip: s } = e;
  return t.mul(n).div(r).add(v(s));
};
function oo(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = J(e[t]);
        break;
      case "Array":
        e[t] = oo(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = oo(e[t]);
        break;
    }
  }), e;
}
function mw(e) {
  return oo(kt(e));
}
var ww = (e, t) => {
  let n = `The transaction reverted with reason: "${e}".`;
  return Og.includes(e) && (n = `${n}

You can read more about this error at:

${Lg}#variant.${e}`), new R(S.SCRIPT_REVERTED, n, {
    ...t,
    reason: e
  });
}, Cr = (e) => JSON.stringify(e, null, 2), yw = (e, t, n) => {
  let r = "The transaction reverted with an unknown reason.";
  const s = e.find(({ type: o }) => o === de.Revert);
  let i = "";
  if (s)
    switch (v(s.val).toHex()) {
      case Dg: {
        i = "require", r = `The transaction reverted because a "require" statement has thrown ${t.length ? Cr(t[0]) : "an error."}.`;
        break;
      }
      case Tg: {
        const c = t.length >= 2 ? ` comparing ${Cr(t[1])} and ${Cr(t[0])}.` : ".";
        i = "assert_eq", r = `The transaction reverted because of an "assert_eq" statement${c}`;
        break;
      }
      case Mg: {
        const c = t.length >= 2 ? ` comparing ${Cr(t[1])} and ${Cr(t[0])}.` : ".";
        i = "assert_ne", r = `The transaction reverted because of an "assert_ne" statement${c}`;
        break;
      }
      case Fg:
        i = "assert", r = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case Tu:
        i = "MissingOutputChange", r = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        throw new R(
          S.UNKNOWN,
          `The transaction reverted with an unknown reason: ${s.val}`,
          {
            ...n,
            reason: "unknown"
          }
        );
    }
  return new R(S.SCRIPT_REVERTED, r, {
    ...n,
    reason: i
  });
}, Ko = (e) => {
  const { receipts: t, statusReason: n, logs: r } = e, s = t.some(({ type: c }) => c === de.Panic), i = t.some(({ type: c }) => c === de.Revert), o = {
    logs: r,
    receipts: t,
    panic: s,
    revert: i,
    reason: ""
  };
  return s ? ww(n, o) : yw(t, r, o);
}, WI = class extends Error {
  constructor() {
    super(...arguments);
    M(this, "name", "ChangeOutputCollisionError");
    M(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, Iw = class extends Error {
  constructor(t) {
    super();
    M(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, JI = class extends Error {
  constructor(t) {
    super();
    M(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, pr = (e) => e.type === ve.Coin, ea = (e) => e.type === ve.Message, Cn = (e) => pr(e) || ea(e), Ad = (e) => pr(e) ? e.owner : e.recipient, ao = (e, t) => Ad(e) === t.toB256(), Ew = (e, t, n) => e.filter(Cn).reduce((r, s) => pr(s) && s.assetId === t || ea(s) && t === n ? r.add(s.amount) : r, v(0)), qI = (e) => e.filter(Cn).reduce(
  (t, n) => (pr(n) ? t.utxos.push(n.id) : t.messages.push(n.nonce), t),
  {
    utxos: [],
    messages: []
  }
), bw = (e, t) => e.reduce(
  (n, r) => (pr(r) && r.owner === t.toB256() ? n.utxos.push(r.id) : ea(r) && r.recipient === t.toB256() && n.messages.push(r.nonce), n),
  {
    utxos: [],
    messages: []
  }
), Cw = (e) => {
  const t = q(e);
  return {
    data: J(t),
    dataLength: t.length
  };
}, ta = class {
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
    M(this, "tip");
    /** Block until which tx cannot be included */
    M(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    M(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    M(this, "witnessLimit");
    /** List of inputs */
    M(this, "inputs", []);
    /** List of outputs */
    M(this, "outputs", []);
    /** List of witnesses */
    M(this, "witnesses", []);
    this.tip = e ? v(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = vn(r) ? v(r) : void 0, this.maxFee = v(n), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [], { tip: r, witnessLimit: s, maturity: i } = e;
    return v(r).gt(0) && (t += Mt.Tip, n.push({ data: v(r), type: Mt.Tip })), vn(s) && v(s).gte(0) && (t += Mt.WitnessLimit, n.push({ data: v(s), type: Mt.WitnessLimit })), i && i > 0 && (t += Mt.Maturity, n.push({ data: i, type: Mt.Maturity })), t += Mt.MaxFee, n.push({ data: e.maxFee, type: Mt.MaxFee }), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(cw)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(uw)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(Cw)) ?? [], { policyTypes: r, policies: s } = ta.getPolicyMeta(this);
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
    return new nn().encode(this.toTransaction());
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
    return this.addWitness(oe([De, De])), this.witnesses.length - 1;
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
      throw new Iw(e);
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
      (e) => e.type === ve.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (e) => e.type === Ee.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === Ee.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = vr(e), n = this.inputs.find((r) => {
      switch (r.type) {
        case ve.Coin:
          return J(r.owner) === t.toB256();
        case ve.Message:
          return J(r.recipient) === t.toB256();
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
      type: ve.Coin,
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
    const f = {
      nonce: i,
      type: ve.Message,
      sender: n.toB256(),
      recipient: t.toB256(),
      amount: r,
      witnessIndex: A,
      predicate: s,
      predicateData: c
    };
    this.pushInput(f), this.addChangeOutput(t, o);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return dw(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
      type: Ee.Coin,
      to: vr(e).toB256(),
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
    return t.map(Jo).forEach((n) => {
      this.pushOutput({
        type: Ee.Coin,
        to: vr(e).toB256(),
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
      (r) => J(r.assetId) === t
    ) || this.pushOutput({
      type: Ee.Change,
      to: vr(e).toB256(),
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
    return cd({
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
    return $o({
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
      i === t && (A = v("1000000000000000000")), c && "assetId" in c ? (c.id = J(Pt(Cs)), c.amount = A) : this.addResources([
        {
          id: J(Pt(Cs)),
          amount: A,
          assetId: i,
          owner: n || le.fromRandom(),
          blockCreated: v(1),
          txCreatedIdx: v(1)
        }
      ]);
    };
    s(t, v(1e11)), e.forEach((i) => s(i.assetId, i.amount));
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: t, assetId: n }) => ({
      amount: v(t),
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
    return mw(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(Cn).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(e) {
    const t = e.filter(Cn);
    this.inputs.filter(Cn).forEach((n) => {
      const r = Ad(n), s = t.find(
        (i) => ao(i, le.fromString(String(r)))
      );
      s && "predicateGasUsed" in s && v(s.predicateGasUsed).gt(0) && (n.predicateGasUsed = s.predicateGasUsed);
    });
  }
};
function ld(e, t) {
  const n = e.toTransaction();
  n.type === ke.Script && (n.receiptsRoot = De), n.inputs = n.inputs.map((i) => {
    const o = kt(i);
    switch (o.type) {
      case ve.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = v(0), o;
      case ve.Message:
        return o.predicateGasUsed = v(0), o;
      case ve.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = De, o.outputIndex = 0, o.balanceRoot = De, o.stateRoot = De, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = kt(i);
    switch (o.type) {
      case Ee.Contract:
        return o.balanceRoot = De, o.stateRoot = De, o;
      case Ee.Change:
        return o.amount = v(0), o;
      case Ee.Variable:
        return o.to = De, o.amount = v(0), o.assetId = De, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = sf(t), s = oe([r, new nn().encode(n)]);
  return yt(s);
}
var Bw = (e) => {
  const t = new Uint8Array(32);
  return t.set(q(e)), t;
}, vw = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: J(t),
    value: J(Bw(n))
  };
}, co = class extends ta {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: n, storageSlots: r, ...s }) {
    super(s);
    /** Type of the transaction */
    M(this, "type", ke.Create);
    /** Witness index of contract bytecode to create */
    M(this, "bytecodeWitnessIndex");
    /** Salt */
    M(this, "salt");
    /** List of storage slots to initialize */
    M(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = J(n ?? De), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(vw)) ?? [];
    return {
      type: ke.Create,
      ...t,
      bytecodeWitnessIndex: n,
      storageSlotsCount: v(r.length),
      salt: this.salt ? J(this.salt) : De,
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
      (t) => t.type === Ee.ContractCreated
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
    return ld(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, n) {
    this.pushOutput({
      type: Ee.ContractCreated,
      contractId: t,
      stateRoot: n
    });
  }
  metadataGas(t) {
    return ud({
      contractBytesSize: v(q(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Tc = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: q("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, xw = {
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
  bytes: q("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, kn = class extends ta {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    M(this, "type", ke.Script);
    /** Gas limit for transaction */
    M(this, "gasLimit");
    /** Script to execute */
    M(this, "script");
    /** Script input data (parameters) */
    M(this, "scriptData");
    M(this, "abis");
    this.gasLimit = v(r), this.script = q(t ?? Tc.bytes), this.scriptData = q(n ?? Tc.encodeScriptData()), this.abis = s.abis;
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
    const t = q(this.script ?? "0x"), n = q(this.scriptData ?? "0x");
    return {
      type: ke.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: v(t.length),
      scriptDataLength: v(n.length),
      receiptsRoot: De,
      script: J(t),
      scriptData: J(n)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (t) => t.type === ve.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (t) => t.type === Ee.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === Ee.Variable
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
        type: Ee.Variable
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
    return $o({
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
    const n = vr(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: ve.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: Ee.Contract,
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
    return ld(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new sn(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return dd({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, Et = (e) => {
  if (e instanceof kn || e instanceof co)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case ke.Script:
      return kn.from(e);
    case ke.Create:
      return co.from(e);
    default:
      throw new R(
        S.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${t}.`
      );
  }
}, _w = (e) => {
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
  const A = v(o.gasPerByte), f = v(o.gasPriceFactor), w = q(n), [g] = new nn().decode(w, 0), { type: C, witnesses: x, inputs: _, policies: B } = g;
  let D = v(0), T = v(0);
  if (C !== ke.Create && C !== ke.Script)
    return v(0);
  if (C === ke.Create) {
    const { bytecodeWitnessIndex: O, storageSlots: U } = g, H = v(q(x[O].data).length);
    D = ud({
      contractBytesSize: H,
      gasCosts: i,
      stateRootSize: U.length || 0,
      txBytesSize: w.length
    });
  } else {
    const { scriptGasLimit: O } = g;
    O && (T = O), D = dd({
      gasCosts: i,
      txBytesSize: w.length
    });
  }
  const G = cd({
    gasCosts: i,
    gasPerByte: v(A),
    inputs: _,
    metadataGas: D,
    txBytesSize: w.length
  }), P = (k = B.find((O) => O.type === Mt.WitnessLimit)) == null ? void 0 : k.data, W = x.reduce((O, U) => O + U.dataLength, 0), L = $o({
    gasPerByte: A,
    minGas: G,
    witnessesLength: W,
    gasLimit: T,
    witnessLimit: P,
    maxGasPerTx: c
  });
  return io({
    gasPrice: t,
    gas: L,
    priceFactor: f,
    tip: r
  });
}, Rw = ({ abi: e, receipt: t }) => {
  var w;
  const n = new sn(e), r = t.param1.toHex(8), s = n.getFunction(r), i = s.jsonFn.inputs, o = t.param2.toHex();
  let c;
  const A = s.decodeArguments(o);
  return A && (c = i.reduce((g, C, x) => {
    const _ = A[x], B = C.name;
    return B ? {
      ...g,
      // reparse to remove bn
      [B]: JSON.parse(JSON.stringify(_))
    } : g;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: c,
    ...(w = t.amount) != null && w.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function Sw(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function na(e, t) {
  return e.filter((n) => n.type === t);
}
function Qw(e) {
  return na(e, ve.Coin);
}
function Nw(e) {
  return na(e, ve.Message);
}
function Dw(e) {
  return Sw(e, [ve.Coin, ve.Message]);
}
function Tw(e) {
  return na(e, ve.Contract);
}
function fd(e, t) {
  const n = Qw(e), r = Nw(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function Fw(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== ve.Contract)
      throw new R(
        S.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function ra(e) {
  return e.type === ve.Coin ? e.owner.toString() : e.type === ve.Message ? e.recipient.toString() : "";
}
function Jr(e, t) {
  return e.filter((n) => n.type === t);
}
function Mw(e) {
  return Jr(e, Ee.ContractCreated);
}
function hd(e) {
  return Jr(e, Ee.Coin);
}
function Ow(e) {
  return Jr(e, Ee.Change);
}
function Lw(e) {
  return Jr(e, Ee.Contract);
}
function jI(e) {
  return Jr(e, Ee.Variable);
}
var kw = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e))(kw || {}), Pw = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(Pw || {}), Uw = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(Uw || {}), Gw = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(Gw || {}), zw = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(zw || {});
function Lr(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function gd(e) {
  switch (e) {
    case ke.Mint:
      return "Mint";
    case ke.Create:
      return "Create";
    case ke.Script:
      return "Script";
    default:
      throw new R(
        S.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${e}.`
      );
  }
}
function qr(e, t) {
  return gd(e) === t;
}
function Hw(e) {
  return qr(
    e,
    "Mint"
    /* Mint */
  );
}
function pd(e) {
  return qr(
    e,
    "Create"
    /* Create */
  );
}
function md(e) {
  return qr(
    e,
    "Script"
    /* Script */
  );
}
function Xw(e) {
  return qr(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function Vw(e) {
  return qr(
    e,
    "Upload"
    /* Upload */
  );
}
function $I(e) {
  return (t) => e.assetId === t.assetId;
}
function Yw(e) {
  return Lr(e, de.Call);
}
function Zw(e) {
  return Lr(e, de.MessageOut);
}
var Ww = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((c) => c.assetId === o.assetId)
  );
  return n.map((o) => {
    const c = r.find((f) => f.assetId === o.assetId);
    if (!c)
      return o;
    const A = v(o.amount).add(c.amount);
    return { ...o, amount: A };
  }).concat(s);
};
function Jw(e, t) {
  var n, r, s, i, o, c, A, f;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((c = t.from) == null ? void 0 : c.type) && ((A = e.to) == null ? void 0 : A.type) === ((f = t.to) == null ? void 0 : f.type);
}
function dr(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((c) => Jw(c, t));
  if (n[r]) {
    const c = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? Ww(c, t) : t.assetsSent), (o = t.calls) != null && o.length && (c.calls = [...c.calls || [], ...t.calls]), n[r] = c;
  } else
    n.push(t);
  return n;
}
function KI(e) {
  return Lr(e, de.TransferOut);
}
function qw({
  inputs: e,
  receipts: t,
  baseAssetId: n
}) {
  return Zw(t).reduce(
    (i, o) => {
      const c = fd(e, n);
      if (c) {
        const A = ra(c);
        return dr(i, {
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
function jw({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = Yw(n);
  return Lw(t).reduce((f, w) => {
    const g = Fw(e, w.inputIndex);
    return g ? o.reduce((x, _) => {
      var B;
      if (_.to === g.contractID) {
        const D = fd(e, _.assetId);
        if (D) {
          const T = ra(D), G = [], P = r == null ? void 0 : r[g.contractID];
          return P && G.push(
            Rw({
              abi: P,
              receipt: _,
              rawPayload: s,
              maxInputs: i
            })
          ), dr(x, {
            name: "Contract call",
            from: {
              type: 1,
              address: T
            },
            to: {
              type: 0,
              address: _.to
            },
            // if no amount is forwarded to the contract, skip showing assetsSent
            assetsSent: (B = _.amount) != null && B.isZero() ? void 0 : [
              {
                amount: _.amount,
                assetId: _.assetId
              }
            ],
            calls: G
          });
        }
      }
      return x;
    }, f) : f;
  }, []);
}
function $w(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const c = t.some((f) => f.contractID === r) ? 0 : 1;
  if (De === o) {
    const f = n.find((w) => w.assetId === s);
    o = (f == null ? void 0 : f.to) || o;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((f) => f.contractID === o) ? 0 : 1,
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
function Fc({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = hd(t), i = Tw(e), o = Ow(t);
  s.forEach((f) => {
    const { amount: w, assetId: g, to: C } = f, x = o.find((_) => _.assetId === g);
    x && (r = dr(r, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: x.to
      },
      to: {
        type: 1,
        address: C
      },
      assetsSent: [
        {
          assetId: g,
          amount: w
        }
      ]
    }));
  });
  const c = Lr(
    n,
    de.Transfer
  ), A = Lr(
    n,
    de.TransferOut
  );
  return [...c, ...A].forEach((f) => {
    const w = $w(f, i, o);
    r = dr(r, w);
  }), r;
}
function Kw(e) {
  return hd(e).reduce((r, s) => dr(r, {
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
function ey({ inputs: e, outputs: t }) {
  const n = Mw(t), r = Dw(e)[0], s = ra(r);
  return n.reduce((o, c) => dr(o, {
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
function ty({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o,
  baseAssetId: c
}) {
  return pd(e) ? [
    ...ey({ inputs: t, outputs: n }),
    ...Fc({ inputs: t, outputs: n, receipts: r })
  ] : md(e) ? [
    ...Fc({ inputs: t, outputs: n, receipts: r }),
    ...jw({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...qw({ inputs: t, receipts: r, baseAssetId: c })
  ] : [...Kw(n)];
}
var yn = (e) => {
  const t = fw(e);
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
}, ny = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, ry = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, sy = (e) => {
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
      throw new R(
        S.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, iy = (e) => {
  let t, n, r, s, i, o = !1, c = !1, A = !1;
  if (e != null && e.type)
    switch (r = sy(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, n = e.block.id, c = !0, s = v(e.totalFee), i = v(e.totalGas);
        break;
      case "FailureStatus":
        t = e.time, n = e.block.id, o = !0, s = v(e.totalFee), i = v(e.totalGas);
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
function Ws(e) {
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
    maxInputs: f,
    gasCosts: w,
    maxGasPerTx: g,
    gasPrice: C,
    baseAssetId: x
  } = e, _ = Zs(n), B = J(o), D = ty({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: B,
    abiMap: A,
    maxInputs: f,
    baseAssetId: x
  }), T = gd(i.type), G = v((l = (u = i.policies) == null ? void 0 : u.find((m) => m.type === Mt.Tip)) == null ? void 0 : l.data), { isStatusFailure: P, isStatusPending: W, isStatusSuccess: L, blockId: Q, status: k, time: O, totalFee: U } = iy(c), H = _w({
    totalFee: U,
    gasPrice: C,
    rawPayload: B,
    tip: G,
    consensusParameters: {
      gasCosts: w,
      maxGasPerTx: g,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), X = ny(n), K = ry(n);
  let b;
  return O && (b = Eo.fromTai64(O)), {
    id: t,
    tip: G,
    fee: H,
    gasUsed: _,
    operations: D,
    type: T,
    blockId: Q,
    time: O,
    status: k,
    receipts: n,
    mintedAssets: X,
    burnedAssets: K,
    isTypeMint: Hw(i.type),
    isTypeCreate: pd(i.type),
    isTypeScript: md(i.type),
    isTypeUpgrade: Xw(i.type),
    isTypeUpload: Vw(i.type),
    isStatusFailure: P,
    isStatusSuccess: L,
    isStatusPending: W,
    date: b,
    transaction: i
  };
}
function sa(e, t, n = {}) {
  return e.reduce((r, s) => {
    if (s.type === de.LogData || s.type === de.Log) {
      const i = new sn(n[s.id] || t), o = s.type === de.Log ? new F("u64").encode(s.val0) : s.data, [c] = i.decodeLog(o, s.val1.toString());
      r.push(c);
    }
    return r;
  }, []);
}
var uo = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t, n) {
    /** Transaction ID */
    M(this, "id");
    /** Current provider */
    M(this, "provider");
    /** Gas used on the transaction */
    M(this, "gasUsed", v(0));
    /** The graphql Transaction with receipts object. */
    M(this, "gqlTransaction");
    M(this, "abis");
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
    const r = new uo(e, t, n);
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
    return (t = new nn().decode(
      q(e.rawPayload),
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
    const s = r.map(yn) || [], { gasPerByte: i, gasPriceFactor: o, gasCosts: c, maxGasPerTx: A } = this.provider.getGasConfig(), f = await this.provider.getLatestGasPrice(), w = this.provider.getChain().consensusParameters.txParameters.maxInputs, g = this.provider.getBaseAssetId();
    return Ws({
      id: this.id,
      receipts: s,
      transaction: n,
      transactionBytes: q(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: i,
      gasPriceFactor: o,
      abiMap: e,
      maxInputs: w,
      gasCosts: c,
      maxGasPerTx: A,
      gasPrice: f,
      baseAssetId: g
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
        throw new R(
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
    this.abis && (r = sa(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), n.logs = r);
    const { gqlTransaction: s, receipts: i } = n;
    if (((o = s.status) == null ? void 0 : o.type) === "FailureStatus") {
      const { reason: c } = s.status;
      throw Ko({
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
function oy(e, t) {
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
function wd(e, t, n = 0) {
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
      const A = oy(t, c);
      return await LA(A), wd(e, t, c)(...r);
    }
  };
}
var Mc = 10, Oc = 512, ay = 5, cy = 2e4, uy = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, {
    contractParams: i,
    feeParams: o,
    predicateParams: c,
    scriptParams: A,
    txParams: f,
    gasCosts: w,
    baseAssetId: g,
    chainId: C,
    version: x
  } = r;
  return {
    name: t,
    baseChainHeight: v(n),
    consensusParameters: {
      version: x,
      chainId: v(C),
      baseAssetId: g,
      feeParameters: {
        version: o.version,
        gasPerByte: v(o.gasPerByte),
        gasPriceFactor: v(o.gasPriceFactor)
      },
      contractParameters: {
        version: i.version,
        contractMaxSize: v(i.contractMaxSize),
        maxStorageSlots: v(i.maxStorageSlots)
      },
      txParameters: {
        version: f.version,
        maxInputs: v(f.maxInputs),
        maxOutputs: v(f.maxOutputs),
        maxWitnesses: v(f.maxWitnesses),
        maxGasPerTx: v(f.maxGasPerTx),
        maxSize: v(f.maxSize),
        maxBytecodeSubsections: v(f.maxBytecodeSubsections)
      },
      predicateParameters: {
        version: c.version,
        maxPredicateLength: v(c.maxPredicateLength),
        maxPredicateDataLength: v(c.maxPredicateDataLength),
        maxGasPerPredicate: v(c.maxGasPerPredicate),
        maxMessageDataLength: v(c.maxMessageDataLength)
      },
      scriptParameters: {
        version: A.version,
        maxScriptLength: v(A.maxScriptLength),
        maxScriptDataLength: v(A.maxScriptDataLength)
      },
      gasCosts: w
    },
    latestBlock: {
      id: s.id,
      height: v(s.height),
      time: s.header.time,
      transactions: s.transactions.map((_) => ({
        id: _.id
      }))
    }
  };
}, Ao, yd, Xt = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, wn(this, Ao), Te(this, "operations"), Te(this, "cache"), Te(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations();
    const { cacheUtxo: n } = this.options;
    vn(n) ? n !== -1 ? this.cache = new Nc(n) : this.cache = void 0 : this.cache = new Nc(cy);
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    Xt.nodeInfoCache = {}, Xt.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return wd(async (...r) => {
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
    const n = new Xt(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   *
   * @returns the chain information configuration.
   */
  getChain() {
    const e = Xt.chainInfoCache[this.url];
    if (!e)
      throw new R(
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
    const e = Xt.nodeInfoCache[this.url];
    if (!e)
      throw new R(
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
    return Xt.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  /**
   * @hidden
   */
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = $d(e.nodeVersion);
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
    const e = Xt.getFetchFn(this.options), t = new Cg.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options),
      responseMiddleware: (r) => {
        if ("response" in r) {
          const s = r.response;
          if (Array.isArray(s == null ? void 0 : s.errors))
            throw new R(
              R.CODES.INVALID_REQUEST,
              s.errors.map((i) => i.message).join(`

`)
            );
        }
      }
    });
    return ow((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new ad({
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
    return v(e.latestBlock.height, 10);
  }
  /**
   * Returns the node information for the current provider network.
   *
   * @returns a promise that resolves to the node information.
   */
  async fetchNode() {
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = {
      maxDepth: v(e.maxDepth),
      maxTx: v(e.maxTx),
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace
    };
    return Xt.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = uy(e);
    return Xt.chainInfoCache[this.url] = t, t;
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
  async sendTransaction(e, { estimateTxDependencies: t = !0 } = {}) {
    const n = Et(e);
    t && await this.estimateTxDependencies(n);
    const r = J(n.toTransactionBytes());
    let s;
    n.type === ke.Script && (s = n.abis);
    const {
      submit: { id: i }
    } = await this.operations.submit({ encodedTransaction: r });
    return so(this, Ao, yd).call(this, n.inputs), new uo(i, this, s);
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
    const r = Et(e);
    if (n)
      return this.estimateTxDependencies(r);
    const s = J(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: t || !1
    }), [{ receipts: o, status: c }] = i;
    return { receipts: o.map(yn), dryRunStatus: c };
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
      (i) => "predicate" in i && i.predicate && !fu(q(i.predicate), q("0x")) && new Oe(i.predicateGasUsed).isZero()
    ))
      return e;
    const n = J(e.toTransactionBytes()), r = await this.operations.estimatePredicates({
      encodedTransaction: n
    }), {
      estimatePredicates: { inputs: s }
    } = r;
    return s && s.forEach((i, o) => {
      "predicateGasUsed" in i && v(i.predicateGasUsed).gt(0) && (e.inputs[o].predicateGasUsed = i.predicateGasUsed);
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
    if (e.type === ke.Create)
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let t = [];
    const n = [];
    let r = 0, s;
    for (let i = 0; i < Mc; i++) {
      const {
        dryRun: [{ receipts: o, status: c }]
      } = await this.operations.dryRun({
        encodedTransactions: [J(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(yn), s = c;
      const { missingOutputVariables: A, missingOutputContractIds: f } = Dc(t);
      if (A.length !== 0 || f.length !== 0) {
        r += A.length, e.addVariableOutputs(A.length), f.forEach(({ contractId: C }) => {
          e.addContractInputAndOutput(le.fromString(C)), n.push(C);
        });
        const { maxFee: g } = await this.estimateTxGasAndFee({
          transactionRequest: e
        });
        e.maxFee = g;
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
    })), n = kt(e), r = /* @__PURE__ */ new Map();
    n.forEach((o, c) => {
      o.type === ke.Script && r.set(c, J(o.toTransactionBytes()));
    });
    let s = Array.from(r.keys()), i = 0;
    for (; s.length > 0 && i < Mc; ) {
      const o = s.map(
        (f) => r.get(f)
      ), c = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), A = [];
      for (let f = 0; f < c.dryRun.length; f++) {
        const w = s[f], { receipts: g, status: C } = c.dryRun[f], x = t[w];
        x.receipts = g.map(yn), x.dryRunStatus = C;
        const { missingOutputVariables: _, missingOutputContractIds: B } = Dc(
          x.receipts
        ), D = _.length > 0 || B.length > 0, T = n[w];
        if (D && (T == null ? void 0 : T.type) === ke.Script) {
          x.outputVariables += _.length, T.addVariableOutputs(_.length), B.forEach(({ contractId: P }) => {
            T.addContractInputAndOutput(le.fromString(P)), x.missingContractIds.push(P);
          });
          const { maxFee: G } = await this.estimateTxGasAndFee({
            transactionRequest: T
          });
          T.maxFee = G, r.set(w, J(T.toTransactionBytes())), A.push(w);
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
    const r = e.map((o) => J(o.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: r,
      utxoValidation: t || !1
    });
    return s.map(({ receipts: o, status: c }) => ({ receipts: o.map(yn), dryRunStatus: c }));
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
    const c = io({
      gasPrice: v(n),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let A = v(0);
    t.type === ke.Script && (A = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(r, o)
    ), A = t.gasLimit));
    const f = t.calculateMaxGas(r, o), w = io({
      gasPrice: v(n),
      gas: f,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: c,
      maxGas: f,
      maxFee: w,
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
    const n = Et(e);
    if (t)
      return this.estimateTxDependencies(n);
    const r = [J(n.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: r,
      utxoValidation: !0
    });
    return { receipts: s.map((o) => {
      const { id: c, receipts: A, status: f } = o, w = A.map(yn);
      return { id: c, receipts: w, status: f };
    })[0].receipts };
  }
  /**
   * @hidden
   *
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the transaction.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param transactionCostParams - The transaction cost parameters (optional).
   *
   * @returns A promise that resolves to the transaction cost object.
   */
  async getTransactionCost(e, { signatureCallback: t } = {}) {
    const n = kt(Et(e)), r = n.type === ke.Script, s = n.maxFee.eq(0);
    r && (n.gasLimit = v(0));
    const i = kt(n);
    let o = 0;
    if (t && r) {
      const G = i.witnesses.length;
      await t(i), o = i.witnesses.length - G;
    }
    await this.estimatePredicates(i), n.updatePredicateGasUsed(i.inputs);
    let { maxFee: c, maxGas: A, minFee: f, minGas: w, gasPrice: g, gasLimit: C } = await this.estimateTxGasAndFee({
      transactionRequest: i
    }), x = [], _, B = [], D = 0, T = v(0);
    if (n.maxFee = c, r) {
      if (n.gasLimit = C, t && await t(n), { receipts: x, missingContractIds: B, outputVariables: D, dryRunStatus: _ } = await this.estimateTxDependencies(n), _ && "reason" in _)
        throw this.extractDryRunError(n, x, _);
      T = Zs(x), n.gasLimit = T, { maxFee: c, maxGas: A, minFee: f, minGas: w, gasPrice: g } = await this.estimateTxGasAndFee({
        transactionRequest: n,
        gasPrice: g
      });
    }
    return {
      receipts: x,
      gasUsed: T,
      gasPrice: g,
      minGas: w,
      maxGas: A,
      minFee: f,
      maxFee: c,
      outputVariables: D,
      missingContractIds: B,
      addedSignatures: o,
      estimatedPredicates: n.inputs,
      dryRunStatus: _,
      updateMaxFee: s
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
    const r = le.fromAddressOrString(e), {
      coins: { edges: s, pageInfo: i }
    } = await this.operations.getCoins({
      ...this.validatePaginationArgs({
        paginationLimit: Oc,
        inputArgs: n
      }),
      filter: { owner: r.toB256(), assetId: t && J(t) }
    });
    return {
      coins: s.map(({ node: c }) => ({
        id: c.utxoId,
        assetId: c.assetId,
        amount: v(c.amount),
        owner: le.fromAddressOrString(c.owner),
        blockCreated: v(c.blockCreated),
        txCreatedIdx: v(c.txCreatedIdx)
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
    var A, f, w;
    const r = le.fromAddressOrString(e), s = {
      messages: ((A = n == null ? void 0 : n.messages) == null ? void 0 : A.map((g) => J(g))) || [],
      utxos: ((f = n == null ? void 0 : n.utxos) == null ? void 0 : f.map((g) => J(g))) || []
    };
    if (this.cache) {
      const g = new Set(
        s.utxos.concat((w = this.cache) == null ? void 0 : w.getActiveData().map((C) => J(C)))
      );
      s.utxos = Array.from(g);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(Jo).map(({ assetId: g, amount: C, max: x }) => ({
        assetId: J(g),
        amount: C.toString(10),
        max: x ? x.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((g) => {
      switch (g.type) {
        case "MessageCoin":
          return {
            amount: v(g.amount),
            assetId: g.assetId,
            daHeight: v(g.daHeight),
            sender: le.fromAddressOrString(g.sender),
            recipient: le.fromAddressOrString(g.recipient),
            nonce: g.nonce
          };
        case "Coin":
          return {
            id: g.utxoId,
            amount: v(g.amount),
            assetId: g.assetId,
            owner: le.fromAddressOrString(g.owner),
            blockCreated: v(g.blockCreated),
            txCreatedIdx: v(g.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((g) => !!g);
  }
  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block or null.
   */
  async getBlock(e) {
    let t;
    typeof e == "number" ? t = { height: v(e).toString(10) } : e === "latest" ? t = { height: (await this.getBlockNumber()).toString(10) } : e.length === 66 ? t = { blockId: e } : t = { blockId: v(e).toString(10) };
    const { block: n } = await this.operations.getBlock(t);
    return n ? {
      id: n.id,
      height: v(n.height),
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
        paginationLimit: ay,
        inputArgs: e
      })
    });
    return { blocks: t.map(({ node: s }) => ({
      id: s.id,
      height: v(s.height),
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
    typeof e == "number" ? t = { blockHeight: v(e).toString(10) } : e === "latest" ? t = { blockHeight: (await this.getBlockNumber()).toString() } : t = { blockId: e };
    const { block: n } = await this.operations.getBlockWithTransactions(t);
    return n ? {
      id: n.id,
      height: v(n.height, 10),
      time: n.header.time,
      transactionIds: n.transactions.map((r) => r.id),
      transactions: n.transactions.map(
        (r) => {
          var s;
          return (s = new nn().decode(q(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new nn().decode(
      q(t.rawPayload),
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
    } = await this.operations.getTransactions(e), r = new nn();
    return { transactions: t.map(
      ({ node: { rawPayload: i } }) => r.decode(q(i), 0)[0]
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
      contract: le.fromAddressOrString(e).toB256(),
      asset: J(t)
    });
    return v(n.amount, 10);
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
      assetId: J(t)
    });
    return v(n.amount, 10);
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
      filter: { owner: le.fromAddressOrString(e).toB256() }
    });
    return { balances: t.map(({ node: r }) => ({
      assetId: r.assetId,
      amount: v(r.amount)
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
        paginationLimit: Oc
      }),
      owner: le.fromAddressOrString(e).toB256()
    });
    return {
      messages: n.map(({ node: i }) => ({
        messageId: Tr.getMessageId({
          sender: i.sender,
          recipient: i.recipient,
          nonce: i.nonce,
          amount: v(i.amount),
          data: i.data
        }),
        sender: le.fromAddressOrString(i.sender),
        recipient: le.fromAddressOrString(i.recipient),
        nonce: i.nonce,
        amount: v(i.amount),
        data: Tr.decodeData(i.data),
        daHeight: v(i.daHeight)
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
      throw new R(
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
      blockProof: f,
      sender: w,
      recipient: g,
      amount: C,
      data: x
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: v(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: v(f.proofIndex),
        proofSet: f.proofSet
      },
      messageBlockHeader: {
        id: c.id,
        daHeight: v(c.daHeight),
        transactionsCount: Number(c.transactionsCount),
        transactionsRoot: c.transactionsRoot,
        height: v(c.height),
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
        daHeight: v(A.daHeight),
        transactionsCount: Number(A.transactionsCount),
        transactionsRoot: A.transactionsRoot,
        height: v(A.height),
        prevRoot: A.prevRoot,
        time: A.time,
        applicationHash: A.applicationHash,
        messageReceiptCount: Number(A.messageReceiptCount),
        messageOutboxRoot: A.messageOutboxRoot,
        consensusParametersVersion: Number(A.consensusParametersVersion),
        eventInboxRoot: A.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(A.stateTransitionBytecodeVersion)
      },
      sender: le.fromAddressOrString(w),
      recipient: le.fromAddressOrString(g),
      nonce: t,
      amount: v(C),
      data: x
    };
  }
  /**
   * Get the latest gas price from the node.
   *
   * @returns A promise that resolves to the latest gas price.
   */
  async getLatestGasPrice() {
    const { latestGasPrice: e } = await this.operations.getLatestGasPrice();
    return v(e.gasPrice);
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
    return v(t.gasPrice);
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
      blocksToProduce: v(e).toString(10),
      startTimestamp: t ? Eo.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return v(n);
  }
  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new uo(e, this);
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
      throw new R(
        S.INVALID_INPUT_PARAMETERS,
        'Pagination arguments "after" and "before" cannot be used together'
      );
    if ((r || 0) > t || (s || 0) > t)
      throw new R(
        S.INVALID_INPUT_PARAMETERS,
        `Pagination limit for this query cannot exceed ${t} items`
      );
    if (r && o)
      throw new R(
        S.INVALID_INPUT_PARAMETERS,
        'The use of pagination argument "first" with "before" is not supported'
      );
    if (s && i)
      throw new R(
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
    return e.abis && (s = sa(
      t,
      e.abis.main,
      e.abis.otherContractsAbis
    )), Ko({
      logs: s,
      receipts: t,
      statusReason: r.reason
    });
  }
}, Ts = Xt;
Ao = /* @__PURE__ */ new WeakSet();
yd = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === ve.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
Te(Ts, "chainInfoCache", {});
Te(Ts, "nodeInfoCache", {});
async function eE(e) {
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new R(
      S.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new nn().decode(
    q(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const c = o.map(yn), {
    consensusParameters: {
      feeParameters: { gasPerByte: A, gasPriceFactor: f },
      txParameters: { maxInputs: w, maxGasPerTx: g },
      gasCosts: C
    }
  } = n.getChain(), x = await n.getLatestGasPrice(), _ = n.getBaseAssetId(), B = Ws({
    id: s.id,
    receipts: c,
    transaction: i,
    transactionBytes: q(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: v(A),
    gasPriceFactor: v(f),
    abiMap: r,
    maxInputs: w,
    gasCosts: C,
    maxGasPerTx: g,
    gasPrice: x,
    baseAssetId: _
  });
  return {
    gqlTransaction: s,
    ...B
  };
}
async function tE(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.dryRun(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c, maxGasPerTx: A } = t.getGasConfig(), f = t.getChain().consensusParameters.txParameters.maxInputs, w = n.toTransaction(), g = n.toTransactionBytes(), C = await t.getLatestGasPrice(), x = t.getBaseAssetId();
  return Ws({
    receipts: s,
    transaction: w,
    transactionBytes: g,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: f,
    gasCosts: c,
    maxGasPerTx: A,
    gasPrice: C,
    baseAssetId: x
  });
}
async function nE(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: {
      feeParameters: { gasPerByte: c, gasPriceFactor: A },
      txParameters: { maxInputs: f, maxGasPerTx: w },
      gasCosts: g
    }
  } = n.getChain(), C = await n.getLatestGasPrice(), x = n.getBaseAssetId();
  return {
    transactions: i.map((B) => {
      const { node: D } = B, { id: T, rawPayload: G, status: P } = D, [W] = new nn().decode(q(G), 0);
      let L = [];
      D != null && D.status && "receipts" in D.status && (L = D.status.receipts);
      const Q = L.map(yn), k = Ws({
        id: T,
        receipts: Q,
        transaction: W,
        transactionBytes: q(G),
        gqlTransactionStatus: P,
        abiMap: r,
        gasPerByte: c,
        gasPriceFactor: A,
        maxInputs: f,
        gasCosts: g,
        maxGasPerTx: w,
        gasPrice: C,
        baseAssetId: x
      });
      return {
        gqlTransaction: D,
        ...k
      };
    }),
    pageInfo: o
  };
}
var Jn = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    devnet: 0,
    testnet: 0
  }
}, dy = (e) => {
  if (e === "ethereum")
    return Jn.eth.sepolia;
  if (e === "fuel")
    return Jn.fuel.testnet;
}, Ay = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), Id = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? dy(n);
  if (i === void 0)
    return;
  const o = Ay({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, rE = (e, t) => Id({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), sE = (e, t) => Id({
  asset: e,
  networkType: "fuel",
  chainId: t
}), ly = "/", fy = /^\/|\/$/g, hy = (e = "") => e.replace(fy, "");
function gy(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(hy);
  return r && n && s.unshift(""), s.join(ly);
}
function py(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: gy(t, n.icon)
  }));
}
var my = "https://cdn.fuel.network/assets/", wy = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: Jn.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: Jn.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: Jn.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: Jn.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      }
    ]
  }
], iE = py(wy, my), Lc = (...e) => {
  const t = {};
  function n({ amount: r, assetId: s }) {
    t[s] ? t[s] = t[s].add(r) : t[s] = r;
  }
  return e.forEach((r) => r.forEach(n)), Object.entries(t).map(([r, s]) => ({ assetId: r, amount: s }));
}, yy = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new F("u64").encode(new Oe(n).toNumber());
  return Uint8Array.from([
    ...q(r),
    ...i,
    ...q(t)
  ]);
}, Iy = async (e) => {
  const t = yy(e);
  await Vo();
  const n = Ug(16, 0, zg.ScriptData), r = mc(17, 16, 32), s = Ki(18, 17, 0), i = mc(19, 17, 8), o = Pg(16, 18, 19), c = Ou(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...c.to_bytes()
  ]), scriptData: t };
}, Ey = 2, Js = class extends su {
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
    M(this, "address");
    /**
     * The provider used to interact with the network.
     */
    M(this, "_provider");
    /**
     * The connector for use with external wallets
     */
    M(this, "_connector");
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
      throw new R(S.MISSING_PROVIDER, "Provider not set");
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
    var T;
    const { addedSignatures: r, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: o } = n, c = t.maxFee, A = this.provider.getBaseAssetId(), f = ((T = i.find((G) => G.assetId === A)) == null ? void 0 : T.amount) || v(0), w = sm({
      amount: v(c),
      assetId: A,
      coinQuantities: i
    }), g = {};
    w.forEach(({ amount: G, assetId: P }) => {
      g[P] = {
        required: G,
        owned: v(0)
      };
    }), t.inputs.filter(Cn).forEach((G) => {
      const W = pr(G) ? String(G.assetId) : A;
      g[W] && (g[W].owned = g[W].owned.add(G.amount));
    });
    let C = [];
    Object.entries(g).forEach(([G, { owned: P, required: W }]) => {
      P.lt(W) && C.push({
        assetId: G,
        amount: W.sub(P)
      });
    });
    let x = C.length > 0, _ = 0;
    for (; x && _ < Ey; ) {
      const G = await this.getResourcesToSpend(
        C,
        bw(t.inputs, this.address)
      );
      t.addResources(G), t.updatePredicateGasUsed(s);
      const P = kt(t);
      if (r && Array.from({ length: r }).forEach(
        () => P.addEmptyWitness()
      ), !o)
        break;
      const { maxFee: W } = await this.provider.estimateTxGasAndFee({
        transactionRequest: P
      }), L = Ew(
        t.inputs,
        A,
        A
      ), Q = f.add(W);
      L.gt(Q) ? x = !1 : C = [
        {
          amount: Q.sub(L),
          assetId: A
        }
      ], _ += 1;
    }
    t.updatePredicateGasUsed(s);
    const B = kt(t);
    if (r && Array.from({ length: r }).forEach(() => B.addEmptyWitness()), !o)
      return t;
    const { maxFee: D } = await this.provider.estimateTxGasAndFee({
      transactionRequest: B
    });
    return t.maxFee = D, t;
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
    let i = new kn(s);
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
    let r = new kn(n);
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
      le.fromAddressOrString(r),
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
    if (v(n).lte(0))
      throw new R(
        S.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = le.fromAddressOrString(t), o = r ?? this.provider.getBaseAssetId(), { script: c, scriptData: A } = await Iy({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: v(n),
      assetId: o
    });
    let f = new kn({
      ...s,
      script: c,
      scriptData: A
    });
    f.addContractInputAndOutput(i);
    const w = await this.getTransactionCost(f, {
      quantities: [{ amount: v(n), assetId: String(o) }]
    });
    return f = this.validateGasLimitAndMaxFee({
      transactionRequest: f,
      gasUsed: w.gasUsed,
      maxFee: w.maxFee,
      txParams: s
    }), await this.fund(f, w), this.sendTransaction(f);
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
    const s = le.fromAddressOrString(t), i = q(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = q(
      "0x".concat(v(n).toHex().substring(2).padStart(16, "0"))
    ), A = { script: new Uint8Array([
      ...q(xw.bytes),
      ...i,
      ...o
    ]), ...r }, f = this.provider.getBaseAssetId();
    let w = new kn(A);
    const g = [{ amount: v(n), assetId: f }], C = await this.getTransactionCost(w, { quantities: g });
    return w = this.validateGasLimitAndMaxFee({
      transactionRequest: w,
      gasUsed: C.gasUsed,
      maxFee: C.maxFee,
      txParams: r
    }), await this.fund(w, C), this.sendTransaction(w);
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
  async getTransactionCost(t, { signatureCallback: n, quantities: r = [] } = {}) {
    const s = kt(Et(t)), i = this.provider.getBaseAssetId(), o = s.getCoinOutputsQuantities(), c = Lc(o, r), A = [{ assetId: i, amount: v("100000000000000000") }], f = this.generateFakeResources(
      Lc(c, A)
    );
    return s.addResources(f), {
      ...await this.provider.getTransactionCost(s, {
        signatureCallback: n
      }),
      requiredQuantities: c
    };
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
      throw new R(S.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
      throw new R(
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
  async sendTransaction(t, { estimateTxDependencies: n = !0 } = {}) {
    if (this._connector)
      return this.provider.getTransactionResponse(
        await this._connector.sendTransaction(this.address.toString(), t)
      );
    const r = Et(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.sendTransaction(r, {
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
    const r = Et(t);
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
      id: J(Pt(Cs)),
      owner: this.address,
      blockCreated: v(1),
      txCreatedIdx: v(1),
      ...n
    }));
  }
  /** @hidden * */
  validateTransferAmount(t) {
    if (v(t).lte(0))
      throw new R(
        S.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
  }
  /** @hidden * */
  async estimateAndFundTransaction(t, n) {
    let r = t;
    const s = await this.getTransactionCost(r);
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
    const o = Et(r);
    if (!vn(s))
      o.gasLimit = t;
    else if (t.gt(s))
      throw new R(
        S.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!vn(i))
      o.maxFee = n;
    else if (n.gt(i))
      throw new R(
        S.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${n}'.`
      );
    return o;
  }
}, Ar = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    M(this, "address");
    M(this, "publicKey");
    M(this, "compressedPublicKey");
    M(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = tn(e, 32);
    this.privateKey = J(t), this.publicKey = J(fn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = J(fn.getPublicKey(t, !0)), this.address = le.fromPublicKey(this.publicKey);
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
    const t = fn.sign(q(e), q(this.privateKey)), n = tn(`0x${t.r.toString(16)}`, 32), r = tn(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, J(oe([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = fn.ProjectivePoint.fromHex(q(this.compressedPublicKey)), n = fn.ProjectivePoint.fromHex(q(e));
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
    const n = q(t), r = n.slice(0, 32), s = n.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const c = new fn.Signature(BigInt(J(r)), BigInt(J(s))).addRecoveryBit(
      i
    ).recoverPublicKey(q(e)).toRawBytes(!1).slice(1);
    return J(c);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return le.fromPublicKey(Ar.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? rn(oe([Pt(32), q(e)])) : Pt(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = fn.ProjectivePoint.fromHex(q(e));
    return J(t.toRawBytes(!1).slice(1));
  }
}, kc = 13, Pc = 8, Uc = 1, Qi = 32, by = 16, Gc = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function Cy(e, t, n) {
  const r = En(Gc(e), "hex"), s = le.fromAddressOrString(t), i = Pt(Qi), o = U0({
    password: En(n),
    salt: i,
    dklen: Qi,
    n: 2 ** kc,
    r: Pc,
    p: Uc
  }), c = Pt(by), A = await tf(r, o, c), f = Uint8Array.from([...o.subarray(16, 32), ...A]), w = G0(f), g = Br(w, "hex"), C = {
    id: Fp(),
    version: 3,
    address: Gc(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: g,
      cipherparams: { iv: Br(c, "hex") },
      ciphertext: Br(A, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Qi,
        n: 2 ** kc,
        p: Uc,
        r: Pc,
        salt: Br(i, "hex")
      }
    }
  };
  return JSON.stringify(C);
}
async function By(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: A, p: f, salt: w }
    }
  } = n, g = En(s, "hex"), C = En(i, "hex"), x = En(w, "hex"), _ = En(t), B = U0({
    password: _,
    salt: x,
    n: c,
    p: f,
    r: A,
    dklen: o
  }), D = Uint8Array.from([...B.subarray(16, 32), ...g]), T = G0(D), G = Br(T, "hex");
  if (r !== G)
    throw new R(
      S.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const P = await ef(g, B, C);
  return J(P);
}
var Ed = class extends Js {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new Ar(t);
    super(r.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    M(this, "signer");
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
    const n = await this.signer().sign(of(t));
    return J(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = Et(t), r = this.provider.getChainId(), s = n.getTransactionId(r), i = await this.signer().sign(s);
    return J(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = Et(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @param estimateTxDependencies - Whether to estimate the transaction dependencies.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, { estimateTxDependencies: n = !1 } = {}) {
    const r = Et(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(r),
      { estimateTxDependencies: !1 }
    );
  }
  /**
   * Populates the witness signature for a transaction and sends a call to the network using `provider.dryRun`.
   *
   * @param transactionRequestLike - The transaction request to simulate.
   * @returns A promise that resolves to the CallResult object.
   */
  async simulateTransaction(t, { estimateTxDependencies: n = !0 } = {}) {
    const r = Et(t);
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
    return Cy(this.privateKey, this.address, t);
  }
};
Te(Ed, "defaultPath", "m/44'/1179993420'/0'/0/0");
var as = [
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
], vy = /* @__PURE__ */ ((e) => (e.english = "english", e))(vy || {});
function xy(e) {
  return (1 << e) - 1;
}
function bd(e) {
  return (1 << e) - 1 << 8 - e;
}
function Ni(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function _y(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function Ry(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & xy(8 - n)), n += 3);
  const r = e.length / 4, s = q(yt(e))[0] & bd(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function Sy(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = q(new Uint8Array(n));
  let s = 0;
  for (let f = 0; f < e.length; f += 1) {
    const w = t.indexOf(e[f].normalize("NFKD"));
    if (w === -1)
      throw new R(
        S.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[f]}' is not found in the provided wordlist.`
      );
    for (let g = 0; g < 11; g += 1)
      w & 1 << 10 - g && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, c = bd(o);
  if ((q(yt(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new R(
      S.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var Qy = tr("Bitcoin seed"), Ny = "0x0488ade4", Dy = "0x04358394", zc = [12, 15, 18, 21, 24];
function Hc(e) {
  if (e.length !== 2048)
    throw new R(
      S.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function Ty(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new R(
      S.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function Di(e) {
  if (!zc.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${zc.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new R(S.INVALID_MNEMONIC, t);
  }
}
var hn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = as) {
    M(this, "wordlist");
    this.wordlist = e, Hc(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return hn.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return hn.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = as) {
    const n = Ni(e);
    return Di(n), J(Sy(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = as) {
    const n = q(e);
    return Hc(t), Ty(n), Ry(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    Di(Ni(e));
    const n = tr(_y(e)), r = tr(`mnemonic${t}`);
    return nf(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const n = hn.mnemonicToSeed(e, t);
    return hn.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = Ni(e);
    let n = 0;
    try {
      Di(t);
    } catch {
      return !1;
    }
    for (; n < t.length; ) {
      if (hn.binarySearch(t[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = as;
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
    const t = q(e);
    if (t.length < 16 || t.length > 64)
      throw new R(
        S.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return q(z0("sha512", Qy, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = hn.masterKeysFromSeed(e), r = q(t ? Dy : Ny), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), A = n.slice(0, 32), f = oe([
      r,
      s,
      i,
      o,
      c,
      oe(["0x00", A])
    ]), w = bo(yt(yt(f)), 0, 4);
    return m0(oe([f, w]));
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
    const n = t ? yt(oe([Pt(e), q(t)])) : Pt(e);
    return hn.entropyToMnemonic(n);
  }
}, ia = hn, Cd = 2147483648, Bd = J("0x0488ade4"), oa = J("0x0488b21e"), vd = J("0x04358394"), aa = J("0x043587cf");
function Xc(e) {
  return m0(oe([e, bo(yt(yt(e)), 0, 4)]));
}
function Fy(e = !1, t = !1) {
  return e ? t ? aa : oa : t ? vd : Bd;
}
function My(e) {
  return [oa, aa].includes(J(e.slice(0, 4)));
}
function Oy(e) {
  return [Bd, vd, oa, aa].includes(
    J(e.slice(0, 4))
  );
}
function Ly(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new R(S.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + Cd : parseInt(r, 10)
  );
}
var Yn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    M(this, "depth", 0);
    M(this, "index", 0);
    M(this, "fingerprint", J("0x00000000"));
    M(this, "parentFingerprint", J("0x00000000"));
    M(this, "privateKey");
    M(this, "publicKey");
    M(this, "chainCode");
    if (e.privateKey) {
      const t = new Ar(e.privateKey);
      this.publicKey = J(t.compressedPublicKey), this.privateKey = J(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new R(
          S.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = J(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = bo(rf(yt(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && q(this.privateKey), n = q(this.publicKey), r = q(this.chainCode), s = new Uint8Array(37);
    if (e & Cd) {
      if (!t)
        throw new R(
          S.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(q(this.publicKey));
    s.set(tn(e, 4), 33);
    const i = q(z0("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
    if (t) {
      const g = v(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new Yn({
        privateKey: g,
        chainCode: c,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const f = new Ar(J(o)).addPoint(n);
    return new Yn({
      publicKey: f,
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
    return Ly(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
      throw new R(
        S.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = Fy(this.privateKey == null || e, t), r = J(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = wo(this.index, 4), o = this.chainCode, c = this.privateKey != null && !e ? oe(["0x00", this.privateKey]) : this.publicKey, A = q(oe([n, r, s, i, o, c]));
    return Xc(A);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = ia.masterKeysFromSeed(e);
    return new Yn({
      chainCode: q(t.slice(32)),
      privateKey: q(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = J(tn(zA(e))), n = q(t), r = Xc(n.slice(0, 78)) === e;
    if (n.length !== 82 || !Oy(n))
      throw new R(S.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new R(S.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = J(n.slice(5, 9)), o = parseInt(J(n.slice(9, 13)).substring(2), 16), c = J(n.slice(13, 45)), A = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new R(
        S.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (My(n)) {
      if (A[0] !== 3)
        throw new R(S.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Yn({
        publicKey: A,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (A[0] !== 0)
      throw new R(S.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Yn({
      privateKey: A.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, Ti = Yn, xd = class extends Js {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Bt(e, this._provider);
  }
}, Bt = class extends Ed {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new Ar("0x00"), new xd(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = Ar.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new Bt(t, e == null ? void 0 : e.provider);
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
    const s = Ti.fromSeed(e).derivePath(t || Bt.defaultPath);
    return new Bt(s.privateKey, n);
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
    const s = ia.mnemonicToSeed(e, n), o = Ti.fromSeed(s).derivePath(t || Bt.defaultPath);
    return new Bt(o.privateKey, r);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const n = Ti.fromExtendedKey(e);
    return new Bt(n.privateKey, t);
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
    const r = await By(e, t);
    return new Bt(r, n);
  }
}, It = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new xd(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Bt(e, t);
  }
};
Te(It, "generate", Bt.generate);
Te(It, "fromSeed", Bt.fromSeed);
Te(It, "fromMnemonic", Bt.fromMnemonic);
Te(It, "fromExtendedKey", Bt.fromExtendedKey);
Te(It, "fromEncryptedJson", Bt.fromEncryptedJson);
var ky = class {
  constructor() {
    M(this, "storage", /* @__PURE__ */ new Map());
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
}, Fn, _d = class {
  constructor(e) {
    wn(this, Fn, void 0), Te(this, "pathKey", "{}"), Te(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Te(this, "numberOfAccounts", 0), Lt(this, Fn, e.secret || ia.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Se(this, Fn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = It.fromMnemonic(Se(this, Fn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = It.fromMnemonic(Se(this, Fn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = le.fromAddressOrString(e);
    do {
      const r = It.fromMnemonic(Se(this, Fn), this.getDerivePath(t));
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new R(
      S.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return It.fromPrivateKey(t);
  }
};
Fn = /* @__PURE__ */ new WeakMap();
Te(_d, "type", "mnemonic");
var gn, Rd = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    wn(this, gn, []), e.secret ? Lt(this, gn, [e.secret]) : Lt(this, gn, e.accounts || [It.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Se(this, gn)
    };
  }
  getPublicAccount(e) {
    const t = It.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return Se(this, gn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = It.generate();
    return Se(this, gn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = le.fromAddressOrString(e), n = Se(this, gn).find(
      (r) => It.fromPrivateKey(r).address.equals(t)
    );
    if (!n)
      throw new R(
        S.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return n;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return It.fromPrivateKey(t);
  }
};
gn = /* @__PURE__ */ new WeakMap();
Te(Rd, "type", "privateKey");
var jt = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function $t(e, t) {
  if (!e)
    throw new R(S.WALLET_MANAGER_ERROR, t);
}
var bt, Mn, Vt, lo, Sd, fo, Qd, Nd = class extends ed.EventEmitter {
  constructor(e) {
    super(), wn(this, lo), wn(this, fo), Te(this, "storage", new ky()), Te(this, "STORAGE_KEY", "WalletManager"), wn(this, bt, []), wn(this, Mn, ""), wn(this, Vt, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Se(this, Vt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    $t(!Se(this, Vt), jt.wallet_not_unlocked);
    const t = Se(this, bt).find((n, r) => r === e);
    return $t(t, jt.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Se(this, bt).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Se(this, bt).flatMap(
      (e, t) => e.vault.getAccounts().map((n) => ({ ...n, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = le.fromAddressOrString(e), n = Se(this, bt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return $t(n, jt.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = le.fromAddressOrString(e);
    $t(!Se(this, Vt), jt.wallet_not_unlocked);
    const n = Se(this, bt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return $t(n, jt.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Se(this, bt)[(e == null ? void 0 : e.vaultId) || 0];
    await $t(t, jt.vault_not_found);
    const n = t.vault.addAccount();
    return await this.saveState(), n;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Se(this, bt).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), n = new t(e);
    Lt(this, bt, Se(this, bt).concat({
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
    Lt(this, Vt, !0), Lt(this, bt, []), Lt(this, Mn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Lt(this, Mn, e), Lt(this, Vt, !1);
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
    const n = Se(this, Vt);
    await this.unlock(e), Lt(this, Mn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await $t(!Se(this, Vt), jt.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await $l(Se(this, Mn), JSON.parse(e));
      Lt(this, bt, so(this, fo, Qd).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await $t(!Se(this, Vt), jt.wallet_not_unlocked);
    const e = await Kl(Se(this, Mn), {
      vaults: so(this, lo, Sd).call(this, Se(this, bt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = Nd.Vaults.find((n) => n.type === e);
    return $t(t, jt.invalid_vault_type), t;
  }
}, Py = Nd;
bt = /* @__PURE__ */ new WeakMap();
Mn = /* @__PURE__ */ new WeakMap();
Vt = /* @__PURE__ */ new WeakMap();
lo = /* @__PURE__ */ new WeakSet();
Sd = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
fo = /* @__PURE__ */ new WeakSet();
Qd = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
Te(Py, "Vaults", [_d, Rd]);
var Uy = class {
  constructor(e) {
    throw new R(S.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new R(S.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new R(S.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new R(S.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new R(S.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new R(S.NOT_IMPLEMENTED, "Not implemented.");
  }
};
Te(Uy, "type");
var oE = class {
}, Gy = (e) => {
  const n = q(e), r = f0(n, 16384), s = td(r.map((o) => J(o)));
  return rn(oe(["0x4655454C", s]));
}, Vc = class extends Js {
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
    const { predicateBytes: o, predicateInterface: c } = Vc.processPredicateData(
      t,
      n,
      i
    ), A = le.fromB256(Gy(o));
    super(A, r);
    M(this, "bytes");
    M(this, "predicateData", []);
    M(this, "interface");
    this.bytes = o, this.interface = c, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    const n = Et(t), r = this.getIndexFromPlaceholderWitness(n);
    return r !== -1 && n.removeWitness(r), n.inputs.filter(Cn).forEach((s) => {
      ao(s, this.address) && (s.predicate = J(this.bytes), s.predicateData = J(this.getPredicateData()), s.witnessIndex = 0);
    }), n;
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(t) {
    const n = Et(t);
    return super.sendTransaction(n, { estimateTxDependencies: !1 });
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(t) {
    const n = Et(t);
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
    let s = q(t), i;
    if (n && (i = new sn(n), i.functions.main === void 0))
      throw new R(
        S.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = Vc.setConfigurableConstants(
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
      predicate: J(this.bytes),
      predicateData: J(this.getPredicateData())
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
      predicate: J(this.bytes),
      predicateData: J(this.getPredicateData())
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
      throw new R(
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
    const n = t.inputs.filter(Cn).filter((o) => ao(o, this.address));
    let r = -1;
    const s = n.find((o) => !o.predicate);
    return s && (r = s.witnessIndex, n.every((c) => !c.predicate) || (i = n[0]) != null && i.predicate && (r = -1)), r;
  }
}, Dd = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(Dd || {}), ca = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(ca || {}), Td = "FuelConnector", zy = class {
  constructor(e) {
    M(this, "storage");
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
}, Hy = class extends ed.EventEmitter {
  constructor() {
    super(...arguments);
    M(this, "name", "");
    M(this, "metadata", {});
    M(this, "connected", !1);
    M(this, "installed", !1);
    M(this, "events", ca);
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
function Xy(e, { cache: t, cacheTime: n, key: r }) {
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
function aE(e) {
  window.dispatchEvent(
    new CustomEvent(Td, {
      detail: e
    })
  );
}
function Vy() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function cs(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var Yy = 2e3, Zy = 5e3, { warn: Wy } = console, Sr = class extends Hy {
  constructor(t = Sr.defaultConfig) {
    super();
    M(this, "_storage", null);
    M(this, "_connectors", []);
    M(this, "_targetObject", null);
    M(this, "_unsubscribes", []);
    M(this, "_targetUnsubscribe");
    M(this, "_pingCache", {});
    M(this, "_currentConnector");
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    M(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, n = Td;
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
    M(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    M(this, "triggerConnectorEvents", async () => {
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
    M(this, "getConnector", (t) => this._connectors.find((n) => {
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
      return new zy(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(Sr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(Dd).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      cs(t.isConnected()),
      cs(this.pingConnector(t))
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
      return await Xy(async () => cs(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: Zy
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(ca)), await ((o = this._storage) == null ? void 0 : o.setItem(Sr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = Vy();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), cs(t.promise, Yy).then(() => !0).catch(() => !1);
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
    return Wy(
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
      n = await Ts.create(t.url);
    else {
      if (t)
        throw new R(S.INVALID_PROVIDER, "Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await Ts.create(r.url);
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
    return new Js(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Sr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, Fd = Sr;
Te(Fd, "STORAGE_KEY", "fuel-current-connector");
Te(Fd, "defaultConfig", {});
function Yc(e, t) {
  if (!e)
    throw new R(S.TRANSACTION_ERROR, t);
}
function Md(e) {
  return e.reduce((t, n, r) => {
    const { program: s, externalAbis: i } = n.getCallConfig();
    return r === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var Od = (e, t, n) => {
  if (!t)
    return [];
  const { main: r, otherContractsAbis: s } = Md(n);
  return sa(e, r, s);
}, Yt, t0, Ld = (t0 = class {
  constructor(...e) {
    Nt(this, Yt);
    Gt(this, Yt, e || []);
  }
  entries() {
    return Me(this, Yt);
  }
  push(...e) {
    Me(this, Yt).push(...e);
  }
  concat(e) {
    return Me(this, Yt).concat(e);
  }
  extend(e) {
    Me(this, Yt).push(...e);
  }
  toBytes() {
    return oe(
      Me(this, Yt).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return J(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Me(this, Yt), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Yt = new WeakMap(), t0), Jy = (e) => W0 + Z0({ maxInputs: e });
function qy(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === de.ScriptResult ? n = i : (i.type === de.Return || i.type === de.ReturnData || i.type === de.Revert) && (r = i);
  }), !n || !r)
    throw new R(S.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: n.result,
    gasUsed: n.gasUsed,
    receipts: t,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: e
  };
}
function ua(e, t, n = []) {
  var r;
  try {
    const s = qy(e);
    return t(s);
  } catch (s) {
    if (s.code === S.SCRIPT_REVERTED) {
      const i = (r = e == null ? void 0 : e.dryRunStatus) == null ? void 0 : r.reason;
      throw Ko({
        logs: n,
        receipts: e.receipts,
        statusReason: i
      });
    }
    throw s;
  }
}
function jy(e, t, n) {
  return ua(
    e,
    (r) => {
      if (r.returnReceipt.type === de.Revert)
        throw new R(
          S.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== de.Return && r.returnReceipt.type !== de.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new R(
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
var qs = class {
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
    M(this, "bytes");
    /**
     * A function to encode the script data.
     */
    M(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    M(this, "scriptResultDecoder");
    this.bytes = q(e), this.scriptDataEncoder = t, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return Z0({ maxInputs: t }) + W0 + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return qs.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = q(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return ua(e, this.scriptResultDecoder, t);
  }
}, kd = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, $y = De, Pd = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: n,
  assetIdOffset: r
}) => {
  const s = new Ld(
    is(16, e),
    is(17, n),
    Ki(17, 17, 0),
    is(18, r)
  );
  return t ? s.push(
    is(19, t),
    Ki(19, 19, 0),
    pc(16, 17, 18, 19)
  ) : s.push(pc(16, 17, 18, Le.cgas().to_u8())), s;
};
function Zc(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new Ld();
  for (let n = 0; n < e.length; n += 1)
    t.extend(Pd(e[n]).entries());
  return t.push(Ou(1)), t.toBytes();
}
var Ky = (e) => e === de.Return || e === de.ReturnData, eI = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === de.Call && r === $y && s === t
), tI = (e) => (t) => {
  if (pn(t.code) !== 0)
    throw new R(S.SCRIPT_REVERTED, "Transaction reverted.");
  const n = eI(
    t.receipts,
    e.toB256()
  ), r = v(n == null ? void 0 : n.is);
  return t.receipts.filter(({ type: i }) => Ky(i)).flatMap((i) => r.eq(v(i.is)) ? i.type === de.Return ? [new F("u64").encode(i.val)] : i.type === de.ReturnData ? [q(i.data)] : [new Uint8Array()] : []);
}, nI = (e, t, n = []) => ua(e, tI(t), n), rI = (e) => e.reduce(
  (t, n) => {
    const r = { ...kd };
    return n.gas && (r.gasForwardedOffset = 1), t + Pd(r).byteLength();
  },
  Wt.size()
  // placeholder for single RET instruction which is added later
), sI = (e, t) => new qs(
  // Script to call the contract, start with stub size matching length of calls
  Zc(new Array(e.length).fill(kd)),
  (n) => {
    var x;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = rI(n), i = (8 - s % 8) % 8, o = s + i, c = Jy(t.toNumber()) + o, A = [];
    let f = c;
    const w = [];
    for (let _ = 0; _ < r; _ += 1) {
      const B = n[_], D = f, T = D + ge, G = T + Bs, P = G + vf + ge + ge, W = P + B.fnSelectorBytes.byteLength, L = q(B.data);
      let Q = 0;
      w.push(new F("u64").encode(B.amount || 0)), w.push(new Z().encode(((x = B.assetId) == null ? void 0 : x.toString()) || De)), w.push(B.contractId.toBytes()), w.push(new F("u64").encode(P)), w.push(new F("u64").encode(W)), w.push(B.fnSelectorBytes), w.push(L), B.gas && (w.push(new F("u64").encode(B.gas)), Q = W + L.byteLength);
      const k = {
        amountOffset: D,
        assetIdOffset: T,
        gasForwardedOffset: Q,
        callDataOffset: G
      };
      A.push(k), f = c + oe(w).byteLength;
    }
    const g = Zc(A);
    return { data: oe(w), script: g };
  },
  () => [new Uint8Array()]
), Ud = (e, t, n, r) => {
  var c;
  const s = (c = e[0]) == null ? void 0 : c.getCallConfig();
  if (e.length === 1 && s && "bytes" in s.program)
    return jy({ receipts: t }, s, r);
  const o = nI(
    { receipts: t },
    (s == null ? void 0 : s.program).id,
    r
  ).map((A, f) => {
    var g;
    const { func: w } = e[f].getCallConfig();
    return (g = w.decodeOutput(A)) == null ? void 0 : g[0];
  });
  return n ? o : o == null ? void 0 : o[0];
}, iI = async (e) => {
  var x;
  const { funcScope: t, isMultiCall: n, program: r, transactionResponse: s } = e, i = await s.waitForResult(), { receipts: o } = i, c = Array.isArray(t) ? t : [t], A = (x = c[0]) == null ? void 0 : x.getCallConfig(), f = Od(o, A, c), w = Ud(c, o, n, f), g = Zs(o);
  return {
    isMultiCall: n,
    functionScopes: c,
    value: w,
    program: r,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: f,
    gasUsed: g
  };
}, Fi = (e) => {
  var g;
  const { funcScopes: t, callResult: n, isMultiCall: r } = e, { receipts: s } = n, i = Array.isArray(t) ? t : [t], o = (g = i[0]) == null ? void 0 : g.getCallConfig(), c = Od(s, o, i), A = Ud(i, s, r, c), f = Zs(s);
  return {
    functionScopes: i,
    callResult: n,
    isMultiCall: r,
    gasUsed: f,
    value: A
  };
};
function oI(e) {
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
var Gd = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    M(this, "transactionRequest");
    M(this, "program");
    M(this, "functionInvocationScopes", []);
    M(this, "txParameters");
    M(this, "requiredCoins", []);
    M(this, "isMultiCall", !1);
    M(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    M(this, "externalAbis", {});
    M(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new kn();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    if (!this.getProvider().getChain())
      throw new R(
        R.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``"
      );
    return this.functionInvocationScopes.map((n) => oI(n));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), n = sI(this.functionInvocationScopes, t);
    this.transactionRequest.setScript(n, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId), t.externalContractsAbis && Object.keys(t.externalContractsAbis).forEach(
        (n) => this.transactionRequest.addContractInputAndOutput(le.fromB256(n))
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
      amount: v(t.amount || 0)
    })).filter(({ assetId: t, amount: n }) => t && !v(n).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const e = this.getRequiredCoins(), t = (n, { assetId: r, amount: s }) => {
      var o;
      const i = ((o = n.get(r)) == null ? void 0 : o.amount) || v(0);
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
    await Vo(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === ke.Script && (this.transactionRequest.abis = Md(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, n) => t.add(n.gas || 0), v(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new R(
        S.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
  }
  /**
   * Gets the transaction cost for dry running the transaction.
   *
   * @param options - Optional transaction cost options.
   * @returns The transaction cost details.
   */
  async getTransactionCost() {
    const e = kt(await this.getTransactionRequest());
    return (this.program.account ?? It.generate({ provider: this.getProvider() })).getTransactionCost(e, {
      quantities: this.getRequiredCoins(),
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
    e = kt(e);
    const t = await this.getTransactionCost(), { gasUsed: n, missingContractIds: r, outputVariables: s, maxFee: i } = t;
    return this.setDefaultTxParams(e, n, i), e.inputs = e.inputs.filter((c) => c.type !== ve.Coin), r.forEach((c) => {
      e.addContractInputAndOutput(le.fromString(c));
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
    return t.tip = v(e.tip || t.tip), t.gasLimit = v(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? v(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? v(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((n = this.txParameters) == null ? void 0 : n.variableOutputs) || 0), this;
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
      le.fromAddressOrString(n),
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
        le.fromAddressOrString(n),
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
    Yc(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      estimateTxDependencies: !1
    });
    return {
      transactionId: t.id,
      waitForResult: async () => iI({
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
    if (Yc(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new R(
        S.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return Fi({
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
    return Fi({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return Fi({
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
    const r = vn((c = this.txParameters) == null ? void 0 : c.gasLimit) || this.hasCallParamsGasLimit, s = vn((A = this.txParameters) == null ? void 0 : A.maxFee), { gasLimit: i, maxFee: o } = e;
    if (!r)
      e.gasLimit = t;
    else if (i.lt(t))
      throw new R(
        S.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${t}'.`
      );
    if (!s)
      e.maxFee = n;
    else if (n.gt(o))
      throw new R(
        S.MAX_FEE_TOO_LOW,
        `Max fee '${o}' is lower than the required: '${n}'.`
      );
  }
}, zd = class extends Gd {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, n, r) {
    super(t, !1);
    M(this, "func");
    M(this, "callParameters");
    M(this, "forward");
    M(this, "args");
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
        throw new R(
          S.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = Jo(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, aI = class extends Gd {
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
}, cI = class {
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
    M(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    M(this, "provider");
    /**
     * The contract's ABI interface.
     */
    M(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    M(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    M(this, "functions", {});
    this.interface = t instanceof sn ? t : new sn(t), this.id = le.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
      const t = (...n) => new zd(this, e, n);
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
    return new aI(this, e);
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
}, uI = class extends zd {
  constructor() {
    super(...arguments);
    M(this, "scriptRequest");
  }
  updateScriptRequest() {
    this.scriptRequest || this.buildScriptRequest(), this.transactionRequest.setScript(this.scriptRequest, this.args);
  }
  buildScriptRequest() {
    const t = this.program.bytes;
    if (!this.program.provider.getChain())
      throw new R(
        R.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    this.scriptRequest = new qs(
      t,
      (r) => this.func.encodeArguments(r),
      () => []
    );
  }
}, cE = class extends Gf {
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
    M(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    M(this, "interface");
    /**
     * The account associated with the script.
     */
    M(this, "account");
    /**
     * The script request object.
     */
    M(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    M(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    M(this, "functions");
    this.bytes = q(t), this.interface = new sn(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new uI(this, this.interface.getFunction("main"), s)
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
      throw new R(
        S.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new qs(
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
function uE(e) {
  return e;
}
var dI = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(dI || {}), AI = Object.defineProperty, lI = (e, t) => {
  for (var n in t)
    AI(e, n, { get: t[n], enumerable: !0 });
}, fI = {};
lI(fI, {
  MAX_CONTRACT_SIZE: () => Hd,
  getContractId: () => Yd,
  getContractRoot: () => Xd,
  getContractStorageRoot: () => Vd,
  hexlifyWithPrefix: () => ho
});
var Hd = 102400, Xd = (e) => {
  const n = q(e), r = f0(n, 16384);
  return td(r.map((s) => J(s)));
}, Vd = (e) => {
  const t = new tm();
  return e.forEach(({ key: n, value: r }) => t.update(yt(n), r)), t.root;
}, Yd = (e, t, n) => {
  const r = Xd(q(e));
  return yt(oe(["0x4655454C", t, r, n]));
}, ho = (e) => J(e.startsWith("0x") ? e : `0x${e}`), hI = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, n = null) {
    M(this, "bytecode");
    M(this, "interface");
    M(this, "provider");
    M(this, "account");
    this.bytecode = q(e), t instanceof sn ? this.interface = t : this.interface = new sn(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new hI(this.bytecode, this.interface, e);
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
      key: ho(c),
      value: ho(A)
    })).sort(({ key: c }, { key: A }) => c.localeCompare(A)), n = {
      salt: Pt(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new R(
        S.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || Vd(n.storageSlots), s = Yd(this.bytecode, n.salt, r), i = new co({
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
    if (this.bytecode.length > Hd)
      throw new R(
        S.CONTRACT_SIZE_EXCEEDS_LIMIT,
        "Contract bytecode is too large. Max contract size is 100KB"
      );
    const { contractId: t, transactionRequest: n } = await this.prepareDeploy(e), r = this.getAccount(), s = await r.sendTransaction(n);
    return { waitForResult: async () => {
      const o = await s.waitForResult();
      return { contract: new cI(t, this.interface, r), transactionResult: o };
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
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r), o = q(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new R(
        S.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
  getAccount() {
    if (!this.account)
      throw new R(S.ACCOUNT_REQUIRED, "Account not assigned to contract.");
    return this.account;
  }
  async prepareDeploy(e) {
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), s = this.getAccount(), i = await s.getTransactionCost(r), { maxFee: o } = e;
    if (vn(o)) {
      if (i.maxFee.gt(o))
        throw new R(
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
}, dE = 9, AE = 3, lE = 9, fE = 9, hE = 18, gE = 15, pE = 12, mE = 9, Wc = "http://127.0.0.1:4000/v1/graphql", wE = "https://devnet.fuel.network/v1/graphql", yE = "https://testnet.fuel.network/v1/graphql", n0, IE = typeof process < "u" && ((n0 = process == null ? void 0 : process.env) == null ? void 0 : n0.FUEL_NETWORK_URL) || Wc;
export {
  Bs as ASSET_ID_LEN,
  Qr as AbiCoder,
  su as AbstractAccount,
  Pf as AbstractAddress,
  Uf as AbstractContract,
  iu as AbstractProgram,
  Gf as AbstractScript,
  NI as AbstractScriptRequest,
  Js as Account,
  le as Address,
  Gw as AddressType,
  ye as ArrayCoder,
  Z as B256Coder,
  Sf as B512Coder,
  ay as BLOCKS_PAGE_SIZE_LIMIT,
  Oe as BN,
  xn as BYTES_32,
  ta as BaseTransactionRequest,
  Ed as BaseWalletUnlocked,
  F as BigNumberCoder,
  Nf as BooleanCoder,
  Be as ByteArrayCoder,
  J0 as ByteCoder,
  Jn as CHAIN_IDS,
  vf as CONTRACT_ID_LEN,
  MI as CONTRACT_MAX_SIZE,
  zw as ChainName,
  WI as ChangeOutputCollisionError,
  ce as Coder,
  dI as Commands,
  cI as Contract,
  hI as ContractFactory,
  fI as ContractUtils,
  co as CreateTransactionRequest,
  fE as DECIMAL_FUEL,
  mE as DECIMAL_GWEI,
  gE as DECIMAL_KWEI,
  pE as DECIMAL_MWEI,
  hE as DECIMAL_WEI,
  lE as DEFAULT_DECIMAL_UNITS,
  AE as DEFAULT_MIN_PRECISION,
  dE as DEFAULT_PRECISION,
  cy as DEFAULT_UTXOS_CACHE_TTL,
  wE as DEVNET_NETWORK_URL,
  Eo as DateTime,
  bs as ENCODING_V1,
  FI as EmptyRoot,
  q0 as EnumCoder,
  S as ErrorCode,
  Tg as FAILED_ASSERT_EQ_SIGNAL,
  Mg as FAILED_ASSERT_NE_SIGNAL,
  Fg as FAILED_ASSERT_SIGNAL,
  Dg as FAILED_REQUIRE_SIGNAL,
  Tu as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  zI as FAILED_UNKNOWN_SIGNAL,
  xs as FUEL_BECH32_HRP_PREFIX,
  IE as FUEL_NETWORK_URL,
  Fd as Fuel,
  Hy as FuelConnector,
  Td as FuelConnectorEventType,
  ca as FuelConnectorEventTypes,
  Dd as FuelConnectorMethods,
  R as FuelError,
  zd as FunctionInvocationScope,
  Ti as HDWallet,
  QI as INPUT_COIN_FIXED_SIZE,
  _n as InputCoder,
  Pa as InputCoinCoder,
  _s as InputContractCoder,
  Tr as InputMessageCoder,
  ve as InputType,
  Ld as InstructionSet,
  sn as Interface,
  Wc as LOCAL_NETWORK_URL,
  vy as Language,
  zy as LocalStorage,
  GI as MAX_PREDICATE_DATA_LENGTH,
  UI as MAX_PREDICATE_LENGTH,
  kI as MAX_SCRIPT_DATA_LENGTH,
  LI as MAX_SCRIPT_LENGTH,
  PI as MAX_STATIC_CONTRACTS,
  OI as MAX_WITNESSES,
  zc as MNEMONIC_SIZES,
  ky as MemoryStorage,
  ia as Mnemonic,
  _d as MnemonicVault,
  aI as MultiCallInvocationScope,
  Iw as NoWitnessAtIndexError,
  JI as NoWitnessByOwnerError,
  ee as NumberCoder,
  Uw as OperationName,
  eu as OptionCoder,
  Ga as OutputChangeCoder,
  Rn as OutputCoder,
  Ua as OutputCoinCoder,
  Rs as OutputContractCoder,
  Ha as OutputContractCreatedCoder,
  Ee as OutputType,
  za as OutputVariableCoder,
  Lg as PANIC_DOC_URL,
  Og as PANIC_REASONS,
  Sn as PoliciesCoder,
  Mt as PolicyType,
  Vc as Predicate,
  Rd as PrivateKeyVault,
  Ts as Provider,
  Oc as RESOURCES_PAGE_SIZE_LIMIT,
  Tf as RawSliceCoder,
  Zi as ReceiptBurnCoder,
  Xa as ReceiptCallCoder,
  DI as ReceiptCoder,
  Ja as ReceiptLogCoder,
  qa as ReceiptLogDataCoder,
  Ss as ReceiptMessageOutCoder,
  Fr as ReceiptMintCoder,
  Za as ReceiptPanicCoder,
  Va as ReceiptReturnCoder,
  Ya as ReceiptReturnDataCoder,
  Wa as ReceiptRevertCoder,
  Ka as ReceiptScriptResultCoder,
  ja as ReceiptTransferCoder,
  $a as ReceiptTransferOutCoder,
  de as ReceiptType,
  W0 as SCRIPT_FIXED_SIZE,
  cE as Script,
  qs as ScriptRequest,
  kn as ScriptTransactionRequest,
  Ar as Signer,
  Fo as StdStringCoder,
  oE as StorageAbstract,
  ec as StorageSlotCoder,
  tu as StrSliceCoder,
  Ff as StringCoder,
  Ps as StructCoder,
  yE as TESTNET_NETWORK_URL,
  nn as TransactionCoder,
  rc as TransactionCreateCoder,
  sc as TransactionMintCoder,
  uo as TransactionResponse,
  nc as TransactionScriptCoder,
  Pw as TransactionStatus,
  ke as TransactionType,
  kw as TransactionTypeName,
  ic as TransactionUpgradeCoder,
  oc as TransactionUploadCoder,
  nu as TupleCoder,
  or as TxPointerCoder,
  Cs as UTXO_ID_LEN,
  TI as UtxoIdCoder,
  Uy as Vault,
  Mf as VecCoder,
  ge as WORD_SIZE,
  It as Wallet,
  xd as WalletLocked,
  Py as WalletManager,
  Bt as WalletUnlocked,
  Qn as WitnessCoder,
  De as ZeroBytes32,
  sm as addAmountToCoinQuantities,
  dr as addOperation,
  vr as addressify,
  q as arrayify,
  ww as assemblePanicError,
  fw as assembleReceiptByType,
  yw as assembleRevertError,
  Ws as assembleTransactionSummary,
  Yc as assert,
  iE as assets,
  v as bn,
  En as bufferFromString,
  ZI as buildBlockExplorerUrl,
  Fi as buildDryRunResult,
  iI as buildFunctionResult,
  Xy as cacheFor,
  qI as cacheRequestInputsResources,
  bw as cacheRequestInputsResourcesFromOwner,
  io as calculateGasFee,
  ud as calculateMetadataGasForTxCreate,
  dd as calculateMetadataGasForTxScript,
  _w as calculateTXFeeForSummary,
  Z0 as calculateVmTxMemory,
  II as capitalizeString,
  f0 as chunkAndPadBytes,
  Zf as clearFirst12BytesFromB256,
  Jo as coinQuantityfy,
  BI as compressBytecode,
  z0 as computeHmac,
  oe as concat,
  Os as concatBytes,
  uE as createConfig,
  bo as dataSlice,
  zA as decodeBase58,
  vI as decompressBytecode,
  $l as decrypt,
  ef as decryptJsonWalletData,
  CI as defaultConsensusKey,
  bI as defaultSnapshotConfigs,
  Vy as deferPromise,
  aE as dispatchFuelConnectorEvent,
  m0 as encodeBase58,
  Kl as encrypt,
  tf as encryptJsonWalletData,
  as as english,
  ry as extractBurnedAssetsFromReceipts,
  Ud as extractInvocationResult,
  ny as extractMintedAssetsFromReceipts,
  Ko as extractTxError,
  mI as format,
  pI as formatUnits,
  Oo as fromBech32,
  my as fuelAssetsBaseUrl,
  pw as gasUsedByInputs,
  Md as getAbisFromAllCalls,
  Ew as getAssetAmountInRequestInputs,
  rE as getAssetEth,
  sE as getAssetFuel,
  Ay as getAssetNetwork,
  Id as getAssetWithNetwork,
  Lo as getBytesFromBech32,
  jw as getContractCallOperations,
  ey as getContractCreatedOperations,
  sa as getDecodedLogs,
  dy as getDefaultChainId,
  Zs as getGasUsedFromReceipts,
  ra as getInputAccountAddress,
  Fw as getInputContractFromIndex,
  fd as getInputFromAssetId,
  na as getInputsByType,
  Sw as getInputsByTypes,
  Qw as getInputsCoin,
  Dw as getInputsCoinAndMessage,
  Tw as getInputsContract,
  Nw as getInputsMessage,
  $o as getMaxGas,
  cd as getMinGas,
  du as getMintedAssetId,
  ty as getOperations,
  Jr as getOutputsByType,
  Ow as getOutputsChange,
  hd as getOutputsCoin,
  Lw as getOutputsContract,
  Mw as getOutputsContractCreated,
  jI as getOutputsVariable,
  Kw as getPayProducerOperations,
  Gy as getPredicateRoot,
  Yf as getRandomB256,
  Lr as getReceiptsByType,
  Yw as getReceiptsCall,
  Zw as getReceiptsMessageOut,
  KI as getReceiptsTransferOut,
  Dc as getReceiptsWithMissingData,
  Ad as getRequestInputResourceOwner,
  Od as getResultLogs,
  sy as getTransactionStatusName,
  eE as getTransactionSummary,
  tE as getTransactionSummaryFromRequest,
  gd as getTransactionTypeName,
  nE as getTransactionsSummaries,
  Fc as getTransferOperations,
  qw as getWithdrawFromFuelOperations,
  $I as hasSameAssetId,
  rn as hash,
  of as hashMessage,
  J as hexlify,
  cw as inputify,
  Vi as isB256,
  ps as isBech32,
  dw as isCoin,
  vn as isDefined,
  Yi as isEvmAddress,
  YI as isMessage,
  La as isPublicKey,
  XI as isRawCoin,
  VI as isRawMessage,
  pr as isRequestInputCoin,
  ea as isRequestInputMessage,
  Cn as isRequestInputResource,
  ao as isRequestInputResourceFromOwner,
  qr as isType,
  pd as isTypeCreate,
  Hw as isTypeMint,
  md as isTypeScript,
  Xw as isTypeUpgrade,
  Vw as isTypeUpload,
  G0 as keccak256,
  SI as keyFromPassword,
  wI as max,
  yI as multiply,
  Vf as normalizeBech32,
  mw as normalizeJSON,
  EI as normalizeString,
  uw as outputify,
  Wf as padFirst12BytesOfEvmAddress,
  nf as pbkdf2,
  yn as processGqlReceipt,
  iy as processGraphqlStatus,
  Pt as randomBytes,
  wy as rawAssets,
  bn as resolveGasDependentCosts,
  py as resolveIconPaths,
  Tc as returnZeroScript,
  rf as ripemd160,
  U0 as scrypt,
  yt as sha256,
  LA as sleep,
  eh as sortPolicies,
  Br as stringFromBuffer,
  ka as toB256,
  gs as toBech32,
  tn as toBytes,
  cA as toFixed,
  wo as toHex,
  pn as toNumber,
  tr as toUtf8Bytes,
  Co as toUtf8String,
  Et as transactionRequestify,
  sf as uint64ToBytesBE,
  gy as urlJoin,
  cs as withTimeout,
  xw as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
