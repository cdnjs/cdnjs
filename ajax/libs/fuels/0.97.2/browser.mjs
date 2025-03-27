var dp = Object.defineProperty;
var Sc = (e) => {
  throw TypeError(e);
};
var up = (e, t, r) => t in e ? dp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var F = (e, t, r) => up(e, typeof t != "symbol" ? t + "" : t, r), qi = (e, t, r) => t.has(e) || Sc("Cannot " + r);
var Mt = (e, t, r) => (qi(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Ge = (e, t, r) => t.has(e) ? Sc("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), Je = (e, t, r, n) => (qi(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), ws = (e, t, r) => (qi(e, t, "access private method"), r);
function _p(e, t) {
  for (var r = 0; r < t.length; r++) {
    const n = t[r];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const s in n)
        if (s !== "default" && !(s in e)) {
          const i = Object.getOwnPropertyDescriptor(n, s);
          i && Object.defineProperty(e, s, i.get ? i : {
            enumerable: !0,
            get: () => n[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
function ah() {
  return {
    FORC: "0.66.5",
    FUEL_CORE: "0.40.1",
    FUELS: "0.97.2"
  };
}
function Tc(e) {
  const [t, r, n] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: r, patch: n };
}
function Aa(e, t) {
  const r = Tc(e), n = Tc(t), s = r.major - n.major, i = r.minor - n.minor, o = r.patch - n.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function hp(e, t) {
  const { major: r } = Aa(e, t);
  return r === 0;
}
function lp(e, t) {
  const { minor: r } = Aa(e, t);
  return r === 0;
}
function Ap(e, t) {
  const { patch: r } = Aa(e, t);
  return r === 0;
}
function pp(e) {
  const { FUEL_CORE: t } = ah();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: hp(e, t),
    isMinorSupported: lp(e, t),
    isPatchSupported: Ap(e, t)
  };
}
var ch = ah(), fp = Object.defineProperty, gp = (e, t, r) => t in e ? fp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, wp = (e, t, r) => (gp(e, t + "", r), r), D = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.TIMEOUT_EXCEEDED = "timeout-exceeded", e.CONFIG_FILE_NOT_FOUND = "config-file-not-found", e.CONFIG_FILE_ALREADY_EXISTS = "config-file-already-exists", e.WORKSPACE_NOT_DETECTED = "workspace-not-detected", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_URL = "invalid-url", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.NOT_ENOUGH_FUNDS = "not-enough-funds", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", e.INVALID_CHUNK_SIZE_MULTIPLIER = "invalid-chunk-size-multiplier", e.MAX_INPUTS_EXCEEDED = "max-inputs-exceeded", e.FUNDS_TOO_LOW = "funds-too-low", e.MAX_OUTPUTS_EXCEEDED = "max-outputs-exceeded", e.MAX_COINS_REACHED = "max-coins-reached", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e.NODE_LAUNCH_FAILED = "node-launch-failed", e.UNKNOWN = "unknown", e))(D || {}), Bs = class extends Error {
  constructor(t, r, n = {}, s = null) {
    super(r);
    F(this, "VERSIONS", ch);
    F(this, "metadata");
    F(this, "rawError");
    F(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = n, this.rawError = s;
  }
  static parse(t) {
    const r = t;
    if (r.code === void 0)
      throw new Bs(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const n = Object.values(D);
    if (!n.includes(r.code))
      throw new Bs(
        "parse-failed",
        `Unknown error code: ${r.code}. Accepted codes: ${n.join(", ")}.`
      );
    return new Bs(r.code, r.message);
  }
  toObject() {
    const { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: o } = this;
    return { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: o };
  }
}, v = Bs;
wp(v, "CODES", D);
var To = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function mp(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var s = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, s.get ? s : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var pa = { exports: {} };
const yp = {}, bp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yp
}, Symbol.toStringTag, { value: "Module" })), Ip = /* @__PURE__ */ mp(bp);
pa.exports;
(function(e) {
  (function(t, r) {
    function n(C, d) {
      if (!C) throw new Error(d || "Assertion failed");
    }
    function s(C, d) {
      C.super_ = d;
      var _ = function() {
      };
      _.prototype = d.prototype, C.prototype = new _(), C.prototype.constructor = C;
    }
    function i(C, d, _) {
      if (i.isBN(C))
        return C;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, C !== null && ((d === "le" || d === "be") && (_ = d, d = 10), this._init(C || 0, d || 10, _ || "be"));
    }
    typeof t == "object" ? t.exports = i : r.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = Ip.Buffer;
    } catch {
    }
    i.isBN = function(d) {
      return d instanceof i ? !0 : d !== null && typeof d == "object" && d.constructor.wordSize === i.wordSize && Array.isArray(d.words);
    }, i.max = function(d, _) {
      return d.cmp(_) > 0 ? d : _;
    }, i.min = function(d, _) {
      return d.cmp(_) < 0 ? d : _;
    }, i.prototype._init = function(d, _, p) {
      if (typeof d == "number")
        return this._initNumber(d, _, p);
      if (typeof d == "object")
        return this._initArray(d, _, p);
      _ === "hex" && (_ = 16), n(_ === (_ | 0) && _ >= 2 && _ <= 36), d = d.toString().replace(/\s+/g, "");
      var w = 0;
      d[0] === "-" && (w++, this.negative = 1), w < d.length && (_ === 16 ? this._parseHex(d, w, p) : (this._parseBase(d, _, w), p === "le" && this._initArray(this.toArray(), _, p)));
    }, i.prototype._initNumber = function(d, _, p) {
      d < 0 && (this.negative = 1, d = -d), d < 67108864 ? (this.words = [d & 67108863], this.length = 1) : d < 4503599627370496 ? (this.words = [
        d & 67108863,
        d / 67108864 & 67108863
      ], this.length = 2) : (n(d < 9007199254740992), this.words = [
        d & 67108863,
        d / 67108864 & 67108863,
        1
      ], this.length = 3), p === "le" && this._initArray(this.toArray(), _, p);
    }, i.prototype._initArray = function(d, _, p) {
      if (n(typeof d.length == "number"), d.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(d.length / 3), this.words = new Array(this.length);
      for (var w = 0; w < this.length; w++)
        this.words[w] = 0;
      var b, B, T = 0;
      if (p === "be")
        for (w = d.length - 1, b = 0; w >= 0; w -= 3)
          B = d[w] | d[w - 1] << 8 | d[w - 2] << 16, this.words[b] |= B << T & 67108863, this.words[b + 1] = B >>> 26 - T & 67108863, T += 24, T >= 26 && (T -= 26, b++);
      else if (p === "le")
        for (w = 0, b = 0; w < d.length; w += 3)
          B = d[w] | d[w + 1] << 8 | d[w + 2] << 16, this.words[b] |= B << T & 67108863, this.words[b + 1] = B >>> 26 - T & 67108863, T += 24, T >= 26 && (T -= 26, b++);
      return this._strip();
    };
    function a(C, d) {
      var _ = C.charCodeAt(d);
      if (_ >= 48 && _ <= 57)
        return _ - 48;
      if (_ >= 65 && _ <= 70)
        return _ - 55;
      if (_ >= 97 && _ <= 102)
        return _ - 87;
      n(!1, "Invalid character in " + C);
    }
    function u(C, d, _) {
      var p = a(C, _);
      return _ - 1 >= d && (p |= a(C, _ - 1) << 4), p;
    }
    i.prototype._parseHex = function(d, _, p) {
      this.length = Math.ceil((d.length - _) / 6), this.words = new Array(this.length);
      for (var w = 0; w < this.length; w++)
        this.words[w] = 0;
      var b = 0, B = 0, T;
      if (p === "be")
        for (w = d.length - 1; w >= _; w -= 2)
          T = u(d, _, w) << b, this.words[B] |= T & 67108863, b >= 18 ? (b -= 18, B += 1, this.words[B] |= T >>> 26) : b += 8;
      else {
        var I = d.length - _;
        for (w = I % 2 === 0 ? _ + 1 : _; w < d.length; w += 2)
          T = u(d, _, w) << b, this.words[B] |= T & 67108863, b >= 18 ? (b -= 18, B += 1, this.words[B] |= T >>> 26) : b += 8;
      }
      this._strip();
    };
    function A(C, d, _, p) {
      for (var w = 0, b = 0, B = Math.min(C.length, _), T = d; T < B; T++) {
        var I = C.charCodeAt(T) - 48;
        w *= p, I >= 49 ? b = I - 49 + 10 : I >= 17 ? b = I - 17 + 10 : b = I, n(I >= 0 && b < p, "Invalid character"), w += b;
      }
      return w;
    }
    i.prototype._parseBase = function(d, _, p) {
      this.words = [0], this.length = 1;
      for (var w = 0, b = 1; b <= 67108863; b *= _)
        w++;
      w--, b = b / _ | 0;
      for (var B = d.length - p, T = B % w, I = Math.min(B, B - T) + p, l = 0, E = p; E < I; E += w)
        l = A(d, E, E + w, _), this.imuln(b), this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l);
      if (T !== 0) {
        var et = 1;
        for (l = A(d, E, d.length, _), E = 0; E < T; E++)
          et *= _;
        this.imuln(et), this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l);
      }
      this._strip();
    }, i.prototype.copy = function(d) {
      d.words = new Array(this.length);
      for (var _ = 0; _ < this.length; _++)
        d.words[_] = this.words[_];
      d.length = this.length, d.negative = this.negative, d.red = this.red;
    };
    function f(C, d) {
      C.words = d.words, C.length = d.length, C.negative = d.negative, C.red = d.red;
    }
    if (i.prototype._move = function(d) {
      f(d, this);
    }, i.prototype.clone = function() {
      var d = new i(null);
      return this.copy(d), d;
    }, i.prototype._expand = function(d) {
      for (; this.length < d; )
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
    var y = [
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
    ], R = [
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
    ], Q = [
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
    i.prototype.toString = function(d, _) {
      d = d || 10, _ = _ | 0 || 1;
      var p;
      if (d === 16 || d === "hex") {
        p = "";
        for (var w = 0, b = 0, B = 0; B < this.length; B++) {
          var T = this.words[B], I = ((T << w | b) & 16777215).toString(16);
          b = T >>> 24 - w & 16777215, w += 2, w >= 26 && (w -= 26, B--), b !== 0 || B !== this.length - 1 ? p = y[6 - I.length] + I + p : p = I + p;
        }
        for (b !== 0 && (p = b.toString(16) + p); p.length % _ !== 0; )
          p = "0" + p;
        return this.negative !== 0 && (p = "-" + p), p;
      }
      if (d === (d | 0) && d >= 2 && d <= 36) {
        var l = R[d], E = Q[d];
        p = "";
        var et = this.clone();
        for (et.negative = 0; !et.isZero(); ) {
          var tt = et.modrn(E).toString(d);
          et = et.idivn(E), et.isZero() ? p = tt + p : p = y[l - tt.length] + tt + p;
        }
        for (this.isZero() && (p = "0" + p); p.length % _ !== 0; )
          p = "0" + p;
        return this.negative !== 0 && (p = "-" + p), p;
      }
      n(!1, "Base should be between 2 and 36");
    }, i.prototype.toNumber = function() {
      var d = this.words[0];
      return this.length === 2 ? d += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? d += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -d : d;
    }, i.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, o && (i.prototype.toBuffer = function(d, _) {
      return this.toArrayLike(o, d, _);
    }), i.prototype.toArray = function(d, _) {
      return this.toArrayLike(Array, d, _);
    };
    var S = function(d, _) {
      return d.allocUnsafe ? d.allocUnsafe(_) : new d(_);
    };
    i.prototype.toArrayLike = function(d, _, p) {
      this._strip();
      var w = this.byteLength(), b = p || Math.max(1, w);
      n(w <= b, "byte array longer than desired length"), n(b > 0, "Requested array length <= 0");
      var B = S(d, b), T = _ === "le" ? "LE" : "BE";
      return this["_toArrayLike" + T](B, w), B;
    }, i.prototype._toArrayLikeLE = function(d, _) {
      for (var p = 0, w = 0, b = 0, B = 0; b < this.length; b++) {
        var T = this.words[b] << B | w;
        d[p++] = T & 255, p < d.length && (d[p++] = T >> 8 & 255), p < d.length && (d[p++] = T >> 16 & 255), B === 6 ? (p < d.length && (d[p++] = T >> 24 & 255), w = 0, B = 0) : (w = T >>> 24, B += 2);
      }
      if (p < d.length)
        for (d[p++] = w; p < d.length; )
          d[p++] = 0;
    }, i.prototype._toArrayLikeBE = function(d, _) {
      for (var p = d.length - 1, w = 0, b = 0, B = 0; b < this.length; b++) {
        var T = this.words[b] << B | w;
        d[p--] = T & 255, p >= 0 && (d[p--] = T >> 8 & 255), p >= 0 && (d[p--] = T >> 16 & 255), B === 6 ? (p >= 0 && (d[p--] = T >> 24 & 255), w = 0, B = 0) : (w = T >>> 24, B += 2);
      }
      if (p >= 0)
        for (d[p--] = w; p >= 0; )
          d[p--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(d) {
      return 32 - Math.clz32(d);
    } : i.prototype._countBits = function(d) {
      var _ = d, p = 0;
      return _ >= 4096 && (p += 13, _ >>>= 13), _ >= 64 && (p += 7, _ >>>= 7), _ >= 8 && (p += 4, _ >>>= 4), _ >= 2 && (p += 2, _ >>>= 2), p + _;
    }, i.prototype._zeroBits = function(d) {
      if (d === 0) return 26;
      var _ = d, p = 0;
      return _ & 8191 || (p += 13, _ >>>= 13), _ & 127 || (p += 7, _ >>>= 7), _ & 15 || (p += 4, _ >>>= 4), _ & 3 || (p += 2, _ >>>= 2), _ & 1 || p++, p;
    }, i.prototype.bitLength = function() {
      var d = this.words[this.length - 1], _ = this._countBits(d);
      return (this.length - 1) * 26 + _;
    };
    function N(C) {
      for (var d = new Array(C.bitLength()), _ = 0; _ < d.length; _++) {
        var p = _ / 26 | 0, w = _ % 26;
        d[_] = C.words[p] >>> w & 1;
      }
      return d;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero()) return 0;
      for (var d = 0, _ = 0; _ < this.length; _++) {
        var p = this._zeroBits(this.words[_]);
        if (d += p, p !== 26) break;
      }
      return d;
    }, i.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, i.prototype.toTwos = function(d) {
      return this.negative !== 0 ? this.abs().inotn(d).iaddn(1) : this.clone();
    }, i.prototype.fromTwos = function(d) {
      return this.testn(d - 1) ? this.notn(d).iaddn(1).ineg() : this.clone();
    }, i.prototype.isNeg = function() {
      return this.negative !== 0;
    }, i.prototype.neg = function() {
      return this.clone().ineg();
    }, i.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, i.prototype.iuor = function(d) {
      for (; this.length < d.length; )
        this.words[this.length++] = 0;
      for (var _ = 0; _ < d.length; _++)
        this.words[_] = this.words[_] | d.words[_];
      return this._strip();
    }, i.prototype.ior = function(d) {
      return n((this.negative | d.negative) === 0), this.iuor(d);
    }, i.prototype.or = function(d) {
      return this.length > d.length ? this.clone().ior(d) : d.clone().ior(this);
    }, i.prototype.uor = function(d) {
      return this.length > d.length ? this.clone().iuor(d) : d.clone().iuor(this);
    }, i.prototype.iuand = function(d) {
      var _;
      this.length > d.length ? _ = d : _ = this;
      for (var p = 0; p < _.length; p++)
        this.words[p] = this.words[p] & d.words[p];
      return this.length = _.length, this._strip();
    }, i.prototype.iand = function(d) {
      return n((this.negative | d.negative) === 0), this.iuand(d);
    }, i.prototype.and = function(d) {
      return this.length > d.length ? this.clone().iand(d) : d.clone().iand(this);
    }, i.prototype.uand = function(d) {
      return this.length > d.length ? this.clone().iuand(d) : d.clone().iuand(this);
    }, i.prototype.iuxor = function(d) {
      var _, p;
      this.length > d.length ? (_ = this, p = d) : (_ = d, p = this);
      for (var w = 0; w < p.length; w++)
        this.words[w] = _.words[w] ^ p.words[w];
      if (this !== _)
        for (; w < _.length; w++)
          this.words[w] = _.words[w];
      return this.length = _.length, this._strip();
    }, i.prototype.ixor = function(d) {
      return n((this.negative | d.negative) === 0), this.iuxor(d);
    }, i.prototype.xor = function(d) {
      return this.length > d.length ? this.clone().ixor(d) : d.clone().ixor(this);
    }, i.prototype.uxor = function(d) {
      return this.length > d.length ? this.clone().iuxor(d) : d.clone().iuxor(this);
    }, i.prototype.inotn = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = Math.ceil(d / 26) | 0, p = d % 26;
      this._expand(_), p > 0 && _--;
      for (var w = 0; w < _; w++)
        this.words[w] = ~this.words[w] & 67108863;
      return p > 0 && (this.words[w] = ~this.words[w] & 67108863 >> 26 - p), this._strip();
    }, i.prototype.notn = function(d) {
      return this.clone().inotn(d);
    }, i.prototype.setn = function(d, _) {
      n(typeof d == "number" && d >= 0);
      var p = d / 26 | 0, w = d % 26;
      return this._expand(p + 1), _ ? this.words[p] = this.words[p] | 1 << w : this.words[p] = this.words[p] & ~(1 << w), this._strip();
    }, i.prototype.iadd = function(d) {
      var _;
      if (this.negative !== 0 && d.negative === 0)
        return this.negative = 0, _ = this.isub(d), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && d.negative !== 0)
        return d.negative = 0, _ = this.isub(d), d.negative = 1, _._normSign();
      var p, w;
      this.length > d.length ? (p = this, w = d) : (p = d, w = this);
      for (var b = 0, B = 0; B < w.length; B++)
        _ = (p.words[B] | 0) + (w.words[B] | 0) + b, this.words[B] = _ & 67108863, b = _ >>> 26;
      for (; b !== 0 && B < p.length; B++)
        _ = (p.words[B] | 0) + b, this.words[B] = _ & 67108863, b = _ >>> 26;
      if (this.length = p.length, b !== 0)
        this.words[this.length] = b, this.length++;
      else if (p !== this)
        for (; B < p.length; B++)
          this.words[B] = p.words[B];
      return this;
    }, i.prototype.add = function(d) {
      var _;
      return d.negative !== 0 && this.negative === 0 ? (d.negative = 0, _ = this.sub(d), d.negative ^= 1, _) : d.negative === 0 && this.negative !== 0 ? (this.negative = 0, _ = d.sub(this), this.negative = 1, _) : this.length > d.length ? this.clone().iadd(d) : d.clone().iadd(this);
    }, i.prototype.isub = function(d) {
      if (d.negative !== 0) {
        d.negative = 0;
        var _ = this.iadd(d);
        return d.negative = 1, _._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(d), this.negative = 1, this._normSign();
      var p = this.cmp(d);
      if (p === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var w, b;
      p > 0 ? (w = this, b = d) : (w = d, b = this);
      for (var B = 0, T = 0; T < b.length; T++)
        _ = (w.words[T] | 0) - (b.words[T] | 0) + B, B = _ >> 26, this.words[T] = _ & 67108863;
      for (; B !== 0 && T < w.length; T++)
        _ = (w.words[T] | 0) + B, B = _ >> 26, this.words[T] = _ & 67108863;
      if (B === 0 && T < w.length && w !== this)
        for (; T < w.length; T++)
          this.words[T] = w.words[T];
      return this.length = Math.max(this.length, T), w !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(d) {
      return this.clone().isub(d);
    };
    function O(C, d, _) {
      _.negative = d.negative ^ C.negative;
      var p = C.length + d.length | 0;
      _.length = p, p = p - 1 | 0;
      var w = C.words[0] | 0, b = d.words[0] | 0, B = w * b, T = B & 67108863, I = B / 67108864 | 0;
      _.words[0] = T;
      for (var l = 1; l < p; l++) {
        for (var E = I >>> 26, et = I & 67108863, tt = Math.min(l, d.length - 1), rt = Math.max(0, l - C.length + 1); rt <= tt; rt++) {
          var xt = l - rt | 0;
          w = C.words[xt] | 0, b = d.words[rt] | 0, B = w * b + et, E += B / 67108864 | 0, et = B & 67108863;
        }
        _.words[l] = et | 0, I = E | 0;
      }
      return I !== 0 ? _.words[l] = I | 0 : _.length--, _._strip();
    }
    var G = function(d, _, p) {
      var w = d.words, b = _.words, B = p.words, T = 0, I, l, E, et = w[0] | 0, tt = et & 8191, rt = et >>> 13, xt = w[1] | 0, lt = xt & 8191, mt = xt >>> 13, je = w[2] | 0, bt = je & 8191, pt = je >>> 13, Ie = w[3] | 0, Rt = Ie & 8191, Ft = Ie >>> 13, lc = w[4] | 0, Pt = lc & 8191, kt = lc >>> 13, Ac = w[5] | 0, Ut = Ac & 8191, zt = Ac >>> 13, pc = w[6] | 0, Gt = pc & 8191, Vt = pc >>> 13, fc = w[7] | 0, Ht = fc & 8191, Yt = fc >>> 13, gc = w[8] | 0, Xt = gc & 8191, Wt = gc >>> 13, wc = w[9] | 0, Zt = wc & 8191, jt = wc >>> 13, mc = b[0] | 0, Jt = mc & 8191, qt = mc >>> 13, yc = b[1] | 0, $t = yc & 8191, Kt = yc >>> 13, bc = b[2] | 0, te = bc & 8191, ee = bc >>> 13, Ic = b[3] | 0, re = Ic & 8191, ne = Ic >>> 13, Ec = b[4] | 0, se = Ec & 8191, ie = Ec >>> 13, vc = b[5] | 0, oe = vc & 8191, ae = vc >>> 13, Cc = b[6] | 0, ce = Cc & 8191, de = Cc >>> 13, Bc = b[7] | 0, ue = Bc & 8191, _e = Bc >>> 13, xc = b[8] | 0, he = xc & 8191, le = xc >>> 13, Rc = b[9] | 0, Ae = Rc & 8191, pe = Rc >>> 13;
      p.negative = d.negative ^ _.negative, p.length = 19, I = Math.imul(tt, Jt), l = Math.imul(tt, qt), l = l + Math.imul(rt, Jt) | 0, E = Math.imul(rt, qt);
      var Di = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, I = Math.imul(lt, Jt), l = Math.imul(lt, qt), l = l + Math.imul(mt, Jt) | 0, E = Math.imul(mt, qt), I = I + Math.imul(tt, $t) | 0, l = l + Math.imul(tt, Kt) | 0, l = l + Math.imul(rt, $t) | 0, E = E + Math.imul(rt, Kt) | 0;
      var Qi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, I = Math.imul(bt, Jt), l = Math.imul(bt, qt), l = l + Math.imul(pt, Jt) | 0, E = Math.imul(pt, qt), I = I + Math.imul(lt, $t) | 0, l = l + Math.imul(lt, Kt) | 0, l = l + Math.imul(mt, $t) | 0, E = E + Math.imul(mt, Kt) | 0, I = I + Math.imul(tt, te) | 0, l = l + Math.imul(tt, ee) | 0, l = l + Math.imul(rt, te) | 0, E = E + Math.imul(rt, ee) | 0;
      var Fi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, I = Math.imul(Rt, Jt), l = Math.imul(Rt, qt), l = l + Math.imul(Ft, Jt) | 0, E = Math.imul(Ft, qt), I = I + Math.imul(bt, $t) | 0, l = l + Math.imul(bt, Kt) | 0, l = l + Math.imul(pt, $t) | 0, E = E + Math.imul(pt, Kt) | 0, I = I + Math.imul(lt, te) | 0, l = l + Math.imul(lt, ee) | 0, l = l + Math.imul(mt, te) | 0, E = E + Math.imul(mt, ee) | 0, I = I + Math.imul(tt, re) | 0, l = l + Math.imul(tt, ne) | 0, l = l + Math.imul(rt, re) | 0, E = E + Math.imul(rt, ne) | 0;
      var Oi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, I = Math.imul(Pt, Jt), l = Math.imul(Pt, qt), l = l + Math.imul(kt, Jt) | 0, E = Math.imul(kt, qt), I = I + Math.imul(Rt, $t) | 0, l = l + Math.imul(Rt, Kt) | 0, l = l + Math.imul(Ft, $t) | 0, E = E + Math.imul(Ft, Kt) | 0, I = I + Math.imul(bt, te) | 0, l = l + Math.imul(bt, ee) | 0, l = l + Math.imul(pt, te) | 0, E = E + Math.imul(pt, ee) | 0, I = I + Math.imul(lt, re) | 0, l = l + Math.imul(lt, ne) | 0, l = l + Math.imul(mt, re) | 0, E = E + Math.imul(mt, ne) | 0, I = I + Math.imul(tt, se) | 0, l = l + Math.imul(tt, ie) | 0, l = l + Math.imul(rt, se) | 0, E = E + Math.imul(rt, ie) | 0;
      var Mi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, I = Math.imul(Ut, Jt), l = Math.imul(Ut, qt), l = l + Math.imul(zt, Jt) | 0, E = Math.imul(zt, qt), I = I + Math.imul(Pt, $t) | 0, l = l + Math.imul(Pt, Kt) | 0, l = l + Math.imul(kt, $t) | 0, E = E + Math.imul(kt, Kt) | 0, I = I + Math.imul(Rt, te) | 0, l = l + Math.imul(Rt, ee) | 0, l = l + Math.imul(Ft, te) | 0, E = E + Math.imul(Ft, ee) | 0, I = I + Math.imul(bt, re) | 0, l = l + Math.imul(bt, ne) | 0, l = l + Math.imul(pt, re) | 0, E = E + Math.imul(pt, ne) | 0, I = I + Math.imul(lt, se) | 0, l = l + Math.imul(lt, ie) | 0, l = l + Math.imul(mt, se) | 0, E = E + Math.imul(mt, ie) | 0, I = I + Math.imul(tt, oe) | 0, l = l + Math.imul(tt, ae) | 0, l = l + Math.imul(rt, oe) | 0, E = E + Math.imul(rt, ae) | 0;
      var Li = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, I = Math.imul(Gt, Jt), l = Math.imul(Gt, qt), l = l + Math.imul(Vt, Jt) | 0, E = Math.imul(Vt, qt), I = I + Math.imul(Ut, $t) | 0, l = l + Math.imul(Ut, Kt) | 0, l = l + Math.imul(zt, $t) | 0, E = E + Math.imul(zt, Kt) | 0, I = I + Math.imul(Pt, te) | 0, l = l + Math.imul(Pt, ee) | 0, l = l + Math.imul(kt, te) | 0, E = E + Math.imul(kt, ee) | 0, I = I + Math.imul(Rt, re) | 0, l = l + Math.imul(Rt, ne) | 0, l = l + Math.imul(Ft, re) | 0, E = E + Math.imul(Ft, ne) | 0, I = I + Math.imul(bt, se) | 0, l = l + Math.imul(bt, ie) | 0, l = l + Math.imul(pt, se) | 0, E = E + Math.imul(pt, ie) | 0, I = I + Math.imul(lt, oe) | 0, l = l + Math.imul(lt, ae) | 0, l = l + Math.imul(mt, oe) | 0, E = E + Math.imul(mt, ae) | 0, I = I + Math.imul(tt, ce) | 0, l = l + Math.imul(tt, de) | 0, l = l + Math.imul(rt, ce) | 0, E = E + Math.imul(rt, de) | 0;
      var Pi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, I = Math.imul(Ht, Jt), l = Math.imul(Ht, qt), l = l + Math.imul(Yt, Jt) | 0, E = Math.imul(Yt, qt), I = I + Math.imul(Gt, $t) | 0, l = l + Math.imul(Gt, Kt) | 0, l = l + Math.imul(Vt, $t) | 0, E = E + Math.imul(Vt, Kt) | 0, I = I + Math.imul(Ut, te) | 0, l = l + Math.imul(Ut, ee) | 0, l = l + Math.imul(zt, te) | 0, E = E + Math.imul(zt, ee) | 0, I = I + Math.imul(Pt, re) | 0, l = l + Math.imul(Pt, ne) | 0, l = l + Math.imul(kt, re) | 0, E = E + Math.imul(kt, ne) | 0, I = I + Math.imul(Rt, se) | 0, l = l + Math.imul(Rt, ie) | 0, l = l + Math.imul(Ft, se) | 0, E = E + Math.imul(Ft, ie) | 0, I = I + Math.imul(bt, oe) | 0, l = l + Math.imul(bt, ae) | 0, l = l + Math.imul(pt, oe) | 0, E = E + Math.imul(pt, ae) | 0, I = I + Math.imul(lt, ce) | 0, l = l + Math.imul(lt, de) | 0, l = l + Math.imul(mt, ce) | 0, E = E + Math.imul(mt, de) | 0, I = I + Math.imul(tt, ue) | 0, l = l + Math.imul(tt, _e) | 0, l = l + Math.imul(rt, ue) | 0, E = E + Math.imul(rt, _e) | 0;
      var ki = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, I = Math.imul(Xt, Jt), l = Math.imul(Xt, qt), l = l + Math.imul(Wt, Jt) | 0, E = Math.imul(Wt, qt), I = I + Math.imul(Ht, $t) | 0, l = l + Math.imul(Ht, Kt) | 0, l = l + Math.imul(Yt, $t) | 0, E = E + Math.imul(Yt, Kt) | 0, I = I + Math.imul(Gt, te) | 0, l = l + Math.imul(Gt, ee) | 0, l = l + Math.imul(Vt, te) | 0, E = E + Math.imul(Vt, ee) | 0, I = I + Math.imul(Ut, re) | 0, l = l + Math.imul(Ut, ne) | 0, l = l + Math.imul(zt, re) | 0, E = E + Math.imul(zt, ne) | 0, I = I + Math.imul(Pt, se) | 0, l = l + Math.imul(Pt, ie) | 0, l = l + Math.imul(kt, se) | 0, E = E + Math.imul(kt, ie) | 0, I = I + Math.imul(Rt, oe) | 0, l = l + Math.imul(Rt, ae) | 0, l = l + Math.imul(Ft, oe) | 0, E = E + Math.imul(Ft, ae) | 0, I = I + Math.imul(bt, ce) | 0, l = l + Math.imul(bt, de) | 0, l = l + Math.imul(pt, ce) | 0, E = E + Math.imul(pt, de) | 0, I = I + Math.imul(lt, ue) | 0, l = l + Math.imul(lt, _e) | 0, l = l + Math.imul(mt, ue) | 0, E = E + Math.imul(mt, _e) | 0, I = I + Math.imul(tt, he) | 0, l = l + Math.imul(tt, le) | 0, l = l + Math.imul(rt, he) | 0, E = E + Math.imul(rt, le) | 0;
      var Ui = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, I = Math.imul(Zt, Jt), l = Math.imul(Zt, qt), l = l + Math.imul(jt, Jt) | 0, E = Math.imul(jt, qt), I = I + Math.imul(Xt, $t) | 0, l = l + Math.imul(Xt, Kt) | 0, l = l + Math.imul(Wt, $t) | 0, E = E + Math.imul(Wt, Kt) | 0, I = I + Math.imul(Ht, te) | 0, l = l + Math.imul(Ht, ee) | 0, l = l + Math.imul(Yt, te) | 0, E = E + Math.imul(Yt, ee) | 0, I = I + Math.imul(Gt, re) | 0, l = l + Math.imul(Gt, ne) | 0, l = l + Math.imul(Vt, re) | 0, E = E + Math.imul(Vt, ne) | 0, I = I + Math.imul(Ut, se) | 0, l = l + Math.imul(Ut, ie) | 0, l = l + Math.imul(zt, se) | 0, E = E + Math.imul(zt, ie) | 0, I = I + Math.imul(Pt, oe) | 0, l = l + Math.imul(Pt, ae) | 0, l = l + Math.imul(kt, oe) | 0, E = E + Math.imul(kt, ae) | 0, I = I + Math.imul(Rt, ce) | 0, l = l + Math.imul(Rt, de) | 0, l = l + Math.imul(Ft, ce) | 0, E = E + Math.imul(Ft, de) | 0, I = I + Math.imul(bt, ue) | 0, l = l + Math.imul(bt, _e) | 0, l = l + Math.imul(pt, ue) | 0, E = E + Math.imul(pt, _e) | 0, I = I + Math.imul(lt, he) | 0, l = l + Math.imul(lt, le) | 0, l = l + Math.imul(mt, he) | 0, E = E + Math.imul(mt, le) | 0, I = I + Math.imul(tt, Ae) | 0, l = l + Math.imul(tt, pe) | 0, l = l + Math.imul(rt, Ae) | 0, E = E + Math.imul(rt, pe) | 0;
      var zi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, I = Math.imul(Zt, $t), l = Math.imul(Zt, Kt), l = l + Math.imul(jt, $t) | 0, E = Math.imul(jt, Kt), I = I + Math.imul(Xt, te) | 0, l = l + Math.imul(Xt, ee) | 0, l = l + Math.imul(Wt, te) | 0, E = E + Math.imul(Wt, ee) | 0, I = I + Math.imul(Ht, re) | 0, l = l + Math.imul(Ht, ne) | 0, l = l + Math.imul(Yt, re) | 0, E = E + Math.imul(Yt, ne) | 0, I = I + Math.imul(Gt, se) | 0, l = l + Math.imul(Gt, ie) | 0, l = l + Math.imul(Vt, se) | 0, E = E + Math.imul(Vt, ie) | 0, I = I + Math.imul(Ut, oe) | 0, l = l + Math.imul(Ut, ae) | 0, l = l + Math.imul(zt, oe) | 0, E = E + Math.imul(zt, ae) | 0, I = I + Math.imul(Pt, ce) | 0, l = l + Math.imul(Pt, de) | 0, l = l + Math.imul(kt, ce) | 0, E = E + Math.imul(kt, de) | 0, I = I + Math.imul(Rt, ue) | 0, l = l + Math.imul(Rt, _e) | 0, l = l + Math.imul(Ft, ue) | 0, E = E + Math.imul(Ft, _e) | 0, I = I + Math.imul(bt, he) | 0, l = l + Math.imul(bt, le) | 0, l = l + Math.imul(pt, he) | 0, E = E + Math.imul(pt, le) | 0, I = I + Math.imul(lt, Ae) | 0, l = l + Math.imul(lt, pe) | 0, l = l + Math.imul(mt, Ae) | 0, E = E + Math.imul(mt, pe) | 0;
      var Gi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, I = Math.imul(Zt, te), l = Math.imul(Zt, ee), l = l + Math.imul(jt, te) | 0, E = Math.imul(jt, ee), I = I + Math.imul(Xt, re) | 0, l = l + Math.imul(Xt, ne) | 0, l = l + Math.imul(Wt, re) | 0, E = E + Math.imul(Wt, ne) | 0, I = I + Math.imul(Ht, se) | 0, l = l + Math.imul(Ht, ie) | 0, l = l + Math.imul(Yt, se) | 0, E = E + Math.imul(Yt, ie) | 0, I = I + Math.imul(Gt, oe) | 0, l = l + Math.imul(Gt, ae) | 0, l = l + Math.imul(Vt, oe) | 0, E = E + Math.imul(Vt, ae) | 0, I = I + Math.imul(Ut, ce) | 0, l = l + Math.imul(Ut, de) | 0, l = l + Math.imul(zt, ce) | 0, E = E + Math.imul(zt, de) | 0, I = I + Math.imul(Pt, ue) | 0, l = l + Math.imul(Pt, _e) | 0, l = l + Math.imul(kt, ue) | 0, E = E + Math.imul(kt, _e) | 0, I = I + Math.imul(Rt, he) | 0, l = l + Math.imul(Rt, le) | 0, l = l + Math.imul(Ft, he) | 0, E = E + Math.imul(Ft, le) | 0, I = I + Math.imul(bt, Ae) | 0, l = l + Math.imul(bt, pe) | 0, l = l + Math.imul(pt, Ae) | 0, E = E + Math.imul(pt, pe) | 0;
      var Vi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, I = Math.imul(Zt, re), l = Math.imul(Zt, ne), l = l + Math.imul(jt, re) | 0, E = Math.imul(jt, ne), I = I + Math.imul(Xt, se) | 0, l = l + Math.imul(Xt, ie) | 0, l = l + Math.imul(Wt, se) | 0, E = E + Math.imul(Wt, ie) | 0, I = I + Math.imul(Ht, oe) | 0, l = l + Math.imul(Ht, ae) | 0, l = l + Math.imul(Yt, oe) | 0, E = E + Math.imul(Yt, ae) | 0, I = I + Math.imul(Gt, ce) | 0, l = l + Math.imul(Gt, de) | 0, l = l + Math.imul(Vt, ce) | 0, E = E + Math.imul(Vt, de) | 0, I = I + Math.imul(Ut, ue) | 0, l = l + Math.imul(Ut, _e) | 0, l = l + Math.imul(zt, ue) | 0, E = E + Math.imul(zt, _e) | 0, I = I + Math.imul(Pt, he) | 0, l = l + Math.imul(Pt, le) | 0, l = l + Math.imul(kt, he) | 0, E = E + Math.imul(kt, le) | 0, I = I + Math.imul(Rt, Ae) | 0, l = l + Math.imul(Rt, pe) | 0, l = l + Math.imul(Ft, Ae) | 0, E = E + Math.imul(Ft, pe) | 0;
      var Hi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, I = Math.imul(Zt, se), l = Math.imul(Zt, ie), l = l + Math.imul(jt, se) | 0, E = Math.imul(jt, ie), I = I + Math.imul(Xt, oe) | 0, l = l + Math.imul(Xt, ae) | 0, l = l + Math.imul(Wt, oe) | 0, E = E + Math.imul(Wt, ae) | 0, I = I + Math.imul(Ht, ce) | 0, l = l + Math.imul(Ht, de) | 0, l = l + Math.imul(Yt, ce) | 0, E = E + Math.imul(Yt, de) | 0, I = I + Math.imul(Gt, ue) | 0, l = l + Math.imul(Gt, _e) | 0, l = l + Math.imul(Vt, ue) | 0, E = E + Math.imul(Vt, _e) | 0, I = I + Math.imul(Ut, he) | 0, l = l + Math.imul(Ut, le) | 0, l = l + Math.imul(zt, he) | 0, E = E + Math.imul(zt, le) | 0, I = I + Math.imul(Pt, Ae) | 0, l = l + Math.imul(Pt, pe) | 0, l = l + Math.imul(kt, Ae) | 0, E = E + Math.imul(kt, pe) | 0;
      var Yi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, I = Math.imul(Zt, oe), l = Math.imul(Zt, ae), l = l + Math.imul(jt, oe) | 0, E = Math.imul(jt, ae), I = I + Math.imul(Xt, ce) | 0, l = l + Math.imul(Xt, de) | 0, l = l + Math.imul(Wt, ce) | 0, E = E + Math.imul(Wt, de) | 0, I = I + Math.imul(Ht, ue) | 0, l = l + Math.imul(Ht, _e) | 0, l = l + Math.imul(Yt, ue) | 0, E = E + Math.imul(Yt, _e) | 0, I = I + Math.imul(Gt, he) | 0, l = l + Math.imul(Gt, le) | 0, l = l + Math.imul(Vt, he) | 0, E = E + Math.imul(Vt, le) | 0, I = I + Math.imul(Ut, Ae) | 0, l = l + Math.imul(Ut, pe) | 0, l = l + Math.imul(zt, Ae) | 0, E = E + Math.imul(zt, pe) | 0;
      var Xi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Xi >>> 26) | 0, Xi &= 67108863, I = Math.imul(Zt, ce), l = Math.imul(Zt, de), l = l + Math.imul(jt, ce) | 0, E = Math.imul(jt, de), I = I + Math.imul(Xt, ue) | 0, l = l + Math.imul(Xt, _e) | 0, l = l + Math.imul(Wt, ue) | 0, E = E + Math.imul(Wt, _e) | 0, I = I + Math.imul(Ht, he) | 0, l = l + Math.imul(Ht, le) | 0, l = l + Math.imul(Yt, he) | 0, E = E + Math.imul(Yt, le) | 0, I = I + Math.imul(Gt, Ae) | 0, l = l + Math.imul(Gt, pe) | 0, l = l + Math.imul(Vt, Ae) | 0, E = E + Math.imul(Vt, pe) | 0;
      var Wi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, I = Math.imul(Zt, ue), l = Math.imul(Zt, _e), l = l + Math.imul(jt, ue) | 0, E = Math.imul(jt, _e), I = I + Math.imul(Xt, he) | 0, l = l + Math.imul(Xt, le) | 0, l = l + Math.imul(Wt, he) | 0, E = E + Math.imul(Wt, le) | 0, I = I + Math.imul(Ht, Ae) | 0, l = l + Math.imul(Ht, pe) | 0, l = l + Math.imul(Yt, Ae) | 0, E = E + Math.imul(Yt, pe) | 0;
      var Zi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, I = Math.imul(Zt, he), l = Math.imul(Zt, le), l = l + Math.imul(jt, he) | 0, E = Math.imul(jt, le), I = I + Math.imul(Xt, Ae) | 0, l = l + Math.imul(Xt, pe) | 0, l = l + Math.imul(Wt, Ae) | 0, E = E + Math.imul(Wt, pe) | 0;
      var ji = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (ji >>> 26) | 0, ji &= 67108863, I = Math.imul(Zt, Ae), l = Math.imul(Zt, pe), l = l + Math.imul(jt, Ae) | 0, E = Math.imul(jt, pe);
      var Ji = (T + I | 0) + ((l & 8191) << 13) | 0;
      return T = (E + (l >>> 13) | 0) + (Ji >>> 26) | 0, Ji &= 67108863, B[0] = Di, B[1] = Qi, B[2] = Fi, B[3] = Oi, B[4] = Mi, B[5] = Li, B[6] = Pi, B[7] = ki, B[8] = Ui, B[9] = zi, B[10] = Gi, B[11] = Vi, B[12] = Hi, B[13] = Yi, B[14] = Xi, B[15] = Wi, B[16] = Zi, B[17] = ji, B[18] = Ji, T !== 0 && (B[19] = T, p.length++), p;
    };
    Math.imul || (G = O);
    function L(C, d, _) {
      _.negative = d.negative ^ C.negative, _.length = C.length + d.length;
      for (var p = 0, w = 0, b = 0; b < _.length - 1; b++) {
        var B = w;
        w = 0;
        for (var T = p & 67108863, I = Math.min(b, d.length - 1), l = Math.max(0, b - C.length + 1); l <= I; l++) {
          var E = b - l, et = C.words[E] | 0, tt = d.words[l] | 0, rt = et * tt, xt = rt & 67108863;
          B = B + (rt / 67108864 | 0) | 0, xt = xt + T | 0, T = xt & 67108863, B = B + (xt >>> 26) | 0, w += B >>> 26, B &= 67108863;
        }
        _.words[b] = T, p = B, B = w;
      }
      return p !== 0 ? _.words[b] = p : _.length--, _._strip();
    }
    function z(C, d, _) {
      return L(C, d, _);
    }
    i.prototype.mulTo = function(d, _) {
      var p, w = this.length + d.length;
      return this.length === 10 && d.length === 10 ? p = G(this, d, _) : w < 63 ? p = O(this, d, _) : w < 1024 ? p = L(this, d, _) : p = z(this, d, _), p;
    }, i.prototype.mul = function(d) {
      var _ = new i(null);
      return _.words = new Array(this.length + d.length), this.mulTo(d, _);
    }, i.prototype.mulf = function(d) {
      var _ = new i(null);
      return _.words = new Array(this.length + d.length), z(this, d, _);
    }, i.prototype.imul = function(d) {
      return this.clone().mulTo(d, this);
    }, i.prototype.imuln = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(typeof d == "number"), n(d < 67108864);
      for (var p = 0, w = 0; w < this.length; w++) {
        var b = (this.words[w] | 0) * d, B = (b & 67108863) + (p & 67108863);
        p >>= 26, p += b / 67108864 | 0, p += B >>> 26, this.words[w] = B & 67108863;
      }
      return p !== 0 && (this.words[w] = p, this.length++), _ ? this.ineg() : this;
    }, i.prototype.muln = function(d) {
      return this.clone().imuln(d);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(d) {
      var _ = N(d);
      if (_.length === 0) return new i(1);
      for (var p = this, w = 0; w < _.length && _[w] === 0; w++, p = p.sqr())
        ;
      if (++w < _.length)
        for (var b = p.sqr(); w < _.length; w++, b = b.sqr())
          _[w] !== 0 && (p = p.mul(b));
      return p;
    }, i.prototype.iushln = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = d % 26, p = (d - _) / 26, w = 67108863 >>> 26 - _ << 26 - _, b;
      if (_ !== 0) {
        var B = 0;
        for (b = 0; b < this.length; b++) {
          var T = this.words[b] & w, I = (this.words[b] | 0) - T << _;
          this.words[b] = I | B, B = T >>> 26 - _;
        }
        B && (this.words[b] = B, this.length++);
      }
      if (p !== 0) {
        for (b = this.length - 1; b >= 0; b--)
          this.words[b + p] = this.words[b];
        for (b = 0; b < p; b++)
          this.words[b] = 0;
        this.length += p;
      }
      return this._strip();
    }, i.prototype.ishln = function(d) {
      return n(this.negative === 0), this.iushln(d);
    }, i.prototype.iushrn = function(d, _, p) {
      n(typeof d == "number" && d >= 0);
      var w;
      _ ? w = (_ - _ % 26) / 26 : w = 0;
      var b = d % 26, B = Math.min((d - b) / 26, this.length), T = 67108863 ^ 67108863 >>> b << b, I = p;
      if (w -= B, w = Math.max(0, w), I) {
        for (var l = 0; l < B; l++)
          I.words[l] = this.words[l];
        I.length = B;
      }
      if (B !== 0) if (this.length > B)
        for (this.length -= B, l = 0; l < this.length; l++)
          this.words[l] = this.words[l + B];
      else
        this.words[0] = 0, this.length = 1;
      var E = 0;
      for (l = this.length - 1; l >= 0 && (E !== 0 || l >= w); l--) {
        var et = this.words[l] | 0;
        this.words[l] = E << 26 - b | et >>> b, E = et & T;
      }
      return I && E !== 0 && (I.words[I.length++] = E), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(d, _, p) {
      return n(this.negative === 0), this.iushrn(d, _, p);
    }, i.prototype.shln = function(d) {
      return this.clone().ishln(d);
    }, i.prototype.ushln = function(d) {
      return this.clone().iushln(d);
    }, i.prototype.shrn = function(d) {
      return this.clone().ishrn(d);
    }, i.prototype.ushrn = function(d) {
      return this.clone().iushrn(d);
    }, i.prototype.testn = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = d % 26, p = (d - _) / 26, w = 1 << _;
      if (this.length <= p) return !1;
      var b = this.words[p];
      return !!(b & w);
    }, i.prototype.imaskn = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = d % 26, p = (d - _) / 26;
      if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= p)
        return this;
      if (_ !== 0 && p++, this.length = Math.min(p, this.length), _ !== 0) {
        var w = 67108863 ^ 67108863 >>> _ << _;
        this.words[this.length - 1] &= w;
      }
      return this._strip();
    }, i.prototype.maskn = function(d) {
      return this.clone().imaskn(d);
    }, i.prototype.iaddn = function(d) {
      return n(typeof d == "number"), n(d < 67108864), d < 0 ? this.isubn(-d) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= d ? (this.words[0] = d - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(d), this.negative = 1, this) : this._iaddn(d);
    }, i.prototype._iaddn = function(d) {
      this.words[0] += d;
      for (var _ = 0; _ < this.length && this.words[_] >= 67108864; _++)
        this.words[_] -= 67108864, _ === this.length - 1 ? this.words[_ + 1] = 1 : this.words[_ + 1]++;
      return this.length = Math.max(this.length, _ + 1), this;
    }, i.prototype.isubn = function(d) {
      if (n(typeof d == "number"), n(d < 67108864), d < 0) return this.iaddn(-d);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(d), this.negative = 1, this;
      if (this.words[0] -= d, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var _ = 0; _ < this.length && this.words[_] < 0; _++)
          this.words[_] += 67108864, this.words[_ + 1] -= 1;
      return this._strip();
    }, i.prototype.addn = function(d) {
      return this.clone().iaddn(d);
    }, i.prototype.subn = function(d) {
      return this.clone().isubn(d);
    }, i.prototype.iabs = function() {
      return this.negative = 0, this;
    }, i.prototype.abs = function() {
      return this.clone().iabs();
    }, i.prototype._ishlnsubmul = function(d, _, p) {
      var w = d.length + p, b;
      this._expand(w);
      var B, T = 0;
      for (b = 0; b < d.length; b++) {
        B = (this.words[b + p] | 0) + T;
        var I = (d.words[b] | 0) * _;
        B -= I & 67108863, T = (B >> 26) - (I / 67108864 | 0), this.words[b + p] = B & 67108863;
      }
      for (; b < this.length - p; b++)
        B = (this.words[b + p] | 0) + T, T = B >> 26, this.words[b + p] = B & 67108863;
      if (T === 0) return this._strip();
      for (n(T === -1), T = 0, b = 0; b < this.length; b++)
        B = -(this.words[b] | 0) + T, T = B >> 26, this.words[b] = B & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(d, _) {
      var p = this.length - d.length, w = this.clone(), b = d, B = b.words[b.length - 1] | 0, T = this._countBits(B);
      p = 26 - T, p !== 0 && (b = b.ushln(p), w.iushln(p), B = b.words[b.length - 1] | 0);
      var I = w.length - b.length, l;
      if (_ !== "mod") {
        l = new i(null), l.length = I + 1, l.words = new Array(l.length);
        for (var E = 0; E < l.length; E++)
          l.words[E] = 0;
      }
      var et = w.clone()._ishlnsubmul(b, 1, I);
      et.negative === 0 && (w = et, l && (l.words[I] = 1));
      for (var tt = I - 1; tt >= 0; tt--) {
        var rt = (w.words[b.length + tt] | 0) * 67108864 + (w.words[b.length + tt - 1] | 0);
        for (rt = Math.min(rt / B | 0, 67108863), w._ishlnsubmul(b, rt, tt); w.negative !== 0; )
          rt--, w.negative = 0, w._ishlnsubmul(b, 1, tt), w.isZero() || (w.negative ^= 1);
        l && (l.words[tt] = rt);
      }
      return l && l._strip(), w._strip(), _ !== "div" && p !== 0 && w.iushrn(p), {
        div: l || null,
        mod: w
      };
    }, i.prototype.divmod = function(d, _, p) {
      if (n(!d.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var w, b, B;
      return this.negative !== 0 && d.negative === 0 ? (B = this.neg().divmod(d, _), _ !== "mod" && (w = B.div.neg()), _ !== "div" && (b = B.mod.neg(), p && b.negative !== 0 && b.iadd(d)), {
        div: w,
        mod: b
      }) : this.negative === 0 && d.negative !== 0 ? (B = this.divmod(d.neg(), _), _ !== "mod" && (w = B.div.neg()), {
        div: w,
        mod: B.mod
      }) : this.negative & d.negative ? (B = this.neg().divmod(d.neg(), _), _ !== "div" && (b = B.mod.neg(), p && b.negative !== 0 && b.isub(d)), {
        div: B.div,
        mod: b
      }) : d.length > this.length || this.cmp(d) < 0 ? {
        div: new i(0),
        mod: this
      } : d.length === 1 ? _ === "div" ? {
        div: this.divn(d.words[0]),
        mod: null
      } : _ === "mod" ? {
        div: null,
        mod: new i(this.modrn(d.words[0]))
      } : {
        div: this.divn(d.words[0]),
        mod: new i(this.modrn(d.words[0]))
      } : this._wordDiv(d, _);
    }, i.prototype.div = function(d) {
      return this.divmod(d, "div", !1).div;
    }, i.prototype.mod = function(d) {
      return this.divmod(d, "mod", !1).mod;
    }, i.prototype.umod = function(d) {
      return this.divmod(d, "mod", !0).mod;
    }, i.prototype.divRound = function(d) {
      var _ = this.divmod(d);
      if (_.mod.isZero()) return _.div;
      var p = _.div.negative !== 0 ? _.mod.isub(d) : _.mod, w = d.ushrn(1), b = d.andln(1), B = p.cmp(w);
      return B < 0 || b === 1 && B === 0 ? _.div : _.div.negative !== 0 ? _.div.isubn(1) : _.div.iaddn(1);
    }, i.prototype.modrn = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(d <= 67108863);
      for (var p = (1 << 26) % d, w = 0, b = this.length - 1; b >= 0; b--)
        w = (p * w + (this.words[b] | 0)) % d;
      return _ ? -w : w;
    }, i.prototype.modn = function(d) {
      return this.modrn(d);
    }, i.prototype.idivn = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(d <= 67108863);
      for (var p = 0, w = this.length - 1; w >= 0; w--) {
        var b = (this.words[w] | 0) + p * 67108864;
        this.words[w] = b / d | 0, p = b % d;
      }
      return this._strip(), _ ? this.ineg() : this;
    }, i.prototype.divn = function(d) {
      return this.clone().idivn(d);
    }, i.prototype.egcd = function(d) {
      n(d.negative === 0), n(!d.isZero());
      var _ = this, p = d.clone();
      _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
      for (var w = new i(1), b = new i(0), B = new i(0), T = new i(1), I = 0; _.isEven() && p.isEven(); )
        _.iushrn(1), p.iushrn(1), ++I;
      for (var l = p.clone(), E = _.clone(); !_.isZero(); ) {
        for (var et = 0, tt = 1; !(_.words[0] & tt) && et < 26; ++et, tt <<= 1) ;
        if (et > 0)
          for (_.iushrn(et); et-- > 0; )
            (w.isOdd() || b.isOdd()) && (w.iadd(l), b.isub(E)), w.iushrn(1), b.iushrn(1);
        for (var rt = 0, xt = 1; !(p.words[0] & xt) && rt < 26; ++rt, xt <<= 1) ;
        if (rt > 0)
          for (p.iushrn(rt); rt-- > 0; )
            (B.isOdd() || T.isOdd()) && (B.iadd(l), T.isub(E)), B.iushrn(1), T.iushrn(1);
        _.cmp(p) >= 0 ? (_.isub(p), w.isub(B), b.isub(T)) : (p.isub(_), B.isub(w), T.isub(b));
      }
      return {
        a: B,
        b: T,
        gcd: p.iushln(I)
      };
    }, i.prototype._invmp = function(d) {
      n(d.negative === 0), n(!d.isZero());
      var _ = this, p = d.clone();
      _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
      for (var w = new i(1), b = new i(0), B = p.clone(); _.cmpn(1) > 0 && p.cmpn(1) > 0; ) {
        for (var T = 0, I = 1; !(_.words[0] & I) && T < 26; ++T, I <<= 1) ;
        if (T > 0)
          for (_.iushrn(T); T-- > 0; )
            w.isOdd() && w.iadd(B), w.iushrn(1);
        for (var l = 0, E = 1; !(p.words[0] & E) && l < 26; ++l, E <<= 1) ;
        if (l > 0)
          for (p.iushrn(l); l-- > 0; )
            b.isOdd() && b.iadd(B), b.iushrn(1);
        _.cmp(p) >= 0 ? (_.isub(p), w.isub(b)) : (p.isub(_), b.isub(w));
      }
      var et;
      return _.cmpn(1) === 0 ? et = w : et = b, et.cmpn(0) < 0 && et.iadd(d), et;
    }, i.prototype.gcd = function(d) {
      if (this.isZero()) return d.abs();
      if (d.isZero()) return this.abs();
      var _ = this.clone(), p = d.clone();
      _.negative = 0, p.negative = 0;
      for (var w = 0; _.isEven() && p.isEven(); w++)
        _.iushrn(1), p.iushrn(1);
      do {
        for (; _.isEven(); )
          _.iushrn(1);
        for (; p.isEven(); )
          p.iushrn(1);
        var b = _.cmp(p);
        if (b < 0) {
          var B = _;
          _ = p, p = B;
        } else if (b === 0 || p.cmpn(1) === 0)
          break;
        _.isub(p);
      } while (!0);
      return p.iushln(w);
    }, i.prototype.invm = function(d) {
      return this.egcd(d).a.umod(d);
    }, i.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, i.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, i.prototype.andln = function(d) {
      return this.words[0] & d;
    }, i.prototype.bincn = function(d) {
      n(typeof d == "number");
      var _ = d % 26, p = (d - _) / 26, w = 1 << _;
      if (this.length <= p)
        return this._expand(p + 1), this.words[p] |= w, this;
      for (var b = w, B = p; b !== 0 && B < this.length; B++) {
        var T = this.words[B] | 0;
        T += b, b = T >>> 26, T &= 67108863, this.words[B] = T;
      }
      return b !== 0 && (this.words[B] = b, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(d) {
      var _ = d < 0;
      if (this.negative !== 0 && !_) return -1;
      if (this.negative === 0 && _) return 1;
      this._strip();
      var p;
      if (this.length > 1)
        p = 1;
      else {
        _ && (d = -d), n(d <= 67108863, "Number is too big");
        var w = this.words[0] | 0;
        p = w === d ? 0 : w < d ? -1 : 1;
      }
      return this.negative !== 0 ? -p | 0 : p;
    }, i.prototype.cmp = function(d) {
      if (this.negative !== 0 && d.negative === 0) return -1;
      if (this.negative === 0 && d.negative !== 0) return 1;
      var _ = this.ucmp(d);
      return this.negative !== 0 ? -_ | 0 : _;
    }, i.prototype.ucmp = function(d) {
      if (this.length > d.length) return 1;
      if (this.length < d.length) return -1;
      for (var _ = 0, p = this.length - 1; p >= 0; p--) {
        var w = this.words[p] | 0, b = d.words[p] | 0;
        if (w !== b) {
          w < b ? _ = -1 : w > b && (_ = 1);
          break;
        }
      }
      return _;
    }, i.prototype.gtn = function(d) {
      return this.cmpn(d) === 1;
    }, i.prototype.gt = function(d) {
      return this.cmp(d) === 1;
    }, i.prototype.gten = function(d) {
      return this.cmpn(d) >= 0;
    }, i.prototype.gte = function(d) {
      return this.cmp(d) >= 0;
    }, i.prototype.ltn = function(d) {
      return this.cmpn(d) === -1;
    }, i.prototype.lt = function(d) {
      return this.cmp(d) === -1;
    }, i.prototype.lten = function(d) {
      return this.cmpn(d) <= 0;
    }, i.prototype.lte = function(d) {
      return this.cmp(d) <= 0;
    }, i.prototype.eqn = function(d) {
      return this.cmpn(d) === 0;
    }, i.prototype.eq = function(d) {
      return this.cmp(d) === 0;
    }, i.red = function(d) {
      return new q(d);
    }, i.prototype.toRed = function(d) {
      return n(!this.red, "Already a number in reduction context"), n(this.negative === 0, "red works only with positives"), d.convertTo(this)._forceRed(d);
    }, i.prototype.fromRed = function() {
      return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, i.prototype._forceRed = function(d) {
      return this.red = d, this;
    }, i.prototype.forceRed = function(d) {
      return n(!this.red, "Already a number in reduction context"), this._forceRed(d);
    }, i.prototype.redAdd = function(d) {
      return n(this.red, "redAdd works only with red numbers"), this.red.add(this, d);
    }, i.prototype.redIAdd = function(d) {
      return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, d);
    }, i.prototype.redSub = function(d) {
      return n(this.red, "redSub works only with red numbers"), this.red.sub(this, d);
    }, i.prototype.redISub = function(d) {
      return n(this.red, "redISub works only with red numbers"), this.red.isub(this, d);
    }, i.prototype.redShl = function(d) {
      return n(this.red, "redShl works only with red numbers"), this.red.shl(this, d);
    }, i.prototype.redMul = function(d) {
      return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, d), this.red.mul(this, d);
    }, i.prototype.redIMul = function(d) {
      return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, d), this.red.imul(this, d);
    }, i.prototype.redSqr = function() {
      return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, i.prototype.redISqr = function() {
      return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, i.prototype.redSqrt = function() {
      return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, i.prototype.redInvm = function() {
      return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, i.prototype.redNeg = function() {
      return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, i.prototype.redPow = function(d) {
      return n(this.red && !d.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, d);
    };
    var P = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function Z(C, d) {
      this.name = C, this.p = new i(d, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    Z.prototype._tmp = function() {
      var d = new i(null);
      return d.words = new Array(Math.ceil(this.n / 13)), d;
    }, Z.prototype.ireduce = function(d) {
      var _ = d, p;
      do
        this.split(_, this.tmp), _ = this.imulK(_), _ = _.iadd(this.tmp), p = _.bitLength();
      while (p > this.n);
      var w = p < this.n ? -1 : _.ucmp(this.p);
      return w === 0 ? (_.words[0] = 0, _.length = 1) : w > 0 ? _.isub(this.p) : _.strip !== void 0 ? _.strip() : _._strip(), _;
    }, Z.prototype.split = function(d, _) {
      d.iushrn(this.n, 0, _);
    }, Z.prototype.imulK = function(d) {
      return d.imul(this.k);
    };
    function j() {
      Z.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(j, Z), j.prototype.split = function(d, _) {
      for (var p = 4194303, w = Math.min(d.length, 9), b = 0; b < w; b++)
        _.words[b] = d.words[b];
      if (_.length = w, d.length <= 9) {
        d.words[0] = 0, d.length = 1;
        return;
      }
      var B = d.words[9];
      for (_.words[_.length++] = B & p, b = 10; b < d.length; b++) {
        var T = d.words[b] | 0;
        d.words[b - 10] = (T & p) << 4 | B >>> 22, B = T;
      }
      B >>>= 22, d.words[b - 10] = B, B === 0 && d.length > 10 ? d.length -= 10 : d.length -= 9;
    }, j.prototype.imulK = function(d) {
      d.words[d.length] = 0, d.words[d.length + 1] = 0, d.length += 2;
      for (var _ = 0, p = 0; p < d.length; p++) {
        var w = d.words[p] | 0;
        _ += w * 977, d.words[p] = _ & 67108863, _ = w * 64 + (_ / 67108864 | 0);
      }
      return d.words[d.length - 1] === 0 && (d.length--, d.words[d.length - 1] === 0 && d.length--), d;
    };
    function V() {
      Z.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(V, Z);
    function U() {
      Z.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(U, Z);
    function ot() {
      Z.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(ot, Z), ot.prototype.imulK = function(d) {
      for (var _ = 0, p = 0; p < d.length; p++) {
        var w = (d.words[p] | 0) * 19 + _, b = w & 67108863;
        w >>>= 26, d.words[p] = b, _ = w;
      }
      return _ !== 0 && (d.words[d.length++] = _), d;
    }, i._prime = function(d) {
      if (P[d]) return P[d];
      var _;
      if (d === "k256")
        _ = new j();
      else if (d === "p224")
        _ = new V();
      else if (d === "p192")
        _ = new U();
      else if (d === "p25519")
        _ = new ot();
      else
        throw new Error("Unknown prime " + d);
      return P[d] = _, _;
    };
    function q(C) {
      if (typeof C == "string") {
        var d = i._prime(C);
        this.m = d.p, this.prime = d;
      } else
        n(C.gtn(1), "modulus must be greater than 1"), this.m = C, this.prime = null;
    }
    q.prototype._verify1 = function(d) {
      n(d.negative === 0, "red works only with positives"), n(d.red, "red works only with red numbers");
    }, q.prototype._verify2 = function(d, _) {
      n((d.negative | _.negative) === 0, "red works only with positives"), n(
        d.red && d.red === _.red,
        "red works only with red numbers"
      );
    }, q.prototype.imod = function(d) {
      return this.prime ? this.prime.ireduce(d)._forceRed(this) : (f(d, d.umod(this.m)._forceRed(this)), d);
    }, q.prototype.neg = function(d) {
      return d.isZero() ? d.clone() : this.m.sub(d)._forceRed(this);
    }, q.prototype.add = function(d, _) {
      this._verify2(d, _);
      var p = d.add(_);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p._forceRed(this);
    }, q.prototype.iadd = function(d, _) {
      this._verify2(d, _);
      var p = d.iadd(_);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p;
    }, q.prototype.sub = function(d, _) {
      this._verify2(d, _);
      var p = d.sub(_);
      return p.cmpn(0) < 0 && p.iadd(this.m), p._forceRed(this);
    }, q.prototype.isub = function(d, _) {
      this._verify2(d, _);
      var p = d.isub(_);
      return p.cmpn(0) < 0 && p.iadd(this.m), p;
    }, q.prototype.shl = function(d, _) {
      return this._verify1(d), this.imod(d.ushln(_));
    }, q.prototype.imul = function(d, _) {
      return this._verify2(d, _), this.imod(d.imul(_));
    }, q.prototype.mul = function(d, _) {
      return this._verify2(d, _), this.imod(d.mul(_));
    }, q.prototype.isqr = function(d) {
      return this.imul(d, d.clone());
    }, q.prototype.sqr = function(d) {
      return this.mul(d, d);
    }, q.prototype.sqrt = function(d) {
      if (d.isZero()) return d.clone();
      var _ = this.m.andln(3);
      if (n(_ % 2 === 1), _ === 3) {
        var p = this.m.add(new i(1)).iushrn(2);
        return this.pow(d, p);
      }
      for (var w = this.m.subn(1), b = 0; !w.isZero() && w.andln(1) === 0; )
        b++, w.iushrn(1);
      n(!w.isZero());
      var B = new i(1).toRed(this), T = B.redNeg(), I = this.m.subn(1).iushrn(1), l = this.m.bitLength();
      for (l = new i(2 * l * l).toRed(this); this.pow(l, I).cmp(T) !== 0; )
        l.redIAdd(T);
      for (var E = this.pow(l, w), et = this.pow(d, w.addn(1).iushrn(1)), tt = this.pow(d, w), rt = b; tt.cmp(B) !== 0; ) {
        for (var xt = tt, lt = 0; xt.cmp(B) !== 0; lt++)
          xt = xt.redSqr();
        n(lt < rt);
        var mt = this.pow(E, new i(1).iushln(rt - lt - 1));
        et = et.redMul(mt), E = mt.redSqr(), tt = tt.redMul(E), rt = lt;
      }
      return et;
    }, q.prototype.invm = function(d) {
      var _ = d._invmp(this.m);
      return _.negative !== 0 ? (_.negative = 0, this.imod(_).redNeg()) : this.imod(_);
    }, q.prototype.pow = function(d, _) {
      if (_.isZero()) return new i(1).toRed(this);
      if (_.cmpn(1) === 0) return d.clone();
      var p = 4, w = new Array(1 << p);
      w[0] = new i(1).toRed(this), w[1] = d;
      for (var b = 2; b < w.length; b++)
        w[b] = this.mul(w[b - 1], d);
      var B = w[0], T = 0, I = 0, l = _.bitLength() % 26;
      for (l === 0 && (l = 26), b = _.length - 1; b >= 0; b--) {
        for (var E = _.words[b], et = l - 1; et >= 0; et--) {
          var tt = E >> et & 1;
          if (B !== w[0] && (B = this.sqr(B)), tt === 0 && T === 0) {
            I = 0;
            continue;
          }
          T <<= 1, T |= tt, I++, !(I !== p && (b !== 0 || et !== 0)) && (B = this.mul(B, w[T]), I = 0, T = 0);
        }
        l = 26;
      }
      return B;
    }, q.prototype.convertTo = function(d) {
      var _ = d.umod(this.m);
      return _ === d ? _.clone() : _;
    }, q.prototype.convertFrom = function(d) {
      var _ = d.clone();
      return _.red = null, _;
    }, i.mont = function(d) {
      return new $(d);
    };
    function $(C) {
      q.call(this, C), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s($, q), $.prototype.convertTo = function(d) {
      return this.imod(d.ushln(this.shift));
    }, $.prototype.convertFrom = function(d) {
      var _ = this.imod(d.mul(this.rinv));
      return _.red = null, _;
    }, $.prototype.imul = function(d, _) {
      if (d.isZero() || _.isZero())
        return d.words[0] = 0, d.length = 1, d;
      var p = d.imul(_), w = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), b = p.isub(w).iushrn(this.shift), B = b;
      return b.cmp(this.m) >= 0 ? B = b.isub(this.m) : b.cmpn(0) < 0 && (B = b.iadd(this.m)), B._forceRed(this);
    }, $.prototype.mul = function(d, _) {
      if (d.isZero() || _.isZero()) return new i(0)._forceRed(this);
      var p = d.mul(_), w = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), b = p.isub(w).iushrn(this.shift), B = b;
      return b.cmp(this.m) >= 0 ? B = b.isub(this.m) : b.cmpn(0) < 0 && (B = b.iadd(this.m)), B._forceRed(this);
    }, $.prototype.invm = function(d) {
      var _ = this.imod(d._invmp(this.m).mul(this.r2));
      return _._forceRed(this);
    };
  })(e, To);
})(pa);
var Ep = pa.exports;
const ms = /* @__PURE__ */ dh(Ep);
var uh = 9, _h = 3, No = 9, Ot = class extends ms {
  constructor(t, r, n) {
    let s = t, i = r;
    Ot.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = r || "hex");
    super(s ?? 0, i, n);
    F(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
  }
  // ANCHOR: HELPERS
  // make sure we always include `0x` in hex strings
  toString(t, r) {
    const n = super.toString(t, r);
    return t === 16 || t === "hex" ? `0x${n}` : n;
  }
  toHex(t) {
    const n = (t || 0) * 2;
    if (this.isNeg())
      throw new v(D.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new v(
        D.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, n);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new v(D.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: r = No,
      precision: n = uh,
      minPrecision: s = _h
    } = t || {};
    if (r === 0)
      return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const i = s > n ? n : s, o = n > s ? n : s, a = this.formatUnits(r), [u, A = ""] = a.split("."), f = u.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (o === 0)
      return f;
    let g = A.replace(/0+$/, "");
    if (g.length > o)
      if (u === "0") {
        const y = g.search(/[1-9]/);
        y >= 0 && y < o ? g = g.slice(0, o) : g = g.slice(0, y + 1);
      } else
        g = g.slice(0, o);
    else
      g = g.slice(0, o);
    return g.length < i && (g = g.padEnd(i, "0")), g === "" && i === 0 ? f : g ? `${f}.${g}` : f;
  }
  formatUnits(t = No) {
    const r = this.toString(), n = r.length;
    if (n <= t)
      return `0.${"0".repeat(t - n)}${r}`;
    const s = r.slice(0, n - t), i = r.slice(n - t);
    return `${s}.${i}`;
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
    return new Ot(super.sqr().toArray());
  }
  neg() {
    return new Ot(super.neg().toArray());
  }
  abs() {
    return new Ot(super.abs().toArray());
  }
  toTwos(t) {
    return new Ot(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new Ot(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, r) {
    const n = super[r](new Ot(t));
    return Ot.isBN(n) ? new Ot(n.toArray()) : n;
  }
  clone() {
    return new Ot(this.toArray());
  }
  mulTo(t, r) {
    const n = new ms(this.toArray()).mulTo(t, r);
    return new Ot(n.toArray());
  }
  egcd(t) {
    const { a: r, b: n, gcd: s } = new ms(this.toArray()).egcd(t);
    return {
      a: new Ot(r.toArray()),
      b: new Ot(n.toArray()),
      gcd: new Ot(s.toArray())
    };
  }
  divmod(t, r, n) {
    const { div: s, mod: i } = new ms(this.toArray()).divmod(new Ot(t), r, n);
    return {
      div: new Ot(s == null ? void 0 : s.toArray()),
      mod: new Ot(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Ot(this.MAX_U64) : this;
  }
  max(t) {
    return this.gte(t) ? new Ot(t) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Ot(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, x = (e, t, r) => new Ot(e, t, r);
x.parseUnits = (e, t = No) => {
  const r = e === "." ? "0." : e, [n = "0", s = "0"] = r.split("."), i = s.length;
  if (t === 0) {
    const u = r.replace(",", "").split(".")[0];
    return x(u);
  }
  if (i > t)
    throw new v(
      D.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const a = `${n.replaceAll(",", "")}${o.join("")}`;
  return x(a);
};
function TB(e, t) {
  const { precision: r = uh, minPrecision: n = _h } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, a = s.replace(o, "$1,");
  let u = i.slice(0, r);
  if (n < r) {
    const f = u.match(/.*[1-9]{1}/), g = (f == null ? void 0 : f[0].length) || 0, y = Math.max(n, g);
    u = u.slice(0, y);
  }
  const A = u ? `.${u}` : "";
  return `${a}${A}`;
}
function xr(e) {
  return x(e).toNumber();
}
function fa(e, t) {
  return x(e).toHex(t);
}
function lr(e, t) {
  return x(e).toBytes(t);
}
function NB(e, t) {
  return x(e).formatUnits(t);
}
function DB(e, t) {
  return x(e).format(t);
}
function QB(...e) {
  return e.reduce((t, r) => x(r).gt(t) ? x(r) : t, x(0));
}
function FB(...e) {
  return x(Math.ceil(e.reduce((t, r) => x(t).mul(r), x(1)).toNumber()));
}
var ye = Uint8Array, Me = Uint16Array, ga = Int32Array, pi = new ye([
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
]), fi = new ye([
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
]), Do = new ye([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), hh = function(e, t) {
  for (var r = new Me(31), n = 0; n < 31; ++n)
    r[n] = t += 1 << e[n - 1];
  for (var s = new ga(r[30]), n = 1; n < 30; ++n)
    for (var i = r[n]; i < r[n + 1]; ++i)
      s[i] = i - r[n] << 5 | n;
  return { b: r, r: s };
}, lh = hh(pi, 2), Ah = lh.b, Qo = lh.r;
Ah[28] = 258, Qo[258] = 28;
var ph = hh(fi, 0), vp = ph.b, Nc = ph.r, Fo = new Me(32768);
for (var Qt = 0; Qt < 32768; ++Qt) {
  var wr = (Qt & 43690) >> 1 | (Qt & 21845) << 1;
  wr = (wr & 52428) >> 2 | (wr & 13107) << 2, wr = (wr & 61680) >> 4 | (wr & 3855) << 4, Fo[Qt] = ((wr & 65280) >> 8 | (wr & 255) << 8) >> 1;
}
var er = function(e, t, r) {
  for (var n = e.length, s = 0, i = new Me(t); s < n; ++s)
    e[s] && ++i[e[s] - 1];
  var o = new Me(t);
  for (s = 1; s < t; ++s)
    o[s] = o[s - 1] + i[s - 1] << 1;
  var a;
  if (r) {
    a = new Me(1 << t);
    var u = 15 - t;
    for (s = 0; s < n; ++s)
      if (e[s])
        for (var A = s << 4 | e[s], f = t - e[s], g = o[e[s] - 1]++ << f, y = g | (1 << f) - 1; g <= y; ++g)
          a[Fo[g] >> u] = A;
  } else
    for (a = new Me(n), s = 0; s < n; ++s)
      e[s] && (a[s] = Fo[o[e[s] - 1]++] >> 15 - e[s]);
  return a;
}, Fr = new ye(288);
for (var Qt = 0; Qt < 144; ++Qt)
  Fr[Qt] = 8;
for (var Qt = 144; Qt < 256; ++Qt)
  Fr[Qt] = 9;
for (var Qt = 256; Qt < 280; ++Qt)
  Fr[Qt] = 7;
for (var Qt = 280; Qt < 288; ++Qt)
  Fr[Qt] = 8;
var jn = new ye(32);
for (var Qt = 0; Qt < 32; ++Qt)
  jn[Qt] = 5;
var Cp = /* @__PURE__ */ er(Fr, 9, 0), Bp = /* @__PURE__ */ er(Fr, 9, 1), xp = /* @__PURE__ */ er(jn, 5, 0), Rp = /* @__PURE__ */ er(jn, 5, 1), $i = function(e) {
  for (var t = e[0], r = 1; r < e.length; ++r)
    e[r] > t && (t = e[r]);
  return t;
}, Ve = function(e, t, r) {
  var n = t / 8 | 0;
  return (e[n] | e[n + 1] << 8) >> (t & 7) & r;
}, Ki = function(e, t) {
  var r = t / 8 | 0;
  return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (t & 7);
}, wa = function(e) {
  return (e + 7) / 8 | 0;
}, fh = function(e, t, r) {
  return (r == null || r > e.length) && (r = e.length), new ye(e.subarray(t, r));
}, Sp = [
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
], Ye = function(e, t, r) {
  var n = new Error(t || Sp[e]);
  if (n.code = e, Error.captureStackTrace && Error.captureStackTrace(n, Ye), !r)
    throw n;
  return n;
}, Tp = function(e, t, r, n) {
  var s = e.length, i = 0;
  if (!s || t.f && !t.l)
    return r || new ye(0);
  var o = !r, a = o || t.i != 2, u = t.i;
  o && (r = new ye(s * 3));
  var A = function(bt) {
    var pt = r.length;
    if (bt > pt) {
      var Ie = new ye(Math.max(pt * 2, bt));
      Ie.set(r), r = Ie;
    }
  }, f = t.f || 0, g = t.p || 0, y = t.b || 0, R = t.l, Q = t.d, S = t.m, N = t.n, O = s * 8;
  do {
    if (!R) {
      f = Ve(e, g, 1);
      var G = Ve(e, g + 1, 3);
      if (g += 3, G)
        if (G == 1)
          R = Bp, Q = Rp, S = 9, N = 5;
        else if (G == 2) {
          var Z = Ve(e, g, 31) + 257, j = Ve(e, g + 10, 15) + 4, V = Z + Ve(e, g + 5, 31) + 1;
          g += 14;
          for (var U = new ye(V), ot = new ye(19), q = 0; q < j; ++q)
            ot[Do[q]] = Ve(e, g + q * 3, 7);
          g += j * 3;
          for (var $ = $i(ot), C = (1 << $) - 1, d = er(ot, $, 1), q = 0; q < V; ) {
            var _ = d[Ve(e, g, C)];
            g += _ & 15;
            var L = _ >> 4;
            if (L < 16)
              U[q++] = L;
            else {
              var p = 0, w = 0;
              for (L == 16 ? (w = 3 + Ve(e, g, 3), g += 2, p = U[q - 1]) : L == 17 ? (w = 3 + Ve(e, g, 7), g += 3) : L == 18 && (w = 11 + Ve(e, g, 127), g += 7); w--; )
                U[q++] = p;
            }
          }
          var b = U.subarray(0, Z), B = U.subarray(Z);
          S = $i(b), N = $i(B), R = er(b, S, 1), Q = er(B, N, 1);
        } else
          Ye(1);
      else {
        var L = wa(g) + 4, z = e[L - 4] | e[L - 3] << 8, P = L + z;
        if (P > s) {
          u && Ye(0);
          break;
        }
        a && A(y + z), r.set(e.subarray(L, P), y), t.b = y += z, t.p = g = P * 8, t.f = f;
        continue;
      }
      if (g > O) {
        u && Ye(0);
        break;
      }
    }
    a && A(y + 131072);
    for (var T = (1 << S) - 1, I = (1 << N) - 1, l = g; ; l = g) {
      var p = R[Ki(e, g) & T], E = p >> 4;
      if (g += p & 15, g > O) {
        u && Ye(0);
        break;
      }
      if (p || Ye(2), E < 256)
        r[y++] = E;
      else if (E == 256) {
        l = g, R = null;
        break;
      } else {
        var et = E - 254;
        if (E > 264) {
          var q = E - 257, tt = pi[q];
          et = Ve(e, g, (1 << tt) - 1) + Ah[q], g += tt;
        }
        var rt = Q[Ki(e, g) & I], xt = rt >> 4;
        rt || Ye(3), g += rt & 15;
        var B = vp[xt];
        if (xt > 3) {
          var tt = fi[xt];
          B += Ki(e, g) & (1 << tt) - 1, g += tt;
        }
        if (g > O) {
          u && Ye(0);
          break;
        }
        a && A(y + 131072);
        var lt = y + et;
        if (y < B) {
          var mt = i - B, je = Math.min(B, lt);
          for (mt + y < 0 && Ye(3); y < je; ++y)
            r[y] = n[mt + y];
        }
        for (; y < lt; ++y)
          r[y] = r[y - B];
      }
    }
    t.l = R, t.p = l, t.b = y, t.f = f, R && (f = 1, t.m = S, t.d = Q, t.n = N);
  } while (!f);
  return y != r.length && o ? fh(r, 0, y) : r.subarray(0, y);
}, or = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8;
}, Qn = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8, e[n + 2] |= r >> 16;
}, to = function(e, t) {
  for (var r = [], n = 0; n < e.length; ++n)
    e[n] && r.push({ s: n, f: e[n] });
  var s = r.length, i = r.slice();
  if (!s)
    return { t: wh, l: 0 };
  if (s == 1) {
    var o = new ye(r[0].s + 1);
    return o[r[0].s] = 1, { t: o, l: 1 };
  }
  r.sort(function(P, Z) {
    return P.f - Z.f;
  }), r.push({ s: -1, f: 25001 });
  var a = r[0], u = r[1], A = 0, f = 1, g = 2;
  for (r[0] = { s: -1, f: a.f + u.f, l: a, r: u }; f != s - 1; )
    a = r[r[A].f < r[g].f ? A++ : g++], u = r[A != f && r[A].f < r[g].f ? A++ : g++], r[f++] = { s: -1, f: a.f + u.f, l: a, r: u };
  for (var y = i[0].s, n = 1; n < s; ++n)
    i[n].s > y && (y = i[n].s);
  var R = new Me(y + 1), Q = Oo(r[f - 1], R, 0);
  if (Q > t) {
    var n = 0, S = 0, N = Q - t, O = 1 << N;
    for (i.sort(function(Z, j) {
      return R[j.s] - R[Z.s] || Z.f - j.f;
    }); n < s; ++n) {
      var G = i[n].s;
      if (R[G] > t)
        S += O - (1 << Q - R[G]), R[G] = t;
      else
        break;
    }
    for (S >>= N; S > 0; ) {
      var L = i[n].s;
      R[L] < t ? S -= 1 << t - R[L]++ - 1 : ++n;
    }
    for (; n >= 0 && S; --n) {
      var z = i[n].s;
      R[z] == t && (--R[z], ++S);
    }
    Q = t;
  }
  return { t: new ye(R), l: Q };
}, Oo = function(e, t, r) {
  return e.s == -1 ? Math.max(Oo(e.l, t, r + 1), Oo(e.r, t, r + 1)) : t[e.s] = r;
}, Dc = function(e) {
  for (var t = e.length; t && !e[--t]; )
    ;
  for (var r = new Me(++t), n = 0, s = e[0], i = 1, o = function(u) {
    r[n++] = u;
  }, a = 1; a <= t; ++a)
    if (e[a] == s && a != t)
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
      i = 1, s = e[a];
    }
  return { c: r.subarray(0, n), n: t };
}, Fn = function(e, t) {
  for (var r = 0, n = 0; n < t.length; ++n)
    r += e[n] * t[n];
  return r;
}, gh = function(e, t, r) {
  var n = r.length, s = wa(t + 2);
  e[s] = n & 255, e[s + 1] = n >> 8, e[s + 2] = e[s] ^ 255, e[s + 3] = e[s + 1] ^ 255;
  for (var i = 0; i < n; ++i)
    e[s + i + 4] = r[i];
  return (s + 4 + n) * 8;
}, Qc = function(e, t, r, n, s, i, o, a, u, A, f) {
  or(t, f++, r), ++s[256];
  for (var g = to(s, 15), y = g.t, R = g.l, Q = to(i, 15), S = Q.t, N = Q.l, O = Dc(y), G = O.c, L = O.n, z = Dc(S), P = z.c, Z = z.n, j = new Me(19), V = 0; V < G.length; ++V)
    ++j[G[V] & 31];
  for (var V = 0; V < P.length; ++V)
    ++j[P[V] & 31];
  for (var U = to(j, 7), ot = U.t, q = U.l, $ = 19; $ > 4 && !ot[Do[$ - 1]]; --$)
    ;
  var C = A + 5 << 3, d = Fn(s, Fr) + Fn(i, jn) + o, _ = Fn(s, y) + Fn(i, S) + o + 14 + 3 * $ + Fn(j, ot) + 2 * j[16] + 3 * j[17] + 7 * j[18];
  if (u >= 0 && C <= d && C <= _)
    return gh(t, f, e.subarray(u, u + A));
  var p, w, b, B;
  if (or(t, f, 1 + (_ < d)), f += 2, _ < d) {
    p = er(y, R, 0), w = y, b = er(S, N, 0), B = S;
    var T = er(ot, q, 0);
    or(t, f, L - 257), or(t, f + 5, Z - 1), or(t, f + 10, $ - 4), f += 14;
    for (var V = 0; V < $; ++V)
      or(t, f + 3 * V, ot[Do[V]]);
    f += 3 * $;
    for (var I = [G, P], l = 0; l < 2; ++l)
      for (var E = I[l], V = 0; V < E.length; ++V) {
        var et = E[V] & 31;
        or(t, f, T[et]), f += ot[et], et > 15 && (or(t, f, E[V] >> 5 & 127), f += E[V] >> 12);
      }
  } else
    p = Cp, w = Fr, b = xp, B = jn;
  for (var V = 0; V < a; ++V) {
    var tt = n[V];
    if (tt > 255) {
      var et = tt >> 18 & 31;
      Qn(t, f, p[et + 257]), f += w[et + 257], et > 7 && (or(t, f, tt >> 23 & 31), f += pi[et]);
      var rt = tt & 31;
      Qn(t, f, b[rt]), f += B[rt], rt > 3 && (Qn(t, f, tt >> 5 & 8191), f += fi[rt]);
    } else
      Qn(t, f, p[tt]), f += w[tt];
  }
  return Qn(t, f, p[256]), f + w[256];
}, Np = /* @__PURE__ */ new ga([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), wh = /* @__PURE__ */ new ye(0), Dp = function(e, t, r, n, s, i) {
  var o = i.z || e.length, a = new ye(n + o + 5 * (1 + Math.ceil(o / 7e3)) + s), u = a.subarray(n, a.length - s), A = i.l, f = (i.r || 0) & 7;
  if (t) {
    f && (u[0] = i.r >> 3);
    for (var g = Np[t - 1], y = g >> 13, R = g & 8191, Q = (1 << r) - 1, S = i.p || new Me(32768), N = i.h || new Me(Q + 1), O = Math.ceil(r / 3), G = 2 * O, L = function(Rt) {
      return (e[Rt] ^ e[Rt + 1] << O ^ e[Rt + 2] << G) & Q;
    }, z = new ga(25e3), P = new Me(288), Z = new Me(32), j = 0, V = 0, U = i.i || 0, ot = 0, q = i.w || 0, $ = 0; U + 2 < o; ++U) {
      var C = L(U), d = U & 32767, _ = N[C];
      if (S[d] = _, N[C] = d, q <= U) {
        var p = o - U;
        if ((j > 7e3 || ot > 24576) && (p > 423 || !A)) {
          f = Qc(e, u, 0, z, P, Z, V, ot, $, U - $, f), ot = j = V = 0, $ = U;
          for (var w = 0; w < 286; ++w)
            P[w] = 0;
          for (var w = 0; w < 30; ++w)
            Z[w] = 0;
        }
        var b = 2, B = 0, T = R, I = d - _ & 32767;
        if (p > 2 && C == L(U - I))
          for (var l = Math.min(y, p) - 1, E = Math.min(32767, U), et = Math.min(258, p); I <= E && --T && d != _; ) {
            if (e[U + b] == e[U + b - I]) {
              for (var tt = 0; tt < et && e[U + tt] == e[U + tt - I]; ++tt)
                ;
              if (tt > b) {
                if (b = tt, B = I, tt > l)
                  break;
                for (var rt = Math.min(I, tt - 2), xt = 0, w = 0; w < rt; ++w) {
                  var lt = U - I + w & 32767, mt = S[lt], je = lt - mt & 32767;
                  je > xt && (xt = je, _ = lt);
                }
              }
            }
            d = _, _ = S[d], I += d - _ & 32767;
          }
        if (B) {
          z[ot++] = 268435456 | Qo[b] << 18 | Nc[B];
          var bt = Qo[b] & 31, pt = Nc[B] & 31;
          V += pi[bt] + fi[pt], ++P[257 + bt], ++Z[pt], q = U + b, ++j;
        } else
          z[ot++] = e[U], ++P[e[U]];
      }
    }
    for (U = Math.max(U, q); U < o; ++U)
      z[ot++] = e[U], ++P[e[U]];
    f = Qc(e, u, A, z, P, Z, V, ot, $, U - $, f), A || (i.r = f & 7 | u[f / 8 | 0] << 3, f -= 7, i.h = N, i.p = S, i.i = U, i.w = q);
  } else {
    for (var U = i.w || 0; U < o + A; U += 65535) {
      var Ie = U + 65535;
      Ie >= o && (u[f / 8 | 0] = A, Ie = o), f = gh(u, f + 1, e.subarray(U, Ie));
    }
    i.i = o;
  }
  return fh(a, 0, n + wa(f) + s);
}, Qp = /* @__PURE__ */ function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var r = t, n = 9; --n; )
      r = (r & 1 && -306674912) ^ r >>> 1;
    e[t] = r;
  }
  return e;
}(), Fp = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var r = e, n = 0; n < t.length; ++n)
        r = Qp[r & 255 ^ t[n]] ^ r >>> 8;
      e = r;
    },
    d: function() {
      return ~e;
    }
  };
}, Op = function(e, t, r, n, s) {
  if (!s && (s = { l: 1 }, t.dictionary)) {
    var i = t.dictionary.subarray(-32768), o = new ye(i.length + e.length);
    o.set(i), o.set(e, i.length), e = o, s.w = i.length;
  }
  return Dp(e, t.level == null ? 6 : t.level, t.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, r, n, s);
}, Mo = function(e, t, r) {
  for (; r; ++t)
    e[t] = r, r >>>= 8;
}, Mp = function(e, t) {
  var r = t.filename;
  if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, e[9] = 3, t.mtime != 0 && Mo(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), r) {
    e[3] = 8;
    for (var n = 0; n <= r.length; ++n)
      e[n + 10] = r.charCodeAt(n);
  }
}, Lp = function(e) {
  (e[0] != 31 || e[1] != 139 || e[2] != 8) && Ye(6, "invalid gzip data");
  var t = e[3], r = 10;
  t & 4 && (r += (e[10] | e[11] << 8) + 2);
  for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++])
    ;
  return r + (t & 2);
}, Pp = function(e) {
  var t = e.length;
  return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}, kp = function(e) {
  return 10 + (e.filename ? e.filename.length + 1 : 0);
};
function Up(e, t) {
  t || (t = {});
  var r = Fp(), n = e.length;
  r.p(e);
  var s = Op(e, t, kp(t), 8), i = s.length;
  return Mp(s, t), Mo(s, i - 8, r.d()), Mo(s, i - 4, n), s;
}
function zp(e, t) {
  var r = Lp(e);
  return r + 8 > e.length && Ye(6, "invalid gzip data"), Tp(e.subarray(r, -8), { i: 2 }, new ye(Pp(e)), t);
}
var Gp = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Vp = 0;
try {
  Gp.decode(wh, { stream: !0 }), Vp = 1;
} catch {
}
var Hp = Object.defineProperty, Yp = (e, t, r) => t in e ? Hp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Xp = (e, t, r) => (Yp(e, t + "", r), r), OB = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, mh = (e, t) => {
  const r = [];
  for (let a = 0; a < e.length; a += t) {
    const u = new Uint8Array(t);
    u.set(e.slice(a, a + t)), r.push(u);
  }
  const n = r[r.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = n.slice(0, i);
  return r[r.length - 1] = o, r;
}, W = (e, t, r = !0) => {
  if (e instanceof Uint8Array)
    return r ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const i = new Uint8Array((e.length - 2) / 2);
    let o = 2;
    for (let a = 0; a < i.length; a++)
      i[a] = parseInt(e.substring(o, o + 2), 16), o += 2;
    return i;
  }
  const s = `invalid data:${t ? ` ${t} -` : ""} ${e}
If you are attempting to transform a hex value, please make sure it is being passed as a string and wrapped in quotes.`;
  throw new v(D.INVALID_DATA, s);
}, gi = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), r = t.reduce((s, i) => s + i.length, 0), n = new Uint8Array(r);
  return t.reduce((s, i) => (n.set(i, s), s + i.length), 0), n;
}, nt = (e) => {
  const t = e.map((r) => W(r));
  return gi(t);
}, Fc = "0123456789abcdef";
function X(e) {
  const t = W(e);
  let r = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    r += Fc[(s & 240) >> 4] + Fc[s & 15];
  }
  return r;
}
var MB = (e) => {
  const r = [
    (n) => n.replace(/\s+/g, "-"),
    // spaces to -
    (n) => n.replace(/\./g, "-"),
    // dots to -
    (n) => n.replace(/_/g, "-"),
    // underscore to -
    (n) => n.replace(/-[a-z]/g, (s) => s.slice(-1).toUpperCase()),
    // delete '-' and capitalize the letter after them
    (n) => n.replace(/-/g, ""),
    // delete any '-' left
    (n) => n.replace(/^\d+/, ""),
    // removes leading digits
    (n) => n[0].toUpperCase() + n.slice(1)
    // capitalize first letter
  ].reduce((n, s) => s(n), e);
  if (r === "") {
    const n = `The provided string '${e}' results in an empty output after`.concat(
      " normalization, therefore, it can't normalize string."
    );
    throw new v(D.PARSE_FAILED, n);
  }
  return r;
}, Wp = 37, yh = BigInt(2 ** 62) + BigInt(Wp), Zp = (e) => Math.floor(e / 1e3), bh = (e) => e * 1e3, jp = (e) => Number(BigInt(e) - yh), Jp = (e) => String(BigInt(e) + yh), qp = (e) => bh(jp(e)), xs = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new xs(qp(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new xs(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new xs(bh(e));
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
    return Jp(this.toUnixSeconds());
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
    return Zp(this.getTime());
  }
}, ma = xs;
Xp(ma, "TAI64_NULL", "");
function $p(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var Kp = {
  chain_name: "local_testnet",
  consensus_parameters: {
    V2: {
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
          max_predicate_length: 24576,
          max_predicate_data_length: 24576,
          max_message_data_length: 102400,
          max_gas_per_predicate: 1e6
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
          contract_max_size: 112640,
          max_storage_slots: 1760
        }
      },
      fee_params: {
        V1: {
          gas_price_factor: 115e4,
          gas_per_byte: 63
        }
      },
      chain_id: 0,
      gas_costs: {
        V4: {
          add: 2,
          addi: 2,
          and: 2,
          andi: 2,
          bal: 274,
          bhei: 2,
          bhsh: 2,
          burn: 7566,
          cb: 2,
          cfsi: 2,
          div: 2,
          divi: 2,
          eck1: 1489,
          ecr1: 20513,
          eq: 2,
          exp: 2,
          expi: 2,
          flag: 2,
          gm: 2,
          gt: 2,
          gtf: 3,
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
          log: 80,
          lt: 2,
          lw: 2,
          mint: 6566,
          mlog: 2,
          mod: 2,
          modi: 2,
          move: 2,
          movi: 1,
          mroo: 3,
          mul: 2,
          muli: 2,
          mldv: 3,
          noop: 1,
          not: 2,
          or: 1,
          ori: 2,
          poph: 2,
          popl: 2,
          pshh: 5,
          pshl: 5,
          ret_contract: 43,
          rvrt_contract: 39,
          sb: 2,
          sll: 2,
          slli: 2,
          srl: 2,
          srli: 2,
          srw: 237,
          sub: 2,
          subi: 2,
          sw: 2,
          sww: 5708,
          time: 106,
          tr: 9253,
          tro: 7199,
          wdcm: 2,
          wqcm: 2,
          wdop: 2,
          wqop: 3,
          wdml: 3,
          wqml: 3,
          wddv: 3,
          wqdv: 4,
          wdmd: 6,
          wqmd: 9,
          wdam: 6,
          wqam: 6,
          wdmm: 6,
          wqmm: 6,
          xor: 2,
          xori: 2,
          aloc: {
            LightOperation: {
              base: 2,
              units_per_gas: 35
            }
          },
          bsiz: {
            LightOperation: {
              base: 25,
              units_per_gas: 564
            }
          },
          bldd: {
            LightOperation: {
              base: 33,
              units_per_gas: 130
            }
          },
          cfe: {
            LightOperation: {
              base: 10,
              units_per_gas: 62
            }
          },
          cfei: {
            LightOperation: {
              base: 10,
              units_per_gas: 66
            }
          },
          call: {
            LightOperation: {
              base: 6934,
              units_per_gas: 14
            }
          },
          ccp: {
            LightOperation: {
              base: 21,
              units_per_gas: 155
            }
          },
          croo: {
            LightOperation: {
              base: 69,
              units_per_gas: 4
            }
          },
          csiz: {
            LightOperation: {
              base: 25,
              units_per_gas: 580
            }
          },
          ed19: {
            LightOperation: {
              base: 3232,
              units_per_gas: 7
            }
          },
          k256: {
            LightOperation: {
              base: 21,
              units_per_gas: 6
            }
          },
          ldc: {
            LightOperation: {
              base: 84,
              units_per_gas: 113
            }
          },
          logd: {
            LightOperation: {
              base: 278,
              units_per_gas: 5
            }
          },
          mcl: {
            LightOperation: {
              base: 2,
              units_per_gas: 1282
            }
          },
          mcli: {
            LightOperation: {
              base: 2,
              units_per_gas: 1250
            }
          },
          mcp: {
            LightOperation: {
              base: 3,
              units_per_gas: 385
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
              base: 2,
              units_per_gas: 1234
            }
          },
          retd_contract: {
            LightOperation: {
              base: 227,
              units_per_gas: 5
            }
          },
          s256: {
            LightOperation: {
              base: 25,
              units_per_gas: 5
            }
          },
          scwq: {
            HeavyOperation: {
              base: 5666,
              gas_per_unit: 6628
            }
          },
          smo: {
            LightOperation: {
              base: 14635,
              units_per_gas: 3
            }
          },
          srwq: {
            HeavyOperation: {
              base: 245,
              gas_per_unit: 243
            }
          },
          swwq: {
            HeavyOperation: {
              base: 5661,
              gas_per_unit: 5776
            }
          },
          contract_root: {
            LightOperation: {
              base: 24,
              units_per_gas: 3
            }
          },
          state_root: {
            HeavyOperation: {
              base: 189,
              gas_per_unit: 96
            }
          },
          new_storage_per_byte: 63,
          vm_initialization: {
            LightOperation: {
              base: 3127,
              units_per_gas: 61
            }
          }
        }
      },
      base_asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07",
      block_gas_limit: 3e7,
      block_transaction_size_limit: 260096,
      privileged_address: "0000000000000000000000000000000000000000000000000000000000000000"
    }
  },
  consensus: {
    PoA: {
      signing_key: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"
    }
  }
}, tf = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, ef = {
  coins: [],
  messages: [],
  contracts: [],
  blobs: [],
  block_height: 0,
  da_block_height: 0
}, LB = {
  chainConfig: Kp,
  metadata: tf,
  stateConfig: ef
}, PB = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function pr(e) {
  return e !== void 0;
}
var Ih = x(0), Lo = x(58), Ps = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", ys = null;
function rf(e) {
  if (ys == null) {
    ys = {};
    for (let r = 0; r < Ps.length; r++)
      ys[Ps[r]] = x(r);
  }
  const t = ys[e];
  if (t == null)
    throw new v(D.INVALID_DATA, `invalid base58 value ${e}`);
  return x(t);
}
function Eh(e) {
  const t = W(e);
  let r = x(t), n = "";
  for (; r.gt(Ih); )
    n = Ps[Number(r.mod(Lo))] + n, r = r.div(Lo);
  for (let s = 0; s < t.length && !t[s]; s++)
    n = Ps[0] + n;
  return n;
}
function nf(e) {
  let t = Ih;
  for (let r = 0; r < e.length; r++)
    t = t.mul(Lo), t = t.add(rf(e[r].toString()));
  return t;
}
function ya(e, t, r) {
  const n = W(e);
  if (r != null && r > n.length)
    throw new v(D.INVALID_DATA, "cannot slice beyond data bounds");
  return X(n.slice(t ?? 0, r ?? n.length));
}
function wn(e, t = !0) {
  let r = e;
  t && (r = e.normalize("NFC"));
  const n = [];
  for (let s = 0; s < r.length; s += 1) {
    const i = r.charCodeAt(s);
    if (i < 128)
      n.push(i);
    else if (i < 2048)
      n.push(i >> 6 | 192), n.push(i & 63 | 128);
    else if ((i & 64512) === 55296) {
      s += 1;
      const o = r.charCodeAt(s);
      if (s >= r.length || (o & 64512) !== 56320)
        throw new v(
          D.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const a = 65536 + ((i & 1023) << 10) + (o & 1023);
      n.push(a >> 18 | 240), n.push(a >> 12 & 63 | 128), n.push(a >> 6 & 63 | 128), n.push(a & 63 | 128);
    } else
      n.push(i >> 12 | 224), n.push(i >> 6 & 63 | 128), n.push(i & 63 | 128);
  }
  return new Uint8Array(n);
}
function Pr(e, t, r, n, s) {
  return console.log(`invalid codepoint at offset ${t}; ${e}, bytes: ${r}`), t;
}
function sf(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function of(e) {
  const t = W(e, "bytes"), r = [];
  let n = 0;
  for (; n < t.length; ) {
    const s = t[n++];
    if (!(s >> 7)) {
      r.push(s);
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
      (s & 192) === 128 ? n += Pr("UNEXPECTED_CONTINUE", n - 1, t) : n += Pr("BAD_PREFIX", n - 1, t);
      continue;
    }
    if (n - 1 + i >= t.length) {
      n += Pr("OVERRUN", n - 1, t);
      continue;
    }
    let a = s & (1 << 8 - i - 1) - 1;
    for (let u = 0; u < i; u++) {
      const A = t[n];
      if ((A & 192) !== 128) {
        n += Pr("MISSING_CONTINUE", n, t), a = null;
        break;
      }
      a = a << 6 | A & 63, n++;
    }
    if (a !== null) {
      if (a > 1114111) {
        n += Pr("OUT_OF_RANGE", n - 1 - i, t);
        continue;
      }
      if (a >= 55296 && a <= 57343) {
        n += Pr("UTF16_SURROGATE", n - 1 - i, t);
        continue;
      }
      if (a <= o) {
        n += Pr("OVERLONG", n - 1 - i, t);
        continue;
      }
      r.push(a);
    }
  }
  return r;
}
function ba(e) {
  return sf(of(e));
}
var kB = (e) => {
  if (!e)
    return "";
  const t = W(e), r = Up(t, { mtime: 0 }), n = String.fromCharCode.apply(
    null,
    new Uint8Array(r)
  );
  return btoa(n);
}, af = (e) => {
  const t = atob(e), r = new Uint8Array(t.length).map(
    (s, i) => t.charCodeAt(i)
  );
  return zp(r);
};
function cf(e) {
  throw new Error("Didn't expect to get here");
}
function Oe(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function df(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function cs(e, ...t) {
  if (!df(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function vh(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Oe(e.outputLen), Oe(e.blockLen);
}
function mn(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Ch(e, t) {
  cs(e);
  const r = t.outputLen;
  if (e.length < r)
    throw new Error(`digestInto() expects output buffer of length at least ${r}`);
}
const en = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Rs = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Ss = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), qe = (e, t) => e << 32 - t | e >>> t, wt = (e, t) => e << t | e >>> 32 - t >>> 0, ks = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, uf = (e) => e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
function Us(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = uf(e[t]);
}
function _f(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function yn(e) {
  return typeof e == "string" && (e = _f(e)), cs(e), e;
}
function hf(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    cs(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
class Ia {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const lf = {}.toString;
function Bh(e, t) {
  if (t !== void 0 && lf.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function wi(e) {
  const t = (n) => e().update(yn(n)).digest(), r = e();
  return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t;
}
function Af(e = 32) {
  if (en && typeof en.getRandomValues == "function")
    return en.getRandomValues(new Uint8Array(e));
  if (en && typeof en.randomBytes == "function")
    return en.randomBytes(e);
  throw new Error("crypto.getRandomValues must be defined");
}
function pf(e, t, r, n) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, r, n);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(r >> s & i), a = Number(r & i), u = n ? 4 : 0, A = n ? 0 : 4;
  e.setUint32(t + u, o, n), e.setUint32(t + A, a, n);
}
const ff = (e, t, r) => e & t ^ ~e & r, gf = (e, t, r) => e & t ^ e & r ^ t & r;
class Ea extends Ia {
  constructor(t, r, n, s) {
    super(), this.blockLen = t, this.outputLen = r, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ss(this.buffer);
  }
  update(t) {
    mn(this);
    const { view: r, buffer: n, blockLen: s } = this;
    t = yn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const u = Ss(t);
        for (; s <= i - o; o += s)
          this.process(u, o);
        continue;
      }
      n.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(r, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    mn(this), Ch(t, this), this.finished = !0;
    const { buffer: r, view: n, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    r[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(n, 0), o = 0);
    for (let g = o; g < s; g++)
      r[g] = 0;
    pf(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const a = Ss(t), u = this.outputLen;
    if (u % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const A = u / 4, f = this.get();
    if (A > f.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < A; g++)
      a.setUint32(4 * g, f[g], i);
  }
  digest() {
    const { buffer: t, outputLen: r } = this;
    this.digestInto(t);
    const n = t.slice(0, r);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: r, buffer: n, length: s, finished: i, destroyed: o, pos: a } = this;
    return t.length = s, t.pos = a, t.finished = i, t.destroyed = o, s % r && t.buffer.set(n), t;
  }
}
const wf = /* @__PURE__ */ new Uint32Array([
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
]), mr = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), yr = /* @__PURE__ */ new Uint32Array(64);
class mf extends Ea {
  constructor() {
    super(64, 32, 8, !1), this.A = mr[0] | 0, this.B = mr[1] | 0, this.C = mr[2] | 0, this.D = mr[3] | 0, this.E = mr[4] | 0, this.F = mr[5] | 0, this.G = mr[6] | 0, this.H = mr[7] | 0;
  }
  get() {
    const { A: t, B: r, C: n, D: s, E: i, F: o, G: a, H: u } = this;
    return [t, r, n, s, i, o, a, u];
  }
  // prettier-ignore
  set(t, r, n, s, i, o, a, u) {
    this.A = t | 0, this.B = r | 0, this.C = n | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = u | 0;
  }
  process(t, r) {
    for (let g = 0; g < 16; g++, r += 4)
      yr[g] = t.getUint32(r, !1);
    for (let g = 16; g < 64; g++) {
      const y = yr[g - 15], R = yr[g - 2], Q = qe(y, 7) ^ qe(y, 18) ^ y >>> 3, S = qe(R, 17) ^ qe(R, 19) ^ R >>> 10;
      yr[g] = S + yr[g - 7] + Q + yr[g - 16] | 0;
    }
    let { A: n, B: s, C: i, D: o, E: a, F: u, G: A, H: f } = this;
    for (let g = 0; g < 64; g++) {
      const y = qe(a, 6) ^ qe(a, 11) ^ qe(a, 25), R = f + y + ff(a, u, A) + wf[g] + yr[g] | 0, S = (qe(n, 2) ^ qe(n, 13) ^ qe(n, 22)) + gf(n, s, i) | 0;
      f = A, A = u, u = a, a = o + R | 0, o = i, i = s, s = n, n = R + S | 0;
    }
    n = n + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, u = u + this.F | 0, A = A + this.G | 0, f = f + this.H | 0, this.set(n, s, i, o, a, u, A, f);
  }
  roundClean() {
    yr.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Or = /* @__PURE__ */ wi(() => new mf());
class xh extends Ia {
  constructor(t, r) {
    super(), this.finished = !1, this.destroyed = !1, vh(t);
    const n = yn(r);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(n.length > s ? t.create().update(n).digest() : n);
    for (let o = 0; o < i.length; o++)
      i[o] ^= 54;
    this.iHash.update(i), this.oHash = t.create();
    for (let o = 0; o < i.length; o++)
      i[o] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return mn(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    mn(this), cs(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: r, iHash: n, finished: s, destroyed: i, blockLen: o, outputLen: a } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = a, t.oHash = r._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const mi = (e, t, r) => new xh(e, t).update(r).digest();
mi.create = (e, t) => new xh(e, t);
function yf(e, t, r, n) {
  vh(e);
  const s = Bh({ dkLen: 32, asyncTick: 10 }, n), { c: i, dkLen: o, asyncTick: a } = s;
  if (Oe(i), Oe(o), Oe(a), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const u = yn(t), A = yn(r), f = new Uint8Array(o), g = mi.create(e, u), y = g._cloneInto().update(A);
  return { c: i, dkLen: o, asyncTick: a, DK: f, PRF: g, PRFSalt: y };
}
function bf(e, t, r, n, s) {
  return e.destroy(), t.destroy(), n && n.destroy(), s.fill(0), r;
}
function va(e, t, r, n) {
  const { c: s, dkLen: i, DK: o, PRF: a, PRFSalt: u } = yf(e, t, r, n);
  let A;
  const f = new Uint8Array(4), g = Ss(f), y = new Uint8Array(a.outputLen);
  for (let R = 1, Q = 0; Q < i; R++, Q += a.outputLen) {
    const S = o.subarray(Q, Q + a.outputLen);
    g.setInt32(0, R, !1), (A = u._cloneInto(A)).update(f).digestInto(y), S.set(y.subarray(0, S.length));
    for (let N = 1; N < s; N++) {
      a._cloneInto(A).update(y).digestInto(y);
      for (let O = 0; O < S.length; O++)
        S[O] ^= y[O];
    }
  }
  return bf(a, u, o, A, y);
}
function Oc(e, t, r, n, s, i) {
  let o = e[t++] ^ r[n++], a = e[t++] ^ r[n++], u = e[t++] ^ r[n++], A = e[t++] ^ r[n++], f = e[t++] ^ r[n++], g = e[t++] ^ r[n++], y = e[t++] ^ r[n++], R = e[t++] ^ r[n++], Q = e[t++] ^ r[n++], S = e[t++] ^ r[n++], N = e[t++] ^ r[n++], O = e[t++] ^ r[n++], G = e[t++] ^ r[n++], L = e[t++] ^ r[n++], z = e[t++] ^ r[n++], P = e[t++] ^ r[n++], Z = o, j = a, V = u, U = A, ot = f, q = g, $ = y, C = R, d = Q, _ = S, p = N, w = O, b = G, B = L, T = z, I = P;
  for (let l = 0; l < 8; l += 2)
    ot ^= wt(Z + b | 0, 7), d ^= wt(ot + Z | 0, 9), b ^= wt(d + ot | 0, 13), Z ^= wt(b + d | 0, 18), _ ^= wt(q + j | 0, 7), B ^= wt(_ + q | 0, 9), j ^= wt(B + _ | 0, 13), q ^= wt(j + B | 0, 18), T ^= wt(p + $ | 0, 7), V ^= wt(T + p | 0, 9), $ ^= wt(V + T | 0, 13), p ^= wt($ + V | 0, 18), U ^= wt(I + w | 0, 7), C ^= wt(U + I | 0, 9), w ^= wt(C + U | 0, 13), I ^= wt(w + C | 0, 18), j ^= wt(Z + U | 0, 7), V ^= wt(j + Z | 0, 9), U ^= wt(V + j | 0, 13), Z ^= wt(U + V | 0, 18), $ ^= wt(q + ot | 0, 7), C ^= wt($ + q | 0, 9), ot ^= wt(C + $ | 0, 13), q ^= wt(ot + C | 0, 18), w ^= wt(p + _ | 0, 7), d ^= wt(w + p | 0, 9), _ ^= wt(d + w | 0, 13), p ^= wt(_ + d | 0, 18), b ^= wt(I + T | 0, 7), B ^= wt(b + I | 0, 9), T ^= wt(B + b | 0, 13), I ^= wt(T + B | 0, 18);
  s[i++] = o + Z | 0, s[i++] = a + j | 0, s[i++] = u + V | 0, s[i++] = A + U | 0, s[i++] = f + ot | 0, s[i++] = g + q | 0, s[i++] = y + $ | 0, s[i++] = R + C | 0, s[i++] = Q + d | 0, s[i++] = S + _ | 0, s[i++] = N + p | 0, s[i++] = O + w | 0, s[i++] = G + b | 0, s[i++] = L + B | 0, s[i++] = z + T | 0, s[i++] = P + I | 0;
}
function eo(e, t, r, n, s) {
  let i = n + 0, o = n + 16 * s;
  for (let a = 0; a < 16; a++)
    r[o + a] = e[t + (2 * s - 1) * 16 + a];
  for (let a = 0; a < s; a++, i += 16, t += 16)
    Oc(r, o, e, t, r, i), a > 0 && (o += 16), Oc(r, i, e, t += 16, r, o);
}
function If(e, t, r) {
  const n = Bh({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, r), { N: s, r: i, p: o, dkLen: a, asyncTick: u, maxmem: A, onProgress: f } = n;
  if (Oe(s), Oe(i), Oe(o), Oe(a), Oe(u), Oe(A), f !== void 0 && typeof f != "function")
    throw new Error("progressCb should be function");
  const g = 128 * i, y = g / 4;
  if (s <= 1 || s & s - 1 || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / g)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (a < 0 || a > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const R = g * (s + o);
  if (R > A)
    throw new Error(`Scrypt: parameters too large, ${R} (128 * r * (N + p)) > ${A} (maxmem)`);
  const Q = va(Or, e, t, { c: 1, dkLen: g * o }), S = Rs(Q), N = Rs(new Uint8Array(g * s)), O = Rs(new Uint8Array(g));
  let G = () => {
  };
  if (f) {
    const L = 2 * s * o, z = Math.max(Math.floor(L / 1e4), 1);
    let P = 0;
    G = () => {
      P++, f && (!(P % z) || P === L) && f(P / L);
    };
  }
  return { N: s, r: i, p: o, dkLen: a, blockSize32: y, V: N, B32: S, B: Q, tmp: O, blockMixCb: G, asyncTick: u };
}
function Ef(e, t, r, n, s) {
  const i = va(Or, e, r, { c: 1, dkLen: t });
  return r.fill(0), n.fill(0), s.fill(0), i;
}
function vf(e, t, r) {
  const { N: n, r: s, p: i, dkLen: o, blockSize32: a, V: u, B32: A, B: f, tmp: g, blockMixCb: y } = If(e, t, r);
  ks || Us(A);
  for (let R = 0; R < i; R++) {
    const Q = a * R;
    for (let S = 0; S < a; S++)
      u[S] = A[Q + S];
    for (let S = 0, N = 0; S < n - 1; S++)
      eo(u, N, u, N += a, s), y();
    eo(u, (n - 1) * a, A, Q, s), y();
    for (let S = 0; S < n; S++) {
      const N = A[Q + a - 16] % n;
      for (let O = 0; O < a; O++)
        g[O] = A[Q + O] ^ u[N * a + O];
      eo(g, 0, A, Q, s), y();
    }
  }
  return ks || Us(A), Ef(e, o, f, u, g);
}
const bs = /* @__PURE__ */ BigInt(2 ** 32 - 1), Po = /* @__PURE__ */ BigInt(32);
function Rh(e, t = !1) {
  return t ? { h: Number(e & bs), l: Number(e >> Po & bs) } : { h: Number(e >> Po & bs) | 0, l: Number(e & bs) | 0 };
}
function Sh(e, t = !1) {
  let r = new Uint32Array(e.length), n = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = Rh(e[s], t);
    [r[s], n[s]] = [i, o];
  }
  return [r, n];
}
const Cf = (e, t) => BigInt(e >>> 0) << Po | BigInt(t >>> 0), Bf = (e, t, r) => e >>> r, xf = (e, t, r) => e << 32 - r | t >>> r, Rf = (e, t, r) => e >>> r | t << 32 - r, Sf = (e, t, r) => e << 32 - r | t >>> r, Tf = (e, t, r) => e << 64 - r | t >>> r - 32, Nf = (e, t, r) => e >>> r - 32 | t << 64 - r, Df = (e, t) => t, Qf = (e, t) => e, Th = (e, t, r) => e << r | t >>> 32 - r, Nh = (e, t, r) => t << r | e >>> 32 - r, Dh = (e, t, r) => t << r - 32 | e >>> 64 - r, Qh = (e, t, r) => e << r - 32 | t >>> 64 - r;
function Ff(e, t, r, n) {
  const s = (t >>> 0) + (n >>> 0);
  return { h: e + r + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Of = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0), Mf = (e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0, Lf = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0), Pf = (e, t, r, n, s) => t + r + n + s + (e / 2 ** 32 | 0) | 0, kf = (e, t, r, n, s) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (s >>> 0), Uf = (e, t, r, n, s, i) => t + r + n + s + i + (e / 2 ** 32 | 0) | 0, At = {
  fromBig: Rh,
  split: Sh,
  toBig: Cf,
  shrSH: Bf,
  shrSL: xf,
  rotrSH: Rf,
  rotrSL: Sf,
  rotrBH: Tf,
  rotrBL: Nf,
  rotr32H: Df,
  rotr32L: Qf,
  rotlSH: Th,
  rotlSL: Nh,
  rotlBH: Dh,
  rotlBL: Qh,
  add: Ff,
  add3L: Of,
  add3H: Mf,
  add4L: Lf,
  add4H: Pf,
  add5H: Uf,
  add5L: kf
}, Fh = [], Oh = [], Mh = [], zf = /* @__PURE__ */ BigInt(0), On = /* @__PURE__ */ BigInt(1), Gf = /* @__PURE__ */ BigInt(2), Vf = /* @__PURE__ */ BigInt(7), Hf = /* @__PURE__ */ BigInt(256), Yf = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = On, r = 1, n = 0; e < 24; e++) {
  [r, n] = [n, (2 * r + 3 * n) % 5], Fh.push(2 * (5 * n + r)), Oh.push((e + 1) * (e + 2) / 2 % 64);
  let s = zf;
  for (let i = 0; i < 7; i++)
    t = (t << On ^ (t >> Vf) * Yf) % Hf, t & Gf && (s ^= On << (On << /* @__PURE__ */ BigInt(i)) - On);
  Mh.push(s);
}
const [Xf, Wf] = /* @__PURE__ */ Sh(Mh, !0), Mc = (e, t, r) => r > 32 ? Dh(e, t, r) : Th(e, t, r), Lc = (e, t, r) => r > 32 ? Qh(e, t, r) : Nh(e, t, r);
function Zf(e, t = 24) {
  const r = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let o = 0; o < 10; o++)
      r[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, u = (o + 2) % 10, A = r[u], f = r[u + 1], g = Mc(A, f, 1) ^ r[a], y = Lc(A, f, 1) ^ r[a + 1];
      for (let R = 0; R < 50; R += 10)
        e[o + R] ^= g, e[o + R + 1] ^= y;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const a = Oh[o], u = Mc(s, i, a), A = Lc(s, i, a), f = Fh[o];
      s = e[f], i = e[f + 1], e[f] = u, e[f + 1] = A;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        r[a] = e[o + a];
      for (let a = 0; a < 10; a++)
        e[o + a] ^= ~r[(a + 2) % 10] & r[(a + 4) % 10];
    }
    e[0] ^= Xf[n], e[1] ^= Wf[n];
  }
  r.fill(0);
}
class Ca extends Ia {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, r, n, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = r, this.outputLen = n, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Oe(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Rs(this.state);
  }
  keccak() {
    ks || Us(this.state32), Zf(this.state32, this.rounds), ks || Us(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    mn(this);
    const { blockLen: r, state: n } = this;
    t = yn(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(r - this.pos, s - i);
      for (let a = 0; a < o; a++)
        n[this.pos++] ^= t[i++];
      this.pos === r && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: r, pos: n, blockLen: s } = this;
    t[n] ^= r, r & 128 && n === s - 1 && this.keccak(), t[s - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    mn(this, !1), cs(t), this.finish();
    const r = this.state, { blockLen: n } = this;
    for (let s = 0, i = t.length; s < i; ) {
      this.posOut >= n && this.keccak();
      const o = Math.min(n - this.posOut, i - s);
      t.set(r.subarray(this.posOut, this.posOut + o), s), this.posOut += o, s += o;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return Oe(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (Ch(t, this), this.finished)
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
    const { blockLen: r, suffix: n, outputLen: s, rounds: i, enableXOF: o } = this;
    return t || (t = new Ca(r, n, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const jf = (e, t, r) => wi(() => new Ca(t, e, r)), Jf = /* @__PURE__ */ jf(1, 136, 256 / 8), qf = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), Lh = /* @__PURE__ */ new Uint8Array(new Array(16).fill(0).map((e, t) => t)), $f = /* @__PURE__ */ Lh.map((e) => (9 * e + 5) % 16);
let Ba = [Lh], xa = [$f];
for (let e = 0; e < 4; e++)
  for (let t of [Ba, xa])
    t.push(t[e].map((r) => qf[r]));
const Ph = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Kf = /* @__PURE__ */ Ba.map((e, t) => e.map((r) => Ph[t][r])), tg = /* @__PURE__ */ xa.map((e, t) => e.map((r) => Ph[t][r])), eg = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), rg = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function Pc(e, t, r, n) {
  return e === 0 ? t ^ r ^ n : e === 1 ? t & r | ~t & n : e === 2 ? (t | ~r) ^ n : e === 3 ? t & n | r & ~n : t ^ (r | ~n);
}
const Is = /* @__PURE__ */ new Uint32Array(16);
class ng extends Ea {
  constructor() {
    super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
  }
  get() {
    const { h0: t, h1: r, h2: n, h3: s, h4: i } = this;
    return [t, r, n, s, i];
  }
  set(t, r, n, s, i) {
    this.h0 = t | 0, this.h1 = r | 0, this.h2 = n | 0, this.h3 = s | 0, this.h4 = i | 0;
  }
  process(t, r) {
    for (let R = 0; R < 16; R++, r += 4)
      Is[R] = t.getUint32(r, !0);
    let n = this.h0 | 0, s = n, i = this.h1 | 0, o = i, a = this.h2 | 0, u = a, A = this.h3 | 0, f = A, g = this.h4 | 0, y = g;
    for (let R = 0; R < 5; R++) {
      const Q = 4 - R, S = eg[R], N = rg[R], O = Ba[R], G = xa[R], L = Kf[R], z = tg[R];
      for (let P = 0; P < 16; P++) {
        const Z = wt(n + Pc(R, i, a, A) + Is[O[P]] + S, L[P]) + g | 0;
        n = g, g = A, A = wt(a, 10) | 0, a = i, i = Z;
      }
      for (let P = 0; P < 16; P++) {
        const Z = wt(s + Pc(Q, o, u, f) + Is[G[P]] + N, z[P]) + y | 0;
        s = y, y = f, f = wt(u, 10) | 0, u = o, o = Z;
      }
    }
    this.set(this.h1 + a + f | 0, this.h2 + A + y | 0, this.h3 + g + s | 0, this.h4 + n + o | 0, this.h0 + i + u | 0);
  }
  roundClean() {
    Is.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const sg = /* @__PURE__ */ wi(() => new ng()), [ig, og] = At.split([
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
].map((e) => BigInt(e))), br = /* @__PURE__ */ new Uint32Array(80), Ir = /* @__PURE__ */ new Uint32Array(80);
class ag extends Ea {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: r, Bh: n, Bl: s, Ch: i, Cl: o, Dh: a, Dl: u, Eh: A, El: f, Fh: g, Fl: y, Gh: R, Gl: Q, Hh: S, Hl: N } = this;
    return [t, r, n, s, i, o, a, u, A, f, g, y, R, Q, S, N];
  }
  // prettier-ignore
  set(t, r, n, s, i, o, a, u, A, f, g, y, R, Q, S, N) {
    this.Ah = t | 0, this.Al = r | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = u | 0, this.Eh = A | 0, this.El = f | 0, this.Fh = g | 0, this.Fl = y | 0, this.Gh = R | 0, this.Gl = Q | 0, this.Hh = S | 0, this.Hl = N | 0;
  }
  process(t, r) {
    for (let L = 0; L < 16; L++, r += 4)
      br[L] = t.getUint32(r), Ir[L] = t.getUint32(r += 4);
    for (let L = 16; L < 80; L++) {
      const z = br[L - 15] | 0, P = Ir[L - 15] | 0, Z = At.rotrSH(z, P, 1) ^ At.rotrSH(z, P, 8) ^ At.shrSH(z, P, 7), j = At.rotrSL(z, P, 1) ^ At.rotrSL(z, P, 8) ^ At.shrSL(z, P, 7), V = br[L - 2] | 0, U = Ir[L - 2] | 0, ot = At.rotrSH(V, U, 19) ^ At.rotrBH(V, U, 61) ^ At.shrSH(V, U, 6), q = At.rotrSL(V, U, 19) ^ At.rotrBL(V, U, 61) ^ At.shrSL(V, U, 6), $ = At.add4L(j, q, Ir[L - 7], Ir[L - 16]), C = At.add4H($, Z, ot, br[L - 7], br[L - 16]);
      br[L] = C | 0, Ir[L] = $ | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: o, Ch: a, Cl: u, Dh: A, Dl: f, Eh: g, El: y, Fh: R, Fl: Q, Gh: S, Gl: N, Hh: O, Hl: G } = this;
    for (let L = 0; L < 80; L++) {
      const z = At.rotrSH(g, y, 14) ^ At.rotrSH(g, y, 18) ^ At.rotrBH(g, y, 41), P = At.rotrSL(g, y, 14) ^ At.rotrSL(g, y, 18) ^ At.rotrBL(g, y, 41), Z = g & R ^ ~g & S, j = y & Q ^ ~y & N, V = At.add5L(G, P, j, og[L], Ir[L]), U = At.add5H(V, O, z, Z, ig[L], br[L]), ot = V | 0, q = At.rotrSH(n, s, 28) ^ At.rotrBH(n, s, 34) ^ At.rotrBH(n, s, 39), $ = At.rotrSL(n, s, 28) ^ At.rotrBL(n, s, 34) ^ At.rotrBL(n, s, 39), C = n & i ^ n & a ^ i & a, d = s & o ^ s & u ^ o & u;
      O = S | 0, G = N | 0, S = R | 0, N = Q | 0, R = g | 0, Q = y | 0, { h: g, l: y } = At.add(A | 0, f | 0, U | 0, ot | 0), A = a | 0, f = u | 0, a = i | 0, u = o | 0, i = n | 0, o = s | 0;
      const _ = At.add3L(ot, $, d);
      n = At.add3H(_, U, q, C), s = _ | 0;
    }
    ({ h: n, l: s } = At.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: o } = At.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: u } = At.add(this.Ch | 0, this.Cl | 0, a | 0, u | 0), { h: A, l: f } = At.add(this.Dh | 0, this.Dl | 0, A | 0, f | 0), { h: g, l: y } = At.add(this.Eh | 0, this.El | 0, g | 0, y | 0), { h: R, l: Q } = At.add(this.Fh | 0, this.Fl | 0, R | 0, Q | 0), { h: S, l: N } = At.add(this.Gh | 0, this.Gl | 0, S | 0, N | 0), { h: O, l: G } = At.add(this.Hh | 0, this.Hl | 0, O | 0, G | 0), this.set(n, s, i, o, a, u, A, f, g, y, R, Q, S, N, O, G);
  }
  roundClean() {
    br.fill(0), Ir.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const kh = /* @__PURE__ */ wi(() => new ag());
var cg = (e) => {
  const { password: t, salt: r, n, p: s, r: i, dklen: o } = e;
  return vf(t, r, { N: n, r: i, p: s, dkLen: o });
}, dg = (e) => Jf(e);
function ug(e) {
  const t = W(e, "data");
  return sg(t);
}
var ln = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextEncoder().encode(e);
    case "base64": {
      const r = atob(e), n = r.length;
      return new Uint8Array(n).map((i, o) => r.charCodeAt(o));
    }
    case "hex":
    default: {
      const r = e.length / 2;
      return new Uint8Array(r).map((s, i) => {
        const o = i * 2;
        return parseInt(e.substring(o, o + 2), 16);
      });
    }
  }
}, Uh = (e, t, r, n, s) => {
  const i = { sha256: Or, sha512: kh }[s];
  return X(va(i, e, t, { c: r, dkLen: n }));
}, { crypto: ds, btoa: zh } = globalThis;
if (!ds)
  throw new v(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!zh)
  throw new v(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var ko = (e) => ds.getRandomValues(new Uint8Array(e)), Ts = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const r = String.fromCharCode.apply(null, new Uint8Array(e));
      return zh(r);
    }
    case "hex":
    default: {
      let r = "";
      for (let n = 0; n < e.length; n += 1) {
        const s = e[n].toString(16);
        r += s.length === 1 ? `0${s}` : s;
      }
      return r;
    }
  }
}, Gh = "AES-CTR", Ra = (e, t) => {
  const r = ln(String(e).normalize("NFKC"), "utf-8"), n = Uh(r, t, 1e5, 32, "sha256");
  return W(n);
}, _g = async (e, t) => {
  const r = ko(16), n = ko(32), s = Ra(e, n), i = JSON.stringify(t), o = ln(i, "utf-8"), a = {
    name: Gh,
    counter: r,
    length: 64
  }, u = await crypto.subtle.importKey("raw", s, a, !1, ["encrypt"]), A = await crypto.subtle.encrypt(a, u, o);
  return {
    data: Ts(new Uint8Array(A)),
    iv: Ts(r),
    salt: Ts(n)
  };
}, hg = async (e, t) => {
  const r = ln(t.iv), n = ln(t.salt), s = Ra(e, n), i = ln(t.data), o = {
    name: Gh,
    counter: r,
    length: 64
  }, a = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), u = await crypto.subtle.decrypt(o, a, i), A = new TextDecoder().decode(u);
  try {
    return JSON.parse(A);
  } catch {
    throw new v(D.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, lg = async (e, t, r) => {
  const n = ds.subtle, s = new Uint8Array(t.subarray(0, 16)), i = r, o = e, a = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), u = await n.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    a,
    o
  );
  return new Uint8Array(u);
}, Ag = async (e, t, r) => {
  const n = ds.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(r).buffer, o = new Uint8Array(e).buffer, a = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), u = await n.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    a,
    o
  );
  return new Uint8Array(u);
}, pg = (e, t, r) => {
  const n = e === "sha256" ? Or : kh, s = mi.create(n, t).update(r).digest();
  return X(s);
}, fg = () => ds.randomUUID(), gg = {
  bufferFromString: ln,
  stringFromBuffer: Ts,
  decrypt: hg,
  encrypt: _g,
  keyFromPassword: Ra,
  randomBytes: ko,
  scrypt: cg,
  keccak256: dg,
  decryptJsonWalletData: Ag,
  encryptJsonWalletData: lg,
  computeHmac: pg,
  pbkdf2: Uh,
  ripemd160: ug,
  randomUUID: fg
}, wg = gg, {
  bufferFromString: Dr,
  decrypt: mg,
  encrypt: yg,
  keyFromPassword: UB,
  randomBytes: Ue,
  stringFromBuffer: Pn,
  scrypt: Vh,
  keccak256: Hh,
  decryptJsonWalletData: bg,
  encryptJsonWalletData: Ig,
  pbkdf2: Eg,
  computeHmac: Yh,
  ripemd160: vg,
  randomUUID: Cg
} = wg;
function ve(e) {
  return X(Or(W(e)));
}
function ze(e) {
  return ve(e);
}
function Bg(e) {
  const t = BigInt(e), r = new ArrayBuffer(8), n = new DataView(r);
  return n.setBigUint64(0, t, !1), new Uint8Array(n.buffer);
}
function xg(e) {
  return ze(Dr(e, "utf-8"));
}
var Rg = Object.defineProperty, Sg = (e, t, r) => t in e ? Rg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Sa = (e, t, r) => (Sg(e, t + "", r), r), at = class {
  constructor(e, t, r) {
    F(this, "name");
    F(this, "type");
    F(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = r;
  }
}, Tg = "u8", Ng = "u16", Dg = "u32", Qg = "u64", Fg = "u256", Og = "raw untyped ptr", Mg = "raw untyped slice", Lg = "bool", Pg = "b256", kg = "struct std::b512::B512", zs = "enum std::option::Option", Ug = "struct std::vec::Vec", zg = "struct std::bytes::Bytes", Gg = "struct std::string::String", Vg = "str", us = "()", Xh = /^enum (std::option::)?Option$/m, Wh = /^str\[(?<length>[0-9]+)\]/, Uo = /^\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Zh = /^struct.+/, jh = /^enum.+$/, Hg = /^\((?<items>.*)\)$/, Yg = /^generic.+$/, Xg = /([^\s]+)$/m, Gs = "1", ut = 8, fr = 32, Vs = fr + 2, Jn = fr, zo = fr, Wg = fr, Zg = ut * 4, jg = ut * 2, Jh = 2 ** 32 - 1, qh = ({ maxInputs: e }) => fr + // Tx ID
Jn + // Base asset ID
// Asset ID/Balance coin input pairs
e * (Jn + ut) + ut, $h = ut + // Identifier
ut + // Gas limit
ut + // Script size
ut + // Script data size
ut + // Policies
ut + // Inputs size
ut + // Outputs size
ut + // Witnesses size
fr, zB = ut + // Identifier
Zg + // Utxo Length
ut + // Output Index
Wg + // Owner
ut + // Amount
Jn + // Asset id
jg + // TxPointer
ut + // Witnesses index
ut + // Predicate size
ut + // Predicate data size
ut, kc = (e) => e instanceof Uint8Array, Rn = (e) => {
  const t = Array.isArray(e) ? e : Object.values(e);
  for (const r of t)
    if (r.type === zs || "coder" in r && r.coder.type === zs || "coders" in r && Rn(r.coders))
      return !0;
  return !1;
}, ss, th, ft = (th = class extends at {
  constructor(t, r) {
    super("array", `[${t.type}; ${r}]`, r * t.encodedLength);
    F(this, "coder");
    F(this, "length");
    Ge(this, ss);
    this.coder = t, this.length = r, Je(this, ss, Rn([t]));
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new v(D.ENCODE_ERROR, "Types/values length mismatch.");
    return nt(Array.from(t).map((r) => this.coder.encode(r)));
  }
  decode(t, r) {
    if (!Mt(this, ss) && t.length < this.encodedLength || t.length > Jh)
      throw new v(D.DECODE_ERROR, "Invalid array data size.");
    let n = r;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, n] = this.coder.decode(t, n), i;
    }), n];
  }
}, ss = new WeakMap(), th), Y = class extends at {
  constructor() {
    super("b256", "b256", ut * 4);
  }
  encode(e) {
    let t;
    try {
      t = W(e);
    } catch {
      throw new v(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid b256 data size.");
    let r = e.slice(t, t + this.encodedLength);
    if (x(r).isZero() && (r = new Uint8Array(32)), r.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid b256 byte data size.");
    return [fa(r, 32), t + 32];
  }
}, Jg = class extends at {
  constructor() {
    super("b512", "struct B512", ut * 8);
  }
  encode(e) {
    let t;
    try {
      t = W(e);
    } catch {
      throw new v(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid b512 data size.");
    let r = e.slice(t, t + this.encodedLength);
    if (x(r).isZero() && (r = new Uint8Array(64)), r.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid b512 byte data size.");
    return [fa(r, this.encodedLength), t + this.encodedLength];
  }
}, qg = {
  u64: ut,
  u256: ut * 4
}, M = class extends at {
  constructor(e) {
    super("bigNumber", e, qg[e]);
  }
  encode(e) {
    let t;
    try {
      t = lr(e, this.encodedLength);
    } catch {
      throw new v(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let r = e.slice(t, t + this.encodedLength);
    if (r = r.slice(0, this.encodedLength), r.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [x(r), t + this.encodedLength];
  }
}, $g = class extends at {
  constructor(t = {
    padToWordSize: !1
  }) {
    const r = t.padToWordSize ? ut : 1;
    super("boolean", "boolean", r);
    F(this, "options");
    this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new v(D.ENCODE_ERROR, "Invalid boolean value.");
    return lr(t ? 1 : 0, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid boolean data size.");
    const n = x(t.slice(r, r + this.encodedLength));
    if (n.isZero())
      return [!1, r + this.encodedLength];
    if (!n.eq(x(1)))
      throw new v(D.DECODE_ERROR, "Invalid boolean value.");
    return [!0, r + this.encodedLength];
  }
}, Kh = class extends at {
  constructor() {
    super("struct", "struct Bytes", ut);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), r = new M("u64").encode(t.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < ut)
      throw new v(D.DECODE_ERROR, "Invalid byte data size.");
    const r = t + ut, n = e.slice(t, r), s = x(new M("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, r + s];
  }
};
Sa(Kh, "memorySize", 1);
var Wr, is, fn, Lr, el, rl, nl, eh, tl = (eh = class extends at {
  constructor(t, r) {
    const n = new M("u64"), s = Object.values(r).reduce(
      (i, o) => Math.min(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, n.encodedLength + s);
    Ge(this, Lr);
    F(this, "name");
    F(this, "coders");
    Ge(this, Wr);
    Ge(this, is);
    Ge(this, fn);
    this.name = t, this.coders = r, Je(this, Wr, n), Je(this, is, s), Je(this, fn, !(Xh.test(this.type) || Rn(r)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return ws(this, Lr, rl).call(this, t);
    const [r, ...n] = Object.keys(t);
    if (!r)
      throw new v(D.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (n.length !== 0)
      throw new v(D.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[r], i = Object.keys(this.coders).indexOf(r);
    if (i === -1) {
      const a = Object.keys(this.coders).map((u) => `'${u}'`).join(", ");
      throw new v(
        D.INVALID_DECODE_VALUE,
        `Invalid case '${r}'. Valid cases: ${a}.`
      );
    }
    const o = s.encode(t[r]);
    return new Uint8Array([...Mt(this, Wr).encode(i), ...o]);
  }
  decode(t, r) {
    if (Mt(this, fn) && t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid enum data size.");
    const n = new M("u64").decode(t, r)[0], s = xr(n), i = Object.keys(this.coders)[s];
    if (!i)
      throw new v(
        D.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], a = r + Mt(this, Wr).encodedLength;
    if (Mt(this, fn) && t.length < a + o.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid enum data size.");
    const [u, A] = o.decode(t, a);
    return ws(this, Lr, el).call(this, this.coders[i]) ? ws(this, Lr, nl).call(this, i, A) : [{ [i]: u }, A];
  }
}, Wr = new WeakMap(), is = new WeakMap(), fn = new WeakMap(), Lr = new WeakSet(), // Checks that we're handling a native enum that is of type void.
el = function(t) {
  return this.type !== zs && t.type === us;
}, rl = function(t) {
  const r = this.coders[t], n = r.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Mt(this, is) - r.encodedLength);
  return nt([Mt(this, Wr).encode(s), i, n]);
}, nl = function(t, r) {
  return [t, r];
}, eh), Kg = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new v(D.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, J = class extends at {
  constructor(t, r = {
    padToWordSize: !1
  }) {
    const n = r.padToWordSize ? ut : Kg(t);
    super("number", t, n);
    F(this, "baseType");
    F(this, "options");
    this.baseType = t, this.options = r;
  }
  encode(t) {
    let r;
    try {
      r = lr(t);
    } catch {
      throw new v(D.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (r.length > this.encodedLength)
      throw new v(D.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return lr(r, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid number data size.");
    const n = t.slice(r, r + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid number byte data size.");
    return [xr(n), r + this.encodedLength];
  }
}, sl = class extends tl {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    const [r, n] = super.decode(e, t);
    return [this.toOption(r), n];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, tw = class extends at {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ut);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    const r = new ft(new J("u8"), e.length).encode(e), n = new M("u64").encode(r.length);
    return new Uint8Array([...n, ...r]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid raw slice data size.");
    const r = t + ut, n = e.slice(t, r), s = x(new M("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new ft(new J("u8"), s), [a] = o.decode(i, 0);
    return [a, r + s];
  }
}, Ta = class extends at {
  constructor() {
    super("struct", "struct String", ut);
  }
  encode(e) {
    const t = wn(e), r = new M("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid std string data size.");
    const r = t + ut, n = e.slice(t, r), s = x(new M("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid std string byte data size.");
    return [ba(i), r + s];
  }
};
Sa(Ta, "memorySize", 1);
var il = class extends at {
  constructor() {
    super("strSlice", "str", ut);
  }
  encode(e) {
    const t = wn(e), r = new M("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid string slice data size.");
    const r = t + ut, n = e.slice(t, r), s = x(new M("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid string slice byte data size.");
    return [ba(i), r + s];
  }
};
Sa(il, "memorySize", 1);
var ew = class extends at {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new v(D.ENCODE_ERROR, "Value length mismatch during encode.");
    return wn(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid string data size.");
    const r = e.slice(t, t + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid string byte data size.");
    return [ba(r), t + this.encodedLength];
  }
}, os, rh, yi = (rh = class extends at {
  constructor(t, r) {
    const n = Object.values(r).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, n);
    F(this, "name");
    F(this, "coders");
    Ge(this, os);
    this.name = t, this.coders = r, Je(this, os, Rn(r));
  }
  encode(t) {
    return gi(
      Object.keys(this.coders).map((r) => {
        const n = this.coders[r], s = t[r];
        if (!(n instanceof sl) && s == null)
          throw new v(
            D.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${r}" not present.`
          );
        return n.encode(s);
      })
    );
  }
  decode(t, r) {
    if (!Mt(this, os) && t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid struct data size.");
    let n = r;
    return [Object.keys(this.coders).reduce((i, o) => {
      const a = this.coders[o];
      let u;
      return [u, n] = a.decode(t, n), i[o] = u, i;
    }, {}), n];
  }
}, os = new WeakMap(), rh), as, nh, ol = (nh = class extends at {
  constructor(t) {
    const r = t.reduce((n, s) => n + s.encodedLength, 0);
    super("tuple", `(${t.map((n) => n.type).join(", ")})`, r);
    F(this, "coders");
    Ge(this, as);
    this.coders = t, Je(this, as, Rn(t));
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(D.ENCODE_ERROR, "Types/values length mismatch.");
    return gi(this.coders.map((r, n) => r.encode(t[n])));
  }
  decode(t, r) {
    if (!Mt(this, as) && t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid tuple data size.");
    let n = r;
    return [this.coders.map((i) => {
      let o;
      return [o, n] = i.decode(t, n), o;
    }), n];
  }
}, as = new WeakMap(), nh), gn, sh, rw = (sh = class extends at {
  constructor(t) {
    super("struct", "struct Vec", ut);
    F(this, "coder");
    Ge(this, gn);
    this.coder = t, Je(this, gn, Rn([t]));
  }
  encode(t) {
    if (!Array.isArray(t) && !kc(t))
      throw new v(
        D.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const r = new M("u64");
    if (kc(t))
      return new Uint8Array([...r.encode(t.length), ...t]);
    const n = t.map((i) => this.coder.encode(i)), s = r.encode(t.length);
    return new Uint8Array([...s, ...gi(n)]);
  }
  decode(t, r) {
    if (!Mt(this, gn) && t.length < this.encodedLength || t.length > Jh)
      throw new v(D.DECODE_ERROR, "Invalid vec data size.");
    const n = r + ut, s = t.slice(r, n), i = x(new M("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, a = t.slice(n, n + o);
    if (!Mt(this, gn) && a.length !== o)
      throw new v(D.DECODE_ERROR, "Invalid vec byte data size.");
    let u = n;
    const A = [];
    for (let f = 0; f < i; f++) {
      const [g, y] = this.coder.decode(t, u);
      A.push(g), u = y;
    }
    return [A, u];
  }
}, gn = new WeakMap(), sh), al = (e) => {
  switch (e) {
    case void 0:
    case Gs:
      return Gs;
    default:
      throw new v(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, Xn = (e, t) => {
  const r = e.types.find((n) => n.typeId === t);
  if (!r)
    throw new v(
      D.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return r;
}, nw = (e, t) => t.filter((r) => Xn(e, r.type).type !== us), sw = (e) => {
  var n;
  const t = e.find((s) => s.name === "buf"), r = (n = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : n[0];
  if (!t || !r)
    throw new v(
      D.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return r;
}, Rr = class {
  constructor(e, t) {
    F(this, "abi");
    F(this, "name");
    F(this, "type");
    F(this, "originalTypeArguments");
    F(this, "components");
    this.abi = e, this.name = t.name;
    const r = Xn(e, t.type);
    if (r.type.length > 256)
      throw new v(
        D.INVALID_COMPONENT,
        `The provided ABI type is too long: ${r.type}.`
      );
    this.type = r.type, this.originalTypeArguments = t.typeArguments, this.components = Rr.getResolvedGenericComponents(
      e,
      t,
      r.components,
      r.typeParameters ?? Rr.getImplicitGenericTypeParameters(e, r.components)
    );
  }
  static getResolvedGenericComponents(e, t, r, n) {
    if (r === null)
      return null;
    if (n === null || n.length === 0)
      return r.map((o) => new Rr(e, o));
    const s = n.reduce(
      (o, a, u) => {
        var f;
        const A = { ...o };
        return A[a] = structuredClone(
          (f = t.typeArguments) == null ? void 0 : f[u]
        ), A;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      r,
      s
    ).map((o) => new Rr(e, o));
  }
  static resolveGenericArgTypes(e, t, r) {
    return t.map((n) => {
      if (r[n.type] !== void 0)
        return {
          ...r[n.type],
          name: n.name
        };
      if (n.typeArguments)
        return {
          ...structuredClone(n),
          typeArguments: this.resolveGenericArgTypes(
            e,
            n.typeArguments,
            r
          )
        };
      const s = Xn(e, n.type), i = this.getImplicitGenericTypeParameters(e, s.components);
      return i && i.length > 0 ? {
        ...structuredClone(n),
        typeArguments: i.map((o) => r[o])
      } : n;
    });
  }
  static getImplicitGenericTypeParameters(e, t, r) {
    if (!Array.isArray(t))
      return null;
    const n = r ?? [];
    return t.forEach((s) => {
      const i = Xn(e, s.type);
      if (Yg.test(i.type)) {
        n.push(i.typeId);
        return;
      }
      Array.isArray(s.typeArguments) && this.getImplicitGenericTypeParameters(e, s.typeArguments, n);
    }), n.length > 0 ? n : null;
  }
  getSignature() {
    const e = this.getArgSignaturePrefix(), t = this.getArgSignatureContent();
    return `${e}${t}`;
  }
  getArgSignaturePrefix() {
    return Zh.test(this.type) ? "s" : Uo.test(this.type) ? "a" : jh.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = Wh.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Uo.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const r = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new Rr(this.abi, o).getSignature()).join(",")}>` : "", n = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${r}${n}`;
  }
}, iw = class extends at {
  constructor() {
    super("void", us, 0);
  }
  encode(e) {
    return new Uint8Array([]);
  }
  decode(e, t) {
    return [void 0, t];
  }
};
function Uc(e, t) {
  const { getCoder: r } = t;
  return e.reduce((n, s) => {
    const i = n;
    return i[s.name] = r(s, t), i;
  }, {});
}
var on = (e, t) => {
  var A, f, g, y;
  switch (e.type) {
    case Tg:
    case Ng:
    case Dg:
      return new J(e.type);
    case Qg:
    case Og:
      return new M("u64");
    case Fg:
      return new M("u256");
    case Mg:
      return new tw();
    case Lg:
      return new $g();
    case Pg:
      return new Y();
    case kg:
      return new Jg();
    case zg:
      return new Kh();
    case Gg:
      return new Ta();
    case Vg:
      return new il();
    case us:
      return new iw();
  }
  const r = (A = Wh.exec(e.type)) == null ? void 0 : A.groups;
  if (r) {
    const R = parseInt(r.length, 10);
    return new ew(R);
  }
  const n = e.components, s = (f = Uo.exec(e.type)) == null ? void 0 : f.groups;
  if (s) {
    const R = parseInt(s.length, 10), Q = n[0];
    if (!Q)
      throw new v(
        D.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const S = on(Q);
    return new ft(S, R);
  }
  if (e.type === Ug) {
    const R = sw(n), Q = new Rr(e.abi, R), S = on(Q);
    return new rw(S);
  }
  const i = (g = e.type.match(Xg)) == null ? void 0 : g[0];
  if (Zh.test(e.type) && i) {
    const R = Uc(n, { getCoder: on });
    return new yi(i, R);
  }
  if (jh.test(e.type) && i) {
    const R = Uc(n, { getCoder: on });
    return e.type === zs ? new sl(i, R) : new tl(i, R);
  }
  if ((y = Hg.exec(e.type)) == null ? void 0 : y.groups) {
    const R = n.map((Q) => on(Q));
    return new ol(R);
  }
  throw new v(
    D.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function ow(e = Gs) {
  switch (e) {
    case Gs:
      return on;
    default:
      throw new v(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Hr = class {
  static getCoder(e, t, r = {
    padToWordSize: !1
  }) {
    const n = new Rr(e, t);
    return ow(r.encoding)(n, r);
  }
  static encode(e, t, r, n) {
    return this.getCoder(e, t, n).encode(r);
  }
  static decode(e, t, r, n, s) {
    return this.getCoder(e, t, s).decode(r, n);
  }
}, aw = (e) => {
  const { jsonAbi: t, inputs: r } = e;
  let n = !1;
  return r.reduceRight((s, i) => {
    const o = Xn(t, i.type);
    return n = n || o.type !== us && !Xh.test(o.type), [{ ...i, isOptional: !n }, ...s];
  }, []);
}, cw = (e, t) => {
  if (e.length >= t.length)
    return e;
  const r = e.slice();
  return r.length = t.length, r.fill(void 0, e.length), r;
}, Go = class {
  constructor(e, t) {
    F(this, "signature");
    F(this, "selector");
    F(this, "selectorBytes");
    F(this, "encoding");
    F(this, "name");
    F(this, "jsonFn");
    F(this, "attributes");
    F(this, "jsonAbiOld");
    F(this, "jsonFnOld");
    this.jsonFn = t, this.jsonAbiOld = e, this.jsonFnOld = e.functions.find((r) => r.name === t.name), this.name = t.name, this.signature = Go.getSignature(this.jsonAbiOld, this.jsonFnOld), this.selector = Go.getFunctionSelector(this.signature), this.selectorBytes = new Ta().encode(this.name), this.encoding = al(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const r = t.inputs.map(
      (n) => new Rr(e, n).getSignature()
    );
    return `${t.name}(${r.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = ve(Dr(e, "utf-8"));
    return x(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e) {
    const r = aw({ jsonAbi: this.jsonAbiOld, inputs: this.jsonFnOld.inputs }).filter((i) => !i.isOptional).length;
    if (e.length < r)
      throw new v(
        D.ABI_TYPES_AND_VALUES_MISMATCH,
        `Invalid number of arguments. Expected a minimum of ${r} arguments, received ${e.length}`
      );
    const n = this.jsonFnOld.inputs.map(
      (i) => Hr.getCoder(this.jsonAbiOld, i, {
        encoding: this.encoding
      })
    ), s = cw(e, this.jsonFn.inputs);
    return new ol(n).encode(s);
  }
  decodeArguments(e) {
    const t = W(e), r = nw(this.jsonAbiOld, this.jsonFnOld.inputs);
    if (r.length === 0) {
      if (t.length === 0)
        return;
      throw new v(
        D.DECODE_ERROR,
        `Types/values length mismatch during decode. ${JSON.stringify({
          count: {
            types: this.jsonFn.inputs.length,
            nonVoidInputs: r.length,
            values: t.length
          },
          value: {
            args: this.jsonFn.inputs,
            nonVoidInputs: r,
            values: t
          }
        })}`
      );
    }
    return this.jsonFnOld.inputs.reduce(
      (s, i) => {
        const o = Hr.getCoder(this.jsonAbiOld, i, { encoding: this.encoding }), [a, u] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, a],
          offset: s.offset + u
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    const t = W(e);
    return Hr.getCoder(this.jsonAbiOld, this.jsonFnOld.output, {
      encoding: this.encoding
    }).decode(t, 0);
  }
  /**
   * Checks if the function is read-only i.e. it only reads from storage, does not write to it.
   *
   * @returns True if the function is read-only or pure, false otherwise.
   */
  isReadOnly() {
    var t;
    const e = this.attributes.find((r) => r.name === "storage");
    return !((t = e == null ? void 0 : e.arguments) != null && t.includes("write"));
  }
}, dw = (e, t) => e.find((r) => r.concreteTypeId === t), Na = (e, t) => e.concreteTypes.find((r) => r.concreteTypeId === t);
function Da(e, t, r) {
  const n = Na(e, r);
  if (n.metadataTypeId !== void 0)
    return n.metadataTypeId;
  const s = dw(t, r);
  return s ? s.typeId : (t.push({
    typeId: t.length,
    type: n.type,
    components: Qa(n.components),
    concreteTypeId: r,
    typeParameters: n.typeParameters ?? null,
    originalConcreteTypeId: n == null ? void 0 : n.concreteTypeId
  }), t.length - 1);
}
function cl(e, t, r) {
  var n;
  return ((n = r.typeArguments) == null ? void 0 : n.map((s) => {
    const i = Na(e, s);
    return {
      name: "",
      type: isNaN(s) ? Da(e, t, s) : s,
      // originalTypeId: cTypeId,
      typeArguments: cl(e, t, i)
    };
  })) ?? null;
}
function cn(e, t, r, n) {
  const s = Da(e, t, r), i = Na(e, r);
  return {
    name: n ?? "",
    type: s,
    // concreteTypeId,
    typeArguments: cl(e, t, i)
  };
}
function Qa(e, t, r) {
  return (r == null ? void 0 : r.map((n) => {
    const { typeId: s, name: i, typeArguments: o } = n, a = isNaN(s) ? Da(e, t, s) : s;
    return {
      name: i,
      type: a,
      // originalTypeId: typeId,
      typeArguments: Qa(e, t, o)
    };
  })) ?? null;
}
function uw(e) {
  if (!e.specVersion)
    return e;
  const t = [];
  e.metadataTypes.forEach((o) => {
    const a = {
      typeId: o.metadataTypeId,
      type: o.type,
      components: o.components ?? (o.type === "()" ? [] : null),
      typeParameters: o.typeParameters ?? null
    };
    t.push(a);
  }), t.forEach((o) => {
    o.components = Qa(e, t, o.components);
  });
  const r = e.functions.map((o) => {
    const a = o.inputs.map(
      ({ concreteTypeId: A, name: f }) => cn(e, t, A, f)
    ), u = cn(e, t, o.output, "");
    return { ...o, inputs: a, output: u };
  }), n = e.configurables.map((o) => ({
    name: o.name,
    configurableType: cn(e, t, o.concreteTypeId),
    offset: o.offset
  })), s = e.loggedTypes.map((o) => ({
    logId: o.logId,
    loggedType: cn(e, t, o.concreteTypeId)
  }));
  return {
    encoding: e.encodingVersion,
    types: t,
    functions: r,
    loggedTypes: s,
    messagesTypes: e.messagesTypes,
    configurables: n
  };
}
var gr = class {
  constructor(e) {
    F(this, "functions");
    F(this, "configurables");
    F(this, "jsonAbi");
    F(this, "encoding");
    F(this, "jsonAbiOld");
    this.jsonAbi = e, this.encoding = al(e.encodingVersion), this.jsonAbiOld = uw(e), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new Go(this.jsonAbiOld, t)])
    ), this.configurables = Object.fromEntries(this.jsonAbi.configurables.map((t) => [t.name, t]));
  }
  /**
   * Returns function fragment for a dynamic input.
   * @param nameOrSignatureOrSelector - name (e.g. 'transfer'), signature (e.g. 'transfer(address,uint256)') or selector (e.g. '0x00000000a9059cbb') of the function fragment
   */
  getFunction(e) {
    const t = Object.values(this.functions).find(
      (r) => r.name === e || r.signature === e || r.selector === e
    );
    if (t !== void 0)
      return t;
    throw new v(
      D.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t) {
    const r = this.jsonAbiOld.loggedTypes.find((n) => n.logId === t);
    if (!r)
      throw new v(
        D.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Hr.decode(this.jsonAbiOld, r.loggedType, W(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const r = this.jsonAbiOld.configurables.find((n) => n.name === e);
    if (!r)
      throw new v(
        D.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Hr.encode(this.jsonAbiOld, r.configurableType, t, {
      encoding: this.encoding
    });
  }
  encodeType(e, t) {
    const r = cn(
      this.jsonAbi,
      this.jsonAbiOld.types,
      e,
      ""
    );
    return Hr.encode(this.jsonAbiOld, r, t, {
      encoding: this.encoding
    });
  }
  decodeType(e, t) {
    const r = cn(
      this.jsonAbi,
      this.jsonAbiOld.types,
      e,
      ""
    );
    return Hr.decode(this.jsonAbiOld, r, t, 0, { encoding: this.encoding });
  }
}, GB = class {
}, _w = class {
}, dl = class {
}, ul = class {
}, hw = class extends ul {
}, lw = class extends ul {
}, qn = {};
Object.defineProperty(qn, "__esModule", { value: !0 });
var bn = qn.bech32m = qn.bech32 = void 0;
const Hs = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", _l = {};
for (let e = 0; e < Hs.length; e++) {
  const t = Hs.charAt(e);
  _l[t] = e;
}
function An(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function zc(e) {
  let t = 1;
  for (let r = 0; r < e.length; ++r) {
    const n = e.charCodeAt(r);
    if (n < 33 || n > 126)
      return "Invalid prefix (" + e + ")";
    t = An(t) ^ n >> 5;
  }
  t = An(t);
  for (let r = 0; r < e.length; ++r) {
    const n = e.charCodeAt(r);
    t = An(t) ^ n & 31;
  }
  return t;
}
function Fa(e, t, r, n) {
  let s = 0, i = 0;
  const o = (1 << r) - 1, a = [];
  for (let u = 0; u < e.length; ++u)
    for (s = s << t | e[u], i += t; i >= r; )
      i -= r, a.push(s >> i & o);
  if (n)
    i > 0 && a.push(s << r - i & o);
  else {
    if (i >= t)
      return "Excess padding";
    if (s << r - i & o)
      return "Non-zero padding";
  }
  return a;
}
function Aw(e) {
  return Fa(e, 8, 5, !0);
}
function pw(e) {
  const t = Fa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function fw(e) {
  const t = Fa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function hl(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function r(o, a, u) {
    if (u = u || 90, o.length + 7 + a.length > u)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let A = zc(o);
    if (typeof A == "string")
      throw new Error(A);
    let f = o + "1";
    for (let g = 0; g < a.length; ++g) {
      const y = a[g];
      if (y >> 5)
        throw new Error("Non 5-bit word");
      A = An(A) ^ y, f += Hs.charAt(y);
    }
    for (let g = 0; g < 6; ++g)
      A = An(A);
    A ^= t;
    for (let g = 0; g < 6; ++g) {
      const y = A >> (5 - g) * 5 & 31;
      f += Hs.charAt(y);
    }
    return f;
  }
  function n(o, a) {
    if (a = a || 90, o.length < 8)
      return o + " too short";
    if (o.length > a)
      return "Exceeds length limit";
    const u = o.toLowerCase(), A = o.toUpperCase();
    if (o !== u && o !== A)
      return "Mixed-case string " + o;
    o = u;
    const f = o.lastIndexOf("1");
    if (f === -1)
      return "No separator character for " + o;
    if (f === 0)
      return "Missing prefix for " + o;
    const g = o.slice(0, f), y = o.slice(f + 1);
    if (y.length < 6)
      return "Data too short";
    let R = zc(g);
    if (typeof R == "string")
      return R;
    const Q = [];
    for (let S = 0; S < y.length; ++S) {
      const N = y.charAt(S), O = _l[N];
      if (O === void 0)
        return "Unknown character " + N;
      R = An(R) ^ O, !(S + 6 >= y.length) && Q.push(O);
    }
    return R !== t ? "Invalid checksum for " + o : { prefix: g, words: Q };
  }
  function s(o, a) {
    const u = n(o, a);
    if (typeof u == "object")
      return u;
  }
  function i(o, a) {
    const u = n(o, a);
    if (typeof u == "object")
      return u;
    throw new Error(u);
  }
  return {
    decodeUnsafe: s,
    decode: i,
    encode: r,
    toWords: Aw,
    fromWordsUnsafe: pw,
    fromWords: fw
  };
}
qn.bech32 = hl("bech32");
bn = qn.bech32m = hl("bech32m");
var Ys = "fuel";
function Oa(e) {
  return bn.decode(e);
}
function kn(e) {
  return bn.encode(
    Ys,
    bn.toWords(W(X(e)))
  );
}
function Ns(e) {
  return typeof e == "string" && e.indexOf(Ys + 1) === 0 && Oa(e).prefix === Ys;
}
function Un(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Gc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Vo(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function Ma(e) {
  return new Uint8Array(bn.fromWords(Oa(e).words));
}
function Vc(e) {
  if (!Ns(e))
    throw new v(
      v.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return X(Ma(e));
}
function gw(e) {
  const { words: t } = Oa(e);
  return bn.encode(Ys, t);
}
var zn = (e) => e instanceof dl ? e.address : e instanceof hw ? e.id : e, ww = () => X(Ue(32)), mw = (e) => {
  let t;
  try {
    if (!Un(e))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = Ma(kn(e)), t = X(t.fill(0, 0, 12));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, yw = (e) => {
  if (!Vo(e))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, dt = class extends _w {
  // #endregion address-2
  /**
   * @param address - A Bech32 address or B256 address
   */
  constructor(t) {
    super();
    // #region address-2
    /**
     * @deprecated
     * Type `Bech32Address` is now deprecated, as is this property. Use `B256` addresses instead. ([help](https://docs.fuel.network/docs/specs/abi/argument-encoding/#b256))
     */
    F(this, "bech32Address");
    if (Un(t))
      this.bech32Address = kn(t);
    else if (this.bech32Address = gw(t), !Ns(this.bech32Address))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${this.bech32Address}.`
      );
  }
  /**
   * Takes an B256 Address and returns back an checksum address.
   * The implementation follows the ERC-55 https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md.
   *
   * @returns A new `ChecksumAddress` instance
   */
  toChecksum() {
    return dt.toChecksum(this.toB256());
  }
  /**
   * Returns the `bech32Address` property
   * @deprecated
   * Type `Bech32Address` is now deprecated, as is this method. Use `B256` addresses instead. ([help](https://docs.fuel.network/docs/specs/abi/argument-encoding/#b256))
   * @returns The `bech32Address` property
   */
  toAddress() {
    return this.bech32Address;
  }
  /**
   * Converts and returns the `bech32Address` property to a 256 bit hash string
   * @returns The `bech32Address` property as a 256 bit hash string
   */
  toB256() {
    return Vc(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return Ma(this.bech32Address);
  }
  /**
   * Converts the `bech32Address` property to a 256 bit hash string
   * @returns The `bech32Address` property as a 256 bit hash string
   */
  toHexString() {
    return this.toB256();
  }
  /**
   * returns the address `checksum` as a string
   *
   * @returns The `bech32Address` property as a string
   */
  toString() {
    return this.toChecksum();
  }
  /**
   * Converts and returns the `bech32Address` property as a string
   * @returns The `bech32Address` property as a JSON string
   */
  toJSON() {
    return this.bech32Address;
  }
  /**
   * Clears the first 12 bytes of the `bech32Address` property and returns it as a `EvmAddress`
   * @returns The `bech32Address` property as an {@link EvmAddress | `EvmAddress`}
   */
  toEvmAddress() {
    const t = Vc(this.bech32Address);
    return {
      bits: mw(t)
    };
  }
  /**
   * Wraps the B256 property and returns as an `AssetId`.
   * @returns The B256 property as an {@link AssetId | `AssetId`}
   */
  toAssetId() {
    return {
      bits: this.toB256()
    };
  }
  /**
   * Wraps the B256 address `checksum` and returns it as a string
   * @returns The B256 address `checksum` as a string
   */
  valueOf() {
    return this.toChecksum();
  }
  /**
   * Compares this the `bech32Address` property to another for direct equality
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
    if (!Gc(t))
      throw new v(v.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const r = X(Or(W(t)));
    return new dt(kn(r));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!Un(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new dt(kn(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(ww());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Ns(t) ? new dt(t) : this.fromB256(t);
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
      return dt.fromB256(t.toB256());
    if (Gc(t))
      return dt.fromPublicKey(t);
    if (Ns(t))
      return new dt(t);
    if (Un(t))
      return dt.fromB256(t);
    if (Vo(t))
      return dt.fromEvmAddress(t);
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
    if (!Vo(t))
      throw new v(
        v.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const r = yw(t);
    return new dt(kn(r));
  }
  /**
   * Takes an ChecksumAddress and validates if it is a valid checksum address.
   *
   * @returns A `boolean` instance indicating if the address is valid.
   */
  static isChecksumValid(t) {
    let r = t;
    return t.startsWith("0x") || (r = `0x${t}`), r.trim().length !== 66 ? !1 : dt.toChecksum(X(r)) === r;
  }
  /** @hidden */
  static toChecksum(t) {
    if (!Un(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    const r = X(t).toLowerCase().slice(2), n = Or(r);
    let s = "0x";
    for (let i = 0; i < 32; ++i) {
      const o = n[i], a = r.charAt(i * 2), u = r.charAt(i * 2 + 1);
      s += (o & 240) >= 128 ? a.toUpperCase() : a, s += (o & 15) >= 8 ? u.toUpperCase() : u;
    }
    return s;
  }
}, Nr, ih, It = (ih = class extends at {
  constructor(t) {
    const r = (8 - t % 8) % 8, n = t + r;
    super(
      "ByteArray",
      // While this might sound like a [u8; N] coder it's actually not.
      // A [u8; N] coder would pad every u8 to 8 bytes which would
      // make every u8 have the same size as a u64.
      // We are packing four u8s into u64s here, avoiding this padding.
      `[u64; ${n / 4}]`,
      n
    );
    F(this, "length");
    Ge(this, Nr);
    this.length = t, Je(this, Nr, r);
  }
  encode(t) {
    const r = [], n = W(t);
    return r.push(n), Mt(this, Nr) && r.push(new Uint8Array(Mt(this, Nr))), nt(r);
  }
  decode(t, r) {
    let n, s = r;
    [n, s] = [X(t.slice(s, s + this.length)), s + this.length];
    const i = n;
    return Mt(this, Nr) && ([n, s] = [null, s + Mt(this, Nr)]), [i, s];
  }
}, Nr = new WeakMap(), ih), Jr = class extends yi {
  constructor() {
    super("TxPointer", {
      blockHeight: new J("u32", { padToWordSize: !0 }),
      txIndex: new J("u16", { padToWordSize: !0 })
    });
  }
  static decodeFromGqlScalar(e) {
    if (e.length !== 12)
      throw new v(
        D.DECODE_ERROR,
        `Invalid TxPointer scalar string length ${e.length}. It must have length 12.`
      );
    const [t, r] = [e.substring(0, 8), e.substring(8)];
    return {
      blockHeight: parseInt(t, 16),
      txIndex: parseInt(r, 16)
    };
  }
}, Et = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Et || {}), Hc = class extends at {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.txID)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new Y().encode(e.owner)), t.push(new M("u64").encode(e.amount)), t.push(new Y().encode(e.assetId)), t.push(new Jr().encode(e.txPointer)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new M("u64").encode(e.predicateGasUsed)), t.push(new M("u64").encode(e.predicateLength)), t.push(new M("u64").encode(e.predicateDataLength)), t.push(new It(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new It(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new Y().decode(e, n);
    const o = r;
    [r, n] = new M("u64").decode(e, n);
    const a = r;
    [r, n] = new Y().decode(e, n);
    const u = r;
    [r, n] = new Jr().decode(e, n);
    const A = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const f = Number(r);
    [r, n] = new M("u64").decode(e, n);
    const g = r;
    [r, n] = new M("u64").decode(e, n);
    const y = r;
    [r, n] = new M("u64").decode(e, n);
    const R = r;
    [r, n] = new It(y.toNumber()).decode(e, n);
    const Q = r;
    return [r, n] = new It(R.toNumber()).decode(e, n), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: a,
        assetId: u,
        txPointer: A,
        witnessIndex: f,
        predicateGasUsed: g,
        predicateLength: y,
        predicateDataLength: R,
        predicate: Q,
        predicateData: r
      },
      n
    ];
  }
}, Xs = class extends at {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.txID)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new Y().encode(e.balanceRoot)), t.push(new Y().encode(e.stateRoot)), t.push(new Jr().encode(e.txPointer)), t.push(new Y().encode(e.contractID)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new Y().decode(e, n);
    const o = r;
    [r, n] = new Y().decode(e, n);
    const a = r;
    [r, n] = new Jr().decode(e, n);
    const u = r;
    return [r, n] = new Y().decode(e, n), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: o,
        stateRoot: a,
        txPointer: u,
        contractID: r
      },
      n
    ];
  }
}, Qr = class extends at {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new It(32).encode(e.sender)), t.push(new It(32).encode(e.recipient)), t.push(new It(32).encode(e.nonce)), t.push(new M("u64").encode(e.amount)), t.push(W(e.data || "0x")), ve(nt(t));
  }
  static encodeData(e) {
    const t = W(e || "0x"), r = t.length;
    return new It(r).encode(t);
  }
  encode(e) {
    const t = [], r = Qr.encodeData(e.data);
    return t.push(new It(32).encode(e.sender)), t.push(new It(32).encode(e.recipient)), t.push(new M("u64").encode(e.amount)), t.push(new It(32).encode(e.nonce)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new M("u64").encode(e.predicateGasUsed)), t.push(new M("u64").encode(r.length)), t.push(new M("u64").encode(e.predicateLength)), t.push(new M("u64").encode(e.predicateDataLength)), t.push(new It(r.length).encode(r)), t.push(new It(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new It(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), nt(t);
  }
  static decodeData(e) {
    const t = W(e), r = t.length, [n] = new It(r).decode(t, 0);
    return W(n);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new Y().decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new Y().decode(e, n);
    const a = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = Number(r);
    [r, n] = new M("u64").decode(e, n);
    const A = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new M("u64").decode(e, n);
    const g = r;
    [r, n] = new M("u64").decode(e, n);
    const y = r;
    [r, n] = new It(f).decode(e, n);
    const R = r;
    [r, n] = new It(g.toNumber()).decode(e, n);
    const Q = r;
    return [r, n] = new It(y.toNumber()).decode(e, n), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: u,
        nonce: a,
        predicateGasUsed: A,
        dataLength: f,
        predicateLength: g,
        predicateDataLength: y,
        data: R,
        predicate: Q,
        predicateData: r
      },
      n
    ];
  }
}, rr = class extends at {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new J("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new Hc().encode(e));
        break;
      }
      case 1: {
        t.push(new Xs().encode(e));
        break;
      }
      case 2: {
        t.push(new Qr().encode(e));
        break;
      }
      default:
        throw new v(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${r}.`
        );
    }
    return nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Hc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Xs().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Qr().decode(e, n), [r, n];
      default:
        throw new v(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, yt = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(yt || {}), Yc = class extends at {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.to)), t.push(new M("u64").encode(e.amount)), t.push(new Y().encode(e.assetId)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new M("u64").decode(e, n);
    const i = r;
    return [r, n] = new Y().decode(e, n), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Ws = class extends at {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new Y().encode(e.balanceRoot)), t.push(new Y().encode(e.stateRoot)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new Y().decode(e, n);
    const i = r;
    return [r, n] = new Y().decode(e, n), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: r
      },
      n
    ];
  }
}, Xc = class extends at {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.to)), t.push(new M("u64").encode(e.amount)), t.push(new Y().encode(e.assetId)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new M("u64").decode(e, n);
    const i = r;
    return [r, n] = new Y().decode(e, n), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Wc = class extends at {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.to)), t.push(new M("u64").encode(e.amount)), t.push(new Y().encode(e.assetId)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new M("u64").decode(e, n);
    const i = r;
    return [r, n] = new Y().decode(e, n), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Zc = class extends at {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.contractId)), t.push(new Y().encode(e.stateRoot)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    return [r, n] = new Y().decode(e, n), [
      {
        type: 4,
        contractId: s,
        stateRoot: r
      },
      n
    ];
  }
}, nr = class extends at {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new J("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new Yc().encode(e));
        break;
      }
      case 1: {
        t.push(new Ws().encode(e));
        break;
      }
      case 2: {
        t.push(new Xc().encode(e));
        break;
      }
      case 3: {
        t.push(new Wc().encode(e));
        break;
      }
      case 4: {
        t.push(new Zc().encode(e));
        break;
      }
      default:
        throw new v(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${r}.`
        );
    }
    return nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Yc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Ws().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Xc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Wc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Zc().decode(e, n), [r, n];
      default:
        throw new v(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Xe = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Xe || {}), bw = (e) => e.sort((t, r) => t.type - r.type);
function Iw(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((r) => {
    if (t.has(r.type))
      throw new v(
        D.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(r.type);
  });
}
var sr = class extends at {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Iw(e);
    const t = bw(e), r = [];
    return t.forEach(({ data: n, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          r.push(new M("u64").encode(n));
          break;
        case 4:
          r.push(new J("u32", { padToWordSize: !0 }).encode(n));
          break;
        default:
          throw new v(D.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), nt(r);
  }
  decode(e, t, r) {
    let n = t;
    const s = [];
    if (r & 1) {
      const [i, o] = new M("u64").decode(e, n);
      n = o, s.push({ type: 1, data: i });
    }
    if (r & 2) {
      const [i, o] = new M("u64").decode(e, n);
      n = o, s.push({ type: 2, data: i });
    }
    if (r & 4) {
      const [i, o] = new J("u32", { padToWordSize: !0 }).decode(
        e,
        n
      );
      n = o, s.push({ type: 4, data: i });
    }
    if (r & 8) {
      const [i, o] = new M("u64").decode(e, n);
      n = o, s.push({ type: 8, data: i });
    }
    return [s, n];
  }
}, _t = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(_t || {}), jc = class extends at {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.from)), t.push(new Y().encode(e.to)), t.push(new M("u64").encode(e.amount)), t.push(new Y().encode(e.assetId)), t.push(new M("u64").encode(e.gas)), t.push(new M("u64").encode(e.param1)), t.push(new M("u64").encode(e.param2)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new Y().decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new Y().decode(e, n);
    const a = r;
    [r, n] = new M("u64").decode(e, n);
    const u = r;
    [r, n] = new M("u64").decode(e, n);
    const A = r;
    [r, n] = new M("u64").decode(e, n);
    const f = r;
    [r, n] = new M("u64").decode(e, n);
    const g = r;
    return [r, n] = new M("u64").decode(e, n), [
      {
        type: 0,
        id: s,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        gas: u,
        param1: A,
        param2: f,
        pc: g,
        is: r
      },
      n
    ];
  }
}, Jc = class extends at {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.id)), t.push(new M("u64").encode(e.val)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new M("u64").decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    return [r, n] = new M("u64").decode(e, n), [
      {
        type: 1,
        id: s,
        val: i,
        pc: o,
        is: r
      },
      n
    ];
  }
}, qc = class extends at {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.id)), t.push(new M("u64").encode(e.ptr)), t.push(new M("u64").encode(e.len)), t.push(new Y().encode(e.digest)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), t.push(new It(e.len.toNumber()).encode(e.data)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new M("u64").decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new Y().decode(e, n);
    const a = r;
    [r, n] = new M("u64").decode(e, n);
    const u = r;
    [r, n] = new M("u64").decode(e, n);
    const A = r;
    return [r, n] = new It(o.toNumber()).decode(e, n), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: a,
        pc: u,
        is: A,
        data: r
      },
      n
    ];
  }
}, $c = class extends at {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.id)), t.push(new M("u64").encode(e.reason)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), t.push(new Y().encode(e.contractId)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new M("u64").decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new M("u64").decode(e, n);
    const a = r;
    return [r, n] = new Y().decode(e, n), [
      {
        type: 3,
        id: s,
        reason: i,
        pc: o,
        is: a,
        contractId: r
      },
      n
    ];
  }
}, Kc = class extends at {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.id)), t.push(new M("u64").encode(e.val)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new M("u64").decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    return [r, n] = new M("u64").decode(e, n), [
      {
        type: 4,
        id: s,
        val: i,
        pc: o,
        is: r
      },
      n
    ];
  }
}, td = class extends at {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.id)), t.push(new M("u64").encode(e.val0)), t.push(new M("u64").encode(e.val1)), t.push(new M("u64").encode(e.val2)), t.push(new M("u64").encode(e.val3)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new M("u64").decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new M("u64").decode(e, n);
    const a = r;
    [r, n] = new M("u64").decode(e, n);
    const u = r;
    [r, n] = new M("u64").decode(e, n);
    const A = r;
    return [r, n] = new M("u64").decode(e, n), [
      {
        type: 5,
        id: s,
        ra: i,
        rb: o,
        rc: a,
        rd: u,
        val0: i,
        val1: o,
        val2: a,
        val3: u,
        pc: A,
        is: r
      },
      n
    ];
  }
}, ed = class extends at {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.id)), t.push(new M("u64").encode(e.val0)), t.push(new M("u64").encode(e.val1)), t.push(new M("u64").encode(e.ptr)), t.push(new M("u64").encode(e.len)), t.push(new Y().encode(e.digest)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), t.push(new It(e.len.toNumber()).encode(e.data)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new M("u64").decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new M("u64").decode(e, n);
    const a = r;
    [r, n] = new M("u64").decode(e, n);
    const u = r;
    [r, n] = new Y().decode(e, n);
    const A = r;
    [r, n] = new M("u64").decode(e, n);
    const f = r;
    [r, n] = new M("u64").decode(e, n);
    const g = r;
    return [r, n] = new It(u.toNumber()).decode(e, n), [
      {
        type: 6,
        id: s,
        ra: i,
        rb: o,
        val0: i,
        val1: o,
        ptr: a,
        len: u,
        digest: A,
        pc: f,
        is: g,
        data: r
      },
      n
    ];
  }
}, rd = class extends at {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.from)), t.push(new Y().encode(e.to)), t.push(new M("u64").encode(e.amount)), t.push(new Y().encode(e.assetId)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new Y().decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new Y().decode(e, n);
    const a = r;
    [r, n] = new M("u64").decode(e, n);
    const u = r;
    return [r, n] = new M("u64").decode(e, n), [
      {
        type: 7,
        id: s,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        pc: u,
        is: r
      },
      n
    ];
  }
}, nd = class extends at {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.from)), t.push(new Y().encode(e.to)), t.push(new M("u64").encode(e.amount)), t.push(new Y().encode(e.assetId)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new Y().decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new Y().decode(e, n);
    const a = r;
    [r, n] = new M("u64").decode(e, n);
    const u = r;
    return [r, n] = new M("u64").decode(e, n), [
      {
        type: 8,
        id: s,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        pc: u,
        is: r
      },
      n
    ];
  }
}, sd = class extends at {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new M("u64").encode(e.result)), t.push(new M("u64").encode(e.gasUsed)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new M("u64").decode(e, n);
    const s = r;
    return [r, n] = new M("u64").decode(e, n), [
      {
        type: 9,
        result: s,
        gasUsed: r
      },
      n
    ];
  }
}, Ho = class extends at {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  /**
   * @deprecated `ReceiptMessageOutCoder.getMessageId` is deprecated and will be removed in future versions.
   * Use the static method `InputMessageCoder.getMessageId` instead.
   */
  static getMessageId(e) {
    const t = [];
    return t.push(new It(32).encode(e.sender)), t.push(new It(32).encode(e.recipient)), t.push(new It(32).encode(e.nonce)), t.push(new M("u64").encode(e.amount)), t.push(W(e.data || "0x")), ve(nt(t));
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.sender)), t.push(new Y().encode(e.recipient)), t.push(new M("u64").encode(e.amount)), t.push(new Y().encode(e.nonce)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.data.length)), t.push(new Y().encode(e.digest)), t.push(new It(e.data.length).encode(e.data)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new Y().decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new Y().decode(e, n);
    const a = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new Y().decode(e, n);
    const A = r;
    [r, n] = new It(u).decode(e, n);
    const f = W(r), g = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: a,
      len: u,
      digest: A,
      data: f
    };
    return g.messageId = Ho.getMessageId(g), [g, n];
  }
}, $n = (e, t) => {
  const r = W(e), n = W(t);
  return ve(nt([r, n]));
}, VB = (e, t) => ({
  bits: $n(e, t)
}), Zs = class extends at {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  /**
   * @deprecated `ReceiptMintCoder.getAssetId` is deprecated and will be removed in future versions.
   * Use the helper function `getMintedAssetId` instead.
   */
  static getAssetId(e, t) {
    return $n(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.subId)), t.push(new Y().encode(e.contractId)), t.push(new M("u64").encode(e.val)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new Y().decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new M("u64").decode(e, n);
    const a = r;
    [r, n] = new M("u64").decode(e, n);
    const u = r, A = Zs.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: a,
      is: u,
      assetId: A
    }, n];
  }
}, id = class extends at {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  /**
   * @deprecated `ReceiptBurnCoder.getAssetId` is deprecated and will be removed in future versions.
   * Use the helper function `getMintedAssetId` instead.
   */
  static getAssetId(e, t) {
    return $n(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.subId)), t.push(new Y().encode(e.contractId)), t.push(new M("u64").encode(e.val)), t.push(new M("u64").encode(e.pc)), t.push(new M("u64").encode(e.is)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new Y().decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new M("u64").decode(e, n);
    const a = r;
    [r, n] = new M("u64").decode(e, n);
    const u = r, A = Zs.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: a,
      is: u,
      assetId: A
    }, n];
  }
}, HB = class extends at {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new J("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (e.type) {
      case 0: {
        t.push(new jc().encode(e));
        break;
      }
      case 1: {
        t.push(new Jc().encode(e));
        break;
      }
      case 2: {
        t.push(new qc().encode(e));
        break;
      }
      case 3: {
        t.push(new $c().encode(e));
        break;
      }
      case 4: {
        t.push(new Kc().encode(e));
        break;
      }
      case 5: {
        t.push(new td().encode(e));
        break;
      }
      case 6: {
        t.push(new ed().encode(e));
        break;
      }
      case 7: {
        t.push(new rd().encode(e));
        break;
      }
      case 8: {
        t.push(new nd().encode(e));
        break;
      }
      case 9: {
        t.push(new sd().encode(e));
        break;
      }
      case 10: {
        t.push(new Ho().encode(e));
        break;
      }
      case 11: {
        t.push(new Zs().encode(e));
        break;
      }
      case 12: {
        t.push(new id().encode(e));
        break;
      }
      default:
        throw new v(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${r}`);
    }
    return nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new jc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Jc().decode(e, n), [r, n];
      case 2:
        return [r, n] = new qc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new $c().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Kc().decode(e, n), [r, n];
      case 5:
        return [r, n] = new td().decode(e, n), [r, n];
      case 6:
        return [r, n] = new ed().decode(e, n), [r, n];
      case 7:
        return [r, n] = new rd().decode(e, n), [r, n];
      case 8:
        return [r, n] = new nd().decode(e, n), [r, n];
      case 9:
        return [r, n] = new sd().decode(e, n), [r, n];
      case 10:
        return [r, n] = new Ho().decode(e, n), [r, n];
      case 11:
        return [r, n] = new Zs().decode(e, n), [r, n];
      case 12:
        return [r, n] = new id().decode(e, n), [r, n];
      default:
        throw new v(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, od = class extends yi {
  constructor() {
    super("StorageSlot", {
      key: new Y(),
      value: new Y()
    });
  }
}, ke = /* @__PURE__ */ ((e) => (e[e.ConsensusParameters = 0] = "ConsensusParameters", e[e.StateTransition = 1] = "StateTransition", e))(ke || {}), ad = class extends at {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: r } = e;
    switch (t.push(new J("u8", { padToWordSize: !0 }).encode(r)), r) {
      case 0: {
        const n = e.data;
        t.push(new J("u16", { padToWordSize: !0 }).encode(n.witnessIndex)), t.push(new Y().encode(n.checksum));
        break;
      }
      case 1: {
        const n = e.data;
        t.push(new Y().encode(n.bytecodeRoot));
        break;
      }
      default:
        throw new v(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return nt(t);
  }
  decode(e, t) {
    let r = t, n;
    [n, r] = new J("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0: {
        [n, r] = new J("u16", { padToWordSize: !0 }).decode(e, r);
        const i = n;
        return [n, r] = new Y().decode(e, r), [{ type: s, data: { witnessIndex: i, checksum: n } }, r];
      }
      case 1:
        return [n, r] = new Y().decode(e, r), [{ type: s, data: { bytecodeRoot: n } }, r];
      default:
        throw new v(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, ir = class extends at {
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
    return t.push(new J("u32", { padToWordSize: !0 }).encode(e.dataLength)), t.push(new It(e.dataLength).encode(e.data)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    return [r, n] = new It(s).decode(e, n), [
      {
        dataLength: s,
        data: r
      },
      n
    ];
  }
}, vt = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e[e.Blob = 5] = "Blob", e))(vt || {}), cd = class extends at {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new M("u64").encode(e.scriptGasLimit)), t.push(new Y().encode(e.receiptsRoot)), t.push(new M("u64").encode(e.scriptLength)), t.push(new M("u64").encode(e.scriptDataLength)), t.push(new J("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new It(e.scriptLength.toNumber()).encode(e.script)), t.push(new It(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new sr().encode(e.policies)), t.push(new ft(new rr(), e.inputsCount).encode(e.inputs)), t.push(new ft(new nr(), e.outputsCount).encode(e.outputs)), t.push(new ft(new ir(), e.witnessesCount).encode(e.witnesses)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new M("u64").decode(e, n);
    const s = r;
    [r, n] = new Y().decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new M("u64").decode(e, n);
    const a = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new It(o.toNumber()).decode(e, n);
    const y = r;
    [r, n] = new It(a.toNumber()).decode(e, n);
    const R = r;
    [r, n] = new sr().decode(e, n, u);
    const Q = r;
    [r, n] = new ft(new rr(), A).decode(e, n);
    const S = r;
    [r, n] = new ft(new nr(), f).decode(e, n);
    const N = r;
    return [r, n] = new ft(new ir(), g).decode(e, n), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: a,
        policyTypes: u,
        inputsCount: A,
        outputsCount: f,
        witnessesCount: g,
        receiptsRoot: i,
        script: y,
        scriptData: R,
        policies: Q,
        inputs: S,
        outputs: N,
        witnesses: r
      },
      n
    ];
  }
}, dd = class extends at {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new Y().encode(e.salt)), t.push(new M("u64").encode(e.storageSlotsCount)), t.push(new J("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new ft(new od(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new sr().encode(e.policies)), t.push(new ft(new rr(), e.inputsCount).encode(e.inputs)), t.push(new ft(new nr(), e.outputsCount).encode(e.outputs)), t.push(new ft(new ir(), e.witnessesCount).encode(e.witnesses)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new Y().decode(e, n);
    const i = r;
    [r, n] = new M("u64").decode(e, n);
    const o = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new ft(new od(), o.toNumber()).decode(
      e,
      n
    );
    const g = r;
    [r, n] = new sr().decode(e, n, a);
    const y = r;
    [r, n] = new ft(new rr(), u).decode(e, n);
    const R = r;
    [r, n] = new ft(new nr(), A).decode(e, n);
    const Q = r;
    return [r, n] = new ft(new ir(), f).decode(e, n), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: a,
        storageSlotsCount: o,
        inputsCount: u,
        outputsCount: A,
        witnessesCount: f,
        salt: i,
        policies: y,
        storageSlots: g,
        inputs: R,
        outputs: Q,
        witnesses: r
      },
      n
    ];
  }
}, ud = class extends at {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Jr().encode(e.txPointer)), t.push(new Xs().encode(e.inputContract)), t.push(new Ws().encode(e.outputContract)), t.push(new M("u64").encode(e.mintAmount)), t.push(new Y().encode(e.mintAssetId)), t.push(new M("u64").encode(e.gasPrice)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Jr().decode(e, n);
    const s = r;
    [r, n] = new Xs().decode(e, n);
    const i = r;
    [r, n] = new Ws().decode(e, n);
    const o = r;
    [r, n] = new M("u64").decode(e, n);
    const a = r;
    [r, n] = new Y().decode(e, n);
    const u = r;
    return [r, n] = new M("u64").decode(e, n), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: a,
        mintAssetId: u,
        gasPrice: r
      },
      n
    ];
  }
}, _d = class extends at {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new ad().encode(e.upgradePurpose)), t.push(new J("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new sr().encode(e.policies)), t.push(new ft(new rr(), e.inputsCount).encode(e.inputs)), t.push(new ft(new nr(), e.outputsCount).encode(e.outputs)), t.push(new ft(new ir(), e.witnessesCount).encode(e.witnesses)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new ad().decode(e, n);
    const s = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new sr().decode(e, n, i);
    const A = r;
    [r, n] = new ft(new rr(), o).decode(e, n);
    const f = r;
    [r, n] = new ft(new nr(), a).decode(e, n);
    const g = r;
    return [r, n] = new ft(new ir(), u).decode(e, n), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: o,
        outputsCount: a,
        witnessesCount: u,
        policies: A,
        inputs: f,
        outputs: g,
        witnesses: r
      },
      n
    ];
  }
}, hd = class extends at {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.root)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.subsectionIndex)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.subsectionsNumber)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.proofSetCount)), t.push(new J("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new ft(new Y(), e.proofSetCount).encode(e.proofSet)), t.push(new sr().encode(e.policies)), t.push(new ft(new rr(), e.inputsCount).encode(e.inputs)), t.push(new ft(new nr(), e.outputsCount).encode(e.outputs)), t.push(new ft(new ir(), e.witnessesCount).encode(e.witnesses)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const y = r;
    [r, n] = new ft(new Y(), u).decode(e, n);
    const R = r;
    [r, n] = new sr().decode(e, n, A);
    const Q = r;
    [r, n] = new ft(new rr(), f).decode(e, n);
    const S = r;
    [r, n] = new ft(new nr(), g).decode(e, n);
    const N = r;
    return [r, n] = new ft(new ir(), y).decode(e, n), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: o,
        subsectionsNumber: a,
        proofSetCount: u,
        policyTypes: A,
        inputsCount: f,
        outputsCount: g,
        witnessesCount: y,
        proofSet: R,
        policies: Q,
        inputs: S,
        outputs: N,
        witnesses: r
      },
      n
    ];
  }
}, ld = class extends at {
  constructor() {
    super("TransactionBlob", "struct TransactionBlob", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Y().encode(e.blobId)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new J("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new sr().encode(e.policies)), t.push(new ft(new rr(), e.inputsCount).encode(e.inputs)), t.push(new ft(new nr(), e.outputsCount).encode(e.outputs)), t.push(new ft(new ir(), e.witnessesCount).encode(e.witnesses)), nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Y().decode(e, n);
    const s = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new sr().decode(e, n, o);
    const f = r;
    [r, n] = new ft(new rr(), a).decode(e, n);
    const g = r;
    [r, n] = new ft(new nr(), u).decode(e, n);
    const y = r;
    return [r, n] = new ft(new ir(), A).decode(e, n), [
      {
        type: 5,
        blobId: s,
        witnessIndex: i,
        policyTypes: o,
        inputsCount: a,
        outputsCount: u,
        witnessesCount: A,
        policies: f,
        inputs: g,
        outputs: y,
        witnesses: r
      },
      n
    ];
  }
}, Ar = class extends at {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new J("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new cd().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new dd().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new ud().encode(e));
        break;
      }
      case 3: {
        t.push(
          new _d().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new hd().encode(e)
        );
        break;
      }
      case 5: {
        t.push(new ld().encode(e));
        break;
      }
      default:
        throw new v(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return nt(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new cd().decode(e, n), [r, n];
      case 1:
        return [r, n] = new dd().decode(e, n), [r, n];
      case 2:
        return [r, n] = new ud().decode(e, n), [r, n];
      case 3:
        return [r, n] = new _d().decode(e, n), [r, n];
      case 4:
        return [r, n] = new hd().decode(e, n), [r, n];
      case 5:
        return [r, n] = new ld().decode(e, n), [r, n];
      default:
        throw new v(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, YB = class extends yi {
  constructor() {
    super("UtxoId", {
      transactionId: new Y(),
      outputIndex: new J("u16", { padToWordSize: !0 })
    });
  }
};
function Ew(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function ll(e) {
  return function t(r) {
    return arguments.length === 0 || Ew(r) ? t : e.apply(this, arguments);
  };
}
var vw = /* @__PURE__ */ ll(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Cw(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function Al(e, t, r) {
  if (r || (r = new xw()), Bw(e))
    return e;
  var n = function(i) {
    var o = r.get(e);
    if (o)
      return o;
    r.set(e, i);
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) && (i[a] = Al(e[a], !0, r));
    return i;
  };
  switch (vw(e)) {
    case "Object":
      return n(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return n(Array(e.length));
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Cw(e);
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
function Bw(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var xw = /* @__PURE__ */ function() {
  function e() {
    this.map = {}, this.length = 0;
  }
  return e.prototype.set = function(t, r) {
    var n = this.hash(t), s = this.map[n];
    s || (this.map[n] = s = []), s.push([t, r]), this.length += 1;
  }, e.prototype.hash = function(t) {
    var r = [];
    for (var n in t)
      r.push(Object.prototype.toString.call(t[n]));
    return r.join();
  }, e.prototype.get = function(t) {
    if (this.length <= 180) {
      for (var r in this.map)
        for (var o = this.map[r], n = 0; n < o.length; n += 1) {
          var s = o[n];
          if (s[0] === t)
            return s[1];
        }
      return;
    }
    var i = this.hash(t), o = this.map[i];
    if (o)
      for (var n = 0; n < o.length; n += 1) {
        var s = o[n];
        if (s[0] === t)
          return s[1];
      }
  }, e;
}(), Ce = /* @__PURE__ */ ll(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : Al(t);
});
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const La = /* @__PURE__ */ BigInt(0), bi = /* @__PURE__ */ BigInt(1), Rw = /* @__PURE__ */ BigInt(2);
function qr(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function _s(e) {
  if (!qr(e))
    throw new Error("Uint8Array expected");
}
function In(e, t) {
  if (typeof t != "boolean")
    throw new Error(`${e} must be valid boolean, got "${t}".`);
}
const Sw = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function En(e) {
  _s(e);
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += Sw[e[r]];
  return t;
}
function dn(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Pa(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const ar = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Ad(e) {
  if (e >= ar._0 && e <= ar._9)
    return e - ar._0;
  if (e >= ar._A && e <= ar._F)
    return e - (ar._A - 10);
  if (e >= ar._a && e <= ar._f)
    return e - (ar._a - 10);
}
function vn(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, r = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(r);
  for (let s = 0, i = 0; s < r; s++, i += 2) {
    const o = Ad(e.charCodeAt(i)), a = Ad(e.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const u = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + u + '" at index ' + i);
    }
    n[s] = o * 16 + a;
  }
  return n;
}
function Zr(e) {
  return Pa(En(e));
}
function ka(e) {
  return _s(e), Pa(En(Uint8Array.from(e).reverse()));
}
function Cn(e, t) {
  return vn(e.toString(16).padStart(t * 2, "0"));
}
function Ua(e, t) {
  return Cn(e, t).reverse();
}
function Tw(e) {
  return vn(dn(e));
}
function We(e, t, r) {
  let n;
  if (typeof t == "string")
    try {
      n = vn(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (qr(t))
    n = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = n.length;
  if (typeof r == "number" && s !== r)
    throw new Error(`${e} expected ${r} bytes, got ${s}`);
  return n;
}
function Kn(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    _s(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
function pl(e, t) {
  if (e.length !== t.length)
    return !1;
  let r = 0;
  for (let n = 0; n < e.length; n++)
    r |= e[n] ^ t[n];
  return r === 0;
}
function Nw(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
const ro = (e) => typeof e == "bigint" && La <= e;
function Ii(e, t, r) {
  return ro(e) && ro(t) && ro(r) && t <= e && e < r;
}
function jr(e, t, r, n) {
  if (!Ii(t, r, n))
    throw new Error(`expected valid ${e}: ${r} <= n < ${n}, got ${typeof t} ${t}`);
}
function fl(e) {
  let t;
  for (t = 0; e > La; e >>= bi, t += 1)
    ;
  return t;
}
function Dw(e, t) {
  return e >> BigInt(t) & bi;
}
function Qw(e, t, r) {
  return e | (r ? bi : La) << BigInt(t);
}
const za = (e) => (Rw << BigInt(e - 1)) - bi, no = (e) => new Uint8Array(e), pd = (e) => Uint8Array.from(e);
function gl(e, t, r) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof r != "function")
    throw new Error("hmacFn must be a function");
  let n = no(e), s = no(e), i = 0;
  const o = () => {
    n.fill(1), s.fill(0), i = 0;
  }, a = (...g) => r(s, n, ...g), u = (g = no()) => {
    s = a(pd([0]), g), n = a(), g.length !== 0 && (s = a(pd([1]), g), n = a());
  }, A = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let g = 0;
    const y = [];
    for (; g < t; ) {
      n = a();
      const R = n.slice();
      y.push(R), g += n.length;
    }
    return Kn(...y);
  };
  return (g, y) => {
    o(), u(g);
    let R;
    for (; !(R = y(A())); )
      u();
    return o(), R;
  };
}
const Fw = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || qr(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function hs(e, t, r = {}) {
  const n = (s, i, o) => {
    const a = Fw[i];
    if (typeof a != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const u = e[s];
    if (!(o && u === void 0) && !a(u, e))
      throw new Error(`Invalid param ${String(s)}=${u} (${typeof u}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    n(s, i, !1);
  for (const [s, i] of Object.entries(r))
    n(s, i, !0);
  return e;
}
const Ow = () => {
  throw new Error("not implemented");
};
function Yo(e) {
  const t = /* @__PURE__ */ new WeakMap();
  return (r, ...n) => {
    const s = t.get(r);
    if (s !== void 0)
      return s;
    const i = e(r, ...n);
    return t.set(r, i), i;
  };
}
const Mw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: jr,
  abool: In,
  abytes: _s,
  bitGet: Dw,
  bitLen: fl,
  bitMask: za,
  bitSet: Qw,
  bytesToHex: En,
  bytesToNumberBE: Zr,
  bytesToNumberLE: ka,
  concatBytes: Kn,
  createHmacDrbg: gl,
  ensureBytes: We,
  equalBytes: pl,
  hexToBytes: vn,
  hexToNumber: Pa,
  inRange: Ii,
  isBytes: qr,
  memoized: Yo,
  notImplemented: Ow,
  numberToBytesBE: Cn,
  numberToBytesLE: Ua,
  numberToHexUnpadded: dn,
  numberToVarBytesBE: Tw,
  utf8ToBytes: Nw,
  validateObject: hs
}, Symbol.toStringTag, { value: "Module" })), Ga = JSON, Lw = (e) => e.toUpperCase(), Pw = (e) => {
  const t = {};
  return e.forEach((r, n) => {
    t[n] = r;
  }), t;
}, kw = (e, t, r) => e.document ? e : {
  document: e,
  variables: t,
  requestHeaders: r,
  signal: void 0
}, Uw = (e, t, r) => e.query ? e : {
  query: e,
  variables: t,
  requestHeaders: r,
  signal: void 0
}, zw = (e, t) => e.documents ? e : {
  documents: e,
  requestHeaders: t,
  signal: void 0
};
function Ds(e, t) {
  if (!!!e)
    throw new Error(t);
}
function Gw(e) {
  return typeof e == "object" && e !== null;
}
function Vw(e, t) {
  if (!!!e)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const Hw = /\r\n|[\n\r]/g;
function Xo(e, t) {
  let r = 0, n = 1;
  for (const s of e.body.matchAll(Hw)) {
    if (typeof s.index == "number" || Vw(!1), s.index >= t)
      break;
    r = s.index + s[0].length, n += 1;
  }
  return {
    line: n,
    column: t + 1 - r
  };
}
function Yw(e) {
  return wl(
    e.source,
    Xo(e.source, e.start)
  );
}
function wl(e, t) {
  const r = e.locationOffset.column - 1, n = "".padStart(r) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, a = t.line === 1 ? r : 0, u = t.column + a, A = `${e.name}:${o}:${u}
`, f = n.split(/\r\n|[\n\r]/g), g = f[s];
  if (g.length > 120) {
    const y = Math.floor(u / 80), R = u % 80, Q = [];
    for (let S = 0; S < g.length; S += 80)
      Q.push(g.slice(S, S + 80));
    return A + fd([
      [`${o} |`, Q[0]],
      ...Q.slice(1, y + 1).map((S) => ["|", S]),
      ["|", "^".padStart(R)],
      ["|", Q[y + 1]]
    ]);
  }
  return A + fd([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, f[s - 1]],
    [`${o} |`, g],
    ["|", "^".padStart(u)],
    [`${o + 1} |`, f[s + 1]]
  ]);
}
function fd(e) {
  const t = e.filter(([n, s]) => s !== void 0), r = Math.max(...t.map(([n]) => n.length));
  return t.map(([n, s]) => n.padStart(r) + (s ? " " + s : "")).join(`
`);
}
function Xw(e) {
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
class Va extends Error {
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
  constructor(t, ...r) {
    var n, s, i;
    const { nodes: o, source: a, positions: u, path: A, originalError: f, extensions: g } = Xw(r);
    super(t), this.name = "GraphQLError", this.path = A ?? void 0, this.originalError = f ?? void 0, this.nodes = gd(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const y = gd(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((Q) => Q.loc).filter((Q) => Q != null)
    );
    this.source = a ?? (y == null || (s = y[0]) === null || s === void 0 ? void 0 : s.source), this.positions = u ?? (y == null ? void 0 : y.map((Q) => Q.start)), this.locations = u && a ? u.map((Q) => Xo(a, Q)) : y == null ? void 0 : y.map((Q) => Xo(Q.source, Q.start));
    const R = Gw(
      f == null ? void 0 : f.extensions
    ) ? f == null ? void 0 : f.extensions : void 0;
    this.extensions = (i = g ?? R) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), f != null && f.stack ? Object.defineProperty(this, "stack", {
      value: f.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Va) : Object.defineProperty(this, "stack", {
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
      for (const r of this.nodes)
        r.loc && (t += `

` + Yw(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        t += `

` + wl(this.source, r);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function gd(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function we(e, t, r) {
  return new Va(`Syntax Error: ${r}`, {
    source: e,
    positions: [t]
  });
}
class Ww {
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
  constructor(t, r, n) {
    this.start = t.start, this.end = r.end, this.startToken = t, this.endToken = r, this.source = n;
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
class ml {
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
  constructor(t, r, n, s, i, o) {
    this.kind = t, this.start = r, this.end = n, this.line = s, this.column = i, this.value = o, this.prev = null, this.next = null;
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
const yl = {
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
}, Zw = new Set(Object.keys(yl));
function wd(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Zw.has(t);
}
var un;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(un || (un = {}));
var Wo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Wo || (Wo = {}));
var ct;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ct || (ct = {}));
function Zo(e) {
  return e === 9 || e === 32;
}
function ts(e) {
  return e >= 48 && e <= 57;
}
function bl(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Il(e) {
  return bl(e) || e === 95;
}
function jw(e) {
  return bl(e) || ts(e) || e === 95;
}
function Jw(e) {
  var t;
  let r = Number.MAX_SAFE_INTEGER, n = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const a = e[o], u = qw(a);
    u !== a.length && (n = (i = n) !== null && i !== void 0 ? i : o, s = o, o !== 0 && u < r && (r = u));
  }
  return e.map((o, a) => a === 0 ? o : o.slice(r)).slice(
    (t = n) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function qw(e) {
  let t = 0;
  for (; t < e.length && Zo(e.charCodeAt(t)); )
    ++t;
  return t;
}
function $w(e, t) {
  const r = e.replace(/"""/g, '\\"""'), n = r.split(/\r\n|[\n\r]/g), s = n.length === 1, i = n.length > 1 && n.slice(1).every((R) => R.length === 0 || Zo(R.charCodeAt(0))), o = r.endsWith('\\"""'), a = e.endsWith('"') && !o, u = e.endsWith("\\"), A = a || u, f = (
    // add leading and trailing new lines only if it improves readability
    !s || e.length > 70 || A || i || o
  );
  let g = "";
  const y = s && Zo(e.charCodeAt(0));
  return (f && !y || i) && (g += `
`), g += r, (f || A) && (g += `
`), '"""' + g + '"""';
}
var H;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(H || (H = {}));
class Kw {
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
    const r = new ml(H.SOF, 0, 0, 0, 0);
    this.source = t, this.lastToken = r, this.token = r, this.line = 1, this.lineStart = 0;
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
    if (t.kind !== H.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const r = e0(this, t.end);
          t.next = r, r.prev = t, t = r;
        }
      while (t.kind === H.COMMENT);
    return t;
  }
}
function t0(e) {
  return e === H.BANG || e === H.DOLLAR || e === H.AMP || e === H.PAREN_L || e === H.PAREN_R || e === H.SPREAD || e === H.COLON || e === H.EQUALS || e === H.AT || e === H.BRACKET_L || e === H.BRACKET_R || e === H.BRACE_L || e === H.PIPE || e === H.BRACE_R;
}
function Sn(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Ei(e, t) {
  return El(e.charCodeAt(t)) && vl(e.charCodeAt(t + 1));
}
function El(e) {
  return e >= 55296 && e <= 56319;
}
function vl(e) {
  return e >= 56320 && e <= 57343;
}
function $r(e, t) {
  const r = e.source.body.codePointAt(t);
  if (r === void 0)
    return H.EOF;
  if (r >= 32 && r <= 126) {
    const n = String.fromCodePoint(r);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function fe(e, t, r, n, s) {
  const i = e.line, o = 1 + r - e.lineStart;
  return new ml(t, r, n, i, o, s);
}
function e0(e, t) {
  const r = e.source.body, n = r.length;
  let s = t;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
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
        r.charCodeAt(s + 1) === 10 ? s += 2 : ++s, ++e.line, e.lineStart = s;
        continue;
      case 35:
        return r0(e, s);
      case 33:
        return fe(e, H.BANG, s, s + 1);
      case 36:
        return fe(e, H.DOLLAR, s, s + 1);
      case 38:
        return fe(e, H.AMP, s, s + 1);
      case 40:
        return fe(e, H.PAREN_L, s, s + 1);
      case 41:
        return fe(e, H.PAREN_R, s, s + 1);
      case 46:
        if (r.charCodeAt(s + 1) === 46 && r.charCodeAt(s + 2) === 46)
          return fe(e, H.SPREAD, s, s + 3);
        break;
      case 58:
        return fe(e, H.COLON, s, s + 1);
      case 61:
        return fe(e, H.EQUALS, s, s + 1);
      case 64:
        return fe(e, H.AT, s, s + 1);
      case 91:
        return fe(e, H.BRACKET_L, s, s + 1);
      case 93:
        return fe(e, H.BRACKET_R, s, s + 1);
      case 123:
        return fe(e, H.BRACE_L, s, s + 1);
      case 124:
        return fe(e, H.PIPE, s, s + 1);
      case 125:
        return fe(e, H.BRACE_R, s, s + 1);
      case 34:
        return r.charCodeAt(s + 1) === 34 && r.charCodeAt(s + 2) === 34 ? c0(e, s) : s0(e, s);
    }
    if (ts(i) || i === 45)
      return n0(e, s, i);
    if (Il(i))
      return d0(e, s);
    throw we(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Sn(i) || Ei(r, s) ? `Unexpected character: ${$r(e, s)}.` : `Invalid character: ${$r(e, s)}.`
    );
  }
  return fe(e, H.EOF, n, n);
}
function r0(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (Sn(i))
      ++s;
    else if (Ei(r, s))
      s += 2;
    else
      break;
  }
  return fe(
    e,
    H.COMMENT,
    t,
    s,
    r.slice(t + 1, s)
  );
}
function n0(e, t, r) {
  const n = e.source.body;
  let s = t, i = r, o = !1;
  if (i === 45 && (i = n.charCodeAt(++s)), i === 48) {
    if (i = n.charCodeAt(++s), ts(i))
      throw we(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${$r(
          e,
          s
        )}.`
      );
  } else
    s = so(e, s, i), i = n.charCodeAt(s);
  if (i === 46 && (o = !0, i = n.charCodeAt(++s), s = so(e, s, i), i = n.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = n.charCodeAt(++s), (i === 43 || i === 45) && (i = n.charCodeAt(++s)), s = so(e, s, i), i = n.charCodeAt(s)), i === 46 || Il(i))
    throw we(
      e.source,
      s,
      `Invalid number, expected digit but got: ${$r(
        e,
        s
      )}.`
    );
  return fe(
    e,
    o ? H.FLOAT : H.INT,
    t,
    s,
    n.slice(t, s)
  );
}
function so(e, t, r) {
  if (!ts(r))
    throw we(
      e.source,
      t,
      `Invalid number, expected digit but got: ${$r(
        e,
        t
      )}.`
    );
  const n = e.source.body;
  let s = t + 1;
  for (; ts(n.charCodeAt(s)); )
    ++s;
  return s;
}
function s0(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1, i = s, o = "";
  for (; s < n; ) {
    const a = r.charCodeAt(s);
    if (a === 34)
      return o += r.slice(i, s), fe(e, H.STRING, t, s + 1, o);
    if (a === 92) {
      o += r.slice(i, s);
      const u = r.charCodeAt(s + 1) === 117 ? r.charCodeAt(s + 2) === 123 ? i0(e, s) : o0(e, s) : a0(e, s);
      o += u.value, s += u.size, i = s;
      continue;
    }
    if (a === 10 || a === 13)
      break;
    if (Sn(a))
      ++s;
    else if (Ei(r, s))
      s += 2;
    else
      throw we(
        e.source,
        s,
        `Invalid character within String: ${$r(
          e,
          s
        )}.`
      );
  }
  throw we(e.source, s, "Unterminated string.");
}
function i0(e, t) {
  const r = e.source.body;
  let n = 0, s = 3;
  for (; s < 12; ) {
    const i = r.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !Sn(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: s
      };
    }
    if (n = n << 4 | Gn(i), n < 0)
      break;
  }
  throw we(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${r.slice(
      t,
      t + s
    )}".`
  );
}
function o0(e, t) {
  const r = e.source.body, n = md(r, t + 2);
  if (Sn(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (El(n) && r.charCodeAt(t + 6) === 92 && r.charCodeAt(t + 7) === 117) {
    const s = md(r, t + 8);
    if (vl(s))
      return {
        value: String.fromCodePoint(n, s),
        size: 12
      };
  }
  throw we(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${r.slice(t, t + 6)}".`
  );
}
function md(e, t) {
  return Gn(e.charCodeAt(t)) << 12 | Gn(e.charCodeAt(t + 1)) << 8 | Gn(e.charCodeAt(t + 2)) << 4 | Gn(e.charCodeAt(t + 3));
}
function Gn(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function a0(e, t) {
  const r = e.source.body;
  switch (r.charCodeAt(t + 1)) {
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
  throw we(
    e.source,
    t,
    `Invalid character escape sequence: "${r.slice(
      t,
      t + 2
    )}".`
  );
}
function c0(e, t) {
  const r = e.source.body, n = r.length;
  let s = e.lineStart, i = t + 3, o = i, a = "";
  const u = [];
  for (; i < n; ) {
    const A = r.charCodeAt(i);
    if (A === 34 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34) {
      a += r.slice(o, i), u.push(a);
      const f = fe(
        e,
        H.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Jw(u).join(`
`)
      );
      return e.line += u.length - 1, e.lineStart = s, f;
    }
    if (A === 92 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34 && r.charCodeAt(i + 3) === 34) {
      a += r.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (A === 10 || A === 13) {
      a += r.slice(o, i), u.push(a), A === 13 && r.charCodeAt(i + 1) === 10 ? i += 2 : ++i, a = "", o = i, s = i;
      continue;
    }
    if (Sn(A))
      ++i;
    else if (Ei(r, i))
      i += 2;
    else
      throw we(
        e.source,
        i,
        `Invalid character within String: ${$r(
          e,
          i
        )}.`
      );
  }
  throw we(e.source, i, "Unterminated string.");
}
function d0(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (jw(i))
      ++s;
    else
      break;
  }
  return fe(
    e,
    H.NAME,
    t,
    s,
    r.slice(t, s)
  );
}
const u0 = 10, Cl = 2;
function Ha(e) {
  return vi(e, []);
}
function vi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return _0(e, t);
    default:
      return String(e);
  }
}
function _0(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const r = [...t, e];
  if (h0(e)) {
    const n = e.toJSON();
    if (n !== e)
      return typeof n == "string" ? n : vi(n, r);
  } else if (Array.isArray(e))
    return A0(e, r);
  return l0(e, r);
}
function h0(e) {
  return typeof e.toJSON == "function";
}
function l0(e, t) {
  const r = Object.entries(e);
  return r.length === 0 ? "{}" : t.length > Cl ? "[" + p0(e) + "]" : "{ " + r.map(
    ([s, i]) => s + ": " + vi(i, t)
  ).join(", ") + " }";
}
function A0(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > Cl)
    return "[Array]";
  const r = Math.min(u0, e.length), n = e.length - r, s = [];
  for (let i = 0; i < r; ++i)
    s.push(vi(e[i], t));
  return n === 1 ? s.push("... 1 more item") : n > 1 && s.push(`... ${n} more items`), "[" + s.join(", ") + "]";
}
function p0(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const r = e.constructor.name;
    if (typeof r == "string" && r !== "")
      return r;
  }
  return t;
}
const f0 = globalThis.process && // eslint-disable-next-line no-undef
!0, g0 = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  f0 ? function(t, r) {
    return t instanceof r;
  } : function(t, r) {
    if (t instanceof r)
      return !0;
    if (typeof t == "object" && t !== null) {
      var n;
      const s = r.prototype[Symbol.toStringTag], i = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in t ? t[Symbol.toStringTag] : (n = t.constructor) === null || n === void 0 ? void 0 : n.name
      );
      if (s === i) {
        const o = Ha(t);
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
class Bl {
  constructor(t, r = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Ds(!1, `Body must be a string. Received: ${Ha(t)}.`), this.body = t, this.name = r, this.locationOffset = n, this.locationOffset.line > 0 || Ds(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Ds(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function w0(e) {
  return g0(e, Bl);
}
function xl(e, t) {
  return new m0(e, t).parseDocument();
}
class m0 {
  constructor(t, r = {}) {
    const n = w0(t) ? t : new Bl(t);
    this._lexer = new Kw(n), this._options = r, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(H.NAME);
    return this.node(t, {
      kind: ct.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: ct.DOCUMENT,
      definitions: this.many(
        H.SOF,
        this.parseDefinition,
        H.EOF
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
    if (this.peek(H.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), r = t ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === H.NAME) {
      switch (r.value) {
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
        throw we(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (r.value) {
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
    throw this.unexpected(r);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const t = this._lexer.token;
    if (this.peek(H.BRACE_L))
      return this.node(t, {
        kind: ct.OPERATION_DEFINITION,
        operation: un.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let n;
    return this.peek(H.NAME) && (n = this.parseName()), this.node(t, {
      kind: ct.OPERATION_DEFINITION,
      operation: r,
      name: n,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const t = this.expectToken(H.NAME);
    switch (t.value) {
      case "query":
        return un.QUERY;
      case "mutation":
        return un.MUTATION;
      case "subscription":
        return un.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      H.PAREN_L,
      this.parseVariableDefinition,
      H.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ct.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(H.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(H.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(H.DOLLAR), this.node(t, {
      kind: ct.VARIABLE,
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
      kind: ct.SELECTION_SET,
      selections: this.many(
        H.BRACE_L,
        this.parseSelection,
        H.BRACE_R
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
    return this.peek(H.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, r = this.parseName();
    let n, s;
    return this.expectOptionalToken(H.COLON) ? (n = r, s = this.parseName()) : s = r, this.node(t, {
      kind: ct.FIELD,
      alias: n,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(H.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const r = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(H.PAREN_L, r, H.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(H.COLON), this.node(r, {
      kind: ct.ARGUMENT,
      name: n,
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
    this.expectToken(H.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(H.NAME) ? this.node(t, {
      kind: ct.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: ct.INLINE_FRAGMENT,
      typeCondition: r ? this.parseNamedType() : void 0,
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
      kind: ct.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: ct.FRAGMENT_DEFINITION,
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
    const r = this._lexer.token;
    switch (r.kind) {
      case H.BRACKET_L:
        return this.parseList(t);
      case H.BRACE_L:
        return this.parseObject(t);
      case H.INT:
        return this.advanceLexer(), this.node(r, {
          kind: ct.INT,
          value: r.value
        });
      case H.FLOAT:
        return this.advanceLexer(), this.node(r, {
          kind: ct.FLOAT,
          value: r.value
        });
      case H.STRING:
      case H.BLOCK_STRING:
        return this.parseStringLiteral();
      case H.NAME:
        switch (this.advanceLexer(), r.value) {
          case "true":
            return this.node(r, {
              kind: ct.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(r, {
              kind: ct.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(r, {
              kind: ct.NULL
            });
          default:
            return this.node(r, {
              kind: ct.ENUM,
              value: r.value
            });
        }
      case H.DOLLAR:
        if (t)
          if (this.expectToken(H.DOLLAR), this._lexer.token.kind === H.NAME) {
            const n = this._lexer.token.value;
            throw we(
              this._lexer.source,
              r.start,
              `Unexpected variable "$${n}" in constant value.`
            );
          } else
            throw this.unexpected(r);
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
      kind: ct.STRING,
      value: t.value,
      block: t.kind === H.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(t) {
    const r = () => this.parseValueLiteral(t);
    return this.node(this._lexer.token, {
      kind: ct.LIST,
      values: this.any(H.BRACKET_L, r, H.BRACKET_R)
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
    const r = () => this.parseObjectField(t);
    return this.node(this._lexer.token, {
      kind: ct.OBJECT,
      fields: this.any(H.BRACE_L, r, H.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(H.COLON), this.node(r, {
      kind: ct.OBJECT_FIELD,
      name: n,
      value: this.parseValueLiteral(t)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(t) {
    const r = [];
    for (; this.peek(H.AT); )
      r.push(this.parseDirective(t));
    return r;
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
    const r = this._lexer.token;
    return this.expectToken(H.AT), this.node(r, {
      kind: ct.DIRECTIVE,
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
    let r;
    if (this.expectOptionalToken(H.BRACKET_L)) {
      const n = this.parseTypeReference();
      this.expectToken(H.BRACKET_R), r = this.node(t, {
        kind: ct.LIST_TYPE,
        type: n
      });
    } else
      r = this.parseNamedType();
    return this.expectOptionalToken(H.BANG) ? this.node(t, {
      kind: ct.NON_NULL_TYPE,
      type: r
    }) : r;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: ct.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(H.STRING) || this.peek(H.BLOCK_STRING);
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("schema");
    const n = this.parseConstDirectives(), s = this.many(
      H.BRACE_L,
      this.parseOperationTypeDefinition,
      H.BRACE_R
    );
    return this.node(t, {
      kind: ct.SCHEMA_DEFINITION,
      description: r,
      directives: n,
      operationTypes: s
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const t = this._lexer.token, r = this.parseOperationType();
    this.expectToken(H.COLON);
    const n = this.parseNamedType();
    return this.node(t, {
      kind: ct.OPERATION_TYPE_DEFINITION,
      operation: r,
      type: n
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("scalar");
    const n = this.parseName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: ct.SCALAR_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: s
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("type");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    return this.node(t, {
      kind: ct.OBJECT_TYPE_DEFINITION,
      description: r,
      name: n,
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(H.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      H.BRACE_L,
      this.parseFieldDefinition,
      H.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(H.COLON);
    const i = this.parseTypeReference(), o = this.parseConstDirectives();
    return this.node(t, {
      kind: ct.FIELD_DEFINITION,
      description: r,
      name: n,
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
      H.PAREN_L,
      this.parseInputValueDef,
      H.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseName();
    this.expectToken(H.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(H.EQUALS) && (i = this.parseConstValueLiteral());
    const o = this.parseConstDirectives();
    return this.node(t, {
      kind: ct.INPUT_VALUE_DEFINITION,
      description: r,
      name: n,
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("interface");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    return this.node(t, {
      kind: ct.INTERFACE_TYPE_DEFINITION,
      description: r,
      name: n,
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("union");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    return this.node(t, {
      kind: ct.UNION_TYPE_DEFINITION,
      description: r,
      name: n,
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
    return this.expectOptionalToken(H.EQUALS) ? this.delimitedMany(H.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("enum");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    return this.node(t, {
      kind: ct.ENUM_TYPE_DEFINITION,
      description: r,
      name: n,
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
      H.BRACE_L,
      this.parseEnumValueDefinition,
      H.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseEnumValueName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: ct.ENUM_VALUE_DEFINITION,
      description: r,
      name: n,
      directives: s
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw we(
        this._lexer.source,
        this._lexer.token.start,
        `${Es(
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("input");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    return this.node(t, {
      kind: ct.INPUT_OBJECT_TYPE_DEFINITION,
      description: r,
      name: n,
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
      H.BRACE_L,
      this.parseInputValueDef,
      H.BRACE_R
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
    if (t.kind === H.NAME)
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
    const r = this.parseConstDirectives(), n = this.optionalMany(
      H.BRACE_L,
      this.parseOperationTypeDefinition,
      H.BRACE_R
    );
    if (r.length === 0 && n.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.SCHEMA_EXTENSION,
      directives: r,
      operationTypes: n
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const r = this.parseName(), n = this.parseConstDirectives();
    if (n.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.SCALAR_TYPE_EXTENSION,
      name: r,
      directives: n
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
    const r = this.parseName(), n = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (n.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.OBJECT_TYPE_EXTENSION,
      name: r,
      interfaces: n,
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
    const r = this.parseName(), n = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (n.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.INTERFACE_TYPE_EXTENSION,
      name: r,
      interfaces: n,
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
    const r = this.parseName(), n = this.parseConstDirectives(), s = this.parseUnionMemberTypes();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.UNION_TYPE_EXTENSION,
      name: r,
      directives: n,
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
    const r = this.parseName(), n = this.parseConstDirectives(), s = this.parseEnumValuesDefinition();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.ENUM_TYPE_EXTENSION,
      name: r,
      directives: n,
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
    const r = this.parseName(), n = this.parseConstDirectives(), s = this.parseInputFieldsDefinition();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.INPUT_OBJECT_TYPE_EXTENSION,
      name: r,
      directives: n,
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(H.AT);
    const n = this.parseName(), s = this.parseArgumentDefs(), i = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const o = this.parseDirectiveLocations();
    return this.node(t, {
      kind: ct.DIRECTIVE_DEFINITION,
      description: r,
      name: n,
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
    return this.delimitedMany(H.PIPE, this.parseDirectiveLocation);
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
    const t = this._lexer.token, r = this.parseName();
    if (Object.prototype.hasOwnProperty.call(Wo, r.value))
      return r;
    throw this.unexpected(t);
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(t, r) {
    return this._options.noLocation !== !0 && (r.loc = new Ww(
      t,
      this._lexer.lastToken,
      this._lexer.source
    )), r;
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
    const r = this._lexer.token;
    if (r.kind === t)
      return this.advanceLexer(), r;
    throw we(
      this._lexer.source,
      r.start,
      `Expected ${Rl(t)}, found ${Es(r)}.`
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
    const r = this._lexer.token;
    if (r.kind === H.NAME && r.value === t)
      this.advanceLexer();
    else
      throw we(
        this._lexer.source,
        r.start,
        `Expected "${t}", found ${Es(r)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const r = this._lexer.token;
    return r.kind === H.NAME && r.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const r = t ?? this._lexer.token;
    return we(
      this._lexer.source,
      r.start,
      `Unexpected ${Es(r)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(t, r, n) {
    this.expectToken(t);
    const s = [];
    for (; !this.expectOptionalToken(n); )
      s.push(r.call(this));
    return s;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(t, r, n) {
    if (this.expectOptionalToken(t)) {
      const s = [];
      do
        s.push(r.call(this));
      while (!this.expectOptionalToken(n));
      return s;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(t, r, n) {
    this.expectToken(t);
    const s = [];
    do
      s.push(r.call(this));
    while (!this.expectOptionalToken(n));
    return s;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(t, r) {
    this.expectOptionalToken(t);
    const n = [];
    do
      n.push(r.call(this));
    while (this.expectOptionalToken(t));
    return n;
  }
  advanceLexer() {
    const { maxTokens: t } = this._options, r = this._lexer.advance();
    if (t !== void 0 && r.kind !== H.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw we(
        this._lexer.source,
        r.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function Es(e) {
  const t = e.value;
  return Rl(e.kind) + (t != null ? ` "${t}"` : "");
}
function Rl(e) {
  return t0(e) ? `"${e}"` : e;
}
function y0(e) {
  return `"${e.replace(b0, I0)}"`;
}
const b0 = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function I0(e) {
  return E0[e.charCodeAt(0)];
}
const E0 = [
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
], v0 = Object.freeze({});
function C0(e, t, r = yl) {
  const n = /* @__PURE__ */ new Map();
  for (const O of Object.values(ct))
    n.set(O, B0(t, O));
  let s, i = Array.isArray(e), o = [e], a = -1, u = [], A = e, f, g;
  const y = [], R = [];
  do {
    a++;
    const O = a === o.length, G = O && u.length !== 0;
    if (O) {
      if (f = R.length === 0 ? void 0 : y[y.length - 1], A = g, g = R.pop(), G)
        if (i) {
          A = A.slice();
          let z = 0;
          for (const [P, Z] of u) {
            const j = P - z;
            Z === null ? (A.splice(j, 1), z++) : A[j] = Z;
          }
        } else {
          A = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(A)
          );
          for (const [z, P] of u)
            A[z] = P;
        }
      a = s.index, o = s.keys, u = s.edits, i = s.inArray, s = s.prev;
    } else if (g) {
      if (f = i ? a : o[a], A = g[f], A == null)
        continue;
      y.push(f);
    }
    let L;
    if (!Array.isArray(A)) {
      var Q, S;
      wd(A) || Ds(!1, `Invalid AST Node: ${Ha(A)}.`);
      const z = O ? (Q = n.get(A.kind)) === null || Q === void 0 ? void 0 : Q.leave : (S = n.get(A.kind)) === null || S === void 0 ? void 0 : S.enter;
      if (L = z == null ? void 0 : z.call(t, A, f, g, y, R), L === v0)
        break;
      if (L === !1) {
        if (!O) {
          y.pop();
          continue;
        }
      } else if (L !== void 0 && (u.push([f, L]), !O))
        if (wd(L))
          A = L;
        else {
          y.pop();
          continue;
        }
    }
    if (L === void 0 && G && u.push([f, A]), O)
      y.pop();
    else {
      var N;
      s = {
        inArray: i,
        index: a,
        keys: o,
        edits: u,
        prev: s
      }, i = Array.isArray(A), o = i ? A : (N = r[A.kind]) !== null && N !== void 0 ? N : [], a = -1, u = [], g && R.push(g), g = A;
    }
  } while (s !== void 0);
  return u.length !== 0 ? u[u.length - 1][1] : e;
}
function B0(e, t) {
  const r = e[t];
  return typeof r == "object" ? r : typeof r == "function" ? {
    enter: r,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function Sl(e) {
  return C0(e, R0);
}
const x0 = 80, R0 = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => st(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = gt("(", st(e.variableDefinitions, ", "), ")"), r = st(
        [
          e.operation,
          st([e.name, t]),
          st(e.directives, " ")
        ],
        " "
      );
      return (r === "query" ? "" : r + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: r, directives: n }) => e + ": " + t + gt(" = ", r) + gt(" ", st(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => He(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: r, directives: n, selectionSet: s }) {
      const i = gt("", e, ": ") + t;
      let o = i + gt("(", st(r, ", "), ")");
      return o.length > x0 && (o = i + gt(`(
`, Qs(st(r, `
`)), `
)`)), st([o, st(n, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + gt(" ", st(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: r }) => st(
      [
        "...",
        gt("on ", e),
        st(t, " "),
        r
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: r, directives: n, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${gt("(", st(r, ", "), ")")} on ${t} ${gt("", st(n, " "), " ")}` + s
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
    leave: ({ value: e, block: t }) => t ? $w(e) : y0(e)
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
    leave: ({ values: e }) => "[" + st(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + st(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + gt("(", st(t, ", "), ")")
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
    leave: ({ description: e, directives: t, operationTypes: r }) => gt("", e, `
`) + st(["schema", st(t, " "), He(r)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: r }) => gt("", e, `
`) + st(["scalar", t, st(r, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => gt("", e, `
`) + st(
      [
        "type",
        t,
        gt("implements ", st(r, " & ")),
        st(n, " "),
        He(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: r, type: n, directives: s }) => gt("", e, `
`) + t + (yd(r) ? gt(`(
`, Qs(st(r, `
`)), `
)`) : gt("(", st(r, ", "), ")")) + ": " + n + gt(" ", st(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: r, defaultValue: n, directives: s }) => gt("", e, `
`) + st(
      [t + ": " + r, gt("= ", n), st(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => gt("", e, `
`) + st(
      [
        "interface",
        t,
        gt("implements ", st(r, " & ")),
        st(n, " "),
        He(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, types: n }) => gt("", e, `
`) + st(
      ["union", t, st(r, " "), gt("= ", st(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, values: n }) => gt("", e, `
`) + st(["enum", t, st(r, " "), He(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: r }) => gt("", e, `
`) + st([t, st(r, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, fields: n }) => gt("", e, `
`) + st(["input", t, st(r, " "), He(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: r, repeatable: n, locations: s }) => gt("", e, `
`) + "directive @" + t + (yd(r) ? gt(`(
`, Qs(st(r, `
`)), `
)`) : gt("(", st(r, ", "), ")")) + (n ? " repeatable" : "") + " on " + st(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => st(
      ["extend schema", st(e, " "), He(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => st(["extend scalar", e, st(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => st(
      [
        "extend type",
        e,
        gt("implements ", st(t, " & ")),
        st(r, " "),
        He(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => st(
      [
        "extend interface",
        e,
        gt("implements ", st(t, " & ")),
        st(r, " "),
        He(n)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: r }) => st(
      [
        "extend union",
        e,
        st(t, " "),
        gt("= ", st(r, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: r }) => st(["extend enum", e, st(t, " "), He(r)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: r }) => st(["extend input", e, st(t, " "), He(r)], " ")
  }
};
function st(e, t = "") {
  var r;
  return (r = e == null ? void 0 : e.filter((n) => n).join(t)) !== null && r !== void 0 ? r : "";
}
function He(e) {
  return gt(`{
`, Qs(st(e, `
`)), `
}`);
}
function gt(e, t, r = "") {
  return t != null && t !== "" ? e + t + r : "";
}
function Qs(e) {
  return gt("  ", e.replace(/\n/g, `
  `));
}
function yd(e) {
  var t;
  return (t = e == null ? void 0 : e.some((r) => r.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const bd = (e) => {
  var n, s;
  let t;
  const r = e.definitions.filter((i) => i.kind === "OperationDefinition");
  return r.length === 1 && (t = (s = (n = r[0]) == null ? void 0 : n.name) == null ? void 0 : s.value), t;
}, io = (e) => {
  if (typeof e == "string") {
    let r;
    try {
      const n = xl(e);
      r = bd(n);
    } catch {
    }
    return { query: e, operationName: r };
  }
  const t = bd(e);
  return { query: Sl(e), operationName: t };
};
class Wn extends Error {
  constructor(t, r) {
    const n = `${Wn.extractMessage(t)}: ${JSON.stringify({
      response: t,
      request: r
    })}`;
    super(n), Object.setPrototypeOf(this, Wn.prototype), this.response = t, this.request = r, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Wn);
  }
  static extractMessage(t) {
    var r, n;
    return ((n = (r = t.errors) == null ? void 0 : r[0]) == null ? void 0 : n.message) ?? `GraphQL Error (Code: ${t.status})`;
  }
}
var jo = { exports: {} };
(function(e, t) {
  var r = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof To < "u" && To, n = function() {
    function i() {
      this.fetch = !1, this.DOMException = r.DOMException;
    }
    return i.prototype = r, new i();
  }();
  (function(i) {
    (function(o) {
      var a = typeof i < "u" && i || typeof self < "u" && self || typeof a < "u" && a, u = {
        searchParams: "URLSearchParams" in a,
        iterable: "Symbol" in a && "iterator" in Symbol,
        blob: "FileReader" in a && "Blob" in a && function() {
          try {
            return new Blob(), !0;
          } catch {
            return !1;
          }
        }(),
        formData: "FormData" in a,
        arrayBuffer: "ArrayBuffer" in a
      };
      function A(_) {
        return _ && DataView.prototype.isPrototypeOf(_);
      }
      if (u.arrayBuffer)
        var f = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], g = ArrayBuffer.isView || function(_) {
          return _ && f.indexOf(Object.prototype.toString.call(_)) > -1;
        };
      function y(_) {
        if (typeof _ != "string" && (_ = String(_)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(_) || _ === "")
          throw new TypeError('Invalid character in header field name: "' + _ + '"');
        return _.toLowerCase();
      }
      function R(_) {
        return typeof _ != "string" && (_ = String(_)), _;
      }
      function Q(_) {
        var p = {
          next: function() {
            var w = _.shift();
            return { done: w === void 0, value: w };
          }
        };
        return u.iterable && (p[Symbol.iterator] = function() {
          return p;
        }), p;
      }
      function S(_) {
        this.map = {}, _ instanceof S ? _.forEach(function(p, w) {
          this.append(w, p);
        }, this) : Array.isArray(_) ? _.forEach(function(p) {
          this.append(p[0], p[1]);
        }, this) : _ && Object.getOwnPropertyNames(_).forEach(function(p) {
          this.append(p, _[p]);
        }, this);
      }
      S.prototype.append = function(_, p) {
        _ = y(_), p = R(p);
        var w = this.map[_];
        this.map[_] = w ? w + ", " + p : p;
      }, S.prototype.delete = function(_) {
        delete this.map[y(_)];
      }, S.prototype.get = function(_) {
        return _ = y(_), this.has(_) ? this.map[_] : null;
      }, S.prototype.has = function(_) {
        return this.map.hasOwnProperty(y(_));
      }, S.prototype.set = function(_, p) {
        this.map[y(_)] = R(p);
      }, S.prototype.forEach = function(_, p) {
        for (var w in this.map)
          this.map.hasOwnProperty(w) && _.call(p, this.map[w], w, this);
      }, S.prototype.keys = function() {
        var _ = [];
        return this.forEach(function(p, w) {
          _.push(w);
        }), Q(_);
      }, S.prototype.values = function() {
        var _ = [];
        return this.forEach(function(p) {
          _.push(p);
        }), Q(_);
      }, S.prototype.entries = function() {
        var _ = [];
        return this.forEach(function(p, w) {
          _.push([w, p]);
        }), Q(_);
      }, u.iterable && (S.prototype[Symbol.iterator] = S.prototype.entries);
      function N(_) {
        if (_.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        _.bodyUsed = !0;
      }
      function O(_) {
        return new Promise(function(p, w) {
          _.onload = function() {
            p(_.result);
          }, _.onerror = function() {
            w(_.error);
          };
        });
      }
      function G(_) {
        var p = new FileReader(), w = O(p);
        return p.readAsArrayBuffer(_), w;
      }
      function L(_) {
        var p = new FileReader(), w = O(p);
        return p.readAsText(_), w;
      }
      function z(_) {
        for (var p = new Uint8Array(_), w = new Array(p.length), b = 0; b < p.length; b++)
          w[b] = String.fromCharCode(p[b]);
        return w.join("");
      }
      function P(_) {
        if (_.slice)
          return _.slice(0);
        var p = new Uint8Array(_.byteLength);
        return p.set(new Uint8Array(_)), p.buffer;
      }
      function Z() {
        return this.bodyUsed = !1, this._initBody = function(_) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = _, _ ? typeof _ == "string" ? this._bodyText = _ : u.blob && Blob.prototype.isPrototypeOf(_) ? this._bodyBlob = _ : u.formData && FormData.prototype.isPrototypeOf(_) ? this._bodyFormData = _ : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) ? this._bodyText = _.toString() : u.arrayBuffer && u.blob && A(_) ? (this._bodyArrayBuffer = P(_.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : u.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(_) || g(_)) ? this._bodyArrayBuffer = P(_) : this._bodyText = _ = Object.prototype.toString.call(_) : this._bodyText = "", this.headers.get("content-type") || (typeof _ == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, u.blob && (this.blob = function() {
          var _ = N(this);
          if (_)
            return _;
          if (this._bodyBlob)
            return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }, this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var _ = N(this);
            return _ || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(G);
        }), this.text = function() {
          var _ = N(this);
          if (_)
            return _;
          if (this._bodyBlob)
            return L(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(z(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, u.formData && (this.formData = function() {
          return this.text().then(ot);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var j = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function V(_) {
        var p = _.toUpperCase();
        return j.indexOf(p) > -1 ? p : _;
      }
      function U(_, p) {
        if (!(this instanceof U))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        p = p || {};
        var w = p.body;
        if (_ instanceof U) {
          if (_.bodyUsed)
            throw new TypeError("Already read");
          this.url = _.url, this.credentials = _.credentials, p.headers || (this.headers = new S(_.headers)), this.method = _.method, this.mode = _.mode, this.signal = _.signal, !w && _._bodyInit != null && (w = _._bodyInit, _.bodyUsed = !0);
        } else
          this.url = String(_);
        if (this.credentials = p.credentials || this.credentials || "same-origin", (p.headers || !this.headers) && (this.headers = new S(p.headers)), this.method = V(p.method || this.method || "GET"), this.mode = p.mode || this.mode || null, this.signal = p.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && w)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(w), (this.method === "GET" || this.method === "HEAD") && (p.cache === "no-store" || p.cache === "no-cache")) {
          var b = /([?&])_=[^&]*/;
          if (b.test(this.url))
            this.url = this.url.replace(b, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var B = /\?/;
            this.url += (B.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      U.prototype.clone = function() {
        return new U(this, { body: this._bodyInit });
      };
      function ot(_) {
        var p = new FormData();
        return _.trim().split("&").forEach(function(w) {
          if (w) {
            var b = w.split("="), B = b.shift().replace(/\+/g, " "), T = b.join("=").replace(/\+/g, " ");
            p.append(decodeURIComponent(B), decodeURIComponent(T));
          }
        }), p;
      }
      function q(_) {
        var p = new S(), w = _.replace(/\r?\n[\t ]+/g, " ");
        return w.split("\r").map(function(b) {
          return b.indexOf(`
`) === 0 ? b.substr(1, b.length) : b;
        }).forEach(function(b) {
          var B = b.split(":"), T = B.shift().trim();
          if (T) {
            var I = B.join(":").trim();
            p.append(T, I);
          }
        }), p;
      }
      Z.call(U.prototype);
      function $(_, p) {
        if (!(this instanceof $))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        p || (p = {}), this.type = "default", this.status = p.status === void 0 ? 200 : p.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = p.statusText === void 0 ? "" : "" + p.statusText, this.headers = new S(p.headers), this.url = p.url || "", this._initBody(_);
      }
      Z.call($.prototype), $.prototype.clone = function() {
        return new $(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new S(this.headers),
          url: this.url
        });
      }, $.error = function() {
        var _ = new $(null, { status: 0, statusText: "" });
        return _.type = "error", _;
      };
      var C = [301, 302, 303, 307, 308];
      $.redirect = function(_, p) {
        if (C.indexOf(p) === -1)
          throw new RangeError("Invalid status code");
        return new $(null, { status: p, headers: { location: _ } });
      }, o.DOMException = a.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(p, w) {
          this.message = p, this.name = w;
          var b = Error(p);
          this.stack = b.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function d(_, p) {
        return new Promise(function(w, b) {
          var B = new U(_, p);
          if (B.signal && B.signal.aborted)
            return b(new o.DOMException("Aborted", "AbortError"));
          var T = new XMLHttpRequest();
          function I() {
            T.abort();
          }
          T.onload = function() {
            var E = {
              status: T.status,
              statusText: T.statusText,
              headers: q(T.getAllResponseHeaders() || "")
            };
            E.url = "responseURL" in T ? T.responseURL : E.headers.get("X-Request-URL");
            var et = "response" in T ? T.response : T.responseText;
            setTimeout(function() {
              w(new $(et, E));
            }, 0);
          }, T.onerror = function() {
            setTimeout(function() {
              b(new TypeError("Network request failed"));
            }, 0);
          }, T.ontimeout = function() {
            setTimeout(function() {
              b(new TypeError("Network request failed"));
            }, 0);
          }, T.onabort = function() {
            setTimeout(function() {
              b(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function l(E) {
            try {
              return E === "" && a.location.href ? a.location.href : E;
            } catch {
              return E;
            }
          }
          T.open(B.method, l(B.url), !0), B.credentials === "include" ? T.withCredentials = !0 : B.credentials === "omit" && (T.withCredentials = !1), "responseType" in T && (u.blob ? T.responseType = "blob" : u.arrayBuffer && B.headers.get("Content-Type") && B.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (T.responseType = "arraybuffer")), p && typeof p.headers == "object" && !(p.headers instanceof S) ? Object.getOwnPropertyNames(p.headers).forEach(function(E) {
            T.setRequestHeader(E, R(p.headers[E]));
          }) : B.headers.forEach(function(E, et) {
            T.setRequestHeader(et, E);
          }), B.signal && (B.signal.addEventListener("abort", I), T.onreadystatechange = function() {
            T.readyState === 4 && B.signal.removeEventListener("abort", I);
          }), T.send(typeof B._bodyInit > "u" ? null : B._bodyInit);
        });
      }
      return d.polyfill = !0, a.fetch || (a.fetch = d, a.Headers = S, a.Request = U, a.Response = $), o.Headers = S, o.Request = U, o.Response = $, o.fetch = d, o;
    })({});
  })(n), n.fetch.ponyfill = !0, delete n.fetch.polyfill;
  var s = r.fetch ? r : n;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(jo, jo.exports);
var js = jo.exports;
const Fs = /* @__PURE__ */ dh(js), S0 = /* @__PURE__ */ _p({
  __proto__: null,
  default: Fs
}, [js]), rn = (e) => {
  let t = {};
  return e && (typeof Headers < "u" && e instanceof Headers || S0 && js.Headers && e instanceof js.Headers ? t = Pw(e) : Array.isArray(e) ? e.forEach(([r, n]) => {
    r && n !== void 0 && (t[r] = n);
  }) : t = e), t;
}, Id = (e) => e.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim(), T0 = (e) => {
  if (!Array.isArray(e.query)) {
    const n = e, s = [`query=${encodeURIComponent(Id(n.query))}`];
    return e.variables && s.push(`variables=${encodeURIComponent(n.jsonSerializer.stringify(n.variables))}`), n.operationName && s.push(`operationName=${encodeURIComponent(n.operationName)}`), s.join("&");
  }
  if (typeof e.variables < "u" && !Array.isArray(e.variables))
    throw new Error("Cannot create query with given variable type, array expected");
  const t = e, r = e.query.reduce((n, s, i) => (n.push({
    query: Id(s),
    variables: t.variables ? t.jsonSerializer.stringify(t.variables[i]) : void 0
  }), n), []);
  return `query=${encodeURIComponent(t.jsonSerializer.stringify(r))}`;
}, N0 = (e) => async (t) => {
  const { url: r, query: n, variables: s, operationName: i, fetch: o, fetchOptions: a, middleware: u } = t, A = { ...t.headers };
  let f = "", g;
  e === "POST" ? (g = Q0(n, s, i, a.jsonSerializer), typeof g == "string" && (A["Content-Type"] = "application/json")) : f = T0({
    query: n,
    variables: s,
    operationName: i,
    jsonSerializer: a.jsonSerializer ?? Ga
  });
  const y = {
    method: e,
    headers: A,
    body: g,
    ...a
  };
  let R = r, Q = y;
  if (u) {
    const S = await Promise.resolve(u({ ...y, url: r, operationName: i, variables: s })), { url: N, ...O } = S;
    R = N, Q = O;
  }
  return f && (R = `${R}?${f}`), await o(R, Q);
};
class D0 {
  constructor(t, r = {}) {
    this.url = t, this.requestConfig = r, this.rawRequest = async (...n) => {
      const [s, i, o] = n, a = Uw(s, i, o), { headers: u, fetch: A = Fs, method: f = "POST", requestMiddleware: g, responseMiddleware: y, ...R } = this.requestConfig, { url: Q } = this;
      a.signal !== void 0 && (R.signal = a.signal);
      const { operationName: S } = io(a.query);
      return oo({
        url: Q,
        query: a.query,
        variables: a.variables,
        headers: {
          ...rn(ao(u)),
          ...rn(a.requestHeaders)
        },
        operationName: S,
        fetch: A,
        method: f,
        fetchOptions: R,
        middleware: g
      }).then((N) => (y && y(N), N)).catch((N) => {
        throw y && y(N), N;
      });
    };
  }
  async request(t, ...r) {
    const [n, s] = r, i = kw(t, n, s), { headers: o, fetch: a = Fs, method: u = "POST", requestMiddleware: A, responseMiddleware: f, ...g } = this.requestConfig, { url: y } = this;
    i.signal !== void 0 && (g.signal = i.signal);
    const { query: R, operationName: Q } = io(i.document);
    return oo({
      url: y,
      query: R,
      variables: i.variables,
      headers: {
        ...rn(ao(o)),
        ...rn(i.requestHeaders)
      },
      operationName: Q,
      fetch: a,
      method: u,
      fetchOptions: g,
      middleware: A
    }).then((S) => (f && f(S), S.data)).catch((S) => {
      throw f && f(S), S;
    });
  }
  // prettier-ignore
  batchRequests(t, r) {
    const n = zw(t, r), { headers: s, ...i } = this.requestConfig;
    n.signal !== void 0 && (i.signal = n.signal);
    const o = n.documents.map(({ document: u }) => io(u).query), a = n.documents.map(({ variables: u }) => u);
    return oo({
      url: this.url,
      query: o,
      // @ts-expect-error TODO reconcile batch variables into system.
      variables: a,
      headers: {
        ...rn(ao(s)),
        ...rn(n.requestHeaders)
      },
      operationName: void 0,
      fetch: this.requestConfig.fetch ?? Fs,
      method: this.requestConfig.method || "POST",
      fetchOptions: i,
      middleware: this.requestConfig.requestMiddleware
    }).then((u) => (this.requestConfig.responseMiddleware && this.requestConfig.responseMiddleware(u), u.data)).catch((u) => {
      throw this.requestConfig.responseMiddleware && this.requestConfig.responseMiddleware(u), u;
    });
  }
  setHeaders(t) {
    return this.requestConfig.headers = t, this;
  }
  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  setHeader(t, r) {
    const { headers: n } = this.requestConfig;
    return n ? n[t] = r : this.requestConfig.headers = { [t]: r }, this;
  }
  /**
   * Change the client endpoint. All subsequent requests will send to this endpoint.
   */
  setEndpoint(t) {
    return this.url = t, this;
  }
}
const oo = async (e) => {
  const { query: t, variables: r, fetchOptions: n } = e, s = N0(Lw(e.method ?? "post")), i = Array.isArray(e.query), o = await s(e), a = await F0(o, n.jsonSerializer ?? Ga), u = Array.isArray(a) ? !a.some(({ data: f }) => !f) : !!a.data, A = Array.isArray(a) || !a.errors || Array.isArray(a.errors) && !a.errors.length || n.errorPolicy === "all" || n.errorPolicy === "ignore";
  if (o.ok && A && u) {
    const { errors: f, ...g } = (Array.isArray(a), a), y = n.errorPolicy === "ignore" ? g : a;
    return {
      ...i ? { data: y } : y,
      headers: o.headers,
      status: o.status
    };
  } else {
    const f = typeof a == "string" ? {
      error: a
    } : a;
    throw new Wn(
      // @ts-expect-error TODO
      { ...f, status: o.status, headers: o.headers },
      { query: t, variables: r }
    );
  }
}, Q0 = (e, t, r, n) => {
  const s = n ?? Ga;
  if (!Array.isArray(e))
    return s.stringify({ query: e, variables: t, operationName: r });
  if (typeof t < "u" && !Array.isArray(t))
    throw new Error("Cannot create request body with given variable type, array expected");
  const i = e.reduce((o, a, u) => (o.push({ query: a, variables: t ? t[u] : void 0 }), o), []);
  return s.stringify(i);
}, F0 = async (e, t) => {
  let r;
  return e.headers.forEach((n, s) => {
    s.toLowerCase() === "content-type" && (r = n);
  }), r && (r.toLowerCase().startsWith("application/json") || r.toLowerCase().startsWith("application/graphql+json") || r.toLowerCase().startsWith("application/graphql-response+json")) ? t.parse(await e.text()) : e.text();
}, ao = (e) => typeof e == "function" ? e() : e;
var Js = function() {
  return Js = Object.assign || function(t) {
    for (var r, n = 1, s = arguments.length; n < s; n++) {
      r = arguments[n];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, Js.apply(this, arguments);
};
var Os = /* @__PURE__ */ new Map(), Jo = /* @__PURE__ */ new Map(), Tl = !0, qs = !1;
function Nl(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function O0(e) {
  return Nl(e.source.body.substring(e.start, e.end));
}
function M0(e) {
  var t = /* @__PURE__ */ new Set(), r = [];
  return e.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var s = n.name.value, i = O0(n.loc), o = Jo.get(s);
      o && !o.has(i) ? Tl && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Jo.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), r.push(n));
    } else
      r.push(n);
  }), Js(Js({}, e), { definitions: r });
}
function L0(e) {
  var t = new Set(e.definitions);
  t.forEach(function(n) {
    n.loc && delete n.loc, Object.keys(n).forEach(function(s) {
      var i = n[s];
      i && typeof i == "object" && t.add(i);
    });
  });
  var r = e.loc;
  return r && (delete r.startToken, delete r.endToken), e;
}
function P0(e) {
  var t = Nl(e);
  if (!Os.has(t)) {
    var r = xl(e, {
      experimentalFragmentVariables: qs,
      allowLegacyFragmentVariables: qs
    });
    if (!r || r.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Os.set(t, L0(M0(r)));
  }
  return Os.get(t);
}
function K(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  typeof e == "string" && (e = [e]);
  var n = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? n += s.loc.source.body : n += s, n += e[i + 1];
  }), P0(n);
}
function k0() {
  Os.clear(), Jo.clear();
}
function U0() {
  Tl = !1;
}
function z0() {
  qs = !0;
}
function G0() {
  qs = !1;
}
var Mn = {
  gql: K,
  resetCaches: k0,
  disableFragmentWarnings: U0,
  enableExperimentalFragmentVariables: z0,
  disableExperimentalFragmentVariables: G0
};
(function(e) {
  e.gql = Mn.gql, e.resetCaches = Mn.resetCaches, e.disableFragmentWarnings = Mn.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Mn.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Mn.disableExperimentalFragmentVariables;
})(K || (K = {}));
K.default = K;
var St = "0x0000000000000000000000000000000000000000000000000000000000000000", XB = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", WB = 16 * 1024, ZB = 16, jB = 1024 * 1024 * 1024, JB = 1024 * 1024 * 1024, qB = 255, $B = 1024 * 1024, KB = 1024 * 1024, V0 = "0xffffffffffff0000", Dl = "0xffffffffffff0001", H0 = "0xffffffffffff0003", Y0 = "0xffffffffffff0004", X0 = "0xffffffffffff0005", t2 = "0x0", W0 = [
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
  "TooManySlots",
  "ExpectedNestedCaller",
  "MemoryGrowthOverlap",
  "UninitalizedMemoryAccess",
  "OverridingConsensusParameters",
  "UnknownStateTransactionBytecodeRoot",
  "OverridingStateTransactionBytecode",
  "BytecodeAlreadyUploaded",
  "ThePartIsNotSequentiallyConnected",
  "BlobIdAlreadyUploaded",
  "BlobNotFound",
  "GasCostNotDefined"
], Z0 = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let c;
const Ql = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Ql.decode();
let Vn = null;
function Fl() {
  return (Vn === null || Vn.byteLength === 0) && (Vn = new Uint8Array(c.memory.buffer)), Vn;
}
function j0(e, t) {
  return e = e >>> 0, Ql.decode(Fl().subarray(e, e + t));
}
function m(e, t) {
  if (!(e instanceof t))
    throw new Error(`expected instance of ${t.name}`);
  return e.ptr;
}
function J0(e, t) {
  const r = c.gm_args(e, t);
  return k.__wrap(r);
}
function q0(e, t, r) {
  const n = c.gtf_args(e, t, r);
  return k.__wrap(n);
}
function $0(e, t, r, n) {
  m(n, Mr);
  var s = n.__destroy_into_raw();
  const i = c.wdcm_args(e, t, r, s);
  return k.__wrap(i);
}
function K0(e, t, r, n) {
  m(n, Mr);
  var s = n.__destroy_into_raw();
  const i = c.wqcm_args(e, t, r, s);
  return k.__wrap(i);
}
function tm(e, t, r, n) {
  m(n, As);
  var s = n.__destroy_into_raw();
  const i = c.wdop_args(e, t, r, s);
  return k.__wrap(i);
}
function em(e, t, r, n) {
  m(n, As);
  var s = n.__destroy_into_raw();
  const i = c.wqop_args(e, t, r, s);
  return k.__wrap(i);
}
function rm(e, t, r, n) {
  m(n, ps);
  var s = n.__destroy_into_raw();
  const i = c.wdml_args(e, t, r, s);
  return k.__wrap(i);
}
function nm(e, t, r, n) {
  m(n, ps);
  var s = n.__destroy_into_raw();
  const i = c.wqml_args(e, t, r, s);
  return k.__wrap(i);
}
function sm(e, t, r, n) {
  m(n, ls);
  var s = n.__destroy_into_raw();
  const i = c.wddv_args(e, t, r, s);
  return k.__wrap(i);
}
function im(e, t, r, n) {
  m(n, ls);
  var s = n.__destroy_into_raw();
  const i = c.wqdv_args(e, t, r, s);
  return k.__wrap(i);
}
function om(e, t, r) {
  const n = c.add(e, t, r);
  return k.__wrap(n);
}
function am(e, t, r) {
  const n = c.and(e, t, r);
  return k.__wrap(n);
}
function cm(e, t, r) {
  const n = c.div(e, t, r);
  return k.__wrap(n);
}
function dm(e, t, r) {
  const n = c.eq(e, t, r);
  return k.__wrap(n);
}
function um(e, t, r) {
  const n = c.exp(e, t, r);
  return k.__wrap(n);
}
function _m(e, t, r) {
  const n = c.gt(e, t, r);
  return k.__wrap(n);
}
function hm(e, t, r) {
  const n = c.lt(e, t, r);
  return k.__wrap(n);
}
function lm(e, t, r) {
  const n = c.mlog(e, t, r);
  return k.__wrap(n);
}
function Am(e, t, r) {
  const n = c.mroo(e, t, r);
  return k.__wrap(n);
}
function pm(e, t, r) {
  const n = c.mod_(e, t, r);
  return k.__wrap(n);
}
function Yr(e, t) {
  const r = c.move_(e, t);
  return k.__wrap(r);
}
function fm(e, t, r) {
  const n = c.mul(e, t, r);
  return k.__wrap(n);
}
function gm(e, t) {
  const r = c.not(e, t);
  return k.__wrap(r);
}
function wm(e, t, r) {
  const n = c.or(e, t, r);
  return k.__wrap(n);
}
function mm(e, t, r) {
  const n = c.sll(e, t, r);
  return k.__wrap(n);
}
function ym(e, t, r) {
  const n = c.srl(e, t, r);
  return k.__wrap(n);
}
function $s(e, t, r) {
  const n = c.sub(e, t, r);
  return k.__wrap(n);
}
function bm(e, t, r) {
  const n = c.xor(e, t, r);
  return k.__wrap(n);
}
function Im(e, t, r, n) {
  const s = c.mldv(e, t, r, n);
  return k.__wrap(s);
}
function Ya(e) {
  const t = c.ret(e);
  return k.__wrap(t);
}
function Em(e, t) {
  const r = c.retd(e, t);
  return k.__wrap(r);
}
function vm(e) {
  const t = c.aloc(e);
  return k.__wrap(t);
}
function Cm(e, t) {
  const r = c.mcl(e, t);
  return k.__wrap(r);
}
function Bm(e, t, r) {
  const n = c.mcp(e, t, r);
  return k.__wrap(n);
}
function xm(e, t, r, n) {
  const s = c.meq(e, t, r, n);
  return k.__wrap(s);
}
function Rm(e, t) {
  const r = c.bhsh(e, t);
  return k.__wrap(r);
}
function Sm(e) {
  const t = c.bhei(e);
  return k.__wrap(t);
}
function Tm(e, t) {
  const r = c.burn(e, t);
  return k.__wrap(r);
}
function qo(e, t, r, n) {
  const s = c.call(e, t, r, n);
  return k.__wrap(s);
}
function Nm(e, t, r, n) {
  const s = c.ccp(e, t, r, n);
  return k.__wrap(s);
}
function Dm(e, t) {
  const r = c.croo(e, t);
  return k.__wrap(r);
}
function Qm(e, t) {
  const r = c.csiz(e, t);
  return k.__wrap(r);
}
function Fm(e) {
  const t = c.cb(e);
  return k.__wrap(t);
}
function Zn(e, t, r, n) {
  const s = c.ldc(e, t, r, n);
  return k.__wrap(s);
}
function Om(e, t, r, n) {
  const s = c.log(e, t, r, n);
  return k.__wrap(s);
}
function Mm(e, t, r, n) {
  const s = c.logd(e, t, r, n);
  return k.__wrap(s);
}
function Lm(e, t) {
  const r = c.mint(e, t);
  return k.__wrap(r);
}
function Pm(e) {
  const t = c.rvrt(e);
  return k.__wrap(t);
}
function km(e, t, r) {
  const n = c.scwq(e, t, r);
  return k.__wrap(n);
}
function Um(e, t, r) {
  const n = c.srw(e, t, r);
  return k.__wrap(n);
}
function zm(e, t, r, n) {
  const s = c.srwq(e, t, r, n);
  return k.__wrap(s);
}
function Gm(e, t, r) {
  const n = c.sww(e, t, r);
  return k.__wrap(n);
}
function Vm(e, t, r, n) {
  const s = c.swwq(e, t, r, n);
  return k.__wrap(s);
}
function Ol(e, t, r) {
  const n = c.tr(e, t, r);
  return k.__wrap(n);
}
function Hm(e, t, r, n) {
  const s = c.tro(e, t, r, n);
  return k.__wrap(s);
}
function Ym(e, t, r) {
  const n = c.eck1(e, t, r);
  return k.__wrap(n);
}
function Xm(e, t, r) {
  const n = c.ecr1(e, t, r);
  return k.__wrap(n);
}
function Wm(e, t, r, n) {
  const s = c.ed19(e, t, r, n);
  return k.__wrap(s);
}
function Zm(e, t, r) {
  const n = c.k256(e, t, r);
  return k.__wrap(n);
}
function jm(e, t, r) {
  const n = c.s256(e, t, r);
  return k.__wrap(n);
}
function Jm(e, t) {
  const r = c.time(e, t);
  return k.__wrap(r);
}
function qm() {
  const e = c.noop();
  return k.__wrap(e);
}
function $m(e) {
  const t = c.flag(e);
  return k.__wrap(t);
}
function Km(e, t, r) {
  const n = c.bal(e, t, r);
  return k.__wrap(n);
}
function Ks(e) {
  const t = c.jmp(e);
  return k.__wrap(t);
}
function ty(e, t, r) {
  const n = c.jne(e, t, r);
  return k.__wrap(n);
}
function ey(e, t, r, n) {
  const s = c.smo(e, t, r, n);
  return k.__wrap(s);
}
function tr(e, t, r) {
  const n = c.addi(e, t, r);
  return k.__wrap(n);
}
function ry(e, t, r) {
  const n = c.andi(e, t, r);
  return k.__wrap(n);
}
function ti(e, t, r) {
  const n = c.divi(e, t, r);
  return k.__wrap(n);
}
function ny(e, t, r) {
  const n = c.expi(e, t, r);
  return k.__wrap(n);
}
function sy(e, t, r) {
  const n = c.modi(e, t, r);
  return k.__wrap(n);
}
function iy(e, t, r) {
  const n = c.muli(e, t, r);
  return k.__wrap(n);
}
function oy(e, t, r) {
  const n = c.ori(e, t, r);
  return k.__wrap(n);
}
function ay(e, t, r) {
  const n = c.slli(e, t, r);
  return k.__wrap(n);
}
function cy(e, t, r) {
  const n = c.srli(e, t, r);
  return k.__wrap(n);
}
function Ml(e, t, r) {
  const n = c.subi(e, t, r);
  return k.__wrap(n);
}
function dy(e, t, r) {
  const n = c.xori(e, t, r);
  return k.__wrap(n);
}
function uy(e, t, r) {
  const n = c.jnei(e, t, r);
  return k.__wrap(n);
}
function _y(e, t, r) {
  const n = c.lb(e, t, r);
  return k.__wrap(n);
}
function es(e, t, r) {
  const n = c.lw(e, t, r);
  return k.__wrap(n);
}
function hy(e, t, r) {
  const n = c.sb(e, t, r);
  return k.__wrap(n);
}
function ly(e, t, r) {
  const n = c.sw(e, t, r);
  return k.__wrap(n);
}
function Ay(e, t, r) {
  const n = c.mcpi(e, t, r);
  return k.__wrap(n);
}
function Ll(e, t, r) {
  const n = c.gtf(e, t, r);
  return k.__wrap(n);
}
function py(e, t) {
  const r = c.mcli(e, t);
  return k.__wrap(r);
}
function fy(e, t) {
  const r = c.gm(e, t);
  return k.__wrap(r);
}
function _n(e, t) {
  const r = c.movi(e, t);
  return k.__wrap(r);
}
function gy(e, t) {
  const r = c.jnzi(e, t);
  return k.__wrap(r);
}
function wy(e, t) {
  const r = c.jmpf(e, t);
  return k.__wrap(r);
}
function my(e, t) {
  const r = c.jmpb(e, t);
  return k.__wrap(r);
}
function yy(e, t, r) {
  const n = c.jnzf(e, t, r);
  return k.__wrap(n);
}
function Pl(e, t, r) {
  const n = c.jnzb(e, t, r);
  return k.__wrap(n);
}
function by(e, t, r, n) {
  const s = c.jnef(e, t, r, n);
  return k.__wrap(s);
}
function Iy(e, t, r, n) {
  const s = c.jneb(e, t, r, n);
  return k.__wrap(s);
}
function Ey(e) {
  const t = c.ji(e);
  return k.__wrap(t);
}
function vy(e) {
  const t = c.cfei(e);
  return k.__wrap(t);
}
function Cy(e) {
  const t = c.cfsi(e);
  return k.__wrap(t);
}
function By(e) {
  const t = c.cfe(e);
  return k.__wrap(t);
}
function xy(e) {
  const t = c.cfs(e);
  return k.__wrap(t);
}
function Ry(e) {
  const t = c.pshl(e);
  return k.__wrap(t);
}
function Sy(e) {
  const t = c.pshh(e);
  return k.__wrap(t);
}
function Ty(e) {
  const t = c.popl(e);
  return k.__wrap(t);
}
function Ny(e) {
  const t = c.poph(e);
  return k.__wrap(t);
}
function Dy(e, t, r, n) {
  const s = c.wdcm(e, t, r, n);
  return k.__wrap(s);
}
function Qy(e, t, r, n) {
  const s = c.wqcm(e, t, r, n);
  return k.__wrap(s);
}
function Fy(e, t, r, n) {
  const s = c.wdop(e, t, r, n);
  return k.__wrap(s);
}
function Oy(e, t, r, n) {
  const s = c.wqop(e, t, r, n);
  return k.__wrap(s);
}
function My(e, t, r, n) {
  const s = c.wdml(e, t, r, n);
  return k.__wrap(s);
}
function Ly(e, t, r, n) {
  const s = c.wqml(e, t, r, n);
  return k.__wrap(s);
}
function Py(e, t, r, n) {
  const s = c.wddv(e, t, r, n);
  return k.__wrap(s);
}
function ky(e, t, r, n) {
  const s = c.wqdv(e, t, r, n);
  return k.__wrap(s);
}
function Uy(e, t, r, n) {
  const s = c.wdmd(e, t, r, n);
  return k.__wrap(s);
}
function zy(e, t, r, n) {
  const s = c.wqmd(e, t, r, n);
  return k.__wrap(s);
}
function Gy(e, t, r, n) {
  const s = c.wdam(e, t, r, n);
  return k.__wrap(s);
}
function Vy(e, t, r, n) {
  const s = c.wqam(e, t, r, n);
  return k.__wrap(s);
}
function Hy(e, t, r, n) {
  const s = c.wdmm(e, t, r, n);
  return k.__wrap(s);
}
function Yy(e, t, r, n) {
  const s = c.wqmm(e, t, r, n);
  return k.__wrap(s);
}
function Xy(e, t, r, n) {
  const s = c.ecal(e, t, r, n);
  return k.__wrap(s);
}
function ei(e, t) {
  const r = c.bsiz(e, t);
  return k.__wrap(r);
}
function Wy(e, t, r, n) {
  const s = c.bldd(e, t, r, n);
  return k.__wrap(s);
}
let Ur = null;
function Ed() {
  return (Ur === null || Ur.buffer.detached === !0 || Ur.buffer.detached === void 0 && Ur.buffer !== c.memory.buffer) && (Ur = new DataView(c.memory.buffer)), Ur;
}
function Zy(e, t) {
  return e = e >>> 0, Fl().subarray(e / 1, e / 1 + t);
}
const kl = Object.freeze({
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
}), jy = Object.freeze({
  /**
  * Equality (`==`)
  */
  EQ: 0,
  0: "EQ",
  /**
  * Inequality (`!=`)
  */
  NE: 1,
  1: "NE",
  /**
  * Less than (`<`)
  */
  LT: 2,
  2: "LT",
  /**
  * Greater than (`>`)
  */
  GT: 3,
  3: "GT",
  /**
  * Less than or equals (`>=`)
  */
  LTE: 4,
  4: "LTE",
  /**
  * Greater than or equals (`>=`)
  */
  GTE: 5,
  5: "GTE",
  /**
  * Number of leading zeroes in lhs (`lzcnt`) (discards rhs)
  */
  LZC: 6,
  6: "LZC"
}), Jy = Object.freeze({
  /**
  *r" The byte can't be mapped to any known `PanicReason`.
  */
  UnknownPanicReason: 0,
  0: "UnknownPanicReason",
  /**
  *r" Found `RVRT` instruction.
  */
  Revert: 1,
  1: "Revert",
  /**
  *r" Execution ran out of gas.
  */
  OutOfGas: 2,
  2: "OutOfGas",
  /**
  *r" The transaction validity is violated.
  */
  TransactionValidity: 3,
  3: "TransactionValidity",
  /**
  *r" Attempt to write outside interpreter memory boundaries.
  */
  MemoryOverflow: 4,
  4: "MemoryOverflow",
  /**
  *r" Overflow while executing arithmetic operation.
  *r" These errors are ignored using the WRAPPING flag.
  */
  ArithmeticOverflow: 5,
  5: "ArithmeticOverflow",
  /**
  *r" Designed contract was not found in the storage.
  */
  ContractNotFound: 6,
  6: "ContractNotFound",
  /**
  *r" Memory ownership rules are violated.
  */
  MemoryOwnership: 7,
  7: "MemoryOwnership",
  /**
  *r" The asset ID balance isn't enough for the instruction.
  */
  NotEnoughBalance: 8,
  8: "NotEnoughBalance",
  /**
  *r" The interpreter is expected to be in internal context.
  */
  ExpectedInternalContext: 9,
  9: "ExpectedInternalContext",
  /**
  *r" The queried asset ID was not found in the state.
  */
  AssetIdNotFound: 10,
  10: "AssetIdNotFound",
  /**
  *r" The provided input is not found in the transaction.
  */
  InputNotFound: 11,
  11: "InputNotFound",
  /**
  *r" The provided output is not found in the transaction.
  */
  OutputNotFound: 12,
  12: "OutputNotFound",
  /**
  *r" The provided witness is not found in the transaction.
  */
  WitnessNotFound: 13,
  13: "WitnessNotFound",
  /**
  *r" The transaction maturity is not valid for this request.
  */
  TransactionMaturity: 14,
  14: "TransactionMaturity",
  /**
  *r" The metadata identifier is invalid.
  */
  InvalidMetadataIdentifier: 15,
  15: "InvalidMetadataIdentifier",
  /**
  *r" The call structure is not valid.
  */
  MalformedCallStructure: 16,
  16: "MalformedCallStructure",
  /**
  *r" The provided register does not allow write operations.
  */
  ReservedRegisterNotWritable: 17,
  17: "ReservedRegisterNotWritable",
  /**
  *r" The execution resulted in an erroneous state of the interpreter.
  */
  InvalidFlags: 18,
  18: "InvalidFlags",
  /**
  *r" The provided immediate value is not valid for this instruction.
  */
  InvalidImmediateValue: 19,
  19: "InvalidImmediateValue",
  /**
  *r" The provided transaction input is not of type `Coin`.
  */
  ExpectedCoinInput: 20,
  20: "ExpectedCoinInput",
  /**
  *r" `ECAL` instruction failed.
  */
  EcalError: 21,
  21: "EcalError",
  /**
  *r" Two segments of the interpreter memory should not intersect for write operations.
  */
  MemoryWriteOverlap: 22,
  22: "MemoryWriteOverlap",
  /**
  *r" The requested contract is not listed in the transaction inputs.
  */
  ContractNotInInputs: 23,
  23: "ContractNotInInputs",
  /**
  *r" The internal asset ID balance overflowed with the provided instruction.
  */
  InternalBalanceOverflow: 24,
  24: "InternalBalanceOverflow",
  /**
  *r" The maximum allowed contract size is violated.
  */
  ContractMaxSize: 25,
  25: "ContractMaxSize",
  /**
  *r" This instruction expects the stack area to be unallocated for this call.
  */
  ExpectedUnallocatedStack: 26,
  26: "ExpectedUnallocatedStack",
  /**
  *r" The maximum allowed number of static contracts was reached for this transaction.
  */
  MaxStaticContractsReached: 27,
  27: "MaxStaticContractsReached",
  /**
  *r" The requested transfer amount cannot be zero.
  */
  TransferAmountCannotBeZero: 28,
  28: "TransferAmountCannotBeZero",
  /**
  *r" The provided transaction output should be of type `Variable`.
  */
  ExpectedOutputVariable: 29,
  29: "ExpectedOutputVariable",
  /**
  *r" The expected context of the stack parent is internal.
  */
  ExpectedParentInternalContext: 30,
  30: "ExpectedParentInternalContext",
  /**
  *r" The predicate returned non `1`. The `1` means successful verification
  *r" of the predicate, all other values means unsuccessful.
  */
  PredicateReturnedNonOne: 31,
  31: "PredicateReturnedNonOne",
  /**
  *r" The contract ID is already deployed and can't be overwritten.
  */
  ContractIdAlreadyDeployed: 32,
  32: "ContractIdAlreadyDeployed",
  /**
  *r" The loaded contract mismatch expectations.
  */
  ContractMismatch: 33,
  33: "ContractMismatch",
  /**
  *r" Attempting to send message data longer than `MAX_MESSAGE_DATA_LENGTH`
  */
  MessageDataTooLong: 34,
  34: "MessageDataTooLong",
  /**
  *r" Mathematically invalid arguments where given to an arithmetic instruction.
  *r" For instance, division by zero produces this.
  *r" These errors are ignored using the UNSAFEMATH flag.
  */
  ArithmeticError: 35,
  35: "ArithmeticError",
  /**
  *r" The contract instruction is not allowed in predicates.
  */
  ContractInstructionNotAllowed: 36,
  36: "ContractInstructionNotAllowed",
  /**
  *r" Transfer of zero coins is not allowed.
  */
  TransferZeroCoins: 37,
  37: "TransferZeroCoins",
  /**
  *r" Attempted to execute an invalid instruction
  */
  InvalidInstruction: 38,
  38: "InvalidInstruction",
  /**
  *r" Memory outside $is..$ssp range is not executable
  */
  MemoryNotExecutable: 39,
  39: "MemoryNotExecutable",
  /**
  *r" The policy is not set.
  */
  PolicyIsNotSet: 40,
  40: "PolicyIsNotSet",
  /**
  *r" The policy is not found across policies.
  */
  PolicyNotFound: 41,
  41: "PolicyNotFound",
  /**
  *r" Receipt context is full
  */
  TooManyReceipts: 42,
  42: "TooManyReceipts",
  /**
  *r" Balance of a contract overflowed
  */
  BalanceOverflow: 43,
  43: "BalanceOverflow",
  /**
  *r" Block height value is invalid, typically because it is too large
  */
  InvalidBlockHeight: 44,
  44: "InvalidBlockHeight",
  /**
  *r" Attempt to use sequential memory instructions with too large slot count,
  *r" typically because it cannot fit into usize
  */
  TooManySlots: 45,
  45: "TooManySlots",
  /**
  *r" Caller of this internal context is also expected to be internal,
  *r" i.e. $fp->$fp must be non-zero.
  */
  ExpectedNestedCaller: 46,
  46: "ExpectedNestedCaller",
  /**
  *r" During memory growth, the stack overlapped with the heap
  */
  MemoryGrowthOverlap: 47,
  47: "MemoryGrowthOverlap",
  /**
  *r" Attempting to read or write uninitialized memory.
  *r" Also occurs when boundary crosses from stack to heap.
  */
  UninitalizedMemoryAccess: 48,
  48: "UninitalizedMemoryAccess",
  /**
  *r" Overriding consensus parameters is not allowed.
  */
  OverridingConsensusParameters: 49,
  49: "OverridingConsensusParameters",
  /**
  *r" The storage doesn't know about the hash of the state transition bytecode.
  */
  UnknownStateTransactionBytecodeRoot: 50,
  50: "UnknownStateTransactionBytecodeRoot",
  /**
  *r" Overriding the state transition bytecode is not allowed.
  */
  OverridingStateTransactionBytecode: 51,
  51: "OverridingStateTransactionBytecode",
  /**
  *r" The bytecode is already uploaded and cannot be uploaded again.
  */
  BytecodeAlreadyUploaded: 52,
  52: "BytecodeAlreadyUploaded",
  /**
  *r" The part of the bytecode is not sequentially connected to the previous parts.
  */
  ThePartIsNotSequentiallyConnected: 53,
  53: "ThePartIsNotSequentiallyConnected",
  /**
  *r" The requested blob is not found.
  */
  BlobNotFound: 54,
  54: "BlobNotFound",
  /**
  *r" The blob was already
  */
  BlobIdAlreadyUploaded: 55,
  55: "BlobIdAlreadyUploaded",
  /**
  *r" Active gas costs do not define the cost for this instruction.
  */
  GasCostNotDefined: 56,
  56: "GasCostNotDefined"
}), qy = Object.freeze({
  /**
  * Add
  */
  ADD: 0,
  0: "ADD",
  /**
  * Subtract
  */
  SUB: 1,
  1: "SUB",
  /**
  * Invert bits (discards rhs)
  */
  NOT: 2,
  2: "NOT",
  /**
  * Bitwise or
  */
  OR: 3,
  3: "OR",
  /**
  * Bitwise exclusive or
  */
  XOR: 4,
  4: "XOR",
  /**
  * Bitwise and
  */
  AND: 5,
  5: "AND",
  /**
  * Shift left
  */
  SHL: 6,
  6: "SHL",
  /**
  * Shift right
  */
  SHR: 7,
  7: "SHR"
}), $y = Object.freeze({
  /**
  *r" Get if caller is external.
  */
  IsCallerExternal: 1,
  1: "IsCallerExternal",
  /**
  *r" Get caller's contract ID.
  */
  GetCaller: 2,
  2: "GetCaller",
  /**
  *r" Get index of current predicate.
  */
  GetVerifyingPredicate: 3,
  3: "GetVerifyingPredicate",
  /**
  *r" Get the Chain ID this VM is operating within
  */
  GetChainId: 4,
  4: "GetChainId",
  /**
  *r" Get memory address where the transaction is located
  */
  TxStart: 5,
  5: "TxStart",
  /**
  *r" Get memory address of base asset ID
  */
  BaseAssetId: 6,
  6: "BaseAssetId"
}), vd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_add_free(e >>> 0, 1));
class Ky {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_add_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, vd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Cd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_addi_free(e >>> 0, 1));
class tb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_addi_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Cd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const Bd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_aloc_free(e >>> 0, 1));
class eb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_aloc_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} bytes
  */
  constructor(t) {
    m(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Bd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const xd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_and_free(e >>> 0, 1));
class rb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_and_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, xd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Rd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_andi_free(e >>> 0, 1));
class nb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Rd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_andi_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Rd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const Sd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bal_free(e >>> 0, 1));
class sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bal_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} asset_id_addr
  * @param {RegId} contract_id_addr
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Sd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Td = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhei_free(e >>> 0, 1));
class ib {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Td.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bhei_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  */
  constructor(t) {
    m(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Td.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Nd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhsh_free(e >>> 0, 1));
class ob {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bhsh_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} heigth
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Nd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Dd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bldd_free(e >>> 0, 1));
class ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bldd_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_ptr
  * @param {RegId} blob_id_ptr
  * @param {RegId} offset
  * @param {RegId} len
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, Dd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Qd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bsiz_free(e >>> 0, 1));
class cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bsiz_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} blob_id_ptr
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Qd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Fd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_burn_free(e >>> 0, 1));
class db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_burn_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} amount
  * @param {RegId} sub_id_addr
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Fd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Od = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_call_free(e >>> 0, 1));
class ub {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Od.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_call_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} target_struct
  * @param {RegId} fwd_coins
  * @param {RegId} asset_id_addr
  * @param {RegId} fwd_gas
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, Od.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Md = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cb_free(e >>> 0, 1));
class _b {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Md.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cb_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  */
  constructor(t) {
    m(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Md.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Ld = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ccp_free(e >>> 0, 1));
class hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ld.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ccp_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} contract_id_addr
  * @param {RegId} offset
  * @param {RegId} len
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, Ld.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Pd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfe_free(e >>> 0, 1));
class lb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfe_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} amount
  */
  constructor(t) {
    m(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Pd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const kd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfei_free(e >>> 0, 1));
class Ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfei_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} amount
  */
  constructor(t) {
    m(t, be);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, kd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return be.__wrap(t);
  }
}
const Ud = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfs_free(e >>> 0, 1));
class pb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ud.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfs_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} amount
  */
  constructor(t) {
    m(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Ud.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const zd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfsi_free(e >>> 0, 1));
class fb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfsi_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} amount
  */
  constructor(t) {
    m(t, be);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, zd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return be.__wrap(t);
  }
}
const Gd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_croo_free(e >>> 0, 1));
class gb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_croo_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} contract_id_addr
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Gd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Vd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_csiz_free(e >>> 0, 1));
class wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_csiz_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} contract_id_addr
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Vd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Hd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_compareargs_free(e >>> 0, 1));
class Mr {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Mr.prototype);
    return r.__wbg_ptr = t, Hd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_compareargs_free(t, 0);
  }
  /**
  * Comparison mode
  * @returns {CompareMode}
  */
  get mode() {
    return c.__wbg_get_compareargs_mode(this.__wbg_ptr);
  }
  /**
  * Comparison mode
  * @param {CompareMode} arg0
  */
  set mode(t) {
    c.__wbg_set_compareargs_mode(this.__wbg_ptr, t);
  }
  /**
  * Load RHS from register if true, otherwise zero-extend register value
  * @returns {boolean}
  */
  get indirect_rhs() {
    return c.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
  * Load RHS from register if true, otherwise zero-extend register value
  * @param {boolean} arg0
  */
  set indirect_rhs(t) {
    c.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, t);
  }
  /**
  * Convert to immediate value.
  * @returns {Imm06}
  */
  to_imm() {
    const t = this.__destroy_into_raw(), r = c.compareargs_to_imm(t);
    return Tt.__wrap(r);
  }
  /**
  * Construct from `Imm06`. Returns `None` if the value has reserved flags set.
  * @param {Imm06} bits
  * @returns {CompareArgs | undefined}
  */
  static from_imm(t) {
    m(t, Tt);
    var r = t.__destroy_into_raw();
    const n = c.compareargs_from_imm(r);
    return n === 0 ? void 0 : Mr.__wrap(n);
  }
}
const Yd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_div_free(e >>> 0, 1));
class mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_div_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Yd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Xd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divi_free(e >>> 0, 1));
class yb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_divi_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Xd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const bb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divargs_free(e >>> 0, 1));
class ls {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_divargs_free(t, 0);
  }
  /**
  * Load RHS from register if true, otherwise zero-extend register value
  * @returns {boolean}
  */
  get indirect_rhs() {
    return c.__wbg_get_divargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
  * Load RHS from register if true, otherwise zero-extend register value
  * @param {boolean} arg0
  */
  set indirect_rhs(t) {
    c.__wbg_set_divargs_indirect_rhs(this.__wbg_ptr, t);
  }
}
const Wd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecal_free(e >>> 0, 1));
class Ib {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecal_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} a
  * @param {RegId} b
  * @param {RegId} c
  * @param {RegId} d
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, Wd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Zd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eck1_free(e >>> 0, 1));
class Eb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_eck1_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} sig_addr
  * @param {RegId} msg_hash_addr
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Zd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const jd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecr1_free(e >>> 0, 1));
class vb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, jd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecr1_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} sig_addr
  * @param {RegId} msg_hash_addr
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, jd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Jd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ed19_free(e >>> 0, 1));
class Cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ed19_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} pub_key_addr
  * @param {RegId} sig_addr
  * @param {RegId} msg_addr
  * @param {RegId} msg_len
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, Jd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const qd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eq_free(e >>> 0, 1));
class Bb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_eq_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, qd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const $d = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_exp_free(e >>> 0, 1));
class xb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $d.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_exp_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, $d.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Kd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_expi_free(e >>> 0, 1));
class Rb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_expi_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Kd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const tu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_flag_free(e >>> 0, 1));
class Sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_flag_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} value
  */
  constructor(t) {
    m(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, tu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const co = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gm_free(e >>> 0, 1));
class ri {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ri.prototype);
    return r.__wbg_ptr = t, co.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, co.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gm_free(t, 0);
  }
  /**
  * Construct a `GM` instruction from its arguments.
  * @param {RegId} ra
  * @param {GMArgs} args
  * @returns {GM}
  */
  static from_args(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    const s = c.gm_from_args(n, r);
    return ri.__wrap(s);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {Imm18} selector
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.gm_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, co.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Se.__wrap(t);
  }
}
const eu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gt_free(e >>> 0, 1));
class Tb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, eu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gt_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, eu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const uo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gtf_free(e >>> 0, 1));
class ni {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ni.prototype);
    return r.__wbg_ptr = t, uo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uo.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gtf_free(t, 0);
  }
  /**
  * Construct a `GTF` instruction from its arguments.
  * @param {RegId} ra
  * @param {RegId} rb
  * @param {GTFArgs} args
  * @returns {GTF}
  */
  static from_args(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    const o = c.gtf_from_args(s, i, n);
    return ni.__wrap(o);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} arg
  * @param {Imm12} selector
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.gtf_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, uo.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const ru = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm06_free(e >>> 0, 1));
class Tt {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Tt.prototype);
    return r.__wbg_ptr = t, ru.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ru.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm06_free(t, 0);
  }
}
const nu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm12_free(e >>> 0, 1));
class ht {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ht.prototype);
    return r.__wbg_ptr = t, nu.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm12_free(t, 0);
  }
}
const su = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm18_free(e >>> 0, 1));
class Se {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Se.prototype);
    return r.__wbg_ptr = t, su.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, su.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm18_free(t, 0);
  }
}
const iu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm24_free(e >>> 0, 1));
class be {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(be.prototype);
    return r.__wbg_ptr = t, iu.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, iu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm24_free(t, 0);
  }
}
const ou = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_instruction_free(e >>> 0, 1));
class k {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(k.prototype);
    return r.__wbg_ptr = t, ou.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ou.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_instruction_free(t, 0);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = c.__wbindgen_add_to_stack_pointer(-16);
      c.instruction_to_bytes(s, this.__wbg_ptr);
      var t = Ed().getInt32(s + 4 * 0, !0), r = Ed().getInt32(s + 4 * 1, !0), n = Zy(t, r).slice();
      return c.__wbindgen_export_0(t, r * 1, 1), n;
    } finally {
      c.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * Size of an instruction in bytes
  * @returns {number}
  */
  static size() {
    return c.instruction_size() >>> 0;
  }
}
const au = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ji_free(e >>> 0, 1));
class Nb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, au.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ji_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} abs_target
  */
  constructor(t) {
    m(t, be);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, au.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return be.__wrap(t);
  }
}
const cu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmp_free(e >>> 0, 1));
class Db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmp_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} abs_target
  */
  constructor(t) {
    m(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, cu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const du = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpb_free(e >>> 0, 1));
class Qb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, du.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmpb_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dynamic
  * @param {Imm18} fixed
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, du.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Se.__wrap(t);
  }
}
const uu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpf_free(e >>> 0, 1));
class Fb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmpf_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dynamic
  * @param {Imm18} fixed
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, uu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Se.__wrap(t);
  }
}
const _u = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jne_free(e >>> 0, 1));
class Ob {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _u.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jne_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} abs_target
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, _u.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const hu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jneb_free(e >>> 0, 1));
class Mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jneb_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_lhs
  * @param {RegId} cond_rhs
  * @param {RegId} dynamic
  * @param {Imm06} fixed
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, hu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const lu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnef_free(e >>> 0, 1));
class Lb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnef_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_lhs
  * @param {RegId} cond_rhs
  * @param {RegId} dynamic
  * @param {Imm06} fixed
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, lu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const Au = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnei_free(e >>> 0, 1));
class Pb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Au.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnei_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_lhs
  * @param {RegId} cond_rhs
  * @param {Imm12} abs_target
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Au.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const pu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzb_free(e >>> 0, 1));
class kb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzb_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_nz
  * @param {RegId} dynamic
  * @param {Imm12} fixed
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, pu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const fu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzf_free(e >>> 0, 1));
class Ub {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzf_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_nz
  * @param {RegId} dynamic
  * @param {Imm12} fixed
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, fu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const gu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzi_free(e >>> 0, 1));
class zb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzi_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_nz
  * @param {Imm18} abs_target
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, gu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Se.__wrap(t);
  }
}
const wu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_k256_free(e >>> 0, 1));
class Gb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_k256_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} src_addr
  * @param {RegId} len
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, wu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const mu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lb_free(e >>> 0, 1));
class Vb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lb_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} addr
  * @param {Imm12} offset
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, mu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const yu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ldc_free(e >>> 0, 1));
class Hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ldc_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} src_addr
  * @param {RegId} offset
  * @param {RegId} len
  * @param {Imm06} mode
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, yu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const bu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_log_free(e >>> 0, 1));
class Yb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_log_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} a
  * @param {RegId} b
  * @param {RegId} c
  * @param {RegId} d
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, bu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Iu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_logd_free(e >>> 0, 1));
class Xb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Iu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_logd_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} a
  * @param {RegId} b
  * @param {RegId} addr
  * @param {RegId} len
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, Iu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Eu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lt_free(e >>> 0, 1));
class Wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Eu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lt_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Eu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const vu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lw_free(e >>> 0, 1));
class Zb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lw_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} addr
  * @param {Imm12} offset
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, vu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const Cu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcl_free(e >>> 0, 1));
class jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcl_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} len
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Cu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Bu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcli_free(e >>> 0, 1));
class Jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcli_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} addr
  * @param {Imm18} count
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Bu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Se.__wrap(t);
  }
}
const xu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcp_free(e >>> 0, 1));
class qb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcp_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} src_addr
  * @param {RegId} len
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, xu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Ru = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcpi_free(e >>> 0, 1));
class $b {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ru.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcpi_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} src_addr
  * @param {Imm12} len
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Ru.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const Su = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_meq_free(e >>> 0, 1));
class Kb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Su.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_meq_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} result
  * @param {RegId} lhs_addr
  * @param {RegId} rhs_addr
  * @param {RegId} len
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, Su.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Tu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mint_free(e >>> 0, 1));
class tI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Tu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mint_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} amount
  * @param {RegId} sub_id_addr
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Tu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Nu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mldv_free(e >>> 0, 1));
class eI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mldv_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} mul_lhs
  * @param {RegId} mul_rhs
  * @param {RegId} divisor
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, Nu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Du = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mlog_free(e >>> 0, 1));
class rI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Du.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mlog_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Du.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Qu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mod_free(e >>> 0, 1));
class nI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mod_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Qu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Fu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_modi_free(e >>> 0, 1));
class sI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_modi_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Fu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const Ou = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_move_free(e >>> 0, 1));
class iI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ou.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_move_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} src
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Ou.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Mu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_movi_free(e >>> 0, 1));
class oI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Mu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_movi_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {Imm18} val
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Mu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Se.__wrap(t);
  }
}
const Lu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mroo_free(e >>> 0, 1));
class aI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Lu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mroo_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Lu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Pu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mul_free(e >>> 0, 1));
class cI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mul_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Pu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const ku = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_muli_free(e >>> 0, 1));
class dI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ku.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_muli_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, ku.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const uI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mathargs_free(e >>> 0, 1));
class As {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mathargs_free(t, 0);
  }
  /**
  * The operation to perform
  * @returns {MathOp}
  */
  get op() {
    return c.__wbg_get_mathargs_op(this.__wbg_ptr);
  }
  /**
  * The operation to perform
  * @param {MathOp} arg0
  */
  set op(t) {
    c.__wbg_set_mathargs_op(this.__wbg_ptr, t);
  }
  /**
  * Load RHS from register if true, otherwise zero-extend register value
  * @returns {boolean}
  */
  get indirect_rhs() {
    return c.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
  * Load RHS from register if true, otherwise zero-extend register value
  * @param {boolean} arg0
  */
  set indirect_rhs(t) {
    c.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, t);
  }
}
const _I = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mulargs_free(e >>> 0, 1));
class ps {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _I.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mulargs_free(t, 0);
  }
  /**
  * Load LHSS from register if true, otherwise zero-extend register value
  * @returns {boolean}
  */
  get indirect_lhs() {
    return c.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
  * Load LHSS from register if true, otherwise zero-extend register value
  * @param {boolean} arg0
  */
  set indirect_lhs(t) {
    c.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, t);
  }
  /**
  * Load RHS from register if true, otherwise zero-extend register value
  * @returns {boolean}
  */
  get indirect_rhs() {
    return c.__wbg_get_mulargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
  * Load RHS from register if true, otherwise zero-extend register value
  * @param {boolean} arg0
  */
  set indirect_rhs(t) {
    c.__wbg_set_mulargs_indirect_rhs(this.__wbg_ptr, t);
  }
}
const Uu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_noop_free(e >>> 0, 1));
class hI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Uu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_noop_free(t, 0);
  }
  /**
  * Construct the instruction.
  */
  constructor() {
    const t = c.noop_new_typescript();
    return this.__wbg_ptr = t >>> 0, Uu.register(this, this.__wbg_ptr, this), this;
  }
}
const zu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_not_free(e >>> 0, 1));
class lI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_not_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} arg
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, zu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Gu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_or_free(e >>> 0, 1));
class AI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_or_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Gu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Vu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ori_free(e >>> 0, 1));
class pI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ori_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Vu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const Hu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_poph_free(e >>> 0, 1));
class fI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_poph_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} bitmask
  */
  constructor(t) {
    m(t, be);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Hu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return be.__wrap(t);
  }
}
const Yu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_popl_free(e >>> 0, 1));
class gI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_popl_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} bitmask
  */
  constructor(t) {
    m(t, be);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Yu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return be.__wrap(t);
  }
}
const Xu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshh_free(e >>> 0, 1));
class wI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_pshh_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} bitmask
  */
  constructor(t) {
    m(t, be);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Xu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return be.__wrap(t);
  }
}
const Wu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshl_free(e >>> 0, 1));
class mI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_pshl_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} bitmask
  */
  constructor(t) {
    m(t, be);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Wu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return be.__wrap(t);
  }
}
const Zu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_panicinstruction_free(e >>> 0, 1));
class yI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_panicinstruction_free(t, 0);
  }
  /**
  * Represents an error described by a reason and an instruction.
  * @param {PanicReason} reason
  * @param {number} instruction
  */
  constructor(t, r) {
    const n = c.panicinstruction_error_typescript(t, r);
    return this.__wbg_ptr = n >>> 0, Zu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Underlying panic reason
  * @returns {PanicReason}
  */
  reason() {
    return c.panicinstruction_reason(this.__wbg_ptr);
  }
  /**
  * Underlying instruction
  * @returns {number}
  */
  instruction() {
    return c.panicinstruction_instruction(this.__wbg_ptr) >>> 0;
  }
}
const ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ret_free(e >>> 0, 1));
class bI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ju.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ret_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} value
  */
  constructor(t) {
    m(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, ju.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_retd_free(e >>> 0, 1));
class II {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ju.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_retd_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} addr
  * @param {RegId} len
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Ju.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const qu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_rvrt_free(e >>> 0, 1));
class EI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_rvrt_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} value
  */
  constructor(t) {
    m(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, qu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const _o = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_regid_free(e >>> 0, 1));
class h {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(h.prototype);
    return r.__wbg_ptr = t, _o.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _o.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_regid_free(t, 0);
  }
  /**
  * Construct a register ID from the given value.
  *
  * Returns `None` if the value is outside the 6-bit value range.
  * @param {number} u
  * @returns {RegId | undefined}
  */
  static new_checked(t) {
    const r = c.regid_new_checked(t);
    return r === 0 ? void 0 : h.__wrap(r);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = c.regid_bal();
    return h.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = c.regid_cgas();
    return h.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = c.regid_err();
    return h.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = c.regid_flag();
    return h.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = c.regid_fp();
    return h.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = c.regid_ggas();
    return h.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = c.regid_hp();
    return h.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = c.regid_is();
    return h.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = c.regid_of();
    return h.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = c.regid_one();
    return h.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = c.regid_pc();
    return h.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = c.regid_ret();
    return h.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = c.regid_retl();
    return h.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = c.regid_sp();
    return h.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = c.regid_spp();
    return h.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = c.regid_writable();
    return h.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = c.regid_zero();
    return h.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const r = c.regid_new_typescript(t);
    return this.__wbg_ptr = r >>> 0, _o.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * A const alternative to the `Into<u8>` implementation.
  * @returns {number}
  */
  to_u8() {
    const t = this.__destroy_into_raw();
    return c.regid_to_u8(t);
  }
}
const $u = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_s256_free(e >>> 0, 1));
class vI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $u.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_s256_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} src_addr
  * @param {RegId} len
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, $u.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Ku = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sb_free(e >>> 0, 1));
class CI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ku.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sb_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} addr
  * @param {RegId} value
  * @param {Imm12} offset
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Ku.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const t_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_scwq_free(e >>> 0, 1));
class BI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_scwq_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} key_addr
  * @param {RegId} status
  * @param {RegId} lenq
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, t_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const e_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sll_free(e >>> 0, 1));
class xI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, e_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sll_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, e_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const r_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_slli_free(e >>> 0, 1));
class RI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, r_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_slli_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, r_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const n_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_smo_free(e >>> 0, 1));
class SI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, n_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_smo_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} recipient_addr
  * @param {RegId} data_addr
  * @param {RegId} data_len
  * @param {RegId} coins
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, n_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const s_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srl_free(e >>> 0, 1));
class TI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, s_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srl_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, s_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const i_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srli_free(e >>> 0, 1));
class NI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, i_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srli_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, i_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const o_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srw_free(e >>> 0, 1));
class DI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, o_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srw_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} status
  * @param {RegId} key_addr
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, o_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const a_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srwq_free(e >>> 0, 1));
class QI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, a_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srwq_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} status
  * @param {RegId} key_addr
  * @param {RegId} lenq
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, a_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const c_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sub_free(e >>> 0, 1));
class FI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, c_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sub_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, c_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const d_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_subi_free(e >>> 0, 1));
class OI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, d_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_subi_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, d_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const u_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sw_free(e >>> 0, 1));
class MI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, u_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sw_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} addr
  * @param {RegId} value
  * @param {Imm12} offset
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, u_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
const __ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sww_free(e >>> 0, 1));
class LI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, __.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sww_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} key_addr
  * @param {RegId} status
  * @param {RegId} value
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, __.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const h_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_swwq_free(e >>> 0, 1));
class PI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, h_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_swwq_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} key_addr
  * @param {RegId} status
  * @param {RegId} src_addr
  * @param {RegId} lenq
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, h_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const l_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_time_free(e >>> 0, 1));
class kI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, l_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_time_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} heigth
  */
  constructor(t, r) {
    m(t, h);
    var n = t.__destroy_into_raw();
    m(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, l_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const A_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tr_free(e >>> 0, 1));
class UI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, A_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_tr_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} contract_id_addr
  * @param {RegId} amount
  * @param {RegId} asset_id_addr
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, A_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const p_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tro_free(e >>> 0, 1));
class zI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, p_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_tro_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} contract_id_addr
  * @param {RegId} output_index
  * @param {RegId} amount
  * @param {RegId} asset_id_addr
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, p_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const f_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdam_free(e >>> 0, 1));
class GI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, f_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdam_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} add_lhs
  * @param {RegId} add_rhs
  * @param {RegId} modulo
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, f_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const ho = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdcm_free(e >>> 0, 1));
class si {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(si.prototype);
    return r.__wbg_ptr = t, ho.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ho.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdcm_free(t, 0);
  }
  /**
  * Construct a `WDCM` instruction from its arguments.
  * @param {RegId} ra
  * @param {RegId} rb
  * @param {RegId} rc
  * @param {CompareArgs} args
  * @returns {WDCM}
  */
  static from_args(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Mr);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_from_args(i, o, a, u);
    return si.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, ho.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const lo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wddv_free(e >>> 0, 1));
class ii {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ii.prototype);
    return r.__wbg_ptr = t, lo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lo.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wddv_free(t, 0);
  }
  /**
  * Construct a `WDDV` instruction from its arguments.
  * @param {RegId} ra
  * @param {RegId} rb
  * @param {RegId} rc
  * @param {DivArgs} args
  * @returns {WDDV}
  */
  static from_args(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, ls);
    var u = s.__destroy_into_raw();
    const A = c.wddv_from_args(i, o, a, u);
    return ii.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, lo.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const g_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmd_free(e >>> 0, 1));
class VI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, g_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdmd_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} mul_lhs
  * @param {RegId} mul_rhs
  * @param {RegId} divisor
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, g_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Ao = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdml_free(e >>> 0, 1));
class oi {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(oi.prototype);
    return r.__wbg_ptr = t, Ao.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ao.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdml_free(t, 0);
  }
  /**
  * Construct a `WDML` instruction from its arguments.
  * @param {RegId} ra
  * @param {RegId} rb
  * @param {RegId} rc
  * @param {MulArgs} args
  * @returns {WDML}
  */
  static from_args(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, ps);
    var u = s.__destroy_into_raw();
    const A = c.wdml_from_args(i, o, a, u);
    return oi.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, Ao.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const w_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmm_free(e >>> 0, 1));
class HI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, w_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdmm_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} mul_lhs
  * @param {RegId} mul_rhs
  * @param {RegId} modulo
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, w_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const po = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdop_free(e >>> 0, 1));
class ai {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ai.prototype);
    return r.__wbg_ptr = t, po.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, po.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdop_free(t, 0);
  }
  /**
  * Construct a `WDOP` instruction from its arguments.
  * @param {RegId} ra
  * @param {RegId} rb
  * @param {RegId} rc
  * @param {MathArgs} args
  * @returns {WDOP}
  */
  static from_args(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, As);
    var u = s.__destroy_into_raw();
    const A = c.wdop_from_args(i, o, a, u);
    return ai.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, po.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const m_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqam_free(e >>> 0, 1));
class YI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, m_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqam_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} add_lhs
  * @param {RegId} add_rhs
  * @param {RegId} modulo
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, m_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const fo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqcm_free(e >>> 0, 1));
class ci {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ci.prototype);
    return r.__wbg_ptr = t, fo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fo.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqcm_free(t, 0);
  }
  /**
  * Construct a `WQCM` instruction from its arguments.
  * @param {RegId} ra
  * @param {RegId} rb
  * @param {RegId} rc
  * @param {CompareArgs} args
  * @returns {WQCM}
  */
  static from_args(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Mr);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_from_args(i, o, a, u);
    return ci.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, fo.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const go = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqdv_free(e >>> 0, 1));
class di {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(di.prototype);
    return r.__wbg_ptr = t, go.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, go.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqdv_free(t, 0);
  }
  /**
  * Construct a `WQDV` instruction from its arguments.
  * @param {RegId} ra
  * @param {RegId} rb
  * @param {RegId} rc
  * @param {DivArgs} args
  * @returns {WQDV}
  */
  static from_args(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, ls);
    var u = s.__destroy_into_raw();
    const A = c.wddv_from_args(i, o, a, u);
    return di.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, go.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const y_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmd_free(e >>> 0, 1));
class XI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, y_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqmd_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} mul_lhs
  * @param {RegId} mul_rhs
  * @param {RegId} divisor
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, y_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const wo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqml_free(e >>> 0, 1));
class ui {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ui.prototype);
    return r.__wbg_ptr = t, wo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wo.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqml_free(t, 0);
  }
  /**
  * Construct a `WQML` instruction from its arguments.
  * @param {RegId} ra
  * @param {RegId} rb
  * @param {RegId} rc
  * @param {MulArgs} args
  * @returns {WQML}
  */
  static from_args(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, ps);
    var u = s.__destroy_into_raw();
    const A = c.wdml_from_args(i, o, a, u);
    return ui.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, wo.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const b_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmm_free(e >>> 0, 1));
class WI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, b_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqmm_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} mul_lhs
  * @param {RegId} mul_rhs
  * @param {RegId} modulo
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, b_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const mo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqop_free(e >>> 0, 1));
class _i {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(_i.prototype);
    return r.__wbg_ptr = t, mo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mo.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqop_free(t, 0);
  }
  /**
  * Construct a `WQOP` instruction from its arguments.
  * @param {RegId} ra
  * @param {RegId} rb
  * @param {RegId} rc
  * @param {MathArgs} args
  * @returns {WQOP}
  */
  static from_args(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, As);
    var u = s.__destroy_into_raw();
    const A = c.wdop_from_args(i, o, a, u);
    return _i.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    m(t, h);
    var i = t.__destroy_into_raw();
    m(r, h);
    var o = r.__destroy_into_raw();
    m(n, h);
    var a = n.__destroy_into_raw();
    m(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = A >>> 0, mo.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const I_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xor_free(e >>> 0, 1));
class ZI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, I_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_xor_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, h);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, I_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const E_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xori_free(e >>> 0, 1));
class jI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, E_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_xori_free(t, 0);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    m(t, h);
    var s = t.__destroy_into_raw();
    m(r, h);
    var i = r.__destroy_into_raw();
    m(n, ht);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, E_.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return ht.__wrap(t);
  }
}
async function JI(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (n) {
        if (e.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", n);
        else
          throw n;
      }
    const r = await e.arrayBuffer();
    return await WebAssembly.instantiate(r, t);
  } else {
    const r = await WebAssembly.instantiate(e, t);
    return r instanceof WebAssembly.Instance ? { instance: r, module: e } : r;
  }
}
function Ul() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, r) {
    throw new Error(j0(t, r));
  }, e;
}
function zl(e, t) {
  return c = e.exports, Gl.__wbindgen_wasm_module = t, Ur = null, Vn = null, c;
}
function qI(e) {
  if (c !== void 0) return c;
  typeof e < "u" && Object.getPrototypeOf(e) === Object.prototype ? { module: e } = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
  const t = Ul();
  e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e));
  const r = new WebAssembly.Instance(e, t);
  return zl(r, e);
}
async function Gl(e) {
  if (c !== void 0) return c;
  typeof e < "u" && Object.getPrototypeOf(e) === Object.prototype ? { module_or_path: e } = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead");
  const t = Ul(), { instance: r, module: n } = await JI(await e, t);
  return zl(r, n);
}
function $I(e, t, r, n) {
  var s = null, i = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (i)
    s = Buffer.from(r, "base64");
  else {
    var o = globalThis.atob(r), a = o.length;
    s = new Uint8Array(new ArrayBuffer(a));
    for (var u = 0; u < a; u++)
      s[u] = o.charCodeAt(u);
  }
  {
    var A = new WebAssembly.Module(s);
    return n ? new WebAssembly.Instance(A, n) : A;
  }
}
function KI(e) {
  return $I(1, null, "AGFzbQEAAAABOgpgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38AYAJ/fwF/YAABf2AFf39/f38Bf2ABfwBgA39/fwBgAAACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cAAwP/Af0BAQEDAwMDAwMBAQMDAQEBAwMBAQEEAQMDAwEBAwEBAQQCAQMCAgICAgIDAwMEBAQEBAQEBAEBAQMDAAICBAQEBAQEBAQEBAABAQgDAwQBAQEBAQEBAgcDAQAAAQEDBwcBAwEDAgIBAQEAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQUBAQEBBAAEAQYCAgMDAAIABwEIBAEEAQkDAQEHAQUFBQUFBQUFBQUFBQUFBQUFBQUDBgYCAgQCBgYAAAgABAUDAQARBgkBfwFBgIDAAAsHjUzPBQZtZW1vcnkCABZfX3diZ19jb21wYXJlYXJnc19mcmVlABAaX193YmdfZ2V0X2NvbXBhcmVhcmdzX21vZGUASBpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQA4Il9fd2JnX2dldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMASSJfX3diZ19zZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAEsSY29tcGFyZWFyZ3NfdG9faW1tAFgUY29tcGFyZWFyZ3NfZnJvbV9pbW0AHxVfX3diZ19nZXRfbWF0aGFyZ3Nfb3AASBVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AAORJfX3diZ19tdWxhcmdzX2ZyZWUAER5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMASB5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMATBJfX3diZ19kaXZhcmdzX2ZyZWUAIx5fX3diZ19nZXRfZGl2YXJnc19pbmRpcmVjdF9yaHMAuQEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAGMbX193YmdfcGFuaWNpbnN0cnVjdGlvbl9mcmVlABchcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AE0XcGFuaWNpbnN0cnVjdGlvbl9yZWFzb24AWxxwYW5pY2luc3RydWN0aW9uX2luc3RydWN0aW9uAFwMZ21fZnJvbV9hcmdzANUBDWd0Zl9mcm9tX2FyZ3MAzQEHZ21fYXJncwCIAQhndGZfYXJncwBpDndkY21fZnJvbV9hcmdzADsOd2RvcF9mcm9tX2FyZ3MAOw53ZG1sX2Zyb21fYXJncwA8DndkZHZfZnJvbV9hcmdzAMkBCXdkY21fYXJncwAkCXdxY21fYXJncwAlCXdkb3BfYXJncwAmCXdxb3BfYXJncwAnCXdkbWxfYXJncwAoCXdxbWxfYXJncwApCXdkZHZfYXJncwBkCXdxZHZfYXJncwBlEF9fd2JnX2ltbTA2X2ZyZWUAKhBfX3diZ19pbW0xMl9mcmVlACsQX193YmdfaW1tMThfZnJlZQAsDl9fd2JnX2FkZF9mcmVlABgPX193Ymdfbm9vcF9mcmVlAAcSYWRkX25ld190eXBlc2NyaXB0AFkGYWRkX3JhADUGYWRkX3JiABIGYWRkX3JjABoDYWRkAMUBA2FuZACKAQNkaXYAiwECZXEAjAEDZXhwAI0BAmd0AI4BAmx0AI8BBG1sb2cAkAEEbXJvbwCRAQRtb2RfAJIBBW1vdmVfAD0DbXVsAJMBA25vdAA+Am9yAJQBA3NsbACVAQNzcmwAlgEDc3ViAJcBA3hvcgCYAQRtbGR2AGoDcmV0ALoBBHJldGQAPxNhbG9jX25ld190eXBlc2NyaXB0AGAHYWxvY19yYQAiBGFsb2MAuwEDbWNsAEADbWNwAJkBA21lcQBrE2Joc2hfbmV3X3R5cGVzY3JpcHQAIARiaHNoAC0EYmhlaQC8AQRidXJuAEEEY2FsbABsA2NjcABtBGNyb28AQgRjc2l6AEMCY2IAvQEDbGRjAG4DbG9nAG8EbG9nZABwBG1pbnQARARydnJ0AL4BBHNjd3EAmgEDc3J3AJsBBHNyd3EAcQNzd3cAnAEEc3d3cQByAnRyAJ0BA3RybwBzBGVjazEAngEEZWNyMQCfAQRlZDE5AHQEazI1NgCgAQRzMjU2AKEBBHRpbWUARRNub29wX25ld190eXBlc2NyaXB0AL8BBG5vb3AA3QEEZmxhZwDAAQNiYWwAogEDam1wAMEBA2puZQCjAQNzbW8AdRNhZGRpX25ld190eXBlc2NyaXB0AFoKYWRkaV9pbW0xMgAJBGFkZGkApAEEYW5kaQClAQRkaXZpAKYBBGV4cGkApwEEbW9kaQCoAQRtdWxpAKkBA29yaQCqAQRzbGxpAKsBBHNybGkArAEEc3ViaQCtAQR4b3JpAK4BBGpuZWkArwECbGIAsAECbHcAsQECc2IAsgECc3cAswEEbWNwaQC0ARJndGZfbmV3X3R5cGVzY3JpcHQAzwEDZ3RmALUBBG1jbGkALhFnbV9uZXdfdHlwZXNjcmlwdABGCGdtX2ltbTE4AA0CZ20ALwRtb3ZpADAEam56aQAxBGptcGYAMhNqbXBiX25ld190eXBlc2NyaXB0ABUEam1wYgAzBGpuemYAtgEEam56YgC3AQRqbmVmAHYKam5lYl9pbW0wNgA2BGpuZWIAdwJqaQBOE2NmZWlfbmV3X3R5cGVzY3JpcHQANwpjZmVpX2ltbTI0AAoEY2ZlaQBPBGNmc2kAUANjZmUAwgEDY2ZzAMMBBHBzaGwAUQRwc2hoAFIEcG9wbABTBHBvcGgAVBN3ZGNtX25ld190eXBlc2NyaXB0AMoBBHdkY20AeAR3cWNtAHkEd2RvcAB6BHdxb3AAewR3ZG1sAHwEd3FtbAB9BHdkZHYAfgR3cWR2AH8Ed2RtZACAAQR3cW1kAIEBBHdkYW0AggEEd3FhbQCDAQR3ZG1tAIQBBHdxbW0AhQEEZWNhbACGAQRic2l6ADQTYmxkZF9uZXdfdHlwZXNjcmlwdABVB2JsZGRfcmQANgRibGRkAIcBFl9fd2JnX2luc3RydWN0aW9uX2ZyZWUADBRpbnN0cnVjdGlvbl90b19ieXRlcwAGEGluc3RydWN0aW9uX3NpemUA7wERcmVnaWRfbmV3X2NoZWNrZWQAuAEJcmVnaWRfYmFsAN4BCnJlZ2lkX2NnYXMA3wEJcmVnaWRfZXJyAOABCnJlZ2lkX2ZsYWcA4QEIcmVnaWRfZnAA4gEKcmVnaWRfZ2dhcwDjAQhyZWdpZF9ocADkAQhyZWdpZF9pcwDlAQhyZWdpZF9vZgDmAQlyZWdpZF9vbmUA5wEIcmVnaWRfcGMA6AEJcmVnaWRfcmV0AOkBCnJlZ2lkX3JldGwA6gEIcmVnaWRfc3AA6wEJcmVnaWRfc3BwAOwBDnJlZ2lkX3dyaXRhYmxlAO0BCnJlZ2lkX3plcm8A7gEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA2QELcmVnaWRfdG9fdTgA2gESYW5kX25ld190eXBlc2NyaXB0AFkSZGl2X25ld190eXBlc2NyaXB0AFkRZXFfbmV3X3R5cGVzY3JpcHQAWRJleHBfbmV3X3R5cGVzY3JpcHQAWRFndF9uZXdfdHlwZXNjcmlwdABZEWx0X25ld190eXBlc2NyaXB0AFkTbWxvZ19uZXdfdHlwZXNjcmlwdABZE21yb29fbmV3X3R5cGVzY3JpcHQAWRJtb2RfbmV3X3R5cGVzY3JpcHQAWRJtdWxfbmV3X3R5cGVzY3JpcHQAWRFvcl9uZXdfdHlwZXNjcmlwdABZEnNsbF9uZXdfdHlwZXNjcmlwdABZEnNybF9uZXdfdHlwZXNjcmlwdABZEnN1Yl9uZXdfdHlwZXNjcmlwdABZEnhvcl9uZXdfdHlwZXNjcmlwdABZEm1jcF9uZXdfdHlwZXNjcmlwdABZE3Njd3FfbmV3X3R5cGVzY3JpcHQAWRJzcndfbmV3X3R5cGVzY3JpcHQAWRJzd3dfbmV3X3R5cGVzY3JpcHQAWRF0cl9uZXdfdHlwZXNjcmlwdABZE2VjazFfbmV3X3R5cGVzY3JpcHQAWRNlY3IxX25ld190eXBlc2NyaXB0AFkTazI1Nl9uZXdfdHlwZXNjcmlwdABZE3MyNTZfbmV3X3R5cGVzY3JpcHQAWRJiYWxfbmV3X3R5cGVzY3JpcHQAWRJqbmVfbmV3X3R5cGVzY3JpcHQAWRNhbmRpX25ld190eXBlc2NyaXB0AFoTZGl2aV9uZXdfdHlwZXNjcmlwdABaE2V4cGlfbmV3X3R5cGVzY3JpcHQAWhNtb2RpX25ld190eXBlc2NyaXB0AFoTbXVsaV9uZXdfdHlwZXNjcmlwdABaEm9yaV9uZXdfdHlwZXNjcmlwdABaE3NsbGlfbmV3X3R5cGVzY3JpcHQAWhNzcmxpX25ld190eXBlc2NyaXB0AFoTc3ViaV9uZXdfdHlwZXNjcmlwdABaE3hvcmlfbmV3X3R5cGVzY3JpcHQAWhNqbmVpX25ld190eXBlc2NyaXB0AFoRbGJfbmV3X3R5cGVzY3JpcHQAWhFsd19uZXdfdHlwZXNjcmlwdABaEXNiX25ld190eXBlc2NyaXB0AFoRc3dfbmV3X3R5cGVzY3JpcHQAWhNtY3BpX25ld190eXBlc2NyaXB0AFoTam56Zl9uZXdfdHlwZXNjcmlwdABaE2puemJfbmV3X3R5cGVzY3JpcHQAWhFqaV9uZXdfdHlwZXNjcmlwdAA3E2Nmc2lfbmV3X3R5cGVzY3JpcHQANxNwc2hsX25ld190eXBlc2NyaXB0ADcTcHNoaF9uZXdfdHlwZXNjcmlwdAA3E3BvcGxfbmV3X3R5cGVzY3JpcHQANxNwb3BoX25ld190eXBlc2NyaXB0ADcTbW92aV9uZXdfdHlwZXNjcmlwdAAVE21jbGlfbmV3X3R5cGVzY3JpcHQAFRNqbnppX25ld190eXBlc2NyaXB0ABUTam1wZl9uZXdfdHlwZXNjcmlwdAAVEm5vdF9uZXdfdHlwZXNjcmlwdAAgE3JldGRfbmV3X3R5cGVzY3JpcHQAIBNtb3ZlX25ld190eXBlc2NyaXB0ACASbWNsX25ld190eXBlc2NyaXB0ACATYnVybl9uZXdfdHlwZXNjcmlwdAAgE2Nyb29fbmV3X3R5cGVzY3JpcHQAIBNjc2l6X25ld190eXBlc2NyaXB0ACATbWludF9uZXdfdHlwZXNjcmlwdAAgE3RpbWVfbmV3X3R5cGVzY3JpcHQAIBNic2l6X25ld190eXBlc2NyaXB0ACAGcmV0X3JhACIHYmhlaV9yYQAiBWNiX3JhACIHcnZydF9yYQAiB2ZsYWdfcmEAIgZqbXBfcmEAIghqaV9pbW0yNAAKCmNmc2lfaW1tMjQACgZjZmVfcmEAIgZjZnNfcmEAIgpwc2hsX2ltbTI0AAoKcHNoaF9pbW0yNAAKCnBvcGxfaW1tMjQACgpwb3BoX2ltbTI0AAoTbWxkdl9uZXdfdHlwZXNjcmlwdABVEm1lcV9uZXdfdHlwZXNjcmlwdABVEmNjcF9uZXdfdHlwZXNjcmlwdABVEmxvZ19uZXdfdHlwZXNjcmlwdABVE2xvZ2RfbmV3X3R5cGVzY3JpcHQAVRNzcndxX25ld190eXBlc2NyaXB0AFUTc3d3cV9uZXdfdHlwZXNjcmlwdABVEnRyb19uZXdfdHlwZXNjcmlwdABVE2VkMTlfbmV3X3R5cGVzY3JpcHQAVRJzbW9fbmV3X3R5cGVzY3JpcHQAVRJsZGNfbmV3X3R5cGVzY3JpcHQAVRNqbmVmX25ld190eXBlc2NyaXB0AFUTd2RtZF9uZXdfdHlwZXNjcmlwdABVE3dxbWRfbmV3X3R5cGVzY3JpcHQAVRN3ZGFtX25ld190eXBlc2NyaXB0AFUTd3FhbV9uZXdfdHlwZXNjcmlwdABVE3dkbW1fbmV3X3R5cGVzY3JpcHQAVRN3cW1tX25ld190eXBlc2NyaXB0AFUTZWNhbF9uZXdfdHlwZXNjcmlwdABVE2NhbGxfbmV3X3R5cGVzY3JpcHQAVRNfX3diZ19tYXRoYXJnc19mcmVlABAfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwBLHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X2xocwBLH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMASR5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9saHMASRJyZXRfbmV3X3R5cGVzY3JpcHQAYBNiaGVpX25ld190eXBlc2NyaXB0AGARY2JfbmV3X3R5cGVzY3JpcHQAYBNydnJ0X25ld190eXBlc2NyaXB0AGATZmxhZ19uZXdfdHlwZXNjcmlwdABgEmptcF9uZXdfdHlwZXNjcmlwdABgEmNmZV9uZXdfdHlwZXNjcmlwdABgEmNmc19uZXdfdHlwZXNjcmlwdABgD19fd2JnX3dkb3BfZnJlZQAYDl9fd2JnX21vZF9mcmVlABgPX193Ymdfd3Fkdl9mcmVlABgNX193Ymdfc2JfZnJlZQAYDl9fd2JnX3Ntb19mcmVlABgPX193YmdfcHNobF9mcmVlABgOX193YmdfbG9nX2ZyZWUAGA9fX3diZ193cWFtX2ZyZWUAGA9fX3diZ193cW1sX2ZyZWUAGA5fX3diZ19ub3RfZnJlZQAYD19fd2JnX2puemlfZnJlZQAYD19fd2JnX2puZWlfZnJlZQAYD19fd2JnX3N1YmlfZnJlZQAYD19fd2JnX2ZsYWdfZnJlZQAYD19fd2JnX2NzaXpfZnJlZQAYD19fd2JnX3Nyd3FfZnJlZQAYD19fd2JnX3NsbGlfZnJlZQAYD19fd2JnX2ptcGJfZnJlZQAYD19fd2JnX3dkbWxfZnJlZQAYD19fd2JnX3MyNTZfZnJlZQAYDl9fd2JnX3hvcl9mcmVlABgOX193YmdfY2ZlX2ZyZWUAGA1fX3diZ19ndF9mcmVlABgPX193YmdfcHNoaF9mcmVlABgPX193YmdfbWNsaV9mcmVlABgNX193YmdfbHRfZnJlZQAYD19fd2JnX2puZWZfZnJlZQAYDV9fd2JnX3N3X2ZyZWUAGA9fX3diZ19zcmxpX2ZyZWUAGA9fX3diZ19idXJuX2ZyZWUAGA9fX3diZ19ic2l6X2ZyZWUAGA9fX3diZ19ydnJ0X2ZyZWUAGA9fX3diZ194b3JpX2ZyZWUAGA9fX3diZ19tdWxpX2ZyZWUAGA1fX3diZ19sYl9mcmVlABgNX193YmdfZ21fZnJlZQAYD19fd2JnX2Joc2hfZnJlZQAYDV9fd2JnX2VxX2ZyZWUAGA5fX3diZ19zbGxfZnJlZQAYDl9fd2JnX29yaV9mcmVlABgPX193YmdfZWQxOV9mcmVlABgPX193YmdfY2ZlaV9mcmVlABgPX193YmdfY2ZzaV9mcmVlABgPX193Ymdfam56Yl9mcmVlABgPX193YmdfYWxvY19mcmVlABgOX193Ymdfc3JsX2ZyZWUAGA9fX3diZ19tcm9vX2ZyZWUAGA5fX3diZ19jZnNfZnJlZQAYDl9fd2JnX2ptcF9mcmVlABgPX193YmdfYmhlaV9mcmVlABgPX193YmdfbG9nZF9mcmVlABgPX193Ymdfam5lYl9mcmVlABgPX193Ymdfd3FtbV9mcmVlABgPX193YmdfcG9waF9mcmVlABgPX193Ymdfd2RjbV9mcmVlABgPX193YmdfZXhwaV9mcmVlABgPX193YmdfYWRkaV9mcmVlABgPX193YmdfYmxkZF9mcmVlABgOX193YmdfbGRjX2ZyZWUAGA5fX3diZ19kaXZfZnJlZQAYD19fd2JnX3dkZHZfZnJlZQAYD19fd2JnX21sZHZfZnJlZQAYDl9fd2JnX21jbF9mcmVlABgOX193YmdfbXVsX2ZyZWUAGA9fX3diZ193ZGFtX2ZyZWUAGA9fX3diZ19jYWxsX2ZyZWUAGA1fX3diZ19sd19mcmVlABgPX193YmdfZWNhbF9mcmVlABgPX193YmdfbWxvZ19mcmVlABgPX193YmdfcmV0ZF9mcmVlABgPX193YmdfdGltZV9mcmVlABgOX193YmdfZ3RmX2ZyZWUAGA5fX3diZ19qbmVfZnJlZQAYDV9fd2JnX29yX2ZyZWUAGA9fX3diZ19kaXZpX2ZyZWUAGA9fX3diZ19qbnpmX2ZyZWUAGA5fX3diZ190cm9fZnJlZQAYDl9fd2JnX21jcF9mcmVlABgPX193YmdfbWludF9mcmVlABgOX193Ymdfc3ViX2ZyZWUAGA1fX3diZ19jYl9mcmVlABgPX193Ymdfd3FvcF9mcmVlABgOX193Ymdfc3J3X2ZyZWUAGA9fX3diZ19lY3IxX2ZyZWUAGA9fX3diZ19qbXBmX2ZyZWUAGA9fX3diZ19rMjU2X2ZyZWUAGA5fX3diZ19yZXRfZnJlZQAYD19fd2JnX3Njd3FfZnJlZQAYDl9fd2JnX21lcV9mcmVlABgPX193Ymdfc3d3cV9mcmVlABgOX193YmdfYmFsX2ZyZWUAGA9fX3diZ19tb3ZpX2ZyZWUAGA9fX3diZ193ZG1kX2ZyZWUAGA9fX3diZ19wb3BsX2ZyZWUAGA9fX3diZ193ZG1tX2ZyZWUAGA5fX3diZ19leHBfZnJlZQAYDV9fd2JnX2ppX2ZyZWUAGA9fX3diZ193cWNtX2ZyZWUAGA9fX3diZ19tY3BpX2ZyZWUAGA9fX3diZ19tb2RpX2ZyZWUAGA1fX3diZ190cl9mcmVlABgPX193YmdfYW5kaV9mcmVlABgOX193YmdfY2NwX2ZyZWUAGA5fX3diZ19zd3dfZnJlZQAYD19fd2JnX2Nyb29fZnJlZQAYD19fd2JnX3dxbWRfZnJlZQAYD19fd2JnX21vdmVfZnJlZQAYD19fd2JnX2VjazFfZnJlZQAYDl9fd2JnX2FuZF9mcmVlABgTd3Fkdl9uZXdfdHlwZXNjcmlwdADKARN3cW1sX25ld190eXBlc2NyaXB0AMoBE3dkbWxfbmV3X3R5cGVzY3JpcHQAygETd3FvcF9uZXdfdHlwZXNjcmlwdADKARN3ZG9wX25ld190eXBlc2NyaXB0AMoBE3dxY21fbmV3X3R5cGVzY3JpcHQAygETd2Rkdl9uZXdfdHlwZXNjcmlwdADKAQ53cWNtX2Zyb21fYXJncwA7CndxZHZfaW1tMDYANgp3cW1sX2ltbTA2ADYKd2RtbF9pbW0wNgA2Cndxb3BfaW1tMDYANgp3ZG9wX2ltbTA2ADYKd3FjbV9pbW0wNgA2CndkZHZfaW1tMDYANgp3ZGNtX2ltbTA2ADYKam5lZl9pbW0wNgA2CWxkY19pbW0wNgA2DndxbWxfZnJvbV9hcmdzADwOd3FvcF9mcm9tX2FyZ3MAOwVnbV9yYQA1BWd0X3JjABoFZ3RfcmIAEgVndF9yYQA1BWxiX3JiABIFbGJfcmEANQVsdF9yYwAaBWx0X3JiABIFbHRfcmEANQhsd19pbW0xMgAJBWx3X3JiABIFbHdfcmEANQVvcl9yYwAaBW9yX3JiABIFb3JfcmEANQhzYl9pbW0xMgAJBXNiX3JiABIFc2JfcmEANQhzd19pbW0xMgAJBXN3X3JiABIFc3dfcmEANQV0cl9yYwAaBXRyX3JiABIFdHJfcmEANQVlcV9yYwAaBWVxX3JiABIFZXFfcmEANQZhbmRfcmMAGgZhbmRfcmIAEgZhbmRfcmEANQZiYWxfcmMAGgZiYWxfcmIAEgZiYWxfcmEANQZjY3BfcmMAGgZjY3BfcmIAEgZjY3BfcmEANQZkaXZfcmMAGgZkaXZfcmIAEgZkaXZfcmEANQZleHBfcmMAGgZleHBfcmIAEgZleHBfcmEANQhsYl9pbW0xMgAJBmd0Zl9yYgASBmd0Zl9yYQA1BmpuZV9yYwAaBmpuZV9yYgASBmpuZV9yYQA1BmxkY19yYwAaBmxkY19yYgASBmxkY19yYQA1BmxvZ19yZAA2BmxvZ19yYwAaBmxvZ19yYgASBmxvZ19yYQA1Bm1jbF9yYgASBm1jbF9yYQA1Bm1jcF9yYwAaBm1jcF9yYgASBm1jcF9yYQA1Bm1lcV9yZAA2Bm1lcV9yYwAaBm1lcV9yYgASBm1lcV9yYQA1Bm1vZF9yYwAaBm1vZF9yYgASBm1vZF9yYQA1Bm11bF9yYwAaBm11bF9yYgASBm11bF9yYQA1Bm5vdF9yYgASBm5vdF9yYQA1CW9yaV9pbW0xMgAJBm9yaV9yYgASBm9yaV9yYQA1BnNsbF9yYwAaBnNsbF9yYgASBnNsbF9yYQA1BnNtb19yZAA2BnNtb19yYwAaBnNtb19yYgASBnNtb19yYQA1BnNybF9yYwAaBnNybF9yYgASBnNybF9yYQA1BnNyd19yYwAaBnNyd19yYgASBnNyd19yYQA1BnN1Yl9yYwAaBnN1Yl9yYgASBnN1Yl9yYQA1BnN3d19yYwAaBnN3d19yYgASBnN3d19yYQA1BnRyb19yZAA2BnRyb19yYwAaBnRyb19yYgASBnRyb19yYQA1Bnhvcl9yYwAaBnhvcl9yYgASBnhvcl9yYQA1CWd0Zl9pbW0xMgAJB2FkZGlfcmIAEgdhZGRpX3JhADUKYW5kaV9pbW0xMgAJB2FuZGlfcmIAEgdhbmRpX3JhADUHYmhzaF9yYgASB2Joc2hfcmEANQZjY3BfcmQANgdibGRkX3JjABoHYmxkZF9yYgASB2JsZGRfcmEANQdic2l6X3JiABIHYnNpel9yYQA1B2J1cm5fcmIAEgdidXJuX3JhADUHY2FsbF9yZAA2B2NhbGxfcmMAGgdjYWxsX3JiABIHY2FsbF9yYQA1B2Nyb29fcmIAEgdjcm9vX3JhADUHY3Npel9yYgASB2NzaXpfcmEANQpkaXZpX2ltbTEyAAkHZGl2aV9yYgASB2RpdmlfcmEANQdlY2FsX3JkADYHZWNhbF9yYwAaB2VjYWxfcmIAEgdlY2FsX3JhADUHZWNrMV9yYwAaB2VjazFfcmIAEgdlY2sxX3JhADUHZWNyMV9yYwAaB2VjcjFfcmIAEgdlY3IxX3JhADUHZWQxOV9yZAA2B2VkMTlfcmMAGgdlZDE5X3JiABIHZWQxOV9yYQA1CmV4cGlfaW1tMTIACQdleHBpX3JiABIHZXhwaV9yYQA1CmptcGJfaW1tMTgADQdqbXBiX3JhADUKam1wZl9pbW0xOAANB2ptcGZfcmEANQdqbmViX3JjABoHam5lYl9yYgASB2puZWJfcmEANQdqbmVmX3JjABoHam5lZl9yYgASB2puZWZfcmEANQpqbmVpX2ltbTEyAAkHam5laV9yYgASB2puZWlfcmEANQpqbnpiX2ltbTEyAAkHam56Yl9yYgASB2puemJfcmEANQpqbnpmX2ltbTEyAAkHam56Zl9yYgASB2puemZfcmEANQpqbnppX2ltbTE4AA0Ham56aV9yYQA1B2syNTZfcmMAGgdrMjU2X3JiABIHazI1Nl9yYQA1B2xvZ2RfcmQANgdsb2dkX3JjABoHbG9nZF9yYgASB2xvZ2RfcmEANQptY2xpX2ltbTE4AA0HbWNsaV9yYQA1Cm1jcGlfaW1tMTIACQdtY3BpX3JiABIHbWNwaV9yYQA1B21pbnRfcmIAEgdtaW50X3JhADUHbWxkdl9yZAA2B21sZHZfcmMAGgdtbGR2X3JiABIHbWxkdl9yYQA1B21sb2dfcmMAGgdtbG9nX3JiABIHbWxvZ19yYQA1Cm1vZGlfaW1tMTIACQdtb2RpX3JiABIHbW9kaV9yYQA1B21vdmVfcmIAEgdtb3ZlX3JhADUKbW92aV9pbW0xOAANB21vdmlfcmEANQdtcm9vX3JjABoHbXJvb19yYgASB21yb29fcmEANQptdWxpX2ltbTEyAAkHbXVsaV9yYgASB211bGlfcmEANQdyZXRkX3JiABIHcmV0ZF9yYQA1B3MyNTZfcmMAGgdzMjU2X3JiABIHczI1Nl9yYQA1B3Njd3FfcmMAGgdzY3dxX3JiABIHc2N3cV9yYQA1CnNsbGlfaW1tMTIACQdzbGxpX3JiABIHc2xsaV9yYQA1CnNybGlfaW1tMTIACQdzcmxpX3JiABIHc3JsaV9yYQA1B3Nyd3FfcmQANgdzcndxX3JjABoHc3J3cV9yYgASB3Nyd3FfcmEANQpzdWJpX2ltbTEyAAkHc3ViaV9yYgASB3N1YmlfcmEANQdzd3dxX3JkADYHc3d3cV9yYwAaB3N3d3FfcmIAEgdzd3dxX3JhADUHdGltZV9yYgASB3RpbWVfcmEANQd3ZGFtX3JkADYHd2RhbV9yYwAaB3dkYW1fcmIAEgd3ZGFtX3JhADUHd2RjbV9yYwAaB3dkY21fcmIAEgd3ZGNtX3JhADUHd2Rkdl9yYwAaB3dkZHZfcmIAEgd3ZGR2X3JhADUHd2RtZF9yZAA2B3dkbWRfcmMAGgd3ZG1kX3JiABIHd2RtZF9yYQA1B3dkbWxfcmMAGgd3ZG1sX3JiABIHd2RtbF9yYQA1B3dkbW1fcmQANgd3ZG1tX3JjABoHd2RtbV9yYgASB3dkbW1fcmEANQd3ZG9wX3JjABoHd2RvcF9yYgASB3dkb3BfcmEANQd3cWFtX3JkADYHd3FhbV9yYwAaB3dxYW1fcmIAEgd3cWFtX3JhADUHd3FjbV9yYwAaB3dxY21fcmIAEgd3cWNtX3JhADUHd3Fkdl9yYwAaB3dxZHZfcmIAEgd3cWR2X3JhADUHd3FtZF9yZAA2B3dxbWRfcmMAGgd3cW1kX3JiABIHd3FtZF9yYQA1B3dxbWxfcmMAGgd3cW1sX3JiABIHd3FtbF9yYQA1B3dxbW1fcmQANgd3cW1tX3JjABoHd3FtbV9yYgASB3dxbW1fcmEANQd3cW9wX3JjABoHd3FvcF9yYgASB3dxb3BfcmEANQp4b3JpX2ltbTEyAAkHeG9yaV9yYgASB3hvcmlfcmEANRNqbmViX25ld190eXBlc2NyaXB0AFUQX193YmdfcmVnaWRfZnJlZQAqDndxZHZfZnJvbV9hcmdzAMkBEF9fd2JnX2ltbTI0X2ZyZWUALB9fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyANYBE19fd2JpbmRnZW5fZXhwb3J0XzAA0gEKgXv9Ae0iAgh/AX4CQAJAAkACQAJAAkACQAJAIABB9QFPBEAgAEHN/3tPDQUgAEELaiIAQXhxIQVB5I7AACgCACIIRQ0EQQAgBWshBAJ/QQAgBUGAAkkNABpBHyAFQf///wdLDQAaIAVBBiAAQQh2ZyIAa3ZBAXEgAEEBdGtBPmoLIgdBAnRByIvAAGooAgAiAkUEQEEAIQAMAgtBACEAIAVBGSAHQQF2a0EAIAdBH0cbdCEDA0ACQCACKAIEQXhxIgYgBUkNACAGIAVrIgYgBE8NACACIQEgBiIEDQBBACEEIAEhAAwECyACKAIUIgYgACAGIAIgA0EddkEEcWpBEGooAgAiAkcbIAAgBhshACADQQF0IQMgAg0ACwwBC0HgjsAAKAIAIgJBECAAQQtqQfgDcSAAQQtJGyIFQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAUEDdCIAQdiMwABqIgMgAEHgjMAAaigCACIAKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0HgjsAAIAJBfiABd3E2AgALIAAgAUEDdCIBQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAgLIAVB6I7AACgCAE0NAwJAAkAgAUUEQEHkjsAAKAIAIgBFDQYgAGhBAnRByIvAAGooAgAiASgCBEF4cSAFayEEIAEhAgNAAkAgASgCECIADQAgASgCFCIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACKAIUIgAbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyACQRRqIAJBEGogABshAwNAIAMhBiABIgBBFGogAEEQaiAAKAIUIgEbIQMgAEEUQRAgARtqKAIAIgENAAsgBkEANgIACyAHRQ0EIAIgAigCHEECdEHIi8AAaiIBKAIARwRAIAdBEEEUIAcoAhAgAkYbaiAANgIAIABFDQUMBAsgASAANgIAIAANA0HkjsAAQeSOwAAoAgBBfiACKAIcd3E2AgAMBAsgACgCBEF4cSAFayIBIAQgASAESSIBGyEEIAAgAiABGyECIAAhAQwACwALAkBBAiAAdCIDQQAgA2tyIAEgAHRxaCIAQQN0IgFB2IzAAGoiAyABQeCMwABqKAIAIgEoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQeCOwAAgAkF+IAB3cTYCAAsgASAFQQNyNgIEIAEgBWoiBiAAQQN0IgAgBWsiBEEBcjYCBCAAIAFqIAQ2AgBB6I7AACgCACICBEAgAkF4cUHYjMAAaiEAQfCOwAAoAgAhAwJ/QeCOwAAoAgAiBUEBIAJBA3Z0IgJxRQRAQeCOwAAgAiAFcjYCACAADAELIAAoAggLIQIgACADNgIIIAIgAzYCDCADIAA2AgwgAyACNgIIC0HwjsAAIAY2AgBB6I7AACAENgIAIAFBCGoPCyAAIAc2AhggAigCECIBBEAgACABNgIQIAEgADYCGAsgAigCFCIBRQ0AIAAgATYCFCABIAA2AhgLAkACQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiBSAEQQFyNgIEIAQgBWogBDYCAEHojsAAKAIAIgNFDQEgA0F4cUHYjMAAaiEAQfCOwAAoAgAhAQJ/QeCOwAAoAgAiBkEBIANBA3Z0IgNxRQRAQeCOwAAgAyAGcjYCACAADAELIAAoAggLIQMgACABNgIIIAMgATYCDCABIAA2AgwgASADNgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIEDAELQfCOwAAgBTYCAEHojsAAIAQ2AgALIAJBCGoPCyAAIAFyRQRAQQAhAUECIAd0IgBBACAAa3IgCHEiAEUNAyAAaEECdEHIi8AAaigCACEACyAARQ0BCwNAIAAgASAAKAIEQXhxIgMgBWsiBiAESSIHGyEIIAAoAhAiAkUEQCAAKAIUIQILIAEgCCADIAVJIgAbIQEgBCAGIAQgBxsgABshBCACIgANAAsLIAFFDQAgBUHojsAAKAIAIgBNIAQgACAFa09xDQAgASgCGCEHAkACQCABIAEoAgwiAEYEQCABQRRBECABKAIUIgAbaigCACICDQFBACEADAILIAEoAggiAiAANgIMIAAgAjYCCAwBCyABQRRqIAFBEGogABshAwNAIAMhBiACIgBBFGogAEEQaiAAKAIUIgIbIQMgAEEUQRAgAhtqKAIAIgINAAsgBkEANgIACyAHRQ0DIAEgASgCHEECdEHIi8AAaiICKAIARwRAIAdBEEEUIAcoAhAgAUYbaiAANgIAIABFDQQMAwsgAiAANgIAIAANAkHkjsAAQeSOwAAoAgBBfiABKAIcd3E2AgAMAwsCQAJAAkACQAJAIAVB6I7AACgCACIBSwRAIAVB7I7AACgCACIATwRAQQAhBCAFQa+ABGoiAEEQdkAAIgFBf0YiAw0HIAFBEHQiAkUNB0H4jsAAQQAgAEGAgHxxIAMbIgRB+I7AACgCAGoiADYCAEH8jsAAQfyOwAAoAgAiASAAIAAgAUkbNgIAAkACQEH0jsAAKAIAIgMEQEHIjMAAIQADQCAAKAIAIgEgACgCBCIGaiACRg0CIAAoAggiAA0ACwwCC0GEj8AAKAIAIgBBACAAIAJNG0UEQEGEj8AAIAI2AgALQYiPwABB/x82AgBBzIzAACAENgIAQciMwAAgAjYCAEHkjMAAQdiMwAA2AgBB7IzAAEHgjMAANgIAQeCMwABB2IzAADYCAEH0jMAAQeiMwAA2AgBB6IzAAEHgjMAANgIAQfyMwABB8IzAADYCAEHwjMAAQeiMwAA2AgBBhI3AAEH4jMAANgIAQfiMwABB8IzAADYCAEGMjcAAQYCNwAA2AgBBgI3AAEH4jMAANgIAQZSNwABBiI3AADYCAEGIjcAAQYCNwAA2AgBBnI3AAEGQjcAANgIAQZCNwABBiI3AADYCAEHUjMAAQQA2AgBBpI3AAEGYjcAANgIAQZiNwABBkI3AADYCAEGgjcAAQZiNwAA2AgBBrI3AAEGgjcAANgIAQaiNwABBoI3AADYCAEG0jcAAQaiNwAA2AgBBsI3AAEGojcAANgIAQbyNwABBsI3AADYCAEG4jcAAQbCNwAA2AgBBxI3AAEG4jcAANgIAQcCNwABBuI3AADYCAEHMjcAAQcCNwAA2AgBByI3AAEHAjcAANgIAQdSNwABByI3AADYCAEHQjcAAQciNwAA2AgBB3I3AAEHQjcAANgIAQdiNwABB0I3AADYCAEHkjcAAQdiNwAA2AgBB7I3AAEHgjcAANgIAQeCNwABB2I3AADYCAEH0jcAAQeiNwAA2AgBB6I3AAEHgjcAANgIAQfyNwABB8I3AADYCAEHwjcAAQeiNwAA2AgBBhI7AAEH4jcAANgIAQfiNwABB8I3AADYCAEGMjsAAQYCOwAA2AgBBgI7AAEH4jcAANgIAQZSOwABBiI7AADYCAEGIjsAAQYCOwAA2AgBBnI7AAEGQjsAANgIAQZCOwABBiI7AADYCAEGkjsAAQZiOwAA2AgBBmI7AAEGQjsAANgIAQayOwABBoI7AADYCAEGgjsAAQZiOwAA2AgBBtI7AAEGojsAANgIAQaiOwABBoI7AADYCAEG8jsAAQbCOwAA2AgBBsI7AAEGojsAANgIAQcSOwABBuI7AADYCAEG4jsAAQbCOwAA2AgBBzI7AAEHAjsAANgIAQcCOwABBuI7AADYCAEHUjsAAQciOwAA2AgBByI7AAEHAjsAANgIAQdyOwABB0I7AADYCAEHQjsAAQciOwAA2AgBB9I7AACACNgIAQdiOwABB0I7AADYCAEHsjsAAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQYCPwABBgICAATYCAAwICyACIANNIAEgA0tyDQAgACgCDEUNAwtBhI/AAEGEj8AAKAIAIgAgAiAAIAJJGzYCACACIARqIQFByIzAACEAAkACQANAIAEgACgCAEcEQCAAKAIIIgANAQwCCwsgACgCDEUNAQtByIzAACEAA0ACQCADIAAoAgAiAU8EQCABIAAoAgRqIgYgA0sNAQsgACgCCCEADAELC0H0jsAAIAI2AgBB7I7AACAEQShrIgA2AgAgAiAAQQFyNgIEIAAgAmpBKDYCBEGAj8AAQYCAgAE2AgAgAyAGQSBrQXhxQQhrIgAgACADQRBqSRsiAUEbNgIEQciMwAApAgAhCSABQRBqQdCMwAApAgA3AgAgASAJNwIIQcyMwAAgBDYCAEHIjMAAIAI2AgBB0IzAACABQQhqNgIAQdSMwABBADYCACABQRxqIQADQCAAQQc2AgAgAEEEaiIAIAZJDQALIAEgA0YNByABIAEoAgRBfnE2AgQgAyABIANrIgBBAXI2AgQgASAANgIAIABBgAJPBEAgAyAAEAUMCAsgAEF4cUHYjMAAaiEBAn9B4I7AACgCACICQQEgAEEDdnQiAHFFBEBB4I7AACAAIAJyNgIAIAEMAQsgASgCCAshACABIAM2AgggACADNgIMIAMgATYCDCADIAA2AggMBwsgACACNgIAIAAgACgCBCAEajYCBCACIAVBA3I2AgQgASACIAVqIgNrIQUgAUH0jsAAKAIARg0DIAFB8I7AACgCAEYNBCABKAIEIgRBA3FBAUYEQCABIARBeHEiABAEIAAgBWohBSAAIAFqIgEoAgQhBAsgASAEQX5xNgIEIAMgBUEBcjYCBCADIAVqIAU2AgAgBUGAAk8EQCADIAUQBQwGCyAFQXhxQdiMwABqIQACf0HgjsAAKAIAIgFBASAFQQN2dCIEcUUEQEHgjsAAIAEgBHI2AgAgAAwBCyAAKAIICyEFIAAgAzYCCCAFIAM2AgwgAyAANgIMIAMgBTYCCAwFC0HsjsAAIAAgBWsiATYCAEH0jsAAQfSOwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQgAEEIaiEEDAYLQfCOwAAoAgAhAAJAIAEgBWsiAkEPTQRAQfCOwABBADYCAEHojsAAQQA2AgAgACABQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAELQeiOwAAgAjYCAEHwjsAAIAAgBWoiAzYCACADIAJBAXI2AgQgACABaiACNgIAIAAgBUEDcjYCBAsMCAsgACAEIAZqNgIEQfSOwABB9I7AACgCACIAQQ9qQXhxIgFBCGsiAjYCAEHsjsAAQeyOwAAoAgAgBGoiAyAAIAFrakEIaiIBNgIAIAIgAUEBcjYCBCAAIANqQSg2AgRBgI/AAEGAgIABNgIADAMLQfSOwAAgAzYCAEHsjsAAQeyOwAAoAgAgBWoiADYCACADIABBAXI2AgQMAQtB8I7AACADNgIAQeiOwABB6I7AACgCACAFaiIANgIAIAMgAEEBcjYCBCAAIANqIAA2AgALIAJBCGoPC0EAIQRB7I7AACgCACIAIAVNDQBB7I7AACAAIAVrIgE2AgBB9I7AAEH0jsAAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEDAMLIAQPCyAAIAc2AhggASgCECICBEAgACACNgIQIAIgADYCGAsgASgCFCICRQ0AIAAgAjYCFCACIAA2AhgLAkAgBEEQTwRAIAEgBUEDcjYCBCABIAVqIgIgBEEBcjYCBCACIARqIAQ2AgAgBEGAAk8EQCACIAQQBQwCCyAEQXhxQdiMwABqIQACf0HgjsAAKAIAIgNBASAEQQN2dCIEcUUEQEHgjsAAIAMgBHI2AgAgAAwBCyAAKAIICyEEIAAgAjYCCCAEIAI2AgwgAiAANgIMIAIgBDYCCAwBCyABIAQgBWoiAEEDcjYCBCAAIAFqIgAgACgCBEEBcjYCBAsgAUEIag8LIABBCGoL+wQBAX8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEGABGsOJgECAwQFBgcILAkKCwwNLCwsLCwsLCwsLCwsLCwsLCwsDg8sLCwQAAtBASEBAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQQFrDg5BAQIDBAUGQgcICQoLDAALAkAgAEHABGsODCcoKSorLC0uLzAxMgALAkAgAEGBAmsOCg0ODxAREhMUFRYACwJAIABBgAZrDgkzNDU2N0JCODkACwJAIABBgAprDgU8PT4/QAALIABBgAhrDgI5OkELQQIPC0EDDwtBBA8LQQUPC0EGDwtBBw8LQQkPC0EKDwtBCw8LQQwPC0ENDwtBDg8LQYECDwtBggIPC0GDAg8LQYQCDwtBhQIPC0GGAg8LQYcCDwtBiAIPC0GJAg8LQYoCDwtBgAQPC0GBBA8LQYIEDwtBgwQPC0GEBA8LQYUEDwtBhgQPC0GHBA8LQYkEDwtBigQPC0GLBA8LQYwEDwtBjQQPC0GgBA8LQaEEDwtBpQQPC0HABA8LQcEEDwtBwgQPC0HDBA8LQcQEDwtBxQQPC0HGBA8LQccEDwtByAQPC0HJBA8LQcoEDwtBywQPC0GABg8LQYEGDwtBggYPC0GDBg8LQYQGDwtBhwYPC0GIBg8LQYAIDwtBgQgPC0GACg8LQYEKDwtBggoPC0GDCg8LQYQKIQELIAEPC0HggsAAQRkQ2AEAC/gDAQJ/IAAgAWohAgJAAkAgACgCBCIDQQFxDQAgA0ECcUUNASAAKAIAIgMgAWohASAAIANrIgBB8I7AACgCAEYEQCACKAIEQQNxQQNHDQFB6I7AACABNgIAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgAiABNgIADAILIAAgAxAECwJAAkACQCACKAIEIgNBAnFFBEAgAkH0jsAAKAIARg0CIAJB8I7AACgCAEYNAyACIANBeHEiAhAEIAAgASACaiIBQQFyNgIEIAAgAWogATYCACAAQfCOwAAoAgBHDQFB6I7AACABNgIADwsgAiADQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALIAFBgAJPBEAgACABEAUPCyABQXhxQdiMwABqIQICf0HgjsAAKAIAIgNBASABQQN2dCIBcUUEQEHgjsAAIAEgA3I2AgAgAgwBCyACKAIICyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCA8LQfSOwAAgADYCAEHsjsAAQeyOwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgAEHwjsAAKAIARw0BQeiOwABBADYCAEHwjsAAQQA2AgAPC0HwjsAAIAA2AgBB6I7AAEHojsAAKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAAsL8QIBBH8gACgCDCECAkACQCABQYACTwRAIAAoAhghAwJAAkAgACACRgRAIABBFEEQIAAoAhQiAhtqKAIAIgENAUEAIQIMAgsgACgCCCIBIAI2AgwgAiABNgIIDAELIABBFGogAEEQaiACGyEEA0AgBCEFIAEiAkEUaiACQRBqIAIoAhQiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QciLwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQeSOwABB5I7AACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB4I7AAEHgjsAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIAAoAhQiAEUNACACIAA2AhQgACACNgIYCwu6AgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QciLwABqIQRBASACdCIDQeSOwAAoAgBxRQRAIAQgADYCACAAIAQ2AhggACAANgIMIAAgADYCCEHkjsAAQeSOwAAoAgAgA3I2AgAPCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEFA0AgAyAFQR12QQRxakEQaiIEKAIAIgJFDQIgBUEBdCEFIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAEIAA2AgAgACADNgIYIAAgADYCDCAAIAA2AggLlAEBBH8gARDQASABQQhrIgMgAygCAEEBaiICNgIAAkACQCACBEAgASgCACICQX9GDQEgASACQQFqNgIAIAEoAgQoAAAiBMBBAnRBuIPAAGooAgAhBUEBQQQQ0wEiAg0CCwALENcBAAsgAiAFIARBgH5xcjYAACABIAEoAgBBAWs2AgAgAxBWIABBBDYCBCAAIAI2AgALiwEBAn8gABDQASAAQQhrIgIoAgAhAwJAAkAgAUUEQCADQQFGBEAgAkEANgIAIAJBf0YNAyAAQQRrIgAgACgCAEEBayIANgIAIABFDQIMAwtB+YLAAEE/ENgBAAsgAiADQQFrIgE2AgAgAQ0BIABBBGsiACAAKAIAQQFrIgA2AgAgAA0BCyACQRAQGQsLdQIBfwF+IAEQ0AEgAUEIayICKAIAQQFGBEAgATUCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQgGDPAAAIAAgA6dBCHZBAXE6AAEPC0H5gsAAQT8Q2AEAC3cBAn8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCIALwAAIABBAmotAABBEHRyENwBIQIgASgCCCABKAIMEMsBQRBBBBDGASIAIAJBCHZBgB5xIAJBGHZyOwEMIABBADYCCCAAQoGAgIAQNwIAIAFBEGokACAAQQhqC2wBAn8gABDQASAAQQhrIgEgASgCAEEBaiICNgIAAkAgAgRAIAAoAgBBf0YNASAALwAEIABBBmotAABBEHRyENwBIQAgARBeIABBCHZBgP4DcSAAQRh2ciAAQYD+A3FBCHRyEGgPCwALENcBAAtvAQJ/IAEQ0AEgAUEIayICKAIAQQFGBEAgASgCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQQh2OgABIAAgA0EBcToAAA8LQfmCwABBPxDYAQALawEBfyAAENABIABBCGshAgJAIAFFBEAgAigCAEEBRw0BIAAoAgQgAkEANgIAAkAgAkF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAJBEBAZCxDbAQ8LIAIQVg8LQfmCwABBPxDYAQALYQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEIdkGA/gNxIABBGHZyIABBgAZxQQh0chBoIAFBEGokAAtqAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQQI2AhQgAUH0gMAANgIQIAFCATcCHCABQQE2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQVwALIAFBMGokACAAC2sBAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQQI2AhQgAUG4gcAANgIQIAFCATcCHCABQQI2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQVwALIAFBMGokACAAC2MBAn8jAEEQayICJAACQCABRQRAIAJBCGogABALDAELIAAQ0AEgAEEIayIBIAEoAgBBAWsiAzYCACADDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLIAJBEGokAAtjAQJ/IwBBEGsiAiQAAkAgAUUEQCACQQhqIAAQCAwBCyAAENABIABBCGsiASABKAIAQQFrIgM2AgAgAw0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCyACQRBqJAALXgEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEIdkGA4ANxIABBgAZxQQh0ckEMdhBnIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ9gELFgAgAEHQgsAAQcCCwABBgICACBD2AQtgAQF/IAAQGyECIAEQHiEAQRBBBBDGASIBQoGAgIAQNwIAIAEgAEEQdEGAgPwHcSAAIAJB/wFxQRJ0ciIAQYD+A3FBCHQgAEEIdkGA/gNxckEIdnKtQiCGNwIIIAFBCGoLXAECfyAAENABIABBCGsiASgCAEEBRgRAIAAtAAQgAUEANgIAAkAgAUF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZC0EBcQ8LQfmCwABBPxDYAQALYAEBfyAAENABIABBCGshAgJAIAFFBEAgAigCAEEBRgRAIAJBADYCACACQX9GDQIgAEEEayIAIAAoAgBBAWsiADYCACAADQIgAkEUEBkPC0H5gsAAQT8Q2AEACyACEF8LC2ABAX8gABDQASAAQQhrIQICQCABRQRAIAIoAgBBAUYEQCACQQA2AgAgAkF/Rg0CIABBBGsiACAAKAIAQQFrIgA2AgAgAA0CIAJBEBAZDwtB+YLAAEE/ENgBAAsgAhBeCwvQBgEEfwJAIABBBGsoAgAiBCICQXhxIgNBBEEIIAJBA3EiAhsgAWpPBEAgAkEAIAMgAUEnaksbDQEgAEEIayIBIAQiA0F4cSIAaiECAkACQCADQQFxDQAgA0ECcUUNASABKAIAIgMgAGohACABIANrIgFB8I7AACgCAEYEQCACKAIEQQNxQQNHDQFB6I7AACAANgIAIAIgAigCBEF+cTYCBCABIABBAXI2AgQgAiAANgIADAILIAEgAxAECwJAAkACQAJAIAIoAgQiA0ECcUUEQCACQfSOwAAoAgBGDQIgAkHwjsAAKAIARg0EIAIgA0F4cSICEAQgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFB8I7AACgCAEcNAUHojsAAIAA2AgAMBQsgAiADQX5xNgIEIAEgAEEBcjYCBCAAIAFqIAA2AgALIABBgAJJDQEgASAAEAVBACEBQYiPwABBiI/AACgCAEEBayIANgIAIAANA0HQjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQYiPwABB/x8gASABQf8fTRs2AgAMAwtB9I7AACABNgIAQeyOwABB7I7AACgCACAAaiIANgIAIAEgAEEBcjYCBEHwjsAAKAIAIAFGBEBB6I7AAEEANgIAQfCOwABBADYCAAsgAEGAj8AAKAIAIgNNDQJB9I7AACgCACICRQ0CQQAhAQJAQeyOwAAoAgAiBEEpSQ0AQciMwAAhAANAIAIgACgCACIFTwRAIAUgACgCBGogAksNAgsgACgCCCIADQALC0HQjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQYiPwABB/x8gASABQf8fTRs2AgAgAyAETw0CQYCPwABBfzYCAAwCCyAAQXhxQdiMwABqIQICf0HgjsAAKAIAIgNBASAAQQN2dCIAcUUEQEHgjsAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCAwBC0HwjsAAIAE2AgBB6I7AAEHojsAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAsPC0GpicAAQS5B2InAABBKAAtB6InAAEEuQZiKwAAQSgALVQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEOdkE8cSAAQR52chBnIAFBEGokAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgAC0ABCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtZAQJ/IAEQ0AEgAUEIayIDIAMoAgBBAWoiAjYCAAJAIAIEQCABKAIAIgJBf0YNASAAIAM2AgggACABNgIEIAAgAUEEajYCACABIAJBAWo2AgAPCwALENcBAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgAC8BBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgACgCBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtRAQJ/AkAgABAbIgBBGHENACAAQQdxIgJBB0YNAEEQQQQQxgEiAUKBgICAEDcCACABIABBBXZBAXGtQiCGIAKtQiiGhDcCCCABQQhqIQELIAELVwEBfyAAEBshAiABEBshAUEQQQQQxgEiAEKBgICAEDcCACAAIAFB/wFxQQx0IAJBEnRyIgFBgOADcUEIdCABQQh2QYD+A3FyQQh2rUIghjcCCCAAQQhqC0wAIANB/wFxIAFB/wFxQQx0IABB/wFxQRJ0ciIAIAJB/wFxQQZ0cnIiAUEQdEGAgPwHcSAAQQh2QYD+A3EgAUGA/gNxQQh0ckEIdnILTwECfyAAENABIABBCGsiASABKAIAQQFqIgI2AgACQCACBEAgACgCAEF/Rg0BIAAvAAQgAEEGai0AAEEQdHIQ1AEgARBeEGcPCwALENcBAAtOAQF/IAFFBEAgABAWGg8LIAAQ0AEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPgBCxAAIAAgASACIANB4wAQ+AELTgEBfyABRQRAIAAQGxoPCyAAENABIABBCGsiASABKAIAQQFrIgI2AgACQCACDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLC04BAX8gAUUEQCAAEB0aDwsgABDQASAAQQhrIgEgASgCAEEBayICNgIAAkAgAg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCwtOAQF/IAFFBEAgABAeGg8LIAAQ0AEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLDwAgACABQYCAgMgBEPkBCwwAIAAgAUHLABD6AQsMACAAIAFBzAAQ+gELDAAgACABQc0AEPoBCwwAIAAgAUHOABD6AQsMACAAIAFBzwAQ+gELDAAgACABQdAAEPoBCw8AIAAgAUGAgIDoBhD5AQtFAQF/IwBBEGsiASQAIAFBBGogABAcIAEoAgQiAC8AACAAQQJqLQAAQRB0chDUASABKAIIIAEoAgwQywEQZyABQRBqJAALSwEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AFBGHZBP3EgASgCCCABKAIMEMsBEGcgAUEQaiQAC04BAX8gABAeIQBBEEEEEMYBIgFCgYCAgBA3AgAgASAAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2cq1CIIY3AgggAUEIagsLACAAIAFBBxD7AQsLACAAIAFBCBD7AQs/ACACQRZ0QYCAgAZxIAFB/wFxQQx0IgEgAkH8AXFBBnRyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCyAELQAIIAQtAAkQyAEQYiAEQRBqJAALOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCCAELQAIIAQtAAkQiQEQYiAEQRBqJAALCwAgACABQQoQ/AELCwAgACABQQwQ/AELCwAgACABQRQQ/AELCwAgACABQRYQ/AELCwAgACABQRsQ/AELCwAgACABQR4Q/AELCwAgACABQR8Q/AELCwAgACABQSQQ/AELCwAgACABQTIQ/AELPgAgABAbIQAgARAeIgFBEHRBgID8B3EgAEH/AXFBEnQgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyEGILOAAgAkEQdEGAgPwHcSABQf8BcUEMdCIBIAJyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILPAECfyMAQRBrIgEkACAAENABIAFBCGogABBdIAEoAggtAAEgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzwBAn8jAEEQayIBJAAgABDQASABQQhqIAAQXSABKAIILQAAIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAtBAQF/IwBBIGsiAyQAIANBADYCECADQQE2AgQgA0IENwIIIAMgATYCHCADIAA2AhggAyADQRhqNgIAIAMgAhBXAAs5AQF/IwBBEGsiAiQAIAAQ0AEgAkEIaiAAEGEgAigCDCACKAIIIAFBAEc6AABBADYCACACQRBqJAALOQEBfyMAQRBrIgIkACAAENABIAJBCGogABBhIAIoAgwgAigCCCABQQBHOgABQQA2AgAgAkEQaiQAC0MBAX8gAEE5TwRAQeCCwABBGRDYAQALQRRBBBDGASICIAA6ABAgAiABNgIMIAJBADYCCCACQoGAgIAQNwIAIAJBCGoLCgAgAEHVABD9AQsKACAAQdYAEP0BCwoAIABB1wAQ/QELCgAgAEHaABD9AQsKACAAQdsAEP0BCwoAIABB3AAQ/QELCgAgAEHdABD9AQs+ACAAEBsgARAbIAIQGyADEBsQISEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags7AQF/IAAgACgCAEEBayIBNgIAAkAgAQ0AIAAoAgwQ2wEgACAAKAIEQQFrIgE2AgQgAQ0AIABBEBAZCwvIAQEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQaiHwAA2AhAgAkEBNgIMIAJBDGoiACgCCCIBRQRAQfyGwABBK0HEisAAEEoACyABKAIMGiABKAIEGiAALQAQIQEgAC0AERpBxIvAAEHEi8AAKAIAIgBBAWo2AgACQCAAQQBIDQBBkI/AAC0AAEEBcQ0AQYyPwABBjI/AACgCAEEBajYCAEHAi8AAKAIAQQBIDQBBkI/AAEEAOgAAIAFFDQAACwALLwEBfyMAQRBrIgEkACABQQhqIAAQCyABLQAJQSBBACABLQAIG3IQZyABQRBqJAALOgAgABAbIAEQGyACEBsQOiEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags6ACAAEBsgARAbIAIQHRBHIQFBEEEEEMYBIgBCgYCAgBA3AgAgACABrUL///8Hg0IghjcCCCAAQQhqCzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBC0ABCABKAIIIAEoAgwQzAEgAUEQaiQACzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCgCACABKAIIIAEoAgwQzAEgAUEQaiQACzEBAX8gASgCACICQX9HBEAgASACQQFqNgIAIAAgATYCBCAAIAFBBGo2AgAPCxDXAQALCQAgAEEQEPABCwkAIABBFBDwAQszAQF/IAAQGyEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAUECdEH8AXGtQiCGNwIIIABBCGoLKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LENcBAAssAQF/QRBBBBDGASIBQoGAgIAQNwIAIAEgAK1C////B4NCIIY3AgggAUEIagskACAAENABIAAoAgAEQBDXAQALIABBADYCACAAIAFBAEc6AAQLKAAgAxAWIQMgABDHASABEMcBIAIQxwEgAxDOAUEIdEHkAHIQ0QEQaAsoACADEBYhAyAAEMcBIAEQxwEgAhDHASADEM4BQQh0QeUAchDRARBoCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ2AEACykBAX9BEEEEEMYBIgEgADoADCABQQA2AgggAUKBgICAEDcCACABQQhqCykBAX9BEEEEEMYBIgEgADYCDCABQQA2AgggAUKBgICAEDcCACABQQhqCyIAIAIQAiECIAAQxwEgARDHASACEEdBCHRBygByENEBEGgLDwAgACABIAIgA0ESEPEBCw8AIAAgASACIANBGBDxAQsPACAAIAEgAiADQRwQ8QELDwAgACABIAIgA0EdEPEBCw8AIAAgASACIANBIRDyAQsPACAAIAEgAiADQSIQ8QELDwAgACABIAIgA0EjEPEBCw8AIAAgASACIANBKBDxAQsPACAAIAEgAiADQSoQ8QELDwAgACABIAIgA0EsEPEBCw8AIAAgASACIANBLxDxAQsPACAAIAEgAiADQTgQ8QELEAAgACABIAIgA0HTABDyAQsQACAAIAEgAiADQdQAEPIBCxAAIAAgASACIANB3gAQ8gELEAAgACABIAIgA0HfABDyAQsQACAAIAEgAiADQeAAEPIBCxAAIAAgASACIANB4QAQ8gELEAAgACABIAIgA0HiABDyAQsQACAAIAEgAiADQeMAEPIBCxAAIAAgASACIANB5AAQ8gELEAAgACABIAIgA0HlABDyAQsQACAAIAEgAiADQeYAEPEBCxAAIAAgASACIANB5wAQ8QELEAAgACABIAIgA0HoABDxAQsQACAAIAEgAiADQekAEPEBCxAAIAAgASACIANB6gAQ8QELEAAgACABIAIgA0HrABDxAQsQACAAIAEgAiADQewAEPEBCxAAIAAgASACIANB7gAQ8QELHgAgARBmIQEgABDHASABEMQBQQh0QcwAchDRARBoCxkAIAAgASACQSBBACAEG0EQQQAgAxtyECELDQAgACABIAJBARDzAQsNACAAIAEgAkECEPMBCw0AIAAgASACQQMQ8wELDQAgACABIAJBBBDzAQsNACAAIAEgAkEFEPMBCw0AIAAgASACQQYQ8wELDQAgACABIAJBBxDzAQsNACAAIAEgAkEIEPMBCw0AIAAgASACQQkQ8wELDQAgACABIAJBCxDzAQsNACAAIAEgAkENEPMBCw0AIAAgASACQQ4Q8wELDQAgACABIAJBDxDzAQsNACAAIAEgAkEQEPMBCw0AIAAgASACQREQ8wELDQAgACABIAJBFxDzAQsNACAAIAEgAkEmEPMBCw0AIAAgASACQScQ8wELDQAgACABIAJBKRDzAQsNACAAIAEgAkErEPMBCw0AIAAgASACQS0Q8wELDQAgACABIAJBLhDzAQsNACAAIAEgAkEwEPMBCw0AIAAgASACQTEQ8wELDQAgACABIAJBNRDzAQsNACAAIAEgAkE3EPMBCw0AIAAgASACQTkQ9AELDQAgACABIAJBOhD0AQsNACAAIAEgAkE7EPQBCw0AIAAgASACQTwQ9AELDQAgACABIAJBPRD0AQsNACAAIAEgAkE+EPQBCw0AIAAgASACQT8Q9AELDgAgACABIAJBwAAQ9AELDgAgACABIAJBwQAQ9AELDgAgACABIAJBwgAQ9AELDgAgACABIAJBwwAQ9AELDgAgACABIAJBxAAQ9AELDgAgACABIAJBxQAQ9AELDgAgACABIAJBxgAQ9AELDgAgACABIAJBxwAQ9AELDgAgACABIAJByAAQ9AELDgAgACABIAJByQAQ9AELDgAgACABIAJBygAQ9AELDgAgACABIAJB0QAQ9AELDgAgACABIAJB0gAQ9AELFwEBfyAAQf8BcUE/TQR/IAAQZwVBAAsLGwAgABDQASAAKAIAQX9GBEAQ1wEACyAALQAECwkAIABBExD1AQsJACAAQRUQ9QELCQAgAEEaEPUBCwkAIABBIBD1AQsJACAAQSUQ9QELIgEBf0EQQQQQxgEiAEIANwIIIABCgYCAgBA3AgAgAEEIagsJACAAQTQQ9QELCQAgAEE2EPUBCwoAIABB2AAQ9QELCgAgAEHZABD1AQsXACABQRB0QYCA/ANxIABBAnRB/AFxcgsbACAAEMcBIAEQxwEgAhDHARA6QQh0ENEBEGgLEgAgASAAENMBIgAEQCAADwsAC3UBAX8gAEH/AXFBwABPBEAjAEEQayIBJAAgAUEiNgIMIAFBgIDAADYCCCMAQSBrIgAkACAAQQE2AgQgAEH0hsAANgIAIABCATcCDCAAIAFBCGqtQoCAgIDAAIQ3AxggACAAQRhqNgIIIABBuIDAABBXAAsgAAsUACAAIAEgAkEgQQAgAxsgBHIQIQsXACAAEBsgARAbIAIQGyADEBYQzgEQYgsWACAAEBsgARAbIAIQGyADEBsQIRBiCxMAIAAgACgCAEEBazYCACABEF4LEwAgACAAKAIAQQFrNgIAIAEQXwsSACAAEBsgARAbIAIQAhBHEGILEQAgACABIAJBIEEAIAMbECELEgAgABAbIAEQGyACEB0QRxBiCxMAIAAEQA8LQdSKwABBGxDYAQALFAEBf0EEQQEQxgEiASAANgAAIAELDQAgAQRAIAAgARAZCwuBAwEFf0GRj8AALQAAGgJ/IABBCU8EQAJAQc3/e0EQIAAgAEEQTRsiAGsgAU0NACAAQRAgAUELakF4cSABQQtJGyIEakEMahABIgJFDQAgAkEIayEBAkAgAEEBayIDIAJxRQRAIAEhAAwBCyACQQRrIgUoAgAiBkF4cSACIANqQQAgAGtxQQhrIgIgAEEAIAIgAWtBEE0baiIAIAFrIgJrIQMgBkEDcQRAIAAgAyAAKAIEQQFxckECcjYCBCAAIANqIgMgAygCBEEBcjYCBCAFIAIgBSgCAEEBcXJBAnI2AgAgASACaiIDIAMoAgRBAXI2AgQgASACEAMMAQsgASgCACEBIAAgAzYCBCAAIAEgAmo2AgALAkAgACgCBCIBQQNxRQ0AIAFBeHEiAiAEQRBqTQ0AIAAgBCABQQFxckECcjYCBCAAIARqIgEgAiAEayIEQQNyNgIEIAAgAmoiAiACKAIEQQFyNgIEIAEgBBADCyAAQQhqIQMLIAMMAQsgARABCwsNACAAENwBQQp2QT9xCw8AIAAQGyABEGYQxAEQYgsLACAAIwBqJAAjAAsOAEHvisAAQc8AENgBAAsJACAAIAEQAAALCQAgAEE/cRBnCwoAIAAQG0H/AXELCAAgAEEEEBkLBwAgAEEIdAsJAEEzENEBEGgLBgBBCxBnCwYAQQoQZwsGAEEIEGcLBgBBDxBnCwYAQQYQZwsGAEEJEGcLBgBBBxBnCwYAQQwQZwsGAEECEGcLBgBBARBnCwYAQQMQZwsGAEENEGcLBgBBDhBnCwYAQQUQZwsGAEEEEGcLBgBBEBBnCwYAQQAQZwsEAEEECzMBAX8gACAAKAIAQQFrIgI2AgACQCACDQAgACAAKAIEQQFrIgI2AgQgAg0AIAAgARAZCwsjACAAEMcBIAEQxwEgAhDHASADEMcBECFBCHQgBHIQ0QEQaAsiACAAEMcBIAEQxwEgAhDHASADEA4QIUEIdCAEchDRARBoCx4AIAAQxwEgARDHASACEMcBEDpBCHQgA3IQ0QEQaAsdACAAEMcBIAEQxwEgAhAPEEdBCHQgA3IQ0QEQaAsaACAAEMcBGiAAQQp0QYD4A3EgAXIQ0QEQaAtfAQF/IwBBMGsiBCQAIAQgADYCDCAAIANPBEAgBEECNgIUIAQgAjYCECAEQgE3AhwgBEEDNgIsIAQgBEEoajYCGCAEIARBDGo2AiggBEEQaiABEFcACyAEQTBqJAAgAAtMAQJ/IwBBEGsiBSQAIAVBCGogAxALIAUtAAkhAyAFLQAIIQYgABDHASABEMcBIAIQxwEgBiADEMgBQQh0IARyENEBEGggBUEQaiQAC0wBAn8jAEEQayIFJAAgBUEIaiADEAggBS0ACSEDIAUtAAghBiAAEMcBIAEQxwEgAhDHASAGIAMQiQFBCHQgBHIQ0QEQaCAFQRBqJAALSQAgABDHARogARDHARogAEESdEGAgPAXcSIAIAFBDHRBgOA/cXIiAUGA4ANxQQh0IAFBCHZBgP4DcSAAIAJyQRh2cnIQ0QEQaAtJACAAEMcBGiABEBMiAUEQdEGAgPwHcSAAQRJ0QYCA8B9xIAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2ckEIdCACchDRARBoC0kBAX8jAEEQayIDJAAgABDQASABIAJPBEBB4ILAAEEZENgBAAsgA0EIaiAAEGEgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQQAgABDHARogARDHARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyENEBEGgLNQAgABAUIgBBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyQQh0IAFyENEBEGgLC8gLAQBBgIDAAAu+C0NoZWNrUmVnSWQgd2FzIGdpdmVuIGludmFsaWQgUmVnSWRmdWVsLWFzbS9zcmMvbGliLnJzAAAAIgAQABMAAABuAAAAIgAAAFZhbHVlIGBgIG91dCBvZiByYW5nZSBmb3IgNi1iaXQgaW1tZWRpYXRlAAAASAAQAAcAAABPABAAIgAAACIAEAATAAAAsAMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMTItYml0IGltbWVkaWF0ZQBIABAABwAAAJQAEAAjAAAAIgAQABMAAAC1AwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxOC1iaXQgaW1tZWRpYXRlAEgAEAAHAAAA2AAQACMAAAAiABAAEwAAALoDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDI0LWJpdCBpbW1lZGlhdGUASAAQAAcAAAAcARAAIwAAACIAEAATAAAAvwMAABwAAABpbnZhbGlkIGVudW0gdmFsdWUgcGFzc2VkYXR0ZW1wdGVkIHRvIHRha2Ugb3duZXJzaGlwIG9mIFJ1c3QgdmFsdWUgd2hpbGUgaXQgd2FzIGJvcnJvd2VkEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAhAAAAIgAAACQAAAAlAAAAJgAAACcAAAAoAAAAKQAAACoAAAArAAAALAAAAC0AAAAuAAAALwAAADAAAAAxAAAAMgAAADMAAAA0AAAANQAAADYAAAA3AAAAOAAAADkAAAA6AAAAOwAAADwAAAA9AAAAPgAAAD8AAABAAAAAQQAAAEIAAABDAAAARwAAAEgAAABJAAAASgAAAEsAAABMAAAAUAAAAFEAAABSAAAAUwAAAFQAAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAABbAAAAXAAAAF0AAABeAAAAXwAAAGAAAABhAAAAcAAAAHEAAAByAAAAcwAAAHQAAAB1AAAAdgAAAHcAAAB4AAAAeQAAAJAAAACRAAAAkgAAAJMAAACUAAAAlQAAAJYAAACXAAAAmAAAAKAAAAChAAAAogAAAKMAAACkAAAApQAAAKYAAACnAAAAqAAAAKkAAACqAAAAqwAAAKwAAACtAAAAsAAAALoAAAC7AAAAAQAAAAAAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlAAUAAAAAAAAAAQAAAAYAAAAwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OS9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACABBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAgAQQACkAAACuBAAADQAAAGxpYnJhcnkvc3RkL3NyYy9wYW5pY2tpbmcucnMoBRAAHAAAAIsCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMS4zDHdhc20tYmluZGdlbgYwLjIuOTM=", e);
}
async function Ci() {
  return await Gl(KI());
}
Ci();
const Vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ADD: Ky,
  ADDI: tb,
  ALOC: eb,
  AND: rb,
  ANDI: nb,
  BAL: sb,
  BHEI: ib,
  BHSH: ob,
  BLDD: ab,
  BSIZ: cb,
  BURN: db,
  CALL: ub,
  CB: _b,
  CCP: hb,
  CFE: lb,
  CFEI: Ab,
  CFS: pb,
  CFSI: fb,
  CROO: gb,
  CSIZ: wb,
  CompareArgs: Mr,
  CompareMode: jy,
  DIV: mb,
  DIVI: yb,
  DivArgs: ls,
  ECAL: Ib,
  ECK1: Eb,
  ECR1: vb,
  ED19: Cb,
  EQ: Bb,
  EXP: xb,
  EXPI: Rb,
  FLAG: Sb,
  GM: ri,
  GMArgs: $y,
  GT: Tb,
  GTF: ni,
  GTFArgs: kl,
  Imm06: Tt,
  Imm12: ht,
  Imm18: Se,
  Imm24: be,
  Instruction: k,
  JI: Nb,
  JMP: Db,
  JMPB: Qb,
  JMPF: Fb,
  JNE: Ob,
  JNEB: Mb,
  JNEF: Lb,
  JNEI: Pb,
  JNZB: kb,
  JNZF: Ub,
  JNZI: zb,
  K256: Gb,
  LB: Vb,
  LDC: Hb,
  LOG: Yb,
  LOGD: Xb,
  LT: Wb,
  LW: Zb,
  MCL: jb,
  MCLI: Jb,
  MCP: qb,
  MCPI: $b,
  MEQ: Kb,
  MINT: tI,
  MLDV: eI,
  MLOG: rI,
  MOD: nI,
  MODI: sI,
  MOVE: iI,
  MOVI: oI,
  MROO: aI,
  MUL: cI,
  MULI: dI,
  MathArgs: As,
  MathOp: qy,
  MulArgs: ps,
  NOOP: hI,
  NOT: lI,
  OR: AI,
  ORI: pI,
  POPH: fI,
  POPL: gI,
  PSHH: wI,
  PSHL: mI,
  PanicInstruction: yI,
  PanicReason: Jy,
  RET: bI,
  RETD: II,
  RVRT: EI,
  RegId: h,
  S256: vI,
  SB: CI,
  SCWQ: BI,
  SLL: xI,
  SLLI: RI,
  SMO: SI,
  SRL: TI,
  SRLI: NI,
  SRW: DI,
  SRWQ: QI,
  SUB: FI,
  SUBI: OI,
  SW: MI,
  SWW: LI,
  SWWQ: PI,
  TIME: kI,
  TR: UI,
  TRO: zI,
  WDAM: GI,
  WDCM: si,
  WDDV: ii,
  WDMD: VI,
  WDML: oi,
  WDMM: HI,
  WDOP: ai,
  WQAM: YI,
  WQCM: ci,
  WQDV: di,
  WQMD: XI,
  WQML: ui,
  WQMM: WI,
  WQOP: _i,
  XOR: ZI,
  XORI: jI,
  add: om,
  addi: tr,
  aloc: vm,
  and: am,
  andi: ry,
  bal: Km,
  bhei: Sm,
  bhsh: Rm,
  bldd: Wy,
  bsiz: ei,
  burn: Tm,
  call: qo,
  cb: Fm,
  ccp: Nm,
  cfe: By,
  cfei: vy,
  cfs: xy,
  cfsi: Cy,
  croo: Dm,
  csiz: Qm,
  div: cm,
  divi: ti,
  ecal: Xy,
  eck1: Ym,
  ecr1: Xm,
  ed19: Wm,
  eq: dm,
  exp: um,
  expi: ny,
  flag: $m,
  gm: fy,
  gm_args: J0,
  gt: _m,
  gtf: Ll,
  gtf_args: q0,
  initSync: qI,
  initWasm: Ci,
  ji: Ey,
  jmp: Ks,
  jmpb: my,
  jmpf: wy,
  jne: ty,
  jneb: Iy,
  jnef: by,
  jnei: uy,
  jnzb: Pl,
  jnzf: yy,
  jnzi: gy,
  k256: Zm,
  lb: _y,
  ldc: Zn,
  log: Om,
  logd: Mm,
  lt: hm,
  lw: es,
  mcl: Cm,
  mcli: py,
  mcp: Bm,
  mcpi: Ay,
  meq: xm,
  mint: Lm,
  mldv: Im,
  mlog: lm,
  mod_: pm,
  modi: sy,
  move_: Yr,
  movi: _n,
  mroo: Am,
  mul: fm,
  muli: iy,
  noop: qm,
  not: gm,
  or: wm,
  ori: oy,
  poph: Ny,
  popl: Ty,
  pshh: Sy,
  pshl: Ry,
  ret: Ya,
  retd: Em,
  rvrt: Pm,
  s256: jm,
  sb: hy,
  scwq: km,
  sll: mm,
  slli: ay,
  smo: ey,
  srl: ym,
  srli: cy,
  srw: Um,
  srwq: zm,
  sub: $s,
  subi: Ml,
  sw: ly,
  sww: Gm,
  swwq: Vm,
  time: Jm,
  tr: Ol,
  tro: Hm,
  wdam: Gy,
  wdcm: Dy,
  wdcm_args: $0,
  wddv: Py,
  wddv_args: sm,
  wdmd: Uy,
  wdml: My,
  wdml_args: rm,
  wdmm: Hy,
  wdop: Fy,
  wdop_args: tm,
  wqam: Vy,
  wqcm: Qy,
  wqcm_args: K0,
  wqdv: ky,
  wqdv_args: im,
  wqmd: zy,
  wqml: Ly,
  wqml_args: nm,
  wqmm: Yy,
  wqop: Oy,
  wqop_args: em,
  xor: bm,
  xori: dy
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const me = BigInt(0), Lt = BigInt(1), Vr = BigInt(2), tE = BigInt(3), $o = BigInt(4), v_ = BigInt(5), C_ = BigInt(8);
BigInt(9);
BigInt(16);
function De(e, t) {
  const r = e % t;
  return r >= me ? r : t + r;
}
function eE(e, t, r) {
  if (r <= me || t < me)
    throw new Error("Expected power/modulo > 0");
  if (r === Lt)
    return me;
  let n = Lt;
  for (; t > me; )
    t & Lt && (n = n * e % r), e = e * e % r, t >>= Lt;
  return n;
}
function Le(e, t, r) {
  let n = e;
  for (; t-- > me; )
    n *= n, n %= r;
  return n;
}
function Ko(e, t) {
  if (e === me || t <= me)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let r = De(e, t), n = t, s = me, i = Lt;
  for (; r !== me; ) {
    const a = n / r, u = n % r, A = s - i * a;
    n = r, r = u, s = i, i = A;
  }
  if (n !== Lt)
    throw new Error("invert: does not exist");
  return De(s, t);
}
function rE(e) {
  const t = (e - Lt) / Vr;
  let r, n, s;
  for (r = e - Lt, n = 0; r % Vr === me; r /= Vr, n++)
    ;
  for (s = Vr; s < e && eE(s, t, e) !== e - Lt; s++)
    ;
  if (n === 1) {
    const o = (e + Lt) / $o;
    return function(u, A) {
      const f = u.pow(A, o);
      if (!u.eql(u.sqr(f), A))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  const i = (r + Lt) / Vr;
  return function(a, u) {
    if (a.pow(u, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let A = n, f = a.pow(a.mul(a.ONE, s), r), g = a.pow(u, i), y = a.pow(u, r);
    for (; !a.eql(y, a.ONE); ) {
      if (a.eql(y, a.ZERO))
        return a.ZERO;
      let R = 1;
      for (let S = a.sqr(y); R < A && !a.eql(S, a.ONE); R++)
        S = a.sqr(S);
      const Q = a.pow(f, Lt << BigInt(A - R - 1));
      f = a.sqr(Q), g = a.mul(g, Q), y = a.mul(y, f), A = R;
    }
    return g;
  };
}
function nE(e) {
  if (e % $o === tE) {
    const t = (e + Lt) / $o;
    return function(n, s) {
      const i = n.pow(s, t);
      if (!n.eql(n.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % C_ === v_) {
    const t = (e - v_) / C_;
    return function(n, s) {
      const i = n.mul(s, Vr), o = n.pow(i, t), a = n.mul(s, o), u = n.mul(n.mul(a, Vr), o), A = n.mul(a, n.sub(u, n.ONE));
      if (!n.eql(n.sqr(A), s))
        throw new Error("Cannot find square root");
      return A;
    };
  }
  return rE(e);
}
const sE = [
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
function iE(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, r = sE.reduce((n, s) => (n[s] = "function", n), t);
  return hs(e, r);
}
function oE(e, t, r) {
  if (r < me)
    throw new Error("Expected power > 0");
  if (r === me)
    return e.ONE;
  if (r === Lt)
    return t;
  let n = e.ONE, s = t;
  for (; r > me; )
    r & Lt && (n = e.mul(n, s)), s = e.sqr(s), r >>= Lt;
  return n;
}
function aE(e, t) {
  const r = new Array(t.length), n = t.reduce((i, o, a) => e.is0(o) ? i : (r[a] = i, e.mul(i, o)), e.ONE), s = e.inv(n);
  return t.reduceRight((i, o, a) => e.is0(o) ? i : (r[a] = e.mul(i, r[a]), e.mul(i, o)), s), r;
}
function Hl(e, t) {
  const r = t !== void 0 ? t : e.toString(2).length, n = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: n };
}
function Yl(e, t, r = !1, n = {}) {
  if (e <= me)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = Hl(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = nE(e), a = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: za(s),
    ZERO: me,
    ONE: Lt,
    create: (u) => De(u, e),
    isValid: (u) => {
      if (typeof u != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof u}`);
      return me <= u && u < e;
    },
    is0: (u) => u === me,
    isOdd: (u) => (u & Lt) === Lt,
    neg: (u) => De(-u, e),
    eql: (u, A) => u === A,
    sqr: (u) => De(u * u, e),
    add: (u, A) => De(u + A, e),
    sub: (u, A) => De(u - A, e),
    mul: (u, A) => De(u * A, e),
    pow: (u, A) => oE(a, u, A),
    div: (u, A) => De(u * Ko(A, e), e),
    // Same as above, but doesn't normalize
    sqrN: (u) => u * u,
    addN: (u, A) => u + A,
    subN: (u, A) => u - A,
    mulN: (u, A) => u * A,
    inv: (u) => Ko(u, e),
    sqrt: n.sqrt || ((u) => o(a, u)),
    invertBatch: (u) => aE(a, u),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (u, A, f) => f ? A : u,
    toBytes: (u) => r ? Ua(u, i) : Cn(u, i),
    fromBytes: (u) => {
      if (u.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${u.length}`);
      return r ? ka(u) : Zr(u);
    }
  });
  return Object.freeze(a);
}
function Xl(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Wl(e) {
  const t = Xl(e);
  return t + Math.ceil(t / 2);
}
function cE(e, t, r = !1) {
  const n = e.length, s = Xl(t), i = Wl(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${n}`);
  const o = r ? Zr(e) : ka(e), a = De(o, t - Lt) + Lt;
  return r ? Ua(a, s) : Cn(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const dE = BigInt(0), yo = BigInt(1), bo = /* @__PURE__ */ new WeakMap(), B_ = /* @__PURE__ */ new WeakMap();
function uE(e, t) {
  const r = (i, o) => {
    const a = o.negate();
    return i ? a : o;
  }, n = (i) => {
    if (!Number.isSafeInteger(i) || i <= 0 || i > t)
      throw new Error(`Wrong window size=${i}, should be [1..${t}]`);
  }, s = (i) => {
    n(i);
    const o = Math.ceil(t / i) + 1, a = 2 ** (i - 1);
    return { windows: o, windowSize: a };
  };
  return {
    constTimeNegate: r,
    // non-const time multiplication ladder
    unsafeLadder(i, o) {
      let a = e.ZERO, u = i;
      for (; o > dE; )
        o & yo && (a = a.add(u)), u = u.double(), o >>= yo;
      return a;
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
    precomputeWindow(i, o) {
      const { windows: a, windowSize: u } = s(o), A = [];
      let f = i, g = f;
      for (let y = 0; y < a; y++) {
        g = f, A.push(g);
        for (let R = 1; R < u; R++)
          g = g.add(f), A.push(g);
        f = g.double();
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
    wNAF(i, o, a) {
      const { windows: u, windowSize: A } = s(i);
      let f = e.ZERO, g = e.BASE;
      const y = BigInt(2 ** i - 1), R = 2 ** i, Q = BigInt(i);
      for (let S = 0; S < u; S++) {
        const N = S * A;
        let O = Number(a & y);
        a >>= Q, O > A && (O -= R, a += yo);
        const G = N, L = N + Math.abs(O) - 1, z = S % 2 !== 0, P = O < 0;
        O === 0 ? g = g.add(r(z, o[G])) : f = f.add(r(P, o[L]));
      }
      return { p: f, f: g };
    },
    wNAFCached(i, o, a) {
      const u = B_.get(i) || 1;
      let A = bo.get(i);
      return A || (A = this.precomputeWindow(i, u), u !== 1 && bo.set(i, a(A))), this.wNAF(u, A, o);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(i, o) {
      n(o), B_.set(i, o), bo.delete(i);
    }
  };
}
function _E(e, t, r, n) {
  if (!Array.isArray(r) || !Array.isArray(n) || n.length !== r.length)
    throw new Error("arrays of points and scalars must have equal length");
  n.forEach((f, g) => {
    if (!t.isValid(f))
      throw new Error(`wrong scalar at index ${g}`);
  }), r.forEach((f, g) => {
    if (!(f instanceof e))
      throw new Error(`wrong point at index ${g}`);
  });
  const s = fl(BigInt(r.length)), i = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, o = (1 << i) - 1, a = new Array(o + 1).fill(e.ZERO), u = Math.floor((t.BITS - 1) / i) * i;
  let A = e.ZERO;
  for (let f = u; f >= 0; f -= i) {
    a.fill(e.ZERO);
    for (let y = 0; y < n.length; y++) {
      const R = n[y], Q = Number(R >> BigInt(f) & BigInt(o));
      a[Q] = a[Q].add(r[y]);
    }
    let g = e.ZERO;
    for (let y = a.length - 1, R = e.ZERO; y > 0; y--)
      R = R.add(a[y]), g = g.add(R);
    if (A = A.add(g), f !== 0)
      for (let y = 0; y < i; y++)
        A = A.double();
  }
  return A;
}
function Zl(e) {
  return iE(e.Fp), hs(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Hl(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function x_(e) {
  e.lowS !== void 0 && In("lowS", e.lowS), e.prehash !== void 0 && In("prehash", e.prehash);
}
function hE(e) {
  const t = Zl(e);
  hs(t, {
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
  const { endo: r, Fp: n, a: s } = t;
  if (r) {
    if (!n.eql(s, n.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof r != "object" || typeof r.beta != "bigint" || typeof r.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: lE, hexToBytes: AE } = Mw, _r = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (e, t) => {
      const { Err: r } = _r;
      if (e < 0 || e > 256)
        throw new r("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new r("tlv.encode: unpadded data");
      const n = t.length / 2, s = dn(n);
      if (s.length / 2 & 128)
        throw new r("tlv.encode: long form length too big");
      const i = n > 127 ? dn(s.length / 2 | 128) : "";
      return `${dn(e)}${i}${s}${t}`;
    },
    // v - value, l - left bytes (unparsed)
    decode(e, t) {
      const { Err: r } = _r;
      let n = 0;
      if (e < 0 || e > 256)
        throw new r("tlv.encode: wrong tag");
      if (t.length < 2 || t[n++] !== e)
        throw new r("tlv.decode: wrong tlv");
      const s = t[n++], i = !!(s & 128);
      let o = 0;
      if (!i)
        o = s;
      else {
        const u = s & 127;
        if (!u)
          throw new r("tlv.decode(long): indefinite length not supported");
        if (u > 4)
          throw new r("tlv.decode(long): byte length is too big");
        const A = t.subarray(n, n + u);
        if (A.length !== u)
          throw new r("tlv.decode: length bytes not complete");
        if (A[0] === 0)
          throw new r("tlv.decode(long): zero leftmost byte");
        for (const f of A)
          o = o << 8 | f;
        if (n += u, o < 128)
          throw new r("tlv.decode(long): not minimal encoding");
      }
      const a = t.subarray(n, n + o);
      if (a.length !== o)
        throw new r("tlv.decode: wrong value length");
      return { v: a, l: t.subarray(n + o) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(e) {
      const { Err: t } = _r;
      if (e < hr)
        throw new t("integer: negative integers are not allowed");
      let r = dn(e);
      if (Number.parseInt(r[0], 16) & 8 && (r = "00" + r), r.length & 1)
        throw new t("unexpected assertion");
      return r;
    },
    decode(e) {
      const { Err: t } = _r;
      if (e[0] & 128)
        throw new t("Invalid signature integer: negative");
      if (e[0] === 0 && !(e[1] & 128))
        throw new t("Invalid signature integer: unnecessary leading zero");
      return lE(e);
    }
  },
  toSig(e) {
    const { Err: t, _int: r, _tlv: n } = _r, s = typeof e == "string" ? AE(e) : e;
    _s(s);
    const { v: i, l: o } = n.decode(48, s);
    if (o.length)
      throw new t("Invalid signature: left bytes after parsing");
    const { v: a, l: u } = n.decode(2, i), { v: A, l: f } = n.decode(2, u);
    if (f.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: r.decode(a), s: r.decode(A) };
  },
  hexFromSig(e) {
    const { _tlv: t, _int: r } = _r, n = `${t.encode(2, r.encode(e.r))}${t.encode(2, r.encode(e.s))}`;
    return t.encode(48, n);
  }
}, hr = BigInt(0), ge = BigInt(1);
BigInt(2);
const R_ = BigInt(3);
BigInt(4);
function pE(e) {
  const t = hE(e), { Fp: r } = t, n = Yl(t.n, t.nBitLength), s = t.toBytes || ((S, N, O) => {
    const G = N.toAffine();
    return Kn(Uint8Array.from([4]), r.toBytes(G.x), r.toBytes(G.y));
  }), i = t.fromBytes || ((S) => {
    const N = S.subarray(1), O = r.fromBytes(N.subarray(0, r.BYTES)), G = r.fromBytes(N.subarray(r.BYTES, 2 * r.BYTES));
    return { x: O, y: G };
  });
  function o(S) {
    const { a: N, b: O } = t, G = r.sqr(S), L = r.mul(G, S);
    return r.add(r.add(L, r.mul(S, N)), O);
  }
  if (!r.eql(r.sqr(t.Gy), o(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function a(S) {
    return Ii(S, ge, t.n);
  }
  function u(S) {
    const { allowedPrivateKeyLengths: N, nByteLength: O, wrapPrivateKey: G, n: L } = t;
    if (N && typeof S != "bigint") {
      if (qr(S) && (S = En(S)), typeof S != "string" || !N.includes(S.length))
        throw new Error("Invalid key");
      S = S.padStart(O * 2, "0");
    }
    let z;
    try {
      z = typeof S == "bigint" ? S : Zr(We("private key", S, O));
    } catch {
      throw new Error(`private key must be ${O} bytes, hex or bigint, not ${typeof S}`);
    }
    return G && (z = De(z, L)), jr("private key", z, ge, L), z;
  }
  function A(S) {
    if (!(S instanceof y))
      throw new Error("ProjectivePoint expected");
  }
  const f = Yo((S, N) => {
    const { px: O, py: G, pz: L } = S;
    if (r.eql(L, r.ONE))
      return { x: O, y: G };
    const z = S.is0();
    N == null && (N = z ? r.ONE : r.inv(L));
    const P = r.mul(O, N), Z = r.mul(G, N), j = r.mul(L, N);
    if (z)
      return { x: r.ZERO, y: r.ZERO };
    if (!r.eql(j, r.ONE))
      throw new Error("invZ was invalid");
    return { x: P, y: Z };
  }), g = Yo((S) => {
    if (S.is0()) {
      if (t.allowInfinityPoint && !r.is0(S.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: N, y: O } = S.toAffine();
    if (!r.isValid(N) || !r.isValid(O))
      throw new Error("bad point: x or y not FE");
    const G = r.sqr(O), L = o(N);
    if (!r.eql(G, L))
      throw new Error("bad point: equation left != right");
    if (!S.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class y {
    constructor(N, O, G) {
      if (this.px = N, this.py = O, this.pz = G, N == null || !r.isValid(N))
        throw new Error("x required");
      if (O == null || !r.isValid(O))
        throw new Error("y required");
      if (G == null || !r.isValid(G))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(N) {
      const { x: O, y: G } = N || {};
      if (!N || !r.isValid(O) || !r.isValid(G))
        throw new Error("invalid affine point");
      if (N instanceof y)
        throw new Error("projective point not allowed");
      const L = (z) => r.eql(z, r.ZERO);
      return L(O) && L(G) ? y.ZERO : new y(O, G, r.ONE);
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
    static normalizeZ(N) {
      const O = r.invertBatch(N.map((G) => G.pz));
      return N.map((G, L) => G.toAffine(O[L])).map(y.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(N) {
      const O = y.fromAffine(i(We("pointHex", N)));
      return O.assertValidity(), O;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(N) {
      return y.BASE.multiply(u(N));
    }
    // Multiscalar Multiplication
    static msm(N, O) {
      return _E(y, n, N, O);
    }
    // "Private method", don't use it directly
    _setWindowSize(N) {
      Q.setWindowSize(this, N);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      g(this);
    }
    hasEvenY() {
      const { y: N } = this.toAffine();
      if (r.isOdd)
        return !r.isOdd(N);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(N) {
      A(N);
      const { px: O, py: G, pz: L } = this, { px: z, py: P, pz: Z } = N, j = r.eql(r.mul(O, Z), r.mul(z, L)), V = r.eql(r.mul(G, Z), r.mul(P, L));
      return j && V;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new y(this.px, r.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: N, b: O } = t, G = r.mul(O, R_), { px: L, py: z, pz: P } = this;
      let Z = r.ZERO, j = r.ZERO, V = r.ZERO, U = r.mul(L, L), ot = r.mul(z, z), q = r.mul(P, P), $ = r.mul(L, z);
      return $ = r.add($, $), V = r.mul(L, P), V = r.add(V, V), Z = r.mul(N, V), j = r.mul(G, q), j = r.add(Z, j), Z = r.sub(ot, j), j = r.add(ot, j), j = r.mul(Z, j), Z = r.mul($, Z), V = r.mul(G, V), q = r.mul(N, q), $ = r.sub(U, q), $ = r.mul(N, $), $ = r.add($, V), V = r.add(U, U), U = r.add(V, U), U = r.add(U, q), U = r.mul(U, $), j = r.add(j, U), q = r.mul(z, P), q = r.add(q, q), U = r.mul(q, $), Z = r.sub(Z, U), V = r.mul(q, ot), V = r.add(V, V), V = r.add(V, V), new y(Z, j, V);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(N) {
      A(N);
      const { px: O, py: G, pz: L } = this, { px: z, py: P, pz: Z } = N;
      let j = r.ZERO, V = r.ZERO, U = r.ZERO;
      const ot = t.a, q = r.mul(t.b, R_);
      let $ = r.mul(O, z), C = r.mul(G, P), d = r.mul(L, Z), _ = r.add(O, G), p = r.add(z, P);
      _ = r.mul(_, p), p = r.add($, C), _ = r.sub(_, p), p = r.add(O, L);
      let w = r.add(z, Z);
      return p = r.mul(p, w), w = r.add($, d), p = r.sub(p, w), w = r.add(G, L), j = r.add(P, Z), w = r.mul(w, j), j = r.add(C, d), w = r.sub(w, j), U = r.mul(ot, p), j = r.mul(q, d), U = r.add(j, U), j = r.sub(C, U), U = r.add(C, U), V = r.mul(j, U), C = r.add($, $), C = r.add(C, $), d = r.mul(ot, d), p = r.mul(q, p), C = r.add(C, d), d = r.sub($, d), d = r.mul(ot, d), p = r.add(p, d), $ = r.mul(C, p), V = r.add(V, $), $ = r.mul(w, p), j = r.mul(_, j), j = r.sub(j, $), $ = r.mul(_, C), U = r.mul(w, U), U = r.add(U, $), new y(j, V, U);
    }
    subtract(N) {
      return this.add(N.negate());
    }
    is0() {
      return this.equals(y.ZERO);
    }
    wNAF(N) {
      return Q.wNAFCached(this, N, y.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(N) {
      jr("scalar", N, hr, t.n);
      const O = y.ZERO;
      if (N === hr)
        return O;
      if (N === ge)
        return this;
      const { endo: G } = t;
      if (!G)
        return Q.unsafeLadder(this, N);
      let { k1neg: L, k1: z, k2neg: P, k2: Z } = G.splitScalar(N), j = O, V = O, U = this;
      for (; z > hr || Z > hr; )
        z & ge && (j = j.add(U)), Z & ge && (V = V.add(U)), U = U.double(), z >>= ge, Z >>= ge;
      return L && (j = j.negate()), P && (V = V.negate()), V = new y(r.mul(V.px, G.beta), V.py, V.pz), j.add(V);
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
    multiply(N) {
      const { endo: O, n: G } = t;
      jr("scalar", N, ge, G);
      let L, z;
      if (O) {
        const { k1neg: P, k1: Z, k2neg: j, k2: V } = O.splitScalar(N);
        let { p: U, f: ot } = this.wNAF(Z), { p: q, f: $ } = this.wNAF(V);
        U = Q.constTimeNegate(P, U), q = Q.constTimeNegate(j, q), q = new y(r.mul(q.px, O.beta), q.py, q.pz), L = U.add(q), z = ot.add($);
      } else {
        const { p: P, f: Z } = this.wNAF(N);
        L = P, z = Z;
      }
      return y.normalizeZ([L, z])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(N, O, G) {
      const L = y.BASE, z = (Z, j) => j === hr || j === ge || !Z.equals(L) ? Z.multiplyUnsafe(j) : Z.multiply(j), P = z(this, O).add(z(N, G));
      return P.is0() ? void 0 : P;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(N) {
      return f(this, N);
    }
    isTorsionFree() {
      const { h: N, isTorsionFree: O } = t;
      if (N === ge)
        return !0;
      if (O)
        return O(y, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: N, clearCofactor: O } = t;
      return N === ge ? this : O ? O(y, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(N = !0) {
      return In("isCompressed", N), this.assertValidity(), s(y, this, N);
    }
    toHex(N = !0) {
      return In("isCompressed", N), En(this.toRawBytes(N));
    }
  }
  y.BASE = new y(t.Gx, t.Gy, r.ONE), y.ZERO = new y(r.ZERO, r.ONE, r.ZERO);
  const R = t.nBitLength, Q = uE(y, t.endo ? Math.ceil(R / 2) : R);
  return {
    CURVE: t,
    ProjectivePoint: y,
    normPrivateKeyToScalar: u,
    weierstrassEquation: o,
    isWithinCurveOrder: a
  };
}
function fE(e) {
  const t = Zl(e);
  return hs(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function gE(e) {
  const t = fE(e), { Fp: r, n } = t, s = r.BYTES + 1, i = 2 * r.BYTES + 1;
  function o(d) {
    return De(d, n);
  }
  function a(d) {
    return Ko(d, n);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: A, weierstrassEquation: f, isWithinCurveOrder: g } = pE({
    ...t,
    toBytes(d, _, p) {
      const w = _.toAffine(), b = r.toBytes(w.x), B = Kn;
      return In("isCompressed", p), p ? B(Uint8Array.from([_.hasEvenY() ? 2 : 3]), b) : B(Uint8Array.from([4]), b, r.toBytes(w.y));
    },
    fromBytes(d) {
      const _ = d.length, p = d[0], w = d.subarray(1);
      if (_ === s && (p === 2 || p === 3)) {
        const b = Zr(w);
        if (!Ii(b, ge, r.ORDER))
          throw new Error("Point is not on curve");
        const B = f(b);
        let T;
        try {
          T = r.sqrt(B);
        } catch (E) {
          const et = E instanceof Error ? ": " + E.message : "";
          throw new Error("Point is not on curve" + et);
        }
        const I = (T & ge) === ge;
        return (p & 1) === 1 !== I && (T = r.neg(T)), { x: b, y: T };
      } else if (_ === i && p === 4) {
        const b = r.fromBytes(w.subarray(0, r.BYTES)), B = r.fromBytes(w.subarray(r.BYTES, 2 * r.BYTES));
        return { x: b, y: B };
      } else
        throw new Error(`Point of length ${_} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), y = (d) => En(Cn(d, t.nByteLength));
  function R(d) {
    const _ = n >> ge;
    return d > _;
  }
  function Q(d) {
    return R(d) ? o(-d) : d;
  }
  const S = (d, _, p) => Zr(d.slice(_, p));
  class N {
    constructor(_, p, w) {
      this.r = _, this.s = p, this.recovery = w, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(_) {
      const p = t.nByteLength;
      return _ = We("compactSignature", _, p * 2), new N(S(_, 0, p), S(_, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(_) {
      const { r: p, s: w } = _r.toSig(We("DER", _));
      return new N(p, w);
    }
    assertValidity() {
      jr("r", this.r, ge, n), jr("s", this.s, ge, n);
    }
    addRecoveryBit(_) {
      return new N(this.r, this.s, _);
    }
    recoverPublicKey(_) {
      const { r: p, s: w, recovery: b } = this, B = Z(We("msgHash", _));
      if (b == null || ![0, 1, 2, 3].includes(b))
        throw new Error("recovery id invalid");
      const T = b === 2 || b === 3 ? p + t.n : p;
      if (T >= r.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const I = b & 1 ? "03" : "02", l = u.fromHex(I + y(T)), E = a(T), et = o(-B * E), tt = o(w * E), rt = u.BASE.multiplyAndAddUnsafe(l, et, tt);
      if (!rt)
        throw new Error("point at infinify");
      return rt.assertValidity(), rt;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return R(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new N(this.r, o(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return vn(this.toDERHex());
    }
    toDERHex() {
      return _r.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return vn(this.toCompactHex());
    }
    toCompactHex() {
      return y(this.r) + y(this.s);
    }
  }
  const O = {
    isValidPrivateKey(d) {
      try {
        return A(d), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: A,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const d = Wl(t.n);
      return cE(t.randomBytes(d), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(d = 8, _ = u.BASE) {
      return _._setWindowSize(d), _.multiply(BigInt(3)), _;
    }
  };
  function G(d, _ = !0) {
    return u.fromPrivateKey(d).toRawBytes(_);
  }
  function L(d) {
    const _ = qr(d), p = typeof d == "string", w = (_ || p) && d.length;
    return _ ? w === s || w === i : p ? w === 2 * s || w === 2 * i : d instanceof u;
  }
  function z(d, _, p = !0) {
    if (L(d))
      throw new Error("first arg must be private key");
    if (!L(_))
      throw new Error("second arg must be public key");
    return u.fromHex(_).multiply(A(d)).toRawBytes(p);
  }
  const P = t.bits2int || function(d) {
    const _ = Zr(d), p = d.length * 8 - t.nBitLength;
    return p > 0 ? _ >> BigInt(p) : _;
  }, Z = t.bits2int_modN || function(d) {
    return o(P(d));
  }, j = za(t.nBitLength);
  function V(d) {
    return jr(`num < 2^${t.nBitLength}`, d, hr, j), Cn(d, t.nByteLength);
  }
  function U(d, _, p = ot) {
    if (["recovered", "canonical"].some((lt) => lt in p))
      throw new Error("sign() legacy options not supported");
    const { hash: w, randomBytes: b } = t;
    let { lowS: B, prehash: T, extraEntropy: I } = p;
    B == null && (B = !0), d = We("msgHash", d), x_(p), T && (d = We("prehashed msgHash", w(d)));
    const l = Z(d), E = A(_), et = [V(E), V(l)];
    if (I != null && I !== !1) {
      const lt = I === !0 ? b(r.BYTES) : I;
      et.push(We("extraEntropy", lt));
    }
    const tt = Kn(...et), rt = l;
    function xt(lt) {
      const mt = P(lt);
      if (!g(mt))
        return;
      const je = a(mt), bt = u.BASE.multiply(mt).toAffine(), pt = o(bt.x);
      if (pt === hr)
        return;
      const Ie = o(je * o(rt + pt * E));
      if (Ie === hr)
        return;
      let Rt = (bt.x === pt ? 0 : 2) | Number(bt.y & ge), Ft = Ie;
      return B && R(Ie) && (Ft = Q(Ie), Rt ^= 1), new N(pt, Ft, Rt);
    }
    return { seed: tt, k2sig: xt };
  }
  const ot = { lowS: t.lowS, prehash: !1 }, q = { lowS: t.lowS, prehash: !1 };
  function $(d, _, p = ot) {
    const { seed: w, k2sig: b } = U(d, _, p), B = t;
    return gl(B.hash.outputLen, B.nByteLength, B.hmac)(w, b);
  }
  u.BASE._setWindowSize(8);
  function C(d, _, p, w = q) {
    var bt;
    const b = d;
    if (_ = We("msgHash", _), p = We("publicKey", p), "strict" in w)
      throw new Error("options.strict was renamed to lowS");
    x_(w);
    const { lowS: B, prehash: T } = w;
    let I, l;
    try {
      if (typeof b == "string" || qr(b))
        try {
          I = N.fromDER(b);
        } catch (pt) {
          if (!(pt instanceof _r.Err))
            throw pt;
          I = N.fromCompact(b);
        }
      else if (typeof b == "object" && typeof b.r == "bigint" && typeof b.s == "bigint") {
        const { r: pt, s: Ie } = b;
        I = new N(pt, Ie);
      } else
        throw new Error("PARSE");
      l = u.fromHex(p);
    } catch (pt) {
      if (pt.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (B && I.hasHighS())
      return !1;
    T && (_ = t.hash(_));
    const { r: E, s: et } = I, tt = Z(_), rt = a(et), xt = o(tt * rt), lt = o(E * rt), mt = (bt = u.BASE.multiplyAndAddUnsafe(l, xt, lt)) == null ? void 0 : bt.toAffine();
    return mt ? o(mt.x) === E : !1;
  }
  return {
    CURVE: t,
    getPublicKey: G,
    getSharedSecret: z,
    sign: $,
    verify: C,
    ProjectivePoint: u,
    Signature: N,
    utils: O
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function wE(e) {
  return {
    hash: e,
    hmac: (t, ...r) => mi(e, t, hf(...r)),
    randomBytes: Af
  };
}
function mE(e, t) {
  const r = (n) => gE({ ...e, ...wE(n) });
  return Object.freeze({ ...r(t), create: r });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const jl = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), S_ = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), yE = BigInt(1), ta = BigInt(2), T_ = (e, t) => (e + t / ta) / t;
function bE(e) {
  const t = jl, r = BigInt(3), n = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), a = BigInt(44), u = BigInt(88), A = e * e * e % t, f = A * A * e % t, g = Le(f, r, t) * f % t, y = Le(g, r, t) * f % t, R = Le(y, ta, t) * A % t, Q = Le(R, s, t) * R % t, S = Le(Q, i, t) * Q % t, N = Le(S, a, t) * S % t, O = Le(N, u, t) * N % t, G = Le(O, a, t) * S % t, L = Le(G, r, t) * f % t, z = Le(L, o, t) * Q % t, P = Le(z, n, t) * A % t, Z = Le(P, ta, t);
  if (!ea.eql(ea.sqr(Z), e))
    throw new Error("Cannot find square root");
  return Z;
}
const ea = Yl(jl, void 0, void 0, { sqrt: bE }), vr = mE({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: ea,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: S_,
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
      const t = S_, r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -yE * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = r, o = BigInt("0x100000000000000000000000000000000"), a = T_(i * e, t), u = T_(-n * e, t);
      let A = De(e - a * r - u * s, t), f = De(-a * n - u * i, t);
      const g = A > o, y = f > o;
      if (g && (A = t - A), y && (f = t - f), A > o || f > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: g, k1: A, k2neg: y, k2: f };
    }
  }
}, Or);
BigInt(0);
vr.ProjectivePoint;
var Xa = { exports: {} }, pn = typeof Reflect == "object" ? Reflect : null, N_ = pn && typeof pn.apply == "function" ? pn.apply : function(t, r, n) {
  return Function.prototype.apply.call(t, r, n);
}, Ms;
pn && typeof pn.ownKeys == "function" ? Ms = pn.ownKeys : Object.getOwnPropertySymbols ? Ms = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Ms = function(t) {
  return Object.getOwnPropertyNames(t);
};
function IE(e) {
  console && console.warn && console.warn(e);
}
var Jl = Number.isNaN || function(t) {
  return t !== t;
};
function Bt() {
  Bt.init.call(this);
}
Xa.exports = Bt;
Xa.exports.once = BE;
Bt.EventEmitter = Bt;
Bt.prototype._events = void 0;
Bt.prototype._eventsCount = 0;
Bt.prototype._maxListeners = void 0;
var D_ = 10;
function Bi(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Bt, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return D_;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Jl(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    D_ = e;
  }
});
Bt.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Bt.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Jl(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function ql(e) {
  return e._maxListeners === void 0 ? Bt.defaultMaxListeners : e._maxListeners;
}
Bt.prototype.getMaxListeners = function() {
  return ql(this);
};
Bt.prototype.emit = function(t) {
  for (var r = [], n = 1; n < arguments.length; n++) r.push(arguments[n]);
  var s = t === "error", i = this._events;
  if (i !== void 0)
    s = s && i.error === void 0;
  else if (!s)
    return !1;
  if (s) {
    var o;
    if (r.length > 0 && (o = r[0]), o instanceof Error)
      throw o;
    var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw a.context = o, a;
  }
  var u = i[t];
  if (u === void 0)
    return !1;
  if (typeof u == "function")
    N_(u, this, r);
  else
    for (var A = u.length, f = rA(u, A), n = 0; n < A; ++n)
      N_(f[n], this, r);
  return !0;
};
function $l(e, t, r, n) {
  var s, i, o;
  if (Bi(r), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    r.listener ? r.listener : r
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = r, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = n ? [r, o] : [o, r] : n ? o.unshift(r) : o.push(r), s = ql(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = e, a.type = t, a.count = o.length, IE(a);
  }
  return e;
}
Bt.prototype.addListener = function(t, r) {
  return $l(this, t, r, !1);
};
Bt.prototype.on = Bt.prototype.addListener;
Bt.prototype.prependListener = function(t, r) {
  return $l(this, t, r, !0);
};
function EE() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Kl(e, t, r) {
  var n = { fired: !1, wrapFn: void 0, target: e, type: t, listener: r }, s = EE.bind(n);
  return s.listener = r, n.wrapFn = s, s;
}
Bt.prototype.once = function(t, r) {
  return Bi(r), this.on(t, Kl(this, t, r)), this;
};
Bt.prototype.prependOnceListener = function(t, r) {
  return Bi(r), this.prependListener(t, Kl(this, t, r)), this;
};
Bt.prototype.removeListener = function(t, r) {
  var n, s, i, o, a;
  if (Bi(r), s = this._events, s === void 0)
    return this;
  if (n = s[t], n === void 0)
    return this;
  if (n === r || n.listener === r)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete s[t], s.removeListener && this.emit("removeListener", t, n.listener || r));
  else if (typeof n != "function") {
    for (i = -1, o = n.length - 1; o >= 0; o--)
      if (n[o] === r || n[o].listener === r) {
        a = n[o].listener, i = o;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? n.shift() : vE(n, i), n.length === 1 && (s[t] = n[0]), s.removeListener !== void 0 && this.emit("removeListener", t, a || r);
  }
  return this;
};
Bt.prototype.off = Bt.prototype.removeListener;
Bt.prototype.removeAllListeners = function(t) {
  var r, n, s;
  if (n = this._events, n === void 0)
    return this;
  if (n.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[t] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[t]), this;
  if (arguments.length === 0) {
    var i = Object.keys(n), o;
    for (s = 0; s < i.length; ++s)
      o = i[s], o !== "removeListener" && this.removeAllListeners(o);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (r = n[t], typeof r == "function")
    this.removeListener(t, r);
  else if (r !== void 0)
    for (s = r.length - 1; s >= 0; s--)
      this.removeListener(t, r[s]);
  return this;
};
function tA(e, t, r) {
  var n = e._events;
  if (n === void 0)
    return [];
  var s = n[t];
  return s === void 0 ? [] : typeof s == "function" ? r ? [s.listener || s] : [s] : r ? CE(s) : rA(s, s.length);
}
Bt.prototype.listeners = function(t) {
  return tA(this, t, !0);
};
Bt.prototype.rawListeners = function(t) {
  return tA(this, t, !1);
};
Bt.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : eA.call(e, t);
};
Bt.prototype.listenerCount = eA;
function eA(e) {
  var t = this._events;
  if (t !== void 0) {
    var r = t[e];
    if (typeof r == "function")
      return 1;
    if (r !== void 0)
      return r.length;
  }
  return 0;
}
Bt.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Ms(this._events) : [];
};
function rA(e, t) {
  for (var r = new Array(t), n = 0; n < t; ++n)
    r[n] = e[n];
  return r;
}
function vE(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function CE(e) {
  for (var t = new Array(e.length), r = 0; r < t.length; ++r)
    t[r] = e[r].listener || e[r];
  return t;
}
function BE(e, t) {
  return new Promise(function(r, n) {
    function s(o) {
      e.removeListener(t, i), n(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), r([].slice.call(arguments));
    }
    nA(e, t, i, { once: !0 }), t !== "error" && xE(e, s, { once: !0 });
  });
}
function xE(e, t, r) {
  typeof e.on == "function" && nA(e, "error", t, r);
}
function nA(e, t, r, n) {
  if (typeof e.on == "function")
    n.once ? e.once(t, r) : e.on(t, r);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      n.once && e.removeEventListener(t, s), r(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var sA = Xa.exports, RE = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", SE = class {
  constructor(e, t, r, n, s, i = 0) {
    F(this, "left");
    F(this, "right");
    F(this, "parent");
    F(this, "hash");
    F(this, "data");
    F(this, "index");
    this.left = e, this.right = t, this.parent = r, this.hash = n, this.data = s, this.index = i;
  }
}, Q_ = SE;
function TE(e) {
  return ze("0x00".concat(e.slice(2)));
}
function NE(e, t) {
  return ze("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function iA(e) {
  if (!e.length)
    return RE;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = TE(e[i]);
    t.push(new Q_(-1, -1, -1, o, e[i]));
  }
  let r = t, n = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < n - s; i += 1) {
      const o = i << 1, a = NE(r[o].hash, r[o + 1].hash);
      t[i] = new Q_(r[o].index, r[o + 1].index, -1, a, "");
    }
    if (s === 1 && (t[i] = r[i << 1]), n === 1)
      break;
    s = n & 1, n = n + 1 >> 1, r = t;
  }
  return t[0].hash;
}
var DE = "0x00", oA = "0x01";
function QE(e, t) {
  const r = "0x00".concat(e.slice(2)).concat(ze(t).slice(2));
  return [ze(r), r];
}
function nn(e, t) {
  const r = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [ze(r), r];
}
function Io(e) {
  const t = oA.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function FE(e) {
  const t = oA.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Eo(e) {
  return e.slice(0, 4) === DE;
}
var OE = class {
  constructor(e, t, r, n, s) {
    F(this, "SideNodes");
    F(this, "NonMembershipLeafData");
    F(this, "BitMask");
    F(this, "NumSideNodes");
    F(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = r, this.NumSideNodes = n, this.SiblingData = s;
  }
}, ME = OE, LE = class {
  constructor(e, t, r) {
    F(this, "SideNodes");
    F(this, "NonMembershipLeafData");
    F(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = r;
  }
}, PE = LE, Fe = "0x0000000000000000000000000000000000000000000000000000000000000000", ur = 256;
function hn(e, t) {
  const r = e.slice(2), n = "0x".concat(
    r.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(n) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function kE(e) {
  let t = 0, r = e.length - 1;
  const n = e;
  for (; t < r; )
    [n[t], n[r]] = [
      n[r],
      n[t]
    ], t += 1, r -= 1;
  return n;
}
function UE(e, t) {
  let r = 0;
  for (let n = 0; n < ur && hn(e, n) === hn(t, n); n += 1)
    r += 1;
  return r;
}
function zE(e) {
  const t = [], r = [];
  let n;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    n = e.SideNodes[i], n === Fe ? t.push(0) : (r.push(n), t.push(1));
  return new ME(
    r,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var GE = class {
  constructor() {
    F(this, "ms");
    F(this, "root");
    const e = {};
    this.ms = e, this.root = Fe, this.ms[this.root] = Fe;
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
    const r = [];
    if (t === Fe)
      return [r, Fe, "", ""];
    let n = this.get(t);
    if (Eo(n))
      return [r, t, n, ""];
    let s, i, o = "", a = "";
    for (let A = 0; A < ur; A += 1) {
      if ([s, i] = FE(n), hn(e, A) === 1 ? (a = s, o = i) : (a = i, o = s), r.push(a), o === Fe) {
        n = "";
        break;
      }
      if (n = this.get(o), Eo(n))
        break;
    }
    const u = this.get(a);
    return [kE(r), o, n, u];
  }
  deleteWithSideNodes(e, t, r, n) {
    if (r === Fe)
      return this.root;
    const [s] = Io(n);
    if (s !== e)
      return this.root;
    let i = "", o = "", a = "", u = "", A = !1;
    for (let f = 0; f < t.length; f += 1)
      if (t[f] !== "") {
        if (a = t[f], o === "")
          if (u = this.get(a), Eo(u)) {
            i = a, o = a;
            continue;
          } else
            o = Fe, A = !0;
        !A && a === Fe || (A || (A = !0), hn(e, t.length - 1 - f) === 1 ? [i, o] = nn(a, o) : [i, o] = nn(o, a), this.set(i, o), o = i);
      }
    return i === "" && (i = Fe), i;
  }
  updateWithSideNodes(e, t, r, n, s) {
    let i, o;
    this.set(ze(t), t), [i, o] = QE(e, t), this.set(i, o), o = i;
    let a;
    if (n === Fe)
      a = ur;
    else {
      const [u] = Io(s);
      a = UE(e, u);
    }
    a !== ur && (hn(e, a) === 1 ? [i, o] = nn(n, o) : [i, o] = nn(o, n), this.set(i, o), o = i);
    for (let u = 0; u < ur; u += 1) {
      let A;
      const f = ur - r.length;
      if (u - f < 0 || r[u - f] === "")
        if (a !== ur && a > ur - 1 - u)
          A = Fe;
        else
          continue;
      else
        A = r[u - f];
      hn(e, ur - 1 - u) === 1 ? [i, o] = nn(A, o) : [i, o] = nn(o, A), this.set(i, o), o = i;
    }
    return i;
  }
  update(e, t) {
    const [r, n, s] = this.sideNodesForRoot(e, this.root), i = this.updateWithSideNodes(e, t, r, n, s);
    this.setRoot(i);
  }
  delete(e) {
    const [t, r, n] = this.sideNodesForRoot(e, this.root), s = this.deleteWithSideNodes(e, t, r, n);
    this.setRoot(s);
  }
  prove(e) {
    const [t, r, n, s] = this.sideNodesForRoot(e, this.root), i = [];
    for (let u = 0; u < t.length; u += 1)
      t[u] !== "" && i.push(t[u]);
    let o = "";
    if (r !== Fe) {
      const [u] = Io(n);
      u !== e && (o = n);
    }
    return new PE(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return zE(t);
  }
}, VE = Object.defineProperty, HE = (e, t, r) => t in e ? VE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Nt = (e, t, r) => (HE(e, typeof t != "symbol" ? t + "" : t, r), r), Wa = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, Dt = (e, t, r) => (Wa(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Sr = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, Ze = (e, t, r, n) => (Wa(e, t, "write to private field"), t.set(e, r), r), ra = (e, t, r) => (Wa(e, t, "access private method"), r), Za = (e) => {
  let t, r, n;
  Array.isArray(e) ? (r = e[0], t = e[1], n = e[2] ?? void 0) : (r = e.amount, t = e.assetId, n = e.max ?? void 0);
  const s = x(r);
  return {
    assetId: X(t),
    amount: s.lt(1) ? x(1) : s,
    max: n ? x(n) : void 0
  };
}, YE = (e) => {
  const { amount: t, assetId: r } = e, n = [...e.coinQuantities], s = n.findIndex((i) => i.assetId === r);
  return s !== -1 ? n[s].amount = n[s].amount.add(t) : n.push({ assetId: r, amount: t }), n;
}, ja = K`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, Ja = K`
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
    `, aA = K`
    fragment SuccessStatusFragment on SuccessStatus {
  type: __typename
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
    ${Ja}`, cA = K`
    fragment SuccessStatusWithBlockIdFragment on SuccessStatus {
  ...SuccessStatusFragment
  block {
    id
  }
}
    ${aA}`, XE = K`
    fragment malleableTransactionFieldsFragment on Transaction {
  receiptsRoot
  inputs {
    type: __typename
    ... on InputCoin {
      txPointer
    }
    ... on InputContract {
      txPointer
    }
  }
  outputs {
    type: __typename
    ... on CoinOutput {
      to
      amount
      assetId
    }
    ... on ContractOutput {
      inputIndex
      balanceRoot
      stateRoot
    }
    ... on ChangeOutput {
      to
      amount
      assetId
    }
    ... on VariableOutput {
      to
      amount
      assetId
    }
    ... on ContractCreated {
      contract
      stateRoot
    }
  }
}
    `, dA = K`
    fragment FailureStatusFragment on FailureStatus {
  type: __typename
  totalGas
  totalFee
  time
  reason
  receipts {
    ...receiptFragment
  }
}
    ${Ja}`, uA = K`
    fragment FailureStatusWithBlockIdFragment on FailureStatus {
  ...FailureStatusFragment
  block {
    id
  }
}
    ${dA}`, qa = K`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, $a = K`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  ... on SubmittedStatus {
    ...SubmittedStatusFragment
  }
  ... on SuccessStatus {
    ...SuccessStatusWithBlockIdFragment
    transaction {
      ...malleableTransactionFieldsFragment
    }
  }
  ... on FailureStatus {
    ...FailureStatusWithBlockIdFragment
    transaction {
      ...malleableTransactionFieldsFragment
    }
  }
  ... on SqueezedOutStatus {
    ...SqueezedOutStatusFragment
  }
}
    ${ja}
${cA}
${XE}
${uA}
${qa}`, WE = K`
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
    ${ja}
${aA}
${dA}
${qa}`, _A = K`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${WE}`, ZE = K`
    fragment transactionRawPayloadFragment on Transaction {
  id
  rawPayload
}
    `, jE = K`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, JE = K`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${jE}`, qE = K`
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
    `, $E = K`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, KE = K`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${qE}
${$E}`, t1 = K`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${KE}
${Ja}`, xi = K`
    fragment blockFragment on Block {
  id
  height
  header {
    time
    daHeight
    stateTransitionBytecodeVersion
    transactionsCount
    transactionsRoot
    messageOutboxRoot
    eventInboxRoot
    prevRoot
    applicationHash
  }
  transactions {
    id
  }
}
    `, Ka = K`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, e1 = K`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, hA = K`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  daHeight
}
    `, r1 = K`
    fragment getMessageFragment on Message {
  ...messageFragment
  nonce
}
    ${hA}`, n1 = K`
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
  amount
  data
}
    `, s1 = K`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, i1 = K`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, o1 = K`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, a1 = K`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, c1 = K`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, d1 = K`
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
    `, u1 = K`
    fragment GasCostsFragment on GasCosts {
  contractRoot {
    ...DependentCostFragment
  }
  stateRoot {
    ...DependentCostFragment
  }
  vmInitialization {
    ...DependentCostFragment
  }
  s256 {
    ...DependentCostFragment
  }
  ecr1
  newStoragePerByte
}
    ${d1}`, _1 = K`
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
    ${s1}
${i1}
${o1}
${a1}
${c1}
${u1}`, lA = K`
    fragment chainInfoFragment on ChainInfo {
  name
  daHeight
  consensusParameters {
    ...consensusParametersFragment
  }
}
    ${_1}`, h1 = K`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Tn = K`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, AA = K`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, l1 = K`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, A1 = K`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, p1 = K`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${AA}`, f1 = K`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${lA}`, g1 = K`
    query getChainAndNodeInfo {
  chain {
    ...chainInfoFragment
  }
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${lA}
${AA}`, w1 = K`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${_A}`, m1 = K`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    id
    rawPayload
    status {
      ... on SubmittedStatus {
        ...SubmittedStatusFragment
      }
      ... on SuccessStatus {
        ...SuccessStatusWithBlockIdFragment
      }
      ... on FailureStatus {
        ...FailureStatusWithBlockIdFragment
      }
      ... on SqueezedOutStatus {
        ...SqueezedOutStatusFragment
      }
    }
  }
}
    ${ja}
${cA}
${uA}
${qa}`, y1 = K`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        rawPayload
      }
    }
    pageInfo {
      ...pageInfoFragment
    }
  }
}
    ${Tn}`, b1 = K`
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
    ${Tn}
${_A}`, I1 = K`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${JE}`, E1 = K`
    query getLatestBlock {
  chain {
    latestBlock {
      ...blockFragment
    }
  }
}
    ${xi}`, v1 = K`
    query getLatestBlockHeight {
  chain {
    latestBlock {
      height
    }
  }
}
    `, C1 = K`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${xi}`, B1 = K`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionRawPayloadFragment
    }
  }
}
    ${xi}
${ZE}`, x1 = K`
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
    ${Tn}
${xi}`, R1 = K`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
    owner
  }
}
    ${Ka}`, S1 = K`
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
    ${Tn}
${Ka}`, T1 = K`
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
    ${Ka}
${e1}`, N1 = K`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, D1 = K`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${h1}`, Q1 = K`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    amount
  }
}
    `, F1 = K`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, O1 = K`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, M1 = K`
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
        assetId
        amount
      }
    }
  }
}
    ${Tn}`, L1 = K`
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
        ...getMessageFragment
      }
    }
  }
}
    ${Tn}
${r1}`, P1 = K`
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
    ${n1}`, k1 = K`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, U1 = K`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${l1}`, z1 = K`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${t1}`, G1 = K`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, V1 = K`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, H1 = K`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${hA}`, Y1 = K`
    query isUserAccount($blobId: BlobId!, $contractId: ContractId!, $transactionId: TransactionId!) {
  blob(id: $blobId) {
    id
  }
  contract(id: $contractId) {
    id
  }
  transaction(id: $transactionId) {
    id
  }
}
    `, X1 = K`
    query getConsensusParametersVersion {
  chain {
    latestBlock {
      header {
        consensusParametersVersion
      }
    }
  }
}
    `, W1 = K`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${$a}`, Z1 = K`
    subscription submitAndAwaitStatus($encodedTransaction: HexString!) {
  submitAndAwaitStatus(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${$a}`, j1 = K`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${$a}`;
function J1(e) {
  return {
    getVersion(t, r) {
      return e(A1, t, r);
    },
    getNodeInfo(t, r) {
      return e(p1, t, r);
    },
    getChain(t, r) {
      return e(f1, t, r);
    },
    getChainAndNodeInfo(t, r) {
      return e(g1, t, r);
    },
    getTransaction(t, r) {
      return e(w1, t, r);
    },
    getTransactionWithReceipts(t, r) {
      return e(m1, t, r);
    },
    getTransactions(t, r) {
      return e(y1, t, r);
    },
    getTransactionsByOwner(t, r) {
      return e(b1, t, r);
    },
    estimatePredicates(t, r) {
      return e(I1, t, r);
    },
    getLatestBlock(t, r) {
      return e(E1, t, r);
    },
    getLatestBlockHeight(t, r) {
      return e(v1, t, r);
    },
    getBlock(t, r) {
      return e(C1, t, r);
    },
    getBlockWithTransactions(t, r) {
      return e(B1, t, r);
    },
    getBlocks(t, r) {
      return e(x1, t, r);
    },
    getCoin(t, r) {
      return e(R1, t, r);
    },
    getCoins(t, r) {
      return e(S1, t, r);
    },
    getCoinsToSpend(t, r) {
      return e(T1, t, r);
    },
    getContract(t, r) {
      return e(N1, t, r);
    },
    getContractBalance(t, r) {
      return e(D1, t, r);
    },
    getBalance(t, r) {
      return e(Q1, t, r);
    },
    getLatestGasPrice(t, r) {
      return e(F1, t, r);
    },
    estimateGasPrice(t, r) {
      return e(O1, t, r);
    },
    getBalances(t, r) {
      return e(M1, t, r);
    },
    getMessages(t, r) {
      return e(L1, t, r);
    },
    getMessageProof(t, r) {
      return e(P1, t, r);
    },
    getMessageStatus(t, r) {
      return e(k1, t, r);
    },
    getRelayedTransactionStatus(t, r) {
      return e(U1, t, r);
    },
    dryRun(t, r) {
      return e(z1, t, r);
    },
    submit(t, r) {
      return e(G1, t, r);
    },
    produceBlocks(t, r) {
      return e(V1, t, r);
    },
    getMessageByNonce(t, r) {
      return e(H1, t, r);
    },
    isUserAccount(t, r) {
      return e(Y1, t, r);
    },
    getConsensusParametersVersion(t, r) {
      return e(X1, t, r);
    },
    submitAndAwait(t, r) {
      return e(W1, t, r);
    },
    submitAndAwaitStatus(t, r) {
      return e(Z1, t, r);
    },
    statusChange(t, r) {
      return e(j1, t, r);
    }
  };
}
var Ls = class {
  constructor(e) {
    F(this, "events", []);
    F(this, "parsingLeftover", "");
    this.stream = e;
  }
  static async create(e) {
    const { url: t, query: r, variables: n, fetchFn: s } = e, i = await s(`${t}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: Sl(r),
        variables: n
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream"
      }
    }), [o, a] = i.body.tee().map((u) => u.getReader());
    return await new Ls(o).next(), new Ls(a);
  }
  async next() {
    for (; ; ) {
      if (this.events.length > 0) {
        const { data: o, errors: a } = this.events.shift();
        if (Array.isArray(a))
          throw new v(
            v.CODES.INVALID_REQUEST,
            a.map((u) => u.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const r = Ls.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (r === "")
        continue;
      const n = `${this.parsingLeftover}${r}`, s = /data:.*\n\n/g, i = [...n.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new v(
            D.STREAM_PARSING_ERROR,
            `Error while parsing stream data response: ${n}`
          );
        }
      }), this.parsingLeftover = n.replace(i.join(), "");
    }
  }
  /**
   * Gets called when `break` is called in a `for-await-of` loop.
   */
  return() {
    return Promise.resolve({ done: !0, value: void 0 });
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}, pA = Ls;
Nt(pA, "textDecoder", new TextDecoder());
var Er = /* @__PURE__ */ new Map(), F_ = class {
  constructor(e) {
    F(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new v(
        D.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  // Add resources to the cache
  set(e, t) {
    const r = Date.now(), n = Er.get(e) || {
      utxos: /* @__PURE__ */ new Set(),
      messages: /* @__PURE__ */ new Set(),
      timestamp: r
    };
    t.utxos.forEach((s) => n.utxos.add(X(s))), t.messages.forEach((s) => n.messages.add(X(s))), Er.set(e, n);
  }
  // Remove resources from the cache for a given transaction ID
  unset(e) {
    Er.delete(e);
  }
  // Get all cached resources and remove expired ones
  getActiveData() {
    const e = { utxos: [], messages: [] }, t = Date.now();
    return Er.forEach((r, n) => {
      t - r.timestamp < this.ttl ? (e.utxos.push(...r.utxos), e.messages.push(...r.messages)) : Er.delete(n);
    }), e;
  }
  // Check if a UTXO ID or message nonce is already cached and not expired
  isCached(e) {
    const t = Date.now();
    for (const [r, n] of Er.entries())
      if (t - n.timestamp > this.ttl)
        Er.delete(r);
      else if (n.utxos.has(e) || n.messages.has(e))
        return !0;
    return !1;
  }
  clear() {
    Er.clear();
  }
}, q1 = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Et.Coin: {
      const r = W(e.predicate ?? "0x"), n = W(e.predicateData ?? "0x");
      return {
        type: Et.Coin,
        txID: X(W(e.id).slice(0, fr)),
        outputIndex: xr(W(e.id).slice(fr, Vs)),
        owner: X(e.owner),
        amount: x(e.amount),
        assetId: X(e.assetId),
        txPointer: {
          blockHeight: xr(W(e.txPointer).slice(0, 8)),
          txIndex: xr(W(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: x(e.predicateGasUsed),
        predicateLength: x(r.length),
        predicateDataLength: x(n.length),
        predicate: X(r),
        predicateData: X(n)
      };
    }
    case Et.Contract:
      return {
        type: Et.Contract,
        txID: St,
        outputIndex: 0,
        balanceRoot: St,
        stateRoot: St,
        txPointer: {
          blockHeight: xr(W(e.txPointer).slice(0, 8)),
          txIndex: xr(W(e.txPointer).slice(8, 16))
        },
        contractID: X(e.contractId)
      };
    case Et.Message: {
      const r = W(e.predicate ?? "0x"), n = W(e.predicateData ?? "0x"), s = W(e.data ?? "0x");
      return {
        type: Et.Message,
        sender: X(e.sender),
        recipient: X(e.recipient),
        amount: x(e.amount),
        nonce: X(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: x(e.predicateGasUsed),
        predicateLength: x(r.length),
        predicateDataLength: x(n.length),
        predicate: X(r),
        predicateData: X(n),
        data: X(s),
        dataLength: s.length
      };
    }
    default:
      throw new v(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, $1 = (e) => {
  const { type: t } = e;
  switch (t) {
    case yt.Coin:
      return {
        type: yt.Coin,
        to: X(e.to),
        amount: x(e.amount),
        assetId: X(e.assetId)
      };
    case yt.Contract:
      return {
        type: yt.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: St,
        stateRoot: St
      };
    case yt.Change:
      return {
        type: yt.Change,
        to: X(e.to),
        amount: x(0),
        assetId: X(e.assetId)
      };
    case yt.Variable:
      return {
        type: yt.Variable,
        to: St,
        amount: x(0),
        assetId: St
      };
    case yt.ContractCreated:
      return {
        type: yt.ContractCreated,
        contractId: X(e.contractId),
        stateRoot: X(e.stateRoot)
      };
    default:
      throw new v(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, O_ = (e) => !("data" in e), r2 = (e) => "utxoId" in e, n2 = (e) => "recipient" in e, K1 = (e) => "id" in e, s2 = (e) => "recipient" in e, tv = (e) => e.type === _t.Revert && e.val.toString("hex") === Dl, ev = (e) => e.type === _t.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", M_ = (e) => e.reduce(
  (t, r) => (tv(r) && t.missingOutputVariables.push(r), ev(r) && t.missingOutputContractIds.push(r), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), Ct = (e) => e || St;
function rv(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL": {
      const r = Ct(e.id || e.contractId);
      return {
        type: _t.Call,
        id: r,
        from: r,
        to: Ct(e == null ? void 0 : e.to),
        amount: x(e.amount),
        assetId: Ct(e.assetId),
        gas: x(e.gas),
        param1: x(e.param1),
        param2: x(e.param2),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "RETURN":
      return {
        type: _t.Return,
        id: Ct(e.id || e.contractId),
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "RETURN_DATA":
      return {
        type: _t.ReturnData,
        id: Ct(e.id || e.contractId),
        ptr: x(e.ptr),
        len: x(e.len),
        digest: Ct(e.digest),
        pc: x(e.pc),
        data: Ct(e.data),
        is: x(e.is)
      };
    case "PANIC":
      return {
        type: _t.Panic,
        id: Ct(e.id),
        reason: x(e.reason),
        pc: x(e.pc),
        is: x(e.is),
        contractId: Ct(e.contractId)
      };
    case "REVERT":
      return {
        type: _t.Revert,
        id: Ct(e.id || e.contractId),
        val: x(e.ra),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "LOG": {
      const r = x(e.ra), n = x(e.rb), s = x(e.rc), i = x(e.rd);
      return {
        type: _t.Log,
        id: Ct(e.id || e.contractId),
        ra: r,
        rb: n,
        rc: s,
        rd: i,
        val0: r,
        val1: n,
        val2: s,
        val3: i,
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "LOG_DATA": {
      const r = x(e.ra), n = x(e.rb);
      return {
        type: _t.LogData,
        id: Ct(e.id || e.contractId),
        ra: r,
        rb: n,
        val0: r,
        val1: n,
        ptr: x(e.ptr),
        len: x(e.len),
        digest: Ct(e.digest),
        pc: x(e.pc),
        data: Ct(e.data),
        is: x(e.is)
      };
    }
    case "TRANSFER": {
      const r = Ct(e.id || e.contractId);
      return {
        type: _t.Transfer,
        id: r,
        from: r,
        to: Ct(e.toAddress || (e == null ? void 0 : e.to)),
        amount: x(e.amount),
        assetId: Ct(e.assetId),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "TRANSFER_OUT": {
      const r = Ct(e.id || e.contractId);
      return {
        type: _t.TransferOut,
        id: r,
        from: r,
        to: Ct(e.toAddress || e.to),
        amount: x(e.amount),
        assetId: Ct(e.assetId),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "SCRIPT_RESULT":
      return {
        type: _t.ScriptResult,
        result: x(e.result),
        gasUsed: x(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const r = Ct(e.sender), n = Ct(e.recipient), s = Ct(e.nonce), i = x(e.amount), o = e.data ? W(e.data) : Uint8Array.from([]), a = Ct(e.digest), u = x(e.len).toNumber(), A = Qr.getMessageId({
        sender: r,
        recipient: n,
        nonce: s,
        amount: i,
        data: X(o)
      });
      return {
        type: _t.MessageOut,
        sender: r,
        recipient: n,
        amount: i,
        nonce: s,
        len: u,
        data: o,
        digest: a,
        messageId: A
      };
    }
    case "MINT": {
      const r = Ct(e.id || e.contractId), n = Ct(e.subId), s = $n(r, n);
      return {
        type: _t.Mint,
        subId: n,
        contractId: r,
        assetId: s,
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "BURN": {
      const r = Ct(e.id || e.contractId), n = Ct(e.subId), s = $n(r, n);
      return {
        type: _t.Burn,
        subId: n,
        contractId: r,
        assetId: s,
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    default:
      throw new v(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var nv = "https://app.fuel.network", sv = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, i2 = (e = {}) => {
  const { blockExplorerUrl: t, path: r, providerUrl: n, address: s, txId: i, blockNumber: o } = e, a = t || nv, u = [
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
  ], A = u.filter((z) => !!z.value).map(({ key: z, value: P }) => ({
    key: z,
    value: P
  })), f = A.length > 0;
  if (A.length > 1)
    throw new v(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${u.map((z) => z.key).join(", ")}.`
    );
  if (r && A.length > 0) {
    const z = u.map(({ key: P }) => P).join(", ");
    throw new v(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${z}.`
    );
  }
  const g = f ? sv(
    A[0].key,
    A[0].value
  ) : "", y = /^\/|\/$/gm, R = r ? r.replace(y, "") : g, Q = a.replace(y, ""), S = n == null ? void 0 : n.replace(y, ""), N = S ? encodeURIComponent(S) : void 0, O = Q.match(/^https?:\/\//) ? "" : "https://", G = S != null && S.match(/^https?:\/\//) ? "" : "https://";
  return `${O}${Q}/${R}${N ? `?providerUrl=${G}${N}` : ""}`;
}, Ri = (e) => e.filter(
  (n) => n.type === _t.ScriptResult
).reduce((n, s) => n.add(s.gasUsed), x(0));
function xe(e, t) {
  const r = x(t.base);
  let n = x(0);
  return "unitsPerGas" in t ? n = x(e).div(x(t.unitsPerGas)) : n = x(e).mul(x(t.gasPerUnit)), r.add(n);
}
function iv(e, t, r) {
  const n = [], s = e.filter((a) => {
    if ("owner" in a || "sender" in a) {
      if ("predicate" in a && a.predicate && a.predicate !== "0x")
        return !0;
      if (!n.includes(a.witnessIndex))
        return n.push(a.witnessIndex), !0;
    }
    return !1;
  }), i = xe(t, r.vmInitialization);
  return s.reduce((a, u) => "predicate" in u && u.predicate && u.predicate !== "0x" ? a.add(
    i.add(xe(W(u.predicate).length, r.contractRoot)).add(x(u.predicateGasUsed))
  ) : a.add(r.ecr1), x(0));
}
function fA(e) {
  const { gasCosts: t, gasPerByte: r, inputs: n, metadataGas: s, txBytesSize: i } = e, o = xe(i, t.vmInitialization), a = x(i).mul(r), u = iv(n, i, t);
  return o.add(a).add(u).add(s).maxU64();
}
function tc(e) {
  const {
    gasPerByte: t,
    witnessesLength: r,
    witnessLimit: n,
    minGas: s,
    gasLimit: i = x(0),
    maxGasPerTx: o
  } = e;
  let a = x(0);
  n != null && n.gt(0) && n.gte(r) && (a = x(n).sub(r).mul(t));
  const u = a.add(s).add(i);
  return u.gte(o) ? o : u;
}
function gA({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: r,
  contractBytesSize: n
}) {
  const s = xe(n, e.contractRoot), i = xe(t, e.stateRoot), o = xe(r, e.s256), a = x(100), u = xe(a, e.s256);
  return s.add(i).add(o).add(u).maxU64();
}
function wA({
  gasCosts: e,
  txBytesSize: t
}) {
  return xe(t, e.s256);
}
function ov({
  gasCosts: e,
  txBytesSize: t,
  witnessBytesSize: r
}) {
  const n = xe(t, e.s256), s = xe(r, e.s256);
  return n.add(s);
}
function L_({
  gasCosts: e,
  txBytesSize: t,
  consensusSize: r
}) {
  const n = xe(t, e.s256);
  if (r) {
    const s = xe(r, e.s256);
    n.add(s);
  }
  return n;
}
function av({
  gasCosts: e,
  txBytesSize: t,
  subsectionSize: r,
  subsectionsSize: n
}) {
  const s = xe(t, e.s256), i = xe(r, e.s256);
  s.add(i);
  const o = xe(n, e.stateRoot);
  return s.add(o), s;
}
function cv({
  gasCosts: e,
  baseMinGas: t,
  subsectionSize: r
}) {
  const n = x(e.newStoragePerByte).mul(r);
  return x(t).add(n);
}
var Bn = (e) => {
  const { gas: t, gasPrice: r, priceFactor: n, tip: s } = e;
  return t.mul(r).div(n).add(x(s));
};
function na(e) {
  return Object.keys(e).forEach((t) => {
    var r;
    switch ((r = e[t]) == null ? void 0 : r.constructor.name) {
      case "Uint8Array":
        e[t] = X(e[t]);
        break;
      case "Array":
        e[t] = na(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = na(e[t]);
        break;
    }
  }), e;
}
function dv(e) {
  return na(Ce(e));
}
var uv = (e, t) => {
  let r = `The transaction reverted with reason: "${e}".`;
  return W0.includes(e) && (r = `${r}

You can read more about this error at:

${Z0}#variant.${e}`), new v(D.SCRIPT_REVERTED, r, {
    ...t,
    reason: e
  });
}, Ln = (e) => JSON.stringify(e, null, 2), _v = (e, t, r) => {
  let n = "The transaction reverted with an unknown reason.";
  const s = e.find(({ type: o }) => o === _t.Revert);
  let i = "";
  if (s) {
    const o = x(s.val).toHex(), a = t[t.length - 1], u = t[t.length - 2];
    switch (o) {
      case V0: {
        i = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? Ln(a) : "an error."}.`;
        break;
      }
      case H0: {
        const A = t.length >= 2 ? ` comparing ${Ln(a)} and ${Ln(u)}.` : ".";
        i = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${A}`;
        break;
      }
      case X0: {
        const A = t.length >= 2 ? ` comparing ${Ln(u)} and ${Ln(a)}.` : ".";
        i = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${A}`;
        break;
      }
      case Y0:
        i = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case Dl:
        i = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        throw new v(
          D.UNKNOWN,
          `The transaction reverted with an unknown reason: ${s.val}`,
          {
            ...r,
            reason: "unknown"
          }
        );
    }
  }
  return new v(D.SCRIPT_REVERTED, n, {
    ...r,
    reason: i
  });
}, ec = (e) => {
  const { receipts: t, statusReason: r, logs: n } = e, s = t.some(({ type: a }) => a === _t.Panic), i = t.some(({ type: a }) => a === _t.Revert), o = {
    logs: n,
    receipts: t,
    panic: s,
    revert: i,
    reason: ""
  };
  return s ? uv(r, o) : _v(t, n, o);
}, o2 = class extends Error {
  constructor() {
    super(...arguments);
    F(this, "name", "ChangeOutputCollisionError");
    F(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, hv = class extends Error {
  constructor(t) {
    super();
    F(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, a2 = class extends Error {
  constructor(t) {
    super();
    F(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, tn = (e) => e.type === Et.Coin, rc = (e) => e.type === Et.Message, mA = (e) => e.type === Et.Message && x(e.data).isZero(), yA = (e) => tn(e) || rc(e), Kr = (e) => tn(e) || mA(e), bA = (e) => tn(e) ? e.owner : e.recipient, sa = (e, t) => bA(e) === t.toB256(), lv = (e, t, r) => e.filter(Kr).reduce((n, s) => tn(s) && s.assetId === t || rc(s) && t === r ? n.add(s.amount) : n, x(0)), c2 = (e) => e.filter(Kr).reduce(
  (t, r) => (tn(r) ? t.utxos.push(r.id) : t.messages.push(r.nonce), t),
  {
    utxos: [],
    messages: []
  }
), Av = (e, t) => e.reduce(
  (r, n) => (tn(n) && n.owner === t.toB256() ? r.utxos.push(n.id) : rc(n) && n.recipient === t.toB256() && r.messages.push(n.nonce), r),
  {
    utxos: [],
    messages: []
  }
), pv = (e) => {
  const t = W(e);
  return {
    data: X(t),
    dataLength: t.length
  };
}, Nn = class {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    tip: e,
    maturity: t,
    maxFee: r,
    witnessLimit: n,
    inputs: s,
    outputs: i,
    witnesses: o
  } = {}) {
    /** Gas price for transaction */
    F(this, "tip");
    /** Block until which tx cannot be included */
    F(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    F(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    F(this, "witnessLimit");
    /** List of inputs */
    F(this, "inputs", []);
    /** List of outputs */
    F(this, "outputs", []);
    /** List of witnesses */
    F(this, "witnesses", []);
    this.tip = e ? x(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = pr(n) ? x(n) : void 0, this.maxFee = x(r), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const r = [], { tip: n, witnessLimit: s, maturity: i } = e;
    return x(n).gt(0) && (t += Xe.Tip, r.push({ data: x(n), type: Xe.Tip })), pr(s) && x(s).gte(0) && (t += Xe.WitnessLimit, r.push({ data: x(s), type: Xe.WitnessLimit })), i && i > 0 && (t += Xe.Maturity, r.push({ data: i, type: Xe.Maturity })), t += Xe.MaxFee, r.push({ data: e.maxFee, type: Xe.MaxFee }), {
      policyTypes: t,
      policies: r
    };
  }
  /**
   * Method to obtain the base transaction details.
   *
   * @returns The base transaction details.
   */
  getBaseTransaction() {
    var i, o, a;
    const e = ((i = this.inputs) == null ? void 0 : i.map(q1)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map($1)) ?? [], r = ((a = this.witnesses) == null ? void 0 : a.map(pv)) ?? [], { policyTypes: n, policies: s } = Nn.getPolicyMeta(this);
    return {
      policyTypes: n,
      inputs: e,
      outputs: t,
      policies: s,
      witnesses: r,
      inputsCount: e.length,
      outputsCount: t.length,
      witnessesCount: r.length
    };
  }
  /**
   * Converts the transaction request to a byte array.
   *
   * @returns The transaction bytes.
   */
  toTransactionBytes() {
    return new Ar().encode(this.toTransaction());
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
    return this.addWitness(nt([St, St])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const r = dt.fromAddressOrString(e), n = this.getCoinInputWitnessIndexByOwner(r);
    typeof n == "number" && this.updateWitness(n, t);
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
      throw new hv(e);
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
      t.map(async (r) => {
        this.addWitness(await r.signTransaction(this));
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
      (e) => e.type === Et.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (e) => e.type === yt.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === yt.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = zn(e), r = this.inputs.find((n) => {
      switch (n.type) {
        case Et.Coin:
          return X(n.owner) === t.toB256();
        case Et.Message:
          return X(n.recipient) === t.toB256();
        default:
          return !1;
      }
    });
    return r == null ? void 0 : r.witnessIndex;
  }
  /**
   * Adds a single coin input to the transaction and a change output for the related
   * assetId, if one it was not added yet.
   *
   * @param coin - Coin resource.
   */
  addCoinInput(e) {
    const { assetId: t, owner: r, amount: n, id: s, predicate: i, predicateData: o } = e;
    let a;
    e.predicate ? a = 0 : (a = this.getCoinInputWitnessIndexByOwner(r), typeof a != "number" && (a = this.addEmptyWitness()));
    const u = {
      id: s,
      type: Et.Coin,
      owner: r.toB256(),
      amount: n,
      assetId: t,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: a,
      predicate: i,
      predicateData: o
    };
    this.pushInput(u), this.addChangeOutput(r, t);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * asset against the message
   *
   * @param message - Message resource.
   */
  addMessageInput(e) {
    const { recipient: t, sender: r, amount: n, predicate: s, nonce: i, predicateData: o } = e;
    let a;
    e.predicate ? a = 0 : (a = this.getCoinInputWitnessIndexByOwner(t), typeof a != "number" && (a = this.addEmptyWitness()));
    const u = {
      nonce: i,
      type: Et.Message,
      sender: r.toB256(),
      recipient: t.toB256(),
      data: O_(e) ? "0x" : e.data,
      amount: n,
      witnessIndex: a,
      predicate: s,
      predicateData: o
    };
    this.pushInput(u), O_(e) && this.addChangeOutput(t, e.assetId);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return K1(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
  addCoinOutput(e, t, r) {
    return this.pushOutput({
      type: yt.Coin,
      to: zn(e).toB256(),
      amount: t,
      assetId: r
    }), this;
  }
  /**
   * Adds multiple coin outputs to the transaction.
   *
   * @param to - Address of the destination.
   * @param quantities - Quantities of coins.
   */
  addCoinOutputs(e, t) {
    return t.map(Za).forEach((r) => {
      this.pushOutput({
        type: yt.Coin,
        to: zn(e).toB256(),
        amount: r.amount,
        assetId: r.assetId
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
      (n) => X(n.assetId) === t
    ) || this.pushOutput({
      type: yt.Change,
      to: zn(e).toB256(),
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
    throw new v(v.CODES.NOT_IMPLEMENTED, "Not implemented");
  }
  /**
   * @hidden
   */
  calculateMinGas(e) {
    const { consensusParameters: t } = e, {
      gasCosts: r,
      feeParameters: { gasPerByte: n }
    } = t;
    return fA({
      gasPerByte: n,
      gasCosts: r,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(r)
    });
  }
  calculateMaxGas(e, t) {
    const { consensusParameters: r } = e, {
      feeParameters: { gasPerByte: n },
      txParameters: { maxGasPerTx: s }
    } = r, i = this.toTransaction().witnesses.reduce(
      (o, a) => o + a.dataLength,
      0
    );
    return tc({
      gasPerByte: n,
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
   * @deprecated - This method is deprecated and will be removed in future versions.
   * Please use `Account.generateFakeResources` along with `this.addResources` instead.
   */
  fundWithFakeUtxos(e, t, r) {
    const n = (i) => this.inputs.find((o) => "assetId" in o ? o.assetId === i : !1), s = (i, o) => {
      const a = n(i);
      let u = o;
      i === t && (u = x("1000000000000000000")), a && "assetId" in a ? (a.id = X(Ue(Vs)), a.amount = u) : this.addResources([
        {
          id: X(Ue(Vs)),
          amount: u,
          assetId: i,
          owner: r || dt.fromRandom(),
          blockCreated: x(1),
          txCreatedIdx: x(1)
        }
      ]);
    };
    return s(t, x(1e11)), e.forEach((i) => s(i.assetId, i.amount)), this;
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: t, assetId: r }) => ({
      amount: x(t),
      assetId: r.toString()
    }));
  }
  /**
   * Return the minimum amount in native coins required to create
   * a transaction.
   *
   * @returns The transaction as a JSON object.
   */
  toJSON() {
    return dv(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(Kr).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(e) {
    const t = e.filter(yA);
    this.inputs.filter(Kr).forEach((r) => {
      const n = bA(r), s = t.find(
        (i) => sa(i, dt.fromString(String(n)))
      );
      s && "predicateGasUsed" in s && x(s.predicateGasUsed).gt(0) && (r.predicateGasUsed = s.predicateGasUsed);
    });
  }
  byteLength() {
    return this.toTransactionBytes().byteLength;
  }
};
function fs(e, t) {
  const r = e.toTransaction();
  r.type === vt.Script && (r.receiptsRoot = St), r.inputs = r.inputs.map((i) => {
    const o = Ce(i);
    switch (o.type) {
      case Et.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = x(0), o;
      case Et.Message:
        return o.predicateGasUsed = x(0), o;
      case Et.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = St, o.outputIndex = 0, o.balanceRoot = St, o.stateRoot = St, o;
      default:
        return o;
    }
  }), r.outputs = r.outputs.map((i) => {
    const o = Ce(i);
    switch (o.type) {
      case yt.Contract:
        return o.balanceRoot = St, o.stateRoot = St, o;
      case yt.Change:
        return o.amount = x(0), o;
      case yt.Variable:
        return o.to = St, o.amount = x(0), o.assetId = St, o;
      default:
        return o;
    }
  }), r.witnessesCount = 0, r.witnesses = [];
  const n = Bg(t), s = nt([n, new Ar().encode(r)]);
  return ve(s);
}
var hi = class extends Nn {
  /**
   * Creates an instance `BlobTransactionRequest`.
   *
   * @param blobTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, blobId: r, ...n }) {
    super(n);
    /** Type of the transaction */
    F(this, "type", vt.Blob);
    /** Blob ID */
    F(this, "blobId");
    /** Witness index of the bytecode to create */
    F(this, "witnessIndex");
    this.blobId = r, this.witnessIndex = t ?? 0;
  }
  static from(t) {
    return new this(Ce(t));
  }
  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { witnessIndex: r, blobId: n } = this;
    return {
      type: vt.Blob,
      ...t,
      blobId: n,
      witnessIndex: r
    };
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(t) {
    return fs(this, t);
  }
  /**
   * Calculates the metadata gas cost for a blob transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   * @returns metadata gas cost for the blob transaction.
   */
  metadataGas(t) {
    return ov({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      witnessBytesSize: this.witnesses[this.witnessIndex].length
    });
  }
}, fv = (e) => {
  const t = new Uint8Array(32);
  return t.set(W(e)), t;
}, gv = (e) => {
  let t, r;
  return Array.isArray(e) ? (t = e[0], r = e[1]) : (t = e.key, r = e.value), {
    key: X(t),
    value: X(fv(r))
  };
}, ia = class extends Nn {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: r, storageSlots: n, ...s }) {
    super(s);
    /** Type of the transaction */
    F(this, "type", vt.Create);
    /** Witness index of contract bytecode to create */
    F(this, "bytecodeWitnessIndex");
    /** Salt */
    F(this, "salt");
    /** List of storage slots to initialize */
    F(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = X(r ?? St), this.storageSlots = [...n ?? []];
  }
  static from(t) {
    return new this(Ce(t));
  }
  /**
   * Converts the transaction request to a `TransactionCreate`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    var s;
    const t = this.getBaseTransaction(), r = this.bytecodeWitnessIndex, n = ((s = this.storageSlots) == null ? void 0 : s.map(gv)) ?? [];
    return {
      type: vt.Create,
      ...t,
      bytecodeWitnessIndex: r,
      storageSlotsCount: x(n.length),
      salt: this.salt ? X(this.salt) : St,
      storageSlots: n
    };
  }
  /**
   * Get contract created outputs for the transaction.
   *
   * @returns An array of contract created transaction request outputs.
   */
  getContractCreatedOutputs() {
    return this.outputs.filter(
      (t) => t.type === yt.ContractCreated
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
    return fs(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, r) {
    this.pushOutput({
      type: yt.ContractCreated,
      contractId: t,
      stateRoot: r
    });
  }
  metadataGas(t) {
    return gA({
      contractBytesSize: x(W(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, P_ = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: W("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, wv = {
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
  bytes: W("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Xr = class extends Nn {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: r, gasLimit: n, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    F(this, "type", vt.Script);
    /** Gas limit for transaction */
    F(this, "gasLimit");
    /** Script to execute */
    F(this, "script");
    /** Script input data (parameters) */
    F(this, "scriptData");
    F(this, "abis");
    this.gasLimit = x(n), this.script = W(t ?? P_.bytes), this.scriptData = W(r ?? P_.encodeScriptData()), this.abis = s.abis;
  }
  static from(t) {
    return new this(Ce(t));
  }
  /**
   * Converts the transaction request to a `TransactionScript`.
   *
   * @returns The transaction script object.
   */
  toTransaction() {
    const t = W(this.script ?? "0x"), r = W(this.scriptData ?? "0x");
    return {
      type: vt.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: x(t.length),
      scriptDataLength: x(r.length),
      receiptsRoot: St,
      script: X(t),
      scriptData: X(r)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (t) => t.type === Et.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (t) => t.type === yt.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === yt.Variable
    );
  }
  /**
   * Set the script and its data.
   *
   * @param script - The abstract script request.
   * @param data - The script data.
   */
  setScript(t, r) {
    this.scriptData = t.encodeScriptData(r), this.script = t.bytes;
  }
  /**
   * Adds variable outputs to the transaction request.
   *
   * @param numberOfVariables - The number of variables to add.
   * @returns The new length of the outputs array.
   */
  addVariableOutputs(t = 1) {
    let r = t;
    for (; r; )
      this.pushOutput({
        type: yt.Variable
      }), r -= 1;
    return this.outputs.length - 1;
  }
  /**
   * Calculates the maximum gas for the transaction.
   *
   * @param chainInfo - The chain information.
   * @param minGas - The minimum gas.
   * @returns the maximum gas.
   */
  calculateMaxGas(t, r) {
    const { consensusParameters: n } = t, {
      feeParameters: { gasPerByte: s },
      txParameters: { maxGasPerTx: i }
    } = n, o = this.toTransaction().witnesses.reduce(
      (a, u) => a + u.dataLength,
      0
    );
    return tc({
      gasPerByte: s,
      minGas: r,
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
    const r = zn(t);
    if (this.getContractInputs().find((s) => s.contractId === r.toB256()))
      return this;
    const n = super.pushInput({
      type: Et.Contract,
      contractId: r.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: yt.Contract,
      inputIndex: n
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
    return fs(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, r) {
    const n = new gr(t);
    return this.scriptData = n.functions.main.encodeArguments(r), this;
  }
  metadataGas(t) {
    return wA({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, oa = class extends Nn {
  /**
   * Creates an instance `UpgradeTransactionRequest`.
   *
   * @param upgradeTransactionRequestLike - The initial values for the instance
   */
  constructor({
    upgradePurpose: t,
    bytecodeWitnessIndex: r,
    ...n
  } = {}) {
    super(n);
    /** The type of transaction */
    F(this, "type", vt.Upgrade);
    /** The upgrade purpose */
    F(this, "upgradePurpose");
    /** Witness index of consensus */
    F(this, "bytecodeWitnessIndex");
    this.bytecodeWitnessIndex = r ?? 0, this.upgradePurpose = t ?? {
      type: ke.ConsensusParameters,
      checksum: "0x"
    };
  }
  static from(t) {
    return t instanceof oa ? t : new this(Ce(t));
  }
  /**
   * Adds a consensus parameters upgrade purpose.
   *
   * @param consensus - The consensus bytecode.
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addConsensusParametersUpgradePurpose(t) {
    return this.bytecodeWitnessIndex = this.addWitness(t), this.upgradePurpose = {
      type: ke.ConsensusParameters,
      checksum: ze(t)
    }, this;
  }
  /**
   * Adds a state transition upgrade purpose.
   *
   * @param bytecodeRoot - The Merkle root of the state transition.
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addStateTransitionUpgradePurpose(t) {
    return this.upgradePurpose = {
      type: ke.StateTransition,
      data: X(t)
    }, this;
  }
  /**
   * Adds an upgrade purpose.
   *
   * @param type - The upgrade purpose type.
   * @param data - The bytecode or merkle root of upgrade purpose
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addUpgradePurpose(t, r) {
    return t === ke.ConsensusParameters && this.addConsensusParametersUpgradePurpose(r), t === ke.StateTransition && this.addStateTransitionUpgradePurpose(r), this;
  }
  /**
   * Converts the transaction request to a `TransactionUpgrade`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    let t;
    if (this.upgradePurpose.type === ke.ConsensusParameters)
      t = {
        type: ke.ConsensusParameters,
        data: {
          witnessIndex: this.bytecodeWitnessIndex,
          checksum: this.upgradePurpose.checksum
        }
      };
    else if (this.upgradePurpose.type === ke.StateTransition)
      t = {
        type: ke.StateTransition,
        data: {
          bytecodeRoot: X(this.upgradePurpose.data)
        }
      };
    else
      throw new v(v.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
    return {
      type: vt.Upgrade,
      ...super.getBaseTransaction(),
      upgradePurpose: t
    };
  }
  /**
   * Gets the Transaction ID by hashing the transaction
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(t) {
    return fs(this, t);
  }
  /**
   * Calculates the metadata gas cost for an upgrade transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   *
   * @returns metadata gas cost for the upgrade transaction.
   */
  metadataGas(t) {
    const r = this.byteSize();
    if (this.upgradePurpose.type === ke.ConsensusParameters) {
      const n = this.bytecodeWitnessIndex, s = this.witnesses[n].length;
      return L_({
        gasCosts: t,
        txBytesSize: r,
        consensusSize: s
      });
    }
    if (this.upgradePurpose.type === ke.StateTransition)
      return L_({
        gasCosts: t,
        txBytesSize: r
      });
    throw new v(v.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
  }
}, aa = class extends Nn {
  /**
   * Creates an instance `UploadTransactionRequest`.
   *
   * @param uploadTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, subsection: r, ...n } = {}) {
    super(n);
    /** Type of the transaction */
    F(this, "type", vt.Upload);
    /** The witness index of the subsection of the bytecode. */
    F(this, "witnessIndex");
    /** The subsection data. */
    F(this, "subsection");
    this.witnessIndex = t ?? 0, this.subsection = r ?? {
      proofSet: [],
      root: St,
      subsectionIndex: 0,
      subsectionsNumber: 0
    };
  }
  static from(t) {
    return t instanceof aa ? t : new this(Ce(t));
  }
  /**
   * Adds the subsection.
   *
   * @param subsection - The subsection data.
   */
  addSubsection(t) {
    const { subsection: r, ...n } = t;
    this.subsection = n, this.witnessIndex = this.addWitness(r);
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(t) {
    return fs(this, t);
  }
  /**
   * Converts the transaction request to a `TransactionUpload`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { subsectionIndex: r, subsectionsNumber: n, root: s, proofSet: i } = this.subsection;
    return {
      type: vt.Upload,
      ...t,
      subsectionIndex: r,
      subsectionsNumber: n,
      root: X(s),
      proofSet: i.map(X),
      witnessIndex: this.witnessIndex,
      proofSetCount: i.length
    };
  }
  /**
   * Calculates the metadata gas cost for an upload transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   *
   * @returns metadata gas cost for the upload transaction.
   */
  metadataGas(t) {
    return av({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      subsectionSize: W(this.witnesses[this.witnessIndex]).length,
      subsectionsSize: this.subsection.subsectionsNumber
    });
  }
  /**
   * Calculates the minimum gas for an upload transaction.
   *
   * @param chainInfo - The chain information.
   *
   * @returns the minimum gas for the upload transaction
   */
  calculateMinGas(t) {
    const r = super.calculateMinGas(t), { gasCosts: n } = t.consensusParameters, s = this.witnesses[this.witnessIndex] ?? St;
    return cv({
      gasCosts: n,
      baseMinGas: r.toNumber(),
      subsectionSize: W(s).length
    });
  }
}, Re = (e) => {
  if (e instanceof Xr || e instanceof ia || e instanceof hi || e instanceof oa || e instanceof aa)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case vt.Script:
      return Xr.from(e);
    case vt.Create:
      return ia.from(e);
    case vt.Blob:
      return hi.from(e);
    case vt.Upgrade:
      return oa.from(e);
    case vt.Upload:
      return aa.from(e);
    default:
      throw new v(
        D.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${t}.`
      );
  }
}, kr = (e) => e.type === vt.Script, mv = (e) => e.type === vt.Create, d2 = (e) => e.type === vt.Blob, u2 = (e) => e.type === vt.Upgrade, _2 = (e) => e.type === vt.Upload, yv = (e) => {
  var j;
  const {
    gasPrice: t,
    rawPayload: r,
    tip: n,
    totalFee: s,
    consensusParameters: { gasCosts: i, feeParams: o, maxGasPerTx: a }
  } = e;
  if (s)
    return s;
  const u = x(o.gasPerByte), A = x(o.gasPriceFactor), f = W(r), [g] = new Ar().decode(f, 0), { type: y, witnesses: R, inputs: Q, policies: S } = g;
  let N = x(0), O = x(0);
  if (y !== vt.Create && y !== vt.Script)
    return x(0);
  if (y === vt.Create) {
    const { bytecodeWitnessIndex: V, storageSlots: U } = g, ot = x(W(R[V].data).length);
    N = gA({
      contractBytesSize: ot,
      gasCosts: i,
      stateRootSize: U.length || 0,
      txBytesSize: f.length
    });
  } else {
    const { scriptGasLimit: V } = g;
    V && (O = V), N = wA({
      gasCosts: i,
      txBytesSize: f.length
    });
  }
  const G = fA({
    gasCosts: i,
    gasPerByte: x(u),
    inputs: Q,
    metadataGas: N,
    txBytesSize: f.length
  }), L = (j = S.find((V) => V.type === Xe.WitnessLimit)) == null ? void 0 : j.data, z = R.reduce((V, U) => V + U.dataLength, 0), P = tc({
    gasPerByte: u,
    minGas: G,
    witnessesLength: z,
    gasLimit: O,
    witnessLimit: L,
    maxGasPerTx: a
  });
  return Bn({
    gasPrice: t,
    gas: P,
    priceFactor: A,
    tip: n
  });
}, bv = ({ abi: e, receipt: t }) => {
  var f;
  const r = new gr(e), n = t.param1.toHex(8), s = r.getFunction(n), i = s.jsonFn.inputs, o = t.param2.toHex();
  let a;
  const u = s.decodeArguments(o);
  return u && (a = i.reduce((g, y, R) => {
    const Q = u[R], S = y.name;
    return S ? {
      ...g,
      // reparse to remove bn
      [S]: JSON.parse(JSON.stringify(Q))
    } : g;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: a,
    ...(f = t.amount) != null && f.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function Iv(e, t) {
  return e.filter((r) => t.includes(r.type));
}
function nc(e, t) {
  return e.filter((r) => r.type === t);
}
function Ev(e) {
  return nc(e, Et.Coin);
}
function vv(e) {
  return nc(e, Et.Message);
}
function IA(e) {
  return Iv(e, [Et.Coin, Et.Message]);
}
function k_(e) {
  return e.type === Et.Coin;
}
function Cv(e) {
  return nc(e, Et.Contract);
}
function Bv(e, t) {
  return Ev(e).find((n) => n.assetId === t);
}
function xv(e, t) {
  const r = /* @__PURE__ */ new Map();
  return IA(e).forEach((n) => {
    const s = k_(n) ? n.assetId : t, i = k_(n) ? n.owner : n.recipient;
    let o = r.get(s);
    o || (o = /* @__PURE__ */ new Map(), r.set(s, o));
    let a = o.get(i);
    a || (a = new Ot(0), o.set(i, a)), o.set(i, a.add(n.amount));
  }), r;
}
function Rv(e) {
  var t;
  return (t = vv(e)) == null ? void 0 : t[0];
}
function EA(e, t, r = !1) {
  const n = Bv(e, t);
  if (n)
    return n;
  if (r)
    return Rv(e);
}
function Sv(e, t) {
  if (t == null)
    return;
  const r = e == null ? void 0 : e[t];
  if (r) {
    if (r.type !== Et.Contract)
      throw new v(
        D.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return r;
  }
}
function sc(e) {
  return e.type === Et.Coin ? e.owner.toString() : e.type === Et.Message ? e.recipient.toString() : "";
}
function gs(e, t) {
  return e.filter((r) => r.type === t);
}
function Tv(e) {
  return gs(e, yt.ContractCreated);
}
function vA(e) {
  return gs(e, yt.Coin);
}
function Nv(e) {
  return gs(e, yt.Change);
}
function Dv(e) {
  return gs(e, yt.Contract);
}
function h2(e) {
  return gs(e, yt.Variable);
}
var Qv = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e.Blob = "Blob", e))(Qv || {}), CA = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(CA || {}), Fv = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(Fv || {}), Ov = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(Ov || {}), Mv = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(Mv || {});
function rs(e, t) {
  return (e ?? []).filter((r) => r.type === t);
}
function BA(e) {
  switch (e) {
    case vt.Mint:
      return "Mint";
    case vt.Create:
      return "Create";
    case vt.Script:
      return "Script";
    case vt.Blob:
      return "Blob";
    case vt.Upgrade:
      return "Upgrade";
    case vt.Upload:
      return "Upload";
    default:
      throw new v(
        D.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${e}.`
      );
  }
}
function Dn(e, t) {
  return BA(e) === t;
}
function Lv(e) {
  return Dn(
    e,
    "Mint"
    /* Mint */
  );
}
function xA(e) {
  return Dn(
    e,
    "Create"
    /* Create */
  );
}
function RA(e) {
  return Dn(
    e,
    "Script"
    /* Script */
  );
}
function Pv(e) {
  return Dn(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function kv(e) {
  return Dn(
    e,
    "Upload"
    /* Upload */
  );
}
function Uv(e) {
  return Dn(
    e,
    "Blob"
    /* Blob */
  );
}
function l2(e) {
  return (t) => e.assetId === t.assetId;
}
function zv(e) {
  return rs(e, _t.Call);
}
function Gv(e) {
  return rs(e, _t.MessageOut);
}
function Vv(e, t) {
  const r = e.assetsSent || [], n = t.assetsSent || [], s = /* @__PURE__ */ new Map();
  return r.forEach((i) => {
    s.set(i.assetId, { ...i });
  }), n.forEach((i) => {
    const o = s.get(i.assetId);
    o ? o.amount = x(o.amount).add(i.amount) : s.set(i.assetId, { ...i });
  }), Array.from(s.values());
}
function Hv(e, t) {
  var r, n, s, i, o, a, u, A;
  return e.name === t.name && ((r = e.from) == null ? void 0 : r.address) === ((n = t.from) == null ? void 0 : n.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((a = t.from) == null ? void 0 : a.type) && ((u = e.to) == null ? void 0 : u.type) === ((A = t.to) == null ? void 0 : A.type);
}
function Yv(e, t) {
  var r, n;
  return (r = t.assetsSent) != null && r.length ? (n = e.assetsSent) != null && n.length ? Vv(e, t) : t.assetsSent : e.assetsSent;
}
function Xv(e, t) {
  var r;
  return (r = t.calls) != null && r.length ? [...e.calls || [], ...t.calls] : e.calls;
}
function Wv(e, t) {
  return {
    ...e,
    assetsSent: Yv(e, t),
    calls: Xv(e, t)
  };
}
function ns(e, t) {
  const r = e.findIndex((n) => Hv(n, t));
  return r === -1 ? [...e, t] : e.map((n, s) => s === r ? Wv(n, t) : n);
}
function A2(e) {
  return rs(e, _t.TransferOut);
}
function Zv({
  inputs: e,
  receipts: t,
  baseAssetId: r
}) {
  return Gv(t).reduce(
    (i, o) => {
      const a = EA(e, r, !0);
      if (a) {
        const u = sc(a);
        return ns(i, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: u
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
              assetId: r
            }
          ]
        });
      }
      return i;
    },
    []
  );
}
function jv(e, t, r, n, s) {
  const i = t == null ? void 0 : t[e.contractID];
  return i ? [
    bv({
      abi: i,
      receipt: r,
      rawPayload: n,
      maxInputs: s
    })
  ] : [];
}
function Jv(e) {
  var t;
  return (t = e.amount) != null && t.isZero() ? void 0 : [
    {
      amount: e.amount,
      assetId: e.assetId
    }
  ];
}
function qv(e, t, r, n, s, i, o) {
  const a = e.assetId === St ? o : e.assetId, u = EA(r, a, a === o);
  if (!u)
    return [];
  const A = sc(u), f = jv(t, n, e, s, i);
  return [
    {
      name: "Contract call",
      from: {
        type: 1,
        address: A
      },
      to: {
        type: 0,
        address: e.to
      },
      assetsSent: Jv(e),
      calls: f
    }
  ];
}
function $v({
  inputs: e,
  outputs: t,
  receipts: r,
  abiMap: n,
  rawPayload: s,
  maxInputs: i,
  baseAssetId: o
}) {
  const a = zv(r);
  return Dv(t).flatMap((A) => {
    const f = Sv(e, A.inputIndex);
    return f ? a.filter((g) => g.to === f.contractID).flatMap(
      (g) => qv(
        g,
        f,
        e,
        n,
        s,
        i,
        o
      )
    ) : [];
  });
}
function Kv(e, t, r) {
  const { to: n, assetId: s, amount: i } = e;
  let { from: o } = e;
  const a = t.some((A) => A.contractID === n) ? 0 : 1;
  if (St === o) {
    const A = r.find((f) => f.assetId === s);
    o = (A == null ? void 0 : A.to) || o;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((A) => A.contractID === o) ? 0 : 1,
      address: o
    },
    to: {
      type: a,
      address: n
    },
    assetsSent: [
      {
        assetId: s.toString(),
        amount: i
      }
    ]
  };
}
function tC({
  inputs: e,
  outputs: t,
  receipts: r,
  baseAssetId: n
}) {
  let s = [];
  const i = vA(t), o = Cv(e), a = Nv(t), u = xv(e, n);
  i.forEach(({ amount: g, assetId: y, to: R }) => {
    const Q = u.get(y) || /* @__PURE__ */ new Map();
    let S, N;
    for (const [O, G] of Q)
      if (N || (N = O), G.gte(g)) {
        S = O;
        break;
      }
    S = S || N, S && (s = ns(s, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: S
      },
      to: {
        type: 1,
        address: R
      },
      assetsSent: [{ assetId: y, amount: g }]
    }));
  });
  const A = rs(
    r,
    _t.Transfer
  ), f = rs(
    r,
    _t.TransferOut
  );
  return [...A, ...f].forEach((g) => {
    const y = Kv(g, o, a);
    s = ns(s, y);
  }), s;
}
function eC(e) {
  return vA(e).reduce((n, s) => ns(n, {
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
function rC({ inputs: e, outputs: t }) {
  const r = Tv(t), n = IA(e)[0], s = sc(n);
  return r.reduce((o, a) => ns(o, {
    name: "Contract created",
    from: {
      type: 1,
      address: s
    },
    to: {
      type: 0,
      address: (a == null ? void 0 : a.contractId) || ""
    }
  }), []);
}
function nC({
  transactionType: e,
  inputs: t,
  outputs: r,
  receipts: n,
  abiMap: s,
  rawPayload: i,
  maxInputs: o,
  baseAssetId: a
}) {
  return xA(e) ? [...rC({ inputs: t, outputs: r })] : RA(e) ? [
    ...tC({ inputs: t, outputs: r, receipts: n, baseAssetId: a }),
    ...$v({
      inputs: t,
      outputs: r,
      receipts: n,
      abiMap: s,
      rawPayload: i,
      maxInputs: o,
      baseAssetId: a
    }),
    ...Zv({ inputs: t, receipts: n, baseAssetId: a })
  ] : [...eC(r)];
}
var Tr = (e) => rv(e), sC = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === _t.Mint && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, iC = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === _t.Burn && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, oC = (e) => {
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
        D.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, aC = (e) => {
  var f, g;
  let t, r, n, s, i, o = !1, a = !1, u = !1;
  if (e != null && e.type)
    switch (n = oC(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, r = (f = e.block) == null ? void 0 : f.id, a = !0, s = x(e.totalFee), i = x(e.totalGas);
        break;
      case "FailureStatus":
        t = e.time, r = (g = e.block) == null ? void 0 : g.id, o = !0, s = x(e.totalFee), i = x(e.totalGas);
        break;
      case "SubmittedStatus":
        t = e.time, u = !0;
        break;
    }
  return {
    time: t,
    blockId: r,
    status: n,
    totalFee: s,
    totalGas: i,
    isStatusFailure: o,
    isStatusSuccess: a,
    isStatusPending: u
  };
};
function Si(e) {
  var _, p;
  const {
    id: t,
    receipts: r,
    gasPerByte: n,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: a,
    abiMap: u = {},
    maxInputs: A,
    gasCosts: f,
    maxGasPerTx: g,
    gasPrice: y,
    baseAssetId: R
  } = e, Q = Ri(r), S = X(o), N = nC({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: r,
    rawPayload: S,
    abiMap: u,
    maxInputs: A,
    baseAssetId: R
  }), O = BA(i.type), G = x((p = (_ = i.policies) == null ? void 0 : _.find((w) => w.type === Xe.Tip)) == null ? void 0 : p.data), { isStatusFailure: L, isStatusPending: z, isStatusSuccess: P, blockId: Z, status: j, time: V, totalFee: U } = aC(a), ot = yv({
    totalFee: U,
    gasPrice: y,
    rawPayload: S,
    tip: G,
    consensusParameters: {
      gasCosts: f,
      maxGasPerTx: g,
      feeParams: {
        gasPerByte: n,
        gasPriceFactor: s
      }
    }
  }), q = sC(r), $ = iC(r);
  let C;
  return V && (C = ma.fromTai64(V)), {
    id: t,
    tip: G,
    fee: ot,
    gasUsed: Q,
    operations: N,
    type: O,
    blockId: Z,
    time: V,
    status: j,
    receipts: r,
    mintedAssets: q,
    burnedAssets: $,
    isTypeMint: Lv(i.type),
    isTypeCreate: xA(i.type),
    isTypeScript: RA(i.type),
    isTypeUpgrade: Pv(i.type),
    isTypeUpload: kv(i.type),
    isTypeBlob: Uv(i.type),
    isStatusFailure: L,
    isStatusSuccess: P,
    isStatusPending: z,
    date: C,
    transaction: i
  };
}
function ic(e, t, r = {}) {
  return e.reduce((n, s) => {
    if (s.type === _t.LogData || s.type === _t.Log) {
      const i = new gr(r[s.id] || t), o = s.type === _t.Log ? new M("u64").encode(s.val0) : s.data, [a] = i.decodeLog(o, s.val1.toString());
      n.push(a);
    }
    return n;
  }, []);
}
function cC(e) {
  return e.map((t) => {
    const r = "amount" in t ? { ...t, amount: x(t.amount) } : t;
    switch (r.type) {
      case "CoinOutput":
        return { ...r, type: yt.Coin };
      case "ContractOutput":
        return {
          ...r,
          type: yt.Contract,
          inputIndex: parseInt(r.inputIndex, 10)
        };
      case "ChangeOutput":
        return {
          ...r,
          type: yt.Change
        };
      case "VariableOutput":
        return { ...r, type: yt.Variable };
      case "ContractCreated":
        return {
          ...r,
          type: yt.ContractCreated,
          contractId: r.contract
        };
      default:
        return cf();
    }
  });
}
var ca = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param tx - The transaction ID or TransactionRequest.
   * @param provider - The provider.
   */
  constructor(e, t, r, n) {
    /** Transaction ID */
    F(this, "id");
    /** Current provider */
    F(this, "provider");
    /** Gas used on the transaction */
    F(this, "gasUsed", x(0));
    /** The graphql Transaction with receipts object. */
    F(this, "gqlTransaction");
    F(this, "request");
    F(this, "status");
    F(this, "abis");
    this.submitTxSubscription = n, this.id = typeof e == "string" ? e : e.getTransactionId(t.getChainId()), this.provider = t, this.abis = r, this.request = typeof e == "string" ? void 0 : e;
  }
  /**
   * Async constructor for `TransactionResponse`. This method can be used to create
   * an instance of `TransactionResponse` and wait for the transaction to be fetched
   * from the chain, ensuring that the `gqlTransaction` property is set.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  static async create(e, t, r) {
    const n = new ca(e, t, r);
    return await n.fetch(), n;
  }
  applyMalleableSubscriptionFields(e) {
    const t = this.status;
    if (!t)
      return;
    const r = e;
    (t.type === "SuccessStatus" || t.type === "FailureStatus") && (r.inputs = r.inputs.map((n, s) => {
      var i;
      if ("txPointer" in n) {
        const o = (i = t.transaction.inputs) == null ? void 0 : i[s];
        return {
          ...n,
          txPointer: Jr.decodeFromGqlScalar(o.txPointer)
        };
      }
      return n;
    }), r.outputs = cC(t.transaction.outputs), "receiptsRoot" in t.transaction && (r.receiptsRoot = t.transaction.receiptsRoot));
  }
  async getTransaction() {
    if (this.request) {
      const t = this.request.toTransaction();
      return this.applyMalleableSubscriptionFields(t), {
        tx: t,
        bytes: this.request.toTransactionBytes()
      };
    }
    const e = this.gqlTransaction ?? await this.fetch();
    return {
      tx: this.decodeTransaction(e),
      bytes: W(e.rawPayload)
    };
  }
  getReceipts() {
    var t;
    const e = this.status ?? ((t = this.gqlTransaction) == null ? void 0 : t.status);
    switch (e == null ? void 0 : e.type) {
      case "SuccessStatus":
      case "FailureStatus":
        return e.receipts.map(Tr);
      default:
        return [];
    }
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
      const t = await this.provider.operations.statusChange({
        transactionId: this.id
      });
      for await (const { statusChange: r } of t)
        if (r) {
          this.status = r;
          break;
        }
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
    return (t = new Ar().decode(
      W(e.rawPayload),
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
    var g;
    const { tx: t, bytes: r } = await this.getTransaction(), { gasPerByte: n, gasPriceFactor: s, gasCosts: i, maxGasPerTx: o } = this.provider.getGasConfig(), a = await this.provider.getLatestGasPrice(), u = this.provider.getChain().consensusParameters.txParameters.maxInputs, A = this.provider.getBaseAssetId();
    return Si({
      id: this.id,
      receipts: this.getReceipts(),
      transaction: t,
      transactionBytes: r,
      gqlTransactionStatus: this.status ?? ((g = this.gqlTransaction) == null ? void 0 : g.status),
      gasPerByte: n,
      gasPriceFactor: s,
      abiMap: e,
      maxInputs: u,
      gasCosts: i,
      maxGasPerTx: o,
      gasPrice: a,
      baseAssetId: A
    });
  }
  async waitForStatusChange() {
    var r, n;
    const e = (n = (r = this.gqlTransaction) == null ? void 0 : r.status) == null ? void 0 : n.type;
    if (e && e !== "SubmittedStatus")
      return;
    const t = this.submitTxSubscription ?? await this.provider.operations.statusChange({
      transactionId: this.id
    });
    for await (const s of t) {
      const i = "statusChange" in s ? s.statusChange : s.submitAndAwaitStatus;
      if (this.status = i, i.type === "SqueezedOutStatus")
        throw this.unsetResourceCache(), new v(
          D.TRANSACTION_SQUEEZED_OUT,
          `Transaction Squeezed Out with reason: ${i.reason}`
        );
      if (i.type !== "SubmittedStatus")
        break;
    }
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
    const t = await this.getTransactionSummary(e), r = {
      ...t
    };
    let n = [];
    this.abis && (n = ic(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), r.logs = n);
    const { receipts: s } = r, i = this.status ?? ((o = this.gqlTransaction) == null ? void 0 : o.status);
    if ((i == null ? void 0 : i.type) === "FailureStatus") {
      this.unsetResourceCache();
      const { reason: a } = i;
      throw ec({
        receipts: s,
        statusReason: a,
        logs: n
      });
    }
    return r;
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
  unsetResourceCache() {
    var e;
    (e = this.provider.cache) == null || e.unset(this.id);
  }
};
function dC(e, t) {
  const r = e.baseDelay ?? 150;
  switch (e.backoff) {
    case "linear":
      return r * t;
    case "fixed":
      return r;
    case "exponential":
    default:
      return 2 ** (t - 1) * r;
  }
}
function SA(e, t, r = 0) {
  return t === void 0 ? e : async (...n) => {
    var s;
    try {
      return await e(...n);
    } catch (i) {
      const o = i;
      if (((s = o.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw o;
      const a = r + 1;
      if (a > t.maxRetries)
        throw o;
      const u = dC(t, a);
      return await $p(u), SA(e, t, a)(...n);
    }
  };
}
var uC = (e, t) => {
  switch (e) {
    case "not enough coins to fit the target":
      throw new v(
        D.NOT_ENOUGH_FUNDS,
        "The account(s) sending the transaction don't have enough funds to cover the transaction.",
        {},
        t
      );
    case "max number of coins is reached while trying to fit the target":
      throw new v(
        D.MAX_COINS_REACHED,
        "The account retrieving coins has exceeded the maximum number of coins per asset. Please consider combining your coins into a single UTXO.",
        {},
        t
      );
    default:
      throw new v(D.INVALID_REQUEST, e);
  }
}, Hn = (e) => {
  const { paginationLimit: t, inputArgs: r = {} } = e, { first: n, last: s, after: i, before: o } = r;
  if (i && o)
    throw new v(
      D.INVALID_INPUT_PARAMETERS,
      'Pagination arguments "after" and "before" cannot be used together'
    );
  if ((n || 0) > t || (s || 0) > t)
    throw new v(
      D.INVALID_INPUT_PARAMETERS,
      `Pagination limit for this query cannot exceed ${t} items`
    );
  if (n && o)
    throw new v(
      D.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "first" with "before" is not supported'
    );
  if (s && i)
    throw new v(
      D.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "last" with "after" is not supported'
    );
  return !n && !s && (r.first = t), r;
}, U_ = 10, z_ = 512, TA = 60, _C = 5, hC = 2e4, lC = 1.2, G_ = (e) => {
  const { name: t, daHeight: r, consensusParameters: n } = e, {
    contractParams: s,
    feeParams: i,
    predicateParams: o,
    scriptParams: a,
    txParams: u,
    gasCosts: A,
    baseAssetId: f,
    chainId: g,
    version: y
  } = n;
  return {
    name: t,
    baseChainHeight: x(r),
    consensusParameters: {
      version: y,
      chainId: x(g),
      baseAssetId: f,
      feeParameters: {
        version: i.version,
        gasPerByte: x(i.gasPerByte),
        gasPriceFactor: x(i.gasPriceFactor)
      },
      contractParameters: {
        version: s.version,
        contractMaxSize: x(s.contractMaxSize),
        maxStorageSlots: x(s.maxStorageSlots)
      },
      txParameters: {
        version: u.version,
        maxInputs: x(u.maxInputs),
        maxOutputs: x(u.maxOutputs),
        maxWitnesses: x(u.maxWitnesses),
        maxGasPerTx: x(u.maxGasPerTx),
        maxSize: x(u.maxSize),
        maxBytecodeSubsections: x(u.maxBytecodeSubsections)
      },
      predicateParameters: {
        version: o.version,
        maxPredicateLength: x(o.maxPredicateLength),
        maxPredicateDataLength: x(o.maxPredicateDataLength),
        maxGasPerPredicate: x(o.maxGasPerPredicate),
        maxMessageDataLength: x(o.maxMessageDataLength)
      },
      scriptParameters: {
        version: a.version,
        maxScriptLength: x(a.maxScriptLength),
        maxScriptDataLength: x(a.maxScriptDataLength)
      },
      gasCosts: A
    }
  };
}, da, NA, Te = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    Sr(this, da), Nt(this, "operations"), Nt(this, "cache"), Nt(this, "url"), Nt(this, "urlWithoutAuth"), Nt(this, "consensusParametersTimestamp"), Nt(this, "options", {
      timeout: void 0,
      resourceCacheTTL: void 0,
      fetch: void 0,
      retryOptions: void 0,
      headers: void 0
    });
    const { url: r, urlWithoutAuth: n, headers: s } = Te.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.url = e;
    const { FUELS: i } = ch, o = { ...s, ...t.headers, Source: `ts-sdk-${i}` };
    this.options = {
      ...this.options,
      ...t,
      headers: o
    }, this.operations = this.createOperations();
    const { resourceCacheTTL: a } = this.options;
    pr(a) ? a !== -1 ? this.cache = new F_(a) : this.cache = void 0 : this.cache = new F_(hC);
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    Te.nodeInfoCache = {}, Te.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(e) {
    const { retryOptions: t, timeout: r, headers: n } = e;
    return SA(async (...s) => {
      const i = s[0], o = s[1], a = r ? AbortSignal.timeout(r) : void 0;
      let u = {
        ...o,
        signal: a,
        headers: { ...o == null ? void 0 : o.headers, ...n }
      };
      return e.requestMiddleware && (u = await e.requestMiddleware(u)), e.fetch ? e.fetch(i, u, e) : fetch(i, u);
    }, t);
  }
  static extractBasicAuth(e) {
    let t;
    try {
      t = new URL(e);
    } catch (i) {
      throw new v(v.CODES.INVALID_URL, "Invalid URL provided.", { url: e }, i);
    }
    const r = t.username, n = t.password, s = `${t.origin}${t.pathname}`;
    return r && n ? {
      url: e,
      urlWithoutAuth: s,
      headers: { Authorization: `Basic ${btoa(`${r}:${n}`)}` }
    } : { url: e, urlWithoutAuth: e, headers: void 0 };
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
    const r = new Te(e, t);
    return await r.fetchChainAndNodeInfo(), r;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   *
   * @returns the chain information configuration.
   */
  getChain() {
    const e = Te.chainInfoCache[this.urlWithoutAuth];
    if (!e)
      throw new v(
        D.CHAIN_INFO_CACHE_EMPTY,
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
    const e = Te.nodeInfoCache[this.urlWithoutAuth];
    if (!e)
      throw new v(
        D.NODE_INFO_CACHE_EMPTY,
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
      feeParameters: { gasPriceFactor: r, gasPerByte: n },
      gasCosts: s
    } = this.getChain().consensusParameters;
    return {
      maxGasPerTx: e,
      maxGasPerPredicate: t,
      gasPriceFactor: r,
      gasPerByte: n,
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
    const { url: r, urlWithoutAuth: n, headers: s } = Te.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.options = t ?? this.options, this.options = { ...this.options, headers: { ...this.options.headers, ...s } }, this.operations = this.createOperations(), await this.fetchChainAndNodeInfo();
  }
  /**
   * Return the chain and node information.
   * @param ignoreCache - If true, ignores the cache and re-fetch configs.
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo(e = !1) {
    let t, r;
    try {
      if (e)
        throw new Error("Jumps to the catch block andre-fetch");
      t = this.getNode(), r = this.getChain();
    } catch {
      const s = await this.operations.getChainAndNodeInfo();
      t = {
        maxDepth: x(s.nodeInfo.maxDepth),
        maxTx: x(s.nodeInfo.maxTx),
        nodeVersion: s.nodeInfo.nodeVersion,
        utxoValidation: s.nodeInfo.utxoValidation,
        vmBacktrace: s.nodeInfo.vmBacktrace
      }, Te.ensureClientVersionIsSupported(t), r = G_(s.chain), Te.chainInfoCache[this.urlWithoutAuth] = r, Te.nodeInfoCache[this.urlWithoutAuth] = t, this.consensusParametersTimestamp = Date.now();
    }
    return {
      chain: r,
      nodeInfo: t
    };
  }
  /**
   * @hidden
   */
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: r, supportedVersion: n } = pp(e.nodeVersion);
    (!t || !r) && console.warn(
      `The Fuel Node that you are trying to connect to is using fuel-core version ${e.nodeVersion},
which is not supported by the version of the TS SDK that you are using.
Things may not work as expected.
Supported fuel-core version: ${n}.`
    );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   * @hidden
   */
  createOperations() {
    const e = Te.getFetchFn(this.options), t = new D0(this.urlWithoutAuth, {
      fetch: (s, i) => e(s.toString(), i || {}, this.options),
      responseMiddleware: (s) => {
        if ("response" in s) {
          const i = s.response;
          if (Array.isArray(i == null ? void 0 : i.errors))
            for (const o of i.errors)
              uC(o.message, o);
        }
      }
    }), r = (s, i) => {
      const o = s.definitions.find((u) => u.kind === "OperationDefinition");
      return (o == null ? void 0 : o.operation) === "subscription" ? pA.create({
        url: this.urlWithoutAuth,
        query: s,
        fetchFn: (u, A) => e(u, A, this.options),
        variables: i
      }) : t.request(s, i);
    }, n = (s) => ({
      getBlobs(i) {
        const o = i.blobIds.map((f, g) => `$blobId${g}: BlobId!`).join(", "), a = i.blobIds.map((f, g) => `blob${g}: blob(id: $blobId${g}) { id }`).join(`
`), u = i.blobIds.reduce(
          (f, g, y) => (f[`blobId${y}`] = g, f),
          {}
        ), A = K`
          query getBlobs(${o}) {
            ${a}
          }
        `;
        return s(A, u);
      }
    });
    return { ...J1(r), ...n(r) };
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
    const {
      chain: {
        latestBlock: { height: e }
      }
    } = await this.operations.getLatestBlockHeight();
    return x(e);
  }
  /**
   * Returns the node information for the current provider network.
   *
   * @returns a promise that resolves to the node information.
   */
  async fetchNode() {
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = {
      maxDepth: x(e.maxDepth),
      maxTx: x(e.maxTx),
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace
    };
    return Te.nodeInfoCache[this.urlWithoutAuth] = t, t;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = G_(e);
    return Te.chainInfoCache[this.urlWithoutAuth] = t, t;
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
   * @hidden
   */
  validateTransaction(e) {
    const {
      consensusParameters: {
        txParameters: { maxInputs: t, maxOutputs: r }
      }
    } = this.getChain();
    if (x(e.inputs.length).gt(t))
      throw new v(
        D.MAX_INPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of inputs. Tx inputs: ${e.inputs.length}, max inputs: ${t}`
      );
    if (x(e.outputs.length).gt(r))
      throw new v(
        D.MAX_OUTPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of outputs. Tx outputs: ${e.outputs.length}, max outputs: ${r}`
      );
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
  async sendTransaction(e, { estimateTxDependencies: t = !0 } = {}) {
    const r = Re(e);
    t && await this.estimateTxDependencies(r), this.validateTransaction(r);
    const n = X(r.toTransactionBytes());
    let s;
    kr(r) && (s = r.abis);
    const i = await this.operations.submitAndAwaitStatus({ encodedTransaction: n });
    return ra(this, da, NA).call(this, r.inputs, r.getTransactionId(this.getChainId())), new ca(r, this, s, i);
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
  async dryRun(e, { utxoValidation: t, estimateTxDependencies: r = !0 } = {}) {
    const n = Re(e);
    if (r)
      return this.estimateTxDependencies(n);
    const s = X(n.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: t || !1
    }), [{ receipts: o, status: a }] = i;
    return { receipts: o.map(Tr), dryRunStatus: a };
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
      (i) => "predicate" in i && i.predicate && !pl(W(i.predicate), W("0x")) && new Ot(i.predicateGasUsed).isZero()
    ))
      return e;
    const r = X(e.toTransactionBytes()), n = await this.operations.estimatePredicates({
      encodedTransaction: r
    }), {
      estimatePredicates: { inputs: s }
    } = n;
    return s && s.forEach((i, o) => {
      "predicateGasUsed" in i && x(i.predicateGasUsed).gt(0) && (e.inputs[o].predicateGasUsed = i.predicateGasUsed);
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
    if (mv(e))
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let t = [];
    const r = [];
    let n = 0, s;
    this.validateTransaction(e);
    for (let i = 0; i < U_; i++) {
      const {
        dryRun: [{ receipts: o, status: a }]
      } = await this.operations.dryRun({
        encodedTransactions: [X(e.toTransactionBytes())],
        utxoValidation: !1,
        gasPrice: "0"
      });
      t = o.map(Tr), s = a;
      const { missingOutputVariables: u, missingOutputContractIds: A } = M_(t);
      if ((u.length !== 0 || A.length !== 0) && kr(e)) {
        n += u.length, e.addVariableOutputs(u.length), A.forEach(({ contractId: y }) => {
          e.addContractInputAndOutput(dt.fromString(y)), r.push(y);
        });
        const { maxFee: g } = await this.estimateTxGasAndFee({
          transactionRequest: e,
          gasPrice: x(0)
        });
        e.maxFee = g;
      } else
        break;
    }
    return {
      receipts: t,
      outputVariables: n,
      missingContractIds: r,
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
    })), r = Ce(e), n = /* @__PURE__ */ new Map();
    r.forEach((o, a) => {
      kr(o) && n.set(a, X(o.toTransactionBytes()));
    });
    let s = Array.from(n.keys()), i = 0;
    for (; s.length > 0 && i < U_; ) {
      const o = s.map(
        (A) => n.get(A)
      ), a = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), u = [];
      for (let A = 0; A < a.dryRun.length; A++) {
        const f = s[A], { receipts: g, status: y } = a.dryRun[A], R = t[f];
        R.receipts = g.map(Tr), R.dryRunStatus = y;
        const { missingOutputVariables: Q, missingOutputContractIds: S } = M_(
          R.receipts
        ), N = Q.length > 0 || S.length > 0, O = r[f];
        if (N && kr(O)) {
          R.outputVariables += Q.length, O.addVariableOutputs(Q.length), S.forEach(({ contractId: L }) => {
            O.addContractInputAndOutput(dt.fromString(L)), R.missingContractIds.push(L);
          });
          const { maxFee: G } = await this.estimateTxGasAndFee({
            transactionRequest: O
          });
          O.maxFee = G, n.set(f, X(O.toTransactionBytes())), u.push(f);
        }
      }
      s = u, i += 1;
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
  async dryRunMultipleTransactions(e, { utxoValidation: t, estimateTxDependencies: r = !0 } = {}) {
    if (r)
      return this.estimateMultipleTxDependencies(e);
    const n = e.map((o) => X(o.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: n,
      utxoValidation: t || !1
    });
    return s.map(({ receipts: o, status: a }) => ({ receipts: o.map(Tr), dryRunStatus: a }));
  }
  async autoRefetchConfigs() {
    if (Date.now() - (this.consensusParametersTimestamp ?? 0) < 6e4)
      return;
    const r = this.getChain(), {
      consensusParameters: { version: n }
    } = r, {
      chain: {
        latestBlock: {
          header: { consensusParametersVersion: s }
        }
      }
    } = await this.operations.getConsensusParametersVersion();
    n !== s && await this.fetchChainAndNodeInfo(!0);
  }
  /**
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param transactionRequest - The transaction request object.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  async estimateTxGasAndFee(e) {
    const { transactionRequest: t } = e;
    let { gasPrice: r } = e;
    await this.autoRefetchConfigs();
    const n = this.getChain(), { gasPriceFactor: s, maxGasPerTx: i } = this.getGasConfig(), o = t.calculateMinGas(n);
    pr(r) || (r = await this.estimateGasPrice(10));
    const a = Bn({
      gasPrice: x(r),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let u = x(0);
    kr(t) && (u = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(n, o)
    ), u = t.gasLimit));
    const A = t.calculateMaxGas(n, o), f = Bn({
      gasPrice: x(r),
      gas: A,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: a,
      maxGas: A,
      maxFee: f,
      gasPrice: r,
      gasLimit: u
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
    const r = Re(e);
    if (t)
      return this.estimateTxDependencies(r);
    const n = [X(r.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: n,
      utxoValidation: !0
    });
    return { receipts: s.map((o) => {
      const { id: a, receipts: u, status: A } = o, f = u.map(Tr);
      return { id: a, receipts: f, status: A };
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
    const r = Ce(Re(e)), n = r.maxFee.eq(0), s = kr(r);
    s && (r.gasLimit = x(0));
    const i = Ce(r);
    let o = 0;
    if (t && kr(i)) {
      const G = i.witnesses.length;
      await t(i), o = i.witnesses.length - G;
    }
    await this.estimatePredicates(i), r.updatePredicateGasUsed(i.inputs);
    let { maxFee: a, maxGas: u, minFee: A, minGas: f, gasPrice: g, gasLimit: y } = await this.estimateTxGasAndFee({
      transactionRequest: i
    }), R = [], Q, S = [], N = 0, O = x(0);
    if (r.maxFee = a, s) {
      if (r.gasLimit = y, t && await t(r), { receipts: R, missingContractIds: S, outputVariables: N, dryRunStatus: Q } = await this.estimateTxDependencies(r), Q && "reason" in Q)
        throw this.extractDryRunError(r, R, Q);
      const { maxGasPerTx: G } = this.getGasConfig(), L = Ri(R);
      O = x(L.muln(lC)).max(G.sub(f)), r.gasLimit = O, { maxFee: a, maxGas: u, minFee: A, minGas: f, gasPrice: g } = await this.estimateTxGasAndFee({
        transactionRequest: r,
        gasPrice: g
      });
    }
    return {
      receipts: R,
      gasUsed: O,
      gasPrice: g,
      minGas: f,
      maxGas: u,
      minFee: A,
      maxFee: a,
      outputVariables: N,
      missingContractIds: S,
      addedSignatures: o,
      estimatedPredicates: r.inputs,
      dryRunStatus: Q,
      updateMaxFee: n
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
  async getCoins(e, t, r) {
    const n = dt.fromAddressOrString(e), {
      coins: { edges: s, pageInfo: i }
    } = await this.operations.getCoins({
      ...Hn({
        paginationLimit: z_,
        inputArgs: r
      }),
      filter: { owner: n.toB256(), assetId: t && X(t) }
    });
    return {
      coins: s.map(({ node: a }) => ({
        id: a.utxoId,
        assetId: a.assetId,
        amount: x(a.amount),
        owner: n,
        blockCreated: x(a.blockCreated),
        txCreatedIdx: x(a.txCreatedIdx)
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
  async getResourcesToSpend(e, t, r) {
    var u, A;
    const n = dt.fromAddressOrString(e), s = {
      messages: ((u = r == null ? void 0 : r.messages) == null ? void 0 : u.map((f) => X(f))) || [],
      utxos: ((A = r == null ? void 0 : r.utxos) == null ? void 0 : A.map((f) => X(f))) || []
    };
    if (this.cache) {
      const f = this.cache.getActiveData();
      s.messages.push(...f.messages), s.utxos.push(...f.utxos);
    }
    const i = {
      owner: n.toB256(),
      queryPerAsset: t.map(Za).map(({ assetId: f, amount: g, max: y }) => ({
        assetId: X(f),
        amount: g.toString(10),
        max: y ? y.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((f) => {
      switch (f.type) {
        case "MessageCoin":
          return {
            amount: x(f.amount),
            assetId: f.assetId,
            daHeight: x(f.daHeight),
            sender: dt.fromAddressOrString(f.sender),
            recipient: dt.fromAddressOrString(f.recipient),
            nonce: f.nonce
          };
        case "Coin":
          return {
            id: f.utxoId,
            amount: x(f.amount),
            assetId: f.assetId,
            owner: n,
            blockCreated: x(f.blockCreated),
            txCreatedIdx: x(f.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((f) => !!f);
  }
  /**
   * Returns an array of blobIds that exist on chain, for a given array of blobIds.
   *
   * @param blobIds - blobIds to check.
   * @returns - A promise that resolves to an array of blobIds that exist on chain.
   */
  async getBlobs(e) {
    const t = await this.operations.getBlobs({ blobIds: e }), r = [];
    return Object.keys(t).forEach((n) => {
      const s = t[n];
      r.push((s == null ? void 0 : s.id) ?? null);
    }), r.filter((n) => n);
  }
  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block or null.
   */
  async getBlock(e) {
    let t;
    if (e === "latest") {
      const {
        chain: { latestBlock: o }
      } = await this.operations.getLatestBlock();
      t = o;
    } else {
      const a = typeof e == "string" && e.length === 66 ? { blockId: e } : { height: x(e).toString(10) };
      t = (await this.operations.getBlock(a)).block;
    }
    if (!t)
      return null;
    const { header: r, height: n, id: s, transactions: i } = t;
    return {
      id: s,
      height: x(n),
      time: r.time,
      header: {
        applicationHash: r.applicationHash,
        daHeight: x(r.daHeight),
        eventInboxRoot: r.eventInboxRoot,
        messageOutboxRoot: r.messageOutboxRoot,
        prevRoot: r.prevRoot,
        stateTransitionBytecodeVersion: r.stateTransitionBytecodeVersion,
        transactionsCount: r.transactionsCount,
        transactionsRoot: r.transactionsRoot
      },
      transactionIds: i.map((o) => o.id)
    };
  }
  /**
   * Returns all the blocks matching the given parameters.
   *
   * @param params - The parameters to query blocks.
   * @returns A promise that resolves to the blocks.
   */
  async getBlocks(e) {
    const {
      blocks: { edges: t, pageInfo: r }
    } = await this.operations.getBlocks({
      ...Hn({
        paginationLimit: _C,
        inputArgs: e
      })
    });
    return { blocks: t.map(({ node: s }) => ({
      id: s.id,
      height: x(s.height),
      time: s.header.time,
      header: {
        applicationHash: s.header.applicationHash,
        daHeight: x(s.header.daHeight),
        eventInboxRoot: s.header.eventInboxRoot,
        messageOutboxRoot: s.header.messageOutboxRoot,
        prevRoot: s.header.prevRoot,
        stateTransitionBytecodeVersion: s.header.stateTransitionBytecodeVersion,
        transactionsCount: s.header.transactionsCount,
        transactionsRoot: s.header.transactionsRoot
      },
      transactionIds: s.transactions.map((i) => i.id)
    })), pageInfo: r };
  }
  /**
   * Returns block matching the given ID or type, including transaction data.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlockWithTransactions(e) {
    let t;
    typeof e == "number" ? t = { blockHeight: x(e).toString(10) } : e === "latest" ? t = { blockHeight: (await this.getBlockNumber()).toString() } : t = { blockId: e };
    const { block: r } = await this.operations.getBlockWithTransactions(t);
    return r ? {
      id: r.id,
      height: x(r.height, 10),
      time: r.header.time,
      header: {
        applicationHash: r.header.applicationHash,
        daHeight: x(r.header.daHeight),
        eventInboxRoot: r.header.eventInboxRoot,
        messageOutboxRoot: r.header.messageOutboxRoot,
        prevRoot: r.header.prevRoot,
        stateTransitionBytecodeVersion: r.header.stateTransitionBytecodeVersion,
        transactionsCount: r.header.transactionsCount,
        transactionsRoot: r.header.transactionsRoot
      },
      transactionIds: r.transactions.map((n) => n.id),
      transactions: r.transactions.map(
        (n) => {
          var s;
          return (s = new Ar().decode(W(n.rawPayload), 0)) == null ? void 0 : s[0];
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
    var r;
    const { transaction: t } = await this.operations.getTransaction({ transactionId: e });
    if (!t)
      return null;
    try {
      return (r = new Ar().decode(
        W(t.rawPayload),
        0
      )) == null ? void 0 : r[0];
    } catch (n) {
      if (n instanceof v && n.code === D.UNSUPPORTED_TRANSACTION_TYPE)
        return console.warn("Unsupported transaction type encountered"), null;
      throw n;
    }
  }
  /**
   * Retrieves transactions based on the provided pagination arguments.
   * @param paginationArgs - The pagination arguments for retrieving transactions.
   * @returns A promise that resolves to an object containing the retrieved transactions and pagination information.
   */
  async getTransactions(e) {
    const {
      transactions: { edges: t, pageInfo: r }
    } = await this.operations.getTransactions({
      ...Hn({
        inputArgs: e,
        paginationLimit: TA
      })
    }), n = new Ar();
    return { transactions: t.map(({ node: { rawPayload: i } }) => {
      try {
        return n.decode(W(i), 0)[0];
      } catch (o) {
        if (o instanceof v && o.code === D.UNSUPPORTED_TRANSACTION_TYPE)
          return console.warn("Unsupported transaction type encountered"), null;
        throw o;
      }
    }).filter((i) => i !== null), pageInfo: r };
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
    const { contractBalance: r } = await this.operations.getContractBalance({
      contract: dt.fromAddressOrString(e).toB256(),
      asset: X(t)
    });
    return x(r.amount, 10);
  }
  /**
   * Returns the balance for the given owner for the given asset ID.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getBalance(e, t) {
    const { balance: r } = await this.operations.getBalance({
      owner: dt.fromAddressOrString(e).toB256(),
      assetId: X(t)
    });
    return x(r.amount, 10);
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
      filter: { owner: dt.fromAddressOrString(e).toB256() }
    });
    return { balances: t.map(({ node: n }) => ({
      assetId: n.assetId,
      amount: x(n.amount)
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
      messages: { edges: r, pageInfo: n }
    } = await this.operations.getMessages({
      ...Hn({
        inputArgs: t,
        paginationLimit: z_
      }),
      owner: dt.fromAddressOrString(e).toB256()
    });
    return {
      messages: r.map(({ node: i }) => ({
        messageId: Qr.getMessageId({
          sender: i.sender,
          recipient: i.recipient,
          nonce: i.nonce,
          amount: x(i.amount),
          data: i.data
        }),
        sender: dt.fromAddressOrString(i.sender),
        recipient: dt.fromAddressOrString(i.recipient),
        nonce: i.nonce,
        amount: x(i.amount),
        data: Qr.decodeData(i.data),
        daHeight: x(i.daHeight)
      })),
      pageInfo: n
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
  async getMessageProof(e, t, r, n) {
    let s = {
      transactionId: e,
      nonce: t
    };
    if (r && n)
      throw new v(
        D.INVALID_INPUT_PARAMETERS,
        "commitBlockId and commitBlockHeight cannot be used together"
      );
    r && (s = {
      ...s,
      commitBlockId: r
    }), n && (s = {
      ...s,
      // Conver BN into a number string required on the query
      // This should problably be fixed on the fuel client side
      commitBlockHeight: n.toNumber().toString()
    });
    const i = await this.operations.getMessageProof(s);
    if (!i.messageProof)
      return null;
    const {
      messageProof: o,
      messageBlockHeader: a,
      commitBlockHeader: u,
      blockProof: A,
      sender: f,
      recipient: g,
      amount: y,
      data: R
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: x(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: x(A.proofIndex),
        proofSet: A.proofSet
      },
      messageBlockHeader: {
        id: a.id,
        daHeight: x(a.daHeight),
        transactionsCount: Number(a.transactionsCount),
        transactionsRoot: a.transactionsRoot,
        height: x(a.height),
        prevRoot: a.prevRoot,
        time: a.time,
        applicationHash: a.applicationHash,
        messageReceiptCount: Number(a.messageReceiptCount),
        messageOutboxRoot: a.messageOutboxRoot,
        consensusParametersVersion: Number(a.consensusParametersVersion),
        eventInboxRoot: a.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(a.stateTransitionBytecodeVersion)
      },
      commitBlockHeader: {
        id: u.id,
        daHeight: x(u.daHeight),
        transactionsCount: Number(u.transactionsCount),
        transactionsRoot: u.transactionsRoot,
        height: x(u.height),
        prevRoot: u.prevRoot,
        time: u.time,
        applicationHash: u.applicationHash,
        messageReceiptCount: Number(u.messageReceiptCount),
        messageOutboxRoot: u.messageOutboxRoot,
        consensusParametersVersion: Number(u.consensusParametersVersion),
        eventInboxRoot: u.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(u.stateTransitionBytecodeVersion)
      },
      sender: dt.fromAddressOrString(f),
      recipient: dt.fromAddressOrString(g),
      nonce: t,
      amount: x(y),
      data: R
    };
  }
  /**
   * Get the latest gas price from the node.
   *
   * @returns A promise that resolves to the latest gas price.
   */
  async getLatestGasPrice() {
    const { latestGasPrice: e } = await this.operations.getLatestGasPrice();
    return x(e.gasPrice);
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
    return x(t.gasPrice);
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
    const { produceBlocks: r } = await this.operations.produceBlocks({
      blocksToProduce: x(e).toString(10),
      startTimestamp: t ? ma.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return x(r);
  }
  /**
   * Check if the given ID is an account.
   *
   * @param id - The ID to check.
   * @returns A promise that resolves to the result of the check.
   */
  async isUserAccount(e) {
    const { contract: t, blob: r, transaction: n } = await this.operations.isUserAccount({
      blobId: e,
      contractId: e,
      transactionId: e
    });
    return !(t || r || n);
  }
  async getAddressType(e) {
    const { contract: t, blob: r, transaction: n } = await this.operations.isUserAccount({
      blobId: e,
      contractId: e,
      transactionId: e
    });
    return t ? "Contract" : r ? "Blob" : n ? "Transaction" : "Account";
  }
  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new ca(e, this);
  }
  /**
   * Returns Message for given nonce.
   *
   * @param nonce - The nonce of the message to retrieve.
   * @returns A promise that resolves to the Message object or null.
   */
  async getMessageByNonce(e) {
    const { message: t } = await this.operations.getMessageByNonce({ nonce: e });
    return t ? {
      messageId: Qr.getMessageId({
        sender: t.sender,
        recipient: t.recipient,
        nonce: e,
        amount: x(t.amount),
        data: t.data
      }),
      sender: dt.fromAddressOrString(t.sender),
      recipient: dt.fromAddressOrString(t.recipient),
      nonce: e,
      amount: x(t.amount),
      data: Qr.decodeData(t.data),
      daHeight: x(t.daHeight)
    } : null;
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
  extractDryRunError(e, t, r) {
    const n = r;
    let s = [];
    return e.abis && (s = ic(
      t,
      e.abis.main,
      e.abis.otherContractsAbis
    )), ec({
      logs: s,
      receipts: t,
      statusReason: n.reason
    });
  }
}, li = Te;
da = /* @__PURE__ */ new WeakSet();
NA = function(e, t) {
  if (!this.cache)
    return;
  const r = e.reduce(
    (n, s) => (s.type === Et.Coin ? n.utxos.push(s.id) : s.type === Et.Message && n.messages.push(s.nonce), n),
    { utxos: [], messages: [] }
  );
  this.cache.set(t, r);
};
Nt(li, "chainInfoCache", {});
Nt(li, "nodeInfoCache", {});
async function p2(e) {
  const { id: t, provider: r, abiMap: n } = e, { transaction: s } = await r.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new v(
      D.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Ar().decode(
    W(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const a = o.map(Tr), {
    consensusParameters: {
      feeParameters: { gasPerByte: u, gasPriceFactor: A },
      txParameters: { maxInputs: f, maxGasPerTx: g },
      gasCosts: y
    }
  } = r.getChain(), R = await r.getLatestGasPrice(), Q = r.getBaseAssetId();
  return {
    ...Si({
      id: s.id,
      receipts: a,
      transaction: i,
      transactionBytes: W(s.rawPayload),
      gqlTransactionStatus: s.status,
      gasPerByte: x(u),
      gasPriceFactor: x(A),
      abiMap: n,
      maxInputs: f,
      gasCosts: y,
      maxGasPerTx: g,
      gasPrice: R,
      baseAssetId: Q
    })
  };
}
async function f2(e) {
  const { provider: t, transactionRequest: r, abiMap: n } = e, { receipts: s } = await t.dryRun(r), { gasPerByte: i, gasPriceFactor: o, gasCosts: a, maxGasPerTx: u } = t.getGasConfig(), A = t.getChain().consensusParameters.txParameters.maxInputs, f = r.toTransaction(), g = r.toTransactionBytes(), y = await t.getLatestGasPrice(), R = t.getBaseAssetId();
  return Si({
    id: r.getTransactionId(t.getChainId()),
    receipts: s,
    transaction: f,
    transactionBytes: g,
    abiMap: n,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: A,
    gasCosts: a,
    maxGasPerTx: u,
    gasPrice: y,
    baseAssetId: R
  });
}
async function g2(e) {
  const { filters: t, provider: r, abiMap: n } = e, { owner: s, ...i } = t, o = Hn({
    inputArgs: i,
    paginationLimit: TA
  }), { transactionsByOwner: a } = await r.operations.getTransactionsByOwner({
    ...o,
    owner: s
  }), { edges: u, pageInfo: A } = a, {
    consensusParameters: {
      feeParameters: { gasPerByte: f, gasPriceFactor: g },
      txParameters: { maxInputs: y, maxGasPerTx: R },
      gasCosts: Q
    }
  } = r.getChain(), S = await r.getLatestGasPrice(), N = r.getBaseAssetId();
  return {
    transactions: u.map((G) => {
      const { node: L } = G, { id: z, rawPayload: P, status: Z } = L, [j] = new Ar().decode(W(P), 0);
      let V = [];
      L != null && L.status && "receipts" in L.status && (V = L.status.receipts);
      const U = V.map(Tr);
      return {
        ...Si({
          id: z,
          receipts: U,
          transaction: j,
          transactionBytes: W(P),
          gqlTransactionStatus: Z,
          abiMap: n,
          gasPerByte: f,
          gasPriceFactor: g,
          maxInputs: y,
          gasCosts: Q,
          maxGasPerTx: R,
          gasPrice: S,
          baseAssetId: N
        })
      };
    }),
    pageInfo: A
  };
}
var it = {
  eth: {
    mainnet: 1,
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    devnet: 0,
    testnet: 0,
    mainnet: 9889
  }
}, AC = (e) => {
  if (e === "ethereum")
    return it.eth.sepolia;
  if (e === "fuel")
    return it.fuel.testnet;
}, pC = ({
  asset: e,
  chainId: t,
  networkType: r
}) => e.networks.find(
  (s) => s.chainId === t && s.type === r
), DA = ({
  asset: e,
  chainId: t,
  networkType: r
}) => {
  const { networks: n, ...s } = e, i = t ?? AC(r);
  if (i === void 0)
    return;
  const o = pC({
    asset: e,
    chainId: i,
    networkType: r
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, w2 = (e, t) => DA({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), m2 = (e, t) => DA({
  asset: e,
  networkType: "fuel",
  chainId: t
}), fC = "/", gC = /^\/|\/$/g, wC = (e = "") => e.replace(gC, "");
function mC(e, ...t) {
  const r = e != null, n = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(wC);
  return n && r && s.unshift(""), s.join(fC);
}
function yC(e, t = "./") {
  return e.map((r) => ({
    ...r,
    icon: mC(t, r.icon)
  }));
}
var bC = "https://cdn.fuel.network/assets/", IC = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: it.eth.foundry,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: it.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      }
    ]
  },
  {
    name: "WETH",
    symbol: "WETH",
    icon: "weth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xa38a5a8beeb08d95744bc7f58528073f4052b254def59eba20c99c202b5acaa3",
        decimals: 9
      }
    ]
  },
  {
    name: "weETH",
    symbol: "weETH",
    icon: "weETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x239ed6e12b7ce4089ee245244e3bf906999a6429c2a9a445a1e1faf56914a4ab",
        decimals: 9
      }
    ]
  },
  {
    name: "rsETH",
    symbol: "rsETH",
    icon: "rsETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xbae80f7fb8aa6b90d9b01ef726ec847cc4f59419c4d5f2ea88fec785d1b0e849",
        decimals: 9
      }
    ]
  },
  {
    name: "rETH",
    symbol: "rETH",
    icon: "reth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xae78736cd615f374d3085123a210448e74fc6393",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xf3f9a0ed0ce8eac5f89d6b83e41b3848212d5b5f56108c54a205bb228ca30c16",
        decimals: 9
      }
    ]
  },
  {
    name: "wbETH",
    symbol: "wbETH",
    icon: "wbeth.png",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xa2E3356610840701BDf5611a53974510Ae27E2e1",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x7843c74bef935e837f2bcf67b5d64ecb46dd53ff86375530b0caf3699e8ffafe",
        decimals: 9
      }
    ]
  },
  {
    name: "rstETH",
    symbol: "rstETH",
    icon: "rstETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x7a4EffD87C2f3C55CA251080b1343b605f327E3a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x962792286fbc9b1d5860b4551362a12249362c21594c77abf4b3fe2bbe8d977a",
        decimals: 9
      }
    ]
  },
  {
    name: "amphrETH",
    symbol: "amphrETH",
    icon: "amphrETH.png",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x5fD13359Ba15A84B76f7F87568309040176167cd",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x05fc623e57bd7bc1258efa8e4f62b05af5471d73df6f2c2dc11ecc81134c4f36",
        decimals: 9
      }
    ]
  },
  {
    name: "Manta mBTC",
    symbol: "Manta mBTC",
    icon: "manta-mbtc.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x4041381e947CFD3D483d67a25C6aa9Dc924250c5",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xaf3111a248ff7a3238cdeea845bb2d43cf3835f1f6b8c9d28360728b55b9ce5b",
        decimals: 9
      }
    ]
  },
  {
    name: "Manta mETH",
    symbol: "Manta mETH",
    icon: "manta-meth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x8CdF550C04Bc9B9F10938368349C9c8051A772b6",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xafd219f513317b1750783c6581f55530d6cf189a5863fd18bd1b3ffcec1714b4",
        decimals: 9
      }
    ]
  },
  {
    name: "Manta mUSD",
    symbol: "Manta mUSD",
    icon: "manta-musd.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x3f24E1d7a973867fC2A03fE199E5502514E0e11E",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x89cb9401e55d49c3269654dd1cdfb0e80e57823a4a7db98ba8fc5953b120fef4",
        decimals: 9
      }
    ]
  },
  {
    name: "pumpBTC",
    symbol: "pumpBTC",
    icon: "pumpbtc.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xf469fbd2abcd6b9de8e169d128226c0fc90a012e",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x0aa5eb2bb97ca915288b653a2529355d4dc66de2b37533213f0e4aeee3d3421f",
        decimals: 8
      }
    ]
  },
  {
    name: "FBTC",
    symbol: "FBTC",
    icon: "fbtc.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xc96de26018a54d51c097160568752c4e3bd6c364",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xb5ecb0a1e08e2abbabf624ffea089df933376855f468ade35c6375b00c33996a",
        decimals: 8
      }
    ]
  },
  {
    name: "SolvBTC",
    symbol: "SolvBTC",
    icon: "solvBTC.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x7a56e1c57c7475ccf742a1832b028f0456652f97",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1186afea9affb88809c210e13e2330b5258c2cef04bb8fff5eff372b7bd3f40f",
        decimals: 9
      }
    ]
  },
  {
    name: "SolvBTC.BBN",
    symbol: "SolvBTC.BBN",
    icon: "SolvBTC.BBN.png",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xd9d920aa40f578ab794426f5c90f6c731d159def",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x7a4f087c957d30218223c2baaaa365355c9ca81b6ea49004cfb1590a5399216f",
        decimals: 9
      }
    ]
  },
  {
    name: "Mantle mETH",
    symbol: "Mantle mETH",
    icon: "mantle-meth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x642a5db59ec323c2f846d4d4cf3e58d78aff64accf4f8f6455ba0aa3ef000a3b",
        decimals: 9
      }
    ]
  },
  {
    name: "sDAI",
    symbol: "sDAI",
    icon: "sdai.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x83f20f44975d03b1b09e64809b757c47f942beea",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x9e46f919fbf978f3cad7cd34cca982d5613af63ff8aab6c379e4faa179552958",
        decimals: 9
      }
    ]
  },
  {
    name: "USDT",
    symbol: "USDT",
    icon: "usdt.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xa0265fb5c32f6e8db3197af3c7eb05c48ae373605b8165b6f4a51c5b0ba4812e",
        decimals: 6
      }
    ]
  },
  {
    name: "USDC",
    symbol: "USDC",
    icon: "usdc.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x286c479da40dc953bddc3bb4c453b608bba2e0ac483b077bd475174115395e6b",
        decimals: 6
      }
    ]
  },
  {
    name: "USDe",
    symbol: "USDe",
    icon: "USDe.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xb6133b2ef9f6153eb869125d23dcf20d1e735331b5e41b15a6a7a6cec70e8651",
        decimals: 9
      }
    ]
  },
  {
    name: "sUSDe",
    symbol: "sUSDe",
    icon: "sUSDe.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x9d39a5de30e57443bff2a8307a4256c8797a3497",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xd05563025104fc36496c15c7021ad6b31034b0e89a356f4f818045d1f48808bc",
        decimals: 9
      }
    ]
  },
  {
    name: "rsUSDe",
    symbol: "rsUSDe",
    icon: "rsUSDe.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x82f5104b23FF2FA54C2345F821dAc9369e9E0B26",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x78d4522ec607f6e8efb66ea49439d1ee48623cf763f9688a8eada025def033d9",
        decimals: 9
      }
    ]
  },
  {
    name: "wstETH",
    symbol: "wstETH",
    icon: "wsteth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1a7815cc9f75db5c24a5b0814bfb706bb9fe485333e98254015de8f48f84c67b",
        decimals: 9
      }
    ]
  },
  {
    name: "ezETH",
    symbol: "ezETH",
    icon: "ezeth.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x91b3559edb2619cde8ffb2aa7b3c3be97efd794ea46700db7092abeee62281b0",
        decimals: 9
      }
    ]
  },
  {
    name: "pzETH",
    symbol: "pzETH",
    icon: "pzETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x8c9532a60e0e7c6bbd2b2c1303f63ace1c3e9811",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1493d4ec82124de8f9b625682de69dcccda79e882b89a55a8c737b12de67bd68",
        decimals: 9
      }
    ]
  },
  {
    name: "Re7LRT",
    symbol: "Re7LRT",
    icon: "Re7LRT.png",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x84631c0d0081FDe56DeB72F6DE77abBbF6A9f93a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xf2fc648c23a5db24610a1cf696acc4f0f6d9a7d6028dd9944964ab23f6e35995",
        decimals: 9
      }
    ]
  },
  {
    name: "steakLRT",
    symbol: "steakLRT",
    icon: "steakLRT.png",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xBEEF69Ac7870777598A04B2bd4771c71212E6aBc",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x4fc8ac9f101df07e2c2dec4a53c8c42c439bdbe5e36ea2d863a61ff60afafc30",
        decimals: 9
      }
    ]
  }
], y2 = yC(IC, bC), V_ = (...e) => {
  const t = {};
  function r({ amount: n, assetId: s }) {
    t[s] ? t[s] = t[s].add(n) : t[s] = n;
  }
  return e.forEach((n) => n.forEach(r)), Object.entries(t).map(([n, s]) => ({ assetId: n, amount: s }));
}, EC = (e) => {
  const t = new M("u64");
  return e.reduce((r, n) => {
    const { assetId: s, amount: i, contractId: o } = n, a = t.encode(i), u = nt([
      dt.fromAddressOrString(o).toBytes(),
      a,
      W(s)
    ]);
    return nt([r, u]);
  }, new Uint8Array());
}, vC = async (e) => {
  const t = EC(e);
  await Ci();
  let r = new Uint8Array();
  return e.forEach((n, s) => {
    const i = (zo + ut + Jn) * s;
    r = nt([
      r,
      // Load ScriptData into register 0x10.
      Ll(16, 0, kl.ScriptData).to_bytes(),
      // Add the offset to 0x10 so it will point to the current contract ID, store in 0x11.
      tr(17, 16, i).to_bytes(),
      // Add CONTRACT_ID_LEN to 0x11 to point to the amount in the ScriptData, store in 0x12.
      tr(18, 17, zo).to_bytes(),
      // Load word to the amount at 0x12 into register 0x13.
      es(19, 18, 0).to_bytes(),
      // Add WORD_SIZE to 0x12 to point to the asset ID in the ScriptData, store in 0x14.
      tr(20, 18, ut).to_bytes(),
      // Perform the transfer using contract ID in 0x11, amount in 0x13, and asset ID in 0x14.
      Ol(17, 19, 20).to_bytes()
    ]);
  }), r = nt([r, Ya(1).to_bytes()]), { script: r, scriptData: t };
}, CC = 5, Ti = class extends dl {
  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance  (optional).
   * @param connector - A FuelConnector instance (optional).
   */
  constructor(t, r, n) {
    super();
    /**
     * The address associated with the account.
     */
    F(this, "address");
    /**
     * The provider used to interact with the network.
     */
    F(this, "_provider");
    /**
     * The connector for use with external wallets
     */
    F(this, "_connector");
    this._provider = r, this._connector = n, this.address = dt.fromDynamicInput(t);
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
      throw new v(D.MISSING_PROVIDER, "Provider not set");
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
  async getResourcesToSpend(t, r) {
    return this.provider.getResourcesToSpend(this.address, t, r);
  }
  /**
   * Retrieves coins owned by the account.
   *
   * @param assetId - The asset ID of the coins to retrieve (optional).
   * @returns A promise that resolves to an array of Coins.
   */
  async getCoins(t, r) {
    return this.provider.getCoins(this.address, t, r);
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
    const r = t ?? this.provider.getBaseAssetId();
    return await this.provider.getBalance(this.address, r);
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
  async fund(t, r) {
    var G;
    const { addedSignatures: n, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: o, gasPrice: a } = r, u = t.maxFee, A = this.provider.getBaseAssetId(), f = ((G = i.find((L) => L.assetId === A)) == null ? void 0 : G.amount) || x(0), g = YE({
      amount: x(u),
      assetId: A,
      coinQuantities: i
    }), y = {};
    g.forEach(({ amount: L, assetId: z }) => {
      y[z] = {
        required: L,
        owned: x(0)
      };
    }), t.inputs.filter(Kr).forEach((L) => {
      const P = tn(L) ? String(L.assetId) : A;
      y[P] && (y[P].owned = y[P].owned.add(L.amount));
    });
    let R = [];
    Object.entries(y).forEach(([L, { owned: z, required: P }]) => {
      z.lt(P) && R.push({
        assetId: L,
        amount: P.sub(z)
      });
    });
    let Q = R.length > 0, S = 0;
    for (; Q && S < CC; ) {
      const L = await this.getResourcesToSpend(
        R,
        Av(t.inputs, this.address)
      );
      t.addResources(L), t.updatePredicateGasUsed(s);
      const z = Ce(t);
      if (n && Array.from({ length: n }).forEach(
        () => z.addEmptyWitness()
      ), !o) {
        Q = !1;
        break;
      }
      const { maxFee: P } = await this.provider.estimateTxGasAndFee({
        transactionRequest: z,
        gasPrice: a
      }), Z = lv(
        t.inputs.filter(Kr),
        A,
        A
      ), j = f.add(P);
      Z.gt(j) ? Q = !1 : R = [
        {
          amount: j.sub(Z),
          assetId: A
        }
      ], S += 1;
    }
    if (Q)
      throw new v(
        D.NOT_ENOUGH_FUNDS,
        `The account ${this.address} does not have enough base asset funds to cover the transaction execution.`
      );
    this.provider.validateTransaction(t), t.updatePredicateGasUsed(s);
    const N = Ce(t);
    if (n && Array.from({ length: n }).forEach(() => N.addEmptyWitness()), !o)
      return t;
    const { maxFee: O } = await this.provider.estimateTxGasAndFee({
      transactionRequest: N,
      gasPrice: a
    });
    return t.maxFee = O, t;
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
  async createTransfer(t, r, n, s = {}) {
    let i = new Xr(s);
    return i = this.addTransfer(i, { destination: t, amount: r, assetId: n }), i = await this.estimateAndFundTransaction(i, s), i;
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
  async transfer(t, r, n, s = {}) {
    const i = await this.createTransfer(t, r, n, s);
    return this.sendTransaction(i, { estimateTxDependencies: !1 });
  }
  /**
   * Transfers multiple amounts of a token to multiple recipients.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @param txParams - Optional transaction parameters.
   * @returns A promise that resolves to a `TransactionResponse` object representing the transaction result.
   */
  async batchTransfer(t, r = {}) {
    let n = new Xr(r);
    return n = this.addBatchTransfer(n, t), n = await this.estimateAndFundTransaction(n, r), this.sendTransaction(n, { estimateTxDependencies: !1 });
  }
  /**
   * Adds a transfer to the given transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - The object representing the transfer to be made.
   * @returns The updated transaction request with the added transfer.
   */
  addTransfer(t, r) {
    const { destination: n, amount: s, assetId: i } = r;
    return this.validateTransferAmount(s), t.addCoinOutput(
      dt.fromAddressOrString(n),
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
  addBatchTransfer(t, r) {
    const n = this.provider.getBaseAssetId();
    return r.forEach(({ destination: s, amount: i, assetId: o }) => {
      this.addTransfer(t, {
        destination: s,
        amount: i,
        assetId: o ?? n
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
  async transferToContract(t, r, n, s = {}) {
    return this.batchTransferToContracts([{ amount: r, assetId: n, contractId: t }], s);
  }
  async batchTransferToContracts(t, r = {}) {
    let n = new Xr({
      ...r
    });
    const s = [], i = t.map((u) => {
      const A = x(u.amount), f = dt.fromAddressOrString(u.contractId), g = u.assetId ? X(u.assetId) : this.provider.getBaseAssetId();
      if (A.lte(0))
        throw new v(
          D.INVALID_TRANSFER_AMOUNT,
          "Transfer amount must be a positive number."
        );
      return n.addContractInputAndOutput(f), s.push({ amount: A, assetId: g }), {
        amount: A,
        contractId: f.toB256(),
        assetId: g
      };
    }), { script: o, scriptData: a } = await vC(i);
    return n.script = o, n.scriptData = a, n = await this.estimateAndFundTransaction(n, r, { quantities: s }), this.sendTransaction(n);
  }
  /**
   * Withdraws an amount of the base asset to the base chain.
   *
   * @param recipient - Address of the recipient on the base chain.
   * @param amount - Amount of base asset.
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(t, r, n = {}) {
    const s = dt.fromAddressOrString(t), i = W(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = W(
      "0x".concat(x(r).toHex().substring(2).padStart(16, "0"))
    ), u = { script: new Uint8Array([
      ...W(wv.bytes),
      ...i,
      ...o
    ]), ...n }, A = this.provider.getBaseAssetId();
    let f = new Xr(u);
    const g = [{ amount: x(r), assetId: A }], y = await this.getTransactionCost(f, { quantities: g });
    return f = this.validateGasLimitAndMaxFee({
      transactionRequest: f,
      gasUsed: y.gasUsed,
      maxFee: y.maxFee,
      txParams: n
    }), await this.fund(f, y), this.sendTransaction(f);
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
  async getTransactionCost(t, { signatureCallback: r, quantities: n = [] } = {}) {
    const s = Ce(Re(t)), i = this.provider.getBaseAssetId(), o = s.getCoinOutputsQuantities(), a = V_(o, n), u = [{ assetId: i, amount: x("100000000000000000") }], A = (y) => s.inputs.find((R) => R.type === Et.Coin ? R.assetId === y : mA(R) ? i === y : !1), f = (y, R) => {
      const Q = A(y), S = R;
      Q && "amount" in Q ? Q.amount = S : s.addResources(
        this.generateFakeResources([
          {
            amount: R,
            assetId: y
          }
        ])
      );
    };
    return V_(a, u).forEach(
      ({ amount: y, assetId: R }) => f(R, y)
    ), {
      ...await this.provider.getTransactionCost(s, {
        signatureCallback: r
      }),
      requiredQuantities: a
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
      throw new v(D.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
        D.MISSING_CONNECTOR,
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
  async sendTransaction(t, { estimateTxDependencies: r = !0 } = {}) {
    if (this._connector)
      return this.provider.getTransactionResponse(
        await this._connector.sendTransaction(this.address.toString(), t)
      );
    const n = Re(t);
    return r && await this.provider.estimateTxDependencies(n), this.provider.sendTransaction(n, {
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
  async simulateTransaction(t, { estimateTxDependencies: r = !0 } = {}) {
    const n = Re(t);
    return r && await this.provider.estimateTxDependencies(n), this.provider.simulate(n, { estimateTxDependencies: !1 });
  }
  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(t) {
    return t.map((r) => ({
      id: X(Ue(Vs)),
      owner: this.address,
      blockCreated: x(1),
      txCreatedIdx: x(1),
      ...r
    }));
  }
  /** @hidden * */
  validateTransferAmount(t) {
    if (x(t).lte(0))
      throw new v(
        D.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
  }
  /** @hidden * */
  async estimateAndFundTransaction(t, r, n) {
    let s = t;
    const i = await this.getTransactionCost(s, n);
    return s = this.validateGasLimitAndMaxFee({
      transactionRequest: s,
      gasUsed: i.gasUsed,
      maxFee: i.maxFee,
      txParams: r
    }), s = await this.fund(s, i), s;
  }
  /** @hidden * */
  validateGasLimitAndMaxFee({
    gasUsed: t,
    maxFee: r,
    transactionRequest: n,
    txParams: { gasLimit: s, maxFee: i }
  }) {
    const o = Re(n);
    if (!pr(s))
      o.gasLimit = t;
    else if (t.gt(s))
      throw new v(
        D.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!pr(i))
      o.maxFee = r;
    else if (r.gt(i))
      throw new v(
        D.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${r}'.`
      );
    return o;
  }
}, xn = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    F(this, "address");
    F(this, "publicKey");
    F(this, "compressedPublicKey");
    F(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = lr(e, 32);
    this.privateKey = X(t), this.publicKey = X(vr.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = X(vr.getPublicKey(t, !0)), this.address = dt.fromPublicKey(this.publicKey);
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
    const t = vr.sign(W(e), W(this.privateKey)), r = lr(`0x${t.r.toString(16)}`, 32), n = lr(`0x${t.s.toString(16)}`, 32);
    return n[0] |= (t.recovery || 0) << 7, X(nt([r, n]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = vr.ProjectivePoint.fromHex(W(this.compressedPublicKey)), r = vr.ProjectivePoint.fromHex(W(e));
    return `0x${t.add(r).toHex(!0)}`;
  }
  /**
   * Recover the public key from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - hashed signature
   * @returns public key from signature from the
   */
  static recoverPublicKey(e, t) {
    const r = W(t), n = r.slice(0, 32), s = r.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const a = new vr.Signature(BigInt(X(n)), BigInt(X(s))).addRecoveryBit(
      i
    ).recoverPublicKey(W(e)).toRawBytes(!1).slice(1);
    return X(a);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return dt.fromPublicKey(xn.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? ze(nt([Ue(32), W(e)])) : Ue(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = vr.ProjectivePoint.fromHex(W(e));
    return X(t.toRawBytes(!1).slice(1));
  }
}, H_ = 13, Y_ = 8, X_ = 1, vo = 32, BC = 16, W_ = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function xC(e, t, r) {
  const n = Dr(W_(e), "hex"), s = dt.fromAddressOrString(t), i = Ue(vo), o = Vh({
    password: Dr(r),
    salt: i,
    dklen: vo,
    n: 2 ** H_,
    r: Y_,
    p: X_
  }), a = Ue(BC), u = await Ig(n, o, a), A = Uint8Array.from([...o.subarray(16, 32), ...u]), f = Hh(A), g = Pn(f, "hex"), y = {
    id: Cg(),
    version: 3,
    address: W_(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: g,
      cipherparams: { iv: Pn(a, "hex") },
      ciphertext: Pn(u, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: vo,
        n: 2 ** H_,
        p: X_,
        r: Y_,
        salt: Pn(i, "hex")
      }
    }
  };
  return JSON.stringify(y);
}
async function RC(e, t) {
  const r = JSON.parse(e), {
    crypto: {
      mac: n,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: a, r: u, p: A, salt: f }
    }
  } = r, g = Dr(s, "hex"), y = Dr(i, "hex"), R = Dr(f, "hex"), Q = Dr(t), S = Vh({
    password: Q,
    salt: R,
    n: a,
    p: A,
    r: u,
    dklen: o
  }), N = Uint8Array.from([...S.subarray(16, 32), ...g]), O = Hh(N), G = Pn(O, "hex");
  if (n !== G)
    throw new v(
      D.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const L = await bg(g, S, y);
  return X(L);
}
var QA = class extends Ti {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, r) {
    const n = new xn(t);
    super(n.address, r);
    /**
     * A function that returns the wallet's signer.
     */
    F(this, "signer");
    this.signer = () => n;
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
    const r = await this.signer().sign(xg(t));
    return X(r);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const r = Re(t), n = this.provider.getChainId(), s = r.getTransactionId(n), i = await this.signer().sign(s);
    return X(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const r = Re(t), n = await this.signTransaction(r);
    return r.updateWitnessByOwner(this.address, n), r;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @param estimateTxDependencies - Whether to estimate the transaction dependencies.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, { estimateTxDependencies: r = !1 } = {}) {
    const n = Re(t);
    return r && await this.provider.estimateTxDependencies(n), this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(n),
      { estimateTxDependencies: !1 }
    );
  }
  /**
   * Populates the witness signature for a transaction and sends a call to the network using `provider.dryRun`.
   *
   * @param transactionRequestLike - The transaction request to simulate.
   * @returns A promise that resolves to the CallResult object.
   */
  async simulateTransaction(t, { estimateTxDependencies: r = !0 } = {}) {
    const n = Re(t);
    return r && await this.provider.estimateTxDependencies(n), this.provider.dryRun(
      await this.populateTransactionWitnessesSignature(n),
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
    return xC(this.privateKey, this.address, t);
  }
};
Nt(QA, "defaultPath", "m/44'/1179993420'/0'/0/0");
var vs = [
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
], SC = /* @__PURE__ */ ((e) => (e.english = "english", e))(SC || {});
function TC(e) {
  return (1 << e) - 1;
}
function FA(e) {
  return (1 << e) - 1 << 8 - e;
}
function Co(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function NC(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function DC(e) {
  const t = [0];
  let r = 11;
  for (let i = 0; i < e.length; i += 1)
    r > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], r -= 8) : (t[t.length - 1] <<= r, t[t.length - 1] |= e[i] >> 8 - r, t.push(e[i] & TC(8 - r)), r += 3);
  const n = e.length / 4, s = W(ve(e))[0] & FA(n);
  return t[t.length - 1] <<= n, t[t.length - 1] |= s >> 8 - n, t;
}
function QC(e, t) {
  const r = Math.ceil(11 * e.length / 8), n = W(new Uint8Array(r));
  let s = 0;
  for (let A = 0; A < e.length; A += 1) {
    const f = t.indexOf(e[A].normalize("NFKD"));
    if (f === -1)
      throw new v(
        D.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[A]}' is not found in the provided wordlist.`
      );
    for (let g = 0; g < 11; g += 1)
      f & 1 << 10 - g && (n[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, a = FA(o);
  if ((W(ve(n.slice(0, i / 8)))[0] & a) !== (n[n.length - 1] & a))
    throw new v(
      D.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return n.slice(0, i / 8);
}
var FC = wn("Bitcoin seed"), OC = "0x0488ade4", MC = "0x04358394", Z_ = [12, 15, 18, 21, 24];
function j_(e) {
  if (e.length !== 2048)
    throw new v(
      D.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function LC(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new v(
      D.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function Bo(e) {
  if (!Z_.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${Z_.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new v(D.INVALID_MNEMONIC, t);
  }
}
var Cr = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = vs) {
    F(this, "wordlist");
    this.wordlist = e, j_(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return Cr.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return Cr.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = vs) {
    const r = Co(e);
    return Bo(r), X(QC(r, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = vs) {
    const r = W(e);
    return j_(t), LC(r), DC(r).map((n) => t[n]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    Bo(Co(e));
    const r = wn(NC(e)), n = wn(`mnemonic${t}`);
    return Eg(r, n, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const r = Cr.mnemonicToSeed(e, t);
    return Cr.masterKeysFromSeed(r);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = Co(e);
    let r = 0;
    try {
      Bo(t);
    } catch {
      return !1;
    }
    for (; r < t.length; ) {
      if (Cr.binarySearch(t[r]) === !1)
        return !1;
      r += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = vs;
    let r = 0, n = t.length - 1;
    for (; r <= n; ) {
      const s = Math.floor((r + n) / 2);
      if (t[s] === e)
        return !0;
      e < t[s] ? n = s - 1 : r = s + 1;
    }
    return !1;
  }
  /**
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, the default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static masterKeysFromSeed(e) {
    const t = W(e);
    if (t.length < 16 || t.length > 64)
      throw new v(
        D.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return W(Yh("sha512", FC, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const r = Cr.masterKeysFromSeed(e), n = W(t ? MC : OC), s = "0x00", i = "0x00000000", o = "0x00000000", a = r.slice(32), u = r.slice(0, 32), A = nt([
      n,
      s,
      i,
      o,
      a,
      nt(["0x00", u])
    ]), f = ya(ve(ve(A)), 0, 4);
    return Eh(nt([A, f]));
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
    const r = t ? ve(nt([Ue(e), W(t)])) : Ue(e);
    return Cr.entropyToMnemonic(r);
  }
}, oc = Cr, OA = 2147483648, MA = X("0x0488ade4"), ac = X("0x0488b21e"), LA = X("0x04358394"), cc = X("0x043587cf");
function J_(e) {
  return Eh(nt([e, ya(ve(ve(e)), 0, 4)]));
}
function PC(e = !1, t = !1) {
  return e ? t ? cc : ac : t ? LA : MA;
}
function kC(e) {
  return [ac, cc].includes(X(e.slice(0, 4)));
}
function UC(e) {
  return [MA, LA, ac, cc].includes(
    X(e.slice(0, 4))
  );
}
function zC(e, t = 0) {
  const r = e.split("/");
  if (r.length === 0 || r[0] === "m" && t !== 0)
    throw new v(D.HD_WALLET_ERROR, `invalid path - ${e}`);
  return r[0] === "m" && r.shift(), r.map(
    (n) => ~n.indexOf("'") ? parseInt(n, 10) + OA : parseInt(n, 10)
  );
}
var an = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    F(this, "depth", 0);
    F(this, "index", 0);
    F(this, "fingerprint", X("0x00000000"));
    F(this, "parentFingerprint", X("0x00000000"));
    F(this, "privateKey");
    F(this, "publicKey");
    F(this, "chainCode");
    if (e.privateKey) {
      const t = new xn(e.privateKey);
      this.publicKey = X(t.compressedPublicKey), this.privateKey = X(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new v(
          D.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = X(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = ya(vg(ve(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && W(this.privateKey), r = W(this.publicKey), n = W(this.chainCode), s = new Uint8Array(37);
    if (e & OA) {
      if (!t)
        throw new v(
          D.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(W(this.publicKey));
    s.set(lr(e, 4), 33);
    const i = W(Yh("sha512", n, s)), o = i.slice(0, 32), a = i.slice(32);
    if (t) {
      const g = x(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new an({
        privateKey: g,
        chainCode: a,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const A = new xn(X(o)).addPoint(r);
    return new an({
      publicKey: A,
      chainCode: a,
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
    return zC(e, this.depth).reduce((r, n) => r.deriveIndex(n), this);
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
        D.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const r = PC(this.privateKey == null || e, t), n = X(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = fa(this.index, 4), o = this.chainCode, a = this.privateKey != null && !e ? nt(["0x00", this.privateKey]) : this.publicKey, u = W(nt([r, n, s, i, o, a]));
    return J_(u);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = oc.masterKeysFromSeed(e);
    return new an({
      chainCode: W(t.slice(32)),
      privateKey: W(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = X(lr(nf(e))), r = W(t), n = J_(r.slice(0, 78)) === e;
    if (r.length !== 82 || !UC(r))
      throw new v(D.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!n)
      throw new v(D.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = r[4], i = X(r.slice(5, 9)), o = parseInt(X(r.slice(9, 13)).substring(2), 16), a = X(r.slice(13, 45)), u = r.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new v(
        D.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (kC(r)) {
      if (u[0] !== 3)
        throw new v(D.HD_WALLET_ERROR, "Invalid public extended key.");
      return new an({
        publicKey: u,
        chainCode: a,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (u[0] !== 0)
      throw new v(D.HD_WALLET_ERROR, "Invalid private extended key.");
    return new an({
      privateKey: u.slice(1),
      chainCode: a,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, xo = an, PA = class extends Ti {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Qe(e, this._provider);
  }
}, Qe = class extends QA {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new xn("0x00"), new PA(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = xn.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new Qe(t, e == null ? void 0 : e.provider);
  }
  /**
   * Create a Wallet Unlocked from a seed.
   *
   * @param seed - The seed phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromSeed(e, t, r) {
    const s = xo.fromSeed(e).derivePath(t || Qe.defaultPath);
    return new Qe(s.privateKey, r);
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
  static fromMnemonic(e, t, r, n) {
    const s = oc.mnemonicToSeed(e, r), o = xo.fromSeed(s).derivePath(t || Qe.defaultPath);
    return new Qe(o.privateKey, n);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const r = xo.fromExtendedKey(e);
    return new Qe(r.privateKey, t);
  }
  /**
   * Create a Wallet Unlocked from an encrypted JSON.
   *
   * @param jsonWallet - The encrypted JSON keystore.
   * @param password - The password to decrypt the JSON.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static async fromEncryptedJson(e, t, r) {
    const n = await RC(e, t);
    return new Qe(n, r);
  }
}, Be = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new PA(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Qe(e, t);
  }
};
Nt(Be, "generate", Qe.generate);
Nt(Be, "fromSeed", Qe.fromSeed);
Nt(Be, "fromMnemonic", Qe.fromMnemonic);
Nt(Be, "fromExtendedKey", Qe.fromExtendedKey);
Nt(Be, "fromEncryptedJson", Qe.fromEncryptedJson);
var GC = class {
  constructor() {
    F(this, "storage", /* @__PURE__ */ new Map());
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
}, zr, kA = class {
  constructor(e) {
    Sr(this, zr, void 0), Nt(this, "pathKey", "{}"), Nt(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Nt(this, "numberOfAccounts", 0), Ze(this, zr, e.secret || oc.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Dt(this, zr),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const r = Be.fromMnemonic(Dt(this, zr), this.getDerivePath(t));
      e.push({
        publicKey: r.publicKey,
        address: r.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Be.fromMnemonic(Dt(this, zr), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const r = dt.fromAddressOrString(e);
    do {
      const n = Be.fromMnemonic(Dt(this, zr), this.getDerivePath(t));
      if (n.address.equals(r))
        return n.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new v(
      D.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Be.fromPrivateKey(t);
  }
};
zr = /* @__PURE__ */ new WeakMap();
Nt(kA, "type", "mnemonic");
var Br, UA = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    Sr(this, Br, []), e.secret ? Ze(this, Br, [e.secret]) : Ze(this, Br, e.accounts || [Be.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Dt(this, Br)
    };
  }
  getPublicAccount(e) {
    const t = Be.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return Dt(this, Br).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Be.generate();
    return Dt(this, Br).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = dt.fromAddressOrString(e), r = Dt(this, Br).find(
      (n) => Be.fromPrivateKey(n).address.equals(t)
    );
    if (!r)
      throw new v(
        D.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return r;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Be.fromPrivateKey(t);
  }
};
Br = /* @__PURE__ */ new WeakMap();
Nt(UA, "type", "privateKey");
var cr = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function dr(e, t) {
  if (!e)
    throw new v(D.WALLET_MANAGER_ERROR, t);
}
var Ne, Gr, $e, ua, zA, _a, GA, VA = class extends sA.EventEmitter {
  constructor(e) {
    super(), Sr(this, ua), Sr(this, _a), Nt(this, "storage", new GC()), Nt(this, "STORAGE_KEY", "WalletManager"), Sr(this, Ne, []), Sr(this, Gr, ""), Sr(this, $e, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Dt(this, $e);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    dr(!Dt(this, $e), cr.wallet_not_unlocked);
    const t = Dt(this, Ne).find((r, n) => n === e);
    return dr(t, cr.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Dt(this, Ne).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Dt(this, Ne).flatMap(
      (e, t) => e.vault.getAccounts().map((r) => ({ ...r, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = dt.fromAddressOrString(e), r = Dt(this, Ne).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return dr(r, cr.address_not_found), r.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = dt.fromAddressOrString(e);
    dr(!Dt(this, $e), cr.wallet_not_unlocked);
    const r = Dt(this, Ne).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return dr(r, cr.address_not_found), r.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Dt(this, Ne)[(e == null ? void 0 : e.vaultId) || 0];
    await dr(t, cr.vault_not_found);
    const r = t.vault.addAccount();
    return await this.saveState(), r;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Dt(this, Ne).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), r = new t(e);
    Ze(this, Ne, Dt(this, Ne).concat({
      title: e.title,
      type: e.type,
      vault: r
    })), await this.saveState();
  }
  /**
   * Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
   * secrets.
   */
  lock() {
    Ze(this, $e, !0), Ze(this, Ne, []), Ze(this, Gr, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Ze(this, Gr, e), Ze(this, $e, !1);
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
    const r = Dt(this, $e);
    await this.unlock(e), Ze(this, Gr, t), await this.saveState(), await this.loadState(), r && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await dr(!Dt(this, $e), cr.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await mg(Dt(this, Gr), JSON.parse(e));
      Ze(this, Ne, ra(this, _a, GA).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await dr(!Dt(this, $e), cr.wallet_not_unlocked);
    const e = await yg(Dt(this, Gr), {
      vaults: ra(this, ua, zA).call(this, Dt(this, Ne))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = VA.Vaults.find((r) => r.type === e);
    return dr(t, cr.invalid_vault_type), t;
  }
}, VC = VA;
Ne = /* @__PURE__ */ new WeakMap();
Gr = /* @__PURE__ */ new WeakMap();
$e = /* @__PURE__ */ new WeakMap();
ua = /* @__PURE__ */ new WeakSet();
zA = function(e) {
  return e.map(({ title: t, type: r, vault: n }) => ({
    title: t,
    type: r,
    data: n.serialize()
  }));
};
_a = /* @__PURE__ */ new WeakSet();
GA = function(e) {
  return e.map(({ title: t, type: r, data: n }) => {
    const s = this.getVaultClass(r);
    return {
      title: t,
      type: r,
      vault: new s(n)
    };
  });
};
Nt(VC, "Vaults", [kA, UA]);
var HC = class {
  constructor(e) {
    throw new v(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new v(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new v(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new v(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new v(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new v(D.NOT_IMPLEMENTED, "Not implemented.");
  }
};
Nt(HC, "type");
var b2 = class {
}, YC = 32, Ee = 16, Pe = 17, sn = 18, XC = 8;
function HA(e) {
  const n = new DataView(e.buffer, 8, 8).getBigUint64(0, !1);
  return Number(n);
}
function WC(e, t) {
  const { RegId: r, Instruction: n } = Vl, s = r.pc().to_u8(), i = r.sp().to_u8(), o = r.is().to_u8(), a = (S) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    Yr(Ee, s),
    // hold the address of the blob ID.
    tr(
      Ee,
      Ee,
      S * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    Yr(Pe, i),
    // REG_GENERAL_USE to hold the size of the blob.
    ei(sn, Ee),
    // Push the blob contents onto the stack.
    Zn(Ee, 0, sn, 1),
    // Move on to the data section length
    tr(Ee, Ee, YC),
    // load the size of the data section into REG_GENERAL_USE
    es(sn, Ee, 0),
    // after we have read the length of the data section, we move the pointer to the actual
    // data by skipping WORD_SIZE bytes.
    tr(Ee, Ee, XC),
    // load the data section of the executable
    Zn(Ee, 0, sn, 2),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    $s(Pe, Pe, o),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    ti(Pe, Pe, 4),
    // Jump to the start of the contract we loaded.
    Ks(Pe)
  ], u = (S) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    Yr(Ee, s),
    // hold the address of the blob ID.
    tr(
      Ee,
      Ee,
      S * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    Yr(Pe, i),
    // REG_GENERAL_USE to hold the size of the blob.
    ei(sn, Ee),
    // Push the blob contents onto the stack.
    Zn(Ee, 0, sn, 1),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    $s(Pe, Pe, o),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    ti(Pe, Pe, 4),
    // Jump to the start of the contract we loaded.
    Ks(Pe)
  ], A = HA(e);
  if (e.length < A)
    throw new Error(
      `Data section offset is out of bounds, offset: ${A}, binary length: ${e.length}`
    );
  const f = e.slice(A);
  if (f.length > 0) {
    const S = a(0).length;
    if (S > 65535)
      throw new Error("Too many instructions, exceeding u16::MAX.");
    const N = new Uint8Array(
      a(S).flatMap(
        (P) => Array.from(P.to_bytes())
      )
    ), O = new Uint8Array(t), G = new Uint8Array(8);
    new DataView(G.buffer).setBigUint64(0, BigInt(f.length), !1);
    const z = new Uint8Array([
      ...N,
      ...O,
      ...G
    ]);
    return {
      loaderBytecode: nt([z, f]),
      blobOffset: z.length
    };
  }
  const g = u(0).length;
  if (g > 65535)
    throw new Error("Too many instructions, exceeding u16::MAX.");
  const y = new Uint8Array(
    u(g).flatMap(
      (S) => Array.from(S.to_bytes())
    )
  ), R = new Uint8Array(t);
  return { loaderBytecode: new Uint8Array([...y, ...R]) };
}
async function ZC(e, t) {
  let r = x(0);
  const n = e.provider.getChain(), s = await e.provider.estimateGasPrice(10), i = n.consensusParameters.feeParameters.gasPriceFactor, o = t.calculateMinGas(n), a = Bn({
    gasPrice: s,
    gas: o,
    priceFactor: i,
    tip: t.tip
  }).add(1);
  if (r = r.add(a), r.gt(await e.getBalance()))
    throw new v(D.FUNDS_TOO_LOW, "Insufficient balance to deploy predicate.");
  const u = await e.getTransactionCost(t);
  return t.maxFee = u.maxFee, e.fund(t, u);
}
function jC(e, t) {
  const { configurables: r } = e, n = [];
  return r.forEach((s) => {
    n.push({ ...s, offset: s.offset - t });
  }), { ...e, configurables: n };
}
async function YA({
  deployer: e,
  bytecode: t,
  abi: r,
  loaderInstanceCallback: n
}) {
  const s = HA(W(t)), i = t.slice(0, s), o = ze(i), a = new hi({
    blobId: o,
    witnessIndex: 0,
    witnesses: [i]
  }), { loaderBytecode: u, blobOffset: A } = WC(
    W(t),
    W(o)
  ), f = i.length - (A || 0), g = jC(r, f), y = (await e.provider.getBlobs([o])).length > 0, R = n(u, g);
  if (y)
    return {
      waitForResult: () => Promise.resolve(R),
      blobId: o
    };
  const Q = await ZC(e, a);
  return {
    waitForResult: async () => {
      try {
        if ((await (await e.sendTransaction(Q)).waitForResult()).status !== "success")
          throw new Error();
      } catch {
        throw new v(D.TRANSACTION_FAILED, "Failed to deploy predicate chunk");
      }
      return R;
    },
    blobId: o
  };
}
var JC = (e) => {
  const r = W(e), n = mh(r, 16384), s = iA(n.map((o) => X(o)));
  return ze(nt(["0x4655454C", s]));
}, Ro = class extends Ti {
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytecode - The bytecode of the predicate.
   * @param abi - The JSON ABI of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param data - The predicate input data (optional).
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor({
    bytecode: t,
    abi: r,
    provider: n,
    data: s,
    configurableConstants: i
  }) {
    const { predicateBytes: o, predicateInterface: a } = Ro.processPredicateData(
      t,
      r,
      i
    ), u = dt.fromB256(JC(o));
    super(u, n);
    F(this, "bytes");
    F(this, "predicateData", []);
    F(this, "interface");
    this.bytes = o, this.interface = a, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    const r = Re(t), n = this.getIndexFromPlaceholderWitness(r);
    return n !== -1 && r.removeWitness(n), r.inputs.filter(yA).forEach((s) => {
      sa(s, this.address) && (s.predicate = X(this.bytes), s.predicateData = X(this.getPredicateData()), s.witnessIndex = 0);
    }), r;
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(t) {
    const r = Re(t);
    return super.sendTransaction(r, { estimateTxDependencies: !1 });
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(t) {
    const r = Re(t);
    return super.simulateTransaction(r, { estimateTxDependencies: !1 });
  }
  getPredicateData() {
    var r;
    if (!this.predicateData.length)
      return new Uint8Array();
    const t = (r = this.interface) == null ? void 0 : r.functions.main;
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
  static processPredicateData(t, r, n) {
    let s = W(t);
    const i = new gr(r);
    if (i.functions.main === void 0)
      throw new v(
        D.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return n && Object.keys(n).length && (s = Ro.setConfigurableConstants(
      s,
      n,
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
  async getResourcesToSpend(t, r) {
    return (await this.provider.getResourcesToSpend(
      this.address,
      t,
      r
    )).map((s) => ({
      ...s,
      predicate: X(this.bytes),
      predicateData: X(this.getPredicateData())
    }));
  }
  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(t) {
    return super.generateFakeResources(t).map((r) => ({
      ...r,
      predicate: X(this.bytes),
      predicateData: X(this.getPredicateData())
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
  static setConfigurableConstants(t, r, n) {
    const s = t;
    try {
      if (Object.keys(n.configurables).length === 0)
        throw new v(
          D.INVALID_CONFIGURABLE_CONSTANTS,
          "Predicate has no configurable constants to be set"
        );
      Object.entries(r).forEach(([i, o]) => {
        if (!(n != null && n.configurables[i]))
          throw new v(
            D.CONFIGURABLE_NOT_FOUND,
            `No configurable constant named '${i}' found in the Predicate`
          );
        const { offset: a } = n.configurables[i], u = n.encodeConfigurable(i, o);
        s.set(u, a);
      });
    } catch (i) {
      throw new v(
        D.INVALID_CONFIGURABLE_CONSTANTS,
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
    const r = t.inputs.filter(Kr).filter((o) => sa(o, this.address));
    let n = -1;
    const s = r.find((o) => !o.predicate);
    return s && (n = s.witnessIndex, r.every((a) => !a.predicate) || (i = r[0]) != null && i.predicate && (n = -1)), n;
  }
  /**
   *
   * @param account - The account used to pay the deployment costs.
   * @returns The _blobId_ and a _waitForResult_ callback that returns the deployed predicate
   * once the blob deployment transaction finishes.
   *
   * The returned loader predicate will have the same configurable constants
   * as the original predicate which was used to generate the loader predicate.
   */
  async deploy(t) {
    return YA({
      deployer: t,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: (r, n) => new Ro({
        bytecode: r,
        abi: n,
        provider: this.provider,
        data: this.predicateData
      })
    });
  }
}, XA = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(XA || {}), dc = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(dc || {}), WA = "FuelConnector", qC = class {
  constructor(e) {
    F(this, "storage");
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
}, $C = class extends sA.EventEmitter {
  constructor() {
    super(...arguments);
    F(this, "name", "");
    F(this, "metadata", {});
    F(this, "connected", !1);
    F(this, "installed", !1);
    F(this, "external", !0);
    F(this, "events", dc);
  }
  /**
   * Should return true if the connector is loaded
   * in less then one second.
   *
   * @returns Always true.
   */
  async ping() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current version of the connector
   * and the network version that is compatible.
   *
   * @returns boolean - connection status.
   */
  async version() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the connector is connected
   * to any of the accounts available.
   *
   * @returns The connection status.
   */
  async isConnected() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the accounts authorized for the
   * current connection.
   *
   * @returns The accounts addresses strings
   */
  async accounts() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should disconnect the current connection and
   * return false if the disconnection was successful.
   *
   * @emits assets connection
   * @returns The connection status.
   */
  async disconnect() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
  async signMessage(t, r) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
  async signTransaction(t, r) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
  async sendTransaction(t, r) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the assets added to the connector. If a connection is already established.
   *
   * @returns Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.
   */
  async assets() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the networks available from the connector. If the connection is already established.
   *
   * @returns Return all the networks added to the connector.
   */
  async networks() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current network selected inside the connector. Even if the connection is not established.
   *
   * @returns Return the current network selected inside the connector.
   */
  async currentNetwork() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the ABI to the connector and return true if the ABI was added successfully.
   *
   * @param contractId - The contract id to add the ABI.
   * @param abi - The JSON ABI that represents a contract.
   * @returns Return true if the ABI was added successfully.
   */
  async addABI(t, r) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the ABI from the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the ABI.
   * @returns The ABI if it exists, otherwise return null.
   */
  async getABI(t) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the abi exists in the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the abi
   * @returns Returns true if the abi exists or false if not.
   */
  async hasABI(t) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Event listener for the connector.
   *
   * @param eventName - The event name to listen
   * @param listener - The listener function
   */
  on(t, r) {
    return super.on(t, r), this;
  }
};
function KC(e, { cache: t, cacheTime: r, key: n }) {
  return async (...s) => {
    var o, a, u;
    if (t[n] && ((o = t[n]) != null && o.value))
      return (a = t[n]) == null ? void 0 : a.value;
    clearTimeout((u = t[n]) == null ? void 0 : u.timeout);
    const i = await e(...s);
    return t[n] = {
      timeout: Number(
        setTimeout(() => {
          t[n] = null;
        }, r)
      ),
      value: i
    }, i;
  };
}
function I2(e) {
  window.dispatchEvent(
    new CustomEvent(WA, {
      detail: e
    })
  );
}
function tB() {
  const e = {};
  return e.promise = new Promise((t, r) => {
    e.reject = r, e.resolve = t;
  }), e;
}
async function Cs(e, t = 1050) {
  const r = new Promise((n, s) => {
    setTimeout(() => {
      s(new v(v.CODES.TIMEOUT_EXCEEDED, "Promise timed out"));
    }, t);
  });
  return Promise.race([r, e]);
}
var eB = 2e3, rB = 5e3, { warn: nB } = console, Yn = class extends $C {
  constructor(t = Yn.defaultConfig) {
    super();
    F(this, "_storage", null);
    F(this, "_connectors", []);
    F(this, "_targetObject", null);
    F(this, "_unsubscribes", []);
    F(this, "_targetUnsubscribe", () => {
    });
    F(this, "_pingCache", {});
    F(this, "_currentConnector");
    F(this, "_initializationPromise", null);
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    F(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, r = WA;
      if (t != null && t.on)
        return t.on(r, this.addConnector), () => {
          var n;
          (n = t.off) == null || n.call(t, r, this.addConnector);
        };
      if (t != null && t.addEventListener) {
        const n = (s) => {
          this.addConnector(s.detail);
        };
        return t.addEventListener(r, n), () => {
          var s;
          (s = t.removeEventListener) == null || s.call(t, r, n);
        };
      }
      return () => {
      };
    });
    /**
     * Add a new connector to the list of connectors.
     */
    F(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    F(this, "triggerConnectorEvents", async () => {
      const [t, r, n] = await Promise.all([
        this.isConnected(),
        this.networks(),
        this.currentNetwork()
      ]);
      if (this.emit(this.events.connection, t), this.emit(this.events.networks, r), this.emit(this.events.currentNetwork, n), t) {
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
    F(this, "getConnector", (t) => this._connectors.find((r) => {
      const n = typeof t == "string" ? t : t.name;
      return r.name === n || r === t;
    }) || null);
    this.setMaxListeners(1e3), this._connectors = t.connectors ?? [], this._targetObject = this.getTargetObject(t.targetObject), this._storage = t.storage === void 0 ? this.getStorage() : t.storage, this.setupMethods(), this._initializationPromise = this.initialize();
  }
  async initialize() {
    try {
      const t = this.setDefaultConnector();
      this._targetUnsubscribe = this.setupConnectorListener(), await t;
    } catch {
      throw new v(D.INVALID_PROVIDER, "Error initializing Fuel Connector");
    }
  }
  async init() {
    return await this._initializationPromise, this;
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
      return new qC(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var r, n;
    const t = await ((r = this._storage) == null ? void 0 : r.getItem(Yn.STORAGE_KEY)) || ((n = this._connectors[0]) == null ? void 0 : n.name);
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
    const r = this._currentConnector;
    this._unsubscribes.map((n) => n()), this._unsubscribes = t.map((n) => {
      const s = (...i) => this.emit(n, ...i);
      return r.on(n, s), () => r.off(n, s);
    });
  }
  /**
   * Call method from the current connector.
   */
  async callMethod(t, ...r) {
    const n = await this.hasConnector();
    if (await this.pingConnector(), !this._currentConnector || !n)
      throw new v(
        D.MISSING_CONNECTOR,
        `No connector selected for calling ${t}. Use hasConnector before executing other methods.`
      );
    if (typeof this._currentConnector[t] == "function")
      return this._currentConnector[t](...r);
  }
  /**
   * Create a method for each method proxy that is available on the Common interface
   * and call the method from the current connector.
   */
  setupMethods() {
    Object.values(XA).forEach((t) => {
      this[t] = async (...r) => this.callMethod(t, ...r);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const r = Date.now(), [n, s] = await Promise.allSettled([
      Cs(t.isConnected()),
      Cs(this.pingConnector(t))
    ]);
    return r < (t._latestUpdate || 0) || (t._latestUpdate = Date.now(), t.installed = s.status === "fulfilled" && s.value, t.connected = n.status === "fulfilled" && n.value), {
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
    const r = t || this._currentConnector;
    if (!r)
      return !1;
    try {
      return await KC(async () => Cs(r.ping()), {
        key: r.name,
        cache: this._pingCache,
        cacheTime: rB
      })();
    } catch {
      throw new v(D.INVALID_PROVIDER, "Current connector is not available.");
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
  async selectConnector(t, r = {
    emitEvents: !0
  }) {
    var i, o;
    const n = this.getConnector(t);
    if (!n)
      return !1;
    if (((i = this._currentConnector) == null ? void 0 : i.name) === t)
      return !0;
    const { installed: s } = await this.fetchConnectorStatus(n);
    return s ? (this._currentConnector = n, this.emit(this.events.currentConnector, n), this.setupConnectorEvents(Object.values(dc)), await ((o = this._storage) == null ? void 0 : o.setItem(Yn.STORAGE_KEY, n.name)), r.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = tB();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), Cs(t.promise, eB).then(() => !0).catch(() => !1);
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
    return nB(
      "getProvider is deprecated and is going to be removed in the future, use getWallet instead."
    ), this._getProvider(t);
  }
  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   */
  async _getProvider(t) {
    let r;
    if (t && "getTransactionResponse" in t)
      r = t;
    else if (t && "chainId" in t && "url" in t)
      r = await li.create(t.url);
    else {
      if (t)
        throw new v(D.INVALID_PROVIDER, "Provider is not valid.");
      {
        const n = await this.currentNetwork();
        r = await li.create(n.url);
      }
    }
    return r;
  }
  /**
   * Return a Fuel Wallet Locked instance with extends features to work with
   * connectors.
   */
  async getWallet(t, r) {
    const n = await this._getProvider(r);
    return new Ti(t, n, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Yn.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, ZA = Yn;
Nt(ZA, "STORAGE_KEY", "fuel-current-connector");
Nt(ZA, "defaultConfig", {});
function q_(e, t) {
  if (!e)
    throw new v(D.TRANSACTION_ERROR, t);
}
function jA(e) {
  return e.reduce((t, r, n) => {
    const { program: s, externalAbis: i } = r.getCallConfig();
    return n === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var JA = (e, t, r) => {
  if (!t)
    return [];
  const { main: n, otherContractsAbis: s } = jA(r);
  return ic(e, n, s);
}, Ke, oh, uc = (oh = class {
  constructor(...e) {
    Ge(this, Ke);
    Je(this, Ke, e || []);
  }
  entries() {
    return Mt(this, Ke);
  }
  push(...e) {
    Mt(this, Ke).push(...e);
  }
  concat(e) {
    return Mt(this, Ke).concat(e);
  }
  extend(e) {
    Mt(this, Ke).push(...e);
  }
  toBytes() {
    return nt(
      Mt(this, Ke).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return X(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Mt(this, Ke), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Ke = new WeakMap(), oh), sB = (e) => $h + qh({ maxInputs: e });
function iB(e) {
  const t = [...e.receipts];
  let r, n;
  if (t.forEach((i) => {
    i.type === _t.ScriptResult ? r = i : (i.type === _t.Return || i.type === _t.ReturnData || i.type === _t.Revert) && (n = i);
  }), !r || !n)
    throw new v(D.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: r.result,
    gasUsed: r.gasUsed,
    receipts: t,
    scriptResultReceipt: r,
    returnReceipt: n,
    callResult: e
  };
}
function _c(e, t, r = []) {
  var n;
  try {
    const s = iB(e);
    return t(s);
  } catch (s) {
    if (s.code === D.SCRIPT_REVERTED) {
      const i = (n = e == null ? void 0 : e.dryRunStatus) == null ? void 0 : n.reason;
      throw ec({
        logs: r,
        receipts: e.receipts,
        statusReason: i
      });
    }
    throw s;
  }
}
function oB(e, t, r) {
  return _c(
    e,
    (n) => {
      if (n.returnReceipt.type === _t.Revert)
        throw new v(
          D.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(r)}`
        );
      if (n.returnReceipt.type !== _t.Return && n.returnReceipt.type !== _t.ReturnData) {
        const { type: i } = n.returnReceipt;
        throw new v(
          D.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: r,
            receipt: n.returnReceipt
          })}`
        );
      }
      let s;
      return n.returnReceipt.type === _t.Return && (s = n.returnReceipt.val), n.returnReceipt.type === _t.ReturnData && (s = t.func.decodeOutput(n.returnReceipt.data)[0]), s;
    },
    r
  );
}
var Ni = class {
  /**
   * Creates an instance of the ScriptRequest class.
   *
   * @param bytes - The bytes of the script.
   * @param scriptDataEncoder - The script data encoder function.
   * @param scriptResultDecoder - The script result decoder function.
   */
  constructor(e, t, r) {
    /**
     * The bytes of the script.
     */
    F(this, "bytes");
    /**
     * A function to encode the script data.
     */
    F(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    F(this, "scriptResultDecoder");
    this.bytes = W(e), this.scriptDataEncoder = t, this.scriptResultDecoder = r;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return qh({ maxInputs: t }) + $h + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Ni.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = W(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return _c(e, this.scriptResultDecoder, t);
  }
}, qA = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, aB = St, $A = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: r,
  assetIdOffset: n
}) => {
  const s = new uc(
    _n(16, e),
    _n(17, r),
    es(17, 17, 0),
    _n(18, n)
  );
  return t ? s.push(
    _n(19, t),
    es(19, 19, 0),
    qo(16, 17, 18, 19)
  ) : s.push(qo(16, 17, 18, h.cgas().to_u8())), s;
};
function $_(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new uc();
  for (let r = 0; r < e.length; r += 1)
    t.extend($A(e[r]).entries());
  return t.push(Ya(1)), t.toBytes();
}
var cB = (e) => e === _t.Return || e === _t.ReturnData, dB = (e, t) => e.find(
  ({ type: r, from: n, to: s }) => r === _t.Call && n === aB && s === t
), uB = (e) => (t) => {
  if (xr(t.code) !== 0)
    throw new v(D.SCRIPT_REVERTED, "Transaction reverted.");
  const r = dB(
    t.receipts,
    e.toB256()
  ), n = x(r == null ? void 0 : r.is);
  return t.receipts.filter(({ type: i }) => cB(i)).flatMap((i) => n.eq(x(i.is)) ? i.type === _t.Return ? [new M("u64").encode(i.val)] : i.type === _t.ReturnData ? [W(i.data)] : [new Uint8Array()] : []);
}, _B = (e, t, r = []) => _c(e, uB(t), r), hB = (e) => e.reduce(
  (t, r) => {
    const n = { ...qA };
    return r.gas && (n.gasForwardedOffset = 1), t + $A(n).byteLength();
  },
  k.size()
  // placeholder for single RET instruction which is added later
), lB = (e, t) => new Ni(
  // Script to call the contract, start with stub size matching length of calls
  $_(new Array(e.length).fill(qA)),
  (r) => {
    var R;
    const n = r.length;
    if (n === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = hB(r), i = (8 - s % 8) % 8, o = s + i, a = sB(t.toNumber()) + o, u = [];
    let A = a;
    const f = [];
    for (let Q = 0; Q < n; Q += 1) {
      const S = r[Q], N = A, O = N + ut, G = O + Jn, L = G + zo + ut + ut, z = L + S.fnSelectorBytes.byteLength, P = W(S.data);
      let Z = 0;
      f.push(new M("u64").encode(S.amount || 0)), f.push(new Y().encode(((R = S.assetId) == null ? void 0 : R.toString()) || St)), f.push(S.contractId.toBytes()), f.push(new M("u64").encode(L)), f.push(new M("u64").encode(z)), f.push(S.fnSelectorBytes), f.push(P), S.gas && (f.push(new M("u64").encode(S.gas)), Z = z + P.byteLength);
      const j = {
        amountOffset: N,
        assetIdOffset: O,
        gasForwardedOffset: Z,
        callDataOffset: G
      };
      u.push(j), A = a + nt(f).byteLength;
    }
    const g = $_(u);
    return { data: nt(f), script: g };
  },
  () => [new Uint8Array()]
), KA = (e, t, r, n) => {
  var a;
  const s = (a = e[0]) == null ? void 0 : a.getCallConfig();
  if (e.length === 1 && s && "bytes" in s.program)
    return oB({ receipts: t }, s, n);
  const o = _B(
    { receipts: t },
    (s == null ? void 0 : s.program).id,
    n
  ).map((u, A) => {
    var g;
    const { func: f } = e[A].getCallConfig();
    return (g = f.decodeOutput(u)) == null ? void 0 : g[0];
  });
  return r ? o : o == null ? void 0 : o[0];
}, AB = async (e) => {
  var R;
  const { funcScope: t, isMultiCall: r, program: n, transactionResponse: s } = e, i = await s.waitForResult(), { receipts: o } = i, a = Array.isArray(t) ? t : [t], u = (R = a[0]) == null ? void 0 : R.getCallConfig(), A = JA(o, u, a), f = KA(a, o, r, A), g = Ri(o);
  return {
    isMultiCall: r,
    functionScopes: a,
    value: f,
    program: n,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: A,
    gasUsed: g
  };
}, So = (e) => {
  var g;
  const { funcScopes: t, callResult: r, isMultiCall: n } = e, { receipts: s } = r, i = Array.isArray(t) ? t : [t], o = (g = i[0]) == null ? void 0 : g.getCallConfig(), a = JA(s, o, i), u = KA(i, s, n, a), A = Ri(s);
  return {
    functionScopes: i,
    callResult: r,
    isMultiCall: n,
    gasUsed: A,
    value: u
  };
};
function pB(e) {
  const { program: t, args: r, forward: n, func: s, callParameters: i, externalAbis: o } = e.getCallConfig(), a = s.encodeArguments(r);
  return {
    contractId: t.id,
    fnSelectorBytes: s.selectorBytes,
    data: a,
    assetId: n == null ? void 0 : n.assetId,
    amount: n == null ? void 0 : n.amount,
    gas: i == null ? void 0 : i.gasLimit,
    externalContractsAbis: o
  };
}
var tp = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    F(this, "transactionRequest");
    F(this, "program");
    F(this, "functionInvocationScopes", []);
    F(this, "txParameters");
    F(this, "requiredCoins", []);
    F(this, "isMultiCall", !1);
    F(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    F(this, "externalAbis", {});
    F(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new Xr();
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
    return this.functionInvocationScopes.map((r) => pB(r));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), r = lB(this.functionInvocationScopes, t);
    this.transactionRequest.setScript(r, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId), t.externalContractsAbis && Object.keys(t.externalContractsAbis).forEach(
        (r) => this.transactionRequest.addContractInputAndOutput(dt.fromB256(r))
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
      amount: x(t.amount || 0)
    })).filter(({ assetId: t, amount: r }) => t && !x(r).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const e = this.getRequiredCoins(), t = (r, { assetId: n, amount: s }) => {
      var o;
      const i = ((o = r.get(n)) == null ? void 0 : o.amount) || x(0);
      return r.set(n, {
        assetId: String(n),
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
    await Ci(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === vt.Script && (this.transactionRequest.abis = jA(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, r) => t.add(r.gas || 0), x(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new v(
        D.TRANSACTION_ERROR,
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
    const e = Ce(await this.getTransactionRequest());
    return (this.program.account ?? Be.generate({ provider: this.getProvider() })).getTransactionCost(e, {
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
    e = Ce(e);
    const t = await this.getTransactionCost(), { gasUsed: r, missingContractIds: n, outputVariables: s, maxFee: i } = t;
    return this.setDefaultTxParams(e, r, i), e.inputs = e.inputs.filter((a) => a.type !== Et.Coin), n.forEach((a) => {
      e.addContractInputAndOutput(dt.fromString(a));
    }), e.addVariableOutputs(s), await ((o = this.program.account) == null ? void 0 : o.fund(e, t)), this.addSignersCallback && await this.addSignersCallback(e), e;
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
    const t = this.transactionRequest;
    return t.tip = x(e.tip || t.tip), t.gasLimit = x(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? x(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? x(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((r = this.txParameters) == null ? void 0 : r.variableOutputs) || 0), this;
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
    const { amount: t, destination: r, assetId: n } = e, s = this.getProvider().getBaseAssetId();
    return this.transactionRequest = this.transactionRequest.addCoinOutput(
      dt.fromAddressOrString(r),
      t,
      n || s
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
    return e.forEach(({ destination: r, amount: n, assetId: s }) => {
      this.transactionRequest = this.transactionRequest.addCoinOutput(
        dt.fromAddressOrString(r),
        n,
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
    q_(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      estimateTxDependencies: !1
    });
    return {
      transactionId: t.id,
      waitForResult: async () => AB({
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
    if (q_(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new v(
        D.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return So({
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
    return So({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return So({
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
  setDefaultTxParams(e, t, r) {
    var a, u;
    const n = pr((a = this.txParameters) == null ? void 0 : a.gasLimit) || this.hasCallParamsGasLimit, s = pr((u = this.txParameters) == null ? void 0 : u.maxFee), { gasLimit: i, maxFee: o } = e;
    if (!n)
      e.gasLimit = t;
    else if (i.lt(t))
      throw new v(
        D.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${t}'.`
      );
    if (!s)
      e.maxFee = r;
    else if (r.gt(o))
      throw new v(
        D.MAX_FEE_TOO_LOW,
        `Max fee '${o}' is lower than the required: '${r}'.`
      );
  }
}, ep = class extends tp {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, r, n) {
    super(t, !1);
    F(this, "func");
    F(this, "callParameters");
    F(this, "forward");
    F(this, "args");
    this.func = r, this.args = n || [], this.setArguments(...n), super.addCall(this);
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
      if (!this.func.attributes.find((r) => r.name === "payable"))
        throw new v(
          D.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = Za(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, fB = class extends tp {
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
}, ha = class {
  /**
   * Creates an instance of the Contract class.
   *
   * @param id - The contract's address.
   * @param abi - The contract's ABI (JSON ABI or Interface instance).
   * @param accountOrProvider - The account or provider for interaction.
   */
  constructor(e, t, r) {
    /**
     * The unique contract identifier.
     */
    F(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    F(this, "provider");
    /**
     * The contract's ABI interface.
     */
    F(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    F(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    F(this, "functions", {});
    this.interface = t instanceof gr ? t : new gr(t), this.id = dt.fromAddressOrString(e), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null), Object.keys(this.interface.functions).forEach((n) => {
      const s = this.interface.getFunction(n);
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
      const t = (...r) => new ep(this, e, r);
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
    return new fB(this, e);
  }
  /**
   * Get the balance for a given asset ID for this contract.
   *
   * @param assetId - The specified asset ID.
   * @returns The balance of the contract for the specified asset.
   */
  getBalance(e) {
    return this.provider.getContractBalance(this.id, e);
  }
}, gB = class extends ep {
  constructor() {
    super(...arguments);
    F(this, "scriptRequest");
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
    this.scriptRequest = new Ni(
      t,
      (n) => this.func.encodeArguments(n),
      () => []
    );
  }
}, wB = class extends lw {
  /**
   * Create a new instance of the Script class.
   *
   * @param bytecode - The compiled bytecode of the script.
   * @param abi - The ABI interface for the script.
   * @param account - The account associated with the script.
   */
  constructor(t, r, n) {
    super();
    /**
     * The compiled bytecode of the script.
     */
    F(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    F(this, "interface");
    /**
     * The account associated with the script.
     */
    F(this, "account");
    /**
     * The script request object.
     */
    F(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    F(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    F(this, "functions");
    this.bytes = W(t), this.interface = new gr(r), this.provider = n.provider, this.account = n, this.functions = {
      main: (...s) => new gB(this, this.interface.getFunction("main"), s)
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
        throw new v(
          v.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          "The script does not have configurable constants to be set"
        );
      Object.entries(t).forEach(([r, n]) => {
        if (!this.interface.configurables[r])
          throw new v(
            v.CODES.CONFIGURABLE_NOT_FOUND,
            `The script does not have a configurable constant named: '${r}'`
          );
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n);
        this.bytes.set(i, s);
      });
    } catch (r) {
      throw new v(
        v.CODES.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${r.message}.`
      );
    }
    return this;
  }
  /**
   *
   * @param account - The account used to pay the deployment costs.
   * @returns The _blobId_ and a _waitForResult_ callback that returns the deployed predicate
   * once the blob deployment transaction finishes.
   *
   * The returned loader script will have the same configurable constants
   * as the original script which was used to generate the loader script.
   */
  deploy(t) {
    return YA({
      deployer: t,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: (r, n) => new wB(r, n, this.account)
    });
  }
};
new Ni(
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
function E2(e) {
  return e;
}
var mB = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(mB || {}), yB = Object.defineProperty, bB = (e, t) => {
  for (var r in t)
    yB(e, r, { get: t[r], enumerable: !0 });
}, IB = (e) => {
  const { RegId: t, Instruction: r } = Vl, n = 12, s = e.length, i = fr, o = nt(e.map((u) => W(u))), a = new uc(
    // 1. load the blob contents into memory
    // find the start of the hardcoded blob ids, which are located after the code ends
    Yr(16, t.pc().to_u8()),
    // 0x10 to hold the address of the current blob id
    tr(16, 16, n * r.size()),
    // The contract is going to be loaded from the current value of SP onwards, save
    // the location into 0x16 so we can jump into it later on
    Yr(22, t.sp().to_u8()),
    // loop counter
    _n(19, s),
    // LOOP starts here
    // 0x11 to hold the size of the current blob
    ei(17, 16),
    // push the blob contents onto the stack
    Zn(16, 0, 17, 1),
    // move on to the next blob
    tr(16, 16, i),
    // decrement the loop counter
    Ml(19, 19, 1),
    // Jump backwards (3+1) instructions if the counter has not reached 0
    Pl(19, t.zero().to_u8(), 3),
    // Jump into the memory where the contract is loaded
    // what follows is called _jmp_mem by the sway compiler
    // subtract the address contained in IS because jmp will add it back
    $s(22, 22, t.is().to_u8()),
    // jmp will multiply by 4 so we need to divide to cancel that out
    ti(22, 22, 4),
    // jump to the start of the contract we loaded
    Ks(22)
  ).toBytes();
  return nt([a, o]);
}, EB = (e, t) => {
  const r = [];
  for (let n = 0, s = 0; n < e.length; n += t, s++) {
    let i = e.slice(n, n + t), o = i.length;
    o % ut !== 0 && (i = nt([i, new Uint8Array(t - i.length)]), o = i.length), r.push({ id: s, size: o, bytecode: i });
  }
  return r;
}, vB = {};
bB(vB, {
  getContractId: () => sp,
  getContractRoot: () => rp,
  getContractStorageRoot: () => np,
  hexlifyWithPrefix: () => la
});
var rp = (e) => {
  const r = W(e), n = mh(r, 16384);
  return iA(n.map((s) => X(s)));
}, np = (e) => {
  const t = new GE();
  return e.forEach(({ key: r, value: n }) => t.update(ve(r), n)), t.root;
}, sp = (e, t, r) => {
  const n = rp(W(e));
  return ve(nt(["0x4655454C", t, n, r]));
}, la = (e) => X(e.startsWith("0x") ? e : `0x${e}`), K_ = 0.95, ip = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, r = null, n = []) {
    F(this, "bytecode");
    F(this, "interface");
    F(this, "provider");
    F(this, "account");
    F(this, "storageSlots");
    this.bytecode = W(e), t instanceof gr ? this.interface = t : this.interface = new gr(t), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null), this.storageSlots = n;
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new ip(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    const t = ((e == null ? void 0 : e.storageSlots) ?? []).concat(this.storageSlots).map(({ key: a, value: u }) => ({
      key: la(a),
      value: la(u)
    })).filter((a, u, A) => A.findIndex((f) => f.key === a.key) === u).sort(({ key: a }, { key: u }) => a.localeCompare(u)), r = {
      salt: Ue(32),
      ...e ?? {},
      storageSlots: t
    };
    if (!this.provider)
      throw new v(
        D.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const n = (e == null ? void 0 : e.bytecode) || this.bytecode, s = r.stateRoot || np(r.storageSlots), i = sp(n, r.salt, s), o = new ia({
      bytecodeWitnessIndex: 0,
      witnesses: [n],
      ...r
    });
    return o.addContractCreatedOutput(i, s), {
      contractId: i,
      transactionRequest: o
    };
  }
  /**
   * Takes a transaction request, estimates it and funds it.
   *
   * @param request - the request to fund.
   * @param options - options for funding the request.
   * @returns a funded transaction request.
   */
  async fundTransactionRequest(e, t = {}) {
    const r = this.getAccount(), { maxFee: n } = t, s = await r.getTransactionCost(e);
    if (pr(n)) {
      if (s.maxFee.gt(n))
        throw new v(
          D.MAX_FEE_TOO_LOW,
          `Max fee '${t.maxFee}' is lower than the required: '${s.maxFee}'.`
        );
    } else
      e.maxFee = s.maxFee;
    return await r.fund(e, s), e;
  }
  /**
   * Deploy a contract of any length with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deploy(e = {}) {
    const t = this.getAccount(), { consensusParameters: r } = t.provider.getChain(), n = r.contractParameters.contractMaxSize.toNumber();
    return this.bytecode.length > n ? this.deployAsBlobTx(e) : this.deployAsCreateTx(e);
  }
  /**
   * Deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsCreateTx(e = {}) {
    const t = this.getAccount(), { consensusParameters: r } = t.provider.getChain(), n = r.contractParameters.contractMaxSize.toNumber();
    if (this.bytecode.length > n)
      throw new v(
        D.CONTRACT_SIZE_EXCEEDS_LIMIT,
        "Contract bytecode is too large. Please use `deployAsBlobTx` instead."
      );
    const { contractId: s, transactionRequest: i } = await this.prepareDeploy(e), o = await t.sendTransaction(i);
    return {
      contractId: s,
      waitForTransactionId: () => Promise.resolve(o.id),
      waitForResult: async () => {
        const u = await o.waitForResult();
        return { contract: new ha(s, this.interface, t), transactionResult: u };
      }
    };
  }
  /**
   * Chunks and deploys a contract via a loader contract. Suitable for deploying contracts larger than the max contract size.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsBlobTx(e = {
    chunkSizeMultiplier: K_
  }) {
    const t = this.getAccount(), { configurableConstants: r, chunkSizeMultiplier: n } = e;
    r && this.setConfigurableConstants(r);
    const s = this.getMaxChunkSize(e, n), i = EB(W(this.bytecode), s).map((P) => {
      const Z = this.blobTransactionRequest({
        ...e,
        bytecode: P.bytecode
      });
      return {
        ...P,
        transactionRequest: Z,
        blobId: Z.blobId
      };
    }), o = i.map(({ blobId: P }) => P), a = IB(o), { contractId: u, transactionRequest: A } = this.createTransactionRequest({
      bytecode: a,
      ...e
    }), f = [...new Set(o)], g = await t.provider.getBlobs(f), y = f.filter((P) => !g.includes(P));
    let R = x(0);
    const Q = t.provider.getChain(), S = await t.provider.estimateGasPrice(10), N = Q.consensusParameters.feeParameters.gasPriceFactor;
    for (const { transactionRequest: P, blobId: Z } of i) {
      if (y.includes(Z)) {
        const U = P.calculateMinGas(Q), ot = Bn({
          gasPrice: S,
          gas: U,
          priceFactor: N,
          tip: P.tip
        }).add(1);
        R = R.add(ot);
      }
      const j = A.calculateMinGas(Q), V = Bn({
        gasPrice: S,
        gas: j,
        priceFactor: N,
        tip: A.tip
      }).add(1);
      R = R.add(V);
    }
    if (R.gt(await t.getBalance()))
      throw new v(D.FUNDS_TOO_LOW, "Insufficient balance to deploy contract.");
    let O;
    const G = new Promise((P) => {
      O = P;
    });
    return { waitForResult: async () => {
      const P = [];
      for (const { blobId: U, transactionRequest: ot } of i)
        if (!P.includes(U) && y.includes(U)) {
          const q = await this.fundTransactionRequest(
            ot,
            e
          );
          let $;
          try {
            $ = await (await t.sendTransaction(q)).waitForResult();
          } catch (C) {
            if (C.message.indexOf(`BlobId is already taken ${U}`) > -1) {
              P.push(U);
              continue;
            }
            throw new v(D.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          }
          if (!$.status || $.status !== CA.success)
            throw new v(D.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          P.push(U);
        }
      await this.fundTransactionRequest(A, e), O(A.getTransactionId(t.provider.getChainId()));
      const j = await (await t.sendTransaction(A)).waitForResult();
      return { contract: new ha(u, this.interface, t), transactionResult: j };
    }, contractId: u, waitForTransactionId: () => G };
  }
  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(e) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new v(
          D.CONFIGURABLE_NOT_FOUND,
          "Contract does not have configurables to be set"
        );
      Object.entries(e).forEach(([r, n]) => {
        if (!this.interface.configurables[r])
          throw new v(
            D.CONFIGURABLE_NOT_FOUND,
            `Contract does not have a configurable named: '${r}'`
          );
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n), o = W(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new v(
        D.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
  getAccount() {
    if (!this.account)
      throw new v(D.ACCOUNT_REQUIRED, "Account not assigned to contract.");
    return this.account;
  }
  async prepareDeploy(e) {
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: r, transactionRequest: n } = this.createTransactionRequest(e);
    return await this.fundTransactionRequest(n, e), {
      contractId: r,
      transactionRequest: n
    };
  }
  /**
   * Create a blob transaction request, used for deploying contract chunks.
   *
   * @param options - options for creating a blob transaction request.
   * @returns a populated BlobTransactionRequest.
   */
  blobTransactionRequest(e) {
    const { bytecode: t } = e;
    return new hi({
      blobId: ze(t),
      witnessIndex: 0,
      witnesses: [t],
      ...e
    });
  }
  /**
   * Get the maximum chunk size for deploying a contract by chunks.
   */
  getMaxChunkSize(e, t = K_) {
    if (t < 0 || t > 1)
      throw new v(
        D.INVALID_CHUNK_SIZE_MULTIPLIER,
        "Chunk size multiplier must be between 0 and 1"
      );
    const r = this.getAccount(), { consensusParameters: n } = r.provider.getChain(), s = n.contractParameters.contractMaxSize.toNumber(), i = n.txParameters.maxSize.toNumber(), o = 64e3, a = i < s ? i : s, u = a < o ? a : o, A = this.blobTransactionRequest({
      ...e,
      bytecode: Ue(32)
    }).addResources(
      r.generateFakeResources([{ assetId: r.provider.getBaseAssetId(), amount: x(1) }])
    ), f = (u - A.byteLength() - ut) * t;
    return Math.round(f / ut) * ut;
  }
}, v2 = 9, C2 = 3, B2 = 9, x2 = 9, R2 = 18, S2 = 15, T2 = 12, N2 = 9, D2 = "https://devnet.fuel.network/v1/graphql", Q2 = "https://testnet.fuel.network/v1/graphql", CB = Object.defineProperty, BB = (e, t, r) => t in e ? CB(e, t, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: r
}) : e[t] = r, hc = (e, t, r) => (BB(e, typeof t != "symbol" ? t + "" : t, r), r), op = {
  programType: "contract",
  specVersion: "1",
  encodingVersion: "1",
  concreteTypes: [
    {
      type: "()",
      concreteTypeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
    },
    {
      type: "enum standards::src5::AccessError",
      concreteTypeId: "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d",
      metadataTypeId: 1
    },
    {
      type: "enum standards::src5::State",
      concreteTypeId: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      metadataTypeId: 2
    },
    {
      type: "enum std::option::Option<struct std::contract_id::ContractId>",
      concreteTypeId: "0d79387ad3bacdc3b7aad9da3a96f4ce60d9a1b6002df254069ad95a3931d5c8",
      metadataTypeId: 4,
      typeArguments: [
        "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54"
      ]
    },
    {
      type: "enum sway_libs::ownership::errors::InitializationError",
      concreteTypeId: "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893",
      metadataTypeId: 5
    },
    {
      type: "enum sway_libs::upgradability::errors::SetProxyOwnerError",
      concreteTypeId: "3c6e90ae504df6aad8b34a93ba77dc62623e00b777eecacfa034a8ac6e890c74",
      metadataTypeId: 6
    },
    {
      type: "str",
      concreteTypeId: "8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a"
    },
    {
      type: "struct std::contract_id::ContractId",
      concreteTypeId: "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      metadataTypeId: 9
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyOwnerSet",
      concreteTypeId: "96dd838b44f99d8ccae2a7948137ab6256c48ca4abc6168abc880de07fba7247",
      metadataTypeId: 10
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyTargetSet",
      concreteTypeId: "1ddc0adda1270a016c08ffd614f29f599b4725407c8954c8b960bdf651a9a6c8",
      metadataTypeId: 11
    }
  ],
  metadataTypes: [
    {
      type: "b256",
      metadataTypeId: 0
    },
    {
      type: "enum standards::src5::AccessError",
      metadataTypeId: 1,
      components: [
        {
          name: "NotOwner",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "enum standards::src5::State",
      metadataTypeId: 2,
      components: [
        {
          name: "Uninitialized",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          name: "Initialized",
          typeId: 3
        },
        {
          name: "Revoked",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "enum std::identity::Identity",
      metadataTypeId: 3,
      components: [
        {
          name: "Address",
          typeId: 8
        },
        {
          name: "ContractId",
          typeId: 9
        }
      ]
    },
    {
      type: "enum std::option::Option",
      metadataTypeId: 4,
      components: [
        {
          name: "None",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          name: "Some",
          typeId: 7
        }
      ],
      typeParameters: [7]
    },
    {
      type: "enum sway_libs::ownership::errors::InitializationError",
      metadataTypeId: 5,
      components: [
        {
          name: "CannotReinitialized",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "enum sway_libs::upgradability::errors::SetProxyOwnerError",
      metadataTypeId: 6,
      components: [
        {
          name: "CannotUninitialize",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "generic T",
      metadataTypeId: 7
    },
    {
      type: "struct std::address::Address",
      metadataTypeId: 8,
      components: [
        {
          name: "bits",
          typeId: 0
        }
      ]
    },
    {
      type: "struct std::contract_id::ContractId",
      metadataTypeId: 9,
      components: [
        {
          name: "bits",
          typeId: 0
        }
      ]
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyOwnerSet",
      metadataTypeId: 10,
      components: [
        {
          name: "new_proxy_owner",
          typeId: 2
        }
      ]
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyTargetSet",
      metadataTypeId: 11,
      components: [
        {
          name: "new_target",
          typeId: 9
        }
      ]
    }
  ],
  functions: [
    {
      inputs: [],
      name: "proxy_target",
      output: "0d79387ad3bacdc3b7aad9da3a96f4ce60d9a1b6002df254069ad95a3931d5c8",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Returns the target contract of the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Returns"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * [Option<ContractId>] - The new proxy contract to which all fallback calls will be passed or `None`."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "storage",
          arguments: ["read"]
        }
      ]
    },
    {
      inputs: [
        {
          name: "new_target",
          concreteTypeId: "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54"
        }
      ],
      name: "set_proxy_target",
      output: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Change the target contract of the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Additional Information"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" This method can only be called by the `proxy_owner`."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Arguments"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * `new_target`: [ContractId] - The new proxy contract to which all fallback calls will be passed."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Reverts"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * When not called by `proxy_owner`."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "doc-comment",
          arguments: [" * Write: `1`"]
        },
        {
          name: "storage",
          arguments: ["read", "write"]
        }
      ]
    },
    {
      inputs: [],
      name: "proxy_owner",
      output: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Returns the owner of the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Returns"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * [State] - Represents the state of ownership for this contract."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "storage",
          arguments: ["read"]
        }
      ]
    },
    {
      inputs: [],
      name: "initialize_proxy",
      output: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Initializes the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Additional Information"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " This method sets the storage values using the values of the configurable constants `INITIAL_TARGET` and `INITIAL_OWNER`."
          ]
        },
        {
          name: "doc-comment",
          arguments: [
            " This then allows methods that write to storage to be called."
          ]
        },
        {
          name: "doc-comment",
          arguments: [" This method can only be called once."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Reverts"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * When `storage::SRC14.proxy_owner` is not [State::Uninitialized]."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Writes: `2`"]
        },
        {
          name: "storage",
          arguments: ["write"]
        }
      ]
    },
    {
      inputs: [
        {
          name: "new_proxy_owner",
          concreteTypeId: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c"
        }
      ],
      name: "set_proxy_owner",
      output: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Changes proxy ownership to the passed State."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Additional Information"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " This method can be used to transfer ownership between Identities or to revoke ownership."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Arguments"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * `new_proxy_owner`: [State] - The new state of the proxy ownership."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Reverts"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * When the sender is not the current proxy owner."]
        },
        {
          name: "doc-comment",
          arguments: [
            " * When the new state of the proxy ownership is [State::Uninitialized]."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "doc-comment",
          arguments: [" * Writes: `1`"]
        },
        {
          name: "storage",
          arguments: ["write"]
        }
      ]
    }
  ],
  loggedTypes: [
    {
      logId: "4571204900286667806",
      concreteTypeId: "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d"
    },
    {
      logId: "2151606668983994881",
      concreteTypeId: "1ddc0adda1270a016c08ffd614f29f599b4725407c8954c8b960bdf651a9a6c8"
    },
    {
      logId: "2161305517876418151",
      concreteTypeId: "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893"
    },
    {
      logId: "4354576968059844266",
      concreteTypeId: "3c6e90ae504df6aad8b34a93ba77dc62623e00b777eecacfa034a8ac6e890c74"
    },
    {
      logId: "10870989709723147660",
      concreteTypeId: "96dd838b44f99d8ccae2a7948137ab6256c48ca4abc6168abc880de07fba7247"
    },
    {
      logId: "10098701174489624218",
      concreteTypeId: "8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a"
    }
  ],
  messagesTypes: [],
  configurables: [
    {
      name: "INITIAL_TARGET",
      concreteTypeId: "0d79387ad3bacdc3b7aad9da3a96f4ce60d9a1b6002df254069ad95a3931d5c8",
      offset: 13368
    },
    {
      name: "INITIAL_OWNER",
      concreteTypeId: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      offset: 13320
    }
  ]
}, xB = [
  {
    key: "7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd55",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    key: "7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd56",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    key: "bb79927b15d9259ea316f2ecb2297d6cc8851888a98278c0a2e03e1a091ea754",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    key: "bb79927b15d9259ea316f2ecb2297d6cc8851888a98278c0a2e03e1a091ea755",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  }
], Ai = class extends ha {
  constructor(e, t) {
    super(e, op, t);
  }
};
hc(Ai, "abi", op);
hc(Ai, "storageSlots", xB);
var ap = af(
  "H4sIAAAAAAAAA9Vbe3Abx3lfgCAFvayz+TAFSjaUUjJkRwosUQ4ly9IhIATSEM2DSVpUGBhg64c0cSyIlVQ5tsccN001aSZlHcdlO06GrtOp6z4GAB+C7T7YR2bUiTtlZhxbTeMWmiatFAst60YZqm6j/r5v93DHw4GOJ84f0QznFne73+5+j9/32FVgISxOCOEV/K/Dn7o259GuXRO/JcSQ8c6CML4nwkZJF8HFnWLovZLXeK/kOyG89+JbGN9C+BZe+q2uEfRE4LIBGiv1VHThdi0i5gJdGTHa7TW0WNNY4JLmoFfXE4jPi3T5ep/q112j337Vr8WIF3PV373nAol5YfTls6OG8Id6m9E3+DG0tVB5F96/onG7b0akejWh9XaMpWNhYcSnL44exPv49JzLnNtoTtDMpMvaR0FvmxHPaaPd6B/rGDMSxRCP7WmaMxJ5I10Wt47qYg2etxnR/CJ/i7Tj29nuSr/42Tlux3yYLygC36+aMxiIzotTuuck+LeD+If9hoxEIQS6MdDX8DxgRAudNvrzNvql96Hvl/TFJdDfaaPfDbo9oL8az7tBf8hGf8GiXxTL0/cuKPpPg36Hjf4R0O1V678H9E9b9IuaRX+m9X3on1f0HwD9XTb6Z0A3Cfrr8LwX9Ccs+jOWnOIzkm+16c8p+juXvl/9f0Z0GnonHP19CeqfigmR6hGeVER4jb5Z7FH7a+jL32Atf2tEp84ELoUxV9XYQzQWOnVO6pRvzIi+AhugdTehPVtpV8/r/TyPTcxWdIv246CfIf3dHNGEES0GjXihRHSq9+z5slrHBOYLy3XkJ7nN6zg7brar17F6c0AXYjP+lr5fNWW+x/4nqsc1PK3mHLLmLGatOaddxtSxboHPsGHF6/7Zc6MDGJNs1o347CJ4/i/pcrgEvl/AvOcCl3Teb+CCk5b/tmq5zVyE3P4cNP4C4/8S40+7y63uklr7GUtuReKXktuMfxm5tSq5ST10lVvdu6bcoON3KB0PGokpjTAq8H1nf8/vME4lcoRlQann+TFux9rnHLTfgQ2QzuCbbw57PgJcDIZ660lOYab/PejIBez77aq1vyH3nfdjfDePjxaL3I5gzmh+Pn1Z22P0Cr+kuRnYOTuEdjfhMeQziXYoFKsXkq9OPVxxCnbrH+3C2Eg75Dnt5geO0V5TPeBNr+ZJxTTowNkh6EAwlKzXoaunIb//hA4sQJb/ZcSnFqUO0J6ctPyHXXRgHuNeBY3XoAN/Bj08X0MHjigd6LZ0oPCSKXfIbX0qnhtMJXL3dXh891q2MA0ZOmmt/JaiFcR48If1qZPb0haOuNjCtiW2kBTe1CDah9U+0oXiaAbjUy0C6/A1xjRxqktsT0VzhxojQge+ebHGwB28pkLRiAi/EX8lyHyMgY/xmUnwYBp8nEmX9VkjMW0ELpLukS059c/7lotMNJtMwqD1b6D17+DtRcgEOFRLJit+6JQJYgoN6wG+G/l0OVOAXKbAk87ARYll1bbtnXKRaxFzn8U68BSvYDywwU2u3neVLM7bbDtj2fb0Ym3b9mxStl3xN9W27X3PtO2vCHHzc34zXhKTgeikCMTHRSAxJgJ9JWH052CP5h6dcZgI8B4jAnGOWIv1HjGiuU6JD851iTbqC7sKh8o+yCOX5XZ02mr3+PTAD4V4htZxNSwmsK7fxvruXhS0zhXmOuUasb5ESaTB38AVzHc1aPZfofo/Ze3Lc5HHDGNfh0qw+6q1fZL40QjdOdUt7sZTx3M1/Li3MdJEfthzB2JKrHMB6/RChjch1jpjrhnjd5PfAu40utCOUkzY2BsUpw6KGxt7gkRb0kvkzmHMesR2uuRx2Dm2i2XZB5s08TESlLgWoXgyn8EaQ6HedoqhbwC9bPqyuA7vgzXohVkGhLtl4CbRonZ0Ghhs0TIiGvkO2D3Fl9inTvtsIswtcjvG89WDHzrmg83ivfKf/P1wE2SSgRzB96uGKZenlFwq+iblWJL40RMkDBEUN2u9u0Q6Aru4gtjoqubUA7u+ZphGAnKFrpKtMW/KhPM5ndtxxNrqvRZDPM5xCPhJ+A7d4yfpHeaC3mVc9M4+H3x/lX1ka9nHSSH+2GYfrZgXtrhUP9AnyrqXhO4ZogUYqQMjpX4A16EfKzEHYgCao4r+J1ievGfSDciN2tEZWtcEyzPZZMoqCFn5+H0XvWcbPMftSJfVtmxwwYUXdVWyw94CV/BnyanOaa/gm2b2Z9wq+8YC0VxlLObSbONN+91vG29YfAcNwjXob+CdXLV+98Fe+pEfDaAP4jHCeEefWwL9ZI+78AcdMwTZ5QbYWJhzM9gYYbJjzK2Krr4M3U0c//RDt7hPvVsfznu2JjuMwBWd9m3YcGv/B+CbZxm+fYh8rzsXOITx/ZBzdOHjMgbMXwQtituADYiTONajGCxvWHEb7LYqbhMPKfzvlvg/NcZtxv9Cd6Udz8MnuuUHvqwt1pHzRwuUE9A4Fz/oOy79YIH8oBmPIp6nfMvN54tBRf+IlQtMEQ6qXGAqo74Beym2yl2PmOYG+t3WA9w7KPxtPR1jW7pBuzsLbJ7K7O7xzcN3NJDfgO3BZxTO23zGdYQHsG/KNf1tsQ5diyHeTMA+D5IdYr0xxLDURvxsHwteE35hXe2ob+SGVSylfFQ+KOOoKRm7ESaTXQ8SxhmQOWR6VXfqnN3WupdiXJblz3FUuV6H7/Nh3SEzPgbGdIf6pqFPYdKnbhfa12x+2MLPYdCGL8Yawbcm4l9I62mnusTN6ll/s3z61qea5jAfeHRC534x/KZ+8ll/M56w35zpI7EmrLWDeEE1CenfIANT9g6575R6Aru1dFnlOFV9Q8ofS9/C+UqecAO8QJ6RyMs19LBvzr7Y63uB7IJ1BjqK71m8H8f7SV4b6xJ8bDRntRO5jLWOnMyfUD8A35vS5Wwzy/0wyZL9KzC64l+vKX6vs8lSt+Mm4T/+6vHXAH+0gv2gigWYZ3GSo0Zy1G24tK46nhLjLn7wNHSklbARa2wNleFT4oypreyDh3MNqUO5FbAZ8lF+LdksmpMxHT7PQ/4J77xtg4NiywCYvPEBPTCUFVryAT2dhO/W0R9xGPvDcmYlYvBVWP9qrL+V6UfY32e4jbwO/VspXlE+fdzmx8wYxM4jpe+kiz5h2W+uFXF6Hb3Dk/kGGWFfLKMw+NYaSkyT/mH+9jmFp9D/Cp6afLPbFvI1Sx6Yw+A1S50l2hSbEF61ks6m+nL1sGWN/A7yFr/Rq/vBY9QVKZ/B3rm21GXV8qTsjnz4PsVjs2H/PNktchCOSRx5xXa2jzTHyeFQClg1nA8D47YcBz4Bo6j+cx68HKY8H+8fOt5NeZFpu2RDs0XLhmaGpM06/XHdE7LOCrsxx/WofJ/G9SAOYgwlGzpLORRjOHKjuxzr/W/269H8ONa0g2p4JmZSXNAC3mLN7ci9QqgD6Oa3VDRfrzB3DfD3DNqUI9hy2akh7O3T+DuGuuWQGVdBz9eCb7rE5yL5FunH4lN+zD+i1i1tn8ZR/MZx91mKq8kPUCyHmtL0S2bu6tjPd5SPJblCR4qEm5r0sVMU33Ebaxamz6DaO35/Vu1hFdqP2b7V0TfKeRojPs7XtaSuI+6MEW2su5KfgietDppPKJoRtB930HzCheYnZT7suq+vK99MMlD58BTlHKrOkfM76J+20Yf/RV32skiCp1TXMWVxI+Regoz2jsQ+EYHeTaBWAd63YJ4Z5LCuddl/VjUuo9KXfDS1Y1vw3qIPmYVtMtuFvRVr7O0zam+qpk97m6Y4w9wb9rGEr19SfKV9ZbCvg1h7ybGvIvb1ceyrDt9O2/bVWmNfL6l9Bd33ZdG37ws6QLVaVR8iG5mi2HCJjQS6eK2eQBfXfr5CY1CDq9iZrG25+doKX6geq+I9qrHPEu+xlgbCINTV3Hy6937l08flfqjvzEVuR4gPs5W9uceagmurWPfDdMYBXsbB5wTbYWXdUxR78t4hkwUlo1a0R13wYFzZ/GnL5gtk89C7Qg7P+4xelddzjq/wS557vGTm31jXKkULOIrzoMvaR4EZ5C/8CjMqfRn3VIwI7CLd4pgW63tPrU/Fi9OaWhvFKXJvsYzM/3mfM7LOETlB9TiV5z/A8bYL3zg+MvdPeSTe3YQzBML8f8J4lcdW1VPvUzVdqj2a9k28NuuYbYgbsqhjHqc6Jn5vIL5K3PCg5kQ6ZWG3ev/oM+SrKvGRx4yPbPm8p1TxxxTj0t7gD+Fbw1bcD9/UJTI1cHOD+t2EdovJV9s3wXqP8yz6bsMkE6c2mO9UP9gJ8yxK80q54BnTwvjzq9hQ+rVIkORO+sfxKugYKh9Y41jHLer3BrQ/4lg/favYKNeQQEvOi2dMC8l5cQ5jxcYUb1AOpM6uqmLkAGHJMrRs8a06H6hNawXRknENZGXlFmY9omasW6lxmTEu5nghOh1UMY5bfGvPexdteW+nzHuR61p5r8opeQ+o/9TOe08q3bblvaRPZt57xJb3XqxhUwWXvDdXO+8VXHems1Rb3gvfUzPv3eeS99r0H3jzwfLecSvvzVPOgTOjwiL22WnLe7nu6ZL3EnaZeS/VGSnvrYwFvU5uSz1PO/LeTpX3Up1c1iIJt6y8d/GnyE3DP2FuGv4wc1PozuhPmpui75M/T7lpla2q/MXFLt1qjr73qzkGoiUxgjqqqunX2+uqhLXQQ8Za9b1Bfa/47JEuTx31AY16uS7hrJPZ68LIoaz9OGq07ZRjNCd9c5TrNsrntpGIF/VHrj0G8dTxbAIfyBdQzkE1I1lb70esSfkdxhEekm+C7TRQX+SEK+zfIXuq4aOG2UX7Ixqo+WrIXbV6/qbqm1Sz5n7JDrOfhj5ezFfH3xQ97hPrYvxFP8qBSX/pnopZJxizycsNkxEPLJFziDCZ6o9LbRc1AZsOgG7IRQ/sdHE/pRrrHTWM4PI1DJu9Uz5LfKT4IQnMg79ifGWsz827nXdDrgXyTWwbZR5Ddwh4jPO8GH1zCmMXuD/OlEF30rRj51nmSeF73XYW63IXIj+vvpmY7Acmr6yNyfn53T0dhDcW3vYhRxqi857YmDwPBy7E8/N3xnzjsv6/xH7NuokNL71WTT4NvBy24iclX4opvmCLmW6kNvqQjo8tjY8RE1BthfYWz1GM6a3lr8CbF1zOZo+RDgHD6O6BjI8SeaqPUB0I/g9nNHxuDJrV9Gaqz40R/w2QLtSTn2lQe6Fza2o7zq1zYfY7/QUaI8+a+/OoUwW3wj5vBTbehvkn5fzI/6rn/3b1/MDqyrk17jOUg3tA607Q2gtaiBNqnVuLAy68CdnWaJ2H96MuUw5uAd1bQBe5W+6MPMt2XeOPXdZI9T5zjROgtRO0OkBrF2jBZmqucaPLGtdRrGDTgSG5Fjf51/P5tn18OqWJdCroSaegN1ey0F3o5tWM0/fYdFfI8+Cl9ctWaz/QQaplRsxaJp+VGdymPGA4twq1TIrp11AdXIv59OZYM/sXrmXCj7QNDuiqlimolskx1KcI42JzqGsKbiebKXYIaoj/if+obV6P2uYNqG020jm6rbZJd1a4tsn+2HxPbVqTdX6J89ZKrdPct73+uMRPAQNCzrMu8PcA+atUMixSg2FPqjfstdmzXe9x11BHHdbAXb3wGtDSLJlV0fwSywz+DndE5F2IQzncxQuvBY3rsF/IP4fzMvjtqrimvk+dWfOZ3zL+x4zpbBjvteIMC+NxT4vxmvDTxHjcBXHDeO9tDoynOLgGxnu3qhxW9pcYz3dE3THe+zUXjKe43sT40gfE+JILxo8B48MK4zEHY3zJwnjwZ5nzefhI1IoRb8UXdmsxDZiawx0g5z5WrKZarPTtFK9TjV5bCb1sw3MV363j+jR/O8/9UDfHeuncGvEI67c6l8N5bDVebFe1Kds5HuxT3SujGo/7fTTRoPwY6tmV2M3tTF/FEuy/KI7gengYdxICB6lgnRTPoha8Q4d8dKFvge6nN8I29KwIRurEvYhF78Y7GW9U3VWwxxvFKswZ5lhdCx0GD/rhryyf8wvKz9yv2g7bk/dFlsqhoYPthM8ouIZR4jbH9nxWQDhBcTvdeeUzC2DYuhTOyimnQx95V1jyl843TJmNm++hf42UE9HdaIV5VNOzMC/ZpW8Br0IbB0RggDFP3kdEvUiLDQicZzTzfWfUAVDLaWL68EvAP5ozByxpAR7cqO5KkK2a/oDupgL/2EaoLiTfo61s0vyG8wK33KgB90QqOa6qL+H+oFVf2oy9bcKaPkL1JZVPtqraxQTnTYy9aC+5LwKZLn+2pGIkyBr662I737HbDseflNPLGgV8WNVZkh3bcFcLdBGrVmORb4fCLcRjzD+ZS+B+OOfV0v4kJsD+3M5YQOPv+F6KvLO3AxiwhzAglVi4U+sJ4mxqYa/WG55L9S/chXrbHPA8C6wJhgabxzDXDUbMCPHv2OYxo0sPc/45BOzsGRwzDuFeOsWe6CvnBoOXYuMlFQdiPO7IXxZtqs4J3nfNGd068A41mMqdzgLdtwe+bXa904la4OdULbIFtRO6B9MFvqk7V1V9v6l0hWogpq5U7kBDV7ZDV4LQlU32WiSwFHfWKjhj6oJNXnXynBFxskM33yS9xJrWgkeEj3TGD/mg3rSsfOpvN+WjZPQpyGifxGlVVyNb7kPewPUAxlnEjqBVuVvr3Lvfo7CW7sJDVoQFU6Sf8Hmw1XjhTKWdKJCv4bW6+07PBcddbr5H6ND/keq71Pg/BZW71HRfP9iLOOEeYEKftG/3u9Sof2ypvm+Zp9pEJ2jsxvg9GN/tdt8S6zDv0VIOp2Su7l5KmX8MMm+DzDfwPVqpS83QJdJNA7pUuQPm0GM+h7DO4/iOlTqDWwiD5nrQDCzVI+iJFbsu55P31/bJ/oWfpU+GbDln+qA+GePeruWTf1b/sqPHTj+WPjEy+vCD9N+CxC8/eCJtf/f49NCf/NW3Wo/vXP/7r06u2ub76pu9W1viT24589bR7LmJvx+UfY/9yqMPjjK9o48ePXF05JGjn31QkrHoyT4bv7vq7RduWeV5nf8J7/7s9hd3bXj+pmv8T4jXHnvm8eZ/3Py1F1vevVzY+uQj536t9cwfPn167vdK+wIrb/qDgQMjjzzyiyO/9OnY6Oix0T17BniR9xw70S+XL764+Zt3fP7A9t/N/+ZE57Nf/vrLvkvPvzZ7cNOb//qZYwfLl18+uv/V/5j8h4eu+8Ku/xk+uePbe3/06xf23ZVr+sG7/m8Uv9HxR0fvemvl2vu9D6f3bfzxUz/47sbnHn7u7V/9ja6rX/3i3kfH/9To/dHLkms7/1c+d7yuns+r50H5vF19335ePtvfkM8W9X3lEfn0qff1n1PPDvV8Vj7rJuXT88b/AzdExjYINgAA"
), cp = class extends ip {
  constructor(e) {
    super(
      ap,
      Ai.abi,
      e,
      Ai.storageSlots
    );
  }
  static deploy(e, t = {}) {
    return new cp(e).deploy(t);
  }
}, RB = cp;
hc(RB, "bytecode", ap);
export {
  Jn as ASSET_ID_LEN,
  dl as AbstractAccount,
  _w as AbstractAddress,
  hw as AbstractContract,
  ul as AbstractProgram,
  lw as AbstractScript,
  GB as AbstractScriptRequest,
  Ti as Account,
  dt as Address,
  Ov as AddressType,
  ft as ArrayCoder,
  Y as B256Coder,
  Jg as B512Coder,
  _C as BLOCKS_PAGE_SIZE_LIMIT,
  Ot as BN,
  fr as BYTES_32,
  Nn as BaseTransactionRequest,
  QA as BaseWalletUnlocked,
  M as BigNumberCoder,
  hi as BlobTransactionRequest,
  $g as BooleanCoder,
  It as ByteArrayCoder,
  Kh as ByteCoder,
  it as CHAIN_IDS,
  zo as CONTRACT_ID_LEN,
  WB as CONTRACT_MAX_SIZE,
  Mv as ChainName,
  o2 as ChangeOutputCollisionError,
  at as Coder,
  mB as Commands,
  ha as Contract,
  ip as ContractFactory,
  vB as ContractUtils,
  ia as CreateTransactionRequest,
  x2 as DECIMAL_FUEL,
  N2 as DECIMAL_GWEI,
  S2 as DECIMAL_KWEI,
  T2 as DECIMAL_MWEI,
  R2 as DECIMAL_WEI,
  B2 as DEFAULT_DECIMAL_UNITS,
  C2 as DEFAULT_MIN_PRECISION,
  v2 as DEFAULT_PRECISION,
  hC as DEFAULT_RESOURCE_CACHE_TTL,
  D2 as DEVNET_NETWORK_URL,
  ma as DateTime,
  Gs as ENCODING_V1,
  XB as EmptyRoot,
  tl as EnumCoder,
  D as ErrorCode,
  H0 as FAILED_ASSERT_EQ_SIGNAL,
  X0 as FAILED_ASSERT_NE_SIGNAL,
  Y0 as FAILED_ASSERT_SIGNAL,
  V0 as FAILED_REQUIRE_SIGNAL,
  Dl as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  t2 as FAILED_UNKNOWN_SIGNAL,
  Ys as FUEL_BECH32_HRP_PREFIX,
  ZA as Fuel,
  $C as FuelConnector,
  WA as FuelConnectorEventType,
  dc as FuelConnectorEventTypes,
  XA as FuelConnectorMethods,
  v as FuelError,
  ep as FunctionInvocationScope,
  lC as GAS_USED_MODIFIER,
  xo as HDWallet,
  zB as INPUT_COIN_FIXED_SIZE,
  rr as InputCoder,
  Hc as InputCoinCoder,
  Xs as InputContractCoder,
  Qr as InputMessageCoder,
  Et as InputType,
  uc as InstructionSet,
  gr as Interface,
  SC as Language,
  qC as LocalStorage,
  KB as MAX_PREDICATE_DATA_LENGTH,
  $B as MAX_PREDICATE_LENGTH,
  JB as MAX_SCRIPT_DATA_LENGTH,
  jB as MAX_SCRIPT_LENGTH,
  qB as MAX_STATIC_CONTRACTS,
  ZB as MAX_WITNESSES,
  Z_ as MNEMONIC_SIZES,
  GC as MemoryStorage,
  oc as Mnemonic,
  kA as MnemonicVault,
  fB as MultiCallInvocationScope,
  hv as NoWitnessAtIndexError,
  a2 as NoWitnessByOwnerError,
  J as NumberCoder,
  Fv as OperationName,
  sl as OptionCoder,
  Xc as OutputChangeCoder,
  nr as OutputCoder,
  Yc as OutputCoinCoder,
  Ws as OutputContractCoder,
  Zc as OutputContractCreatedCoder,
  yt as OutputType,
  Wc as OutputVariableCoder,
  Z0 as PANIC_DOC_URL,
  W0 as PANIC_REASONS,
  sr as PoliciesCoder,
  Xe as PolicyType,
  Ro as Predicate,
  UA as PrivateKeyVault,
  li as Provider,
  z_ as RESOURCES_PAGE_SIZE_LIMIT,
  tw as RawSliceCoder,
  id as ReceiptBurnCoder,
  jc as ReceiptCallCoder,
  HB as ReceiptCoder,
  td as ReceiptLogCoder,
  ed as ReceiptLogDataCoder,
  Ho as ReceiptMessageOutCoder,
  Zs as ReceiptMintCoder,
  $c as ReceiptPanicCoder,
  Jc as ReceiptReturnCoder,
  qc as ReceiptReturnDataCoder,
  Kc as ReceiptRevertCoder,
  sd as ReceiptScriptResultCoder,
  rd as ReceiptTransferCoder,
  nd as ReceiptTransferOutCoder,
  _t as ReceiptType,
  $h as SCRIPT_FIXED_SIZE,
  wB as Script,
  Ni as ScriptRequest,
  Xr as ScriptTransactionRequest,
  xn as Signer,
  Ai as Src14OwnedProxy,
  RB as Src14OwnedProxyFactory,
  Ta as StdStringCoder,
  b2 as StorageAbstract,
  od as StorageSlotCoder,
  il as StrSliceCoder,
  ew as StringCoder,
  yi as StructCoder,
  Q2 as TESTNET_NETWORK_URL,
  TA as TRANSACTIONS_PAGE_SIZE_LIMIT,
  ld as TransactionBlobCoder,
  Ar as TransactionCoder,
  dd as TransactionCreateCoder,
  ud as TransactionMintCoder,
  ca as TransactionResponse,
  cd as TransactionScriptCoder,
  CA as TransactionStatus,
  vt as TransactionType,
  Qv as TransactionTypeName,
  _d as TransactionUpgradeCoder,
  hd as TransactionUploadCoder,
  ol as TupleCoder,
  Jr as TxPointerCoder,
  Vs as UTXO_ID_LEN,
  ad as UpgradePurposeCoder,
  ke as UpgradePurposeTypeEnum,
  oa as UpgradeTransactionRequest,
  aa as UploadTransactionRequest,
  YB as UtxoIdCoder,
  HC as Vault,
  rw as VecCoder,
  ut as WORD_SIZE,
  Be as Wallet,
  PA as WalletLocked,
  VC as WalletManager,
  Qe as WalletUnlocked,
  ir as WitnessCoder,
  St as ZeroBytes32,
  YE as addAmountToCoinQuantities,
  ns as addOperation,
  zn as addressify,
  xv as aggregateInputsAmountsByAssetAndOwner,
  W as arrayify,
  uv as assemblePanicError,
  rv as assembleReceiptByType,
  _v as assembleRevertError,
  Si as assembleTransactionSummary,
  q_ as assert,
  cf as assertUnreachable,
  y2 as assets,
  x as bn,
  Dr as bufferFromString,
  i2 as buildBlockExplorerUrl,
  So as buildDryRunResult,
  AB as buildFunctionResult,
  KC as cacheFor,
  c2 as cacheRequestInputsResources,
  Av as cacheRequestInputsResourcesFromOwner,
  Bn as calculateGasFee,
  ov as calculateMetadataGasForTxBlob,
  gA as calculateMetadataGasForTxCreate,
  wA as calculateMetadataGasForTxScript,
  L_ as calculateMetadataGasForTxUpgrade,
  av as calculateMetadataGasForTxUpload,
  cv as calculateMinGasForTxUpload,
  yv as calculateTXFeeForSummary,
  qh as calculateVmTxMemory,
  OB as capitalizeString,
  mh as chunkAndPadBytes,
  mw as clearFirst12BytesFromB256,
  Za as coinQuantityfy,
  kB as compressBytecode,
  Yh as computeHmac,
  nt as concat,
  gi as concatBytes,
  VB as createAssetId,
  E2 as createConfig,
  ya as dataSlice,
  nf as decodeBase58,
  af as decompressBytecode,
  mg as decrypt,
  bg as decryptJsonWalletData,
  PB as defaultConsensusKey,
  LB as defaultSnapshotConfigs,
  tB as deferPromise,
  YA as deployScriptOrPredicate,
  I2 as dispatchFuelConnectorEvent,
  Eh as encodeBase58,
  yg as encrypt,
  Ig as encryptJsonWalletData,
  vs as english,
  iC as extractBurnedAssetsFromReceipts,
  KA as extractInvocationResult,
  sC as extractMintedAssetsFromReceipts,
  ec as extractTxError,
  DB as format,
  NB as formatUnits,
  Oa as fromBech32,
  bC as fuelAssetsBaseUrl,
  iv as gasUsedByInputs,
  jA as getAbisFromAllCalls,
  lv as getAssetAmountInRequestInputs,
  w2 as getAssetEth,
  m2 as getAssetFuel,
  pC as getAssetNetwork,
  DA as getAssetWithNetwork,
  Ma as getBytesFromBech32,
  $v as getContractCallOperations,
  rC as getContractCreatedOperations,
  ic as getDecodedLogs,
  AC as getDefaultChainId,
  Ri as getGasUsedFromReceipts,
  sc as getInputAccountAddress,
  Sv as getInputContractFromIndex,
  EA as getInputFromAssetId,
  nc as getInputsByType,
  Iv as getInputsByTypes,
  Ev as getInputsCoin,
  IA as getInputsCoinAndMessage,
  Cv as getInputsContract,
  vv as getInputsMessage,
  tc as getMaxGas,
  fA as getMinGas,
  $n as getMintedAssetId,
  nC as getOperations,
  gs as getOutputsByType,
  Nv as getOutputsChange,
  vA as getOutputsCoin,
  Dv as getOutputsContract,
  Tv as getOutputsContractCreated,
  h2 as getOutputsVariable,
  eC as getPayProducerOperations,
  JC as getPredicateRoot,
  ww as getRandomB256,
  rs as getReceiptsByType,
  zv as getReceiptsCall,
  Gv as getReceiptsMessageOut,
  A2 as getReceiptsTransferOut,
  M_ as getReceiptsWithMissingData,
  bA as getRequestInputResourceOwner,
  JA as getResultLogs,
  oC as getTransactionStatusName,
  p2 as getTransactionSummary,
  f2 as getTransactionSummaryFromRequest,
  BA as getTransactionTypeName,
  g2 as getTransactionsSummaries,
  tC as getTransferOperations,
  Zv as getWithdrawFromFuelOperations,
  l2 as hasSameAssetId,
  ze as hash,
  xg as hashMessage,
  X as hexlify,
  q1 as inputify,
  Un as isB256,
  Ns as isBech32,
  K1 as isCoin,
  pr as isDefined,
  Vo as isEvmAddress,
  k_ as isInputCoin,
  s2 as isMessage,
  O_ as isMessageCoin,
  Gc as isPublicKey,
  r2 as isRawCoin,
  n2 as isRawMessage,
  tn as isRequestInputCoin,
  yA as isRequestInputCoinOrMessage,
  rc as isRequestInputMessage,
  mA as isRequestInputMessageWithoutData,
  Kr as isRequestInputResource,
  sa as isRequestInputResourceFromOwner,
  d2 as isTransactionTypeBlob,
  mv as isTransactionTypeCreate,
  kr as isTransactionTypeScript,
  u2 as isTransactionTypeUpgrade,
  _2 as isTransactionTypeUpload,
  Dn as isType,
  Uv as isTypeBlob,
  xA as isTypeCreate,
  Lv as isTypeMint,
  RA as isTypeScript,
  Pv as isTypeUpgrade,
  kv as isTypeUpload,
  Hh as keccak256,
  UB as keyFromPassword,
  QB as max,
  FB as multiply,
  gw as normalizeBech32,
  dv as normalizeJSON,
  MB as normalizeString,
  $1 as outputify,
  yw as padFirst12BytesOfEvmAddress,
  Eg as pbkdf2,
  Tr as processGqlReceipt,
  aC as processGraphqlStatus,
  Ue as randomBytes,
  Cg as randomUUID,
  IC as rawAssets,
  xe as resolveGasDependentCosts,
  yC as resolveIconPaths,
  P_ as returnZeroScript,
  vg as ripemd160,
  Vh as scrypt,
  ve as sha256,
  $p as sleep,
  bw as sortPolicies,
  Pn as stringFromBuffer,
  Vc as toB256,
  kn as toBech32,
  lr as toBytes,
  TB as toFixed,
  fa as toHex,
  xr as toNumber,
  wn as toUtf8Bytes,
  ba as toUtf8String,
  Re as transactionRequestify,
  Bg as uint64ToBytesBE,
  mC as urlJoin,
  Cs as withTimeout,
  wv as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
